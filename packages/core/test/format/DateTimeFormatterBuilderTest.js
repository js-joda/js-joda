/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';
import { dataProviderTest } from '../testUtils';

import '../_init';

import { ChronoField } from '../../src/temporal/ChronoField';
import { DateTimeFormatterBuilder } from '../../src/format/DateTimeFormatterBuilder';
import { IllegalArgumentException } from '../../src/errors';
import { LocalDate } from '../../src/LocalDate';
import { LocalDateTime } from '../../src/LocalDateTime';
import { ResolverStyle } from '../../src/format/ResolverStyle';
import { SignStyle } from '../../src/format/SignStyle';

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */

// only tests the not implemented patterns, should be removed, once they are implemented (locale needed)
describe('js-joda DateTimeFormatterBuilderTest', () => {
    let builder = null;
    
    beforeEach(() => {
        builder = new DateTimeFormatterBuilder();
    });
    
    describe('appendPattern notImplemented', () => {
        const dataNotImplemented = [
            ['G'],
            ['GG'],
            ['GGG'],
            ['GGGG'],
            ['GGGGG'],
            
            ['O'],
            ['OOOO'],
            
            ['Y'],
            ['YY'],
            ['YYY'],
            ['YYYY'],
            ['YYYYY'],
            
            ['ZZZZ'],
            
            ['MMM'],
            ['MMMM'],
            ['MMMMM'],
            
            ['w'],
            ['ww'],
            ['www'],
            
            ['c'],
            ['cc'],
            ['ccc'],
            ['cccc'],
            ['ccccc'],
            
            ['e'],
            ['ee'],
            ['eee'],
            ['eeee'],
            ['eeeee'],
            
            ['E'],
            ['EE'],
            ['EEE'],
            ['EEEE'],
            ['EEEEE'],
            
            ['a'],
            
            ['qqq'],
            ['qqqq'],
            ['qqqqq'],
            
            ['z'],
            ['zz'],
            ['zzz'],
            ['zzzz']
        ];
        
        it('test_appendPattern_not implemented', () => {
            dataProviderTest(dataNotImplemented, (input) => {
                // since we are forEach ing data, the beforeEach doesn't catch... so we create the builder here
                builder = new DateTimeFormatterBuilder();
                expect(() => {
                    builder.appendPattern(input);
                }).to.throw(IllegalArgumentException);
            });
        });
        
    });

    describe('parseDefaulting', () => {
        const fields = ['NANO_OF_SECOND', 'NANO_OF_DAY', 'MICRO_OF_DAY', 'MILLI_OF_DAY', 'SECOND_OF_MINUTE', 'SECOND_OF_DAY', 'MINUTE_OF_HOUR', 'MINUTE_OF_DAY', 'HOUR_OF_AMPM', 'HOUR_OF_DAY', 'CLOCK_HOUR_OF_DAY', 'AMPM_OF_DAY', 'DAY_OF_WEEK', 'ALIGNED_DAY_OF_WEEK_IN_MONTH', 'ALIGNED_DAY_OF_WEEK_IN_YEAR', 'DAY_OF_MONTH', 'DAY_OF_YEAR', 'EPOCH_DAY', 'ALIGNED_WEEK_OF_MONTH', 'ALIGNED_WEEK_OF_YEAR', 'MONTH_OF_YEAR', 'YEAR', 'ERA', 'INSTANT_SECONDS', 'OFFSET_SECONDS'];

        for (const field of fields) {
            const c = ChronoField[field];
            const cMax = c.range().maximum();

            it (`test_parseDefaulting(${field})`, () => { expect(builder.parseDefaulting(c, cMax).toFormatter().parse('').get(c)).to.equal(cMax); });
        }

        it('test_parseDefaulting optional DayOfMonth', () => {
            const d = 15;
            const f = builder
                .appendPattern('yyyy-MM[-dd]')
                .parseDefaulting(ChronoField.DAY_OF_MONTH, d)
                .toFormatter();

            expect(() => { LocalDate.parse('1970-01', f); }).not.to.throw();
            expect(LocalDate.parse('1970-01', f).dayOfMonth()).to.equal(d);
            expect(LocalDate.parse('1970-01-01', f).dayOfMonth()).to.equal(1);
        });

        it('test_parseDefaulting optional Time', () => {
            const h = 12;
            const m = 12;
            const s = 12;
            const f = builder
                .appendPattern("yyyy-MM-dd['T'HH:mm:ss]")
                .parseDefaulting(ChronoField.HOUR_OF_DAY, h)
                .parseDefaulting(ChronoField.MINUTE_OF_HOUR, m)
                .parseDefaulting(ChronoField.SECOND_OF_MINUTE, s)
                .toFormatter();

            expect(() => { LocalDate.parse('1970-01-01', f); }).not.to.throw();

            let ldt = LocalDateTime.parse('1970-01-01', f);
            expect(ldt.hour()).to.equal(h);
            expect(ldt.minute()).to.equal(m);
            expect(ldt.second()).to.equal(s);

            ldt = LocalDateTime.parse('1970-01-01T01:01:01', f);
            expect(ldt.hour()).to.equal(1);
            expect(ldt.minute()).to.equal(1);
            expect(ldt.second()).to.equal(1);
        });

        it('test_parseDefaulting optional Era (ResolverStyle.STRICT)', () => {
            // Testsing strict parsing of custom pattern, which may not contain 'uuuu'.
            const f = builder
                .appendPattern('dd.MM.yyyy')
                .parseDefaulting(ChronoField.ERA, 1) // default Era, because of ResolverStyle.STRICT
                .toFormatter(ResolverStyle.STRICT); // ResolverStyle.STRICT expects an Era for 'yyyy' otherwise i would fail to validate.

            expect(() => { LocalDate.parse('01.01.1970', f); }).not.to.throw();
        });
    });

    describe('adjacent value parsing with a fixed width fraction', () => {
        it('should parse a date-time with milliseconds and no separators', () => {
            const f = builder.appendPattern('uuuuMMddHHmmssSSS').toFormatter();
            expect(LocalDateTime.parse('20150101120000123', f).toString()).to.equal('2015-01-01T12:00:00.123');
            expect(LocalDateTime.parse('20240229235959999', f).toString()).to.equal('2024-02-29T23:59:59.999');
        });

        it('should parse a year-of-era pattern with milliseconds', () => {
            const f = builder.appendPattern('yyyyMMddHHmmssSSS').toFormatter();
            expect(LocalDateTime.parse('20150101120000123', f).toString()).to.equal('2015-01-01T12:00:00.123');
        });

        it('should parse a fraction of one, six and nine digits', () => {
            expect(LocalDateTime.parse('202401021304055', new DateTimeFormatterBuilder().appendPattern('uuuuMMddHHmmssS').toFormatter()).toString())
                .to.equal('2024-01-02T13:04:05.500');
            expect(LocalDateTime.parse('20240102130405123456', new DateTimeFormatterBuilder().appendPattern('uuuuMMddHHmmssSSSSSS').toFormatter()).toString())
                .to.equal('2024-01-02T13:04:05.123456');
            expect(LocalDateTime.parse('20240102130405123456789', new DateTimeFormatterBuilder().appendPattern('uuuuMMddHHmmssSSSSSSSSS').toFormatter()).toString())
                .to.equal('2024-01-02T13:04:05.123456789');
        });

        it('should parse a year with more than four digits', () => {
            const f = builder.appendPattern('uuuuMMddHHmmssSSS').toFormatter();
            expect(LocalDateTime.parse('+120240102130405678', f).toString()).to.equal('+12024-01-02T13:04:05.678');
        });

        it('should parse a fraction followed by other fixed width values', () => {
            const f = builder.appendPattern('uuuuSSSMMdd').toFormatter(ResolverStyle.LENIENT);
            const parsed = f.parse('2024123' + '0315');
            expect(parsed.getLong(ChronoField.YEAR)).to.equal(2024);
            expect(parsed.getLong(ChronoField.NANO_OF_SECOND)).to.equal(123000000);
            expect(parsed.getLong(ChronoField.MONTH_OF_YEAR)).to.equal(3);
            expect(parsed.getLong(ChronoField.DAY_OF_MONTH)).to.equal(15);
        });

        it('should keep the fraction width when parsing leniently', () => {
            const f = builder.parseLenient().appendPattern('uuuuMMddHHmmssSSS').toFormatter();
            expect(LocalDateTime.parse('20150101120000123', f).toString()).to.equal('2015-01-01T12:00:00.123');
            const g = new DateTimeFormatterBuilder().parseLenient().appendPattern('uuuuSSSMMdd').toFormatter(ResolverStyle.LENIENT);
            const parsed = g.parse('2024123' + '0315');
            expect(parsed.getLong(ChronoField.NANO_OF_SECOND)).to.equal(123000000);
            expect(parsed.getLong(ChronoField.MONTH_OF_YEAR)).to.equal(3);
            expect(parsed.getLong(ChronoField.DAY_OF_MONTH)).to.equal(15);
        });

        it('should round trip a formatted value', () => {
            const f = builder.appendPattern('uuuuMMddHHmmssSSS').toFormatter();
            const ldt = LocalDateTime.of(1999, 12, 31, 23, 59, 58, 7000000);
            expect(f.format(ldt)).to.equal('19991231235958007');
            expect(LocalDateTime.parse(f.format(ldt), f).equals(ldt)).to.equal(true);
        });

        it('should still reject a fraction with too few digits', () => {
            const f = builder.appendPattern('uuuuMMddHHmmssSSS').toFormatter();
            expect(() => LocalDateTime.parse('2015010112000012', f)).to.throw();
        });

        it('should not reserve digits for a fraction with a decimal point', () => {
            const f = builder.appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
                .appendFraction(ChronoField.NANO_OF_SECOND, 3, 3, true).toFormatter();
            const parsed = f.parse('2024.123');
            expect(parsed.getLong(ChronoField.YEAR)).to.equal(2024);
            expect(parsed.getLong(ChronoField.NANO_OF_SECOND)).to.equal(123000000);
        });
    });
})
;
