/*
 * @copyright (c) 2026, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

// The peer dependency of the prebuilt @js-joda/locale_* packages on @js-joda/locale is maintained by hand
// in prebuilt-packages.json. These tests make sure it is updated whenever the prebuilt bundles start to
// use more of @js-joda/locale, and that the committed prebuilt manifests follow it.

const localeDir = path.resolve(__dirname, '..');
const readJSON = (file) => JSON.parse(fs.readFileSync(path.resolve(localeDir, file), 'utf8'));

const { packages, localePeerDependency } = readJSON('prebuilt-packages.json');
const localePackageJSON = readJSON('package.json');
const HINT = 'check localePeerDependency in prebuilt-packages.json';

const parseLowerBound = (range) => {
    const match = /^>=(\d+)\.(\d+)\.(\d+)$/.exec(range);
    return match && match.slice(1).map(Number);
};

const compareVersions = (a, b) => {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }
    return 0;
};

const importsFromLocale = (source) => {
    const imports = [];
    const importRegex = /import\s*{([^}]*)}\s*from\s*['"]@js-joda\/locale['"]/g;
    let match;
    while ((match = importRegex.exec(source)) !== null) {
        imports.push(...match[1].split(',').map((name) => name.trim()).filter(Boolean));
    }
    return [...new Set(imports)].sort();
};

describe('prebuilt locale packages', () => {
    it('declare exactly the @js-joda/locale imports of the prebuilt bundles', () => {
        const template = fs.readFileSync(path.resolve(localeDir, 'utils/cldr-data.ejs'), 'utf8');
        const actual = importsFromLocale(template);
        expect(actual, 'utils/cldr-data.ejs imports nothing from @js-joda/locale').to.not.be.empty;
        expect(actual, `the prebuilt bundles import [${actual}] from @js-joda/locale; ${HINT}`)
            .to.eql([...localePeerDependency.imports].sort());
    });

    it('use a ">=x.y.z" peer range that the current @js-joda/locale version satisfies', () => {
        const lowerBound = parseLowerBound(localePeerDependency.range);
        expect(lowerBound, `"${localePeerDependency.range}" is not of the form ">=x.y.z"; ${HINT}`).to.not.be.null;
        const version = parseLowerBound(`>=${localePackageJSON.version.split('-')[0]}`);
        expect(compareVersions(version, lowerBound),
            `@js-joda/locale ${localePackageJSON.version} does not satisfy ${localePeerDependency.range}; ${HINT}`)
            .to.be.at.least(0);
    });

    it('have committed manifests that use the configured peer range', () => {
        for (const packageName of Object.keys(packages)) {
            const packageJSON = readJSON(`packages/${packageName}/package.json`);
            expect(packageJSON.peerDependencies['@js-joda/locale'],
                `packages/${packageName}/package.json is outdated, run "npm run create-packages" and commit the prebuilt manifests`)
                .to.equal(localePeerDependency.range);
        }
    });
});
