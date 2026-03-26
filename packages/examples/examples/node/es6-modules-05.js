/* eslint-disable no-console */

import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';
import '@js-joda/locale_de';

const zdt = ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));

const dtf_en = DateTimeFormatter
    .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ')
    .withLocale(Locale.US);

const dtf_de = DateTimeFormatter
    .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Woche: \' ww, \'Quartal: \' QQQ')
    .withLocale(Locale.GERMANY);

console.log(`Time in ${zdt.zone()}`);
console.log('');
console.log('en-us formatted string:', zdt.format(dtf_en));
console.log('de formatted string:', zdt.format(dtf_de));

console.log('es6-modules-05 done');