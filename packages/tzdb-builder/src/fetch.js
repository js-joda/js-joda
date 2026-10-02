/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { $ as zx$ } from 'zx';

export const IANA_BASE_URL = 'https://data.iana.org/time-zones';
export const LATEST_VERSION_URL = `${IANA_BASE_URL}/tzdb/version`;

const VERSION_PATTERN = /^\d{4}[a-z]$/;

const defaultDeps = {
    fetch: (...args) => globalThis.fetch(...args),
    $: zx$,
};

/**
 * Resolves `latest` to the newest IANA release, and validates an explicit version.
 *
 * @param {string} input - `latest` or a version like `2026a`
 * @param {{fetch: Function}} [deps]
 * @return {Promise<string>}
 */
export async function resolveVersion(input, deps = defaultDeps) {
    if (input !== 'latest') {
        if (!VERSION_PATTERN.test(input)) {
            throw new Error(`Invalid tzdb version '${input}', expected 'latest' or a version like '2026a'`);
        }
        return input;
    }
    const response = await deps.fetch(LATEST_VERSION_URL);
    if (!response.ok) {
        throw new Error(`Cannot resolve the latest tzdb version: ${LATEST_VERSION_URL} returned ${response.status}`);
    }
    const version = (await response.text()).trim();
    if (!VERSION_PATTERN.test(version)) {
        throw new Error(`Unexpected latest tzdb version '${version}' from ${LATEST_VERSION_URL}`);
    }
    return version;
}

export function releaseUrl(type, version) {
    return `${IANA_BASE_URL}/releases/tz${type}${version}.tar.gz`;
}

async function exists(file) {
    try {
        await fs.access(file);
        return true;
    } catch (e) {
        return false;
    }
}

async function download(url, file, version, deps) {
    const response = await deps.fetch(url);
    if (response.status === 404) {
        throw new Error(`Unknown tzdb release '${version}': ${url} returned 404`);
    }
    if (!response.ok) {
        throw new Error(`Download of ${url} failed with status ${response.status}`);
    }
    await fs.writeFile(file, Buffer.from(await response.arrayBuffer()));
}

/**
 * Pipeline step: downloads tzcode and tzdata of `ctx.version` and extracts both into `ctx.tzdbDir`.
 * An already extracted release is reused unless `ctx.force` is set.
 *
 * @param {object} ctx - see createContext
 * @param {{fetch: Function, $: Function}} [deps]
 * @return {Promise<object>}
 */
export async function fetchStep(ctx, deps = defaultDeps) {
    const { version, versionDir, tzdbDir, force, log = () => {} } = ctx;
    const marker = path.join(tzdbDir, 'version');
    if (!force && await exists(marker)) {
        log(`Using cached tzdb ${version} in ${tzdbDir}`);
        return ctx;
    }
    await fs.rm(tzdbDir, { recursive: true, force: true });
    await fs.mkdir(tzdbDir, { recursive: true });
    for (const type of ['data', 'code']) {
        const url = releaseUrl(type, version);
        const file = path.join(versionDir, `tz${type}${version}.tar.gz`);
        log(`Downloading ${url}`);
        await download(url, file, version, deps);
        await deps.$`tar -xzf ${file} -C ${tzdbDir}`;
    }
    if (!await exists(marker)) {
        throw new Error(`Release ${version} has no 'version' file, extraction to ${tzdbDir} failed`);
    }
    return ctx;
}
