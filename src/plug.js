/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { MomentZoneRulesProvider } from './MomentZoneRulesProvider';

export default function (jsJoda) {
    jsJoda.ZoneRulesProvider.getRules = MomentZoneRulesProvider.getRules;
    jsJoda.ZoneRulesProvider.getAvailableZoneIds = MomentZoneRulesProvider.getAvailableZoneIds;
    return jsJoda;
}
