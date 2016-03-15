/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull} from '../assert';
import {Instant} from '../Instant';
import {LocalDate} from '../LocalDate';
import {MathUtil} from '../MathUtil';

import {ChronoUnit} from '../temporal/ChronoUnit';
import {Temporal} from '../temporal/Temporal';
import {TemporalQueries} from '../temporal/TemporalQueries';

export class ChronoZonedDateTime  extends Temporal {
    query(query) {
        if (query === TemporalQueries.zoneId() || query === TemporalQueries.zone()) {
            return this.zone();
        } else if (query === TemporalQueries.chronology()) {
            return this.toLocalDate().chronology();
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

    /**
      * Compares this date-time to another date-time, including the chronology.
      * <p>
      * The comparison is based first on the instant, then on the local date-time,
      * then on the zone ID, then on the chronology.
      * It is "consistent with equals", as defined by {@link Comparable}.
      * <p>
      * If all the date-time objects being compared are in the same chronology, then the
      * additional chronology stage is not required.
      *
      * @param {ChronoZonedDateTime} other - the other date-time to compare to, not null
      * @return {number} the comparator value, negative if less, positive if greater
      */
    compareTo(other) {
        requireNonNull(other, 'other');
        var cmp = MathUtil.compareNumbers(this.toEpochSecond(), other.toEpochSecond());
        if (cmp === 0) {
            cmp = this.toLocalTime().nano() - other.toLocalTime().nano();
            if (cmp === 0) {
                cmp = this.toLocalDateTime().compareTo(other.toLocalDateTime());
                if (cmp === 0) {
                    cmp = strcmp(this.zone().id(), other.zone().id());
                    // we only support iso for now
                    //if (cmp === 0) {
                    //    cmp = toLocalDate().getChronology().compareTo(other.toLocalDate().getChronology());
                    //}
                }
            }
        }
        return cmp;
    }

}

function strcmp(a, b){
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
