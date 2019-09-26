/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import * as joda from '@js-joda/core';

import { assertEquals, dataProviderTest } from '../../testUtils';

import '../../_init';

import jodaLocale from '../../../src/plug';

joda.use(jodaLocale);

const { ChronoField, DateTimeFormatterBuilder, NullPointerException, TextStyle } = joda;

describe('org.threeten.bp.format.TestDateTimeFormatterBuilder', () => {
    let builder = null;

    beforeEach(() => {
        builder = new DateTimeFormatterBuilder();
    });

    describe('appendText', () => {
        it('test_appendText_1arg', () => {
            builder.appendText(ChronoField.MONTH_OF_YEAR);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear)');
        });

        it('test_appendValue_1arg_null', () => {
            expect(() => {
                builder.appendText(null);
            }).to.throw(NullPointerException);
        });

        it('test_appendText_2arg', () => {
            builder.appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear,SHORT)');
        });

        it('test_appendText_2arg_nullRule', () => {
            expect(() => {
                builder.appendText(null, TextStyle.SHORT);
            }).to.throw(NullPointerException);
        });

        it('test_appendText_2arg_nullStyle', () => {
            expect(() => {
                builder.appendText(ChronoField.MONTH_OF_YEAR, null);
            }).to.throw(NullPointerException);
        });

        it('test_appendTextMap', () => {
            const map = {
                1: 'JNY',
                2: 'FBY',
                3: 'MCH',
                4: 'APL',
                5: 'MAY',
                6: 'JUN',
                7: 'JLY',
                8: 'AGT',
                9: 'SPT',
                10: 'OBR',
                11: 'NVR',
                12: 'DBR',
            };
            builder.appendText(ChronoField.MONTH_OF_YEAR, map);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear)');  // TODO: toString should be different?
        });

        it('test_appendTextMap_nullRule', () => {
            expect(() => {
                builder.appendText(null, {});
            }).to.throw(NullPointerException);
        });

        it('test_appendTextMap_nullStyle', () => {
            expect(() => {
                builder.appendText(ChronoField.MONTH_OF_YEAR, null);
            }).to.throw(NullPointerException);
        });
    });

    describe('appendZoneText', () => {
        it('test_appendZoneText_1arg', () => {
            builder.appendZoneText(TextStyle.FULL);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'ZoneText(FULL)');
        });

        it('test_appendZoneText_1arg_nullText', () => {
            expect(() => {
                builder.appendZoneText(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('appendPattern', () => {
        // these are only the text patterns that are excluded from the base js-joda appendPattern test
        const dataValid = [
            ['G', 'Text(Era,SHORT)'],
            ['GG', 'Text(Era,SHORT)'],
            ['GGG', 'Text(Era,SHORT)'],
            ['GGGG', 'Text(Era)'],
            ['GGGGG', 'Text(Era,NARROW)'],

            ['Y', 'Localized(WeekBasedYear)'],
            ['YY', 'Localized(ReducedValue(WeekBasedYear,2,2,2000-01-01))'],
            ['YYY', 'Localized(WeekBasedYear,3,19,NORMAL)'],
            ['YYYY', 'Localized(WeekBasedYear,4,19,EXCEEDS_PAD)'],
            ['YYYYY', 'Localized(WeekBasedYear,5,19,EXCEEDS_PAD)'],

            ['MMM', 'Text(MonthOfYear,SHORT)'],
            ['MMMM', 'Text(MonthOfYear)'],
            ['MMMMM', 'Text(MonthOfYear,NARROW)'],

            ['w', 'Localized(WeekOfWeekBasedYear,1)'],
            ['ww', 'Localized(WeekOfWeekBasedYear,2)'],

            ['W', 'Localized(WeekOfMonth,1)'],

            ['c', 'Localized(DayOfWeek,1)'],

            ['e', 'Localized(DayOfWeek,1)'],

            ['E', 'Text(DayOfWeek,SHORT)'],
            ['EE', 'Text(DayOfWeek,SHORT)'],
            ['EEE', 'Text(DayOfWeek,SHORT)'],
            ['EEEE', 'Text(DayOfWeek)'],
            ['EEEEE', 'Text(DayOfWeek,NARROW)'],

            ['a', 'Text(AmPmOfDay,SHORT)'],

            ['z', 'ZoneText(SHORT)'],
            ['zz', 'ZoneText(SHORT)'],
            ['zzz', 'ZoneText(SHORT)'],
            ['zzzz', 'ZoneText(FULL)'],

            ['ZZZZ', 'LocalizedOffset(FULL)'],

            ['O', 'LocalizedOffset(SHORT)'],
            ['OOOO', 'LocalizedOffset(FULL)'],
        ];

        it('test_appendPattern_valid', () => {
            dataProviderTest(dataValid, (input, expected) => {
                // since we are forEach ing dataValid, the beforeEach doesn't catch... so we create the builder here
                builder = new DateTimeFormatterBuilder();
                builder.appendPattern(input);
                const f = builder.toFormatter();
                assertEquals(f.toString(), expected);
            }, false);
        });
    });
});
