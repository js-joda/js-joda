//! @version @js-joda/locale - 3.2.0+36.0.0
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@js-joda/core"), require("cldr-data"), require("cldrjs"));
	else if(typeof define === 'function' && define.amd)
		define(["@js-joda/core", "cldr-data", "cldrjs"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaLocale"] = factory(require("@js-joda/core"), require("cldr-data"), require("cldrjs"));
	else
		root["JSJodaLocale"] = factory(root["JSJoda"], root["cldrData"], root["Cldr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__js_joda_core__, __WEBPACK_EXTERNAL_MODULE_cldr_data__, __WEBPACK_EXTERNAL_MODULE_cldrjs__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-locale.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Locale.js":
/*!***********************!*\
  !*** ./src/Locale.js ***!
  \***********************/
/*! exports provided: default, _init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Locale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_init", function() { return _init; });
/* harmony import */ var _format_cldr_CldrDateTimeTextProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format/cldr/CldrDateTimeTextProvider */ "./src/format/cldr/CldrDateTimeTextProvider.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


var Locale = function () {
  _createClass(Locale, null, [{
    key: "getAvailableLocales",
    value: function getAvailableLocales() {
      return new _format_cldr_CldrDateTimeTextProvider__WEBPACK_IMPORTED_MODULE_0__["default"]().getAvailableLocales();
    }
  }]);

  function Locale(language) {
    var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var localeString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, Locale);

    this._language = language;
    this._country = country;
    this._localeString = localeString;
  }

  _createClass(Locale, [{
    key: "language",
    value: function language() {
      return this._language;
    }
  }, {
    key: "country",
    value: function country() {
      return this._country;
    }
  }, {
    key: "localeString",
    value: function localeString() {
      if (this._localeString.length > 0) {
        return this._localeString;
      }

      if (this._country.length > 0) {
        return "".concat(this._language, "-").concat(this._country);
      } else {
        return this._language;
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Locale[".concat(this.localeString(), "]");
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (!other) {
        return false;
      }

      if (!(other instanceof Locale)) {
        return false;
      }

      return this.localeString() === other.localeString();
    }
  }]);

  return Locale;
}();


function _init() {
  Locale.ENGLISH = new Locale('en');
  Locale.US = new Locale('en', 'US', 'en');
  Locale.UK = new Locale('en', 'GB');
  Locale.CANADA = new Locale('en', 'CA');
  Locale.FRENCH = new Locale('fr');
  Locale.FRANCE = new Locale('fr', 'FR', 'fr');
  Locale.GERMAN = new Locale('de');
  Locale.GERMANY = new Locale('de', 'DE', 'de');
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
/* harmony import */ var _Locale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Locale */ "./src/Locale.js");
/* harmony import */ var _temporal_WeekFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./temporal/WeekFields */ "./src/temporal/WeekFields.js");
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
  Object(_Locale__WEBPACK_IMPORTED_MODULE_0__["_init"])();
  Object(_temporal_WeekFields__WEBPACK_IMPORTED_MODULE_1__["_init"])();
}

init();

/***/ }),

/***/ "./src/format/LocaleDateTimeFormatter.js":
/*!***********************************************!*\
  !*** ./src/format/LocaleDateTimeFormatter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocaleDateTimeFormatter; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Locale */ "./src/Locale.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


var requireNonNull = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].assert.requireNonNull;

var LocaleDateTimeFormatter = function (_DateTimeFormatter) {
  _inherits(LocaleDateTimeFormatter, _DateTimeFormatter);

  function LocaleDateTimeFormatter() {
    _classCallCheck(this, LocaleDateTimeFormatter);

    return _possibleConstructorReturn(this, _getPrototypeOf(LocaleDateTimeFormatter).apply(this, arguments));
  }

  _createClass(LocaleDateTimeFormatter, [{
    key: "withLocale",
    value: function withLocale(locale) {
      requireNonNull(locale, 'locale');

      if (locale.equals(this._locale)) {
        return this;
      }

      return new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatter"](this._printerParser, locale, this._decimalStyle, this._resolverStyle, this._resolverFields, this._chrono, this._zone);
    }
  }]);

  return LocaleDateTimeFormatter;
}(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatter"]);



/***/ }),

/***/ "./src/format/LocaleStore.js":
/*!***********************************!*\
  !*** ./src/format/LocaleStore.js ***!
  \***********************************/
/*! exports provided: createEntry, LocaleStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntry", function() { return createEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocaleStore", function() { return LocaleStore; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
var createEntry = function createEntry(text, field) {
  return {
    key: text,
    value: field,
    toString: function toString() {
      return text + '->' + field;
    }
  };
};

var _comparator = function _comparator(obj1, obj2) {
  return obj2.key.length - obj1.key.length;
};

var LocaleStore = function () {
  function LocaleStore(valueTextMap) {
    _classCallCheck(this, LocaleStore);

    this._valueTextMap = valueTextMap;
    var map = {};
    var allList = [];
    Object.keys(valueTextMap).forEach(function (style) {
      var reverse = {};
      Object.keys(valueTextMap[style]).forEach(function (key) {
        var value = valueTextMap[style][key];

        if (reverse[value] === undefined) {
          reverse[value] = createEntry(value, Number.parseInt(key));
        }
      });
      var list = Object.values(reverse);
      list.sort(_comparator);
      map[style] = list;
      allList = allList.concat(list);
      map[null] = allList;
    });
    allList.sort(_comparator);
    this._parsable = map;
  }

  _createClass(LocaleStore, [{
    key: "getText",
    value: function getText(value, style) {
      var map = this._valueTextMap[style];
      return map != null ? map[value] : null;
    }
  }, {
    key: "getTextIterator",
    value: function getTextIterator(style) {
      var list = this._parsable[style];
      return list != null ? list[Symbol.iterator]() : null;
    }
  }]);

  return LocaleStore;
}();

/***/ }),

/***/ "./src/format/cldr/CldrCache.js":
/*!**************************************!*\
  !*** ./src/format/cldr/CldrCache.js ***!
  \**************************************/
/*! exports provided: loadCldrData, getOrCreateCldrInstance, getOrCreateMapZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCldrData", function() { return loadCldrData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrCreateCldrInstance", function() { return getOrCreateCldrInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrCreateMapZones", function() { return getOrCreateMapZones; });
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cldr-data */ "cldr-data");
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cldr_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldrjs */ "cldrjs");
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cldrjs__WEBPACK_IMPORTED_MODULE_1__);
/*
* @copyright (c) 2020, Philipp Thuerwaechter & Pattrick Hueper
* @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
*/


var cldrDataLoaded = new Set();
var loadCldrData = function loadCldrData(path) {
  if (!cldrDataLoaded.has(path)) {
    cldrjs__WEBPACK_IMPORTED_MODULE_1___default.a.load(cldr_data__WEBPACK_IMPORTED_MODULE_0___default()(path));
    cldrDataLoaded.add(path);
  }
};
var localeToCldrInstanceCache = {};
var getOrCreateCldrInstance = function getOrCreateCldrInstance(locale) {
  if (localeToCldrInstanceCache[locale] == null) {
    localeToCldrInstanceCache[locale] = new cldrjs__WEBPACK_IMPORTED_MODULE_1___default.a(locale);
  }

  return localeToCldrInstanceCache[locale];
};
var localeToMapZonesCache = {};
var getOrCreateMapZones = function getOrCreateMapZones(cldr) {
  if (localeToMapZonesCache[cldr.locale] == null) {
    var mapZones = {};
    cldr.get('supplemental/metaZones/metazones').forEach(function (metaZone) {
      if (metaZone.mapZone) {
        if (!mapZones[metaZone.mapZone._other]) {
          mapZones[metaZone.mapZone._other] = {};
        }

        mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
      }
    });
    localeToMapZonesCache[cldr.locale] = mapZones;
  }

  return localeToMapZonesCache[cldr.locale];
};

