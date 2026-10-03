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

// The prebuilt bundles only import `registerLocaleData` from @js-joda/locale, which was introduced in
// 5.0.0. Keep this range fixed: deriving it from the current @js-joda/locale version would raise the
// minimum with every release and rewrite all prebuilt manifests on every version bump.
// Raise it only when the prebuilt bundles start to use a newer @js-joda/locale API.
const LOCALE_PEER_RANGE = '>=5.0.0';

// Key order and content match the committed packages/<locale>/package.json files, so that regenerating
// them leaves the working tree clean.
const createPackageJSON = ({ name, version, description }) => ({
    name,
    version,
    description,
    repository: {
        type: 'git',
        url: 'https://github.com/js-joda/js-joda.git'
    },
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
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
        '@js-joda/locale': LOCALE_PEER_RANGE,
        '@js-joda/timezone': mainPackageJSON.peerDependencies['@js-joda/timezone'],
    },
    peerDependenciesMeta: {
        '@js-joda/timezone': {
            optional: true,
        },
    },
    publishConfig: {
        access: 'public'
    }
});

const packagesDir = path.resolve(argv.packagesDir);
const packageNames = Object.keys(argv.packages);

// fail before touching packagesDir if a prebuilt bundle is missing
for (const packageName of packageNames) {
    if (!fs.existsSync(path.resolve(argv.prebuiltDir, packageName))) {
        throw new Error(`prebuilt bundle not found for package ${packageName}.\nDid you forget to run "npm run build-prebuilt" ?`);
    }
}

// Prebuilt package directories in packagesDir: every listed package, plus any directory that holds a
// generated @js-joda/locale_* package (e.g. a locale removed from the prebuilt package list).
const readPrebuiltPackageJSONs = () => {
    const packageJSONs = {};
    if (!fs.existsSync(packagesDir)) {
        return packageJSONs;
    }
    for (const entry of fs.readdirSync(packagesDir, { withFileTypes: true })) {
        const packageJSONPath = path.resolve(packagesDir, entry.name, 'package.json');
        if (entry.isDirectory() && fs.existsSync(packageJSONPath)) {
            const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
            if (packageJSON.name === `@js-joda/locale_${entry.name}`) {
                packageJSONs[entry.name] = packageJSON;
            }
        }
    }
    return packageJSONs;
};

// The version of an existing prebuilt package is owned by the release tooling (lerna), which bumps it
// before `prepublishOnly` runs this script. Read it before the package directories are cleaned, so it
// is kept. Only a newly created package gets the @js-joda/locale version.
const existingPackageJSONs = readPrebuiltPackageJSONs();

// start from clean package directories, this drops stale files and packages removed from the list
for (const packageName of new Set([...Object.keys(existingPackageJSONs), ...packageNames])) {
    fs.rmSync(path.resolve(packagesDir, packageName), { recursive: true, force: true });
}

const readmeTemplate = fs.readFileSync(path.resolve(__dirname, 'README_package.template.md'),
    'utf8');
const readmeLocaleRegex = /{{locale}}/g;

packageNames.forEach((packageName) => {
    // eslint-disable-next-line no-console
    console.info('creating', packageName);
    const packageDir = path.resolve(packagesDir, packageName);
    const distDir = path.resolve(packageDir, 'dist');
    fs.mkdirSync(distDir, { recursive: true });
    const prebuiltDir = path.resolve(argv.prebuiltDir, packageName);
    // create package.json
    const packageJSON = createPackageJSON({
        name: `@js-joda/locale_${packageName}`,
        version: existingPackageJSONs[packageName] ? existingPackageJSONs[packageName].version : mainPackageJSON.version,
        description: `prebuilt js-joda locale package for locales: ${argv.packages[packageName]}`,
    });
    fs.writeFileSync(path.resolve(packageDir, 'package.json'),
        `${JSON.stringify(packageJSON, null, 4)}\n`);
    fs.writeFileSync(path.resolve(packageDir, 'README.md'),
        readmeTemplate.replace(readmeLocaleRegex, argv.packages[packageName].join(',')));

    for (const file of ['index.js', 'index.js.map', 'index.min.js', 'index.esm.js', 'index.esm.js.map']) {
        fs.copyFileSync(
            path.resolve(prebuiltDir, file),
            path.resolve(packageDir, 'dist', file));
    }
});
