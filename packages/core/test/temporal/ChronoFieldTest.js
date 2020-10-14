import { expect } from 'chai';

import '../_init';

import {LocalDate} from '../../src/LocalDate';
import {ChronoField} from '../../src/temporal/ChronoField';

describe('js-joda ChronoField', () => {
    describe('adjustInto', () => {
        it('should return a new temporal with the field of this kind set', () => {
            const temporal = LocalDate.of(2020, 6, 13);

            const result = ChronoField.DAY_OF_MONTH.adjustInto(temporal, 20);

            expect(LocalDate.of(2020, 6, 20).equals(result)).to.equal(true);
        });
    });

    describe('isSupportedBy', () => {
        const temporal = LocalDate.of(2020, 6, 13);

        it('should return true if supported by temporal', () => {
            expect(ChronoField.DAY_OF_MONTH.isSupportedBy(temporal)).to.equal(true);
            expect(ChronoField.YEAR.isSupportedBy(temporal)).to.equal(true);
        });

        it('should return false if unsupported by temporal', () => {
            expect(ChronoField.HOUR_OF_DAY.isSupportedBy(temporal)).to.equal(false);
            expect(ChronoField.INSTANT_SECONDS.isSupportedBy(temporal)).to.equal(false);
        });
    });

    describe('checkValidValue', () => {
        it('should return the given value if valid', () => {
            const fields = allChronoFields();

            for (const field of fields) {
                const value = field.range().largestMinimum();

                expect(field.checkValidValue(value)).to.eq(value);
            }
        });
    });
});

function allChronoFields() {
    const fields = [];
    for (const key in ChronoField) {
        if (
            Object.prototype.hasOwnProperty.call(ChronoField, key) &&
            ChronoField[key] instanceof ChronoField
        ) {
            fields.push(ChronoField[key]);
        }
    }
    return fields;
}
