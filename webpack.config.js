var webpack = require("webpack");

var minify = JSON.parse(process.env.DIST_MIN || "0");
var sourceMaps = !minify

module.exports = {
    context: __dirname,
    entry: './src/joda.js',
    devtool: sourceMaps ? "source-map" : "",
    output: {
        path: __dirname  + "/dist",
        filename: minify ? 'joda.min.js' : 'joda.js',
        libraryTarget: minify ? 'var' : 'umd'
    },
    module: {
        loaders: [
            { test: __dirname + "/src",
              loader: 'babel-loader'
            },
            { test: __dirname + "/test",
              loader: 'babel-loader'
            }
        ]
    },
    plugins: minify ? [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ] : []
};

