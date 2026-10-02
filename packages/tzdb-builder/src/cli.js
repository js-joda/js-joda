#!/usr/bin/env node
/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { argv } from 'zx';

import { createContext } from './context.js';
import { runPipeline } from './pipeline.js';
import { fetchStep, resolveVersion } from './fetch.js';
import { compileStep } from './compile.js';
import { collectStep } from './collect.js';
import { packStep } from './ranges.js';
import { writeUnpackedStep } from './write.js';

export const STEPS = [
    { name: 'fetch', run: fetchStep },
    { name: 'compile', run: compileStep },
    { name: 'collect', run: collectStep },
    { name: 'write-unpacked', run: writeUnpackedStep },
    { name: 'pack', run: packStep },
];

const USAGE = 'Usage: npm run generate -- <latest|version> [--step <name>] [--from <name>] [--force]';

async function main() {
    const [input] = argv._;
    if (input == null || argv.help) {
        console.log(USAGE);
        console.log(`Steps: ${STEPS.map((s) => s.name).join(' → ')}`);
        process.exitCode = input == null && !argv.help ? 1 : 0;
        return;
    }
    const log = (message) => console.log(message);
    const version = await resolveVersion(String(input));
    log(`tzdb version ${version}`);
    const ctx = createContext({ version, force: Boolean(argv.force), log });
    await runPipeline(STEPS, { step: argv.step, from: argv.from }, ctx, log);
}

main().catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
});
