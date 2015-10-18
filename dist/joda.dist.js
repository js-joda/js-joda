/******/ (function(modules) { // webpackBootstrap
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

	/**
	 *  Copyright (c) 2014-2015, Philipp Thürwächter
	 *  All rights reserved.
	 */
	
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
/***/ function(module, exports) {

	/**
	 *  Copyright (c) 2014-2015, Philipp Thürwächter
	 *  All rights reserved.
	 */
	
	/**
	 * A date without a time-zone in the ISO-8601 calendar system,
	 * such as {@code 2007-12-03}.
	 *
	 * {@code LocalDate} is an immutable date-time object that represents a date,
	 * often viewed as year-month-day. Other date fields, such as day-of-year,
	 * day-of-week and week-of-year, can also be accessed.
	 * For example, the value "2nd October 2007" can be stored in a {@code LocalDate}.
	 *
	 * This class does not store or represent a time or time-zone.
	 * Instead, it is a description of the date, as used for birthdays.
	 * It cannot represent an instant on the time-line without additional information
	 * such as an offset or time-zone.
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalDate = (function () {
	  function LocalDate(year, month, dayOfMonth) {
	    _classCallCheck(this, LocalDate);
	
	    this._year = year;
	    this._month = month;
	    this._day = dayOfMonth;
	  }
	
	  _createClass(LocalDate, [{
	    key: "year",
	    value: function year() {
	      return this._year;
	    }
	  }, {
	    key: "month",
	    value: function month() {
	      return this._month;
	    }
	  }, {
	    key: "day",
	    value: function day() {
	      return this._day;
	    }
	
	    /**
	     * Outputs this date as a {@code String}, such as {@code 2007-12-03}.
	     *
	     * The output will be in the ISO-8601 format {@code uuuu-MM-dd}.
	     *
	     * @return a string representation of this date, not null
	     */
	  }, {
	    key: "toString",
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

/***/ }
/******/ ]);
//# sourceMappingURL=joda.dist.js.map