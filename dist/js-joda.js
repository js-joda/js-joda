(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsjoda"] = factory();
	else
		root["jsjoda"] = factory();
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
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(3);
	
	var _errors = __webpack_require__(4);
	
	var _chronoIsoChronology = __webpack_require__(6);
	
	var _temporalChronoField = __webpack_require__(7);
	
	var _Clock = __webpack_require__(9);
	
	var _Month = __webpack_require__(13);
	
	var _LocalTime = __webpack_require__(12);
	
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
	     * @param {Month, number} month
	     * @param {number} dayOfMonth
	     */
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        if (month instanceof _Month.Month) {
	            month = month.value();
	        }
	        LocalDate.validate(year, month, dayOfMonth);
	        this._year = year;
	        this._month = month;
	        this._day = dayOfMonth;
	    }
	
	    /**
	     * Obtains an instance of {@code LocalDate} from a year, month and day.
	     * <p>
	     * This returns a {@code LocalDate} with the specified year, month and day-of-month.
	     * The day must be valid for the year and month, otherwise an exception will be thrown.
	     *
	     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
	     * @param {Month, number} month  the month-of-year to represent, from 1 (January) to 12 (December)
	     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
	     * @return LocalDate the local date, not null
	     * @throws DateTimeException if the value of any field is out of range,
	     *  or if the day-of-month is invalid for the month-year
	     */
	
	    _createClass(LocalDate, [{
	        key: 'year',
	
	        /**
	         *
	         * @return {number} gets the year
	         */
	        value: function year() {
	            return this._year;
	        }
	
	        /**
	         *
	         * @return {number} gets the month
	         */
	    }, {
	        key: 'monthValue',
	        value: function monthValue() {
	            return this._month;
	        }
	    }, {
	        key: 'month',
	        value: function month() {
	            return _Month.Month.of(this._month);
	        }
	
	        /**
	         *
	         * @return {number} gets the day of month
	         */
	        // TODO: should be dayOfMonth() ?
	    }, {
	        key: 'day',
	        value: function day() {
	            return this._day;
	        }
	
	        /**
	         * Returns a copy of this LocalDate with the specified number of days added.
	         * 
	         * This method adds the specified amount to the days field incrementing the
	         * month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * 
	         * For example, 2008-12-31 plus one day would result in 2009-01-01.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} daysToAdd - the days to add, may be negative
	         * @return {LocalDate} a LocalDate based on this date with the days added, not null
	         * @throws AssertionError if the result exceeds the supported date range
	         */
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            if (daysToAdd === 0) {
	                return this;
	            }
	            var mjDay = this.toEpochDay() + daysToAdd;
	            return LocalDate.ofEpochDay(mjDay);
	        }
	    }, {
	        key: 'minusDays',
	
	        /*
	         * Returns a copy of this LocalDate with the specified number of days subtracted.
	         * 
	         * This method subtracts the specified amount from the days field decrementing the
	         * month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * 
	         * For example, 2009-01-01 minus one day would result in 2008-12-31.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} daysToSubtract - the days to subtract, may be negative
	         * @return {LocalDate} a LocalDate based on this date with the days subtracted, not null
	         * @throws AssertionError if the result exceeds the supported date range
	         */
	        value: function minusDays(daysToSubtract) {
	            return this.plusDays(daysToSubtract * -1);
	        }
	    }, {
	        key: 'toEpochDay',
	
	        /**
	         * Converts this date to the Epoch Day.
	         *
	         * The Epoch Day count is a simple incrementing count of days where day 0 is 1970-01-01 (ISO).
	         * This definition is the same for all chronologies, enabling conversion.
	         *
	         * @return {number} the Epoch Day equivalent to this date
	         */
	        value: function toEpochDay() {
	            var y = this.year();
	            var m = this.monthValue();
	            var total = 0;
	            total += 365 * y;
	            if (y >= 0) {
	                total += _MathUtil.MathUtil.div(y + 3, 4) - _MathUtil.MathUtil.div(y + 99, 100) + _MathUtil.MathUtil.div(y + 399, 400);
	            } else {
	                total -= _MathUtil.MathUtil.div(y, -4) - _MathUtil.MathUtil.div(y, -100) + _MathUtil.MathUtil.div(y, -400);
	            }
	            total += _MathUtil.MathUtil.div(367 * m - 362, 12);
	            total += this.day() - 1;
	            if (m > 2) {
	                total--;
	                if (!_chronoIsoChronology.IsoChronology.isLeapYear(y)) {
	                    total--;
	                }
	            }
	            return total - DAYS_0000_TO_1970;
	        }
	    }, {
	        key: 'equals',
	
	        /**
	         * Checks if this date is equal to another date.
	         *
	         * Compares this LocalDate with another ensuring that the date is the same.
	         *
	         * Only objects of type LocalDate are compared, other types return false.
	         *
	         * @param otherDate  the object to check, null returns false
	         * @return true if this is equal to the other date
	         */
	        value: function equals(otherDate) {
	            if (this === otherDate) {
	                return true;
	            }
	            if (otherDate instanceof LocalDate) {
	                return this._compareTo(otherDate) === 0;
	            }
	            return false;
	        }
	    }, {
	        key: '_compareTo',
	        value: function _compareTo(otherDate) {
	            var cmp = this.year() - otherDate.year();
	            if (cmp == 0) {
	                cmp = this.monthValue() - otherDate.monthValue();
	                if (cmp == 0) {
	                    cmp = this.day() - otherDate.day();
	                }
	            }
	            return cmp;
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
	            var monthValue = this.monthValue();
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
	
	        /**
	         * Obtains an instance of LocalDate from the epoch day count.
	         *
	         * This returns a LocalDate with the specified epoch-day.
	         * The {@link ChronoField#EPOCH_DAY EPOCH_DAY} is a simple incrementing count
	         * of days where day 0 is 1970-01-01. Negative numbers represent earlier days.
	         *
	         * @param {number} epochDay - the Epoch Day to convert, based on the epoch 1970-01-01
	         * @return {LocalDate} the local date, not null
	         * @throws AssertionError if the epoch days exceeds the supported date range
	         */
	
	    }], [{
	        key: 'of',
	        value: function of(year, month, dayOfMonth) {
	            return new LocalDate(year, month, dayOfMonth);
	        }
	    }, {
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            var epochSec = now.epochSecond() + offset.totalSeconds();
	            var epochDay = _MathUtil.MathUtil.floorDiv(epochSec, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            return LocalDate.ofEpochDay(epochDay);
	        }
	    }, {
	        key: 'ofEpochDay',
	        value: function ofEpochDay(epochDay) {
	            var adjust, adjustCycles, dom, doyEst, marchDoy0, marchMonth0, month, year, yearEst, zeroDay;
	            zeroDay = epochDay + DAYS_0000_TO_1970;
	            zeroDay -= 60;
	            adjust = 0;
	            if (zeroDay < 0) {
	                adjustCycles = _MathUtil.MathUtil.div(zeroDay + 1, DAYS_PER_CYCLE) - 1;
	                adjust = adjustCycles * 400;
	                zeroDay += -adjustCycles * DAYS_PER_CYCLE;
	            }
	            yearEst = _MathUtil.MathUtil.div(400 * zeroDay + 591, DAYS_PER_CYCLE);
	            doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.div(yearEst, 4) - _MathUtil.MathUtil.div(yearEst, 100) + _MathUtil.MathUtil.div(yearEst, 400));
	            if (doyEst < 0) {
	                yearEst--;
	                doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.div(yearEst, 4) - _MathUtil.MathUtil.div(yearEst, 100) + _MathUtil.MathUtil.div(yearEst, 400));
	            }
	            yearEst += adjust;
	            marchDoy0 = doyEst;
	            marchMonth0 = _MathUtil.MathUtil.div(marchDoy0 * 5 + 2, 153);
	            month = (marchMonth0 + 2) % 12 + 1;
	            dom = marchDoy0 - _MathUtil.MathUtil.div(marchMonth0 * 306 + 5, 10) + 1;
	            yearEst += _MathUtil.MathUtil.div(marchMonth0, 10);
	            year = yearEst;
	            return new LocalDate(year, month, dom);
	        }
	    }, {
	        key: 'validate',
	
	        /**
	         * @private
	         */
	        value: function validate(year, month, dayOfMonth) {
	            var dom;
	            _temporalChronoField.YEAR.checkValidValue(year);
	            _temporalChronoField.MONTH_OF_YEAR.checkValidValue(month);
	            _temporalChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
	            if (dayOfMonth > 28) {
	                dom = 31;
	                switch (month) {
	                    case 2:
	                        dom = _chronoIsoChronology.IsoChronology.isLeapYear(year) ? 29 : 28;
	                        break;
	                    case 4:
	                    case 6:
	                    case 9:
	                    case 11:
	                        dom = 30;
	                }
	                if (dayOfMonth > dom) {
	                    if (dayOfMonth === 29) {
	                        (0, _assert.assert)(false, "Invalid date 'February 29' as '" + year + "' is not a leap year", _errors.DateTimeException);
	                    } else {
	                        (0, _assert.assert)(false, "Invalid date '" + year + "' '" + month + "' '" + dayOfMonth + "'", _errors.DateTimeException);
	                    }
	                }
	            }
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
	exports.assert = assert;
	
	function assert(assertion, msg, error) {
	    if (!assertion) {
	        if (error) {
	            throw new error(msg);
	        } else {
	            throw new Error(msg);
	        }
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Math helper with static function for integer operations
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MathUtil = (function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    _createClass(MathUtil, null, [{
	        key: "div",
	        value: function div(a, b) {
	            return ~ ~(a / b);
	        }
	
	        // TODO test it
	    }, {
	        key: "floorDiv",
	        value: function floorDiv(x, y) {
	            var r = MathUtil.div(x, y);
	            // if the signs are different and modulo not zero, round down
	            if ((x ^ y) < 0 && r * y !== x) {
	                r--;
	            }
	            return r;
	        }
	
	        // TODO test it
	    }, {
	        key: "floorMod",
	        value: function floorMod(x, y) {
	            var r = x - MathUtil.floorDiv(x, y) * y;
	            return r;
	        }
	    }]);
	
	    return MathUtil;
	})();

	exports.MathUtil = MathUtil;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _es6Error = __webpack_require__(5);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	var DateTimeException = (function (_ExtendableError) {
	    _inherits(DateTimeException, _ExtendableError);
	
	    function DateTimeException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'DateTimeException' : arguments[0];
	
	        _classCallCheck(this, DateTimeException);
	
	        _get(Object.getPrototypeOf(DateTimeException.prototype), 'constructor', this).call(this, message);
	    }
	
	    return DateTimeException;
	})(_es6Error2['default']);

	exports.DateTimeException = DateTimeException;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ExtendableError = (function (_Error) {
	  _inherits(ExtendableError, _Error);
	
	  function ExtendableError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	    _classCallCheck(this, ExtendableError);
	
	    _get(Object.getPrototypeOf(ExtendableError.prototype), 'constructor', this).call(this, message);
	
	    // extending Error is weird and does not propagate `message`
	    Object.defineProperty(this, 'message', {
	      enumerable: false,
	      value: message
	    });
	
	    Object.defineProperty(this, 'name', {
	      enumerable: false,
	      value: this.constructor.name
	    });
	
	    if (Error.hasOwnProperty('captureStackTrace')) {
	      Error.captureStackTrace(this, this.constructor);
	      return;
	    }
	
	    Object.defineProperty(this, 'stack', {
	      enumerable: false,
	      value: new Error(message).stack
	    });
	  }
	
	  return ExtendableError;
	})(Error);
	
	exports['default'] = ExtendableError;
	module.exports = exports['default'];

/***/ },
/* 6 */
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _ValueRange = __webpack_require__(8);
	
	var ChronoField = (function () {
	    function ChronoField(name, baseUnit, rangeUnit, range, displayNameKey) {
	        _classCallCheck(this, ChronoField);
	
	        this.name = function () {
	            return name;
	        };
	        this.baseUnit = function () {
	            return baseUnit;
	        };
	        this.rangeUnit = function () {
	            return rangeUnit;
	        };
	        this.range = function () {
	            return range;
	        };
	        this.displayNameKey = function () {
	            return displayNameKey;
	        };
	    }
	
	    _createClass(ChronoField, [{
	        key: "checkValidValue",
	        value: function checkValidValue(value) {
	            return this.range().checkValidValue(value, this.name());
	        }
	    }]);
	
	    return ChronoField;
	})();
	
	var DAY_OF_MONTH = new ChronoField("DayOfMonth", null, null, _ValueRange.ValueRange.of(1, 28, 31), "day");
	
	exports.DAY_OF_MONTH = DAY_OF_MONTH;
	var MONTH_OF_YEAR = new ChronoField("MonthOfYear", null, null, _ValueRange.ValueRange.of(1, 12), "month");
	
	exports.MONTH_OF_YEAR = MONTH_OF_YEAR;
	var YEAR = new ChronoField("" + "Year", null, null, _ValueRange.ValueRange.of(-999999, 999999), "year");
	exports.YEAR = YEAR;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(4);
	
	/**
	 * The range of valid values for a date-time field.
	 * 
	 * All TemporalField instances have a valid range of values.
	 * For example, the ISO day-of-month runs from 1 to somewhere between 28 and 31.
	 * This class captures that valid range.
	 * 
	 * It is important to be aware of the limitations of this class.
	 * Only the minimum and maximum values are provided.
	 * It is possible for there to be invalid values within the outer range.
	 * For example, a weird field may have valid values of 1, 2, 4, 6, 7, thus
	 * have a range of '1 - 7', despite that fact that values 3 and 5 are invalid.
	 * 
	 * Instances of this class are not tied to a specific field.
	 *
	 */
	
	var ValueRange = (function () {
	    function ValueRange(minSmallest, minLargest, maxSmallest, maxLargest) {
	        _classCallCheck(this, ValueRange);
	
	        (0, _assert.assert)(!(minSmallest > minLargest), "Smallest minimum value '" + minSmallest + "' must be less than largest minimum value '" + minLargest + "'");
	        (0, _assert.assert)(!(maxSmallest > maxLargest), "Smallest maximum value '" + maxSmallest + "' must be less than largest maximum value '" + maxLargest + "'");
	        (0, _assert.assert)(!(minLargest > maxLargest), "Minimum value '" + minLargest + "' must be less than maximum value '" + maxLargest + "'");
	
	        this.minimum = function () {
	            return minSmallest;
	        };
	        this.largestMinimum = function () {
	            return minLargest;
	        };
	        this.maximum = function () {
	            return maxLargest;
	        };
	        this.smallestMaximum = function () {
	            return maxSmallest;
	        };
	    }
	
	    _createClass(ValueRange, [{
	        key: 'isValidValue',
	        value: function isValidValue(value) {
	            return this.minimum() <= value && value <= this.maximum();
	        }
	    }, {
	        key: 'checkValidValue',
	        value: function checkValidValue(value, field) {
	            var msg;
	            if (!this.isValidValue(value)) {
	                if (field != null) {
	                    msg = "Invalid value for " + field + " (valid values " + this.toString() + "): " + value;
	                } else {
	                    msg = "Invalid value (valid values " + this.toString() + "): " + value;
	                }
	                return (0, _assert.assert)(false, msg, _errors.DateTimeException);
	            }
	        }
	
	        /*
	         * Outputs this range as a String.
	         * 
	         * The format will be '{min}/{largestMin} - {smallestMax}/{max}',
	         * where the largestMin or smallestMax sections may be omitted, together
	         * with associated slash, if they are the same as the min or max.
	         *
	         * @return {string} a string representation of this range, not null
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? "/" + this.largestMinimum() : "");
	            str += " - ";
	            str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? "/" + this.maximum() : "");
	            return str;
	        }
	
	        /*
	         * called with 2 params: Obtains a fixed value range.
	         *
	         * This factory obtains a range where the minimum and maximum values are fixed.
	         * For example, the ISO month-of-year always runs from 1 to 12.
	         *
	         * @param min  the minimum value
	         * @param max  the maximum value
	         * @return the ValueRange for min, max, not null
	          * called with 3 params: Obtains a variable value range.
	         *
	         * This factory obtains a range where the minimum value is fixed and the maximum value may vary.
	         * For example, the ISO day-of-month always starts at 1, but ends between 28 and 31.
	         *
	         * @param min  the minimum value
	         * @param maxSmallest  the smallest maximum value
	         * @param maxLargest  the largest maximum value
	         * @return the ValueRange for min, smallest max, largest max, not null
	          * called with 4 params: Obtains a fully variable value range.
	         *
	         * This factory obtains a range where both the minimum and maximum value may vary.
	         *
	         * @param minSmallest  the smallest minimum value
	         * @param minLargest  the largest minimum value
	         * @param maxSmallest  the smallest maximum value
	         * @param maxLargest  the largest maximum value
	         * @return {ValueRange} the ValueRange for smallest min, largest min, smallest max, largest max, not null
	         */
	
	    }], [{
	        key: 'of',
	        value: function of() {
	            if (arguments.length === 2) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]);
	            } else if (arguments.length === 3) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]);
	            } else if (arguments.length === 4) {
	                return new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]);
	            } else {
	                return (0, _assert.assert)(false, "Invalid number of arguments " + arguments.length);
	            }
	        }
	    }]);
	
	    return ValueRange;
	})();

	exports.ValueRange = ValueRange;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _Instant = __webpack_require__(10);
	
	var _ZoneOffset = __webpack_require__(11);
	
	/**
	 * Clock implementation differs from the jdk.
	 *
	 * javascript only provides the UTC millis of epoch and the ZoneOffset in minutes of the system default time.
	 *
	 * the system default ZoneId is only guessable by the ZoneOffset, like moment-timezone does by returning one ZoneId
	 * with the same ZoneOffset.
	 *
	 * Therefore we are doing a shortcut here, by defining a SystemUTCClock and a SystemDefaultClock, the Clock itself
	 * is returning the ZoneOffset and not the ZoneRules as in the jdk. We should change it, when introducing the iana
	 * timezone database and implementing the timezone domains.
	 *
	 */
	
	var Clock = (function () {
	    function Clock() {
	        _classCallCheck(this, Clock);
	    }
	
	    _createClass(Clock, null, [{
	        key: 'systemUTC',
	        value: function systemUTC() {
	            return new SystemUTCClock();
	        }
	    }, {
	        key: 'systemDefaultZone',
	        value: function systemDefaultZone() {
	            return new SystemDefaultClock();
	        }
	    }]);
	
	    return Clock;
	})();
	
	exports.Clock = Clock;
	
	var SystemClock = (function (_Clock) {
	    _inherits(SystemClock, _Clock);
	
	    function SystemClock() {
	        _classCallCheck(this, SystemClock);
	
	        _get(Object.getPrototypeOf(SystemClock.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(SystemClock, [{
	        key: 'millis',
	        value: function millis() {
	            return new Date().getTime();
	        }
	    }, {
	        key: 'instant',
	        value: function instant() {
	            return _Instant.Instant.ofEpochMilli(this.millis());
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            return _ZoneOffset.ZoneOffset.ofTotalSeconds(0);
	        }
	    }]);
	
	    return SystemClock;
	})(Clock);
	
	var SystemUTCClock = (function (_SystemClock) {
	    _inherits(SystemUTCClock, _SystemClock);
	
	    function SystemUTCClock() {
	        _classCallCheck(this, SystemUTCClock);
	
	        _get(Object.getPrototypeOf(SystemUTCClock.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(SystemUTCClock, [{
	        key: 'toString',
	        value: function toString() {
	            return "SystemClock[UTC]";
	        }
	    }]);
	
	    return SystemUTCClock;
	})(SystemClock);
	
	exports.SystemUTCClock = SystemUTCClock;
	
	var SystemDefaultClock = (function (_SystemClock2) {
	    _inherits(SystemDefaultClock, _SystemClock2);
	
	    function SystemDefaultClock() {
	        _classCallCheck(this, SystemDefaultClock);
	
	        _get(Object.getPrototypeOf(SystemDefaultClock.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(SystemDefaultClock, [{
	        key: 'offset',
	        value: function offset(instant) {
	            var offsetInMinutes = new Date().getTimezoneOffset(instant.epochMilli());
	            return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutes);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return "SystemClock[default]";
	        }
	    }]);
	
	    return SystemDefaultClock;
	})(SystemClock);
	
	exports.SystemDefaultClock = SystemDefaultClock;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _errors = __webpack_require__(4);
	
	var _MathUtil = __webpack_require__(3);
	
	// TODO verify the arbitrary values for min/ max seconds, set to about 999_999 Years for now
	var MIN_SECONDS = -30818963289600;
	var MAX_SECONDS = 30697775193600;
	
	var Instant = (function () {
	    function Instant(seconds, nanoOfSecond) {
	        _classCallCheck(this, Instant);
	
	        Instant.validate(seconds, nanoOfSecond);
	        this._seconds = seconds;
	        this._nano = nanoOfSecond;
	    }
	
	    _createClass(Instant, [{
	        key: 'epochSecond',
	        value: function epochSecond() {
	            return this._seconds;
	        }
	    }, {
	        key: 'epochMilli',
	        value: function epochMilli() {
	            return this._seconds * 1000 + this._nano / 1000000;
	        }
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nano;
	        }
	    }, {
	        key: 'equals',
	        value: function equals(otherInstant) {
	            if (this === otherInstant) {
	                return true;
	            }
	            if (otherInstant instanceof Instant) {
	                return this.epochSecond() === otherInstant.epochSecond() && this.nano() === otherInstant.nano();
	            }
	            return false;
	        }
	    }], [{
	        key: 'ofEpochSecond',
	        value: function ofEpochSecond(epochSeconds) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            return Instant._create(epochSeconds, nanoAdjustment);
	        }
	    }, {
	        key: 'ofEpochMilli',
	        value: function ofEpochMilli(epochMilli) {
	            var secs = _MathUtil.MathUtil.floorDiv(epochMilli, 1000);
	            var mos = _MathUtil.MathUtil.floorMod(epochMilli, 1000);
	            return Instant._create(secs, mos * 1000000);
	        }
	    }, {
	        key: '_create',
	        value: function _create(seconds, nanoOfSecond) {
	            if (seconds === 0 && nanoOfSecond === 0) {
	                return Instant.EPOCH;
	            }
	            return new Instant(seconds, nanoOfSecond);
	        }
	    }, {
	        key: 'validate',
	        value: function validate(seconds, nanoOfSecond) {
	            if (seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
	                throw new _errors.DateTimeException("Instant exceeds minimum or maximum instant");
	            }
	        }
	    }]);
	
	    return Instant;
	})();
	
	exports.Instant = Instant;
	
	Instant.EPOCH = new Instant(0, 0);
	Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
	Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _errors = __webpack_require__(4);
	
	var _LocalTime = __webpack_require__(12);
	
	var MAX_SECONDS = 18 * _LocalTime.LocalTime.SECONDS_PER_HOUR;
	var SECONDS_CACHE = {};
	
	var ZoneOffset = (function () {
	    function ZoneOffset(totalSeconds) {
	        _classCallCheck(this, ZoneOffset);
	
	        ZoneOffset.validateTotalSeconds(totalSeconds);
	        this._totalSeconds = totalSeconds;
	    }
	
	    _createClass(ZoneOffset, [{
	        key: 'totalSeconds',
	        value: function totalSeconds() {
	            return this._totalSeconds;
	        }
	    }], [{
	        key: 'validateTotalSeconds',
	        value: function validateTotalSeconds(totalSeconds) {
	            if (Math.abs(totalSeconds) > MAX_SECONDS) {
	                throw new _errors.DateTimeException("Zone offset not in valid range: -18:00 to +18:00");
	            }
	        }
	    }, {
	        key: 'validate',
	        value: function validate(hours, minutes, seconds) {
	            if (hours < -18 || hours > 18) {
	                throw new _errors.DateTimeException("Zone offset hours not in valid range: value " + hours + " is not in the range -18 to 18");
	            }
	            if (hours > 0) {
	                if (minutes < 0 || seconds < 0) {
	                    throw new _errors.DateTimeException("Zone offset minutes and seconds must be positive because hours is positive");
	                }
	            } else if (hours < 0) {
	                if (minutes > 0 || seconds > 0) {
	                    throw new _errors.DateTimeException("Zone offset minutes and seconds must be negative because hours is negative");
	                }
	            } else if (minutes > 0 && seconds < 0 || minutes < 0 && seconds > 0) {
	                throw new _errors.DateTimeException("Zone offset minutes and seconds must have the same sign");
	            }
	            if (Math.abs(minutes) > 59) {
	                throw new _errors.DateTimeException("Zone offset minutes not in valid range: abs(value) " + Math.abs(minutes) + " is not in the range 0 to 59");
	            }
	            if (Math.abs(seconds) > 59) {
	                throw new _errors.DateTimeException("Zone offset seconds not in valid range: abs(value) " + Math.abs(seconds) + " is not in the range 0 to 59");
	            }
	            if (Math.abs(hours) == 18 && (Math.abs(minutes) > 0 || Math.abs(seconds) > 0)) {
	                throw new _errors.DateTimeException("Zone offset not in valid range: -18:00 to +18:00");
	            }
	        }
	    }, {
	        key: 'ofHours',
	        value: function ofHours(hours) {
	            return ZoneOffset.ofHoursMinutesSeconds(hours, 0, 0);
	        }
	    }, {
	        key: 'ofHoursMinutes',
	        value: function ofHoursMinutes(hours, minutes) {
	            return ZoneOffset.ofHoursMinutesSeconds(hours, minutes, 0);
	        }
	    }, {
	        key: 'ofHoursMinutesSeconds',
	        value: function ofHoursMinutesSeconds(hours, minutes, seconds) {
	            ZoneOffset.validate(hours, minutes, seconds);
	            var totalSeconds = hours * _LocalTime.LocalTime.SECONDS_PER_HOUR + minutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE + seconds;
	            return ZoneOffset.ofTotalSeconds(totalSeconds);
	        }
	    }, {
	        key: 'ofTotalMinutes',
	        value: function ofTotalMinutes(totalMinutes) {
	            var totalSeconds = totalMinutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE;
	            return ZoneOffset.ofTotalSeconds(totalSeconds);
	        }
	    }, {
	        key: 'ofTotalSeconds',
	        value: function ofTotalSeconds(totalSeconds) {
	            if (totalSeconds % (15 * _LocalTime.LocalTime.SECONDS_PER_MINUTE) === 0) {
	                var totalSecs = totalSeconds;
	                var result = SECONDS_CACHE[totalSecs];
	                if (result == null) {
	                    result = new ZoneOffset(totalSeconds);
	                    SECONDS_CACHE[totalSecs] = result;
	                }
	                return result;
	            } else {
	                return new ZoneOffset(totalSeconds);
	            }
	        }
	    }]);
	
	    return ZoneOffset;
	})();
	
	exports.ZoneOffset = ZoneOffset;
	
	ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalTime = function LocalTime() {
	  _classCallCheck(this, LocalTime);
	};
	
	exports.LocalTime = LocalTime;
	
	LocalTime.HOURS_PER_DAY = 60;
	LocalTime.MINUTES_PER_HOUR = 60;
	LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
	LocalTime.SECONDS_PER_MINUTE = 60;
	LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * A month-of-year, such as 'July'.
	 * <p>
	 * {@code Month} is representing the 12 months of the year -
	 * January, February, March, April, May, June, July, August, September, October,
	 * November and December.
	 * <p>
	 * In addition to the textual name, each month-of-year has an {@code int} value.
	 * The {@code int} value follows normal usage and the ISO-8601 standard,
	 * from 1 (January) to 12 (December). It is recommended that applications use the static values defined by this class
	 * rather than the {@code int} value to ensure code clarity.
	 * <p>
	 * This class represents a common concept that is found in many calendar systems.
	 * As such, this class may be used by any calendar system that has the month-of-year
	 * concept defined exactly equivalent to the ISO-8601 calendar system.
	 *
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Month = (function () {
	
	    /**
	     *
	     * @param {number} value
	     */
	
	    function Month(value) {
	        _classCallCheck(this, Month);
	
	        this._value = value;
	    }
	
	    /**
	     *
	     * @return {number} gets the value
	     */
	
	    _createClass(Month, [{
	        key: "value",
	        value: function value() {
	            return this._value;
	        }
	
	        /**
	         * Outputs the numerical representation of this month as a String, such as 12.
	         * The output will be in the ISO-8601 format MM.
	         *
	         * @return {string} a string representation of this month, not null
	         */
	    }, {
	        key: "toString",
	        value: function toString() {
	            var monthString;
	
	            var monthValue = this.value();
	
	            if (monthValue < 10) {
	                monthString = "0" + monthValue;
	            } else {
	                monthString = "" + monthValue;
	            }
	
	            return monthString;
	        }
	
	        /**
	         *
	         * @param {number} month
	         */
	    }], [{
	        key: "of",
	        value: function of(month) {
	            return MONTHS[month - 1];
	        }
	    }]);
	
	    return Month;
	})();
	
	exports.Month = Month;
	
	Month.JANUARY = new Month(1);
	Month.FEBRUARY = new Month(2);
	Month.MARCH = new Month(3);
	Month.APRIL = new Month(4);
	Month.MAY = new Month(5);
	Month.JUNE = new Month(6);
	Month.JULY = new Month(7);
	Month.AUGUST = new Month(8);
	Month.SEPTEMBER = new Month(9);
	Month.OCTOBER = new Month(10);
	Month.NOVEMBER = new Month(11);
	Month.DECEMBER = new Month(12);
	
	var MONTHS = [Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST, Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-joda.js.map