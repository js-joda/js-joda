/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    ChronoField,
    ChronoUnit,
    DayOfWeek,
    IllegalStateException,
    IsoFields,
    LocalDate,
    Month,
    ValueRange,
} from 'js-joda';

import '../_init';
import Locale from '../../src/Locale';
import { ComputedDayOfField, WeekFields } from '../../src/temporal/WeekFields';

import { assertEquals, dataProviderTest } from '../testUtils';

describe('js-joda-locale WeekFields', () => {
    const data = [
        [LocalDate.of(2016, 12, 31), DayOfWeek.MONDAY, 7, 6, 52, 4, 52, 2016],
        [LocalDate.of(2016, 12, 31), DayOfWeek.SATURDAY, 7, 1, 53, 5, 53, 2016],
        // test corner case of WOWBY/WBY :
        [LocalDate.of(2016, 12, 31), DayOfWeek.FRIDAY, 2, 2, 53, 5, 1, 2017],
        [LocalDate.of(2017, 1, 1), DayOfWeek.MONDAY, 7, 7, 0, 0, 52, 2016],
        [LocalDate.of(2017, 1, 2), DayOfWeek.MONDAY, 7, 1, 1, 1, 1, 2017],
        [LocalDate.of(2017, 1, 1), DayOfWeek.SUNDAY, 7, 1, 1, 1, 1, 2017],
        [LocalDate.of(2017, 1, 10), DayOfWeek.MONDAY, 7, 2, 2, 2, 2, 2017],
    ];

    it('of_firstDayOfWeek_minimalDaysInWeek', () => {
        dataProviderTest(data, (localDate, firstDayOfWeek, minimalDaysInFirstWeek, dayOfWeek, weekOfYear, weekOfMonth, weekOfWeekBasedYear, weekBasedYear) => {
            const wf = WeekFields.of(firstDayOfWeek, minimalDaysInFirstWeek);
            assertEquals(localDate.get(wf.dayOfWeek()), dayOfWeek);
            assertEquals(localDate.get(wf.weekOfMonth()), weekOfMonth);
            assertEquals(localDate.get(wf.weekOfYear()), weekOfYear);
            assertEquals(localDate.get(wf.weekOfWeekBasedYear()), weekOfWeekBasedYear);
            assertEquals(localDate.get(wf.weekBasedYear()), weekBasedYear);
        }, false);
    });

    it('throws exception for wrong rangeUnit', () => {
        const cdf = new ComputedDayOfField('Test', WeekFields.of(DayOfWeek.MONDAY, 7), ChronoUnit.WEEKS, ChronoUnit.HOURS, ChronoField.HOUR_OF_DAY.range());
        expect(() => {
            LocalDate.of(2017, 1, 1).get(cdf);
        }).to.throw(IllegalStateException);
    });

    it('equals', () => {
        expect(WeekFields.ISO.equals(WeekFields.of(DayOfWeek.MONDAY, 4))).to.be.true;
        expect(WeekFields.ISO.equals(WeekFields.of(DayOfWeek.MONDAY, 5))).to.be.false;
        expect(WeekFields.ISO.equals(null)).to.be.false;
    });

    describe('ComputedDayFields', () => {
        const data = [
            [WeekFields.ISO.dayOfWeek(), ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7), true, false, 'DayOfWeek[WeekFields[MONDAY,4]]', ValueRange.of(1, 7)],
            [WeekFields.ISO.weekOfMonth(), ChronoUnit.WEEKS, ChronoUnit.MONTHS, ValueRange.of(0, 1, 4, 6), true, false, 'WeekOfMonth[WeekFields[MONDAY,4]]', ValueRange.of(0, 5)],
            [WeekFields.ISO.weekOfYear(), ChronoUnit.WEEKS, ChronoUnit.YEARS, ValueRange.of(0, 1, 52, 54), true, false, 'Week', ValueRange.of(0, 52)],
            [WeekFields.ISO.weekOfWeekBasedYear(), ChronoUnit.WEEKS, IsoFields.WEEK_BASED_YEARS, ValueRange.of(1, 52, 53), true, false, 'WeekOfWeekBasedYear[WeekFields[MONDAY,4]]', ValueRange.of(1, 52)],
            [WeekFields.ISO.weekBasedYear(), IsoFields.WEEK_BASED_YEARS, ChronoUnit.FOREVER, ChronoField.YEAR.range(), true, false, 'WeekBasedYear[WeekFields[MONDAY,4]]', ChronoField.YEAR.range()],
        ];

        const date = LocalDate.of(2017, 1, 1);
        const month = Month.JANUARY;

        it('fields', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBased, isTimeBased) => {
                assertEquals(field.baseUnit(), baseUnit);
                assertEquals(field.rangeUnit(), rangeUnit);
                assertEquals(field.range(), range);
                assertEquals(field.isDateBased(), isDateBased);
                assertEquals(field.isTimeBased(), isTimeBased);
            }, false);
        });

        it('getDisplayName', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBased, isTimeBased, displayName) => {
                assertEquals(field.getDisplayName(Locale.US), displayName);
            }, false);
        });

        it('isSupportedBy', () => {
            dataProviderTest(data, (field) => {
                assertEquals(field.isSupportedBy(date), true);
                assertEquals(field.isSupportedBy(month), false);
            }, false);
        });

        it('rangeRefinedBy', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBase, isTimeBased, displayName, rangeRefined) => {
                assertEquals(field.rangeRefinedBy(date), rangeRefined);
            }, false);
        });
    });
    describe('adjustInto', () => {
        const data = [
            [LocalDate.of(2017, 1, 1), WeekFields.ISO.dayOfWeek(), 1, LocalDate.of(2016, 12, 26)],
        ];

        it('adjustInto', () => {
            dataProviderTest(data, (localDate, field, newValue, expectedValue) => {
                assertEquals(field.adjustInto(localDate, newValue), expectedValue);
            }, false);
        });
    });

    /*describe.skip('resolve', () => {
        // resolve is currently unused in DateTimeBuilder, so we cannot really test it
        // we would need DateTimeBuilder exported from js-joda... for now, skip this

        // get fieldValues from DateTimeBuilder
        const builder = new DateTimeBuilder();
        builder.chrono = IsoChronology.INSTANCE;
        builder._addFieldValue(ChronoField.YEAR, 2017);
        builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
        builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
        const data = [
            // [builder.fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, {}],
        ];

        it('resolve', () => {
            dataProviderTest(data, (fieldValues, temporal, resolverStyle, expectedValue) => {
                assertEquals(WeekFields.ISO.resolve(fieldValues, temporal, resolverStyle), expectedValue);
            }, false);
        });
    });*/
});
