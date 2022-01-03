const fs = require('fs');
const json = require('@rollup/plugin-json');
const { babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { uglify } = require('rollup-plugin-uglify');
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
    uglify: uglify({ output: { comments: /^!/ } }),
    json: json(),
    replace: (fileSuffix) => replace({
        'data/packed/latest.json': `data/packed/latest${fileSuffix}.json`,
        preventAssignment: true,
    })
};

const getDefaultConfig = (fileSuffix, prod) => ({
    input: `./src/js-joda-timezone${isEmptySuffix(fileSuffix)? '-empty' : ''}.js`,
    plugins: [
        plugins.replace(fileSuffix),
        plugins.babel,
        plugins.json,
        prod && plugins.uglify,
    ],
    output: {
        banner: createBannerBySuffix(fileSuffix),
        file: `dist/js-joda-timezone${fileSuffix}${prod ? '.min' : ''}.js`,
        name: 'JSJodaTimezone',
        format: prod ? 'iife' : 'umd',
        sourcemap: !prod,
        globals: {
            '@js-joda/core': 'JSJoda',
        }
    },
    external: ['@js-joda/core'],
});

const getProductionConfig = (fileSuffix) => getDefaultConfig(fileSuffix, true);

const getDevelopmentConfig = (fileSuffix) => getDefaultConfig(fileSuffix, false);

// find all packed data files produced by our `transform-data.js` script
const dataFileRegex = /^latest(.*)\.json/;
const dataFileSuffixes = fs.readdirSync('./data/packed')
    .filter(fileName => fileName.match(dataFileRegex))
    .map(fileName => fileName.match(dataFileRegex)[1])
    .concat('-empty');

// and add a config to produce a development and prod bundle for each
const productionConfigs = dataFileSuffixes.map(getProductionConfig);
const developmentConfigs = dataFileSuffixes.map(getDevelopmentConfig);

module.exports = [
    ...productionConfigs,
    ...developmentConfigs,
];

module.exports.plugins = plugins;
