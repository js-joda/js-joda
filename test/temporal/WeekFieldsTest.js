/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { DayOfWeek, LocalDate } from 'js-joda';

import { WeekFields } from '../../src/temporal/WeekFields';

import { assertEquals, dataProviderTest } from '../testUtils';

describe('js-joda-locale WeekFields', () => {
    const data = [
        [LocalDate.of(2016, 12, 31), DayOfWeek.MONDAY, 7, 6, 2016, 4, 52, 2016],
        [LocalDate.of(2016, 12, 31), DayOfWeek.SATURDAY, 7, 1, 2016, 5, 53, 2016],
        [LocalDate.of(2017, 1, 1), DayOfWeek.MONDAY, 7, 7, 2016, 0, 52, 2016],
        [LocalDate.of(2017, 1, 2), DayOfWeek.MONDAY, 7, 1, 2017, 1, 1, 2017],
        [LocalDate.of(2017, 1, 1), DayOfWeek.SUNDAY, 7, 1, 2017, 1, 1, 2017],
        [LocalDate.of(2017, 1, 10), DayOfWeek.MONDAY, 7, 2, 2017, 2, 2, 2017],
    ];

    it('of_firstDayOfWeek_minimalDaysInWeek', () => {
        dataProviderTest(data, (localDate, firstDayOfWeek, minimalDaysInFirstWeek, dayOfWeek, weekBasedYear, weekOfMonth, weekOfWeekBasedYear, weekOfYear) => {
            const wf = WeekFields.of(firstDayOfWeek, minimalDaysInFirstWeek);
            assertEquals(localDate.get(wf.dayOfWeek()), dayOfWeek);
            assertEquals(localDate.get(wf.weekBasedYear()), weekBasedYear);
            assertEquals(localDate.get(wf.weekOfMonth()), weekOfMonth);
            assertEquals(localDate.get(wf.weekOfWeekBasedYear()), weekOfWeekBasedYear);
            assertEquals(localDate.get(wf.weekBasedYear()), weekOfYear);
        });

    });
});
