const { babel } = require('@rollup/plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const { mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    uglify: uglify({ output: { comments: /^!/ } }),
};

const defaultConfig = {
    input: './src/js-joda-extra.js',
    plugins: [
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        name: 'JSJodaExtra',
    },
    external: ['@js-joda/core'],
};

const esmConfig =  mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda-extra.esm.js',
        format: 'es',
    },
});

const umdConfig = mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda-extra.js',
        format: 'umd',
        name: 'JSJodaExtra',
        sourcemap: true,
    },
});

const browserConfig = mergeDeepRight(defaultConfig, {
    plugins: [
        plugins.babel,
        plugins.uglify,
    ],
    output: {
        file: 'dist/js-joda-extra.min.js',
        format: 'iife',
        name: 'JSJodaExtra'
    },
});

module.exports = [
    esmConfig,
    umdConfig,
    browserConfig,
];

module.exports.plugins = plugins;
module.exports.defaultConfig = defaultConfig;
