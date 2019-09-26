/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    DateTimeException,
    ZoneRulesProvider,
} from '@js-joda/core';

import { MomentZoneRules } from './MomentZoneRules';

import { unpack } from './unpack';

let TZDB_DATA;
let TZDB_VERSION;
const AVAILABLE_ZONE_IDS = [];

const zones = {};
const links = {};

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
        if(tzdbZoneInfo == null){
            throw new DateTimeException('Unknown time-zone ID: ' + zoneId);
        }
        return new MomentZoneRules(tzdbZoneInfo);
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

    /**
     *
     * @return {string} the tzdb version.
     */
    static getVersion() {
        return TZDB_VERSION;
    }

    /**
     * Provides the packed tzdb data,
     * the data has the same format as provided from moment-timezone.
     *
     * @return {object} the packed tzdb data.
     */
    static getTzdbData(){
        return TZDB_DATA;
    }

    /**
     * Sets the packed tzdb data.
     * Accepts tzdb data in the same format as provided from moment-timezone.
     *
     * @param packedJson
     */
    static loadTzdbData(packedJson){
        TZDB_DATA = packedJson;
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
    }
}
