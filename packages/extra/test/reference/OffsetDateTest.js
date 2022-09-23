/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ArithmeticException,
    ChronoField,
    ChronoUnit,
    Clock,
    DateTimeException,
    DateTimeFormatter,
    DateTimeParseException,
    IllegalArgumentException,
    Instant,
    IsoChronology,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Month,
    NullPointerException,
    OffsetDateTime,
    Period,
    TemporalAdjuster,
    TemporalQueries,
    TemporalQuery,
    Year,
    ZoneOffset,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertNotNull, assertNull, assertThrows, assertTrue } from '../testUtils';

import { OffsetDate } from '../../src/OffsetDate';

import { MockSimplePeriod } from './MockSimplePeriod';

import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

describe('org.threeten.extra.TestOffsetDate', () => {
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);

    const TEST_2007_07_15_PONE = OffsetDate.of(2007, 7, 15, OFFSET_PONE);

    const samples = [TEST_2007_07_15_PONE, OffsetDate.MIN, OffsetDate.MAX];

    const validFields = new Set([
        ChronoField.DAY_OF_WEEK,
        ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH,
        ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR,
        ChronoField.DAY_OF_MONTH,
        ChronoField.DAY_OF_YEAR,
        ChronoField.EPOCH_DAY,
        ChronoField.ALIGNED_WEEK_OF_MONTH,
        ChronoField.ALIGNED_WEEK_OF_YEAR,
        ChronoField.MONTH_OF_YEAR,
        ChronoField.PROLEPTIC_MONTH,
        ChronoField.YEAR_OF_ERA,
        ChronoField.YEAR,
        ChronoField.ERA,
        ChronoField.OFFSET_SECONDS,
        //JulianFields.JULIAN_DAY,
        //JulianFields.MODIFIED_JULIAN_DAY,
        //JulianFields.RATA_DIE,
    ]);

    const invalidFields = new Set(
        Object.values(ChronoField)
            .filter(property => property instanceof ChronoField)
            .filter(field => !validFields.has(field))
    );

    const data_sampleBadParse = [
        ['2008/07/05'],
        ['10000-01-01'],
        ['2008-1-1'],
        ['2008--01'],
        ['ABCD-02-01'],
        ['2008-AB-01'],
        ['2008-02-AB'],
        ['-0000-02-01'],
        ['2008-02-01Y'],
        ['2008-02-01+19:00'],
        ['2008-02-01+01/00'],
        ['2008-02-01+1900'],
        ['2008-02-01+01:60'],
        ['2008-02-01+01:30:123'],
        ['2008-02-01'],
        ['2008-02-01+01:00[Europe/Paris]'],
    ];

    const data_sampleToString = [
        [2008, 7, 5, 'Z', '2008-07-05Z'],
        [2008, 7, 5, '+00', '2008-07-05Z'],
        [2008, 7, 5, '+0000', '2008-07-05Z'],
        [2008, 7, 5, '+00:00', '2008-07-05Z'],
        [2008, 7, 5, '+000000', '2008-07-05Z'],
        [2008, 7, 5, '+00:00:00', '2008-07-05Z'],
        [2008, 7, 5, '-00', '2008-07-05Z'],
        [2008, 7, 5, '-0000', '2008-07-05Z'],
        [2008, 7, 5, '-00:00', '2008-07-05Z'],
        [2008, 7, 5, '-000000', '2008-07-05Z'],
        [2008, 7, 5, '-00:00:00', '2008-07-05Z'],
        [2008, 7, 5, '+01', '2008-07-05+01:00'],
        [2008, 7, 5, '+0100', '2008-07-05+01:00'],
        [2008, 7, 5, '+01:00', '2008-07-05+01:00'],
        [2008, 7, 5, '+010000', '2008-07-05+01:00'],
        [2008, 7, 5, '+01:00:00', '2008-07-05+01:00'],
        [2008, 7, 5, '+0130', '2008-07-05+01:30'],
        [2008, 7, 5, '+01:30', '2008-07-05+01:30'],
        [2008, 7, 5, '+013000', '2008-07-05+01:30'],
        [2008, 7, 5, '+01:30:00', '2008-07-05+01:30'],
        [2008, 7, 5, '+013040', '2008-07-05+01:30:40'],
        [2008, 7, 5, '+01:30:40', '2008-07-05+01:30:40'],
    ];

    const data_sampleDates = [
        [2008, 7, 5, OFFSET_PTWO],
        [2007, 7, 5, OFFSET_PONE],
        [2006, 7, 5, OFFSET_PTWO],
        [2005, 7, 5, OFFSET_PONE],
        [2004, 1, 1, OFFSET_PTWO],
        [-1, 1, 2, OFFSET_PONE],
        [99999, 11, 20, ZoneOffset.ofHoursMinutesSeconds(6, 9, 12)],
    ];

    const data_until = [
        [1, OffsetDate.of(2007, 6, 30, OFFSET_PONE), OffsetDate.of(2007, 7, 1, OFFSET_PONE), ChronoUnit.DAYS],
        [1, OffsetDate.of(2007, 6, 30, OFFSET_PONE), OffsetDate.of(2007, 8, 29, OFFSET_PONE), ChronoUnit.MONTHS],
        [2, OffsetDate.of(2007, 6, 30, OFFSET_PONE), OffsetDate.of(2007, 8, 30, OFFSET_PONE), ChronoUnit.MONTHS],
        [2, OffsetDate.of(2007, 6, 30, OFFSET_PONE), OffsetDate.of(2007, 8, 31, OFFSET_PONE), ChronoUnit.MONTHS]
    ];

    const data_samplePlusWeeksSymmetry = [
        [OffsetDate.of(-1, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(-1, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(0, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(0, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(0, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2007, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2007, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2008, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2008, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(2008, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2099, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2099, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2100, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2100, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 12, 31, OFFSET_PTWO)],
    ];

    const data_samplePlusDaysSymmetry = [
        [OffsetDate.of(-1, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(-1, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(0, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(0, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(0, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2007, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2007, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2008, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2008, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(2008, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2099, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2099, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2100, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2100, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 12, 31, OFFSET_PTWO)],
    ];

    const data_sampleMinusWeeksSymmetry = [
        [OffsetDate.of(-1, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(-1, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(0, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(0, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(0, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2007, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2007, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2008, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2008, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(2008, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2099, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2099, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2100, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2100, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 12, 31, OFFSET_PTWO)],
    ];

    const data_sampleMinusDaysSymmetry = [
        [OffsetDate.of(-1, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(-1, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(-1, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(0, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(0, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(0, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(0, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2007, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2007, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2007, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2008, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2008, 2, 29, OFFSET_PTWO)],
        [OffsetDate.of(2008, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2008, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2099, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2099, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2099, 12, 31, OFFSET_PTWO)],
        [OffsetDate.of(2100, 1, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 2, 28, OFFSET_PTWO)],
        [OffsetDate.of(2100, 3, 1, OFFSET_PONE)],
        [OffsetDate.of(2100, 12, 31, OFFSET_PTWO)],
    ];

    //-----------------------------------------------------------------------
    // constants
    //-----------------------------------------------------------------------
    describe('constants', () => {
        it('constant_MIN', () => {
            check(OffsetDate.MIN, Year.MIN_VALUE, 1, 1, ZoneOffset.MAX);
        });

        it('constant_MAX', () => {
            check(OffsetDate.MAX, Year.MAX_VALUE, 12, 31, ZoneOffset.MIN);
        });
    });

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', () => {
        it('now', function(/*this*/) {
            this.retries(1);
            assertEquals(OffsetDate.now(Clock.systemDefaultZone()), OffsetDate.now());
        });

        it('now_Clock_allSecsInDay_utc', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i+= 600) {
                const instant = Instant.ofEpochSecond(i);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = OffsetDate.now(clock);
                check(test, 1970, 1, (i < 24 * 60 * 60 ? 1 : 2), ZoneOffset.UTC);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch', () => {
            for (let i = -1; i >= -(2 * 24 * 60 * 60); i -= 600) {
                const instant = Instant.ofEpochSecond(i);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = OffsetDate.now(clock);
                check(test, 1969, 12, (i >= -24 * 60 * 60 ? 31 : 30), ZoneOffset.UTC);
            }
        });

        it('now_Clock_offsets', () => {
            const base = LocalDateTime.of(1970, 1, 1, 12, 0).toInstant(ZoneOffset.UTC);
            for (let i = -9; i < 15; i++) {
                const offset = ZoneOffset.ofHours(i);
                const clock = Clock.fixed(base, offset);
                const test = OffsetDate.now(clock);
                check(test, 1970, 1, (i >= 12 ? 2 : 1), offset);
            }
        });

        it('now_Clock_nullZoneId', () => {
            assertThrows(NullPointerException, () => OffsetDate.now(/*ZoneId*/ null));
        });

        it('now_Clock_nullClock', () => {
            assertThrows(NullPointerException, () => OffsetDate.now(/*Clock*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // factories
    //-----------------------------------------------------------------------
    function check(test, y, mo, d, offset) {
        if (!LocalDate.of(y, mo, d).equals(test.toLocalDate())) {
            console.log('???');
        }
        assertEquals(LocalDate.of(y, mo, d), test.toLocalDate());
        assertEquals(offset, test.offset());

        assertEquals(y, test.year());
        assertEquals(mo, test.month().value());
        assertEquals(d, test.dayOfMonth());

        assertEquals(test, test);
        assertEquals(test.hashCode(), test.hashCode());
        assertEquals(test, OffsetDate.of(y, mo, d, offset));
        assertEquals(test, OffsetDate.of(LocalDate.of(y, mo, d), offset));
    }

    //-----------------------------------------------------------------------
    describe('factories', () => {
        it('factory_of_intsOffset', () => {
            const test = OffsetDate.of(2007, 7, 15, OFFSET_PONE);
            check(test, 2007, 7, 15, OFFSET_PONE);
        });

        it('factory_of_ints_dayTooLow', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 1, 0, OFFSET_PONE));
        });

        it('factory_of_ints_dayTooHigh', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 1, 32, OFFSET_PONE));
        });

        it('factory_of_ints_monthTooLow', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 0, 1, OFFSET_PONE));
        });

        it('factory_of_ints_monthTooHigh', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 13, 1, OFFSET_PONE));
        });

        it('factory_of_ints_yearTooLow', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(MathUtil.MIN_SAFE_INTEGER, 1, 1, OFFSET_PONE));
        });

        it('factory_of_ints_nullOffset', () => {
            assertThrows(NullPointerException, () => OffsetDate.of(2007, 1, 1, /*ZoneOffset*/ null));
        });

        it('factory_of_LocalDateZoneOffset', () => {
            const localDate = LocalDate.of(2008, 6, 30);
            const test = OffsetDate.of(localDate, OFFSET_PONE);
            check(test, 2008, 6, 30, OFFSET_PONE);
        });

        it('factory_of_LocalDateZoneOffset_nullDate', () => {
            assertThrows(NullPointerException, () => OffsetDate.of(/*LocalDate*/ null, OFFSET_PONE));
        });

        it('factory_of_LocalDateZoneOffset_nullOffset', () => {
            const localDate = LocalDate.of(2008, 6, 30);
            assertThrows(NullPointerException, () => OffsetDate.of(localDate, /*ZoneOffset*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from(TemporalAccessor)', () => {
        it('test_from_TemporalAccessor_OD', () => {
            assertEquals(TEST_2007_07_15_PONE, OffsetDate.from(TEST_2007_07_15_PONE));
        });

        it('test_from_TemporalAccessor_ZDT', () => {
            const base = LocalDateTime.of(2007, 7, 15, 17, 30).atZone(OFFSET_PONE);
            assertEquals(TEST_2007_07_15_PONE, OffsetDate.from(base));
        });

        it('test_from_TemporalAccessor_invalid_noDerive', () => {
            assertThrows(DateTimeException, () => OffsetDate.from(LocalTime.of(12, 30)));
        });

        it('test_from_TemporalAccessor_null', () => {
            assertThrows(NullPointerException, () => OffsetDate.from(/*TemporalAccessor*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // parse()
    //-----------------------------------------------------------------------
    describe('parse()', () => {
        it('factory_parse_validText', () => {
            for (const [y, m, d, offsetId, parsable] of data_sampleToString) {
                const t = OffsetDate.parse(parsable);
                assertNotNull(t, parsable);
                assertEquals(y, t.year(), parsable);
                assertEquals(m, t.month().value(), parsable);
                assertEquals(d, t.dayOfMonth(), parsable);
                assertEquals(ZoneOffset.of(offsetId), t.offset());
            }
        });

        it('factory_parse_invalidText', () => {
            for (const [unparsable] of data_sampleBadParse) {
                assertThrows(DateTimeParseException, () => OffsetDate.parse(unparsable));
            }
        });

        it('factory_parse_illegalValue', () => {
            assertThrows(DateTimeParseException, () => OffsetDate.parse('2008-06-32+01:00'));
        });

        it('factory_parse_invalidValue', () => {
            assertThrows(DateTimeParseException, () => OffsetDate.parse('2008-06-31+01:00'));
        });

        it('factory_parse_nullText', () => {
            assertThrows(NullPointerException, () => OffsetDate.parse(/*String*/ null));
        });

    });

    //-----------------------------------------------------------------------
    // parse(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('parse(DateTimeFormatter)', () => {
        it('factory_parse_formatter', () => {
            const f = DateTimeFormatter.ofPattern('y M d XXX');
            const test = OffsetDate.parse('2010 12 3 +01:00', f);
            assertEquals(OffsetDate.of(2010, 12, 3, ZoneOffset.ofHours(1)), test);
        });

        it('factory_parse_formatter_nullText', () => {
            const f = DateTimeFormatter.ofPattern('y M d');
            assertThrows(NullPointerException, () => OffsetDate.parse(/*String*/ null, f));
        });

        it('factory_parse_formatter_nullFormatter', () => {
            assertThrows(NullPointerException, () => OffsetDate.parse('ANY', null));
        });
    });

    //-----------------------------------------------------------------------
    // constructor
    //-----------------------------------------------------------------------
    describe('constructor', () => {
        it('constructor_nullDate', () => {
            assertThrows(NullPointerException, () => new OffsetDate(null, OFFSET_PONE));
        });

        it('constructor_nullOffset', () => {
            assertThrows(NullPointerException, () => new OffsetDate(LocalDate.of(2008, 6, 30), null));
        });
    });

    //-----------------------------------------------------------------------
    // basics
    //-----------------------------------------------------------------------
    describe('basics', () => {
        it('test_get_OffsetDate', () => {
            for (const [y, m, d, offset] of data_sampleDates) {
                const localDate = LocalDate.of(y, m, d);
                const a = OffsetDate.of(localDate, offset);

                assertEquals(localDate, a.toLocalDate());
                assertEquals(offset, a.offset());
                assertEquals(localDate.toString() + offset.toString(), a.toString());
                assertEquals(localDate.year(), a.year());
                assertEquals(localDate.month(), a.month());
                assertEquals(localDate.dayOfMonth(), a.dayOfMonth());
                assertEquals(localDate.dayOfYear(), a.dayOfYear());
                assertEquals(localDate.dayOfWeek(), a.dayOfWeek());
            }
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalUnit)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalUnit)', () => {
        it('test_isSupported_TemporalUnit', () => {
            assertFalse(TEST_2007_07_15_PONE.isSupported(/*TemporalUnit*/ null));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.NANOS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.MICROS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.MILLIS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.SECONDS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.MINUTES));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.HOURS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.HALF_DAYS));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.DAYS));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.WEEKS));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.MONTHS));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.YEARS));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.DECADES));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.CENTURIES));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.MILLENNIA));
            assertTrue(TEST_2007_07_15_PONE.isSupported(ChronoUnit.ERAS));
            assertFalse(TEST_2007_07_15_PONE.isSupported(ChronoUnit.FOREVER));
        });
    });

    //-----------------------------------------------------------------------
    // get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            const test = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertEquals(2008, test.get(ChronoField.YEAR));
            assertEquals(6, test.get(ChronoField.MONTH_OF_YEAR));
            assertEquals(30, test.get(ChronoField.DAY_OF_MONTH));
            assertEquals(1, test.get(ChronoField.DAY_OF_WEEK));
            assertEquals(182, test.get(ChronoField.DAY_OF_YEAR));

            assertEquals(3600, test.get(ChronoField.OFFSET_SECONDS));
        });

        it('test_getLong_TemporalField', () => {
            const test = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertEquals(2008, test.getLong(ChronoField.YEAR));
            assertEquals(6, test.getLong(ChronoField.MONTH_OF_YEAR));
            assertEquals(30, test.getLong(ChronoField.DAY_OF_MONTH));
            assertEquals(1, test.getLong(ChronoField.DAY_OF_WEEK));
            assertEquals(182, test.getLong(ChronoField.DAY_OF_YEAR));

            assertEquals(3600, test.getLong(ChronoField.OFFSET_SECONDS));
        });
    });

    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query(TemporalQuery)', () => {
        it('test_query_chrono', () => {
            assertEquals(IsoChronology.INSTANCE, TEST_2007_07_15_PONE.query(TemporalQueries.chronology()));
            assertEquals(IsoChronology.INSTANCE, TemporalQueries.chronology().queryFrom(TEST_2007_07_15_PONE));
        });

        it('test_query_zoneId', () => {
            assertNull(TEST_2007_07_15_PONE.query(TemporalQueries.zoneId()));
            assertNull(TemporalQueries.zoneId().queryFrom(TEST_2007_07_15_PONE));
        });

        it('test_query_precision', () => {
            assertEquals(ChronoUnit.DAYS, TEST_2007_07_15_PONE.query(TemporalQueries.precision()));
            assertEquals(ChronoUnit.DAYS, TemporalQueries.precision().queryFrom(TEST_2007_07_15_PONE));
        });

        it('test_query_offset', () => {
            assertEquals(OFFSET_PONE, TEST_2007_07_15_PONE.query(TemporalQueries.offset()));
            assertEquals(OFFSET_PONE, TemporalQueries.offset().queryFrom(TEST_2007_07_15_PONE));
        });

        it('test_query_zone', () => {
            assertEquals(OFFSET_PONE, TEST_2007_07_15_PONE.query(TemporalQueries.zone()));
            assertEquals(OFFSET_PONE, TemporalQueries.zone().queryFrom(TEST_2007_07_15_PONE));
        });

        it('test_query_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.query(null));
        });
    });

    //-----------------------------------------------------------------------
    // adjustInto(Temporal)
    //-----------------------------------------------------------------------
    describe('adjustInto(Temporal)', () => {
        it('test_adjustInto', () => {
            const odt = OffsetDateTime.of(2007, 12, 3, 10, 15, 30, 0, ZoneOffset.UTC);
            const od = OffsetDate.of(2008, 1, 4, OFFSET_PONE);
            const expected = OffsetDateTime.of(2008, 1, 4, 10, 15, 30, 0, OFFSET_PONE);
            assertEquals(expected, od.adjustInto(odt));
        });
    });

    //-----------------------------------------------------------------------
    // until(Temporal, TemporalUnit)
    //-----------------------------------------------------------------------
    describe('until(Temporal, TemporalUnit)', () => {
        it('test_until', () => {
            for (const [expected, od1, od2, unit] of data_until) {
                assertEquals(expected, od1.until(od2, unit));
                assertEquals(-expected, od2.until(od1, unit));
            }
        });

        it('test_until_otherType', () => {
            const start = OffsetDate.of(2007, 6, 30, OFFSET_PONE);
            const end = OffsetDateTime.of(2007, 8, 31, 12, 0, 0, 0, OFFSET_PONE);
            assertEquals(2, start.until(end, ChronoUnit.MONTHS));
        });

        it('test_until_invalidType', () => {
            const od1 = OffsetDate.of(2012, 6, 30, OFFSET_PONE);
            assertThrows(DateTimeException, () => od1.until(Instant.ofEpochSecond(7), ChronoUnit.SECONDS));
        });
    });

    //-----------------------------------------------------------------------
    // withOffsetSameLocal()
    //-----------------------------------------------------------------------
    describe('withOffsetSameLocal()', () => {
        it('test_withOffsetSameLocal', () => {
            const base = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            const test = base.withOffsetSameLocal(OFFSET_PTWO);
            assertEquals(base.toLocalDate(), test.toLocalDate());
            assertEquals(OFFSET_PTWO, test.offset());
        });

        it('test_withOffsetSameLocal_noChange', () => {
            const base = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            const test = base.withOffsetSameLocal(OFFSET_PONE);
            assertEquals(base, test);
        });

        it('test_withOffsetSameLocal_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.withOffsetSameLocal(null));
        });
    });

    //-----------------------------------------------------------------------
    // with(WithAdjuster)
    //-----------------------------------------------------------------------
    describe('with(WithAdjuster)', () => {
        it('test_with_adjustment', () => {
            const sample = OffsetDate.of(2012, 3, 4, OFFSET_PONE);
            // eslint-disable-next-line no-unused-vars
            const adjuster = createTemporalAdjuster(temporal => sample);
            assertEquals(sample, TEST_2007_07_15_PONE.with(adjuster));
        });

        it('test_with_adjustment_LocalDate', () => {
            const test = TEST_2007_07_15_PONE.with(LocalDate.of(2008, 6, 30));
            assertEquals(OffsetDate.of(2008, 6, 30, OFFSET_PONE), test);
        });

        it('test_with_adjustment_OffsetDate', () => {
            const test = TEST_2007_07_15_PONE.with(OffsetDate.of(2008, 6, 30, OFFSET_PTWO));
            assertEquals(OffsetDate.of(2008, 6, 30, OFFSET_PTWO), test);
        });

        it('test_with_adjustment_ZoneOffset', () => {
            const test = TEST_2007_07_15_PONE.with(OFFSET_PTWO);
            assertEquals(OffsetDate.of(2007, 7, 15, OFFSET_PTWO), test);
        });

        it('test_with_adjustment_Month', () => {
            const test = TEST_2007_07_15_PONE.with(Month.DECEMBER);
            assertEquals(OffsetDate.of(2007, 12, 15, OFFSET_PONE), test);
        });

        it('test_with_adjustment_offsetUnchanged', () => {
            const base = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            const test = base.with(Year.of(2008));
            assertEquals(base, test);
        });

        it('test_with_adjustment_noChange', () => {
            const date = LocalDate.of(2008, 6, 30);
            const base = OffsetDate.of(date, OFFSET_PONE);
            const test = base.with(date);
            assertEquals(base, test);
        });

        it('test_with_adjustment_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.with(/*TemporalAdjuster*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // with(TemporalField, long)
    //-----------------------------------------------------------------------
    describe('with(TemporalField, long)', () => {
        it('test_with_TemporalField', () => {
            const test = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertEquals(OffsetDate.of(2009, 6, 30, OFFSET_PONE), test.with(ChronoField.YEAR, 2009));
            assertEquals(OffsetDate.of(2008, 7, 30, OFFSET_PONE), test.with(ChronoField.MONTH_OF_YEAR, 7));
            assertEquals(OffsetDate.of(2008, 6, 1, OFFSET_PONE), test.with(ChronoField.DAY_OF_MONTH, 1));
            assertEquals(OffsetDate.of(2008, 7, 1, OFFSET_PONE), test.with(ChronoField.DAY_OF_WEEK, 2));
            assertEquals(OffsetDate.of(2008, 7, 1, OFFSET_PONE), test.with(ChronoField.DAY_OF_YEAR, 183));

            assertEquals(OffsetDate.of(2008, 6, 30, ZoneOffset.ofHoursMinutesSeconds(2, 0, 5)), test.with(ChronoField.OFFSET_SECONDS, 7205));
        });

        it('test_with_TemporalField_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.with(/*TemporalField*/ null, 0));
        });

        it('test_with_TemporalField_invalidField', () => {
            assertThrows(DateTimeException, () => TEST_2007_07_15_PONE.with(ChronoField.AMPM_OF_DAY, 0));
        });
    });

    //-----------------------------------------------------------------------
    // withYear()
    //-----------------------------------------------------------------------
    describe('withYear()', () => {
        it('test_withYear_int_normal', () => {
            const t = TEST_2007_07_15_PONE.withYear(2008);
            assertEquals(OffsetDate.of(2008, 7, 15, OFFSET_PONE), t);
        });

        it('test_withYear_int_noChange', () => {
            const t = TEST_2007_07_15_PONE.withYear(2007);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_withYear_int_invalid', () => {
            assertThrows(DateTimeException, () => TEST_2007_07_15_PONE.withYear(Year.MIN_VALUE - 1));
        });

        it('test_withYear_int_adjustDay', () => {
            const t = OffsetDate.of(2008, 2, 29, OFFSET_PONE).withYear(2007);
            const expected = OffsetDate.of(2007, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });
    });

    //-----------------------------------------------------------------------
    // withMonth()
    //-----------------------------------------------------------------------
    describe('withMonth()', () => {
        it('test_withMonth_int_normal', () => {
            const t = TEST_2007_07_15_PONE.withMonth(1);
            assertEquals(OffsetDate.of(2007, 1, 15, OFFSET_PONE), t);
        });

        it('test_withMonth_int_noChange', () => {
            const t = TEST_2007_07_15_PONE.withMonth(7);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_withMonth_int_invalid', () => {
            assertThrows(DateTimeException, () => TEST_2007_07_15_PONE.withMonth(13));
        });

        it('test_withMonth_int_adjustDay', () => {
            const t = OffsetDate.of(2007, 12, 31, OFFSET_PONE).withMonth(11);
            const expected = OffsetDate.of(2007, 11, 30, OFFSET_PONE);
            assertEquals(expected, t);
        });
    });

    //-----------------------------------------------------------------------
    // withDayOfMonth()
    //-----------------------------------------------------------------------
    describe('withDayOfMonth()', () => {
        it('test_withDayOfMonth_normal', () => {
            const t = TEST_2007_07_15_PONE.withDayOfMonth(1);
            assertEquals(OffsetDate.of(2007, 7, 1, OFFSET_PONE), t);
        });

        it('test_withDayOfMonth_noChange', () => {
            const t = TEST_2007_07_15_PONE.withDayOfMonth(15);
            assertEquals(OffsetDate.of(2007, 7, 15, OFFSET_PONE), t);
        });

        it('test_withDayOfMonth_invalidForMonth', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 11, 30, OFFSET_PONE).withDayOfMonth(31));
        });

        it('test_withDayOfMonth_invalidAlways', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(2007, 11, 30, OFFSET_PONE).withDayOfMonth(32));
        });
    });

    //-----------------------------------------------------------------------
    // withDayOfYear(int)
    //-----------------------------------------------------------------------
    describe('withDayOfYear(int)', () => {
        it('test_withDayOfYear_normal', () => {
            const t = TEST_2007_07_15_PONE.withDayOfYear(33);
            assertEquals(OffsetDate.of(2007, 2, 2, OFFSET_PONE), t);
        });

        it('test_withDayOfYear_noChange', () => {
            const t = TEST_2007_07_15_PONE.withDayOfYear(31 + 28 + 31 + 30 + 31 + 30 + 15);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_withDayOfYear_illegal', () => {
            assertThrows(DateTimeException, () => TEST_2007_07_15_PONE.withDayOfYear(367));
        });

        it('test_withDayOfYear_invalid', () => {
            assertThrows(DateTimeException, () => TEST_2007_07_15_PONE.withDayOfYear(366));
        });
    });

    //-----------------------------------------------------------------------
    // plus(PlusAdjuster)
    //-----------------------------------------------------------------------
    describe('plus(PlusAdjuster)', () => {
        it('test_plus_PlusAdjuster', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_PONE.plus(period);
            assertEquals(OffsetDate.of(2008, 2, 15, OFFSET_PONE), t);
        });

        it('test_plus_PlusAdjuster_noChange', () => {
            const period = MockSimplePeriod.of(0, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_PONE.plus(period);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plus_PlusAdjuster_zero', () => {
            const t = TEST_2007_07_15_PONE.plus(Period.ZERO);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plus_PlusAdjuster_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.plus(/*TemporalAmount*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // plusYears()
    //-----------------------------------------------------------------------
    describe('plusYears()', () => {
        it('test_plusYears_long_normal', () => {
            const t = TEST_2007_07_15_PONE.plusYears(1);
            assertEquals(OffsetDate.of(2008, 7, 15, OFFSET_PONE), t);
        });

        it('test_plusYears_long_negative', () => {
            const t = TEST_2007_07_15_PONE.plusYears(-1);
            assertEquals(OffsetDate.of(2006, 7, 15, OFFSET_PONE), t);
        });

        it('test_plusYears_long_noChange', () => {
            const t = TEST_2007_07_15_PONE.plusYears(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusYears_long_adjustDay', () => {
            const t = OffsetDate.of(2008, 2, 29, OFFSET_PONE).plusYears(1);
            const expected = OffsetDate.of(2009, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusYears_long_big', () => {
            const years = 20 + Year.MAX_VALUE;
            const test = OffsetDate.of(-40, 6, 1, OFFSET_PONE).plusYears(years);
            assertEquals(OffsetDate.of(-40 + years, 6, 1, OFFSET_PONE), test);
        });

        it('test_plusYears_long_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 1, 1, OFFSET_PONE).plusYears(1));
        });

        it('test_plusYears_long_invalidTooLargeMaxAddMax', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.plusYears(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_plusYears_long_invalidTooLargeMaxAddMin', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.plusYears(MathUtil.MIN_SAFE_INTEGER));
        });

        it('test_plusYears_long_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).plusYears(-1));
        });
    });

    //-----------------------------------------------------------------------
    // plusMonths()
    //-----------------------------------------------------------------------
    describe('plusMonths()', () => {
        it('test_plusMonths_long_normal', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(1);
            assertEquals(OffsetDate.of(2007, 8, 15, OFFSET_PONE), t);
        });

        it('test_plusMonths_long_overYears', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(25);
            assertEquals(OffsetDate.of(2009, 8, 15, OFFSET_PONE), t);
        });

        it('test_plusMonths_long_negative', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(-1);
            assertEquals(OffsetDate.of(2007, 6, 15, OFFSET_PONE), t);
        });

        it('test_plusMonths_long_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(-7);
            assertEquals(OffsetDate.of(2006, 12, 15, OFFSET_PONE), t);
        });

        it('test_plusMonths_long_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(-31);
            assertEquals(OffsetDate.of(2004, 12, 15, OFFSET_PONE), t);
        });

        it('test_plusMonths_long_noChange', () => {
            const t = TEST_2007_07_15_PONE.plusMonths(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusMonths_long_adjustDayFromLeapYear', () => {
            const t = OffsetDate.of(2008, 2, 29, OFFSET_PONE).plusMonths(12);
            const expected = OffsetDate.of(2009, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusMonths_long_adjustDayFromMonthLength', () => {
            const t = OffsetDate.of(2007, 3, 31, OFFSET_PONE).plusMonths(1);
            const expected = OffsetDate.of(2007, 4, 30, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusMonths_long_big', () => {
            // Integer.MAX_VALUE would be too big as Year.MAX_VALUE equals 999_999 instead of 999_999_999
            const months = 20 + Year.MAX_VALUE * 12;
            const test = OffsetDate.of(-40, 6, 1, OFFSET_PONE).plusMonths(months);
            assertEquals(OffsetDate.of(LocalDate.of(-40, 6, 1).plusMonths(months), OFFSET_PONE), test);
        });

        it('test_plusMonths_long_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE).plusMonths(1));
        });

        it('test_plusMonths_long_invalidTooLargeMaxAddMax', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.plusMonths(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_plusMonths_long_invalidTooLargeMaxAddMin', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.plusMonths(MathUtil.MIN_SAFE_INTEGER));
        });

        it('test_plusMonths_long_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).plusMonths(-1));
        });
    });

    //-----------------------------------------------------------------------
    // plusWeeks()
    //-----------------------------------------------------------------------
    describe('plusWeeks()', () => {
        it('test_plusWeeks_symmetry', () => {
            for (const [reference] of data_samplePlusWeeksSymmetry) {
                for (let weeks = 0; weeks < 53 * 8; weeks++) {
                    let t = reference.plusWeeks(weeks).plusWeeks(-weeks);
                    assertEquals(reference, t);

                    t = reference.plusWeeks(-weeks).plusWeeks(weeks);
                    assertEquals(reference, t);
                }
            }
        });

        it('test_plusWeeks_normal', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(1);
            assertEquals(OffsetDate.of(2007, 7, 22, OFFSET_PONE), t);
        });

        it('test_plusWeeks_overMonths', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(9);
            assertEquals(OffsetDate.of(2007, 9, 16, OFFSET_PONE), t);
        });

        it('test_plusWeeks_overYears', () => {
            const t = OffsetDate.of(2006, 7, 16, OFFSET_PONE).plusWeeks(52);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15_PONE.plusYears(-1).plusWeeks(104);
            assertEquals(OffsetDate.of(2008, 7, 12, OFFSET_PONE), t);
        });

        it('test_plusWeeks_negative', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(-1);
            assertEquals(OffsetDate.of(2007, 7, 8, OFFSET_PONE), t);
        });

        it('test_plusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(-28);
            assertEquals(OffsetDate.of(2006, 12, 31, OFFSET_PONE), t);
        });

        it('test_plusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(-104);
            assertEquals(OffsetDate.of(2005, 7, 17, OFFSET_PONE), t);
        });

        it('test_plusWeeks_noChange', () => {
            const t = TEST_2007_07_15_PONE.plusWeeks(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusWeeks_maximum', () => {
            const t = OffsetDate.of(Year.MAX_VALUE, 12, 24, OFFSET_PONE).plusWeeks(1);
            const expected = OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusWeeks_minimum', () => {
            const t = OffsetDate.of(Year.MIN_VALUE, 1, 8, OFFSET_PONE).plusWeeks(-1);
            const expected = OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusWeeks_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).plusWeeks(1));
        });

        it('test_plusWeeks_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 7, OFFSET_PONE).plusWeeks(-1));
        });

        it('test_plusWeeks_invalidMaxMinusMax', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).plusWeeks(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_plusWeeks_invalidMaxMinusMin', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).plusWeeks(MathUtil.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // plusDays()
    //-----------------------------------------------------------------------
    describe('plusDays()', () => {
        it('test_plusDays_symmetry', () => {
            for (const [reference] of data_samplePlusDaysSymmetry) {
                for (let days = 0; days < 365 * 4; days++) {
                    let t = reference.plusDays(days).plusDays(-days);
                    assertEquals(reference, t);

                    t = reference.plusDays(-days).plusDays(days);
                    assertEquals(reference, t);
                }
            }
        });

        it('test_plusDays_normal', () => {
            const t = TEST_2007_07_15_PONE.plusDays(1);
            assertEquals(OffsetDate.of(2007, 7, 16, OFFSET_PONE), t);
        });

        it('test_plusDays_overMonths', () => {
            const t = TEST_2007_07_15_PONE.plusDays(62);
            assertEquals(OffsetDate.of(2007, 9, 15, OFFSET_PONE), t);
        });

        it('test_plusDays_overYears', () => {
            const t = OffsetDate.of(2006, 7, 14, OFFSET_PONE).plusDays(366);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusDays_overLeapYears', () => {
            const t = TEST_2007_07_15_PONE.plusYears(-1).plusDays(365 + 366);
            assertEquals(OffsetDate.of(2008, 7, 15, OFFSET_PONE), t);
        });

        it('test_plusDays_negative', () => {
            const t = TEST_2007_07_15_PONE.plusDays(-1);
            assertEquals(OffsetDate.of(2007, 7, 14, OFFSET_PONE), t);
        });

        it('test_plusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.plusDays(-196);
            assertEquals(OffsetDate.of(2006, 12, 31, OFFSET_PONE), t);
        });

        it('test_plusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.plusDays(-730);
            assertEquals(OffsetDate.of(2005, 7, 15, OFFSET_PONE), t);
        });

        it('test_plusDays_noChange', () => {
            const t = TEST_2007_07_15_PONE.plusDays(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plusDays_maximum', () => {
            const t = OffsetDate.of(Year.MAX_VALUE, 12, 30, OFFSET_PONE).plusDays(1);
            const expected = OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusDays_minimum', () => {
            const t = OffsetDate.of(Year.MIN_VALUE, 1, 2, OFFSET_PONE).plusDays(-1);
            const expected = OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_plusDays_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE).plusDays(1));
        });

        it('test_plusDays_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).plusDays(-1));
        });

        it('test_plusDays_overflowTooLarge', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE).plusDays(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_plusDays_overflowTooSmall', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).plusDays(MathUtil.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // minus(MinusAdjuster)
    //-----------------------------------------------------------------------
    describe('minus(MinusAdjuster)', () => {
        it('test_minus_MinusAdjuster', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_PONE.minus(period);
            assertEquals(OffsetDate.of(2006, 12, 15, OFFSET_PONE), t);
        });

        it('test_minus_MinusAdjuster_noChange', () => {
            const period = MockSimplePeriod.of(0, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_PONE.minus(period);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minus_MinusAdjuster_zero', () => {
            const t = TEST_2007_07_15_PONE.minus(Period.ZERO);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_plus_MinusAdjuster_null', () => {
            assertThrows(NullPointerException, () => TEST_2007_07_15_PONE.minus(/*TemporalAmount*/ null));
        });
    });


    //-----------------------------------------------------------------------
    // minusYears()
    //-----------------------------------------------------------------------
    describe('minusYears()', () => {
        it('test_minusYears_long_normal', () => {
            const t = TEST_2007_07_15_PONE.minusYears(1);
            assertEquals(OffsetDate.of(2006, 7, 15, OFFSET_PONE), t);
        });

        it('test_minusYears_long_negative', () => {
            const t = TEST_2007_07_15_PONE.minusYears(-1);
            assertEquals(OffsetDate.of(2008, 7, 15, OFFSET_PONE), t);
        });

        it('test_minusYears_long_noChange', () => {
            const t = TEST_2007_07_15_PONE.minusYears(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusYears_long_adjustDay', () => {
            const t = OffsetDate.of(2008, 2, 29, OFFSET_PONE).minusYears(1);
            const expected = OffsetDate.of(2007, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusYears_long_big', () => {
            const years = 20 + Year.MAX_VALUE;
            const test = OffsetDate.of(40, 6, 1, OFFSET_PONE).minusYears(years);
            assertEquals(OffsetDate.of(40 - years, 6, 1, OFFSET_PONE), test);
        });

        it('test_minusYears_long_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 1, 1, OFFSET_PONE).minusYears(-1));
        });

        it('test_minusYears_long_invalidTooLargeMaxAddMax', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.minusYears(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_minusYears_long_invalidTooLargeMaxAddMin', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.minusYears(MathUtil.MIN_SAFE_INTEGER));
        });

        it('test_minusYears_long_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).minusYears(1));
        });
    });

    //-----------------------------------------------------------------------
    // minusMonths()
    //-----------------------------------------------------------------------
    describe('minusMonths()', () => {
        it('test_minusMonths_long_normal', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(1);
            assertEquals(OffsetDate.of(2007, 6, 15, OFFSET_PONE), t);
        });

        it('test_minusMonths_long_overYears', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(25);
            assertEquals(OffsetDate.of(2005, 6, 15, OFFSET_PONE), t);
        });

        it('test_minusMonths_long_negative', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(-1);
            assertEquals(OffsetDate.of(2007, 8, 15, OFFSET_PONE), t);
        });

        it('test_minusMonths_long_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(-7);
            assertEquals(OffsetDate.of(2008, 2, 15, OFFSET_PONE), t);
        });

        it('test_minusMonths_long_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(-31);
            assertEquals(OffsetDate.of(2010, 2, 15, OFFSET_PONE), t);
        });

        it('test_minusMonths_long_noChange', () => {
            const t = TEST_2007_07_15_PONE.minusMonths(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusMonths_long_adjustDayFromLeapYear', () => {
            const t = OffsetDate.of(2008, 2, 29, OFFSET_PONE).minusMonths(12);
            const expected = OffsetDate.of(2007, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusMonths_long_adjustDayFromMonthLength', () => {
            const t = OffsetDate.of(2007, 3, 31, OFFSET_PONE).minusMonths(1);
            const expected = OffsetDate.of(2007, 2, 28, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusMonths_long_big', () => {
            const months = 20 + Year.MAX_VALUE;
            const test = OffsetDate.of(40, 6, 1, OFFSET_PONE).minusMonths(months);
            assertEquals(OffsetDate.of(LocalDate.of(40, 6, 1).minusMonths(months), OFFSET_PONE), test);
        });

        it('test_minusMonths_long_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE).minusMonths(-1));
        });

        it('test_minusMonths_long_invalidTooLargeMaxAddMax', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.minusMonths(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_minusMonths_long_invalidTooLargeMaxAddMin', () => {
            const test = OffsetDate.of(Year.MAX_VALUE, 12, 1, OFFSET_PONE);
            assertThrows(DateTimeException, () => test.minusMonths(MathUtil.MIN_SAFE_INTEGER));
        });

        it('test_minusMonths_long_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).minusMonths(1));
        });
    });


    //-----------------------------------------------------------------------
    // minusWeeks()
    //-----------------------------------------------------------------------
    describe('minusWeeks()', () => {
        it('data_sampleMinusWeeksSymmetry', () => {
            for (const [reference] of data_sampleMinusWeeksSymmetry) {
                for (let weeks = 0; weeks < 53 * 8; weeks++) {
                    let t = reference.minusWeeks(weeks).minusWeeks(-weeks);
                    assertEquals(reference, t);

                    t = reference.minusWeeks(-weeks).minusWeeks(weeks);
                    assertEquals(reference, t);
                }
            }
        });

        it('test_minusWeeks_normal', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(1);
            assertEquals(OffsetDate.of(2007, 7, 8, OFFSET_PONE), t);
        });

        it('test_minusWeeks_overMonths', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(9);
            assertEquals(OffsetDate.of(2007, 5, 13, OFFSET_PONE), t);
        });

        it('test_minusWeeks_overYears', () => {
            const t = OffsetDate.of(2008, 7, 13, OFFSET_PONE).minusWeeks(52);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15_PONE.minusYears(-1).minusWeeks(104);
            assertEquals(OffsetDate.of(2006, 7, 18, OFFSET_PONE), t);
        });

        it('test_minusWeeks_negative', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(-1);
            assertEquals(OffsetDate.of(2007, 7, 22, OFFSET_PONE), t);
        });

        it('test_minusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(-28);
            assertEquals(OffsetDate.of(2008, 1, 27, OFFSET_PONE), t);
        });

        it('test_minusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(-104);
            assertEquals(OffsetDate.of(2009, 7, 12, OFFSET_PONE), t);
        });

        it('test_minusWeeks_noChange', () => {
            const t = TEST_2007_07_15_PONE.minusWeeks(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusWeeks_maximum', () => {
            const t = OffsetDate.of(Year.MAX_VALUE, 12, 24, OFFSET_PONE).minusWeeks(-1);
            const expected = OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusWeeks_minimum', () => {
            const t = OffsetDate.of(Year.MIN_VALUE, 1, 8, OFFSET_PONE).minusWeeks(1);
            const expected = OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusWeeks_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).minusWeeks(-1));
        });

        it('test_minusWeeks_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 7, OFFSET_PONE).minusWeeks(1));
        });

        it('test_minusWeeks_invalidMaxMinusMax', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).minusWeeks(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_minusWeeks_invalidMaxMinusMin', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 25, OFFSET_PONE).minusWeeks(MathUtil.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // minusDays()
    //-----------------------------------------------------------------------
    describe('minusDays()', () => {
        it('test_minusDays_symmetry', () => {
            for (const [reference] of data_sampleMinusDaysSymmetry) {
                for (let days = 0; days < 365 * 4; days++) {
                    let t = reference.minusDays(days).minusDays(-days);
                    assertEquals(reference, t);

                    t = reference.minusDays(-days).minusDays(days);
                    assertEquals(reference, t);
                }
            }
        });

        it('test_minusDays_normal', () => {
            const t = TEST_2007_07_15_PONE.minusDays(1);
            assertEquals(OffsetDate.of(2007, 7, 14, OFFSET_PONE), t);
        });

        it('test_minusDays_overMonths', () => {
            const t = TEST_2007_07_15_PONE.minusDays(62);
            assertEquals(OffsetDate.of(2007, 5, 14, OFFSET_PONE), t);
        });

        it('test_minusDays_overYears', () => {
            const t = OffsetDate.of(2008, 7, 16, OFFSET_PONE).minusDays(367);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusDays_overLeapYears', () => {
            const t = TEST_2007_07_15_PONE.plusYears(2).minusDays(365 + 366);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusDays_negative', () => {
            const t = TEST_2007_07_15_PONE.minusDays(-1);
            assertEquals(OffsetDate.of(2007, 7, 16, OFFSET_PONE), t);
        });

        it('test_minusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_PONE.minusDays(-169);
            assertEquals(OffsetDate.of(2007, 12, 31, OFFSET_PONE), t);
        });

        it('test_minusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15_PONE.minusDays(-731);
            assertEquals(OffsetDate.of(2009, 7, 15, OFFSET_PONE), t);
        });

        it('test_minusDays_noChange', () => {
            const t = TEST_2007_07_15_PONE.minusDays(0);
            assertEquals(TEST_2007_07_15_PONE, t);
        });

        it('test_minusDays_maximum', () => {
            const t = OffsetDate.of(Year.MAX_VALUE, 12, 30, OFFSET_PONE).minusDays(-1);
            const expected = OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusDays_minimum', () => {
            const t = OffsetDate.of(Year.MIN_VALUE, 1, 2, OFFSET_PONE).minusDays(1);
            const expected = OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE);
            assertEquals(expected, t);
        });

        it('test_minusDays_invalidTooLarge', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE).minusDays(-1));
        });

        it('test_minusDays_invalidTooSmall', () => {
            assertThrows(DateTimeException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).minusDays(1));
        });

        it('test_minusDays_overflowTooLarge', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MAX_VALUE, 12, 31, OFFSET_PONE).minusDays(MathUtil.MIN_SAFE_INTEGER));
        });

        it('test_minusDays_overflowTooSmall', () => {
            assertThrows(ArithmeticException, () => OffsetDate.of(Year.MIN_VALUE, 1, 1, OFFSET_PONE).minusDays(MathUtil.MAX_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // format(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('format(DateTimeFormatter)', () => {
        it('(test_format_formatter', () => {
            const f = DateTimeFormatter.ofPattern('y M d');
            const t = OffsetDate.of(2010, 12, 3, OFFSET_PONE).format(f);
            assertEquals('2010 12 3', t);
        });

        it('(test_format_formatter_null', () => {
            assertThrows(NullPointerException, () => OffsetDate.of(2010, 12, 3, OFFSET_PONE).format(null));
        });
    });

    //-----------------------------------------------------------------------
    // atTime()
    //-----------------------------------------------------------------------
    describe('atTime()', () => {
        it('(test_atTime_Local', () => {
            const t = OffsetDate.of(2008, 6, 30, OFFSET_PTWO);
            assertEquals(OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PTWO),
                t.atTime(LocalTime.of(11, 30)));
        });

        it('(test_atTime_Local_nullLocalTime', () => {
            const t = OffsetDate.of(2008, 6, 30, OFFSET_PTWO);
            assertThrows(NullPointerException, () => t.atTime(/*LocalTime*/ null));
        });
    });

    //-----------------------------------------------------------------------
    // toLocalDate()
    //-----------------------------------------------------------------------
    describe('toLocalDate()', () => {
        it('(test_toEpochSecond', () => {
            for (const [year, month, day, offset] of data_sampleDates) {
                const t = LocalDate.of(year, month, day);
                assertEquals(t, OffsetDate.of(year, month, day, offset).toLocalDate());
            }
        });
    });

    //-----------------------------------------------------------------------
    // toEpochSecond(LocalTime)
    //-----------------------------------------------------------------------
    describe('toEpochSecond(LocalTime)', () => {
        it('(test_toEpochSecond', () => {
            const od = OffsetDate.of(1970, 1, 1, ZoneOffset.UTC);
            assertEquals(0, od.toEpochSecond(LocalTime.MIDNIGHT));
            assertEquals(12 * 60 * 60, od.toEpochSecond(LocalTime.MIDNIGHT.plusSeconds(12 * 60 * 60)));
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('(test_compareTo_date', () => {
            const a = OffsetDate.of(2008, 6, 29, OFFSET_PONE);
            const b = OffsetDate.of(2008, 6, 30, OFFSET_PONE);  // a is before b due to date
            assertTrue(a.compareTo(b) < 0);
            assertTrue(b.compareTo(a) > 0);
            assertTrue(a.compareTo(a) === 0);
            assertTrue(b.compareTo(b) === 0);
            assertTrue(a.atTime(LocalTime.MIDNIGHT).toInstant().compareTo(b.atTime(LocalTime.MIDNIGHT).toInstant()) < 0);
        });

        it('(test_compareTo_offset', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PTWO);
            const b = OffsetDate.of(2008, 6, 30, OFFSET_PONE);  // a is before b due to offset
            assertTrue(a.compareTo(b) < 0);
            assertTrue(b.compareTo(a) > 0);
            assertTrue(a.compareTo(a) === 0);
            assertTrue(b.compareTo(b) === 0);
            assertTrue(a.atTime(LocalTime.MIDNIGHT).toInstant().compareTo(b.atTime(LocalTime.MIDNIGHT).toInstant()) < 0);
        });

        it('(test_compareTo_both', () => {
            const a = OffsetDate.of(2008, 6, 29, OFFSET_PTWO);
            const b = OffsetDate.of(2008, 6, 30, OFFSET_PONE);  // a is before b on instant scale
            assertTrue(a.compareTo(b) < 0);
            assertTrue(b.compareTo(a) > 0);
            assertTrue(a.compareTo(a) === 0);
            assertTrue(b.compareTo(b) === 0);
            assertTrue(a.atTime(LocalTime.MIDNIGHT).toInstant().compareTo(b.atTime(LocalTime.MIDNIGHT).toInstant()) < 0);
        });

        it('(test_compareTo_24hourDifference', () => {
            const a = OffsetDate.of(2008, 6, 29, ZoneOffset.ofHours(-12));
            const b = OffsetDate.of(2008, 6, 30, ZoneOffset.ofHours(12));  // a is before b despite being same time-line time
            assertTrue(a.compareTo(b) < 0);
            assertTrue(b.compareTo(a) > 0);
            assertTrue(a.compareTo(a) === 0);
            assertTrue(b.compareTo(b) === 0);
            assertTrue(a.atTime(LocalTime.MIDNIGHT).toInstant().compareTo(b.atTime(LocalTime.MIDNIGHT).toInstant()) === 0);
        });

        it('(test_compareTo_null', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertThrows(NullPointerException, () => a.compareTo(null));
        });

        it('(compareToNonOffsetDate', () => {
            const c = TEST_2007_07_15_PONE;
            assertThrows(IllegalArgumentException, () => c.compareTo(new Object()));
        });
    });

    //-----------------------------------------------------------------------
    // isAfter() / isBefore() / isEqual()
    //-----------------------------------------------------------------------
    describe('isAfter() / isBefore() / isEqual()', () => {
        it('(test_isBeforeIsAfterIsEqual1', () => {
            const a = OffsetDate.of(2008, 6, 29, OFFSET_PONE);
            const b = OffsetDate.of(2008, 6, 30, OFFSET_PONE);  // a is before b due to time
            assertTrue(a.isBefore(b));
            assertFalse(a.isEqual(b));
            assertFalse(a.isAfter(b));

            assertFalse(b.isBefore(a));
            assertFalse(b.isEqual(a));
            assertTrue(b.isAfter(a));

            assertFalse(a.isBefore(a));
            assertFalse(b.isBefore(b));

            assertTrue(a.isEqual(a));
            assertTrue(b.isEqual(b));

            assertFalse(a.isAfter(a));
            assertFalse(b.isAfter(b));
        });

        it('(test_isBeforeIsAfterIsEqual2', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PTWO);
            const b = OffsetDate.of(2008, 6, 30, OFFSET_PONE);  // a is before b due to offset
            assertTrue(a.isBefore(b));
            assertFalse(a.isEqual(b));
            assertFalse(a.isAfter(b));

            assertFalse(b.isBefore(a));
            assertFalse(b.isEqual(a));
            assertTrue(b.isAfter(a));

            assertFalse(a.isBefore(a));
            assertFalse(b.isBefore(b));

            assertTrue(a.isEqual(a));
            assertTrue(b.isEqual(b));

            assertFalse(a.isAfter(a));
            assertFalse(b.isAfter(b));
        });

        it('(test_isBeforeIsAfterIsEqual_instantComparison', () => {
            const a = OffsetDate.of(2008, 6, 30, ZoneOffset.ofHours(12));
            const b = OffsetDate.of(2008, 6, 29, ZoneOffset.ofHours(-12));  // a is same instant as b
            assertFalse(a.isBefore(b));
            assertTrue(a.isEqual(b));
            assertFalse(a.isAfter(b));

            assertFalse(b.isBefore(a));
            assertTrue(b.isEqual(a));
            assertFalse(b.isAfter(a));

            assertFalse(a.isBefore(a));
            assertFalse(b.isBefore(b));

            assertTrue(a.isEqual(a));
            assertTrue(b.isEqual(b));

            assertFalse(a.isAfter(a));
            assertFalse(b.isAfter(b));
        });

        it('(test_isBefore_null', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertThrows(NullPointerException, () => a.isBefore(null));
        });

        it('(test_isAfter_null', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertThrows(NullPointerException, () => a.isAfter(null));
        });

        it('(test_isEqual_null', () => {
            const a = OffsetDate.of(2008, 6, 30, OFFSET_PONE);
            assertThrows(NullPointerException, () => a.isEqual(null));
        });
    });

    //-----------------------------------------------------------------------
    // equals() / hashCode()
    //-----------------------------------------------------------------------
    describe('equals() / hashCode()', () => {
        it('test_equals_true', () => {
            for (const [y, m, d, offset] of data_sampleDates) {
                const a = OffsetDate.of(y, m, d, offset);
                const b = OffsetDate.of(y, m, d, offset);
                assertTrue(a.equals(b));
                assertTrue(a.hashCode() === b.hashCode());
            }
        });

        it('test_equals_false_year_differs', () => {
            for (const [y, m, d, offset] of data_sampleDates) {
                const a = OffsetDate.of(y, m, d, offset);
                const b = OffsetDate.of(y + 1, m, d, offset);
                assertFalse(a.equals(b));
            }
        });

        it('test_equals_false_month_differs', () => {
            for (const [y, m, d, offset] of data_sampleDates) {
                const a = OffsetDate.of(y, m, d, offset);
                const b = OffsetDate.of(y, m + 1, d, offset);
                assertFalse(a.equals(b));
            }
        });

        it('test_equals_false_day_differs', () => {
            for (const [y, m, d, offset] of data_sampleDates) {
                const a = OffsetDate.of(y, m, d, offset);
                const b = OffsetDate.of(y, m, d + 1, offset);
                assertFalse(a.equals(b));
            }
        });

        it('test_equals_false_offset_differs', () => {
            for (const [y, m, d] of data_sampleDates) {
                const a = OffsetDate.of(y, m, d, OFFSET_PONE);
                const b = OffsetDate.of(y, m, d, OFFSET_PTWO);
                assertFalse(a.equals(b));
            }
        });

        it('(test_equals_itself_true', () => {
            assertTrue(TEST_2007_07_15_PONE.equals(TEST_2007_07_15_PONE));
        });

        it('(test_equals_string_false', () => {
            assertFalse(TEST_2007_07_15_PONE.equals('2007-07-15'));
        });
    });

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            for (const [y, m, d, offsetId, expected] of data_sampleToString) {
                const t = OffsetDate.of(y, m, d, ZoneOffset.of(offsetId));
                const str = t.toString();
                assertEquals(expected, str);
            }
        });
    });

    //-----------------------------------------------------------------------
    // AbstractDateTimeTest.isSupported(TemporalField)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalField)', () => {
        it('basicTest_isSupported_TemporalField_supported', () => {
            for (const sample of samples) {
                for (const field of validFields) {
                    assertTrue(sample.isSupported(field), `Failed on ${sample} ${field}`);
                }
            }
        });

        it('basicTest_isSupported_TemporalField_unsupported', () => {
            for (const sample of samples) {
                for (const field of invalidFields) {
                    assertFalse(sample.isSupported(field), `Failed on ${sample} ${field}`);
                }
            }
        });

        it('basicTest_isSupported_TemporalField_null', () => {
            for (const sample of samples) {
                assertFalse(sample.isSupported(null), `Failed on ${sample}`);
            }
        });
    });

    //-----------------------------------------------------------------------
    // AbstractDateTimeTest.range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range(TemporalField)', () => {
        it('basicTest_range_TemporalField_supported', () => {
            for (const sample of samples) {
                for (const field of validFields) {
                    sample.range(field);  // no exception
                }
            }
        });

        it('basicTest_range_TemporalField_unsupported', () => {
            for (const sample of samples) {
                for (const field of invalidFields) {
                    assertThrows(DateTimeException, () => sample.range(field), `Failed on ${sample} ${field}`);
                }
            }
        });

        it('basicTest_range_TemporalField_null', () => {
            for (const sample of samples) {
                assertThrows(NullPointerException, () => sample.range(null), `Failed on ${sample}`);
            }
        });
    });

    //-----------------------------------------------------------------------
    // AbstractDateTimeTest.get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get(TemporalField)', () => {
        it('basicTest_get_TemporalField_supported', () => {
            for (const sample of samples) {
                for (const field of validFields) {
                    if (sample.range(field).isIntValue()) {
                        sample.get(field);  // no exception
                    } else {
                        assertThrows(DateTimeException, () => sample.get(field), `Failed on ${sample} ${field}`);
                    }
                }
            }
        });

        it('basicTest_get_TemporalField_unsupported', () => {
            for (const sample of samples) {
                for (const field of invalidFields) {
                    assertThrows(DateTimeException, () => sample.get(field), `Failed on ${sample} ${field}`);
                }
            }
        });

        it('basicTest_get_TemporalField_null', () => {
            for (const sample of samples) {
                assertThrows(NullPointerException, () => sample.get(null), `Failed on ${sample}`);
            }
        });
    });

    //-----------------------------------------------------------------------
    // AbstractDateTimeTest.getLong(TemporalField)
    //-----------------------------------------------------------------------
    describe('getLong(TemporalField)', () => {
        it('basicTest_getLong_TemporalField_supported', () => {
            for (const sample of samples) {
                for (const field of validFields) {
                    sample.getLong(field);  // no exception
                }
            }
        });

        it('basicTest_getLong_TemporalField_unsupported', () => {
            for (const sample of samples) {
                for (const field of invalidFields) {
                    assertThrows(DateTimeException, () => sample.getLong(field), `Failed on ${sample} ${field}`);
                }
            }
        });

        it('basicTest_getLong_TemporalField_null', () => {
            for (const sample of samples) {
                assertThrows(NullPointerException, () => sample.getLong(null), `Failed on ${sample}`);
            }
        });

        //-----------------------------------------------------------------------
        it('basicTest_query', () => {
            for (const sample of samples) {
                // eslint-disable-next-line no-unused-vars
                assertEquals('foo', sample.query(createTemporalQuery('custom', dateTime => 'foo')));
            }
        });
    });
});

function createTemporalAdjuster(adjustIntoFunction) {
    class ExtendedTemporalAdjuster extends TemporalAdjuster {
    }

    ExtendedTemporalAdjuster.prototype.adjustInto = adjustIntoFunction;
    return new ExtendedTemporalAdjuster();
}

// copied from packages/core/src/temporal/TemporalQuery.js
function createTemporalQuery(name, queryFromFunction) {
    class ExtendedTemporalQuery extends TemporalQuery {
    }

    ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
    return new ExtendedTemporalQuery(name);
}
