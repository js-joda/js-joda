export class ParsePosition {
    constructor(index: number);

    getIndex(): number;
    setIndex(index: number): void;
    getErrorIndex(): number;
    setErrorIndex(errorIndex: number): void;
}

export class DecimalStyle {
    private constructor();

    equals(other: any): boolean;
    decimalSeparator(): string;
    negativeSign(): string;
    positiveSign(): string;
    zeroDigit(): string;
    hashCode(): any;
    toString(): string;
}

export abstract class TemporalQuery<R> {
    abstract queryFrom(temporal: TemporalAccessor): R;
}

export abstract class TemporalAccessor {
    get(field: TemporalField): number;
    query<R>(query: TemporalQuery<R>): R | null;
    range(field: TemporalField): ValueRange;
    abstract getLong(field: TemporalField): number;
    abstract isSupported(field: TemporalField): boolean;
}

export abstract class Temporal extends TemporalAccessor {
    abstract isSupported(field: TemporalField): boolean;
    abstract isSupported(unit: TemporalUnit): boolean;
    abstract minus(amountToSubtract: number, unit: TemporalUnit): Temporal;
    abstract minus(amount: TemporalAmount): Temporal;
    abstract plus(amountToAdd: number, unit: TemporalUnit): Temporal;
    abstract plus(amount: TemporalAmount): Temporal;
    abstract until(endTemporal: Temporal, unit: TemporalUnit): number;
    abstract with(adjuster: TemporalAdjuster): Temporal;
    abstract with(field: TemporalField, newValue: number): Temporal;
}

export abstract class Clock {
    static fixed(fixedInstant: Instant, zoneId: ZoneId): Clock;
    static offset(baseClock: Clock, offsetDuration: Duration): Clock;
    static system(zone: ZoneId): Clock;
    static systemDefaultZone(): Clock;
    static systemUTC(): Clock;

    abstract instant(): Instant;
    abstract millis(): number;
    abstract zone(): ZoneId;
    abstract withZone(zone: ZoneId): Clock;
    abstract equals(other: any): boolean;
}

export class DayOfWeek extends TemporalAccessor implements TemporalAdjuster {
    static MONDAY: DayOfWeek;
    static TUESDAY: DayOfWeek;
    static WEDNESDAY: DayOfWeek;
    static THURSDAY: DayOfWeek;
    static FRIDAY: DayOfWeek;
    static SATURDAY: DayOfWeek;
    static SUNDAY: DayOfWeek;

    static FROM: TemporalQuery<DayOfWeek>;

    static from(temporal: TemporalAccessor): DayOfWeek;
    static of(dayOfWeek: number): DayOfWeek;
    static valueOf(name: string): DayOfWeek;
    static values(): DayOfWeek[];

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    compareTo(other: DayOfWeek): number;
    equals(other: any): boolean;
    displayName(style: TextStyle, locale: Locale): string;
    getLong(field: TemporalField): number;
    isSupported(field: TemporalField): boolean;
    minus(days: number): DayOfWeek;
    name(): string;
    ordinal(): number;
    plus(days: number): DayOfWeek;
    toJSON(): string;
    toString(): string;
    value(): number;
}

export abstract class TemporalAmount {
    abstract addTo<T extends Temporal>(temporal: T): T;
    abstract get(unit: TemporalUnit): number;
    abstract units(): TemporalUnit[];
    abstract subtractFrom<T extends Temporal>(temporal: T): T;
}

export class Duration extends TemporalAmount {
    static ZERO: Duration;

    static between(startInclusive: Temporal, endExclusive: Temporal): Duration;
    static from(amount: TemporalAmount): Duration;
    static of(amount: number, unit: TemporalUnit): Duration;
    static ofDays(days: number): Duration;
    static ofHours(hours: number): Duration;
    static ofMillis(millis: number): Duration;
    static ofMinutes(minutes: number): Duration;
    static ofNanos(nanos: number): Duration;
    static ofSeconds(seconds: number, nanoAdjustment?: number): Duration;
    static parse(text: string): Duration;

    private constructor();

    abs(): Duration;
    addTo<T extends Temporal>(temporal: T): T;
    compareTo(otherDuration: Duration): number;
    dividedBy(divisor: number): Duration;
    equals(other: any): boolean;
    get(unit: TemporalUnit): number;
    isNegative(): boolean;
    isZero(): boolean;
    minus(duration: Duration): Duration;
    minus(amount: number, unit: ChronoUnit): Duration;
    minusDays(daysToSubtract: number): Duration;
    minusHours(hoursToSubtract: number): Duration;
    minusMillis(millisToSubtract: number): Duration;
    minusMinutes(minutesToSubtract: number): Duration;
    minusNanos(nanosToSubtract: number): Duration;
    minusSeconds(secondsToSubtract: number): Duration;
    multipliedBy(multiplicand: number): Duration;
    nano(): number;
    negated(): Duration;
    plus(duration: Duration): Duration;
    plus(amount: number, unit: ChronoUnit): Duration;
    plusDays(daysToAdd: number): Duration;
    plusHours(hoursToAdd: number): Duration;
    plusMillis(millisToAdd: number): Duration;
    plusMinutes(minutesToAdd: number): Duration;
    plusNanos(nanosToAdd: number): Duration;
    plusSeconds(secondsToAdd: number): Duration;
    plusSecondsNanos(secondsToAdd: number, nanosToAdd: number): Duration;
    seconds(): number;
    subtractFrom<T extends Temporal>(temporal: T): T;
    toDays(): number;
    toHours(): number;
    toJSON(): string;
    toMillis(): number;
    toMinutes(): number;
    toNanos(): number;
    toString(): string;
    units(): TemporalUnit[];
    withNanos(nanoOfSecond: number): Duration;
    withSeconds(seconds: number): Duration;
}

export class Instant extends Temporal implements TemporalAdjuster {
    static EPOCH: Instant;
    static MIN: Instant;
    static MAX: Instant;
    static MIN_SECONDS: Instant;
    static MAX_SECONDS: Instant;

    static FROM: TemporalQuery<Instant>;

    static from(temporal: TemporalAccessor): Instant;
    static now(clock?: Clock): Instant;
    static ofEpochMilli(epochMilli: number): Instant;
    static ofEpochSecond(epochSecond: number, nanoAdjustment?: number): Instant;
    static parse(text: string): Instant;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    atZone(zone: ZoneId): ZonedDateTime;
    compareTo(otherInstant: Instant): number;
    epochSecond(): number;
    equals(other: any): boolean;
    getLong(field: TemporalField): number;
    hashCode(): number;
    isAfter(otherInstant: Instant): boolean;
    isBefore(otherInstant: Instant): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    minus(amount: TemporalAmount): Instant;
    minus(amountToSubtract: number, unit: TemporalUnit): Instant;
    minusMillis(millisToSubtract: number): Instant;
    minusNanos(nanosToSubtract: number): Instant;
    minusSeconds(secondsToSubtract: number): Instant;
    nano(): number;
    plus(amount: TemporalAmount): Instant;
    plus(amountToAdd: number, unit: TemporalUnit): Instant;
    plusMillis(millisToAdd: number): Instant;
    plusNanos(nanosToAdd: number): Instant;
    plusSeconds(secondsToAdd: number): Instant;
    toEpochMilli(): number;
    toJSON(): string;
    toString(): string;
    truncatedTo(unit: TemporalUnit): Instant;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): Instant;
    with(field: TemporalField, newValue: number): Instant;
}

