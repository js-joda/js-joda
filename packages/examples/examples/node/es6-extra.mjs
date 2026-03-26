/* eslint-disable no-console */

import '@js-joda/timezone';
import { Interval } from '@js-joda/extra';
import {
    Duration,
    Instant,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
} from '@js-joda/core';

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('es6-extra done');
