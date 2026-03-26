/* eslint-disable no-console */
/**
 * Full locale support using @js-joda/locale with cldr-data.
 *
 * No prebuilt locale packages needed. Install @js-joda/locale peer dependencies cldr-data and cldrjs
 * to get support for all CLDR locales without size constraints.
 *
 * Dependencies:
 *   npm install @js-joda/core @js-joda/timezone @js-joda/locale cldr-data cldrjs
 */

const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale } = require('@js-joda/locale');

// No prebuilt locale packages — locale data is loaded on demand from cldr-data

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const pattern = 'eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ';

console.log(`Time in ${zdt.zone()}`);
console.log('');
console.log('en formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US)));
console.log('de formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.GERMANY)));
console.log('ar formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.ARABIC)));
console.log('uk formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.UKRAINIAN)));
console.log('zh formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.CHINESE)));
console.log('node-locale-cldr done');
