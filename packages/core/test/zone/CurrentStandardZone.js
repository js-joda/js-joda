/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {LocalDate} from '../../src/LocalDate';
import {DayOfWeek} from '../../src/DayOfWeek';
import {Month} from '../../src/Month';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';
import {Instant} from '../../src/Instant';
import {TemporalAdjusters} from '../../src/temporal/TemporalAdjusters';
import {ZoneOffsetTransition} from '../../src/zone/ZoneOffsetTransition';
import {ZoneRules} from '../../src/zone/ZoneRules';

class CurrentStandardZone extends ZoneId {

    constructor(id, winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition){
        super();
        this._id = id;
        this._rules = new CurrentStandardZoneRules(winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition);
    }

    rules(){
        return this._rules;
    }

    equals(other){
        if(this === other){
            return true;
        }
        return false;
    }

    id(){
        this._id;
    }

    toString(){
        return this._id;
    }
}

class CurrentStandardZoneRules extends ZoneRules {

    constructor(winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition){
        super();
        this._winterOffset = winterOffset;
        this._summerOffset = summerOffset;
        this._localDateOfwinterSummerTransition = localDateOfwinterSummerTransition;
        this._localDateOfSummerWinterTransition  = localDateOfSummerWinterTransition;
    }

    isFixedOffset(){
        return false;
    }

    /**
     *
     * @param {Instant} instant
     * @returns {ZoneOffset}
     */
    offsetOfInstant(instant){
        const year = yearOfInstant(instant);
        const winterSummerTransition = this._localDateOfwinterSummerTransition(year)
            .minusSeconds(this._winterOffset.totalSeconds())
            .toInstant(ZoneOffset.UTC);
        const summerWinterTransition = this._localDateOfSummerWinterTransition(year)
            .minusHours(1)
            .minusSeconds(this._winterOffset.totalSeconds())
            .toInstant(ZoneOffset.UTC);

        if (instant.isBefore(winterSummerTransition) || ! instant.isBefore(summerWinterTransition)){
            return this._winterOffset;
        } else {
            return this._summerOffset;
        }
    }

    /**
     *
     * @param {number} epochMilli
     * @returns {ZoneOffset}
     */
    offsetOfEpochMilli(epochMilli){
        return this.offsetOfInstant(Instant.ofEpochMilli(epochMilli));
    }

    /**
     * see {@link ZoneRules.offsetOfLocalDateTime}
     * @param {LocalDateTime} localDateTime
     * @returns {ZoneOffset}
     */
    offsetOfLocalDateTime(localDateTime){
        const year = localDateTime.year();
        const winterSummerTransition = this._localDateOfwinterSummerTransition(year);
        const summerWinterTransition = this._localDateOfSummerWinterTransition (year).minusHours(1);
        if (localDateTime.isBefore(winterSummerTransition) || localDateTime.compareTo(summerWinterTransition.plusHours(1)) >= 0){
            return this._winterOffset;
        } else if (localDateTime.compareTo(winterSummerTransition.plusHours(1)) >= 0 && localDateTime.isBefore(summerWinterTransition)){
            return this._summerOffset;
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 && localDateTime.isBefore(summerWinterTransition.plusHours(1))){
            // overlap! best value is SUMMER_OFFSET
            return this._summerOffset;
        } else {
            // gap! best value is WINTER_OFFSET
            return this._winterOffset;
        }
    }

    /**
     *
     * @param {LocalDateTime} localDateTime
     * @return {ZoneOffsetTransition}
     */
    transition(localDateTime){
        const year = localDateTime.year();
        const winterSummerTransition = this._localDateOfwinterSummerTransition(year);
        const summerWinterTransition = this._localDateOfSummerWinterTransition (year).minusHours(1);
        if(localDateTime.compareTo(winterSummerTransition) >= 0 &&
                localDateTime.isBefore(winterSummerTransition.plusHours(1))) {
            // gap
            return ZoneOffsetTransition.of(winterSummerTransition, this._winterOffset, this._summerOffset);
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 &&
                localDateTime.isBefore(summerWinterTransition.plusHours(1))) {
            // overlap
            return ZoneOffsetTransition.of(summerWinterTransition, this._summerOffset, this._winterOffset);
        }
        return null;
    }

