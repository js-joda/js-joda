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
    input: './src/js-joda.js',
    plugins: [
        plugins.babel,
    ],
    output: {
        banner: createBanner({ name: packageJson.name, version: packageJson.version }),
        name: 'JSJoda',
    }

};

const esmConfig =  mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda.esm.js',
        format: 'es',
    },
});

const umdConfig = mergeDeepRight(defaultConfig, {
    output: {
        file: 'dist/js-joda.js',
        format: 'umd',
        name: 'JSJoda',
        sourcemap: true,
    },
});

const browserConfig = mergeDeepRight(defaultConfig, {
    plugins: [
        plugins.babel,
        plugins.uglify,
    ],
    output: {
        file: 'dist/js-joda.min.js',
        format: 'iife',
        name: 'JSJoda'
    },
});

module.exports = [
    esmConfig,
    umdConfig,
    browserConfig,
];

module.exports.plugins = plugins;
module.exports.defaultConfig = defaultConfig;
