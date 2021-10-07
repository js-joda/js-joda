//! @version @js-joda/extra - 0.4.0
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@js-joda/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@js-joda/core"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaExtra"] = factory(require("@js-joda/core"));
	else
		root["JSJodaExtra"] = factory(root["JSJoda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__js_joda_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-extra.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Interval.js":
/*!*************************!*\
  !*** ./src/Interval.js ***!
  \*************************/
/*! exports provided: Interval, _init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interval", function() { return Interval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_init", function() { return _init; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assert */ "./src/assert.js");
/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */


var Interval = function () {
  Interval.of = function of(startInstant, endInstantOrDuration) {
    if (endInstantOrDuration instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Duration"]) {
      return Interval.ofInstantDuration(startInstant, endInstantOrDuration);
    } else {
      return Interval.ofInstantInstant(startInstant, endInstantOrDuration);
    }
  };

  Interval.ofInstantInstant = function ofInstantInstant(startInclusive, endExclusive) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(startInclusive, 'startInclusive');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(endExclusive, 'endExclusive');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(startInclusive, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"], 'startInclusive');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(endExclusive, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"], 'endExclusive');

    if (endExclusive.isBefore(startInclusive)) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('End instant must on or after start instant');
    }

    return new Interval(startInclusive, endExclusive);
  };

  Interval.ofInstantDuration = function ofInstantDuration(startInclusive, duration) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(startInclusive, 'startInclusive');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(duration, 'duration');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(startInclusive, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"], 'startInclusive');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(duration, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Duration"], 'duration');

    if (duration.isNegative()) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('Duration must not be zero or negative');
    }

    return new Interval(startInclusive, startInclusive.plus(duration));
  };

  Interval.parse = function parse(text) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(text, 'text');

    if (!(typeof text === 'string')) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalArgumentException"]("text must be a string, but is " + text.constructor.name);
    }

    for (var i = 0; i < text.length; i += 1) {
      if (text.charAt(i) === '/') {
        var firstChar = text.charAt(0);

        if (firstChar === 'P' || firstChar === 'p') {
          var duration = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Duration"].parse(text.substring(0, i));
          var end = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZonedDateTime"].parse(text.substring(i + 1, text.length)).toInstant();
          return Interval.of(end.minus(duration), end);
        } else {
          var start = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZonedDateTime"].parse(text.substring(0, i)).toInstant();

          if (i + 1 < text.length) {
            var c = text.charAt(i + 1);

            if (c === 'P' || c === 'p') {
              var _duration = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Duration"].parse(text.substring(i + 1, text.length));

              return Interval.of(start, start.plus(_duration));
            }
          }

          var _end = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZonedDateTime"].parse(text.substring(i + 1, text.length)).toInstant();

          return Interval.of(start, _end);
        }
      }
    }

    throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeParseException"]('Interval cannot be parsed, no forward slash found', text, 0);
  };

  function Interval(startInclusive, endExclusive) {
    this._start = startInclusive;
    this._end = endExclusive;
  }

  var _proto = Interval.prototype;

  _proto.start = function start() {
    return this._start;
  };

  _proto.end = function end() {
    return this._end;
  };

  _proto.isEmpty = function isEmpty() {
    return this._start.equals(this._end);
  };

  _proto.isUnboundedStart = function isUnboundedStart() {
    return this._start.equals(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"].MIN);
  };

  _proto.isUnboundedEnd = function isUnboundedEnd() {
    return this._end.equals(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"].MAX);
  };

  _proto.withStart = function withStart(start) {
    return Interval.of(start, this._end);
  };

  _proto.withEnd = function withEnd(end) {
    return Interval.of(this._start, end);
  };

  _proto.contains = function contains(instant) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(instant, 'instant');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(instant, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"], 'instant');
    return this._start.compareTo(instant) <= 0 && (instant.compareTo(this._end) < 0 || this.isUnboundedEnd());
  };

  _proto.encloses = function encloses(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');
    return this._start.compareTo(other.start()) <= 0 && other.end().compareTo(this._end) <= 0;
  };

  _proto.abuts = function abuts(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');
    return !this._end.equals(other.start()) !== !this._start.equals(other.end());
  };

  _proto.isConnected = function isConnected(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');
    return this.equals(other) || this._start.compareTo(other.end()) <= 0 && other.start().compareTo(this._end) <= 0;
  };

  _proto.overlaps = function overlaps(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');
    return other.equals(this) || this._start.compareTo(other.end()) < 0 && other.start().compareTo(this._end) < 0;
  };

  _proto.intersection = function intersection(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');

    if (this.isConnected(other) === false) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]("Intervals do not connect: " + this + " and " + other);
    }

    var cmpStart = this._start.compareTo(other.start());

    var cmpEnd = this._end.compareTo(other.end());

    if (cmpStart >= 0 && cmpEnd <= 0) {
      return this;
    } else if (cmpStart <= 0 && cmpEnd >= 0) {
      return other;
    } else {
      var newStart = cmpStart >= 0 ? this._start : other.start();
      var newEnd = cmpEnd <= 0 ? this._end : other.end();
      return Interval.of(newStart, newEnd);
    }
  };

  _proto.union = function union(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');

    if (this.isConnected(other) === false) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]("Intervals do not connect: " + this + " and " + other);
    }

    var cmpStart = this._start.compareTo(other.start());

    var cmpEnd = this._end.compareTo(other.end());

    if (cmpStart >= 0 && cmpEnd <= 0) {
      return other;
    } else if (cmpStart <= 0 && cmpEnd >= 0) {
      return this;
    } else {
      var newStart = cmpStart >= 0 ? other.start() : this._start;
      var newEnd = cmpEnd <= 0 ? other.end() : this._end;
      return Interval.of(newStart, newEnd);
    }
  };

  _proto.span = function span(other) {
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireNonNull"])(other, 'other');
    Object(_assert__WEBPACK_IMPORTED_MODULE_1__["requireInstance"])(other, Interval, 'other');

    var cmpStart = this._start.compareTo(other.start());

    var cmpEnd = this._end.compareTo(other.end());

    var newStart = cmpStart >= 0 ? other.start() : this._start;
    var newEnd = cmpEnd <= 0 ? other.end() : this._end;
    return Interval.of(newStart, newEnd);
  };

  _proto.isAfter = function isAfter(instantOrInterval) {
    if (instantOrInterval instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"]) {
      return this.isAfterInstant(instantOrInterval);
    } else {
      return this.isAfterInterval(instantOrInterval);
    }
  };

  _proto.isBefore = function isBefore(instantOrInterval) {
    if (instantOrInterval instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"]) {
      return this.isBeforeInstant(instantOrInterval);
    } else {
      return this.isBeforeInterval(instantOrInterval);
    }
  };

  _proto.isAfterInstant = function isAfterInstant(instant) {
    return this._start.compareTo(instant) > 0;
  };

  _proto.isBeforeInstant = function isBeforeInstant(instant) {
    return this._end.compareTo(instant) <= 0 && this._start.compareTo(instant) < 0;
  };

  _proto.isAfterInterval = function isAfterInterval(interval) {
    return this._start.compareTo(interval.end()) >= 0 && !interval.equals(this);
  };

  _proto.isBeforeInterval = function isBeforeInterval(interval) {
    return this._end.compareTo(interval.start()) <= 0 && !interval.equals(this);
  };

  _proto.toDuration = function toDuration() {
    return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Duration"].between(this._start, this._end);
  };

  _proto.equals = function equals(obj) {
    if (this === obj) {
      return true;
    }

    if (obj instanceof Interval) {
      return this._start.equals(obj.start()) && this._end.equals(obj.end());
    }

    return false;
  };

  _proto.hashCode = function hashCode() {
    return this._start.hashCode() ^ this._end.hashCode();
  };

  _proto.toString = function toString() {
    return this._start.toString() + "/" + this._end.toString();
  };

  return Interval;
}();
function _init() {
  Interval.ALL = Interval.of(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"].MIN, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"].MAX);
}

