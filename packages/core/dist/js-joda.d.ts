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
    query<R>(query: TemporalQuery<R>): R;
    range(field: TemporalField): ValueRange;
}

export abstract class Temporal extends TemporalAccessor {
    isSupported(unit: TemporalUnit): boolean;
    minus(amountToSubtract: number, unit: TemporalUnit): Temporal;
    minus(amount: TemporalAmount): Temporal;
    plus(amountToAdd: number, unit: TemporalUnit): Temporal;
    plus(amount: TemporalAmount): Temporal;
    until(endTemporal: Temporal, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): Temporal;
    with(field: TemporalField, newValue: number): Temporal;
}

export abstract class Clock {
    static fixed(fixedInstant: Instant, zoneId: ZoneId): Clock;
    static system(zone: ZoneId): Clock;
    static systemDefaultZone(): Clock;
    static systemUTC(): Clock;

    abstract instant(): Instant;
    abstract millis(): number;
    abstract zone(): ZoneId;
    abstract withZone(zone: ZoneId): Clock;
    abstract equals(other: any): boolean;
}

export class DayOfWeek extends TemporalAccessor {
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

    adjustInto(temporal: TemporalAdjuster): this;
    compareTo(other: DayOfWeek): number;
    equals(other: any): boolean;
    getDisplayName(style: TextStyle, locale: Locale): string;
    getLong(field: TemporalField): number;
    isSupported(field: TemporalField): boolean;
    minus(days: number): DayOfWeek;
    name(): string;
    ordinal(): number;
    plus(days: number): DayOfWeek;
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
    static ofSeconds(seconds: number): Duration;
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
    minus(durationOrNumber: Duration | number, unit: ChronoUnit): Duration;
    minusAmountUnit(amountToSubtract: number, unit: TemporalUnit): Duration;
    minusDays(daysToSubtract: number): Duration;
    minusDuration(duration: Duration): Duration;
    minusHours(hoursToSubtract: number): Duration;
    minusMillis(millisToSubtract: number): Duration;
    minusMinutes(minutesToSubtract: number): Duration;
    minusNanos(nanosToSubtract: number): Duration;
    minusSeconds(secondsToSubtract: number): Duration;
    multipliedBy(multiplicand: number): Duration;
    nano(): number;
    negated(): Duration;
    plus(durationOrNumber: Duration | number, unitOrNumber: TemporalUnit | number): Duration;
    plusAmountUnit(amountToAdd: number, unit: TemporalUnit): Duration;
    plusDays(daysToAdd: number): Duration;
    plusDuration(duration: Duration): Duration;
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

export class Instant extends Temporal {
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
    get(field: TemporalField): number;
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
    query<R>(query: TemporalQuery<R>): R;
    range(field: TemporalField): ValueRange;
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
}

export class SignStyle {
    static NORMAL: SignStyle;
    static NEVER: SignStyle;
    static ALWAYS: SignStyle;
    static EXCEEDS_PAD: SignStyle;
    static NOT_NEGATIVE: SignStyle;
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
    toFormatter(resolverStyle: ResolverStyle): DateTimeFormatter;
}

// TODO: js-joda doesn't have Chronology yet. Methods like `LocalDate.chronology()`
// actually return an `IsoChronology` so Chronology is an alias type of that class
// for now. Change this if Chronology is added.
export type Chronology = IsoChronology;

export class LocalTime extends Temporal {
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

    static FROM: TemporalQuery<LocalDate>;

    static from(temporal: TemporalAccessor): LocalTime;
    static now(clockOrZone?: Clock | ZoneId): LocalTime;
    static of(hour?: number, minute?: number, second?: number, nanoOfSecond?: number): LocalTime;
    static ofInstant(instant: Instant, zone?: ZoneId): LocalTime;
    static ofNanoOfDay(nanoOfDay: number): LocalTime;
    static ofSecondOfDay(secondOfDay?: number, nanoOfSecond?: number): LocalTime;
    static parse(text: String, formatter?: DateTimeFormatter): LocalTime;

    private constructor();

