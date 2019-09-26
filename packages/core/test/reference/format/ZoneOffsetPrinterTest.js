/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../../_init';

import {dataProviderTest, assertEquals} from '../../testUtils';

import {DateTimeException} from '../../../src/errors';

import {DateTimeBuilder} from '../../../src/format/DateTimeBuilder';
import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {LocalDate} from '../../../src/LocalDate';
import {ZoneOffset} from '../../../src/ZoneOffset';

import {ChronoField} from '../../../src/temporal/ChronoField';

import {EMPTY} from '../temporal/Empty';

const OffsetIdPrinterParser = DateTimeFormatterBuilder.OffsetIdPrinterParser;

describe('org.threeten.bp.format.TestZoneOffsetPrinter', ()=>{

    const OFFSET_0130 = ZoneOffset.of('+01:30');
    let printEmptyContext, printContext;
    let buf;

    beforeEach(() => {
        init();
    });

    function init(){
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    }

    // @DataProvider(name="offsets")
    function provider_offsets() {
        return [
            ['+HH', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HH', '+01', ZoneOffset.ofHours(1)],
            ['+HH', '-01', ZoneOffset.ofHours(-1)],

            ['+HHMM', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HHMM', '+0102', ZoneOffset.ofHoursMinutes(1, 2)],
            ['+HHMM', '-0102', ZoneOffset.ofHoursMinutes(-1, -2)],

            ['+HH:MM', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HH:MM', '+01:02', ZoneOffset.ofHoursMinutes(1, 2)],
            ['+HH:MM', '-01:02', ZoneOffset.ofHoursMinutes(-1, -2)],

            ['+HHMMss', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HHMMss', '+0100', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HHMMss', '+0102', ZoneOffset.ofHoursMinutesSeconds(1, 2, 0)],
            ['+HHMMss', '+0159', ZoneOffset.ofHoursMinutesSeconds(1, 59, 0)],
            ['+HHMMss', '+0200', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HHMMss', '+1800', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HHMMss', '+010215', ZoneOffset.ofHoursMinutesSeconds(1, 2, 15)],
            ['+HHMMss', '-0100', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HHMMss', '-0200', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HHMMss', '-1800', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HHMMss', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HHMMss', '+0100', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HHMMss', '+010203', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HHMMss', '+015959', ZoneOffset.ofHoursMinutesSeconds(1, 59, 59)],
            ['+HHMMss', '+0200', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HHMMss', '+1800', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HHMMss', '-0100', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HHMMss', '-0200', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HHMMss', '-1800', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HH:MM:ss', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HH:MM:ss', '+01:00', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HH:MM:ss', '+01:02', ZoneOffset.ofHoursMinutesSeconds(1, 2, 0)],
            ['+HH:MM:ss', '+01:59', ZoneOffset.ofHoursMinutesSeconds(1, 59, 0)],
            ['+HH:MM:ss', '+02:00', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HH:MM:ss', '+18:00', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HH:MM:ss', '+01:02:15', ZoneOffset.ofHoursMinutesSeconds(1, 2, 15)],
            ['+HH:MM:ss', '-01:00', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HH:MM:ss', '-02:00', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HH:MM:ss', '-18:00', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HH:MM:ss', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HH:MM:ss', '+01:00', ZoneOffset.ofHoursMinutesSeconds(1, 0, 0)],
            ['+HH:MM:ss', '+01:02:03', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HH:MM:ss', '+01:59:59', ZoneOffset.ofHoursMinutesSeconds(1, 59, 59)],
            ['+HH:MM:ss', '+02:00', ZoneOffset.ofHoursMinutesSeconds(2, 0, 0)],
            ['+HH:MM:ss', '+18:00', ZoneOffset.ofHoursMinutesSeconds(18, 0, 0)],
            ['+HH:MM:ss', '-01:00', ZoneOffset.ofHoursMinutesSeconds(-1, 0, 0)],
            ['+HH:MM:ss', '-02:00', ZoneOffset.ofHoursMinutesSeconds(-2, 0, 0)],
            ['+HH:MM:ss', '-18:00', ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0)],

            ['+HHMMSS', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HHMMSS', '+010203', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HHMMSS', '-010203', ZoneOffset.ofHoursMinutesSeconds(-1, -2, -3)],
            ['+HHMMSS', '+010200', ZoneOffset.ofHoursMinutesSeconds(1, 2, 0)],
            ['+HHMMSS', '-010200', ZoneOffset.ofHoursMinutesSeconds(-1, -2, 0)],

            ['+HH:MM:SS', 'NO-OFFSET', ZoneOffset.UTC],
            ['+HH:MM:SS', '+01:02:03', ZoneOffset.ofHoursMinutesSeconds(1, 2, 3)],
            ['+HH:MM:SS', '-01:02:03', ZoneOffset.ofHoursMinutesSeconds(-1, -2, -3)],
            ['+HH:MM:SS', '+01:02:00', ZoneOffset.ofHoursMinutesSeconds(1, 2, 0)],
            ['+HH:MM:SS', '-01:02:00', ZoneOffset.ofHoursMinutesSeconds(-1, -2, 0)]
        ];
    }

    // @Test(dataProvider="offsets")
    it('test_print', function () {
        dataProviderTest(provider_offsets, (pattern, expected, offset) => {
            init();
            buf.append('EXISTING');
            printContext.setDateTime(DateTimeBuilder.create(ChronoField.OFFSET_SECONDS, offset.totalSeconds()));
            const pp = new OffsetIdPrinterParser('NO-OFFSET', pattern);
            pp.print(printContext, buf);
            assertEquals(buf.toString(), 'EXISTING' + expected);
        });
    });

    // @Test(dataProvider="offsets")
    it('test_toString', function () {
        dataProviderTest(provider_offsets, (pattern) => {
            init();
            const pp = new OffsetIdPrinterParser('NO-OFFSET', pattern);
            assertEquals(pp.toString(), 'Offset(' + pattern + ',\'NO-OFFSET\')');
        });
    });

    it('test_print_emptyCalendrical()', () => {
        expect(()=>{
            const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
            pp.print(printEmptyContext, buf);
        }).to.throw(DateTimeException);
    });

    it('test_print_emptyAppendable()', () => {
        printContext.setDateTime(DateTimeBuilder.create(ChronoField.OFFSET_SECONDS, OFFSET_0130.totalSeconds()));
        const pp = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), '+01:30');
    });

});

