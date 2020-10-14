import { Instant, Duration } from '@js-joda/core';

export class Interval {
    static of(startInclusive: Instant, endExclusive: Instant): Interval;
    static of(startInclusive: Instant, duration: Duration): Interval;
    static parse(text: string): Interval;

    private constructor();

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
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
}

export const __esModule: true;
export as namespace JSJodaExtra;
