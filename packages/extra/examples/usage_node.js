/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
/* eslint-disable no-console, no-var */
var joda = require('@js-joda/core');
var jodaExtra = require('../dist/js-joda-extra');

var startInstant = joda.ZonedDateTime.of(2016, 11, 7, 0, 0, 0, 0, joda.ZoneOffset.UTC).toInstant();
var innerInstant = startInstant.plus(1, joda.ChronoUnit.DAYS);
var endInstant = startInstant.plus(2, joda.ChronoUnit.DAYS);
var outerInstant = startInstant.plus(3, joda.ChronoUnit.DAYS);
var interval = new jodaExtra.Interval(startInstant, endInstant);
console.log('toString:', interval.toString());
console.log('contains inner:', interval.contains(innerInstant));
console.log('contains outer:', interval.contains(outerInstant));
