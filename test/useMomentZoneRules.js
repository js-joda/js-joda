/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ZoneId, ZoneRegion} from 'js-joda';

import { MomentZoneRulesProvider } from '../src/MomentZoneRulesProvider';

// FIXME
ZoneId.getAvailableZoneIds = MomentZoneRulesProvider.getAvailableZoneIds;
ZoneRegion.ofId = (zoneId) => {
    let rules = MomentZoneRulesProvider.getRules(zoneId);
    return new ZoneRegion(zoneId, rules);

}