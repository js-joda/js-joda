/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {assert} from './assert';

import { MathUtil } from './MathUtil';
import {DateTimeException, UnsupportedTemporalTypeException, NullPointerException} from './errors';

import { IsoChronology } from './chrono/IsoChronology';
import {ChronoField} from './temporal/ChronoField';
import {ChronoLocalDate} from './chrono/ChronoLocalDate';
import {TemporalQueries, createTemporalQuery} from './temporal/TemporalQueries';
import {DateTimeFormatter} from './format/DateTimeFormatter';

import {Clock} from './Clock';
import {Month} from './Month';
import {Year} from './Year';
import {LocalTime} from './LocalTime';

import './temporal/TemporalQueriesPattern';

/**
 * The number of days in a 400 year cycle.
 */
const  DAYS_PER_CYCLE = 146097;


  /**
   * The number of days from year zero to year 1970.
   * There are five 400 year cycles from year zero to 2000.
   * There are 7 leap years from 1970 to 2000.
   */
const  DAYS_0000_TO_1970 = (DAYS_PER_CYCLE * 5) - (30 * 365 + 7);

/**
 * A date without a time-zone in the ISO-8601 calendar system,
 * such as 2007-12-03.
 *
 * LocalDate is an immutable date-time object that represents a date,
 * often viewed as year-month-day. Other date fields, such as day-of-year,
 * day-of-week and week-of-year, can also be accessed.
 * For example, the value "2nd October 2007" can be stored in a LocalDate.
 *
 * This class does not store or represent a time or time-zone.
 * Instead, it is a description of the date, as used for birthdays.
 * It cannot represent an instant on the time-line without additional information
 * such as an offset or time-zone.
 */

export class LocalDate extends ChronoLocalDate{

    /**
     * Obtains the current date from the system clock in the default time-zone or
     * if specified, the current date from the specified clock.
     *
     * This will query the specified clock to obtain the current date - today.
     * Using this method allows the use of an alternate clock for testing.
     *
     * @param clock  the clock to use, if null, the system clock and default time-zone is used.
     * @return the current date, not null
     */
    static now(clock = Clock.systemDefaultZone()) {
        assert(clock != null, 'clock', NullPointerException);
        var now = clock.instant();
        var offset = clock.offset(now);
        var epochSec = now.epochSecond() + offset.totalSeconds();
        var epochDay = MathUtil.floorDiv(epochSec, LocalTime.SECONDS_PER_DAY);
        return LocalDate.ofEpochDay(epochDay);
    }

    /**
     * Obtains an instance of {@code LocalDate} from a year, month and day.
     * <p>
     * This returns a {@code LocalDate} with the specified year, month and day-of-month.
     * The day must be valid for the year and month, otherwise an exception will be thrown.
     *
     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {Month, number} month  the month-of-year to represent, from 1 (January) to 12 (December)
     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
     * @return LocalDate the local date, not null
     * @throws DateTimeException if the value of any field is out of range,
     *  or if the day-of-month is invalid for the month-year
     */
    static of(year, month, dayOfMonth) {
        return new LocalDate(year, month, dayOfMonth);
    }

    /**
     * Obtains an instance of {@code LocalDate} from a year and day-of-year.
     * <p>
     * This returns a {@code LocalDate} with the specified year and day-of-year.
     * The day-of-year must be valid for the year, otherwise an exception will be thrown.
     *
     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {number} dayOfYear  the day-of-year to represent, from 1 to 366
     * @return LocalDate the local date, not null
     * @throws DateTimeException if the value of any field is out of range,
     *  or if the day-of-year is invalid for the year
     */
    static ofYearDay(year, dayOfYear) {
        ChronoField.YEAR.checkValidValue(year);
        //TODO: ChronoField.DAY_OF_YEAR.checkValidValue(dayOfYear);
        var leap = IsoChronology.isLeapYear(year);
        if (dayOfYear === 366 && leap === false) {
            assert(false, 'Invalid date \'DayOfYear 366\' as \'' + year + '\' is not a leap year', DateTimeException);
        }
        var moy = Month.of(Math.floor((dayOfYear - 1) / 31 + 1));
        var monthEnd = moy.firstDayOfYear(leap) + moy.length(leap) - 1;
        if (dayOfYear > monthEnd) {
            moy = moy.plus(1);
        }
        var dom = dayOfYear - moy.firstDayOfYear(leap) + 1;
        return new LocalDate(year, moy.value(), dom);
    }

