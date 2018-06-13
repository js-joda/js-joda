/* eslint-disable no-console */

const jsJoda = require('js-joda')
    .use(require('js-joda-timezone'));

const { Instant, ZoneRulesProvider, ZoneId } = jsJoda;

const now = Instant.now();

for(const zoneId of ZoneRulesProvider.getAvailableZoneIds()) {
    // console.log(zoneId, ZoneId.of(zoneId).rules().standardOffset(now).toString());
    console.log(zoneId, ZoneId.of(zoneId).rules().offset(now).toString());
}

console.log('node-modules-06 done');
