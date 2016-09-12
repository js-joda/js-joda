/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull} from './assert';
import {DateTimeException, IllegalArgumentException} from './errors';

import {Clock} from './Clock';
import {Instant} from './Instant';
import {LocalDate} from './LocalDate';
import {LocalDateTime} from './LocalDateTime';
import {LocalTime} from './LocalTime';
import {ZoneId} from './ZoneId';
import {ZoneOffset} from './ZoneOffset';

import {ChronoZonedDateTime} from './chrono/ChronoZonedDateTime';
import {DateTimeFormatter} from './format/DateTimeFormatter';
import {ChronoField} from './temporal/ChronoField';
import {ChronoUnit} from './temporal/ChronoUnit';
import {createTemporalQuery} from './temporal/TemporalQuery';
import {TemporalQueries} from './temporal/TemporalQueries';

/**
 * A date-time with a time-zone in the ISO-8601 calendar system,
 * such as {@code 2007-12-03T10:15:30+01:00 Europe/Paris}.
 * <p>
 * {@code ZonedDateTime} is an immutable representation of a date-time with a time-zone.
 * This class stores all date and time fields, to a precision of nanoseconds,
 * and a time-zone, with a zone offset used to handle ambiguous local date-times.
 * For example, the value
 * '2nd October 2007 at 13:45.30.123456789 +02:00 in the Europe/Paris time-zone'
 * can be stored in a {@code ZonedDateTime}.
 * <p>
 * This class handles conversion from the local time-line of {@code LocalDateTime}
 * to the instant time-line of {@code Instant}.
 * The difference between the two time-lines is the offset from UTC/Greenwich,
 * represented by a {@code ZoneOffset}.
 * <p>
 * Converting between the two time-lines involves calculating the offset using the
 * {@link ZoneRules rules} accessed from the {@code ZoneId}.
 * Obtaining the offset for an instant is simple, as there is exactly one valid
 * offset for each instant. By contrast, obtaining the offset for a local date-time
 * is not straightforward. There are three cases:
 * <p><ul>
 * <li>Normal, with one valid offset. For the vast majority of the year, the normal
 *  case applies, where there is a single valid offset for the local date-time.</li>
 * <li>Gap, with zero valid offsets. This is when clocks jump forward typically
 *  due to the spring daylight savings change from 'winter' to 'summer'.
 *  In a gap there are local date-time values with no valid offset.</li>
 * <li>Overlap, with two valid offsets. This is when clocks are set back typically
 *  due to the autumn daylight savings change from 'summer' to 'winter'.
 *  In an overlap there are local date-time values with two valid offsets.</li>
 * </ul><p>
 * <p>
 * Any method that converts directly or implicitly from a local date-time to an
 * instant by obtaining the offset has the potential to be complicated.
 * <p>
 * For Gaps, the general strategy is that if the local date-time falls in the
 * middle of a Gap, then the resulting zoned date-time will have a local date-time
 * shifted forwards by the length of the Gap, resulting in a date-time in the later
 * offset, typically 'summer' time.
 * <p>
 * For Overlaps, the general strategy is that if the local date-time falls in the
 * middle of an Overlap, then the previous offset will be retained. If there is no
 * previous offset, or the previous offset is invalid, then the earlier offset is
 * used, typically 'summer' time.. Two additional methods,
 * {@link #withEarlierOffsetAtOverlap()} and {@link #withLaterOffsetAtOverlap()},
 * help manage the case of an overlap.
 *
 * <h3>Specification for implementors</h3>
 * A {@code ZonedDateTime} holds state equivalent to three separate objects,
 * a {@code LocalDateTime}, a {@code ZoneId} and the resolved {@code ZoneOffset}.
 * The offset and local date-time are used to define an instant when necessary.
 * The zone ID is used to obtain the rules for how and when the offset changes.
 * The offset cannot be freely set, as the zone controls which offsets are valid.
 */
export class ZonedDateTime extends ChronoZonedDateTime {