    /**
     * Obtains an instance of LocalDate from the epoch day count.
     *
     * This returns a LocalDate with the specified epoch-day.
     * The {@link ChronoField#EPOCH_DAY EPOCH_DAY} is a simple incrementing count
     * of days where day 0 is 1970-01-01. Negative numbers represent earlier days.
     *
     * @param {number} epochDay - the Epoch Day to convert, based on the epoch 1970-01-01
     * @return {LocalDate} the local date, not null
     * @throws AssertionError if the epoch days exceeds the supported date range
     */
    static ofEpochDay(epochDay) {
        var adjust, adjustCycles, dom, doyEst, marchDoy0, marchMonth0, month, year, yearEst, zeroDay;
        zeroDay = epochDay + DAYS_0000_TO_1970;
        zeroDay -= 60;
        adjust = 0;
        if (zeroDay < 0) {
            adjustCycles = MathUtil.intDiv(zeroDay + 1, DAYS_PER_CYCLE) - 1;
            adjust = adjustCycles * 400;
            zeroDay += -adjustCycles * DAYS_PER_CYCLE;
        }
        yearEst = MathUtil.intDiv(400 * zeroDay + 591, DAYS_PER_CYCLE);
        doyEst = zeroDay - (365 * yearEst + MathUtil.intDiv(yearEst, 4) - MathUtil.intDiv(yearEst, 100) + MathUtil.intDiv(yearEst, 400));
        if (doyEst < 0) {
            yearEst--;
            doyEst = zeroDay - (365 * yearEst + MathUtil.intDiv(yearEst, 4) - MathUtil.intDiv(yearEst, 100) + MathUtil.intDiv(yearEst, 400));
        }
        yearEst += adjust;
        marchDoy0 = doyEst;
        marchMonth0 = MathUtil.intDiv(marchDoy0 * 5 + 2, 153);
        month = (marchMonth0 + 2) % 12 + 1;
        dom = marchDoy0 - MathUtil.intDiv(marchMonth0 * 306 + 5, 10) + 1;
        yearEst += MathUtil.intDiv(marchMonth0, 10);
        year = yearEst;
        return new LocalDate(year, month, dom);
    }

    /**
     * Obtains an instance of {@code LocalDate} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code LocalDate}.
     * <p>
     * The conversion uses the {@link TemporalQueries#localDate()} query, which relies
     * on extracting the {@link ChronoField#EPOCH_DAY EPOCH_DAY} field.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used as a query via method reference, {@code LocalDate::from}.
     *
     * @param temporal  the temporal object to convert, not null
     * @return the local date, not null
     * @throws DateTimeException if unable to convert to a {@code LocalDate}
     */
    static from(temporal) {
        assert(temporal != null, '', NullPointerException);
        var date = temporal.query(TemporalQueries.localDate());
        if (date == null) {
            throw new DateTimeException(
                `Unable to obtain LocalDate from TemporalAccessor: ${temporal}, type ${temporal.constructor != null ? temporal.constructor.name : ''}`);
        }
        return date;
    }

    /**
     * Obtains an instance of {@code LocalDate} from a text string using a specific formatter.
     *
     * The text is parsed using the formatter, returning a date.
     *
     * @param text  the text to parse, not null
     * @param formatter  the formatter to use, default is DateTimeFormatter.ISO_LOCAL_DATE
     * @return the parsed local date, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static parse(text, formatter = DateTimeFormatter.ISO_LOCAL_DATE()){
        assert(formatter != null, 'formatter', NullPointerException);
        return formatter.parse(text, LocalDate.FROM);
    }

    /**
     * Resolves the date, resolving days past the end of month.
     *
     * @param year  the year to represent, validated from MIN_YEAR to MAX_YEAR
     * @param month  the month-of-year to represent, validated from 1 to 12
     * @param day  the day-of-month to represent, validated from 1 to 31
     * @return LocalDate resolved date, not null
     */
    static _resolvePreviousValid(year, month, day) {
        switch (month) {
            case 2:
                day = Math.min(day, IsoChronology.isLeapYear(year) ? 29 : 28);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                day = Math.min(day, 30);
                break;
        }
        return LocalDate.of(year, month, day);
    }

