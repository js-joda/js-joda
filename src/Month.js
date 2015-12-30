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

