import latest from 'moment-timezone/data/packed/latest';

import { ZoneRulesProvider } from 'js-joda';

import { MomentZoneRules } from './MomentZoneRules';

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
        return new MomentZoneRules(zoneId);
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

    static unpackZoneInfo(packedZoneInfo) {
        return packedZoneInfo.split('|');
    }

    static loadData(packedJson){
        TZDB_VERSION = packedJson.version;

        for (const packedZoneInfo of packedJson.zones) {
            const tzdbZoneInfo = MomentZoneRulesProvider.unpackZoneInfo(packedZoneInfo);
            AVAILABLE_ZONE_IDS.push(tzdbZoneInfo[0]);
            zones[tzdbZoneInfo[0]] = tzdbZoneInfo;
        }

        for (const packedLink of packedJson.links) {
            const link = packedLink.split('|');
            AVAILABLE_ZONE_IDS.push(link[1]);
            links[link[1]] = link[0];
        }

        console.log(TZDB_VERSION, AVAILABLE_ZONE_IDS);
    }
}

MomentZoneRulesProvider.loadData(latest);
