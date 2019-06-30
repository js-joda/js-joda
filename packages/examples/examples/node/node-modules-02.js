/* eslint-disable no-console */

const {
    Duration,
    Instant,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
} = require('@js-joda/core');
require('@js-joda/timezone');

const {
    Interval,
} = require('@js-joda/extra');

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('node-modules-02 done');
