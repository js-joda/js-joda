/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {requireNonNull, requireInstance} from './assert';
import {DateTimeException} from './errors';
import {MathUtil} from './MathUtil';

import {ChronoField} from './temporal/ChronoField';
import {Clock} from './Clock';
import {LocalDate} from './LocalDate';
import {Month} from './Month';
import {Temporal} from './temporal/Temporal';
import {ZoneId} from './ZoneId';

/**
 * A month-day in the ISO-8601 calendar system, such as {@code --12-03}.
 * <p>
 * {@code MonthDay} is an immutable date-time object that represents the combination
 * of a year and month. Any field that can be derived from a month and day, such as
 * quarter-of-year, can be obtained.
 * <p>
 * This class does not store or represent a year, time or time-zone.
 * For example, the value "December 3rd" can be stored in a {@code MonthDay}.
 * <p>
 * Since a {@code MonthDay} does not possess a year, the leap day of
 * February 29th is considered valid.
 * <p>
 * This class implements {@link TemporalAccessor} rather than {@link Temporal}.
 * This is because it is not possible to define whether February 29th is valid or not
 * without external information, preventing the implementation of plus/minus.
 * Related to this, {@code MonthDay} only provides access to query and set the fields
 * {@code MONTH_OF_YEAR} and {@code DAY_OF_MONTH}.
 * <p>
 * The ISO-8601 calendar system is the modern civil calendar system used today
 * in most of the world. It is equivalent to the proleptic Gregorian calendar
 * system, in which today's rules for leap years are applied for all time.
 * For most applications written today, the ISO-8601 rules are entirely suitable.
 * However, any application that makes use of historical dates, and requires them
 * to be accurate will find the ISO-8601 approach unsuitable.
 *
 * <h3>Specification for implementors</h3>
 * This class is immutable and thread-safe.
 */
export class MonthDay extends Temporal {
    /**
     * now function overloading
     */
    static now() {
        if (arguments.length === 0) {
            return MonthDay._now0.apply(this, arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof ZoneId) {
            return MonthDay._nowZoneId.apply(this, arguments);
        } else {
            return MonthDay._nowClock.apply(this, arguments);
        }
    }
    /**
     * Obtains the current month-day from the system clock in the default time-zone.
     * <p>
     * This will query the {@link Clock#systemDefaultZone() system clock} in the default
     * time-zone to obtain the current month-day.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {MonthDay} the current month-day using the system clock and default time-zone, not null
     */
    static _now0() {
        return this._nowClock(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current month-day from the system clock in the specified time-zone.
     * <p>
     * This will query the {@link Clock#system(ZoneId) system clock} to obtain the current month-day.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone  the zone ID to use, not null
     * @return {MonthDay} the current month-day using the system clock, not null
     */
    static _nowZoneId(zone) {
        requireNonNull(zone, 'zone');
        return this._nowClock(Clock.system(zone));
    }

    /**
     * Obtains the current month-day from the specified clock.
     * <p>
     * This will query the specified clock to obtain the current month-day.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock dependency injection}.
     *
     * @param {Clock} clock  the clock to use, not null
     * @return {MonthDay} the current month-day, not null
     */
    static _nowClock(clock) {
        requireNonNull(clock, 'clock');
        let now = LocalDate.now(clock);  // called once
        return MonthDay.of(now.month(), now.dayOfMonth());
    }
    //-----------------------------------------------------------------------
    /**
     * of function overloading
     */
    static of() {
        if (arguments.length === 2 && arguments[0] instanceof Month) {
            return MonthDay._ofMonthNumber.apply(this, arguments);
        } else {
            return MonthDay._ofNumberNumber(this, arguments);
        }
    }
    /**
     * Obtains an instance of {@code MonthDay}.
     * <p>
     * The day-of-month must be valid for the month within a leap year.
     * Hence, for February, day 29 is valid.
     * <p>
     * For example, passing in April and day 31 will throw an exception, as
     * there can never be April 31st in any year. By contrast, passing in
     * February 29th is permitted, as that month-day can sometimes be valid.
     *
     * @param {Month} month  the month-of-year to represent, not null
     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
     * @return {MonthDay} the month-day, not null
     * @throws DateTimeException if the value of any field is out of range
     * @throws DateTimeException if the day-of-month is invalid for the month
     */
    static _ofMonthNumber(month, dayOfMonth) {
        requireNonNull(month, 'month');
        ChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
        if (dayOfMonth > month.maxLength()) {
            throw new DateTimeException('Illegal value for DayOfMonth field, value ' + dayOfMonth +
                    ' is not valid for month ' + month.name());
        }
        return new MonthDay(month.value(), dayOfMonth);
    }

    /**
     * Obtains an instance of {@code MonthDay}.
     * <p>
     * The day-of-month must be valid for the month within a leap year.
     * Hence, for month 2 (February), day 29 is valid.
     * <p>
     * For example, passing in month 4 (April) and day 31 will throw an exception, as
     * there can never be April 31st in any year. By contrast, passing in
     * February 29th is permitted, as that month-day can sometimes be valid.
     *
     * @param {number} month  the month-of-year to represent, from 1 (January) to 12 (December)
     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
     * @return {MonthDay} the month-day, not null
     * @throws DateTimeException if the value of any field is out of range
     * @throws DateTimeException if the day-of-month is invalid for the month
     */
    static _ofNumberNumber(month, dayOfMonth) {
        return MonthDay.of(Month.of(month), dayOfMonth);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor, previously validated.
     *
     * @param {number} month  the month-of-year to represent, validated from 1 to 12
     * @param {number} dayOfMonth  the day-of-month to represent, validated from 1 to 29-31
     */
    constructor(month, dayOfMonth) {
        super();
        this._month = month;
        this._day = dayOfMonth;
    }
    
    //-----------------------------------------------------------------------
    /**
     * Gets the month-of-year field from 1 to 12.
     * <p>
     * This method returns the month as an {@code int} from 1 to 12.
     * Application code is frequently clearer if the enum {@link Month}
     * is used by calling {@link #getMonth()}.
     *
     * @return {number} the month-of-year, from 1 to 12
     * @see #month()
     */
    monthValue() {
        return this._month;
    }

    /**
     * Gets the month-of-year field using the {@code Month} enum.
     * <p>
     * This method returns the enum {@link Month} for the month.
     * This avoids confusion as to what {@code int} values mean.
     * If you need access to the primitive {@code int} value then the enum
     * provides the {@link Month#getValue() int value}.
     *
     * @return {Month} the month-of-year, not null
     * @see #getMonthValue()
     */
    month() {
        return Month.of(this._month);
    }

    /**
     * Gets the day-of-month field.
     * <p>
     * This method returns the primitive {@code int} value for the day-of-month.
     *
     * @return {number} the day-of-month, from 1 to 31
     */
    dayOfMonth() {
        return this._day;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this month-day is equal to another month-day.
     * <p>
     * The comparison is based on the time-line position of the month-day within a year.
     *
     * @param {*} obj  the object to check, null returns false
     * @return {boolean} true if this is equal to the other month-day
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof MonthDay) {
            let other = obj;
            return this.monthValue() === other.monthValue() && this.dayOfMonth() === other.dayOfMonth();
        }
        return false;
    }


}

export function _init() {
}
