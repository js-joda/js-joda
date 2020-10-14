import {
    DateTimeFormatter,
    DayOfWeek,
    Duration,
    Instant,
    LocalDate,
    LocalDateTime,
    LocalTime,
    MonthDay,
    Year,
    YearMonth,
    ZoneOffset,
    ZoneOffsetTransition,
    ZoneRules,
    ZonedDateTime,
    ZoneId,
    DateTimeParseException,
    ZoneOffsetTransitionRule,
    TemporalQueries,
    ArithmeticException,
    IllegalArgumentException,
    IllegalStateException,
    NullPointerException,
    DateTimeException,
    UnsupportedTemporalTypeException,
    ZoneRegion,
} from '../../'

// used below
declare function moment(): any;

/* - these test function don't actually *do* anything, they are also not meant to be run
 * - they are used to test the typescript definitions / typings that we provide
 * - they are mostly copied from the CheatSheet.md file and show usage of JSJoda and wether the usage complies
 *   with the typing definitions
 *
 *  We used the Contribution guide ideas from DefinitelyTyped for these "tests"
 *  For more information, see e.g. http:
 */

function test_ZoneOffsetTransition() {
    const zot = ZoneOffsetTransition.of(LocalDateTime.now(), ZoneOffset.UTC, ZoneOffset.ofHours(2));

    expectType<Instant>(zot.instant());
    expectType<number>(zot.toEpochSecond());;
    expectType<LocalDateTime>(zot.dateTimeAfter());
    expectType<LocalDateTime>(zot.dateTimeBefore());
    expectType<ZoneOffset>(zot.offsetAfter());
    expectType<ZoneOffset>(zot.offsetBefore());
    expectType<Duration>(zot.duration());
    expectType<number>(zot.durationSeconds());
    expectType<boolean>(zot.isGap());
    expectType<boolean>(zot.isOverlap());
    expectType<boolean>(zot.isValidOffset(ZoneOffset.UTC));
    expectType<ZoneOffset[]>(zot.validOffsets());
    expectType<boolean>(zot.equals(zot));
    expectType<number>(zot.compareTo(undefined! as ZoneOffsetTransition));
    expectType<number>(zot.hashCode());
    expectType<string>(zot.toString());
}

function test_ZoneRules() {
    const zr = ZoneRules.of(ZoneOffset.UTC);

    expectType<boolean>(zr.isFixedOffset());
    expectType<ZoneOffset>(zr.offset(Instant.now()));
    expectType<ZoneOffset>(zr.offset(LocalDateTime.now()));
    expectType<string>(zr.toJSON());
    expectType<ZoneOffset>(zr.offsetOfEpochMilli(0));
    expectType<ZoneOffset>(zr.offsetOfInstant(Instant.now()));
    expectType<ZoneOffset>(zr.offsetOfLocalDateTime(LocalDateTime.now()));
    expectType<ZoneOffset[]>(zr.validOffsets(LocalDateTime.now()));
    expectType<ZoneOffsetTransition>(zr.transition(LocalDateTime.now()));
    expectType<ZoneOffset>(zr.standardOffset(Instant.now()));
    expectType<Duration>(zr.daylightSavings(Instant.now()));
    expectType<boolean>(zr.isDaylightSavings(Instant.now()));
    expectType<boolean>(zr.isValidOffset(LocalDateTime.now(), ZoneOffset.UTC));
    expectType<ZoneOffsetTransition>(zr.nextTransition(Instant.now()));
    expectType<ZoneOffsetTransition>(zr.previousTransition(Instant.now()));
    expectType<ZoneOffsetTransition[]>(zr.transitions());
    expectType<ZoneOffsetTransitionRule[]>(zr.transitionRules());
    expectType<string>(zr.toString());
}

function test_ZoneId() {
    var zoneId = ZoneId.SYSTEM;

    zoneId.id();

    expectType<string>(zoneId.toString());
    expectType<string>(zoneId.toJSON());
}

function test_ZoneOffset() {
    var zoff = ZoneOffset.UTC;

    zoff.id();

    expectType<string>(zoff.toString());
    expectType<string>(zoff.toJSON());
}

function test_ZoneRegion() {
    var zreg = ZoneRegion.UTC;

    zreg.id();

    expectType<string>(zreg.toString());
    expectType<string>(zreg.toJSON());
}

function test_TemporalQuery() {
    const fmt = DateTimeFormatter.ofPattern('');
    fmt.parse('', TemporalQueries.localDate())
    fmt.parse('', DayOfWeek.FROM);
    fmt.parse('', Instant.FROM);
    fmt.parse('', LocalDate.FROM);
    fmt.parse('', LocalDateTime.FROM);
    fmt.parse('', LocalTime.FROM);
    fmt.parse('', MonthDay.FROM);
    fmt.parse('', Year.FROM);
    fmt.parse('', YearMonth.FROM);
    fmt.parse('', ZonedDateTime.FROM);
}


function test_exceptions() {
    try {
        // imagine a not-so-good code that throws...
    } catch (error) {
        if (error instanceof ArithmeticException) {
            expectType<string>(error.message);
        }
        else if (error instanceof IllegalArgumentException) {
            expectType<string>(error.message);
        }
        else if (error instanceof IllegalStateException) {
            expectType<string>(error.message);
        }
        else if (error instanceof NullPointerException) {
            expectType<string>(error.message);
        }
        else if (error instanceof DateTimeException) {
            expectType<string>(error.message);
        }
        else if (error instanceof UnsupportedTemporalTypeException) {
            expectType<string>(error.message);
            // notice this is assignable to DateTimeException since is
            // a subtype.
            expectType<DateTimeException>(error);
        }
        else if (error instanceof DateTimeParseException) {
            expectType<string>(error.message);
            expectType<string>(error.parsedString());
            expectType<number>(error.errorIndex());
        }
    }

    const e1 = new DateTimeException('message');
    const e2 = new DateTimeParseException('message', 'text', 0, e1);
    new DateTimeException();
    new DateTimeParseException();
}

/**
 * Use this to check if an expression is of type T.
 * Don't let TypeScript infer the type, give it explicitly.
 */
declare function expectType<T>(v: T): T;
