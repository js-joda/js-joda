/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import '../_init';

import {assertEquals, assertTrue, dataProviderTest} from '../testUtils';

import {CurrentAtlanticTimeZone} from './CurrentAtlanticTimeZone';

import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('CurrentAtlanticTimeZoneTest', () => {
    const ADT_AST = new CurrentAtlanticTimeZone();

    it('test_offset_of_instant', function () {
        var testData = [
            [Instant.parse('2016-12-21T00:00:00Z'), ZoneOffset.ofHours(-3)],
            [Instant.parse('2016-06-21T00:00:00Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-03-13T05:59:59Z'), ZoneOffset.ofHours(-3)],
            [Instant.parse('2016-03-13T06:00:00Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-11-06T05:59:59Z'), ZoneOffset.ofHours(-4)],
            [Instant.parse('2016-11-06T06:00:00Z'), ZoneOffset.ofHours(-3)]
        ];

        dataProviderTest(testData, (instant, offset) => {
            assertEquals(ADT_AST.rules().offset(instant), offset);
        });

    });

    var testData = () => {
        return [
            [LocalDateTime.parse('2016-12-21T00:00:00'), ZoneOffset.ofHours(-3)],
            [LocalDateTime.parse('2016-06-21T00:00:00'), ZoneOffset.ofHours(-4)],
            // gap
            [LocalDateTime.parse('2016-03-13T01:59:59'), ZoneOffset.ofHours(-3)],
            [LocalDateTime.parse('2016-03-13T02:00:00'), ZoneOffset.ofHours(-3)],
            [LocalDateTime.parse('2016-03-13T02:30:00'), ZoneOffset.ofHours(-3)],
            [LocalDateTime.parse('2016-03-13T03:00:00'), ZoneOffset.ofHours(-3)],
            [LocalDateTime.parse('2016-03-13T03:01:00'), ZoneOffset.ofHours(-4)],
            // overlap
            [LocalDateTime.parse('2016-11-06T01:59:59'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T02:00:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T02:30:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T03:00:00'), ZoneOffset.ofHours(-4)],
            [LocalDateTime.parse('2016-11-06T03:01:00'), ZoneOffset.ofHours(-3)]
        ];
    };

    it('test_offset_of_localDateTime', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertEquals(ADT_AST.rules().offset(localDateTime), offset);
        });

    });

    it('test_offset_isValidOffset', function () {
        dataProviderTest(testData, (localDateTime, offset) => {
            assertTrue(ADT_AST.rules().isValidOffset(localDateTime, offset));
        });

    });

});