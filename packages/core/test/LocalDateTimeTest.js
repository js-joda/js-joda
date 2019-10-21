/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import './_init';

import {LocalDateTime} from '../src/LocalDateTime';
import {NullPointerException, DateTimeException} from '../src/errors';

/* these are not covered by the threetenbp ported tests */
describe('js-joda LocalDateTime', () => {

    describe('of factory', () => {
        it('should create a LocalDateTime instance for a valid date', () => {
            expect(LocalDateTime.of(2019, 10, 21)).to.be.an.instanceOf(LocalDateTime);
            expect(LocalDateTime.of(2000, 1, 1)).to.eql(LocalDateTime.parse('2000-01-01T00:00'));
        });
		
        it('should create a LocalDateTime instance for a valid date with time', () => {
            expect(LocalDateTime.of(2015, 12, 30, 5, 0)).to.be.an.instanceOf(LocalDateTime);
            expect(LocalDateTime.of(2000, 1, 1, 13)).to.eql(LocalDateTime.parse('2000-01-01T13:00'));
        });
		
        it('should fail for an invalid date time', () => {
            expect(() => LocalDateTime.of(0, 0, 0)).to.throw(DateTimeException);
        });

        it('should fail without arguments with NullPointerException', () => {
            expect(() => LocalDateTime.of()).to.throw(NullPointerException);
        });
    });
});