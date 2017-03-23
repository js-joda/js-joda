/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';
import * as joda from 'js-joda';

// since for karma/webpack tests we cannot require the actual webpack entry point,
// we test using `main` ... the entry point js-joda-extra.js only re-exports the default from
// main anyway...
import extra from '../src/main';

const testPlugin = (plugin) => {
    before('use', () => {
        joda.use(plugin);
    });

    // TODO test the plugin
    // it('should add Interval to joda', () => {
    //     expect(joda.Interval).to.exist;
    // });
};

describe('main test', () => {
    testPlugin(extra);
});

// export the testPlugin function to be re-used in pluginTest_mochaOnly
export default testPlugin;
