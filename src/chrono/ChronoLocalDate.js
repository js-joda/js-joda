import {ChronoField} from '../temporal/ChronoField';
import {ChronoUnit} from '../temporal/ChronoUnit';
import {TemporalQueries} from '../temporal/TemporalQueries';
import {TemporalAccessor} from '../temporal/TemporalAccessor';

import {LocalDate} from '../LocalDate';

export class ChronoLocalDate extends TemporalAccessor {

    isSupported(fieldOrUnit) {
        if (fieldOrUnit instanceof ChronoField) {
            return fieldOrUnit.isDateBased();
        } else if (fieldOrUnit instanceof ChronoUnit) {
            return fieldOrUnit.isDateBased();
        }
        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
    }

    query(query) {
        if (query === TemporalQueries.chronology()) {
            return this.chronology();
        } else if (query === TemporalQueries.precision()) {
            return ChronoUnit.DAYS;
        } else if (query === TemporalQueries.localDate()) {
            return LocalDate.ofEpochDay(this.toEpochDay());
        } else if (query === TemporalQueries.localTime() || query === TemporalQueries.zone() ||
                query === TemporalQueries.zoneId() || query === TemporalQueries.offset()) {
            return null;
        }
        return super.query(query);
    }

}
