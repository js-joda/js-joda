/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { MomentZoneRulesProvider } from './MomentZoneRulesProvider';
import extendSystemDefaultZoneId from './system-default-zone';

export default function (jsJoda) {
    jsJoda.ZoneRulesProvider.getRules = MomentZoneRulesProvider.getRules;
    jsJoda.ZoneRulesProvider.getAvailableZoneIds = MomentZoneRulesProvider.getAvailableZoneIds;
    jsJoda.ZoneRulesProvider.getTzdbData = MomentZoneRulesProvider.getTzdbData;
    jsJoda.ZoneRulesProvider.loadTzdbData = MomentZoneRulesProvider.loadTzdbData;

    extendSystemDefaultZoneId(jsJoda.ZoneId);
    return jsJoda;
}
