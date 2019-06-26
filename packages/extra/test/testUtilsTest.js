import { expect, AssertionError } from 'chai';

import {
    assertEquals, assertSame, assertTrue, assertFalse, assertNotNull, fail,
} from './testUtils';

describe('testUtils', () => {
    class A {
        constructor(val) {
            this.val = val;
        }
        equals(other) {
            if (this === other) {
                return true;
            }
            if (other instanceof A) {
                return this.val === other.val;
            }
            return false;
        }
    }

    it('assertEquals', () => {
        testAssertEquals(null, 1, false);
        testAssertEquals(1, null, false);
        testAssertEquals(undefined, 1, false);
        testAssertEquals(1, undefined, false);
        testAssertEquals(null, undefined, true);
        testAssertEquals(undefined, null, true);
        testAssertEquals(1, 1, true);
        testAssertEquals(1, 2, false);
        testAssertEquals([1, 2], [1, 2], true);
        testAssertEquals([1, 2], [2, 1], false);
        testAssertEquals(new A(1), new A(1), true);
        testAssertEquals(new A(1), new A(2), false);
        testAssertEquals(new A(1), null, false);
        testAssertEquals(null, new A(1), false);
        testAssertEquals({}, new A(1), false);

        const a = new A('a');
        testAssertEquals(a, a, true);
    });

    function testAssertEquals(expected, actual, isEqual) {
        if (isEqual) {
            assertEquals(expected, actual);
        } else {
            expect(() => {
                assertEquals(expected, actual);
            }).to.throw(AssertionError);
        }
    }

    it('assertSame', () => {
        testAssertSame({}, {}, false);
        testAssertSame([], [], false);
        testAssertSame(new A(1), new A(1), false);
        testAssertSame(new A(1), new A(2), false);
        testAssertSame(1, 1, true);

        let a = new A('a');
        testAssertSame(a, a, true);

        a = [];
        testAssertSame(a, a, true);
    });

    function testAssertSame(expected, actual, isEqual) {
        if (isEqual) {
            assertSame(expected, actual);
        } else {
            expect(() => {
                assertSame(expected, actual);
            }).to.throw(AssertionError);
        }
    }

    it('assertNotNull', () => {
        assertNotNull(false);
        assertNotNull({});
        expect(() => { assertNotNull(); }).to.throw(AssertionError);
        expect(() => { assertNotNull(null); }).to.throw(AssertionError);
    });

    it('assertTrue', () => {
        assertTrue(true);
        expect(() => { assertTrue(false); }).to.throw(AssertionError);
    });

    it('assertFalse', () => {
        assertFalse(false);
        expect(() => { assertFalse(true); }).to.throw(AssertionError);
    });

    it('fail', () => {
        expect(() => { fail('fail message'); }).to.throw(AssertionError);
    });
});
