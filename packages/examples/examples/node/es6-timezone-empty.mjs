/* eslint-disable no-console */
/**
 * Uses the empty timezone bundle (@js-joda/timezone/dist/js-joda-timezone-empty).
 * This bundle contains no timezone data — useful when you manage timezone data yourself
 * or only need UTC/system-offset zones.
 */

import '@js-joda/timezone/dist/js-joda-timezone-empty.esm.js';
import { ZonedDateTime } from '@js-joda/core';

console.log(ZonedDateTime.now().toString());
console.log('es6-timezone-empty done');
