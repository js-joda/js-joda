/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals, dataProviderTest} from '../../testUtils';

import '../../_init';

import {LocalDateTime} from '../../../src/LocalDateTime';
import {ZoneId} from '../../../src/ZoneId';
import {ZoneOffset} from '../../../src/ZoneOffset';
import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {ParsePosition} from '../../../src/format/ParsePosition';
import {TemporalQueries} from '../../../src/temporal/TemporalQueries';
import { ZoneRulesProvider } from '../../../src/zone/ZoneRulesProvider';

describe('org.threeten.bp.format.TestZoneIdParser', () => {
    const OFFSET_UTC = ZoneOffset.UTC;
    const OFFSET_P0123 = ZoneOffset.ofHoursMinutes(1, 23);
    const DT_2012_06_30_12_30_40 = LocalDateTime.of(2012, 6, 30, 12, 30, 40);

    let builder = null;
    let pos = null;

    beforeEach(function () {
        init();
    });

    function init(){
        builder = new DateTimeFormatterBuilder();
        pos = new ParsePosition(0);
    }

    describe('print', function () {

        function data_print() {
            return [
                [DT_2012_06_30_12_30_40, OFFSET_UTC, 'Z'],
                [DT_2012_06_30_12_30_40, OFFSET_P0123, '+01:23']
            ];
        }

        it('test_print', function () {
            dataProviderTest(data_print, (ldt, zone, expected) => {
                init();
                const zdt = ldt.atZone(zone);
                builder.appendZoneId();
                const output = builder.toFormatter().format(zdt);
                assertEquals(output, expected);
            });
        });

    });

    describe('parse', function () {

        let getAvailableZoneIdsFn = null;
        let getRulesFn = null;

        before(() => {
            getAvailableZoneIdsFn = ZoneRulesProvider.getAvailableZoneIds;
            getRulesFn = ZoneRulesProvider.getRules;

            ZoneRulesProvider.getAvailableZoneIds = () => {
                return ['America/New_York', 'Europe/London'];
            };

            ZoneRulesProvider.getRules = (zoneId) => {
                switch (zoneId) {
                    case 'America/New_York':
                    case 'Europe/London':
                        return ZoneOffset.ofHours(0).rules();
                    default: return null;
                }

            };
        });

        after(() => {
            ZoneRulesProvider.getAvailableZoneIds = getAvailableZoneIdsFn;
            ZoneRulesProvider.getRules = getRulesFn;
        });

        function data_parseSuccess() {
            return [
                ['Z', 1, -1, ZoneId.of('Z')],
                ['UTC', 3, -1, ZoneId.of('UTC')],
                ['UT', 2, -1, ZoneId.of('UT')],
                ['GMT', 3, -1, ZoneId.of('GMT')],

                ['+00:00', 6, -1, ZoneOffset.UTC],
                ['UTC+00:00', 9, -1, ZoneId.of('UTC')],
                ['UT+00:00', 8, -1, ZoneId.of('UT')],
                ['GMT+00:00', 9, -1, ZoneId.of('GMT')],
                ['-00:00', 6, -1, ZoneOffset.UTC],
                ['UTC-00:00', 9, -1, ZoneId.of('UTC')],
                ['UT-00:00', 8, -1, ZoneId.of('UT')],
                ['GMT-00:00', 9, -1, ZoneId.of('GMT')],

                ['+01:30', 6, -1, ZoneOffset.ofHoursMinutes(1, 30)],
                ['UTC+01:30', 9, -1, ZoneId.of('UTC+01:30')],
                ['UT+02:30', 8, -1, ZoneId.of('UT+02:30')],
                ['GMT+03:30', 9, -1, ZoneId.of('GMT+03:30')],
                ['-01:30', 6, -1, ZoneOffset.ofHoursMinutes(-1, -30)],
                ['UTC-01:30', 9, -1, ZoneId.of('UTC-01:30')],
                ['UT-02:30', 8, -1, ZoneId.of('UT-02:30')],
                ['GMT-03:30', 9, -1, ZoneId.of('GMT-03:30')],

                // fallback to UTC
                ['UTC-01:WW', 3, -1, ZoneId.of('UTC')],
                ['UT-02:WW', 2, -1, ZoneId.of('UT')],
                ['GMT-03:WW', 3, -1, ZoneId.of('GMT')],
                ['Z0', 1, -1, ZoneOffset.UTC],
                ['UTC1', 3, -1, ZoneId.of('UTC')],

                // Z not parsed as zero
                ['UTCZ', 3, -1, ZoneId.of('UTC')],
                ['UTZ', 2, -1, ZoneId.of('UT')],
                ['GMTZ', 3, -1, ZoneId.of('GMT')],

                // 0 not parsed
                ['UTC0', 3, -1, ZoneId.of('UTC')],
                ['UT0', 2, -1, ZoneId.of('UT')],

                // fail to parse
                ['', 0, 0, null],
                ['A', 0, 0, null],
                ['UZ', 0, 0, null],
                ['GMA', 0, 0, null],
                ['0', 0, 0, null],
                ['+', 0, 0, null],
                ['-', 0, 0, null],

                // zone IDs
                ['Europe/London', 13, -1, ZoneId.of('Europe/London')],
                ['America/New_York', 16, -1, ZoneId.of('America/New_York')],
                ['America/Bogusville', 0, 0, null],
            ];
        }

        it('test_parseSuccess_plain', function () {
            dataProviderTest(data_parseSuccess, (text, expectedIndex, expectedErrorIndex, expected) => {
                init();
                builder.appendZoneId();
                const parsed = builder.toFormatter().parseUnresolved(text, pos);
                assertEquals(pos.getErrorIndex(), expectedErrorIndex, 'Incorrect error index parsing: ' + text);
                assertEquals(pos.getIndex(), expectedIndex, 'Incorrect index parsing: ' + text);
                if (expected != null) {
                    assertEquals(parsed.query(TemporalQueries.zoneId()), expected, 'Incorrect zoneId parsing: ' + text);
                    assertEquals(parsed.query(TemporalQueries.offset()), null, 'Incorrect offset parsing: ' + text);
                    assertEquals(parsed.query(TemporalQueries.zone()), expected, 'Incorrect zone parsing: ' + text);
                } else {
                    assertEquals(parsed, null);
                }
            });
        });

    });

    it('javascript special id SYSTEM', function () {
        const text = 'SYSTEM';
        const parsed = builder.appendZoneId().toFormatter().parseUnresolved(text, pos);
        assertEquals(pos.getErrorIndex(), -1);
        assertEquals(pos.getIndex(), 6);
        assertEquals(parsed.query(TemporalQueries.zoneId()), ZoneId.systemDefault());
    });
});