    /**
     *
     * @param localDateTime
     * @return {[ZoneOffset]}
     */
    validOffsets(localDateTime){
        const transition = this.transition(localDateTime);
        if(transition != null) {
            return transition.validOffsets();
        } else {
            return [this.offsetOfLocalDateTime(localDateTime)];
        }
    }

    /**
     *
     * @param {LocalDateTime} dateTime
     * @param {ZoneOffset} offset
     * @return {boolean}
     */
    isValidOffset(dateTime, offset) {
        return this.validOffsets(dateTime).some((validOffset) => {
            return validOffset.equals(offset);
        });
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param {*} other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other || other instanceof CurrentStandardZoneRules) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return 'CurrentStandardZoneRules[' +
            this._winterOffset.toString() + ':' +
            this._summerOffset.toString() + ']';
    }

}

function yearOfInstant(instant){
    return LocalDate.ofInstant(instant, ZoneOffset.UTC).year();
}

export class CurrentStandardZoneEuropeBerlin extends CurrentStandardZone{
    constructor(){
        super(
            'Pseudo/Europe/Berlin',
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(2),
            (year) => {
                return this.lastSundayOfMonthAtStartOfDay(year, Month.MARCH).plusHours(2);
            },
            (year) => {
                return this.lastSundayOfMonthAtStartOfDay(year, Month.OCTOBER).plusHours(3);
            }
        );
    }

    _validate(year){
        if (year < 1996 || year > 2016) {
            throw Error(`year ${year} not supported by pseudo berlin time`);
        }
    }

    lastSundayOfMonthAtStartOfDay(year, month){
        this._validate(year);
        return LocalDate
            .of(year, 1, 1)
            .withMonth(month)
            .with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY))
            .atStartOfDay();
    }

}

export class CurrentStandardZoneAmericaNew_York extends CurrentStandardZone{
    constructor(){
        super(
            'Pseudo/America/New_York',
            ZoneOffset.ofHours(-5),
            ZoneOffset.ofHours(-4),
            (year) => this.secondSundayOfMarchAtStartOfDay(year).plusHours(2),
            (year) => this.firstSundayOfNovemberAtStartOfDay(year).plusHours(2)
        );
    }

    _validate(year){
        if (year < 2007 || year > 2016) {
            throw Error(`year ${year} not supported by pseudo new york time`);
        }
    }

    secondSundayOfMarchAtStartOfDay(year){
        this._validate(year);
        return LocalDate
            .of(year, 1, 1)
            .withMonth(Month.MARCH)
            .with(TemporalAdjusters.firstInMonth(DayOfWeek.SUNDAY))
            .with(TemporalAdjusters.next(DayOfWeek.SUNDAY))
            .atStartOfDay();
    }

    firstSundayOfNovemberAtStartOfDay(year){
        this._validate(year);
        return LocalDate
            .of(year, 1, 1)
            .withMonth(Month.NOVEMBER)
            .with(TemporalAdjusters.firstInMonth(DayOfWeek.SUNDAY))
            .atStartOfDay();
    }

}

export class CurrentStandardZoneAsiaGaza extends CurrentStandardZone{
    constructor(){
        super(
            'Pseudo/Asia/Gaza',
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(3),
            (year) => this.winterSummerTransition(year),
            (year) => this.summerWinterTransition(year)
        );
    }

    winterSummerTransition(year){
        switch (year) {
            case 2007: return LocalDate.of(2007, 4, 1).atStartOfDay();
        }
        throw Error(`year ${year} not supported by pseudo gaza time`);
    }

    summerWinterTransition(year){
        switch (year) {
            case 2007: return LocalDate.of(2007, 9, 13).atStartOfDay();
        }
        throw Error(`year ${year} not supported by pseudo gaza time`);
    }

}


export class CurrentStandardZoneEuropeParis extends CurrentStandardZone{
    constructor(){
        super(
            'Pseudo/Europe/Paris',
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(2),
            (year) => {
                return this.lastSundayOfMonthAtStartOfDay(year, Month.MARCH).plusHours(2);
            },
            (year) => {
                return this.lastSundayOfMonthAtStartOfDay(year, Month.OCTOBER).plusHours(3);
            }
        );
    }

    lastSundayOfMonthAtStartOfDay(year, month){
        return LocalDate
            .of(year, 1, 1)
            .withMonth(month)
            .with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY))
            .atStartOfDay();
    }

}
