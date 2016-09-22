/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import './_init';

import {expect} from 'chai';

import {LocalDateTime} from '../src/LocalDateTime';
import {ZonedDateTime} from '../src/ZonedDateTime';
import {SystemDefaultZoneId} from '../src/zone/SystemDefaultZoneId';

/**
 * js-joda tests for use cases that are missing in the treeten bp reference tests
 */
describe('ZonedDateTime', () => {
    const TEST_LOCAL_2016_06_30_11_30_59_500 = LocalDateTime.of(2016, 6, 30, 11, 30, 59, 500);
    const SYSTEM_DEFAULT_ZONE = new SystemDefaultZoneId();

    describe('ofLocal', () => {

        it('should point to the same point in the timeline with the SystemDefaultTimeZone as the UTC Zone', () => {
            let zdt = ZonedDateTime.ofLocal(TEST_LOCAL_2016_06_30_11_30_59_500, SYSTEM_DEFAULT_ZONE);
            let utcSameInstant = ZonedDateTime.parse('2016-06-30T11:30:59.000000500Z');
            expect(utcSameInstant.isEqual(zdt));
        });

    });
});
