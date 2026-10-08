/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    Duration, LocalDateTime, Instant, ZoneOffset, ZoneOffsetTransition, ZoneRules
} from '@js-joda/core';

export class TzdbZoneRules extends ZoneRules{
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
        const epochMilli = epochMilliOf(instant);
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
     * <p>
     * Needs tz data with standard offsets (field 7 of the packed format); throws for older data.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the standard offset, not null
     * @throws {Error} if the tz data of the zone has no standard offsets
     */
    standardOffset(instant){
        return ZoneOffset.ofTotalSeconds(this._standardOffsetInSeconds(epochMilliOf(instant)));
    }

    _standardOffsetInSeconds(epochMilli){
        const stdOffsets = this._tzdbInfo.stdOffsets;
        if (stdOffsets == null) {
            throw new Error(`The tz data of zone ${this._tzdbInfo.name} has no standard offsets, ` +
                'load tz data with standard offsets (packed field 7) for standardOffset, daylightSavings and isDaylightSavings');
        }
        return -offsetInSeconds(stdOffsets[binarySearch(this._tzdbInfo.untils, epochMilli)]);
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
     * @throws {Error} if the tz data of the zone has no standard offsets
     */
    daylightSavings(instant){
        const epochMilli = epochMilliOf(instant);
        const index = binarySearch(this._tzdbInfo.untils, epochMilli);
        return Duration.ofSeconds(this._offsetByIndexInSeconds(index) - this._standardOffsetInSeconds(epochMilli));
    }

    /**
     * Checks if the specified instant is in daylight savings.
     * <p>
     * This checks if the standard and actual offsets are the same at the specified instant.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {boolean} true if the standard offset differs from the actual offset
     * @throws {Error} if the tz data of the zone has no standard offsets
     */
    isDaylightSavings(instant) {
        return !this.daylightSavings(instant).isZero();
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
    nextTransition(instant){
        const indices = this._transitionIndices();
        const untils = this._tzdbInfo.untils;
        // transitions are at whole milliseconds, so "after the instant" equals "after its truncated milli"
        const epochMilli = epochMilliOf(instant);
        const k = firstIndexWhere(indices, (i) => untils[i] > epochMilli);
        return k < indices.length ? this._createTransition(indices[k]) : null;
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
    previousTransition(instant){
        const indices = this._transitionIndices();
        const untils = this._tzdbInfo.untils;
        // round up to the next milli if the instant has a fraction of a milli,
        // so that a transition at the truncated milli counts as before the instant
        const epochMilli = epochMilliOf(instant) + (instant.nano() % 1000000 > 0 ? 1 : 0);
        const k = firstIndexWhere(indices, (i) => untils[i] >= epochMilli);
        return k > 0 ? this._createTransition(indices[k - 1]) : null;
    }

    /**
     * The indices i of the periods whose end, untils[i], is an offset transition, in ascending
     * order. Period boundaries where the offset doesn't change (only the abbreviation or the
     * isdst flag) and the last open-ended period are not transitions. Computed on first use and
     * cached on the zone's tz data, which all rules instances of the zone share.
     *
     * @return {number[]}
     * @private
     */
    _transitionIndices(){
        const tzdbInfo = this._tzdbInfo;
        if (tzdbInfo._transitionIndices == null) {
            const indices = [];
            for (let i = 0; i < tzdbInfo.offsets.length - 1; i++) {
                if (this._offsetByIndexInSeconds(i) !== this._offsetByIndexInSeconds(i + 1)) {
                    indices.push(i);
                }
            }
            tzdbInfo._transitionIndices = indices;
        }
        return tzdbInfo._transitionIndices;
    }

    /**
     * @param {number} index - the index of the period that ends with the transition
     * @return {ZoneOffsetTransition}
     * @private
     */
    _createTransition(index){
        const offsetBefore = ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(index));
        const offsetAfter = ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(index + 1));
        const instant = Instant.ofEpochMilli(this._tzdbInfo.untils[index]);
        return ZoneOffsetTransition.of(LocalDateTime.ofInstant(instant, offsetBefore), offsetBefore, offsetAfter);
    }

    /**
     * Not supported, always throws.
     * <p>
     * In java.time, the complete set of transitions is this list of the historic transitions
     * together with {@link #transitionRules()} for the later years. The tzdb data of this
     * package contains only explicit transitions through the year 2499 and doesn't say where
     * the historic part ends, so it can't return what java.time returns.
     * Use {@link #nextTransition} or {@link #previousTransition} to iterate over the transitions.
     *
     * @throws {Error} always
     */
    transitions(){
        notSupported('ZoneRules.transitions');
    }

    /**
     * Not supported, always throws.
     * <p>
     * In java.time, this returns the recurring rules (such as "last Sunday in March") for the
     * years after the list of {@link #transitions()}. The tzdb data of this package is expanded
     * into explicit transitions through the year 2499 and has no such rules.
     * Use {@link #nextTransition} or {@link #previousTransition} to iterate over the transitions.
     *
     * @throws {Error} always
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
        if (other instanceof TzdbZoneRules) {
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

// the offset is stored in minutes, with seconds as a base 60 fraction; multiplying it back can
// give a value just below the whole second (e.g. 65.35 * 60 = 3920.9999...), so round it
function offsetInSeconds(tzdbOffset){
    return Math.round(+tzdbOffset*60);
}

// beyond this epoch second, Instant.toEpochMilli() overflows; far outside the tz data
const MAX_EPOCH_SECOND_FOR_MILLIS = Math.floor(Number.MAX_SAFE_INTEGER / 1000) - 1;

// the epoch milli of the instant, or +/-Infinity for an instant too far out for an epoch milli
// (e.g. Instant.MAX); infinities compare with the untils of the tz data like any far instant
function epochMilliOf(instant) {
    const epochSecond = instant.epochSecond();
    if (epochSecond > MAX_EPOCH_SECOND_FOR_MILLIS) {
        return Infinity;
    }
    if (epochSecond < -MAX_EPOCH_SECOND_FOR_MILLIS) {
        return -Infinity;
    }
    return instant.toEpochMilli();
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

// the first index k of a sorted array for which predicate(array[k]) is true, assuming the
// predicate is false for a prefix and true for the rest; array.length if it is never true
function firstIndexWhere(array, predicate) {
    let lo = 0, hi = array.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (predicate(array[mid])) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

function notSupported(msg){
    throw new Error(`not supported: ${msg}`);
}
