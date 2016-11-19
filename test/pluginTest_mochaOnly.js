/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

// test the actual js-joda-extra plugin, it might be nice to test with the actual `dist/js-joda-extra`
// but that would require a npm run build-dist before each test :/
// import * as extra from '../dist/js-joda-extra';
import extra from '../src/js-joda-extra';
// the test functions are imported from mainTest to only write them once :)
import testPlugin from './mainTest';

describe('plugin test', () => {
    testPlugin(extra);
});
