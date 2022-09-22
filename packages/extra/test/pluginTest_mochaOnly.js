/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { DayOfMonth, DayOfYear, Interval, Quarter, YearWeek } from '../src/js-joda-extra';

describe('plugin test', () => {
    it('should export DayOfMonth', () => {
        expect(DayOfMonth).to.exist;
    });
    it('should export DayOfYear', () => {
        expect(DayOfYear).to.exist;
    });
    it('should export Interval', () => {
        expect(Interval).to.exist;
    });
    it('should export Quarter', () => {
        expect(Quarter).to.exist;
    });
    it('should export YearWeek', () => {
        expect(YearWeek).to.exist;
    });
});
