/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from './testUtils';

import './_init';

import {ChronoField} from '../src/temporal/ChronoField';
import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {LocalTime} from '../src/LocalTime';
import {TemporalAdjuster} from '../src/temporal/TemporalAdjuster';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalQuery} from '../src/temporal/TemporalQuery';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {IllegalArgumentException, NullPointerException, UnsupportedTemporalTypeException} from '../src/errors';

/* these are not covered by the threetenbp ported tests */
describe('js-joda LocalTime', () => {
    const testTime = new LocalTime(1, 1, 1, 1);
    const testTimeZero = new LocalTime(0, 0, 0, 0);

    describe('of factory', () => {
        it('should create a LocalTime instance for a valid time', () => {
            expect(LocalTime.of(12, 0, 12)).to.be.an.instanceOf(LocalTime);
            expect(LocalTime.of(12, 0, 12)).to.eql(LocalTime.parse('12:00:12'));
            expect(LocalTime.of(23, 59, 59)).to.eql(LocalTime.parse('23:59:59'));
        });

        it('should create a LocalTime instance for a valid time of string values', () => {
            expect(LocalTime.of('12', '0', '12')).to.be.an.instanceOf(LocalTime);
            expect(LocalTime.of('12', '0', '12')).to.eql(LocalTime.parse('12:00:12'));
            expect(LocalTime.of('23', '59', '59')).to.eql(LocalTime.parse('23:59:59'));
        });

        it('should fail for an invalid time', () => {
            expect(() => LocalTime.of('12', '0', '60')).to.throw(Error);
            expect(() => LocalTime.of(12, 0, 60)).to.throw(Error);
            expect(() => LocalTime.of('24', '0', '0')).to.throw(Error);
            expect(() => LocalTime.of(24, 0, 0)).to.throw(Error);
            expect(() => LocalTime.of('23', '60', '0')).to.throw(Error);
            expect(() => LocalTime.of(23, 60, 0)).to.throw(Error);
            expect(() => LocalTime.of(20.5, 0, 0)).to.throw(Error);
            expect(() => LocalTime.of(20, 1.5, 0)).to.throw(Error);
            expect(() => LocalTime.of(20, 1, 0.6)).to.throw(Error);
        });
    });

    describe('isSupported', () => {
        
        it('should return true for supported ChronoUnits', () => {
            expect(testTime.isSupported(ChronoUnit.NANOS)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.MICROS)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.MILLIS)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.SECONDS)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.MINUTES)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.HOURS)).to.be.true;
            expect(testTime.isSupported(ChronoUnit.HALF_DAYS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            expect(testTime.isSupported(ChronoUnit.DAYS)).to.be.false;
            expect(testTime.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(testTime.isSupported(ChronoUnit.DAY_OF_YEAR)).to.be.false;
            expect(testTime.isSupported(ChronoUnit.MONTHS)).to.be.false;
            expect(testTime.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(testTime.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(testTime.isSupported(field)).to.be.true;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalUnits', () => {
            let unit = new TemporalUnit();
            unit.isSupportedBy = () => {
                return false;
            };
            expect(testTime.isSupported(unit)).to.be.false;
            unit = new TemporalField();
            unit.isSupportedBy = () => {
                return true;
            };
            expect(testTime.isSupported(unit)).to.be.true;
        });
        
    });
    
    describe('range', () => {
        it('should return the range of the corresponding field', () => {
            assertEquals(testTime.range(ChronoField.NANO_OF_SECOND), ChronoField.NANO_OF_SECOND.range());
            assertEquals(testTime.range(ChronoField.NANO_OF_DAY), ChronoField.NANO_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.MICRO_OF_SECOND), ChronoField.MICRO_OF_SECOND.range());
            assertEquals(testTime.range(ChronoField.MICRO_OF_DAY), ChronoField.MICRO_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.MILLI_OF_SECOND), ChronoField.MILLI_OF_SECOND.range());
            assertEquals(testTime.range(ChronoField.MILLI_OF_DAY), ChronoField.MILLI_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.SECOND_OF_MINUTE), ChronoField.SECOND_OF_MINUTE.range());
            assertEquals(testTime.range(ChronoField.SECOND_OF_DAY), ChronoField.SECOND_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.MINUTE_OF_HOUR), ChronoField.MINUTE_OF_HOUR.range());
            assertEquals(testTime.range(ChronoField.MINUTE_OF_DAY), ChronoField.MINUTE_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.HOUR_OF_AMPM), ChronoField.HOUR_OF_AMPM.range());
            assertEquals(testTime.range(ChronoField.CLOCK_HOUR_OF_AMPM), ChronoField.CLOCK_HOUR_OF_AMPM.range());
            assertEquals(testTime.range(ChronoField.HOUR_OF_DAY), ChronoField.HOUR_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.CLOCK_HOUR_OF_DAY), ChronoField.CLOCK_HOUR_OF_DAY.range());
            assertEquals(testTime.range(ChronoField.AMPM_OF_DAY), ChronoField.AMPM_OF_DAY.range());
        });
        
        it('should return corresponding value of rangeRefinedBy for TemporalField', () => {
            const field = new TemporalField();
            field.rangeRefinedBy = () => {
                return 'Test Value';
            };
            expect(testTime.range(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                testTime.range(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
        it('should throw exception for null value', () => {
            expect(() => {
                testTime.range(null);
            }).to.throw(NullPointerException);
        });
        
    });
    
    describe('get(TemporalField)', () => {
        // only the fields/branches not already checked in the reference tests
        it('should return the correct values', () => {
            assertEquals(testTime.with(ChronoField.MICRO_OF_SECOND, 1).get(ChronoField.MICRO_OF_SECOND), 1);
            assertEquals(testTime.with(ChronoField.MICRO_OF_DAY, 1).get(ChronoField.MICRO_OF_DAY), 1);
            assertEquals(testTime.with(ChronoField.MILLI_OF_SECOND, 1).get(ChronoField.MILLI_OF_SECOND), 1);
            assertEquals(testTime.with(ChronoField.MILLI_OF_DAY, 1).get(ChronoField.MILLI_OF_DAY), 1);
            assertEquals(testTime.with(ChronoField.MILLI_OF_DAY, 1).get(ChronoField.MILLI_OF_DAY), 1);
            assertEquals(testTime.withHour(0).get(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
            assertEquals(testTime.withHour(3).get(ChronoField.CLOCK_HOUR_OF_AMPM), 3);
            assertEquals(testTime.withHour(0).get(ChronoField.CLOCK_HOUR_OF_DAY), 24);
        });
    });
    
    describe('with(TemporalAdjuster)', () => {
        
        it('should return the same LocalTime instance it has been called with', () => {
            const newDayOfWeek = testTime.with(testTime);
            expect(newDayOfWeek).to.equal(testTime);
        });
        
    });
    
    describe('with(TemporalField, value)', () => {
        it('should set the given values', () => {
            assertEquals(testTimeZero.with(ChronoField.NANO_OF_SECOND, 1).get(ChronoField.NANO_OF_SECOND), 1);
            assertEquals(testTimeZero.with(ChronoField.NANO_OF_DAY, 1).get(ChronoField.NANO_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.MICRO_OF_SECOND, 1).get(ChronoField.MICRO_OF_SECOND), 1);
            assertEquals(testTimeZero.with(ChronoField.MICRO_OF_DAY, 1).get(ChronoField.MICRO_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.MILLI_OF_SECOND, 1).get(ChronoField.MILLI_OF_SECOND), 1);
            assertEquals(testTimeZero.with(ChronoField.MILLI_OF_DAY, 1).get(ChronoField.MILLI_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.SECOND_OF_MINUTE, 1).get(ChronoField.SECOND_OF_MINUTE), 1);
            assertEquals(testTimeZero.with(ChronoField.SECOND_OF_DAY, 1).get(ChronoField.SECOND_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.MINUTE_OF_HOUR, 1).get(ChronoField.MINUTE_OF_HOUR), 1);
            assertEquals(testTimeZero.with(ChronoField.MINUTE_OF_DAY, 1).get(ChronoField.MINUTE_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.HOUR_OF_AMPM, 1).get(ChronoField.HOUR_OF_AMPM), 1);
            assertEquals(testTimeZero.with(ChronoField.CLOCK_HOUR_OF_AMPM, 1).get(ChronoField.CLOCK_HOUR_OF_AMPM), 1);
            assertEquals(testTimeZero.with(ChronoField.CLOCK_HOUR_OF_AMPM, 12).get(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
            assertEquals(testTimeZero.with(ChronoField.HOUR_OF_DAY, 1).get(ChronoField.HOUR_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.CLOCK_HOUR_OF_DAY, 1).get(ChronoField.CLOCK_HOUR_OF_DAY), 1);
            assertEquals(testTimeZero.with(ChronoField.CLOCK_HOUR_OF_DAY, 24).get(ChronoField.CLOCK_HOUR_OF_DAY), 24);
            assertEquals(testTimeZero.with(ChronoField.AMPM_OF_DAY, 1).get(ChronoField.AMPM_OF_DAY), 1);
        });
        
        it('should return corresponding value of adjustInto for TemporalField', () => {
            const field = new TemporalField();
            field.adjustInto = () => {
                return 'Test Value';
            };
            expect(testTime.with(field, 1)).to.eql('Test Value');
        });
        
        it('should fail if field is null', () => {
            expect(() => {
                testTime.with(null, 1);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoField', () => {
            expect(() => {
                testTime.with(ChronoField.DAY_OF_MONTH, 1);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
        it('should fail if field is not a TemporalField', () => {
            expect(() => {
                testTime.with({}, 1);
            }).to.throw(IllegalArgumentException);
        });
        
    });
    
    describe('plus', () => {
        it('should add the given values', () => {
            // plus(amount, TemporalUnit)
            assertEquals(testTimeZero.plus(1, ChronoUnit.NANOS), LocalTime.of(0, 0, 0, 1));
            assertEquals(testTimeZero.plus(1, ChronoUnit.MICROS), LocalTime.of(0, 0, 0, 1000));
            assertEquals(testTimeZero.plus(1, ChronoUnit.MILLIS), LocalTime.of(0, 0, 0, 1000000));
            assertEquals(testTimeZero.plus(1, ChronoUnit.SECONDS), LocalTime.of(0, 0, 1, 0));
            assertEquals(testTimeZero.plus(1, ChronoUnit.MINUTES), LocalTime.of(0, 1, 0, 0));
            assertEquals(testTimeZero.plus(1, ChronoUnit.HOURS), LocalTime.of(1, 0, 0, 0));
            assertEquals(testTimeZero.plus(1, ChronoUnit.HALF_DAYS), LocalTime.of(12, 0, 0, 0));
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.addTo = () => {
                return 'Test Value';
            };
            expect(testTime.plus(1, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testTime.plus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testTime.plus(1, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                testTime.plus(1, ChronoUnit.MONTHS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testTime.query(query)).to.eql('Test Value');
        });
    });
    
    describe('until', () => {
        const end = testTime.plus(1, ChronoUnit.HOURS);
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.between = () => {
                return 'Test Value';
            };
            expect(testTime.until(end, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testTime.until(null, ChronoUnit.YEARS);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testTime.until(end, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                testTime.until(end, ChronoUnit.YEARS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('adjustInto', () => {
        it('should return corresponding value of with for TemporalAdjuster', () => {
            const adjuster = new TemporalAdjuster();
            adjuster.with = () => {
                return 'Test Value';
            };
            expect(testTime.adjustInto(adjuster)).to.eql('Test Value');
        });
    });
    
});
