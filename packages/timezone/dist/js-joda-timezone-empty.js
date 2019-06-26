//! @version @js-joda/timezone-2.1.1
//! @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-joda"));
	else if(typeof define === 'function' && define.amd)
		define(["js-joda"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaTimezone"] = factory(require("js-joda"));
	else
		root["JSJodaTimezone"] = factory(root["JSJoda"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-timezone-empty.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MomentZoneRules.js":
/*!********************************!*\
  !*** ./src/MomentZoneRules.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.MomentZoneRules = undefined;

var _jsJoda = __webpack_require__(/*! js-joda */ "js-joda");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MomentZoneRules = exports.MomentZoneRules = function (_ZoneRules) {
    _inherits(MomentZoneRules, _ZoneRules);

    function MomentZoneRules(tzdbInfo) {
        _classCallCheck(this, MomentZoneRules);

        var _this = _possibleConstructorReturn(this, _ZoneRules.call(this));

        _this._tzdbInfo = tzdbInfo;
        _this._ldtUntils = new LDTUntils(_this._tzdbInfo.untils, _this._tzdbInfo.offsets);
        return _this;
    }

    MomentZoneRules.prototype.isFixedOffset = function isFixedOffset() {
        return this._tzdbInfo.offsets.length === 1;
    };

    MomentZoneRules.prototype.offsetOfInstant = function offsetOfInstant(instant) {
        var epochMilli = instant.toEpochMilli();
        return this.offsetOfEpochMilli(epochMilli);
    };

    MomentZoneRules.prototype.offsetOfEpochMilli = function offsetOfEpochMilli(epochMilli) {
        var index = binarySearch(this._tzdbInfo.untils, epochMilli);
        return _jsJoda.ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(index));
    };

    MomentZoneRules.prototype.offsetOfLocalDateTime = function offsetOfLocalDateTime(localDateTime) {
        var info = this._offsetInfo(localDateTime);
        if (info instanceof _jsJoda.ZoneOffsetTransition) {
            return info.offsetBefore();
        }
        return info;
    };

    MomentZoneRules.prototype._offsetInfo = function _offsetInfo(localDateTime) {
        var index = ldtBinarySearch(this._ldtUntils, localDateTime);
        var offsetIndex = index >> 1;

        if (index % 2 === 1) {
            var ldtBefore = this._ldtUntils.get(Math.max(index - 1, 0));
            var ldtAfter = this._ldtUntils.get(Math.min(index, this._ldtUntils.size - 1));
            var offsetBefore = _jsJoda.ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
            var offsetAfter = _jsJoda.ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(Math.min(offsetIndex + 1, this._tzdbInfo.offsets.length - 1)));

            if (offsetBefore.compareTo(offsetAfter) > 0) {
                return _jsJoda.ZoneOffsetTransition.of(ldtBefore, offsetBefore, offsetAfter);
            } else {
                return _jsJoda.ZoneOffsetTransition.of(ldtAfter, offsetBefore, offsetAfter);
            }
        }
        return _jsJoda.ZoneOffset.ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
    };

    MomentZoneRules.prototype._offsetByIndexInSeconds = function _offsetByIndexInSeconds(index) {
        return -offsetInSeconds(this._tzdbInfo.offsets[index]);
    };

    MomentZoneRules.prototype.validOffsets = function validOffsets(localDateTime) {
        var info = this._offsetInfo(localDateTime);
        if (info instanceof _jsJoda.ZoneOffsetTransition) {
            return info.validOffsets();
        }
        return [info];
    };

    MomentZoneRules.prototype.transition = function transition(localDateTime) {
        var info = this._offsetInfo(localDateTime);
        if (info instanceof _jsJoda.ZoneOffsetTransition) {
            return info;
        }
        return null;
    };

    MomentZoneRules.prototype.standardOffset = function standardOffset(instant) {
        notSupported('ZoneRules.standardOffset');
    };

    MomentZoneRules.prototype.daylightSavings = function daylightSavings(instant) {
        notSupported('ZoneRules.daylightSavings');
    };

    MomentZoneRules.prototype.isDaylightSavings = function isDaylightSavings(instant) {
        notSupported('ZoneRules.isDaylightSavings');
    };

    MomentZoneRules.prototype.isValidOffset = function isValidOffset(localDateTime, offset) {
        return this.validOffsets(localDateTime).some(function (o) {
            return o.equals(offset);
        });
    };

    MomentZoneRules.prototype.nextTransition = function nextTransition(instant) {
        notSupported('ZoneRules.nextTransition');
    };

    MomentZoneRules.prototype.previousTransition = function previousTransition(instant) {
        notSupported('ZoneRules.previousTransition');
    };

    MomentZoneRules.prototype.transitions = function transitions() {
        notSupported('ZoneRules.transitions');
    };

    MomentZoneRules.prototype.transitionRules = function transitionRules() {
        notSupported('ZoneRules.transitionRules');
    };

    MomentZoneRules.prototype.equals = function equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof MomentZoneRules) {
            return this._tzdbInfo === other._tzdbInfo;
        }
        return false;
    };

    MomentZoneRules.prototype.toString = function toString() {
        return this._tzdbInfo.name;
    };

    return MomentZoneRules;
}(_jsJoda.ZoneRules);

