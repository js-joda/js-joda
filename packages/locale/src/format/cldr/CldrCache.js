/*
* @copyright (c) 2020, Philipp Thuerwaechter & Pattrick Hueper
* @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
*/

import Cldr from 'cldrjs';

const cldrDataLoaded = new Set();

/**
 * Registers CLDR JSON data into the shared cldrjs instance.
 * The path is used as a unique key to skip already-loaded data.
 *
 * @param {string} path - The CLDR data path (e.g. 'supplemental/likelySubtags.json')
 * @param {Object} data - A CLDR JSON object
 */
export const registerLocaleData = (path, data) => {
    if (cldrDataLoaded.has(path)) return;
    cldrDataLoaded.add(path);
    Cldr.load(data);
};

/**
 * @private
 *
 * Loads a CLDR data file by path using the `cldr-data` package.
 * Requires `cldr-data` to be installed (Option 1 — full locale support).
 * For prebuilt locale packages (Option 2), data is pre-loaded via registerLocaleData() instead.
 */
export const loadCldrData = (path) => {
    if (cldrDataLoaded.has(path)) return;
    try {
        const cldrData = require('cldr-data');
        registerLocaleData(path, cldrData(path));
    } catch (e) {
        // cldr-data is not installed; data must be pre-loaded via registerLocaleData()
    }
};

const localeToCldrInstanceCache = {};
/**
 * @private
 *
* Returns a Cldr instance for the given locale.
* Memoized, so a given locale will always return the exact same cldr instance.
*/
export const getOrCreateCldrInstance = (locale) => {
    if (localeToCldrInstanceCache[locale] == null) {
        localeToCldrInstanceCache[locale] = new Cldr(locale);
    }

    return localeToCldrInstanceCache[locale];
};

const localeToMapZonesCache = {};
/**
 * @private
 *
* Returns a map zones object for a Cldr instance.
* Memoized, so for any given Cldr instance locale, the same object will be returned.
*/
export const getOrCreateMapZones = (cldr) => {
    if (localeToMapZonesCache[cldr.locale] == null) {
        const mapZones = {};

        cldr.get('supplemental/metaZones/metazones').forEach((metaZone) => {
            if (metaZone.mapZone) {
                if (!mapZones[metaZone.mapZone._other]) {
                    mapZones[metaZone.mapZone._other] = {};
                }
                mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
            }
        });

        localeToMapZonesCache[cldr.locale] = mapZones;
    }

    return localeToMapZonesCache[cldr.locale];
};
