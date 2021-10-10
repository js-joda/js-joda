//! @version @js-joda/timezone-2.7.0
//! @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@js-joda/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@js-joda/core"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaTimezone"] = factory(require("@js-joda/core"));
	else
		root["JSJodaTimezone"] = factory(root["JSJoda"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-timezone-empty.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MomentZoneRules.js":
/*!********************************!*\
  !*** ./src/MomentZoneRules.js ***!
  \********************************/
/*! exports provided: MomentZoneRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentZoneRules", function() { return MomentZoneRules; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

var MomentZoneRules = function (_ZoneRules) {
  _inherits(MomentZoneRules, _ZoneRules);

  var _super = _createSuper(MomentZoneRules);

  function MomentZoneRules(tzdbInfo) {
    var _this;

    _classCallCheck(this, MomentZoneRules);

    _this = _super.call(this);
    _this._tzdbInfo = tzdbInfo;
    _this._ldtUntils = new LDTUntils(_this._tzdbInfo.untils, _this._tzdbInfo.offsets);
    return _this;
  }

  _createClass(MomentZoneRules, [{
    key: "isFixedOffset",
    value: function isFixedOffset() {
      return this._tzdbInfo.offsets.length === 1;
    }
  }, {
    key: "offsetOfInstant",
    value: function offsetOfInstant(instant) {
      var epochMilli = instant.toEpochMilli();
      return this.offsetOfEpochMilli(epochMilli);
    }
  }, {
    key: "offsetOfEpochMilli",
    value: function offsetOfEpochMilli(epochMilli) {
      var index = binarySearch(this._tzdbInfo.untils, epochMilli);
      return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(this._offsetByIndexInSeconds(index));
    }
  }, {
    key: "offsetOfLocalDateTime",
    value: function offsetOfLocalDateTime(localDateTime) {
      var info = this._offsetInfo(localDateTime);

      if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
        return info.offsetBefore();
      }

      return info;
    }
  }, {
    key: "_offsetInfo",
    value: function _offsetInfo(localDateTime) {
      var index = ldtBinarySearch(this._ldtUntils, localDateTime);
      var offsetIndex = index >> 1;

      if (index % 2 === 1) {
        var ldtBefore = this._ldtUntils.get(Math.max(index - 1, 0));

        var ldtAfter = this._ldtUntils.get(Math.min(index, this._ldtUntils.size - 1));

        var offsetBefore = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
        var offsetAfter = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(this._offsetByIndexInSeconds(Math.min(offsetIndex + 1, this._tzdbInfo.offsets.length - 1)));

        if (offsetBefore.compareTo(offsetAfter) > 0) {
          return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"].of(ldtBefore, offsetBefore, offsetAfter);
        } else {
          return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"].of(ldtAfter, offsetBefore, offsetAfter);
        }
      }

      return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(this._offsetByIndexInSeconds(offsetIndex));
    }
  }, {
    key: "_offsetByIndexInSeconds",
    value: function _offsetByIndexInSeconds(index) {
      return -offsetInSeconds(this._tzdbInfo.offsets[index]);
    }
  }, {
    key: "validOffsets",
    value: function validOffsets(localDateTime) {
      var info = this._offsetInfo(localDateTime);

      if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
        return info.validOffsets();
      }

      return [info];
    }
  }, {
    key: "transition",
    value: function transition(localDateTime) {
      var info = this._offsetInfo(localDateTime);

      if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
        return info;
      }

      return null;
    }
  }, {
    key: "standardOffset",
    value: function standardOffset(instant) {
      notSupported('ZoneRules.standardOffset');
    }
  }, {
    key: "daylightSavings",
    value: function daylightSavings(instant) {
      notSupported('ZoneRules.daylightSavings');
    }
  }, {
    key: "isDaylightSavings",
    value: function isDaylightSavings(instant) {
      notSupported('ZoneRules.isDaylightSavings');
    }
  }, {
    key: "isValidOffset",
    value: function isValidOffset(localDateTime, offset) {
      return this.validOffsets(localDateTime).some(function (o) {
        return o.equals(offset);
      });
    }
  }, {
    key: "nextTransition",
    value: function nextTransition(instant) {
      notSupported('ZoneRules.nextTransition');
    }
  }, {
    key: "previousTransition",
    value: function previousTransition(instant) {
      notSupported('ZoneRules.previousTransition');
    }
  }, {
    key: "transitions",
    value: function transitions() {
      notSupported('ZoneRules.transitions');
    }
  }, {
    key: "transitionRules",
    value: function transitionRules() {
      notSupported('ZoneRules.transitionRules');
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (this === other) {
        return true;
      }

      if (other instanceof MomentZoneRules) {
        return this._tzdbInfo === other._tzdbInfo;
      }

      return false;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._tzdbInfo.name;
    }
  }]);

  return MomentZoneRules;
}(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneRules"]);

var LDTUntils = function () {
  function LDTUntils(_tzdbUntils, tzdbOffsets) {
    _classCallCheck(this, LDTUntils);

    this._tzdbUntils = _tzdbUntils;
    this._tzdbOffsets = tzdbOffsets;
    this._ldtUntils = [];
    this.size = this._tzdbUntils.length * 2;
  }

  _createClass(LDTUntils, [{
    key: "_generateTupple",
    value: function _generateTupple(index) {
      var epochMillis = this._tzdbUntils[index];

      if (epochMillis === Infinity) {
        return [_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDateTime"].MAX, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDateTime"].MAX];
      }

      var instant = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Instant"].ofEpochMilli(epochMillis);
      var offset1 = offsetInSeconds(this._tzdbOffsets[index]);
      var zone1 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(-offset1);
      var ldt1 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDateTime"].ofInstant(instant, zone1);
      var nextIndex = Math.min(index + 1, this._tzdbOffsets.length - 1);
      var offset2 = offsetInSeconds(this._tzdbOffsets[nextIndex]);
      var zone2 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(-offset2);
      var ldt2 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDateTime"].ofInstant(instant, zone2);

      if (offset1 > offset2) {
        return [ldt1, ldt2];
      } else {
        return [ldt2, ldt1];
      }
    }
  }, {
    key: "_getTupple",
    value: function _getTupple(index) {
      if (this._ldtUntils[index] == null) {
        this._ldtUntils[index] = this._generateTupple(index);
      }

      return this._ldtUntils[index];
    }
  }, {
    key: "get",
    value: function get(index) {
      var ldtTupple = this._getTupple(index >> 1);

      return ldtTupple[index % 2];
    }
  }]);

  return LDTUntils;
}();

function ldtBinarySearch(array, value) {
  var hi = array.size - 1,
      lo = -1,
      mid;

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
      mid;

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
  throw new Error("not supported: ".concat(msg));
}

/***/ }),

