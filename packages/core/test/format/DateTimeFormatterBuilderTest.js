/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';
import {dataProviderTest} from '../testUtils';

import '../_init';

import {DateTimeFormatterBuilder} from '../../src/format/DateTimeFormatterBuilder';
import {IllegalArgumentException} from '../../src/errors';

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
})
;