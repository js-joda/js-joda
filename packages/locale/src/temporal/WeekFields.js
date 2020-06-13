/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    DateTimeException,
    DayOfWeek,
    ChronoField,
    ChronoUnit,
    IllegalArgumentException,
    IllegalStateException,
    IsoChronology,
    IsoFields,
    LocalDate,
    ResolverStyle,
    ValueRange,
    Year
} from '@js-joda/core';
import cldrData from 'cldr-data';
import Cldr from 'cldrjs';

const { MathUtil, assert: { requireNonNull, requireInstance } } = jodaInternal;

//-----------------------------------------------------------------------
const DAY_OF_WEEK_RANGE = ValueRange.of(1, 7);
const WEEK_OF_MONTH_RANGE = ValueRange.of(0, 1, 4, 6);
const WEEK_OF_YEAR_RANGE = ValueRange.of(0, 1, 52, 54);
const WEEK_OF_WEEK_BASED_YEAR_RANGE = ValueRange.of(1, 52, 53);
const WEEK_BASED_YEAR_RANGE = ChronoField.YEAR.range();

/* map from the string from cldr `firstDay()` to DayOfWeek */
const _weekDayMap = {
    'mon': DayOfWeek.MONDAY,
    'tue': DayOfWeek.TUESDAY,
    'wed': DayOfWeek.WEDNESDAY,
    'thu': DayOfWeek.THURSDAY,
    'fri': DayOfWeek.FRIDAY,
    'sat': DayOfWeek.SATURDAY,
    'sun': DayOfWeek.SUNDAY,
};

/**
 * Field type that computes DayOfWeek, WeekOfMonth, and WeekOfYear
 * based on a WeekFields.
 * A separate Field instance is required for each different WeekFields;
 * combination of start of week and minimum number of days.
 * Constructors are provided to create fields for DayOfWeek, WeekOfMonth,
 * and WeekOfYear.
 */
export class ComputedDayOfField {

    /**
     * Returns a field to access the day of week,
     * computed based on a WeekFields.
     * <p>
     * The WeekDefintion of the first day of the week is used with
     * the ISO DAY_OF_WEEK field to compute week boundaries.
     */
    static ofDayOfWeekField(weekDef) {
        return new ComputedDayOfField('DayOfWeek', weekDef,
            ChronoUnit.DAYS, ChronoUnit.WEEKS, DAY_OF_WEEK_RANGE);
    }

    /**
     * Returns a field to access the week of month,
     * computed based on a WeekFields.
     * @see WeekFields#weekOfMonth()
     */
    static ofWeekOfMonthField(weekDef) {
        return new ComputedDayOfField('WeekOfMonth', weekDef,
            ChronoUnit.WEEKS, ChronoUnit.MONTHS, WEEK_OF_MONTH_RANGE);
    }

    /**
     * Returns a field to access the week of year,
     * computed based on a WeekFields.
     * @see WeekFields#weekOfYear()
     */
    static ofWeekOfYearField(weekDef) {
        return new ComputedDayOfField('WeekOfYear', weekDef,
            ChronoUnit.WEEKS, ChronoUnit.YEARS, WEEK_OF_YEAR_RANGE);
    }

    /**
     * Returns a field to access the week of week-based-year,
     * computed based on a WeekFields.
     * @see WeekFields#weekOfWeekBasedYear()
     */
    static ofWeekOfWeekBasedYearField(weekDef) {
        return new ComputedDayOfField('WeekOfWeekBasedYear', weekDef,
            ChronoUnit.WEEKS, IsoFields.WEEK_BASED_YEARS, WEEK_OF_WEEK_BASED_YEAR_RANGE);
    }

    /**
     * Returns a field to access the week-based-year,
     * computed based on a WeekFields.
     * @see WeekFields#weekBasedYear()
     */
    static ofWeekBasedYearField(weekDef) {
        return new ComputedDayOfField('WeekBasedYear', weekDef,
            IsoFields.WEEK_BASED_YEARS, ChronoUnit.FOREVER, WEEK_BASED_YEAR_RANGE);
    }

    /**
     *@private
     */
    constructor(name, weekDef, baseUnit, rangeUnit, range) {
        this._name = name;
        this._weekDef = weekDef;
        this._baseUnit = baseUnit;
        this._rangeUnit = rangeUnit;
        this._range = range;
    }

    getFrom(temporal) {
        // Offset the ISO DOW by the start of this week
        const sow = this._weekDef.firstDayOfWeek().value();
        const dow = this._localizedDayOfWeek(temporal, sow);

        if (this._rangeUnit === ChronoUnit.WEEKS) {
            return dow;
        } else if (this._rangeUnit === ChronoUnit.MONTHS) {
            return this._localizedWeekOfMonth(temporal, dow);
        } else if (this._rangeUnit === ChronoUnit.YEARS) {
            return this._localizedWeekOfYear(temporal, dow);
        } else if (this._rangeUnit === IsoFields.WEEK_BASED_YEARS) {
            return this._localizedWOWBY(temporal);
        } else if (this._rangeUnit === ChronoUnit.FOREVER) {
            return this._localizedWBY(temporal);
        } else {
            throw new IllegalStateException('unreachable');
        }
    }

