/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assert, requireNonNull, requireInstance} from '../src/assert';
import {NullPointerException, IllegalArgumentException} from '../src/errors';

describe('assert.js', () => {

    describe('assert', function () {

        it('should not fail if assert is true', () => {
            assert(true);
        });

        it('should throw an Error if assert is false', () => {
            expect(() => {
                assert(false, 'assert fail message');
            }).to.throw(Error);
        });

        it('should throw an specific Error if assert is false and an Error class is passed', () => {
            expect(() => {
                assert(false, 'assert fail message', TypeError);
            }).to.throw(TypeError);
        });

    });

    it('requireNonNull', function () {
        requireNonNull({});
        expect(() => {requireNonNull(null, 'nameOfObject');}).to.throw(NullPointerException);
        expect(() => {requireNonNull(undefined, 'nameOfObject');}).to.throw(NullPointerException);
    });

    it('requireInstance', function () {
        class Bar {}
        class Foo {}

        requireInstance(new Foo(), Foo, 'foo');

        expect(() => {requireInstance({}, Foo, 'nameOfObject');}).to.throw(IllegalArgumentException);
        expect(() => {requireInstance(Foo, Foo, 'nameOfObject');}).to.throw(IllegalArgumentException);
        expect(() => {requireInstance(new Bar(), Foo, 'nameOfObject');}).to.throw(IllegalArgumentException);
        expect(() => {requireInstance(null, Foo, 'nameOfObject');}).to.throw(IllegalArgumentException);
        expect(() => {requireInstance(undefined, Foo, 'nameOfObject');}).to.throw(IllegalArgumentException);
    });
});