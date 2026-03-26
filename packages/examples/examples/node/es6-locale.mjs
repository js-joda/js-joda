/* eslint-disable no-console */
/**
 * Locale-aware date/time formatting and parsing using prebuilt locale packages.
 * Each locale requires its own package: @js-joda/locale_<tag>
 *
 * Dependencies:
 *   npm install @js-joda/core @js-joda/timezone @js-joda/locale @js-joda/locale_en-us @js-joda/locale_de @js-joda/locale_ko
 */

import '@js-joda/timezone';
import '@js-joda/locale_en-us';
import '@js-joda/locale_de';
import '@js-joda/locale_ko';
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';
import { Locale } from '@js-joda/locale';

// --- Formatting ---

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const pattern = 'eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ';

console.log(`Time in ${zdt.zone()}`);
console.log('');
console.log('en-us formatted string:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US)));
console.log('de formatted string:   ', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.GERMANY)));
console.log('ko formatted string:   ', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.KOREAN)));

// --- Parsing with a locale-aware formatter ---

const isoStr = '2021-08-13T13:43:40.420375Z';
const shortFormatter = DateTimeFormatter.ofPattern('M/dd/yyyy, hh:mm a').withLocale(Locale.ENGLISH);
console.log('');
console.log('parsed from ISO, formatted short:', ZonedDateTime.parse(isoStr).format(shortFormatter));

const rfcFormatter = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
const rfcStr = 'Tue, 05 Oct 2021 17:08:24 GMT';
const parsed = ZonedDateTime.parse(rfcStr, rfcFormatter);
console.log('parsed from RFC string:          ', parsed.format(rfcFormatter));
console.log('zone id:', parsed.zone().id());

console.log('es6-locale done');
