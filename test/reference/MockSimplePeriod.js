/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

export class MockSimplePeriod{
    constructor(amount, unit) {
        this._amount = amount;
        this._unit = unit;
    }

    static of(amount, unit) {
        return new MockSimplePeriod(amount, unit);
    }

    addTo(dateTime) {
        return dateTime.plus(this._amount, this._unit);
    }

    subtractFrom(dateTime) {
        return dateTime.minus(this._amount, this._unit);
    }
}


