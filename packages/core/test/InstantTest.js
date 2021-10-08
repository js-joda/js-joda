/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import { assertEquals } from './testUtils';

import './_init';

import { ChronoField } from '../src/temporal/ChronoField';
import { ChronoUnit } from '../src/temporal/ChronoUnit';
import { Instant } from '../src/Instant';
import { LocalTime } from '../src/LocalTime';
import { LocalDateTime } from '../src/LocalDateTime';
import { MathUtil } from '../src/MathUtil';
import { OffsetDateTime } from '../src/OffsetDateTime';
import { TemporalAccessor } from '../src/temporal/TemporalAccessor';
import { TemporalField } from '../src/temporal/TemporalField';
import { TemporalQuery } from '../src/temporal/TemporalQuery';
import { TemporalUnit } from '../src/temporal/TemporalUnit';
import { ZoneOffset } from '../src/ZoneOffset';
import { DateTimeException, NullPointerException, UnsupportedTemporalTypeException } from '../src/errors';

/* these are not covered by the threetenbp ported tests */
describe('js-joda Instant', () => {
    const instant = Instant.EPOCH.plusSeconds(123).plusNanos(456);
    const instantNextDay = instant.plus(1, ChronoUnit.DAYS);


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
            expect(instant.isSupported(ChronoField.INSTANT_SECONDS)).to.be.true;
            expect(instant.isSupported(ChronoField.NANO_OF_SECOND)).to.be.true;
            expect(instant.isSupported(ChronoField.MICRO_OF_SECOND)).to.be.true;
            expect(instant.isSupported(ChronoField.MILLI_OF_SECOND)).to.be.true;
        });
        
        it('should return true for supported ChronoUnits', () => {
            expect(instant.isSupported(ChronoUnit.NANOS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.MICROS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.MILLIS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.SECONDS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.MINUTES)).to.be.true;
            expect(instant.isSupported(ChronoUnit.HOURS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.HALF_DAYS)).to.be.true;
            expect(instant.isSupported(ChronoUnit.DAYS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            expect(instant.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(instant.isSupported(ChronoUnit.DAY_OF_YEAR)).to.be.false;
            expect(instant.isSupported(ChronoUnit.MONTHS)).to.be.false;
            expect(instant.isSupported(null)).to.be.false;
        });
        
        it('should return false for unsupported ChronoFields', () => {
            expect(instant.isSupported(ChronoField.HOUR_OF_DAY)).to.be.false;
            expect(instant.isSupported(ChronoField.DAY_OF_YEAR)).to.be.false;
            expect(instant.isSupported(ChronoField.MONTH_OF_YEAR)).to.be.false;
            expect(instant.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(instant.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(instant.isSupported(field)).to.be.true;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalUnits', () => {
            let unit = new TemporalUnit();
            unit.isSupportedBy = () => {
                return false;
            };
            expect(instant.isSupported(unit)).to.be.false;
            unit = new TemporalField();
            unit.isSupportedBy = () => {
                return true;
            };
            expect(instant.isSupported(unit)).to.be.true;
        });
        
    });
    
    describe('range', () => {
        it('should return the range of the corresponding field', () => {
            assertEquals(instant.range(ChronoField.INSTANT_SECONDS), ChronoField.INSTANT_SECONDS.range());
            assertEquals(instant.range(ChronoField.NANO_OF_SECOND), ChronoField.NANO_OF_SECOND.range());
            assertEquals(instant.range(ChronoField.MICRO_OF_SECOND), ChronoField.MICRO_OF_SECOND.range());
            assertEquals(instant.range(ChronoField.MILLI_OF_SECOND), ChronoField.MILLI_OF_SECOND.range());
        });
        
        it('should return corresponding value of rangeRefinedBy for TemporalField', () => {
            const field = new TemporalField();
            field.rangeRefinedBy = () => {
                return 'Test Value';
            };
            expect(instant.range(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                instant.range(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('getLong', () => {
        it('should return corresponding value of getFrom for TemporalField', () => {
            const field = new TemporalField();
            field.getFrom = () => {
                return 'Test Value';
            };
            expect(instant.getLong(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                instant.getLong(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('with(TemporalField, value)', () => {
        it('should return corresponding value of adjustInto for TemporalField', () => {
            const field = new TemporalField();
            field.adjustInto = () => {
                return 'Test Value';
            };
            expect(instant.with(field, 1)).to.eql('Test Value');
        });
    });
    
    describe('plus', () => {
        it('should add the given values', () => {
            // plus(amount, TemporalUnit)
            // only test the units not already tested in the reference tests!
            assertEquals(instant.plus(1, ChronoUnit.MICROS), Instant.ofEpochSecond(instant.epochSecond(), instant.nano() + 1000));
            assertEquals(instant.plus(1, ChronoUnit.MILLIS), Instant.ofEpochSecond(instant.epochSecond(), instant.nano() + 1000000));
            assertEquals(instant.plus(1, ChronoUnit.MINUTES), Instant.ofEpochSecond(instant.epochSecond() + LocalTime.SECONDS_PER_MINUTE, instant.nano()));
            assertEquals(instant.plus(1, ChronoUnit.HOURS), Instant.ofEpochSecond(instant.epochSecond() + LocalTime.SECONDS_PER_HOUR, instant.nano()));
            assertEquals(instant.plus(1, ChronoUnit.HALF_DAYS), Instant.ofEpochSecond(instant.epochSecond() + LocalTime.SECONDS_PER_DAY / 2, instant.nano()));
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.addTo = () => {
                return 'Test Value';
            };
            expect(instant.plus(1, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                instant.plus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                instant.plus(1, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                instant.plus(1, ChronoUnit.MONTHS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(instant.query(query)).to.eql('Test Value');
        });
    });
    
    describe('until', () => {
        it('should return result for the next day values', () => {
            assertEquals(instant.until(instantNextDay, ChronoUnit.NANOS), LocalTime.NANOS_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.MICROS), LocalTime.MICROS_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.MILLIS), LocalTime.MILLIS_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.SECONDS), LocalTime.SECONDS_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.MINUTES), LocalTime.MINUTES_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.HOURS), LocalTime.HOURS_PER_DAY);
            assertEquals(instant.until(instantNextDay, ChronoUnit.HALF_DAYS), 2);
            assertEquals(instant.until(instantNextDay, ChronoUnit.DAYS), 1);
        });


        it('should return results for a date 42 days after', () => {
            const diffNanos = 42 * LocalTime.NANOS_PER_DAY
                + 4 * LocalTime.NANOS_PER_HOUR  + 43 * LocalTime.NANOS_PER_MINUTE
                + 44 * LocalTime.NANOS_PER_SECOND + 45 * 1000000 + 46 * 1000 + 47;
            const end = instant.plusNanos(diffNanos);
            assertEquals(instant.until(end, ChronoUnit.DAYS), MathUtil.intDiv(diffNanos, LocalTime.NANOS_PER_DAY));
            assertEquals(instant.until(end, ChronoUnit.HOURS), MathUtil.intDiv(diffNanos, LocalTime.NANOS_PER_HOUR));
            assertEquals(instant.until(end, ChronoUnit.MINUTES), MathUtil.intDiv(diffNanos, LocalTime.NANOS_PER_MINUTE));
            assertEquals(instant.until(end, ChronoUnit.SECONDS), MathUtil.intDiv(diffNanos, LocalTime.NANOS_PER_SECOND));
            assertEquals(instant.until(end, ChronoUnit.MILLIS), MathUtil.intDiv(diffNanos, 1000000));
            assertEquals(instant.until(end, ChronoUnit.MICROS), MathUtil.intDiv(diffNanos, 1000));
            assertEquals(instant.until(end, ChronoUnit.NANOS), diffNanos);
        });

        it('should return result for a date 200 years after', () => {
            const end = LocalDateTime.ofInstant(instant, ZoneOffset.UTC)
                .plusYears(200)
                .plusDays(42)
                .plusHours(7)
                .plusMinutes(43)
                .plusSeconds(44)
                .plusNanos(47 * 1000000 + 48 * 1000)
                .toInstant(ZoneOffset.UTC);
            const diffMillis = instant.until(end, ChronoUnit.MILLIS);
            assertEquals(instant.until(end, ChronoUnit.DAYS), MathUtil.intDiv(diffMillis, LocalTime.MILLIS_PER_DAY));
            assertEquals(instant.until(end, ChronoUnit.HOURS), MathUtil.intDiv(diffMillis, LocalTime.SECONDS_PER_HOUR * 1000));
            assertEquals(instant.until(end, ChronoUnit.MINUTES), MathUtil.intDiv(diffMillis, LocalTime.SECONDS_PER_MINUTE * 1000));
            assertEquals(instant.until(end, ChronoUnit.SECONDS), MathUtil.intDiv(diffMillis, 1000));
            assertEquals(diffMillis, 6315090224047);
            assertEquals(instant.until(end, ChronoUnit.MICROS), diffMillis * 1000 + 48);
        });

        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.between = () => {
                return 'Test Value';
            };
            expect(instant.until(instantNextDay, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                instant.until(null, ChronoUnit.YEARS);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                instant.until(instantNextDay, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                instant.until(instantNextDay, ChronoUnit.YEARS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });

    describe('atOffset', () => {
        it('normal', () => {
            assertEquals(instant.atOffset(ZoneOffset.ofHours(1)), OffsetDateTime.parse('1970-01-01T01:02:03.000000456+01:00'));
            assertEquals(instant.atOffset(ZoneOffset.ofHours(5)), OffsetDateTime.parse('1970-01-01T05:02:03.000000456+05:00'));
        });
    });
});