export class ResolverStyle {
    static STRICT: ResolverStyle;
    static SMART: ResolverStyle;
    static LENIENT: ResolverStyle;

    private constructor();

    equals(other: any): boolean;
    toJSON(): string;
    toString(): string;
}

export class SignStyle {
    static NORMAL: SignStyle;
    static NEVER: SignStyle;
    static ALWAYS: SignStyle;
    static EXCEEDS_PAD: SignStyle;
    static NOT_NEGATIVE: SignStyle;

    private constructor();

    equals(other: any): boolean;
    toJSON(): string;
    toString(): string;
}

export class DateTimeFormatter {
    static ISO_LOCAL_DATE: DateTimeFormatter;
    static ISO_LOCAL_TIME: DateTimeFormatter;
    static ISO_LOCAL_DATE_TIME: DateTimeFormatter;
    static ISO_INSTANT: DateTimeFormatter;
    static ISO_OFFSET_DATE_TIME: DateTimeFormatter;
    static ISO_ZONED_DATE_TIME: DateTimeFormatter;

    static ofPattern(pattern: string): DateTimeFormatter;
    static parsedExcessDays(): TemporalQuery<Period>;
    static parsedLeapSecond(): TemporalQuery<boolean>;

    private constructor();

    chronology(): Chronology | null;
    decimalStyle(): DecimalStyle;
    format(temporal: TemporalAccessor): string;
    locale(): any;
    parse(text: string): TemporalAccessor;
    parse<T>(text: string, query: TemporalQuery<T>): T;
    parseUnresolved(text: string, position: ParsePosition): TemporalAccessor;
    toString(): string;
    withChronology(chrono: Chronology): DateTimeFormatter;
    withLocale(locale: Locale): DateTimeFormatter;
    withResolverStyle(resolverStyle: ResolverStyle): DateTimeFormatter;
}

export class DateTimeFormatterBuilder {
    constructor();

    append(formatter: DateTimeFormatter): DateTimeFormatterBuilder;
    appendFraction(field: TemporalField, minWidth: number, maxWidth: number, decimalPoint: boolean): DateTimeFormatterBuilder;
    appendInstant(fractionalDigits: number): DateTimeFormatterBuilder;
    appendLiteral(literal: any): DateTimeFormatterBuilder;
    appendOffset(pattern: string, noOffsetText: string): DateTimeFormatterBuilder;
    appendOffsetId(): DateTimeFormatterBuilder;
    appendPattern(pattern: string): DateTimeFormatterBuilder;
    appendValue(field: TemporalField, width?: number, maxWidth?: number, signStyle?: SignStyle): DateTimeFormatterBuilder;
    appendValueReduced(field: TemporalField, width: number, maxWidth: number, base: ChronoLocalDate | number): DateTimeFormatterBuilder;
    appendZoneId(): DateTimeFormatterBuilder;
    optionalEnd(): DateTimeFormatterBuilder;
    optionalStart(): DateTimeFormatterBuilder;
    padNext(): DateTimeFormatterBuilder;
    parseCaseInsensitive(): DateTimeFormatterBuilder;
    parseCaseSensitive(): DateTimeFormatterBuilder;
    parseLenient(): DateTimeFormatterBuilder;
    parseStrict(): DateTimeFormatterBuilder;
    toFormatter(resolverStyle?: ResolverStyle): DateTimeFormatter;
}

// TODO: js-joda doesn't have Chronology yet. Methods like `LocalDate.chronology()`
// actually return an `IsoChronology` so Chronology is an alias type of that class
// for now. Change this if Chronology is added.
export type Chronology = IsoChronology;

export class LocalTime extends Temporal implements TemporalAdjuster {
    static MIN: LocalTime;
    static MAX: LocalTime;
    static MIDNIGHT: LocalTime;
    static NOON: LocalTime;
    static HOURS_PER_DAY: number;
    static MINUTES_PER_HOUR: number;
    static MINUTES_PER_DAY: number;
    static SECONDS_PER_MINUTE: number;
    static SECONDS_PER_HOUR: number;
    static SECONDS_PER_DAY: number;
    static MILLIS_PER_DAY: number;
    static MICROS_PER_DAY: number;
    static NANOS_PER_SECOND: number;
    static NANOS_PER_MINUTE: number;
    static NANOS_PER_HOUR: number;
    static NANOS_PER_DAY: number;

    static FROM: TemporalQuery<LocalTime>;

    static from(temporal: TemporalAccessor): LocalTime;
    static now(clockOrZone?: Clock | ZoneId): LocalTime;
    static of(hour?: number, minute?: number, second?: number, nanoOfSecond?: number): LocalTime;
    static ofInstant(instant: Instant, zone?: ZoneId): LocalTime;
    static ofNanoOfDay(nanoOfDay: number): LocalTime;
    static ofSecondOfDay(secondOfDay?: number, nanoOfSecond?: number): LocalTime;
    static parse(text: String, formatter?: DateTimeFormatter): LocalTime;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    atDate(date: LocalDate): LocalDateTime;
    compareTo(other: LocalTime): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    getLong(field: ChronoField): number;
    hashCode(): number;
    hour(): number;
    isAfter(other: LocalTime): boolean;
    isBefore(other: LocalTime): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    minus(amount: TemporalAmount): LocalTime;
    minus(amountToSubtract: number, unit: TemporalUnit): LocalTime;
    minusHours(hoursToSubtract: number): LocalTime;
    minusMinutes(minutesToSubtract: number): LocalTime;
    minusNanos(nanosToSubtract: number): LocalTime;
    minusSeconds(secondsToSubtract: number): LocalTime;
    minute(): number;
    nano(): number;
    plus(amount: TemporalAmount): LocalTime;
    plus(amountToAdd: number, unit: TemporalUnit): LocalTime;
    plusHours(hoursToAdd: number): LocalTime;
    plusMinutes(minutesToAdd: number): LocalTime;
    plusNanos(nanosToAdd: number): LocalTime;
    plusSeconds(secondstoAdd: number): LocalTime;
    second(): number;
    toJSON(): string;
    toString(): string;
    toNanoOfDay(): number;
    toSecondOfDay(): number;
    toString(): string;
    truncatedTo(unit: ChronoUnit): LocalTime;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): LocalTime;
    with(field: TemporalField, newValue: number): LocalTime;
    withHour(hour: number): LocalTime;
    withMinute(minute: number): LocalTime;
    withNano(nanoOfSecond: number): LocalTime;
    withSecond(second: number): LocalTime;
}

export class Month extends TemporalAccessor implements TemporalAdjuster {
    static JANUARY: Month;
    static FEBRUARY: Month;
    static MARCH: Month;
    static APRIL: Month;
    static MAY: Month;
    static JUNE: Month;
    static JULY: Month;
    static AUGUST: Month;
    static SEPTEMBER: Month;
    static OCTOBER: Month;
    static NOVEMBER: Month;
    static DECEMBER: Month;

