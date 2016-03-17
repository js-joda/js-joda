/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {abstractMethodFail} from './assert';
import {StringUtil} from './StringUtil';

import {Instant} from './Instant';

export class ZoneId {

    //-----------------------------------------------------------------------
    /**
     * Gets the system default time-zone.
     * <p>
     *
     * @return {ZoneId} the zone ID, not null
     * @see find code at {@link ZoneIdFactory}
     */
    static systemDefault() {
        abstractMethodFail('ZoneId.rules');
    }

    /**
     * Obtains an instance of {@code ZoneId} from an ID ensuring that the
     * ID is valid and available for use.
     * <p>
     * This method parses the ID producing a {@code ZoneId} or {@code ZoneOffset}.
     * A {@code ZoneOffset} is returned if the ID is 'Z', or starts with '+' or '-'.
     * The result will always be a valid ID for which {@link ZoneRules} can be obtained.
     * <p>
     * Parsing matches the zone ID step by step as follows.
     * <ul>
     * <li>If the zone ID equals 'Z', the result is {@code ZoneOffset.UTC}.
     * <li>If the zone ID consists of a single letter, the zone ID is invalid
     *  and {@code DateTimeException} is thrown.
     * <li>If the zone ID starts with '+' or '-', the ID is parsed as a
     *  {@code ZoneOffset} using {@link ZoneOffset#of(String)}.
     * <li>If the zone ID equals 'GMT', 'UTC' or 'UT' then the result is a {@code ZoneId}
     *  with the same ID and rules equivalent to {@code ZoneOffset.UTC}.
     * <li>If the zone ID starts with 'UTC+', 'UTC-', 'GMT+', 'GMT-', 'UT+' or 'UT-'
     *  then the ID is a prefixed offset-based ID. The ID is split in two, with
     *  a two or three letter prefix and a suffix starting with the sign.
     *  The suffix is parsed as a {@link ZoneOffset#of(String) ZoneOffset}.
     *  The result will be a {@code ZoneId} with the specified UTC/GMT/UT prefix
     *  and the normalized offset ID as per {@link ZoneOffset#getId()}.
     *  The rules of the returned {@code ZoneId} will be equivalent to the
     *  parsed {@code ZoneOffset}.
     * <li>All other IDs are parsed as region-based zone IDs. Region IDs must
     *  match the regular expression <code>[A-Za-z][A-Za-z0-9~/._+-]+</code>
     *  otherwise a {@code DateTimeException} is thrown. If the zone ID is not
     *  in the configured set of IDs, {@code ZoneRulesException} is thrown.
     *  The detailed format of the region ID depends on the group supplying the data.
     *  The default set of data is supplied by the IANA Time Zone Database (TZDB).
     *  This has region IDs of the form '{area}/{city}', such as 'Europe/Paris' or 'America/New_York'.
     *  This is compatible with most IDs from {@link java.util.TimeZone}.
     * </ul>
     *
     * @param {string} zoneId  the time-zone ID, not null
     * @return {ZoneId} the zone ID, not null
     * @throws DateTimeException if the zone ID has an invalid format
     * @throws ZoneRulesException if the zone ID is a region ID that cannot be found
     * @see find code at {@link ZoneIdFactory}
     */
    static of(zoneId) {
        abstractMethodFail('ZoneId.of');
    }

    /**
     * Obtains an instance of {@code ZoneId} wrapping an offset.
     * <p>
     * If the prefix is 'GMT', 'UTC', or 'UT' a {@code ZoneId}
     * with the prefix and the non-zero offset is returned.
     * If the prefix is empty {@code ''} the {@code ZoneOffset} is returned.
     *
     * @param {string} prefix  the time-zone ID, not null
     * @param {ZoneOffset} offset  the offset, not null
     * @return {ZoneId} the zone ID, not null
     * @throws IllegalArgumentException if the prefix is not one of
     *     'GMT', 'UTC', or 'UT', or ''
     * @see find code at {@link ZoneIdFactory}
     */
    static ofOffset(prefix, offset) {
        abstractMethodFail('ZoneId.ofOffset');
    }


    /**
     * Obtains an instance of {@code ZoneId} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code ZoneId}.
     * <p>
     * The conversion will try to obtain the zone in a way that favours region-based
     * zones over offset-based zones using {@link TemporalQueries#zone()}.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@code ZoneId::from}.
     *
     * @param {!TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {ZoneId} the zone ID, not null
     * @throws DateTimeException if unable to convert to a {@code ZoneId}
     * @see find code at {@link ZoneIdFactory}
     */
    static from(temporal) {
        abstractMethodFail('ZoneId.from');
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the time-zone rules for this ID allowing calculations to be performed.
     * <p>
     * The rules provide the functionality associated with a time-zone,
     * such as finding the offset for a given instant or local date-time.
     * <p>
     * A time-zone can be invalid if it is deserialized in a Java Runtime which
     * does not have the same rules loaded as the Java Runtime that stored it.
     * In this case, calling this method will throw a {@code ZoneRulesException}.
     * <p>
     * The rules are supplied by {@link ZoneRulesProvider}. An advanced provider may
     * support dynamic updates to the rules without restarting the Java Runtime.
     * If so, then the result of this method may change over time.
     * Each individual call will be still remain thread-safe.
     * <p>
     * {@link ZoneOffset} will always return a set of rules where the offset never changes.
     *
     * @return {!ZoneRules} the rules, not null
     * @throws ZoneRulesException if no rules are available for this ID
     */
    rules(){
        abstractMethodFail('ZoneId.rules');
    }

    /**
      * Normalizes the time-zone ID, returning a {@code ZoneOffset} where possible.
      * <p>
      * The returns a normalized {@code ZoneId} that can be used in place of this ID.
      * The result will have {@code ZoneRules} equivalent to those returned by this object,
      * however the ID returned by {@code getId()} may be different.
      * <p>
      * The normalization checks if the rules of this {@code ZoneId} have a fixed offset.
      * If they do, then the {@code ZoneOffset} equal to that offset is returned.
      * Otherwise {@code this} is returned.
      *
      * @return {ZoneId} the time-zone unique ID, not null
      */
    normalized() {
        var rules = this.rules();
        if (rules.isFixedOffset()) {
            return rules.offset(Instant.EPOCH);
        }
        //try {
        //} catch (ZoneRulesException ex) {
        //    // ignore invalid objects
        //}
        return this;
    }

     //-----------------------------------------------------------------------
     /**
      * Checks if this time-zone ID is equal to another time-zone ID.
      * <p>
      * The comparison is based on the ID.
      *
      * @param {*} other  the object to check, null returns false
      * @return {boolean} true if this is equal to the other time-zone ID
      */
     equals(other) {
         if (this === other) {
             return true;
         }
         if (other instanceof ZoneId) {
             return this.id() === other.id();
         }
         return false;
     }

     /**
      * A hash code for this time-zone ID.
      *
      * @return {number} a suitable hash code
      */
     hashCode() {
         return StringUtil.hashCode(this.id());
     }

     //-----------------------------------------------------------------------
     /**
      * Outputs this zone as a {@code String}, using the ID.
      *
      * @return {string} a string representation of this time-zone ID, not null
      */
     toString() {
         return this.id();
     }

}
