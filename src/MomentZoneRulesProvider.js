import latest from 'moment-timezone/data/packed/latest';

import { ZoneRulesProvider } from 'js-joda';

import { MomentZoneRules } from './MomentZoneRules';

import { unpack } from './unpack';

let TZDB_VERSION = null;
const AVAILABLE_ZONE_IDS = [];

let zones = {};
let links = {};

export class MomentZoneRulesProvider extends ZoneRulesProvider {
    /**
     * Gets the rules for the zone ID.
     * <p>
     * This returns the latest available rules for the zone ID.
     * <p>
     * This method relies on time-zone data provider files that are configured.
     *
     * @param {string} zoneId
     * @return {ZoneRules}
     */
    static getRules(zoneId){
        const tzdbZoneInfo = zones[links[zoneId]];
        return new MomentZoneRules(zoneId, tzdbZoneInfo);
    }


    /**
     * Gets the set of available zone IDs.
     * <p>
     * These zone IDs are loaded and available for use by {@code ZoneId}.
     *
     * @return {string[]} a modifiable copy of the set of zone IDs, not null
     */
    static getAvailableZoneIds(){
        return AVAILABLE_ZONE_IDS;
    }

    static getVersion() {
        return TZDB_VERSION;
    }

    static loadData(packedJson){
        TZDB_VERSION = packedJson.version;

        for (const packedZoneInfo of packedJson.zones) {
            const tzdbZoneInfo = unpack(packedZoneInfo);
            AVAILABLE_ZONE_IDS.push(tzdbZoneInfo.name);
            zones[tzdbZoneInfo.name] = tzdbZoneInfo;
            links[tzdbZoneInfo.name] = tzdbZoneInfo.name;
        }

        for (const packedLink of packedJson.links) {
            const link = packedLink.split('|');
            AVAILABLE_ZONE_IDS.push(link[1]);
            links[link[1]] = link[0];
        }

        // console.log(TZDB_VERSION, AVAILABLE_ZONE_IDS, zones, links);
    }
}

MomentZoneRulesProvider.loadData(latest);
