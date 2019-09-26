/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER} from '../MathUtil';

import {ChronoUnit} from './ChronoUnit';
import {TemporalField} from './TemporalField';
import {ValueRange} from './ValueRange';
import {YearConstants} from '../YearConstants';

/**
 * A standard set of fields.
 *
 * This set of fields provide field-based access to manipulate a date, time or date-time.
 * The standard set of fields can be extended by implementing {@link TemporalField}.
 *
 * These fields are intended to be applicable in multiple calendar systems.
 * For example, most non-ISO calendar systems define dates as a year, month and day,
 * just with slightly different rules.
 * The documentation of each field explains how it operates.
 *
 * ### Static properties of Class {@link ChronoField}
 *
 * ChronoField.NANO_OF_SECOND
 *
 * ChronoField.NANO_OF_DAY
 *
 * ChronoField.MICRO_OF_SECOND
 *
 * ChronoField.MICRO_OF_DAY
 *
 * ChronoField.MILLI_OF_SECOND
 *
 * ChronoField.MILLI_OF_DAY
 *
 * ChronoField.SECOND_OF_MINUTE
 *
 * ChronoField.SECOND_OF_DAY
 *
 * ChronoField.MINUTE_OF_HOUR
 *
 * ChronoField.MINUTE_OF_DAY
 *
 * ChronoField.HOUR_OF_AMPM
 *
 * ChronoField.CLOCK_HOUR_OF_AMPM
 *
 * ChronoField.HOUR_OF_DAY
 *
 * ChronoField.CLOCK_HOUR_OF_DAY
 *
 * ChronoField.AMPM_OF_DAY
 *
 * ChronoField.DAY_OF_WEEK
 *
 * ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH
 *
 * ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR
 *
 * ChronoField.DAY_OF_MONTH
 *
 * ChronoField.DAY_OF_YEAR
 *
 * ChronoField.EPOCH_DAY
 *
 * ChronoField.ALIGNED_WEEK_OF_MONTH
 *
 * ChronoField.ALIGNED_WEEK_OF_YEAR
 *
 * ChronoField.MONTH_OF_YEAR
 *
 * ChronoField.PROLEPTIC_MONTH
 *
 * ChronoField.YEAR_OF_ERA
 *
 * ChronoField.YEAR
 *
 * ChronoField.ERA
 *
 * ChronoField.INSTANT_SECONDS
 *
 * ChronoField.OFFSET_SECONDS
 *
 */
export class ChronoField extends TemporalField {

    /**
     * helper function to get one of the static ChronoField defines by name, needed to resolve ChronoField from EnumMap
     *
     * @param {String} fieldName
     * @return {ChronoField | null}
     */
    static byName(fieldName) {
        for (const prop in ChronoField) {
            if (ChronoField[prop]) {
                if ((ChronoField[prop] instanceof ChronoField) && ChronoField[prop].name() === fieldName) {
                    return ChronoField[prop];
                }
            }
        }
    }

    /**
     *
     * @param {!string} name
     * @param {!number} baseUnit
     * @param {!number} rangeUnit
     * @param {!ValueRange} range
     * @private
     */
    constructor(name, baseUnit, rangeUnit, range) {
        super();
        this._name = name;
        this._baseUnit = baseUnit;
        this._rangeUnit = rangeUnit;
        this._range = range;
    }

    /**
     *
     * @returns {string}
     */
    name(){
        return this._name;
    }

    /**
     *
     * @returns {!number}
     */
    baseUnit(){
        return this._baseUnit;
    }

    /**
     *
     * @returns {!number}
     */
    rangeUnit(){
        return this._rangeUnit;
    }

    /**
     *
     * @returns {!ValueRange}
     */
    range(){
        return this._range;
    }

    /**
     *
     * @returns {string}
     */
    displayName(){
        return this.toString();
    }

    /**
     *
     * @param {number} value
     * @returns {*}
     */
    checkValidValue(value) {
        return this.range().checkValidValue(value, this.name());
    }

    /**
     * Checks if this field represents a component of a date.
     *
     * @return {boolean} true if it is a component of a date
     */
    isDateBased() {
        const dateBased =
            this === ChronoField.DAY_OF_WEEK ||
            this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH ||
            this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR ||
            this === ChronoField.DAY_OF_MONTH ||
            this === ChronoField.DAY_OF_YEAR ||
            this === ChronoField.EPOCH_DAY ||
            this === ChronoField.ALIGNED_WEEK_OF_MONTH ||
            this === ChronoField.ALIGNED_WEEK_OF_YEAR ||
            this === ChronoField.MONTH_OF_YEAR ||
            //this === ChronoField.EPOCH_MONTH ||
            this === ChronoField.YEAR_OF_ERA ||
            this === ChronoField.YEAR ||
            this === ChronoField.ERA;
        return dateBased;
    }

