const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-minification');
const { mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    uglify: terser({ output: { comments: /^!/ } }),
};

const defaultConfig = {
    input: './src/js-joda.js',
    plugins: [
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        name: 'JSJoda',
    }

};

module.exports = [
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda.esm.js',
            format: 'es',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        output: {
            file: 'dist/js-joda.js',
            format: 'umd',
            name: 'JSJoda',
            sourcemap: true,
        },
    }),
    mergeDeepRight(defaultConfig, {
        plugins: [
            plugins.babel,
            plugins.uglify,
        ],
        output: {
            file: 'dist/js-joda.min.js',
            format: 'iife',
            name: 'JSJoda',
            sourcemap: false,
        },
    }),
];

module.exports.plugins = plugins;
module.exports.defaultConfig = defaultConfig;
