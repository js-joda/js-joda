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

    /**
     *
     * @param {number} month
     */
    static of(month) {
        return MONTHS[month-1];
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

