/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
/* eslint-disable no-console, no-var */
var joda = require('@js-joda/core');
require('@js-joda/timezone');

function outputDateInDifferentLocales(zdt) {
    var { Locale } = require('./build/js-joda-locale');
    console.log('Times in ' + zdt.zone());
    console.log('');
    console.log('en_US formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.US)));
    console.log('en_GB formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.UK)));
    console.log('en_CA formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.CANADA)));
    console.log('de_DE formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.GERMANY)));
    console.log('fr_FR formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.FRANCE)));
    console.log('es_ES formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(new Locale('es', 'ES', 'es'))));
    console.log('ru_RU formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(new Locale('ru', 'RU', 'ru'))));
    console.log('zh_CN formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(new Locale('zh', 'CN', 'zh'))));
    console.log('hi_IN formatted string:', zdt.format(joda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(new Locale('hi', 'IN', 'hi'))));
    console.log('-------------------------------------------------------------------');
    console.log('');
}

try {
    var { Locale } = require('./build/js-joda-locale');
    console.log('locale', Locale);

    console.log('availableLocales:' + JSON.stringify(Locale.getAvailableLocales(), null, 4));

    var zdt = joda.ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('Europe/Berlin'));
    outputDateInDifferentLocales(zdt);
    zdt = joda.ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('America/Chicago'));
    outputDateInDifferentLocales(zdt);
    zdt = joda.ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('America/New_York'));
    outputDateInDifferentLocales(zdt);
    zdt = joda.ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, joda.ZoneId.of('Asia/Hong_Kong'));
    outputDateInDifferentLocales(zdt);

} catch (e) {
    console.error(e);
    console.error('--------------------------------------------------------------------');
    console.error('');
    console.error('');
    console.error('NOTE: if you see errors about missing modules/locales, you may need to run `npm run build-examples` before using this example.');
    process.exit(1);
}
