/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals, assertNotNull} from '../../testUtils';

import '../../_init';

import {LocalDate} from '../../../src/LocalDate';
import {Month} from '../../../src/Month';

import {TemporalAdjusters} from '../../../src/temporal/TemporalAdjusters';

describe('org.threeten.bp.temporal.TestTemporalAdjusters', function () {
    var MonthValues;

    beforeEach(function () {
        MonthValues = Month.values();
    });

    function createDate(year, month, day) {
        return LocalDate.of(year, month, day);
    }

    describe('firstDayOfMonth()', () => {

        it('factory_firstDayOfMonth', () => {
            assertNotNull(TemporalAdjusters.firstDayOfMonth());
        });

        it('test_firstDayOfMonth_nonLeap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (let i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test = TemporalAdjusters.firstDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.firstDayOfMonth().adjustInto(date);
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
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test =  TemporalAdjusters.lastDayOfMonth().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), month);
                    assertEquals(test.dayOfMonth(), month.length(false));
                }
            }
        });
    
        it('test_lastDayOfMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.lastDayOfMonth().adjustInto(date);
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
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test = TemporalAdjusters.firstDayOfNextMonth().adjustInto(date);
                    assertEquals(test.year(), month === Month.DECEMBER ? 2008 : 2007);
                    assertEquals(test.month(), month.plus(1));
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfNextMonth_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.firstDayOfNextMonth().adjustInto(date);
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
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test = TemporalAdjusters.firstDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.firstDayOfYear().adjustInto(date);
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
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test = TemporalAdjusters.lastDayOfYear().adjustInto(date);
                    assertEquals(test.year(), 2007);
                    assertEquals(test.month(), Month.DECEMBER);
                    assertEquals(test.dayOfMonth(), 31);
                }
            }
        });

        it('test_lastDayOfYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.lastDayOfYear().adjustInto(date);
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
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(false); i++) {
                    var date = createDate(2007, month, i);
                    var test = TemporalAdjusters.firstDayOfNextYear().adjustInto(date);
                    assertEquals(test.year(), 2008);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

        it('test_firstDayOfNextYear_leap()', () => {
            for (let j = 0; j < MonthValues.length; j++) {
                var month = MonthValues[j];
                for (var i = 1; i <= month.length(true); i++) {
                    var date = createDate(2008, month, i);
                    var test = TemporalAdjusters.firstDayOfNextYear().adjustInto(date);
                    assertEquals(test.year(), 2009);
                    assertEquals(test.month(), Month.JANUARY);
                    assertEquals(test.dayOfMonth(), 1);
                }
            }
        });

    });

});

