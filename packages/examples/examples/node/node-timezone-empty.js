/* eslint-disable no-console */
/**
 * Uses the empty timezone bundle (@js-joda/timezone/dist/js-joda-timezone-empty).
 * This bundle contains no timezone data — useful when you manage timezone data yourself
 * or only need UTC/system-offset zones.
 */

const jsJoda = require('@js-joda/core');
require('@js-joda/timezone/dist/js-joda-timezone-empty.js');

const { ZonedDateTime } = jsJoda;

console.log(ZonedDateTime.now().toString());
console.log('node-timezone-empty done');
