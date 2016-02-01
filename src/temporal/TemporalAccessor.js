/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {ChronoField} from './ChronoField';
import {TemporalQueries} from './TemporalQueries';
import {UnsupportedTemporalTypeException} from '../errors';

export class TemporalAccessor {
    /**
     * Queries this date-time.
     * <p>
     * This queries this date-time using the specified query strategy object.
     * <p>
     * Queries are a key tool for extracting information from date-times.
     * They exists to externalize the process of querying, permitting different
     * approaches, as per the strategy design pattern.
     * Examples might be a query that checks if the date is the day before February 29th
     * in a leap year, or calculates the number of days to your next birthday.
     * <p>
     * The most common query implementations are method references, such as
     * {@code LocalDate::from} and {@code ZoneId::from}.
     * Further implementations are on {@link TemporalQueries}.
     * Queries may also be defined by applications.
     *
     * @implSpec
     * Implementations of this method must behave as follows:
     * <pre>
        if (query == TemporalQueries.zoneId()
            || query == TemporalQueries.chronology()
            || query == TemporalQueries.precision()) {
                return null;
        }
        return query.queryFrom(this);
     * </pre>
     *
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query
     * @throws ArithmeticException if numeric overflow occurs
     */
    query(query) {
        if (query == TemporalQueries.zoneId()
                || query == TemporalQueries.chronology()
                || query == TemporalQueries.precision()) {
            return null;
        }
        return query.queryFrom(this);
    }
    
    /**
     * Gets the range of valid values for the specified field.
     * <p>
     * All fields can be expressed as a {@code long} integer.
     * This method returns an object that describes the valid range for that value.
     * The value of this temporal object is used to enhance the accuracy of the returned range.
     * If the date-time cannot return the range, because the field is unsupported or for
     * some other reason, an exception will be thrown.
     * <p>
     * Note that the result only describes the minimum and maximum valid values
     * and it is important not to read too much into them. For example, there
     * could be values within the range that are invalid for the field.
     *
     * <h3>Specification for implementors</h3>
     * Implementations must check and handle all fields defined in {@link ChronoField}.
     * If the field is supported, then the range of the field must be returned.
     * If unsupported, then a {@code DateTimeException} must be thrown.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessorl)}
     * passing {@code this} as the argument.
     * <p>
     * Implementations must not alter either this object.
     *
     * @param {TemporalField} field  the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    range(field) {
        if (field instanceof ChronoField) {
            if (this.isSupported(field)) {
                return field.range();
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.rangeRefinedBy(this);
    }

}