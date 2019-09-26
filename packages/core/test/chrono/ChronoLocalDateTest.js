/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../testUtils';

import '../_init';

import {ChronoLocalDate} from '../../src/chrono/ChronoLocalDate';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {LocalDate} from '../../src/LocalDate';
import {TemporalAdjuster} from '../../src/temporal/TemporalAdjuster';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {TemporalQuery} from '../../src/temporal/TemporalQuery';

/* these are not covered by the threetenbp ported tests */
describe('js-joda ChronoLocalDate', () => {
    const testDate = new LocalDate(2016, 1, 1); // LocalDate extends ChronoLocalDate
    
    describe('isSupported', () => {
        
        it('should return true for supported ChronoUnits', () => {
            expect(testDate.isSupported(ChronoUnit.DAYS)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.WEEKS)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.MONTHS)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.YEARS)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.DECADES)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.CENTURIES)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.MILLENNIA)).to.be.true;
            expect(testDate.isSupported(ChronoUnit.ERAS)).to.be.true;
        });
        
        it('should return false for unsupported ChronoUnits', () => {
            expect(testDate.isSupported(ChronoUnit.NANOS)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.MICROS)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.MILLIS)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.SECONDS)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.MINUTES)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.HOURS)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.HOUR_OF_DAY)).to.be.false;
            expect(testDate.isSupported(ChronoUnit.HALF_DAYS)).to.be.false;
            expect(testDate.isSupported(null)).to.be.false;
        });
        
    });
    
    describe('query', () => {
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testDate.query(query)).to.eql('Test Value');
        });

        it('should return corresponding value of when queried with TemporalQueries.localDate()', () => {
            const query = TemporalQueries.localDate();
            // LocalDate handles TemporalQueries.localDate() itself, so we need to "construct"
            // a ChronoLocalDate here, that provides the needed function :/
            const testChronoDate = new ChronoLocalDate();
            testChronoDate.toEpochDay = () => {
                return testDate.toEpochDay();
            };
            assertEquals(testChronoDate.query(query), testDate);
        });
    });
    
    describe('adjustInto', () => {
        it('should return corresponding value of with for TemporalAdjuster', () => {
            const adjuster = new TemporalAdjuster();
            adjuster.with = () => {
                return 'Test Value';
            };
            expect(testDate.adjustInto(adjuster)).to.eql('Test Value');
        });
    });
    
});