/***/ "./src/MomentZoneRulesProvider.js":
/*!****************************************!*\
  !*** ./src/MomentZoneRulesProvider.js ***!
  \****************************************/
/*! exports provided: MomentZoneRulesProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentZoneRulesProvider", function() { return MomentZoneRulesProvider; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MomentZoneRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MomentZoneRules */ "./src/MomentZoneRules.js");
/* harmony import */ var _unpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unpack */ "./src/unpack.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */



var TZDB_DATA;
var TZDB_VERSION;
var AVAILABLE_ZONE_IDS = [];
var zones = {};
var links = {};
var MomentZoneRulesProvider = function (_ZoneRulesProvider) {
  _inherits(MomentZoneRulesProvider, _ZoneRulesProvider);

  var _super = _createSuper(MomentZoneRulesProvider);

  function MomentZoneRulesProvider() {
    _classCallCheck(this, MomentZoneRulesProvider);

    return _super.apply(this, arguments);
  }

  _createClass(MomentZoneRulesProvider, null, [{
    key: "getRules",
    value: function getRules(zoneId) {
      var tzdbZoneInfo = zones[links[zoneId]];

      if (tzdbZoneInfo == null) {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]("Unknown time-zone ID: ".concat(zoneId));
      }

      return new _MomentZoneRules__WEBPACK_IMPORTED_MODULE_1__["MomentZoneRules"](tzdbZoneInfo);
    }
  }, {
    key: "getAvailableZoneIds",
    value: function getAvailableZoneIds() {
      return AVAILABLE_ZONE_IDS;
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return TZDB_VERSION;
    }
  }, {
    key: "getTzdbData",
    value: function getTzdbData() {
      return TZDB_DATA;
    }
  }, {
    key: "loadTzdbData",
    value: function loadTzdbData(packedJson) {
      TZDB_DATA = packedJson;
      TZDB_VERSION = packedJson.version;

      var _iterator = _createForOfIteratorHelper(packedJson.zones),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var packedZoneInfo = _step.value;
          var tzdbZoneInfo = Object(_unpack__WEBPACK_IMPORTED_MODULE_2__["unpack"])(packedZoneInfo);
          AVAILABLE_ZONE_IDS.push(tzdbZoneInfo.name);
          zones[tzdbZoneInfo.name] = tzdbZoneInfo;
          links[tzdbZoneInfo.name] = tzdbZoneInfo.name;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(packedJson.links),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var packedLink = _step2.value;
          var link = packedLink.split('|');
          AVAILABLE_ZONE_IDS.push(link[1]);
          links[link[1]] = link[0];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return MomentZoneRulesProvider;
}(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneRulesProvider"]);

/***/ }),

/***/ "./src/auto-plug.js":
/*!**************************!*\
  !*** ./src/auto-plug.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoPlug; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plug */ "./src/plug.js");
/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */


function autoPlug() {
  Object(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["use"])(_plug__WEBPACK_IMPORTED_MODULE_1__["default"]);
}

/***/ }),

/***/ "./src/js-joda-timezone-empty.js":
/*!***************************************!*\
  !*** ./src/js-joda-timezone-empty.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auto_plug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auto-plug */ "./src/auto-plug.js");
/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

Object(_auto_plug__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/plug.js":
/*!*********************!*\
  !*** ./src/plug.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MomentZoneRulesProvider */ "./src/MomentZoneRulesProvider.js");
/* harmony import */ var _system_default_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./system-default-zone */ "./src/system-default-zone.js");
/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */


/* harmony default export */ __webpack_exports__["default"] = (function (jsJoda) {
  jsJoda.ZoneRulesProvider.getRules = _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_0__["MomentZoneRulesProvider"].getRules;
  jsJoda.ZoneRulesProvider.getAvailableZoneIds = _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_0__["MomentZoneRulesProvider"].getAvailableZoneIds;
  jsJoda.ZoneRulesProvider.getTzdbData = _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_0__["MomentZoneRulesProvider"].getTzdbData;
  jsJoda.ZoneRulesProvider.loadTzdbData = _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_0__["MomentZoneRulesProvider"].loadTzdbData;
  Object(_system_default_zone__WEBPACK_IMPORTED_MODULE_1__["default"])(jsJoda.ZoneId);
  return jsJoda;
});

/***/ }),

/***/ "./src/system-default-zone.js":
/*!************************************!*\
  !*** ./src/system-default-zone.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extendSystemDefaultZoneId; });
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
/*! exports provided: unpack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpack", function() { return unpack; });
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