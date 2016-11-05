/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


import {_plugin as IntervalPlugin} from './Interval';

/**
 * plugin Function, call using js-jodas use()
 *
 * @param jsJoda
 */
export default function(jsJoda) {
    IntervalPlugin(jsJoda);
}