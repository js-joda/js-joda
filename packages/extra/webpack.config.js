/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minify = JSON.parse(process.env.DIST_MIN || '0');
const sourceMaps = !minify;

function createBanner() {
    const packageJson = require('./package.json');
    const version = `//! @version ${packageJson.name} - ${packageJson.version}\n`;
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const banner = createBanner();

module.exports = {
    mode: minify ? 'production' : 'development',
    context: __dirname,
    entry: './src/js-joda-extra.js',
    devtool: sourceMaps ? 'hidden-source-map' : false,
    output: {
        path: `${__dirname}/dist`,
        filename: minify ? 'js-joda-extra.min.js' : 'js-joda-extra.js',
        libraryTarget: 'umd',
        library: 'JSJodaExtra',
        globalObject: 'this',
    },
    externals: {
        '@js-joda/core': {
            amd: '@js-joda/core',
            commonjs: '@js-joda/core',
            commonjs2: '@js-joda/core',
            root: 'JSJoda',
        },
    },
    module: {
        rules: [{
            use: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'test'),
            ],
            test: /.js$/,
        }],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: /^!/,
                    },
                }
            })
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            {banner: banner, raw: true}
        )
    ],
};
