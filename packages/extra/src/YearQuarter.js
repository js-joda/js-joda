/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoField, ChronoUnit, Clock, DateTimeException, DateTimeFormatter, DateTimeFormatterBuilder, IllegalArgumentException, IsoChronology, IsoFields, LocalDate, SignStyle, Temporal, TemporalField, TemporalQueries, TemporalQuery, TemporalUnit, UnsupportedTemporalTypeException, ValueRange, Year, ZoneId } from '@js-joda/core';
import { Quarter } from './Quarter';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireInstance, requireNonNull } from './assert';
import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * A year-quarter in the ISO-8601 calendar system, such as `2007-Q2`.
 *
 * `YearQuarter` is an immutable date-time object that represents the combination
 * of a year and quarter. Any field that can be derived from a year and quarter can be obtained.
 * A quarter is defined by {@link Quarter} and {@link Month.firstMonthOfQuarter} - Q1, Q2, Q3 and Q4.
 * Q1 is January to March, Q2 is April to June, Q3 is July to September and Q4 is October to December.
 *
 * This class does not store or represent a day, time or time-zone.
 * For example, the value '2nd quarter 2007' can be stored in a `YearQuarter`.
 *
 * The ISO-8601 calendar system is the modern civil calendar system used today
 * in most of the world. It is equivalent to the proleptic Gregorian calendar
 * system, in which today's rules for leap years are applied for all time.
 * For most applications written today, the ISO-8601 rules are entirely suitable.
 * However, any application that makes use of historical dates, and requires them
 * to be accurate will find the ISO-8601 approach unsuitable.
 * Note that the ISO-8601 standard does not define or refer to quarters.
 *
 */
