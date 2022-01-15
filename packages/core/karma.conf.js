/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

const { mergeDeepRight } = require('ramda');
const testGlob = require('../../shared/rollup-test-glob');
const { sauceLabsLaunchers, sauceLabsMetaData } = require('../../shared/saucelabs');
const { defaultConfig: rollupDefaultConfig, plugins } = require('./rollup.config');

const rollupConfig = mergeDeepRight(rollupDefaultConfig, {
    onwarn: () => {},
    plugins: [
        plugins.babel,
        testGlob(),
    ],
    output: {
        format: 'iife',
        name: 'JSJoda',
        sourcemap: 'inline',
    },
});

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
        rollupPreprocessor: rollupConfig,
        sauceLabs: sauceLabsMetaData('@js-joda/core'),
        customLaunchers: sauceLabsLaunchers,
        browserDisconnectTimeout: 10000, // default 2000
        // browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, // default 10000
        captureTimeout: 4 * 60 * 1000, // default 60000
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
