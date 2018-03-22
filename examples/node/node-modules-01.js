/* eslint-disable no-console */

const JsJoda = require('js-joda');
const JsJodaTimezone = require('js-joda-timezone');
const JsJodaExtra = require('js-joda-extra');

const jsJoda = JsJoda.use(JsJodaTimezone).use(JsJodaExtra);

const {
    Duration,
    Instant,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
    Interval,
} = jsJoda;

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('node-modules-01 done');
