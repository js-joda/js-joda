//! @version js-joda-extra - 0.1.0
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-joda"));
	else if(typeof define === 'function' && define.amd)
		define(["js-joda"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaExtra"] = factory(require("js-joda"));
	else
		root["JSJodaExtra"] = factory(root["JSJoda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_js_joda__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Interval = undefined;
exports._init = _init;

var _jsJoda = __webpack_require__(/*! js-joda */ "js-joda");

var _assert = __webpack_require__(/*! ./assert */ "./src/assert.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                           */

var Interval = exports.Interval = function () {
    Interval.of = function of(startInstant, endInstantOrDuration) {
        if (endInstantOrDuration instanceof _jsJoda.Duration) {
            return Interval.ofInstantDuration(startInstant, endInstantOrDuration);
        } else {
            return Interval.ofInstantInstant(startInstant, endInstantOrDuration);
        }
    };

    Interval.ofInstantInstant = function ofInstantInstant(startInclusive, endExclusive) {
        (0, _assert.requireNonNull)(startInclusive, 'startInclusive');
        (0, _assert.requireNonNull)(endExclusive, 'endExclusive');
        (0, _assert.requireInstance)(startInclusive, _jsJoda.Instant, 'startInclusive');
        (0, _assert.requireInstance)(endExclusive, _jsJoda.Instant, 'endExclusive');
        if (endExclusive.isBefore(startInclusive)) {
            throw new _jsJoda.DateTimeException('End instant must on or after start instant');
        }
        return new Interval(startInclusive, endExclusive);
    };

    Interval.ofInstantDuration = function ofInstantDuration(startInclusive, duration) {
        (0, _assert.requireNonNull)(startInclusive, 'startInclusive');
        (0, _assert.requireNonNull)(duration, 'duration');
        (0, _assert.requireInstance)(startInclusive, _jsJoda.Instant, 'startInclusive');
        (0, _assert.requireInstance)(duration, _jsJoda.Duration, 'duration');
        if (duration.isNegative()) {
            throw new _jsJoda.DateTimeException('Duration must not be zero or negative');
        }
        return new Interval(startInclusive, startInclusive.plus(duration));
    };

    Interval.parse = function parse(text) {
        (0, _assert.requireNonNull)(text, 'text');
        if (!(typeof text === 'string')) {
            throw new _jsJoda.IllegalArgumentException('text must be a string, but is ' + text.constructor.name);
        }
        for (var i = 0; i < text.length; i += 1) {
            if (text.charAt(i) === '/') {
                var firstChar = text.charAt(0);
                if (firstChar === 'P' || firstChar === 'p') {
                    var duration = _jsJoda.Duration.parse(text.substring(0, i));
                    var end = _jsJoda.ZonedDateTime.parse(text.substring(i + 1, text.length)).toInstant();
                    return Interval.of(end.minus(duration), end);
                } else {
                    var start = _jsJoda.ZonedDateTime.parse(text.substring(0, i)).toInstant();
                    if (i + 1 < text.length) {
                        var c = text.charAt(i + 1);
                        if (c === 'P' || c === 'p') {
                            var _duration = _jsJoda.Duration.parse(text.substring(i + 1, text.length));
                            return Interval.of(start, start.plus(_duration));
                        }
                    }
                    var _end = _jsJoda.ZonedDateTime.parse(text.substring(i + 1, text.length)).toInstant();
                    return Interval.of(start, _end);
                }
            }
        }
        throw new _jsJoda.DateTimeParseException('Interval cannot be parsed, no forward slash found', text, 0);
    };

    function Interval(startInclusive, endExclusive) {
        _classCallCheck(this, Interval);

        this._start = startInclusive;
        this._end = endExclusive;
    }

    Interval.prototype.start = function start() {
        return this._start;
    };

    Interval.prototype.end = function end() {
        return this._end;
    };

    Interval.prototype.isEmpty = function isEmpty() {
        return this._start.equals(this._end);
    };

    Interval.prototype.isUnboundedStart = function isUnboundedStart() {
        return this._start.equals(_jsJoda.Instant.MIN);
    };

    Interval.prototype.isUnboundedEnd = function isUnboundedEnd() {
        return this._end.equals(_jsJoda.Instant.MAX);
    };

    Interval.prototype.withStart = function withStart(start) {
        return Interval.of(start, this._end);
    };

    Interval.prototype.withEnd = function withEnd(end) {
        return Interval.of(this._start, end);
    };

    Interval.prototype.contains = function contains(instant) {
        (0, _assert.requireNonNull)(instant, 'instant');
        (0, _assert.requireInstance)(instant, _jsJoda.Instant, 'instant');
        return this._start.compareTo(instant) <= 0 && (instant.compareTo(this._end) < 0 || this.isUnboundedEnd());
    };

    Interval.prototype.encloses = function encloses(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        return this._start.compareTo(other.start()) <= 0 && other.end().compareTo(this._end) <= 0;
    };

    Interval.prototype.abuts = function abuts(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        return !this._end.equals(other.start()) !== !this._start.equals(other.end());
    };

    Interval.prototype.isConnected = function isConnected(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        return this.equals(other) || this._start.compareTo(other.end()) <= 0 && other.start().compareTo(this._end) <= 0;
    };

    Interval.prototype.overlaps = function overlaps(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        return other.equals(this) || this._start.compareTo(other.end()) < 0 && other.start().compareTo(this._end) < 0;
    };

    Interval.prototype.intersection = function intersection(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        if (this.isConnected(other) === false) {
            throw new _jsJoda.DateTimeException('Intervals do not connect: ' + this + ' and ' + other);
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

    Interval.prototype.union = function union(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        if (this.isConnected(other) === false) {
            throw new _jsJoda.DateTimeException('Intervals do not connect: ' + this + ' and ' + other);
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

    Interval.prototype.span = function span(other) {
        (0, _assert.requireNonNull)(other, 'other');
        (0, _assert.requireInstance)(other, Interval, 'other');
        var cmpStart = this._start.compareTo(other.start());
        var cmpEnd = this._end.compareTo(other.end());
        var newStart = cmpStart >= 0 ? other.start() : this._start;
        var newEnd = cmpEnd <= 0 ? other.end() : this._end;
        return Interval.of(newStart, newEnd);
    };

    Interval.prototype.isAfter = function isAfter(instantOrInterval) {
        if (instantOrInterval instanceof _jsJoda.Instant) {
            return this.isAfterInstant(instantOrInterval);
        } else {
            return this.isAfterInterval(instantOrInterval);
        }
    };

    Interval.prototype.isBefore = function isBefore(instantOrInterval) {
        if (instantOrInterval instanceof _jsJoda.Instant) {
            return this.isBeforeInstant(instantOrInterval);
        } else {
            return this.isBeforeInterval(instantOrInterval);
        }
    };

    Interval.prototype.isAfterInstant = function isAfterInstant(instant) {
        return this._start.compareTo(instant) > 0;
    };

    Interval.prototype.isBeforeInstant = function isBeforeInstant(instant) {
        return this._end.compareTo(instant) <= 0 && this._start.compareTo(instant) < 0;
    };

    Interval.prototype.isAfterInterval = function isAfterInterval(interval) {
        return this._start.compareTo(interval.end()) >= 0 && !interval.equals(this);
    };

    Interval.prototype.isBeforeInterval = function isBeforeInterval(interval) {
        return this._end.compareTo(interval.start()) <= 0 && !interval.equals(this);
    };

    Interval.prototype.toDuration = function toDuration() {
        return _jsJoda.Duration.between(this._start, this._end);
    };

    Interval.prototype.equals = function equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof Interval) {
            return this._start.equals(obj.start()) && this._end.equals(obj.end());
        }
        return false;
    };

    Interval.prototype.hashCode = function hashCode() {
        return this._start.hashCode() ^ this._end.hashCode();
    };

    Interval.prototype.toString = function toString() {
        return this._start.toString() + '/' + this._end.toString();
    };

    return Interval;
}();

function _init() {
    Interval.ALL = Interval.of(_jsJoda.Instant.MIN, _jsJoda.Instant.MAX);
}

/***/ }),

/***/ "./src/_init.js":
/*!**********************!*\
  !*** ./src/_init.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Interval = __webpack_require__(/*! ./Interval */ "./src/Interval.js");

var isInit = false; /*
                     * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
                     * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                     */

function init() {
    if (isInit) {
        return;
    }

    isInit = true;

    (0, _Interval._init)();
}

init();

/***/ }),

/***/ "./src/assert.js":
/*!***********************!*\
  !*** ./src/assert.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.assert = assert;
exports.requireNonNull = requireNonNull;
exports.requireInstance = requireInstance;
exports.abstractMethodFail = abstractMethodFail;

var _jsJoda = __webpack_require__(/*! js-joda */ "js-joda");

function assert(assertion, msg, error) {
    if (!assertion) {
        if (error) {
            throw new error(msg);
        } else {
            throw new Error(msg);
        }
    }
} /**
   * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
   * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
   */
function requireNonNull(value, parameterName) {
    if (value == null) {
        throw new _jsJoda.NullPointerException(parameterName + ' must not be null');
    }
    return value;
}

function requireInstance(value, _class, parameterName) {
    if (!(value instanceof _class)) {
        throw new _jsJoda.IllegalArgumentException(parameterName + ' must be an instance of ' + (_class.name ? _class.name : _class) + (value && value.constructor && value.constructor.name ? ', but is ' + value.constructor.name : ''));
    }
    return value;
}

function abstractMethodFail(methodName) {
    throw new TypeError('abstract method "' + methodName + '" is not implemented');
}

/***/ }),

/***/ "./src/js-joda-extra.js":
/*!******************************!*\
  !*** ./src/js-joda-extra.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(/*! ./main */ "./src/main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _main2.default; /*
                                   * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
                                   * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                   */

module.exports = exports['default'];

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (jsJoda) {
  jsJoda.Interval = _Interval.Interval;
};

var _Interval = __webpack_require__(/*! ./Interval */ "./src/Interval.js");

__webpack_require__(/*! ./_init */ "./src/_init.js");

module.exports = exports['default']; /*
                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                      */

/***/ }),

/***/ "js-joda":
/*!*********************************************************************************************!*\
  !*** external {"amd":"js-joda","commonjs":"js-joda","commonjs2":"js-joda","root":"JSJoda"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_js_joda__;

/***/ })

/******/ });
});