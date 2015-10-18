module.exports = {
    context: __dirname,
    entry: './src/joda.js',
    output: {
        path: __dirname  + "/dist",
        filename: 'joda.dist.js'
    },
    module: {
        loaders: [
            { test: __dirname + "/src",
              loader: 'babel-loader'
            }
        ]
    }
};

