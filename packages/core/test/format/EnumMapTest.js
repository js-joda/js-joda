/**
 * @copyright (c) 2026, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';

import '../_init';

import { ChronoField } from '../../src/temporal/ChronoField';
import { EnumMap } from '../../src/format/EnumMap';
import { IsoFields } from '../../src/temporal/IsoFields';

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda EnumMap', () => {
    // a field with the same name as ChronoField.DAY_OF_WEEK, like the localized
    // day-of-week of @js-joda/locale WeekFields
    const otherDayOfWeek = { name: () => 'DayOfWeek', toString: () => 'DayOfWeek[other]' };

    it('should keep fields with the same name apart', () => {
        const map = new EnumMap();
        map.put(ChronoField.DAY_OF_WEEK, 7);
        map.put(otherDayOfWeek, 1);
        expect(map.get(ChronoField.DAY_OF_WEEK)).to.equal(7);
        expect(map.get(otherDayOfWeek)).to.equal(1);
        expect(map.keys()).to.eql([ChronoField.DAY_OF_WEEK, otherDayOfWeek]);
    });

    it('should not find a field by the name of another field', () => {
        const map = new EnumMap();
        map.put(otherDayOfWeek, 1);
        expect(map.containsKey(ChronoField.DAY_OF_WEEK)).to.equal(false);
        expect(map.get(ChronoField.DAY_OF_WEEK)).to.equal(undefined);
        expect(map.remove(ChronoField.DAY_OF_WEEK)).to.equal(undefined);
        expect(map.get(otherDayOfWeek)).to.equal(1);
    });

    it('should replace the value of a field', () => {
        const map = new EnumMap();
        map.put(ChronoField.YEAR, 2020);
        map.put(ChronoField.YEAR, 2021);
        expect(map.get(ChronoField.YEAR)).to.equal(2021);
        expect(map.keys()).to.eql([ChronoField.YEAR]);
    });

    it('should remove only the given field', () => {
        const map = new EnumMap();
        map.put(ChronoField.DAY_OF_WEEK, 7);
        map.put(otherDayOfWeek, 1);
        expect(map.remove(otherDayOfWeek)).to.equal(1);
        expect(map.containsKey(otherDayOfWeek)).to.equal(false);
        expect(map.get(ChronoField.DAY_OF_WEEK)).to.equal(7);
        expect(map.keys()).to.eql([ChronoField.DAY_OF_WEEK]);
    });

    it('should return a snapshot of the keys', () => {
        const map = new EnumMap();
        map.put(ChronoField.YEAR, 2020);
        const keys = map.keys();
        map.remove(ChronoField.YEAR);
        map.put(ChronoField.MONTH_OF_YEAR, 1);
        expect(keys).to.eql([ChronoField.YEAR]);
    });

    it('should not list a field with an undefined value', () => {
        const map = new EnumMap();
        map.put(ChronoField.YEAR, undefined);
        expect(map.containsKey(ChronoField.YEAR)).to.equal(false);
        expect(map.keys()).to.eql([]);
    });

    it('should retainAll by field', () => {
        const map = new EnumMap();
        map.put(ChronoField.DAY_OF_WEEK, 7);
        map.put(otherDayOfWeek, 1);
        map.put(ChronoField.YEAR, 2020);
        map.retainAll([otherDayOfWeek, IsoFields.QUARTER_OF_YEAR]);
        expect(map.keys()).to.eql([otherDayOfWeek]);
        expect(map.get(otherDayOfWeek)).to.equal(1);
    });

    it('should putAll by field', () => {
        const map = new EnumMap();
        map.put(ChronoField.DAY_OF_WEEK, 7);
        const other = new EnumMap();
        other.put(otherDayOfWeek, 1);
        other.put(ChronoField.YEAR, 2020);
        map.putAll(other);
        expect(map.get(ChronoField.DAY_OF_WEEK)).to.equal(7);
        expect(map.get(otherDayOfWeek)).to.equal(1);
        expect(map.get(ChronoField.YEAR)).to.equal(2020);
    });

    it('should clear', () => {
        const map = new EnumMap();
        map.put(ChronoField.YEAR, 2020);
        map.clear();
        expect(map.keys()).to.eql([]);
    });

    it('should handle fields named like Object.prototype members', () => {
        const constructorField = { name: () => 'constructor', toString: () => 'constructor[field]' };
        const map = new EnumMap();
        expect(map.containsKey(constructorField)).to.equal(false);
        expect(map.get(constructorField)).to.equal(undefined);
        expect(map.remove(constructorField)).to.equal(undefined);
        map.put(constructorField, 1);
        expect(map.get(constructorField)).to.equal(1);
        expect(map.keys()).to.eql([constructorField]);
    });

    it('should drop the name of a removed field', () => {
        const map = new EnumMap();
        map.put(ChronoField.DAY_OF_WEEK, 7);
        map.put(otherDayOfWeek, 1);
        map.remove(ChronoField.DAY_OF_WEEK);
        expect(Object.keys(map._map)).to.eql(['DayOfWeek']);
        map.remove(otherDayOfWeek);
        expect(Object.keys(map._map)).to.eql([]);
    });

    it('should print its entries', () => {
        const map = new EnumMap();
        map.put(ChronoField.YEAR, 2020);
        map.put(otherDayOfWeek, 1);
        expect(map.toString()).to.equal('{Year=2020, DayOfWeek[other]=1}');
    });
});
