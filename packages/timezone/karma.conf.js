/*
 * @copyright (c) 2016-present, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// eslint-disable-next-line func-names
module.exports = function (config) {
    const saucelabsLaunchers = {
        sl_ie: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 10',
            version: 'latest'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 10',
            version: 'latest',
        },
        // the following launchers are currently unused,
        // but provided here for manual/local tests if needed
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 10',
            version: 'latest',
        },
        sl_safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: 'latest',
        },
        sl_edge: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: 'latest',
        },
    };

    // eslint-disable-next-line global-require
    const webpackConfigs = require('./webpack.config.js');
    // find the config for our main dev build
    const webpackConfig = webpackConfigs.find(c => c.output.filename === 'js-joda-timezone.js');
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
        sauceLabs: {
            testName: '@js-joda/timezone karma tests',
            recordVideo: false,
            recordScreenshots: false,
            // don't connect to saucelabs, let travis start a sauce connect proxy
            startConnect: false,
            // needed for travis sauce connect connection to work
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            connectOptions: {
                logfile: 'sauce_connect.log',
            },
        },
        customLaunchers: saucelabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
        captureTimeout: 4 * 60 * 1000, // default 60000
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        plugins: ['karma-*'],
    });
};
