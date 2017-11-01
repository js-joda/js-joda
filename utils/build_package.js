/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');
const { updateWebpackConfigForLocales } = require('./buildWebpackConfig');
let webpackConfig = require('../webpack.config.js');

const argv = yargs
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
            default: ['en', 'de', 'es'],
            description: 'the locale(s) to generate in package, default provides data for en(-US), de(-DE), es(-ES)'
        },
        stats: {
            alias: 's',
            boolean: true,
            default: false,
            description: 'output webpack stats at the end of the build'
        },
        statsOptions: {
            hidden: true,
            description: '(only in config/pkgConfig) change the webpack stats options to be used, see also https://webpack.js.org/configuration/stats/'
        },
        cldrDataLoader: {
            alias: 'c',
            string: true,
            default: path.resolve(`${__dirname}/load_cldrData.js`),
            description: 'specify the cldrDataLoader to use, this will need to require the cldr-data json files. Since it has to require the actual files, it is different depending on installation location. See for example test/utils/karma_clrData.js and utils/load_cldrData.js. Can be absolute or relative (to cwd)'
        },
        modulesDir: {
            alias: 'm',
            string: true,
            default: 'node_modules',
            description: 'specify the location of the node_modules dir. NOTE: both js-joda-locale and cldr-data must be located in this dir. Can be absolute or relative (to cdw)'
        },
        config: {
            config: true,
            description: 'path to a JSON file with config options, format is the same as for the config object in package.json'
        },
    })
    .pkgConf('js-joda-locale')
    // default packages ?
    .config({
        packages: {
            core: ['en', 'de', 'es'],
            de: ['de'],
            de_all: ['de.*'],
            en: ['en'],
            en_all: ['en.*'],
            es: ['es'],
        },
        statsOptions: {
            colors: true,
        }
    })
    .wrap(Math.min(120, yargs.terminalWidth()))
    .help()
    .argv;

// change output path
webpackConfig.output.path = path.resolve(process.cwd(), argv.output);

// add cldr-data load workaround
webpackConfig.resolve = {
    alias: {
        'cldr-data$': path.resolve(process.cwd(), argv.cldrDataLoader),
    }
};

const locales = argv.locales;
const modulesDir = path.resolve(process.cwd(), argv.modulesDir);
webpackConfig = updateWebpackConfigForLocales(webpackConfig, locales, modulesDir);


/* eslint-disable no-console */
webpack(webpackConfig, (err, stats) => {
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
