/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import { expect } from 'chai';

import JsJoda from '../src/js-joda';

describe('js-joda exports', () => {

    describe('errors', function () {

        it('should export DateTimeException', function () {
            expect(JsJoda.DateTimeException).to.exist;
        });

        it('should export NullPointerException', function () {
            expect(JsJoda.NullPointerException).to.exist;
        });

    });

    it('should export Clock', function () {
        expect(JsJoda.Clock).to.exist;
    });

});