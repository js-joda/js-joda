/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { requireNonNull } from './assert';
import { Instant, ZoneId } from './js-joda';

/**
 * Creates ZonedDateTime from a javascript Date or a moment instance.
 * @param {!(Date|moment)} date - a javascript Date or a moment instance
 * @param {ZoneId} [zone = ZoneId.systemDefault()] - the zone of the returned ZonedDateTime, defaults to ZoneId.systemDefault()
 * @returns {ZonedDateTime}
 */
export function nativeJs(date, zone = ZoneId.systemDefault()) {
    requireNonNull(date, 'date');
    requireNonNull(zone, 'zone');
    return Instant.ofEpochMilli(date.valueOf()).atZone(zone);
}
