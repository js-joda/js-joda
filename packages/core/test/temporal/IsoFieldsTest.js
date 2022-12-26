import { expect } from 'chai';

import '../_init';

import { IsoFields, TemporalField, TemporalUnit } from '../../src/js-joda';

describe('js-joda IsoFields', () => {
    describe('toString', () => {
        it('returns a string', () => {
            for (const field of allIsoFields()) {
                expect(field.toString()).to.be.string;
            }
            for (const field of allIsoUnits()) {
                expect(field.toString()).to.be.string;
            }
        });
    });
});

function allIsoFields() {
    const fields = [];
    for (const key in IsoFields) {
        if (
            Object.prototype.hasOwnProperty.call(IsoFields, key) &&
            IsoFields[key] instanceof TemporalField
        ) {
            fields.push(IsoFields[key]);
        }
    }
    return fields;
}

function allIsoUnits() {
    const fields = [];
    for (const key in IsoFields) {
        if (
            Object.prototype.hasOwnProperty.call(IsoFields, key) &&
            IsoFields[key] instanceof TemporalUnit
        ) {
            fields.push(IsoFields[key]);
        }
    }
    return fields;
}
