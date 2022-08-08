/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoField, Clock, DateTimeException, IllegalArgumentException, IsoChronology, LocalDate, TemporalAccessor, TemporalQueries, TemporalQuery, UnsupportedTemporalTypeException, Year, ZoneId } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireInstance, requireNonNull } from './assert';
import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * A day-of-year in the ISO-8601 calendar system.
 * 
 * {@link DayOfYear} is an immutable date-time object that represents a day-of-year.
 * It is a type-safe way of representing a day-of-year in an application.
 * Any field that can be derived from a day-of-year can be obtained.
 * 
 * This class does not store or represent a year, month, time or time-zone.
 * For example, the value "51" can be stored in a {@link DayOfYear} and
 * would represent the 51st day of any year.
 */
export class DayOfYear extends TemporalAccessor {
    /**
     * Function overloading for {@link DayOfYear.now}:
     * * if called with no arguments, {@link DayOfYear.now0} is executed;
     * * if called with an instance of {@link ZoneId}, then {@link DayOfYear.nowZoneId} is executed;
     * * if called with an instance of {@link Clock}, then {@link DayOfYear.nowClock} is executed;
     * * otherwise {@link IllegalArgumentException} is thrown.
     * 
     * @param {?(ZoneId|Clock)} zoneIdOrClock
     * @returns {DayOfYear}
     */
    static now(zoneIdOrClock) {
        switch (arguments.length) {
            case 0:
                return DayOfYear.now0();
            case 1:
                requireNonNull(zoneIdOrClock, 'clockOrZone');
                if (zoneIdOrClock instanceof ZoneId) {
                    return DayOfYear.nowZoneId(zoneIdOrClock);
                }
                if (zoneIdOrClock instanceof Clock) {
                    return DayOfYear.nowClock(zoneIdOrClock);
                }
                throw new IllegalArgumentException(`zoneIdOrClock must be an instance of ZoneId or Clock, but is ${zoneIdOrClock.constructor.name}`);
            default:
                throw new IllegalArgumentException(`Invalid number of arguments: ${arguments.length}`);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the current day-of-year from the system clock in the default time-zone.
     * 
     * This will query the {@link Clock.systemDefaultZone} system clock in the default
     * time-zone to obtain the current day-of-year.
     * The zone and offset will be set based on the time-zone in the clock.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return the current day-of-year using the system clock and default time-zone, not null
     * @private
     */
    static now0() {
        return DayOfYear.now(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current day-of-year from the system clock in the specified time-zone.
     * 
     * This will query the {@link Clock.system} system clock to obtain the current day-of-year.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * 
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param zone  the zone ID to use, not null
     * @return the current day-of-year using the system clock, not null
     * @private
     */
    static nowZoneId(zone) {
        return DayOfYear.now(Clock.system(zone));
    }

    /**
     * Obtains the current day-of-year from the specified clock.
     * 
     * This will query the specified clock to obtain the current day-of-year.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock} dependency injection.
     *
     * @param clock  the clock to use, not null
     * @return the current day-of-year, not null
     * @private
     */
    static nowClock(clock) {
        const now = LocalDate.now(clock);  // called once
        return DayOfYear.of(now.dayOfYear());
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link DayOfYear}.
     * 
     * A day-of-year object represents one of the 366 days of the year, from 1 to 366.
     *
     * @param dayOfYear  the day-of-year to represent, from 1 to 366
     * @return the day-of-year, not null
     * @throws {DateTimeException} if the day-of-year is invalid
     */
    static of(dayOfYear) {
        if (1 <= dayOfYear && dayOfYear <= 366) {
            return DayOfYear.VALUES[dayOfYear - 1];
        } else {
            throw new DateTimeException(`Invalid value for DayOfYear: ${dayOfYear}`);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@link DayOfYear} from a date-time object.
     * 
     * This obtains a day-of-year based on the specified temporal.
     * A {@link TemporalAccessor} represents an arbitrary set of date and time information,
     * which this factory converts to an instance of {@link DayOfYear}.
     * 
     * The conversion extracts the {@link ChronoField.DAY_OF_YEAR} day-of-year field.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a {@link LocalDate}.
     * 
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@link DayOfYear.from}.
     *
     * @param temporal  the temporal object to convert, not null
     * @return the day-of-year, not null
     * @throws {DateTimeException} if unable to convert to a {@link DayOfYear}
     */
    static from(temporal) {
        requireNonNull(temporal, 'temporal');
        requireInstance(temporal, TemporalAccessor, 'temporal');
        if (temporal instanceof DayOfYear) {
            return temporal;
        }
        try {
            /* TODO: only IsoChronology for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }*/
            return DayOfYear.of(temporal.get(ChronoField.DAY_OF_YEAR));
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain DayOfYear from TemporalAccessor: ${temporal} of type ${temporal.constructor.name}`, ex);
        }
    }

    
    //-----------------------------------------------------------------------
    /**
     * Constructor, previously validated.
     *
     * @param {number} dayOfYear  the day-of-year being represented, from 1 to 366.
     * @private
     */
    constructor(dayOfYear) {
        super();
        this._day = MathUtil.safeToInt(dayOfYear);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the day-of-year value.
     *
     * @return the day-of-year, from 1 to 366
     */
    value() {
        return this._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the specified field is supported.
     * 
     * This checks if this day-of-year can be queried for the specified field.
     * If false, then calling the {@link DayOfYear.range} range,
     * {@link DayOfYear.get} get and {@link DayOfYear.getLong} getLong
     * methods will throw an exception.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     * 
     * * {@link ChronoField.DAY_OF_YEAR}
     * 
     * All other {@link ChronoField} instances will return false.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.isSupportedBy}
     * passing this as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param field  the field to check, null returns false
     * @return true if the field is supported on this day-of-year, false if not
     */
    isSupported(field) {
        if (field instanceof ChronoField) {
            return field === ChronoField.DAY_OF_YEAR;
        }
        return field != null && field.isSupportedBy(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the range of valid values for the specified field.
     * 
     * The range object expresses the minimum and maximum valid values for a field.
     * This day-of-year is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfYear.isSupported} supported fields will return
     * appropriate range instances.
     * All other {@code ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.rangeRefinedBy}
     * passing this as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param field  the field to query the range for, not null
     * @return the range of valid values for the field, not null
     * @throws {DateTimeException} if the range for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        if (field === ChronoField.DAY_OF_YEAR) {
            return field.range();
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this day-of-year as an `int`.
     * 
     * This queries this day-of-year for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfYear.isSupported} supported fields will return valid
     * values based on this day-of-year.
     * All other {@link ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.getFrom}
     * passing this as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
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
     * Gets the value of the specified field from this day-of-year as a `long`.
     * 
     * This queries this day-of-year for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link DayOfYear.isSupported} supported fields will return valid
     * values based on this day-of-year.
     * All other {@code ChronoField} instances will throw an {@link UnsupportedTemporalTypeException}.
     * 
     * If the field is not a {@link ChronoField}, then the result of this method
     * is obtained by invoking {@link TemporalField.getFrom}
     * passing this as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param field  the field to get, not null
     * @return the value for the field
     * @throws {DateTimeException} if a value for the field cannot be obtained
     * @throws {UnsupportedTemporalTypeException} if the field is not supported
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field === ChronoField.DAY_OF_YEAR) {
            return this._day;
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the year is valid for this day-of-year.
     * 
     * This method checks whether this day-of-yearand the input year form
     * a valid date. This can only return false for day-of-year 366.
     *
     * @param year  the year to validate
     * @return true if the year is valid for this day-of-year
     */
    isValidYear(year) {
        return (this._day < 366 || Year.isLeap(year));
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this day-of-year using the specified query.
     * 
     * This queries this day-of-year using the specified query strategy object.
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
     * Adjusts the specified temporal object to have this day-of-year.
     * 
     * This returns a temporal object of the same observable type as the input
     * with the day-of-year changed to be the same as this.
     * 
     * The adjustment is equivalent to using {@link Temporal.with}
     * passing {@link ChronoField.DAY_OF_YEAR} as the field.
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
     * @param temporal  the target object to be adjusted, not null
     * @return the adjusted object, not null
     * @throws {DateTimeException} if unable to make the adjustment
     * @throws {ArithmeticException} if numeric overflow occurs
     */
    adjustInto(temporal) {
        requireNonNull(temporal, 'temporal');
        /* TODO: only IsoChronology for now
        if (Chronology.from(temporal).equals(IsoChronology.INSTANCE) === false) {
            throw new DateTimeException("Adjustment only supported on ISO date-time");
        }*/
        return temporal.with(ChronoField.DAY_OF_YEAR, this._day);
    }

    //-----------------------------------------------------------------------
    /**
     * Combines this day-of-year with a year to create a {@link LocalDate}.
     * 
     * This returns a {@link LocalDate} formed from this day and the specified year.
     * 
     * This method can be used as part of a chain to produce a date:
     * ```
     *  LocalDate date = day.atYear(year);
     * ```
     * 
     * The day-of-year value 366 is only valid in a leap year.
     *
     * @param year  the year to use ({@link Year} or `int`), not null
     * @return the local date formed from this day and the specified year, not null
     * @throws {DateTimeException} if the year is invalid or this is day 366 and the year is not a leap year
     */
    atYear(year) {
        requireNonNull(year, 'year');
        if (year instanceof Year) {
            return year.atDay(this._day);
        } else {
            return LocalDate.ofYearDay(year, this._day);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this day-of-year to another.
     * 
     * The comparison is based on the value of the day.
     * It is "consistent with equals", as defined by {@link Comparable}.
     *
     * @param other  the other day-of-year instance, not null
     * @return the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, DayOfYear, 'other');
        return this._day - other._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this day-of-year is equal to another day-of-year.
     *
     * @param obj  the other day-of-year instance, null returns false
     * @return true if the day-of-year is the same
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof DayOfYear) {
            return this._day === obj._day;
        }
        return false;
    }

    /**
     * A hash code for this day-of-year.
     *
     * @return a suitable hash code
     */
    hashCode() {
        return this._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this day-of-year as a {@link String}.
     *
     * @return a string representation of this day-of-year, not null
     */
    toString() {
        return `DayOfYear:${this._day}`;
    }
}

export function _init() {
    /**
     * Cache of singleton instances.
     */
    DayOfYear.VALUES = new Array(366);
    for (let i = 0; i < 366; i++) {
        DayOfYear.VALUES[i] = new DayOfYear(i + 1);
    }
}
