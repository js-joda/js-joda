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
        var amount = Math.floor((months % 12)) + 12; // + 12 to make sure negative arguments are positive, the total is "corrected" by the next % 12
        var newMonthVal = ((this.value() + amount) % 12);
        /* December is 12, not 0, but 12 % 12 = 0 */
        newMonthVal = newMonthVal == 0 ? 12 : newMonthVal;
        return Month.of(newMonthVal);
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
            case Month.FEBRUARY:
                return (leapYear ? 29 : 28);
            case Month.APRIL:
            case Month.JUNE:
            case Month.SEPTEMBER:
            case Month.NOVEMBER:
                return 30;
            default:
                return 31;
        }
    }

    /**
     * Gets the minimum length of this month in days.
     * <p>
     * February has a minimum length of 28 days.
     * April, June, September and November have 30 days.
     * All other months have 31 days.
     *
     * @return {number} the minimum length of this month in days, from 28 to 31
     */
    minLength() {
        switch (this) {
            case Month.FEBRUARY:
                return 28;
            case Month.APRIL:
            case Month.JUNE:
            case Month.SEPTEMBER:
            case Month.NOVEMBER:
                return 30;
            default:
                return 31;
        }
    }

    /**
     * Gets the maximum length of this month in days.
     * <p>
     * February has a maximum length of 29 days.
     * April, June, September and November have 30 days.
     * All other months have 31 days.
     *
     * @return {number} the maximum length of this month in days, from 29 to 31
     */
    maxLength() {
        switch (this) {
            case Month.FEBRUARY:
                return 29;
            case Month.APRIL:
            case Month.JUNE:
            case Month.SEPTEMBER:
            case Month.NOVEMBER:
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
            case Month.JANUARY:
                return 1;
            case Month.FEBRUARY:
                return 32;
            case Month.MARCH:
                return 60 + leap;
            case Month.APRIL:
                return 91 + leap;
            case Month.MAY:
                return 121 + leap;
            case Month.JUNE:
                return 152 + leap;
            case Month.JULY:
                return 182 + leap;
            case Month.AUGUST:
                return 213 + leap;
            case Month.SEPTEMBER:
                return 244 + leap;
            case Month.OCTOBER:
                return 274 + leap;
            case Month.NOVEMBER:
                return 305 + leap;
            case Month.DECEMBER:
            default:
                return 335 + leap;
        }
    }

    /**
     * Gets the month corresponding to the first month of this quarter.
     * <p>
     * The year can be divided into four quarters.
     * This method returns the first month of the quarter for the base month.
     * January, February and March return January.
     * April, May and June return April.
     * July, August and September return July.
     * October, November and December return October.
     *
     * @return {Month} the first month of the quarter corresponding to this month, not null
     */
    firstMonthOfQuarter() {
        switch (this) {
            case Month.JANUARY:
            case Month.FEBRUARY:
            case Month.MARCH:
                return Month.JANUARY;
            case Month.APRIL:
            case Month.MAY:
            case Month.JUNE:
                return Month.APRIL;
            case Month.JULY:
            case Month.AUGUST:
            case Month.SEPTEMBER:
                return Month.JULY;
            case Month.OCTOBER:
            case Month.NOVEMBER:
            case Month.DECEMBER:
            default:
                return Month.OCTOBER;
        }
    }

    /**
     *
     * @param {number} month
     * @return {Month} not null
     **/
    static of(month) {
       if (month < 1 || month > 12) {
           assert(false, "Invalid value for MonthOfYear: " + month, DateTimeException);
       }
       return MONTHS[month-1];
    }
}

Month.JANUARY = new Month(1);
Month.FEBRUARY = new Month(2);
Month.MARCH = new Month(3);
Month.APRIL = new Month(4);
Month.MAY = new Month(5);
Month.JUNE = new Month(6);
Month.JULY = new Month(7);
Month.AUGUST = new Month(8);
Month.SEPTEMBER = new Month(9);
Month.OCTOBER = new Month(10);
Month.NOVEMBER = new Month(11);
Month.DECEMBER = new Month(12);

var MONTHS = [
    Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE,
    Month.JULY, Month.AUGUST, Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER
];

