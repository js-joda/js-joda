import {expect} from 'chai';

import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {Month} from '../../src/Month';
import {DateTimeException} from '../../src/errors';

describe('tck.java.time.TCKMonth', () => {
    const MAX_LENGTH = 12;

    //-----------------------------------------------------------------------
    it('test_factory_int_singleton', () => {
        for (let i = 1; i <= MAX_LENGTH; i++) {
            let test = Month.of(i);
            expect(test.value()).to.eql(i);
        }
    });

    it('test_factory_int_tooLow', () => {
        expect(() => {
            Month.of(0);
        }).to.throw(DateTimeException);
    });

    it('test_factory_int_tooHigh', () => {
        expect(() => {
            Month.of(13);
        }).to.throw(DateTimeException);
    });

    //-----------------------------------------------------------------------
    // TODO: Month.from()
    it.skip('test_factory_CalendricalObject', () => {
        expect(Month.from(LocalDate.of(2011, 6, 6))).to.eql(Month.JUNE);
    });

    it.skip('test_factory_CalendricalObject_invalid_noDerive', () => {
        expect(() => {
            Month.from(LocalTime.of(12, 30));
        }).to.throw(DateTimeException);
    });

    it.skip('test_factory_CalendricalObject_null', () => {
        expect(() => {
            Month.from(null);
        }).to.throw(DateTimeException); // NullPointerException in JDK
    });

    describe('plus(long), plus(long,unit)', () => {

        it('test_plus_long', () => {
            let data_plus = [
                [1, -13, 12],
                [1, -12, 1],
                [1, -11, 2],
                [1, -10, 3],
                [1, -9, 4],
                [1, -8, 5],
                [1, -7, 6],
                [1, -6, 7],
                [1, -5, 8],
                [1, -4, 9],
                [1, -3, 10],
                [1, -2, 11],
                [1, -1, 12],
                [1, 0, 1],
                [1, 1, 2],
                [1, 2, 3],
                [1, 3, 4],
                [1, 4, 5],
                [1, 5, 6],
                [1, 6, 7],
                [1, 7, 8],
                [1, 8, 9],
                [1, 9, 10],
                [1, 10, 11],
                [1, 11, 12],
                [1, 12, 1],
                [1, 13, 2],

                [1, 1, 2],
                [2, 1, 3],
                [3, 1, 4],
                [4, 1, 5],
                [5, 1, 6],
                [6, 1, 7],
                [7, 1, 8],
                [8, 1, 9],
                [9, 1, 10],
                [10, 1, 11],
                [11, 1, 12],
                [12, 1, 1],

                [1, -1, 12],
                [2, -1, 1],
                [3, -1, 2],
                [4, -1, 3],
                [5, -1, 4],
                [6, -1, 5],
                [7, -1, 6],
                [8, -1, 7],
                [9, -1, 8],
                [10, -1, 9],
                [11, -1, 10],
                [12, -1, 11]
            ];
            for (let i in data_plus) {
                let [base, amount, expected] = data_plus[i];
                expect(Month.of(base).plus(amount)).to.eql(Month.of(expected));
            }
        });

    });

    describe('minus(long), minus(long,unit)', () => {

        it('test_minus_long', () => {
            let data_minus = [
                [1, -13, 2],
                [1, -12, 1],
                [1, -11, 12],
                [1, -10, 11],
                [1, -9, 10],
                [1, -8, 9],
                [1, -7, 8],
                [1, -6, 7],
                [1, -5, 6],
                [1, -4, 5],
                [1, -3, 4],
                [1, -2, 3],
                [1, -1, 2],
                [1, 0, 1],
                [1, 1, 12],
                [1, 2, 11],
                [1, 3, 10],
                [1, 4, 9],
                [1, 5, 8],
                [1, 6, 7],
                [1, 7, 6],
                [1, 8, 5],
                [1, 9, 4],
                [1, 10, 3],
                [1, 11, 2],
                [1, 12, 1],
                [1, 13, 12]
            ];
            for (let i in data_minus) {
                let [base, amount, expected] = data_minus[i];
                expect(Month.of(base).minus(amount)).to.eql(Month.of(expected));
            }
        });
    });

    describe('length(boolean)', () => {
        it('test_length_boolean_notLeapYear', () => {
            expect(Month.JANUARY.length(false)).to.eql(31);
            expect(Month.FEBRUARY.length(false)).to.eql(28);
            expect(Month.MARCH.length(false)).to.eql(31);
            expect(Month.APRIL.length(false)).to.eql(30);
            expect(Month.MAY.length(false)).to.eql(31);
            expect(Month.JUNE.length(false)).to.eql(30);
            expect(Month.JULY.length(false)).to.eql(31);
            expect(Month.AUGUST.length(false)).to.eql(31);
            expect(Month.SEPTEMBER.length(false)).to.eql(30);
            expect(Month.OCTOBER.length(false)).to.eql(31);
            expect(Month.NOVEMBER.length(false)).to.eql(30);
            expect(Month.DECEMBER.length(false)).to.eql(31);
        });
        it('test_length_boolean_leapYear', () => {
            expect(Month.JANUARY.length(true), 31);
            expect(Month.FEBRUARY.length(true), 29);
            expect(Month.MARCH.length(true), 31);
            expect(Month.APRIL.length(true), 30);
            expect(Month.MAY.length(true), 31);
            expect(Month.JUNE.length(true), 30);
            expect(Month.JULY.length(true), 31);
            expect(Month.AUGUST.length(true), 31);
            expect(Month.SEPTEMBER.length(true), 30);
            expect(Month.OCTOBER.length(true), 31);
            expect(Month.NOVEMBER.length(true), 30);
            expect(Month.DECEMBER.length(true), 31);
        });
    });

    describe('minLength()', () => {
        it('test_minLength', () => {
            expect(Month.JANUARY.minLength()).to.eql(31);
            expect(Month.FEBRUARY.minLength()).to.eql(28);
            expect(Month.MARCH.minLength()).to.eql(31);
            expect(Month.APRIL.minLength()).to.eql(30);
            expect(Month.MAY.minLength()).to.eql(31);
            expect(Month.JUNE.minLength()).to.eql(30);
            expect(Month.JULY.minLength()).to.eql(31);
            expect(Month.AUGUST.minLength()).to.eql(31);
            expect(Month.SEPTEMBER.minLength()).to.eql(30);
            expect(Month.OCTOBER.minLength()).to.eql(31);
            expect(Month.NOVEMBER.minLength()).to.eql(30);
            expect(Month.DECEMBER.minLength()).to.eql(31);
        });
    });

    describe('maxLength()', () => {
        it('test_maxLength', () => {
            expect(Month.JANUARY.maxLength()).to.eql(31);
            expect(Month.FEBRUARY.maxLength()).to.eql(29);
            expect(Month.MARCH.maxLength()).to.eql(31);
            expect(Month.APRIL.maxLength()).to.eql(30);
            expect(Month.MAY.maxLength()).to.eql(31);
            expect(Month.JUNE.maxLength()).to.eql(30);
            expect(Month.JULY.maxLength()).to.eql(31);
            expect(Month.AUGUST.maxLength()).to.eql(31);
            expect(Month.SEPTEMBER.maxLength()).to.eql(30);
            expect(Month.OCTOBER.maxLength()).to.eql(31);
            expect(Month.NOVEMBER.maxLength()).to.eql(30);
            expect(Month.DECEMBER.maxLength()).to.eql(31);
        });
    });

    describe('firstDayOfYear(boolean)', () => {
        it('test_firstDayOfYear_notLeapYear', () => {
            expect(Month.JANUARY.firstDayOfYear(false)).to.eql(1);
            expect(Month.FEBRUARY.firstDayOfYear(false)).to.eql(1 + 31);
            expect(Month.MARCH.firstDayOfYear(false)).to.eql(1 + 31 + 28);
            expect(Month.APRIL.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31);
            expect(Month.MAY.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30);
            expect(Month.JUNE.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31);
            expect(Month.JULY.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30);
            expect(Month.AUGUST.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30 + 31);
            expect(Month.SEPTEMBER.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31);
            expect(Month.OCTOBER.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30);
            expect(Month.NOVEMBER.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31);
            expect(Month.DECEMBER.firstDayOfYear(false)).to.eql(1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30);
        });
        it('test_firstDayOfYear_leapYear', () => {
            expect(Month.JANUARY.firstDayOfYear(true)).to.eql(1);
            expect(Month.FEBRUARY.firstDayOfYear(true)).to.eql(1 + 31);
            expect(Month.MARCH.firstDayOfYear(true)).to.eql(1 + 31 + 29);
            expect(Month.APRIL.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31);
            expect(Month.MAY.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30);
            expect(Month.JUNE.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31);
            expect(Month.JULY.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30);
            expect(Month.AUGUST.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30 + 31);
            expect(Month.SEPTEMBER.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31);
            expect(Month.OCTOBER.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30);
            expect(Month.NOVEMBER.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31);
            expect(Month.DECEMBER.firstDayOfYear(true)).to.eql(1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30);
        });
    });

    describe('firstDayOfYear(boolean)', () => {
        it('test_firstMonthOfQuarter', () => {
            expect(Month.JANUARY.firstMonthOfQuarter()).to.eql(Month.JANUARY);
            expect(Month.FEBRUARY.firstMonthOfQuarter()).to.eql(Month.JANUARY);
            expect(Month.MARCH.firstMonthOfQuarter()).to.eql(Month.JANUARY);
            expect(Month.APRIL.firstMonthOfQuarter()).to.eql(Month.APRIL);
            expect(Month.MAY.firstMonthOfQuarter()).to.eql(Month.APRIL);
            expect(Month.JUNE.firstMonthOfQuarter()).to.eql(Month.APRIL);
            expect(Month.JULY.firstMonthOfQuarter()).to.eql(Month.JULY);
            expect(Month.AUGUST.firstMonthOfQuarter()).to.eql(Month.JULY);
            expect(Month.SEPTEMBER.firstMonthOfQuarter()).to.eql(Month.JULY);
            expect(Month.OCTOBER.firstMonthOfQuarter()).to.eql(Month.OCTOBER);
            expect(Month.NOVEMBER.firstMonthOfQuarter()).to.eql(Month.OCTOBER);
            expect(Month.DECEMBER.firstMonthOfQuarter()).to.eql(Month.OCTOBER);
        });
    });

});

