/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoField, ChronoUnit, Clock, DateTimeException, DateTimeFormatterBuilder, DayOfWeek, IllegalArgumentException, IsoChronology, IsoFields, LocalDate, NullPointerException, SignStyle, Temporal, TemporalField, TemporalQueries, TemporalQuery, TemporalUnit, UnsupportedTemporalTypeException, ValueRange, Year, ZoneId } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { assert, requireInstance, requireNonNull } from './assert';
import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * A year-week in the ISO week date system such as `2015-W13`
 * 
 * {@link YearWeek} is an immutable date-time object that represents the combination
 * of a week-based-year and week-of-week-based-year.
 * Any field that can be derived from those two fields can be obtained.
 * 
 * This class does not store or represent a day, time or time-zone.
 * For example, the value '13th week of 2007' can be stored in a {@link YearWeek}.
 * 
 * The ISO-8601 calendar system is the modern civil calendar system used today
 * in most of the world. It is equivalent to the proleptic Gregorian calendar
 * system, in which today's rules for leap years are applied for all time.
 * For most applications written today, the ISO-8601 rules are entirely suitable.
 * However, any application that makes use of historical dates, and requires them
 * to be accurate will find the ISO-8601 approach unsuitable.
 * 
 * ISO-8601 defines the week as always starting with Monday.
 * The first week is the week which contains the first Thursday of the calendar year.
 * As such, the week-based-year used in this class does not align with the calendar year.
 */
