/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert, requireNonNull, requireInstance} from '../assert';
import {ArithmeticException, DateTimeException, IllegalArgumentException, IllegalStateException} from '../errors';
import {MathUtil} from '../MathUtil';

import {Enum} from '../Enum';
import {ZoneIdFactory} from '../ZoneIdFactory';
import {LocalDate} from '../LocalDate';
import {LocalDateTime} from '../LocalDateTime';
import {ZoneOffset} from '../ZoneOffset';
import {ZoneId} from '../ZoneId';
import {ChronoLocalDate} from '../chrono/ChronoLocalDate';
import {IsoChronology} from '../chrono/IsoChronology';
import {ChronoField} from '../temporal/ChronoField';
import {IsoFields} from '../temporal/IsoFields';
import {TemporalQueries} from '../temporal/TemporalQueries';

import {DateTimeFormatter} from './DateTimeFormatter';
import {DecimalStyle} from './DecimalStyle';
import {SignStyle} from './SignStyle';
import {TextStyle} from './TextStyle';
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
        requireNonNull(field);
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
        requireNonNull(field);
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
        requireNonNull(field);
        requireNonNull(signStyle);
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
     * appendValueReduced function overloading
     */
    appendValueReduced() {
        if (arguments.length === 4 && arguments[3] instanceof ChronoLocalDate) {
            return this._appendValueReducedFieldWidthMaxWidthBaseDate.apply(this, arguments);
        } else {
            return this._appendValueReducedFieldWidthMaxWidthBaseValue.apply(this, arguments);
        }
    }
    
    /**
     * Appends the reduced value of a date-time field to the formatter.
     * <p>
     * Since fields such as year vary by chronology, it is recommended to use the
     * {@link #appendValueReduced(TemporalField, int, int, ChronoLocalDate)} date}
     * variant of this method in most cases. This variant is suitable for
     * simple fields or working with only the ISO chronology.
     * <p>
     * For formatting, the {@code width} and {@code maxWidth} are used to
     * determine the number of characters to format.
     * If they are equal then the format is fixed width.
     * If the value of the field is within the range of the {@code baseValue} using
     * {@code width} characters then the reduced value is formatted otherwise the value is
     * truncated to fit {@code maxWidth}.
     * The rightmost characters are output to match the width, left padding with zero.
     * <p>
     * For strict parsing, the number of characters allowed by {@code width} to {@code maxWidth} are parsed.
     * For lenient parsing, the number of characters must be at least 1 and less than 10.
     * If the number of digits parsed is equal to {@code width} and the value is positive,
     * the value of the field is computed to be the first number greater than
     * or equal to the {@code baseValue} with the same least significant characters,
     * otherwise the value parsed is the field value.
     * This allows a reduced value to be entered for values in range of the baseValue
     * and width and absolute values can be entered for values outside the range.
     * <p>
     * For example, a base value of {@code 1980} and a width of {@code 2} will have
     * valid values from {@code 1980} to {@code 2079}.
     * During parsing, the text {@code "12"} will result in the value {@code 2012} as that
     * is the value within the range where the last two characters are "12".
     * By contrast, parsing the text {@code "1915"} will result in the value {@code 1915}.
     *
     * @param {TemporalField} field  the field to append, not null
     * @param {number} width  the field width of the printed and parsed field, from 1 to 10
     * @param {number} maxWidth  the maximum field width of the printed field, from 1 to 10
     * @param {number} baseValue  the base value of the range of valid values
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if the width or base value is invalid
     */
    _appendValueReducedFieldWidthMaxWidthBaseValue(field, width, maxWidth, baseValue) {
        requireNonNull(field, 'field');
        let pp = new ReducedPrinterParser(field, width, maxWidth, baseValue, null);
        this._appendValuePrinterParser(pp);
        return this;
    }

    /**
     * Appends the reduced value of a date-time field to the formatter.
     * <p>
     * This is typically used for formatting and parsing a two digit year.
     * <p>
     * The base date is used to calculate the full value during parsing.
     * For example, if the base date is 1950-01-01 then parsed values for
     * a two digit year parse will be in the range 1950-01-01 to 2049-12-31.
     * Only the year would be extracted from the date, thus a base date of
     * 1950-08-25 would also parse to the range 1950-01-01 to 2049-12-31.
     * This behavior is necessary to support fields such as week-based-year
     * or other calendar systems where the parsed value does not align with
     * standard ISO years.
     * <p>
     * The exact behavior is as follows. Parse the full set of fields and
     * determine the effective chronology using the last chronology if
     * it appears more than once. Then convert the base date to the
     * effective chronology. Then extract the specified field from the
     * chronology-specific base date and use it to determine the
     * {@code baseValue} used below.
     * <p>
     * For formatting, the {@code width} and {@code maxWidth} are used to
     * determine the number of characters to format.
     * If they are equal then the format is fixed width.
     * If the value of the field is within the range of the {@code baseValue} using
     * {@code width} characters then the reduced value is formatted otherwise the value is
     * truncated to fit {@code maxWidth}.
     * The rightmost characters are output to match the width, left padding with zero.
     * <p>
     * For strict parsing, the number of characters allowed by {@code width} to {@code maxWidth} are parsed.
     * For lenient parsing, the number of characters must be at least 1 and less than 10.
     * If the number of digits parsed is equal to {@code width} and the value is positive,
     * the value of the field is computed to be the first number greater than
     * or equal to the {@code baseValue} with the same least significant characters,
     * otherwise the value parsed is the field value.
     * This allows a reduced value to be entered for values in range of the baseValue
     * and width and absolute values can be entered for values outside the range.
     * <p>
     * For example, a base value of {@code 1980} and a width of {@code 2} will have
     * valid values from {@code 1980} to {@code 2079}.
     * During parsing, the text {@code "12"} will result in the value {@code 2012} as that
     * is the value within the range where the last two characters are "12".
     * By contrast, parsing the text {@code "1915"} will result in the value {@code 1915}.
     *
     * @param {TemporaField} field  the field to append, not null
     * @param {number} width  the field width of the printed and parsed field, from 1 to 10
     * @param {number} maxWidth  the maximum field width of the printed field, from 1 to 10
     * @param {ChronoLocalDate} baseDate  the base date used to calculate the base value for the range
     *  of valid values in the parsed chronology, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if the width or base value is invalid
     */
    _appendValueReducedFieldWidthMaxWidthBaseDate(field, width, maxWidth, baseDate) {
        requireNonNull(field, 'field');
        requireNonNull(baseDate, 'baseDate');
        requireInstance(baseDate, ChronoLocalDate, 'baseDate');
        let pp = new ReducedPrinterParser(field, width, maxWidth, 0, baseDate);
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
     * Appends the zone offset, such as '+01:00', to the formatter.
     * <p>
     * This appends an instruction to print/parse the offset ID to the builder.
     * <p>
     * During printing, the offset is obtained using a mechanism equivalent
     * to querying the temporal with {@link TemporalQueries#offset()}.
     * It will be printed using the format defined below.
     * If the offset cannot be obtained then an exception is thrown unless the
     * section of the formatter is optional.
     * <p>
     * During parsing, the offset is parsed using the format defined below.
     * If the offset cannot be parsed then an exception is thrown unless the
     * section of the formatter is optional.
     * <p>
     * The format of the offset is controlled by a pattern which must be one
     * of the following:
     * <p><ul>
     * <li>{@code +HH} - hour only, ignoring minute and second
     * <li>{@code +HHmm} - hour, with minute if non-zero, ignoring second, no colon
     * <li>{@code +HH:mm} - hour, with minute if non-zero, ignoring second, with colon
     * <li>{@code +HHMM} - hour and minute, ignoring second, no colon
     * <li>{@code +HH:MM} - hour and minute, ignoring second, with colon
     * <li>{@code +HHMMss} - hour and minute, with second if non-zero, no colon
     * <li>{@code +HH:MM:ss} - hour and minute, with second if non-zero, with colon
     * <li>{@code +HHMMSS} - hour, minute and second, no colon
     * <li>{@code +HH:MM:SS} - hour, minute and second, with colon
     * </ul><p>
     * The "no offset" text controls what text is printed when the total amount of
     * the offset fields to be output is zero.
     * Example values would be 'Z', '+00:00', 'UTC' or 'GMT'.
     * Three formats are accepted for parsing UTC - the "no offset" text, and the
     * plus and minus versions of zero defined by the pattern.
     *
     * @param {String} pattern  the pattern to use, not null
     * @param {String} noOffsetText  the text to use when the offset is zero, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendOffset(pattern, noOffsetText) {
        this._appendInternalPrinterParser(new OffsetIdPrinterParser(noOffsetText, pattern));
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
     * Appends the elements defined by the specified pattern to the builder.
     * <p>
     * All letters 'A' to 'Z' and 'a' to 'z' are reserved as pattern letters.
     * The characters '{' and '}' are reserved for future use.
     * The characters '[' and ']' indicate optional patterns.
     * The following pattern letters are defined:
     * <pre>
     *  Symbol  Meaning                     Presentation      Examples
     *  ------  -------                     ------------      -------
     *   G       era                         number/text       1; 01; AD; Anno Domini
     *   y       year                        year              2004; 04
     *   D       day-of-year                 number            189
     *   M       month-of-year               number/text       7; 07; Jul; July; J
     *   d       day-of-month                number            10
     *
     *   Q       quarter-of-year             number/text       3; 03; Q3
     *   Y       week-based-year             year              1996; 96
     *   w       week-of-year                number            27
     *   W       week-of-month               number            27
     *   e       localized day-of-week       number            2; Tue; Tuesday; T
     *   E       day-of-week                 number/text       2; Tue; Tuesday; T
     *   F       week-of-month               number            3
     *
     *   a       am-pm-of-day                text              PM
     *   h       clock-hour-of-am-pm (1-12)  number            12
     *   K       hour-of-am-pm (0-11)        number            0
     *   k       clock-hour-of-am-pm (1-24)  number            0
     *
     *   H       hour-of-day (0-23)          number            0
     *   m       minute-of-hour              number            30
     *   s       second-of-minute            number            55
     *   S       fraction-of-second          fraction          978
     *   A       milli-of-day                number            1234
     *   n       nano-of-second              number            987654321
     *   N       nano-of-day                 number            1234000000
     *
     *   V       time-zone ID                zone-id           America/Los_Angeles; Z; -08:30
     *   z       time-zone name              zone-name         Pacific Standard Time; PST
     *   X       zone-offset 'Z' for zero    offset-X          Z; -08; -0830; -08:30; -083015; -08:30:15;
     *   x       zone-offset                 offset-x          +0000; -08; -0830; -08:30; -083015; -08:30:15;
     *   Z       zone-offset                 offset-Z          +0000; -0800; -08:00;
     *
     *   p       pad next                    pad modifier      1
     *
     *   '       escape for text             delimiter
     *   ''      single quote                literal           '
     *   [       optional section start
     *   ]       optional section end
     *   {}      reserved for future use
     * </pre>
     * <p>
     * The count of pattern letters determine the format.
     * <p>
     * <b>Text</b>: The text style is determined based on the number of pattern letters used.
     * Less than 4 pattern letters will use the {@link TextStyle#SHORT short form}.
     * Exactly 4 pattern letters will use the {@link TextStyle#FULL full form}.
     * Exactly 5 pattern letters will use the {@link TextStyle#NARROW narrow form}.
     * <p>
     * <b>Number</b>: If the count of letters is one, then the value is printed using the minimum number
     * of digits and without padding as per {@link #appendValue(TemporalField)}. Otherwise, the
     * count of digits is used as the width of the output field as per {@link #appendValue(TemporalField, int)}.
     * <p>
     * <b>Number/Text</b>: If the count of pattern letters is 3 or greater, use the Text rules above.
     * Otherwise use the Number rules above.
     * <p>
     * <b>Fraction</b>: Outputs the nano-of-second field as a fraction-of-second.
     * The nano-of-second value has nine digits, thus the count of pattern letters is from 1 to 9.
     * If it is less than 9, then the nano-of-second value is truncated, with only the most
     * significant digits being output.
     * When parsing in strict mode, the number of parsed digits must match the count of pattern letters.
     * When parsing in lenient mode, the number of parsed digits must be at least the count of pattern
     * letters, up to 9 digits.
     * <p>
     * <b>Year</b>: The count of letters determines the minimum field width below which padding is used.
     * If the count of letters is two, then a {@link #appendValueReduced reduced} two digit form is used.
     * For printing, this outputs the rightmost two digits. For parsing, this will parse using the
     * base value of 2000, resulting in a year within the range 2000 to 2099 inclusive.
     * If the count of letters is less than four (but not two), then the sign is only output for negative
     * years as per {@link SignStyle#NORMAL}.
     * Otherwise, the sign is output if the pad width is exceeded, as per {@link SignStyle#EXCEEDS_PAD}
     * <p>
     * <b>ZoneId</b>: This outputs the time-zone ID, such as 'Europe/Paris'.
     * If the count of letters is two, then the time-zone ID is output.
     * Any other count of letters throws {@code IllegalArgumentException}.
     * <pre>
     *  Pattern     Equivalent builder methods
     *   VV          appendZoneId()
     * </pre>
     * <p>
     * <b>Zone names</b>: This outputs the display name of the time-zone ID.
     * If the count of letters is one, two or three, then the short name is output.
     * If the count of letters is four, then the full name is output.
     * Five or more letters throws {@code IllegalArgumentException}.
     * <pre>
     *  Pattern     Equivalent builder methods
     *   z           appendZoneText(TextStyle.SHORT)
     *   zz          appendZoneText(TextStyle.SHORT)
     *   zzz         appendZoneText(TextStyle.SHORT)
     *   zzzz        appendZoneText(TextStyle.FULL)
     * </pre>
     * <p>
     * <b>Offset X and x</b>: This formats the offset based on the number of pattern letters.
     * One letter outputs just the hour', such as '+01', unless the minute is non-zero
     * in which case the minute is also output, such as '+0130'.
     * Two letters outputs the hour and minute, without a colon, such as '+0130'.
     * Three letters outputs the hour and minute, with a colon, such as '+01:30'.
     * Four letters outputs the hour and minute and optional second, without a colon, such as '+013015'.
     * Five letters outputs the hour and minute and optional second, with a colon, such as '+01:30:15'.
     * Six or more letters throws {@code IllegalArgumentException}.
     * Pattern letter 'X' (upper case) will output 'Z' when the offset to be output would be zero,
     * whereas pattern letter 'x' (lower case) will output '+00', '+0000', or '+00:00'.
     * <pre>
     *  Pattern     Equivalent builder methods
     *   X           appendOffset("+HHmm","Z")
     *   XX          appendOffset("+HHMM","Z")
     *   XXX         appendOffset("+HH:MM","Z")
     *   XXXX        appendOffset("+HHMMss","Z")
     *   XXXXX       appendOffset("+HH:MM:ss","Z")
     *   x           appendOffset("+HHmm","+00")
     *   xx          appendOffset("+HHMM","+0000")
     *   xxx         appendOffset("+HH:MM","+00:00")
     *   xxxx        appendOffset("+HHMMss","+0000")
     *   xxxxx       appendOffset("+HH:MM:ss","+00:00")
     * </pre>
     * <p>
     * <b>Offset Z</b>: This formats the offset based on the number of pattern letters.
     * One, two or three letters outputs the hour and minute, without a colon, such as '+0130'.
     * Four or more letters throws {@code IllegalArgumentException}.
     * The output will be '+0000' when the offset is zero.
     * <pre>
     *  Pattern     Equivalent builder methods
     *   Z           appendOffset("+HHMM","+0000")
     *   ZZ          appendOffset("+HHMM","+0000")
     *   ZZZ         appendOffset("+HHMM","+0000")
     * </pre>
     * <p>
     * <b>Optional section</b>: The optional section markers work exactly like calling {@link #optionalStart()}
     * and {@link #optionalEnd()}.
     * <p>
     * <b>Pad modifier</b>: Modifies the pattern that immediately follows to be padded with spaces.
     * The pad width is determined by the number of pattern letters.
     * This is the same as calling {@link #padNext(int)}.
     * <p>
     * For example, 'ppH' outputs the hour-of-day padded on the left with spaces to a width of 2.
     * <p>
     * Any unrecognized letter is an error.
     * Any non-letter character, other than '[', ']', '{', '}' and the single quote will be output directly.
     * Despite this, it is recommended to use single quotes around all characters that you want to
     * output directly to ensure that future changes do not break your application.
     * <p>
     * Note that the pattern string is similar, but not identical, to
     * {@link java.text.SimpleDateFormat SimpleDateFormat}.
     * The pattern string is also similar, but not identical, to that defined by the
     * Unicode Common Locale Data Repository (CLDR/LDML).
     * Pattern letters 'E' and 'u' are merged, which changes the meaning of "E" and "EE" to be numeric.
     * Pattern letters 'X' is aligned with Unicode CLDR/LDML, which affects pattern 'X'.
     * Pattern letter 'y' and 'Y' parse years of two digits and more than 4 digits differently.
     * Pattern letters 'n', 'A', 'N', 'I' and 'p' are added.
     * Number types will reject large numbers.
     *
     * @param {String} pattern  the pattern to add, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if the pattern is invalid
     */
    appendPattern(pattern) {
        requireNonNull(pattern, 'pattern');
        this._parsePattern(pattern);
        return this;
    }

    _parsePattern(pattern) {
        /** Map of letters to fields. */
        const FIELD_MAP = {
            'G': ChronoField.ERA,
            'y': ChronoField.YEAR_OF_ERA,
            'u': ChronoField.YEAR,
            'Q': IsoFields.QUARTER_OF_YEAR,
            'q': IsoFields.QUARTER_OF_YEAR,
            'M': ChronoField.MONTH_OF_YEAR,
            'L': ChronoField.MONTH_OF_YEAR,
            'D': ChronoField.DAY_OF_YEAR,
            'd': ChronoField.DAY_OF_MONTH,
            'F': ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH,
            'E': ChronoField.DAY_OF_WEEK,
            'c': ChronoField.DAY_OF_WEEK,
            'e': ChronoField.DAY_OF_WEEK,
            'a': ChronoField.AMPM_OF_DAY,
            'H': ChronoField.HOUR_OF_DAY,
            'k': ChronoField.CLOCK_HOUR_OF_DAY,
            'K': ChronoField.HOUR_OF_AMPM,
            'h': ChronoField.CLOCK_HOUR_OF_AMPM,
            'm': ChronoField.MINUTE_OF_HOUR,
            's': ChronoField.SECOND_OF_MINUTE,
            'S': ChronoField.NANO_OF_SECOND,
            'A': ChronoField.MILLI_OF_DAY,
            'n': ChronoField.NANO_OF_SECOND,
            'N': ChronoField.NANO_OF_DAY
        };

        for (let pos = 0; pos < pattern.length; pos++) {
            let cur = pattern.charAt(pos);
            if ((cur >= 'A' && cur <= 'Z') || (cur >= 'a' && cur <= 'z')) {
                let start = pos++;
                for (; pos < pattern.length && pattern.charAt(pos) === cur; pos++);  // short loop
                let count = pos - start;
                // padding
                if (cur === 'p') {
                    let pad = 0;
                    if (pos < pattern.length) {
                        cur = pattern.charAt(pos);
                        if ((cur >= 'A' && cur <= 'Z') || (cur >= 'a' && cur <= 'z')) {
                            pad = count;
                            start = pos++;
                            for (; pos < pattern.length && pattern.charAt(pos) === cur; pos++);  // short loop
                            count = pos - start;
                        }
                    }
                    if (pad === 0) {
                        throw new IllegalArgumentException(
                            'Pad letter \'p\' must be followed by valid pad pattern: ' + pattern);
                    }
                    this.padNext(pad); // pad and continue parsing
                }
                // main rules
                let field = FIELD_MAP[cur];
                if (field != null) {
                    this._parseField(cur, count, field);
                } else if (cur === 'z') {
                    if (count > 4) {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    } else if (count === 4) {
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendZoneText(TextStyle.FULL);
                    } else {
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendZoneText(TextStyle.SHORT);
                    }
                } else if (cur === 'V') {
                    if (count !== 2) {
                        throw new IllegalArgumentException('Pattern letter count must be 2: ' + cur);
                    }
                    this.appendZoneId();
                } else if (cur === 'Z') {
                    if (count < 4) {
                        this.appendOffset('+HHMM', '+0000');
                    } else if (count === 4) {
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendLocalizedOffset(TextStyle.FULL);
                    } else if (count === 5) {
                        this.appendOffset('+HH:MM:ss', 'Z');
                    } else {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    }
                } else if (cur === 'O') {
                    if (count === 1) {
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendLocalizedOffset(TextStyle.SHORT);
                    } else if (count === 4) {
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendLocalizedOffset(TextStyle.FULL);
                    } else {
                        throw new IllegalArgumentException('Pattern letter count must be 1 or 4: ' + cur);
                    }
                } else if (cur === 'X') {
                    if (count > 5) {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    }
                    this.appendOffset(OffsetIdPrinterParser.PATTERNS[count + (count === 1 ? 0 : 1)], 'Z');
                } else if (cur === 'x') {
                    if (count > 5) {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    }
                    let zero = (count === 1 ? '+00' : (count % 2 === 0 ? '+0000' : '+00:00'));
                    this.appendOffset(OffsetIdPrinterParser.PATTERNS[count + (count === 1 ? 0 : 1)], zero);
                } else if (cur === 'W') {
                    if (count > 1) {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    }
                    this._appendInternal(new OffsetIdPrinterParser('W', count));
                } else if (cur === 'w') {
                    if (count > 2) {
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                    }
                    this._appendInternal(new OffsetIdPrinterParser('w', count));
                } else if (cur === 'Y') {
                    this._appendInternal(new OffsetIdPrinterParser('Y', count));
                } else {
                    throw new IllegalArgumentException('Unknown pattern letter: ' + cur);
                }
                pos--;

            } else if (cur === '\'') {
                // parse literals
                let start = pos++;
                for (; pos < pattern.length; pos++) {
                    if (pattern.charAt(pos) === '\'') {
                        if (pos + 1 < pattern.length && pattern.charAt(pos + 1) === '\'') {
                            pos++;
                        } else {
                            break;  // end of literal
                        }
                    }
                }
                if (pos >= pattern.length) {
                    throw new IllegalArgumentException('Pattern ends with an incomplete string literal: ' + pattern);
                }
                let str = pattern.substring(start + 1, pos);
                if (str.length === 0) {
                    this.appendLiteral('\'');
                } else {
                    this.appendLiteral(str.replace('\'\'', '\''));
                }

            } else if (cur === '[') {
                this.optionalStart();

            } else if (cur === ']') {
                if (this._active._parent === null) {
                    throw new IllegalArgumentException('Pattern invalid as it contains ] without previous [');
                }
                this.optionalEnd();

            } else if (cur === '{' || cur === '}' || cur === '#') {
                throw new IllegalArgumentException('Pattern includes reserved character: \'' + cur + '\'');
            } else {
                this.appendLiteral(cur);
            }
        }
    }

    _parseField(cur, count, field) {
        switch (cur) {
            case 'u':
            case 'y':
                if (count === 2) {
                    this.appendValueReduced(field, 2, 2, ReducedPrinterParser.BASE_DATE);
                } else if (count < 4) {
                    this.appendValue(field, count, MAX_WIDTH, SignStyle.NORMAL);
                } else {
                    this.appendValue(field, count, MAX_WIDTH, SignStyle.EXCEEDS_PAD);
                }
                break;
            case 'M':
            case 'Q':
                switch (count) {
                    case 1:
                        this.appendValue(field);
                        break;
                    case 2:
                        this.appendValue(field, 2);
                        break;
                    case 3:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.SHORT);
                        break;
                    case 4:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.FULL);
                        break;
                    case 5:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.NARROW);
                        break;
                    default:
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'L':
            case 'q':
                switch (count) {
                    case 1:
                        this.appendValue(field);
                        break;
                    case 2:
                        this.appendValue(field, 2);
                        break;
                    case 3:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.SHORT_STANDALONE);
                        break;
                    case 4:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.FULL_STANDALONE);
                        break;
                    case 5:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.NARROW_STANDALONE);
                        break;
                    default:
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'e':
                switch (count) {
                    case 1:
                    case 2:
                        // TODO: WeekFieldsPrinterParser
                        throw new IllegalArgumentException('Pattern using WeekFields not implemented yet!');
                        // this.appendInternal(new WeekFieldsPrinterParser('e', count));
                        break;
                    case 3:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.SHORT);
                        break;
                    case 4:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.FULL);
                        break;
                    case 5:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.NARROW);
                        break;
                    default:
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'c':
                switch (count) {
                    case 1:
                        // TODO: WeekFieldsPrinterParser
                        throw new IllegalArgumentException('Pattern using WeekFields not implemented yet!');
                        // this.appendInternal(new WeekFieldsPrinterParser('c', count));
                        break;
                    case 2:
                        throw new IllegalArgumentException('Invalid number of pattern letters: ' + cur);
                    case 3:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.SHORT_STANDALONE);
                        break;
                    case 4:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.FULL_STANDALONE);
                        break;
                    case 5:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.NARROW_STANDALONE);
                        break;
                    default:
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'a':
                if (count === 1) {
                    //TODO:
                    throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                    this.appendText(field, TextStyle.SHORT);
                } else {
                    throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'E':
            case 'G':
                switch (count) {
                    case 1:
                    case 2:
                    case 3:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.SHORT);
                        break;
                    case 4:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.FULL);
                        break;
                    case 5:
                        //TODO:
                        throw new IllegalArgumentException('Pattern using (localized) text not implemented yet!');
                        this.appendText(field, TextStyle.NARROW);
                        break;
                    default:
                        throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'S':
                this.appendFraction(ChronoField.NANO_OF_SECOND, count, count, false);
                break;
            case 'F':
                if (count === 1) {
                    this.appendValue(field);
                } else {
                    throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'd':
            case 'h':
            case 'H':
            case 'k':
            case 'K':
            case 'm':
            case 's':
                if (count === 1) {
                    this.appendValue(field);
                } else if (count === 2) {
                    this.appendValue(field, count);
                } else {
                    throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            case 'D':
                if (count === 1) {
                    this.appendValue(field);
                } else if (count <= 3) {
                    this.appendValue(field, count);
                } else {
                    throw new IllegalArgumentException('Too many pattern letters: ' + cur);
                }
                break;
            default:
                if (count === 1) {
                    this.appendValue(field);
                } else {
                    this.appendValue(field, count);
                }
                break;
        }
    }

    /**
     * padNext function overloading
     */
    padNext() {
        if (arguments.length === 1) {
            return this._padNext1.apply(this, arguments);
        } else {
            return this._padNext2.apply(this, arguments);
        }
    }

    /**
     * Causes the next added printer/parser to pad to a fixed width using a space.
     * <p>
     * This padding will pad to a fixed width using spaces.
     * <p>
     * During formatting, the decorated element will be output and then padded
     * to the specified width. An exception will be thrown during printing if
     * the pad width is exceeded.
     * <p>
     * During parsing, the padding and decorated element are parsed.
     * If parsing is lenient, then the pad width is treated as a maximum.
     * If parsing is case insensitive, then the pad character is matched ignoring case.
     * The padding is parsed greedily. Thus, if the decorated element starts with
     * the pad character, it will not be parsed.
     *
     * @param {number} padWidth  the pad width, 1 or greater
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if pad width is too small
     */
    _padNext1(padWidth) {
        return this._padNext2(padWidth, ' ');
    }

    /**
     * Causes the next added printer/parser to pad to a fixed width.
     * <p>
     * This padding is intended for padding other than zero-padding.
     * Zero-padding should be achieved using the appendValue methods.
     * <p>
     * During formatting, the decorated element will be output and then padded
     * to the specified width. An exception will be thrown during printing if
     * the pad width is exceeded.
     * <p>
     * During parsing, the padding and decorated element are parsed.
     * If parsing is lenient, then the pad width is treated as a maximum.
     * If parsing is case insensitive, then the pad character is matched ignoring case.
     * The padding is parsed greedily. Thus, if the decorated element starts with
     * the pad character, it will not be parsed.
     *
     * @param {number} padWidth  the pad width, 1 or greater
     * @param {String} padChar  the pad character
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     * @throws IllegalArgumentException if pad width is too small
     */
    _padNext2(padWidth, padChar) {
        if (padWidth < 1) {
            throw new IllegalArgumentException('The pad width must be at least one but was ' + padWidth);
        }
        this._active._padNextWidth = padWidth;
        this._active._padNextChar = padChar;
        this._active._valueParserIndex = -1;
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
        this._active._valueParserIndex = -1;
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
        if (literal.length > 0) {
            if (literal.length === 1) {
                this._appendInternalPrinterParser(new CharLiteralPrinterParser(literal.charAt(0)));
            } else {
                this._appendInternalPrinterParser(new StringLiteralPrinterParser(literal));
            }
        }
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
        assert(position >= 0);
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
        let converted = this._literal.replace("'", "''");
        return '\'' + converted + '\'';
    }
}

/**
 * Prints or parses a char literal.
 */
class CharLiteralPrinterParser {

    constructor(literal) {
        if (literal.length > 1) {
            throw new IllegalArgumentException('invalid literal, too long: "' + literal + '"');
        }
        this._literal = literal;
    }

    print(context, buf) {
        buf.append(this._literal);
        return true;
    }

    parse(context, text, position) {
        var length = text.length;
        if (position === length) {
            return ~position;
        }
        let ch = text.charAt(position);
        if (context.charEquals(this._literal, ch) === false) {
            return ~position;
        }
        return position + this._literal.length;
    }

    toString() {
        if (this._literal === '\'') {
            return "''";
        }
        return "'" + this._literal + "'";
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
    
    withFixedWidth() {
        if (this._subsequentWidth === -1) {
            return this;
        }
        return new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, -1);
    }
    
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
/**
 * Prints and parses a reduced numeric date-time field.
 */
class ReducedPrinterParser extends NumberPrinterParser {

    /**
     * Constructor.
     *
     * @param {TemporalField} field  the field to print, validated not null
     * @param {number} width  the field width, from 1 to 10
     * @param {number} maxWidth  the field max width, from 1 to 10
     * @param {number} baseValue  the base value
     * @param {ChronoLocalDate} baseDate  the base date
     */
    constructor(field, width, maxWidth, baseValue, baseDate) {
        super(field, width, maxWidth, SignStyle.NOT_NEGATIVE);
        if (width < 1 || width > 10) {
            throw new IllegalArgumentException('The width must be from 1 to 10 inclusive but was ' + width);
        }
        if (maxWidth < 1 || maxWidth > 10) {
            throw new IllegalArgumentException('The maxWidth must be from 1 to 10 inclusive but was ' + maxWidth);
        }
        if (maxWidth < width) {
            throw new IllegalArgumentException('The maxWidth must be greater than the width');
        }
        if (baseDate === null) {
            if (field.range().isValidValue(baseValue) === false) {
                throw new IllegalArgumentException('The base value must be within the range of the field');
            }
            if ((baseValue + EXCEED_POINTS[width]) > MathUtil.MAX_SAFE_INTEGER) {
                throw new DateTimeException('Unable to add printer-parser as the range exceeds the capacity of an int');
            }
        }
        this._baseValue = baseValue;
        this._baseDate = baseDate;
    }

    /**
     *
     * @param {DateTimePrintContext} context
     * @param {number} value
     */
    getValue(context, value) {
        let absValue = Math.abs(value);
        let baseValue = this._baseValue;
        if (this._baseDate !== null) {
            // TODO: in threetenbp the following line is used, but we dont have Chronology yet, 
            // let chrono = Chronology.from(context.getTemporal());
            // so let's use IsoChronology for now
            context.temporal();
            let chrono = IsoChronology.INSTANCE;
            baseValue = chrono.date(this._baseDate).get(this._field);
        }
        if (value >= baseValue && value < baseValue + EXCEED_POINTS[this._minWidth]) {
            return absValue % EXCEED_POINTS[this._minWidth];
        }
        return absValue % EXCEED_POINTS[this._maxWidth];
    }

    /**
     *
     * @param {DateTimeParseContext} context
     * @param {number} value
     * @param {number} errorPos
     * @param {number} successPos
     */
    _setValue(context, value, errorPos, successPos) {
        let baseValue = this._baseValue;
        if (this._baseDate != null) {
            let chrono = context.getEffectiveChronology();
            baseValue = chrono.date(this._baseDate).get(this._field);
            context.addChronologyChangedParser(this, value, errorPos, successPos);
        }
        let parseLen = successPos - errorPos;
        if (parseLen === this._minWidth && value >= 0) {
            let range = EXCEED_POINTS[this._minWidth];
            let lastPart = baseValue % range;
            let basePart = baseValue - lastPart;
            if (baseValue > 0) {
                value = basePart + value;
            } else {
                value = basePart - value;
            }
            if (value < baseValue) {
                value += range;
            }
        }
        return context.setParsedField(this._field, value, errorPos, successPos);
    }

    withFixedWidth() {
        if (this._subsequentWidth === -1) {
            return this;
        }
        return new ReducedPrinterParser(this._field, this._minWidth, this._maxWidth, this._baseValue, this._baseDate, -1);
    }

    /**
     *
     * @param {number} subsequentWidth
     * @returns {ReducedPrinterParser}
     */
    withSubsequentWidth(subsequentWidth) {
        return new ReducedPrinterParser(this._field, this._minWidth, this._maxWidth, this._baseValue, this._baseDate,
            this._subsequentWidth + subsequentWidth);
    }

    /**
     *
     * @param {DateTimeParseContext} context
     */
    isFixedWidth(context) {
        if (context.isStrict() === false) {
            return false;
        }
        return super.isFixedWidth(context);
    }

    toString() {
        return 'ReducedValue(' + this._field + ',' + this._minWidth + ',' + this._maxWidth + ',' + (this._baseDate != null ? this._baseDate : this._baseValue) + ')';
    }
}


//-----------------------------------------------------------------------

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
        return 'Offset(' + PATTERNS[this.type] + ',\'' + converted + '\')';
    }
}
OffsetIdPrinterParser.INSTANCE_ID = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
OffsetIdPrinterParser.PATTERNS = PATTERNS;

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

export function _init() {
    ReducedPrinterParser.BASE_DATE = LocalDate.of(2000, 1, 1);

    DateTimeFormatterBuilder.CompositePrinterParser = CompositePrinterParser;
    DateTimeFormatterBuilder.PadPrinterParserDecorator = PadPrinterParserDecorator;
    DateTimeFormatterBuilder.SettingsParser = SettingsParser;
    DateTimeFormatterBuilder.CharLiteralPrinterParser = StringLiteralPrinterParser;
    DateTimeFormatterBuilder.StringLiteralPrinterParser = StringLiteralPrinterParser;
    DateTimeFormatterBuilder.CharLiteralPrinterParser = CharLiteralPrinterParser;
    DateTimeFormatterBuilder.NumberPrinterParser = NumberPrinterParser;
    DateTimeFormatterBuilder.ReducedPrinterParser = ReducedPrinterParser;
    DateTimeFormatterBuilder.FractionPrinterParser = FractionPrinterParser;
    DateTimeFormatterBuilder.OffsetIdPrinterParser = OffsetIdPrinterParser;
    DateTimeFormatterBuilder.ZoneIdPrinterParser = ZoneIdPrinterParser;
}