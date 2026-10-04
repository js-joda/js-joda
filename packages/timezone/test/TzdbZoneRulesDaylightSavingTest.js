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
});
