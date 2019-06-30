/**
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    LocalDate, LocalDateTime, ZonedDateTime,
    ZoneId,
} from '@js-joda/core';

import { assertEquals } from '../testUtils';
import '../useMomentZoneRules';

describe('org.threeten.bp.TestLocalDate', () => {
    const ZONE_GAZA = ZoneId.of('Asia/Gaza');

    describe('atStartOfDay()', () => {

        it('test_atStartOfDay_dstGap', () => {
            const t = LocalDate.of(2007, 4, 1);
            assertEquals(t.atStartOfDay(ZONE_GAZA),
                ZonedDateTime.of(LocalDateTime.of(2007, 4, 1, 1, 0), ZONE_GAZA));
        });

    });

});