    adjustInto(temporal: TemporalAdjuster): Temporal;
    atDate(date: LocalDate): LocalDateTime;
    compareTo(other: LocalTime): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    get(field: ChronoField): number;
    getLong(field: ChronoField): number;
    hashCode(): number;
    hour(): number;
    isAfter(other: LocalTime): boolean;
    isBefore(other: LocalTime): boolean;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    minus(amount: TemporalAmount): LocalTime;
    minus(amountToSubtract: number, unit: ChronoUnit): LocalTime;
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
    query<R>(query: TemporalQuery<R>): R;
    range(field: ChronoField): ValueRange;
    second(): number;
    toJSON(): string;
    toNanoOfDay(): number;
    toSecondOfDay(): number;
    toString(): string;
    truncatedTo(unit: ChronoUnit): LocalTime;
    until(endExclusive: TemporalAccessor, unit: TemporalUnit): number;
    with(adjuster: TemporalAdjuster): LocalTime;
    with(field: TemporalField, newValue: number): LocalTime;
    withHour(hour: number): LocalTime;
    withMinute(minute: number): LocalTime;
    withNano(nanoOfSecond: number): LocalTime;
    withSecond(second: number): LocalTime;
}

export class Month extends TemporalAccessor {
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
    get(field: TemporalField): number;
    getDisplayName(style: TextStyle, locale: Locale): string;
    getLong(field: TemporalField): number;
    isSupported(field: TemporalField): boolean;
    length(leapYear: boolean): number;
    maxLength(): number;
    minLength(): number;
    minus(months: number): Month;
    name(): string;
    ordinal(): number;
    plus(months: number): Month;
    query<R>(query: TemporalQuery<R>): R;
    toString(): string;
    value(): number;
}

export class MonthDay extends TemporalAccessor {
    static FROM: TemporalQuery<LocalDate>;

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
    get(field: TemporalField): number;
    getLong(field: TemporalField): number;
    isAfter(other: MonthDay): boolean;
    isBefore(other: MonthDay): boolean;
    isSupported(field: TemporalField): boolean;
    isValidYear(year: number): boolean;
    month(): Month;
    monthValue(): number;
    query<R>(query: TemporalQuery<R>): R;
    range(field: TemporalField): ValueRange;
    toString(): string;
    with(month: Month): MonthDay;
    withDayOfMonth(dayOfMonth: number): MonthDay;
    withMonth(month: number): MonthDay;
}

export abstract class TemporalField {
    abstract isDateBased(): boolean;
    abstract isTimeBased(): boolean;
    abstract name(): string;
}

export class ChronoField extends TemporalField {
    static NANO_OF_SECOND: ChronoField;
    static NANO_OF_DAY: ChronoField;
    static MICRO_OF_SECOND: ChronoField;
    static MICRO_OF_DAY: ChronoField;
    static MILLI_OF_SECOND: ChronoField;
    static MILLI_OF_DAY: ChronoField;
    static SECOND_OF_MINUTE: ChronoField;
    static SECOND_OF_DAY: ChronoField;
    static MINUTE_OF_HOUR: ChronoField;
    static MINUTE_OF_DAY: ChronoField;
    static HOUR_OF_AMPM: ChronoField;
    static CLOCK_HOUR_OF_AMPM: ChronoField;
    static HOUR_OF_DAY: ChronoField;
    static CLOCK_HOUR_OF_DAY: ChronoField;
    static AMPM_OF_DAY: ChronoField;
    static DAY_OF_WEEK: ChronoField;
    static ALIGNED_DAY_OF_WEEK_IN_MONTH: ChronoField;
    static ALIGNED_DAY_OF_WEEK_IN_YEAR: ChronoField;
    static DAY_OF_MONTH: ChronoField;
    static DAY_OF_YEAR: ChronoField;
    static EPOCH_DAY: ChronoField;
    static ALIGNED_WEEK_OF_MONTH: ChronoField;
    static ALIGNED_WEEK_OF_YEAR: ChronoField;
    static MONTH_OF_YEAR: ChronoField;
    static PROLEPTIC_MONTH: ChronoField;
    static YEAR_OF_ERA: ChronoField;
    static YEAR: ChronoField;
    static ERA: ChronoField;
    static INSTANT_SECONDS: ChronoField;
    static OFFSET_SECONDS: ChronoField;

    private constructor();

    baseUnit(): number;
    checkValidIntValue(value: number): number;
    checkValidValue(value: number): any;
    displayName(): string;
    equals(other: any): boolean;
    getFrom(temporal: TemporalAccessor): number;
    isDateBased(): boolean;
    isTimeBased(): boolean;
    name(): string;
    range(): ValueRange;
    rangeRefinedBy(temporal: TemporalAccessor): ValueRange;
    rangeUnit(): number;
    toString(): string;
}

export namespace IsoFields {
    // TODO: Get rid of this class and typed all constants as TemporalField once
    // the base class is ready and fixed (getDisplayName)
    class Field extends TemporalField {
        private constructor();

        isDateBased(): boolean;
        isTimeBased(): boolean;
        name(): string;
        getDisplayName(): string;
    }

