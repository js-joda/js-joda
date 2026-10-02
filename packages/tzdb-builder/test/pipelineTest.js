import assert from 'node:assert/strict';

import { runPipeline, selectSteps } from '../src/pipeline.js';

function recordingSteps(names, calls) {
    return names.map((name) => ({
        name,
        run: async (ctx) => {
            calls.push(name);
            return { ...ctx, [name]: true };
        },
    }));
}

describe('pipeline', () => {
    const names = ['fetch', 'compile', 'collect'];

    it('runs all steps in order and passes the context along', async () => {
        const calls = [];
        const ctx = await runPipeline(recordingSteps(names, calls), {}, { version: '2026a' });
        assert.deepEqual(calls, names);
        assert.deepEqual(ctx, { version: '2026a', fetch: true, compile: true, collect: true });
    });

    it('--step runs only the named step', async () => {
        const calls = [];
        await runPipeline(recordingSteps(names, calls), { step: 'compile' }, {});
        assert.deepEqual(calls, ['compile']);
    });

    it('--from runs the remaining steps in order', async () => {
        const calls = [];
        await runPipeline(recordingSteps(names, calls), { from: 'compile' }, {});
        assert.deepEqual(calls, ['compile', 'collect']);
    });

    it('fails on an unknown step name', () => {
        assert.throws(() => selectSteps(recordingSteps(names, []), { step: 'zdump' }), /Unknown step 'zdump'/);
        assert.throws(() => selectSteps(recordingSteps(names, []), { from: 'zdump' }), /Unknown step 'zdump'/);
    });

    it('rejects --step together with --from', () => {
        assert.throws(() => selectSteps(recordingSteps(names, []), { step: 'fetch', from: 'fetch' }), /either --step or --from/);
    });

    it('keeps the context when a step returns nothing', async () => {
        const ctx = await runPipeline([{ name: 'noop', run: async () => undefined }], {}, { a: 1 });
        assert.deepEqual(ctx, { a: 1 });
    });
});
