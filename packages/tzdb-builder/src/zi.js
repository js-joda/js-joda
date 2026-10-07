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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
// in the order of Date.getUTCDay()
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function lookup(word, names, what) {
    const matches = names.filter((name) => isKeyword(word, name));
    if (matches.length !== 1) {
        throw new Error(`Invalid ${what} '${word}'`);
    }
    return names.indexOf(matches[0]);
}

/**
 * Parses `[-]hh[:mm[:ss]]` (STDOFF, or the time of an UNTIL without its suffix) into seconds.
 */
export function parseZiSeconds(text) {
    const match = /^(-)?(\d+)(?::(\d+))?(?::(\d+))?$/.exec(text);
    if (match == null) {
        throw new Error(`Invalid time '${text}'`);
    }
    const [, sign, hours, minutes = '0', seconds = '0'] = match;
    const value = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    return sign ? -value : value;
}

// day of month of an UNTIL day field: `5`, `lastSun`, `Sun>=8` or `Sun<=25`; may leave the month
function dayOfMonth(field, year, month) {
    const weekdayOf = (day) => new Date(Date.UTC(year, month, day)).getUTCDay();
    if (/^\d+$/.test(field)) {
        return Number(field);
    }
    const last = /^last(\w+)$/.exec(field);
    if (last != null) {
        const weekday = lookup(last[1], WEEKDAYS, 'weekday');
        const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        return lastDay - ((weekdayOf(lastDay) - weekday + 7) % 7);
    }
    const relative = /^(\w+)([<>]=)(\d+)$/.exec(field);
    if (relative != null) {
        const weekday = lookup(relative[1], WEEKDAYS, 'weekday');
        const day = Number(relative[3]);
        return relative[2] === '>='
            ? day + ((weekday - weekdayOf(day) + 7) % 7)
            : day - ((weekdayOf(day) - weekday + 7) % 7);
    }
    throw new Error(`Invalid day '${field}'`);
}

/**
 * Parses the UNTIL columns of a Zone line, `YEAR [MONTH [DAY [TIME[SUFFIX]]]]`.
 *
 * @param {string[]} fields
 * @return {{local: number, suffix: string}} `local` is the date and time as epoch seconds as if it
 *  were UTC, `suffix` is `w` (wall clock time, the default), `s` (standard time) or `u` (UTC)
 */
function parseUntil(fields) {
    const [yearField, monthField, dayField, timeField = '0'] = fields;
    const year = Number(yearField);
    if (!/^-?\d+$/.test(yearField)) {
        throw new Error(`Invalid year '${yearField}'`);
    }
    const month = monthField != null ? lookup(monthField, MONTHS, 'month') : 0;
    const day = dayField != null ? dayOfMonth(dayField, year, month) : 1;
    const [, time, suffixField = 'w'] = /^(.*?)([wsugz])?$/.exec(timeField);
    const suffix = { g: 'u', z: 'u' }[suffixField] || suffixField;
    return { local: Date.UTC(year, month, day) / 1000 + parseZiSeconds(time), suffix };
}

/**
 * Extracts the windows of every Zone from tzdb source text (for example `rearguard.zi`). A window is
 * one Zone or continuation line: its standard offset (STDOFF) applies until its end (UNTIL).
 *
 * @param {string} text
 * @return {Object<string, {stdoff: number, until: {local: number, suffix: string}|null}[]>}
 *  windows per zone name, `stdoff` in seconds east of UTC, `until` null for the last window
 * @throws {Error} naming the zone, if a Zone line can't be parsed
 */
export function parseZiZones(text) {
    const zones = {};
    let current = null;
    for (const rawLine of text.split('\n')) {
        const line = rawLine.replace(/#.*/, '');
        const fields = line.trim().split(/\s+/).filter((field) => field !== '');
        if (fields.length === 0) {
            continue;
        }
        let windowFields;
        if (/^\s/.test(line)) {
            if (current == null) {
                continue;
            }
            windowFields = fields;
        } else if (isKeyword(fields[0], 'Zone')) {
            current = { name: fields[1], windows: [] };
            zones[current.name] = current.windows;
            windowFields = fields.slice(2);
        } else {
            current = null;
            continue;
        }
        try {
            if (windowFields.length < 3) {
                throw new Error(`expected STDOFF RULES FORMAT [UNTIL] in '${line.trim()}'`);
            }
            const until = windowFields.length > 3 ? parseUntil(windowFields.slice(3)) : null;
            current.windows.push({ stdoff: parseZiSeconds(windowFields[0]), until });
            if (until == null) {
                current = null;
            }
        } catch (e) {
            throw new Error(`Cannot parse Zone ${current.name}: ${e.message}`);
        }
    }
    return zones;
}
