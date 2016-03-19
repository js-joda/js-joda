/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert, requireNonNull} from '../assert';
import {ArithmeticException, DateTimeException, IllegalArgumentException, IllegalStateException} from '../errors';

import {Enum} from '../Enum';
import {ZoneIdFactory} from '../ZoneIdFactory';
import {LocalDateTime} from '../LocalDateTime';
import {ZoneOffset} from '../ZoneOffset';
import {ZoneId} from '../ZoneId';
import {ChronoField} from '../temporal/ChronoField';
import {TemporalQueries} from '../temporal/TemporalQueries';

import {DateTimeFormatter} from './DateTimeFormatter';
import {DecimalStyle} from './DecimalStyle';
import {SignStyle} from './SignStyle';
import {ResolverStyle} from './ResolverStyle';

const MAX_WIDTH = 15; // can't parse all numbers with more then 15 digits in javascript

export class DateTimeFormatterBuilder {

    /**
     * Constructs a new instance of the builder.
     *
     * @param {DateTimeFormatterBuilder} parent  the parent builder, not null
     * @param {boolean} optional  whether the formatter is optional, not null
     */
    constructor(parent=null, optional=false){
        /**
         * The currently active builder, used by the outermost builder.
         */
        this._active = this;
        /**
         * The parent builder, null for the outermost builder.
         */
        this._parent = parent;

        /**
         * The list of printers that will be used.
         */
        this._printerParsers = [];

        /**
         * Whether this builder produces an optional formatter.
         */
        this._optional = optional;
        /**
         * The width to pad the next field to.
         */
        this._padNextWidth = 0;

        /**
         * The character to pad the next field with.
         */
        this._padNextChar = null;

        /**
         * The index of the last variable width value parser.
         */
        this._valueParserIndex = -1;
    }

    /**
     * Changes the parse style to be case sensitive for the remainder of the formatter.
     * 
     * Parsing can be case sensitive or insensitive - by default it is case sensitive.
     * This method allows the case sensitivity setting of parsing to be changed.
     * 
     * Calling this method changes the state of the builder such that all
     * subsequent builder method calls will parse text in case sensitive mode.
     * See {@link #parseCaseInsensitive} for the opposite setting.
     * The parse case sensitive/insensitive methods may be called at any point
     * in the builder, thus the parser can swap between case parsing modes
     * multiple times during the parse.
     * 
     * Since the default is case sensitive, this method should only be used after
     * a previous call to {@code #parseCaseInsensitive}.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    parseCaseSensitive() {
        this._appendInternalPrinterParser(SettingsParser.SENSITIVE);
        return this;
    }

    /**
     * Changes the parse style to be case insensitive for the remainder of the formatter.
     * 
     * Parsing can be case sensitive or insensitive - by default it is case sensitive.
     * This method allows the case sensitivity setting of parsing to be changed.
     * 
     * Calling this method changes the state of the builder such that all
     * subsequent builder method calls will parse text in case sensitive mode.
     * See {@link #parseCaseSensitive()} for the opposite setting.
     * The parse case sensitive/insensitive methods may be called at any point
     * in the builder, thus the parser can swap between case parsing modes
     * multiple times during the parse.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    parseCaseInsensitive() {
        this._appendInternalPrinterParser(SettingsParser.INSENSITIVE);
        return this;
    }

    //-----------------------------------------------------------------------
    /**
     * Changes the parse style to be strict for the remainder of the formatter.
     * 
     * Parsing can be strict or lenient - by default its strict.
     * This controls the degree of flexibility in matching the text and sign styles.
     * 
     * When used, this method changes the parsing to be strict from this point onwards.
     * As strict is the default, this is normally only needed after calling {@link #parseLenient()}.
     * The change will remain in force until the end of the formatter that is eventually
     * constructed or until {@code parseLenient} is called.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    parseStrict() {
        this._appendInternalPrinterParser(SettingsParser.STRICT);
        return this;
    }

    /**
     * Changes the parse style to be lenient for the remainder of the formatter.
     * Note that case sensitivity is set separately to this method.
     * 
     * Parsing can be strict or lenient - by default its strict.
     * This controls the degree of flexibility in matching the text and sign styles.
     * Applications calling this method should typically also call {@link #parseCaseInsensitive()}.
     * 
     * When used, this method changes the parsing to be strict from this point onwards.
     * The change will remain in force until the end of the formatter that is eventually
     * constructed or until {@code parseStrict} is called.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    parseLenient() {
        this._appendInternalPrinterParser(SettingsParser.LENIENT);
        return this;
    }

    /**
     * appendValue function overloading
     */
    appendValue(){
        if(arguments.length === 1){
            return this._appendValue1.apply(this, arguments);
        } else if(arguments.length === 2){
            return this._appendValue2.apply(this, arguments);
        } else {
            return this._appendValue4.apply(this, arguments);
        }  
    }
    
    /**
     * Appends the value of a date-time field to the formatter using a normal
     * output style.
     * 
     * The value of the field will be output during a print.
     * If the value cannot be obtained then an exception will be thrown.
     * 
     * The value will be printed as per the normal print of an integer value.
     * Only negative numbers will be signed. No padding will be added.
     * 
     * The parser for a variable width value such as this normally behaves greedily,
     * requiring one digit, but accepting as many digits as possible.
     * This behavior can be affected by 'adjacent value parsing'.
     * See {@link #appendValue(TemporalField, int)} for full details.
     *
     * @param field  the field to append, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    _appendValue1(field) {
        assert(field != null);
        this._appendValuePrinterParser(new NumberPrinterParser(field, 1, MAX_WIDTH, SignStyle.NORMAL));
        return this;
    }

    /**
     * Appends the value of a date-time field to the formatter using a fixed
     * width, zero-padded approach.
     * 
     * The value of the field will be output during a print.
     * If the value cannot be obtained then an exception will be thrown.
     * 
     * The value will be zero-padded on the left. If the size of the value
     * means that it cannot be printed within the width then an exception is thrown.
     * If the value of the field is negative then an exception is thrown during printing.
     * 
     * This method supports a special technique of parsing known as 'adjacent value parsing'.
     * This technique solves the problem where a variable length value is followed by one or more
     * fixed length values. The standard parser is greedy, and thus it would normally
     * steal the digits that are needed by the fixed width value parsers that follow the
     * variable width one.
     * 
     * No action is required to initiate 'adjacent value parsing'.
     * When a call to {@code appendValue} with a variable width is made, the builder
     * enters adjacent value parsing setup mode. If the immediately subsequent method
     * call or calls on the same builder are to this method, then the parser will reserve
     * space so that the fixed width values can be parsed.
     * 
     * For example, consider {@code builder.appendValue(YEAR).appendValue(MONTH_OF_YEAR, 2);}
     * The year is a variable width parse of between 1 and 19 digits.
     * The month is a fixed width parse of 2 digits.
     * Because these were appended to the same builder immediately after one another,
     * the year parser will reserve two digits for the month to parse.
     * Thus, the text '201106' will correctly parse to a year of 2011 and a month of 6.
     * Without adjacent value parsing, the year would greedily parse all six digits and leave
     * nothing for the month.
     * 
     * Adjacent value parsing applies to each set of fixed width not-negative values in the parser
     * that immediately follow any kind of variable width value.
     * Calling any other append method will end the setup of adjacent value parsing.
     * Thus, in the unlikely event that you need to avoid adjacent value parsing behavior,
     * simply add the {@code appendValue} to another {@code DateTimeFormatterBuilder}
     * and add that to this builder.
     * 
     * If adjacent parsing is active, then parsing must match exactly the specified
     * number of digits in both strict and lenient modes.
     * In addition, no positive or negative sign is permitted.
     *
     * @param field  the field to append, not null
     * @param width  the width of the printed field, from 1 to 19
     * @return this, for chaining, not null
     * @throws IllegalArgumentException if the width is invalid
     */
    _appendValue2(field, width) {
        assert(field != null);
        if (width < 1 || width > MAX_WIDTH) {
            throw new IllegalArgumentException(`The width must be from 1 to ${MAX_WIDTH} inclusive but was ${width}`);
        }
        var pp = new NumberPrinterParser(field, width, width, SignStyle.NOT_NEGATIVE);
        this._appendValuePrinterParser(pp);
        return this;
    }