    static from(temporal: TemporalAccessor): Month;
    static of(month: number): Month;
    static valueOf(name: string): Month;
    static values(): Month[];

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    compareTo(other: Month): number;
    equals(other: any): boolean;
    firstDayOfYear(leapYear: boolean): number;
    firstMonthOfQuarter(): Month;
    displayName(style: TextStyle, locale: Locale): string;
    getLong(field: TemporalField): number;
    isSupported(field: TemporalField): boolean;
    length(leapYear: boolean): number;
    maxLength(): number;
    minLength(): number;
    minus(months: number): Month;
    name(): string;
    ordinal(): number;
    plus(months: number): Month;
    toJSON(): string;
    toString(): string;
    value(): number;
}

export class MonthDay extends TemporalAccessor implements TemporalAdjuster {
    static FROM: TemporalQuery<MonthDay>;

    static from(temporal: TemporalAccessor): MonthDay;
    static now(zoneIdOrClock?: ZoneId | Clock): MonthDay;
    static of(month: Month | number, dayOfMonth: number): MonthDay;
    static parse(text: string, formatter?: DateTimeFormatter): MonthDay;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    atYear(year: number): LocalDate;
    compareTo(other: MonthDay): number;
    dayOfMonth(): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    getLong(field: TemporalField): number;
    isAfter(other: MonthDay): boolean;
    isBefore(other: MonthDay): boolean;
    isSupported(field: TemporalField): boolean;
    isValidYear(year: number): boolean;
    month(): Month;
    monthValue(): number;
    toJSON(): string;
    toString(): string;
    with(month: Month): MonthDay;
    withDayOfMonth(dayOfMonth: number): MonthDay;
    withMonth(month: number): MonthDay;
}

/**
 * A field of date-time, such as month-of-year or hour-of-minute.
 */
export abstract class TemporalField {
    /** Checks if this field is supported by the temporal object. */
    abstract isSupportedBy(temporal: TemporalAccessor): boolean;
    /** Checks if this field represents a component of a date. */
    abstract isDateBased(): boolean;
    /** Checks if this field represents a component of a time. */
    abstract isTimeBased(): boolean;
    /** Gets the unit that the field is measured in. */
    abstract baseUnit(): TemporalUnit;
    /** Gets the range that the field is bound by. */
    abstract rangeUnit(): TemporalUnit;
    /** Gets the range of valid values for the field. */
    abstract range(): ValueRange;
    /** 
     * Get the range of valid values for this field using the temporal object to
     * refine the result.
     */
    abstract rangeRefinedBy(temporal: TemporalAccessor): ValueRange;
    /** Gets the value of this field from the specified temporal object. */
    abstract getFrom(temporal: TemporalAccessor): number;
    /** Returns a copy of the specified temporal object with the value of this field set. */
    abstract adjustInto<R extends Temporal>(temporal: R, newValue: number): R;
    abstract name(): string;
    abstract displayName(/* TODO: locale */): string;
    abstract equals(other: any): boolean;
}

/**
 A standard set of fields.
 *
 * This set of fields provide field-based access to manipulate a date, time or date-time.
 * The standard set of fields can be extended by implementing {@link TemporalField}.
 */
