/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import {use} from '../src/js-joda';
import {LocalDate} from '../src/js-joda';

/**
 * this test is not executable with webpack because it has a reference to the webpack entry point
 */
describe('plugTest', () => {

    const localDateConvenientPlugin = (jsJoda) => {
        jsJoda.LocalDate.prototype.isAfterOrEqual = function(other){
            return !this.isBefore(other);
        };
        jsJoda.LocalDate.prototype.isBeforeOrEqual = function(other){
            return !this.isAfter(other);
        };
    };

    it('should not fail using the localDateConvenientPlugin', function () {
        use(localDateConvenientPlugin);
    });

    it('should be chainable', function () {
        use(() => {}).use(() => {});
    });

    it('should use the previously added plugin', function () {
        const date1 = LocalDate.parse('2016-12-21');
        const date1_ = LocalDate.parse('2016-12-21');
        const otherDate = LocalDate.parse('2016-12-24');

        expect(date1_.isAfterOrEqual(date1)).to.be.true;
        expect(otherDate.isAfterOrEqual(date1)).to.be.true;
        expect(date1.isAfterOrEqual(otherDate)).to.be.false;

        expect(date1_.isBeforeOrEqual(date1)).to.be.true;
        expect(otherDate.isBeforeOrEqual(date1)).to.be.false;
        expect(date1.isBeforeOrEqual(otherDate)).to.be.true;
    });

});