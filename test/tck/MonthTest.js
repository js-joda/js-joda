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
            for (let i of data_plus) {
                let [base, amount, expected] = i;
                expect(Month.of(base).plus(amount)).to.eql(Month.of(expected));
            }
        });

    });

    describe('minus(long), minus(long,unit)', () => {

        it('test_minus_long', () => {
            let data_plus = [
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
            for (let i of data_plus) {
                let [base, amount, expected] = i;
                expect(Month.of(base).minus(amount)).to.eql(Month.of(expected));
            }
        });
    });

});

