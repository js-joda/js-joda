/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {_init as DayOfWeekInit} from './DayOfWeek';
import {_init as DurationInit} from './Duration';
import {_init as InstantInit} from './Instant';
import {_init as LocalDateInit} from './LocalDate';
import {_init as LocalTimeInit} from './LocalTime';
import {_init as MonthInit} from './Month';
import {_init as PeriodInit} from './Period';
import {_init as YearInit} from './Year';
import {_init as ZoneOffsetInit} from './ZoneOffset';
import {_init as IsoChronologyInit} from './chrono/IsoChronology';
import {_init as DateTimeFormatterInit} from './format/DateTimeFormatter';
import {_init as ChronoFieldInit} from './temporal/ChronoField';
import {_init as ChronoUnitInit} from './temporal/ChronoUnit';
import {_init as TemporalQueriesInit} from './temporal/TemporalQueries';

var isInit = false;

function init() {

    if (isInit) {
        return;
    }

    isInit = true;

    YearInit();
    DurationInit();
    LocalTimeInit();
    ChronoUnitInit();
    ChronoFieldInit();
    TemporalQueriesInit();
    DayOfWeekInit();
    InstantInit();
    LocalDateInit();
    MonthInit();
    PeriodInit();
    ZoneOffsetInit();
    IsoChronologyInit();
    DateTimeFormatterInit();
}

init();
