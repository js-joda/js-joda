/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import './_init';
import {assertEquals, dataProviderTest} from './testUtils';

import {expect} from 'chai';

import {LocalDate} from '../src/LocalDate';
import {LocalDateTime} from '../src/LocalDateTime';
import {MathUtil} from '../src/MathUtil';
import {ZonedDateTime} from '../src/ZonedDateTime';
import {ZoneOffset} from '../src/ZoneOffset';
import {SystemDefaultZoneId} from '../src/zone/SystemDefaultZoneId';

import {ChronoUnit} from '../src/temporal/ChronoUnit';

import {CurrentStandardZoneEasternTime} from './zone/CurrentStandardZone';
import {CurrentStandardZoneCentralEuropeanTime} from './zone/CurrentStandardZone';

/**
 * js-joda tests for use cases that are missing in the treeten bp reference tests
 */
describe('ZonedDateTime', () => {

    const LOCAL_DATE_IN_SUMMER = LocalDateTime.of(2016, 6, 30, 11, 30, 59, 500);
    const LOCAL_DATE_IN_WINTER = LocalDateTime.of(2016, 12, 21, 11, 30, 59, 500);

    const SYSTEM_DEFAULT_ZONE = new SystemDefaultZoneId();
    const FIXED_ZONE_01 = new ZoneOffset.ofHours(1);
    const FIXED_ZONE_02 = new ZoneOffset.ofHours(2);
    const FIXED_ZONE_06 = new ZoneOffset.ofHours(6);
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
                    [LOCAL_DATE_IN_SUMMER, FIXED_ZONE_06, '2016-06-30T11:30:59.000000500+06:00'],
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

        it('should return the previous offset for a local date with an overlap at this zone', () => {

            const testLocalToZoneEquality = () => {
                return [
                    ['2016-10-30T02:00', EUROPE_BERLIN, '2016-10-30T02:00+02:00[Pseudo/Europe/Berlin]'],
                    ['2016-10-30T02:30', EUROPE_BERLIN, '2016-10-30T02:30+02:00[Pseudo/Europe/Berlin]'],
                    ['2016-10-30T03:00', EUROPE_BERLIN, '2016-10-30T03:00+01:00[Pseudo/Europe/Berlin]'],
                    ['2016-11-06T01:00', AMERICA_NEW_YORCK, '2016-11-06T01:00-04:00[Pseudo/America/New_York]'],
                    ['2016-11-06T01:30', AMERICA_NEW_YORCK, '2016-11-06T01:30-04:00[Pseudo/America/New_York]'],
                    ['2016-11-06T02:00', AMERICA_NEW_YORCK, '2016-11-06T02:00-05:00[Pseudo/America/New_York]'],
                ];
            };

            dataProviderTest(testLocalToZoneEquality, (localDateTimeAsString, zone, expectedZonedDateAsString) => {
                let ldt = LocalDateTime.parse(localDateTimeAsString);
                let zdt = ZonedDateTime.ofLocal(ldt, zone);
                expect(zdt.toString()).to.equal(expectedZonedDateAsString);
            });

        });

        it('should return the preferred offset if specified in an overlap situation', () => {

            const testLocalToZoneEquality = () => {
                return [
                    ['2016-10-30T02:30', EUROPE_BERLIN, ZoneOffset.ofHours(1)],
                    ['2016-10-30T02:30', EUROPE_BERLIN, ZoneOffset.ofHours(2)],
                    ['2016-11-06T01:30', AMERICA_NEW_YORCK, ZoneOffset.ofHours(-4)],
                    ['2016-11-06T01:30', AMERICA_NEW_YORCK, ZoneOffset.ofHours(-5)],
                ];
            };

            dataProviderTest(testLocalToZoneEquality, (localDateTimeAsString, zone, preferredOffset) => {
                let ldt = LocalDateTime.parse(localDateTimeAsString);
                let zdt = ZonedDateTime.ofLocal(ldt, zone, preferredOffset);
                expect(zdt.offset()).to.equal(preferredOffset);
            });

        });

    });

    describe('until() with units', () => {

        function provider_until() {
            return [
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.DAYS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.WEEKS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.MONTHS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.YEARS, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.DECADES, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.CENTURIES, 0],
                ['2012-06-30T01:00', '2012-06-30T00:00', ChronoUnit.MILLENNIA, 0],

                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.DAYS, 364],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.WEEKS, 52],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.MONTHS, 11],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.YEARS, 0, -1],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.DECADES, 0],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.CENTURIES, 0],
                ['2012-06-15T01:00', '2013-06-15T00:00', ChronoUnit.MILLENNIA, 0],

                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.NANOS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MICROS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MILLIS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.SECONDS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.MINUTES, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.NANOS, 1000000000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MICROS, 1000000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MILLIS, 1000],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.SECONDS, 1],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.MINUTES, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:00:01', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.NANOS, 60000000000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MICROS, 60000000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MILLIS, 60000],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.SECONDS, 60],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.MINUTES, 1],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.HOURS, 0],
                ['2012-06-15T00:00', '2012-06-15T00:01', ChronoUnit.HALF_DAYS, 0],

                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.499', ChronoUnit.SECONDS, -1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.500', ChronoUnit.SECONDS, -1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:39.501', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.499', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.500', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:40.501', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.499', ChronoUnit.SECONDS, 0],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.500', ChronoUnit.SECONDS, 1],
                ['2012-06-15T12:30:40.500', '2012-06-15T12:30:41.501', ChronoUnit.SECONDS, 1],

                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.499', ChronoUnit.SECONDS, 86400 - 2],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.500', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:39.501', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.499', ChronoUnit.SECONDS, 86400 - 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.500', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:40.501', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.499', ChronoUnit.SECONDS, 86400 + 0],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.500', ChronoUnit.SECONDS, 86400 + 1],
                ['2012-06-15T12:30:40.500', '2012-06-16T12:30:41.501', ChronoUnit.SECONDS, 86400 + 1]
            ];
        }

        it('test_until', function () {
            dataProviderTest(provider_until,test_until);
        });

        // @Test(dataProvider = 'until')
        function test_until(startStr, endStr, unit, expected) {
            // console.log(startStr, endStr, unit.toString(), expected);
            var start = LocalDateTime.parse(startStr).atZone(FIXED_ZONE_01);
            var end = LocalDateTime.parse(endStr).atZone(FIXED_ZONE_01);
            assertEquals(start.until(end, unit), expected);
        }

        it('test_until_reveresed', function () {
            dataProviderTest(provider_until,test_until_reveresed);
        });

        // @Test(dataProvider = 'until')
        function test_until_reveresed(startStr, endStr, unit, expected) {
            // console.log(startStr, endStr, unit.toString(), expected);
            var start = LocalDateTime.parse(startStr).atZone(FIXED_ZONE_01);
            var end = LocalDateTime.parse(endStr).atZone(FIXED_ZONE_01);
            assertEquals(end.until(start, unit), MathUtil.safeZero(-expected));
        }

        function data_until_UTC_CET(){
            return [
                 [LocalDate.of(2016, 1, 1).atStartOfDay(ZoneOffset.UTC), LocalDate.of(2016, 1, 2).atStartOfDay(EUROPE_BERLIN), 23],
                 [LocalDate.of(2016, 1, 1).atStartOfDay(ZoneOffset.UTC), LocalDateTime.of(2016, 1, 2, 1, 0).atZone(EUROPE_BERLIN), 24],
                 [LocalDate.of(2016, 7, 1).atStartOfDay(ZoneOffset.UTC), LocalDate.of(2016, 7, 2).atStartOfDay(EUROPE_BERLIN), 22],
                 [LocalDate.of(2016, 7, 1).atStartOfDay(ZoneOffset.UTC), LocalDateTime.of(2016, 7, 2, 1, 0).atZone(EUROPE_BERLIN), 23],
                 [LocalDate.of(2016, 7, 1).atStartOfDay(ZoneOffset.UTC), LocalDateTime.of(2016, 7, 2, 2, 0).atZone(EUROPE_BERLIN), 24],
                 [LocalDate.of(2016, 7, 1).atStartOfDay(ZoneOffset.UTC), LocalDateTime.of(2016, 7, 2, 3, 0).atZone(EUROPE_BERLIN), 25]
            ];
        }

        it('test_until_UTC_CET_hours', ()=> {
            dataProviderTest(data_until_UTC_CET, (utc, cet, expectedHours) => {
                assertEquals(utc.until(cet, ChronoUnit.HOURS),  expectedHours);
                assertEquals(cet.until(utc, ChronoUnit.HOURS), -expectedHours);
            });
        });

        it('test_until_UTC_CET_days', ()=> {
            dataProviderTest(data_until_UTC_CET, (utc, cet, expectedHours) => {
                var expectedDays = Math.floor(expectedHours / 24);
                assertEquals(utc.until(cet, ChronoUnit.DAYS), expectedDays);
                assertEquals(cet.until(utc, ChronoUnit.DAYS), MathUtil.safeZero(-expectedDays));
            });
        });

    });

    describe('until() with days', ()=>{

        function data_plusDays(){
            return [
                // normal
                [zoneDateTimeOfStrict(2008, 6, 30, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01),
                    0, zoneDateTimeOfStrict(2008, 6, 30, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01)],
                [zoneDateTimeOfStrict(2008, 6, 30, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01),
                    0, zoneDateTimeOfStrict(2008, 7, 1, 23, 30, 58, 0, FIXED_ZONE_01, FIXED_ZONE_01)],
                [zoneDateTimeOfStrict(2008, 6, 30, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01),
                    1, zoneDateTimeOfStrict(2008, 7, 1, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01)],
                [zoneDateTimeOfStrict(2008, 6, 30, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01),
                    -1, zoneDateTimeOfStrict(2008, 6, 29, 23, 30, 59, 0, FIXED_ZONE_01, FIXED_ZONE_01)],
                // skip over gap
                [zoneDateTimeOfStrict(2008, 3, 30, 1, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN),
                    1, zoneDateTimeOfStrict(2008, 3, 31, 1, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN)],
                [zoneDateTimeOfStrict(2008, 3, 30, 3, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN),
                    -1, zoneDateTimeOfStrict(2008, 3, 29, 3, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN)],
                // land in gap
                [zoneDateTimeOfStrict(2008, 3, 29, 2, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN),
                    1, zoneDateTimeOfStrict(2008, 3, 30, 3, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN)],
                [zoneDateTimeOfStrict(2008, 3, 31, 2, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN),
                     0, zoneDateTimeOfStrict(2008, 3, 30, 3, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN)],
                // skip over overlap
                [zoneDateTimeOfStrict(2008, 10, 26, 1, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN),
                    1, zoneDateTimeOfStrict(2008, 10, 27, 1, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN)],
                [zoneDateTimeOfStrict(2008, 10, 25, 3, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN),
                    1, zoneDateTimeOfStrict(2008, 10, 26, 3, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN)],
                // land in overlap
                [zoneDateTimeOfStrict(2008, 10, 25, 2, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN),
                    1, zoneDateTimeOfStrict(2008, 10, 26, 2, 30, 0, 0, FIXED_ZONE_02, EUROPE_BERLIN)],
                [zoneDateTimeOfStrict(2008, 10, 27, 2, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN),
                    -1, zoneDateTimeOfStrict(2008, 10, 26, 2, 30, 0, 0, FIXED_ZONE_01, EUROPE_BERLIN)]
            ];
        }

        it('should calculate the distance for date based days unit', () => {
            dataProviderTest(data_plusDays, (start, expectedDays, end) => {
                expect(start.until(end, ChronoUnit.DAYS)).to.equal(expectedDays);
                expect(end.until(start, ChronoUnit.DAYS)).to.equal(-1 * expectedDays);
            });
        });

    });

});

function zoneDateTimeOfStrict(year, month, dayOfMonth, hour, minute, second, nanoOfSecond, offset, zoneId) {
    return ZonedDateTime.ofStrict(LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, nanoOfSecond), offset, zoneId);
}

