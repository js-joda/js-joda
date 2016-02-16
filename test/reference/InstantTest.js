/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {ChronoField} from '../../src/temporal/ChronoField';
import {Clock} from '../../src/Clock';
import {ZoneOffset} from '../../src/ZoneOffset';
import {Instant} from '../../src/Instant';
import {MathUtil} from '../../src/MathUtil';
import {DateTimeException} from '../../src/errors';

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
            check(Instant.MIN, -31619087596800, 0);
        });
        it('MAX', () => {
            check(Instant.MAX, 31494784780799, 999999999);
        });
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

        it('plus_secondsPlusNanos', () => {
            for(var i=0; i < dataProviderPlus.length; i++){
                var plusData = dataProviderPlus[i];
                plus_secondsPlusNanos.apply(this, plusData);
            }
        });

        // TODO replace plusSeconds and plusNano by plus(amount, TemporalUnit)
        function plus_secondsPlusNanos(seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanoOfSecond){
            var instant = Instant.ofEpochSecond(seconds, nanos).plusSeconds(otherSeconds).plusNanos(otherNanos);
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

    describe('now', () => {
        it('two calls of now should be closer the 0.1 secs', () => {
            var expected = Instant.now(Clock.systemUTC());
            var test = Instant.now();
            var diff = Math.abs(test.epochMilli() - expected.epochMilli());
            expect(diff).to.be.lessThan(100);  // less than 0.1 secs
        });

        it('now_Clock_allSecsInDay_utc', () => {
            for (var i = 0; i < (2 * 24 * 60 * 60); i+=100) {
                var expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                var clock = Clock.fixed(expected, ZoneOffset.UTC);
                var test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch', () => {
            for (var i =-1; i >= -(24 * 60 * 60); i-=100) {
                var expected = Instant.ofEpochSecond(i).plusNanos(123456789);
                var clock = Clock.fixed(expected, ZoneOffset.UTC);
                var test = Instant.now(clock);
                expect(test.equals(expected)).to.equal(true);
            }
        });
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

});

