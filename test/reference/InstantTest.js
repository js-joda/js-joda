/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../testUtils';

import '../_init';

import {DateTimeException,NullPointerException, ArithmeticException, IllegalArgumentException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {Duration} from '../../src/Duration';
import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {MathUtil} from '../../src/MathUtil';
import {ZoneOffset} from '../../src/ZoneOffset';

import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';

const MIN_SECOND = Instant.MIN.epochSecond();
const MAX_SECOND = Instant.MAX.epochSecond();

describe('org.threeten.bp.TestInstant', () => {
    
    var TEST_12345_123456789;
    
    before(() => {
        TEST_12345_123456789 = Instant.ofEpochSecond(12345, 123456789);
    });
    
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
            var expected = Instant.now(Clock.systemUTC());
            var test = Instant.now();
            var diff = Math.abs(test.toEpochMilli() - expected.toEpochMilli());
            expect(diff).to.be.lessThan(100);  // less than 0.1 secs
        });

        it('now_Clock_allSecsInDay_utc', () => {
            for (var i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                var expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                var clock = Clock.fixed(expected, ZoneOffset.UTC);
                var test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch', () => {
            for (var i = -1; i >= -(24 * 60 * 60); i -= 100) {
                var expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                var clock = Clock.fixed(expected, ZoneOffset.UTC);
                var test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });
    });

    describe('ofEpochSecond()', function () {

    });

    describe('ofEpochMilli()', function () {

    });

    describe('parse', function () {

    });

    describe('get(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            let test = TEST_12345_123456789;
            expect(test.get(ChronoField.NANO_OF_SECOND)).to.eql(123456789);
            expect(test.get(ChronoField.MICRO_OF_SECOND)).to.eql(123456);
            expect(test.get(ChronoField.MILLI_OF_SECOND)).to.eql(123);
        });

        it('test_getLong_TemporalField', () => {
            let test = TEST_12345_123456789;
            expect(test.getLong(ChronoField.NANO_OF_SECOND)).to.eql(123456789);
            expect(test.getLong(ChronoField.MICRO_OF_SECOND)).to.eql(123456);
            expect(test.getLong(ChronoField.MILLI_OF_SECOND)).to.eql(123);
            expect(test.getLong(ChronoField.INSTANT_SECONDS)).to.eql(12345);
        });
    });

    describe('query', function () {

    });

    describe('plus', () => {
        var dataProviderPlus;
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
            for (var i = 0; i < dataProviderPlus.length; i++) {
                var plusData = dataProviderPlus[i];
                plus_Duration.apply(this, plusData);
            }
        });

        //@Test(dataProvider="Plus")
        function plus_Duration(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond) {
            var i = Instant.ofEpochSecond(seconds, nanos).plus(Duration.ofSeconds(otherSeconds, otherNanos));
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('plus_Duration_overflowTooBig', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.plus(Duration.ofSeconds(0, 1));
            }).to.throw(DateTimeException);
        });

        it('plus_Duration_overflowTooSmall', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MIN_SECOND);
                i.plus(Duration.ofSeconds(-1, 999999999));
            }).to.throw(DateTimeException);
        });


        it('plus_longTemporalUnit', () => {
            for(var i=0; i < dataProviderPlus.length; i++){
                var plusData = dataProviderPlus[i];
                plus_longTemporalUnit.apply(this, plusData);
            }
        });

        function plus_longTemporalUnit(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond){
            var instant = Instant.ofEpochSecond(seconds, nanos)
                .plus(otherSeconds, ChronoUnit.SECONDS)
                .plus(otherNanos, ChronoUnit.NANOS);
            expect(instant.epochSecond()).to.equal(expectedSeconds);
            expect(instant.nano()).to.equal(expectedNanoOfSecond);
        }

        it('plus_longTemporalUnit_overflowTooBig', () => {
            var instant = Instant.ofEpochSecond(MAX_SECOND, 999999999);
            expect(()=>{
                instant.plusNanos(1);
            }).to.throw(DateTimeException);
        });

        it('plus_longTemporalUnit_overflowTooSmall', () => {
            var instant = Instant.ofEpochSecond(MIN_SECOND);
            expect(()=>{
                instant.plusNanos(999999999);
                instant.plusSeconds(-1);
            }).to.throw(DateTimeException);
        });
    });

    describe('plusSeconds', () => {
        var dataProviderPlus;
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
            for(var i=0; i < dataProviderPlus.length; i++){
                var plusData = dataProviderPlus[i];
                plusSeconds.apply(this, plusData);
            }
        });

        function plusSeconds(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            var instant = Instant.ofEpochSecond(seconds, nanos);
            instant = instant.plusSeconds(amount);
            expect(instant.epochSecond()).to.equal(expectedSeconds);
            expect(instant.nano()).to.equal(expectedNanoOfSecond);
        }

        it('plusSeconds_long_overflowTooBig', () => {
            var instant = Instant.ofEpochSecond(1, 0);
            expect(()=>{
                instant.plusSeconds(MAX_SECOND);
            }).to.throw(DateTimeException);
        });

        it('plusSeconds_long_overflowTooSmall', () => {
            var instant = Instant.ofEpochSecond(-1, 0);
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
            var t = Instant.ofEpochSecond(seconds, nanos);
            t = t.plusMillis(amount);
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
            var t = Instant.ofEpochSecond(seconds + 1, nanos);
            t = t.plusMillis(amount);
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
            var t = Instant.ofEpochSecond(seconds - 1, nanos);
            t = t.plusMillis(amount);
            assertEquals(t.epochSecond(), expectedSeconds - 1);
            assertEquals(t.nano(), expectedNanoOfSecond);
        }
    
        it('plusMillis_long_max', () => {
            var t = Instant.ofEpochSecond(MAX_SECOND, 998999999);
            t = t.plusMillis(1);
            assertEquals(t.epochSecond(), MAX_SECOND);
            assertEquals(t.nano(), 999999999);
        });
    
        it('plusMillis_long_overflowTooBig', () => {
            expect(() => {
                var t = Instant.ofEpochSecond(MAX_SECOND, 999000000);
                t.plusMillis(1);
            }).to.throw(DateTimeException);
        });
    
        it('plusMillis_long_min', () => {
            var t = Instant.ofEpochSecond(MIN_SECOND, 1000000);
            t = t.plusMillis(-1);
            assertEquals(t.epochSecond(), MIN_SECOND);
            assertEquals(t.nano(), 0);
        });
    
        it('plusMillis_long_overflowTooSmall', () => {
            expect(() => {
                var t = Instant.ofEpochSecond(MIN_SECOND, 0);
                t.plusMillis(-1);
            }).to.throw(DateTimeException);
        });
        
    });

    describe('plusNanos', () => {
        var dataProviderPlus;
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
            for(var i=0; i < dataProviderPlus.length; i++){
                var plusData = dataProviderPlus[i];
                plusNanos.apply(this, plusData);
            }
        });

        function plusNanos(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            var instant = Instant.ofEpochSecond(seconds, nanos);
            instant = instant.plusNanos(amount);
            expect(instant.epochSecond(), 'epochSecond').to.equal(expectedSeconds);
            expect(instant.nano(), 'nano').to.equal(expectedNanoOfSecond);
        }

        it('plusNanos_long_overflowTooBig', () => {
            var instant = Instant.ofEpochSecond(MAX_SECOND, 999999999);
            expect(()=>{
                instant.plusNanos(1);
            }).to.throw(DateTimeException);
        });

        it('plusNanos_long_overflowTooSmall', () => {
            var instant = Instant.ofEpochSecond(MIN_SECOND, 0);
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
            var i = Instant.ofEpochSecond(seconds, nanos).minus(Duration.ofSeconds(otherSeconds, otherNanos));
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }
    
        it('minus_Duration_overflowTooSmall', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MIN_SECOND);
                i.minus(Duration.ofSeconds(0, 1));
            }).to.throw(DateTimeException);
        });
    
        it('minus_Duration_overflowTooBig', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
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
            var i = Instant.ofEpochSecond(seconds, nanos).minus(otherSeconds, ChronoUnit.SECONDS).minus(otherNanos, ChronoUnit.NANOS);
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }
    
        it('minus_longTemporalUnit_overflowTooSmall', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MIN_SECOND);
                i.minus(1, ChronoUnit.NANOS);
            }).to.throw(DateTimeException);
        });
    
        it('minus_longTemporalUnit_overflowTooBig', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.minus(999999999, ChronoUnit.NANOS);
                i.minus(-1, ChronoUnit.SECONDS);
            }).to.throw(DateTimeException);
        });
        
    });
    
    describe('minusSeconds', () => {
    
        var dataProviderPlus;
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
            for(var i=0; i < dataProviderPlus.length; i++){
                var plusData = dataProviderPlus[i];
                minusSeconds.apply(this, plusData);
            }
        });

        function minusSeconds(seconds, nanos, amount, expectedSeconds, expectedNanoOfSecond){
            var instant = Instant.ofEpochSecond(seconds, nanos);
            instant = instant.minusSeconds(amount);
            expect(instant.epochSecond(), 'epochSecond').to.equal(expectedSeconds);
            expect(instant.nano(), 'nano').to.equal(expectedNanoOfSecond);
        }

        it('minusSeconds_long_overflowTooBig', () => {
            var instant = Instant.ofEpochSecond(1, 0);
            expect(()=>{
                instant.minusSeconds(-MAX_SECOND);
            }).to.throw(DateTimeException);
        });

        it('minusSeconds_long_overflowTooSmall', () => {
            var instant = Instant.ofEpochSecond(-1, 0);
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
            var i = Instant.ofEpochSecond(seconds, nanos);
            i = i.minusMillis(amount);
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
            var i = Instant.ofEpochSecond(seconds + 1, nanos);
            i = i.minusMillis(amount);
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
            var i = Instant.ofEpochSecond(seconds - 1, nanos);
            i = i.minusMillis(amount);
            assertEquals(i.epochSecond(), expectedSeconds - 1);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusMillis_long_max', () => {
            var i = Instant.ofEpochSecond(MAX_SECOND, 998999999);
            i = i.minusMillis(-1);
            assertEquals(i.epochSecond(), MAX_SECOND);
            assertEquals(i.nano(), 999999999);
        });

        it('minusMillis_long_overflowTooBig', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MAX_SECOND, 999000000);
                i.minusMillis(-1);
            }).to.throw(DateTimeException);
        });

        it('minusMillis_long_min', () => {
            var i = Instant.ofEpochSecond(MIN_SECOND, 1000000);
            i = i.minusMillis(1);
            assertEquals(i.epochSecond(), MIN_SECOND);
            assertEquals(i.nano(), 0);
        });

        it('minusMillis_long_overflowTooSmall', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MIN_SECOND, 0);
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
            var i = Instant.ofEpochSecond(seconds, nanos);
            i = i.minusNanos(amount);
            assertEquals(i.epochSecond(), expectedSeconds);
            assertEquals(i.nano(), expectedNanoOfSecond);
        }

        it('minusNanos_long_overflowTooBig', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MAX_SECOND, 999999999);
                i.minusNanos(-1);
            }).to.throw(DateTimeException);
        });

        it('minusNanos_long_overflowTooSmall', () => {
            expect(() => {
                var i = Instant.ofEpochSecond(MIN_SECOND, 0);
                i.minusNanos(1);
            }).to.throw(DateTimeException);
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
            for (var i = 0; i < instants.length; i++) {
                var a = instants[i];
                for (var j = 0; j < instants.length; j++) {
                    var b = instants[j];
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
                var a = Instant.ofEpochSecond(0, 0);
                a.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('test_isBefore_ObjectNull', () => {
            expect(() => {
                var a = Instant.ofEpochSecond(0, 0);
                a.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter_ObjectNull', () => {
            expect(() => {
                var a = Instant.ofEpochSecond(0, 0);
                a.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('compareToNonInstant', () => {
            expect(() => {
                var c = Instant.ofEpochSecond(0);
                c.compareTo({});
            }).to.throw(IllegalArgumentException);
        });

    });

    describe('equals', function () {

        it('test_equals', () => {
            var test5a = Instant.ofEpochSecond(5, 20);
            var test5b = Instant.ofEpochSecond(5, 20);
            var test5n = Instant.ofEpochSecond(5, 30);
            var test6 = Instant.ofEpochSecond(6, 20);

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
            var test5 = Instant.ofEpochSecond(5, 20);
            assertEquals(test5.equals(null), false);
        });

        it('test_equals_otherClass', () => {
            var test5 = Instant.ofEpochSecond(5, 20);
            assertEquals(test5.equals(''), false);
        });

    });

    describe('hashCode', function () {

        it('test_hashCode', () => {
            var test5a = Instant.ofEpochSecond(5, 20);
            var test5b = Instant.ofEpochSecond(5, 20);
            var test5n = Instant.ofEpochSecond(5, 30);
            var test6 = Instant.ofEpochSecond(6, 20);

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
            console.log(instant, expected);
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

