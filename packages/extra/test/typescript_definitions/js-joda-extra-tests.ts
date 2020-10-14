import {
  Instant,
  Duration,
  LocalDate,
} from '@js-joda/core'
import {
  Interval
} from '../..';

// See packages/core/test/typescript_definitions/js-joda-tests.ts for an explanation of these tests.

function test_Interval() {
  const instant = Instant.now();
  const duration = Duration.ofHours(1);

  Interval.of(instant, duration);

  Interval.parse('2019-08-09T20:38:43.298Z/2019-08-09T20:38:43.298Z');

  const interval = Interval.of(instant, instant);
  interval.start();
  interval.end();
  interval.isEmpty();
  interval.isUnboundedStart();
  interval.isUnboundedEnd();
  interval.withStart(instant);
  interval.withEnd(instant);
  interval.contains(instant);
  interval.encloses(interval);
  interval.abuts(interval);
  interval.isConnected(interval);
  interval.overlaps(interval);
  interval.intersection(interval);
  interval.union(interval);
  interval.span(interval);
  interval.isAfter(interval);
  interval.isAfter(instant);
  interval.isBefore(interval);
  interval.isBefore(instant);
  interval.isAfterInstant(instant);
  interval.isBeforeInstant(instant);
  interval.isAfterInterval(interval);
  interval.isBeforeInterval(interval);
  interval.toDuration();
  interval.equals({});
  interval.hashCode();
  interval.toString();

  LocalDate.ofInstant(interval.end());
}
