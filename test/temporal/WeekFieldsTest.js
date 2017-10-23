/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import { ChronoField, ChronoUnit, DayOfWeek, IllegalStateException, LocalDate } from 'js-joda';

import { ComputedDayOfField, WeekFields } from '../../src/temporal/WeekFields';

import { assertEquals, dataProviderTest } from '../testUtils';

describe('js-joda-locale WeekFields', () => {
    const data = [
        [LocalDate.of(2016, 12, 31), DayOfWeek.MONDAY, 7, 6, 52, 4, 52, 2016],
        [LocalDate.of(2016, 12, 31), DayOfWeek.SATURDAY, 7, 1, 53, 5, 53, 2016],
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
});
