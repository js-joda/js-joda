/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, assertSame, assertTrue, assertFalse, isCoverageTestRunner} from '../testUtils';

import {DateTimeException, DateTimeParseException,
    NullPointerException, ArithmeticException, IllegalArgumentException} from '../../src/errors';
import {MathUtil} from '../../src/MathUtil';

import {Clock} from '../../src/Clock';
import {DayOfWeek} from '../../src/DayOfWeek';
import {Duration} from '../../src/Duration';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {Instant} from '../../src/Instant';
import {Month} from '../../src/Month';
import {Year} from '../../src/Year';
import {ZoneOffset} from '../../src/ZoneOffset';
import {IsoChronology} from '../../src/chrono/IsoChronology';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {ZoneId} from '../../src/ZoneId';
import {ZonedDateTime} from '../../src/ZonedDateTime';
import {OffsetDateTime} from '../../src/OffsetDateTime';

import {MockSimplePeriod} from './MockSimplePeriod';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
import {CurrentStandardZoneEuropeBerlin, CurrentStandardZoneAsiaGaza} from '../zone/CurrentStandardZone';

import '../_init';

describe('org.threeten.bp.TestLocalDateTime', () => {

    let OFFSET_PONE;
    let OFFSET_PTWO;
    let OFFSET_MTWO;
    const EUROPE_BERLIN = new CurrentStandardZoneEuropeBerlin();
    const ZONE_GAZA = new CurrentStandardZoneAsiaGaza();
    const TEST_2007_07_15_12_30_40_987654321 = LocalDateTime.of(2007, 7, 15, 12, 30, 40, 987654321);
    let MAX_DATE_TIME;
    let MIN_DATE_TIME;
    let MAX_INSTANT;
    let MIN_INSTANT;

    beforeEach('setUp', () => {
        OFFSET_PONE = ZoneOffset.ofHours(1);
        OFFSET_PTWO = ZoneOffset.ofHours(2);
        OFFSET_MTWO = ZoneOffset.ofHours(-2);
        MAX_DATE_TIME = LocalDateTime.MAX;
        MIN_DATE_TIME = LocalDateTime.MIN;
        MAX_INSTANT = MAX_DATE_TIME.atZone(ZoneOffset.UTC).toInstant();
        MIN_INSTANT = MIN_DATE_TIME.atZone(ZoneOffset.UTC).toInstant();
    });

    /*
    function samples() {
        return [
            TEST_2007_07_15_12_30_40_987654321, LocalDateTime.MAX, LocalDateTime.MIN
        ];
    }
*/

    /*
    function validFields() {
        return [
            ChronoField.NANO_OF_SECOND,
            ChronoField.NANO_OF_DAY,
            ChronoField.MICRO_OF_SECOND,
            ChronoField.MICRO_OF_DAY,
            ChronoField.MILLI_OF_SECOND,
            ChronoField.MILLI_OF_DAY,
            ChronoField.SECOND_OF_MINUTE,
            ChronoField.SECOND_OF_DAY,
            ChronoField.MINUTE_OF_HOUR,
            ChronoField.MINUTE_OF_DAY,
            ChronoField.CLOCK_HOUR_OF_AMPM,
            ChronoField.HOUR_OF_AMPM,
            ChronoField.CLOCK_HOUR_OF_DAY,
            ChronoField.HOUR_OF_DAY,
            ChronoField.AMPM_OF_DAY,
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
            ChronoField.ERA
            //JulianFields.JULIAN_DAY,
            //JulianFields.MODIFIED_JULIAN_DAY,
            //JulianFields.RATA_DIE,
        ];
    }
*/

    /*
    function invalidFields() {
        throw Error('todo');
        // list = ChronoField.values();
        // list.removeAll(validFields());
        // return list;
    }
*/

    function isIsoLeap(year) {
        if (year % 4 !== 0) {
            return false;
        }
        if (year % 100 === 0 && year % 400 !== 0) {
            return false;
        }
        return true;
    }

    //-----------------------------------------------------------------------
    function check(dateTime, y, m, d, h, mi, s, n) {
        assertEquals(dateTime.year(), y);
        assertEquals(dateTime.month().value(), m);
        assertEquals(dateTime.dayOfMonth(), d);
        assertEquals(dateTime.hour(), h);
        assertEquals(dateTime.minute(), mi);
        assertEquals(dateTime.second(), s);
        assertEquals(dateTime.nano(), n);
    }

    function createDateMidnight(year, month, day) {
        return LocalDateTime.of(year, month, day, 0, 0);
    }

    describe('atOffset', () => {
        it('normal', () => {
            const t = createDateMidnight(2020, 7, 1);
            assertEquals(t.atOffset(ZoneOffset.UTC), OffsetDateTime.of(2020, 7, 1, 0, 0, 0, 0, ZoneOffset.UTC));
        });

        it('null', () => {
            expect(() => {
                const t = createDateMidnight(2020, 7, 1);
                t.atOffset(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('now()', () => {

        it('now()', function () {
            let expected = LocalDateTime.now(Clock.systemDefaultZone());
            let test = LocalDateTime.now();
            let diff = Math.abs(test.toLocalTime().toNanoOfDay() - expected.toLocalTime().toNanoOfDay());
            if (diff >= 100000000) {
                // may be date change
                expected = LocalDateTime.now(Clock.systemDefaultZone());
                test = LocalDateTime.now();
                diff = Math.abs(test.toLocalTime().toNanoOfDay() - expected.toLocalTime().toNanoOfDay());
            }
            assertTrue(diff < 100000000);  // less than 0.1 secs
        });

    });

    describe('now(ZoneId)', () => {

        it('now_ZoneId_nullZoneId', () => {
            let expected = LocalDateTime.now(Clock.systemDefaultZone());
            let test = LocalDateTime.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalDateTime.now(Clock.systemDefaultZone());
                test = LocalDateTime.now();
            }
            assertEquals(test, expected);
        });

        it('now_ZoneId()', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            let expected = LocalDateTime.now(Clock.system(zone));
            let test = LocalDateTime.now(zone);
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalDateTime.now(Clock.system(zone));
                test = LocalDateTime.now(zone);
            }
            assertEquals(test, expected);
        });

    });

    describe('now(Clock)', () => {

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('now_Clock_allSecsInDay_utc()', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i+= delta) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = LocalDateTime.now(clock);
                assertEquals(test.year(), 1970);
                assertEquals(test.month(), Month.JANUARY);
                assertEquals(test.dayOfMonth(), (i < 24 * 60 * 60 ? 1 : 2));
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv(i, (60 * 60)), 24));
                assertEquals(test.minute(), MathUtil.intMod(MathUtil.intDiv(i, 60), 60));
                assertEquals(test.second(), MathUtil.intMod(i, 60));
                assertEquals(test.nano(), 123456789);
            }
        });

        it('now_Clock_allSecsInDay_offset()', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i+=delta) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant.minusSeconds(ZoneOffset.MAX.totalSeconds()), ZoneOffset.MAX);
                const test = LocalDateTime.now(clock);
                assertEquals(test.year(), 1970);
                assertEquals(test.month(), Month.JANUARY);
                assertEquals(test.dayOfMonth(), (i < 24 * 60 * 60) ? 1 : 2);
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv(i, (60 * 60)), 24));
                assertEquals(test.minute(), MathUtil.intMod(MathUtil.intDiv(i, 60), 60));
                assertEquals(test.second(), MathUtil.intMod(i, 60));
                assertEquals(test.nano(), 123456789);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch()', () => {
            let expected = LocalTime.MIDNIGHT.plusNanos(123456789);
            for (let i = -delta; i >= -(24 * 60 * 60); i-=delta) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = LocalDateTime.now(clock);
                assertEquals(test.year(), 1969);
                assertEquals(test.month(), Month.DECEMBER);
                assertEquals(test.dayOfMonth(), 31);
                expected = expected.minusSeconds(delta);
                assertEquals(test.toLocalTime(), expected);
            }
        });


        it('now_Clock_maxYear', () => {
            const clock = Clock.fixed(MAX_INSTANT, ZoneOffset.UTC);
            const test = LocalDateTime.now(clock);
            assertEquals(test, MAX_DATE_TIME);
        });

        it('now_Clock_tooBig', () => {
            expect(() => {
                const clock = Clock.fixed(MAX_INSTANT.plusSeconds(24 * 60 * 60), ZoneOffset.UTC);
                LocalDateTime.now(clock);
            }).to.throw(DateTimeException);
        });

        it('now_Clock_minYear', () => {
            const clock = Clock.fixed(MIN_INSTANT, ZoneOffset.UTC);
            const test = LocalDateTime.now(clock);
            assertEquals(test, MIN_DATE_TIME);
        });

        it('now_Clock_tooLow', () => {
            expect(() => {
                const clock = Clock.fixed(MIN_INSTANT.minusNanos(1), ZoneOffset.UTC);
                LocalDateTime.now(clock);
            }).to.throw(DateTimeException);
        });

    });

    describe('of() factories', function () {

        it('factory_of_4intsMonth', () => {
            const dateTime = LocalDateTime.of(2007, Month.JULY, 15, 12, 30);
            check(dateTime, 2007, 7, 15, 12, 30, 0, 0);
        });

        it('factory_of_4intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, Month.JULY, 15, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_nullMonth', () => {
            expect(() => {
                LocalDateTime.of(2007, null, 15, 12, 30);
            }).to.throw(NullPointerException);
        });

        it('factory_of_4intsMonth_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, -1, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 32, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, -1, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 24, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, -1);

            }).to.throw(DateTimeException);
        });

        it('factory_of_4intsMonth_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_5intsMonth', () => {
            const dateTime = LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 40);
            check(dateTime, 2007, 7, 15, 12, 30, 40, 0);
        });

        it('factory_of_5intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, Month.JULY, 15, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_nullMonth', () => {
            expect(() => {
                LocalDateTime.of(2007, null, 15, 12, 30, 40);
            }).to.throw(NullPointerException);
        });

        it('factory_of_5intsMonth_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, -1, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 32, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, -1, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 24, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, -1, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 60, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_secondTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5intsMonth_secondTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_6intsMonth', () => {
            const dateTime = LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 40, 987654321);
            check(dateTime, 2007, 7, 15, 12, 30, 40, 987654321);
        });

        it('factory_of_6intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, Month.JULY, 15, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_nullMonth', () => {
            expect(() => {
                LocalDateTime.of(2007, null, 15, 12, 30, 40, 987654321);
            }).to.throw(NullPointerException);
        });

        it('factory_of_6intsMonth_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, -1, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 32, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, -1, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 24, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, -1, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 60, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_secondTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, -1, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_secondTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 60, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_nanoTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 40, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6intsMonth_nanoTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, Month.JULY, 15, 12, 30, 40, 1000000000);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_5ints', () => {
            const dateTime = LocalDateTime.of(2007, 7, 15, 12, 30);
            check(dateTime, 2007, 7, 15, 12, 30, 0, 0);
        });

        it('factory_of_5ints_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, 7, 15, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_monthTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 0, 15, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_monthTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 13, 15, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, -1, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 32, 12, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, -1, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 24, 30);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_5ints_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_6ints', () => {
            const dateTime = LocalDateTime.of(2007, 7, 15, 12, 30, 40);
            check(dateTime, 2007, 7, 15, 12, 30, 40, 0);
        });

        it('factory_of_6ints_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, 7, 15, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_monthTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 0, 15, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_monthTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 13, 15, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, -1, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 32, 12, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, -1, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 24, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, -1, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 60, 40);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_secondTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_6ints_secondTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_7ints', () => {
            const dateTime = LocalDateTime.of(2007, 7, 15, 12, 30, 40, 987654321);
            check(dateTime, 2007, 7, 15, 12, 30, 40, 987654321);
        });

        it('factory_of_7ints_yearTooLow', () => {
            expect(() => {
                LocalDateTime.of(MathUtil.MIN_SAFE_INTEGER, 7, 15, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_monthTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 0, 15, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_monthTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 13, 15, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_dayTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, -1, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_dayTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 32, 12, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_hourTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, -1, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_hourTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 24, 30, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_minuteTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, -1, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_minuteTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 60, 40, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_secondTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, -1, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_secondTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, 60, 987654321);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_nanoTooLow', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, 40, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_7ints_nanoTooHigh', () => {
            expect(() => {
                LocalDateTime.of(2007, 7, 15, 12, 30, 40, 1000000000);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_LocalDate_LocalTime', () => {
            const dateTime = LocalDateTime.of(LocalDate.of(2007, 7, 15), LocalTime.of(12, 30, 40, 987654321));
            check(dateTime, 2007, 7, 15, 12, 30, 40, 987654321);
        });

        it('factory_of_LocalDate_LocalTime_nullLocalDate', () => {
            expect(() => {
                LocalDateTime.of(null, LocalTime.of(12, 30, 40, 987654321));
            }).to.throw(NullPointerException);
        });

        it('factory_of_LocalDate_LocalTime_nullLocalTime', () => {
            expect(() => {
                LocalDateTime.of(LocalDate.of(2007, 7, 15), null);
            }).to.throw(NullPointerException);
        });

    });

    describe('ofInstant()', () => {

        it('factory_ofInstant_zone()', () => {
            const test = LocalDateTime.ofInstant(Instant.ofEpochSecond(1451606400 + 86400 + 3600 + 120 + 4, 500), EUROPE_BERLIN);
            assertEquals(test, LocalDateTime.of(2016, 1, 2, 2, 2, 4, 500));  // offset +01:00
        });

        it('factory_ofInstant_offset', () => {
            const test = LocalDateTime.ofInstant(Instant.ofEpochSecond(86400 + 3600 + 120 + 4, 500), OFFSET_MTWO);
            assertEquals(test, LocalDateTime.of(1970, 1, 1, 23, 2, 4, 500));
        });

        it('factory_ofInstant_offsetBeforeEpoch', () => {
            const test = LocalDateTime.ofInstant(Instant.ofEpochSecond(-86400 + 4, 500), OFFSET_PTWO);
            assertEquals(test, LocalDateTime.of(1969, 12, 31, 2, 0, 4, 500));
        });

        // TODO tests are missing in threeten bp
        it('factory_ofInstant_invalidType', () => {
            expect(() => {
                LocalDateTime.ofInstant(0);
            }).to.throw(IllegalArgumentException);
        });

        it('factory_ofInstant_instantTooBig', () => {
            expect(() => {
                LocalDateTime.ofInstant(Instant.ofEpochSecond(MathUtil.MAX_SAFE_INTEGER), OFFSET_PONE);
            }).to.throw(DateTimeException);
        });

        it('factory_ofInstant_instantTooSmall', () => {
            expect(() => {
                LocalDateTime.ofInstant(Instant.ofEpochSecond(MathUtil.MIN_SAFE_INTEGER), OFFSET_PONE);
            }).to.throw(DateTimeException);
        });

        it('factory_ofInstant_nullInstant', () => {
            expect(() => {
                LocalDateTime.ofInstant(null, EUROPE_BERLIN);
            }).to.throw(NullPointerException);
        });

        it('factory_ofInstant_nullZone', () => {
            expect(() => {
                LocalDateTime.ofInstant(Instant.EPOCH, null);
            }).to.throw(NullPointerException);
        });

    });

    describe('ofEpochSecond()', () => {

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('factory_ofEpochSecond_longOffset_afterEpoch()', () => {
            const base = LocalDateTime.of(1970, 1, 1, 2, 0, 0, 500);
            for (let i = 0; i < 100000; i+=delta) {
                const test = LocalDateTime.ofEpochSecond(i, 500, OFFSET_PTWO);
                assertEquals(test, base.plusSeconds(i));
            }
        });

        it('factory_ofEpochSecond_longOffset_beforeEpoch()', () => {
            const base = LocalDateTime.of(1970, 1, 1, 2, 0, 0, 500);
            for (let i = 0; i < 100000; i+=delta) {
                const test = LocalDateTime.ofEpochSecond(-i, 500, OFFSET_PTWO);
                assertEquals(test, base.minusSeconds(i));
            }
        });

        it('factory_ofEpochSecond_longOffset_tooBig()', () => {
            expect(() => {
                LocalDateTime.ofEpochSecond(MathUtil.MAX_SAFE_INTEGER, 500, OFFSET_PONE);  // TODO: better test
            }).to.throw(DateTimeException);
        });

        it('factory_ofEpochSecond_longOffset_tooSmall()', () => {
            expect(() => {
                LocalDateTime.ofEpochSecond(MathUtil.MIN_SAFE_INTEGER, 500, OFFSET_PONE);  // TODO: better test
            }).to.throw(DateTimeException);
        });

        it('factory_ofEpochSecond_badNanos_toBig', () => {
            expect(() => {
                LocalDateTime.ofEpochSecond(0, 1000000000, OFFSET_PONE);
            }).to.throw(DateTimeException);
        });

        it('factory_ofEpochSecond_badNanos_toSmall', () => {
            expect(() => {
                LocalDateTime.ofEpochSecond(0, -1, OFFSET_PONE);
            }).to.throw(DateTimeException);
        });

        it('factory_ofEpochSecond_longOffset_nullOffset', () => {
            expect(() => {
                LocalDateTime.ofEpochSecond(0, 500, null);
            }).to.throw(NullPointerException);
        });

    });

    describe('from()', () => {

        it('test_from_Accessor', () => {
            const base = LocalDateTime.of(2007, 7, 15, 17, 30);
            assertEquals(LocalDateTime.from(base), base);
            assertEquals(LocalDateTime.from(ZonedDateTime.of(base, ZoneOffset.ofHours(2))), base);
        });

        it('test_from_Accessor_invalid_noDerive', () => {
            expect(() => {
                LocalDateTime.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('test_from_Accessor_null', () => {
            expect(() => {
                LocalDateTime.from(null);
            }).to.throw(NullPointerException);
        });

    });

    function provider_sampleToString() {
        return [
            [2008, 7, 5, 2, 1, 0, 0, '2008-07-05T02:01'],
            [2007, 12, 31, 23, 59, 1, 0, '2007-12-31T23:59:01'],
            [999, 12, 31, 23, 59, 59, 990000000, '0999-12-31T23:59:59.990'],
            [-1, 1, 2, 23, 59, 59, 999990000, '-0001-01-02T23:59:59.999990'],
            [-2008, 1, 2, 23, 59, 59, 999999990, '-2008-01-02T23:59:59.999999990']
        ];
    }


    describe('parse()', () => {

        it('test_parse', function () {
            provider_sampleToString().forEach((data) => {
                test_parse.apply(this, data);
            });
        });

        function test_parse(y, month, d, h, m, s, n, text) {
            // console.log(y, month, d, h, m, s, n, text);
            const t = LocalDateTime.parse(text);
            assertEquals(t.year(), y);
            assertEquals(t.month().value(), month);
            assertEquals(t.dayOfMonth(), d);
            assertEquals(t.hour(), h);
            assertEquals(t.minute(), m);
            assertEquals(t.second(), s);
            assertEquals(t.nano(), n);
        }

        it('factory_parse_illegalValue()', () => {
            expect(() => {
                LocalDateTime.parse('2008-06-32T11:15');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_invalidValue()', () => {
            expect(() => {
                LocalDateTime.parse('2008-06-31T11:15');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_nullText', () => {
            expect(() => {
                LocalDateTime.parse(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('parse(DateTimeFormatter)', () => {

        it('factory_parse_formatter()', () => {
            const f = DateTimeFormatter.ofPattern('u M d H m s');
            const test = LocalDateTime.parse('2010 12 3 11 30 45', f);
            assertEquals(test, LocalDateTime.of(2010, 12, 3, 11, 30, 45));
        });

        // TODO tests are missing in threeten bp
        it('factory_parse_formatter_2()', () => {
            const f = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
            const test = LocalDateTime.parse('2010-12-03 11:30:45', f);
            assertEquals(test, LocalDateTime.of(2010, 12, 3, 11, 30, 45));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                const f = DateTimeFormatter.ofPattern('u M d H m s');
                LocalDateTime.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter', () => {
            expect(() => {
                LocalDateTime.parse('ANY', null);
            }).to.throw(NullPointerException);
        });

    });

    describe('get(DateTimeField)', () => {

        it('test_get_DateTimeField', () => {
            const test = LocalDateTime.of(2008, 6, 30, 12, 30, 40, 987654321);
            assertEquals(test.getLong(ChronoField.YEAR), 2008);
            assertEquals(test.getLong(ChronoField.MONTH_OF_YEAR), 6);
            assertEquals(test.getLong(ChronoField.DAY_OF_MONTH), 30);
            assertEquals(test.getLong(ChronoField.DAY_OF_WEEK), 1);
            assertEquals(test.getLong(ChronoField.DAY_OF_YEAR), 182);

            assertEquals(test.getLong(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.getLong(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.getLong(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.getLong(ChronoField.NANO_OF_SECOND), 987654321);
            assertEquals(test.getLong(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.getLong(ChronoField.AMPM_OF_DAY), 1);
        });

        it('test_get_DateTimeField_null', () => {
            expect(() => {
                const test = LocalDateTime.of(2008, 6, 30, 12, 30, 40, 987654321);
                test.getLong(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_DateTimeField_invalidField', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.getLong(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

    });

    describe('query(TemporalQuery)', () => {

        it('test_query', () => {
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.chronology()), IsoChronology.INSTANCE);
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.localDate()), TEST_2007_07_15_12_30_40_987654321.toLocalDate());
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.localTime()), TEST_2007_07_15_12_30_40_987654321.toLocalTime());
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.offset()), null);
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.precision()), ChronoUnit.NANOS);
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.zone()), null);
            assertEquals(TEST_2007_07_15_12_30_40_987654321.query(TemporalQueries.zoneId()), null);
        });

        it('test_query_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.query(null);
            }).to.throw(NullPointerException);
        });

    });

    //-----------------------------------------------------------------------
    function provider_sampleDates() {
        return [
            [2008, 7, 5],
            [2007, 7, 5],
            [2006, 7, 5],
            [2005, 7, 5],
            [2004, 1, 1],
            [-1, 1, 2]
        ];
    }

    function provider_sampleTimes() {
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 1]
        ];
    }

    describe('get*()', function () {

        it('test_get_dates', function () {
            provider_sampleDates().forEach((data) => {
                test_get_dates.apply(this, data);
            });
        });

        function test_get_dates(y, m, d) {
            const a = LocalDateTime.of(y, m, d, 12, 30);
            assertEquals(a.year(), y);
            assertEquals(a.month(), Month.of(m));
            assertEquals(a.dayOfMonth(), d);
        }

        it('test_getDOY', function () {
            provider_sampleDates().forEach((data) => {
                test_getDOY.apply(this, data);
            });
        });

        function test_getDOY(y, m, d) {
            const a = LocalDateTime.of(y, m, d, 12 ,30);
            let total = 0;
            for (let i = 1; i < m; i++) {
                total += Month.of(i).length(isIsoLeap(y));
            }
            const doy = total + d;
            assertEquals(a.dayOfYear(), doy);
        }

        it('test_get_times', function () {
            provider_sampleTimes().forEach((data) => {
                test_get_times.apply(this, data);
            });
        });

        function test_get_times(h, m, s, ns) {
            const a = LocalDateTime.of(TEST_2007_07_15_12_30_40_987654321.toLocalDate(), LocalTime.of(h, m, s, ns));
            assertEquals(a.hour(), h);
            assertEquals(a.minute(), m);
            assertEquals(a.second(), s);
            assertEquals(a.nano(), ns);
        }

    });

    describe('getDayOfWeek()', () => {

        it('test_getDayOfWeek()', () => {
            let dow = DayOfWeek.MONDAY;
            const MONTH = Month.values();
            for (let j=0; j < MONTH.length; j++) {
                const month = MONTH[j];
                const length = month.length(false);
                for (let i = 1; i <= length; i++) {
                    const d = LocalDateTime.of(LocalDate.of(2007, month, i),
                        TEST_2007_07_15_12_30_40_987654321.toLocalTime());
                    assertSame(d.dayOfWeek(), dow);
                    dow = dow.plus(1);
                }
            }
        });

    });

    describe('with()', () => {

        it('test_with_adjustment()', () => {
            const sample = LocalDateTime.of(2012, 3, 4, 23, 5);
            const adjuster = {
                adjustInto: () => { return sample; }
            };
            assertEquals(TEST_2007_07_15_12_30_40_987654321.with(adjuster), sample);
        });

        it('test_with_adjustment_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.with(null);
            }).to.throw(NullPointerException);
        });

        // missing in threeten bp ?
        it('test_with_LocaleDate()', () => {
            const expected = LocalDateTime.of(2009,12,24,12,30,40,987654321);
            const actual = TEST_2007_07_15_12_30_40_987654321.with(LocalDate.of(2009,12,24));
            assertEquals(expected, actual);
        });

        // missing in threeten bp ?
        it('test_with_LocaleTime()', () => {
            const expected = LocalDateTime.of(2007,7,15,23,55,0,0);
            const actual = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.of(23,55,0));
            assertEquals(expected, actual);
        });
    });

    describe('withYear()', () => {

        it('test_withYear_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.withYear(2008);
            check(t, 2008, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_withYear_int_invalid', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withYear(Year.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_withYear_int_adjustDay', () => {
            const t = LocalDateTime.of(2008, 2, 29, 12, 30).withYear(2007);
            const expected = LocalDateTime.of(2007, 2, 28, 12, 30);
            assertEquals(t, expected);
        });

    });

    describe('withMonth()', () => {

        it('test_withMonth_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.withMonth(1);
            check(t, 2007, 1, 15, 12, 30, 40, 987654321);
        });

        it('test_withMonth_int_invalid', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withMonth(13);
            }).to.throw(DateTimeException);
        });

        it('test_withMonth_int_adjustDay', () => {
            const t = LocalDateTime.of(2007, 12, 31, 12, 30).withMonth(11);
            const expected = LocalDateTime.of(2007, 11, 30, 12, 30);
            assertEquals(t, expected);
        });

    });

    describe('withDayOfMonth()', () => {

        it('test_withDayOfMonth_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.withDayOfMonth(1);
            check(t, 2007, 7, 1, 12, 30, 40, 987654321);
        });

        it('test_withDayOfMonth_invalid', () => {
            expect(() => {
                LocalDateTime.of(2007, 11, 30, 12, 30).withDayOfMonth(32);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfMonth_invalidCombination', () => {
            expect(() => {
                LocalDateTime.of(2007, 11, 30, 12, 30).withDayOfMonth(31);
            }).to.throw(DateTimeException);
        });

    });

    describe('withDayOfYear(int)', () => {

        it('test_withDayOfYear_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.withDayOfYear(33);
            assertEquals(t, LocalDateTime.of(2007, 2, 2, 12, 30, 40, 987654321));
        });

        it('test_withDayOfYear_illegal', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withDayOfYear(367);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfYear_invalid', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withDayOfYear(366);
            }).to.throw(DateTimeException);
        });

    });

    describe('withHour()', () => {

        it('test_withHour_normal()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321;
            for (let i = 0; i < 24; i++) {
                t = t.withHour(i);
                assertEquals(t.hour(), i);
            }
        });

        it('test_withHour_hourTooLow', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withHour(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withHour_hourTooHigh', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withHour(24);
            }).to.throw(DateTimeException);
        });

    });

    describe('withMinute()', () => {

        it('test_withMinute_normal()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321;
            for (let i = 0; i < 60; i++) {
                t = t.withMinute(i);
                assertEquals(t.minute(), i);
            }
        });

        it('test_withMinute_minuteTooLow', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withMinute(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withMinute_minuteTooHigh', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withMinute(60);
            }).to.throw(DateTimeException);
        });

    });

    describe('withSecond()', () => {

        it('test_withSecond_normal()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321;
            for (let i = 0; i < 60; i++) {
                t = t.withSecond(i);
                assertEquals(t.second(), i);
            }
        });

        it('test_withSecond_secondTooLow', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withSecond(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withSecond_secondTooHigh', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withSecond(60);
            }).to.throw(DateTimeException);
        });

    });

    describe('withNano()', () => {

        it('test_withNanoOfSecond_normal', () => {
            let t = TEST_2007_07_15_12_30_40_987654321;
            t = t.withNano(1);
            assertEquals(t.nano(), 1);
            t = t.withNano(10);
            assertEquals(t.nano(), 10);
            t = t.withNano(100);
            assertEquals(t.nano(), 100);
            t = t.withNano(999999999);
            assertEquals(t.nano(), 999999999);
        });

        it('test_withNanoOfSecond_nanoTooLow', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withNano(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withNanoOfSecond_nanoTooHigh', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.withNano(1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('plus(adjuster)', () => {

        it('test_plus_adjuster', () => {
            const p = Duration.ofSeconds(62, 3);
            const t = TEST_2007_07_15_12_30_40_987654321.plus(p);
            assertEquals(t, LocalDateTime.of(2007, 7, 15, 12, 31, 42, 987654324));
        });

        it('test_plus_adjuster_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.plus(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('plus(Period)', () => {

        it('test_plus_Period_positiveMonths', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_12_30_40_987654321.plus(period);
            assertEquals(t, LocalDateTime.of(2008, 2, 15, 12, 30, 40, 987654321));
        });

        it('test_plus_Period_negativeDays', () => {
            const period = MockSimplePeriod.of(-25, ChronoUnit.DAYS);
            const t = TEST_2007_07_15_12_30_40_987654321.plus(period);
            assertEquals(t, LocalDateTime.of(2007, 6, 20, 12, 30, 40, 987654321));
        });

        it('test_plus_Period_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.plus(null);
            }).to.throw(NullPointerException);
        });

        it('test_plus_Period_invalidTooLarge', () => {
            expect(() => {
                const period = MockSimplePeriod.of(1, ChronoUnit.YEARS);
                LocalDateTime.of(Year.MAX_VALUE, 1, 1, 0, 0).plus(period);
            }).to.throw(DateTimeException);
        });

        it('test_plus_Period_invalidTooSmall', () => {
            expect(() => {
                const period = MockSimplePeriod.of(-1, ChronoUnit.YEARS);
                LocalDateTime.of(Year.MIN_VALUE, 1, 1, 0, 0).plus(period);
            }).to.throw(DateTimeException);
        });

    });

    describe('plus(long,PeriodUnit)', function () {

        it('test_plus_longPeriodUnit_positiveMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plus(7, ChronoUnit.MONTHS);
            assertEquals(t, LocalDateTime.of(2008, 2, 15, 12, 30, 40, 987654321));
        });

        it('test_plus_longPeriodUnit_negativeDays', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plus(-25, ChronoUnit.DAYS);
            assertEquals(t, LocalDateTime.of(2007, 6, 20, 12, 30, 40, 987654321));
        });

        it('test_plus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.plus(1, null);
            }).to.throw(NullPointerException);
        });

        it('test_plus_longPeriodUnit_invalidTooLarge', () => {
            expect(() => {
                LocalDateTime.of(Year.MAX_VALUE, 1, 1, 0, 0).plus(1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

        it('test_plus_longPeriodUnit_invalidTooSmall', () => {
            expect(() => {
                LocalDateTime.of(Year.MIN_VALUE, 1, 1, 0, 0).plus(-1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusYears()', () => {

        it('test_plusYears_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusYears(1);
            check(t, 2008, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_plusYears_int_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusYears(-1);
            check(t, 2006, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_plusYears_int_adjustDay', () => {
            const t = createDateMidnight(2008, 2, 29).plusYears(1);
            check(t, 2009, 2, 28, 0, 0, 0, 0);
        });

        it('test_plusYears_int_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 1, 1).plusYears(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_int_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusYears(-1);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusMonths()', () => {

        it('test_plusMonths_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMonths(1);
            check(t, 2007, 8, 15, 12, 30, 40, 987654321);
        });

        it('test_plusMonths_int_overYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMonths(25);
            check(t, 2009, 8, 15, 12, 30, 40, 987654321);
        });

        it('test_plusMonths_int_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMonths(-1);
            check(t, 2007, 6, 15, 12, 30, 40, 987654321);
        });

        it('test_plusMonths_int_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMonths(-7);
            check(t, 2006, 12, 15, 12, 30, 40, 987654321);
        });

        it('test_plusMonths_int_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMonths(-31);
            check(t, 2004, 12, 15, 12, 30, 40, 987654321);
        });

        it('test_plusMonths_int_adjustDayFromLeapYear', () => {
            const t = createDateMidnight(2008, 2, 29).plusMonths(12);
            check(t, 2009, 2, 28, 0, 0, 0, 0);
        });

        it('test_plusMonths_int_adjustDayFromMonthLength', () => {
            const t = createDateMidnight(2007, 3, 31).plusMonths(1);
            check(t, 2007, 4, 30, 0, 0, 0, 0);
        });

        it('test_plusMonths_int_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 1).plusMonths(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusMonths_int_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).plusMonths(-1);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusWeeks()', () => {

        const delta = isCoverageTestRunner() ? 937 : 97;

        function provider_samplePlusWeeksSymmetry() {
            return [
                [createDateMidnight(-1, 1, 1)],
                [createDateMidnight(-1, 2, 28)],
                [createDateMidnight(-1, 3, 1)],
                [createDateMidnight(-1, 12, 31)],
                [createDateMidnight(0, 1, 1)],
                [createDateMidnight(0, 2, 28)],
                [createDateMidnight(0, 2, 29)],
                [createDateMidnight(0, 3, 1)],
                [createDateMidnight(0, 12, 31)],
                [createDateMidnight(2007, 1, 1)],
                [createDateMidnight(2007, 2, 28)],
                [createDateMidnight(2007, 3, 1)],
                [createDateMidnight(2007, 12, 31)],
                [createDateMidnight(2008, 1, 1)],
                [createDateMidnight(2008, 2, 28)],
                [createDateMidnight(2008, 2, 29)],
                [createDateMidnight(2008, 3, 1)],
                [createDateMidnight(2008, 12, 31)],
                [createDateMidnight(2099, 1, 1)],
                [createDateMidnight(2099, 2, 28)],
                [createDateMidnight(2099, 3, 1)],
                [createDateMidnight(2099, 12, 31)],
                [createDateMidnight(2100, 1, 1)],
                [createDateMidnight(2100, 2, 28)],
                [createDateMidnight(2100, 3, 1)],
                [createDateMidnight(2100, 12, 31)]
            ];
        }

        it('test_plusWeeks_symmetry', function () {
            provider_samplePlusWeeksSymmetry().forEach((data) => {
                test_plusWeeks_symmetry.apply(this, data);
            });
        });

        function test_plusWeeks_symmetry(reference) {
            for (let weeks = 0; weeks < 365 * 8; weeks+=delta) {
                let t = reference.plusWeeks(weeks).plusWeeks(-weeks);
                assertEquals(t, reference);

                t = reference.plusWeeks(-weeks).plusWeeks(weeks);
                assertEquals(t, reference);
            }
        }

        it('test_plusWeeks_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusWeeks(1);
            check(t, 2007, 7, 22, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_overMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusWeeks(9);
            check(t, 2007, 9, 16, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_overYears', () => {
            const t = LocalDateTime.of(2006, 7, 16, 12, 30, 40, 987654321).plusWeeks(52);
            assertEquals(t, TEST_2007_07_15_12_30_40_987654321);
        });

        it('test_plusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusYears(-1).plusWeeks(104);
            check(t, 2008, 7, 12, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusWeeks(-1);
            check(t, 2007, 7, 8, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusWeeks(-28);
            check(t, 2006, 12, 31, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusWeeks(-104);
            check(t, 2005, 7, 17, 12, 30, 40, 987654321);
        });

        it('test_plusWeeks_maximum', () => {
            const t = createDateMidnight(Year.MAX_VALUE, 12, 24).plusWeeks(1);
            check(t, Year.MAX_VALUE, 12, 31, 0, 0, 0, 0);
        });

        it('test_plusWeeks_minimum', () => {
            const t = createDateMidnight(Year.MIN_VALUE, 1, 8).plusWeeks(-1);
            check(t, Year.MIN_VALUE, 1, 1, 0, 0, 0, 0);
        });

        it('test_plusWeeks_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 25).plusWeeks(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusWeeks_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 7).plusWeeks(-1);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusDays()', () => {

        function provider_samplePlusDaysSymmetry() {
            return [
                [createDateMidnight(-1, 1, 1)],
                [createDateMidnight(-1, 2, 28)],
                [createDateMidnight(-1, 3, 1)],
                [createDateMidnight(-1, 12, 31)],
                [createDateMidnight(0, 1, 1)],
                [createDateMidnight(0, 2, 28)],
                [createDateMidnight(0, 2, 29)],
                [createDateMidnight(0, 3, 1)],
                [createDateMidnight(0, 12, 31)],
                [createDateMidnight(2007, 1, 1)],
                [createDateMidnight(2007, 2, 28)],
                [createDateMidnight(2007, 3, 1)],
                [createDateMidnight(2007, 12, 31)],
                [createDateMidnight(2008, 1, 1)],
                [createDateMidnight(2008, 2, 28)],
                [createDateMidnight(2008, 2, 29)],
                [createDateMidnight(2008, 3, 1)],
                [createDateMidnight(2008, 12, 31)],
                [createDateMidnight(2099, 1, 1)],
                [createDateMidnight(2099, 2, 28)],
                [createDateMidnight(2099, 3, 1)],
                [createDateMidnight(2099, 12, 31)],
                [createDateMidnight(2100, 1, 1)],
                [createDateMidnight(2100, 2, 28)],
                [createDateMidnight(2100, 3, 1)],
                [createDateMidnight(2100, 12, 31)]
            ];
        }

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('test_plusDays_symmetry', function () {
            provider_samplePlusDaysSymmetry().forEach((data) => {
                test_plusDays_symmetry.apply(this, data);
            });
        });

        function test_plusDays_symmetry(reference) {
            for (let days = 0; days < 365 * 8; days+=delta) {
                let t = reference.plusDays(days).plusDays(-days);
                assertEquals(t, reference);

                t = reference.plusDays(-days).plusDays(days);
                assertEquals(t, reference);
            }
        }

        it('test_plusDays_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusDays(1);
            check(t, 2007, 7, 16, 12, 30, 40, 987654321);
        });

        it('test_plusDays_overMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusDays(62);
            check(t, 2007, 9, 15, 12, 30, 40, 987654321);
        });

        it('test_plusDays_overYears', () => {
            const t = LocalDateTime.of(2006, 7, 14, 12, 30, 40, 987654321).plusDays(366);
            assertEquals(t, TEST_2007_07_15_12_30_40_987654321);
        });

        it('test_plusDays_overLeapYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusYears(-1).plusDays(365 + 366);
            check(t, 2008, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_plusDays_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusDays(-1);
            check(t, 2007, 7, 14, 12, 30, 40, 987654321);
        });

        it('test_plusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusDays(-196);
            check(t, 2006, 12, 31, 12, 30, 40, 987654321);
        });

        it('test_plusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusDays(-730);
            check(t, 2005, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_plusDays_maximum', () => {
            const t = createDateMidnight(Year.MAX_VALUE, 12, 30).plusDays(1);
            check(t, Year.MAX_VALUE, 12, 31, 0, 0, 0, 0);
        });

        it('test_plusDays_minimum', () => {
            const t = createDateMidnight(Year.MIN_VALUE, 1, 2).plusDays(-1);
            check(t, Year.MIN_VALUE, 1, 1, 0, 0, 0, 0);
        });

        it('test_plusDays_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 31).plusDays(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusDays_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).plusDays(-1);
            }).to.throw(DateTimeException);
        });

        it('test_plusDays_overflowTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 31).plusDays(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_plusDays_overflowTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).plusDays(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

    });

    describe('plusHours()', () => {

        it('test_plusHours_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = t.toLocalDate();

            for (let i = 0; i < 50; i++) {
                t = t.plusHours(1);

                if (MathUtil.intMod((i + 1), 24) === 0) {
                    d = d.plusDays(1);
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), MathUtil.intMod((i + 1), 24));
            }
        });

        it('test_plusHours_fromZero()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = base.toLocalDate().minusDays(3);
            let t = LocalTime.of(21, 0);

            for (let i = -50; i < 50; i++) {
                const dt = base.plusHours(i);
                t = t.plusHours(1);

                if (t.hour() === 0) {
                    d = d.plusDays(1);
                }

                assertEquals(dt.toLocalDate(), d);
                assertEquals(dt.toLocalTime(), t);
            }
        });

        it('test_plusHours_fromOne()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.of(1, 0));
            let d = base.toLocalDate().minusDays(3);
            let t = LocalTime.of(22, 0);

            for (let i = -50; i < 50; i++) {
                const dt = base.plusHours(i);

                t = t.plusHours(1);

                if (t.hour() === 0) {
                    d = d.plusDays(1);
                }

                assertEquals(dt.toLocalDate(), d);
                assertEquals(dt.toLocalTime(), t);
            }
        });

    });

    describe('plusMinutes()', () => {

        it('test_plusMinutes_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate();

            let hour = 0;
            let min = 0;

            for (let i = 0; i < 70; i++) {
                t = t.plusMinutes(1);
                min++;
                if (min === 60) {
                    hour++;
                    min = 0;
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_plusMinutes_fromZero()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = base.toLocalDate().minusDays(1);
            let t = LocalTime.of(22, 49);

            for (let i = -70; i < 70; i++) {
                const dt = base.plusMinutes(i);
                t = t.plusMinutes(1);

                if (t === LocalTime.MIDNIGHT) {
                    d = d.plusDays(1);
                }

                assertEquals(dt.toLocalDate(), d, String.valueOf(i));
                assertEquals(dt.toLocalTime(), t, String.valueOf(i));
            }
        });

        it('test_plusMinutes_noChange_oneDay', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusMinutes(24 * 60);
            assertEquals(t.toLocalDate(), TEST_2007_07_15_12_30_40_987654321.toLocalDate().plusDays(1));
        });

    });

    describe('plusSeconds()', () => {

        it('test_plusSeconds_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate();

            let hour = 0;
            let min = 0;
            let sec = 0;

            for (let i = 0; i < 3700; i++) {
                t = t.plusSeconds(1);
                sec++;
                if (sec === 60) {
                    min++;
                    sec = 0;
                }
                if (min === 60) {
                    hour++;
                    min = 0;
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
            }
        });


        it('test_plusSeconds_fromZero', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const delta = 30;
            let i = -3660;
            let date = TEST_2007_07_15_12_30_40_987654321.toLocalDate().minusDays(1);
            let hour = 22;
            let min = 59;
            let sec = 0;
            const iEnd = 3660;
            while (i <= iEnd) {
                i += delta;
                sec += delta;

                if (sec >= 60) {
                    min++;
                    sec -= 60;

                    if (min === 60) {
                        hour++;
                        min = 0;

                        if (hour === 24) {
                            hour = 0;
                        }
                    }
                }

                if (i === 0) {
                    date = date.plusDays(1);
                }

                const seconds = i;
                const t = base.plusSeconds(seconds);

                assertEquals(date, t.toLocalDate());
                assertEquals(hour, t.hour());
                assertEquals(min, t.minute());
                assertEquals(sec, t.second());
            }
        });

        it('test_plusSeconds_noChange_oneDay', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusSeconds(24 * 60 * 60);
            assertEquals(t.toLocalDate(), TEST_2007_07_15_12_30_40_987654321.toLocalDate().plusDays(1));
        });

    });

    describe('plusNanos()', () => {

        it('test_plusNanos_halfABillion()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate();

            let hour = 0;
            let min = 0;
            let sec = 0;
            let nanos = 0;

            for (let i = 0; i < 3700 * 1000000000; i += 500000000) {
                t = t.plusNanos(500000000);
                nanos += 500000000;
                if (nanos === 1000000000) {
                    sec++;
                    nanos = 0;
                }
                if (sec === 60) {
                    min++;
                    sec = 0;
                }
                if (min === 60) {
                    hour++;
                    min = 0;
                }

                assertEquals(t.toLocalDate(), d, String.valueOf(i));
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
                assertEquals(t.nano(), nanos);
            }
        });


        it('test_plusNanos_fromZero', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const delta = 7500000000;
            let i = -3660 * 1000000000;
            let date = TEST_2007_07_15_12_30_40_987654321.toLocalDate().minusDays(1);
            let hour = 22;
            let min = 59;
            let sec = 0;
            let nanos = 0;
            const iEnd = 3660 * 1000000000;
            while (i <= iEnd) {
                i += delta;
                nanos += delta;
                if (nanos >= 1000000000) {
                    sec += MathUtil.intDiv(nanos, 1000000000);
                    nanos = MathUtil.intMod(nanos, 1000000000);

                    if (sec >= 60) {
                        min++;
                        sec = MathUtil.intMod(sec, 60);

                        if (min === 60) {
                            hour++;
                            min = 0;

                            if (hour === 24) {
                                hour = 0;
                                date = date.plusDays(1);
                            }
                        }
                    }
                }
                const nanoseconds = i;
                const t = base.plusNanos(nanoseconds);
                assertEquals(date, t.toLocalDate());
                assertEquals(hour, t.hour());
                assertEquals(min, t.minute());
                assertEquals(sec, t.second());
                assertEquals(nanos, t.nano());
            }
        });

        it('test_plusNanos_noChange_oneDay', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusNanos(24 * 60 * 60 * 1000000000);
            assertEquals(t.toLocalDate(), TEST_2007_07_15_12_30_40_987654321.toLocalDate().plusDays(1));
        });

    });

    describe('minus(adjuster)', () => {

        it('test_minus_adjuster', () => {
            const p = Duration.ofSeconds(62, 3);
            const t = TEST_2007_07_15_12_30_40_987654321.minus(p);
            assertEquals(t, LocalDateTime.of(2007, 7, 15, 12, 29, 38, 987654318));
        });

        it('test_minus_adjuster_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.minus(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('minus(Period)', () => {

        it('test_minus_Period_positiveMonths', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2007_07_15_12_30_40_987654321.minus(period);
            assertEquals(t, LocalDateTime.of(2006, 12, 15, 12, 30, 40, 987654321));
        });

        it('test_minus_Period_negativeDays', () => {
            const period = MockSimplePeriod.of(-25, ChronoUnit.DAYS);
            const t = TEST_2007_07_15_12_30_40_987654321.minus(period);
            assertEquals(t, LocalDateTime.of(2007, 8, 9, 12, 30, 40, 987654321));
        });

        it('test_minus_Period_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.minus(null);
            }).to.throw(NullPointerException);
        });

        it('test_minus_Period_invalidTooLarge', () => {
            expect(() => {
                const period = MockSimplePeriod.of(-1, ChronoUnit.YEARS);
                LocalDateTime.of(Year.MAX_VALUE, 1, 1, 0, 0).minus(period);
            }).to.throw(DateTimeException);
        });

        it('test_minus_Period_invalidTooSmall', () => {
            expect(() => {
                const period = MockSimplePeriod.of(1, ChronoUnit.YEARS);
                LocalDateTime.of(Year.MIN_VALUE, 1, 1, 0, 0).minus(period);
            }).to.throw(DateTimeException);
        });

    });

    describe('minus(long,PeriodUnit)', function () {

        it('test_minus_longPeriodUnit_positiveMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minus(7, ChronoUnit.MONTHS);
            assertEquals(t, LocalDateTime.of(2006, 12, 15, 12, 30, 40, 987654321));
        });

        it('test_minus_longPeriodUnit_negativeDays', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minus(-25, ChronoUnit.DAYS);
            assertEquals(t, LocalDateTime.of(2007, 8, 9, 12, 30, 40, 987654321));
        });

        it('test_minus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.minus(1, null);
            }).to.throw(NullPointerException);
        });

        it('test_minus_longPeriodUnit_invalidTooLarge', () => {
            expect(() => {
                LocalDateTime.of(Year.MAX_VALUE, 1, 1, 0, 0).minus(-1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

        it('test_minus_longPeriodUnit_invalidTooSmall', () => {
            expect(() => {
                LocalDateTime.of(Year.MIN_VALUE, 1, 1, 0, 0).minus(1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusYears()', () => {

        it('test_minusYears_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusYears(1);
            check(t, 2006, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_minusYears_int_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusYears(-1);
            check(t, 2008, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_minusYears_int_adjustDay', () => {
            const t = createDateMidnight(2008, 2, 29).minusYears(1);
            check(t, 2007, 2, 28, 0, 0, 0, 0);
        });

        it('test_minusYears_int_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 1, 1).minusYears(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_int_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).minusYears(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusMonths()', () => {

        it('test_minusMonths_int_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMonths(1);
            check(t, 2007, 6, 15, 12, 30, 40, 987654321);
        });

        it('test_minusMonths_int_overYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMonths(25);
            check(t, 2005, 6, 15, 12, 30, 40, 987654321);
        });

        it('test_minusMonths_int_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMonths(-1);
            check(t, 2007, 8, 15, 12, 30, 40, 987654321);
        });

        it('test_minusMonths_int_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMonths(-7);
            check(t, 2008, 2, 15, 12, 30, 40, 987654321);
        });

        it('test_minusMonths_int_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMonths(-31);
            check(t, 2010, 2, 15, 12, 30, 40, 987654321);
        });

        it('test_minusMonths_int_adjustDayFromLeapYear', () => {
            const t = createDateMidnight(2008, 2, 29).minusMonths(12);
            check(t, 2007, 2, 28, 0, 0, 0, 0);
        });

        it('test_minusMonths_int_adjustDayFromMonthLength', () => {
            const t = createDateMidnight(2007, 3, 31).minusMonths(1);
            check(t, 2007, 2, 28, 0, 0, 0, 0);
        });

        it('test_minusMonths_int_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 1).minusMonths(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusMonths_int_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).minusMonths(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusWeeks()', () => {

        // @DataProvider(name='sampleMinusWeeksSymmetry')
        function provider_sampleMinusWeeksSymmetry() {
            return [
                [createDateMidnight(-1, 1, 1)],
                [createDateMidnight(-1, 2, 28)],
                [createDateMidnight(-1, 3, 1)],
                [createDateMidnight(-1, 12, 31)],
                [createDateMidnight(0, 1, 1)],
                [createDateMidnight(0, 2, 28)],
                [createDateMidnight(0, 2, 29)],
                [createDateMidnight(0, 3, 1)],
                [createDateMidnight(0, 12, 31)],
                [createDateMidnight(2007, 1, 1)],
                [createDateMidnight(2007, 2, 28)],
                [createDateMidnight(2007, 3, 1)],
                [createDateMidnight(2007, 12, 31)],
                [createDateMidnight(2008, 1, 1)],
                [createDateMidnight(2008, 2, 28)],
                [createDateMidnight(2008, 2, 29)],
                [createDateMidnight(2008, 3, 1)],
                [createDateMidnight(2008, 12, 31)],
                [createDateMidnight(2099, 1, 1)],
                [createDateMidnight(2099, 2, 28)],
                [createDateMidnight(2099, 3, 1)],
                [createDateMidnight(2099, 12, 31)],
                [createDateMidnight(2100, 1, 1)],
                [createDateMidnight(2100, 2, 28)],
                [createDateMidnight(2100, 3, 1)],
                [createDateMidnight(2100, 12, 31)]
            ];
        }

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('test_minusWeeks_symmetry', function () {
            provider_sampleMinusWeeksSymmetry().forEach((data) => {
                test_minusWeeks_symmetry.apply(this, data);
            });
        });

        // @Test(dataProvider='sampleMinusWeeksSymmetry')
        function test_minusWeeks_symmetry(reference) {
            for (let weeks = 0; weeks < 365 * 8; weeks+=delta) {
                let t = reference.minusWeeks(weeks).minusWeeks(-weeks);
                assertEquals(t, reference);

                t = reference.minusWeeks(-weeks).minusWeeks(weeks);
                assertEquals(t, reference);
            }
        }

        it('test_minusWeeks_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusWeeks(1);
            check(t, 2007, 7, 8, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_overMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusWeeks(9);
            check(t, 2007, 5, 13, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_overYears', () => {
            const t = LocalDateTime.of(2008, 7, 13, 12, 30, 40, 987654321).minusWeeks(52);
            assertEquals(t, TEST_2007_07_15_12_30_40_987654321);
        });

        it('test_minusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusYears(-1).minusWeeks(104);
            check(t, 2006, 7, 18, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusWeeks(-1);
            check(t, 2007, 7, 22, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusWeeks(-28);
            check(t, 2008, 1, 27, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusWeeks(-104);
            check(t, 2009, 7, 12, 12, 30, 40, 987654321);
        });

        it('test_minusWeeks_maximum', () => {
            const t = createDateMidnight(Year.MAX_VALUE, 12, 24).minusWeeks(-1);
            check(t, Year.MAX_VALUE, 12, 31, 0, 0, 0, 0);
        });

        it('test_minusWeeks_minimum', () => {
            const t = createDateMidnight(Year.MIN_VALUE, 1, 8).minusWeeks(1);
            check(t, Year.MIN_VALUE, 1, 1, 0, 0, 0, 0);
        });

        it('test_minusWeeks_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 25).minusWeeks(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusWeeks_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 7).minusWeeks(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusDays()', () => {

        //@DataProvider(name='sampleMinusDaysSymmetry')
        function provider_sampleMinusDaysSymmetry() {
            return [
                [createDateMidnight(-1, 1, 1)],
                [createDateMidnight(-1, 2, 28)],
                [createDateMidnight(-1, 3, 1)],
                [createDateMidnight(-1, 12, 31)],
                [createDateMidnight(0, 1, 1)],
                [createDateMidnight(0, 2, 28)],
                [createDateMidnight(0, 2, 29)],
                [createDateMidnight(0, 3, 1)],
                [createDateMidnight(0, 12, 31)],
                [createDateMidnight(2007, 1, 1)],
                [createDateMidnight(2007, 2, 28)],
                [createDateMidnight(2007, 3, 1)],
                [createDateMidnight(2007, 12, 31)],
                [createDateMidnight(2008, 1, 1)],
                [createDateMidnight(2008, 2, 28)],
                [createDateMidnight(2008, 2, 29)],
                [createDateMidnight(2008, 3, 1)],
                [createDateMidnight(2008, 12, 31)],
                [createDateMidnight(2099, 1, 1)],
                [createDateMidnight(2099, 2, 28)],
                [createDateMidnight(2099, 3, 1)],
                [createDateMidnight(2099, 12, 31)],
                [createDateMidnight(2100, 1, 1)],
                [createDateMidnight(2100, 2, 28)],
                [createDateMidnight(2100, 3, 1)],
                [createDateMidnight(2100, 12, 31)]
            ];
        }

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('test_minusDays_symmetry', function () {
            provider_sampleMinusDaysSymmetry().forEach((data) => {
                test_minusDays_symmetry.apply(this, data);
            });
        });

        // @Test(dataProvider='sampleMinusDaysSymmetry')
        function test_minusDays_symmetry(reference) {
            for (let days = 0; days < 365 * 8; days+=delta) {
                let t = reference.minusDays(days).minusDays(-days);
                assertEquals(t, reference);

                t = reference.minusDays(-days).minusDays(days);
                assertEquals(t, reference);
            }
        }

        it('test_minusDays_normal', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusDays(1);
            check(t, 2007, 7, 14, 12, 30, 40, 987654321);
        });

        it('test_minusDays_overMonths', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusDays(62);
            check(t, 2007, 5, 14, 12, 30, 40, 987654321);
        });

        it('test_minusDays_overYears', () => {
            const t = LocalDateTime.of(2008, 7, 16, 12, 30, 40, 987654321).minusDays(367);
            assertEquals(t, TEST_2007_07_15_12_30_40_987654321);
        });

        it('test_minusDays_overLeapYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.plusYears(2).minusDays(365 + 366);
            assertEquals(t, TEST_2007_07_15_12_30_40_987654321);
        });

        it('test_minusDays_negative', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusDays(-1);
            check(t, 2007, 7, 16, 12, 30, 40, 987654321);
        });

        it('test_minusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusDays(-169);
            check(t, 2007, 12, 31, 12, 30, 40, 987654321);
        });

        it('test_minusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusDays(-731);
            check(t, 2009, 7, 15, 12, 30, 40, 987654321);
        });

        it('test_minusDays_maximum', () => {
            const t = createDateMidnight(Year.MAX_VALUE, 12, 30).minusDays(-1);
            check(t, Year.MAX_VALUE, 12, 31, 0, 0, 0, 0);
        });

        it('test_minusDays_minimum', () => {
            const t = createDateMidnight(Year.MIN_VALUE, 1, 2).minusDays(1);
            check(t, Year.MIN_VALUE, 1, 1, 0, 0, 0, 0);
        });

        it('test_minusDays_invalidTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 31).minusDays(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusDays_invalidTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).minusDays(1);
            }).to.throw(DateTimeException);
        });

        it('test_minusDays_overflowTooLarge', () => {
            expect(() => {
                createDateMidnight(Year.MAX_VALUE, 12, 31).minusDays(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_minusDays_overflowTooSmall', () => {
            expect(() => {
                createDateMidnight(Year.MIN_VALUE, 1, 1).minusDays(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

    });

    describe('minusHours()', () => {

        it('test_minusHours_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = t.toLocalDate();

            for (let i = 0; i < 50; i++) {
                t = t.minusHours(1);

                if (i % 24 === 0) {
                    d = d.minusDays(1);
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), (((-i + 23) % 24) + 24) % 24);
            }
        });

        it('test_minusHours_fromZero()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = base.toLocalDate().plusDays(2);
            let t = LocalTime.of(3, 0);

            for (let i = -50; i < 50; i++) {
                const dt = base.minusHours(i);
                t = t.minusHours(1);

                if (t.hour() === 23) {
                    d = d.minusDays(1);
                }

                assertEquals(dt.toLocalDate(), d, String.valueOf(i));
                assertEquals(dt.toLocalTime(), t);
            }
        });

        it('test_minusHours_fromOne()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.of(1, 0));
            let d = base.toLocalDate().plusDays(2);
            let t = LocalTime.of(4, 0);

            for (let i = -50; i < 50; i++) {
                const dt = base.minusHours(i);

                t = t.minusHours(1);

                if (t.hour() === 23) {
                    d = d.minusDays(1);
                }

                assertEquals(dt.toLocalDate(), d, String.valueOf(i));
                assertEquals(dt.toLocalTime(), t);
            }
        });

    });

    describe('minusMinutes()', () => {

        it('test_minusMinutes_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate().minusDays(1);

            let hour = 0;
            let min = 0;

            for (let i = 0; i < 70; i++) {
                t = t.minusMinutes(1);
                min--;
                if (min === -1) {
                    hour--;
                    min = 59;

                    if (hour === -1) {
                        hour = 23;
                    }
                }
                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_minusMinutes_fromZero()', () => {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            let d = base.toLocalDate().minusDays(1);
            let t = LocalTime.of(22, 49);

            for (let i = 70; i > -70; i--) {
                const dt = base.minusMinutes(i);
                t = t.plusMinutes(1);

                if (t === LocalTime.MIDNIGHT) {
                    d = d.plusDays(1);
                }

                assertEquals(dt.toLocalDate(), d);
                assertEquals(dt.toLocalTime(), t);
            }
        });

        it('test_minusMinutes_noChange_oneDay', () => {
            const t = TEST_2007_07_15_12_30_40_987654321.minusMinutes(24 * 60);
            assertEquals(t.toLocalDate(), TEST_2007_07_15_12_30_40_987654321.toLocalDate().minusDays(1));
        });

    });

    describe('minusSeconds()', () => {

        it('test_minusSeconds_one()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate().minusDays(1);

            let hour = 0;
            let min = 0;
            let sec = 0;

            for (let i = 0; i < 3700; i++) {
                t = t.minusSeconds(1);
                sec--;
                if (sec === -1) {
                    min--;
                    sec = 59;

                    if (min === -1) {
                        hour--;
                        min = 59;

                        if (hour === -1) {
                            hour = 23;
                        }
                    }
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
            }
        });

        it('test_minusSeconds_fromZero', function () {
            const delta = 30;

            let i = 3660;
            let date = TEST_2007_07_15_12_30_40_987654321.toLocalDate().minusDays(1);
            let hour = 22;
            let min = 59;
            let sec = 0;

            const iEnd = -3660;

            while (i >= iEnd) {
                i -= delta;
                sec += delta;

                if (sec >= 60) {
                    min++;
                    sec -= 60;

                    if (min === 60) {
                        hour++;
                        min = 0;

                        if (hour === 24) {
                            hour = 0;
                        }
                    }
                }

                if (i === 0) {
                    date = date.plusDays(1);
                }

                test_minusSeconds_fromZero(i, date, hour, min, sec);
            }
        });

        function test_minusSeconds_fromZero(seconds, date, hour, min, sec) {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const t = base.minusSeconds(seconds);

            assertEquals(date, t.toLocalDate());
            assertEquals(hour, t.hour());
            assertEquals(min, t.minute());
            assertEquals(sec, t.second());
        }

    });

    describe('minusNanos()', () => {

        it('test_minusNanos_halfABillion()', () => {
            let t = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const d = t.toLocalDate().minusDays(1);

            let hour = 0;
            let min = 0;
            let sec = 0;
            let nanos = 0;

            for (let i = 0; i < 3700 * 1000000000; i += 500000000) {
                t = t.minusNanos(500000000);
                nanos -= 500000000;

                if (nanos < 0) {
                    sec--;
                    nanos += 1000000000;

                    if (sec === -1) {
                        min--;
                        sec += 60;

                        if (min === -1) {
                            hour--;
                            min += 60;

                            if (hour === -1) {
                                hour += 24;
                            }
                        }
                    }
                }

                assertEquals(t.toLocalDate(), d);
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
                assertEquals(t.nano(), nanos);
            }
        });

        it('test_minusNanos_fromZero', function () {
            const delta = 7500000000;
            let i = 3660 * 1000000000;
            let date = TEST_2007_07_15_12_30_40_987654321.toLocalDate().minusDays(1);
            let hour = 22;
            let min = 59;
            let sec = 0;
            let nanos = 0;
            const iEnd = -3660 * 1000000000;
            while (i >= iEnd) {
                i -= delta;
                nanos += delta;

                if (nanos >= 1000000000) {
                    sec += MathUtil.intDiv(nanos, 1000000000);
                    nanos = MathUtil.intMod(nanos, 1000000000);

                    if (sec >= 60) {
                        min++;
                        sec = MathUtil.intMod(sec, 60);

                        if (min === 60) {
                            hour++;
                            min = 0;

                            if (hour === 24) {
                                hour = 0;
                                date = date.plusDays(1);
                            }
                        }
                    }
                }
                test_minusNanos_fromZero(i, date, hour, min, sec, nanos);
            }
        });

        function test_minusNanos_fromZero(nanoseconds, date, hour, min, sec, nanos) {
            const base = TEST_2007_07_15_12_30_40_987654321.with(LocalTime.MIDNIGHT);
            const t = base.minusNanos(nanoseconds);

            assertEquals(date, t.toLocalDate());
            assertEquals(hour, t.hour());
            assertEquals(min, t.minute());
            assertEquals(sec, t.second());
            assertEquals(nanos, t.nano());
        }

    });

    describe('until()', () => {

        //@DataProvider(name='until')
        function provider_until() {
            // TODO date based ChronoUnit missing in threeten bp
            return [
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.DAYS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.WEEKS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.MONTHS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.YEARS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.DECADES, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.CENTURIES, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.MILLENNIA, 0],

                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.DAYS, 364],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.WEEKS, 52],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.MONTHS, 11],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.YEARS, 0, -1],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.DECADES, 0],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.CENTURIES, 0],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.MILLENNIA, 0],

                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.NANOS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MICROS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MILLIS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.SECONDS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MINUTES, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.NANOS, 1000000000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MICROS, 1000000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MILLIS, 1000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.SECONDS, 1],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MINUTES, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.NANOS, 60000000000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MICROS, 60000000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MILLIS, 60000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.SECONDS, 60],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MINUTES, 1],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.499', ChronoUnit.SECONDS, -1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.500', ChronoUnit.SECONDS, -1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.501', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.499', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.500', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.501', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.499', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.500', ChronoUnit.SECONDS, 1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.501', ChronoUnit.SECONDS, 1],

                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.499', ChronoUnit.SECONDS, 86400 - 2],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.500', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.501', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.499', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.500', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.501', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.499', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.500', ChronoUnit.SECONDS, 86400 + 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.501', ChronoUnit.SECONDS, 86400 + 1]
            ];
        }

        it('test_until', function () {
            provider_until().forEach((data) => {
                test_until.apply(this, data);
            });
        });

        // @Test(dataProvider = 'until')
        function test_until(startStr, endStr, unit, expected) {
            // console.log(startStr, endStr, unit.toString(), expected);
            const start = LocalDateTime.parse(startStr);
            const end = LocalDateTime.parse(endStr);
            assertEquals(start.until(end, unit), expected);
        }

        it('test_until_reveresed', function () {
            provider_until().forEach((data) => {
                test_until_reveresed.apply(this, data);
            });
        });

        // @Test(dataProvider = 'until')
        function test_until_reveresed(startStr, endStr, unit, expected) {
            // console.log(startStr, endStr, unit.toString(), expected);
            const start = LocalDateTime.parse(startStr);
            const end = LocalDateTime.parse(endStr);
            assertEquals(end.until(start, unit), MathUtil.safeZero(-expected));
        }

    });

    describe('atZone()', () => {

        it('test_atZone', () => {
            const t = LocalDateTime.of(2008, 6, 30, 11, 30);
            assertEquals(t.atZone(EUROPE_BERLIN),
                ZonedDateTime.of(LocalDateTime.of(2008, 6, 30, 11, 30), EUROPE_BERLIN));
        });

        it('test_atZone_Offset', () => {
            const t = LocalDateTime.of(2008, 6, 30, 11, 30);
            assertEquals(t.atZone(OFFSET_PTWO), ZonedDateTime.of(LocalDateTime.of(2008, 6, 30, 11, 30), OFFSET_PTWO));
        });

        it('test_atZone_dstGap', () => {
            const t = LocalDateTime.of(2007, 4, 1, 0, 0);
            assertEquals(t.atZone(ZONE_GAZA),
                ZonedDateTime.of(LocalDateTime.of(2007, 4, 1, 1, 0), ZONE_GAZA));
        });

        it('test_atZone_dstOverlap', () => {
            const t = LocalDateTime.of(2007, 10, 28, 2, 30);
            assertEquals(t.atZone(EUROPE_BERLIN),
                ZonedDateTime.ofStrict(LocalDateTime.of(2007, 10, 28, 2, 30), OFFSET_PTWO, EUROPE_BERLIN));
        });

        it('test_atZone_nullTimeZone', () => {
            expect(() => {
                const t = LocalDateTime.of(2008, 6, 30, 11, 30);
                t.atZone(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('toEpochSecond()', () => {

        const delta = isCoverageTestRunner() ? 937 : 97;

        it('test_toEpochSecond_afterEpoch()', () => {
            for (let i = -5; i < 5; i++) {
                const offset = ZoneOffset.ofHours(i);
                for (let j = 0; j < 100000; j+=delta) {
                    const a = LocalDateTime.of(1970, 1, 1, 0, 0).plusSeconds(j);
                    assertEquals(a.toEpochSecond(offset), j - i * 3600);
                }
            }
        });

        it('test_toEpochSecond_beforeEpoch()', () => {
            for (let i = 0; i < 100000; i+=delta) {
                const a = LocalDateTime.of(1970, 1, 1, 0, 0).minusSeconds(i);
                assertEquals(a.toEpochSecond(ZoneOffset.UTC), MathUtil.safeToInt(-i));
            }
        });

    });

    describe('compareTo()', () => {

        it('test_comparisons', () => {
            test_comparisons_LocalDateTime1(
                LocalDate.of(Year.MIN_VALUE, 1, 1),
                LocalDate.of(Year.MIN_VALUE, 12, 31),
                LocalDate.of(-1, 1, 1),
                LocalDate.of(-1, 12, 31),
                LocalDate.of(0, 1, 1),
                LocalDate.of(0, 12, 31),
                LocalDate.of(1, 1, 1),
                LocalDate.of(1, 12, 31),
                LocalDate.of(2008, 1, 1),
                LocalDate.of(2008, 2, 29),
                LocalDate.of(2008, 12, 31),
                LocalDate.of(Year.MAX_VALUE, 1, 1),
                LocalDate.of(Year.MAX_VALUE, 12, 31)
            );
        });

        function test_comparisons_LocalDateTime1(...localDates) {
            test_comparisons_LocalDateTime2(
                localDates,
                LocalTime.MIDNIGHT,
                LocalTime.of(0, 0, 0, 999999999),
                LocalTime.of(0, 0, 59, 0),
                LocalTime.of(0, 0, 59, 999999999),
                LocalTime.of(0, 59, 0, 0),
                LocalTime.of(0, 59, 59, 999999999),
                LocalTime.NOON,
                LocalTime.of(12, 0, 0, 999999999),
                LocalTime.of(12, 0, 59, 0),
                LocalTime.of(12, 0, 59, 999999999),
                LocalTime.of(12, 59, 0, 0),
                LocalTime.of(12, 59, 59, 999999999),
                LocalTime.of(23, 0, 0, 0),
                LocalTime.of(23, 0, 0, 999999999),
                LocalTime.of(23, 0, 59, 0),
                LocalTime.of(23, 0, 59, 999999999),
                LocalTime.of(23, 59, 0, 0),
                LocalTime.of(23, 59, 59, 999999999)
            );
        }

        function test_comparisons_LocalDateTime2(localDates, ...localTimes) {
            const localDateTimes = [];
            for (let i=0; i<localDates.length; i++) {
                for (let j=0; j<localTimes.length; j++) {
                    localDateTimes.push(LocalDateTime.of(localDates[i], localTimes[j]));
                }
            }
            doTest_comparisons_LocalDateTime(localDateTimes);
        }

        const delta = isCoverageTestRunner() ? 100 : 11;

        function doTest_comparisons_LocalDateTime(localDateTimes) {
            for (let i = 0; i < localDateTimes.length; i+=delta) {
                const a = localDateTimes[i];
                for (let j = 0; j < localDateTimes.length; j++) {
                    const b = localDateTimes[j];
                    if (i < j) {
                        assertTrue(a.compareTo(b) < 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), true, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                        assertEquals(a.equals(b), false, a + ' <=> ' + b);
                    } else if (i > j) {
                        assertTrue(a.compareTo(b) > 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), true, a + ' <=> ' + b);
                        assertEquals(a.equals(b), false, a + ' <=> ' + b);
                    } else {
                        assertEquals(a.compareTo(b), 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                        assertEquals(a.equals(b), true, a + ' <=> ' + b);
                    }
                }
            }
        }

        it('test_compareTo_ObjectNull', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('test_isBefore_ObjectNull', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter_ObjectNull', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('compareToNonLocalDateTime', () => {
            expect(() => {
                TEST_2007_07_15_12_30_40_987654321.compareTo({});
            }).to.throw(IllegalArgumentException);
        });

    });

    // DataProvider(name='sampleDateTimes')
    function provider_sampleDateTimes() {
        const sampleDateTimes = [];
        const sampleDates = provider_sampleDates();
        const sampleTimes = provider_sampleTimes();
        let datesIndex = 0;
        let timesIndex = 0;

        while(datesIndex < sampleDates.length){
            const sampleDate = sampleDates[datesIndex];
            const sampleTime = sampleTimes[timesIndex];
            sampleDateTimes.push(sampleDate.concat(sampleTime));
            if (++timesIndex === sampleTimes.length) {
                datesIndex++;
                timesIndex = 0;
            }
        }

        return sampleDateTimes;
    }

    describe('equals()', () => {

        it('test_equals_true', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_true.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_true(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d, h, mi, s, n);
            assertTrue(a.equals(b));
        }

        it('test_equals_false_year_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_year_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_year_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y + 1, m, d, h, mi, s, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_month_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_month_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_month_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m + 1, d, h, mi, s, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_day_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_day_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_day_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d + 1, h, mi, s, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_hour_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_hour_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_hour_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d, h + 1, mi, s, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_minute_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_minute_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_minute_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d, h, mi + 1, s, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_second_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_second_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_second_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d, h, mi, s + 1, n);
            assertFalse(a.equals(b));
        }

        it('test_equals_false_nano_differs', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_equals_false_nano_differs.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_equals_false_nano_differs(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            const b = LocalDateTime.of(y, m, d, h, mi, s, n + 1);
            assertFalse(a.equals(b));
        }

        it('test_equals_itself_true', () => {
            assertEquals(TEST_2007_07_15_12_30_40_987654321.equals(TEST_2007_07_15_12_30_40_987654321), true);
        });

        it('test_equals_string_false()', () => {
            assertEquals(TEST_2007_07_15_12_30_40_987654321.equals('2007-07-15T12:30:40.987654321'), false);
        });

        it('test_equals_null_false', () => {
            assertEquals(TEST_2007_07_15_12_30_40_987654321.equals(null), false);
        });

    });

    describe('hashCode()', () => {

        it('test_hashCode', function () {
            provider_sampleDateTimes().forEach((data) => {
                test_hashCode.apply(this, data);
            });
        });

        //@Test(dataProvider='sampleDateTimes')
        function test_hashCode(y, m, d, h, mi, s, n) {
            const a = LocalDateTime.of(y, m, d, h, mi, s, n);
            assertEquals(a.hashCode(), a.hashCode());
            const b = LocalDateTime.of(y, m, d, h, mi, s, n);
            assertEquals(a.hashCode(), b.hashCode());
        }

    });

    describe('toString()', () => {

        it('test_toString', function () {
            provider_sampleToString().forEach((data) => {
                test_toString.apply(this, data);
            });
        });

        // @Test(dataProvider='sampleToString')
        function test_toString(y, m, d, h, mi, s, n, expected) {
            const t = LocalDateTime.of(y, m, d, h, mi, s, n);
            const str = t.toString();
            assertEquals(str, expected);
            assertEquals(t.toJSON(), str);
        }

    });

    describe('format(DateTimeFormatter)', () => {

        it('test_format_formatter()', () => {
            const f = DateTimeFormatter.ofPattern('y M d H m s');
            const t = LocalDateTime.of(2010, 12, 3, 11, 30, 45).format(f);
            assertEquals(t, '2010 12 3 11 30 45');
        });

        // TODO tests are missing in threeten bp
        it('test_format_formatter_2()', () => {
            const f = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
            const t = LocalDateTime.of(2010, 12, 3, 11, 30, 45).format(f);
            assertEquals(t, '2010-12-03 11:30:45');
        });

        it('test_format_formatter_null', () => {
            expect(() => {
                LocalDateTime.of(2010, 12, 3, 11, 30, 45).format(null);
            }).to.throw(NullPointerException);
        });
    });

});
