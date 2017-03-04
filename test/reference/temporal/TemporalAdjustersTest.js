/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, assertNotNull} from '../../testUtils';

import '../../_init';

import {NullPointerException} from '../../../src/errors';

import {DayOfWeek} from '../../../src/DayOfWeek';
import {LocalDate} from '../../../src/LocalDate';
import {Month} from '../../../src/Month';

import {TemporalAdjusters} from '../../../src/temporal/TemporalAdjusters';
import {assertSame} from '../../testUtils';
import {assertTrue} from '../../testUtils';
import {assertFalse} from '../../testUtils';

describe('org.threeten.bp.temporal.TestTemporalAdjusters', function () {
    const MonthValues = Month.values();
    const DayOfWeekValues = DayOfWeek.values();

    function createDate(year, month, day) {
        return LocalDate.of(year, month, day);
    }

    describe('firstDayOfMonth()', () => {

        it('factory_firstDayOfMonth', () => {
            assertNotNull(TemporalAdjusters.firstDayOfMonth());
        });

        it('test_firstDayOfMonth_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test = TemporalAdjusters.firstDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.firstDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

    });

    describe('lastDayOfMonth()', () => {

        it('factory_lastDayOfMonth', () => {
            assertNotNull(TemporalAdjusters.lastDayOfMonth());
        });

        it('test_lastDayOfMonth_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test =  TemporalAdjusters.lastDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), month.length(false));
                }
            }
        });

        it('test_lastDayOfMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.lastDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), month.length(true));
                }
            }
        });

    });

    describe('firstDayOfNextMonth()', () => {

        it('factory_firstDayOfNextMonth', () => {
            assertNotNull(TemporalAdjusters.firstDayOfNextMonth());
        });

        it('test_firstDayOfNextMonth_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test = TemporalAdjusters.firstDayOfNextMonth().adjustInto(date);
                    assertEquals(test.year(), month === Month.DECEMBER ? 2008 : 2007);
                    assertEquals(test.month(), month.plus(1));
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfNextMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.firstDayOfNextMonth().adjustInto(date);
                    assertEquals(test.year(), month === Month.DECEMBER ? 2009 : 2008);
                    assertEquals(test.month(), month.plus(1));
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

    });

    describe('firstDayOfYear()', () => {

        it('factory_firstDayOfYear', () => {
            assertNotNull(TemporalAdjusters.firstDayOfYear());
        });

        it('test_firstDayOfYear_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test = TemporalAdjusters.firstDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.firstDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

    });

    describe('lastDayOfYear()', () => {

        it('factory_lastDayOfYear', () => {
            assertNotNull(TemporalAdjusters.lastDayOfYear());
        });

        it('test_lastDayOfYear_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test = TemporalAdjusters.lastDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), Month.DECEMBER);
                    assertEquals(test.dayOfMonth(), 31);
                }
            }
        });

        it('test_lastDayOfYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.lastDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), Month.DECEMBER);
                    assertEquals(test.dayOfMonth(), 31);
                }
            }
        });

    });

    describe('firstDayOfNextYear()', () => {

        it('factory_firstDayOfNextYear', () => {
            assertNotNull(TemporalAdjusters.firstDayOfNextYear());
        });

        it('test_firstDayOfNextYear_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    const test = TemporalAdjusters.firstDayOfNextYear().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfNextYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(true); i++) {
                    const date = createDate(2008, month, i);
                    const test = TemporalAdjusters.firstDayOfNextYear().adjustInto(date);
                    assertEquals(test.year(), 2009);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

    });

    // @DataProvider(name = 'dayOfWeekInMonth_positive')
    function data_dayOfWeekInMonth_positive() {
        return [
            [2011, 1, DayOfWeek.TUESDAY, createDate(2011, 1, 4)],
            [2011, 2, DayOfWeek.TUESDAY, createDate(2011, 2, 1)],
            [2011, 3, DayOfWeek.TUESDAY, createDate(2011, 3, 1)],
            [2011, 4, DayOfWeek.TUESDAY, createDate(2011, 4, 5)],
            [2011, 5, DayOfWeek.TUESDAY, createDate(2011, 5, 3)],
            [2011, 6, DayOfWeek.TUESDAY, createDate(2011, 6, 7)],
            [2011, 7, DayOfWeek.TUESDAY, createDate(2011, 7, 5)],
            [2011, 8, DayOfWeek.TUESDAY, createDate(2011, 8, 2)],
            [2011, 9, DayOfWeek.TUESDAY, createDate(2011, 9, 6)],
            [2011, 10, DayOfWeek.TUESDAY, createDate(2011, 10, 4)],
            [2011, 11, DayOfWeek.TUESDAY, createDate(2011, 11, 1)],
            [2011, 12, DayOfWeek.TUESDAY, createDate(2011, 12, 6)]
        ];
    }

    // @DataProvider(name = 'dayOfWeekInMonth_zero')
    function data_dayOfWeekInMonth_zero() {
        return [
            [2011, 1, DayOfWeek.TUESDAY, createDate(2010, 12, 28)],
            [2011, 2, DayOfWeek.TUESDAY, createDate(2011, 1, 25)],
            [2011, 3, DayOfWeek.TUESDAY, createDate(2011, 2, 22)],
            [2011, 4, DayOfWeek.TUESDAY, createDate(2011, 3, 29)],
            [2011, 5, DayOfWeek.TUESDAY, createDate(2011, 4, 26)],
            [2011, 6, DayOfWeek.TUESDAY, createDate(2011, 5, 31)],
            [2011, 7, DayOfWeek.TUESDAY, createDate(2011, 6, 28)],
            [2011, 8, DayOfWeek.TUESDAY, createDate(2011, 7, 26)],
            [2011, 9, DayOfWeek.TUESDAY, createDate(2011, 8, 30)],
            [2011, 10, DayOfWeek.TUESDAY, createDate(2011, 9, 27)],
            [2011, 11, DayOfWeek.TUESDAY, createDate(2011, 10, 25)],
            [2011, 12, DayOfWeek.TUESDAY, createDate(2011, 11, 29)]
        ];
    }

    // @DataProvider(name = 'dayOfWeekInMonth_negative')
    function data_dayOfWeekInMonth_negative() {
        return [
            [2011, 1, DayOfWeek.TUESDAY, createDate(2011, 1, 25)],
            [2011, 2, DayOfWeek.TUESDAY, createDate(2011, 2, 22)],
            [2011, 3, DayOfWeek.TUESDAY, createDate(2011, 3, 29)],
            [2011, 4, DayOfWeek.TUESDAY, createDate(2011, 4, 26)],
            [2011, 5, DayOfWeek.TUESDAY, createDate(2011, 5, 31)],
            [2011, 6, DayOfWeek.TUESDAY, createDate(2011, 6, 28)],
            [2011, 7, DayOfWeek.TUESDAY, createDate(2011, 7, 26)],
            [2011, 8, DayOfWeek.TUESDAY, createDate(2011, 8, 30)],
            [2011, 9, DayOfWeek.TUESDAY, createDate(2011, 9, 27)],
            [2011, 10, DayOfWeek.TUESDAY, createDate(2011, 10, 25)],
            [2011, 11, DayOfWeek.TUESDAY, createDate(2011, 11, 29)],
            [2011, 12, DayOfWeek.TUESDAY, createDate(2011, 12, 27)]
        ];
    }

    describe('dayOfWeekInMonth()', () => {

        it('factory_dayOfWeekInMonth', () => {
            assertNotNull(TemporalAdjusters.dayOfWeekInMonth(1, DayOfWeek.MONDAY));
        });

        it('factory_dayOfWeekInMonth_nullDayOfWeek', () => {
            expect(() => {
                TemporalAdjusters.dayOfWeekInMonth(1, null);
            }).to.throw(NullPointerException);
        });

        it('test_dayOfWeekInMonth_positive', function () {
            data_dayOfWeekInMonth_positive().forEach((data)=> {
                test_dayOfWeekInMonth_positive.apply(this, data);
            });

        });

        // @Test(dataProvider = 'dayOfWeekInMonth_positive')
        function test_dayOfWeekInMonth_positive(year, month, dow, expected) {
            for (let ordinal = 1; ordinal <= 5; ordinal++) {
                for (let day = 1; day <= Month.of(month).length(false); day++) {
                    const date = createDate(year, month, day);
                    const test = TemporalAdjusters.dayOfWeekInMonth(ordinal, dow).adjustInto(date);
                    assertEquals(test, expected.plusWeeks(ordinal - 1));
                }
            }
        }

        it('test_dayOfWeekInMonth_zero', function () {
            data_dayOfWeekInMonth_zero().forEach((data)=> {
                test_dayOfWeekInMonth_zero.apply(this, data);
            });

        });

        // @Test(dataProvider = 'dayOfWeekInMonth_zero')
        function test_dayOfWeekInMonth_zero(year, month, dow, expected) {
            for (let day = 1; day <= Month.of(month).length(false); day++) {
                const date = createDate(year, month, day);
                const test = TemporalAdjusters.dayOfWeekInMonth(0, dow).adjustInto(date);
                assertEquals(test, expected);
            }
        }

        it('test_dayOfWeekInMonth_negative', function () {
            data_dayOfWeekInMonth_negative().forEach((data)=> {
                test_dayOfWeekInMonth_negative.apply(this, data);
            });

        });

        // @Test(dataProvider = 'dayOfWeekInMonth_negative')
        function test_dayOfWeekInMonth_negative(year, month, dow, expected) {
            for (let ordinal = 0; ordinal < 5; ordinal++) {
                for (let day = 1; day <= Month.of(month).length(false); day++) {
                    const date = createDate(year, month, day);
                    const test = TemporalAdjusters.dayOfWeekInMonth(-1 - ordinal, dow).adjustInto(date);
                    assertEquals(test, expected.minusWeeks(ordinal));
                }
            }
        }

    });

    describe('firstInMonth()', () => {

        it('factory_firstInMonth', () => {
            assertNotNull(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        });

        it('factory_firstInMonth_nullDayOfWeek', () => {
            expect(() => {
                TemporalAdjusters.firstInMonth(null);
            }).to.throw(NullPointerException);
        });

        it('test_firstInMonth', function () {
            data_dayOfWeekInMonth_positive().forEach((data)=> {
                test_firstInMonth.apply(this, data);
            });

        });

        // @Test(dataProvider = 'dayOfWeekInMonth_positive')
        function test_firstInMonth(year, month, dow, expected) {
            for (let day = 1; day <= Month.of(month).length(false); day++) {
                const date = createDate(year, month, day);
                const test = TemporalAdjusters.firstInMonth(dow).adjustInto(date);
                assertEquals(test, expected, 'day-of-month=' + day);
            }
        }

    });

    describe('lastInMonth()', () => {

        it('factory_lastInMonth', () => {
            assertNotNull(TemporalAdjusters.lastInMonth(DayOfWeek.MONDAY));
        });

        it('factory_lastInMonth_nullDayOfWeek', () => {
            expect(() => {
                TemporalAdjusters.lastInMonth(null);
            }).to.throw(NullPointerException);
        });

        it('test_lastInMonth', function () {
            data_dayOfWeekInMonth_negative().forEach((data)=> {
                test_lastInMonth.apply(this, data);
            });
        });

        // @Test(dataProvider = 'dayOfWeekInMonth_negative')
        function test_lastInMonth(year, month, dow, expected) {
            for (let day = 1; day <= Month.of(month).length(false); day++) {
                const date = createDate(year, month, day);
                const test = TemporalAdjusters.lastInMonth(dow).adjustInto(date);
                assertEquals(test, expected, 'day-of-month=' + day);
            }
        }

    });

    describe('next()', () => {

        it('factory_next', () => {
            assertNotNull(TemporalAdjusters.next(DayOfWeek.MONDAY));
        });

        it('factory_next_nullDayOfWeek', () => {
            expect(() => {
                TemporalAdjusters.next(null);
            }).to.throw(NullPointerException);
        });

        it('test_next()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);
                    for (let d = 0; d < DayOfWeekValues.length; d++) {
                        const dow = DayOfWeekValues[d];
                        const test = TemporalAdjusters.next(dow).adjustInto(date);

                        assertSame(test.dayOfWeek(), dow, date + ' ' + test);

                        if (test.year() === 2007) {
                            const dayDiff = test.dayOfYear() - date.dayOfYear();
                            assertTrue(dayDiff > 0 && dayDiff < 8);
                        } else {
                            assertSame(month, Month.DECEMBER);
                            assertTrue(date.dayOfMonth() > 24);
                            assertEquals(test.year(), 2008);
                            assertSame(test.month(), Month.JANUARY);
                            assertTrue(test.dayOfMonth() < 8);
                        }
                    }
                }
            }
        });
    });

    describe('nextOrSame()', () => {

        it('factory_nextOrSame', () => {
            assertNotNull(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
        });

        it('factory_nextOrSame_nullDayOfWeek', () => {
            expect(() => {
                TemporalAdjusters.nextOrSame(null);
            }).to.throw(NullPointerException);
        });

        it('test_nextOrSame()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                const month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    const date = createDate(2007, month, i);

                    for (let d = 0; d < DayOfWeekValues.length; d++) {
                        const dow = DayOfWeekValues[d];
                        const test = TemporalAdjusters.nextOrSame(dow).adjustInto(date);

                        assertSame(test.dayOfWeek(), dow);

                        if (test.year() === 2007) {
                            const dayDiff = test.dayOfYear() - date.dayOfYear();
                            assertTrue(dayDiff < 8);
                            assertEquals(date.equals(test), date.dayOfWeek() === dow);
                        } else {
                            assertFalse(date.dayOfWeek() === dow);
                            assertSame(month, Month.DECEMBER);
                            assertTrue(date.dayOfMonth() > 24);
                            assertEquals(test.year(), 2008);
                            assertSame(test.month(), Month.JANUARY);
                            assertTrue(test.dayOfMonth() < 8);
                        }
                    }
                }
            }
        });

    });

});

