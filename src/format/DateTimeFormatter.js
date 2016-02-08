/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert} from '../assert';

export class DateTimeFormatter {

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param printerParser  the printer/parser to use, not null
     * @param locale  the locale to use, not null
     * @param decimalStyle  the decimal style to use, not null
     * @param resolverStyle  the resolver style to use, not null
     * @param resolverFields  the fields to use during resolving, null for all fields
     * @param chrono  the chronology to use, null for no override
     * @param zone  the zone to use, null for no override
     */
    constructor(printerParser, locale, decimalStyle, resolverStyle, resolverFields, chrono, zone) {
        assert(printerParser != null);
        assert(decimalStyle != null);
        assert(resolverStyle != null);
        /**
         * The printer and/or parser to use, not null.
         */
        this._printerParser = printerParser;
        /**
         * The locale to use for formatting. // nyi
         */
        this._locale = locale;
        /**
         * The symbols to use for formatting, not null.
         */
        this._decimalStyle = decimalStyle;
        /**
         * The resolver style to use, not null.
         */
        this._resolverStyle = resolverStyle;
        /**
         * The fields to use in resolving, null for all fields.
         */
        this._resolverFields = resolverFields;
        /**
         * The chronology to use for formatting, null for no override.
         */
        this._chrono = chrono;
        /**
         * The zone to use for formatting, null for no override. // nyi
         */
        this._zone = zone;
    }

    /**
     * Returns a copy of this formatter with a new override chronology.
     *
     * This returns a formatter with similar state to this formatter but
     * with the override chronology set.
     * By default, a formatter has no override chronology, returning null.
     *
     * If an override is added, then any date that is printed or parsed will be affected.
     *
     * When printing, if the {@code Temporal} object contains a date then it will
     * be converted to a date in the override chronology.
     * Any time or zone will be retained unless overridden.
     * The converted result will behave in a manner equivalent to an implementation
     * of {@code ChronoLocalDate},{@code ChronoLocalDateTime} or {@code ChronoZonedDateTime}.
     *
     * When parsing, the override chronology will be used to interpret the
     * {@linkplain ChronoField fields} into a date unless the
     * formatter directly parses a valid chronology.
     *
     * This instance is immutable and unaffected by this method call.
     *
     * @param chrono  the new chronology, not null
     * @return a formatter based on this formatter with the requested override chronology, not null
     */
    withChronology(chrono) {
        if (this._chrono != null && this._chrono.equals(chrono)) {
            return this;
        }
        return new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle,
            this._resolverStyle, this._resolverFields, chrono, this._zone);
    }

    /**
     * not yet supported
     * @returns {DateTimeFormatter}
     */
    withLocal(){
        return this;
    }

    toString() {
        var pattern = this._printerParser.toString();
        return pattern.indexOf('[') === 0 ? pattern : pattern.substring(1, pattern.length - 1);
    }

}

