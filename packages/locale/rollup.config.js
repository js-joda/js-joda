const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const { mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    terser: terser(),
};

const defaultConfig = {
    input: './src/js-joda-locale.js',
    plugins: [
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        globals: {
            '@js-joda/core': 'JSJoda',
            '@js-joda/timezone': 'JSJodaTimezone',
            'cldr-data': 'cldr-data',
            'cldrjs': 'cldrjs',
        },
    },
    external: ['@js-joda/core', '@js-joda/timezone', 'cldrjs', 'cldr-data'],
};

const esmConfig = mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda-locale.esm.js',
        format: 'es'
    },
});

const umdConfig = mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda-locale.js',
        format: 'umd',
        name: 'JSJodaLocale',
        sourcemap: true,
    },
});

const browserConfig = mergeDeepRight(defaultConfig, {
    plugins: [
        plugins.babel,
        plugins.terser,
    ],
    output: {
        file: 'dist/js-joda-locale.min.js',
        format: 'iife',
        name: 'JSJodaLocale',
    },
});

module.exports = [
    esmConfig,
    umdConfig,
    browserConfig,
];

module.exports.defaultConfig = defaultConfig;
module.exports.plugins = plugins;
