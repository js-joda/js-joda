/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    DateTimeFormatterBuilder,
    ChronoField,
    TextStyle
} from '@js-joda/core';

const { MathUtil } = jodaInternal;
//-----------------------------------------------------------------------
/**
 * Prints or parses field text.
 * @private
 */
export default class LocalizedOffsetPrinterParser {
    /**
     * Constructor.
     *
     * @param {!TextStyle} textStyle  the text style, not null
     */
    constructor(textStyle) {
        this._textStyle = textStyle;
    }

    textStyle() {
        return this._textStyle;
    }

    print(context, buf) {
        const offsetSecs = context.getValue(ChronoField.OFFSET_SECONDS);
        /* istanbul ignore if */ // shouldn't happen... getValue throws for unsupported fields?
        if (offsetSecs == null) {
            return false;
        }
        buf.append('GMT');
        if (this._textStyle === TextStyle.FULL) {
            return new DateTimeFormatterBuilder.OffsetIdPrinterParser('', '+HH:MM:ss').print(context, buf);
        }
        const totalSecs = MathUtil.safeToInt(offsetSecs);
        if (totalSecs !== 0) {
            const absHours = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs, 3600), 100));  // anything larger than 99 silently dropped
            const absMinutes = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs,60), 60));
            const absSeconds = Math.abs(MathUtil.intMod(totalSecs, 60));
            buf.append(totalSecs < 0 ? '-' : '+').append(absHours);
            if (absMinutes > 0 || absSeconds > 0) {
                buf.append(':')
                    .append(MathUtil.intDiv(absMinutes, 10)).append(MathUtil.intMod(absMinutes,10));
                if (absSeconds > 0) {
                    buf.append(':')
                        .append(MathUtil.intDiv(absSeconds, 10)).append(MathUtil.intMod(absSeconds, 10));
                }
            }
        }
        return true;
    }

    parse(context, text, position) {
        if (context.subSequenceEquals(text, position, 'GMT', 0, 3) === false) {
            return ~position;
        }
        position += 3;
        if (this._textStyle === TextStyle.FULL) {
            return new DateTimeFormatterBuilder.OffsetIdPrinterParser('', '+HH:MM:ss').parse(context, text, position);
        }
        const end = text.length;
        if (position === end) {
            return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position);
        }
        const sign = text.charAt(position);
        if (sign !== '+' && sign !== '-') {
            return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position);
        }
        const negative = (sign === '-' ? -1 : 1);
        /* istanbul ignore if */ // cannot happen, already checked before
        if (position === end) {
            return ~position;
        }
        position++;
        // hour
        let ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        let hour = MathUtil.parseInt(ch);
        if (position !== end) {
            ch = text.charAt(position);
            if (ch >= '0' && ch <= '9') {
                hour = hour * 10 + MathUtil.parseInt(ch);
                if (hour > 23) {
                    return ~position;
                }
                position++;
            }
        }
        if (position === end || text.charAt(position) !== ':') {
            const offset = negative * 3600 * hour;
            return context.setParsedField(ChronoField.OFFSET_SECONDS, offset, position, position);
        }
        position++;
        // minute
        if (position > end - 2) {
            return ~position;
        }
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        let min = MathUtil.parseInt(ch);
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        min = min * 10 + MathUtil.parseInt(ch);
        if (min > 59) {
            return ~position;
        }
        if (position === end || text.charAt(position) !== ':') {
            const offset = negative * (3600 * hour + 60 * min);
            return context.setParsedField(ChronoField.OFFSET_SECONDS, offset, position, position);
        }
        position++;
        // second
        if (position > end - 2) {
            return ~position;
        }
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        let sec = MathUtil.parseInt(ch);
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        sec = sec * 10 + MathUtil.parseInt(ch);
        if (sec > 59) {
            return ~position;
        }
        const offset = negative * (3600 * hour + 60 * min + sec);
        return context.setParsedField(ChronoField.OFFSET_SECONDS, offset, position, position);
    }

    toString() {
        return `LocalizedOffset(${this._textStyle})`;
    }

}

//-----------------------------------------------------------------------