export class ChronoField extends TemporalField {
    /**
     * This represents concept of the count of
     * days within the period of a week where the weeks are aligned to the start of the month.
     * This field is typically used with `ALIGNED_WEEK_OF_MONTH`.
     */
    static ALIGNED_DAY_OF_WEEK_IN_MONTH: ChronoField;
    /**
     * This represents concept of the count of days
     * within the period of a week where the weeks are aligned to the start of the year.
     * This field is typically used with `ALIGNED_WEEK_OF_YEAR`.
     */
    static ALIGNED_DAY_OF_WEEK_IN_YEAR: ChronoField;
    /**
     * This represents concept of the count of weeks within
     * the period of a month where the weeks are aligned to the start of the month. This field
     * is typically used with `ALIGNED_DAY_OF_WEEK_IN_MONTH`.
     */
    static ALIGNED_WEEK_OF_MONTH: ChronoField;
    /**
     * his represents concept of the count of weeks within
     * the period of a year where the weeks are aligned to the start of the year. This field
     * is typically used with `ALIGNED_DAY_OF_WEEK_IN_YEAR`.
     */
    static ALIGNED_WEEK_OF_YEAR: ChronoField;
    /**
     * This counts the AM/PM within the day, from 0 (AM) to 1 (PM).
     */
    static AMPM_OF_DAY: ChronoField;
    /**
     * This counts the hour within the AM/PM, from 1 to 12.
     * This is the hour that would be observed on a standard 12-hour analog wall clock.
     */
    static CLOCK_HOUR_OF_AMPM: ChronoField;
    /**
     * This counts the hour within the AM/PM, from 1 to 24.
     * This is the hour that would be observed on a 24-hour analog wall clock.
     */
    static CLOCK_HOUR_OF_DAY: ChronoField;
    /**
     * This represents the concept of the day within the month.
     * In the default ISO calendar system, this has values from 1 to 31 in most months.
     * April, June, September, November have days from 1 to 30, while February has days from
     * 1 to 28, or 29 in a leap year.
     */
    static DAY_OF_MONTH: ChronoField;
    /**
     * This represents the standard concept of the day of the week.
     * In the default ISO calendar system, this has values from Monday (1) to Sunday (7).
     * The {@link DayOfWeek} class can be used to interpret the result.
     */
    static DAY_OF_WEEK: ChronoField;
    /**
     * This represents the concept of the day within the year.
     * In the default ISO calendar system, this has values from 1 to 365 in standard years and
     * 1 to 366 in leap years.
     */
    static DAY_OF_YEAR: ChronoField;
    /**
     * This field is the sequential count of days where
     * 1970-01-01 (ISO) is zero. Note that this uses the local time-line, ignoring offset and
     * time-zone.
     */
    static EPOCH_DAY: ChronoField;
    /**
     * This represents the concept of the era, which is the largest
     * division of the time-line. This field is typically used with `YEAR_OF_ERA`.
     * 
     * In the default ISO calendar system, there are two eras defined, 'BCE' and 'CE'. The era
     * 'CE' is the one currently in use and year-of-era runs from 1 to the maximum value.
     * The era 'BCE' is the previous era, and the year-of-era runs backwards.
     */
    static ERA: ChronoField;
    /**
     * This counts the hour within the AM/PM, from 0 to 11.
     * This is the hour that would be observed on a standard 12-hour digital clock.
     */
    static HOUR_OF_AMPM: ChronoField;
    /**
     * This counts the hour within the day, from 0 to 23. This is
     * the hour that would be observed on a standard 24-hour digital clock.
     */
    static HOUR_OF_DAY: ChronoField;
    /**
     * This represents the concept of the sequential count of
     * seconds where `1970-01-01T00:00Z` (ISO) is zero. This field may be used with `NANO_OF_DAY`
     * to represent the fraction of the day.
     * 
     * An Instant represents an instantaneous point on the time-line. On their own they have
     * no elements which allow a local date-time to be obtained. Only when paired with an offset
     * or time-zone can the local date or time be found. This field allows the seconds part of
     * the instant to be queried.
     */
    static INSTANT_SECONDS: ChronoField;
    /**
     * This counts the microsecond within the day, from `0` to
     * `(24 * 60 * 60 * 1_000_000) - 1`.
     * 
     * This field is used to represent the micro-of-day handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they
     * can return a value for `SECOND_OF_DAY` filling unknown precision with zero.
     * 
     * When this field is used for setting a value, it should behave in the same way as
     * setting `NANO_OF_DAY` with the value multiplied by 1,000.
     */
    static MICRO_OF_DAY: ChronoField;
    /**
     * This counts the microsecond within the second, from 0 to 999,999.
     * 
     * This field is used to represent the micro-of-second handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they
     * can return a value for `SECOND_OF_MINUTE`, `SECOND_OF_DAY` or `INSTANT_SECONDS` filling
     * unknown precision with zero.
     */
    static MICRO_OF_SECOND: ChronoField;
    /**
     * This counts the millisecond within the day, from 0 to
     * `(24 * 60 * 60 * 1,000) - 1`.
     * 
     * This field is used to represent the milli-of-day handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they
     * can return a value for `SECOND_OF_DAY` filling unknown precision with zero.
     * 
     * When this field is used for setting a value, it should behave in the same way as
     * setting `NANO_OF_DAY` with the value multiplied by 1,000,000.
     */
    static MILLI_OF_DAY: ChronoField;
    /**
     * This counts the millisecond within the second, from 0 to
     * 999.
     * 
     * This field is used to represent the milli-of-second handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they can
     * return a value for `SECOND_OF_MINUTE`, `SECOND_OF_DAY` or `INSTANT_SECONDS` filling unknown
     * precision with zero.
     * 
     * When this field is used for setting a value, it should behave in the same way as
     * setting `NANO_OF_SECOND` with the value multiplied by 1,000,000.
     */
    static MILLI_OF_SECOND: ChronoField;
    /**
     * This counts the minute within the day, from 0 to `(24 * 60) - 1`.
     */
    static MINUTE_OF_DAY: ChronoField;
    /**
     * This counts the minute within the hour, from 0 to 59.
     */
    static MINUTE_OF_HOUR: ChronoField;
    /**
     * The month-of-year, such as March. This represents the concept
     * of the month within the year. In the default ISO calendar system, this has values from
     * January (1) to December (12).
     */
    static MONTH_OF_YEAR: ChronoField;
    /**
     * This counts the nanosecond within the day, from 0 to
     * `(24 * 60 * 60 * 1,000,000,000) - 1`.
     * 
     * This field is used to represent the nano-of-day handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they
     * can return a value for `SECOND_OF_DAY` filling unknown precision with zero.
     */
    static NANO_OF_DAY: ChronoField;
    /**
     * This counts the nanosecond within the second, from 0
     * to 999,999,999.
     * 
     * This field is used to represent the nano-of-second handling any fraction of the second.
     * Implementations of {@link TemporalAccessor} should provide a value for this field if they
     * can return a value for `SECOND_OF_MINUTE`, `SECOND_OF_DAY` or `INSTANT_SECONDS` filling
     * unknown precision with zero.
     * 
     * When this field is used for setting a value, it should set as much precision as the
     * object stores, using integer division to remove excess precision. For example, if the
     * {@link TemporalAccessor} stores time to millisecond precision, then the nano-of-second must
     * be divided by 1,000,000 before replacing the milli-of-second.
     */
    static NANO_OF_SECOND: ChronoField;
    /**
     * This represents the concept of the offset in seconds of
     * local time from UTC/Greenwich.
     * 
     * A {@link ZoneOffset} represents the period of time that local time differs from
     * UTC/Greenwich. This is usually a fixed number of hours and minutes. It is equivalent to
     * the total amount of the offset in seconds. For example, during the winter Paris has an
     * offset of +01:00, which is 3600 seconds.
     */
    static OFFSET_SECONDS: ChronoField;
    /**
     * The proleptic-month, which counts months sequentially
     * from year 0.
     * 
     * The first month in year zero has the value zero. The value increase for later months
     * and decrease for earlier ones. Note that this uses the local time-line, ignoring offset
     * and time-zone.
     */
    static PROLEPTIC_MONTH: ChronoField;
    /**
     * This counts the second within the day, from 0 to
     * (24 * 60 * 60) - 1.
     */
    static SECOND_OF_DAY: ChronoField;
    /**
     * This counts the second within the minute, from 0 to 59.
     */
    static SECOND_OF_MINUTE: ChronoField;
    /**
     * The proleptic year, such as 2012. This represents the concept of
     * the year, counting sequentially and using negative numbers. The proleptic year is not
     * interpreted in terms of the era.
     * 
     * The standard mental model for a date is based on three concepts - year, month and day.
     * These map onto the `YEAR`, `MONTH_OF_YEAR` and `DAY_OF_MONTH` fields. Note that there is no
     * reference to eras. The full model for a date requires four concepts - era, year, month and
     * day. These map onto the `ERA`, `YEAR_OF_ERA`, `MONTH_OF_YEAR` and `DAY_OF_MONTH` fields.
     * Whether this field or `YEAR_OF_ERA` is used depends on which mental model is being used.
     */
    static YEAR: ChronoField;
    /**
     * This represents the concept of the year within the era. This
     * field is typically used with `ERA`. The standard mental model for a date is based on three
     * concepts - year, month and day. These map onto the `YEAR`, `MONTH_OF_YEAR` and
     * `DAY_OF_MONTH` fields. Note that there is no reference to eras. The full model for a date
     * requires four concepts - era, year, month and day. These map onto the `ERA`, `YEAR_OF_ERA`,
     * `MONTH_OF_YEAR` and `DAY_OF_MONTH` fields. Whether this field or `YEAR` is used depends on
     * which mental model is being used.
     * 
     * In the default ISO calendar system, there are two eras defined, 'BCE' and 'CE'.
     * The era 'CE' is the one currently in use and year-of-era runs from 1 to the maximum value.
     * The era 'BCE' is the previous era, and the year-of-era runs backwards.
     * 
     * For example, subtracting a year each time yield the following:
     * - year-proleptic 2 = 'CE' year-of-era 2
     * - year-proleptic 1 = 'CE' year-of-era 1
     * - year-proleptic 0 = 'BCE' year-of-era 1
     * - year-proleptic -1 = 'BCE' year-of-era 2
     * 
     * Note that the ISO-8601 standard does not actually define eras. Note also that the
     * ISO eras do not align with the well-known AD/BC eras due to the change between the Julian
     * and Gregorian calendar systems.
     */
    static YEAR_OF_ERA: ChronoField;

    private constructor();

    isSupportedBy(temporal: TemporalAccessor): boolean;
    baseUnit(): TemporalUnit;
    /** Checks that the specified value is valid for this field. */
    checkValidValue(value: number): number;
    /**
     * Checks that the specified value is valid for this field and
     * is within the range of a safe integer.
     */
    checkValidIntValue(value: number): number;
    displayName(): string;
    equals(other: any): boolean;
    getFrom(temporal: TemporalAccessor): number;
    isDateBased(): boolean;
    isTimeBased(): boolean;
    name(): string;
    range(): ValueRange;
    rangeRefinedBy(temporal: TemporalAccessor): ValueRange;
    rangeUnit(): TemporalUnit;
    adjustInto<R extends Temporal>(temporal: R, newValue: number): R;
    toString(): string;
}

/**
 * Fields and units specific to the ISO-8601 calendar system,
 * including quarter-of-year and week-based-year.
 */
