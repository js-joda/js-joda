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
        it('Offset', () => {
            expect(Clock.offset().toString()).to.contain('OffsetClock');
        });        
    });
    
    describe('withZone', () => {
        it('SystemDefaultClock', () => {
            const base = Clock.systemDefaultZone();
            expect(base.equals(base.withZone(ZoneId.systemDefault())));
        });
        it('FixedClock', () => {
            const base = Clock.fixed(Instant.now(), ZoneId.systemDefault());
            expect(base.equals(base.withZone(ZoneId.systemDefault())));
        });                
    });
    
    describe('offset clock', () => {
    
        const duration = Duration.parse('PT0H3M');
        const base = Clock.fixed(Instant.now(), ZoneId.systemDefault());
        const offset = Clock.offset(base, duration);
                
        it('is offset from base', () => {
            expect(base.millis() === offset.millis() + duration.toMillis()); 
        });
        
        it('equals', () => {
            const offset2 = Clock.offset(base, duration);            
            expect(offset.equals(offset2)); 
        });
        
        it('with zone', () => {
            const offset2 = offset.withZone(ZoneId.systemDefault());           
            expect(offset.equals(offset2)); 
        });            
    });
});

