import {assert} from './assert';

import { MathUtil } from './MathUtil';
import {DateTimeException} from './errors';

import { IsoChronology } from './chrono/IsoChronology';
import {DAY_OF_MONTH, MONTH_OF_YEAR, YEAR } from './temporal/ChronoField';

import {Clock} from './Clock';
import {Month} from './Month';
import {LocalTime} from './LocalTime';

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

export class LocalDate {

    /**
     *
     * @param {number} year
     * @param {Month, number} month
     * @param {number} dayOfMonth
     */
    constructor(year, month, dayOfMonth){
        if (month instanceof Month) {
            month = month.value();
        }
        LocalDate.validate(year, month, dayOfMonth);
        this._year = year;
        this._month = month;
        this._day = dayOfMonth;
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
     *
     * @return {number} gets the year
     */
    year() {
        return this._year
    }

    /**
     *
     * @return {number} gets the month
     */
    monthValue() {
        return this._month
    }
    
    month() {
        return Month.of(this._month);
    }

    /**
     *
     * @return {number} gets the day of month
     */
    // TODO: should be dayOfMonth() ?
    day() {
        return this._day
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
        var mjDay = this.toEpochDay() + daysToAdd;
        return LocalDate.ofEpochDay(mjDay);
    };

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
        return this.plusDays(daysToSubtract * -1)
    };

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
            total += MathUtil.div(y + 3, 4) - MathUtil.div(y + 99, 100) + MathUtil.div(y + 399, 400);
        } else {
            total -= MathUtil.div(y, -4) - MathUtil.div(y, -100) + MathUtil.div(y, -400);
        }
        total += MathUtil.div(367 * m - 362, 12);
        total += this.day() - 1;
        if (m > 2) {
            total--;
            if (!IsoChronology.isLeapYear(y)) {
                total--;
            }
        }
        return total - DAYS_0000_TO_1970;
    }

    static now(clock = Clock.systemDefaultZone()) {
        var now = clock.instant();
        var offset = clock.offset(now);
        var epochSec = now.epochSecond() + offset.totalSeconds();
        var epochDay = MathUtil.floorDiv(epochSec, LocalTime.SECONDS_PER_DAY);
        return LocalDate.ofEpochDay(epochDay);
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
            return this._compareTo(otherDate) === 0;
        }
        return false;
    }

    _compareTo(otherDate){
        var cmp = this.year() - otherDate.year();
        if (cmp == 0) {
            cmp = (this.monthValue() - otherDate.monthValue());
            if (cmp == 0) {
                cmp = (this.day() - otherDate.day());
            }
        }
        return cmp;
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
        var dayValue = this.day();

        var absYear = Math.abs(yearValue);

        if (absYear < 1000) {
          if (yearValue < 0) {
            yearString = "-" + ("" + (yearValue - 10000)).slice(-4);
          } else {
            yearString = ("" + (yearValue + 10000)).slice(-4);
          }
        } else {
          if (yearValue > 9999) {
            yearString = "+" + yearValue;
          } else {
            yearString = "" + yearValue;
          }
        }

        if (monthValue < 10) {
          monthString = "-0" + monthValue;
        } else {
          monthString = "-" + monthValue;
        }

        if (dayValue < 10) {
          dayString = "-0" + dayValue;
        } else {
          dayString = "-" + dayValue;
        }

        return yearString + monthString + dayString;
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
            adjustCycles = MathUtil.div(zeroDay + 1, DAYS_PER_CYCLE) - 1;
            adjust = adjustCycles * 400;
            zeroDay += -adjustCycles * DAYS_PER_CYCLE;
        }
        yearEst = MathUtil.div(400 * zeroDay + 591, DAYS_PER_CYCLE);
        doyEst = zeroDay - (365 * yearEst + MathUtil.div(yearEst, 4) - MathUtil.div(yearEst, 100) + MathUtil.div(yearEst, 400));
        if (doyEst < 0) {
            yearEst--;
            doyEst = zeroDay - (365 * yearEst + MathUtil.div(yearEst, 4) - MathUtil.div(yearEst, 100) + MathUtil.div(yearEst, 400));
        }
        yearEst += adjust;
        marchDoy0 = doyEst;
        marchMonth0 = MathUtil.div(marchDoy0 * 5 + 2, 153);
        month = (marchMonth0 + 2) % 12 + 1;
        dom = marchDoy0 - MathUtil.div(marchMonth0 * 306 + 5, 10) + 1;
        yearEst += MathUtil.div(marchMonth0, 10);
        year = yearEst;
        return new LocalDate(year, month, dom);
    };

    /**
     * @private
     */
    static validate(year, month, dayOfMonth) {
        var dom;
        YEAR.checkValidValue(year);
        MONTH_OF_YEAR.checkValidValue(month);
        DAY_OF_MONTH.checkValidValue(dayOfMonth);
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
                    assert(false, "Invalid date 'February 29' as '" + year + "' is not a leap year", DateTimeException);
                } else {
                    assert(false, "Invalid date '" + year + "' '" + month + "' '" + dayOfMonth + "'", DateTimeException);
                }
            }
        }
    };


}