export namespace IsoFields {
    /**
     * This field allows the day-of-quarter value to be queried and set. The day-of-quarter has
     * values from 1 to 90 in Q1 of a standard year, from 1 to 91 in Q1 of a leap year, from
     * 1 to 91 in Q2 and from 1 to 92 in Q3 and Q4.
     * 
     * The day-of-quarter can only be calculated if the day-of-year, month-of-year and year are available.
     * 
     * When setting this field, the value is allowed to be partially lenient, taking any value from
     * 1 to 92. If the quarter has less than 92 days, then day 92, and potentially day 91, is in
     * the following quarter.
     */
    export const DAY_OF_QUARTER: TemporalField;
    /**
     * This field allows the quarter-of-year value to be queried and set. The quarter-of-year has
     * values from 1 to 4.
     * 
     * The day-of-quarter can only be calculated if the month-of-year is available.
     */
    export const QUARTER_OF_YEAR: TemporalField;
    /**
     * The field that represents the week-of-week-based-year.
     */
    export const WEEK_OF_WEEK_BASED_YEAR: TemporalField;
    /**
     * The field that represents the week-based-year.
     */
    export const WEEK_BASED_YEAR: TemporalField;
    /**
     * The unit that represents week-based-years for the purpose of addition and subtraction.
     * 
     * This allows a number of week-based-years to be added to, or subtracted from, a date.
     * The unit is equal to either 52 or 53 weeks. The estimated duration of a week-based-year is
     * the same as that of a standard ISO year at 365.2425 Days.
     * 
     * The rules for addition add the number of week-based-years to the existing value for the
     * week-based-year field. If the resulting week-based-year only has 52 weeks, then the date
     * will be in week 1 of the following week-based-year.
     */
    export const WEEK_BASED_YEARS: TemporalUnit;
    /**
     * Unit that represents the concept of a quarter-year. For the ISO calendar system, it is equal
     * to 3 months. The estimated duration of a quarter-year is one quarter of 365.2425 days.
     */
    export const QUARTER_YEARS: TemporalUnit;
}

export abstract class TemporalUnit {
    /** Returns a copy of the specified temporal object with the specified period added. */
    abstract addTo<T extends Temporal>(temporal: T, amount: number): T;
    /**
     * Calculates the period in terms of this unit between two temporal objects of the same type.
     * 
     * Returns the period between temporal1 and temporal2 in terms of this unit; a positive number
     * if `temporal2` is later than `temporal1`, negative if earlier.
     */
    abstract between(temporal1: Temporal, temporal2: Temporal): number;
    /** Gets the duration of this unit, which may be an estimate. */
    abstract duration(): Duration;
    /** Checks if this unit is date-based. */
    abstract isDateBased(): boolean;
    /** Checks if the duration of the unit is an estimate. */
    abstract isDurationEstimated(): boolean;
    /** Checks if this unit is supported by the specified temporal object. */
    abstract isSupportedBy(temporal: Temporal): boolean;
    /** Checks if this unit is time-based. */
    abstract isTimeBased(): boolean;
}

export class ChronoUnit extends TemporalUnit {
    /**
     * Unit that represents the concept of a nanosecond, the smallest supported unit
     * of time. For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
     */
    static NANOS: ChronoUnit;
    /**
     * Unit that represents the concept of a microsecond. For the ISO calendar
     * system, it is equal to the 1,000,000th part of the second unit.
     */
    static MICROS: ChronoUnit;
    /**
     * Unit that represents the concept of a millisecond. For the ISO calendar
     * system, it is equal to the 1000th part of the second unit.
     */
    static MILLIS: ChronoUnit;
    /**
     * Unit that represents the concept of a second. For the ISO calendar system,
     * it is equal to the second in the SI system of units, except around a leap-second.
     */
    static SECONDS: ChronoUnit;
    /**
     * Unit that represents the concept of a minute. For the ISO calendar system,
     * it is equal to 60 seconds.
     */
    static MINUTES: ChronoUnit;
    /**
     * Unit that represents the concept of an hour. For the ISO calendar system,
     * it is equal to 60 minutes.
     */
    static HOURS: ChronoUnit;
    /**
     * Unit that represents the concept of half a day, as used in AM/PM. For
     * the ISO calendar system, it is equal to 12 hours.
     */
    static HALF_DAYS: ChronoUnit;
    /**
     * Unit that represents the concept of a day. For the ISO calendar system, it
     * is the standard day from midnight to midnight. The estimated duration of a day is 24 Hours.
     */
    static DAYS: ChronoUnit;
    /**
     * Unit that represents the concept of a week. For the ISO calendar system,
     * it is equal to 7 Days.
     */
    static WEEKS: ChronoUnit;
    /**
     * Unit that represents the concept of a month. For the ISO calendar system,
     * the length of the month varies by month-of-year. The estimated duration of a month is
     * one twelfth of 365.2425 Days.
     */
    static MONTHS: ChronoUnit;
    /**
     * Unit that represents the concept of a year. For the ISO calendar system, it
     * is equal to 12 months. The estimated duration of a year is 365.2425 Days.
     */
    static YEARS: ChronoUnit;
    /**
     * Unit that represents the concept of a decade. For the ISO calendar system,
     * it is equal to 10 years.
     */
    static DECADES: ChronoUnit;
    /**
     * Unit that represents the concept of a century. For the ISO calendar
     * system, it is equal to 100 years.
     */
    static CENTURIES: ChronoUnit;
    /**
     * Unit that represents the concept of a millennium. For the ISO calendar
     * system, it is equal to 1,000 years.
     */
    static MILLENNIA: ChronoUnit;
    /**
     * Unit that represents the concept of an era. The ISO calendar system doesn't
     * have eras thus it is impossible to add an era to a date or date-time. The estimated duration
     * of the era is artificially defined as 1,000,000,000 Years.
     */
    static ERAS: ChronoUnit;
    /**
     * Artificial unit that represents the concept of forever. This is primarily
     * used with {@link TemporalField} to represent unbounded fields such as the year or era. The
     * estimated duration of the era is artificially defined as the largest duration supported by
     * {@link Duration}.
     */
    static FOREVER: ChronoUnit;

    private constructor();

    addTo<T extends Temporal>(temporal: T, amount: number): T;
    between(temporal1: Temporal, temporal2: Temporal): number;
    /**
     * Compares this ChronoUnit to the specified {@link TemporalUnit}.
     * The comparison is based on the total length of the durations.
     */
    compareTo(other: TemporalUnit): number;
    duration(): Duration;
    isDateBased(): boolean;
    isDurationEstimated(): boolean;
    isSupportedBy(temporal: Temporal): boolean;
    isTimeBased(): boolean;
    toString(): string;
}

export abstract class ChronoLocalDate extends Temporal implements TemporalAdjuster {
    adjustInto(temporal: Temporal): Temporal;
    format(formatter: DateTimeFormatter): string;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
}

export class LocalDate extends ChronoLocalDate implements TemporalAdjuster {
    static MIN: LocalDate;
    static MAX: LocalDate;
    static EPOCH_0: LocalDate;

    static FROM: TemporalQuery<LocalDate>;

    static from(temporal: TemporalAccessor): LocalDate;
    static now(clockOrZone?: Clock | ZoneId): LocalDate;
    static of(year: number, month: Month | number, dayOfMonth: number): LocalDate;
    static ofEpochDay(epochDay: number): LocalDate;
    static ofInstant(instant: Instant, zoneId?: ZoneId): LocalDate;
    static ofYearDay(year: number, dayOfYear: number): LocalDate;
    static parse(text: string, formatter?: DateTimeFormatter): LocalDate;

    private constructor();