    /**
     * Appends the value of a date-time field to the formatter providing full
     * control over printing.
     * 
     * The value of the field will be output during a print.
     * If the value cannot be obtained then an exception will be thrown.
     * 
     * This method provides full control of the numeric formatting, including
     * zero-padding and the positive/negative sign.
     * 
     * The parser for a variable width value such as this normally behaves greedily,
     * accepting as many digits as possible.
     * This behavior can be affected by 'adjacent value parsing'.
     * See {@link #appendValue(TemporalField, int)} for full details.
     * 
     * In strict parsing mode, the minimum number of parsed digits is {@code minWidth}.
     * In lenient parsing mode, the minimum number of parsed digits is one.
     * 
     * If this method is invoked with equal minimum and maximum widths and a sign style of
     * {@code NOT_NEGATIVE} then it delegates to {@code appendValue(TemporalField,int)}.
     * In this scenario, the printing and parsing behavior described there occur.
     *
     * @param field  the field to append, not null
     * @param minWidth  the minimum field width of the printed field, from 1 to 19
     * @param maxWidth  the maximum field width of the printed field, from 1 to 19
     * @param signStyle  the positive/negative output style, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if the widths are invalid
     */
    _appendValue4(field, minWidth, maxWidth, signStyle) {
        assert(field != null);
        if (minWidth === maxWidth && signStyle === SignStyle.NOT_NEGATIVE) {
            return this._appendValue2(field, maxWidth);
        }
        if (minWidth < 1 || minWidth > MAX_WIDTH) {
            throw new IllegalArgumentException(`The minimum width must be from 1 to ${MAX_WIDTH} inclusive but was ${minWidth}`);
        }
        if (maxWidth < 1 || maxWidth > MAX_WIDTH) {
            throw new IllegalArgumentException(`The minimum width must be from 1 to ${MAX_WIDTH} inclusive but was ${maxWidth}`);
        }
        if (maxWidth < minWidth) {
            throw new IllegalArgumentException(`The maximum width must exceed or equal the minimum width but ${maxWidth} < ${minWidth}`);
        }
        var pp = new NumberPrinterParser(field, minWidth, maxWidth, signStyle);
        this._appendValuePrinterParser(pp);
        return this;
    }

    /**
     * Appends a fixed width printer-parser.
     *
     * @param pp  the printer-parser, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    _appendValuePrinterParser(pp) {
        assert(pp != null);
        if (this._active._valueParserIndex >= 0 &&
                this._active._printerParsers[this._active._valueParserIndex] instanceof NumberPrinterParser) {
            var activeValueParser = this._active._valueParserIndex;

            // adjacent parsing mode, update setting in previous parsers
            var basePP = this._active._printerParsers[activeValueParser];
            if (pp.minWidth() === pp.maxWidth() && pp.signStyle() === SignStyle.NOT_NEGATIVE) {
                // Append the width to the subsequentWidth of the active parser
                basePP = basePP.withSubsequentWidth(pp.maxWidth());
                // Append the new parser as a fixed width
                this._appendInternal(pp.withFixedWidth());
                // Retain the previous active parser
                this._active._valueParserIndex = activeValueParser;
            } else {
                // Modify the active parser to be fixed width
                basePP = basePP.withFixedWidth();
                // The new parser becomes the mew active parser
                this._active._valueParserIndex = this._appendInternal(pp);
            }
            // Replace the modified parser with the updated one
            this._active._printerParsers[activeValueParser] = basePP;
        } else {
            // The new Parser becomes the active parser
            this._active._valueParserIndex = this._appendInternal(pp);
        }
        return this;
    }

    //-----------------------------------------------------------------------
    /**
     * Appends the fractional value of a date-time field to the formatter.
     * <p>
     * The fractional value of the field will be output including the
     * preceding decimal point. The preceding value is not output.
     * For example, the second-of-minute value of 15 would be output as {@code .25}.
     * <p>
     * The width of the printed fraction can be controlled. Setting the
     * minimum width to zero will cause no output to be generated.
     * The printed fraction will have the minimum width necessary between
     * the minimum and maximum widths - trailing zeroes are omitted.
     * No rounding occurs due to the maximum width - digits are simply dropped.
     * <p>
     * When parsing in strict mode, the number of parsed digits must be between
     * the minimum and maximum width. When parsing in lenient mode, the minimum
     * width is considered to be zero and the maximum is nine.
     * <p>
     * If the value cannot be obtained then an exception will be thrown.
     * If the value is negative an exception will be thrown.
     * If the field does not have a fixed set of valid values then an
     * exception will be thrown.
     * If the field value in the date-time to be printed is invalid it
     * cannot be printed and an exception will be thrown.
     *
     * @param {TemporalField} field  the field to append, not null
     * @param {Number} minWidth  the minimum width of the field excluding the decimal point, from 0 to 9
     * @param {Number} maxWidth  the maximum width of the field excluding the decimal point, from 1 to 9
     * @param {boolean} decimalPoint  whether to output the localized decimal point symbol
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if the field has a variable set of valid values or
     *  either width is invalid
     */
    appendFraction(field, minWidth, maxWidth, decimalPoint) {
        this._appendInternal(new FractionPrinterParser(field, minWidth, maxWidth, decimalPoint));
        return this;
    }

