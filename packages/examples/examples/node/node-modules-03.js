/* eslint-disable no-console */

const {
    ChronoUnit,
    LocalDate,
    LocalDateTime,
    ZonedDateTime,
} = require('@js-joda/core');

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(LocalDate.now().until(LocalDate.now().plusDays(10), ChronoUnit.DAYS));
console.log('node-modules-03 done');