/*
    describe('dayOfWeekInMonth()', () => {

	});

        it('factory_dayOfWeekInMonth', () => {
        assertNotNull(TemporalAdjusters.dayOfWeekInMonth(1, MONDAY));
    });

    it('factory_dayOfWeekInMonth_nullDayOfWeek', () => {
	expect(() => {
        TemporalAdjusters.dayOfWeekInMonth(1, null);
    
	}).to.throw(NullPointerException);
});

    @DataProvider(name = "dayOfWeekInMonth_positive")
    Object[][] data_dayOfWeekInMonth_positive() {
        return new Object[][] {
            {2011, 1, TUESDAY, date(2011, 1, 4)},
            {2011, 2, TUESDAY, date(2011, 2, 1)},
            {2011, 3, TUESDAY, date(2011, 3, 1)},
            {2011, 4, TUESDAY, date(2011, 4, 5)},
            {2011, 5, TUESDAY, date(2011, 5, 3)},
            {2011, 6, TUESDAY, date(2011, 6, 7)},
            {2011, 7, TUESDAY, date(2011, 7, 5)},
            {2011, 8, TUESDAY, date(2011, 8, 2)},
            {2011, 9, TUESDAY, date(2011, 9, 6)},
            {2011, 10, TUESDAY, date(2011, 10, 4)},
            {2011, 11, TUESDAY, date(2011, 11, 1)},
            {2011, 12, TUESDAY, date(2011, 12, 6)},
        };
    }

    @Test(dataProvider = "dayOfWeekInMonth_positive")
    public void test_dayOfWeekInMonth_positive(int year, int month, DayOfWeek dow, LocalDate expected) {
        for (var ordinal = 1; ordinal <= 5; ordinal++) {
            for (var day = 1; day <= Month.of(month).length(false); day++) {
                var date = date(year, month, day);
                var test = TemporalAdjusters.dayOfWeekInMonth(ordinal, dow).adjustInto(date);
                assertEquals(test, expected.plusWeeks(ordinal - 1));
            }
        }
    }

    @DataProvider(name = "dayOfWeekInMonth_zero")
    Object[][] data_dayOfWeekInMonth_zero() {
        return new Object[][] {
            {2011, 1, TUESDAY, date(2010, 12, 28)},
            {2011, 2, TUESDAY, date(2011, 1, 25)},
            {2011, 3, TUESDAY, date(2011, 2, 22)},
            {2011, 4, TUESDAY, date(2011, 3, 29)},
            {2011, 5, TUESDAY, date(2011, 4, 26)},
            {2011, 6, TUESDAY, date(2011, 5, 31)},
            {2011, 7, TUESDAY, date(2011, 6, 28)},
            {2011, 8, TUESDAY, date(2011, 7, 26)},
            {2011, 9, TUESDAY, date(2011, 8, 30)},
            {2011, 10, TUESDAY, date(2011, 9, 27)},
            {2011, 11, TUESDAY, date(2011, 10, 25)},
            {2011, 12, TUESDAY, date(2011, 11, 29)},
        };
    }

    @Test(dataProvider = "dayOfWeekInMonth_zero")
    public void test_dayOfWeekInMonth_zero(int year, int month, DayOfWeek dow, LocalDate expected) {
        for (var day = 1; day <= Month.of(month).length(false); day++) {
            var date = date(year, month, day);
            var test = TemporalAdjusters.dayOfWeekInMonth(0, dow).adjustInto(date);
            assertEquals(test, expected);
        }
    }

    @DataProvider(name = "dayOfWeekInMonth_negative")
    Object[][] data_dayOfWeekInMonth_negative() {
        return new Object[][] {
            {2011, 1, TUESDAY, date(2011, 1, 25)},
            {2011, 2, TUESDAY, date(2011, 2, 22)},
            {2011, 3, TUESDAY, date(2011, 3, 29)},
            {2011, 4, TUESDAY, date(2011, 4, 26)},
            {2011, 5, TUESDAY, date(2011, 5, 31)},
            {2011, 6, TUESDAY, date(2011, 6, 28)},
            {2011, 7, TUESDAY, date(2011, 7, 26)},
            {2011, 8, TUESDAY, date(2011, 8, 30)},
            {2011, 9, TUESDAY, date(2011, 9, 27)},
            {2011, 10, TUESDAY, date(2011, 10, 25)},
            {2011, 11, TUESDAY, date(2011, 11, 29)},
            {2011, 12, TUESDAY, date(2011, 12, 27)},
        };
    }

    @Test(dataProvider = "dayOfWeekInMonth_negative")
    public void test_dayOfWeekInMonth_negative(int year, int month, DayOfWeek dow, LocalDate expected) {
        for (var ordinal = 0; ordinal < 5; ordinal++) {
            for (var day = 1; day <= Month.of(month).length(false); day++) {
                var date = date(year, month, day);
                var test = TemporalAdjusters.dayOfWeekInMonth(-1 - ordinal, dow).adjustInto(date);
                assertEquals(test, expected.minusWeeks(ordinal));
            }
        }
    }

    describe('firstInMonth()', () => {

	});

        it('factory_firstInMonth', () => {
        assertNotNull(TemporalAdjusters.firstInMonth(MONDAY));
    });

    it('factory_firstInMonth_nullDayOfWeek', () => {
	expect(() => {
        TemporalAdjusters.firstInMonth(null);
    
	}).to.throw(NullPointerException);
});

    @Test(dataProvider = "dayOfWeekInMonth_positive")
    public void test_firstInMonth(int year, int month, DayOfWeek dow, LocalDate expected) {
        for (var day = 1; day <= Month.of(month).length(false); day++) {
            var date = date(year, month, day);
            var test = TemporalAdjusters.firstInMonth(dow).adjustInto(date);
            assertEquals(test, expected, "day-of-month=" + day);
        }
    }

    describe('lastInMonth()', () => {

	});

        it('factory_lastInMonth', () => {
        assertNotNull(TemporalAdjusters.lastInMonth(MONDAY));
    });

    it('factory_lastInMonth_nullDayOfWeek', () => {
	expect(() => {
        TemporalAdjusters.lastInMonth(null);
    
	}).to.throw(NullPointerException);
});

    @Test(dataProvider = "dayOfWeekInMonth_negative")
    public void test_lastInMonth(int year, int month, DayOfWeek dow, LocalDate expected) {
        for (var day = 1; day <= Month.of(month).length(false); day++) {
            var date = date(year, month, day);
            var test = TemporalAdjusters.lastInMonth(dow).adjustInto(date);
            assertEquals(test, expected, "day-of-month=" + day);
        }
    }

    describe('next()', () => {

	});

        it('factory_next', () => {
        assertNotNull(TemporalAdjusters.next(MONDAY));
    });

    @Test(expectedExceptions = NullPointerException.class)
    it('factory_next_nullDayOfWeek', () => {
        TemporalAdjusters.next(null);
    });

        it('test_next()', () => {
        for (Month month : Month.values()) {
            for (var i = 1; i <= month.length(false); i++) {
                var date = date(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    var test = TemporalAdjusters.next(dow).adjustInto(date);

                    assertSame(test.getDayOfWeek(), dow, date + " " + test);

                    if (test.year() == 2007) {
                        var dayDiff = test.getDayOfYear() - date.getDayOfYear();
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
    }

    describe('nextOrSame()', () => {

	});

        it('factory_nextOrSame', () => {
        assertNotNull(TemporalAdjusters.nextOrSame(MONDAY));
    });

    @Test(expectedExceptions = NullPointerException.class)
    it('factory_nextOrSame_nullDayOfWeek', () => {
        TemporalAdjusters.nextOrSame(null);
    });

        it('test_nextOrSame()', () => {
        for (Month month : Month.values()) {
            for (var i = 1; i <= month.length(false); i++) {
                var date = date(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    var test = TemporalAdjusters.nextOrSame(dow).adjustInto(date);

                    assertSame(test.getDayOfWeek(), dow);

                    if (test.year() == 2007) {
                        var dayDiff = test.getDayOfYear() - date.getDayOfYear();
                        assertTrue(dayDiff < 8);
                        assertEquals(date.equals(test), date.getDayOfWeek() == dow);
                    } else {
                        assertFalse(date.getDayOfWeek() == dow);
                        assertSame(month, Month.DECEMBER);
                        assertTrue(date.dayOfMonth() > 24);
                        assertEquals(test.year(), 2008);
                        assertSame(test.month(), Month.JANUARY);
                        assertTrue(test.dayOfMonth() < 8);
                    }
                }
            }
        }
    }

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
            for (var i = 1; i <= month.length(false); i++) {
                var date = date(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    var test = TemporalAdjusters.previous(dow).adjustInto(date);

                    assertSame(test.getDayOfWeek(), dow, date + " " + test);

                    if (test.year() == 2007) {
                        var dayDiff = test.getDayOfYear() - date.getDayOfYear();
                        assertTrue(dayDiff < 0 && dayDiff > -8, dayDiff + " " + test);
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
            for (var i = 1; i <= month.length(false); i++) {
                var date = date(2007, month, i);

                for (DayOfWeek dow : DayOfWeek.values()) {
                    var test = TemporalAdjusters.previousOrSame(dow).adjustInto(date);

                    assertSame(test.getDayOfWeek(), dow);

                    if (test.year() == 2007) {
                        var dayDiff = test.getDayOfYear() - date.getDayOfYear();
                        assertTrue(dayDiff <= 0 && dayDiff > -7);
                        assertEquals(date.equals(test), date.getDayOfWeek() == dow);
                    } else {
                        assertFalse(date.getDayOfWeek() == dow);
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

    private LocalDate date(int year, Month month, int day) {
        return LocalDate.of(year, month, day);
    }

    private LocalDate date(int year, int month, int day) {
        return LocalDate.of(year, month, day);
    }

}
*/