/***/ }),

/***/ "./src/format/cldr/CldrDateTimeFormatterBuilder.js":
/*!*********************************************************!*\
  !*** ./src/format/cldr/CldrDateTimeFormatterBuilder.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CldrDateTimeFormatterBuilder; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parser_TextPrinterParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parser/TextPrinterParser */ "./src/format/parser/TextPrinterParser.js");
/* harmony import */ var _CldrDateTimeTextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CldrDateTimeTextProvider */ "./src/format/cldr/CldrDateTimeTextProvider.js");
/* harmony import */ var _CldrZoneTextPrinterParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CldrZoneTextPrinterParser */ "./src/format/cldr/CldrZoneTextPrinterParser.js");
/* harmony import */ var _LocaleStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../LocaleStore */ "./src/format/LocaleStore.js");
/* harmony import */ var _parser_LocalizedOffsetPrinterParser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parser/LocalizedOffsetPrinterParser */ "./src/format/parser/LocalizedOffsetPrinterParser.js");
/* harmony import */ var _parser_WeekFieldsPrinterParser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../parser/WeekFieldsPrinterParser */ "./src/format/parser/WeekFieldsPrinterParser.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */







var _jodaInternal$assert = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;

var CldrDateTimeFormatterBuilder = function (_DateTimeFormatterBui) {
  _inherits(CldrDateTimeFormatterBuilder, _DateTimeFormatterBui);

  function CldrDateTimeFormatterBuilder() {
    _classCallCheck(this, CldrDateTimeFormatterBuilder);

    return _possibleConstructorReturn(this, _getPrototypeOf(CldrDateTimeFormatterBuilder).apply(this, arguments));
  }

  _createClass(CldrDateTimeFormatterBuilder, [{
    key: "appendText",
    value: function appendText(field, styleOrMap) {
      if (styleOrMap === undefined) {
        return this.appendTextField(field);
      } else if (styleOrMap instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"]) {
        return this.appendTextFieldStyle(field, styleOrMap);
      } else {
        return this.appendTextFieldMap(field, styleOrMap);
      }
    }
  }, {
    key: "appendTextField",
    value: function appendTextField(field) {
      return this.appendTextFieldStyle(field, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL);
    }
  }, {
    key: "appendTextFieldStyle",
    value: function appendTextFieldStyle(field, textStyle) {
      requireNonNull(field, 'field');
      requireInstance(field, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TemporalField"], 'field');
      requireNonNull(textStyle, 'textStyle');
      requireInstance(textStyle, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"], 'textStyle');

      this._appendInternal(new _parser_TextPrinterParser__WEBPACK_IMPORTED_MODULE_1__["default"](field, textStyle, new _CldrDateTimeTextProvider__WEBPACK_IMPORTED_MODULE_2__["default"]()));

      return this;
    }
  }, {
    key: "appendTextFieldMap",
    value: function appendTextFieldMap(field, textLookup) {
      requireNonNull(field, 'field');
      requireInstance(field, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"], 'field');
      requireNonNull(textLookup, 'textLookup');
      var copy = Object.assign({}, textLookup);
      var map = {};
      map[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = copy;
      var store = new _LocaleStore__WEBPACK_IMPORTED_MODULE_4__["LocaleStore"](map);
      var provider = {
        getText: function getText(field, value, style) {
          return store.getText(value, style);
        },
        getTextIterator: function getTextIterator(field, style) {
          return store.getTextIterator(style);
        }
      };

      this._appendInternal(new _parser_TextPrinterParser__WEBPACK_IMPORTED_MODULE_1__["default"](field, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL, provider));

      return this;
    }
  }, {
    key: "appendWeekField",
    value: function appendWeekField(field, count) {
      requireNonNull(field, 'field');
      requireNonNull(count, 'count');

      this._appendInternal(new _parser_WeekFieldsPrinterParser__WEBPACK_IMPORTED_MODULE_6__["default"](field, count));

      return this;
    }
  }, {
    key: "appendZoneText",
    value: function appendZoneText(textStyle) {
      this._appendInternal(new _CldrZoneTextPrinterParser__WEBPACK_IMPORTED_MODULE_3__["default"](textStyle));

      return this;
    }
  }, {
    key: "appendLocalizedOffset",
    value: function appendLocalizedOffset(textStyle) {
      requireNonNull(textStyle, 'textStyle');

      if (textStyle !== _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL && textStyle !== _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT) {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalArgumentException"]('Style must be either full or short');
      }

      this._appendInternal(new _parser_LocalizedOffsetPrinterParser__WEBPACK_IMPORTED_MODULE_5__["default"](textStyle));

      return this;
    }
  }]);

  return CldrDateTimeFormatterBuilder;
}(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"]);



/***/ }),

/***/ "./src/format/cldr/CldrDateTimeTextProvider.js":
/*!*****************************************************!*\
  !*** ./src/format/cldr/CldrDateTimeTextProvider.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CldrDateTimeTextProvider; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldr-data */ "cldr-data");
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cldr_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocaleStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LocaleStore */ "./src/format/LocaleStore.js");
/* harmony import */ var _CldrCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CldrCache */ "./src/format/cldr/CldrCache.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */





var CldrDateTimeTextProvider = function () {
  function CldrDateTimeTextProvider() {
    _classCallCheck(this, CldrDateTimeTextProvider);

    this._cache = {};
    Object(_CldrCache__WEBPACK_IMPORTED_MODULE_3__["loadCldrData"])('supplemental/likelySubtags.json');
  }

  _createClass(CldrDateTimeTextProvider, [{
    key: "getAvailableLocales",
    value: function getAvailableLocales() {
      if (typeof JS_JODA_LOCALE_AVAILABLE_LOCALES !== 'undefined') {
        return JS_JODA_LOCALE_AVAILABLE_LOCALES;
      }

      return cldr_data__WEBPACK_IMPORTED_MODULE_1___default()('availableLocales.json').availableLocales;
    }
  }, {
    key: "getText",
    value: function getText(field, value, style, locale) {
      var store = this._findStore(field, locale);

      if (store instanceof _LocaleStore__WEBPACK_IMPORTED_MODULE_2__["LocaleStore"]) {
        return store.getText(value, style);
      }

      return null;
    }
  }, {
    key: "getTextIterator",
    value: function getTextIterator(field, style, locale) {
      var store = this._findStore(field, locale);

      if (store instanceof _LocaleStore__WEBPACK_IMPORTED_MODULE_2__["LocaleStore"]) {
        return store.getTextIterator(style);
      }

      return null;
    }
  }, {
    key: "_findStore",
    value: function _findStore(field, locale) {
      var key = Object(_LocaleStore__WEBPACK_IMPORTED_MODULE_2__["createEntry"])(field, locale);
      var store = this._cache[key];

      if (store === undefined) {
        store = this._createStore(field, locale);
        this._cache[key] = store;
      }

      return store;
    }
  }, {
    key: "_createStore",
    value: function _createStore(field, locale) {
      Object(_CldrCache__WEBPACK_IMPORTED_MODULE_3__["loadCldrData"])("main/".concat(locale.localeString(), "/ca-gregorian.json"));
      var cldr = Object(_CldrCache__WEBPACK_IMPORTED_MODULE_3__["getOrCreateCldrInstance"])(locale.localeString());

      if (field === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR) {
        var monthsData = cldr.main('dates/calendars/gregorian/months/format');
        var styleMap = {};
        var data = {};
        data[1] = monthsData.wide[1];
        data[2] = monthsData.wide[2];
        data[3] = monthsData.wide[3];
        data[4] = monthsData.wide[4];
        data[5] = monthsData.wide[5];
        data[6] = monthsData.wide[6];
        data[7] = monthsData.wide[7];
        data[8] = monthsData.wide[8];
        data[9] = monthsData.wide[9];
        data[10] = monthsData.wide[10];
        data[11] = monthsData.wide[11];
        data[12] = monthsData.wide[12];
        styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = data;
        data = {};
        data[1] = monthsData.narrow[1];
        data[2] = monthsData.narrow[2];
        data[3] = monthsData.narrow[3];
        data[4] = monthsData.narrow[4];
        data[5] = monthsData.narrow[5];
        data[6] = monthsData.narrow[6];
        data[7] = monthsData.narrow[7];
        data[8] = monthsData.narrow[8];
        data[9] = monthsData.narrow[9];
        data[10] = monthsData.narrow[10];
        data[11] = monthsData.narrow[11];
        data[12] = monthsData.narrow[12];
        styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW] = data;
        data = {};
        data[1] = monthsData.abbreviated[1];
        data[2] = monthsData.abbreviated[2];
        data[3] = monthsData.abbreviated[3];
        data[4] = monthsData.abbreviated[4];
        data[5] = monthsData.abbreviated[5];
        data[6] = monthsData.abbreviated[6];
        data[7] = monthsData.abbreviated[7];
        data[8] = monthsData.abbreviated[8];
        data[9] = monthsData.abbreviated[9];
        data[10] = monthsData.abbreviated[10];
        data[11] = monthsData.abbreviated[11];
        data[12] = monthsData.abbreviated[12];
        styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT] = data;
        return this._createLocaleStore(styleMap);
      }

      if (field === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK) {
        var daysData = cldr.main('dates/calendars/gregorian/days/format');
        var _styleMap = {};
        var _data = {};
        _data[1] = daysData.wide.mon;
        _data[2] = daysData.wide.tue;
        _data[3] = daysData.wide.wed;
        _data[4] = daysData.wide.thu;
        _data[5] = daysData.wide.fri;
        _data[6] = daysData.wide.sat;
        _data[7] = daysData.wide.sun;
        _styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = _data;
        _data = {};
        _data[1] = daysData.narrow.mon;
        _data[2] = daysData.narrow.tue;
        _data[3] = daysData.narrow.wed;
        _data[4] = daysData.narrow.thu;
        _data[5] = daysData.narrow.fri;
        _data[6] = daysData.narrow.sat;
        _data[7] = daysData.narrow.sun;
        _styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW] = _data;
        _data = {};
        _data[1] = daysData.abbreviated.mon;
        _data[2] = daysData.abbreviated.tue;
        _data[3] = daysData.abbreviated.wed;
        _data[4] = daysData.abbreviated.thu;
        _data[5] = daysData.abbreviated.fri;
        _data[6] = daysData.abbreviated.sat;
        _data[7] = daysData.abbreviated.sun;
        _styleMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT] = _data;
        return this._createLocaleStore(_styleMap);
      }

      if (field === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].AMPM_OF_DAY) {
        var dayPeriodsData = cldr.main('dates/calendars/gregorian/dayPeriods/format');
        var _styleMap2 = {};
        var _data2 = {};
        _data2[0] = dayPeriodsData.wide.am;
        _data2[1] = dayPeriodsData.wide.pm;
        _styleMap2[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = _data2;
        _data2 = {};
        _data2[0] = dayPeriodsData.narrow.am;
        _data2[1] = dayPeriodsData.narrow.pm;
        _styleMap2[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW] = _data2;
        _data2 = {};
        _data2[0] = dayPeriodsData.abbreviated.am;
        _data2[1] = dayPeriodsData.abbreviated.pm;
        _styleMap2[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT] = _data2;
        return this._createLocaleStore(_styleMap2);
      }

      if (field === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].ERA) {
        var erasData = cldr.main('dates/calendars/gregorian/eras');
        var _styleMap3 = {};
        var _data3 = {};
        _data3[0] = erasData.eraNames['0'];
        _data3[1] = erasData.eraNames['1'];
        _styleMap3[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = _data3;
        _data3 = {};
        _data3[0] = erasData.eraNarrow['0'];
        _data3[1] = erasData.eraNarrow['1'];
        _styleMap3[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW] = _data3;
        _data3 = {};
        _data3[0] = erasData.eraAbbr['0'];
        _data3[1] = erasData.eraAbbr['1'];
        _styleMap3[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT] = _data3;
        return this._createLocaleStore(_styleMap3);
      }

      if (field === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].QUARTER_OF_YEAR) {
        var quartersData = cldr.main('dates/calendars/gregorian/quarters/format');
        var _styleMap4 = {};
        var _data4 = {};
        _data4[1] = quartersData.wide['1'];
        _data4[2] = quartersData.wide['2'];
        _data4[3] = quartersData.wide['3'];
        _data4[4] = quartersData.wide['4'];
        _styleMap4[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL] = _data4;
        _data4 = {};
        _data4[1] = quartersData.narrow['1'];
        _data4[2] = quartersData.narrow['2'];
        _data4[3] = quartersData.narrow['3'];
        _data4[4] = quartersData.narrow['4'];
        _styleMap4[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW] = _data4;
        _data4 = {};
        _data4[1] = quartersData.abbreviated['1'];
        _data4[2] = quartersData.abbreviated['2'];
        _data4[3] = quartersData.abbreviated['3'];
        _data4[4] = quartersData.abbreviated['4'];
        _styleMap4[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT] = _data4;
        return this._createLocaleStore(_styleMap4);
      }

      return null;
    }
  }, {
    key: "_createLocaleStore",
    value: function _createLocaleStore(valueTextMap) {
      valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL_STANDALONE] = valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL];
      valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT_STANDALONE] = valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].SHORT];

      if (Object.keys(valueTextMap).includes(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW) && !Object.keys(valueTextMap).includes(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW_STANDALONE)) {
        valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW_STANDALONE] = valueTextMap[_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].NARROW];
      }

      return new _LocaleStore__WEBPACK_IMPORTED_MODULE_2__["LocaleStore"](valueTextMap);
    }
  }]);

  return CldrDateTimeTextProvider;
}();



