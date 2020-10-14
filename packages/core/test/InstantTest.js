/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from './testUtils';

import './_init';

import {ChronoField} from '../src/temporal/ChronoField';
import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {Instant} from '../src/Instant';
import {LocalTime} from '../src/LocalTime';
import {MathUtil} from '../src/MathUtil';
import {OffsetDateTime} from '../src/OffsetDateTime';
import {TemporalAccessor} from '../src/temporal/TemporalAccessor';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalQuery} from '../src/temporal/TemporalQuery';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {ZoneOffset} from '../src/ZoneOffset';
import {DateTimeException, NullPointerException, UnsupportedTemporalTypeException} from '../src/errors';

/* these are not covered by the threetenbp ported tests */
describe('js-joda Instant', () => {
    const testInstant = new Instant(123, 456);
    
    describe('from(TemporalAccessor)', () => {
        
        it('should fail if TemporalAccessor throws an exception', () => {
            const temporalAccessor = new TemporalAccessor();
            temporalAccessor.getLong = () => {
                throw new Error();
            };
            temporalAccessor.get = () => {
                return 1;
            };
            expect(() => {
                Instant.from(temporalAccessor);
            }).to.throw(DateTimeException);
        });
        
    });

    describe('constructor(seconds, nanos)', () => {
    
        it('should fail for unsupported values, nanos overflow', () => {
            expect(() => {
                new Instant(0, MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        it('should fail for unsupported values, nanos negative', () => {
            expect(() => {
                new Instant(0, -1);
            }).to.throw(DateTimeException);
        });
        
    });
    
    describe('isSupported', () => {
        
        it('should return true for supported ChronoFields', () => {
            expect(testInstant.isSupported(ChronoField.INSTANT_SECONDS)).to.be.true;
            expect(testInstant.isSupported(ChronoField.NANO_OF_SECOND)).to.be.true;
            expect(testInstant.isSupported(ChronoField.MICRO_OF_SECOND)).to.be.true;
            expect(testInstant.isSupported(ChronoField.MILLI_OF_SECOND)).to.be.true;
        });
        
        it('should return true for supported ChronoUnits', () => {
            expect(testInstant.isSupported(ChronoUnit.NANOS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.MICROS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.MILLIS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.SECONDS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.MINUTES)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.HOURS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.HALF_DAYS)).to.be.true;
            expect(testInstant.isSupported(ChronoUnit.DAYS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            expect(testInstant.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(testInstant.isSupported(ChronoUnit.DAY_OF_YEAR)).to.be.false;
            expect(testInstant.isSupported(ChronoUnit.MONTHS)).to.be.false;
            expect(testInstant.isSupported(null)).to.be.false;
        });
        
        it('should return false for unsupported ChronoFields', () => {
            expect(testInstant.isSupported(ChronoField.HOUR_OF_DAY)).to.be.false;
            expect(testInstant.isSupported(ChronoField.DAY_OF_YEAR)).to.be.false;
            expect(testInstant.isSupported(ChronoField.MONTH_OF_YEAR)).to.be.false;
            expect(testInstant.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(testInstant.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(testInstant.isSupported(field)).to.be.true;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalUnits', () => {
            let unit = new TemporalUnit();
            unit.isSupportedBy = () => {
                return false;
            };
            expect(testInstant.isSupported(unit)).to.be.false;
            unit = new TemporalField();
            unit.isSupportedBy = () => {
                return true;
            };
            expect(testInstant.isSupported(unit)).to.be.true;
        });
        
    });
    
    describe('range', () => {
        it('should return the range of the corresponding field', () => {
            assertEquals(testInstant.range(ChronoField.INSTANT_SECONDS), ChronoField.INSTANT_SECONDS.range());
            assertEquals(testInstant.range(ChronoField.NANO_OF_SECOND), ChronoField.NANO_OF_SECOND.range());
            assertEquals(testInstant.range(ChronoField.MICRO_OF_SECOND), ChronoField.MICRO_OF_SECOND.range());
            assertEquals(testInstant.range(ChronoField.MILLI_OF_SECOND), ChronoField.MILLI_OF_SECOND.range());
        });
        
        it('should return corresponding value of rangeRefinedBy for TemporalField', () => {
            const field = new TemporalField();
            field.rangeRefinedBy = () => {
                return 'Test Value';
            };
            expect(testInstant.range(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                testInstant.range(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('getLong', () => {
        it('should return corresponding value of getFrom for TemporalField', () => {
            const field = new TemporalField();
            field.getFrom = () => {
                return 'Test Value';
            };
            expect(testInstant.getLong(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                testInstant.getLong(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('with(TemporalField, value)', () => {
        it('should return corresponding value of adjustInto for TemporalField', () => {
            const field = new TemporalField();
            field.adjustInto = () => {
                return 'Test Value';
            };
            expect(testInstant.with(field, 1)).to.eql('Test Value');
        });
    });
    
    describe('plus', () => {
        it('should add the given values', () => {
            // plus(amount, TemporalUnit)
            // only test the units not already tested in the reference tests!
            assertEquals(testInstant.plus(1, ChronoUnit.MICROS), Instant.ofEpochSecond(testInstant.epochSecond(), testInstant.nano() + 1000));
            assertEquals(testInstant.plus(1, ChronoUnit.MILLIS), Instant.ofEpochSecond(testInstant.epochSecond(), testInstant.nano() + 1000000));
            assertEquals(testInstant.plus(1, ChronoUnit.MINUTES), Instant.ofEpochSecond(testInstant.epochSecond() + LocalTime.SECONDS_PER_MINUTE, testInstant.nano()));
            assertEquals(testInstant.plus(1, ChronoUnit.HOURS), Instant.ofEpochSecond(testInstant.epochSecond() + LocalTime.SECONDS_PER_HOUR, testInstant.nano()));
            assertEquals(testInstant.plus(1, ChronoUnit.HALF_DAYS), Instant.ofEpochSecond(testInstant.epochSecond() + LocalTime.SECONDS_PER_DAY / 2, testInstant.nano()));
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.addTo = () => {
                return 'Test Value';
            };
            expect(testInstant.plus(1, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testInstant.plus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testInstant.plus(1, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                testInstant.plus(1, ChronoUnit.MONTHS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testInstant.query(query)).to.eql('Test Value');
        });
    });
    
    describe('until', () => {
        const end = testInstant.plus(1, ChronoUnit.DAYS);
        it('should return result for the given values', () => {
            assertEquals(testInstant.until(end, ChronoUnit.NANOS), LocalTime.NANOS_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.MICROS), LocalTime.MICROS_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.MILLIS), LocalTime.MILLIS_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.SECONDS), LocalTime.SECONDS_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.MINUTES), LocalTime.MINUTES_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.HOURS), LocalTime.HOURS_PER_DAY);
            assertEquals(testInstant.until(end, ChronoUnit.HALF_DAYS), 2);
            assertEquals(testInstant.until(end, ChronoUnit.DAYS), 1);
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.between = () => {
                return 'Test Value';
            };
            expect(testInstant.until(end, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testInstant.until(null, ChronoUnit.YEARS);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testInstant.until(end, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                testInstant.until(end, ChronoUnit.YEARS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });

    describe('atOffset', () => {
        it('normal', () => {
            assertEquals(testInstant.atOffset(ZoneOffset.ofHours(1)), OffsetDateTime.parse('1970-01-01T01:02:03.000000456+01:00'));
            assertEquals(testInstant.atOffset(ZoneOffset.ofHours(5)), OffsetDateTime.parse('1970-01-01T05:02:03.000000456+05:00'));
        });
    });
});