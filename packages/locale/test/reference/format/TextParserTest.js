/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import {
    _ as jodaInternal,
    ChronoField,
    DateTimeException,
    DecimalStyle,
    IllegalArgumentException,
    IsoChronology,
    TextStyle,
    TemporalAccessor,
    TemporalQueries,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../../testUtils';

import '../../_init';

import CldrDateTimeTextProvider from '../../../src/format/cldr/CldrDateTimeTextProvider';
import Locale from '../../../src/Locale';
import TextPrinterParser from '../../../src/format/parser/TextPrinterParser';

const {
    DateTimeParseContext,
} = jodaInternal;

describe('org.threeten.bp.format.TestTextParser', () => {
    let parseContext;

    const EMPTY = new TemporalAccessor();
    EMPTY.isSupported = () => {
        return true;
    };
    EMPTY.getLong = () => {
        throw new DateTimeException('Mock');
    };

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
    describe('parse_error', () => {
        it('test_parse_error', () => {
            const data_error = [
                [new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER), 'Monday', -1, IllegalArgumentException],
                [new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER), 'Monday', 7, IllegalArgumentException],
            ];

            dataProviderTest(data_error, (pp, text, pos, expected) => {
                expect(() => {
                    pp.parse(parseContext, text, pos);
                }).to.throw(expected);
                assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
                assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
            });
        });
    });

    describe('parse_partial', () => {
        it('test_parse_midStr', () => {
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'XxxMondayXxx', 3);
            assertEquals(newPos, 9);
            assertParsed(parseContext, ChronoField.DAY_OF_WEEK, 1);
        });

        it('test_parse_remainderIgnored', () => {
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.SHORT, PROVIDER);
            const newPos = pp.parse(parseContext, 'Wednesday', 0);
            assertEquals(newPos, 3);
            assertParsed(parseContext, ChronoField.DAY_OF_WEEK, 3);
        });
    });

    describe('parse_noMatch', () => {
        it('test_parse_noMatch1', () => {
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'Munday', 0);
            assertEquals(newPos, ~0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });

        it('test_parse_noMatch2', () => {
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'Monday', 3);
            assertEquals(newPos, ~3);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });

        it('test_parse_noMatch_atEnd', () => {
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            const newPos = pp.parse(parseContext, 'Monday', 6);
            assertEquals(newPos, ~6);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });
    });


    const data_text = [
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 1, 'Monday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 2, 'Tuesday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 3, 'Wednesday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 4, 'Thursday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 5, 'Friday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 6, 'Saturday'],
        [ChronoField.DAY_OF_WEEK, TextStyle.FULL, 7, 'Sunday'],

        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 1, 'Mon'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 2, 'Tue'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 3, 'Wed'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 4, 'Thu'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 5, 'Fri'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 6, 'Sat'],
        [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, 7, 'Sun'],

        [ChronoField.MONTH_OF_YEAR, TextStyle.FULL, 1, 'January'],
        [ChronoField.MONTH_OF_YEAR, TextStyle.FULL, 12, 'December'],

        [ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, 1, 'Jan'],
        [ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, 12, 'Dec'],
    ];

    const data_number = [
        [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 1, '1'],
        [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 2, '2'],
        [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 30, '30'],
        [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 31, '31'],

        [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 1, '1'],
        [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 2, '2'],
        [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 30, '30'],
        [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 31, '31'],
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

    describe('parse_strict_upper', () => {
        it('test_parse_strict_caseSensitive_parseUpper', () => {
            dataProviderTest(data_text, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                parseContext.setCaseSensitive(true);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input.toUpperCase(), 0);
                assertEquals(newPos, ~0);
                assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
                assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
            });
        });

        it('test_parse_strict_caseInsensitive_parseUpper', () => {
            dataProviderTest(data_text, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                parseContext.setCaseSensitive(false);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input.toUpperCase(), 0);
                assertEquals(newPos, input.length);
                assertParsed(parseContext, field, value);
            });
        });
    });

    describe('parse_strict_lower', () => {
        it('test_parse_strict_caseSensitive_parseLower', () => {
            dataProviderTest(data_text, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                parseContext.setCaseSensitive(true);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input.toLowerCase(), 0);
                assertEquals(newPos, ~0);
                assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
                assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
            });
        });

        it('test_parse_strict_caseInsensitive_parseLower', () => {
            dataProviderTest(data_text, (field, style, value, input) => {
                parseContext = new DateTimeParseContext(Locale.ENGLISH, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                parseContext.setCaseSensitive(false);
                const pp = new TextPrinterParser(field, style, PROVIDER);
                const newPos = pp.parse(parseContext, input.toLowerCase(), 0);
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
