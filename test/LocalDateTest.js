import {expect} from 'chai';
import {LocalDate} from '../src/LocalDate';
import {isCoverageTestRunner} from './testUtils';

describe('Creating a LocalDate instance', () => {
    it('should create a LocalDate instance for a valid date', () => {
        expect(new LocalDate(1970, 1, 1)).to.be.an.instanceOf(LocalDate);
        expect(new LocalDate(2016, 2, 29)).to.be.an.instanceOf(LocalDate);
    });

    it('should fail with an AssertionError for invalid dates', () => {
        expect(() => {new LocalDate(1970, 1, -1)}).to.throw(Error);
        expect(() => {new LocalDate(1970, -1, 1)}).to.throw(Error);
        expect(() => {new LocalDate(1970, 2, 29)}).to.throw(Error);
        expect(() => {new LocalDate(1970, 2, 30)}).to.throw(Error);
        expect(() => {new LocalDate(1970, 4, 31)}).to.throw(Error);
    });

});

describe('Using a LocalDate instance', () => {

    describe('when calling toString()', () => {
        it('should convert valid dates to an ISO-8601 String', () => {
            var d;

            d = new LocalDate(1970, 1, 1);
            expect(d.toString()).to.equal("1970-01-01");

            d = new LocalDate(1970, 12, 24);
            expect(d.toString()).to.equal("1970-12-24");

            d = new LocalDate(1, 1, 1);
            expect(d.toString()).to.equal("0001-01-01");

            d = new LocalDate(-100, 7, 13);
            expect(d.toString()).to.equal("-0100-07-13");

            d = new LocalDate(10000, 1, 1);
            expect(d.toString()).to.equal("+10000-01-01");

            d = new LocalDate(-10000, 1, 1);
            expect(d.toString()).to.equal("-10000-01-01")

        });
    });

    describe('when calling toEpochDay()', () => {
        it('should convert to the epoch day ', () => {
            var d;

            d = new LocalDate(1970, 1, 1);
            expect(d.toEpochDay()).to.equal(0);

            d = new LocalDate(1971, 1, 1);
            expect(d.toEpochDay()).to.equal(365);

            d = new LocalDate(2015, 12, 31);
            expect(d.toEpochDay()).to.equal(16800);

            d = new LocalDate(-40, 12, 31);
            expect(d.toEpochDay()).to.equal(-733773);
        });
    });

    describe('when calling plusDays(day)', () => {
        it('should return the same instance when adding zero days', () => {
            var oneDay = new LocalDate(1970, 1, 1);
            var otherDay = oneDay.plusDays(0)
            expect(oneDay).to.equal(otherDay)
        });

        it('should walk through one year by adding one day after the other', () => {
            var start = new LocalDate(1970, 1, 1);
            var current = start;
            for (var i = 0; i < 365; i++) {
                current = current.plusDays(1);
            }
            expect(current.year()).to.equal(start.year() + 1);
            expect(current.month()).to.equal(start.month());
            expect(current.day()).to.equal(start.day());

        });

        var itSkipInCoverageRunner = isCoverageTestRunner() ? it.skip : it;
        itSkipInCoverageRunner('should walk through a 400 years cycle by adding one day after the other', () => {
            var DAYS_PER_400_YEARS_CYCLE = 146097;
            var start = new LocalDate(1970, 1, 1);
            var current = start;
            for (var i = 0; i < DAYS_PER_400_YEARS_CYCLE; i++) {
                current = current.plusDays(1);
            }
            expect(current.year()).to.equal(start.year() + 400);
            expect(current.month()).to.equal(start.month());
            expect(current.day()).to.equal(start.day());

        });

        it('should handle leap and non leap years', () => {
            var d = new LocalDate(2015, 2, 28);
            expect(d.plusDays(1).toString()).to.equal('2015-03-01');

            d = new LocalDate(2016, 2, 28);
            expect(d.plusDays(1).toString()).to.equal('2016-02-29');
            expect(d.plusDays(2).toString()).to.equal('2016-03-01');
        });

        it('should add days for dates B.C.', () => {
            var d = new LocalDate(-2000, 1, 1);
            expect(d.plusDays(1).toString()).to.equal('-2000-01-02');

            d = new LocalDate(-10000, 12, 31);
            expect(d.plusDays(1).toString()).to.equal('-9999-01-01');
        });

    });

});
