/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/**
 * attempt to avoid dependency cycles... define all constants here and they could be used
 * so instead of using e.g. YearConstants.MAX_VALUE we must use YearConstants.MAX_VALUE :/
 */
export class YearConstants {}

export function _init() {
    /**
     * The minimum supported year
     */
    YearConstants.MIN_VALUE = -999999;
    /**
     * The maximum supported year
     */
    YearConstants.MAX_VALUE = 999999;
}