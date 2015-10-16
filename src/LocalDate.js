/**
 *  Copyright (c) 2014-2015, Philipp Thürwächter
 *  All rights reserved.
 */

/**
 * A date without a time-zone in the ISO-8601 calendar system,
 * such as {@code 2007-12-03}.
 * <p>
 * {@code LocalDate} is an immutable date-time object that represents a date,
 * often viewed as year-month-day. Other date fields, such as day-of-year,
 * day-of-week and week-of-year, can also be accessed.
 * For example, the value "2nd October 2007" can be stored in a {@code LocalDate}.
 * <p>
 * This class does not store or represent a time or time-zone.
 * Instead, it is a description of the date, as used for birthdays.
 * It cannot represent an instant on the time-line without additional information
 * such as an offset or time-zone.
 */

export class LocalDate {

    constructor(year, month, dayOfMonth){
        this._year = year;
        this._month = month;
        this._day = dayOfMonth;
    }

    year() {
        return this._year
    }

    month() {
        return this._month
    }

    day() {
        return this._day
    }

    /**
     * Outputs this date as a {@code String}, such as {@code 2007-12-03}.
     * <p>
     * The output will be in the ISO-8601 format {@code uuuu-MM-dd}.
     *
     * @return a string representation of this date, not null
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