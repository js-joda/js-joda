module.exports = function(config) {

    const saucelabsLaunchers = {
        sl_ie: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 10',
            version: 'latest'
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
            browserName: 'Chrome',
            deviceName: 'Android Emulator',
            platformName: 'Android',
            platformVersion: 'latest'
        },
        sl_ios_simulator: {
            base: 'SauceLabs',
            browserName: 'Safari',
            deviceName: 'iPhone Simulator',
            platformName: 'iOS',
            platformVersion: 'latest'
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

    const webpackConfig = require('./webpack.config.js');
    // clear entry, for karma we use the karmaWebpackTestEntry
    webpackConfig.entry = undefined;
    // no sourceMaps for karma build (seems to cause problems with saucelabs runs?)
    webpackConfig.devtool = false;

    config.set({
        files: [
            {pattern: 'test/karmaWebpackTestEntry.js'}
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        preprocessors: {
            'test/karmaWebpackTestEntry.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        sauceLabs: {
            testName: '@js-joda/core karma tests',
            recordVideo: false,
            recordScreenshots: false,
            // don't connect to saucelabs, let travis start a sauce connect proxy
            startConnect: false,
            // needed for travis sauce connect connection to work
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            connectOptions: {
                logfile: 'sauce_connect.log'
            }
        },
        customLaunchers: saucelabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
        captureTimeout: 4 * 60 * 1000, //default 60000
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        plugins: ['karma-*'],
        client: {
            mocha: {
                timeout : 6000
            }
        }
    });
};
