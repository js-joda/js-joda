/* eslint-disable no-console */

const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale } = require('@js-joda/locale_ko');

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const dtf_ko = DateTimeFormatter
    .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ')
    .withLocale(Locale.KOREAN);

console.log(`Time in ${zdt.zone()}`);
console.log('');
console.log('ko formatted string:', zdt.format(dtf_ko));

console.log('node-modules-07-ko done');
