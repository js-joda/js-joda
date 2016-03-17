/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

export class StringUtil {

    /**
     *
     * @param {string} text
     * @param {string} pattern
     * @return {boolean}
     */
    static startsWith(text, pattern){
        return text.indexOf(pattern) === 0;
    }

    /**
     *
     * @param {string} text
     * @returns {number}
     */
    static hashCode(text) {
        var hash = 0, i, chr, len;
        if (text.length === 0) return hash;
        for (i = 0, len = text.length; i < len; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}

