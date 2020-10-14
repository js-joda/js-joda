/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException} from '../../../src/errors';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {TemporalAccessor} from '../../../src/temporal/TemporalAccessor';

/**
 * Mock simple date-time with one field-value.
 */
export class MockFieldValue extends TemporalAccessor {

    constructor(field, value) {
        super();
        this._field = field;
        this._value = value;
    }

    isSupported(field) {
        return field != null && field.equals(this._field);
    }

    range(field) {
        if (field instanceof ChronoField) {
            if (this.isSupported(field)) {
                return field.range();
            }
            throw new DateTimeException('Unsupported field: ' + field);
        }
        return field.rangeRefinedBy(this);
    }

    getLong(field) {
        if (this._field.equals(field)) {
            return this._value;
        }
        throw new DateTimeException('Unsupported field: ' + field);
    }

}
