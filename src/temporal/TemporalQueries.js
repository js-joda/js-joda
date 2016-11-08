/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Common implementations of {@link TemporalQuery}.
 * <p>
 * This class provides common implementations of {@link TemporalQuery}.
 * These queries are primarily used as optimizations, allowing the internals
 * of other objects to be extracted effectively. Note that application code
 * can also use the {@link from} method on most temporal
 * objects as a method reference matching the query interface, such as
 * {@link LocalDate::from} and {@link ZoneId::from}.
 * <p>
 * There are two equivalent ways of using a {@link TemporalQuery}.
 * The first is to invoke the method on the interface directly.
 * The second is to use {@link TemporalAccessor#query}:
 * <pre>
 *   // these two lines are equivalent, but the second approach is recommended
 *   dateTime = query.queryFrom(dateTime);
 *   dateTime = dateTime.query(query);
 * </pre>
 * It is recommended to use the second approach, {@link query},
 * as it is a lot clearer to read in code.
 *
 */
export class TemporalQueries {

    /**
     * A strict query for the {@link ZoneId}.
     * <p>
     * This queries a {@link TemporalAccessor} for the zone.
     * The zone is only returned if the date-time conceptually contains a {@link ZoneId}.
     * It will not be returned if the date-time only conceptually has an {@link ZoneOffset}.
     * Thus a {@link ZonedDateTime} will return the result of
     * {@link getZone}, but an {@link OffsetDateTime} will
     * return null.
     * <p>
     * In most cases, applications should use {@link ZONE} as this query is too strict.
     * <p>
     * The result from JDK classes implementing {@link TemporalAccessor} is as follows:<br>
     * {@link LocalDate} returns null<br>
     * {@link LocalTime} returns null<br>
     * {@link LocalDateTime} returns null<br>
     * {@link ZonedDateTime} returns the associated zone<br>
     * {@link OffsetTime} returns null<br>
     * {@link OffsetDateTime} returns null<br>
     * {@link ChronoLocalDate} returns null<br>
     * {@link ChronoLocalDateTime} returns null<br>
     * {@link ChronoZonedDateTime} returns the associated zone<br>
     * {@link Era} returns null<br>
     * {@link DayOfWeek} returns null<br>
     * {@link Month} returns null<br>
     * {@link Year} returns null<br>
     * {@link YearMonth} returns null<br>
     * {@link MonthDay} returns null<br>
     * {@link ZoneOffset} returns null<br>
     * {@link Instant} returns null<br>
     *
     * @return a query that can obtain the zone ID of a temporal, not null
     */
    static zoneId() {
        return TemporalQueries.ZONE_ID;
    }

    /**
     * A query for the {@link Chronology}.
     * <p>
     * This queries a {@link TemporalAccessor} for the chronology.
     * If the target {@link TemporalAccessor} represents a date, or part of a date,
     * then it should return the chronology that the date is expressed in.
     * As a result of this definition, objects only representing time, such as
     * {@link LocalTime}, will return null.
     * <p>
     * The result from js-joda classes implementing {@link TemporalAccessor} is as follows:<br>
     * {@link LocalDate} returns {@link IsoChronology.INSTANCE}<br>
     * {@link LocalTime} returns null (does not represent a date)<br>
     * {@link LocalDateTime} returns {@link IsoChronology.INSTANCE}<br>
     * {@link ZonedDateTime} returns {@link IsoChronology.INSTANCE}<br>
     * {@link OffsetTime} returns null (does not represent a date)<br>
     * {@link OffsetDateTime} returns {@link IsoChronology.INSTANCE}<br>
     * {@link ChronoLocalDate} returns the associated chronology<br>
     * {@link ChronoLocalDateTime} returns the associated chronology<br>
     * {@link ChronoZonedDateTime} returns the associated chronology<br>
     * {@link Era} returns the associated chronology<br>
     * {@link DayOfWeek} returns null (shared across chronologies)<br>
     * {@link Month} returns {@link IsoChronology.INSTANCE}<br>
     * {@link Year} returns {@link IsoChronology.INSTANCE}<br>
     * {@link YearMonth} returns {@link IsoChronology.INSTANCE}<br>
     * {@link MonthDay} returns null {@link IsoChronology.INSTANCE}<br>
     * {@link ZoneOffset} returns null (does not represent a date)<br>
     * {@link Instant} returns null (does not represent a date)<br>
     * <p>
     * The method {@link Chronology#from} can be used as a
     * {@link TemporalQuery}
     * That method is equivalent to this query, except that it throws an
     * exception if a chronology cannot be obtained.
     *
     * @return {TemporalQuery} a query that can obtain the chronology of a temporal, not null
     */
    static chronology() {
        return TemporalQueries.CHRONO;
    }

    /**
     * A query for the smallest supported unit.
     * <p>
     * This queries a {@link TemporalAccessor} for the time precision.
     * If the target {@link TemporalAccessor} represents a consistent or complete date-time,
     * date or time then this must return the smallest precision actually supported.
     * Note that fields such as {@link NANO_OF_DAY} and {@link NANO_OF_SECOND}
     * are defined to always return ignoring the precision, thus this is the only
     * way to find the actual smallest supported unit.
     * For example, were {@link GregorianCalendar} to implement {@link TemporalAccessor}
     * it would return a precision of {@link MILLIS}.
     * <p>
     * The result from js-joda classes implementing {@link TemporalAccessor} is as follows:<br>
     * {@link LocalDate} returns {@link DAYS}<br>
     * {@link LocalTime} returns {@link NANOS}<br>
     * {@link LocalDateTime} returns {@link NANOS}<br>
     * {@link ZonedDateTime} returns {@link NANOS}<br>
     * {@link OffsetTime} returns {@link NANOS}<br>
     * {@link OffsetDateTime} returns {@link NANOS}<br>
     * {@link ChronoLocalDate} returns {@link DAYS}<br>
     * {@link ChronoLocalDateTime} returns {@link NANOS}<br>
     * {@link ChronoZonedDateTime} returns {@link NANOS}<br>
     * {@link Era} returns {@link ERAS}<br>
     * {@link DayOfWeek} returns {@link DAYS}<br>
     * {@link Month} returns {@link MONTHS}<br>
     * {@link Year} returns {@link YEARS}<br>
     * {@link YearMonth} returns {@link MONTHS}<br>
     * {@link MonthDay} returns null (does not represent a complete date or time)<br>
     * {@link ZoneOffset} returns null (does not represent a date or time)<br>
     * {@link Instant} returns {@link NANOS}<br>
     *
     * @return a query that can obtain the precision of a temporal, not null
     */
    static precision() {
        return TemporalQueries.PRECISION;
    }

    /**
     * A lenient query for the {@link ZoneId}, falling back to the {@link ZoneOffset}.
     * <p>
     * This queries a {@link TemporalAccessor} for the zone.
     * It first tries to obtain the zone, using {@link zoneId}.
     * If that is not found it tries to obtain the {@link offset}.
     * <p>
     * In most cases, applications should use this query rather than {@link zoneId}.
     * <p>
     * This query examines the {@link ChronoField#OFFSET_SECONDS}
     * field and uses it to create a {@link ZoneOffset}.
     * <p>
     * The method {@link ZoneId#from} can be used as a
     * {@link TemporalQuery} via a method reference, {@link ZoneId::from}.
     * That method is equivalent to this query, except that it throws an
     * exception if a zone cannot be obtained.
     *
     * @return a query that can obtain the zone ID or offset of a temporal, not null
     */
    static zone() {
        return TemporalQueries.ZONE;
    }

    /**
     * A query for {@link ZoneOffset} returning null if not found.
     * <p>
     * This returns a {@link TemporalQuery} that can be used to query a temporal
     * object for the offset. The query will return null if the temporal
     * object cannot supply an offset.
     * <p>
     * The query implementation examines the {@link ChronoField#OFFSET_SECONDS}
     * field and uses it to create a {@link ZoneOffset}.
     * <p>
     * The method {@link java.time.ZoneOffset#from} can be used as a
     * {@link TemporalQuery} via a method reference, {@link ZoneOffset::from}.
     * This query and {@link ZoneOffset::from} will return the same result if the
     * temporal object contains an offset. If the temporal object does not contain
     * an offset, then the method reference will throw an exception, whereas this
     * query will return null.
     *
     * @return a query that can obtain the offset of a temporal, not null
     */
    static offset() {
        return TemporalQueries.OFFSET;
    }

    /**
     * A query for {@link LocalDate} returning null if not found.
     * <p>
     * This returns a {@link TemporalQuery} that can be used to query a temporal
     * object for the local date. The query will return null if the temporal
     * object cannot supply a local date.
     * <p>
     * The query implementation examines the {@link ChronoField#EPOCH_DAY}
     * field and uses it to create a {@link LocalDate}.
     *
     * @return a query that can obtain the date of a temporal, not null
     */
    static localDate() {
        return TemporalQueries.LOCAL_DATE;
    }

    /**
     * A query for {@link LocalTime} returning null if not found.
     * <p>
     * This returns a {@link TemporalQuery} that can be used to query a temporal
     * object for the local time. The query will return null if the temporal
     * object cannot supply a local time.
     * <p>
     * The query implementation examines the {@link ChronoField#NANO_OF_DAY}
     * field and uses it to create a {@link LocalTime}.
     *
     * @return a query that can obtain the time of a temporal, not null
     */
    static localTime() {
        return TemporalQueries.LOCAL_TIME;
    }
}
