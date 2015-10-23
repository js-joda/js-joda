import { intDiv } from './Math'
import { IsoChronology } from './chrono/IsoChronology'

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
     * @param {number} month
     * @param {number} dayOfMonth
     */
    constructor(year, month, dayOfMonth){
        this._year = year;
        this._month = month;
        this._day = dayOfMonth;
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
    month() {
        return this._month
    }

    /**
     *
     * @return {number} gets the day of month
     */
    day() {
        return this._day
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
        var m = this.month();
        var total = 0;
        total += 365 * y;
        if (y >= 0) {
            total += intDiv(y + 3, 4) - intDiv(y + 99, 100) + intDiv(y + 399, 400);
        } else {
            total -= intDiv(y, -4) - intDiv(y, -100) + intDiv(y, -400);
        }
        total += intDiv(367 * m - 362, 12);
        total += this.day() - 1;
        if (m > 2) {
            total--;
            if (!IsoChronology.isLeapYear(y)) {
                total--;
            }
        }
        return total - DAYS_0000_TO_1970;
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
        var monthValue = this.month();
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


}