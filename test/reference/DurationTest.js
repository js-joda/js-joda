import {expect} from 'chai';

import {ArithmeticException} from '../../src/errors';
//yuck... circular dependency between ChronoUnit and Duration... for the Duration import to work we must import ChronoUnit first :/ ...
// there MUST be a better way to do this??
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Duration} from '../../src/Duration';
import {MathUtil} from '../../src/MathUtil';

describe('org.threeten.bp.TestDuration', () => {

    describe('constants', () => {
        it('test_zero', () => {
            expect(Duration.ZERO.seconds()).to.eql(0);
            expect(Duration.ZERO.nano()).to.eql(0);
        });
    });

    describe('ofSeconds(long)', () => {
        it('factory_seconds_long', () => {
            for (let i = -2; i <= 2; i++) {
                let t = Duration.ofSeconds(i);
                expect(t.seconds()).to.eql(i);
                expect(t.nano()).to.eql(0);
            }
        });
    });
    
    describe('ofSeconds(long, long)', () => {
        it('factory_seconds_long_long', () => {
            for (let i = -2; i <= 2; i++) {
                for (let j = 0; j < 10; j++) {
                    let t = Duration.ofSeconds(i, j);
                    expect(t.seconds()).to.eql(i);
                    expect(t.nano()).to.eql(j);
                }
                for (let j = -10; j < 0; j++) {
                    let t = Duration.ofSeconds(i, j);
                    expect(t.seconds()).to.eql(i - 1);
                    expect(t.nano()).to.eql(j + 1000000000);
                }
                for (let j = 999999990; j < 1000000000; j++) {
                    let t = Duration.ofSeconds(i, j);
                    expect(t.seconds()).to.eql(i);
                    expect(t.nano()).to.eql(j);
                }
                let t = Duration.ofSeconds(i);
                expect(t.seconds()).to.eql(i);
                expect(t.nano()).to.eql(0);
            }
        });

        it('factory_seconds_long_long_nanosNegativeAdjusted', () => {
            let test = Duration.ofSeconds(2, -1);
            expect(test.seconds()).to.eql(1);
            expect(test.nano()).to.eql(999999999);
        });

        it('factory_seconds_long_long_tooBig', () => {
            expect(() => Duration.ofSeconds(Number.MAX_VALUE, 1000000000)).to.throw(ArithmeticException)
        });
    });
    
    describe('ofMillis(long)', () => {
        var data_ofMillis;
        before(() => {
            data_ofMillis = [
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
                [-1001, -2, 999000000]
            ];
        });

        it('factory_millis_long', () => {
            data_ofMillis.forEach((val) => {
                let [millis, expectedSeconds, expectedNano] = val;
                let test = Duration.ofMillis(millis);
                expect(test.seconds()).to.eql(expectedSeconds);
                expect(test.nano()).to.eql(expectedNano);
            });
        });
    });

    describe('ofNanos(long)', () => {
        it('factory_nanos_nanos', () => {
            let test = Duration.ofNanos(1);
            expect(test.seconds()).to.eql(0);
            expect(test.nano()).to.eql(1);
        });
        it('factory_nanos_nanosSecs', () => {
            let test = Duration.ofNanos(1000000002);
            expect(test.seconds()).to.eql(1);
            expect(test.nano()).to.eql(2);
        });
        it('factory_nanos_nanos_negative', () => {
            let test = Duration.ofNanos(-2000000001);
            expect(test.seconds()).to.eql(-3);
            expect(test.nano()).to.eql(999999999);
        });
        it('factory_nanos_nanos_max', () => {
            var maxValue = 2^53-1; // Number.MAX_SAFE_INTEGER not defined in #@#$%! PhantomJS
            let test = Duration.ofNanos(maxValue);
            expect(test.seconds()).to.eql(MathUtil.floorDiv(maxValue, 1000000000));
            expect(test.nano()).to.eql(MathUtil.floorMod(maxValue, 1000000000));
        });
        it('factory_nanos_nanos_min', () => {
            var minValue = -(2^53-1); // Number.MIN_SAFE_INTEGER not defined in #@#$%! PhantomJS
            let test = Duration.ofNanos(minValue);
            expect(test.seconds()).to.eql(MathUtil.floorDiv(minValue, 1000000000));
            expect(test.nano()).to.eql(MathUtil.floorMod(minValue, 1000000000));
        });
    });
});
