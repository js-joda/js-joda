import assert from 'node:assert/strict';

import { parseZiSeconds, parseZiZones } from '../src/zi.js';

const seconds = (iso) => Date.parse(iso) / 1000;

// windows of a single zone with the given continuation lines (STDOFF RULES FORMAT [UNTIL])
const windowsOf = (...lines) => parseZiZones(`Zone Test/Zone ${lines.join('\n\t\t\t')}\n`)['Test/Zone'];
const untilOf = (until) => windowsOf(`1:00 - X ${until}`, '1:00 - Y')[0].until;

describe('zi', () => {
    describe('parseZiSeconds', () => {
        it('parses hours, minutes and seconds with a sign', () => {
            assert.equal(parseZiSeconds('0'), 0);
            assert.equal(parseZiSeconds('2:00'), 7200);
            assert.equal(parseZiSeconds('0:09:21'), 561);
            assert.equal(parseZiSeconds('-4:56:02'), -17762);
            assert.equal(parseZiSeconds('24:00'), 86400);
        });

        it('rejects other text', () => {
            assert.throws(() => parseZiSeconds('2h'), /Invalid time '2h'/);
        });
    });

    describe('parseZiZones', () => {
        it('reads the windows of Europe/Moscow', () => {
            const text = [
                'Rule Russia 1981 1984 - Apr 1 0:00 1:00 S',
                'Zone Europe/Moscow\t 2:30:17 -\tLMT\t1880',
                '\t\t\t 3:00\tRussia\tMSK/MSD\t1991 Mar 31  2:00s # comment',
                '# a comment line between continuation lines',
                '\t\t\t 2:00\tRussia\tEE%sT\t1992 Jan 19  2:00s',
                '\t\t\t 3:00\t-\tMSK',
                'Link Europe/Moscow W-SU',
                '',
            ].join('\n');
            assert.deepEqual(parseZiZones(text), {
                'Europe/Moscow': [
                    { stdoff: 9017, until: { local: seconds('1880-01-01T00:00:00Z'), suffix: 'w' } },
                    { stdoff: 10800, until: { local: seconds('1991-03-31T02:00:00Z'), suffix: 's' } },
                    { stdoff: 7200, until: { local: seconds('1992-01-19T02:00:00Z'), suffix: 's' } },
                    { stdoff: 10800, until: null },
                ],
            });
        });

        it('accepts abbreviated keywords, month and weekday names', () => {
            const zones = parseZiZones('Z Test/Short 1 - X 2000 O lastSa\n\t\t\t2 - Y\n');
            assert.deepEqual(zones['Test/Short'], [
                { stdoff: 3600, until: { local: seconds('2000-10-28T00:00:00Z'), suffix: 'w' } },
                { stdoff: 7200, until: null },
            ]);
        });

        it('reads every form of UNTIL', () => {
            assert.deepEqual(untilOf('1977'), { local: seconds('1977-01-01T00:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('1903 Mar'), { local: seconds('1903-03-01T00:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('1944 Aug 25'), { local: seconds('1944-08-25T00:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('1940 Jun 14 23:00'), { local: seconds('1940-06-14T23:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('1946 Jul 14 24:00'), { local: seconds('1946-07-15T00:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('2014 Oct 26 2:00s'), { local: seconds('2014-10-26T02:00:00Z'), suffix: 's' });
            assert.deepEqual(untilOf('1919 Jul 1 0:00u'), { local: seconds('1919-07-01T00:00:00Z'), suffix: 'u' });
            assert.deepEqual(untilOf('2000 Jan 1 1:00g'), { local: seconds('2000-01-01T01:00:00Z'), suffix: 'u' });
            assert.deepEqual(untilOf('2000 Jan 1 1:00z'), { local: seconds('2000-01-01T01:00:00Z'), suffix: 'u' });
            assert.deepEqual(untilOf('2000 Jan 1 1:00w'), { local: seconds('2000-01-01T01:00:00Z'), suffix: 'w' });
            assert.deepEqual(untilOf('1883 Nov 18 17:00:30u'), { local: seconds('1883-11-18T17:00:30Z'), suffix: 'u' });
        });

        it('resolves lastSun, Sun>=N and Sun<=N', () => {
            assert.equal(untilOf('2026 Mar lastSun').local, seconds('2026-03-29T00:00:00Z'));
            assert.equal(untilOf('1925 Sep Sun>=16 2:00s').local, seconds('1925-09-20T02:00:00Z'));
            assert.equal(untilOf('2026 Mar Sun>=29').local, seconds('2026-03-29T00:00:00Z'));
            assert.equal(untilOf('2026 Mar Sun<=25').local, seconds('2026-03-22T00:00:00Z'));
            // Sun>=30 in April 2026 is in May
            assert.equal(untilOf('2026 Apr Sun>=30').local, seconds('2026-05-03T00:00:00Z'));
        });

        it('fails with the zone name for a line it cannot parse', () => {
            assert.throws(() => parseZiZones('Zone Test/Bad 1:00 - X 2000 Foo\n\t\t\t1:00 - X\n'),
                /Cannot parse Zone Test\/Bad: Invalid month 'Foo'/);
            assert.throws(() => parseZiZones('Zone Test/Bad 1:00 - X 2000\n\t\t\t1:00\n'),
                /Cannot parse Zone Test\/Bad: expected STDOFF RULES FORMAT/);
            assert.throws(() => parseZiZones('Zone Test/Bad 1h - X\n'), /Cannot parse Zone Test\/Bad: Invalid time '1h'/);
        });
    });
});
