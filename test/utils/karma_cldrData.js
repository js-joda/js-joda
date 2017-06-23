/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/* since the npm cldrData load is using `fs` and other modules not available in browser,
 * we define our own cldrData load function that basically just `requires` a cldr-data file
 * this only works if we set the resolve.alias in karma webpack config like this:
 * resolve = {
 *   alias: {
 *     'cldr-data$': path.resolve(__dirname, 'test/utils/karma_cldrData.js')
 *   }
 * };
 */

module.exports = function (path) {
    return require('../../node_modules/cldr-data/' + path);
};
