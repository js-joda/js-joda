/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ZonedDateTime
} from '@js-joda/core';

import { assertEquals } from './testUtils';
import './useMomentZoneRules';


describe('ZonedDateTime', () => {
    it('should parse a formated zdt during dst overlap consistend', function () {
        const zdt = ZonedDateTime.parse('2017-11-05T01:00:00-07:00[America/Los_Angeles]');
        for(let min = 0; min <= 60; min += 15) {
            const overlap = zdt.plusMinutes(min);
            assertEquals(ZonedDateTime.parse(overlap.toString()), overlap);
        }
    });

    it('should parse a formated zdt during dst overlap consistend', function () {
        const zdt = ZonedDateTime.parse('2016-10-30T02:00+02:00[Europe/Berlin]');
        for(let min = 0; min <= 60; min += 15) {
            const overlap = zdt.plusMinutes(min);
            assertEquals(ZonedDateTime.parse(overlap.toString()), overlap);
        }
    });
});

