/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertSame} from './testUtils';

import {Period} from '../src/Period';

describe('org.threeten.bp.TestPeriod', () => {

    describe('factories', () => {
        it('factory_zeroSingleton', () => {
            assertSame(Period.ZERO, Period.ZERO);
            assertSame(Period.of(0, 0, 0), Period.ZERO);
            assertSame(Period.ofYears(0), Period.ZERO);
            assertSame(Period.ofMonths(0), Period.ZERO);
            assertSame(Period.ofDays(0), Period.ZERO);
            new Period(0,0,0);
        });

    });

});