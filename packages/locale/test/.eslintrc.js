/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

module.exports = {
    'rules': {
        // needed, e.g. for `expect(...)`
        'no-unused-expressions': 'off',
        // e.g. for `data_XXX` arrays as "dataProviders"
        'camelcase': 'off',
    },
    'env': {
        'mocha': true,
    }
};