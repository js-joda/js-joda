/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    LocalDateTime, Instant, ZoneOffset, ZoneOffsetTransition, ZoneRules
} from '@js-joda/core';

export class MomentZoneRules extends ZoneRules{
    constructor(tzdbInfo){
        super();
        this._tzdbInfo = tzdbInfo;
        this._ldtUntils = new LDTUntils(this._tzdbInfo.untils, this._tzdbInfo.offsets);
    }
    /**
     * Checks of the zone rules are fixed, such that the offset never varies.
     *
     * @return {boolean} true if the time-zone is fixed and the offset never changes
     */
    isFixedOffset(){
        return this._tzdbInfo.offsets.length === 1;
    }

    //-----------------------------------------------------------------------

    /**
     * Gets the offset applicable at the specified instant in these rules.
     * <p>
     * The mapping from an instant to an offset is simple, there is only
     * one valid offset for each instant.
     * This method returns that offset.
     *
     * @param {Instant} instant - the instant to find the offset for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the offset, not null
     */
    offsetOfInstant(instant){
        const epochMilli = instant.toEpochMilli();
        return this.offsetOfEpochMilli(epochMilli);
    }

    /**
     * Gets the offset applicable at the specified epochMilli in these rules.
     *
     * The method is for javascript performance optimisation.
     *
     * @param {number} epochMilli - the epoch millisecond to find the offset for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the offset, not null
     */
    offsetOfEpochMilli(epochMilli){
        const index  = binarySearch(this._tzdbInfo.untils, epochMilli);
        return ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(index));
    }


    /**
     * Gets a suitable offset for the specified local date-time in these rules.
     * <p>
     * The mapping from a local date-time to an offset is not straightforward.
     * There are three cases:
     * <p><ul>
     * <li>Normal, with one valid offset. For the vast majority of the year, the normal
     *  case applies, where there is a single valid offset for the local date-time.</li>
     * <li>Gap, with zero valid offsets. This is when clocks jump forward typically
     *  due to the spring daylight savings change from "winter" to "summer".
     *  In a gap there are local date-time values with no valid offset.</li>
     * <li>Overlap, with two valid offsets. This is when clocks are set back typically
     *  due to the autumn daylight savings change from "summer" to "winter".
     *  In an overlap there are local date-time values with two valid offsets.</li>
     * </ul><p>
     * Thus, for any given local date-time there can be zero, one or two valid offsets.
     * This method returns the single offset in the Normal case, and in the Gap or Overlap
     * case it returns the offset before the transition.
     * <p>
     * Since, in the case of Gap and Overlap, the offset returned is a "best" value, rather
     * than the "correct" value, it should be treated with care. Applications that care
     * about the correct offset should use a combination of this method,
     * {@link #getValidOffsets(LocalDateTime)} and {@link #getTransition(LocalDateTime)}.
     *
     * @param {LocalDateTime} localDateTime - the local date-time to query, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the best available offset for the local date-time, not null
     */
    offsetOfLocalDateTime(localDateTime){
        const info = this._offsetInfo(localDateTime);
        if (info instanceof ZoneOffsetTransition) {
            return info.offsetBefore();
        }
        return info;
    }

    _offsetInfo(localDateTime) {
        const index  = ldtBinarySearch(this._ldtUntils, localDateTime);
        const offsetIndex = index >> 1;

        if (index % 2 === 1){
            const ldtBefore = this._ldtUntils.get(Math.max(index-1, 0));
            const ldtAfter = this._ldtUntils.get(Math.min(index, this._ldtUntils.size-1));
            const offsetBefore = ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
            const offsetAfter = ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(Math.min(offsetIndex+1, this._tzdbInfo.offsets.length-1)));
            // console.log(offsetBefore.toString(), offsetAfter.toString());
            if (offsetBefore.compareTo(offsetAfter) > 0) {
                // gap
                // console.log('gap', ldtBefore.toString(), localDateTime.toString(), ldtAfter.toString());
                return ZoneOffsetTransition.of(ldtBefore, offsetBefore, offsetAfter);
            } else {
                // overlap
                // console.log('overlap', ldtBefore.toString(), localDateTime.toString(), ldtAfter.toString());
                return ZoneOffsetTransition.of(ldtAfter, offsetBefore, offsetAfter);
            }
        }
        return ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
    }

    _offsetByIndexInSeconds(index){
        return -offsetInSeconds(this._tzdbInfo.offsets[index]);
    }

    /**
     * Gets the offset applicable at the specified local date-time in these rules.
     * <p>
     * The mapping from a local date-time to an offset is not straightforward.
     * There are three cases:
     * <p><ul>
     * <li>Normal, with one valid offset. For the vast majority of the year, the normal
     *  case applies, where there is a single valid offset for the local date-time.</li>
     * <li>Gap, with zero valid offsets. This is when clocks jump forward typically
     *  due to the spring daylight savings change from "winter" to "summer".
     *  In a gap there are local date-time values with no valid offset.</li>
     * <li>Overlap, with two valid offsets. This is when clocks are set back typically
     *  due to the autumn daylight savings change from "summer" to "winter".
     *  In an overlap there are local date-time values with two valid offsets.</li>
     * </ul><p>
     * Thus, for any given local date-time there can be zero, one or two valid offsets.
     * This method returns that list of valid offsets, which is a list of size 0, 1 or 2.
     * In the case where there are two offsets, the earlier offset is returned at index 0
     * and the later offset at index 1.
     * <p>
     * There are various ways to handle the conversion from a {@code LocalDateTime}.
     * One technique, using this method, would be:
     * <pre>
     *  List<ZoneOffset> validOffsets = rules.getOffset(localDT);
     *  if (validOffsets.size() == 1) {
     *    // Normal case: only one valid offset
     *    zoneOffset = validOffsets.get(0);
     *  } else {
     *    // Gap or Overlap: determine what to do from transition (which will be non-null)
     *    ZoneOffsetTransition trans = rules.getTransition(localDT);
     *  }
     * </pre>
     * <p>
     * In theory, it is possible for there to be more than two valid offsets.
     * This would happen if clocks to be put back more than once in quick succession.
     * This has never happened in the history of time-zones and thus has no special handling.
     * However, if it were to happen, then the list would return more than 2 entries.
     *
     * @param {LocalDateTime} localDateTime - the local date-time to query for valid offsets, not null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition | ZoneOffset[]} the list of valid offsets, may be immutable, not null
     */
    validOffsets(localDateTime){
        const info = this._offsetInfo(localDateTime);
        if (info instanceof ZoneOffsetTransition) {
            return info.validOffsets();
        }
        return [info];
    }

    /**
     * Gets the offset transition applicable at the specified local date-time in these rules.
     * <p>
     * The mapping from a local date-time to an offset is not straightforward.
     * There are three cases:
     * <p><ul>
     * <li>Normal, with one valid offset. For the vast majority of the year, the normal
     *  case applies, where there is a single valid offset for the local date-time.</li>
     * <li>Gap, with zero valid offsets. This is when clocks jump forward typically
     *  due to the spring daylight savings change from "winter" to "summer".
     *  In a gap there are local date-time values with no valid offset.</li>
     * <li>Overlap, with two valid offsets. This is when clocks are set back typically
     *  due to the autumn daylight savings change from "summer" to "winter".
     *  In an overlap there are local date-time values with two valid offsets.</li>
     * </ul><p>
     * A transition is used to model the cases of a Gap or Overlap.
     * The Normal case will return null.
     * <p>
     * There are various ways to handle the conversion from a {@code LocalDateTime}.
     * One technique, using this method, would be:
     * <pre>
     *  ZoneOffsetTransition trans = rules.getTransition(localDT);
     *  if (trans != null) {
     *    // Gap or Overlap: determine what to do from transition
     *  } else {
     *    // Normal case: only one valid offset
     *    zoneOffset = rule.getOffset(localDT);
     *  }
     * </pre>
     *
     * @param {LocalDateTime} localDateTime  the local date-time to query for offset transition, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the offset transition, null if the local date-time is not in transition
     */
    // eslint-disable-next-line no-unused-vars
    transition(localDateTime){
        const info = this._offsetInfo(localDateTime);
        if (info instanceof ZoneOffsetTransition) {
            return info;
        }
        return null;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the standard offset for the specified instant in this zone.
     * <p>
     * This provides access to historic information on how the standard offset
     * has changed over time.
     * The standard offset is the offset before any daylight saving time is applied.
     * This is typically the offset applicable during winter.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the standard offset, not null
     */
    // eslint-disable-next-line no-unused-vars
    standardOffset(instant){
        notSupported('ZoneRules.standardOffset');
    }

    /**
     * Gets the amount of daylight savings in use for the specified instant in this zone.
     * <p>
     * This provides access to historic information on how the amount of daylight
     * savings has changed over time.
     * This is the difference between the standard offset and the actual offset.
     * Typically the amount is zero during winter and one hour during summer.
     * Time-zones are second-based, so the nanosecond part of the duration will be zero.
     *
     * @param {Instant} instant - the instant to find the daylight savings for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {Duration} the difference between the standard and actual offset, not null
     */
    // eslint-disable-next-line no-unused-vars
    daylightSavings(instant){
        notSupported('ZoneRules.daylightSavings');
    }

    /**
     * Checks if the specified instant is in daylight savings.
     * <p>
     * This checks if the standard and actual offsets are the same at the specified instant.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {boolean} the standard offset, not null
     */
    // eslint-disable-next-line no-unused-vars
    isDaylightSavings(instant) {
        notSupported('ZoneRules.isDaylightSavings');
    }

    /**
     * Checks if the offset date-time is valid for these rules.
     * <p>
     * To be valid, the local date-time must not be in a gap and the offset
     * must match the valid offsets.
     *
     * @param {LocalDateTime} localDateTime - the date-time to check, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @param {ZoneOffset} offset - the offset to check, null returns false
     * @return {boolean} true if the offset date-time is valid for these rules
     */
    isValidOffset(localDateTime, offset){
        return this.validOffsets(localDateTime).some( o => o.equals(offset));
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the next transition after the specified instant.
     * <p>
     * This returns details of the next transition after the specified instant.
     * For example, if the instant represents a point where "Summer" daylight savings time
     * applies, then the method will return the transition to the next "Winter" time.
     *
     * @param {Instant} instant - the instant to get the next transition after, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the next transition after the specified instant, null if this is after the last transition
     */
    // eslint-disable-next-line no-unused-vars
    nextTransition(instant){
        notSupported('ZoneRules.nextTransition');
    }

    /**
     * Gets the previous transition before the specified instant.
     * <p>
     * This returns details of the previous transition after the specified instant.
     * For example, if the instant represents a point where "summer" daylight saving time
     * applies, then the method will return the transition from the previous "winter" time.
     *
     * @param {Instant} instant - the instant to get the previous transition after, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the previous transition after the specified instant, null if this is before the first transition
     */
    // eslint-disable-next-line no-unused-vars
    previousTransition(instant){
        notSupported('ZoneRules.previousTransition');
    }

    /**
     * Gets the complete list of fully defined transitions.
     * <p>
     * The complete set of transitions for this rules instance is defined by this method
     * and {@link #getTransitionRules()}. This method returns those transitions that have
     * been fully defined. These are typically historical, but may be in the future.
     * <p>
     * The list will be empty for fixed offset rules and for any time-zone where there has
     * only ever been a single offset. The list will also be empty if the transition rules are unknown.
     *
     * @return {ZoneOffsetTransition[]} an immutable list of fully defined transitions, not null
     */
    transitions(){
        notSupported('ZoneRules.transitions');
    }

    /**
     * Gets the list of transition rules for years beyond those defined in the transition list.
     * <p>
     * The complete set of transitions for this rules instance is defined by this method
     * and {@link #getTransitions()}. This method returns instances of {@link ZoneOffsetTransitionRule}
     * that define an algorithm for when transitions will occur.
     * <p>
     * For any given {@code ZoneRules}, this list contains the transition rules for years
     * beyond those years that have been fully defined. These rules typically refer to future
     * daylight saving time rule changes.
     * <p>
     * If the zone defines daylight savings into the future, then the list will normally
     * be of size two and hold information about entering and exiting daylight savings.
     * If the zone does not have daylight savings, or information about future changes
     * is uncertain, then the list will be empty.
     * <p>
     * The list will be empty for fixed offset rules and for any time-zone where there is no
     * daylight saving time. The list will also be empty if the transition rules are unknown.
     *
     * @return {ZoneOffsetTransitionRule[]} an immutable list of transition rules, not null
     */
    transitionRules(){
        notSupported('ZoneRules.transitionRules');
    }

    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof MomentZoneRules) {
            return this._tzdbInfo === other._tzdbInfo;
        }
        return false;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return this._tzdbInfo.name;
    }
}