var LDTUntils = function () {
    function LDTUntils(_tzdbUntils, tzdbOffsets) {
        _classCallCheck(this, LDTUntils);

        this._tzdbUntils = _tzdbUntils;
        this._tzdbOffsets = tzdbOffsets;
        this._ldtUntils = [];
        this.size = this._tzdbUntils.length * 2;
    }

    LDTUntils.prototype._generateTupple = function _generateTupple(index) {
        var epochMillis = this._tzdbUntils[index];
        if (epochMillis === Infinity) {
            return [_jsJoda.LocalDateTime.MAX, _jsJoda.LocalDateTime.MAX];
        }
        var instant = _jsJoda.Instant.ofEpochMilli(epochMillis);

        var offset1 = offsetInSeconds(this._tzdbOffsets[index]);
        var zone1 = _jsJoda.ZoneOffset.ofTotalSeconds(-offset1);
        var ldt1 = _jsJoda.LocalDateTime.ofInstant(instant, zone1);

        var nextIndex = Math.min(index + 1, this._tzdbOffsets.length - 1);
        var offset2 = offsetInSeconds(this._tzdbOffsets[nextIndex]);
        var zone2 = _jsJoda.ZoneOffset.ofTotalSeconds(-offset2);
        var ldt2 = _jsJoda.LocalDateTime.ofInstant(instant, zone2);

        if (offset1 > offset2) {
            return [ldt1, ldt2];
        } else {
            return [ldt2, ldt1];
        }
    };

    LDTUntils.prototype._getTupple = function _getTupple(index) {
        if (this._ldtUntils[index] == null) {
            this._ldtUntils[index] = this._generateTupple(index);
        }
        return this._ldtUntils[index];
    };

    LDTUntils.prototype.get = function get(index) {
        var ldtTupple = this._getTupple(index >> 1);
        return ldtTupple[index % 2];
    };

    return LDTUntils;
}();

function ldtBinarySearch(array, value) {
    var hi = array.size - 1,
        lo = -1,
        mid = void 0;
    while (hi - lo > 1) {
        if (!value.isBefore(array.get(mid = hi + lo >> 1))) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return hi;
}

function offsetInSeconds(tzdbOffset) {
    return roundDown(+tzdbOffset * 60);
}

function roundDown(r) {
    if (r < 0) {
        return Math.ceil(r);
    } else {
        return Math.floor(r);
    }
}

function binarySearch(array, value) {
    var hi = array.length - 1,
        lo = -1,
        mid = void 0;
    while (hi - lo > 1) {
        if (array[mid = hi + lo >> 1] <= value) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return hi;
}

function notSupported(msg) {
    throw new Error('not supported: ' + msg);
}

/***/ }),

/***/ "./src/MomentZoneRulesProvider.js":
/*!****************************************!*\
  !*** ./src/MomentZoneRulesProvider.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.MomentZoneRulesProvider = undefined;

var _jsJoda = __webpack_require__(/*! js-joda */ "js-joda");

var _MomentZoneRules = __webpack_require__(/*! ./MomentZoneRules */ "./src/MomentZoneRules.js");

var _unpack = __webpack_require__(/*! ./unpack */ "./src/unpack.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TZDB_DATA = void 0;
var TZDB_VERSION = void 0;
var AVAILABLE_ZONE_IDS = [];

var zones = {};
var links = {};

var MomentZoneRulesProvider = exports.MomentZoneRulesProvider = function (_ZoneRulesProvider) {
    _inherits(MomentZoneRulesProvider, _ZoneRulesProvider);

    function MomentZoneRulesProvider() {
        _classCallCheck(this, MomentZoneRulesProvider);

        return _possibleConstructorReturn(this, _ZoneRulesProvider.apply(this, arguments));
    }

    MomentZoneRulesProvider.getRules = function getRules(zoneId) {
        var tzdbZoneInfo = zones[links[zoneId]];
        if (tzdbZoneInfo == null) {
            throw new _jsJoda.DateTimeException('Unknown time-zone ID: ' + zoneId);
        }
        return new _MomentZoneRules.MomentZoneRules(tzdbZoneInfo);
    };

    MomentZoneRulesProvider.getAvailableZoneIds = function getAvailableZoneIds() {
        return AVAILABLE_ZONE_IDS;
    };

    MomentZoneRulesProvider.getVersion = function getVersion() {
        return TZDB_VERSION;
    };

    MomentZoneRulesProvider.getTzdbData = function getTzdbData() {
        return TZDB_DATA;
    };

    MomentZoneRulesProvider.loadTzdbData = function loadTzdbData(packedJson) {
        TZDB_DATA = packedJson;
        TZDB_VERSION = packedJson.version;

        for (var _iterator = packedJson.zones, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var packedZoneInfo = _ref;

            var tzdbZoneInfo = (0, _unpack.unpack)(packedZoneInfo);
            AVAILABLE_ZONE_IDS.push(tzdbZoneInfo.name);
            zones[tzdbZoneInfo.name] = tzdbZoneInfo;
            links[tzdbZoneInfo.name] = tzdbZoneInfo.name;
        }

        for (var _iterator2 = packedJson.links, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var packedLink = _ref2;

            var link = packedLink.split('|');
            AVAILABLE_ZONE_IDS.push(link[1]);
            links[link[1]] = link[0];
        }
    };

    return MomentZoneRulesProvider;
}(_jsJoda.ZoneRulesProvider);

/***/ }),

