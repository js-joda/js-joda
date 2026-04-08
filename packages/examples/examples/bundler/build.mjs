/**
 * Bundles esbuild-locale-without-timezone.mjs with browser platform,
 * mimicking an Angular esbuild build.
 *
 * Verifies that @js-joda/locale_en-us bundles successfully without cldr-data.
 * cldr-data is an optional peerDependency of @js-joda/locale and is not
 * installed when using prebuilt locale packages.
 *
 * In this monorepo cldr-data is present as a devDependency of the locale
 * package, so we mark it external to replicate the "not installed" state of
 * a real project. The resolver plugin ensures @js-joda/* packages are resolved
 * from the examples node_modules, replicating a flat npm install layout.
 */

import * as esbuild from 'esbuild';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const examplesDir = path.resolve(__dirname, '../../');
const requireFromExamples = createRequire(path.join(examplesDir, 'package.json'));

const result = await esbuild.build({
    entryPoints: [path.join(__dirname, 'esbuild-locale-without-timezone.mjs')],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'JsJodaLocaleExample',
    outfile: path.join(__dirname, 'dist', 'bundle.js'),
    metafile: true,
    logLevel: 'info',
    plugins: [
        {
            name: 'resolve-js-joda-from-examples',
            setup(build) {
                build.onResolve({ filter: /^@js-joda\// }, (args) => ({
                    path: requireFromExamples.resolve(args.path),
                }));
            },
        },
    ],
    external: [
        '@js-joda/core',  // peer dependency, bundled separately by Angular
        'cldr-data',      // optional peer dep — not installed in real projects using prebuilt locales
    ],
});

// Confirm cldr-data is NOT in the bundled inputs
const inputs = Object.keys(result.metafile.inputs);
const cldrDataInputs = inputs.filter(i => i.includes('cldr-data'));
if (cldrDataInputs.length > 0) {
    console.error('ERROR: cldr-data was unexpectedly included in the bundle:', cldrDataInputs);
    process.exit(1);
}

const outputs = Object.keys(result.metafile.outputs);
console.log('Bundle created:', outputs[0]);
console.log('OK: cldr-data is NOT included in the bundle (as expected for prebuilt locale packages).');