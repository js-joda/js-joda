/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import latest from './tzdbData';

import plug from './plug';
import { MomentZoneRulesProvider } from './MomentZoneRulesProvider';

MomentZoneRulesProvider.loadTzdbData(latest);

export default plug;