/* eslint-disable no-console */

const { use } = require('js-joda');

const {
    Duration,
    Instant,
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
    Interval,
} = use(require('js-joda-timezone')).use(require('js-joda-extra'));

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
console.log('node-modules-02 done');
