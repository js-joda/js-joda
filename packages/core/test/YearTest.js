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
import {Period} from '../src/Period';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalQuery} from '../src/temporal/TemporalQuery';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {ValueRange} from '../src/temporal/ValueRange';
import {Year} from '../src/Year';

/* these are not covered by the threetenbp ported tests */
describe('js-joda Year', () => {
    const testYear = new Year(2016);
    
    describe('from', () => {
        
        it('should return the same Year it has been called with', () => {
            const newYear = Year.from(testYear);
            expect(newYear).to.equal(testYear);
        });
        
    });
    
    describe('isSupported', () => {
        
        it('should return true for supported ChronoUnits', () => {
            expect(testYear.isSupported(ChronoUnit.YEARS)).to.be.true;
            expect(testYear.isSupported(ChronoUnit.DECADES)).to.be.true;
            expect(testYear.isSupported(ChronoUnit.CENTURIES)).to.be.true;
            expect(testYear.isSupported(ChronoUnit.MILLENNIA)).to.be.true;
            expect(testYear.isSupported(ChronoUnit.ERAS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            expect(testYear.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(testYear.isSupported(ChronoUnit.DAY_OF_YEAR)).to.be.false;
            expect(testYear.isSupported(ChronoUnit.MONTHS)).to.be.false;
            expect(testYear.isSupported(null)).to.be.false;
        });
        
        it('should return false for unsupported ChronoFields', () => {
            expect(testYear.isSupported(ChronoField.HOUR_OF_DAY)).to.be.false;
            expect(testYear.isSupported(ChronoField.DAY_OF_YEAR)).to.be.false;
            expect(testYear.isSupported(ChronoField.MONTH_OF_YEAR)).to.be.false;
            expect(testYear.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(testYear.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(testYear.isSupported(field)).to.be.true;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalUnits', () => {
            let unit = new TemporalUnit();
            unit.isSupportedBy = () => {
                return false;
            };
            expect(testYear.isSupported(unit)).to.be.false;
            unit = new TemporalField();
            unit.isSupportedBy = () => {
                return true;
            };
            expect(testYear.isSupported(unit)).to.be.true;
        });
        
    });
    
    describe('range', () => {
        
        it('should return the range of YEAR_OF_ERA', () => {
            assertEquals(testYear.range(ChronoField.YEAR_OF_ERA), ChronoField.YEAR_OF_ERA.range());
        });
        
        it('should return corresponding value of rangeRefindeBy for TemporalField', () => {
            const field = new TemporalField();
            field.rangeRefinedBy = () => {
                return 'Test Value';
            };
            field.isSupportedBy = () => {
                return false;
            };
            expect(testYear.range(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                testYear.range(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('get', () => {
        it('should return corresponding value of getFrom for TemporalField', () => {
            const field = new TemporalField();
            field.rangeRefinedBy = () => {
                return ValueRange.of(1234, 1234);
            };
            field.isSupportedBy = () => {
                return false;
            };
            field.getFrom = () => {
                return 1234;
            };
            expect(testYear.get(field)).to.eql(1234);
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                testYear.get(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('with(Year)', () => {
        it('should set the given value', () => {
            expect(testYear.with(Year.of(2015)).value()).to.eql(2015);
            expect(testYear.with(Year.of(0)).value()).to.eql(0);
        });
        
        it('should fail if year is null', () => {
            expect(() => {
                testYear.with(null);
            }).to.throw(NullPointerException);
        });
    });
    
    describe('with(TemporalField, value)', () => {
        it('should set the given values', () => {
            const test = Year.of(2015, 12);
            const testBeforeEra = Year.of(-1, 12);
            expect(test.with(ChronoField.YEAR, 2016)).to.eql(Year.of(2016, 12));
            expect(test.with(ChronoField.YEAR_OF_ERA, 2016)).to.eql(Year.of(2016, 12));
            expect(testBeforeEra.with(ChronoField.YEAR_OF_ERA, 2016)).to.eql(Year.of(-2015, 12));
            expect(test.with(ChronoField.ERA, 0)).to.eql(Year.of(-2014, 12));
            expect(test.with(ChronoField.ERA, 1)).to.eql(Year.of(2015, 12));
        });
        
        it('should return corresponding value of adjustInto for TemporalField', () => {
            const field = new TemporalField();
            field.adjustInto = () => {
                return 'Test Value';
            };
            expect(testYear.with(field, 1)).to.eql('Test Value');
        });
        
        it('should fail if field is null', () => {
            expect(() => {
                testYear.with(null, 1);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoField', () => {
            expect(() => {
                testYear.with(ChronoField.HOUR_OF_DAY, 1);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
        it('should fail if field is not a TemporalField', () => {
            expect(() => {
                testYear.with({}, 1);
            }).to.throw(IllegalArgumentException);
        });
        
    });
    
    describe('plus', () => {
        it('should add the given values', () => {
            // plus(TemporalAmount)
            assertEquals(testYear.plus(Period.ofYears(1)), Year.of(2017));
            assertEquals(testYear.plus(1, ChronoUnit.YEARS), Year.of(2017));
            assertEquals(testYear.plus(1, ChronoUnit.DECADES), Year.of(2026));
            assertEquals(testYear.plus(1, ChronoUnit.CENTURIES), Year.of(2116));
            assertEquals(testYear.plus(1, ChronoUnit.MILLENNIA), Year.of(3016));
            assertEquals(testYear.plus(0, ChronoUnit.ERAS), Year.of(2016));
        });
        
        it('should return corresponding value of addTo for TemporalUnit', () => {
            const unit = new TemporalUnit();
            unit.addTo = () => {
                return 'Test Value';
            };
            expect(testYear.plus(1, unit)).to.eql('Test Value');
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testYear.plus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testYear.plus(1, null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail for unsupported ChronoUnit', () => {
            expect(() => {
                testYear.plus(1, ChronoUnit.SECONDS);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });
    
    describe('minus', () => {
        it('should subtract the given values', () => {
            // minus(TemporalAmount)
            assertEquals(testYear.minus(Period.ofYears(1)), Year.of(2015));
            assertEquals(testYear.minus(1, ChronoUnit.YEARS), Year.of(2015));
            assertEquals(testYear.minus(1, ChronoUnit.DECADES), Year.of(2006));
            assertEquals(testYear.minus(1, ChronoUnit.CENTURIES), Year.of(1916));
            assertEquals(testYear.minus(1, ChronoUnit.MILLENNIA), Year.of(1016));
            assertEquals(testYear.minus(1, ChronoUnit.ERAS), Year.of(-2015));
        });
        
        it('should fail if first argument is null', () => {
            expect(() => {
                testYear.minus(null);
            }).to.throw(NullPointerException);
        });
        
        it('should fail if second argument is null', () => {
            expect(() => {
                testYear.minus(1, null);
            }).to.throw(NullPointerException);
        });
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testYear.query(query)).to.eql('Test Value');
        });
    });
    
    
});