    /**
     *
     * @param {number} year
     * @param {Month, number} month
     * @param {number} dayOfMonth
     */
    constructor(year, month, dayOfMonth){
        super();
        if (month instanceof Month) {
            month = month.value();
        }
        LocalDate._validate(year, month, dayOfMonth);
        this._year = year;
        this._month = month;
        this._day = dayOfMonth;
    }

    /**
      * @private
      */
    static _validate(year, month, dayOfMonth) {
        var dom;
        ChronoField.YEAR.checkValidValue(year);
        ChronoField.MONTH_OF_YEAR.checkValidValue(month);
        ChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
        if (dayOfMonth > 28) {
            dom = 31;
            switch (month) {
                case 2:
                    dom = IsoChronology.isLeapYear(year) ? 29 : 28;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    dom = 30;
            }
            if (dayOfMonth > dom) {
                if (dayOfMonth === 29) {
                    assert(false, 'Invalid date \'February 29\' as \'' + year + '\' is not a leap year', DateTimeException);
                } else {
                    assert(false, 'Invalid date \'' + year + '\' \'' + month + '\' \'' + dayOfMonth + '\'', DateTimeException);
                }
            }
        }
    }

    /**
     * Checks if the specified field is supported.
     * <p>
     * This checks if this date can be queried for the specified field.
     * If false, then calling the {@link #range(TemporalField) range} and
     * {@link #get(TemporalField) get} methods will throw an exception.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this date-time.
     * The supported fields are:
     * <ul>
     * <li>{@code DAY_OF_WEEK}
     * <li>{@code ALIGNED_DAY_OF_WEEK_IN_MONTH}
     * <li>{@code ALIGNED_DAY_OF_WEEK_IN_YEAR}
     * <li>{@code DAY_OF_MONTH}
     * <li>{@code DAY_OF_YEAR}
     * <li>{@code EPOCH_DAY}
     * <li>{@code ALIGNED_WEEK_OF_MONTH}
     * <li>{@code ALIGNED_WEEK_OF_YEAR}
     * <li>{@code MONTH_OF_YEAR}
     * <li>{@code EPOCH_MONTH}
     * <li>{@code YEAR_OF_ERA}
     * <li>{@code YEAR}
     * <li>{@code ERA}
     * </ul>
     * All other {@code ChronoField} instances will return false.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param field  the field to check, null returns false
     * @return true if the field is supported on this date, false if not
     */
    isSupported(field) {
        return super.isSupported(field);
    }

    get(field) {
        return this.getLong(field);
    }

    getLong(field) {
        assert(field != null, '', NullPointerException);
        if (field instanceof ChronoField) {
            return this._get0(field);
        }
        return field.getFrom(this);
    }

    _get0(field) {
        switch (field) {
            // case ChronoField.DAY_OF_WEEK: return this.dayOfWeek().getValue();
            // case ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH: return ((day - 1) % 7) + 1;
            // case ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR: return ((this.dayOfYear() - 1) % 7) + 1;
            case ChronoField.DAY_OF_MONTH: return this._day;
            // case ChronoField.DAY_OF_YEAR: return this.dayOfYear();
            case ChronoField.EPOCH_DAY: return this.toEpochDay();
            // case ChronoField.ALIGNED_WEEK_OF_MONTH: return ((this._day - 1) / 7) + 1;
            // case ChronoField.ALIGNED_WEEK_OF_YEAR: return ((this.dayOfYear() - 1) / 7) + 1;
            case ChronoField.MONTH_OF_YEAR: return this._month;
            // case ChronoField.PROLEPTIC_MONTH: this.prolepticMonth();
            // case ChronoField.YEAR_OF_ERA: return (this._year >= 1 ? this._year : 1 - this._year);
            case ChronoField.YEAR: return this._year;
            // case ChronoField.ERA: return (this._year >= 1 ? 1 : 0);
        }
        throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
    }

