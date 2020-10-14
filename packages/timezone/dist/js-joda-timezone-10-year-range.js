//! @version @js-joda/timezone-2.3.0-2020a-10-year-range
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-timezone.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/packed/latest-10-year-range.json":
/*!***********************************************!*\
  !*** ./data/packed/latest-10-year-range.json ***!
  \***********************************************/
/*! exports provided: version, zones, links, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"2020a\",\"zones\":[\"Africa/Abidjan|GMT|0|0||48e5\",\"Africa/Nairobi|EAT|-30|0||47e5\",\"Africa/Algiers|CET|-10|0||26e5\",\"Africa/Lagos|WAT|-10|0||17e6\",\"Africa/Maputo|CAT|-20|0||26e5\",\"Africa/Cairo|EET|-20|0||15e6\",\"Africa/Casablanca|+00 +01|0 -10|010101010101010101010101010101|1O9e0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0|32e5\",\"Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6\",\"Africa/Johannesburg|SAST|-20|0||84e5\",\"Africa/Khartoum|EAT CAT|-30 -20|01|1Usl0|51e5\",\"Africa/Sao_Tome|GMT WAT|0 -10|010|1UQN0 2q00\",\"Africa/Windhoek|CAT WAT|-20 -10|0101010|1Oc00 11B0 1nX0 11B0 1nX0 11B0|32e4\",\"America/Adak|HST HDT|a0 90|01010101010101010101010|1O100 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326\",\"America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1O0X0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4\",\"America/Santo_Domingo|AST|40|0||29e5\",\"America/Fortaleza|-03|30|0||34e5\",\"America/Asuncion|-03 -04|30 40|01010101010101010101010|1O6r0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0|28e5\",\"America/Panama|EST|50|0||15e5\",\"America/Mexico_City|CST CDT|60 50|01010101010101010101010|1Oc80 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6\",\"America/Managua|CST|60|0||22e5\",\"America/La_Paz|-04|40|0||19e5\",\"America/Lima|-05|50|0||11e6\",\"America/Denver|MST MDT|70 60|01010101010101010101010|1O0V0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5\",\"America/Campo_Grande|-03 -04|30 40|0101010101|1NTf0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4\",\"America/Cancun|CST EST|60 50|01|1NKU0|63e4\",\"America/Caracas|-0430 -04|4u 40|01|1QMT0|29e5\",\"America/Chicago|CST CDT|60 50|01010101010101010101010|1O0U0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5\",\"America/Chihuahua|MST MDT|70 60|01010101010101010101010|1Oc90 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4\",\"America/Phoenix|MST|70|0||42e5\",\"America/Whitehorse|PST PDT MST|80 70 70|010101010102|1O0W0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|23e3\",\"America/New_York|EST EDT|50 40|01010101010101010101010|1O0T0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6\",\"America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1O0W0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6\",\"America/Fort_Nelson|PST MST|80 70|01|1O0W0|39e2\",\"America/Halifax|AST ADT|40 30|01010101010101010101010|1O0S0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4\",\"America/Godthab|-03 -02|30 20|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3\",\"America/Grand_Turk|EST EDT AST|50 40 40|0121010101010101010|1O0T0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2\",\"America/Havana|CST CDT|50 40|01010101010101010101010|1O0R0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5\",\"America/Metlakatla|PST AKST AKDT|80 90 80|01212120121212121212121|1PAa0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2\",\"America/Miquelon|-03 -02|30 20|01010101010101010101010|1O0R0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2\",\"America/Montevideo|-02 -03|20 30|01|1O0Q0|17e5\",\"America/Noronha|-02|20|0||30e2\",\"America/Port-au-Prince|EST EDT|50 40|010101010101010101010|1O0T0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5\",\"Antarctica/Palmer|-03 -04|30 40|010|1QSr0 Ap0|40\",\"America/Santiago|-03 -04|30 40|010101010101010101010|1QSr0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0|62e5\",\"America/Sao_Paulo|-02 -03|20 30|0101010101|1NTe0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6\",\"Atlantic/Azores|-01 +00|10 0|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4\",\"America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1O0Ru 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4\",\"Antarctica/Casey|+08 +11|-80 -b0|010|1RWg0 3m10|10\",\"Asia/Bangkok|+07|-70|0||15e6\",\"Asia/Vladivostok|+10|-a0|0||60e4\",\"Pacific/Bougainville|+11|-b0|0||18e4\",\"Asia/Tashkent|+05|-50|0||23e5\",\"Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1ObO0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00|14e5\",\"Asia/Baghdad|+03|-30|0||66e5\",\"Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40\",\"Asia/Dhaka|+06|-60|0||16e6\",\"Asia/Amman|EET EEST|-20 -30|01010101010101010101010|1O8m0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|25e5\",\"Asia/Kamchatka|+12|-c0|0||18e4\",\"Asia/Baku|+04 +05|-40 -50|010|1O9c0 1o00|27e5\",\"Asia/Barnaul|+06 +07|-60 -70|01|1QyI0\",\"Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1O9a0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5\",\"Asia/Kuala_Lumpur|+08|-80|0||71e5\",\"Asia/Kolkata|IST|-5u|0||15e6\",\"Asia/Chita|+08 +09|-80 -90|01|1QyG0|33e4\",\"Asia/Ulaanbaatar|+08 +09|-80 -90|01010|1O8G0 1cJ0 1cP0 1cJ0|12e5\",\"Asia/Shanghai|CST|-80|0||23e6\",\"Asia/Colombo|+0530|-5u|0||22e5\",\"Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1O8m0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|26e5\",\"Asia/Yakutsk|+09|-90|0||28e4\",\"Asia/Dubai|+04|-40|0||39e5\",\"Asia/Famagusta|EET EEST +03|-20 -30 -30|0101201010101010101010|1O9d0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00\",\"Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1O8K0 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0|18e5\",\"Asia/Hong_Kong|HKT|-80|0||73e5\",\"Asia/Hovd|+07 +08|-70 -80|01010|1O8H0 1cJ0 1cP0 1cJ0|81e3\",\"Europe/Istanbul|EET EEST +03|-20 -30 -30|01012|1O9d0 1tA0 U00 15w0|13e6\",\"Asia/Jakarta|WIB|-70|0||31e6\",\"Asia/Jayapura|WIT|-90|0||26e4\",\"Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1O8o0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4\",\"Asia/Kabul|+0430|-4u|0||46e5\",\"Asia/Karachi|PKT|-50|0||24e6\",\"Asia/Kathmandu|+0545|-5J|0||12e5\",\"Asia/Magadan|+10 +11|-a0 -b0|01|1QJQ0|95e3\",\"Asia/Makassar|WITA|-80|0||15e5\",\"Asia/Manila|PST|-80|0||24e6\",\"Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5\",\"Asia/Novosibirsk|+06 +07|-60 -70|01|1Rmk0|15e5\",\"Asia/Pyongyang|KST KST|-90 -8u|010|1P4D0 6BA0|29e5\",\"Asia/Qyzylorda|+06 +05|-60 -50|01|1Xei0|73e4\",\"Asia/Rangoon|+0630|-6u|0||48e5\",\"Asia/Sakhalin|+10 +11|-a0 -b0|01|1QyE0|58e4\",\"Asia/Seoul|KST|-90|0||23e6\",\"Asia/Tehran|+0330 +0430|-3u -4u|01010101010101010101010|1O6ku 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0|14e6\",\"Asia/Tokyo|JST|-90|0||38e6\",\"Asia/Tomsk|+06 +07|-60 -70|01|1QXU0|10e5\",\"Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5\",\"Atlantic/Cape_Verde|-01|10|0||50e4\",\"Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1ObQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0|40e5\",\"Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1ObQu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0|11e5\",\"Australia/Brisbane|AEST|-a0|0||20e5\",\"Australia/Darwin|ACST|-9u|0||12e4\",\"Australia/Eucla|+0845|-8J|0||368\",\"Australia/Lord_Howe|+11 +1030|-b0 -au|01010101010101010101010|1ObP0 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu|347\",\"Australia/Perth|AWST|-80|0||18e5\",\"Pacific/Easter|-05 -06|50 60|010101010101010101010|1QSr0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0|30e2\",\"Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"Etc/GMT-1|+01|-10|0|\",\"Pacific/Fakaofo|+13|-d0|0||483\",\"Pacific/Kiritimati|+14|-e0|0||51e2\",\"Etc/GMT-2|+02|-20|0|\",\"Pacific/Tahiti|-10|a0|0||18e4\",\"Pacific/Niue|-11|b0|0||12e2\",\"Etc/GMT+12|-12|c0|0|\",\"Pacific/Galapagos|-06|60|0||25e3\",\"Etc/GMT+7|-07|70|0|\",\"Pacific/Pitcairn|-08|80|0||56\",\"Pacific/Gambier|-09|90|0||125\",\"Etc/UCT|UTC|0|0|\",\"Europe/Ulyanovsk|+03 +04|-30 -40|01|1QyL0|13e5\",\"Europe/London|GMT BST|0 -10|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6\",\"Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1O9c0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4\",\"Europe/Moscow|MSK|-30|0||16e6\",\"Europe/Saratov|+03 +04|-30 -40|01|1Sfz0\",\"Europe/Volgograd|+03 +04|-30 -40|01|1WQL0|10e5\",\"Pacific/Honolulu|HST|a0|0||37e4\",\"MET|MET MEST|-10 -20|01010101010101010101010|1O9d0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00\",\"Pacific/Chatham|+1345 +1245|-dJ -cJ|01010101010101010101010|1ObO0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00|600\",\"Pacific/Apia|+14 +13|-e0 -d0|01010101010101010101010|1ObO0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00|37e3\",\"Pacific/Fiji|+13 +12|-d0 -c0|01010101010101010101010|1NF20 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0|88e4\",\"Pacific/Guam|ChST|-a0|0||17e4\",\"Pacific/Marquesas|-0930|9u|0||86e2\",\"Pacific/Pago_Pago|SST|b0|0||37e2\",\"Pacific/Norfolk|+1130 +11 +12|-bu -b0 -c0|012121212121212|1PoCu 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0|25e4\",\"Pacific/Tongatapu|+13 +14|-d0 -e0|010|1S4d0 s00|75e3\"],\"links\":[\"Africa/Abidjan|Africa/Accra\",\"Africa/Abidjan|Africa/Bamako\",\"Africa/Abidjan|Africa/Banjul\",\"Africa/Abidjan|Africa/Bissau\",\"Africa/Abidjan|Africa/Conakry\",\"Africa/Abidjan|Africa/Dakar\",\"Africa/Abidjan|Africa/Freetown\",\"Africa/Abidjan|Africa/Lome\",\"Africa/Abidjan|Africa/Monrovia\",\"Africa/Abidjan|Africa/Nouakchott\",\"Africa/Abidjan|Africa/Ouagadougou\",\"Africa/Abidjan|Africa/Timbuktu\",\"Africa/Abidjan|America/Danmarkshavn\",\"Africa/Abidjan|Atlantic/Reykjavik\",\"Africa/Abidjan|Atlantic/St_Helena\",\"Africa/Abidjan|Etc/GMT\",\"Africa/Abidjan|Etc/GMT+0\",\"Africa/Abidjan|Etc/GMT-0\",\"Africa/Abidjan|Etc/GMT0\",\"Africa/Abidjan|Etc/Greenwich\",\"Africa/Abidjan|GMT\",\"Africa/Abidjan|GMT+0\",\"Africa/Abidjan|GMT-0\",\"Africa/Abidjan|GMT0\",\"Africa/Abidjan|Greenwich\",\"Africa/Abidjan|Iceland\",\"Africa/Algiers|Africa/Tunis\",\"Africa/Cairo|Africa/Tripoli\",\"Africa/Cairo|Egypt\",\"Africa/Cairo|Europe/Kaliningrad\",\"Africa/Cairo|Libya\",\"Africa/Casablanca|Africa/El_Aaiun\",\"Africa/Johannesburg|Africa/Maseru\",\"Africa/Johannesburg|Africa/Mbabane\",\"Africa/Lagos|Africa/Bangui\",\"Africa/Lagos|Africa/Brazzaville\",\"Africa/Lagos|Africa/Douala\",\"Africa/Lagos|Africa/Kinshasa\",\"Africa/Lagos|Africa/Libreville\",\"Africa/Lagos|Africa/Luanda\",\"Africa/Lagos|Africa/Malabo\",\"Africa/Lagos|Africa/Ndjamena\",\"Africa/Lagos|Africa/Niamey\",\"Africa/Lagos|Africa/Porto-Novo\",\"Africa/Maputo|Africa/Blantyre\",\"Africa/Maputo|Africa/Bujumbura\",\"Africa/Maputo|Africa/Gaborone\",\"Africa/Maputo|Africa/Harare\",\"Africa/Maputo|Africa/Kigali\",\"Africa/Maputo|Africa/Lubumbashi\",\"Africa/Maputo|Africa/Lusaka\",\"Africa/Nairobi|Africa/Addis_Ababa\",\"Africa/Nairobi|Africa/Asmara\",\"Africa/Nairobi|Africa/Asmera\",\"Africa/Nairobi|Africa/Dar_es_Salaam\",\"Africa/Nairobi|Africa/Djibouti\",\"Africa/Nairobi|Africa/Juba\",\"Africa/Nairobi|Africa/Kampala\",\"Africa/Nairobi|Africa/Mogadishu\",\"Africa/Nairobi|Indian/Antananarivo\",\"Africa/Nairobi|Indian/Comoro\",\"Africa/Nairobi|Indian/Mayotte\",\"America/Adak|America/Atka\",\"America/Adak|US/Aleutian\",\"America/Anchorage|America/Juneau\",\"America/Anchorage|America/Nome\",\"America/Anchorage|America/Sitka\",\"America/Anchorage|America/Yakutat\",\"America/Anchorage|US/Alaska\",\"America/Campo_Grande|America/Cuiaba\",\"America/Chicago|America/Indiana/Knox\",\"America/Chicago|America/Indiana/Tell_City\",\"America/Chicago|America/Knox_IN\",\"America/Chicago|America/Matamoros\",\"America/Chicago|America/Menominee\",\"America/Chicago|America/North_Dakota/Beulah\",\"America/Chicago|America/North_Dakota/Center\",\"America/Chicago|America/North_Dakota/New_Salem\",\"America/Chicago|America/Rainy_River\",\"America/Chicago|America/Rankin_Inlet\",\"America/Chicago|America/Resolute\",\"America/Chicago|America/Winnipeg\",\"America/Chicago|CST6CDT\",\"America/Chicago|Canada/Central\",\"America/Chicago|US/Central\",\"America/Chicago|US/Indiana-Starke\",\"America/Chihuahua|America/Mazatlan\",\"America/Chihuahua|Mexico/BajaSur\",\"America/Denver|America/Boise\",\"America/Denver|America/Cambridge_Bay\",\"America/Denver|America/Edmonton\",\"America/Denver|America/Inuvik\",\"America/Denver|America/Ojinaga\",\"America/Denver|America/Shiprock\",\"America/Denver|America/Yellowknife\",\"America/Denver|Canada/Mountain\",\"America/Denver|MST7MDT\",\"America/Denver|Navajo\",\"America/Denver|US/Mountain\",\"America/Fortaleza|America/Araguaina\",\"America/Fortaleza|America/Argentina/Buenos_Aires\",\"America/Fortaleza|America/Argentina/Catamarca\",\"America/Fortaleza|America/Argentina/ComodRivadavia\",\"America/Fortaleza|America/Argentina/Cordoba\",\"America/Fortaleza|America/Argentina/Jujuy\",\"America/Fortaleza|America/Argentina/La_Rioja\",\"America/Fortaleza|America/Argentina/Mendoza\",\"America/Fortaleza|America/Argentina/Rio_Gallegos\",\"America/Fortaleza|America/Argentina/Salta\",\"America/Fortaleza|America/Argentina/San_Juan\",\"America/Fortaleza|America/Argentina/San_Luis\",\"America/Fortaleza|America/Argentina/Tucuman\",\"America/Fortaleza|America/Argentina/Ushuaia\",\"America/Fortaleza|America/Bahia\",\"America/Fortaleza|America/Belem\",\"America/Fortaleza|America/Buenos_Aires\",\"America/Fortaleza|America/Catamarca\",\"America/Fortaleza|America/Cayenne\",\"America/Fortaleza|America/Cordoba\",\"America/Fortaleza|America/Jujuy\",\"America/Fortaleza|America/Maceio\",\"America/Fortaleza|America/Mendoza\",\"America/Fortaleza|America/Paramaribo\",\"America/Fortaleza|America/Recife\",\"America/Fortaleza|America/Rosario\",\"America/Fortaleza|America/Santarem\",\"America/Fortaleza|Antarctica/Rothera\",\"America/Fortaleza|Atlantic/Stanley\",\"America/Fortaleza|Etc/GMT+3\",\"America/Godthab|America/Nuuk\",\"America/Halifax|America/Glace_Bay\",\"America/Halifax|America/Goose_Bay\",\"America/Halifax|America/Moncton\",\"America/Halifax|America/Thule\",\"America/Halifax|Atlantic/Bermuda\",\"America/Halifax|Canada/Atlantic\",\"America/Havana|Cuba\",\"America/La_Paz|America/Boa_Vista\",\"America/La_Paz|America/Guyana\",\"America/La_Paz|America/Manaus\",\"America/La_Paz|America/Porto_Velho\",\"America/La_Paz|Brazil/West\",\"America/La_Paz|Etc/GMT+4\",\"America/Lima|America/Bogota\",\"America/Lima|America/Eirunepe\",\"America/Lima|America/Guayaquil\",\"America/Lima|America/Porto_Acre\",\"America/Lima|America/Rio_Branco\",\"America/Lima|Brazil/Acre\",\"America/Lima|Etc/GMT+5\",\"America/Los_Angeles|America/Ensenada\",\"America/Los_Angeles|America/Santa_Isabel\",\"America/Los_Angeles|America/Tijuana\",\"America/Los_Angeles|America/Vancouver\",\"America/Los_Angeles|Canada/Pacific\",\"America/Los_Angeles|Mexico/BajaNorte\",\"America/Los_Angeles|PST8PDT\",\"America/Los_Angeles|US/Pacific\",\"America/Los_Angeles|US/Pacific-New\",\"America/Managua|America/Belize\",\"America/Managua|America/Costa_Rica\",\"America/Managua|America/El_Salvador\",\"America/Managua|America/Guatemala\",\"America/Managua|America/Regina\",\"America/Managua|America/Swift_Current\",\"America/Managua|America/Tegucigalpa\",\"America/Managua|Canada/Saskatchewan\",\"America/Mexico_City|America/Bahia_Banderas\",\"America/Mexico_City|America/Merida\",\"America/Mexico_City|America/Monterrey\",\"America/Mexico_City|Mexico/General\",\"America/New_York|America/Detroit\",\"America/New_York|America/Fort_Wayne\",\"America/New_York|America/Indiana/Indianapolis\",\"America/New_York|America/Indiana/Marengo\",\"America/New_York|America/Indiana/Petersburg\",\"America/New_York|America/Indiana/Vevay\",\"America/New_York|America/Indiana/Vincennes\",\"America/New_York|America/Indiana/Winamac\",\"America/New_York|America/Indianapolis\",\"America/New_York|America/Iqaluit\",\"America/New_York|America/Kentucky/Louisville\",\"America/New_York|America/Kentucky/Monticello\",\"America/New_York|America/Louisville\",\"America/New_York|America/Montreal\",\"America/New_York|America/Nassau\",\"America/New_York|America/Nipigon\",\"America/New_York|America/Pangnirtung\",\"America/New_York|America/Thunder_Bay\",\"America/New_York|America/Toronto\",\"America/New_York|Canada/Eastern\",\"America/New_York|EST5EDT\",\"America/New_York|US/East-Indiana\",\"America/New_York|US/Eastern\",\"America/New_York|US/Michigan\",\"America/Noronha|Atlantic/South_Georgia\",\"America/Noronha|Brazil/DeNoronha\",\"America/Noronha|Etc/GMT+2\",\"America/Panama|America/Atikokan\",\"America/Panama|America/Cayman\",\"America/Panama|America/Coral_Harbour\",\"America/Panama|America/Jamaica\",\"America/Panama|EST\",\"America/Panama|Jamaica\",\"America/Phoenix|America/Creston\",\"America/Phoenix|America/Dawson_Creek\",\"America/Phoenix|America/Hermosillo\",\"America/Phoenix|MST\",\"America/Phoenix|US/Arizona\",\"America/Santiago|Chile/Continental\",\"America/Santo_Domingo|America/Anguilla\",\"America/Santo_Domingo|America/Antigua\",\"America/Santo_Domingo|America/Aruba\",\"America/Santo_Domingo|America/Barbados\",\"America/Santo_Domingo|America/Blanc-Sablon\",\"America/Santo_Domingo|America/Curacao\",\"America/Santo_Domingo|America/Dominica\",\"America/Santo_Domingo|America/Grenada\",\"America/Santo_Domingo|America/Guadeloupe\",\"America/Santo_Domingo|America/Kralendijk\",\"America/Santo_Domingo|America/Lower_Princes\",\"America/Santo_Domingo|America/Marigot\",\"America/Santo_Domingo|America/Martinique\",\"America/Santo_Domingo|America/Montserrat\",\"America/Santo_Domingo|America/Port_of_Spain\",\"America/Santo_Domingo|America/Puerto_Rico\",\"America/Santo_Domingo|America/St_Barthelemy\",\"America/Santo_Domingo|America/St_Kitts\",\"America/Santo_Domingo|America/St_Lucia\",\"America/Santo_Domingo|America/St_Thomas\",\"America/Santo_Domingo|America/St_Vincent\",\"America/Santo_Domingo|America/Tortola\",\"America/Santo_Domingo|America/Virgin\",\"America/Sao_Paulo|Brazil/East\",\"America/St_Johns|Canada/Newfoundland\",\"America/Whitehorse|America/Dawson\",\"America/Whitehorse|Canada/Yukon\",\"Antarctica/Palmer|America/Punta_Arenas\",\"Asia/Baghdad|Antarctica/Syowa\",\"Asia/Baghdad|Asia/Aden\",\"Asia/Baghdad|Asia/Bahrain\",\"Asia/Baghdad|Asia/Kuwait\",\"Asia/Baghdad|Asia/Qatar\",\"Asia/Baghdad|Asia/Riyadh\",\"Asia/Baghdad|Etc/GMT-3\",\"Asia/Baghdad|Europe/Kirov\",\"Asia/Baghdad|Europe/Minsk\",\"Asia/Bangkok|Antarctica/Davis\",\"Asia/Bangkok|Asia/Ho_Chi_Minh\",\"Asia/Bangkok|Asia/Krasnoyarsk\",\"Asia/Bangkok|Asia/Novokuznetsk\",\"Asia/Bangkok|Asia/Phnom_Penh\",\"Asia/Bangkok|Asia/Saigon\",\"Asia/Bangkok|Asia/Vientiane\",\"Asia/Bangkok|Etc/GMT-7\",\"Asia/Bangkok|Indian/Christmas\",\"Asia/Dhaka|Antarctica/Vostok\",\"Asia/Dhaka|Asia/Almaty\",\"Asia/Dhaka|Asia/Bishkek\",\"Asia/Dhaka|Asia/Dacca\",\"Asia/Dhaka|Asia/Kashgar\",\"Asia/Dhaka|Asia/Omsk\",\"Asia/Dhaka|Asia/Qostanay\",\"Asia/Dhaka|Asia/Thimbu\",\"Asia/Dhaka|Asia/Thimphu\",\"Asia/Dhaka|Asia/Urumqi\",\"Asia/Dhaka|Etc/GMT-6\",\"Asia/Dhaka|Indian/Chagos\",\"Asia/Dubai|Asia/Muscat\",\"Asia/Dubai|Asia/Tbilisi\",\"Asia/Dubai|Asia/Yerevan\",\"Asia/Dubai|Etc/GMT-4\",\"Asia/Dubai|Europe/Samara\",\"Asia/Dubai|Indian/Mahe\",\"Asia/Dubai|Indian/Mauritius\",\"Asia/Dubai|Indian/Reunion\",\"Asia/Gaza|Asia/Hebron\",\"Asia/Hong_Kong|Hongkong\",\"Asia/Jakarta|Asia/Pontianak\",\"Asia/Jerusalem|Asia/Tel_Aviv\",\"Asia/Jerusalem|Israel\",\"Asia/Kamchatka|Asia/Anadyr\",\"Asia/Kamchatka|Etc/GMT-12\",\"Asia/Kamchatka|Kwajalein\",\"Asia/Kamchatka|Pacific/Funafuti\",\"Asia/Kamchatka|Pacific/Kwajalein\",\"Asia/Kamchatka|Pacific/Majuro\",\"Asia/Kamchatka|Pacific/Nauru\",\"Asia/Kamchatka|Pacific/Tarawa\",\"Asia/Kamchatka|Pacific/Wake\",\"Asia/Kamchatka|Pacific/Wallis\",\"Asia/Kathmandu|Asia/Katmandu\",\"Asia/Kolkata|Asia/Calcutta\",\"Asia/Kuala_Lumpur|Asia/Brunei\",\"Asia/Kuala_Lumpur|Asia/Irkutsk\",\"Asia/Kuala_Lumpur|Asia/Kuching\",\"Asia/Kuala_Lumpur|Asia/Singapore\",\"Asia/Kuala_Lumpur|Etc/GMT-8\",\"Asia/Kuala_Lumpur|Singapore\",\"Asia/Makassar|Asia/Ujung_Pandang\",\"Asia/Rangoon|Asia/Yangon\",\"Asia/Rangoon|Indian/Cocos\",\"Asia/Seoul|ROK\",\"Asia/Shanghai|Asia/Chongqing\",\"Asia/Shanghai|Asia/Chungking\",\"Asia/Shanghai|Asia/Harbin\",\"Asia/Shanghai|Asia/Macao\",\"Asia/Shanghai|Asia/Macau\",\"Asia/Shanghai|Asia/Taipei\",\"Asia/Shanghai|PRC\",\"Asia/Shanghai|ROC\",\"Asia/Tashkent|Antarctica/Mawson\",\"Asia/Tashkent|Asia/Aqtau\",\"Asia/Tashkent|Asia/Aqtobe\",\"Asia/Tashkent|Asia/Ashgabat\",\"Asia/Tashkent|Asia/Ashkhabad\",\"Asia/Tashkent|Asia/Atyrau\",\"Asia/Tashkent|Asia/Dushanbe\",\"Asia/Tashkent|Asia/Oral\",\"Asia/Tashkent|Asia/Samarkand\",\"Asia/Tashkent|Asia/Yekaterinburg\",\"Asia/Tashkent|Etc/GMT-5\",\"Asia/Tashkent|Indian/Kerguelen\",\"Asia/Tashkent|Indian/Maldives\",\"Asia/Tehran|Iran\",\"Asia/Tokyo|Japan\",\"Asia/Ulaanbaatar|Asia/Choibalsan\",\"Asia/Ulaanbaatar|Asia/Ulan_Bator\",\"Asia/Vladivostok|Antarctica/DumontDUrville\",\"Asia/Vladivostok|Asia/Ust-Nera\",\"Asia/Vladivostok|Etc/GMT-10\",\"Asia/Vladivostok|Pacific/Chuuk\",\"Asia/Vladivostok|Pacific/Port_Moresby\",\"Asia/Vladivostok|Pacific/Truk\",\"Asia/Vladivostok|Pacific/Yap\",\"Asia/Yakutsk|Asia/Dili\",\"Asia/Yakutsk|Asia/Khandyga\",\"Asia/Yakutsk|Etc/GMT-9\",\"Asia/Yakutsk|Pacific/Palau\",\"Atlantic/Azores|America/Scoresbysund\",\"Atlantic/Cape_Verde|Etc/GMT+1\",\"Australia/Adelaide|Australia/Broken_Hill\",\"Australia/Adelaide|Australia/South\",\"Australia/Adelaide|Australia/Yancowinna\",\"Australia/Brisbane|Australia/Lindeman\",\"Australia/Brisbane|Australia/Queensland\",\"Australia/Darwin|Australia/North\",\"Australia/Lord_Howe|Australia/LHI\",\"Australia/Perth|Australia/West\",\"Australia/Sydney|Australia/ACT\",\"Australia/Sydney|Australia/Canberra\",\"Australia/Sydney|Australia/Currie\",\"Australia/Sydney|Australia/Hobart\",\"Australia/Sydney|Australia/Melbourne\",\"Australia/Sydney|Australia/NSW\",\"Australia/Sydney|Australia/Tasmania\",\"Australia/Sydney|Australia/Victoria\",\"Etc/UCT|Etc/UTC\",\"Etc/UCT|Etc/Universal\",\"Etc/UCT|Etc/Zulu\",\"Etc/UCT|UCT\",\"Etc/UCT|UTC\",\"Etc/UCT|Universal\",\"Etc/UCT|Zulu\",\"Europe/Athens|Asia/Nicosia\",\"Europe/Athens|EET\",\"Europe/Athens|Europe/Bucharest\",\"Europe/Athens|Europe/Helsinki\",\"Europe/Athens|Europe/Kiev\",\"Europe/Athens|Europe/Mariehamn\",\"Europe/Athens|Europe/Nicosia\",\"Europe/Athens|Europe/Riga\",\"Europe/Athens|Europe/Sofia\",\"Europe/Athens|Europe/Tallinn\",\"Europe/Athens|Europe/Uzhgorod\",\"Europe/Athens|Europe/Vilnius\",\"Europe/Athens|Europe/Zaporozhye\",\"Europe/Chisinau|Europe/Tiraspol\",\"Europe/Dublin|Eire\",\"Europe/Istanbul|Asia/Istanbul\",\"Europe/Istanbul|Turkey\",\"Europe/Lisbon|Atlantic/Canary\",\"Europe/Lisbon|Atlantic/Faeroe\",\"Europe/Lisbon|Atlantic/Faroe\",\"Europe/Lisbon|Atlantic/Madeira\",\"Europe/Lisbon|Portugal\",\"Europe/Lisbon|WET\",\"Europe/London|Europe/Belfast\",\"Europe/London|Europe/Guernsey\",\"Europe/London|Europe/Isle_of_Man\",\"Europe/London|Europe/Jersey\",\"Europe/London|GB\",\"Europe/London|GB-Eire\",\"Europe/Moscow|Europe/Simferopol\",\"Europe/Moscow|W-SU\",\"Europe/Paris|Africa/Ceuta\",\"Europe/Paris|Arctic/Longyearbyen\",\"Europe/Paris|Atlantic/Jan_Mayen\",\"Europe/Paris|CET\",\"Europe/Paris|Europe/Amsterdam\",\"Europe/Paris|Europe/Andorra\",\"Europe/Paris|Europe/Belgrade\",\"Europe/Paris|Europe/Berlin\",\"Europe/Paris|Europe/Bratislava\",\"Europe/Paris|Europe/Brussels\",\"Europe/Paris|Europe/Budapest\",\"Europe/Paris|Europe/Busingen\",\"Europe/Paris|Europe/Copenhagen\",\"Europe/Paris|Europe/Gibraltar\",\"Europe/Paris|Europe/Ljubljana\",\"Europe/Paris|Europe/Luxembourg\",\"Europe/Paris|Europe/Madrid\",\"Europe/Paris|Europe/Malta\",\"Europe/Paris|Europe/Monaco\",\"Europe/Paris|Europe/Oslo\",\"Europe/Paris|Europe/Podgorica\",\"Europe/Paris|Europe/Prague\",\"Europe/Paris|Europe/Rome\",\"Europe/Paris|Europe/San_Marino\",\"Europe/Paris|Europe/Sarajevo\",\"Europe/Paris|Europe/Skopje\",\"Europe/Paris|Europe/Stockholm\",\"Europe/Paris|Europe/Tirane\",\"Europe/Paris|Europe/Vaduz\",\"Europe/Paris|Europe/Vatican\",\"Europe/Paris|Europe/Vienna\",\"Europe/Paris|Europe/Warsaw\",\"Europe/Paris|Europe/Zagreb\",\"Europe/Paris|Europe/Zurich\",\"Europe/Paris|Poland\",\"Europe/Ulyanovsk|Europe/Astrakhan\",\"Pacific/Auckland|Antarctica/McMurdo\",\"Pacific/Auckland|Antarctica/South_Pole\",\"Pacific/Auckland|NZ\",\"Pacific/Bougainville|Antarctica/Macquarie\",\"Pacific/Bougainville|Asia/Srednekolymsk\",\"Pacific/Bougainville|Etc/GMT-11\",\"Pacific/Bougainville|Pacific/Efate\",\"Pacific/Bougainville|Pacific/Guadalcanal\",\"Pacific/Bougainville|Pacific/Kosrae\",\"Pacific/Bougainville|Pacific/Noumea\",\"Pacific/Bougainville|Pacific/Pohnpei\",\"Pacific/Bougainville|Pacific/Ponape\",\"Pacific/Chatham|NZ-CHAT\",\"Pacific/Easter|Chile/EasterIsland\",\"Pacific/Fakaofo|Etc/GMT-13\",\"Pacific/Fakaofo|Pacific/Enderbury\",\"Pacific/Galapagos|Etc/GMT+6\",\"Pacific/Gambier|Etc/GMT+9\",\"Pacific/Guam|Pacific/Saipan\",\"Pacific/Honolulu|HST\",\"Pacific/Honolulu|Pacific/Johnston\",\"Pacific/Honolulu|US/Hawaii\",\"Pacific/Kiritimati|Etc/GMT-14\",\"Pacific/Niue|Etc/GMT+11\",\"Pacific/Pago_Pago|Pacific/Midway\",\"Pacific/Pago_Pago|Pacific/Samoa\",\"Pacific/Pago_Pago|US/Samoa\",\"Pacific/Pitcairn|Etc/GMT+8\",\"Pacific/Tahiti|Etc/GMT+10\",\"Pacific/Tahiti|Pacific/Rarotonga\"]}");

/***/ }),

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
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

