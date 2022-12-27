/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { requireNonNull } from './assert';
import { IllegalArgumentException } from './errors';
import { Instant, ZoneId } from './js-joda';

/**
 * Creates ZonedDateTime from a javascript Date or a moment instance.
 * @param {!(Date|moment)} date - a javascript Date or a moment instance
 * @param {ZoneId} [zone = ZoneId.systemDefault()] - the zone of the temporal, defaults to ZoneId.systemDefault()
 * @returns {ZonedDateTime}
 */
export function nativeJs(date, zone = ZoneId.systemDefault()) {
    requireNonNull(date, 'date');
    requireNonNull(zone, 'zone');
    switch (date.constructor.name) {
        case 'Date':
            return Instant.ofEpochMilli(date.getTime()).atZone(zone);
        case 'Moment':
            return Instant.ofEpochMilli(date.valueOf()).atZone(zone);
        default:
            throw new IllegalArgumentException('date must be a javascript Date or a moment instance');
    }
}
