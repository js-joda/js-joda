import {ArithmeticException} from './errors';

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
            return y;
        }
        if (y === 0) {
            return x;
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
        if (r > Number.MAX_SAFE_INTEGER || r === x || r === y) {
            throw new ArithmeticException('Invalid addition beyond Number.MAX_SAFE_INTEGER!');
        }
        return r;
    }
}

