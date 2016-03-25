/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Year} from '../../src/Year';
import {Clock} from '../../src/Clock';

describe('org.threeten.bp.temporal.TestYear', () => {
    const TEST_2008 = Year.of(2008);

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    it('now', () => {
        let expected = Year.now(Clock.systemDefaultZone());
        let test = Year.now();
        for (let i = 0; i < 100; i++) {
            if (expected.equals(test)) {
                return;
            }
            expected = Year.now(Clock.systemDefaultZone());
            test = Year.now();
        }
        expect(test).to.eql(expected);
    });
});