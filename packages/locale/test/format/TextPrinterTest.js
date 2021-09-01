/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import {
    _ as jodaInternal,
    ChronoField,
    DecimalStyle,
    IsoFields,
    LocalDateTime,
    TextStyle,
    ZoneId,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest, isBrowserTestRunner } from '../testUtils';

import '../_init';

import CldrDateTimeTextProvider from '../../src/format/cldr/CldrDateTimeTextProvider';
import Locale from '../../src/Locale';
import TextPrinterParser from '../../src/format/parser/TextPrinterParser';
import { MockFieldValue } from '../reference/temporal/MockFieldValue';

const {
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/locale TextPrinterTest', () => {

    let printContext;
    let buf;

    beforeEach(() => {
        const zdt = LocalDateTime.of(2011, 6, 30, 12, 30, 40, 0).atZone(ZoneId.of('Europe/Paris'));
        printContext = new DateTimePrintContext(zdt, Locale.ENGLISH, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    const PROVIDER = new CldrDateTimeTextProvider();

    describe('constructor', () => {
        it('should set the properties', () => {
            const tpp = new TextPrinterParser(ChronoField.DAY_OF_WEEK, TextStyle.FULL, PROVIDER);
            expect(tpp.field()).to.eql(ChronoField.DAY_OF_WEEK);
            expect(tpp.textStyle()).to.eql(TextStyle.FULL);
            expect(tpp.provider()).to.eql(PROVIDER);
        });
    });

    describe('print', () => {
        it('test_print EN', () => {
            const provider_data = [

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

                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],

                [ChronoField.DAY_OF_WEEK, TextStyle.SHORT, null, ''],
            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.ENGLISH);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });

        it('test_print DE', () => {
            const provider_data = [

                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, 'PM'],

                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, 'PM'],

                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, 'PM'],

                [ChronoField.ERA, TextStyle.FULL, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.FULL, 1, 'n. Chr.'],

                [ChronoField.ERA, TextStyle.NARROW, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.NARROW, 1, 'n. Chr.'],

                [ChronoField.ERA, TextStyle.SHORT, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.SHORT, 1, 'n. Chr.'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '1. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '2. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '3. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '4. Quartal'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],

            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.GERMAN);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });

        const _it = isBrowserTestRunner() ? it.skip : it;
        _it('test_print KO', () => {
            const provider_data = [

                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, '오전'],
                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, '오후'],

                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, 'PM'],

                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, 'PM'],

                [ChronoField.ERA, TextStyle.FULL, 0, '기원전'],
                [ChronoField.ERA, TextStyle.FULL, 1, '서기'],

                [ChronoField.ERA, TextStyle.NARROW, 0, 'BC'],
                [ChronoField.ERA, TextStyle.NARROW, 1, 'AD'],

                [ChronoField.ERA, TextStyle.SHORT, 0, 'BC'],
                [ChronoField.ERA, TextStyle.SHORT, 1, 'AD'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '제 1/4분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '제 2/4분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '제 3/4분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '제 4/4분기'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, '1분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, '2분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, '3분기'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, '4분기'],

            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.KOREAN);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });

        _it('test_print JA', () => {
            const provider_data = [

                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, '午前'],
                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, '午後'],

                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, '午前'],
                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, '午後'],

                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, '午前'],
                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, '午後'],

                [ChronoField.ERA, TextStyle.FULL, 0, '紀元前'],
                [ChronoField.ERA, TextStyle.FULL, 1, '西暦'],

                [ChronoField.ERA, TextStyle.NARROW, 0, 'BC'],
                [ChronoField.ERA, TextStyle.NARROW, 1, 'AD'],

                [ChronoField.ERA, TextStyle.SHORT, 0, '紀元前'],
                [ChronoField.ERA, TextStyle.SHORT, 1, '西暦'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '第1四半期'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '第2四半期'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '第3四半期'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '第4四半期'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],

            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.JAPAN);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });
    });

});
