/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {TextStyle} from '../../src/format/TextStyle';

describe('js-joda TextStyleTest', () => {
    
    it('should return correct values for isStandalone', () => {
        expect(TextStyle.FULL.isStandalone()).to.be.false;
        expect(TextStyle.FULL_STANDALONE.isStandalone()).to.be.true;
        expect(TextStyle.SHORT.isStandalone()).to.be.false;
        expect(TextStyle.SHORT_STANDALONE.isStandalone()).to.be.true;
        expect(TextStyle.NARROW.isStandalone()).to.be.false;
        expect(TextStyle.NARROW_STANDALONE.isStandalone()).to.be.true;
    });

    it('should return correct values for asStandalone', () => {
        expect(TextStyle.FULL.asStandalone()).to.eql(TextStyle.FULL_STANDALONE);
        expect(TextStyle.FULL_STANDALONE.asStandalone()).to.eql(TextStyle.FULL_STANDALONE);
        expect(TextStyle.SHORT.asStandalone()).to.eql(TextStyle.SHORT_STANDALONE);
        expect(TextStyle.SHORT_STANDALONE.asStandalone()).to.eql(TextStyle.SHORT_STANDALONE);
        expect(TextStyle.NARROW.asStandalone()).to.eql(TextStyle.NARROW_STANDALONE);
        expect(TextStyle.NARROW_STANDALONE.asStandalone()).to.eql(TextStyle.NARROW_STANDALONE);
    });
    
    it('should return correct values for asNormal', () => {
        expect(TextStyle.FULL.asNormal()).to.eql(TextStyle.FULL);
        expect(TextStyle.FULL_STANDALONE.asNormal()).to.eql(TextStyle.FULL);
        expect(TextStyle.SHORT.asNormal()).to.eql(TextStyle.SHORT);
        expect(TextStyle.SHORT_STANDALONE.asNormal()).to.eql(TextStyle.SHORT);
        expect(TextStyle.NARROW.asNormal()).to.eql(TextStyle.NARROW);
        expect(TextStyle.NARROW_STANDALONE.asNormal()).to.eql(TextStyle.NARROW);
    });
});