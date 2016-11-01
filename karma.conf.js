module.exports = function(config) {
    
    var saucelabsLaunchers = {
        sl_ie_9: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '9'
        },
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'beta'
        },
    };
    
    config.set({
        files: [
            {pattern: 'test/*Test.js'},
            {pattern: 'test/**/*Test.js'},
        ],
        exclude: [
            'test/plugTest.js'
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        preprocessors: {
            'test/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            noInfo: true
        },
        sauceLabs: {
            testName: 'js-joda karma Tests',
            recordVideo: true,
            recordScreenshots: false
        },
        customLaunchers: saucelabsLaunchers,
        // browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        // browserNoActivityTimeout: 1 * 60 * 1000, //default 10000
        // captureTimeout: 4 * 60 * 1000, //default 60000
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        plugins: ['karma-*']
    });
};
