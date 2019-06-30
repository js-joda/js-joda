/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    DecimalStyle,
    IsoChronology,
    LocalDate,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import WeekFieldsPrinterParser from '../../src/format/parser/WeekFieldsPrinterParser';
import Locale from '../../src/Locale';
import { ComputedDayOfField } from '../../src/temporal/WeekFields';

const {
    DateTimeParseContext,
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/locale WeekFieldsPrinterParser', () => {

    describe('print / parse week fields', () => {

        const dayOfWeekField = ComputedDayOfField.ofDayOfWeekField();
        const weekOfWeekBasedYearField = ComputedDayOfField.ofWeekOfWeekBasedYearField();
        const weekOfMonthField = ComputedDayOfField.ofWeekOfMonthField();
        const weekYearField = ComputedDayOfField.ofWeekBasedYearField();

        const data = [

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'e', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.US, 'e', 1, '1', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'e', 2, '01', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'e', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'e', 2, '07', dayOfWeekField, 7],

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'c', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'c', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.US, 'c', 1, '1', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'c', 2, '01', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'c', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'c', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'c', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'c', 2, '07', dayOfWeekField, 7],

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'w', 1, '1', weekOfWeekBasedYearField, 1],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'w', 2, '01', weekOfWeekBasedYearField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'w', 1, '1', weekOfWeekBasedYearField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'w', 2, '01', weekOfWeekBasedYearField, 1],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'w', 1, '52', weekOfWeekBasedYearField, 52],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'w', 2, '52', weekOfWeekBasedYearField, 52],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'w', 1, '52', weekOfWeekBasedYearField, 52],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'w', 2, '52', weekOfWeekBasedYearField, 52],

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'W', 1, '1', weekOfMonthField, 1],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'W', 2, '1', weekOfMonthField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'W', 1, '1', weekOfMonthField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'W', 2, '1', weekOfMonthField, 1],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'W', 1, '0', weekOfMonthField, 0],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'W', 2, '0', weekOfMonthField, 0],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'W', 1, '0', weekOfMonthField, 0],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'W', 2, '0', weekOfMonthField, 0],

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'Y', 2, '17', weekYearField, 2017],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'Y', 4, '2017', weekYearField, 2017],
            [LocalDate.of(2017, 1, 1), Locale.US, 'Y', 2, '17', weekYearField, 2017],
            [LocalDate.of(2017, 1, 1), Locale.US, 'Y', 4, '2017', weekYearField, 2017],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'Y', 2, '16', weekYearField, 2016],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'Y', 4, '2016', weekYearField, 2016],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'Y', 2, '16', weekYearField, 2016],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'Y', 4, '2016', weekYearField, 2016],

        ];

        it('test_print_parse_weekfields', () => {
            dataProviderTest(data, (ld, locale, letter, count, expectedString, field, expectedParsedValue) => {
                const buf = new StringBuilder();
                const printContext = new DateTimePrintContext(ld, locale, DecimalStyle.STANDARD);
                const wfpp = new WeekFieldsPrinterParser(letter, count);
                wfpp.print(printContext, buf);
                assertEquals(buf.toString(), expectedString);
                const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                wfpp.parse(parseContext, buf.toString(), 0);
                assertEquals(parseContext.getParsed(field), expectedParsedValue);
            }, false);
        });
    });
});
