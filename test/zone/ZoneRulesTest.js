/*
 * @copyright (c) 2016, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */


import {expect} from 'chai';

import '../_init';

import {assertEquals} from '../testUtils';

import {ZoneOffset} from '../../src/ZoneOffset';
import {ZoneRules} from '../../src/zone/ZoneRules';

describe('zone/ZoneRules', () => {

    describe('abstract methods', function () {

        it('should fail for isFixedOffset', function () {
            expect(()=>{
                new ZoneRules().isFixedOffset();
            }).to.throw(TypeError);
        });

        it('should fail for offsetOfInstant', function () {
            expect(()=>{
                new ZoneRules().offsetOfInstant();
            }).to.throw(TypeError);
        });

        it('should fail for offsetOfEpochMilli', function () {
            expect(()=>{
                new ZoneRules().offsetOfEpochMilli();
            }).to.throw(TypeError);
        });

        it('should fail for offsetOfLocalDateTime', function () {
            expect(()=>{
                new ZoneRules().offsetOfLocalDateTime();
            }).to.throw(TypeError);
        });

        it('should fail for validOffsets', function () {
            expect(()=>{
                new ZoneRules().validOffsets();
            }).to.throw(TypeError);
        });

        it('should fail for transition', function () {
            expect(()=>{
                new ZoneRules().transition();
            }).to.throw(TypeError);
        });

        it('should fail for standardOffset', function () {
            expect(()=>{
                new ZoneRules().standardOffset();
            }).to.throw(TypeError);
        });

        it('should fail for daylightSavings', function () {
            expect(()=>{
                new ZoneRules().daylightSavings();
            }).to.throw(TypeError);
        });

        it('should fail for isDaylightSavings', function () {
            expect(()=>{
                new ZoneRules().isDaylightSavings();
            }).to.throw(TypeError);
        });

        it('should fail for isValidOffset', function () {
            expect(()=>{
                new ZoneRules().isValidOffset();
            }).to.throw(TypeError);
        });

        it('should fail for nextTransition', function () {
            expect(()=>{
                new ZoneRules().nextTransition();
            }).to.throw(TypeError);
        });

        it('should fail for previousTransition', function () {
            expect(()=>{
                new ZoneRules().previousTransition();
            }).to.throw(TypeError);
        });

        it('should fail for transitions', function () {
            expect(()=>{
                new ZoneRules().transitions();
            }).to.throw(TypeError);
        });

        it('should fail for transitionRules', function () {
            expect(()=>{
                new ZoneRules().transitionRules();
            }).to.throw(TypeError);
        });

    });

    describe('Fixed ZoneRules', function () {

        it('should return same offset rules for any epoch milli', function () {
            const fixedOffset = ZoneOffset.ofHours(2);
            const offsetOfMilli = fixedOffset.rules().offsetOfEpochMilli(0);

            assertEquals(offsetOfMilli, fixedOffset);
            assertEquals(offsetOfMilli.rules(), fixedOffset.rules());
        });

        it('should equal for same rules', function () {
            const fixedOffset = ZoneOffset.ofHours(2);
            const offsetOfMilli = fixedOffset.rules().offsetOfEpochMilli(0);

            expect(offsetOfMilli.rules().equals(ZoneOffset.ofHours(2).rules())).to.be.true;
            expect(offsetOfMilli.rules().equals(ZoneOffset.ofHours(3).rules())).to.be.false;
            expect(offsetOfMilli.rules().equals({})).to.be.false;
        });
    });
});
