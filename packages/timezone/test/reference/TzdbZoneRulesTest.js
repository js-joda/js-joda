/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/*
 * Port of ThreeTen-Backport's org.threeten.bp.zone.TestStandardZoneRules,
 * commit 01754f00b5edd3f8a9fe2c7c71477a91ec223852 (1.7.6-SNAPSHOT, tzdb 2026egtz),
 * run against the IANA tzdb data of @js-joda/timezone.
 * Design D6 of the openspec change add-daylight-saving-zone-rules lists which tests are
 * ported as is, adapted, replaced or dropped. The tests for standardOffset, daylightSavings,
 * isDaylightSavings, nextTransition and previousTransition are added with these methods.
 */
import { expect } from 'chai';

import { LocalDateTime, ZoneId, ZoneOffset } from '@js-joda/core';

import { assertEquals, assertNotNull } from '../testUtils';
import '../useTzdbZoneRules';

describe('org.threeten.bp.zone.TestStandardZoneRules', () => {

    const OFFSET_ZERO = ZoneOffset.ofHours(0);
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);
    const OVERLAP = 2;
    const GAP = 0;

    const europeLondon = () => ZoneId.of('Europe/London').rules();
    const europeDublin = () => ZoneId.of('Europe/Dublin').rules();
    const europeParis = () => ZoneId.of('Europe/Paris').rules();
    const americaNewYork = () => ZoneId.of('America/New_York').rules();

    function createInstant(year, month, day, ...rest) {
        const offset = rest.pop();
        const [hour = 0, min = 0, sec = 0, nano = 0] = rest;
        return LocalDateTime.of(year, month, day, hour, min, sec, nano).toInstant(offset);
    }

    function createZDT(year, month, day, zone) {
        return LocalDateTime.of(year, month, day, 0, 0).atZone(zone);
    }

    function createLDT(year, month, day) {
        return LocalDateTime.of(year, month, day, 0, 0);
    }

    function checkOffset(rules, dateTime, offset, type) {
        const validOffsets = rules.validOffsets(dateTime);
        assertEquals(validOffsets.length, type);
        assertEquals(rules.offset(dateTime), offset);
        if (type === 1) {
            assertEquals(validOffsets[0], offset);
            return null;
        } else {
            const zot = rules.transition(dateTime);
            assertNotNull(zot);
            assertEquals(zot.isOverlap(), type === 2);
            assertEquals(zot.isGap(), type === 0);
            assertEquals(zot.isValidOffset(offset), type === 2);
            return zot;
        }
    }

    describe('Europe/London', () => {

        it('test_London', () => {
            const test = europeLondon();
            assertEquals(test.isFixedOffset(), false);
        });

        it('test_London_preTimeZones', () => {
            const test = europeLondon();
            const old = createZDT(1800, 1, 1, ZoneOffset.UTC);
            const instant = old.toInstant();
            const offset = ZoneOffset.ofHoursMinutesSeconds(0, -1, -15);
            assertEquals(test.offset(instant), offset);
            checkOffset(test, old.toLocalDateTime(), offset, 1);
        });

        it('test_London_getOffset', () => {
            const test = europeLondon();
            assertEquals(test.offset(createInstant(2008, 1, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 2, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 4, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 5, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 6, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 7, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 8, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 9, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 11, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 12, 1, ZoneOffset.UTC)), OFFSET_ZERO);
        });

        it('test_London_getOffset_toDST', () => {
            const test = europeLondon();
            assertEquals(test.offset(createInstant(2008, 3, 24, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 25, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 26, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 27, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 28, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 29, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 30, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 31, ZoneOffset.UTC)), OFFSET_PONE);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 3, 30, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 30, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('test_London_getOffset_fromDST', () => {
            const test = europeLondon();
            assertEquals(test.offset(createInstant(2008, 10, 24, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 25, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 26, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 27, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 28, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 29, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 30, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 31, ZoneOffset.UTC)), OFFSET_ZERO);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 10, 26, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 26, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
        });

        it('test_London_getOffsetInfo', () => {
            const test = europeLondon();
            checkOffset(test, createLDT(2008, 1, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 2, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 4, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 5, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 6, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 7, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 8, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 9, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 11, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 12, 1), OFFSET_ZERO, 1);
        });

        it('test_London_getOffsetInfo_toDST', () => {
            const test = europeLondon();
            checkOffset(test, createLDT(2008, 3, 24), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 25), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 26), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 27), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 28), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 29), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 30), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 31), OFFSET_PONE, 1);
            // cutover at 01:00Z
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 0, 59, 59, 999999999), OFFSET_ZERO, 1);
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 2, 0, 0, 0), OFFSET_PONE, 1);
        });

        it('test_London_getOffsetInfo_fromDST', () => {
            const test = europeLondon();
            checkOffset(test, createLDT(2008, 10, 24), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 25), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 26), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 27), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 28), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 29), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 30), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 31), OFFSET_ZERO, 1);
            // cutover at 01:00Z
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 0, 59, 59, 999999999), OFFSET_PONE, 1);
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 2, 0, 0, 0), OFFSET_ZERO, 1);
        });

        it('test_London_getOffsetInfo_gap', () => {
            const test = europeLondon();
            const dateTime = LocalDateTime.of(2008, 3, 30, 1, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_ZERO, GAP);
            assertEquals(trans.isGap(), true);
            assertEquals(trans.isOverlap(), false);
            assertEquals(trans.offsetBefore(), OFFSET_ZERO);
            assertEquals(trans.offsetAfter(), OFFSET_PONE);
            assertEquals(trans.instant(), createInstant(2008, 3, 30, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.dateTimeBefore(), LocalDateTime.of(2008, 3, 30, 1, 0));
            assertEquals(trans.dateTimeAfter(), LocalDateTime.of(2008, 3, 30, 2, 0));
            assertEquals(trans.isValidOffset(OFFSET_ZERO), false);
            assertEquals(trans.isValidOffset(OFFSET_PONE), false);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Gap at 2008-03-30T01:00Z to +01:00]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(OFFSET_ZERO)).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });

        it('test_London_getOffsetInfo_overlap', () => {
            const test = europeLondon();
            const dateTime = LocalDateTime.of(2008, 10, 26, 1, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_PONE, OVERLAP);
            assertEquals(trans.isGap(), false);
            assertEquals(trans.isOverlap(), true);
            assertEquals(trans.offsetBefore(), OFFSET_PONE);
            assertEquals(trans.offsetAfter(), OFFSET_ZERO);
            assertEquals(trans.instant(), createInstant(2008, 10, 26, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.dateTimeBefore(), LocalDateTime.of(2008, 10, 26, 2, 0));
            assertEquals(trans.dateTimeAfter(), LocalDateTime.of(2008, 10, 26, 1, 0));
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-1)), false);
            assertEquals(trans.isValidOffset(OFFSET_ZERO), true);
            assertEquals(trans.isValidOffset(OFFSET_PONE), true);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Overlap at 2008-10-26T02:00+01:00 to Z]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(OFFSET_PONE)).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });
    });

    describe('Europe/Dublin', () => {

        it('test_Dublin', () => {
            const test = europeDublin();
            assertEquals(test.isFixedOffset(), false);
        });

        it('test_Dublin_getOffset', () => {
            const test = europeDublin();
            assertEquals(test.offset(createInstant(2008, 1, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 2, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 4, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 5, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 6, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 7, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 8, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 9, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 11, 1, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 12, 1, ZoneOffset.UTC)), OFFSET_ZERO);
        });

        it('test_Dublin_getOffset_toDST', () => {
            const test = europeDublin();
            assertEquals(test.offset(createInstant(2008, 3, 24, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 25, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 26, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 27, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 28, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 29, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 30, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 31, ZoneOffset.UTC)), OFFSET_PONE);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 3, 30, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 3, 30, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('test_Dublin_getOffset_fromDST', () => {
            const test = europeDublin();
            assertEquals(test.offset(createInstant(2008, 10, 24, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 25, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 26, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 27, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 28, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 29, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 30, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(test.offset(createInstant(2008, 10, 31, ZoneOffset.UTC)), OFFSET_ZERO);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 10, 26, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 26, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
        });

        it('test_Dublin_getOffsetInfo', () => {
            const test = europeDublin();
            checkOffset(test, createLDT(2008, 1, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 2, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 4, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 5, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 6, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 7, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 8, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 9, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 11, 1), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 12, 1), OFFSET_ZERO, 1);
        });

        it('test_Dublin_getOffsetInfo_toDST', () => {
            const test = europeDublin();
            checkOffset(test, createLDT(2008, 3, 24), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 25), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 26), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 27), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 28), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 29), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 30), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 3, 31), OFFSET_PONE, 1);
            // cutover at 01:00Z
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 0, 59, 59, 999999999), OFFSET_ZERO, 1);
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 2, 0, 0, 0), OFFSET_PONE, 1);
        });

        it('test_Dublin_getOffsetInfo_fromDST', () => {
            const test = europeDublin();
            checkOffset(test, createLDT(2008, 10, 24), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 25), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 26), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 27), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 28), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 29), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 30), OFFSET_ZERO, 1);
            checkOffset(test, createLDT(2008, 10, 31), OFFSET_ZERO, 1);
            // cutover at 01:00Z
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 0, 59, 59, 999999999), OFFSET_PONE, 1);
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 2, 0, 0, 0), OFFSET_ZERO, 1);
        });

        it('test_Dublin_getOffsetInfo_gap', () => {
            const test = europeDublin();
            const dateTime = LocalDateTime.of(2008, 3, 30, 1, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_ZERO, GAP);
            assertEquals(trans.isGap(), true);
            assertEquals(trans.isOverlap(), false);
            assertEquals(trans.offsetBefore(), OFFSET_ZERO);
            assertEquals(trans.offsetAfter(), OFFSET_PONE);
            assertEquals(trans.instant(), createInstant(2008, 3, 30, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.dateTimeBefore(), LocalDateTime.of(2008, 3, 30, 1, 0));
            assertEquals(trans.dateTimeAfter(), LocalDateTime.of(2008, 3, 30, 2, 0));
            assertEquals(trans.isValidOffset(OFFSET_ZERO), false);
            assertEquals(trans.isValidOffset(OFFSET_PONE), false);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Gap at 2008-03-30T01:00Z to +01:00]');
        });

        it('test_Dublin_getOffsetInfo_overlap', () => {
            const test = europeDublin();
            const dateTime = LocalDateTime.of(2008, 10, 26, 1, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_PONE, OVERLAP);
            assertEquals(trans.isGap(), false);
            assertEquals(trans.isOverlap(), true);
            assertEquals(trans.offsetBefore(), OFFSET_PONE);
            assertEquals(trans.offsetAfter(), OFFSET_ZERO);
            assertEquals(trans.instant(), createInstant(2008, 10, 26, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.dateTimeBefore(), LocalDateTime.of(2008, 10, 26, 2, 0));
            assertEquals(trans.dateTimeAfter(), LocalDateTime.of(2008, 10, 26, 1, 0));
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-1)), false);
            assertEquals(trans.isValidOffset(OFFSET_ZERO), true);
            assertEquals(trans.isValidOffset(OFFSET_PONE), true);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Overlap at 2008-10-26T02:00+01:00 to Z]');
        });
    });

    describe('Europe/Paris', () => {

        it('test_Paris', () => {
            const test = europeParis();
            assertEquals(test.isFixedOffset(), false);
        });

        it('test_Paris_preTimeZones', () => {
            const test = europeParis();
            const old = createZDT(1800, 1, 1, ZoneOffset.UTC);
            const instant = old.toInstant();
            const offset = ZoneOffset.ofHoursMinutesSeconds(0, 9, 21);
            assertEquals(test.offset(instant), offset);
            checkOffset(test, old.toLocalDateTime(), offset, 1);
        });

        it('test_Paris_getOffset', () => {
            const test = europeParis();
            assertEquals(test.offset(createInstant(2008, 1, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 2, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 4, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 5, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 6, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 7, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 8, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 9, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 10, 1, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 11, 1, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 12, 1, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('test_Paris_getOffset_toDST', () => {
            const test = europeParis();
            assertEquals(test.offset(createInstant(2008, 3, 24, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 25, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 26, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 27, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 28, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 29, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 30, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 31, ZoneOffset.UTC)), OFFSET_PTWO);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 3, 30, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 3, 30, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_PTWO);
        });

        it('test_Paris_getOffset_fromDST', () => {
            const test = europeParis();
            assertEquals(test.offset(createInstant(2008, 10, 24, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 10, 25, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 10, 26, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 10, 27, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 28, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 29, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 30, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(test.offset(createInstant(2008, 10, 31, ZoneOffset.UTC)), OFFSET_PONE);
            // cutover at 01:00Z
            assertEquals(test.offset(createInstant(2008, 10, 26, 0, 59, 59, 999999999, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(test.offset(createInstant(2008, 10, 26, 1, 0, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('test_Paris_getOffsetInfo', () => {
            const test = europeParis();
            checkOffset(test, createLDT(2008, 1, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 2, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 4, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 5, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 6, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 7, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 8, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 9, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 10, 1), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 11, 1), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 12, 1), OFFSET_PONE, 1);
        });

        it('test_Paris_getOffsetInfo_toDST', () => {
            const test = europeParis();
            checkOffset(test, createLDT(2008, 3, 24), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 25), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 26), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 27), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 28), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 29), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 30), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 3, 31), OFFSET_PTWO, 1);
            // cutover at 01:00Z which is 02:00+01:00(local Paris time)
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 1, 59, 59, 999999999), OFFSET_PONE, 1);
            checkOffset(test, LocalDateTime.of(2008, 3, 30, 3, 0, 0, 0), OFFSET_PTWO, 1);
        });

        it('test_Paris_getOffsetInfo_fromDST', () => {
            const test = europeParis();
            checkOffset(test, createLDT(2008, 10, 24), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 10, 25), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 10, 26), OFFSET_PTWO, 1);
            checkOffset(test, createLDT(2008, 10, 27), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 28), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 29), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 30), OFFSET_PONE, 1);
            checkOffset(test, createLDT(2008, 10, 31), OFFSET_PONE, 1);
            // cutover at 01:00Z which is 02:00+01:00(local Paris time)
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 1, 59, 59, 999999999), OFFSET_PTWO, 1);
            checkOffset(test, LocalDateTime.of(2008, 10, 26, 3, 0, 0, 0), OFFSET_PONE, 1);
        });

        it('test_Paris_getOffsetInfo_gap', () => {
            const test = europeParis();
            const dateTime = LocalDateTime.of(2008, 3, 30, 2, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_PONE, GAP);
            assertEquals(trans.isGap(), true);
            assertEquals(trans.isOverlap(), false);
            assertEquals(trans.offsetBefore(), OFFSET_PONE);
            assertEquals(trans.offsetAfter(), OFFSET_PTWO);
            assertEquals(trans.instant(), createInstant(2008, 3, 30, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.isValidOffset(OFFSET_ZERO), false);
            assertEquals(trans.isValidOffset(OFFSET_PONE), false);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Gap at 2008-03-30T02:00+01:00 to +02:00]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(OFFSET_PONE)).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });

        it('test_Paris_getOffsetInfo_overlap', () => {
            const test = europeParis();
            const dateTime = LocalDateTime.of(2008, 10, 26, 2, 0, 0, 0);
            const trans = checkOffset(test, dateTime, OFFSET_PTWO, OVERLAP);
            assertEquals(trans.isGap(), false);
            assertEquals(trans.isOverlap(), true);
            assertEquals(trans.offsetBefore(), OFFSET_PTWO);
            assertEquals(trans.offsetAfter(), OFFSET_PONE);
            assertEquals(trans.instant(), createInstant(2008, 10, 26, 1, 0, ZoneOffset.UTC));
            assertEquals(trans.isValidOffset(OFFSET_ZERO), false);
            assertEquals(trans.isValidOffset(OFFSET_PONE), true);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), true);
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(3)), false);
            assertEquals(trans.toString(), 'Transition[Overlap at 2008-10-26T03:00+02:00 to +01:00]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(OFFSET_PTWO)).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });
    });

    describe('America/New_York', () => {

        it('test_NewYork', () => {
            const test = americaNewYork();
            assertEquals(test.isFixedOffset(), false);
        });

        it('test_NewYork_preTimeZones', () => {
            const test = americaNewYork();
            const old = createZDT(1800, 1, 1, ZoneOffset.UTC);
            const instant = old.toInstant();
            const offset = ZoneOffset.of('-04:56:02');
            assertEquals(test.offset(instant), offset);
            checkOffset(test, old.toLocalDateTime(), offset, 1);
        });

        it('test_NewYork_getOffset', () => {
            const test = americaNewYork();
            const offset = ZoneOffset.ofHours(-5);
            assertEquals(test.offset(createInstant(2008, 1, 1, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 2, 1, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 3, 1, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 4, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 5, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 6, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 7, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 8, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 9, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 10, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 11, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 12, 1, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 1, 28, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 2, 28, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 3, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 4, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 5, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 6, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 7, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 8, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 9, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 10, 28, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 11, 28, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 12, 28, offset)), ZoneOffset.ofHours(-5));
        });

        it('test_NewYork_getOffset_toDST', () => {
            const test = americaNewYork();
            const offset = ZoneOffset.ofHours(-5);
            assertEquals(test.offset(createInstant(2008, 3, 8, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 3, 9, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 3, 10, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 3, 11, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 3, 12, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 3, 13, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 3, 14, offset)), ZoneOffset.ofHours(-4));
            // cutover at 02:00 local
            assertEquals(test.offset(createInstant(2008, 3, 9, 1, 59, 59, 999999999, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 3, 9, 2, 0, 0, 0, offset)), ZoneOffset.ofHours(-4));
        });

        it('test_NewYork_getOffset_fromDST', () => {
            const test = americaNewYork();
            const offset = ZoneOffset.ofHours(-4);
            assertEquals(test.offset(createInstant(2008, 11, 1, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 11, 2, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 11, 3, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 11, 4, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 11, 5, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 11, 6, offset)), ZoneOffset.ofHours(-5));
            assertEquals(test.offset(createInstant(2008, 11, 7, offset)), ZoneOffset.ofHours(-5));
            // cutover at 02:00 local
            assertEquals(test.offset(createInstant(2008, 11, 2, 1, 59, 59, 999999999, offset)), ZoneOffset.ofHours(-4));
            assertEquals(test.offset(createInstant(2008, 11, 2, 2, 0, 0, 0, offset)), ZoneOffset.ofHours(-5));
        });

        it('test_NewYork_getOffsetInfo', () => {
            const test = americaNewYork();
            checkOffset(test, createLDT(2008, 1, 1), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 2, 1), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 3, 1), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 4, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 5, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 6, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 7, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 8, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 9, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 10, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 11, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 12, 1), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 1, 28), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 2, 28), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 3, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 4, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 5, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 6, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 7, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 8, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 9, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 10, 28), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 11, 28), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 12, 28), ZoneOffset.ofHours(-5), 1);
        });

        it('test_NewYork_getOffsetInfo_toDST', () => {
            const test = americaNewYork();
            checkOffset(test, createLDT(2008, 3, 8), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 3, 9), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 3, 10), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 3, 11), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 3, 12), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 3, 13), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 3, 14), ZoneOffset.ofHours(-4), 1);
            // cutover at 02:00 local
            checkOffset(test, LocalDateTime.of(2008, 3, 9, 1, 59, 59, 999999999), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, LocalDateTime.of(2008, 3, 9, 3, 0, 0, 0), ZoneOffset.ofHours(-4), 1);
        });

        it('test_NewYork_getOffsetInfo_fromDST', () => {
            const test = americaNewYork();
            checkOffset(test, createLDT(2008, 11, 1), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 11, 2), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, createLDT(2008, 11, 3), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 11, 4), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 11, 5), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 11, 6), ZoneOffset.ofHours(-5), 1);
            checkOffset(test, createLDT(2008, 11, 7), ZoneOffset.ofHours(-5), 1);
            // cutover at 02:00 local
            checkOffset(test, LocalDateTime.of(2008, 11, 2, 0, 59, 59, 999999999), ZoneOffset.ofHours(-4), 1);
            checkOffset(test, LocalDateTime.of(2008, 11, 2, 2, 0, 0, 0), ZoneOffset.ofHours(-5), 1);
        });

        it('test_NewYork_getOffsetInfo_gap', () => {
            const test = americaNewYork();
            const dateTime = LocalDateTime.of(2008, 3, 9, 2, 0, 0, 0);
            const trans = checkOffset(test, dateTime, ZoneOffset.ofHours(-5), GAP);
            assertEquals(trans.isGap(), true);
            assertEquals(trans.isOverlap(), false);
            assertEquals(trans.offsetBefore(), ZoneOffset.ofHours(-5));
            assertEquals(trans.offsetAfter(), ZoneOffset.ofHours(-4));
            assertEquals(trans.instant(), createInstant(2008, 3, 9, 2, 0, ZoneOffset.ofHours(-5)));
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-5)), false);
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-4)), false);
            assertEquals(trans.toString(), 'Transition[Gap at 2008-03-09T02:00-05:00 to -04:00]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(ZoneOffset.ofHours(-5))).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });

        it('test_NewYork_getOffsetInfo_overlap', () => {
            const test = americaNewYork();
            const dateTime = LocalDateTime.of(2008, 11, 2, 1, 0, 0, 0);
            const trans = checkOffset(test, dateTime, ZoneOffset.ofHours(-4), OVERLAP);
            assertEquals(trans.isGap(), false);
            assertEquals(trans.isOverlap(), true);
            assertEquals(trans.offsetBefore(), ZoneOffset.ofHours(-4));
            assertEquals(trans.offsetAfter(), ZoneOffset.ofHours(-5));
            assertEquals(trans.instant(), createInstant(2008, 11, 2, 2, 0, ZoneOffset.ofHours(-4)));
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-1)), false);
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-5)), true);
            assertEquals(trans.isValidOffset(ZoneOffset.ofHours(-4)), true);
            assertEquals(trans.isValidOffset(OFFSET_PTWO), false);
            assertEquals(trans.toString(), 'Transition[Overlap at 2008-11-02T02:00-04:00 to -05:00]');

            expect(trans.equals(null)).to.be.false;
            expect(trans.equals(ZoneOffset.ofHours(-4))).to.be.false;
            expect(trans.equals(trans)).to.be.true;

            const otherTrans = test.transition(dateTime);
            expect(trans.equals(otherTrans)).to.be.true;
            assertEquals(trans.hashCode(), otherTrans.hashCode());
        });
    });

    describe('equals() / hashCode()', () => {

        // ZoneRules has no hashCode() in js-joda, so the hashCode assertions are not ported
        it('test_equals', () => {
            const test1 = europeLondon();
            const test2 = europeParis();
            const test2b = europeParis();
            assertEquals(test1.equals(test2), false);
            assertEquals(test2.equals(test1), false);

            assertEquals(test1.equals(test1), true);
            assertEquals(test2.equals(test2), true);
            assertEquals(test2.equals(test2b), true);
        });

        it('test_equals_null', () => {
            assertEquals(europeLondon().equals(null), false);
        });

        it('test_equals_notZoneRules', () => {
            assertEquals(europeLondon().equals('Europe/London'), false);
        });
    });

    describe('toString()', () => {

        // adapted: js-joda's zone rules return the zone id, not a string containing "ZoneRules"
        it('test_toString', () => {
            assertEquals(europeLondon().toString(), 'Europe/London');
        });
    });
});
