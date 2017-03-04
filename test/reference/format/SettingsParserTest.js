/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals} from '../../testUtils';

import '../../_init';

import {IsoChronology} from '../../../src/chrono/IsoChronology';
import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {LocalDate} from '../../../src/LocalDate';

const SettingsParser = DateTimeFormatterBuilder.SettingsParser;

describe('org.threeten.bp.format.TestSettingsParser', () => {
    let parseContext;
    let printContext;

    beforeEach(() => {
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
    });

    it('test_print_sensitive', () => {
        const pp = SettingsParser.SENSITIVE;
        const buf = new StringBuilder();
        pp.print(printContext, buf);
        assertEquals(buf.toString(), '');
    });

    it('test_print_strict', () => {
        const pp = SettingsParser.STRICT;
        const buf = new StringBuilder();
        pp.print(printContext, buf);
        assertEquals(buf.toString(), '');
    });

    it('test_print_nulls', () => {
        const pp = SettingsParser.SENSITIVE;
        pp.print(null, null);
    });

    it('test_parse_changeStyle_sensitive', () => {
        const pp = SettingsParser.SENSITIVE;
        const result = pp.parse(parseContext, 'a', 0);
        assertEquals(result, 0);
        assertEquals(parseContext.isCaseSensitive(), true);
    });

    it('test_parse_changeStyle_insensitive', () => {
        const pp = SettingsParser.INSENSITIVE;
        const result = pp.parse(parseContext, 'a', 0);
        assertEquals(result, 0);
        assertEquals(parseContext.isCaseSensitive(), false);
    });

    it('test_parse_changeStyle_strict', () => {
        const pp = SettingsParser.STRICT;
        const result = pp.parse(parseContext, 'a', 0);
        assertEquals(result, 0);
        assertEquals(parseContext.isStrict(), true);
    });

    it('test_parse_changeStyle_lenient', () => {
        const pp = SettingsParser.LENIENT;
        const result = pp.parse(parseContext, 'a', 0);
        assertEquals(result, 0);
        assertEquals(parseContext.isStrict(), false);
    });

    it('test_toString_sensitive', () => {
        const pp = SettingsParser.SENSITIVE;
        assertEquals(pp.toString(), 'ParseCaseSensitive(true)');
    });

    it('test_toString_insensitive', () => {
        const pp = SettingsParser.INSENSITIVE;
        assertEquals(pp.toString(), 'ParseCaseSensitive(false)');
    });

    it('test_toString_strict', () => {
        const pp = SettingsParser.STRICT;
        assertEquals(pp.toString(), 'ParseStrict(true)');
    });

    it('test_toString_lenient', () => {
        const pp = SettingsParser.LENIENT;
        assertEquals(pp.toString(), 'ParseStrict(false)');
    });

});


