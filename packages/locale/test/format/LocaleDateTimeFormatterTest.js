/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import { DateTimeFormatter } from '@js-joda/core';

import { Locale } from '../../src/js-joda-locale';

describe('LocaleDateTimeFormatter', () => {
    describe('withLocale', () => {

        it('creates a new DateTimeFormatter with the given locale', () => {
            const df = DateTimeFormatter.ISO_LOCAL_DATE;
            const localeDf = df.withLocale(Locale.US);
            expect(df.locale()).to.be.null;
            expect(df.withLocale(Locale.US)).to.eql(localeDf);
            expect(localeDf).to.not.eql(df);
            expect(localeDf.locale()).to.eql(Locale.US);
            expect(localeDf.withLocale(Locale.US)).to.equal(localeDf);
        });
    });
});