class LDTUntils {
    constructor(_tzdbUntils, tzdbOffsets) {
        this._tzdbUntils = _tzdbUntils;
        this._tzdbOffsets = tzdbOffsets;
        this._ldtUntils = [];
        this.size = this._tzdbUntils.length * 2;
    }


    _generateTupple(index) {
        const epochMillis = this._tzdbUntils[index];
        if (epochMillis === Infinity) {
            return [LocalDateTime.MAX, LocalDateTime.MAX];
        }
        const instant = Instant.ofEpochMilli(epochMillis);

        const offset1 = offsetInSeconds(this._tzdbOffsets[index]);
        const zone1 = ZoneOffset.ofTotalSeconds(-offset1);
        const ldt1 = LocalDateTime.ofInstant(instant, zone1);

        const nextIndex = Math.min(index + 1, this._tzdbOffsets.length - 1);
        const offset2 = offsetInSeconds(this._tzdbOffsets[nextIndex]);
        const zone2 = ZoneOffset.ofTotalSeconds(-offset2);
        const ldt2 = LocalDateTime.ofInstant(instant, zone2);

        if(offset1 > offset2) {
            return [ldt1, ldt2];
        } else {
            return [ldt2, ldt1];
        }
    }

    _getTupple(index){
        if (this._ldtUntils[index] == null) {
            this._ldtUntils[index] = this._generateTupple(index);
        }
        return this._ldtUntils[index];
    }

    get(index) {
        const ldtTupple = this._getTupple(index >> 1);
        return ldtTupple[index % 2];
    }
}

// modified bin-search, to always find existing indices for non-empty arrays
// value in array at index is larger than input value (or last index of array)
function ldtBinarySearch(array, value) {
    let hi = array.size - 1, lo = -1, mid;
    while (hi - lo > 1) {
        if (!value.isBefore(array.get(mid = hi + lo >> 1))) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return hi;
}

function offsetInSeconds(tzdbOffset){
    return roundDown(+tzdbOffset*60);
}

function roundDown(r){
    if (r < 0) {
        return Math.ceil(r);
    } else {
        return Math.floor(r);
    }
}

// modified bin-search, to always find existing indices for non-empty arrays
// value in array at index is larger than input value (or last index of array)
function binarySearch(array, value) {
    let hi = array.length - 1, lo = -1, mid;
    while (hi - lo > 1) {
        if (array[mid = hi + lo >> 1] <= value) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return hi;
}

function notSupported(msg){
    throw new Error('not supported: ' + msg);
}
