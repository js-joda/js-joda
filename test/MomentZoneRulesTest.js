/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    LocalDateTime, ZoneId, ZoneOffset
} from 'js-joda';

import { assertEquals } from './testUtils';
import './useMomentZoneRules';

import { MomentZoneRulesProvider } from '../src/MomentZoneRulesProvider';

describe('MomentZoneRules', () => {
    const OFFSET_ZERO = ZoneOffset.ofHours(0);
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);

    context('getOffset of Instant', () => {
        const europeLondon = MomentZoneRulesProvider.getRules('Europe/London');
        const europeParis = MomentZoneRulesProvider.getRules('Europe/Paris');

        it('Europe/Paris', () => {
            assertEquals(
                europeParis.offset(createInstant(1800, 1, 1, 0, 0, ZoneOffset.UTC)),
                ZoneOffset.ofHoursMinutesSeconds(0, 9, 21));
            assertEquals(
                europeParis.offset(createInstant(2008, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(
                europeParis.offset(createInstant(2008, 4, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(
                europeParis.offset(createInstant(2008, 10, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(
                europeParis.offset(createInstant(2008, 11, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('Europe/London', () => {
            assertEquals(europeLondon.offset(createInstant(1800, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createInstant(2008, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createInstant(2008, 4, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(europeLondon.offset(createInstant(2008, 11, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createInstant(2800, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
        });
    });

    context('getOffset of LocalDateTime', () => {
        const europeLondon = MomentZoneRulesProvider.getRules('Europe/London');
        const europeParis = MomentZoneRulesProvider.getRules('Europe/Paris');

        it('Europe/Paris', () => {
            assertEquals(europeParis.offset(createLocalDateTime(1800, 1, 1, 0, 0)),
                ZoneOffset.ofHoursMinutesSeconds(0, 9, 21));
            assertEquals(europeParis.offset(createLocalDateTime(2008, 1, 1, 0, 0)), OFFSET_PONE);
            assertEquals(europeParis.offset(createLocalDateTime(2008, 4, 1, 0, 0)), OFFSET_PTWO);
            assertEquals(europeParis.offset(createLocalDateTime(2008, 10, 1, 0, 0)), OFFSET_PTWO);
            assertEquals(europeParis.offset(createLocalDateTime(2008, 11, 1, 0, 0)), OFFSET_PONE);
        });

        it('Europe/London', () => {
            assertEquals(europeLondon.offset(createLocalDateTime(1800, 1, 1, 0, 0)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createLocalDateTime(2008, 1, 1, 0, 0)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createLocalDateTime(2008, 4, 1, 0, 0)), OFFSET_PONE);
            assertEquals(europeLondon.offset(createLocalDateTime(2008, 11, 1, 0, 0)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createLocalDateTime(2800, 1, 1, 0, 0)), OFFSET_ZERO);
        });
    });

    context('withZoneSameLocal', () => {
        it('retain offset Europe/Paris', () => {
            const baseZdt = createLocalDateTime(2008, 1, 1, 0, 0).atZone(ZoneId.of('UTC+01:00'));
            const testZdt = baseZdt.withZoneSameLocal(ZoneId.of('Europe/Paris'));
            assertEquals(baseZdt.offset(), ZoneOffset.ofHours(1));
            assertEquals(testZdt.offset(), ZoneOffset.ofHours(1));
            assertEquals(testZdt.toLocalDateTime(), createLocalDateTime(2008, 1, 1, 0, 0));
        });

        it('change offset Europe/Paris', () => {
            const baseZdt = createLocalDateTime(2008, 1, 1, 0, 0).atZone(ZoneId.of('UTC-04:00'));
            const testZdt = baseZdt.withZoneSameLocal(ZoneId.of('Europe/Paris'));
            assertEquals(baseZdt.offset(), ZoneOffset.ofHours(-4));
            assertEquals(testZdt.offset(), ZoneOffset.ofHours(1));
            assertEquals(testZdt.toLocalDateTime(), createLocalDateTime(2008, 1, 1, 0, 0));
        });

        it('retain offset America/New_York', () => {
            const baseZdt = createLocalDateTime(2008, 1, 1, 0, 0).atZone(ZoneId.of('UTC-05:00'));
            const testZdt = baseZdt.withZoneSameLocal(ZoneId.of('America/New_York'));
            assertEquals(baseZdt.offset(), ZoneOffset.ofHours(-5));
            assertEquals(testZdt.offset(), ZoneOffset.ofHours(-5));
            assertEquals(testZdt.toLocalDateTime(), createLocalDateTime(2008, 1, 1, 0, 0));
        });

        it('change offset America/New_York', () => {
            const baseZdt = createLocalDateTime(2008, 1, 1, 0, 0).atZone(ZoneId.of('UTC+01:00'));
            const testZdt = baseZdt.withZoneSameLocal(ZoneId.of('America/New_York'));
            assertEquals(baseZdt.offset(), ZoneOffset.ofHours(1));
            assertEquals(testZdt.offset(), ZoneOffset.ofHours(-5));
            assertEquals(testZdt.toLocalDateTime(), createLocalDateTime(2008, 1, 1, 0, 0));
        });
    });


    function createInstant(year, month, day, hour, min, zoneOffset) {
        return LocalDateTime.of(year, month, day, hour, min, 0).toInstant(zoneOffset);
    }

    function createLocalDateTime(year, month, day, hour, min) {
        return LocalDateTime.of(year, month, day, hour, min);
    }

});