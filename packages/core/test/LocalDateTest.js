/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import './_init';

import {Clock} from '../src/Clock';
import {LocalDate} from '../src/LocalDate';
import {isCoverageTestRunner} from './testUtils';

/**
 * most of this tests are obsolete, because the test cases are covered by the reference tests
 */

describe('Creating a LocalDate instance', () => {
    it('should create a LocalDate instance for a valid date', () => {
        expect(LocalDate.of(1970, 1, 1)).to.be.an.instanceOf(LocalDate);
        expect(LocalDate.of(2016, 2, 29)).to.be.an.instanceOf(LocalDate);
    });
    

    it('should fail with an AssertionError for invalid dates', () => {
        expect(() => {LocalDate.of(1970, 1, -1);}).to.throw(Error);
        expect(() => {LocalDate.of(1970, -1, 1);}).to.throw(Error);
        expect(() => {LocalDate.of(1970, 2, 29);}).to.throw(Error);
        expect(() => {LocalDate.of(1970, 2, 30);}).to.throw(Error);
        expect(() => {LocalDate.of(1970, 4, 31);}).to.throw(Error);
        expect(() => {LocalDate.of(2017.5, 1, 1);}).to.throw(Error);
        expect(() => {LocalDate.of(2017, 1.5, 1);}).to.throw(Error);
        expect(() => {LocalDate.of(2017, 1, 1.5);}).to.throw(Error);
    });

    describe('from strings', () => {
        it('should create a LocalDate instance equal to one from numbers for a valid date', () => {
            expect(LocalDate.of('1970', '1', '1')).to.deep.equal(LocalDate.of(1970, 1, 1));
            expect(LocalDate.of('2016', '2', '29')).to.deep.equal(LocalDate.of(2016, 2, 29));
        });
        
        it('should fail with an AssertionError for unparseable dates', () => {
            expect(() => {LocalDate.of('xxxx', '4', '31');}).to.throw(Error);
            expect(() => {LocalDate.of('1970', 'x', '30');}).to.throw(Error);
            expect(() => {LocalDate.of('1970', '4', 'xx');}).to.throw(Error);
        });
        
        it('should fail with an AssertionError for invalid dates', () => {
            expect(() => {LocalDate.of('1970', '4', '31');}).to.throw(Error);
        });
    });
});


