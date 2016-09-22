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
import {CurrentStandardZoneCentralEuropeanTime} from './zone/CurrentStandardZone';

/**
 * js-joda tests for use cases that are missing in the treeten bp reference tests
 */
describe('ZonedDateTime', () => {

    const LOCAL_DATE_IN_SUMMER = LocalDateTime.of(2016, 6, 30, 11, 30, 59, 500);
    const LOCAL_DATE_IN_WINTER = LocalDateTime.of(2016, 12, 21, 11, 30, 59, 500);

    const SYSTEM_DEFAULT_ZONE = new SystemDefaultZoneId();
    const FIXED_ZONE = new ZoneOffset.ofHours(6);
    const EUROPE_BERLIN = new CurrentStandardZoneCentralEuropeanTime();
    const AMERICA_NEW_YORCK = new CurrentStandardZoneEasternTime();

    describe('ofLocal', () => {

        it('should point to the same point in the timeline for the given zoneIds', () => {

            const testZones = () => {
                return [
                    SYSTEM_DEFAULT_ZONE,
                    ZoneOffset.UTC,
                    EUROPE_BERLIN,
                    AMERICA_NEW_YORCK
                ];
            };

            dataProviderTest(testZones, (zone) => {
                let zdt = ZonedDateTime.ofLocal(LOCAL_DATE_IN_SUMMER, zone);
                let utcSameInstant = ZonedDateTime.parse('2016-06-30T11:30:59.000000500Z');
                expect(utcSameInstant.isEqual(zdt));
            });

        });

        it('should equal in case of a local date with one valid offset at this zone', () => {

            const testLocalToZoneEquality = () => {
                return [
                    [LOCAL_DATE_IN_SUMMER, FIXED_ZONE, '2016-06-30T11:30:59.000000500+06:00'],
                    [LOCAL_DATE_IN_SUMMER, ZoneOffset.UTC, '2016-06-30T11:30:59.000000500Z'],
                    [LOCAL_DATE_IN_SUMMER, EUROPE_BERLIN, '2016-06-30T11:30:59.000000500+02:00[Pseudo/Europe/Berlin]'],
                    [LOCAL_DATE_IN_WINTER, EUROPE_BERLIN, '2016-12-21T11:30:59.000000500+01:00[Pseudo/Europe/Berlin]'],
                    [LOCAL_DATE_IN_SUMMER, AMERICA_NEW_YORCK, '2016-06-30T11:30:59.000000500-04:00[Pseudo/America/New_York]'],
                    [LOCAL_DATE_IN_WINTER, AMERICA_NEW_YORCK, '2016-12-21T11:30:59.000000500-05:00[Pseudo/America/New_York]'],
                ];
            };

            dataProviderTest(testLocalToZoneEquality, (localDateTime, zone, expectedZonedDateAsString) => {
                let zdt = ZonedDateTime.ofLocal(localDateTime, zone);
                expect(zdt.toString()).to.equal(expectedZonedDateAsString);
            });

        });

        it('should add zone offset for a local date with a gap at this zone', () => {

            const testLocalToZoneEquality = () => {
                return [
                    ['2016-03-27T02:00', EUROPE_BERLIN, '2016-03-27T03:00+02:00[Pseudo/Europe/Berlin]'],
                    ['2016-03-27T02:30', EUROPE_BERLIN, '2016-03-27T03:30+02:00[Pseudo/Europe/Berlin]'],
                    ['2016-03-27T03:00', EUROPE_BERLIN, '2016-03-27T03:00+02:00[Pseudo/Europe/Berlin]'],
                    ['2016-03-13T02:00', AMERICA_NEW_YORCK, '2016-03-13T03:00-04:00[Pseudo/America/New_York]'],
                    ['2016-03-13T02:30', AMERICA_NEW_YORCK, '2016-03-13T03:30-04:00[Pseudo/America/New_York]'],
                    ['2016-03-13T03:00', AMERICA_NEW_YORCK, '2016-03-13T03:00-04:00[Pseudo/America/New_York]'],
                ];
            };

            dataProviderTest(testLocalToZoneEquality, (localDateTimeAsString, zone, expectedZonedDateAsString) => {
                let ldt = LocalDateTime.parse(localDateTimeAsString);
                let zdt = ZonedDateTime.ofLocal(ldt, zone);
                expect(zdt.toString()).to.equal(expectedZonedDateAsString);
            });

        });

    });
});
