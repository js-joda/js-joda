/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
/**
 * A year in the ISO-8601 calendar system, such as {@code 2007}.
 * <p>
 * {@code Year} is an immutable date-time object that represents a year.
 * Any field that can be derived from a year can be obtained.
 * <p>
 * <b>Note that years in the ISO chronology only align with years in the
 * Gregorian-Julian system for modern years. Parts of Russia did not switch to the
 * modern Gregorian/ISO rules until 1920.
 * As such, historical years must be treated with caution.</b>
 * <p>
 * This class does not store or represent a month, day, time or time-zone.
 * For example, the value "2007" can be stored in a {@code Year}.
 * <p>
 * Years represented by this class follow the ISO-8601 standard and use
 * the proleptic numbering system. Year 1 is preceded by year 0, then by year -1.
 * <p>
 * The ISO-8601 calendar system is the modern civil calendar system used today
 * in most of the world. It is equivalent to the proleptic Gregorian calendar
 * system, in which today's rules for leap years are applied for all time.
 * For most applications written today, the ISO-8601 rules are entirely suitable.
 * However, any application that makes use of historical dates, and requires them
 * to be accurate will find the ISO-8601 approach unsuitable.
 *
 * <h3>Static properties of Class {@link LocalDate}</h3>
 *
 * Year.MIN_VALUE = -999.999;
 *
 * The minimum supported year. Theoretically the minimum could be -28.542.4812 years in javascript.
 * approx LocalDateTime.ofEpochSecond(Number.MIN_SAFE_INTEGER, 0, ZoneOffset.UTC).year()
 *
 * Year.MAX_VALUE = 999.999;
 *
 * The maximum supported year. Theoretically the maximum could be 285.428.751 years in javascript.
 * approx LocalDateTime.ofEpochSecond(Number.MAX_SAFE_INTEGER, 0, ZoneOffset.UTC).year()
 *
 */
export class Year {}

export function _init() {
    /**
     * The minimum supported year
     */
    Year.MIN_VALUE = -999999;
    /**
     * The maximum supported year
     */
    Year.MAX_VALUE = 999999;
}