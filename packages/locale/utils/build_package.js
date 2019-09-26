#!/usr/bin/env node
/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const yargsPkg = require('yargs');
const { updateWebpackConfigForLocales } = require('./buildWebpackConfig');

let yargs = yargsPkg
    .options({
        output: {
            alias: 'o',
            string: true,
            default: path.resolve(`${__dirname}/../build/package`),
            description: 'output directory, where the package(s) are generated, can be absolute or relative (to cwd)'
        },
        locales: {
            alias: 'l',
            array: true,
            description: 'the locale(s) to generate in package'
        },
        stats: {
            alias: 's',
            boolean: true,
            default: false,
            description: 'output webpack stats at the end of the build'
        },
        statsOptions: {
            hidden: true,
            default: {
                colors: true,
            },
            description: '(only in config/pkgConfig) change the webpack stats options to be used, see also https://webpack.js.org/configuration/stats/'
        },
        cldrDataLoader: {
            alias: 'c',
            string: true,
            default: path.resolve(`${__dirname}/load_cldrData.prebuilt.js`),
            description: 'specify the cldrDataLoader to use, this will need to require the cldr-data json files. Since it has to require the actual files, it is different depending on installation location. See for example test/utils/karma_clrData.js and utils/load_cldrData.js. Can be absolute or relative (to cwd)'
        },
        modulesDir: {
            alias: 'm',
            string: true,
            default: path.resolve(`${__dirname}/../..`),
            description: 'specify the location of the node_modules dir. NOTE: both js-joda-locale and cldr-data must be located in this dir. Can be absolute or relative (to cdw)'
        },
        config: {
            config: true,
            description: 'path to a JSON file with config options, for a format example see build_package.default.json'
        },
        packages: {
            hidden: true,
            description: 'only from config and pkgConf, define several packages that will be built, for a format example see build_package.default.json'
        },
        debug: {
            boolean: true,
            default: false,
            description: 'output debug infos'
        },
    })
    .wrap(Math.min(120, yargsPkg.terminalWidth()))
    .help();

if ((process.env['npm_lifecycle_event'] === 'postinstall') || (process.env['POSTINSTALL_BUILD'] === '1')) {
    yargs = yargs
        .pkgConf('@js-joda/locale', process.cwd()) // in postinstall this is the js-joda-locale  module dir
        .pkgConf('@js-joda/locale', path.resolve(process.cwd(), '../..')); // in postinstall this is the dir of the root package

    const postInstallArgv = yargs.parse();
    if (!postInstallArgv.packages) {
        // load default packages from build_package.default.json
        yargs = yargs.config(require(path.resolve(__dirname, '../build_package.default.json')));
    }
}

const argv = yargs.parse();
if (argv.debug) {
    /* eslint-disable no-console */
    console.log('build_package parsed argument', argv);
    console.log('build_package cwd', process.cwd());
    console.log('build_package environemnt');
    Object.keys(process.env)
        .sort()
        .forEach(function (v) {
            console.log(v, process.env[v]);
        });
    /* eslint-enable no-console */
}

function createWebpackConfig(locales, output) {
    let webpackConfig = require(path.resolve(__dirname, '../webpack.config.js'))();
    // change output path
    webpackConfig.output.path = path.resolve(process.cwd(), output);
    webpackConfig.output.filename = 'index.js';

    // add cldr-data load workaround
    webpackConfig.resolve = {
        alias: {
            'cldr-data$': path.resolve(process.cwd(), argv.cldrDataLoader),
        }
    };

    const modulesDir = path.resolve(process.cwd(), argv.modulesDir);
    const cldrDataDir = path.resolve(modulesDir, 'cldr-data');
    if (!(fs.existsSync(cldrDataDir))) {
        // eslint-disable-next-line no-console
        console.warn(
            `cldr-data module directory (${cldrDataDir}) does not exist, js-joda-locale package build will very probably fail, so skipping it...!`);
        process.exit(0);
    }
    webpackConfig = updateWebpackConfigForLocales(webpackConfig, locales, modulesDir);
    return webpackConfig;
}

let webpackConfig;

if (argv.locales) {
    webpackConfig = [createWebpackConfig(argv.locales, argv.output)];
} else if (argv.packages) {
    webpackConfig = Object.keys(argv.packages).map((key) => {
        const locales = argv.packages[key];
        const output = path.resolve(path.resolve(process.cwd(), argv.output, key));
        return createWebpackConfig(locales, output);
    });
}

if (webpackConfig) {
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    /* eslint-disable no-console */
    if (argv.debug) {
        console.log(JSON.stringify(webpackConfig, null, 4));
    }
    const webpackCompiler = webpack(webpackConfig);

    webpackCompiler.apply(new webpack.ProgressPlugin());

    webpackCompiler.run((err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        if (argv.stats) {
            const statsOptions = argv.statsOptions || 'normal';
            console.log(stats.toString(statsOptions));
        }
    });
    /* eslint-enable no-console */
} else {
    yargs.showHelp();
}
