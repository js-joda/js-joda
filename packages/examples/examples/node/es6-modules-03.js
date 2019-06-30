/* eslint-disable no-console */

import { ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';

const zdt = ZonedDateTime.now(ZoneId.of('America/New_York'));

console.log(zdt.toString());
console.log('es6-modules-03 done');