    /**
     * Appends an instant using ISO-8601 to the formatter with control over
     * the number of fractional digits.
     * <p>
     * Instants have a fixed output format, although this method provides some
     * control over the fractional digits. They are converted to a date-time
     * with a zone-offset of UTC and printed using the standard ISO-8601 format.
     * The localized decimal style is not used.
     * <p>
     * The {@code this.fractionalDigits} parameter allows the output of the fractional
     * second to be controlled. Specifying zero will cause no fractional digits
     * to be output. From 1 to 9 will output an increasing number of digits, using
     * zero right-padding if necessary. The special value -1 is used to output as
     * many digits as necessary to avoid any trailing zeroes.
     * <p>
     * When parsing in strict mode, the number of parsed digits must match the
     * fractional digits. When parsing in lenient mode, any number of fractional
     * digits from zero to nine are accepted.
     * <p>
     * The instant is obtained using {@link ChronoField#INSTANT_SECONDS INSTANT_SECONDS}
     * and optionally (@code NANO_OF_SECOND). The value of {@code INSTANT_SECONDS}
     * may be outside the maximum range of {@code LocalDateTime}.
     * <p>
     * The {@linkplain ResolverStyle resolver style} has no effect on instant parsing.
     * The end-of-day time of '24:00' is handled as midnight at the start of the following day.
     * The leap-second time of '23:59:59' is handled to some degree, see
     * {@link DateTimeFormatter#parsedLeapSecond()} for full details.
     * <p>
     * An alternative to this method is to format/parse the instant as a single
     * epoch-seconds value. That is achieved using {@code appendValue(INSTANT_SECONDS)}.
     *
     * @param {number} [fractionalDigits=-2] - the number of fractional second digits to format with,
     *  from 0 to 9, or -1 to use as many digits as necessary
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendInstant(fractionalDigits=-2) {
        if (fractionalDigits < -2 || fractionalDigits > 9) {
            throw new IllegalArgumentException('Invalid fractional digits: ' + fractionalDigits);
        }
        this._appendInternal(new InstantPrinterParser(fractionalDigits));
        return this;
    }


    /**
     * Appends the zone offset, such as '+01:00', to the formatter.
     * <p>
     * This appends an instruction to print/parse the offset ID to the builder.
     * This is equivalent to calling {@code appendOffset("HH:MM:ss", "Z")}.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendOffsetId() {
        this._appendInternal(OffsetIdPrinterParser.INSTANCE_ID);
        return this;
    }

    /**
      * Appends the time-zone ID, such as 'Europe/Paris' or '+02:00', to the formatter.
      * <p>
      * This appends an instruction to print/parse the zone ID to the builder.
      * The zone ID is obtained in a strict manner suitable for {@code ZonedDateTime}.
      * By contrast, {@code OffsetDateTime} does not have a zone ID suitable
      * for use with this method, see {@link #appendZoneOrOffsetId()}.
      * <p>
      * During printing, the zone is obtained using a mechanism equivalent
      * to querying the temporal with {@link TemporalQueries#zoneId()}.
      * It will be printed using the result of {@link ZoneId#getId()}.
      * If the zone cannot be obtained then an exception is thrown unless the
      * section of the formatter is optional.
      * <p>
      * During parsing, the zone is parsed and must match a known zone or offset.
      * If the zone cannot be parsed then an exception is thrown unless the
      * section of the formatter is optional.
      *
      * @return {DateTimeFormatterBuilder} this, for chaining, not null
      * @see #appendZoneRegionId()
      */
    appendZoneId() {
        this._appendInternal(new ZoneIdPrinterParser(TemporalQueries.zoneId(), 'ZoneId()'));
        return this;
    }

    //-----------------------------------------------------------------------
    /**
     * Mark the start of an optional section.
     * <p>
     * The output of printing can include optional sections, which may be nested.
     * An optional section is started by calling this method and ended by calling
     * {@link #optionalEnd()} or by ending the build process.
     * <p>
     * All elements in the optional section are treated as optional.
     * During printing, the section is only output if data is available in the
     * {@code TemporalAccessor} for all the elements in the section.
     * During parsing, the whole section may be missing from the parsed string.
     * <p>
     * For example, consider a builder setup as
     * {@code builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2)}.
     * The optional section ends automatically at the end of the builder.
     * During printing, the minute will only be output if its value can be obtained from the date-time.
     * During parsing, the input will be successfully parsed whether the minute is present or not.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    optionalStart() {
        this._active.valueParserIndex = -1;
        this._active = new DateTimeFormatterBuilder(this._active, true);
        return this;
    }

    /**
     * Ends an optional section.
     * <p>
     * The output of printing can include optional sections, which may be nested.
     * An optional section is started by calling {@link #optionalStart()} and ended
     * using this method (or at the end of the builder).
     * <p>
     * Calling this method without having previously called {@code optionalStart}
     * will throw an exception.
     * Calling this method immediately after calling {@code optionalStart} has no effect
     * on the formatter other than ending the (empty) optional section.
     * <p>
     * All elements in the optional section are treated as optional.
     * During printing, the section is only output if data is available in the
     * {@code TemporalAccessor} for all the elements in the section.
     * During parsing, the whole section may be missing from the parsed string.
     * <p>
     * For example, consider a builder setup as
     * {@code builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2).optionalEnd()}.
     * During printing, the minute will only be output if its value can be obtained from the date-time.
     * During parsing, the input will be successfully parsed whether the minute is present or not.
     *
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalStateException if there was no previous call to {@code optionalStart}
     */
    optionalEnd() {
        if (this._active._parent == null) {
            throw new IllegalStateException('Cannot call optionalEnd() as there was no previous call to optionalStart()');
        }
        if (this._active._printerParsers.length > 0) {
            var cpp = new CompositePrinterParser(this._active._printerParsers, this._active._optional);
            this._active = this._active._parent;
            this._appendInternal(cpp);
        } else {
            this._active = this._active._parent;
        }
        return this;
    }

    /**
     * Appends a printer and/or parser to the internal list handling padding.
     *
     * @param pp  the printer-parser to add, not null
     * @return the index into the active parsers list
     */
    _appendInternal(pp) {
        assert(pp != null);
        if (this._active._padNextWidth > 0) {
            if (pp != null) {
                pp = new PadPrinterParserDecorator(pp, this._active._padNextWidth, this._active._padNextChar);
            }
            this._active._padNextWidth = 0;
            this._active._padNextChar = 0;
        }
        this._active._printerParsers.push(pp);
        this._active._valueParserIndex = -1;
        return this._active._printerParsers.length - 1;
    }

    /**
     * Appends a string literal to the formatter.
     * 
     * This string will be output during a print.
     * 
     * If the literal is empty, nothing is added to the formatter.
     *
     * @param literal  the literal to append, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendLiteral(literal) {
        assert(literal != null);
        this._appendInternalPrinterParser(new StringLiteralPrinterParser(literal));
        return this;
    }
    
    /**
     * Appends a printer and/or parser to the internal list handling padding.
     *
     * @param pp  the printer-parser to add, not null
     * @return the index into the active parsers list
     */
    _appendInternalPrinterParser(pp) {
        assert(pp != null);
        if (this._active._padNextWidth > 0) {
            if (pp != null) {
                pp = new PadPrinterParserDecorator(pp, this._active._padNextWidth, this._active._padNextChar);
            }
            this._active._padNextWidth = 0;
            this._active._padNextChar = 0;
        }
        this._active._printerParsers.push(pp);
        this._active._valueParserIndex = -1;
        return this._active._printerParsers.length - 1;
    }
    
