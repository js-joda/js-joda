import {TemporalQueries} from './TemporalQueries';

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
     * Further implementations are on {@link TemporalQueries}.
     * Queries may also be defined by applications.
     *
     * @implSpec
     * Implementations of this method must behave as follows:
     * <pre>
        if (query == TemporalQueries.zoneId()
            || query == TemporalQueries.chronology()
            || query == TemporalQueries.precision()) {
                return null;
        }
        return query.queryFrom(this);
     * </pre>
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