    _localizedDayOfWeek(temporal, sow) {
        const isoDow = temporal.get(ChronoField.DAY_OF_WEEK);
        return MathUtil.floorMod(isoDow - sow, 7) + 1;
    }

    _localizedWeekOfMonth(temporal, dow) {
        const dom = temporal.get(ChronoField.DAY_OF_MONTH);
        const offset = this._startOfWeekOffset(dom, dow);
        return ComputedDayOfField._computeWeek(offset, dom);
    }

    _localizedWeekOfYear(temporal, dow) {
        const doy = temporal.get(ChronoField.DAY_OF_YEAR);
        const offset = this._startOfWeekOffset(doy, dow);
        return ComputedDayOfField._computeWeek(offset, doy);
    }

    _localizedWOWBY(temporal) {
        const sow = this._weekDef.firstDayOfWeek().value();
        const isoDow = temporal.get(ChronoField.DAY_OF_WEEK);
        const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
        const woy = this._localizedWeekOfYear(temporal, dow);
        if (woy === 0) {
            const previous = LocalDate.from(temporal).minus(1, ChronoUnit.WEEKS);
            return this._localizedWeekOfYear(previous, dow) + 1;
        } else if (woy >= 53) {
            const offset = this._startOfWeekOffset(temporal.get(ChronoField.DAY_OF_YEAR), dow);
            const year = temporal.get(ChronoField.YEAR);
            const yearLen = Year.isLeap(year) ? 366 : 365;
            const weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
            if (woy >= weekIndexOfFirstWeekNextYear) {
                return (woy - (weekIndexOfFirstWeekNextYear - 1));
            }
        }
        return woy;
    }

    _localizedWBY(temporal) {
        const sow = this._weekDef.firstDayOfWeek().value();
        const isoDow = temporal.get(ChronoField.DAY_OF_WEEK);
        const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
        const year = temporal.get(ChronoField.YEAR);
        const woy = this._localizedWeekOfYear(temporal, dow);
        if (woy === 0) {
            return year - 1;
        } else if (woy < 53) {
            return year;
        }
        const offset = this._startOfWeekOffset(temporal.get(ChronoField.DAY_OF_YEAR), dow);
        const yearLen = Year.isLeap(year) ? 366 : 365;
        const weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
        if (woy >= weekIndexOfFirstWeekNextYear) {
            return year + 1;
        }
        return year;
    }

    /**
     * Returns an offset to align week start with a day of month or day of year.
     *
     * @param day the day; 1 through infinity
     * @param dow the day of the week of that day; 1 through 7
     * @return an offset in days to align a day with the start of the first 'full' week
     */
    _startOfWeekOffset(day, dow) {
        // offset of first day corresponding to the day of week in first 7 days (zero origin)
        const weekStart = MathUtil.floorMod(day - dow, 7);
        let offset = -weekStart;
        if (weekStart + 1 > this._weekDef.minimalDaysInFirstWeek()) {
            // The previous week has the minimum days in the current month to be a 'week'
            offset = 7 - weekStart;
        }
        return offset;
    }

    /**
     * Returns the week number computed from the reference day and reference dayOfWeek.
     *
     * @param offset the offset to align a date with the start of week
     *     from {@link #startOfWeekOffset}.
     * @param day  the day for which to compute the week number
     * @return the week number where zero is used for a partial week and 1 for the first full week
     */
    static _computeWeek(offset, day) {
        return MathUtil.intDiv((7 + offset + (day - 1)), 7);
    }

    adjustInto(temporal, newValue) {
        // Check the new value and get the old value of the field
        const newVal = this._range.checkValidIntValue(newValue, this);
        const currentVal = temporal.get(this);
        if (newVal === currentVal) {
            return temporal;
        }
        if (this._rangeUnit === ChronoUnit.FOREVER) {
            // adjust in whole weeks so dow never changes
            const baseWowby = temporal.get(this._weekDef.weekOfWeekBasedYear());
            const diffWeeks = MathUtil.roundDown((newValue - currentVal) * 52.1775);
            let result = temporal.plus(diffWeeks, ChronoUnit.WEEKS);
            if (result.get(this) > newVal) {
                // ended up in later week-based-year
                // move to last week of previous year
                const newWowby = result.get(this._weekDef.weekOfWeekBasedYear());
                result = result.minus(newWowby, ChronoUnit.WEEKS);
            } else {
                if (result.get(this) < newVal) {
                    // ended up in earlier week-based-year
                    result = result.plus(2, ChronoUnit.WEEKS);
                }
                // reset the week-of-week-based-year
                const newWowby = result.get(this._weekDef.weekOfWeekBasedYear());
                result = result.plus(baseWowby - newWowby, ChronoUnit.WEEKS);
                if (result.get(this) > newVal) {
                    result = result.minus(1, ChronoUnit.WEEKS);
                }
            }
            return result;
        }
        // Compute the difference and add that using the base using of the field
        const delta = newVal - currentVal;
        return temporal.plus(delta, this._baseUnit);
    }

