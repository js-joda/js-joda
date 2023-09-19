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
})
;
