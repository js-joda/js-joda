/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {TemporalQueries, createTemporalQuery} from './TemporalQueries';

import {ChronoField} from './ChronoField';

import {LocalDate} from '../LocalDate';
import {LocalTime} from '../LocalTime';
import {ZoneOffset} from '../ZoneOffset';

//-----------------------------------------------------------------------
/**
 * A strict query for the {@code ZoneId}.
 */
var ZONE_ID;
TemporalQueries.ZONE_ID = () => {
    return ZONE_ID || (ZONE_ID = createTemporalQuery('ZONE_ID', (temporal) => {
        return temporal.query(TemporalQueries.ZONE_ID());
    }));
};

/**
 * A query for the {@code Chronology}.
 */
var CHRONO;
TemporalQueries.CHRONO = () => {
    return CHRONO || (CHRONO = createTemporalQuery('CHRONO', (temporal) => {
        return temporal.query(TemporalQueries.CHRONO());
    }));
};

/**
 * A query for the smallest supported unit.
 */
var PRECISION;
TemporalQueries.PRECISION = () => {
    return PRECISION || (PRECISION = createTemporalQuery('PRECISION', (temporal) => {
        return temporal.query(TemporalQueries.PRECISION());
    }));
};

//-----------------------------------------------------------------------
/**
 * A query for {@code ZoneOffset} returning null if not found.
 */
var OFFSET;
TemporalQueries.OFFSET = () => {
    return OFFSET || (OFFSET = createTemporalQuery('OFFSET', (temporal) => {
        if (temporal.isSupported(ChronoField.OFFSET_SECONDS)) {
            return ZoneOffset.ofTotalSeconds(temporal.get(TemporalQueries.OFFSET_SECONDS()));
        }
        return null;
    }));
};

/**
 * A lenient query for the {@code ZoneId}, falling back to the {@code ZoneOffset}.
 */
var ZONE;
TemporalQueries.ZONE = () => {
    return ZONE || (ZONE = createTemporalQuery('ZONE', (temporal) => {
        var zone = temporal.query(TemporalQueries.ZONE_ID());
        return (zone != null ? zone : temporal.query(TemporalQueries.OFFSET()));
    }));
};

/**
 * A query for {@code LocalDate} returning null if not found.
 */
var LOCAL_DATE;
TemporalQueries.LOCAL_DATE = () => {
    return LOCAL_DATE || (LOCAL_DATE = createTemporalQuery('LOCAL_DATE', (temporal) => {
        if (temporal.isSupported(ChronoField.EPOCH_DAY)) {
            return LocalDate.ofEpochDay(temporal.getLong(TemporalQueries.EPOCH_DAY()));
        }
        return null;
    }));
};

/**
 * A query for {@code LocalTime} returning null if not found.
 */
var LOCAL_TIME;
TemporalQueries.LOCAL_TIME = () => {
    return LOCAL_TIME || (LOCAL_TIME = createTemporalQuery('LOCAL_TIME', (temporal) => {
        if (temporal.isSupported(ChronoField.NANO_OF_DAY)) {
            return LocalTime.ofNanoOfDay(temporal.getLong(TemporalQueries.NANO_OF_DAY()));
        }
        return null;
    }));
};
