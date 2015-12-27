import {expect} from 'chai';
import {LocalDate} from '../../src/LocalDate';
import {isCoverageTestRunner} from '../testUtils';

describe('tck.java.time.TCKLocalDate', () => {
    var TEST_2007_07_15;
    before(() => {
        TEST_2007_07_15 = LocalDate.of(2007, 7, 15);

        //LocalDate max = LocalDate.MAX;
        //LocalDate min = LocalDate.MIN;
        //MAX_VALID_EPOCHDAYS = max.toEpochDay();
        //MIN_VALID_EPOCHDAYS = min.toEpochDay();
        //MAX_DATE = max;
        //MIN_DATE = min;
        //MAX_INSTANT = max.atStartOfDay(ZoneOffset.UTC).toInstant();
        //MIN_INSTANT = min.atStartOfDay(ZoneOffset.UTC).toInstant();    
    });

    /**
     * check the provided LocalDate with the year, month, day values
     * @param {LocalDate} test
     * @param {int} y
     * @param {int} m
     * @param {int} d
     */
    function check (test, y, m, d) {
        expect(test.year()).to.equal(y);
        //expect(test.month().getValue()).to.equal(m);// TODO: Month implementation
        expect(test.month()).to.equal(m);
        expect(test.day()).to.equal(d);
        expect(test).to.equal(test);
        expect(LocalDate.of(y, m, d)).to.eql(test);
    }

    describe('of() factories', () => {

        it.skip('factory_of_intsMonth', () => {
            expect(LocalDate.of(2007, Month.JULY, 15)).to.eql(TEST_2007_07_15);
        });

        it.skip('factory_of_intsMonth_29febNonLeap', () => {
            expect(() => {
                LocalDate.of(2007, Month.FEBRUARY, 29)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_intsMonth_31apr', () => {
            expect(() => {
                LocalDate.of(2007, Month.APRIL, 31)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_intsMonth_dayTooLow', () => {
            expect(() => {
                LocalDate.of(2007, Month.JANUARY, 0)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_intsMonth_dayTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, Month.JANUARY, 32)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_intsMonth_nullMonth', () => {
            expect(() => {
                LocalDate.of(2007, null, 30)
            }).to.throw(NullPointerException);
        });

        it.skip('factory_of_intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDate.of(Number.MIN_SAFE_INTEGER, null, 30)
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_ints', () => {
            check(TEST_2007_07_15, 2007, 7, 15)
        });

        it.skip('factory_of_ints_29febNonLeap', () => {
            expect(() => {
                LocalDate.of(2007, 2, 29)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_31apr', () => {
            expect(() => {
                LocalDate.of(2007, 4, 31)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_dayTooLow', () => {
            expect(() => {
                LocalDate.of(2007, 1, 0)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_dayTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, 1, 32)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_monthTooLow', () => {
            expect(() => {
                LocalDate.of(2007, 0, 1)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_monthTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, 13, 1)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_of_ints_yearTooLow', () => {
            expect(() => {
                LocalDate.of(Number.MIN_SAFE_INTEGER, 1, 1)
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it.skip('factory_ofYearDay_ints_nonLeap', () => {
            var date = LocalDate.of(2007, 1, 1);
            for (i = 1; i < 365; i++) {
                expect(LocalDate.ofYearDay(2007, i)).to.eql(date);
                date = next(date);
            }
        });

        it.skip('factory_ofYearDay_ints_leap', () => {
            var date = LocalDate.of(2008, 1, 1);
            for (i = 1; i < 366; i++) {
                expect(LocalDate.ofYearDay(2008, i)).to.eql(date);
                date = next(date);
            }
        });

        it.skip('factory_ofYearDay_ints_366nonLeap', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 366)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_ofYearDay_ints_dayTooLow', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 0)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_ofYearDay_ints_dayTooHigh', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 367)
            }).to.throw(DateTimeException);
        });

        it.skip('factory_ofYearDay_ints_yearTooLow', () => {
            expect(() => {
                LocalDate.ofYearDay(Number.MIN_SAFE_INTEGER, 1)
            }).to.throw(DateTimeException);
        });

    });
});

