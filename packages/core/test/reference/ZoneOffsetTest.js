/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, assertSame, assertTrue} from '../testUtils';

import '../_init';

import {DateTimeException, NullPointerException} from '../../src/errors';

import {Duration} from '../../src/Duration';
import {LocalTime} from '../../src/LocalTime';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {OffsetTime} from '../../src/OffsetTime';
import {ZonedDateTime} from '../../src/ZonedDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';

import {ChronoField} from '../../src/temporal/ChronoField';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';

describe('org.threeten.bp.TestZoneOffset', () => {

    describe('constant', () => {
        it('test_constant_UTC', () => {
            const test = ZoneOffset.UTC;
            doTestOffset(test, 0, 0, 0);
        });

        it('test_constant_MIN', () => {
            const test = ZoneOffset.MIN;
            doTestOffset(test, -18, 0, 0);
        });

        it('test_constant_MAX', () => {
            const test = ZoneOffset.MAX;
            doTestOffset(test, 18, 0, 0);
        });
    });

    describe('of(String)', () => {

        it('test_factory_string_UTC', () => {
            const values = [
                'Z','+0',
                '+00', '+0000', '+00:00', '+000000', '+00:00:00',
                '-00', '-0000', '-00:00', '-000000', '-00:00:00'
            ];
            for (let i = 0; i < values.length; i++) {
                const test = ZoneOffset.of(values[i]);
                assertSame(test, ZoneOffset.UTC);
            }
        });

        it('test_factory_string_invalid', () => {
            const values = [
                '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'ZZ',
                '0', '+0:00', '+00:0', '+0:0',
                '+000', '+00000',
                '+0:00:00', '+00:0:00', '+00:00:0', '+0:0:0', '+0:0:00', '+00:0:0', '+0:00:0',
                '1', '+01_00', '+01;00', '+01@00', '+01:AA',
                '+19', '+19:00', '+18:01', '+18:00:01', '+1801', '+180001',
                '-0:00', '-00:0', '-0:0',
                '-000', '-00000',
                '-0:00:00', '-00:0:00', '-00:00:0', '-0:0:0', '-0:0:00', '-00:0:0', '-0:00:0',
                '-19', '-19:00', '-18:01', '-18:00:01', '-1801', '-180001',
                '-01_00', '-01;00', '-01@00', '-01:AA',
                '@01:00'
            ];
            for (let i = 0; i < values.length; i++) {
                expect(() => {
                    ZoneOffset.of(values[i]);
                }).to.throw(DateTimeException);
            }
        });

        it('test_factory_string_null', () => {
            expect(() => {
                ZoneOffset.of(null);
            }).to.throw(NullPointerException);
        });

        //-----------------------------------------------------------------------
        it('test_factory_string_singleDigitHours', () => {
            for (let i = -9; i <= 9; i++) {
                const str = (i < 0 ? '-' : '+') + Math.abs(i);
                const test = ZoneOffset.of(str);
                doTestOffset(test, i, 0, 0);
            }
        });

        it('test_factory_string_hours', () => {
            for (let i = -18; i <= 18; i++) {
                const str = (i < 0 ? '-' : '+') + ('' + (Math.abs(i) + 100)).substring(1);
                const test = ZoneOffset.of(str);
                doTestOffset(test, i, 0, 0);
            }
        });

        it('test_factory_string_hours_minutes_noColon', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j++) {
                    if ((i < 0 && j <= 0) || (i > 0 && j >= 0) || i === 0) {
                        const str = (i < 0 || j < 0 ? '-' : '+') +
                            ('' + (Math.abs(i) + 100)).substring(1) +
                            ('' + (Math.abs(j) + 100)).substring(1);
                        const test = ZoneOffset.of(str);
                        doTestOffset(test, i, j, 0);
                    }
                }
            }
            const test1 = ZoneOffset.of('-1800');
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.of('+1800');
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_string_hours_minutes_colon', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j++) {
                    if ((i < 0 && j <= 0) || (i > 0 && j >= 0) || i === 0) {
                        const str = (i < 0 || j < 0 ? '-' : '+') +
                            ('' + (Math.abs(i) + 100)).substring(1) + ':' +
                            ('' + (Math.abs(j) + 100)).substring(1);
                        const test = ZoneOffset.of(str);
                        doTestOffset(test, i, j, 0);
                    }
                }
            }
            const test1 = ZoneOffset.of('-18:00');
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.of('+18:00');
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_string_hours_minutes_seconds_noColon', () => {
            for (let i = -17; i <= 17; i+=2) {
                for (let j = -59; j <= 59; j+=7) {
                    for (let k = -59; k <= 59; k+=11) {
                        if ((i < 0 && j <= 0 && k <= 0) || (i > 0 && j >= 0 && k >= 0) ||
                            (i === 0 && ((j < 0 && k <= 0) || (j > 0 && k >= 0) || j === 0))) {
                            const str = (i < 0 || j < 0 || k < 0 ? '-' : '+') +
                                ('' + (Math.abs(i) + 100)).substring(1) +
                                ('' + (Math.abs(j) + 100)).substring(1) +
                                ('' + (Math.abs(k) + 100)).substring(1);
                            const test = ZoneOffset.of(str);
                            doTestOffset(test, i, j, k);
                        }
                    }
                }
            }
            const test1 = ZoneOffset.of('-180000');
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.of('+180000');
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_string_hours_minutes_seconds_colon', () => {
            for (let i = -17; i <= 17; i+=3) {
                for (let j = -59; j <= 59; j+=11) {
                    for (let k = -59; k <= 59; k+=7) {
                        if ((i < 0 && j <= 0 && k <= 0) || (i > 0 && j >= 0 && k >= 0) ||
                            (i === 0 && ((j < 0 && k <= 0) || (j > 0 && k >= 0) || j === 0))) {
                            const str = (i < 0 || j < 0 || k < 0 ? '-' : '+') +
                                ('' + (Math.abs(i) + 100)).substring(1) + ':' +
                                ('' + (Math.abs(j) + 100)).substring(1) + ':' +
                                ('' + (Math.abs(k) + 100)).substring(1);
                            const test = ZoneOffset.of(str);
                            doTestOffset(test, i, j, k);
                        }
                    }
                }
            }
            const test1 = ZoneOffset.of('-18:00:00');
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.of('+18:00:00');
            doTestOffset(test2, 18, 0, 0);
        });

    });

    describe('ofHours', () => {
        it('test_factory_int_hours', () => {
            for (let i = -18; i <= 18; i++) {
                const test = ZoneOffset.ofHours(i);
                doTestOffset(test, i, 0, 0);
            }
        });

        it('test_factory_int_hours_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHours(19);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHours(-19);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofHoursMinutes', () => {
        it('test_factory_int_hours_minutes', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j++) {
                    if ((i < 0 && j <= 0) || (i > 0 && j >= 0) || i === 0) {
                        const test = ZoneOffset.ofHoursMinutes(i, j);
                        doTestOffset(test, i, j, 0);
                    }
                }
            }
            const test1 = ZoneOffset.ofHoursMinutes(-18, 0);
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.ofHoursMinutes(18, 0);
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_int_hours_minutes_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(19, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(18, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(-19, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(-18, -1);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofHoursMinutesSeconds', () => {
        const step = 10; // isCoverageTestRunner() ? 10 : 1;
        it('test_factory_int_hours_minutes_seconds', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j+= step) {
                    for (let k = -59; k <= 59; k+= step) {
                        if ((i < 0 && j <= 0 && k <= 0) || (i > 0 && j >= 0 && k >= 0) ||
                                (i === 0 && ((j < 0 && k <= 0) || (j > 0 && k >= 0) || j === 0))) {
                            const test = ZoneOffset.ofHoursMinutesSeconds(i, j, k);
                            doTestOffset(test, i, j, k);
                        }
                    }
                }
            }
            const test1 = ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0);
            doTestOffset(test1, -18, 0, 0);
            const test2 = ZoneOffset.ofHoursMinutesSeconds(18, 0, 0);
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_int_hours_minutes_seconds_plusHoursMinusMinutes', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(1, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_plusHoursMinusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(1, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minusHoursPlusMinutes', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-1, 1, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minusHoursPlusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-1, 0, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_zeroHoursMinusMinutesPlusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, -1, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_zeroHoursPlusMinutesMinusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 1, -1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minutesTooLarge', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minutesTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, -60, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_secondsTooLarge', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 0, 60);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(19, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(18, 0, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-19, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-18, 0, 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofTotalSeconds', () => {
        it('test_factory_ofTotalSeconds', () => {
            expect(ZoneOffset.ofTotalSeconds(60 * 60 + 1).equals(ZoneOffset.ofHoursMinutesSeconds(1, 0, 1))).to.be.true;
            expect(ZoneOffset.ofTotalSeconds(18 * 60 * 60).equals(ZoneOffset.ofHours(18))).to.be.true;
            expect(ZoneOffset.ofTotalSeconds(-18 * 60 * 60).equals(ZoneOffset.ofHours(-18))).to.be.true;
        });

        it('test_factory_ofTotalSeconds_tooLarge', () => {
            expect(() => {
                ZoneOffset.ofTotalSeconds(18 * 60 * 60 + 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ofTotalSeconds_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofTotalSeconds(-18 * 60 * 60 - 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('from(TemporalAccessor)', () => {

        it('test_factory_TemporalAccessor', () => {
            assertEquals(ZoneOffset.from(OffsetTime.of(LocalTime.of(12, 30), ZoneOffset.ofHours(6))), ZoneOffset.ofHours(6));
            assertEquals(ZoneOffset.from(ZonedDateTime.of(LocalDateTime.of(LocalDate.of(2007, 7, 15),
                LocalTime.of(17, 30)), ZoneOffset.ofHours(2))), ZoneOffset.ofHours(2));
        });

        it('test_factory_TemporalAccessor_invalid_noDerive', () => {
            expect(() => {
                ZoneOffset.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('test_factory_TemporalAccessor_null', () => {
            expect(() => {
                ZoneOffset.from(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('getTotalSeconds()', () => {

        it('test_getTotalSeconds', () => {
            const offset = ZoneOffset.ofTotalSeconds(60 * 60 + 1);
            assertEquals(offset.totalSeconds(), 60 * 60 + 1);
        });

    });

    describe('getId()', () => {

        it('test_getId()', () => {
            let offset = ZoneOffset.ofHoursMinutesSeconds(1, 0, 0);
            assertEquals(offset.id(), '+01:00');
            offset = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            assertEquals(offset.id(), '+01:02:03');
            offset = ZoneOffset.UTC;
            assertEquals(offset.id(), 'Z');
        });

    });

    describe('getRules()', () => {

        it('test_getRules', () => {
            const offset = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            assertEquals(offset.rules().isFixedOffset(), true);
            assertEquals(offset.rules().offset(null), offset);

            assertEquals(offset.rules().daylightSavings(null), Duration.ZERO);
            assertEquals(offset.rules().isDaylightSavings(null), false);
            assertEquals(offset.rules().standardOffset(null), offset);
            assertEquals(offset.rules().nextTransition(null), null);
            assertEquals(offset.rules().previousTransition(null), null);

            assertEquals(offset.rules().isValidOffset(null, offset), true);
            assertEquals(offset.rules().isValidOffset(null, ZoneOffset.UTC), false);
            assertEquals(offset.rules().isValidOffset(null, null), false);
            assertEquals(offset.rules().offset(null), offset);

            assertEquals(offset.rules().validOffsets(null), [offset]);
            assertEquals(offset.rules().transition(null), null);
            assertEquals(offset.rules().transitions().length, 0);
            assertEquals(offset.rules().transitionRules().length, 0);
        });

    });

    describe('get(TemporalField)', () => {

        it('test_get_TemporalField', () => {
            assertEquals(ZoneOffset.UTC.get(ChronoField.OFFSET_SECONDS), 0);
            assertEquals(ZoneOffset.ofHours(-2).get(ChronoField.OFFSET_SECONDS), -7200);
            assertEquals(ZoneOffset.ofHoursMinutesSeconds(0, 1, 5).get(ChronoField.OFFSET_SECONDS), 65);
        });

        it('test_getLong_TemporalField', () => {
            assertEquals(ZoneOffset.UTC.getLong(ChronoField.OFFSET_SECONDS), 0);
            assertEquals(ZoneOffset.ofHours(-2).getLong(ChronoField.OFFSET_SECONDS), -7200);
            assertEquals(ZoneOffset.ofHoursMinutesSeconds(0, 1, 5).getLong(ChronoField.OFFSET_SECONDS), 65);
        });

    });

    describe('query(TemporalQuery)', () => {

        it('test_query', () => {
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.chronology()), null);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.localDate()), null);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.localTime()), null);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.offset()), ZoneOffset.UTC);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.precision()), null);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.zone()), ZoneOffset.UTC);
            assertEquals(ZoneOffset.UTC.query(TemporalQueries.zoneId()), null);
        });

        it('test_query_null', () => {
            expect(() => {
                ZoneOffset.UTC.query(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('compareTo()', () => {

        it('test_compareTo()', () => {
            const offset1 = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            const offset2 = ZoneOffset.ofHoursMinutesSeconds(2, 3, 4);
            assertTrue(offset1.compareTo(offset2) > 0);
            assertTrue(offset2.compareTo(offset1) < 0);
            assertTrue(offset1.compareTo(offset1) === 0);
            assertTrue(offset2.compareTo(offset2) === 0);
        });

    });

    describe('equals', () => {
        it('test_equals', () => {
            const offset1 = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            const offset2 = ZoneOffset.ofHoursMinutesSeconds(2, 3, 4);
            const offset2b = ZoneOffset.ofHoursMinutesSeconds(2, 3, 4);

            expect(offset1.equals(offset2)).to.equal(false);
            expect(offset2.equals(offset1)).to.equal(false);

            expect(offset2.equals({})).to.equal(false);

            expect(offset1.equals(offset1)).to.equal(true);
            expect(offset2.equals(offset2)).to.equal(true);
            expect(offset2.equals(offset2b)).to.equal(true);

            assertEquals(offset1.hashCode() === offset1.hashCode(), true);
            assertEquals(offset2.hashCode() === offset2.hashCode(), true);
            assertEquals(offset2.hashCode() === offset2b.hashCode(), true);
        });

    });

    describe('toString()', () => {

        it('test_toString()', () => {
            let offset = ZoneOffset.ofHoursMinutesSeconds(1, 0, 0);
            assertEquals(offset.toString(), '+01:00');
            offset = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            assertEquals(offset.toString(), '+01:02:03');
            offset = ZoneOffset.UTC;
            assertEquals(offset.toString(), 'Z');
        });

    });

});

function doTestOffset(offset, hours, minutes, seconds) {
    expect(offset.totalSeconds()).to.equal(hours * 60 * 60 + minutes * 60 + seconds);

    let id;
    if (hours === 0 && minutes === 0 && seconds === 0) {
        id = 'Z';
    } else {
        let str = (hours < 0 || minutes < 0 || seconds < 0) ? '-' : '+';
        str += ('' + (Math.abs(hours) + 100)).substring(1);
        str += ':';
        str += ('' + (Math.abs(minutes) + 100)).substring(1);
        if (seconds !== 0) {
            str += ':';
            str += ('' + (Math.abs(seconds) + 100)).substring(1);
        }
        id = str;
    }
    assertEquals(offset.id(), id);

    expect(offset.equals(ZoneOffset.ofHoursMinutesSeconds(hours, minutes, seconds)));
    if (seconds === 0) {
        expect(offset.equals(ZoneOffset.ofHoursMinutes(hours, minutes)));
        if (minutes === 0) {
            expect(offset.equals(ZoneOffset.ofHours(hours)));
        }
    }
    assertEquals(ZoneOffset.of(id), offset);
    assertEquals(offset.toString(), id);
}
