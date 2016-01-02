/**
 * Math helper with static function for integer operations
 */
export class MathUtil {
    static div(x, y) {
        var r = x/y;
        if(r < 0){
            return Math.ceil(r);
        } else {
            return Math.floor(r);
        }
    }

    // TODO test it
    static floorDiv(x, y){
        var r = Math.floor(x / y);
        return r;
    }

    // TODO test it
    static floorMod(x, y){
        var r = x - MathUtil.floorDiv(x, y) * y;
        return r;
    }
}

