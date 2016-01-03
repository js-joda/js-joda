/**
 * Math helper with static function for integer operations
 */
export class MathUtil {
    // TODO test it
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
}

