/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertSame, assertEquals} from '../testUtils';

import '../_init';

import {NullPointerException, ArithmeticException} from '../../src/errors';
import {MathUtil} from '../../src/MathUtil';

import {LocalDate} from '../../src/LocalDate';
import {Period} from '../../src/Period';

const Integer = {
    MAX_VALUE: 2147483647,
    MIN_VALUE: -2147483648
};

describe('org.threeten.bp.TestPeriod', () => {

    describe('factories', () => {

        it('factory_zeroSingleton', () => {
            assertSame(Period.ZERO, Period.ZERO);
            assertSame(Period.of(0, 0, 0), Period.ZERO);
            assertSame(Period.ofYears(0), Period.ZERO);
            assertSame(Period.ofMonths(0), Period.ZERO);
            assertSame(Period.ofDays(0), Period.ZERO);
        });

    });

    describe('of', () => {

        it('factory_of_ints', () => {
            assertPeriod(Period.of(1, 2, 3), 1, 2, 3);
            assertPeriod(Period.of(0, 2, 3), 0, 2, 3);
            assertPeriod(Period.of(1, 0, 0), 1, 0, 0);
            assertPeriod(Period.of(0, 0, 0), 0, 0, 0);
            assertPeriod(Period.of(-1, -2, -3), -1, -2, -3);
        });

        //-----------------------------------------------------------------------
        it('factory_ofYears', () => {
            assertPeriod(Period.ofYears(1), 1, 0, 0);
            assertPeriod(Period.ofYears(0), 0, 0, 0);
            assertPeriod(Period.ofYears(-1), -1, 0, 0);
            assertPeriod(Period.ofYears(Integer.MAX_VALUE), Integer.MAX_VALUE, 0, 0);
            assertPeriod(Period.ofYears(Integer.MIN_VALUE), Integer.MIN_VALUE, 0, 0);
        });

        it('factory_ofMonths', () => {
            assertPeriod(Period.ofMonths(1), 0, 1, 0);
            assertPeriod(Period.ofMonths(0), 0, 0, 0);
            assertPeriod(Period.ofMonths(-1), 0, -1, 0);
            assertPeriod(Period.ofMonths(Integer.MAX_VALUE), 0, Integer.MAX_VALUE, 0);
            assertPeriod(Period.ofMonths(Integer.MIN_VALUE), 0, Integer.MIN_VALUE, 0);
        });

        it('factory_ofDays', () => {
            assertPeriod(Period.ofDays(1), 0, 0, 1);
            assertPeriod(Period.ofDays(0), 0, 0, 0);
            assertPeriod(Period.ofDays(-1), 0, 0, -1);
            assertPeriod(Period.ofDays(Integer.MAX_VALUE), 0, 0, Integer.MAX_VALUE);
            assertPeriod(Period.ofDays(Integer.MIN_VALUE), 0, 0, Integer.MIN_VALUE);
        });

        it('factory_of_int_string', () => {
            assertPeriod(Period.of('1', '2', '3'), 1, 2, 3);
            assertPeriod(Period.of('-1', '-2', '-3'), -1, -2, -3);
            assertPeriod(Period.ofYears('1'), 1, 0, 0);
            assertPeriod(Period.ofYears('-1'), -1, 0, 0);
            assertPeriod(Period.ofMonths('1'), 0, 1, 0);
            assertPeriod(Period.ofMonths('-1'), 0, -1, 0);
            assertPeriod(Period.ofDays('1'), 0, 0, 1);
            assertPeriod(Period.ofDays('-1'), 0, 0, -1);
        });

    });

    describe('between', function () {

        function data_between() {
            return [
                [2010, 1, 1, 2010, 1, 1, 0, 0, 0],
                [2010, 1, 1, 2010, 1, 2, 0, 0, 1],
                [2010, 1, 1, 2010, 1, 31, 0, 0, 30],
                [2010, 1, 1, 2010, 2, 1, 0, 1, 0],
                [2010, 1, 1, 2010, 2, 28, 0, 1, 27],
                [2010, 1, 1, 2010, 3, 1, 0, 2, 0],
                [2010, 1, 1, 2010, 12, 31, 0, 11, 30],
                [2010, 1, 1, 2011, 1, 1, 1, 0, 0],
                [2010, 1, 1, 2011, 12, 31, 1, 11, 30],
                [2010, 1, 1, 2012, 1, 1, 2, 0, 0],

                [2010, 1, 10, 2010, 1, 1, 0, 0, -9],
                [2010, 1, 10, 2010, 1, 2, 0, 0, -8],
                [2010, 1, 10, 2010, 1, 9, 0, 0, -1],
                [2010, 1, 10, 2010, 1, 10, 0, 0, 0],
                [2010, 1, 10, 2010, 1, 11, 0, 0, 1],
                [2010, 1, 10, 2010, 1, 31, 0, 0, 21],
                [2010, 1, 10, 2010, 2, 1, 0, 0, 22],
                [2010, 1, 10, 2010, 2, 9, 0, 0, 30],
                [2010, 1, 10, 2010, 2, 10, 0, 1, 0],
                [2010, 1, 10, 2010, 2, 28, 0, 1, 18],
                [2010, 1, 10, 2010, 3, 1, 0, 1, 19],
                [2010, 1, 10, 2010, 3, 9, 0, 1, 27],
                [2010, 1, 10, 2010, 3, 10, 0, 2, 0],
                [2010, 1, 10, 2010, 12, 31, 0, 11, 21],
                [2010, 1, 10, 2011, 1, 1, 0, 11, 22],
                [2010, 1, 10, 2011, 1, 9, 0, 11, 30],
                [2010, 1, 10, 2011, 1, 10, 1, 0, 0],

                [2010, 3, 30, 2011, 5, 1, 1, 1, 1],
                [2010, 4, 30, 2011, 5, 1, 1, 0, 1],

                [2010, 2, 28, 2012, 2, 27, 1, 11, 30],
                [2010, 2, 28, 2012, 2, 28, 2, 0, 0],
                [2010, 2, 28, 2012, 2, 29, 2, 0, 1],

                [2012, 2, 28, 2014, 2, 27, 1, 11, 30],
                [2012, 2, 28, 2014, 2, 28, 2, 0, 0],
                [2012, 2, 28, 2014, 3, 1, 2, 0, 1],

                [2012, 2, 29, 2014, 2, 28, 1, 11, 30],
                [2012, 2, 29, 2014, 3, 1, 2, 0, 1],
                [2012, 2, 29, 2014, 3, 2, 2, 0, 2],

                [2012, 2, 29, 2016, 2, 28, 3, 11, 30],
                [2012, 2, 29, 2016, 2, 29, 4, 0, 0],
                [2012, 2, 29, 2016, 3, 1, 4, 0, 1],

                [2010, 1, 1, 2009, 12, 31, 0, 0, -1],
                [2010, 1, 1, 2009, 12, 30, 0, 0, -2],
                [2010, 1, 1, 2009, 12, 2, 0, 0, -30],
                [2010, 1, 1, 2009, 12, 1, 0, -1, 0],
                [2010, 1, 1, 2009, 11, 30, 0, -1, -1],
                [2010, 1, 1, 2009, 11, 2, 0, -1, -29],
                [2010, 1, 1, 2009, 11, 1, 0, -2, 0],
                [2010, 1, 1, 2009, 1, 2, 0, -11, -30],
                [2010, 1, 1, 2009, 1, 1, -1, 0, 0],

                [2010, 1, 15, 2010, 1, 15, 0, 0, 0],
                [2010, 1, 15, 2010, 1, 14, 0, 0, -1],
                [2010, 1, 15, 2010, 1, 1, 0, 0, -14],
                [2010, 1, 15, 2009, 12, 31, 0, 0, -15],
                [2010, 1, 15, 2009, 12, 16, 0, 0, -30],
                [2010, 1, 15, 2009, 12, 15, 0, -1, 0],
                [2010, 1, 15, 2009, 12, 14, 0, -1, -1],

                [2010, 2, 28, 2009, 3, 1, 0, -11, -27],
                [2010, 2, 28, 2009, 2, 28, -1, 0, 0],
                [2010, 2, 28, 2009, 2, 27, -1, 0, -1],

                [2010, 2, 28, 2008, 2, 29, -1, -11, -28],
                [2010, 2, 28, 2008, 2, 28, -2, 0, 0],
                [2010, 2, 28, 2008, 2, 27, -2, 0, -1],

                [2012, 2, 29, 2009, 3, 1, -2, -11, -28],
                [2012, 2, 29, 2009, 2, 28, -3, 0, -1],
                [2012, 2, 29, 2009, 2, 27, -3, 0, -2],

                [2012, 2, 29, 2008, 3, 1, -3, -11, -28],
                [2012, 2, 29, 2008, 2, 29, -4, 0, 0],
                [2012, 2, 29, 2008, 2, 28, -4, 0, -1]
            ];

        }

        it('factory_between_LocalDate', () => {
            data_between().forEach((data) => {
                factory_between_LocalDate.apply(this, data);
            });
        });

        function factory_between_LocalDate(y1, m1, d1, y2, m2, d2, ye, me, de) {
            // console.log(y1, m1, d1, y2, m2, d2, ye, me, de);
            const start = LocalDate.of(y1, m1, d1);
            const end = LocalDate.of(y2, m2, d2);
            const test = Period.between(start, end);
            assertPeriod(test, ye, me, de);
            //assertEquals(start.plus(test), end);
        }

        it('factory_between_LocalDate_nullFirst', () => {
            expect(() => {
                Period.between(null, LocalDate.of(2010, 1, 1));
            }).to.throw(NullPointerException);
        });

        it('factory_between_LocalDate_nullSecond', () => {
            expect(() => {
                Period.between(LocalDate.of(2010, 1, 1), null);
            }).to.throw(NullPointerException);
        });

    });

    function data_toString() {
        return [
            [Period.ZERO, 'P0D'],
            [Period.ofDays(0), 'P0D'],
            [Period.ofYears(1), 'P1Y'],
            [Period.ofMonths(1), 'P1M'],
            [Period.ofDays(1), 'P1D'],
            [Period.of(1, 2, 3), 'P1Y2M3D']
        ];
    }

    describe('parse()', function () {

        function data_parse() {
            return [
                ['P0D', Period.ZERO],
                ['P0W', Period.ZERO],
                ['P0M', Period.ZERO],
                ['P0Y', Period.ZERO],

                ['P0Y0D', Period.ZERO],
                ['P0Y0W', Period.ZERO],
                ['P0Y0M', Period.ZERO],
                ['P0M0D', Period.ZERO],
                ['P0M0W', Period.ZERO],
                ['P0W0D', Period.ZERO],

                ['P1D', Period.ofDays(1)],
                ['P2D', Period.ofDays(2)],
                ['P-2D', Period.ofDays(-2)],
                ['-P2D', Period.ofDays(-2)],
                ['-P-2D', Period.ofDays(2)],
                ['P' + Integer.MAX_VALUE + 'D', Period.ofDays(Integer.MAX_VALUE)],
                ['P' + Integer.MIN_VALUE + 'D', Period.ofDays(Integer.MIN_VALUE)],

                ['P1W', Period.ofDays(7)],
                ['P2W', Period.ofDays(14)],
                ['P-2W', Period.ofDays(-14)],
                ['-P2W', Period.ofDays(-14)],
                ['-P-2W', Period.ofDays(14)],

                ['P1M', Period.ofMonths(1)],
                ['P2M', Period.ofMonths(2)],
                ['P-2M', Period.ofMonths(-2)],
                ['-P2M', Period.ofMonths(-2)],
                ['-P-2M', Period.ofMonths(2)],
                ['P' + Integer.MAX_VALUE + 'M', Period.ofMonths(Integer.MAX_VALUE)],
                ['P' + Integer.MIN_VALUE + 'M', Period.ofMonths(Integer.MIN_VALUE)],

                ['P1Y', Period.ofYears(1)],
                ['P2Y', Period.ofYears(2)],
                ['P-2Y', Period.ofYears(-2)],
                ['-P2Y', Period.ofYears(-2)],
                ['-P-2Y', Period.ofYears(2)],
                ['P' + Integer.MAX_VALUE + 'Y', Period.ofYears(Integer.MAX_VALUE)],
                ['P' + Integer.MIN_VALUE + 'Y', Period.ofYears(Integer.MIN_VALUE)],

                ['P1Y2M3W4D', Period.of(1, 2, 3 * 7 + 4)]
            ];
        }

        it('test_parse', function () {
            data_parse().forEach((data) => {
                test_parse.apply(this, data);
            });
        });

        function test_parse(text, expected) {
            // console.log(text, expected);
            assertEquals(Period.parse(text), expected);
        }

        it('test_parse_toString', function () {
            data_toString().forEach((data) => {
                test_parse_toString.apply(this, data);
            });
        });

        function test_parse_toString(test, expected) {
            // console.log(test, expected);
            assertEquals(test, Period.parse(expected));
        }

        it('test_parse_nullText', () => {
            expect(() => {
                Period.parse(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('isZero()', function () {

        it('test_isZero', () => {
            assertEquals(Period.of(1, 2, 3).isZero(), false);
            assertEquals(Period.of(1, 0, 0).isZero(), false);
            assertEquals(Period.of(0, 2, 0).isZero(), false);
            assertEquals(Period.of(0, 0, 3).isZero(), false);
            assertEquals(Period.of(0, 0, 0).isZero(), true);
        });

    });

    describe('isNegative', function () {

        it('test_isNegative', () => {
            assertEquals(Period.of(0, 0, 0).isNegative(), false);

            assertEquals(Period.of(1, 2, 3).isNegative(), false);
            assertEquals(Period.of(1, 0, 0).isNegative(), false);
            assertEquals(Period.of(0, 2, 0).isNegative(), false);
            assertEquals(Period.of(0, 0, 3).isNegative(), false);

            assertEquals(Period.of(-1, -2, -3).isNegative(), true);
            assertEquals(Period.of(-1, 0, 0).isNegative(), true);
            assertEquals(Period.of(0, -2, 0).isNegative(), true);
            assertEquals(Period.of(0, 0, -3).isNegative(), true);
            assertEquals(Period.of(-1, 2, 3).isNegative(), true);
            assertEquals(Period.of(1, -2, 3).isNegative(), true);
            assertEquals(Period.of(1, 2, -3).isNegative(), true);
        });

    });

    describe('withYears()', function () {

        it('test_withYears', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.withYears(10), 10, 2, 3);
        });

        it('test_withYears_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.withYears(1), test);
        });

        it('test_withYears_toZero', () => {
            const test = Period.ofYears(1);
            assertSame(test.withYears(0), Period.ZERO);
        });

    });

    describe('withMonths()', function () {

        it('test_withMonths', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.withMonths(10), 1, 10, 3);
        });

        it('test_withMonths_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.withMonths(2), test);
        });

        it('test_withMonths_toZero', () => {
            const test = Period.ofMonths(1);
            assertSame(test.withMonths(0), Period.ZERO);
        });

    });

    describe('withDays()', function () {

        it('test_withDays', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.withDays(10), 1, 2, 10);
        });

        it('test_withDays_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.withDays(3), test);
        });

        it('test_withDays_toZero', () => {
            const test = Period.ofDays(1);
            assertSame(test.withDays(0), Period.ZERO);
        });

    });

    describe('plus(Period)', () => {

        function data_plus() {
            return [
                [pymd(0, 0, 0), pymd(0, 0, 0), pymd(0, 0, 0)],
                [pymd(0, 0, 0), pymd(5, 0, 0), pymd(5, 0, 0)],
                [pymd(0, 0, 0), pymd(-5, 0, 0), pymd(-5, 0, 0)],
                [pymd(0, 0, 0), pymd(0, 5, 0), pymd(0, 5, 0)],
                [pymd(0, 0, 0), pymd(0, -5, 0), pymd(0, -5, 0)],
                [pymd(0, 0, 0), pymd(0, 0, 5), pymd(0, 0, 5)],
                [pymd(0, 0, 0), pymd(0, 0, -5), pymd(0, 0, -5)],
                [pymd(0, 0, 0), pymd(2, 3, 4), pymd(2, 3, 4)],
                [pymd(0, 0, 0), pymd(-2, -3, -4), pymd(-2, -3, -4)],

                [pymd(4, 5, 6), pymd(2, 3, 4), pymd(6, 8, 10)],
                [pymd(4, 5, 6), pymd(-2, -3, -4), pymd(2, 2, 2)]
            ];
        }

        it('test_plus', () => {
            data_plus().forEach((data) => {
                test_plus.apply(this, data);
            });
        });

        function test_plus(base, add, expected) {
            // console.log(base, add, expected);
            assertEquals(base.plus(add), expected);
        }

    });

    describe('plusYears()', () => {

        it('test_plusYears', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.plusYears(10), 11, 2, 3);
            assertPeriod(test.plus(Period.ofYears(10)), 11, 2, 3);
        });

        it('test_plusYears_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.plusYears(0), test);
            assertPeriod(test.plus(Period.ofYears(0)), 1, 2, 3);
        });

        it('test_plusYears_toZero', () => {
            const test = Period.ofYears(-1);
            assertSame(test.plusYears(1), Period.ZERO);
            assertSame(test.plus(Period.ofYears(1)), Period.ZERO);
        });

        it('test_plusYears_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofYears(MathUtil.MAX_SAFE_INTEGER);
                test.plusYears(1);
            }).to.throw(ArithmeticException);
        });

        it('test_plusYears_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofYears(MathUtil.MIN_SAFE_INTEGER);
                test.plusYears(-1);
            }).to.throw(ArithmeticException);
        });

    });

    describe('plusMonths()', () => {

        it('test_plusMonths', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.plusMonths(10), 1, 12, 3);
            assertPeriod(test.plus(Period.ofMonths(10)), 1, 12, 3);
        });

        it('test_plusMonths_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.plusMonths(0), test);
            assertEquals(test.plus(Period.ofMonths(0)), test);
        });

        it('test_plusMonths_toZero', () => {
            const test = Period.ofMonths(-1);
            assertSame(test.plusMonths(1), Period.ZERO);
            assertSame(test.plus(Period.ofMonths(1)), Period.ZERO);
        });

        it('test_plusMonths_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofMonths(MathUtil.MAX_SAFE_INTEGER);
                test.plusMonths(1);

            }).to.throw(ArithmeticException);
        });

        it('test_plusMonths_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofMonths(MathUtil.MIN_SAFE_INTEGER);
                test.plusMonths(-1);

            }).to.throw(ArithmeticException);
        });

    });

    describe('plusDays()', () => {

        it('test_plusDays', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.plusDays(10), 1, 2, 13);
        });

        it('test_plusDays_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.plusDays(0), test);
        });

        it('test_plusDays_toZero', () => {
            const test = Period.ofDays(-1);
            assertSame(test.plusDays(1), Period.ZERO);
        });

        it('test_plusDays_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofDays(MathUtil.MAX_SAFE_INTEGER);
                test.plusDays(1);

            }).to.throw(ArithmeticException);
        });

        it('test_plusDays_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofDays(MathUtil.MIN_SAFE_INTEGER);
                test.plusDays(-1);

            }).to.throw(ArithmeticException);
        });

    });

    describe('minus(Period)', () => {

        function data_minus() {
            return [
                [pymd(0, 0, 0), pymd(0, 0, 0), pymd(0, 0, 0)],
                [pymd(0, 0, 0), pymd(5, 0, 0), pymd(-5, 0, 0)],
                [pymd(0, 0, 0), pymd(-5, 0, 0), pymd(5, 0, 0)],
                [pymd(0, 0, 0), pymd(0, 5, 0), pymd(0, -5, 0)],
                [pymd(0, 0, 0), pymd(0, -5, 0), pymd(0, 5, 0)],
                [pymd(0, 0, 0), pymd(0, 0, 5), pymd(0, 0, -5)],
                [pymd(0, 0, 0), pymd(0, 0, -5), pymd(0, 0, 5)],
                [pymd(0, 0, 0), pymd(2, 3, 4), pymd(-2, -3, -4)],
                [pymd(0, 0, 0), pymd(-2, -3, -4), pymd(2, 3, 4)],

                [pymd(4, 5, 6), pymd(2, 3, 4), pymd(2, 2, 2)],
                [pymd(4, 5, 6), pymd(-2, -3, -4), pymd(6, 8, 10)]
            ];
        }

        it('test_minus', function () {
            data_minus().forEach((data) => {
                test_minus.apply(this, data);
            });
        });

        function test_minus(base, subtract, expected) {
            // console.log(base, subtract, expected);
            assertEquals(base.minus(subtract), expected);
        }

    });

    describe('minusYears()', () => {

        it('test_minusYears', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.minusYears(10), -9, 2, 3);
        });

        it('test_minusYears_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.minusYears(0), test);
        });

        it('test_minusYears_toZero', () => {
            const test = Period.ofYears(1);
            assertSame(test.minusYears(1), Period.ZERO);
        });

        it('test_minusYears_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofYears(MathUtil.MAX_SAFE_INTEGER);
                test.minusYears(-1);
            }).to.throw(ArithmeticException);
        });

        it('test_minusYears_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofYears(MathUtil.MIN_SAFE_INTEGER);
                test.minusYears(1);
            }).to.throw(ArithmeticException);
        });

    });

    describe('minusMonths()', () => {

        it('test_minusMonths', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.minusMonths(10), 1, -8, 3);
        });

        it('test_minusMonths_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.minusMonths(0), test);
        });

        it('test_minusMonths_toZero', () => {
            const test = Period.ofMonths(1);
            assertSame(test.minusMonths(1), Period.ZERO);
        });

        it('test_minusMonths_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofMonths(MathUtil.MAX_SAFE_INTEGER);
                test.minusMonths(-1);
            }).to.throw(ArithmeticException);
        });

        it('test_minusMonths_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofMonths(MathUtil.MIN_SAFE_INTEGER);
                test.minusMonths(1);
            }).to.throw(ArithmeticException);
        });

    });

    describe('minusDays()', () => {

        it('test_minusDays', () => {
            const test = Period.of(1, 2, 3);
            assertPeriod(test.minusDays(10), 1, 2, -7);
        });

        it('test_minusDays_noChange', () => {
            const test = Period.of(1, 2, 3);
            assertSame(test.minusDays(0), test);
        });

        it('test_minusDays_toZero', () => {
            const test = Period.ofDays(1);
            assertSame(test.minusDays(1), Period.ZERO);
        });

        it('test_minusDays_overflowTooBig', () => {
            expect(() => {
                const test = Period.ofDays(MathUtil.MAX_SAFE_INTEGER);
                test.minusDays(-1);
            }).to.throw(ArithmeticException);
        });

        it('test_minusDays_overflowTooSmall', () => {
            expect(() => {
                const test = Period.ofDays(MathUtil.MIN_SAFE_INTEGER);
                test.minusDays(1);
            }).to.throw(ArithmeticException);
        });

    });


    describe('multipliedBy()', () => {

    });

    it('test_multipliedBy', () => {
        const test = Period.of(1, 2, 3);
        assertPeriod(test.multipliedBy(2), 2, 4, 6);
        assertPeriod(test.multipliedBy(-3), -3, -6, -9);
    });

    it('test_multipliedBy_zeroBase', () => {
        assertSame(Period.ZERO.multipliedBy(2), Period.ZERO);
    });

    it('test_multipliedBy_zero', () => {
        const test = Period.of(1, 2, 3);
        assertSame(test.multipliedBy(0), Period.ZERO);
    });

    it('test_multipliedBy_one', () => {
        const test = Period.of(1, 2, 3);
        assertSame(test.multipliedBy(1), test);
    });

    /*
     @Test(expectedExceptions=ArithmeticException.class)
     public void test_multipliedBy_overflowTooBig() {
     const test = Period.ofYears(Integer.MAX_VALUE / 2 + 1);
     test.multipliedBy(2);
     }

     @Test(expectedExceptions=ArithmeticException.class)
     public void test_multipliedBy_overflowTooSmall() {
     const test = Period.ofYears(Integer.MIN_VALUE / 2 - 1);
     test.multipliedBy(2);
     }
     */

    describe('negated()', () => {

    });

    it('test_negated', () => {
        const test = Period.of(1, 2, 3);
        assertPeriod(test.negated(), -1, -2, -3);
    });

    it('test_negated_zero', () => {
        assertSame(Period.ZERO.negated(), Period.ZERO);
    });

    it('test_negated_max', () => {
        assertPeriod(Period.ofYears(Integer.MAX_VALUE).negated(), -Integer.MAX_VALUE, 0, 0);
    });

    it('test_negated_overflow', () => {
        expect(() => {
            Period.ofYears(MathUtil.MIN_SAFE_INTEGER).negated();
        }).to.throw(ArithmeticException);
    });

    describe('normalized()', () => {

        function data_normalized() {
            return [
                [0, 0, 0, 0],
                [1, 0, 1, 0],
                [-1, 0, -1, 0],

                [1, 1, 1, 1],
                [1, 2, 1, 2],
                [1, 11, 1, 11],
                [1, 12, 2, 0],
                [1, 13, 2, 1],
                [1, 23, 2, 11],
                [1, 24, 3, 0],
                [1, 25, 3, 1],

                [1, -1, 0, 11],
                [1, -2, 0, 10],
                [1, -11, 0, 1],
                [1, -12, 0, 0],
                [1, -13, 0, -1],
                [1, -23, 0, -11],
                [1, -24, -1, 0],
                [1, -25, -1, -1],
                [1, -35, -1, -11],
                [1, -36, -2, 0],
                [1, -37, -2, -1],

                [-1, 1, 0, -11],
                [-1, 11, 0, -1],
                [-1, 12, 0, 0],
                [-1, 13, 0, 1],
                [-1, 23, 0, 11],
                [-1, 24, 1, 0],
                [-1, 25, 1, 1],

                [-1, -1, -1, -1],
                [-1, -11, -1, -11],
                [-1, -12, -2, 0],
                [-1, -13, -2, -1]
            ];
        }

        it('test_normalized', function () {
            data_normalized().forEach((data) => {
                test_normalized.apply(this, data);
            });
        });

        function test_normalized(inputYears, inputMonths, expectedYears, expectedMonths) {
            assertPeriod(Period.of(inputYears, inputMonths, 0).normalized(), expectedYears, expectedMonths, 0);
        }


        it('test_normalizedMonthsISO_min', () => {
            expect(() => {
                const base = Period.of(MathUtil.MIN_SAFE_INTEGER, -12, 0);
                base.normalized();
            }).to.throw(ArithmeticException);
        });

        it('test_normalizedMonthsISO_max', () => {
            expect(() => {
                const base = Period.of(MathUtil.MAX_SAFE_INTEGER, 12, 0);
                base.normalized();
            }).to.throw(ArithmeticException);
        });

    });


    describe('addTo()', () => {

        function data_addTo() {
            return [
                [pymd(0, 0, 0), date(2012, 6, 30), date(2012, 6, 30)],

                [pymd(1, 0, 0), date(2012, 6, 10), date(2013, 6, 10)],
                [pymd(0, 1, 0), date(2012, 6, 10), date(2012, 7, 10)],
                [pymd(0, 0, 1), date(2012, 6, 10), date(2012, 6, 11)],

                [pymd(-1, 0, 0), date(2012, 6, 10), date(2011, 6, 10)],
                [pymd(0, -1, 0), date(2012, 6, 10), date(2012, 5, 10)],
                [pymd(0, 0, -1), date(2012, 6, 10), date(2012, 6, 9)],

                [pymd(1, 2, 3), date(2012, 6, 27), date(2013, 8, 30)],
                [pymd(1, 2, 3), date(2012, 6, 28), date(2013, 8, 31)],
                [pymd(1, 2, 3), date(2012, 6, 29), date(2013, 9, 1)],
                [pymd(1, 2, 3), date(2012, 6, 30), date(2013, 9, 2)],
                [pymd(1, 2, 3), date(2012, 7, 1), date(2013, 9, 4)],

                [pymd(1, 0, 0), date(2011, 2, 28), date(2012, 2, 28)],
                [pymd(4, 0, 0), date(2011, 2, 28), date(2015, 2, 28)],
                [pymd(1, 0, 0), date(2012, 2, 29), date(2013, 2, 28)],
                [pymd(4, 0, 0), date(2012, 2, 29), date(2016, 2, 29)],

                [pymd(1, 1, 0), date(2011, 1, 29), date(2012, 2, 29)],
                [pymd(1, 2, 0), date(2012, 2, 29), date(2013, 4, 29)]
            ];
        }

        it('test_addTo', function () {
            data_addTo().forEach((data) => {
                test_addTo.apply(this, data);
            });
        });

        function test_addTo(period, baseDate, expected) {
            // console.log(period, baseDate, expected);
            assertEquals(period.addTo(baseDate), expected);
        }

        it('test_addTo_usingLocalDatePlus', function () {
            data_addTo().forEach((data) => {
                test_addTo_usingLocalDatePlus.apply(this, data);
            });
        });

        function test_addTo_usingLocalDatePlus(period, baseDate, expected) {
            // console.log(period, baseDate, expected);
            assertEquals(baseDate.plus(period), expected);
        }


        it('test_addTo_nullZero', () => {
            expect(() => {
                Period.ZERO.addTo(null);

            }).to.throw(NullPointerException);
        });

        it('test_addTo_nullNonZero', () => {
            expect(() => {
                Period.ofDays(2).addTo(null);

            }).to.throw(NullPointerException);
        });

    });

    describe('subtractFrom()', () => {

        function data_subtractFrom() {
            return [
                [pymd(0, 0, 0), date(2012, 6, 30), date(2012, 6, 30)],

                [pymd(1, 0, 0), date(2012, 6, 10), date(2011, 6, 10)],
                [pymd(0, 1, 0), date(2012, 6, 10), date(2012, 5, 10)],
                [pymd(0, 0, 1), date(2012, 6, 10), date(2012, 6, 9)],

                [pymd(-1, 0, 0), date(2012, 6, 10), date(2013, 6, 10)],
                [pymd(0, -1, 0), date(2012, 6, 10), date(2012, 7, 10)],
                [pymd(0, 0, -1), date(2012, 6, 10), date(2012, 6, 11)],

                [pymd(1, 2, 3), date(2012, 8, 30), date(2011, 6, 27)],
                [pymd(1, 2, 3), date(2012, 8, 31), date(2011, 6, 27)],
                [pymd(1, 2, 3), date(2012, 9, 1), date(2011, 6, 28)],
                [pymd(1, 2, 3), date(2012, 9, 2), date(2011, 6, 29)],
                [pymd(1, 2, 3), date(2012, 9, 3), date(2011, 6, 30)],
                [pymd(1, 2, 3), date(2012, 9, 4), date(2011, 7, 1)],

                [pymd(1, 0, 0), date(2011, 2, 28), date(2010, 2, 28)],
                [pymd(4, 0, 0), date(2011, 2, 28), date(2007, 2, 28)],
                [pymd(1, 0, 0), date(2012, 2, 29), date(2011, 2, 28)],
                [pymd(4, 0, 0), date(2012, 2, 29), date(2008, 2, 29)],

                [pymd(1, 1, 0), date(2013, 3, 29), date(2012, 2, 29)],
                [pymd(1, 2, 0), date(2012, 2, 29), date(2010, 12, 29)]
            ];
        }

        it('test_subtractFrom', function () {
            data_subtractFrom().forEach((data) => {
                test_subtractFrom.apply(this, data);
            });
        });

        function test_subtractFrom(period, baseDate, expected) {
            assertEquals(period.subtractFrom(baseDate), expected);
        }

        it('test_subtractFrom_usingLocalDateMinus', function () {
            data_subtractFrom().forEach((data) => {
                test_subtractFrom_usingLocalDateMinus.apply(this, data);
            });
        });

        function test_subtractFrom_usingLocalDateMinus(period, baseDate, expected) {
            assertEquals(baseDate.minus(period), expected);
        }


        it('test_subtractFrom_nullZero', () => {
            expect(() => {
                Period.ZERO.subtractFrom(null);

            }).to.throw(NullPointerException);
        });

        it('test_subtractFrom_nullNonZero', () => {
            expect(() => {
                Period.ofDays(2).subtractFrom(null);

            }).to.throw(NullPointerException);
        });

    });

    describe('equals() / hashCode()', function () {

        it('test_equals', () => {
            assertEquals(Period.of(1, 0, 0).equals(Period.ofYears(1)), true);
            assertEquals(Period.of(0, 1, 0).equals(Period.ofMonths(1)), true);
            assertEquals(Period.of(0, 0, 1).equals(Period.ofDays(1)), true);
            assertEquals(Period.of(1, 2, 3).equals(Period.of(1, 2, 3)), true);

            assertEquals(Period.ofYears(1).equals(Period.ofYears(1)), true);
            assertEquals(Period.ofYears(1).equals(Period.ofYears(2)), false);

            assertEquals(Period.ofMonths(1).equals(Period.ofMonths(1)), true);
            assertEquals(Period.ofMonths(1).equals(Period.ofMonths(2)), false);

            assertEquals(Period.ofDays(1).equals(Period.ofDays(1)), true);
            assertEquals(Period.ofDays(1).equals(Period.ofDays(2)), false);

            assertEquals(Period.of(1, 2, 3).equals(Period.of(1, 2, 3)), true);
            assertEquals(Period.of(1, 2, 3).equals(Period.of(0, 2, 3)), false);
            assertEquals(Period.of(1, 2, 3).equals(Period.of(1, 0, 3)), false);
            assertEquals(Period.of(1, 2, 3).equals(Period.of(1, 2, 0)), false);
        });

        it('test_equals_self', () => {
            const test = Period.of(1, 2, 3);
            assertEquals(test.equals(test), true);
        });

        it('test_equals_null', () => {
            const test = Period.of(1, 2, 3);
            assertEquals(test.equals(null), false);
        });

        it('test_equals_otherClass', () => {
            const test = Period.of(1, 2, 3);
            assertEquals(test.equals(''), false);
        });

        //-----------------------------------------------------------------------
        it('test_hashCode', () => {
            const test5 = Period.ofDays(5);
            const test6 = Period.ofDays(6);
            const test5M = Period.ofMonths(5);
            const test5Y = Period.ofYears(5);
            assertEquals(test5.hashCode() === test5.hashCode(), true);
            assertEquals(test5.hashCode() === test6.hashCode(), false);
            assertEquals(test5.hashCode() === test5M.hashCode(), false);
            assertEquals(test5.hashCode() === test5Y.hashCode(), false);
        });

    });

    describe('toString()', () => {

        it('test_toString', function () {
            data_toString().forEach((data) => {
                test_toString.apply(this, data);
            });
        });

        function test_toString(input, expected) {
            assertEquals(input.toString(), expected);
            assertEquals(input.toJSON(), input.toString());
        }

    });

    //-----------------------------------------------------------------------

    function assertPeriod(test, y, mo, d) {
        assertEquals(test.years(), y, 'years');
        assertEquals(test.months(), mo, 'months');
        assertEquals(test.days(), d, 'days');
    }


    function pymd(y, m, d) {
        return Period.of(y, m, d);
    }

    function date(y, m, d) {
        return LocalDate.of(y, m, d);
    }

});