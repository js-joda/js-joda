/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    DateTimeFormatterBuilder,
    IllegalArgumentException,
    TextStyle,
    ChronoField,
    TemporalField
} from '@js-joda/core';

import TextPrinterParser from '../parser/TextPrinterParser';
import CldrDateTimeTextProvider from './CldrDateTimeTextProvider';
import CldrZoneTextPrinterParser from './CldrZoneTextPrinterParser';
import {LocaleStore} from '../LocaleStore';
import LocalizedOffsetPrinterParser from '../parser/LocalizedOffsetPrinterParser';
import WeekFieldsPrinterParser from '../parser/WeekFieldsPrinterParser';

const { assert: { requireNonNull, requireInstance } } = jodaInternal;

/** DateTimeFormatterBuilder extension functions implementing locale handling using cldr data (http://cldr.unicode.org/)
 */
export default class CldrDateTimeFormatterBuilder extends DateTimeFormatterBuilder {

    //-------------------------------------------------------------------------
    /**
     * function overloading for {@link CldrDateTimeFormatterBuilder#appendText}
     *
     * if called with 1 arguments and first argument is an instance of ChronoField,
     * then {@link CldrDateTimeFormatterBuilder.appendTextField} is executed.
     * if called with 2 arguments and second argument is an instance of TextStyle,
     * then {@link CldrDateTimeFormatterBuilder.appendTextFieldStyle} is executed.
     *
     * Otherwise {@link CldrDateTimeFormatterBuilder.appendTextFieldMap} is executed.
     *
     * @param {!ChronoField} field
     * @param {!(TextStyle|Object)} styleOrMap
     * @returns {DateTimeFormatterBuilder} this for chaining
     */
    appendText(field, styleOrMap) {
        if (styleOrMap === undefined) {
            return this.appendTextField(field);
        } else if (styleOrMap instanceof TextStyle) {
            return this.appendTextFieldStyle(field, styleOrMap);
        } else {
            return this.appendTextFieldMap(field, styleOrMap);
        }
    }

    /**
     * Appends the text of a date-time field to the formatter using the full
     * text style.
     * <p>
     * The text of the field will be output during a print.
     * The value must be within the valid range of the field.
     * If the value cannot be obtained then an exception will be thrown.
     * If the field has no textual representation, then the numeric value will be used.
     * <p>
     * The value will be printed as per the normal print of an integer value.
     * Only negative numbers will be signed. No padding will be added.
     *
     * @param {!TemporalField} field  the field to append, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendTextField(field) {
        return this.appendTextFieldStyle(field, TextStyle.FULL);
    }

    /**
     * Appends the text of a date-time field to the formatter.
     * <p>
     * The text of the field will be output during a print.
     * The value must be within the valid range of the field.
     * If the value cannot be obtained then an exception will be thrown.
     * If the field has no textual representation, then the numeric value will be used.
     * <p>
     * The value will be printed as per the normal print of an integer value.
     * Only negative numbers will be signed. No padding will be added.
     *
     * @param {!TemporalField} field  the field to append, not null
     * @param {!TextStyle} textStyle  the text style to use, not null
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendTextFieldStyle(field, textStyle) {
        requireNonNull(field, 'field');
        requireInstance(field, TemporalField, 'field');
        requireNonNull(textStyle, 'textStyle');
        requireInstance(textStyle, TextStyle, 'textStyle');
        this._appendInternal(new TextPrinterParser(field, textStyle, new CldrDateTimeTextProvider()));
        return this;
    }

    /**
     * Appends the text of a date-time field to the formatter using the specified
     * map to supply the text.
     * <p>
     * The standard text outputting methods use the localized text in the JDK.
     * This method allows that text to be specified directly.
     * The supplied map is not validated by the builder to ensure that printing or
     * parsing is possible, thus an invalid map may throw an error during later use.
     * <p>
     * Supplying the map of text provides considerable flexibility in printing and parsing.
     * For example, a legacy application might require or supply the months of the
     * year as "JNY", "FBY", "MCH" etc. These do not match the standard set of text
     * for localized month names. Using this method, a map can be created which
     * defines the connection between each value and the text:
     * <pre>
     * Map&lt;Long, String&gt; map = new HashMap&lt;&gt;();
     * map.put(1, "JNY");
     * map.put(2, "FBY");
     * map.put(3, "MCH");
     * ...
     * builder.appendText(MONTH_OF_YEAR, map);
     * </pre>
     * <p>
     * Other uses might be to output the value with a suffix, such as "1st", "2nd", "3rd",
     * or as Roman numerals "I", "II", "III", "IV".
     * <p>
     * During printing, the value is obtained and checked that it is in the valid range.
     * If text is not available for the value then it is output as a number.
     * During parsing, the parser will match against the map of text and numeric values.
     *
     * @param {!ChronoField} field  the field to append, not null
     * @param {!Object} textLookup  the map from the value to the text
     * @return {DateTimeFormatterBuilder} this, for chaining, not null
     */
    appendTextFieldMap(field, textLookup) {
        requireNonNull(field, 'field');
        requireInstance(field, ChronoField, 'field');
        requireNonNull(textLookup, 'textLookup');
        const copy = Object.assign({}, textLookup);
        const map = {};
        map[TextStyle.FULL] = copy;
        const store = new LocaleStore(map);
        const provider = {
            getText: function(field, value, style) {
                return store.getText(value, style);
            },
            getTextIterator: function(field, style) {
                return store.getTextIterator(style);
            }
        };
        this._appendInternal(new TextPrinterParser(field, TextStyle.FULL, provider));
        return this;
    }

