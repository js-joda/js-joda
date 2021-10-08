/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ChronoUnit } from '../../src/temporal/ChronoUnit';
import { TemporalAmount } from '../../src/temporal/TemporalAmount';

export class MockSimplePeriod extends TemporalAmount {
    constructor(amount, unit) {
        super();
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

/**
 * A constant for a period of zero, measured in days.
 */
MockSimplePeriod.ZERO_DAYS = new MockSimplePeriod(0, ChronoUnit.DAYS);
