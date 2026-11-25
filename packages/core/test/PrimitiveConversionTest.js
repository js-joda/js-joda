/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import './_init';

import { DayOfWeek } from '../src/DayOfWeek';
import { Duration } from '../src/Duration';
import { LocalDate } from '../src/LocalDate';
import { Month } from '../src/Month';
import { MonthDay } from '../src/MonthDay';
import { ZoneId } from '../src/ZoneId';
import { ZoneOffset } from '../src/ZoneOffset';

describe('coercing to primitive', () => {
    const itNotInEs5 = typeof Symbol === 'undefined' || !Symbol.toPrimitive ? it.skip : it;

    const guardedValues = [
        ['Month', Month.MARCH],
        ['DayOfWeek', DayOfWeek.MONDAY],
        ['MonthDay', MonthDay.of(3, 1)],
        ['ZoneOffset', ZoneOffset.ofHours(2)],
        ['ZoneId.of(\'UTC+01:00\')', ZoneId.of('UTC+01:00')],
        ['ZoneId.systemDefault()', ZoneId.systemDefault()],
        ['LocalDate', LocalDate.of(2020, 1, 1)],
        ['Duration', Duration.ofHours(1)],
    ];

    function catchMessage(fn) {
        try {
            fn();
        } catch (error) {
            return error.message;
        }
        throw new Error('expected an error to be thrown');
    }

    guardedValues.forEach(([name, value]) => {
        describe(name, () => {
            itNotInEs5('should throw a TypeError with Number()', () => {
                expect(() => Number(value)).to.throw(TypeError);
            });

            itNotInEs5('should throw a TypeError with unary +', () => {
                expect(() => +value).to.throw(TypeError);
            });

            itNotInEs5('should throw a TypeError with -', () => {
                expect(() => value - value).to.throw(TypeError);
            });

            itNotInEs5('should throw a TypeError with <', () => {
                expect(() => value < value).to.throw(TypeError);
            });
        });
    });

    describe('spec scenarios', () => {
        itNotInEs5('should throw for Month.DECEMBER < Month.FEBRUARY', () => {
            expect(() => Month.DECEMBER < Month.FEBRUARY).to.throw(TypeError);
        });

        itNotInEs5('should throw for Month.MARCH - Month.JANUARY', () => {
            expect(() => Month.MARCH - Month.JANUARY).to.throw(TypeError);
        });

        itNotInEs5('should throw for ZoneOffset.ofHours(2) < ZoneOffset.ofHours(1)', () => {
            expect(() => ZoneOffset.ofHours(2) < ZoneOffset.ofHours(1)).to.throw(TypeError);
        });

        itNotInEs5('should throw for Duration.ofHours(1) < Duration.ofHours(2)', () => {
            expect(() => Duration.ofHours(1) < Duration.ofHours(2)).to.throw(TypeError);
        });

        itNotInEs5('should keep throwing for LocalDate.of(2020, 1, 1) < LocalDate.of(2021, 1, 1)', () => {
            expect(() => LocalDate.of(2020, 1, 1) < LocalDate.of(2021, 1, 1)).to.throw(TypeError);
        });
    });

    describe('instance passed where a number is expected', () => {
        itNotInEs5('should throw for Month.of(Month.MARCH)', () => {
            expect(() => Month.of(Month.MARCH)).to.throw();
        });

        itNotInEs5('should throw for DayOfWeek.of(DayOfWeek.MONDAY)', () => {
            expect(() => DayOfWeek.of(DayOfWeek.MONDAY)).to.throw();
        });

        itNotInEs5('should throw for LocalDate.of(2020, 1, Month.MARCH)', () => {
            expect(() => LocalDate.of(2020, 1, Month.MARCH)).to.throw();
        });
    });

    describe('error message', () => {
        itNotInEs5('should name the alternatives of a TemporalAccessor', () => {
            const message = catchMessage(() => Number(Month.MARCH));

            expect(message).to.include('A conversion from TemporalAccessor to a number is not allowed');
            expect(message).to.include('.compareTo()');
            expect(message).to.include('.equals()');
            expect(message).to.include('.value()');
        });

        itNotInEs5('should name the alternatives of a ZoneId', () => {
            const message = catchMessage(() => Number(ZoneOffset.ofHours(2)));

            expect(message).to.include('A conversion from ZoneId to a number is not allowed');
            expect(message).to.include('.equals()');
            expect(message).to.include('.compareTo()');
            expect(message).to.not.include('.isBefore()');
            expect(message).to.not.include('.value()');
        });

        itNotInEs5('should name the alternatives of a TemporalAmount', () => {
            const message = catchMessage(() => Number(Duration.ofHours(1)));

            expect(message).to.include('A conversion from TemporalAmount to a number is not allowed');
            expect(message).to.include('.equals()');
            expect(message).to.include('.compareTo()');
            expect(message).to.not.include('.isBefore()');
            expect(message).to.not.include('.value()');
        });
    });

    describe('string conversion', () => {
        it('should return toString() in a template literal', () => {
            expect(`${Month.MARCH}`).to.equal('MARCH');
        });

        it('should return toString() when concatenating with a string', () => {
            // eslint-disable-next-line prefer-template
            expect('offset ' + ZoneOffset.ofHours(2)).to.equal('offset +02:00');
        });

        it('should return toString() with loose equality', () => {
            // eslint-disable-next-line eqeqeq
            expect(ZoneOffset.ofHours(2) == '+02:00').to.equal(true);
        });
    });
});
