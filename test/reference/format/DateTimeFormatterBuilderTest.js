/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import * as joda from 'js-joda';

import { assertEquals, dataProviderTest } from '../../testUtils';

import '../../_init';

import jodaLocale from '../../../src/plug';

joda.use(jodaLocale);

const { ChronoField, DateTimeFormatterBuilder, NullPointerException, TextStyle } = joda;

describe('org.threeten.bp.format.TestDateTimeFormatterBuilder', () => {
    let builder = null;

    beforeEach(() => {
        builder = new DateTimeFormatterBuilder();
    });

    describe('appendText', () => {
        it('test_appendText_1arg', () => {
            builder.appendText(ChronoField.MONTH_OF_YEAR);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear)');
        });

        it('test_appendValue_1arg_null', () => {
            expect(() => {
                builder.appendText(null);
            }).to.throw(NullPointerException);
        });

        it('test_appendText_2arg', () => {
            builder.appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear,SHORT)');
        });

        it('test_appendText_2arg_nullRule', () => {
            expect(() => {
                builder.appendText(null, TextStyle.SHORT);
            }).to.throw(NullPointerException);
        });

        it('test_appendText_2arg_nullStyle', () => {
            expect(() => {
                builder.appendText(ChronoField.MONTH_OF_YEAR, null);
            }).to.throw(NullPointerException);
        });

        // TODO: unskip
        it.skip('test_appendTextMap', () => {
            const map = {
                1: 'JNY',
                2: 'FBY',
                3: 'MCH',
                4: 'APL',
                5: 'MAY',
                6: 'JUN',
                7: 'JLY',
                8: 'AGT',
                9: 'SPT',
                10: 'OBR',
                11: 'NVR',
                12: 'DBR',
            };
            builder.appendText(ChronoField.MONTH_OF_YEAR, map);
            const f = builder.toFormatter();
            assertEquals(f.toString(), 'Text(MonthOfYear)');  // TODO: toString should be different?
        });

        it('test_appendTextMap_nullRule', () => {
            expect(() => {
                builder.appendText(null, {});
            }).to.throw(NullPointerException);
        });

        it('test_appendTextMap_nullStyle', () => {
            expect(() => {
                builder.appendText(ChronoField.MONTH_OF_YEAR, null);
            }).to.throw(NullPointerException);
        });
    });
});


/***

 public class TestDateTimeFormatterBuilder {



    //-----------------------------------------------------------------------
    @Test
    public void test_appendZoneText_1arg() throws Exception {
        builder.appendZoneText(TextStyle.FULL);
        DateTimeFormatter f = builder.toFormatter();
        assertEquals(f.toString(), 'ZoneText(FULL)');
    }

    @Test(expectedExceptions=NullPointerException.class)
    public void test_appendZoneText_1arg_nullText() throws Exception {
        builder.appendZoneText(null);
    }

    //-----------------------------------------------------------------------

}
 *
 */