/*
    describe('previous()', () => {

	});

        it('factory_previous', () => {
        assertNotNull(TemporalAdjusters.previous(MONDAY));
    });

    @Test(expectedExceptions = NullPointerException.class)
    it('factory_previous_nullDayOfWeek', () => {
        TemporalAdjusters.previous(null);
    });

        it('test_previous()', () => {
        for (Month month : Month.values()) {
            for (let i = 1; i <= month.length(false); i++) {
                const date = createDate(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    const test = TemporalAdjusters.previous(dow).adjustInto(date);

                    assertSame(test.dayOfWeek(), dow, date + ' ' + test);

                    if (test.year() == 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        assertTrue(dayDiff < 0 && dayDiff > -8, dayDiff + ' ' + test);
                    } else {
                        assertSame(month, Month.JANUARY);
                        assertTrue(date.dayOfMonth() < 8);
                        assertEquals(test.year(), 2006);
                        assertSame(test.month(), Month.DECEMBER);
                        assertTrue(test.dayOfMonth() > 24);
                    }
                }
            }
        }
    }

    describe('previousOrSame()', () => {

	});

        it('factory_previousOrSame', () => {
        assertNotNull(TemporalAdjusters.previousOrSame(MONDAY));
    });

    @Test(expectedExceptions = NullPointerException.class)
    it('factory_previousOrSame_nullDayOfWeek', () => {
        TemporalAdjusters.previousOrSame(null);
    });

        it('test_previousOrSame()', () => {
        for (Month month : Month.values()) {
            for (let i = 1; i <= month.length(false); i++) {
                const date = createDate(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    const test = TemporalAdjusters.previousOrSame(dow).adjustInto(date);

                    assertSame(test.dayOfWeek(), dow);

                    if (test.year() == 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        assertTrue(dayDiff <= 0 && dayDiff > -7);
                        assertEquals(date.equals(test), date.dayOfWeek() == dow);
                    } else {
                        assertFalse(date.dayOfWeek() == dow);
                        assertSame(month, Month.JANUARY);
                        assertTrue(date.dayOfMonth() < 7);
                        assertEquals(test.year(), 2006);
                        assertSame(test.month(), Month.DECEMBER);
                        assertTrue(test.dayOfMonth() > 25);
                    }
                }
            }
        }
    }

}
*/