const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function createBanner(withTzdbVersion = true){
    const packageJson = require('./package.json');
    const tzdbLatest = require('./data/packed/latest');

    const version = withTzdbVersion ?
        `//! @version ${packageJson.name}-${packageJson.version}-${tzdbLatest.version}\n` :
        `//! @version ${packageJson.name}-${packageJson.version}\n`;
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const externals = {
    'js-joda': {
        amd: 'js-joda',
        commonjs: 'js-joda',
        commonjs2: 'js-joda',
        root: 'JSJoda'
    }
};

const moduleConfig = {
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
};

const optimization = {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                },
            }
        })
    ]
};

const plugins = withTzdbVersion => [
    new webpack.BannerPlugin(
        {banner: createBanner(withTzdbVersion), raw: true}
    ),
];

const productionConfig = {
    mode: 'production',
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: false,
    output: {
        path: __dirname  + '/dist',
        filename: 'js-joda-timezone.min.js',
        libraryTarget: 'umd',
        library: 'JSJodaTimezone'
    },
    externals,
    module: moduleConfig,
    optimization,
    plugins: plugins(true),
};

const productionConfigEmpty = {
    mode: 'production',
    context: __dirname,
    entry: './src/js-joda-timezone-empty.js',
    devtool: false,
    output: {
        path: __dirname  + '/dist',
        filename: 'js-joda-timezone-empty.min.js',
        libraryTarget: 'umd',
        library: 'JSJodaTimezone'
    },
    externals,
    module: moduleConfig,
    optimization,
    plugins: plugins(false),
};

const developmentConfig = {
    mode: 'development',
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: 'hidden-source-map',
    output: {
        path: __dirname  + '/dist',
        filename: 'js-joda-timezone.js',
        libraryTarget: 'umd',
        library: 'JSJodaTimezone'
    },
    externals,
    module: moduleConfig,
    plugins: plugins(true),
};

const developmentConfigEmpty = {
    mode: 'development',
    context: __dirname,
    entry: './src/js-joda-timezone-empty.js',
    devtool: 'hidden-source-map',
    output: {
        path: __dirname  + '/dist',
        filename: 'js-joda-timezone-empty.js',
        libraryTarget: 'umd',
        library: 'JSJodaTimezone'
    },
    externals,
    module: moduleConfig,
    plugins: plugins(false),
};

const config = [
    developmentConfig,
    productionConfig,
    developmentConfigEmpty,
    productionConfigEmpty,
];

module.exports = config;