/***/ }),

/***/ "./src/format/cldr/CldrZoneTextPrinterParser.js":
/*!******************************************************!*\
  !*** ./src/format/cldr/CldrZoneTextPrinterParser.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CldrZoneTextPrinterParser; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CldrCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CldrCache */ "./src/format/cldr/CldrCache.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


var _jodaInternal$assert = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;

var LENGTH_COMPARATOR = function LENGTH_COMPARATOR(str1, str2) {
  var cmp = str2.length - str1.length;

  if (cmp === 0) {
    cmp = str1.localeCompare(str2);
  }

  return cmp;
};

var resolveZoneIdTextCache = {};

var CldrZoneTextPrinterParser = function () {
  function CldrZoneTextPrinterParser(textStyle) {
    _classCallCheck(this, CldrZoneTextPrinterParser);

    requireNonNull(textStyle, 'textStyle');
    requireInstance(textStyle, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"], 'textStyle');
    this._textStyle = textStyle;
    Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["loadCldrData"])('supplemental/likelySubtags.json');
    Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["loadCldrData"])('supplemental/metaZones.json');
  }

  _createClass(CldrZoneTextPrinterParser, [{
    key: "_cachedResolveZoneIdText",
    value: function _cachedResolveZoneIdText(cldr, zoneId, style, type) {
      if (resolveZoneIdTextCache[cldr.locale] == null) {
        resolveZoneIdTextCache[cldr.locale] = {};
      }

      var zoneIdToStyle = resolveZoneIdTextCache[cldr.locale];

      if (zoneIdToStyle[zoneId] == null) {
        zoneIdToStyle[zoneId] = {};
      }

      var styleToType = zoneIdToStyle[zoneId];

      if (styleToType[style] == null) {
        styleToType[style] = {};
      }

      var typeToResolvedZoneIdText = styleToType[style];

      if (typeToResolvedZoneIdText[type] == null) {
        typeToResolvedZoneIdText[type] = this._resolveZoneIdText(cldr, zoneId, style, type);
      }

      return typeToResolvedZoneIdText[type];
    }
  }, {
    key: "_resolveZoneIdText",
    value: function _resolveZoneIdText(cldr, zoneId, style, type) {
      var zoneData = cldr.main("dates/timeZoneNames/zone/".concat(zoneId, "/").concat(style, "/").concat(type));

      if (zoneData) {
        return zoneData;
      } else {
        var metazoneInfo = cldr.get("supplemental/metaZones/metazoneInfo/timezone/".concat(zoneId));

        if (metazoneInfo) {
          var metazone = metazoneInfo[metazoneInfo.length - 1]['usesMetazone']['_mzone'];
          var metaZoneData = cldr.main("dates/timeZoneNames/metazone/".concat(metazone, "/").concat(style, "/").concat(type));

          if (metaZoneData) {
            return metaZoneData;
          } else {
            metaZoneData = cldr.main("dates/timeZoneNames/metazone/".concat(metazone, "/").concat(style, "/generic"));

            if (!metaZoneData) {
              metaZoneData = cldr.main("dates/timeZoneNames/metazone/".concat(metazone, "/").concat(style, "/standard"));
            }

            if (metaZoneData) {
              return metaZoneData;
            } else {
              var mapZones = Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["getOrCreateMapZones"])(cldr);
              var preferredZone = mapZones[metazone][cldr.attributes.territory];

              if (preferredZone) {
                if (preferredZone !== zoneId) {
                  return this._cachedResolveZoneIdText(cldr, preferredZone, style, type);
                }
              } else {
                var goldenZone = mapZones[metazone]['001'];

                if (goldenZone !== zoneId) {
                  return this._cachedResolveZoneIdText(cldr, goldenZone, style, type);
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "print",
    value: function print(context, buf) {
      var zone = context.getValueQuery(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TemporalQueries"].zoneId());

      if (zone == null) {
        return false;
      }

      if (zone.normalized() instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"]) {
        buf.append(zone.id());
        return true;
      }

      var daylight = false;
      var hasDaylightSupport = false;
      var tzType = hasDaylightSupport ? daylight ? 'daylight' : 'standard' : 'generic';
      var tzstyle = this._textStyle.asNormal() === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL ? 'long' : 'short';
      Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["loadCldrData"])("main/".concat(context.locale().localeString(), "/timeZoneNames.json"));
      var cldr = Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["getOrCreateCldrInstance"])(context.locale().localeString());

      var text = this._cachedResolveZoneIdText(cldr, zone.id(), tzstyle, tzType);

      if (text) {
        buf.append(text);
      } else {
        buf.append(zone.id());
      }

      return true;
    }
  }, {
    key: "parse",
    value: function parse(context, text, position) {
      var ids = {};
      Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["loadCldrData"])("main/".concat(context.locale().localeString(), "/timeZoneNames.json"));
      var cldr = Object(_CldrCache__WEBPACK_IMPORTED_MODULE_1__["getOrCreateCldrInstance"])(context.locale().localeString());
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneRulesProvider"].getAvailableZoneIds()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var id = _step.value;
          ids[id] = id;
          var tzstyle = this._textStyle.asNormal() === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL ? 'long' : 'short';

          var genericText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'generic');

          if (genericText) {
            ids[genericText] = id;
          }

          var standardText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'standard');

          if (standardText) {
            ids[standardText] = id;
          }

          var daylightText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'daylight');

          if (daylightText) {
            ids[daylightText] = id;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var sortedKeys = Object.keys(ids).sort(LENGTH_COMPARATOR);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sortedKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          if (context.subSequenceEquals(text, position, name, 0, name.length)) {
            context.setParsedZone(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneId"].of(ids[name]));
            return position + name.length;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return ~position;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "ZoneText(".concat(this._textStyle, ")");
    }
  }]);

  return CldrZoneTextPrinterParser;
}();



/***/ }),

/***/ "./src/format/parser/LocalizedOffsetPrinterParser.js":
/*!***********************************************************!*\
  !*** ./src/format/parser/LocalizedOffsetPrinterParser.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalizedOffsetPrinterParser; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

var MathUtil = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].MathUtil;

var LocalizedOffsetPrinterParser = function () {
  function LocalizedOffsetPrinterParser(textStyle) {
    _classCallCheck(this, LocalizedOffsetPrinterParser);

    this._textStyle = textStyle;
  }

  _createClass(LocalizedOffsetPrinterParser, [{
    key: "textStyle",
    value: function textStyle() {
      return this._textStyle;
    }
  }, {
    key: "print",
    value: function print(context, buf) {
      var offsetSecs = context.getValue(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS);

      if (offsetSecs == null) {
        return false;
      }

      buf.append('GMT');

      if (this._textStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL) {
        return new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].OffsetIdPrinterParser('', '+HH:MM:ss').print(context, buf);
      }

      var totalSecs = MathUtil.safeToInt(offsetSecs);

      if (totalSecs !== 0) {
        var absHours = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs, 3600), 100));
        var absMinutes = Math.abs(MathUtil.intMod(MathUtil.intDiv(totalSecs, 60), 60));
        var absSeconds = Math.abs(MathUtil.intMod(totalSecs, 60));
        buf.append(totalSecs < 0 ? '-' : '+').append(absHours);

        if (absMinutes > 0 || absSeconds > 0) {
          buf.append(':').append(MathUtil.intDiv(absMinutes, 10)).append(MathUtil.intMod(absMinutes, 10));

          if (absSeconds > 0) {
            buf.append(':').append(MathUtil.intDiv(absSeconds, 10)).append(MathUtil.intMod(absSeconds, 10));
          }
        }
      }

      return true;
    }
  }, {
    key: "parse",
    value: function parse(context, text, position) {
      if (context.subSequenceEquals(text, position, 'GMT', 0, 3) === false) {
        return ~position;
      }

      position += 3;

      if (this._textStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL) {
        return new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].OffsetIdPrinterParser('', '+HH:MM:ss').parse(context, text, position);
      }

      var end = text.length;

      if (position === end) {
        return context.setParsedField(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS, 0, position, position);
      }

      var sign = text.charAt(position);

      if (sign !== '+' && sign !== '-') {
        return context.setParsedField(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS, 0, position, position);
      }

      var negative = sign === '-' ? -1 : 1;

      if (position === end) {
        return ~position;
      }

      position++;
      var ch = text.charAt(position);

      if (ch < '0' || ch > '9') {
        return ~position;
      }

      position++;
      var hour = MathUtil.parseInt(ch);

      if (position !== end) {
        ch = text.charAt(position);

        if (ch >= '0' && ch <= '9') {
          hour = hour * 10 + MathUtil.parseInt(ch);

          if (hour > 23) {
            return ~position;
          }

          position++;
        }
      }

      if (position === end || text.charAt(position) !== ':') {
        var _offset = negative * 3600 * hour;

        return context.setParsedField(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS, _offset, position, position);
      }

      position++;

      if (position > end - 2) {
        return ~position;
      }

      ch = text.charAt(position);

      if (ch < '0' || ch > '9') {
        return ~position;
      }

      position++;
      var min = MathUtil.parseInt(ch);
      ch = text.charAt(position);

      if (ch < '0' || ch > '9') {
        return ~position;
      }

      position++;
      min = min * 10 + MathUtil.parseInt(ch);

      if (min > 59) {
        return ~position;
      }

      if (position === end || text.charAt(position) !== ':') {
        var _offset2 = negative * (3600 * hour + 60 * min);

        return context.setParsedField(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS, _offset2, position, position);
      }

      position++;

      if (position > end - 2) {
        return ~position;
      }

      ch = text.charAt(position);

      if (ch < '0' || ch > '9') {
        return ~position;
      }

      position++;
      var sec = MathUtil.parseInt(ch);
      ch = text.charAt(position);

      if (ch < '0' || ch > '9') {
        return ~position;
      }

      position++;
      sec = sec * 10 + MathUtil.parseInt(ch);

      if (sec > 59) {
        return ~position;
      }

      var offset = negative * (3600 * hour + 60 * min + sec);
      return context.setParsedField(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].OFFSET_SECONDS, offset, position, position);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "LocalizedOffset(".concat(this._textStyle, ")");
    }
  }]);

  return LocalizedOffsetPrinterParser;
}();



/***/ }),

