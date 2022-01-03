/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { mergeDeepRight } = require('ramda');
const { sauceLabsMetaData, sauceLabsLaunchers } = require('../../shared/saucelabs');
const testGlob = require('../../shared/rollup-test-glob');
const { defaultConfig: rollupDefaultConfig, plugins } = require('./rollup.config');

const rollupConfig = mergeDeepRight(rollupDefaultConfig, {
    // onwarn: () => {},
    plugins: [
        plugins.babel,
        nodeResolve(),
        testGlob(),
    ],
    output: {
        format: 'iife',
        name: 'JSJodaLocale',
        sourcemap: 'inline',
        globals: {
            'chai': 'chai',
        }
    },
    external: ['chai'],
});

module.exports = function (config) {
    config.set({
        files: [
            { pattern: 'test/rollup-index.js' },
        ],
        frameworks: [
            'mocha',
            'chai',
        ],
        preprocessors: {
            'test/rollup-index.js': ['rollup'],
        },
        rollupPreprocessor: rollupConfig,
        sauceLabs: sauceLabsMetaData('@js-joda/locale'),
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
