import { Instant, Duration, TemporalAccessor, Clock, ZoneId, TemporalField, ValueRange, TemporalQuery, Temporal, LocalDate, Year, MonthDay, YearMonth, Month } from '@js-joda/core';

export class DayOfMonth extends TemporalAccessor {
    static from(temporal: TemporalAccessor): DayOfMonth;
    static now(zoneIdOrClock?: ZoneId | Clock): DayOfMonth;
    static of(dayOfMonth: number): DayOfMonth;

    private constructor(dayOfMonth: number);

    adjustInto(temporal: Temporal): Temporal;
    atMonth(month: number | Month): MonthDay;
    atYearMonth(yearMonth: YearMonth): LocalDate;
    compareTo(other: DayOfMonth): number;
    equals(obj: any): boolean;
    get(field: TemporalField): number;
    getLong(field: TemporalField): number;
    value(): number;
    hashCode(): number;
    isSupported(field: TemporalField): boolean;
    isValidYearMonth(yearMonth: YearMonth): boolean;
    query<R>(query: TemporalQuery<R>): R | null;
    range(field: TemporalField): ValueRange;
    toString(): string;
}

export class DayOfYear extends TemporalAccessor {
    static from(temporal: TemporalAccessor): DayOfYear;
    static now(zoneIdOrClock?: ZoneId | Clock): DayOfYear;
    static of(dayOfYear: number): DayOfYear;

    private constructor(dayOfYear: number);

    adjustInto(temporal: Temporal): Temporal;
    atYear(year: number | Year): LocalDate;
    compareTo(other: DayOfYear): number;
    equals(obj: any): boolean;
    get(field: TemporalField): number;
    getLong(field: TemporalField): number;
    value(): number;
    hashCode(): number;
    isSupported(field: TemporalField): boolean;
    isValidYear(year: number): boolean;
    query<R>(query: TemporalQuery<R>): R | null;
    range(field: TemporalField): ValueRange;
    toString(): string;
}

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
