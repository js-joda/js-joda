const fs = require('fs');
const moment = require('moment-timezone/moment-timezone-utils');
const tzdbLatest = require('./data/unpacked/latest');

/**
 * Takes the data in `./data/unpacked/latest` and writes packed versions
 * of the data to `./data/packed/latest*.json`. Files produced are determined
 * by `FILES_TO_WRITE` below.
 */

/**
 * Map from file suffix to years of data that should be included in that file.
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

const currentYear = new Date().getFullYear();
Object.entries(FILES_TO_WRITE).forEach(([name, [startYear, endYear]]) => {
    writeData(name, startYear, endYear);
});
