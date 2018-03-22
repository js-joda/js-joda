/* eslint-disable no-console */

const JsJoda = require('js-joda');
const JsJodaTimezone = require('js-joda-timezone');
const JsJodaExtra = require('js-joda-extra');

const jsJoda = JsJoda.use(JsJodaTimezone).use(JsJodaExtra);

const {
    Instant,
    LocalDateTime,
    ZonedDateTime,
    Interval,
} = jsJoda;

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(Interval.of(Instant.now(), Instant.now().plusSeconds(60)).toDuration().toString());