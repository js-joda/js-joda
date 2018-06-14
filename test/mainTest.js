/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import '../src/js-joda-extra';
import { Interval } from 'js-joda';

describe('main test', () => {
    it.skip('should add Interval to joda', () => {
        // we have to import Interval from js-joda-extra from now on
        expect(Interval).to.exist;
    });
});

