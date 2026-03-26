/*
 * Pre-loads CLDR data for tests.
 * This file intentionally uses CommonJS syntax (no import/export)
 * to avoid Node 22 ESM/CJS module loading conflicts.
 *
 * Supplemental data (likelySubtags, metaZones, weekData) is registered
 * automatically by @js-joda/locale via src/supplemental-data.js when the
 * package is first imported.
 */
'use strict';

const { registerLocaleData } = require('../src/format/cldr/CldrCache');

// Locale data for locales used in tests
// Note: de-DE, en-US, fr-FR, ja-JP are not in cldr-data/core;
// they are represented by de, en, fr, ja respectively (see Locale.js constants)
const testLocales = ['en', 'en-GB', 'fr', 'de', 'ko', 'ja'];
testLocales.forEach(function(locale) {
    registerLocaleData(`main/${locale}/ca-gregorian.json`, require(`cldr-data/main/${locale}/ca-gregorian.json`));
    registerLocaleData(`main/${locale}/timeZoneNames.json`, require(`cldr-data/main/${locale}/timeZoneNames.json`));
});