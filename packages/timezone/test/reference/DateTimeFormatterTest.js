/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/*
 * Port of the time-zone tests of ThreeTen-Backport's org.threeten.bp.format.TestDateTimeFormatter.
 */
import { ZoneId, ZonedDateTime } from '@js-joda/core';

import { assertEquals } from '../testUtils';
import '../useTzdbZoneRules';

describe('org.threeten.bp.format.TestDateTimeFormatter', () => {

    it('test_parse_allZones', () => {
        for (const zoneStr of ZoneId.getAvailableZoneIds()) {
            const zone = ZoneId.of(zoneStr);
            const base = ZonedDateTime.of(2014, 12, 31, 12, 0, 0, 0, zone);
            const test = ZonedDateTime.parse(base.toString());
            assertEquals(test, base);
        }
    });

});
