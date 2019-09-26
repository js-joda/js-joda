/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/* eslint-disable no-param-reassign */

import CldrDateTimeFormatterBuilder from './format/cldr/CldrDateTimeFormatterBuilder';
import LocaleDateTimeFormatter from './format/LocaleDateTimeFormatter';

import './_init';

/**
 * plugin Function, call using js-jodas use()
 *
 * @param jsJoda
 */
export default function (jsJoda) {
    // inject all prototype properties (except constructor) from CldrDateTimeFormatterBuilder into DateTimeFormatterBuilder
    Object.getOwnPropertyNames(CldrDateTimeFormatterBuilder.prototype).forEach((prop) => {
        if (prop !== 'constructor') {
            jsJoda.DateTimeFormatterBuilder.prototype[prop] = CldrDateTimeFormatterBuilder.prototype[prop];
        }
    });
    // inject all prototype properties (except constructor) from LocaleDateTimeFormatter into DateTimeFormatter
    Object.getOwnPropertyNames(LocaleDateTimeFormatter.prototype).forEach((prop) => {
        if (prop !== 'constructor') {
            jsJoda.DateTimeFormatter.prototype[prop] = LocaleDateTimeFormatter.prototype[prop];
        }
    });
}
