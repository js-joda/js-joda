/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
/* eslint-disable no-console, no-var */
const joda = require('@js-joda/core');
require('@js-joda/timezone');

const {
    DateTimeFormatter,
    Instant,
    ZonedDateTime,
    ZoneId,
} = joda;

const {
    Locale,
} = require('./build/js-joda-locale');


const zdt = ZonedDateTime.of(2016, 1, 1, 1, 2, 3, 4, ZoneId.of('Europe/Berlin'));
const pattern = 'eeee MMMM dd yyyy GGGG, hh:mm:ss,nnnn a zzzz, \'Week \' ww, \'Quarter \' QQQ';
const enUSFormatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US);
const enGBFormatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.UK);
const deDEFormatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.GERMANY);
const frFRFormatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.FRANCE);
const enUSString = zdt.format(enUSFormatter);
const enGBString = zdt.format(enGBFormatter);
const deDEString = zdt.format(deDEFormatter);
const frFRString = zdt.format(frFRFormatter);
console.log('en_US formatted string:', enUSString);
console.log('en_US string parsed back same Instant as original? ', Instant.from(ZonedDateTime.parse(enUSString, enUSFormatter)).equals(Instant.from(zdt)));
console.log('en_GB formatted string:', enGBString);
console.log('en_GB string parsed back same Instant as original? ', Instant.from(ZonedDateTime.parse(enGBString, enGBFormatter)).equals(Instant.from(zdt)));
console.log('de_DE formatted string:', deDEString);
console.log('en_GB string parsed back same Instant as original? ', Instant.from(ZonedDateTime.parse(deDEString, deDEFormatter)).equals(Instant.from(zdt)));
console.log('fr_FR formatted string:', frFRString);
console.log('en_GB string parsed back same Instant as original? ', Instant.from(ZonedDateTime.parse(frFRString, frFRFormatter)).equals(Instant.from(zdt)));
