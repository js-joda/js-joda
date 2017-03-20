/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import latest from 'moment-timezone/data/packed/latest';

import { MomentZoneRulesProvider } from './MomentZoneRulesProvider';
import extendSystemDefaultZoneId from './system-default-zone';

MomentZoneRulesProvider.loadData(latest);

export default function (jsJoda) {
    jsJoda.ZoneRulesProvider.getRules = MomentZoneRulesProvider.getRules;
    jsJoda.ZoneRulesProvider.getAvailableZoneIds = MomentZoneRulesProvider.getAvailableZoneIds;
    extendSystemDefaultZoneId(jsJoda.ZoneId);
    return jsJoda;
}
