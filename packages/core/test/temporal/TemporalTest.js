import { expect } from 'chai';

import '../_init';

import {LocalDate} from '../../src/LocalDate';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Period} from '../../src/Period';
import {ChronoField} from '../../src/temporal/ChronoField';

describe('js-joda Temporal', () => {
    describe('isSupported', () => {
        const temporal = LocalDate.of(2019, 5, 4);

        it('should return true for supported units', () => {
            expect(temporal.isSupported(ChronoUnit.DECADES)).to.equal(true);
            expect(temporal.isSupported(ChronoUnit.YEARS)).to.equal(true);
            expect(temporal.isSupported(ChronoUnit.MONTHS)).to.equal(true);
            expect(temporal.isSupported(ChronoUnit.DAYS)).to.equal(true);
        });

        it('should return false for unsupported units', () => {
            expect(temporal.isSupported(ChronoUnit.HOURS)).to.equal(false);
            expect(temporal.isSupported(ChronoUnit.MINUTES)).to.equal(false);
            expect(temporal.isSupported(ChronoUnit.SECONDS)).to.equal(false);
            expect(temporal.isSupported(ChronoUnit.MILLIS)).to.equal(false);
        });
    });

    describe('minus', () => {
        const temporal = LocalDate.of(2019, 5, 4);

        it('should subtract a temporal amount', () => {
            const result = temporal.minus(Period.ofMonths(2));

            expect(LocalDate.of(2019, 3, 4).equals(result)).to.equal(true);
        });

        it('should subtract a value of a given unit', () => {
            const result = temporal.minus(2, ChronoUnit.MONTHS);

            expect(LocalDate.of(2019, 3, 4).equals(result)).to.equal(true);
        });
    });

    describe('plus', () => {
        const temporal = LocalDate.of(2019, 5, 4);

        it('should add a temporal amount', () => {
            const result = temporal.plus(Period.ofMonths(2));

            expect(LocalDate.of(2019, 7, 4).equals(result)).to.equal(true);
        });

        it('should add a value of a given unit', () => {
            const result = temporal.plus(2, ChronoUnit.MONTHS);

            expect(LocalDate.of(2019, 7, 4).equals(result)).to.equal(true);
        });
    });

    describe('until', () => {
        const temporal = LocalDate.of(2019, 5, 4);

        it('should return the difference in a given unit', () => {
            const result = temporal.until(LocalDate.of(2020, 1, 4), ChronoUnit.MONTHS);

            expect(result).to.equal(8);
        });
    });

    describe('with', () => {
        const temporal = LocalDate.of(2019, 5, 4);

        it('should be adjusted by a temporal adjuster', () => {
            const nextYearAdjuster = {
                adjustInto(temporal) {
                    if (temporal.isSupported(ChronoUnit.YEARS)) {
                        return temporal.plus(1, ChronoUnit.YEARS);
                    }
                    throw new Error('unsupported');
                }
            };

            const result = temporal.with(nextYearAdjuster);

            expect(LocalDate.of(2020, 5, 4).equals(result)).to.equal(true);
        });

        it('should change the given field', () => {
            const result = temporal.with(ChronoField.MONTH_OF_YEAR, 10);

            expect(LocalDate.of(2019, 10, 4).equals(result)).to.equal(true);
        });
    });
});
