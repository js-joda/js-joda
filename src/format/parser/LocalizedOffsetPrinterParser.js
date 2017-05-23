/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ChronoField,
    OffsetIdPrinterParser,
    TextStyle
} from 'js-joda';

import {MathUtil} from 'js-joda';
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
        return this.textStyle;
    }

    print(context, buf) {
        const offsetSecs = context.getValue(ChronoField.OFFSET_SECONDS);
        if (offsetSecs == null) {
            return false;
        }
        buf.append('GMT');
        if (this._textStyle === TextStyle.FULL) {
            return new OffsetIdPrinterParser('', '+HH:MM:ss').print(context, buf);
        }
        const totalSecs = MathUtil.safeToInt(offsetSecs);
        if (totalSecs !== 0) {
            const absHours = Math.abs((totalSecs / 3600) % 100);  // anything larger than 99 silently dropped
            const absMinutes = Math.abs((totalSecs / 60) % 60);
            const absSeconds = Math.abs(totalSecs % 60);
            buf.append(totalSecs < 0 ? '-' : '+').append(absHours);
            if (absMinutes > 0 || absSeconds > 0) {
                buf.append(':')
                    .append((absMinutes / 10 + '0')).append((absMinutes % 10 + '0'));
                if (absSeconds > 0) {
                    buf.append(':')
                        .append((absSeconds / 10 + '0')).append((absSeconds % 10 + '0'));
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
            return new OffsetIdPrinterParser('', '+HH:MM:ss').parse(context, text, position);
        }
        const end = text.length();
        if (position === end) {
            return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position);
        }
        const sign = text.charAt(position);
        if (sign !== '+' && sign !== '-') {
            return context.setParsedField(ChronoField.OFFSET_SECONDS, 0, position, position);
        }
        const negative = (sign === '-' ? -1 : 1);
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
        let hour = ((ch - 48));
        if (position !== end) {
            ch = text.charAt(position);
            if (ch >= '0' && ch <= '9') {
                hour = hour * 10 + ((ch - 48));
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
        let min = ((ch - 48));
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        min = min * 10 + ((ch - 48));
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
        let sec = ((ch - 48));
        ch = text.charAt(position);
        if (ch < '0' || ch > '9') {
            return ~position;
        }
        position++;
        sec = sec * 10 + ((ch - 48));
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
