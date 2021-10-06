/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';

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

        it('should parse new Date().toUTCString() format', () => {
            const df = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
            const z = ZonedDateTime.parse('Tue, 05 Oct 2021 17:08:24 GMT', df);
            expect(z.format(df)).to.equal('Tue, 05 Oct 2021 17:08:24 GMT');
            expect(z.zone().id()).to.equal('GMT');
            expect(z.toString()).to.equal('2021-10-05T17:08:24Z[GMT]');
        });
    });
});
