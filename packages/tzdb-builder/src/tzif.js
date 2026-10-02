/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Parser for TZif files as written by zic, see RFC 8536.
 * For version 2+ files the 64-bit data block is used, for version 1 files the 32-bit block.
 */

const HEADER_SIZE = 44;

function readHeader(buffer, offset) {
    if (buffer.toString('latin1', offset, offset + 4) !== 'TZif') {
        throw new Error(`Not a TZif file (no magic at offset ${offset})`);
    }
    const versionByte = buffer[offset + 4];
    const counts = offset + 20;
    return {
        version: versionByte === 0 ? 1 : Number(String.fromCharCode(versionByte)),
        isutcnt: buffer.readUInt32BE(counts),
        isstdcnt: buffer.readUInt32BE(counts + 4),
        leapcnt: buffer.readUInt32BE(counts + 8),
        timecnt: buffer.readUInt32BE(counts + 12),
        typecnt: buffer.readUInt32BE(counts + 16),
        charcnt: buffer.readUInt32BE(counts + 20),
    };
}

function dataBlockSize(header, timeSize) {
    return header.timecnt * timeSize +
        header.timecnt +
        header.typecnt * 6 +
        header.charcnt +
        header.leapcnt * (timeSize + 4) +
        header.isstdcnt +
        header.isutcnt;
}

function readAbbreviation(buffer, start, end) {
    let stop = start;
    while (stop < end && buffer[stop] !== 0) {
        stop++;
    }
    return buffer.toString('latin1', start, stop);
}

function readDataBlock(buffer, offset, header, timeSize) {
    let pos = offset;
    const times = [];
    for (let i = 0; i < header.timecnt; i++) {
        times.push(timeSize === 8 ? Number(buffer.readBigInt64BE(pos)) : buffer.readInt32BE(pos));
        pos += timeSize;
    }
    const typeIndices = [];
    for (let i = 0; i < header.timecnt; i++) {
        typeIndices.push(buffer[pos++]);
    }
    const rawTypes = [];
    for (let i = 0; i < header.typecnt; i++) {
        rawTypes.push({
            utoff: buffer.readInt32BE(pos),
            isdst: buffer[pos + 4] === 1,
            abbrind: buffer[pos + 5],
        });
        pos += 6;
    }
    const charsStart = pos;
    const charsEnd = pos + header.charcnt;
    const types = rawTypes.map(({ utoff, isdst, abbrind }) => ({
        utoff,
        isdst,
        abbr: readAbbreviation(buffer, charsStart + abbrind, charsEnd),
    }));
    return {
        transitions: times.map((time, i) => ({ time, type: typeIndices[i] })),
        types,
    };
}

/**
 * Parses a TZif file.
 *
 * @param {Buffer} buffer - file content
 * @return {{version: number, transitions: {time: number, type: number}[],
 *  types: {utoff: number, isdst: boolean, abbr: string}[], footer: string|null}}
 *  `time` is in epoch seconds, `utoff` in seconds east of UTC, `footer` is the POSIX TZ string
 *  that applies after the last transition (version 2+ only, may be empty).
 */
export function parseTzif(buffer) {
    const v1 = readHeader(buffer, 0);
    if (v1.version < 2) {
        return { version: v1.version, ...readDataBlock(buffer, HEADER_SIZE, v1, 4), footer: null };
    }
    const v2Offset = HEADER_SIZE + dataBlockSize(v1, 4);
    const v2 = readHeader(buffer, v2Offset);
    const dataOffset = v2Offset + HEADER_SIZE;
    const data = readDataBlock(buffer, dataOffset, v2, 8);
    const footerStart = dataOffset + dataBlockSize(v2, 8);
    if (buffer[footerStart] !== 0x0a) {
        throw new Error('TZif footer does not start with a newline');
    }
    const footerEnd = buffer.indexOf(0x0a, footerStart + 1);
    if (footerEnd < 0) {
        throw new Error('TZif footer does not end with a newline');
    }
    return { version: v2.version, ...data, footer: buffer.toString('latin1', footerStart + 1, footerEnd) };
}
