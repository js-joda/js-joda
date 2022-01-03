const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { flatten } = require('ramda');
const { availableLocales: allLocales } = require('cldr-data/availableLocales.json');

const template = fs.readFileSync(path.resolve(__dirname, 'cldr-data.ejs'), 'utf8');

function renderCldrDataLoader(locales) {
    const availableLocales = flatten(locales.map(
        (locale) => allLocales.filter(
            (oneOfAllLocale) => oneOfAllLocale.match(new RegExp(`^${locale}$`)))));
    return ejs.render(template, { locales: availableLocales });
}

module.exports = renderCldrDataLoader;