    resolve(fieldValues, partialTemporal, resolverStyle) {
        const sow = this._weekDef.firstDayOfWeek().value();
        if (this._rangeUnit === ChronoUnit.WEEKS) {  // day-of-week
            const value = fieldValues.remove(this);
            const localDow = this._range.checkValidIntValue(value, this);
            const isoDow = MathUtil.floorMod((sow - 1) + (localDow - 1), 7) + 1;
            fieldValues.put(ChronoField.DAY_OF_WEEK, isoDow);
            return null;
        }
        if (fieldValues.containsKey(ChronoField.DAY_OF_WEEK) === false) {
            return null;
        }

        // week-based-year
        if (this._rangeUnit === ChronoUnit.FOREVER) {
            if (fieldValues.containsKey(this._weekDef.weekOfWeekBasedYear()) === false) {
                return null;
            }
            // const chrono = IsoChronology.INSTANCE; //TODO: Chronology.from(partialTemporal);  // defaults to ISO
            const isoDow = ChronoField.DAY_OF_WEEK.checkValidIntValue(fieldValues.get(ChronoField.DAY_OF_WEEK));
            const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
            const wby = this.range().checkValidIntValue(fieldValues.get(this), this);
            let date;
            let days;
            if (resolverStyle === ResolverStyle.LENIENT) {
                date = LocalDate.of(wby, 1, this._weekDef.minimalDaysInFirstWeek()); //TODO: chrono.date(wby, 1, this._weekDef.minimalDaysInFirstWeek());
                const wowby = fieldValues.get(this._weekDef.weekOfWeekBasedYear());
                const dateDow = this._localizedDayOfWeek(date, sow);
                const weeks = wowby - this._localizedWeekOfYear(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            } else {
                date = LocalDate.of(wby, 1, this._weekDef.minimalDaysInFirstWeek()); //TODO: chrono.date(wby, 1, this._weekDef.minimalDaysInFirstWeek());
                const wowby = this._weekDef.weekOfWeekBasedYear().range().checkValidIntValue(
                    fieldValues.get(this._weekDef.weekOfWeekBasedYear()), this._weekDef.weekOfWeekBasedYear);
                const dateDow = this._localizedDayOfWeek(date, sow);
                const weeks = wowby - this._localizedWeekOfYear(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            }
            date = date.plus(days, ChronoUnit.DAYS);
            if (resolverStyle === ResolverStyle.STRICT) {
                if (date.getLong(this) !== fieldValues.get(this)) {
                    throw new DateTimeException('Strict mode rejected date parsed to a different year');
                }
            }
            fieldValues.remove(this);
            fieldValues.remove(this._weekDef.weekOfWeekBasedYear());
            fieldValues.remove(ChronoField.DAY_OF_WEEK);
            return date;
        }

        if (fieldValues.containsKey(ChronoField.YEAR) === false) {
            return null;
        }
        const isoDow = ChronoField.DAY_OF_WEEK.checkValidIntValue(fieldValues.get(ChronoField.DAY_OF_WEEK));
        const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
        const year = ChronoField.YEAR.checkValidIntValue(fieldValues.get(ChronoField.YEAR));
        // const chrono = IsoChronology.INSTANCE; //TODO: Chronology.from(partialTemporal);  // defaults to ISO
        if (this._rangeUnit === ChronoUnit.MONTHS) {  // week-of-month
            if (fieldValues.containsKey(ChronoField.MONTH_OF_YEAR) === false) {
                return null;
            }
            const value = fieldValues.remove(this);
            let date;
            let days;
            if (resolverStyle === ResolverStyle.LENIENT) {
                const month = fieldValues.get(ChronoField.MONTH_OF_YEAR);
                date = LocalDate.of(year, 1, 1); // TODO: chrono.date(year, 1, 1);
                date = date.plus(month - 1, ChronoUnit.MONTHS);
                const dateDow = this._localizedDayOfWeek(date, sow);
                const weeks = value - this._localizedWeekOfMonth(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            } else {
                const month = ChronoField.MONTH_OF_YEAR.checkValidIntValue(fieldValues.get(ChronoField.MONTH_OF_YEAR));
                date = LocalDate.of(year, month, 8); // TODO: chrono.date(year, month, 8);
                const dateDow = this._localizedDayOfWeek(date, sow);
                const wom = this._range.checkValidIntValue(value, this);
                const weeks = wom - this._localizedWeekOfMonth(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            }
            date = date.plus(days, ChronoUnit.DAYS);
            if (resolverStyle === ResolverStyle.STRICT) {
                if (date.getLong(ChronoField.MONTH_OF_YEAR) !== fieldValues.get(ChronoField.MONTH_OF_YEAR)) {
                    throw new DateTimeException('Strict mode rejected date parsed to a different month');
                }
            }
            fieldValues.remove(this);
            fieldValues.remove(ChronoField.YEAR);
            fieldValues.remove(ChronoField.MONTH_OF_YEAR);
            fieldValues.remove(ChronoField.DAY_OF_WEEK);
            return date;
        } else if (this._rangeUnit === ChronoUnit.YEARS) {  // week-of-year
            const value = fieldValues.remove(this);
            let date = LocalDate.of(year, 1, 1); // TODO: chrono.date(year, 1, 1);
            let days;
            if (resolverStyle === ResolverStyle.LENIENT) {
                const dateDow = this._localizedDayOfWeek(date, sow);
                const weeks = value - this._localizedWeekOfYear(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            } else {
                const dateDow = this._localizedDayOfWeek(date, sow);
                const woy = this._range.checkValidIntValue(value, this);
                const weeks = woy - this._localizedWeekOfYear(date, dateDow);
                days = weeks * 7 + (dow - dateDow);
            }
            date = date.plus(days, ChronoUnit.DAYS);
            if (resolverStyle === ResolverStyle.STRICT) {
                if (date.getLong(ChronoField.YEAR) !== fieldValues.get(ChronoField.YEAR)) {
                    throw new DateTimeException('Strict mode rejected date parsed to a different year');
                }
            }
            fieldValues.remove(this);
            fieldValues.remove(ChronoField.YEAR);
            fieldValues.remove(ChronoField.DAY_OF_WEEK);
            return date;
        } else {
            throw new IllegalStateException('unreachable');
        }
    }

    //-----------------------------------------------------------------------
    name() {
        return this._name;
    }

    baseUnit() {
        return this._baseUnit;
    }

    rangeUnit() {
        return this._rangeUnit;
    }

    range() {
        return this._range;
    }

    //-----------------------------------------------------------------------
    isDateBased() {
        return true;
    }

    isTimeBased() {
        return false;
    }

    isSupportedBy(temporal) {
        if (temporal.isSupported(ChronoField.DAY_OF_WEEK)) {
            if (this._rangeUnit === ChronoUnit.WEEKS) {
                return true;
            } else if (this._rangeUnit === ChronoUnit.MONTHS) {
                return temporal.isSupported(ChronoField.DAY_OF_MONTH);
            } else if (this._rangeUnit === ChronoUnit.YEARS) {
                return temporal.isSupported(ChronoField.DAY_OF_YEAR);
            } else if (this._rangeUnit === IsoFields.WEEK_BASED_YEARS) {
                return temporal.isSupported(ChronoField.EPOCH_DAY);
            } else if (this._rangeUnit === ChronoUnit.FOREVER) {
                return temporal.isSupported(ChronoField.EPOCH_DAY);
            }
        }
        return false;
    }

    rangeRefinedBy(temporal) {
        if (this._rangeUnit === ChronoUnit.WEEKS) {
            return this._range;
        }

        let field = null;
        if (this._rangeUnit === ChronoUnit.MONTHS) {
            field = ChronoField.DAY_OF_MONTH;
        } else if (this._rangeUnit === ChronoUnit.YEARS) {
            field = ChronoField.DAY_OF_YEAR;
        } else if (this._rangeUnit === IsoFields.WEEK_BASED_YEARS) {
            return this._rangeWOWBY(temporal);
        } else if (this._rangeUnit === ChronoUnit.FOREVER) {
            return temporal.range(ChronoField.YEAR);
        } else {
            throw new IllegalStateException('unreachable');
        }

        // Offset the ISO DOW by the start of this week
        const sow = this._weekDef.firstDayOfWeek().value();
        const isoDow = temporal.get(ChronoField.DAY_OF_WEEK);
        const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;

        const offset = this._startOfWeekOffset(temporal.get(field), dow);
        const fieldRange = temporal.range(field);
        return ValueRange.of(ComputedDayOfField._computeWeek(offset, fieldRange.minimum()),
            ComputedDayOfField._computeWeek(offset, fieldRange.maximum()));
    }

    _rangeWOWBY(temporal) {
        const sow = this._weekDef.firstDayOfWeek().value();
        const isoDow = temporal.get(ChronoField.DAY_OF_WEEK);
        const dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
        const woy = this._localizedWeekOfYear(temporal, dow);
        if (woy === 0) {
            // TODO: we use IsoChronology for now
            return this._rangeWOWBY(IsoChronology.INSTANCE.date(temporal).minus(2, ChronoUnit.WEEKS));
            // return this._rangeWOWBY(Chronology.from(temporal).date(temporal).minus(2, ChronoUnit.WEEKS));
        }
        const offset = this._startOfWeekOffset(temporal.get(ChronoField.DAY_OF_YEAR), dow);
        const year = temporal.get(ChronoField.YEAR);
        const yearLen = Year.isLeap(year) ? 366 : 365;
        const weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
        if (woy >= weekIndexOfFirstWeekNextYear) {
            // TODO: we use IsoChronology for now
            return this._rangeWOWBY(IsoChronology.INSTANCE.date(temporal).plus(2, ChronoUnit.WEEKS));
            // return this._rangeWOWBY(Chronology.from(temporal).date(temporal).plus(2, ChronoUnit.WEEKS));
        }
        return ValueRange.of(1, weekIndexOfFirstWeekNextYear - 1);
    }

    displayName(locale) {
        requireNonNull(locale, 'locale');
        if (this._rangeUnit === ChronoUnit.YEARS) {  // week-of-year
            return 'Week';
        }
        return this.toString();
    }

    //-----------------------------------------------------------------------
    toString() {
        return this._name + '[' + this._weekDef.toString() + ']';
    }
}

/**
 * The cache of rules by firstDayOfWeek plus minimalDays.
 * Initialized first to be available for definition of ISO, etc.
 */
const WeekFieldsCache = new Map();


/**
 * Localized definitions of the day-of-week, week-of-month and week-of-year fields.
 * <p>
 * A standard week is seven days long, but cultures have different definitions for some
 * other aspects of a week. This class represents the definition of the week, for the
 * purpose of providing {@link TemporalField} instances.
 * <p>
 * WeekFields provides three fields,
 * {@link #dayOfWeek()}, {@link #weekOfMonth()}, and {@link #weekOfYear()}
 * that provide access to the values from any {@link Temporal temporal object}.
 * <p>
 * The computations for day-of-week, week-of-month, and week-of-year are based
 * on the  {@link ChronoField#YEAR proleptic-year},
 * {@link ChronoField#MONTH_OF_YEAR month-of-year},
 * {@link ChronoField#DAY_OF_MONTH day-of-month}, and
 * {@link ChronoField#DAY_OF_WEEK ISO day-of-week} which are based on the
 * {@link ChronoField#EPOCH_DAY epoch-day} and the chronology.
 * The values may not be aligned with the {@link ChronoField#YEAR_OF_ERA year-of-Era}
 * depending on the Chronology.
 * <p>A week is defined by:
 * <ul>
 * <li>The first day-of-week.
 * For example, the ISO-8601 standard considers Monday to be the first day-of-week.
 * <li>The minimal number of days in the first week.
 * For example, the ISO-8601 standard counts the first week as needing at least 4 days.
 * </ul><p>
 * Together these two values allow a year or month to be divided into weeks.
 * <p>
 * <h3>Week of Month</h3>
 * One field is used: week-of-month.
 * The calculation ensures that weeks never overlap a month boundary.
 * The month is divided into periods where each period starts on the defined first day-of-week.
 * The earliest period is referred to as week 0 if it has less than the minimal number of days
 * and week 1 if it has at least the minimal number of days.
 * <p>
 * <table cellpadding="0" cellspacing="3" border="0" style="text-align: left; width: 50%;">
 * <caption>Examples of WeekFields</caption>
 * <tr><th>Date</th><td>Day-of-week</td>
 *  <td>First day: Monday<br>Minimal days: 4</td><td>First day: Monday<br>Minimal days: 5</td></tr>
 * <tr><th>2008-12-31</th><td>Wednesday</td>
 *  <td>Week 5 of December 2008</td><td>Week 5 of December 2008</td></tr>
 * <tr><th>2009-01-01</th><td>Thursday</td>
 *  <td>Week 1 of January 2009</td><td>Week 0 of January 2009</td></tr>
 * <tr><th>2009-01-04</th><td>Sunday</td>
 *  <td>Week 1 of January 2009</td><td>Week 0 of January 2009</td></tr>
 * <tr><th>2009-01-05</th><td>Monday</td>
 *  <td>Week 2 of January 2009</td><td>Week 1 of January 2009</td></tr>
 * </table>
 * <p>
 * <h3>Week of Year</h3>
 * One field is used: week-of-year.
 * The calculation ensures that weeks never overlap a year boundary.
 * The year is divided into periods where each period starts on the defined first day-of-week.
 * The earliest period is referred to as week 0 if it has less than the minimal number of days
 * and week 1 if it has at least the minimal number of days.
 * <p>
 * This class is immutable and thread-safe.
 */
export class WeekFields {
    // implementation notes
    // querying week-of-month or week-of-year should return the week value bound within the month/year
    // however, setting the week value should be lenient (use plus/minus weeks)
    // allow week-of-month outer range [0 to 5]
    // allow week-of-year outer range [0 to 53]
    // this is because callers shouldn't be expected to know the details of validity

    /**
     * function overloading for {@link WeekFields#of}
     *
     * if called with 1 arguments then {@link WeekFields.ofLocale} is executed.
     *
     * Otherwise {@link WeekFields.ofFirstDayOfWeekMinDays} is executed.
     *
     * @param {!DayOfWeek | Locale} firstDayOrLocale
     * @param {Number} minDays
     * @returns {WeekFields} this for chaining
     */
    static of(firstDayOrLocale, minDays) {
        if (minDays === undefined) {
            return WeekFields.ofLocale(firstDayOrLocale);
        } else {
            return WeekFields.ofFirstDayOfWeekMinDays(firstDayOrLocale, minDays);
        }
    }

    /**
     * Obtains an instance of {@code WeekFields} appropriate for a locale.
     * <p>
     * This will look up appropriate values from the provider of localization data.
     *
     * @param {!Locale} locale  the locale to use, not null
     * @return the week-definition, not null
     */
    static ofLocale(locale) {
        requireNonNull(locale, 'locale');

        Cldr.load(cldrData('supplemental/weekData.json'));
        const cldr = new Cldr(locale.localeString());
        const worldRegion = '001';
        const weekData = cldr.get('supplemental/weekData');
        let dow = _weekDayMap[weekData.firstDay[locale.country()]];
        if (!dow) {
            dow = _weekDayMap[weekData.firstDay[worldRegion]];
        }
        let minDays = weekData.minDays[locale.country()];
        if (!minDays) {
            minDays = weekData.minDays[worldRegion];
        }
        return WeekFields.ofFirstDayOfWeekMinDays(dow, minDays);
    }

    /**
     * Obtains an instance of {@code WeekFields} from the first day-of-week and minimal days.
     * <p>
     * The first day-of-week defines the ISO {@code DayOfWeek} that is day 1 of the week.
     * The minimal number of days in the first week defines how many days must be present
     * in a month or year, starting from the first day-of-week, before the week is counted
     * as the first week. A value of 1 will count the first day of the month or year as part
     * of the first week, whereas a value of 7 will require the whole seven days to be in
     * the new month or year.
     * <p>
     * WeekFields instances are singletons; for each unique combination
     * of {@code firstDayOfWeek} and {@code minimalDaysInFirstWeek} the
     * the same instance will be returned.
     *
     * @param {!DayOfWeek} firstDayOfWeek  the first day of the week, not null
     * @param {!Number} minimalDaysInFirstWeek  the minimal number of days in the first week, from
     *     1 to 7
     * @return {WeekFields} the week-definition, not null
     * @throws IllegalArgumentException if the minimal days value is less than one
     *      or greater than 7
     */
    static ofFirstDayOfWeekMinDays(firstDayOfWeek, minimalDaysInFirstWeek) {
        requireNonNull(firstDayOfWeek, 'firstDayOfWeek');
        requireInstance(firstDayOfWeek, DayOfWeek, 'firstDayOfWeek');
        requireNonNull(minimalDaysInFirstWeek, 'minimalDaysInFirstWeek');
        const key = firstDayOfWeek.toString() + minimalDaysInFirstWeek;
        let rules = WeekFieldsCache.get(key);
        if (rules == null) {
            rules = new WeekFields(firstDayOfWeek, minimalDaysInFirstWeek);
            WeekFieldsCache.set(key, rules);
            rules = WeekFieldsCache.get(key);
        }
        return rules;
    }

    //-----------------------------------------------------------------------
    /**
     * Creates an instance of the definition.
     *
     * @param {!DayOfWeek} firstDayOfWeek  the first day of the week, not null
     * @param {!Number} minimalDaysInFirstWeek  the minimal number of days in the first week, from
     *     1 to 7
     * @throws IllegalArgumentException if the minimal days value is invalid
     *
     * @private
     */
    constructor(firstDayOfWeek, minimalDaysInFirstWeek) {
        requireNonNull(firstDayOfWeek, 'firstDayOfWeek');
        requireInstance(firstDayOfWeek, DayOfWeek, 'firstDayOfWeek');
        requireNonNull(minimalDaysInFirstWeek, 'minimalDaysInFirstWeek');
        if (minimalDaysInFirstWeek < 1 || minimalDaysInFirstWeek > 7) {
            throw new IllegalArgumentException('Minimal number of days is invalid');
        }
        this._firstDayOfWeek = firstDayOfWeek;
        this._minimalDays = minimalDaysInFirstWeek;
        this._dayOfWeek = ComputedDayOfField.ofDayOfWeekField(this);
        this._weekOfMonth = ComputedDayOfField.ofWeekOfMonthField(this);
        this._weekOfYear = ComputedDayOfField.ofWeekOfYearField(this);
        this._weekOfWeekBasedYear = ComputedDayOfField.ofWeekOfWeekBasedYearField(this);
        this._weekBasedYear = ComputedDayOfField.ofWeekBasedYearField(this);
        Cldr.load(cldrData('supplemental/likelySubtags.json'));
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the first day-of-week.
     * <p>
     * The first day-of-week varies by culture.
     * For example, the US uses Sunday, while France and the ISO-8601 standard use Monday.
     * This method returns the first day using the standard {@code DayOfWeek} enum.
     *
     * @return {DayOfWeek} the first day-of-week, not null
     */
    firstDayOfWeek() {
        return this._firstDayOfWeek;
    }

    /**
     * Gets the minimal number of days in the first week.
     * <p>
     * The number of days considered to define the first week of a month or year
     * varies by culture.
     * For example, the ISO-8601 requires 4 days (more than half a week) to
     * be present before counting the first week.
     *
     * @return {Number} the minimal number of days in the first week of a month or year, from 1 to 7
     */
    minimalDaysInFirstWeek() {
        return this._minimalDays;
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a field to access the day of week based on this {@code WeekFields}.
     * <p>
     * This is similar to {@link ChronoField#DAY_OF_WEEK} but uses values for
     * the day-of-week based on this {@code WeekFields}.
     * The days are numbered from 1 to 7 where the
     * {@link #getFirstDayOfWeek() first day-of-week} is assigned the value 1.
     * <p>
     * For example, if the first day-of-week is Sunday, then that will have the
     * value 1, with other days ranging from Monday as 2 to Saturday as 7.
     * <p>
     * In the resolving phase of parsing, a localized day-of-week will be converted
     * to a standardized {@code ChronoField} day-of-week.
     * The day-of-week must be in the valid range 1 to 7.
     * Other fields in this class build dates using the standardized day-of-week.
     *
     * @return {TemporalField} a field providing access to the day-of-week with localized
     *     numbering, not null
     */
    dayOfWeek() {
        return this._dayOfWeek;
    }

    /**
     * Returns a field to access the week of month based on this {@code WeekFields}.
     * <p>
     * This represents the concept of the count of weeks within the month where weeks
     * start on a fixed day-of-week, such as Monday.
     * This field is typically used with {@link WeekFields#dayOfWeek()}.
     * <p>
     * Week one (1) is the week starting on the {@link WeekFields#firstDayOfWeek}
     * where there are at least {@link WeekFields#getMinimalDaysInFirstWeek()} days in the month.
     * Thus, week one may start up to {@code minDays} days before the start of the month.
     * If the first week starts after the start of the month then the period before is week zero
     * (0).
     * <p>
     * For example:<br>
     * - if the 1st day of the month is a Monday, week one starts on the 1st and there is no week
     * zero<br>
     * - if the 2nd day of the month is a Monday, week one starts on the 2nd and the 1st is in week
     * zero<br>
     * - if the 4th day of the month is a Monday, week one starts on the 4th and the 1st to 3rd is
     * in week zero<br>
     * - if the 5th day of the month is a Monday, week two starts on the 5th and the 1st to 4th is
     * in week one<br>
     * <p>
     * This field can be used with any calendar system.
     * <p>
     * In the resolving phase of parsing, a date can be created from a year,
     * week-of-month, month-of-year and day-of-week.
     * <p>
     * In {@linkplain ResolverStyle#STRICT strict mode}, all four fields are
     * validated against their range of valid values. The week-of-month field
     * is validated to ensure that the resulting month is the month requested.
     * <p>
     * In {@linkplain ResolverStyle#SMART smart mode}, all four fields are
     * validated against their range of valid values. The week-of-month field
     * is validated from 0 to 6, meaning that the resulting date can be in a
     * different month to that specified.
     * <p>
     * In {@linkplain ResolverStyle#LENIENT lenient mode}, the year and day-of-week
     * are validated against the range of valid values. The resulting date is calculated
     * equivalent to the following four stage approach.
     * First, create a date on the first day of the first week of January in the requested year.
     * Then take the month-of-year, subtract one, and add the amount in months to the date.
     * Then take the week-of-month, subtract one, and add the amount in weeks to the date.
     * Finally, adjust to the correct day-of-week within the localized week.
     *
     * @return {TemporalField} a field providing access to the week-of-month, not null
     */
    weekOfMonth() {
        return this._weekOfMonth;
    }

    /**
     * Returns a field to access the week of year based on this {@code WeekFields}.
     * <p>
     * This represents the concept of the count of weeks within the year where weeks
     * start on a fixed day-of-week, such as Monday.
     * This field is typically used with {@link WeekFields#dayOfWeek()}.
     * <p>
     * Week one(1) is the week starting on the {@link WeekFields#firstDayOfWeek}
     * where there are at least {@link WeekFields#getMinimalDaysInFirstWeek()} days in the year.
     * Thus, week one may start up to {@code minDays} days before the start of the year.
     * If the first week starts after the start of the year then the period before is week zero
     * (0).
     * <p>
     * For example:<br>
     * - if the 1st day of the year is a Monday, week one starts on the 1st and there is no week
     * zero<br>
     * - if the 2nd day of the year is a Monday, week one starts on the 2nd and the 1st is in week
     * zero<br>
     * - if the 4th day of the year is a Monday, week one starts on the 4th and the 1st to 3rd is
     * in week zero<br>
     * - if the 5th day of the year is a Monday, week two starts on the 5th and the 1st to 4th is
     * in week one<br>
     * <p>
     * This field can be used with any calendar system.
     * <p>
     * In the resolving phase of parsing, a date can be created from a year,
     * week-of-year and day-of-week.
     * <p>
     * In {@linkplain ResolverStyle#STRICT strict mode}, all three fields are
     * validated against their range of valid values. The week-of-year field
     * is validated to ensure that the resulting year is the year requested.
     * <p>
     * In {@linkplain ResolverStyle#SMART smart mode}, all three fields are
     * validated against their range of valid values. The week-of-year field
     * is validated from 0 to 54, meaning that the resulting date can be in a
     * different year to that specified.
     * <p>
     * In {@linkplain ResolverStyle#LENIENT lenient mode}, the year and day-of-week
     * are validated against the range of valid values. The resulting date is calculated
     * equivalent to the following three stage approach.
     * First, create a date on the first day of the first week in the requested year.
     * Then take the week-of-year, subtract one, and add the amount in weeks to the date.
     * Finally, adjust to the correct day-of-week within the localized week.
     *
     * @return {TemporalField} a field providing access to the week-of-year, not null
     */
    weekOfYear() {
        return this._weekOfYear;
    }

    /**
     * Returns a field to access the week of a week-based-year based on this {@code WeekFields}.
     * <p>
     * This represents the concept of the count of weeks within the year where weeks
     * start on a fixed day-of-week, such as Monday and each week belongs to exactly one year.
     * This field is typically used with {@link WeekFields#dayOfWeek()} and
     * {@link WeekFields#weekBasedYear()}.
     * <p>
     * Week one(1) is the week starting on the {@link WeekFields#firstDayOfWeek}
     * where there are at least {@link WeekFields#getMinimalDaysInFirstWeek()} days in the year.
     * If the first week starts after the start of the year then the period before
     * is in the last week of the previous year.
     * <p>
     * For example:<br>
     * - if the 1st day of the year is a Monday, week one starts on the 1st<br>
     * - if the 2nd day of the year is a Monday, week one starts on the 2nd and
     *   the 1st is in the last week of the previous year<br>
     * - if the 4th day of the year is a Monday, week one starts on the 4th and
     *   the 1st to 3rd is in the last week of the previous year<br>
     * - if the 5th day of the year is a Monday, week two starts on the 5th and
     *   the 1st to 4th is in week one<br>
     * <p>
     * This field can be used with any calendar system.
     * <p>
     * In the resolving phase of parsing, a date can be created from a week-based-year,
     * week-of-year and day-of-week.
     * <p>
     * In {@linkplain ResolverStyle#STRICT strict mode}, all three fields are
     * validated against their range of valid values. The week-of-year field
     * is validated to ensure that the resulting week-based-year is the
     * week-based-year requested.
     * <p>
     * In {@linkplain ResolverStyle#SMART smart mode}, all three fields are
     * validated against their range of valid values. The week-of-week-based-year field
     * is validated from 1 to 53, meaning that the resulting date can be in the
     * following week-based-year to that specified.
     * <p>
     * In {@linkplain ResolverStyle#LENIENT lenient mode}, the year and day-of-week
     * are validated against the range of valid values. The resulting date is calculated
     * equivalent to the following three stage approach.
     * First, create a date on the first day of the first week in the requested week-based-year.
     * Then take the week-of-week-based-year, subtract one, and add the amount in weeks to the date.
     * Finally, adjust to the correct day-of-week within the localized week.
     *
     * @return {TemporalField} a field providing access to the week-of-week-based-year, not null
     */
    weekOfWeekBasedYear() {
        return this._weekOfWeekBasedYear;
    }

    /**
     * Returns a field to access the year of a week-based-year based on this {@code WeekFields}.
     * <p>
     * This represents the concept of the year where weeks start on a fixed day-of-week,
     * such as Monday and each week belongs to exactly one year.
     * This field is typically used with {@link WeekFields#dayOfWeek()} and
     * {@link WeekFields#weekOfWeekBasedYear()}.
     * <p>
     * Week one(1) is the week starting on the {@link WeekFields#firstDayOfWeek}
     * where there are at least {@link WeekFields#getMinimalDaysInFirstWeek()} days in the year.
     * Thus, week one may start before the start of the year.
     * If the first week starts after the start of the year then the period before
     * is in the last week of the previous year.
     * <p>
     * This field can be used with any calendar system.
     * <p>
     * In the resolving phase of parsing, a date can be created from a week-based-year,
     * week-of-year and day-of-week.
     * <p>
     * In {@linkplain ResolverStyle#STRICT strict mode}, all three fields are
     * validated against their range of valid values. The week-of-year field
     * is validated to ensure that the resulting week-based-year is the
     * week-based-year requested.
     * <p>
     * In {@linkplain ResolverStyle#SMART smart mode}, all three fields are
     * validated against their range of valid values. The week-of-week-based-year field
     * is validated from 1 to 53, meaning that the resulting date can be in the
     * following week-based-year to that specified.
     * <p>
     * In {@linkplain ResolverStyle#LENIENT lenient mode}, the year and day-of-week
     * are validated against the range of valid values. The resulting date is calculated
     * equivalent to the following three stage approach.
     * First, create a date on the first day of the first week in the requested week-based-year.
     * Then take the week-of-week-based-year, subtract one, and add the amount in weeks to the date.
     * Finally, adjust to the correct day-of-week within the localized week.
     *
     * @return {TemporalField} a field providing access to the week-based-year, not null
     */
    weekBasedYear() {
        return this._weekBasedYear;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this {@code WeekFields} is equal to the specified other.
     * <p>
     * The comparison is based on the entire state of the rules, which is
     * the first day-of-week and minimal days.
     *
     * @param {*} other  the other rules to compare to, null returns false
     * @return true if this is equal to the specified rules
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof WeekFields) {
            return this.hashCode() === other.hashCode();
        }
        return false;
    }

    /**
     * A hash code for this {@code WeekFields}.
     *
     * @return a suitable hash code
     */
    hashCode() {
        return this._firstDayOfWeek.ordinal() * 7 + this._minimalDays;
    }

    //-----------------------------------------------------------------------
    /**
     * A string representation of this {@code WeekFields} instance.
     *
     * @return the string representation, not null
     */
    toString() {
        return 'WeekFields[' + this._firstDayOfWeek + ',' + this._minimalDays + ']';
    }

}

export function _init() {
    /**
     * The ISO-8601 definition, where a week starts on Monday and the first week
     * has a minimum of 4 days.
     * <p>
     * The ISO-8601 standard defines a calendar system based on weeks.
     * It uses the week-based-year and week-of-week-based-year concepts to split
     * up the passage of days instead of the standard year/month/day.
     * <p>
     * Note that the first week may start in the previous calendar year.
     * Note also that the first few days of a calendar year may be in the
     * week-based-year corresponding to the previous calendar year.
     */
    WeekFields.ISO = WeekFields.of(DayOfWeek.MONDAY, 4);

    /**
     * The common definition of a week that starts on Sunday.
     * <p>
     * Defined as starting on Sunday and with a minimum of 1 day in the month.
     * This week definition is in use in the US and other European countries.
     *
     */
    WeekFields.SUNDAY_START = WeekFields.of(DayOfWeek.SUNDAY, 1);

}
