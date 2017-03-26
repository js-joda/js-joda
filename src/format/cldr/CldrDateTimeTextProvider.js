/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { ChronoField, IsoFields, TextStyle } from 'js-joda';

import cldrData from 'cldr-data';
import Cldr from 'cldrjs';

/**
 * Helper method to create an immutable entry.
 *
 * @param text  the text, not null
 * @param field  the field, not null
 * @return the entry, not null
 */
const _createEntry = (text, field) => {
    return {
        key: text,
        value: field,
        toString: function() {
            return text + '->' + field;
        }
    };
};

const _comparator = (obj1, obj2) => {
    return obj2.key.length - obj1.key.length;  // longest to shortest
};

/**
 * The Service Provider Implementation to obtain date-time text for a field.
 * <p>
 * This implementation is based on data from cldr.
 *
 * @private
 */
export default class CldrDateTimeTextProvider {

    constructor() {
        this._cache = {};
        // TODO: needs to be loaded? why?
        Cldr.load(cldrData('supplemental/likelySubtags'));
    }

    //-----------------------------------------------------------------------
    getAvailableLocales() {
        return cldrData.availableLocales;
    }

    //-----------------------------------------------------------------------
    getText(field, value, style, locale) {
        const store = this._findStore(field, locale);
        if (store instanceof LocaleStore) {
            return store.getText(value, style);
        }
        return null;
    }

    getTextIterator(field, style, locale) {
        const store = this._findStore(field, locale);
        if (store instanceof LocaleStore) {
            return store.getTextIterator(style);
        }
        return null;
    }

    //-----------------------------------------------------------------------
    _findStore(field, locale) {
        const key = _createEntry(field, locale);
        let store = this._cache[key];
        if (store === undefined) {
            store = this._createStore(field, locale);
            this._cache[key] = store;
        }
        return store;
    }

