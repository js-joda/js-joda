/* eslint-disable no-console */

import JsJoda from 'js-joda';
import JsJodaTimeZone from 'js-joda-timezone';
import JsJodaExtra from 'js-joda-extra';

const jsJoda = JsJoda.use(JsJodaTimeZone).use(JsJodaExtra);

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
console.log('done');