/***/ "./src/format/parser/TextPrinterParser.js":
/*!************************************************!*\
  !*** ./src/format/parser/TextPrinterParser.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextPrinterParser; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */


var TextPrinterParser = function () {
  function TextPrinterParser(field, textStyle, provider) {
    _classCallCheck(this, TextPrinterParser);

    this._field = field;
    this._textStyle = textStyle;
    this._provider = provider;
  }

  _createClass(TextPrinterParser, [{
    key: "field",
    value: function field() {
      return this._field;
    }
  }, {
    key: "textStyle",
    value: function textStyle() {
      return this._textStyle;
    }
  }, {
    key: "provider",
    value: function provider() {
      return this._provider;
    }
  }, {
    key: "print",
    value: function print(context, buf) {
      var value = context.getValue(this._field);

      if (value === null) {
        return false;
      }

      var text = this._provider.getText(this._field, value, this._textStyle, context.locale());

      if (text === null) {
        return this._numberPrinterParser().print(context, buf);
      }

      buf.append(text);
      return true;
    }
  }, {
    key: "parse",
    value: function parse(context, parseText, position) {
      var length = parseText.length;

      if (position < 0 || position > length) {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalArgumentException"]("The position is invalid: ".concat(position));
      }

      var style = context.isStrict() ? this._textStyle : null;

      var it = this._provider.getTextIterator(this._field, style, context.locale());

      if (it != null) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = it[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;
            var itText = entry.key;

            if (context.subSequenceEquals(itText, 0, parseText, position, itText.length)) {
              return context.setParsedField(this._field, entry.value, position, position + itText.length);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (context.isStrict()) {
          return ~position;
        }
      }

      return this._numberPrinterParser().parse(context, parseText, position);
    }
  }, {
    key: "_numberPrinterParser",
    value: function _numberPrinterParser() {
      if (this._currentNumberPrinterParser == null) {
        this._currentNumberPrinterParser = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(this._field, 1, 19, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NORMAL);
      }

      return this._currentNumberPrinterParser;
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this._textStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["TextStyle"].FULL) {
        return "Text(".concat(this._field, ")");
      }

      return "Text(".concat(this._field, ",").concat(this._textStyle, ")");
    }
  }]);

  return TextPrinterParser;
}();



