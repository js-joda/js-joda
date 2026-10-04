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

import { Instant, ZoneId, ZoneOffset } from '@js-joda/core';

import './useTzdbZoneRules';

describe('TzdbZoneRules daylight saving and transitions', () => {

    const rules = (zone) => ZoneId.of(zone).rules();

    function expectTransition(transition, instant, offsetBefore, offsetAfter) {
        expect(transition.instant().toString()).to.equal(instant);
        expect(transition.offsetBefore().equals(ZoneOffset.of(offsetBefore))).to.be.true;
        expect(transition.offsetAfter().equals(ZoneOffset.of(offsetAfter))).to.be.true;
    }

    describe('Offset transitions only', () => {

        // Africa/Algiers went from WEST (+01:00, daylight saving) to CET (+01:00, standard)
        // at 1977-10-20T23:00:00Z, a period boundary without an offset change
        it('Summer time becomes standard time', () => {
            const algiers = rules('Africa/Algiers');
            expectTransition(algiers.nextTransition(Instant.parse('1977-06-01T00:00:00Z')),
                '1978-03-24T00:00:00Z', '+01:00', '+02:00');
            expectTransition(algiers.previousTransition(Instant.parse('1978-01-01T00:00:00Z')),
                '1977-05-06T00:00:00Z', 'Z', '+01:00');
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
});
