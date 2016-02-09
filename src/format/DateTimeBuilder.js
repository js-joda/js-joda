/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException} from '../errors';

import {EnumMap} from './EnumMap';
import {IsoChronology} from '../chrono/IsoChronology';
import {ChronoLocalDate} from '../chrono/ChronoLocalDate';
import {ChronoField} from '../temporal/ChronoField';
import {TemporalAccessor} from '../temporal/TemporalAccessor';
import {TemporalQueries} from '../temporal/TemporalQueries';

import {LocalTime} from '../LocalTime';
import {LocalDate} from '../LocalDate';

//import {ZoneOffset} from '../ZoneOffset';

/**
 * Builder that can holds date and time fields and related date and time objects.
 * <p>
 * The builder is used to hold onto different elements of date and time.
 * It is designed as two separate maps:
 * <p><ul>
 * <li>from {@link TemporalField} to {@code long} value, where the value may be
 * outside the valid range for the field
 * <li>from {@code Class} to {@link TemporalAccessor}, holding larger scale objects
 * like {@code LocalDateTime}.
 * </ul><p>
 *
 * <h3>Specification for implementors</h3>
 * This class is mutable and not thread-safe.
 * It should only be used from a single thread.
 */
export class DateTimeBuilder extends TemporalAccessor {
    constructor(){
        super();

        /**
         * The map of other fields.
         */
        this.fieldValues = new EnumMap();
        /**
         * The chronology.
         */
        this.chrono = null;
        /**
         * The zone.
         */
        this.zone = null;
        /**
         * The date.
         */
        this.date = null;
        /**
         * The time.
         */
        this.time = null;
        /**
         * The leap second flag.
         */
        this.leapSecond = false;
        /**
         * The excess days.
         */
        this.excessDays = null;
    }

    /**
     * Resolves the builder, evaluating the date and time.
     * <p>
     * This examines the contents of the builder and resolves it to produce the best
     * available date and time, throwing an exception if a problem occurs.
     * Calling this method changes the state of the builder.
     *
     * @param resolverStyle how to resolve
     * @param resolverFields
 * @return {@code this}, for method chaining
     */
    resolve(resolverStyle, resolverFields) {
        if (resolverFields != null) {
            this.fieldValues.retainAll(resolverFields);
        }
        // handle standard fields
        // this._mergeInstantFields();
        this._mergeDate(resolverStyle);
        //mergeTime(resolverStyle);
        //if (resolveFields(resolverStyle)) {
        //    mergeInstantFields();
        //    mergeDate(resolverStyle);
        //    mergeTime(resolverStyle);
        //}
        //resolveTimeInferZeroes(resolverStyle);
        //crossCheck();
        //if (excessDays != null && excessDays.isZero() == false && date != null && time != null) {
        //    date = date.plus(excessDays);
        //    excessDays = Period.ZERO;
        //}
        //resolveFractional();
        //resolveInstant();
        return this;
    }

    _mergeDate(resolverStyle) {
        //if (this.chrono instanceof IsoChronology) {
        this._checkDate(IsoChronology.INSTANCE.resolveDate(this.fieldValues, resolverStyle));
        //} else {
        //    if (this.fieldValues.containsKey(ChronoField.EPOCH_DAY)) {
        //        this._checkDate(LocalDate.ofEpochDay(this.fieldValues.remove(ChronoField.EPOCH_DAY)));
        //        return;
        //    }
        //}
    }

    _checkDate(date) {
        if (date != null) {
            this._addObject(date);
            for (let field in this.fieldValues.keySet()) {
                if (field instanceof ChronoField) {
                    if (field.isDateBased()) {
                        var val1;
                        try {
                            val1 = date.getLong(field);
                        } catch (ex) {
                            if(ex instanceof DateTimeException){
                                continue;
                            } else {
                                throw ex;
                            }
                        }
                        var val2 = this.fieldValues.get(field);
                        if (val1 !== val2) {
                            throw new DateTimeException('Conflict found: Field ' + field + ' ' + val1 + ' differs from ' + field + ' ' + val2 + ' derived from ' + date);
                        }
                    }
                }
            }
        }
    }

    _addObject(dateOrTime) {
        if (dateOrTime instanceof ChronoLocalDate){
            this.date = dateOrTime;
        } else if (dateOrTime instanceof LocalTime){
            this.time = dateOrTime;
        }
    }

    /**
     * Builds the specified type from the values in this builder.
     *
     * This attempts to build the specified type from this builder.
     * If the builder cannot return the type, an exception is thrown.
     *
     * @param type  the type to invoke {@code from} on, not null
     * @return the extracted value, not null
     * @throws DateTimeException if an error occurs
     */
    build(type) {
        return type.queryFrom(this);
    }

    query(query) {
        if (query === TemporalQueries.zoneId()) {
            return this.zone;
        } else if (query === TemporalQueries.chronology()) {
            return this.chrono;
        } else if (query === TemporalQueries.localDate()) {
            return this.date != null ? LocalDate.from(this.date) : null;
        } else if (query === TemporalQueries.localTime()) {
            return this.time;
        } else if (query === TemporalQueries.zone() || query === TemporalQueries.offset()) {
            return query.queryFrom(this);
        } else if (query === TemporalQueries.precision()) {
            return null;  // not a complete date/time
        }
        // inline TemporalAccessor.super.query(query) as an optimization
        // non-JDK classes are not permitted to make this optimization
        return query.queryFrom(this);
    }

}

