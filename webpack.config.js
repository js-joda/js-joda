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

const bannerPlugin = withTzdbVersion =>
    new webpack.BannerPlugin(
        {banner: createBanner(withTzdbVersion), raw: true}
    );

const output = {
    path: __dirname  + '/dist',
    libraryTarget: 'umd',
    library: 'JSJodaTimezone',
    globalObject: 'this',
};

const getProductionConfig = (fileSuffix) => ({
    mode: 'production',
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: false,
    output: Object.assign({}, output,
        { filename: `js-joda-timezone${fileSuffix}.min.js` }
    ),
    externals,
    module: moduleConfig,
    optimization,
    plugins: [
        bannerPlugin(true),
        new webpack.NormalModuleReplacementPlugin(
            /data\/packed\/latest.json/,
            require.resolve(`./data/packed/latest${fileSuffix}`)
        ),
    ],
});

const getDevelopmentConfig = (fileSuffix) => ({
    mode: 'development',
    context: __dirname,
    entry: './src/js-joda-timezone.js',
    devtool: 'hidden-source-map',
    output: Object.assign({}, output,
        { filename: `js-joda-timezone${fileSuffix}.js` }
    ),
    externals,
    module: moduleConfig,
    plugins: [
        bannerPlugin(true),
        new webpack.NormalModuleReplacementPlugin(
            /data\/packed\/latest.json/,
            require.resolve(`./data/packed/latest${fileSuffix}`)
        ),
    ],
});


const dataFileRegex = /^latest(.*)\.json/;
const dataFileSuffixes = fs.readdirSync('./data/packed')
    .filter(fileName => fileName.match(dataFileRegex))
    .map(fileName => fileName.match(dataFileRegex)[1]);
const productionConfigs = dataFileSuffixes.map(getProductionConfig);
const developmentConfigs = dataFileSuffixes.map(getDevelopmentConfig);

const productionConfigEmpty = {
    mode: 'production',
    context: __dirname,
    entry: './src/js-joda-timezone-empty.js',
    devtool: false,
    output: Object.assign({}, output,
        { filename: 'js-joda-timezone-empty.min.js' }
    ),
    externals,
    module: moduleConfig,
    optimization,
    plugins: [bannerPlugin(false)],
};

const developmentConfigEmpty = {
    mode: 'development',
    context: __dirname,
    entry: './src/js-joda-timezone-empty.js',
    devtool: 'hidden-source-map',
    output: Object.assign({}, output,
        { filename: 'js-joda-timezone-empty.js' }
    ),
    externals,
    module: moduleConfig,
    plugins: [bannerPlugin(false)],
};

const config = [
    ...developmentConfigs,
    ...productionConfigs,
    developmentConfigEmpty,
    productionConfigEmpty,
];

module.exports = config;