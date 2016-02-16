import {expect} from 'chai';
import {assertEquals, assertTrue, assertNotNull} from '../testUtils';

import '../_init';

import {MathUtil} from '../../src/MathUtil';
import {DateTimeException, DateTimeParseException, NullPointerException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {Instant} from '../../src/Instant';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.TestLocalTime', function () {
    var TEST_12_30_40_987654321;

    beforeEach(function () {
        TEST_12_30_40_987654321 = LocalTime.of(12, 30, 40, 987654321);
    });

    function check(time, h, m, s, n) {
        assertEquals(time.hour(), h);
        assertEquals(time.minute(), m);
        assertEquals(time.second(), s);
        assertEquals(time.nano(), n);
    }

    describe('const', function () {
        it('constant_MIDNIGHT', () => {
            check(LocalTime.MIDNIGHT, 0, 0, 0, 0);
        });

        it('constant_MIDNIGHT_equal', () => {
            assertEquals(LocalTime.MIDNIGHT, LocalTime.MIDNIGHT);
            assertEquals(LocalTime.MIDNIGHT, LocalTime.of(0, 0));
        });

        it('constant_MIDDAY', () => {
            check(LocalTime.NOON, 12, 0, 0, 0);
        });

        it('constant_MIDDAY_equal', () => {
            assertEquals(LocalTime.NOON, LocalTime.NOON);
            assertEquals(LocalTime.NOON, LocalTime.of(12, 0));
        });

        it('constant_MIN_TIME', () => {
            check(LocalTime.MIN, 0, 0, 0, 0);
        });

        it('constant_MIN_TIME_equal', () => {
            assertEquals(LocalTime.MIN, LocalTime.of(0, 0));
        });

        it('constant_MAX_TIME', () => {
            check(LocalTime.MAX, 23, 59, 59, 999999999);
        });

        it('constant_MAX_TIME_equal', () => {
            assertEquals(LocalTime.NOON, LocalTime.NOON);
            assertEquals(LocalTime.NOON, LocalTime.of(12, 0));
        });

    });
    
    describe('now()', () => {

        it('now()', () => {
            var expected = LocalTime.now(Clock.systemDefaultZone());
            var test = LocalTime.now();
            var diff = Math.abs(test.toNanoOfDay() - expected.toNanoOfDay());
            assertTrue(diff < 100000000);  // less than 0.1 secs
        });

    });

/** TODO timezone
    describe('now(ZoneId)', () => {
        it('now_ZoneId_nullZoneId', () => {
            expect(() => {
                LocalTime.now(null);
            }).to.throw(NullPointerException);
        });
        
        it('now_ZoneId()', () => {
            var zone = ZoneId.of('UTC+01:02:03');
            var expected = LocalTime.now(Clock.system(zone));
            var test = LocalTime.now(zone);
            for (var i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalTime.now(Clock.system(zone));
                test = LocalTime.now(zone);
            }
            assertEquals(test, expected);
        });
    
	});
*/

    describe('now(Clock)', () => {

        it('now_Clock_nullClock', () => {
            expect(() => {
                LocalTime.now(null);
            }).to.throw(NullPointerException);
        });

        it('now_Clock_allSecsInDay()', () => {
            for (var i = 0; i < (2 * 24 * 60 * 60); i++) {
                var instant = Instant.ofEpochSecond(i, 8);
                var clock = Clock.fixed(instant, ZoneOffset.UTC);
                var test = LocalTime.now(clock);
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv(i, (60 * 60)), 24));
                assertEquals(test.minute(), MathUtil.intMod(MathUtil.intDiv(i, 60), 60));
                assertEquals(test.second(), i % 60);
                assertEquals(test.nano(), 8);
            }
        });
        
        it('now_Clock_beforeEpoch()', () => {
            for (let i =-1; i >= -(24 * 60 * 60); i--) {
                var instant = Instant.ofEpochSecond(i, 8);
                var clock = Clock.fixed(instant, ZoneOffset.UTC);
                var test = LocalTime.now(clock);
                assertEquals(test.hour(), MathUtil.intMod(MathUtil.intDiv((i + 24 * 60 * 60), (60 * 60)), 24));
                assertEquals(test.minute(), (MathUtil.intDiv((i + 24 * 60 * 60), 60) % 60));
                assertEquals(test.second(), (i + 24 * 60 * 60) % 60);
                assertEquals(test.nano(), 8);
            }
        });
    
        //-----------------------------------------------------------------------
        it('now_Clock_max', () => {
            var clock = Clock.fixed(Instant.MAX, ZoneOffset.UTC);
            var test = LocalTime.now(clock);
            assertEquals(test.hour(), 23);
            assertEquals(test.minute(), 59);
            assertEquals(test.second(), 59);
            assertEquals(test.nano(), 999999999);
        });
        
        it('now_Clock_min', () => {
            var clock = Clock.fixed(Instant.MIN, ZoneOffset.UTC);
            var test = LocalTime.now(clock);
            assertEquals(test.hour(), 0);
            assertEquals(test.minute(), 0);
            assertEquals(test.second(), 0);
            assertEquals(test.nano(), 0);
        });

    });

    describe('of() factories', function () {

        it('factory_time_2ints', () => {
            var test = LocalTime.of(12, 30);
            check(test, 12, 30, 0, 0);
        });

        it('factory_time_2ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_2ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_time_3ints', () => {
            var test = LocalTime.of(12, 30, 40);
            check(test, 12, 30, 40, 0);
        });

        it('factory_time_3ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_secondTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_3ints_secondTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 60);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_time_4ints', () => {
            var test = LocalTime.of(12, 30, 40, 987654321);
            check(test, 12, 30, 40, 987654321);
            test = LocalTime.of(12, 0, 40, 987654321);
            check(test, 12, 0, 40, 987654321);
        });

        it('factory_time_4ints_hourTooLow', () => {
            expect(() => {
                LocalTime.of(-1, 0, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_hourTooHigh', () => {
            expect(() => {
                LocalTime.of(24, 0, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_minuteTooLow', () => {
            expect(() => {
                LocalTime.of(0, -1, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_minuteTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 60, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_secondTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_secondTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_nanoTooLow', () => {
            expect(() => {
                LocalTime.of(0, 0, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_time_4ints_nanoTooHigh', () => {
            expect(() => {
                LocalTime.of(0, 0, 0, 1000000000);
            }).to.throw(DateTimeException);
        });

    });


    describe('ofSecondOfDay(long)', () => {

        it('factory_ofSecondOfDay()', () => {
            var localTime = LocalTime.ofSecondOfDay(2 * 60 * 60 + 17 * 60 + 23);
            check(localTime, 2, 17, 23, 0);
        });

        it('factory_ofSecondOfDay_tooLow', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(-1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_tooHigh', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(24 * 60 * 60);
            }).to.throw(DateTimeException);
        });

    });

    describe('ofSecondOfDay(long, int)', function () {

        it('factory_ofSecondOfDay_long_int()', () => {
            var localTime = LocalTime.ofSecondOfDay(2 * 60 * 60 + 17 * 60 + 23, 987);
            check(localTime, 2, 17, 23, 987);
        });

        it('factory_ofSecondOfDay_long_int_tooLowSecs', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(-1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooHighSecs', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(24 * 60 * 60, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooLowNanos', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(0, -1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofSecondOfDay_long_int_tooHighNanos', () => {
            expect(() => {
                LocalTime.ofSecondOfDay(0, 1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('ofNanoOfDay(long)', () => {

        it('factory_ofNanoOfDay()', () => {
            var localTime = LocalTime.ofNanoOfDay(60 * 60 * 1000000000 + 17);
            check(localTime, 1, 0, 0, 17);
        });

        it('factory_ofNanoOfDay_tooLow', () => {
            expect(() => {
                LocalTime.ofNanoOfDay(-1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofNanoOfDay_tooHigh()', () => {
            expect(() => {
                LocalTime.ofNanoOfDay(24 * 60 * 60 * 1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('from()', () => {

        it('factory_from_DateTimeAccessor', () => {
            assertEquals(LocalTime.from(LocalTime.of(17, 30)), LocalTime.of(17, 30));
            // TODO assertEquals(LocalTime.from(LocalDateTime.of(2012, 5, 1, 17, 30)), LocalTime.of(17, 30));
        });

        it('factory_from_DateTimeAccessor_invalid_noDerive', () => {
            expect(() => {
                LocalTime.from(LocalDate.of(2007, 7, 15));
            }).to.throw(DateTimeException);
        });

        it('factory_from_DateTimeAccessor_null', () => {
            expect(() => {
                LocalTime.from(null);
            }).to.throw(NullPointerException);

        });

    });

    function provider_sampleToString() {
        return [
            [0, 0, 0, 0, '00:00'],
            [1, 0, 0, 0, '01:00'],
            [23, 0, 0, 0, '23:00'],
            [0, 1, 0, 0, '00:01'],
            [12, 30, 0, 0, '12:30'],
            [23, 59, 0, 0, '23:59'],
            [0, 0, 1, 0, '00:00:01'],
            [0, 0, 59, 0, '00:00:59'],
            [0, 0, 0, 100000000, '00:00:00.100'],
            [0, 0, 0, 10000000, '00:00:00.010'],
            [0, 0, 0, 1000000, '00:00:00.001'],
            [0, 0, 0, 100000, '00:00:00.000100'],
            [0, 0, 0, 10000, '00:00:00.000010'],
            [0, 0, 0, 1000, '00:00:00.000001'],
            [0, 0, 0, 100, '00:00:00.000000100'],
            [0, 0, 0, 10, '00:00:00.000000010'],
            [0, 0, 0, 1, '00:00:00.000000001'],
            [0, 0, 0, 999999999, '00:00:00.999999999'],
            [0, 0, 0, 99999999, '00:00:00.099999999'],
            [0, 0, 0, 9999999, '00:00:00.009999999'],
            [0, 0, 0, 999999, '00:00:00.000999999'],
            [0, 0, 0, 99999, '00:00:00.000099999'],
            [0, 0, 0, 9999, '00:00:00.000009999'],
            [0, 0, 0, 999, '00:00:00.000000999'],
            [0, 0, 0, 99, '00:00:00.000000099'],
            [0, 0, 0, 9, '00:00:00.000000009']
        ];
    }

    function provider_sampleBadParse() {
        return [
            ['00;00'],
            ['12-00'],
            ['-01:00'],
            ['00:00:00-09'],
            ['00:00:00,09'],
            ['00:00:abs'],
            ['11'],
            ['11:30+01:00'],
            ['11:30+01:00[Europe/Paris]']
        ];
    }

    describe.skip('parse()', () => {

        it('factory_parse_validText', () => {
            provider_sampleToString().forEach((data) => {
                factory_parse_validText.apply(this, data);
            });
        });

        function factory_parse_validText(h, m, s, n, parsable) {
            var t = LocalTime.parse(parsable);
            assertNotNull(t, parsable);
            assertEquals(t.getHour(), h);
            assertEquals(t.getMinute(), m);
            assertEquals(t.getSecond(), s);
            assertEquals(t.getNano(), n);
        }

        it('factory_parse_invalidText', () => {
            provider_sampleBadParse().forEach((data) => {
                factory_parse_invalidText.apply(this, data);
            });
        });

        function factory_parse_invalidText(unparsable) {
            expect(() => {
                LocalTime.parse(unparsable);
            }).to.throw(DateTimeParseException);
        }

        it('factory_parse_illegalHour', function () {
            expect(() => {
                LocalTime.parse('25:00');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_illegalMinute', function () {
            expect(() => {
                LocalTime.parse('12:60');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_illegalSecond', function () {
            expect(() => {
                LocalTime.parse('12:12:60');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_nullTest', function () {
            expect(() => {
                LocalTime.parse(null);
            }).to.throw(NullPointerException);
        });
    });

/* TODO parser
    describe('parse(DateTimeFormatter)', () => {

        it('factory_parse_formatter()', () => {
            var f = DateTimeFormatter.ofPattern('H m s');
            var test = LocalTime.parse('14 30 40', f);
            assertEquals(test, LocalTime.of(14, 30, 40));
        });

        it('factory_parse_formatter_nullText()', () => {
            expect(() => {
                var f = DateTimeFormatter.ofPattern('H m s');
                LocalTime.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter()', () => {
            expect(() => {
                LocalTime.parse('ANY', null);
            }).to.throw(NullPointerException);
        });

    });
*/


});

/**
    describe('get(TemporalField)', () => {

	});

    @Test
    public void test_get_TemporalField() {
        var test = TEST_12_30_40_987654321;
        assertEquals(test.get(ChronoField.HOUR_OF_DAY), 12);
        assertEquals(test.get(ChronoField.MINUTE_OF_HOUR), 30);
        assertEquals(test.get(ChronoField.SECOND_OF_MINUTE), 40);
        assertEquals(test.get(ChronoField.NANO_OF_SECOND), 987654321);

        assertEquals(test.get(ChronoField.SECOND_OF_DAY), 12 * 3600 + 30 * 60 + 40);
        assertEquals(test.get(ChronoField.MINUTE_OF_DAY), 12 * 60 + 30);
        assertEquals(test.get(ChronoField.HOUR_OF_AMPM), 0);
        assertEquals(test.get(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
        assertEquals(test.get(ChronoField.CLOCK_HOUR_OF_DAY), 12);
        assertEquals(test.get(ChronoField.AMPM_OF_DAY), 1);
    }

    it('test_get_TemporalField_tooBig', () => {
	expect(() => {
        TEST_12_30_40_987654321.get(NANO_OF_DAY);
    
	}).to.throw(DateTimeException);
});

    it('test_get_TemporalField_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.get((TemporalField) null);
    
	}).to.throw(NullPointerException);
});

    it('test_get_TemporalField_invalidField', () => {
	expect(() => {
        TEST_12_30_40_987654321.get(MockFieldNoValue.INSTANCE);
    
	}).to.throw(DateTimeException);
});

    it('test_get_TemporalField_dateField', () => {
	expect(() => {
        TEST_12_30_40_987654321.get(ChronoField.DAY_OF_MONTH);
    
	}).to.throw(DateTimeException);
});

    describe('getLong(TemporalField)', () => {

	});

    @Test
    public void test_getLong_TemporalField() {
        var test = TEST_12_30_40_987654321;
        assertEquals(test.getLong(ChronoField.HOUR_OF_DAY), 12);
        assertEquals(test.getLong(ChronoField.MINUTE_OF_HOUR), 30);
        assertEquals(test.getLong(ChronoField.SECOND_OF_MINUTE), 40);
        assertEquals(test.getLong(ChronoField.NANO_OF_SECOND), 987654321);

        assertEquals(test.getLong(ChronoField.NANO_OF_DAY), ((12 * 3600 + 30 * 60 + 40) * 1000000000L) + 987654321);
        assertEquals(test.getLong(ChronoField.SECOND_OF_DAY), 12 * 3600 + 30 * 60 + 40);
        assertEquals(test.getLong(ChronoField.MINUTE_OF_DAY), 12 * 60 + 30);
        assertEquals(test.getLong(ChronoField.HOUR_OF_AMPM), 0);
        assertEquals(test.getLong(ChronoField.CLOCK_HOUR_OF_AMPM), 12);
        assertEquals(test.getLong(ChronoField.CLOCK_HOUR_OF_DAY), 12);
        assertEquals(test.getLong(ChronoField.AMPM_OF_DAY), 1);
    }

    it('test_getLong_TemporalField_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.getLong((TemporalField) null);
    
	}).to.throw(NullPointerException);
});

    it('test_getLong_TemporalField_invalidField', () => {
	expect(() => {
        TEST_12_30_40_987654321.getLong(MockFieldNoValue.INSTANCE);
    
	}).to.throw(DateTimeException);
});

    it('test_getLong_TemporalField_dateField', () => {
	expect(() => {
        TEST_12_30_40_987654321.getLong(ChronoField.DAY_OF_MONTH);
    
	}).to.throw(DateTimeException);
});

    describe('query(TemporalQuery)', () => {

	});

    @Test
    it('test_query', () => {
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.chronology()), null);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.localDate()), null);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.localTime()), TEST_12_30_40_987654321);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.offset()), null);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.precision()), ChronoUnit.NANOS);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.zone()), null);
        assertEquals(TEST_12_30_40_987654321.query(TemporalQueries.zoneId()), null);
    });

    it('test_query_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.query(null);
    
	}).to.throw(NullPointerException);
});

    //-----------------------------------------------------------------------
    // get*()
    //-----------------------------------------------------------------------
    @DataProvider(name='sampleTimes')
    Object[][] provider_sampleTimes() {
        return new Object[][] {
            {0, 0, 0, 0},
            {0, 0, 0, 1},
            {0, 0, 1, 0},
            {0, 0, 1, 1},
            {0, 1, 0, 0},
            {0, 1, 0, 1},
            {0, 1, 1, 0},
            {0, 1, 1, 1},
            {1, 0, 0, 0},
            {1, 0, 0, 1},
            {1, 0, 1, 0},
            {1, 0, 1, 1},
            {1, 1, 0, 0},
            {1, 1, 0, 1},
            {1, 1, 1, 0},
            {1, 1, 1, 1},
        };
    }

    //-----------------------------------------------------------------------
    @Test(dataProvider='sampleTimes')
    public void test_get(int h, int m, int s, int ns) {
        var a = LocalTime.of(h, m, s, ns);
        assertEquals(a.getHour(), h);
        assertEquals(a.getMinute(), m);
        assertEquals(a.getSecond(), s);
        assertEquals(a.getNano(), ns);
    }

    describe('with()', () => {

	});

    @Test
    public void test_with_adjustment() {
        final var sample = LocalTime.of(23, 5);
        var adjuster = new TemporalAdjuster() {
            @Override
            public Temporal adjustInto(Temporal dateTime) {
                return sample;
            }
        };
        assertEquals(TEST_12_30_40_987654321.with(adjuster), sample);
    }

    it('test_with_adjustment_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.with((TemporalAdjuster) null);
    
	}).to.throw(NullPointerException);
});

    describe('withHour()', () => {

	});

    @Test
    public void test_withHour_normal() {
        var t = TEST_12_30_40_987654321;
        for (var i = 0; i < 24; i++) {
            t = t.withHour(i);
            assertEquals(t.getHour(), i);
        }
    }

    @Test
    it('test_withHour_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.withHour(12);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_withHour_toMidnight_equal', () => {
        var t = LocalTime.of(1, 0).withHour(0);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_withHour_toMidday_equal', () => {
        var t = LocalTime.of(1, 0).withHour(12);
        assertEquals(t, LocalTime.NOON);
    });

    it('test_withHour_hourTooLow', () => {
	expect(() => {
        TEST_12_30_40_987654321.withHour(-1);
    
	}).to.throw(DateTimeException);
});

    it('test_withHour_hourTooHigh', () => {
	expect(() => {
        TEST_12_30_40_987654321.withHour(24);
    
	}).to.throw(DateTimeException);
});

    describe('withMinute()', () => {

	});

    @Test
    public void test_withMinute_normal() {
        var t = TEST_12_30_40_987654321;
        for (var i = 0; i < 60; i++) {
            t = t.withMinute(i);
            assertEquals(t.getMinute(), i);
        }
    }

    @Test
    it('test_withMinute_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.withMinute(30);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_withMinute_toMidnight_equal', () => {
        var t = LocalTime.of(0, 1).withMinute(0);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_withMinute_toMidday_equals', () => {
        var t = LocalTime.of(12, 1).withMinute(0);
        assertEquals(t, LocalTime.NOON);
    });

    it('test_withMinute_minuteTooLow', () => {
	expect(() => {
        TEST_12_30_40_987654321.withMinute(-1);
    
	}).to.throw(DateTimeException);
});

    it('test_withMinute_minuteTooHigh', () => {
	expect(() => {
        TEST_12_30_40_987654321.withMinute(60);
    
	}).to.throw(DateTimeException);
});

    describe('withSecond()', () => {

	});

    @Test
    public void test_withSecond_normal() {
        var t = TEST_12_30_40_987654321;
        for (var i = 0; i < 60; i++) {
            t = t.withSecond(i);
            assertEquals(t.getSecond(), i);
        }
    }

    @Test
    it('test_withSecond_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.withSecond(40);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_withSecond_toMidnight_equal', () => {
        var t = LocalTime.of(0, 0, 1).withSecond(0);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_withSecond_toMidday_equal', () => {
        var t = LocalTime.of(12, 0, 1).withSecond(0);
        assertEquals(t, LocalTime.NOON);
    });

    it('test_withSecond_secondTooLow', () => {
	expect(() => {
        TEST_12_30_40_987654321.withSecond(-1);
    
	}).to.throw(DateTimeException);
});

    it('test_withSecond_secondTooHigh', () => {
	expect(() => {
        TEST_12_30_40_987654321.withSecond(60);
    
	}).to.throw(DateTimeException);
});

    describe('withNano()', () => {

	});

    @Test
    it('test_withNanoOfSecond_normal', () => {
        var t = TEST_12_30_40_987654321;
        t = t.withNano(1);
        assertEquals(t.getNano(), 1);
        t = t.withNano(10);
        assertEquals(t.getNano(), 10);
        t = t.withNano(100);
        assertEquals(t.getNano(), 100);
        t = t.withNano(999999999);
        assertEquals(t.getNano(), 999999999);
    });

    @Test
    it('test_withNanoOfSecond_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.withNano(987654321);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_withNanoOfSecond_toMidnight_equal', () => {
        var t = LocalTime.of(0, 0, 0, 1).withNano(0);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_withNanoOfSecond_toMidday_equal', () => {
        var t = LocalTime.of(12, 0, 0, 1).withNano(0);
        assertEquals(t, LocalTime.NOON);
    });

    it('test_withNanoOfSecond_nanoTooLow', () => {
	expect(() => {
        TEST_12_30_40_987654321.withNano(-1);
    
	}).to.throw(DateTimeException);
});

    it('test_withNanoOfSecond_nanoTooHigh', () => {
	expect(() => {
        TEST_12_30_40_987654321.withNano(1000000000);
    
	}).to.throw(DateTimeException);
});

    describe('truncated(TemporalUnit)', () => {

	});

    var NINETY_MINS = new TemporalUnit() {
        @Override
        public String toString() {
            return 'NinetyMins';
        }
        @Override
        public Duration getDuration() {
            return Duration.ofMinutes(90);
        }
        @Override
        public boolean isDurationEstimated() {
            return false;
        }
        @Override
        public boolean isDateBased() {
            return false;
        }
        @Override
        public boolean isTimeBased() {
            return true;
        }
        @Override
        public boolean isSupportedBy(Temporal temporal) {
            return false;
        }
        @Override
        public <R extends Temporal> R addTo(R r, long l) {
            throw new UnsupportedOperationException();
        }
        @Override
        public long between(Temporal r, Temporal r2) {
            throw new UnsupportedOperationException();
        }
    };

    var NINETY_FIVE_MINS = new TemporalUnit() {
        @Override
        public String toString() {
            return 'NinetyFiveMins';
        }
        @Override
        public Duration getDuration() {
            return Duration.ofMinutes(95);
        }
        @Override
        public boolean isDurationEstimated() {
            return false;
        }
        @Override
        public boolean isDateBased() {
            return false;
        }
        @Override
        public boolean isTimeBased() {
            return true;
        }
        @Override
        public boolean isSupportedBy(Temporal temporal) {
            return false;
        }
        @Override
        public <R extends Temporal> R addTo(R r, long l) {
            throw new UnsupportedOperationException();
        }
        @Override
        public long between(Temporal r, Temporal r2) {
            throw new UnsupportedOperationException();
        }
    };

    @DataProvider(name='truncatedToValid')
    Object[][] data_truncatedToValid() {
        return new Object[][] {
            {LocalTime.of(1, 2, 3, 123456789), NANOS, LocalTime.of(1, 2, 3, 123456789)},
            {LocalTime.of(1, 2, 3, 123456789), MICROS, LocalTime.of(1, 2, 3, 123456000)},
            {LocalTime.of(1, 2, 3, 123456789), MILLIS, LocalTime.of(1, 2, 3, 123000000)},
            {LocalTime.of(1, 2, 3, 123456789), SECONDS, LocalTime.of(1, 2, 3)},
            {LocalTime.of(1, 2, 3, 123456789), MINUTES, LocalTime.of(1, 2)},
            {LocalTime.of(1, 2, 3, 123456789), HOURS, LocalTime.of(1, 0)},
            {LocalTime.of(1, 2, 3, 123456789), DAYS, LocalTime.MIDNIGHT},

            {LocalTime.of(1, 1, 1, 123456789), NINETY_MINS, LocalTime.of(0, 0)},
            {LocalTime.of(2, 1, 1, 123456789), NINETY_MINS, LocalTime.of(1, 30)},
            {LocalTime.of(3, 1, 1, 123456789), NINETY_MINS, LocalTime.of(3, 0)},
        };
    }

    @Test(groups={'tck'}, dataProvider='truncatedToValid')
    public void test_truncatedTo_valid(LocalTime input, TemporalUnit unit, LocalTime expected) {
        assertEquals(input.truncatedTo(unit), expected);
    }

    @DataProvider(name='truncatedToInvalid')
    Object[][] data_truncatedToInvalid() {
        return new Object[][] {
            {LocalTime.of(1, 2, 3, 123456789), NINETY_FIVE_MINS},
            {LocalTime.of(1, 2, 3, 123456789), WEEKS},
            {LocalTime.of(1, 2, 3, 123456789), MONTHS},
            {LocalTime.of(1, 2, 3, 123456789), YEARS},
        };
    }

    @Test(groups={'tck'}, dataProvider='truncatedToInvalid', expectedExceptions=DateTimeException.class)
    public void test_truncatedTo_invalid(LocalTime input, TemporalUnit unit) {
        input.truncatedTo(unit);
    }

    @Test(expectedExceptions=NullPointerException.class, groups={'tck'})
    it('test_truncatedTo_null', () => {
        TEST_12_30_40_987654321.truncatedTo(null);
    });

    describe('plus(PlusAdjuster)', () => {

	});

    @Test
    it('test_plus_Adjuster_positiveHours', () => {
        var period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
        var t = TEST_12_30_40_987654321.plus(period);
        assertEquals(t, LocalTime.of(19, 30, 40, 987654321));
    });

    @Test
    it('test_plus_Adjuster_negativeMinutes', () => {
        var period = MockSimplePeriod.of(-25, ChronoUnit.MINUTES);
        var t = TEST_12_30_40_987654321.plus(period);
        assertEquals(t, LocalTime.of(12, 5, 40, 987654321));
    });

    @Test
    it('test_plus_Adjuster_zero', () => {
        var period = Period.ZERO;
        var t = TEST_12_30_40_987654321.plus(period);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_plus_Adjuster_wrap', () => {
        var p = Duration.ofHours(1);
        var t = LocalTime.of(23, 30).plus(p);
        assertEquals(t, LocalTime.of(0, 30));
    });

    it('test_plus_Adjuster_dateNotAllowed', () => {
	expect(() => {
        var period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
        TEST_12_30_40_987654321.plus(period);
    
	}).to.throw(DateTimeException);
});

    it('test_plus_Adjuster_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.plus((TemporalAmount) null);
    
	}).to.throw(NullPointerException);
});

    //-----------------------------------------------------------------------
    // plus(long,PeriodUnit)
    //-----------------------------------------------------------------------
    @Test
    it('test_plus_longPeriodUnit_positiveHours', () => {
        var t = TEST_12_30_40_987654321.plus(7, ChronoUnit.HOURS);
        assertEquals(t, LocalTime.of(19, 30, 40, 987654321));
    });

    @Test
    it('test_plus_longPeriodUnit_negativeMinutes', () => {
        var t = TEST_12_30_40_987654321.plus(-25, ChronoUnit.MINUTES);
        assertEquals(t, LocalTime.of(12, 5, 40, 987654321));
    });

    @Test
    it('test_plus_longPeriodUnit_zero', () => {
        var t = TEST_12_30_40_987654321.plus(0, ChronoUnit.MINUTES);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_plus_long_unit_invalidUnit() {
        for (TemporalUnit unit : INVALID_UNITS) {
            try {
                TEST_12_30_40_987654321.plus(1, unit);
                fail('Unit should not be allowed ' + unit);
            } catch (DateTimeException ex) {
                // expected
            }
        }
    }

    it('test_plus_long_multiples', () => {
	expect(() => {
        TEST_12_30_40_987654321.plus(0, DAYS);
    
	}).to.throw(UnsupportedTemporalTypeException);
});

    it('test_plus_longPeriodUnit_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.plus(1, (TemporalUnit) null);
    
	}).to.throw(NullPointerException);
});

    describe('plus(adjuster)', () => {

	});

    @Test
    it('test_plus_adjuster', () => {
        var p = Duration.ofSeconds(62, 3);
        var t = TEST_12_30_40_987654321.plus(p);
        assertEquals(t, LocalTime.of(12, 31, 42, 987654324));
    });

    @Test
    it('test_plus_adjuster_big', () => {
        var p = Duration.ofNanos(Long.MAX_VALUE);
        var t = TEST_12_30_40_987654321.plus(p);
        assertEquals(t, TEST_12_30_40_987654321.plusNanos(Long.MAX_VALUE));
    });

    @Test
    it('test_plus_adjuster_zero_equal', () => {
        var t = TEST_12_30_40_987654321.plus(Period.ZERO);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_plus_adjuster_wrap', () => {
        var p = Duration.ofHours(1);
        var t = LocalTime.of(23, 30).plus(p);
        assertEquals(t, LocalTime.of(0, 30));
    });

    it('test_plus_adjuster_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.plus((TemporalAmount) null);
    
	}).to.throw(NullPointerException);
});

    describe('plusHours()', () => {

	});

    @Test
    public void test_plusHours_one() {
        var t = LocalTime.MIDNIGHT;
        for (var i = 0; i < 50; i++) {
            t = t.plusHours(1);
            assertEquals(t.getHour(), (i + 1) % 24);
        }
    }

    @Test
    public void test_plusHours_fromZero() {
        var base = LocalTime.MIDNIGHT;
        for (var i = -50; i < 50; i++) {
            var t = base.plusHours(i);
            assertEquals(t.getHour(), (i + 72) % 24);
        }
    }

    @Test
    public void test_plusHours_fromOne() {
        var base = LocalTime.of(1, 0);
        for (var i = -50; i < 50; i++) {
            var t = base.plusHours(i);
            assertEquals(t.getHour(), (1 + i + 72) % 24);
        }
    }

    @Test
    it('test_plusHours_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.plusHours(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_plusHours_toMidnight_equal', () => {
        var t = LocalTime.of(23, 0).plusHours(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_plusHours_toMidday_equal', () => {
        var t = LocalTime.of(11, 0).plusHours(1);
        assertEquals(t, LocalTime.NOON);
    });

    @Test
    public void test_plusHours_big() {
        var t = LocalTime.of(2, 30).plusHours(Long.MAX_VALUE);
        var hours = (int) (Long.MAX_VALUE % 24L);
        assertEquals(t, LocalTime.of(2, 30).plusHours(hours));
    }

    describe('plusMinutes()', () => {

	});

    @Test
    public void test_plusMinutes_one() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        for (var i = 0; i < 70; i++) {
            t = t.plusMinutes(1);
            min++;
            if (min == 60) {
                hour++;
                min = 0;
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
        }
    }

    @Test
    public void test_plusMinutes_fromZero() {
        var base = LocalTime.MIDNIGHT;
        int hour;
        int min;
        for (var i = -70; i < 70; i++) {
            var t = base.plusMinutes(i);
            if (i < -60) {
                hour = 22;
                min = i + 120;
            } else if (i < 0) {
                hour = 23;
                min = i + 60;
            } else if (i >= 60) {
                hour = 1;
                min = i - 60;
            } else {
                hour = 0;
                min = i;
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
        }
    }

    @Test
    it('test_plusMinutes_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.plusMinutes(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_plusMinutes_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.plusMinutes(24 * 60);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_plusMinutes_toMidnight_equal', () => {
        var t = LocalTime.of(23, 59).plusMinutes(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_plusMinutes_toMidday_equal', () => {
        var t = LocalTime.of(11, 59).plusMinutes(1);
        assertEquals(t, LocalTime.NOON);
    });

    @Test
    public void test_plusMinutes_big() {
        var t = LocalTime.of(2, 30).plusMinutes(Long.MAX_VALUE);
        var mins = (int) (Long.MAX_VALUE % (24L * 60L));
        assertEquals(t, LocalTime.of(2, 30).plusMinutes(mins));
    }

    describe('plusSeconds()', () => {

	});

    @Test
    public void test_plusSeconds_one() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        var sec = 0;
        for (var i = 0; i < 3700; i++) {
            t = t.plusSeconds(1);
            sec++;
            if (sec == 60) {
                min++;
                sec = 0;
            }
            if (min == 60) {
                hour++;
                min = 0;
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
            assertEquals(t.getSecond(), sec);
        }
    }

    @DataProvider(name='plusSeconds_fromZero')
    Iterator<Object[]> plusSeconds_fromZero() {
        return new Iterator<Object[]>() {
            var delta = 30;
            var i = -3660;
            var hour = 22;
            var min = 59;
            var sec = 0;

            public boolean hasNext() {
                return i <= 3660;
            }

            public Object[] next() {
                final Object[] ret = new Object[] {i, hour, min, sec};
                i += delta;
                sec += delta;

                if (sec >= 60) {
                    min++;
                    sec -= 60;

                    if (min == 60) {
                        hour++;
                        min = 0;

                        if (hour == 24) {
                            hour = 0;
                        }
                    }
                }

                return ret;
            }

            it('remove', () => {
                throw new UnsupportedOperationException();
            });
        };
    }

    @Test(dataProvider='plusSeconds_fromZero')
    public void test_plusSeconds_fromZero(int seconds, int hour, int min, int sec) {
        var base = LocalTime.MIDNIGHT;
        var t = base.plusSeconds(seconds);

        assertEquals(hour, t.getHour());
        assertEquals(min, t.getMinute());
        assertEquals(sec, t.getSecond());
    }

    @Test
    it('test_plusSeconds_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.plusSeconds(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_plusSeconds_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.plusSeconds(24 * 60 * 60);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_plusSeconds_toMidnight_equal', () => {
        var t = LocalTime.of(23, 59, 59).plusSeconds(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_plusSeconds_toMidday_equal', () => {
        var t = LocalTime.of(11, 59, 59).plusSeconds(1);
        assertEquals(t, LocalTime.NOON);
    });

    describe('plusNanos()', () => {

	});

    @Test
    public void test_plusNanos_halfABillion() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        var sec = 0;
        var nanos = 0;
        for (var i = 0; i < 3700 * 1000000000L; i+= 500000000) {
            t = t.plusNanos(500000000);
            nanos += 500000000;
            if (nanos == 1000000000) {
                sec++;
                nanos = 0;
            }
            if (sec == 60) {
                min++;
                sec = 0;
            }
            if (min == 60) {
                hour++;
                min = 0;
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
            assertEquals(t.getSecond(), sec);
            assertEquals(t.getNano(), nanos);
        }
    }

    @DataProvider(name='plusNanos_fromZero')
    Iterator<Object[]> plusNanos_fromZero() {
        return new Iterator<Object[]>() {
            var delta = 7500000000L;
            var i = -3660 * 1000000000L;
            var hour = 22;
            var min = 59;
            var sec = 0;
            var nanos = 0;

            public boolean hasNext() {
                return i <= 3660 * 1000000000L;
            }

            public Object[] next() {
                final Object[] ret = new Object[] {i, hour, min, sec, (int)nanos};
                i += delta;
                nanos += delta;

                if (nanos >= 1000000000L) {
                    sec += nanos / 1000000000L;
                    nanos %= 1000000000L;

                    if (sec >= 60) {
                        min++;
                        sec %= 60;

                        if (min == 60) {
                            hour++;
                            min = 0;

                            if (hour == 24) {
                                hour = 0;
                            }
                        }
                    }
                }

                return ret;
            }

            it('remove', () => {
                throw new UnsupportedOperationException();
            });
        };
    }

    @Test(dataProvider='plusNanos_fromZero')
    public void test_plusNanos_fromZero(long nanoseconds, int hour, int min, int sec, int nanos) {
        var base = LocalTime.MIDNIGHT;
        var t = base.plusNanos(nanoseconds);

        assertEquals(hour, t.getHour());
        assertEquals(min, t.getMinute());
        assertEquals(sec, t.getSecond());
        assertEquals(nanos, t.getNano());
    }

    @Test
    it('test_plusNanos_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.plusNanos(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_plusNanos_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.plusNanos(24 * 60 * 60 * 1000000000L);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_plusNanos_toMidnight_equal', () => {
        var t = LocalTime.of(23, 59, 59, 999999999).plusNanos(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_plusNanos_toMidday_equal', () => {
        var t = LocalTime.of(11, 59, 59, 999999999).plusNanos(1);
        assertEquals(t, LocalTime.NOON);
    });

    describe('minus(MinusAdjuster)', () => {

	});

    @Test
    it('test_minus_Adjuster', () => {
        var p = Duration.ofSeconds(62, 3);
        var t = TEST_12_30_40_987654321.minus(p);
        assertEquals(t, LocalTime.of(12, 29, 38, 987654318));
    });

    @Test
    it('test_minus_Adjuster_positiveHours', () => {
        var period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
        var t = TEST_12_30_40_987654321.minus(period);
        assertEquals(t, LocalTime.of(5, 30, 40, 987654321));
    });

    @Test
    it('test_minus_Adjuster_negativeMinutes', () => {
        var period = MockSimplePeriod.of(-25, ChronoUnit.MINUTES);
        var t = TEST_12_30_40_987654321.minus(period);
        assertEquals(t, LocalTime.of(12, 55, 40, 987654321));
    });

    @Test
    it('test_minus_Adjuster_big1', () => {
        var p = Duration.ofNanos(Long.MAX_VALUE);
        var t = TEST_12_30_40_987654321.minus(p);
        assertEquals(t, TEST_12_30_40_987654321.minusNanos(Long.MAX_VALUE));
    });

    @Test
    it('test_minus_Adjuster_zero', () => {
        var p = Period.ZERO;
        var t = TEST_12_30_40_987654321.minus(p);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_minus_Adjuster_wrap', () => {
        var p = Duration.ofHours(1);
        var t = LocalTime.of(0, 30).minus(p);
        assertEquals(t, LocalTime.of(23, 30));
    });

    it('test_minus_Adjuster_dateNotAllowed', () => {
	expect(() => {
        var period = MockSimplePeriod.of(7, ChronoUnit.MONTHS);
        TEST_12_30_40_987654321.minus(period);
    
	}).to.throw(DateTimeException);
});

    it('test_minus_Adjuster_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.minus((TemporalAmount) null);
    
	}).to.throw(NullPointerException);
});

    //-----------------------------------------------------------------------
    // minus(long,PeriodUnit)
    //-----------------------------------------------------------------------
    @Test
    it('test_minus_longPeriodUnit_positiveHours', () => {
        var t = TEST_12_30_40_987654321.minus(7, ChronoUnit.HOURS);
        assertEquals(t, LocalTime.of(5, 30, 40, 987654321));
    });

    @Test
    it('test_minus_longPeriodUnit_negativeMinutes', () => {
        var t = TEST_12_30_40_987654321.minus(-25, ChronoUnit.MINUTES);
        assertEquals(t, LocalTime.of(12, 55, 40, 987654321));
    });

    @Test
    it('test_minus_longPeriodUnit_zero', () => {
        var t = TEST_12_30_40_987654321.minus(0, ChronoUnit.MINUTES);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_minus_long_unit_invalidUnit() {
        for (TemporalUnit unit : INVALID_UNITS) {
            try {
                TEST_12_30_40_987654321.minus(1, unit);
                fail('Unit should not be allowed ' + unit);
            } catch (DateTimeException ex) {
                // expected
            }
        }
    }

    it('test_minus_long_multiples', () => {
	expect(() => {
        TEST_12_30_40_987654321.minus(0, DAYS);
    
	}).to.throw(UnsupportedTemporalTypeException);
});

    it('test_minus_longPeriodUnit_null', () => {
	expect(() => {
        TEST_12_30_40_987654321.minus(1, (TemporalUnit) null);
    
	}).to.throw(NullPointerException);
});

    describe('minusHours()', () => {

	});

    @Test
    public void test_minusHours_one() {
        var t = LocalTime.MIDNIGHT;
        for (var i = 0; i < 50; i++) {
            t = t.minusHours(1);
            assertEquals(t.getHour(), (((-i + 23) % 24) + 24) % 24, String.valueOf(i));
        }
    }

    @Test
    public void test_minusHours_fromZero() {
        var base = LocalTime.MIDNIGHT;
        for (var i = -50; i < 50; i++) {
            var t = base.minusHours(i);
            assertEquals(t.getHour(), ((-i % 24) + 24) % 24);
        }
    }

    @Test
    public void test_minusHours_fromOne() {
        var base = LocalTime.of(1, 0);
        for (var i = -50; i < 50; i++) {
            var t = base.minusHours(i);
            assertEquals(t.getHour(), (1 + (-i % 24) + 24) % 24);
        }
    }

    @Test
    it('test_minusHours_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.minusHours(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    it('test_minusHours_toMidnight_equal', () => {
        var t = LocalTime.of(1, 0).minusHours(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_minusHours_toMidday_equal', () => {
        var t = LocalTime.of(13, 0).minusHours(1);
        assertEquals(t, LocalTime.NOON);
    });

    @Test
    public void test_minusHours_big() {
        var t = LocalTime.of(2, 30).minusHours(Long.MAX_VALUE);
        var hours = (int) (Long.MAX_VALUE % 24L);
        assertEquals(t, LocalTime.of(2, 30).minusHours(hours));
    }

    describe('minusMinutes()', () => {

	});

    @Test
    public void test_minusMinutes_one() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        for (var i = 0; i < 70; i++) {
            t = t.minusMinutes(1);
            min--;
            if (min == -1) {
                hour--;
                min = 59;

                if (hour == -1) {
                    hour = 23;
                }
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
        }
    }

    @Test
    public void test_minusMinutes_fromZero() {
        var base = LocalTime.MIDNIGHT;
        var hour = 22;
        var min = 49;
        for (var i = 70; i > -70; i--) {
            var t = base.minusMinutes(i);
            min++;

            if (min == 60) {
                hour++;
                min = 0;

                if (hour == 24) {
                    hour = 0;
                }
            }

            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
        }
    }

    @Test
    it('test_minusMinutes_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.minusMinutes(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_minusMinutes_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.minusMinutes(24 * 60);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_minusMinutes_toMidnight_equal', () => {
        var t = LocalTime.of(0, 1).minusMinutes(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_minusMinutes_toMidday_equals', () => {
        var t = LocalTime.of(12, 1).minusMinutes(1);
        assertEquals(t, LocalTime.NOON);
    });

    @Test
    public void test_minusMinutes_big() {
        var t = LocalTime.of(2, 30).minusMinutes(Long.MAX_VALUE);
        var mins = (int) (Long.MAX_VALUE % (24L * 60L));
        assertEquals(t, LocalTime.of(2, 30).minusMinutes(mins));
    }

    describe('minusSeconds()', () => {

	});

    @Test
    public void test_minusSeconds_one() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        var sec = 0;
        for (var i = 0; i < 3700; i++) {
            t = t.minusSeconds(1);
            sec--;
            if (sec == -1) {
                min--;
                sec = 59;

                if (min == -1) {
                    hour--;
                    min = 59;

                    if (hour == -1) {
                        hour = 23;
                    }
                }
            }
            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
            assertEquals(t.getSecond(), sec);
        }
    }

    @DataProvider(name='minusSeconds_fromZero')
    Iterator<Object[]> minusSeconds_fromZero() {
        return new Iterator<Object[]>() {
            var delta = 30;
            var i = 3660;
            var hour = 22;
            var min = 59;
            var sec = 0;

            public boolean hasNext() {
                return i >= -3660;
            }

            public Object[] next() {
                final Object[] ret = new Object[] {i, hour, min, sec};
                i -= delta;
                sec += delta;

                if (sec >= 60) {
                    min++;
                    sec -= 60;

                    if (min == 60) {
                        hour++;
                        min = 0;

                        if (hour == 24) {
                            hour = 0;
                        }
                    }
                }

                return ret;
            }

            it('remove', () => {
                throw new UnsupportedOperationException();
            });
        };
    }

    @Test(dataProvider='minusSeconds_fromZero')
    public void test_minusSeconds_fromZero(int seconds, int hour, int min, int sec) {
        var base = LocalTime.MIDNIGHT;
        var t = base.minusSeconds(seconds);

        assertEquals(t.getHour(), hour);
        assertEquals(t.getMinute(), min);
        assertEquals(t.getSecond(), sec);
    }

    @Test
    it('test_minusSeconds_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.minusSeconds(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_minusSeconds_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.minusSeconds(24 * 60 * 60);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_minusSeconds_toMidnight_equal', () => {
        var t = LocalTime.of(0, 0, 1).minusSeconds(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_minusSeconds_toMidday_equal', () => {
        var t = LocalTime.of(12, 0, 1).minusSeconds(1);
        assertEquals(t, LocalTime.NOON);
    });

    @Test
    public void test_minusSeconds_big() {
        var t = LocalTime.of(2, 30).minusSeconds(Long.MAX_VALUE);
        var secs = (int) (Long.MAX_VALUE % (24L * 60L * 60L));
        assertEquals(t, LocalTime.of(2, 30).minusSeconds(secs));
    }

    describe('minusNanos()', () => {

	});

    @Test
    public void test_minusNanos_halfABillion() {
        var t = LocalTime.MIDNIGHT;
        var hour = 0;
        var min = 0;
        var sec = 0;
        var nanos = 0;
        for (var i = 0; i < 3700 * 1000000000L; i+= 500000000) {
            t = t.minusNanos(500000000);
            nanos -= 500000000;

            if (nanos < 0) {
                sec--;
                nanos += 1000000000;

                if (sec == -1) {
                    min--;
                    sec += 60;

                    if (min == -1) {
                        hour--;
                        min += 60;

                        if (hour == -1) {
                            hour += 24;
                        }
                    }
                }
            }

            assertEquals(t.getHour(), hour);
            assertEquals(t.getMinute(), min);
            assertEquals(t.getSecond(), sec);
            assertEquals(t.getNano(), nanos);
        }
    }

    @DataProvider(name='minusNanos_fromZero')
    Iterator<Object[]> minusNanos_fromZero() {
        return new Iterator<Object[]>() {
            var delta = 7500000000L;
            var i = 3660 * 1000000000L;
            var hour = 22;
            var min = 59;
            var sec = 0;
            var nanos = 0;

            public boolean hasNext() {
                return i >= -3660 * 1000000000L;
            }

            public Object[] next() {
                final Object[] ret = new Object[] {i, hour, min, sec, (int)nanos};
                i -= delta;
                nanos += delta;

                if (nanos >= 1000000000L) {
                    sec += nanos / 1000000000L;
                    nanos %= 1000000000L;

                    if (sec >= 60) {
                        min++;
                        sec %= 60;

                        if (min == 60) {
                            hour++;
                            min = 0;

                            if (hour == 24) {
                                hour = 0;
                            }
                        }
                    }
                }

                return ret;
            }

            it('remove', () => {
                throw new UnsupportedOperationException();
            });
        };
    }

    @Test(dataProvider='minusNanos_fromZero')
    public void test_minusNanos_fromZero(long nanoseconds, int hour, int min, int sec, int nanos) {
        var base = LocalTime.MIDNIGHT;
        var t = base.minusNanos(nanoseconds);

        assertEquals(hour, t.getHour());
        assertEquals(min, t.getMinute());
        assertEquals(sec, t.getSecond());
        assertEquals(nanos, t.getNano());
    }

    @Test
    it('test_minusNanos_noChange_equal', () => {
        var t = TEST_12_30_40_987654321.minusNanos(0);
        assertEquals(t, TEST_12_30_40_987654321);
    });

    @Test
    public void test_minusNanos_noChange_oneDay_equal() {
        var t = TEST_12_30_40_987654321.minusNanos(24 * 60 * 60 * 1000000000L);
        assertEquals(t, TEST_12_30_40_987654321);
    }

    @Test
    it('test_minusNanos_toMidnight_equal', () => {
        var t = LocalTime.of(0, 0, 0, 1).minusNanos(1);
        assertEquals(t, LocalTime.MIDNIGHT);
    });

    @Test
    it('test_minusNanos_toMidday_equal', () => {
        var t = LocalTime.of(12, 0, 0, 1).minusNanos(1);
        assertEquals(t, LocalTime.NOON);
    });

    describe('until()', () => {

	});

    @DataProvider(name='until')
    Object[][] provider_until() {
        return new Object[][]{
                {'00:00', '00:00', NANOS, 0},
                {'00:00', '00:00', MICROS, 0},
                {'00:00', '00:00', MILLIS, 0},
                {'00:00', '00:00', SECONDS, 0},
                {'00:00', '00:00', MINUTES, 0},
                {'00:00', '00:00', HOURS, 0},
                {'00:00', '00:00', HALF_DAYS, 0},
                
                {'00:00', '00:00:01', NANOS, 1000000000},
                {'00:00', '00:00:01', MICROS, 1000000},
                {'00:00', '00:00:01', MILLIS, 1000},
                {'00:00', '00:00:01', SECONDS, 1},
                {'00:00', '00:00:01', MINUTES, 0},
                {'00:00', '00:00:01', HOURS, 0},
                {'00:00', '00:00:01', HALF_DAYS, 0},
                
                {'00:00', '00:01', NANOS, 60000000000L},
                {'00:00', '00:01', MICROS, 60000000},
                {'00:00', '00:01', MILLIS, 60000},
                {'00:00', '00:01', SECONDS, 60},
                {'00:00', '00:01', MINUTES, 1},
                {'00:00', '00:01', HOURS, 0},
                {'00:00', '00:01', HALF_DAYS, 0},
        };
    }

    @Test(dataProvider = 'until')
    public void test_until(String startStr, String endStr, TemporalUnit unit, long expected) {
        var start = LocalTime.parse(startStr);
        var end = LocalTime.parse(endStr);
        assertEquals(start.until(end, unit), expected);
        assertEquals(end.until(start, unit), -expected);
    }

    describe('atDate()', () => {

	});

    @Test
    it('test_atDate', () => {
        var t = LocalTime.of(11, 30);
        assertEquals(t.atDate(LocalDate.of(2012, 6, 30)), LocalDateTime.of(2012, 6, 30, 11, 30));
    });

    it('test_atDate_nullDate', () => {
	expect(() => {
        TEST_12_30_40_987654321.atDate((LocalDate) null);
    
	}).to.throw(NullPointerException);
});

    describe('toSecondOfDay()', () => {

	});

    @Test
    public void test_toSecondOfDay() {
        var t = LocalTime.of(0, 0);
        for (var i = 0; i < 24 * 60 * 60; i++) {
            assertEquals(t.toSecondOfDay(), i);
            t = t.plusSeconds(1);
        }
    }

    @Test
    public void test_toSecondOfDay_fromNanoOfDay_symmetry() {
        var t = LocalTime.of(0, 0);
        for (var i = 0; i < 24 * 60 * 60; i++) {
            assertEquals(LocalTime.ofSecondOfDay(t.toSecondOfDay()), t);
            t = t.plusSeconds(1);
        }
    }

    describe('toNanoOfDay()', () => {

	});

    @Test
    public void test_toNanoOfDay() {
        var t = LocalTime.of(0, 0);
        for (var i = 0; i < 1000000; i++) {
            assertEquals(t.toNanoOfDay(), i);
            t = t.plusNanos(1);
        }
        t = LocalTime.of(0, 0);
        for (var i = 1; i <= 1000000; i++) {
            t = t.minusNanos(1);
            assertEquals(t.toNanoOfDay(), 24 * 60 * 60 * 1000000000L - i);
        }
    }

    @Test
    public void test_toNanoOfDay_fromNanoOfDay_symmetry() {
        var t = LocalTime.of(0, 0);
        for (var i = 0; i < 1000000; i++) {
            assertEquals(LocalTime.ofNanoOfDay(t.toNanoOfDay()), t);
            t = t.plusNanos(1);
        }
        t = LocalTime.of(0, 0);
        for (var i = 1; i <= 1000000; i++) {
            t = t.minusNanos(1);
            assertEquals(LocalTime.ofNanoOfDay(t.toNanoOfDay()), t);
        }
    }

    describe('compareTo()', () => {

	});

    @Test
    it('test_comparisons', () => {
        doTest_comparisons_LocalTime(
            LocalTime.MIDNIGHT,
            LocalTime.of(0, 0, 0, 999999999),
            LocalTime.of(0, 0, 59, 0),
            LocalTime.of(0, 0, 59, 999999999),
            LocalTime.of(0, 59, 0, 0),
            LocalTime.of(0, 59, 0, 999999999),
            LocalTime.of(0, 59, 59, 0),
            LocalTime.of(0, 59, 59, 999999999),
            LocalTime.NOON,
            LocalTime.of(12, 0, 0, 999999999),
            LocalTime.of(12, 0, 59, 0),
            LocalTime.of(12, 0, 59, 999999999),
            LocalTime.of(12, 59, 0, 0),
            LocalTime.of(12, 59, 0, 999999999),
            LocalTime.of(12, 59, 59, 0),
            LocalTime.of(12, 59, 59, 999999999),
            LocalTime.of(23, 0, 0, 0),
            LocalTime.of(23, 0, 0, 999999999),
            LocalTime.of(23, 0, 59, 0),
            LocalTime.of(23, 0, 59, 999999999),
            LocalTime.of(23, 59, 0, 0),
            LocalTime.of(23, 59, 0, 999999999),
            LocalTime.of(23, 59, 59, 0),
            LocalTime.of(23, 59, 59, 999999999)
        );
    });

    void doTest_comparisons_LocalTime(LocalTime... localTimes) {
        for (var i = 0; i < localTimes.length; i++) {
            var a = localTimes[i];
            for (var j = 0; j < localTimes.length; j++) {
                var b = localTimes[j];
                if (i < j) {
                    assertTrue(a.compareTo(b) < 0, a + ' <=> ' + b);
                    assertEquals(a.isBefore(b), true, a + ' <=> ' + b);
                    assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                    assertEquals(a.equals(b), false, a + ' <=> ' + b);
                } else if (i > j) {
                    assertTrue(a.compareTo(b) > 0, a + ' <=> ' + b);
                    assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                    assertEquals(a.isAfter(b), true, a + ' <=> ' + b);
                    assertEquals(a.equals(b), false, a + ' <=> ' + b);
                } else {
                    assertEquals(a.compareTo(b), 0, a + ' <=> ' + b);
                    assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                    assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                    assertEquals(a.equals(b), true, a + ' <=> ' + b);
                }
            }
        }
    }

    it('test_compareTo_ObjectNull', () => {
	expect(() => {
        TEST_12_30_40_987654321.compareTo(null);
    
	}).to.throw(NullPointerException);
});

    it('test_isBefore_ObjectNull', () => {
	expect(() => {
        TEST_12_30_40_987654321.isBefore(null);
    
	}).to.throw(NullPointerException);
});

    it('test_isAfter_ObjectNull', () => {
	expect(() => {
        TEST_12_30_40_987654321.isAfter(null);
    
	}).to.throw(NullPointerException);
});

    @Test(expectedExceptions=ClassCastException.class)
    @SuppressWarnings({'unchecked', 'rawtypes'})
    it('compareToNonLocalTime', () => {
       var c = TEST_12_30_40_987654321;
       c.compareTo(new Object());
    });

    describe('equals()', () => {

	});

    @Test(dataProvider='sampleTimes')
    public void test_equals_true(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s, n);
        assertEquals(a.equals(b), true);
    }
    @Test(dataProvider='sampleTimes')
    public void test_equals_false_hour_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h + 1, m, s, n);
        assertEquals(a.equals(b), false);
    }
    @Test(dataProvider='sampleTimes')
    public void test_equals_false_minute_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m + 1, s, n);
        assertEquals(a.equals(b), false);
    }
    @Test(dataProvider='sampleTimes')
    public void test_equals_false_second_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s + 1, n);
        assertEquals(a.equals(b), false);
    }
    @Test(dataProvider='sampleTimes')
    public void test_equals_false_nano_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s, n + 1);
        assertEquals(a.equals(b), false);
    }

    @Test
    it('test_equals_itself_true', () => {
        assertEquals(TEST_12_30_40_987654321.equals(TEST_12_30_40_987654321), true);
    });

    @Test
    public void test_equals_string_false() {
        assertEquals(TEST_12_30_40_987654321.equals('2007-07-15'), false);
    }

    @Test
    it('test_equals_null_false', () => {
        assertEquals(TEST_12_30_40_987654321.equals(null), false);
    });

    describe('hashCode()', () => {

	});

    @Test(dataProvider='sampleTimes')
    public void test_hashCode_same(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s, n);
        assertEquals(a.hashCode(), b.hashCode());
    }

    @Test(dataProvider='sampleTimes')
    public void test_hashCode_hour_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h + 1, m, s, n);
        assertEquals(a.hashCode() == b.hashCode(), false);
    }

    @Test(dataProvider='sampleTimes')
    public void test_hashCode_minute_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m + 1, s, n);
        assertEquals(a.hashCode() == b.hashCode(), false);
    }

    @Test(dataProvider='sampleTimes')
    public void test_hashCode_second_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s + 1, n);
        assertEquals(a.hashCode() == b.hashCode(), false);
    }

    @Test(dataProvider='sampleTimes')
    public void test_hashCode_nano_differs(int h, int m, int s, int n) {
        var a = LocalTime.of(h, m, s, n);
        var b = LocalTime.of(h, m, s, n + 1);
        assertEquals(a.hashCode() == b.hashCode(), false);
    }

    describe('toString()', () => {

	});

    @DataProvider(name='sampleToString')
    Object[][] provider_sampleToString() {
        return new Object[][] {
            {0, 0, 0, 0, '00:00'},
            {1, 0, 0, 0, '01:00'},
            {23, 0, 0, 0, '23:00'},
            {0, 1, 0, 0, '00:01'},
            {12, 30, 0, 0, '12:30'},
            {23, 59, 0, 0, '23:59'},
            {0, 0, 1, 0, '00:00:01'},
            {0, 0, 59, 0, '00:00:59'},
            {0, 0, 0, 100000000, '00:00:00.100'},
            {0, 0, 0, 10000000, '00:00:00.010'},
            {0, 0, 0, 1000000, '00:00:00.001'},
            {0, 0, 0, 100000, '00:00:00.000100'},
            {0, 0, 0, 10000, '00:00:00.000010'},
            {0, 0, 0, 1000, '00:00:00.000001'},
            {0, 0, 0, 100, '00:00:00.000000100'},
            {0, 0, 0, 10, '00:00:00.000000010'},
            {0, 0, 0, 1, '00:00:00.000000001'},
            {0, 0, 0, 999999999, '00:00:00.999999999'},
            {0, 0, 0, 99999999, '00:00:00.099999999'},
            {0, 0, 0, 9999999, '00:00:00.009999999'},
            {0, 0, 0, 999999, '00:00:00.000999999'},
            {0, 0, 0, 99999, '00:00:00.000099999'},
            {0, 0, 0, 9999, '00:00:00.000009999'},
            {0, 0, 0, 999, '00:00:00.000000999'},
            {0, 0, 0, 99, '00:00:00.000000099'},
            {0, 0, 0, 9, '00:00:00.000000009'},
        };
    }

    @Test(dataProvider='sampleToString')
    public void test_toString(int h, int m, int s, int n, String expected) {
        var t = LocalTime.of(h, m, s, n);
        var str = t.toString();
        assertEquals(str, expected);
    }

    describe('format(DateTimeFormatter)', () => {

	});

    @Test
    public void test_format_formatter() {
        var f = DateTimeFormatter.ofPattern('H m s');
        var t = LocalTime.of(11, 30, 45).format(f);
        assertEquals(t, '11 30 45');
    }

    it('test_format_formatter_null', () => {
	expect(() => {
        LocalTime.of(11, 30, 45).format(null);
    
	}).to.throw(NullPointerException);
});

}
*/