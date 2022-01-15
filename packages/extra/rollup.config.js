const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const { mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    uglify: terser({ output: { comments: /^!/ } }),
};

const defaultConfig = {
    input: './src/js-joda-extra.js',
    plugins: [
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        name: 'JSJodaExtra',
        globals: {
            '@js-joda/core': 'JSJoda',
        }
    },
    external: ['@js-joda/core'],
};

module.exports = [
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda-extra.esm.js',
            format: 'es',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda-extra.js',
            format: 'umd',
            name: 'JSJodaExtra',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        plugins: [
            plugins.babel,
            plugins.uglify,
        ],
        output: {
            file: 'dist/js-joda-extra.min.js',
            format: 'iife',
            name: 'JSJodaExtra',
            sourcemap: false,
        },
    }),
];

module.exports.plugins = plugins;
module.exports.defaultConfig = defaultConfig;
