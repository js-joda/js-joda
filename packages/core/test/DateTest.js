/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper & js-joda contributors
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import './_init';

import { Instant } from  '../src/Instant';

describe('Date', () => {
    it('toInstant()', () => {
        expect(new Date(0).toInstant().toEpochMilli()).to.equal(Instant.EPOCH.toEpochMilli());
    });

    it('from(Instant)', () => {
        expect(Date.from(Instant.EPOCH).getTime()).to.equal(new Date(0).getTime());
    });
});
