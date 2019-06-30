/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    ChronoField,
    DecimalStyle,
    IsoFields,
    IsoChronology,
    TextStyle,
    TemporalQueries,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import CldrDateTimeTextProvider from '../../src/format/cldr/CldrDateTimeTextProvider';
import Locale from '../../src/Locale';
import TextPrinterParser from '../../src/format/parser/TextPrinterParser';

const {
    DateTimeParseContext,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/local TextParserTest', () => {
    let parseContext;

    beforeEach(() => {
        parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    });

    const PROVIDER = new CldrDateTimeTextProvider();

    const assertParsed = (context, field, value) => {
        if (value == null) {
            assertEquals(context.getParsed(field), null);
        } else {
            assertEquals(context.getParsed(field), value);
        }
    };

    const data_text = [

        [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, 'AM'],
        [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, 'PM'],

        [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, 'a'],
        [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, 'p'],

        [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, 'AM'],
        [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, 'PM'],

        [ChronoField.ERA, TextStyle.FULL, 0, 'Before Christ'],
        [ChronoField.ERA, TextStyle.FULL, 1, 'Anno Domini'],

        [ChronoField.ERA, TextStyle.NARROW, 0, 'B'],
        [ChronoField.ERA, TextStyle.NARROW, 1, 'A'],

        [ChronoField.ERA, TextStyle.SHORT, 0, 'BC'],
        [ChronoField.ERA, TextStyle.SHORT, 1, 'AD'],

        [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '1st quarter'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '2nd quarter'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '3rd quarter'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '4th quarter'],

        [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],
    ];

    const data_number = [
        [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
        [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

    ];

    describe('parse', () => {
        it('test_parseText', () => {
            dataProviderTest(data_text, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input, 0);
                assertEquals(newPos, input.length);
                assertParsed(parseContext, field, value);
            });
        });

        it('test_parseNumber', () => {
            dataProviderTest(data_number, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input, 0);
                assertEquals(newPos, input.length);
                assertParsed(parseContext, field, value);
            });
        });
    });

    describe('parse_full_strict', () => {
        it('test_parse_full_strict_full_match', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'January', 0);
            assertEquals(newPos, 7);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_full_strict_short_noMatch', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'Janua', 0);
            assertEquals(newPos, ~0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });

        it('test_parse_full_strict_number_noMatch', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, '1', 0);
            assertEquals(newPos, ~0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });
    });

    describe('parse_short_strict', () => {
        it('test_parse_short_strict_full_match', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'January', 0);
            assertEquals(newPos, 3);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_short_strict_short_match', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'Janua', 0);
            assertEquals(newPos, 3);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_short_strict_number_noMatch', () => {
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, '1', 0);
            assertEquals(newPos, ~0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });
    });

    describe('parse_french_short_strict', () => {
        it('test_parse_french_short_strict_full_noMatch', () => {
            parseContext.setLocale(Locale.FRENCH);
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'janvier', 0);  // correct short form is 'janv.'
            assertEquals(newPos, ~0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });

        it('test_parse_french_short_strict_short_match', () => {
            parseContext.setLocale(Locale.FRENCH);
            parseContext.setStrict(true);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'janv.', 0);
            assertEquals(newPos, 5);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });
    });

    describe('parse_full_lenient', () => {
        it('test_parse_full_lenient_full_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'January', 0);
            assertEquals(newPos, 7);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_full_lenient_short_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'Janua', 0);
            assertEquals(newPos, 3);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_full_lenient_number_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, '1', 0);
            assertEquals(newPos, 1);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });
    });

    describe('parse_short_lenient', () => {
        it('test_parse_short_lenient_full_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'January', 0);
            assertEquals(newPos, 7);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_short_lenient_short_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'Janua', 0);
            assertEquals(newPos, 3);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });

        it('test_parse_short_lenient_number_match', () => {
            parseContext.setStrict(false);
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, '1', 0);
            assertEquals(newPos, 1);
            assertParsed(parseContext, ChronoField.MONTH_OF_YEAR, 1);
        });
    });

});
