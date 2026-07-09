/*
 * @copyright (c) 2024, Cedric Conday
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';
import { TextStyle } from '@js-joda/core';

import { LocaleStore } from '../../src/format/LocaleStore';

describe('js-joda LocaleStore', () => {
    it('excludes a style whose text is not uniquely parsable (duplicate text)', () => {
        // NARROW month text where "J" maps to Jan (1), Jun (6) and Jul (7):
        // the text is ambiguous, so the style must not be parsable.
        const valueTextMap = {};
        valueTextMap[TextStyle.NARROW] = { 1: 'J', 6: 'J', 7: 'J' };
        const store = new LocaleStore(valueTextMap);
        expect(store.getTextIterator(TextStyle.NARROW)).to.be.null;
        // ...and it must not leak into the "all styles" parse list either.
        expect(store.getTextIterator(null)).to.be.null;
    });

    it('keeps a style whose text is uniquely parsable', () => {
        const valueTextMap = {};
        valueTextMap[TextStyle.FULL] = { 1: 'January', 2: 'February' };
        const store = new LocaleStore(valueTextMap);
        expect(store.getTextIterator(TextStyle.FULL)).to.not.be.null;
    });
});