    atStartOfDay(): LocalDateTime;
    atStartOfDay(zone: ZoneId): ZonedDateTime;
    atTime(time: LocalTime): LocalDateTime;
    atTime(hour: number, minute: number, second?: number, nanoOfSecond?: number): LocalDateTime;
    chronology(): Chronology;
    compareTo(other: LocalDate): number;
    dayOfMonth(): number;
    dayOfWeek(): DayOfWeek;
    dayOfYear(): number;
    equals(other: any): boolean;
    getLong(field: TemporalField): number;
    hashCode(): number;
    isAfter(other: LocalDate): boolean;
    isBefore(other: LocalDate): boolean;
    isEqual(other: LocalDate): boolean;
    isLeapYear(): boolean;
    isoWeekOfWeekyear(): number;
    isoWeekyear(): number;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    lengthOfMonth(): number;
    lengthOfYear(): number;
    minus(amount: TemporalAmount): LocalDate;
    minus(amountToSubtract: number, unit: TemporalUnit): LocalDate;
    minusDays(daysToSubtract: number): LocalDate;
    minusMonths(monthsToSubtract: number): LocalDate;
    minusWeeks(weeksToSubtract: number): LocalDate;
    minusYears(yearsToSubtract: number): LocalDate;
    month(): Month;
    monthValue(): number;
    plus(amount: TemporalAmount): LocalDate;
    plus(amountToAdd: number, unit: TemporalUnit): LocalDate;
    plusDays(daysToAdd: number): LocalDate;
    plusMonths(monthsToAdd: number): LocalDate;
    plusWeeks(weeksToAdd: number): LocalDate;
    plusYears(yearsToAdd: number): LocalDate;
    toEpochDay(): number;
    toJSON(): string;
    toString(): string;
    until(endDate: TemporalAccessor): Period;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): LocalDate;
    with(field: TemporalField, newValue: number): LocalDate;
    withDayOfMonth(dayOfMonth: number): LocalDate;
    withDayOfYear(dayOfYear: number): LocalDate;
    withMonth(month: Month | number): LocalDate;
    withYear(year: number): LocalDate;
    year(): number;
}

export abstract class ChronoLocalDateTime extends Temporal implements TemporalAdjuster {
    adjustInto(temporal: Temporal): Temporal;
    chronology(): Chronology;
    toEpochSecond(offset: ZoneOffset): number;
    toInstant(offset: ZoneOffset): Instant;
}

export class LocalDateTime extends ChronoLocalDateTime implements TemporalAdjuster {
    static MIN: LocalDateTime;
    static MAX: LocalDateTime;

    static FROM: TemporalQuery<LocalDateTime>;

    static from(temporal: TemporalAccessor): LocalDateTime;
    static now(clockOrZone?: Clock | ZoneId): LocalDateTime;
    static of(date: LocalDate, time: LocalTime): LocalDateTime;
    static of(year: number, month: Month | number, dayOfMonth: number, hour?: number, minute?: number, second?: number, nanoSecond?: number): LocalDateTime;
    static ofEpochSecond(epochSecond: number, offset: ZoneOffset): LocalDateTime;
    static ofEpochSecond(epochSecond: number, nanoOfSecond: number, offset: ZoneOffset): LocalDateTime;
    static ofInstant(instant: Instant, zoneId?: ZoneId): LocalDateTime;
    static parse(text: string, formatter?: DateTimeFormatter): LocalDateTime;

    private constructor();

    atZone(zone: ZoneId): ZonedDateTime;
    compareTo(other: LocalDateTime): number;
    dayOfMonth(): number;
    dayOfWeek(): DayOfWeek;
    dayOfYear(): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    getLong(field: TemporalField): number;
    hashCode(): number;
    hour(): number;
    isAfter(other: LocalDateTime): boolean;
    isBefore(other: LocalDateTime): boolean;
    isEqual(other: LocalDateTime): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    minus(amount: TemporalAmount): LocalDateTime;
    minus(amountToSubtract: number, unit: TemporalUnit): LocalDateTime;
    minusDays(days: number): LocalDateTime;
    minusHours(hours: number): LocalDateTime;
    minusMinutes(minutes: number): LocalDateTime;
    minusMonths(months: number): LocalDateTime;
    minusNanos(nanos: number): LocalDateTime;
    minusSeconds(seconds: number): LocalDateTime;
    minusWeeks(weeks: number): LocalDateTime;
    minusYears(years: number): LocalDateTime;
    minute(): number;
    month(): Month;
    monthValue(): number;
    nano(): number;
    plus(amount: TemporalAmount): LocalDateTime;
    plus(amountToAdd: number, unit: TemporalUnit): LocalDateTime;
    plusDays(days: number): LocalDateTime;
    plusHours(hours: number): LocalDateTime;
    plusMinutes(minutes: number): LocalDateTime;
    plusMonths(months: number): LocalDateTime;
    plusNanos(nanos: number): LocalDateTime;
    plusSeconds(seconds: number): LocalDateTime;
    plusWeeks(weeks: number): LocalDateTime;
    plusYears(years: number): LocalDateTime;
    second(): number;
    toJSON(): string;
    toLocalDate(): LocalDate;
    toLocalTime(): LocalTime;
    toString(): string;
    truncatedTo(unit: TemporalUnit): LocalDateTime;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): LocalDateTime;
    with(field: TemporalField, newValue: number): LocalDateTime;
    withDayOfMonth(dayOfMonth: number): LocalDateTime;
    withDayOfYear(dayOfYear: number): LocalDateTime;
    withHour(hour: number): LocalDateTime;
    withMinute(minute: number): LocalDateTime;
    withMonth(month: number | Month): LocalDateTime;
    withNano(nanoOfSecond: number): LocalDateTime;
    withSecond(second: number): LocalDateTime;
    withYear(year: number): LocalDateTime;
    year(): number;
}

export class Period extends TemporalAmount {
    static ZERO: Period;

    static between(startDate: LocalDate, endDate: LocalDate): Period;
    static from(amount: TemporalAmount): Period;
    static of(years: number, months: number, days: number): Period;
    static ofDays(days: number): Period;
    static ofMonths(months: number): Period;
    static ofWeeks(weeks: number): Period;
    static ofYears(years: number): Period;
    static parse(text: string): Period;

    private constructor();

    addTo<T extends Temporal>(temporal: T): T;
    chronology(): IsoChronology;
    days(): number;
    equals(other: any): boolean;
    get(unit: TemporalUnit): number;
    hashCode(): number;
    isNegative(): boolean;
    isZero(): boolean;
    minus(amountToSubtract: TemporalAmount): Period;
    minusDays(daysToSubtract: number): Period;
    minusMonths(monthsToSubtract: number): Period;
    minusYears(yearsToSubtract: number): Period;
    months(): number;
    multipliedBy(scalar: number): Period;
    negated(): Period;
    normalized(): Period;
    plus(amountToAdd: TemporalAmount): Period;
    plusDays(daysToAdd: number): Period;
    plusMonths(monthsToAdd: number): Period;
    plusYears(yearsToAdd: number): Period;
    subtractFrom<T extends Temporal>(temporal: T): T;
    toJSON(): string;
    toString(): string;
    toTotalMonths(): number;
    units(): TemporalUnit[];
    withDays(days: number): Period;
    withMonths(months: number): Period;
    withYears(years: number): Period;
    years(): number;
}

export abstract class TemporalAdjuster {
    abstract adjustInto(temporal: Temporal): Temporal;
}

