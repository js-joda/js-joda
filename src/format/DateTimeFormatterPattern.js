/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeFormatter} from './DateTimeFormatter';
import {DateTimeFormatterBuilder} from './DateTimeFormatterBuilder';
import {SignStyle} from './SignStyle';
import {ResolverStyle} from './ResolverStyle';

import {IsoChronology} from '../chrono/IsoChronology';
import {ChronoField} from '../temporal/ChronoField';

DateTimeFormatter.ISO_LOCAL_DATE = new DateTimeFormatterBuilder()
    .appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
    .appendLiteral('-')
    .appendValue(ChronoField.MONTH_OF_YEAR, 2)
    .appendLiteral('-')
    .appendValue(ChronoField.DAY_OF_MONTH, 2)
    .toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);