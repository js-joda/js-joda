/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { $ as zx$, which as zxWhich } from 'zx';

import { parseZiNames, parseZiZones } from './zi.js';

export const REQUIRED_TOOLS = ['make', 'cc', 'tar'];
export const REARGUARD_SOURCE = 'rearguard.zi';
// `NDATA=` drops the non-geographic data (`factory`), leaving ThreeTen-Backport's file list:
// africa antarctica asia australasia europe northamerica southamerica etcetera backward
export const MAKE_DATA_OPTIONS = ['NDATA='];

const defaultDeps = {
    $: zx$,
    which: zxWhich,
};

/**
 * Fails with the names of all required build tools that are not on the PATH.
 *
 * @param {{which: Function}} [deps]
 */
export async function checkBuildTools(deps = defaultDeps) {
    const missing = [];
    for (const tool of REQUIRED_TOOLS) {
        if (await deps.which(tool, { nothrow: true }) == null) {
            missing.push(tool);
        }
    }
    if (missing.length > 0) {
        throw new Error(`Missing required build tool(s): ${missing.join(', ')}. ` +
            'The tzdb builder needs make, a C compiler (cc) and tar.');
    }
}

/**
 * Reads the Zone and Link names of the compiled release.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<{zones: string[], links: Object<string, string>}>}
 */
export async function readNames(ctx) {
    return parseZiNames(await fs.readFile(path.join(ctx.tzdbDir, REARGUARD_SOURCE), 'utf8'));
}

/**
 * Reads the windows (STDOFF and UNTIL) of every Zone of the compiled release.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<Object<string, object[]>>} see parseZiZones
 */
export async function readZoneWindows(ctx) {
    return parseZiZones(await fs.readFile(path.join(ctx.tzdbDir, REARGUARD_SOURCE), 'utf8'));
}

/**
 * Pipeline step: builds `zic` from the release's tzcode and compiles the rearguard data
 * into TZif files below `ctx.zoneinfoDir`. Never uses a zic installed on the host.
 * The data files are the ones ThreeTen-Backport compiles, so the `Factory` zone is not included.
 *
 * @param {object} ctx - see createContext
 * @param {{$: Function, which: Function}} [deps]
 * @return {Promise<object>} ctx with `names` ({zones, links})
 */
export async function compileStep(ctx, deps = defaultDeps) {
    const { tzdbDir, zoneinfoDir, log = () => {} } = ctx;
    await checkBuildTools(deps);
    log(`Building zic and ${REARGUARD_SOURCE} in ${tzdbDir}`);
    // make does not notice changed variables, so never reuse a rearguard.zi built with other options
    await fs.rm(path.join(tzdbDir, REARGUARD_SOURCE), { force: true });
    await deps.$`make -C ${tzdbDir} ${MAKE_DATA_OPTIONS} zic ${REARGUARD_SOURCE}`;
    await fs.rm(zoneinfoDir, { recursive: true, force: true });
    await fs.mkdir(zoneinfoDir, { recursive: true });
    log(`Compiling ${REARGUARD_SOURCE} into ${zoneinfoDir}`);
    await deps.$`${path.join(tzdbDir, 'zic')} -b fat -d ${zoneinfoDir} ${path.join(tzdbDir, REARGUARD_SOURCE)}`;
    const names = await readNames(ctx);
    log(`Compiled ${names.zones.length} zones and ${Object.keys(names.links).length} links`);
    return { ...ctx, names };
}
