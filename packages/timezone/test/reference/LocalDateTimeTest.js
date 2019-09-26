/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    Instant, LocalDateTime, ZonedDateTime,
    ZoneId, ZoneOffset,
    NullPointerException
} from '@js-joda/core';

import { assertEquals } from '../testUtils';
import '../useMomentZoneRules';

describe('org.threeten.bp.TestLocalDateTime', () => {

    const OFFSET_PTWO = ZoneOffset.ofHours(2);
    const EUROPE_BERLIN = ZoneId.of('Europe/Berlin');
    const ZONE_GAZA = ZoneId.of('Asia/Gaza');

    describe('ofInstant()', () => {

        it('factory_ofInstant_zone()', () => {
            const test = LocalDateTime.ofInstant(Instant.ofEpochSecond(1451606400 + 86400 + 3600 + 120 + 4, 500), EUROPE_BERLIN);
            assertEquals(test, LocalDateTime.of(2016, 1, 2, 2, 2, 4, 500));  // offset +01:00
        });

        it('factory_ofInstant_nullInstant', () => {
            expect(() => {
                LocalDateTime.ofInstant(null, EUROPE_BERLIN);
            }).to.throw(NullPointerException);
        });

    });

    describe('atZone()', () => {

        it('test_atZone', () => {
            const t = LocalDateTime.of(2008, 6, 30, 11, 30);
            assertEquals(t.atZone(EUROPE_BERLIN),
                ZonedDateTime.of(LocalDateTime.of(2008, 6, 30, 11, 30), EUROPE_BERLIN));
        });

        it('test_atZone_Offset', () => {
            const t = LocalDateTime.of(2008, 6, 30, 11, 30);
            assertEquals(t.atZone(OFFSET_PTWO), ZonedDateTime.of(LocalDateTime.of(2008, 6, 30, 11, 30), OFFSET_PTWO));
        });

        it('test_atZone_dstGap', () => {
            const t = LocalDateTime.of(2007, 4, 1, 0, 0);
            assertEquals(t.atZone(ZONE_GAZA),
                ZonedDateTime.of(LocalDateTime.of(2007, 4, 1, 1, 0), ZONE_GAZA));
        });

        it('test_atZone_dstOverlap', () => {
            const t = LocalDateTime.of(2007, 10, 28, 2, 30);
            assertEquals(t.atZone(EUROPE_BERLIN),
                ZonedDateTime.ofStrict(LocalDateTime.of(2007, 10, 28, 2, 30), OFFSET_PTWO, EUROPE_BERLIN));
        });

        it('test_atZone_nullTimeZone', () => {
            expect(() => {
                const t = LocalDateTime.of(2008, 6, 30, 11, 30);
                t.atZone(null);
            }).to.throw(NullPointerException);
        });

    });

});
