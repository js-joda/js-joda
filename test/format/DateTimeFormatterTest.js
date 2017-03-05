/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';

import '../_init';

import { DateTimeFormatter } from '../../src/format/DateTimeFormatter';
import { ResolverStyle } from '../../src/format/ResolverStyle';
import { NullPointerException } from '../../src/errors';

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda DateTimeFormatterTest', () => {
    describe('withResolverStyle', () => {
        it('should set the ResolverStyle', () => {
            let formatter = DateTimeFormatter.ofPattern('uuuu');
            expect(formatter._resolverStyle).to.eql(ResolverStyle.SMART);
            formatter = formatter.withResolverStyle(ResolverStyle.STRICT);
            expect(formatter._resolverStyle).to.eql(ResolverStyle.STRICT);
        });
        it('should return the same DateTimeFormatter it has been called with', () => {
            const formatter = DateTimeFormatter.ofPattern('uuuu');
            const newFormatter = formatter.withResolverStyle(formatter._resolverStyle);
            expect(newFormatter).to.equal(formatter);
        });
        it('should fail with NullPointerException if param is null', () => {
            expect(() => {
                const formatter = DateTimeFormatter.ofPattern('uuuu');
                formatter.withResolverStyle(null);
            }).to.throw(NullPointerException);
        });
    });
});