export class YearWeek extends Temporal {
    /**
     * Function overloading for {@link YearWeek.now}:
     * * if called with no arguments, {@link YearWeek.now0} is executed;
     * * if called with an instance of {@link ZoneId}, then {@link YearWeek.nowZoneId} is executed;
     * * if called with an instance of {@link Clock}, then {@link YearWeek.nowClock} is executed;
     * * otherwise {@link IllegalArgumentException} is thrown.
     * 
     * @param {?(ZoneId|Clock)} zoneIdOrClock
     * @returns {YearWeek}
     */
    static now(zoneIdOrClock) {
        switch (arguments.length) {
            case 0:
                return YearWeek.now0();
            case 1:
                requireNonNull(zoneIdOrClock, 'clockOrZone');
                if (zoneIdOrClock instanceof ZoneId) {
                    return YearWeek.nowZoneId(zoneIdOrClock);
                }
                if (zoneIdOrClock instanceof Clock) {
                    return YearWeek.nowClock(zoneIdOrClock);
                }
                throw new IllegalArgumentException(`zoneIdOrClock must be an instance of ZoneId or Clock, but is ${zoneIdOrClock.constructor.name}`);
            default:
                throw new IllegalArgumentException(`Invalid number of arguments: ${arguments.length}`);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the current year-week from the system clock in the default time-zone.
     * 
     * This will query the {@link Clock.systemDefaultZone} system clock in the default
     * time-zone to obtain the current year-week.
     * The zone and offset will be set based on the time-zone in the clock.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return the current year-week using the system clock and default time-zone, not null
     * @private
     */
    static now0() {
        return YearWeek.now(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current year-week from the system clock in the specified time-zone.
     * 
     * This will query the {@link Clock.system} system clock to obtain the current year-week.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param zone  the zone ID to use, not null
     * @return the current year-week using the system clock, not null
     * @private
     */
    static nowZoneId(zone) {
        return YearWeek.now(Clock.system(zone));
    }

    /**
     * Obtains the current year-week from the specified clock.
     * 
     * This will query the specified clock to obtain the current year-week.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock} dependency injection.
     *
     * @param clock  the clock to use, not null
     * @return the current year-week, not null
     * @private
     */
    static nowClock(clock) {
        const now = LocalDate.now(clock);  // called once
        return YearWeek.of(now.get(IsoFields.WEEK_BASED_YEAR), now.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
    }

    //-----------------------------------------------------------------------
    /**
     * Function overloading for {@link YearWeek.of}:
     * * if called with an instances of {@link Year} and `int`, then {@link YearWeek.ofYearWeek} is executed;
     * * if called with an instances of number and `int`, then {@link YearWeek.ofWeekBasedYear} is executed;
     * * otherwise {@link IllegalArgumentException} is thrown.
     * 
     * @param year  the year to represent, not null
     * @param week  the week-of-week-based-year to represent, from 1 to 53
     * @return the year-week, not null
     */
    static of(year, week) {
        MathUtil.verifyInt(week);
        if (year instanceof Year) {
            return this.ofYearWeek(year, week);
        } else {
            MathUtil.verifyInt(year);
            return this.ofWeekBasedYear(year, week);
        }
    }

    /**
     * Obtains an instance of {@link YearWeek} from a year and week.
     * 
     * If the week is 53 and the year does not have 53 weeks, week one of the following
     * year is selected.
     * 
     * Note that this class is based on the week-based-year which aligns to Monday to Sunday weeks,
     * whereas {@link Year} is intended to represent standard years aligned from January to December.
     * This difference may be seen at the start and/or end of the year.
     * This method treats the standard year as though it is the week-based-year.
     * Thus, `YearWeek.of(Year.of(2020), 1)` creates an object where Monday and Tuesday of the week
     * are actually the last two days of 2019.
     *
     * @param year  the year to represent, not null
     * @param week  the week-of-week-based-year to represent, from 1 to 53
     * @return the year-week, not null
     * @throws {DateTimeException} if the week value is invalid
     */
    static ofYearWeek(year, week) {
        const weekBasedYear = year.value();
        return this.ofWeekBasedYear(weekBasedYear, week);
    }

    /**
     * Obtains an instance of {@link YearWeek} from a week-based-year and week.
     * 
     * If the week is 53 and the year does not have 53 weeks, week one of the following
     * year is selected.
     *
     * @param weekBasedYear  the week-based-year to represent, from MIN_YEAR to MAX_YEAR
     * @param week  the week-of-week-based-year to represent, from 1 to 53
     * @return the year-week, not null
     * @throws {DateTimeException} if either field is invalid
     */
    static ofWeekBasedYear(weekBasedYear, week) {
        IsoFields.WEEK_BASED_YEAR.range().checkValidValue(weekBasedYear, IsoFields.WEEK_BASED_YEAR);
        IsoFields.WEEK_OF_WEEK_BASED_YEAR.range().checkValidValue(week, IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        if (week === 53 && YearWeek.weekRange(weekBasedYear) < 53) {
            week = 1;
            weekBasedYear++;
            IsoFields.WEEK_BASED_YEAR.range().checkValidValue(weekBasedYear, IsoFields.WEEK_BASED_YEAR);
        }
        return new YearWeek(weekBasedYear, week);
    }

    /**
     * from IsoFields in ThreeTen-Backport
     * @private
     */
    static weekRange(weekBasedYear) {
        const date = LocalDate.of(weekBasedYear, 1, 1);
        // 53 weeks if year starts on Thursday, or Wed in a leap year
        if (date.dayOfWeek() === DayOfWeek.THURSDAY || (date.dayOfWeek() === DayOfWeek.WEDNESDAY && date.isLeapYear())) {
            return 53;
        }
        return 52;
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link YearWeek} from a temporal object.
     * 
     * This obtains a year-week based on the specified temporal.
     * A {@link TemporalAccessor} represents an arbitrary set of date and time information,
     * which this factory converts to an instance of {@link YearWeek}.
     * 
     * The conversion extracts the {@link IsoFields.WEEK_BASED_YEAR} WEEK_BASED_YEAR and
     * {@link IsoFields.WEEK_OF_WEEK_BASED_YEAR} WEEK_OF_WEEK_BASED_YEAR fields.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a {@link LocalDate}.
     * 
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@link YearWeek.FROM}.
     *
     * @param temporal  the temporal object to convert, not null
     * @return the year-week, not null
     * @throws {DateTimeException} if unable to convert to a {@link YearWeek}
     */
    static from(temporal) {
        if (temporal instanceof YearWeek) {
            return temporal;
        }
        requireNonNull(temporal, 'temporal');
        try {
            /* TODO: only IsoChronology for now
            if (!IsoChronology.INSTANCE.equals(Chronology.from(temporal))) {
                temporal = LocalDate.from(temporal);
            }*/
            // need to use getLong() as JDK Parsed class get() doesn't work properly
            const year = MathUtil.safeToInt(temporal.getLong(IsoFields.WEEK_BASED_YEAR));
            const week = MathUtil.safeToInt(temporal.getLong(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
            return YearWeek.of(year, week);
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain YearWeek from TemporalAccessor: ${temporal.constructor.name}`, ex);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link YearWeek} from a text string using a specific formatter.
     * 
     * The text is parsed using the formatter, returning a year-week.
     *
     * @param text  the text to parse, not null
     * @param {DateTimeFormatter} [formatter=YearWeek.PARSER] - the formatter to use, default is
     * {@link YearWeek.PARSER}
     * 
     * @return the parsed year-week, not null
     * @throws {DateTimeParseException} if the text cannot be parsed
     */
    static parse(text, formatter = YearWeek.PARSER) {
        assert(formatter != null, 'formatter', NullPointerException);
        return formatter.parse(text, YearWeek.FROM);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param weekBasedYear  the week-based-year to represent, validated from MIN_YEAR to MAX_YEAR
     * @param week  the week to represent, validated
     */
    constructor(weekBasedYear, week) {
        super();
        this._year = weekBasedYear;
        this._week = week;
    }

    /**
     * function overloading for {@link YearWeek.isSupported}
     *
     * * if called with an instance of {@link TemporalField}, then {@link YearWeek.isSupportedField} is executed,
     * * if called with an instance of {@link TemporalUnit}, then {@link YearWeek.isSupportedUnit} is executed,
     * * otherwise {@link IllegalArgumentException} is thrown.
     *
     * @param {!(TemporalField|TemporalUnit)} fieldOrUnit
     * @returns {boolean}
     */
    isSupported(fieldOrUnit) {
        if (fieldOrUnit instanceof TemporalField) {
            return this.isSupportedField(fieldOrUnit);
        }
        if (fieldOrUnit instanceof TemporalUnit) {
            return this.isSupportedUnit(fieldOrUnit);
        }
        if (fieldOrUnit == null) {
            return false;
        }
        throw new IllegalArgumentException(`fieldOrUnit must be an instance of TemporalField or TemporalUnit, but is ${fieldOrUnit.constructor.name}`);
    }


    //-----------------------------------------------------------------------
    /**
     * Checks if the specified field is supported.
     * 
     * This checks if this year-week can be queried for the specified field.
     * If false, then calling the {@link YearWeek.range} range and
     * {@link YearWeek.get} get methods will throw an exception.
     * 
     * The supported fields are:
     * <ul>
     * <li>{@link IsoFields.WEEK_OF_WEEK_BASED_YEAR}
     * <li>{@link IsoFields.WEEK_BASED_YEAR}
     * </ul>
     * All other {@link ChronoField} instances will return false.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.isSupportedBy}
     * passing this as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param field  the field to check, null returns false
     * @return true if the field is supported on this year-week, false if not
     * @private
     */
    isSupportedField(field) {
        if (field === IsoFields.WEEK_OF_WEEK_BASED_YEAR || field === IsoFields.WEEK_BASED_YEAR) {
            return true;
        } else if (field instanceof ChronoField) {
            return false;
        }
        return field != null && field.isSupportedBy(this);
    }

    /**
     * Checks if the specified unit is supported.
     * 
     * This checks if the specified unit can be added to, or subtracted from, this date-time.
     * If false, then calling the {@link YearWeek.plus} and
     * {@link YearWeek.minus} minus methods will throw an exception.
     * 
     * The supported units are:
     * * {@link ChronoUnit.WEEKS}
     * * {@link IsoFields.WEEK_BASED_YEARS}
     * 
     * All other {@link ChronoUnit} instances will return false.
     * 
     * If the unit is not a {@link ChronoUnit}, then the result of this method
     * is obtained by invoking {@link TemporalUnit.isSupportedBy}
     * passing this as the argument.
     * Whether the unit is supported is determined by the unit.
     *
     * @param unit  the unit to check, null returns false
     * @return true if the unit can be added/subtracted, false if not
	 * @private
     */
    isSupportedUnit(unit) {
        if (unit === ChronoUnit.WEEKS || unit === IsoFields.WEEK_BASED_YEARS) {
            return true;
        } else if (unit instanceof ChronoUnit) {
            return false;
        }
        return unit != null && unit.isSupportedBy(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the range of valid values for the specified field.
     * 
     * The range object expresses the minimum and maximum valid values for a field.
     * This year-week is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * The range for the {@link IsoFields.WEEK_BASED_YEAR} WEEK_BASED_YEAR and
     * {@link IsoFields.WEEK_OF_WEEK_BASED_YEAR} WEEK_OF_WEEK_BASED_YEAR fields is returned.
     * All {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     *
     * @param field  the field to query the range for, not null
     * @return the range of valid values for the field, not null
     * @throws {DateTimeException} if the range for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        if (field === IsoFields.WEEK_BASED_YEAR) {
            return IsoFields.WEEK_BASED_YEAR.range();
        }
        if (field === IsoFields.WEEK_OF_WEEK_BASED_YEAR) {
            return ValueRange.of(1, YearWeek.weekRange(this._year));
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this year-week as an `int`.
     * 
     * This queries this year-week for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * The value for the {@link IsoFields.WEEK_BASED_YEAR} WEEK_BASED_YEAR and
     * {@link IsoFields.WEEK_OF_WEEK_BASED_YEAR} WEEK_OF_WEEK_BASED_YEAR fields is returned.
     * All {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     *
     * @param field  the field to get, not null
     * @return the value for the field
     * @throws {DateTimeException} if a value for the field cannot be obtained or
     *  the value is outside the range of valid values for the field
     * @throws {UnsupportedTemporalTypeException} if the field is not supported or
     *  the range of values exceeds an `int`
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    get(field) {
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this year-week as a {@link long}.
     * 
     * This queries this year-week for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * The value for the {@link IsoFields.WEEK_BASED_YEAR} WEEK_BASED_YEAR and
     * {@link IsoFields.WEEK_OF_WEEK_BASED_YEAR} WEEK_OF_WEEK_BASED_YEAR fields is returned.
     * All {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     *
     * @param field  the field to get, not null
     * @return the value for the field
     * @throws {DateTimeException} if a value for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field === IsoFields.WEEK_BASED_YEAR) {
            return this._year;
        }
        if (field === IsoFields.WEEK_OF_WEEK_BASED_YEAR) {
            return this._week;
        }
        if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the week-based-year field.
     * 
     * This method returns the primitive `int` value for the week-based-year.
     * 
     * Note that the ISO week-based-year does not align with the standard Gregorian/ISO calendar year.
     *
     * @return the week-based-year
     */
    year() {
        return this._year;
    }

    /**
     * Gets the week-of-week-based-year field.
     * 
     * This method returns the primitive `int` value for the week of the week-based-year.
     *
     * @return the week-of-week-based-year
     */
    week() {
        return this._week;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the week-based-year has 53 weeks.
     * 
     * This determines if the year has 53 weeks, returning true.
     * If false, the year has 52 weeks.
     *
     * @return true if the year has 53 weeks, false otherwise
     */
    is53WeekYear() {
        return YearWeek.weekRange(this._year) === 53;
    }

    /**
     * Returns the length of the week-based-year.
     * 
     * This returns the length of the year in days, either 364 or 371.
     *
     * @return 364 if the year has 52 weeks, 371 if it has 53 weeks
     */
    lengthOfYear() {
        return (this.is53WeekYear() ? 371 : 364);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns an adjusted copy of this year-week.
     * 
     * This returns a {@link YearWeek}, based on this one, with the year-week adjusted.
     * The adjustment takes place using the specified adjuster strategy object.
     * Read the documentation of the adjuster to understand what adjustment will be made.
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalAdjusteradjustInto} method on the
     * specified adjuster passing this as the argument.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param adjuster the adjuster to use, not null
     * @return a {@link YearWeek} based on this with the adjustment made, not null
     * @throws {DateTimeException} if the adjustment cannot be made
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _withAdjuster(adjuster) {
        // optimizations
        if (adjuster instanceof YearWeek) {
            return adjuster;
        }
        return super._withAdjuster(adjuster);
    }

    /**
     * Returns a copy of this year-week with the specified field set to a new value.
     * 
     * This returns a {@link YearWeek}, based on this one, with the value
     * for the specified field changed.
     * This can be used to change any supported field, such as the year or week.
     * If it is not possible to set the value, because the field is not supported or for
     * some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the adjustment is implemented here.
     * The supported fields behave as follows:
	 * 
     * * {@link WEEK_OF_WEEK_BASED_YEAR} - Returns a {@link YearWeek} with the specified week-of-year set as per {@link YearWeek.withWeek}.
     * * {@link WEEK_BASED_YEAR} - Returns a {@link YearWeek} with the specified year set as per {@link YearWeek.withYear}.
     * 
     * All {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.adjustInto}
     * passing this as the argument. In this case, the field determines
     * whether and how to adjust the instant.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param field  the field to set in the result, not null
     * @param newValue  the new value of the field in the result
     * @return a {@link YearWeek} based on this with the specified field set, not null
     * @throws {DateTimeException} if the field cannot be set
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _withField(field, newValue) {
        if (field === IsoFields.WEEK_OF_WEEK_BASED_YEAR) {
            return this.withWeek(IsoFields.WEEK_OF_WEEK_BASED_YEAR.range().checkValidIntValue(newValue, IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        } else if (field === IsoFields.WEEK_BASED_YEAR) {
            return this.withYear(IsoFields.WEEK_BASED_YEAR.range().checkValidIntValue(newValue, IsoFields.WEEK_BASED_YEAR));
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return field.adjustInto(this, newValue);
    }

    /**
     * Returns a copy of this {@link YearWeek} with the week-based-year altered.
     * 
     * This returns a year-week with the specified week-based-year.
     * If the week of this instance is 53 and the new year does not have 53 weeks,
     * the week will be adjusted to be 52.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param weekBasedYear  the week-based-year to set in the returned year-week
     * @return a {@link YearWeek} based on this year-week with the requested year, not null
     * @throws {DateTimeException} if the week-based-year value is invalid
     */
    withYear(weekBasedYear) {
        if (this._week === 53 && YearWeek.weekRange(weekBasedYear) < 53) {
            return YearWeek.of(weekBasedYear, 52);
        }
        return YearWeek.of(weekBasedYear, this._week);
    }

    /**
     * Returns a copy of this {@link YearWeek} with the week altered.
     * 
     * This returns a year-week with the specified week-of-week-based-year.
     * If the new week is 53 and the year does not have 53 weeks, week one of the
     * following year is selected.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param week  the week-of-week-based-year to set in the returned year-week
     * @return a {@link YearWeek} based on this year-week with the requested week, not null
     * @throws {DateTimeException} if the week-of-week-based-year value is invalid
     */
    withWeek(week) {
        return YearWeek.of(this._year, week);
    }

    /**
     * Returns a copy of this year-week with the specified amount added.
     * 
     * This returns a {@link YearWeek}, based on this one, with the amount
     * in terms of the unit added. If it is not possible to add the amount, because the
     * unit is not supported or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoUnit} then the addition is implemented here.
     * The supported fields behave as follows:
     * 
	 * * {@link WEEKS} - Returns a {@link YearWeek} with the weeks added as per {@link YearWeek.plusWeeks}.
     * * {@link WEEK_BASED_YEARS} - Returns a {@link YearWeek} with the years added as per {@link YearWeek.plusYears}.
     * 
     * All {@link ChronoUnit} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoUnit}, then the result of this method
     * is obtained by invoking {@link TemporalUnit.addTo}
     * passing this as the argument. In this case, the unit determines
     * whether and how to perform the addition.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param amountToAdd  the amount of the unit to add to the result, may be negative
     * @param unit  the unit of the amount to add, not null
     * @return a {@link YearWeek} based on this year-week with the specified amount added, not null
     * @throws {DateTimeException} if the addition cannot be made
     * @throws {UnsupportedTemporalTypeException} if the unit is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _plusUnit(amountToAdd, unit) {
        if (unit === ChronoUnit.WEEKS) {
            return this.plusWeeks(amountToAdd);
        } else if (unit === IsoFields.WEEK_BASED_YEARS) {
            return this.plusYears(amountToAdd);
        } else if (unit instanceof ChronoUnit) {
            throw new UnsupportedTemporalTypeException(`Unsupported unit: ${unit}`);
        }
        return unit.addTo(this, amountToAdd);
    }

    /**
     * Returns a copy of this year-week with the specified number of years added.
     * 
     * If the week of this instance is 53 and the new year does not have 53 weeks,
     * the week will be adjusted to be 52.
     * 
     * This instance is immutable and unaffected by this method call.
     * 
     * @param yearsToAdd  the years to add, may be negative
     * @return the year-week with the years added, not null
     */
    plusYears(yearsToAdd) {
        if (yearsToAdd === 0) {
            return this;
        }
        const newYear = MathUtil.safeToInt(MathUtil.safeAdd(this._year, yearsToAdd));
        return this.withYear(newYear);
    }

    /**
     * Returns a copy of this year-week with the specified number of weeks added.
     * 
     * This instance is immutable and unaffected by this method call.
     * 
     * @param weeksToAdd  the weeks to add, may be negative
     * @return the year-week with the weeks added, not null
     */
    plusWeeks(weeksToAdd) {
        if (weeksToAdd === 0) {
            return this;
        }
        const mondayOfWeek = this.atDay(DayOfWeek.MONDAY).plusWeeks(weeksToAdd);
        return YearWeek.from(mondayOfWeek);
    }

    /**
     * Returns a copy of this year-week with the specified amount subtracted.
     * 
     * This returns a {@link YearWeek}, based on this one, with the amount
     * in terms of the unit subtracted. If it is not possible to subtract the amount,
     * because the unit is not supported or for some other reason, an exception is thrown.
     * 
     * This method is equivalent to {@link YearWeek.plus} with the amount negated.
     * See that method for a full description of how addition, and thus subtraction, works.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param amountToSubtract  the amount of the unit to subtract from the result, may be negative
     * @param unit  the unit of the amount to subtract, not null
     * @return a {@link YearWeek} based on this year-week with the specified amount subtracted, not null
     * @throws {DateTimeException} if the subtraction cannot be made
     * @throws {UnsupportedTemporalTypeException} if the unit is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _minusUnit(amountToSubtract, unit) {
        requireNonNull(amountToSubtract, 'amountToSubtract');
        requireNonNull(unit, 'unit');
        return this._plusUnit(-amountToSubtract, unit);
    }

    /**
     * Returns a copy of this year-week with the specified number of years subtracted.
     * 
     * If the week of this instance is 53 and the new year does not have 53 weeks,
     * the week will be adjusted to be 52.
     * 
     * This instance is immutable and unaffected by this method call.
     * 
     * @param yearsToSubtract  the years to subtract, may be negative
     * @return the year-week with the years subtracted, not null
     */
    minusYears(yearsToSubtract) {
        if (yearsToSubtract === 0) {
            return this;
        }
        const newYear = MathUtil.safeToInt(MathUtil.safeSubtract(this._year, yearsToSubtract));
        return this.withYear(newYear);
    }

    /**
     * Returns a copy of this year-week with the specified number of weeks subtracted.
     * 
     * This instance is immutable and unaffected by this method call.
     * 
     * @param weeksToSubtract  the weeks to subtract, may be negative
     * @return the year-week with the weeks subtracted, not null
     */
    minusWeeks(weeksToSubtract) {
        if (weeksToSubtract === 0) {
            return this;
        }
        const mondayOfWeek = this.atDay(DayOfWeek.MONDAY).minusWeeks(weeksToSubtract);
        return YearWeek.from(mondayOfWeek);
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this year-week using the specified query.
     * 
     * This queries this year-week using the specified query strategy object.
     * The {@link TemporalQuery} object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery.queryFrom} method on the
     * specified query passing this as the argument.
     *
     * @param query  the query to invoke, not null
     * @return the query result, null may be returned (defined by the query)
     * @throws {DateTimeException} if unable to query (defined by the query)
     * @throws {ArithmeticException} if numeric overflow occurs (defined by the query)
     */
    query(query) {
        requireNonNull(query, 'query');
        requireInstance(query, TemporalQuery, 'query');
        if (query === TemporalQueries.chronology()) {
            return IsoChronology.INSTANCE;
        }
        return super.query(query);
    }

    /**
     * Adjusts the specified temporal object to have this year-week.
     * 
     * This returns a temporal object of the same observable type as the input
     * with the week-based-year and week changed to be the same as this.
     * 
     * The adjustment is equivalent to using {@link Temporal.with}
     * twice, passing {@link IsoFields.WEEK_BASED_YEAR} and
     * {@link IsoFields.WEEK_OF_WEEK_BASED_YEAR} as the fields.
     * If the specified temporal object does not use the ISO calendar system then
     * a {@link DateTimeException} is thrown.
     * 
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal.with}:
     * ```
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisYearWeek.adjustInto(temporal);
     *   temporal = temporal.with(thisYearWeek);
     * ```
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param temporal  the target object to be adjusted, not null
     * @return the adjusted object, not null
     * @throws {DateTimeException} if unable to make the adjustment
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    adjustInto(temporal) {
        return temporal.with(IsoFields.WEEK_BASED_YEAR, this._year).with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, this._week);
    }

    /**
     * Calculates the amount of time until another year-week in terms of the specified unit.
     * 
     * This calculates the amount of time between two {@link YearWeek}
     * objects in terms of a single {@link TemporalUnit}.
     * The start and end points are this and the specified year-week.
     * The result will be negative if the end is before the start.
     * The {@link Temporal} passed to this method is converted to a
     * {@link YearWeek} using {@link YearWeek.from}.
     * For example, the period in years between two year-weeks can be calculated
     * using `startYearWeek.until(endYearWeek, YEARS)`.
     * 
     * The calculation returns a whole number, representing the number of
     * complete units between the two year-weeks.
     * For example, the period in years between 2012-W23 and 2032-W22
     * will only be 9 years as it is one week short of 10 years.
     * 
     * There are two equivalent ways of using this method.
     * The first is to invoke this method.
     * The second is to use {@link TemporalUnit.between}:
     * ```
     *   // these two lines are equivalent
     *   amount = start.until(end, WEEKS);
     *   amount = WEEKS.between(start, end);
     * ```
     * The choice should be made based on which makes the code more readable.
     * 
     * The calculation is implemented in this method for units {@link WEEKS}
     * and {@link WEEK_BASED_YEARS}.
     * Other {@link ChronoUnit} values will throw an exception.
     * 
     * If the unit is not a {@link ChronoUnit}, then the result of this method
     * is obtained by invoking {@link TemporalUnit.between}
     * passing this as the first argument and the converted input temporal
     * as the second argument.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param endExclusive  the end date, exclusive, which is converted to a {@link YearWeek}, not null
     * @param unit  the unit to measure the amount in, not null
     * @return the amount of time between this year-week and the end year-week
     * @throws {DateTimeException} if the amount cannot be calculated, or the end
     *  temporal cannot be converted to a {@link YearWeek}
     * @throws {UnsupportedTemporalTypeException} if the unit is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     * @private
     */
    until(endExclusive, unit) {
        const end = YearWeek.from(endExclusive);
        if (unit === ChronoUnit.WEEKS) {
            return this.daysUntil(end);
        } else if (unit === IsoFields.WEEK_BASED_YEARS) {
            return this.yearsUntil(end);
        } else if (unit instanceof ChronoUnit) {
            throw new UnsupportedTemporalTypeException(`Unsupported unit: ${unit}`);
        }
        return unit.between(this, end);
    }

    /**
     * @private
     */
    daysUntil(end) {
        const startDate = this.atDay(DayOfWeek.MONDAY);
        const endDate = end.atDay(DayOfWeek.MONDAY);
        const days = endDate.toEpochDay() - startDate.toEpochDay();
        return MathUtil.intDiv(days, 7);
    }

    /**
     * @private
     */
    yearsUntil(end) {
        const yearsDiff = end._year - this._year;
        if (yearsDiff > 0 && end._week < this._week) {
            return yearsDiff - 1;
        }
        if (yearsDiff < 0 && end._week > this._week) {
            return yearsDiff + 1;
        }
        return yearsDiff;
    }

    /**
     * Formats this year-week using the specified formatter.
     * 
     * This year-week will be passed to the formatter to produce a string.
     *
     * @param formatter  the formatter to use, not null
     * @return the formatted year-week string, not null
     * @throws {DateTimeException} if an error occurs during printing
     */
    format(formatter) {
        requireNonNull(formatter, 'formatter');
        return formatter.format(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Combines this year-week with a day-of-week to create a {@link LocalDate}.
     * 
     * This returns a {@link LocalDate} formed from this year-week and the specified day-of-Week.
     * 
     * This method can be used as part of a chain to produce a date:
     * ```
     *  LocalDate date = yearWeek.atDay(MONDAY);
     * ```
     *
     * @param dayOfWeek  the day-of-week to use, not null
     * @return the date formed from this year-week and the specified day, not null
     */
    atDay(dayOfWeek) {
        requireNonNull(dayOfWeek, 'dayOfWeek');
        const correction = LocalDate.of(this._year, 1, 4).dayOfWeek().value() + 3;
        const dayOfYear = this._week * 7 + dayOfWeek.value() - correction;
        const maxDaysOfYear = Year.isLeap(this._year) ? 366 : 365;
        if (dayOfYear > maxDaysOfYear) {
            return LocalDate.ofYearDay(this._year + 1, dayOfYear - maxDaysOfYear);
        }
        if (dayOfYear > 0) {
            return LocalDate.ofYearDay(this._year, dayOfYear);
        } else {
            const daysOfPreviousYear = Year.isLeap(this._year - 1) ? 366 : 365;
            return LocalDate.ofYearDay(this._year - 1, daysOfPreviousYear + dayOfYear);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this year-week to another
     * 
     * The comparison is based first on the value of the year, then on the value of the week.
     * It is "consistent with equals", as defined by {@link Comparable}.
     *
     * @param other  the other year-week to compare to, not null
     * @return the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, YearWeek, 'other');
        let cmp = (this._year - other._year);
        if (cmp === 0) {
            cmp = (this._week - other._week);
        }
        return cmp;
    }
 
    /**
     * Is this year-week after the specified year-week.
     *
     * @param other  the other year-week to compare to, not null
     * @return true if this is after the specified year-week
     */
    isAfter(other) {
        return this.compareTo(other) > 0;
    }

    /**
     * Is this year-week before the specified year-week.
     *
     * @param other  the other year-week to compare to, not null
     * @return true if this point is before the specified year-week
     */
    isBefore(other) {
        return this.compareTo(other) < 0;
    }
 
    //-----------------------------------------------------------------------
    /**
     * Checks if this year-week is equal to another year-week.
     *
     * @param obj  the object to check, null returns false
     * @return true if this is equal to the other year-week
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof YearWeek) {
            return this._year === obj._year && this._week === obj._week;
        }
        return false;
    }
 
    /**
     * A hash code for this year-week.
     *
     * @return a suitable hash code
     */
    hashCode() {
        return this._year ^ (this._week << 25);
    }
 
    //-----------------------------------------------------------------------
    /**
     * Outputs this year-week as a {@link String}, such as `2015-W13`.
     * 
     * The output will be in the format `YYYY-'W'ww`:
     *
     * @return a string representation of this year-week, not null
     */
    toString() {
        let yearString;
        const yearValue = this._year;
        const absYear = Math.abs(yearValue);
        if (absYear < 1000) {
            if (yearValue < 0) {
                yearString = `-${(`${yearValue - 10000}`).slice(-4)}`;
            } else {
                yearString = (`${yearValue + 10000}`).slice(-4);
            }
        } else {
            if (yearValue > 9999) {
                yearString = `+${yearValue}`;
            } else {
                yearString = `${yearValue}`;
            }
        }
        return yearString.concat(this._week < 10 ? '-W0' : '-W').concat(this._week);
    }
}

export function _init() {
    YearWeek.PARSER = new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .appendValue(IsoFields.WEEK_BASED_YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
        .appendLiteral('-W')
        .appendValue(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 2)
        .toFormatter();

    YearWeek.FROM = createTemporalQuery('YearWeek.FROM', (temporal) => {
        return YearWeek.from(temporal);
    });
}

// copied from packages/core/src/temporal/TemporalQuery.js
function createTemporalQuery(name, queryFromFunction) {
    class ExtendedTemporalQuery extends TemporalQuery {
    }

    ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
    return new ExtendedTemporalQuery(name);
}
