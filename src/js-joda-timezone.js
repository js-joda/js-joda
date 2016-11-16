import {MomentZoneRulesProvider} from './MomentZoneRulesProvider';

export default function(jsJoda) {
    jsJoda.ZoneRulesProvider = MomentZoneRulesProvider;
    return jsJoda;
}