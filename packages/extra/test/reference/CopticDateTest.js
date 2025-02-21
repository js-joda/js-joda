import '../_init';

import { assertEquals } from '../testUtils';

import { CopticDate } from '../../src/CopticDate';

describe('CopticDate', () => {
    describe('Basic Creation', () => {
        test('should create a valid date', () => {
            const date = CopticDate.of(1739, 5, 15);
            assertEquals(date.prolepticYear).toBe(1739);
            assertEquals(date.month).toBe(5);
            assertEquals(date.day).toBe(15);
        });

        test('should throw error for invalid month', () => {
            assertEquals(() => CopticDate.of(1739, 14, 15)).toThrow('Month must be between 1 and 13');
            assertEquals(() => CopticDate.of(1739, 0, 15)).toThrow('Month must be between 1 and 13');
        });

        test('should throw error for invalid day', () => {
            assertEquals(() => CopticDate.of(1739, 5, 31)).toThrow('Day must be between 1 and 30');
            assertEquals(() => CopticDate.of(1739, 5, 0)).toThrow('Day must be between 1 and 30');
        });
    });

    describe('Nasie Month (13th month) Validation', () => {
        test('should handle leap year Nasie month correctly', () => {
            // 1739 is a leap year (1739 % 4 = 3)
            const date = CopticDate.of(1739, 13, 6);
            assertEquals(date.month).toBe(13);
            assertEquals(date.day).toBe(6);
        });

        test('should throw error for invalid Nasie day in non-leap year', () => {
            // 1738 is not a leap year
            assertEquals(() => CopticDate.of(1738, 13, 6))
                .toThrow("Invalid date 'Nasie 6', valid range from 1 to 5 in a non-leap year");
        });
    });

    describe('Leap Year Calculation', () => {
        test('should correctly identify leap years', () => {
            assertEquals(CopticDate.isLeapYear(1739)).toBe(true);  // 1739 % 4 = 3
            assertEquals(CopticDate.isLeapYear(1738)).toBe(false); // 1738 % 4 = 2
            assertEquals(CopticDate.isLeapYear(1737)).toBe(false); // 1737 % 4 = 1
            assertEquals(CopticDate.isLeapYear(1736)).toBe(false); // 1736 % 4 = 0
        });
    });

    describe('Date Manipulation', () => {
        test('should add days correctly', () => {
            const date = CopticDate.of(1739, 5, 15);
            const newDate = date.plusDays(30);
            assertEquals(newDate.month).toBe(6);
            assertEquals(newDate.day).toBe(15);
        });

        test('should add months correctly', () => {
            const date = CopticDate.of(1739, 5, 15);
            const newDate = date.plusMonths(2);
            assertEquals(newDate.month).toBe(7);
            assertEquals(newDate.prolepticYear).toBe(1739);
        });

        test('should handle month overflow correctly', () => {
            const date = CopticDate.of(1739, 12, 15);
            const newDate = date.plusMonths(2);
            assertEquals(newDate.month).toBe(1);
            assertEquals(newDate.prolepticYear).toBe(1740);
        });

        test('should add years correctly', () => {
            const date = CopticDate.of(1739, 5, 15);
            const newDate = date.plusYears(1);
            assertEquals(newDate.prolepticYear).toBe(1740);
            assertEquals(newDate.month).toBe(5);
            assertEquals(newDate.day).toBe(15);
        });
    });

    describe('Date Conversion', () => {
        test('should convert to string correctly', () => {
            const date = CopticDate.of(1739, 5, 15);
            assertEquals(date.toString()).toBe('1739-05-15');
        });

        test('should handle single digit values in toString', () => {
            const date = CopticDate.of(1739, 5, 5);
            assertEquals(date.toString()).toBe('1739-05-05');
        });

        test('should convert between epoch days correctly', () => {
            const originalDate = CopticDate.of(1739, 5, 15);
            const epochDay = originalDate.toEpochDay();
            const reconstructedDate = CopticDate.ofEpochDay(epochDay);
            
            assertEquals(reconstructedDate.prolepticYear).toBe(originalDate.prolepticYear);
            assertEquals(reconstructedDate.month).toBe(originalDate.month);
            assertEquals(reconstructedDate.day).toBe(originalDate.day);
        });
    });

    describe('Current Date', () => {
        test('should create current date without throwing', () => {
            assertEquals(() => CopticDate.now()).not.toThrow();
        });

        test('now() should return CopticDate instance', () => {
            const now = CopticDate.now();
            assertEquals(now).toBeInstanceOf(CopticDate);
        });
    });
});