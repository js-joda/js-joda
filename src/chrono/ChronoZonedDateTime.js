/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull} from '../assert';
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
            return ChronUnit.NANOS;
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

}
