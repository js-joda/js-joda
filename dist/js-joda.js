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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _LocalDate = __webpack_require__(1);
	
	Object.defineProperty(exports, 'LocalDate', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDate.LocalDate;
	  }
	});
	
	var _Instant = __webpack_require__(11);
	
	Object.defineProperty(exports, 'Instant', {
	  enumerable: true,
	  get: function get() {
	    return _Instant.Instant;
	  }
	});
	
	var _Clock = __webpack_require__(10);
	
	Object.defineProperty(exports, 'Clock', {
	  enumerable: true,
	  get: function get() {
	    return _Clock.Clock;
	  }
	});
	
	var _ZoneOffset = __webpack_require__(13);
	
	Object.defineProperty(exports, 'ZoneOffset', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneOffset.ZoneOffset;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LocalDate = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(3);
	
	var _errors = __webpack_require__(4);
	
	var _IsoChronology = __webpack_require__(6);
	
	var _ChronoField = __webpack_require__(7);
	
	var _Clock = __webpack_require__(10);
	
	var _Month = __webpack_require__(14);
	
	var _Year = __webpack_require__(9);
	
	var _LocalTime = __webpack_require__(12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var LocalDate = exports.LocalDate = (function () {
	
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
	
	    }, {
	        key: 'dayOfMonth',
	        value: function dayOfMonth() {
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
	                total += _MathUtil.MathUtil.intDiv(y + 3, 4) - _MathUtil.MathUtil.intDiv(y + 99, 100) + _MathUtil.MathUtil.intDiv(y + 399, 400);
	            } else {
	                total -= _MathUtil.MathUtil.intDiv(y, -4) - _MathUtil.MathUtil.intDiv(y, -100) + _MathUtil.MathUtil.intDiv(y, -400);
	            }
	            total += _MathUtil.MathUtil.intDiv(367 * m - 362, 12);
	            total += this.dayOfMonth() - 1;
	            if (m > 2) {
	                total--;
	                if (!_IsoChronology.IsoChronology.isLeapYear(y)) {
	                    total--;
	                }
	            }
	            return total - DAYS_0000_TO_1970;
	        }
	
	        /**
	         * Obtains the current date from the system clock in the default time-zone or
	         * if specified, the current date from the specified clock.
	         *
	         * This will query the specified clock to obtain the current date - today.
	         * Using this method allows the use of an alternate clock for testing.
	         *
	         * @param clock  the clock to use, if null, the system clock and default time-zone is used.
	         * @return the current date, not null
	         */
	
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
	            if (cmp === 0) {
	                cmp = this.monthValue() - otherDate.monthValue();
	                if (cmp === 0) {
	                    cmp = this.dayOfMonth() - otherDate.dayOfMonth();
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
	            var dayValue = this.dayOfMonth();
	
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
	
	    }, {
	        key: 'withDayOfMonth',
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the day-of-month altered.
	         * <p>
	         * If the resulting date is invalid, an exception is thrown.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} dayOfMonth  the day-of-month to set in the result, from 1 to 28-31
	         * @return {LocalDate} based on this date with the requested day, not null
	         * @throws DateTimeException if the day-of-month value is invalid,
	         *  or if the day-of-month is invalid for the month-year
	         */
	        value: function withDayOfMonth(dayOfMonth) {
	            if (this._day === dayOfMonth) {
	                return this;
	            }
	            return LocalDate.of(this._year, this._month, dayOfMonth);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the month-of-year altered.
	         * <p>
	         * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} month  the month-of-year to set in the result, from 1 (January) to 12 (December)
	         * @return {@code LocalDate} based on this date with the requested month, not null
	         * @throws DateTimeException if the month-of-year value is invalid
	         */
	
	    }, {
	        key: 'withMonth',
	        value: function withMonth(month) {
	            if (this._month === month) {
	                return this;
	            }
	            return LocalDate.of(this._year, month, this._day);
	        }
	
	        /**
	         * @private
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
	                adjustCycles = _MathUtil.MathUtil.intDiv(zeroDay + 1, DAYS_PER_CYCLE) - 1;
	                adjust = adjustCycles * 400;
	                zeroDay += -adjustCycles * DAYS_PER_CYCLE;
	            }
	            yearEst = _MathUtil.MathUtil.intDiv(400 * zeroDay + 591, DAYS_PER_CYCLE);
	            doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.intDiv(yearEst, 4) - _MathUtil.MathUtil.intDiv(yearEst, 100) + _MathUtil.MathUtil.intDiv(yearEst, 400));
	            if (doyEst < 0) {
	                yearEst--;
	                doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.intDiv(yearEst, 4) - _MathUtil.MathUtil.intDiv(yearEst, 100) + _MathUtil.MathUtil.intDiv(yearEst, 400));
	            }
	            yearEst += adjust;
	            marchDoy0 = doyEst;
	            marchMonth0 = _MathUtil.MathUtil.intDiv(marchDoy0 * 5 + 2, 153);
	            month = (marchMonth0 + 2) % 12 + 1;
	            dom = marchDoy0 - _MathUtil.MathUtil.intDiv(marchMonth0 * 306 + 5, 10) + 1;
	            yearEst += _MathUtil.MathUtil.intDiv(marchMonth0, 10);
	            year = yearEst;
	            return new LocalDate(year, month, dom);
	        }
	    }, {
	        key: 'ofYearDay',
	
	        /**
	         * Obtains an instance of {@code LocalDate} from a year and day-of-year.
	         * <p>
	         * This returns a {@code LocalDate} with the specified year and day-of-year.
	         * The day-of-year must be valid for the year, otherwise an exception will be thrown.
	         *
	         * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
	         * @param {number} dayOfYear  the day-of-year to represent, from 1 to 366
	         * @return LocalDate the local date, not null
	         * @throws DateTimeException if the value of any field is out of range,
	         *  or if the day-of-year is invalid for the year
	         */
	        value: function ofYearDay(year, dayOfYear) {
	            _ChronoField.YEAR.checkValidValue(year);
	            //TODO: DAY_OF_YEAR.checkValidValue(dayOfYear);
	            var leap = _IsoChronology.IsoChronology.isLeapYear(year);
	            if (dayOfYear === 366 && leap === false) {
	                (0, _assert.assert)(false, "Invalid date 'DayOfYear 366' as '" + year + "' is not a leap year", _errors.DateTimeException);
	            }
	            var moy = _Month.Month.of(Math.floor((dayOfYear - 1) / 31 + 1));
	            var monthEnd = moy.firstDayOfYear(leap) + moy.length(leap) - 1;
	            if (dayOfYear > monthEnd) {
	                moy = moy.plus(1);
	            }
	            var dom = dayOfYear - moy.firstDayOfYear(leap) + 1;
	            return new LocalDate(year, moy.value(), dom);
	        }
	    }, {
	        key: 'validate',
	        value: function validate(year, month, dayOfMonth) {
	            var dom;
	            _ChronoField.YEAR.checkValidValue(year);
	            _ChronoField.MONTH_OF_YEAR.checkValidValue(month);
	            _ChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
	            if (dayOfMonth > 28) {
	                dom = 31;
	                switch (month) {
	                    case 2:
	                        dom = _IsoChronology.IsoChronology.isLeapYear(year) ? 29 : 28;
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
	
	/**
	 * The minimum supported {@code LocalDate}
	 * This could be used by an application as a "far past" date.
	 */
	
	LocalDate.MIN = LocalDate.of(_Year.Year.MIN_VALUE, 1, 1);
	/**
	 * The maximum supported {@code LocalDate}
	 * This could be used by an application as a "far future" date.
	 */
	LocalDate.MAX = LocalDate.of(_Year.Year.MAX_VALUE, 12, 31);

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

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Math helper with static function for integer operations
	 */
	
	var MathUtil = exports.MathUtil = (function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    _createClass(MathUtil, null, [{
	        key: "intDiv",
	        value: function intDiv(x, y) {
	            var r = x / y;
	            if (r < 0) {
	                return Math.ceil(r);
	            } else {
	                return Math.floor(r);
	            }
	        }
	    }, {
	        key: "floorDiv",
	        value: function floorDiv(x, y) {
	            var r = Math.floor(x / y);
	            return r;
	        }
	    }, {
	        key: "floorMod",
	        value: function floorMod(x, y) {
	            var r = x - MathUtil.floorDiv(x, y) * y;
	            return r;
	        }
	    }]);
	
	    return MathUtil;
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeException = undefined;
	
	var _es6Error = __webpack_require__(5);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DateTimeException = exports.DateTimeException = (function (_ExtendableError) {
	    _inherits(DateTimeException, _ExtendableError);
	
	    function DateTimeException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'DateTimeException' : arguments[0];
	
	        _classCallCheck(this, DateTimeException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeException).call(this, message));
	    }
	
	    return DateTimeException;
	})(_es6Error2.default);

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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IsoChronology = exports.IsoChronology = (function () {
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.YEAR = exports.MONTH_OF_YEAR = exports.DAY_OF_MONTH = undefined;
	
	var _ValueRange = __webpack_require__(8);
	
	var _Year = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	        key: 'checkValidValue',
	        value: function checkValidValue(value) {
	            return this.range().checkValidValue(value, this.name());
	        }
	    }]);
	
	    return ChronoField;
	})();
	
	var DAY_OF_MONTH = exports.DAY_OF_MONTH = new ChronoField("DayOfMonth", null, null, _ValueRange.ValueRange.of(1, 28, 31), "day");
	
	var MONTH_OF_YEAR = exports.MONTH_OF_YEAR = new ChronoField("MonthOfYear", null, null, _ValueRange.ValueRange.of(1, 12), "month");
	
	var YEAR = exports.YEAR = new ChronoField("" + "Year", null, null, _ValueRange.ValueRange.of(_Year.Year.MIN_VALUE, _Year.Year.MAX_VALUE), "year");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ValueRange = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var ValueRange = exports.ValueRange = (function () {
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A year in the ISO-8601 calendar system, such as {@code 2007}.
	 * <p>
	 * {@code Year} is an immutable date-time object that represents a year.
	 * Any field that can be derived from a year can be obtained.
	 * <p>
	 * <b>Note that years in the ISO chronology only align with years in the
	 * Gregorian-Julian system for modern years. Parts of Russia did not switch to the
	 * modern Gregorian/ISO rules until 1920.
	 * As such, historical years must be treated with caution.</b>
	 * <p>
	 * This class does not store or represent a month, day, time or time-zone.
	 * For example, the value "2007" can be stored in a {@code Year}.
	 * <p>
	 * Years represented by this class follow the ISO-8601 standard and use
	 * the proleptic numbering system. Year 1 is preceded by year 0, then by year -1.
	 * <p>
	 * The ISO-8601 calendar system is the modern civil calendar system used today
	 * in most of the world. It is equivalent to the proleptic Gregorian calendar
	 * system, in which today's rules for leap years are applied for all time.
	 * For most applications written today, the ISO-8601 rules are entirely suitable.
	 * However, any application that makes use of historical dates, and requires them
	 * to be accurate will find the ISO-8601 approach unsuitable.
	 *
	 */
	
	var Year = exports.Year = function Year() {
	  _classCallCheck(this, Year);
	};
	
	/**
	 * The minimum supported year
	 */
	
	Year.MIN_VALUE = -999999;
	/**
	 * The maximum supported year
	 */
	Year.MAX_VALUE = 999999;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clock = undefined;
	
	var _Instant = __webpack_require__(11);
	
	var _ZoneOffset = __webpack_require__(13);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A clock providing access to the current instant, date and time using a time-zone.
	 * <p>
	 * Instances of this class are used to find the current instant, which can be
	 * interpreted using the stored time-zone to find the current date and time.
	 * As such, a clock can be used instead of {@link System#currentTimeMillis()}
	 * and {@link TimeZone#getDefault()}.
	 * <p>
	 * Use of a {@code Clock} is optional. All key date-time classes also have a
	 * {@code now()} factory method that uses the system clock in the default time zone.
	 * The primary purpose of this abstraction is to allow alternate clocks to be
	 * plugged in as and when required. Applications use an object to obtain the
	 * current time rather than a static method. This can simplify testing.
	 * <p>
	 * Best practice for applications is to pass a {@code Clock} into any method
	 * that requires the current instant.
	 *
	 * This approach allows an alternate clock, such as {@link #fixed(Instant, ZoneId) fixed}
	 * or {@link #offset(Clock, Duration) offset} to be used during testing.
	 * <p>
	 * The {@code system} factory methods provide clocks based on the best available
	 * system clock This may use {@link System#currentTimeMillis()}, or a higher
	 * resolution clock if one is available.
	 */
	
	/**
	 * The javascript Clock implementation differs from the openjdk.
	 *
	 * Javascript only provides the UTC millis of epoch and the ZoneOffset in minutes of the system default time.
	 * Javascript do not provide the system default ZoneId.
	 *
	 * the system default ZoneId is only guessable by the ZoneOffset, like moment-timezone does by returning one ZoneId
	 * with the same ZoneOffset.
	 *
	 * Therefore we are doing a shortcut here, by defining a SystemUTCClock and a SystemDefaultClock, the Clock itself
	 * is returning the ZoneOffset and not the ZoneRules as in the jdk. We should change it, when introducing the iana
	 * timezone database and implementing the timezone domains.
	 *
	 */
	
	var Clock = exports.Clock = (function () {
	    function Clock() {
	        _classCallCheck(this, Clock);
	    }
	
	    _createClass(Clock, [{
	        key: 'millis',
	
	        /**
	          * Gets the current millisecond instant of the clock.
	          * <p>
	          * This returns the millisecond-based instant, measured from 1970-01-01T00:00Z (UTC).
	          * This is equivalent to the definition of {@link Date#getTime()}.
	          * <p>
	          * Most applications should avoid this method and use {@link Instant} to represent
	          * an instant on the time-line rather than a raw millisecond value.
	          * This method is provided to allow the use of the clock in high performance use cases
	          * where the creation of an object would be unacceptable.
	          * <p>
	          * The default implementation currently calls {@link #instant}.
	          *
	          * @return the current millisecond instant from this clock, measured from
	          *  the Java epoch of 1970-01-01T00:00Z (UTC), not null
	          */
	        value: function millis() {
	            throw new TypeError('millis() function is not implemented');
	        }
	
	        /**
	         * Gets the current instant of the clock.
	         * <p>
	         * This returns an instant representing the current instant as defined by the clock.
	         *
	         * @return the current instant from this clock, not null
	         */
	
	    }, {
	        key: 'instant',
	        value: function instant() {
	            throw new TypeError('instant() function is not implemented');
	        }
	
	        /**
	         * in opposite to the jdk implementation the Clock itself returns the offset, that is because
	         * javascript provides only the UTC and the "local" (system default time zone.
	         * it is not possible the get the system default ZoneId without guessing. If we would define ZoneRules, we had to
	         * define something like a virtual, not standard ZoneId like "SystemDefault".
	         * Until we to not have a tzdb, we leave this question open
	         */
	
	    }, {
	        key: 'offset',
	        value: function offset() {
	            throw new TypeError('offset() function is not implemented');
	        }
	    }], [{
	        key: 'systemUTC',
	
	        /**
	         * Obtains a clock that returns the current instant using the
	         * system clock, converting to date and time using the Date.getTime() UTC millis.
	         * <p>
	         * This clock, rather than {@link #systemDefaultZone()}, should be used when
	         * you need the current instant without the date or time.
	         * <p>
	         * @return a clock that uses the system clock in the UTC zone, not null
	         */
	        value: function systemUTC() {
	            return new SystemUTCClock();
	        }
	
	        /**
	         * Obtains a clock that returns the current instant using the best available
	         * system clock, converting to date and time using the default time-zone.
	         * <p>
	         * This clock is based on the available system clock using the Date.getTime() UTC millis
	         * <p>
	         * Using this method hard codes a dependency to the default time-zone into your application.
	         *
	         * The {@link #systemUTC() UTC clock} should be used when you need the current instant
	         * without the date or time.
	         * <p>
	         *
	         * @return a clock that uses the system clock in the default zone, not null
	         * @see ZoneId#systemDefault()
	         */
	
	    }, {
	        key: 'systemDefaultZone',
	        value: function systemDefaultZone() {
	            return new SystemDefaultClock();
	        }
	
	        /**
	         * Obtains a clock that always returns the same instant.
	         * <p>
	         * This clock simply returns the specified instant.
	         * As such, it is not a clock in the conventional sense.
	         * The main use case for this is in testing, where the fixed clock ensures
	         * tests are not dependent on the current clock.
	         *
	         * @param fixedInstant  the instant to use as the clock, not null
	         * @param zoneOffset  the zoneOffset to use as zone Offset, not null
	         * @return a clock that always returns the same instant, not null
	         */
	
	    }, {
	        key: 'fixed',
	        value: function fixed(fixedInstant, zoneOffset) {
	            return new FixedClock(fixedInstant, zoneOffset);
	        }
	    }]);
	
	    return Clock;
	})();
	
	var SystemClock = (function (_Clock) {
	    _inherits(SystemClock, _Clock);
	
	    function SystemClock() {
	        _classCallCheck(this, SystemClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemClock).apply(this, arguments));
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
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * {@link Date#getTime()}.
	 */
	
	var SystemUTCClock = (function (_SystemClock) {
	    _inherits(SystemUTCClock, _SystemClock);
	
	    function SystemUTCClock() {
	        _classCallCheck(this, SystemUTCClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemUTCClock).apply(this, arguments));
	    }
	
	    _createClass(SystemUTCClock, [{
	        key: 'toString',
	        value: function toString() {
	            return "SystemClock[UTC]";
	        }
	    }]);
	
	    return SystemUTCClock;
	})(SystemClock);
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * sytem default Zone {@link Date#getTime()} and {@link Date#getTimeZoneOffset()}.
	 */
	
	var SystemDefaultClock = (function (_SystemClock2) {
	    _inherits(SystemDefaultClock, _SystemClock2);
	
	    function SystemDefaultClock() {
	        _classCallCheck(this, SystemDefaultClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemDefaultClock).apply(this, arguments));
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
	
	/**
	 * Implementation of a clock that always returns the same instant.
	 * This is typically used for testing.
	 */
	
	var FixedClock = (function (_Clock2) {
	    _inherits(FixedClock, _Clock2);
	
	    function FixedClock(fixedInstant, zoneOffset) {
	        _classCallCheck(this, FixedClock);
	
	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(FixedClock).call(this));
	
	        _this4._instant = fixedInstant;
	        _this4._zoneOffset = zoneOffset;
	        return _this4;
	    }
	
	    _createClass(FixedClock, [{
	        key: 'instant',
	        value: function instant() {
	            return this._instant;
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            return this._zoneOffset;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return "FixedClock[]";
	        }
	    }]);
	
	    return FixedClock;
	})(Clock);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Instant = undefined;
	
	var _errors = __webpack_require__(4);
	
	var _MathUtil = __webpack_require__(3);
	
	var _Clock = __webpack_require__(10);
	
	var _LocalTime = __webpack_require__(12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// TODO verify the arbitrary values for min/ max seconds, set to 999_999 Years for now
	var MIN_SECONDS = -31619087596800; // -999999-01-01
	var MAX_SECONDS = 31494784694400; // 999999-12-31
	
	/**
	 * An instantaneous point on the time-line.
	 * 
	 * This class models a single instantaneous point on the time-line.
	 * This might be used to record event time-stamps in the application.
	 * 
	 * Time-scale
	 * 
	 * The length of the solar day is the standard way that humans measure time.
	 * This has traditionally been subdivided into 24 hours of 60 minutes of 60 seconds,
	 * forming a 86400 second day.
	 * 
	 * Modern timekeeping is based on atomic clocks which precisely define an SI second
	 * relative to the transitions of a Caesium atom. The length of an SI second was defined
	 * to be very close to the 86400th fraction of a day.
	 * 
	 * Unfortunately, as the Earth rotates the length of the day varies.
	 * In addition, over time the average length of the day is getting longer as the Earth slows.
	 * As a result, the length of a solar day in 2012 is slightly longer than 86400 SI seconds.
	 * The actual length of any given day and the amount by which the Earth is slowing
	 * are not predictable and can only be determined by measurement.
	 * The UT1 time-scale captures the accurate length of day, but is only available some
	 * time after the day has completed.
	 * 
	 * The UTC time-scale is a standard approach to bundle up all the additional fractions
	 * of a second from UT1 into whole seconds, known as <i>leap-seconds</i>.
	 * A leap-second may be added or removed depending on the Earth's rotational changes.
	 * As such, UTC permits a day to have 86399 SI seconds or 86401 SI seconds where
	 * necessary in order to keep the day aligned with the Sun.
	 * 
	 * The modern UTC time-scale was introduced in 1972, introducing the concept of whole leap-seconds.
	 * Between 1958 and 1972, the definition of UTC was complex, with minor sub-second leaps and
	 * alterations to the length of the notional second. As of 2012, discussions are underway
	 * to change the definition of UTC again, with the potential to remove leap seconds or
	 * introduce other changes.
	 * 
	 * Given the complexity of accurate timekeeping described above, this Java API defines
	 * its own time-scale, the <i>Java Time-Scale</i>.
	 * 
	 * The Java Time-Scale divides each calendar day into exactly 86400
	 * subdivisions, known as seconds.  These seconds may differ from the
	 * SI second.  It closely matches the de facto international civil time
	 * scale, the definition of which changes from time to time.
	 * 
	 * The Java Time-Scale has slightly different definitions for different
	 * segments of the time-line, each based on the consensus international
	 * time scale that is used as the basis for civil time. Whenever the
	 * internationally-agreed time scale is modified or replaced, a new
	 * segment of the Java Time-Scale must be defined for it.  Each segment
	 * must meet these requirements:
	 * <ul>
	 * <li>the Java Time-Scale shall closely match the underlying international
	 *  civil time scale;</li>
	 * <li>the Java Time-Scale shall exactly match the international civil
	 *  time scale at noon each day;</li>
	 * <li>the Java Time-Scale shall have a precisely-defined relationship to
	 *  the international civil time scale.</li>
	 * </ul>
	 * There are currently, as of 2013, two segments in the Java time-scale.
	 * 
	 * For the segment from 1972-11-03 (exact boundary discussed below) until
	 * further notice, the consensus international time scale is UTC (with
	 * leap seconds).  In this segment, the Java Time-Scale is identical to
	 * <a href="http://www.cl.cam.ac.uk/~mgk25/time/utc-sls/">UTC-SLS</a>.
	 * This is identical to UTC on days that do not have a leap second.
	 * On days that do have a leap second, the leap second is spread equally
	 * over the last 1000 seconds of the day, maintaining the appearance of
	 * exactly 86400 seconds per day.
	 * 
	 * For the segment prior to 1972-11-03, extending back arbitrarily far,
	 * the consensus international time scale is defined to be UT1, applied
	 * proleptically, which is equivalent to the (mean) solar time on the
	 * prime meridian (Greenwich). In this segment, the Java Time-Scale is
	 * identical to the consensus international time scale. The exact
	 * boundary between the two segments is the instant where UT1 = UTC
	 * between 1972-11-03T00:00 and 1972-11-04T12:00.
	 * 
	 * Implementations of the Java time-scale using the JSR-310 API are not
	 * required to provide any clock that is sub-second accurate, or that
	 * progresses monotonically or smoothly. Implementations are therefore
	 * not required to actually perform the UTC-SLS slew or to otherwise be
	 * aware of leap seconds. JSR-310 does, however, require that
	 * implementations must document the approach they use when defining a
	 * clock representing the current instant.
	 * See {@link Clock} for details on the available clocks.
	 * 
	 * The Java time-scale is used for all date-time classes.
	 * This includes {@code Instant}, {@code LocalDate}, {@code LocalTime}, {@code OffsetDateTime},
	 * {@code ZonedDateTime} and {@code Duration}.
	 *
	 */
	
	var Instant = exports.Instant = (function () {
	    function Instant(seconds, nanoOfSecond) {
	        _classCallCheck(this, Instant);
	
	        Instant.validate(seconds, nanoOfSecond);
	        this._seconds = seconds;
	        this._nanos = nanoOfSecond;
	    }
	
	    /**
	     * Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z.
	     * 
	     * The epoch second count is a simple incrementing count of seconds where
	     * second 0 is 1970-01-01T00:00:00Z.
	     * The nanosecond part of the day is returned by {@code getNanosOfSecond}.
	     *
	     * @return the seconds from the epoch of 1970-01-01T00:00:00Z
	     */
	
	    _createClass(Instant, [{
	        key: 'epochSecond',
	        value: function epochSecond() {
	            return this._seconds;
	        }
	
	        /**
	         * Gets the number of milli seconds from the Java epoch of 1970-01-01T00:00:00Z.
	         * 
	         * The epoch milli second count is a simple incrementing count of milli seconds where
	         * milli second 0 is 1970-01-01T00:00:00Z.
	         *
	         * @return the milli seconds from the epoch of 1970-01-01T00:00:00Z
	         */
	
	    }, {
	        key: 'epochMilli',
	        value: function epochMilli() {
	            return this._seconds * 1000 + this._nanos / 1000000;
	        }
	
	        /**
	         * Gets the number of nanoseconds, later along the time-line, from the start
	         * of the second.
	         * 
	         * The nanosecond-of-second value measures the total number of nanoseconds from
	         * the second returned by {@code getEpochSecond}.
	         *
	         * @return the nanoseconds within the second, always positive, never exceeds 999,999,999
	         */
	
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nanos;
	        }
	
	        /**
	         * Obtains the current instant from the system clock, or if specified
	         * the current instant from the specified clock.
	         *
	         * This will query the specified clock to obtain the current time.
	         *
	         * @param clock  the clock to use, defaults to the system clock
	         * @return the current instant, not null
	         */
	
	    }, {
	        key: 'plusSeconds',
	
	        /**
	         * Returns a copy of this instant with the specified duration in seconds added.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToAdd  the seconds to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	        value: function plusSeconds(secondsToAdd) {
	            return this._plus(secondsToAdd, 0);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration in seconds subtracted.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToSubtract  the seconds to subtract, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds subtracted, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return this.plusSeconds(secondsToSubtract * -1);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration in nanoseconds added.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param nanosToAdd  the nanoseconds to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified nanoseconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            return this._plus(0, nanosToAdd);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToAdd  the seconds to add, positive or negative
	         * @param nanosToAdd  the nanos to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: '_plus',
	        value: function _plus(secondsToAdd, nanosToAdd) {
	            if ((secondsToAdd | nanosToAdd) == 0) {
	                return this;
	            }
	            var epochSec = this._seconds + secondsToAdd;
	            epochSec = epochSec + _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var _nanosToAdd = nanosToAdd % _LocalTime.LocalTime.NANOS_PER_SECOND;
	            var nanoAdjustment = this._nanos + _nanosToAdd;
	            return Instant.ofEpochSecond(epochSec, nanoAdjustment);
	        }
	
	        /**
	         * Checks if this instant is equal to the specified instant.
	         * <p>
	         * The comparison is based on the time-line position of the instants.
	         *
	         * @param otherInstant  the other instant, null/ undefined returns false
	         * @return true if the other instant is equal to this one
	         */
	
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
	
	        /**
	         * Obtains an instance of {@code Instant} using seconds from the
	         * epoch of 1970-01-01T00:00:00Z.
	         *
	         * @param epochSecond  the number of seconds from 1970-01-01T00:00:00Z
	         * @param nanoAdjustment nanoseconds start from the start of epochSecond, if null the nanosecond field is set to zero.
	         * @return an instant, not null
	         * @throws DateTimeException if the instant exceeds the maximum or minimum instant
	         */
	
	    }], [{
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemUTC() : arguments[0];
	
	            return clock.instant();
	        }
	    }, {
	        key: 'ofEpochSecond',
	        value: function ofEpochSecond(epochSecond) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var secs = epochSecond + _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Instant._create(secs, nos);
	        }
	
	        /**
	         * Obtains an instance of {@code Instant} using milliseconds from the
	         * epoch of 1970-01-01T00:00:00Z.
	         * <p>
	         * The seconds and nanoseconds are extracted from the specified milliseconds.
	         *
	         * @param epochMilli  the number of milliseconds from 1970-01-01T00:00:00Z
	         * @return an instant, not null
	         * @throws DateTimeException if the instant exceeds the maximum or minimum instant
	         */
	
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
	
	Instant.EPOCH = new Instant(0, 0);
	Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
	Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalTime = exports.LocalTime = function LocalTime() {
	  _classCallCheck(this, LocalTime);
	};
	
	LocalTime.HOURS_PER_DAY = 24;
	LocalTime.MINUTES_PER_HOUR = 60;
	LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	LocalTime.SECONDS_PER_MINUTE = 60;
	LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	LocalTime.NANOS_PER_SECOND = 1000000000;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ZoneOffset = undefined;
	
	var _errors = __webpack_require__(4);
	
	var _LocalTime = __webpack_require__(12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_SECONDS = 18 * _LocalTime.LocalTime.SECONDS_PER_HOUR;
	var SECONDS_CACHE = {};
	
	var ZoneOffset = exports.ZoneOffset = (function () {
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
	
	ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Month = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Month = exports.Month = (function () {
	
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
	        key: 'value',
	        value: function value() {
	            return this._value;
	        }
	
	        /**
	         * Returns the month-of-year that is the specified number of months after this one.
	         * <p>
	         * The calculation rolls around the end of the year from December to January.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} months  the months to add, positive or negative
	         * @return {Month} the resulting month, not null
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(months) {
	            var amount = Math.floor(months % 12);
	            var newMonthVal = (this.value() + amount) % 12;
	            /* December is 12, not 0, but 12 % 12 = 0 */
	            newMonthVal = newMonthVal == 0 ? 12 : newMonthVal;
	            return Month.of(newMonthVal);
	        }
	
	        /**
	         * Returns the month-of-year that is the specified number of months before this one.
	         * <p>
	         * The calculation rolls around the start of the year from January to December.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} months  the months to subtract, positive or negative
	         * @return {Month} the resulting month, not null
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(months) {
	            return this.plus(-(months % 12));
	        }
	
	        /**
	         * Gets the length of this month in days.
	         * <p>
	         * This takes a flag to determine whether to return the length for a leap year or not.
	         * <p>
	         * February has 28 days in a standard year and 29 days in a leap year.
	         * April, June, September and November have 30 days.
	         * All other months have 31 days.
	         *
	         * @param {boolean} leapYear  true if the length is required for a leap year
	         * @return {number} the length of this month in days, from 28 to 31
	         */
	
	    }, {
	        key: 'length',
	        value: function length(leapYear) {
	            switch (this) {
	                case Month.FEBRUARY:
	                    return leapYear ? 29 : 28;
	                case Month.APRIL:
	                case Month.JUNE:
	                case Month.SEPTEMBER:
	                case Month.NOVEMBER:
	                    return 30;
	                default:
	                    return 31;
	            }
	        }
	
	        /**
	         * Gets the day-of-year corresponding to the first day of this month.
	         * <p>
	         * This returns the day-of-year that this month begins on, using the leap
	         * year flag to determine the length of February.
	         *
	         * @param {boolean} leapYear  true if the length is required for a leap year
	         * @return {number} the day of year corresponding to the first day of this month, from 1 to 336
	         */
	
	    }, {
	        key: 'firstDayOfYear',
	        value: function firstDayOfYear(leapYear) {
	            var leap = leapYear ? 1 : 0;
	            switch (this) {
	                case Month.JANUARY:
	                    return 1;
	                case Month.FEBRUARY:
	                    return 32;
	                case Month.MARCH:
	                    return 60 + leap;
	                case Month.APRIL:
	                    return 91 + leap;
	                case Month.MAY:
	                    return 121 + leap;
	                case Month.JUNE:
	                    return 152 + leap;
	                case Month.JULY:
	                    return 182 + leap;
	                case Month.AUGUST:
	                    return 213 + leap;
	                case Month.SEPTEMBER:
	                    return 244 + leap;
	                case Month.OCTOBER:
	                    return 274 + leap;
	                case Month.NOVEMBER:
	                    return 305 + leap;
	                case Month.DECEMBER:
	                default:
	                    return 335 + leap;
	            }
	        }
	
	        /**
	          *
	          * @param {number} month
	          * @return {Month} not null
	          **/
	
	    }], [{
	        key: 'of',
	        value: function of(month) {
	            if (month < 1 || month > 12) {
	                (0, _assert.assert)(false, "Invalid value for MonthOfYear: " + month, _errors.DateTimeException);
	            }
	            return MONTHS[month - 1];
	        }
	    }]);
	
	    return Month;
	})();
	
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