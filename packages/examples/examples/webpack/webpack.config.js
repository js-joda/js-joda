module.exports = {
    mode: 'development',
    entry: './examples/webpack/webpack-index.js',
    output: {
        filename: '../examples/webpack/webpack-bundle.js',
    },
    module: {
        rules: [{
            use: [{loader: 'babel-loader'}],
            resource: {
                test: /.js$/
            },
        }]
    },
    target: 'node'
};