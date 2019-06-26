/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';

import Locale from '../src/Locale';

describe('Locale', () => {
    it('should return set language, country, localeString', () => {
        const locale = new Locale('language', 'country', 'localeString');
        expect(locale.language()).to.eql('language');
        expect(locale.country()).to.eql('country');
        expect(locale.localeString()).to.eql('localeString');
    });

    it('should return set calculated localeString if not set', () => {
        let locale = new Locale('language', 'country');
        expect(locale.localeString()).to.eql('language-country');
        locale = new Locale('language');
        expect(locale.localeString()).to.eql('language');
    });

    it('should compare locales correctly', () => {
        const locale = new Locale('language', 'country');
        const locale2 = new Locale('language', 'country');
        const fakeLocale = {
            localeString() {
                return 'language-country';
            }
        };
        expect(locale.equals(locale2)).to.be.true;
        expect(locale.equals(null)).to.be.false;
        expect(locale.localeString()).to.eql(fakeLocale.localeString());
        expect(locale.equals(fakeLocale)).to.be.false;
    });
});
