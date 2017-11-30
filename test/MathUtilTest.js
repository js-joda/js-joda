/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import {ArithmeticException} from '../src/errors';
import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MathUtil} from '../src/MathUtil';

describe('MathUtil', () => {
    describe('div/ mod', () => {

        it('testIntDivMod', () => {
            testIntDivMod(4, 3, 1  , 1 );
            testIntDivMod(3, 3, 1  , 0 );
            testIntDivMod(2, 3, 0  , 2 );
            testIntDivMod(1, 3, 0  , 1 );
            testIntDivMod(0, 3, 0  , 0 );
            testIntDivMod(4, -3, -1, 1 );
            testIntDivMod(3, -3, -1, 0 );
            testIntDivMod(2, -3, 0 , 2 );
            testIntDivMod(1, -3, 0 , 1 );
            testIntDivMod(0, -3, 0 , 0 );
            testIntDivMod(-1, 3, 0 , -1);
            testIntDivMod(-2, 3, 0 , -2);
            testIntDivMod(-3, 3, -1, 0 );
            testIntDivMod(-4, 3, -1, -1);
            testIntDivMod(-1, -3, 0, -1);
            testIntDivMod(-2, -3, 0, -2);
            testIntDivMod(-3, -3, 1, 0 );
            testIntDivMod(-4, -3, 1, -1);
        });

        function testIntDivMod(x, y, divExpected, modExpected) {
            const resultDiv = MathUtil.intDiv(x, y);
            const resultMod = MathUtil.intMod(x, y);
            expect(resultDiv, `testIntDiv: ${x}, ${y}, ${divExpected}`).to.eql(divExpected);
            expect(resultMod, `testIntMod: ${x}, ${y}, ${modExpected}`).to.eql(modExpected);
        }

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
            const result = MathUtil.floorDiv(x, y);
            expect(result, `testFloorDiv: ${x}, ${y}, ${divExpected}`).to.eql(divExpected);
        }

        function testFloorMod(x, y, modExpected) {
            const result = MathUtil.floorMod(x, y);
            expect(result, `testFloorMod: ${x}, ${y}, ${modExpected}`).to.eql(modExpected);
        }


    });

    describe('safeAdd/Subtract/Multiply', () => {

        it('testSafeAdd', () => {
            testSafeAddValid(1, 1, 2);
            testSafeAddValid(0, -0, 0);
            testSafeAddValid(-0, 0, 0);
            testSafeAddValid(MAX_SAFE_INTEGER-1, 1, MAX_SAFE_INTEGER);

            testSafeAddInvalid(MAX_SAFE_INTEGER, 1);
            testSafeAddInvalid(MAX_SAFE_INTEGER-1, 2);
            testSafeAddInvalid(null, 2);
            testSafeAddInvalid(2, null);

            function testSafeAddValid(x, y, expected) {
                const result = MathUtil.safeAdd(x, y);
                expect(result, `testSafeAdd: ${x}, ${y}, ${expected}`).to.eql(expected);
            }

            function testSafeAddInvalid(x, y) {
                expect(() => MathUtil.safeAdd(x, y)).to.throw(ArithmeticException);
            }
        });

        it('safeSubtract', function () {
            testSafeSubtractValid(1, 2, -1);
            testSafeSubtractValid(-0, 0, 0);
            testSafeSubtractValid(0, -0, 0);
            testSafeSubtractValid(MIN_SAFE_INTEGER+1, 1, MIN_SAFE_INTEGER);

            testSafeSubtractInvalid(MIN_SAFE_INTEGER, 1);
            testSafeSubtractInvalid(MIN_SAFE_INTEGER+1, 2);
            testSafeSubtractInvalid(undefined, 2);
            testSafeSubtractInvalid(1, undefined);

            function testSafeSubtractValid(x, y, expected) {
                const result = MathUtil.safeSubtract(x, y);
                expect(result, `safeSubtract: ${x}, ${y}, ${expected}`).to.eql(expected);
            }

            function testSafeSubtractInvalid(x, y) {
                expect(() => MathUtil.safeSubtract(x, y)).to.throw(ArithmeticException);
            }
        });

        it('safeMultiply', function () {
            // TODO add tests
        });

    });

    describe('safe*/ verify', function () {

        it('parseInt', function () {
            testParseIntValid(1, 1);
            testParseIntValid('1', 1);
            testParseIntValid('-0', 0);
            testParseIntValid('0', 0);
            testParseIntValid('0.99', 0);

            function testParseIntValid(x, expected) {
                expect(MathUtil.parseInt(x)).to.eql(expected);
            }

            testParseIntInvalid();
            testParseIntInvalid(null);
            testParseIntInvalid('foo');

            function testParseIntInvalid(x) {
                expect(() => MathUtil.parseInt(x)).to.throw(ArithmeticException);
            }
        });

        it('safeToInt', function () {
            expect(MathUtil.safeToInt(-0)).to.eql(0);
            expect(MathUtil.safeToInt(1)).to.eql(1);
            expect(MathUtil.safeToInt('2')).to.eql(2);

            expect(() => MathUtil.safeToInt(1.99)).to.throw(ArithmeticException);
            expect(() => MathUtil.safeToInt('foo')).to.throw(ArithmeticException);
            expect(() => MathUtil.safeToInt(null)).to.throw(ArithmeticException);
            expect(() => MathUtil.safeToInt()).to.throw(ArithmeticException);
        });

        it('verifyInt', function () {
            MathUtil.verifyInt(0);
            MathUtil.verifyInt('0');

            expect(() => MathUtil.verifyInt(1.5)).to.throw(ArithmeticException);
            expect(() => MathUtil.verifyInt('1.5')).to.throw(ArithmeticException);
            expect(() => MathUtil.verifyInt('foo')).to.throw(ArithmeticException);
            expect(() => MathUtil.verifyInt(null)).to.throw(ArithmeticException);
            expect(() => MathUtil.verifyInt()).to.throw(ArithmeticException);
        });

        it('safeZero', function () {
            expect(MathUtil.safeZero(0)).to.eql(0);
            expect(MathUtil.safeZero('0')).to.eql(0);
            expect(MathUtil.safeZero(-0)).to.eql(0);
            expect(MathUtil.safeZero(1)).to.eql(1);
            expect(MathUtil.safeZero(-1)).to.eql(-1);
        });

    });

    describe('compare', function () {

        it('compareNumbers', function () {
            expect(MathUtil.compareNumbers(1,2)).to.eql(-1);
            expect(MathUtil.compareNumbers(1,1)).to.eql(0);
            expect(MathUtil.compareNumbers(2,1)).to.eql(1);

            expect(MathUtil.compareNumbers(-1,-2)).to.eql(1);
            expect(MathUtil.compareNumbers(-1,-1)).to.eql(0);
            expect(MathUtil.compareNumbers(-2,-1)).to.eql(-1);

            expect(MathUtil.compareNumbers(0,0)).to.eql(0);
            expect(MathUtil.compareNumbers(0,-0)).to.eql(0);
        });

    });

    describe('hashCode', function () {
        const testData = [
            [0, 0],
            [-0, 0],
            [Infinity, 0],
            [1, 1],
            [123456, 123456],
            [1234567890, 160826066],
            [MAX_SAFE_INTEGER, -2097153],
            [MIN_SAFE_INTEGER, 1],
        ];

        it('should generate different hashes for different integers', function () {
            testData.forEach(([n, r]) => {
                expect(MathUtil.hash(n)).to.equal(r);
            });
        });

        it('should generate small integers', function () {
            testData.forEach(([n]) => {
                expect(MathUtil.hash(n) % 1).to.equal(0);
                expect(MathUtil.hash(n)).to.be.within(-Math.pow(2,31), Math.pow(2,31));
            });
        });

        it('should return equal hashcodes for same values', function () {
            const testData = [
                [1],
                [1, 2],
                [2, 1],
                [0],
            ];
            testData.forEach((data) => {
                expect(MathUtil.hashCode(...data)).to.equal(MathUtil.hashCode(...data));
            });
        });

        it('should return unequal hashcodes for selected different values', function () {
            const testData = [
                [[1], [2]],
                [[1, 2], [1, 3]],
                [[1, 2], [2, 1]],
                [[0], [0, 0]],
            ];
            testData.forEach((data) => {
                expect(MathUtil.hashCode(...data[0])).to.not.equal(MathUtil.hashCode(...data[1]));
            });
        });
    });
});
