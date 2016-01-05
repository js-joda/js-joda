import {expect} from 'chai';
import {Clock} from '../src/Clock';

describe('Clock', () => {
   describe('should deny calling an instant method of pseudo abstract class Clock', () => {
       it('millis', () => {
            expect(() => {
                new Clock().instant();
            }).to.throw(TypeError);
        });
       it('instant', () => {
            expect(() => {
                new Clock().instant();
            }).to.throw(TypeError);
        });
       it('offset', () => {
            expect(() => {
                new Clock().instant();
            }).to.throw(TypeError);
        });
   });
});

