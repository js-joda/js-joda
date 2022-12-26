/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { requireInstance, requireNonNull } from '../assert';
import { IllegalArgumentException } from '../errors';
import { Instant } from '../js-joda';
import { ZoneId } from '../ZoneId';
import { TemporalAccessor } from './TemporalAccessor';
import { TemporalField } from './TemporalField';
import { TemporalQuery } from './TemporalQuery';

/**
 * TemporalAccessor implementation that can be created from javascript Date or moment instance.
 */
class NativeJsTemporal extends TemporalAccessor {
    /**
     * @param {!(Date|moment)} date - a javascript Date or a moment instance
     * @param {ZoneId} [zoneId = ZoneId.systemDefault()] - the zone of the temporal, defaults to ZoneId.systemDefault()
     * @private
     */
    constructor(date, zone = ZoneId.systemDefault()) {
        super();
        requireNonNull(date, 'date');
        requireNonNull(zone, 'zone');
        switch (date.constructor.name) {
            case 'Date':
                this._delegate = Instant.ofEpochMilli(date.getTime()).atZone(zone);
                break;
            case 'Moment':
                this._delegate = Instant.ofEpochMilli(date.valueOf()).atZone(zone);
                break;
            default:
                throw new IllegalArgumentException('date must be either a javascript date or a moment');
        }
    }

    /**
     * @param {!TemporalQuery} query - the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query
     * @override
     */
    query(query) {
        requireNonNull(query, 'query');
        requireInstance(query, TemporalQuery, 'query');
        return this._delegate.query(query);
    }

    /**
     * @param {!TemporalField} field
     * @returns {number}
     * @override
     */
    get(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this._delegate.get(field);
    }

    /**
     * @param {!TemporalField} field
     * @returns {number}
     * @override
     */
    getLong(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this._delegate.getLong(field);
    }

    /**
     * @param {!TemporalField} field
     * @returns {boolean}
     * @override
     */
    isSupported(field) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        return this._delegate.isSupported(field);
    }
}

/**
 * @param {!(Date|moment)} date - a javascript Date or a moment instance
 * @param {ZoneId} [zone = ZoneId.systemDefault()] - the zone of the temporal, defaults to ZoneId.systemDefault()
 * @returns {NativeJsTemporal}
 */
export function nativeJs(date, zone) {
    return new NativeJsTemporal(date, zone);
}