/***/ }),

/***/ "./src/format/parser/WeekFieldsPrinterParser.js":
/*!******************************************************!*\
  !*** ./src/format/parser/WeekFieldsPrinterParser.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WeekFieldsPrinterParser; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _temporal_WeekFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../temporal/WeekFields */ "./src/temporal/WeekFields.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */


var StringBuilder = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].StringBuilder;

var WeekFieldsPrinterParser = function () {
  function WeekFieldsPrinterParser(letter, count) {
    _classCallCheck(this, WeekFieldsPrinterParser);

    this._letter = letter;
    this._count = count;
  }

  _createClass(WeekFieldsPrinterParser, [{
    key: "print",
    value: function print(context, buf) {
      var weekFields = _temporal_WeekFields__WEBPACK_IMPORTED_MODULE_1__["WeekFields"].of(context.locale());

      var pp = this._evaluate(weekFields);

      return pp.print(context, buf);
    }
  }, {
    key: "parse",
    value: function parse(context, text, position) {
      var weekFields = _temporal_WeekFields__WEBPACK_IMPORTED_MODULE_1__["WeekFields"].of(context.locale());

      var pp = this._evaluate(weekFields);

      return pp.parse(context, text, position);
    }
  }, {
    key: "_evaluate",
    value: function _evaluate(weekFields) {
      var pp = null;

      switch (this._letter) {
        case 'e':
          pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NOT_NEGATIVE);
          break;

        case 'c':
          pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NOT_NEGATIVE);
          break;

        case 'w':
          pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(weekFields.weekOfWeekBasedYear(), this._count, 2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NOT_NEGATIVE);
          break;

        case 'W':
          pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(weekFields.weekOfMonth(), 1, 2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NOT_NEGATIVE);
          break;

        case 'Y':
          if (this._count === 2) {
            pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].ReducedPrinterParser(weekFields.weekBasedYear(), 2, 2, 0, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].ReducedPrinterParser.BASE_DATE);
          } else {
            pp = new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeFormatterBuilder"].NumberPrinterParser(weekFields.weekBasedYear(), this._count, 19, this._count < 4 ? _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NORMAL : _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].EXCEEDS_PAD, -1);
          }

          break;
      }

      return pp;
    }
  }, {
    key: "toString",
    value: function toString() {
      var sb = new StringBuilder(30);
      sb.append('Localized(');

      if (this._letter === 'Y') {
        if (this._count === 1) {
          sb.append('WeekBasedYear');
        } else if (this._count === 2) {
          sb.append('ReducedValue(WeekBasedYear,2,2,2000-01-01)');
        } else {
          sb.append('WeekBasedYear,').append(this._count).append(',').append(19).append(',').append(this._count < 4 ? _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].NORMAL : _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["SignStyle"].EXCEEDS_PAD);
        }
      } else {
        if (this._letter === 'c' || this._letter === 'e') {
          sb.append('DayOfWeek');
        } else if (this._letter === 'w') {
          sb.append('WeekOfWeekBasedYear');
        } else if (this._letter === 'W') {
          sb.append('WeekOfMonth');
        }

        sb.append(',');
        sb.append(this._count);
      }

      sb.append(')');
      return sb.toString();
    }
  }]);

  return WeekFieldsPrinterParser;
}();



/***/ }),

/***/ "./src/js-joda-locale.js":
/*!*******************************!*\
  !*** ./src/js-joda-locale.js ***!
  \*******************************/
