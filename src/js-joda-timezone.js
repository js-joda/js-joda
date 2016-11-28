/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {MomentZoneRulesProvider} from './MomentZoneRulesProvider';

export default function(jsJoda) {
    jsJoda.ZoneRulesProvider = MomentZoneRulesProvider;
    return jsJoda;
}