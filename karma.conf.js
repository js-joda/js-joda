/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

const path = require('path');

module.exports = function (config) {
    const saucelabsLaunchers = {
        sl_ie_9: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '9'
        },
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 10',
            version: 'latest'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 10',
            version: 'latest'
        },
        sl_android_simulator: {
            base: 'SauceLabs',
            browserName: 'chrome',
            device: 'Android Emulator',
            platform: 'Android',
            version: 'latest'
        },
        sl_ios_simulator: {
            base: 'SauceLabs',
            browserName: 'safari',
            device: 'iPhone Simulator',
            platform: 'iOS',
            version: 'latest'
        },
        // these don't work yet :(
        sl_safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: 'latest'
        },
        sl_ios: {
            base: 'SauceLabs',
            browserName: 'safari',
            device: 'iPhone 6 Device',
            platform: 'iOS',
            version: 'latest'
        },
    };

    // eslint-disable-next-line global-require
    const webpackConfig = require('./webpack.config.js');
    // for the karma test runs, we don't want to have any externals,
    // especially js-joda and others should be included!
    webpackConfig.externals = undefined;
    // we can't use the cldr-data module load function from npm module since it uses 'fs' and other
    // modules not available in the browser... so we resolve the cldr-data module to our own "faked"
    // cldr-data loader that just requires the cldr-data files
    webpackConfig.resolve = {
        alias: {
            'cldr-data$': path.resolve(__dirname, 'test/utils/karma_cldrData.js')
        }
    };
    // for cldr-data, we only want to include needed locales from main and supplemental subdirs
    // otherwise the webpack karma bundle is getting too large
    webpackConfig.module.rules.push(
        {
            use: [{ loader: 'null-loader' }],
            resource: {
                // don't load everything in cldr-data
                test: path.resolve(__dirname, 'node_modules/cldr-data'),
                // except the actual data we need (supplemental and de, en, fr locales from main)
                exclude: [
                    path.resolve(__dirname, 'node_modules/cldr-data/main/de'),
                    path.resolve(__dirname, 'node_modules/cldr-data/main/en'),
                    path.resolve(__dirname, 'node_modules/cldr-data/main/fr'),
                    path.resolve(__dirname, 'node_modules/cldr-data/supplemental'),
                ],
            }
        });

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
            quiet: true,
            noInfo: true,
        },
        sauceLabs: {
            testName: 'js-joda-locale karma Tests',
            recordVideo: false,
            recordScreenshots: false,
            connectOptions: {
                logfile: 'sauce_connect.log',
            },
        },
        customLaunchers: Object.assign({}, saucelabsLaunchers, {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                debug: true,
            },
        }),
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
        captureTimeout: 4 * 60 * 1000, // default 60000
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        plugins: ['karma-*'],
    });
};
