/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import CldrDateTimeTextProvider from './format/cldr/CldrDateTimeTextProvider';

export default class Locale {
    static getAvailableLocales() {
        return new CldrDateTimeTextProvider().getAvailableLocales();
    }

    // TODO: maybe use new Cldr(<'en'>) constructor instead?
    // see https://github.com/rxaviers/cldrjs#instantiate-a-locale-and-get-it-normalized
    constructor(language, country = '', localeString = '') {
        this._language = language;
        this._country = country;
        this._localeString = localeString;
    }

    language() {
        return this._language;
    }

    country() {
        return this._country;
    }

    localeString() {
        if (this._localeString.length > 0) {
            return this._localeString;
        }
        if (this._country.length > 0) {
            return `${this._language}-${this._country}`;
        } else {
            return this._language;
        }
    }

    toString() {
        return `Locale[${this.localeString()}]`;
    }

    equals(other) {
        if (!other) {
            return false;
        }
        if (!(other instanceof Locale)) {
            return false;
        }
        return this.localeString() === other.localeString();
    }
}

export function _init() {
    //some samples/consts
    Locale.ENGLISH = new Locale('en');
    Locale.US = new Locale('en', 'US', 'en'); // default in cldr-data, no en-US
    Locale.UK = new Locale('en', 'GB');
    Locale.CANADA = new Locale('en', 'CA');
    Locale.FRENCH = new Locale('fr');
    Locale.FRANCE = new Locale('fr', 'FR', 'fr'); // default in cldr-data, no fr-FR
    Locale.GERMAN = new Locale('de');
    Locale.GERMANY = new Locale('de', 'DE', 'de'); // default in cldr-data, no de-DE
}
