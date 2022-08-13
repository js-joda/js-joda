import { Instant, Duration, TemporalAccessor, Clock, ZoneId, TemporalField, ValueRange, TemporalQuery, Temporal, LocalDate, Year, MonthDay, YearMonth, Month, DateTimeFormatter, DayOfWeek, TemporalUnit, TemporalAmount, TemporalAdjuster, TextStyle } from '@js-joda/core';

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

export class Quarter extends TemporalAccessor implements TemporalAdjuster {
	static Q1: Quarter;
	static Q2: Quarter;
	static Q3: Quarter;
	static Q4: Quarter;

	static from(temporal: TemporalAccessor): Quarter;
	static of(quarterOfYear: number): Quarter;
	static ofMonth(monthOfYear: number): Quarter;
	static valueOf(name: string): Quarter;
	static values(): Quarter[];

	private constructor(value: number, name: string);

	adjustInto(temporal: Temporal): Temporal;
	compareTo(other: Quarter): number;
	displayName(style: TextStyle, locale: Locale): string;
	equals(other: any): boolean;
	firstMonth(): Month;
	get(field: TemporalField): number;
	getLong(field: TemporalField): number;
	isSupported(field: TemporalField): boolean;
	length(leapYear: boolean): number;
	minus(months: number): Quarter;
	name(): string;
	ordinal(): number;
	plus(months: number): Quarter;
	query<R>(query: TemporalQuery<R>): R | null;
	range(field: TemporalField): ValueRange;
	toString(): string;
	value(): number;
}

export class YearQuarter extends Temporal {
	static from(temporal: TemporalAccessor): YearQuarter;
	static now(zoneIdOrClock?: ZoneId | Clock): YearQuarter;
	static of(year: Year | number, quarter: Quarter | number): YearQuarter;
	static parse(text: string, formatter?: DateTimeFormatter): YearQuarter;

	private constructor(year: number, quarter: Quarter);

	isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean
	range(field: TemporalField): ValueRange;
	get(field: TemporalField): number;
	getLong(field: TemporalField): number;
	year(): number;
	quarterValue(): number;
	quarter(): Quarter;
	isLeapYear(): boolean;
	isValidDay(dayOfQuarter: number): boolean;
	lengthOfQuarter(): number;
	lengthOfYear(): number;
	with(adjuster: TemporalAdjuster): YearQuarter;
	with(field: TemporalField, newValue: number): YearQuarter;
	withYear(year: number): YearQuarter;
	withQuarter(quarter: number): YearQuarter;
	plus(amountToAdd: number, unit: TemporalUnit): YearQuarter;
	plus(amountToAdd: TemporalAmount): YearQuarter;
	plusYears(yearsToAdd: number): YearQuarter
	plusQuarters(quartersToAdd: number): YearQuarter
	minus(amountToSubtract: number, unit: TemporalUnit): YearQuarter;
	minus(amountToSubtract: TemporalAmount): YearQuarter;
	minusYears(yearsToSubtract: number): YearQuarter
	minusQuarters(quartersToSubtract: number): YearQuarter
	query<R>(query: TemporalQuery<R>): R | null;
	adjustInto(temporal: Temporal): Temporal;
	until(endExclusive: Temporal, unit: TemporalUnit): number;
	quartersUntil(endExclusive: YearQuarter): Generator<YearQuarter>;
	format(formatter: DateTimeFormatter): string;
	atDay(dayOfQuarter: number): LocalDate
	atEndOfQuarter(): YearQuarter;
	compareTo(other: YearQuarter): number;
	isAfter(other: YearQuarter): boolean
	isBefore(other: YearQuarter): boolean
	equals(obj: any): boolean;
	hashCode(): number;
	toString(): string;

	protected _minusUnit(amountToSubtract: number, unit: TemporalUnit): YearQuarter;
	protected _minusAmount(amount: TemporalAmount): YearQuarter;
	protected _plusUnit(amountToAdd: number, unit: TemporalUnit): YearQuarter;
	protected _plusAmount(amount: TemporalAmount): YearQuarter;
	protected _withAdjuster(adjuster: TemporalAdjuster): YearQuarter;
	protected _withField(field: TemporalField, newValue: number): YearQuarter;
}

export class YearWeek extends Temporal {
	static from(temporal: TemporalAccessor): YearWeek;
	static now(zoneIdOrClock?: ZoneId | Clock): YearWeek;
	static of(year: Year | number, week: number): YearWeek;
	static parse(text: string, formatter?: DateTimeFormatter): YearWeek;

	private constructor(weekBasedYear: number, week: number);

	adjustInto(temporal: Temporal): Temporal;
	atDay(dayOfWeek: DayOfWeek): LocalDate;
	compareTo(other: YearWeek): number;
	equals(obj: any): boolean;
	format(formatter: DateTimeFormatter): string;
	get(field: TemporalField): number;
	getLong(field: TemporalField): number;
	week(): number;
	year(): number;
	hashCode(): number;
	is53WeekYear(): boolean
	isAfter(other: YearWeek): boolean
	isBefore(other: YearWeek): boolean
	isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
	lengthOfYear(): number;
	minus(amountToSubtract: number, unit: TemporalUnit): YearWeek;
	minus(amountToSubtract: TemporalAmount): YearWeek;
	minusWeeks(weeksToSubtract: number): YearWeek;
	minusYears(yearsToSubtract: number): YearWeek;
	plus(amountToAdd: number, unit: TemporalUnit): YearWeek;
	plus(amountToAdd: TemporalAmount): YearWeek;
	plusWeeks(weeksToAdd: number): YearWeek;
	plusYears(yearsToAdd: number): YearWeek;
	query<R>(query: TemporalQuery<R>): R | null;
	range(field: TemporalField): ValueRange;
	toString(): string;
	until(endExclusive: Temporal, unit: TemporalUnit): number;
	with(adjuster: TemporalAdjuster): YearWeek;
	with(field: TemporalField, newValue: number): YearWeek;
	withWeek(week: number): YearWeek;
	withYear(weekBasedYear: number): YearWeek;

	protected _minusUnit(amountToSubtract: number, unit: TemporalUnit): YearWeek;
	protected _minusAmount(amount: TemporalAmount): YearWeek;
	protected _plusUnit(amountToAdd: number, unit: TemporalUnit): YearWeek;
	protected _plusAmount(amount: TemporalAmount): YearWeek;
	protected _withAdjuster(adjuster: TemporalAdjuster): YearWeek;
	protected _withField(field: TemporalField, newValue: number): YearWeek;
}

declare class Locale {
}

export const __esModule: true;
export as namespace JSJodaExtra;
