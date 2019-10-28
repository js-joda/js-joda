/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {TemporalAccessor} from './TemporalAccessor';
import { abstractMethodFail } from '../assert';

/**
 * Framework-level interface defining read-write access to a temporal object,
 * such as a date, time, offset or some combination of these.
 *
 * This is the base interface type for date, time and offset objects that
 * are complete enough to be manipulated using plus and minus.
 * It is implemented by those classes that can provide and manipulate information
 * as fields (see {@link TemporalField}) or queries (see {@link TemporalQuery}).
 * See {@link TemporalAccessor} for the read-only version of this interface.
 *
 * Most date and time information can be represented as a number.
 * These are modeled using {@link TemporalField} with the number held using
 * a `long` to handle large values. Year, month and day-of-month are
 * simple examples of fields, but they also include instant and offsets.
 * See {@link ChronoField} for the standard set of fields.
 *
 * Two pieces of date/time information cannot be represented by numbers,
 * the {@link Chronology} and the {@link ZoneId}.
 * These can be accessed using the static methods defined on {@link TemporalQueries}.
 *
 * This interface is a framework-level interface that should not be widely
 * used in application code. Instead, applications should create and pass
 * around instances of concrete types, such as {@link LocalDate}.
 * There are many reasons for this, part of which is that implementations
 * of this interface may be in calendar systems other than ISO.
 * See {@link ChronoLocalDate} for a fuller discussion of the issues.
 *
 * ### When to implement
 *
 * A class should implement this interface if it meets three criteria:
 *
 * * it provides access to date/time/offset information, as per {@link TemporalAccessor}
 * * the set of fields are contiguous from the largest to the smallest
 * * the set of fields are complete, such that no other field is needed to define the
 *   valid range of values for the fields that are represented
 *
 * Four examples make this clear:
 *
 * * {@link LocalDate} implements this interface as it represents a set of fields
 *   that are contiguous from days to forever and require no external information to determine
 *   the validity of each date. It is therefore able to implement plus/minus correctly.
 * * {@link LocalTime} implements this interface as it represents a set of fields
 *   that are contiguous from nanos to within days and require no external information to determine
 *   validity. It is able to implement plus/minus correctly, by wrapping around the day.
 * * {@link MonthDay}, the combination of month-of-year and day-of-month, does not implement
 *   this interface.  While the combination is contiguous, from days to months within years,
 *   the combination does not have sufficient information to define the valid range of values
 *   for day-of-month.  As such, it is unable to implement plus/minus correctly.
 * * The combination day-of-week and day-of-month ("Friday the 13th") should not implement
 *   this interface. It does not represent a contiguous set of fields, as days to weeks overlaps
 *   days to months.
 *
 * @interface
 */
export class Temporal extends TemporalAccessor {
    /**
     * Checks if the specified unit is supported.
     * This checks if the specified unit can be added to, or subtracted from, this date-time. If false, then calling the `plus(long, TemporalUnit)` and minus methods will throw an exception.
     *
     * ### Implementation Requirements:
     *
     * Implementations must check and handle all units defined in {@link ChronoUnit}. If the unit is supported, then true must be returned, otherwise false must be returned.
     * If the field is not a {@link ChronoUnit}, then the result of this method is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)` passing this as the argument.
     *
     * Implementations must ensure that no observable state is altered when this read-only method is invoked.
     *
     * @param {TemporalUnit} unit - the unit to check, null returns false
     * @return {boolean} true if the unit can be added/subtracted, false if not
     */
    // eslint-disable-next-line no-unused-vars
    isSupported(unit) {
        abstractMethodFail('isSupported');
    }

    /**
     * Returns an object of the same type as this object with the specified period added.
     * This method returns a new object based on this one with the specified period added. For example, on a {@link LocalDate}, this could be used to add a number of years, months or days. The returned object will have the same observable type as this object.
     *
     * In some cases, changing a field is not fully defined. For example, if the target object is a date representing the 31st January, then adding one month would be unclear. In cases like this, the field is responsible for resolving the result. Typically it will choose the previous valid date, which would be the last valid day of February in this example.
     *
     * ### Implementation Requirements:
     * Implementations must check and handle all units defined in {@link ChronoUnit}. If the unit is supported, then the addition must be performed. If unsupported, then an {@link UnsupportedTemporalTypeException} must be thrown.
     * If the unit is not a {@link ChronoUnit}, then the result of this method is obtained by invoking `TemporalUnit.addTo(Temporal, long)` passing this as the first argument.
     *
     * Implementations must not alter this object. Instead, an adjusted copy of the original must be returned. This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {number} amountToAdd - the amount of the specified unit to add, may be negative
     * @param {TemporalUnit} unit - the unit of the amount to add, not null
     * @return {Temporal} an object of the same type with the specified period added, not null
     * @throws DateTimeException - if the unit cannot be added
     * @throws UnsupportedTemporalTypeException - if the unit is not supported
     * @throws ArithmeticException - if numeric overflow occurs
     */
    // eslint-disable-next-line no-unused-vars
    plus(amountToAdd, unit) {
        abstractMethodFail('plus');
    }

