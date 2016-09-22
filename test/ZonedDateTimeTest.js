/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import './_init';
import {dataProviderTest} from './testUtils';

import {expect} from 'chai';

import {LocalDateTime} from '../src/LocalDateTime';
import {ZonedDateTime} from '../src/ZonedDateTime';
import {ZoneOffset} from '../src/ZoneOffset';
import {SystemDefaultZoneId} from '../src/zone/SystemDefaultZoneId';

import {CurrentStandardZoneEasternTime} from './zone/CurrentStandardZone';
import {CurrentStandardZoneCEST} from './zone/CurrentStandardZone';

/**
 * js-joda tests for use cases that are missing in the treeten bp reference tests
 */
describe('ZonedDateTime', () => {

    const TEST_LOCAL_2016_06_30_11_30_59_500 = LocalDateTime.of(2016, 6, 30, 11, 30, 59, 500);
    const SYSTEM_DEFAULT_ZONE = new SystemDefaultZoneId();
    const EDT_EST = new CurrentStandardZoneEasternTime();
    const CET_CEST = new CurrentStandardZoneCEST();

    describe('ofLocal', () => {

        it('should point to the same point in the timeline for the given zoneIds', () => {

            const ofLocalTestZones = () => {
                return [
                    SYSTEM_DEFAULT_ZONE,
                    ZoneOffset.UTC,
                    EDT_EST,
                    CET_CEST
                ];
            };

            dataProviderTest(ofLocalTestZones, (zone) => {
                let zdt = ZonedDateTime.ofLocal(TEST_LOCAL_2016_06_30_11_30_59_500, zone);
                let utcSameInstant = ZonedDateTime.parse('2016-06-30T11:30:59.000000500Z');
                expect(utcSameInstant.isEqual(zdt));
            });
        });

    });
});