describe('Using a LocalDate instance', () => {

    describe('when calling toString()', () => {
        it('should convert valid dates to an ISO-8601 String', () => {
            let d;

            d = LocalDate.of(1970, 1, 1);
            expect(d.toString()).to.equal('1970-01-01');

            d = LocalDate.of(1970, 12, 24);
            expect(d.toString()).to.equal('1970-12-24');

            d = LocalDate.of(1, 1, 1);
            expect(d.toString()).to.equal('0001-01-01');

            d = LocalDate.of(-100, 7, 13);
            expect(d.toString()).to.equal('-0100-07-13');

            d = LocalDate.of(10000, 1, 1);
            expect(d.toString()).to.equal('+10000-01-01');

            d = LocalDate.of(-10000, 1, 1);
            expect(d.toString()).to.equal('-10000-01-01');

        });

        it('should convert to same value as toString()', () => {
            const d = LocalDate.of(1970, 1, 1);
            expect(d.toString()).to.equal(d.toJSON());
        });
    });

    describe('when calling toEpochDay()', () => {
        it('should convert to the epoch day ', () => {
            let d;

            d = LocalDate.of(1970, 1, 1);
            expect(d.toEpochDay()).to.equal(0);

            d = LocalDate.of(1971, 1, 1);
            expect(d.toEpochDay()).to.equal(365);

            d = LocalDate.of(2015, 12, 31);
            expect(d.toEpochDay()).to.equal(16800);

            d = LocalDate.of(-40, 12, 31);
            expect(d.toEpochDay()).to.equal(-733773);
        });
    });

    describe('when calling plusDays(day)', () => {
        it('should return the same instance when adding zero days', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = oneDay.plusDays(0);
            expect(oneDay).to.equal(otherDay);
        });

        it('should return the next day when adding one day', () => {
            const oneDay = LocalDate.of(1970, 1, 1).plusDays(1);
            expect(oneDay.toString()).to.equal('1970-01-02');
        });

        it('should walk through one year by adding one day after the other', () => {
            const start = LocalDate.of(1970, 1, 1);
            let current = start;
            for (let i = 0; i < 365; i++) {
                current = current.plusDays(1);
            }
            expect(current.year()).to.equal(start.year() + 1);
            expect(current.monthValue()).to.equal(start.monthValue());
            expect(current.dayOfMonth()).to.equal(start.dayOfMonth());

        });

        const itSkipInCoverageRunner = isCoverageTestRunner() ? it.skip : it;
        itSkipInCoverageRunner('should walk through a 400 years cycle by adding one day after the other', () => {
            const DAYS_PER_400_YEARS_CYCLE = 146097;
            const start = LocalDate.of(1970, 1, 1);
            let current = start;
            for (let i = 0; i < DAYS_PER_400_YEARS_CYCLE; i++) {
                current = current.plusDays(1);
            }
            expect(current.year()).to.equal(start.year() + 400);
            expect(current.monthValue()).to.equal(start.monthValue());
            expect(current.dayOfMonth()).to.equal(start.dayOfMonth());

        });

        it('should handle leap and non leap years', () => {
            let d = LocalDate.of(2015, 2, 28);
            expect(d.plusDays(1).toString()).to.equal('2015-03-01');

            d = LocalDate.of(2016, 2, 28);
            expect(d.plusDays(1).toString()).to.equal('2016-02-29');
            expect(d.plusDays(2).toString()).to.equal('2016-03-01');
        });

        it('should add days for dates B.C.', () => {
            let d = LocalDate.of(-2000, 1, 1);
            expect(d.plusDays(1).toString()).to.equal('-2000-01-02');

            d = LocalDate.of(-10000, 12, 31);
            expect(d.plusDays(1).toString()).to.equal('-9999-01-01');
        });

    });

    describe('when calling plusDays(day) with a negative argument', () => {
        it('should return the same instance when subtracting zero days', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = oneDay.plusDays(-0);
            expect(oneDay).to.equal(otherDay);
        });

        it('should return the day before when subtracting one day', () => {
            const oneDay = LocalDate.of(1970, 1, 1).plusDays(-1);
            expect(oneDay.toString()).to.equal('1969-12-31');
        });
    });

    describe('when calling minusDays(day)', () => {
        it('should return the same instance when subtracting zero days', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = oneDay.minusDays(0);
            expect(oneDay).to.equal(otherDay);
        });

        it('should return the day before when subtracting one day', () => {
            const oneDay = LocalDate.of(1970, 1, 1).minusDays(1);
            expect(oneDay.toString()).to.equal('1969-12-31');
        });
    });

    describe('when calling minusDays(day) with a negative argument', () => {
        it('should return the same instance when adding zero days', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = oneDay.minusDays(-0);
            expect(oneDay).to.equal(otherDay);
        });

        it('should return the next day when adding one day', () => {
            const oneDay = LocalDate.of(1970, 1, 1).minusDays(-1);
            expect(oneDay.toString()).to.equal('1970-01-02');
        });
    });

    describe('when calling equals', () => {
        it('should return true if the instances are equal', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            expect(oneDay.equals(oneDay)).to.be.true;
        });
        it('should return true if the two dates are equal', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = LocalDate.of(1970, 1, 1);
            expect(oneDay.equals(otherDay)).to.be.true;
        });
        it('should return false if the year of the two dates are not equal', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = LocalDate.of(1971, 1, 1);
            expect(oneDay.equals(otherDay)).to.be.false;
        });
        it('should return false if the month of the two dates are not equal', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = LocalDate.of(1970, 2, 1);
            expect(oneDay.equals(otherDay)).to.be.false;
        });
        it('should return false if the dayOfMonth of the two dates are not equal', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = LocalDate.of(1970, 1, 3);
            expect(oneDay.equals(otherDay)).to.be.false;
        });
        it('should return false if the other date is not an instance of LocalDate', () => {
            const oneDay = LocalDate.of(1970, 1, 1);
            const otherDay = {};
            expect(oneDay.equals(otherDay)).to.be.false;
        });
    });

    describe('when calling now', () => {
        it('should return instance of LocalDate', () => {
            const oneDay = LocalDate.now();
            expect(oneDay).to.be.instanceof(LocalDate);
        });

        it('should return instance of LocalDate for a UTC clock', () => {
            const oneDay = LocalDate.now(Clock.systemUTC());
            expect(oneDay).to.be.instanceof(LocalDate);
        });
        it('should return instance of LocalDate for the system default clock', () => {
            const oneDay = LocalDate.now(Clock.systemDefaultZone());
            expect(oneDay).to.be.instanceof(LocalDate);
        });
    });

});