var MomentZoneRules = function (_ZoneRules) {
  _inheritsLoose(MomentZoneRules, _ZoneRules);

  function MomentZoneRules(tzdbInfo) {
    var _this;

    _this = _ZoneRules.call(this) || this;
    _this._tzdbInfo = tzdbInfo;
    _this._ldtUntils = new LDTUntils(_this._tzdbInfo.untils, _this._tzdbInfo.offsets);
    return _this;
  }

  var _proto = MomentZoneRules.prototype;

  _proto.isFixedOffset = function isFixedOffset() {
    return this._tzdbInfo.offsets.length === 1;
  };

  _proto.offsetOfInstant = function offsetOfInstant(instant) {
    var epochMilli = instant.toEpochMilli();
    return this.offsetOfEpochMilli(epochMilli);
  };

  _proto.offsetOfEpochMilli = function offsetOfEpochMilli(epochMilli) {
    var index = binarySearch(this._tzdbInfo.untils, epochMilli);
    return _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffset"].ofTotalSeconds(this._offsetByIndexInSeconds(index));
  };

  _proto.offsetOfLocalDateTime = function offsetOfLocalDateTime(localDateTime) {
    var info = this._offsetInfo(localDateTime);

    if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
      return info.offsetBefore();
    }

    return info;
  };

  _proto._offsetInfo = function _offsetInfo(localDateTime) {
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
  };

  _proto._offsetByIndexInSeconds = function _offsetByIndexInSeconds(index) {
    return -offsetInSeconds(this._tzdbInfo.offsets[index]);
  };

  _proto.validOffsets = function validOffsets(localDateTime) {
    var info = this._offsetInfo(localDateTime);

    if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
      return info.validOffsets();
    }

    return [info];
  };

  _proto.transition = function transition(localDateTime) {
    var info = this._offsetInfo(localDateTime);

    if (info instanceof _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneOffsetTransition"]) {
      return info;
    }

    return null;
  };

  _proto.standardOffset = function standardOffset(instant) {
    notSupported('ZoneRules.standardOffset');
  };

  _proto.daylightSavings = function daylightSavings(instant) {
    notSupported('ZoneRules.daylightSavings');
  };

  _proto.isDaylightSavings = function isDaylightSavings(instant) {
    notSupported('ZoneRules.isDaylightSavings');
  };

  _proto.isValidOffset = function isValidOffset(localDateTime, offset) {
    return this.validOffsets(localDateTime).some(function (o) {
      return o.equals(offset);
    });
  };

  _proto.nextTransition = function nextTransition(instant) {
    notSupported('ZoneRules.nextTransition');
  };

  _proto.previousTransition = function previousTransition(instant) {
    notSupported('ZoneRules.previousTransition');
  };

  _proto.transitions = function transitions() {
    notSupported('ZoneRules.transitions');
  };

  _proto.transitionRules = function transitionRules() {
    notSupported('ZoneRules.transitionRules');
  };

  _proto.equals = function equals(other) {
    if (this === other) {
      return true;
    }

    if (other instanceof MomentZoneRules) {
      return this._tzdbInfo === other._tzdbInfo;
    }

    return false;
  };

  _proto.toString = function toString() {
    return this._tzdbInfo.name;
  };

  return MomentZoneRules;
}(_js_joda_core__WEBPACK_IMPORTED_MODULE_0__["ZoneRules"]);

