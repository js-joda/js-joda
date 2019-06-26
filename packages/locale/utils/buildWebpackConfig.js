/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const { DefinePlugin } = require('webpack');

const CldrDataIgnorePlugin = require('./CldrDataIgnorePlugin');

function updateWebpackConfigForLocales(webpackConfig, locales, modulesDir) {

    // don't externalize cldrjs and cldr-data
    if (webpackConfig.externals) {
        delete webpackConfig.externals['cldrjs'];
        delete webpackConfig.externals['cldr-data'];
    }
    // for cldr-data, we only want to include needed files for locales from main and supplemental /
    // availableLocales so "exclude" everything else via CldrDataIgnorePlugin
    webpackConfig.plugins.push(new CldrDataIgnorePlugin(modulesDir, locales));

    webpackConfig.plugins.push(new DefinePlugin({
        JS_JODA_LOCALE_AVAILABLE_LOCALES: JSON.stringify(locales),
    }));
    return webpackConfig;
}

module.exports = {
    updateWebpackConfigForLocales,
};
