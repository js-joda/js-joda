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

    checkIgnore(result, callback) {
        if (!result) {
            // ignore
            return callback();
        }
        if (this.contextRegex.test(result.context)) {
            for (let i = 0; i < this.requestRegex.length; i += 1) {
                const regex = this.requestRegex[i];
                if (regex.test(result.request)) {
                    // do not ignore
                    return callback(null, result);
                }
            }
            // cldr-data but not in requestRegex... so ignore
            return callback();
        }
        // do not ignore
        callback(null, result);
    }

    apply(compiler) {
        compiler.plugin('normal-module-factory', (nmf) => {
            nmf.plugin('before-resolve', this.checkIgnore);
        });
        compiler.plugin('context-module-factory', (cmf) => {
            cmf.plugin('before-resolve', this.checkIgnore);
        });
    }
}

module.exports = CldrDataIgnorePlugin;
