/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/*
 * Scenarios of the spec timezone-zone-rules (openspec change add-daylight-saving-zone-rules)
 * that the port of ThreeTen-Backport's TestStandardZoneRules (test/reference/TzdbZoneRulesTest.js)
 * doesn't cover. The expected values were checked with java.time 21.0.12, tzdb 2026b.
 */
import { expect } from 'chai';

import { Duration, Instant, ZoneId, ZoneOffset } from '@js-joda/core';

import rangeData from '../data/packed/latest-10-year-range.json';
import latest from '../src/tzdbData';
import { TzdbZoneRules } from '../src/TzdbZoneRules';
import { unpack } from '../src/unpack';
import './useTzdbZoneRules';

describe('TzdbZoneRules daylight saving and transitions', () => {

    const rules = (zone) => ZoneId.of(zone).rules();

    function expectTransition(transition, instant, offsetBefore, offsetAfter) {
        expect(transition.instant().toString()).to.equal(instant);
        expect(transition.offsetBefore().equals(ZoneOffset.of(offsetBefore))).to.be.true;
        expect(transition.offsetAfter().equals(ZoneOffset.of(offsetAfter))).to.be.true;
    }

    function expectStandardOffset(zone, instant, expected) {
        expect(rules(zone).standardOffset(Instant.parse(instant)).toString()).to.equal(expected);
    }

    function expectDaylightSavings(zone, instant, duration, isDaylightSavings) {
        const zoneRules = rules(zone);
        expect(zoneRules.daylightSavings(Instant.parse(instant)).equals(Duration.parse(duration))).to.be.true;
        if (isDaylightSavings != null) {
            expect(zoneRules.isDaylightSavings(Instant.parse(instant))).to.equal(isDaylightSavings);
        }
    }

    describe('Standard offset', () => {

        it('Summer time', () => {
            expectStandardOffset('Europe/Berlin', '2026-07-01T00:00:00Z', '+01:00');
        });

        it('Winter time', () => {
            expectStandardOffset('Europe/Berlin', '2026-01-15T00:00:00Z', '+01:00');
        });

        it('Double summer time', () => {
            expectStandardOffset('Europe/London', '1941-06-01T00:00:00Z', 'Z');
        });

        it('Standard offset changed together with the start of daylight saving', () => {
            expectStandardOffset('Europe/Moscow', '1991-06-01T00:00:00Z', '+02:00');
        });

        it('Standard offset changed during double summer time', () => {
            expectStandardOffset('Europe/Paris', '1944-09-01T00:00:00Z', 'Z');
        });

        it('Standard offset changed without daylight saving', () => {
            expectStandardOffset('Europe/Moscow', '2012-07-01T00:00:00Z', '+04:00');
        });
    });

    describe('Daylight saving amount', () => {

        it('One hour in summer', () => {
            expectDaylightSavings('Europe/Berlin', '2026-07-01T00:00:00Z', 'PT1H', true);
        });

        it('Zero in winter', () => {
            expectDaylightSavings('Europe/Berlin', '2026-01-15T00:00:00Z', 'PT0S', false);
        });

        it('Two hours of double summer time', () => {
            expectDaylightSavings('Europe/Berlin', '1945-06-01T00:00:00Z', 'PT2H');
        });

        it('Daylight saving after a standard offset change', () => {
            expectDaylightSavings('Europe/Moscow', '1991-06-01T00:00:00Z', 'PT1H', true);
        });

        it('Half an hour', () => {
            expectDaylightSavings('Australia/Lord_Howe', '2026-01-15T00:00:00Z', 'PT30M');
        });

        it('Zone without current daylight saving', () => {
            expect(rules('Asia/Tokyo').isDaylightSavings(Instant.parse('2026-07-01T00:00:00Z'))).to.be.false;
        });
    });

    describe('Offset transitions only', () => {

        // Africa/Algiers went from WEST (+01:00, daylight saving) to CET (+01:00, standard)
        // at 1977-10-20T23:00:00Z, a period boundary without an offset change
        it('Summer time becomes standard time', () => {
            const algiers = rules('Africa/Algiers');
            expectTransition(algiers.nextTransition(Instant.parse('1977-06-01T00:00:00Z')),
                '1978-03-24T00:00:00Z', '+01:00', '+02:00');
            expectTransition(algiers.previousTransition(Instant.parse('1978-01-01T00:00:00Z')),
                '1977-05-06T00:00:00Z', 'Z', '+01:00');
            expectStandardOffset('Africa/Algiers', '1977-06-01T00:00:00Z', 'Z');
            expectStandardOffset('Africa/Algiers', '1977-12-01T00:00:00Z', '+01:00');
        });
    });

    describe('Next and previous transition', () => {

        it('Next spring transition', () => {
            expectTransition(rules('Europe/Berlin').nextTransition(Instant.parse('2026-01-01T00:00:00Z')),
                '2026-03-29T01:00:00Z', '+01:00', '+02:00');
        });

        it('Previous autumn transition', () => {
            expectTransition(rules('Europe/Berlin').previousTransition(Instant.parse('2026-01-01T00:00:00Z')),
                '2025-10-26T01:00:00Z', '+02:00', '+01:00');
        });

        it('Instant exactly at a transition', () => {
            const berlin = rules('Europe/Berlin');
            const instant = Instant.parse('2026-03-29T01:00:00Z');
            expectTransition(berlin.nextTransition(instant), '2026-10-25T01:00:00Z', '+02:00', '+01:00');
            expectTransition(berlin.previousTransition(instant), '2025-10-26T01:00:00Z', '+02:00', '+01:00');
        });

        it('No later transition', () => {
            expect(rules('Africa/Abidjan').nextTransition(Instant.parse('2026-01-01T00:00:00Z'))).to.be.null;
        });

        it('No earlier transition', () => {
            expect(rules('Africa/Abidjan').previousTransition(Instant.parse('1900-01-01T00:00:00Z'))).to.be.null;
        });
    });

    describe('Transition list and transition rules not supported', () => {

        it('Transition list', () => {
            expect(() => rules('Europe/Berlin').transitions()).to.throw(Error, 'not supported: ZoneRules.transitions');
        });

        it('Transition rules', () => {
            expect(() => rules('America/New_York').transitionRules())
                .to.throw(Error, 'not supported: ZoneRules.transitionRules');
        });

        it('Iterating transitions instead', () => {
            const berlin = rules('Europe/Berlin');
            const end = Instant.parse('2027-01-01T00:00:00Z');
            const instants = [];
            let transition = berlin.nextTransition(Instant.parse('2026-01-01T00:00:00Z'));
            for (;;) {
                instants.push(transition.instant().toString());
                if (transition.instant().isAfter(end)) {
                    break;
                }
                transition = berlin.nextTransition(transition.instant());
            }
            expect(instants).to.eql(['2026-03-29T01:00:00Z', '2026-10-25T01:00:00Z', '2027-03-28T01:00:00Z']);
        });
    });

    describe('Data without standard offsets', () => {
        const packedBerlin = latest.zones.find((zone) => zone.startsWith('Europe/Berlin|'));
        // the packed fields 0-6 and 0-5: the format before standard offsets, and moment-timezone's
        const withoutField7 = new TzdbZoneRules(unpack(packedBerlin.split('|').slice(0, 7).join('|')));
        const momentFormat = new TzdbZoneRules(unpack(packedBerlin.split('|').slice(0, 6).join('|')));
        const summer = Instant.parse('2026-07-01T00:00:00Z');
        const message = 'The tz data of zone Europe/Berlin has no standard offsets';

        it('Data with daylight saving flags but without standard offsets', () => {
            expect(() => withoutField7.standardOffset(summer)).to.throw(Error, message);
            expect(() => withoutField7.daylightSavings(summer)).to.throw(Error, message);
            expect(() => withoutField7.isDaylightSavings(summer)).to.throw(Error, message);
            expect(withoutField7.offsetOfInstant(summer).toString()).to.equal('+02:00');
            expectTransition(withoutField7.nextTransition(summer), '2026-10-25T01:00:00Z', '+02:00', '+01:00');
        });

        it('Data in the moment-timezone packed format', () => {
            expect(() => momentFormat.isDaylightSavings(summer)).to.throw(Error, message);
            expectTransition(momentFormat.nextTransition(summer), '2026-10-25T01:00:00Z', '+02:00', '+01:00');
        });
    });

    describe('Reduced bundle', () => {
        // a TzdbZoneRules from the 10-year range data (2021-2031), in which Europe/Berlin is a link
        // to Africa/Ceuta; test/useTzdbZoneRules.js loads the full data into the global provider
        const link = rangeData.links.find((l) => l.endsWith('|Europe/Berlin'));
        const leader = link != null ? link.split('|')[0] : 'Europe/Berlin';
        const reduced = new TzdbZoneRules(unpack(rangeData.zones.find((zone) => zone.startsWith(`${leader}|`))));
        const full = rules('Europe/Berlin');

        it('answers like the full data inside its range', () => {
            for (const text of ['2026-01-01T00:00:00Z', '2026-01-15T00:00:00Z', '2026-03-29T01:00:00Z',
                '2026-07-01T00:00:00Z', '2026-10-25T00:59:59Z', '2026-12-31T23:59:59Z']) {
                const instant = Instant.parse(text);
                expect(reduced.standardOffset(instant).equals(full.standardOffset(instant)), text).to.be.true;
                expect(reduced.daylightSavings(instant).equals(full.daylightSavings(instant)), text).to.be.true;
                expect(reduced.isDaylightSavings(instant), text).to.equal(full.isDaylightSavings(instant));
                expect(reduced.nextTransition(instant).equals(full.nextTransition(instant)), text).to.be.true;
                expect(reduced.previousTransition(instant).equals(full.previousTransition(instant)), text).to.be.true;
            }
        });
    });

    describe('Offsets with seconds', () => {
        // local mean time offsets whose seconds, stored as a base 60 fraction of minutes, don't
        // multiply back to whole seconds in floating point (e.g. 65.35 * 60 = 3920.9999...)
        [
            ['Europe/Vienna', '1850-01-01T00:00:00Z', '+01:05:21', '1893-03-31T22:54:39Z', '+01:00'],
            ['America/Noronha', '1900-01-01T00:00:00Z', '-02:09:40', '1914-01-01T02:09:40Z', '-02:00'],
            ['Atlantic/Madeira', '1900-01-01T00:00:00Z', '-01:07:36', '1912-01-01T01:00:00Z', '-01:00'],
            ['Pacific/Palau', '1880-01-01T00:00:00Z', '+08:57:56', '1900-12-31T15:02:04Z', '+09:00'],
            ['America/Juneau', '1880-01-01T00:00:00Z', '-08:57:41', '1900-08-20T20:57:41Z', '-08:00'],
            ['America/Argentina/La_Rioja', '1880-01-01T00:00:00Z', '-04:27:24', '1894-10-31T04:27:24Z', '-04:16:48'],
            ['America/Argentina/San_Luis', '1880-01-01T00:00:00Z', '-04:25:24', '1894-10-31T04:25:24Z', '-04:16:48'],
            ['America/Metlakatla', '1880-01-01T00:00:00Z', '-08:46:18', '1900-08-20T20:46:18Z', '-08:00'],
            ['Pacific/Gambier', '1900-01-01T00:00:00Z', '-08:59:48', '1912-10-01T08:59:48Z', '-09:00'],
        ].forEach(([zone, instant, offset, nextInstant, nextOffset]) => {
            it(`${zone} at ${instant}`, () => {
                expect(rules(zone).offset(Instant.parse(instant)).toString()).to.equal(offset);
                expectStandardOffset(zone, instant, offset);
                expectTransition(rules(zone).nextTransition(Instant.parse(instant)), nextInstant, offset, nextOffset);
            });
        });
    });

    describe('Instant.MIN and Instant.MAX', () => {
        const berlin = rules('Europe/Berlin');

        it('Instant.MAX is after the last transition', () => {
            expect(berlin.offset(Instant.MAX).toString()).to.equal('+01:00');
            expect(berlin.standardOffset(Instant.MAX).toString()).to.equal('+01:00');
            expect(berlin.daylightSavings(Instant.MAX).equals(Duration.ZERO)).to.be.true;
            expect(berlin.isDaylightSavings(Instant.MAX)).to.equal(false);
            expect(berlin.nextTransition(Instant.MAX)).to.equal(null);
            // java.time continues the transition rules up to the year 999999999,
            // the tz data ends with the last transition of 2499
            expectTransition(berlin.previousTransition(Instant.MAX), '2499-10-25T01:00:00Z', '+02:00', '+01:00');
        });

        it('Instant.MIN is before the first transition', () => {
            expect(berlin.offset(Instant.MIN).toString()).to.equal('+00:53:28');
            expect(berlin.standardOffset(Instant.MIN).toString()).to.equal('+00:53:28');
            expect(berlin.isDaylightSavings(Instant.MIN)).to.equal(false);
            expectTransition(berlin.nextTransition(Instant.MIN), '1893-03-31T23:06:32Z', '+00:53:28', '+01:00');
            expect(berlin.previousTransition(Instant.MIN)).to.equal(null);
        });

        it('a fixed offset zone', () => {
            const fixed = rules('Etc/GMT-2');
            for (const instant of [Instant.MIN, Instant.MAX]) {
                expect(fixed.offset(instant).toString()).to.equal('+02:00');
                expect(fixed.standardOffset(instant).toString()).to.equal('+02:00');
                expect(fixed.nextTransition(instant)).to.equal(null);
                expect(fixed.previousTransition(instant)).to.equal(null);
            }
        });
    });
});
