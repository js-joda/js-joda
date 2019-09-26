/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const minify = JSON.parse(process.env.DIST_MIN || '0');
const sourceMaps = !minify;

function createBanner() {
    const packageJson = require('./package.json');
    const version = `//! @version ${packageJson.name} - ${packageJson.version}\n`;
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const banner = createBanner();

const outputFilename = minify ? 'js-joda-locale.min.js' : 'js-joda-locale.js';

const createConfig = (/*env, argv*/) => {
    const config = {
        mode: minify ? 'production' : 'development',
        context: __dirname,
        entry: './src/js-joda-locale.js',
        devtool: sourceMaps ? 'hidden-source-map' : false,
        output: {
            globalObject: 'this',
            path: `${__dirname}/dist`,
            filename: outputFilename,
            libraryTarget: 'umd',
            library: 'JSJodaLocale',
        },
        externals: {
            '@js-joda/core': {
                amd: '@js-joda/core',
                commonjs: '@js-joda/core',
                commonjs2: '@js-joda/core',
                root: 'JSJoda',
            },
            '@js-joda/timezone': {
                amd: '@js-joda/timezone',
                commonjs: '@js-joda/timzezone',
                commonjs2: '@js-joda/timezone',
                root: 'JSJodaTimezone',
            },
            'cldr-data': {
                amd: 'cldr-data',
                commonjs: 'cldr-data',
                commonjs2: 'cldr-data',
                root: 'cldrData',
            },
            'cldrjs': {
                amd: 'cldrjs',
                commonjs: 'cldrjs',
                commonjs2: 'cldrjs',
                root: 'Cldr',
            },
        },
        module: {
            rules: [
                {
                    use: [{ loader: 'babel-loader' }],
                    resource: {
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'test'),
                        ],
                        test: /.js$/,
                    }
                },
            ],
        },
        plugins: [
            new webpack.BannerPlugin({ banner, raw: true }),
        ],
        performance: {
            /* we know that we will be generating big packages with locale data, no reason to have webpack warn us */
            maxEntrypointSize: 25000000,
            maxAssetSize: 25000000,
        }
    };
    return config;
};
module.exports = createConfig;
