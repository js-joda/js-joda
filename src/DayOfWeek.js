/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException, UnsupportedTemporalTypeException, NullPointerException} from './errors';
import {MathUtil} from './MathUtil';
import {assert} from './assert';

import {DateTimeFormatterBuilder} from './format/DateTimeFormatterBuilder';

import {ChronoField} from './temporal/ChronoField';
import {ChronoUnit} from './temporal/ChronoUnit';
import {Temporal} from './temporal/Temporal';
import {TemporalQueries} from './temporal/TemporalQueries';
import {createTemporalQuery} from './temporal/TemporalQuery';

/**
 * <h3>Static properties of Class {@link DayOfWeek}</h3>
 *
 * DayOfWeek.MONDAY,
 * DayOfWeek.TUESDAY,
 * DayOfWeek.WEDNESDAY,
 * DayOfWeek.THURSDAY,
 * DayOfWeek.FRIDAY,
 * DayOfWeek.SATURDAY,
 * DayOfWeek.SUNDAY
 *
 */
export class DayOfWeek extends Temporal {

    /**
     *
     * @param {number} ordinal
     * @param {string} name
     * @private
     */
    constructor(ordinal, name){
        super();
        this._ordinal = ordinal;
        this._name = name;
    }

    /**
     *
     * @returns {number}
     */
    ordinal(){
        return this._ordinal;
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
     * @returns {DayOfWeek[]}
     */
    static values() {
        return ENUMS.slice();
    }

    /**
     *
     * @param {string} name
     * @returns {DayOfWeek}
     */
    static valueOf(name) {
        for(var ordinal=0; ordinal < ENUMS.length; ordinal++){
            if(ENUMS[ordinal].name() === name){
                break;
            }
        }
        return DayOfWeek.of(ordinal+1);
    }
    
    /**
     * Obtains an instance of {@code DayOfWeek} from an {@code int} value.
     * <p>
     * {@code DayOfWeek} is an enum representing the 7 days of the week.
     * This factory allows the enum to be obtained from the {@code int} value.
     * The {@code int} value follows the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
     *
     * @param {!number} dayOfWeek  the day-of-week to represent, from 1 (Monday) to 7 (Sunday)
     * @return {DayOfWeek} the day-of-week singleton, not null
     * @throws DateTimeException if the day-of-week is invalid
     */
    static of(dayOfWeek) {
        if (dayOfWeek < 1 || dayOfWeek > 7) {
            throw new DateTimeException('Invalid value for DayOfWeek: ' + dayOfWeek);
        }
        return ENUMS[dayOfWeek - 1];
    }
    
    /**
     * Obtains an instance of {@code DayOfWeek} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code DayOfWeek}.
     * <p>
     * The conversion extracts the {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} field.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used as a query via method reference, {@code DayOfWeek::from}.
     *
     * @param {TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {DayOfWeek} the day-of-week, not null
     * @throws DateTimeException if unable to convert to a {@code DayOfWeek}
     */
    static from(temporal) {
        assert(temporal != null, 'temporal', NullPointerException);
        if (temporal instanceof DayOfWeek) {
            return temporal;
        }
        try {
            return DayOfWeek.of(temporal.get(ChronoField.DAY_OF_WEEK));
        } catch (ex) {
            if(ex instanceof DateTimeException) {
                throw new DateTimeException('Unable to obtain DayOfWeek from TemporalAccessor: ' +
                    temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''), ex);
            } else {
                throw ex;
            }
        }
    }

    /**
     * Gets the day-of-week {@code int} value.
     * <p>
     * The values are numbered following the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
     * See {@link WeekFields#dayOfWeek} for localized week-numbering.
     *
     * @return {number} the day-of-week, from 1 (Monday) to 7 (Sunday)
     */
    value() {
        return this._ordinal + 1;
    }

    /**
     * Gets the textual representation, such as 'Mon' or 'Friday'.
     * <p>
     * This returns the textual name used to identify the day-of-week.
     * The parameters control the length of the returned text and the locale.
     * <p>
     * If no textual mapping is found then the {@link #getValue() numeric value} is returned.
     *
     * @param {TextStyle} style - the length of the text required, not null
     * @param {Locale} locale - the locale to use, not null
     * @return {string} the text value of the day-of-week, not null
     */
    getDisplayName(style, locale) {
        return new DateTimeFormatterBuilder().appendText(ChronoField.DAY_OF_WEEK, style).toFormatter(locale).format(this);
    }

    /**
     * Checks if the specified field is supported.
     * <p>
     * This checks if this day-of-week can be queried for the specified field.
     * If false, then calling the {@link #range(TemporalField) range} and
     * {@link #get(TemporalField) get} methods will throw an exception.
     * <p>
     * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then
     * this method returns true.
     * All other {@code ChronoField} instances will return false.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField} field - the field to check, null returns false
     * @return {boolean} true if the field is supported on this day-of-week, false if not
     */
    isSupported(field) {
        if (field instanceof ChronoField) {
            return field === ChronoField.DAY_OF_WEEK;
        }
        return field != null && field.isSupportedBy(this);
    }

