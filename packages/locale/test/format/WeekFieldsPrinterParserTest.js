/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    _ as jodaInternal,
    DateTimeFormatter,
    DateTimeParseException,
    DecimalStyle,
    IsoChronology,
    LocalDate,
    use,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import WeekFieldsPrinterParser from '../../src/format/parser/WeekFieldsPrinterParser';
import Locale from '../../src/Locale';
import jodaLocale from '../../src/plug';
import { WeekFields } from '../../src/temporal/WeekFields';

const {
    DateTimeParseContext,
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
use(jodaLocale);

describe('@js-joda/locale WeekFieldsPrinterParser', () => {

    describe('print / parse week fields', () => {

        // the parsed values are stored by field, query them with the fields of the locale
        const dayOfWeekField = (locale) => WeekFields.of(locale).dayOfWeek();
        const weekOfWeekBasedYearField = (locale) => WeekFields.of(locale).weekOfWeekBasedYear();
        const weekOfMonthField = (locale) => WeekFields.of(locale).weekOfMonth();
        const weekYearField = (locale) => WeekFields.of(locale).weekBasedYear();

        const data = [

            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.ENGLISH, 'e', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.US, 'e', 1, '1', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.US, 'e', 2, '01', dayOfWeekField, 1],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.UK, 'e', 2, '07', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'e', 1, '7', dayOfWeekField, 7],
            [LocalDate.of(2017, 1, 1), Locale.GERMANY, 'e', 2, '07', dayOfWeekField, 7],
            // [LocalDate.of(2017, 1, 1), Locale.KOREAN, 'e', 2, '07', dayOfWeekField, 7],

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
                assertEquals(parseContext.getParsed(field(locale)), expectedParsedValue);
            }, false);
        });
    });

    describe('parse dates with week fields', () => {
        // the week fields of a locale have the names of ChronoField.DAY_OF_WEEK and the
        // IsoFields, but in the US the week starts on Sunday and the first week is the
        // week of January 1st, so their values differ from the ISO ones
        const patterns = [
            'yyyy-MM-dd \'W\'ww',
            'YYYY yyyy-MM-dd',
            'yyyy-MM-dd e',
            'yyyy-MM-dd c',
            'YYYY-\'W\'ww-e',
            'YYYY-\'W\'ww-c',
            'YYYY-\'W\'ww-EEE',
            'yyyy-MM-dd \'W\'ww e',
            'yyyy-MM-dd YYYY-\'W\'ww-e',
        ];
        const dates = [LocalDate.of(2020, 1, 5), LocalDate.of(2020, 12, 27), LocalDate.of(2021, 1, 1), LocalDate.of(2021, 1, 3)];

        it('should parse what it formats', () => {
            for (const locale of [Locale.US, Locale.GERMANY, Locale.UK]) {
                for (const pattern of patterns) {
                    const f = DateTimeFormatter.ofPattern(pattern).withLocale(locale);
                    for (const date of dates) {
                        assertEquals(LocalDate.parse(date.format(f), f), date, `${locale} ${pattern} ${date}`);
                    }
                }
            }
        });

        it('should parse US week-based dates', () => {
            const f = DateTimeFormatter.ofPattern('YYYY-\'W\'ww-e').withLocale(Locale.US);
            assertEquals(LocalDate.parse('2020-W02-1', f), LocalDate.of(2020, 1, 5));
            assertEquals(LocalDate.parse('2021-W01-1', f), LocalDate.of(2020, 12, 27));
            assertEquals(LocalDate.parse('2021-W01-6', f), LocalDate.of(2021, 1, 1));
        });

        it('should reject week fields that conflict with the parsed date', () => {
            const data = [
                ['yyyy-MM-dd e', '2020-01-05 2'],
                ['yyyy-MM-dd \'W\'ww', '2020-01-05 W01'],
                ['YYYY yyyy-MM-dd', '2020 2020-12-27'],
                ['yyyy-MM-dd YYYY-\'W\'ww-e', '2020-01-05 2020-W03-1'],
            ];
            dataProviderTest(data, (pattern, text) => {
                const f = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US);
                expect(() => LocalDate.parse(text, f), `${pattern} ${text}`).to.throw(DateTimeParseException);
            });
        });
    });
});
