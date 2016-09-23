/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {TemporalAccessor} from './TemporalAccessor';

/**
 * Framework-level interface defining read-write access to a temporal object,
 * such as a date, time, offset or some combination of these.
 * <p>
 * This is the base interface type for date, time and offset objects that
 * are complete enough to be manipulated using plus and minus.
 * It is implemented by those classes that can provide and manipulate information
 * as {@link TemporalField fields} or {@link TemporalQuery queries}.
 * See {@link TemporalAccessor} for the read-only version of this interface.
 * <p>
 * Most date and time information can be represented as a number.
 * These are modeled using {@code TemporalField} with the number held using
 * a {@code long} to handle large values. Year, month and day-of-month are
 * simple examples of fields, but they also include instant and offsets.
 * See {@link ChronoField} for the standard set of fields.
 * <p>
 * Two pieces of date/time information cannot be represented by numbers,
 * the {@link Chronology chronology} and the {@link ZoneId time-zone}.
 * These can be accessed via {@link #query(TemporalQuery) queries} using
 * the static methods defined on {@link TemporalQueries}.
 * <p>
 * This interface is a framework-level interface that should not be widely
 * used in application code. Instead, applications should create and pass
 * around instances of concrete types, such as {@code LocalDate}.
 * There are many reasons for this, part of which is that implementations
 * of this interface may be in calendar systems other than ISO.
 * See {@link ChronoLocalDate} for a fuller discussion of the issues.
 *
 * <h3>When to implement</h3>
 * <p>
 * A class should implement this interface if it meets three criteria:
 * <p><ul>
 * <li>it provides access to date/time/offset information, as per {@code TemporalAccessor}
 * <li>the set of fields are contiguous from the largest to the smallest
 * <li>the set of fields are complete, such that no other field is needed to define the
 *  valid range of values for the fields that are represented
 * </ul><p>
 * <p>
 * Four examples make this clear:
 * <p><ul>
 * <li>{@code LocalDate} implements this interface as it represents a set of fields
 *  that are contiguous from days to forever and require no external information to determine
 *  the validity of each date. It is therefore able to implement plus/minus correctly.
 * <li>{@code LocalTime} implements this interface as it represents a set of fields
 *  that are contiguous from nanos to within days and require no external information to determine
 *  validity. It is able to implement plus/minus correctly, by wrapping around the day.
 * <li>{@code MonthDay}, the combination of month-of-year and day-of-month, does not implement
 *  this interface.  While the combination is contiguous, from days to months within years,
 *  the combination does not have sufficient information to define the valid range of values
 *  for day-of-month.  As such, it is unable to implement plus/minus correctly.
 * <li>The combination day-of-week and day-of-month ("Friday the 13th") should not implement
 *  this interface. It does not represent a contiguous set of fields, as days to weeks overlaps
 *  days to months.
 * </ul><p>
 *
 * @interface
 */
export class Temporal extends TemporalAccessor {}
