/* eslint-disable no-console */

const { use } = require('js-joda');

const {
    Instant,
    LocalDateTime,
    ZonedDateTime,
    Interval,
} = use(require('js-joda-timezone')).use(require('js-joda-extra'));

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(Interval.of(Instant.now(), Instant.now().plusSeconds(60)).toDuration().toString());