/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import CldrDateTimeTextProvider from '../../../src/format/cldr/CldrDateTimeTextProvider';

/* test some functions not covered by the other (reference) tests */

describe('CldrDateTimeTextProvider', () => {
    it('getAvailableLocales', () => {
        const dtp = new CldrDateTimeTextProvider();
        const availableLocales = dtp.getAvailableLocales();
        expect(availableLocales).to.contain('de');
        expect(availableLocales).to.contain('en');
    });
});
