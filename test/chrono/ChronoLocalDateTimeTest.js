/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../testUtils';

import '../_init';

import {ChronoLocalDateTime} from '../../src/chrono/ChronoLocalDateTime';
import {LocalDateTime} from '../../src/LocalDateTime';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {TemporalQuery} from '../../src/temporal/TemporalQuery';

/* these are not covered by the threetenbp ported tests */
describe('js-joda ChronoLocalDateTime', () => {
    const testDateTime = LocalDateTime.of(2016, 1, 1, 0, 0, 0); // LocalDateTime extends ChronoLocalDateTime
    
    describe('query', () => {
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            const query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(testDateTime.query(query)).to.eql('Test Value');
        });

        it('should return corresponding value of when queried with TemporalQueries.localDate()', () => {
            const query = TemporalQueries.localDate();
            // LocalDateTime handles TemporalQueries.localDate() itself, so we need to "construct"
            // a ChronoLocalDateTime here, that provides the needed function :/
            const testChronoDateTime = new ChronoLocalDateTime();
            testChronoDateTime.toLocalDate = () => {
                return testDateTime.toLocalDate();
            };
            assertEquals(testChronoDateTime.query(query), testDateTime.toLocalDate());
        });
    });
    
});