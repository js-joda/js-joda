/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
/* eslint-disable no-console, no-var */
var joda = require('js-joda').use(require('js-joda-timezone')).use(require('../dist/js-joda-locale'));

var zdt = joda.ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('Europe/Berlin'));
// var zdt = joda.ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('America/Chicago'));
console.log('en_US formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(joda.Locale.US)));
console.log('en_GB formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(joda.Locale.UK)));
console.log('de_DE formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(joda.Locale.GERMANY)));
console.log('fr_FR formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(joda.Locale.FRANCE)));
