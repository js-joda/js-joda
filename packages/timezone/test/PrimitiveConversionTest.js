/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { ZoneId } from '@js-joda/core';

import './useTzdbZoneRules';

describe('coercing to primitive', () => {
    const itNotInEs5 = typeof Symbol === 'undefined' || !Symbol.toPrimitive ? it.skip : it;

    itNotInEs5('should throw a TypeError for ZoneId.of(\'Europe/Berlin\') < ZoneId.of(\'Europe/Paris\')', () => {
        expect(() => ZoneId.of('Europe/Berlin') < ZoneId.of('Europe/Paris')).to.throw(TypeError);
    });
});
