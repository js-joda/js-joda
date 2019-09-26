/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import {
    _ as jodaInternal,
    ChronoField,
    DateTimeException,
    DecimalStyle,
    LocalDateTime,
    LocalDate,
    TextStyle,
    TemporalAccessor,
    ZoneId,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../../testUtils';

import '../../_init';

import CldrDateTimeTextProvider from '../../../src/format/cldr/CldrDateTimeTextProvider';
import Locale from '../../../src/Locale';
import TextPrinterParser from '../../../src/format/parser/TextPrinterParser';
import { MockFieldValue } from '../temporal/MockFieldValue';

const {
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

describe('org.threeten.bp.format.TestTextPrinter', () => {

    let printEmptyContext;
    let printContext;
    let buf;

    const EMPTY = new TemporalAccessor();
    EMPTY.isSupported = () => {
        return true;
    };
    EMPTY.getLong = () => {
        throw new DateTimeException('Mock');
    };

    beforeEach(() => {
        printEmptyContext = new DateTimePrintContext(EMPTY, Locale.ENGLISH, DecimalStyle.STANDARD);
        const zdt = LocalDateTime.of(2011, 6, 30, 12, 30, 40, 0).atZone(ZoneId.of('Europe/Paris'));
        printContext = new DateTimePrintContext(zdt, Locale.ENGLISH, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    const PROVIDER = new CldrDateTimeTextProvider();

    describe('print', () => {
        it('test_print_emptyCalendrical', () => {
            expect(() => {
                const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
                pp.print(printEmptyContext, buf);
            }).to.throw(DateTimeException);
        });

        it('test_print_append', () => {
            printContext.setDateTime(LocalDate.of(2012, 4, 18));
            const pp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            buf.append('EXISTING');
            pp.print(printContext, buf);
            assertEquals(buf.toString(), 'EXISTINGWednesday');
        });

        it('test_print', () => {
            const provider_data = [
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

                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 1, '1'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 2, '2'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 3, '3'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 28, '28'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 29, '29'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 30, '30'],
                [ChronoField.DAY_OF_MONTH, TextStyle.FULL, 31, '31'],

                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 1, '1'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 2, '2'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 3, '3'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 28, '28'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 29, '29'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 30, '30'],
                [ChronoField.DAY_OF_MONTH, TextStyle.SHORT, 31, '31'],

                [ChronoField.MONTH_OF_YEAR, TextStyle.FULL, 1, 'January'],
                [ChronoField.MONTH_OF_YEAR, TextStyle.FULL, 12, 'December'],

                [ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, 1, 'Jan'],
                [ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, 12, 'Dec'],
            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });
    });

    describe('print_french', () => {
        it('test_print_french_long', () => {
            printContext.setLocale(Locale.FRENCH);
            printContext.setDateTime(LocalDate.of(2012, 1, 1));
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            pp.print(printContext, buf);
            assertEquals(buf.toString(), 'janvier');
        });

        it('test_print_french_short', () => {
            printContext.setLocale(Locale.FRENCH);
            printContext.setDateTime(LocalDate.of(2012, 1, 1));
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            pp.print(printContext, buf);
            assertEquals(buf.toString(), 'janv.');
        });
    });

    describe('print_toString', () => {
        it('test_toString1', () => {
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.FULL, PROVIDER);
            assertEquals(pp.toString(), 'Text(MonthOfYear)');
        });

        it('test_toString2', () => {
            const pp = new TextPrinterParser(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT, PROVIDER);
            assertEquals(pp.toString(), 'Text(MonthOfYear,SHORT)');
        });
    });
});
