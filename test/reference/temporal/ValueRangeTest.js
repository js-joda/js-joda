/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import '../../_init';

import {IllegalArgumentException} from '../../../src/errors';
import {MathUtil} from '../../../src/MathUtil';
import {ValueRange} from '../../../src/temporal/ValueRange';

describe('org.threeten.bp.temporal.TestValueRange', function () {

    describe('of(long,long)', function () {

        it('test_of_longlong', () => {
            const test = ValueRange.of(1, 12);
            assertEquals(test.minimum(), 1);
            assertEquals(test.largestMinimum(), 1);
            assertEquals(test.smallestMaximum(), 12);
            assertEquals(test.maximum(), 12);
            assertEquals(test.isFixed(), true);
            assertEquals(test.isIntValue(), true);
        });

        it('test_of_longlong_big', () => {
            const test = ValueRange.of(1, 123456789012345);
            assertEquals(test.minimum(), 1);
            assertEquals(test.largestMinimum(), 1);
            assertEquals(test.smallestMaximum(), 123456789012345);
            assertEquals(test.maximum(), 123456789012345);
            assertEquals(test.isFixed(), true);
            assertEquals(test.isIntValue(), true); // differs from threetenbp should be s.l. isSafeIntegerValue()
        });

        it('test_of_longlong_minGtMax', () => {
            expect(()=>{
                ValueRange.of(12, 1);
            }).to.throw(IllegalArgumentException);
        });

    });

    describe('of(long,long,long)', function () {

        it('test_of_longlonglong', () => {
            const test = ValueRange.of(1, 28, 31);
            assertEquals(test.minimum(), 1);
            assertEquals(test.largestMinimum(), 1);
            assertEquals(test.smallestMaximum(), 28);
            assertEquals(test.maximum(), 31);
            assertEquals(test.isFixed(), false);
            assertEquals(test.isIntValue(), true);
        });

        it('test_of_longlonglong_minGtMax', () => {
            expect(()=>{
                ValueRange.of(12, 1, 2);
            }).to.throw(IllegalArgumentException);
        });

        it('test_of_longlonglong_smallestmaxminGtMax', () => {
            expect(()=>{
                ValueRange.of(1, 31, 28);
            }).to.throw(IllegalArgumentException);
        });

    });

    describe('of(long,long,long,long)', function () {

        // @DataProvider(name='valid')
        function data_valid() {
            return [
                [1, 1, 1, 1],
                [1, 1, 1, 2],
                [1, 1, 2, 2],
                [1, 2, 3, 4],
                [1, 1, 28, 31],
                [1, 3, 31, 31],
                [-5, -4, -3, -2],
                [-5, -4, 3, 4],
                [1, 20, 10, 31]
            ];
        }

        it('test_of_longlonglonglong', function () {
            data_valid().forEach((data) => {
                test_of_longlonglonglong.apply(this, data);
            });
        });

        // @Test(dataProvider='valid')
        function test_of_longlonglonglong(sMin, lMin, sMax, lMax) {
            const test = ValueRange.of(sMin, lMin, sMax, lMax);
            assertEquals(test.minimum(), sMin);
            assertEquals(test.largestMinimum(), lMin);
            assertEquals(test.smallestMaximum(), sMax);
            assertEquals(test.maximum(), lMax);
            assertEquals(test.isFixed(), sMin === lMin && sMax === lMax);
            assertEquals(test.isIntValue(), true);
        }

        // @DataProvider(name='invalid')
        function data_invalid() {
            return [
                [1, 2, 31, 28],
                [1, 31, 2, 28],
                [31, 2, 1, 28],
                [31, 2, 3, 28],

                [2, 1, 28, 31],
                [2, 1, 31, 28],
                [12, 13, 1, 2]
            ];
        }

        it('test_of_longlonglonglong_invalid', function () {
            data_invalid().forEach((data) => {
                test_of_longlonglonglong_invalid.apply(this, data);
            });
        });

        // @Test(dataProvider='invalid', expectedExceptions=IllegalArgumentException.class)
        function test_of_longlonglonglong_invalid(sMin, lMin, sMax, lMax) {
            expect(() => {
                ValueRange.of(sMin, lMin, sMax, lMax);
            }).to.throw(IllegalArgumentException);
        }

    });

    describe('isValidValue(long)', () => {

        it('test_isValidValue_long', () => {
            const test = ValueRange.of(1, 28, 31);
            assertEquals(test.isValidValue(0), false);
            assertEquals(test.isValidValue(1), true);
            assertEquals(test.isValidValue(2), true);
            assertEquals(test.isValidValue(30), true);
            assertEquals(test.isValidValue(31), true);
            assertEquals(test.isValidValue(32), false);
        });

    });

    describe('isValidIntValue(long)', () => {

        it('test_isValidValue_long_int', () => {
            const test = ValueRange.of(1, 28, 31);
            assertEquals(test.isValidValue(0), false);
            assertEquals(test.isValidValue(1), true);
            assertEquals(test.isValidValue(31), true);
            assertEquals(test.isValidValue(32), false);
        });

        it('test_isValidValue_long_long', () => {
            const test = ValueRange.of(1, 28, MathUtil.MAX_SAFE_INTEGER + 1);
            assertEquals(test.isValidIntValue(0), false);
            assertEquals(test.isValidIntValue(1), false);
            assertEquals(test.isValidIntValue(31), false);
            assertEquals(test.isValidIntValue(32), false);
        });

    });

    describe('equals() / hashCode()', function () {

        it('test_equals1', () => {
            const a = ValueRange.of(1, 2, 3, 4);
            const b = ValueRange.of(1, 2, 3, 4);
            assertEquals(a.equals(a), true);
            assertEquals(a.equals(b), true);
            assertEquals(b.equals(a), true);
            assertEquals(b.equals(b), true);
            assertEquals(a.hashCode() === b.hashCode(), true);
        });

        it('test_hashcode_equal', () => {
            const testData = [
                [ValueRange.of(1, 2, 3, 4), ValueRange.of(1, 2, 3, 4)],
                [ValueRange.of(1, 2), ValueRange.of(1, 2)],
                [ValueRange.of(1, 2, 3), ValueRange.of(1, 2, 3)],
            ];
            testData.forEach(([a, b]) => {
                assertEquals(a.hashCode() === b.hashCode(), true);
            });
        });

        it('test_hashcode_unequal', () => {
            const testData = [
                [ValueRange.of(1, 2, 3, 4), ValueRange.of(1, 2, 3, 5)],
                [ValueRange.of(1, 2), ValueRange.of(0, 2)],
                [ValueRange.of(1, 4, 5), ValueRange.of(1, 2, 5)],
            ];
            testData.forEach(([a, b]) => {
                assertEquals(a.hashCode() === b.hashCode(), false);
            });
        });

        it('test_equals2', () => {
            const a = ValueRange.of(1, 2, 3, 4);
            assertEquals(a.equals(ValueRange.of(0, 2, 3, 4)), false);
            assertEquals(a.equals(ValueRange.of(1, 3, 3, 4)), false);
            assertEquals(a.equals(ValueRange.of(1, 2, 4, 4)), false);
            assertEquals(a.equals(ValueRange.of(1, 2, 3, 5)), false);
        });

        it('test_equals_otherType', function () {
            const a = ValueRange.of(1, 12);
            assertEquals(a.equals('Rubbish'), false);
        });

        it('test_equals_null', () => {
            const a = ValueRange.of(1, 12);
            assertEquals(a.equals(null), false);
        });

    });


    describe('toString()', () => {

        it('test_toString', function () {
            assertEquals(ValueRange.of(1, 1, 4, 4).toString(), '1 - 4');
            assertEquals(ValueRange.of(1, 1, 3, 4).toString(), '1 - 3/4');
            assertEquals(ValueRange.of(1, 2, 3, 4).toString(), '1/2 - 3/4');
            assertEquals(ValueRange.of(1, 2, 4, 4).toString(), '1/2 - 4');
        });

    });

});

