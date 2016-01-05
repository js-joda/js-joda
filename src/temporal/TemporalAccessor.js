import {TemporalQueries} from './TemporalQueries'

export class TemporalAccessor {
        /**
     * Queries this date-time.
     * <p>
     * This queries this date-time using the specified query strategy object.
     * <p>
     * Queries are a key tool for extracting information from date-times.
     * They exists to externalize the process of querying, permitting different
     * approaches, as per the strategy design pattern.
     * Examples might be a query that checks if the date is the day before February 29th
     * in a leap year, or calculates the number of days to your next birthday.
     * <p>
     * The most common query implementations are method references, such as
     * {@code LocalDate::from} and {@code ZoneId::from}.
     * Additional implementations are provided as static methods on {@link TemporalQuery}.
     *
     * @implSpec
     * The default implementation must behave equivalent to this code:
     * <pre>
     *  if (query == TemporalQueries.zoneId() ||
     *        query == TemporalQueries.chronology() || query == TemporalQueries.precision()) {
     *    return null;
     *  }
     *  return query.queryFrom(this);
     * </pre>
     * Future versions are permitted to add further queries to the if statement.
     * <p>
     * All classes implementing this interface and overriding this method must call
     * {@code TemporalAccessor.super.query(query)}. JDK classes may avoid calling
     * super if they provide behavior equivalent to the default behaviour, however
     * non-JDK classes may not utilize this optimization and must call {@code super}.
     * <p>
     * If the implementation can supply a value for one of the queries listed in the
     * if statement of the default implementation, then it must do so.
     * For example, an application-defined {@code HourMin} class storing the hour
     * and minute must override this method as follows:
     * <pre>
     *  if (query == TemporalQueries.precision()) {
     *    return MINUTES;
     *  }
     *  return TemporalAccessor.super.query(query);
     * </pre>
     * <p>
     * Implementations must ensure that no observable state is altered when this
     * read-only method is invoked.
     *
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query
     * @throws ArithmeticException if numeric overflow occurs
     */
    query(query) {
        if (query == TemporalQueries.zoneId()
                || query == TemporalQueries.chronology()
                || query == TemporalQueries.precision()) {
            return null;
        }
        return query.queryFrom(this);
    }

}