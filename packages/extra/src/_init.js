/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { _init as dayOfMonthInit } from './DayOfMonth';
import { _init as dayOfYearInit } from './DayOfYear';
import { _init as intervalInit } from './Interval';
import { _init as quarterInit } from './Quarter';
import { _init as yearQuarterInit } from './YearQuarter';
import { _init as yearWeekInit } from './YearWeek';

let isInit = false;

function init() {
    if (isInit) {
        return;
    }

    isInit = true;

    dayOfMonthInit();
    dayOfYearInit();
    intervalInit();
    quarterInit();
    yearQuarterInit();
    yearWeekInit();
}

init();
