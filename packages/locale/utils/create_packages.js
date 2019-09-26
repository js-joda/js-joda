#!/usr/bin/env node
/*
 * @copyright (c) 2018, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');
const fs = require('fs');
const yargsPkg = require('yargs');
const { execFile } = require('child_process');

// this file will create npm (sub-) packages, build_package is used to create a js-joda-locale bundled packages in each package dir

const yargs = yargsPkg
    .options({
        packagesDir: {
            alias: 'p',
            string: true,
            default: path.resolve(__dirname, '../packages'),
            description: 'packages directory, where the package(s) are generated, can be absolute or relative (to cwd)'
        },
        config: {
            config: true,
            description: 'path to a JSON file with config options, for a format example see build_package.default.json'
        },
        packages: {
            hidden: true,
            description: 'only from config, define several packages that will be created'
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
        url: 'https://github.com/js-joda/js-joda-locale.git'
    },
    main: 'dist/index.js',
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
        url: 'https://github.com/js-joda/js-joda-locale/issues'
    },
    homepage: 'https://github.com/js-joda/js-joda-locale#readme',
    peerDependencies: {
        '@js-joda/core': mainPackageJSON.peerDependencies['@js-joda/core'],
        '@js-joda/timezone': mainPackageJSON.peerDependencies['@js-joda/timezone'],
    },
    dependencies: {},
    devDependencies: {}
};

const readmeTemplate = fs.readFileSync(path.resolve(__dirname, 'README_package.template.md'), 'utf8');
const readmeLocaleRegex = /{{locale}}/g;

// TODO: build minified (DIST_MIN=1) package?? in dist/index.min.js?
Object.keys(argv.packages).forEach((packageName) => {
    // eslint-disable-next-line no-console
    console.info('creating', packageName);
    const packageDir = path.resolve(argv.packagesDir, packageName);
    if (!fs.existsSync(packageDir)) {
        fs.mkdirSync(packageDir);
    }
    // create package.json
    packageTemplate.version = mainPackageJSON.version;
    packageTemplate.name = `@js-joda/locale_${packageName}`;
    packageTemplate.description = `prebuilt js-joda locale package for locales: ${argv.packages[packageName]}`;
    fs.writeFileSync(path.resolve(packageDir, 'package.json'),
        JSON.stringify(packageTemplate, null, 4));
    fs.writeFileSync(path.resolve(packageDir, 'README.md'),
        readmeTemplate.replace(readmeLocaleRegex, argv.packages[packageName].join(',')));
    const nodeArgs = [
        './utils/build_package.js',
        '-o', `${path.resolve(packageDir, 'dist')}`,
        '-m', 'node_modules',
        '-c', 'utils/load_cldrData.prebuilt.js',
    ];
    argv.packages[packageName].forEach((locale) => {
        nodeArgs.push('-l', `${locale}`);
    });
    execFile(
        'node',
        nodeArgs,
        undefined, /* options */
        (error, stdout, stderr) => {
            if (error) {
                throw error;
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
});