    _createStore(field, locale) {
        Cldr.load(cldrData(`main/${locale}/ca-gregorian`));
        const cldr = new Cldr(locale);
        if (field === ChronoField.MONTH_OF_YEAR) {
            const monthsData = cldr.main('dates/calendars/gregorian/months/format');
            const styleMap = {};
            let data = [];
            data[1] = monthsData.wide[1];
            data[2] = monthsData.wide[2];
            data[3] = monthsData.wide[3];
            data[4] = monthsData.wide[4];
            data[5] = monthsData.wide[5];
            data[6] = monthsData.wide[6];
            data[7] = monthsData.wide[7];
            data[8] = monthsData.wide[8];
            data[9] = monthsData.wide[9];
            data[10] = monthsData.wide[10];
            data[11] = monthsData.wide[11];
            data[12] = monthsData.wide[12];
            styleMap[TextStyle.FULL] = data;

            data = [];
            data[1] = monthsData.narrow[1];
            data[2] = monthsData.narrow[2];
            data[3] = monthsData.narrow[3];
            data[4] = monthsData.narrow[4];
            data[5] = monthsData.narrow[5];
            data[6] = monthsData.narrow[6];
            data[7] = monthsData.narrow[7];
            data[8] = monthsData.narrow[8];
            data[9] = monthsData.narrow[9];
            data[10] = monthsData.narrow[10];
            data[11] = monthsData.narrow[11];
            data[12] = monthsData.narrow[12];
            styleMap[TextStyle.NARROW] = data;

            data = [];
            data[1] = monthsData.abbreviated[1];
            data[2] = monthsData.abbreviated[2];
            data[3] = monthsData.abbreviated[3];
            data[4] = monthsData.abbreviated[4];
            data[5] = monthsData.abbreviated[5];
            data[6] = monthsData.abbreviated[6];
            data[7] = monthsData.abbreviated[7];
            data[8] = monthsData.abbreviated[8];
            data[9] = monthsData.abbreviated[9];
            data[10] = monthsData.abbreviated[10];
            data[11] = monthsData.abbreviated[11];
            data[12] = monthsData.abbreviated[12];
            styleMap[TextStyle.SHORT] = data;
            return this._createLocaleStore(styleMap);
        }
        if (field === ChronoField.DAY_OF_WEEK) {
            const daysData = cldr.main('dates/calendars/gregorian/days/format');
            const styleMap = {};
            let data = [];
            data[1] = daysData.wide.mon;
            data[2] = daysData.wide.tue;
            data[3] = daysData.wide.wed;
            data[4] = daysData.wide.thu;
            data[5] = daysData.wide.fri;
            data[6] = daysData.wide.sat;
            data[7] = daysData.wide.sun;
            styleMap[TextStyle.FULL] = data;

            data = [];
            data[1] = daysData.narrow.mon;
            data[2] = daysData.narrow.tue;
            data[3] = daysData.narrow.wed;
            data[4] = daysData.narrow.thu;
            data[5] = daysData.narrow.fri;
            data[6] = daysData.narrow.sat;
            data[7] = daysData.narrow.sun;
            styleMap[TextStyle.NARROW] = data;

            data = [];
            data[1] = daysData.abbreviated.mon;
            data[2] = daysData.abbreviated.tue;
            data[3] = daysData.abbreviated.wed;
            data[4] = daysData.abbreviated.thu;
            data[5] = daysData.abbreviated.fri;
            data[6] = daysData.abbreviated.sat;
            data[7] = daysData.abbreviated.sun;
            styleMap[TextStyle.SHORT] = data;
            return this._createLocaleStore(styleMap);
        }
        if (field === ChronoField.AMPM_OF_DAY) {
            const dayPeriodsData = cldr.main('dates/calendars/gregorian/dayPeriods/format');
            const oldSymbols = DateFormatSymbols.getInstance(locale);
            const styleMap = {};
            const array = oldSymbols.getAmPmStrings();
            const map = {};
            map[0] = array[Calendar.AM];
            map[1] = array[Calendar.PM];
            styleMap[TextStyle.FULL] = map;
            styleMap[TextStyle.SHORT] = map;  // re-use, as we don't have different data
            return createLocaleStore(styleMap);
        }
        if (field === ChronoField.ERA) {
            const erasData = cldr.main('dates/calendars/gregorian/eras');
            const oldSymbols = DateFormatSymbols.getInstance(locale);
            const styleMap = {};
            const array = oldSymbols.getEras();
            let map = {};
            map[0] = array[GregorianCalendar.BC];
            map[1] = array[GregorianCalendar.AD];
            styleMap[TextStyle.SHORT] = map;
            if (locale.getLanguage().equals(Locale.ENGLISH.getLanguage())) {
                map = {};
                map[0] = 'Before Christ';
                map[1] = 'Anno Domini';
                styleMap[TextStyle.FULL] = map;
            } else {
                // re-use, as we don't have different data
                styleMap[TextStyle.FULL] = map;
            }
            map = {};
            map[0] = array[GregorianCalendar.BC].substring(0, 1);
            map[1] = array[GregorianCalendar.AD].substring(0, 1);
            styleMap[TextStyle.NARROW] = map;
            return createLocaleStore(styleMap);
        }
        // hard code English quarter text
        if (field === IsoFields.QUARTER_OF_YEAR) {
            const quartersData = cldr.main('dates/calendars/gregorian/quarters/format');
            const styleMap = {};
            let map = {};
            map[1] = 'Q1';
            map[2] = 'Q2';
            map[3] = 'Q3';
            map[4] = 'Q4';
            styleMap[TextStyle.SHORT] = map;
            map = {};
            map[1] = '1st quarter';
            map[2] = '2nd quarter';
            map[3] = '3rd quarter';
            map[4] = '4th quarter';
            styleMap[TextStyle.FULL] = map;
            return createLocaleStore(styleMap);
        }
        return null;  // null marker for map
    }

    //-----------------------------------------------------------------------
    _createLocaleStore(valueTextMap) {
        valueTextMap[TextStyle.FULL_STANDALONE] = valueTextMap[TextStyle.FULL];
        valueTextMap[TextStyle.SHORT_STANDALONE] = valueTextMap[TextStyle.SHORT];
        if (Object.keys(valueTextMap).includes(TextStyle.NARROW) && !Object.keys(valueTextMap).includes(TextStyle.NARROW_STANDALONE)) {
            valueTextMap[TextStyle.NARROW_STANDALONE] = valueTextMap[TextStyle.NARROW];
        }
        return new LocaleStore(valueTextMap);
    }
}

/**
 * Stores the text for a single locale.
 * <p>
 * Some fields have a textual representation, such as day-of-week or month-of-year.
 * These textual representations can be captured in this class for printing
 * and parsing.
 */
class LocaleStore {
    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {Object} valueTextMap  the map of values to text to store, assigned and not altered, not null
     */
    constructor(valueTextMap) {
        this._valueTextMap = valueTextMap;
        const map = {};
        const allList = [];
        Object.keys(valueTextMap).forEach((style) => {
            const reverse = {};
            valueTextMap[style].forEach((value, key) => {
                if (reverse[value] !== undefined) {
                    //TODO
                    // continue;  // not parsable, try next style
                }
                reverse[value] = _createEntry(value, key);
            });
            const list = Object.values(reverse);
            list.sort(_comparator);
            map[style] = list;
            allList.concat(list);
            // TODO: map[null] won't work probably :/
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
        const list = this._parsable.get(style);
        return list != null ? list.iterator() : null;
    }
}