    appendWeekField(field, count) {
        requireNonNull(field, 'field');
        requireNonNull(count, 'count');
        this._appendInternal(new WeekFieldsPrinterParser(field, count));
        return this;
    }

    /**
     * Appends the time-zone name, such as 'British Summer Time', to the formatter.
     * <p>
     * This appends an instruction to print the textual name of the zone to the builder.
     * <p>
     * During printing, the zone is obtained using a mechanism equivalent
     * to querying the temporal with {@link TemporalQueries#zoneId()}.
     * If the zone is a {@code ZoneOffset} it will be printed using the
     * result of {@link ZoneOffset#getId()}.
     * If the zone is not an offset, the textual name will be looked up
     * for the locale set in the {@link DateTimeFormatter}.
     * If the temporal object being printed represents an instant, then the text
     * will be the summer or winter time text as appropriate.
     * If the lookup for text does not find any suitable reuslt, then the
     * {@link ZoneId#getId() ID} will be printed instead.
     * If the zone cannot be obtained then an exception is thrown unless the
     * section of the formatter is optional.
     * <p>
     * Parsing is not currently supported.
     *
     * @param {!TextStyle} textStyle  the text style to use, not null
     * @return this, for chaining, not null
     */
    appendZoneText(textStyle) {
        this._appendInternal(new CldrZoneTextPrinterParser(textStyle));
        return this;
    }

    /**
     * Appends the localized zone offset, such as 'GMT+01:00', to the formatter.
     * <p>
     * This appends a localized zone offset to the builder, the format of the
     * localized offset is controlled by the specified {@link FormatStyle style}
     * to this method:
     * <ul>
     * <li>{@link TextStyle#FULL full} - formats with localized offset text, such
     * as 'GMT, 2-digit hour and minute field, optional second field if non-zero,
     * and colon.
     * <li>{@link TextStyle#SHORT short} - formats with localized offset text,
     * such as 'GMT, hour without leading zero, optional 2-digit minute and
     * second if non-zero, and colon.
     * </ul>
     * <p>
     * During formatting, the offset is obtained using a mechanism equivalent
     * to querying the temporal with {@link TemporalQueries#offset()}.
     * If the offset cannot be obtained then an exception is thrown unless the
     * section of the formatter is optional.
     * <p>
     * During parsing, the offset is parsed using the format defined above.
     * If the offset cannot be parsed then an exception is thrown unless the
     * section of the formatter is optional.
     * <p>
     * @param {TextStyle} textStyle  the format style to use, not null
     * @return this, for chaining, not null
     * @throws IllegalArgumentException if style is neither {@link TextStyle#FULL
     * full} nor {@link TextStyle#SHORT short}
     */
    appendLocalizedOffset(textStyle) {
        requireNonNull(textStyle, 'textStyle');
        if (textStyle !== TextStyle.FULL && textStyle !== TextStyle.SHORT) {
            throw new IllegalArgumentException('Style must be either full or short');
        }
        this._appendInternal(new LocalizedOffsetPrinterParser(textStyle));
        return this;
    }

    //-----------------------------------------------------------------------

}
