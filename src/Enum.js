/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
/***
 * Base class for a pseudo enum
 */
export class Enum {
    constructor(name){
        this._name = name;
    }

    equals(other){
        return this === other;
    }

    toString() {
        return this._name;
    }
}