export namespace TemporalAdjusters {
    function dayOfWeekInMonth(ordinal: number, dayOfWeek: DayOfWeek): TemporalAdjuster;
    function firstDayOfMonth(): TemporalAdjuster;
    function firstDayOfNextMonth(): TemporalAdjuster;
    function firstDayOfNextYear(): TemporalAdjuster;
    function firstDayOfYear(): TemporalAdjuster;
    function firstInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster;
    function lastDayOfMonth(): TemporalAdjuster;
    function lastDayOfYear(): TemporalAdjuster;
    function lastInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster;
    function next(dayOfWeek: DayOfWeek): TemporalAdjuster;
    function nextOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster;
    function previous(dayOfWeek: DayOfWeek): TemporalAdjuster;
    function previousOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster;
}

export namespace TemporalQueries {
    function chronology(): TemporalQuery<Chronology | null>;
    function localDate(): TemporalQuery<LocalDate | null>;
    function localTime(): TemporalQuery<LocalTime | null>;
    function offset(): TemporalQuery<ZoneOffset | null>;
    function precision(): TemporalQuery<TemporalUnit | null>;
    function zone(): TemporalQuery<ZoneId | null>;
    function zoneId(): TemporalQuery<ZoneId | null>;
}

export class ValueRange {
    static of(min: number, max: number): ValueRange;
    static of(min: number, maxSmallest: number, maxLargest: number): ValueRange;
    static of(minSmallest: number, minLargest: number, maxSmallest: number, maxLargest: number): ValueRange;

    private constructor();

    checkValidIntValue(value: number, field: TemporalField): number;
    checkValidValue(value: number, field: TemporalField): number;
    equals(other: any): boolean;
    hashCode(): number;
    isFixed(): boolean;
    isIntValue(): boolean;
    isValidIntValue(value: number): boolean;
    isValidValue(value: number): boolean;
    largestMinimum(): number;
    maximum(): number;
    minimum(): number;
    smallestMaximum(): number;
    toString(): string;
}

export class Year extends Temporal implements TemporalAdjuster {
    static MIN_VALUE: number;
    static MAX_VALUE: number;

    static FROM: TemporalQuery<Year>;

    static from(temporal: TemporalAccessor): Year;
    static isLeap(year: number): boolean;
    static now(zoneIdOrClock?: ZoneId | Clock): Year;
    static of(isoYear: number): Year;
    static parse(text: string, formatter?: DateTimeFormatter): Year;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    atDay(dayOfYear: number): LocalDate;
    atMonth(month: Month | number): YearMonth;
    atMonthDay(monthDay: MonthDay): LocalDate;
    compareTo(other: Year): number;
    equals(other: any): boolean;
    getLong(field: TemporalField): number;
    isAfter(other: Year): boolean;
    isBefore(other: Year): boolean;
    isLeap(): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    isValidMonthDay(monthDay: MonthDay): boolean;
    length(): number;
    minus(amount: TemporalAmount): Year;
    minus(amountToSubtract: number, unit: TemporalUnit): Year;
    minusYears(yearsToSubtract: number): Year;
    plus(amount: TemporalAmount): Year;
    plus(amountToAdd: number, unit: TemporalUnit): Year;
    plusYears(yearsToAdd: number): Year;
    toJSON(): string;
    toString(): string;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    value(): number;
    with(adjuster: TemporalAdjuster): Year;
    with(field: TemporalField, newValue: number): Year;
}

export class YearMonth extends Temporal implements TemporalAdjuster {
    static FROM: TemporalQuery<YearMonth>;

    static from(temporal: TemporalAccessor): YearMonth;
    static now(zoneIdOrClock?: ZoneId | Clock): YearMonth;
    static of(year: number, monthOrNumber: Month | number): YearMonth;
    static parse(text: string, formatter?: DateTimeFormatter): YearMonth;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    atDay(dayOfMonth: number): LocalDate;
    atEndOfMonth(): LocalDate;
    compareTo(other: YearMonth): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    getLong(field: TemporalField): number;
    isAfter(other: YearMonth): boolean;
    isBefore(other: YearMonth): boolean;
    isLeapYear(): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    isValidDay(): boolean;
    lengthOfMonth(): number;
    lengthOfYear(): number;
    minus(amount: TemporalAmount): YearMonth;
    minus(amountToSubtract: number, unit: TemporalUnit): YearMonth;
    minusMonths(monthsToSubtract: number): YearMonth;
    minusYears(yearsToSubtract: number): YearMonth;
    month(): Month;
    monthValue(): number;
    plus(amount: TemporalAmount): YearMonth;
    plus(amountToAdd: number, unit: TemporalUnit): YearMonth;
    plusMonths(monthsToAdd: number): YearMonth;
    plusYears(yearsToAdd: number): YearMonth;
    toJSON(): string;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): YearMonth;
    with(field: TemporalField, newValue: number): YearMonth;
    withMonth(month: number): YearMonth;
    withYear(year: number): YearMonth;
    year(): number;
}

export abstract class ZoneId {
    static SYSTEM: ZoneId;
    static UTC: ZoneId;

    static systemDefault(): ZoneId;
    static of(zoneId: string): ZoneId;
    static ofOffset(prefix: string, offset: ZoneOffset): ZoneId;
    static from(temporal: TemporalAccessor): ZoneId;

    static getAvailableZoneIds(): string[];

    equals(other: any): boolean;
    hashCode(): number;
    abstract id(): string;
    normalized(): ZoneId;
    abstract rules(): ZoneRules;
    toJSON(): string;
    toString(): string;
}

export class ZoneOffset extends ZoneId implements TemporalAdjuster {
    static MAX_SECONDS: ZoneOffset;
    static UTC: ZoneOffset;
    static MIN: ZoneOffset;
    static MAX: ZoneOffset;

    static of(offsetId: string): ZoneOffset;
    static ofHours(hours: number): ZoneOffset;
    static ofHoursMinutes(hours: number, minutes: number): ZoneOffset;
    static ofHoursMinutesSeconds(hours: number, minutes: number, seconds: number): ZoneOffset;
    static ofTotalMinutes(totalMinutes: number): ZoneOffset;
    static ofTotalSeconds(totalSeconds: number): ZoneOffset;

    private constructor();

    adjustInto(temporal: Temporal): Temporal;
    compareTo(other: ZoneOffset): number;
    equals(other: any): boolean;
    get(field: TemporalField): number;
    getLong(field: TemporalField): number;
    hashCode(): number;
    id(): string;
    rules(): ZoneRules;
    toString(): string;
    totalSeconds(): number;
}

export class ZoneRegion extends ZoneId {
    static ofId(zoneId: string): ZoneId;

    private constructor();

    id(): string;
    rules(): ZoneRules;
}

export class ZoneOffsetTransition {
    static of(transition: LocalDateTime, offsetBefore: ZoneOffset, offsetAfter: ZoneOffset): ZoneOffsetTransition;

    private constructor();

    instant(): Instant;
    toEpochSecond(): number;
    dateTimeBefore(): LocalDateTime;
    dateTimeAfter(): LocalDateTime;
    offsetBefore(): ZoneOffset;
    offsetAfter(): ZoneOffset;
    duration(): Duration;
    durationSeconds(): number;
    isGap(): boolean;
    isOverlap(): boolean;
    isValidOffset(offset: ZoneOffset): boolean;
    validOffsets(): ZoneOffset[];
    compareTo(transition: ZoneOffsetTransition): number;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
}

