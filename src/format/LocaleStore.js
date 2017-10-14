/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


/**
 * Helper method to create an immutable entry.
 *
 * @param text  the text, not null
 * @param field  the field, not null
 * @return the entry, not null
 */
export const createEntry = (text, field) => {
    return {
        key: text,
        value: field,
        toString: function () {
            return text + '->' + field;
        }
    };
};

const _comparator = (obj1, obj2) => {
    return obj2.key.length - obj1.key.length;  // longest to shortest
};

/**
 * Stores the text for a single locale.
 * <p>
 * Some fields have a textual representation, such as day-of-week or month-of-year.
 * These textual representations can be captured in this class for printing
 * and parsing.
 */
export class LocaleStore {
    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {Object} valueTextMap  the map of values to text to store, assigned and not altered, not null
     */
    constructor(valueTextMap) {
        this._valueTextMap = valueTextMap;
        const map = {};
        let allList = [];
        Object.keys(valueTextMap).forEach((style) => {
            const reverse = {};
            Object.keys(valueTextMap[style]).forEach((key) => {
                const value = valueTextMap[style][key];
                if (reverse[value] === undefined) {
                    reverse[value] = createEntry(value, Number.parseInt(key));
                }
            });
            const list = Object.values(reverse);
            list.sort(_comparator);
            map[style] = list;
            allList = allList.concat(list);
            map[null] = allList;
        });
        allList.sort(_comparator);
        this._parsable = map;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the text for the specified field value, locale and style
     * for the purpose of printing.
     *
     * @param {Number} value  the value to get text for, not null
     * @param {TextStyle} style  the style to get text for, not null
     * @return the text for the field value, null if no text found
     */
    getText(value, style) {
        const map = this._valueTextMap[style];
        return map != null ? map[value] : null;
    }

    /**
     * Gets an iterator of text to field for the specified style for the purpose of parsing.
     * <p>
     * The iterator must be returned in order from the longest text to the shortest.
     *
     * @param style  the style to get text for, null for all parsable text
     * @return the iterator of text to field pairs, in order from longest text to shortest text,
     *  null if the style is not parsable
     */
    getTextIterator(style) {
        const list = this._parsable[style];
        return list != null ? list[Symbol.iterator]() : null;
    }
}
