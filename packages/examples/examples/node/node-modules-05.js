/* eslint-disable no-console */

const jsJoda = require('@js-joda/core');
require('@js-joda/timezone/dist/js-joda-timezone-empty');

const { ZonedDateTime } = jsJoda;

console.log(ZonedDateTime.now().toString());

console.log('node-modules-05 done');