    //-----------------------------------------------------------------------
    /**
     * Appends all the elements of a formatter to the builder.
     * <p>
     * This method has the same effect as appending each of the constituent
     * parts of the formatter directly to this builder.
     *
     * @param {DateTimeFormatter} formatter  the formatter to add, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    append(formatter) {
        requireNonNull(formatter, 'formatter');
        this._appendInternal(formatter.toPrinterParser(false));
        return this;
    }

    /**
     * Completes this builder by creating the DateTimeFormatter.
     * 
     * This will create a formatter with the specified locale.
     * Numbers will be printed and parsed using the standard non-localized set of symbols.
     * 
     * Calling this method will end any open optional sections by repeatedly
     * calling {@link #optionalEnd()} before creating the formatter.
     * 
     * This builder can still be used after creating the formatter if desired,
     * although the state may have been changed by calls to {@code optionalEnd}.
     *
     * @param resolverStyle  the new resolver style
     * @return the created formatter, not null
     */
    toFormatter(resolverStyle=ResolverStyle.SMART) {
        while (this._active._parent != null) {
            this.optionalEnd();
        }
        var pp = new CompositePrinterParser(this._printerParsers, false);
        return new DateTimeFormatter(pp, null, DecimalStyle.STANDARD, resolverStyle, null, null, null);
    }

}

const EXCEED_POINTS = [
    0,
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    100000000,
    1000000000
];

class CompositePrinterParser {

    constructor(printerParsers, optional) {
        this._printerParsers = printerParsers;
        this._optional = optional;
    }

    /**
     * Returns a copy of this printer-parser with the optional flag changed.
     *
     * @param {boolean} optional  the optional flag to set in the copy
     * @return {CompositePrinterParser} the new printer-parser, not null
     */
    withOptional(optional) {
        if (optional === this._optional) {
            return this;
        }
        return new CompositePrinterParser(this._printerParsers, optional);
    }

    print(context, buf) {
        var length = buf.length();
        if (this._optional) {
            context.startOptional();
        }
        try {
            for (let i=0; i<this._printerParsers.length; i++) {
                let pp = this._printerParsers[i];
                if (pp.print(context, buf) === false) {
                    buf.setLength(length);  // reset buffer
                    return true;
                }
            }
        } finally {
            if (this._optional) {
                context.endOptional();
            }
        }
        return true;
    }

    parse(context, text, position) {
        if (this._optional) {
            context.startOptional();
            var pos = position;
            for (let i=0; i<this._printerParsers.length; i++) {
                let pp = this._printerParsers[i];
                pos = pp.parse(context, text, pos);
                if (pos < 0) {
                    context.endOptional(false);
                    return position;  // return original position
                }
            }
            context.endOptional(true);
            return pos;
        } else {
            for (let i=0; i<this._printerParsers.length; i++) {
                let pp = this._printerParsers[i];
                position = pp.parse(context, text, position);
                if (position < 0) {
                    break;
                }
            }
            return position;
        }
    }

    toString() {
        var buf = '';
        if (this._printerParsers != null) {
            buf += this._optional ? '[' : '(';
            for (let i=0; i<this._printerParsers.length; i++) {
                let pp = this._printerParsers[i];
                buf += pp.toString();
            }
            buf += this._optional ? ']' : ')';
        }
        return buf;
    }
}

/**
 * Pads the output to a fixed width.
 */
class PadPrinterParserDecorator {

    /**
     * Constructor.
     *
     * @param printerParser  the printer, not null
     * @param padWidth  the width to pad to, 1 or greater
     * @param padChar  the pad character
     */
    constructor(printerParser, padWidth, padChar) {
        // input checked by DateTimeFormatterBuilder
        this._printerParser = printerParser;
        this._padWidth = padWidth;
        this._padChar = padChar;
    }

    print(context, buf) {
        var preLen = buf.length();
        if (this._printerParser.print(context, buf) === false) {
            return false;
        }
        var len = buf.length() - preLen;
        if (len > this._padWidth) {
            throw new DateTimeException(
                `Cannot print as output of ${len} characters exceeds pad width of ${this._padWidth}`);
        }
        for (let i = 0; i < this._padWidth - len; i++) {
            buf.insert(preLen, this._padChar);
        }
        return true;
    }

    parse(context, text, position) {
        // cache context before changed by decorated parser
        var strict = context.isStrict();
        var caseSensitive = context.isCaseSensitive();
        // parse
        assert(!(position > text.length));
        if (position === text.length) {
            return ~position;  // no more characters in the string
        }
        var endPos = position + this._padWidth;
        if (endPos > text.length) {
            if (strict) {
                return ~position;  // not enough characters in the string to meet the parse width
            }
            endPos = text.length;
        }
        var pos = position;
        while (pos < endPos &&
                (caseSensitive ? text[pos] === this._padChar : context.charEquals(text[pos], this._padChar))) {
            pos++;
        }
        text = text.substring(0, endPos);
        var resultPos = this._printerParser.parse(context, text, pos);
        if (resultPos !== endPos && strict) {
            return ~(position + pos);  // parse of decorated field didn't parse to the end
        }
        return resultPos;
    }

    toString() {
        return `Pad(${this._printerParser},${this._padWidth}${(this._padChar === ' ' ? ')' : ',\'' + this._padChar + '\')')}`;
    }
}

class SettingsParser extends Enum {

    print(/*context, buf*/) {
        return true;  // nothing to do here
    }

    parse(context, text, position) {
        // using ordinals to avoid javac synthetic inner class
        switch (this) {
            case SettingsParser.SENSITIVE:   context.setCaseSensitive(true); break;
            case SettingsParser.INSENSITIVE: context.setCaseSensitive(false); break;
            case SettingsParser.STRICT:      context.setStrict(true); break;
            case SettingsParser.LENIENT:     context.setStrict(false); break;
        }
        return position;
    }

    toString() {
        // using ordinals to avoid javac synthetic inner class
        switch (this) {
            case SettingsParser.SENSITIVE:   return 'ParseCaseSensitive(true)';
            case SettingsParser.INSENSITIVE: return 'ParseCaseSensitive(false)';
            case SettingsParser.STRICT:      return 'ParseStrict(true)';
            case SettingsParser.LENIENT:     return 'ParseStrict(false)';
        }
    }
}

SettingsParser.SENSITIVE = new SettingsParser('SENSITIVE');
SettingsParser.INSENSITIVE = new SettingsParser('INSENSITIVE');
SettingsParser.STRICT = new SettingsParser('STRICT');
SettingsParser.LENIENT = new SettingsParser('LENIENT');

/**
* Prints or parses a string literal.
*/
class StringLiteralPrinterParser {

    constructor(literal) {
        this._literal = literal;
    }

    print(context, buf) {
        buf.append(this._literal);
        return true;
    }

    parse(context, text, position) {
        var length = text.length;
        assert(!(position > length || position < 0));

        if (context.subSequenceEquals(text, position, this._literal, 0, this._literal.length) === false) {
            return ~position;
        }
        return position + this._literal.length;
    }

