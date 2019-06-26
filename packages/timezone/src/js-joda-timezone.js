/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import latest from './tzdbData';

import { MomentZoneRulesProvider } from './MomentZoneRulesProvider';
import autoPlug from './auto-plug';

MomentZoneRulesProvider.loadTzdbData(latest);

autoPlug();
