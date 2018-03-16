const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minify = JSON.parse(process.env.DIST_MIN || '0');
const sourceMaps = !minify;

function createBanner(){
    const packageJson = require('./package.json');
    const version = '//! @version ' + packageJson.name + ' - ' + packageJson.version + '\n';
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const banner = createBanner();

module.exports = {
    mode: minify ? 'production' : 'development',
    context: __dirname,
    entry: './src/js-joda.js',
    devtool: sourceMaps ? 'hidden-source-map' : false,
    output: {
        path: __dirname  + '/dist',
        filename: minify ? 'js-joda.min.js' : 'js-joda.js',
        libraryTarget: minify ? 'var' : 'umd',
        library: 'JSJoda'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'test')
            ],
            test: /.js$/
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
        )
    ],
    performance: {
        /*
         * silence the size warnings.. default is 250000... we are slightly larger in production/minify mode
         * set this to 300000, to get a warning if we exceed that size
         */
        maxEntrypointSize: 300000,
        maxAssetSize: 300000,
    }
};
