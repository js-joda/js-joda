/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Installs a `Symbol.toPrimitive` guard on the given prototype.
 *
 * Converting an instance to a number is not allowed and throws a `TypeError`
 * naming the methods to use instead; the `string` and `default` hints return
 * `toString()`.
 *
 * The check for `Symbol.toPrimitive` is done here, so that in environments
 * without it (ECMAScript 5) nothing is installed and conversions behave as
 * before. This module has no imports of its own, so that it can be used from
 * any module without adding an import cycle.
 *
 * @private
 *
 * @param {Object} prototype - the prototype to install the guard on
 * @param {string} typeName - the name of the type, as named in the error message
 * @param {string} hintText - the hint naming the methods to use instead
 */
export function installNumericConversionGuard(prototype, typeName, hintText) {
    if (typeof Symbol === 'undefined' || !Symbol.toPrimitive) {
        return;
    }

    prototype[Symbol.toPrimitive] = function (hint) {
        // hint could be 'number', 'string' or 'default'. Only 'number'
        // should throw and 'default' is treated as 'string'.
        if (hint !== 'number') {
            return this.toString();
        }

        throw new TypeError(
            `A conversion from ${typeName} to a number is not allowed. ${hintText}`
        );
    };
}