    export const DAY_OF_QUARTER: Field;
    export const QUARTER_OF_YEAR: Field;
    export const WEEK_OF_WEEK_BASED_YEAR: Field;
    export const WEEK_BASED_YEAR: Field;
    export const WEEK_BASED_YEARS: TemporalUnit;
    export const QUARTER_YEARS: TemporalUnit;

    // This allows non-exported types, otherwise everyting is exported
    export {};
}

export abstract class TemporalUnit {
    abstract addTo<T extends Temporal>(temporal: T, amount: number): T;
    abstract between(temporal1: Temporal, temporal2: Temporal): number;
    abstract duration(): Duration;
    abstract isDateBased(): boolean;
    abstract isDurationEstimated(): boolean;
    abstract isSupportedBy(temporal: Temporal): boolean;
    abstract isTimeBased(): boolean;
}

export class ChronoUnit extends TemporalUnit {
    static NANOS: ChronoUnit;
    static MICROS: ChronoUnit;
    static MILLIS: ChronoUnit;
    static SECONDS: ChronoUnit;
    static MINUTES: ChronoUnit;
    static HOURS: ChronoUnit;
    static HALF_DAYS: ChronoUnit;
    static DAYS: ChronoUnit;
    static WEEKS: ChronoUnit;
    static MONTHS: ChronoUnit;
    static YEARS: ChronoUnit;
    static DECADES: ChronoUnit;
    static CENTURIES: ChronoUnit;
    static MILLENNIA: ChronoUnit;
    static ERAS: ChronoUnit;
    static FOREVER: ChronoUnit;

    private constructor();

    addTo<T extends Temporal>(temporal: T, amount: number): T;
    between(temporal1: Temporal, temporal2: Temporal): number;
    compareTo(other: TemporalUnit): number;
    duration(): Duration;
    isDateBased(): boolean;
    isDurationEstimated(): boolean;
    isSupportedBy(temporal: Temporal): boolean;
    isTimeBased(): boolean;
    toString(): string;
}

export abstract class ChronoLocalDate extends Temporal {
    adjustInto(temporal: TemporalAdjuster): this;
    format(formatter: DateTimeFormatter): string;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
}

export class LocalDate extends ChronoLocalDate {
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
    get(field: TemporalField): number;
    getLong(field: TemporalField): number;
    hashCode(): number;
    isAfter(other: LocalDate): boolean;
    isBefore(other: LocalDate): boolean;
    isEqual(other: LocalDate): boolean;
    isLeapYear(): boolean;
    isoWeekOfWeekyear(): number; //implemented in IsoFields.js
    isoWeekyear(): number; //implemented in IsoFields.js
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
    query<R>(query: TemporalQuery<R>): R;
    range(field: TemporalField): ValueRange;
    toEpochDay(): number;
    toJSON(): string;
    toString(): string;
    until(endDate: TemporalAccessor): Period;
    until(endExclusive: TemporalAccessor, unit: TemporalUnit): number;
    with(fieldOrAdjuster: TemporalField, newValue: Number): LocalDate;
    with(adjuster: TemporalAdjuster): LocalDate;
    withDayOfMonth(dayOfMonth: number): LocalDate;
    withDayOfYear(dayOfYear: number): LocalDate;
    withMonth(month: Month | number): LocalDate;
    withYear(year: number): LocalDate;
    year(): number;
}

export abstract class ChronoLocalDateTime extends Temporal {
    adjustInto(temporal: TemporalAdjuster): ChronoLocalDate;
    chronology(): Chronology;
    toEpochSecond(offset: ZoneOffset): number;
    toInstant(offset: ZoneOffset): Instant;
}

export class LocalDateTime extends ChronoLocalDateTime {
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

    adjustInto(temporal: TemporalAdjuster): LocalDateTime;
    atZone(zone: ZoneId): ZonedDateTime;
    compareTo(other: LocalDateTime): number;
    dayOfMonth(): number;
    dayOfWeek(): DayOfWeek;
    dayOfYear(): number;
    equals(other: any): boolean;
    format(formatter: DateTimeFormatter): string;
    get(field: TemporalField): number;
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
    minusTemporalAmount(amount: TemporalAmount): LocalDateTime;
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
    plusTemporalAmount(amount: TemporalAmount): LocalDateTime;
    plusWeeks(weeks: number): LocalDateTime;
    plusYears(years: number): LocalDateTime;
    query<R>(query: TemporalQuery<R>): R;
    range(field: TemporalField): ValueRange;
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
    checkValidValue(value: number, field: TemporalField): any;
    equals(other: any): boolean;
    hashCode(): number;
    isFixed(): boolean;
    isIntValue(): boolean;
    isValidIntValue(value: number): boolean;
    isValidValue(value: any): boolean;
    largestMinimum(): number;
    maximum(): number;
    minimum(): number;
    smallestMaximum(): number;
    toString(): string;
}

export class Year extends Temporal {
    static MIN_VALUE: number;
    static MAX_VALUE: number;

