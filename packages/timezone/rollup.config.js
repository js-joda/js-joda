const fs = require('fs');
const json = require('@rollup/plugin-json');
const { babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-minification');
const { flatten, mergeDeepRight } = require('ramda');
const { createBanner } = require('../../shared/rollup-utils');
const packageJson = require('./package.json');
const tzdbLatest = require('./data/unpacked/latest');

const isEmptySuffix = (fileSuffix) => fileSuffix === '-empty';

function createBannerBySuffix(fileSuffix = ''){
    const version = isEmptySuffix(fileSuffix) ?
        packageJson.version : `${packageJson.version}-${tzdbLatest.version}${fileSuffix}`;
    return createBanner({ name: packageJson.name, version });
}

const plugins = {
    babel: babel({ babelHelpers: 'bundled' }),
    uglify: terser({ output: { comments: /^!/ } }),
    json: json(),
    replace: (fileSuffix) => replace({
        'data/packed/latest.json': `data/packed/latest${fileSuffix}.json`,
        preventAssignment: true,
    })
};

const getInputFile = (fileSuffix) => `./src/js-joda-timezone${isEmptySuffix(fileSuffix)? '-empty' : ''}.js`;

const getDefaultConfig = (fileSuffix) => ({
    input: getInputFile(fileSuffix),
    plugins: [
        plugins.replace(fileSuffix),
        plugins.babel,
        plugins.json,
    ],
    output: {
        banner: createBannerBySuffix(fileSuffix),
        name: 'JSJodaTimezone',
        globals: {
            '@js-joda/core': 'JSJoda',
        }
    },
    external: ['@js-joda/core'],
});

const buildRollupConfigurations = (fileSuffix) => {
    const defaultConfig = getDefaultConfig(fileSuffix);
    return [
        mergeDeepRight(defaultConfig, {
            output: {
                file: `dist/js-joda-timezone${fileSuffix}.js`,
                format: 'umd',
                sourcemap: true,
            }
        }),
        mergeDeepRight(defaultConfig, {
            output: {
                file: `dist/js-joda-timezone${fileSuffix}.esm.js`,
                format: 'es',
                sourcemap: true,
            }
        }),
        mergeDeepRight(defaultConfig, {
            plugins: defaultConfig.plugins.concat(plugins.uglify),
            output: {
                file: `dist/js-joda-timezone${fileSuffix}.min.js`,
                format: 'iife',
                sourcemap: false,
            }
        }),
    ];
};


// find all packed data files produced by our `transform-data.js` script
const dataFileRegex = /^latest(.*)\.json/;
const dataFileSuffixes = fs.readdirSync('./data/packed')
    .filter(fileName => fileName.match(dataFileRegex))
    .map(fileName => fileName.match(dataFileRegex)[1])
    .concat('-empty');

// and add a config to produce a development and prod bundle for each
const rollupConfigurations = flatten(dataFileSuffixes.map(buildRollupConfigurations));

module.exports = rollupConfigurations;

module.exports.plugins = plugins;
