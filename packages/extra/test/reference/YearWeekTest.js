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
    DateTimeFormatterBuilder,
    DateTimeParseException,
    DayOfWeek,
    IsoChronology,
    IsoFields,
    LocalDate,
    LocalDateTime,
    LocalTime,
    NullPointerException,
    TemporalAdjusters,
    TemporalQueries,
    UnsupportedTemporalTypeException,
    ValueRange,
    Year,
    ZoneId,
    ZoneOffset,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertThrows, assertTrue } from '../testUtils';

import { YearWeek } from '../../src/YearWeek';

describe('org.threeten.extra.TestYearWeek', () => {
    const TEST_NON_LEAP = YearWeek.of(2014, 1);
    const TEST = YearWeek.of(2015, 1);

    const data_sampleYearWeeks = [
        [2015, 1],
        [2015, 2],
        [2015, 3],
        [2015, 4],
        [2015, 5],
        [2015, 6],
        [2015, 7],
        [2015, 8],
        [2015, 9],
        [2015, 10],
        [2015, 11],
        [2015, 12],
        [2015, 13],
        [2015, 14],
        [2015, 15],
        [2015, 16],
        [2015, 17],
        [2015, 18],
        [2015, 19],
        [2015, 20],
        [2015, 21],
        [2015, 22],
        [2015, 21],
        [2015, 22],
        [2015, 23],
        [2015, 23],
        [2015, 24],
        [2015, 25],
        [2015, 26],
        [2015, 27],
        [2015, 28],
        [2015, 29],
        [2015, 30],
        [2015, 31],
        [2015, 32],
        [2015, 33],
        [2015, 34],
        [2015, 35],
        [2015, 36],
        [2015, 37],
        [2015, 38],
        [2015, 39],
        [2015, 40],
        [2015, 41],
        [2015, 42],
        [2015, 43],
        [2015, 44],
        [2015, 45],
        [2015, 46],
        [2015, 47],
        [2015, 48],
        [2015, 49],
        [2015, 50],
        [2015, 51],
        [2015, 52],
        [2015, 53]
    ];

    const data_53WeekYear = [
        [4],
        [9],
        [15],
        [20],
        [26],
        [32],
        [37],
        [43],
        [48],
        [54],
        [60],
        [65],
        [71],
        [76],
        [82],
        [88],
        [93],
        [99],
        [105],
        [111],
        [116],
        [122],
        [128],
        [133],
        [139],
        [144],
        [150],
        [156],
        [161],
        [167],
        [172],
        [178],
        [184],
        [189],
        [195],
        [201],
        [207],
        [212],
        [218],
        [224],
        [229],
        [235],
        [240],
        [246],
        [252],
        [257],
        [263],
        [268],
        [274],
        [280],
        [285],
        [291],
        [296],
        [303],
        [308],
        [314],
        [320],
        [325],
        [331],
        [336],
        [342],
        [348],
        [353],
        [359],
        [364],
        [370],
        [376],
        [381],
        [387],
        [392],
        [398]
    ];

    const data_sampleAtDay = [
        [2014, 52, DayOfWeek.MONDAY,    2014, 12, 22],
        [2014, 52, DayOfWeek.TUESDAY,   2014, 12, 23],
        [2014, 52, DayOfWeek.WEDNESDAY, 2014, 12, 24],
        [2014, 52, DayOfWeek.THURSDAY,  2014, 12, 25],
        [2014, 52, DayOfWeek.FRIDAY,    2014, 12, 26],
        [2014, 52, DayOfWeek.SATURDAY,  2014, 12, 27],
        [2014, 52, DayOfWeek.SUNDAY,    2014, 12, 28],
        [2015,  1, DayOfWeek.MONDAY,    2014, 12, 29],
        [2015,  1, DayOfWeek.TUESDAY,   2014, 12, 30],
        [2015,  1, DayOfWeek.WEDNESDAY, 2014, 12, 31],
        [2015,  1, DayOfWeek.THURSDAY,  2015,  1,  1],
        [2015,  1, DayOfWeek.FRIDAY,    2015,  1,  2],
        [2015,  1, DayOfWeek.SATURDAY,  2015,  1,  3],
        [2015,  1, DayOfWeek.SUNDAY,    2015,  1,  4],
        [2015, 53, DayOfWeek.FRIDAY,    2016,  1,  1],
        [2015, 53, DayOfWeek.SATURDAY,  2016,  1,  2],
        [2015, 53, DayOfWeek.SUNDAY,    2016,  1,  3],
        [2016,  1, DayOfWeek.MONDAY,    2016,  1,  4],
        [2016, 52, DayOfWeek.SUNDAY,    2017,  1,  1],
        [2017,  1, DayOfWeek.MONDAY,    2017,  1,  2],
        [2017,  1, DayOfWeek.TUESDAY,   2017,  1,  3],
        [2017,  1, DayOfWeek.WEDNESDAY, 2017,  1,  4],
        [2017,  1, DayOfWeek.THURSDAY,  2017,  1,  5],
        [2017,  1, DayOfWeek.FRIDAY,    2017,  1,  6],
        [2017,  1, DayOfWeek.SATURDAY,  2017,  1,  7],
        [2017,  1, DayOfWeek.SUNDAY,    2017,  1,  8],
        [2025,  1, DayOfWeek.MONDAY,    2024, 12, 30],
    ];

    const data_outOfBounds = [
        [IsoFields.WEEK_OF_WEEK_BASED_YEAR, 54],
        [IsoFields.WEEK_OF_WEEK_BASED_YEAR, 0],
        [IsoFields.WEEK_BASED_YEAR, 1000000000],
        [IsoFields.WEEK_BASED_YEAR, -1000000000],
    ];

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', function(/*this*/) {
        this.retries(1);
        it('test_now', () => {
            const expected = YearWeek.now(Clock.systemDefaultZone());
            const actual = YearWeek.now();
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', function(/*this*/) {
        this.retries(1);
        it('now_ZoneId', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            const expected = YearWeek.now(Clock.system(zone));
            const actual = YearWeek.now(zone);
            assertEquals(expected, actual);
        });
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(Clock)', () => {
        it('now_Clock', () => {
            const instant = LocalDateTime.of(2010, 12, 31, 0, 0).toInstant(ZoneOffset.UTC);
            const clock = Clock.fixed(instant, ZoneOffset.UTC);
            const test = YearWeek.now(clock);
            assertEquals(2010, test.year());
            assertEquals(52, test.week());
        });
    });

    //-----------------------------------------------------------------------
    // now(null)
    //-----------------------------------------------------------------------
    describe('now(null)', () => {
        it('throws NPE', () => {
            assertThrows(NullPointerException, () => YearWeek.now(null));
        });
    });

    //-----------------------------------------------------------------------
    // of(Year, int)
    //-----------------------------------------------------------------------
    describe('of(Year, int)', () => {
        it('test_of_int', () => {
            for (const [year, week] of data_sampleYearWeeks) {
                const yearWeek = YearWeek.of(Year.of(year), week);
                assertEquals(year, yearWeek.year());
                assertEquals(week, yearWeek.week());
            }
        });

        it('test_carry_Year_int', () => {
            assertTrue(YearWeek.of(Year.of(2014), 53).equals(TEST));
        });
    });


    //-----------------------------------------------------------------------
    // of(int, int)
    //-----------------------------------------------------------------------
    describe('of(int, int)', () => {
        it('test_of', () => {
            for (const [year, week] of data_sampleYearWeeks) {
                const yearWeek = YearWeek.of(year, week);
                assertEquals(year, yearWeek.year());
                assertEquals(week, yearWeek.week());
            }
        });

        it('test_of', () => {
            assertTrue(YearWeek.of(2014, 53).equals(TEST));
        });

        it('test_of_year_tooLow', () => {
            assertThrows(DateTimeException, () => YearWeek.of(Number.MIN_SAFE_INTEGER, 1));
        });

        it('test_of_year_tooHigh', () => {
            assertThrows(DateTimeException, () => YearWeek.of(Number.MAX_SAFE_INTEGER, 1));
        });

        it('test_of_invalidWeekValue', () => {
            assertThrows(DateTimeException, () => YearWeek.of(2015, 54));
        });

        it('test_of_invalidWeekValueZero', () => {
            assertThrows(DateTimeException, () => YearWeek.of(2015, 0));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalField)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalField)', () => {
        it('test_isSupported_TemporalField', () => {
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
            assertEquals(false, TEST.isSupported(IsoFields.QUARTER_OF_YEAR));
            assertEquals(false, TEST.isSupported(IsoFields.DAY_OF_QUARTER));
            assertEquals(true, TEST.isSupported(IsoFields.WEEK_BASED_YEAR));
            assertEquals(true, TEST.isSupported(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalUnit)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalUnit)', () => {
        it('test_isSupported_TemporalUnit', () => {
            assertEquals(false, TEST.isSupported(null));
            assertEquals(false, TEST.isSupported(ChronoUnit.NANOS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MICROS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MILLIS));
            assertEquals(false, TEST.isSupported(ChronoUnit.SECONDS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MINUTES));
            assertEquals(false, TEST.isSupported(ChronoUnit.HOURS));
            assertEquals(false, TEST.isSupported(ChronoUnit.DAYS));
            assertEquals(true, TEST.isSupported(ChronoUnit.WEEKS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MONTHS));
            assertEquals(false, TEST.isSupported(ChronoUnit.YEARS));
            assertEquals(false, TEST.isSupported(ChronoUnit.CENTURIES));
            assertEquals(true, TEST.isSupported(IsoFields.WEEK_BASED_YEARS));
            assertEquals(false, TEST.isSupported(IsoFields.QUARTER_YEARS));
        });
    });

    //-----------------------------------------------------------------------
    // atDay(DayOfWeek)
    //-----------------------------------------------------------------------
    describe('atDay(DayOfWeek)', () => {
        it('data_sampleAtDay', () => {
            for (const [weekBasedYear, weekOfWeekBasedYear, dayOfWeek, year, month, dayOfMonth] of data_sampleAtDay) {
                const yearWeek = YearWeek.of(weekBasedYear, weekOfWeekBasedYear);
                const expected = LocalDate.of(year, month, dayOfMonth);
                const actual = yearWeek.atDay(dayOfWeek);
                assertEquals(expected, actual);
            }
        });

        it('test_atDay_loop20years', () => {
            let yearWeek = YearWeek.of(1998, 51);
            let expected = LocalDate.of(1998, 12, 14);
            for (let i = 0; i < (20 * 53); i++) {
                for (let j = 1; j <= 7; j++) {
                    const dow = DayOfWeek.of(j);
                    const actual = yearWeek.atDay(dow);
                    assertEquals(expected, actual);
                    expected = expected.plusDays(1);
                }
                yearWeek = yearWeek.plusWeeks(1);
            }
        });

        it('test_atDay_null', () => {
            assertThrows(NullPointerException, () => TEST.atDay(null));
        });
    });

    //-----------------------------------------------------------------------
    // is53WeekYear()
    //-----------------------------------------------------------------------
    describe('is53WeekYear()', () => {
        it('test_is53WeekYear', () => {
            for (const [year] of data_53WeekYear) {
                const yearWeek = YearWeek.of(year, 1);
                assertTrue(yearWeek.is53WeekYear());
            }
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_compareTo', () => {
            for (let year1 = -1; year1 <= 1; year1++) {
                for (let week1 = 1; week1 < 53; week1++) {
                    const a = YearWeek.of(year1, week1);
                    for (let year2 = -1; year2 <= 1; year2++) {
                        for (let week2 = 1; week2 < 53; week2++) {
                            const b = YearWeek.of(year2, week2);
                            if (year1 < year2) {
                                assertEquals(true, a.compareTo(b) < 0);
                                assertEquals(true, b.compareTo(a) > 0);
                                assertEquals(false, a.isAfter(b));
                                assertEquals(false, b.isBefore(a));
                                assertEquals(true, b.isAfter(a));
                                assertEquals(true, a.isBefore(b));
                            } else if (year1 > year2) {
                                assertEquals(true, a.compareTo(b) > 0);
                                assertEquals(true, b.compareTo(a) < 0);
                                assertEquals(true, a.isAfter(b));
                                assertEquals(true, b.isBefore(a));
                                assertEquals(false, b.isAfter(a));
                                assertEquals(false, a.isBefore(b));
                            } else {
                                if (week1 < week2) {
                                    assertEquals(true, a.compareTo(b) < 0);
                                    assertEquals(true, b.compareTo(a) > 0);
                                    assertEquals(false, a.isAfter(b));
                                    assertEquals(false, b.isBefore(a));
                                    assertEquals(true, b.isAfter(a));
                                    assertEquals(true, a.isBefore(b));
                                } else if (week1 > week2) {
                                    assertEquals(true, a.compareTo(b) > 0);
                                    assertEquals(true, b.compareTo(a) < 0);
                                    assertEquals(true, a.isAfter(b));
                                    assertEquals(true, b.isBefore(a));
                                    assertEquals(false, b.isAfter(a));
                                    assertEquals(false, a.isBefore(b));
                                } else {
                                    assertEquals(0, a.compareTo(b));
                                    assertEquals(0, b.compareTo(a));
                                    assertEquals(false, a.isAfter(b));
                                    assertEquals(false, b.isBefore(a));
                                    assertEquals(false, b.isAfter(a));
                                    assertEquals(false, a.isBefore(b));
                                }
                            }
                        }
                    }
                }
            }
        });

        it('test_compareTo_nullYearWeek', () => {
            assertThrows(NullPointerException, () => TEST.compareTo(null));
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from(TemporalAccessor)', () => {
        it('test_from', () => {
            // eslint-disable-next-line no-unused-vars
            for (const [weekBasedYear, weekOfWeekBasedYear, dayOfWeek, year, month, dayOfMonth] of data_sampleAtDay) {
                const expected = YearWeek.of(weekBasedYear, weekOfWeekBasedYear);
                const ld = LocalDate.of(year, month, dayOfMonth);
                assertEquals(expected, YearWeek.from(ld));
                assertEquals(expected, YearWeek.from(expected));
            }
        });

        it('test_from_TemporalAccessor_noDerive', () => {
            assertThrows(DateTimeException, () => YearWeek.from(LocalTime.NOON));
        });

        it('test_from_TemporalAccessor_null', () => {
            assertThrows(NullPointerException, () => YearWeek.from(null));
        });
    });

    //-----------------------------------------------------------------------
    // get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get(TemporalField)', () => {
        it('test_get', () => {
            assertEquals(2015, TEST.get(IsoFields.WEEK_BASED_YEAR));
            assertEquals(1, TEST.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        });

        it('test_get_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.get(ChronoField.YEAR));
        });

        it('test_get_null', () => {
            assertThrows(NullPointerException, () => TEST.get(null));
        });
    });

    //-----------------------------------------------------------------------
    // getLong(TemporalField)
    //-----------------------------------------------------------------------
    describe('getLong(TemporalField)', () => {
        it('test_getLong', () => {
            assertEquals(2015, TEST.getLong(IsoFields.WEEK_BASED_YEAR));
            assertEquals(1, TEST.getLong(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        });

        it('test_getLong_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.getLong(ChronoField.YEAR));
        });

        it('test_getLong_null', () => {
            assertThrows(NullPointerException, () => TEST.getLong(null));
        });
    });

    //-----------------------------------------------------------------------
    // lengthOfYear()
    //-----------------------------------------------------------------------
    describe('lengthOfYear()', () => {
        it('test_lengthOfYear', () => {
            assertEquals(364, YearWeek.of(2014, 1).lengthOfYear());
            assertEquals(371, YearWeek.of(2015, 1).lengthOfYear());
        });
    });

    //-----------------------------------------------------------------------
    // with(TemporalField, long)
    //-----------------------------------------------------------------------
    describe('with(TemporalField, long)', () => {
        it('test_with', () => {
            assertEquals(YearWeek.of(2015, 10), TEST.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 10));
            assertEquals(YearWeek.of(2016, 1), TEST.with(IsoFields.WEEK_BASED_YEAR, 2016));
        });

        it('test_with_outOfBounds', () => {
            for (const [field, newValue] of data_outOfBounds) {
                assertThrows(DateTimeException, () => TEST.with(field, newValue));
            }
        });

        it('test_with_TemporalAdjuster_unsupportedType', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.with(ChronoField.MONTH_OF_YEAR, 5));
        });
    });

    //-----------------------------------------------------------------------
    // with(TemporalAdjuster)
    //-----------------------------------------------------------------------
    describe('with(TemporalField, long)', () => {
        it('test_with_unsupportedType', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.with(TemporalAdjusters.firstDayOfMonth()));
        });
    });

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            assertEquals('2015-W01', TEST.toString());
        });
    });

    //-----------------------------------------------------------------------
    // parse(CharSequence)
    //-----------------------------------------------------------------------
    describe('parse(CharSequence)', () => {
        it('test_parse_CharSequence', () => {
            assertEquals(TEST, YearWeek.parse('2015-W01'));
        });

        it('test_parse_CharSequenceDate_invalidYear', () => {
            assertThrows(DateTimeParseException, () => YearWeek.parse('12345-W7'));
        });

        it('test_parse_CharSequenceDate_invalidWeek', () => {
            assertThrows(DateTimeParseException, () => YearWeek.parse('2015-W54'));
        });

        it('test_parse_CharSequenceDate_nullCharSequence', () => {
            assertThrows(NullPointerException, () => YearWeek.parse(null));
        });
    });

    //-----------------------------------------------------------------------
    // parse(CharSequence,DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('parse(CharSequence,DateTimeFormatter)', () => {
        const f = new DateTimeFormatterBuilder()
            .appendLiteral('W')
            .appendValue(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 1)
            .appendLiteral(' ')
            .appendValue(IsoFields.WEEK_BASED_YEAR, 4)
            .toFormatter();

        it('test_parse_CharSequenceDateTimeFormatter', () => {
            assertEquals(TEST, YearWeek.parse('W1 2015', f));
        });

        it('test_parse_CharSequenceDateDateTimeFormatter_invalidWeek', () => {
            assertThrows(DateTimeParseException, () => YearWeek.parse('W99 2015', f));
        });

        it('test_parse_CharSequenceDateTimeFormatter_nullCharSequence', () => {
            assertThrows(NullPointerException, () => YearWeek.parse(null, f));
        });

        it('test_parse_CharSequenceDate_nullCharSequence', () => {
            assertThrows(NullPointerException, () => YearWeek.parse('', null));
        });
    });

    //-----------------------------------------------------------------------
    // format()
    //-----------------------------------------------------------------------
    describe('format()', () => {
        it('test_format', () => {
            const f = new DateTimeFormatterBuilder()
                .appendValue(IsoFields.WEEK_BASED_YEAR, 4)
                .appendLiteral('-')
                .appendValue(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 2)
                .toFormatter();
            assertEquals('2015-01', TEST.format(f));
        });
    });

    //-----------------------------------------------------------------------
    // adjustInto()
    //-----------------------------------------------------------------------
    describe('adjustInto()', () => {
        it('test_adjustInto', () => {
            const yw = YearWeek.of(2016, 1);
            const date = LocalDate.of(2015, 6, 20);
            assertEquals(LocalDate.of(2016, 1, 9), yw.adjustInto(date));
        });
    });

    //-----------------------------------------------------------------------
    // until(Temporal, TemporalUnit)
    //-----------------------------------------------------------------------
    describe('until(Temporal, TemporalUnit)', () => {
        it('test_until_weeks', () => {
            assertEquals(1, TEST.until(YearWeek.of(2015, 2), ChronoUnit.WEEKS));
            assertEquals(2, TEST.until(YearWeek.of(2015, 3), ChronoUnit.WEEKS));
            assertEquals(52, TEST_NON_LEAP.until(TEST, ChronoUnit.WEEKS));
            assertEquals(53, TEST.until(YearWeek.of(2016, 1), ChronoUnit.WEEKS));
        });

        it('test_until_years', () => {
            assertEquals(1, TEST.until(YearWeek.of(2016, 1), IsoFields.WEEK_BASED_YEARS));
            assertEquals(-1, TEST.until(YearWeek.of(2014, 1), IsoFields.WEEK_BASED_YEARS));
            assertEquals(0, TEST.until(YearWeek.of(2015, 53), IsoFields.WEEK_BASED_YEARS));
            assertEquals(0, YearWeek.of(2015, 10).until(YearWeek.of(2015, 5), IsoFields.WEEK_BASED_YEARS));
            assertEquals(0, YearWeek.of(2015, 10).until(YearWeek.of(2016, 5), IsoFields.WEEK_BASED_YEARS));
            assertEquals(0, TEST.until(YearWeek.of(2014, 2), IsoFields.WEEK_BASED_YEARS));
            assertEquals(-1, TEST.until(YearWeek.of(2013, 2), IsoFields.WEEK_BASED_YEARS));
        });

        it('test_until_unsupportedType', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.until(YearWeek.of(2016, 1), ChronoUnit.MONTHS));
        });
    });

    //-----------------------------------------------------------------------
    // range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range(TemporalField)', () => {
        it('test_range', () => {
            assertEquals(IsoFields.WEEK_BASED_YEAR.range(), TEST_NON_LEAP.range(IsoFields.WEEK_BASED_YEAR));
            assertEquals(IsoFields.WEEK_BASED_YEAR.range(), TEST.range(IsoFields.WEEK_BASED_YEAR));

            assertEquals(ValueRange.of(1, 52), TEST_NON_LEAP.range(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
            assertEquals(ValueRange.of(1, 53), TEST.range(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        });

        it('test_range_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.range(ChronoField.YEAR));
        });

        it('test_range_null', () => {
            assertThrows(NullPointerException, () => TEST.range(null));
        });
    });

    //-----------------------------------------------------------------------
    // withYear(int)
    //-----------------------------------------------------------------------
    describe('withYear(int)', () => {
        it('test_withYear', () => {
            assertEquals(YearWeek.of(2014, 1), YearWeek.of(2015, 1).withYear(2014));
            assertEquals(YearWeek.of(2009, 53), YearWeek.of(2015, 53).withYear(2009));
        });

        it('test_withYear_sameYear', () => {
            assertEquals(YearWeek.of(2015, 1), YearWeek.of(2015, 1).withYear(2015));
        });

        it('test_withYear_resolve', () => {
            assertEquals(YearWeek.of(2014, 52), YearWeek.of(2015, 53).withYear(2014));
        });

        it('test_withYear_int_max', () => {
            assertThrows(DateTimeException, () => TEST.withYear(Number.MAX_SAFE_INTEGER));
        });

        it('test_withYear_int_min', () => {
            assertThrows(DateTimeException, () => TEST.withYear(Number.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // plus(int, TemporalUnit)
    //-----------------------------------------------------------------------
    describe('plus(int, TemporalUnit)', () => {
        it('test_plus', () => {
            assertEquals(YearWeek.of(2015, 2), TEST.plus(1, ChronoUnit.WEEKS));
            assertEquals(YearWeek.of(2016, 1), TEST.plus(1, IsoFields.WEEK_BASED_YEARS));
        });

        it('test_plus_unsupportedType', () => {
            assertThrows(UnsupportedTemporalTypeException, () => YearWeek.of(2014, 1).plus(1, ChronoUnit.DAYS));
        });
    });

    //-----------------------------------------------------------------------
    // plus(TemporalAmount)
    //-----------------------------------------------------------------------
    describe('plus(TemporalAmount)', () => {
        it('test_plus_TemporalAmount', () => {
            // TODO
            // assertEquals(YearWeek.of(2015, 2), TEST.plus(Weeks.of(1)));
        });
    });

    //-----------------------------------------------------------------------
    // withWeek(int)
    //-----------------------------------------------------------------------
    describe('withWeek(int)', () => {
        it('test_withWeek', () => {
            assertEquals(YearWeek.of(2015, 52), TEST.withWeek(52));
            assertEquals(TEST, YearWeek.of(2014, 1).withWeek(53));
        });

        it('test_withWeek_sameWeek', () => {
            assertEquals(YearWeek.of(2014, 2), YearWeek.of(2014, 2).withWeek(2));
        });

        it('test_withWeek_int_max', () => {
            assertThrows(DateTimeException, () => TEST.withWeek(Number.MAX_SAFE_INTEGER));
        });

        it('test_withWeek_int_min', () => {
            assertThrows(DateTimeException, () => TEST.withWeek(Number.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // plusYears(long)
    //-----------------------------------------------------------------------
    describe('plusYears(long)', () => {
        it('test_plusYears', () => {
            assertEquals(YearWeek.of(2013, 1), TEST.plusYears(-2));
            assertEquals(YearWeek.of(2014, 1), TEST.plusYears(-1));
            assertEquals(TEST, TEST.plusYears(0));
            assertEquals(YearWeek.of(2016, 1), TEST.plusYears(1));
            assertEquals(YearWeek.of(2017, 1), TEST.plusYears(2));
        });

        it('test_plusYears_changeWeek', () => {
            assertEquals(YearWeek.of(2014, 52), YearWeek.of(2015, 53).plusYears(-1));
            assertEquals(YearWeek.of(2015, 53), YearWeek.of(2015, 53).plusYears(0));
            assertEquals(YearWeek.of(2016, 52), YearWeek.of(2015, 53).plusYears(1));
            assertEquals(YearWeek.of(2020, 53), YearWeek.of(2015, 53).plusYears(5));
        });

        it('test_plusYears_max_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusYears(Number.MAX_VALUE));
        });

        it('test_plusYears_min_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusYears(Number.MIN_VALUE));
        });
    });

    //-----------------------------------------------------------------------
    // plusWeeks(long)
    //-----------------------------------------------------------------------
    describe('plusWeeks(long)', () => {
        it('test_plusWeeks', () => {
            assertEquals(TEST, TEST.plusWeeks(0));
            assertEquals(YearWeek.of(2015, 2), TEST.plusWeeks(1));
            assertEquals(YearWeek.of(2015, 3), TEST.plusWeeks(2));
            assertEquals(YearWeek.of(2015, 52), TEST.plusWeeks(51));
            assertEquals(YearWeek.of(2015, 53), TEST.plusWeeks(52));
            assertEquals(YearWeek.of(2016, 1), TEST.plusWeeks(53));
            assertEquals(YearWeek.of(2021, 1), TEST.plusWeeks(314));
        });

        it('test_plusWeeks_negative', () => {
            assertEquals(TEST, TEST.plusWeeks(0));
            assertEquals(YearWeek.of(2014, 52), TEST.plusWeeks(-1));
            assertEquals(YearWeek.of(2014, 51), TEST.plusWeeks(-2));
            assertEquals(YearWeek.of(2014, 2), TEST.plusWeeks(-51));
            assertEquals(YearWeek.of(2014, 1), TEST.plusWeeks(-52));
            assertEquals(YearWeek.of(2013, 52), TEST.plusWeeks(-53));
            assertEquals(YearWeek.of(2009, 53), TEST.plusWeeks(-261));
        });

        it('test_plusWeeks_max_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusWeeks(Number.MAX_SAFE_INTEGER));
        });

        it('test_plusWeeks_min_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusWeeks(Number.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // minus(int, TemporalUnit)
    //-----------------------------------------------------------------------
    describe('minus(int, TemporalUnit)', () => {
        it('test_minus', () => {
            assertEquals(YearWeek.of(2014, 1), YearWeek.of(2014, 2).minus(1, ChronoUnit.WEEKS));
        });

        it('test_minus_overflow', () => {
            assertThrows(ArithmeticException, () => TEST.minus(Number.MIN_SAFE_INTEGER, ChronoUnit.WEEKS));
        });
    });

    //-----------------------------------------------------------------------
    // minus(TemporalAmount)
    //-----------------------------------------------------------------------
    describe('minus(TemporalAmount)', () => {
        it('test_minus_TemporalAmount', () => {
            // TODO
            // assertEquals(YearWeek.of(2014, 1), YearWeek.of(2014, 2).minus(Weeks.of(1)));
        });
    });

    //-----------------------------------------------------------------------
    // minusYears(long)
    //-----------------------------------------------------------------------
    describe('minusYears(long)', () => {
        it('test_minusYears', () => {
            assertEquals(YearWeek.of(2017, 1), TEST.minusYears(-2));
            assertEquals(YearWeek.of(2016, 1), TEST.minusYears(-1));
            assertEquals(TEST, TEST.minusYears(0));
            assertEquals(YearWeek.of(2014, 1), TEST.minusYears(1));
            assertEquals(YearWeek.of(2013, 1), TEST.minusYears(2));
        });

        it('test_minusYears_changeWeek', () => {
            assertEquals(YearWeek.of(2020, 53), YearWeek.of(2015, 53).minusYears(-5));
            assertEquals(YearWeek.of(2016, 52), YearWeek.of(2015, 53).minusYears(-1));
            assertEquals(YearWeek.of(2015, 53), YearWeek.of(2015, 53).minusYears(0));
            assertEquals(YearWeek.of(2014, 52), YearWeek.of(2015, 53).minusYears(1));
        });

        it('test_minusYears_max_long', () => {
            assertThrows(ArithmeticException, () => TEST.minusYears(Number.MAX_VALUE));
        });

        it('test_minusYears_min_long', () => {
            assertThrows(ArithmeticException, () => TEST.minusYears(Number.MIN_VALUE));
        });
    });

    //-----------------------------------------------------------------------
    // minusWeeks(long)
    //-----------------------------------------------------------------------
    describe('minusWeeks(long)', () => {
        it('test_minusWeeks', () => {
            assertEquals(TEST, TEST.minusWeeks(0));
            assertEquals(YearWeek.of(2014, 52), TEST.minusWeeks(1));
            assertEquals(YearWeek.of(2014, 51), TEST.minusWeeks(2));
            assertEquals(YearWeek.of(2014, 2), TEST.minusWeeks(51));
            assertEquals(YearWeek.of(2014, 1), TEST.minusWeeks(52));
            assertEquals(YearWeek.of(2013, 52), TEST.minusWeeks(53));
            assertEquals(YearWeek.of(2009, 53), TEST.minusWeeks(261));
        });

        it('test_minusWeeks_negative', () => {
            assertEquals(TEST, TEST.minusWeeks(0));
            assertEquals(YearWeek.of(2015, 2), TEST.minusWeeks(-1));
            assertEquals(YearWeek.of(2015, 3), TEST.minusWeeks(-2));
            assertEquals(YearWeek.of(2015, 52), TEST.minusWeeks(-51));
            assertEquals(YearWeek.of(2015, 53), TEST.minusWeeks(-52));
            assertEquals(YearWeek.of(2016, 1), TEST.minusWeeks(-53));
            assertEquals(YearWeek.of(2021, 1), TEST.minusWeeks(-314));
        });

        it('test_minWeeks_max_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusWeeks(Number.MAX_SAFE_INTEGER));
        });

        it('test_minWeeks_min_long', () => {
            assertThrows(ArithmeticException, () => TEST.plusWeeks(Number.MIN_SAFE_INTEGER));
        });
    });

    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query(TemporalQuery)', () => {
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
    // equals() / hashCode()
    //-----------------------------------------------------------------------
    describe('equals() / hashCode()', () => {
        it('test_equalsAndHashCodeContract', () => {
            for (const [year, week] of data_sampleYearWeeks) {
                const a = YearWeek.of(year, week);
                const b = YearWeek.of(year, week);
                assertTrue(a.equals(b));
                assertTrue(b.equals(a));
                assertTrue(a.hashCode() === b.hashCode());
            }
        });

        it('test_equals', () => {
            const a = YearWeek.of(2015, 4);
            const b = YearWeek.of(2015, 6);
            const c = YearWeek.of(2016, 6);
            assertFalse(a.equals(b));
            assertFalse(a.equals(c));
            assertFalse(b.equals(a));
            assertFalse(b.equals(c));
            assertFalse(c.equals(a));
            assertFalse(c.equals(b));
        });

        it('test_equals_incorrectType', () => {
            assertTrue(TEST.equals(null) === false);
            assertEquals(false, TEST.equals('Incorrect type'));
        });
    });
   
    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    const data_sampleToString = [
        [2015, 1, '2015-W01'],
        [2015, 10, '2015-W10'],
        [999, 1, '0999-W01'],
        [-999, 1, '-0999-W01'],
        [10000, 1, '+10000-W01'],
        [-10000, 1, '-10000-W01']
    ];

    describe('toString()', () => {
        it('test_toString', () => {
            for (const [year, week, expected] of data_sampleToString) {
                const yearWeek = YearWeek.of(year, week);
                const s = yearWeek.toString();
                assertEquals(expected, s);
            }
        });
    });
});
