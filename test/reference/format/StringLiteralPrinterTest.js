/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals} from '../../testUtils';

import '../../_init';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {LocalDate} from '../../../src/LocalDate';

const StringLiteralPrinterParser = DateTimeFormatterBuilder.StringLiteralPrinterParser;

import {EMPTY} from '../temporal/Empty';

describe('org.threeten.bp.format.TestStringLiteralPrinter', () => {
    let printEmptyContext, printContext, buf;

    beforeEach(() => {
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    it('test_print_emptyCalendrical', () => {
        buf.append('EXISTING');
        const pp = new StringLiteralPrinterParser('hello');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'EXISTINGhello');
    });

    it('test_print_dateTime', () => {
        buf.append('EXISTING');
        const pp = new StringLiteralPrinterParser('hello');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), 'EXISTINGhello');
    });

    it('test_print_emptyAppendable', () => {
        const pp = new StringLiteralPrinterParser('hello');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), 'hello');
    });

    it('test_toString', () => {
        const pp = new StringLiteralPrinterParser('hello');
        assertEquals(pp.toString(), '\'hello\'');
    });

    it('test_toString_apos', () => {
        const pp = new StringLiteralPrinterParser('o\'clock');
        assertEquals(pp.toString(), '\'o\'\'clock\'');
    });
});
