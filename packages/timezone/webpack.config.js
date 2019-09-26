const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function createBanner(withTzdbVersion = true, fileSuffix = ''){
    const packageJson = require('./package.json');
    const tzdbLatest = require('./data/unpacked/latest');

    const version = withTzdbVersion ?
        `//! @version ${packageJson.name}-${packageJson.version}-${tzdbLatest.version}${fileSuffix}\n` :
        `//! @version ${packageJson.name}-${packageJson.version}\n`;
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const externals = {
    '@js-joda/core': {
        amd: '@js-joda/core',
        commonjs: '@js-joda/core',
        commonjs2: '@js-joda/core',
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

const bannerPlugin = (withTzdbVersion, fileSuffix) =>
    new webpack.BannerPlugin(
        {banner: createBanner(withTzdbVersion, fileSuffix), raw: true}
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
        bannerPlugin(true, fileSuffix),
        // replace the import in `src/tzdbData.js`
        // with a link to the data file we want to reference
        new webpack.NormalModuleReplacementPlugin(
            /data\/packed\/latest.json/,
            require.resolve(`./data/packed/latest${fileSuffix}`)
        ),
        // generate a `.d.ts` file for the bundle also
        new CopyPlugin([{
            from: './dist/js-joda-timezone.d.ts',
            to: `./js-joda-timezone${fileSuffix}.d.ts`,
        }]),
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
        bannerPlugin(true, fileSuffix),
        new webpack.NormalModuleReplacementPlugin(
            /data\/packed\/latest.json/,
            require.resolve(`./data/packed/latest${fileSuffix}`)
        ),
    ],
});

// find all packed data files produced by our `transform-data.js` script
const dataFileRegex = /^latest(.*)\.json/;
const dataFileSuffixes = fs.readdirSync('./data/packed')
    .filter(fileName => fileName.match(dataFileRegex))
    .map(fileName => fileName.match(dataFileRegex)[1]);
// and add a config to produce a development and prod bundle for each
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