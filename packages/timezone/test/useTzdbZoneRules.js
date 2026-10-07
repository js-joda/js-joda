/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ZoneRulesProvider, ZoneId } from '@js-joda/core';

import latest from '../src/tzdbData';
import plug from '../src/plug';

plug({ ZoneRulesProvider, ZoneId });

ZoneRulesProvider.loadTzdbData(latest);
