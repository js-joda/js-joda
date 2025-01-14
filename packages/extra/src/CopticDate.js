/**
 * A date in the Coptic calendar system.
 * 
 * This date operates using the Coptic calendar.
 * This calendar system is primarily used in Christian Egypt.
 * Dates are aligned such that 0001-01-01 (Coptic) is 0284-08-29 (ISO).
 */
class CopticDate {
    /**
     * Create a CopticDate instance
     * @param {number} prolepticYear - The Coptic proleptic year
     * @param {number} month - The Coptic month (1-13)
     * @param {number} day - The day of month
     */
    constructor(prolepticYear, month, day) {
        this.prolepticYear = prolepticYear;
        this.month = month;
        this.day = day;
    }

    /**
     * Get current date in Coptic calendar
     * @returns {CopticDate}
     */
    static now() {
        const today = new Date();
        const epochDay = Math.floor(today.getTime() / (24 * 60 * 60 * 1000));
        return CopticDate.ofEpochDay(epochDay);
    }

    /**
     * Create a CopticDate from year, month, and day
     * @param {number} prolepticYear 
     * @param {number} month 
     * @param {number} dayOfMonth 
     * @returns {CopticDate}
     */
    static of(prolepticYear, month, dayOfMonth) {
        return CopticDate.create(prolepticYear, month, dayOfMonth);
    }

    /**
     * Create a CopticDate from epoch day
     * @param {number} epochDay 
     * @returns {CopticDate}
     */
    static ofEpochDay(epochDay) {
        let copticED = epochDay + CopticDate.EPOCH_DAY_DIFFERENCE;
        let adjustment = 0;

        if (copticED < 0) {
            copticED = copticED + (1461 * (1000000 / 4));
            adjustment = -1000000;
        }

        const prolepticYear = Math.floor(((copticED * 4) + 1463) / 1461);
        const startYearEpochDay = (prolepticYear - 1) * 365 + Math.floor(prolepticYear / 4);
        const doy0 = copticED - startYearEpochDay;
        const month = Math.floor(doy0 / 30) + 1;
        const dom = (doy0 % 30) + 1;

        return new CopticDate(prolepticYear + adjustment, month, dom);
    }

    /**
     * Create a validated CopticDate
     * @param {number} prolepticYear 
     * @param {number} month 
     * @param {number} dayOfMonth 
     * @returns {CopticDate}
     */
    static create(prolepticYear, month, dayOfMonth) {
        // Validation
        if (month < 1 || month > 13) {
            throw new Error('Month must be between 1 and 13');
        }
        if (dayOfMonth < 1 || dayOfMonth > 30) {
            throw new Error('Day must be between 1 and 30');
        }
        if (month === 13) {
            const isLeapYear = CopticDate.isLeapYear(prolepticYear);
            const maxDays = isLeapYear ? 6 : 5;
            if (dayOfMonth > maxDays) {
                throw new Error(`Invalid date 'Nasie ${dayOfMonth}', valid range from 1 to ${maxDays} in ${isLeapYear ? 'a leap' : 'a non-leap'} year`);
            }
        }

        return new CopticDate(prolepticYear, month, dayOfMonth);
    }

    /**
     * Check if the given year is a leap year
     * @param {number} prolepticYear 
     * @returns {boolean}
     */
    static isLeapYear(prolepticYear) {
        return prolepticYear % 4 === 3 || prolepticYear % 4 === -1;
    }

    /**
     * Get the epoch day for this date
     * @returns {number}
     */
    toEpochDay() {
        const year = this.prolepticYear;
        const month = this.month;
        const day = this.day;

        const dayOfYear = (month - 1) * 30 + day;
        const startYearEpochDay = (year - 1) * 365 + Math.floor((year - 1) / 4);
        return startYearEpochDay + dayOfYear - CopticDate.EPOCH_DAY_DIFFERENCE;
    }

    /**
     * Convert to ISO date
     * @returns {Date}
     */
    toDate() {
        const epochDay = this.toEpochDay();
        return new Date(epochDay * 24 * 60 * 60 * 1000);
    }

    /**
     * Add days to the current date
     * @param {number} days 
     * @returns {CopticDate}
     */
    plusDays(days) {
        return CopticDate.ofEpochDay(this.toEpochDay() + days);
    }

    /**
     * Add months to the current date
     * @param {number} months 
     * @returns {CopticDate}
     */
    plusMonths(months) {
        let newMonth = this.month + months;
        let yearAdjustment = Math.floor((newMonth - 1) / 13);
        newMonth = ((newMonth - 1) % 13) + 1;
        if (newMonth < 1) {
            newMonth += 13;
            yearAdjustment--;
        }
        return CopticDate.of(this.prolepticYear + yearAdjustment, newMonth, this.day);
    }

    /**
     * Add years to the current date
     * @param {number} years 
     * @returns {CopticDate}
     */
    plusYears(years) {
        return CopticDate.of(this.prolepticYear + years, this.month, this.day);
    }

    /**
     * Get string representation of the date
     * @returns {string}
     */
    toString() {
        return `${this.prolepticYear.toString().padStart(4, '0')}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
    }
}

// Define static property after class declaration
CopticDate.EPOCH_DAY_DIFFERENCE = 574971 + 40587; // MJD values

export default CopticDate;