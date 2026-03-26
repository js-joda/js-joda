/* eslint-disable no-console */

import {
    ChronoUnit,
    LocalDate,
    LocalDateTime,
    ZonedDateTime,
} from '@js-joda/core';

console.log(LocalDateTime.now().toString());
console.log(ZonedDateTime.now().toString());
console.log(LocalDate.now().until(LocalDate.now().plusDays(10), ChronoUnit.DAYS));
console.log('es6-core done');