    toString() {
        return '\'' + this._literal + '\'';
    }
}

class NumberPrinterParser {

    /**
     * Constructor.
     *
     * @param field  the field to print, not null
     * @param minWidth  the minimum field width, from 1 to 19
     * @param maxWidth  the maximum field width, from minWidth to 19
     * @param signStyle  the positive/negative sign style, not null
     * @param subsequentWidth  the width of subsequent non-negative numbers, 0 or greater,
     *  -1 if fixed width due to active adjacent parsing
     */
    constructor(field, minWidth, maxWidth, signStyle, subsequentWidth=0){
        this._field = field;
        this._minWidth = minWidth;
        this._maxWidth = maxWidth;
        this._signStyle = signStyle;
        this._subsequentWidth = subsequentWidth;
    }

    field(){ return this._field;}
    minWidth(){ return this._minWidth;}
    maxWidth(){ return this._maxWidth;}
    signStyle(){ return this._signStyle;}

    withSubsequentWidth(subsequentWidth) {
        return new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, this._subsequentWidth + subsequentWidth);
    }

    _isFixedWidth() {
        return this._subsequentWidth === -1 ||
                (this._subsequentWidth > 0 && this._minWidth === this._maxWidth && this._signStyle === SignStyle.NOT_NEGATIVE);
    }

    print(context, buf) {
        var value = context.getValue(this._field);
        if (value == null) {
            return false;
        }
        var symbols = context.symbols();
        var str = '' + Math.abs(value);
        if (str.length > this._maxWidth) {
            throw new DateTimeException('Field ' + this._field +
                ' cannot be printed as the value ' + value +
                ' exceeds the maximum print width of ' + this._maxWidth);
        }
        str = symbols.convertNumberToI18N(str);

        if (value >= 0) {
            switch (this._signStyle) {
                case SignStyle.EXCEEDS_PAD:
                    if (this._minWidth < MAX_WIDTH && value >= EXCEED_POINTS[this._minWidth]) {
                        buf.append(symbols.positiveSign());
                    }
                    break;
                case SignStyle.ALWAYS:
                    buf.append(symbols.positiveSign());
                    break;
            }
        } else {
            switch (this._signStyle) {
                case SignStyle.NORMAL:
                case SignStyle.EXCEEDS_PAD:
                case SignStyle.ALWAYS:
                    buf.append(symbols.negativeSign());
                    break;
                case SignStyle.NOT_NEGATIVE:
                    throw new DateTimeException('Field ' + this._field +
                        ' cannot be printed as the value ' + value +
                        ' cannot be negative according to the SignStyle');
            }
        }
        for (let i = 0; i < this._minWidth - str.length; i++) {
            buf.append(symbols.zeroDigit());
        }
        buf.append(str);
        return true;
    }

    parse(context, text, position){
        var length = text.length;
        if (position === length) {
            return ~position;
        }
        assert(position>=0 && position<length);
        var sign = text.charAt(position);  // IOOBE if invalid position
        var negative = false;
        var positive = false;
        if (sign === context.symbols().positiveSign()) {
            if (this._signStyle.parse(true, context.isStrict(), this._minWidth === this._maxWidth) === false) {
                return ~position;
            }
            positive = true;
            position++;
        } else if (sign === context.symbols().negativeSign()) {
            if (this._signStyle.parse(false, context.isStrict(), this._minWidth === this._maxWidth) === false) {
                return ~position;
            }
            negative = true;
            position++;
        } else {
            if (this._signStyle === SignStyle.ALWAYS && context.isStrict()) {
                return ~position;
            }
        }
        var effMinWidth = (context.isStrict() || this._isFixedWidth() ? this._minWidth : 1);
        var minEndPos = position + effMinWidth;
        if (minEndPos > length) {
            return ~position;
        }
        var effMaxWidth = (context.isStrict() || this._isFixedWidth() ? this._maxWidth : 9) + Math.max(this._subsequentWidth, 0);
        var total = 0;
        var pos = position;
        for (let pass = 0; pass < 2; pass++) {
            let maxEndPos = Math.min(pos + effMaxWidth, length);
            while (pos < maxEndPos) {
                let ch = text.charAt(pos++);
                let digit = context.symbols().convertToDigit(ch);
                if (digit < 0) {
                    pos--;
                    if (pos < minEndPos) {
                        return ~position;  // need at least min width digits
                    }
                    break;
                }
                if ((pos - position) > MAX_WIDTH) {
                    throw new ArithmeticException('number text exceeds length');
                } else {
                    total = total * 10 + digit;
                }
            }
            if (this._subsequentWidth > 0 && pass === 0) {
                // re-parse now we know the correct width
                let parseLen = pos - position;
                effMaxWidth = Math.max(effMinWidth, parseLen - this._subsequentWidth);
                pos = position;
                total = 0;
            } else {
                break;
            }
        }
        if (negative) {
            if (total === 0 && context.isStrict()) {
                return ~(position - 1);  // minus zero not allowed
            }
            if(total !== 0) {
                total = -total;
            }
        } else if (this._signStyle === SignStyle.EXCEEDS_PAD && context.isStrict()) {
            let parseLen = pos - position;
            if (positive) {
                if (parseLen <= this._minWidth) {
                    return ~(position - 1);  // '+' only parsed if minWidth exceeded
                }
            } else {
                if (parseLen > this._minWidth) {
                    return ~position;  // '+' must be parsed if minWidth exceeded
                }
            }
        }
        return this._setValue(context, total, position, pos);
    }

    /**
     * Stores the value.
     *
     * @param context  the context to store into, not null
     * @param value  the value
     * @param errorPos  the position of the field being parsed
     * @param successPos  the position after the field being parsed
     * @return the new position
     */
    _setValue(context, value, errorPos, successPos) {
        return context.setParsedField(this._field, value, errorPos, successPos);
    }

    toString() {
        if (this._minWidth === 1 && this._maxWidth === MAX_WIDTH && this._signStyle === SignStyle.NORMAL) {
            return 'Value(' + this._field + ')';
        }
        if (this._minWidth === this._maxWidth && this._signStyle === SignStyle.NOT_NEGATIVE) {
            return 'Value(' + this._field + ',' + this._minWidth + ')';
        }
        return 'Value(' + this._field + ',' + this._minWidth + ',' + this._maxWidth + ',' + this._signStyle + ')';
    }

}

//-----------------------------------------------------------------------

import {MathUtil} from '../MathUtil';

/**
 * TODO optimize FractionPrinterParser, fix documentation
 *
 * Prints and parses a numeric date-time field with optional padding.
 */
class FractionPrinterParser {

