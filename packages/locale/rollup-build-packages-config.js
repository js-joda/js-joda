const { flatten, mergeDeepRight } = require('ramda');
const virtual = require('@rollup/plugin-virtual');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const renderCldrDataLoader = require('./utils/clrdr-data-render');
const { defaultConfig, plugins } = require('./rollup.config');

function buildRollupConfig({ locales }) {
    const cldr_data_js = renderCldrDataLoader(locales);
    return mergeDeepRight(defaultConfig, {
        plugins: [
            plugins.babel,
            virtual({
                'cldr-data': cldr_data_js,
            }),
            json(),
            nodeResolve(),
            commonjs(),
        ],
        output: {
            name: 'JSJodaLocale',
            globals: {
                '@js-joda/core': 'JSJoda',
                '@js-joda/timezone': 'JSJodaTimezone',
            },
        },
        external: ['@js-joda/core', '@js-joda/timezone'],
    });
}

function buildRollupConfigs({ destDir, packages }) {
    return flatten(Object.keys(packages).map((key) => {
        const rollupConfig = buildRollupConfig({
            locales: packages[key],
        });

        return [
            mergeDeepRight(rollupConfig, {
                output: {
                    file: `${destDir}/${key}/index.js`,
                    format: 'umd',
                    sourcemap: true,
                },
            }),
            mergeDeepRight(rollupConfig, {
                output: {
                    file: `${destDir}/${key}/index.esm.js`,
                    format: 'es',
                    sourcemap: true,
                },
            }),
            mergeDeepRight(rollupConfig, {
                plugins: rollupConfig.plugins.concat(plugins.terser),
                output: {
                    file: `${destDir}/${key}/index.min.js`,
                    format: 'iife',
                    sourcemap: false,
                },
            })];
    }));
}

module.exports.buildRollupConfig = buildRollupConfig;
module.exports.buildRollupConfigs = buildRollupConfigs;
