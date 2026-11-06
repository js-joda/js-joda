/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { LocalDate } from '@js-joda/core';

import './_init';

import { DayOfMonth } from '../src/DayOfMonth';
import { DayOfYear } from '../src/DayOfYear';
import { Quarter } from '../src/Quarter';

describe('coercing to primitive', () => {
    const itNotInEs5 = typeof Symbol === 'undefined' || !Symbol.toPrimitive ? it.skip : it;

    const guardedValues = [
        ['Quarter', Quarter.Q1],
        ['DayOfMonth', DayOfMonth.of(5)],
        ['DayOfYear', DayOfYear.of(5)],
    ];

    guardedValues.forEach(([name, value]) => {
        describe(name, () => {
            itNotInEs5('should throw a TypeError with <', () => {
                expect(() => value < value).to.throw(TypeError);
            });

            itNotInEs5('should throw a TypeError with Number()', () => {
                expect(() => Number(value)).to.throw(TypeError);
            });

            it('should return toString() in a template literal', () => {
                expect(`${value}`).to.equal(value.toString());
            });

            it('should return toString() when concatenating with a string', () => {
                // eslint-disable-next-line prefer-template
                expect('value ' + value).to.equal('value ' + value.toString());
            });
        });
    });

    describe('instance passed where a number is expected', () => {
        itNotInEs5('should throw for Quarter.of(Quarter.Q1)', () => {
            expect(() => Quarter.of(Quarter.Q1)).to.throw();
        });

        itNotInEs5('should throw for DayOfMonth.of(DayOfMonth.of(1))', () => {
            expect(() => DayOfMonth.of(DayOfMonth.of(1))).to.throw();
        });

        itNotInEs5('should throw for DayOfYear.of(DayOfYear.of(1))', () => {
            expect(() => DayOfYear.of(DayOfYear.of(1))).to.throw();
        });

        itNotInEs5('should throw for LocalDate.of(2020, 1, DayOfMonth.of(5))', () => {
            expect(() => LocalDate.of(2020, 1, DayOfMonth.of(5))).to.throw();
        });
    });
});
