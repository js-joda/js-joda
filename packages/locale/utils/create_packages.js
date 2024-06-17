#!/usr/bin/env node
/*
 * @copyright (c) 2018, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');
const fs = require('fs');
const yargsPkg = require('yargs');
const { packages: prebuiltPackages } = require('../prebuilt-packages.json');

// this file will create npm (sub-) packages, build_package is used to create a js-joda-locale bundled packages in each package dir

const yargs = yargsPkg
    .options({
        packagesDir: {
            alias: 'p',
            string: true,
            default: path.resolve(__dirname, '../packages'),
            description: 'packages directory, where the package(s) are generated, can be absolute or relative (to cwd)'
        },
        prebuiltDir: {
            alias: 'b',
            string: true,
            default: path.resolve(__dirname, '../dist/prebuilt'),
            description: 'prebuilt directory, where the package(s) are bundled from a previous step. Can be absolute or relative (to cwd)'
        },
        packages: {
            description: 'define several packages that will be created',
            default: prebuiltPackages,
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
    console.log('create_packages parsed argument', argv);
    console.log('create_packages cwd', process.cwd());
    /* eslint-enable no-console */
}

const mainPackageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json')));
const packageTemplate = {
    name: '<will be overridden>',
    version: '<will be overridden>',
    description: '<will be overridden>',
    repository: {
        type: 'git',
        url: 'https://github.com/js-joda/js-joda.git'
    },
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
    typings: 'dist/js-joda-locale.d.ts',
    keywords: [
        'date',
        'time',
        'locale'
    ],
    author: 'phueper',
    contributors: [
        'pithu',
        'phueper'
    ],
    license: 'BSD-3-Clause',
    bugs: {
        url: 'https://github.com/js-joda/js-joda/issues'
    },
    homepage: 'https://js-joda.github.io/js-joda',
    peerDependencies: {
        '@js-joda/core': mainPackageJSON.peerDependencies['@js-joda/core'],
        '@js-joda/timezone': mainPackageJSON.peerDependencies['@js-joda/timezone'],
    },
    dependencies: {},
    devDependencies: {},
    publishConfig: {
        access: 'public'
    }
};

const readmeTemplate = fs.readFileSync(path.resolve(__dirname, 'README_package.template.md'),
    'utf8');
const readmeLocaleRegex = /{{locale}}/g;

Object.keys(argv.packages).forEach((packageName) => {
    // eslint-disable-next-line no-console
    console.info('creating', packageName);
    const packageDir = path.resolve(argv.packagesDir, packageName);
    if (!fs.existsSync(packageDir)) {
        fs.mkdirSync(packageDir);
    }
    const distDir = path.resolve(argv.packagesDir, packageName, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    const prebuiltDir = path.resolve(argv.prebuiltDir, packageName);
    if (!fs.existsSync(prebuiltDir)) {
        throw new Error(`prebuilt bundle not found for package ${packageName}.\nDid you forget to run "npm run build-prebuilt" ?`);
    }
    // create package.json
    packageTemplate.version = mainPackageJSON.version;
    packageTemplate.name = `@js-joda/locale_${packageName}`;
    packageTemplate.description = `prebuilt js-joda locale package for locales: ${argv.packages[packageName]}`;
    fs.writeFileSync(path.resolve(packageDir, 'package.json'),
        JSON.stringify(packageTemplate, null, 4));
    fs.writeFileSync(path.resolve(packageDir, 'README.md'),
        readmeTemplate.replace(readmeLocaleRegex, argv.packages[packageName].join(',')));
    fs.copyFileSync(path.resolve(__dirname, '..', 'typings', 'js-joda-locale.d.ts'),
        path.resolve(packageDir, 'dist', 'js-joda-locale.d.ts'));

    for (const file of ['index.js', 'index.js.map', 'index.min.js', 'index.esm.js', 'index.esm.js.map']) {
        fs.copyFileSync(
            path.resolve(prebuiltDir, file),
            path.resolve(packageDir, 'dist', file));
    }
});
