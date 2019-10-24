/// <reference types="@js-joda/core" />

import { Instant, Duration } from '@js-joda/core';

declare namespace JSJodaExtra {
  class Interval {
    static of(
      startInstant: Instant,
      endInstantOrDuration: Instant | Duration,
    ): Interval;

    static ofInstantInstant(
      startInclusive: Instant,
      endExclusive: Instant,
    ): Interval;

    static ofInstantDuration(
      startInclusive: Instant,
      duration: Duration,
    ): Interval;

    static parse(text: string): Interval;

    constructor(startInclusive: Instant, endExclusive: Instant);

    start(): Instant;
    end(): Instant;

    isEmpty(): boolean;
    isUnboundedStart(): boolean;
    isUnboundedEnd(): boolean;
    withStart(start: Instant): Interval;
    withEnd(end: Instant): Interval;
    contains(instant: Instant): boolean;
    encloses(other: Interval): boolean;
    abuts(other: Interval): boolean;
    isConnected(other: Interval): boolean;
    overlaps(other: Interval): boolean;
    intersection(other: Interval): Interval;
    union(other: Interval): Interval;
    span(other: Interval): Interval;
    isAfter(instantOrInterval: Instant | Interval): boolean;
    isBefore(instantOrInterval: Instant | Interval): boolean;
    isAfterInstant(instant: Instant): boolean;
    isBeforeInstant(instant: Instant): boolean;
    isAfterInterval(interval: Interval): boolean;
    isBeforeInterval(interval: Interval): boolean;
    toDuration(): Duration;
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }
}

export = JSJodaExtra;