    /**
     * Gets the chronology of this date, which is the ISO calendar system.
     * <p>
     * The {@code Chronology} represents the calendar system in use.
     * The ISO-8601 calendar system is the modern civil calendar system used today
     * in most of the world. It is equivalent to the proleptic Gregorian calendar
     * system, in which todays's rules for leap years are applied for all time.
     *
     * @return the ISO chronology, not null
     */
    chronology() {
        return IsoChronology.INSTANCE;
    }

    /**
     *
     * @return {number} gets the year
     */
    year() {
        return this._year;
    }

    /**
     *
     * @return {number} gets the month
     */
    monthValue() {
        return this._month;
    }
    
    month() {
        return Month.of(this._month);
    }

    /**
     *
     * @return {number} gets the day of month
     */
    dayOfMonth() {
        return this._day;
    }

    /**
      * Gets the day-of-year field.
      * <p>
      * This method returns the primitive {@code int} value for the day-of-year.
      *
      * @return the day-of-year, from 1 to 365, or 366 in a leap year
      */
    dayOfYear() {
        return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
    }

    /**
     * Checks if the year is a leap year, according to the ISO proleptic
     * calendar system rules.
     * <p>
     * This method applies the current rules for leap years across the whole time-line.
     * In general, a year is a leap year if it is divisible by four without
     * remainder. However, years divisible by 100, are not leap years, with
     * the exception of years divisible by 400 which are.
     * <p>
     * For example, 1904 is a leap year it is divisible by 4.
     * 1900 was not a leap year as it is divisible by 100, however 2000 was a
     * leap year as it is divisible by 400.
     * <p>
     * The calculation is proleptic - applying the same rules into the far future and far past.
     * This is historically inaccurate, but is correct for the ISO-8601 standard.
     *
     * @return true if the year is leap, false otherwise
     */
    isLeapYear() {
        return IsoChronology.isLeapYear(this._year);
    }

    /**
     * Returns the length of the month represented by this date.
     * <p>
     * This returns the length of the month in days.
     * For example, a date in January would return 31.
     *
     * @return the length of the month in days
     */
    lengthOfMonth() {
        switch (this._month) {
            case 2:
                return (this.isLeapYear() ? 29 : 28);
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            default:
                return 31;
        }
    }

    /**
     * Returns the length of the year represented by this date.
     * <p>
     * This returns the length of the year in days, either 365 or 366.
     *
     * @return 366 if the year is leap, 365 otherwise
     */
    lengthOfYear() {
        return (this.isLeapYear() ? 366 : 365);
    }

    /**
     * Returns a copy of this date with the year altered.
     * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param year  the year to set in the result, from MIN_YEAR to MAX_YEAR
     * @return a {@code LocalDate} based on this date with the requested year, not null
     * @throws DateTimeException if the year value is invalid
     */
    withYear(year) {
        if (this._year === year) {
            return this;
        }
        ChronoField.YEAR.checkValidValue(year);
        return LocalDate._resolvePreviousValid(year, this._month, this._day);
    }

    /**
     * Returns a copy of this date with the month-of-year altered.
     * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param month  the month-of-year to set in the result, from 1 (January) to 12 (December)
     * @return a {@code LocalDate} based on this date with the requested month, not null
     * @throws DateTimeException if the month-of-year value is invalid
     */
    withMonth(month) {
        var m = (month instanceof Month) ? month.value() : month;
        if (this._month === m) {
            return this;
        }
        ChronoField.MONTH_OF_YEAR.checkValidValue(m);
        return LocalDate._resolvePreviousValid(this._year, m, this._day);
    }

    /**
     * Returns a copy of this {@code LocalDate} with the day-of-month altered.
     * <p>
     * If the resulting date is invalid, an exception is thrown.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} dayOfMonth  the day-of-month to set in the result, from 1 to 28-31
     * @return {LocalDate} based on this date with the requested day, not null
     * @throws DateTimeException if the day-of-month value is invalid,
     *  or if the day-of-month is invalid for the month-year
     */
    withDayOfMonth(dayOfMonth) {
        if (this._day === dayOfMonth) {
            return this;
        }
        return LocalDate.of(this._year, this._month, dayOfMonth);
    }

