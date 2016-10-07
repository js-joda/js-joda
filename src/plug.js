/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import * as jsJoda from './js-joda';

const used = [];

/**
 * .use(function)
 *
 * Provides a way to extend the internals of js-joda
 *
 * @param {Function}
 * @returns {this} for chaining
 */
export function use(fn) {
    if (!~used.indexOf(fn)) {
        fn(jsJoda);
        used.push(fn);
    }
    return this;
}