/*! exports provided: Locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plug */ "./src/plug.js");
/* harmony import */ var _Locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Locale */ "./src/Locale.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Locale", function() { return _Locale__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */



Object(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["use"])(_plug__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/plug.js":
/*!*********************!*\
  !*** ./src/plug.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _format_cldr_CldrDateTimeFormatterBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format/cldr/CldrDateTimeFormatterBuilder */ "./src/format/cldr/CldrDateTimeFormatterBuilder.js");
/* harmony import */ var _format_LocaleDateTimeFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format/LocaleDateTimeFormatter */ "./src/format/LocaleDateTimeFormatter.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_init */ "./src/_init.js");
/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */



/* harmony default export */ __webpack_exports__["default"] = (function (jsJoda) {
  Object.getOwnPropertyNames(_format_cldr_CldrDateTimeFormatterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"].prototype).forEach(function (prop) {
    if (prop !== 'constructor') {
      jsJoda.DateTimeFormatterBuilder.prototype[prop] = _format_cldr_CldrDateTimeFormatterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"].prototype[prop];
    }
  });
  Object.getOwnPropertyNames(_format_LocaleDateTimeFormatter__WEBPACK_IMPORTED_MODULE_1__["default"].prototype).forEach(function (prop) {
    if (prop !== 'constructor') {
      jsJoda.DateTimeFormatter.prototype[prop] = _format_LocaleDateTimeFormatter__WEBPACK_IMPORTED_MODULE_1__["default"].prototype[prop];
    }
  });
});

/***/ }),

/***/ "./src/temporal/WeekFields.js":
/*!************************************!*\
  !*** ./src/temporal/WeekFields.js ***!
  \************************************/
/*! exports provided: ComputedDayOfField, WeekFields, _init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputedDayOfField", function() { return ComputedDayOfField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeekFields", function() { return WeekFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_init", function() { return _init; });
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js-joda/core */ "@js-joda/core");
/* harmony import */ var _js_joda_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldr-data */ "cldr-data");
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cldr_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cldrjs */ "cldrjs");
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cldrjs__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */



var MathUtil = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].MathUtil,
    _jodaInternal$assert = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["_"].assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;