    /**
     * Checks if this field represents a component of a time.
     *
     * @return {boolean} true if it is a component of a time
     */
    isTimeBased() {
        const timeBased =
            this === ChronoField.NANO_OF_SECOND     ||
            this === ChronoField.NANO_OF_DAY        ||
            this === ChronoField.MICRO_OF_SECOND    ||
            this === ChronoField.MICRO_OF_DAY       ||
            this === ChronoField.MILLI_OF_SECOND    ||
            this === ChronoField.MILLI_OF_DAY       ||
            this === ChronoField.SECOND_OF_MINUTE   ||
            this === ChronoField.SECOND_OF_DAY      ||
            this === ChronoField.MINUTE_OF_HOUR     ||
            this === ChronoField.MINUTE_OF_DAY      ||
            this === ChronoField.HOUR_OF_AMPM       ||
            this === ChronoField.CLOCK_HOUR_OF_AMPM ||
            this === ChronoField.HOUR_OF_DAY        ||
            this === ChronoField.CLOCK_HOUR_OF_DAY  ||
            this === ChronoField.AMPM_OF_DAY;
        return timeBased;
    }

    /**
     * Get the range of valid values for this field using the temporal object to
     * refine the result.
     *
     * This uses the temporal object to find the range of valid values for the field.
     * This is similar to {@link range}, however this method refines the result
     * using the temporal. For example, if the field is {@link DAY_OF_MONTH} the
     * {@link range} method is not accurate as there are four possible month lengths,
     * 28, 29, 30 and 31 days. Using this method with a date allows the range to be
     * accurate, returning just one of those four options.
     *
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link TemporalAccessor#range}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisField.rangeRefinedBy(temporal);
     *   temporal = temporal.range(thisField);
     * </pre>
     * It is recommended to use the second approach, {@link range},
     * as it is a lot clearer to read in code.
     *
     * Implementations should perform any queries or calculations using the fields
     * available in {@link ChronoField}.
     * If the field is not supported a {@link DateTimeException} must be thrown.
     *
     * @param {!TemporalAccessor} temporal - the temporal object used to refine the result, not null
     * @return {ValueRange} the range of valid values for this field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    rangeRefinedBy(temporal) {
        return temporal.range(this);
    }

    /**
     * Checks that the specified value is valid and fits in an `int`.
     *
     * This validates that the value is within the outer range of valid values
     * returned by {@link range}.
     * It also checks that all valid values are within the bounds of an `int`.
     *
     * This method checks against the range of the field in the ISO-8601 calendar system.
     * This range may be incorrect for other calendar systems.
     * Use {@link Chronology#range} to access the correct range
     * for a different calendar system.
     *
     * @param {number} value - the value to check
     * @return {number} the value that was passed in
     */
    checkValidIntValue(value) {
        return this.range().checkValidIntValue(value, this);
    }

    /**
     *
     * @param {TemporalAccessor} temporal
     * @returns {number}
     */
    getFrom(temporal) {
        return temporal.getLong(this);
    }

    /**
     *
     * @returns {string}
     */
    toString(){
        return this.name();
    }

    /**
     *
     * @param {*} other
     * @returns {boolean}
     */
    equals(other){
        return this === other;
    }
}

