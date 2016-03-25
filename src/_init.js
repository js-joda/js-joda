/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {_init as ZoneOffsetInit} from './ZoneOffset';
import {_init as DayOfWeekInit} from './DayOfWeek';
import {_init as DurationInit} from './Duration';
import {_init as InstantInit} from './Instant';
import {_init as LocalDateInit} from './LocalDate';
import {_init as LocalTimeInit} from './LocalTime';
import {_init as LocalDateTimeInit} from './LocalDateTime';
import {_init as MonthInit} from './Month';
import {_init as PeriodInit} from './Period';
import {_init as YearConstantsInit} from './YearConstants';
import {_init as YearInit} from './Year';
import {_init as ZonedDateTimeInit} from './ZonedDateTime';
import {_init as IsoChronologyInit} from './chrono/IsoChronology';
import {_init as DateTimeFormatterInit} from './format/DateTimeFormatter';
import {_init as ChronoFieldInit} from './temporal/ChronoField';
import {_init as ChronoUnitInit} from './temporal/ChronoUnit';
import {_init as IsoFieldsInit} from './temporal/IsoFields';

import {_init as TemporalQueriesInit} from './temporal/TemporalQueriesFactory';
import {_init as ZoneIdInit} from './ZoneIdFactory';

var isInit = false;

function init() {

    if (isInit) {
        return;
    }

    isInit = true;

    YearConstantsInit();
    DurationInit();
    LocalTimeInit();
    ChronoUnitInit();
    ChronoFieldInit();
    IsoFieldsInit();
    TemporalQueriesInit();
    DayOfWeekInit();
    InstantInit();
    LocalDateInit();
    LocalDateTimeInit();
    YearInit();
    MonthInit();
    PeriodInit();
    ZoneOffsetInit();
    ZonedDateTimeInit();
    ZoneIdInit();
    IsoChronologyInit();
    DateTimeFormatterInit();
}

init();
