/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import '../_init';

import {assertEquals, assertTrue, dataProviderTest} from '../testUtils';

import {CurrentCESTZone} from './CurrentCESTZone';

import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';
import {ZoneOffsetTransition} from '../../src/zone/ZoneOffsetTransition';

describe('CurrentCESTZoneTest', () => {
    const CEST = new CurrentCESTZone();

    it('test_rules_offset_of_instant', function () {
        var testData = [
            [Instant.parse('2016-12-21T00:00:00Z'), ZoneOffset.ofHours(1)],
            [Instant.parse('2016-06-21T00:00:00Z'), ZoneOffset.ofHours(2)],
            [Instant.parse('2016-03-27T00:59:59Z'), ZoneOffset.ofHours(1)],
            [Instant.parse('2016-03-27T01:00:00Z'), ZoneOffset.ofHours(2)],
            [Instant.parse('2016-10-30T00:59:59Z'), ZoneOffset.ofHours(2)],
            [Instant.parse('2016-10-30T01:00:00Z'), ZoneOffset.ofHours(1)]
        ];

        dataProviderTest(testData, (instant, offset) => {
            assertEquals(CEST.rules().offset(instant), offset);
        });

    });

    var testData = () => {
        return [
            [LocalDateTime.parse('2016-12-21T00:00:00'), ZoneOffset.ofHours(1)],
            [LocalDateTime.parse('2016-06-21T00:00:00'), ZoneOffset.ofHours(2)],
            // gap
            [LocalDateTime.parse('2016-03-27T01:59:59'), ZoneOffset.ofHours(1)],
            [LocalDateTime.parse('2016-03-27T02:00:00'), ZoneOffset.ofHours(1)],
            [LocalDateTime.parse('2016-03-27T02:30:00'), ZoneOffset.ofHours(1)],
            [LocalDateTime.parse('2016-03-27T03:00:00'), ZoneOffset.ofHours(1)],
            [LocalDateTime.parse('2016-03-27T03:01:00'), ZoneOffset.ofHours(2)],
            // overlap
            [LocalDateTime.parse('2016-10-30T01:59:59'), ZoneOffset.ofHours(2)],
            [LocalDateTime.parse('2016-10-30T02:00:00'), ZoneOffset.ofHours(2)],
            [LocalDateTime.parse('2016-10-30T02:30:00'), ZoneOffset.ofHours(2)],
            [LocalDateTime.parse('2016-10-30T03:00:00'), ZoneOffset.ofHours(2)],
            [LocalDateTime.parse('2016-10-30T03:01:00'), ZoneOffset.ofHours(1)]
        ];
    };

    it('test_rules_offset_of_localDateTime', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertEquals(CEST.rules().offset(localDateTime), offset);
        });

    });

    it('test_rules_isValidOffset', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertTrue(CEST.rules().isValidOffset(localDateTime, offset));
        });

    });

    const test_rules_transition_testData = [
           [LocalDateTime.parse('2016-12-21T00:00:00'), null, false, false],
           [LocalDateTime.parse('2016-03-27T02:30:00'),
               ZoneOffsetTransition.of(LocalDateTime.parse('2016-03-27T02:00:00'), ZoneOffset.ofHours(1), ZoneOffset.ofHours(2)), true, false],
           [LocalDateTime.parse('2016-10-30T02:30:00'),
               ZoneOffsetTransition.of(LocalDateTime.parse('2016-10-30T02:00:00'), ZoneOffset.ofHours(2), ZoneOffset.ofHours(1)), false, true],
           [LocalDateTime.parse('2016-06-21T00:00:00'), null, false, false]
    ]

    it('test_rules_transition', () => {
        test_rules_transition_testData.map((testData) => {
            let [localDateTime, zoneOffsetTransition, isGap, isOverlap] = testData;

            assertEquals(CEST.rules().transition(localDateTime), zoneOffsetTransition);
            if (zoneOffsetTransition != null) {
                assertEquals(CEST.rules().transition(localDateTime).isGap(), isGap);
                assertEquals(CEST.rules().transition(localDateTime).isOverlap(), isOverlap);
            }
        });
    });

});