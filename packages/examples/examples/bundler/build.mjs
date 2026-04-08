/**
 * esbuild bundler example for issue #791.
 *
 * Bundles esbuild-locale-without-timezone.mjs targeting the browser platform,
 * mimicking what Angular's esbuild-based build does.
 *
 * This demonstrates that bundling @js-joda/locale_en-us succeeds without
 * cldr-data or @js-joda/timezone installed.
 *
 * In a real Angular project all packages are installed in a single node_modules
 * tree and esbuild resolves them from there. In this monorepo example we use a
 * resolver plugin to replicate that flat layout, resolving every @js-joda/*
 * package from the examples project's own node_modules directory.
 *
 * NOTE on cldr-data:
 * In a real project using prebuilt locale packages, cldr-data is NOT installed
 * (it is an optional peerDependency since @js-joda/locale v5.0.2, so npm no
 * longer auto-installs it). In this monorepo, cldr-data is present as a
 * devDependency of the @js-joda/locale package itself; we mark it external here
 * to replicate the "not installed" state a real project has after the fix.
 */

import * as esbuild from 'esbuild';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve packages as if they were installed in the examples project
// (mirrors how Angular resolves npm packages from node_modules).
const examplesDir = path.resolve(__dirname, '../../');
const requireFromExamples = createRequire(path.join(examplesDir, 'package.json'));

const result = await esbuild.build({
    entryPoints: [path.join(__dirname, 'esbuild-locale-without-timezone.mjs')],
    bundle: true,
    // Target browser platform — this is what Angular's esbuild uses.
    platform: 'browser',
    format: 'iife',
    globalName: 'JsJodaLocaleExample',
    outfile: path.join(__dirname, 'dist', 'bundle.js'),
    metafile: true,
    logLevel: 'info',
    plugins: [
        {
            // Resolve all @js-joda/* packages from the examples project's
            // node_modules, replicating a flat npm install layout.
            name: 'resolve-js-joda-from-examples',
            setup(build) {
                build.onResolve({ filter: /^@js-joda\// }, (args) => ({
                    path: requireFromExamples.resolve(args.path),
                }));
            },
        },
    ],
    external: [
        // @js-joda/core is a peer dependency bundled separately by Angular.
        '@js-joda/core',
        // cldr-data is an optional peerDependency not installed in real projects
        // using prebuilt locale packages. Marking it external here replicates
        // the "not installed" state. Without this fix (peerDependenciesMeta),
        // npm 7+ would auto-install cldr-data and esbuild would try to bundle it,
        // failing because cldr-data uses Node.js built-ins (fs, path, assert).
        'cldr-data',
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