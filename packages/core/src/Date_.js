/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { requireInstance, requireNonNull } from './assert';
import { Instant } from './js-joda';

export class Date$ {
    /**
     * Convert an `Instant` object to a `Date`.
     * @param {!Instant} instant - an `Instant` object
     * @returns {Date} a `Date` object corresponding to given `instant`
     */
    static from(instant) {
        requireNonNull(instant, 'instant');
        requireInstance(instant, Instant, 'instant');
        return new Date(instant.toEpochMilli());
    }

    /**
     * Converts a `Date` object to an `Instant`.
     * @param {!Date} date - a `Date`
     * @returns {Instant} - an `Instant` corresponding to given `date`
     */
    static toInstant(date) {
        requireNonNull(date, 'date');
        requireInstance(date, Date, 'date');
        return Instant.ofEpochMilli(date.getTime());
    }

    /**
     * @private
     */
    constructor() {
    }
}
