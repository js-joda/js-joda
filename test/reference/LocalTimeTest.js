/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, assertTrue, assertNotNull, isCoverageTestRunner} from '../testUtils';

import {MathUtil} from '../../src/MathUtil';
import {
    DateTimeException, DateTimeParseException,
    NullPointerException, UnsupportedTemporalTypeException,
    IllegalArgumentException
} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {Duration} from '../../src/Duration';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {Instant} from '../../src/Instant';
import {Period} from '../../src/Period';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';

import {MockSimplePeriod} from './MockSimplePeriod';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';

import '../_init';

describe('org.threeten.bp.TestLocalTime', function () {
    const TEST_12_30_40_987654321 = LocalTime.of(12, 30, 40, 987654321);
    let INVALID_UNITS;


    beforeEach(function () {
        INVALID_UNITS = [ChronoUnit.WEEKS, ChronoUnit.MONTHS, ChronoUnit.YEARS, ChronoUnit.ERAS];
    });

    function check(time, h, m, s, n) {
        assertEquals(time.hour(), h);
        assertEquals(time.minute(), m);
        assertEquals(time.second(), s);
        assertEquals(time.nano(), n);
    }

    describe('const', function () {
        it('constant_MIDNIGHT', () => {
            check(LocalTime.MIDNIGHT, 0, 0, 0, 0);
        });

        it('constant_MIDNIGHT_equal', () => {
            assertEquals(LocalTime.MIDNIGHT, LocalTime.MIDNIGHT);
            assertEquals(LocalTime.MIDNIGHT, LocalTime.of(0, 0));
        });

        it('constant_MIDDAY', () => {
            check(LocalTime.NOON, 12, 0, 0, 0);
        });

        it('constant_MIDDAY_equal', () => {
            assertEquals(LocalTime.NOON, LocalTime.NOON);
            assertEquals(LocalTime.NOON, LocalTime.of(12, 0));
        });

        it('constant_MIN_TIME', () => {
            check(LocalTime.MIN, 0, 0, 0, 0);
        });

        it('constant_MIN_TIME_equal', () => {
            assertEquals(LocalTime.MIN, LocalTime.of(0, 0));
        });

        it('constant_MAX_TIME', () => {
            check(LocalTime.MAX, 23, 59, 59, 999999999);
        });

        it('constant_MAX_TIME_equal', () => {
            assertEquals(LocalTime.NOON, LocalTime.NOON);
            assertEquals(LocalTime.NOON, LocalTime.of(12, 0));
        });

    });

    describe('now()', () => {

        it('now()', () => {
            const expected = LocalTime.now(Clock.systemDefaultZone());
            const test = LocalTime.now();
            const diff = Math.abs(test.toNanoOfDay() - expected.toNanoOfDay());
            assertTrue(diff < 100000000);  // less than 0.1 secs
        });

    });

    describe('now(ZoneId)', () => {

        it('now_ZoneId()', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            let expected = LocalTime.now(Clock.system(zone));
            let test = LocalTime.now(zone);
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalTime.now(Clock.system(zone));
                test = LocalTime.now(zone);
            }
            assertEquals(test, expected);
        });

    });


    describe('now(Clock)', () => {

        const delta = isCoverageTestRunner() ? 937 : 13;
        it('now_Clock_allSecsInDay()', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i += delta) {
                const instant = Instant.ofEpochSecond(i, 8);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = LocalTime.now(clock);
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv(i, (60 * 60)), 24));
                assertEquals(test.minute(), MathUtil.intMod(MathUtil.intDiv(i, 60), 60));
                assertEquals(test.second(), i % 60);
                assertEquals(test.nano(), 8);
            }
        });

        it('now_Clock_beforeEpoch()', () => {
            for (let i =-1; i >= -(24 * 60 * 60); i -= delta) {
                const instant = Instant.ofEpochSecond(i, 8);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = LocalTime.now(clock);
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv((i + 24 * 60 * 60), (60 * 60)), 24));
                assertEquals(test.minute(), (MathUtil.intDiv((i + 24 * 60 * 60), 60) % 60));
                assertEquals(test.second(), (i + 24 * 60 * 60) % 60);
                assertEquals(test.nano(), 8);
            }
        });

        //-----------------------------------------------------------------------
        it('now_Clock_max', () => {
            const clock = Clock.fixed(Instant.MAX, ZoneOffset.UTC);
            const test = LocalTime.now(clock);
            assertEquals(test.hour(), 23);
            assertEquals(test.minute(), 59);
            assertEquals(test.second(), 59);
            assertEquals(test.nano(), 999999999);
        });

        it('now_Clock_min', () => {
            const clock = Clock.fixed(Instant.MIN, ZoneOffset.UTC);
            const test = LocalTime.now(clock);
            assertEquals(test.hour(), 0);
            assertEquals(test.minute(), 0);
            assertEquals(test.second(), 0);
            assertEquals(test.nano(), 0);
        });

    });

    describe('of() factories', function () {

        it('factory_time_2ints', () => {
            const test = LocalTime.of(12, 30);
            check(test, 12, 30, 0, 0);
        });

        it('factory_time_2ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_time_3ints', () => {
            const test = LocalTime.of(12, 30, 40);
            check(test, 12, 30, 40, 0);
        });

        it('factory_time_3ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_secondTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_secondTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_time_4ints', () => {
            let test = LocalTime.of(12, 30, 40, 987654321);
            check(test, 12, 30, 40, 987654321);
            test = LocalTime.of(12, 0, 40, 987654321);
            check(test, 12, 0, 40, 987654321);
        });

        it('factory_time_4ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_secondTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_secondTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_nanoTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_nanoTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 0, 1000000000);
            }).to.throw(DateTimeException);
        });

    });


    describe('ofSecondOfDay(long)', () => {

        it('factory_ofSecondOfDay()', () => {
            const localTime = LocalTime.ofSecondOfDay(2 * 60 * 60 + 17 * 60 + 23);
            check(localTime, 2, 17, 23, 0);
        });

        it('factory_ofSecondOfDay_tooLow', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(-1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_tooHigh', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(24 * 60 * 60);
            }).to.throw(DateTimeException);
        });

    });

    describe('ofSecondOfDay(long, int)', function () {

        it('factory_ofSecondOfDay_long_int()', () => {
            const localTime = LocalTime.ofSecondOfDay(2 * 60 * 60 + 17 * 60 + 23, 987);
            check(localTime, 2, 17, 23, 987);
        });

        it('factory_ofSecondOfDay_long_int_tooLowSecs', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(-1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooHighSecs', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(24 * 60 * 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooLowNanos', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooHighNanos', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(0, 1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('ofNanoOfDay(long)', () => {

        it('factory_ofNanoOfDay()', () => {
            const localTime = LocalTime.ofNanoOfDay(60 * 60 * 1000000000 + 17);
            check(localTime, 1, 0, 0, 17);
        });

        it('factory_ofNanoOfDay_tooLow', () => {
            expect(() => {
                LocalTime.ofNanoOfDay(-1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofNanoOfDay_tooHigh()', () => {
            expect(() => {
                LocalTime.ofNanoOfDay(24 * 60 * 60 * 1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('from()', () => {

        it('factory_from_DateTimeAccessor', () => {
            assertEquals(LocalTime.from(LocalTime.of(17, 30)), LocalTime.of(17, 30));
            assertEquals(LocalTime.from(LocalDateTime.of(2012, 5, 1, 17, 30)), LocalTime.of(17, 30));
        });

        it('factory_from_DateTimeAccessor_invalid_noDerive', () => {
            expect(() => {
                LocalTime.from(LocalDate.of(2007, 7, 15));
            }).to.throw(DateTimeException);
        });

        it('factory_from_DateTimeAccessor_null', () => {
            expect(() => {
                LocalTime.from(null);
            }).to.throw(NullPointerException);

        });

    });

    function provider_sampleToString() {
        return [
            [0, 0, 0, 0, '00:00'],
            [1, 0, 0, 0, '01:00'],
            [23, 0, 0, 0, '23:00'],
            [0, 1, 0, 0, '00:01'],
            [12, 30, 0, 0, '12:30'],
            [23, 59, 0, 0, '23:59'],
            [0, 0, 1, 0, '00:00:01'],
            [0, 0, 59, 0, '00:00:59'],
            [0, 0, 0, 100000000, '00:00:00.100'],
            [0, 0, 0, 10000000, '00:00:00.010'],
            [0, 0, 0, 1000000, '00:00:00.001'],
            [0, 0, 0, 100000, '00:00:00.000100'],
            [0, 0, 0, 10000, '00:00:00.000010'],
            [0, 0, 0, 1000, '00:00:00.000001'],
            [0, 0, 0, 100, '00:00:00.000000100'],
            [0, 0, 0, 10, '00:00:00.000000010'],
            [0, 0, 0, 1, '00:00:00.000000001'],
            [0, 0, 0, 999999999, '00:00:00.999999999'],
            [0, 0, 0, 99999999, '00:00:00.099999999'],
            [0, 0, 0, 9999999, '00:00:00.009999999'],
            [0, 0, 0, 999999, '00:00:00.000999999'],
            [0, 0, 0, 99999, '00:00:00.000099999'],
            [0, 0, 0, 9999, '00:00:00.000009999'],
            [0, 0, 0, 999, '00:00:00.000000999'],
            [0, 0, 0, 99, '00:00:00.000000099'],
            [0, 0, 0, 9, '00:00:00.000000009']
        ];
    }

    function provider_sampleBadParse() {
        return [
            ['00;00'],
            ['12-00'],
            ['-01:00'],
            ['00:00:00-09'],
            ['00:00:00,09'],
            ['00:00:abs'],
            ['11'],
            ['11:30+01:00'],
            ['11:30+01:00[Europe/Paris]']
        ];
    }

    describe('parse()', () => {

        it('factory_parse_validText', () => {
            provider_sampleToString().forEach((data) => {
                factory_parse_validText.apply(this, data);
            });
        });

        function factory_parse_validText(h, m, s, n, parsable) {
            // console.log(h, m, s, n, parsable);
            const t = LocalTime.parse(parsable);
            assertNotNull(t, parsable);
            assertEquals(t.hour(), h);
            assertEquals(t.minute(), m);
            assertEquals(t.second(), s);
            assertEquals(t.nano(), n);
        }

        it('factory_parse_invalidText', () => {
            provider_sampleBadParse().forEach((data) => {
                factory_parse_invalidText.apply(this, data);
            });
        });

        function factory_parse_invalidText(unparsable) {
            expect(() => {
                LocalTime.parse(unparsable);
            }).to.throw(DateTimeParseException);
        }

        it('factory_parse_illegalHour', function () {
            expect(() => {
                LocalTime.parse('25:00');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_illegalMinute', function () {
            expect(() => {
                LocalTime.parse('12:60');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_illegalSecond', function () {
            expect(() => {
                LocalTime.parse('12:12:60');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_nullTest', function () {
            expect(() => {
                LocalTime.parse(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('parse(DateTimeFormatter)', () => {

        it('factory_parse_formatter()', () => {
            const f = DateTimeFormatter.ofPattern('H m s');
            const test = LocalTime.parse('14 30 40', f);
            assertEquals(test, LocalTime.of(14, 30, 40));
        });

        it('factory_parse_formatter_nullText()', () => {
            expect(() => {
                const f = DateTimeFormatter.ofPattern('H m s');
                LocalTime.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter()', () => {
            expect(() => {
                LocalTime.parse('ANY', null);
            }).to.throw(NullPointerException);
        });

    });

    describe('get(TemporalField)', () => {

        it('test_get_TemporalField()', () => {
            const test = TEST_12_30_40_987654321;
            assertEquals(test.get(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.get(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.get(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.get(ChronoField.NANO_OF_SECOND), 987654321);

            assertEquals(test.get(ChronoField.SECOND_OF_DAY), 12 * 3600 + 30 * 60 + 40);
            assertEquals(test.get(ChronoField.MINUTE_OF_DAY), 12 * 60 + 30);
            assertEquals(test.get(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.get(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
            assertEquals(test.get(ChronoField.CLOCK_HOUR_OF_DAY), 12);
            assertEquals(test.get(ChronoField.AMPM_OF_DAY), 1);
        });

        /* invalid test in javascript version
        it('test_get_TemporalField_tooBig', () => {
            expect(() => {
                TEST_12_30_40_987654321.get(ChronoField.NANO_OF_DAY);
            }).to.throw(DateTimeException);
        });
*/

        it('test_get_TemporalField_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.get(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_TemporalField_invalidField', () => {
            expect(() => {
                TEST_12_30_40_987654321.get(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_get_TemporalField_dateField', () => {
            expect(() => {
                TEST_12_30_40_987654321.get(ChronoField.DAY_OF_MONTH);
            }).to.throw(DateTimeException);
        });

    });

    describe('getLong(TemporalField)', () => {

        it('test_getLong_TemporalField()', () => {
            const test = TEST_12_30_40_987654321;
            assertEquals(test.getLong(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.getLong(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.getLong(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.getLong(ChronoField.NANO_OF_SECOND), 987654321);

            assertEquals(test.getLong(ChronoField.NANO_OF_DAY), ((12 * 3600 + 30 * 60 + 40) * 1000000000) + 987654321);
            assertEquals(test.getLong(ChronoField.SECOND_OF_DAY), 12 * 3600 + 30 * 60 + 40);
            assertEquals(test.getLong(ChronoField.MINUTE_OF_DAY), 12 * 60 + 30);
            assertEquals(test.getLong(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.getLong(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
            assertEquals(test.getLong(ChronoField.CLOCK_HOUR_OF_DAY), 12);
            assertEquals(test.getLong(ChronoField.AMPM_OF_DAY), 1);
        });

        it('test_getLong_TemporalField_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.getLong(null);
            }).to.throw(NullPointerException);
        });

        it('test_getLong_TemporalField_invalidField', () => {
            expect(() => {
                TEST_12_30_40_987654321.getLong(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_getLong_TemporalField_dateField', () => {
            expect(() => {
                TEST_12_30_40_987654321.getLong(ChronoField.DAY_OF_MONTH);
            }).to.throw(DateTimeException);
        });

    });

    describe('query(TemporalQuery)', () => {

        it('test_query', () => {
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.chronology()), null);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.localDate()), null);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.localTime()), TEST_12_30_40_987654321);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.offset()), null);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.precision()), ChronoUnit.NANOS);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.zone()), null);
            assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.zoneId()), null);
        });

        it('test_query_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.query(null);
            }).to.throw(NullPointerException);
        });

    });

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

        it('', () => {
            provider_sampleTimes().forEach((data) => {
                test_get.apply(this, data);
            });
        });

        function test_get(h, m, s, ns) {
            const a = LocalTime.of(h, m, s, ns);
            assertEquals(a.hour(), h);
            assertEquals(a.minute(), m);
            assertEquals(a.second(), s);
            assertEquals(a.nano(), ns);
        }

    });

    describe('with()', () => {

        it('test_with_adjustment()', () => {
            const sample = LocalTime.of(23, 5);
            const adjuster = {
                adjustInto: () => {
                    return sample;
                }
            };
            assertEquals(TEST_12_30_40_987654321.with(adjuster), sample);
        });

        it('test_with_adjustment_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.with(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('withHour()', () => {

        it('test_withHour_normal()', () => {
            let t = TEST_12_30_40_987654321;
            for (let i = 0; i < 24; i++) {
                t = t.withHour(i);
                assertEquals(t.hour(), i);
            }
        });

        it('test_withHour_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.withHour(12);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_withHour_toMidnight_equal', () => {
            const t = LocalTime.of(1, 0).withHour(0);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_withHour_toMidday_equal', () => {
            const t = LocalTime.of(1, 0).withHour(12);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_withHour_hourTooLow', () => {
            expect(() => {
                TEST_12_30_40_987654321.withHour(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withHour_hourTooHigh', () => {
            expect(() => {
                TEST_12_30_40_987654321.withHour(24);
            }).to.throw(DateTimeException);
        });
    });

    describe('withMinute()', () => {

        it('test_withMinute_normal()', () => {
            let t = TEST_12_30_40_987654321;
            for (let i = 0; i < 60; i++) {
                t = t.withMinute(i);
                assertEquals(t.minute(), i);
            }
        });

        it('test_withMinute_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.withMinute(30);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_withMinute_toMidnight_equal', () => {
            const t = LocalTime.of(0, 1).withMinute(0);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_withMinute_toMidday_equals', () => {
            const t = LocalTime.of(12, 1).withMinute(0);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_withMinute_minuteTooLow', () => {
            expect(() => {
                TEST_12_30_40_987654321.withMinute(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withMinute_minuteTooHigh', () => {
            expect(() => {
                TEST_12_30_40_987654321.withMinute(60);
            }).to.throw(DateTimeException);
        });

    });

    describe('withSecond()', () => {

        it('test_withSecond_normal()', () => {
            let t = TEST_12_30_40_987654321;
            for (let i = 0; i < 60; i++) {
                t = t.withSecond(i);
                assertEquals(t.second(), i);
            }
        });

        it('test_withSecond_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.withSecond(40);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_withSecond_toMidnight_equal', () => {
            const t = LocalTime.of(0, 0, 1).withSecond(0);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_withSecond_toMidday_equal', () => {
            const t = LocalTime.of(12, 0, 1).withSecond(0);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_withSecond_secondTooLow', () => {
            expect(() => {
                TEST_12_30_40_987654321.withSecond(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withSecond_secondTooHigh', () => {
            expect(() => {
                TEST_12_30_40_987654321.withSecond(60);
            }).to.throw(DateTimeException);
        });

    });

    describe('withNano()', () => {

        it('test_withNanoOfSecond_normal', () => {
            let t = TEST_12_30_40_987654321;
            t = t.withNano(1);
            assertEquals(t.nano(), 1);
            t = t.withNano(10);
            assertEquals(t.nano(), 10);
            t = t.withNano(100);
            assertEquals(t.nano(), 100);
            t = t.withNano(999999999);
            assertEquals(t.nano(), 999999999);
        });

        it('test_withNanoOfSecond_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.withNano(987654321);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_withNanoOfSecond_toMidnight_equal', () => {
            const t = LocalTime.of(0, 0, 0, 1).withNano(0);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_withNanoOfSecond_toMidday_equal', () => {
            const t = LocalTime.of(12, 0, 0, 1).withNano(0);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_withNanoOfSecond_nanoTooLow', () => {
            expect(() => {
                TEST_12_30_40_987654321.withNano(-1);
            }).to.throw(DateTimeException);
        });

        it('test_withNanoOfSecond_nanoTooHigh', () => {
            expect(() => {
                TEST_12_30_40_987654321.withNano(1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('truncated(TemporalUnit)', () => {

        class NINETY_MINS_TemporalUnit {
            toString() {
                return 'NinetyMins';
            }

            duration() {
                return Duration.ofMinutes(90);
            }

            isDurationEstimated() {
                return false;
            }

            isDateBased() {
                return false;
            }

            isTimeBased() {
                return true;
            }

            isSupportedBy() {
                return false;
            }
        }

        class NINETY_FIVE_MINS_TemporalUnit {
            toString() {
                return 'NinetyFiveMins';
            }

            duration() {
                return Duration.ofMinutes(95);
            }

            isDurationEstimated() {
                return false;
            }

            isDateBased() {
                return false;
            }

            isTimeBased() {
                return true;
            }

            isSupportedBy() {
                return false;
            }
        }

        const NINETY_MINS = new NINETY_MINS_TemporalUnit();
        const NINETY_FIVE_MINS = new NINETY_FIVE_MINS_TemporalUnit();

        function data_truncatedToValid() {
            return [
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.NANOS, LocalTime.of(1, 2, 3, 123456789)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.MICROS, LocalTime.of(1, 2, 3, 123456000)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.MILLIS, LocalTime.of(1, 2, 3, 123000000)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.SECONDS, LocalTime.of(1, 2, 3)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.MINUTES, LocalTime.of(1, 2)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.HOURS, LocalTime.of(1, 0)],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.DAYS, LocalTime.MIDNIGHT],

                [LocalTime.of(1, 1, 1, 123456789), NINETY_MINS, LocalTime.of(0, 0)],
                [LocalTime.of(2, 1, 1, 123456789), NINETY_MINS, LocalTime.of(1, 30)],
                [LocalTime.of(3, 1, 1, 123456789), NINETY_MINS, LocalTime.of(3, 0)]
            ];
        }

        it('test_truncatedTo_valid', () => {
            data_truncatedToValid().forEach((data) => {
                test_truncatedTo_valid.apply(this, data);
            });
        });

        function test_truncatedTo_valid(input, unit, expected) {
            assertEquals(input.truncatedTo(unit), expected);
        }

        function data_truncatedToInvalid() {
            return [
                [LocalTime.of(1, 2, 3, 123456789), NINETY_FIVE_MINS],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.WEEKS],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.MONTHS],
                [LocalTime.of(1, 2, 3, 123456789), ChronoUnit.YEARS]
            ];
        }

        it('test_truncatedTo_invalid', () => {
            data_truncatedToInvalid().forEach((data) => {
                test_truncatedTo_invalid.apply(this, data);
            });
        });

        function test_truncatedTo_invalid(input, unit) {
            expect(() => {
                input.truncatedTo(unit);
            }).to.throw(DateTimeException);
        }

        it('test_truncatedTo_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.truncatedTo(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('plus(PlusAdjuster)', () => {

        it('test_plus_Adjuster_positiveHours', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
            const t = TEST_12_30_40_987654321.plus(period);
            assertEquals(t, LocalTime.of(19, 30, 40, 987654321));
        });

        it('test_plus_Adjuster_negativeMinutes', () => {
            const period = MockSimplePeriod.of(-25, ChronoUnit.MINUTES);
            const t = TEST_12_30_40_987654321.plus(period);
            assertEquals(t, LocalTime.of(12, 5, 40, 987654321));
        });

        it('test_plus_Adjuster_zero', () => {
            const period = Period.ZERO;
            const t = TEST_12_30_40_987654321.plus(period);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plus_Adjuster_dateNotAllowed', () => {
            expect(() => {
                const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
                TEST_12_30_40_987654321.plus(period);
            }).to.throw(DateTimeException);
        });

        it('test_plus_Adjuster_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.plus(null);
            }).to.throw(NullPointerException);
        });

        it('test_plus_Adjuster_wrap', () => {
            const p = Duration.ofHours(1);
            const t = LocalTime.of(23, 30).plus(p);
            assertEquals(t, LocalTime.of(0, 30));
        });

    });

    describe('plus(long,PeriodUnit)', function () {

        it('test_plus_longPeriodUnit_positiveHours', () => {
            const t = TEST_12_30_40_987654321.plus(7, ChronoUnit.HOURS);
            assertEquals(t, LocalTime.of(19, 30, 40, 987654321));
        });

        it('test_plus_longPeriodUnit_negativeMinutes', () => {
            const t = TEST_12_30_40_987654321.plus(-25, ChronoUnit.MINUTES);
            assertEquals(t, LocalTime.of(12, 5, 40, 987654321));
        });

        it('test_plus_longPeriodUnit_zero', () => {
            const t = TEST_12_30_40_987654321.plus(0, ChronoUnit.MINUTES);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plus_long_unit_invalidUnit()', () => {
            for (let i = 0; i < INVALID_UNITS.length; i++) {
                const unit = INVALID_UNITS[i];
                expect(() => {
                    TEST_12_30_40_987654321.plus(1, unit);
                }).to.throw(DateTimeException);
            }
        });

        it('test_plus_long_multiples', () => {
            expect(() => {
                TEST_12_30_40_987654321.plus(0, ChronoUnit.DAYS);
            }).to.throw(UnsupportedTemporalTypeException);
        });

        it('test_plus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.plus(1, null);
            }).to.throw(NullPointerException);
        });

    });

    describe('plus(adjuster)', () => {

        it('test_plus_adjuster', () => {
            const p = Duration.ofSeconds(62, 3);
            const t = TEST_12_30_40_987654321.plus(p);
            assertEquals(t, LocalTime.of(12, 31, 42, 987654324));
        });

        it('test_plus_adjuster_big', () => {
            const p = Duration.ofNanos(MathUtil.MAX_SAFE_INTEGER);
            const t = TEST_12_30_40_987654321.plus(p);
            assertEquals(t, TEST_12_30_40_987654321.plusNanos(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_plus_adjuster_zero_equal', () => {
            const t = TEST_12_30_40_987654321.plus(Period.ZERO);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plus_adjuster_wrap', () => {
            const p = Duration.ofHours(1);
            const t = LocalTime.of(23, 30).plus(p);
            assertEquals(t, LocalTime.of(0, 30));
        });

        it('test_plus_adjuster_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.plus(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('plusHours()', () => {

        it('test_plusHours_one()', () => {
            let t = LocalTime.MIDNIGHT;
            for (let i = 0; i < 50; i++) {
                t = t.plusHours(1);
                assertEquals(t.hour(), (i + 1) % 24);
            }
        });

        it('test_plusHours_fromZero()', () => {
            const base = LocalTime.MIDNIGHT;
            for (let i = -50; i < 50; i++) {
                const t = base.plusHours(i);
                assertEquals(t.hour(), (i + 72) % 24);
            }
        });

        it('test_plusHours_fromOne()', () => {
            const base = LocalTime.of(1, 0);
            for (let i = -50; i < 50; i++) {
                const t = base.plusHours(i);
                assertEquals(t.hour(), (1 + i + 72) % 24);
            }
        });

        it('test_plusHours_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.plusHours(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusHours_toMidnight_equal', () => {
            const t = LocalTime.of(23, 0).plusHours(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_plusHours_toMidday_equal', () => {
            const t = LocalTime.of(11, 0).plusHours(1);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_plusHours_big()', () => {
            const t = LocalTime.of(2, 30).plusHours(MathUtil.MAX_SAFE_INTEGER);
            const hours = (MathUtil.MAX_SAFE_INTEGER % 24);
            assertEquals(t, LocalTime.of(2, 30).plusHours(hours));
        });

    });

    describe('plusMinutes()', () => {

        it('test_plusMinutes_one()', () => {
            let t = LocalTime.MIDNIGHT;
            let hour = 0;
            let min = 0;
            for (let i = 0; i < 70; i++) {
                t = t.plusMinutes(1);
                min++;
                if (min === 60) {
                    hour++;
                    min = 0;
                }
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_plusMinutes_fromZero()', () => {
            const base = LocalTime.MIDNIGHT;
            let hour;
            let min;
            for (let i = -70; i < 70; i++) {
                const t = base.plusMinutes(i);
                if (i < -60) {
                    hour = 22;
                    min = i + 120;
                } else if (i < 0) {
                    hour = 23;
                    min = i + 60;
                } else if (i >= 60) {
                    hour = 1;
                    min = i - 60;
                } else {
                    hour = 0;
                    min = i;
                }
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_plusMinutes_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.plusMinutes(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusMinutes_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.plusMinutes(24 * 60);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusMinutes_toMidnight_equal', () => {
            const t = LocalTime.of(23, 59).plusMinutes(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_plusMinutes_toMidday_equal', () => {
            const t = LocalTime.of(11, 59).plusMinutes(1);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_plusMinutes_big()', () => {
            const t = LocalTime.of(2, 30).plusMinutes(MathUtil.MAX_SAFE_INTEGER);
            const mins = MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, (24 * 60));
            assertEquals(t, LocalTime.of(2, 30).plusMinutes(mins));
        });

    });

    describe('plusSeconds()', () => {

        it('test_plusSeconds_one()', () => {
            let t = LocalTime.MIDNIGHT;
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
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
            }
        });

        it('test_plusSeconds_fromZero', () => {
            const base = LocalTime.MIDNIGHT;
            let i = -3660;
            const delta = 30;
            let hour = 22;
            let min = 59;
            let sec = 0;
            const iEnd = 3660;

            while(i <= iEnd){
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
                const t = base.plusSeconds(i);
                assertEquals(hour, t.hour());
                assertEquals(min, t.minute());
                assertEquals(sec, t.second());
            }
        });

        it('test_plusSeconds_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.plusSeconds(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusSeconds_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.plusSeconds(24 * 60 * 60);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusSeconds_toMidnight_equal', () => {
            const t = LocalTime.of(23, 59, 59).plusSeconds(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_plusSeconds_toMidday_equal', () => {
            const t = LocalTime.of(11, 59, 59).plusSeconds(1);
            assertEquals(t, LocalTime.NOON);
        });

    });

    describe('plusNanos()', () => {

        it('test_plusNanos_halfABillion()', () => {
            let t = LocalTime.MIDNIGHT;
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
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
                assertEquals(t.nano(), nanos);
            }
        });

        it('test_plusNanos_fromZero', () => {
            const base = LocalTime.MIDNIGHT;
            const delta = 7500000000;
            let i = -3660 * 1000000000;
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
                        sec %= 60;
                        if (min === 60) {
                            hour++;
                            min = 0;
                            if (hour === 24) {
                                hour = 0;
                            }
                        }
                    }
                }
                const t = base.plusNanos(i);

                assertEquals(hour, t.hour());
                assertEquals(min, t.minute());
                assertEquals(sec, t.second());
                assertEquals(nanos, t.nano());
            }
        });

        it('test_plusNanos_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.plusNanos(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusNanos_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.plusNanos(24 * 60 * 60 * 1000000000);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_plusNanos_toMidnight_equal', () => {
            const t = LocalTime.of(23, 59, 59, 999999999).plusNanos(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_plusNanos_toMidday_equal', () => {
            const t = LocalTime.of(11, 59, 59, 999999999).plusNanos(1);
            assertEquals(t, LocalTime.NOON);
        });

    });

    describe('minus(MinusAdjuster)', () => {

        it('test_minus_Adjuster', () => {
            const p = Duration.ofSeconds(62, 3);
            const t = TEST_12_30_40_987654321.minus(p);
            assertEquals(t, LocalTime.of(12, 29, 38, 987654318));
        });

        it('test_minus_Adjuster_positiveHours', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
            const t = TEST_12_30_40_987654321.minus(period);
            assertEquals(t, LocalTime.of(5, 30, 40, 987654321));
        });

        it('test_minus_Adjuster_negativeMinutes', () => {
            const period = MockSimplePeriod.of(-25, ChronoUnit.MINUTES);
            const t = TEST_12_30_40_987654321.minus(period);
            assertEquals(t, LocalTime.of(12, 55, 40, 987654321));
        });

        it('test_minus_Adjuster_big1', () => {
            const p = Duration.ofNanos(MathUtil.MAX_SAFE_INTEGER);
            const t = TEST_12_30_40_987654321.minus(p);
            assertEquals(t, TEST_12_30_40_987654321.minusNanos(MathUtil.MAX_SAFE_INTEGER));
        });

        it('test_minus_Adjuster_zero', () => {
            const p = Period.ZERO;
            const t = TEST_12_30_40_987654321.minus(p);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minus_Adjuster_wrap', () => {
            const p = Duration.ofHours(1);
            const t = LocalTime.of(0, 30).minus(p);
            assertEquals(t, LocalTime.of(23, 30));
        });

        it('test_minus_Adjuster_dateNotAllowed', () => {
            expect(() => {
                const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
                TEST_12_30_40_987654321.minus(period);
            }).to.throw(DateTimeException);
        });

        it('test_minus_Adjuster_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.minus(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('minus(long,PeriodUnit)', function () {

        it('test_minus_longPeriodUnit_positiveHours', () => {
            const t = TEST_12_30_40_987654321.minus(7, ChronoUnit.HOURS);
            assertEquals(t, LocalTime.of(5, 30, 40, 987654321));
        });

        it('test_minus_longPeriodUnit_negativeMinutes', () => {
            const t = TEST_12_30_40_987654321.minus(-25, ChronoUnit.MINUTES);
            assertEquals(t, LocalTime.of(12, 55, 40, 987654321));
        });

        it('test_minus_longPeriodUnit_zero', () => {
            const t = TEST_12_30_40_987654321.minus(0, ChronoUnit.MINUTES);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minus_long_unit_invalidUnit()', () => {
            for (let i = 0; i < INVALID_UNITS.length; i++) {
                const unit = INVALID_UNITS[i];
                expect(() => {
                    TEST_12_30_40_987654321.minus(1, unit);
                }).to.throw(DateTimeException);
            }
        });

        it('test_minus_long_multiples', () => {
            expect(() => {
                TEST_12_30_40_987654321.minus(0, ChronoUnit.DAYS);
            }).to.throw(UnsupportedTemporalTypeException);
        });

        it('test_minus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_12_30_40_987654321.minus(1, null);
            }).to.throw(NullPointerException);
        });

    });

    describe('minusHours()', () => {

        it('test_minusHours_one()', () => {
            let t = LocalTime.MIDNIGHT;
            for (let i = 0; i < 50; i++) {
                t = t.minusHours(1);
                assertEquals(t.hour(), (((-i + 23) % 24) + 24) % 24, String.valueOf(i));
            }
        });

        it('test_minusHours_fromZero()', () => {
            const base = LocalTime.MIDNIGHT;
            for (let i = -50; i < 50; i++) {
                const t = base.minusHours(i);
                assertEquals(t.hour(), ((-i % 24) + 24) % 24);
            }
        });

        it('test_minusHours_fromOne()', () => {
            const base = LocalTime.of(1, 0);
            for (let i = -50; i < 50; i++) {
                const t = base.minusHours(i);
                assertEquals(t.hour(), (1 + (-i % 24) + 24) % 24);
            }
        });

        it('test_minusHours_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.minusHours(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusHours_toMidnight_equal', () => {
            const t = LocalTime.of(1, 0).minusHours(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_minusHours_toMidday_equal', () => {
            const t = LocalTime.of(13, 0).minusHours(1);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_minusHours_big()', () => {
            const t = LocalTime.of(2, 30).minusHours(MathUtil.MAX_SAFE_INTEGER);
            const hours = MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, 24);
            assertEquals(t, LocalTime.of(2, 30).minusHours(hours));
        });

    });

    describe('minusMinutes()', () => {

        it('test_minusMinutes_one()', () => {
            let t = LocalTime.MIDNIGHT;
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
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_minusMinutes_fromZero()', () => {
            const base = LocalTime.MIDNIGHT;
            let hour = 22;
            let min = 49;
            for (let i = 70; i > -70; i--) {
                const t = base.minusMinutes(i);
                min++;

                if (min === 60) {
                    hour++;
                    min = 0;

                    if (hour === 24) {
                        hour = 0;
                    }
                }

                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
            }
        });

        it('test_minusMinutes_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.minusMinutes(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusMinutes_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.minusMinutes(24 * 60);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusMinutes_toMidnight_equal', () => {
            const t = LocalTime.of(0, 1).minusMinutes(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_minusMinutes_toMidday_equals', () => {
            const t = LocalTime.of(12, 1).minusMinutes(1);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_minusMinutes_big()', () => {
            const t = LocalTime.of(2, 30).minusMinutes(MathUtil.MAX_SAFE_INTEGER);
            const mins = MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, (24 * 60));
            assertEquals(t, LocalTime.of(2, 30).minusMinutes(mins));
        });

    });

    describe('minusSeconds()', () => {

        it('test_minusSeconds_one()', () => {
            let t = LocalTime.MIDNIGHT;
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
                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
            }
        });

        it('test_minusSeconds_fromZero', function () {
            const base = LocalTime.MIDNIGHT;
            const delta = 30;
            let i = 3660;
            let hour = 22;
            let min = 59;
            let sec = 0;
            const iEnd = -3660;
            while (i < iEnd) {
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
                const t = base.minusSeconds(i);

                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
            }
        });

        it('test_minusSeconds_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.minusSeconds(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusSeconds_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.minusSeconds(24 * 60 * 60);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusSeconds_toMidnight_equal', () => {
            const t = LocalTime.of(0, 0, 1).minusSeconds(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_minusSeconds_toMidday_equal', () => {
            const t = LocalTime.of(12, 0, 1).minusSeconds(1);
            assertEquals(t, LocalTime.NOON);
        });

        it('test_minusSeconds_big()', () => {
            const t = LocalTime.of(2, 30).minusSeconds(MathUtil.MAX_SAFE_INTEGER);
            const secs = MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, (24 * 60 * 60));
            assertEquals(t, LocalTime.of(2, 30).minusSeconds(secs));
        });

    });

    describe('minusNanos()', () => {

        it('test_minusNanos_halfABillion()', () => {
            let t = LocalTime.MIDNIGHT;
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

                assertEquals(t.hour(), hour);
                assertEquals(t.minute(), min);
                assertEquals(t.second(), sec);
                assertEquals(t.nano(), nanos);
            }
        });

        it('test_minusNanos_fromZero', function () {
            const base = LocalTime.MIDNIGHT;
            const delta = 7500000000;
            let i = 3660 * 1000000000;
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
                        sec %= 60;
                        if (min === 60) {
                            hour++;
                            min = 0;
                            if (hour === 24) {
                                hour = 0;
                            }
                        }
                    }
                }
                const t = base.minusNanos(i);
                assertEquals(hour, t.hour());
                assertEquals(min, t.minute());
                assertEquals(sec, t.second());
                assertEquals(nanos, t.nano());
            }

        });

        it('test_minusNanos_noChange_equal', () => {
            const t = TEST_12_30_40_987654321.minusNanos(0);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusNanos_noChange_oneDay_equal()', () => {
            const t = TEST_12_30_40_987654321.minusNanos(24 * 60 * 60 * 1000000000);
            assertEquals(t, TEST_12_30_40_987654321);
        });

        it('test_minusNanos_toMidnight_equal', () => {
            const t = LocalTime.of(0, 0, 0, 1).minusNanos(1);
            assertEquals(t, LocalTime.MIDNIGHT);
        });

        it('test_minusNanos_toMidday_equal', () => {
            const t = LocalTime.of(12, 0, 0, 1).minusNanos(1);
            assertEquals(t, LocalTime.NOON);
        });

    });


    describe('until()', () => {

        function provider_until() {
            return [
                ['00:00', '00:00', ChronoUnit.NANOS, 0],
                ['00:00', '00:00', ChronoUnit.MICROS, 0],
                ['00:00', '00:00', ChronoUnit.MILLIS, 0],
                ['00:00', '00:00', ChronoUnit.SECONDS, 0],
                ['00:00', '00:00', ChronoUnit.MINUTES, 0],
                ['00:00', '00:00', ChronoUnit.HOURS, 0],
                ['00:00', '00:00', ChronoUnit.HALF_DAYS, 0],

                ['00:00', '00:00:01', ChronoUnit.NANOS, 1000000000],
                ['00:00', '00:00:01', ChronoUnit.MICROS, 1000000],
                ['00:00', '00:00:01', ChronoUnit.MILLIS, 1000],
                ['00:00', '00:00:01', ChronoUnit.SECONDS, 1],
                ['00:00', '00:00:01', ChronoUnit.MINUTES, 0],
                ['00:00', '00:00:01', ChronoUnit.HOURS, 0],
                ['00:00', '00:00:01', ChronoUnit.HALF_DAYS, 0],

                ['00:00', '00:01', ChronoUnit.NANOS, 60000000000],
                ['00:00', '00:01', ChronoUnit.MICROS, 60000000],
                ['00:00', '00:01', ChronoUnit.MILLIS, 60000],
                ['00:00', '00:01', ChronoUnit.SECONDS, 60],
                ['00:00', '00:01', ChronoUnit.MINUTES, 1],
                ['00:00', '00:01', ChronoUnit.HOURS, 0],
                ['00:00', '00:01', ChronoUnit.HALF_DAYS, 0]
            ];
        }

        it('test_until', function () {
            provider_until().forEach((data) => {
                test_until.apply(this, data);
            });
        });

        function test_until(startStr, endStr, unit, expected) {
            const start = LocalTime.parse(startStr);
            const end = LocalTime.parse(endStr);
            assertEquals(start.until(end, unit), expected);
            assertEquals(end.until(start, unit), MathUtil.safeZero(-expected));
        }

    });

    describe('atDate()', () => {

        it('test_atDate', () => {
            const t = LocalTime.of(11, 30);
            assertEquals(t.atDate(LocalDate.of(2012, 6, 30)), LocalDateTime.of(2012, 6, 30, 11, 30));
        });

        it('test_atDate_nullDate', () => {
            expect(() => {
                TEST_12_30_40_987654321.atDate(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('toSecondOfDay()', () => {

        const delta = isCoverageTestRunner() ? 97 : 7;

        it('test_toSecondOfDay()', () => {
            let t = LocalTime.of(0, 0);
            for (let i = 0; i < 24 * 60 * 60; i+=delta) {
                assertEquals(t.toSecondOfDay(), i);
                t = t.plusSeconds(delta);
            }
        });

        it('test_toSecondOfDay_fromNanoOfDay_symmetry()', () => {
            let t = LocalTime.of(0, 0);
            for (let i = 0; i < 24 * 60 * 60; i+=delta) {
                assertEquals(LocalTime.ofSecondOfDay(t.toSecondOfDay()), t);
                t = t.plusSeconds(delta);
            }
        });

    });

    describe('toNanoOfDay()', () => {

        const delta = isCoverageTestRunner() ? 997 : 167;

        it('test_toNanoOfDay()', () => {
            let t = LocalTime.of(0, 0);
            const nanosOfDay = 24 * 60 * 60 * 1000000000;

            for (let i = 0; i < 1000000; i+=delta) {
                assertEquals(t.toNanoOfDay(), i);
                t = t.plusNanos(delta);
            }
            t = LocalTime.of(0, 0);
            for (let i = delta; i <= 1000000; i+=delta) {
                t = t.minusNanos(delta);
                assertEquals(t.toNanoOfDay(), nanosOfDay - i);
            }
        });

        it('test_toNanoOfDay_fromNanoOfDay_symmetry()', () => {
            let t = LocalTime.of(0, 0);
            for (let i = 0; i < 1000000; i+=delta) {
                assertEquals(LocalTime.ofNanoOfDay(t.toNanoOfDay()), t);
                t = t.plusNanos(delta);
            }
            t = LocalTime.of(0, 0);
            for (let i = 1; i <= 1000000; i+=delta) {
                t = t.minusNanos(delta);
                assertEquals(LocalTime.ofNanoOfDay(t.toNanoOfDay()), t);
            }
        });

    });

    describe('compareTo()', () => {

        it('test_comparisons', () => {
            doTest_comparisons_LocalTime(
                LocalTime.MIDNIGHT,
                LocalTime.of(0, 0, 0, 999999999),
                LocalTime.of(0, 0, 59, 0),
                LocalTime.of(0, 0, 59, 999999999),
                LocalTime.of(0, 59, 0, 0),
                LocalTime.of(0, 59, 0, 999999999),
                LocalTime.of(0, 59, 59, 0),
                LocalTime.of(0, 59, 59, 999999999),
                LocalTime.NOON,
                LocalTime.of(12, 0, 0, 999999999),
                LocalTime.of(12, 0, 59, 0),
                LocalTime.of(12, 0, 59, 999999999),
                LocalTime.of(12, 59, 0, 0),
                LocalTime.of(12, 59, 0, 999999999),
                LocalTime.of(12, 59, 59, 0),
                LocalTime.of(12, 59, 59, 999999999),
                LocalTime.of(23, 0, 0, 0),
                LocalTime.of(23, 0, 0, 999999999),
                LocalTime.of(23, 0, 59, 0),
                LocalTime.of(23, 0, 59, 999999999),
                LocalTime.of(23, 59, 0, 0),
                LocalTime.of(23, 59, 0, 999999999),
                LocalTime.of(23, 59, 59, 0),
                LocalTime.of(23, 59, 59, 999999999)
            );
        });

        function doTest_comparisons_LocalTime(...localTimes) {
            for (let i = 0; i < localTimes.length; i++) {
                const a = localTimes[i];
                for (let j = 0; j < localTimes.length; j++) {
                    const b = localTimes[j];
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
                TEST_12_30_40_987654321.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('test_isBefore_ObjectNull', () => {
            expect(() => {
                TEST_12_30_40_987654321.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter_ObjectNull', () => {
            expect(() => {
                TEST_12_30_40_987654321.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('compareToNonLocalTime', () => {
            expect(() => {
                TEST_12_30_40_987654321.compareTo({});
            }).to.throw(IllegalArgumentException);
        });

    });

    describe('equals()', () => {

        it('test_equals_true', function () {
            provider_sampleTimes().forEach((data) => {
                test_equals_true.apply(this, data);
            });
        });

        function test_equals_true(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s, n);
            assertEquals(a.equals(b), true);
        }

        it('test_equals_false_hour_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_equals_false_hour_differs.apply(this, data);
            });
        });

        function test_equals_false_hour_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h + 1, m, s, n);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_false_minute_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_equals_false_minute_differs.apply(this, data);
            });
        });

        function test_equals_false_minute_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m + 1, s, n);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_false_second_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_equals_false_second_differs.apply(this, data);
            });
        });

        function test_equals_false_second_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s + 1, n);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_false_nano_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_equals_false_nano_differs.apply(this, data);
            });
        });

        function test_equals_false_nano_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s, n + 1);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_itself_true', () => {
            assertEquals(TEST_12_30_40_987654321.equals(TEST_12_30_40_987654321), true);
        });

        it('test_equals_string_false()', () => {
            assertEquals(TEST_12_30_40_987654321.equals('2007-07-15'), false);
        });

        it('test_equals_null_false', () => {
            assertEquals(TEST_12_30_40_987654321.equals(null), false);
        });

    });

    describe('hashCode()', () => {

        it('test_hashCode_same', function () {
            provider_sampleTimes().forEach((data) => {
                test_hashCode_same.apply(this, data);
            });
        });

        function test_hashCode_same(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s, n);
            assertEquals(a.hashCode(), b.hashCode());
        }

        it('test_hashCode_hour_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_hashCode_hour_differs.apply(this, data);
            });
        });

        function test_hashCode_hour_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h + 1, m, s, n);
            assertEquals(a.hashCode() === b.hashCode(), false);
        }

        it('test_hashCode_minute_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_hashCode_minute_differs.apply(this, data);
            });
        });

        function test_hashCode_minute_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m + 1, s, n);
            assertEquals(a.hashCode() === b.hashCode(), false);
        }

        it('test_hashCode_second_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_hashCode_second_differs.apply(this, data);
            });
        });

        function test_hashCode_second_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s + 1, n);
            assertEquals(a.hashCode() === b.hashCode(), false);
        }

        it('test_hashCode_nano_differs', function () {
            provider_sampleTimes().forEach((data) => {
                test_hashCode_nano_differs.apply(this, data);
            });
        });

        function test_hashCode_nano_differs(h, m, s, n) {
            const a = LocalTime.of(h, m, s, n);
            const b = LocalTime.of(h, m, s, n + 1);
            assertEquals(a.hashCode() === b.hashCode(), false);
        }

    });

    describe('toString()', () => {

        it('test_toString', function () {
            provider_sampleToString().forEach((data) => {
                test_toString.apply(this, data);
            });
        });

        function test_toString(h, m, s, n, expected) {
            // console.log(h, m, s, n, expected);
            const t = LocalTime.of(h, m, s, n);
            const str = t.toString();
            assertEquals(str, expected);
            assertEquals(t.toJSON(), str);
        }

    });


    describe('format(DateTimeFormatter)', () => {

        it('test_format_formatter()', () => {
            const f = DateTimeFormatter.ofPattern('H m s');
            const t = LocalTime.of(11, 30, 45).format(f);
            assertEquals(t, '11 30 45');
        });

        it('test_format_formatter_null', () => {
            expect(() => {
                LocalTime.of(11, 30, 45).format(null);
            }).to.throw(NullPointerException);
        });

    });
});
