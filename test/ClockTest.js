/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import './_init';

import {Clock} from '../src/Clock';
import {Duration} from  '../src/Duration';
import {Instant} from '../src/Instant';
import {ZoneId} from '../src/ZoneId';

describe('Clock', () => {
    describe('should deny calling an instant method of pseudo abstract class Clock', () => {
        it('millis', () => {
            expect(() => {
                new Clock().millis();
            }).to.throw(TypeError);
        });
        it('instant', () => {
            expect(() => {
                new Clock().instant();
            }).to.throw(TypeError);
        });
        it('offset', () => {
            expect(() => {
                new Clock().offset();
            }).to.throw(TypeError);
        });
    });

    describe('toString', () => {
        it('SystemUTC', () => {
            expect(Clock.systemUTC().toString()).to.contain('SystemClock');
        });
        it('SystemDefaultZone', () => {
            expect(Clock.systemDefaultZone().toString()).to.contain('SystemClock');
        });
        it('Fixed', () => {
            expect(Clock.fixed().toString()).to.contain('FixedClock');
        });
    });
    
    describe('offset clock', () => {
        it('is offset', () => {
            const duration = Duration.parse('PT0H3M');
            const base = Clock.fixed(Instant.now(), ZoneId.systemDefault());
            const offset = Clock.offset(base, duration);
            expect(base.millis() === offset.millis() + duration.toMillis()); 
        });
    
    });
});

