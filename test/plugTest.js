/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import * as joda from 'js-joda';

// since for karma/webpack tests we cannot require the actual webpack entry point,
// we test using `plug` ... the entry point js-joda-locale.js only re-exports the default from
// plug anyway...
import locale from '../src/plug';
import CldrDateTimeFormatterBuilder from '../src/format/cldr/CldrDateTimeFormatterBuilder';

const testPlugin = (plugin) => {
    before('use', () => {
        joda.use(plugin);
    });

    it('should add CldrDateTimeFormatterBuilder methods to joda', () => {
        const jodaDateTimeFormatterBuilder = joda.DateTimeFormatterBuilder.prototype;
        const cldrDateTimeFormatterBuilder = CldrDateTimeFormatterBuilder.prototype;
        expect(jodaDateTimeFormatterBuilder.appendText).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendText).to.equal(cldrDateTimeFormatterBuilder.appendText);
        expect(jodaDateTimeFormatterBuilder.appendLocalizedOffset).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendLocalizedOffset).to.equal(cldrDateTimeFormatterBuilder.appendLocalizedOffset);
        expect(jodaDateTimeFormatterBuilder.appendZoneText).to.be.a('function');
        expect(jodaDateTimeFormatterBuilder.appendZoneText).to.equal(cldrDateTimeFormatterBuilder.appendZoneText);
    });
};

describe('plug test', () => {
    testPlugin(locale);
});

// export the testPlugin function to be re-used in pluginTest_mochaOnly
export default testPlugin;
