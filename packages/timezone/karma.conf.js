/*
 * @copyright (c) 2016-present, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const testGlob = require('../../shared/rollup-test-glob');
const { sauceLabsMetaData, sauceLabsLaunchers } = require('../../shared/saucelabs');
const { plugins } = require('./rollup.config');

module.exports = function (config) {
    config.set({
        files: [
            { pattern: 'test/rollup-index.js', watched: false },
        ],
        frameworks: [
            'mocha',
            'chai',
        ],
        preprocessors: {
            'test/rollup-index.js': ['rollup'],
        },
        rollupPreprocessor: {
            // onwarn: () => {},
            plugins: [
                plugins.babel,
                plugins.json,
                nodeResolve(),
                testGlob(),
            ],
            output: {
                format: 'iife',
                name: 'JSJodaTimezone',
                sourcemap: 'inline',
                globals: {
                    'chai': 'chai',
                }
            },
            external: ['chai'],
        },
        sauceLabs: sauceLabsMetaData('@js-joda/timezone'),
        customLaunchers: sauceLabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
        captureTimeout: 4 * 60 * 1000, // default 60000
        reporters: ['progress'],
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        plugins: ['karma-*'],
    });
};
