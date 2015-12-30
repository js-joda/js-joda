import {assert} from './assert'
import {DateTimeException} from './errors'

/**
 * A month-of-year, such as 'July'.
 * <p>
 * {@code Month} is representing the 12 months of the year -
 * January, February, March, April, May, June, July, August, September, October,
 * November and December.
 * <p>
 * In addition to the textual name, each month-of-year has an {@code int} value.
 * The {@code int} value follows normal usage and the ISO-8601 standard,
 * from 1 (January) to 12 (December). It is recommended that applications use the static values defined by this class
 * rather than the {@code int} value to ensure code clarity.
 * <p>
 * This class represents a common concept that is found in many calendar systems.
 * As such, this class may be used by any calendar system that has the month-of-year
 * concept defined exactly equivalent to the ISO-8601 calendar system.
 *
 */

export class Month {
    
    /**
     *
     * @param {number} value
     */
    constructor(value){
        this._value = value;
    }

    /**
     *
     * @return {number} gets the value
     */
    value() {
        return this._value
    }
    
    /**
     * Returns the month-of-year that is the specified number of months after this one.
     * <p>
     * The calculation rolls around the end of the year from December to January.
     * The specified period may be negative.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months  the months to add, positive or negative
     * @return {Month} the resulting month, not null
     */
    plus(months) {
        var amount = Math.floor((months % 12));
        var newMonthVal = ((this.value() + amount) % 12);
        /* December is 12, not 0, but 12 % 12 = 0 */
        newMonthVal = newMonthVal == 0 ? 12 : newMonthVal;
        return of(newMonthVal);
    }

    /**
     * Returns the month-of-year that is the specified number of months before this one.
     * <p>
     * The calculation rolls around the start of the year from January to December.
     * The specified period may be negative.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months  the months to subtract, positive or negative
     * @return {Month} the resulting month, not null
     */
    minus(months) {
        return this.plus(-(months % 12));
    }

    /**
     * Gets the length of this month in days.
     * <p>
     * This takes a flag to determine whether to return the length for a leap year or not.
     * <p>
     * February has 28 days in a standard year and 29 days in a leap year.
     * April, June, September and November have 30 days.
     * All other months have 31 days.
     *
     * @param {boolean} leapYear  true if the length is required for a leap year
     * @return {number} the length of this month in days, from 28 to 31
     */
    length(leapYear) {
        switch (this) {
            case FEBRUARY:
                return (leapYear ? 29 : 28);
            case APRIL:
            case JUNE:
            case SEPTEMBER:
            case NOVEMBER:
                return 30;
            default:
                return 31;
        }
    }

    /**
     * Gets the day-of-year corresponding to the first day of this month.
     * <p>
     * This returns the day-of-year that this month begins on, using the leap
     * year flag to determine the length of February.
     *
     * @param {boolean} leapYear  true if the length is required for a leap year
     * @return {number} the day of year corresponding to the first day of this month, from 1 to 336
     */
    firstDayOfYear(leapYear) {
        var leap = leapYear ? 1 : 0;
        switch (this) {
            case JANUARY:
                return 1;
            case FEBRUARY:
                return 32;
            case MARCH:
                return 60 + leap;
            case APRIL:
                return 91 + leap;
            case MAY:
                return 121 + leap;
            case JUNE:
                return 152 + leap;
            case JULY:
                return 182 + leap;
            case AUGUST:
                return 213 + leap;
            case SEPTEMBER:
                return 244 + leap;
            case OCTOBER:
                return 274 + leap;
            case NOVEMBER:
                return 305 + leap;
            case DECEMBER:
            default:
                return 335 + leap;
        }
    }


    /**
     * Outputs the numerical representation of this month as a String, such as 12.
     * The output will be in the ISO-8601 format MM.
     *
     * @return {string} a string representation of this month, not null
     */
    toString() {
        var monthString;

        var monthValue = this.value();

        if (monthValue < 10) {
          monthString = "0" + monthValue;
        } else {
          monthString = "" + monthValue;
        }

        return monthString;
    }

}

export const JANUARY = new Month(1);
export const FEBRUARY = new Month(2);
export const MARCH = new Month(3);
export const APRIL = new Month(4);
export const MAY = new Month(5);
export const JUNE = new Month(6);
export const JULY = new Month(7);
export const AUGUST = new Month(8);
export const SEPTEMBER = new Month(9);
export const OCTOBER = new Month(10);
export const NOVEMBER = new Month(11);
export const DECEMBER = new Month(12);

var MONTHS = [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER];

/**
 * 
 * @param {number} month
 * @return {Month} not null
 */
export function of(month) {
    if (month < 1 || month > 12) {
        assert(false, "Invalid value for MonthOfYear: " + month, DateTimeException);
    }
    return MONTHS[month-1];
}