const { flatten, mergeDeepRight } = require('ramda');
const virtual = require('@rollup/plugin-virtual');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const renderCldrDataLoader = require('./utils/clrdr-data-render');
const { defaultConfig, plugins } = require('./rollup.config');

function buildRollupConfigs(destDir, packages) {
    return flatten(Object.keys(packages).map((key) => {
        const localesInPackage =  packages[key];
        const cldr_data_js = renderCldrDataLoader(localesInPackage);
        const umdConfig = mergeDeepRight(defaultConfig, {
            plugins: [
                virtual({
                    'cldr-data': cldr_data_js,
                }),
                plugins.babel,
                json(),
                nodeResolve(),
                commonjs(),
            ],
            output: {
                file: `${destDir}/${key}/index.js`,
                format: 'umd',
                name: 'JSJodaLocale',
                sourcemap: true,
                globals: {
                    '@js-joda/core': 'JSJoda',
                    '@js-joda/timezone': 'JSJodaTimezone',
                },
            },
            external: ['@js-joda/core', '@js-joda/timezone'],
        });

        const browserConfig = mergeDeepRight(umdConfig, {
            plugins: umdConfig.plugins.concat(plugins.terser),
            output: {
                file: `${destDir}/${key}/index.min.js`,
                format: 'iife',
                name: 'JSJodaLocale',
                sourcemap: false,
            },
        });

        return [umdConfig, browserConfig];
    }));
}

module.exports.buildRollupConfigs = buildRollupConfigs;
