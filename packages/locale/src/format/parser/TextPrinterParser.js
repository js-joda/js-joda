/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { DateTimeFormatterBuilder, IllegalArgumentException, SignStyle, TextStyle } from '@js-joda/core';

//-----------------------------------------------------------------------
/**
 * Prints or parses field text.
 * @private
 */
export default class TextPrinterParser {
    /**
     * Constructor.
     *
     * @param {!TemporalField} field  the field to output, not null
     * @param {!TextStyle} textStyle  the text style, not null
     * @param {!DateTimeProvider} provider  the text provider, not null
     */
    constructor(field, textStyle, provider) {
        // validated by caller
        this._field = field;
        this._textStyle = textStyle;
        this._provider = provider;
    }

    field() {
        return this._field;
    }

    textStyle() {
        return this._textStyle;
    }

    provider() {
        return this._provider;
    }

    print(context, buf) {
        const value = context.getValue(this._field);
        if (value === null) {
            return false;
        }
        const text = this._provider.getText(this._field, value, this._textStyle, context.locale());
        if (text === null) {
            return this._numberPrinterParser().print(context, buf);
        }
        buf.append(text);
        return true;
    }

    parse(context, parseText, position) {
        const length = parseText.length;
        if (position < 0 || position > length) {
            throw new IllegalArgumentException(`The position is invalid: ${position}`);
        }
        const style = (context.isStrict() ? this._textStyle : null);
        const it = this._provider.getTextIterator(this._field, style, context.locale());
        if (it != null) {
            for (const entry of it) {
                const itText = entry.key;
                if (context.subSequenceEquals(itText, 0, parseText, position, itText.length)) {
                    return context.setParsedField(this._field, entry.value, position, position + itText.length);
                }
            }
            if (context.isStrict()) {
                return ~position;
            }
        }
        return this._numberPrinterParser().parse(context, parseText, position);
    }

    /**
     * Create and cache a number printer parser.
     * @return the number printer parser for this field, not null
     */
    _numberPrinterParser() {
        if (this._currentNumberPrinterParser == null) {
            this._currentNumberPrinterParser = new DateTimeFormatterBuilder.NumberPrinterParser(this._field, 1, 19, SignStyle.NORMAL);
        }
        return this._currentNumberPrinterParser;
    }

    toString() {
        if (this._textStyle === TextStyle.FULL) {
            return `Text(${this._field})`;
        }
        return `Text(${this._field},${this._textStyle})`;
    }
}

//-----------------------------------------------------------------------
