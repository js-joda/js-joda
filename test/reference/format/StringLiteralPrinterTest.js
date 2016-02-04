/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals} from '../../testUtils';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {LocalDate} from '../../../src/LocalDate';

const StringLiteralPrinterParser = DateTimeFormatterBuilder.StringLiteralPrinterParser;
const StringBuilder = DateTimeFormatterBuilder.StringBuilder;

import {EMPTY} from '../temporal/MockFieldValue';

describe('org.threeten.bp.format.TestStringLiteralPrinter', () => {
    var printEmptyContext, printContext, buf;

    beforeEach(() => {
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        var d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    it('test_print_emptyCalendrical', () => {
        buf.append('EXISTING');
        var pp = new StringLiteralPrinterParser('hello');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'EXISTINGhello');
    });

    it('test_print_dateTime', () => {
        buf.append('EXISTING');
        var pp = new StringLiteralPrinterParser('hello');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), 'EXISTINGhello');
    });

    it('test_print_emptyAppendable', () => {
        var pp = new StringLiteralPrinterParser('hello');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), 'hello');
    });

    it('test_toString', () => {
        var pp = new StringLiteralPrinterParser('hello');
        assertEquals(pp.toString(), '\'hello\'');
    });

    it('test_toString_apos', () => {
        var pp = new StringLiteralPrinterParser('o\'clock');
        assertEquals(pp.toString(), '\'o\'clock\'');
    });
});
