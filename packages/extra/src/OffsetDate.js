/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoField, ChronoUnit, Clock, DateTimeException, DateTimeFormatter, IllegalArgumentException, IsoChronology, LocalDate, OffsetDateTime, Temporal, TemporalField, TemporalQueries, TemporalQuery, TemporalUnit, ZoneId, ZoneOffset } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireInstance, requireNonNull } from './assert';
import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * The number of seconds per day.
 */
const SECONDS_PER_DAY = 86400;

/**
 * A date with an offset from UTC/Greenwich in the ISO-8601 calendar system,
 * such as `2007-12-03+01:00`.
 * 
 * `OffsetDate` is an immutable date-time object that represents a date, often viewed
 * as year-month-day-offset. This object can also access other date fields such as
 * day-of-year, day-of-week and week-of-year.
 * 
 * This class does not store or represent a time.
 * For example, the value '2nd October 2007 +02:00' can be stored
 * in an `OffsetDate`.
 *
 */
export class OffsetDate extends Temporal {
    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link OffsetDate.now}
     *
     * if called with 0 argument {@link OffsetDate.now0} is executed,
     *
     * if called with 1 argument and first argument is an instance of ZoneId, then {@link OffsetDate.nowZoneId} is executed,
     *
     * otherwise {@link OffsetDate.nowClock} is executed
     *
     * @param {?(ZoneId|Clock)} zoneIdOrClock
     * @returns {YearQuarter}
     */
    static now(zoneIdOrClock) {
        if (arguments.length === 0) {
            return OffsetDate.now0();
        } else if (arguments.length === 1 && zoneIdOrClock instanceof ZoneId) {
            return OffsetDate.nowZoneId(zoneIdOrClock);
        } else {
            return OffsetDate.nowClock(zoneIdOrClock);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the current date from the system clock in the default time-zone.
     * 
     * This will query the {@link Clock.systemDefaultZone} system clock in the default
     * time-zone to obtain the current date.
     * The offset will be calculated from the time-zone in the clock.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {OffsetDate} the current date using the system clock, not null
     */
    static now0() {
        return OffsetDate.now(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current date from the system clock in the specified time-zone.
     * 
     * This will query the {@link Clock.system} system clock to obtain the current date.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * The offset will be calculated from the specified time-zone.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone  the zone ID to use, not null
     * @return {OffsetDate} the current date using the system clock, not null
     */
    static nowZoneId(zone) {
        return OffsetDate.now(Clock.system(zone));
    }

    /**
     * Obtains the current date from the specified clock.
     * 
     * This will query the specified clock to obtain the current date - today.
     * The offset will be calculated from the time-zone in the clock.
     * 
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock} dependency injection.
     *
     * @param {Clock} clock  the clock to use, not null
     * @return {OffsetDate} the current date, not null
     */
    static nowClock(clock) {
        requireNonNull(clock, 'clock');
        const now = clock.instant();  // called once
        return OffsetDate.ofInstant(now, clock.zone().rules().offset(now));
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link OffsetDate.of}
     *
     * if called with 2 arguments {@link OffsetDate.ofLocalDateZoneOffset} is executed,
     * if called with 4 agruments {@link YearQuarter.ofIntIntIntZoneOffset} is executed,
     * otherwise throws IllegalArgumentException.
     *
     * @returns {YearQuarter}
     */
    static of() {
        switch (arguments.length) {
            case 2: return OffsetDate.ofLocalDateZoneOffset(...arguments);
            case 4: return OffsetDate.ofIntIntIntZoneOffset(...arguments);
            default: throw new IllegalArgumentException('Illegal number of arguments');
        }
    }

    /**
     * Obtains an instance of `OffsetDate` from a local date and an offset.
     *
     * @param {LocalDate} date  the local date, not null
     * @param {ZoneOffset} offset  the zone offset, not null
     * @return {OffsetDate} the offset date, not null
     */
    static ofLocalDateZoneOffset(date, offset) {
        return new OffsetDate(date, offset);
    }

    /**
     * Obtains an instance of `OffsetDate` from a year, month, day
     * and offset.
     * 
     * This creates an offset date with the four specified fields.
     * 
     * This method exists primarily for writing test cases.
     * Non test-code will typically use other methods to create an offset time.
     *
     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {number} month  the month-of-year to represent, from 1 (January) to 12 (December)
     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
     * @param {ZoneOffset} offset  the zone offset, not null
     * @return {OffsetDate} the offset date, not null
     * @throws DateTimeException if the value of any field is out of range, or
     *  if the day-of-month is invalid for the month-year
     */
    static ofIntIntIntZoneOffset(year, month, dayOfMonth, offset) {
        const d = LocalDate.of(year, month, dayOfMonth);
        return new OffsetDate(d, offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `OffsetDate` from an `Instant` and zone ID.
     * 
     * This creates an offset date with the same instant as midnight at the
     * start of day of the instant specified.
     * Finding the offset from UTC/Greenwich is simple as there is only one valid
     * offset for each instant.
     *
     * @param {Instant} instant  the instant to create the time from, not null
     * @param {ZoneId} zone  the time-zone, which may be an offset, not null
     * @return {OffsetDate} the offset time, not null
     */
    static ofInstant(instant, zone) {
        requireNonNull(instant, 'instant');
        requireNonNull(zone, 'zone');
        const rules = zone.rules();
        const offset = rules.offset(instant);
        const epochSec = instant.epochSecond() + offset.totalSeconds();  // overflow caught later
        const epochDay = MathUtil.floorDiv(epochSec, SECONDS_PER_DAY);
        const date = LocalDate.ofEpochDay(epochDay);
        return new OffsetDate(date, offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `OffsetDate` from a temporal object.
     * 
     * A `TemporalAccessor` represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of `OffsetDate`.
     * 
     * The conversion extracts and combines `LocalDate` and `ZoneOffset`.
     * 
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, `OffsetDate.FROM`.
     *
     * @param {TemporalAccessor} temporal  the temporal object to convert, not null
     * @return {OffsetDate} the offset date, not null
     * @throws DateTimeException if unable to convert to an `OffsetDate`
     */
    static from(temporal) {
        if (temporal instanceof OffsetDate) {
            return temporal;
        }
        requireNonNull(temporal, 'temporal');
        try {
            const date = LocalDate.from(temporal);
            const offset = ZoneOffset.from(temporal);
            return new OffsetDate(date, offset);
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain OffsetDate from TemporalAccessor: ${temporal.constructor.name}`, ex);
        }
    }

    /**
     * Obtains an instance of `OffsetDate` from a text string using a specific formatter.
     * 
     * The text is parsed using the formatter, returning a date.
     *
     * @param {CharSequence} text  the text to parse, not null
     * @param {DateTimeFormatter} formatter  the formatter to use, not null
     * @return {OffsetDate} the parsed offset date, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static parse(text, formatter = DateTimeFormatter.ISO_OFFSET_DATE) {
        requireNonNull(formatter, 'formatter');
        return formatter.parse(text, OffsetDate.FROM);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {LocalDate} date  the local date, not null
     * @param {ZoneOffset} offset  the zone offset, not null
     */
    constructor(date, offset) {
        super();
        this._date = requireNonNull(date, 'date');
        this._offset = requireNonNull(offset, 'offset');
    }

    /**
     * Returns a new date based on this one, returning `this` where possible.
     *
     * @param {LocalDate} date  the date to create with, not null
     * @param {ZoneOffset} offset  the zone offset to create with, not null
     */
    _with(date, offset) {
        if (this._date === date && this._offset.equals(offset)) {
            return this;
        }
        return new OffsetDate(date, offset);
    }

    /**
     * function overloading for {@link OffsetDate.isSupported}
     *
     * * if called with an instance of {@link TemporalField}, then {@link OffsetDate.isSupportedField} is executed,
     * * if called with an instance of {@link TemporalUnit}, then {@link OffsetDate.isSupportedUnit} is executed,
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
     * This checks if this date can be queried for the specified field.
     * If false, then calling the {@link OffsetDate.range},
     * {@link OffsetDate.get} and {@link OffsetDate.with}
     * methods will throw an exception.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     * 
     * - `DAY_OF_WEEK`
     * - `ALIGNED_DAY_OF_WEEK_IN_MONTH`
     * - `ALIGNED_DAY_OF_WEEK_IN_YEAR`
     * - `DAY_OF_MONTH`
     * - `DAY_OF_YEAR`
     * - `EPOCH_DAY`
     * - `ALIGNED_WEEK_OF_MONTH`
     * - `ALIGNED_WEEK_OF_YEAR`
     * - `MONTH_OF_YEAR`
     * - `PROLEPTIC_MONTH`
     * - `YEAR_OF_ERA`
     * - `YEAR`
     * - `ERA`
     * - `OFFSET_SECONDS`
     * 
     * All other `ChronoField` instances will return false.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField} field  the field to check, null returns false
     * @return {boolean} true if the field is supported on this date, false if not
     */
    isSupportedField(field) {
        if (field instanceof ChronoField) {
            return field.isDateBased() || field === ChronoField.OFFSET_SECONDS;
        }
        return field != null && field.isSupportedBy(this);
    }

    /**
     * Checks if the specified unit is supported.
     * 
     * This checks if the specified unit can be added to, or subtracted from, this date.
     * If false, then calling the {@link OffsetDate.plus(long, TemporalUnit)} and
     * {@link OffsetDate.minus(long, TemporalUnit) minus} methods will throw an exception.
     * 
     * If the unit is a {@link ChronoUnit} then the query is implemented here.
     * The supported units are:
     * <ul>
     * - `DAYS`
     * - `WEEKS`
     * - `MONTHS`
     * - `YEARS`
     * - `DECADES`
     * - `CENTURIES`
     * - `MILLENNIA`
     * - `ERAS`
     * </ul>
     * All other `ChronoUnit` instances will return false.
     * 
     * If the unit is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
     * passing `this` as the argument.
     * Whether the unit is supported is determined by the unit.
     *
     * @param {TemporalUnit} unit  the unit to check, null returns false
     * @return {boolena} true if the unit can be added/subtracted, false if not
     */
    isSupportedUnit(unit) {
        if (unit instanceof ChronoUnit) {
            return unit.isDateBased();
        }
        return unit != null && unit.isSupportedBy(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the range of valid values for the specified field.
     * 
     * The range object expresses the minimum and maximum valid values for a field.
     * This date is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link OffsetDate.isSupported} supported fields will return
     * appropriate range instances.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field  the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     * @throws UnsupportedTemporalTypeException if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field instanceof ChronoField) {
            if (field === ChronoField.OFFSET_SECONDS) {
                return field.range();
            }
            return this._date.range(field);
        }
        return field.rangeRefinedBy(this);
    }

    /**
     * Gets the value of the specified field from this date as an `int`.
     * 
     * This queries this date for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link OffsetDate.isSupported} supported fields will return valid
     * values based on this date, except `EPOCH_DAY` and `PROLEPTIC_MONTH`
     * which are too large to fit in an `int` and throw a `DateTimeException`.
     * All other `ChronoField` instances will throw a `DateTimeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained or
     *  the value is outside the range of valid values for the field
     * @throws UnsupportedTemporalTypeException if the field is not supported or
     *  the range of values exceeds an `int`
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this date as a `long`.
     * 
     * This queries this date for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link OffsetDate.isSupported} supported fields will return valid
     * values based on this date.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws UnsupportedTemporalTypeException if the field is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field instanceof ChronoField) {
            if (field === ChronoField.OFFSET_SECONDS) {
                return this.offset().totalSeconds();
            }
            return this._date.getLong(field);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the zone offset, such as '+01:00'.
     * 
     * This is the offset of the local date from UTC/Greenwich.
     *
     * @return {ZoneOffset} the zone offset, not null
     */
    offset() {
        return this._offset;
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified offset ensuring
     * that the result has the same local date.
     * 
     * This method returns an object with the same `LocalDate` and the specified `ZoneOffset`.
     * No calculation is needed or performed.
     * For example, if this time represents `2007-12-03+02:00` and the offset specified is
     * `+03:00`, then this method will return `2007-12-03+03:00`.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {ZoneOffset} offset  the zone offset to change to, not null
     * @return {OffsetDate} an `OffsetDate` based on this date with the requested offset, not null
     */
    withOffsetSameLocal(offset) {
        requireNonNull(offset, 'offset');
        return this._with(this._date, offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the `LocalDate` part of this date.
     * 
     * This returns a `LocalDate` with the same year, month and day
     * as this date.
     *
     * @return {LocalDate} the date part of this date, not null
     */
    toLocalDate() {
        return this._date;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the year field.
     * 
     * This method returns the primitive `int` value for the year.
     * 
     * The year returned by this method is proleptic as per `get(YEAR)`.
     * To obtain the year-of-era, use `get(YEAR_OF_ERA)`.
     *
     * @return {number} the year, from MIN_YEAR to MAX_YEAR
     */
    year() {
        return this._date.year();
    }

    /**
     * Gets the month-of-year field from 1 to 12.
     * 
     * This method returns the month as an `int` from 1 to 12.
     * Application code is frequently clearer if the enum {@link Month}
     * is used by calling {@link OffsetDate.month}.
     *
     * @return {number} the month-of-year, from 1 to 12
     * @see OffsetDate.month()
     */
    monthValue() {
        return this._date.monthValue();
    }

    /**
     * Gets the month-of-year field using the `Month` enum.
     * 
     * This method returns the enum {@link Month} for the month.
     * This avoids confusion as to what `int` values mean.
     * If you need access to the primitive `int` value then the enum
     * provides the {@link Month.value} int value.
     *
     * @return {Month} the month-of-year, not null
     * @see OffsetDate.monthValue()
     */
    month() {
        return this._date.month();
    }

    /**
     * Gets the day-of-month field.
     * 
     * This method returns the primitive `int` value for the day-of-month.
     *
     * @return {number} the day-of-month, from 1 to 31
     */
    dayOfMonth() {
        return this._date.dayOfMonth();
    }

    /**
     * Gets the day-of-year field.
     * 
     * This method returns the primitive `int` value for the day-of-year.
     *
     * @return {number} the day-of-year, from 1 to 365, or 366 in a leap year
     */
    dayOfYear() {
        return this._date.dayOfYear();
    }

    /**
     * Gets the day-of-week field, which is an enum `DayOfWeek`.
     * 
     * This method returns the enum {@link DayOfWeek} for the day-of-week.
     * This avoids confusion as to what `int` values mean.
     * If you need access to the primitive `int` value then the enum
     * provides the {@link DayOfWeek.value} int value.
     * 
     * Additional information can be obtained from the `DayOfWeek`.
     * This includes textual names of the values.
     *
     * @return {DayOfWeek} the day-of-week, not null
     */
    dayOfWeek() {
        return this._date.dayOfWeek();
    }

    //-----------------------------------------------------------------------
    /**
     * Returns an adjusted copy of this date.
     * 
     * This returns an `OffsetDate` based on this one, with the date adjusted.
     * The adjustment takes place using the specified adjuster strategy object.
     * Read the documentation of the adjuster to understand what adjustment will be made.
     * 
     * A simple adjuster might simply set the one of the fields, such as the year field.
     * A more complex adjuster might set the date to the last day of the month.
     * A selection of common adjustments is provided in {@link TemporalAdjusters}.
     * These include finding the 'last day of the month' and 'next Wednesday'.
     * Key date-time classes also implement the `TemporalAdjuster` interface,
     * such as {@link Month} and {@link MonthDay}.
     * The adjuster is responsible for handling special cases, such as the varying
     * lengths of month and leap years.
     * 
     * For example this code returns a date on the last day of July:
     * <pre>
     *  import static java.time.Month.*;
     *  import static java.time.temporal.TemporalAdjusters.*;
     *
     *  result = offsetDate.with(JULY).with(lastDayOfMonth());
     * </pre>
     * 
     * The classes {@link LocalDate} and {@link ZoneOffset} implement `TemporalAdjuster`,
     * thus this method can be used to change the date or offset:
     * <pre>
     *  result = offsetDate.with(date);
     *  result = offsetDate.with(offset);
     * </pre>
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalAdjuster.adjustInto} method on the
     * specified adjuster passing `this` as the argument.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAdjuster} adjuster the adjuster to use, not null
     * @return {OffsetDate} an `OffsetDate` based on `this` with the adjustment made, not null
     * @throws DateTimeException if the adjustment cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    _withAdjuster(adjuster) {
        // optimizations
        if (adjuster instanceof LocalDate) {
            return this._with(adjuster, this._offset);
        } else if (adjuster instanceof ZoneOffset) {
            return this._with(this._date, adjuster);
        } else if (adjuster instanceof OffsetDate) {
            return adjuster;
        }
        return super._withAdjuster(adjuster);
    }

    /**
     * Returns a copy of this date with the specified field set to a new value.
     * 
     * This returns an `OffsetDate` based on this one, with the value
     * for the specified field changed.
     * This can be used to change any supported field, such as the year, month or day-of-month.
     * If it is not possible to set the value, because the field is not supported or for
     * some other reason, an exception is thrown.
     * 
     * In some cases, changing the specified field can cause the resulting date to become invalid,
     * such as changing the month from 31st January to February would make the day-of-month invalid.
     * In cases like this, the field is responsible for resolving the date. Typically it will choose
     * the previous valid date, which would be the last valid day of February in this example.
     * 
     * If the field is a {@link ChronoField} then the adjustment is implemented here.
     * 
     * The `OFFSET_SECONDS` field will return a date with the specified offset.
     * The local date is unaltered. If the new offset value is outside the valid range
     * then a `DateTimeException` will be thrown.
     * 
     * The other {@link OffsetDate.isSupported} supported fields will behave as per
     * the matching method on {@link LocalDate.with} LocalDate.
     * In this case, the offset is not part of the calculation and will be unchanged.
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
     * @param {TemporalField} field  the field to set in the result, not null
     * @param {number} newValue  the new value of the field in the result
     * @return {OffsetDate} an `OffsetDate` based on `this` with the specified field set, not null
     * @throws DateTimeException if the field cannot be set
     * @throws UnsupportedTemporalTypeException if the field is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    _withField(field, newValue) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        if (field instanceof ChronoField) {
            if (field === ChronoField.OFFSET_SECONDS) {
                const f = field;
                return this._with(this._date, ZoneOffset.ofTotalSeconds(f.checkValidIntValue(newValue)));
            }
            return this._with(this._date.with(field, newValue), this._offset);
        }
        return field.adjustInto(this, newValue);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this `OffsetDate` with the year altered.
     * 
     * The offset does not affect the calculation and will be the same in the result.
     * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {OffsetDate} year  the year to set in the result, from MIN_YEAR to MAX_YEAR
     * @return {number} an `OffsetDate` based on this date with the requested year, not null
     * @throws DateTimeException if the year value is invalid
     */
    withYear(year) {
        return this._with(this._date.withYear(year), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the month-of-year altered.
     * 
     * The offset does not affect the calculation and will be the same in the result.
     * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} month  the month-of-year to set in the result, from 1 (January) to 12 (December)
     * @return {OffsetDate} an `OffsetDate` based on this date with the requested month, not null
     * @throws DateTimeException if the month-of-year value is invalid
     */
    withMonth(month) {
        return this._with(this._date.withMonth(month), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the day-of-month altered.
     * 
     * If the resulting date is invalid, an exception is thrown.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} dayOfMonth  the day-of-month to set in the result, from 1 to 28-31
     * @return {OffsetDate} an `OffsetDate` based on this date with the requested day, not null
     * @throws DateTimeException if the day-of-month value is invalid,
     *  or if the day-of-month is invalid for the month-year
     */
    withDayOfMonth(dayOfMonth) {
        return this._with(this._date.withDayOfMonth(dayOfMonth), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the day-of-year altered.
     * 
     * If the resulting date is invalid, an exception is thrown.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} dayOfYear  the day-of-year to set in the result, from 1 to 365-366
     * @return {OffsetDate} an `OffsetDate` based on this date with the requested day, not null
     * @throws DateTimeException if the day-of-year value is invalid,
     *  or if the day-of-year is invalid for the year
     */
    withDayOfYear(dayOfYear) {
        return this._with(this._date.withDayOfYear(dayOfYear), this._offset);
    }

    /**
     * Returns a copy of this date with the specified amount added.
     * 
     * This returns an `OffsetDate` based on this one, with the amount
     * in terms of the unit added. If it is not possible to add the amount, because the
     * unit is not supported or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoUnit} then the addition is implemented by
     * {@link LocalDate.plus}.
     * The offset is not part of the calculation and will be unchanged in the result.
     * 
     * If the field is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
     * passing `this` as the argument. In this case, the unit determines
     * whether and how to perform the addition.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} amountToAdd  the amount of the unit to add to the result, may be negative
     * @param {TemporalUnit} unit  the unit of the amount to add, not null
     * @return {OffsetDate} an `OffsetDate` based on this date with the specified amount added, not null
     * @throws DateTimeException if the addition cannot be made
     * @throws UnsupportedTemporalTypeException if the unit is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    _plusUnit(amountToAdd, unit) {
        if (unit instanceof ChronoUnit) {
            return this._with(this._date.plus(amountToAdd, unit), this._offset);
        }
        return unit.addTo(this, amountToAdd);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this `OffsetDate` with the specified number of years added.
     * 
     * This uses {@link LocalDate.plusYears} to add the years.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} years  the years to add, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the years added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusYears(years) {
        return this._with(this._date.plusYears(years), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of months added.
     * 
     * This uses {@link LocalDate.plusMonths} to add the months.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months  the months to add, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the months added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusMonths(months) {
        return this._with(this._date.plusMonths(months), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of weeks added.
     * 
     * This uses {@link LocalDate.plusWeeks} to add the weeks.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} weeks  the weeks to add, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the weeks added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusWeeks(weeks) {
        return this._with(this._date.plusWeeks(weeks), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of days added.
     * 
     * This uses {@link LocalDate.plusDays)} to add the days.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days  the days to add, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the days added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusDays(days) {
        return this._with(this._date.plusDays(days), this._offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this `OffsetDate` with the specified number of years subtracted.
     * 
     * This uses {@link LocalDate.minusYears} to subtract the years.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} years  the years to subtract, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the years subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusYears(years) {
        return this._with(this._date.minusYears(years), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of months subtracted.
     * 
     * This uses {@link LocalDate.minusMonths} to subtract the months.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months  the months to subtract, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the months subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusMonths(months) {
        return this._with(this._date.minusMonths(months), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of weeks subtracted.
     * 
     * This uses {@link LocalDate.minusWeeks} to subtract the weeks.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} weeks  the weeks to subtract, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the weeks subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusWeeks(weeks) {
        return this._with(this._date.minusWeeks(weeks), this._offset);
    }

    /**
     * Returns a copy of this `OffsetDate` with the specified number of days subtracted.
     * 
     * This uses {@link LocalDate.minusDays} to subtract the days.
     * The offset does not affect the calculation and will be the same in the result.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days  the days to subtract, may be negative
     * @return {OffsetDate} an `OffsetDate` based on this date with the days subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusDays(days) {
        return this._with(this._date.minusDays(days), this._offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this date using the specified query.
     * 
     * This queries this date using the specified query strategy object.
     * The `TemporalQuery` object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery.queryFrom} method on the
     * specified query passing `this` as the argument.
     *
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query (defined by the query)
     * @throws ArithmeticException if numeric overflow occurs (defined by the query)
     */
    query(query) {
        requireNonNull(query, 'query');
        requireInstance(query, TemporalQuery, 'query');
        if (query === TemporalQueries.chronology()) {
            return IsoChronology.INSTANCE;
        } else if (query === TemporalQueries.precision()) {
            return ChronoUnit.DAYS;
        } else if (query === TemporalQueries.offset() || query === TemporalQueries.zone()) {
            return this.offset();
        }
        return super.query(query);
    }

    /**
     * Adjusts the specified temporal object to have the same offset and date
     * as this object.
     * 
     * This returns a temporal object of the same observable type as the input
     * with the offset and date changed to be the same as this.
     * 
     * The adjustment is equivalent to using {@link Temporal.with}
     * twice, passing {@link ChronoField.OFFSET_SECONDS} and
     * {@link ChronoField.EPOCH_DAY} as the fields.
     * 
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal.with(TemporalAdjuster)}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisOffsetDate.adjustInto(temporal);
     *   temporal = temporal.with(thisOffsetDate);
     * </pre>
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} temporal  the target object to be adjusted, not null
     * @return {Temporal} the adjusted object, not null
     * @throws DateTimeException if unable to make the adjustment
     * @throws ArithmeticException if numeric overflow occurs
     */
    adjustInto(temporal) {
        return temporal
            .with(ChronoField.OFFSET_SECONDS, this.offset().totalSeconds())
            .with(ChronoField.EPOCH_DAY, this.toLocalDate().toEpochDay());
    }

    /**
     * Calculates the period between this date and another date in
     * terms of the specified unit.
     * 
     * This calculates the period between two dates in terms of a single unit.
     * The start and end points are `this` and the specified date.
     * The result will be negative if the end is before the start.
     * For example, the period in days between two dates can be calculated
     * using `startDate.until(endDate, DAYS)`.
     * 
     * The `Temporal` passed to this method is converted to a
     * `OffsetDate` using {@link OffsetDate.from}.
     * If the offset differs between the two times, then the specified
     * end time is normalized to have the same offset as this time.
     * 
     * The calculation returns a whole number, representing the number of
     * complete units between the two dates.
     * For example, the period in months between 2012-06-15Z and 2012-08-14Z
     * will only be one month as it is one day short of two months.
     * 
     * There are two equivalent ways of using this method.
     * The first is to invoke this method.
     * The second is to use {@link TemporalUnit.between}:
     * <pre>
     *   // these two lines are equivalent
     *   amount = start.until(end, DAYS);
     *   amount = DAYS.between(start, end);
     * </pre>
     * The choice should be made based on which makes the code more readable.
     * 
     * The calculation is implemented in this method for {@link ChronoUnit}.
     * The units `DAYS`, `WEEKS`, `MONTHS`, `YEARS`,
     * `DECADES`, `CENTURIES`, `MILLENNIA` and `ERAS`
     * are supported. Other `ChronoUnit` values will throw an exception.
     * 
     * If the unit is not a `ChronoUnit`, then the result of this method
     * is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
     * passing `this` as the first argument and the converted input temporal
     * as the second argument.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} endExclusive  the end time, exclusive, which is converted to an `OffsetDate`, not null
     * @param {TemporalUnit} unit  the unit to measure the amount in, not null
     * @return {number} the amount of time between this date and the end date
     * @throws DateTimeException if the amount cannot be calculated, or the end
     *  temporal cannot be converted to an `OffsetDate`
     * @throws UnsupportedTemporalTypeException if the unit is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    until(endExclusive, unit) {
        const end = OffsetDate.from(endExclusive);
        if (unit instanceof ChronoUnit) {
            const offsetDiff = end._offset.totalSeconds() - this._offset.totalSeconds();
            const endLocal = end._date.plusDays(MathUtil.intDiv(-offsetDiff, SECONDS_PER_DAY));
            return this._date.until(endLocal, unit);
        }
        return unit.between(this, end);
    }

    /**
     * Formats this date using the specified formatter.
     * 
     * This date will be passed to the formatter to produce a string.
     *
     * @param {DateTimeFormatter} formatter  the formatter to use, not null
     * @return {string} the formatted date string, not null
     * @throws DateTimeException if an error occurs during printing
     */
    format(formatter) {
        requireNonNull(formatter, 'formatter');
        return formatter.format(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns an offset date-time formed from this date at the specified time.
     * 
     * This combines this date with the specified time to form an `OffsetDateTime`.
     * All possible combinations of date and time are valid.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {LocalTime} time  the time to combine with, not null
     * @return {OffsetDateTime} the offset date-time formed from this date and the specified time, not null
     */
    atTime(time) {
        return OffsetDateTime.of(this._date, time, this._offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Converts this date to midnight at the start of day in epoch seconds.
     *
     * @return {number} the epoch seconds value
     */
    _toEpochSecond() {
        const epochDay = this._date.toEpochDay();
        const secs = epochDay * SECONDS_PER_DAY;
        return secs - this._offset.totalSeconds();
    }

    /**
     * Converts this `OffsetDate` to the number of seconds since the epoch
     * of 1970-01-01T00:00:00Z.
     * 
     * This combines this offset date with the specified time
     * to calculate the epoch-second value, which is the
     * number of elapsed seconds from 1970-01-01T00:00:00Z.
     * Instants on the time-line after the epoch are positive, earlier
     * are negative.
     *
     * @param {LocalTime} time the local time, not null
     * @return {number} the number of seconds since the epoch of 1970-01-01T00:00:00Z, may be negative
     */
    toEpochSecond(time) {
        requireNonNull(time, 'time');
        return this._toEpochSecond() + time.toSecondOfDay();
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this `OffsetDate` to another date.
     * 
     * The comparison is based first on the UTC equivalent instant, then on the local date.
     * It is 'consistent with equals', as defined by {@link Comparable}.
     * 
     * For example, the following is the comparator order:
     * 1. 2008-06-29-11:00</li>
     * 2. 2008-06-29-12:00</li>
     * 3. 2008-06-30+12:00</li>
     * 4. 2008-06-29-13:00</li>
     * 
     * Values #2 and #3 represent the same instant on the time-line.
     * When two values represent the same instant, the local date is compared
     * to distinguish them. This step is needed to make the ordering
     * consistent with `equals()`.
     * 
     * To compare the underlying local date of two `TemporalAccessor` instances,
     * use {@link ChronoField.EPOCH_DAY} as a comparator.
     *
     * @param {OffsetDate} other  the other date to compare to, not null
     * @return {number} the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, OffsetDate, 'other');
        if (this._offset.equals(other._offset)) {
            return this._date.compareTo(other._date);
        }
        let compare = this._toEpochSecond() - other._toEpochSecond();
        if (compare === 0) {
            compare = this._date.compareTo(other._date);
        }
        return compare;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the instant of midnight at the start of this `OffsetDate`
     * is after midnight at the start of the specified date.
     * 
     * This method differs from the comparison in {@link OffsetDate.compareTo} in that it
     * only compares the instant of the date. This is equivalent to using
     * `date1.toEpochSecond().isAfter(date2.toEpochSecond())`.
     *
     * @param {OffsetDate} other  the other date to compare to, not null
     * @return {boolean} true if this is after the instant of the specified date
     */
    isAfter(other) {
        requireNonNull(other, 'other');
        requireInstance(other, OffsetDate, 'other');
        return this._toEpochSecond() > other._toEpochSecond();
    }

    /**
     * Checks if the instant of midnight at the start of this `OffsetDate`
     * is before midnight at the start of the specified date.
     * 
     * This method differs from the comparison in {@link OffsetDate.compareTo} in that it
     * only compares the instant of the date. This is equivalent to using
     * `date1.toEpochSecond().isBefore(date2.toEpochSecond())`.
     *
     * @param {OffsetDate} other  the other date to compare to, not null
     * @return {boolean} true if this is before the instant of the specified date
     */
    isBefore(other) {
        requireNonNull(other, 'other');
        requireInstance(other, OffsetDate, 'other');
        return this._toEpochSecond() < other._toEpochSecond();
    }

    /**
     * Checks if the instant of midnight at the start of this `OffsetDate`
     * equals midnight at the start of the specified date.
     * 
     * This method differs from the comparison in {@link OffsetDate.compareTo} and {@link OffsetDate.equals}
     * in that it only compares the instant of the date. This is equivalent to using
     * `date1.toEpochSecond().equals(date2.toEpochSecond())`.
     *
     * @param {OffsetDate} other  the other date to compare to, not null
     * @return {boolean} true if the instant equals the instant of the specified date
     */
    isEqual(other) {
        requireNonNull(other, 'other');
        requireInstance(other, OffsetDate, 'other');
        return this._toEpochSecond() === other._toEpochSecond();
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this date is equal to another date.
     * 
     * The comparison is based on the local-date and the offset.
     * To compare for the same instant on the time-line, use {@link OffsetDate.isEqual}.
     * 
     * Only objects of type `OffsetDate` are compared, other types return false.
     * To compare the underlying local date of two `TemporalAccessor` instances,
     * use {@link ChronoField.EPOCH_DAY} as a comparator.
     *
     * @param {Object} obj  the object to check, null returns false
     * @return {boolean} true if this is equal to the other date
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof OffsetDate) {
            const other = obj;
            return this._date.equals(other._date) && this._offset.equals(other._offset);
        }
        return false;
    }

    /**
     * A hash code for this date.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        return this._date.hashCode() ^ this._offset.hashCode();
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this date as a `String`, such as `2007-12-03+01:00`.
     * 
     * The output will be in the ISO-8601 format `yyyy-MM-ddXXXXX`.
     *
     * @return {String} a string representation of this date, not null
     */
    toString() {
        return this._date.toString() + this._offset.toString();
    }
}

export function _init() {
    /**
     * The minimum supported `OffsetDate`, '-999999999-01-01+18:00'.
     * This is the minimum local date in the maximum offset
     * (larger offsets are earlier on the time-line).
     * This combines {@link LocalDate.MIN} and {@link ZoneOffset.MAX}.
     * This could be used by an application as a 'far past' date.
     */
    OffsetDate.MIN = OffsetDate.of(LocalDate.MIN, ZoneOffset.MAX);
    /**
     * The maximum supported `OffsetDate`, '+999999999-12-31-18:00'.
     * This is the maximum local date in the minimum offset
     * (larger negative offsets are later on the time-line).
     * This combines {@link LocalDate.MAX} and {@link ZoneOffset.MIN}.
     * This could be used by an application as a 'far future' date.
     */
    OffsetDate.MAX = OffsetDate.of(LocalDate.MAX, ZoneOffset.MIN);

    OffsetDate.FROM = createTemporalQuery('OffsetDate.FROM', (temporal) => {
        return OffsetDate.from(temporal);
    });
}

// copied from packages/core/src/temporal/TemporalQuery.js
function createTemporalQuery(name, queryFromFunction) {
    class ExtendedTemporalQuery extends TemporalQuery {
    }

    ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
    return new ExtendedTemporalQuery(name);
}
