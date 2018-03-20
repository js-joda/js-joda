const path = require('path');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/js-joda.js',
    devtool: 'hidden-source-map',
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
    performance: {
        /*
         * silence the size warnings.. default is 250000... we are slightly larger in production/minify mode
         * set this to 300000, to get a warning if we exceed that size
         */
        maxEntrypointSize: 300000,
        maxAssetSize: 300000,
    }
};
