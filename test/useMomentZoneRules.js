/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import latest from 'moment-timezone/data/packed/latest';
import { ZoneRulesProvider, ZoneId } from 'js-joda';

import plug from '../src/plug';

plug({ ZoneRulesProvider, ZoneId });

ZoneRulesProvider.loadTzdbData(latest);