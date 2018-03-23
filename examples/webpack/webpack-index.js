/* eslint-disable no-console */

import { use } from 'js-joda';
import JsJodaTimeZone from 'js-joda-timezone';
import JsJodaExtra from 'js-joda-extra';

const jsJoda = use(JsJodaTimeZone).use(JsJodaExtra);

const {
    ChronoUnit,
    Duration,
    Instant,
    LocalDate,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
    Interval,
} = jsJoda;

console.log(LocalDate.now().until(LocalDate.now().plusDays(10), ChronoUnit.DAYS));
console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('webpack-index done');

