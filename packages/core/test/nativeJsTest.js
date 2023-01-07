/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { assertEquals, assertThrows } from './testUtils';

import './_init';

import { nativeJs } from '../src/nativeJs';

import { IllegalArgumentException, NullPointerException } from '../src/errors';
import { ZonedDateTime } from '../src/ZonedDateTime';
import { ZoneOffset } from '../src/ZoneOffset';

describe('nativeJs', () => {
    it('should create a ZonedDateTime from a native js Date instance', () => {
        // ≈ 1970-01-01T00:00Z
        assertEquals(ZonedDateTime.parse('1970-01-01T00:00+00:00'), nativeJs(new Date('1970-01-01T00:00+00:00'), ZoneOffset.ofHours(0)));
        assertEquals(ZonedDateTime.parse('1970-01-01T00:00+00:00'), nativeJs(new Date('1970-01-01T01:00+01:00'), ZoneOffset.ofHours(0)));
        assertEquals(ZonedDateTime.parse('1970-01-01T01:00+01:00'), nativeJs(new Date('1970-01-01T00:00+00:00'), ZoneOffset.ofHours(1)));
        assertEquals(ZonedDateTime.parse('1970-01-01T01:00+01:00'), nativeJs(new Date('1970-01-01T01:00+01:00'), ZoneOffset.ofHours(1)));
        // ≈ 1970-01-01T01:00Z
        assertEquals(ZonedDateTime.parse('1970-01-01T01:00+00:00'), nativeJs(new Date('1970-01-01T01:00+00:00'), ZoneOffset.ofHours(0)));
        assertEquals(ZonedDateTime.parse('1970-01-01T01:00+00:00'), nativeJs(new Date('1970-01-01T02:00+01:00'), ZoneOffset.ofHours(0)));
        assertEquals(ZonedDateTime.parse('1970-01-01T02:00+01:00'), nativeJs(new Date('1970-01-01T01:00+00:00'), ZoneOffset.ofHours(1)));
        assertEquals(ZonedDateTime.parse('1970-01-01T02:00+01:00'), nativeJs(new Date('1970-01-01T02:00+01:00'), ZoneOffset.ofHours(1)));
    });

    it('should create a ZonedDateTime from a moment like instance', () => {
        assertEquals(ZonedDateTime.parse('2023-01-06T22:52+00:00'),
            nativeJs({ toDate: () => new Date('2023-01-06T22:52+00:00') }, ZoneOffset.ofHours(0))
        );
        assertEquals(ZonedDateTime.parse('2023-01-06T22:52+01:00'),
            nativeJs({ toDate: () => new Date('2023-01-06T22:52+01:00') }, ZoneOffset.ofHours(1))
        );
    });

    it('should throw for invalid inputs', () => {
        assertThrows(NullPointerException, () => nativeJs(null));
        assertThrows(NullPointerException, () => nativeJs(new Date(), null));
        assertThrows(IllegalArgumentException, () => nativeJs(new Number(42)));
    });
});
