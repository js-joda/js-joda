#!/usr/bin/env node
/*
 * @copyright (c) 2018, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

const path = require('path');
const fs = require('fs');
const yargsPkg = require('yargs');
const { execFile } = require('child_process');

// this file will npm publish the locales specific packages create with create_package.js

const yargs = yargsPkg
    .options({
        packagesDir: {
            alias: 'p',
            string: true,
            default: path.resolve(__dirname, '../packages'),
            description: 'packages directory, where the package(s) are generated, can be absolute or relative (to cwd)'
        },
        mainDir: {
            alias: 'm',
            string: true,
            default: path.resolve(__dirname, '..'),
            description: 'main directory, where the main package is located, can be absolute or relative (to cwd)'
        },
        dryRun: {
            alias: 'd',
            boolean: true,
            default: true,
            description: 'perform dryRun, defaults to true'
        },
        beta: {
            alias: 'b',
            boolean: true,
            default: true,
            description: 'perform release / publish'
        },
        release: {
            alias: 'r',
            boolean: true,
            default: false,
            description: 'perform release / publish'
        },
        debug: {
            boolean: true,
            default: false,
            description: 'output debug infos'
        },
    })
    .wrap(Math.min(120, yargsPkg.terminalWidth()))
    .help();

const argv = yargs.parse();
if (argv.debug) {
    /* eslint-disable no-console */
    console.log('publish_release parsed argument', argv);
    console.log('publish_release cwd', process.cwd());
    /* eslint-enable no-console */
}

const packages = fs
    .readdirSync(argv.packagesDir)
    .filter((name) => fs.lstatSync(path.resolve(argv.packagesDir, name)).isDirectory());
const npmArgs = [
    'publish',
    '--access=public',
];
if (argv.beta) {
    npmArgs.push('--tag', 'beta');
}
packages.forEach((packageName) => {
    const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(argv.packagesDir, packageName, 'package.json')));

    // eslint-disable-next-line no-console
    console.info('processing', packageJSON.name);

    const npmOptions = {
        cwd: path.resolve(argv.packagesDir, packageName)
    };
    const runArgs = [...npmArgs, path.resolve(argv.packagesDir, packageName)];
    if (argv.debug) {
        /* eslint-disable no-console */
        console.log('running npm with args', runArgs, 'options ', npmOptions);
        /* eslint-enable no-console */
    }
    if (argv.dryRun) {
        // eslint-disable-next-line no-console
        console.info('dryRun, not running npm publish');
    } else {
        execFile(
            'npm',
            runArgs,
            npmOptions,
            (error, stdout, stderr) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.error(`error occurred when creating '${packageName}': `, error);
                }
                if (stdout) {
                    // eslint-disable-next-line no-console
                    console.log(`stdout output from creating '${packageName}': `, stdout);
                }
                if (stderr) {
                    // eslint-disable-next-line no-console
                    console.error(`stderr output from creating '${packageName}': `, stderr);
                }
            }
        );
    }
});
const npmOptions = {
    cwd: path.resolve(argv.mainDir)
};
const packageJSON = JSON.parse(
    fs.readFileSync(path.resolve(argv.mainDir, 'package.json')));
const runArgs = [...npmArgs, path.resolve(argv.mainDir)];

// eslint-disable-next-line no-console
console.info('processing', packageJSON.name);
if (argv.debug) {
    /* eslint-disable no-console */
    console.log('running npm with args', runArgs, 'options ', npmOptions);
    /* eslint-enable no-console */
}
if (argv.dryRun) {
    // eslint-disable-next-line no-console
    console.info('dryRun, not running npm publish');
} else {
    execFile(
        'npm',
        runArgs,
        npmOptions,
        (error, stdout, stderr) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error('error occurred when creating main package: ', error);
            }
            if (stdout) {
                // eslint-disable-next-line no-console
                console.log('stdout output from creating main package: ', stdout);
            }
            if (stderr) {
                // eslint-disable-next-line no-console
                console.error('stderr output from creating main package: ', stderr);
            }
        }
    );
}
