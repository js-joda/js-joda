/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../../_init';
import {assertEquals} from '../../testUtils';

import {IllegalArgumentException, NullPointerException} from '../../../src/errors';

import {Duration} from '../../../src/Duration';
import {LocalDateTime} from '../../../src/LocalDateTime';
import {ZoneOffset} from '../../../src/ZoneOffset';
import {ZoneOffsetTransition} from '../../../src/zone/ZoneOffsetTransition';

import {ChronoUnit} from '../../../src/temporal/ChronoUnit';

describe('org.threeten.bp.zone.TestZoneOffsetTransition', () => {

    const OFFSET_0100 = ZoneOffset.ofHours(1);
    const OFFSET_0200 = ZoneOffset.ofHours(2);
    const OFFSET_0230 = ZoneOffset.ofHoursMinutes(2, 30);
    const OFFSET_0300 = ZoneOffset.ofHours(3);
    const OFFSET_0400 = ZoneOffset.ofHours(4);

    describe('factory', () => {

        it('test_factory_nullTransition', () => {
            expect(() => {
                ZoneOffsetTransition.of(null, OFFSET_0100, OFFSET_0200);
            }).to.throw(NullPointerException);
        });

        it('test_factory_nullOffsetBefore', () => {
            expect(() => {
                ZoneOffsetTransition.of(LocalDateTime.of(2010, 12, 3, 11, 30), null, OFFSET_0200);
            }).to.throw(NullPointerException);
        });

        it('test_factory_nullOffsetAfter', () => {
            expect(() => {
                ZoneOffsetTransition.of(LocalDateTime.of(2010, 12, 3, 11, 30), OFFSET_0200, null);
            }).to.throw(NullPointerException);
        });

        it('test_factory_sameOffset', () => {
            expect(() => {
                ZoneOffsetTransition.of(LocalDateTime.of(2010, 12, 3, 11, 30), OFFSET_0200, OFFSET_0200);
            }).to.throw(IllegalArgumentException);
        });

        it('test_factory_noNanos', () => {
            expect(() => {
                ZoneOffsetTransition.of(LocalDateTime.of(2010, 12, 3, 11, 30, 0, 500), OFFSET_0200, OFFSET_0300);
            }).to.throw(IllegalArgumentException);
        });
    });

    describe('getters', () => {

        it('test_getters_gap()', () => {
            const before = LocalDateTime.of(2010, 3, 31, 1, 0);
            const after = LocalDateTime.of(2010, 3, 31, 2, 0);
            const test = ZoneOffsetTransition.of(before, OFFSET_0200, OFFSET_0300);
            assertEquals(test.isGap(), true);
            assertEquals(test.isOverlap(), false);
            assertEquals(test.dateTimeBefore(), before);
            assertEquals(test.dateTimeAfter(), after);
            assertEquals(test.instant(), before.toInstant(OFFSET_0200));
            assertEquals(test.offsetBefore(), OFFSET_0200);
            assertEquals(test.offsetAfter(), OFFSET_0300);
            assertEquals(test.duration(), Duration.of(1, ChronoUnit.HOURS));
            assertEquals(test.validOffsets(), []);
        });

        it('test_getters_overlap()', () => {
            const before = LocalDateTime.of(2010, 10, 31, 1, 0);
            const after = LocalDateTime.of(2010, 10, 31, 0, 0);
            const test = ZoneOffsetTransition.of(before, OFFSET_0300, OFFSET_0200);
            assertEquals(test.isGap(), false);
            assertEquals(test.isOverlap(), true);
            assertEquals(test.dateTimeBefore(), before);
            assertEquals(test.dateTimeAfter(), after);
            assertEquals(test.instant(), before.toInstant(OFFSET_0300));
            assertEquals(test.offsetBefore(), OFFSET_0300);
            assertEquals(test.offsetAfter(), OFFSET_0200);
            assertEquals(test.duration(), Duration.of(-1, ChronoUnit.HOURS));
            assertEquals(test.validOffsets(), [OFFSET_0300, OFFSET_0200]);
        });

    });

    describe('isValidOffset()', () => {

        it('test_isValidOffset_gap', () => {
            const ldt = LocalDateTime.of(2010, 3, 31, 1, 0);
            const test = ZoneOffsetTransition.of(ldt, OFFSET_0200, OFFSET_0300);
            assertEquals(test.isValidOffset(OFFSET_0100), false);
            assertEquals(test.isValidOffset(OFFSET_0200), false);
            assertEquals(test.isValidOffset(OFFSET_0230), false);
            assertEquals(test.isValidOffset(OFFSET_0300), false);
            assertEquals(test.isValidOffset(OFFSET_0400), false);
        });

        it('test_isValidOffset_overlap', () => {
            const ldt = LocalDateTime.of(2010, 10, 31, 1, 0);
            const test = ZoneOffsetTransition.of(ldt, OFFSET_0300, OFFSET_0200);
            assertEquals(test.isValidOffset(OFFSET_0100), false);
            assertEquals(test.isValidOffset(OFFSET_0200), true);
            assertEquals(test.isValidOffset(OFFSET_0230), false);
            assertEquals(test.isValidOffset(OFFSET_0300), true);
            assertEquals(test.isValidOffset(OFFSET_0400), false);
        });

    });

    describe('compareTo()', () => {

        it('test_compareTo()', () => {
            const a = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287 - 1, 0, OFFSET_0200), OFFSET_0200, OFFSET_0300);
            const b = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287, 0, OFFSET_0300), OFFSET_0300, OFFSET_0200);
            const c = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287 + 1, 0, OFFSET_0100), OFFSET_0100, OFFSET_0400);

            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(a.compareTo(b) < 0, true);
            assertEquals(a.compareTo(c) < 0, true);

            assertEquals(b.compareTo(a) > 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(b.compareTo(c) < 0, true);

            assertEquals(c.compareTo(a) > 0, true);
            assertEquals(c.compareTo(b) > 0, true);
            assertEquals(c.compareTo(c) === 0, true);
        });

        it('test_compareTo_sameInstant', () => {
            const a = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287, 0, OFFSET_0200), OFFSET_0200, OFFSET_0300);
            const b = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287, 0, OFFSET_0300), OFFSET_0300, OFFSET_0200);
            const c = ZoneOffsetTransition.of(
                LocalDateTime.ofEpochSecond(23875287, 0, OFFSET_0100), OFFSET_0100, OFFSET_0400);

            assertEquals(a.compareTo(a) === 0, true);
            assertEquals(a.compareTo(b) === 0, true);
            assertEquals(a.compareTo(c) === 0, true);

            assertEquals(b.compareTo(a) === 0, true);
            assertEquals(b.compareTo(b) === 0, true);
            assertEquals(b.compareTo(c) === 0, true);

            assertEquals(c.compareTo(a) === 0, true);
            assertEquals(c.compareTo(b) === 0, true);
            assertEquals(c.compareTo(c) === 0, true);
        });

    });

    describe('equals()', () => {

        it('test_equals()', () => {
            const ldtA = LocalDateTime.of(2010, 3, 31, 1, 0);
            const a1 = ZoneOffsetTransition.of(ldtA, OFFSET_0200, OFFSET_0300);
            const a2 = ZoneOffsetTransition.of(ldtA, OFFSET_0200, OFFSET_0300);
            const ldtB = LocalDateTime.of(2010, 10, 31, 1, 0);
            const b = ZoneOffsetTransition.of(ldtB, OFFSET_0300, OFFSET_0200);

            assertEquals(a1.equals(a1), true);
            assertEquals(a1.equals(a2), true);
            assertEquals(a1.equals(b), false);
            assertEquals(a2.equals(a1), true);
            assertEquals(a2.equals(a2), true);
            assertEquals(a2.equals(b), false);
            assertEquals(b.equals(a1), false);
            assertEquals(b.equals(a2), false);
            assertEquals(b.equals(b), true);

            assertEquals(a1.equals(''), false);
            assertEquals(a1.equals(null), false);
        });

    });

    describe('hashCode()', () => {

        it('test_hashCode_floatingWeek_gap_notEndOfDay', () => {
            const ldtA = LocalDateTime.of(2010, 3, 31, 1, 0);
            const a1 = ZoneOffsetTransition.of(ldtA, OFFSET_0200, OFFSET_0300);
            const a2 = ZoneOffsetTransition.of(ldtA, OFFSET_0200, OFFSET_0300);
            const ldtB = LocalDateTime.of(2010, 10, 31, 1, 0);
            const b = ZoneOffsetTransition.of(ldtB, OFFSET_0300, OFFSET_0200);

            assertEquals(a1.hashCode(), a1.hashCode());
            assertEquals(a1.hashCode(), a2.hashCode());
            assertEquals(b.hashCode(), b.hashCode());
        });

    });


    describe('toString()', () => {

        it('test_toString_gap()', () => {
            const ldt = LocalDateTime.of(2010, 3, 31, 1, 0);
            const test = ZoneOffsetTransition.of(ldt, OFFSET_0200, OFFSET_0300);
            assertEquals(test.toString(), 'Transition[Gap at 2010-03-31T01:00+02:00 to +03:00]');
        });

        it('test_toString_overlap()', () => {
            const ldt = LocalDateTime.of(2010, 10, 31, 1, 0);
            const test = ZoneOffsetTransition.of(ldt, OFFSET_0300, OFFSET_0200);
            assertEquals(test.toString(), 'Transition[Overlap at 2010-10-31T01:00+03:00 to +02:00]');
        });

    });


});
