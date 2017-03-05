/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {dataProviderTest} from '../testUtils';

import '../_init';

import {ArithmeticException, DateTimeParseException, NullPointerException, UnsupportedTemporalTypeException} from '../../src/errors';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Duration} from '../../src/Duration';
import {Instant} from '../../src/Instant';
import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MathUtil} from '../../src/MathUtil';
import {TemporalAmount} from '../../src/temporal/TemporalAmount';
import {TemporalUnit} from '../../src/temporal/TemporalUnit';

describe('org.threeten.bp.TestDuration', () => {
    const SECONDS_PER_DAY = 86400;
    const SECONDS_PER_HOUR = 60 * 60;

    describe('constants', () => {
        it('test_zero', () => {
            expect(Duration.ZERO.seconds()).to.eql(0);
            expect(Duration.ZERO.nano()).to.eql(0);
        });
    });

    describe('of', () => {
        describe('ofSeconds(long)', () => {
            it('factory_seconds_long', () => {
                for (let i = -2; i <= 2; i++) {
                    const t = Duration.ofSeconds(i);
                    expect(t.seconds()).to.eql(i);
                    expect(t.nano()).to.eql(0);
                }
            });
        });

        describe('ofSeconds(long, long)', () => {
            it('factory_seconds_long_long', () => {
                for (let i = -2; i <= 2; i++) {
                    for (let j = 0; j < 10; j++) {
                        const t = Duration.ofSeconds(i, j);
                        expect(t.seconds()).to.eql(i);
                        expect(t.nano()).to.eql(j);
                    }
                    for (let j = -10; j < 0; j++) {
                        const t = Duration.ofSeconds(i, j);
                        expect(t.seconds()).to.eql(i - 1);
                        expect(t.nano()).to.eql(j + 1000000000);
                    }
                    for (let j = 999999990; j < 1000000000; j++) {
                        const t = Duration.ofSeconds(i, j);
                        expect(t.seconds()).to.eql(i);
                        expect(t.nano()).to.eql(j);
                    }
                    const t = Duration.ofSeconds(i);
                    expect(t.seconds()).to.eql(i);
                    expect(t.nano()).to.eql(0);
                }
            });

            it('factory_seconds_long_long_nanosNegativeAdjusted', () => {
                const test = Duration.ofSeconds(2, -1);
                expect(test.seconds()).to.eql(1);
                expect(test.nano()).to.eql(999999999);
            });

            it('factory_seconds_long_long_tooBig', () => {
                expect(() => Duration.ofSeconds(Number.MAX_VALUE, 1000000000)).to.throw(ArithmeticException);
            });
        });

        describe('ofMillis(long)', () => {
            let data_ofMillis;
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
                    const [millis, expectedSeconds, expectedNano] = val;
                    const test = Duration.ofMillis(millis);
                    expect(test.seconds()).to.eql(expectedSeconds);
                    expect(test.nano()).to.eql(expectedNano);
                });
            });
        });

        describe('ofNanos(long)', () => {
            it('factory_nanos_nanos', () => {
                const test = Duration.ofNanos(1);
                expect(test.seconds()).to.eql(0);
                expect(test.nano()).to.eql(1);
            });
            it('factory_nanos_nanosSecs', () => {
                const test = Duration.ofNanos(1000000002);
                expect(test.seconds()).to.eql(1);
                expect(test.nano()).to.eql(2);
            });
            it('factory_nanos_nanos_negative', () => {
                const test = Duration.ofNanos(-2000000001);
                expect(test.seconds()).to.eql(-3);
                expect(test.nano()).to.eql(999999999);
            });
            it('factory_nanos_nanos_max', () => {
                const test = Duration.ofNanos(MAX_SAFE_INTEGER);
                expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, 1000000000));
                expect(test.nano()).to.eql(MathUtil.intMod(MAX_SAFE_INTEGER, 1000000000));
            });
            it('factory_nanos_nanos_min', () => {
                const test = Duration.ofNanos(MIN_SAFE_INTEGER);
                expect(test.seconds()).to.eql(MathUtil.intDiv(MIN_SAFE_INTEGER, 1000000000) - 1);
                expect(test.nano()).to.eql(MathUtil.intMod(MIN_SAFE_INTEGER, 1000000000) + 1000000000);
            });
        });

        describe('ofMinutes()', () => {
            it('factory_minutes', () => {
                const test = Duration.ofMinutes(2);
                expect(test.seconds()).to.eql(120);
                expect(test.nano()).to.eql(0);
            });
            it('factory_minutes_max', () => {
                const test = Duration.ofMinutes(MathUtil.intDiv(MAX_SAFE_INTEGER, 60));
                expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, 60) * 60);
                expect(test.nano()).to.eql(0);
            });
            it('factory_minutes_min', () => {
                const minutes = MathUtil.intDiv(MIN_SAFE_INTEGER, 60) + 1;
                const test = Duration.ofMinutes(minutes);
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
                const test = Duration.ofHours(2);
                expect(test.seconds()).to.eql(2 * SECONDS_PER_HOUR);
                expect(test.nano()).to.eql(0);
            });
            it('factory_hours_max', () => {
                const test = Duration.ofHours(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR));
                expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR) * SECONDS_PER_HOUR);
                expect(test.nano()).to.eql(0);
            });
            it('factory_hours_min', () => {
                const hours = MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR) + 1;
                const test = Duration.ofHours(hours);
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
            it('factory_days', () => {
                const test = Duration.ofDays(2);
                expect(test.seconds()).to.eql(2 * SECONDS_PER_DAY);
                expect(test.nano()).to.eql(0);
            });
            it('factory_days_max', () => {
                const test = Duration.ofDays(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY));
                expect(test.seconds()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY) * SECONDS_PER_DAY);
                expect(test.nano()).to.eql(0);
            });
            it('factory_days_min', () => {
                const days = MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY) + 1;
                const test = Duration.ofDays(days);
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
            const data_of_long_TemporalUnit = [
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

            const data_of_long_TemporalUnit_outOfRange = [
                [MAX_SAFE_INTEGER / 60 + 1, ChronoUnit.MINUTES],
                [MIN_SAFE_INTEGER / 60 - 1, ChronoUnit.MINUTES],
                [MAX_SAFE_INTEGER / 3600 + 1, ChronoUnit.HOURS],
                [MIN_SAFE_INTEGER / 3600 - 1, ChronoUnit.HOURS],
                [MAX_SAFE_INTEGER / 43200 + 1, ChronoUnit.HALF_DAYS],
                [MIN_SAFE_INTEGER / 43200 - 1, ChronoUnit.HALF_DAYS]
            ];


            it('factory_of_longTemporalUnit', () => {
                data_of_long_TemporalUnit.forEach((val) => {
                    const [amount, unit, expectedSeconds, expectedNanos] = val;
                    const test = Duration.of(amount, unit);
                    expect(test.seconds()).to.eql(expectedSeconds);
                    expect(test.nano()).to.eql(expectedNanos);
                });
            });

            it('factory_of_longTemporalUnit_outOfRange', () => {
                data_of_long_TemporalUnit_outOfRange.forEach((val) => {
                    const [amount, unit] = val;
                    expect(() => Duration.of(amount, unit)).to.throw(ArithmeticException);
                });
            });

            it('factory_of_longTemporalUnit_estimatedUnit', () => {
                expect(() => Duration.of(2, ChronoUnit.WEEKS)).to.throw(UnsupportedTemporalTypeException);
            });

            it('factory_of_longTemporalUnit_null', () => {
                expect(() => Duration.of(1, null)).to.throw(NullPointerException);
            });

        });
    });
    describe('from(amount)', () => {
        it('factory_from_amount', () => {
            /* test implementation of TemporalAmount,
             * that returns 1 for each supported ChronUnit
             */
            class TestTemporalAmount extends TemporalAmount {
                units() {
                    return [
                        ChronoUnit.DAYS,
                        ChronoUnit.MINUTES,
                        ChronoUnit.SECONDS,
                        ChronoUnit.MILLIS,
                        ChronoUnit.MICROS,
                        ChronoUnit.NANOS
                    ];
                }

                get() {
                    return 1;
                }
            }
            const amount = new TestTemporalAmount();
            const test = Duration.from(amount);
            expect(test.seconds()).to.eql(SECONDS_PER_DAY + 60 + 1);
            expect(test.nano()).to.eql(1001001);
        });
        it('factory_from_duration', () => {
            const amount = new Duration.ofSeconds(SECONDS_PER_DAY);
            const test = Duration.from(amount);
            expect(test.seconds()).to.eql(SECONDS_PER_DAY);
            expect(test.nano()).to.eql(0);
        });
    });

    describe('parse(String)', () => {
        const data_parse = [
            ['PT0S', 0, 0],

            ['PT1S', 1, 0],
            ['PT12S', 12, 0],
            ['PT123456789S', 123456789, 0],
            ['PT' + MAX_SAFE_INTEGER + 'S', MAX_SAFE_INTEGER, 0],

            ['PT+1S', 1, 0],
            ['PT+12S', 12, 0],
            ['PT-1S', -1, 0],
            ['PT-12S', -12, 0],
            ['PT-123456789S', -123456789, 0],
            ['PT' + MIN_SAFE_INTEGER + 'S', MIN_SAFE_INTEGER, 0],

            ['PT0.1S', 0, 100000000],
            ['PT1.1S', 1, 100000000],
            ['PT1.12S', 1, 120000000],
            ['PT1.123S', 1, 123000000],
            ['PT1.1234S', 1, 123400000],
            ['PT1.12345S', 1, 123450000],
            ['PT1.123456S', 1, 123456000],
            ['PT1.1234567S', 1, 123456700],
            ['PT1.12345678S', 1, 123456780],
            ['PT1.123456789S', 1, 123456789],

            ['PT-0.1S', -1, 1000000000 - 100000000],
            ['PT-1.1S', -2, 1000000000 - 100000000],
            ['PT-1.12S', -2, 1000000000 - 120000000],
            ['PT-1.123S', -2, 1000000000 - 123000000],
            ['PT-1.1234S', -2, 1000000000 - 123400000],
            ['PT-1.12345S', -2, 1000000000 - 123450000],
            ['PT-1.123456S', -2, 1000000000 - 123456000],
            ['PT-1.1234567S', -2, 1000000000 - 123456700],
            ['PT-1.12345678S', -2, 1000000000 - 123456780],
            ['PT-1.123456789S', -2, 1000000000 - 123456789],

            ['PT' + MAX_SAFE_INTEGER + '.123456789S', MAX_SAFE_INTEGER, 123456789],
            ['PT' + MIN_SAFE_INTEGER + '.000000000S', MIN_SAFE_INTEGER, 0],

            ['PT12M', 12 * 60, 0],
            ['PT12M0.35S', 12 * 60, 350000000],
            ['PT12M1.35S', 12 * 60 + 1, 350000000],
            ['PT12M-0.35S', 12 * 60 - 1, 1000000000 - 350000000],
            ['PT12M-1.35S', 12 * 60 - 2, 1000000000 - 350000000],

            ['PT12H', 12 * 3600, 0],
            ['PT12H0.35S', 12 * 3600, 350000000],
            ['PT12H1.35S', 12 * 3600 + 1, 350000000],
            ['PT12H-0.35S', 12 * 3600 - 1, 1000000000 - 350000000],
            ['PT12H-1.35S', 12 * 3600 - 2, 1000000000 - 350000000],

            ['P12D', 12 * 24 * 3600, 0],
            ['P12DT0.35S', 12 * 24 * 3600, 350000000],
            ['P12DT1.35S', 12 * 24 * 3600 + 1, 350000000],
            ['P12DT-0.35S', 12 * 24 * 3600 - 1, 1000000000 - 350000000],
            ['P12DT-1.35S', 12 * 24 * 3600 - 2, 1000000000 - 350000000],

            ['-P12D', -12 * 24 * 3600, 0],
            ['-P12DT0.35S', -12 * 24 * 3600 - 1, 1000000000 - 350000000],
            ['-P12DT1.35S', -12 * 24 * 3600 - 2, 1000000000 - 350000000],
            ['-P12DT-0.35S', -12 * 24 * 3600, 350000000],
            ['-P12DT-1.35S', -12 * 24 * 3600 + 1, 350000000]
        ];

        it('factory_parse', () => {
            data_parse.forEach((val) => {
                const [text, expectedSeconds, expectedNanos] = val;
                const t = Duration.parse(text);
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        it('factory_parse_ignoreCase', () => {
            data_parse.forEach((val) => {
                const [text, expectedSeconds, expectedNanos] = val;
                const t = Duration.parse(text.toLowerCase());
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        it('factory_parse_comma', () => {
            data_parse.forEach((val) => {
                const [text, expectedSeconds, expectedNanos] = val;
                const t = Duration.parse(text.replace('.', ','));
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        const data_parseFailures = [
            '',
            'PTS',
            'AT0S',
            'PA0S',
            'PT0A',

            'PT+S',
            'PT-S',
            'PT.S',
            'PTAS',

            'PT-.S',
            'PT+.S',

            'PT1ABC2S',
            'PT1.1ABC2S',

            'PT123456789123456789123456789S',
            'PT0.1234567891S',
            'PT.1S',

            'PT2.-3',
            'PT-2.-3',
            'PT2.+3',
            'PT-2.+3'
        ];

        it('factory_parseFailures', () => {
            data_parseFailures.forEach((val) => {
                expect(() => {
                    Duration.parse(val);
                }).to.throw(DateTimeParseException);
            });
        });

        it('factory_parseFailures_comma', () => {
            data_parseFailures.forEach((val) => {
                expect(() => {
                    Duration.parse(val.replace('.', ','));
                }).to.throw(DateTimeParseException);
            });
        });

        it('factory_parse_tooBig', () => {
            expect(() => {
                Duration.parse('PT' + MAX_SAFE_INTEGER + '1S');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_tooBig_overflow', () => {
            expect(() => {
                Duration.parse('PT1M' + (MAX_SAFE_INTEGER - 1) + 'S');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_tooBig_decimal', () => {
            expect(() => {
                Duration.parse('PT' + MAX_SAFE_INTEGER + '1.1S');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_tooSmall', () => {
            expect(() => {
                Duration.parse('PT' + MIN_SAFE_INTEGER + '1S');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_tooSmall_decimal', () => {
            expect(() => {
                Duration.parse('PT' + MIN_SAFE_INTEGER + '1.1S');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_null', () => {
            expect(() => {
                Duration.parse(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('between()', () => {
        const data_between_Instant_Instant = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1],
            [0, 1, 0, 0, -1, 999999999],
            [0, 0, 1, 0, 1, 0],
            [0, 0, -1, 1, -1, 1],
            [1, 1, 2, 0, 0, 999999999],
            [3, 0, 7, 0, 4, 0],
            [3, 20, 7, 50, 4, 30],
            [3, 80, 7, 50, 3, 999999970],
            [7, 0, 3, 0, -4, 0],
            [7, 0, 3, 1, -4, 1]
        ];

        it('factory_between_Instant_Instant', () => {
            data_between_Instant_Instant.forEach((val) => {
                const [secs1, nanos1, secs2, nanos2, expectedSeconds, expectedNanos] = val;
                const start = Instant.ofEpochSecond(secs1, nanos1);
                const end = Instant.ofEpochSecond(secs2, nanos2);
                const t = Duration.between(start, end);
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        it('factory_between_Instant_Instant_startNull', () => {
            const end = Instant.ofEpochSecond(1);
            expect(() => {
                Duration.between(null, end);
            }).to.throw(NullPointerException);
        });

        it('factory_between_Instant_Instant_endNull', () => {
            const start = Instant.ofEpochSecond(1);
            expect(() => {
                Duration.between(start, null);
            }).to.throw(NullPointerException);
        });

    });

    describe('isZero(), isPositive(), isPositiveOrZero(), isNegative(), isNegativeOrZero()', () => {

        it('test_isZero', () => {
            expect(Duration.ofNanos(0).isZero()).to.eql(true);
            expect(Duration.ofSeconds(0).isZero()).to.eql(true);
            expect(Duration.ofNanos(1).isZero()).to.eql(false);
            expect(Duration.ofSeconds(1).isZero()).to.eql(false);
            expect(Duration.ofSeconds(1, 1).isZero()).to.eql(false);
            expect(Duration.ofNanos(-1).isZero()).to.eql(false);
            expect(Duration.ofSeconds(-1).isZero()).to.eql(false);
            expect(Duration.ofSeconds(-1, -1).isZero()).to.eql(false);
        });

        it('test_isNegative', () => {
            expect(Duration.ofNanos(0).isNegative()).to.eql(false);
            expect(Duration.ofSeconds(0).isNegative()).to.eql(false);
            expect(Duration.ofNanos(1).isNegative()).to.eql(false);
            expect(Duration.ofSeconds(1).isNegative()).to.eql(false);
            expect(Duration.ofSeconds(1, 1).isNegative()).to.eql(false);
            expect(Duration.ofNanos(-1).isNegative()).to.eql(true);
            expect(Duration.ofSeconds(-1).isNegative()).to.eql(true);
            expect(Duration.ofSeconds(-1, -1).isNegative()).to.eql(true);
        });
    });

    describe('plus', () => {
        describe('plusDuration()', () => {
            const data_plus = [
                [MIN_SAFE_INTEGER, 0, MAX_SAFE_INTEGER, 0, 0, 0],

                [-4, 666666667, -4, 666666667, -7, 333333334],
                [-4, 666666667, -3, 0, -7, 666666667],
                [-4, 666666667, -2, 0, -6, 666666667],
                [-4, 666666667, -1, 0, -5, 666666667],
                [-4, 666666667, -1, 333333334, -4, 1],
                [-4, 666666667, -1, 666666667, -4, 333333334],
                [-4, 666666667, -1, 999999999, -4, 666666666],
                [-4, 666666667, 0, 0, -4, 666666667],
                [-4, 666666667, 0, 1, -4, 666666668],
                [-4, 666666667, 0, 333333333, -3, 0],
                [-4, 666666667, 0, 666666666, -3, 333333333],
                [-4, 666666667, 1, 0, -3, 666666667],
                [-4, 666666667, 2, 0, -2, 666666667],
                [-4, 666666667, 3, 0, -1, 666666667],
                [-4, 666666667, 3, 333333333, 0, 0],

                [-3, 0, -4, 666666667, -7, 666666667],
                [-3, 0, -3, 0, -6, 0],
                [-3, 0, -2, 0, -5, 0],
                [-3, 0, -1, 0, -4, 0],
                [-3, 0, -1, 333333334, -4, 333333334],
                [-3, 0, -1, 666666667, -4, 666666667],
                [-3, 0, -1, 999999999, -4, 999999999],
                [-3, 0, 0, 0, -3, 0],
                [-3, 0, 0, 1, -3, 1],
                [-3, 0, 0, 333333333, -3, 333333333],
                [-3, 0, 0, 666666666, -3, 666666666],
                [-3, 0, 1, 0, -2, 0],
                [-3, 0, 2, 0, -1, 0],
                [-3, 0, 3, 0, 0, 0],
                [-3, 0, 3, 333333333, 0, 333333333],

                [-2, 0, -4, 666666667, -6, 666666667],
                [-2, 0, -3, 0, -5, 0],
                [-2, 0, -2, 0, -4, 0],
                [-2, 0, -1, 0, -3, 0],
                [-2, 0, -1, 333333334, -3, 333333334],
                [-2, 0, -1, 666666667, -3, 666666667],
                [-2, 0, -1, 999999999, -3, 999999999],
                [-2, 0, 0, 0, -2, 0],
                [-2, 0, 0, 1, -2, 1],
                [-2, 0, 0, 333333333, -2, 333333333],
                [-2, 0, 0, 666666666, -2, 666666666],
                [-2, 0, 1, 0, -1, 0],
                [-2, 0, 2, 0, 0, 0],
                [-2, 0, 3, 0, 1, 0],
                [-2, 0, 3, 333333333, 1, 333333333],

                [-1, 0, -4, 666666667, -5, 666666667],
                [-1, 0, -3, 0, -4, 0],
                [-1, 0, -2, 0, -3, 0],
                [-1, 0, -1, 0, -2, 0],
                [-1, 0, -1, 333333334, -2, 333333334],
                [-1, 0, -1, 666666667, -2, 666666667],
                [-1, 0, -1, 999999999, -2, 999999999],
                [-1, 0, 0, 0, -1, 0],
                [-1, 0, 0, 1, -1, 1],
                [-1, 0, 0, 333333333, -1, 333333333],
                [-1, 0, 0, 666666666, -1, 666666666],
                [-1, 0, 1, 0, 0, 0],
                [-1, 0, 2, 0, 1, 0],
                [-1, 0, 3, 0, 2, 0],
                [-1, 0, 3, 333333333, 2, 333333333],

                [-1, 666666667, -4, 666666667, -4, 333333334],
                [-1, 666666667, -3, 0, -4, 666666667],
                [-1, 666666667, -2, 0, -3, 666666667],
                [-1, 666666667, -1, 0, -2, 666666667],
                [-1, 666666667, -1, 333333334, -1, 1],
                [-1, 666666667, -1, 666666667, -1, 333333334],
                [-1, 666666667, -1, 999999999, -1, 666666666],
                [-1, 666666667, 0, 0, -1, 666666667],
                [-1, 666666667, 0, 1, -1, 666666668],
                [-1, 666666667, 0, 333333333, 0, 0],
                [-1, 666666667, 0, 666666666, 0, 333333333],
                [-1, 666666667, 1, 0, 0, 666666667],
                [-1, 666666667, 2, 0, 1, 666666667],
                [-1, 666666667, 3, 0, 2, 666666667],
                [-1, 666666667, 3, 333333333, 3, 0],

                [0, 0, -4, 666666667, -4, 666666667],
                [0, 0, -3, 0, -3, 0],
                [0, 0, -2, 0, -2, 0],
                [0, 0, -1, 0, -1, 0],
                [0, 0, -1, 333333334, -1, 333333334],
                [0, 0, -1, 666666667, -1, 666666667],
                [0, 0, -1, 999999999, -1, 999999999],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1],
                [0, 0, 0, 333333333, 0, 333333333],
                [0, 0, 0, 666666666, 0, 666666666],
                [0, 0, 1, 0, 1, 0],
                [0, 0, 2, 0, 2, 0],
                [0, 0, 3, 0, 3, 0],
                [0, 0, 3, 333333333, 3, 333333333],

                [0, 333333333, -4, 666666667, -3, 0],
                [0, 333333333, -3, 0, -3, 333333333],
                [0, 333333333, -2, 0, -2, 333333333],
                [0, 333333333, -1, 0, -1, 333333333],
                [0, 333333333, -1, 333333334, -1, 666666667],
                [0, 333333333, -1, 666666667, 0, 0],
                [0, 333333333, -1, 999999999, 0, 333333332],
                [0, 333333333, 0, 0, 0, 333333333],
                [0, 333333333, 0, 1, 0, 333333334],
                [0, 333333333, 0, 333333333, 0, 666666666],
                [0, 333333333, 0, 666666666, 0, 999999999],
                [0, 333333333, 1, 0, 1, 333333333],
                [0, 333333333, 2, 0, 2, 333333333],
                [0, 333333333, 3, 0, 3, 333333333],
                [0, 333333333, 3, 333333333, 3, 666666666],

                [1, 0, -4, 666666667, -3, 666666667],
                [1, 0, -3, 0, -2, 0],
                [1, 0, -2, 0, -1, 0],
                [1, 0, -1, 0, 0, 0],
                [1, 0, -1, 333333334, 0, 333333334],
                [1, 0, -1, 666666667, 0, 666666667],
                [1, 0, -1, 999999999, 0, 999999999],
                [1, 0, 0, 0, 1, 0],
                [1, 0, 0, 1, 1, 1],
                [1, 0, 0, 333333333, 1, 333333333],
                [1, 0, 0, 666666666, 1, 666666666],
                [1, 0, 1, 0, 2, 0],
                [1, 0, 2, 0, 3, 0],
                [1, 0, 3, 0, 4, 0],
                [1, 0, 3, 333333333, 4, 333333333],

                [2, 0, -4, 666666667, -2, 666666667],
                [2, 0, -3, 0, -1, 0],
                [2, 0, -2, 0, 0, 0],
                [2, 0, -1, 0, 1, 0],
                [2, 0, -1, 333333334, 1, 333333334],
                [2, 0, -1, 666666667, 1, 666666667],
                [2, 0, -1, 999999999, 1, 999999999],
                [2, 0, 0, 0, 2, 0],
                [2, 0, 0, 1, 2, 1],
                [2, 0, 0, 333333333, 2, 333333333],
                [2, 0, 0, 666666666, 2, 666666666],
                [2, 0, 1, 0, 3, 0],
                [2, 0, 2, 0, 4, 0],
                [2, 0, 3, 0, 5, 0],
                [2, 0, 3, 333333333, 5, 333333333],

                [3, 0, -4, 666666667, -1, 666666667],
                [3, 0, -3, 0, 0, 0],
                [3, 0, -2, 0, 1, 0],
                [3, 0, -1, 0, 2, 0],
                [3, 0, -1, 333333334, 2, 333333334],
                [3, 0, -1, 666666667, 2, 666666667],
                [3, 0, -1, 999999999, 2, 999999999],
                [3, 0, 0, 0, 3, 0],
                [3, 0, 0, 1, 3, 1],
                [3, 0, 0, 333333333, 3, 333333333],
                [3, 0, 0, 666666666, 3, 666666666],
                [3, 0, 1, 0, 4, 0],
                [3, 0, 2, 0, 5, 0],
                [3, 0, 3, 0, 6, 0],
                [3, 0, 3, 333333333, 6, 333333333],

                [3, 333333333, -4, 666666667, 0, 0],
                [3, 333333333, -3, 0, 0, 333333333],
                [3, 333333333, -2, 0, 1, 333333333],
                [3, 333333333, -1, 0, 2, 333333333],
                [3, 333333333, -1, 333333334, 2, 666666667],
                [3, 333333333, -1, 666666667, 3, 0],
                [3, 333333333, -1, 999999999, 3, 333333332],
                [3, 333333333, 0, 0, 3, 333333333],
                [3, 333333333, 0, 1, 3, 333333334],
                [3, 333333333, 0, 333333333, 3, 666666666],
                [3, 333333333, 0, 666666666, 3, 999999999],
                [3, 333333333, 1, 0, 4, 333333333],
                [3, 333333333, 2, 0, 5, 333333333],
                [3, 333333333, 3, 0, 6, 333333333],
                [3, 333333333, 3, 333333333, 6, 666666666],

                [MAX_SAFE_INTEGER, 0, MIN_SAFE_INTEGER, 0, 0, 0]
            ];

            it('plus', () => {
                data_plus.forEach((val) => {
                    const [seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).plus(Duration.ofSeconds(otherSeconds, otherNanos));
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('plusOverflowTooBig', () => {
                expect(() => {
                    Duration.ofSeconds(MAX_SAFE_INTEGER, 999999999).plus(Duration.ofSeconds(0, 1));
                }).to.throw(ArithmeticException);
            });

            it('plusOverflowTooSmall', () => {
                expect(() => {
                    Duration.ofSeconds(MIN_SAFE_INTEGER).plus(Duration.ofSeconds(-1, 999999999));
                }).to.throw(ArithmeticException);
            });
        });

        describe('plusAmountUnit()', () => {
            it('plus_longTemporalUnit_seconds', () => {
                let t = Duration.ofSeconds(1);
                t = t.plus(1, ChronoUnit.SECONDS);
                expect(t.seconds()).to.eql(2);
                expect(t.nano()).to.eql(0);
            });

            it('plus_longTemporalUnit_millis', () => {
                let t = Duration.ofSeconds(1);
                t = t.plus(1, ChronoUnit.MILLIS);
                expect(t.seconds()).to.eql(1);
                expect(t.nano()).to.eql(1000000);
            });

            it('plus_longTemporalUnit_micros', () => {
                let t = Duration.ofSeconds(1);
                t = t.plus(1, ChronoUnit.MICROS);
                expect(t.seconds()).to.eql(1);
                expect(t.nano()).to.eql(1000);
            });

            it('plus_longTemporalUnit_nanos', () => {
                let t = Duration.ofSeconds(1);
                t = t.plus(1, ChronoUnit.NANOS);
                expect(t.seconds()).to.eql(1);
                expect(t.nano()).to.eql(1);
            });

            it('plus_longTemporalUnit_null', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.plus(1, null);
                }).to.throw(NullPointerException);
            });
            it('plus_longTemporalUnit_nonChronoUnit', () => {
                /* test implementation of TemporalUnit,
                 * that returns 5 days as duration
                 */
                class TestTemporalUnit extends TemporalUnit {
                    duration() {
                        return Duration.ofDays(5);
                    }
                    isDurationEstimated() {
                        return false;
                    }
                }
                const unit = new TestTemporalUnit();
                const t = Duration.ZERO.plus(1, unit);
                expect(t.seconds()).to.eql(5 * SECONDS_PER_DAY);
                expect(t.nano()).to.eql(0);
            });

        });

        describe('plusSeconds()', () => {
            const data_plusSeconds = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 0, -1, -1, 0],
                [0, 0, MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 0],
                [0, 0, MIN_SAFE_INTEGER, MIN_SAFE_INTEGER, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 1, 2, 0],
                [1, 0, -1, 0, 0],
                [1, 0, MAX_SAFE_INTEGER - 1, MAX_SAFE_INTEGER, 0],
                [1, 0, MIN_SAFE_INTEGER, MIN_SAFE_INTEGER + 1, 0],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 2, 1],
                [1, 1, -1, 0, 1],
                [1, 1, MAX_SAFE_INTEGER - 1, MAX_SAFE_INTEGER, 1],
                [1, 1, MIN_SAFE_INTEGER, MIN_SAFE_INTEGER + 1, 1],
                [-1, 1, 0, -1, 1],
                [-1, 1, 1, 0, 1],
                [-1, 1, -1, -2, 1],
                [-1, 1, MAX_SAFE_INTEGER, MAX_SAFE_INTEGER - 1, 1],
                [-1, 1, MIN_SAFE_INTEGER + 1, MIN_SAFE_INTEGER, 1]
            ];

            it('plusSeconds_long', () => {
                data_plusSeconds.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).plusSeconds(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('plusSeconds_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.plusSeconds(MAX_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

            it('plusSeconds_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(-1);
                expect(() => {
                    t.plusSeconds(MIN_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

        });

        describe('plusMillis()', () => {
            const data_plusMillis = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1000000],
                [0, 0, 999, 0, 999000000],
                [0, 0, 1000, 1, 0],
                [0, 0, 1001, 1, 1000000],
                [0, 0, 1999, 1, 999000000],
                [0, 0, 2000, 2, 0],
                [0, 0, -1, -1, 999000000],
                [0, 0, -999, -1, 1000000],
                [0, 0, -1000, -1, 0],
                [0, 0, -1001, -2, 999000000],
                [0, 0, -1999, -2, 1000000],

                [0, 1, 0, 0, 1],
                [0, 1, 1, 0, 1000001],
                [0, 1, 998, 0, 998000001],
                [0, 1, 999, 0, 999000001],
                [0, 1, 1000, 1, 1],
                [0, 1, 1998, 1, 998000001],
                [0, 1, 1999, 1, 999000001],
                [0, 1, 2000, 2, 1],
                [0, 1, -1, -1, 999000001],
                [0, 1, -2, -1, 998000001],
                [0, 1, -1000, -1, 1],
                [0, 1, -1001, -2, 999000001],

                [0, 1000000, 0, 0, 1000000],
                [0, 1000000, 1, 0, 2000000],
                [0, 1000000, 998, 0, 999000000],
                [0, 1000000, 999, 1, 0],
                [0, 1000000, 1000, 1, 1000000],
                [0, 1000000, 1998, 1, 999000000],
                [0, 1000000, 1999, 2, 0],
                [0, 1000000, 2000, 2, 1000000],
                [0, 1000000, -1, 0, 0],
                [0, 1000000, -2, -1, 999000000],
                [0, 1000000, -999, -1, 2000000],
                [0, 1000000, -1000, -1, 1000000],
                [0, 1000000, -1001, -1, 0],
                [0, 1000000, -1002, -2, 999000000],

                [0, 999999999, 0, 0, 999999999],
                [0, 999999999, 1, 1, 999999],
                [0, 999999999, 999, 1, 998999999],
                [0, 999999999, 1000, 1, 999999999],
                [0, 999999999, 1001, 2, 999999],
                [0, 999999999, -1, 0, 998999999],
                [0, 999999999, -1000, -1, 999999999],
                [0, 999999999, -1001, -1, 998999999]
            ];

            it('plusMillis_long', () => {
                data_plusMillis.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).plusMillis(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('plusMillis_long_oneMore', () => {
                data_plusMillis.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds + 1, nanos).plusMillis(amount);
                    expect(t.seconds()).to.eql(expectedSeconds + 1);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('plusMillis_long_max', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 998999999).plusMillis(1);
                expect(t.seconds()).to.eql(MAX_SAFE_INTEGER);
                expect(t.nano()).to.eql(999999999);
            });

            it('plusMillis_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 999000000);
                expect(() => {
                    t.plusMillis(1);
                }).to.throw(ArithmeticException);
            });

            it('plusMillis_long_min', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 1000000).plusMillis(-1);
                expect(t.seconds()).to.eql(MIN_SAFE_INTEGER);
                expect(t.nano()).to.eql(0);
            });

            it('plusMillis_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
                expect(() => {
                    t.plusMillis(-1);
                }).to.throw(ArithmeticException);
            });

        });
        describe('plusNanos()', () => {
            const data_plusNanos = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1],
                [0, 0, 999999999, 0, 999999999],
                [0, 0, 1000000000, 1, 0],
                [0, 0, 1000000001, 1, 1],
                [0, 0, 1999999999, 1, 999999999],
                [0, 0, 2000000000, 2, 0],
                [0, 0, -1, -1, 999999999],
                [0, 0, -999999999, -1, 1],
                [0, 0, -1000000000, -1, 0],
                [0, 0, -1000000001, -2, 999999999],
                [0, 0, -1999999999, -2, 1],

                [1, 0, 0, 1, 0],
                [1, 0, 1, 1, 1],
                [1, 0, 999999999, 1, 999999999],
                [1, 0, 1000000000, 2, 0],
                [1, 0, 1000000001, 2, 1],
                [1, 0, 1999999999, 2, 999999999],
                [1, 0, 2000000000, 3, 0],
                [1, 0, -1, 0, 999999999],
                [1, 0, -999999999, 0, 1],
                [1, 0, -1000000000, 0, 0],
                [1, 0, -1000000001, -1, 999999999],
                [1, 0, -1999999999, -1, 1],

                [-1, 0, 0, -1, 0],
                [-1, 0, 1, -1, 1],
                [-1, 0, 999999999, -1, 999999999],
                [-1, 0, 1000000000, 0, 0],
                [-1, 0, 1000000001, 0, 1],
                [-1, 0, 1999999999, 0, 999999999],
                [-1, 0, 2000000000, 1, 0],
                [-1, 0, -1, -2, 999999999],
                [-1, 0, -999999999, -2, 1],
                [-1, 0, -1000000000, -2, 0],
                [-1, 0, -1000000001, -3, 999999999],
                [-1, 0, -1999999999, -3, 1],

                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 2],
                [1, 1, 999999998, 1, 999999999],
                [1, 1, 999999999, 2, 0],
                [1, 1, 1000000000, 2, 1],
                [1, 1, 1999999998, 2, 999999999],
                [1, 1, 1999999999, 3, 0],
                [1, 1, 2000000000, 3, 1],
                [1, 1, -1, 1, 0],
                [1, 1, -2, 0, 999999999],
                [1, 1, -1000000000, 0, 1],
                [1, 1, -1000000001, 0, 0],
                [1, 1, -1000000002, -1, 999999999],
                [1, 1, -2000000000, -1, 1],

                [1, 999999999, 0, 1, 999999999],
                [1, 999999999, 1, 2, 0],
                [1, 999999999, 999999999, 2, 999999998],
                [1, 999999999, 1000000000, 2, 999999999],
                [1, 999999999, 1000000001, 3, 0],
                [1, 999999999, -1, 1, 999999998],
                [1, 999999999, -1000000000, 0, 999999999],
                [1, 999999999, -1000000001, 0, 999999998],
                [1, 999999999, -1999999999, 0, 0],
                [1, 999999999, -2000000000, -1, 999999999],

                [MAX_SAFE_INTEGER, 0, 999999999, MAX_SAFE_INTEGER, 999999999],
                [MAX_SAFE_INTEGER - 1, 0, 1999999999, MAX_SAFE_INTEGER, 999999999],
                [MIN_SAFE_INTEGER, 1, -1, MIN_SAFE_INTEGER, 0],
                [MIN_SAFE_INTEGER + 1, 1, -1000000001, MIN_SAFE_INTEGER, 0]
            ];

            it('plusNanos_long', () => {
                data_plusNanos.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).plusNanos(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('plusNanos_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 999999999);
                expect(() => {
                    t.plusNanos(1);
                }).to.throw(ArithmeticException);
            });

            it('plusNanos_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
                expect(() => {
                    t.plusNanos(-1);
                }).to.throw(ArithmeticException);
            });

        });
    });

    describe('minus', () => {
        describe('minusDuration()', () => {
            const data_minus = [
                [MIN_SAFE_INTEGER, 0, MIN_SAFE_INTEGER, 0, 0, 0],
                [MIN_SAFE_INTEGER, 0, MIN_SAFE_INTEGER + 1, 0, -1, 0],

                [-4, 666666667, -4, 666666667, 0, 0],
                [-4, 666666667, -3, 0, -1, 666666667],
                [-4, 666666667, -2, 0, -2, 666666667],
                [-4, 666666667, -1, 0, -3, 666666667],
                [-4, 666666667, -1, 333333334, -3, 333333333],
                [-4, 666666667, -1, 666666667, -3, 0],
                [-4, 666666667, -1, 999999999, -4, 666666668],
                [-4, 666666667, 0, 0, -4, 666666667],
                [-4, 666666667, 0, 1, -4, 666666666],
                [-4, 666666667, 0, 333333333, -4, 333333334],
                [-4, 666666667, 0, 666666666, -4, 1],
                [-4, 666666667, 1, 0, -5, 666666667],
                [-4, 666666667, 2, 0, -6, 666666667],
                [-4, 666666667, 3, 0, -7, 666666667],
                [-4, 666666667, 3, 333333333, -7, 333333334],

                [-3, 0, -4, 666666667, 0, 333333333],
                [-3, 0, -3, 0, 0, 0],
                [-3, 0, -2, 0, -1, 0],
                [-3, 0, -1, 0, -2, 0],
                [-3, 0, -1, 333333334, -3, 666666666],
                [-3, 0, -1, 666666667, -3, 333333333],
                [-3, 0, -1, 999999999, -3, 1],
                [-3, 0, 0, 0, -3, 0],
                [-3, 0, 0, 1, -4, 999999999],
                [-3, 0, 0, 333333333, -4, 666666667],
                [-3, 0, 0, 666666666, -4, 333333334],
                [-3, 0, 1, 0, -4, 0],
                [-3, 0, 2, 0, -5, 0],
                [-3, 0, 3, 0, -6, 0],
                [-3, 0, 3, 333333333, -7, 666666667],

                [-2, 0, -4, 666666667, 1, 333333333],
                [-2, 0, -3, 0, 1, 0],
                [-2, 0, -2, 0, 0, 0],
                [-2, 0, -1, 0, -1, 0],
                [-2, 0, -1, 333333334, -2, 666666666],
                [-2, 0, -1, 666666667, -2, 333333333],
                [-2, 0, -1, 999999999, -2, 1],
                [-2, 0, 0, 0, -2, 0],
                [-2, 0, 0, 1, -3, 999999999],
                [-2, 0, 0, 333333333, -3, 666666667],
                [-2, 0, 0, 666666666, -3, 333333334],
                [-2, 0, 1, 0, -3, 0],
                [-2, 0, 2, 0, -4, 0],
                [-2, 0, 3, 0, -5, 0],
                [-2, 0, 3, 333333333, -6, 666666667],

                [-1, 0, -4, 666666667, 2, 333333333],
                [-1, 0, -3, 0, 2, 0],
                [-1, 0, -2, 0, 1, 0],
                [-1, 0, -1, 0, 0, 0],
                [-1, 0, -1, 333333334, -1, 666666666],
                [-1, 0, -1, 666666667, -1, 333333333],
                [-1, 0, -1, 999999999, -1, 1],
                [-1, 0, 0, 0, -1, 0],
                [-1, 0, 0, 1, -2, 999999999],
                [-1, 0, 0, 333333333, -2, 666666667],
                [-1, 0, 0, 666666666, -2, 333333334],
                [-1, 0, 1, 0, -2, 0],
                [-1, 0, 2, 0, -3, 0],
                [-1, 0, 3, 0, -4, 0],
                [-1, 0, 3, 333333333, -5, 666666667],

                [-1, 666666667, -4, 666666667, 3, 0],
                [-1, 666666667, -3, 0, 2, 666666667],
                [-1, 666666667, -2, 0, 1, 666666667],
                [-1, 666666667, -1, 0, 0, 666666667],
                [-1, 666666667, -1, 333333334, 0, 333333333],
                [-1, 666666667, -1, 666666667, 0, 0],
                [-1, 666666667, -1, 999999999, -1, 666666668],
                [-1, 666666667, 0, 0, -1, 666666667],
                [-1, 666666667, 0, 1, -1, 666666666],
                [-1, 666666667, 0, 333333333, -1, 333333334],
                [-1, 666666667, 0, 666666666, -1, 1],
                [-1, 666666667, 1, 0, -2, 666666667],
                [-1, 666666667, 2, 0, -3, 666666667],
                [-1, 666666667, 3, 0, -4, 666666667],
                [-1, 666666667, 3, 333333333, -4, 333333334],

                [0, 0, -4, 666666667, 3, 333333333],
                [0, 0, -3, 0, 3, 0],
                [0, 0, -2, 0, 2, 0],
                [0, 0, -1, 0, 1, 0],
                [0, 0, -1, 333333334, 0, 666666666],
                [0, 0, -1, 666666667, 0, 333333333],
                [0, 0, -1, 999999999, 0, 1],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 999999999],
                [0, 0, 0, 333333333, -1, 666666667],
                [0, 0, 0, 666666666, -1, 333333334],
                [0, 0, 1, 0, -1, 0],
                [0, 0, 2, 0, -2, 0],
                [0, 0, 3, 0, -3, 0],
                [0, 0, 3, 333333333, -4, 666666667],

                [0, 333333333, -4, 666666667, 3, 666666666],
                [0, 333333333, -3, 0, 3, 333333333],
                [0, 333333333, -2, 0, 2, 333333333],
                [0, 333333333, -1, 0, 1, 333333333],
                [0, 333333333, -1, 333333334, 0, 999999999],
                [0, 333333333, -1, 666666667, 0, 666666666],
                [0, 333333333, -1, 999999999, 0, 333333334],
                [0, 333333333, 0, 0, 0, 333333333],
                [0, 333333333, 0, 1, 0, 333333332],
                [0, 333333333, 0, 333333333, 0, 0],
                [0, 333333333, 0, 666666666, -1, 666666667],
                [0, 333333333, 1, 0, -1, 333333333],
                [0, 333333333, 2, 0, -2, 333333333],
                [0, 333333333, 3, 0, -3, 333333333],
                [0, 333333333, 3, 333333333, -3, 0],

                [1, 0, -4, 666666667, 4, 333333333],
                [1, 0, -3, 0, 4, 0],
                [1, 0, -2, 0, 3, 0],
                [1, 0, -1, 0, 2, 0],
                [1, 0, -1, 333333334, 1, 666666666],
                [1, 0, -1, 666666667, 1, 333333333],
                [1, 0, -1, 999999999, 1, 1],
                [1, 0, 0, 0, 1, 0],
                [1, 0, 0, 1, 0, 999999999],
                [1, 0, 0, 333333333, 0, 666666667],
                [1, 0, 0, 666666666, 0, 333333334],
                [1, 0, 1, 0, 0, 0],
                [1, 0, 2, 0, -1, 0],
                [1, 0, 3, 0, -2, 0],
                [1, 0, 3, 333333333, -3, 666666667],

                [2, 0, -4, 666666667, 5, 333333333],
                [2, 0, -3, 0, 5, 0],
                [2, 0, -2, 0, 4, 0],
                [2, 0, -1, 0, 3, 0],
                [2, 0, -1, 333333334, 2, 666666666],
                [2, 0, -1, 666666667, 2, 333333333],
                [2, 0, -1, 999999999, 2, 1],
                [2, 0, 0, 0, 2, 0],
                [2, 0, 0, 1, 1, 999999999],
                [2, 0, 0, 333333333, 1, 666666667],
                [2, 0, 0, 666666666, 1, 333333334],
                [2, 0, 1, 0, 1, 0],
                [2, 0, 2, 0, 0, 0],
                [2, 0, 3, 0, -1, 0],
                [2, 0, 3, 333333333, -2, 666666667],

                [3, 0, -4, 666666667, 6, 333333333],
                [3, 0, -3, 0, 6, 0],
                [3, 0, -2, 0, 5, 0],
                [3, 0, -1, 0, 4, 0],
                [3, 0, -1, 333333334, 3, 666666666],
                [3, 0, -1, 666666667, 3, 333333333],
                [3, 0, -1, 999999999, 3, 1],
                [3, 0, 0, 0, 3, 0],
                [3, 0, 0, 1, 2, 999999999],
                [3, 0, 0, 333333333, 2, 666666667],
                [3, 0, 0, 666666666, 2, 333333334],
                [3, 0, 1, 0, 2, 0],
                [3, 0, 2, 0, 1, 0],
                [3, 0, 3, 0, 0, 0],
                [3, 0, 3, 333333333, -1, 666666667],

                [3, 333333333, -4, 666666667, 6, 666666666],
                [3, 333333333, -3, 0, 6, 333333333],
                [3, 333333333, -2, 0, 5, 333333333],
                [3, 333333333, -1, 0, 4, 333333333],
                [3, 333333333, -1, 333333334, 3, 999999999],
                [3, 333333333, -1, 666666667, 3, 666666666],
                [3, 333333333, -1, 999999999, 3, 333333334],
                [3, 333333333, 0, 0, 3, 333333333],
                [3, 333333333, 0, 1, 3, 333333332],
                [3, 333333333, 0, 333333333, 3, 0],
                [3, 333333333, 0, 666666666, 2, 666666667],
                [3, 333333333, 1, 0, 2, 333333333],
                [3, 333333333, 2, 0, 1, 333333333],
                [3, 333333333, 3, 0, 0, 333333333],
                [3, 333333333, 3, 333333333, 0, 0],

                [MAX_SAFE_INTEGER, 0, MAX_SAFE_INTEGER, 0, 0, 0]
            ];

            it('minus', () => {
                data_minus.forEach((val) => {
                    const [seconds, nanos, otherSeconds, otherNanos, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).minus(Duration.ofSeconds(otherSeconds, otherNanos));
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusOverflowTooBig', () => {
                expect(() => {
                    Duration.ofSeconds(MAX_SAFE_INTEGER, 999999999).minus(Duration.ofSeconds(-1, 999999999));
                }).to.throw(ArithmeticException);
            });

            it('minusOverflowTooSmall', () => {
                expect(() => {
                    Duration.ofSeconds(MIN_SAFE_INTEGER).minus(Duration.ofSeconds(0, 1));
                }).to.throw(ArithmeticException);
            });
        });

        describe('minusAmountUnit()', () => {
            it('minus_longTemporalUnit_seconds', () => {
                let t = Duration.ofSeconds(1);
                t = t.minus(1, ChronoUnit.SECONDS);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

            it('minus_longTemporalUnit_seconds_MIN_SAFE_INTEGER', () => {
                let t = Duration.ofSeconds(MIN_SAFE_INTEGER);
                t = t.minus(MIN_SAFE_INTEGER, ChronoUnit.SECONDS);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

            it('minus_longTemporalUnit_millis', () => {
                let t = Duration.ofSeconds(1);
                t = t.minus(1, ChronoUnit.MILLIS);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(999000000);
            });

            it('minus_longTemporalUnit_micros', () => {
                let t = Duration.ofSeconds(1);
                t = t.minus(1, ChronoUnit.MICROS);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(999999000);
            });

            it('minus_longTemporalUnit_nanos', () => {
                let t = Duration.ofSeconds(1);
                t = t.minus(1, ChronoUnit.NANOS);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(999999999);
            });

            it('minus_longTemporalUnit_null', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.minus(1, null);
                }).to.throw(NullPointerException);
            });

        });

        describe('minusDays()', () => {
            const data_minusDays = [
                [0, 0, 0, 0],
                [0, 1, -1 * SECONDS_PER_DAY, 0],
                [0, -1, 1 * SECONDS_PER_DAY, 0],
                [1, 0, 1 * SECONDS_PER_DAY, 0],
                [1, 1, 0 * SECONDS_PER_DAY, 0],
                [1, -1, 2 * SECONDS_PER_DAY, 0],
                [-1, 0, -1 * SECONDS_PER_DAY, 0],
                [-1, 1, -2 * SECONDS_PER_DAY, 0],
                [-1, -1, 0 * SECONDS_PER_DAY, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY), MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY), 0, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY), MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY), 0, 0]
            ];

            it('minusDays_long', () => {
                data_minusDays.forEach((val) => {
                    const [initialDays, subtractDays, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofDays(initialDays).minusDays(subtractDays);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusDays_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.minusDays(MIN_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

            it('minusDays_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(-2);
                expect(() => {
                    t.minusDays(MAX_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

        });

        describe('minusHours()', () => {
            const data_minusHours = [
                [0, 0, 0, 0],
                [0, 1, -1 * SECONDS_PER_HOUR, 0],
                [0, -1, 1 * SECONDS_PER_HOUR, 0],
                [1, 0, 1 * SECONDS_PER_HOUR, 0],
                [1, 1, 0 * SECONDS_PER_HOUR, 0],
                [1, -1, 2 * SECONDS_PER_HOUR, 0],
                [-1, 0, -1 * SECONDS_PER_HOUR, 0],
                [-1, 1, -2 * SECONDS_PER_HOUR, 0],
                [-1, -1, 0 * SECONDS_PER_HOUR, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR), MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR), 0, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR), MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR), 0, 0]
            ];

            it('minusHours_long', () => {
                data_minusHours.forEach((val) => {
                    const [initialHours, subtractHours, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofHours(initialHours).minusHours(subtractHours);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusHours_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.minusHours(MIN_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

            it('minusHours_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(-2);
                expect(() => {
                    t.minusHours(MAX_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

        });

        describe('minusMinutes()', () => {
            const data_minusMinutes = [
                [0, 0, 0, 0],
                [0, 1, -1 * 60, 0],
                [0, -1, 1 * 60, 0],
                [1, 0, 1 * 60, 0],
                [1, 1, 0 * 60, 0],
                [1, -1, 2 * 60, 0],
                [-1, 0, -1 * 60, 0],
                [-1, 1, -2 * 60, 0],
                [-1, -1, 0 * 60, 0],
                [MathUtil.intDiv(MAX_SAFE_INTEGER, 60), MathUtil.intDiv(MAX_SAFE_INTEGER, 60), 0, 0],
                [MathUtil.intDiv(MIN_SAFE_INTEGER, 60), MathUtil.intDiv(MIN_SAFE_INTEGER, 60), 0, 0]
            ];

            it('minusMinutes_long', () => {
                data_minusMinutes.forEach((val) => {
                    const [initialMinutes, subtractMinutes, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofMinutes(initialMinutes).minusMinutes(subtractMinutes);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusMinutes_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.minusMinutes(MIN_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

            it('minusMinutes_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(-2);
                expect(() => {
                    t.minusMinutes(MAX_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

        });

        describe('minusSeconds()', () => {
            const data_minusSeconds = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, -1, 0],
                [0, 0, -1, 1, 0],
                [0, 0, MAX_SAFE_INTEGER, -MAX_SAFE_INTEGER, 0],
                [0, 0, MIN_SAFE_INTEGER + 1, MAX_SAFE_INTEGER - 1, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 1, 0, 0],
                [1, 0, -1, 2, 0],
                [1, 0, MAX_SAFE_INTEGER - 1, -MAX_SAFE_INTEGER + 2, 0],
                [1, 0, MIN_SAFE_INTEGER + 2, MAX_SAFE_INTEGER - 1, 0],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 0, 1],
                [1, 1, -1, 2, 1],
                [1, 1, MAX_SAFE_INTEGER, -MAX_SAFE_INTEGER + 1, 1],
                [1, 1, MIN_SAFE_INTEGER + 2, MAX_SAFE_INTEGER - 1, 1],
                [-1, 1, 0, -1, 1],
                [-1, 1, 1, -2, 1],
                [-1, 1, -1, 0, 1],
                [-1, 1, MAX_SAFE_INTEGER - 1, MIN_SAFE_INTEGER, 1],
                [-1, 1, MIN_SAFE_INTEGER + 1, MAX_SAFE_INTEGER - 2, 1]
            ];

            it('minusSeconds_long', () => {
                data_minusSeconds.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).minusSeconds(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusSeconds_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(1);
                expect(() => {
                    t.minusSeconds(MIN_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

            it('minusSeconds_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(-2);
                expect(() => {
                    t.minusSeconds(MAX_SAFE_INTEGER);
                }).to.throw(ArithmeticException);
            });

        });

        describe('minusMillis()', () => {
            const data_minusMillis = [
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
                [0, 999999999, -1001, 2, 999999]
            ];

            it('minusMillis_long', () => {
                data_minusMillis.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).minusMillis(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusMillis_long_oneMore', () => {
                data_minusMillis.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds + 1, nanos).minusMillis(amount);
                    expect(t.seconds()).to.eql(expectedSeconds + 1);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusMillis_long_oneLess', () => {
                data_minusMillis.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds - 1, nanos).minusMillis(amount);
                    expect(t.seconds()).to.eql(expectedSeconds - 1);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusMillis_long_max', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 998999999).minusMillis(-1);
                expect(t.seconds()).to.eql(MAX_SAFE_INTEGER);
                expect(t.nano()).to.eql(999999999);
            });

            it('minusMillis_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 999000000);
                expect(() => {
                    t.minusMillis(-1);
                }).to.throw(ArithmeticException);
            });

            it('minusMillis_long_min', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 1000000).minusMillis(1);
                expect(t.seconds()).to.eql(MIN_SAFE_INTEGER);
                expect(t.nano()).to.eql(0);
            });

            it('minusMillis_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
                expect(() => {
                    t.minusMillis(1);
                }).to.throw(ArithmeticException);
            });

            it('minusMillis_ofMillis_MAX_SAFE_INTEGER', () => {
                const t = Duration.ofMillis(MAX_SAFE_INTEGER).minusMillis(MAX_SAFE_INTEGER);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

            it('minusMillis_ofMillis_MIN_SAFE_INTEGER', () => {
                const t = Duration.ofMillis(MIN_SAFE_INTEGER).minusMillis(MIN_SAFE_INTEGER);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

        });
        describe('minusNanos()', () => {
            const data_minusNanos = [
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

                [MAX_SAFE_INTEGER, 0, -999999999, MAX_SAFE_INTEGER, 999999999],
                [MAX_SAFE_INTEGER - 1, 0, -1999999999, MAX_SAFE_INTEGER, 999999999],
                [MIN_SAFE_INTEGER, 1, 1, MIN_SAFE_INTEGER, 0],
                [MIN_SAFE_INTEGER + 1, 1, 1000000001, MIN_SAFE_INTEGER, 0]
            ];

            it('minusNanos_long', () => {
                data_minusNanos.forEach((val) => {
                    const [seconds, nanos, amount, expectedSeconds, expectedNanos] = val;
                    const t = Duration.ofSeconds(seconds, nanos).minusNanos(amount);
                    expect(t.seconds()).to.eql(expectedSeconds);
                    expect(t.nano()).to.eql(expectedNanos);
                });
            });

            it('minusNanos_long_overflowTooBig', () => {
                const t = Duration.ofSeconds(MAX_SAFE_INTEGER, 999999999);
                expect(() => {
                    t.minusNanos(-1);
                }).to.throw(ArithmeticException);
            });

            it('minusNanos_long_overflowTooSmall', () => {
                const t = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
                expect(() => {
                    t.minusNanos(1);
                }).to.throw(ArithmeticException);
            });

            it('minusNanos_ofNanos_MAX_SAFE_INTEGER', () => {
                const t = Duration.ofNanos(MAX_SAFE_INTEGER).minusNanos(MAX_SAFE_INTEGER);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

            it('minusNanos_ofNanos_MIN_SAFE_INTEGER', () => {
                const t = Duration.ofNanos(MIN_SAFE_INTEGER).minusNanos(MIN_SAFE_INTEGER);
                expect(t.seconds()).to.eql(0);
                expect(t.nano()).to.eql(0);
            });

        });
    });

    describe('multipliedBy()', () => {
        const data_multipliedBy = [
            [-4, 666666667, -3, 9, 999999999],
            [-4, 666666667, -2, 6, 666666666],
            [-4, 666666667, -1, 3, 333333333],
            [-4, 666666667, 0, 0, 0],
            [-4, 666666667, 1, -4, 666666667],
            [-4, 666666667, 2, -7, 333333334],
            [-4, 666666667, 3, -10, 1],

            [-3, 0, -3, 9, 0],
            [-3, 0, -2, 6, 0],
            [-3, 0, -1, 3, 0],
            [-3, 0, 0, 0, 0],
            [-3, 0, 1, -3, 0],
            [-3, 0, 2, -6, 0],
            [-3, 0, 3, -9, 0],

            [-2, 0, -3, 6, 0],
            [-2, 0, -2, 4, 0],
            [-2, 0, -1, 2, 0],
            [-2, 0, 0, 0, 0],
            [-2, 0, 1, -2, 0],
            [-2, 0, 2, -4, 0],
            [-2, 0, 3, -6, 0],

            [-1, 0, -3, 3, 0],
            [-1, 0, -2, 2, 0],
            [-1, 0, -1, 1, 0],
            [-1, 0, 0, 0, 0],
            [-1, 0, 1, -1, 0],
            [-1, 0, 2, -2, 0],
            [-1, 0, 3, -3, 0],

            [-1, 500000000, -3, 1, 500000000],
            [-1, 500000000, -2, 1, 0],
            [-1, 500000000, -1, 0, 500000000],
            [-1, 500000000, 0, 0, 0],
            [-1, 500000000, 1, -1, 500000000],
            [-1, 500000000, 2, -1, 0],
            [-1, 500000000, 3, -2, 500000000],

            [0, 0, -3, 0, 0],
            [0, 0, -2, 0, 0],
            [0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 3, 0, 0],

            [0, 500000000, -3, -2, 500000000],
            [0, 500000000, -2, -1, 0],
            [0, 500000000, -1, -1, 500000000],
            [0, 500000000, 0, 0, 0],
            [0, 500000000, 1, 0, 500000000],
            [0, 500000000, 2, 1, 0],
            [0, 500000000, 3, 1, 500000000],

            [1, 0, -3, -3, 0],
            [1, 0, -2, -2, 0],
            [1, 0, -1, -1, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 1, 1, 0],
            [1, 0, 2, 2, 0],
            [1, 0, 3, 3, 0],

            [2, 0, -3, -6, 0],
            [2, 0, -2, -4, 0],
            [2, 0, -1, -2, 0],
            [2, 0, 0, 0, 0],
            [2, 0, 1, 2, 0],
            [2, 0, 2, 4, 0],
            [2, 0, 3, 6, 0],

            [3, 0, -3, -9, 0],
            [3, 0, -2, -6, 0],
            [3, 0, -1, -3, 0],
            [3, 0, 0, 0, 0],
            [3, 0, 1, 3, 0],
            [3, 0, 2, 6, 0],
            [3, 0, 3, 9, 0],

            [3, 333333333, -3, -10, 1],
            [3, 333333333, -2, -7, 333333334],
            [3, 333333333, -1, -4, 666666667],
            [3, 333333333, 0, 0, 0],
            [3, 333333333, 1, 3, 333333333],
            [3, 333333333, 2, 6, 666666666],
            [3, 333333333, 3, 9, 999999999]

        ];

        it('multipliedBy', () => {
            data_multipliedBy.forEach((val) => {
                const [seconds, nanos, mulitplicand, expectedSeconds, expectedNanos] = val;
                const d = Duration.ofSeconds(seconds, nanos);
                const t = d.multipliedBy(mulitplicand);
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        it('multipliedBy_max', () => {
            const test = Duration.ofSeconds(1).multipliedBy(MAX_SAFE_INTEGER);
            expect(test).to.eql(Duration.ofSeconds(MAX_SAFE_INTEGER));
        });

        it('multipliedBy_min', () => {
            const test = Duration.ofSeconds(1).multipliedBy(MIN_SAFE_INTEGER);
            expect(test).to.eql(Duration.ofSeconds(MIN_SAFE_INTEGER));
        });

        it('multipliedBy_tooBig', () => {
            const t = Duration.ofSeconds(1, 1);
            expect(() => {
                t.multipliedBy(MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('multipliedBy_tooBig_negative', () => {
            const t = Duration.ofSeconds(1, 1);
            expect(() => {
                t.multipliedBy(MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

    });

    describe('dividedBy()', () => {
        const data_dividedBy = [
            [-4, 666666667, -3,  1, 111111111],
            [-4, 666666667, -2,  1, 666666667],
            [-4, 666666667, -1,  3, 333333333],
            [-4, 666666667,  1, -4, 666666667],
            [-4, 666666666,  2, -2, 333333333],
            [-4, 666666667,  2, -2, 333333333],
            [-4, 666666667,  3, -2, 888888889],

            [-3, 0, -3,  1, 0],
            [-3, 0, -2,  1, 500000000],
            [-3, 0, -1,  3, 0],
            [-3, 0,  1, -3, 0],
            [-3, 0,  2, -2, 500000000],
            [-3, 0,  3, -1, 0],

            [-2, 0, -3,  0, 666666666],
            [-2, 0, -2,  1,         0],
            [-2, 0, -1,  2,         0],
            [-2, 0,  1, -2,         0],
            [-2, 0,  2, -1,         0],
            [-2, 0,  3, -1, 333333334],

            [-1, 0, -3,  0, 333333333],
            [-1, 0, -2,  0, 500000000],
            [-1, 0, -1,  1,         0],
            [-1, 0,  1, -1,         0],
            [-1, 0,  2, -1, 500000000],
            [-1, 0,  3, -1, 666666667],

            [-1, 500000000, -3,  0, 166666667],
            [-1, 500000000, -2,  0, 250000000],
            [-1, 500000000, -1,  0, 500000000],
            [-1, 500000000,  1, -1, 500000000],
            [-1, 500000000,  2, -1, 750000000],
            [-1, 500000000,  3, -1, 833333333],

            [0, 0, -3, 0, 0],
            [0, 0, -2, 0, 0],
            [0, 0, -1, 0, 0],
            [0, 0,  1, 0, 0],
            [0, 0,  2, 0, 0],
            [0, 0,  3, 0, 0],

            [0, 500000000, -3, -1, 833333334],
            [0, 500000000, -2, -1, 750000000],
            [0, 500000000, -1, -1, 500000000],
            [0, 500000000,  1,  0, 500000000],
            [0, 500000000,  2,  0, 250000000],
            [0, 500000000,  3,  0, 166666666],

            [1, 0, -3, -1, 666666667],
            [1, 0, -2, -1, 500000000],
            [1, 0, -1, -1,         0],
            [1, 0,  1,  1,         0],
            [1, 0,  2,  0, 500000000],
            [1, 0,  3,  0, 333333333],

            [2, 0, -3, -1, 333333334],
            [2, 0, -2, -1,         0],
            [2, 0, -1, -2,         0],
            [2, 0,  1,  2,         0],
            [2, 0,  2,  1,         0],
            [2, 0,  3,  0, 666666666],

            [3, 0, -3, -1,         0],
            [3, 0, -2, -2, 500000000],
            [3, 0, -1, -3,         0],
            [3, 0,  1,  3,         0],
            [3, 0,  2,  1, 500000000],
            [3, 0,  3,  1,         0],

            [3, 333333333, -3, -2, 888888889],
            [3, 333333333, -2, -2, 333333334],
            [3, 333333333, -1, -4, 666666667],
            [3, 333333333,  1,  3, 333333333],
            [3, 333333333,  2,  1, 666666666],
            [3, 333333333,  3,  1, 111111111]
        ];

        it('dividedBy', () => {
            dataProviderTest(data_dividedBy, (seconds, nanos, divisor, expectedSeconds, expectedNanos) => {
                const d = Duration.ofSeconds(seconds, nanos);
                const t = d.dividedBy(divisor);
                expect(t.seconds()).to.eql(expectedSeconds);
                expect(t.nano()).to.eql(expectedNanos);
            });
        });

        it('dividedByZero', () => {
            data_dividedBy.forEach((val) => {
                const [seconds, nanos] = val;
                const t = Duration.ofSeconds(seconds, nanos);
                expect(() => {
                    t.dividedBy(0);
                }).to.throw(ArithmeticException);
            });
        });

        it('dividedBy_max', () => {
            const test = Duration.ofSeconds(MAX_SAFE_INTEGER).dividedBy(MAX_SAFE_INTEGER);
            expect(test).to.eql(Duration.ofSeconds(1));
        });

    });

    describe('negated()', ()=> {
        it('test_negated', () => {
            expect(Duration.ofSeconds(0).negated()).to.eql(Duration.ofSeconds(0));
            expect(Duration.ofSeconds(12).negated()).to.eql(Duration.ofSeconds(-12));
            expect(Duration.ofSeconds(-12).negated()).to.eql(Duration.ofSeconds(12));
            expect(Duration.ofSeconds(12, 20).negated()).to.eql(Duration.ofSeconds(-12, -20));
            expect(Duration.ofSeconds(12, -20).negated()).to.eql(Duration.ofSeconds(-12, 20));
            expect(Duration.ofSeconds(-12, -20).negated()).to.eql(Duration.ofSeconds(12, 20));
            expect(Duration.ofSeconds(-12, 20).negated()).to.eql(Duration.ofSeconds(12, -20));
            expect(Duration.ofSeconds(MAX_SAFE_INTEGER).negated()).to.eql(Duration.ofSeconds(-MAX_SAFE_INTEGER));
        });

        it('test_negated_overflow', () => {
            expect(() => {
                Duration.ofSeconds(MIN_SAFE_INTEGER).negated();
            }).to.throw(ArithmeticException);
        });

    });

    describe('abs()', ()=> {
        it('test_abs', () => {
            expect(Duration.ofSeconds(0).abs()).to.eql(Duration.ofSeconds(0));
            expect(Duration.ofSeconds(12).abs()).to.eql(Duration.ofSeconds(12));
            expect(Duration.ofSeconds(-12).abs()).to.eql(Duration.ofSeconds(12));
            expect(Duration.ofSeconds(12, 20).abs()).to.eql(Duration.ofSeconds(12, 20));
            expect(Duration.ofSeconds(12, -20).abs()).to.eql(Duration.ofSeconds(12, -20));
            expect(Duration.ofSeconds(-12, -20).abs()).to.eql(Duration.ofSeconds(12, 20));
            expect(Duration.ofSeconds(-12, 20).abs()).to.eql(Duration.ofSeconds(12, -20));
            expect(Duration.ofSeconds(MAX_SAFE_INTEGER).abs()).to.eql(Duration.ofSeconds(MAX_SAFE_INTEGER));
        });

        it('test_abs_overflow', () => {
            expect(() => {
                Duration.ofSeconds(MIN_SAFE_INTEGER).negated();
            }).to.throw(ArithmeticException);
        });

    });

    describe('toNanos()', ()=> {
        it('test_toNanos', () => {
            const test = Duration.ofSeconds(321, 123456789);
            expect(test.toNanos()).to.eql(321123456789);
        });

        it('test_toNanos_max', () => {
            const test = Duration.ofSeconds(0, MAX_SAFE_INTEGER);
            expect(test.toNanos()).to.eql(MAX_SAFE_INTEGER);
        });

        it('test_abs_overflow', () => {
            const test = Duration.ofSeconds(0, MAX_SAFE_INTEGER).plusNanos(1);
            expect(() => {
                test.toNanos();
            }).to.throw(ArithmeticException);
        });

    });

    describe('toDays()', ()=> {
        it('test_toDays', () => {
            const test = Duration.ofDays(1);
            expect(test.toDays()).to.eql(1);
        });

        it('test_toDays_max', () => {
            const test = Duration.ofSeconds(MAX_SAFE_INTEGER, 0);
            expect(test.toDays()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_DAY));
        });

        it('test_toDays_min', () => {
            const test = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
            expect(test.toDays()).to.eql(MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_DAY));
        });

    });

    describe('toHours()', ()=> {
        it('test_toHours', () => {
            const test = Duration.ofHours(1);
            expect(test.toHours()).to.eql(1);
        });

        it('test_toHours_max', () => {
            const test = Duration.ofSeconds(MAX_SAFE_INTEGER, 0);
            expect(test.toHours()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, SECONDS_PER_HOUR));
        });

        it('test_toHours_min', () => {
            const test = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
            expect(test.toHours()).to.eql(MathUtil.intDiv(MIN_SAFE_INTEGER, SECONDS_PER_HOUR));
        });

    });

    describe('toMinutes()', ()=> {
        it('test_toMinutes', () => {
            const test = Duration.ofMinutes(1);
            expect(test.toMinutes()).to.eql(1);
        });

        it('test_toMinutes_max', () => {
            const test = Duration.ofSeconds(MAX_SAFE_INTEGER, 0);
            expect(test.toMinutes()).to.eql(MathUtil.intDiv(MAX_SAFE_INTEGER, 60));
        });

        it('test_toMinutes_min', () => {
            const test = Duration.ofSeconds(MIN_SAFE_INTEGER, 0);
            expect(test.toMinutes()).to.eql(MathUtil.intDiv(MIN_SAFE_INTEGER, 60));
        });

    });

    describe('toMillis()', ()=> {
        it('test_toMillis', () => {
            const test = Duration.ofSeconds(321, 123456789);
            expect(test.toMillis()).to.eql(321000 + 123);
        });

        it('test_toMillis_max', () => {
            const test = Duration.ofSeconds(MathUtil.intDiv(MAX_SAFE_INTEGER, 1000), MathUtil.intMod(MAX_SAFE_INTEGER, 1000) * 1000000);
            expect(test.toMillis()).to.eql(MAX_SAFE_INTEGER);
        });

        it('test_abs_overflow', () => {
            const test = Duration.ofSeconds(MathUtil.intDiv(MAX_SAFE_INTEGER, 1000), (MathUtil.intMod(MAX_SAFE_INTEGER, 1000) + 1) * 1000000);
            expect(() => {
                test.toMillis();
            }).to.throw(ArithmeticException);
        });

    });

    describe('compareTo()', ()=> {
        const data_compareTo = [
            Duration.ofSeconds(-2, 0),
            Duration.ofSeconds(-2, 999999998),
            Duration.ofSeconds(-2, 999999999),
            Duration.ofSeconds(-1, 0),
            Duration.ofSeconds(-1, 1),
            Duration.ofSeconds(-1, 999999998),
            Duration.ofSeconds(-1, 999999999),
            Duration.ofSeconds(0, 0),
            Duration.ofSeconds(0, 1),
            Duration.ofSeconds(0, 2),
            Duration.ofSeconds(0, 999999999),
            Duration.ofSeconds(1, 0),
            Duration.ofSeconds(2, 0)
        ];

        it('test_comparisons', () => {
            data_compareTo.forEach((valA, indexA) => {
                data_compareTo.forEach((valB, indexB) => {
                    if (indexA < indexB) {
                        expect(valA.compareTo(valB) < 0, valA + ' <=> ' + valB).to.eql(true);
                        expect(valA.equals(valB), valA + ' <=> ' + valB).to.eql(false);
                    } else if (indexA > indexB) {
                        expect(valA.compareTo(valB) > 0, valA + ' <=> ' + valB).to.eql(true);
                        expect(valA.equals(valB), valA + ' <=> ' + valB).to.eql(false);
                    } else {
                        expect(valA.compareTo(valB), valA + ' <=> ' + valB).to.eql(0);
                        expect(valA.equals(valB), valA + ' <=> ' + valB).to.eql(true);
                    }
                });
            });
        });

        it('test_compareTo_ObjectNull', () => {
            const test = Duration.ofSeconds(0);
            expect(() => {
                test.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('compareToNonDuration', () => {
            const test = Duration.ofSeconds(0);
            expect(() => {
                test.compareTo({});
            }).to.throw(Error);
        });

    });

    describe('units(), get()', ()=> {

        it('test_units_get', () => {
            const duration = new Duration(1234, 5678);
            expect(duration.units()).to.eql([ChronoUnit.SECONDS, ChronoUnit.NANOS]);
            expect(duration.get(ChronoUnit.SECONDS)).to.eql(1234);
            expect(duration.get(ChronoUnit.NANOS)).to.eql(5678);
        });

        it('test_units_invalid', () => {
            expect(() => {
                Duration.ZERO.get(ChronoUnit.DAYS);
            }).to.throw(UnsupportedTemporalTypeException);
        });

    });

    describe('withXXX()', ()=> {

        it('test_withSeconds', () => {
            expect(Duration.ZERO.withSeconds(1234).seconds()).to.eql(1234);
        });

        it('test_withNanos', () => {
            expect(Duration.ZERO.withNanos(1234).nano()).to.eql(1234);
        });

    });

    describe('equals()', ()=> {

        it('test_equals', () => {
            const test5a = Duration.ofSeconds(5, 20);
            const test5b = Duration.ofSeconds(5, 20);
            const test5n = Duration.ofSeconds(5, 30);
            const test6 = Duration.ofSeconds(6, 20);

            expect(test5a.equals(test5a)).to.eql(true);
            expect(test5a.equals(test5b)).to.eql(true);
            expect(test5a.equals(test5n)).to.eql(false);
            expect(test5a.equals(test6)).to.eql(false);

            expect(test5b.equals(test5a)).to.eql(true);
            expect(test5b.equals(test5b)).to.eql(true);
            expect(test5b.equals(test5n)).to.eql(false);
            expect(test5b.equals(test6)).to.eql(false);

            expect(test5n.equals(test5a)).to.eql(false);
            expect(test5n.equals(test5b)).to.eql(false);
            expect(test5n.equals(test5n)).to.eql(true);
            expect(test5n.equals(test6)).to.eql(false);

            expect(test6.equals(test5a)).to.eql(false);
            expect(test6.equals(test5b)).to.eql(false);
            expect(test6.equals(test5n)).to.eql(false);
            expect(test6.equals(test6)).to.eql(true);
        });

        it('test_equals_null', () => {
            const test5 = Duration.ofSeconds(5, 20);
            expect(test5.equals(null)).to.eql(false);
        });

        it('test_equals_otherClass', () => {
            const test5 = Duration.ofSeconds(5, 20);
            expect(test5.equals({})).to.eql(false);
        });

    });

    describe('toString()', () => {
        const data_toString = [
            [0, 0, 'PT0S'],
            [0, 1, 'PT0.000000001S'],
            [0, 10, 'PT0.00000001S'],
            [0, 100, 'PT0.0000001S'],
            [0, 1000, 'PT0.000001S'],
            [0, 10000, 'PT0.00001S'],
            [0, 100000, 'PT0.0001S'],
            [0, 1000000, 'PT0.001S'],
            [0, 10000000, 'PT0.01S'],
            [0, 100000000, 'PT0.1S'],
            [0, 120000000, 'PT0.12S'],
            [0, 123000000, 'PT0.123S'],
            [0, 123400000, 'PT0.1234S'],
            [0, 123450000, 'PT0.12345S'],
            [0, 123456000, 'PT0.123456S'],
            [0, 123456700, 'PT0.1234567S'],
            [0, 123456780, 'PT0.12345678S'],
            [0, 123456789, 'PT0.123456789S'],
            [1, 0, 'PT1S'],
            [-1, 0, 'PT-1S'],
            [-1, 1000, 'PT-0.999999S'],
            [-1, 900000000, 'PT-0.1S'],

            [60, 0, 'PT1M'],
            [3600, 0, 'PT1H'],
            [7261, 0, 'PT2H1M1S'],
            [MAX_SAFE_INTEGER, 0, 'PT2501999792983H36M31S'],
            [MIN_SAFE_INTEGER, 0, 'PT-2501999792983H-36M-31S']
        ];

        it('test_toString', () => {
            data_toString.forEach((val) => {
                const [seconds, nanos, expected] = val;
                const t = Duration.ofSeconds(seconds, nanos);
                expect(t.toString()).to.eql(expected);
                expect(t.toJSON()).to.eql(expected);
            });
        });
    });

});
