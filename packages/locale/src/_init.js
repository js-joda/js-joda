/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { _init as localeInit } from './Locale';
import { _init as weekFieldsInit } from './temporal/WeekFields';

let isInit = false;

function init() {
    /* istanbul ignore if */
    if (isInit) {
        return;
    }

    isInit = true;

    localeInit();
    weekFieldsInit();
}

init();
