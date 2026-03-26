/* eslint-disable no-console */
/**
 * Locale-aware date/time formatting using prebuilt locale packages.
 * Each locale requires its own package: @js-joda/locale_<tag>
 *
 * Dependencies:
 *   npm install @js-joda/core @js-joda/timezone @js-joda/locale @js-joda/locale_en-us @js-joda/locale_de @js-joda/locale_ko
 */

const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale } = require('@js-joda/locale');
require('@js-joda/locale_en-us');
require('@js-joda/locale_de');
require('@js-joda/locale_ko');

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const pattern = 'eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ';

console.log(`Time in ${zdt.zone()}`);
console.log('');
console.log('en-us formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US)));
console.log('de formatted string:   ', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.GERMANY)));
console.log('ko formatted string:   ', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.KOREAN)));
console.log('node-locale done');
