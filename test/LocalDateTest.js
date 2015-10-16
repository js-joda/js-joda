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
  });
