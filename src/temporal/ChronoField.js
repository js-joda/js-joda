import { ValueRange } from './ValueRange';
import {Year} from '../Year'

class  ChronoField {

    constructor(name, baseUnit, rangeUnit, range, displayNameKey) {
        this.name = function () {
            return name;
        };
        this.baseUnit = function () {
            return baseUnit;
        };
        this.rangeUnit = function () {
            return rangeUnit;
        };
        this.range = function () {
            return range;
        };
        this.displayNameKey = function () {
            return displayNameKey;
        };
    }

    checkValidValue(value) {
        return this.range().checkValidValue(value, this.name());
    }
}


export const DAY_OF_MONTH = new ChronoField(
    "DayOfMonth", null, null, ValueRange.of(1, 28, 31), "day"
);

export const MONTH_OF_YEAR = new ChronoField(
    "MonthOfYear", null, null, ValueRange.of(1, 12), "month"
);

export const YEAR = new ChronoField("" +
    "Year", null, null, ValueRange.of(Year.MIN_VALUE, Year.MAX_VALUE), "year"
);


