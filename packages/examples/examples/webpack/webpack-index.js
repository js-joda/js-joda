/* eslint-disable no-console */

import {
    ChronoUnit,
    Duration,
    Instant,
    LocalDate,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
} from '@js-joda/core';
import {
    Interval,
} from '@js-joda/extra';
import '@js-joda/timezone';

console.log(LocalDate.now().until(LocalDate.now().plusDays(10), ChronoUnit.DAYS));
console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('webpack-index done');