    /**
     * Gets the range of valid values for the specified field.
     * <p>
     * The range object expresses the minimum and maximum valid values for a field.
     * This day-of-week is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
     * range of the day-of-week, from 1 to 7, will be returned.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field - the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    range(field) {
        if (field === ChronoField.DAY_OF_WEEK) {
            return field.range();
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.rangeRefinedBy(this);
    }

    /**
     * Gets the value of the specified field from this day-of-week as an {@code int}.
     * <p>
     * This queries this day-of-week for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
     * value of the day-of-week, from 1 to 7, will be returned.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field - the field to get, not null
     * @return {number} the value for the field, within the valid range of values
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws DateTimeException if the range of valid values for the field exceeds an {@code int}
     * @throws DateTimeException if the value is outside the range of valid values for the field
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        if (field === ChronoField.DAY_OF_WEEK) {
            return this.value();
        }
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this day-of-week as a {@code long}.
     * <p>
     * This queries this day-of-week for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
     * value of the day-of-week, from 1 to 7, will be returned.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field - the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        if (field === ChronoField.DAY_OF_WEEK) {
            return this.value();
        } else if (field instanceof ChronoField) {
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns the day-of-week that is the specified number of days after this one.
     * <p>
     * The calculation rolls around the end of the week from Sunday to Monday.
     * The specified period may be negative.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days - the days to add, positive or negative
     * @return {DayOfWeek} the resulting day-of-week, not null
     */
    plus(days) {
        var amount = MathUtil.floorMod(days, 7);
        return ENUMS[MathUtil.floorMod(this._ordinal + (amount + 7), 7)];
    }

    /**
     * Returns the day-of-week that is the specified number of days before this one.
     * <p>
     * The calculation rolls around the start of the year from Monday to Sunday.
     * The specified period may be negative.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days - the days to subtract, positive or negative
     * @return {DayOfWeek} the resulting day-of-week, not null
     */
    minus(days) {
        return this.plus(-1 * MathUtil.floorMod(days, 7));
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this day-of-week using the specified query.
     * <p>
     * This queries this day-of-week using the specified query strategy object.
     * The {@code TemporalQuery} object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * <p>
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
     * specified query passing {@code this} as the argument.
     *
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query (defined by the query)
     * @throws ArithmeticException if numeric overflow occurs (defined by the query)
     */
    query(query) {
        if (query === TemporalQueries.precision()) {
            return ChronoUnit.DAYS;
        } else if (query === TemporalQueries.localDate() || query === TemporalQueries.localTime() || query === TemporalQueries.chronology() ||
                query === TemporalQueries.zone() || query === TemporalQueries.zoneId() || query === TemporalQueries.offset()) {
            return null;
        }
        assert(query != null, 'query', NullPointerException);
        return query.queryFrom(this);
    }

    /**
     * Adjusts the specified temporal object to have this day-of-week.
     * <p>
     * This returns a temporal object of the same observable type as the input
     * with the day-of-week changed to be the same as this.
     * <p>
     * The adjustment is equivalent to using {@link Temporal#with(TemporalField, long)}
     * passing {@link ChronoField#DAY_OF_WEEK} as the field.
     * Note that this adjusts forwards or backwards within a Monday to Sunday week.
     * See {@link WeekFields#dayOfWeek} for localized week start days.
     * See {@link TemporalAdjusters} for other adjusters
     * with more control, such as {@code next(MONDAY)}.
     * <p>
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal#with(TemporalAdjuster)}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisDayOfWeek.adjustInto(temporal);
     *   temporal = temporal.with(thisDayOfWeek);
     * </pre>
     * <p>
     * For example, given a date that is a Wednesday, the following are output:
     * <pre>
     *   dateOnWed.with(MONDAY);     // two days earlier
     *   dateOnWed.with(TUESDAY);    // one day earlier
     *   dateOnWed.with(WEDNESDAY);  // same date
     *   dateOnWed.with(THURSDAY);   // one day later
     *   dateOnWed.with(FRIDAY);     // two days later
     *   dateOnWed.with(SATURDAY);   // three days later
     *   dateOnWed.with(SUNDAY);     // four days later
     * </pre>
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAdjusters} temporal  the target object to be adjusted, not null
     * @return {Temporal} the adjusted object, not null
     * @throws DateTimeException if unable to make the adjustment
     * @throws ArithmeticException if numeric overflow occurs
     */
    adjustInto(temporal) {
        return temporal.with(ChronoField.DAY_OF_WEEK, this.value());
    }

    /**
     *
     * @returns {boolean}
     */
    equals(other){
        return this === other;
    }

    /**
     *
     * @returns {string}
     */
    toString(){
        return this._name;
    }
}

var ENUMS;

export function _init() {
    DayOfWeek.MONDAY = new DayOfWeek(0, 'MONDAY');
    DayOfWeek.TUESDAY = new DayOfWeek(1, 'TUESDAY');
    DayOfWeek.WEDNESDAY = new DayOfWeek(2, 'WEDNESDAY');
    DayOfWeek.THURSDAY = new DayOfWeek(3, 'THURSDAY');
    DayOfWeek.FRIDAY = new DayOfWeek(4, 'FRIDAY');
    DayOfWeek.SATURDAY = new DayOfWeek(5, 'SATURDAY');
    DayOfWeek.SUNDAY = new DayOfWeek(6, 'SUNDAY');

    DayOfWeek.FROM = createTemporalQuery('DayOfWeek.FROM', (temporal) => {
        return DayOfWeek.from(temporal);
    });

    ENUMS = [
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY
    ];
}
