/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {requireNonNull, requireInstance} from './assert';
import {DateTimeException, UnsupportedTemporalTypeException} from './errors';

import {ChronoField} from './temporal/ChronoField';
import {Clock} from './Clock';
import {DateTimeFormatterBuilder} from './format/DateTimeFormatterBuilder';
import {LocalDate} from './LocalDate';
import {Month} from './Month';
import {SignStyle} from './format/SignStyle';
import {Temporal} from './temporal/Temporal';
import {createTemporalQuery} from './temporal/TemporalQuery';
import {ZoneId} from './ZoneId';

/**
 * A year-month in the ISO-8601 calendar system, such as {@code 2007-12}.
 * <p>
 * {@code YearMonth} is an immutable date-time object that represents the combination
 * of a year and month. Any field that can be derived from a year and month, such as
 * quarter-of-year, can be obtained.
 * <p>
 * This class does not store or represent a day, time or time-zone.
 * For example, the value "October 2007" can be stored in a {@code YearMonth}.
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
export class YearMonth extends Temporal {
    //-----------------------------------------------------------------------
    /**
     * now function overloading
     */
    static now() {
        if (arguments.length === 0) {
            return YearMonth._now0.apply(this, arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof ZoneId) {
            return YearMonth._nowZoneId.apply(this, arguments);
        } else {
            return YearMonth._nowClock.apply(this, arguments);
        }
    }

    /**
     * Obtains the current year-month from the system clock in the default time-zone.
     * <p>
     * This will query the {@link Clock#systemDefaultZone() system clock} in the default
     * time-zone to obtain the current year-month.
     * The zone and offset will be set based on the time-zone in the clock.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {YearMonth} the current year-month using the system clock and default time-zone, not null
     */
    static _now0() {
        return YearMonth._nowClock(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current year-month from the system clock in the specified time-zone.
     * <p>
     * This will query the {@link Clock#system(ZoneId) system clock} to obtain the current year-month.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone  the zone ID to use, not null
     * @return {YearMonth} the current year-month using the system clock, not null
     */
    static _nowZoneId(zone) {
        return YearMonth._nowClock(Clock.system(zone));
    }

    /**
     * Obtains the current year-month from the specified clock.
     * <p>
     * This will query the specified clock to obtain the current year-month.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock dependency injection}.
     *
     * @param {Clock} clock  the clock to use, not null
     * @return {YearMonth} the current year-month, not null
     */
    static _nowClock(clock) {
        let now = LocalDate.now(clock);
        return YearMonth.of(now.year(), now.month());
    }

    //-----------------------------------------------------------------------
    /**
     * of function overloading
     */
    static of() {
        if (arguments.length === 2 && arguments[1] instanceof Month) {
            return YearMonth._ofYearMonth.apply(this, arguments);
        } else {
            return YearMonth._ofYearMonthNumber.apply(this, arguments);
        }
    }

    /**
     * Obtains an instance of {@code YearMonth} from a year and month.
     *
     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {Month} month  the month-of-year to represent, not null
     * @return {YearMonth} the year-month, not null
     * @throws DateTimeException if the year value is invalid
     */
    static _ofYearMonth(year, month) {
        requireNonNull(month, 'month');
        requireInstance(month, Month, 'month');
        return YearMonth._ofYearMonthNumber(year, month.value());
    }

    /**
     * Obtains an instance of {@code YearMonth} from a year and month.
     *
     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {number} month  the month-of-year to represent, from 1 (January) to 12 (December)
     * @return {YearMonth} the year-month, not null
     * @throws DateTimeException if either field value is invalid
     */
    static _ofYearMonthNumber(year, month) {
        requireNonNull(year, 'year');
        requireNonNull(month, 'month');
        ChronoField.YEAR.checkValidValue(year);
        ChronoField.MONTH_OF_YEAR.checkValidValue(month);
        return new YearMonth(year, month);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code YearMonth} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code YearMonth}.
     * <p>
     * The conversion extracts the {@link ChronoField#YEAR YEAR} and
     * {@link ChronoField#MONTH_OF_YEAR MONTH_OF_YEAR} fields.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a {@code LocalDate}.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@code YearMonth::from}.
     *
     * @param {TemporalAccessor} temporal  the temporal object to convert, not null
     * @return {YearMonth} the year-month, not null
     * @throws DateTimeException if unable to convert to a {@code YearMonth}
     */
    static from(temporal) {
        requireNonNull(temporal, 'temporal');
        if (temporal instanceof YearMonth) {
            return temporal;
        }
        try {
            /* TODO: only IsoChronology for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }*/
            return YearMonth.of(temporal.get(ChronoField.YEAR), temporal.get(ChronoField.MONTH_OF_YEAR));
        } catch (ex) {
            throw new DateTimeException('Unable to obtain YearMonth from TemporalAccessor: ' +
                    temporal + ', type ' + (temporal && temporal.constructor != null ? temporal.constructor.name : ''));
        }
    }
    //-----------------------------------------------------------------------
    /**
     * parse function overloading
     */
    static parse() {
        if (arguments.length === 1) {
            return YearMonth._parseString.apply(this, arguments);
        } else {
            return YearMonth._parseStringFormatter.apply(this, arguments);
        }
    }

    /**
     * Obtains an instance of {@code YearMonth} from a text string such as {@code 2007-12}.
     * <p>
     * The string must represent a valid year-month.
     * The format must be {@code yyyy-MM}.
     * Years outside the range 0000 to 9999 must be prefixed by the plus or minus symbol.
     *
     * @param {String} text  the text to parse such as "2007-12", not null
     * @return {YearMonth} the parsed year-month, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static _parseString(text) {
        return YearMonth._parseStringFormatter(text, PARSER);
    }

    /**
     * Obtains an instance of {@code YearMonth} from a text string using a specific formatter.
     * <p>
     * The text is parsed using the formatter, returning a year-month.
     *
     * @param {String} text  the text to parse, not null
     * @param {DateTimeFormatter} formatter  the formatter to use, not null
     * @return the parsed year-month, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static _parseStringFormatter(text, formatter) {
        requireNonNull(formatter, 'formatter');
        return formatter.parse(text, YearMonth.FROM);
    }


    /**
     * Constructor.
     *
     * @param {number} year  the year to represent, validated from MIN_YEAR to MAX_YEAR
     * @param {number} month  the month-of-year to represent, validated from 1 (January) to 12 (December)
     */
    constructor(year, month) {
        super();
        this._year = year;
        this._month = month;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the year field.
     * <p>
     * This method returns the primitive {@code int} value for the year.
     * <p>
     * The year returned by this method is proleptic as per {@code get(YEAR)}.
     *
     * @return {number} the year, from MIN_YEAR to MAX_YEAR
     */
    year() {
        return this._year;
    }

    /**
     * Gets the month-of-year field from 1 to 12.
     * <p>
     * This method returns the month as an {@code int} from 1 to 12.
     * Application code is frequently clearer if the enum {@link Month}
     * is used by calling {@link #getMonth()}.
     *
     * @return {number} the month-of-year, from 1 to 12
     * @see #getMonth()
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
     */
    month() {
        return Month.of(this._month);
    }
    //-----------------------------------------------------------------------
    /**
     * Checks if this year-month is equal to another year-month.
     * <p>
     * The comparison is based on the time-line position of the year-months.
     *
     * @param {*} obj  the object to check, null returns false
     * @return {boolean} true if this is equal to the other year-month
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof YearMonth) {
            let other = obj;
            return this.year() === other.year() && this.monthValue() === other.monthValue();
        }
        return false;
    }


}

var PARSER;

export function _init() {
    
    PARSER = new DateTimeFormatterBuilder()
        .appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
        .appendLiteral('-')
        .appendValue(ChronoField.MONTH_OF_YEAR, 2)
        .toFormatter();

    YearMonth.FROM = createTemporalQuery('YearMonth.FROM', (temporal) => {
        return YearMonth.from(temporal);
    });
}