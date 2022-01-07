/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { use } from '@js-joda/core';
import plug from './plug';
import Locale from './Locale';
import { WeekFields } from './temporal/WeekFields';

use(plug);

export {
    Locale,
    WeekFields
};
