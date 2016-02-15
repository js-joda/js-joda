/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import '../../_init';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {SignStyle} from '../../../src/format/SignStyle';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {IsoChronology} from '../../../src/chrono/IsoChronology';

const PadPrinterParserDecorator = DateTimeFormatterBuilder.PadPrinterParserDecorator;
const CharLiteralPrinterParser = DateTimeFormatterBuilder.CharLiteralPrinterParser;
const NumberPrinterParser = DateTimeFormatterBuilder.NumberPrinterParser;
const MONTH_OF_YEAR = ChronoField.MONTH_OF_YEAR;

describe('org.threeten.bp.format.TestPadParserDecorator', () => {
    var parseContext;

    beforeEach(() => {
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    });

    it('test_parse_negativePosition', () => {
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        expect(() => {
            pp.parse(parseContext, '--Z', -1);
        }).to.throw(Error);
    });

    it('test_parse_offEndPosition', () => {
        var pp = new PadPrinterParserDecorator(new CharLiteralPrinterParser('Z'), 3, '-');
        expect(() => {
            pp.parse(parseContext, '--Z', 4);
        }).to.throw(Error);
    });

    it('test_parse', () => {
        var pp = new PadPrinterParserDecorator(new NumberPrinterParser(MONTH_OF_YEAR, 1, 3, SignStyle.NEVER), 3, '-');
        var result = pp.parse(parseContext, '--2', 0);
        assertEquals(result, 3);
        assertParsed(MONTH_OF_YEAR, 2);
    });

    it('test_parse_noReadBeyond', () => {
        var pp = new PadPrinterParserDecorator(new NumberPrinterParser(MONTH_OF_YEAR, 1, 3, SignStyle.NEVER), 3, '-');
        var result = pp.parse(parseContext, '--22', 0);
        assertEquals(result, 3);
        assertParsed(MONTH_OF_YEAR, 2);
    });

    it('test_parse_textLessThanPadWidth', () => {
        var pp = new PadPrinterParserDecorator(new NumberPrinterParser(MONTH_OF_YEAR, 1, 3, SignStyle.NEVER), 3, '-');
        var result = pp.parse(parseContext, '-1', 0);
        assertEquals(result, ~0);
    });
        
    it('test_parse_decoratedErrorPassedBack', () => {
        var pp = new PadPrinterParserDecorator(new NumberPrinterParser(MONTH_OF_YEAR, 1, 3, SignStyle.NEVER), 3, '-');
        var result = pp.parse(parseContext, '--A', 0);
        assertEquals(result, ~2);
    });

    it('test_parse_decoratedDidNotParseToPadWidth', () => {
        var pp = new PadPrinterParserDecorator(new NumberPrinterParser(MONTH_OF_YEAR, 1, 3, SignStyle.NEVER), 3, '-');
        var result = pp.parse(parseContext, '-1X', 0);
        assertEquals(result, ~1);
    });

    function assertParsed(field, value) {
        assertEquals(parseContext.getParsed(field), value);
    }
});
