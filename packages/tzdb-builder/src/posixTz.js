/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Parser and expander for the POSIX TZ strings of TZif footers, see RFC 8536 section 3.3
 * and POSIX.1 section 8.3, including the RFC 8536 extensions (rule times that are negative or
 * 24 hours and more, and daylight saving time all year).
 */

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86400;
const DEFAULT_RULE_TIME = 2 * SECONDS_PER_HOUR;

class Reader {
    constructor(text) {
        this.text = text;
        this.pos = 0;
    }

    peek() {
        return this.text[this.pos];
    }

    atEnd() {
        return this.pos >= this.text.length;
    }

    match(pattern) {
        pattern.lastIndex = this.pos;
        const result = pattern.exec(this.text);
        if (result == null) {
            return null;
        }
        this.pos += result[0].length;
        return result;
    }

    expect(pattern, what) {
        const result = this.match(pattern);
        if (result == null) {
            throw new Error(`Invalid TZ string '${this.text}': expected ${what} at position ${this.pos}`);
        }
        return result;
    }
}

function readName(reader) {
    if (reader.peek() === '<') {
        return reader.expect(/<([+\-0-9A-Za-z]+)>/y, 'a quoted name')[1];
    }
    return reader.expect(/[A-Za-z]{3,}/y, 'a name')[0];
}

/**
 * Reads `[+-]hh[:mm[:ss]]` and returns signed seconds.
 */
function readSeconds(reader, what) {
    const [, sign, hours, minutes = '0', seconds = '0'] =
        reader.expect(/([+-]?)(\d{1,3})(?::(\d{2}))?(?::(\d{2}))?/y, what);
    const value = Number(hours) * SECONDS_PER_HOUR + Number(minutes) * 60 + Number(seconds);
    return sign === '-' ? -value : value;
}

// the TZ string counts offsets west of UTC; `|| 0` avoids -0
const westToUtoff = (seconds) => -seconds || 0;

function readRule(reader) {
    let rule;
    let match;
    if ((match = reader.match(/M(\d{1,2})\.(\d)\.(\d)/y)) != null) {
        rule = { kind: 'M', month: Number(match[1]), week: Number(match[2]), day: Number(match[3]) };
    } else if ((match = reader.match(/J(\d{1,3})/y)) != null) {
        rule = { kind: 'J', day: Number(match[1]) };
    } else {
        rule = { kind: 'n', day: Number(reader.expect(/\d{1,3}/y, 'a rule')[0]) };
    }
    rule.time = reader.match(/\//y) != null ? readSeconds(reader, 'a rule time') : DEFAULT_RULE_TIME;
    return rule;
}

/**
 * @param {string} text - e.g. `CET-1CEST,M3.5.0,M10.5.0/3`
 * @return {{std: {abbr: string, utoff: number}, dst?: {abbr: string, utoff: number, start: object, end: object}}}
 *  `utoff` is in seconds east of UTC (the TZ string itself counts west)
 */
export function parsePosixTz(text) {
    const reader = new Reader(text);
    const std = { abbr: readName(reader), utoff: westToUtoff(readSeconds(reader, 'the standard offset')) };
    if (reader.atEnd()) {
        return { std };
    }
    const dstAbbr = readName(reader);
    const dstUtoff = reader.peek() !== ',' && !reader.atEnd()
        ? westToUtoff(readSeconds(reader, 'the daylight saving offset'))
        : std.utoff + SECONDS_PER_HOUR;
    reader.expect(/,/y, 'the start rule');
    const start = readRule(reader);
    reader.expect(/,/y, 'the end rule');
    const end = readRule(reader);
    if (!reader.atEnd()) {
        throw new Error(`Invalid TZ string '${text}': unexpected '${text.slice(reader.pos)}'`);
    }
    return { std, dst: { abbr: dstAbbr, utoff: dstUtoff, start, end } };
}

const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
const daysInMonth = (year, month) => new Date(Date.UTC(year, month, 0)).getUTCDate();

/**
 * @return {number} epoch seconds of the local midnight (as if UTC) of the rule's day in `year`
 */
function ruleDay(rule, year) {
    if (rule.kind === 'M') {
        const firstWeekday = new Date(Date.UTC(year, rule.month - 1, 1)).getUTCDay();
        let dayOfMonth = 1 + ((rule.day - firstWeekday + 7) % 7) + (rule.week - 1) * 7;
        while (dayOfMonth > daysInMonth(year, rule.month)) {
            dayOfMonth -= 7;
        }
        return Date.UTC(year, rule.month - 1, dayOfMonth) / 1000;
    }
    // Jn: 1..365, February 29 is never counted; n: 0..365, February 29 is counted
    const zeroBasedDay = rule.kind === 'J'
        ? rule.day - 1 + (isLeapYear(year) && rule.day >= 60 ? 1 : 0)
        : rule.day;
    return Date.UTC(year, 0, 1) / 1000 + zeroBasedDay * SECONDS_PER_DAY;
}

/**
 * @param {object} rule - parsed start or end rule
 * @param {number} year
 * @param {number} utoffBefore - offset in force before the transition, seconds east
 * @return {number} epoch seconds of the transition
 */
export function ruleInstant(rule, year, utoffBefore) {
    return ruleDay(rule, year) + rule.time - utoffBefore;
}

/**
 * Expands the transitions of a parsed TZ string.
 *
 * @param {object} tz - result of parsePosixTz
 * @param {number} afterSeconds - only transitions strictly after this epoch second are returned,
 *  `-Infinity` starts in 1970
 * @param {number} [lastYear] - last UTC year that gets transitions
 * @return {{time: number, type: {utoff: number, isdst: boolean, abbr: string}}[]} sorted by time
 */
export function expandTransitions(tz, afterSeconds, lastYear = 2499) {
    const { std, dst } = tz;
    if (dst == null) {
        return [];
    }
    const stdType = { utoff: std.utoff, isdst: false, abbr: std.abbr };
    const dstType = { utoff: dst.utoff, isdst: true, abbr: dst.abbr };
    const startOf = (year) => ruleInstant(dst.start, year, std.utoff);
    const endOf = (year) => ruleInstant(dst.end, year, dst.utoff);

    const firstYear = Number.isFinite(afterSeconds) ? new Date(afterSeconds * 1000).getUTCFullYear() - 1 : 1970;
    // daylight saving time all year: DST ends when (or after) it starts again next year
    if (startOf(firstYear) < endOf(firstYear) && endOf(firstYear) >= startOf(firstYear + 1)) {
        return [];
    }
    const limit = Date.UTC(lastYear + 1, 0, 1) / 1000;
    const transitions = [];
    for (let year = firstYear; year <= lastYear + 1; year++) {
        transitions.push({ time: startOf(year), type: dstType });
        transitions.push({ time: endOf(year), type: stdType });
    }
    return transitions
        .filter(({ time }) => time > afterSeconds && time < limit)
        .sort((a, b) => a.time - b.time);
}
