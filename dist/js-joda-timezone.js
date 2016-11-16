//! @version js-joda-timezone - 0.0.1
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-joda"));
	else if(typeof define === 'function' && define.amd)
		define(["js-joda"], factory);
	else if(typeof exports === 'object')
		exports["JSJoda"] = factory(require("js-joda"));
	else
		root["JSJoda"] = factory(root["JSJoda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (jsJoda) {
	    jsJoda.ZoneRulesProvider = _MomentZoneRulesProvider.MomentZoneRulesProvider;
	    return jsJoda;
	};

	var _MomentZoneRulesProvider = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MomentZoneRulesProvider = undefined;

	var _jsJoda = __webpack_require__(2);

	var _MomentZoneRules = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MomentZoneRulesProvider = exports.MomentZoneRulesProvider = function (_ZoneRulesProvider) {
	    _inherits(MomentZoneRulesProvider, _ZoneRulesProvider);

	    function MomentZoneRulesProvider() {
	        _classCallCheck(this, MomentZoneRulesProvider);

	        return _possibleConstructorReturn(this, _ZoneRulesProvider.apply(this, arguments));
	    }

	    MomentZoneRulesProvider.getRules = function getRules(zoneId) {
	        return new _MomentZoneRules.MomentZoneRules(zoneId);
	    };

	    MomentZoneRulesProvider.getAvailableZoneIds = function getAvailableZoneIds() {
	        return [];
	    };

	    return MomentZoneRulesProvider;
	}(_jsJoda.ZoneRulesProvider);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MomentZoneRules = undefined;

	var _jsJoda = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MomentZoneRules = exports.MomentZoneRules = function (_ZoneRules) {
	    _inherits(MomentZoneRules, _ZoneRules);

	    function MomentZoneRules(zoneId) {
	        _classCallCheck(this, MomentZoneRules);

	        var _this = _possibleConstructorReturn(this, _ZoneRules.call(this));

	        _this._zoneId = zoneId;
	        return _this;
	    }

	    MomentZoneRules.prototype.isFixedOffset = function isFixedOffset() {
	        return false;
	    };

	    MomentZoneRules.prototype.offset = function offset(instantOrLocalDateTime) {
	        if (instantOrLocalDateTime instanceof _jsJoda.Instant) {
	            return this.offsetOfInstant(instantOrLocalDateTime);
	        } else {
	            return this.offsetOfLocalDateTime(instantOrLocalDateTime);
	        }
	    };

	    MomentZoneRules.prototype.offsetOfInstant = function offsetOfInstant(instant) {
	        tbc('ZoneRules.offsetInstant');
	    };

	    MomentZoneRules.prototype.offsetOfEpochMilli = function offsetOfEpochMilli(epochMilli) {
	        tbc('ZoneRules.offsetOfEpochMilli');
	    };

	    MomentZoneRules.prototype.offsetOfLocalDateTime = function offsetOfLocalDateTime(localDateTime) {
	        tbc('ZoneRules.offsetLocalDateTime');
	    };

	    MomentZoneRules.prototype.validOffsets = function validOffsets(localDateTime) {
	        tbc('ZoneRules.validOffsets');
	    };

	    MomentZoneRules.prototype.transition = function transition(localDateTime) {
	        tbc('ZoneRules.transition');
	    };

	    MomentZoneRules.prototype.standardOffset = function standardOffset(instant) {
	        tbc('ZoneRules.standardOffset');
	    };

	    MomentZoneRules.prototype.daylightSavings = function daylightSavings(instant) {
	        tbc('ZoneRules.daylightSavings');
	    };

	    MomentZoneRules.prototype.isDaylightSavings = function isDaylightSavings(instant) {
	        tbc('ZoneRules.isDaylightSavings');
	    };

	    MomentZoneRules.prototype.isValidOffset = function isValidOffset(localDateTime, offset) {
	        tbc('ZoneRules.isValidOffset');
	    };

	    MomentZoneRules.prototype.nextTransition = function nextTransition(instant) {
	        tbc('ZoneRules.nextTransition');
	    };

	    MomentZoneRules.prototype.previousTransition = function previousTransition(instant) {
	        tbc('ZoneRules.previousTransition');
	    };

	    MomentZoneRules.prototype.transitions = function transitions() {
	        tbc('ZoneRules.transitions');
	    };

	    MomentZoneRules.prototype.transitionRules = function transitionRules() {
	        tbc('ZoneRules.transitionRules');
	    };

	    MomentZoneRules.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof MomentZoneRules) {
	            return this._zoneId === other._zoneId;
	        }
	        return false;
	    };

	    MomentZoneRules.prototype.toString = function toString() {
	        return this._zoneId;
	    };

	    return MomentZoneRules;
	}(_jsJoda.ZoneRules);

	function tbc(msg) {
	    throw new Error('not yet implemented: ' + msg);
	}

/***/ }
/******/ ])
});
;