    /**
     * Returns a copy of this date with the day-of-year altered.
     * If the resulting date is invalid, an exception is thrown.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param dayOfYear  the day-of-year to set in the result, from 1 to 365-366
     * @return a {@code LocalDate} based on this date with the requested day, not null
     * @throws DateTimeException if the day-of-year value is invalid
     * @throws DateTimeException if the day-of-year is invalid for the year
     */
    withDayOfYear(dayOfYear) {
        if (this.dayOfYear() === dayOfYear) {
            return this;
        }
        return LocalDate.ofYearDay(this._year, dayOfYear);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code LocalDate} with the specified period in years added.
     * <p>
     * This method adds the specified amount to the years field in three steps:
     * <ol>
     * <li>Add the input years to the year field</li>
     * <li>Check if the resulting date would be invalid</li>
     * <li>Adjust the day-of-month to the last valid day if necessary</li>
     * </ol>
     * <p>
     * For example, 2008-02-29 (leap year) plus one year would result in the
     * invalid date 2009-02-29 (standard year). Instead of returning an invalid
     * result, the last valid day of the month, 2009-02-28, is selected instead.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param yearsToAdd  the years to add, may be negative
     * @return a {@code LocalDate} based on this date with the years added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusYears(yearsToAdd) {
        if (yearsToAdd === 0) {
            return this;
        }
        var newYear = ChronoField.YEAR.checkValidIntValue(this._year + yearsToAdd);  // safe overflow
        return LocalDate._resolvePreviousValid(newYear, this._month, this._day);
    }

    /**
     * Returns a copy of this {@code LocalDate} with the specified period in months added.
     * <p>
     * This method adds the specified amount to the months field in three steps:
     * <ol>
     * <li>Add the input months to the month-of-year field</li>
     * <li>Check if the resulting date would be invalid</li>
     * <li>Adjust the day-of-month to the last valid day if necessary</li>
     * </ol>
     * <p>
     * For example, 2007-03-31 plus one month would result in the invalid date
     * 2007-04-31. Instead of returning an invalid result, the last valid day
     * of the month, 2007-04-30, is selected instead.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param monthsToAdd  the months to add, may be negative
     * @return a {@code LocalDate} based on this date with the months added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusMonths(monthsToAdd) {
        if (monthsToAdd === 0) {
            return this;
        }
        var monthCount = this._year * 12 + (this._month - 1);
        var calcMonths = monthCount + monthsToAdd;  // safe overflow
        var newYear = ChronoField.YEAR.checkValidIntValue(MathUtil.floorDiv(calcMonths, 12));
        var newMonth = MathUtil.floorMod(calcMonths, 12) + 1;
        return LocalDate._resolvePreviousValid(newYear, newMonth, this._day);
    }

    /**
     * Returns a copy of this {@code LocalDate} with the specified period in weeks added.
     * <p>
     * This method adds the specified amount in weeks to the days field incrementing
     * the month and year fields as necessary to ensure the result remains valid.
     * The result is only invalid if the maximum/minimum year is exceeded.
     * <p>
     * For example, 2008-12-31 plus one week would result in 2009-01-07.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param weeksToAdd  the weeks to add, may be negative
     * @return a {@code LocalDate} based on this date with the weeks added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusWeeks(weeksToAdd) {
        return this.plusDays(MathUtil.safeMultiply(weeksToAdd, 7));
    }


    /**
     * Returns a copy of this LocalDate with the specified number of days added.
     * 
     * This method adds the specified amount to the days field incrementing the
     * month and year fields as necessary to ensure the result remains valid.
     * The result is only invalid if the maximum/minimum year is exceeded.
     * 
     * For example, 2008-12-31 plus one day would result in 2009-01-01.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} daysToAdd - the days to add, may be negative
     * @return {LocalDate} a LocalDate based on this date with the days added, not null
     * @throws AssertionError if the result exceeds the supported date range
     */
    plusDays(daysToAdd) {
        if (daysToAdd === 0) {
            return this;
        }
        var mjDay = MathUtil.safeAdd(this.toEpochDay(), daysToAdd);
        return LocalDate.ofEpochDay(mjDay);
    }