    /**
     * Calculates the amount of time until another temporal in terms of the specified unit.
     * This calculates the amount of time between two temporal objects in terms of a single {@link TemporalUnit}. The start and end points are this and the specified temporal. The end point is converted to be of the same type as the start point if different. The result will be negative if the end is before the start. For example, the amount in hours between two temporal objects can be calculated using `startTime.until(endTime, HOURS)`.
     *
     * The calculation returns a whole number, representing the number of complete units between the two temporals. For example, the amount in hours between the times 11:30 and 13:29 will only be one hour as it is one minute short of two hours.
     *
     * There are two equivalent ways of using this method. The first is to invoke this method directly. The second is to use `TemporalUnit.between(Temporal, Temporal)`:
     *
     * <pre>
     *    // these two lines are equivalent
     *    temporal = start.until(end, unit);
     *    temporal = unit.between(start, end);
     * </pre>
     *
     * The choice should be made based on which makes the code more readable.
     * For example, this method allows the number of days between two dates to be calculated:
     *
     * <pre>
     *   daysBetween = start.until(end, DAYS);
     *   // or alternatively
     *   daysBetween = DAYS.between(start, end);
     * </pre>
     *
     * ### Implementation Requirements:
     * Implementations must begin by checking to ensure that the input temporal object is of the same observable type as the implementation. They must then perform the calculation for all instances of {@link ChronoUnit}. An {@link UnsupportedTemporalTypeException} must be thrown for {@link ChronoUnit} instances that are unsupported.
     * If the unit is not a {@link ChronoUnit}, then the result of this method is obtained by invoking `TemporalUnit.between(Temporal, Temporal)` passing this as the first argument and the converted input temporal as the second argument.
     *
     * In summary, implementations must behave in a manner equivalent to this pseudo-code:
     *
     * <pre>
     *   // convert the end temporal to the same type as this class
     *   if (unit instanceof ChronoUnit) {
     *     // if unit is supported, then calculate and return result
     *     // else throw UnsupportedTemporalTypeException for unsupported units
     *   }
     *   return unit.between(this, convertedEndTemporal);
     * </pre>
     *
     * Note that the unit's between method must only be invoked if the two temporal objects have exactly the same type evaluated by `getClass()`.
     *
     * Implementations must ensure that no observable state is altered when this read-only method is invoked.
     *
     * @param {Temporal} endExclusive - the end temporal, exclusive, converted to be of the same type as this object, not null
     * @param {TemporalUnit} unit - the unit to measure the amount in, not null
     * @return {number} the amount of time between this temporal object and the specified one in terms of the unit; positive if the specified object is later than this one, negative if it is earlier than this one
     * @throws DateTimeException - if the amount cannot be calculated, or the end temporal cannot be converted to the same type as this temporal
     * @throws UnsupportedTemporalTypeException - if the unit is not supported
     * @throws ArithmeticException - if numeric overflow occurs
     */
    // eslint-disable-next-line no-unused-vars
    until(endExclusive, unit) {
        abstractMethodFail('until');
    }

    /**
     * Returns an object of the same type as this object with the specified field altered.
     * This returns a new object based on this one with the value for the specified field changed. For example, on a {@link LocalDate}, this could be used to set the year, month or day-of-month. The returned object will have the same observable type as this object.
     *
     * In some cases, changing a field is not fully defined. For example, if the target object is a date representing the 31st January, then changing the month to February would be unclear. In cases like this, the field is responsible for resolving the result. Typically it will choose the previous valid date, which would be the last valid day of February in this example.
     *
     * ### Implementation Requirements:
     * Implementations must check and handle all fields defined in {@link ChronoField}. If the field is supported, then the adjustment must be performed. If unsupported, then an {@link UnsupportedTemporalTypeException} must be thrown.
     * If the field is not a {@link ChronoField}, then the result of this method is obtained by invoking `TemporalField.adjustInto(Temporal, long)` passing this as the first argument.
     *
     * Implementations must not alter this object. Instead, an adjusted copy of the original must be returned. This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {TemporalField} field - the field to set in the result, not null
     * @param {number} newValue - the new value of the field in the result
     * @return {Temporal} an object of the same type with the specified field set, not null
     * @throws DateTimeException - if the field cannot be set
     * @throws UnsupportedTemporalTypeException - if the field is not supported
     * @throws ArithmeticException - if numeric overflow occurs
     */
    // eslint-disable-next-line no-unused-vars
    with(field, newValue) {
        abstractMethodFail('with');
    }
}
