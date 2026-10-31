/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import latest from '../data/unpacked/latest.json';

describe('README tzdb version', () => {
    it('shows the current tzdb data version', () => {
        const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
        const match = readme.match(/<!-- tzdb-version -->IANA tzdb data version: \*\*([^*]+)\*\*/);
        expect(match, 'README has a <!-- tzdb-version --> line').to.not.equal(null);
        expect(match[1]).to.equal(latest.version);
    });
});
