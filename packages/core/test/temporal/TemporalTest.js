import { expect } from 'chai';

import '../_init';

import {Temporal } from '../../src/temporal/Temporal';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Period} from '../../src/Period';
import {ChronoField} from '../../src/temporal/ChronoField';
import {TemporalField} from '../../src/temporal/TemporalField';
import {UnsupportedTemporalTypeException} from '../../src/errors';
import {MathUtil} from '../../src/MathUtil';

// NOTE: This is an incomplete implementation!
class BasicYearMock extends Temporal {
    constructor(value) {
        super();
        this._value = value;
    }

    isSupported(fieldOrUnit) {
        if (fieldOrUnit instanceof TemporalField) {
            return fieldOrUnit === ChronoField.YEAR;
        } else {
            return fieldOrUnit === ChronoUnit.YEARS;
        }
    }

    getLong(field) {
        if (field === ChronoField.YEAR) return this._value;
        else throw new UnsupportedTemporalTypeException(`Unsupported field: ${  field}`);
    }

    _plusUnit(amount, unit) {
        if (!this.isSupported(unit)) {
            UnsupportedTemporalTypeException(`Unsupported unit: ${  unit}`);
        }
        return new BasicYearMock(this._value + amount);
    }

    _withField(field, newValue) {
        this.get(field); // will throw if unsupported
        return new BasicYearMock(newValue);
    }

    equals(other) {
        return other instanceof BasicYearMock && other._value === this._value;
    }
}

describe('js-joda Temporal', () => {
    describe('minus', () => {
        const temporal = new BasicYearMock(10);

        it('should subtract a temporal amount', () => {
            const result = temporal.minus(Period.ofYears(3));

            expect(new BasicYearMock(7).equals(result)).to.equal(true);
        });

        it('should subtract a value of a given unit', () => {
            const result = temporal.minus(2, ChronoUnit.YEARS);

            expect(new BasicYearMock(8).equals(result)).to.equal(true);
        });

        it('should subtract MIN_SAFE_INTEGER of a given value', () => {
            const result = new BasicYearMock(0)
                .minus(MathUtil.MIN_SAFE_INTEGER, ChronoUnit.YEARS);

            console.log(result, new BasicYearMock(MathUtil.MAX_SAFE_INTEGER));

            expect(new BasicYearMock(MathUtil.MAX_SAFE_INTEGER).equals(result)).to.equal(true);
        });
    });

    describe('plus', () => {
        const temporal = new BasicYearMock(10);

        it('should add a temporal amount', () => {
            const result = temporal.plus(Period.ofYears(5));

            expect(new BasicYearMock(15).equals(result)).to.equal(true);
        });

        it('should add a value of a given unit', () => {
            const result = temporal.plus(4, ChronoUnit.YEARS);

            expect(new BasicYearMock(14).equals(result)).to.equal(true);
        });
    });

    describe('with', () => {
        const temporal = new BasicYearMock(10);

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

            expect(new BasicYearMock(11).equals(result)).to.equal(true);
        });

        it('should change the given field', () => {
            const result = temporal.with(ChronoField.YEAR, 2);

            expect(new BasicYearMock(2).equals(result)).to.equal(true);
        });
    });
});
