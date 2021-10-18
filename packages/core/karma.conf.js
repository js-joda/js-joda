const { sauceLabsLaunchers, sauceLabsMetaData } = require('../../shared/saucelabs');

module.exports = function(config) {
    const webpackConfig = require('./webpack.config.js');
    // clear entry, for karma we use the karmaWebpackTestEntry
    webpackConfig.entry = undefined;
    // no sourceMaps for karma build (seems to cause problems with saucelabs runs?)
    webpackConfig.devtool = false;

    config.set({
        files: [
            { pattern: 'test/karmaWebpackTestEntry.js' }
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
        sauceLabs: sauceLabsMetaData('@js-joda/core'),
        customLaunchers: sauceLabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
        captureTimeout: 4 * 60 * 1000, //default 60000
        reporters: ['progress'],
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        plugins: ['karma-*'],
        client: {
            mocha: {
                timeout : 6000
            }
        }
    });
};