    static FROM: TemporalQuery<LocalDate>;

    static from(temporal: TemporalAccessor): Year;
    static isLeap(year: number): boolean;
    static now(zoneIdOrClock?: ZoneId | Clock): Year;
    static of(isoYear: number): Year;
    static parse(text: string, formatter?: DateTimeFormatter): Year;

    private constructor();

    atDay(dayOfYear: number): LocalDate;
    atMonth(month: Month | number): YearMonth;
    atMonthDay(monthDay: MonthDay): LocalDate;
    compareTo(other: Year): number;
    equals(other: any): boolean;
    isAfter(other: Year): boolean;
    isBefore(other: Year): boolean;
    isLeap(): boolean;
    isValidMonthDay(monthDay: MonthDay): boolean;
    length(): number;
    plus(amount: TemporalAmount): Year;
    plus(amountToAdd: number, unit: TemporalUnit): Year;
    plusYears(yearsToAdd: number): Year;
    minus(amount: TemporalAmount): Year;
    minus(amountToSubtract: number, unit: TemporalUnit): Year;
    minusYears(yearsToSubtract: number): Year;
    value(): number;
    with(adjuster: TemporalAdjuster): Year;
    with(field: TemporalField, newValue: number): Year;
}

export class YearMonth extends Temporal {
    static FROM: TemporalQuery<LocalDate>;

    static from(temporal: TemporalAccessor): YearMonth;
    static now(zoneIdOrClock?: ZoneId | Clock): YearMonth;
    static of(year: number, monthOrNumber: Month | number): YearMonth;
    static parse(text: string, formatter?: DateTimeFormatter): YearMonth;

    private constructor();

    minus(amount: TemporalAmount): YearMonth;
    minus(amountToSubtract: number, unit: TemporalUnit): YearMonth;
    minusYears(yearsToSubtract: number): YearMonth;
    minusMonths(monthsToSubtract: number): YearMonth;
    plus(amount: TemporalAmount): YearMonth;
    plus(amountToAdd: number, unit: TemporalUnit): YearMonth;
    plusYears(yearsToAdd: number): YearMonth;
    plusMonths(monthsToAdd: number): YearMonth;
    with(adjuster: TemporalAdjuster): YearMonth;
    with(field: TemporalField, value: number): YearMonth;
    withYearMonth(newYear: number, newMonth: number): YearMonth;
    withYear(year: number): YearMonth;
    withMonth(month: number): YearMonth;
    isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
    year(): number;
    monthValue(): number;
    month(): Month;
    isLeapYear(): boolean;
    isValidDay(): boolean;
    lengthOfMonth(): number;
    lengthOfYear(): number;
    atDay(dayOfMonth: number): LocalDate;
    atEndOfMonth(): LocalDate;
    compareTo(other: YearMonth): number;
    isAfter(other: YearMonth): boolean;
    isBefore(other: YearMonth): boolean;
    equals(other: any): boolean;
    toJSON(): string;
    format(formatter: DateTimeFormatter): string;
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
    toString(): string;
}

export class ZoneOffset extends ZoneId {
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
    query<R>(query: TemporalQuery<R>): R;
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
    query<R>(query: TemporalQuery<R>): R;
    toEpochSecond(): number;
    toInstant(): Instant;
}

export class ZonedDateTime extends ChronoZonedDateTime {
    static FROM: TemporalQuery<LocalDate>;

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
    get(field: TemporalField): number;
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
    minusTemporalAmount(amount: TemporalAmount): ZonedDateTime;
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
    plusTemporalAmount(amount: TemporalAmount): ZonedDateTime;
    plusWeeks(weeks: number): ZonedDateTime;
    plusYears(years: number): ZonedDateTime;
    query<R>(query: TemporalQuery<R>): R;
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
    withFixedOffsetZone(): ZonedDateTime;
    withHour(hour: number): ZonedDateTime;
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

export class DateTimeParseException extends Error {
    constructor(message?: string);
}

export class ZoneRulesProvider {
    static getRules(zoneId: string): ZoneRules;
    static getAvailableZoneIds(): string[];
}

export class DateTimeException extends Error {
    constructor(message?: string);
}

export const __esModule: true;
export as namespace JSJoda;
