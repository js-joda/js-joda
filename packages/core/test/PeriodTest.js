/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from './testUtils';

import './_init';

import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {ArithmeticException, DateTimeException, DateTimeParseException, NullPointerException, UnsupportedTemporalTypeException} from '../src/errors';
import {IsoChronology} from '../src/chrono/IsoChronology';
import {MathUtil} from '../src/MathUtil';
import {Period} from '../src/Period';
import {TemporalAmount} from '../src/temporal/TemporalAmount';

/* these are not covered by the threetenbp ported tests */
describe('js-joda Period', () => {
    const testPeriod = new Period(123, 456, 789);
    
    describe('from(TemporalAmount)', () => {
        
        it('should return a Period with values from the TemporalAmount it has been called with', () => {
            const temporalAmount = new TemporalAmount();
            temporalAmount.units = () => {
                return [
                    ChronoUnit.YEARS
                ];
            };
            temporalAmount.get = () => {
                return 123;
            };
            assertPeriod(Period.from(temporalAmount), 123, 0, 0);
            temporalAmount.units = () => {
                return [
                    ChronoUnit.YEARS,
                    ChronoUnit.MONTHS
                ];
            };
            assertPeriod(Period.from(temporalAmount), 123, 123, 0);
            temporalAmount.units = () => {
                return [
                    ChronoUnit.YEARS,
                    ChronoUnit.MONTHS,
                    ChronoUnit.DAYS
                ];
            };
            assertPeriod(Period.from(temporalAmount), 123, 123, 123);
        });
        
        it('should fail if TemporalAmount has unsupported units', () => {
            const temporalAmount = new TemporalAmount();
            temporalAmount.units = () => {
                return [
                    ChronoUnit.YEARS,
                    ChronoUnit.MONTHS,
                    ChronoUnit.DAYS,
                    ChronoUnit.SECONDS
                ];
            };
            temporalAmount.get = () => {
                return 1;
            };
            expect(() => {
                Period.from(temporalAmount);
            }).to.throw(DateTimeException);
        });
        
    });
    
    describe('parse(text)', () => {
        
        it('should fail for invalid text', () => {
            expect(() => {
                Period.parse('Invalid');
            }).to.throw(DateTimeParseException);
        });
        it('should fail for too large values text', () => {
            expect(() => {
                Period.parse(`P${MathUtil.MAX_SAFE_INTEGER+1}Y`);
            }).to.throw(DateTimeParseException);
        });
        it('should fail if text is null', () => {
            expect(() => {
                Period.parse(null);
            }).to.throw(NullPointerException);
        });
    });
    
    describe('units()', () => {
        
        it('should return the correct units', () => {
            assertEquals(testPeriod.units(), [ChronoUnit.YEARS, ChronoUnit.MONTHS, ChronoUnit.DAYS]);
        });
    });
    
    describe('chronology()', () => {
        
        it('should return the correct chronology', () => {
            assertEquals(testPeriod.chronology(), IsoChronology.INSTANCE);
        });
    });
    
    describe('get(unit)', () => {
        
        it('should return the correct value for valid units', () => {
            assertEquals(testPeriod.get(ChronoUnit.YEARS), 123);
            assertEquals(testPeriod.get(ChronoUnit.MONTHS), 456);
            assertEquals(testPeriod.get(ChronoUnit.DAYS), 789);
        });
        it('should fail for unsupported units', () => {
            expect(() => {
                testPeriod.get(ChronoUnit.SECONDS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('ofWeeks()', () => {
        
        it('should return the correct value', () => {
            assertPeriod(Period.ofWeeks(1), 0, 0, 7);
            assertPeriod(Period.ofWeeks(2), 0, 0, 14);
            assertPeriod(Period.ofWeeks(5), 0, 0, 35);
            assertPeriod(Period.ofWeeks(53), 0, 0, 371);
        });
        it('should fail for unsupported values, overflow', () => {
            expect(() => {
                Period.ofWeeks(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });
        it('should fail for unsupported values, underflow', () => {
            expect(() => {
                Period.ofWeeks(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });
        it('should fail for non int values', () => {
            expect(() => {
                Period.ofWeeks(30.5);
            }).to.throw(ArithmeticException);
        });
    });
    
    describe('ofDays()', () => {
        it('should return the correct value', () => {
            assertPeriod(Period.ofDays(1), 0, 0, 1);
            assertPeriod(Period.ofDays(40), 0, 0, 40);
            assertPeriod(Period.ofDays(400), 0, 0, 400);
        });

        it('should fail for non int values', () => {
            expect(() => {
                Period.ofDays(30.5);
            }).to.throw(ArithmeticException);
            expect(() => {
                Period.ofDays('30.5');
            }).to.throw(ArithmeticException);
            expect(() => {
                Period.ofDays('foo');
            }).to.throw(ArithmeticException);
            expect(() => {
                Period.ofDays();
            }).to.throw(ArithmeticException);
            expect(() => {
                Period.ofDays(null);
            }).to.throw(ArithmeticException);
        });
    });

    function assertPeriod(test, y, mo, d) {
        assertEquals(test.years(), y, 'years');
        assertEquals(test.months(), mo, 'months');
        assertEquals(test.days(), d, 'days');
    }
    
});