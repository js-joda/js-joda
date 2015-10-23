import {assert} from '../assert';

/**
 * The range of valid values for a date-time field.
 * 
 * All TemporalField instances have a valid range of values.
 * For example, the ISO day-of-month runs from 1 to somewhere between 28 and 31.
 * This class captures that valid range.
 * 
 * It is important to be aware of the limitations of this class.
 * Only the minimum and maximum values are provided.
 * It is possible for there to be invalid values within the outer range.
 * For example, a weird field may have valid values of 1, 2, 4, 6, 7, thus
 * have a range of '1 - 7', despite that fact that values 3 and 5 are invalid.
 * 
 * Instances of this class are not tied to a specific field.
 *
 */

export class ValueRange {

    constructor(minSmallest, minLargest, maxSmallest, maxLargest) {
        assert(!(minSmallest > minLargest), "Smallest minimum value '" + minSmallest +
            "' must be less than largest minimum value '" + minLargest + "'");
        assert(!(maxSmallest > maxLargest), "Smallest maximum value '" + maxSmallest +
            "' must be less than largest maximum value '" + maxLargest + "'");
        assert(!(minLargest > maxLargest), "Minimum value '" + minLargest +
            "' must be less than maximum value '" + maxLargest + "'");

        this.minimum = function () {
            return minSmallest;
        };
        this.largestMinimum = function () {
            return minLargest;
        };
        this.maximum = function () {
            return maxLargest;
        };
        this.smallestMaximum = function () {
            return maxSmallest;
        };
    }

    isValidValue(value) {
        return (this.minimum() <= value && value <= this.maximum());
    }

    checkValidValue(value, field) {
        var msg;
        if (!this.isValidValue(value)) {
            if (field != null) {
                msg = ("Invalid value for " + field + " (valid values " + (this.toString()) + "): ") + value;
            } else {
                msg = ("Invalid value (valid values " + (this.toString()) + "): ") + value;
            }
            return assert(false, msg);
        }
    }

    /*
     * Outputs this range as a String.
     * 
     * The format will be '{min}/{largestMin} - {smallestMax}/{max}',
     * where the largestMin or smallestMax sections may be omitted, together
     * with associated slash, if they are the same as the min or max.
     *
     * @return {string} a string representation of this range, not null
     */

    toString() {
        var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? "/" + (this.largestMinimum()) : "");
        str += " - ";
        str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? "/" + (this.maximum()) : "");
        return str;
    }

    /*
     * called with 2 params: Obtains a fixed value range.
     *
     * This factory obtains a range where the minimum and maximum values are fixed.
     * For example, the ISO month-of-year always runs from 1 to 12.
     *
     * @param min  the minimum value
     * @param max  the maximum value
     * @return the ValueRange for min, max, not null

     * called with 3 params: Obtains a variable value range.
     *
     * This factory obtains a range where the minimum value is fixed and the maximum value may vary.
     * For example, the ISO day-of-month always starts at 1, but ends between 28 and 31.
     *
     * @param min  the minimum value
     * @param maxSmallest  the smallest maximum value
     * @param maxLargest  the largest maximum value
     * @return the ValueRange for min, smallest max, largest max, not null

     * called with 4 params: Obtains a fully variable value range.
     *
     * This factory obtains a range where both the minimum and maximum value may vary.
     *
     * @param minSmallest  the smallest minimum value
     * @param minLargest  the largest minimum value
     * @param maxSmallest  the smallest maximum value
     * @param maxLargest  the largest maximum value
     * @return {ValueRange} the ValueRange for smallest min, largest min, smallest max, largest max, not null
     */

    static of() {
        if (arguments.length === 2) {
            return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]);
        } else if (arguments.length === 3) {
            return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]);
        } else if (arguments.length === 4) {
            return new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]);
        } else {
            return assert(false, "Invalid number of arguments " + arguments.length);
        }
    }
}