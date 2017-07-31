/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
/* eslint-disable no-console, no-var */
var joda = require('js-joda').use(require('js-joda-timezone')).use(require('../dist/js-joda-locale'));

var zdt = joda.ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('Europe/Berlin'));
// TODO: week fields don't work yet :/
// console.log('formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee yyyy MMMM dd, hh:mm:ss zzzz, \'Week \' W').withLocale(joda.Locale.ENGLISH)));
// TODO: add quarter, weeks and other fields?
console.log('formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee yyyy MMMM dd, hh:mm:ss zzzz').withLocale(joda.Locale.ENGLISH)));
console.log('formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee yyyy MMMM dd, hh:mm:ss zzzz').withLocale(joda.Locale.GERMAN)));
console.log('formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee yyyy MMMM dd, hh:mm:ss zzzz').withLocale(joda.Locale.FRENCH)));
