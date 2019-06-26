/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../testUtils';

import '../_init';

import {ChronoZonedDateTime} from '../../src/chrono/ChronoZonedDateTime';
import {ZonedDateTime} from '../../src/ZonedDateTime';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {TemporalQuery} from '../../src/temporal/TemporalQuery';
import {ZoneOffset} from '../../src/ZoneOffset';

/* these are not covered by the threetenbp ported tests */
describe('js-joda ChronoZonedDateTime', () => {
    const testZonedDateTime = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneOffset.ofHours(2)); // ZonedDateTime extends ChronoZonedDateTime
    
    describe('query', () => {
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testZonedDateTime.query(query)).to.eql('Test Value');
        });
        
        it('should return corresponding value when queried with TemporalQueries.localDate()', () => {
            const query = TemporalQueries.localDate();
            // ZonedDateTime handles TemporalQueries.localDate() itself, so we need to "construct"
            // a ChronoZonedDateTime here, that provides the needed function :/
            const testChronoDateTime = new ChronoZonedDateTime();
            testChronoDateTime.toLocalDate = () => {
                return testZonedDateTime.toLocalDate();
            };
            assertEquals(testChronoDateTime.query(query), testZonedDateTime.toLocalDate());
        });
    });
    
    describe('equals', () => {
        const testChronoZonedDateTime = new ChronoZonedDateTime();
        
        it('should return true for the same object', () => {
            expect(testChronoZonedDateTime.equals(testChronoZonedDateTime)).to.eql(true);
        });
        
        it('should return true for another object when compareTo returns 0', () => {
            const otherChronoZonedDateTime = new ChronoZonedDateTime();
            otherChronoZonedDateTime.compareTo = () => {
                return 0;
            };
            expect(otherChronoZonedDateTime.equals(testChronoZonedDateTime)).to.eql(true);
        });
        
        it('should return false for another object when compareTo does not return 0', () => {
            const otherChronoZonedDateTime = new ChronoZonedDateTime();
            otherChronoZonedDateTime.compareTo = () => {
                return 1;
            };
            expect(otherChronoZonedDateTime.equals(testChronoZonedDateTime)).to.eql(false);
        });
        
        it('should return false for the other objects and null', () => {
            expect(testChronoZonedDateTime.equals(null)).to.eql(false);
            expect(testChronoZonedDateTime.equals('test')).to.eql(false);
        });
    });
    
    describe('compareTo/strcmp', () => {
        let testChronoZonedDateTime = null;
        
        beforeEach('testChronoZonedDateTime', () => {
            testChronoZonedDateTime = new ChronoZonedDateTime();
            // return values needed for compareTo from testZonedDateTime
            testChronoZonedDateTime.toEpochSecond = () => {
                return testZonedDateTime.toEpochSecond();
            };
            testChronoZonedDateTime.toLocalTime = () => {
                return testZonedDateTime.toLocalTime();
            };
            testChronoZonedDateTime.toLocalDateTime = () => {
                return testZonedDateTime.toLocalDateTime();
            };
        });
        
        it('should return 0 for the same zone', () => {
            testChronoZonedDateTime.zone = () => {
                return testZonedDateTime.zone();
            };
            assertEquals(testChronoZonedDateTime.compareTo(testZonedDateTime), 0);
        });
        
        it('should return 1 when zone.id() is larger', () => {
            testChronoZonedDateTime.zone = () => {
                return ZoneOffset.ofHours(3);
            };
            assertEquals(testChronoZonedDateTime.compareTo(testZonedDateTime), 1);
        });
        
        it('should return -1 when zone.id() is smaller', () => {
            testChronoZonedDateTime.zone = () => {
                return ZoneOffset.ofHours(1);
            };
            assertEquals(testChronoZonedDateTime.compareTo(testZonedDateTime), -1);
        });
        
    });
    
});