/* eslint-disable no-console */

import '@js-joda/timezone';
import { Instant, LocalDateTime, ZoneId, ZoneRulesProvider, ZonedDateTime } from '@js-joda/core';

// --- Zone conversion ---

const d1 = LocalDateTime
    .parse('2016-06-30T11:30')
    .atZone(ZoneId.of('Europe/Berlin'))
    .toString();  // 2016-06-30T11:30+02:00[Europe/Berlin]

const z1 = ZonedDateTime
    .parse('2016-06-30T11:30+02:00[Europe/Berlin]')
    .withZoneSameInstant(ZoneId.of('America/New_York'))
    .toString(); // 2016-06-30T05:30-04:00[America/New_York]

const z2 = ZonedDateTime
    .parse('2016-06-30T11:30+02:00[Europe/Berlin]')
    .withZoneSameLocal(ZoneId.of('America/New_York'))
    .toString(); // 2016-06-30T11:30-04:00[America/New_York]

console.log(d1);
console.log(z1);
console.log(z2);

// --- List all available zone IDs with their current offset ---

const now = Instant.now();

for (const zoneId of ZoneRulesProvider.getAvailableZoneIds()) {
    console.log(zoneId, ZoneId.of(zoneId).rules().offset(now).toString());
}

console.log('es6-timezone done');
