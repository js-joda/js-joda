/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import '../src/js-joda-extra';
import { Interval } from '@js-joda/core';

describe('main test', () => {
    // do not work, because context lives only locally
    it.skip('should add Interval to joda', () => {
        expect(Interval).to.exist;
    });
});

