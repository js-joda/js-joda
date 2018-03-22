/* eslint-disable no-console */

const {
    LocalDateTime,
    ZonedDateTime,
} = require('js-joda');

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log('node-modules-03 done');
