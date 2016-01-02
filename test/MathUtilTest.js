import {expect} from 'chai';

import {MathUtil} from '../src/MathUtil';

describe('floorDiv and floorMod methods', () => {

    it('testFloorDivMod', () => {
        testFloorDivMod(4, 3, 1, 1);
        testFloorDivMod(3, 3, 1, 0);
        testFloorDivMod(2, 3, 0, 2);
        testFloorDivMod(1, 3, 0, 1);
        testFloorDivMod(0, 3, 0, 0);
        testFloorDivMod(4, -3, -2, -2);
        testFloorDivMod(3, -3, -1, 0);
        testFloorDivMod(2, -3, -1, -1);
        testFloorDivMod(1, -3, -1, -2);
        testFloorDivMod(0, -3, 0, 0);
        testFloorDivMod(-1, 3, -1, 2);
        testFloorDivMod(-2, 3, -1, 1);
        testFloorDivMod(-3, 3, -1, 0);
        testFloorDivMod(-4, 3, -2, 2);
        testFloorDivMod(-1, -3, 0, -1);
        testFloorDivMod(-2, -3, 0, -2);
        testFloorDivMod(-3, -3, 1, 0);
        testFloorDivMod(-4, -3, 1, -1);

        testFloorDivMod(Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER, 0);
        testFloorDivMod(Number.MAX_SAFE_INTEGER, -1, -Number.MAX_SAFE_INTEGER, 0);
        testFloorDivMod(Number.MAX_SAFE_INTEGER, 3, 3002399751580330, 1);
        testFloorDivMod(Number.MAX_SAFE_INTEGER - 1, 3, 3002399751580330, 0);
        testFloorDivMod(Number.MAX_SAFE_INTEGER - 2, 3, 3002399751580329, 2);

        testFloorDivMod(Number.MIN_SAFE_INTEGER + 1, 3, -3002399751580330, 0);
        testFloorDivMod(Number.MIN_SAFE_INTEGER, -1, Number.MAX_SAFE_INTEGER, 0);

        // following tests fails because the end of javascript floating point accuracy reached
        //testFloorDivMod(Number.MIN_SAFE_INTEGER, 3, -3002399751580331, 2);

        // TODO research where the boundaries for MIN/ MAX seconds are
        // same test for Instant.MIN_SECONDS
        testFloorDivMod(-31619087596800, 3, -10539695865600, 0);
        testFloorDivMod(-31619087596800+1, 3, -10539695865600, 1);
        testFloorDivMod(-31619087596800+2, 3, -10539695865600, 2);

        // same test for Instant.MAX_SECONDS
        testFloorDivMod(31494784694400, 3, 10498261564800, 0);
        testFloorDivMod(31494784694400-1, 3, 10498261564799, 2);
        testFloorDivMod(31494784694400-2, 3, 10498261564799, 1);
    });

    function testFloorDivMod(x, y, divExpected, modExpected){
        testFloorDiv(x, y, divExpected);
        testFloorMod(x, y, modExpected);
    }

    function testFloorDiv(x, y, divExpected){
        var result = MathUtil.floorDiv(x, y);
        expect(result, `testFloorDiv: ${x}, ${y}, ${divExpected}`).to.equal(divExpected)
    }

    function testFloorMod(x, y, modExpected){
        var result = MathUtil.floorMod(x, y);
        expect(result, `testFloorMod: ${x}, ${y}, ${modExpected}`).to.equal(modExpected)
    }


});