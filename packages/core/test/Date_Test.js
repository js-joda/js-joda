/*
 * @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import './_init';

import { Instant } from '../src/Instant';
import { Date$ } from '../src/Date_';
import { IllegalArgumentException, NullPointerException } from '../src/errors';

describe('Date$', () => {
    it('.from(Instant) should convert Instant to Date', () => {
        for (const epochMilli of [0, 1000, 60 * 1000, 60 * 1000, 24 * 60 * 60 * 1000]) {
            const instant = Instant.ofEpochMilli(epochMilli);
            const date = Date$.from(instant);
            expect(date).to.be.instanceOf(Date);
            expect(date.getTime()).to.equal(epochMilli);
        }
    });

    it('.from(Instant) should throw IAE when called with !Instant', () => {
        expect(() => Date$.from(0)).to.throw(IllegalArgumentException);
    });

    it('.from(Instant) should throw NPE when called with null or undefined', () => {
        expect(() => Date$.from(null)).to.throw(NullPointerException);
        expect(() => Date$.from(undefined)).to.throw(NullPointerException);
    });

    it('.toInstant(Date) should convert Date to Instant', () => {
        for (const epochMilli of [0, 1000, 60 * 1000, 60 * 1000, 24 * 60 * 60 * 1000]) {
            const date = new Date(epochMilli);
            const instant = Date$.toInstant(date);
            expect(instant).to.be.instanceOf(Instant);
            expect(instant.toEpochMilli()).to.equal(epochMilli);
        }
    });

    it('.toInstant(Date) should throw IAE when called with !Date', () => {
        expect(() => Date$.toInstant(0)).to.throw(IllegalArgumentException);
    });

    it('.toInstant(Date) should throw NPE when called with null or undefined', () => {
        expect(() => Date$.toInstant(null)).to.throw(NullPointerException);
        expect(() => Date$.toInstant(undefined)).to.throw(NullPointerException);
    });
});
