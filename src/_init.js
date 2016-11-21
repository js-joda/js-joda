/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { _init as intervalInit } from './Interval';

let isInit = false;

function init() {
    if (isInit) {
        return;
    }

    isInit = true;

    intervalInit();
}

init();