    /*
     * Returns a copy of this LocalDate with the specified number of days subtracted.
     * 
     * This method subtracts the specified amount from the days field decrementing the
     * month and year fields as necessary to ensure the result remains valid.
     * The result is only invalid if the maximum/minimum year is exceeded.
     * 
     * For example, 2009-01-01 minus one day would result in 2008-12-31.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} daysToSubtract - the days to subtract, may be negative
     * @return {LocalDate} a LocalDate based on this date with the days subtracted, not null
     * @throws AssertionError if the result exceeds the supported date range
     */
    minusDays(daysToSubtract) {
        return this.plusDays(daysToSubtract * -1);
    }

    /**
     * Queries this date using the specified query.
     *
     * This queries this date using the specified query strategy object.
     * The {@code TemporalQuery} object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     *
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
     * specified query passing {@code this} as the argument.
     *
     * @param query  the query to invoke, not null
     * @return the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query (defined by the query)
     * @throws ArithmeticException if numeric overflow occurs (defined by the query)
     */
    query(query) {
        assert(query != null, '', NullPointerException);
        if (query === TemporalQueries.localDate()) {
            return this;
        }
        return super.query(query);
    }

    /**
     * Converts this date to the Epoch Day.
     *
     * The Epoch Day count is a simple incrementing count of days where day 0 is 1970-01-01 (ISO).
     * This definition is the same for all chronologies, enabling conversion.
     *
     * @return {number} the Epoch Day equivalent to this date
     */
    toEpochDay() {
        var y = this.year();
        var m = this.monthValue();
        var total = 0;
        total += 365 * y;
        if (y >= 0) {
            total += MathUtil.intDiv(y + 3, 4) - MathUtil.intDiv(y + 99, 100) + MathUtil.intDiv(y + 399, 400);
        } else {
            total -= MathUtil.intDiv(y, -4) - MathUtil.intDiv(y, -100) + MathUtil.intDiv(y, -400);
        }
        total += MathUtil.intDiv(367 * m - 362, 12);
        total += this.dayOfMonth() - 1;
        if (m > 2) {
            total--;
            if (!IsoChronology.isLeapYear(y)) {
                total--;
            }
        }
        return total - DAYS_0000_TO_1970;
    }

    /**
     * Compares this date to another date.
     * <p>
     * The comparison is primarily based on the date, from earliest to latest.
     * It is "consistent with equals", as defined by {@link Comparable}.
     * <p>
     * If all the dates being compared are instances of {@code LocalDate},
     * then the comparison will be entirely based on the date.
     * If some dates being compared are in different chronologies, then the
     * chronology is also considered, see {@link ChronoLocalDate#compareTo}.
     *
     * @param other  the other date to compare to, not null
     * @return the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        assert(other != null, 'other', NullPointerException);
        if (other instanceof LocalDate) {
            return this._compareTo0(other);
        }
        throw new DateTimeException(`illegal argument for compareTo(): ${other}`); // super.compareTo(other);
    }

    _compareTo0(otherDate) {
        var cmp = (this._year - otherDate._year);
        if (cmp === 0) {
            cmp = (this._month - otherDate._month);
            if (cmp === 0) {
                cmp = (this._day - otherDate._day);
            }
        }
        return cmp;
    }

    /**
     * Checks if this date is after the specified date.
     * <p>
     * This checks to see if this date represents a point on the
     * local time-line after the other date.
     * <pre>
     *   LocalDate a = LocalDate.of(2012, 6, 30);
     *   LocalDate b = LocalDate.of(2012, 7, 1);
     *   a.isAfter(b) == false
     *   a.isAfter(a) == false
     *   b.isAfter(a) == true
     * </pre>
     * <p>
     * This method only considers the position of the two dates on the local time-line.
     * It does not take into account the chronology, or calendar system.
     * This is different from the comparison in {@link #compareTo(ChronoLocalDate)},
     * but is the same approach as {@link #DATE_COMPARATOR}.
     *
     * @param other  the other date to compare to, not null
     * @return true if this date is after the specified date
     */
    isAfter(other) {
        return this.compareTo(other) > 0;
        // return super.isAfter(other) if not instanceof LocalDate
    }

