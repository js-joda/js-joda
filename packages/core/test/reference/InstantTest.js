/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, dataProviderTest} from '../testUtils';

import '../_init';

import {
    DateTimeException, DateTimeParseException,
    NullPointerException, ArithmeticException, IllegalArgumentException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {Duration} from '../../src/Duration';
import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {MathUtil} from '../../src/MathUtil';
import {OffsetDateTime} from '../../src/OffsetDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';
import {ZonedDateTime} from '../../src/ZonedDateTime';

import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {CurrentStandardZoneEuropeParis} from '../zone/CurrentStandardZone';

const MIN_SECOND = Instant.MIN.epochSecond();
const MAX_SECOND = Instant.MAX.epochSecond();

describe('org.threeten.bp.TestInstant', () => {

    const TEST_12345_123456789 = Instant.ofEpochSecond(12345, 123456789);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);
    const ZONE_PARIS = new CurrentStandardZoneEuropeParis();

    function check(instant, epochSecs, nos) {
        expect(instant.epochSecond()).to.equal(epochSecs);
        expect(instant.nano()).to.equal(nos);
        expect(instant.equals(instant));
        expect(instant.equals(Instant.ofEpochSecond(epochSecs, nos)));
    }

    describe('constant', () => {
        it('EPOCH', () => {
            check(Instant.EPOCH, 0, 0);
        });
        it('MIN', () => {
            check(Instant.MIN, -31619119219200, 0);
        });
        it('MAX', () => {
            check(Instant.MAX, 31494816403199, 999999999);
        });
    });

    describe('now', () => {

        it('two calls of now should be closer the 0.1 secs', () => {
            const expected = Instant.now(Clock.systemUTC());
            const test = Instant.now();
            const diff = Math.abs(test.toEpochMilli() - expected.toEpochMilli());
            expect(diff).to.be.lessThan(100);  // less than 0.1 secs
        });

        it('now_Clock_allSecsInDay_utc', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                const expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(expected, ZoneOffset.UTC);
                const test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch', () => {
            for (let i = -1; i >= -(24 * 60 * 60); i -= 100) {
                const expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(expected, ZoneOffset.UTC);
                const test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });
    });

    describe('ofEpochSecond(long)', () => {

        it('factory_seconds_long()', () => {
            for (let i = -2; i <= 2; i++) {
                const t = Instant.ofEpochSecond(i);
                assertEquals(t.epochSecond(), i);
                assertEquals(t.nano(), 0);
            }
        });

    });

    describe('ofEpochSecond(long,long)', function () {

        it('factory_seconds_long_long()', () => {
            for (let i = -2; i <= 2; i++) {
                for (let j = 0; j < 10; j++) {
                    const t = Instant.ofEpochSecond(i, j);
                    assertEquals(t.epochSecond(), i);
                    assertEquals(t.nano(), j);
                }
                for (let j = -10; j < 0; j++) {
                    const t = Instant.ofEpochSecond(i, j);
                    assertEquals(t.epochSecond(), i - 1);
                    assertEquals(t.nano(), j + 1000000000);
                }
                for (let j = 999999990; j < 1000000000; j++) {
                    const t = Instant.ofEpochSecond(i, j);
                    assertEquals(t.epochSecond(), i);
                    assertEquals(t.nano(), j);
                }
            }
        });

        it('factory_seconds_long_long_nanosNegativeAdjusted', () => {
            const test = Instant.ofEpochSecond(2, -1);
            assertEquals(test.epochSecond(), 1);
            assertEquals(test.nano(), 999999999);
        });

        it('factory_seconds_long_long_tooBig', () => {
            expect(() => {
                Instant.ofEpochSecond(MAX_SECOND, 1000000000);
            }).to.throw(DateTimeException);
        });

        it('factory_seconds_long_long_tooBigBig', () => {
            expect(() => {
                Instant.ofEpochSecond(MathUtil.MAX_SAFE_INTEGER, MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

    });

    describe('ofEpochMilli(long)', () => {

        // @DataProvider(name="MillisInstantNoNanos")
        function provider_factory_millis_long() {
            return [
                [0, 0, 0],
                [1, 0, 1000000],
                [2, 0, 2000000],
                [999, 0, 999000000],
                [1000, 1, 0],
                [1001, 1, 1000000],
                [-1, -1, 999000000],
                [-2, -1, 998000000],
                [-999, -1, 1000000],
                [-1000, -1, 0],
                [-1001, -2, 999000000],
                // TODO Fix see https://github.com/ThreeTen/threetenbp/pull/54
                // [MathUtil.MAX_SAFE_INTEGER, MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000), MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, 1000) * 1000000],
                // [MathUtil.MAX_SAFE_INTEGER - 1, MathUtil.intDiv((MathUtil.MAX_SAFE_INTEGER - 1), 1000), MathUtil.intMod((MathUtil.MAX_SAFE_INTEGER - 1), 1000) * 1000000],
                // [MathUtil.MIN_SAFE_INTEGER, MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000) - 1, MathUtil.intMod(MathUtil.MIN_SAFE_INTEGER, 1000) * 1000000 + 1000000000],
                // [MathUtil.MIN_SAFE_INTEGER + 1, MathUtil.intDiv((MathUtil.MIN_SAFE_INTEGER + 1), 1000) - 1, MathUtil.intMod((MathUtil.MIN_SAFE_INTEGER + 1), 1000) * 1000000 + 1000000000]
            ];
        }

        it('factory_millis_long', function () {
            dataProviderTest(provider_factory_millis_long, factory_millis_long);
        });

        // @Test(dataProvider="MillisInstantNoNanos")
        function factory_millis_long(millis, expectedSeconds, expectedNanoOfSecond) {
            const t = Instant.ofEpochMilli(millis);
            assertEquals(t.epochSecond(), expectedSeconds);
            assertEquals(t.nano(), expectedNanoOfSecond);
            assertEquals(t.toEpochMilli(), millis);
        }

    });

    describe('parse(String)', function () {

        // see also parse tests under toString()
        // @DataProvider(name='Parse')
        function provider_factory_parse() {
            return [
                ['1970-01-01T00:00:00Z', 0, 0],
                ['1970-01-01t00:00:00Z', 0, 0],
                ['1970-01-01T00:00:00z', 0, 0],
                ['1970-01-01T00:00:00.0Z', 0, 0],
                ['1970-01-01T00:00:00.000000000Z', 0, 0],

                ['1970-01-01T00:00:00.000000001Z', 0, 1],
                ['1970-01-01T00:00:00.100000000Z', 0, 100000000],
                ['1970-01-01T00:00:01Z', 1, 0],
                ['1970-01-01T00:01:00Z', 60, 0],
                ['1970-01-01T00:01:01Z', 61, 0],
                ['1970-01-01T00:01:01.000000001Z', 61, 1],
                ['1970-01-01T01:00:00.000000000Z', 3600, 0],
                ['1970-01-01T01:01:01.000000001Z', 3661, 1],
                ['1970-01-02T01:01:01.100000000Z', 90061, 100000000]
            ];
        }

        it('factory_parse', function () {
            dataProviderTest(provider_factory_parse, factory_parse);
        });

        // @Test(dataProvider='Parse')
        function factory_parse(text, expectedEpochSeconds, expectedNanoOfSecond) {
            // console.log(text, expectedEpochSeconds, expectedNanoOfSecond);
            const t = Instant.parse(text);
            assertEquals(t.epochSecond(), expectedEpochSeconds);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }

        it('factory_parseLowercase', function () {
            dataProviderTest(provider_factory_parse, factory_parseLowercase);
        });

        // @Test(dataProvider='Parse')
        function factory_parseLowercase(text, expectedEpochSeconds, expectedNanoOfSecond) {
            const t = Instant.parse(text.toLowerCase(/*Locale.ENGLISH*/));
            assertEquals(t.epochSecond(), expectedEpochSeconds);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }

        // TODO: should comma be accepted?
        //    @Test(dataProvider='Parse')
        //    public void factory_parse_comma(text, expectedEpochSeconds, expectedNanoOfSecond) {
        //        text = text.replace('.', ',');
        //        const t = Instant.parse(text);
        //        assertEquals(t.epochSecond(), expectedEpochSeconds);
        //        assertEquals(t.nano(), expectedNanoOfSecond);
        //    }

        // @DataProvider(name='ParseFailures')
        function provider_factory_parseFailures() {
            return [
                [''],
                ['Z'],
                ['1970-01-01T00:00:00'],
                ['1970-01-01T00:00:0Z'],
                ['1970-01-01T00:00:00.0000000000Z']
            ];
        }

        it('factory_parseFailures', function () {
            dataProviderTest(provider_factory_parseFailures, factory_parseFailures);
        });

        // @Test(dataProvider='ParseFailures', expectedExceptions=DateTimeParseException.class)
        function factory_parseFailures(text) {
            expect(()=>{
                Instant.parse(text);
            }).to.throw(DateTimeParseException);
        }

        it('factory_parseFailures_comma', function () {
            dataProviderTest(provider_factory_parseFailures, factory_parseFailures_comma);
        });

        // @Test(dataProvider='ParseFailures', expectedExceptions=DateTimeParseException.class)
        function factory_parseFailures_comma(text) {
            expect(()=>{
                text = text.replace('.', ',');
                Instant.parse(text);
            }).to.throw(DateTimeParseException);
        }

        it('factory_parse_nullText', () => {
            expect(() => {
                Instant.parse(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('get(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            const test = TEST_12345_123456789;
            expect(test.get(ChronoField.NANO_OF_SECOND)).to.eql(123456789);
            expect(test.get(ChronoField.MICRO_OF_SECOND)).to.eql(123456);
            expect(test.get(ChronoField.MILLI_OF_SECOND)).to.eql(123);
        });

        it('test_getLong_TemporalField', () => {
            const test = TEST_12345_123456789;
            expect(test.getLong(ChronoField.NANO_OF_SECOND)).to.eql(123456789);
            expect(test.getLong(ChronoField.MICRO_OF_SECOND)).to.eql(123456);
            expect(test.getLong(ChronoField.MILLI_OF_SECOND)).to.eql(123);
            expect(test.getLong(ChronoField.INSTANT_SECONDS)).to.eql(12345);
        });
    });

    describe('query(TemporalQuery)', function () {

        it('test_query', () => {
            assertEquals(TEST_12345_123456789.query(TemporalQueries.chronology()), null);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.localDate()), null);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.localTime()), null);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.offset()), null);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.precision()), ChronoUnit.NANOS);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.zone()), null);
            assertEquals(TEST_12345_123456789.query(TemporalQueries.zoneId()), null);
        });

        it('test_query_null', () => {
            expect(() => {
                TEST_12345_123456789.query(null);
            }).to.throw(NullPointerException);
        });

    });

    // TODO tests are missing in threeten bp
    describe('adjustInto(Temporal)', () => {

        // @DataProvider(name='adjustInto')
        function data_adjustInto() {
            return [
                [Instant.ofEpochSecond(10, 200), Instant.ofEpochSecond(20), Instant.ofEpochSecond(10, 200), null],
                [Instant.ofEpochSecond(10, -200), Instant.now(), Instant.ofEpochSecond(10, -200), null],
                [Instant.ofEpochSecond(-10), Instant.EPOCH, Instant.ofEpochSecond(-10), null],
                [Instant.ofEpochSecond(10), Instant.MIN, Instant.ofEpochSecond(10), null],
                [Instant.ofEpochSecond(10), Instant.MAX, Instant.ofEpochSecond(10), null],

                [Instant.ofEpochSecond(10, 200), LocalDateTime.of(1970, 1, 1, 0, 0, 20).toInstant(ZoneOffset.UTC), Instant.ofEpochSecond(10, 200), null],
                [Instant.ofEpochSecond(10, 200), OffsetDateTime.of(1970, 1, 1, 0, 0, 20, 10, ZoneOffset.UTC), OffsetDateTime.of(1970, 1, 1, 0, 0, 10, 200, ZoneOffset.UTC), null],
                [Instant.ofEpochSecond(10, 200), OffsetDateTime.of(1970, 1, 1, 0, 0, 20, 10, OFFSET_PTWO), OffsetDateTime.of(1970, 1, 1, 2, 0, 10, 200, OFFSET_PTWO), null],
                [Instant.ofEpochSecond(10, 200), ZonedDateTime.of(1970, 1, 1, 0, 0, 20, 10, ZONE_PARIS), ZonedDateTime.of(1970, 1, 1, 1, 0, 10, 200, ZONE_PARIS), null],

                [Instant.ofEpochSecond(10, 200), LocalDateTime.of(1970, 1, 1, 0, 0, 20), null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), null, null, NullPointerException]

            ];
        }

        it('test_adjustInto', function () {
            dataProviderTest(data_adjustInto, test_adjustInto);
        });

        // @Test(dataProvider='adjustInto')
        function test_adjustInto(test, temporal, expected, expectedEx) {
            // console.log(test, temporal, expected, expectedEx);
            if (expectedEx == null) {
                const result = test.adjustInto(temporal);
                assertEquals(result, expected);
            } else {
                expect(()=> {
                    test.adjustInto(temporal);
                }).to.throw(expectedEx);
            }
        }

    });


    // TODO tests are missing in threeten bp
    describe('with(TemporalAdjuster)', () => {

        // @DataProvider(name='with')
        function data_with() {
            return [
                [Instant.ofEpochSecond(10, 200), Instant.ofEpochSecond(20), Instant.ofEpochSecond(20), null],
                [Instant.ofEpochSecond(10), Instant.ofEpochSecond(20, -100), Instant.ofEpochSecond(20, -100), null],
                [Instant.ofEpochSecond(-10), Instant.EPOCH, Instant.ofEpochSecond(0), null],
                [Instant.ofEpochSecond(10), Instant.MIN, Instant.MIN, null],
                [Instant.ofEpochSecond(10), Instant.MAX, Instant.MAX, null],

                [Instant.ofEpochSecond(10, 200), LocalDateTime.of(1970, 1, 1, 0, 0, 20).toInstant(ZoneOffset.UTC), Instant.ofEpochSecond(20), null],

                [Instant.ofEpochSecond(10, 200), LocalDateTime.of(1970, 1, 1, 0, 0, 20), null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), null, null, NullPointerException]
            ];
        }

        it('test_with_temporalAdjuster', function () {
            dataProviderTest(data_with, test_with_temporalAdjuster);
        });

        // @Test(dataProvider='with')
        function test_with_temporalAdjuster(test, adjuster, expected, expectedEx) {
            if (expectedEx == null) {
                const result = test.with(adjuster);
                assertEquals(result, expected);
            } else {
                expect(()=> {
                    test.with(adjuster);
                }).to.throw(expectedEx);
            }
        }

    });

    // TODO tests are missing in threeten bp
    describe('with(TemporalField, long)', function () {

        // @DataProvider(name='with_longTemporalField')
        function data_with_longTemporalField() {
            return [
                [Instant.ofEpochSecond(10, 200), ChronoField.INSTANT_SECONDS, 100, Instant.ofEpochSecond(100, 200), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.INSTANT_SECONDS, 0, Instant.ofEpochSecond(0, 200), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.INSTANT_SECONDS, -100, Instant.ofEpochSecond(-100, 200), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.NANO_OF_SECOND, 100, Instant.ofEpochSecond(10, 100), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.NANO_OF_SECOND, 0, Instant.ofEpochSecond(10), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.MICRO_OF_SECOND, 100, Instant.ofEpochSecond(10, 100 * 1000), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.MICRO_OF_SECOND, 0, Instant.ofEpochSecond(10), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.MILLI_OF_SECOND, 100, Instant.ofEpochSecond(10, 100 * 1000 * 1000), null],
                [Instant.ofEpochSecond(10, 200), ChronoField.MILLI_OF_SECOND, 0, Instant.ofEpochSecond(10), null],

                [Instant.ofEpochSecond(10, 200), ChronoField.NANO_OF_SECOND, 1000000000, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MICRO_OF_SECOND, 1000000, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MILLI_OF_SECOND, 1000, null, DateTimeException],

                [Instant.ofEpochSecond(10, 200), ChronoField.SECOND_OF_MINUTE, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.SECOND_OF_DAY, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.OFFSET_SECONDS, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.NANO_OF_DAY, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MINUTE_OF_HOUR, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MINUTE_OF_DAY, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MILLI_OF_DAY, 1, null, DateTimeException],
                [Instant.ofEpochSecond(10, 200), ChronoField.MICRO_OF_DAY, 1, null, DateTimeException]
            ];
        }

        it('test_with_longTemporalField', function () {
            dataProviderTest(data_with_longTemporalField, test_with_longTemporalField);
        });

        // @Test(dataProvider='with_longTemporalField')
        function test_with_longTemporalField(test, field, value, expected, expectedEx) {
            if (expectedEx == null) {
                const result = test.with(field, value);
                assertEquals(result, expected);
            } else {
                expect(()=> {
                    test.with(field, value);
                }).to.throw(expectedEx);
            }
        }

    });

    // TODO tests are missing in threeten bp
    describe('truncatedTo(TemporalUnit)', () => {

        const NINETY_MINUTES = {
            duration: () => { return Duration.ofMinutes(90); }
        };

        const NINETYFIVE_MINUTES = {
            duration: () => { return Duration.ofMinutes(95); }
        };

        // @DataProvider(name='truncatedToValid')
        function data_truncatedToValid() {
            return [
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.NANOS, Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.MICROS, Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456000)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.MILLIS, Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123000000)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.SECONDS, Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 0)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.MINUTES, Instant.ofEpochSecond(86400 + 3600 + 60, 0)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.HOURS, Instant.ofEpochSecond(86400 + 3600, 0)],
                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), ChronoUnit.DAYS, Instant.ofEpochSecond(86400, 0)],

                [Instant.ofEpochSecond(86400 + 3600 + 60 + 1, 123456789), NINETY_MINUTES, Instant.ofEpochSecond(86400 + 0, 0)],
                [Instant.ofEpochSecond(86400 + 7200 + 60 + 1, 123456789), NINETY_MINUTES, Instant.ofEpochSecond(86400 + 5400, 0)],
                [Instant.ofEpochSecond(86400 + 10800 + 60 + 1, 123456789),NINETY_MINUTES, Instant.ofEpochSecond(86400 + 10800, 0)]
            ];
        }

        it('test_truncatedTo_valid', function () {
            dataProviderTest(data_truncatedToValid, test_truncatedTo_valid);
        });

        // @Test(dataProvider='truncatedToValid')
        function test_truncatedTo_valid(input, unit, expected) {
            assertEquals(input.truncatedTo(unit), expected);
        }

        // @DataProvider(name='truncatedToInvalid')
        function data_truncatedToInvalid() {
            return [
                [Instant.ofEpochSecond(1, 123456789), NINETYFIVE_MINUTES],
                [Instant.ofEpochSecond(1, 123456789), ChronoUnit.WEEKS],
                [Instant.ofEpochSecond(1, 123456789), ChronoUnit.MONTHS],
                [Instant.ofEpochSecond(1, 123456789), ChronoUnit.YEARS]
            ];
        }

        it('test_truncatedTo_invalid', function () {
            dataProviderTest(data_truncatedToInvalid, test_truncatedTo_invalid);
        });

        // @Test(dataProvider='truncatedToInvalid', expectedExceptions=DateTimeException.class)
        function test_truncatedTo_invalid(input, unit) {
            expect(() => {
                input.truncatedTo(unit);
            }).to.throw(DateTimeException);
        }

        it('test_truncatedTo_null', () => {
            expect(() => {
                TEST_12345_123456789.truncatedTo(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('plus', () => {
        let dataProviderPlus;
        beforeEach(() => {
            dataProviderPlus = [
                [MIN_SECOND, 0, -MIN_SECOND, 0, 0, 0],

                [MIN_SECOND, 0, 1, 0, MIN_SECOND + 1, 0],
                [MIN_SECOND, 0, 0, 500, MIN_SECOND, 500],
                [MIN_SECOND, 0, 0, 1000000000, MIN_SECOND + 1, 0],

                [MIN_SECOND + 1, 0, -1, 0, MIN_SECOND, 0],
                [MIN_SECOND + 1, 0, 0, -500, MIN_SECOND, 999999500],
                [MIN_SECOND + 1, 0, 0, -1000000000, MIN_SECOND, 0],

                [-4, 666666667, -4, 666666667, -7, 333333334],
                [-4, 666666667, -3,         0, -7, 666666667],
                [-4, 666666667, -2,         0, -6, 666666667],
                [-4, 666666667, -1,         0, -5, 666666667],
                [-4, 666666667, -1, 333333334, -4,         1],
                [-4, 666666667, -1, 666666667, -4, 333333334],
                [-4, 666666667, -1, 999999999, -4, 666666666],
                [-4, 666666667,  0,         0, -4, 666666667],
                [-4, 666666667,  0,         1, -4, 666666668],
                [-4, 666666667,  0, 333333333, -3,         0],
                [-4, 666666667,  0, 666666666, -3, 333333333],
                [-4, 666666667,  1,         0, -3, 666666667],
                [-4, 666666667,  2,         0, -2, 666666667],
                [-4, 666666667,  3,         0, -1, 666666667],
                [-4, 666666667,  3, 333333333,  0,         0],

                [-3, 0, -4, 666666667, -7, 666666667],
                [-3, 0, -3,         0, -6,         0],
                [-3, 0, -2,         0, -5,         0],
                [-3, 0, -1,         0, -4,         0],
                [-3, 0, -1, 333333334, -4, 333333334],
                [-3, 0, -1, 666666667, -4, 666666667],
                [-3, 0, -1, 999999999, -4, 999999999],
                [-3, 0,  0,         0, -3,         0],
                [-3, 0,  0,         1, -3,         1],
                [-3, 0,  0, 333333333, -3, 333333333],
                [-3, 0,  0, 666666666, -3, 666666666],
                [-3, 0,  1,         0, -2,         0],
                [-3, 0,  2,         0, -1,         0],
                [-3, 0,  3,         0,  0,         0],
                [-3, 0,  3, 333333333,  0, 333333333],

                [-2, 0, -4, 666666667, -6, 666666667],
                [-2, 0, -3,         0, -5,         0],
                [-2, 0, -2,         0, -4,         0],
                [-2, 0, -1,         0, -3,         0],
                [-2, 0, -1, 333333334, -3, 333333334],
                [-2, 0, -1, 666666667, -3, 666666667],
                [-2, 0, -1, 999999999, -3, 999999999],
                [-2, 0,  0,         0, -2,         0],
                [-2, 0,  0,         1, -2,         1],
                [-2, 0,  0, 333333333, -2, 333333333],
                [-2, 0,  0, 666666666, -2, 666666666],
                [-2, 0,  1,         0, -1,         0],
                [-2, 0,  2,         0,  0,         0],
                [-2, 0,  3,         0,  1,         0],
                [-2, 0,  3, 333333333,  1, 333333333],

                [-1, 0, -4, 666666667, -5, 666666667],
                [-1, 0, -3,         0, -4,         0],
                [-1, 0, -2,         0, -3,         0],
                [-1, 0, -1,         0, -2,         0],
                [-1, 0, -1, 333333334, -2, 333333334],
                [-1, 0, -1, 666666667, -2, 666666667],
                [-1, 0, -1, 999999999, -2, 999999999],
                [-1, 0,  0,         0, -1,         0],
                [-1, 0,  0,         1, -1,         1],
                [-1, 0,  0, 333333333, -1, 333333333],
                [-1, 0,  0, 666666666, -1, 666666666],
                [-1, 0,  1,         0,  0,         0],
                [-1, 0,  2,         0,  1,         0],
                [-1, 0,  3,         0,  2,         0],
                [-1, 0,  3, 333333333,  2, 333333333],

                [-1, 666666667, -4, 666666667, -4, 333333334],
                [-1, 666666667, -3,         0, -4, 666666667],
                [-1, 666666667, -2,         0, -3, 666666667],
                [-1, 666666667, -1,         0, -2, 666666667],
                [-1, 666666667, -1, 333333334, -1,         1],
                [-1, 666666667, -1, 666666667, -1, 333333334],
                [-1, 666666667, -1, 999999999, -1, 666666666],
                [-1, 666666667,  0,         0, -1, 666666667],
                [-1, 666666667,  0,         1, -1, 666666668],
                [-1, 666666667,  0, 333333333,  0,         0],
                [-1, 666666667,  0, 666666666,  0, 333333333],
                [-1, 666666667,  1,         0,  0, 666666667],
                [-1, 666666667,  2,         0,  1, 666666667],
                [-1, 666666667,  3,         0,  2, 666666667],
                [-1, 666666667,  3, 333333333,  3,         0],

                [0, 0, -4, 666666667, -4, 666666667],
                [0, 0, -3,         0, -3,         0],
                [0, 0, -2,         0, -2,         0],
                [0, 0, -1,         0, -1,         0],
                [0, 0, -1, 333333334, -1, 333333334],
                [0, 0, -1, 666666667, -1, 666666667],
                [0, 0, -1, 999999999, -1, 999999999],
                [0, 0,  0,         0,  0,         0],
                [0, 0,  0,         1,  0,         1],
                [0, 0,  0, 333333333,  0, 333333333],
                [0, 0,  0, 666666666,  0, 666666666],
                [0, 0,  1,         0,  1,         0],
                [0, 0,  2,         0,  2,         0],
                [0, 0,  3,         0,  3,         0],
                [0, 0,  3, 333333333,  3, 333333333],

                [0, 333333333, -4, 666666667, -3,         0],
                [0, 333333333, -3,         0, -3, 333333333],
                [0, 333333333, -2,         0, -2, 333333333],
                [0, 333333333, -1,         0, -1, 333333333],
                [0, 333333333, -1, 333333334, -1, 666666667],
                [0, 333333333, -1, 666666667,  0,         0],
                [0, 333333333, -1, 999999999,  0, 333333332],
                [0, 333333333,  0,         0,  0, 333333333],
                [0, 333333333,  0,         1,  0, 333333334],
                [0, 333333333,  0, 333333333,  0, 666666666],
                [0, 333333333,  0, 666666666,  0, 999999999],
                [0, 333333333,  1,         0,  1, 333333333],
                [0, 333333333,  2,         0,  2, 333333333],
                [0, 333333333,  3,         0,  3, 333333333],
                [0, 333333333,  3, 333333333,  3, 666666666],

                [1, 0, -4, 666666667, -3, 666666667],
                [1, 0, -3,         0, -2,         0],
                [1, 0, -2,         0, -1,         0],
                [1, 0, -1,         0,  0,         0],
                [1, 0, -1, 333333334,  0, 333333334],
                [1, 0, -1, 666666667,  0, 666666667],
                [1, 0, -1, 999999999,  0, 999999999],
                [1, 0,  0,         0,  1,         0],
                [1, 0,  0,         1,  1,         1],
                [1, 0,  0, 333333333,  1, 333333333],
                [1, 0,  0, 666666666,  1, 666666666],
                [1, 0,  1,         0,  2,         0],
                [1, 0,  2,         0,  3,         0],
                [1, 0,  3,         0,  4,         0],
                [1, 0,  3, 333333333,  4, 333333333],

                [2, 0, -4, 666666667, -2, 666666667],
                [2, 0, -3,         0, -1,         0],
                [2, 0, -2,         0,  0,         0],
                [2, 0, -1,         0,  1,         0],
                [2, 0, -1, 333333334,  1, 333333334],
                [2, 0, -1, 666666667,  1, 666666667],
                [2, 0, -1, 999999999,  1, 999999999],
                [2, 0,  0,         0,  2,         0],
                [2, 0,  0,         1,  2,         1],
                [2, 0,  0, 333333333,  2, 333333333],
                [2, 0,  0, 666666666,  2, 666666666],
                [2, 0,  1,         0,  3,         0],
                [2, 0,  2,         0,  4,         0],
                [2, 0,  3,         0,  5,         0],
                [2, 0,  3, 333333333,  5, 333333333],

                [3, 0, -4, 666666667, -1, 666666667],
                [3, 0, -3,         0,  0,         0],
                [3, 0, -2,         0,  1,         0],
                [3, 0, -1,         0,  2,         0],
                [3, 0, -1, 333333334,  2, 333333334],
                [3, 0, -1, 666666667,  2, 666666667],
                [3, 0, -1, 999999999,  2, 999999999],
                [3, 0,  0,         0,  3,         0],
                [3, 0,  0,         1,  3,         1],
                [3, 0,  0, 333333333,  3, 333333333],
                [3, 0,  0, 666666666,  3, 666666666],
                [3, 0,  1,         0,  4,         0],
                [3, 0,  2,         0,  5,         0],
                [3, 0,  3,         0,  6,         0],
                [3, 0,  3, 333333333,  6, 333333333],

                [3, 333333333, -4, 666666667,  0,         0],
                [3, 333333333, -3,         0,  0, 333333333],
                [3, 333333333, -2,         0,  1, 333333333],
                [3, 333333333, -1,         0,  2, 333333333],
                [3, 333333333, -1, 333333334,  2, 666666667],
                [3, 333333333, -1, 666666667,  3,         0],
                [3, 333333333, -1, 999999999,  3, 333333332],
                [3, 333333333,  0,         0,  3, 333333333],
                [3, 333333333,  0,         1,  3, 333333334],
                [3, 333333333,  0, 333333333,  3, 666666666],
                [3, 333333333,  0, 666666666,  3, 999999999],
                [3, 333333333,  1,         0,  4, 333333333],
                [3, 333333333,  2,         0,  5, 333333333],
                [3, 333333333,  3,         0,  6, 333333333],
                [3, 333333333,  3, 333333333,  6, 666666666],

                [MAX_SECOND - 1, 0, 1, 0, MAX_SECOND, 0],
                [MAX_SECOND - 1, 0, 0, 500, MAX_SECOND - 1, 500],
                [MAX_SECOND - 1, 0, 0, 1000000000, MAX_SECOND, 0],

                [MAX_SECOND, 0, -1, 0, MAX_SECOND - 1, 0],
                [MAX_SECOND, 0, 0, -500, MAX_SECOND - 1, 999999500],
                [MAX_SECOND, 0, 0, -1000000000, MAX_SECOND - 1, 0],

                [MAX_SECOND, 0, -MAX_SECOND, 0, 0, 0]
            ];

        });

        it('plus_Duration', () => {
            for (let i = 0; i < dataProviderPlus.length; i++) {
                const plusData = dataProviderPlus[i];
                plus_Duration.apply(this, plusData);
            }
        });

        //@Test(dataProvider="Plus")
        function plus_Duration(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds, nanos).plus(Duration.ofSeconds(otherSeconds, otherNanos));
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('plus_Duration_overflowTooBig', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.plus(Duration.ofSeconds(0, 1));
            }).to.throw(DateTimeException);
        });

        it('plus_Duration_overflowTooSmall', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MIN_SECOND);
                i.plus(Duration.ofSeconds(-1, 999999999));
            }).to.throw(DateTimeException);
        });


        it('plus_longTemporalUnit', () => {
            for (let i=0; i < dataProviderPlus.length; i++){
                const plusData = dataProviderPlus[i];
                plus_longTemporalUnit.apply(this, plusData);
            }
        });

        function plus_longTemporalUnit(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond){
            const instant = Instant.ofEpochSecond(seconds, nanos)
                .plus(otherSeconds, ChronoUnit.SECONDS)
                .plus(otherNanos, ChronoUnit.NANOS);
            expect(instant.epochSecond()).to.equal(expectedSeconds);
            expect(instant.nano()).to.equal(expectedNanoOfSecond);
        }

        it('plus_longTemporalUnit_overflowTooBig', () => {
            const instant = Instant.ofEpochSecond(MAX_SECOND, 999999999);
            expect(()=>{
                instant.plusNanos(1);
            }).to.throw(DateTimeException);
        });

        it('plus_longTemporalUnit_overflowTooSmall', () => {
            const instant = Instant.ofEpochSecond(MIN_SECOND);
            expect(()=>{
                instant.plusNanos(999999999);
                instant.plusSeconds(-1);
            }).to.throw(DateTimeException);
        });
    });

    describe('atZone', () => {
        it('instant to UTC zdt and back are equal', () => {
            const base = Instant.now();
            expect(base.equals(base.atZone(ZoneOffset.UTC).toInstant()));
        });    
    });
    
    describe('plusSeconds', () => {
        let dataProviderPlus;
        beforeEach(() => {
            dataProviderPlus = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 0, -1, -1, 0],
                [0, 0, MAX_SECOND, MAX_SECOND, 0],
                [0, 0, MIN_SECOND, MIN_SECOND, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 1, 2, 0],
                [1, 0, -1, 0, 0],
                [1, 0, MAX_SECOND - 1, MAX_SECOND, 0],
                [1, 0, MIN_SECOND, MIN_SECOND + 1, 0],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 2, 1],
                [1, 1, -1, 0, 1],
                [1, 1, MAX_SECOND - 1, MAX_SECOND, 1],
                [1, 1, MIN_SECOND, MIN_SECOND + 1, 1],
                [-1, 1, 0, -1, 1],
                [-1, 1, 1, 0, 1],
                [-1, 1, -1, -2, 1],
                [-1, 1, MAX_SECOND, MAX_SECOND - 1, 1],
                [-1, 1, MIN_SECOND + 1, MIN_SECOND, 1],

                [MAX_SECOND, 2, -MAX_SECOND, 0, 2],
                [MIN_SECOND, 2, -MIN_SECOND, 0, 2]
            ];

        });

        it('plusSeconds', () => {
            for (let i=0; i < dataProviderPlus.length; i++){
                const plusData = dataProviderPlus[i];
                plusSeconds.apply(this, plusData);
            }
        });

        function plusSeconds(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            const instant = Instant.ofEpochSecond(seconds, nanos)
                .plusSeconds(amount);
            expect(instant.epochSecond()).to.equal(expectedSeconds);
            expect(instant.nano()).to.equal(expectedNanoOfSecond);
        }

        it('plusSeconds_long_overflowTooBig', () => {
            const instant = Instant.ofEpochSecond(1, 0);
            expect(()=>{
                instant.plusSeconds(MAX_SECOND);
            }).to.throw(DateTimeException);
        });

        it('plusSeconds_long_overflowTooSmall', () => {
            const instant = Instant.ofEpochSecond(-1, 0);
            expect(()=>{
                instant.plusSeconds(MIN_SECOND);
            }).to.throw(DateTimeException);
        });
    });

    describe('plusMillis', function () {

        //@DataProvider(name="PlusMillis")
        function provider_plusMillis_long() {
            return [
                [0, 0, 0,       0, 0],
                [0, 0, 1,       0, 1000000],
                [0, 0, 999,     0, 999000000],
                [0, 0, 1000,    1, 0],
                [0, 0, 1001,    1, 1000000],
                [0, 0, 1999,    1, 999000000],
                [0, 0, 2000,    2, 0],
                [0, 0, -1,      -1, 999000000],
                [0, 0, -999,    -1, 1000000],
                [0, 0, -1000,   -1, 0],
                [0, 0, -1001,   -2, 999000000],
                [0, 0, -1999,   -2, 1000000],

                [0, 1, 0,       0, 1],
                [0, 1, 1,       0, 1000001],
                [0, 1, 998,     0, 998000001],
                [0, 1, 999,     0, 999000001],
                [0, 1, 1000,    1, 1],
                [0, 1, 1998,    1, 998000001],
                [0, 1, 1999,    1, 999000001],
                [0, 1, 2000,    2, 1],
                [0, 1, -1,      -1, 999000001],
                [0, 1, -2,      -1, 998000001],
                [0, 1, -1000,   -1, 1],
                [0, 1, -1001,   -2, 999000001],

                [0, 1000000, 0,       0, 1000000],
                [0, 1000000, 1,       0, 2000000],
                [0, 1000000, 998,     0, 999000000],
                [0, 1000000, 999,     1, 0],
                [0, 1000000, 1000,    1, 1000000],
                [0, 1000000, 1998,    1, 999000000],
                [0, 1000000, 1999,    2, 0],
                [0, 1000000, 2000,    2, 1000000],
                [0, 1000000, -1,      0, 0],
                [0, 1000000, -2,      -1, 999000000],
                [0, 1000000, -999,    -1, 2000000],
                [0, 1000000, -1000,   -1, 1000000],
                [0, 1000000, -1001,   -1, 0],
                [0, 1000000, -1002,   -2, 999000000],

                [0, 999999999, 0,     0, 999999999],
                [0, 999999999, 1,     1, 999999],
                [0, 999999999, 999,   1, 998999999],
                [0, 999999999, 1000,  1, 999999999],
                [0, 999999999, 1001,  2, 999999],
                [0, 999999999, -1,    0, 998999999],
                [0, 999999999, -1000, -1, 999999999],
                [0, 999999999, -1001, -1, 998999999],

                [0, 0, MathUtil.MAX_SAFE_INTEGER, MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000), MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, 1000) * 1000000],
                [0, 0, MathUtil.MIN_SAFE_INTEGER, MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000) - 1, MathUtil.intMod(MathUtil.MIN_SAFE_INTEGER, 1000) * 1000000 + 1000000000]
            ];
        }

        it('plusMillis_long', function () {
            provider_plusMillis_long().forEach((data) => {
                plusMillis_long.apply(this, data);
            });
        });

        //@Test(dataProvider="PlusMillis")
        function plusMillis_long(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const t = Instant.ofEpochSecond(seconds, nanos)
                .plusMillis(amount);
            assertEquals(t.epochSecond(), expectedSeconds);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }

        it('plusMillis_long_oneMore', function () {
            provider_plusMillis_long().forEach((data) => {
                plusMillis_long_oneMore.apply(this, data);
            });
        });

        //@Test(dataProvider="PlusMillis")
        function plusMillis_long_oneMore(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const t = Instant.ofEpochSecond(seconds + 1, nanos)
                .plusMillis(amount);
            assertEquals(t.epochSecond(), expectedSeconds + 1);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }

        it('plusMillis_long_minusOneLess', function () {
            provider_plusMillis_long().forEach((data) => {
                plusMillis_long_minusOneLess.apply(this, data);
            });
        });

        //@Test(dataProvider="PlusMillis")
        function plusMillis_long_minusOneLess(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const t = Instant.ofEpochSecond(seconds - 1, nanos)
                .plusMillis(amount);
            assertEquals(t.epochSecond(), expectedSeconds - 1);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }

        it('plusMillis_long_max', () => {
            const t = Instant.ofEpochSecond(MAX_SECOND, 998999999)
                .plusMillis(1);
            assertEquals(t.epochSecond(), MAX_SECOND);
            assertEquals(t.nano(), 999999999);
        });

        it('plusMillis_long_overflowTooBig', () => {
            expect(() => {
                const t = Instant.ofEpochSecond(MAX_SECOND, 999000000);
                t.plusMillis(1);
            }).to.throw(DateTimeException);
        });

        it('plusMillis_long_min', () => {
            const t = Instant.ofEpochSecond(MIN_SECOND, 1000000)
                .plusMillis(-1);
            assertEquals(t.epochSecond(), MIN_SECOND);
            assertEquals(t.nano(), 0);
        });

        it('plusMillis_long_overflowTooSmall', () => {
            expect(() => {
                const t = Instant.ofEpochSecond(MIN_SECOND, 0);
                t.plusMillis(-1);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusNanos', () => {
        let dataProviderPlus;
        beforeEach(() => {
            dataProviderPlus = [
                [0, 0, 0,           0, 0],
                [0, 0, 1,           0, 1],
                [0, 0, 999999999,   0, 999999999],
                [0, 0, 1000000000,  1, 0],
                [0, 0, 1000000001,  1, 1],
                [0, 0, 1999999999,  1, 999999999],
                [0, 0, 2000000000,  2, 0],
                [0, 0, -1,          -1, 999999999],
                [0, 0, -999999999,  -1, 1],
                [0, 0, -1000000000, -1, 0],
                [0, 0, -1000000001, -2, 999999999],
                [0, 0, -1999999999, -2, 1],

                [1, 0, 0,           1, 0],
                [1, 0, 1,           1, 1],
                [1, 0, 999999999,   1, 999999999],
                [1, 0, 1000000000,  2, 0],
                [1, 0, 1000000001,  2, 1],
                [1, 0, 1999999999,  2, 999999999],
                [1, 0, 2000000000,  3, 0],
                [1, 0, -1,          0, 999999999],
                [1, 0, -999999999,  0, 1],
                [1, 0, -1000000000, 0, 0],
                [1, 0, -1000000001, -1, 999999999],
                [1, 0, -1999999999, -1, 1],

                [-1, 0, 0,           -1, 0],
                [-1, 0, 1,           -1, 1],
                [-1, 0, 999999999,   -1, 999999999],
                [-1, 0, 1000000000,  0, 0],
                [-1, 0, 1000000001,  0, 1],
                [-1, 0, 1999999999,  0, 999999999],
                [-1, 0, 2000000000,  1, 0],
                [-1, 0, -1,          -2, 999999999],
                [-1, 0, -999999999,  -2, 1],
                [-1, 0, -1000000000, -2, 0],
                [-1, 0, -1000000001, -3, 999999999],
                [-1, 0, -1999999999, -3, 1],

                [1, 1, 0,           1, 1],
                [1, 1, 1,           1, 2],
                [1, 1, 999999998,   1, 999999999],
                [1, 1, 999999999,   2, 0],
                [1, 1, 1000000000,  2, 1],
                [1, 1, 1999999998,  2, 999999999],
                [1, 1, 1999999999,  3, 0],
                [1, 1, 2000000000,  3, 1],
                [1, 1, -1,          1, 0],
                [1, 1, -2,          0, 999999999],
                [1, 1, -1000000000, 0, 1],
                [1, 1, -1000000001, 0, 0],
                [1, 1, -1000000002, -1, 999999999],
                [1, 1, -2000000000, -1, 1],

                [1, 999999999, 0,           1, 999999999],
                [1, 999999999, 1,           2, 0],
                [1, 999999999, 999999999,   2, 999999998],
                [1, 999999999, 1000000000,  2, 999999999],
                [1, 999999999, 1000000001,  3, 0],
                [1, 999999999, -1,          1, 999999998],
                [1, 999999999, -1000000000, 0, 999999999],
                [1, 999999999, -1000000001, 0, 999999998],
                [1, 999999999, -1999999999, 0, 0],
                [1, 999999999, -2000000000, -1, 999999999],

                [MAX_SECOND, 0, 999999999, MAX_SECOND, 999999999],
                [MAX_SECOND - 1, 0, 1999999999, MAX_SECOND, 999999999],
                [MIN_SECOND, 1, -1, MIN_SECOND, 0],
                [MIN_SECOND + 1, 1, -1000000001, MIN_SECOND, 0],

                [0, 0, MAX_SECOND, MathUtil.intDiv(MAX_SECOND, 1000000000), (MAX_SECOND % 1000000000)],
                [0, 0, MIN_SECOND, MathUtil.intDiv(MIN_SECOND, 1000000000) - 1, (MIN_SECOND % 1000000000) + 1000000000]
            ];

        });

        it('plusNanos', () => {
            for (let i=0; i < dataProviderPlus.length; i++){
                const plusData = dataProviderPlus[i];
                plusNanos.apply(this, plusData);
            }
        });

        function plusNanos(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            const instant = Instant.ofEpochSecond(seconds, nanos)
                .plusNanos(amount);
            expect(instant.epochSecond(), 'epochSecond').to.equal(expectedSeconds);
            expect(instant.nano(), 'nano').to.equal(expectedNanoOfSecond);
        }

        it('plusNanos_long_overflowTooBig', () => {
            const instant = Instant.ofEpochSecond(MAX_SECOND, 999999999);
            expect(()=>{
                instant.plusNanos(1);
            }).to.throw(DateTimeException);
        });

        it('plusNanos_long_overflowTooSmall', () => {
            const instant = Instant.ofEpochSecond(MIN_SECOND, 0);
            expect(()=>{
                instant.plusNanos(-1);
            }).to.throw(DateTimeException);
        });
    });

    describe('minus', function () {

        //@DataProvider(name="Minus")
        function provider_minus(){
            return [
                [MIN_SECOND, 0, MIN_SECOND, 0, 0, 0],

                [MIN_SECOND, 0, -1, 0, MIN_SECOND + 1, 0],
                [MIN_SECOND, 0, 0, -500, MIN_SECOND, 500],
                [MIN_SECOND, 0, 0, -1000000000, MIN_SECOND + 1, 0],

                [MIN_SECOND + 1, 0, 1, 0, MIN_SECOND, 0],
                [MIN_SECOND + 1, 0, 0, 500, MIN_SECOND, 999999500],
                [MIN_SECOND + 1, 0, 0, 1000000000, MIN_SECOND, 0],

                [-4, 666666667, -4, 666666667,  0,         0],
                [-4, 666666667, -3,         0, -1, 666666667],
                [-4, 666666667, -2,         0, -2, 666666667],
                [-4, 666666667, -1,         0, -3, 666666667],
                [-4, 666666667, -1, 333333334, -3, 333333333],
                [-4, 666666667, -1, 666666667, -3,         0],
                [-4, 666666667, -1, 999999999, -4, 666666668],
                [-4, 666666667,  0,         0, -4, 666666667],
                [-4, 666666667,  0,         1, -4, 666666666],
                [-4, 666666667,  0, 333333333, -4, 333333334],
                [-4, 666666667,  0, 666666666, -4,         1],
                [-4, 666666667,  1,         0, -5, 666666667],
                [-4, 666666667,  2,         0, -6, 666666667],
                [-4, 666666667,  3,         0, -7, 666666667],
                [-4, 666666667,  3, 333333333, -7, 333333334],

                [-3, 0, -4, 666666667,  0, 333333333],
                [-3, 0, -3,         0,  0,         0],
                [-3, 0, -2,         0, -1,         0],
                [-3, 0, -1,         0, -2,         0],
                [-3, 0, -1, 333333334, -3, 666666666],
                [-3, 0, -1, 666666667, -3, 333333333],
                [-3, 0, -1, 999999999, -3,         1],
                [-3, 0,  0,         0, -3,         0],
                [-3, 0,  0,         1, -4, 999999999],
                [-3, 0,  0, 333333333, -4, 666666667],
                [-3, 0,  0, 666666666, -4, 333333334],
                [-3, 0,  1,         0, -4,         0],
                [-3, 0,  2,         0, -5,         0],
                [-3, 0,  3,         0, -6,         0],
                [-3, 0,  3, 333333333, -7, 666666667],

                [-2, 0, -4, 666666667,  1, 333333333],
                [-2, 0, -3,         0,  1,         0],
                [-2, 0, -2,         0,  0,         0],
                [-2, 0, -1,         0, -1,         0],
                [-2, 0, -1, 333333334, -2, 666666666],
                [-2, 0, -1, 666666667, -2, 333333333],
                [-2, 0, -1, 999999999, -2,         1],
                [-2, 0,  0,         0, -2,         0],
                [-2, 0,  0,         1, -3, 999999999],
                [-2, 0,  0, 333333333, -3, 666666667],
                [-2, 0,  0, 666666666, -3, 333333334],
                [-2, 0,  1,         0, -3,         0],
                [-2, 0,  2,         0, -4,         0],
                [-2, 0,  3,         0, -5,         0],
                [-2, 0,  3, 333333333, -6, 666666667],

                [-1, 0, -4, 666666667,  2, 333333333],
                [-1, 0, -3,         0,  2,         0],
                [-1, 0, -2,         0,  1,         0],
                [-1, 0, -1,         0,  0,         0],
                [-1, 0, -1, 333333334, -1, 666666666],
                [-1, 0, -1, 666666667, -1, 333333333],
                [-1, 0, -1, 999999999, -1,         1],
                [-1, 0,  0,         0, -1,         0],
                [-1, 0,  0,         1, -2, 999999999],
                [-1, 0,  0, 333333333, -2, 666666667],
                [-1, 0,  0, 666666666, -2, 333333334],
                [-1, 0,  1,         0, -2,         0],
                [-1, 0,  2,         0, -3,         0],
                [-1, 0,  3,         0, -4,         0],
                [-1, 0,  3, 333333333, -5, 666666667],

                [-1, 666666667, -4, 666666667,  3,         0],
                [-1, 666666667, -3,         0,  2, 666666667],
                [-1, 666666667, -2,         0,  1, 666666667],
                [-1, 666666667, -1,         0,  0, 666666667],
                [-1, 666666667, -1, 333333334,  0, 333333333],
                [-1, 666666667, -1, 666666667,  0,         0],
                [-1, 666666667, -1, 999999999, -1, 666666668],
                [-1, 666666667,  0,         0, -1, 666666667],
                [-1, 666666667,  0,         1, -1, 666666666],
                [-1, 666666667,  0, 333333333, -1, 333333334],
                [-1, 666666667,  0, 666666666, -1,         1],
                [-1, 666666667,  1,         0, -2, 666666667],
                [-1, 666666667,  2,         0, -3, 666666667],
                [-1, 666666667,  3,         0, -4, 666666667],
                [-1, 666666667,  3, 333333333, -4, 333333334],

                [0, 0, -4, 666666667,  3, 333333333],
                [0, 0, -3,         0,  3,         0],
                [0, 0, -2,         0,  2,         0],
                [0, 0, -1,         0,  1,         0],
                [0, 0, -1, 333333334,  0, 666666666],
                [0, 0, -1, 666666667,  0, 333333333],
                [0, 0, -1, 999999999,  0,         1],
                [0, 0,  0,         0,  0,         0],
                [0, 0,  0,         1, -1, 999999999],
                [0, 0,  0, 333333333, -1, 666666667],
                [0, 0,  0, 666666666, -1, 333333334],
                [0, 0,  1,         0, -1,         0],
                [0, 0,  2,         0, -2,         0],
                [0, 0,  3,         0, -3,         0],
                [0, 0,  3, 333333333, -4, 666666667],

                [0, 333333333, -4, 666666667,  3, 666666666],
                [0, 333333333, -3,         0,  3, 333333333],
                [0, 333333333, -2,         0,  2, 333333333],
                [0, 333333333, -1,         0,  1, 333333333],
                [0, 333333333, -1, 333333334,  0, 999999999],
                [0, 333333333, -1, 666666667,  0, 666666666],
                [0, 333333333, -1, 999999999,  0, 333333334],
                [0, 333333333,  0,         0,  0, 333333333],
                [0, 333333333,  0,         1,  0, 333333332],
                [0, 333333333,  0, 333333333,  0,         0],
                [0, 333333333,  0, 666666666, -1, 666666667],
                [0, 333333333,  1,         0, -1, 333333333],
                [0, 333333333,  2,         0, -2, 333333333],
                [0, 333333333,  3,         0, -3, 333333333],
                [0, 333333333,  3, 333333333, -3,         0],

                [1, 0, -4, 666666667,  4, 333333333],
                [1, 0, -3,         0,  4,         0],
                [1, 0, -2,         0,  3,         0],
                [1, 0, -1,         0,  2,         0],
                [1, 0, -1, 333333334,  1, 666666666],
                [1, 0, -1, 666666667,  1, 333333333],
                [1, 0, -1, 999999999,  1,         1],
                [1, 0,  0,         0,  1,         0],
                [1, 0,  0,         1,  0, 999999999],
                [1, 0,  0, 333333333,  0, 666666667],
                [1, 0,  0, 666666666,  0, 333333334],
                [1, 0,  1,         0,  0,         0],
                [1, 0,  2,         0, -1,         0],
                [1, 0,  3,         0, -2,         0],
                [1, 0,  3, 333333333, -3, 666666667],

                [2, 0, -4, 666666667,  5, 333333333],
                [2, 0, -3,         0,  5,         0],
                [2, 0, -2,         0,  4,         0],
                [2, 0, -1,         0,  3,         0],
                [2, 0, -1, 333333334,  2, 666666666],
                [2, 0, -1, 666666667,  2, 333333333],
                [2, 0, -1, 999999999,  2,         1],
                [2, 0,  0,         0,  2,         0],
                [2, 0,  0,         1,  1, 999999999],
                [2, 0,  0, 333333333,  1, 666666667],
                [2, 0,  0, 666666666,  1, 333333334],
                [2, 0,  1,         0,  1,         0],
                [2, 0,  2,         0,  0,         0],
                [2, 0,  3,         0, -1,         0],
                [2, 0,  3, 333333333, -2, 666666667],

                [3, 0, -4, 666666667,  6, 333333333],
                [3, 0, -3,         0,  6,         0],
                [3, 0, -2,         0,  5,         0],
                [3, 0, -1,         0,  4,         0],
                [3, 0, -1, 333333334,  3, 666666666],
                [3, 0, -1, 666666667,  3, 333333333],
                [3, 0, -1, 999999999,  3,         1],
                [3, 0,  0,         0,  3,         0],
                [3, 0,  0,         1,  2, 999999999],
                [3, 0,  0, 333333333,  2, 666666667],
                [3, 0,  0, 666666666,  2, 333333334],
                [3, 0,  1,         0,  2,         0],
                [3, 0,  2,         0,  1,         0],
                [3, 0,  3,         0,  0,         0],
                [3, 0,  3, 333333333, -1, 666666667],

                [3, 333333333, -4, 666666667,  6, 666666666],
                [3, 333333333, -3,         0,  6, 333333333],
                [3, 333333333, -2,         0,  5, 333333333],
                [3, 333333333, -1,         0,  4, 333333333],
                [3, 333333333, -1, 333333334,  3, 999999999],
                [3, 333333333, -1, 666666667,  3, 666666666],
                [3, 333333333, -1, 999999999,  3, 333333334],
                [3, 333333333,  0,         0,  3, 333333333],
                [3, 333333333,  0,         1,  3, 333333332],
                [3, 333333333,  0, 333333333,  3,         0],
                [3, 333333333,  0, 666666666,  2, 666666667],
                [3, 333333333,  1,         0,  2, 333333333],
                [3, 333333333,  2,         0,  1, 333333333],
                [3, 333333333,  3,         0,  0, 333333333],
                [3, 333333333,  3, 333333333,  0,         0],

                [MAX_SECOND - 1, 0, -1, 0, MAX_SECOND, 0],
                [MAX_SECOND - 1, 0, 0, -500, MAX_SECOND - 1, 500],
                [MAX_SECOND - 1, 0, 0, -1000000000, MAX_SECOND, 0],

                [MAX_SECOND, 0, 1, 0, MAX_SECOND - 1, 0],
                [MAX_SECOND, 0, 0, 500, MAX_SECOND - 1, 999999500],
                [MAX_SECOND, 0, 0, 1000000000, MAX_SECOND - 1, 0],

                [MAX_SECOND, 0, MAX_SECOND, 0, 0, 0]
            ];
        }

        it('minusDuration', function () {
            provider_minus().forEach((data) => {
                minus_Duration.apply(this, data);
            });
        });

        // @Test(dataProvider="Minus")
        function minus_Duration(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds, nanos).minus(Duration.ofSeconds(otherSeconds, otherNanos));
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minus_Duration_overflowTooSmall', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MIN_SECOND);
                i.minus(Duration.ofSeconds(0, 1));
            }).to.throw(DateTimeException);
        });

        it('minus_Duration_overflowTooBig', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.minus(Duration.ofSeconds(-1, 999999999));
            }).to.throw(DateTimeException);
        });

        it('minus_longTemporalUnit', function () {
            provider_minus().forEach((data) => {
                minus_longTemporalUnit.apply(this, data);
            });
        });

        // @Test(dataProvider="Minus")
        function minus_longTemporalUnit(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds, nanos).minus(otherSeconds, ChronoUnit.SECONDS).minus(otherNanos, ChronoUnit.NANOS);
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minus_longTemporalUnit_overflowTooSmall', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MIN_SECOND);
                i.minus(1, ChronoUnit.NANOS);
            }).to.throw(DateTimeException);
        });

        it('minus_longTemporalUnit_overflowTooBig', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.minus(999999999, ChronoUnit.NANOS);
                i.minus(-1, ChronoUnit.SECONDS);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusSeconds', () => {
        let dataProviderPlus;
        beforeEach(() => {
            dataProviderPlus = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, -1, 0],
                [0, 0, -1, 1, 0],
                [0, 0, -MIN_SECOND, MIN_SECOND, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 1, 0, 0],
                [1, 0, -1, 2, 0],
                [1, 0, -MIN_SECOND + 1, MIN_SECOND, 0],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 0, 1],
                [1, 1, -1, 2, 1],
                [1, 1, -MIN_SECOND, MIN_SECOND + 1, 1],
                [1, 1, -MIN_SECOND + 1, MIN_SECOND, 1],
                [-1, 1, 0, -1, 1],
                [-1, 1, 1, -2, 1],
                [-1, 1, -1, 0, 1],
                [-1, 1, -MAX_SECOND, MAX_SECOND - 1, 1],
                [-1, 1, -(MAX_SECOND + 1), MAX_SECOND, 1],

                [MIN_SECOND, 2, MIN_SECOND, 0, 2],
                [MIN_SECOND + 1, 2, MIN_SECOND, 1, 2],
                [MAX_SECOND - 1, 2, MAX_SECOND, -1, 2],
                [MAX_SECOND, 2, MAX_SECOND, 0, 2]
            ];

        });

        it('minuseconds', () => {
            for (let i=0; i < dataProviderPlus.length; i++){
                const plusData = dataProviderPlus[i];
                minusSeconds.apply(this, plusData);
            }
        });

        function minusSeconds(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            const instant = Instant.ofEpochSecond(seconds, nanos)
                .minusSeconds(amount);
            expect(instant.epochSecond(), 'epochSecond').to.equal(expectedSeconds);
            expect(instant.nano(), 'nano').to.equal(expectedNanoOfSecond);
        }

        it('minusSeconds_long_overflowTooBig', () => {
            const instant = Instant.ofEpochSecond(1, 0);
            expect(()=>{
                instant.minusSeconds(-MAX_SECOND);
            }).to.throw(DateTimeException);
        });

        it('minusSeconds_long_overflowTooSmall', () => {
            const instant = Instant.ofEpochSecond(-1, 0);
            expect(()=>{
                instant.minusSeconds(-MIN_SECOND);
            }).to.throw(DateTimeException);
        });
    });

    describe('minusMillis', function () {

        // @DataProvider(name="MinusMillis")
        function provider_minusMillis_long() {
            return [
                [0, 0, 0, 0, 0],
                [0, 0, 1, -1, 999000000],
                [0, 0, 999, -1, 1000000],
                [0, 0, 1000, -1, 0],
                [0, 0, 1001, -2, 999000000],
                [0, 0, 1999, -2, 1000000],
                [0, 0, 2000, -2, 0],
                [0, 0, -1, 0, 1000000],
                [0, 0, -999, 0, 999000000],
                [0, 0, -1000, 1, 0],
                [0, 0, -1001, 1, 1000000],
                [0, 0, -1999, 1, 999000000],

                [0, 1, 0, 0, 1],
                [0, 1, 1, -1, 999000001],
                [0, 1, 998, -1, 2000001],
                [0, 1, 999, -1, 1000001],
                [0, 1, 1000, -1, 1],
                [0, 1, 1998, -2, 2000001],
                [0, 1, 1999, -2, 1000001],
                [0, 1, 2000, -2, 1],
                [0, 1, -1, 0, 1000001],
                [0, 1, -2, 0, 2000001],
                [0, 1, -1000, 1, 1],
                [0, 1, -1001, 1, 1000001],

                [0, 1000000, 0, 0, 1000000],
                [0, 1000000, 1, 0, 0],
                [0, 1000000, 998, -1, 3000000],
                [0, 1000000, 999, -1, 2000000],
                [0, 1000000, 1000, -1, 1000000],
                [0, 1000000, 1998, -2, 3000000],
                [0, 1000000, 1999, -2, 2000000],
                [0, 1000000, 2000, -2, 1000000],
                [0, 1000000, -1, 0, 2000000],
                [0, 1000000, -2, 0, 3000000],
                [0, 1000000, -999, 1, 0],
                [0, 1000000, -1000, 1, 1000000],
                [0, 1000000, -1001, 1, 2000000],
                [0, 1000000, -1002, 1, 3000000],

                [0, 999999999, 0, 0, 999999999],
                [0, 999999999, 1, 0, 998999999],
                [0, 999999999, 999, 0, 999999],
                [0, 999999999, 1000, -1, 999999999],
                [0, 999999999, 1001, -1, 998999999],
                [0, 999999999, -1, 1, 999999],
                [0, 999999999, -1000, 1, 999999999],
                [0, 999999999, -1001, 2, 999999],

                [0, 0, MathUtil.MAX_SAFE_INTEGER, -1 * MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000) - 1,  -1 * MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, 1000) * 1000000 + 1000000000],
                [0, 0, MathUtil.MIN_SAFE_INTEGER, -1 * MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000),      -1 * MathUtil.intMod(MathUtil.MIN_SAFE_INTEGER, 1000) * 1000000]
            ];
        }

        it('minusMillis_long', function () {
            provider_minusMillis_long().forEach((data) => {
                minusMillis_long.apply(this, data);
            });
        });

        // @Test(dataProvider="MinusMillis")
        function minusMillis_long(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds, nanos)
                .minusMillis(amount);
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusMillis_long_oneMore', function () {
            provider_minusMillis_long().forEach((data) => {
                minusMillis_long_oneMore.apply(this, data);
            });
        });

        // @Test(dataProvider="MinusMillis")
        function minusMillis_long_oneMore(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds + 1, nanos)
                .minusMillis(amount);
            assertEquals(i.epochSecond(), expectedSeconds + 1);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusMillis_long_minusOneLess', function () {
            provider_minusMillis_long().forEach((data) => {
                minusMillis_long_minusOneLess.apply(this, data);
            });
        });

        // @Test(dataProvider="MinusMillis")
        function minusMillis_long_minusOneLess(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds - 1, nanos)
                .minusMillis(amount);
            assertEquals(i.epochSecond(), expectedSeconds - 1);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusMillis_long_max', () => {
            const i = Instant.ofEpochSecond(MAX_SECOND, 998999999)
                .minusMillis(-1);
            assertEquals(i.epochSecond(), MAX_SECOND);
            assertEquals(i.nano(), 999999999);
        });

        it('minusMillis_long_overflowTooBig', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MAX_SECOND, 999000000);
                i.minusMillis(-1);
            }).to.throw(DateTimeException);
        });

        it('minusMillis_long_min', () => {
            const i = Instant.ofEpochSecond(MIN_SECOND, 1000000)
                .minusMillis(1);
            assertEquals(i.epochSecond(), MIN_SECOND);
            assertEquals(i.nano(), 0);
        });

        it('minusMillis_long_overflowTooSmall', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MIN_SECOND, 0);
                i.minusMillis(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusNanos', function () {

        //@DataProvider(name="MinusNanos")
        function provider_minusNanos_long() {
            return [
                [0, 0, 0, 0, 0],
                [0, 0, 1, -1, 999999999],
                [0, 0, 999999999, -1, 1],
                [0, 0, 1000000000, -1, 0],
                [0, 0, 1000000001, -2, 999999999],
                [0, 0, 1999999999, -2, 1],
                [0, 0, 2000000000, -2, 0],
                [0, 0, -1, 0, 1],
                [0, 0, -999999999, 0, 999999999],
                [0, 0, -1000000000, 1, 0],
                [0, 0, -1000000001, 1, 1],
                [0, 0, -1999999999, 1, 999999999],

                [1, 0, 0, 1, 0],
                [1, 0, 1, 0, 999999999],
                [1, 0, 999999999, 0, 1],
                [1, 0, 1000000000, 0, 0],
                [1, 0, 1000000001, -1, 999999999],
                [1, 0, 1999999999, -1, 1],
                [1, 0, 2000000000, -1, 0],
                [1, 0, -1, 1, 1],
                [1, 0, -999999999, 1, 999999999],
                [1, 0, -1000000000, 2, 0],
                [1, 0, -1000000001, 2, 1],
                [1, 0, -1999999999, 2, 999999999],

                [-1, 0, 0, -1, 0],
                [-1, 0, 1, -2, 999999999],
                [-1, 0, 999999999, -2, 1],
                [-1, 0, 1000000000, -2, 0],
                [-1, 0, 1000000001, -3, 999999999],
                [-1, 0, 1999999999, -3, 1],
                [-1, 0, 2000000000, -3, 0],
                [-1, 0, -1, -1, 1],
                [-1, 0, -999999999, -1, 999999999],
                [-1, 0, -1000000000, 0, 0],
                [-1, 0, -1000000001, 0, 1],
                [-1, 0, -1999999999, 0, 999999999],

                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 0],
                [1, 1, 999999998, 0, 3],
                [1, 1, 999999999, 0, 2],
                [1, 1, 1000000000, 0, 1],
                [1, 1, 1999999998, -1, 3],
                [1, 1, 1999999999, -1, 2],
                [1, 1, 2000000000, -1, 1],
                [1, 1, -1, 1, 2],
                [1, 1, -2, 1, 3],
                [1, 1, -1000000000, 2, 1],
                [1, 1, -1000000001, 2, 2],
                [1, 1, -1000000002, 2, 3],
                [1, 1, -2000000000, 3, 1],

                [1, 999999999, 0, 1, 999999999],
                [1, 999999999, 1, 1, 999999998],
                [1, 999999999, 999999999, 1, 0],
                [1, 999999999, 1000000000, 0, 999999999],
                [1, 999999999, 1000000001, 0, 999999998],
                [1, 999999999, -1, 2, 0],
                [1, 999999999, -1000000000, 2, 999999999],
                [1, 999999999, -1000000001, 3, 0],
                [1, 999999999, -1999999999, 3, 999999998],
                [1, 999999999, -2000000000, 3, 999999999],

                [MAX_SECOND, 0, -999999999, MAX_SECOND, 999999999],
                [MAX_SECOND - 1, 0, -1999999999, MAX_SECOND, 999999999],
                [MIN_SECOND, 1, 1, MIN_SECOND, 0],
                [MIN_SECOND + 1, 1, 1000000001, MIN_SECOND, 0],

                [0, 0, MathUtil.MAX_SAFE_INTEGER, -MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000000000) - 1, -1 * MathUtil.intMod(MathUtil.MAX_SAFE_INTEGER, 1000000000) + 1000000000],
                [0, 0, MathUtil.MIN_SAFE_INTEGER, -MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000000000), -1 * MathUtil.intMod(MathUtil.MIN_SAFE_INTEGER, 1000000000)]
            ];
        }

        it('minusNanos_long', function () {
            provider_minusNanos_long().forEach((data) => {
                minusNanos_long.apply(this, data);
            });
        });

        // @Test(dataProvider="MinusNanos")
        function minusNanos_long(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond) {
            const i = Instant.ofEpochSecond(seconds, nanos)
                .minusNanos(amount);
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusNanos_long_overflowTooBig', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.minusNanos(-1);
            }).to.throw(DateTimeException);
        });

        it('minusNanos_long_overflowTooSmall', () => {
            expect(() => {
                const i = Instant.ofEpochSecond(MIN_SECOND, 0);
                i.minusNanos(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('truncatedTo', () => {
        // TODO Fix failing tests see https://github.com/ThreeTen/threetenbp/pull/54
        it('test_truncatedTo', () => {
            assertEquals(Instant.ofEpochSecond(2, 1000000).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(2));
            assertEquals(Instant.ofEpochSecond(2, -1000000).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(1));
            // assertEquals(Instant.ofEpochSecond(0, -1000000).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(-1));
            assertEquals(Instant.ofEpochSecond(-1).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(-1));
            // assertEquals(Instant.ofEpochSecond(-1, -1000000).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(-2));
            assertEquals(Instant.ofEpochSecond(-2).truncatedTo(ChronoUnit.SECONDS), Instant.ofEpochSecond(-2));
        });

    });

    describe('toEpochMilli', function () {

        it('test_toEpochMilli', () => {
            assertEquals(Instant.ofEpochSecond(1, 1000000).toEpochMilli(), 1001);
            assertEquals(Instant.ofEpochSecond(1, 2000000).toEpochMilli(), 1002);
            assertEquals(Instant.ofEpochSecond(1, 567).toEpochMilli(), 1000);
            assertEquals(Instant.ofEpochSecond(MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000)).toEpochMilli(), (MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000)) * 1000);
            assertEquals(Instant.ofEpochSecond(MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000)).toEpochMilli(), (MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000)) * 1000);
            assertEquals(Instant.ofEpochSecond(0, -1000000).toEpochMilli(), -1);
            assertEquals(Instant.ofEpochSecond(0, 1000000).toEpochMilli(), 1);
            assertEquals(Instant.ofEpochSecond(0, 999999).toEpochMilli(), 0);
            assertEquals(Instant.ofEpochSecond(0, 1).toEpochMilli(), 0);
            assertEquals(Instant.ofEpochSecond(0, 0).toEpochMilli(), 0);
            assertEquals(Instant.ofEpochSecond(0, -1).toEpochMilli(), -1);
            assertEquals(Instant.ofEpochSecond(0, -999999).toEpochMilli(), -1);
            assertEquals(Instant.ofEpochSecond(0, -1000000).toEpochMilli(), -1);
            assertEquals(Instant.ofEpochSecond(0, -1000001).toEpochMilli(), -2);
        });

        it('test_toEpochMilli_tooBig', () => {
            expect(() => {
                Instant.ofEpochSecond(MathUtil.intDiv(MathUtil.MAX_SAFE_INTEGER, 1000) + 1).toEpochMilli();
            }).to.throw(ArithmeticException);
        });

        it('test_toEpochMilli_tooSmall', () => {
            expect(() => {
                Instant.ofEpochSecond(MathUtil.intDiv(MathUtil.MIN_SAFE_INTEGER, 1000) - 1).toEpochMilli();
            }).to.throw(ArithmeticException);
        });

    });

    describe('compareTo', function () {

        it('test_comparisons', () => {
            doTest_comparisons_Instant(
                Instant.ofEpochSecond(-2, 0),
                Instant.ofEpochSecond(-2, 999999998),
                Instant.ofEpochSecond(-2, 999999999),
                Instant.ofEpochSecond(-1, 0),
                Instant.ofEpochSecond(-1, 1),
                Instant.ofEpochSecond(-1, 999999998),
                Instant.ofEpochSecond(-1, 999999999),
                Instant.ofEpochSecond(0, 0),
                Instant.ofEpochSecond(0, 1),
                Instant.ofEpochSecond(0, 2),
                Instant.ofEpochSecond(0, 999999999),
                Instant.ofEpochSecond(1, 0),
                Instant.ofEpochSecond(2, 0)
            );
        });

        function doTest_comparisons_Instant(...instants) {
            for (let i = 0; i < instants.length; i++) {
                const a = instants[i];
                for (let j = 0; j < instants.length; j++) {
                    const b = instants[j];
                    if (i < j) {
                        assertEquals(a.compareTo(b) < 0, true, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), true, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                        assertEquals(a.equals(b), false, a + ' <=> ' + b);
                    } else if (i > j) {
                        assertEquals(a.compareTo(b) > 0, true, a + ' <=> ' + b);
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
                const a = Instant.ofEpochSecond(0, 0);
                a.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('test_isBefore_ObjectNull', () => {
            expect(() => {
                const a = Instant.ofEpochSecond(0, 0);
                a.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter_ObjectNull', () => {
            expect(() => {
                const a = Instant.ofEpochSecond(0, 0);
                a.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('compareToNonInstant', () => {
            expect(() => {
                const c = Instant.ofEpochSecond(0);
                c.compareTo({});
            }).to.throw(IllegalArgumentException);
        });

    });

    describe('equals', function () {

        it('test_equals', () => {
            const test5a = Instant.ofEpochSecond(5, 20);
            const test5b = Instant.ofEpochSecond(5, 20);
            const test5n = Instant.ofEpochSecond(5, 30);
            const test6 = Instant.ofEpochSecond(6, 20);

            assertEquals(test5a.equals(test5a), true);
            assertEquals(test5a.equals(test5b), true);
            assertEquals(test5a.equals(test5n), false);
            assertEquals(test5a.equals(test6), false);

            assertEquals(test5b.equals(test5a), true);
            assertEquals(test5b.equals(test5b), true);
            assertEquals(test5b.equals(test5n), false);
            assertEquals(test5b.equals(test6), false);

            assertEquals(test5n.equals(test5a), false);
            assertEquals(test5n.equals(test5b), false);
            assertEquals(test5n.equals(test5n), true);
            assertEquals(test5n.equals(test6), false);

            assertEquals(test6.equals(test5a), false);
            assertEquals(test6.equals(test5b), false);
            assertEquals(test6.equals(test5n), false);
            assertEquals(test6.equals(test6), true);
        });

        it('test_equals_null', () => {
            const test5 = Instant.ofEpochSecond(5, 20);
            assertEquals(test5.equals(null), false);
        });

        it('test_equals_otherClass', () => {
            const test5 = Instant.ofEpochSecond(5, 20);
            assertEquals(test5.equals(''), false);
        });

    });

    describe('hashCode', function () {

        it('test_hashCode', () => {
            const test5a = Instant.ofEpochSecond(5, 20);
            const test5b = Instant.ofEpochSecond(5, 20);
            const test5n = Instant.ofEpochSecond(5, 30);
            const test6 = Instant.ofEpochSecond(6, 20);

            assertEquals(test5a.hashCode() === test5a.hashCode(), true);
            assertEquals(test5a.hashCode() === test5b.hashCode(), true);
            assertEquals(test5b.hashCode() === test5b.hashCode(), true);

            assertEquals(test5a.hashCode() === test5n.hashCode(), false);
            assertEquals(test5a.hashCode() === test6.hashCode(), false);
        });

    });

    describe('toString', function () {

        // @DataProvider(name="toStringParse")
        function data_toString() {
            return [
                [Instant.ofEpochSecond(65, 567), '1970-01-01T00:01:05.000000567Z'],
                [Instant.ofEpochSecond(1, 0), '1970-01-01T00:00:01Z'],
                [Instant.ofEpochSecond(60, 0), '1970-01-01T00:01:00Z'],
                [Instant.ofEpochSecond(3600, 0), '1970-01-01T01:00:00Z'],
                [Instant.ofEpochSecond(-1, 0), '1969-12-31T23:59:59Z'],

                [LocalDateTime.of(0, 1, 2, 0, 0).toInstant(ZoneOffset.UTC), '0000-01-02T00:00:00Z'],
                [LocalDateTime.of(0, 1, 1, 12, 30).toInstant(ZoneOffset.UTC), '0000-01-01T12:30:00Z'],
                [LocalDateTime.of(0, 1, 1, 0, 0, 0, 1).toInstant(ZoneOffset.UTC), '0000-01-01T00:00:00.000000001Z'],
                [LocalDateTime.of(0, 1, 1, 0, 0).toInstant(ZoneOffset.UTC), '0000-01-01T00:00:00Z'],

                [LocalDateTime.of(-1, 12, 31, 23, 59, 59, 999999999).toInstant(ZoneOffset.UTC), '-0001-12-31T23:59:59.999999999Z'],
                [LocalDateTime.of(-1, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '-0001-12-31T12:30:00Z'],
                [LocalDateTime.of(-1, 12, 30, 12, 30).toInstant(ZoneOffset.UTC), '-0001-12-30T12:30:00Z'],

                [LocalDateTime.of(-9999, 1, 2, 12, 30).toInstant(ZoneOffset.UTC), '-9999-01-02T12:30:00Z'],
                [LocalDateTime.of(-9999, 1, 1, 12, 30).toInstant(ZoneOffset.UTC), '-9999-01-01T12:30:00Z'],
                [LocalDateTime.of(-9999, 1, 1, 0, 0).toInstant(ZoneOffset.UTC), '-9999-01-01T00:00:00Z'],

                [LocalDateTime.of(-10000, 12, 31, 23, 59, 59, 999999999).toInstant(ZoneOffset.UTC), '-10000-12-31T23:59:59.999999999Z'],
                [LocalDateTime.of(-10000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '-10000-12-31T12:30:00Z'],
                [LocalDateTime.of(-10000, 12, 30, 12, 30).toInstant(ZoneOffset.UTC), '-10000-12-30T12:30:00Z'],
                [LocalDateTime.of(-15000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '-15000-12-31T12:30:00Z'],

                [LocalDateTime.of(-19999, 1, 2, 12, 30).toInstant(ZoneOffset.UTC), '-19999-01-02T12:30:00Z'],
                [LocalDateTime.of(-19999, 1, 1, 12, 30).toInstant(ZoneOffset.UTC), '-19999-01-01T12:30:00Z'],
                [LocalDateTime.of(-19999, 1, 1, 0, 0).toInstant(ZoneOffset.UTC), '-19999-01-01T00:00:00Z'],

                [LocalDateTime.of(-20000, 12, 31, 23, 59, 59, 999999999).toInstant(ZoneOffset.UTC), '-20000-12-31T23:59:59.999999999Z'],
                [LocalDateTime.of(-20000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '-20000-12-31T12:30:00Z'],
                [LocalDateTime.of(-20000, 12, 30, 12, 30).toInstant(ZoneOffset.UTC), '-20000-12-30T12:30:00Z'],
                [LocalDateTime.of(-25000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '-25000-12-31T12:30:00Z'],

                [LocalDateTime.of(9999, 12, 30, 12, 30).toInstant(ZoneOffset.UTC), '9999-12-30T12:30:00Z'],
                [LocalDateTime.of(9999, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '9999-12-31T12:30:00Z'],
                [LocalDateTime.of(9999, 12, 31, 23, 59, 59, 999999999).toInstant(ZoneOffset.UTC), '9999-12-31T23:59:59.999999999Z'],

                [LocalDateTime.of(10000, 1, 1, 0, 0).toInstant(ZoneOffset.UTC), '+10000-01-01T00:00:00Z'],
                [LocalDateTime.of(10000, 1, 1, 12, 30).toInstant(ZoneOffset.UTC), '+10000-01-01T12:30:00Z'],
                [LocalDateTime.of(10000, 1, 2, 12, 30).toInstant(ZoneOffset.UTC), '+10000-01-02T12:30:00Z'],
                [LocalDateTime.of(15000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '+15000-12-31T12:30:00Z'],

                [LocalDateTime.of(19999, 12, 30, 12, 30).toInstant(ZoneOffset.UTC), '+19999-12-30T12:30:00Z'],
                [LocalDateTime.of(19999, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '+19999-12-31T12:30:00Z'],
                [LocalDateTime.of(19999, 12, 31, 23, 59, 59, 999999999).toInstant(ZoneOffset.UTC), '+19999-12-31T23:59:59.999999999Z'],

                [LocalDateTime.of(20000, 1, 1, 0, 0).toInstant(ZoneOffset.UTC), '+20000-01-01T00:00:00Z'],
                [LocalDateTime.of(20000, 1, 1, 12, 30).toInstant(ZoneOffset.UTC), '+20000-01-01T12:30:00Z'],
                [LocalDateTime.of(20000, 1, 2, 12, 30).toInstant(ZoneOffset.UTC), '+20000-01-02T12:30:00Z'],
                [LocalDateTime.of(25000, 12, 31, 12, 30).toInstant(ZoneOffset.UTC), '+25000-12-31T12:30:00Z'],

                [LocalDateTime.of(-999999, 1, 1, 12, 30).toInstant(ZoneOffset.UTC).minus(1, ChronoUnit.DAYS), '-1000000-12-31T12:30:00Z'],
                [LocalDateTime.of(999999, 12, 31, 12, 30).toInstant(ZoneOffset.UTC).plus(1, ChronoUnit.DAYS), '+1000000-01-01T12:30:00Z'],

                [Instant.MIN, '-1000000-01-01T00:00:00Z'],
                [Instant.MAX, '+1000000-12-31T23:59:59.999999999Z']
            ];
        }

        //@Test(dataProvider="toStringParse")
        it('test_toString', function () {
            data_toString().forEach((data)=> {
                test_toString.apply(this, data);
            });
        });

        function test_toString(instant, expected) {
            // console.log(instant, expected);
            assertEquals(instant.toString(), expected);
        }

        //@Test(dataProvider="toStringParse")
        it('test_parse', function () {
            data_toString().forEach((data)=> {
                test_parse.apply(this, data);
            });
        });

        function test_parse(instant, text) {
            //console.log(instant, text);
            assertEquals(Instant.parse(text), instant);
        }

        //@Test(dataProvider="toStringParse")
        it('test_parseLowercase', function () {
            data_toString().forEach((data)=> {
                test_parseLowercase.apply(this, data);
            });
        });

        function test_parseLowercase(instant, text) {
            assertEquals(Instant.parse(text.toLowerCase()), instant);
        }
    });

});

