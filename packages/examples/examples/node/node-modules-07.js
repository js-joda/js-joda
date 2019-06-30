/* eslint-disable no-console */

const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale } = require('@js-joda/locale_en-us');

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const dtf = DateTimeFormatter
    .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ')
    .withLocale(Locale.US);

console.log('Time in ' + zdt.zone());
console.log('');
console.log('en_US formatted string:', zdt.format(dtf));

console.log('node-modules-07 done');
