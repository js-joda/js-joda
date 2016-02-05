/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {DateTimeException} from '../../../src/errors';
import {LocalDate} from '../../../src/LocalDate';

const PadPrinterParserDecorator = DateTimeFormatterBuilder.PadPrinterParserDecorator;
const StringLiteralPrinterParser = DateTimeFormatterBuilder.StringLiteralPrinterParser;
const CharLiteralPrinterParser = DateTimeFormatterBuilder.CharLiteralPrinterParser;
const StringBuilder = DateTimeFormatterBuilder.StringBuilder;
import {EMPTY} from '../temporal/MockFieldValue';

describe('org.threeten.bp.format.TestPadPrinterDecorator', () => {
    var printEmptyContext, printContext;
    var buf;

    beforeEach(() => {
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        var d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    it('test_print_emptyCalendrical', () => {
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '--Z');
    });

    it('test_print_fullDateTime', () => {
        printContext.setDateTime(LocalDate.of(2008, 12, 3));
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), '--Z');
    });

    it('test_print_append', () => {
        buf.append('EXISTING');
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'EXISTING--Z');
    });

    
    it('test_print_noPadRequiredSingle', () => {
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 1, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'Z');
    });

    it('test_print_padRequiredSingle', () => {
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 5, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '----Z');
    });

    it('test_print_noPadRequiredMultiple', () => {
        var pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 4, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), 'WXYZ');
    });

    it('test_print_padRequiredMultiple', () => {
        var pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 5, '-');
        pp.print(printEmptyContext, buf);
        assertEquals(buf.toString(), '-WXYZ');
    });

    it('test_print_overPad', () => {
        var pp = new PadPrinterParserDecorator(new StringLiteralPrinterParser('WXYZ'), 3, '-');
        expect(() => {
            pp.print(printEmptyContext, buf);
        }).to.throw(DateTimeException);
    });

    it('test_toString1', () => {
        var wrapped = new CharLiteralPrinterParser('Y');
        var pp = new PadPrinterParserDecorator(wrapped, 5, ' ');
        assertEquals(pp.toString(), 'Pad(\'Y\',5)');
    });

    it('test_toString2', () => {
        var wrapped = new CharLiteralPrinterParser('Y');
        var pp = new PadPrinterParserDecorator(wrapped, 5, '-');
        assertEquals(pp.toString(), 'Pad(\'Y\',5,\'-\')');
    });
});