/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoField, Clock, DateTimeException, IllegalArgumentException, IsoChronology, LocalDate, Month, MonthDay, TemporalAccessor, TemporalQueries, TemporalQuery, UnsupportedTemporalTypeException, ZoneId } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireInstance, requireNonNull } from './assert';
import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * A day-of-month in the ISO-8601 calendar system.
 * 
 * {@link DayOfMonth} is an immutable date-time object that represents a day-of-month.
 * It is a type-safe way of representing a day-of-month in an application.
 * Any field that can be derived from a day-of-month can be obtained.
 * 
 * This class does not store or represent a year, month, time or time-zone.
 * For example, the value '21' can be stored in a {@link DayOfMonth} and
 * would represent the 21st day of any month.
 */
export class DayOfMonth extends TemporalAccessor {
    //-----------------------------------------------------------------------
    /**
     * Function overloading for {@link DayOfMonth.now}:
     * - if called with no arguments, {@link DayOfMonth._now0} is executed;
     * - if called with an instance of {@link ZoneId}, then {@link DayOfMonth._nowZoneId} is executed;
     * - if called with an instance of {@link Clock}, then {@link DayOfMonth._nowClock} is executed;
     * - otherwise {@link IllegalArgumentException} is thrown.
     * 
     * @param {?(ZoneId|Clock)} zoneIdOrClock
     * @return {DayOfMonth}
     */
    static now(zoneIdOrClock) {
        switch (arguments.length) {
            case 0:
                return DayOfMonth._now0();
            case 1:
                requireNonNull(zoneIdOrClock, 'clockOrZone');
                if (zoneIdOrClock instanceof ZoneId) {
                    return DayOfMonth._nowZoneId(zoneIdOrClock);
                }
                if (zoneIdOrClock instanceof Clock) {
                    return DayOfMonth._nowClock(zoneIdOrClock);
                }
                throw new IllegalArgumentException(`zoneIdOrClock must be an instance of ZoneId or Clock, but is ${zoneIdOrClock.constructor.name}`);
            default:
                throw new IllegalArgumentException(`Invalid number of arguments: ${arguments.length}`);
        }
    }

