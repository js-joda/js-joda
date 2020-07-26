/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import {Clock} from '../../src/Clock';
import {Instant} from '../../src/Instant';
import {ChronoField} from '../../src/temporal/ChronoField';
import {TemporalAdjuster} from '../../src/temporal/TemporalAdjuster';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {LocalTime} from '../../src/LocalTime';
import {LocalDate} from '../../src/LocalDate';
import {Period} from '../../src/Period';
import {LocalDateTime} from '../../src/LocalDateTime';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {ZoneOffset} from '../../src/ZoneOffset';
import {OffsetTime} from '../../src/OffsetTime';
import {ZonedDateTime} from '../../src/ZonedDateTime';
import {
    DateTimeException,
    DateTimeParseException,
    IllegalArgumentException,
    NullPointerException
} from '../../src/errors';

import {MockSimplePeriod} from './MockSimplePeriod';
import {dataProviderTest, assertNotNull, assertEquals} from '../testUtils';

import '../_init';

describe('org.threeten.bp.TestOffsetTime', () => {
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);
    const DATE = LocalDate.of(2008, 12, 3);
    const sampleTimes = [
        [11, 30, 20, 500, OFFSET_PONE],
        [11, 0, 0, 0, OFFSET_PONE],
        [23, 59, 59, 999999999, OFFSET_PONE],
    ];
    const sampleToString = [
        [11, 30, 59, 0, 'Z', '11:30:59Z'],
        [11, 30, 59, 0, '+01:00', '11:30:59+01:00'],
        [11, 30, 59, 999000000, 'Z', '11:30:59.999Z'],
        [11, 30, 59, 999000000, '+01:00', '11:30:59.999+01:00'],
        [11, 30, 59, 999000, 'Z', '11:30:59.000999Z'],
        [11, 30, 59, 999000, '+01:00', '11:30:59.000999+01:00'],
        [11, 30, 59, 999, 'Z', '11:30:59.000000999Z'],
        [11, 30, 59, 999, '+01:00', '11:30:59.000000999+01:00'],
    ];

    let TEST_11_30_59_500_PONE;

    beforeEach(() => {
        TEST_11_30_59_500_PONE = OffsetTime.of(LocalTime.of(11, 30, 59, 500), OFFSET_PONE);
    });

    /**
     * @param {OffsetTime} test
     * @param {int} h
     * @param {int} m
     * @param {int} s
     * @param {int} n
     * @param {ZoneOffset }offset
     */
    function check( test,  h, m,  s,  n,  offset) {
        expect(test.toLocalTime()).to.eql(LocalTime.of(h, m, s, n));
        expect(test.offset()).to.eql(offset);

        expect(test.hour()).to.equal(h);
        expect(test.minute()).to.equal(m);
        expect(test.second()).to.equal(s);
        expect(test.nano()).to.equal(n);

        expect(test).to.equal(test);
        expect(test.hashCode()).to.equal(test.hashCode());
        expect(OffsetTime.of(LocalTime.of(h, m, s, n), offset)).to.eql(test);
    }

    describe('constants', () => {
        it('MIN', () => {
            check(OffsetTime.MIN, 0, 0, 0, 0, ZoneOffset.MAX);
        });
        it('MAX', () => {
            check(OffsetTime.MAX, 23, 59, 59, 999999999, ZoneOffset.MIN);
        });
    });

    describe('now', () => {
        it('now()', () => {
            const nowDT = ZonedDateTime.now();

            const expected = OffsetTime.now(Clock.systemDefaultZone());
            const test = OffsetTime.now();
            const diff = Math.abs(test.toLocalTime().toNanoOfDay() - expected.toLocalTime().toNanoOfDay());
            expect(diff).to.be.lessThan(100000000);
            expect(test.offset()).to.be.eql(nowDT.offset());
        });

        describe('now(Clock)', () => {
            it('allSecsInDay', () => {
                for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                    const instant = Instant.ofEpochSecond(i, 8);
                    const clock = Clock.fixed(instant, ZoneOffset.UTC);
                    const test = OffsetTime.now(clock);
                    expect(test.hour()).to.be.equal(Math.floor(i / (60 * 60)) % 24);
                    expect(test.minute()).to.be.equal(Math.floor(i / 60) % 60);
                    expect(test.second()).to.be.equal(i % 60);
                    expect(test.nano()).to.be.equal(8);
                    expect(test.offset()).to.be.eql(ZoneOffset.UTC);
                }
            });

            it('beforeEpoch', () => {
                for (let i =-1; i >= -(24 * 60 * 60); i -= 100) {
                    const instant = Instant.ofEpochSecond(i, 8);
                    const clock = Clock.fixed(instant, ZoneOffset.UTC);
                    const test = OffsetTime.now(clock);
                    expect(test.hour()).to.be.equal(Math.floor((i + 24 * 60 * 60) / (60 * 60)) % 24);
                    expect(test.minute()).to.be.equal(Math.floor((i + 24 * 60 * 60) / 60) % 60);
                    expect(test.second()).to.be.equal(Math.floor(i + 24 * 60 * 60) % 60);
                    expect(test.nano()).to.be.equal(8);
                    expect(test.offset()).to.be.eql(ZoneOffset.UTC);
                }
            });

            it('offsets', () =>{
                const base = LocalDateTime.of(1970, 1, 1, 12, 0).toInstant(ZoneOffset.UTC);
                for (let i = -9; i < 15; i++) {
                    const offset = ZoneOffset.ofHours(i);
                    const clock = Clock.fixed(base, offset);
                    const test = OffsetTime.now(clock);
                    expect(test.hour()).to.be.equal((12 + i) % 24);
                    expect(test.minute()).to.be.equal( 0);
                    expect(test.second()).to.be.equal( 0);
                    expect(test.nano()).to.be.equal( 0);
                    expect(test.offset()).to.be.eql(offset);
                }
            });

            it('null', () => {
                expect(() => {
                    OffsetTime.now( null);
                }).to.throw(NullPointerException);
            });
        });
    });

    describe('factories', () => {
        describe('of', () => {
            it('intsHM', () => {
                const test = OffsetTime.of(LocalTime.of(11, 30), OFFSET_PONE);
                check(test, 11, 30, 0, 0, OFFSET_PONE);
            });

            it('intsHMS', () => {
                const test = OffsetTime.of(LocalTime.of(11, 30, 10), OFFSET_PONE);
                check(test, 11, 30, 10, 0, OFFSET_PONE);
            });

            it('intsHMSN', () => {
                const test = OffsetTime.of(LocalTime.of(11, 30, 10, 500), OFFSET_PONE);
                check(test, 11, 30, 10, 500, OFFSET_PONE);
            });

            it('LocalTimeZoneOffset', () => {
                const localTime = LocalTime.of(11, 30, 10, 500);
                const test = OffsetTime.of(localTime, OFFSET_PONE);
                check(test, 11, 30, 10, 500, OFFSET_PONE);
            });

            it('LocalTimeZoneOffset_nullTime', () => {
                expect(() => {
                    OffsetTime.of(null, OFFSET_PONE);
                }).to.throw(NullPointerException);
            });

            it('LocalTimeZoneOffset_nullOffset', () => {
                expect(() => {
                    const localTime = LocalTime.of(11, 30, 10, 500);
                    OffsetTime.of(localTime, null);
                }).to.throw(NullPointerException);
            });
        });

        describe('ofInstant', () => {
            it('nullInstant', () => {
                expect(() => {
                    OffsetTime.ofInstant(null, ZoneOffset.UTC);
                }).to.throw(NullPointerException);
            });

            it('nullOffset', () => {
                expect(() => {
                    const instant = Instant.ofEpochSecond(0);
                    OffsetTime.ofInstant(instant,  null);
                }).to.throw(NullPointerException);
            });

            it('allSpecsInDay', () => {
                for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                    const instant = Instant.ofEpochSecond(i, 8);
                    const test = OffsetTime.ofInstant(instant, ZoneOffset.UTC);
                    expect(test.hour()).to.be.equal(Math.floor(i / (60 * 60)) % 24);
                    expect(test.minute()).to.be.equal(Math.floor(i / 60) % 60);
                    expect(test.second()).to.be.equal(i % 60);
                    expect(test.nano()).to.be.equal(8);
                }
            });

            it('beforeEpoch', () => {
                for (let i =-1; i >= -(24 * 60 * 60); i -= 100) {
                    const instant = Instant.ofEpochSecond(i, 8);
                    const test = OffsetTime.ofInstant(instant, ZoneOffset.UTC);
                    expect(test.hour()).to.be.equal(Math.floor((i + 24 * 60 * 60) / (60 * 60)) % 24);
                    expect(test.minute()).to.be.equal(Math.floor((i + 24 * 60 * 60) / 60) % 60);
                    expect(test.second()).to.be.equal(Math.floor(i + 24 * 60 * 60) % 60);
                    expect(test.nano()).to.be.equal(8);
                }
            });

            it('maxYear', () => {
                const test = OffsetTime.ofInstant(Instant.MAX, ZoneOffset.UTC);
                expect(test.hour()).to.be.equal(23);
                expect(test.minute()).to.be.equal(59);
                expect(test.second()).to.be.equal(59);
                expect(test.nano()).to.be.equal( 999999999);
            });

            it('minYear', () => {
                const test = OffsetTime.ofInstant(Instant.MIN, ZoneOffset.UTC);
                expect(test.hour()).to.be.equal(0);
                expect(test.minute()).to.be.equal(0);
                expect(test.second()).to.be.equal(0);
                expect(test.nano()).to.be.equal(0);
            });
        });

        describe('from(TemporalAccessor)', () => {
            it('OT', () => {
                expect(OffsetTime.from(OffsetTime.of(LocalTime.of(17, 30), OFFSET_PONE)))
                    .to.be.eql(OffsetTime.of(LocalTime.of(17, 30), OFFSET_PONE));
            });

            it('ZDT', () => {
                const base = LocalDateTime.of(2007, 7, 15, 11, 30, 59, 500).atZone(OFFSET_PONE);
                expect(OffsetTime.from(base)).to.be.eql(TEST_11_30_59_500_PONE);
            });

            it('invalid_noDerive', () => {
                expect(() => {
                    OffsetTime.from(LocalDate.of(2007, 7, 15));
                }).to.throw(DateTimeException);
            });

            it('null', () => {
                expect(() => {
                    OffsetTime.from(null);
                }).to.throw(NullPointerException);
            });
        });

        describe('parse(String)', () => {
            it('validText', () => {
                dataProviderTest(sampleToString, (h, m, s, n, offsetId, parsable) => {
                    const t = OffsetTime.parse(parsable);
                    assertNotNull(t, parsable);
                    check(t, h, m, s, n, ZoneOffset.of(offsetId));
                });
            });

            const sampleBadParse = [
                '00;00',
                '12-00',
                '-01:00',
                '00:00:00-09',
                '00:00:00,09',
                '00:00:abs',
                '11',
                '11:30',
                '11:30+01:00[Europe/Paris]',
            ];

            it('invalidText', () => {
                dataProviderTest(sampleBadParse, (unparsable) => {
                    expect(() => {
                        OffsetTime.parse(unparsable);
                    }).to.throw(DateTimeParseException);
                });
            });

            it('illegalHour', () => {
                expect(() => {
                    OffsetTime.parse('25:00+01:00');
                }).to.throw(DateTimeParseException);
            });

            it('illegalHour', () => {
                expect(() => {
                    OffsetTime.parse('25:00+01:00');
                }).to.throw(DateTimeParseException);
            });


            it('illegalMinute', () => {
                expect(() => {
                    OffsetTime.parse('12:60+01:00');
                }).to.throw(DateTimeParseException);
            });

            it('illegalSecond', () => {
                expect(() => {
                    OffsetTime.parse('12:12:60+01:00');
                }).to.throw(DateTimeParseException);
            });
        });

        describe('oarse(DateTimeFormatter)', () =>{
            it('formatter', () => {
                const f = DateTimeFormatter.ofPattern('H m s XXX');
                const test = OffsetTime.parse('11 30 0 +01:00', f);
                expect(test).to.be.eql(OffsetTime.of(LocalTime.of(11, 30), ZoneOffset.ofHours(1)));
            });

            it('nullText', () =>{
                expect(() => {
                    const f = DateTimeFormatter.ofPattern('y M d H m s');
                    OffsetTime.parse(null, f);
                }).to.throw(NullPointerException);
            });

            it('nullFormatter', () =>{
                expect(() => {
                    OffsetTime.parse('ANY', null);
                }).to.throw(NullPointerException);
            });
        });
    });

    describe('constructor', () => {
        it('nullTime', () => {
            expect(() => {
                new OffsetTime(null, OFFSET_PONE);
            }).to.throw(NullPointerException);
        });

        it('nullOffset', () => {
            expect(() => {
                new OffsetTime(LocalTime.of(11, 30), null);
            }).to.throw(NullPointerException);
        });
    });

    describe('basic', () => {

        it('get', () => {
            dataProviderTest(sampleTimes, (h, m, s, n, offset) => {
                const localTime = LocalTime.of(h, m, s, n);
                const a = OffsetTime.of(localTime, offset);

                assertEquals(a.toLocalTime(), localTime);
                assertEquals(a.offset(), offset);
                assertEquals(a.toString(), localTime.toString() + offset.toString());
                assertEquals(a.hour(), localTime.hour());
                assertEquals(a.minute(), localTime.minute());
                assertEquals(a.second(), localTime.second());
                assertEquals(a.nano(), localTime.nano());
            });
        });
    });

    describe('get(TemporalField)', () => {
        it('get(temporalField)', () => {
            const test = OffsetTime.of(LocalTime.of(12, 30, 40, 987654321), OFFSET_PONE);
            assertEquals(test.get(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.get(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.get(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.get(ChronoField.NANO_OF_SECOND), 987654321);
            assertEquals(test.get(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.get(ChronoField.AMPM_OF_DAY), 1);

            assertEquals(test.get(ChronoField.OFFSET_SECONDS), 3600);
        });

        it('getLong(temporalField)', () => {
            const test = OffsetTime.of(LocalTime.of(12, 30, 40, 987654321), OFFSET_PONE);
            assertEquals(test.getLong(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.getLong(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.getLong(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.getLong(ChronoField.NANO_OF_SECOND), 987654321);
            assertEquals(test.getLong(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.getLong(ChronoField.AMPM_OF_DAY), 1);

            assertEquals(test.getLong(ChronoField.OFFSET_SECONDS), 3600);
        });
    });

    describe('query(TemporalQuery)', () => {
        it('query', () => {
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.chronology()), null);
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.localDate()), null);
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.localTime()), TEST_11_30_59_500_PONE.toLocalTime());
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.offset()), TEST_11_30_59_500_PONE.offset());
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.precision()), ChronoUnit.NANOS);
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.zone()), TEST_11_30_59_500_PONE.offset());
            assertEquals(TEST_11_30_59_500_PONE.query(TemporalQueries.zoneId()), null);
        });

        it('query_null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.query(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('withOffsetSameLocal', () => {
        it('withOffsetSaeLocal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withOffsetSameLocal(OFFSET_PTWO);
            assertEquals(test.toLocalTime(), base.toLocalTime());
            assertEquals(test.offset(), OFFSET_PTWO);
        });

        it('noChange', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withOffsetSameLocal(OFFSET_PONE);
            assertEquals(test, base);
        });

        it('null', () => {
            expect(() => {
                const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                base.withOffsetSameLocal(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('withOffsetSameInstant', () => {
        it('withOffsetSameInstant', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withOffsetSameInstant(OFFSET_PTWO);
            const expected = OffsetTime.of(LocalTime.of(12, 30, 59), OFFSET_PTWO);
            assertEquals(test, expected);
        });

        it('noChange', () =>  {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withOffsetSameInstant(OFFSET_PONE);
            assertEquals(test, base);
        });

        it('null', () => {
            expect(() => {
                const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                base.withOffsetSameInstant(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('with(WithAdjuster)', () => {
        it('adjustment', () => {
            const sample = OffsetTime.of(LocalTime.of(23, 5), OFFSET_PONE);
            const adjuster = new TemporalAdjuster();
            adjuster.adjustInto = () => sample;
            assertEquals(TEST_11_30_59_500_PONE.with(adjuster), sample);
        });

        it('LocalTime', () => {
            const test = TEST_11_30_59_500_PONE.with(LocalTime.of(13, 30));
            assertNotNull(test);
            assertEquals(test, OffsetTime.of(LocalTime.of(13, 30), OFFSET_PONE));
        });

        it('OffsetTime', () => {
            const test = TEST_11_30_59_500_PONE.with(OffsetTime.of(LocalTime.of(13, 35), OFFSET_PTWO));
            assertEquals(test, OffsetTime.of(LocalTime.of(13, 35), OFFSET_PTWO));
        });

        it('ZoneOffset', () => {
            const test = TEST_11_30_59_500_PONE.with(OFFSET_PTWO);
            assertNotNull(test);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 30, 59, 500), OFFSET_PTWO));
        });

        it('AmPm', () => {
            const adjuster = new TemporalAdjuster();
            adjuster.adjustInto = (dateTime) => dateTime.with(ChronoField.HOUR_OF_DAY, 23);
            const test = TEST_11_30_59_500_PONE.with(adjuster);
            assertEquals(test, OffsetTime.of(LocalTime.of(23, 30, 59, 500), OFFSET_PONE));
        });

        it('null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.with(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('with(TemporalField, long', () => {
        it('TemporalField', () => {
            const test = OffsetTime.of(LocalTime.of(12, 30, 40, 987654321), OFFSET_PONE);
            assertEquals(test.with(ChronoField.HOUR_OF_DAY, 15), OffsetTime.of(LocalTime.of(15, 30, 40, 987654321), OFFSET_PONE));
            assertEquals(test.with(ChronoField.MINUTE_OF_HOUR, 50), OffsetTime.of(LocalTime.of(12, 50, 40, 987654321), OFFSET_PONE));
            assertEquals(test.with(ChronoField.SECOND_OF_MINUTE, 50), OffsetTime.of(LocalTime.of(12, 30, 50, 987654321), OFFSET_PONE));
            assertEquals(test.with(ChronoField.NANO_OF_SECOND, 12345), OffsetTime.of(LocalTime.of(12, 30, 40, 12345), OFFSET_PONE));
            assertEquals(test.with(ChronoField.HOUR_OF_AMPM, 6), OffsetTime.of(LocalTime.of(18, 30, 40, 987654321), OFFSET_PONE));
            assertEquals(test.with(ChronoField.AMPM_OF_DAY, 0), OffsetTime.of(LocalTime.of(0, 30, 40, 987654321), OFFSET_PONE));

            assertEquals(test.with(ChronoField.OFFSET_SECONDS, 7205), OffsetTime.of(LocalTime.of(12, 30, 40, 987654321), ZoneOffset.ofHoursMinutesSeconds(2, 0, 5)));
        });

        it('null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.with( null, 0);
            }).to.throw(NullPointerException);
        });

        it('invalidField', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.with(ChronoField.YEAR, 0);
            }).to.throw(DateTimeException);
        });
    });

    describe('withHour', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withHour(15);
            assertEquals(test, OffsetTime.of(LocalTime.of(15, 30, 59), OFFSET_PONE));
        });

        it('noChange', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withHour(11);
            assertEquals(test, base);
        });
    });
    
    describe('withMinute', () => {
        it('normal', function () {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withMinute(15);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 15, 59), OFFSET_PONE));
        });

        it('noChange', function () {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withMinute(30);
            assertEquals(test, base);
        });
    });

    describe('withSecond', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withSecond(15);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 30, 15), OFFSET_PONE));
        });

        it('noChange', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withSecond(59);
            assertEquals(test, base);
        });
    });

    describe('withNano', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59, 1), OFFSET_PONE);
            const test = base.withNano(15);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 30, 59, 15), OFFSET_PONE));
        });

        it('noChange', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59, 1), OFFSET_PONE);
            const test = base.withNano(1);
            assertEquals(test, base);
        });
    });

    describe('trauncatedTo(TemporalUnit)', () => {
        it('normal', () => {
            assertEquals(TEST_11_30_59_500_PONE.truncatedTo(ChronoUnit.NANOS), TEST_11_30_59_500_PONE);
            assertEquals(TEST_11_30_59_500_PONE.truncatedTo(ChronoUnit.SECONDS), TEST_11_30_59_500_PONE.withNano(0));
            assertEquals(TEST_11_30_59_500_PONE.truncatedTo(ChronoUnit.DAYS), TEST_11_30_59_500_PONE.with(LocalTime.MIDNIGHT));
        });

        it('null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.truncatedTo(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('plus(PlustAdjuster)', () => {
        it('normal', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MINUTES);
            const t = TEST_11_30_59_500_PONE.plus(period);
            assertEquals(t, OffsetTime.of(LocalTime.of(11, 37, 59, 500), OFFSET_PONE));
        });

        it('noChange', () => {
            const t = TEST_11_30_59_500_PONE.plus(MockSimplePeriod.of(0, ChronoUnit.SECONDS));
            assertEquals(t, TEST_11_30_59_500_PONE);
        });

        it('zero', () => {
            const t = TEST_11_30_59_500_PONE.plus(Period.ZERO);
            assertEquals(t, TEST_11_30_59_500_PONE);
        });

        it('null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.plus(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('plusHours', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusHours(13);
            assertEquals(test, OffsetTime.of(LocalTime.of(0, 30, 59), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusHours(0);
            assertEquals(test, base);
        });
    });

    describe('plusMinutes', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusMinutes(30);
            assertEquals(test, OffsetTime.of(LocalTime.of(12, 0, 59), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusMinutes(0);
            assertEquals(test, base);
        });
    });

    describe('plusSeconds', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusSeconds(1);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 31, 0), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusSeconds(0);
            assertEquals(test, base);
        });
    });

    describe('plusNanos', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59, 0), OFFSET_PONE);
            const test = base.plusNanos(1);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 30, 59, 1), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusNanos(0);
            assertEquals(test, base);
        });
    });

    describe('minus(MinusAdjuster)', () => {
        it('normal', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MINUTES);
            const t = TEST_11_30_59_500_PONE.minus(period);
            assertEquals(t, OffsetTime.of(LocalTime.of(11, 23, 59, 500), OFFSET_PONE));
        });

        it('noChange', () => {
            const t = TEST_11_30_59_500_PONE.minus(MockSimplePeriod.of(0, ChronoUnit.SECONDS));
            assertEquals(t, TEST_11_30_59_500_PONE);
        });

        it('zero', () => {
            const t = TEST_11_30_59_500_PONE.minus(Period.ZERO);
            assertEquals(t, TEST_11_30_59_500_PONE);
        });

        it('null', () => {
            expect(() => {
                TEST_11_30_59_500_PONE.minus(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('minunsHours', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusHours(-13);
            assertEquals(test, OffsetTime.of(LocalTime.of(0, 30, 59), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusHours(0);
            assertEquals(test, base);
        });
    });

    describe('minusMinutes', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusMinutes(50);
            assertEquals(test, OffsetTime.of(LocalTime.of(10, 40, 59), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusMinutes(0);
            assertEquals(test, base);
        });
    });

    describe('minusSeconds', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusSeconds(60);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 29, 59), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusSeconds(0);
            assertEquals(test, base);
        });
    });

    describe('minusNanos', () => {
        it('normal', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59, 0), OFFSET_PONE);
            const test = base.minusNanos(1);
            assertEquals(test, OffsetTime.of(LocalTime.of(11, 30, 58, 999999999), OFFSET_PONE));
        });

        it('zero', () => {
            const base = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusNanos(0);
            assertEquals(test, base);
        });
    });

    describe('compareTo', () => {
        it('time', () => {
            const a = OffsetTime.of(LocalTime.of(11, 29), OFFSET_PONE);
            const b = OffsetTime.of(LocalTime.of(11, 30), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(convertInstant(a).compareTo(convertInstant(b)) < 0, true);
        });

        it('offset', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30), OFFSET_PTWO);
            const b = OffsetTime.of(LocalTime.of(11, 30), OFFSET_PONE);  // a is before b due to offset
            expect(a.compareTo(b)).to.be.lessThan(0);
            expect(b.compareTo(a)).to.be.greaterThan(0);
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(convertInstant(a).compareTo(convertInstant(b)) < 0, true);
        });

        it('both', () => {
            const a = OffsetTime.of(LocalTime.of(11, 50), OFFSET_PTWO);
            const b = OffsetTime.of(LocalTime.of(11, 20), OFFSET_PONE);  // a is before b on instant scale
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(convertInstant(a).compareTo(convertInstant(b)) < 0, true);
        });

        it('bothNearStartOfDay', () => {
            const a = OffsetTime.of(LocalTime.of(0, 10), OFFSET_PONE);
            const b = OffsetTime.of(LocalTime.of(2, 30), OFFSET_PTWO);  // a is before b on instant scale
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(convertInstant(a).compareTo(convertInstant(b)) < 0, true);
        });

        it('hourDifference', () => {
            const a = OffsetTime.of(LocalTime.of(10, 0), OFFSET_PONE);
            const b = OffsetTime.of(LocalTime.of(11, 0), OFFSET_PTWO);  // a is before b despite being same time-line time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(convertInstant(a).compareTo(convertInstant(b)) === 0, true);
        });

        it('null', () => {
            expect(() => {
                const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                a.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('nonOffsetTime', () => {
            expect(() => {
                const c = TEST_11_30_59_500_PONE;
                c.compareTo(new Object());
            }).to.throw(IllegalArgumentException); // ClassCastException
        });

        function convertInstant(ot) {
            return DATE.atTime(ot.toLocalTime()).toInstant(ot.offset());
        }
    });

    describe('isAfter/isBefore/isEqual', () => {
        it('isBeforeIsAfterIsEqual1', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30, 58), OFFSET_PONE);
            const b = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.isBefore(b), true);
            assertEquals(a.isEqual(b), false);
            assertEquals(a.isAfter(b), false);

            assertEquals(b.isBefore(a), false);
            assertEquals(b.isEqual(a), false);
            assertEquals(b.isAfter(a), true);

            assertEquals(a.isBefore(a), false);
            assertEquals(b.isBefore(b), false);

            assertEquals(a.isEqual(a), true);
            assertEquals(b.isEqual(b), true);

            assertEquals(a.isAfter(a), false);
            assertEquals(b.isAfter(b), false);
        });

        it('isBeforeIsAfterIsEqual1nanos', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30, 59, 3), OFFSET_PONE);
            const b = OffsetTime.of(LocalTime.of(11, 30, 59, 4), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.isBefore(b), true);
            assertEquals(a.isEqual(b), false);
            assertEquals(a.isAfter(b), false);

            assertEquals(b.isBefore(a), false);
            assertEquals(b.isEqual(a), false);
            assertEquals(b.isAfter(a), true);

            assertEquals(a.isBefore(a), false);
            assertEquals(b.isBefore(b), false);

            assertEquals(a.isEqual(a), true);
            assertEquals(b.isEqual(b), true);

            assertEquals(a.isAfter(a), false);
            assertEquals(b.isAfter(b), false);
        });

        it('isBeforeIsAfterIsEqual2', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PTWO);
            const b = OffsetTime.of(LocalTime.of(11, 30, 58), OFFSET_PONE);  // a is before b due to offset
            assertEquals(a.isBefore(b), true);
            assertEquals(a.isEqual(b), false);
            assertEquals(a.isAfter(b), false);

            assertEquals(b.isBefore(a), false);
            assertEquals(b.isEqual(a), false);
            assertEquals(b.isAfter(a), true);

            assertEquals(a.isBefore(a), false);
            assertEquals(b.isBefore(b), false);

            assertEquals(a.isEqual(a), true);
            assertEquals(b.isEqual(b), true);

            assertEquals(a.isAfter(a), false);
            assertEquals(b.isAfter(b), false);
        });

        it('isBeforeIsAfterIsEqual2nanos', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30, 59, 4), ZoneOffset.ofTotalSeconds(OFFSET_PONE.totalSeconds() + 1));
            const b = OffsetTime.of(LocalTime.of(11, 30, 59, 3), OFFSET_PONE);  // a is before b due to offset
            assertEquals(a.isBefore(b), true);
            assertEquals(a.isEqual(b), false);
            assertEquals(a.isAfter(b), false);

            assertEquals(b.isBefore(a), false);
            assertEquals(b.isEqual(a), false);
            assertEquals(b.isAfter(a), true);

            assertEquals(a.isBefore(a), false);
            assertEquals(b.isBefore(b), false);

            assertEquals(a.isEqual(a), true);
            assertEquals(b.isEqual(b), true);

            assertEquals(a.isAfter(a), false);
            assertEquals(b.isAfter(b), false);
        });

        it('instantComparison', () => {
            const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PTWO);
            const b = OffsetTime.of(LocalTime.of(10, 30, 59), OFFSET_PONE);  // a is same instant as b
            assertEquals(a.isBefore(b), false);
            assertEquals(a.isEqual(b), true);
            assertEquals(a.isAfter(b), false);

            assertEquals(b.isBefore(a), false);
            assertEquals(b.isEqual(a), true);
            assertEquals(b.isAfter(a), false);

            assertEquals(a.isBefore(a), false);
            assertEquals(b.isBefore(b), false);

            assertEquals(a.isEqual(a), true);
            assertEquals(b.isEqual(b), true);

            assertEquals(a.isAfter(a), false);
            assertEquals(b.isAfter(b), false);
        });

        it('isBefore_null', () => {
            expect(() => {
                const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                a.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('isAfter_null', () => {
            expect(() => {
                const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                a.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('isEqual_null', () => {
            expect(() => {
                const a = OffsetTime.of(LocalTime.of(11, 30, 59), OFFSET_PONE);
                a.isEqual(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('equals/hashCode', () => {
        it('equals_true', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                assertEquals(a.equals(b), true);
                assertEquals(a.hashCode() === b.hashCode(), true);
            });
        });

        it('equals_false_hour_differs', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                h = (h === 23 ? 22 : h);
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h + 1, m, s, n), OFFSET_PONE);
                assertEquals(a.equals(b), false);
            });
        });

        it('equals_false_minute_differs', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                m = (m === 59 ? 58 : m);
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h, m + 1, s, n), OFFSET_PONE);
                assertEquals(a.equals(b), false);
            });
        });

        it('equals_false_second_differs', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                s = (s === 59 ? 58 : s);
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h, m, s + 1, n), OFFSET_PONE);
                assertEquals(a.equals(b), false);
            });
        });

        it('equals_false_nano_differs', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                n = (n === 999999999 ? 999999998 : n);
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h, m, s, n + 1), OFFSET_PONE);
                assertEquals(a.equals(b), false);
            });
        });

        it('equals_false_offset_differs', () => {
            dataProviderTest(sampleTimes, (h, m, s, n) => {
                const a = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PONE);
                const b = OffsetTime.of(LocalTime.of(h, m, s, n), OFFSET_PTWO);
                assertEquals(a.equals(b), false);
            });
        });

        it('itself_true', () => {
            assertEquals(TEST_11_30_59_500_PONE.equals(TEST_11_30_59_500_PONE), true);
        });

        it('string_false', () => {
            assertEquals(TEST_11_30_59_500_PONE.equals('2007-07-15'), false);
        });

        it('null_fa;se', () => {
            assertEquals(TEST_11_30_59_500_PONE.equals(null), false);
        });
    });

    describe('toString', () => {
        it('toString', () => {
            dataProviderTest(sampleToString, (h, m, s, n, offsetId, expected) => {
                const t = OffsetTime.of(LocalTime.of(h, m, s, n), ZoneOffset.of(offsetId));
                const str = t.toString();
                assertEquals(str, expected);
            });
        });
    });

    describe('format(DateTimeFormatter)', () => {
        it('normal', () => {
            const f = DateTimeFormatter.ofPattern('H m s');
            const t = OffsetTime.of(LocalTime.of(11, 30), OFFSET_PONE).format(f);
            assertEquals(t, '11 30 0');
        });

        it('null', () => {
            expect(() => {
                OffsetTime.of(LocalTime.of(11, 30), OFFSET_PONE).format(null);
            }).to.throw(NullPointerException);
        });
    });
});
