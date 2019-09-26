/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import '../../_init';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {DateTimeException} from '../../../src/errors';
import {LocalDate} from '../../../src/LocalDate';

const PadPrinterParserDecorator = DateTimeFormatterBuilder.PadPrinterParserDecorator;
const StringLiteralPrinterParser = DateTimeFormatterBuilder.StringLiteralPrinterParser;
const CharLiteralPrinterParser = DateTimeFormatterBuilder.CharLiteralPrinterParser;
import {EMPTY} from '../temporal/Empty';

describe('org.threeten.bp.format.TestPadPrinterDecorator', () => {
    let printEmptyContext, printContext;
    let buf;

    beforeEach(() => {
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    it('test_print_emptyCalendrical', () => {
        const pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '--Z');
    });

    it('test_print_fullDateTime', () => {
        printContext.setDateTime(LocalDate.of(2008, 12, 3));
        const pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), '--Z');
    });

    it('test_print_append', () => {
        buf.append('EXISTING');
        const pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'EXISTING--Z');
    });


    it('test_print_noPadRequiredSingle', () => {
        const pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 1, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'Z');
    });

    it('test_print_padRequiredSingle', () => {
        const pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 5, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '----Z');
    });

    it('test_print_noPadRequiredMultiple', () => {
        const pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 4, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'WXYZ');
    });

    it('test_print_padRequiredMultiple', () => {
        const pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 5, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '-WXYZ');
    });

    it('test_print_overPad', () => {
        const pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 3, '-');
        expect(() => {
            pp.print(printEmptyContext, buf);
        }).to.throw(DateTimeException);
    });

    it('test_toString1', () => {
        const wrapped = new CharLiteralPrinterParser('Y');
        const pp = new PadPrinterParserDecorator(wrapped, 5, ' ');
        assertEquals(pp.toString(), 'Pad(\'Y\',5)');
    });

    it('test_toString2', () => {
        const wrapped = new CharLiteralPrinterParser('Y');
        const pp = new PadPrinterParserDecorator(wrapped, 5, '-');
        assertEquals(pp.toString(), 'Pad(\'Y\',5,\'-\')');
    });
});