    /**
     * Constructor.
     *
     * @param {TemporalField} field  the field to output, not null
     * @param {Number} minWidth  the minimum width to output, from 0 to 9
     * @param {Number} maxWidth  the maximum width to output, from 0 to 9
     * @param {boolean} decimalPoint  whether to output the localized decimal point symbol
     */
    constructor(field, minWidth, maxWidth, decimalPoint) {
        requireNonNull(field, 'field');
        if (field.range().isFixed() === false) {
            throw new IllegalArgumentException('Field must have a fixed set of values: ' + field);
        }
        if (minWidth < 0 || minWidth > 9) {
            throw new IllegalArgumentException('Minimum width must be from 0 to 9 inclusive but was ' + minWidth);
        }
        if (maxWidth < 1 || maxWidth > 9) {
            throw new IllegalArgumentException('Maximum width must be from 1 to 9 inclusive but was ' + maxWidth);
        }
        if (maxWidth < minWidth) {
            throw new IllegalArgumentException('Maximum width must exceed or equal the minimum width but ' +
                    maxWidth + ' < ' + minWidth);
        }
        this.field = field;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.decimalPoint = decimalPoint;
    }

    print(context, buf) {
        var value = context.getValue(this.field);
        if (value === null) {
            return false;
        }
        var symbols = context.symbols();
        if (value === 0) {  // scale is zero if value is zero
            if (this.minWidth > 0) {
                if (this.decimalPoint) {
                    buf.append(symbols.decimalSeparator());
                }
                for (let i = 0; i < this.minWidth; i++) {
                    buf.append(symbols.zeroDigit());
                }
            }
        } else {
            var fraction = this.convertToFraction(value, symbols.zeroDigit());
            var outputScale = Math.min(Math.max(fraction.length, this.minWidth), this.maxWidth);
            fraction = fraction.substr(0, outputScale);
            if(fraction * 1 > 0 ) {
                while (fraction.length > this.minWidth && fraction[fraction.length - 1] === '0') {
                    fraction = fraction.substr(0, fraction.length - 1);
                }
            }
            var str = fraction;
            str = symbols.convertNumberToI18N(str);
            if (this.decimalPoint) {
                buf.append(symbols.decimalSeparator());
            }
            buf.append(str);
        }
        return true;
    }

    parse(context, text, position) {
        var effectiveMin = (context.isStrict() ? this.minWidth : 0);
        var effectiveMax = (context.isStrict() ? this.maxWidth : 9);
        var length = text.length;
        if (position === length) {
            // valid if whole field is optional, invalid if minimum width
            return (effectiveMin > 0 ? ~position : position);
        }
        if (this.decimalPoint) {
            if (text[position] !== context.symbols().decimalSeparator()) {
                // valid if whole field is optional, invalid if minimum width
                return (effectiveMin > 0 ? ~position : position);
            }
            position++;
        }
        var minEndPos = position + effectiveMin;
        if (minEndPos > length) {
            return ~position;  // need at least min width digits
        }
        var maxEndPos = Math.min(position + effectiveMax, length);
        var total = 0;  // can use int because we are only parsing up to 9 digits
        var pos = position;
        while (pos < maxEndPos) {
            var ch = text.charAt(pos++);
            var digit = context.symbols().convertToDigit(ch);
            if (digit < 0) {
                if (pos < minEndPos) {
                    return ~position;  // need at least min width digits
                }
                pos--;
                break;
            }
            total = total * 10 + digit;
        }
        var moveLeft = pos - position;
        var scale = Math.pow(10, moveLeft);
        var value = this.convertFromFraction(total, scale);
        return context.setParsedField(this.field, value, position, pos);
    }

    /**
     *
     * @param {Number} value  the value to convert, must be valid for this rule
     * @return {String} the value as a fraction within the range, from 0 to 1, not null
     */
    convertToFraction(value, zeroDigit) {
        var range = this.field.range();
        range.checkValidValue(value, this.field);
        var _min = range.minimum();
        var _range = range.maximum() - _min + 1;
        var _value = value - _min;
        var _scaled = MathUtil.intDiv((_value * 1000000000),  _range);
        var fraction = '' + _scaled;
        while(fraction.length < 9){
            fraction = zeroDigit + fraction;
        }
        return fraction;
    }

    /**
     *
     * @param {Number} fraction  the fraction to convert, not null
     * @return {Number} the value of the field, valid for this rule
     * @throws DateTimeException if the value cannot be converted
     */
    convertFromFraction(total, scale) {
        var range = this.field.range();
        var _min = range.minimum();
        var _range = range.maximum() - _min + 1;
        var _value = MathUtil.intDiv((total * _range), scale);
        return _value;
    }

    toString() {
        var decimal = (this.decimalPoint ? ',DecimalPoint' : '');
        return 'Fraction(' + this.field + ',' + this.minWidth + ',' + this.maxWidth + decimal + ')';
    }
}

//-----------------------------------------------------------------------

// days in a 400 year cycle = 146097
// days in a 10,000 year cycle = 146097 * 25
// seconds per day = 86400
const SECONDS_PER_10000_YEARS = 146097 * 25 * 86400;
const SECONDS_0000_TO_1970 = ((146097 * 5) - (30 * 365 + 7)) * 86400;

/**
 * Prints or parses an ISO-8601 instant.
 */
class InstantPrinterParser  {

    constructor(fractionalDigits) {
        this.fractionalDigits = fractionalDigits;
    }

    print(context, buf) {
        // use INSTANT_SECONDS, thus this code is not bound by Instant.MAX
        var inSecs = context.getValue(ChronoField.INSTANT_SECONDS);
        var inNanos = 0;
        if (context.temporal().isSupported(ChronoField.NANO_OF_SECOND)) {
            inNanos = context.temporal().getLong(ChronoField.NANO_OF_SECOND);
        }
        if (inSecs == null) {
            return false;
        }
        var inSec = inSecs;
        var inNano = ChronoField.NANO_OF_SECOND.checkValidIntValue(inNanos);
        if (inSec >= -SECONDS_0000_TO_1970) {
            // current era
            let zeroSecs = inSec - SECONDS_PER_10000_YEARS + SECONDS_0000_TO_1970;
            let hi = MathUtil.floorDiv(zeroSecs, SECONDS_PER_10000_YEARS) + 1;
            let lo = MathUtil.floorMod(zeroSecs, SECONDS_PER_10000_YEARS);
            let ldt = LocalDateTime.ofEpochSecond(lo - SECONDS_0000_TO_1970, 0, ZoneOffset.UTC);
            if (hi > 0) {
                buf.append('+').append(hi);
            }
            buf.append(ldt);
            if (ldt.second() === 0) {
                buf.append(':00');
            }
        } else {
            // before current era
            let zeroSecs = inSec + SECONDS_0000_TO_1970;
            let hi = MathUtil.intDiv(zeroSecs, SECONDS_PER_10000_YEARS);
            let lo = MathUtil.intMod(zeroSecs, SECONDS_PER_10000_YEARS);
            let ldt = LocalDateTime.ofEpochSecond(lo - SECONDS_0000_TO_1970, 0, ZoneOffset.UTC);
            let pos = buf.length();
            buf.append(ldt);
            if (ldt.second() === 0) {
                buf.append(':00');
            }
            if (hi < 0) {
                if (ldt.year() === -10000) {
                    buf.replace(pos, pos + 2, '' + (hi - 1));
                } else if (lo === 0) {
                    buf.insert(pos, hi);
                } else {
                    buf.insert(pos + 1, Math.abs(hi));
                }
            }
        }
        //fraction
        if (this.fractionalDigits === -2) {
            if (inNano !== 0) {
                buf.append('.');
                if (MathUtil.intMod(inNano, 1000000) === 0) {
                    buf.append(('' + (MathUtil.intDiv(inNano, 1000000) + 1000)).substring(1));
                } else if (MathUtil.intMod(inNano, 1000) === 0) {
                    buf.append(('' + (MathUtil.intDiv(inNano, 1000) + 1000000)).substring(1));
                } else {
                    buf.append(('' + ((inNano) + 1000000000)).substring(1));
                }
            }
        } else if (this.fractionalDigits > 0 || (this.fractionalDigits === -1 && inNano > 0)) {
            buf.append('.');
            let div = 100000000;
            for (let i = 0; ((this.fractionalDigits === -1 && inNano > 0) || i < this.fractionalDigits); i++) {
                let digit = MathUtil.intDiv(inNano, div);
                buf.append(digit);
                inNano = inNano - (digit * div);
                div = MathUtil.intDiv(div, 10);
            }
        }
        buf.append('Z');
        return true;
    }

