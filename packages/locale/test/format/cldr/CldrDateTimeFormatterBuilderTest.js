/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import * as joda from '@js-joda/core';

import jodaLocale from '../../../src/plug';

const { ChronoField, DateTimeFormatterBuilder, LocalDate, IllegalArgumentException } = joda.use(jodaLocale);

/* test some functions not covered by the other (reference) tests */

describe('CldrDateTimeFormatterBuilder', () => {
    describe('appendLocalizedOffset', () => {
        it('throws for invalid TextStyle', () => {
            const dfb = new DateTimeFormatterBuilder();
            expect(() => {
                dfb.appendLocalizedOffset('invalidTextStyle');
            }).to.throw(IllegalArgumentException);
        });
    });

    describe('appendTextFieldMap', () => {
        it('prints and parses a TextFieldMap', () => {
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
            const dfb = new DateTimeFormatterBuilder();
            dfb.appendTextFieldMap(ChronoField.MONTH_OF_YEAR, map);
            const f = dfb.toFormatter();
            expect(f.format(LocalDate.of(2017, 1, 1))).to.equal(map[1]);
            expect(f.parse(map[1]).getLong(ChronoField.MONTH_OF_YEAR)).to.equal(1);
        });
    });
});
