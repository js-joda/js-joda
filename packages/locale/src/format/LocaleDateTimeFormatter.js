/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    DateTimeFormatter,
    ChronoField,
    ResolverStyle,
    IsoChronology,
} from '@js-joda/core';
// eslint-disable-next-line no-unused-vars
import Locale from '../Locale';
import CldrDateTimeFormatterBuilder from './cldr/CldrDateTimeFormatterBuilder';

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

export function _init() {
    const dow = {
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        7: 'Sun',
    };

    const moy = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
    };

    LocaleDateTimeFormatter.RFC_1123_DATE_TIME = new CldrDateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .parseLenient()
        .optionalStart()
        .appendText(ChronoField.DAY_OF_WEEK, dow)
        .appendLiteral(', ')
        .optionalEnd()
        .appendValue(ChronoField.DAY_OF_MONTH, 2)
        .appendLiteral(' ')
        .appendText(ChronoField.MONTH_OF_YEAR, moy)
        .appendLiteral(' ')
        .appendValue(ChronoField.YEAR, 4)  // 2 digit year not handled
        .appendLiteral(' ')
        .appendValue(ChronoField.HOUR_OF_DAY, 2)
        .appendLiteral(':')
        .appendValue(ChronoField.MINUTE_OF_HOUR, 2)
        .optionalStart()
        .appendLiteral(':')
        .appendValue(ChronoField.SECOND_OF_MINUTE, 2)
        .optionalEnd()
        .appendLiteral(' ')
        .appendZoneId()
        .toFormatter(ResolverStyle.SMART).withChronology(IsoChronology.INSTANCE);
}
