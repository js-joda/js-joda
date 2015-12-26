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
        //expect(LocalDate.of(y, m, d)).to.equal(test); // TODO: equality check
        expect(LocalDate.of(y, m, d).toString()).to.equal(test.toString());
    }

    describe('of() factories', () => {

        it('factory_of_ints', () => {
            check(TEST_2007_07_15, 2007, 7, 15)
        });

    });
});