    parse(context, text, position) {
        // new context to avoid overwriting fields like year/month/day
        var newContext = context.copy();
        var minDigits = (this.fractionalDigits < 0 ? 0 : this.fractionalDigits);
        var maxDigits = (this.fractionalDigits < 0 ? 9 : this.fractionalDigits);
        var parser = new DateTimeFormatterBuilder()
                .append(DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral('T')
                .appendValue(ChronoField.HOUR_OF_DAY, 2).appendLiteral(':').appendValue(ChronoField.MINUTE_OF_HOUR, 2).appendLiteral(':')
                .appendValue(ChronoField.SECOND_OF_MINUTE, 2).appendFraction(ChronoField.NANO_OF_SECOND, minDigits, maxDigits, true).appendLiteral('Z')
                .toFormatter().toPrinterParser(false);
        var pos = parser.parse(newContext, text, position);
        if (pos < 0) {
            return pos;
        }
        // parser restricts most fields to 2 digits, so definitely int
        // correctly parsed nano is also guaranteed to be valid
        var yearParsed = newContext.getParsed(ChronoField.YEAR);
        var month = newContext.getParsed(ChronoField.MONTH_OF_YEAR);
        var day = newContext.getParsed(ChronoField.DAY_OF_MONTH);
        var hour = newContext.getParsed(ChronoField.HOUR_OF_DAY);
        var min = newContext.getParsed(ChronoField.MINUTE_OF_HOUR);
        var secVal = newContext.getParsed(ChronoField.SECOND_OF_MINUTE);
        var nanoVal = newContext.getParsed(ChronoField.NANO_OF_SECOND);
        var sec = (secVal != null ? secVal : 0);
        var nano = (nanoVal != null ? nanoVal : 0);
        var year = MathUtil.intMod(yearParsed, 10000);
        var days = 0;
        if (hour === 24 && min === 0 && sec === 0 && nano === 0) {
            hour = 0;
            days = 1;
        } else if (hour === 23 && min === 59 && sec === 60) {
            context.setParsedLeapSecond();
            sec = 59;
        }
        var instantSecs;
        try {
            var ldt = LocalDateTime.of(year, month, day, hour, min, sec, 0).plusDays(days);
            instantSecs = ldt.toEpochSecond(ZoneOffset.UTC);
            instantSecs += MathUtil.safeMultiply(MathUtil.intDiv(yearParsed, 10000), SECONDS_PER_10000_YEARS);
        } catch (ex) {
            return ~position;
        }
        var successPos = pos;
        successPos = context.setParsedField(ChronoField.INSTANT_SECONDS, instantSecs, position, successPos);
        return context.setParsedField(ChronoField.NANO_OF_SECOND, nano, position, successPos);
    }

    toString() {
        return 'Instant()';
    }
}

//-----------------------------------------------------------------------
const PATTERNS = [
    '+HH', '+HHmm', '+HH:mm', '+HHMM', '+HH:MM', '+HHMMss', '+HH:MM:ss', '+HHMMSS', '+HH:MM:SS'
];
/**
 * Prints or parses an offset ID.
 */
class OffsetIdPrinterParser  {

    /**
     * Constructor.
     *
     * @param {string} noOffsetText  the text to use for UTC, not null
     * @param {string} pattern  the pattern
     */
    constructor(noOffsetText, pattern) {
        requireNonNull(noOffsetText, 'noOffsetText');
        requireNonNull(pattern, 'pattern');
        this.noOffsetText = noOffsetText;
        this.type = this._checkPattern(pattern);
    }

    /**
     * @param {String} pattern
     * @return {number}
     */
    _checkPattern(pattern) {
        for (let i = 0; i < PATTERNS.length; i++) {
            if (PATTERNS[i] === pattern) {
                return i;
            }
        }
        throw new IllegalArgumentException('Invalid zone offset pattern: ' + pattern);
    }

