/**
 * Math helper with static function for integer operations
 */
export class MathUtil {
    static div(a, b) {
        return ~~(a / b);
    }

    // TODO test it
    static floorDiv(x, y){
        var r = MathUtil.div(x, y);
        // if the signs are different and modulo not zero, round down
        if((x ^ y) < 0 && (r*y !== x)){
            r--;
        }
        return r;
    }

    // TODO test it
    static floorMod(x, y){
        var r = x - MathUtil.floorDiv(x, y) * y;
        return r;
    }
}

