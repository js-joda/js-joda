/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    Instant, LocalDateTime, ZonedDateTime, ZoneId, ZoneOffset
} from 'js-joda';

import { assertEquals, dataProviderTest } from './testUtils';
import './useMomentZoneRules';

import { MomentZoneRulesProvider } from '../src/MomentZoneRulesProvider';

describe('MomentZoneRules', () => {
    const OFFSET_ZERO = ZoneOffset.ofHours(0);
    const OFFSET_PONE = ZoneOffset.ofHours(1);
    const OFFSET_PTWO = ZoneOffset.ofHours(2);

    context('ZoneId.getAvailableZoneIds', () => {
        it('should list some common zone id\'s', () => {
            const availableZoneIds = ZoneId.getAvailableZoneIds();

            expect(availableZoneIds).contain('Australia/Darwin');
            expect(availableZoneIds).contain('America/Argentina/Buenos_Aires');
            expect(availableZoneIds).contain('America/New_York');
            expect(availableZoneIds).contain('Europe/Paris');
            expect(availableZoneIds).contain('Asia/Kolkata');
            expect(availableZoneIds).contain('Asia/Ho_Chi_Minh');

            expect(availableZoneIds).contain('Etc/GMT+0');
            expect(availableZoneIds).contain('Etc/GMT-1');
            expect(availableZoneIds).contain('Etc/GMT+10');
        });
    });

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
            assertEquals(europeParis.offset(createLocalDateTime(2800, 1, 1, 0, 0)), OFFSET_PONE);
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

    describe('ZonedDateTime.parse ZoneRegionId', () => {
        it('should parse iso 8601 date/ time with a zone region id America/New_York', () => {
            const base = ZonedDateTime.parse('2008-01-01T00:00-05:00[America/New_York]');
            assertEquals(base.toLocalDateTime(), LocalDateTime.of(2008, 1, 1, 0, 0));
            assertEquals(base.zone(), ZoneId.of('America/New_York'));
            assertEquals(base.toInstant(), Instant.parse('2008-01-01T05:00:00Z'));
        });

        it('should parse iso 8601 date/ time with a zone region id Europe/Berlin', () => {
            const base = ZonedDateTime.parse('2008-01-01T00:00+01:00[Europe/Berlin]');
            assertEquals(base.toLocalDateTime(), LocalDateTime.of(2008, 1, 1, 0, 0));
            assertEquals(base.zone(), ZoneId.of('Europe/Berlin'));
            assertEquals(base.toInstant(), Instant.parse('2007-12-31T23:00:00Z'));
        });

    });

    describe('ofLocal', () => {
        const LOCAL_DATE_IN_SUMMER = LocalDateTime.of(2016, 6, 30, 11, 30, 59, 500);
        const LOCAL_DATE_IN_WINTER = LocalDateTime.of(2016, 12, 21, 11, 30, 59, 500);

        const FIXED_ZONE_06 = ZoneOffset.ofHours(6);
        const EUROPE_BERLIN = ZoneId.of('Europe/Berlin');
        const AMERICA_NEW_YORCK = ZoneId.of('America/New_York');

        it('should equal in case of a local date with one valid offset at this zone', () => {

            const testLocalToZoneEquality = [
                [LOCAL_DATE_IN_SUMMER, FIXED_ZONE_06, '2016-06-30T11:30:59.000000500+06:00'],
                [LOCAL_DATE_IN_SUMMER, ZoneOffset.UTC, '2016-06-30T11:30:59.000000500Z'],
                [LOCAL_DATE_IN_SUMMER, EUROPE_BERLIN, '2016-06-30T11:30:59.000000500+02:00[Europe/Berlin]'],
                [LOCAL_DATE_IN_WINTER, EUROPE_BERLIN, '2016-12-21T11:30:59.000000500+01:00[Europe/Berlin]'],
                [LOCAL_DATE_IN_SUMMER, AMERICA_NEW_YORCK, '2016-06-30T11:30:59.000000500-04:00[America/New_York]'],
                [LOCAL_DATE_IN_WINTER, AMERICA_NEW_YORCK, '2016-12-21T11:30:59.000000500-05:00[America/New_York]'],
            ];

            dataProviderTest(testLocalToZoneEquality, (localDateTime, zone, expectedZonedDateAsString) => {
                let zdt = ZonedDateTime.ofLocal(localDateTime, zone);
                expect(zdt.toString()).to.equal(expectedZonedDateAsString);
            });

        });

        it('should add zone offset for a local date with a gap at this zone', () => {

            const testLocalToZoneEquality = [
                ['2016-03-27T01:59', EUROPE_BERLIN, '2016-03-27T01:59+01:00[Europe/Berlin]'],
                // ['2016-03-27T02:00', EUROPE_BERLIN, '2016-03-27T03:00+02:00[Europe/Berlin]'],
                ['2016-03-27T02:30', EUROPE_BERLIN, '2016-03-27T03:30+02:00[Europe/Berlin]'],
                // ['2016-03-27T03:00', EUROPE_BERLIN, '2016-03-27T03:00+02:00[Europe/Berlin]']
                ['2016-03-27T03:01', EUROPE_BERLIN, '2016-03-27T03:01+02:00[Europe/Berlin]'],
                ['2016-03-13T01:59', AMERICA_NEW_YORCK, '2016-03-13T01:59-05:00[America/New_York]'],
                // ['2016-03-13T02:00', AMERICA_NEW_YORCK, '2016-03-13T03:00-04:00[America/New_York]'],
                ['2016-03-13T02:30', AMERICA_NEW_YORCK, '2016-03-13T03:30-04:00[America/New_York]'],
                // ['2016-03-13T03:00', AMERICA_NEW_YORCK, '2016-03-13T03:00-04:00[America/New_York]'],
                ['2016-03-13T03:01', AMERICA_NEW_YORCK, '2016-03-13T03:01-04:00[America/New_York]'],
            ];

            dataProviderTest(testLocalToZoneEquality, (localDateTimeAsString, zone, expectedZonedDateAsString) => {
                let ldt = LocalDateTime.parse(localDateTimeAsString);
                let zdt = ZonedDateTime.ofLocal(ldt, zone);
                expect(zdt.toString()).to.equal(expectedZonedDateAsString);
            });

        });

        it('should return the previous offset for a local date with an overlap at this zone', () => {

            const testLocalToZoneEquality = () => {
                return [
                    ['2016-10-30T01:59', EUROPE_BERLIN, '2016-10-30T01:59+02:00[Europe/Berlin]'],
                    // ['2016-10-30T02:00', EUROPE_BERLIN, '2016-10-30T02:00+02:00[Europe/Berlin]'],
                    ['2016-10-30T02:30', EUROPE_BERLIN, '2016-10-30T02:30+02:00[Europe/Berlin]'],
                    // ['2016-10-30T03:00', EUROPE_BERLIN, '2016-10-30T03:00+01:00[Europe/Berlin]'],
                    ['2016-10-30T03:01', EUROPE_BERLIN, '2016-10-30T03:01+01:00[Europe/Berlin]'],
                    ['2016-11-06T00:59', AMERICA_NEW_YORCK, '2016-11-06T00:59-04:00[America/New_York]'],
                    // ['2016-11-06T01:00', AMERICA_NEW_YORCK, '2016-11-06T01:00-04:00[America/New_York]'],
                    ['2016-11-06T01:30', AMERICA_NEW_YORCK, '2016-11-06T01:30-04:00[America/New_York]'],
                    // ['2016-11-06T02:00', AMERICA_NEW_YORCK, '2016-11-06T02:00-05:00[America/New_York]'],
                    ['2016-11-06T02:01', AMERICA_NEW_YORCK, '2016-11-06T02:01-05:00[America/New_York]'],
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

    function createInstant(year, month, day, hour, min, zoneOffset) {
        return LocalDateTime.of(year, month, day, hour, min, 0).toInstant(zoneOffset);
    }

    function createLocalDateTime(year, month, day, hour, min) {
        return LocalDateTime.of(year, month, day, hour, min);
    }

});