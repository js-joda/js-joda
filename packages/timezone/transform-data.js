/**
 * This script reads the data in `./data/unpacked/latest`
 * and produces multiple packed versions of the data
 * which are written as `./data/packed/latest*.json`.
 * Files to produced are determined by `FILES_TO_WRITE` below.
 */

const fs = require('fs');
const moment = require('moment-timezone/moment-timezone-utils');
const tzdbLatest = require('./data/unpacked/latest');

const currentYear = new Date().getFullYear();

/**
 * Map from file suffix to years of data that should be included in that file.
 * We'll produce the same set of options that moment-timezone produces.
 * See https://github.com/moment/moment-timezone/blob/c377ac8fd7ff6c2fc52e2f432034ac5727dba1d8/Gruntfile.js#L15
 */
const FILES_TO_WRITE = {
    '': [0, 9999],
    '-1970-2030': [1970, 2030],
    '-2012-2022': [2012, 2022],
    '-10-year-range': [currentYear-5, currentYear+5],
};

const writeData = (suffix, startYear = 0, endYear = 9999) => {
    const packedData = moment.tz.filterLinkPack(tzdbLatest, startYear, endYear);
    fs.writeFileSync(`./data/packed/latest${suffix}.json`, JSON.stringify(packedData, null, '\t'));
};

Object.entries(FILES_TO_WRITE).forEach(([name, [startYear, endYear]]) => {
    writeData(name, startYear, endYear);
});
