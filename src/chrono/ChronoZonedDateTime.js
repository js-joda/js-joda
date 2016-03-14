/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull} from '../assert';
import {Instant} from '../Instant';
import {LocalDate} from '../LocalDate';

import {ChronoUnit} from '../temporal/ChronoUnit';
import {Temporal} from '../temporal/Temporal';
import {TemporalQueries} from '../temporal/TemporalQueries';

export class ChronoZonedDateTime  extends Temporal {
    query(query) {
        if (query === TemporalQueries.zoneId() || query === TemporalQueries.zone()) {
            return this.zone();
        } else if (query === TemporalQueries.chronology()) {
            return this.toLocalDate().getChronology();
        } else if (query === TemporalQueries.precision()) {
            return ChronoUnit.NANOS;
        } else if (query === TemporalQueries.offset()) {
            return this.offset();
        } else if (query === TemporalQueries.localDate()) {
            return LocalDate.ofEpochDay(this.toLocalDate().toEpochDay());
        } else if (query === TemporalQueries.localTime()) {
            return this.toLocalTime();
        }
        return super.query(query);
    }

    /**
     * Outputs this date-time as a {@code String} using the formatter.
     *
     * @param {DateTimeFormatter} formatter - the formatter to use, not null
     * @return {string} the formatted date-time string, not null
     * @throws DateTimeException if an error occurs during printing
     */
    format(formatter) {
        requireNonNull(formatter, 'formatter');
        return formatter.format(this);
    }

    /**
     * Converts this date-time to an {@code Instant}.
     * <p>
     * This returns an {@code Instant} representing the same point on the
     * time-line as this date-time. The calculation combines the
     * {@linkplain #toLocalDateTime() local date-time} and
     * {@linkplain #getOffset() offset}.
     *
     * @return {Instant} an {@code Instant} representing the same instant, not null
     */
    toInstant() {
        return Instant.ofEpochSecond(this.toEpochSecond(), this.toLocalTime().nano());
    }

    /**
     * Converts this date-time to the number of seconds from the epoch
     * of 1970-01-01T00:00:00Z.
     * <p>
     * This uses the {@linkplain #toLocalDateTime() local date-time} and
     * {@linkplain #getOffset() offset} to calculate the epoch-second value,
     * which is the number of elapsed seconds from 1970-01-01T00:00:00Z.
     * Instants on the time-line after the epoch are positive, earlier are negative.
     *
     * @return {number} the number of seconds from the epoch of 1970-01-01T00:00:00Z
     */
    toEpochSecond() {
        var epochDay = this.toLocalDate().toEpochDay();
        var secs = epochDay * 86400 + this.toLocalTime().toSecondOfDay();
        secs -= this.offset().totalSeconds();
        return secs;
    }


}
