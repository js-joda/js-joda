(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _LocalDate = __webpack_require__(1);
	
	exports['default'] = {
	    LocalDate: _LocalDate.LocalDate
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _Math = __webpack_require__(2);
	
	var _chronoIsoChronology = __webpack_require__(3);
	
	/**
	 * The number of days in a 400 year cycle.
	 */
	var DAYS_PER_CYCLE = 146097;
	
	/**
	 * The number of days from year zero to year 1970.
	 * There are five 400 year cycles from year zero to 2000.
	 * There are 7 leap years from 1970 to 2000.
	 */
	var DAYS_0000_TO_1970 = DAYS_PER_CYCLE * 5 - (30 * 365 + 7);
	
	/**
	 * A date without a time-zone in the ISO-8601 calendar system,
	 * such as 2007-12-03.
	 *
	 * LocalDate is an immutable date-time object that represents a date,
	 * often viewed as year-month-day. Other date fields, such as day-of-year,
	 * day-of-week and week-of-year, can also be accessed.
	 * For example, the value "2nd October 2007" can be stored in a LocalDate.
	 *
	 * This class does not store or represent a time or time-zone.
	 * Instead, it is a description of the date, as used for birthdays.
	 * It cannot represent an instant on the time-line without additional information
	 * such as an offset or time-zone.
	 */
	
	var LocalDate = (function () {
	
	    /**
	     *
	     * @param {number} year
	     * @param {number} month
	     * @param {number} dayOfMonth
	     */
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        this._year = year;
	        this._month = month;
	        this._day = dayOfMonth;
	    }
	
	    /**
	     *
	     * @return {number} gets the year
	     */
	
	    _createClass(LocalDate, [{
	        key: 'year',
	        value: function year() {
	            return this._year;
	        }
	
	        /**
	         *
	         * @return {number} gets the month
	         */
	    }, {
	        key: 'month',
	        value: function month() {
	            return this._month;
	        }
	
	        /**
	         *
	         * @return {number} gets the day of month
	         */
	    }, {
	        key: 'day',
	        value: function day() {
	            return this._day;
	        }
	
	        /**
	         * Converts this date to the Epoch Day.
	         *
	         * The Epoch Day count is a simple incrementing count of days where day 0 is 1970-01-01 (ISO).
	         * This definition is the same for all chronologies, enabling conversion.
	         *
	         * @return {number} the Epoch Day equivalent to this date
	         */
	    }, {
	        key: 'toEpochDay',
	        value: function toEpochDay() {
	            var y = this.year();
	            var m = this.month();
	            var total = 0;
	            total += 365 * y;
	            if (y >= 0) {
	                total += (0, _Math.intDiv)(y + 3, 4) - (0, _Math.intDiv)(y + 99, 100) + (0, _Math.intDiv)(y + 399, 400);
	            } else {
	                total -= (0, _Math.intDiv)(y, -4) - (0, _Math.intDiv)(y, -100) + (0, _Math.intDiv)(y, -400);
	            }
	            total += (0, _Math.intDiv)(367 * m - 362, 12);
	            total += this.day() - 1;
	            if (m > 2) {
	                total--;
	                if (!_chronoIsoChronology.IsoChronology.isLeapYear(y)) {
	                    total--;
	                }
	            }
	            return total - DAYS_0000_TO_1970;
	        }
	
	        /**
	         * Outputs this date as a String, such as 2007-12-03.
	         * The output will be in the ISO-8601 format uuuu-MM-dd.
	         *
	         * @return {string} a string representation of this date, not null
	         */
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var dayString, monthString, yearString;
	
	            var yearValue = this.year();
	            var monthValue = this.month();
	            var dayValue = this.day();
	
	            var absYear = Math.abs(yearValue);
	
	            if (absYear < 1000) {
	                if (yearValue < 0) {
	                    yearString = "-" + ("" + (yearValue - 10000)).slice(-4);
	                } else {
	                    yearString = ("" + (yearValue + 10000)).slice(-4);
	                }
	            } else {
	                if (yearValue > 9999) {
	                    yearString = "+" + yearValue;
	                } else {
	                    yearString = "" + yearValue;
	                }
	            }
	
	            if (monthValue < 10) {
	                monthString = "-0" + monthValue;
	            } else {
	                monthString = "-" + monthValue;
	            }
	
	            if (dayValue < 10) {
	                dayString = "-0" + dayValue;
	            } else {
	                dayString = "-" + dayValue;
	            }
	
	            return yearString + monthString + dayString;
	        }
	    }]);
	
	    return LocalDate;
	})();

	exports.LocalDate = LocalDate;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.intDiv = intDiv;
	
	function intDiv(a, b) {
	    return ~ ~(a / b);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IsoChronology = (function () {
	    function IsoChronology() {
	        _classCallCheck(this, IsoChronology);
	    }
	
	    _createClass(IsoChronology, null, [{
	        key: "isLeapYear",
	
	        /**
	         * Checks if the year is a leap year, according to the ISO proleptic
	         * calendar system rules.
	         *
	         * This method applies the current rules for leap years across the whole time-line.
	         * In general, a year is a leap year if it is divisible by four without
	         * remainder. However, years divisible by 100, are not leap years, with
	         * the exception of years divisible by 400 which are.
	         *
	         * For example, 1904 is a leap year it is divisible by 4.
	         * 1900 was not a leap year as it is divisible by 100, however 2000 was a
	         * leap year as it is divisible by 400.
	         *
	         * The calculation is proleptic - applying the same rules into the far future and far past.
	         * This is historically inaccurate, but is correct for the ISO-8601 standard.
	         *
	         * @param {number} prolepticYear - the ISO proleptic year to check
	         * @return true if the year is leap, false otherwise
	         */
	        value: function isLeapYear(prolepticYear) {
	            return (prolepticYear & 3) === 0 && (prolepticYear % 100 !== 0 || prolepticYear % 400 === 0);
	        }
	    }]);
	
	    return IsoChronology;
	})();

	exports.IsoChronology = IsoChronology;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=joda.js.map