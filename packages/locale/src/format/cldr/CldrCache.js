/*
* @copyright (c) 2020, Philipp Thuerwaechter & Pattrick Hueper
* @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
*/

import cldrData from 'cldr-data';
import Cldr from 'cldrjs';

const cldrDataLoaded = new Set();
/**
* Loads the Cldr data for the given path if it hasn't been loaded before.
*/
export const loadCldrData = (path) => {
    if (!cldrDataLoaded.has(path)) {
        Cldr.load(cldrData(path));
        cldrDataLoaded.add(path);
    }
};

const localeToCldrInstanceCache = {};
/**
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
