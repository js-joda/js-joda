/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
export class IsoChronology {
    /**
     * Checks if the year is a leap year, according to the ISO proleptic
     * calendar system rules.
     *
     * This method applies the current rules for leap years across the whole time-line.
     * In general, a year is a leap year if it is divisible by four without
     * remainder. However, years divisible by 100, are not leap years, with
     * the exception of years divisible by 400 which are.
     *
     * For example, 1904 is a leap year it is divisible by 4.
     * 1900 was not a leap year as it is divisible by 100, however 2000 was a
     * leap year as it is divisible by 400.
     *
     * The calculation is proleptic - applying the same rules into the far future and far past.
     * This is historically inaccurate, but is correct for the ISO-8601 standard.
     *
     * @param {number} prolepticYear - the ISO proleptic year to check
     * @return true if the year is leap, false otherwise
     */
    static isLeapYear(prolepticYear) {
        return ((prolepticYear & 3) === 0) && ((prolepticYear % 100) !== 0 || (prolepticYear % 400) === 0);
    }
}

IsoChronology.INSTANCE = new IsoChronology();

