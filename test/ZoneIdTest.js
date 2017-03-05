/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import './_init';

import {expect} from 'chai';

import {ZoneId} from '../src/ZoneId';

describe('ZoneId', function () {

    describe('abstract methods', function () {

        it('should fail for id()', function () {
            const abstractZomeId  = new ZoneId();

            expect(()=>{
                abstractZomeId.id();
            }).to.throw(TypeError);
        });

        it('should fail for rules()', function () {
            const abstractZomeId  = new ZoneId();

            expect(()=>{
                abstractZomeId.rules();
            }).to.throw(TypeError);
        });

    });

});