/***/ "./src/auto-plug.js":
/*!**************************!*\
  !*** ./src/auto-plug.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = autoPlug;

var _jsJoda = __webpack_require__(/*! js-joda */ "js-joda");

var _plug = __webpack_require__(/*! ./plug */ "./src/plug.js");

var _plug2 = _interopRequireDefault(_plug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

function autoPlug() {
  (0, _jsJoda.use)(_plug2.default);
}

/***/ }),

/***/ "./src/js-joda-timezone-empty.js":
/*!***************************************!*\
  !*** ./src/js-joda-timezone-empty.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _autoPlug = __webpack_require__(/*! ./auto-plug */ "./src/auto-plug.js");

var _autoPlug2 = _interopRequireDefault(_autoPlug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _autoPlug2.default)(); /*
                            * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
                            * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                            */

/***/ }),

/***/ "./src/plug.js":
/*!*********************!*\
  !*** ./src/plug.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (jsJoda) {
    jsJoda.ZoneRulesProvider.getRules = _MomentZoneRulesProvider.MomentZoneRulesProvider.getRules;
    jsJoda.ZoneRulesProvider.getAvailableZoneIds = _MomentZoneRulesProvider.MomentZoneRulesProvider.getAvailableZoneIds;
    jsJoda.ZoneRulesProvider.getTzdbData = _MomentZoneRulesProvider.MomentZoneRulesProvider.getTzdbData;
    jsJoda.ZoneRulesProvider.loadTzdbData = _MomentZoneRulesProvider.MomentZoneRulesProvider.loadTzdbData;

    (0, _systemDefaultZone2.default)(jsJoda.ZoneId);
    return jsJoda;
};

var _MomentZoneRulesProvider = __webpack_require__(/*! ./MomentZoneRulesProvider */ "./src/MomentZoneRulesProvider.js");

var _systemDefaultZone = __webpack_require__(/*! ./system-default-zone */ "./src/system-default-zone.js");

var _systemDefaultZone2 = _interopRequireDefault(_systemDefaultZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/system-default-zone.js":
/*!************************************!*\
  !*** ./src/system-default-zone.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = extendSystemDefaultZoneId;

function getResolvedZoneId(ZoneId) {
    try {
        var resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return ZoneId.of(resolvedTimeZone);
    } catch (err) {}
    return null;
}

function extendSystemDefaultZoneId(ZoneId) {
    var resolvedZoneId = getResolvedZoneId(ZoneId);

    if (resolvedZoneId == null) {
        return;
    }

    ZoneId.systemDefault = function () {
        return resolvedZoneId;
    };
}

/***/ }),

/***/ "./src/unpack.js":
/*!***********************!*\
  !*** ./src/unpack.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.unpack = unpack;


function charCodeToInt(charCode) {
    if (charCode > 96) {
        return charCode - 87;
    } else if (charCode > 64) {
        return charCode - 29;
    }
    return charCode - 48;
}

function unpackBase60(string) {
    var i = 0,
        parts = string.split('.'),
        whole = parts[0],
        fractional = parts[1] || '',
        multiplier = 1,
        num,
        out = 0,
        sign = 1;

    if (string.charCodeAt(0) === 45) {
        i = 1;
        sign = -1;
    }

    for (i; i < whole.length; i++) {
        num = charCodeToInt(whole.charCodeAt(i));
        out = 60 * out + num;
    }

    for (i = 0; i < fractional.length; i++) {
        multiplier = multiplier / 60;
        num = charCodeToInt(fractional.charCodeAt(i));
        out += num * multiplier;
    }

    return out * sign;
}

function arrayToInt(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = unpackBase60(array[i]);
    }
}

function intToUntil(array, length) {
    for (var i = 0; i < length; i++) {
        array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000);
    }

    array[length - 1] = Infinity;
}

function mapIndices(source, indices) {
    var out = [],
        i;

    for (i = 0; i < indices.length; i++) {
        out[i] = source[indices[i]];
    }

    return out;
}

function unpack(string) {
    var data = string.split('|'),
        offsets = data[2].split(' '),
        indices = data[3].split(''),
        untils = data[4].split(' ');

    arrayToInt(offsets);
    arrayToInt(indices);
    arrayToInt(untils);

    intToUntil(untils, indices.length);

    return {
        name: data[0],
        abbrs: mapIndices(data[1].split(' '), indices),
        offsets: mapIndices(offsets, indices),
        untils: untils,
        population: data[5] | 0
    };
}

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