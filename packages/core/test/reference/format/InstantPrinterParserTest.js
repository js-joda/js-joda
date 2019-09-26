import {expect} from 'chai';
import {assertEquals, fail} from '../../testUtils';

import '../../_init';

import {IllegalArgumentException} from '../../../src/errors';
import {Instant} from '../../../src/Instant';
import {LocalDateTime} from '../../../src/LocalDateTime';
import {ZoneOffset} from '../../../src/ZoneOffset';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeFormatter} from '../../../src/format/DateTimeFormatter';
import {ResolverStyle} from '../../../src/format/ResolverStyle';


// TODO tests are missing in threeten bp, add to threeten bp somehow
describe('tck.java.time.format.TCKInstantPrinterParser', () => {

    // @DataProvider(name='printGrouped')
    function data_printGrouped() {
        return [
            [0, 0, '1970-01-01T00:00:00Z'],

            [-1, 0, '1969-12-31T23:59:59Z'],
            [1, 0, '1970-01-01T00:00:01Z'],
            [60, 0, '1970-01-01T00:01:00Z'],
            [3600, 0, '1970-01-01T01:00:00Z'],
            [86400, 0, '1970-01-02T00:00:00Z'],

            [182, 2, '1970-01-01T00:03:02.000000002Z'],
            [182, 20, '1970-01-01T00:03:02.000000020Z'],
            [182, 200, '1970-01-01T00:03:02.000000200Z'],
            [182, 2000, '1970-01-01T00:03:02.000002Z'],
            [182, 20000, '1970-01-01T00:03:02.000020Z'],
            [182, 200000, '1970-01-01T00:03:02.000200Z'],
            [182, 2000000, '1970-01-01T00:03:02.002Z'],
            [182, 20000000, '1970-01-01T00:03:02.020Z'],
            [182, 200000000, '1970-01-01T00:03:02.200Z'],

            [Instant.MAX.epochSecond(), 999999999, '+1000000-12-31T23:59:59.999999999Z'],
            [Instant.MIN.epochSecond(), 0, '-1000000-01-01T00:00:00Z']
        ];
    }

    it('test_print_grouped', function () {
        data_printGrouped().forEach((data) => {
            test_print_grouped.apply(this, data);
        });
    });

    // @Test(dataProvider='printGrouped')
    function test_print_grouped(instantSecs, nano, expected) {
        const instant = Instant.ofEpochSecond(instantSecs, nano);
        const f = new DateTimeFormatterBuilder().appendInstant().toFormatter();
        assertEquals(f.format(instant), expected);
    }

    //-----------------------------------------------------------------------
    // @DataProvider(name='printDigits')
    function data_printDigits() {
        return [
            [-1, 0, 0, '1970-01-01T00:00:00Z'],
            [0, 0, 0, '1970-01-01T00:00:00Z'],
            [1, 0, 0, '1970-01-01T00:00:00.0Z'],
            [3, 0, 0, '1970-01-01T00:00:00.000Z'],
            [9, 0, 0, '1970-01-01T00:00:00.000000000Z'],

            [-1, -1, 0, '1969-12-31T23:59:59Z'],
            [-1, 1, 0, '1970-01-01T00:00:01Z'],
            [-1, 60, 0, '1970-01-01T00:01:00Z'],
            [-1, 3600, 0, '1970-01-01T01:00:00Z'],
            [-1, 86400, 0, '1970-01-02T00:00:00Z'],

            [-1, 182, 2, '1970-01-01T00:03:02.000000002Z'],
            [-1, 182, 20, '1970-01-01T00:03:02.00000002Z'],
            [-1, 182, 200, '1970-01-01T00:03:02.0000002Z'],
            [-1, 182, 2000, '1970-01-01T00:03:02.000002Z'],
            [-1, 182, 20000, '1970-01-01T00:03:02.00002Z'],
            [-1, 182, 200000, '1970-01-01T00:03:02.0002Z'],
            [-1, 182, 2000000, '1970-01-01T00:03:02.002Z'],
            [-1, 182, 20000000, '1970-01-01T00:03:02.02Z'],
            [-1, 182, 200000000, '1970-01-01T00:03:02.2Z'],

            [0, 182, 2, '1970-01-01T00:03:02Z'],
            [0, 182, 20, '1970-01-01T00:03:02Z'],
            [0, 182, 200, '1970-01-01T00:03:02Z'],
            [0, 182, 2000, '1970-01-01T00:03:02Z'],
            [0, 182, 20000, '1970-01-01T00:03:02Z'],
            [0, 182, 200000, '1970-01-01T00:03:02Z'],
            [0, 182, 2000000, '1970-01-01T00:03:02Z'],
            [0, 182, 20000000, '1970-01-01T00:03:02Z'],
            [0, 182, 200000000, '1970-01-01T00:03:02Z'],

            [1, 182, 2, '1970-01-01T00:03:02.0Z'],
            [1, 182, 20, '1970-01-01T00:03:02.0Z'],
            [1, 182, 200, '1970-01-01T00:03:02.0Z'],
            [1, 182, 2000, '1970-01-01T00:03:02.0Z'],
            [1, 182, 20000, '1970-01-01T00:03:02.0Z'],
            [1, 182, 200000, '1970-01-01T00:03:02.0Z'],
            [1, 182, 2000000, '1970-01-01T00:03:02.0Z'],
            [1, 182, 20000000, '1970-01-01T00:03:02.0Z'],
            [1, 182, 200000000, '1970-01-01T00:03:02.2Z'],

            [3, 182, 2, '1970-01-01T00:03:02.000Z'],
            [3, 182, 20, '1970-01-01T00:03:02.000Z'],
            [3, 182, 200, '1970-01-01T00:03:02.000Z'],
            [3, 182, 2000, '1970-01-01T00:03:02.000Z'],
            [3, 182, 20000, '1970-01-01T00:03:02.000Z'],
            [3, 182, 200000, '1970-01-01T00:03:02.000Z'],
            [3, 182, 2000000, '1970-01-01T00:03:02.002Z'],
            [3, 182, 20000000, '1970-01-01T00:03:02.020Z'],
            [3, 182, 200000000, '1970-01-01T00:03:02.200Z'],

            [9, 182, 2, '1970-01-01T00:03:02.000000002Z'],
            [9, 182, 20, '1970-01-01T00:03:02.000000020Z'],
            [9, 182, 200, '1970-01-01T00:03:02.000000200Z'],
            [9, 182, 2000, '1970-01-01T00:03:02.000002000Z'],
            [9, 182, 20000, '1970-01-01T00:03:02.000020000Z'],
            [9, 182, 200000, '1970-01-01T00:03:02.000200000Z'],
            [9, 182, 2000000, '1970-01-01T00:03:02.002000000Z'],
            [9, 182, 20000000, '1970-01-01T00:03:02.020000000Z'],
            [9, 182, 200000000, '1970-01-01T00:03:02.200000000Z'],

            [9, Instant.MAX.epochSecond(), 999999999, '+1000000-12-31T23:59:59.999999999Z'],
            [9, Instant.MIN.epochSecond(), 0, '-1000000-01-01T00:00:00.000000000Z']
        ];
    }

    it('test_print_digits', function () {
        data_printDigits().forEach((data) => {
            test_print_digits.apply(this, data);
        });
    });

    // @Test(dataProvider='printDigits')
    function test_print_digits(fractionalDigits, instantSecs, nano, expected) {
        const instant = Instant.ofEpochSecond(instantSecs, nano);
        const f = new DateTimeFormatterBuilder().appendInstant(fractionalDigits).toFormatter();
        assertEquals(f.format(instant), expected);
    }

    //-----------------------------------------------------------------------
    // @DataProvider(name='parseDigits')
    function data_parse_digits() {
        return [
            [0, 0, '1970-01-01T00:00:00Z'],
            [0, 0, '1970-01-01T00:00:00Z'],
            [0, 0, '1970-01-01T00:00:00.0Z'],
            [0, 0, '1970-01-01T00:00:00.000Z'],
            [0, 0, '1970-01-01T00:00:00.000000000Z'],

            [-1, 0, '1969-12-31T23:59:59Z'],
            [1, 0, '1970-01-01T00:00:01Z'],
            [60, 0, '1970-01-01T00:01:00Z'],
            [3600, 0, '1970-01-01T01:00:00Z'],
            [86400, 0, '1970-01-02T00:00:00Z'],

            [182, 234000000, '1970-01-01T00:03:02.234Z'],
            [182, 234000000, '1970-01-01T00:03:02.2340Z'],
            [182, 234000000, '1970-01-01T00:03:02.23400Z'],
            [182, 234000000, '1970-01-01T00:03:02.234000Z'],
            [182, 234000000, '1970-01-01T00:03:02.234000000Z'],

            [((23 * 60) + 59) * 60 + 59, 123456789, '1970-01-01T23:59:59.123456789Z'],

            [Instant.MAX.epochSecond(), 999999999, '+1000000-12-31T23:59:59.999999999Z'],
            [Instant.MIN.epochSecond(), 0, '-1000000-01-01T00:00:00.000000000Z']
        ];
    }

    it('test_parse_digitsMinusOne', function () {
        data_parse_digits().forEach((data) => {
            test_parse_digitsMinusOne.apply(this, data);
        });
    });

    // @Test(dataProvider='parseDigits')
    function test_parse_digitsMinusOne(instantSecs, nano, input) {
        //console.log(instantSecs, nano, input);
        const expected = Instant.ofEpochSecond(instantSecs, nano);
        const f = new DateTimeFormatterBuilder().appendInstant(-1).toFormatter();
        assertEquals(f.parse(input, Instant.FROM), expected);
        // assertEquals(f.parse(input).query(DateTimeFormatter.parsedExcessDays()), Period.ZERO);
        assertEquals(f.parse(input).query(DateTimeFormatter.parsedLeapSecond()), false);
    }

    it('test_parse_digitsNine', function () {
        data_parse_digits().forEach((data) => {
            test_parse_digitsNine.apply(this, data);
        });
    });

    // @Test(dataProvider='parseDigits')
    function test_parse_digitsNine(instantSecs, nano, input) {
        const f = new DateTimeFormatterBuilder().appendInstant(9).toFormatter();
        if (input.charAt(input.length - 11) === '.') {
            const expected = Instant.ofEpochSecond(instantSecs, nano);
            assertEquals(f.parse(input, Instant.FROM), expected);
            // assertEquals(f.parse(input).query(DateTimeFormatter.parsedExcessDays()), Period.ZERO);
            assertEquals(f.parse(input).query(DateTimeFormatter.parsedLeapSecond()), false);
        } else {
            try {
                f.parse(input, Instant.FROM);
                fail();
            } catch (ex) {
                // expected
            }
        }
    }

    it('test_parse_endOfDay', function () {
        const expected = LocalDateTime.of(1970, 2, 4, 0, 0, 0, 0).toInstant(ZoneOffset.UTC);
        const f = new DateTimeFormatterBuilder().appendInstant(-1).toFormatter(ResolverStyle.STRICT);
        const parsed = f.parse('1970-02-03T24:00:00Z');
        assertEquals(parsed.query(Instant.FROM), expected);
        // assertEquals(parsed.query(DateTimeFormatter.parsedExcessDays()), Period.ZERO);
        assertEquals(parsed.query(DateTimeFormatter.parsedLeapSecond()), false);
    });

    it('test_parse_leapSecond', function () {
        const expected = LocalDateTime.of(1970, 2, 3, 23, 59, 59, 123456789).toInstant(ZoneOffset.UTC);
        const f = new DateTimeFormatterBuilder().appendInstant(-1).toFormatter(ResolverStyle.STRICT);
        const parsed = f.parse('1970-02-03T23:59:60.123456789Z');
        assertEquals(parsed.query(Instant.FROM), expected);
        // assertEquals(parsed.query(DateTimeFormatter.parsedExcessDays()), Period.ZERO);
        assertEquals(parsed.query(DateTimeFormatter.parsedLeapSecond()), true);
    });

    //-----------------------------------------------------------------------
    it('test_appendInstant_tooSmall', () => {
        expect(() => {
            new DateTimeFormatterBuilder().appendInstant(-3);
        }).to.throw(IllegalArgumentException);
    });

    it('test_appendInstant_tooBig', () => {
        expect(() => {
            new DateTimeFormatterBuilder().appendInstant(10);
        }).to.throw(IllegalArgumentException);
    });

});
