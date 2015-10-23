import {expect} from 'chai';
import {ValueRange} from '../../src/temporal/ValueRange';

describe('ValueRange', () => {

    it('should define a ValueRange', () => {
        var minMaxValueRange = ValueRange.of(0,10);

        expect(minMaxValueRange.isValidValue(0)).to.be.true;
        expect(minMaxValueRange.isValidValue(2)).to.be.true;
        expect(minMaxValueRange.isValidValue(10)).to.be.true;
        expect(minMaxValueRange.isValidValue(-1)).to.be.false;
        expect(minMaxValueRange.isValidValue(11)).to.be.false;

        expect(minMaxValueRange.checkValidValue(10)).to.be.undefined;

    });

});
