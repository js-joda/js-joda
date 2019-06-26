/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assertEquals} from '../../testUtils';

import '../../_init';

import {DecimalStyle} from '../../../src/format/DecimalStyle';

describe('org.threeten.bp.format.TestDecimalStyle', () => {
    it('test_STANDARD', () => {
        const loc1 = DecimalStyle.STANDARD;
        assertEquals(loc1.zeroDigit(), '0');
        assertEquals(loc1.positiveSign(), '+');
        assertEquals(loc1.negativeSign(), '-');
        assertEquals(loc1.decimalSeparator(), '.');
    });

    it('test_zeroDigit', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.withZeroDigit('A').zeroDigit(), 'A');
    });

    it('test_positiveSign', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.withPositiveSign('A').positiveSign(), 'A');
    });

    it('test_negativeSign', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.withNegativeSign('A').negativeSign(), 'A');
    });

    it('test_decimalSeparator', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.withDecimalSeparator('A').decimalSeparator(), 'A');
    });

    it('test_convertToDigit_base', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.convertToDigit('0'), 0);
        assertEquals(base.convertToDigit('1'), 1);
        assertEquals(base.convertToDigit('9'), 9);
        assertEquals(base.convertToDigit(' '), -1);
        assertEquals(base.convertToDigit('A'), -1);
    });

    it('test_convertToDigit_altered', () => {
        const base = DecimalStyle.STANDARD.withZeroDigit('A');
        assertEquals(base.convertToDigit('A'), 0);
        assertEquals(base.convertToDigit('B'), 1);
        assertEquals(base.convertToDigit('J'), 9);
        assertEquals(base.convertToDigit(' '), -1);
        assertEquals(base.convertToDigit('0'), -1);
    });

    it('test_convertNumberToI18N_base', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.convertNumberToI18N('134'), '134');
    });

    it('test_convertNumberToI18N_altered', () => {
        const base = DecimalStyle.STANDARD.withZeroDigit('A');
        assertEquals(base.convertNumberToI18N('134'), 'BDE');
    });

    it('test_equalsHashCode1', () => {
        const a = DecimalStyle.STANDARD;
        const b = DecimalStyle.STANDARD;
        assertEquals(a.equals(b), true);
        assertEquals(b.equals(a), true);
        assertEquals(a.hashCode(), b.hashCode());
    });

    it('test_equalsHashCode2', () => {
        const a = DecimalStyle.STANDARD.withZeroDigit('A');
        const b = DecimalStyle.STANDARD.withZeroDigit('A');
        assertEquals(a.equals(b), true);
        assertEquals(b.equals(a), true);
        assertEquals(a.hashCode(), b.hashCode());
    });

    it('test_equalsHashCode3', () => {
        const a = DecimalStyle.STANDARD.withZeroDigit('A');
        const b = DecimalStyle.STANDARD.withDecimalSeparator('A');
        assertEquals(a.equals(b), false);
        assertEquals(b.equals(a), false);
    });

    it('test_equalsHashCode_bad', () => {
        const a = DecimalStyle.STANDARD;
        assertEquals(a.equals(''), false);
        assertEquals(a.equals(null), false);
    });

    it('test_toString_base', () => {
        const base = DecimalStyle.STANDARD;
        assertEquals(base.toString(), 'DecimalStyle[0+-.]');
    });

    it('test_toString_altered', () => {
        const base = DecimalStyle.STANDARD.withZeroDigit('A').withDecimalSeparator('@');
        assertEquals(base.toString(), 'DecimalStyle[A+-@]');
    });

});
