import {
    ChronoField,
    DateTimeException,
    LocalDate,
    ValueRange
} from '@js-joda/core';

/**
 * The Coptic calendar system.
 * 
 * This chronology defines the rules of the Coptic calendar system.
 * This calendar system is primarily used in Christian Egypt.
 * Dates are aligned such that 0001-01-01 (Coptic) is 0284-08-29 (ISO).
 */
export class CopticChronology {
    /**
     * Restricted constructor.
     * @private
     */
    constructor() {
        if (CopticChronology._INSTANCE) {
            throw new Error('Singleton instance already exists');
        }
    }

    /**
     * Gets the ID of the chronology - 'Coptic'.
     * @returns {string} the chronology ID
     */
    getId() {
        return 'Coptic';
    }

    /**
     * Gets the calendar type - 'coptic'.
     * @returns {string} the calendar type
     */
    getCalendarType() {
        return 'coptic';
    }

    /**
     * Checks if the specified year is a leap year.
     * @param {number} prolepticYear the proleptic year to check
     * @returns {boolean} true if the year is a leap year
     */
    isLeapYear(prolepticYear) {
        return Math.floor(Math.abs(prolepticYear) % 4) === 3;
    }

    /**
     * Creates a date in the Coptic calendar system from the era, year-of-era,
     * month-of-year and day-of-month fields.
     */
    date(era, yearOfEra, month, dayOfMonth) {
        if (!(era instanceof CopticEra)) {
            throw new Error('Era must be CopticEra');
        }
        
        const prolepticYear = (era === CopticEra.AM) ? yearOfEra : 1 - yearOfEra;
        return this.dateYmd(prolepticYear, month, dayOfMonth);
    }

    /**
     * Creates a date in the Coptic calendar system from the proleptic-year,
     * month-of-year and day-of-month fields.
     */
    dateYmd(prolepticYear, month, dayOfMonth) {
        return CopticDate.of(prolepticYear, month, dayOfMonth);
    }
}

// Initialize static properties
CopticChronology._INSTANCE = new CopticChronology();
CopticChronology.INSTANCE = CopticChronology._INSTANCE;
CopticChronology.EPOCH_DAY_DIFFERENCE = 574971 + 40587;  // MJD values
CopticChronology.MOY_RANGE = ValueRange.of(1, 13);
CopticChronology.DOM_RANGE = ValueRange.of(1, 30);
CopticChronology.YEAR_RANGE = ValueRange.of(-999999999, 999999999);

/**
 * An era in the Coptic calendar system.
 */
export class CopticEra {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * Gets the numeric value of the era.
     * @returns {number} the era value
     */
    getValue() {
        return this.value;
    }

    /**
     * Obtains an instance of CopticEra from an value.
     * @param {number} eraValue the era value
     * @returns {CopticEra} the era
     */
    static of(eraValue) {
        switch (eraValue) {
            case 0: return CopticEra.BEFORE_AM;
            case 1: return CopticEra.AM;
            default:
                throw new DateTimeException(`Invalid era: ${eraValue}`);
        }
    }
}

// Initialize static properties
CopticEra.BEFORE_AM = new CopticEra('BEFORE_AM', 0);
CopticEra.AM = new CopticEra('AM', 1);

/**
 * A date in the Coptic calendar system.
 */
export class CopticDate {
    /**
     * Creates an instance of CopticDate.
     * @param {number} prolepticYear the proleptic year
     * @param {number} month the month
     * @param {number} day the day
     */
    constructor(prolepticYear, month, day) {
        this._prolepticYear = prolepticYear;
        this._month = month;
        this._day = day;
    }

    /**
     * Obtains an instance of CopticDate from year, month and day fields.
     */
    static of(prolepticYear, month, day) {
        CopticChronology.YEAR_RANGE.checkValidValue(prolepticYear, ChronoField.YEAR);
        CopticChronology.MOY_RANGE.checkValidValue(month, ChronoField.MONTH_OF_YEAR);
        CopticChronology.DOM_RANGE.checkValidValue(day, ChronoField.DAY_OF_MONTH);

        if (month === 13 && day > 5) {
            if (CopticChronology.INSTANCE.isLeapYear(prolepticYear)) {
                if (day > 6) {
                    throw new DateTimeException(`Invalid date Nasie ${day}`);
                }
            } else {
                if (day === 6) {
                    throw new DateTimeException(`Invalid date Nasie 6 as ${prolepticYear} is not a leap year`);
                }
                throw new DateTimeException(`Invalid date Nasie ${day}`);
            }
        }

        return new CopticDate(prolepticYear, month, day);
    }

    /**
     * Obtains an instance of CopticDate from the epoch day count.
     */
    static ofEpochDay(epochDay) {
        let copticEpochDay = epochDay + CopticChronology.EPOCH_DAY_DIFFERENCE;
        let adjustment = 0;

        if (copticEpochDay < 0) {
            copticEpochDay = copticEpochDay + (1461 * Math.floor(1000000 / 4));
            adjustment = -1000000;
        }

        const prolepticYear = Math.floor(((copticEpochDay * 4) + 1463) / 1461);
        const startYearEpochDay = (prolepticYear - 1) * 365 + Math.floor(prolepticYear / 4);
        const doy0 = copticEpochDay - startYearEpochDay;
        
        const month = Math.floor(doy0 / 30) + 1;
        const day = (doy0 % 30) + 1;

        return new CopticDate(prolepticYear + adjustment, month, day);
    }

    /**
     * Gets the chronology of this date.
     */
    getChronology() {
        return CopticChronology.INSTANCE;
    }

    /**
     * Gets the era applicable at this date.
     */
    getEra() {
        return (this._prolepticYear >= 1 ? CopticEra.AM : CopticEra.BEFORE_AM);
    }

    /**
     * Gets the year value.
     */
    getYear() {
        return this._prolepticYear;
    }

    /**
     * Gets the month-of-year value.
     */
    getMonth() {
        return this._month;
    }

    /**
     * Gets the day-of-month value.
     */
    getDayOfMonth() {
        return this._day;
    }

    /**
     * Converts this date to the equivalent ISO local date.
     */
    toLocalDate() {
        const epochDay = this.toEpochDay();
        return LocalDate.ofEpochDay(epochDay);
    }

    /**
     * Converts this date to an epoch day.
     */
    toEpochDay() {
        const year = this._prolepticYear;
        const month = this._month;
        const day = this._day;

        const dayOfYear = (month - 1) * 30 + day;
        const copticEpochDay = (year - 1) * 365 + Math.floor((year - 1) / 4) + dayOfYear - 1;
        
        return copticEpochDay - CopticChronology.EPOCH_DAY_DIFFERENCE;
    }
}