export function _init() {

    ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', ChronoUnit.NANOS, ChronoUnit.SECONDS, ValueRange.of(0, 999999999));

    ChronoField.NANO_OF_DAY = new ChronoField('NanoOfDay', ChronoUnit.NANOS, ChronoUnit.DAYS, ValueRange.of(0, 86400 * 1000000000 - 1));

    ChronoField.MICRO_OF_SECOND = new ChronoField('MicroOfSecond', ChronoUnit.MICROS, ChronoUnit.SECONDS, ValueRange.of(0, 999999));

    ChronoField.MICRO_OF_DAY = new ChronoField('MicroOfDay', ChronoUnit.MICROS, ChronoUnit.DAYS, ValueRange.of(0, 86400 * 1000000 - 1));

    ChronoField.MILLI_OF_SECOND = new ChronoField('MilliOfSecond', ChronoUnit.MILLIS, ChronoUnit.SECONDS, ValueRange.of(0, 999));

    ChronoField.MILLI_OF_DAY = new ChronoField('MilliOfDay', ChronoUnit.MILLIS, ChronoUnit.DAYS, ValueRange.of(0, 86400 * 1000 - 1));

    ChronoField.SECOND_OF_MINUTE = new ChronoField('SecondOfMinute', ChronoUnit.SECONDS, ChronoUnit.MINUTES, ValueRange.of(0, 59));

    ChronoField.SECOND_OF_DAY = new ChronoField('SecondOfDay', ChronoUnit.SECONDS, ChronoUnit.DAYS, ValueRange.of(0, 86400 - 1));

    ChronoField.MINUTE_OF_HOUR = new ChronoField('MinuteOfHour', ChronoUnit.MINUTES, ChronoUnit.HOURS, ValueRange.of(0, 59));

    ChronoField.MINUTE_OF_DAY = new ChronoField('MinuteOfDay', ChronoUnit.MINUTES, ChronoUnit.DAYS, ValueRange.of(0, (24 * 60) - 1));

    ChronoField.HOUR_OF_AMPM = new ChronoField('HourOfAmPm', ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, ValueRange.of(0, 11));

    ChronoField.CLOCK_HOUR_OF_AMPM = new ChronoField('ClockHourOfAmPm', ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, ValueRange.of(1, 12));

    ChronoField.HOUR_OF_DAY = new ChronoField('HourOfDay', ChronoUnit.HOURS, ChronoUnit.DAYS, ValueRange.of(0, 23));

    ChronoField.CLOCK_HOUR_OF_DAY = new ChronoField('ClockHourOfDay', ChronoUnit.HOURS, ChronoUnit.DAYS, ValueRange.of(1, 24));

    ChronoField.AMPM_OF_DAY = new ChronoField('AmPmOfDay', ChronoUnit.HALF_DAYS, ChronoUnit.DAYS, ValueRange.of(0, 1));

    ChronoField.DAY_OF_WEEK = new ChronoField('DayOfWeek', ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));

    ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH = new ChronoField('AlignedDayOfWeekInMonth', ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));

    ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR = new ChronoField('AlignedDayOfWeekInYear', ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));

    ChronoField.DAY_OF_MONTH = new ChronoField('DayOfMonth', ChronoUnit.DAYS, ChronoUnit.MONTHS, ValueRange.of(1, 28, 31), 'day');

    ChronoField.DAY_OF_YEAR = new ChronoField('DayOfYear', ChronoUnit.DAYS, ChronoUnit.YEARS, ValueRange.of(1, 365, 366));

    ChronoField.EPOCH_DAY = new ChronoField('EpochDay', ChronoUnit.DAYS, ChronoUnit.FOREVER, ValueRange.of(Math.floor(YearConstants.MIN_VALUE * 365.25), Math.floor(YearConstants.MAX_VALUE * 365.25)));

    ChronoField.ALIGNED_WEEK_OF_MONTH = new ChronoField('AlignedWeekOfMonth', ChronoUnit.WEEKS, ChronoUnit.MONTHS, ValueRange.of(1, 4, 5));

    ChronoField.ALIGNED_WEEK_OF_YEAR = new ChronoField('AlignedWeekOfYear', ChronoUnit.WEEKS, ChronoUnit.YEARS, ValueRange.of(1, 53));

    ChronoField.MONTH_OF_YEAR = new ChronoField('MonthOfYear', ChronoUnit.MONTHS, ChronoUnit.YEARS, ValueRange.of(1, 12), 'month');

    ChronoField.PROLEPTIC_MONTH = new ChronoField('ProlepticMonth', ChronoUnit.MONTHS, ChronoUnit.FOREVER, ValueRange.of(YearConstants.MIN_VALUE * 12, YearConstants.MAX_VALUE * 12 + 11));

    ChronoField.YEAR_OF_ERA = new ChronoField('YearOfEra', ChronoUnit.YEARS, ChronoUnit.FOREVER, ValueRange.of(1, YearConstants.MAX_VALUE, YearConstants.MAX_VALUE + 1));

    ChronoField.YEAR = new ChronoField('Year', ChronoUnit.YEARS, ChronoUnit.FOREVER, ValueRange.of(YearConstants.MIN_VALUE, YearConstants.MAX_VALUE), 'year');

    ChronoField.ERA = new ChronoField('Era', ChronoUnit.ERAS, ChronoUnit.FOREVER, ValueRange.of(0, 1));

    ChronoField.INSTANT_SECONDS = new ChronoField('InstantSeconds', ChronoUnit.SECONDS, ChronoUnit.FOREVER, ValueRange.of(MIN_SAFE_INTEGER, MAX_SAFE_INTEGER));

    ChronoField.OFFSET_SECONDS = new ChronoField('OffsetSeconds', ChronoUnit.SECONDS, ChronoUnit.FOREVER, ValueRange.of(-18 * 3600, 18 * 3600));

}

