/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { Interval } from '../src/js-joda-extra';

describe('plugin test', () => {
    it('should export Intervall', () => {
        expect(Interval).to.exist;
    });
});
