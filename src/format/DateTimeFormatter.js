/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert} from '../assert';

import {DateTimeParseException, NullPointerException} from '../errors';

import {ParsePosition} from './ParsePosition';
import {DateTimeParseContext} from './DateTimeParseContext';
import {DateTimeFormatterBuilder} from './DateTimeFormatterBuilder';
import {SignStyle} from './SignStyle';
import {ResolverStyle} from './ResolverStyle';

import {IsoChronology} from '../chrono/IsoChronology';
import {ChronoField} from '../temporal/ChronoField';

/**
 *
 * <h3>Static properties of Class {@link DateTimeFormatter}</h3>
 *
 * DateTimeFormatter.ISO_LOCAL_DATE
 *
 * DateTimeFormatter.ISO_LOCAL_TIME
 *
 * DateTimeFormatter.ISO_LOCAL_DATE_TIME
 *
 */
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

    locale() {
        return this._locale;
    }

    decimalStyle() {
        return this._decimalStyle;
    }

    chronology() {
        return this._chrono;
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

    /**
     * Fully parses the text producing a temporal object.
     *
     * This parses the entire text producing a temporal object.
     * It is typically more useful to use {@link #parse(CharSequence, TemporalQuery)}.
     * The result of this method is {@code TemporalAccessor} which has been resolved,
     * applying basic validation checks to help ensure a valid date-time.
     *
     * If the parse completes without reading the entire length of the text,
     * or a problem occurs during parsing or merging, then an exception is thrown.
     *
     * @param text  the text to parse, not null
     * @param type the type to extract, not null
 * @return the parsed temporal object, not null
     * @throws DateTimeParseException if unable to parse the requested result
     */
    parse(text, type) {
        assert(text != null, 'text', NullPointerException);
        assert(type != null, 'type', NullPointerException);
        try {
            var builder = this._parseToBuilder(text, null).resolve(this._resolverStyle, this._resolverFields);
            return builder.build(type);
        } catch (ex) {
            if(ex instanceof DateTimeParseException){
                throw ex;
            } else {
                throw this._createError(text, ex);
            }
        }
    }

    _createError(text, ex) {
        var abbr = '';
        if (text.length > 64) {
            abbr = text.subString(0, 64) + '...';
        } else {
            abbr = text;
        }
        return new DateTimeParseException('Text \'' + abbr + '\' could not be parsed: ' + ex.message, text, 0, ex);
    }


    /**
     * Parses the text to a builder.
     * <p>
     * This parses to a {@code DateTimeBuilder} ensuring that the text is fully parsed.
     * This method throws {@link DateTimeParseException} if unable to parse, or
     * some other {@code DateTimeException} if another date/time problem occurs.
     *
     * @param text  the text to parse, not null
     * @param position  the position to parse from, updated with length parsed
     *  and the index of any error, null if parsing whole string
     * @return the engine representing the result of the parse, not null
     * @throws DateTimeParseException if the parse fails
     */
    _parseToBuilder(text, position) {
        var pos = (position != null ? position : new ParsePosition(0));
        var result = this._parseUnresolved0(text, pos);
        if (result == null || pos.getErrorIndex() >= 0 || (position == null && pos.getIndex() < text.length)) {
            var abbr = '';
            if (text.length > 64) {
                abbr = text.substr(0, 64).toString() + '...';
            } else {
                abbr = text;
            }
            if (pos.getErrorIndex() >= 0) {
                throw new DateTimeParseException('Text \'' + abbr + '\' could not be parsed at index ' +
                        pos.getErrorIndex(), text, pos.getErrorIndex());
            } else {
                throw new DateTimeParseException('Text \'' + abbr + '\' could not be parsed, unparsed text found at index ' +
                        pos.getIndex(), text, pos.getIndex());
            }
        }
        return result.toBuilder();
    }

    /**
     * Parses the text using this formatter, without resolving the result, intended
     * for advanced use cases.
     * <p>
     * Parsing is implemented as a two-phase operation.
     * First, the text is parsed using the layout defined by the formatter, producing
     * a {@code Map} of field to value, a {@code ZoneId} and a {@code Chronology}.
     * Second, the parsed data is <em>resolved</em>, by validating, combining and
     * simplifying the various fields into more useful ones.
     * This method performs the parsing stage but not the resolving stage.
     * <p>
     * The result of this method is {@code TemporalAccessor} which represents the
     * data as seen in the input. Values are not validated, thus parsing a date string
     * of '2012-00-65' would result in a temporal with three fields - year of '2012',
     * month of '0' and day-of-month of '65'.
     * <p>
     * The text will be parsed from the specified start {@code ParsePosition}.
     * The entire length of the text does not have to be parsed, the {@code ParsePosition}
     * will be updated with the index at the end of parsing.
     * <p>
     * Errors are returned using the error index field of the {@code ParsePosition}
     * instead of {@code DateTimeParseException}.
     * The returned error index will be set to an index indicative of the error.
     * Callers must check for errors before using the context.
     * <p>
     * If the formatter parses the same field more than once with different values,
     * the result will be an error.
     * <p>
     * This method is intended for advanced use cases that need access to the
     * internal state during parsing. Typical application code should use
     * {@link #parse(CharSequence, TemporalQuery)} or the parse method on the target type.
     *
     * @param text  the text to parse, not null
     * @param position  the position to parse from, updated with length parsed
     *  and the index of any error, not null
     * @return the parsed text, null if the parse results in an error
     * @throws DateTimeException if some problem occurs during parsing
     * @throws IndexOutOfBoundsException if the position is invalid
     */
    parseUnresolved(text, position) {
        return this._parseUnresolved0(text, position);
    }

    _parseUnresolved0(text, position) {
        assert(text != null, 'text', NullPointerException);
        assert(position != null, 'position', NullPointerException);
        var context = new DateTimeParseContext(this);
        var pos = position.getIndex();
        pos = this._printerParser.parse(context, text, pos);
        if (pos < 0) {
            position.setErrorIndex(~pos);  // index not updated from input
            return null;
        }
        position.setIndex(pos);  // errorIndex not updated from input
        return context.toParsed();
    }

    /**
     * Returns the formatter as a composite printer parser.
     *
     * @param {boolean} optional  whether the printer/parser should be optional
     * @return {CompositePrinterParser} the printer/parser, not null
     */
    toPrinterParser(optional) {
        return this._printerParser.withOptional(optional);
    }

    toString() {
        var pattern = this._printerParser.toString();
        return pattern.indexOf('[') === 0 ? pattern : pattern.substring(1, pattern.length - 1);
    }

}

export function _init() {

    DateTimeFormatter.ISO_LOCAL_DATE = new DateTimeFormatterBuilder()
        .appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
        .appendLiteral('-')
        .appendValue(ChronoField.MONTH_OF_YEAR, 2)
        .appendLiteral('-')
        .appendValue(ChronoField.DAY_OF_MONTH, 2)
        .toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);

    DateTimeFormatter.ISO_LOCAL_TIME = new DateTimeFormatterBuilder()
        .appendValue(ChronoField.HOUR_OF_DAY, 2)
        .appendLiteral(':')
        .appendValue(ChronoField.MINUTE_OF_HOUR, 2)
        .optionalStart()
        .appendLiteral(':')
        .appendValue(ChronoField.SECOND_OF_MINUTE, 2)
        .optionalStart()
        .appendFraction(ChronoField.NANO_OF_SECOND, 0, 9, true)
        .toFormatter(ResolverStyle.STRICT);

    DateTimeFormatter.ISO_LOCAL_DATE_TIME = new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .append(DateTimeFormatter.ISO_LOCAL_DATE)
        .appendLiteral('T')
        .append(DateTimeFormatter.ISO_LOCAL_TIME)
        .toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);

}