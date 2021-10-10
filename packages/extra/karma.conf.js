/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// eslint-disable-next-line func-names
const { sauceLabsMetaData, sauceLabsLaunchers } = require('../../shared/saucelabs');
module.exports = function (config) {
    // eslint-disable-next-line global-require
    const webpackConfig = require('./webpack.config.js');
    // for the karma test runs, we don't want to have any externals,
    // especially js-joda should be included!
    webpackConfig.externals = undefined;
    // clear entry, for karma we use the karmaWebpackTestEntry
    webpackConfig.entry = undefined;
    // no sourceMaps for karma build (seems to cause problems with saucelabs runs?)
    webpackConfig.devtool = false;

    config.set({
        files: [
            { pattern: 'test/karmaWebpackTestEntry.js' },
        ],
        frameworks: [
            'mocha',
            'chai',
        ],
        preprocessors: {
            'test/karmaWebpackTestEntry.js': ['webpack'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        sauceLabs: sauceLabsMetaData('@js-joda/extra'),
        customLaunchers: sauceLabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
        captureTimeout: 4 * 60 * 1000, // default 60000
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox'],
        plugins: ['karma-*'],
    });
};
