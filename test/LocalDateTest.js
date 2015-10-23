import {expect} from 'chai';
import {LocalDate} from '../src/LocalDate';

describe('LocalDate', () => {

    it('toString should convert to an ISO-8601 String', () => {
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

    it('toEpochDay should convert to the epoch day ', () => {
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

    it('plusDays should walk through one year', () => {
        // var DAYS_PER_CYCLE = 146097;

        var start = new LocalDate(1970, 1, 1);
        var current = start;
        for(var i=0; i<365; i++){
            current = current.plusDays(1);
        }
        expect(current.year()).to.equal(start.year() + 1);
        expect(current.month()).to.equal(start.month());
        expect(current.day()).to.equal(start.day());

    });


  });
