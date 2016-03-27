/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Clock} from '../../src/Clock';
import {MonthDay} from '../../src/MonthDay';

describe('org.threeten.bp.TestMonthDay', () => {
    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', () => {
        it('now', () => {
            let expected = MonthDay.now(Clock.systemDefaultZone());
            let test = MonthDay.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = MonthDay.now(Clock.systemDefaultZone());
                test = MonthDay.now();
            }
            expect(test).to.eql(expected);
        });
    });
});

