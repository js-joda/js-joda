/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
const path = require('path');

// webpack plugin to ignore all cldr-data files not needed for js-joda-locale packages
class CldrDataIgnorePlugin {
    constructor(modulesDir, locales) {
        this.contextRegex = new RegExp(path.resolve(modulesDir, 'cldr-data'));

        this.requestRegex = [
            /^\.\/supplemental\/likelySubtags.json$/,
            /^\.\/supplemental\/metaZones.json$/,
            /^\.\/supplemental\/weekData.json$/,
            /^\.\/availableLocales.json$/,
        ];

        locales.forEach((locale) => {
            this.requestRegex.push(new RegExp(`^\\.\\/main\\/${locale}\\/ca-gregorian.json$`));
            this.requestRegex.push(new RegExp(`^\\.\\/main\\/${locale}\\/timeZoneNames.json$`));
        });

        this.checkIgnore = this.checkIgnore.bind(this);
    }

    checkIgnore(result) {
        if (!result) {
            // ignore
            return null;
        }
        if (this.contextRegex.test(result.context)) {
            for (let i = 0; i < this.requestRegex.length; i += 1) {
                const regex = this.requestRegex[i];
                if (regex.test(result.request)) {
                    // do not ignore
                    return result;
                }
            }
            // cldr-data but not in requestRegex... so ignore
            return null;
        }
        // do not ignore
        return result;
    }

    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('CldrDataIgnorePlugin', nmf => {
            nmf.hooks.beforeResolve.tap('CldrDataIgnorePlugin', this.checkIgnore);
        });
        compiler.hooks.contextModuleFactory.tap('CldrDataIgnorePlugin', cmf => {
            cmf.hooks.beforeResolve.tap('CldrDataIgnorePlugin', this.checkIgnore);
        });
    }
}

module.exports = CldrDataIgnorePlugin;
