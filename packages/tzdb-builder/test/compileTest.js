import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { checkBuildTools, compileStep } from '../src/compile.js';
import { createContext } from '../src/context.js';
import { parseZiNames } from '../src/zi.js';

describe('compile', () => {
    describe('parseZiNames', () => {
        it('reads Zone and Link names, also abbreviated keywords', () => {
            const text = [
                '# tzdb data',
                'Rule EU 1981 max - Mar lastSu 1:00u 1:00 S',
                'Zone Europe/Kyiv 2:2:4 - LMT 1880',
                '\t\t\t2:00 EU EE%sT',
                'Z Etc/UTC 0 - UTC',
                'Link Europe/Kyiv Europe/Kiev # backward',
                'L Etc/UTC Etc/Universal',
                '',
            ].join('\n');
            assert.deepEqual(parseZiNames(text), {
                zones: ['Etc/UTC', 'Europe/Kyiv'],
                links: { 'Europe/Kiev': 'Europe/Kyiv', 'Etc/Universal': 'Etc/UTC' },
            });
        });
    });

    describe('checkBuildTools', () => {
        it('names every missing tool', async () => {
            const which = async (tool) => (tool === 'make' ? '/usr/bin/make' : null);
            await assert.rejects(checkBuildTools({ which }), /Missing required build tool\(s\): cc, tar/);
        });

        it('passes when all tools exist', async () => {
            await checkBuildTools({ which: async (tool) => `/usr/bin/${tool}` });
        });
    });

    describe('compileStep', () => {
        let cacheDir;

        beforeEach(async () => {
            cacheDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tzdb-builder-'));
        });

        afterEach(async () => {
            await fs.rm(cacheDir, { recursive: true, force: true });
        });

        it('builds zic and rearguard data without factory, compiles with -b fat and returns the names', async () => {
            const ctx = createContext({ version: '2026a', cacheDir });
            await fs.mkdir(ctx.tzdbDir, { recursive: true });
            const ziFile = path.join(ctx.tzdbDir, 'rearguard.zi');
            await fs.writeFile(ziFile, 'Z Factory 0 - -00\n');
            const commands = [];
            const $ = async (strings, ...values) => {
                const command = strings.reduce((acc, s, i) => acc + s + (i < values.length ? [].concat(values[i]).join(' ') : ''), '');
                commands.push(command);
                if (command.startsWith('make ')) {
                    // a stale rearguard.zi must be removed before make runs
                    await assert.rejects(fs.access(ziFile));
                    await fs.writeFile(ziFile, 'Z Etc/UTC 0 - UTC\nL Etc/UTC UTC\n');
                }
                return { stdout: '' };
            };
            const result = await compileStep(ctx, { $, which: async (tool) => `/usr/bin/${tool}` });
            assert.deepEqual(commands, [
                `make -C ${ctx.tzdbDir} NDATA= zic rearguard.zi`,
                `${ctx.tzdbDir}/zic -b fat -d ${ctx.zoneinfoDir} ${ctx.tzdbDir}/rearguard.zi`,
            ]);
            assert.deepEqual(result.names, { zones: ['Etc/UTC'], links: { UTC: 'Etc/UTC' } });
        });

        it('fails before building when a tool is missing', async () => {
            const ctx = createContext({ version: '2026a', cacheDir });
            const commands = [];
            await assert.rejects(
                compileStep(ctx, { $: async () => commands.push('x'), which: async () => null }),
                /Missing required build tool/
            );
            assert.deepEqual(commands, []);
        });
    });
});
