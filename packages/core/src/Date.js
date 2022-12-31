/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { Instant } from './Instant';
import { requireInstance, requireNonNull } from './assert';

Date.from = function(instant) {
    requireNonNull(instant, 'instant');
    requireInstance(instant, Instant, 'instant');
    return new Date(instant.toEpochMilli());
};

Date.prototype.toInstant = function() {
    return Instant.ofEpochMilli(this.getTime());
};
