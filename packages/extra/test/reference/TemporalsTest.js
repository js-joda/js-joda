/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ChronoUnit,
    DateTimeException,
    DateTimeFormatter,
    DateTimeParseException,
    DayOfWeek,
    IsoFields,
    LocalDate,
    Month,
    UnsupportedTemporalTypeException,
} from '@js-joda/core';

import '../_init';

import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

import { assertEquals, assertFalse, assertThrows, assertTrue } from '../testUtils';

import { Temporals } from '../../src/Temporals';

describe('org.threeten.extra.TestTemporals', () => {
    //-----------------------------------------------------------------------
    // nextWorkingDay()
    //-----------------------------------------------------------------------
    describe('nextWorkingDay()', () => {
        it('test_nextWorkingDay', () => {
            for (const month of Month.values()) {
                for (let i = 1; i <= month.length(false); i++) {
                    const date = LocalDate.of(2007, month, i);
                    const test = Temporals.nextWorkingDay().adjustInto(date);
                    assertTrue(test.isAfter(date));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SATURDAY));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SUNDAY));
    
                    switch (date.dayOfWeek()) {
                        case DayOfWeek.FRIDAY:
                        case DayOfWeek.SATURDAY:
                            assertEquals(DayOfWeek.MONDAY, test.dayOfWeek());
                            break;
                        default:
                            assertEquals(date.dayOfWeek().plus(1), test.dayOfWeek());
                    }
    
                    if (test.year() === 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        switch (date.dayOfWeek()) {
                            case DayOfWeek.FRIDAY:
                                assertEquals(3, dayDiff);
                                break;
                            case DayOfWeek.SATURDAY:
                                assertEquals(2, dayDiff);
                                break;
                            default:
                                assertEquals(1, dayDiff);
                        }
                    } else {
                        assertEquals(2008, test.year());
                        assertEquals(Month.JANUARY, test.month());
                        assertEquals(1, test.dayOfMonth());
                    }
                }
            }
        });

        it('test_nextWorkingDay_yearChange', () => {
            const friday = LocalDate.of(2010, Month.DECEMBER, 31);
            const test1 = Temporals.nextWorkingDay().adjustInto(friday);
            assertEquals(LocalDate.of(2011, Month.JANUARY, 3), test1);

            const saturday = LocalDate.of(2011, Month.DECEMBER, 31);
            const test2 = Temporals.nextWorkingDay().adjustInto(saturday);
            assertEquals(LocalDate.of(2012, Month.JANUARY, 2), test2);
        });
    });

    //-----------------------------------------------------------------------
    // nextWorkingDayOrSame()
    //-----------------------------------------------------------------------
    describe('nextWorkingDayOrSame()', () => {
        it('test_nextWorkingDayOrSame', () => {
            for (const month of Month.values()) {
                for (let i = 1; i <= month.length(false); i++) {
                    const date = LocalDate.of(2007, month, i);
                    const test = Temporals.nextWorkingDayOrSame().adjustInto(date);
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SATURDAY));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SUNDAY));
    
                    switch (date.dayOfWeek()) {
                        case DayOfWeek.SATURDAY:
                        case DayOfWeek.SUNDAY:
                            assertEquals(test.dayOfWeek(), DayOfWeek.MONDAY);
                            break;
                        default:
                            assertEquals(date.dayOfWeek(), test.dayOfWeek());
                    }
    
                    if (test.year() === 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        switch (date.dayOfWeek()) {
                            case DayOfWeek.SATURDAY:
                                assertEquals(dayDiff, 2);
                                break;
                            case DayOfWeek.SUNDAY:
                                assertEquals(dayDiff, 1);
                                break;
                            default:
                                assertEquals(dayDiff, 0);
                        }
                    } else {
                        assertEquals(test.year(), 2008);
                        assertEquals(test.month(), Month.JANUARY);
                        assertEquals(test.dayOfMonth(), 1);
                    }
                }
            }
        });

        it('test_nextWorkingDayOrSame_yearChange', () => {
            const saturday = LocalDate.of(2016, Month.DECEMBER, 31);
            const test1 = Temporals.nextWorkingDayOrSame().adjustInto(saturday);
            assertEquals(LocalDate.of(2017, Month.JANUARY, 2), test1);

            const sunday = LocalDate.of(2017, Month.DECEMBER, 31);
            const test2 = Temporals.nextWorkingDayOrSame().adjustInto(sunday);
            assertEquals(LocalDate.of(2018, Month.JANUARY, 1), test2);
        });
    });

    //-----------------------------------------------------------------------
    // previousWorkingDay()
    //-----------------------------------------------------------------------
    describe('previousWorkingDay()', () => {
        it('test_previousWorkingDay', () => {
            for (const month of Month.values()) {
                for (let i = 1; i <= month.length(false); i++) {
                    const date = LocalDate.of(2007, month, i);
                    const test = Temporals.previousWorkingDay().adjustInto(date);
                    assertTrue(test.isBefore(date));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SATURDAY));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SUNDAY));
    
                    switch (date.dayOfWeek()) {
                        case DayOfWeek.MONDAY:
                        case DayOfWeek.SUNDAY:
                            assertEquals(DayOfWeek.FRIDAY, test.dayOfWeek());
                            break;
                        default:
                            assertEquals(date.dayOfWeek().minus(1), test.dayOfWeek());
                    }
    
                    if (test.year() === 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        switch (date.dayOfWeek()) {
                            case DayOfWeek.MONDAY:
                                assertEquals(-3, dayDiff);
                                break;
                            case DayOfWeek.SUNDAY:
                                assertEquals(-2, dayDiff);
                                break;
                            default:
                                assertEquals(-1, dayDiff);
                        }
                    } else {
                        assertEquals(2006, test.year());
                        assertEquals(Month.DECEMBER, test.month());
                        assertEquals(29, test.dayOfMonth());
                    }
                }
            }
        });

        it('test_previousWorkingDay_yearChange', () => {
            const monday = LocalDate.of(2011, Month.JANUARY, 3);
            const test1 = Temporals.previousWorkingDay().adjustInto(monday);
            assertEquals(LocalDate.of(2010, Month.DECEMBER, 31), test1);

            const sunday = LocalDate.of(2011, Month.JANUARY, 2);
            const test2 = Temporals.previousWorkingDay().adjustInto(sunday);
            assertEquals(LocalDate.of(2010, Month.DECEMBER, 31), test2);
        });
    });

    //-----------------------------------------------------------------------
    // previousWorkingDayOrSame()
    //-----------------------------------------------------------------------
    describe('previousWorkingDayOrSame()', () => {
        it('test_previousWorkingDayOrSame', () => {
            for (const month of Month.values()) {
                for (let i = 1; i <= month.length(false); i++) {
                    const date = LocalDate.of(2007, month, i);
                    const test = Temporals.previousWorkingDayOrSame().adjustInto(date);
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SATURDAY));
                    assertFalse(test.dayOfWeek().equals(DayOfWeek.SUNDAY));
    
                    switch (date.dayOfWeek()) {
                        case DayOfWeek.SATURDAY:
                        case DayOfWeek.SUNDAY:
                            assertEquals(test.dayOfWeek(), DayOfWeek.FRIDAY);
                            break;
                        default:
                            assertEquals(date.dayOfWeek(), test.dayOfWeek());
                    }
    
                    if (test.year() === 2007) {
                        const dayDiff = test.dayOfYear() - date.dayOfYear();
                        switch (date.dayOfWeek()) {
                            case DayOfWeek.SATURDAY:
                                assertEquals(dayDiff, -1);
                                break;
                            case DayOfWeek.SUNDAY:
                                assertEquals(dayDiff, -2);
                                break;
                            default:
                                assertEquals(dayDiff, 0);
                        }
                    } else {
                        assertEquals(test.year(), 2006);
                        assertEquals(test.month(), Month.DECEMBER);
                        assertEquals(test.dayOfMonth(), 29);
                    }
                }
            }
        });

        it('test_previousWorkingDayOrSame_yearChange', () => {
            const sunday = LocalDate.of(2011, Month.JANUARY, 2);
            const test1 = Temporals.previousWorkingDayOrSame().adjustInto(sunday);
            assertEquals(LocalDate.of(2010, Month.DECEMBER, 31), test1);

            const saturday = LocalDate.of(2011, Month.JANUARY, 1);
            const test2 = Temporals.previousWorkingDayOrSame().adjustInto(saturday);
            assertEquals(LocalDate.of(2010, Month.DECEMBER, 31), test2);
        });
    });

    //-----------------------------------------------------------------------
    // parseFirstMatching()
    //-----------------------------------------------------------------------
    describe('parseFirstMatching()', () => {
        const data_parseFirstMatching = [
            ['2016-09-06', DateTimeFormatter.ISO_LOCAL_DATE, DateTimeFormatter.ISO_LOCAL_DATE_TIME],
            ['2016-09-06T00:00:00', DateTimeFormatter.ISO_LOCAL_DATE, DateTimeFormatter.ISO_LOCAL_DATE_TIME],
        ];

        it('test_parseFirstMatching', () => {
            for (const [text, fmt1, fmt2] of data_parseFirstMatching) {
                assertEquals(LocalDate.of(2016, 9, 6), Temporals.parseFirstMatching(text, LocalDate.FROM, fmt1, fmt2));
            }
        });

        it('test_parseFirstMatching_zero', () => {
            assertThrows(DateTimeParseException, () => Temporals.parseFirstMatching('2016-09-06', LocalDate.FROM));
        });

        it('test_parseFirstMatching_one', () => {
            assertEquals(LocalDate.of(2016, 9, 6), Temporals.parseFirstMatching('2016-09-06', LocalDate.FROM, DateTimeFormatter.ISO_LOCAL_DATE));
        });

        it('test_parseFirstMatching_twoNoMatch', () => {
            assertThrows(DateTimeParseException, () => Temporals.parseFirstMatching('2016', LocalDate.FROM, DateTimeFormatter.ISO_LOCAL_DATE, DateTimeFormatter.BASIC_ISO_DATE));
        });
    });

    //-----------------------------------------------------------------------
    // convertAmount()
    //-------------------------------------------------------------------------
    describe('convertAmount()', () => {
        const data_convertAmount = [
            [2, ChronoUnit.NANOS, ChronoUnit.SECONDS, 0, 2],
            [999999999, ChronoUnit.NANOS, ChronoUnit.SECONDS, 0, 999999999],
            [1000000000, ChronoUnit.NANOS, ChronoUnit.SECONDS, 1, 0],
            [1000000001, ChronoUnit.NANOS, ChronoUnit.SECONDS, 1, 1],

            [2, ChronoUnit.NANOS, ChronoUnit.MINUTES, 0, 2],
            [59999999999, ChronoUnit.NANOS, ChronoUnit.MINUTES, 0, 59999999999],
            [60000000000, ChronoUnit.NANOS, ChronoUnit.MINUTES, 1, 0],
            [60000000001, ChronoUnit.NANOS, ChronoUnit.MINUTES, 1, 1],

            [2, ChronoUnit.NANOS, ChronoUnit.HOURS, 0, 2],
            [3599999999999, ChronoUnit.NANOS, ChronoUnit.HOURS, 0, 3599999999999],
            [3600000000000, ChronoUnit.NANOS, ChronoUnit.HOURS, 1, 0],
            [3600000000001, ChronoUnit.NANOS, ChronoUnit.HOURS, 1, 1],

            [2, ChronoUnit.NANOS, ChronoUnit.HALF_DAYS, 0, 2],
            [3600000000000 * 12 * 3, ChronoUnit.NANOS, ChronoUnit.HALF_DAYS, 3, 0],

            [2, ChronoUnit.NANOS, ChronoUnit.DAYS, 0, 2],
            [3600000000000 * 24 * 3, ChronoUnit.NANOS, ChronoUnit.DAYS, 3, 0],

            [2, ChronoUnit.NANOS, ChronoUnit.WEEKS, 0, 2],
            [3600000000000 * 24 * 7 * 3, ChronoUnit.NANOS, ChronoUnit.WEEKS, 3, 0],

            [2, ChronoUnit.SECONDS, ChronoUnit.MINUTES, 0, 2],
            [59, ChronoUnit.SECONDS, ChronoUnit.MINUTES, 0, 59],
            [60, ChronoUnit.SECONDS, ChronoUnit.MINUTES, 1, 0],
            [61, ChronoUnit.SECONDS, ChronoUnit.MINUTES, 1, 1],

            [2, ChronoUnit.SECONDS, ChronoUnit.HOURS, 0, 2],
            [3599, ChronoUnit.SECONDS, ChronoUnit.HOURS, 0, 3599],
            [3600, ChronoUnit.SECONDS, ChronoUnit.HOURS, 1, 0],
            [3601, ChronoUnit.SECONDS, ChronoUnit.HOURS, 1, 1],

            [2, ChronoUnit.SECONDS, ChronoUnit.HALF_DAYS, 0, 2],
            [3600 * 12 * 3, ChronoUnit.SECONDS, ChronoUnit.HALF_DAYS, 3, 0],

            [2, ChronoUnit.SECONDS, ChronoUnit.DAYS, 0, 2],
            [3600 * 24 * 3, ChronoUnit.SECONDS, ChronoUnit.DAYS, 3, 0],

            [2, ChronoUnit.SECONDS, ChronoUnit.WEEKS, 0, 2],
            [3600 * 24 * 7 * 3, ChronoUnit.SECONDS, ChronoUnit.WEEKS, 3, 0],

            [2, ChronoUnit.MINUTES, ChronoUnit.HOURS, 0, 2],
            [59, ChronoUnit.MINUTES, ChronoUnit.HOURS, 0, 59],
            [60, ChronoUnit.MINUTES, ChronoUnit.HOURS, 1, 0],
            [61, ChronoUnit.MINUTES, ChronoUnit.HOURS, 1, 1],

            [2, ChronoUnit.MINUTES, ChronoUnit.HALF_DAYS, 0, 2],
            [60 * 12 * 3 + 1, ChronoUnit.MINUTES, ChronoUnit.HALF_DAYS, 3, 1],

            [2, ChronoUnit.MINUTES, ChronoUnit.DAYS, 0, 2],
            [60 * 24 * 3 + 1, ChronoUnit.MINUTES, ChronoUnit.DAYS, 3, 1],

            [2, ChronoUnit.MINUTES, ChronoUnit.WEEKS, 0, 2],
            [60 * 24 * 7 * 3 + 1, ChronoUnit.MINUTES, ChronoUnit.WEEKS, 3, 1],

            [2, ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, 0, 2],
            [12 * 3 + 1, ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, 3, 1],

            [2, ChronoUnit.HOURS, ChronoUnit.DAYS, 0, 2],
            [24 * 3 + 1, ChronoUnit.HOURS, ChronoUnit.DAYS, 3, 1],

            [2, ChronoUnit.HOURS, ChronoUnit.WEEKS, 0, 2],
            [24 * 7 * 3 + 1, ChronoUnit.HOURS, ChronoUnit.WEEKS, 3, 1],

            [1, ChronoUnit.HALF_DAYS, ChronoUnit.DAYS, 0, 1],
            [2 * 3 + 1, ChronoUnit.HALF_DAYS, ChronoUnit.DAYS, 3, 1],

            [1, ChronoUnit.HALF_DAYS, ChronoUnit.WEEKS, 0, 1],
            [2 * 7 * 3 + 1, ChronoUnit.HALF_DAYS, ChronoUnit.WEEKS, 3, 1],

            [1, ChronoUnit.DAYS, ChronoUnit.WEEKS, 0, 1],
            [7 * 3 + 1, ChronoUnit.DAYS, ChronoUnit.WEEKS, 3, 1],

            [2, ChronoUnit.SECONDS, ChronoUnit.NANOS, 2000000000, 0],
            [2, ChronoUnit.MINUTES, ChronoUnit.NANOS, 2000000000 * 60, 0],
            [2, ChronoUnit.HOURS, ChronoUnit.NANOS, 2000000000 * 3600, 0],
            [2, ChronoUnit.HALF_DAYS, ChronoUnit.NANOS, 2000000000 * 3600 * 12, 0],
            [2, ChronoUnit.DAYS, ChronoUnit.NANOS, 2000000000 * 3600 * 24, 0],
            [2, ChronoUnit.WEEKS, ChronoUnit.NANOS, 2000000000 * 3600 * 24 * 7, 0],

            [2, ChronoUnit.MINUTES, ChronoUnit.SECONDS, 2 * 60, 0],
            [2, ChronoUnit.HOURS, ChronoUnit.SECONDS, 2 * 3600, 0],
            [2, ChronoUnit.HALF_DAYS, ChronoUnit.SECONDS, 2 * 3600 * 12, 0],
            [2, ChronoUnit.DAYS, ChronoUnit.SECONDS, 2 * 3600 * 24, 0],
            [2, ChronoUnit.WEEKS, ChronoUnit.SECONDS, 2 * 3600 * 24 * 7, 0],

            [2, ChronoUnit.HOURS, ChronoUnit.MINUTES, 2 * 60, 0],
            [2, ChronoUnit.HALF_DAYS, ChronoUnit.MINUTES, 2 * 60 * 12, 0],
            [2, ChronoUnit.DAYS, ChronoUnit.MINUTES, 2 * 60 * 24, 0],
            [2, ChronoUnit.WEEKS, ChronoUnit.MINUTES, 2 * 60 * 24 * 7, 0],

            [2, ChronoUnit.HALF_DAYS, ChronoUnit.HOURS, 2 * 12, 0],
            [2, ChronoUnit.DAYS, ChronoUnit.HOURS, 2 * 24, 0],
            [2, ChronoUnit.WEEKS, ChronoUnit.HOURS, 2 * 24 * 7, 0],

            [2, ChronoUnit.DAYS, ChronoUnit.HALF_DAYS, 2 * 2, 0],
            [2, ChronoUnit.WEEKS, ChronoUnit.HALF_DAYS, 2 * 2 * 7, 0],

            [2, ChronoUnit.WEEKS, ChronoUnit.DAYS, 2 * 7, 0],

            [2 * 3 + 1, ChronoUnit.MONTHS, IsoFields.QUARTER_YEARS, 2, 1],
            [2 * 12 + 1, ChronoUnit.MONTHS, ChronoUnit.YEARS, 2, 1],
            [2 * 120 + 1, ChronoUnit.MONTHS, ChronoUnit.DECADES, 2, 1],
            [2 * 1200 + 1, ChronoUnit.MONTHS, ChronoUnit.CENTURIES, 2, 1],
            [2 * 12000 + 1, ChronoUnit.MONTHS, ChronoUnit.MILLENNIA, 2, 1],

            [2 * 4 + 1, IsoFields.QUARTER_YEARS, ChronoUnit.YEARS, 2, 1],
            [2 * 40 + 1, IsoFields.QUARTER_YEARS, ChronoUnit.DECADES, 2, 1],
            [2 * 400 + 1, IsoFields.QUARTER_YEARS, ChronoUnit.CENTURIES, 2, 1],
            [2 * 4000 + 1, IsoFields.QUARTER_YEARS, ChronoUnit.MILLENNIA, 2, 1],

            [2 * 10 + 1, ChronoUnit.YEARS, ChronoUnit.DECADES, 2, 1],
            [2 * 100 + 1, ChronoUnit.YEARS, ChronoUnit.CENTURIES, 2, 1],
            [2 * 1000 + 1, ChronoUnit.YEARS, ChronoUnit.MILLENNIA, 2, 1],

            [2 * 10 + 1, ChronoUnit.DECADES, ChronoUnit.CENTURIES, 2, 1],
            [2 * 100 + 1, ChronoUnit.DECADES, ChronoUnit.MILLENNIA, 2, 1],

            [2 * 10 + 1, ChronoUnit.CENTURIES, ChronoUnit.MILLENNIA, 2, 1],

            [2, IsoFields.QUARTER_YEARS, ChronoUnit.MONTHS, 2 * 3, 0],
            [2, ChronoUnit.YEARS, ChronoUnit.MONTHS, 2 * 12, 0],
            [2, ChronoUnit.DECADES, ChronoUnit.MONTHS, 2 * 120, 0],
            [2, ChronoUnit.CENTURIES, ChronoUnit.MONTHS, 2 * 1200, 0],
            [2, ChronoUnit.MILLENNIA, ChronoUnit.MONTHS, 2 * 12000, 0],

            [2, ChronoUnit.YEARS, IsoFields.QUARTER_YEARS, 2 * 4, 0],
            [2, ChronoUnit.DECADES, IsoFields.QUARTER_YEARS, 2 * 40, 0],
            [2, ChronoUnit.CENTURIES, IsoFields.QUARTER_YEARS, 2 * 400, 0],
            [2, ChronoUnit.MILLENNIA, IsoFields.QUARTER_YEARS, 2 * 4000, 0],

            [2, ChronoUnit.DECADES, ChronoUnit.YEARS, 2 * 10, 0],
            [2, ChronoUnit.CENTURIES, ChronoUnit.YEARS, 2 * 100, 0],
            [2, ChronoUnit.MILLENNIA, ChronoUnit.YEARS, 2 * 1000, 0],

            [2, ChronoUnit.CENTURIES, ChronoUnit.DECADES, 2 * 10, 0],
            [2, ChronoUnit.MILLENNIA, ChronoUnit.DECADES, 2 * 100, 0],

            [2, ChronoUnit.MILLENNIA, ChronoUnit.CENTURIES, 2 * 10, 0],
        ];

        const chronoUnitValues = [
            ChronoUnit.NANOS,
            ChronoUnit.MICROS,
            ChronoUnit.MILLIS,
            ChronoUnit.SECONDS,
            ChronoUnit.MINUTES,
            ChronoUnit.HOURS,
            ChronoUnit.HALF_DAYS,
            ChronoUnit.DAYS,
            ChronoUnit.WEEKS,
            ChronoUnit.MONTHS,
            ChronoUnit.YEARS,
            ChronoUnit.DECADES,
            ChronoUnit.CENTURIES,
            ChronoUnit.MILLENNIA,
            ChronoUnit.ERAS,
            ChronoUnit.FOREVER,
        ];

        it('test_convertAmount()', () => {
            for (const [fromAmount, fromUnit, resultUnit, resultWhole, resultRemainder] of data_convertAmount) {
                const result = Temporals.convertAmount(fromAmount, fromUnit, resultUnit);
                assertEquals(resultWhole, result[0]);
                assertEquals(resultRemainder, result[1]);
            }
        });

        it('test_convertAmount_negative', () => {
            for (const [fromAmount, fromUnit, resultUnit, resultWhole, resultRemainder] of data_convertAmount) {
                const result = Temporals.convertAmount(-fromAmount, fromUnit, resultUnit);
                assertEquals(MathUtil.safeZero(-resultWhole), result[0]);
                assertEquals(MathUtil.safeZero(-resultRemainder), result[1]);
            }
        });

        it('test_convertAmountSameUnit_zero', () => {
            for (const unit of chronoUnitValues) {
                if (unit !== ChronoUnit.ERAS && unit !== ChronoUnit.FOREVER) {
                    const result = Temporals.convertAmount(0, unit, unit);
                    assertEquals(0, result[0]);
                    assertEquals(0, result[1]);
                }
            }
        });

        it('test_convertAmountSameUnit_nonZero', () => {
            for (const unit of chronoUnitValues) {
                if (unit !== ChronoUnit.ERAS && unit !== ChronoUnit.FOREVER) {
                    const result = Temporals.convertAmount(2, unit, unit);
                    assertEquals(2, result[0]);
                    assertEquals(0, result[1]);
                }
            }
        });

        const data_convertAmountInvalid = [
            [ChronoUnit.SECONDS, ChronoUnit.MONTHS],
            [ChronoUnit.SECONDS, IsoFields.QUARTER_YEARS],
            [ChronoUnit.SECONDS, ChronoUnit.YEARS],
            [ChronoUnit.SECONDS, ChronoUnit.DECADES],
            [ChronoUnit.SECONDS, ChronoUnit.CENTURIES],
            [ChronoUnit.SECONDS, ChronoUnit.MILLENNIA],

            [ChronoUnit.MONTHS, ChronoUnit.SECONDS],
            [IsoFields.QUARTER_YEARS, ChronoUnit.SECONDS],
            [ChronoUnit.YEARS, ChronoUnit.SECONDS],
            [ChronoUnit.DECADES, ChronoUnit.SECONDS],
            [ChronoUnit.CENTURIES, ChronoUnit.SECONDS],
            [ChronoUnit.MILLENNIA, ChronoUnit.SECONDS],
        ];

        it('test_convertAmountInvalid', () => {
            for (const [fromUnit, resultUnit] of data_convertAmountInvalid) {
                assertThrows(DateTimeException, () => Temporals.convertAmount(1, fromUnit, resultUnit));
            }
        });

        const data_convertAmountInvalidUnsupported = [
            [ChronoUnit.SECONDS, ChronoUnit.ERAS],
            [ChronoUnit.ERAS, ChronoUnit.SECONDS],
            [ChronoUnit.YEARS, ChronoUnit.ERAS],
            [ChronoUnit.ERAS, ChronoUnit.YEARS],

            [ChronoUnit.SECONDS, ChronoUnit.FOREVER],
            [ChronoUnit.FOREVER, ChronoUnit.SECONDS],
            [ChronoUnit.YEARS, ChronoUnit.FOREVER],
            [ChronoUnit.FOREVER, ChronoUnit.YEARS],

            [ChronoUnit.FOREVER, ChronoUnit.ERAS],
            [ChronoUnit.ERAS, ChronoUnit.FOREVER],
        ];

        it('test_convertAmountInvalidUnsupported', () => {
            for (const [fromUnit, resultUnit] of data_convertAmountInvalidUnsupported) {
                assertThrows(UnsupportedTemporalTypeException, () => Temporals.convertAmount(1, fromUnit, resultUnit));
            }
        });
    });
});
