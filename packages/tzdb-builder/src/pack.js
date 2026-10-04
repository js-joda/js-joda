/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 *
 * Packing, year filtering and link creation are ported from moment-timezone-utils.js:
 *
 * moment-timezone-utils.js, version 0.6.4
 * Copyright (c) JS Foundation and other contributors
 * license: MIT, github.com/moment/moment-timezone
 *
 * Changes: period types are keyed by (abbr, offset, isdst, standard offset), the isdst flags are
 * written as field 6 and the standard offsets as field 7; population and countries are not written;
 * links are grouped by a deterministic leader rule.
 */

const BASE60 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';
const EPSILON = 0.000001; // fixes floating point rounding errors

function packBase60Fraction(fraction, precision) {
    let buffer = '.';
    let output = '';
    let current;
    while (precision > 0) {
        precision -= 1;
        fraction *= 60;
        current = Math.floor(fraction + EPSILON);
        buffer += BASE60[current];
        fraction -= current;
        // only add the buffer once there is a non-zero value: '.000' outputs '', '.100' outputs '.1'
        if (current) {
            output += buffer;
            buffer = '';
        }
    }
    return output;
}

export function packBase60(number, precision) {
    const absolute = Math.abs(number);
    let whole = Math.floor(absolute);
    const fraction = packBase60Fraction(absolute - whole, Math.min(~~precision, 10));
    let output = '';
    while (whole > 0) {
        output = BASE60[whole % 60] + output;
        whole = Math.floor(whole / 60);
    }
    if (number < 0) {
        output = `-${output}`;
    }
    if (output && fraction) {
        return output + fraction;
    }
    if (!fraction && output === '-') {
        return '0';
    }
    return output || fraction || '0';
}

function packUntils(untils) {
    const out = [];
    let last = 0;
    for (let i = 0; i < untils.length - 1; i++) {
        out[i] = packBase60(Math.round((untils[i] - last) / 1000) / 60, 1);
        last = untils[i];
    }
    return out.join(' ');
}

// offsets in minutes west are rounded to whole seconds before packing
const packOffset = (offset) => packBase60(Math.round(offset * 60) / 60, 1);

function packTypes(zone) {
    const abbrs = [];
    const offsets = [];
    const isdsts = [];
    const stdOffsets = [];
    const indices = [];
    const map = new Map();
    for (let i = 0; i < zone.abbrs.length; i++) {
        const key = `${zone.abbrs[i]}|${zone.offsets[i]}|${zone.isdsts[i]}|${zone.stdOffsets[i]}`;
        if (!map.has(key)) {
            map.set(key, abbrs.length);
            abbrs.push(zone.abbrs[i]);
            offsets.push(packOffset(zone.offsets[i]));
            isdsts.push(zone.isdsts[i] ? '1' : '0');
            stdOffsets.push(packOffset(zone.stdOffsets[i]));
        }
        indices.push(packBase60(map.get(key), 0));
    }
    return {
        abbrs: abbrs.join(' '),
        offsets: offsets.join(' '),
        indices: indices.join(''),
        isdsts: isdsts.join(''),
        stdOffsets: stdOffsets.join(' '),
    };
}

const ZONE_ARRAYS = ['abbrs', 'untils', 'offsets', 'isdsts', 'stdOffsets'];

function validate(zone) {
    for (const key of ['name', ...ZONE_ARRAYS]) {
        if (zone[key] == null) {
            throw new Error(`Missing ${key} in zone ${zone.name}`);
        }
    }
    if (ZONE_ARRAYS.some((key) => zone[key].length !== zone.abbrs.length)) {
        throw new Error(`Mismatched array lengths in zone ${zone.name}`);
    }
}

/**
 * Packs a zone into `name|abbrs|offsets|indices|untils|population|isdsts|stdOffsets`.
 * Population is always empty.
 */
export function pack(zone) {
    validate(zone);
    const types = packTypes(zone);
    return [zone.name, types.abbrs, types.offsets, types.indices, packUntils(zone.untils), '', types.isdsts,
        types.stdOffsets].join('|');
}

function findStartAndEndIndex(untils, start, end) {
    let startI = 0;
    let endI = untils.length + 1;
    for (let i = 0; i < untils.length; i++) {
        if (untils[i] == null) {
            continue;
        }
        const untilYear = new Date(untils[i]).getUTCFullYear();
        if (untilYear < start) {
            startI = i + 1;
        }
        if (untilYear > end) {
            endI = Math.min(endI, i + 1);
        }
    }
    return [startI, endI];
}

/**
 * Keeps the periods that overlap the UTC years `start` to `end`; the last kept period becomes open-ended.
 */
export function filterYears(zone, start, end) {
    const [startI, endI] = findStartAndEndIndex(zone.untils, start, end);
    const untils = zone.untils.slice(startI, endI);
    untils[untils.length - 1] = null;
    return {
        name: zone.name,
        abbrs: zone.abbrs.slice(startI, endI),
        untils,
        offsets: zone.offsets.slice(startI, endI),
        isdsts: zone.isdsts.slice(startI, endI),
        stdOffsets: zone.stdOffsets.slice(startI, endI),
    };
}

/**
 * Groups zones with identical data. The leader of a group is a name defined by a tzdb Zone line
 * (`zoneNames`) if there is one, ties are broken lexicographically.
 *
 * @param {object[]} zones - unpacked zones
 * @param {Set<string>} zoneNames - names defined by Zone lines
 * @return {{zones: object[], links: string[]}} leaders sorted by name, links `leader|alias` sorted
 */
export function createLinks(zones, zoneNames) {
    const groups = new Map();
    for (const zone of zones) {
        const key = JSON.stringify([zone.abbrs, zone.untils, zone.offsets, zone.isdsts, zone.stdOffsets]);
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(zone);
    }
    const rank = (zone) => (zoneNames.has(zone.name) ? 0 : 1);
    const leaders = [];
    const links = [];
    for (const group of groups.values()) {
        group.sort((a, b) => rank(a) - rank(b) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        const [leader, ...aliases] = group;
        leaders.push(leader);
        for (const alias of aliases) {
            links.push(`${leader.name}|${alias.name}`);
        }
    }
    const byName = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
    return {
        zones: leaders.sort((a, b) => byName(a.name, b.name)),
        links: links.sort(byName),
    };
}

/**
 * @param {{version: string, zones: object[]}} unpacked
 * @param {number} start - first UTC year
 * @param {number} end - last UTC year
 * @param {Set<string>} zoneNames - names defined by Zone lines
 * @return {{version: string, zones: string[], links: string[]}}
 */
export function filterLinkPack(unpacked, start, end, zoneNames) {
    const filtered = unpacked.zones.map((zone) => filterYears(zone, start, end));
    const { zones, links } = createLinks(filtered, zoneNames);
    return { version: unpacked.version, zones: zones.map(pack), links };
}