export class YearQuarter extends Temporal {
    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link YearQuarter.now}
     * - if called with 0 argument {@link YearQuarter._now0} is executed,
     * - if called with 1 argument and first argument is an instance of ZoneId, then {@link YearQuarter._nowZoneId} is executed,
     * - otherwise {@link YearQuarter._nowClock} is executed
     *
     * @param {ZoneId|Clock} [zoneIdOrClock=Clock.systemDefaultZone()]
     * @return {YearQuarter}
     */
    static now(zoneIdOrClock) {
        if (arguments.length === 0) {
            return YearQuarter._now0();
        } else if (arguments.length === 1 && zoneIdOrClock instanceof ZoneId) {
            return YearQuarter._nowZoneId(zoneIdOrClock);
        } else {
            return YearQuarter._nowClock(zoneIdOrClock);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the current year-quarter from the system clock in the default time-zone.
     *
     * This will query the {@link Clock.systemDefaultZone} system clock in the default
     * time-zone to obtain the current year-quarter.
     * The zone and offset will be set based on the time-zone in the clock.
     *
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {YearQuarter} the current year-quarter using the system clock and default time-zone, not null
     * @protected
     */
    static _now0() {
        return YearQuarter.now(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current year-quarter from the system clock in the specified time-zone.
     *
     * This will query the {@link Clock.system} to obtain the current year-quarter.
     * Specifying the time-zone avoids dependence on the default time-zone.
     *
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone - the zone ID to use, not null
     * @return {YearQuarter} the current year-quarter using the system clock, not null
     * @protected
     */
    static _nowZoneId(zone) {
        return YearQuarter.now(Clock.system(zone));
    }

    /**
     * Obtains the current year-quarter from the specified clock.
     *
     * This will query the specified clock to obtain the current year-quarter.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock} dependency injection.
     *
     * @param {Clock} clock - the clock to use, not null
     * @return {YearQuarter} the current year-quarter, not null
     */
    static _nowClock(clock) {
        const now = LocalDate.now(clock);  // called once
        return YearQuarter.of(now.year(), Quarter.from(now.month()));
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link YearQuarter.of}
     * - if called with {Year} and {Quarter} {@link YearQuarter._ofYearQuarter} is executed,
     * - if called with {Year} and {number} {@link YearQuarter._ofYearInt} is executed,
     * - if called with {number} and {Quarter} {@link YearQuarter._ofIntQuarter} is executed,
     * - if called with {number} and {number} {@link YearQuarter._ofIntInt} is executed,
     * otherwise throws IllegalArgumentException.
     *
     * @param {Year|number} year
     * @param {Quarter|number} quarter
     * @return {YearQuarter}
     */
    static of(year, quarter) {
        if (year instanceof Year && quarter instanceof Quarter) {
            return YearQuarter._ofYearQuarter(year, quarter);
        }
        if (year instanceof Year && typeof quarter === 'number') {
            return YearQuarter._ofYearInt(year, quarter);
        }
        if (typeof year === 'number' && quarter instanceof Quarter) {
            return YearQuarter._ofIntQuarter(year, quarter);
        }
        if (typeof year === 'number' && typeof quarter === 'number') {
            return YearQuarter._ofIntInt(year, quarter);
        }
        // FIXME
        const yearMessage = `year must be an instance of Year or number but is ${year.constructor.name}`;
        const quarterMessage = `quarter must be an instance of Quarter or number but is ${quarter.constructor.name}`;
        throw new IllegalArgumentException(`${yearMessage} and ${quarterMessage}`);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `YearQuarter` from a year and quarter.
     *
     * @param {Year} year - the year to represent, not null
     * @param {Quarter} quarter - the quarter-of-year to represent, not null
     * @return {YearQuarter} the year-quarter, not null
     * @protected
     */
    // FIXME ambiguous name?
    static _ofYearQuarter(year, quarter) {
        return YearQuarter.of(year.value(), quarter);
    }

    /**
     * Obtains an instance of `YearQuarter` from a year and quarter.
     *
     * @param {Year} year - the year to represent, not null
     * @param {number} quarter - the quarter-of-year to represent, from 1 to 4
     * @return {YearQuarter} the year-quarter, not null
     * @throws {DateTimeException} if the quarter value is invalid
     * @protected
     */
    static _ofYearInt(year, quarter) {
        return YearQuarter.of(year.value(), Quarter.of(quarter));
    }

    /**
     * Obtains an instance of `YearQuarter` from a year and quarter.
     *
     * @param {number} year - the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {Quarter} quarter - the quarter-of-year to represent, not null
     * @return {YearQuarter} the year-quarter, not null
     * @throws {DateTimeException} if the year value is invalid
     * @protected
     */
    static _ofIntQuarter(year, quarter) {
        ChronoField.YEAR.checkValidValue(year);
        requireNonNull(quarter, 'quarter');
        return new YearQuarter(year, quarter);
    }

    /**
     * Obtains an instance of `YearQuarter` from a year and quarter.
     *
     * @param {number} year - the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {number} quarter - the quarter-of-year to represent, from 1 to 4
     * @return {YearQuarter} the year-quarter, not null
     * @throws {DateTimeException} if either field value is invalid
     * @protected
     */
    static _ofIntInt(year, quarter) {
        ChronoField.YEAR.checkValidValue(year);
        return new YearQuarter(year, Quarter.of(quarter));
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `YearQuarter` from a temporal object.
     *
     * This obtains a year-quarter based on the specified temporal.
     * A `TemporalAccessor` represents an arbitrary set of date and time information,
     * which this factory converts to an instance of `YearQuarter`.
     *
     * The conversion extracts the {@link ChronoField.YEAR} and
     * {@link IsoFields.QUARTER_OF_YEAR} fields.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a `LocalDate`.
     *
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, `YearQuarter.FROM`.
     *
     * @param {TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {YearQuarter} the year-quarter, not null
     * @throws {DateTimeException} if unable to convert to a `YearQuarter`
     */
    static from(temporal) {
        if (temporal instanceof YearQuarter) {
            return temporal;
        }
        requireNonNull(temporal, 'temporal');
        try {
            /* TODO: only IsoChronology for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }
            */
            // need to use getLong() as JDK Parsed class get() doesn't work properly
            const year = MathUtil.safeToInt(temporal.getLong(ChronoField.YEAR));
            const qoy = MathUtil.safeToInt(temporal.getLong(IsoFields.QUARTER_OF_YEAR));
            return YearQuarter.of(year, qoy);
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain YearQuarter from TemporalAccessor: ${temporal} of type ${temporal.constructor.name}`, ex);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `YearQuarter` from a text string using a specific formatter.
     *
     * The text is parsed using the formatter, returning a year-quarter.
     *
     * @param {string} text - the text to parse, not null
     * @param {DateTimeFormatter} [formatter=YearQuarter.PARSER] - the formatter to use, default is {@link YearQuarter.PARSER}
     * @return {YearQuarter} the parsed year-quarter, not null
     * @throws {DateTimeParseException} if the text cannot be parsed
     */
    static parse(text, formatter = YearQuarter.PARSER) {
        requireNonNull(formatter, 'formatter');
        requireInstance(formatter, DateTimeFormatter, 'formatter');
        return formatter.parse(text, YearQuarter.FROM);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {number} year - the year to represent, validated from MIN_YEAR to MAX_YEAR
     * @param {Quarter} quarter - the quarter-of-year to represent, validated not null
     * @private
     */
    constructor(year, quarter) {
        super();
        this._year = MathUtil.safeToInt(year);
        this._quarter = requireInstance(quarter, Quarter, 'Quarter');
    }

    /**
     * Returns a copy of this year-quarter with the new year and quarter, checking
     * to see if a new object is in fact required.
     *
     * @param {number} newYear - the year to represent, validated from MIN_YEAR to MAX_YEAR
     * @param {Quarter} newQuarter - the quarter-of-year to represent, validated not null
     * @return {YearQuarter} the year-quarter, not null
     * @private
     */
    _with(newYear, newQuarter) {
        if (this._year === newYear && this._quarter === newQuarter) {
            return this;
        }
        return new YearQuarter(newYear, newQuarter);
    }

    /**
     * function overloading for {@link YearWeek.isSupported}
     * - if called with an instance of {@link TemporalField}, then {@link YearWeek.isSupportedField} is executed,
     * - if called with an instance of {@link TemporalUnit}, then {@link YearWeek.isSupportedUnit} is executed,
     * - otherwise {@link IllegalArgumentException} is thrown.
     *
     * @param {TemporalField|TemporalUnit} fieldOrUnit
     * @return {boolean}
     */
    isSupported(fieldOrUnit) {
        if (fieldOrUnit instanceof TemporalField) {
            return this._isSupportedField(fieldOrUnit);
        }
        if (fieldOrUnit instanceof TemporalUnit) {
            return this._isSupportedUnit(fieldOrUnit);
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
     * This checks if this year-quarter can be queried for the specified field.
     * If false, then calling the {@link YearQuarter.range},
     * {@link YearQuarter.get} and {@link YearQuarter.with}
     * methods will throw an exception.
     *
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     *
     * - `QUARTER_OF_YEAR`
     * - `YEAR_OF_ERA`
     * - `YEAR`
     * - `ERA`
     *
     * All other `ChronoField` instances will return false.
     *
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField} field - the field to check, null returns false
     * @return {boolean} true if the field is supported on this year-quarter, false if not
     * @protected
     */
    _isSupportedField(field) {
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return true;
        } else if (field instanceof ChronoField) {
            return field === ChronoField.YEAR || field === ChronoField.YEAR_OF_ERA || field === ChronoField.ERA;
        }
        return field != null && field.isSupportedBy(this);
    }

    /**
     * Checks if the specified unit is supported.
     *
     * This checks if the specified unit can be added to, or subtracted from, this year-quarter.
     * If false, then calling the {@link YearQuarter.plus} and
     * {@link YearQuarter.minus} methods will throw an exception.
     *
     * If the unit is a {@link ChronoUnit} then the query is implemented here.
     * The supported units are:
     *
     * - `QUARTER_YEARS`
     * - `YEARS`
     * - `DECADES`
     * - `CENTURIES`
     * - `MILLENNIA`
     * - `ERAS`
     *
     * All other `ChronoUnit` instances will return false.
     *
     * If the unit is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
     * passing `this` as the argument.
     * Whether the unit is supported is determined by the unit.
     *
     * @param {TemporalUnit} unit - the unit to check, null returns false
     * @return {boolean} true if the unit can be added/subtracted, false if not
     * @protected
     */
    _isSupportedUnit(unit) {
        if (unit === IsoFields.QUARTER_YEARS) {
            return true;
        } else if (unit instanceof ChronoUnit) {
            return unit === ChronoUnit.YEARS || unit === ChronoUnit.DECADES || unit === ChronoUnit.CENTURIES || unit === ChronoUnit.MILLENNIA || unit === ChronoUnit.ERAS;
        }
        return unit != null && unit.isSupportedBy(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the range of valid values for the specified field.
     *
     * The range object expresses the minimum and maximum valid values for a field.
     * This year-quarter is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     *
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link YearQuarter.isSupported} supported fields will return
     * appropriate range instances.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     *
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field - the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws {DateTimeException} if the range for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return IsoFields.QUARTER_OF_YEAR.range();
        }
        if (field === ChronoField.YEAR_OF_ERA) {
            return (this.year() <= 0 ? ValueRange.of(1, Year.MAX_VALUE + 1) : ValueRange.of(1, Year.MAX_VALUE));
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this year-quarter as an `int`.
     *
     * This queries this year-quarter for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     *
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link YearQuarter.isSupported} supported fields will return valid
     * values based on this year-quarter,.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     *
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field - the field to get, not null
     * @return {number} the value for the field
     * @throws {DateTimeException} if a value for the field cannot be obtained or
     *  the value is outside the range of valid values for the field
     * @throws {UnsupportedTemporalTypeException} if the field is not supported or
     *  the range of values exceeds an `int`
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    get(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this year-quarter as a `long`.
     *
     * This queries this year-quarter for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     *
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link YearQuarter.isSupported} supported fields will return valid
     * values based on this year-quarter.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     *
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field - the field to get, not null
     * @return {number} the value for the field
     * @throws {DateTimeException} if a value for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return this._quarter.value();
        } else if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.YEAR_OF_ERA:
                    return (this._year < 1 ? 1 - this._year : this._year);
                case ChronoField.YEAR:
                    return this._year;
                case ChronoField.ERA:
                    return (this._year < 1 ? 0 : 1);
                default:
                    throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
            }
        }
        return super.get(field);
    }

    /**
     * @private
     */
    _prolepticQuarter() {
        return this._year * 4 + (this._quarter.value() - 1);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the year field.
     *
     * This method returns the primitive `int` value for the year.
     *
     * The year returned by this method is proleptic as per `get(YEAR)`.
     *
     * @return {number} the year, from MIN_YEAR to MAX_YEAR
     */
    year() {
        return this._year;
    }

    /**
     * Gets the quarter-of-year field from 1 to 4.
     *
     * This method returns the quarter as an `int` from 1 to 4.
     * Application code is frequently clearer if the enum {@link Quarter}
     * is used by calling {@link YearQuarter.getQuarter}.
     *
     * @return {number} the quarter-of-year, from 1 to 4
     * @see {@link YearQuarter.quarter}
     */
    quarterValue() {
        return this._quarter.value();
    }

    /**
     * Gets the quarter-of-year field using the `Quarter` enum.
     *
     * This method returns the enum {@link Quarter} for the quarter.
     * This avoids confusion as to what `int` values mean.
     * If you need access to the primitive `int` value then the enum
     * provides the {@link Quarter.value}.
     *
     * @return {Quarter} the quarter-of-year, not null
     * @see {@link YearQuarter.quarterValue}
     */
    quarter() {
        return this._quarter;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the year is a leap year, according to the ISO proleptic
     * calendar system rules.
     *
     * This method applies the current rules for leap years across the whole time-line.
     * In general, a year is a leap year if it is divisible by four without
     * remainder. However, years divisible by 100, are not leap years, with
     * the exception of years divisible by 400 which are.
     *
     * For example, 1904 is a leap year it is divisible by 4.
     * 1900 was not a leap year as it is divisible by 100, however 2000 was a
     * leap year as it is divisible by 400.
     *
     * The calculation is proleptic - applying the same rules into the far future and far past.
     * This is historically inaccurate, but is correct for the ISO-8601 standard.
     *
     * @return {boolean} true if the year is leap, false otherwise
     */
    isLeapYear() {
        return IsoChronology.isLeapYear(this._year);
    }

    /**
     * Checks if the day-of-quarter is valid for this year-quarter.
     *
     * This method checks whether this year and quarter and the input day form
     * a valid date.
     *
     * @param {number} dayOfQuarter - the day-of-quarter to validate, from 1 to 92, invalid value returns false
     * @return {boolean} true if the day is valid for this year-quarter
     */
    isValidDay(dayOfQuarter) {
        return dayOfQuarter >= 1 && dayOfQuarter <= this.lengthOfQuarter();
    }

    /**
     * Returns the length of the quarter, taking account of the year.
     *
     * This returns the length of the quarter in days.
     *
     * @return {number} the length of the quarter in days, from 90 to 92
     */
    lengthOfQuarter() {
        return this._quarter.length(this.isLeapYear());
    }

    /**
     * Returns the length of the year.
     *
     * This returns the length of the year in days, either 365 or 366.
     *
     * @return {number} 366 if the year is leap, 365 otherwise
     */
    lengthOfYear() {
        return (this.isLeapYear() ? 366 : 365);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns an adjusted copy of this year-quarter.
     *
     * This returns a {@code YearQuarter} based on this one, with the year-quarter adjusted.
     * The adjustment takes place using the specified adjuster strategy object.
     * Read the documentation of the adjuster to understand what adjustment will be made.
     *
     * A simple adjuster might simply set the one of the fields, such as the year field.
     * A more complex adjuster might set the year-quarter to the next quarter that
     * Halley's comet will pass the Earth.
     *
     * The result of this method is obtained by invoking the
     * {@link TemporalAdjuster#adjustInto(Temporal)} method on the
     * specified adjuster passing {@code this} as the argument.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAdjuster} adjuster - the adjuster to use, not null
     * @return {YearQuarter} based on {@code this} with the adjustment made, not null
     * @throws {DateTimeException} if the adjustment cannot be made
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _withAdjuster(adjuster) {
        // optimizations
        if (adjuster instanceof YearQuarter) {
            return adjuster;
        }
        return super._withAdjuster(adjuster);
    }

    /**
     * Returns a copy of this year-quarter with the specified field set to a new value.
     *
     * This returns a `YearQuarter` based on this one, with the value
     * for the specified field changed.
     * This can be used to change any supported field, such as the year or quarter.
     * If it is not possible to set the value, because the field is not supported or for
     * some other reason, an exception is thrown.
     *
     * If the field is a {@link ChronoField} then the adjustment is implemented here.
     * The supported fields behave as follows:
     * - `QUARTER_OF_YEAR` -
     *  Returns a `YearQuarter` with the specified quarter-of-year.
     *  The year will be unchanged.
     * - `YEAR_OF_ERA` -
     *  Returns a `YearQuarter` with the specified year-of-era
     *  The quarter and era will be unchanged.
     * - `YEAR` -
     *  Returns a `YearQuarter` with the specified year.
     *  The quarter will be unchanged.
     * - `ERA` -
     *  Returns a `YearQuarter` with the specified era.
     *  The quarter and year-of-era will be unchanged.
     *
     * In all cases, if the new value is outside the valid range of values for the field
     * then a `DateTimeException` will be thrown.
     *
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     *
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
     * passing `this` as the argument. In this case, the field determines
     * whether and how to adjust the instant.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalField} field - the field to set in the result, not null
     * @param {number} newValue - the new value of the field in the result
     * @return {YearQuarter} a `YearQuarter` based on `this` with the specified field set, not null
     * @throws {DateTimeException} if the field cannot be set
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _withField(field, newValue) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return this.withQuarter(IsoFields.QUARTER_OF_YEAR.range().checkValidIntValue(newValue, IsoFields.QUARTER_OF_YEAR));
        } else if (field instanceof ChronoField) {
            field.checkValidValue(newValue);
            switch (field) {
                case ChronoField.YEAR_OF_ERA:
                    return this.withYear(this._year < 1 ? 1 - newValue : newValue);
                case ChronoField.YEAR:
                    return this.withYear(newValue);
                case ChronoField.ERA:
                    return this.getLong(ChronoField.ERA) === newValue ? this : this.withYear(1 - this._year);
                default:
                    throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
            }
        }
        return field.adjustInto(this, newValue);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this `YearQuarter` with the year altered.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} year - the year to set in the returned year-quarter, from MIN_YEAR to MAX_YEAR
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the requested year, not null
     * @throws {DateTimeException} if the year value is invalid
     */
    withYear(year) {
        ChronoField.YEAR.checkValidValue(year);
        return this._with(year, this._quarter);
    }

    /**
     * Returns a copy of this `YearQuarter` with the quarter-of-year altered.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} quarter - the quarter-of-year to set in the returned year-quarter, from 1 to 4
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the requested quarter, not null
     * @throws {DateTimeException} if the quarter-of-year value is invalid
     */
    withQuarter(quarter) {
        IsoFields.QUARTER_OF_YEAR.range().checkValidValue(quarter, IsoFields.QUARTER_OF_YEAR);
        return this._with(this._year, Quarter.of(quarter));
    }

    /**
     * Returns a copy of this year-quarter with the specified amount added.
     *
     * This returns a `YearQuarter` based on this one, with the amount
     * in terms of the unit added. If it is not possible to add the amount, because the
     * unit is not supported or for some other reason, an exception is thrown.
     *
     * If the field is a {@link ChronoUnit} then the addition is implemented here.
     * The supported fields behave as follows:
     *
     * - `QUARTER_YEARS` -
     *  Returns a `YearQuarter` with the specified number of quarters added.
     *  This is equivalent to {@link YearQuarter.plusQuarters}.
     * - `YEARS` -
     *  Returns a `YearQuarter` with the specified number of years added.
     *  This is equivalent to {@link YearQuarter.plusYears}.
     * - `DECADES` -
     *  Returns a `YearQuarter` with the specified number of decades added.
     *  This is equivalent to calling {@link YearQuarter.plusYears} with the amount
     *  multiplied by 10.
     * - `CENTURIES` -
     *  Returns a `YearQuarter` with the specified number of centuries added.
     *  This is equivalent to calling {@link YearQuarter.plusYears} with the amount
     *  multiplied by 100.
     * - `MILLENNIA` -
     *  Returns a `YearQuarter` with the specified number of millennia added.
     *  This is equivalent to calling {@link YearQuarter.plusYears} with the amount
     *  multiplied by 1,000.
     * - `ERAS` -
     *  Returns a `YearQuarter` with the specified number of eras added.
     *  Only two eras are supported so the amount must be one, zero or minus one.
     *  If the amount is non-zero then the year is changed such that the year-of-era
     *  is unchanged.
     *
     * All other `ChronoUnit` instances will throw an `UnsupportedTemporalTypeException`.
     *
     * If the field is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
     * passing `this` as the argument. In this case, the unit determines
     * whether and how to perform the addition.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} amountToAdd - the amount of the unit to add to the result, may be negative
     * @param {TemporalUnit} unit - the unit of the amount to add, not null
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the specified amount added, not null
     * @throws {DateTimeException} if the addition cannot be made
     * @throws {UnsupportedTemporalTypeException} if the unit is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    _plusUnit(amountToAdd, unit) {
        if (unit === IsoFields.QUARTER_YEARS) {
            return this.plusQuarters(amountToAdd);
        } else if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.YEARS:
                    return this.plusYears(amountToAdd);
                case ChronoUnit.DECADES:
                    return this.plusYears(MathUtil.safeMultiply(amountToAdd, 10));
                case ChronoUnit.CENTURIES:
                    return this.plusYears(MathUtil.safeMultiply(amountToAdd, 100));
                case ChronoUnit.MILLENNIA:
                    return this.plusYears(MathUtil.safeMultiply(amountToAdd, 1000));
                case ChronoUnit.ERAS:
                    return this.with(ChronoField.ERA, MathUtil.safeAdd(this.getLong(ChronoField.ERA), amountToAdd));
                default:
                    throw new UnsupportedTemporalTypeException(`Unsupported unit: ${unit}`);
            }
        }
        return unit.addTo(this, amountToAdd);
    }

    /**
     * Returns a copy of this year-quarter with the specified period in years added.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} yearsToAdd - the years to add, may be negative
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the years added, not null
     * @throws {DateTimeException} if the result exceeds the supported range
     */
    plusYears(yearsToAdd) {
        if (yearsToAdd === 0) {
            return this;
        }
        const newYear = ChronoField.YEAR.checkValidIntValue(this._year + yearsToAdd);  // safe overflow
        return this._with(newYear, this._quarter);
    }

    /**
     * Returns a copy of this year-quarter with the specified period in quarters added.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} quartersToAdd - the quarters to add, may be negative
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the quarters added, not null
     * @throws {DateTimeException} if the result exceeds the supported range
     */
    plusQuarters(quartersToAdd) {
        if (quartersToAdd === 0) {
            return this;
        }
        const quarterCount = this._year * 4 + (this._quarter.value() - 1);
        const calcQuarters = quarterCount + quartersToAdd;  // safe overflow
        const newYear = ChronoField.YEAR.checkValidIntValue(MathUtil.intDiv(calcQuarters, 4));
        const newQuarter = MathUtil.floorMod(calcQuarters, 4) + 1;
        return this._with(newYear, Quarter.of(newQuarter));
    }

    /**
     * Returns a copy of this year-quarter with the specified period in years subtracted.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} yearsToSubtract - the years to subtract, may be negative
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the years subtracted, not null
     * @throws {DateTimeException} if the result exceeds the supported range
     */
    minusYears(yearsToSubtract) {
        return (yearsToSubtract === MathUtil.MIN_SAFE_INTEGER ? this.plusYears(MathUtil.MIN_SAFE_INTEGER).plusYears(1) : this.plusYears(-yearsToSubtract));
    }

    /**
     * Returns a copy of this year-quarter with the specified period in quarters subtracted.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} quartersToSubtract - the quarters to subtract, may be negative
     * @return {YearQuarter} a `YearQuarter` based on this year-quarter with the quarters subtracted, not null
     * @throws {DateTimeException} if the result exceeds the supported range
     */
    minusQuarters(quartersToSubtract) {
        return (quartersToSubtract === MathUtil.MIN_SAFE_INTEGER ? this.plusQuarters(MathUtil.MIN_SAFE_INTEGER).plusQuarters(1) : this.plusQuarters(-quartersToSubtract));

    }

    //-----------------------------------------------------------------------
    /**
     * Queries this year-quarter using the specified query.
     *
     * This queries this year-quarter using the specified query strategy object.
     * The `TemporalQuery` object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     *
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery.queryFrom} method on the
     * specified query passing `this` as the argument.
     *
     * @param {TemporalQuery} query - the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws {DateTimeException} if unable to query (defined by the query)
     * @throws {ArithmeticException} if numeric overflow occurs (defined by the query)
     */
    query(query) {
        if (query === TemporalQueries.chronology()) {
            return IsoChronology.INSTANCE;
        } else if (query === TemporalQueries.precision()) {
            return IsoFields.QUARTER_YEARS;
        }
        return super.query(query);
    }

    /**
     * Adjusts the specified temporal object to have this year-quarter.
     *
     * This returns a temporal object of the same observable type as the input
     * with the year and quarter changed to be the same as this.
     *
     * The adjustment is equivalent to using {@link Temporal.plus}
     * passing the number of quarters to adjust by.
     * If the specified temporal object does not use the ISO calendar system then
     * a `DateTimeException` is thrown.
     *
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal.with}:
     * ```
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisYearQuarter.adjustInto(temporal);
     *   temporal = temporal.with(thisYearQuarter);
     * ```
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} temporal - the target object to be adjusted, not null
     * @return {Temporal} the adjusted object, not null
     * @throws {DateTimeException} if unable to make the adjustment
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    adjustInto(temporal) {
        /* TODO: only IsoChronology for now
        if (Chronology.from(temporal).equals(IsoChronology.INSTANCE) == false) {
            throw new DateTimeException('Adjustment only supported on ISO date-time');
        }*/
        const newProlepticQuarter = this._prolepticQuarter();
        const oldProlepticQuarter = temporal.get(ChronoField.YEAR) * 4 + (temporal.get(IsoFields.QUARTER_OF_YEAR) - 1);
        return temporal.plus(newProlepticQuarter - oldProlepticQuarter, IsoFields.QUARTER_YEARS);
    }

    /**
     * Calculates the amount of time until another year-quarter in terms of the specified unit.
     *
     * This calculates the amount of time between two `YearQuarter`
     * objects in terms of a single `TemporalUnit`.
     * The start and end points are `this` and the specified year-quarter.
     * The result will be negative if the end is before the start.
     * The `Temporal` passed to this method is converted to a
     * `YearQuarter` using {@link YearQuarter.from}.
     * For example, the period in years between two year-quarters can be calculated
     * using `startYearQuarter.until(endYearQuarter, YEARS)`.
     *
     * The calculation returns a whole number, representing the number of
     * complete units between the two year-quarters.
     * For example, the period in decades between 2012-Q3 and 2032-Q2
     * will only be one decade as it is one quarter short of two decades.
     *
     * There are two equivalent ways of using this method.
     * The first is to invoke this method.
     * The second is to use {@link TemporalUnit.between}:
     * <pre>
     *   // these two lines are equivalent
     *   amount = start.until(end, QUARTER_YEARS);
     *   amount = QUARTER_YEARS.between(start, end);
     * </pre>
     * The choice should be made based on which makes the code more readable.
     *
     * The calculation is implemented in this method for {@link ChronoUnit}.
     * The units `QUARTER_YEARS`, `YEARS`, `DECADES`,
     * `CENTURIES`, `MILLENNIA` and `ERAS` are supported.
     * Other `ChronoUnit` values will throw an exception.
     *
     * If the unit is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
     * passing `this` as the first argument and the converted input temporal
     * as the second argument.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} endExclusive - the end date, exclusive, which is converted to a `YearQuarter`, not null
     * @param {TemporalUnit} unit - the unit to measure the amount in, not null
     * @return {number} the amount of time between this year-quarter and the end year-quarter
     * @throws {DateTimeException} if the amount cannot be calculated, or the end
     *  temporal cannot be converted to a `YearQuarter`
     * @throws {UnsupportedTemporalTypeException} if the unit is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    until(endExclusive, unit) {
        requireNonNull(endExclusive, 'endExclusive');
        requireNonNull(unit, 'unit');
        requireInstance(endExclusive, Temporal, 'endExclusive');
        requireInstance(unit, TemporalUnit, 'unit');

        const end = YearQuarter.from(endExclusive);
        const quartersUntil = end._prolepticQuarter() - this._prolepticQuarter();  // no overflow
        if (unit === IsoFields.QUARTER_YEARS) {
            return quartersUntil;
        } else if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.YEARS:
                    return MathUtil.intDiv(quartersUntil, 4);
                case ChronoUnit.DECADES:
                    return MathUtil.intDiv(quartersUntil, 40);
                case ChronoUnit.CENTURIES:
                    return MathUtil.intDiv(quartersUntil, 400);
                case ChronoUnit.MILLENNIA:
                    return MathUtil.intDiv(quartersUntil, 4000);
                case ChronoUnit.ERAS:
                    return end.getLong(ChronoField.ERA) - this.getLong(ChronoField.ERA);
                default:
                    throw new UnsupportedTemporalTypeException(`Unsupported unit: ${unit}`);
            }
        }
        return unit.between(this, end);
    }

    /**
     * Formats this year-quarter using the specified formatter.
     *
     * This year-quarter will be passed to the formatter to produce a string.
     *
     * @param {DateTimeFormatter} formatter - the formatter to use, not null
     * @return {string} the formatted year-quarter string, not null
     * @throws {DateTimeException} if an error occurs during printing
     */
    format(formatter) {
        requireNonNull(formatter, 'formatter');
        return formatter.format(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Combines this year-quarter with a day-of-quarter to create a `LocalDate`.
     *
     * This returns a `LocalDate` formed from this year-quarter and the specified day-of-quarter.
     *
     * The day-of-quarter value must be valid for the year-quarter.
     *
     * This method can be used as part of a chain to produce a date:
     * ```
     *  LocalDate date = yearQuarter.atDay(day);
     * ```
     *
     * @param {number} dayOfQuarter the day-of-quarter to use, from 1 to 92
     * @return {LocalDate} the date formed from this year-quarter and the specified day, not null
     * @throws {DateTimeException} if the day is invalid for the year-quarter
     * @see {@link YearQuarter.isValidDay}
     */
    atDay(dayOfQuarter) {
        ValueRange.of(1, this.lengthOfQuarter()).checkValidValue(dayOfQuarter, IsoFields.DAY_OF_QUARTER);
        const leap = Year.isLeap(this._year);
        let month = this._quarter.firstMonth();
        while (dayOfQuarter > month.length(leap)) {
            dayOfQuarter -= month.length(leap);
            month = month.plus(1);
        }
        return LocalDate.of(this._year, month, dayOfQuarter);
    }

    /**
     * Returns a `LocalDate` at the end of the quarter.
     *
     * This returns a `LocalDate` based on this year-quarter.
     * The day-of-quarter is set to the last valid day of the quarter, taking
     * into account leap years.
     *
     * This method can be used as part of a chain to produce a date:
     * ```
     *  LocalDate date = year.atQuarter(quarter).atEndOfQuarter();
     * ```
     *
     * @return {LocalDate} the last valid date of this year-quarter, not null
     */
    atEndOfQuarter() {
        const month = this._quarter.firstMonth().plus(2);
        return LocalDate.of(this._year, month, month.maxLength());
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this year-quarter to another
     *
     * The comparison is based first on the value of the year, then on the value of the quarter.
     * It is 'consistent with equals', as defined by {@link Comparable}.
     *
     * @param {YearQuarter} other - the other year-quarter to compare to, not null
     * @return {number} the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, YearQuarter, 'other');
        let cmp = (this._year - other._year);
        if (cmp === 0) {
            cmp = this._quarter.compareTo(other._quarter);
        }
        return cmp;
    }

    /**
     * Is this year-quarter after the specified year-quarter.
     *
     * @param {YearQuarter} other - the other year-quarter to compare to, not null
     * @return {boolean} true if this is after the specified year-quarter
     */
    isAfter(other) {
        return this.compareTo(other) > 0;
    }

    /**
     * Is this year-quarter before the specified year-quarter.
     *
     * @param {YearQuarter} other - the other year-quarter to compare to, not null
     * @return {boolean} true if this point is before the specified year-quarter
     */
    isBefore(other) {
        return this.compareTo(other) < 0;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this year-quarter is equal to another year-quarter.
     *
     * The comparison is based on the time-line position of the year-quarters.
     *
     * @param {*} obj - the object to check, null returns false
     * @return {boolean} true if this is equal to the other year-quarter
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof YearQuarter) {
            const other = obj;
            return this._year === other._year && this._quarter === other._quarter;
        }
        return false;
    }

    /**
     * A hash code for this year-quarter.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        return this._year ^ (this._quarter.value() << 27);
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this year-quarter as a `String`, such as `2007-Q2`.
     *
     * The output will be in the format `uuuu-'Q'Q`:
     *
     * @return {string} a string representation of this year-quarter, not null
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
        return yearString.concat('-').concat(this._quarter);
    }
}

export function _init() {
    YearQuarter.PARSER = new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
        .appendLiteral('-')
        .appendLiteral('Q')
        .appendValue(IsoFields.QUARTER_OF_YEAR, 1)
        .toFormatter();

    YearQuarter.FROM = createTemporalQuery('YearQuarter.FROM', (temporal) => {
        return YearQuarter.from(temporal);
    });
}

// copied from packages/core/src/temporal/TemporalQuery.js
function createTemporalQuery(name, queryFromFunction) {
    class ExtendedTemporalQuery extends TemporalQuery {
    }

    ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
    return new ExtendedTemporalQuery(name);
}
