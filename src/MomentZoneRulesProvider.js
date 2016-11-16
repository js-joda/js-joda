import { ZoneRulesProvider } from 'js-joda';

import { MomentZoneRules } from './MomentZoneRules';

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
        return [];
    }


}