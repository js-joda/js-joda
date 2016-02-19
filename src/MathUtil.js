/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {ArithmeticException} from './errors';

export const MAX_SAFE_INTEGER = 9007199254740991;
export const MIN_SAFE_INTEGER = -9007199254740991;

/**
 * Math helper with static function for integer operations
 */
export class MathUtil {
    static intDiv(x, y) {
        var r = x/y;
        if(r === 0){
            return 0;
        } else if(r < 0){
            r = Math.ceil(r);
        } else {
            r = Math.floor(r);
        }
        return MathUtil.safeZero(r);
    }

    static intMod(x, y) {
        var r = x - MathUtil.intDiv(x, y) * y;
        if(r === 0){
            return 0;
        } else if(r < 0){
            r = Math.ceil(r);
        } else {
            r = Math.floor(r);
        }
        return MathUtil.safeZero(r);
    }

    static floorDiv(x, y){
        var r = Math.floor(x / y);
        return MathUtil.safeZero(r);
    }

    static floorMod(x, y){
        var r = x - MathUtil.floorDiv(x, y) * y;
        return MathUtil.safeZero(r);
    }
    
    static safeAdd(x, y) {
        MathUtil.verifyInt(x);
        MathUtil.verifyInt(y);
        if (x === 0) {
            return MathUtil.safeZero(y);
        }
        if (y === 0) {
            return MathUtil.safeZero(x);
        }
        var r = MathUtil.safeToInt(x + y);
        if (r === x || r === y) {
            throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
        }
        return r;
    }
    
    static safeSubtract(x, y) {
        MathUtil.verifyInt(x);
        MathUtil.verifyInt(y);
        if (x === 0 && y === 0) {
            return 0;
        } else if (x === 0) {
            return MathUtil.safeZero(-1 * y);
        } else if (y === 0) {
            return MathUtil.safeZero(x);
        }
        return MathUtil.safeToInt(x - y);
    }

    static safeMultiply(x, y) {
        MathUtil.verifyInt(x);
        MathUtil.verifyInt(y);
        if (x === 1) {
            return MathUtil.safeZero(y);
        }
        if (y === 1) {
            return MathUtil.safeZero(x);
        }
        if (x === 0 || y === 0) {
            return 0;
        }
        let r = MathUtil.safeToInt(x * y);
        if (r / y !== x || (x === MIN_SAFE_INTEGER && y === -1) || (y === MIN_SAFE_INTEGER && x === -1)) {
            throw new ArithmeticException('Multiplication overflows: ' + x + ' * ' + y);
        }
        return r;
    }

    static parseInt(value) {
        var r = parseInt(value);
        return MathUtil.safeToInt(r);
    }

    static safeToInt(value) {
        MathUtil.verifyInt(value);
        return MathUtil.safeZero(value);
    }

    static verifyInt(value){
        if (value == null) {
            throw new ArithmeticException(`Invalid value: '${value}', using null or undefined as argument`);
        }
        if (isNaN(value)) {
            throw new ArithmeticException('Invalid int value, using NaN as argument');
        }
        if (value > MAX_SAFE_INTEGER || value < MIN_SAFE_INTEGER) {
            throw new ArithmeticException('Calculation overflows an int: ' + value);
        }
    }

    static safeZero(value){
        return value === 0 ? 0 : value;
    }

    /**
     * Compares two Numbers.
     *
     * @param {Number} a  the first value
     * @param {Number} b  the second value
     * @return {Number} the result
     */
    static compareNumbers(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

}

MathUtil.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
MathUtil.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;

