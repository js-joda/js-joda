/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { ChronoField, IsoFields, TextStyle } from '@js-joda/core';

import cldrData from 'cldr-data';

import {LocaleStore, createEntry} from '../LocaleStore';
import {getOrCreateCldrInstance, loadCldrData} from './CldrCache';

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
        loadCldrData('supplemental/likelySubtags.json');
    }

    //-----------------------------------------------------------------------
    getAvailableLocales() {
        /* eslint-disable no-undef */
        // JS_JODA_LOCALE_AVAILABLE_LOCALS may be defined using webpack DefinePlugin
        if (typeof(JS_JODA_LOCALE_AVAILABLE_LOCALES) !== 'undefined') {
            return JS_JODA_LOCALE_AVAILABLE_LOCALES;
        }
        /* eslint-enable no-undef */
        return cldrData('availableLocales.json').availableLocales;
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
        const key = createEntry(field, locale);
        let store = this._cache[key];
        if (store === undefined) {
            store = this._createStore(field, locale);
            this._cache[key] = store;
        }
        return store;
    }

    _createStore(field, locale) {
        loadCldrData(`main/${locale.localeString()}/ca-gregorian.json`);
        const cldr = getOrCreateCldrInstance(locale.localeString());
        if (field === ChronoField.MONTH_OF_YEAR) {
            const monthsData = cldr.main('dates/calendars/gregorian/months/format');
            const styleMap = {};
            let data = {};
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

            data = {};
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

            data = {};
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
            let data = {};
            data[1] = daysData.wide.mon;
            data[2] = daysData.wide.tue;
            data[3] = daysData.wide.wed;
            data[4] = daysData.wide.thu;
            data[5] = daysData.wide.fri;
            data[6] = daysData.wide.sat;
            data[7] = daysData.wide.sun;
            styleMap[TextStyle.FULL] = data;

            data = {};
            data[1] = daysData.narrow.mon;
            data[2] = daysData.narrow.tue;
            data[3] = daysData.narrow.wed;
            data[4] = daysData.narrow.thu;
            data[5] = daysData.narrow.fri;
            data[6] = daysData.narrow.sat;
            data[7] = daysData.narrow.sun;
            styleMap[TextStyle.NARROW] = data;

            data = {};
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
            const styleMap = {};
            let data = {};
            data[0] = dayPeriodsData.wide.am;
            data[1] = dayPeriodsData.wide.pm;
            styleMap[TextStyle.FULL] = data;

            data = {};
            data[0] = dayPeriodsData.narrow.am;
            data[1] = dayPeriodsData.narrow.pm;
            styleMap[TextStyle.NARROW] = data;

            data = {};
            data[0] = dayPeriodsData.abbreviated.am;
            data[1] = dayPeriodsData.abbreviated.pm;
            styleMap[TextStyle.SHORT] = data;

            return this._createLocaleStore(styleMap);
        }
        if (field === ChronoField.ERA) {
            const erasData = cldr.main('dates/calendars/gregorian/eras');
            const styleMap = {};
            let data = {};
            data[0] = erasData.eraNames['0'];
            data[1] = erasData.eraNames['1'];
            styleMap[TextStyle.FULL] = data;

            data = {};
            data[0] = erasData.eraNarrow['0'];
            data[1] = erasData.eraNarrow['1'];
            styleMap[TextStyle.NARROW] = data;

            data = {};
            data[0] = erasData.eraAbbr['0'];
            data[1] = erasData.eraAbbr['1'];
            styleMap[TextStyle.SHORT] = data;

            return this._createLocaleStore(styleMap);
        }
        if (field === IsoFields.QUARTER_OF_YEAR) {
            const quartersData = cldr.main('dates/calendars/gregorian/quarters/format');
            const styleMap = {};
            let data = {};
            data[1] = quartersData.wide['1'];
            data[2] = quartersData.wide['2'];
            data[3] = quartersData.wide['3'];
            data[4] = quartersData.wide['4'];
            styleMap[TextStyle.FULL] = data;

            data = {};
            data[1] = quartersData.narrow['1'];
            data[2] = quartersData.narrow['2'];
            data[3] = quartersData.narrow['3'];
            data[4] = quartersData.narrow['4'];
            styleMap[TextStyle.NARROW] = data;

            data = {};
            data[1] = quartersData.abbreviated['1'];
            data[2] = quartersData.abbreviated['2'];
            data[3] = quartersData.abbreviated['3'];
            data[4] = quartersData.abbreviated['4'];
            styleMap[TextStyle.SHORT] = data;

            return this._createLocaleStore(styleMap);
        }
        return null;  // null marker for map
    }

    //-----------------------------------------------------------------------
    _createLocaleStore(valueTextMap) {
        valueTextMap[TextStyle.FULL_STANDALONE] = valueTextMap[TextStyle.FULL];
        valueTextMap[TextStyle.SHORT_STANDALONE] = valueTextMap[TextStyle.SHORT];
        /* istanbul ignore if */ // this doesn't seem to happen?
        if (Object.keys(valueTextMap).includes(TextStyle.NARROW) && !Object.keys(valueTextMap).includes(TextStyle.NARROW_STANDALONE)) {
            valueTextMap[TextStyle.NARROW_STANDALONE] = valueTextMap[TextStyle.NARROW];
        }
        return new LocaleStore(valueTextMap);
    }
}
