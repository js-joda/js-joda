/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals, dataProviderTest} from '../testUtils';

import '../_init';

import {Instant} from '../../src/Instant';
import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {LocalDateTime} from '../../src/LocalDateTime';
import {nativeJs} from '../../src/temporal/NativeJsTemporal';

describe('temporal/NativeJsTemporal.js', ()=>{


    it('should create a LocalDate from native js Date instance', function () {
        var jsDate = new Date('2016-02-29T00:00:00Z');
        var testData = [
            [new Date('2016-02-29T00:00:00Z'), LocalDate.parse('2016-02-29')],
            [new Date(jsDate.getTime()-1), LocalDate.parse('2016-02-28')],
            [new Date(jsDate.getTime()+(24*60*60*1000)-1), LocalDate.parse('2016-02-29')],
            [new Date(jsDate.getTime()+(24*60*60*1000)), LocalDate.parse('2016-03-01')]
        ];

        dataProviderTest(testData, (jsDate, expectedLocalDate) => {
            var d = LocalDate.from(nativeJs(jsDate));
            assertEquals(d, expectedLocalDate);
        });
    });

    it('should create a LocalTime from native js Date instance', function () {
        var jsDate = new Date('2016-02-29T12:00:00Z');
        var testData = [
            [new Date('2016-02-29T12:00:00Z'), LocalTime.NOON],
            [new Date(jsDate.getTime()-1), LocalTime.parse('11:59:59.999')],
            [new Date(jsDate.getTime()+(12*60*60*1000)), LocalTime.parse('00:00:00')],
            [new Date(jsDate.getTime()+(12*60*60*1000)-1), LocalTime.parse('23:59:59.999')]
        ];

        dataProviderTest(testData, (jsDate, expectedLocalTime) => {
            var d = LocalTime.from(nativeJs(jsDate));
            assertEquals(d, expectedLocalTime);
        }, true);
    });

    it('should create a LocalDateTime from native js Date instance', function () {
        var jsDate = new Date('2016-02-29T00:00:00Z');
        var testData = [
            [new Date('2016-02-29T00:00:00Z'), LocalDateTime.parse('2016-02-29T00:00:00')],
            [new Date(jsDate.getTime()-1), LocalDateTime.parse('2016-02-28T23:59:59.999')],
            [new Date(jsDate.getTime()+(24*60*60*1000)-1), LocalDateTime.parse('2016-02-29T23:59:59.999')],
            [new Date(jsDate.getTime()+(24*60*60*1000)), LocalDate.parse('2016-03-01').atStartOfDay()]
        ];

        dataProviderTest(testData, (jsDate, expectedLocalDateTime) => {
            var d = LocalDateTime.from(nativeJs(jsDate));
            assertEquals(d, expectedLocalDateTime);
        });
    });

    it('should create an Instant from native js Date instance', function () {
        var leapDayEpochMilli = new Date('2016-02-29T00:00:00Z').getTime();
        var testData = [
            [new Date(0), Instant.parse('1970-01-01T00:00:00Z')],
            [new Date(leapDayEpochMilli), Instant.parse('2016-02-29T00:00:00Z')],
            [new Date(leapDayEpochMilli-1), Instant.parse('2016-02-28T23:59:59.999Z')],
            [new Date(leapDayEpochMilli+(24*60*60*1000)-1), Instant.parse('2016-02-29T23:59:59.999Z')],
            [new Date(leapDayEpochMilli+(24*60*60*1000)), Instant.parse('2016-03-01T00:00:00Z')]
        ];

        dataProviderTest(testData, (jsDate, expectedInstant) => {
            var i = Instant.from(nativeJs(jsDate));
            assertEquals(i, expectedInstant);
        });
    });


});