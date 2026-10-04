/* eslint-disable no-var */

//! moment-timezone.js
//! version : 0.5.2
//! author : Tim Wood
//! license : MIT
//! github.com/moment/moment-timezone

/************************************
 Unpacking
 ************************************/

/**
 * @private
 *
 * @param charCode
 * @returns {number}
 */
function charCodeToInt(charCode) {
    if (charCode > 96) {
        return charCode - 87;
    } else if (charCode > 64) {
        return charCode - 29;
    }
    return charCode - 48;
}

function unpackBase60(string) {
    var i = 0,
        parts = string.split('.'),
        whole = parts[0],
        fractional = parts[1] || '',
        multiplier = 1,
        num,
        out = 0,
        sign = 1;

    // handle negative numbers
    if (string.charCodeAt(0) === 45) {
        i = 1;
        sign = -1;
    }

    // handle digits before the decimal
    for (i; i < whole.length; i++) {
        num = charCodeToInt(whole.charCodeAt(i));
        out = 60 * out + num;
    }

    // handle digits after the decimal
    for (i = 0; i < fractional.length; i++) {
        multiplier = multiplier / 60;
        num = charCodeToInt(fractional.charCodeAt(i));
        out += num * multiplier;
    }

    return out * sign;
}

function arrayToInt (array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = unpackBase60(array[i]);
    }
}

function intToUntil (array, length) {
    for (var i = 0; i < length; i++) {
        array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
    }

    array[length - 1] = Infinity;
}

function mapIndices (source, indices) {
    var out = [], i;

    for (i = 0; i < indices.length; i++) {
        out[i] = source[indices[i]];
    }

    return out;
}

/**
 * @private
 *
 * Changes: field 7, the standard offset per period type (encoded like the offsets), is unpacked
 * into `stdOffsets` when present.
 *
 * @param string
 * @returns {{offsets: *[], abbrs: *[], name, untils: *, population: number, stdOffsets: (number[]|undefined)}}
 */
export function unpack (string) {
    var data = string.split('|'),
        offsets = data[2].split(' '),
        indices = data[3].split(''),
        untils  = data[4].split(' '),
        stdOffsets = data[7] ? data[7].split(' ') : null,
        result;

    arrayToInt(offsets);
    arrayToInt(indices);
    arrayToInt(untils);

    intToUntil(untils, indices.length);

    result = {
        name       : data[0],
        abbrs      : mapIndices(data[1].split(' '), indices),
        offsets    : mapIndices(offsets, indices),
        untils     : untils,
        population : data[5] | 0
    };

    if (stdOffsets) {
        arrayToInt(stdOffsets);
        result.stdOffsets = mapIndices(stdOffsets, indices);
    }

    return result;
}

