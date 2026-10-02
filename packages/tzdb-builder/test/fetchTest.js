import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { createContext } from '../src/context.js';
import { fetchStep, LATEST_VERSION_URL, releaseUrl, resolveVersion } from '../src/fetch.js';

function fakeFetch(routes, calls = []) {
    return async (url) => {
        calls.push(url);
        const body = routes[url];
        if (body == null) {
            return { ok: false, status: 404, text: async () => '', arrayBuffer: async () => new ArrayBuffer(0) };
        }
        return { ok: true, status: 200, text: async () => body, arrayBuffer: async () => Buffer.from(body) };
    };
}

// fake zx `$`: records commands and simulates `tar` by writing the tzdata `version` file
function fake$(commands) {
    return async (strings, ...values) => {
        const command = strings.reduce((acc, s, i) => acc + s + (i < values.length ? values[i] : ''), '');
        commands.push(command);
        const dir = command.split(' -C ')[1];
        await fs.writeFile(path.join(dir, 'version'), '2026a\n');
        return { stdout: '' };
    };
}

describe('fetch', () => {
    let cacheDir;

    beforeEach(async () => {
        cacheDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tzdb-builder-'));
    });

    afterEach(async () => {
        await fs.rm(cacheDir, { recursive: true, force: true });
    });

    describe('resolveVersion', () => {
        it('resolves latest via the IANA version file', async () => {
            const version = await resolveVersion('latest', { fetch: fakeFetch({ [LATEST_VERSION_URL]: '2026e\n' }) });
            assert.equal(version, '2026e');
        });

        it('keeps an explicit version without network access', async () => {
            const calls = [];
            assert.equal(await resolveVersion('2025b', { fetch: fakeFetch({}, calls) }), '2025b');
            assert.deepEqual(calls, []);
        });

        it('rejects a malformed version', async () => {
            await assert.rejects(resolveVersion('2026', { fetch: fakeFetch({}) }), /Invalid tzdb version '2026'/);
        });
    });

    describe('fetchStep', () => {
        const routes = {
            [releaseUrl('data', '2026a')]: 'data',
            [releaseUrl('code', '2026a')]: 'code',
        };

        it('downloads and extracts tzdata and tzcode', async () => {
            const calls = [];
            const commands = [];
            const ctx = createContext({ version: '2026a', cacheDir });
            await fs.mkdir(ctx.versionDir, { recursive: true });
            await fetchStep(ctx, { fetch: fakeFetch(routes, calls), $: fake$(commands) });
            assert.deepEqual(calls, [releaseUrl('data', '2026a'), releaseUrl('code', '2026a')]);
            assert.equal(commands.length, 2);
            assert.match(commands[0], /^tar -xzf .*tzdata2026a\.tar\.gz -C .*2026a\/tzdb$/);
            assert.equal(await fs.readFile(path.join(ctx.versionDir, 'tzcode2026a.tar.gz'), 'utf8'), 'code');
        });

        it('reuses the cache unless forced', async () => {
            const ctx = createContext({ version: '2026a', cacheDir });
            await fs.mkdir(ctx.tzdbDir, { recursive: true });
            await fs.writeFile(path.join(ctx.tzdbDir, 'version'), '2026a\n');

            const calls = [];
            await fetchStep(ctx, { fetch: fakeFetch(routes, calls), $: fake$([]) });
            assert.deepEqual(calls, []);

            await fetchStep({ ...ctx, force: true }, { fetch: fakeFetch(routes, calls), $: fake$([]) });
            assert.equal(calls.length, 2);
        });

        it('rejects an unknown release', async () => {
            const ctx = createContext({ version: '2099z', cacheDir });
            await fs.mkdir(ctx.versionDir, { recursive: true });
            await assert.rejects(
                fetchStep(ctx, { fetch: fakeFetch(routes), $: fake$([]) }),
                /Unknown tzdb release '2099z': .*tzdata2099z\.tar\.gz returned 404/
            );
        });
    });
});
