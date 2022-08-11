/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ChronoField,
    DateTimeException,
    DateTimeFormatter,
    IsoChronology,
    IsoFields,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Month,
    NullPointerException,
    TemporalQueries,
    UnsupportedTemporalTypeException,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertSame, assertThrows, assertTrue } from '../testUtils';

import { Quarter } from '../../src/Quarter';

describe('org.threeten.extra.TestQuarter', () => {
    //-----------------------------------------------------------------------
    // of(int)
    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('test_of_int', () => {
            for (let i = 1; i <= 4; i++) {
                const test = Quarter.of(i);
                assertEquals(i, test.value());
            }
        });

        it('test_of_int_tooLow', () => {
            assertThrows(DateTimeException, () => Quarter.of(0));
        });

        it('test_of_int_tooHigh', () => {
            assertThrows(DateTimeException, () => Quarter.of(5));
        });
    });

    //-----------------------------------------------------------------------
    // ofMonth(int)
    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('test_ofMonth_int_singleton', () => {
            assertSame(Quarter.Q1, Quarter.ofMonth(1));
            assertSame(Quarter.Q1, Quarter.ofMonth(2));
            assertSame(Quarter.Q1, Quarter.ofMonth(3));
            assertSame(Quarter.Q2, Quarter.ofMonth(4));
            assertSame(Quarter.Q2, Quarter.ofMonth(5));
            assertSame(Quarter.Q2, Quarter.ofMonth(6));
            assertSame(Quarter.Q3, Quarter.ofMonth(7));
            assertSame(Quarter.Q3, Quarter.ofMonth(8));
            assertSame(Quarter.Q3, Quarter.ofMonth(9));
            assertSame(Quarter.Q4, Quarter.ofMonth(10));
            assertSame(Quarter.Q4, Quarter.ofMonth(11));
            assertSame(Quarter.Q4, Quarter.ofMonth(12));
        });

        it('test_ofMonth_int_valueTooLow', () => {
            assertThrows(DateTimeException, () => Quarter.of(0));
        });

        it('test_ofMonth_int_valueTooHigh', () => {
            assertThrows(DateTimeException, () => Quarter.of(13));
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from()', () => {
        it('test_from_TemporalAccessor', () => {
            assertEquals(Quarter.Q2, Quarter.from(LocalDate.of(2011, 6, 6)));
            assertEquals(Quarter.Q1, Quarter.from(LocalDateTime.of(2012, 2, 3, 12, 30)));
        });

        it('test_from_TemporalAccessor_Month', () => {
            assertEquals(Quarter.Q1, Quarter.from(Month.JANUARY));
            assertEquals(Quarter.Q1, Quarter.from(Month.FEBRUARY));
            assertEquals(Quarter.Q1, Quarter.from(Month.MARCH));
            assertEquals(Quarter.Q2, Quarter.from(Month.APRIL));
            assertEquals(Quarter.Q2, Quarter.from(Month.MAY));
            assertEquals(Quarter.Q2, Quarter.from(Month.JUNE));
            assertEquals(Quarter.Q3, Quarter.from(Month.JULY));
            assertEquals(Quarter.Q3, Quarter.from(Month.AUGUST));
            assertEquals(Quarter.Q3, Quarter.from(Month.SEPTEMBER));
            assertEquals(Quarter.Q4, Quarter.from(Month.OCTOBER));
            assertEquals(Quarter.Q4, Quarter.from(Month.NOVEMBER));
            assertEquals(Quarter.Q4, Quarter.from(Month.DECEMBER));
        });

        it('test_from_TemporalAccessorl_invalid_noDerive', () => {
            assertThrows(DateTimeException.class, () => Quarter.from(LocalTime.of(12, 30)));
        });

        it('test_from_TemporalAccessor_null', () => {
            
            assertThrows(NullPointerException.class, () => Quarter.from(null));
        });

        it('test_from_parse_CharSequence', () => {
            const formatter = DateTimeFormatter.ofPattern("'Q'Q");
            assertEquals(Quarter.Q3, formatter.parse('Q3', Quarter.FROM));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalField)
    //-----------------------------------------------------------------------
    describe('isSupported()', () => {
        it('test_isSupported', () => {
            const test = Quarter.Q1;
            assertEquals(false, test.isSupported(null));
            assertEquals(false, test.isSupported(ChronoField.NANO_OF_SECOND));
            assertEquals(false, test.isSupported(ChronoField.NANO_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.MICRO_OF_SECOND));
            assertEquals(false, test.isSupported(ChronoField.MICRO_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.MILLI_OF_SECOND));
            assertEquals(false, test.isSupported(ChronoField.MILLI_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.SECOND_OF_MINUTE));
            assertEquals(false, test.isSupported(ChronoField.SECOND_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.MINUTE_OF_HOUR));
            assertEquals(false, test.isSupported(ChronoField.MINUTE_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.HOUR_OF_AMPM));
            assertEquals(false, test.isSupported(ChronoField.CLOCK_HOUR_OF_AMPM));
            assertEquals(false, test.isSupported(ChronoField.HOUR_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.CLOCK_HOUR_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.AMPM_OF_DAY));
            assertEquals(false, test.isSupported(ChronoField.DAY_OF_WEEK));
            assertEquals(false, test.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH));
            assertEquals(false, test.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
            assertEquals(false, test.isSupported(ChronoField.DAY_OF_MONTH));
            assertEquals(false, test.isSupported(ChronoField.DAY_OF_YEAR));
            assertEquals(false, test.isSupported(ChronoField.EPOCH_DAY));
            assertEquals(false, test.isSupported(ChronoField.ALIGNED_WEEK_OF_MONTH));
            assertEquals(false, test.isSupported(ChronoField.ALIGNED_WEEK_OF_YEAR));
            assertEquals(false, test.isSupported(ChronoField.MONTH_OF_YEAR));
            assertEquals(false, test.isSupported(ChronoField.PROLEPTIC_MONTH));
            assertEquals(false, test.isSupported(ChronoField.YEAR_OF_ERA));
            assertEquals(false, test.isSupported(ChronoField.YEAR));
            assertEquals(false, test.isSupported(ChronoField.ERA));
            assertEquals(false, test.isSupported(ChronoField.INSTANT_SECONDS));
            assertEquals(false, test.isSupported(ChronoField.OFFSET_SECONDS));
            assertEquals(true, test.isSupported(IsoFields.QUARTER_OF_YEAR));
        });
    });

    //-----------------------------------------------------------------------
    // range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range()', () => {
        it('test_range', () => {
            assertEquals(IsoFields.QUARTER_OF_YEAR.range(), Quarter.Q1.range(IsoFields.QUARTER_OF_YEAR));
        });

        it('test_range_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException.class, () => Quarter.Q1.range(ChronoField.MONTH_OF_YEAR));
        });

        it('test_range_null', () => {
            assertThrows(NullPointerException, () => Quarter.Q1.range(null));
        });
    });

    //-----------------------------------------------------------------------
    // get()
    //-----------------------------------------------------------------------
    describe('get()', () => {
        it('test_get', () => {
            assertEquals(1, Quarter.Q1.get(IsoFields.QUARTER_OF_YEAR));
            assertEquals(2, Quarter.Q2.get(IsoFields.QUARTER_OF_YEAR));
            assertEquals(3, Quarter.Q3.get(IsoFields.QUARTER_OF_YEAR));
            assertEquals(4, Quarter.Q4.get(IsoFields.QUARTER_OF_YEAR));
        });

        it('test_get_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException.class, () => Quarter.Q2.get(ChronoField.MONTH_OF_YEAR));
        });

        it('test_get_null', () => {
            assertThrows(NullPointerException, () => Quarter.Q2.get(null));
        });
    });

    //-----------------------------------------------------------------------
    // getLong()
    //-----------------------------------------------------------------------
    describe('getLong()', () => {
        it('test_getLong', () => {
            assertEquals(1, Quarter.Q1.getLong(IsoFields.QUARTER_OF_YEAR));
            assertEquals(2, Quarter.Q2.getLong(IsoFields.QUARTER_OF_YEAR));
            assertEquals(3, Quarter.Q3.getLong(IsoFields.QUARTER_OF_YEAR));
            assertEquals(4, Quarter.Q4.getLong(IsoFields.QUARTER_OF_YEAR));
        });

        it('test_getLong_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => Quarter.Q2.getLong(ChronoField.MONTH_OF_YEAR));
        });

        it('test_getLong_null', () => {
            assertThrows(NullPointerException, () => Quarter.Q2.getLong(null));
        });
    });

    //-----------------------------------------------------------------------
    // plus(long), plus(long,unit)
    //-----------------------------------------------------------------------
    const data_plus = [
        [1, -5, 4],
        [1, -4, 1],
        [1, -3, 2],
        [1, -2, 3],
        [1, -1, 4],
        [1, 0, 1],
        [1, 1, 2],
        [1, 2, 3],
        [1, 3, 4],
        [1, 4, 1],
        [1, 5, 2],
    ];

    it('test_plus_long', () => {
        for (const [base, amount, expected] of data_plus) {
            assertEquals(Quarter.of(expected), Quarter.of(base).plus(amount));
        }
    });

    //-----------------------------------------------------------------------
    // minus(long), minus(long,unit)
    //-----------------------------------------------------------------------
    const data_minus = [
        [1, -5, 2],
        [1, -4, 1],
        [1, -3, 4],
        [1, -2, 3],
        [1, -1, 2],
        [1, 0, 1],
        [1, 1, 4],
        [1, 2, 3],
        [1, 3, 2],
        [1, 4, 1],
        [1, 5, 4],
    ];

    it('test_minus_long', () => {
        for (const [base, amount, expected] of data_minus) {
            assertEquals(Quarter.of(expected), Quarter.of(base).minus(amount));
        }
    });

    //-----------------------------------------------------------------------
    // length(boolean)
    //-----------------------------------------------------------------------
    it('test_length_boolean', () => {
        assertEquals(91, Quarter.Q1.length(true));
        assertEquals(90, Quarter.Q1.length(false));
        assertEquals(91, Quarter.Q2.length(true));
        assertEquals(91, Quarter.Q2.length(false));
        assertEquals(92, Quarter.Q3.length(true));
        assertEquals(92, Quarter.Q3.length(false));
        assertEquals(92, Quarter.Q4.length(true));
        assertEquals(92, Quarter.Q4.length(false));
    });

    //-----------------------------------------------------------------------
    // firstMonth()
    //-----------------------------------------------------------------------
    it('test_firstMonth', () => {
        assertEquals(Month.JANUARY, Quarter.Q1.firstMonth());
        assertEquals(Month.APRIL, Quarter.Q2.firstMonth());
        assertEquals(Month.JULY, Quarter.Q3.firstMonth());
        assertEquals(Month.OCTOBER, Quarter.Q4.firstMonth());
    });

    //-----------------------------------------------------------------------
    // query()
    //-----------------------------------------------------------------------
    it('test_query', () => {
        assertEquals(IsoChronology.INSTANCE, Quarter.Q1.query(TemporalQueries.chronology()));
        assertEquals(null, Quarter.Q1.query(TemporalQueries.localDate()));
        assertEquals(null, Quarter.Q1.query(TemporalQueries.localTime()));
        assertEquals(null, Quarter.Q1.query(TemporalQueries.offset()));
        assertEquals(IsoFields.QUARTER_YEARS, Quarter.Q1.query(TemporalQueries.precision()));
        assertEquals(null, Quarter.Q1.query(TemporalQueries.zone()));
        assertEquals(null, Quarter.Q1.query(TemporalQueries.zoneId()));
    });

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    it('test_toString', () => {
        assertEquals('Q1', Quarter.Q1.toString());
        assertEquals('Q2', Quarter.Q2.toString());
        assertEquals('Q3', Quarter.Q3.toString());
        assertEquals('Q4', Quarter.Q4.toString());
    });

    //-----------------------------------------------------------------------
    // generated methods
    //-----------------------------------------------------------------------
    it('test_enum', () => {
        assertEquals(Quarter.Q4, Quarter.valueOf('Q4'));
        assertEquals(Quarter.Q1, Quarter.values()[0]);
    });

    //-----------------------------------------------------------------------
    // compareTo, equals, hashCode
    //-----------------------------------------------------------------------
    it('test_compareTo', () => {
        for (let q1 = 1; q1 <= 4; q1++) {
            const a = Quarter.of(q1);
            for (let q2 = 1; q2 <= 4; q2++) {
                const b = Quarter.of(q2);
                if (q1 < q2) {
                    assertEquals(true, a.compareTo(b) < 0);
                    assertEquals(true, b.compareTo(a) > 0);
                    assertFalse(a.equals(b));
                    assertFalse(b.equals(a));
                } else if (q1 > q2) {
                    assertEquals(true, a.compareTo(b) > 0);
                    assertEquals(true, b.compareTo(a) < 0);
                    assertFalse(a.equals(b));
                    assertFalse(b.equals(a));
                } else {
                    assertEquals(0, a.compareTo(b));
                    assertEquals(0, b.compareTo(a));
                    assertTrue(a.equals(b));
                    assertTrue(b.equals(a));
                    assertTrue(a.hashCode() === b.hashCode());
                }
            }
        }
    });
});
