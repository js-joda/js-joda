/* eslint-disable no-console */
/**
 * In ESM, all static imports are hoisted and resolved before any module code runs.
 * Unlike CommonJS require(), you cannot place imports inside blocks to control
 * execution order — the concept of "import order" from the CJS counterpart does
 * not apply here. All declarations below are equivalent regardless of their
 * textual position in the file.
 */

import '@js-joda/timezone';
import { Interval } from '@js-joda/extra';
import { Duration, Instant, LocalDateTime, ZonedDateTime, ZoneId } from '@js-joda/core';

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('es6-extra-import-order done');
