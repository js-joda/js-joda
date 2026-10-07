import assert from 'node:assert/strict';

import { classify, createQueries, formatReport, parseOutput } from '../scripts/standard-offsets.js';

const T1 = Date.UTC(1991, 2, 30, 23);
const T2 = Date.UTC(1991, 8, 29);

describe('standard-offsets', () => {
    it('queries the start of every period, and the first period just before its end', () => {
        const data = {
            zones: [
                { name: 'A', untils: [T1, T2, null], stdOffsets: [-180, -120, -120.5] },
                { name: 'B', untils: [null], stdOffsets: [0] },
            ],
        };
        assert.deepEqual(createQueries(data, 2499), [
            { zone: 'A', time: T1 - 1, stdoff: 10800 },
            { zone: 'A', time: T1, stdoff: 7200 },
            { zone: 'A', time: T2, stdoff: 7230 },
            { zone: 'B', time: 0, stdoff: 0 },
        ]);
        assert.deepEqual(createQueries(data, 1990).map((q) => q.time), [0]);
    });

    it('fails for data without standard offsets', () => {
        assert.throws(() => createQueries({ zones: [{ name: 'A', untils: [null] }] }, 2499), /Zone A has no stdOffsets/);
    });

    it('parses the output of StandardOffsetCheck.java', () => {
        const output = ['tzdb\t2026b', 'unknown\tROC', `diff\tA\t${T1}\t3600\t7200`, ''].join('\n');
        assert.deepEqual(parseOutput(output), {
            javaVersion: '2026b',
            unknown: ['ROC'],
            diffs: [{ zone: 'A', time: T1, java: 3600, ours: 7200 }],
        });
    });

    it('separates expected from unexpected differences and reports both versions', () => {
        const result = {
            javaVersion: '2026b',
            unknown: [],
            diffs: [{ zone: 'A', time: T1, java: 3600, ours: 7200 }, { zone: 'B', time: T2, java: 0, ours: 3600 }],
        };
        const classified = classify(result, { B: 'known JDK difference' });
        assert.deepEqual(classified.unexpected.map((e) => e.zone), ['A']);
        assert.deepEqual(classified.expected.map((e) => [e.zone, e.reason]), [['B', 'known JDK difference']]);
        const report = formatReport(result, classified, { version: '2026e', untilYear: 2499, queryCount: 2 });
        assert.equal(report[1], 'tzdb version: generated 2026e, java.time 2026b (differences in zones changed between them are expected)');
        assert.ok(report.includes('  A'));
        assert.ok(report.includes('  B (known JDK difference)'));
    });
});
