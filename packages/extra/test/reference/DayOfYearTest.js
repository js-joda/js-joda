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
    NullPointerException,
    TemporalField,
    TemporalQueries,
    UnsupportedTemporalTypeException,
    ValueRange,
    Year,
    ZoneId,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertThrows } from '../testUtils';

import { DayOfYear } from '../../src/DayOfYear';

describe('org.threeten.extra.TestDayOfYear', () => {
    const YEAR_STANDARD = Year.of(2007);
    const YEAR_LEAP = Year.of(2008);
    const STANDARD_YEAR_LENGTH = 365;
    const LEAP_YEAR_LENGTH = 366;
    const TEST = DayOfYear.of(12);

    class TestingField extends TemporalField {
        getBaseUnit() {
            return ChronoUnit.DAYS;
        }

        getRangeUnit() {
            return ChronoUnit.YEARS;
        }

        range() {
            return ValueRange.of(1, 365, 366);
        }

        isDateBased() {
            return true;
        }

        isTimeBased() {
            return false;
        }

        isSupportedBy(temporal) {
            return temporal.isSupported(ChronoField.DAY_OF_YEAR);
        }

        // eslint-disable-next-line no-unused-vars
        rangeRefinedBy(temporal) {
            return this.range();
        }

        getFrom(temporal) {
            return temporal.getLong(ChronoField.DAY_OF_YEAR);
        }

        adjustInto(temporal, newValue) {
            return temporal.with(ChronoField.DAY_OF_YEAR, newValue);
        }
    }

    TestingField.INSTANCE = new TestingField();

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', function(/*this*/) {
        this.retries(100);
        it('test_now', () => {
            const expected = LocalDate.now().dayOfYear();
            const actual = DayOfYear.now().value();
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', function(/*this*/) {
        this.retries(100);
        it('test_now_ZoneId', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            const expected = LocalDate.now(zone).dayOfYear();
            const actual = DayOfYear.now(zone).value();
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // of(int)
    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('test_of_int', () => {
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(i, test.value());
                assertEquals(test, DayOfYear.of(i));
            }
        });

        it('test_of_int_tooLow', () => {
            assertThrows(DateTimeException, () => DayOfYear.of(0));
        });

        it('test_of_int_tooHigh', () => {
            assertThrows(DateTimeException, () => DayOfYear.of(367));
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from()', () => {
        it('test_from_TemporalAccessor_notLeapYear', () => {
            let date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = DayOfYear.from(date);
                assertEquals(i, test.value());
                date = date.plusDays(1);
            }
            const test = DayOfYear.from(date);
            assertEquals(1, test.value());
        });

        it('test_from_TemporalAccessor_leapYear', () => {
            let date = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.from(date);
                assertEquals(i, test.value());
                date = date.plusDays(1);
            }
        });

        it('test_from_TemporalAccessor_DayOfYear', () => {
            const dom = DayOfYear.of(6);
            assertEquals(dom, DayOfYear.from(dom));
        });

        it('test_from_TemporalAccessor_noDerive', () => {
            assertThrows(DateTimeException, () => DayOfYear.from(LocalTime.NOON));
        });

        it('test_from_TemporalAccessor_null', () => {
            assertThrows(NullPointerException, () => DayOfYear.from(null));
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
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_MONTH));
            assertEquals(true, TEST.isSupported(ChronoField.DAY_OF_YEAR));
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
            assertEquals(true, TEST.isSupported(TestingField.INSTANCE));
        });
    });

    //-----------------------------------------------------------------------
    // range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range()', () => {
        it('test_range', () => {
            assertEquals(ChronoField.DAY_OF_YEAR.range(), TEST.range(ChronoField.DAY_OF_YEAR));
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
            assertEquals(12, TEST.get(ChronoField.DAY_OF_YEAR));
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
            assertEquals(12, TEST.getLong(ChronoField.DAY_OF_YEAR));
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
    // isValidYear(int)
    //-----------------------------------------------------------------------
    describe('isValidYear()', () => {
        it('test_isValidYear_366', () => {
            const test = DayOfYear.of(366);
            assertEquals(false, test.isValidYear(2011));
            assertEquals(true, test.isValidYear(2012));
            assertEquals(false, test.isValidYear(2013));
        });

        it('test_isValidYear_365', () => {
            const test = DayOfYear.of(365);
            assertEquals(true, test.isValidYear(2011));
            assertEquals(true, test.isValidYear(2012));
            assertEquals(true, test.isValidYear(2013));
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
        it('test_adjustInto_fromStartOfYear_notLeapYear', () => {
            const base = LocalDate.of(2007, 1, 1);
            let expected = base;
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.adjustInto(base));
                expected = expected.plusDays(1);
            }
        });

        it('test_adjustInto_fromEndOfYear_notLeapYear', () => {
            const base = LocalDate.of(2007, 12, 31);
            let expected = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.adjustInto(base));
                expected = expected.plusDays(1);
            }
        });

        it('test_adjustInto_fromStartOfYear_notLeapYear_day366', () => {
            const base = LocalDate.of(2007, 1, 1);
            const test = DayOfYear.of(LEAP_YEAR_LENGTH);
            assertThrows(DateTimeException, () => test.adjustInto(base));

        });

        it('test_adjustInto_fromEndOfYear_notLeapYear_day366', () => {
            const base = LocalDate.of(2007, 12, 31);
            const test = DayOfYear.of(LEAP_YEAR_LENGTH);
            assertThrows(DateTimeException, () => test.adjustInto(base));
            
        });

        it('test_adjustInto_fromStartOfYear_leapYear', () => {
            const base = LocalDate.of(2008, 1, 1);
            let expected = base;
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.adjustInto(base));
                expected = expected.plusDays(1);
            }
        });

        it('test_adjustInto_fromEndOfYear_leapYear', () => {
            const base = LocalDate.of(2008, 12, 31);
            let expected = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.adjustInto(base));
                expected = expected.plusDays(1);
            }
        });

        it('test_adjustInto_null', () => {
            assertThrows(NullPointerException, () => TEST.adjustInto(null));
        });
    });

    //-----------------------------------------------------------------------
    // atYear(Year)
    //-----------------------------------------------------------------------
    describe('atYear(Year)', () => {
        it('test_atYear_Year_notLeapYear', () => {
            let expected = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.atYear(YEAR_STANDARD));
                expected = expected.plusDays(1);
            }
        });

        it('test_atYear_fromStartOfYear_notLeapYear_day366', () => {
            const test = DayOfYear.of(LEAP_YEAR_LENGTH);
            assertThrows(DateTimeException, () => test.atYear(YEAR_STANDARD));
        });

        it('test_atYear_Year_leapYear', () => {
            let expected = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.atYear(YEAR_LEAP));
                expected = expected.plusDays(1);
            }
        });

        it('test_atYear_Year_nullYear', () => {
            assertThrows(NullPointerException, () => TEST.atYear(null));
        });
    });

    //-----------------------------------------------------------------------
    // atYear(int)
    //-----------------------------------------------------------------------
    describe('atYear(int)', () => {
        it('test_atYear_int_notLeapYear', () => {
            let expected = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.atYear(2007));
                expected = expected.plusDays(1);
            }
        });

        it('test_atYear_int_fromStartOfYear_notLeapYear_day366', () => {
            const test = DayOfYear.of(LEAP_YEAR_LENGTH);
            assertThrows(DateTimeException, () => test.atYear(2007));
        });

        it('test_atYear_int_leapYear', () => {
            let expected = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = DayOfYear.of(i);
                assertEquals(expected, test.atYear(2008));
                expected = expected.plusDays(1);
            }
        });

        it('test_atYear_int_invalidDay', () => {
            assertThrows(DateTimeException, () => TEST.atYear(Year.MIN_VALUE - 1));
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_compareTo', () => {
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const a = DayOfYear.of(i);
                for (let j = 1; j <= LEAP_YEAR_LENGTH; j++) {
                    const b = DayOfYear.of(j);
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

        it('test_compareTo_nullDayOfYear', () => {
            const doy = null;
            const test = DayOfYear.of(1);
            assertThrows(NullPointerException, () => test.compareTo(doy));
        });
    });

    //-----------------------------------------------------------------------
    // equals() / hashCode()
    //-----------------------------------------------------------------------
    describe('equals() / hashCode()', () => {
        it('test_equals', () => {
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const a = DayOfYear.of(i);
                for (let j = 1; j <= LEAP_YEAR_LENGTH; j++) {
                    const b = DayOfYear.of(j);
                    assertEquals(i === j, a.equals(b));
                    assertEquals(i === j, a.hashCode() === b.hashCode());
                }
            }
        });

        it('test_equals_nullDayOfYear', () => {
            const doy = null;
            const test = DayOfYear.of(1);
            assertEquals(false, test.equals(doy));
        });

        it('test_equals_incorrectType', () => {
            const test = DayOfYear.of(1);
            const obj = 'Incorrect type';
            assertEquals(false, test.equals(obj));
        });
    });


    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const a = DayOfYear.of(i);
                assertEquals(`DayOfYear:${i}`, a.toString());
            }
        });
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(Clock)', () => {
        const zone = ZoneId.of('UTC+01:02:03');

        it('test_now_clock_notLeapYear', () => {
            let date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const instant = date.atStartOfDay(zone).toInstant();
                const clock = Clock.fixed(instant, zone);
                const test = DayOfYear.now(clock);
                assertEquals(i, test.value());
                date = date.plusDays(1);
            }
        });

        it('test_now_clock_leapYear', () => {
            let date = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const instant = date.atStartOfDay(zone).toInstant();
                const clock = Clock.fixed(instant, zone);
                const test = DayOfYear.now(clock);
                assertEquals(i, test.value());
                date = date.plusDays(1);
            }
        });
    });
});