var LDTUntils = function () {
  function LDTUntils(_tzdbUntils, tzdbOffsets) {
    this._tzdbUntils = _tzdbUntils;
    this._tzdbOffsets = tzdbOffsets;
    this._ldtUntils = [];
    this.size = this._tzdbUntils.length * 2;
  }

  var _proto2 = LDTUntils.prototype;

  _proto2._generateTupple = function _generateTupple(index) {
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
  };

  _proto2._getTupple = function _getTupple(index) {
    if (this._ldtUntils[index] == null) {
      this._ldtUntils[index] = this._generateTupple(index);
    }

    return this._ldtUntils[index];
  };

  _proto2.get = function get(index) {
    var ldtTupple = this._getTupple(index >> 1);

    return ldtTupple[index % 2];
  };

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
  throw new Error('not supported: ' + msg);
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
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
  _inheritsLoose(MomentZoneRulesProvider, _ZoneRulesProvider);

  function MomentZoneRulesProvider() {
    return _ZoneRulesProvider.apply(this, arguments) || this;
  }

  MomentZoneRulesProvider.getRules = function getRules(zoneId) {
    var tzdbZoneInfo = zones[links[zoneId]];

    if (tzdbZoneInfo == null) {
      throw new _js_joda_core__WEBPACK_IMPORTED_MODULE_0__["DateTimeException"]('Unknown time-zone ID: ' + zoneId);
    }

    return new _MomentZoneRules__WEBPACK_IMPORTED_MODULE_1__["MomentZoneRules"](tzdbZoneInfo);
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
      var tzdbZoneInfo = Object(_unpack__WEBPACK_IMPORTED_MODULE_2__["unpack"])(packedZoneInfo);
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

/***/ "./src/js-joda-timezone.js":
/*!*********************************!*\
  !*** ./src/js-joda-timezone.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tzdbData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tzdbData */ "./src/tzdbData.js");
/* harmony import */ var _MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MomentZoneRulesProvider */ "./src/MomentZoneRulesProvider.js");
/* harmony import */ var _auto_plug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auto-plug */ "./src/auto-plug.js");
/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */



_MomentZoneRulesProvider__WEBPACK_IMPORTED_MODULE_1__["MomentZoneRulesProvider"].loadTzdbData(_tzdbData__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_auto_plug__WEBPACK_IMPORTED_MODULE_2__["default"])();

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

/***/ "./src/tzdbData.js":
/*!*************************!*\
  !*** ./src/tzdbData.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_packed_latest_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/packed/latest.json */ "./data/packed/latest-10-year-range.json");
var _data_packed_latest_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/packed/latest.json */ "./data/packed/latest-10-year-range.json", 1);

/* harmony default export */ __webpack_exports__["default"] = (_data_packed_latest_json__WEBPACK_IMPORTED_MODULE_0__);

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