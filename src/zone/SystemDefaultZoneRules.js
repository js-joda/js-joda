/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {ZoneRules} from './ZoneRules';
import {ZoneOffset} from '../ZoneOffset';

export class SystemDefaultZoneRules extends ZoneRules {

    isFixedOffset(){
        return false;
    }

    /**
     *
     * @param {Instant} instant
     * @returns {ZoneOffset}
     */
    offsetOfInstant(instant){
        var offsetInMinutes = new Date(instant.toEpochMilli()).getTimezoneOffset();
        return ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
    }

    /**
     *
     * @param {number} epochMilli
     * @returns {ZoneOffset}
     */
    offsetOfEpochMilli(epochMilli){
        var offsetInMinutes = new Date(epochMilli).getTimezoneOffset();
        return ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
    }

    /**
     * This implementation is NOT returning the best value in a gap or overlap situation
     * as specified at {@link ZoneRules.offsetOfLocalDateTime}.
     *
     * The calculated offset depends Date.prototype.getTimezoneOffset and its not specified
     * at the ECMA-262 specification how to handle daylight savings gaps/ overlaps.
     *
     * The Chrome Browser version 49 is returning the next transition offset in a gap/overlap situation,
     * other browsers/ engines might do it in the same way.
     *
     * @param {LocalDateTime} localDateTime
     * @returns {ZoneOffset}
     */
    offsetOfLocalDateTime(localDateTime){
        var epochMilli = localDateTime.toEpochSecond(ZoneOffset.UTC) * 1000;
        var offsetInMinutesBeforePossibleTransition = new Date(epochMilli).getTimezoneOffset();
        var epochMilliSystemZone = epochMilli + offsetInMinutesBeforePossibleTransition * 60000;
        var offsetInMinutesAfterPossibleTransition = new Date(epochMilliSystemZone).getTimezoneOffset();
        return ZoneOffset.ofTotalMinutes(offsetInMinutesAfterPossibleTransition * -1);
    }

    /**
     *
     * @param {LocalDateTime} dateTime
     * @param {ZoneOffset} offset
     * @return {boolean}
     */
    isValidOffset(dateTime, offset) {
        return this.offsetOfLocalDateTime(dateTime).equals(offset);
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other || other instanceof SystemDefaultZoneRules) {
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
        return 'SYSTEM';
    }

}
