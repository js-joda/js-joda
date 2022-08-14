/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ChronoField,
    ChronoUnit,
    Clock,
    DateTimeException,
    IsoChronology,
    IsoFields,
    LocalDate,
    LocalTime,
    Month,
    MonthDay,
    NullPointerException,
    TemporalField,
    TemporalQueries,
    UnsupportedTemporalTypeException,
    ValueRange,
    YearMonth,
    ZoneId,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertSame, assertThrows } from '../testUtils';

import { DayOfMonth } from '../../src/DayOfMonth';

describe('org.threeten.extra.TestDayOfMonth', () => {
    const MAX_LENGTH = 31;
    const TEST = DayOfMonth.of(12);

    class TestingField extends TemporalField {
        getBaseUnit() {
            return ChronoUnit.DAYS;
        }

        getRangeUnit() {
            return ChronoUnit.MONTHS;
        }

        range() {
            return ValueRange.of(1, 28, 31);
        }

        isDateBased() {
            return true;
        }

        isTimeBased() {
            return false;
        }

        isSupportedBy(temporal) {
            return temporal.isSupported(ChronoField.DAY_OF_MONTH);
        }

        // eslint-disable-next-line no-unused-vars
        rangeRefinedBy(temporal) {
            return this.range();
        }

        getFrom(temporal) {
            return temporal.getLong(ChronoField.DAY_OF_MONTH);
        }

        adjustInto(temporal, newValue) {
            return temporal.with(ChronoField.DAY_OF_MONTH, newValue);
        }
    }

    TestingField.INSTANCE = new TestingField();

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', function(/*this*/) {
        this.retries(1);
        it('test_now', () => {
            const expected = LocalDate.now().dayOfMonth();
            const actual = DayOfMonth.now().value();
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', function(/*this*/) {
        this.retries(1);
        it('test_now_ZoneId', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            const expected = LocalDate.now(zone).dayOfMonth();
            const actual = DayOfMonth.now(zone).value();
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // of(int)
    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('test_of_int_singleton', () => {
            for (let i = 1; i <= MAX_LENGTH; i++) {
                const test = DayOfMonth.of(i);
                assertEquals(i, test.value());
                assertSame(test, DayOfMonth.of(i));
            }
        });

        it('test_of_int_tooLow', () => {
            assertThrows(DateTimeException, () => DayOfMonth.of(0));
        });

        it('test_of_int_tooHigh', () => {
            assertThrows(DateTimeException, () => DayOfMonth.of(32));
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from()', () => {
        it('test_from_TemporalAccessor_notLeapYear', () => {
            let date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= 31; i++) {  // Jan
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 28; i++) {  // Feb
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Mar
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 30; i++) {  // Apr
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // May
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 30; i++) {  // Jun
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Jul
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Aug
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 30; i++) {  // Sep
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Oct
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 30; i++) {  // Nov
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Dec
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
        });

        it('test_from_TemporalAccessor_leapYear', () => {
            let date = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= 31; i++) {  // Jan
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 29; i++) {  // Feb
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
            for (let i = 1; i <= 31; i++) {  // Mar
                assertEquals(i, DayOfMonth.from(date).value());
                date = date.plusDays(1);
            }
        });

        it('test_from_TemporalAccessor_DayOfMonth', () => {
            const dom = DayOfMonth.of(6);
            assertEquals(dom, DayOfMonth.from(dom));
        });

        it('test_from_TemporalAccessor_noDerive', () => {
            assertThrows(DateTimeException, () => DayOfMonth.from(LocalTime.NOON));
        });

        it('test_from_TemporalAccessor_null', () => {
            assertThrows(NullPointerException, () => DayOfMonth.from(null));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalField)
    //-----------------------------------------------------------------------
    describe('isSupported()', () => {
        it('test_isSupported', () => {
            assertEquals(false, TEST.isSupported(null));
            assertEquals(false, TEST.isSupported(ChronoField.NANO_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.NANO_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MICRO_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.MICRO_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MILLI_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.MILLI_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.SECOND_OF_MINUTE));
            assertEquals(false, TEST.isSupported(ChronoField.SECOND_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MINUTE_OF_HOUR));
            assertEquals(false, TEST.isSupported(ChronoField.MINUTE_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.HOUR_OF_AMPM));
            assertEquals(false, TEST.isSupported(ChronoField.CLOCK_HOUR_OF_AMPM));
            assertEquals(false, TEST.isSupported(ChronoField.HOUR_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.CLOCK_HOUR_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.AMPM_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_WEEK));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
            assertEquals(true, TEST.isSupported(ChronoField.DAY_OF_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.EPOCH_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_WEEK_OF_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_WEEK_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.MONTH_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.PROLEPTIC_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.YEAR_OF_ERA));
            assertEquals(false, TEST.isSupported(ChronoField.YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.ERA));
            assertEquals(false, TEST.isSupported(ChronoField.INSTANT_SECONDS));
            assertEquals(false, TEST.isSupported(ChronoField.OFFSET_SECONDS));
            assertEquals(false, TEST.isSupported(IsoFields.DAY_OF_QUARTER));
            assertEquals(true, TEST.isSupported(TestingField.INSTANCE));
        });
    });

    //-----------------------------------------------------------------------
    // range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range()', () => {
        it('test_range', () => {
            assertEquals(ChronoField.DAY_OF_MONTH.range(), TEST.range(ChronoField.DAY_OF_MONTH));
        });

        it('test_range_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.range(ChronoField.MONTH_OF_YEAR));
        });

        it('test_range_null', () => {
            assertThrows(NullPointerException, () => TEST.range(null));
        });
    });

    //-----------------------------------------------------------------------
    // get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get()', () => {
        it('test_get', () => {
            assertEquals(12, TEST.get(ChronoField.DAY_OF_MONTH));
        });

        it('test_get_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.get(ChronoField.MONTH_OF_YEAR));
        });

        it('test_get_null', () => {
            assertThrows(NullPointerException, () => TEST.get(null));
        });
    });

    //-----------------------------------------------------------------------
    // getLong(TemporalField)
    //-----------------------------------------------------------------------
    describe('getLong()', () => {
        it('test_getLong', () => {
            assertEquals(12, TEST.getLong(ChronoField.DAY_OF_MONTH));
        });

        it('test_getLong_derivedField', () => {
            assertEquals(12, TEST.getLong(TestingField.INSTANCE));
        });

        it('test_getLong_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.getLong(ChronoField.MONTH_OF_YEAR));
        });

        it('test_getLong_invalidField2', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.getLong(IsoFields.DAY_OF_QUARTER));
        });

        it('test_getLong_null', () => {
            assertThrows(NullPointerException, () => TEST.getLong(null));
        });
    });

    //-----------------------------------------------------------------------
    // isValidYearMonth(int)
    //-----------------------------------------------------------------------
    describe('isValidYearMonth()', () => {
        it('test_isValidYearMonth_31', () => {
            const test = DayOfMonth.of(31);
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 1)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 2)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 3)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 4)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 5)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 6)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 7)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 8)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 9)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 10)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 11)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 12)));
        });

        it('test_isValidYearMonth_30', () => {
            const test = DayOfMonth.of(30);
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 1)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2012, 2)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 3)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 4)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 5)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 6)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 7)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 8)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 9)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 10)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 11)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 12)));
        });

        it('test_isValidYearMonth_29', () => {
            const test = DayOfMonth.of(29);
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 1)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 2)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 3)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 4)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 5)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 6)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 7)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 8)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 9)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 10)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 11)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 12)));
            assertEquals(false, test.isValidYearMonth(YearMonth.of(2011, 2)));
        });

        it('test_isValidYearMonth_28', () => {
            const test = DayOfMonth.of(28);
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 1)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 2)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 3)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 4)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 5)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 6)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 7)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 8)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 9)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 10)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 11)));
            assertEquals(true, test.isValidYearMonth(YearMonth.of(2012, 12)));
        });

        it('test_isValidYearMonth_null', () => {
            assertFalse(TEST.isValidYearMonth(null));
        });
    });

    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query()', () => {
        it('test_query', () => {
            assertEquals(IsoChronology.INSTANCE, TEST.query(TemporalQueries.chronology()));
            assertEquals(null, TEST.query(TemporalQueries.localDate()));
            assertEquals(null, TEST.query(TemporalQueries.localTime()));
            assertEquals(null, TEST.query(TemporalQueries.offset()));
            assertEquals(null, TEST.query(TemporalQueries.precision()));
            assertEquals(null, TEST.query(TemporalQueries.zone()));
            assertEquals(null, TEST.query(TemporalQueries.zoneId()));
        });
    });

    //-----------------------------------------------------------------------
    // adjustInto(Temporal)
    //-----------------------------------------------------------------------
    describe('adjustInto()', () => {
        it('test_adjustInto', () => {
            const base = LocalDate.of(2007, 1, 1);
            let expected = base;
            for (let i = 1; i <= MAX_LENGTH; i++) {  // Jan
                const result = DayOfMonth.of(i).adjustInto(base);
                assertEquals(expected, result);
                expected = expected.plusDays(1);
            }
        });

        it('test_adjustInto_april31', () => {
            const base = LocalDate.of(2007, 4, 1);
            const test = DayOfMonth.of(31);
            assertThrows(DateTimeException, () => test.adjustInto(base));
        });

        it('test_adjustInto_february29_notLeapYear', () => {
            const base = LocalDate.of(2007, 2, 1);
            const test = DayOfMonth.of(29);
            assertThrows(DateTimeException, () => test.adjustInto(base));
        });

        it('test_adjustInto_null', () => {
            assertThrows(NullPointerException, () => TEST.adjustInto(null));
        });
    });

    //-----------------------------------------------------------------------
    // atMonth(Month)
    //-----------------------------------------------------------------------
    describe('atYear(Year)', () => {
        it('test_atMonth_Month_31', () => {
            const test = DayOfMonth.of(31);
            assertEquals(MonthDay.of(1, 31), test.atMonth(Month.JANUARY));
            assertEquals(MonthDay.of(2, 29), test.atMonth(Month.FEBRUARY));
            assertEquals(MonthDay.of(3, 31), test.atMonth(Month.MARCH));
            assertEquals(MonthDay.of(4, 30), test.atMonth(Month.APRIL));
            assertEquals(MonthDay.of(5, 31), test.atMonth(Month.MAY));
            assertEquals(MonthDay.of(6, 30), test.atMonth(Month.JUNE));
            assertEquals(MonthDay.of(7, 31), test.atMonth(Month.JULY));
            assertEquals(MonthDay.of(8, 31), test.atMonth(Month.AUGUST));
            assertEquals(MonthDay.of(9, 30), test.atMonth(Month.SEPTEMBER));
            assertEquals(MonthDay.of(10, 31), test.atMonth(Month.OCTOBER));
            assertEquals(MonthDay.of(11, 30), test.atMonth(Month.NOVEMBER));
            assertEquals(MonthDay.of(12, 31), test.atMonth(Month.DECEMBER));
        });

        it('test_atMonth_Month_28', () => {
            const test = DayOfMonth.of(28);
            assertEquals(MonthDay.of(1, 28), test.atMonth(Month.JANUARY));
            assertEquals(MonthDay.of(2, 28), test.atMonth(Month.FEBRUARY));
            assertEquals(MonthDay.of(3, 28), test.atMonth(Month.MARCH));
            assertEquals(MonthDay.of(4, 28), test.atMonth(Month.APRIL));
            assertEquals(MonthDay.of(5, 28), test.atMonth(Month.MAY));
            assertEquals(MonthDay.of(6, 28), test.atMonth(Month.JUNE));
            assertEquals(MonthDay.of(7, 28), test.atMonth(Month.JULY));
            assertEquals(MonthDay.of(8, 28), test.atMonth(Month.AUGUST));
            assertEquals(MonthDay.of(9, 28), test.atMonth(Month.SEPTEMBER));
            assertEquals(MonthDay.of(10, 28), test.atMonth(Month.OCTOBER));
            assertEquals(MonthDay.of(11, 28), test.atMonth(Month.NOVEMBER));
            assertEquals(MonthDay.of(12, 28), test.atMonth(Month.DECEMBER));
        });


        it('test_atMonth_null', () => {
            assertThrows(NullPointerException, () => TEST.atMonth(null));
        });
    });

    //-----------------------------------------------------------------------
    // atYear(int)
    //-----------------------------------------------------------------------
    describe('atMonth(int)', () => {
        it('test_atMonth_int_31', () => {
            const test = DayOfMonth.of(31);
            assertEquals(MonthDay.of(1, 31), test.atMonth(1));
            assertEquals(MonthDay.of(2, 29), test.atMonth(2));
            assertEquals(MonthDay.of(3, 31), test.atMonth(3));
            assertEquals(MonthDay.of(4, 30), test.atMonth(4));
            assertEquals(MonthDay.of(5, 31), test.atMonth(5));
            assertEquals(MonthDay.of(6, 30), test.atMonth(6));
            assertEquals(MonthDay.of(7, 31), test.atMonth(7));
            assertEquals(MonthDay.of(8, 31), test.atMonth(8));
            assertEquals(MonthDay.of(9, 30), test.atMonth(9));
            assertEquals(MonthDay.of(10, 31), test.atMonth(10));
            assertEquals(MonthDay.of(11, 30), test.atMonth(11));
            assertEquals(MonthDay.of(12, 31), test.atMonth(12));
        });

        it('test_atMonth_int_28', () => {
            const test = DayOfMonth.of(28);
            assertEquals(MonthDay.of(1, 28), test.atMonth(1));
            assertEquals(MonthDay.of(2, 28), test.atMonth(2));
            assertEquals(MonthDay.of(3, 28), test.atMonth(3));
            assertEquals(MonthDay.of(4, 28), test.atMonth(4));
            assertEquals(MonthDay.of(5, 28), test.atMonth(5));
            assertEquals(MonthDay.of(6, 28), test.atMonth(6));
            assertEquals(MonthDay.of(7, 28), test.atMonth(7));
            assertEquals(MonthDay.of(8, 28), test.atMonth(8));
            assertEquals(MonthDay.of(9, 28), test.atMonth(9));
            assertEquals(MonthDay.of(10, 28), test.atMonth(10));
            assertEquals(MonthDay.of(11, 28), test.atMonth(11));
            assertEquals(MonthDay.of(12, 28), test.atMonth(12));
        });

        it('test_atMonth_tooLow', () => {
            assertThrows(DateTimeException, () => TEST.atMonth(0));
        });

        it('test_atMonth_tooHigh', () => {
            assertThrows(DateTimeException, () => TEST.atMonth(13));
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_compareTo', () => {
            for (let i = 1; i <= MAX_LENGTH; i++) {
                const a = DayOfMonth.of(i);
                for (let j = 1; j <= MAX_LENGTH; j++) {
                    const b = DayOfMonth.of(j);
                    if (i < j) {
                        assertEquals(true, a.compareTo(b) < 0);
                        assertEquals(true, b.compareTo(a) > 0);
                    } else if (i > j) {
                        assertEquals(true, a.compareTo(b) > 0);
                        assertEquals(true, b.compareTo(a) < 0);
                    } else {
                        assertEquals(0, a.compareTo(b));
                        assertEquals(0, b.compareTo(a));
                    }
                }
            }
        });

        it('test_compareTo_nullDayOfMonth', () => {
            const doy = null;
            const test = DayOfMonth.of(1);
            assertThrows(NullPointerException, () => test.compareTo(doy));
        });
    });

    //-----------------------------------------------------------------------
    // equals() / hashCode()
    //-----------------------------------------------------------------------
    describe('equals() / hashCode()', () => {
        it('test_equals', () => {
            for (let i = 1; i <= MAX_LENGTH; i++) {
                const a = DayOfMonth.of(i);
                for (let j = 1; j <= MAX_LENGTH; j++) {
                    const b = DayOfMonth.of(j);
                    assertEquals(i === j, a.equals(b));
                    assertEquals(i === j, a.hashCode() === b.hashCode());
                }
            }
        });

        it('test_equals_nullDayOfMonth', () => {
            const doy = null;
            const test = DayOfMonth.of(1);
            assertEquals(false, test.equals(doy));
        });

        it('test_equals_incorrectType', () => {
            const test = DayOfMonth.of(1);
            const obj = 'Incorrect type';
            assertEquals(false, test.equals(obj));
        });
    });


    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            for (let i = 1; i <= MAX_LENGTH; i++) {
                const a = DayOfMonth.of(i);
                assertEquals(`DayOfMonth:${i}`, a.toString());
            }
        });
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(Clock)', () => {
        const zone = ZoneId.of('UTC+01:02:03');

        for (let i = 1; i <= 31; i++) {  // Jan
            const instant = LocalDate.of(2008, 1, i).atStartOfDay(zone).toInstant();
            const clock = Clock.fixed(instant, zone);
            assertEquals(i, DayOfMonth.now(clock).value());
        }
    });
});
