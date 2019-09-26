/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';
import * as joda from '@js-joda/core';

import '../src/js-joda-locale';
import CldrDateTimeFormatterBuilder from '../src/format/cldr/CldrDateTimeFormatterBuilder';
import LocaleDateTimeFormatter from '../src/format/LocaleDateTimeFormatter';

const testPlugin = () => {
    it('should add CldrDateTimeFormatterBuilder methods to joda', () => {
        const jodaDateTimeFormatterBuilder = joda.DateTimeFormatterBuilder.prototype;
        const cldrDateTimeFormatterBuilder = CldrDateTimeFormatterBuilder.prototype;
        expect(jodaDateTimeFormatterBuilder.appendText).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendText).to.equal(cldrDateTimeFormatterBuilder.appendText);
        expect(jodaDateTimeFormatterBuilder.appendLocalizedOffset).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendLocalizedOffset).to.equal(cldrDateTimeFormatterBuilder.appendLocalizedOffset);
        expect(jodaDateTimeFormatterBuilder.appendZoneText).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendZoneText).to.equal(cldrDateTimeFormatterBuilder.appendZoneText);
        expect(jodaDateTimeFormatterBuilder.appendZoneText).to.equal(cldrDateTimeFormatterBuilder.appendZoneText);

        const jodaDateTimeFormatter = joda.DateTimeFormatter.prototype;
        const localeDateTimeFormatter = LocaleDateTimeFormatter.prototype;
        expect(jodaDateTimeFormatter.withLocale).to.equal(localeDateTimeFormatter.withLocale);
    });
};

describe('plug test', () => {
    testPlugin();
});

// export the testPlugin function to be re-used in pluginTest_mochaOnly
export default testPlugin;
