/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import {ArithmeticException} from '../src/errors';
import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MathUtil} from '../src/MathUtil';

describe('MathUtil', () => {
    describe('intDiv', () => {

        it('testIntDiv', () => {
            testIntDiv(4, 3, 1);
            testIntDiv(3, 3, 1);
            testIntDiv(2, 3, 0);
            testIntDiv(1, 3, 0);
            testIntDiv(0, 3, 0);
            testIntDiv(4, -3, -1);
            testIntDiv(3, -3, -1);
            testIntDiv(2, -3, 0);
            testIntDiv(1, -3, 0);
            testIntDiv(0, -3, 0);
            testIntDiv(-1, 3, 0);
            testIntDiv(-2, 3, 0);
            testIntDiv(-3, 3, -1);
            testIntDiv(-4, 3, -1);
            testIntDiv(-1, -3, 0);
            testIntDiv(-2, -3, 0);
            testIntDiv(-3, -3, 1);
            testIntDiv(-4, -3, 1);
        });

        function testIntDiv(x, y, divExpected) {
            var result = MathUtil.intDiv(x, y);
            expect(result, `testIntDiv: ${x}, ${y}, ${divExpected}`).to.equal(divExpected);
        }
    });

    describe('floorDiv and floorMod methods', () => {

        it('testFloorDivMod', () => {
            testFloorDivMod(4, 3, 1, 1);
            testFloorDivMod(3, 3, 1, 0);
            testFloorDivMod(2, 3, 0, 2);
            testFloorDivMod(1, 3, 0, 1);
            testFloorDivMod(0, 3, 0, 0);
            testFloorDivMod(4, -3, -2, -2);
            testFloorDivMod(3, -3, -1, 0);
            testFloorDivMod(2, -3, -1, -1);
            testFloorDivMod(1, -3, -1, -2);
            testFloorDivMod(0, -3, 0, 0);
            testFloorDivMod(-1, 3, -1, 2);
            testFloorDivMod(-2, 3, -1, 1);
            testFloorDivMod(-3, 3, -1, 0);
            testFloorDivMod(-4, 3, -2, 2);
            testFloorDivMod(-1, -3, 0, -1);
            testFloorDivMod(-2, -3, 0, -2);
            testFloorDivMod(-3, -3, 1, 0);
            testFloorDivMod(-4, -3, 1, -1);

            testFloorDivMod(MAX_SAFE_INTEGER, 1, MAX_SAFE_INTEGER, 0);
            testFloorDivMod(MAX_SAFE_INTEGER, -1, -MAX_SAFE_INTEGER, 0);
            testFloorDivMod(MAX_SAFE_INTEGER, 3, 3002399751580330, 1);
            testFloorDivMod(MAX_SAFE_INTEGER - 1, 3, 3002399751580330, 0);
            testFloorDivMod(MAX_SAFE_INTEGER - 2, 3, 3002399751580329, 2);

            testFloorDivMod(MIN_SAFE_INTEGER + 1, 3, -3002399751580330, 0);
            testFloorDivMod(MIN_SAFE_INTEGER, -1, MAX_SAFE_INTEGER, 0);

            // following test fails because the end of javascript floating point accuracy reached
            //testFloorDivMod(Number.MIN_SAFE_INTEGER, 3, -3002399751580331, 2);

            // TODO research where the boundaries for MIN/ MAX seconds are
            // same test for Instant.MIN_SECONDS
            testFloorDivMod(-31619087596800, 3, -10539695865600, 0);
            testFloorDivMod(-31619087596800 + 1, 3, -10539695865600, 1);
            testFloorDivMod(-31619087596800 + 2, 3, -10539695865600, 2);

            // same test for Instant.MAX_SECONDS
            testFloorDivMod(31494784694400, 3, 10498261564800, 0);
            testFloorDivMod(31494784694400 - 1, 3, 10498261564799, 2);
            testFloorDivMod(31494784694400 - 2, 3, 10498261564799, 1);
        });

        function testFloorDivMod(x, y, divExpected, modExpected) {
            testFloorDiv(x, y, divExpected);
            testFloorMod(x, y, modExpected);
        }

        function testFloorDiv(x, y, divExpected) {
            var result = MathUtil.floorDiv(x, y);
            expect(result, `testFloorDiv: ${x}, ${y}, ${divExpected}`).to.equal(divExpected);
        }

        function testFloorMod(x, y, modExpected) {
            var result = MathUtil.floorMod(x, y);
            expect(result, `testFloorMod: ${x}, ${y}, ${modExpected}`).to.equal(modExpected);
        }


    });

    describe('safeAdd', () => {

        it('testSafeAdd', () => {
            testSafeAdd(1, 1, 2);
            testSafeAdd(Number.MAX_SAFE_INTEGER, 1, ArithmeticException);
            // TODO: fails in phantomjs since MAX_SAFE_INTEGER-1 is NaN :(
            //testSafeAdd(Number.MAX_SAFE_INTEGER-1, 1, Number.MAX_SAFE_INTEGER);
            testSafeAdd(Number.MAX_SAFE_INTEGER-1, 2, ArithmeticException);

        });

        function testSafeAdd(x, y, expected) {
            if (typeof expected === 'function') {
                // expect an error
                expect(() => MathUtil.safeAdd(x, y)).to.throw(expected);
            } else {
                var result = MathUtil.safeAdd(x, y);
                expect(result, `testSafeAdd: ${x}, ${y}, ${expected}`).to.equal(expected);
            }
        }
    });
});
