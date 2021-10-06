/* eslint-disable no-console */

import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core';
import { Locale } from '@js-joda/locale';

const str = '2021-08-13T13:43:40.420375Z';
const pattern = 'M/dd/yyyy, hh:mm a';
const formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.ENGLISH);
console.log(ZonedDateTime.parse(str).format(formatter));

const df = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
const z = ZonedDateTime.parse('Tue, 05 Oct 2021 17:08:24 GMT', df);
console.log(z.format(df));
console.log(z.zone().id());
console.log(z.toString());

