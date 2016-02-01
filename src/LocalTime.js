/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
export class LocalTime {

}

LocalTime.HOURS_PER_DAY = 24;
LocalTime.MINUTES_PER_HOUR = 60;
LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;

LocalTime.SECONDS_PER_MINUTE = 60;
LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;

LocalTime.NANOS_PER_SECOND = 1000000000;