export interface ZoneOffsetTransitionRule {
    // TODO: Not implemented yet
}

export abstract class ZoneRules {
    static of(offest: ZoneOffset): ZoneRules;

    offset(instantOrLocalDateTime: Instant | LocalDateTime): ZoneOffset;
    toJSON(): string;
    abstract isFixedOffset(): boolean;
    abstract offsetOfEpochMilli(epochMilli: number): ZoneOffset;
    abstract offsetOfInstant(instant: Instant): ZoneOffset;
    abstract offsetOfLocalDateTime(localDateTime: LocalDateTime): ZoneOffset;
    abstract validOffsets(localDateTime: LocalDateTime): ZoneOffset[];
    abstract transition(localDateTime: LocalDateTime): ZoneOffsetTransition;
    abstract standardOffset(instant: Instant): ZoneOffset;
    abstract daylightSavings(instant: Instant): Duration;
    abstract isDaylightSavings(instant: Instant): boolean;
    abstract isValidOffset(localDateTime: LocalDateTime, offset: ZoneOffset): boolean;
    abstract nextTransition(instant: Instant): ZoneOffsetTransition;
    abstract previousTransition(instant: Instant): ZoneOffsetTransition;
    abstract transitions(): ZoneOffsetTransition[];
    abstract transitionRules(): ZoneOffsetTransitionRule[];
    abstract toString(): string;
}

export abstract class ChronoZonedDateTime extends Temporal {
    compareTo(other: ChronoZonedDateTime): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    isAfter(other: ChronoZonedDateTime): boolean;
    isBefore(other: ChronoZonedDateTime): boolean;
    isEqual(other: ChronoZonedDateTime): boolean;
    toEpochSecond(): number;
    toInstant(): Instant;
}

export class ZonedDateTime extends ChronoZonedDateTime {
    static FROM: TemporalQuery<ZonedDateTime>;

    static from(temporal: TemporalAccessor): ZonedDateTime;
    static now(clockOrZone?: Clock | ZoneId): ZonedDateTime;
    static of(localDateTime: LocalDateTime, zone: ZoneId): ZonedDateTime;
    static of(date: LocalDate, time: LocalTime, zone: ZoneId): ZonedDateTime;
    static of(year: number, month: number, dayOfMonth: number, hour: number, minute: number, second: number, nanoOfSecond: number, zone: ZoneId): ZonedDateTime;
    static ofInstant(instant: Instant, zone: ZoneId): ZonedDateTime;
    static ofInstant(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
    static ofLocal(localDateTime: LocalDateTime, zone: ZoneId, preferredOffset?: ZoneOffset | null): ZonedDateTime;
    static ofStrict(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
    static parse(text: string, formatter?: DateTimeFormatter): ZonedDateTime;

    private constructor();

    dayOfMonth(): number;
    dayOfWeek(): DayOfWeek;
    dayOfYear(): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    getLong(field: TemporalField): number;
    hashCode(): number;
    hour(): number;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    minus(amount: TemporalAmount): ZonedDateTime;
    minus(amountToSubtract: number, unit: TemporalUnit): ZonedDateTime;
    minusDays(days: number): ZonedDateTime;
    minusHours(hours: number): ZonedDateTime;
    minusMinutes(minutes: number): ZonedDateTime;
    minusMonths(months: number): ZonedDateTime;
    minusNanos(nanos: number): ZonedDateTime;
    minusSeconds(seconds: number): ZonedDateTime;
    minusWeeks(weeks: number): ZonedDateTime;
    minusYears(years: number): ZonedDateTime;
    minute(): number;
    month(): Month;
    monthValue(): number;
    nano(): number;
    offset(): ZoneOffset;
    plus(amount: TemporalAmount): ZonedDateTime;
    plus(amountToAdd: number, unit: TemporalUnit): ZonedDateTime;
    plusDays(days: number): ZonedDateTime;
    plusHours(hours: number): ZonedDateTime;
    plusMinutes(minutes: number): ZonedDateTime;
    plusMonths(months: number): ZonedDateTime;
    plusNanos(nanos: number): ZonedDateTime;
    plusSeconds(seconds: number): ZonedDateTime;
    plusWeeks(weeks: number): ZonedDateTime;
    plusYears(years: number): ZonedDateTime;
    range(field: TemporalField): ValueRange;
    second(): number;
    toJSON(): string;
    toLocalDate(): LocalDate;
    toLocalDateTime(): LocalDateTime;
    toLocalTime(): LocalTime;
    toString(): string;
    truncatedTo(unit: TemporalUnit): ZonedDateTime;
    until(endExclusive: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): ZonedDateTime;
    with(field: TemporalField, newValue: number): ZonedDateTime;
    withDayOfMonth(dayOfMonth: number): ZonedDateTime;
    withDayOfYear(dayOfYear: number): ZonedDateTime;
    withEarlierOffsetAtOverlap(): ZonedDateTime;
    withFixedOffsetZone(): ZonedDateTime;
    withHour(hour: number): ZonedDateTime;
    withLaterOffsetAtOverlap(): ZonedDateTime;
    withMinute(minute: number): ZonedDateTime;
    withMonth(month: number): ZonedDateTime;
    withNano(nanoOfSecond: number): ZonedDateTime;
    withSecond(second: number): ZonedDateTime;
    withYear(year: number): ZonedDateTime;
    withZoneSameInstant(zone: ZoneId): ZonedDateTime;
    withZoneSameLocal(zone: ZoneId): ZonedDateTime;
    year(): number;
    zone(): ZoneId;
}

export class TextStyle {
    static FULL: TextStyle;
    static FULL_STANDALONE: TextStyle;
    static SHORT: TextStyle;
    static SHORT_STANDALONE: TextStyle;
    static NARROW: TextStyle;
    static NARROW_STANDALONE: TextStyle;

    private constructor();

    asNormal(): TextStyle;
    asStandalone(): TextStyle;
    isStandalone(): boolean;

    equals(other: any): boolean;
    toJSON(): string;
    toString(): string;
}

export interface Locale {
    // TODO: Not implemented yet
}

export abstract class IsoChronology {
    static isLeapYear(prolepticYear: number): boolean;

    private constructor();

    resolveDate(fieldValues: any, resolverStyle: any): any;
    equals(other: any): boolean;
    toString(): string;
}

export function nativeJs(date: Date | any, zone?: ZoneId): TemporalAccessor;

export function convert(
    temporal: LocalDate | LocalDateTime | ZonedDateTime,
    zone?: ZoneId,
): {
    toDate: () => Date;
    toEpochMilli: () => number;
};

export function use(plugin: Function): any;

export class ZoneRulesProvider {
    static getRules(zoneId: string): ZoneRules;
    static getAvailableZoneIds(): string[];
}

export class DateTimeException extends Error {
    constructor(message?: string, cause?: Error);
}

export class UnsupportedTemporalTypeException extends DateTimeException {}

export class DateTimeParseException extends Error {
    constructor(message?: string, text?: string, index?: number, cause?: Error);

    parsedString(): string;
    errorIndex(): number;
}

export class ArithmeticException extends Error {}
export class IllegalArgumentException extends Error {}
export class IllegalStateException extends Error {}
export class NullPointerException extends Error {}

export const __esModule: true;
export as namespace JSJoda;
