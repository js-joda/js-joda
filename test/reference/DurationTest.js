import {expect} from 'chai';

import {ArithmeticException} from '../../src/errors';
//yuck... circular dependency between ChronoUnit and Duration... for the Duration import to work we must import ChronoUnit first :/ ...
// there MUST be a better way to do this??
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Duration} from '../../src/Duration';
import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MathUtil} from '../../src/MathUtil';

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
            expect(() => Duration.ofSeconds(Number.MAX_VALUE, 1000000000)).to.throw(ArithmeticException);
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
            let test = Duration.ofNanos(MAX_SAFE_INTEGER);
            expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, 1000000000));
            expect(test.nano()).to.eql(MathUtil.intMod(MAX_SAFE_INTEGER, 1000000000));
        });
        it('factory_nanos_nanos_min', () => {
            let test = Duration.ofNanos(MIN_SAFE_INTEGER);
            expect(test.seconds()).to.eql(MathUtil.intDiv(MIN_SAFE_INTEGER, 1000000000) - 1);
            expect(test.nano()).to.eql(MathUtil.intMod(MIN_SAFE_INTEGER, 1000000000) + 1000000000);
        });
    });
    
    describe('ofMinutes()', () => {
        it('factory_minutes', () => {
            let test = Duration.ofMinutes(2);
            expect(test.seconds()).to.eql(120);
            expect(test.nano()).to.eql(0);
        });
        it('factory_minutes_max', () => {
            let test = Duration.ofMinutes( MathUtil.intDiv(MAX_SAFE_INTEGER, 60));
            expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, 60) * 60);
            expect(test.nano()).to.eql(0);
        });
        it('factory_minutes_min', () => {
            var minutes = MathUtil.intDiv(MIN_SAFE_INTEGER, 60) + 1;
            let test = Duration.ofMinutes( minutes);
            expect(test.seconds()).to.eql(minutes * 60);
            expect(test.nano()).to.eql(0);
        });
        it('factory_minutes_tooBig', () => {
            expect(() => Duration.ofMinutes(MathUtil.intDiv(MAX_SAFE_INTEGER, 60) + 1)).to.throw(ArithmeticException);
        });
        it('factory_minutes_tooSmall', () => {
            expect(() => Duration.ofMinutes(MathUtil.intDiv(MIN_SAFE_INTEGER, 60) - 1)).to.throw(ArithmeticException);
        });
    });

    describe('ofHours()', () => {
        const SECONDS_PER_HOUR = 3600;
        it('factory_hours', () => {
            let test = Duration.ofHours(2);
            expect(test.seconds()).to.eql(2 * SECONDS_PER_HOUR);
            expect(test.nano()).to.eql(0);
        });
        it('factory_hours_max', () => {
            let test = Duration.ofHours(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR));
            expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR) * SECONDS_PER_HOUR);
            expect(test.nano()).to.eql(0);
        });
        it('factory_hours_min', () => {
            var hours = MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR) + 1;
            let test = Duration.ofHours(hours);
            expect(test.seconds()).to.eql(hours * SECONDS_PER_HOUR);
            expect(test.nano()).to.eql(0);
        });
        it('factory_hours_tooBig', () => {
            expect(() => Duration.ofHours(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR) + 1)).to.throw(ArithmeticException);
        });
        it('factory_hours_tooSmall', () => {
            expect(() => Duration.ofHours(MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR) - 1)).to.throw(ArithmeticException);
        });
    });
    
    describe('ofDays()', () => {
        const SECONDS_PER_DAY = 86400;
        it('factory_days', () => {
            let test = Duration.ofDays(2);
            expect(test.seconds()).to.eql(2 * SECONDS_PER_DAY);
            expect(test.nano()).to.eql(0);
        });
        it('factory_days_max', () => {
            let test = Duration.ofDays(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY));
            expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY) * SECONDS_PER_DAY);
            expect(test.nano()).to.eql(0);
        });
        it('factory_days_min', () => {
            var days = MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY) + 1;
            let test = Duration.ofDays(days);
            expect(test.seconds()).to.eql(days * SECONDS_PER_DAY);
            expect(test.nano()).to.eql(0);
        });
        it('factory_days_tooBig', () => {
            expect(() => Duration.ofDays(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY) + 1)).to.throw(ArithmeticException);
        });
        it('factory_days_tooSmall', () => {
            expect(() => Duration.ofDays(MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY) - 1)).to.throw(ArithmeticException);
        });
    });

    describe('of(long,TemporalUnit)', () => {
        var data_ofMillis;
        before(() => {
            data_ofMillis = [
                [0, ChronoUnit.NANOS, 0, 0],
                [0, ChronoUnit.MICROS, 0, 0],
                [0, ChronoUnit.MILLIS, 0, 0],
                [0, ChronoUnit.SECONDS, 0, 0],
                [0, ChronoUnit.MINUTES, 0, 0],
                [0, ChronoUnit.HOURS, 0, 0],
                [0, ChronoUnit.HALF_DAYS, 0, 0],
                [0, ChronoUnit.DAYS, 0, 0],
                [1, ChronoUnit.NANOS, 0, 1],
                [1, ChronoUnit.MICROS, 0, 1000],
                [1, ChronoUnit.MILLIS, 0, 1000000],
                [1, ChronoUnit.SECONDS, 1, 0],
                [1, ChronoUnit.MINUTES, 60, 0],
                [1, ChronoUnit.HOURS, 3600, 0],
                [1, ChronoUnit.HALF_DAYS, 43200, 0],
                [1, ChronoUnit.DAYS, 86400, 0],
                [3, ChronoUnit.NANOS, 0, 3],
                [3, ChronoUnit.MICROS, 0, 3000],
                [3, ChronoUnit.MILLIS, 0, 3000000],
                [3, ChronoUnit.SECONDS, 3, 0],
                [3, ChronoUnit.MINUTES, 3 * 60, 0],
                [3, ChronoUnit.HOURS, 3 * 3600, 0],
                [3, ChronoUnit.HALF_DAYS, 3 * 43200, 0],
                [3, ChronoUnit.DAYS, 3 * 86400, 0],
                [-1, ChronoUnit.NANOS, -1, 999999999],
                [-1, ChronoUnit.MICROS, -1, 999999000],
                [-1, ChronoUnit.MILLIS, -1, 999000000],
                [-1, ChronoUnit.SECONDS, -1, 0],
                [-1, ChronoUnit.MINUTES, -60, 0],
                [-1, ChronoUnit.HOURS, -3600, 0],
                [-1, ChronoUnit.HALF_DAYS, -43200, 0],
                [-1, ChronoUnit.DAYS, -86400, 0],
                [-3, ChronoUnit.NANOS, -1, 999999997],
                [-3, ChronoUnit.MICROS, -1, 999997000],
                [-3, ChronoUnit.MILLIS, -1, 997000000],
                [-3, ChronoUnit.SECONDS, -3, 0],
                [-3, ChronoUnit.MINUTES, -3 * 60, 0],
                [-3, ChronoUnit.HOURS, -3 * 3600, 0],
                [-3, ChronoUnit.HALF_DAYS, -3 * 43200, 0],
                [-3, ChronoUnit.DAYS, -3 * 86400, 0],
                [MAX_SAFE_INTEGER, ChronoUnit.NANOS, MathUtil.intDiv(MAX_SAFE_INTEGER, 1000000000), MathUtil.intMod(MAX_SAFE_INTEGER, 1000000000)],
                [MIN_SAFE_INTEGER, ChronoUnit.NANOS, MathUtil.intDiv(MIN_SAFE_INTEGER, 1000000000) - 1, MathUtil.intMod(MIN_SAFE_INTEGER, 1000000000) + 1000000000],
                [MAX_SAFE_INTEGER, ChronoUnit.MICROS, MathUtil.intDiv(MAX_SAFE_INTEGER, 1000000), MathUtil.intMod(MAX_SAFE_INTEGER, 1000000) * 1000],
                [MIN_SAFE_INTEGER, ChronoUnit.MICROS, MathUtil.intDiv(MIN_SAFE_INTEGER, 1000000) - 1, (MathUtil.intMod(MIN_SAFE_INTEGER, 1000000) + 1000000) * 1000],
                [MAX_SAFE_INTEGER, ChronoUnit.MILLIS, MathUtil.intDiv(MAX_SAFE_INTEGER, 1000), MathUtil.intMod(MAX_SAFE_INTEGER, 1000) * 1000000],
                [MIN_SAFE_INTEGER, ChronoUnit.MILLIS, MathUtil.intDiv(MIN_SAFE_INTEGER, 1000) - 1, (MathUtil.intMod(MIN_SAFE_INTEGER, 1000) + 1000) * 1000000],
                [MAX_SAFE_INTEGER, ChronoUnit.SECONDS, MAX_SAFE_INTEGER, 0],
                [MIN_SAFE_INTEGER, ChronoUnit.SECONDS, MIN_SAFE_INTEGER, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, 60), ChronoUnit.MINUTES, MathUtil.intDiv(MAX_SAFE_INTEGER, 60) * 60, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, 60), ChronoUnit.MINUTES, MathUtil.intDiv(MIN_SAFE_INTEGER, 60) * 60, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, 3600), ChronoUnit.HOURS, MathUtil.intDiv(MAX_SAFE_INTEGER, 3600) * 3600, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, 3600), ChronoUnit.HOURS, MathUtil.intDiv(MIN_SAFE_INTEGER, 3600) * 3600, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, 43200), ChronoUnit.HALF_DAYS, MathUtil.intDiv(MAX_SAFE_INTEGER, 43200) * 43200, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, 43200), ChronoUnit.HALF_DAYS, MathUtil.intDiv(MIN_SAFE_INTEGER, 43200) * 43200, 0]
            ];
        });

        it('factory_of_longTemporalUnit', () => {
            data_ofMillis.forEach((val, index) => {
                let [amount, unit, expectedSeconds, expectedNanos] = val;
                let test = Duration.of(amount, unit);
                expect(test.seconds()).to.eql(expectedSeconds);
                expect(test.nano()).to.eql(expectedNanos);
            });
        });

    });

});
