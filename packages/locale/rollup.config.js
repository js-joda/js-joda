const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-minification');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    terser: terser({ output: { comments: /^!/ } }),
};

const defaultConfig = {
    input: './src/js-joda-locale.js',
    plugins: [
        nodeResolve(),
        commonjs(),
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        globals: {
            '@js-joda/core': 'JSJoda',
            '@js-joda/timezone': 'JSJodaTimezone',
            'cldr-data': 'cldr-data',
        },
    },
    external: ['@js-joda/core', '@js-joda/timezone', 'cldr-data'],
};

module.exports = [
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda-locale.esm.js',
            format: 'es',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda-locale.js',
            format: 'umd',
            name: 'JSJodaLocale',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        plugins: [
            nodeResolve(),
            commonjs(),
            plugins.babel,
            plugins.terser,
        ],
        output: {
            file: 'dist/js-joda-locale.min.js',
            format: 'iife',
            name: 'JSJodaLocale',
        },
    }),
];

module.exports.defaultConfig = defaultConfig;
module.exports.plugins = plugins;