    //-----------------------------------------------------------------------
    /**
     * Obtains the current date-time from the system clock in the specified time-zone or clock
     * or default time zone.
     * <p>
     * This will query the {@link Clock#systemDefaultZone() system clock} in the default
     * time-zone to obtain the current date-time.
     * The zone and offset will be set based on the time-zone in the clock.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {Clock|ZoneId} [clockOrZone=Clock.systemDefaultZone()]
     * @return {ZonedDateTime} the current date-time using the system clock, not null
     */
    static now(clockOrZone) {
        var clock;
        if(clockOrZone instanceof ZoneId){
            clock = Clock.system(clockOrZone);
        } else {
            clock = clockOrZone == null ? Clock.systemDefaultZone() : clockOrZone;
        }
        return ZonedDateTime.ofInstant(clock.instant(), clock.zone());
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for static {@link ZonedDateTime.of}
     *
     * if called with 2 (or less) args {@link ZonedDateTime.of2} is called,
     * if called with 3 args and the first arg is an instance of LocalDate {@link ZonedDateTime.of3} is called,
     * otherwise {@link ZonedDateTime.of8} is called.
     */
    static of(){
        if(arguments.length <= 2){
            return ZonedDateTime.of2.apply(this, arguments);
        } else if (arguments.length === 3 && arguments[0] instanceof LocalDate){
            return ZonedDateTime.of3.apply(this, arguments);
        } else {
            return ZonedDateTime.of8.apply(this, arguments);
        }
    }
    /**
     * Obtains an instance of {@code ZonedDateTime} from a local date and time.
     * <p>
     * This creates a zoned date-time matching the input local date and time as closely as possible.
     * Time-zone rules, such as daylight savings, mean that not every local date-time
     * is valid for the specified zone, thus the local date-time may be adjusted.
     * <p>
     * The local date time and first combined to form a local date-time.
     * The local date-time is then resolved to a single instant on the time-line.
     * This is achieved by finding a valid offset from UTC/Greenwich for the local
     * date-time as defined by the {@link ZoneRules rules} of the zone ID.
     *<p>
     * In most cases, there is only one valid offset for a local date-time.
     * In the case of an overlap, when clocks are set back, there are two valid offsets.
     * This method uses the earlier offset typically corresponding to 'summer'.
     * <p>
     * In the case of a gap, when clocks jump forward, there is no valid offset.
     * Instead, the local date-time is adjusted to be later by the length of the gap.
     * For a typical one hour daylight savings change, the local date-time will be
     * moved one hour later into the offset typically corresponding to 'summer'.
     *
     * @param {LocalDate} date - the local date, not null
     * @param {LocalTime} time - the local time, not null
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the offset date-time, not null
     */
    static of3(date, time, zone) {
        return ZonedDateTime.of2(LocalDateTime.of(date, time), zone);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} from a local date-time.
     * <p>
     * This creates a zoned date-time matching the input local date-time as closely as possible.
     * Time-zone rules, such as daylight savings, mean that not every local date-time
     * is valid for the specified zone, thus the local date-time may be adjusted.
     * <p>
     * The local date-time is resolved to a single instant on the time-line.
     * This is achieved by finding a valid offset from UTC/Greenwich for the local
     * date-time as defined by the {@link ZoneRules rules} of the zone ID.
     *<p>
     * In most cases, there is only one valid offset for a local date-time.
     * In the case of an overlap, when clocks are set back, there are two valid offsets.
     * This method uses the earlier offset typically corresponding to 'summer'.
     * <p>
     * In the case of a gap, when clocks jump forward, there is no valid offset.
     * Instead, the local date-time is adjusted to be later by the length of the gap.
     * For a typical one hour daylight savings change, the local date-time will be
     * moved one hour later into the offset typically corresponding to 'summer'.
     *
     * @param {!LocalDateTime} localDateTime - the local date-time, not null
     * @param {!ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    static of2(localDateTime, zone) {
        return ZonedDateTime.ofLocal(localDateTime, zone, null);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} from a year, month, day,
     * hour, minute, second, nanosecond and time-zone.
     * <p>
     * This creates a zoned date-time matching the local date-time of the seven
     * specified fields as closely as possible.
     * Time-zone rules, such as daylight savings, mean that not every local date-time
     * is valid for the specified zone, thus the local date-time may be adjusted.
     * <p>
     * The local date-time is resolved to a single instant on the time-line.
     * This is achieved by finding a valid offset from UTC/Greenwich for the local
     * date-time as defined by the {@link ZoneRules rules} of the zone ID.
     *<p>
     * In most cases, there is only one valid offset for a local date-time.
     * In the case of an overlap, when clocks are set back, there are two valid offsets.
     * This method uses the earlier offset typically corresponding to 'summer'.
     * <p>
     * In the case of a gap, when clocks jump forward, there is no valid offset.
     * Instead, the local date-time is adjusted to be later by the length of the gap.
     * For a typical one hour daylight savings change, the local date-time will be
     * moved one hour later into the offset typically corresponding to 'summer'.
     * <p>
     * This method exists primarily for writing test cases.
     * Non test-code will typically use other methods to create an offset time.
     * {@code LocalDateTime} has five additional convenience variants of the
     * equivalent factory method taking fewer arguments.
     * They are not provided here to reduce the footprint of the API.
     *
     * @param {number} year - the year to represent, from MIN_YEAR to MAX_YEAR
     * @param {number} month - the month-of-year to represent, from 1 (January) to 12 (December)
     * @param {number} dayOfMonth - the day-of-month to represent, from 1 to 31
     * @param {number} hour - the hour-of-day to represent, from 0 to 23
     * @param {number} minute - the minute-of-hour to represent, from 0 to 59
     * @param {number} second - the second-of-minute to represent, from 0 to 59
     * @param {number} nanoOfSecond - the nano-of-second to represent, from 0 to 999,999,999
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime } the offset date-time, not null
     * @throws DateTimeException if the value of any field is out of range, or
     *  if the day-of-month is invalid for the month-year
     */
    static of8(
            year, month, dayOfMonth,
            hour, minute, second, nanoOfSecond, zone) {
        var dt = LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, nanoOfSecond);
        return ZonedDateTime.ofLocal(dt, zone, null);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} from a local date-time
     * using the preferred offset if possible.
     * <p>
     * The local date-time is resolved to a single instant on the time-line.
     * This is achieved by finding a valid offset from UTC/Greenwich for the local
     * date-time as defined by the {@link ZoneRules rules} of the zone ID.
     *<p>
     * In most cases, there is only one valid offset for a local date-time.
     * In the case of an overlap, where clocks are set back, there are two valid offsets.
     * If the preferred offset is one of the valid offsets then it is used.
     * Otherwise the earlier valid offset is used, typically corresponding to 'summer'.
     * <p>
     * In the case of a gap, where clocks jump forward, there is no valid offset.
     * Instead, the local date-time is adjusted to be later by the length of the gap.
     * For a typical one hour daylight savings change, the local date-time will be
     * moved one hour later into the offset typically corresponding to 'summer'.
     *
     * @param {!LocalDateTime} localDateTime - the local date-time, not null
     * @param {!ZoneId} zone - the time-zone, not null
     * @param {ZoneOffset} preferredOffset - the zone offset, null if no preference
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    static ofLocal(localDateTime, zone, preferredOffset) {
        requireNonNull(localDateTime, 'localDateTime');
        requireNonNull(zone, 'zone');
        if (zone instanceof ZoneOffset) {
            return new ZonedDateTime(localDateTime, zone, zone);
        }
        var rules = zone.rules();
        var offset = rules.offsetOfLocalDateTime(localDateTime);

/* TODO implement for iana tzdb
        var validOffsets = rules.validOffsets(localDateTime);
        if (validOffsets.size() == 1) {
            offset = validOffsets.get(0);
        } else if (validOffsets.size() == 0) {
            var trans = rules.transition(localDateTime);
            localDateTime = localDateTime.plusSeconds(trans.duration().seconds());
            offset = trans.offsetAfter();
        } else {
            if (preferredOffset != null && validOffsets.contains(preferredOffset)) {
                offset = preferredOffset;
            } else {
                offset = requireNonNull(validOffsets.get(0), 'offset');  // protect against bad ZoneRules
            }
        }
*/
        return new ZonedDateTime(localDateTime, offset, zone);
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link ZonedDateTime.ofInstant}.
     * if called with 2 args {@link ZonedDateTime.ofInstant2} is called
     * otherwise {@link ZonedDateTime.ofInstant3}.
     */
    static ofInstant(){
        if (arguments.length === 2){
            return ZonedDateTime.ofInstant2.apply(this, arguments);
        } else {            
            return ZonedDateTime.ofInstant3.apply(this, arguments);
        }
    } 
    /**
     * Obtains an instance of {@code ZonedDateTime} from an {@code Instant}.
     * <p>
     * This creates a zoned date-time with the same instant as that specified.
     * Calling {@link #toInstant()} will return an instant equal to the one used here.
     * <p>
     * Converting an instant to a zoned date-time is simple as there is only one valid
     * offset for each instant.
     *
     * @param {!Instant} instant - the instant to create the date-time from, not null
     * @param {!ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     * @throws DateTimeException if the result exceeds the supported range
     */
    static ofInstant2(instant, zone) {
        requireNonNull(instant, 'instant');
        requireNonNull(zone, 'zone');
        return ZonedDateTime._create(instant.epochSecond(), instant.nano(), zone);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} from the instant formed by combining
     * the local date-time and offset.
     * <p>
     * This creates a zoned date-time by {@link LocalDateTime#toInstant(ZoneOffset) combining}
     * the {@code LocalDateTime} and {@code ZoneOffset}.
     * This combination uniquely specifies an instant without ambiguity.
     * <p>
     * Converting an instant to a zoned date-time is simple as there is only one valid
     * offset for each instant. If the valid offset is different to the offset specified,
     * the the date-time and offset of the zoned date-time will differ from those specified.
     * <p>
     * If the {@code ZoneId} to be used is a {@code ZoneOffset}, this method is equivalent
     * to {@link #of(LocalDateTime, ZoneId)}.
     *
     * @param {LocalDateTime} localDateTime - the local date-time, not null
     * @param {ZoneOffset} offset - the zone offset, not null
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    static ofInstant3(localDateTime, offset, zone) {
        requireNonNull(localDateTime, 'localDateTime');
        requireNonNull(offset, 'offset');
        requireNonNull(zone, 'zone');
        return ZonedDateTime._create(localDateTime.toEpochSecond(offset), localDateTime.nano(), zone);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} using seconds from the
     * epoch of 1970-01-01T00:00:00Z.
     *
     * @param {number} epochSecond - the number of seconds from the epoch of 1970-01-01T00:00:00Z
     * @param {number} nanoOfSecond - the nanosecond within the second, from 0 to 999,999,999
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     * @throws DateTimeException if the result exceeds the supported range
     */
    static _create(epochSecond, nanoOfSecond, zone) {
        var rules = zone.rules();
        var instant = Instant.ofEpochSecond(epochSecond, nanoOfSecond);  // TODO: rules should be queryable by epochSeconds
        var offset = rules.offset(instant);
        var ldt = LocalDateTime.ofEpochSecond(epochSecond, nanoOfSecond, offset);
        return new ZonedDateTime(ldt, offset, zone);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code ZonedDateTime} strictly validating the
     * combination of local date-time, offset and zone ID.
     * <p>
     * This creates a zoned date-time ensuring that the offset is valid for the
     * local date-time according to the rules of the specified zone.
     * If the offset is invalid, an exception is thrown.
     *
     * @param {LocalDateTime} localDateTime - the local date-time, not null
     * @param {ZoneOffset} offset - the zone offset, not null
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    static ofStrict(localDateTime, offset, zone) {
        requireNonNull(localDateTime, 'localDateTime');
        requireNonNull(offset, 'offset');
        requireNonNull(zone, 'zone');
        var rules = zone.rules();
        if (rules.isValidOffset(localDateTime, offset) === false) {
            var trans = rules.transition(localDateTime);
            if (trans != null && trans.isGap()) {
                // error message says daylight savings for simplicity
                // even though there are other kinds of gaps
                throw new DateTimeException('LocalDateTime ' + localDateTime +
                        ' does not exist in zone ' + zone +
                        ' due to a gap in the local time-line, typically caused by daylight savings');
            }
            throw new DateTimeException('ZoneOffset "' + offset + '" is not valid for LocalDateTime "' +
                localDateTime + '" in zone "' + zone + '"');
        }
        return new ZonedDateTime(localDateTime, offset, zone);
    }

    /**
     * Obtains an instance of {@code ZonedDateTime} leniently, for advanced use cases,
     * allowing any combination of local date-time, offset and zone ID.
     * <p>
     * This creates a zoned date-time with no checks other than no nulls.
     * This means that the resulting zoned date-time may have an offset that is in conflict
     * with the zone ID.
     * <p>
     * This method is intended for advanced use cases.
     * For example, consider the case where a zoned date-time with valid fields is created
     * and then stored in a database or serialization-based store. At some later point,
     * the object is then re-loaded. However, between those points in time, the government
     * that defined the time-zone has changed the rules, such that the originally stored
     * local date-time now does not occur. This method can be used to create the object
     * in an 'invalid' state, despite the change in rules.
     *
     * @param {LocalDateTime} localDateTime - the local date-time, not null
     * @param {ZoneOffset} offset - the zone offset, not null
     * @param {ZoneId} zone - the time-zone, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    static _ofLenient(localDateTime, offset, zone) {
        requireNonNull(localDateTime, 'localDateTime');
        requireNonNull(offset, 'offset');
        requireNonNull(zone, 'zone');
        if (zone instanceof ZoneOffset && offset.equals(zone) === false) {
            throw new IllegalArgumentException('ZoneId must match ZoneOffset');
        }
        return new ZonedDateTime(localDateTime, offset, zone);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code ZonedDateTime} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code ZonedDateTime}.
     * <p>
     * The conversion will first obtain a {@code ZoneId}. It will then try to obtain an instant.
     * If that fails it will try to obtain a local date-time.
     * The zoned date time will either be a combination of {@code ZoneId} and instant,
     * or {@code ZoneId} and local date-time.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@code ZonedDateTime::from}.
     *
     * @param {!TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     * @throws DateTimeException if unable to convert to an {@code ZonedDateTime}
     */
    static from(temporal) {
        requireNonNull(temporal, 'temporal');
        if (temporal instanceof ZonedDateTime) {
            return temporal;
        }
        var zone = ZoneId.from(temporal);
        if (temporal.isSupported(ChronoField.INSTANT_SECONDS)) {
            var zdt = ZonedDateTime._from(temporal, zone);
            if(zdt != null) return zdt;
        }
        var ldt = LocalDateTime.from(temporal);
        return ZonedDateTime.of2(ldt, zone);
    }

    static _from(temporal, zone){
        try {
            return ZonedDateTime.__from(temporal, zone);
        } catch (ex) {
            if(!(ex instanceof DateTimeException)) throw ex;
            // ignore
        }
    }

    static __from(temporal, zone){
        var epochSecond = temporal.getLong(ChronoField.INSTANT_SECONDS);
        var nanoOfSecond = temporal.get(ChronoField.NANO_OF_SECOND);
        return ZonedDateTime._create(epochSecond, nanoOfSecond, zone);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code ZonedDateTime} from a text string such as
     * {@code 2007-12-03T10:15:30+01:00[Europe/Paris]}.
     * <p>
     * The string must represent a valid date-time and is parsed using
     * {@link org.threeten.bp.format.DateTimeFormatter#ISO_ZONED_DATE_TIME}.
     *
     * @param {!string} text - the text to parse such as '2007-12-03T10:15:30+01:00[Europe/Paris]', not null
     * @param {!DateTimeFormatter} [formatter=DateTimeFormatter.ISO_ZONED_DATE_TIME] - the formatter to use
     * @return {ZonedDateTime} the parsed zoned date-time, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static parse(text, formatter = DateTimeFormatter.ISO_ZONED_DATE_TIME) {
        requireNonNull(formatter, 'fromatter');
        return formatter.parse(text, ZonedDateTime.FROM);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {LocalDateTime} dateTime - the date-time, validated as not null
     * @param {ZoneOffset} offset - the zone offset, validated as not null
     * @param {ZoneUd} zone - the time-zone, validated as not null
     */
    constructor(dateTime, offset, zone) {
        requireNonNull(dateTime, 'dateTime');
        requireNonNull(offset, 'offset');
        requireNonNull(zone, 'zone');

        super();

        /**
         * The local date-time.
         */
        this._dateTime = dateTime;
        /**
         * The offset from UTC/Greenwich.
         */
        this._offset = offset;
        /**
         * The time-zone.
         */
        this._zone = zone;
    }

    /**
     * Resolves the new local date-time using this zone ID, retaining the offset if possible.
     *
     * @param {LocalDateTime} newDateTime - the new local date-time, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    _resolveLocal(newDateTime) {
        requireNonNull(newDateTime, 'newDateTime');
        return ZonedDateTime.ofLocal(newDateTime, this._zone, this._offset);
    }

    /**
     * Resolves the new local date-time using the offset to identify the instant.
     *
     * @param {LocalDateTime} newDateTime - the new local date-time, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    _resolveInstant(newDateTime) {
        return ZonedDateTime.ofInstant3(newDateTime, this._offset, this._zone);
    }

    /**
     * Resolves the offset into this zoned date-time.
     * <p>
     * This ignores the offset, unless it can be used in an overlap.
     *
     * @param {ZoneOffset} offset - the offset, not null
     * @return {ZonedDateTime} the zoned date-time, not null
     */
    _resolveOffset(offset) {
        if (offset.equals(this._offset) === false && this._zone.rules().isValidOffset(this._dateTime, this._offset)) {
            return new ZonedDateTime(this._dateTime, this._offset, this._zone);
        }
        return this;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the specified field is supported.
     * <p>
     * This checks if this date-time can be queried for the specified field.
     * If false, then calling the {@link #range(TemporalField) range} and
     * {@link #get(TemporalField) get} methods will throw an exception.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     * <ul>
     * <li>{@code NANO_OF_SECOND}
     * <li>{@code NANO_OF_DAY}
     * <li>{@code MICRO_OF_SECOND}
     * <li>{@code MICRO_OF_DAY}
     * <li>{@code MILLI_OF_SECOND}
     * <li>{@code MILLI_OF_DAY}
     * <li>{@code SECOND_OF_MINUTE}
     * <li>{@code SECOND_OF_DAY}
     * <li>{@code MINUTE_OF_HOUR}
     * <li>{@code MINUTE_OF_DAY}
     * <li>{@code HOUR_OF_AMPM}
     * <li>{@code CLOCK_HOUR_OF_AMPM}
     * <li>{@code HOUR_OF_DAY}
     * <li>{@code CLOCK_HOUR_OF_DAY}
     * <li>{@code AMPM_OF_DAY}
     * <li>{@code DAY_OF_WEEK}
     * <li>{@code ALIGNED_DAY_OF_WEEK_IN_MONTH}
     * <li>{@code ALIGNED_DAY_OF_WEEK_IN_YEAR}
     * <li>{@code DAY_OF_MONTH}
     * <li>{@code DAY_OF_YEAR}
     * <li>{@code EPOCH_DAY}
     * <li>{@code ALIGNED_WEEK_OF_MONTH}
     * <li>{@code ALIGNED_WEEK_OF_YEAR}
     * <li>{@code MONTH_OF_YEAR}
     * <li>{@code EPOCH_MONTH}
     * <li>{@code YEAR_OF_ERA}
     * <li>{@code YEAR}
     * <li>{@code ERA}
     * <li>{@code INSTANT_SECONDS}
     * <li>{@code OFFSET_SECONDS}
     * </ul>
     * All other {@code ChronoField} instances will return false.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField|TemporalUnit} fieldOrUnit - the field to check, null returns false
     * @return {boolean} true if the field is supported on this date-time, false if not
     */
    isSupported(fieldOrUnit) {
        if(fieldOrUnit instanceof ChronoField){
            return true;
        } else if (fieldOrUnit instanceof ChronoUnit) {
            return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
        }
        return (fieldOrUnit != null && fieldOrUnit.isSupportedBy(this));
    }


    /**
     * Gets the range of valid values for the specified field.
     * <p>
     * The range object expresses the minimum and maximum valid values for a field.
     * This date-time is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return
     * appropriate range instances.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field - the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    range(field) {
        if (field instanceof ChronoField) {
            if (field === ChronoField.INSTANT_SECONDS || field === ChronoField.OFFSET_SECONDS) {
                return field.range();
            }
            return this._dateTime.range(field);
        }
        return field.rangeRefinedBy(this);
    }

    /**
     * Gets the value of the specified field from this date-time as an {@code int}.
     * <p>
     * This queries this date-time for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this date-time, except {@code NANO_OF_DAY}, {@code MICRO_OF_DAY},
     * {@code EPOCH_DAY}, {@code EPOCH_MONTH} and {@code INSTANT_SECONDS} which are too
     * large to fit in an {@code int} and throw a {@code DateTimeException}.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {!TemporalField} field - the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        return this.getLong(field);
    }

    /**
     * Gets the value of the specified field from this date-time as a {@code long}.
     * <p>
     * This queries this date-time for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this date-time.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {!TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.INSTANT_SECONDS: return this.toEpochSecond();
                case ChronoField.OFFSET_SECONDS: return this._offset.totalSeconds();
            }
            return this._dateTime.getLong(field);
        }
        requireNonNull(field, 'field');
        return field.getFrom(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the zone offset, such as '+01:00'.
     * <p>
     * This is the offset of the local date-time from UTC/Greenwich.
     *
     * @return {ZoneOffset}the zone offset, not null
     */
    offset() {
        return this._offset;
    }

    /**
     * Returns a copy of this date-time changing the zone offset to the
     * earlier of the two valid offsets at a local time-line overlap.
     * <p>
     * This method only has any effect when the local time-line overlaps, such as
     * at an autumn daylight savings cutover. In this scenario, there are two
     * valid offsets for the local date-time. Calling this method will return
     * a zoned date-time with the earlier of the two selected.
     * <p>
     * If this method is called when it is not an overlap, {@code this}
     * is returned.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the earlier offset, not null
     */
/* TODO implement for iana tzdb
    withEarlierOffsetAtOverlap() {
        var trans = this._zone.rules().transition(this._dateTime);
        if (trans != null && trans.isOverlap()) {
            var earlierOffset = trans.offsetBefore();
            if (earlierOffset.equals(offset) === false) {
                return new ZonedDateTime(this._dateTime, earlierOffset, this._zone);
            }
        }
        return this;
    }
*/

    /**
     * Returns a copy of this date-time changing the zone offset to the
     * later of the two valid offsets at a local time-line overlap.
     * <p>
     * This method only has any effect when the local time-line overlaps, such as
     * at an autumn daylight savings cutover. In this scenario, there are two
     * valid offsets for the local date-time. Calling this method will return
     * a zoned date-time with the later of the two selected.
     * <p>
     * If this method is called when it is not an overlap, {@code this}
     * is returned.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the later offset, not null
     */
/* TODO implement for iana tzdb
    withLaterOffsetAtOverlap() {
        var trans = zone().rules().transition(this.toLocalDateTime());
        if (trans != null) {
            var laterOffset = trans.offsetAfter();
            if (laterOffset.equals(offset) === false) {
                return new ZonedDateTime(this._dateTime, laterOffset, this._zone);
            }
        }
        return this;
    }
*/

    //-----------------------------------------------------------------------
    /**
     * Gets the time-zone, such as 'Europe/Paris'.
     * <p>
     * This returns the zone ID. This identifies the time-zone {@link ZoneRules rules}
     * that determine when and how the offset from UTC/Greenwich changes.
     * <p>
     * The zone ID may be same as the {@link #getOffset() offset}.
     * If this is true, then any future calculations, such as addition or subtraction,
     * have no complex edge cases due to time-zone rules.
     * See also {@link #withFixedOffsetZone()}.
     *
     * @return {ZoneId} the time-zone, not null
     */
    zone() {
        return this._zone;
    }

    /**
     * Returns a copy of this date-time with a different time-zone,
     * retaining the local date-time if possible.
     * <p>
     * This method changes the time-zone and retains the local date-time.
     * The local date-time is only changed if it is invalid for the new zone,
     * determined using the same approach as
     * {@link #ofLocal(LocalDateTime, ZoneId, ZoneOffset)}.
     * <p>
     * To change the zone and adjust the local date-time,
     * use {@link #withZoneSameInstant(ZoneId)}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {ZoneId} zone - the time-zone to change to, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested zone, not null
     */
    withZoneSameLocal(zone) {
        requireNonNull(zone, 'zone');
        return this._zone.equals(zone) ? this : ZonedDateTime.ofLocal(this._dateTime, zone, this._offset);
    }

    /**
     * Returns a copy of this date-time with a different time-zone,
     * retaining the instant.
     * <p>
     * This method changes the time-zone and retains the instant.
     * This normally results in a change to the local date-time.
     * <p>
     * This method is based on retaining the same instant, thus gaps and overlaps
     * in the local time-line have no effect on the result.
     * <p>
     * To change the offset while keeping the local time,
     * use {@link #withZoneSameLocal(ZoneId)}.
     *
     * @param {ZoneId} zone - the time-zone to change to, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested zone, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    withZoneSameInstant(zone) {
        requireNonNull(zone, 'zone');
        return this._zone.equals(zone) ? this :
            ZonedDateTime._create(this._dateTime.toEpochSecond(this._offset), this._dateTime.nano(), zone);
    }

    /**
     * Returns a copy of this date-time with the zone ID set to the offset.
     * <p>
     * This returns a zoned date-time where the zone ID is the same as {@link #getOffset()}.
     * The local date-time, offset and instant of the result will be the same as in this date-time.
     * <p>
     * Setting the date-time to a fixed single offset means that any future
     * calculations, such as addition or subtraction, have no complex edge cases
     * due to time-zone rules.
     * This might also be useful when sending a zoned date-time across a network,
     * as most protocols, such as ISO-8601, only handle offsets,
     * and not region-based zone IDs.
     * <p>
     * This is equivalent to {@code ZonedDateTime.of(zdt.getDateTime(), zdt.getOffset())}.
     *
     * @return {ZonedDateTime} a {@code ZonedDateTime} with the zone ID set to the offset, not null
     */
    withFixedOffsetZone() {
        return this._zone.equals(this._offset) ? this : new ZonedDateTime(this._dateTime, this._offset, this._offset);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the year field.
     * <p>
     * This method returns the primitive {@code int} value for the year.
     * <p>
     * The year returned by this method is proleptic as per {@code get(YEAR)}.
     * To obtain the year-of-era, use {@code get(YEAR_OF_ERA}.
     *
     * @return {number} the year, from MIN_YEAR to MAX_YEAR
     */
    year() {
        return this._dateTime.year();
    }

    /**
     * Gets the month-of-year field from 1 to 12.
     * <p>
     * This method returns the month as an {@code int} from 1 to 12.
     * Application code is frequently clearer if the enum {@link Month}
     * is used by calling {@link #getMonth()}.
     *
     * @return {number} the month-of-year, from 1 to 12
     * @see #month()
     */
    monthValue() {
        return this._dateTime.monthValue();
    }

    /**
     * Gets the month-of-year field using the {@code Month} enum.
     * <p>
     * This method returns the enum {@link Month} for the month.
     * This avoids confusion as to what {@code int} values mean.
     * If you need access to the primitive {@code int} value then the enum
     * provides the {@link Month#getValue() int value}.
     *
     * @return {Month} the month-of-year, not null
     * @see #getMonthValue()
     */
    month() {
        return this._dateTime.month();
    }

    /**
     * Gets the day-of-month field.
     * <p>
     * This method returns the primitive {@code int} value for the day-of-month.
     *
     * @return {number} the day-of-month, from 1 to 31
     */
    dayOfMonth() {
        return this._dateTime.dayOfMonth();
    }

    /**
     * Gets the day-of-year field.
     * <p>
     * This method returns the primitive {@code int} value for the day-of-year.
     *
     * @return {number} the day-of-year, from 1 to 365, or 366 in a leap year
     */
    dayOfYear() {
        return this._dateTime.dayOfYear();
    }

    /**
     * Gets the day-of-week field, which is an enum {@code DayOfWeek}.
     * <p>
     * This method returns the enum {@link DayOfWeek} for the day-of-week.
     * This avoids confusion as to what {@code int} values mean.
     * If you need access to the primitive {@code int} value then the enum
     * provides the {@link DayOfWeek#getValue() int value}.
     * <p>
     * Additional information can be obtained from the {@code DayOfWeek}.
     * This includes textual names of the values.
     *
     * @return {DayOfWeek} the day-of-week, not null
     */
    dayOfWeek() {
        return this._dateTime.dayOfWeek();
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the hour-of-day field.
     *
     * @return {number} the hour-of-day, from 0 to 23
     */
    hour() {
        return this._dateTime.hour();
    }

    /**
     * Gets the minute-of-hour field.
     *
     * @return {number} the minute-of-hour, from 0 to 59
     */
    minute() {
        return this._dateTime.minute();
    }

    /**
     * Gets the second-of-minute field.
     *
     * @return {number} the second-of-minute, from 0 to 59
     */
    second() {
        return this._dateTime.second();
    }

    /**
     * Gets the nano-of-second field.
     *
     * @return {number} the nano-of-second, from 0 to 999,999,999
     */
    nano() {
        return this._dateTime.nano();
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link ZonedDateTime.with}
     *
     * if called with 1 argument {@link ZonedDateTime.withTemporalAdjuster} is applied
     * otherwise {@link ZonedDateTime.with2}
     */
    with(){
        if(arguments.length === 1){
            return this.withTemporalAdjuster.apply(this, arguments);
        } else {
            return this.with2.apply(this, arguments);
        }
    }

    /**
     * Returns an adjusted copy of this date-time.
     * <p>
     * This returns a new {@code ZonedDateTime}, based on this one, with the date-time adjusted.
     * The adjustment takes place using the specified adjuster strategy object.
     * Read the documentation of the adjuster to understand what adjustment will be made.
     * <p>
     * A simple adjuster might simply set the one of the fields, such as the year field.
     * A more complex adjuster might set the date to the last day of the month.
     * A selection of common adjustments is provided in {@link TemporalAdjusters}.
     * These include finding the 'last day of the month' and 'next Wednesday'.
     * Key date-time classes also implement the {@code TemporalAdjuster} interface,
     * such as {@link Month} and {@link MonthDay}.
     * The adjuster is responsible for handling special cases, such as the varying
     * lengths of month and leap years.
     * <p>
     * For example this code returns a date on the last day of July:
     * <pre>
     *  import static org.threeten.bp.Month.*;
     *  import static org.threeten.bp.temporal.Adjusters.*;
     *
     *  result = zonedDateTime.with(JULY).with(lastDayOfMonth());
     * </pre>
     * <p>
     * The classes {@link LocalDate} and {@link LocalTime} implement {@code TemporalAdjuster},
     * thus this method can be used to change the date, time or offset:
     * <pre>
     *  result = zonedDateTime.with(date);
     *  result = zonedDateTime.with(time);
     * </pre>
     * <p>
     * {@link ZoneOffset} also implements {@code TemporalAdjuster} however it is less likely
     * that setting the offset will have the effect you expect. When an offset is passed in,
     * the local date-time is combined with the new offset to form an {@code Instant}.
     * The instant and original zone are then used to create the result.
     * This algorithm means that it is quite likely that the output has a different offset
     * to the specified offset. It will however work correctly when passing in the offset
     * applicable for the instant of the zoned date-time, and will work correctly if passing
     * one of the two valid offsets during a daylight savings overlap when the same local time
     * occurs twice.
     * <p>
     * The result of this method is obtained by invoking the
     * {@link TemporalAdjuster#adjustInto(Temporal)} method on the
     * specified adjuster passing {@code this} as the argument.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAdjuster} adjuster - the adjuster to use, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on {@code this} with the adjustment made, not null
     * @throws DateTimeException if the adjustment cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    withTemporalAdjuster(adjuster) {
        // optimizations
        if (adjuster instanceof LocalDate) {
            return this._resolveLocal(LocalDateTime.of(adjuster, this._dateTime.toLocalTime()));
        } else if (adjuster instanceof LocalTime) {
            return this._resolveLocal(LocalDateTime.of(this._dateTime.toLocalDate(), adjuster));
        } else if (adjuster instanceof LocalDateTime) {
            return this._resolveLocal(adjuster);
        } else if (adjuster instanceof Instant) {
            var instant = adjuster;
            return ZonedDateTime._create(instant.epochSecond(), instant.nano(), this._zone);
        } else if (adjuster instanceof ZoneOffset) {
            return this._resolveOffset(adjuster);
        }
        requireNonNull(adjuster, 'adjuster');
        return adjuster.adjustInto(this);
    }

    /**
     * Returns a copy of this date-time with the specified field set to a new value.
     * <p>
     * This returns a {@code ZonedDateTime}, based on this one, with the value
     * for the specified field changed.
     * This can be used to change any supported field, such as the year, month or day-of-month.
     * If it is not possible to set the value, because the field is not supported or for
     * some other reason, an exception is thrown.
     * <p>
     * In some cases, changing the specified field can cause the resulting date-time to become invalid,
     * such as changing the month from 31st January to February would make the day-of-month invalid.
     * In cases like this, the field is responsible for resolving the date. Typically it will choose
     * the previous valid date, which would be the last valid day of February in this example.
     * <p>
     * If the field is a {@link ChronoField} then the adjustment is implemented here.
     * <p>
     * The {@code INSTANT_SECONDS} field will return a date-time with the specified instant.
     * The zone and nano-of-second are unchanged.
     * The result will have an offset derived from the new instant and original zone.
     * If the new instant value is outside the valid range then a {@code DateTimeException} will be thrown.
     * <p>
     * The {@code OFFSET_SECONDS} field will typically be ignored.
     * The offset of a {@code ZonedDateTime} is controlled primarily by the time-zone.
     * As such, changing the offset does not generally make sense, because there is only
     * one valid offset for the local date-time and zone.
     * If the zoned date-time is in a daylight savings overlap, then the offset is used
     * to switch between the two valid offsets. In all other cases, the offset is ignored.
     * If the new offset value is outside the valid range then a {@code DateTimeException} will be thrown.
     * <p>
     * The other {@link #isSupported(TemporalField) supported fields} will behave as per
     * the matching method on {@link LocalDateTime#with(TemporalField, long) LocalDateTime}.
     * The zone is not part of the calculation and will be unchanged.
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * All other {@code ChronoField} instances will throw an {@code UnsupportedTemporalTypeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.adjustInto(Temporal, long)}
     * passing {@code this} as the argument. In this case, the field determines
     * whether and how to adjust the instant.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalField} field - the field to set in the result, not null
     * @param {number} newValue - the new value of the field in the result
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on {@code this} with the specified field set, not null
     * @throws DateTimeException if the field cannot be set
     * @throws UnsupportedTemporalTypeException if the field is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    with2(field, newValue) {
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.INSTANT_SECONDS: return ZonedDateTime._create(newValue, this.nano(), this._zone);
                case ChronoField.OFFSET_SECONDS: {
                    var offset = ZoneOffset.ofTotalSeconds(field.checkValidIntValue(newValue));
                    return this._resolveOffset(offset);
                }
            }
            return this._resolveLocal(this._dateTime.with(field, newValue));
        }
        return field.adjustInto(this, newValue);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the year value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withYear(int) changing the year} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} year - the year to set in the result, from MIN_YEAR to MAX_YEAR
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested year, not null
     * @throws DateTimeException if the year value is invalid
     */
    withYear(year) {
        return this._resolveLocal(this._dateTime.withYear(year));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the month-of-year value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withMonth(int) changing the month} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} month - the month-of-year to set in the result, from 1 (January) to 12 (December)
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested month, not null
     * @throws DateTimeException if the month-of-year value is invalid
     */
    withMonth(month) {
        return this._resolveLocal(this._dateTime.withMonth(month));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the day-of-month value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withDayOfMonth(int) changing the day-of-month} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} dayOfMonth - the day-of-month to set in the result, from 1 to 28-31
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested day, not null
     * @throws DateTimeException if the day-of-month value is invalid
     * @throws DateTimeException if the day-of-month is invalid for the month-year
     */
    withDayOfMonth(dayOfMonth) {
        return this._resolveLocal(this._dateTime.withDayOfMonth(dayOfMonth));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the day-of-year altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withDayOfYear(int) changing the day-of-year} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} dayOfYear - the day-of-year to set in the result, from 1 to 365-366
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date with the requested day, not null
     * @throws DateTimeException if the day-of-year value is invalid
     * @throws DateTimeException if the day-of-year is invalid for the year
     */
    withDayOfYear(dayOfYear) {
        return this._resolveLocal(this._dateTime.withDayOfYear(dayOfYear));
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the hour-of-day value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withHour(int) changing the time} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} hour - the hour-of-day to set in the result, from 0 to 23
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested hour, not null
     * @throws DateTimeException if the hour value is invalid
     */
    withHour(hour) {
        return this._resolveLocal(this._dateTime.withHour(hour));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the minute-of-hour value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withMinute(int) changing the time} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} minute - the minute-of-hour to set in the result, from 0 to 59
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested minute, not null
     * @throws DateTimeException if the minute value is invalid
     */
    withMinute(minute) {
        return this._resolveLocal(this._dateTime.withMinute(minute));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the second-of-minute value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withSecond(int) changing the time} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} second - the second-of-minute to set in the result, from 0 to 59
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested second, not null
     * @throws DateTimeException if the second value is invalid
     */
    withSecond(second) {
        return this._resolveLocal(this._dateTime.withSecond(second));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the nano-of-second value altered.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#withNano(int) changing the time} of the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} nanoOfSecond - the nano-of-second to set in the result, from 0 to 999,999,999
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the requested nanosecond, not null
     * @throws DateTimeException if the nano value is invalid
     */
    withNano(nanoOfSecond) {
        return this._resolveLocal(this._dateTime.withNano(nanoOfSecond));
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the time truncated.
     * <p>
     * Truncation returns a copy of the original date-time with fields
     * smaller than the specified unit set to zero.
     * For example, truncating with the {@link ChronoUnit#MINUTES minutes} unit
     * will set the second-of-minute and nano-of-second field to zero.
     * <p>
     * The unit must have a {@linkplain TemporalUnit#getDuration() duration}
     * that divides into the length of a standard day without remainder.
     * This includes all supplied time units on {@link ChronoUnit} and
     * {@link ChronoUnit#DAYS DAYS}. Other units throw an exception.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#truncatedTo(TemporalUnit) truncating}
     * the underlying local date-time. This is then converted back to a
     * {@code ZonedDateTime}, using the zone ID to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalUnit} unit - the unit to truncate to, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the time truncated, not null
     * @throws DateTimeException if unable to truncate
     */
    truncatedTo(unit) {
        return this._resolveLocal(this._dateTime.truncatedTo(unit));
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link ZonedDateTime.plus}
     *
     * if called with 1 argument {@link ZonedDateTime.plusTemporalAmount} is applied,
     * otherwise {@link ZonedDateTime.plus2}
     */
    plus(){
        if(arguments.length === 1){
            return this.plusTemporalAmount.apply(this, arguments);
        } else {
            return this.plus2.apply(this, arguments);
        }
    }

    /**
     * Returns a copy of this date-time with the specified period added.
     * <p>
     * This method returns a new date-time based on this time with the specified period added.
     * The amount is typically {@link Period} but may be any other type implementing
     * the {@link TemporalAmount} interface.
     * The calculation is delegated to the specified adjuster, which typically calls
     * back to {@link #plus(long, TemporalUnit)}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {!TemporalAmount} amount - the amount to add, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the addition made, not null
     * @throws DateTimeException if the addition cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusTemporalAmount(amount) {
        requireNonNull(amount);
        return amount.addTo(this);
    }

    /**
     * Returns a copy of this date-time with the specified period added.
     * <p>
     * This method returns a new date-time based on this date-time with the specified period added.
     * This can be used to add any period that is defined by a unit, for example to add years, months or days.
     * The unit is responsible for the details of the calculation, including the resolution
     * of any edge cases in the calculation.
     * <p>
     * The calculation for date and time units differ.
     * <p>
     * Date units operate on the local time-line.
     * The period is first added to the local date-time, then converted back
     * to a zoned date-time using the zone ID.
     * The conversion uses {@link #ofLocal(LocalDateTime, ZoneId, ZoneOffset)}
     * with the offset before the addition.
     * <p>
     * Time units operate on the instant time-line.
     * The period is first added to the local date-time, then converted back to
     * a zoned date-time using the zone ID.
     * The conversion uses {@link #ofInstant(LocalDateTime, ZoneOffset, ZoneId)}
     * with the offset before the addition.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} amountToAdd - the amount of the unit to add to the result, may be negative
     * @param {TemporalUnit} unit - the unit of the period to add, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the specified period added, not null
     * @throws DateTimeException if the unit cannot be added to this type
     */
    plus2(amountToAdd, unit) {
        if (unit instanceof ChronoUnit) {
            if (unit.isDateBased()) {
                return this._resolveLocal(this._dateTime.plus(amountToAdd, unit));
            } else {
                return this._resolveInstant(this._dateTime.plus(amountToAdd, unit));
            }
        }
        requireNonNull(unit, 'unit');
        return unit.addTo(this, amountToAdd);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in years added.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#plusYears(long) adding years} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} years - the years to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the years added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusYears(years) {
        return this._resolveLocal(this._dateTime.plusYears(years));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in months added.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#plusMonths(long) adding months} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months - the months to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the months added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusMonths(months) {
        return this._resolveLocal(this._dateTime.plusMonths(months));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in weeks added.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#plusWeeks(long) adding weeks} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} weeks - the weeks to add, may be negative
     * @return {ZonedDateTime}a {@code ZonedDateTime} based on this date-time with the weeks added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusWeeks(weeks) {
        return this._resolveLocal(this._dateTime.plusWeeks(weeks));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in days added.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#plusDays(long) adding days} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days - the days to add, may be negative
     * @return {ZonedDateTime}a {@code ZonedDateTime} based on this date-time with the days added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusDays(days) {
        return this._resolveLocal(this._dateTime.plusDays(days));
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in hours added.
     * <p>
     * This operates on the instant time-line, such that adding one hour will
     * always be a duration of one hour later.
     * This may cause the local date-time to change by an amount other than one hour.
     * Note that this is a different approach to that used by days, months and years,
     * thus adding one day is not the same as adding 24 hours.
     * <p>
     * For example, consider a time-zone where the spring DST cutover means that the
     * local times 01:00 to 01:59 occur twice changing from offset +02:00 to +01:00.
     * <p><ul>
     * <li>Adding one hour to 00:30+02:00 will result in 01:30+02:00
     * <li>Adding one hour to 01:30+02:00 will result in 01:30+01:00
     * <li>Adding one hour to 01:30+01:00 will result in 02:30+01:00
     * <li>Adding three hours to 00:30+02:00 will result in 02:30+01:00
     * </ul><p>
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} hours - the hours to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the hours added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusHours(hours) {
        return this._resolveInstant(this._dateTime.plusHours(hours));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in minutes added.
     * <p>
     * This operates on the instant time-line, such that adding one minute will
     * always be a duration of one minute later.
     * This may cause the local date-time to change by an amount other than one minute.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} minutes - the minutes to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the minutes added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusMinutes(minutes) {
        return this._resolveInstant(this._dateTime.plusMinutes(minutes));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in seconds added.
     * <p>
     * This operates on the instant time-line, such that adding one second will
     * always be a duration of one second later.
     * This may cause the local date-time to change by an amount other than one second.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} seconds - the seconds to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the seconds added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusSeconds(seconds) {
        return this._resolveInstant(this._dateTime.plusSeconds(seconds));
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in nanoseconds added.
     * <p>
     * This operates on the instant time-line, such that adding one nano will
     * always be a duration of one nano later.
     * This may cause the local date-time to change by an amount other than one nano.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} nanos - the nanos to add, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the nanoseconds added, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    plusNanos(nanos) {
        return this._resolveInstant(this._dateTime.plusNanos(nanos));
    }

    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link ZonedDateTime.minus}
     *
     * if called with 1 argument {@link ZonedDateTime.minusTemporalAmount} is applied,
     * otherwise {@link ZonedDateTime.minus2}
     */
    minus(){
        if(arguments.length === 1){
            return this.minusTemporalAmount.apply(this, arguments);
        } else {
            return this.minus2.apply(this, arguments);
        }
    }

    /**
     * Returns a copy of this date-time with the specified period subtracted.
     * <p>
     * This method returns a new date-time based on this time with the specified period subtracted.
     * The amount is typically {@link Period} but may be any other type implementing
     * the {@link TemporalAmount} interface.
     * The calculation is delegated to the specified adjuster, which typically calls
     * back to {@link #minus(long, TemporalUnit)}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAmount} amount - the amount to subtract, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the subtraction made, not null
     * @throws DateTimeException if the subtraction cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusTemporalAmount(amount) {
        requireNonNull(amount, 'amount');
        return amount.subtractFrom(this);
    }

    /**
     * Returns a copy of this date-time with the specified period subtracted.
     * <p>
     * This method returns a new date-time based on this date-time with the specified period subtracted.
     * This can be used to subtract any period that is defined by a unit, for example to subtract years, months or days.
     * The unit is responsible for the details of the calculation, including the resolution
     * of any edge cases in the calculation.
     * <p>
     * The calculation for date and time units differ.
     * <p>
     * Date units operate on the local time-line.
     * The period is first subtracted from the local date-time, then converted back
     * to a zoned date-time using the zone ID.
     * The conversion uses {@link #ofLocal(LocalDateTime, ZoneId, ZoneOffset)}
     * with the offset before the subtraction.
     * <p>
     * Time units operate on the instant time-line.
     * The period is first subtracted from the local date-time, then converted back to
     * a zoned date-time using the zone ID.
     * The conversion uses {@link #ofInstant(LocalDateTime, ZoneOffset, ZoneId)}
     * with the offset before the subtraction.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} amountToSubtract - the amount of the unit to subtract from the result, may be negative
     * @param {TemporalUnit} unit - the unit of the period to subtract, not null
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the specified period subtracted, not null
     * @throws DateTimeException if the unit cannot be added to this type
     */
    minus2(amountToSubtract, unit) {
        return this.plus2(-1 * amountToSubtract, unit);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in years subtracted.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#minusYears(long) subtracting years} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} years - the years to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the years subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusYears(years) {
        return this.plusYears(-1 * years);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in months subtracted.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#minusMonths(long) subtracting months} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} months - the months to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the months subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusMonths(months) {
        return this.plusMonths(-1 * months);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in weeks subtracted.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#minusWeeks(long) subtracting weeks} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} weeks - the weeks to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the weeks subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusWeeks(weeks) {
        return this.plusWeeks(-1 * weeks);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in days subtracted.
     * <p>
     * This operates on the local time-line,
     * {@link LocalDateTime#minusDays(long) subtracting days} to the local date-time.
     * This is then converted back to a {@code ZonedDateTime}, using the zone ID
     * to obtain the offset.
     * <p>
     * When converting back to {@code ZonedDateTime}, if the local date-time is in an overlap,
     * then the offset will be retained if possible, otherwise the earlier offset will be used.
     * If in a gap, the local date-time will be adjusted forward by the length of the gap.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} days - the days to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the days subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusDays(days) {
        return this.plusDays(-1 * days);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in hours subtracted.
     * <p>
     * This operates on the instant time-line, such that subtracting one hour will
     * always be a duration of one hour earlier.
     * This may cause the local date-time to change by an amount other than one hour.
     * Note that this is a different approach to that used by days, months and years,
     * thus subtracting one day is not the same as adding 24 hours.
     * <p>
     * For example, consider a time-zone where the spring DST cutover means that the
     * local times 01:00 to 01:59 occur twice changing from offset +02:00 to +01:00.
     * <p><ul>
     * <li>Subtracting one hour from 02:30+01:00 will result in 01:30+02:00
     * <li>Subtracting one hour from 01:30+01:00 will result in 01:30+02:00
     * <li>Subtracting one hour from 01:30+02:00 will result in 00:30+01:00
     * <li>Subtracting three hours from 02:30+01:00 will result in 00:30+02:00
     * </ul><p>
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} hours - the hours to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the hours subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusHours(hours) {
        return this.plusHours(-1 * hours);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in minutes subtracted.
     * <p>
     * This operates on the instant time-line, such that subtracting one minute will
     * always be a duration of one minute earlier.
     * This may cause the local date-time to change by an amount other than one minute.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} minutes - the minutes to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the minutes subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusMinutes(minutes) {
        return this.plusMinutes(-1 * minutes);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in seconds subtracted.
     * <p>
     * This operates on the instant time-line, such that subtracting one second will
     * always be a duration of one second earlier.
     * This may cause the local date-time to change by an amount other than one second.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} seconds - the seconds to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the seconds subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusSeconds(seconds) {
        return this.plusSeconds(-1 * seconds);
    }

    /**
     * Returns a copy of this {@code ZonedDateTime} with the specified period in nanoseconds subtracted.
     * <p>
     * This operates on the instant time-line, such that subtracting one nano will
     * always be a duration of one nano earlier.
     * This may cause the local date-time to change by an amount other than one nano.
     * Note that this is a different approach to that used by days, months and years.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} nanos - the nanos to subtract, may be negative
     * @return {ZonedDateTime} a {@code ZonedDateTime} based on this date-time with the nanoseconds subtracted, not null
     * @throws DateTimeException if the result exceeds the supported date range
     */
    minusNanos(nanos) {
        return this.plusNanos(-1 * nanos);
    }

    //-----------------------------------------------------------------------
    /**
     * Queries this date-time using the specified query.
     * <p>
     * This queries this date-time using the specified query strategy object.
     * The {@code TemporalQuery} object defines the logic to be used to
     * obtain the result. Read the documentation of the query to understand
     * what the result of this method will be.
     * <p>
     * The result of this method is obtained by invoking the
     * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
     * specified query passing {@code this} as the argument.
     *
     * @param {TemporalQuery} query - the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query (defined by the query)
     * @throws ArithmeticException if numeric overflow occurs (defined by the query)
     */
    query(query) {
        if (query === TemporalQueries.localDate()) {
            return this.toLocalDate();
        }
        requireNonNull(query, 'query');
        return super.query(query);
    }

    /**
     * Calculates the period between this date-time and another date-time in
     * terms of the specified unit.
     * <p>
     * This calculates the period between two date-times in terms of a single unit.
     * The start and end points are {@code this} and the specified date-time.
     * The result will be negative if the end is before the start.
     * For example, the period in days between two date-times can be calculated
     * using {@code startDateTime.until(endDateTime, DAYS)}.
     * <p>
     * The {@code Temporal} passed to this method must be a {@code ZonedDateTime}.
     * If the time-zone differs between the two zoned date-times, the specified
     * end date-time is normalized to have the same zone as this date-time.
     * <p>
     * The calculation returns a whole number, representing the number of
     * complete units between the two date-times.
     * For example, the period in months between 2012-06-15T00:00Z and 2012-08-14T23:59Z
     * will only be one month as it is one minute short of two months.
     * <p>
     * This method operates in association with {@link TemporalUnit#between}.
     * The result of this method is a {@code long} representing the amount of
     * the specified unit. By contrast, the result of {@code between} is an
     * object that can be used directly in addition/subtraction:
     * <pre>
     *   long period = start.until(end, MONTHS);   // this method
     *   dateTime.plus(MONTHS.between(start, end));      // use in plus/minus
     * </pre>
     * <p>
     * The calculation is implemented in this method for {@link ChronoUnit}.
     * The units {@code NANOS}, {@code MICROS}, {@code MILLIS}, {@code SECONDS},
     * {@code MINUTES}, {@code HOURS} and {@code HALF_DAYS}, {@code DAYS},
     * {@code WEEKS}, {@code MONTHS}, {@code YEARS}, {@code DECADES},
     * {@code CENTURIES}, {@code MILLENNIA} and {@code ERAS} are supported.
     * Other {@code ChronoUnit} values will throw an exception.
     * <p>
     * The calculation for date and time units differ.
     * <p>
     * Date units operate on the local time-line, using the local date-time.
     * For example, the period from noon on day 1 to noon the following day
     * in days will always be counted as exactly one day, irrespective of whether
     * there was a daylight savings change or not.
     * <p>
     * Time units operate on the instant time-line.
     * The calculation effectively converts both zoned date-times to instants
     * and then calculates the period between the instants.
     * For example, the period from noon on day 1 to noon the following day
     * in hours may be 23, 24 or 25 hours (or some other amount) depending on
     * whether there was a daylight savings change or not.
     * <p>
     * If the unit is not a {@code ChronoUnit}, then the result of this method
     * is obtained by invoking {@code TemporalUnit.between(Temporal, Temporal)}
     * passing {@code this} as the first argument and the input temporal as
     * the second argument.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} endExclusive  the end date-time, which is converted to a {@code ZonedDateTime}, not null
     * @param {TemporalUnit} unit  the unit to measure the period in, not null
     * @return {number} the amount of the period between this date-time and the end date-time
     * @throws DateTimeException if the period cannot be calculated
     * @throws ArithmeticException if numeric overflow occurs
     */
    until(endExclusive, unit) {
        var end = ZonedDateTime.from(endExclusive);
        if (unit instanceof ChronoUnit) {
            end = end.withZoneSameInstant(this._zone);
            if (unit.isDateBased()) {
                return this._dateTime.until(end._dateTime, unit);
            } else {
                // TODO check with iana tzdb, this might be wrong   
                return this._dateTime.until(end._dateTime, unit);
                // threeten says
                // return toOffsetDateTime().until(end.toOffsetDateTime(), unit)
                // OffsetDateTime.until ...
                // end = end.withOffsetSameInstant(offset);
                // return dateTime.until(end.dateTime, unit);
            }
        }
        return unit.between(this, end);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the {@code LocalDateTime} part of this date-time.
     * <p>
     * This returns a {@code LocalDateTime} with the same year, month, day and time
     * as this date-time.
     *
     * @return {LocalDateTime} the local date-time part of this date-time, not null
     */
    toLocalDateTime() {
        return this._dateTime;
    }

    /**
     * Gets the {@code LocalDate} part of this date-time.
     * <p>
     * This returns a {@code LocalDate} with the same year, month and day
     * as this date-time.
     *
     * @return {LocalDate} the date part of this date-time, not null
     */
    toLocalDate() {
        return this._dateTime.toLocalDate();
    }

    /**
     * Gets the {@code LocalTime} part of this date-time.
     * <p>
     * This returns a {@code LocalTime} with the same hour, minute, second and
     * nanosecond as this date-time.
     *
     * @return {LocalTime} the time part of this date-time, not null
     */
    toLocalTime() {
        return this._dateTime.toLocalTime();
    }

    /**
     * Converts this date-time to an {@code OffsetDateTime}.
     * <p>
     * This creates an offset date-time using the local date-time and offset.
     * The zone ID is ignored.
     *
     * @return {OffsetDateTime} an offset date-time representing the same local date-time and offset, not null
     */
    // toOffsetDateTime() {
    //     // TODO we do not support OffsetDateTime, clean up
    //     return OffsetDateTime.of(this._dateTime, this._offset);
    // }

    //-----------------------------------------------------------------------
    /**
     * Checks if this date-time is equal to another date-time.
     * <p>
     * The comparison is based on the offset date-time and the zone.
     * Only objects of type {@code ZonedDateTime} are compared, other types return false.
     *
     * @param {*} other  the object to check, null returns false
     * @return true if this is equal to the other date-time
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof ZonedDateTime) {
            return this._dateTime.equals(other._dateTime) &&
                this._offset.equals(other._offset) &&
                this._zone.equals(other._zone);
        }
        return false;
    }

    /**
     * A hash code for this date-time.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        var r = 17;
        r = 31 * r + this._dateTime.hashCode();
        r = 31 * r + this._offset.hashCode();
        r = 31 * r + this._zone.hashCode();
        return r;
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this date-time as a {@code String}, such as
     * {@code 2007-12-03T10:15:30+01:00[Europe/Paris]}.
     * <p>
     * The format consists of the {@code LocalDateTime} followed by the {@code ZoneOffset}.
     * If the {@code ZoneId} is not the same as the offset, then the ID is output.
     * The output is compatible with ISO-8601 if the offset and ID are the same.
     *
     * @return {string} a string representation of this date-time, not null
     */
    toString() {
        var str = this._dateTime.toString() + this._offset.toString();
        if (this._offset !== this._zone) {
            str += '[' + this._zone.toString() + ']';
        }
        return str;
    }
    
    /**
     *
     * @return {string} same as {@link ZonedDateTime.toString}
     */
    toJSON() {
        return this.toString();
    }

    /**
     * Outputs this date-time as a {@code String} using the formatter.
     * <p>
     * This date will be passed to the formatter
     * {@link DateTimeFormatter#format(TemporalAccessor) print method}.
     *
     * @param {DateTimeFormatter} formatter  the formatter to use, not null
     * @return {string} the formatted date-time string, not null
     * @throws DateTimeException if an error occurs during printing
     */
    format(formatter) {
        return super.format(formatter);
    }

}

export function _init(){
    ZonedDateTime.FROM = createTemporalQuery('ZonedDateTime.FROM', (temporal) => {
        return ZonedDateTime.from(temporal);
    });
}
