/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { _ as jodaInternal, DateTimeFormatterBuilder, SignStyle } from '@js-joda/core';

import { WeekFields } from '../../temporal/WeekFields';

const { StringBuilder } = jodaInternal;

export default class WeekFieldsPrinterParser {
    constructor(letter, count) {
        this._letter = letter;
        this._count = count;
    }

    print(context, buf) {
        const weekFields = WeekFields.of(context.locale());
        const pp = this._evaluate(weekFields);
        return pp.print(context, buf);
    }

    parse(context, text, position) {
        const weekFields = WeekFields.of(context.locale());
        const pp = this._evaluate(weekFields);
        return pp.parse(context, text, position);
    }

    _evaluate(weekFields) {
        let pp = null;
        switch (this._letter) {
            case 'e':  // day-of-week
                pp = new DateTimeFormatterBuilder.NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, SignStyle.NOT_NEGATIVE);
                break;
            case 'c':  // day-of-week
                pp = new DateTimeFormatterBuilder.NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, SignStyle.NOT_NEGATIVE);
                break;
            case 'w':  // week-of-year
                pp = new DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekOfWeekBasedYear(), this._count, 2, SignStyle.NOT_NEGATIVE);
                break;
            case 'W':  // week-of-month
                pp = new DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekOfMonth(), 1, 2, SignStyle.NOT_NEGATIVE);
                break;
            case 'Y':  // weekyear
                if (this._count === 2) {
                    pp = new DateTimeFormatterBuilder.ReducedPrinterParser(weekFields.weekBasedYear(), 2, 2, 0, DateTimeFormatterBuilder.ReducedPrinterParser.BASE_DATE);
                } else {
                    pp = new DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekBasedYear(), this._count, 19,
                        (this._count < 4) ? SignStyle.NORMAL : SignStyle.EXCEEDS_PAD, -1);
                }
                break;
        }
        return pp;
    }

    toString() {
        const sb = new StringBuilder(30);
        sb.append('Localized(');
        if (this._letter === 'Y') {
            if (this._count === 1) {
                sb.append('WeekBasedYear');
            } else if (this._count === 2) {
                sb.append('ReducedValue(WeekBasedYear,2,2,2000-01-01)');
            } else {
                sb.append('WeekBasedYear,').append(this._count).append(',')
                    .append(19).append(',')
                    .append((this._count < 4) ? SignStyle.NORMAL : SignStyle.EXCEEDS_PAD);
            }
        } else {
            if (this._letter === 'c' || this._letter === 'e') {
                sb.append('DayOfWeek');
            } else if (this._letter === 'w') {
                sb.append('WeekOfWeekBasedYear');
            } else if (this._letter === 'W') {
                sb.append('WeekOfMonth');
            }
            sb.append(',');
            sb.append(this._count);
        }
        sb.append(')');
        return sb.toString();
    }
}
