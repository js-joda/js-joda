/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { IllegalArgumentException } from './errors';

import { ZoneId } from './ZoneId';
import { Instant } from './Instant';
import { ChronoField, LocalTime, Temporal, TemporalQueries } from './js-joda';
import { requireInstance } from './assert';

/**
 * Converts `Temporal` to `Date` or `number` of milliseconds since the epoch.
 */
class ToNativeJsConverter {
    /**
     * @param {!Temporal} temporal - a `Temporal` instance
     * @param {ZoneId} [zone] - time zone used during conversion, if necessary, default to `ZoneId.systemDefault()`
     */
    constructor(temporal, zone) {
        if (temporal.isSupported(ChronoField.INSTANT_SECONDS) && temporal.isSupported(ChronoField.NANO_OF_SECOND)) {
            this.instant = Instant.from(temporal);
        } else if (temporal.isSupported(ChronoField.EPOCH_DAY)) {
            const localDate = temporal.query(TemporalQueries.localDate());
            const localTime = temporal.query(TemporalQueries.localTime()) || LocalTime.MIDNIGHT;
            const zoneId = temporal.query(TemporalQueries.zone()) || zone || ZoneId.systemDefault();
            this.instant = localDate.atTime(localTime).atZone(zoneId).toInstant();
        } else {
            throw new IllegalArgumentException(`Unable to create converter for ${temporal}`);
        }
    }

    /**
     * @returns {Date}
     */
    toDate() {
        return new Date(this.instant.toEpochMilli());
    }

    /**
     * @returns {number}
     */
    toEpochMilli() {
        return this.instant.toEpochMilli();
    }
}

/**
 * Converts `Temporal` to `Date` or `number` of milliseconds since the epoch.
 * 
 * If conversion requires time zone, the passed `zone` will be used, default to `ZoneId.systemDefault()`.
 * 
 * If conversion requires local time and none is available, the time at start of the given day will be used.
 * 
 * @example
 * convert(instant).toDate() // returns a Date
 * convert(localDate, zone).toEpochMilli() // returns the epochMillis
 *
 * @param {!Temporal} temporal - a `Temporal` instance
 * @param {ZoneId} [zone] - time zone used during conversion, if necessary; default to `ZoneId.systemDefault()`
 * @returns {ToNativeJsConverter} converter producing `Date` or `number` of milliseconds since the epoch
 * @throws IllegalArgumentException if `temporal` is not a `Temporal` or `zone` is not a `ZoneId` instance
 * @throws IllegalArgumentException if conversion of `temporal` is not possible
 */
export function convert(temporal, zone) {
    if (zone === undefined) {
        requireInstance(temporal, Temporal, 'temporal');
        return new ToNativeJsConverter(temporal);
    } else {
        requireInstance(temporal, Temporal, 'temporal');
        requireInstance(zone, ZoneId, 'zone');
        return new ToNativeJsConverter(temporal, zone);
    }
}
