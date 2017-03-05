/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals, dataProviderTest} from '../testUtils';

import '../_init';

import {ChronoField} from '../../src/temporal/ChronoField';
import {DateTimeBuilder} from '../../src/format/DateTimeBuilder';
import {DateTimeException} from '../../src/errors';
import {IsoChronology} from '../../src/chrono/IsoChronology';
import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {ResolverStyle} from '../../src/format/ResolverStyle';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda DateTimeBuilderTest', () => {
    describe('_addFieldValue', () => {
        it('should add a fieldValue', () => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.fieldValues.containsKey(ChronoField.YEAR)).to.be.true;
            expect(builder.fieldValues.get(ChronoField.YEAR)).to.eql(2016);
        });
        it('should add same fieldValue', () => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.fieldValues.containsKey(ChronoField.YEAR)).to.be.true;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.fieldValues.containsKey(ChronoField.YEAR)).to.be.true;
            expect(builder.fieldValues.get(ChronoField.YEAR)).to.eql(2016);
        });
        it('should fail when adding same field with different value', () => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.fieldValues.containsKey(ChronoField.YEAR)).to.be.true;
            expect(() => {
                builder._addFieldValue(ChronoField.YEAR, 2017);
            }).to.throw(DateTimeException);
        });
    });
    
    describe('_checkDate', () => {
        it('should run without exception for a null date', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
            builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
            expect(() => {
                builder._checkDate(null);
            }).to.not.throw(Error);
        });

        it('should run without exception for the same date as the fieldValues', () => {
            let builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
            builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
            expect(() => {
                builder._checkDate(LocalDate.of(2016,1,1));
            }).to.not.throw(Error);

            builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.DAY_OF_YEAR, 1);
            expect(() => {
                builder._checkDate(LocalDate.of(2016,1,1));
            }).to.not.throw(Error);
        });

        it('should throw an exception for a different date than the fieldValues', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
            builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
            expect(() => {
                builder._checkDate(LocalDate.of(2016,1,2));
            }).to.throw(DateTimeException);
        });
    
        it('should throw an exception if date.getLong throws an exception', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.DAY_OF_YEAR, 1);
            expect(() => {
                const d = LocalDate.of(2016, 1, 1);
                // "mock" getLong to throw
                d.getLong = () => {
                    throw new Error('Test Error');
                };
                builder._checkDate(d);
            }).to.throw(Error, /Test Error/);
        });
    
        it('should not throw an exception if date.getLong throws a DateTimeException', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.DAY_OF_YEAR, 1);
            expect(() => {
                const d = LocalDate.of(2016, 1, 1);
                // "mock" getLong to throw
                d.getLong = () => {
                    throw new DateTimeException('Test Error');
                };
                builder._checkDate(d);
            }).to.not.throw();
        });
    
    });
    
    describe('isSupported', () => {
        it('should return true for a field that has been added', () => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.isSupported(ChronoField.YEAR)).to.be.true;
        });
        
        it('should return false for a field that has not been added', () => {
            const builder = new DateTimeBuilder();
            expect(builder.isSupported(ChronoField.YEAR)).to.be.false;
        });
        
        it('should return false if requested field is null', () => {
            const builder = new DateTimeBuilder();
            expect(builder.isSupported(null)).to.be.false;
        });
    });
    
    describe('getLong', () => {
        it('should return field value for a field that has been added', () => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(ChronoField.YEAR, 2016);
            expect(builder.getLong(ChronoField.YEAR)).to.eql(2016);
        });
        
        it('should return field value for a date field that can be determined after resolution', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.YEAR, 2016);
            builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
            builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
            builder.resolve(ResolverStyle.SMART);
            expect(builder.getLong(ChronoField.DAY_OF_YEAR)).to.eql(1);
        });
        
        it('should return field value for a time field that can be determined after resolution', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
            builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
            builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 1);
            builder.resolve(ResolverStyle.SMART);
            expect(builder.getLong(ChronoField.SECOND_OF_DAY)).to.eql(1);
        });
        
        it('should should throw an excpetion for a field that cannot be determined', () => {
            const builder = new DateTimeBuilder();
            builder.chrono = IsoChronology.INSTANCE;
            expect(() => {
                builder.getLong(ChronoField.SECOND_OF_DAY);
            }).to.throw(DateTimeException);
        });
    });
    
    describe('query', () => {
        
        describe('TemporalQueries.localDate()', () => {
            it('should return null if builder has not been resolved', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.YEAR, 2016);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
                expect(builder.query(TemporalQueries.localDate())).to.be.null;
            });
            
            it('should return a LocalDate if builder has been resolved', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.YEAR, 2016);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.query(TemporalQueries.localDate()), LocalDate.of(2016, 1, 1));
            });
        });
        
        describe('TemporalQueries.localTime()', () => {
            it('should return null if builder has not been resolved', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 1);
                expect(builder.query(TemporalQueries.localTime())).to.be.null;
            });
            
            it('should return a LocalDate if builder has been resolved', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 1);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 1);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.query(TemporalQueries.localTime()), LocalTime.of(1, 1, 1));
            });
        });
        
        describe('TemporalQueries.precision()', () => {
            it('should return null since it is not supported', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.YEAR, 2016);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 1);
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 1);
                builder.resolve(ResolverStyle.SMART);
                expect(builder.query(TemporalQueries.precision())).to.be.null;
            });
        });
        
        describe('TemporalQueries.chronology()', () => {
            it('should return null if chrono has not been set', () => {
                const builder = new DateTimeBuilder();
                expect(builder.query(TemporalQueries.chronology())).to.be.null;
            });
            
            it('should return the chronology', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                assertEquals(builder.query(TemporalQueries.chronology()), IsoChronology.INSTANCE);
            });
        });
        
    });
    
    describe('resolve', () => {
        describe('ResolverStyle.SMART', () => {
            it('should only resolve the given fields', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.YEAR, 2016);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 6);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 3);
                builder._addFieldValue(ChronoField.DAY_OF_YEAR, 1);
                // only resolve YEAR and DAY_OF_YEAR, ignore MONTH_OF_YEAR and DAY_OF_MONTH
                builder.resolve(ResolverStyle.SMART, [ChronoField.YEAR, ChronoField.DAY_OF_YEAR]);
                assertEquals(builder.build(LocalDate.FROM), LocalDate.of(2016, 1, 1));
            });
            
            it('should resolve excessDays when hour 24 is given', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.YEAR, 2016);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 6);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 3);
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 24);
                builder.resolve(ResolverStyle.SMART);
                // hour 24 causes 1 excessDay
                assertEquals(builder.build(LocalDate.FROM), LocalDate.of(2016, 6, 4));
            });
            
            it('should handle MILLI_OF_SECOND and MICRO_OF_SECOND', () => {
                // only works, if HOUR/MINUTE/SECOND are also set
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 0);
                builder._addFieldValue(ChronoField.MILLI_OF_SECOND, 1);
                builder._addFieldValue(ChronoField.MICRO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.build(LocalTime.FROM), LocalTime.of(0, 0, 0, 1001000));
            });
            
            it('should handle MILLI_OF_SECOND and NANO_OF_SECOND (NANO overwrites MILLI)', () => {
                // only works, if HOUR/MINUTE/SECOND are also set
                // NANO overwrites MILLI, seems strange to me, but thats the way it's implemented
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 0);
                builder._addFieldValue(ChronoField.MILLI_OF_SECOND, 1);
                builder._addFieldValue(ChronoField.NANO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.build(LocalTime.FROM), LocalTime.of(0, 0, 0, 1));
            });
            
            it('should handle MICRO_OF_SECOND and NANO_OF_SECOND (NANO overwrites MICRO)', () => {
                // only works, if HOUR/MINUTE/SECOND are also set
                // NANO overwrites MICRO, seems strange to me, but thats the way it's implemented
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 0);
                builder._addFieldValue(ChronoField.MICRO_OF_SECOND, 1);
                builder._addFieldValue(ChronoField.NANO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.build(LocalTime.FROM), LocalTime.of(0, 0, 0, 1));
            });
            
            it('should handle MICRO_OF_SECOND and NANO_OF_SECOND (NANO overwrites MICRO)', () => {
                // only works, if HOUR/MINUTE/SECOND are also set
                // NANO overwrites MICRO, seems strange to me, but thats the way it's implemented
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 0);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 0);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 0);
                builder._addFieldValue(ChronoField.MICRO_OF_SECOND, 1);
                builder._addFieldValue(ChronoField.NANO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                assertEquals(builder.build(LocalTime.FROM), LocalTime.of(0, 0, 0, 1));
            });
            
            const data_times = [
                [ChronoField.HOUR_OF_DAY, 0, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 0, ChronoField.NANO_OF_SECOND, 0, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 24, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 0, ChronoField.NANO_OF_SECOND, 0, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 0, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 0, ChronoField.MICRO_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(0, 0, 0, 1000)],
                [ChronoField.HOUR_OF_DAY, 0, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 0, ChronoField.MILLI_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(0, 0, 0, 1000000)],
                [ChronoField.HOUR_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(1, 0, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 1, ChronoField.MINUTE_OF_HOUR, 1, null, null, null, null, LocalTime.FROM, LocalTime.of(1, 1, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 1, ChronoField.MINUTE_OF_HOUR, 1, ChronoField.SECOND_OF_MINUTE, 1, null, null, LocalTime.FROM, LocalTime.of(1, 1, 1, 0)],
                [ChronoField.HOUR_OF_DAY, 1, ChronoField.MINUTE_OF_HOUR, 1, ChronoField.SECOND_OF_MINUTE, 1, ChronoField.NANO_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(1, 1, 1, 1)],
                [ChronoField.NANO_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 1)],
                [ChronoField.NANO_OF_DAY, ChronoField.NANO_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 59, 59, 999999999)],
                [ChronoField.MICRO_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 1000)],
                [ChronoField.MICRO_OF_DAY, ChronoField.MICRO_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 59, 59, 999999000)],
                [ChronoField.MILLI_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 1000000)],
                [ChronoField.MILLI_OF_DAY, ChronoField.MILLI_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 59, 59, 999000000)],
                [ChronoField.SECOND_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 1, 0)],
                [ChronoField.SECOND_OF_DAY, ChronoField.SECOND_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 59, 59, 0)],
                [ChronoField.MINUTE_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 1, 0, 0)],
                [ChronoField.MINUTE_OF_DAY, ChronoField.MINUTE_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 59, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 1, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(1, 0, 0, 0)],
                [ChronoField.HOUR_OF_DAY, ChronoField.HOUR_OF_DAY.range().maximum(), null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(23, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_DAY, 0, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_DAY, 24, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_DAY, 6, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(6, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 0, ChronoField.AMPM_OF_DAY, 0, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 12, ChronoField.AMPM_OF_DAY, 0, null, null, null, null, LocalTime.FROM, LocalTime.of(0, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 6, ChronoField.AMPM_OF_DAY, 0, null, null, null, null, LocalTime.FROM, LocalTime.of(6, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 0, ChronoField.AMPM_OF_DAY, 1, null, null, null, null, LocalTime.FROM, LocalTime.of(12, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 12, ChronoField.AMPM_OF_DAY, 1, null, null, null, null, LocalTime.FROM, LocalTime.of(12, 0, 0, 0)],
                [ChronoField.CLOCK_HOUR_OF_AMPM, 6, ChronoField.AMPM_OF_DAY, 1, null, null, null, null, LocalTime.FROM, LocalTime.of(18, 0, 0, 0)],
            ];
            
            it('should resolve times', () => {
                dataProviderTest(data_times, (field1, value1, field2, value2, field3, value3, field4, value4, query, expectedVal) => {
                    
                    const builder = new DateTimeBuilder();
                    builder._addFieldValue(field1, value1);
                    builder.chrono = IsoChronology.INSTANCE;
                    if (field2 != null) {
                        builder._addFieldValue(field2, value2);
                    }
                    if (field3 != null) {
                        builder._addFieldValue(field3, value3);
                    }
                    if (field4 != null) {
                        builder._addFieldValue(field4, value4);
                    }
                    builder.resolve(ResolverStyle.SMART, null);
                    assertEquals(builder.build(query), expectedVal);
                });
            });
            
            it('should fail if no time fields are set', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder.resolve(ResolverStyle.SMART);
                expect(() => {
                    builder.build(LocalTime.FROM);
                }).to.throw(DateTimeException);
            });
            
            it('should fail if no MINUTE_OF_HOUR is not set', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 1);
                builder._addFieldValue(ChronoField.SECOND_OF_MINUTE, 1);
                builder._addFieldValue(ChronoField.NANO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                expect(() => {
                    builder.build(LocalTime.FROM);
                }).to.throw(DateTimeException);
            });
            
            it('should fail if no SECOND_OF_MINUTE is not set', () => {
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(ChronoField.HOUR_OF_DAY, 1);
                builder._addFieldValue(ChronoField.MINUTE_OF_HOUR, 1);
                builder._addFieldValue(ChronoField.NANO_OF_SECOND, 1);
                builder.resolve(ResolverStyle.SMART);
                expect(() => {
                    builder.build(LocalTime.FROM);
                }).to.throw(DateTimeException);
            });
        });
        
        describe('ResolverStyle.LENIENT', () => {
            // LENIENT allows some values to be out of range that SMART does not allow
            const data_times = [
                [ChronoField.HOUR_OF_DAY, 25, ChronoField.MINUTE_OF_HOUR, 1, ChronoField.SECOND_OF_MINUTE, 1, ChronoField.NANO_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(1, 1, 1, 1)],
                [ChronoField.HOUR_OF_DAY, 0, ChronoField.MINUTE_OF_HOUR, 61, ChronoField.SECOND_OF_MINUTE, 1, ChronoField.NANO_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(1, 1, 1, 1)],
                [ChronoField.HOUR_OF_DAY, 1, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 61, ChronoField.NANO_OF_SECOND, 1, LocalTime.FROM, LocalTime.of(1, 1, 1, 1)],
                [ChronoField.HOUR_OF_DAY, 1, ChronoField.MINUTE_OF_HOUR, 0, ChronoField.SECOND_OF_MINUTE, 61, null, null, LocalTime.FROM, LocalTime.of(1, 1, 1, 0)],
                [ChronoField.HOUR_OF_DAY, 0, ChronoField.MINUTE_OF_HOUR, 61, null, null, null, null, LocalTime.FROM, LocalTime.of(1, 1, 0, 0)],
                [ChronoField.HOUR_OF_DAY, 25, null, null, null, null, null, null, LocalTime.FROM, LocalTime.of(1, 0, 0, 0)],
            ];
            
            it('should resolve times', () => {
                dataProviderTest(data_times, (field1, value1, field2, value2, field3, value3, field4, value4, query, expectedVal) => {
                    
                    const builder = new DateTimeBuilder();
                    builder._addFieldValue(field1, value1);
                    builder.chrono = IsoChronology.INSTANCE;
                    if (field2 != null) {
                        builder._addFieldValue(field2, value2);
                    }
                    if (field3 != null) {
                        builder._addFieldValue(field3, value3);
                    }
                    if (field4 != null) {
                        builder._addFieldValue(field4, value4);
                    }
                    builder.resolve(ResolverStyle.LENIENT, null);
                    assertEquals(builder.build(query), expectedVal);
                });
            });
        });
        
    });
});