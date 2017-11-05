/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');
const { DefinePlugin } = require('webpack');

function updateWebpackConfigForLocales(webpackConfig, locales, modulesDir) {

    // don't externalize cldrjs and cldr-data
    if (webpackConfig.externals) {
        delete webpackConfig.externals['cldrjs'];
        delete webpackConfig.externals['cldr-data'];
    }
    // for cldr-data, we only want to include needed files for locales from main and supplemental /
    // availableLocales so "exclude" everything else via null-loader

    // basic nullLoaderConfig
    const nullLoaderConfig = {
        use: [{ loader: 'null-loader' }],
        resource: {
            // don't load everything in cldr-data
            test: path.resolve(modulesDir, 'cldr-data'),
            // except the actual data we need (supplemental, availableLocales, and de, en, fr
            // locales from main)
            exclude: [
                // necessary supplemental data
                {
                    or: [
                        path.resolve(modulesDir, 'cldr-data/supplemental/likelySubtags.json'),
                        path.resolve(modulesDir, 'cldr-data/supplemental/metaZones.json'),
                        path.resolve(modulesDir, 'cldr-data/supplemental/weekData.json'),
                    ]
                },
                // availableLocales
                path.resolve(modulesDir, 'cldr-data/availableLocales.json'),
            ],
        }
    };

    // per locale nullLoaderConfig
    locales.forEach((locale) => {
        nullLoaderConfig.resource.exclude.push(
            // necessary main data per locale
            {
                or: [
                    new RegExp(path.resolve(modulesDir, `cldr-data/main/${locale}/ca-gregorian.json`)),
                    new RegExp(path.resolve(modulesDir, `cldr-data/main/${locale}/timeZoneNames.json`)),
                ]
            });
    });

    webpackConfig.module.rules.push(nullLoaderConfig);
    webpackConfig.plugins.push(new DefinePlugin({
        JS_JODA_LOCALE_AVAILABLE_LOCALES: JSON.stringify(locales),
    }));
    return webpackConfig;
}

module.exports = {
    updateWebpackConfigForLocales,
};
