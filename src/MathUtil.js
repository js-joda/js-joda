/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {ArithmeticException} from './errors';

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.pow(2, 53) - 1; // Number.MAX_SAFE_INTEGER not defined in #@#$%! PhantomJS
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : -(Math.pow(2, 53) - 1); // Number.MIN_SAFE_INTEGER not defined in #@#$%! PhantomJS

/**
 * Math helper with static function for integer operations
 */
export class MathUtil {
    static intDiv(x, y) {
        var r = x/y;
        if(r < 0){
            return Math.ceil(r);
        } else {
            return Math.floor(r);
        }
    }

    static intMod(x, y) {
        var r = x - MathUtil.intDiv(x, y) * y;
        if(r < 0){
            return Math.ceil(r);
        } else {
            return Math.floor(r);
        }
    }

    static floorDiv(x, y){
        var r = Math.floor(x / y);
        return r;
    }

    static floorMod(x, y){
        var r = x - MathUtil.floorDiv(x, y) * y;
        return r;
    }
    
    static safeAdd(x, y) {
        if (x === 0) {
            let r = y;
            if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER) {
                throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
            }
            return r;
        }
        if (y === 0) {
            let r = x;
            if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER) {
                throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
            }
            return r;
        }
        if (x === undefined || y === undefined) {
            throw new ArithmeticException('Invalid addition using undefined as argument');
        }
        if (isNaN(x) || isNaN(y)) {
            throw new ArithmeticException('Invalid addition using NaN as argument');
        }
        let r = x + y;
        // detect overflow, since neither x nor y are 0 (checked above) r cannot be === x or === y
        // TODO: is this correct and complete?
        if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER || r === x || r === y) {
            throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
        }
        return r;
    }
    
    static safeSubtract(x, y) {
        if (x === 0) {
            let r = y;
            if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER) {
                throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
            }
            return r;
        }
        if (y === 0) {
            let r = x;
            if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER) {
                throw new ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
            }
            return r;
        }
        if (x === undefined || y === undefined) {
            throw new ArithmeticException('Invalid subtraction using undefined as argument');
        }
        if (isNaN(x) || isNaN(y)) {
            throw new ArithmeticException('Invalid subtraction using NaN as argument');
        }
        let r = x - y;
        // detect overflow, since neither x nor y are 0 (checked above) r cannot be === x or === y
        // TODO: is this correct and complete?
        if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER || r === x || r === y) {
            throw new ArithmeticException('Invalid subtraction beyond MIN_SAFE_INTEGER!');
        }
        return r;
    }

    static safeMultiply(x, y) {
        if (x == 1) {
            return y;
        }
        if (y == 1) {
            return x;
        }
        if (x == 0 || y == 0) {
            return 0;
        }
        let r = x * y;
        if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER || r / y != x || (x == MIN_SAFE_INTEGER && y == -1) || (y == MIN_SAFE_INTEGER && x == -1)) {
            throw new ArithmeticException('Multiplication overflows: ' + x + ' * ' + y);
        }
        return r;
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

