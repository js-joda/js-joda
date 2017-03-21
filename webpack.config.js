const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

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

module.exports = {
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: sourceMaps ? 'hidden-source-map' : '',
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
        loaders: [{
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'test')
            ],
            test: /.js$/
        },{
            loader: 'json-loader',
            test: /.json$/
        }]
    },
    plugins: minify ? [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(
            banner, {raw: true}
        )
    ] : [
        new webpack.BannerPlugin(
            banner, {raw: true}
        )
    ]
};
