/*
 * @copyright (c) 2018, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/* since the npm cldrData load is using `fs` and other modules not available in browser,
 * we define our own cldrData "load" function that just `requires` a cldr-data file
 */

/* NOTE: the path is relative to the installed js-joda-locale package and assuming,
 * that cldr-data is installed in parallel!
 */
module.exports = function (cldrPath) {
    return require('../node_modules/cldr-data/' + cldrPath);
};
