/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { LocalDateTime, ZoneOffset } from 'js-joda';

import { assertEquals } from './testUtils';
import { MomentZoneRulesProvider } from '../src/MomentZoneRulesProvider';

describe('MomentZoneRules', () => {
    const OFFSET_ZERO = ZoneOffset.ofHours(0);
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);

    context('getOffset of Instant', () => {
        const europeLondon = MomentZoneRulesProvider.getRules('Europe/London');
        const europeParis = MomentZoneRulesProvider.getRules('Europe/Paris');

        it('Europe/Paris', () => {
            assertEquals(europeParis.offset(createInstant(1800, 1, 1, 0, 0, ZoneOffset.UTC)), ZoneOffset.ofHoursMinutesSeconds(0, 9, 21));
            assertEquals(europeParis.offset(createInstant(2008, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
            assertEquals(europeParis.offset(createInstant(2008, 4, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(europeParis.offset(createInstant(2008, 10, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PTWO);
            assertEquals(europeParis.offset(createInstant(2008, 11, 1, 0, 0, ZoneOffset.UTC)), OFFSET_PONE);
        });

        it('Europe/London', () => {
            assertEquals(europeLondon.offset(createInstant(1800, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createInstant(2008, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
            assertEquals(europeLondon.offset(createInstant(2800, 1, 1, 0, 0, ZoneOffset.UTC)), OFFSET_ZERO);
        });
    });

    function createInstant(year, month, day, hour, min, zoneOffset) {
        return LocalDateTime.of(year, month, day, hour, min, 0).toInstant(zoneOffset);
    }

});