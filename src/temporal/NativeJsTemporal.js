/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert, requireNonNull} from '../assert';
import {UnsupportedTemporalTypeException} from '../errors';

import {Instant} from '../Instant';
import {LocalDate} from '../LocalDate';
import {LocalTime} from '../LocalTime';
import {MathUtil} from '../MathUtil';
import {ZoneOffset} from '../ZoneOffset';

import {ChronoField} from './ChronoField';
import {TemporalQueries} from './TemporalQueries';
import {TemporalAccessor} from './TemporalAccessor';

/**
 * A wrapper around a native javascript Date instance that
 * implements TemporalAccessor functionality
 */
class NativeJsTemporal extends TemporalAccessor {

    /**
     *
     * @param {!(Date|moment)} date - a javascript Date or a moment instance
     */
    constructor(date){
        super();
        if(date instanceof Date) {
            this._epochMilli = date.getTime();
            return;
        } else if(typeof date.toDate === 'function' &&  date.toDate() instanceof Date) {
            // it's a moment
            this._epochMilli = date.toDate().getTime();
            return;
        }
        assert(false, 'date must be either a javascript date or a moment');
    }

    /**
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query
     */
    query(query) {
        requireNonNull(query, 'query');
        if (query === TemporalQueries.localDate()) {
            return LocalDate.ofInstant(Instant.ofEpochMilli(this._epochMilli), ZoneOffset.UTC);
        } else if(query === TemporalQueries.localTime()){
            return LocalTime.ofInstant(Instant.ofEpochMilli(this._epochMilli), ZoneOffset.UTC);
        } else if(query === TemporalQueries.zone()){
            return LocalTime.ofInstant(Instant.ofEpochMilli(this._epochMilli), ZoneOffset.UTC);
        }
        return super.query(query);
    }

    /**
     *
     * @param {TemporalField} field
     * @returns {number}
     */
    get(field) {
        return this.getLong(field);
    }

    /**
     *
     * @param {!TemporalField} field
     * @returns {number}
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.NANO_OF_SECOND: return MathUtil.floorMod(this._epochMilli, 1000) * 1000000;
                case ChronoField.INSTANT_SECONDS: return MathUtil.floorDiv(this._epochMilli, 1000);
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.getFrom(this);
    }

}


export function nativeJs(date){
    return new NativeJsTemporal(date);
}