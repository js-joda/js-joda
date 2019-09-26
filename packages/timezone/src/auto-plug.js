/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { use } from '@js-joda/core';

import plug from './plug';

export default function autoPlug() {
    use(plug);
}

