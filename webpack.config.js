var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var minify = JSON.parse(process.env.DIST_MIN || '0');
var sourceMaps = !minify;

module.exports = {
    context: __dirname,
    entry: './src/js-joda.js',
    devtool: sourceMaps ? 'source-map' : '',
    output: {
        path: __dirname  + '/dist',
        filename: minify ? 'js-joda.min.js' : 'js-joda.js',
        libraryTarget: minify ? 'var' : 'umd',
        library: 'jsjoda'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'test')
            ],
            test: /.js$/
        }]
    },
    plugins: minify ? [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),
        new webpack.BannerPlugin(
            fs.readFileSync('./src/license-preample.js', 'utf8'),
            {raw: true}
        )
    ] : []
};
