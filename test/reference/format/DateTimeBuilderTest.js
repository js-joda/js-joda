/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {assertEquals, dataProviderTest} from '../../testUtils';

import '../../_init';

import {ChronoField} from '../../../src/temporal/ChronoField';
import {DateTimeBuilder} from '../../../src/format/DateTimeBuilder';
import {DateTimeFormatter} from '../../../src/format/DateTimeFormatter';
import {IsoChronology} from '../../../src/chrono/IsoChronology';
import {Instant} from '../../../src/Instant';
import {LocalDate} from '../../../src/LocalDate';
import {ResolverStyle} from '../../../src/format/ResolverStyle';
import {ZonedDateTime} from '../../../src/ZonedDateTime';

describe('org.threeten.bp.format.TestDateTimeBuilderCombinations', () => {
    
    const data_combine = [
        [ChronoField.YEAR, 2012, ChronoField.MONTH_OF_YEAR, 6, ChronoField.DAY_OF_MONTH, 3, null, null, LocalDate.FROM, LocalDate.of(2012, 6, 3)],
        [ChronoField.PROLEPTIC_MONTH, 2012 * 12 + 6 - 1, ChronoField.DAY_OF_MONTH, 3, null, null, null, null, LocalDate.FROM, LocalDate.of(2012, 6, 3)],
        [ChronoField.YEAR, 2012, ChronoField.ALIGNED_WEEK_OF_YEAR, 6, ChronoField.DAY_OF_WEEK, 3, null, null, LocalDate.FROM, LocalDate.of(2012, 2, 8)],
        [ChronoField.YEAR, 2012, ChronoField.DAY_OF_YEAR, 155, null, null, null, null, LocalDate.FROM, LocalDate.of(2012, 6, 3)],
        // these were also commented out in threetenbp test?
        // [ChronoField.ERA, 1, ChronoField.YEAR_OF_ERA, 2012, ChronoField.DAY_OF_YEAR, 155, null, null, LocalDate.FROM, LocalDate.of(2012, 6, 3)],
        // [ChronoField.YEAR, 2012, ChronoField.MONTH_OF_YEAR, 6, null, null, null, null, LocalDate.FROM, null],
        [ChronoField.EPOCH_DAY, 12, null, null, null, null, null, null, LocalDate.FROM, LocalDate.of(1970, 1, 13)]
    ];
    
    it('test_derive', () => {
        dataProviderTest(data_combine, (field1, value1, field2, value2, field3, value3, field4, value4, query, expectedVal) => {
            
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
    
    //-----------------------------------------------------------------------
    const data_normalized = [
        [ChronoField.YEAR, 2127, null, null, null, null, ChronoField.YEAR, 2127],
        [ChronoField.MONTH_OF_YEAR, 12, null, null, null, null, ChronoField.MONTH_OF_YEAR, 12],
        [ChronoField.DAY_OF_YEAR, 127, null, null, null, null, ChronoField.DAY_OF_YEAR, 127],
        [ChronoField.DAY_OF_MONTH, 23, null, null, null, null, ChronoField.DAY_OF_MONTH, 23],
        [ChronoField.DAY_OF_WEEK, 127, null, null, null, null, ChronoField.DAY_OF_WEEK, 127],
        [ChronoField.ALIGNED_WEEK_OF_YEAR, 23, null, null, null, null, ChronoField.ALIGNED_WEEK_OF_YEAR, 23],
        [ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR, 4, null, null, null, null, ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR, 4],
        [ChronoField.ALIGNED_WEEK_OF_MONTH, 4, null, null, null, null, ChronoField.ALIGNED_WEEK_OF_MONTH, 4],
        [ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH, 3, null, null, null, null, ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH, 3],
        [ChronoField.PROLEPTIC_MONTH, 15, null, null, null, null, ChronoField.PROLEPTIC_MONTH, null],
        [ChronoField.PROLEPTIC_MONTH, 1971 * 12 + 4 - 1, null, null, null, null, ChronoField.YEAR, 1971],
        [ChronoField.PROLEPTIC_MONTH, 1971 * 12 + 4 - 1, null, null, null, null, ChronoField.MONTH_OF_YEAR, 4]
    ];
    
    it('test_normalized', () => {
        dataProviderTest(data_normalized, (field1, value1, field2, value2, field3, value3, query, expectedVal) => {
            const builder = new DateTimeBuilder();
            builder._addFieldValue(field1, value1);
            builder.chrono = IsoChronology.INSTANCE;
            if (field2 != null) {
                builder._addFieldValue(field2, value2);
            }
            if (field3 != null) {
                builder._addFieldValue(field3, value3);
            }
            builder.resolve(ResolverStyle.SMART, null);
            if (expectedVal != null) {
                assertEquals(builder.getLong(query), expectedVal);
            } else {
                assertEquals(builder.isSupported(query), false);
            }
        });
    });
    
    // TODO: are these actual DateTimeBuilder Tests or rather DateTimeFormatter Tests?? they use ZoneId :/
    const PARIS = undefined;//ZoneId.of('Europe/Paris');

    it.skip('test_parse_ZDT_withZone', () => {
        const fmt = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss').withZone(PARIS);
        const acc = fmt.parse('2014-06-30 01:02:03');
        assertEquals(ZonedDateTime.from(acc), ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, PARIS));
    });

    it.skip('test_parse_Instant_withZone', () => {
        const fmt = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss').withZone(PARIS);
        const acc = fmt.parse('2014-06-30 01:02:03');
        assertEquals(Instant.from(acc), ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, PARIS).toInstant());
    });
    
});