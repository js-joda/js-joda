/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

export class StringBuilder {
    constructor(){
        this._str = '';
    }

    append(str){
        this._str += str;
    }

    insert(offset, str){
        this._str = this._str.slice(0, offset) + str + this._str.slice(offset);
    }

    length(){
        return this._str.length;
    }

    setLength(length){
        this._str = this._str.slice(0, length);
    }


    toString() {
        return this._str;
    }
}
