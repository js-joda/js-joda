/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

// zic accepts any unambiguous prefix of a keyword, zishrink.awk emits single letters
const isKeyword = (word, keyword) => word.length > 0 && keyword.toLowerCase().startsWith(word.toLowerCase());

/**
 * Extracts the Zone and Link names from tzdb source text (for example `rearguard.zi`).
 *
 * @param {string} text
 * @return {{zones: string[], links: Object<string, string>}} zone names (sorted)
 *  and a map from link name to its target
 */
export function parseZiNames(text) {
    const zones = new Set();
    const links = {};
    for (const rawLine of text.split('\n')) {
        const line = rawLine.replace(/#.*/, '');
        const fields = line.trim().split(/\s+/);
        // a Zone continuation line starts with whitespace, never with a keyword
        if (/^\s/.test(line) || fields[0] === '') {
            continue;
        }
        if (isKeyword(fields[0], 'Zone') && fields.length >= 2) {
            zones.add(fields[1]);
        } else if (isKeyword(fields[0], 'Link') && fields.length >= 3) {
            links[fields[2]] = fields[1];
        }
    }
    return { zones: [...zones].sort(), links };
}
