//! @version js-joda-locale - 1.0.0
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-joda"), require("cldr-data"), require("cldrjs"));
	else if(typeof define === 'function' && define.amd)
		define(["js-joda", "cldr-data", "cldrjs"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaLocale"] = factory(require("js-joda"), require("cldr-data"), require("cldrjs"));
	else
		root["JSJodaLocale"] = factory(root["JSJoda"], root["cldrData"], root["Cldr"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports._init = _init;

var _CldrDateTimeTextProvider = __webpack_require__(4);

var _CldrDateTimeTextProvider2 = _interopRequireDefault(_CldrDateTimeTextProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locale = function () {
    _createClass(Locale, null, [{
        key: 'getAvailableLocales',
        value: function getAvailableLocales() {
            return new _CldrDateTimeTextProvider2.default().getAvailableLocales();
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
        key: 'language',
        value: function language() {
            return this._language;
        }
    }, {
        key: 'country',
        value: function country() {
            return this._country;
        }
    }, {
        key: 'localeString',
        value: function localeString() {
            if (this._localeString.length > 0) {
                return this._localeString;
            }
            if (this._country.length > 0) {
                return this._language + '-' + this._country;
            } else {
                return this._language;
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'Locale[' + this.localeString() + ']';
        }
    }, {
        key: 'equals',
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

exports.default = Locale;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jsJoda = __webpack_require__(0);

var _cldrData = __webpack_require__(1);

var _cldrData2 = _interopRequireDefault(_cldrData);

var _cldrjs = __webpack_require__(2);

var _cldrjs2 = _interopRequireDefault(_cldrjs);

var _LocaleStore = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CldrDateTimeTextProvider = function () {
    function CldrDateTimeTextProvider() {
        _classCallCheck(this, CldrDateTimeTextProvider);

        this._cache = {};
        _cldrjs2.default.load((0, _cldrData2.default)('supplemental/likelySubtags.json'));
    }

    _createClass(CldrDateTimeTextProvider, [{
        key: 'getAvailableLocales',
        value: function getAvailableLocales() {
            if (typeof JS_JODA_LOCALE_AVAILABLE_LOCALES !== 'undefined') {
                return JS_JODA_LOCALE_AVAILABLE_LOCALES;
            }

            return (0, _cldrData2.default)('availableLocales.json').availableLocales;
        }
    }, {
        key: 'getText',
        value: function getText(field, value, style, locale) {
            var store = this._findStore(field, locale);
            if (store instanceof _LocaleStore.LocaleStore) {
                return store.getText(value, style);
            }
            return null;
        }
    }, {
        key: 'getTextIterator',
        value: function getTextIterator(field, style, locale) {
            var store = this._findStore(field, locale);
            if (store instanceof _LocaleStore.LocaleStore) {
                return store.getTextIterator(style);
            }
            return null;
        }
    }, {
        key: '_findStore',
        value: function _findStore(field, locale) {
            var key = (0, _LocaleStore.createEntry)(field, locale);
            var store = this._cache[key];
            if (store === undefined) {
                store = this._createStore(field, locale);
                this._cache[key] = store;
            }
            return store;
        }
    }, {
        key: '_createStore',
        value: function _createStore(field, locale) {
            _cldrjs2.default.load((0, _cldrData2.default)('main/' + locale.localeString() + '/ca-gregorian.json'));
            var cldr = new _cldrjs2.default(locale.localeString());
            if (field === _jsJoda.ChronoField.MONTH_OF_YEAR) {
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
                styleMap[_jsJoda.TextStyle.FULL] = data;

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
                styleMap[_jsJoda.TextStyle.NARROW] = data;

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
                styleMap[_jsJoda.TextStyle.SHORT] = data;
                return this._createLocaleStore(styleMap);
            }
            if (field === _jsJoda.ChronoField.DAY_OF_WEEK) {
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
                _styleMap[_jsJoda.TextStyle.FULL] = _data;

                _data = {};
                _data[1] = daysData.narrow.mon;
                _data[2] = daysData.narrow.tue;
                _data[3] = daysData.narrow.wed;
                _data[4] = daysData.narrow.thu;
                _data[5] = daysData.narrow.fri;
                _data[6] = daysData.narrow.sat;
                _data[7] = daysData.narrow.sun;
                _styleMap[_jsJoda.TextStyle.NARROW] = _data;

                _data = {};
                _data[1] = daysData.abbreviated.mon;
                _data[2] = daysData.abbreviated.tue;
                _data[3] = daysData.abbreviated.wed;
                _data[4] = daysData.abbreviated.thu;
                _data[5] = daysData.abbreviated.fri;
                _data[6] = daysData.abbreviated.sat;
                _data[7] = daysData.abbreviated.sun;
                _styleMap[_jsJoda.TextStyle.SHORT] = _data;
                return this._createLocaleStore(_styleMap);
            }
            if (field === _jsJoda.ChronoField.AMPM_OF_DAY) {
                var dayPeriodsData = cldr.main('dates/calendars/gregorian/dayPeriods/format');
                var _styleMap2 = {};
                var _data2 = {};
                _data2[0] = dayPeriodsData.wide.am;
                _data2[1] = dayPeriodsData.wide.pm;
                _styleMap2[_jsJoda.TextStyle.FULL] = _data2;

                _data2 = {};
                _data2[0] = dayPeriodsData.narrow.am;
                _data2[1] = dayPeriodsData.narrow.pm;
                _styleMap2[_jsJoda.TextStyle.NARROW] = _data2;

                _data2 = {};
                _data2[0] = dayPeriodsData.abbreviated.am;
                _data2[1] = dayPeriodsData.abbreviated.pm;
                _styleMap2[_jsJoda.TextStyle.SHORT] = _data2;

                return this._createLocaleStore(_styleMap2);
            }
            if (field === _jsJoda.ChronoField.ERA) {
                var erasData = cldr.main('dates/calendars/gregorian/eras');
                var _styleMap3 = {};
                var _data3 = {};
                _data3[0] = erasData.eraNames['0'];
                _data3[1] = erasData.eraNames['1'];
                _styleMap3[_jsJoda.TextStyle.FULL] = _data3;

                _data3 = {};
                _data3[0] = erasData.eraNarrow['0'];
                _data3[1] = erasData.eraNarrow['1'];
                _styleMap3[_jsJoda.TextStyle.NARROW] = _data3;

                _data3 = {};
                _data3[0] = erasData.eraAbbr['0'];
                _data3[1] = erasData.eraAbbr['1'];
                _styleMap3[_jsJoda.TextStyle.SHORT] = _data3;

                return this._createLocaleStore(_styleMap3);
            }
            if (field === _jsJoda.IsoFields.QUARTER_OF_YEAR) {
                var quartersData = cldr.main('dates/calendars/gregorian/quarters/format');
                var _styleMap4 = {};
                var _data4 = {};
                _data4[1] = quartersData.wide['1'];
                _data4[2] = quartersData.wide['2'];
                _data4[3] = quartersData.wide['3'];
                _data4[4] = quartersData.wide['4'];
                _styleMap4[_jsJoda.TextStyle.FULL] = _data4;

                _data4 = {};
                _data4[1] = quartersData.narrow['1'];
                _data4[2] = quartersData.narrow['2'];
                _data4[3] = quartersData.narrow['3'];
                _data4[4] = quartersData.narrow['4'];
                _styleMap4[_jsJoda.TextStyle.NARROW] = _data4;

                _data4 = {};
                _data4[1] = quartersData.abbreviated['1'];
                _data4[2] = quartersData.abbreviated['2'];
                _data4[3] = quartersData.abbreviated['3'];
                _data4[4] = quartersData.abbreviated['4'];
                _styleMap4[_jsJoda.TextStyle.SHORT] = _data4;

                return this._createLocaleStore(_styleMap4);
            }
            return null;
        }
    }, {
        key: '_createLocaleStore',
        value: function _createLocaleStore(valueTextMap) {
            valueTextMap[_jsJoda.TextStyle.FULL_STANDALONE] = valueTextMap[_jsJoda.TextStyle.FULL];
            valueTextMap[_jsJoda.TextStyle.SHORT_STANDALONE] = valueTextMap[_jsJoda.TextStyle.SHORT];

            if (Object.keys(valueTextMap).includes(_jsJoda.TextStyle.NARROW) && !Object.keys(valueTextMap).includes(_jsJoda.TextStyle.NARROW_STANDALONE)) {
                valueTextMap[_jsJoda.TextStyle.NARROW_STANDALONE] = valueTextMap[_jsJoda.TextStyle.NARROW];
            }
            return new _LocaleStore.LocaleStore(valueTextMap);
        }
    }]);

    return CldrDateTimeTextProvider;
}();

exports.default = CldrDateTimeTextProvider;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

var createEntry = exports.createEntry = function createEntry(text, field) {
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

var LocaleStore = exports.LocaleStore = function () {
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
        key: 'getText',
        value: function getText(value, style) {
            var map = this._valueTextMap[style];
            return map != null ? map[value] : null;
        }
    }, {
        key: 'getTextIterator',
        value: function getTextIterator(style) {
            var list = this._parsable[style];
            return list != null ? list[Symbol.iterator]() : null;
        }
    }]);

    return LocaleStore;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WeekFields = exports.ComputedDayOfField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports._init = _init;

var _jsJoda = __webpack_require__(0);

var _cldrData = __webpack_require__(1);

var _cldrData2 = _interopRequireDefault(_cldrData);

var _cldrjs = __webpack_require__(2);

var _cldrjs2 = _interopRequireDefault(_cldrjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtil = _jsJoda._.MathUtil,
    _jodaInternal$assert = _jsJoda._.assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;

var DAY_OF_WEEK_RANGE = _jsJoda.ValueRange.of(1, 7);
var WEEK_OF_MONTH_RANGE = _jsJoda.ValueRange.of(0, 1, 4, 6);
var WEEK_OF_YEAR_RANGE = _jsJoda.ValueRange.of(0, 1, 52, 54);
var WEEK_OF_WEEK_BASED_YEAR_RANGE = _jsJoda.ValueRange.of(1, 52, 53);
var WEEK_BASED_YEAR_RANGE = _jsJoda.ChronoField.YEAR.range();

var _weekDayMap = {
    'mon': _jsJoda.DayOfWeek.MONDAY,
    'tue': _jsJoda.DayOfWeek.TUESDAY,
    'wed': _jsJoda.DayOfWeek.WEDNESDAY,
    'thu': _jsJoda.DayOfWeek.THURSDAY,
    'fri': _jsJoda.DayOfWeek.FRIDAY,
    'sat': _jsJoda.DayOfWeek.SATURDAY,
    'sun': _jsJoda.DayOfWeek.SUNDAY
};

var ComputedDayOfField = exports.ComputedDayOfField = function () {
    _createClass(ComputedDayOfField, null, [{
        key: 'ofDayOfWeekField',
        value: function ofDayOfWeekField(weekDef) {
            return new ComputedDayOfField('DayOfWeek', weekDef, _jsJoda.ChronoUnit.DAYS, _jsJoda.ChronoUnit.WEEKS, DAY_OF_WEEK_RANGE);
        }
    }, {
        key: 'ofWeekOfMonthField',
        value: function ofWeekOfMonthField(weekDef) {
            return new ComputedDayOfField('WeekOfMonth', weekDef, _jsJoda.ChronoUnit.WEEKS, _jsJoda.ChronoUnit.MONTHS, WEEK_OF_MONTH_RANGE);
        }
    }, {
        key: 'ofWeekOfYearField',
        value: function ofWeekOfYearField(weekDef) {
            return new ComputedDayOfField('WeekOfYear', weekDef, _jsJoda.ChronoUnit.WEEKS, _jsJoda.ChronoUnit.YEARS, WEEK_OF_YEAR_RANGE);
        }
    }, {
        key: 'ofWeekOfWeekBasedYearField',
        value: function ofWeekOfWeekBasedYearField(weekDef) {
            return new ComputedDayOfField('WeekOfWeekBasedYear', weekDef, _jsJoda.ChronoUnit.WEEKS, _jsJoda.IsoFields.WEEK_BASED_YEARS, WEEK_OF_WEEK_BASED_YEAR_RANGE);
        }
    }, {
        key: 'ofWeekBasedYearField',
        value: function ofWeekBasedYearField(weekDef) {
            return new ComputedDayOfField('WeekBasedYear', weekDef, _jsJoda.IsoFields.WEEK_BASED_YEARS, _jsJoda.ChronoUnit.FOREVER, WEEK_BASED_YEAR_RANGE);
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
        key: 'getFrom',
        value: function getFrom(temporal) {
            var sow = this._weekDef.firstDayOfWeek().value();
            var dow = this._localizedDayOfWeek(temporal, sow);

            if (this._rangeUnit === _jsJoda.ChronoUnit.WEEKS) {
                return dow;
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.MONTHS) {
                return this._localizedWeekOfMonth(temporal, dow);
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.YEARS) {
                return this._localizedWeekOfYear(temporal, dow);
            } else if (this._rangeUnit === _jsJoda.IsoFields.WEEK_BASED_YEARS) {
                return this._localizedWOWBY(temporal);
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.FOREVER) {
                return this._localizedWBY(temporal);
            } else {
                throw new _jsJoda.IllegalStateException('unreachable');
            }
        }
    }, {
        key: '_localizedDayOfWeek',
        value: function _localizedDayOfWeek(temporal, sow) {
            var isoDow = temporal.get(_jsJoda.ChronoField.DAY_OF_WEEK);
            return MathUtil.floorMod(isoDow - sow, 7) + 1;
        }
    }, {
        key: '_localizedWeekOfMonth',
        value: function _localizedWeekOfMonth(temporal, dow) {
            var dom = temporal.get(_jsJoda.ChronoField.DAY_OF_MONTH);
            var offset = this._startOfWeekOffset(dom, dow);
            return ComputedDayOfField._computeWeek(offset, dom);
        }
    }, {
        key: '_localizedWeekOfYear',
        value: function _localizedWeekOfYear(temporal, dow) {
            var doy = temporal.get(_jsJoda.ChronoField.DAY_OF_YEAR);
            var offset = this._startOfWeekOffset(doy, dow);
            return ComputedDayOfField._computeWeek(offset, doy);
        }
    }, {
        key: '_localizedWOWBY',
        value: function _localizedWOWBY(temporal) {
            var sow = this._weekDef.firstDayOfWeek().value();
            var isoDow = temporal.get(_jsJoda.ChronoField.DAY_OF_WEEK);
            var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
            var woy = this._localizedWeekOfYear(temporal, dow);
            if (woy === 0) {
                var previous = _jsJoda.LocalDate.from(temporal).minus(1, _jsJoda.ChronoUnit.WEEKS);
                return this._localizedWeekOfYear(previous, dow) + 1;
            } else if (woy >= 53) {
                var offset = this._startOfWeekOffset(temporal.get(_jsJoda.ChronoField.DAY_OF_YEAR), dow);
                var year = temporal.get(_jsJoda.ChronoField.YEAR);
                var yearLen = _jsJoda.Year.isLeap(year) ? 366 : 365;
                var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
                if (woy >= weekIndexOfFirstWeekNextYear) {
                    return woy - (weekIndexOfFirstWeekNextYear - 1);
                }
            }
            return woy;
        }
    }, {
        key: '_localizedWBY',
        value: function _localizedWBY(temporal) {
            var sow = this._weekDef.firstDayOfWeek().value();
            var isoDow = temporal.get(_jsJoda.ChronoField.DAY_OF_WEEK);
            var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
            var year = temporal.get(_jsJoda.ChronoField.YEAR);
            var woy = this._localizedWeekOfYear(temporal, dow);
            if (woy === 0) {
                return year - 1;
            } else if (woy < 53) {
                return year;
            }
            var offset = this._startOfWeekOffset(temporal.get(_jsJoda.ChronoField.DAY_OF_YEAR), dow);
            var yearLen = _jsJoda.Year.isLeap(year) ? 366 : 365;
            var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
            if (woy >= weekIndexOfFirstWeekNextYear) {
                return year + 1;
            }
            return year;
        }
    }, {
        key: '_startOfWeekOffset',
        value: function _startOfWeekOffset(day, dow) {
            var weekStart = MathUtil.floorMod(day - dow, 7);
            var offset = -weekStart;
            if (weekStart + 1 > this._weekDef.minimalDaysInFirstWeek()) {
                offset = 7 - weekStart;
            }
            return offset;
        }
    }, {
        key: 'adjustInto',
        value: function adjustInto(temporal, newValue) {
            var newVal = this._range.checkValidIntValue(newValue, this);
            var currentVal = temporal.get(this);
            if (newVal === currentVal) {
                return temporal;
            }
            if (this._rangeUnit === _jsJoda.ChronoUnit.FOREVER) {
                var baseWowby = temporal.get(this._weekDef.weekOfWeekBasedYear());
                var diffWeeks = MathUtil.roundDown((newValue - currentVal) * 52.1775);
                var result = temporal.plus(diffWeeks, _jsJoda.ChronoUnit.WEEKS);
                if (result.get(this) > newVal) {
                    var newWowby = result.get(this._weekDef.weekOfWeekBasedYear());
                    result = result.minus(newWowby, _jsJoda.ChronoUnit.WEEKS);
                } else {
                    if (result.get(this) < newVal) {
                        result = result.plus(2, _jsJoda.ChronoUnit.WEEKS);
                    }

                    var _newWowby = result.get(this._weekDef.weekOfWeekBasedYear());
                    result = result.plus(baseWowby - _newWowby, _jsJoda.ChronoUnit.WEEKS);
                    if (result.get(this) > newVal) {
                        result = result.minus(1, _jsJoda.ChronoUnit.WEEKS);
                    }
                }
                return result;
            }

            var delta = newVal - currentVal;
            return temporal.plus(delta, this._baseUnit);
        }
    }, {
        key: 'resolve',
        value: function resolve(fieldValues, partialTemporal, resolverStyle) {
            var sow = this._weekDef.firstDayOfWeek().value();
            if (this._rangeUnit === _jsJoda.ChronoUnit.WEEKS) {
                var value = fieldValues.remove(this);
                var localDow = this._range.checkValidIntValue(value, this);
                var _isoDow = MathUtil.floorMod(sow - 1 + (localDow - 1), 7) + 1;
                fieldValues.put(_jsJoda.ChronoField.DAY_OF_WEEK, _isoDow);
                return null;
            }
            if (fieldValues.containsKey(_jsJoda.ChronoField.DAY_OF_WEEK) === false) {
                return null;
            }

            if (this._rangeUnit === _jsJoda.ChronoUnit.FOREVER) {
                if (fieldValues.containsKey(this._weekDef.weekOfWeekBasedYear()) === false) {
                    return null;
                }

                var _isoDow2 = _jsJoda.ChronoField.DAY_OF_WEEK.checkValidIntValue(fieldValues.get(_jsJoda.ChronoField.DAY_OF_WEEK));
                var _dow = MathUtil.floorMod(_isoDow2 - sow, 7) + 1;
                var wby = this.range().checkValidIntValue(fieldValues.get(this), this);
                var date = void 0;
                var days = void 0;
                if (resolverStyle === _jsJoda.ResolverStyle.LENIENT) {
                    date = _jsJoda.LocalDate.of(wby, 1, this._weekDef.minimalDaysInFirstWeek());
                    var wowby = fieldValues.get(this._weekDef.weekOfWeekBasedYear());
                    var dateDow = this._localizedDayOfWeek(date, sow);
                    var weeks = wowby - this._localizedWeekOfYear(date, dateDow);
                    days = weeks * 7 + (_dow - dateDow);
                } else {
                    date = _jsJoda.LocalDate.of(wby, 1, this._weekDef.minimalDaysInFirstWeek());
                    var _wowby = this._weekDef.weekOfWeekBasedYear().range().checkValidIntValue(fieldValues.get(this._weekDef.weekOfWeekBasedYear()), this._weekDef.weekOfWeekBasedYear);
                    var _dateDow = this._localizedDayOfWeek(date, sow);
                    var _weeks = _wowby - this._localizedWeekOfYear(date, _dateDow);
                    days = _weeks * 7 + (_dow - _dateDow);
                }
                date = date.plus(days, _jsJoda.ChronoUnit.DAYS);
                if (resolverStyle === _jsJoda.ResolverStyle.STRICT) {
                    if (date.getLong(this) !== fieldValues.get(this)) {
                        throw new _jsJoda.DateTimeException('Strict mode rejected date parsed to a different year');
                    }
                }
                fieldValues.remove(this);
                fieldValues.remove(this._weekDef.weekOfWeekBasedYear());
                fieldValues.remove(_jsJoda.ChronoField.DAY_OF_WEEK);
                return date;
            }

            if (fieldValues.containsKey(_jsJoda.ChronoField.YEAR) === false) {
                return null;
            }
            var isoDow = _jsJoda.ChronoField.DAY_OF_WEEK.checkValidIntValue(fieldValues.get(_jsJoda.ChronoField.DAY_OF_WEEK));
            var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
            var year = _jsJoda.ChronoField.YEAR.checkValidIntValue(fieldValues.get(_jsJoda.ChronoField.YEAR));

            if (this._rangeUnit === _jsJoda.ChronoUnit.MONTHS) {
                if (fieldValues.containsKey(_jsJoda.ChronoField.MONTH_OF_YEAR) === false) {
                    return null;
                }
                var _value = fieldValues.remove(this);
                var _date = void 0;
                var _days = void 0;
                if (resolverStyle === _jsJoda.ResolverStyle.LENIENT) {
                    var month = fieldValues.get(_jsJoda.ChronoField.MONTH_OF_YEAR);
                    _date = _jsJoda.LocalDate.of(year, 1, 1);
                    _date = _date.plus(month - 1, _jsJoda.ChronoUnit.MONTHS);
                    var _dateDow2 = this._localizedDayOfWeek(_date, sow);
                    var _weeks2 = _value - this._localizedWeekOfMonth(_date, _dateDow2);
                    _days = _weeks2 * 7 + (dow - _dateDow2);
                } else {
                    var _month = _jsJoda.ChronoField.MONTH_OF_YEAR.checkValidIntValue(fieldValues.get(_jsJoda.ChronoField.MONTH_OF_YEAR));
                    _date = _jsJoda.LocalDate.of(year, _month, 8);
                    var _dateDow3 = this._localizedDayOfWeek(_date, sow);
                    var wom = this._range.checkValidIntValue(_value, this);
                    var _weeks3 = wom - this._localizedWeekOfMonth(_date, _dateDow3);
                    _days = _weeks3 * 7 + (dow - _dateDow3);
                }
                _date = _date.plus(_days, _jsJoda.ChronoUnit.DAYS);
                if (resolverStyle === _jsJoda.ResolverStyle.STRICT) {
                    if (_date.getLong(_jsJoda.ChronoField.MONTH_OF_YEAR) !== fieldValues.get(_jsJoda.ChronoField.MONTH_OF_YEAR)) {
                        throw new _jsJoda.DateTimeException('Strict mode rejected date parsed to a different month');
                    }
                }
                fieldValues.remove(this);
                fieldValues.remove(_jsJoda.ChronoField.YEAR);
                fieldValues.remove(_jsJoda.ChronoField.MONTH_OF_YEAR);
                fieldValues.remove(_jsJoda.ChronoField.DAY_OF_WEEK);
                return _date;
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.YEARS) {
                var _value2 = fieldValues.remove(this);
                var _date2 = _jsJoda.LocalDate.of(year, 1, 1);
                var _days2 = void 0;
                if (resolverStyle === _jsJoda.ResolverStyle.LENIENT) {
                    var _dateDow4 = this._localizedDayOfWeek(_date2, sow);
                    var _weeks4 = _value2 - this._localizedWeekOfYear(_date2, _dateDow4);
                    _days2 = _weeks4 * 7 + (dow - _dateDow4);
                } else {
                    var _dateDow5 = this._localizedDayOfWeek(_date2, sow);
                    var woy = this._range.checkValidIntValue(_value2, this);
                    var _weeks5 = woy - this._localizedWeekOfYear(_date2, _dateDow5);
                    _days2 = _weeks5 * 7 + (dow - _dateDow5);
                }
                _date2 = _date2.plus(_days2, _jsJoda.ChronoUnit.DAYS);
                if (resolverStyle === _jsJoda.ResolverStyle.STRICT) {
                    if (_date2.getLong(_jsJoda.ChronoField.YEAR) !== fieldValues.get(_jsJoda.ChronoField.YEAR)) {
                        throw new _jsJoda.DateTimeException('Strict mode rejected date parsed to a different year');
                    }
                }
                fieldValues.remove(this);
                fieldValues.remove(_jsJoda.ChronoField.YEAR);
                fieldValues.remove(_jsJoda.ChronoField.DAY_OF_WEEK);
                return _date2;
            } else {
                throw new _jsJoda.IllegalStateException('unreachable');
            }
        }
    }, {
        key: 'name',
        value: function name() {
            return this._name;
        }
    }, {
        key: 'baseUnit',
        value: function baseUnit() {
            return this._baseUnit;
        }
    }, {
        key: 'rangeUnit',
        value: function rangeUnit() {
            return this._rangeUnit;
        }
    }, {
        key: 'range',
        value: function range() {
            return this._range;
        }
    }, {
        key: 'isDateBased',
        value: function isDateBased() {
            return true;
        }
    }, {
        key: 'isTimeBased',
        value: function isTimeBased() {
            return false;
        }
    }, {
        key: 'isSupportedBy',
        value: function isSupportedBy(temporal) {
            if (temporal.isSupported(_jsJoda.ChronoField.DAY_OF_WEEK)) {
                if (this._rangeUnit === _jsJoda.ChronoUnit.WEEKS) {
                    return true;
                } else if (this._rangeUnit === _jsJoda.ChronoUnit.MONTHS) {
                    return temporal.isSupported(_jsJoda.ChronoField.DAY_OF_MONTH);
                } else if (this._rangeUnit === _jsJoda.ChronoUnit.YEARS) {
                    return temporal.isSupported(_jsJoda.ChronoField.DAY_OF_YEAR);
                } else if (this._rangeUnit === _jsJoda.IsoFields.WEEK_BASED_YEARS) {
                    return temporal.isSupported(_jsJoda.ChronoField.EPOCH_DAY);
                } else if (this._rangeUnit === _jsJoda.ChronoUnit.FOREVER) {
                    return temporal.isSupported(_jsJoda.ChronoField.EPOCH_DAY);
                }
            }
            return false;
        }
    }, {
        key: 'rangeRefinedBy',
        value: function rangeRefinedBy(temporal) {
            if (this._rangeUnit === _jsJoda.ChronoUnit.WEEKS) {
                return this._range;
            }

            var field = null;
            if (this._rangeUnit === _jsJoda.ChronoUnit.MONTHS) {
                field = _jsJoda.ChronoField.DAY_OF_MONTH;
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.YEARS) {
                field = _jsJoda.ChronoField.DAY_OF_YEAR;
            } else if (this._rangeUnit === _jsJoda.IsoFields.WEEK_BASED_YEARS) {
                return this._rangeWOWBY(temporal);
            } else if (this._rangeUnit === _jsJoda.ChronoUnit.FOREVER) {
                return temporal.range(_jsJoda.ChronoField.YEAR);
            } else {
                throw new _jsJoda.IllegalStateException('unreachable');
            }

            var sow = this._weekDef.firstDayOfWeek().value();
            var isoDow = temporal.get(_jsJoda.ChronoField.DAY_OF_WEEK);
            var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;

            var offset = this._startOfWeekOffset(temporal.get(field), dow);
            var fieldRange = temporal.range(field);
            return _jsJoda.ValueRange.of(ComputedDayOfField._computeWeek(offset, fieldRange.minimum()), ComputedDayOfField._computeWeek(offset, fieldRange.maximum()));
        }
    }, {
        key: '_rangeWOWBY',
        value: function _rangeWOWBY(temporal) {
            var sow = this._weekDef.firstDayOfWeek().value();
            var isoDow = temporal.get(_jsJoda.ChronoField.DAY_OF_WEEK);
            var dow = MathUtil.floorMod(isoDow - sow, 7) + 1;
            var woy = this._localizedWeekOfYear(temporal, dow);
            if (woy === 0) {
                return this._rangeWOWBY(_jsJoda.IsoChronology.INSTANCE.date(temporal).minus(2, _jsJoda.ChronoUnit.WEEKS));
            }
            var offset = this._startOfWeekOffset(temporal.get(_jsJoda.ChronoField.DAY_OF_YEAR), dow);
            var year = temporal.get(_jsJoda.ChronoField.YEAR);
            var yearLen = _jsJoda.Year.isLeap(year) ? 366 : 365;
            var weekIndexOfFirstWeekNextYear = ComputedDayOfField._computeWeek(offset, yearLen + this._weekDef.minimalDaysInFirstWeek());
            if (woy >= weekIndexOfFirstWeekNextYear) {
                return this._rangeWOWBY(_jsJoda.IsoChronology.INSTANCE.date(temporal).plus(2, _jsJoda.ChronoUnit.WEEKS));
            }
            return _jsJoda.ValueRange.of(1, weekIndexOfFirstWeekNextYear - 1);
        }
    }, {
        key: 'getDisplayName',
        value: function getDisplayName(locale) {
            requireNonNull(locale, 'locale');
            if (this._rangeUnit === _jsJoda.ChronoUnit.YEARS) {
                return 'Week';
            }
            return this.toString();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this._name + '[' + this._weekDef.toString() + ']';
        }
    }], [{
        key: '_computeWeek',
        value: function _computeWeek(offset, day) {
            return MathUtil.intDiv(7 + offset + (day - 1), 7);
        }
    }]);

    return ComputedDayOfField;
}();

var WeekFieldsCache = new Map();

var WeekFields = exports.WeekFields = function () {
    _createClass(WeekFields, null, [{
        key: 'of',
        value: function of(firstDayOrLocale, minDays) {
            if (minDays === undefined) {
                return WeekFields.ofLocale(firstDayOrLocale);
            } else {
                return WeekFields.ofFirstDayOfWeekMinDays(firstDayOrLocale, minDays);
            }
        }
    }, {
        key: 'ofLocale',
        value: function ofLocale(locale) {
            requireNonNull(locale, 'locale');

            _cldrjs2.default.load((0, _cldrData2.default)('supplemental/weekData.json'));
            var cldr = new _cldrjs2.default(locale.localeString());
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
        key: 'ofFirstDayOfWeekMinDays',
        value: function ofFirstDayOfWeekMinDays(firstDayOfWeek, minimalDaysInFirstWeek) {
            requireNonNull(firstDayOfWeek, 'firstDayOfWeek');
            requireInstance(firstDayOfWeek, _jsJoda.DayOfWeek, 'firstDayOfWeek');
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
        requireInstance(firstDayOfWeek, _jsJoda.DayOfWeek, 'firstDayOfWeek');
        requireNonNull(minimalDaysInFirstWeek, 'minimalDaysInFirstWeek');
        if (minimalDaysInFirstWeek < 1 || minimalDaysInFirstWeek > 7) {
            throw new _jsJoda.IllegalArgumentException('Minimal number of days is invalid');
        }
        this._firstDayOfWeek = firstDayOfWeek;
        this._minimalDays = minimalDaysInFirstWeek;
        this._dayOfWeek = ComputedDayOfField.ofDayOfWeekField(this);
        this._weekOfMonth = ComputedDayOfField.ofWeekOfMonthField(this);
        this._weekOfYear = ComputedDayOfField.ofWeekOfYearField(this);
        this._weekOfWeekBasedYear = ComputedDayOfField.ofWeekOfWeekBasedYearField(this);
        this._weekBasedYear = ComputedDayOfField.ofWeekBasedYearField(this);
        _cldrjs2.default.load((0, _cldrData2.default)('supplemental/likelySubtags.json'));
    }

    _createClass(WeekFields, [{
        key: 'firstDayOfWeek',
        value: function firstDayOfWeek() {
            return this._firstDayOfWeek;
        }
    }, {
        key: 'minimalDaysInFirstWeek',
        value: function minimalDaysInFirstWeek() {
            return this._minimalDays;
        }
    }, {
        key: 'dayOfWeek',
        value: function dayOfWeek() {
            return this._dayOfWeek;
        }
    }, {
        key: 'weekOfMonth',
        value: function weekOfMonth() {
            return this._weekOfMonth;
        }
    }, {
        key: 'weekOfYear',
        value: function weekOfYear() {
            return this._weekOfYear;
        }
    }, {
        key: 'weekOfWeekBasedYear',
        value: function weekOfWeekBasedYear() {
            return this._weekOfWeekBasedYear;
        }
    }, {
        key: 'weekBasedYear',
        value: function weekBasedYear() {
            return this._weekBasedYear;
        }
    }, {
        key: 'equals',
        value: function equals(object) {
            if (this === object) {
                return true;
            }
            if (object instanceof WeekFields) {
                return this.hashCode() === object.hashCode();
            }
            return false;
        }
    }, {
        key: 'hashCode',
        value: function hashCode() {
            return this._firstDayOfWeek.ordinal() * 7 + this._minimalDays;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'WeekFields[' + this._firstDayOfWeek + ',' + this._minimalDays + ']';
        }
    }]);

    return WeekFields;
}();

function _init() {
    WeekFields.ISO = WeekFields.of(_jsJoda.DayOfWeek.MONDAY, 4);

    WeekFields.SUNDAY_START = WeekFields.of(_jsJoda.DayOfWeek.SUNDAY, 1);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plug = __webpack_require__(8);

var _plug2 = _interopRequireDefault(_plug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _plug2.default; /*
                                   * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                   * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                   */

module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (jsJoda) {
    Object.getOwnPropertyNames(_CldrDateTimeFormatterBuilder2.default.prototype).forEach(function (prop) {
        if (prop !== 'constructor') {
            jsJoda.DateTimeFormatterBuilder.prototype[prop] = _CldrDateTimeFormatterBuilder2.default.prototype[prop];
        }
    });

    Object.getOwnPropertyNames(_LocaleDateTimeFormatter2.default.prototype).forEach(function (prop) {
        if (prop !== 'constructor') {
            jsJoda.DateTimeFormatter.prototype[prop] = _LocaleDateTimeFormatter2.default.prototype[prop];
        }
    });

    jsJoda.Locale = _Locale2.default;
};

var _CldrDateTimeFormatterBuilder = __webpack_require__(9);

var _CldrDateTimeFormatterBuilder2 = _interopRequireDefault(_CldrDateTimeFormatterBuilder);

var _LocaleDateTimeFormatter = __webpack_require__(14);

var _LocaleDateTimeFormatter2 = _interopRequireDefault(_LocaleDateTimeFormatter);

var _Locale = __webpack_require__(3);

var _Locale2 = _interopRequireDefault(_Locale);

__webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; /*
                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                      */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsJoda = __webpack_require__(0);

var _TextPrinterParser = __webpack_require__(10);

var _TextPrinterParser2 = _interopRequireDefault(_TextPrinterParser);

var _CldrDateTimeTextProvider = __webpack_require__(4);

var _CldrDateTimeTextProvider2 = _interopRequireDefault(_CldrDateTimeTextProvider);

var _CldrZoneTextPrinterParser = __webpack_require__(11);

var _CldrZoneTextPrinterParser2 = _interopRequireDefault(_CldrZoneTextPrinterParser);

var _LocaleStore = __webpack_require__(5);

var _LocalizedOffsetPrinterParser = __webpack_require__(12);

var _LocalizedOffsetPrinterParser2 = _interopRequireDefault(_LocalizedOffsetPrinterParser);

var _WeekFieldsPrinterParser = __webpack_require__(13);

var _WeekFieldsPrinterParser2 = _interopRequireDefault(_WeekFieldsPrinterParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _jodaInternal$assert = _jsJoda._.assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;

var CldrDateTimeFormatterBuilder = function (_DateTimeFormatterBui) {
    _inherits(CldrDateTimeFormatterBuilder, _DateTimeFormatterBui);

    function CldrDateTimeFormatterBuilder() {
        _classCallCheck(this, CldrDateTimeFormatterBuilder);

        return _possibleConstructorReturn(this, (CldrDateTimeFormatterBuilder.__proto__ || Object.getPrototypeOf(CldrDateTimeFormatterBuilder)).apply(this, arguments));
    }

    _createClass(CldrDateTimeFormatterBuilder, [{
        key: 'appendText',
        value: function appendText(field, styleOrMap) {
            if (styleOrMap === undefined) {
                return this.appendTextField(field);
            } else if (styleOrMap instanceof _jsJoda.TextStyle) {
                return this.appendTextFieldStyle(field, styleOrMap);
            } else {
                return this.appendTextFieldMap(field, styleOrMap);
            }
        }
    }, {
        key: 'appendTextField',
        value: function appendTextField(field) {
            return this.appendTextFieldStyle(field, _jsJoda.TextStyle.FULL);
        }
    }, {
        key: 'appendTextFieldStyle',
        value: function appendTextFieldStyle(field, textStyle) {
            requireNonNull(field, 'field');
            requireInstance(field, _jsJoda.TemporalField, 'field');
            requireNonNull(textStyle, 'textStyle');
            requireInstance(textStyle, _jsJoda.TextStyle, 'textStyle');
            this._appendInternal(new _TextPrinterParser2.default(field, textStyle, new _CldrDateTimeTextProvider2.default()));
            return this;
        }
    }, {
        key: 'appendTextFieldMap',
        value: function appendTextFieldMap(field, textLookup) {
            requireNonNull(field, 'field');
            requireInstance(field, _jsJoda.ChronoField, 'field');
            requireNonNull(textLookup, 'textLookup');
            var copy = Object.assign({}, textLookup);
            var map = {};
            map[_jsJoda.TextStyle.FULL] = copy;
            var store = new _LocaleStore.LocaleStore(map);
            var provider = {
                getText: function getText(field, value, style) {
                    return store.getText(value, style);
                },
                getTextIterator: function getTextIterator(field, style) {
                    return store.getTextIterator(style);
                }
            };
            this._appendInternal(new _TextPrinterParser2.default(field, _jsJoda.TextStyle.FULL, provider));
            return this;
        }
    }, {
        key: 'appendWeekField',
        value: function appendWeekField(field, count) {
            requireNonNull(field, 'field');
            requireNonNull(count, 'count');
            this._appendInternal(new _WeekFieldsPrinterParser2.default(field, count));
            return this;
        }
    }, {
        key: 'appendZoneText',
        value: function appendZoneText(textStyle) {
            this._appendInternal(new _CldrZoneTextPrinterParser2.default(textStyle));
            return this;
        }
    }, {
        key: 'appendLocalizedOffset',
        value: function appendLocalizedOffset(textStyle) {
            requireNonNull(textStyle, 'textStyle');
            if (textStyle !== _jsJoda.TextStyle.FULL && textStyle !== _jsJoda.TextStyle.SHORT) {
                throw new _jsJoda.IllegalArgumentException('Style must be either full or short');
            }
            this._appendInternal(new _LocalizedOffsetPrinterParser2.default(textStyle));
            return this;
        }
    }]);

    return CldrDateTimeFormatterBuilder;
}(_jsJoda.DateTimeFormatterBuilder);

exports.default = CldrDateTimeFormatterBuilder;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jsJoda = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextPrinterParser = function () {
    function TextPrinterParser(field, textStyle, provider) {
        _classCallCheck(this, TextPrinterParser);

        this._field = field;
        this._textStyle = textStyle;
        this._provider = provider;
    }

    _createClass(TextPrinterParser, [{
        key: 'field',
        value: function field() {
            return this._field;
        }
    }, {
        key: 'textStyle',
        value: function textStyle() {
            return this._textStyle;
        }
    }, {
        key: 'provider',
        value: function provider() {
            return this._provider;
        }
    }, {
        key: 'print',
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
        key: 'parse',
        value: function parse(context, parseText, position) {
            var length = parseText.length;
            if (position < 0 || position > length) {
                throw new _jsJoda.IllegalArgumentException('The position is invalid: ' + position);
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
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
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
        key: '_numberPrinterParser',
        value: function _numberPrinterParser() {
            if (this._currentNumberPrinterParser == null) {
                this._currentNumberPrinterParser = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(this._field, 1, 19, _jsJoda.SignStyle.NORMAL);
            }
            return this._currentNumberPrinterParser;
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this._textStyle === _jsJoda.TextStyle.FULL) {
                return 'Text(' + this._field + ')';
            }
            return 'Text(' + this._field + ',' + this._textStyle + ')';
        }
    }]);

    return TextPrinterParser;
}();

exports.default = TextPrinterParser;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _cldrData = __webpack_require__(1);

var _cldrData2 = _interopRequireDefault(_cldrData);

var _cldrjs = __webpack_require__(2);

var _cldrjs2 = _interopRequireDefault(_cldrjs);

var _jsJoda = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jodaInternal$assert = _jsJoda._.assert,
    requireNonNull = _jodaInternal$assert.requireNonNull,
    requireInstance = _jodaInternal$assert.requireInstance;

var LENGTH_COMPARATOR = function LENGTH_COMPARATOR(str1, str2) {
    var cmp = str2.length - str1.length;
    if (cmp === 0) {
        cmp = str1.localeCompare(str2);
    }
    return cmp;
};

var CldrZoneTextPrinterParser = function () {
    function CldrZoneTextPrinterParser(textStyle) {
        _classCallCheck(this, CldrZoneTextPrinterParser);

        requireNonNull(textStyle, 'textStyle');
        requireInstance(textStyle, _jsJoda.TextStyle, 'textStyle');
        this._textStyle = textStyle;
        _cldrjs2.default.load((0, _cldrData2.default)('supplemental/likelySubtags.json'));
        _cldrjs2.default.load((0, _cldrData2.default)('supplemental/metaZones.json'));
    }

    _createClass(CldrZoneTextPrinterParser, [{
        key: '_resolveZoneIdText',
        value: function _resolveZoneIdText(cldr, zoneId, style, type, mapZones) {
            var zoneData = cldr.main('dates/timeZoneNames/zone/' + zoneId + '/' + style + '/' + type);
            if (zoneData) {
                return zoneData;
            } else {
                var metazoneInfo = cldr.get('supplemental/metaZones/metazoneInfo/timezone/' + zoneId);
                if (metazoneInfo) {
                    var metazone = metazoneInfo[metazoneInfo.length - 1]['usesMetazone']['_mzone'];
                    var metaZoneData = cldr.main('dates/timeZoneNames/metazone/' + metazone + '/' + style + '/' + type);
                    if (metaZoneData) {
                        return metaZoneData;
                    } else {
                        metaZoneData = cldr.main('dates/timeZoneNames/metazone/' + metazone + '/' + style + '/generic');
                        if (!metaZoneData) {
                            metaZoneData = cldr.main('dates/timeZoneNames/metazone/' + metazone + '/' + style + '/standard');
                        }
                        if (metaZoneData) {
                            return metaZoneData;
                        } else {
                            var preferredZone = mapZones[metazone][cldr.attributes.territory];
                            if (preferredZone) {
                                if (preferredZone !== zoneId) {
                                    return this._resolveZoneIdText(cldr, preferredZone, style, type, mapZones);
                                }
                            } else {
                                var goldenZone = mapZones[metazone]['001'];
                                if (goldenZone !== zoneId) {
                                    return this._resolveZoneIdText(cldr, goldenZone, style, type, mapZones);
                                }
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'print',
        value: function print(context, buf) {

            var zone = context.getValueQuery(_jsJoda.TemporalQueries.zoneId());

            if (zone == null) {
                return false;
            }
            if (zone.normalized() instanceof _jsJoda.ZoneOffset) {
                buf.append(zone.id());
                return true;
            }
            var daylight = false;
            var hasDaylightSupport = false;

            var tzType = hasDaylightSupport ? daylight ? 'daylight' : 'standard' : 'generic';
            var tzstyle = this._textStyle.asNormal() === _jsJoda.TextStyle.FULL ? 'long' : 'short';
            _cldrjs2.default.load((0, _cldrData2.default)('main/' + context.locale().localeString() + '/timeZoneNames.json'));
            var cldr = new _cldrjs2.default(context.locale().localeString());
            var mapZones = {};

            cldr.get('supplemental/metaZones/metazones').forEach(function (metaZone) {
                if (metaZone.mapZone) {
                    if (!mapZones[metaZone.mapZone._other]) {
                        mapZones[metaZone.mapZone._other] = {};
                    }
                    mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
                }
            });

            var text = this._resolveZoneIdText(cldr, zone.id(), tzstyle, tzType, mapZones);
            if (text) {
                buf.append(text);
            } else {
                buf.append(zone.id());
            }
            return true;
        }
    }, {
        key: 'parse',
        value: function parse(context, text, position) {
            var ids = {};
            _cldrjs2.default.load((0, _cldrData2.default)('main/' + context.locale().localeString() + '/timeZoneNames.json'));
            var cldr = new _cldrjs2.default(context.locale().localeString());
            var mapZones = {};

            cldr.get('supplemental/metaZones/metazones').forEach(function (metaZone) {
                if (metaZone.mapZone) {
                    if (!mapZones[metaZone.mapZone._other]) {
                        mapZones[metaZone.mapZone._other] = {};
                    }
                    mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
                }
            });
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _jsJoda.ZoneRulesProvider.getAvailableZoneIds()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var id = _step.value;

                    ids[id] = id;
                    var tzstyle = this._textStyle.asNormal() === _jsJoda.TextStyle.FULL ? 'long' : 'short';

                    var genericText = this._resolveZoneIdText(cldr, id, tzstyle, 'generic', mapZones);
                    if (genericText) {
                        ids[genericText] = id;
                    }
                    var standardText = this._resolveZoneIdText(cldr, id, tzstyle, 'standard', mapZones);
                    if (standardText) {
                        ids[standardText] = id;
                    }
                    var daylightText = this._resolveZoneIdText(cldr, id, tzstyle, 'daylight', mapZones);
                    if (daylightText) {
                        ids[daylightText] = id;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
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
                        context.setParsedZone(_jsJoda.ZoneId.of(ids[name]));
                        return position + name.length;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
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
        key: 'toString',
        value: function toString() {
            return 'ZoneText(' + this._textStyle + ')';
        }
    }]);

    return CldrZoneTextPrinterParser;
}();

exports.default = CldrZoneTextPrinterParser;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jsJoda = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtil = _jsJoda._.MathUtil;

var LocalizedOffsetPrinterParser = function () {
    function LocalizedOffsetPrinterParser(textStyle) {
        _classCallCheck(this, LocalizedOffsetPrinterParser);

        this._textStyle = textStyle;
    }

    _createClass(LocalizedOffsetPrinterParser, [{
        key: 'textStyle',
        value: function textStyle() {
            return this._textStyle;
        }
    }, {
        key: 'print',
        value: function print(context, buf) {
            var offsetSecs = context.getValue(_jsJoda.ChronoField.OFFSET_SECONDS);

            if (offsetSecs == null) {
                return false;
            }
            buf.append('GMT');
            if (this._textStyle === _jsJoda.TextStyle.FULL) {
                return new _jsJoda.DateTimeFormatterBuilder.OffsetIdPrinterParser('', '+HH:MM:ss').print(context, buf);
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
        key: 'parse',
        value: function parse(context, text, position) {
            if (context.subSequenceEquals(text, position, 'GMT', 0, 3) === false) {
                return ~position;
            }
            position += 3;
            if (this._textStyle === _jsJoda.TextStyle.FULL) {
                return new _jsJoda.DateTimeFormatterBuilder.OffsetIdPrinterParser('', '+HH:MM:ss').parse(context, text, position);
            }
            var end = text.length;
            if (position === end) {
                return context.setParsedField(_jsJoda.ChronoField.OFFSET_SECONDS, 0, position, position);
            }
            var sign = text.charAt(position);
            if (sign !== '+' && sign !== '-') {
                return context.setParsedField(_jsJoda.ChronoField.OFFSET_SECONDS, 0, position, position);
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
                return context.setParsedField(_jsJoda.ChronoField.OFFSET_SECONDS, _offset, position, position);
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
                return context.setParsedField(_jsJoda.ChronoField.OFFSET_SECONDS, _offset2, position, position);
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
            return context.setParsedField(_jsJoda.ChronoField.OFFSET_SECONDS, offset, position, position);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'LocalizedOffset(' + this._textStyle + ')';
        }
    }]);

    return LocalizedOffsetPrinterParser;
}();

exports.default = LocalizedOffsetPrinterParser;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jsJoda = __webpack_require__(0);

var _WeekFields = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringBuilder = _jsJoda._.StringBuilder;

var WeekFieldsPrinterParser = function () {
    function WeekFieldsPrinterParser(letter, count) {
        _classCallCheck(this, WeekFieldsPrinterParser);

        this._letter = letter;
        this._count = count;
    }

    _createClass(WeekFieldsPrinterParser, [{
        key: 'print',
        value: function print(context, buf) {
            var weekFields = _WeekFields.WeekFields.of(context.locale());
            var pp = this._evaluate(weekFields);
            return pp.print(context, buf);
        }
    }, {
        key: 'parse',
        value: function parse(context, text, position) {
            var weekFields = _WeekFields.WeekFields.of(context.locale());
            var pp = this._evaluate(weekFields);
            return pp.parse(context, text, position);
        }
    }, {
        key: '_evaluate',
        value: function _evaluate(weekFields) {
            var pp = null;
            switch (this._letter) {
                case 'e':
                    pp = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, _jsJoda.SignStyle.NOT_NEGATIVE);
                    break;
                case 'c':
                    pp = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(weekFields.dayOfWeek(), this._count, 2, _jsJoda.SignStyle.NOT_NEGATIVE);
                    break;
                case 'w':
                    pp = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekOfWeekBasedYear(), this._count, 2, _jsJoda.SignStyle.NOT_NEGATIVE);
                    break;
                case 'W':
                    pp = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekOfMonth(), 1, 2, _jsJoda.SignStyle.NOT_NEGATIVE);
                    break;
                case 'Y':
                    if (this._count === 2) {
                        pp = new _jsJoda.DateTimeFormatterBuilder.ReducedPrinterParser(weekFields.weekBasedYear(), 2, 2, 0, _jsJoda.DateTimeFormatterBuilder.ReducedPrinterParser.BASE_DATE);
                    } else {
                        pp = new _jsJoda.DateTimeFormatterBuilder.NumberPrinterParser(weekFields.weekBasedYear(), this._count, 19, this._count < 4 ? _jsJoda.SignStyle.NORMAL : _jsJoda.SignStyle.EXCEEDS_PAD, -1);
                    }
                    break;
            }
            return pp;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var sb = new StringBuilder(30);
            sb.append('Localized(');
            if (this._letter === 'Y') {
                if (this._count === 1) {
                    sb.append('WeekBasedYear');
                } else if (this._count === 2) {
                    sb.append('ReducedValue(WeekBasedYear,2,2,2000-01-01)');
                } else {
                    sb.append('WeekBasedYear,').append(this._count).append(',').append(19).append(',').append(this._count < 4 ? _jsJoda.SignStyle.NORMAL : _jsJoda.SignStyle.EXCEEDS_PAD);
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

exports.default = WeekFieldsPrinterParser;
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsJoda = __webpack_require__(0);

var _Locale = __webpack_require__(3);

var _Locale2 = _interopRequireDefault(_Locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var requireNonNull = _jsJoda._.assert.requireNonNull;

var LocaleDateTimeFormatter = function (_DateTimeFormatter) {
    _inherits(LocaleDateTimeFormatter, _DateTimeFormatter);

    function LocaleDateTimeFormatter() {
        _classCallCheck(this, LocaleDateTimeFormatter);

        return _possibleConstructorReturn(this, (LocaleDateTimeFormatter.__proto__ || Object.getPrototypeOf(LocaleDateTimeFormatter)).apply(this, arguments));
    }

    _createClass(LocaleDateTimeFormatter, [{
        key: 'withLocale',
        value: function withLocale(locale) {
            requireNonNull(locale, 'locale');
            if (locale.equals(this._locale)) {
                return this;
            }
            return new _jsJoda.DateTimeFormatter(this._printerParser, locale, this._decimalStyle, this._resolverStyle, this._resolverFields, this._chrono, this._zone);
        }
    }]);

    return LocaleDateTimeFormatter;
}(_jsJoda.DateTimeFormatter);

exports.default = LocaleDateTimeFormatter;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Locale = __webpack_require__(3);

var _WeekFields = __webpack_require__(6);

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

    (0, _Locale._init)();
    (0, _WeekFields._init)();
}

init();

/***/ })
/******/ ]);
});