const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minify = JSON.parse(process.env.DIST_MIN || '0');
const sourceMaps = !minify;

function createBanner(){
    const packageJson = require('./package.json');
    const tzdbLatest = require('moment-timezone/data/packed/latest');

    const version = '//! @version ' + packageJson.name + ' - ' + packageJson.version + '-' + tzdbLatest.version + '\n';
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const banner = createBanner();

const config = {
    mode: minify ? 'production' : 'development',
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: sourceMaps ? 'hidden-source-map' : false,
    output: {
        path: __dirname  + '/dist',
        filename: minify ? 'js-joda-timezone.min.js' : 'js-joda-timezone.js',
        libraryTarget: 'umd',
        library: 'JSJodaTimezone'
    },
    externals: {
        'js-joda': {
            amd: 'js-joda',
            commonjs: 'js-joda',
            commonjs2: 'js-joda',
            root: 'JSJoda'
        }
    },
    module: {
        rules: [{
            use: [{loader: 'babel-loader'}],
            resource: {
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'test')
                ],
                test: /.js$/
            },
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                }
            })
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            {banner: banner, raw: true}
        ),
    ],
};

module.exports = config;