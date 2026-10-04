/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { TzdbZoneRulesProvider } from './TzdbZoneRulesProvider';
import extendSystemDefaultZoneId from './system-default-zone';

/**
 * @private
 */
export default function (jsJoda) {
    jsJoda.ZoneRulesProvider.getRules = TzdbZoneRulesProvider.getRules;
    jsJoda.ZoneRulesProvider.getAvailableZoneIds = TzdbZoneRulesProvider.getAvailableZoneIds;
    jsJoda.ZoneRulesProvider.getTzdbData = TzdbZoneRulesProvider.getTzdbData;
    jsJoda.ZoneRulesProvider.loadTzdbData = TzdbZoneRulesProvider.loadTzdbData;

    extendSystemDefaultZoneId(jsJoda.ZoneId);
    return jsJoda;
}
