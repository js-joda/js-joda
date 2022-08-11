/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireNonNull, requireInstance } from './assert';
import { ChronoField, DateTimeException, IllegalArgumentException, IllegalStateException, IsoChronology, IsoFields, Month, TemporalAccessor, TemporalField, TemporalQueries, TemporalQuery, UnsupportedTemporalTypeException, _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * A quarter-of-year, such as 'Q2'.
 * 
 * `Quarter` is an enum representing the 4 quarters of the year -
 * Q1, Q2, Q3 and Q4. These are defined as January to March, April to June,
 * July to September and October to December.
 * 
 * The `int` value follows the quarter, from 1 (Q1) to 4 (Q4).
 * It is recommended that applications use the enum rather than the `int` value
 * to ensure code clarity.
 * 
 * **Do not use `ordinal()` to obtain the numeric representation of `Quarter`.
 * Use `getValue()` instead.**
 * 
 * This enum represents a common concept that is found in many calendar systems.
 * As such, this enum may be used by any calendar system that has the quarter-of-year
 * concept defined exactly equivalent to the ISO calendar system.
 *
 */
export class Quarter extends TemporalAccessor {
    /**
     * replacement for enum `valueOf(name)`
     * 
     * @param {string} name
     * @returns {Quarter}
     */
    static valueOf(name) {
        requireNonNull(name, 'name');
        switch (name) {
            case 'Q1':
                return Quarter.Q1;
            case 'Q2':
                return Quarter.Q2;
            case 'Q3':
                return Quarter.Q3;
            case 'Q4':
                return Quarter.Q4;
        }
        throw new IllegalArgumentException(`No enum constant Quarter.${name}`);
    }

    /**
     * replacement for enum `values()`
     * @return {Quarter[]}
     */
    static values() {
        return QUARTERS.slice();
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `Quarter` from an `int` value.
     * 
     * `Quarter` is an enum representing the 4 quarters of the year.
     * This factory allows the enum to be obtained from the `int` value.
     * The `int` value follows the quarter, from 1 (Q1) to 4 (Q4).
     *
     * @param {number} quarterOfYear  the quarter-of-year to represent, from 1 (Q1) to 4 (Q4)
     * @return {Quarter} the quarter-of-year, not null
     * @throws DateTimeException if the quarter-of-year is invalid
     */
    static of(quarterOfYear) {
        requireNonNull(quarterOfYear, 'quarterOfYear');
        switch (quarterOfYear) {
            case 1:
                return Quarter.Q1;
            case 2:
                return Quarter.Q2;
            case 3:
                return Quarter.Q3;
            case 4:
                return Quarter.Q4;
            default:
                throw new DateTimeException(`Invalid value for Quarter: ${quarterOfYear}`);
        }
    }

    /**
     * Obtains an instance of `Quarter` from a month-of-year.
     * 
     * `Quarter` is an enum representing the 4 quarters of the year.
     * This factory allows the enum to be obtained from the `Month` value.
     * 
     * January to March are Q1, April to June are Q2, July to September are Q3
     * and October to December are Q4.
     *
     * @param {number} monthOfYear  the month-of-year to convert from, from 1 to 12
     * @return {Quarter} the quarter-of-year, not null
     * @throws DateTimeException if the month-of-year is invalid
     */
    static ofMonth(monthOfYear) {
        requireNonNull(monthOfYear, 'monthOfYear');
        ChronoField.MONTH_OF_YEAR.range().checkValidValue(monthOfYear, ChronoField.MONTH_OF_YEAR);
        return Quarter.of(MathUtil.intDiv(monthOfYear - 1, 3) + 1);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `Quarter` from a temporal object.
     * 
     * This obtains a quarter based on the specified temporal.
     * A `TemporalAccessor` represents an arbitrary set of date and time information,
     * which this factory converts to an instance of `Quarter`.
     * 
     * The conversion extracts the {@link IsoFields.QUARTER_OF_YEAR} field.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a `LocalDate`.
     * 
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, `Quarter.from`.
     *
     * @param temporal  the temporal-time object to convert, not null
     * @return the quarter-of-year, not null
     * @throws DateTimeException if unable to convert to a `Quarter`
     */
    static from(temporal) {
        if (temporal instanceof Quarter) {
            return temporal;
        } else if (temporal instanceof Month) {
            const month = temporal;
            return Quarter.of(MathUtil.intDiv(month.ordinal(), 3) + 1);
        }
        try {
            /* TODO: only IsoChronology for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }
            */
            const qoy = MathUtil.safeToInt(temporal.getLong(IsoFields.QUARTER_OF_YEAR));
            return Quarter.of(qoy);
        } catch (ex) {
            throw new DateTimeException(`Unable to obtain Quarter from TemporalAccessor: ${temporal} of type ${temporal.constructor.name}`, ex);
        }
    }

    /**
     * 
     * @param {number} value
     * @param {string} name
     * @private
     */
    constructor(value, name) {
        super();
        this._value = MathUtil.safeToInt(value);
        this._name = name;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the quarter-of-year `int` value.
     * 
     * The values are numbered following the ISO-8601 standard,
     * from 1 (Q1) to 4 (Q4).
     *
     * @return the quarter-of-year, from 1 (Q1) to 4 (Q4)
     */
    value() {
        return this._value;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the textual representation, such as 'Q1' or '4th quarter'.
     * 
     * This returns the textual name used to identify the quarter-of-year,
     * suitable for presentation to the user.
     * The parameters control the style of the returned text and the locale.
     * 
     * If no textual mapping is found then the {@link #getValue() numeric value} is returned.
     *
     * @param style  the length of the text required, not null
     * @param locale  the locale to use, not null
     * @return the text value of the quarter-of-year, not null
     */
    // eslint-disable-next-line no-unused-vars
    displayName(style, locale) {
        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the specified field is supported.
     * 
     * This checks if this quarter-of-year can be queried for the specified field.
     * If false, then calling the {@link #range(TemporalField) range} and
     * {@link #get(TemporalField) get} methods will throw an exception.
     * 
     * If the field is {@link IsoFields#QUARTER_OF_YEAR QUARTER_OF_YEAR} then
     * this method returns true.
     * All `ChronoField` instances will return false.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField} field  the field to check, null returns false
     * @return {boolean} true if the field is supported on this quarter-of-year, false if not
     */
    isSupported(field) {
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return true;
        } else if (field instanceof ChronoField) {
            return false;
        }
        return field != null && field.isSupportedBy(this);
    }

    /**
     * Gets the range of valid values for the specified field.
     * 
     * The range object expresses the minimum and maximum valid values for a field.
     * This quarter is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is {@link IsoFields#QUARTER_OF_YEAR QUARTER_OF_YEAR} then the
     * range of the quarter-of-year, from 1 to 4, will be returned.
     * All `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
     * passing `this` as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field  the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     * @throws UnsupportedTemporalTypeException if the field is not supported
     */
    range(field) {
        requireNonNull(field, 'field');
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return field.range();
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this quarter-of-year as an `int`.
     * 
     * This queries this quarter for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is {@link IsoFields.QUARTER_OF_YEAR} then the
     * value of the quarter-of-year, from 1 to 4, will be returned.
     * All `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field, within the valid range of values
     * @throws DateTimeException if a value for the field cannot be obtained or
     *         the value is outside the range of valid values for the field
     * @throws UnsupportedTemporalTypeException if the field is not supported or
     *         the range of values exceeds an `int`
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this quarter-of-year as a `long`.
     * 
     * This queries this quarter for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * 
     * If the field is {@link IsoFields#QUARTER_OF_YEAR QUARTER_OF_YEAR} then the
     * value of the quarter-of-year, from 1 to 4, will be returned.
     * All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.
     * 
     * If the field is not a `ChronoField`, then the result of this method
     * is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
     * passing `this` as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws UnsupportedTemporalTypeException if the field is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field === IsoFields.QUARTER_OF_YEAR) {
            return this.value();
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException(`Unsupported field: ${field}`);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns the quarter that is the specified number of quarters after this one.
     * 
     * The calculation rolls around the end of the year from Q4 to Q1.
     * The specified period may be negative.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} quarters  the quarters to add, positive or negative
     * @return {Quarter} the resulting quarter, not null
     */
    plus(quarters) {
        const amount = MathUtil.intMod(quarters, 4);
        return QUARTERS[(this.ordinal() + amount + 4) % 4];
    }

    /**
     * Returns the quarter that is the specified number of quarters before this one.
     * 
     * The calculation rolls around the start of the year from Q1 to Q4.
     * The specified period may be negative.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param  {number} quarters  the quarters to subtract, positive or negative
     * @return {Quarter} the resulting quarter, not null
     */
    minus(quarters) {
        return this.plus(-(MathUtil.intMod(quarters, 4)));
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the length of this quarter in days.
     * 
     * This takes a flag to determine whether to return the length for a leap year or not.
     * 
     * Q1 has 90 in a standard year and 91 days in a leap year.
     * Q2 has 91 days.
     * Q3 and Q4 have 92 days.
     *
     * @param {boolean} leapYear  true if the length is required for a leap year
     * @return {number} the length of this month in days, from 90 to 92
     */
    length(leapYear) {
        switch (this) {
            case Quarter.Q1:
                return (leapYear ? 91 : 90);
            case Quarter.Q2:
                return 91;
            default:
                return 92;
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the first of the three months that this quarter refers to.
     * 
     * Q1 will return January.
     * Q2 will return April.
     * Q3 will return July.
     * Q4 will return October.
     * 
     * To obtain the other two months of the quarter, simply use {@link Month#plus(long)}
     * on the returned month.
     *
     * @return {Month} the first month in the quarter, not null
     */
    firstMonth() {
        switch (this) {
            case Quarter.Q1:
                return Month.JANUARY;
            case Quarter.Q2:
                return Month.APRIL;
            case Quarter.Q3:
                return Month.JULY;
            case Quarter.Q4:
                return Month.OCTOBER;
            default:
                throw new IllegalStateException('Unreachable');
        }
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this quarter-of-year using the specified query.
     * 
     * This queries this quarter-of-year using the specified query strategy object.
     * The `TemporalQuery` object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * 
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery.queryFrom(TemporalAccessor)} method on the
     * specified query passing `this` as the argument.
     *
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query (defined by the query)
     * @throws ArithmeticException if numeric overflow occurs (defined by the query)
     */
    query(query) {
        requireNonNull(query, 'query');
        requireInstance(query, TemporalQuery, 'query');
        if (query === TemporalQueries.chronology()) {
            return IsoChronology.INSTANCE;
        } else if (query === TemporalQueries.precision()) {
            return IsoFields.QUARTER_YEARS;
        }
        return super.query(query);
    }

    /**
     * Adjusts the specified temporal object to have this quarter-of-year.
     * 
     * This returns a temporal object of the same observable type as the input
     * with the quarter-of-year changed to be the same as this.
     * 
     * The adjustment is equivalent to using {@link Temporal.with}
     * passing {@link IsoFields.QUARTER_OF_YEAR} as the field.
     * If the specified temporal object does not use the ISO calendar system then
     * a `DateTimeException` is thrown.
     * 
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal.with}:
     * ```
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisQuarter.adjustInto(temporal);
     *   temporal = temporal.with(thisQuarter);
     * ```
     * 
     * For example, given a date in May, the following are output:
     * ```
     *   dateInMay.with(Q1);    // three months earlier
     *   dateInMay.with(Q2);    // no change
     *   dateInMay.with(Q3);    // three months later
     *   dateInMay.with(Q4);    // six months later
     * ```
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} temporal  the target object to be adjusted, not null
     * @return {Temporal} the adjusted object, not null
     * @throws DateTimeException if unable to make the adjustment
     * @throws ArithmeticException if numeric overflow occurs
     */
    adjustInto(temporal) {
        requireNonNull(temporal, 'temporal');
        /* TODO: only IsoChronology for now
        if (Chronology.from(temporal).equals(IsoChronology.INSTANCE) == false) {
            throw new DateTimeException('Adjustment only supported on ISO date-time');
        }
        */
        return temporal.with(IsoFields.QUARTER_OF_YEAR, this.value());
    }

    //-----------------------------------------------------------------------
    // Enum
    //-----------------------------------------------------------------------

    /**
     *
     * @returns {number}
     */
    ordinal() {
        return this._value - 1;
    }

    /**
     *
     * @returns {string}
     */
    name() {
        return this._name;
    }

    //-----------------------------------------------------------------------
    // Comparable
    //-----------------------------------------------------------------------

    /**
     * Compares this Quarter to another Quarter.
     *
     * The comparison is based on the value of the Quarter.
     * It is "consistent with equals", as defined by {@link Comparable}.
     *
     * @param {Quarter} other  the other quarter to compare to, not null
     * @return {number} the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Quarter, 'other');
        return this._value - other._value;
    }

    //-----------------------------------------------------------------------
    // Object
    //-----------------------------------------------------------------------

    /**
     * Outputs this quarter as a String, such as Q1
     *
     * @return {string} a string representation of this quarter, not null
     */
    toString() {
        return this.name();
    }

    /**
     *
     * @returns {boolean}
     */
    equals(other){
        return this === other;
    }

    /**
     * A hash code for this quarter.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        return this._value;
    }
}

let QUARTERS;

export function _init() {
    /**
     * The singleton instance for the first quarter-of-year, from January to March.
     * This has the numeric value of `1`.
     */
    Quarter.Q1 = new Quarter(1, 'Q1');
    /**
      * The singleton instance for the second quarter-of-year, from April to June.
      * This has the numeric value of `2`.
      */
    Quarter.Q2 = new Quarter(2, 'Q2');
    /**
      * The singleton instance for the third quarter-of-year, from July to September.
      * This has the numeric value of `3`.
      */
    Quarter.Q3 = new Quarter(3, 'Q3');
    /**
      * The singleton instance for the fourth quarter-of-year, from October to December.
      * This has the numeric value of `4`.
      */
    Quarter.Q4 = new Quarter(4, 'Q4');

    Quarter.FROM = createTemporalQuery('Quarter.FROM', (temporal) => {
        return Quarter.from(temporal);
    });

    QUARTERS = [
        Quarter.Q1,
        Quarter.Q2,
        Quarter.Q3,
        Quarter.Q4
    ];
}

// copied from packages/core/src/temporal/TemporalQuery.js
function createTemporalQuery(name, queryFromFunction) {
    class ExtendedTemporalQuery extends TemporalQuery {
    }

    ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
    return new ExtendedTemporalQuery(name);
}
