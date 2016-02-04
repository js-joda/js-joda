/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER} from '../MathUtil';
import { TemporalField } from './TemporalField';
import { ValueRange } from './ValueRange';
import {Year} from '../Year';

export class ChronoField extends TemporalField {

    constructor(name, baseUnit, rangeUnit, range) {
        super();
        this._name = name;
        this._baseUnit = baseUnit;
        this._rangeUnit = rangeUnit;
        this._range = range;
    }        

    name(){
        return this._name;    
    }
    
    baseUnit(){
        return this._baseUnit;    
    }
    
    rangeUnit(){
        return this._rangeUnit;    
    }
    
    range(){
        return this._range;    
    }
    
    displayName(){
        return this.toString();    
    }
    
    checkValidValue(value) {
        return this.range().checkValidValue(value, this.name());
    }
    
    /**
     * Get the range of valid values for this field using the temporal object to
     * refine the result.
     * <p>
     * This uses the temporal object to find the range of valid values for the field.
     * This is similar to {@link #range()}, however this method refines the result
     * using the temporal. For example, if the field is {@code DAY_OF_MONTH} the
     * {@code range} method is not accurate as there are four possible month lengths,
     * 28, 29, 30 and 31 days. Using this method with a date allows the range to be
     * accurate, returning just one of those four options.
     * <p>
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link TemporalAccessor#range(TemporalField)}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisField.rangeRefinedBy(temporal);
     *   temporal = temporal.range(thisField);
     * </pre>
     * It is recommended to use the second approach, {@code range(TemporalField)},
     * as it is a lot clearer to read in code.
     * <p>
     * Implementations should perform any queries or calculations using the fields
     * available in {@link ChronoField}.
     * If the field is not supported a {@code DateTimeException} must be thrown.
     *
     * @param {TemporalAccessor} temporal  the temporal object used to refine the result, not null
     * @return {Va;lueRange} the range of valid values for this field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    rangeRefinedBy(temporal) {
        return temporal.range(this);
    }

    getFrom(temporal) {
        return temporal.getLong(this);
    }

    toString(){
        return this.name();
    }

    equals(other){
        return this === other;
    }
}

// TODO: why can't we use ChronoUnit.NANOS, ... in these initializers??
//ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', ChronoUnit.NANOS, ChronoUnit.SECONDS, ValueRange.of(0, 999999999));
ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', null, null, ValueRange.of(0, 999999999));

ChronoField.MICRO_OF_SECOND = new ChronoField('MicroOfSecond', null, null, ValueRange.of(0, 999999));

ChronoField.MILLI_OF_SECOND = new ChronoField('MilliOfSecond', null, null, ValueRange.of(0, 999));

ChronoField.DAY_OF_MONTH = new ChronoField('DayOfMonth', null, null, ValueRange.of(1, 28, 31), 'day');

ChronoField.MONTH_OF_YEAR = new ChronoField('MonthOfYear', null, null, ValueRange.of(1, 12), 'month');

ChronoField.YEAR = new ChronoField('Year', null, null, ValueRange.of(Year.MIN_VALUE, Year.MAX_VALUE), 'year');

ChronoField.INSTANT_SECONDS = new ChronoField('InstantSeconds', null, null, ValueRange.of(MIN_SAFE_INTEGER, MAX_SAFE_INTEGER));
    


