/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import * as joda from 'js-joda';

import extra from '../src/main';


describe('plugin', () => {
    
    before('use', () => {
        joda.use(extra);
    });
    
    it ('should add Interval to joda', () => {
        expect(joda.Interval).to.exist;
    });
});