/***/ }),

/***/ "./src/_init.js":
/*!**********************!*\
  !*** ./src/_init.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.js");
/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

var isInit = false;

function init() {
  if (isInit) {
    return;
  }

  isInit = true;
  Object(_Interval__WEBPACK_IMPORTED_MODULE_0__["_init"])();
}

init();

/***/ }),

/***/ "./src/assert.js":
/*!***********************!*\
  !*** ./src/assert.js ***!
  \***********************/
/*! exports provided: assert, requireNonNull, requireInstance, abstractMethodFail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requireNonNull", function() { return requireNonNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requireInstance", function() { return requireInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abstractMethodFail", function() { return abstractMethodFail; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

function assert(assertion, msg, error) {
  if (!assertion) {
    if (error) {
      throw new error(msg);
    } else {
      throw new Error(msg);
    }
  }
}
function requireNonNull(value, parameterName) {
  if (value == null) {
    throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["NullPointerException"](parameterName + " must not be null");
  }

  return value;
}
function requireInstance(value, _class, parameterName) {
  if (!(value instanceof _class)) {
    throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalArgumentException"](parameterName + " must be an instance of " + (_class.name ? _class.name : _class) + (value && value.constructor && value.constructor.name ? ", but is " + value.constructor.name : ''));
  }

  return value;
}
function abstractMethodFail(methodName) {
  throw new TypeError("abstract method \"" + methodName + "\" is not implemented");
}

/***/ }),

/***/ "./src/js-joda-extra.js":
/*!******************************!*\
  !*** ./src/js-joda-extra.js ***!
  \******************************/
/*! exports provided: Interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interval", function() { return _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]; });

/* harmony import */ var _plug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plug */ "./src/plug.js");
/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */



Object(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["use"])(_plug__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./src/plug.js":
/*!*********************!*\
  !*** ./src/plug.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_init */ "./src/_init.js");
/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/* harmony default export */ __webpack_exports__["default"] = (function () {});

/***/ }),

/***/ "@js-joda/core":
/*!***************************************************************************************************************!*\
  !*** external {"amd":"@js-joda/core","commonjs":"@js-joda/core","commonjs2":"@js-joda/core","root":"JSJoda"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__js_joda_core__;

/***/ })

/******/ });
});