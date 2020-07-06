/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import {ChronoField} from '../src/temporal/ChronoField';
import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {createTemporalQuery} from '../src/temporal/TemporalQuery';
import {DateTimeFormatter} from '../src/format/DateTimeFormatter';
import {Instant} from '../src/Instant';
import {IsoFields} from '../src/temporal/IsoFields';
import {LocalDateTime} from '../src/LocalDateTime';
import {LocalTime} from '../src/LocalTime';
import {OffsetDateTime} from '../src/OffsetDateTime';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {Temporal} from '../src/temporal/Temporal';
import {ZonedDateTime} from '../src/ZonedDateTime';
import {ZoneId} from '../src/ZoneId';
import {ZoneOffset} from '../src/ZoneOffset';
import {
    DateTimeException,
    IllegalArgumentException,
    NullPointerException
} from '../src/errors';

import './_init';

/* these are not covered by the threetenbp ported tests */
describe('js-joda OffsetDateTime', () => {
    const odtNow = OffsetDateTime.now();

    describe('from', () => {
        it('should return value even if temporal fails on LocalDatetime.from', () => {
            class CustomTemporal extends Temporal {
                getLong() {
                    return 123;
                }
                get() {
                    return 456;
                }
                query() {
                    return ZoneOffset.UTC;
                }
            }
            const odt = OffsetDateTime.from(new CustomTemporal());
            expect(odt).to.be.an.instanceOf(OffsetDateTime);
        });

        it('should throw if failed to obtain OffsetDateTime TemporarlAccessor', () => {
            expect(() => {
                OffsetDateTime.from('fail !!');
            }).to.throw(DateTimeException);
        });
    });

    describe('now', () => {
        it('should optimize if ZoneId', () => {
            const odt = OffsetDateTime.now(ZoneId.systemDefault());
            expect(odt).to.be.an.instanceOf(OffsetDateTime);
        });

        it('should fail if illegal', () => {
            expect(() => {
                OffsetDateTime.now('zone id !!');
            }).to.throw(IllegalArgumentException);
        });
    });

    describe('adjustInto', () => {
        it('should work', () => {
            const odt = OffsetDateTime.parse('2025-01-03T03:04:06.7+08:00');
            expect(odt.adjustInto(odtNow)).to.eql(odt);
        });
    });

    describe('until', () => {
        const odt = OffsetDateTime.parse('2025-01-03T03:04:06.7+08:00');
        const other = OffsetDateTime.parse('2030-01-03T03:04:06.7+08:00');

        it('should optimize if ChronoUnit', () => {
            expect(odt.until(other, ChronoUnit.YEARS)).to.equal(5);
        });

        it('should support non-ChronoUnit', () => {
            class CustomUnit extends TemporalUnit {
                between() {
                    return 42;
                }
            }
            expect(odt.until(other, new CustomUnit())).to.equal(42);
        });
    });

    describe('query', () => {
        it('should work on custom query', () => {
            const customQuery = createTemporalQuery('custom', (temporal) => {
                return LocalTime.from(temporal);
            });
            expect(odtNow.query(customQuery)).to.be.an.instanceOf(LocalTime);
        });
    });

    describe('get', () => {
        it('should fail-fast on INSTANT_SECONDS', () => {
            expect(() => {
                odtNow.get(ChronoField.INSTANT_SECONDS);
            }).to.throw(DateTimeException);
        });

        it('should support non-ChronoField', () => {
            expect(typeof odtNow.get(IsoFields.DAY_OF_QUARTER)).to.equal('number');
        });
    });

    describe('getLong', () => {
        it('should support non-ChronoField', () => {
            expect(typeof odtNow.getLong(IsoFields.DAY_OF_QUARTER)).to.equal('number');
        });
    });

    describe('monthValue', () => {
        it('should work', () => {
            const odt = OffsetDateTime.parse('2025-01-03T03:04:06.7+08:00');
            expect(odt.monthValue()).to.equal(1);
        });
    });

    describe('toZonedDateTime', () => {
        it('should work', () => {
            const odt = OffsetDateTime.parse('2025-01-03T03:04:06.7+08:00');
            expect(odt.toZonedDateTime()).to.eql(ZonedDateTime.of(
                LocalDateTime.parse('2025-01-03T03:04:06.7'),
                ZoneId.of('+8')
            ));
        });
    });

    describe('isSupported', () => {
        it('should support date-based ChronoField', () => {
            expect(odtNow.isSupported(ChronoField.DAY_OF_YEAR)).to.equal(true);
        });

        it('should support time-based ChronoField', () => {
            expect(odtNow.isSupported(ChronoField.HOUR_OF_DAY)).to.equal(true);
        });

        it('should support date-based ChronoUnit', () => {
            expect(odtNow.isSupported(ChronoUnit.DAYS)).to.equal(true);
        });

        it('should support time-based ChronoUnit', () => {
            expect(odtNow.isSupported(ChronoUnit.HOURS)).to.equal(true);
        });
    });

    describe('range', () => {
        it('should optimize if ChronoField', () => {
            expect(odtNow.range(ChronoField.INSTANT_SECONDS).isIntValue()).to.equal(true);
            expect(odtNow.range(ChronoField.OFFSET_SECONDS).maximum()).to.equal(64800);
            expect(odtNow.range(ChronoField.HOUR_OF_AMPM).maximum()).to.equal(11);
        });
    });

    describe('with', () => {
        describe('withAdjuster', () => {
            it('should support Instant', () => {
                expect(odtNow.with(Instant.now())).to.be.an.instanceOf(OffsetDateTime);
            });
        });

        describe('withFieldValue', () => {
            it('should support custom field', () => {
                class CustomField extends TemporalField {
                    adjustInto(temporal, newValue) {
                        return temporal.withYear(newValue);
                    }
                }
                expect(odtNow.with(new CustomField(), 10).year()).to.equal(10);
            });
        });
    });

    describe('withOffsetSameLocal', () => {
        it('should work', () => {
            const odt = OffsetDateTime.parse('2025-01-03T03:04:06.7+08:00');
            expect(odt.withOffsetSameLocal(ZoneOffset.UTC).toLocalTime()).to.eql(odt.toLocalTime());
        });
    });

    describe('plusAmountUnit', () => {
        it('should support custom unit', () => {
            class CustomUnit extends TemporalUnit {
                addTo(dateTime, periodToAdd) {
                    return dateTime.plusDays(periodToAdd);
                }
            }
            const odt = OffsetDateTime.parse('2025-01-02T03:04:06.7+08:00');
            expect(odt.plusAmountUnit(1, new CustomUnit()).dayOfMonth()).to.equal(3);
        });
    });

    describe('isAfter/isBefore/isEqual', () => {
        it('should throw if null', () => {
            expect(() => {
                odtNow.isAfter(null);
            }).to.throw(NullPointerException);
            expect(() => {
                odtNow.isBefore(null);
            }).to.throw(NullPointerException);
            expect(() => {
                odtNow.isEqual(null);
            }).to.throw(NullPointerException);
        });

        it('exact same instance', () => {
            expect(odtNow.isAfter(odtNow)).to.equal(false);
            expect(odtNow.isBefore(odtNow)).to.equal(false);
            expect(odtNow.isEqual(odtNow)).to.equal(true);
        });

        it('different epoch second', () => {
            const a = OffsetDateTime.parse('2020-01-01T01:01:01.001Z');
            const b = OffsetDateTime.parse('9020-01-01T01:01:01.001Z');
            expect(a.isAfter(b)).to.equal(false);
            expect(b.isAfter(a)).to.equal(true);

            expect(a.isBefore(b)).to.equal(true);
            expect(b.isBefore(a)).to.equal(false);

            expect(a.isEqual(b)).to.equal(false);
            expect(b.isEqual(a)).to.equal(false);
        });

        it('same epoch second, but diffrent nano', () => {
            const a = OffsetDateTime.parse('2020-01-01T01:01:01.001Z');
            const b = OffsetDateTime.parse('2020-01-01T01:01:01.999Z');
            expect(a.isAfter(b)).to.equal(false);
            expect(b.isAfter(a)).to.equal(true);

            expect(a.isBefore(b)).to.equal(true);
            expect(b.isBefore(a)).to.equal(false);

            expect(a.isEqual(b)).to.equal(false);
            expect(b.isEqual(a)).to.equal(false);
        });
    });

    describe('equals', () => {
        it('should return on incompatible type', () => {
            expect(odtNow.equals('string')).to.equal(false);
        });
    });

    describe('format', () => {
        it('should throw if null', () => {
            expect(() => {
                odtNow.format(null);
            }).to.throw(NullPointerException);
        });

        it('should work', () => {
            const odt = OffsetDateTime.parse('2020-01-02T03:04:05.000000006+07:00');
            const f = DateTimeFormatter.ofPattern('y M d H m s n X');
            expect(odt.format(f)).to.equal('2020 1 2 3 4 5 6 +07');
        });
    });
});
