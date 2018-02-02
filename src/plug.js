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

    // TODO This is temporay solution to get access to the tzdb data.
    // It would be nice to decouple load and set tzdb data
    // and to provide a possiblitiy to load only a subset of zoneIds.
    // Be aware that this is an undocumented feature and
    // that the format of the tzdb might change in the future!
    jsJoda.ZoneRulesProvider._TZDB = latest;

    extendSystemDefaultZoneId(jsJoda.ZoneId);
    return jsJoda;
}