    /**
     * Obtains the current day-of-month from the system clock in the default time-zone.
     * 
     * This will query the {@link Clock.systemDefaultZone} system clock in the default
     * time-zone to obtain the current day-of-month.
     * The zone and offset will be set based on the time-zone in the clock.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {DayOfMonth} the current day-of-month using the system clock and default time-zone, not null
     * @protected
     */
    static _now0() {
        return this.now(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current day-of-month from the system clock in the specified time-zone.
     * 
     * This will query the {@link Clock#system(java.time.ZoneId) system clock} to obtain the current day-of-month.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone - the zone ID to use, not null
     * @return {DayOfMonth} the current day-of-month using the system clock, not null
     * @protected
     */
    static _nowZoneId(zone) {
        return this.now(Clock.system(zone));
    }

    /**
     * Obtains the current day-of-month from the specified clock.
     * 
     * This will query the specified clock to obtain the current day-of-month.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock dependency injection}.
     *
     * @param {Clock} clock - the clock to use, not null
     * @return {DayOfMonth} the current day-of-month, not null
     * @protected
     */
    static _nowClock(clock) {
        const now = LocalDate.now(clock);  // called once
        return DayOfMonth.of(now.dayOfMonth());
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link DayOfMonth}.
     * 
     * A day-of-month object represents one of the 31 days of the month, from 1 to 31.
     *
     * @param {number} dayOfMonth - the day-of-month to represent, from 1 to 31
     * @return {DayOfMonth} the day-of-month, not null
     * @throws {DateTimeException} if the day-of-month is invalid
     */
    static of(dayOfMonth) {
        if (1 <= dayOfMonth && dayOfMonth <= 31) {
            return DayOfMonth.VALUES[dayOfMonth - 1];
        } else {
            throw new DateTimeException(`Invalid value for DayOfMonth: ${dayOfMonth}`);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link DayOfMonth} from a date-time object.
     * 
     * This obtains a day-of-month based on the specified temporal.
     * A {@link TemporalAccessor} represents an arbitrary set of date and time information,
     * which this factory converts to an instance of {@link DayOfMonth}.
     * 
     * The conversion extracts the {@link ChronoField#DAY_OF_MONTH} day-of-month field.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a {@link LocalDate}.
     * 
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@link DayOfMonth.from}.
     *
     * @param {TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {DayOfMonth} the day-of-month, not null
     * @throws {DateTimeException} if unable to convert to a {@link DayOfMonth}
     */
    static from(temporal) {
        if (temporal instanceof DayOfMonth) {
            return temporal;
        }
        requireNonNull(temporal, 'temporal');
        try {
            /* TODO: only IsoChronology for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }*/
            return DayOfMonth.of(temporal.get(ChronoField.DAY_OF_MONTH));
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain DayOfMonth from TemporalAccessor: ${temporal} of type ${temporal.constructor.name}`, ex);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor, previously validated.
     *
     * @param {number} dayOfMonth  the day-of-month to represent, - from 1 to 31.
     * @private
     */
    constructor(dayOfMonth) {
        super();
        this._day = MathUtil.safeToInt(dayOfMonth);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the day-of-month value.
     *
     * @return {number} the day-of-month, from 1 to 31
     */
    value() {
        return this._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the specified field is supported.
     * 
     * This checks if this day-of-month can be queried for the specified field.
     * If false, then calling the {@link DayOfMonth.range} range,
     * {@link DayOfMonth.get} get and {@link DayOfMonth.getLong} getLong
     * methods will throw an exception.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     * <ul>
     * <li>{@link ChronoField.DAY_OF_MONTH}
     * </ul>
     * All other {@link ChronoField} instances will return false.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.isSupportedBy}
     * passing this as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField} field - the field to check, null returns false
     * @return {boolean} true if the field is supported on this day-of-month, false if not
     */
    isSupported(field) {
        if (field instanceof ChronoField) {
            return field === ChronoField.DAY_OF_MONTH;
        }
        return field != null && field.isSupportedBy(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the range of valid values for the specified field.
     * 
     * The range object expresses the minimum and maximum valid values for a field.
     * This day-of-month is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfMonth.isSupported} supported fields will return
     * appropriate range instances.
     * All other {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.rangeRefinedBy}
     * passing this as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field - the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws {DateTimeException} if the range for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        if (field === ChronoField.DAY_OF_MONTH) {
            return field.range();
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this day-of-month as an `int`.
     * 
     * This queries this day-of-month for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfMonth.isSupported} supported fields will return valid
     * values based on this day-of-month.
     * All other {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.getFrom}
     * passing this as the argument. Whether the value can be obtained,
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
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this day-of-month as a `long`.
     * 
     * This queries this day-of-month for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfMonth.isSupported(TemporalField) supported fields} will return valid
     * values based on this day-of-month.
     * All other {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.getFrom}
     * passing this as the argument. Whether the value can be obtained,
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
        if (field === ChronoField.DAY_OF_MONTH) {
            return this._day;
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the year-month is valid for this year.
     * 
     * This method checks whether this day and the input year and month form
     * a valid date.
     *
     * @param {YearMonth} yearMonth - the year month to validate, null returns false
     * @return {boolean} true if the year and month are valid for this day
     */
    isValidYearMonth(yearMonth) {
        return yearMonth != null && yearMonth.isValidDay(this._day);
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this day-of-month using the specified query.
     * 
     * This queries this day-of-month using the specified query strategy object.
     * The {@link TemporalQuery} object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery.queryFrom} method on the
     * specified query passing this as the argument.
     *
     * @param {TemporalQuery} query - the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws {DateTimeException} if unable to query (defined by the query)
     * @throws {ArithmeticException} if numeric overflow occurs (defined by the query)
    query(query) {
        requireNonNull(query, 'query');
        requireInstance(query, TemporalQuery, 'query');
        if (query === TemporalQueries.chronology()) {
            return IsoChronology.INSTANCE;
        }
        return super.query(query);
    }

    /**
     * Adjusts the specified temporal object to have this day-of-month.
     * 
     * This returns a temporal object of the same observable type as the input
     * with the day-of-month changed to be the same as this.
     * 
     * The adjustment is equivalent to using {@link Temporal.with}
     * passing {@link ChronoField.DAY_OF_MONTH} as the field.
     * If the specified temporal object does not use the ISO calendar system then
     * a {@link DateTimeException} is thrown.
     * 
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal.with}:
     * ```
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisDay.adjustInto(temporal);
     *   temporal = temporal.with(thisDay);
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
        requireNonNull(temporal, 'temporal');
        /* TODO: only IsoChronology for now
        if (Chronology.from(temporal).equals(IsoChronology.INSTANCE) === false) {
            throw new DateTimeException('Adjustment only supported on ISO date-time');
        }*/
        return temporal.with(ChronoField.DAY_OF_MONTH, this._day);
    }

    //-----------------------------------------------------------------------
    /**
     * Combines this day-of-month with a month to create a {@link MonthDay}.
     * 
     * This returns a {@link MonthDay} formed from this day and the specified month.
     * 
     * This method can be used as part of a chain to produce a date:
     * ```
     *  LocalDate date = day.atMonth(month).atYear(year);
     * ```
     * 
     * If this day-of-month is invalid for the month then it will be changed
     * to the last valid date for the month.
     *
     * @param {Month | number} month - the month-of-year to use, from 1 (January) to 12 (December), not null
     * @return {MonthDay} the year-month formed from this year and the specified month, not null
     */
    atMonth(month) {
        requireNonNull(month, 'month');
        if (month instanceof Month) {
            return MonthDay.of(month, Math.min(this._day, month.maxLength()));
        } else {
            return MonthDay.of(month, Math.min(this._day, Month.of(month).maxLength()));
        }
    }

    /**
     * Combines this day-of-month with a year-month to create a {@link LocalDate}.
     * 
     * This returns a {@link LocalDate} formed from this year and the specified year-month.
     * 
     * If this day-of-month is invalid for the year-month then it will be changed
     * to the last valid date for the month.
     *
     * @param {YearMonth} yearMonth - the year-month to use, not null
     * @return {LocalDate} the local date formed from this year and the specified year-month, not null
     */
    atYearMonth(yearMonth) {
        requireNonNull(yearMonth, 'yearMonth');
        return yearMonth.atDay(Math.min(this._day, yearMonth.lengthOfMonth()));
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this day-of-month to another.
     * 
     * The comparison is based on the value of the day.
     * It is 'consistent with equals', as defined by {@link Comparable}.
     *
     * @param {DayOfMonth} other - the other day-of-month instance, not null
     * @return {number} the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, DayOfMonth, 'other');
        return this._day - other._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this day-of-month is equal to another day-of-month.
     *
     * @param {*} obj - the other day-of-month instance, null returns false
     * @return {boolean} true if the day-of-month is the same
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof DayOfMonth) {
            return this._day === obj._day;
        }
        return false;
    }

    /**
     * A hash code for this day-of-month.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        return this._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this day-of-month as a {@link String}.
     *
     * @return {string} a string representation of this day-of-month, not null
     */
    toString() {
        return `DayOfMonth:${this._day}`;
    }

}

export function _init() {
    /**
     * Cache of singleton instances.
     */
    DayOfMonth.VALUES = new Array(31);
    for (let i = 0; i < 31; i++) {
        DayOfMonth.VALUES[i] = new DayOfMonth(i + 1);
    }
}
