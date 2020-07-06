/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Clock} from '../../src/Clock';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {Duration} from '../../src/Duration';
import {Instant} from '../../src/Instant';
import {IsoChronology} from '../../src/chrono/IsoChronology';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {Month} from '../../src/Month';
import {OffsetDateTime} from '../../src/OffsetDateTime';
import {OffsetTime} from '../../src/OffsetTime';
import {TemporalAdjuster} from '../../src/temporal/TemporalAdjuster';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {Year} from '../../src/Year';
import {ZonedDateTime} from '../../src/ZonedDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';
import {
    DateTimeException,
    DateTimeParseException,
    IllegalArgumentException,
    NullPointerException
} from '../../src/errors';

import {MockSimplePeriod} from './MockSimplePeriod';
import {dataProviderTest, assertTrue, assertEquals} from '../testUtils';
import {CurrentStandardZoneAsiaGaza, CurrentStandardZoneEuropeParis} from '../zone/CurrentStandardZone';

import '../_init';

describe('org.threeten.bp.TestOffsetDateTime', () => {
    const ZONE_PARIS = new CurrentStandardZoneEuropeParis();
    const ZONE_GAZA = new CurrentStandardZoneAsiaGaza();
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);
    const OFFSET_MONE = ZoneOffset.ofHours(-1);
    const OFFSET_MTWO = ZoneOffset.ofHours(-2);
    const sampleToString = [
        [2008, 6, 30, 11, 30, 59, 0, 'Z', '2008-06-30T11:30:59Z'],
        [2008, 6, 30, 11, 30, 59, 0, '+01:00', '2008-06-30T11:30:59+01:00'],
        [2008, 6, 30, 11, 30, 59, 999000000, 'Z', '2008-06-30T11:30:59.999Z'],
        [2008, 6, 30, 11, 30, 59, 999000000, '+01:00', '2008-06-30T11:30:59.999+01:00'],
        [2008, 6, 30, 11, 30, 59, 999000, 'Z', '2008-06-30T11:30:59.000999Z'],
        [2008, 6, 30, 11, 30, 59, 999000, '+01:00', '2008-06-30T11:30:59.000999+01:00'],
        [2008, 6, 30, 11, 30, 59, 999, 'Z', '2008-06-30T11:30:59.000000999Z'],
        [2008, 6, 30, 11, 30, 59, 999, '+01:00', '2008-06-30T11:30:59.000000999+01:00'],
    ];
    const sampleTimes = [
        [2008, 6, 30, 11, 30, 20, 500, OFFSET_PONE],
        [2008, 6, 30, 11, 0, 0, 0, OFFSET_PONE],
        [2008, 6, 30, 23, 59, 59, 999999999, OFFSET_PONE],
        [-1, 1, 1, 0, 0, 0, 0, OFFSET_PONE],
    ];
    
    let TEST_2008_6_30_11_30_59_000000500;

    beforeEach(() => {
        TEST_2008_6_30_11_30_59_000000500 = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 500), OFFSET_PONE);
    });

    /**
     * @param {OffsetDateTime} test
     * @param {int} y
     * @param {int} mo
     * @param {int} d
     * @param {int} h
     * @param {int} m
     * @param {int} s
     * @param {int} n
     * @param {ZoneOffset }offset
     */
    function check(test, y,mo,d, h, m,  s,  n,  offset) {
        assertEquals(test.year(), y);
        assertEquals(test.month().value(), mo);
        assertEquals(test.dayOfMonth(), d);
        assertEquals(test.hour(), h);
        assertEquals(test.minute(), m);
        assertEquals(test.second(), s);
        assertEquals(test.nano(), n);
        assertEquals(test.offset(), offset);
        assertEquals(test, test);
        assertEquals(test.hashCode(), test.hashCode());
        assertEquals(OffsetDateTime.of(LocalDateTime.of(y, mo, d, h, m, s, n), offset), test);
    }

    describe('now', () => {
        let expected = OffsetDateTime.now(Clock.systemDefaultZone());
        let test = OffsetDateTime.now();
        let diff = Math.abs(test.toLocalTime().toNanoOfDay() - expected.toLocalTime().toNanoOfDay());
        if (diff >= 100000000) {
            // may be date change
            expected = OffsetDateTime.now(Clock.systemDefaultZone());
            test = OffsetDateTime.now();
            diff = Math.abs(test.toLocalTime().toNanoOfDay() - expected.toLocalTime().toNanoOfDay());
        }
        assertTrue(diff < 100000000);  // less than 0.1 secs
    });

    describe('now(Clock)', () => {
        it('allSecsInDay_utc', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = OffsetDateTime.now(clock);
                assertEquals(test.year(), 1970);
                assertEquals(test.month(), Month.JANUARY);
                assertEquals(test.dayOfMonth(), (i < 24 * 60 * 60 ? 1 : 2));
                assertEquals(test.hour(), Math.floor(i / (60 * 60)) % 24);
                assertEquals(test.minute(), Math.floor(i / 60) % 60);
                assertEquals(test.second(), i % 60);
                assertEquals(test.nano(), 123456789);
                assertEquals(test.offset(), ZoneOffset.UTC);
            }
        });

        it('allSecsInDay_offset', () => {
            for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant.minusSeconds(OFFSET_PONE.totalSeconds()), OFFSET_PONE);
                const test = OffsetDateTime.now(clock);
                assertEquals(test.year(), 1970);
                assertEquals(test.month(), Month.JANUARY);
                assertEquals(test.dayOfMonth(), (i < 24 * 60 * 60) ? 1 : 2);
                assertEquals(test.hour(), Math.floor(i / (60 * 60)) % 24);
                assertEquals(test.minute(), Math.floor(i / 60) % 60);
                assertEquals(test.second(), i % 60);
                assertEquals(test.nano(), 123456789);
                assertEquals(test.offset(), OFFSET_PONE);
            }
        });

        it('allSecsInDay_beforeEpoch', () => {
            let expected = LocalTime.MIDNIGHT.plusNanos(123456789).plusSeconds(100 - 1);
            for (let i = -1; i >= -(24 * 60 * 60); i -= 100) {
                const instant = Instant.ofEpochSecond(i).plusNanos(123456789);
                const clock = Clock.fixed(instant, ZoneOffset.UTC);
                const test = OffsetDateTime.now(clock);
                assertEquals(test.year(), 1969);
                assertEquals(test.month(), Month.DECEMBER);
                assertEquals(test.dayOfMonth(), 31);
                expected = expected.minusSeconds(100);
                assertEquals(test.toLocalTime(), expected);
                assertEquals(test.offset(), ZoneOffset.UTC);
            }
        });

        it('offsets', () => {
            const base = OffsetDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(12, 0), ZoneOffset.UTC);
            for (let i = -9; i < 15; i++) {
                const offset = ZoneOffset.ofHours(i);
                const clock = Clock.fixed(base.toInstant(), offset);
                const test = OffsetDateTime.now(clock);
                assertEquals(test.hour(), (12 + i) % 24);
                assertEquals(test.minute(), 0);
                assertEquals(test.second(), 0);
                assertEquals(test.nano(), 0);
                assertEquals(test.offset(), offset);
            }
        });

        it('nullZoneID or nullClock', () => {
            expect(() => {
                OffsetDateTime.now( null);
            }).to.throw(NullPointerException);
        });
    });

    describe('of', () => {
        it('intMonthIntHM', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, Month.JUNE, 30),
                LocalTime.of(11, 30), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 0, 0, OFFSET_PONE);
        });

        it('intMonthIntHMS', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, Month.JUNE, 30),
                LocalTime.of(11, 30, 10), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 0, OFFSET_PONE);

        });

        it('intMonthIntHMSN', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, Month.JUNE, 30),
                LocalTime.of(11, 30, 10, 500), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_PONE);
        });

        it('intsHM', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 0, 0, OFFSET_PONE);
        });

        it('intsHMS', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 10), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 0, OFFSET_PONE);
        });

        it('intsHMSN', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 10, 500), OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_PONE);
        });

        it('LocalDateLocalTimeZoneOffset', () => {
            const date = LocalDate.of(2008, 6, 30);
            const time = LocalTime.of(11, 30, 10, 500);
            const test = OffsetDateTime.of(date, time, OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_PONE);
        });

        it('nullLocalDate', () => {
            expect(() => {
                const time = LocalTime.of(11, 30, 10, 500);
                OffsetDateTime.of(null, time, OFFSET_PONE);
            }).to.throw(NullPointerException);
        });

        it('nullLocalTime', () => {
            expect(() => {
                const date = LocalDate.of(2008, 6, 30);
                OffsetDateTime.of(date, null, OFFSET_PONE);
            }).to.throw(NullPointerException);
        });

        it('nullOffset', () => {
            expect(() => {
                const date = LocalDate.of(2008, 6, 30);
                const time = LocalTime.of(11, 30, 10, 500);
                OffsetDateTime.of(date, time, null);
            }).to.throw(NullPointerException);
        });

        it('LocalDateTimeZoneOffset', () => {
            const dt = LocalDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 10, 500));
            const test = OffsetDateTime.of(dt, OFFSET_PONE);
            check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_PONE);
        });

        it('LocalDateTimeZoneOffset_nullProvider', () => {
            expect(() => {
                OffsetDateTime.of(null, OFFSET_PONE);
            }).to.throw(NullPointerException);
        });

        it('LocalDateTimeZoneOffset_nullOffset', () => {
            expect(() => {
                const dt = LocalDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 10, 500));
                OffsetDateTime.of(dt, null);
            }).to.throw(NullPointerException);
        });
    });

    describe('from', () => {
        it('CalendricalObject', () => {
            assertEquals(OffsetDateTime.from(
                OffsetDateTime.of(LocalDate.of(2007, 7, 15), LocalTime.of(17, 30), OFFSET_PONE)),
            OffsetDateTime.of(LocalDate.of(2007, 7, 15), LocalTime.of(17, 30), OFFSET_PONE));
        });

        it('invalid_noDrive', () => {
            expect(() => {
                OffsetDateTime.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('null', () => {
            expect(() => {
                OffsetDateTime.from(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('parse(text)', () => {
        it('parse', () => {
            dataProviderTest(sampleToString, (y, month, d, h, m, s, n, offsetId, text) => {
                const t = OffsetDateTime.parse(text);
                assertEquals(t.year(), y);
                assertEquals(t.month().value(), month);
                assertEquals(t.dayOfMonth(), d);
                assertEquals(t.hour(), h);
                assertEquals(t.minute(), m);
                assertEquals(t.second(), s);
                assertEquals(t.nano(), n);
                assertEquals(t.offset().id(), offsetId);
            });
        });

        it('illegalValue', () => {
            expect(() => {
                OffsetDateTime.parse('2008-06-32T11:15+01:00');
            }).to.throw(DateTimeParseException);
        });

        it('invalidValue', () => {
            expect(() => {
                OffsetDateTime.parse('2008-06-31T11:15+01:00');
            }).to.throw(DateTimeParseException);
        });

        it('nullText', () => {
            expect(() => {
                OffsetDateTime.parse(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('parse(DateTimeFormatter)', () => {
        it('formatter', () => {
            const f = DateTimeFormatter.ofPattern('u M d H m s XXX');
            const test = OffsetDateTime.parse('2010 12 3 11 30 0 +01:00', f);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2010, 12, 3), LocalTime.of(11, 30), ZoneOffset.ofHours(1)));
        });

        it('nullText', () => {
            expect(() => {
                const f = DateTimeFormatter.ofPattern('u M d H m s');
                OffsetDateTime.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('nullFormatter', () => {
            expect(() => {
                OffsetDateTime.parse('ANY', null);
            }).to.throw(NullPointerException);
        });
    });

    describe('constructor', () => {
        it('nullTime', () => {
            expect(() => {
                new OffsetDateTime(null, OFFSET_PONE);
            }).to.throw(NullPointerException);
        });

        it('nullOffset', () => {
            expect(() => {
                new OffsetDateTime(LocalDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30)), null);
            }).to.throw(NullPointerException);
        });
    });

    describe('basics', () => {
        dataProviderTest(sampleTimes, (y, o, d, h, m, s, n, offset) => {
            const localDate = LocalDate.of(y, o, d);
            const localTime = LocalTime.of(h, m, s, n);
            const localDateTime = LocalDateTime.of(localDate, localTime);
            const a = OffsetDateTime.of(localDateTime, offset);

            assertEquals(a.year(), localDate.year());
            assertEquals(a.month(), localDate.month());
            assertEquals(a.dayOfMonth(), localDate.dayOfMonth());
            assertEquals(a.dayOfYear(), localDate.dayOfYear());
            assertEquals(a.dayOfWeek(), localDate.dayOfWeek());

            assertEquals(a.hour(), localDateTime.hour());
            assertEquals(a.minute(), localDateTime.minute());
            assertEquals(a.second(), localDateTime.second());
            assertEquals(a.nano(), localDateTime.nano());

            assertEquals(a.toOffsetTime(), OffsetTime.of(localTime, offset));
            assertEquals(a.toString(), localDateTime.toString() + offset.toString());
        });
    });

    describe('get', () => {
        it('get(TemporalField)', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(12, 30, 40, 987654321), OFFSET_PONE);
            assertEquals(test.get(ChronoField.YEAR), 2008);
            assertEquals(test.get(ChronoField.MONTH_OF_YEAR), 6);
            assertEquals(test.get(ChronoField.DAY_OF_MONTH), 30);
            assertEquals(test.get(ChronoField.DAY_OF_WEEK), 1);
            assertEquals(test.get(ChronoField.DAY_OF_YEAR), 182);

            assertEquals(test.get(ChronoField.HOUR_OF_DAY), 12);
            assertEquals(test.get(ChronoField.MINUTE_OF_HOUR), 30);
            assertEquals(test.get(ChronoField.SECOND_OF_MINUTE), 40);
            assertEquals(test.get(ChronoField.NANO_OF_SECOND), 987654321);
            assertEquals(test.get(ChronoField.HOUR_OF_AMPM), 0);
            assertEquals(test.get(ChronoField.AMPM_OF_DAY), 1);

            assertEquals(test.get(ChronoField.OFFSET_SECONDS), 3600);
        });

        it('getLong(TemporalField)', () => {
            const test = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(12, 30, 40, 987654321), OFFSET_PONE);
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

            assertEquals(test.getLong(ChronoField.INSTANT_SECONDS), test.toEpochSecond());
            assertEquals(test.getLong(ChronoField.OFFSET_SECONDS), 3600);
        });
    });

    describe('query(TemporalQuery)', () => {
        it('query', () => {
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.chronology()), IsoChronology.INSTANCE);
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.localDate()), TEST_2008_6_30_11_30_59_000000500.toLocalDate());
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.localTime()), TEST_2008_6_30_11_30_59_000000500.toLocalTime());
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.offset()), TEST_2008_6_30_11_30_59_000000500.offset());
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.precision()), ChronoUnit.NANOS);
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.zone()), TEST_2008_6_30_11_30_59_000000500.offset());
            assertEquals(TEST_2008_6_30_11_30_59_000000500.query(TemporalQueries.zoneId()), null);
        });

        it('null', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.query(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('with(WithAdjuster)', () => {
        it('adjustment', () => {
            const sample = OffsetDateTime.of(LocalDate.of(2012, 3, 4), LocalTime.of(23, 5), OFFSET_PONE);
            const adjuster = new TemporalAdjuster();
            adjuster.adjustInto = () => sample;
            assertEquals(TEST_2008_6_30_11_30_59_000000500.with(adjuster), sample);
        });

        it('adjustment_LocalDate', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(LocalDate.of(2012, 9, 3));
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2012, 9, 3), LocalTime.of(11, 30, 59, 500), OFFSET_PONE));
        });

        it('adjustment_LocalTime', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(LocalTime.of(19, 15));
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(19, 15), OFFSET_PONE));
        });

        it('adjustment_LocalDateTime', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(LocalDateTime.of(LocalDate.of(2012, 9, 3), LocalTime.of(19, 15)));
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2012, 9, 3), LocalTime.of(19, 15), OFFSET_PONE));
        });

        it('adjustment_OffsetTime', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(OffsetTime.of(LocalTime.of(19, 15), OFFSET_PTWO));
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(19, 15), OFFSET_PTWO));
        });

        it('adjustment_OffsetDateTime', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(OffsetDateTime.of(LocalDate.of(2012, 9, 3), LocalTime.of(19, 15), OFFSET_PTWO));
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2012, 9, 3), LocalTime.of(19, 15), OFFSET_PTWO));
        });

        it('adjustment_Month', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(Month.DECEMBER);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 12, 30),LocalTime.of(11, 30, 59, 500), OFFSET_PONE));
        });

        it('adjustment_ZoneOFfset', () => {
            const test = TEST_2008_6_30_11_30_59_000000500.with(OFFSET_PTWO);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 500), OFFSET_PTWO));
        });

        it('null', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.with(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('withOffsetSameLocal', () => {
        it('withOffsetSameLocal null', () => {
            expect(() => {
                const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
                base.withOffsetSameLocal(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('withOffsetSameInstant', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withOffsetSameInstant(OFFSET_PTWO);
            const expected = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(12, 30, 59), OFFSET_PTWO);
            assertEquals(test, expected);
        });

        it('null', () => {
            expect(() => {
                const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
                base.withOffsetSameInstant(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('withMonth', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withMonth(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 1, 30), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('withDayOfMonth', () => {
        const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
        const test = base.withDayOfMonth(15);
        assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 15), LocalTime.of(11, 30, 59), OFFSET_PONE));
    });

    describe('withDayOfYear', () => {
        it('normal', () => {
            const t = TEST_2008_6_30_11_30_59_000000500.withDayOfYear(33);
            assertEquals(t, OffsetDateTime.of(LocalDate.of(2008, 2, 2), LocalTime.of(11, 30, 59, 500), OFFSET_PONE));
        });

        it('illegal', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.withDayOfYear(367);
            }).to.throw(DateTimeException);
        });

        it('invalid', () => {
            expect(() => {
                OffsetDateTime.of(LocalDate.of(2007, 2, 2), LocalTime.of(11, 30), OFFSET_PONE).withDayOfYear(366);
            }).to.throw(DateTimeException);
        });
    });

    describe('withHour', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withHour(15);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(15, 30, 59), OFFSET_PONE));
        });
    });

    describe('withMinute', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withMinute(15);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 15, 59), OFFSET_PONE));
        });
    });

    describe('withSecond', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.withSecond(15);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 15), OFFSET_PONE));
        });
    });

    describe('withNanoOfSecond', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 1), OFFSET_PONE);
            const test = base.withNano(15);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 15), OFFSET_PONE));
        });
    });

    describe('truncatedTo(TemporalUnit)', () => {
        it('normal', () => {
            assertEquals(TEST_2008_6_30_11_30_59_000000500.truncatedTo(ChronoUnit.NANOS), TEST_2008_6_30_11_30_59_000000500);
            assertEquals(TEST_2008_6_30_11_30_59_000000500.truncatedTo(ChronoUnit.SECONDS), TEST_2008_6_30_11_30_59_000000500.withNano(0));
            assertEquals(TEST_2008_6_30_11_30_59_000000500.truncatedTo(ChronoUnit.DAYS), TEST_2008_6_30_11_30_59_000000500.with(LocalTime.MIDNIGHT));
        });

        it('null', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.truncatedTo(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('plus(Period)', () => {
        it('normal', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2008_6_30_11_30_59_000000500.plus(period);
            assertEquals(t, OffsetDateTime.of(LocalDate.of(2009, 1, 30), LocalTime.of(11, 30, 59, 500), OFFSET_PONE));
        });
    });

    describe('plus(Duration)', () => {
        it('normal', () => {
            const dur = Duration.ofSeconds(62, 3);
            const t = TEST_2008_6_30_11_30_59_000000500.plus(dur);
            assertEquals(t, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 32, 1, 503), OFFSET_PONE));
        });

        it('zero', () => {
            const t = TEST_2008_6_30_11_30_59_000000500.plus(Duration.ZERO);
            assertEquals(t, TEST_2008_6_30_11_30_59_000000500);
        });

        it('null', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.plus(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('plusYears', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusYears(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2009, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('plusMonths', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusMonths(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 7, 30), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('plusWeeks', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusWeeks(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 7, 7), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('plusDays', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusDays(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 7, 1), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('plusHours', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusHours(13);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 7, 1), LocalTime.of(0, 30, 59), OFFSET_PONE));
        });
    });

    describe('plusMinutes', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusMinutes(30);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(12, 0, 59), OFFSET_PONE));
        });
    });

    describe('plusSeconds', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.plusSeconds(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 31, 0), OFFSET_PONE));
        });
    });

    describe('plusNanos', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 0), OFFSET_PONE);
            const test = base.plusNanos(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 1), OFFSET_PONE));
        });
    });

    describe('mius(Period)', () => {
        it('normal', () => {
            const period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
            const t = TEST_2008_6_30_11_30_59_000000500.minus(period);
            assertEquals(t, OffsetDateTime.of(LocalDate.of(2007, 11, 30), LocalTime.of(11, 30, 59, 500), OFFSET_PONE));
        });
    });

    describe('minus(Duration)', () => {
        it('normal', () => {
            const dur = Duration.ofSeconds(62, 3);
            const t = TEST_2008_6_30_11_30_59_000000500.minus(dur);
            assertEquals(t, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 57, 497), OFFSET_PONE));
        });

        it('zero', () => {
            const t = TEST_2008_6_30_11_30_59_000000500.minus(Duration.ZERO);
            assertEquals(t, TEST_2008_6_30_11_30_59_000000500);
        });

        it('null', () => {
            expect(() => {
                TEST_2008_6_30_11_30_59_000000500.minus(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('minusYears', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusYears(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2007, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('minusMonths', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusMonths(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 5, 30), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('minusWeeks', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusWeeks(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 23), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('minusDays', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusDays(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 29), LocalTime.of(11, 30, 59), OFFSET_PONE));
        });
    });

    describe('minusHours', () => {
        it('normal' +
            '', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusHours(13);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 29), LocalTime.of(22, 30, 59), OFFSET_PONE));
        });
    });

    describe('miusMinutes', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusMinutes(30);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 0, 59), OFFSET_PONE));
        });
    });

    describe('minusSeconds', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
            const test = base.minusSeconds(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 58), OFFSET_PONE));
        });
    });

    describe('minusNanos', () => {
        it('normal', () => {
            const base = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59, 0), OFFSET_PONE);
            const test = base.minusNanos(1);
            assertEquals(test, OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 58, 999999999), OFFSET_PONE));
        });
    });

    describe('atZoneSameInstant', () => {
        it('atZone', () => {
            const t = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_MTWO);
            assertEquals(t.atZoneSameInstant(ZONE_PARIS),
                ZonedDateTime.of(LocalDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(15, 30)), ZONE_PARIS));
        });

        it('nullTimeZone', () => {
            expect(() => {
                const t = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PTWO);
                t.atZoneSameInstant(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('atZoneSimilarLocal', () => {
        it('normal', () => {
            const t = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_MTWO);
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS),
                ZonedDateTime.of(LocalDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30)), ZONE_PARIS));
        });

        it('dstGap', () => {
            const t = OffsetDateTime.of(LocalDate.of(2007, 4, 1), LocalTime.of(0, 0), OFFSET_MTWO);
            assertEquals(t.atZoneSimilarLocal(ZONE_GAZA),
                ZonedDateTime.of(LocalDateTime.of(LocalDate.of(2007, 4, 1), LocalTime.of(1, 0)), ZONE_GAZA));
        });

        it('dstOverlapSummer', () => {
            const t = OffsetDateTime.of(LocalDate.of(2007, 10, 28), LocalTime.of(2, 30), OFFSET_PTWO);
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).toLocalDateTime(), t.toLocalDateTime());
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).offset(), OFFSET_PTWO);
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).zone(), ZONE_PARIS);
        });

        it('dstOverlapWinter', () => {
            const t = OffsetDateTime.of(LocalDate.of(2007, 10, 28), LocalTime.of(2, 30), OFFSET_PONE);
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).toLocalDateTime(), t.toLocalDateTime());
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).offset(), OFFSET_PONE);
            assertEquals(t.atZoneSimilarLocal(ZONE_PARIS).zone(), ZONE_PARIS);
        });

        it('nullTimeZone', () => {
            expect(() => {
                const t = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PTWO);
                t.atZoneSimilarLocal(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('toEpochSecond', () => {
        it('afterEpoch', function() {
            for (let i = 0; i < 100000; i += 100) {
                const a = OffsetDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(0, 0), ZoneOffset.UTC).plusSeconds(i);
                assertEquals(a.toEpochSecond(), i);
            }
        });

        it('beforeEpoch', () => {
            // +0 !== -0 in JS
            const b = OffsetDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(0, 0), ZoneOffset.UTC).minusSeconds(0);
            assertEquals(b.toEpochSecond(), 0);

            for (let i = 1; i < 100000; i += 100) {
                const a = OffsetDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(0, 0), ZoneOffset.UTC).minusSeconds(i);
                assertEquals(a.toEpochSecond(), -i);
            }
        });
    });

    describe('compareTo', () => {
        it('timeMins', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 3), OFFSET_PONE);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 2), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('timeSecs', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 2), OFFSET_PONE);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 3), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('timeNanos', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 40, 4), OFFSET_PONE);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 29, 40, 5), OFFSET_PONE);  // a is before b due to time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('offset', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PTWO);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), OFFSET_PONE);  // a is before b due to offset
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('offsetNanos', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 40, 6), OFFSET_PTWO);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 40, 5), OFFSET_PONE);  // a is before b due to offset
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('both', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 50), OFFSET_PTWO);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 20), OFFSET_PONE);  // a is before b on instant scale
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('bothNanos', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 20, 40, 4), OFFSET_PTWO);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(10, 20, 40, 5), OFFSET_PONE);  // a is before b on instant scale
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) < 0, true);
        });

        it('hourDifference', () => {
            const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(10, 0), OFFSET_PONE);
            const b = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 0), OFFSET_PTWO);  // a is before b despite being same time-line time
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(a.toInstant().compareTo(b.toInstant()) === 0, true);
        });

        it('max', () => {
            const a = OffsetDateTime.of(LocalDate.of(Year.MAX_VALUE, 12, 31), LocalTime.of(23, 59), OFFSET_MONE);
            const b = OffsetDateTime.of(LocalDate.of(Year.MAX_VALUE, 12, 31), LocalTime.of(23, 59), OFFSET_MTWO);  // a is before b due to offset
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
        });

        it('min', () => {
            const a = OffsetDateTime.of(LocalDate.of(Year.MIN_VALUE, 1, 1), LocalTime.of(0, 0), OFFSET_PTWO);
            const b = OffsetDateTime.of(LocalDate.of(Year.MIN_VALUE, 1, 1), LocalTime.of(0, 0), OFFSET_PONE);  // a is before b due to offset
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
        });

        it('null', () => {
            expect(() => {
                const a = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30, 59), OFFSET_PONE);
                a.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('NonOffsetDateTime', () => {
            expect(() => {
                const c = TEST_2008_6_30_11_30_59_000000500;
                c.compareTo(new Object());
            }).to.throw(IllegalArgumentException);
        });
    });
});
