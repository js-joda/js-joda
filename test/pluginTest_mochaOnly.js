/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

// test the actual js-joda-locale plugin, it might be nice to test with the actual `dist/js-joda-locale`
// but that would require a npm run build-dist before each test :/
import jsJodaLocale from '../src/js-joda-locale';
// the test functions are imported from plugTest to only write them once :)
import testPlugin from './plugTest';

describe('plugin test', () => {
    testPlugin(jsJodaLocale);
});
