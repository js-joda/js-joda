/* eslint-disable no-console */

import { use as jsJodaUse, ZonedDateTime, ZoneId } from 'js-joda';
import jsJodaTimeZone from 'js-joda-timezone';

jsJodaUse(jsJodaTimeZone);

const zdt = ZonedDateTime.now(ZoneId.of('America/New_York'));

console.log(zdt.toString());
console.log('es6-modules-03 done');

