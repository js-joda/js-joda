/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals, assertTrue, dataProviderTest} from '../../testUtils';

import '../../_init';

import {ZoneOffset} from '../../../src/ZoneOffset';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {TemporalQueries} from '../../../src/temporal/TemporalQueries';
import {IsoChronology} from '../../../src/chrono/IsoChronology';


const OffsetIdPrinterParser = DateTimeFormatterBuilder.OffsetIdPrinterParser;

describe('org.threeten.bp.format.TestZoneOffsetParser', ()=>{
    let parseContext;

    beforeEach(() => {
        init();
    });

    function init(){
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    }

    // @DataProvider(name='error')
    function data_error() {
        return [
            [new OffsetIdPrinterParser('Z', '+HH:MM:ss'), 'hello', -1],
            [new OffsetIdPrinterParser('Z', '+HH:MM:ss'), 'hello', 6]
        ];
    }

    //@Test(dataProvider='error')
    it('test_parse_error', function () {
        dataProviderTest(data_error, (pp, text, pos) => {
            // fix me, parse should fail here
            assertTrue(pp.parse(parseContext, text, pos) <= 0);
            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        });
    });

    //-----------------------------------------------------------------------
    it('test_parse_exactMatch_UTC', () => {
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'Z', 0);
        assertEquals(result, 1);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_startStringMatch_UTC', () => {
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'ZOTHER', 0);
        assertEquals(result, 1);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_midStringMatch_UTC', () => {
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'OTHERZOTHER', 5);
        assertEquals(result, 6);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_endStringMatch_UTC', () => {
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'OTHERZ', 5);
        assertEquals(result, 6);
        assertParsed(ZoneOffset.UTC);
    });

    //-----------------------------------------------------------------------
    it('test_parse_exactMatch_UTC_EmptyUTC', () => {
        const pp = new OffsetIdPrinterParser('', '+HH:MM:ss');
        const result = pp.parse(parseContext, '', 0);
        assertEquals(result, 0);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_startStringMatch_UTC_EmptyUTC', () => {
        const pp = new OffsetIdPrinterParser('', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'OTHER', 0);
        assertEquals(result, 0);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_midStringMatch_UTC_EmptyUTC', () => {
        const pp = new OffsetIdPrinterParser('', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'OTHEROTHER', 5);
        assertEquals(result, 5);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_endStringMatch_UTC_EmptyUTC', () => {
        const pp = new OffsetIdPrinterParser('', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'OTHER', 5);
        assertEquals(result, 5);
        assertParsed(ZoneOffset.UTC);
    });

    // @DataProvider(name='offsets')
    function provider_offsets() {
        return [
            ['+HH', '+00', ZoneOffset.UTC],
            ['+HH', '-00', ZoneOffset.UTC],
            ['+HH', '+01', ZoneOffset.ofHours(1)],
            ['+HH', '-01', ZoneOffset.ofHours(-1)],

            ['+HHMM', '+0000', ZoneOffset.UTC],
            ['+HHMM', '-0000', ZoneOffset.UTC],
            ['+HHMM', '+0102', ZoneOffset.ofHoursMinutes(1, 2)],
            ['+HHMM', '-0102', ZoneOffset.ofHoursMinutes(-1, -2)],

            ['+HH:MM', '+00:00', ZoneOffset.UTC],
            ['+HH:MM', '-00:00', ZoneOffset.UTC],
            ['+HH:MM', '+01:02', ZoneOffset.ofHoursMinutes(1, 2)],
            ['+HH:MM', '-01:02', ZoneOffset.ofHoursMinutes(-1, -2)],

            ['+HHMMss', '+0000', ZoneOffset.UTC],
            ['+HHMMss', '-0000', ZoneOffset.UTC],
            ['+HHMMss', '+0100', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HHMMss', '+0159', ZoneOffset.ofHoursMinutesSeconds(1, 59, 0)],
            ['+HHMMss', '+0200', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HHMMss', '+1800', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HHMMss', '+010215', ZoneOffset.ofHoursMinutesSeconds(1, 2, 15)],
            ['+HHMMss', '-0100', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HHMMss', '-0200', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HHMMss', '-1800', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HHMMss', '+000000', ZoneOffset.UTC],
            ['+HHMMss', '-000000', ZoneOffset.UTC],
            ['+HHMMss', '+010000', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HHMMss', '+010203', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HHMMss', '+015959', ZoneOffset.ofHoursMinutesSeconds(1, 59, 59)],
            ['+HHMMss', '+020000', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HHMMss', '+180000', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HHMMss', '-010000', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HHMMss', '-020000', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HHMMss', '-180000', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HH:MM:ss', '+00:00', ZoneOffset.UTC],
            ['+HH:MM:ss', '-00:00', ZoneOffset.UTC],
            ['+HH:MM:ss', '+01:00', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HH:MM:ss', '+01:02', ZoneOffset.ofHoursMinutesSeconds(1, 2, 0)],
            ['+HH:MM:ss', '+01:59', ZoneOffset.ofHoursMinutesSeconds(1, 59, 0)],
            ['+HH:MM:ss', '+02:00', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HH:MM:ss', '+18:00', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HH:MM:ss', '+01:02:15', ZoneOffset.ofHoursMinutesSeconds(1, 2, 15)],
            ['+HH:MM:ss', '-01:00', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HH:MM:ss', '-02:00', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HH:MM:ss', '-18:00', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HH:MM:ss', '+00:00:00', ZoneOffset.UTC],
            ['+HH:MM:ss', '-00:00:00', ZoneOffset.UTC],
            ['+HH:MM:ss', '+01:00:00', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HH:MM:ss', '+01:02:03', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HH:MM:ss', '+01:59:59', ZoneOffset.ofHoursMinutesSeconds(1, 59, 59)],
            ['+HH:MM:ss', '+02:00:00', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HH:MM:ss', '+18:00:00', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HH:MM:ss', '-01:00:00', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HH:MM:ss', '-02:00:00', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HH:MM:ss', '-18:00:00', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HHMMSS', '+000000', ZoneOffset.UTC],
            ['+HHMMSS', '-000000', ZoneOffset.UTC],
            ['+HHMMSS', '+010203', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HHMMSS', '-010203', ZoneOffset.ofHoursMinutesSeconds(-1, -2, -3)],

            ['+HH:MM:SS', '+00:00:00', ZoneOffset.UTC],
            ['+HH:MM:SS', '-00:00:00', ZoneOffset.UTC],
            ['+HH:MM:SS', '+01:02:03', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HH:MM:SS', '-01:02:03', ZoneOffset.ofHoursMinutesSeconds(-1, -2, -3)]
        ];
    }

    // @Test(dataProvider='offsets')
    it('test_parse_exactMatch', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, parse, 0);
            assertEquals(result, parse.length);
            assertParsed(expected);
        });
    });

    // @Test(dataProvider='offsets')
    it('test_parse_startStringMatch', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, parse + ':OTHER', 0);
            assertEquals(result, parse.length);
            assertParsed(expected);
        });
    });


    // @Test(dataProvider='offsets')
    it('test_parse_midStringMatch', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, 'OTHER' + parse + ':OTHER', 5);
            assertEquals(result, parse.length + 5);
            assertParsed(expected);
        });
    });

    // @Test(dataProvider='offsets')
    it('test_parse_endStringMatch', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, 'OTHER' + parse, 5);
            assertEquals(result, parse.length + 5);
            assertParsed(expected);
        });
    });


    // @Test(dataProvider='offsets')
    it('test_parse_exactMatch_EmptyUTC', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('', pattern);
            const result = pp.parse(parseContext, parse, 0);
            assertEquals(result, parse.length);
            assertParsed(expected);
        });
    });


    // @Test(dataProvider='offsets')
    it('test_parse_startStringMatch_EmptyUTC', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('', pattern);
            const result = pp.parse(parseContext, parse + ':OTHER', 0);
            assertEquals(result, parse.length);
            assertParsed(expected);
        });
    });


    // @Test(dataProvider='offsets')
    it('test_parse_midStringMatch_EmptyUTC', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('', pattern);
            const result = pp.parse(parseContext, 'OTHER' + parse + ':OTHER', 5);
            assertEquals(result, parse.length + 5);
            assertParsed(expected);
        });
    });


    // @Test(dataProvider='offsets')
    it('test_parse_endStringMatch_EmptyUTC', () => {
        dataProviderTest(provider_offsets, (pattern, parse, expected) => {
            init();
            const pp = new OffsetIdPrinterParser('', pattern);
            const result = pp.parse(parseContext, 'OTHER' + parse, 5);
            assertEquals(result, parse.length + 5);
            assertParsed(expected);
        });
    });

    // @DataProvider(name='bigOffsets')
    function provider_bigOffsets() {
        return [
            ['+HH', '+59', 59 * 3600],
            ['+HH', '-19', -(19 * 3600)],

            ['+HHMM', '+1801', 18 * 3600 + 1 * 60],
            ['+HHMM', '-1801', -(18 * 3600 + 1 * 60)],

            ['+HH:MM', '+18:01', 18 * 3600 + 1 * 60],
            ['+HH:MM', '-18:01', -(18 * 3600 + 1 * 60)],

            ['+HHMMss', '+180103', 18 * 3600 + 1 * 60 + 3],
            ['+HHMMss', '-180103', -(18 * 3600 + 1 * 60 + 3)],

            ['+HH:MM:ss', '+18:01:03', 18 * 3600 + 1 * 60 + 3],
            ['+HH:MM:ss', '-18:01:03', -(18 * 3600 + 1 * 60 + 3)],

            ['+HHMMSS', '+180103', 18 * 3600 + 1 * 60 + 3],
            ['+HHMMSS', '-180103', -(18 * 3600 + 1 * 60 + 3)],

            ['+HH:MM:SS', '+18:01:03', 18 * 3600 + 1 * 60 + 3],
            ['+HH:MM:SS', '-18:01:03', -(18 * 3600 + 1 * 60 + 3)]
        ];
    }

    // @Test(dataProvider='bigOffsets')
    it('test_parse_bigOffsets', function () {
        dataProviderTest(provider_bigOffsets, (pattern, parse, offsetSecs) => {
            init();
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, parse, 0);
            assertEquals(result, parse.length);
            assertEquals(parseContext.getParsed(ChronoField.OFFSET_SECONDS), offsetSecs);
        });
    });

    //@DataProvider(name='badOffsets')
    function provider_badOffsets() {
        return [
            ['+HH', '+1', ~0],
            ['+HH', '-1', ~0],
            ['+HH', '01', ~0],
            ['+HH', '01', ~0],
            ['+HH', '+AA', ~0],

            ['+HHMM', '+1', ~0],
            ['+HHMM', '+01', ~0],
            ['+HHMM', '+001', ~0],
            ['+HHMM', '0102', ~0],
            ['+HHMM', '+01:02', ~0],
            ['+HHMM', '+AAAA', ~0],

            ['+HH:MM', '+1', ~0],
            ['+HH:MM', '+01', ~0],
            ['+HH:MM', '+0:01', ~0],
            ['+HH:MM', '+00:1', ~0],
            ['+HH:MM', '+0:1', ~0],
            ['+HH:MM', '+:', ~0],
            ['+HH:MM', '01:02', ~0],
            ['+HH:MM', '+0102', ~0],
            ['+HH:MM', '+AA:AA', ~0],

            ['+HHMMss', '+1', ~0],
            ['+HHMMss', '+01', ~0],
            ['+HHMMss', '+001', ~0],
            ['+HHMMss', '0102', ~0],
            ['+HHMMss', '+01:02', ~0],
            ['+HHMMss', '+AAAA', ~0],

            ['+HH:MM:ss', '+1', ~0],
            ['+HH:MM:ss', '+01', ~0],
            ['+HH:MM:ss', '+0:01', ~0],
            ['+HH:MM:ss', '+00:1', ~0],
            ['+HH:MM:ss', '+0:1', ~0],
            ['+HH:MM:ss', '+:', ~0],
            ['+HH:MM:ss', '01:02', ~0],
            ['+HH:MM:ss', '+0102', ~0],
            ['+HH:MM:ss', '+AA:AA', ~0],

            ['+HHMMSS', '+1', ~0],
            ['+HHMMSS', '+01', ~0],
            ['+HHMMSS', '+001', ~0],
            ['+HHMMSS', '0102', ~0],
            ['+HHMMSS', '+01:02', ~0],
            ['+HHMMSS', '+AAAA', ~0],

            ['+HH:MM:SS', '+1', ~0],
            ['+HH:MM:SS', '+01', ~0],
            ['+HH:MM:SS', '+0:01', ~0],
            ['+HH:MM:SS', '+00:1', ~0],
            ['+HH:MM:SS', '+0:1', ~0],
            ['+HH:MM:SS', '+:', ~0],
            ['+HH:MM:SS', '01:02', ~0],
            ['+HH:MM:SS', '+0102', ~0],
            ['+HH:MM:SS', '+AA:AA', ~0]
        ];
    }

    // @Test(dataProvider='badOffsets')
    it('test_parse_invalid', function () {
        dataProviderTest(provider_badOffsets, (pattern, parse, expectedPosition) => {
            const pp = new OffsetIdPrinterParser('Z', pattern);
            const result = pp.parse(parseContext, parse, 0);
            assertEquals(result, expectedPosition);
        });

    });

    it('test_parse_caseSensitiveUTC_matchedCase', () => {
        parseContext.setCaseSensitive(true);
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'Z', 0);
        assertEquals(result, 1);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_caseSensitiveUTC_unmatchedCase', () => {
        parseContext.setCaseSensitive(true);
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'z', 0);
        assertEquals(result, ~0);
        assertParsed(null);
    });

    it('test_parse_caseInsensitiveUTC_matchedCase', () => {
        parseContext.setCaseSensitive(false);
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'Z', 0);
        assertEquals(result, 1);
        assertParsed(ZoneOffset.UTC);
    });

    it('test_parse_caseInsensitiveUTC_unmatchedCase', () => {
        parseContext.setCaseSensitive(false);
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        const result = pp.parse(parseContext, 'z', 0);
        assertEquals(result, 1);
        assertParsed(ZoneOffset.UTC);
    });

    function assertParsed(expectedOffset) {
        assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
        assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        if (expectedOffset == null) {
            assertEquals(parseContext.getParsed(ChronoField.OFFSET_SECONDS), null);
        } else {
            assertEquals(parseContext.getParsed(ChronoField.OFFSET_SECONDS), expectedOffset.totalSeconds());
        }
    }

});







