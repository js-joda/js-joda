/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals} from './testUtils';

import './_init';

import {ChronoField} from '../src/temporal/ChronoField';
import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {IllegalArgumentException, NullPointerException, UnsupportedTemporalTypeException} from '../src/errors';
import {LocalDate} from '../src/LocalDate';
import {Period} from '../src/Period';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalQuery} from '../src/temporal/TemporalQuery';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {YearMonth} from '../src/YearMonth';

/* these are not covered by the threetenbp ported tests */
describe('js-joda YearMonth', () => {
    describe('from', () => {
        
        it('should return the same YearMonth it has been called with', () => {
            const yearMonth = new YearMonth(2016, 1);
            const newYearMonth = YearMonth.from(yearMonth);
            expect(newYearMonth).to.equal(yearMonth);
        });
        
    });
    
    describe('isSupported', () => {
        
        it('should return true for supported ChronoUnits', () => {
            const yearMonth = new YearMonth(2016, 1);
            expect(yearMonth.isSupported(ChronoUnit.MONTHS)).to.be.true;
            expect(yearMonth.isSupported(ChronoUnit.YEARS)).to.be.true;
            expect(yearMonth.isSupported(ChronoUnit.DECADES)).to.be.true;
            expect(yearMonth.isSupported(ChronoUnit.CENTURIES)).to.be.true;
            expect(yearMonth.isSupported(ChronoUnit.MILLENNIA)).to.be.true;
            expect(yearMonth.isSupported(ChronoUnit.ERAS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            const yearMonth = new YearMonth(2016, 1);
            expect(yearMonth.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(yearMonth.isSupported(ChronoUnit.DAY_OF_YEAR)).to.be.false;
            expect(yearMonth.isSupported(null)).to.be.false;
        });
        
        it('should return false for unsupported ChronoFields', () => {
            const yearMonth = new YearMonth(2016, 1);
            expect(yearMonth.isSupported(ChronoField.HOUR_OF_DAY)).to.be.false;
            expect(yearMonth.isSupported(ChronoField.DAY_OF_YEAR)).to.be.false;
            expect(yearMonth.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            const yearMonth = new YearMonth(2016, 1);
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(yearMonth.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(yearMonth.isSupported(field)).to.be.true;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalUnits', () => {
            const yearMonth = new YearMonth(2016, 1);
            let unit = new TemporalUnit();
            unit.isSupportedBy = () => {
                return false;
            };
            expect(yearMonth.isSupported(unit)).to.be.false;
            unit = new TemporalField();
            unit.isSupportedBy = () => {
                return true;
            };
            expect(yearMonth.isSupported(unit)).to.be.true;
        });
        
    });

    describe('with(TemporalField, value)', () => {
        it('should set the given values', () => {
            const test = YearMonth.of(2015, 12);
            const testBeforeEra = YearMonth.of(-1, 12);
            expect(test.with(ChronoField.YEAR, 2016)).to.eql(YearMonth.of(2016, 12));
            expect(test.with(ChronoField.MONTH_OF_YEAR, 1)).to.eql(YearMonth.of(2015, 1));
            expect(test.with(ChronoField.PROLEPTIC_MONTH, 0)).to.eql(YearMonth.of(0, 1));
            expect(test.with(ChronoField.YEAR_OF_ERA, 2016)).to.eql(YearMonth.of(2016, 12));
            expect(testBeforeEra.with(ChronoField.YEAR_OF_ERA, 2016)).to.eql(YearMonth.of(-2015, 12));
            expect(test.with(ChronoField.ERA, 0)).to.eql(YearMonth.of(-2014, 12));
            expect(test.with(ChronoField.ERA, 1)).to.eql(YearMonth.of(2015, 12));
        });
        
        it('should return corresponding value of adjustInto for TemporalField', () => {
            const yearMonth = new YearMonth(2016, 1);
            const field = new TemporalField();
            field.adjustInto = () => {
                return 'Test Value';
            };
            expect(yearMonth.with(field, 1)).to.eql('Test Value');
        });
        
        it('should fail if field is null', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.with(null, 1);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoField', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.with(ChronoField.HOUR_OF_DAY, 1);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
        it('should fail if field is not a TemporalField', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.with({}, 1);
            }).to.throw(IllegalArgumentException);
        });
        
    });
    
    describe('plus', () => {
        it('should add the given values', () => {
            const test = YearMonth.of(2015, 12);
            // plus(TemporalAmount)
            assertEquals(test.plus(Period.ofMonths(1)), YearMonth.of(2016, 1));
            assertEquals(test.plus(1, ChronoUnit.YEARS), YearMonth.of(2016, 12));
            assertEquals(test.plus(1, ChronoUnit.MONTHS), YearMonth.of(2016, 1));
            assertEquals(test.plus(1, ChronoUnit.DECADES), YearMonth.of(2025, 12));
            assertEquals(test.plus(1, ChronoUnit.CENTURIES), YearMonth.of(2115, 12));
            assertEquals(test.plus(1, ChronoUnit.MILLENNIA), YearMonth.of(3015, 12));
            assertEquals(test.plus(0, ChronoUnit.ERAS), YearMonth.of(2015, 12));
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const yearMonth = new YearMonth(2016, 1);
            const unit = new TemporalUnit();
            unit.addTo = () => {
                return 'Test Value';
            };
            expect(yearMonth.plus(1, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.plus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.plus(1, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.plus(1, ChronoUnit.SECONDS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('minus', () => {
        it('should subtract the given values', () => {
            const test = YearMonth.of(2015, 12);
            // minus(TemporalAmount)
            assertEquals(test.minus(Period.ofMonths(1)), YearMonth.of(2015, 11));
            assertEquals(test.minus(1, ChronoUnit.YEARS), YearMonth.of(2014, 12));
            assertEquals(test.minus(1, ChronoUnit.MONTHS), YearMonth.of(2015, 11));
            assertEquals(test.minus(1, ChronoUnit.DECADES), YearMonth.of(2005, 12));
            assertEquals(test.minus(1, ChronoUnit.CENTURIES), YearMonth.of(1915, 12));
            assertEquals(test.minus(1, ChronoUnit.MILLENNIA), YearMonth.of(1015, 12));
            assertEquals(test.minus(1, ChronoUnit.ERAS), YearMonth.of(-2014, 12));
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.minus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2016, 1);
                test.minus(1, null);
            }).to.throw(NullPointerException);
        });
    });
    
    describe('until', () => {
        it('should return result for the given values', () => {
            const test = YearMonth.of(2015, 12);
            const end = YearMonth.of(2016, 12);
            assertEquals(test.until(end, ChronoUnit.YEARS), 1);
            assertEquals(test.until(end, ChronoUnit.MONTHS), 12);
            assertEquals(test.until(end, ChronoUnit.DECADES), 0.1);
            assertEquals(test.until(end, ChronoUnit.CENTURIES), 0.01);
            assertEquals(test.until(end, ChronoUnit.MILLENNIA), 0.001);
            assertEquals(test.until(end, ChronoUnit.ERAS), 0);
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const test = YearMonth.of(2015, 12);
            const end = YearMonth.of(2016, 12);
            const unit = new TemporalUnit();
            unit.between = () => {
                return 'Test Value';
            };
            expect(test.until(end, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2015, 12);
                test.until(null, ChronoUnit.YEARS);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                const test = YearMonth.of(2015, 12);
                const end = YearMonth.of(2016, 12);
                test.until(end, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                const test = YearMonth.of(2015, 12);
                const end = YearMonth.of(2016, 12);
                test.until(end, ChronoUnit.SECONDS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('atEndOfMonth', () => {
        it('should return end of month', () => {
            assertEquals(YearMonth.of(2016, 1).atEndOfMonth(), LocalDate.of(2016, 1, 31));
            assertEquals(YearMonth.of(2016, 2).atEndOfMonth(), LocalDate.of(2016, 2, 29));
            assertEquals(YearMonth.of(2016, 3).atEndOfMonth(), LocalDate.of(2016, 3, 31));
            assertEquals(YearMonth.of(2016, 4).atEndOfMonth(), LocalDate.of(2016, 4, 30));
            assertEquals(YearMonth.of(2016, 5).atEndOfMonth(), LocalDate.of(2016, 5, 31));
            assertEquals(YearMonth.of(2016, 6).atEndOfMonth(), LocalDate.of(2016, 6, 30));
            assertEquals(YearMonth.of(2016, 7).atEndOfMonth(), LocalDate.of(2016, 7, 31));
            assertEquals(YearMonth.of(2016, 8).atEndOfMonth(), LocalDate.of(2016, 8, 31));
            assertEquals(YearMonth.of(2016, 9).atEndOfMonth(), LocalDate.of(2016, 9, 30));
            assertEquals(YearMonth.of(2016, 10).atEndOfMonth(), LocalDate.of(2016, 10, 31));
            assertEquals(YearMonth.of(2016, 11).atEndOfMonth(), LocalDate.of(2016, 11, 30));
            assertEquals(YearMonth.of(2016, 12).atEndOfMonth(), LocalDate.of(2016, 12, 31));
        });
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const test = YearMonth.of(2015, 12);
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(test.query(query)).to.eql('Test Value');
        });
    });
    
});
