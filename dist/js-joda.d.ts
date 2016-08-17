declare namespace JSJoda {

    abstract class TemporalAccessor {
        get(field: TemporalField): number

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange
    }
    abstract class Temporal extends TemporalAccessor {
    }

    abstract class Clock {
        static fixed(fixedInstant: Instant, zoneOffset: ZoneOffset): Clock

        static system(zone: ZoneId): Clock

        static systemDefaultZone(): Clock

        static systemUTC(): Clock

        abstract instant(): Instant

        abstract millis(): number

        abstract zone(): any
    }
    class DayOfWeek extends Temporal {
        static MONDAY: DayOfWeek
        static TUESDAY: DayOfWeek
        static WEDNESDAY: DayOfWeek
        static THURSDAY: DayOfWeek
        static FRIDAY: DayOfWeek
        static SATURDAY: DayOfWeek
        static SUNDAY: DayOfWeek

        static from(temporal: TemporalAccessor): DayOfWeek

        static of(dayOfWeek: number): DayOfWeek

        static valueOf(name: string): DayOfWeek

        static values(): DayOfWeek[]

        adjustInto(temporal: TemporalAdjuster): this

        equals(other: any): boolean

        getDisplayName(style: TextStyle, locale: Locale): string

        getLong(field: TemporalField): number

        isSupported(field: TemporalField): number

        minus(days: number): DayOfWeek

        name(): string

        ordinal(): number

        plus(days: number): DayOfWeek

        toString(): string

        value(): number
    }
    class TemporalAmount {
        addTo(temporal: Temporal): Temporal

        get(unit: TemporalUnit): number

        getUnits(): TemporalUnit[]

        subtractFrom(temporal: Temporal): Temporal
    }
    class Duration extends TemporalAmount {
        static ZERO: Duration

        static between(startInclusive: Temporal, endExclusive: Temporal): Duration

        static from(amount: number): Duration

        static of(amount: number, unit: TemporalUnit): Duration

        static ofDays(days: number): Duration

        static ofHours(hours: number): Duration

        static ofMillis(millis: number): Duration

        static ofMinutes(minutes: number): Duration

        static ofNanos(nanos: number): Duration

        static ofSeconds(seconds: number): Duration

        static parse(text: string): Duration

        abs(): Duration

        addTo(temporal: Temporal): Temporal

        compareTo(otherDuration: Duration): number

        dividedBy(divisor: number): Duration

        equals(otherDuration: any): boolean

        get(unit: TemporalUnit): number

        isNegative(): boolean

        isZero(): boolean

        minus(arg1: Duration | number, arg2: ChronoUnit): Duration

        minusAmountUnit(amountToSubtract: number, unit: TemporalUnit): Duration

        minusDays(daysToSubtract: number): Duration

        minusDuration(duration: Duration): Duration

        minusHours(hoursToSubtract: number): Duration

        minusMillis(millisToSubtract: number): Duration

        minusMinutes(minutesToSubtract: number): Duration

        minusNanos(nanosToSubtract: number): Duration

        minusSeconds(secondsToSubtract: number): Duration

        multipliedBy(multiplicand: number): Duration

        nano(): number

        negated(): Duration

        plus(arg1: Duration | number, arg2: ChronoUnit | number): Duration

        plusAmountUnit(amountToAdd: number, unit: TemporalUnit): Duration

        plusDays(daysToAdd: number): Duration

        plusDuration(duration: Duration): Duration

        plusHours(hoursToAdd: number): Duration

        plusMillis(millisToAdd: number): Duration

        plusMinutes(minutesToAdd: number): Duration

        plusNanos(nanosToAdd: number): Duration

        plusSeconds(secondsToAdd: number): Duration

        plusSecondsNanos(secondsToAdd: number, nanosToAdd: number): Duration

        seconds(): number

        subtractFrom(temporal: Temporal): Temporal

        toDays(): number

        toHours(): number

        toJSON(): string

        toMillis(): number

        toMinutes(): number

        toNanos(): number

        toString(): string

        units(): any

        withNanos(nanoOfSecond: number): Duration

        withSeconds(seconds: number): Duration
    }
    class Instant extends Temporal {
        static EPOCH: Instant
        static MIN: Instant
        static MAX: Instant
        static MIN_SECONDS: Instant
        static MAX_SECONDS: Instant

        static from(temporal: TemporalAccessor): Instant

        static now(clock: Clock): Instant

        static ofEpochMilli(epochMilli: number): Instant

        static ofEpochSecond(epochSecond: number, nanoAdjustment: number): Instant

        static parse(text: string): Instant

        adjustInto(temporal: Temporal): Temporal

        compareTo(otherInstant: Instant): number

        epochSecond(): number

        equals(otherInstant: any): boolean

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        hashCode(): number

        isAfter(otherInstant: Instant): boolean

        isBefore(otherInstant: Instant): boolean

        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean

        minus(amount: TemporalAmount): Instant
        minus(amountToSubtract: number, unit: TemporalUnit): Instant

        minusMillis(millisToSubtract: number): Instant

        minusNanos(nanosToSubtract: number): Instant

        minusSeconds(secondsToSubtract: number): Instant

        nano(): number

        plus(amount: TemporalAmount): Instant
        plus(amountToAdd: number, unit: TemporalUnit): Instant

        plusMillis(millisToAdd: number): Instant

        plusNanos(nanosToAdd: number): Instant

        plusSeconds(secondsToAdd: number): Instant

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange

        toEpochMilli(): number

        toString(): string

        truncatedTo(unit: TemporalUnit): Instant

        until(endExclusive: Temporal, unit: TemporalUnit): number

        with(adjuster: TemporalAdjuster): Instant
        with(field: TemporalField, newValue: number): Instant

        withTemporalAdjuster(adjuster: TemporalAdjuster): Instant

    }
    class DateTimeBuilder extends Temporal {
        static create(field: TemporalField, value: number): DateTimeBuilder

        constructor()

        public chrono: any
        public date: any
        public excessDays: any
        public fieldValues: any
        public leapSecond: boolean
        public time: any
        public zone: any

        build(type: TemporalQuery): any

        getFieldValue0(field: TemporalField): number

        getLong(field: TemporalField): number

        isSupported(field: TemporalField): number

        query(query: TemporalQuery): any

        resolve(resolverStyle: ResolverStyle, resolverFields: Array<TemporalField>): DateTimeBuilder
    }
    class ResolverStyle {
        static STRICT: ResolverStyle
        static SMART: ResolverStyle
        static LENIENT: ResolverStyle
    }
    class DateTimeFormatter {
        static ISO_LOCAL_DATE: DateTimeFormatter
        static ISO_LOCAL_TIME: DateTimeFormatter
        static ISO_LOCAL_DATE_TIME: DateTimeFormatter

        static ofPattern(pattern: string): DateTimeFormatter

        static parsedExcessDays(): TemporalQuery

        static parsedLeapSecond(): boolean

        constructor(printerParser: any, locale: any, decimalStyle: any, resolverStyle: ResolverStyle, resolverFields?: any, chrono?: any, zone?: any)

        chronology(): any

        decimalStyle(): any

        format(temporal: TemporalAccessor): string

        locale(): any

        parse(text: string, type: TemporalQuery): TemporalAccessor

        parse1(text: string): TemporalAccessor

        parse2(text: any, type: any): any

        parseUnresolved(text: any, position: any): any

        toPrinterParser(optional: boolean): any // CompositePrinterParser, not documented
        toString(): any

        withChronology(chrono: any): any

        withLocale(): DateTimeFormatter
    }
    class DateTimeFormatterBuilder {
        constructor(parentBuilder: DateTimeFormatterBuilder, optional: boolean)

        append(formatter: DateTimeFormatter): DateTimeFormatterBuilder

        appendFraction(field: TemporalField, minWidth: number, maxWidth: number, decimalPoint: boolean): DateTimeFormatterBuilder

        appendInstant(fractionalDigits: number): DateTimeFormatterBuilder

        appendLiteral(literal: any): DateTimeFormatterBuilder

        appendOffset(pattern: string, noOffsetText: string): DateTimeFormatterBuilder

        appendOffsetId(): DateTimeFormatterBuilder

        appendPattern(pattern: string): DateTimeFormatterBuilder

        appendValue(): DateTimeFormatterBuilder

        appendValueReduced(): DateTimeFormatterBuilder

        appendZoneId(): DateTimeFormatterBuilder

        optionalEnd(): DateTimeFormatterBuilder

        optionalStart(): DateTimeFormatterBuilder

        padNext(): DateTimeFormatterBuilder

        parseCaseInsensitive(): DateTimeFormatterBuilder

        parseCaseSensitive(): DateTimeFormatterBuilder

        parseLenient(): DateTimeFormatterBuilder

        parseStrict(): DateTimeFormatterBuilder

        toFormatter(resolverStyle: ResolverStyle): DateTimeFormatter
    }
    class Chronology {
        // TODO: this
    }
    class LocalTime extends Temporal {
        static MIN: LocalTime
        static MAX: LocalTime
        static MIDNIGHT: LocalTime
        static NOON: LocalTime
        static HOURS_PER_DAY: LocalTime
        static MINUTES_PER_HOUR: LocalTime
        static MINUTES_PER_DAY: LocalTime
        static SECONDS_PER_MINUTE: LocalTime
        static SECONDS_PER_HOUR: LocalTime
        static SECONDS_PER_DAY: LocalTime
        static MILLIS_PER_DAY: LocalTime
        static MICROS_PER_DAY: LocalTime
        static NANOS_PER_SECOND: LocalTime
        static NANOS_PER_MINUTE: LocalTime
        static NANOS_PER_HOUR: LocalTime
        static NANOS_PER_DAY: LocalTime

        static from(temporal: TemporalAccessor): LocalTime

        static now(clockOrZone: Clock | ZoneId): LocalDateTime

        static of(hour: number, minute: number, second: number, nanoOfSecond: number): LocalTime

        static ofInstant(instant: Instant, zone: ZoneId): LocalDate

        static ofNanoOfDay(nanoOfDay: number): LocalTime

        static ofSecondOfDay(secondOfDay: number, nanoOfSecond: number): LocalTime

        static parse(text: String, formatter: String): LocalTime

        constructor(hour?: number, minute?: number, second?: number, nanoOfSecond?: number)

        adjustInto(temporal: TemporalAdjuster): Temporal

        atDate(date: LocalDate): LocalDateTime

        compareTo(other: LocalTime): number

        equals(other: any): any

        format(formatter: DateTimeFormatter): string

        get(field: ChronoField): number

        getLong(field: ChronoField): number

        hashCode(): number

        hour(): number

        isAfter(other: LocalTime): any

        isBefore(other: LocalTime): any

        isSupported(fieldOrUnit: ChronoField | ChronoUnit): boolean

        minus(amount: TemporalAmount): LocalTime
        minus(amountToSubtract: number, unit: ChronoUnit): LocalTime

        minusHours(hoursToSubtract: number): LocalTime

        minusMinutes(minutesToSubtract: number): LocalTime

        minusNanos(nanosToSubtract: number): LocalTime

        minusSeconds(secondsToSubtract: number): LocalTime

        minute(): number

        nano(): number

        plus(amount: TemporalAmount): LocalTime
        plus(amountToAdd: number, unit: ChronoUnit): LocalTime

        plusHours(hoursToAdd: number): LocalTime

        plusMinutes(minutesToAdd: number): LocalTime

        plusNanos(nanosToAdd: number): LocalTime

        plusSeconds(secondstoAdd: number): LocalTime

        query(query: TemporalQuery): any

        range(field: ChronoField): ValueRange

        second(): number

        toJSON(): string

        toNanoOfDay(): number

        toSecondOfDay(): number

        toString(): string

        truncatedTo(unit: ChronoUnit): LocalTime

        until(endExclusive: TemporalAccessor, unit: TemporalUnit): number

        with(adjuster: TemporalAdjuster): LocalTime
        with(field: ChronoField, newValue: number): LocalTime

        withHour(hour: number): LocalTime

        withMinute(minute: number): LocalTime

        withNano(nanoOfSecond: number): LocalTime

        withSecond(second: number): LocalTime

        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalTime
    }
    class MathUtil {
        static compareNumbers(a: number, b: number): number

        static floorDiv(x: number, y: number): number

        static floorMod(x: number, y: number): number

        static intDiv(x: number, y: number): number

        static intMod(x: number, y: number): number

        static parseInt(value: number): number

        static roundDown(r: number): number

        static safeAdd(x: number, y: number): number

        static safeMultiply(x: number, y: number): number

        static safeSubtract(x: number, y: number): number

        static safeToInt(value: number): number

        static safeZero(value: number): number

        static verifyInt(value: number)
    }
    class Month extends Temporal {
        static JANUARY: Month
        static FEBRUARY: Month
        static MARCH: Month
        static APRIL: Month
        static MAY: Month
        static JUNE: Month
        static JULY: Month
        static AUGUST: Month
        static SEPTEMBER: Month
        static OCTOBER: Month
        static NOVEMBER: Month
        static DECEMBER: Month

        static from(temporal: TemporalAccessor): Month

        static of(month: number): Month

        static values(): Month[]

        constructor(value: number)

        adjustInto(temporal: Temporal): Temporal

        firstDayOfYear(leapYear: boolean): number

        firstMonthOfQuarter(): Month

        get(field: TemporalField): number

        getDisplayName(style: TextStyle, locale: Locale): string

        getLong(field: TemporalField): number

        isSupported(field: TemporalField): boolean

        length(leapYear: boolean): number

        maxLength(): number

        minLength(): number

        minus(months: number): Month

        plus(months: number): Month

        query(query: TemporalQuery): any

        toString(): string

        value(): number
    }
    class MonthDay extends Temporal {
        static from(temporal: TemporalAccessor): MonthDay

        static now(arg1?: ZoneId | Clock): MonthDay

        static of(arg1: Month | number, arg2?: number): MonthDay

        static ofMonthNumber(month: Month, dayOfMonth: number): MonthDay

        static ofNumberNumber(month: number, dayOfMonth: number): MonthDay

        static parse(arg1?: ZoneId | Clock): MonthDay

        static parseString(text: string): MonthDay

        static parseStringFormatter(text: string, formatter: DateTimeFormatter): MonthDay

        constructor(month: number, dayOfMonth: number)

        adjustInto(temporal: Temporal): Temporal

        atYear(year: number): LocalDate

        compareTo(other: MonthDay): number

        dayOfMonth(): number

        equals(obj: any): boolean

        format(formatter: DateTimeFormatter): string

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        isAfter(other: MonthDay): boolean

        isBefore(other: MonthDay): boolean

        isSupported(field: TemporalField): boolean

        isValidYear(year: number): boolean

        month(): Month

        monthValue(): number

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange

        toString(): string

        with(month: Month): MonthDay

        withDayOfMonth(dayOfMonth: number): MonthDay

        withMonth(month: number): MonthDay
    }
    interface TemporalField {
    }
    class ChronoField {
        static NANO_OF_SECOND: ChronoField
        static NANO_OF_DAY: ChronoField
        static MICRO_OF_SECOND: ChronoField
        static MICRO_OF_DAY: ChronoField
        static MILLI_OF_SECOND: ChronoField
        static MILLI_OF_DAY: ChronoField
        static SECOND_OF_MINUTE: ChronoField
        static SECOND_OF_DAY: ChronoField
        static MINUTE_OF_HOUR: ChronoField
        static MINUTE_OF_DAY: ChronoField
        static HOUR_OF_AMPM: ChronoField
        static CLOCK_HOUR_OF_AMPM: ChronoField
        static HOUR_OF_DAY: ChronoField
        static CLOCK_HOUR_OF_DAY: ChronoField
        static AMPM_OF_DAY: ChronoField
        static DAY_OF_WEEK: ChronoField
        static ALIGNED_DAY_OF_WEEK_IN_MONTH: ChronoField
        static ALIGNED_DAY_OF_WEEK_IN_YEAR: ChronoField
        static DAY_OF_MONTH: ChronoField
        static DAY_OF_YEAR: ChronoField
        static EPOCH_DAY: ChronoField
        static ALIGNED_WEEK_OF_MONTH: ChronoField
        static ALIGNED_WEEK_OF_YEAR: ChronoField
        static MONTH_OF_YEAR: ChronoField
        static PROLEPTIC_MONTH: ChronoField
        static YEAR_OF_ERA: ChronoField
        static YEAR: ChronoField
        static ERA: ChronoField
        static INSTANT_SECONDS: ChronoField
        static OFFSET_SECONDS: ChronoField

        constructor(name: string, baseUnit: number, rangeUnit: number, range: ValueRange)

        baseUnit(): number

        checkValidIntValue(value: number): number

        checkValidValue(value: number): any

        displayName(): string

        equals(other: any): boolean

        getFrom(temporal: TemporalAccessor): number

        isDateBased(): boolean

        isTimeBased(): boolean

        name(): string

        range(): ValueRange

        rangeRefinedBy(temporal: TemporalAccessor): ValueRange

        rangeUnit(): number

        toString(): string
    }
    class TemporalUnit {
    }
    class ChronoUnit extends TemporalUnit {
        static MICROS: ChronoUnit
        static MILLIS: ChronoUnit
        static SECONDS: ChronoUnit
        static MINUTES: ChronoUnit
        static HOURS: ChronoUnit
        static HALF_DAYS: ChronoUnit
        static DAYS: ChronoUnit
        static WEEKS: ChronoUnit
        static MONTHS: ChronoUnit
        static YEARS: ChronoUnit
        static DECADES: ChronoUnit
        static CENTURIES: ChronoUnit
        static MILLENNIA: ChronoUnit
        static ERAS: ChronoUnit
        static FOREVER: ChronoUnit

        constructor(name: string, estimatedDuration: Duration)

        addTo(temporal: Temporal, amount: number): Temporal

        between(temporal1: Temporal, temporal2: Temporal): number

        compareTo(other: TemporalUnit): number

        duration(): Duration

        isDateBased(): boolean

        isDurationEstimated(): boolean

        isSupportedBy(temporal: Temporal): boolean

        isTimeBased(): boolean

        toString(): string
    }
    class IsoFields {
        static DAY_OF_QUARTER: IsoFields
        static QUARTER_OF_YEAR: IsoFields
        static WEEK_OF_WEEK_BASED_YEAR: IsoFields
        static WEEK_BASED_YEAR: IsoFields
        static WEEK_BASED_YEARS: IsoFields
        static QUARTER_YEARS: IsoFields
    }
    class ChronoLocalDate extends Temporal {
        adjustInto(temporal: TemporalAdjuster): this

        format(formatter: DateTimeFormatter): string

        isSupported(fieldOrUnit: TemporalField|TemporalUnit): boolean
    }
    class LocalDate extends ChronoLocalDate {
        static MIN: LocalDate
        static MAX: LocalDate
        static EPOCH_0: LocalDate

        static from(temporal: TemporalAccessor): LocalDate

        static now(clockOrZone?: Clock|ZoneId): LocalDate

        static of(year: number, month: Month|number, dayOfMonth: number): LocalDate

        static ofEpochDay(epochDay: number): LocalDate

        static ofInstant(instant: Instant, zoneId: ZoneId)

        static ofYearDay(year: number, dayOfYear: number): LocalDate

        static parse(text: string, formatter?: DateTimeFormatter): LocalDate

        atStartOfDay(): LocalDateTime
        atStartOfDay(zone: ZoneId): ZonedDateTime

        atStartOfDayWithZone(zone: ZoneId): ZonedDateTime

        atTime(time: LocalTime): LocalDateTime
        atTime(hour: number, minute: number, second?: number, nanoOfSecond?: number): LocalDateTime

        chronology(): Chronology

        compareTo(other: LocalDate): number

        dayOfMonth(): number

        dayOfWeek(): DayOfWeek

        dayOfYear(): number

        equals(otherDate: any): boolean

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        hashCode(): number

        isAfter(other: LocalDate): boolean

        isBefore(other: LocalDate): boolean

        isEqual(other: LocalDate): boolean

        isLeapYear(): boolean

        lengthOfMonth(): number;

        lengthOfYear(): number;

        minus(amount: TemporalAmount): LocalDate
        minus(amountToSubtract: number, unit: TemporalUnit): LocalDate

        minusDays(daysToSubtract: number): LocalDate

        minusMonths(monthsToSubtract: number): LocalDate

        minusWeeks(weeksToSubtract: number): LocalDate

        minusYears(yearsToSubtract: number): LocalDate

        month(): Month

        monthValue(): number

        plus(amount: TemporalAmount): LocalDate
        plus(amountToAdd: number, unit: TemporalUnit): LocalDate

        plusDays(daysToAdd: number): LocalDate

        plusMonths(monthsToAdd: number): LocalDate

        plusWeeks(weeksToAdd: number): LocalDate

        plusYears(yearsToAdd: number): LocalDate

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange

        toEpochDay(): number

        toJSON(): string

        toString(): string

        until(endDate: TemporalAccessor): Period
        until(endExclusive: TemporalAccessor, unit: TemporalUnit): number

        with(fieldOrAdjuster: TemporalField | TemporalAdjuster, newValue: Number): LocalDate

        withDayOfMonth(dayOfMonth: number): LocalDate

        withDayOfYear(dayOfYear: number): LocalDate

        withFieldAndValue(field: TemporalField, newValue: number): LocalDate

        withMonth(month: Month|number): LocalDate

        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalDate

        withYear(year: number): LocalDate

        year(): number
    }
    abstract class ChronoLocalDateTime extends Temporal {
        adjustInto(temporal: any): any

        chronology(): Chronology

        toEpochSecond(offset: ZoneOffset): number

        toInstant(offset: ZoneOffset): Instant
    }
    class LocalDateTime extends ChronoLocalDateTime {
        static MIN: LocalDateTime
        static MAX: LocalDateTime

        constructor(date: LocalDate, time: LocalTime)

        adjustInto(temporal: TemporalAdjuster): LocalDateTime

        atZone(zone: ZoneId): ZonedDateTime

        compareTo(other: LocalDateTime): number

        dayOfMonth(): number

        dayOfWeek(): number

        dayOfYear(): number

        equals(other: any): boolean

        format(formatter: DateTimeFormatter): string

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        hashCode(): number

        hour(): number

        isAfter(other: LocalDateTime): boolean

        isBefore(other: LocalDateTime): boolean

        isEqual(other: any): boolean

        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean

        minus(amount: TemporalAmount): LocalDateTime
        minus(amountToSubtract: number, unit: TemporalUnit): LocalDateTime

        minusDays(days: number): LocalDateTime

        minusHours(hours: number): LocalDateTime

        minusMinutes(minutes: number): LocalDateTime

        minusMonths(months: number): LocalDateTime

        minusNanos(nanos: number): LocalDateTime

        minusSeconds(seconds: number): LocalDateTime

        minusTemporalAmount(amount: TemporalAmount): LocalDateTime

        minusWeeks(weeks: number): LocalDateTime

        minusYears(years: number): LocalDateTime

        minute(): number

        month(): Month

        monthValue(): number

        nano(): number

        plus(amount: TemporalAmount): LocalDateTime
        plus(amountToAdd: number, unit: TemporalUnit): LocalDateTime

        plusDays(days: number): LocalDateTime

        plusHours(hours: number): LocalDateTime

        plusMinutes(minutes: number): LocalDateTime

        plusMonths(months: number): LocalDateTime

        plusNanos(nanos: number): LocalDateTime

        plusSeconds(seconds: number): LocalDateTime

        plusTemporalAmount(amount: TemporalAmount): LocalDateTime

        plusWeeks(weeks: number): LocalDateTime

        plusYears(years: number): LocalDateTime

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange

        second(): number

        toJSON(): string

        toLocalDate(): LocalDate

        toLocalTime(): LocalTime

        toString(): string

        truncatedTo(unit: TemporalUnit): LocalDateTime

        until(endExclusive: Temporal, unit: TemporalUnit): number

        with(adjusterOrField): LocalDateTime
        with(field: TemporalField, newValue: number): LocalDateTime

        withDayOfMonth(dayOfMonth: number): LocalDateTime

        withDayOfYear(dayOfYear: number): LocalDateTime

        withHour(hour: number): LocalDateTime

        withMinute(minute: number): LocalDateTime

        withMonth(month: number | Month): LocalDateTime

        withNano(nanoOfSecond: number): LocalDateTime

        withSecond(second: number): LocalDateTime

        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalDateTime

        withYear(year: number): LocalDateTime

        year(): number
    }
    class OffsetDateTime {
        // TODO
    }
    class Period extends TemporalAmount {
        static ZERO: Period

        static between(startDate: LocalDate, endDate: LocalDate): Period

        static create(years: number, months: number, days: number): Duration

        static from(amount: TemporalAmount): Period

        static of(years: number, months: number, days: number): Period

        static ofDays(days: number): Period

        static ofMonths(months: number): Period

        static ofWeeks(weeks: number): Period

        static ofYears(years: number): Period

        static parse(text: string): Period

        addTo(temporal: Temporal): Temporal

        chronology(): IsoChronology

        days(): number

        equals(obj: any): boolean

        get(unit: TemporalUnit): number

        hashCode(): number

        isNegative(): boolean

        isZero(): boolean

        minus(amountToSubtract: TemporalAmount): Period

        minusDays(daysToSubtract: number): Period

        minusMonths(monthsToSubtract: number): Period

        minusYears(yearsToSubtract: number): Period

        months(): number

        multipliedBy(scalar: number): Period

        negated(): Period

        normalized(): Period

        plus(amountToAdd: TemporalAmount): Period

        plusDays(daysToAdd: number): Period

        plusMonths(monthsToAdd: number): Period

        plusYears(yearsToAdd: number): Period

        subtractFrom(temporal: Temporal): Temporal

        toJSON(): string

        toString(): string

        toTotalMonths(): number

        units(): ChronoUnit[]

        withDays(days: number): Period

        withMonths(months: number): Period

        withYears(years: number): Period

        years(): number
    }
    class StringUtil {
        static hashCode(text: string): number

        static startsWith(text: string, pattern: string): boolean
    }
    class TemporalAdjuster {
        adjustInto(temporal: Temporal): Temporal
    }
    class TemporalAdjusters {
        static dayOfWeekInMonth(ordinal: number, dayOfWeek: DayOfWeek): TemporalAdjuster

        static firstDayOfMonth(): TemporalAdjuster

        static firstDayOfNextMonth(): TemporalAdjuster

        static firstDayOfNextYear(): TemporalAdjuster

        static firstDayOfYear(): TemporalAdjuster

        static firstInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster

        static lastDayOfMonth(): TemporalAdjuster

        static lastDayOfYear(): TemporalAdjuster

        static lastInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster

        static next(dayOfWeek: DayOfWeek): TemporalAdjuster

        static nextOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster

        static previous(dayOfWeek: DayOfWeek): TemporalAdjuster

        static previousOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster
    }
    class TemporalQueries {
        static chronology(): TemporalQuery

        static localDate(): TemporalQuery

        static localTime(): TemporalQuery

        static offset(): TemporalQuery

        static precision(): TemporalQuery

        static zone(): TemporalQuery

        static zoneId(): TemporalQuery
    }
    class TemporalQuery {
        queryFrom(temporal: TemporalAccessor): any
    }
    class ValueRange {
        static of(min: number, max: number): ValueRange
        static of(min: number, maxSmallest: number, maxLargest: number): ValueRange
        static of(minSmallest: number, minLargest: number, maxSmallest: number, maxLargest: number): ValueRange

        constructor(minSmallest: number, minLargest: number, maxSmallest: number, maxLargest: number)

        checkValidIntValue(value: number, field: TemporalField): number

        checkValidValue(value: number, field: TemporalField): any

        equals(other: any): boolean

        hashCode(): number

        isFixed(): boolean

        isIntValue(): boolean

        isValidIntValue(value: number): boolean

        isValidValue(value: any): boolean

        largestMinimum(): number

        maximum(): number

        minimum(): number

        smallestMaximum(): number

        toString(): string
    }
    class Year extends Temporal {
        static MIN_VALUE: number;
        static MAX_VALUE: number;

        static from(temporal: TemporalAccessor): Year

        static isLeap(year: number): boolean

        static now(arg1?: ZoneId | Clock): Year

        static of(isoYear: number): Year

        static parse(text: string, formatter?: DateTimeFormatter): Year
    }
    class YearMonth extends Temporal {
        static from(temporal: TemporalAccessor): YearMonth

        static now(arg1?: ZoneId | Clock): YearMonth

        static of(arg1: Month | number, arg2?: number): YearMonth

        static parse(arg1: string, arg2?: DateTimeFormatter): MonthDay
    }
    class ZoneId {
        equals(other: any): boolean

        hashCode(): number

        normalized(): ZoneId

        rules(): ZoneRules

        toString(): string
    }
    class ZoneOffset extends ZoneId {
        static MAX_SECONDS: ZoneOffset
        static UTC: ZoneOffset
        static MIN: ZoneOffset
        static MAX: ZoneOffset

        static of(offsetId: string): ZoneOffset

        static ofHours(hours: number): ZoneOffset

        static ofHoursMinutes(hours: number, minutes: number): ZoneOffset

        static ofHoursMinutesSeconds(hours: number, minutes: number, seconds: number): ZoneOffset

        static ofTotalMinutes(totalMinutes: number): ZoneOffset

        static ofTotalSeconds(totalSeconds: number): ZoneOffset

        constructor(totalSeconds: number)

        adjustInto(temporal: Temporal): Temporal

        compareTo(other: ZoneOffset): number

        equals(obj: any): boolean

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        hashCode(): number

        id(): string

        query(query: TemporalQuery): any

        rules(): ZoneRules

        toString(): string

        totalSeconds(): number
    }
    class ZoneRegion extends ZoneId {
        static ofId(zoneId: any): ZoneId

        constructor(id: string, rules: ZoneRules)

        id(): string

        rules(): ZoneRules
    }
    class ZoneRules {
        static of(offest: ZoneOffset): ZoneRules

        isFixedOffset(): boolean

        isValidOffset(localDateTime: LocalDateTime, offset: ZoneOffset): boolean

        offset(instantOrLocalDateTime: Instant|LocalDateTime): ZoneOffset

        offsetOfEpochMilli(epochMilli: number): ZoneOffset

        offsetOfInstant(instant: Instant): ZoneOffset

        offsetOfLocalDateTime(localDateTime: LocalDateTime): ZoneOffset

    }
    abstract class ChronoZonedDateTime extends Temporal {
        compareTo(other: ChronoZonedDateTime): number

        equals(other: any): boolean

        format(formatter: DateTimeFormatter): string

        isAfter(other: ChronoZonedDateTime): boolean

        isBefore(other: ChronoZonedDateTime): boolean

        isEqual(other: ChronoZonedDateTime): boolean

        query(query: any): any

        toEpochSecond(): number

        toInstant(): Instant
    }
    class ZonedDateTime extends ChronoZonedDateTime {
        static from(temporal: TemporalAccessor): ZonedDateTime

        static now(clockOrZone: Clock | ZoneId): ZonedDateTime

        static of(): any
        static of(localDateTime: LocalDateTime, zone: ZoneId): ZonedDateTime
        static of(date: LocalDate, time: LocalTime, zone: ZoneId): ZonedDateTime
        static of(year: number, month: number, dayOfMonth: number, hour: number, minute: number, second: number, nanoOfSecond: number, zone: ZoneId): ZonedDateTime

        static ofInstant(): ZonedDateTime
        static ofInstant(instant: Instant, zone: ZoneId): ZonedDateTime
        static ofInstant(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime

        static ofLocal(localDateTime: LocalDateTime, zone: ZoneId, preferredOffset: ZoneOffset): ZonedDateTime

        static ofStrict(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime

        static parse(text: string, formatter: DateTimeFormatter): ZonedDateTime

        constructor(dateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId)

        dayOfMonth(): number

        dayOfWeek(): DayOfWeek

        dayOfYear(): number

        equals(other: any): any

        format(formatter: DateTimeFormatter): string

        get(field: TemporalField): number

        getLong(field: TemporalField): number

        hashCode(): number

        hour(): number

        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean

        minus(): any
        minus(amountToSubtract: number, unit: TemporalUnit): ZonedDateTime

        minusDays(days: number): ZonedDateTime

        minusHours(hours: number): ZonedDateTime

        minusMinutes(minutes: number): ZonedDateTime

        minusMonths(months: number): ZonedDateTime

        minusNanos(nanos: number): ZonedDateTime

        minusSeconds(seconds: number): ZonedDateTime

        minusTemporalAmount(amount: TemporalAmount): ZonedDateTime

        minusWeeks(weeks: number): ZonedDateTime

        minusYears(years: number): ZonedDateTime

        minute(): number

        month(): Month

        monthValue(): number

        nano(): number

        offset(): any

        plus(): any
        plus(amountToAdd: number, unit: TemporalUnit): ZonedDateTime

        plusDays(days: number): any

        plusHours(hours: number): ZonedDateTime

        plusMinutes(minutes: number): ZonedDateTime

        plusMonths(months: number): ZonedDateTime

        plusNanos(nanos: number): ZonedDateTime

        plusSeconds(seconds: number): ZonedDateTime

        plusTemporalAmount(amount: TemporalAmount): ZonedDateTime

        plusWeeks(weeks: number): any

        plusYears(years: number): ZonedDateTime

        query(query: TemporalQuery): any

        range(field: TemporalField): ValueRange

        second(): number

        toJSON(): string

        toLocalDate(): LocalDate

        toLocalDateTime(): LocalDateTime

        toLocalTime(): LocalTime

        toOffsetDateTime(): OffsetDateTime

        toString(): string

        truncatedTo(unit: TemporalUnit): ZonedDateTime

        until(endExclusive: Temporal, unit: TemporalUnit): number

        with(): any
        with(field: TemporalField, newValue: number): ZonedDateTime

        withDayOfMonth(dayOfMonth: number): ZonedDateTime

        withDayOfYear(dayOfYear: number): ZonedDateTime

        withFixedOffsetZone(): ZonedDateTime

        withHour(hour: number): ZonedDateTime

        withMinute(minute: number): ZonedDateTime

        withMonth(month: number): ZonedDateTime

        withNano(nanoOfSecond: number): ZonedDateTime

        withSecond(second: number): ZonedDateTime

        withTemporalAdjuster(adjuster: TemporalAdjuster): ZonedDateTime

        withYear(year: number): ZonedDateTime

        withZoneSameInstant(zone: ZoneId): ZonedDateTime

        withZoneSameLocal(zone: ZoneId): ZonedDateTime

        year(): number

        zone(): ZoneId
    }
    class TextStyle {
        asNormal(): TextStyle

        asStandalone(): TextStyle

        isStandalone(): boolean
    }
    class Locale {
        // TODO
    }
    abstract class IsoChronology {
        static isLeapYear(prolepticYear: number): boolean

        resolveDate(fieldValues: any, resolverStyle: any): any

        equals(other: any): boolean

        toString(): string
    }
}

declare module "JSJoda" {
    export = JSJoda;
}