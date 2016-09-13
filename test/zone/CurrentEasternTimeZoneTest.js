/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import '../_init';

import {assertEquals, assertTrue, dataProviderTest} from '../testUtils';

import {CurrentEasternTimeZone} from './CurrentEasternTimeZone';

import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';
import {ZoneOffsetTransition} from '../../src/zone/ZoneOffsetTransition';

describe('CurrentEasternTimeZoneTest', () => {
    const EDT_EST = new CurrentEasternTimeZone();

    it('test_rules_offset_of_instant', function () {
        var testData = [
            [Instant.parse('2016-12-21T00:00:00Z'), ZoneOffset.ofHours(-5)],
            [Instant.parse('2016-06-21T00:00:00Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-03-13T06:59:59Z'), ZoneOffset.ofHours(-5)],
            [Instant.parse('2016-03-13T07:00:00Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-11-06T06:59:59Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-11-06T07:00:00Z'), ZoneOffset.ofHours(-5)]
        ];

        dataProviderTest(testData, (instant, offset) => {
            assertEquals(EDT_EST.rules().offset(instant), offset);
        });

    });

    var testData = () => {
        return [
            [LocalDateTime.parse('2016-12-21T00:00:00'), ZoneOffset.ofHours(-5)],
            [LocalDateTime.parse('2016-06-21T00:00:00'), ZoneOffset.ofHours(-4)],
            // gap
            [LocalDateTime.parse('2016-03-13T01:59:59'), ZoneOffset.ofHours(-5)],
            [LocalDateTime.parse('2016-03-13T02:00:00'), ZoneOffset.ofHours(-5)],
            [LocalDateTime.parse('2016-03-13T02:30:00'), ZoneOffset.ofHours(-5)],
            [LocalDateTime.parse('2016-03-13T03:00:00'), ZoneOffset.ofHours(-5)],
            [LocalDateTime.parse('2016-03-13T03:01:00'), ZoneOffset.ofHours(-4)],
            // overlap
            [LocalDateTime.parse('2016-11-06T01:59:59'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T02:00:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T02:30:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T03:00:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T03:01:00'), ZoneOffset.ofHours(-5)]
        ];
    };

    it('test_rules_offset_of_localDateTime', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertEquals(EDT_EST.rules().offset(localDateTime), offset);
        });

    });

    it('test_rules_offset_isValidOffset', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertTrue(EDT_EST.rules().isValidOffset(localDateTime, offset));
        });

    });

    const test_rules_transition_testData = [
           [LocalDateTime.parse('2016-12-21T00:00:00'), null, false, false],
           [LocalDateTime.parse('2016-03-13T02:30:00'),
               ZoneOffsetTransition.of(LocalDateTime.parse('2016-03-13T02:00:00'), ZoneOffset.ofHours(-5), ZoneOffset.ofHours(-4)), true, false],
           [LocalDateTime.parse('2016-11-06T02:30:00'),
               ZoneOffsetTransition.of(LocalDateTime.parse('2016-11-06T02:00:00'), ZoneOffset.ofHours(-4), ZoneOffset.ofHours(-5)), false, true],
           [LocalDateTime.parse('2016-06-21T00:00:00'), null, false, false]
    ]

    it('test_rules_transition', () => {
        test_rules_transition_testData.map((testData) => {
            let [localDateTime, zoneOffsetTransition, isGap, isOverlap] = testData;

            assertEquals(EDT_EST.rules().transition(localDateTime), zoneOffsetTransition);
            if (zoneOffsetTransition != null) {
                assertEquals(EDT_EST.rules().transition(localDateTime).isGap(), isGap);
                assertEquals(EDT_EST.rules().transition(localDateTime).isOverlap(), isOverlap);
            }
        });
    });

});