    /**
     * Checks if this date is before the specified date.
     * <p>
     * This checks to see if this date represents a point on the
     * local time-line before the other date.
     * <pre>
     *   LocalDate a = LocalDate.of(2012, 6, 30);
     *   LocalDate b = LocalDate.of(2012, 7, 1);
     *   a.isBefore(b) == true
     *   a.isBefore(a) == false
     *   b.isBefore(a) == false
     * </pre>
     * <p>
     * This method only considers the position of the two dates on the local time-line.
     * It does not take into account the chronology, or calendar system.
     * This is different from the comparison in {@link #compareTo(ChronoLocalDate)},
     * but is the same approach as {@link #DATE_COMPARATOR}.
     *
     * @param other  the other date to compare to, not null
     * @return true if this date is before the specified date
     */
    isBefore(other) {
        return this.compareTo(other) < 0;
        // return super.isBefore(other) if not instanceof LocalDate
    }

    /**
     * Checks if this date is equal to the specified date.
     * <p>
     * This checks to see if this date represents the same point on the
     * local time-line as the other date.
     * <pre>
     *   LocalDate a = LocalDate.of(2012, 6, 30);
     *   LocalDate b = LocalDate.of(2012, 7, 1);
     *   a.isEqual(b) == false
     *   a.isEqual(a) == true
     *   b.isEqual(a) == false
     * </pre>
     * <p>
     * This method only considers the position of the two dates on the local time-line.
     * It does not take into account the chronology, or calendar system.
     * This is different from the comparison in {@link #compareTo(ChronoLocalDate)}
     * but is the same approach as {@link #DATE_COMPARATOR}.
     *
     * @param other  the other date to compare to, not null
     * @return true if this date is equal to the specified date
     */
    isEqual(other) {
        return this.compareTo(other) === 0;
        // return super.isEqual(other) if not instanceof LocalDate
    }

    /**
     * Checks if this date is equal to another date.
     *
     * Compares this LocalDate with another ensuring that the date is the same.
     *
     * Only objects of type LocalDate are compared, other types return false.
     *
     * @param otherDate  the object to check, null returns false
     * @return true if this is equal to the other date
     */
    equals(otherDate) {
        if (this === otherDate) {
            return true;
        }
        if (otherDate instanceof LocalDate) {
            return this._compareTo0(otherDate) === 0;
        }
        return false;
    }

    /**
     * A hash code for this date.
     *
     * @return a suitable hash code
     */
    hashCode() {
        var yearValue = this._year;
        var monthValue = this._month;
        var dayValue = this._day;
        return (yearValue & 0xFFFFF800) ^ ((yearValue << 11) + (monthValue << 6) + (dayValue));
    }

    /**
     * Outputs this date as a String, such as 2007-12-03.
     * The output will be in the ISO-8601 format uuuu-MM-dd.
     *
     * @return {string} a string representation of this date, not null
     */
    toString() {
        var dayString, monthString, yearString;

        var yearValue = this.year();
        var monthValue = this.monthValue();
        var dayValue = this.dayOfMonth();

        var absYear = Math.abs(yearValue);

        if (absYear < 1000) {
            if (yearValue < 0) {
                yearString = '-' + ('' + (yearValue - 10000)).slice(-4);
            } else {
                yearString = ('' + (yearValue + 10000)).slice(-4);
            }
        } else {
            if (yearValue > 9999) {
                yearString = '+' + yearValue;
            } else {
                yearString = '' + yearValue;
            }
        }

        if (monthValue < 10) {
            monthString = '-0' + monthValue;
        } else {
            monthString = '-' + monthValue;
        }

        if (dayValue < 10) {
            dayString = '-0' + dayValue;
        } else {
            dayString = '-' + dayValue;
        }

        return yearString + monthString + dayString;
    }
}

/**
 * The minimum supported {@code LocalDate}
 * This could be used by an application as a "far past" date.
 */
LocalDate.MIN = LocalDate.of(Year.MIN_VALUE, 1, 1);
/**
 * The maximum supported {@code LocalDate}
 * This could be used by an application as a "far future" date.
 */
LocalDate.MAX = LocalDate.of(Year.MAX_VALUE, 12, 31);

LocalDate.FROM = createTemporalQuery('LocalDate.FROM', (temporal) => {
    return LocalDate.from(temporal);
});