var DAY_OF_WEEK_RANGE = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(1, 7);
var WEEK_OF_MONTH_RANGE = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(0, 1, 4, 6);
var WEEK_OF_YEAR_RANGE = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(0, 1, 52, 54);
var WEEK_OF_WEEK_BASED_YEAR_RANGE = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(1, 52, 53);
var WEEK_BASED_YEAR_RANGE = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR.range();
var _weekDayMap = {
  'mon': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].MONDAY,
  'tue': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].TUESDAY,
  'wed': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].WEDNESDAY,
  'thu': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].THURSDAY,
  'fri': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].FRIDAY,
  'sat': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].SATURDAY,
  'sun': _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].SUNDAY
};
var ComputedDayOfField = function () {
  _createClass(ComputedDayOfField, null, [{
    key: "ofDayOfWeekField",
    value: function ofDayOfWeekField(weekDef) {
      return new ComputedDayOfField('DayOfWeek', weekDef, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].DAYS, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS, DAY_OF_WEEK_RANGE);
    }
  }, {
    key: "ofWeekOfMonthField",
    value: function ofWeekOfMonthField(weekDef) {
      return new ComputedDayOfField('WeekOfMonth', weekDef, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS, WEEK_OF_MONTH_RANGE);
    }
  }, {
    key: "ofWeekOfYearField",
    value: function ofWeekOfYearField(weekDef) {
      return new ComputedDayOfField('WeekOfYear', weekDef, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS, WEEK_OF_YEAR_RANGE);
    }
  }, {
    key: "ofWeekOfWeekBasedYearField",
    value: function ofWeekOfWeekBasedYearField(weekDef) {
      return new ComputedDayOfField('WeekOfWeekBasedYear', weekDef, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].WEEK_BASED_YEARS, WEEK_OF_WEEK_BASED_YEAR_RANGE);
    }
  }, {
    key: "ofWeekBasedYearField",
    value: function ofWeekBasedYearField(weekDef) {
      return new ComputedDayOfField('WeekBasedYear', weekDef, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].WEEK_BASED_YEARS, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER, WEEK_BASED_YEAR_RANGE);
    }
  }]);

  function ComputedDayOfField(name, weekDef, baseUnit, rangeUnit, range) {
    _classCallCheck(this, ComputedDayOfField);

    this._name = name;
    this._weekDef = weekDef;
    this._baseUnit = baseUnit;
    this._rangeUnit = rangeUnit;
    this._range = range;
  }

  _createClass(ComputedDayOfField, [{
    key: "getFrom",
    value: function getFrom(temporal) {
      var sow = this._weekDef.firstDayOfWeek().value();

      var dow = this._localizedDayOfWeek(temporal, sow);

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS) {
        return dow;
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS) {
        return this._localizedWeekOfMonth(temporal, dow);
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS) {
        return this._localizedWeekOfYear(temporal, dow);
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].WEEK_BASED_YEARS) {
        return this._localizedWOWBY(temporal);
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER) {
        return this._localizedWBY(temporal);
      } else {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalStateException"]('unreachable');
      }
    }
  }, {
    key: "_localizedDayOfWeek",
    value: function _localizedDayOfWeek(temporal, sow) {
      var isoDow = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
      return MathUtil.floorMod(isoDow - sow, 7) + 1;
    }
  }, {
    key: "_localizedWeekOfMonth",
    value: function _localizedWeekOfMonth(temporal, dow) {
      var dom = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_MONTH);

      var offset = this._startOfWeekOffset(dom, dow);

      return ComputedDayOfField._computeWeek(offset, dom);
    }
  }, {
    key: "_localizedWeekOfYear",
    value: function _localizedWeekOfYear(temporal, dow) {
      var doy = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR);

      var offset = this._startOfWeekOffset(doy, dow);

      return ComputedDayOfField._computeWeek(offset, doy);
    }
  }, {
    key: "_localizedWOWBY",
    value: function _localizedWOWBY(temporal) {
      var sow = this._weekDef.firstDayOfWeek().value();

      var isoDow = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
      var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;

      var woy = this._localizedWeekOfYear(temporal, dow);

      if (woy === 0) {
        var previous = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].from(temporal).minus(1, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);
        return this._localizedWeekOfYear(previous, dow) + 1;
      } else if (woy >= 53) {
        var offset = this._startOfWeekOffset(temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR), dow);

        var year = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);
        var yearLen = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Year"].isLeap(year) ? 366 : 365;

        var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());

        if (woy >= weekIndexOfFirstWeekNextYear) {
          return woy - (weekIndexOfFirstWeekNextYear - 1);
        }
      }

      return woy;
    }
  }, {
    key: "_localizedWBY",
    value: function _localizedWBY(temporal) {
      var sow = this._weekDef.firstDayOfWeek().value();

      var isoDow = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
      var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
      var year = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);

      var woy = this._localizedWeekOfYear(temporal, dow);

      if (woy === 0) {
        return year - 1;
      } else if (woy < 53) {
        return year;
      }

      var offset = this._startOfWeekOffset(temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR), dow);

      var yearLen = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Year"].isLeap(year) ? 366 : 365;

      var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());

      if (woy >= weekIndexOfFirstWeekNextYear) {
        return year + 1;
      }

      return year;
    }
  }, {
    key: "_startOfWeekOffset",
    value: function _startOfWeekOffset(day, dow) {
      var weekStart = MathUtil.floorMod(day - dow, 7);
      var offset = -weekStart;

      if (weekStart + 1 > this._weekDef.minimalDaysInFirstWeek()) {
        offset = 7 - weekStart;
      }

      return offset;
    }
  }, {
    key: "adjustInto",
    value: function adjustInto(temporal, newValue) {
      var newVal = this._range.checkValidIntValue(newValue, this);

      var currentVal = temporal.get(this);

      if (newVal === currentVal) {
        return temporal;
      }

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER) {
        var baseWowby = temporal.get(this._weekDef.weekOfWeekBasedYear());
        var diffWeeks = MathUtil.roundDown((newValue - currentVal) * 52.1775);
        var result = temporal.plus(diffWeeks, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);

        if (result.get(this) > newVal) {
          var newWowby = result.get(this._weekDef.weekOfWeekBasedYear());
          result = result.minus(newWowby, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);
        } else {
          if (result.get(this) < newVal) {
            result = result.plus(2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);
          }

          var _newWowby = result.get(this._weekDef.weekOfWeekBasedYear());

          result = result.plus(baseWowby - _newWowby, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);

          if (result.get(this) > newVal) {
            result = result.minus(1, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS);
          }
        }

        return result;
      }

      var delta = newVal - currentVal;
      return temporal.plus(delta, this._baseUnit);
    }
  }, {
    key: "resolve",
    value: function resolve(fieldValues, partialTemporal, resolverStyle) {
      var sow = this._weekDef.firstDayOfWeek().value();

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS) {
        var value = fieldValues.remove(this);

        var localDow = this._range.checkValidIntValue(value, this);

        var _isoDow = MathUtil.floorMod(sow - 1 + (localDow - 1), 7) + 1;

        fieldValues.put(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK, _isoDow);
        return null;
      }

      if (fieldValues.containsKey(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK) === false) {
        return null;
      }

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER) {
        if (fieldValues.containsKey(this._weekDef.weekOfWeekBasedYear()) === false) {
          return null;
        }

        var _isoDow2 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK.checkValidIntValue(fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK));

        var _dow = MathUtil.floorMod(_isoDow2 - sow, 7) + 1;

        var wby = this.range().checkValidIntValue(fieldValues.get(this), this);
        var date;
        var days;

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].LENIENT) {
          date = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].of(wby, 1, this._weekDef.minimalDaysInFirstWeek());
          var wowby = fieldValues.get(this._weekDef.weekOfWeekBasedYear());

          var dateDow = this._localizedDayOfWeek(date, sow);

          var weeks = wowby - this._localizedWeekOfYear(date, dateDow);

          days = weeks * 7 + (_dow - dateDow);
        } else {
          date = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].of(wby, 1, this._weekDef.minimalDaysInFirstWeek());

          var _wowby = this._weekDef.weekOfWeekBasedYear().range().checkValidIntValue(fieldValues.get(this._weekDef.weekOfWeekBasedYear()), this._weekDef.weekOfWeekBasedYear);

          var _dateDow = this._localizedDayOfWeek(date, sow);

          var _weeks = _wowby - this._localizedWeekOfYear(date, _dateDow);

          days = _weeks * 7 + (_dow - _dateDow);
        }

        date = date.plus(days, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].DAYS);

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].STRICT) {
          if (date.getLong(this) !== fieldValues.get(this)) {
            throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('Strict mode rejected date parsed to a different year');
          }
        }

        fieldValues.remove(this);
        fieldValues.remove(this._weekDef.weekOfWeekBasedYear());
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
        return date;
      }

      if (fieldValues.containsKey(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR) === false) {
        return null;
      }

      var isoDow = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK.checkValidIntValue(fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK));
      var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
      var year = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR.checkValidIntValue(fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR));

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS) {
        if (fieldValues.containsKey(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR) === false) {
          return null;
        }

        var _value = fieldValues.remove(this);

        var _date;

        var _days;

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].LENIENT) {
          var month = fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR);
          _date = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].of(year, 1, 1);
          _date = _date.plus(month - 1, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS);

          var _dateDow2 = this._localizedDayOfWeek(_date, sow);

          var _weeks2 = _value - this._localizedWeekOfMonth(_date, _dateDow2);

          _days = _weeks2 * 7 + (dow - _dateDow2);
        } else {
          var _month = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR.checkValidIntValue(fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR));

          _date = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].of(year, _month, 8);

          var _dateDow3 = this._localizedDayOfWeek(_date, sow);

          var wom = this._range.checkValidIntValue(_value, this);

          var _weeks3 = wom - this._localizedWeekOfMonth(_date, _dateDow3);

          _days = _weeks3 * 7 + (dow - _dateDow3);
        }

        _date = _date.plus(_days, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].DAYS);

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].STRICT) {
          if (_date.getLong(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR) !== fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR)) {
            throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('Strict mode rejected date parsed to a different month');
          }
        }

        fieldValues.remove(this);
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].MONTH_OF_YEAR);
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
        return _date;
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS) {
        var _value2 = fieldValues.remove(this);

        var _date2 = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["LocalDate"].of(year, 1, 1);

        var _days2;

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].LENIENT) {
          var _dateDow4 = this._localizedDayOfWeek(_date2, sow);

          var _weeks4 = _value2 - this._localizedWeekOfYear(_date2, _dateDow4);

          _days2 = _weeks4 * 7 + (dow - _dateDow4);
        } else {
          var _dateDow5 = this._localizedDayOfWeek(_date2, sow);

          var woy = this._range.checkValidIntValue(_value2, this);

          var _weeks5 = woy - this._localizedWeekOfYear(_date2, _dateDow5);

          _days2 = _weeks5 * 7 + (dow - _dateDow5);
        }

        _date2 = _date2.plus(_days2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].DAYS);

        if (resolverStyle === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ResolverStyle"].STRICT) {
          if (_date2.getLong(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR) !== fieldValues.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR)) {
            throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('Strict mode rejected date parsed to a different year');
          }
        }

        fieldValues.remove(this);
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);
        fieldValues.remove(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
        return _date2;
      } else {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalStateException"]('unreachable');
      }
    }
  }, {
    key: "name",
    value: function name() {
      return this._name;
    }
  }, {
    key: "baseUnit",
    value: function baseUnit() {
      return this._baseUnit;
    }
  }, {
    key: "rangeUnit",
    value: function rangeUnit() {
      return this._rangeUnit;
    }
  }, {
    key: "range",
    value: function range() {
      return this._range;
    }
  }, {
    key: "isDateBased",
    value: function isDateBased() {
      return true;
    }
  }, {
    key: "isTimeBased",
    value: function isTimeBased() {
      return false;
    }
  }, {
    key: "isSupportedBy",
    value: function isSupportedBy(temporal) {
      if (temporal.isSupported(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK)) {
        if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS) {
          return true;
        } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS) {
          return temporal.isSupported(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_MONTH);
        } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS) {
          return temporal.isSupported(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR);
        } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].WEEK_BASED_YEARS) {
          return temporal.isSupported(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].EPOCH_DAY);
        } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER) {
          return temporal.isSupported(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].EPOCH_DAY);
        }
      }

      return false;
    }
  }, {
    key: "rangeRefinedBy",
    value: function rangeRefinedBy(temporal) {
      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS) {
        return this._range;
      }

      var field = null;

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].MONTHS) {
        field = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_MONTH;
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS) {
        field = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR;
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoFields"].WEEK_BASED_YEARS) {
        return this._rangeWOWBY(temporal);
      } else if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].FOREVER) {
        return temporal.range(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);
      } else {
        throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalStateException"]('unreachable');
      }

      var sow = this._weekDef.firstDayOfWeek().value();

      var isoDow = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
      var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;

      var offset = this._startOfWeekOffset(temporal.get(field), dow);

      var fieldRange = temporal.range(field);
      return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(ComputedDayOfField._computeWeek(offset, fieldRange.minimum()), ComputedDayOfField._computeWeek(offset, fieldRange.maximum()));
    }
  }, {
    key: "_rangeWOWBY",
    value: function _rangeWOWBY(temporal) {
      var sow = this._weekDef.firstDayOfWeek().value();

      var isoDow = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_WEEK);
      var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;

      var woy = this._localizedWeekOfYear(temporal, dow);

      if (woy === 0) {
        return this._rangeWOWBY(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoChronology"].INSTANCE.date(temporal).minus(2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS));
      }

      var offset = this._startOfWeekOffset(temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].DAY_OF_YEAR), dow);

      var year = temporal.get(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoField"].YEAR);
      var yearLen = _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["Year"].isLeap(year) ? 366 : 365;

      var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());

      if (woy >= weekIndexOfFirstWeekNextYear) {
        return this._rangeWOWBY(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IsoChronology"].INSTANCE.date(temporal).plus(2, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].WEEKS));
      }

      return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ValueRange"].of(1, weekIndexOfFirstWeekNextYear - 1);
    }
  }, {
    key: "displayName",
    value: function displayName(locale) {
      requireNonNull(locale, 'locale');

      if (this._rangeUnit === _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ChronoUnit"].YEARS) {
        return 'Week';
      }

      return this.toString();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._name + '[' + this._weekDef.toString() + ']';
    }
  }], [{
    key: "_computeWeek",
    value: function _computeWeek(offset, day) {
      return MathUtil.intDiv(7 + offset + (day - 1), 7);
    }
  }]);

  return ComputedDayOfField;
}();
var WeekFieldsCache = new Map();
var WeekFields = function () {
  _createClass(WeekFields, null, [{
    key: "of",
    value: function of(firstDayOrLocale, minDays) {
      if (minDays === undefined) {
        return WeekFields.ofLocale(firstDayOrLocale);
      } else {
        return WeekFields.ofFirstDayOfWeekMinDays(firstDayOrLocale, minDays);
      }
    }
  }, {
    key: "ofLocale",
    value: function ofLocale(locale) {
      requireNonNull(locale, 'locale');
      cldrjs__WEBPACK_IMPORTED_MODULE_2___default.a.load(cldr_data__WEBPACK_IMPORTED_MODULE_1___default()('supplemental/weekData.json'));
      var cldr = new cldrjs__WEBPACK_IMPORTED_MODULE_2___default.a(locale.localeString());
      var worldRegion = '001';
      var weekData = cldr.get('supplemental/weekData');

      var dow = _weekDayMap[weekData.firstDay[locale.country()]];

      if (!dow) {
        dow = _weekDayMap[weekData.firstDay[worldRegion]];
      }

      var minDays = weekData.minDays[locale.country()];

      if (!minDays) {
        minDays = weekData.minDays[worldRegion];
      }

      return WeekFields.ofFirstDayOfWeekMinDays(dow, minDays);
    }
  }, {
    key: "ofFirstDayOfWeekMinDays",
    value: function ofFirstDayOfWeekMinDays(firstDayOfWeek, minimalDaysInFirstWeek) {
      requireNonNull(firstDayOfWeek, 'firstDayOfWeek');
      requireInstance(firstDayOfWeek, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"], 'firstDayOfWeek');
      requireNonNull(minimalDaysInFirstWeek, 'minimalDaysInFirstWeek');
      var key = firstDayOfWeek.toString() + minimalDaysInFirstWeek;
      var rules = WeekFieldsCache.get(key);

      if (rules == null) {
        rules = new WeekFields(firstDayOfWeek, minimalDaysInFirstWeek);
        WeekFieldsCache.set(key, rules);
        rules = WeekFieldsCache.get(key);
      }

      return rules;
    }
  }]);

  function WeekFields(firstDayOfWeek, minimalDaysInFirstWeek) {
    _classCallCheck(this, WeekFields);

    requireNonNull(firstDayOfWeek, 'firstDayOfWeek');
    requireInstance(firstDayOfWeek, _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"], 'firstDayOfWeek');
    requireNonNull(minimalDaysInFirstWeek, 'minimalDaysInFirstWeek');

    if (minimalDaysInFirstWeek < 1 || minimalDaysInFirstWeek > 7) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["IllegalArgumentException"]('Minimal number of days is invalid');
    }

    this._firstDayOfWeek = firstDayOfWeek;
    this._minimalDays = minimalDaysInFirstWeek;
    this._dayOfWeek = ComputedDayOfField.ofDayOfWeekField(this);
    this._weekOfMonth = ComputedDayOfField.ofWeekOfMonthField(this);
    this._weekOfYear = ComputedDayOfField.ofWeekOfYearField(this);
    this._weekOfWeekBasedYear = ComputedDayOfField.ofWeekOfWeekBasedYearField(this);
    this._weekBasedYear = ComputedDayOfField.ofWeekBasedYearField(this);
    cldrjs__WEBPACK_IMPORTED_MODULE_2___default.a.load(cldr_data__WEBPACK_IMPORTED_MODULE_1___default()('supplemental/likelySubtags.json'));
  }

  _createClass(WeekFields, [{
    key: "firstDayOfWeek",
    value: function firstDayOfWeek() {
      return this._firstDayOfWeek;
    }
  }, {
    key: "minimalDaysInFirstWeek",
    value: function minimalDaysInFirstWeek() {
      return this._minimalDays;
    }
  }, {
    key: "dayOfWeek",
    value: function dayOfWeek() {
      return this._dayOfWeek;
    }
  }, {
    key: "weekOfMonth",
    value: function weekOfMonth() {
      return this._weekOfMonth;
    }
  }, {
    key: "weekOfYear",
    value: function weekOfYear() {
      return this._weekOfYear;
    }
  }, {
    key: "weekOfWeekBasedYear",
    value: function weekOfWeekBasedYear() {
      return this._weekOfWeekBasedYear;
    }
  }, {
    key: "weekBasedYear",
    value: function weekBasedYear() {
      return this._weekBasedYear;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (this === other) {
        return true;
      }

      if (other instanceof WeekFields) {
        return this.hashCode() === other.hashCode();
      }

      return false;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      return this._firstDayOfWeek.ordinal() * 7 + this._minimalDays;
    }
  }, {
    key: "toString",
    value: function toString() {
      return 'WeekFields[' + this._firstDayOfWeek + ',' + this._minimalDays + ']';
    }
  }]);

  return WeekFields;
}();
function _init() {
  WeekFields.ISO = WeekFields.of(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].MONDAY, 4);
  WeekFields.SUNDAY_START = WeekFields.of(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DayOfWeek"].SUNDAY, 1);
}

/***/ }),

/***/ "@js-joda/core":
/*!***************************************************************************************************************!*\
  !*** external {"amd":"@js-joda/core","commonjs":"@js-joda/core","commonjs2":"@js-joda/core","root":"JSJoda"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__js_joda_core__;

/***/ }),

/***/ "cldr-data":
/*!*****************************************************************************************************!*\
  !*** external {"amd":"cldr-data","commonjs":"cldr-data","commonjs2":"cldr-data","root":"cldrData"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cldr_data__;

/***/ }),

/***/ "cldrjs":
/*!****************************************************************************************!*\
  !*** external {"amd":"cldrjs","commonjs":"cldrjs","commonjs2":"cldrjs","root":"Cldr"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cldrjs__;

/***/ })

/******/ });
});