    /**
     * @param {DateTimePrintContext} context
     * @param {StringBuilder} buf
     * @return {boolean} 
     */
    print(context, buf) {
        var offsetSecs = context.getValue(ChronoField.OFFSET_SECONDS);
        if (offsetSecs == null) {
            return false;
        }
        var totalSecs = MathUtil.safeToInt(offsetSecs);
        if (totalSecs === 0) {
            buf.append(this.noOffsetText);
        } else {
            var absHours = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs, 3600), 100));  // anything larger than 99 silently dropped
            var absMinutes = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs, 60), 60));
            var absSeconds = Math.abs(MathUtil.intMod(totalSecs, 60));
            var bufPos = buf.length();
            var output = absHours;
            buf.append(totalSecs < 0 ? '-' : '+')
                .appendChar((MathUtil.intDiv(absHours, 10) + '0')).appendChar(MathUtil.intMod(absHours, 10) + '0');
            if (this.type >= 3 || (this.type >= 1 && absMinutes > 0)) {
                buf.append((this.type % 2) === 0 ? ':' : '')
                    .appendChar((MathUtil.intDiv(absMinutes, 10) + '0')).appendChar((absMinutes % 10 + '0'));
                output += absMinutes;
                if (this.type >= 7 || (this.type >= 5 && absSeconds > 0)) {
                    buf.append((this.type % 2) === 0 ? ':' : '')
                        .appendChar((MathUtil.intDiv(absSeconds, 10) + '0')).appendChar((absSeconds % 10 + '0'));
                    output += absSeconds;
                }
            }
            if (output === 0) {
                buf.setLength(bufPos);
                buf.append(this.noOffsetText);
            }
        }
        return true;
    }

    /**
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} position
     * @return {number}
     */
    parse(context, text, position) {
        var length = text.length;
        var noOffsetLen = this.noOffsetText.length;
        if (noOffsetLen === 0) {
            if (position === length) {
                return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position);
            }
        } else {
            if (position === length) {
                return ~position;
            }
            if (context.subSequenceEquals(text, position, this.noOffsetText, 0, noOffsetLen)) {
                return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position + noOffsetLen);
            }
        }

        // parse normal plus/minus offset
        var sign = text[position];  // IOOBE if invalid position
        if (sign === '+' || sign === '-') {
            // starts
            var negative = (sign === '-' ? -1 : 1);
            var array = [0,0,0,0];
            array[0] = position + 1;
            if ((this._parseNumber(array, 1, text, true) ||
                    this._parseNumber(array, 2, text, this.type >=3) ||
                    this._parseNumber(array, 3, text, false)) === false) {
                // success
                var offsetSecs = MathUtil.safeZero(negative * (array[1] * 3600 + array[2] * 60 + array[3]));
                return context.setParsedField(ChronoField.OFFSET_SECONDS, offsetSecs, position, array[0]);
            }
        }
        // handle special case of empty no offset text
        if (noOffsetLen === 0) {
            return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position + noOffsetLen);
        }
        return ~position;
    }

    /**
     * Parse a two digit zero-prefixed number.
     *
     * @param {number[]} array  the array of parsed data, 0=pos,1=hours,2=mins,3=secs, not null
     * @param {number} arrayIndex  the index to parse the value into
     * @param {string} parseText  the offset ID, not null
     * @param {boolean} required  whether this number is required
     * @return {boolean} true if an error occurred
     */
    _parseNumber(array, arrayIndex, parseText, required) {
        if ((this.type + 3) / 2 < arrayIndex) {
            return false;  // ignore seconds/minutes
        }
        var pos = array[0];
        if ((this.type % 2) === 0 && arrayIndex > 1) {
            if (pos + 1 > parseText.length || parseText[pos] !== ':') {
                return required;
            }
            pos++;
        }
        if (pos + 2 > parseText.length) {
            return required;
        }
        var ch1 = parseText[pos++];
        var ch2 = parseText[pos++];
        if (ch1 < '0' || ch1 > '9' || ch2 < '0' || ch2 > '9') {
            return required;
        }
        var value = (ch1.charCodeAt(0) - 48) * 10 + (ch2.charCodeAt(0) - 48);
        if (value < 0 || value > 59) {
            return required;
        }
        array[arrayIndex] = value;
        array[0] = pos;
        return false;
    }


    toString() {
        var converted = this.noOffsetText.replace('\'', '\'\'');
        return 'Offset(' + PATTERNS[this.type] + ',"' + converted + '")';
    }
}
OffsetIdPrinterParser.INSTANCE_ID = new OffsetIdPrinterParser('Z', '+HH:MM:ss');

/**
 * Prints or parses a zone ID.
 */
class ZoneIdPrinterParser {

    /**
     *
     * @param {TemporalQuery} query
     * @param {string} description
     */
    constructor(query, description) {
        this.query = query;
        this.description = description;
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param {DateTimePrintContext } context
     * @param {StringBuilder} buf
     * @returns {boolean}
     */
    print(context, buf) {
        var zone = context.getValueQuery(this.query);
        if (zone == null) {
            return false;
        }
        buf.append(zone.id());
        return true;
    }

    //-----------------------------------------------------------------------
    /**
     * This implementation looks for the longest matching string.
     * For example, parsing Etc/GMT-2 will return Etc/GMC-2 rather than just
     * Etc/GMC although both are valid.
     * <p>
     * This implementation uses a tree to search for valid time-zone names in
     * the parseText. The top level node of the tree has a length equal to the
     * length of the shortest time-zone as well as the beginning characters of
     * all other time-zones.
     *
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} position
     * @return {number}
     */
    parse(context, text, position) {
        var length = text.length;
        if (position > length) {
            return ~position;
        }
        if (position === length) {
            return ~position;
        }

        // handle fixed time-zone IDs
        var nextChar = text.charAt(position);
        if (nextChar === '+' || nextChar === '-') {
            var newContext = context.copy();
            var endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
            if (endPos < 0) {
                return endPos;
            }
            var offset = newContext.getParsed(ChronoField.OFFSET_SECONDS);
            var zone = ZoneOffset.ofTotalSeconds(offset);
            context.setParsedZone(zone);
            return endPos;
        } else if (length >= position + 2) {
            var nextNextChar = text.charAt(position + 1);
            if (context.charEquals(nextChar, 'U') &&
                            context.charEquals(nextNextChar, 'T')) {
                if (length >= position + 3 &&
                                context.charEquals(text.charAt(position + 2), 'C')) {
                    return this._parsePrefixedOffset(context, text, position, position + 3);
                }
                return this._parsePrefixedOffset(context, text, position, position + 2);
            } else if (context.charEquals(nextChar, 'G') &&
                    length >= position + 3 &&
                    context.charEquals(nextNextChar, 'M') &&
                    context.charEquals(text.charAt(position + 2), 'T')) {
                return this._parsePrefixedOffset(context, text, position, position + 3);
            }
        }
        // javascript special case
        if(text.substr(position, 6) === 'SYSTEM'){
            context.setParsedZone(ZoneId.systemDefault());
            return position + 6;
        }

        // ...
        if (context.charEquals(nextChar, 'Z')) {
            context.setParsedZone(ZoneOffset.UTC);
            return position + 1;
        }
        // ...
        return ~position;
    }

    /**
     *
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} prefixPos
     * @param {number} position
     * @return {number}
     */
    _parsePrefixedOffset(context, text, prefixPos, position) {
        var prefix = text.substring(prefixPos, position).toUpperCase();
        var newContext = context.copy();
        if (position < text.length && context.charEquals(text.charAt(position), 'Z')) {
            context.setParsedZone(ZoneIdFactory.ofOffset(prefix, ZoneOffset.UTC));
            return position;
        }
        var endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
        if (endPos < 0) {
            context.setParsedZone(ZoneIdFactory.ofOffset(prefix, ZoneOffset.UTC));
            return position;
        }
        var offsetSecs = newContext.getParsed(ChronoField.OFFSET_SECONDS);
        var offset = ZoneOffset.ofTotalSeconds(offsetSecs);
        context.setParsedZone(ZoneIdFactory.ofOffset(prefix, offset));
        return endPos;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return this.description;
    }
}

DateTimeFormatterBuilder.CompositePrinterParser = CompositePrinterParser;
DateTimeFormatterBuilder.PadPrinterParserDecorator = PadPrinterParserDecorator;
DateTimeFormatterBuilder.SettingsParser = SettingsParser;
DateTimeFormatterBuilder.CharLiteralPrinterParser = StringLiteralPrinterParser;
DateTimeFormatterBuilder.StringLiteralPrinterParser = StringLiteralPrinterParser;
DateTimeFormatterBuilder.NumberPrinterParser = NumberPrinterParser;
DateTimeFormatterBuilder.FractionPrinterParser = FractionPrinterParser;
DateTimeFormatterBuilder.OffsetIdPrinterParser = OffsetIdPrinterParser;
DateTimeFormatterBuilder.ZoneIdPrinterParser = ZoneIdPrinterParser;
