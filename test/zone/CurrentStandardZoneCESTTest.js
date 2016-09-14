/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../_init';

import {assertEquals, dataProviderTest} from '../testUtils';

import {CurrentStandardZoneCEST} from './CurrentStandardZone';

import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';
import {ZoneOffsetTransition} from '../../src/zone/ZoneOffsetTransition';

describe('CurrentStandardZoneCESTTest', () => {

    const CEST = new CurrentStandardZoneCEST();
    const OFFSET_01 = ZoneOffset.ofHours(1); 
    const OFFSET_02 = ZoneOffset.ofHours(2);

    it('test_rules_offset_of_instant', function () {

        const testData = [
            [Instant.parse('2016-12-21T00:00:00Z'), OFFSET_01],
            [Instant.parse('2016-06-21T00:00:00Z'), OFFSET_02],
            [Instant.parse('2016-03-27T00:59:59Z'), OFFSET_01],
            [Instant.parse('2016-03-27T01:00:00Z'), OFFSET_02],
            [Instant.parse('2016-10-30T00:59:59Z'), OFFSET_02],
            [Instant.parse('2016-10-30T01:00:00Z'), OFFSET_01]
        ];

        dataProviderTest(testData, (instant, offset) => {
            assertEquals(CEST.rules().offset(instant), offset);
        });

    });

    it('test_rules_offset_of_localDateTime', function () {

        const testData = () => {
            return [
                [LocalDateTime.parse('2016-12-21T00:00:00'), OFFSET_01],
                [LocalDateTime.parse('2016-06-21T00:00:00'), OFFSET_02],
                // gap
                [LocalDateTime.parse('2016-03-27T01:59:59'), OFFSET_01],
                [LocalDateTime.parse('2016-03-27T02:00:00'), OFFSET_01],
                [LocalDateTime.parse('2016-03-27T02:30:00'), OFFSET_01],
                [LocalDateTime.parse('2016-03-27T03:00:00'), OFFSET_02],
                [LocalDateTime.parse('2016-03-27T03:01:00'), OFFSET_02],
                // overlap
                [LocalDateTime.parse('2016-10-30T01:59:59'), OFFSET_02],
                [LocalDateTime.parse('2016-10-30T02:00:00'), OFFSET_02],
                [LocalDateTime.parse('2016-10-30T02:30:00'), OFFSET_02],
                [LocalDateTime.parse('2016-10-30T03:00:00'), OFFSET_02],
                [LocalDateTime.parse('2016-10-30T03:01:00'), OFFSET_01],
            ];
        };

        dataProviderTest(testData, (localDateTime, offset) => {
            assertEquals(CEST.rules().offset(localDateTime), offset);
        });
    });

    it('test_rules_isValidOffset', function () {

        const testData = () => {
            return [
                [LocalDateTime.parse('2016-12-21T00:00:00'), OFFSET_01, true ],
                [LocalDateTime.parse('2016-12-21T00:00:00'), OFFSET_02, false],
                [LocalDateTime.parse('2016-06-21T00:00:00'), OFFSET_02, true ],
                [LocalDateTime.parse('2016-06-21T00:00:00'), OFFSET_01, false],

                // gap
                [LocalDateTime.parse('2016-03-27T01:59:59'), OFFSET_01, true ],

                [LocalDateTime.parse('2016-03-27T02:00:00'), OFFSET_01, true ],
                [LocalDateTime.parse('2016-03-27T02:30:00'), OFFSET_01, false ],
                [LocalDateTime.parse('2016-03-27T03:00:00'), OFFSET_01, false],

                [LocalDateTime.parse('2016-03-27T02:00:00'), OFFSET_02, false],
                [LocalDateTime.parse('2016-03-27T02:30:00'), OFFSET_02, false],
                [LocalDateTime.parse('2016-03-27T03:00:00'), OFFSET_02, true ],

                [LocalDateTime.parse('2016-03-27T03:01:00'), OFFSET_02, true ],

                // overlap
                [LocalDateTime.parse('2016-10-30T01:59:59'), OFFSET_02, true ],

                [LocalDateTime.parse('2016-10-30T02:00:00'), OFFSET_02, true ],
                [LocalDateTime.parse('2016-10-30T02:30:00'), OFFSET_02, true ],
                [LocalDateTime.parse('2016-10-30T03:00:00'), OFFSET_02, true ],

                [LocalDateTime.parse('2016-10-30T02:00:00'), OFFSET_01, true ],
                [LocalDateTime.parse('2016-10-30T02:30:00'), OFFSET_01, true ],
                [LocalDateTime.parse('2016-10-30T03:00:00'), OFFSET_01, true ],

                [LocalDateTime.parse('2016-10-30T03:01:00'), OFFSET_01, true ],
            ];
        };

        dataProviderTest(testData, (localDateTime, offset, isValid) => {
            assertEquals(CEST.rules().isValidOffset(localDateTime, offset), isValid);
        });
    });

    it('test_rules_validOffsets', function () {

        const testData = [
               [LocalDateTime.parse('2016-12-21T00:00:00'), [OFFSET_01]],
               [LocalDateTime.parse('2016-06-21T00:00:00'), [OFFSET_02]],
               [LocalDateTime.parse('2016-03-27T02:00:00'), [OFFSET_01]],
               [LocalDateTime.parse('2016-03-27T02:30:00'), []],
               [LocalDateTime.parse('2016-03-27T03:00:00'), [OFFSET_02]],
               [LocalDateTime.parse('2016-10-30T02:00:00'), [OFFSET_01, OFFSET_02]],
               [LocalDateTime.parse('2016-10-30T02:30:00'), [OFFSET_01, OFFSET_02]],
               [LocalDateTime.parse('2016-10-30T03:00:00'), [OFFSET_01, OFFSET_02]],
        ];

        dataProviderTest(testData, (localDateTime, validOffsets) => {
            expect(CEST.rules().validOffsets(localDateTime)).to.deep.have.members(validOffsets);
        });
    });

    it('test_rules_transition', () => {

        const testData = [
               [LocalDateTime.parse('2016-12-21T00:00:00'), null, false, false],
               [LocalDateTime.parse('2016-03-27T02:30:00'),
                   ZoneOffsetTransition.of(LocalDateTime.parse('2016-03-27T02:00:00'), OFFSET_01, OFFSET_02), true, false],
               [LocalDateTime.parse('2016-10-30T02:30:00'),
                   ZoneOffsetTransition.of(LocalDateTime.parse('2016-10-30T02:00:00'), OFFSET_02, OFFSET_01), false, true],
               [LocalDateTime.parse('2016-06-21T00:00:00'), null, false, false]
        ];

        dataProviderTest(testData, (localDateTime, zoneOffsetTransition, isGap, isOverlap) => {
            assertEquals(CEST.rules().transition(localDateTime), zoneOffsetTransition);
            if (zoneOffsetTransition != null) {
                assertEquals(CEST.rules().transition(localDateTime).isGap(), isGap);
                assertEquals(CEST.rules().transition(localDateTime).isOverlap(), isOverlap);
            }
        });
    });

});