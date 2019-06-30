/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { _ as jodaInternal, DateTimeFormatter } from '@js-joda/core';
// eslint-disable-next-line no-unused-vars
import Locale from '../Locale';

const { assert: { requireNonNull } } = jodaInternal;

export default class LocaleDateTimeFormatter extends DateTimeFormatter {

    /**
     * Returns a copy of this formatter with a new locale.
     * <p>
     * This is used to lookup any part of the formatter needing specific
     * localization, such as the text or localized pattern.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {!Locale} locale  the new locale, not null
     * @return a formatter based on this formatter with the requested locale, not null
     */
    withLocale(locale) {
        requireNonNull(locale, 'locale');
        if (locale.equals(this._locale)) {
            return this;
        }
        return new DateTimeFormatter(this._printerParser, locale, this._decimalStyle, this._resolverStyle, this._resolverFields, this._chrono, this._zone);
    }


}
