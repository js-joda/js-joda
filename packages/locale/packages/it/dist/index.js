//! @version @js-joda/locale - 3.2.0+36.0.0
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@js-joda/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@js-joda/core"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaLocale"] = factory(require("@js-joda/core"));
	else
		root["JSJodaLocale"] = factory(root["JSJoda"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js-joda-locale.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cldr-data sync recursive ^\\.\\/.*$":
/*!**********************************************!*\
  !*** ./node_modules/cldr-data sync ^\.\/.*$ ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./availableLocales.json": "./node_modules/cldr-data/availableLocales.json",
	"./main/it-CH/ca-gregorian.json": "./node_modules/cldr-data/main/it-CH/ca-gregorian.json",
	"./main/it-CH/timeZoneNames.json": "./node_modules/cldr-data/main/it-CH/timeZoneNames.json",
	"./main/it-SM/ca-gregorian.json": "./node_modules/cldr-data/main/it-SM/ca-gregorian.json",
	"./main/it-SM/timeZoneNames.json": "./node_modules/cldr-data/main/it-SM/timeZoneNames.json",
	"./main/it-VA/ca-gregorian.json": "./node_modules/cldr-data/main/it-VA/ca-gregorian.json",
	"./main/it-VA/timeZoneNames.json": "./node_modules/cldr-data/main/it-VA/timeZoneNames.json",
	"./main/it/ca-gregorian.json": "./node_modules/cldr-data/main/it/ca-gregorian.json",
	"./main/it/timeZoneNames.json": "./node_modules/cldr-data/main/it/timeZoneNames.json",
	"./supplemental/likelySubtags.json": "./node_modules/cldr-data/supplemental/likelySubtags.json",
	"./supplemental/metaZones.json": "./node_modules/cldr-data/supplemental/metaZones.json",
	"./supplemental/weekData.json": "./node_modules/cldr-data/supplemental/weekData.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/cldr-data sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/cldr-data/availableLocales.json":
/*!******************************************************!*\
  !*** ./node_modules/cldr-data/availableLocales.json ***!
  \******************************************************/
/*! exports provided: availableLocales, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"availableLocales\":[\"af\",\"af-NA\",\"am\",\"ar\",\"ar-AE\",\"ar-BH\",\"ar-DJ\",\"ar-DZ\",\"ar-EG\",\"ar-EH\",\"ar-ER\",\"ar-IL\",\"ar-IQ\",\"ar-JO\",\"ar-KM\",\"ar-KW\",\"ar-LB\",\"ar-LY\",\"ar-MA\",\"ar-MR\",\"ar-OM\",\"ar-PS\",\"ar-QA\",\"ar-SA\",\"ar-SD\",\"ar-SO\",\"ar-SS\",\"ar-SY\",\"ar-TD\",\"ar-TN\",\"ar-YE\",\"as\",\"az\",\"az-Latn\",\"be\",\"bg\",\"bn\",\"bn-IN\",\"bs\",\"bs-Latn\",\"ca\",\"ca-AD\",\"ca-ES-VALENCIA\",\"ca-FR\",\"ca-IT\",\"cs\",\"cy\",\"da\",\"da-GL\",\"de\",\"de-AT\",\"de-BE\",\"de-CH\",\"de-IT\",\"de-LI\",\"de-LU\",\"el\",\"el-CY\",\"en\",\"en-001\",\"en-150\",\"en-AE\",\"en-AG\",\"en-AI\",\"en-AS\",\"en-AT\",\"en-AU\",\"en-BB\",\"en-BE\",\"en-BI\",\"en-BM\",\"en-BS\",\"en-BW\",\"en-BZ\",\"en-CA\",\"en-CC\",\"en-CH\",\"en-CK\",\"en-CM\",\"en-CX\",\"en-CY\",\"en-DE\",\"en-DG\",\"en-DK\",\"en-DM\",\"en-ER\",\"en-FI\",\"en-FJ\",\"en-FK\",\"en-FM\",\"en-GB\",\"en-GD\",\"en-GG\",\"en-GH\",\"en-GI\",\"en-GM\",\"en-GU\",\"en-GY\",\"en-HK\",\"en-IE\",\"en-IL\",\"en-IM\",\"en-IN\",\"en-IO\",\"en-JE\",\"en-JM\",\"en-KE\",\"en-KI\",\"en-KN\",\"en-KY\",\"en-LC\",\"en-LR\",\"en-LS\",\"en-MG\",\"en-MH\",\"en-MO\",\"en-MP\",\"en-MS\",\"en-MT\",\"en-MU\",\"en-MW\",\"en-MY\",\"en-NA\",\"en-NF\",\"en-NG\",\"en-NL\",\"en-NR\",\"en-NU\",\"en-NZ\",\"en-PG\",\"en-PH\",\"en-PK\",\"en-PN\",\"en-PR\",\"en-PW\",\"en-RW\",\"en-SB\",\"en-SC\",\"en-SD\",\"en-SE\",\"en-SG\",\"en-SH\",\"en-SI\",\"en-SL\",\"en-SS\",\"en-SX\",\"en-SZ\",\"en-TC\",\"en-TK\",\"en-TO\",\"en-TT\",\"en-TV\",\"en-TZ\",\"en-UG\",\"en-UM\",\"en-US-POSIX\",\"en-VC\",\"en-VG\",\"en-VI\",\"en-VU\",\"en-WS\",\"en-ZA\",\"en-ZM\",\"en-ZW\",\"es\",\"es-419\",\"es-AR\",\"es-BO\",\"es-BR\",\"es-BZ\",\"es-CL\",\"es-CO\",\"es-CR\",\"es-CU\",\"es-DO\",\"es-EA\",\"es-EC\",\"es-GQ\",\"es-GT\",\"es-HN\",\"es-IC\",\"es-MX\",\"es-NI\",\"es-PA\",\"es-PE\",\"es-PH\",\"es-PR\",\"es-PY\",\"es-SV\",\"es-US\",\"es-UY\",\"es-VE\",\"et\",\"eu\",\"fa\",\"fa-AF\",\"fi\",\"fil\",\"fr\",\"fr-BE\",\"fr-BF\",\"fr-BI\",\"fr-BJ\",\"fr-BL\",\"fr-CA\",\"fr-CD\",\"fr-CF\",\"fr-CG\",\"fr-CH\",\"fr-CI\",\"fr-CM\",\"fr-DJ\",\"fr-DZ\",\"fr-GA\",\"fr-GF\",\"fr-GN\",\"fr-GP\",\"fr-GQ\",\"fr-HT\",\"fr-KM\",\"fr-LU\",\"fr-MA\",\"fr-MC\",\"fr-MF\",\"fr-MG\",\"fr-ML\",\"fr-MQ\",\"fr-MR\",\"fr-MU\",\"fr-NC\",\"fr-NE\",\"fr-PF\",\"fr-PM\",\"fr-RE\",\"fr-RW\",\"fr-SC\",\"fr-SN\",\"fr-SY\",\"fr-TD\",\"fr-TG\",\"fr-TN\",\"fr-VU\",\"fr-WF\",\"fr-YT\",\"ga\",\"ga-GB\",\"gl\",\"gu\",\"he\",\"hi\",\"hr\",\"hr-BA\",\"hu\",\"hy\",\"id\",\"is\",\"it\",\"it-CH\",\"it-SM\",\"it-VA\",\"ja\",\"jv\",\"ka\",\"kk\",\"km\",\"kn\",\"ko\",\"ko-KP\",\"ky\",\"lo\",\"lt\",\"lv\",\"mk\",\"ml\",\"mn\",\"mr\",\"ms\",\"ms-BN\",\"ms-SG\",\"my\",\"nb\",\"nb-SJ\",\"ne\",\"ne-IN\",\"nl\",\"nl-AW\",\"nl-BE\",\"nl-BQ\",\"nl-CW\",\"nl-SR\",\"nl-SX\",\"or\",\"pa\",\"pa-Guru\",\"pl\",\"ps\",\"ps-PK\",\"pt\",\"pt-AO\",\"pt-CH\",\"pt-CV\",\"pt-GQ\",\"pt-GW\",\"pt-LU\",\"pt-MO\",\"pt-MZ\",\"pt-PT\",\"pt-ST\",\"pt-TL\",\"ro\",\"ro-MD\",\"root\",\"ru\",\"ru-BY\",\"ru-KG\",\"ru-KZ\",\"ru-MD\",\"ru-UA\",\"sd\",\"si\",\"sk\",\"sl\",\"so\",\"so-DJ\",\"so-ET\",\"so-KE\",\"sq\",\"sq-MK\",\"sq-XK\",\"sr\",\"sr-Cyrl\",\"sr-Cyrl-BA\",\"sr-Cyrl-ME\",\"sr-Cyrl-XK\",\"sr-Latn\",\"sr-Latn-BA\",\"sr-Latn-ME\",\"sr-Latn-XK\",\"sv\",\"sv-AX\",\"sv-FI\",\"sw\",\"sw-CD\",\"sw-KE\",\"sw-UG\",\"ta\",\"ta-LK\",\"ta-MY\",\"ta-SG\",\"te\",\"th\",\"tk\",\"tr\",\"tr-CY\",\"uk\",\"ur\",\"ur-IN\",\"uz\",\"uz-Latn\",\"vi\",\"yue\",\"yue-Hant\",\"zh\",\"zh-Hans\",\"zh-Hans-HK\",\"zh-Hans-MO\",\"zh-Hans-SG\",\"zh-Hant\",\"zh-Hant-HK\",\"zh-Hant-MO\",\"zu\"]}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-CH/ca-gregorian.json":
/*!*************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-CH/ca-gregorian.json ***!
  \*************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-CH\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"CH\"},\"dates\":{\"calendars\":{\"gregorian\":{\"months\":{\"format\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}}},\"days\":{\"format\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}},\"stand-alone\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}}},\"quarters\":{\"format\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}}},\"dayPeriods\":{\"format\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"del pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"}},\"stand-alone\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"}}},\"eras\":{\"eraNames\":{\"0\":\"avanti Cristo\",\"1\":\"dopo Cristo\",\"0-alt-variant\":\"avanti Era Volgare\",\"1-alt-variant\":\"Era Volgare\"},\"eraAbbr\":{\"0\":\"a.C.\",\"1\":\"d.C.\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"},\"eraNarrow\":{\"0\":\"aC\",\"1\":\"dC\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"}},\"dateFormats\":{\"full\":\"EEEE, d MMMM y\",\"long\":\"d MMMM y\",\"medium\":\"d MMM y\",\"short\":\"dd.MM.yy\"},\"timeFormats\":{\"full\":\"HH:mm:ss zzzz\",\"long\":\"HH:mm:ss z\",\"medium\":\"HH:mm:ss\",\"short\":\"HH:mm\"},\"dateTimeFormats\":{\"full\":\"{1} {0}\",\"long\":\"{1} {0}\",\"medium\":\"{1}, {0}\",\"short\":\"{1}, {0}\",\"availableFormats\":{\"Bh\":\"h B\",\"Bhm\":\"h:mm B\",\"Bhms\":\"h:mm:ss B\",\"d\":\"d\",\"E\":\"ccc\",\"EBhm\":\"E h:mm B\",\"EBhms\":\"E h:mm:ss B\",\"Ed\":\"E d\",\"Ehm\":\"E h:mm a\",\"EHm\":\"E HH:mm\",\"Ehms\":\"E h:mm:ss a\",\"EHms\":\"E HH:mm:ss\",\"Gy\":\"y G\",\"GyMMM\":\"MMM y G\",\"GyMMMd\":\"d MMM y G\",\"GyMMMEd\":\"E d MMM y G\",\"h\":\"h a\",\"H\":\"HH\",\"hm\":\"h:mm a\",\"Hm\":\"HH:mm\",\"hms\":\"h:mm:ss a\",\"Hms\":\"HH:mm:ss\",\"hmsv\":\"h:mm:ss a v\",\"Hmsv\":\"HH:mm:ss v\",\"hmv\":\"h:mm a v\",\"Hmv\":\"HH:mm v\",\"M\":\"L\",\"Md\":\"d/M\",\"MEd\":\"E d/M\",\"MMM\":\"LLL\",\"MMMd\":\"d MMM\",\"MMMEd\":\"E d MMM\",\"MMMMd\":\"d MMMM\",\"MMMMW-count-one\":\"'settimana' W 'di' MMMM\",\"MMMMW-count-other\":\"'settimana' W 'di' MMMM\",\"ms\":\"mm:ss\",\"y\":\"y\",\"yM\":\"M/y\",\"yMd\":\"d/M/y\",\"yMEd\":\"E d/M/y\",\"yMMM\":\"MMM y\",\"yMMMd\":\"d MMM y\",\"yMMMEd\":\"E d MMM y\",\"yMMMM\":\"MMMM y\",\"yQQQ\":\"QQQ y\",\"yQQQQ\":\"QQQQ y\",\"yw-count-one\":\"'settimana' w 'del' Y\",\"yw-count-other\":\"'settimana' w 'del' Y\"},\"appendItems\":{\"Day\":\"{0} ({2}: {1})\",\"Day-Of-Week\":\"{0} {1}\",\"Era\":\"{1} {0}\",\"Hour\":\"{0} ({2}: {1})\",\"Minute\":\"{0} ({2}: {1})\",\"Month\":\"{0} ({2}: {1})\",\"Quarter\":\"{0} ({2}: {1})\",\"Second\":\"{0} ({2}: {1})\",\"Timezone\":\"{0} {1}\",\"Week\":\"{0} ({2}: {1})\",\"Year\":\"{1} {0}\"},\"intervalFormats\":{\"intervalFormatFallback\":\"{0} - {1}\",\"Bh\":{\"B\":\"h B – h B\",\"h\":\"h–h B\"},\"Bhm\":{\"B\":\"h:mm B – h:mm B\",\"h\":\"h:mm–h:mm B\",\"m\":\"h:mm–h:mm B\"},\"d\":{\"d\":\"d–d\"},\"Gy\":{\"G\":\"y G – y G\",\"y\":\"y – y G\"},\"GyM\":{\"G\":\"M/y GGGGG – M/y GGGGG\",\"M\":\"M/y – M/y GGGGG\",\"y\":\"M/y – M/y GGGGG\"},\"GyMd\":{\"d\":\"d/M/y – d/M/y GGGGG\",\"G\":\"d/M/y GGGGG – d/M/y GGGGG\",\"M\":\"d/M/y – d/M/y GGGGG\",\"y\":\"d/M/y – d/M/y GGGGG\"},\"GyMEd\":{\"d\":\"E d/M/y – E d/M/y GGGGG\",\"G\":\"E d/M/y – E d/M/y GGGGG\",\"M\":\"E d/M/y – E d/M/y GGGGG\",\"y\":\"E d/M/y – E d/M/y GGGGG\"},\"GyMMM\":{\"G\":\"MMM y G – MMM y G\",\"M\":\"MMM – MMM y G\",\"y\":\"MMM y – MMM y G\"},\"GyMMMd\":{\"d\":\"d – d MMM y G\",\"G\":\"d MMM y G – d MMM y G\",\"M\":\"d MMM – d MMM y G\",\"y\":\"d MMM y – d MMM y G\"},\"GyMMMEd\":{\"d\":\"E d MMM – d E MMM y G\",\"G\":\"E d MMM y G – E d MMM y G\",\"M\":\"E d MMM – E d MMM y G\",\"y\":\"E d MMM y – E d MMM y G\"},\"h\":{\"a\":\"h a – h a\",\"h\":\"h–h a\"},\"H\":{\"H\":\"HH–HH\"},\"hm\":{\"a\":\"h:mm a – h:mm a\",\"h\":\"h:mm–h:mm a\",\"m\":\"h:mm–h:mm a\"},\"Hm\":{\"H\":\"HH:mm–HH:mm\",\"m\":\"HH:mm–HH:mm\"},\"hmv\":{\"a\":\"h:mm a – h:mm a v\",\"h\":\"h:mm–h:mm a v\",\"m\":\"h:mm–h:mm a v\"},\"Hmv\":{\"H\":\"HH:mm–HH:mm v\",\"m\":\"HH:mm–HH:mm v\"},\"hv\":{\"a\":\"h a – h a v\",\"h\":\"h–h a v\"},\"Hv\":{\"H\":\"HH–HH v\"},\"M\":{\"M\":\"M–M\"},\"Md\":{\"d\":\"dd/MM – dd/MM\",\"M\":\"dd/MM – dd/MM\"},\"MEd\":{\"d\":\"E dd/MM – E dd/MM\",\"M\":\"E dd/MM – E dd/MM\"},\"MMM\":{\"M\":\"MMM–MMM\"},\"MMMd\":{\"d\":\"dd–dd MMM\",\"M\":\"dd MMM – dd MMM\"},\"MMMEd\":{\"d\":\"E dd – E dd MMM\",\"M\":\"E dd MMM – E dd MMM\"},\"y\":{\"y\":\"y–y\"},\"yM\":{\"M\":\"MM/y – MM/y\",\"y\":\"MM/y – MM/y\"},\"yMd\":{\"d\":\"dd/MM/y – dd/MM/y\",\"M\":\"dd/MM/y – dd/MM/y\",\"y\":\"dd/MM/y – dd/MM/y\"},\"yMEd\":{\"d\":\"E dd/MM/y – E dd/MM/y\",\"M\":\"E dd/MM/y – E dd/MM/y\",\"y\":\"E dd/MM/y – E dd/MM/y\"},\"yMMM\":{\"M\":\"MMM–MMM y\",\"y\":\"MMM y – MMM y\"},\"yMMMd\":{\"d\":\"dd–dd MMM y\",\"M\":\"dd MMM – dd MMM y\",\"y\":\"dd MMM y – dd MMM y\"},\"yMMMEd\":{\"d\":\"E d – E d MMM y\",\"M\":\"E d MMM – E d MMM y\",\"y\":\"E d MMM y – E d MMM y\"},\"yMMMM\":{\"M\":\"MMMM–MMMM y\",\"y\":\"MMMM y – MMMM y\"}}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-CH/timeZoneNames.json":
/*!**************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-CH/timeZoneNames.json ***!
  \**************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-CH\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"CH\"},\"dates\":{\"timeZoneNames\":{\"hourFormat\":\"+HH:mm;-HH:mm\",\"gmtFormat\":\"GMT{0}\",\"gmtZeroFormat\":\"GMT\",\"regionFormat\":\"Ora {0}\",\"regionFormat-type-daylight\":\"Ora legale: {0}\",\"regionFormat-type-standard\":\"Ora standard: {0}\",\"fallbackFormat\":\"{1} ({0})\",\"zone\":{\"America\":{\"Adak\":{\"exemplarCity\":\"Adak\"},\"Anchorage\":{\"exemplarCity\":\"Anchorage\"},\"Anguilla\":{\"exemplarCity\":\"Anguilla\"},\"Antigua\":{\"exemplarCity\":\"Antigua\"},\"Araguaina\":{\"exemplarCity\":\"Araguaina\"},\"Argentina\":{\"Rio_Gallegos\":{\"exemplarCity\":\"Rio Gallegos\"},\"San_Juan\":{\"exemplarCity\":\"San Juan\"},\"Ushuaia\":{\"exemplarCity\":\"Ushuaia\"},\"La_Rioja\":{\"exemplarCity\":\"La Rioja\"},\"San_Luis\":{\"exemplarCity\":\"San Luis\"},\"Salta\":{\"exemplarCity\":\"Salta\"},\"Tucuman\":{\"exemplarCity\":\"Tucumán\"}},\"Aruba\":{\"exemplarCity\":\"Aruba\"},\"Asuncion\":{\"exemplarCity\":\"Asunción\"},\"Bahia\":{\"exemplarCity\":\"Bahia\"},\"Bahia_Banderas\":{\"exemplarCity\":\"Bahía de Banderas\"},\"Barbados\":{\"exemplarCity\":\"Barbados\"},\"Belem\":{\"exemplarCity\":\"Belem\"},\"Belize\":{\"exemplarCity\":\"Belize\"},\"Blanc-Sablon\":{\"exemplarCity\":\"Blanc-Sablon\"},\"Boa_Vista\":{\"exemplarCity\":\"Boa Vista\"},\"Bogota\":{\"exemplarCity\":\"Bogotá\"},\"Boise\":{\"exemplarCity\":\"Boise\"},\"Buenos_Aires\":{\"exemplarCity\":\"Buenos Aires\"},\"Cambridge_Bay\":{\"exemplarCity\":\"Cambridge Bay\"},\"Campo_Grande\":{\"exemplarCity\":\"Campo Grande\"},\"Cancun\":{\"exemplarCity\":\"Cancún\"},\"Caracas\":{\"exemplarCity\":\"Caracas\"},\"Catamarca\":{\"exemplarCity\":\"Catamarca\"},\"Cayenne\":{\"exemplarCity\":\"Caienna\"},\"Cayman\":{\"exemplarCity\":\"Cayman\"},\"Chicago\":{\"exemplarCity\":\"Chicago\"},\"Chihuahua\":{\"exemplarCity\":\"Chihuahua\"},\"Coral_Harbour\":{\"exemplarCity\":\"Atikokan\"},\"Cordoba\":{\"exemplarCity\":\"Cordoba\"},\"Costa_Rica\":{\"exemplarCity\":\"Costa Rica\"},\"Creston\":{\"exemplarCity\":\"Creston\"},\"Cuiaba\":{\"exemplarCity\":\"Cuiaba\"},\"Curacao\":{\"exemplarCity\":\"Curaçao\"},\"Danmarkshavn\":{\"exemplarCity\":\"Danmarkshavn\"},\"Dawson\":{\"exemplarCity\":\"Dawson\"},\"Dawson_Creek\":{\"exemplarCity\":\"Dawson Creek\"},\"Denver\":{\"exemplarCity\":\"Denver\"},\"Detroit\":{\"exemplarCity\":\"Detroit\"},\"Dominica\":{\"exemplarCity\":\"Dominica\"},\"Edmonton\":{\"exemplarCity\":\"Edmonton\"},\"Eirunepe\":{\"exemplarCity\":\"Eirunepe\"},\"El_Salvador\":{\"exemplarCity\":\"El Salvador\"},\"Fort_Nelson\":{\"exemplarCity\":\"Fort Nelson\"},\"Fortaleza\":{\"exemplarCity\":\"Fortaleza\"},\"Glace_Bay\":{\"exemplarCity\":\"Glace Bay\"},\"Godthab\":{\"exemplarCity\":\"Nuuk\"},\"Goose_Bay\":{\"exemplarCity\":\"Goose Bay\"},\"Grand_Turk\":{\"exemplarCity\":\"Grand Turk\"},\"Grenada\":{\"exemplarCity\":\"Grenada\"},\"Guadeloupe\":{\"exemplarCity\":\"Guadalupa\"},\"Guatemala\":{\"exemplarCity\":\"Guatemala\"},\"Guayaquil\":{\"exemplarCity\":\"Guayaquil\"},\"Guyana\":{\"exemplarCity\":\"Guyana\"},\"Halifax\":{\"exemplarCity\":\"Halifax\"},\"Havana\":{\"exemplarCity\":\"L’Avana\"},\"Hermosillo\":{\"exemplarCity\":\"Hermosillo\"},\"Indiana\":{\"Vincennes\":{\"exemplarCity\":\"Vincennes, Indiana\"},\"Petersburg\":{\"exemplarCity\":\"Petersburg, Indiana\"},\"Tell_City\":{\"exemplarCity\":\"Tell City, Indiana\"},\"Knox\":{\"exemplarCity\":\"Knox, Indiana\"},\"Winamac\":{\"exemplarCity\":\"Winamac, Indiana\"},\"Marengo\":{\"exemplarCity\":\"Marengo, Indiana\"},\"Vevay\":{\"exemplarCity\":\"Vevay, Indiana\"}},\"Indianapolis\":{\"exemplarCity\":\"Indianapolis\"},\"Inuvik\":{\"exemplarCity\":\"Inuvik\"},\"Iqaluit\":{\"exemplarCity\":\"Iqaluit\"},\"Jamaica\":{\"exemplarCity\":\"Giamaica\"},\"Jujuy\":{\"exemplarCity\":\"Jujuy\"},\"Juneau\":{\"exemplarCity\":\"Juneau\"},\"Kentucky\":{\"Monticello\":{\"exemplarCity\":\"Monticello, Kentucky\"}},\"Kralendijk\":{\"exemplarCity\":\"Kralendijk\"},\"La_Paz\":{\"exemplarCity\":\"La Paz\"},\"Lima\":{\"exemplarCity\":\"Lima\"},\"Los_Angeles\":{\"exemplarCity\":\"Los Angeles\"},\"Louisville\":{\"exemplarCity\":\"Louisville\"},\"Lower_Princes\":{\"exemplarCity\":\"Lower Prince’s Quarter\"},\"Maceio\":{\"exemplarCity\":\"Maceio\"},\"Managua\":{\"exemplarCity\":\"Managua\"},\"Manaus\":{\"exemplarCity\":\"Manaus\"},\"Marigot\":{\"exemplarCity\":\"Marigot\"},\"Martinique\":{\"exemplarCity\":\"Martinica\"},\"Matamoros\":{\"exemplarCity\":\"Matamoros\"},\"Mazatlan\":{\"exemplarCity\":\"Mazatlan\"},\"Mendoza\":{\"exemplarCity\":\"Mendoza\"},\"Menominee\":{\"exemplarCity\":\"Menominee\"},\"Merida\":{\"exemplarCity\":\"Mérida\"},\"Metlakatla\":{\"exemplarCity\":\"Metlakatla\"},\"Mexico_City\":{\"exemplarCity\":\"Città del Messico\"},\"Miquelon\":{\"exemplarCity\":\"Miquelon\"},\"Moncton\":{\"exemplarCity\":\"Moncton\"},\"Monterrey\":{\"exemplarCity\":\"Monterrey\"},\"Montevideo\":{\"exemplarCity\":\"Montevideo\"},\"Montserrat\":{\"exemplarCity\":\"Montserrat\"},\"Nassau\":{\"exemplarCity\":\"Nassau\"},\"New_York\":{\"exemplarCity\":\"New York\"},\"Nipigon\":{\"exemplarCity\":\"Nipigon\"},\"Nome\":{\"exemplarCity\":\"Nome\"},\"Noronha\":{\"exemplarCity\":\"Noronha\"},\"North_Dakota\":{\"Beulah\":{\"exemplarCity\":\"Beulah, Dakota del nord\"},\"New_Salem\":{\"exemplarCity\":\"New Salem, Dakota del nord\"},\"Center\":{\"exemplarCity\":\"Center, Dakota del nord\"}},\"Ojinaga\":{\"exemplarCity\":\"Ojinaga\"},\"Panama\":{\"exemplarCity\":\"Panamá\"},\"Pangnirtung\":{\"exemplarCity\":\"Pangnirtung\"},\"Paramaribo\":{\"exemplarCity\":\"Paramaribo\"},\"Phoenix\":{\"exemplarCity\":\"Phoenix\"},\"Port-au-Prince\":{\"exemplarCity\":\"Port-au-Prince\"},\"Port_of_Spain\":{\"exemplarCity\":\"Port of Spain\"},\"Porto_Velho\":{\"exemplarCity\":\"Porto Velho\"},\"Puerto_Rico\":{\"exemplarCity\":\"Portorico\"},\"Punta_Arenas\":{\"exemplarCity\":\"Punta Arenas\"},\"Rainy_River\":{\"exemplarCity\":\"Rainy River\"},\"Rankin_Inlet\":{\"exemplarCity\":\"Rankin Inlet\"},\"Recife\":{\"exemplarCity\":\"Recife\"},\"Regina\":{\"exemplarCity\":\"Regina\"},\"Resolute\":{\"exemplarCity\":\"Resolute\"},\"Rio_Branco\":{\"exemplarCity\":\"Rio Branco\"},\"Santa_Isabel\":{\"exemplarCity\":\"Santa Isabel\"},\"Santarem\":{\"exemplarCity\":\"Santarém\"},\"Santiago\":{\"exemplarCity\":\"Santiago\"},\"Santo_Domingo\":{\"exemplarCity\":\"Santo Domingo\"},\"Sao_Paulo\":{\"exemplarCity\":\"San Paolo\"},\"Scoresbysund\":{\"exemplarCity\":\"Ittoqqortoormiit\"},\"Sitka\":{\"exemplarCity\":\"Sitka\"},\"St_Barthelemy\":{\"exemplarCity\":\"Saint-Barthélemy\"},\"St_Johns\":{\"exemplarCity\":\"St. John’s\"},\"St_Kitts\":{\"exemplarCity\":\"St. Kitts\"},\"St_Lucia\":{\"exemplarCity\":\"Santa Lucia\"},\"St_Thomas\":{\"exemplarCity\":\"Saint Thomas\"},\"St_Vincent\":{\"exemplarCity\":\"Saint Vincent\"},\"Swift_Current\":{\"exemplarCity\":\"Swift Current\"},\"Tegucigalpa\":{\"exemplarCity\":\"Tegucigalpa\"},\"Thule\":{\"exemplarCity\":\"Thule\"},\"Thunder_Bay\":{\"exemplarCity\":\"Thunder Bay\"},\"Tijuana\":{\"exemplarCity\":\"Tijuana\"},\"Toronto\":{\"exemplarCity\":\"Toronto\"},\"Tortola\":{\"exemplarCity\":\"Tortola\"},\"Vancouver\":{\"exemplarCity\":\"Vancouver\"},\"Whitehorse\":{\"exemplarCity\":\"Whitehorse\"},\"Winnipeg\":{\"exemplarCity\":\"Winnipeg\"},\"Yakutat\":{\"exemplarCity\":\"Yakutat\"},\"Yellowknife\":{\"exemplarCity\":\"Yellowknife\"}},\"Atlantic\":{\"Azores\":{\"exemplarCity\":\"Azzorre\"},\"Bermuda\":{\"exemplarCity\":\"Bermuda\"},\"Canary\":{\"exemplarCity\":\"Canarie\"},\"Cape_Verde\":{\"exemplarCity\":\"Capo Verde\"},\"Faeroe\":{\"exemplarCity\":\"Isole Fær Øer\"},\"Madeira\":{\"exemplarCity\":\"Madeira\"},\"Reykjavik\":{\"exemplarCity\":\"Reykjavík\"},\"South_Georgia\":{\"exemplarCity\":\"Georgia del Sud\"},\"St_Helena\":{\"exemplarCity\":\"Sant’Elena\"},\"Stanley\":{\"exemplarCity\":\"Stanley\"}},\"Europe\":{\"Amsterdam\":{\"exemplarCity\":\"Amsterdam\"},\"Andorra\":{\"exemplarCity\":\"Andorra\"},\"Astrakhan\":{\"exemplarCity\":\"Astrakhan\"},\"Athens\":{\"exemplarCity\":\"Atene\"},\"Belgrade\":{\"exemplarCity\":\"Belgrado\"},\"Berlin\":{\"exemplarCity\":\"Berlino\"},\"Bratislava\":{\"exemplarCity\":\"Bratislava\"},\"Brussels\":{\"exemplarCity\":\"Bruxelles\"},\"Bucharest\":{\"exemplarCity\":\"Bucarest\"},\"Budapest\":{\"exemplarCity\":\"Budapest\"},\"Busingen\":{\"exemplarCity\":\"Büsingen\"},\"Chisinau\":{\"exemplarCity\":\"Chisinau\"},\"Copenhagen\":{\"exemplarCity\":\"Copenaghen\"},\"Dublin\":{\"long\":{\"daylight\":\"Ora legale dell’Irlanda\"},\"exemplarCity\":\"Dublino\"},\"Gibraltar\":{\"exemplarCity\":\"Gibilterra\"},\"Guernsey\":{\"exemplarCity\":\"Guernsey\"},\"Helsinki\":{\"exemplarCity\":\"Helsinki\"},\"Isle_of_Man\":{\"exemplarCity\":\"Isola di Man\"},\"Istanbul\":{\"exemplarCity\":\"Istanbul\"},\"Jersey\":{\"exemplarCity\":\"Jersey\"},\"Kaliningrad\":{\"exemplarCity\":\"Kaliningrad\"},\"Kiev\":{\"exemplarCity\":\"Kiev\"},\"Kirov\":{\"exemplarCity\":\"Kirov\"},\"Lisbon\":{\"exemplarCity\":\"Lisbona\"},\"Ljubljana\":{\"exemplarCity\":\"Lubiana\"},\"London\":{\"long\":{\"daylight\":\"Ora legale del Regno Unito\"},\"exemplarCity\":\"Londra\"},\"Luxembourg\":{\"exemplarCity\":\"Lussemburgo\"},\"Madrid\":{\"exemplarCity\":\"Madrid\"},\"Malta\":{\"exemplarCity\":\"Malta\"},\"Mariehamn\":{\"exemplarCity\":\"Mariehamn\"},\"Minsk\":{\"exemplarCity\":\"Minsk\"},\"Monaco\":{\"exemplarCity\":\"Monaco\"},\"Moscow\":{\"exemplarCity\":\"Mosca\"},\"Oslo\":{\"exemplarCity\":\"Oslo\"},\"Paris\":{\"exemplarCity\":\"Parigi\"},\"Podgorica\":{\"exemplarCity\":\"Podgorica\"},\"Prague\":{\"exemplarCity\":\"Praga\"},\"Riga\":{\"exemplarCity\":\"Riga\"},\"Rome\":{\"exemplarCity\":\"Roma\"},\"Samara\":{\"exemplarCity\":\"Samara\"},\"San_Marino\":{\"exemplarCity\":\"San Marino\"},\"Sarajevo\":{\"exemplarCity\":\"Sarajevo\"},\"Saratov\":{\"exemplarCity\":\"Saratov\"},\"Simferopol\":{\"exemplarCity\":\"Sinferopoli\"},\"Skopje\":{\"exemplarCity\":\"Skopje\"},\"Sofia\":{\"exemplarCity\":\"Sofia\"},\"Stockholm\":{\"exemplarCity\":\"Stoccolma\"},\"Tallinn\":{\"exemplarCity\":\"Tallinn\"},\"Tirane\":{\"exemplarCity\":\"Tirana\"},\"Ulyanovsk\":{\"exemplarCity\":\"Ulyanovsk\"},\"Uzhgorod\":{\"exemplarCity\":\"Užhorod\"},\"Vaduz\":{\"exemplarCity\":\"Vaduz\"},\"Vatican\":{\"exemplarCity\":\"Città del Vaticano\"},\"Vienna\":{\"exemplarCity\":\"Vienna\"},\"Vilnius\":{\"exemplarCity\":\"Vilnius\"},\"Volgograd\":{\"exemplarCity\":\"Volgograd\"},\"Warsaw\":{\"exemplarCity\":\"Varsavia\"},\"Zagreb\":{\"exemplarCity\":\"Zagabria\"},\"Zaporozhye\":{\"exemplarCity\":\"Zaporozhye\"},\"Zurich\":{\"exemplarCity\":\"Zurigo\"}},\"Africa\":{\"Abidjan\":{\"exemplarCity\":\"Abidjan\"},\"Accra\":{\"exemplarCity\":\"Accra\"},\"Addis_Ababa\":{\"exemplarCity\":\"Addis Abeba\"},\"Algiers\":{\"exemplarCity\":\"Algeri\"},\"Asmera\":{\"exemplarCity\":\"Asmara\"},\"Bamako\":{\"exemplarCity\":\"Bamako\"},\"Bangui\":{\"exemplarCity\":\"Bangui\"},\"Banjul\":{\"exemplarCity\":\"Banjul\"},\"Bissau\":{\"exemplarCity\":\"Bissau\"},\"Blantyre\":{\"exemplarCity\":\"Blantyre\"},\"Brazzaville\":{\"exemplarCity\":\"Brazzaville\"},\"Bujumbura\":{\"exemplarCity\":\"Bujumbura\"},\"Cairo\":{\"exemplarCity\":\"Il Cairo\"},\"Casablanca\":{\"exemplarCity\":\"Casablanca\"},\"Ceuta\":{\"exemplarCity\":\"Ceuta\"},\"Conakry\":{\"exemplarCity\":\"Conakry\"},\"Dakar\":{\"exemplarCity\":\"Dakar\"},\"Dar_es_Salaam\":{\"exemplarCity\":\"Dar es Salaam\"},\"Djibouti\":{\"exemplarCity\":\"Gibuti\"},\"Douala\":{\"exemplarCity\":\"Douala\"},\"El_Aaiun\":{\"exemplarCity\":\"El Ayun\"},\"Freetown\":{\"exemplarCity\":\"Freetown\"},\"Gaborone\":{\"exemplarCity\":\"Gaborone\"},\"Harare\":{\"exemplarCity\":\"Harare\"},\"Johannesburg\":{\"exemplarCity\":\"Johannesburg\"},\"Juba\":{\"exemplarCity\":\"Giuba\"},\"Kampala\":{\"exemplarCity\":\"Kampala\"},\"Khartoum\":{\"exemplarCity\":\"Khartum\"},\"Kigali\":{\"exemplarCity\":\"Kigali\"},\"Kinshasa\":{\"exemplarCity\":\"Kinshasa\"},\"Lagos\":{\"exemplarCity\":\"Lagos\"},\"Libreville\":{\"exemplarCity\":\"Libreville\"},\"Lome\":{\"exemplarCity\":\"Lomé\"},\"Luanda\":{\"exemplarCity\":\"Luanda\"},\"Lubumbashi\":{\"exemplarCity\":\"Lubumbashi\"},\"Lusaka\":{\"exemplarCity\":\"Lusaka\"},\"Malabo\":{\"exemplarCity\":\"Malabo\"},\"Maputo\":{\"exemplarCity\":\"Maputo\"},\"Maseru\":{\"exemplarCity\":\"Maseru\"},\"Mbabane\":{\"exemplarCity\":\"Mbabane\"},\"Mogadishu\":{\"exemplarCity\":\"Mogadiscio\"},\"Monrovia\":{\"exemplarCity\":\"Monrovia\"},\"Nairobi\":{\"exemplarCity\":\"Nairobi\"},\"Ndjamena\":{\"exemplarCity\":\"N’Djamena\"},\"Niamey\":{\"exemplarCity\":\"Niamey\"},\"Nouakchott\":{\"exemplarCity\":\"Nouakchott\"},\"Ouagadougou\":{\"exemplarCity\":\"Ouagadougou\"},\"Porto-Novo\":{\"exemplarCity\":\"Porto-Novo\"},\"Sao_Tome\":{\"exemplarCity\":\"São Tomé\"},\"Tripoli\":{\"exemplarCity\":\"Tripoli\"},\"Tunis\":{\"exemplarCity\":\"Tunisi\"},\"Windhoek\":{\"exemplarCity\":\"Windhoek\"}},\"Asia\":{\"Aden\":{\"exemplarCity\":\"Aden\"},\"Almaty\":{\"exemplarCity\":\"Almaty\"},\"Amman\":{\"exemplarCity\":\"Amman\"},\"Anadyr\":{\"exemplarCity\":\"Anadyr’\"},\"Aqtau\":{\"exemplarCity\":\"Aqtau\"},\"Aqtobe\":{\"exemplarCity\":\"Aqtöbe\"},\"Ashgabat\":{\"exemplarCity\":\"Ashgabat\"},\"Atyrau\":{\"exemplarCity\":\"Atyrau\"},\"Baghdad\":{\"exemplarCity\":\"Baghdad\"},\"Bahrain\":{\"exemplarCity\":\"Bahrein\"},\"Baku\":{\"exemplarCity\":\"Baku\"},\"Bangkok\":{\"exemplarCity\":\"Bangkok\"},\"Barnaul\":{\"exemplarCity\":\"Barnaul\"},\"Beirut\":{\"exemplarCity\":\"Beirut\"},\"Bishkek\":{\"exemplarCity\":\"Bishkek\"},\"Brunei\":{\"exemplarCity\":\"Brunei\"},\"Calcutta\":{\"exemplarCity\":\"Calcutta\"},\"Chita\":{\"exemplarCity\":\"Čita\"},\"Choibalsan\":{\"exemplarCity\":\"Choibalsan\"},\"Colombo\":{\"exemplarCity\":\"Colombo\"},\"Damascus\":{\"exemplarCity\":\"Damasco\"},\"Dhaka\":{\"exemplarCity\":\"Dacca\"},\"Dili\":{\"exemplarCity\":\"Dili\"},\"Dubai\":{\"exemplarCity\":\"Dubai\"},\"Dushanbe\":{\"exemplarCity\":\"Dushanbe\"},\"Famagusta\":{\"exemplarCity\":\"Famagosta\"},\"Gaza\":{\"exemplarCity\":\"Gaza\"},\"Hebron\":{\"exemplarCity\":\"Hebron\"},\"Hong_Kong\":{\"exemplarCity\":\"Hong Kong\"},\"Hovd\":{\"exemplarCity\":\"Hovd\"},\"Irkutsk\":{\"exemplarCity\":\"Irkutsk\"},\"Jakarta\":{\"exemplarCity\":\"Giacarta\"},\"Jayapura\":{\"exemplarCity\":\"Jayapura\"},\"Jerusalem\":{\"exemplarCity\":\"Gerusalemme\"},\"Kabul\":{\"exemplarCity\":\"Kabul\"},\"Kamchatka\":{\"exemplarCity\":\"Kamchatka\"},\"Karachi\":{\"exemplarCity\":\"Karachi\"},\"Katmandu\":{\"exemplarCity\":\"Kathmandu\"},\"Khandyga\":{\"exemplarCity\":\"Chandyga\"},\"Krasnoyarsk\":{\"exemplarCity\":\"Krasnojarsk\"},\"Kuala_Lumpur\":{\"exemplarCity\":\"Kuala Lumpur\"},\"Kuching\":{\"exemplarCity\":\"Kuching\"},\"Kuwait\":{\"exemplarCity\":\"Kuwait\"},\"Macau\":{\"exemplarCity\":\"Macao\"},\"Magadan\":{\"exemplarCity\":\"Magadan\"},\"Makassar\":{\"exemplarCity\":\"Makassar\"},\"Manila\":{\"exemplarCity\":\"Manila\"},\"Muscat\":{\"exemplarCity\":\"Mascate\"},\"Nicosia\":{\"exemplarCity\":\"Nicosia\"},\"Novokuznetsk\":{\"exemplarCity\":\"Novokuzneck\"},\"Novosibirsk\":{\"exemplarCity\":\"Novosibirsk\"},\"Omsk\":{\"exemplarCity\":\"Omsk\"},\"Oral\":{\"exemplarCity\":\"Oral\"},\"Phnom_Penh\":{\"exemplarCity\":\"Phnom Penh\"},\"Pontianak\":{\"exemplarCity\":\"Pontianak\"},\"Pyongyang\":{\"exemplarCity\":\"Pyongyang\"},\"Qatar\":{\"exemplarCity\":\"Qatar\"},\"Qostanay\":{\"exemplarCity\":\"Qostanay\"},\"Qyzylorda\":{\"exemplarCity\":\"Qyzylorda\"},\"Rangoon\":{\"exemplarCity\":\"Rangoon\"},\"Riyadh\":{\"exemplarCity\":\"Riyad\"},\"Saigon\":{\"exemplarCity\":\"Ho Chi Minh\"},\"Sakhalin\":{\"exemplarCity\":\"Sachalin\"},\"Samarkand\":{\"exemplarCity\":\"Samarcanda\"},\"Seoul\":{\"exemplarCity\":\"Seul\"},\"Shanghai\":{\"exemplarCity\":\"Shanghai\"},\"Singapore\":{\"exemplarCity\":\"Singapore\"},\"Srednekolymsk\":{\"exemplarCity\":\"Srednekolymsk\"},\"Taipei\":{\"exemplarCity\":\"Taipei\"},\"Tashkent\":{\"exemplarCity\":\"Tashkent\"},\"Tbilisi\":{\"exemplarCity\":\"Tbilisi\"},\"Tehran\":{\"exemplarCity\":\"Teheran\"},\"Thimphu\":{\"exemplarCity\":\"Thimphu\"},\"Tokyo\":{\"exemplarCity\":\"Tokyo\"},\"Tomsk\":{\"exemplarCity\":\"Tomsk\"},\"Ulaanbaatar\":{\"exemplarCity\":\"Ulaanbaatar\"},\"Urumqi\":{\"exemplarCity\":\"Urumqi\"},\"Ust-Nera\":{\"exemplarCity\":\"Ust’-Nera\"},\"Vientiane\":{\"exemplarCity\":\"Vientiane\"},\"Vladivostok\":{\"exemplarCity\":\"Vladivostok\"},\"Yakutsk\":{\"exemplarCity\":\"Jakutsk\"},\"Yekaterinburg\":{\"exemplarCity\":\"Ekaterinburg\"},\"Yerevan\":{\"exemplarCity\":\"Yerevan\"}},\"Indian\":{\"Antananarivo\":{\"exemplarCity\":\"Antananarivo\"},\"Chagos\":{\"exemplarCity\":\"Chagos\"},\"Christmas\":{\"exemplarCity\":\"Natale\"},\"Cocos\":{\"exemplarCity\":\"Cocos\"},\"Comoro\":{\"exemplarCity\":\"Comore\"},\"Kerguelen\":{\"exemplarCity\":\"Kerguelen\"},\"Mahe\":{\"exemplarCity\":\"Mahe\"},\"Maldives\":{\"exemplarCity\":\"Maldive\"},\"Mauritius\":{\"exemplarCity\":\"Mauritius\"},\"Mayotte\":{\"exemplarCity\":\"Mayotte\"},\"Reunion\":{\"exemplarCity\":\"La Riunione\"}},\"Australia\":{\"Adelaide\":{\"exemplarCity\":\"Adelaide\"},\"Brisbane\":{\"exemplarCity\":\"Brisbane\"},\"Broken_Hill\":{\"exemplarCity\":\"Broken Hill\"},\"Currie\":{\"exemplarCity\":\"Currie\"},\"Darwin\":{\"exemplarCity\":\"Darwin\"},\"Eucla\":{\"exemplarCity\":\"Eucla\"},\"Hobart\":{\"exemplarCity\":\"Hobart\"},\"Lindeman\":{\"exemplarCity\":\"Lindeman\"},\"Lord_Howe\":{\"exemplarCity\":\"Lord Howe\"},\"Melbourne\":{\"exemplarCity\":\"Melbourne\"},\"Perth\":{\"exemplarCity\":\"Perth\"},\"Sydney\":{\"exemplarCity\":\"Sydney\"}},\"Pacific\":{\"Apia\":{\"exemplarCity\":\"Apia\"},\"Auckland\":{\"exemplarCity\":\"Auckland\"},\"Bougainville\":{\"exemplarCity\":\"Bougainville\"},\"Chatham\":{\"exemplarCity\":\"Chatham\"},\"Easter\":{\"exemplarCity\":\"Pasqua\"},\"Efate\":{\"exemplarCity\":\"Efate\"},\"Enderbury\":{\"exemplarCity\":\"Enderbury\"},\"Fakaofo\":{\"exemplarCity\":\"Fakaofo\"},\"Fiji\":{\"exemplarCity\":\"Figi\"},\"Funafuti\":{\"exemplarCity\":\"Funafuti\"},\"Galapagos\":{\"exemplarCity\":\"Galapagos\"},\"Gambier\":{\"exemplarCity\":\"Gambier\"},\"Guadalcanal\":{\"exemplarCity\":\"Guadalcanal\"},\"Guam\":{\"exemplarCity\":\"Guam\"},\"Honolulu\":{\"exemplarCity\":\"Honolulu\"},\"Johnston\":{\"exemplarCity\":\"Johnston\"},\"Kiritimati\":{\"exemplarCity\":\"Kiritimati\"},\"Kosrae\":{\"exemplarCity\":\"Kosrae\"},\"Kwajalein\":{\"exemplarCity\":\"Kwajalein\"},\"Majuro\":{\"exemplarCity\":\"Majuro\"},\"Marquesas\":{\"exemplarCity\":\"Marchesi\"},\"Midway\":{\"exemplarCity\":\"Midway\"},\"Nauru\":{\"exemplarCity\":\"Nauru\"},\"Niue\":{\"exemplarCity\":\"Niue\"},\"Norfolk\":{\"exemplarCity\":\"Norfolk\"},\"Noumea\":{\"exemplarCity\":\"Noumea\"},\"Pago_Pago\":{\"exemplarCity\":\"Pago Pago\"},\"Palau\":{\"exemplarCity\":\"Palau\"},\"Pitcairn\":{\"exemplarCity\":\"Pitcairn\"},\"Ponape\":{\"exemplarCity\":\"Pohnpei\"},\"Port_Moresby\":{\"exemplarCity\":\"Port Moresby\"},\"Rarotonga\":{\"exemplarCity\":\"Rarotonga\"},\"Saipan\":{\"exemplarCity\":\"Saipan\"},\"Tahiti\":{\"exemplarCity\":\"Tahiti\"},\"Tarawa\":{\"exemplarCity\":\"Tarawa\"},\"Tongatapu\":{\"exemplarCity\":\"Tongatapu\"},\"Truk\":{\"exemplarCity\":\"Chuuk\"},\"Wake\":{\"exemplarCity\":\"Wake\"},\"Wallis\":{\"exemplarCity\":\"Wallis\"}},\"Arctic\":{\"Longyearbyen\":{\"exemplarCity\":\"Longyearbyen\"}},\"Antarctica\":{\"Casey\":{\"exemplarCity\":\"Casey\"},\"Davis\":{\"exemplarCity\":\"Davis\"},\"DumontDUrville\":{\"exemplarCity\":\"Dumont d’Urville\"},\"Macquarie\":{\"exemplarCity\":\"Macquarie\"},\"Mawson\":{\"exemplarCity\":\"Mawson\"},\"McMurdo\":{\"exemplarCity\":\"McMurdo\"},\"Palmer\":{\"exemplarCity\":\"Palmer\"},\"Rothera\":{\"exemplarCity\":\"Rothera\"},\"Syowa\":{\"exemplarCity\":\"Syowa\"},\"Troll\":{\"exemplarCity\":\"Troll\"},\"Vostok\":{\"exemplarCity\":\"Vostok\"}},\"Etc\":{\"UTC\":{\"long\":{\"standard\":\"Tempo coordinato universale\"},\"short\":{\"standard\":\"UTC\"}},\"Unknown\":{\"exemplarCity\":\"Città sconosciuta\"}}},\"metazone\":{\"Afghanistan\":{\"long\":{\"standard\":\"Ora dell’Afghanistan\"}},\"Africa_Central\":{\"long\":{\"standard\":\"Ora dell’Africa centrale\"}},\"Africa_Eastern\":{\"long\":{\"standard\":\"Ora dell’Africa orientale\"}},\"Africa_Southern\":{\"long\":{\"standard\":\"Ora dell’Africa meridionale\"}},\"Africa_Western\":{\"long\":{\"generic\":\"Ora dell’Africa occidentale\",\"standard\":\"Ora standard dell’Africa occidentale\",\"daylight\":\"Ora legale dell’Africa occidentale\"}},\"Alaska\":{\"long\":{\"generic\":\"Ora dell’Alaska\",\"standard\":\"Ora standard dell’Alaska\",\"daylight\":\"Ora legale dell’Alaska\"}},\"Amazon\":{\"long\":{\"generic\":\"Ora dell’Amazzonia\",\"standard\":\"Ora standard dell’Amazzonia\",\"daylight\":\"Ora legale dell’Amazzonia\"}},\"America_Central\":{\"long\":{\"generic\":\"Ora centrale USA\",\"standard\":\"Ora standard centrale USA\",\"daylight\":\"Ora legale centrale USA\"}},\"America_Eastern\":{\"long\":{\"generic\":\"Ora orientale USA\",\"standard\":\"Ora standard orientale USA\",\"daylight\":\"Ora legale orientale USA\"}},\"America_Mountain\":{\"long\":{\"generic\":\"Ora Montagne Rocciose USA\",\"standard\":\"Ora standard Montagne Rocciose USA\",\"daylight\":\"Ora legale Montagne Rocciose USA\"}},\"America_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico USA\",\"standard\":\"Ora standard del Pacifico USA\",\"daylight\":\"Ora legale del Pacifico USA\"}},\"Anadyr\":{\"long\":{\"generic\":\"Ora di Anadyr\",\"standard\":\"Ora standard di Anadyr\",\"daylight\":\"Ora legale di Anadyr\"}},\"Apia\":{\"long\":{\"generic\":\"Ora di Apia\",\"standard\":\"Ora standard di Apia\",\"daylight\":\"Ora legale di Apia\"}},\"Arabian\":{\"long\":{\"generic\":\"Ora araba\",\"standard\":\"Ora standard araba\",\"daylight\":\"Ora legale araba\"}},\"Argentina\":{\"long\":{\"generic\":\"Ora dell’Argentina\",\"standard\":\"Ora standard dell’Argentina\",\"daylight\":\"Ora legale dell’Argentina\"}},\"Argentina_Western\":{\"long\":{\"generic\":\"Ora dell’Argentina occidentale\",\"standard\":\"Ora standard dell’Argentina occidentale\",\"daylight\":\"Ora legale dell’Argentina occidentale\"}},\"Armenia\":{\"long\":{\"generic\":\"Ora dell’Armenia\",\"standard\":\"Ora standard dell’Armenia\",\"daylight\":\"Ora legale dell’Armenia\"}},\"Atlantic\":{\"long\":{\"generic\":\"Ora dell’Atlantico\",\"standard\":\"Ora standard dell’Atlantico\",\"daylight\":\"Ora legale dell’Atlantico\"}},\"Australia_Central\":{\"long\":{\"generic\":\"Ora dell’Australia centrale\",\"standard\":\"Ora standard dell’Australia centrale\",\"daylight\":\"Ora legale dell’Australia centrale\"}},\"Australia_CentralWestern\":{\"long\":{\"generic\":\"Ora dell’Australia centroccidentale\",\"standard\":\"Ora standard dell’Australia centroccidentale\",\"daylight\":\"Ora legale dell’Australia centroccidentale\"}},\"Australia_Eastern\":{\"long\":{\"generic\":\"Ora dell’Australia orientale\",\"standard\":\"Ora standard dell’Australia orientale\",\"daylight\":\"Ora legale dell’Australia orientale\"}},\"Australia_Western\":{\"long\":{\"generic\":\"Ora dell’Australia occidentale\",\"standard\":\"Ora standard dell’Australia occidentale\",\"daylight\":\"Ora legale dell’Australia occidentale\"}},\"Azerbaijan\":{\"long\":{\"generic\":\"Ora dell’Azerbaigian\",\"standard\":\"Ora standard dell’Azerbaigian\",\"daylight\":\"Ora legale dell’Azerbaigian\"}},\"Azores\":{\"long\":{\"generic\":\"Ora delle Azzorre\",\"standard\":\"Ora standard delle Azzorre\",\"daylight\":\"Ora legale delle Azzorre\"}},\"Bangladesh\":{\"long\":{\"generic\":\"Ora del Bangladesh\",\"standard\":\"Ora standard del Bangladesh\",\"daylight\":\"Ora legale del Bangladesh\"}},\"Bhutan\":{\"long\":{\"standard\":\"Ora del Bhutan\"}},\"Bolivia\":{\"long\":{\"standard\":\"Ora della Bolivia\"}},\"Brasilia\":{\"long\":{\"generic\":\"Ora di Brasilia\",\"standard\":\"Ora standard di Brasilia\",\"daylight\":\"Ora legale di Brasilia\"}},\"Brunei\":{\"long\":{\"standard\":\"Ora del Brunei Darussalam\"}},\"Cape_Verde\":{\"long\":{\"generic\":\"Ora di Capo Verde\",\"standard\":\"Ora standard di Capo Verde\",\"daylight\":\"Ora legale di Capo Verde\"}},\"Chamorro\":{\"long\":{\"standard\":\"Ora di Chamorro\"}},\"Chatham\":{\"long\":{\"generic\":\"Ora delle Chatham\",\"standard\":\"Ora standard delle Chatham\",\"daylight\":\"Ora legale delle Chatham\"}},\"Chile\":{\"long\":{\"generic\":\"Ora del Cile\",\"standard\":\"Ora standard del Cile\",\"daylight\":\"Ora legale del Cile\"}},\"China\":{\"long\":{\"generic\":\"Ora della Cina\",\"standard\":\"Ora standard della Cina\",\"daylight\":\"Ora legale della Cina\"}},\"Choibalsan\":{\"long\":{\"generic\":\"Ora di Choibalsan\",\"standard\":\"Ora standard di Choibalsan\",\"daylight\":\"Ora legale di Choibalsan\"}},\"Christmas\":{\"long\":{\"standard\":\"Ora dell’Isola Christmas\"}},\"Cocos\":{\"long\":{\"standard\":\"Ora delle Isole Cocos\"}},\"Colombia\":{\"long\":{\"generic\":\"Ora della Colombia\",\"standard\":\"Ora standard della Colombia\",\"daylight\":\"Ora legale della Colombia\"}},\"Cook\":{\"long\":{\"generic\":\"Ora delle isole Cook\",\"standard\":\"Ora standard delle isole Cook\",\"daylight\":\"Ora legale media delle isole Cook\"}},\"Cuba\":{\"long\":{\"generic\":\"Ora di Cuba\",\"standard\":\"Ora standard di Cuba\",\"daylight\":\"Ora legale di Cuba\"}},\"Davis\":{\"long\":{\"standard\":\"Ora di Davis\"}},\"DumontDUrville\":{\"long\":{\"standard\":\"Ora di Dumont-d’Urville\"}},\"East_Timor\":{\"long\":{\"standard\":\"Ora di Timor Est\"}},\"Easter\":{\"long\":{\"generic\":\"Ora dell’Isola di Pasqua\",\"standard\":\"Ora standard dell’Isola di Pasqua\",\"daylight\":\"Ora legale dell’Isola di Pasqua\"}},\"Ecuador\":{\"long\":{\"standard\":\"Ora dell’Ecuador\"}},\"Europe_Central\":{\"long\":{\"generic\":\"Ora dell’Europa centrale\",\"standard\":\"Ora standard dell’Europa centrale\",\"daylight\":\"Ora legale dell’Europa centrale\"},\"short\":{\"generic\":\"CET\",\"standard\":\"CET\",\"daylight\":\"CEST\"}},\"Europe_Eastern\":{\"long\":{\"generic\":\"Ora dell’Europa orientale\",\"standard\":\"Ora standard dell’Europa orientale\",\"daylight\":\"Ora legale dell’Europa orientale\"},\"short\":{\"generic\":\"EET\",\"standard\":\"EET\",\"daylight\":\"EEST\"}},\"Europe_Further_Eastern\":{\"long\":{\"standard\":\"Ora dell’Europa orientale (Kaliningrad)\"}},\"Europe_Western\":{\"long\":{\"generic\":\"Ora dell’Europa occidentale\",\"standard\":\"Ora standard dell’Europa occidentale\",\"daylight\":\"Ora legale dell’Europa occidentale\"},\"short\":{\"generic\":\"WET\",\"standard\":\"WET\",\"daylight\":\"WEST\"}},\"Falkland\":{\"long\":{\"generic\":\"Ora delle Isole Falkland\",\"standard\":\"Ora standard delle Isole Falkland\",\"daylight\":\"Ora legale delle Isole Falkland\"}},\"Fiji\":{\"long\":{\"generic\":\"Ora delle Figi\",\"standard\":\"Ora standard delle Figi\",\"daylight\":\"Ora legale delle Figi\"}},\"French_Guiana\":{\"long\":{\"standard\":\"Ora della Guiana francese\"}},\"French_Southern\":{\"long\":{\"standard\":\"Ora delle Terre australi e antartiche francesi\"}},\"Galapagos\":{\"long\":{\"standard\":\"Ora delle Galapagos\"}},\"Gambier\":{\"long\":{\"standard\":\"Ora di Gambier\"}},\"Georgia\":{\"long\":{\"generic\":\"Ora della Georgia\",\"standard\":\"Ora standard della Georgia\",\"daylight\":\"Ora legale della Georgia\"}},\"Gilbert_Islands\":{\"long\":{\"standard\":\"Ora delle isole Gilbert\"}},\"GMT\":{\"long\":{\"standard\":\"Ora del meridiano di Greenwich\"}},\"Greenland_Eastern\":{\"long\":{\"generic\":\"Ora della Groenlandia orientale\",\"standard\":\"Ora standard della Groenlandia orientale\",\"daylight\":\"Ora legale della Groenlandia orientale\"}},\"Greenland_Western\":{\"long\":{\"generic\":\"Ora della Groenlandia occidentale\",\"standard\":\"Ora standard della Groenlandia occidentale\",\"daylight\":\"Ora legale della Groenlandia occidentale\"}},\"Gulf\":{\"long\":{\"standard\":\"Ora del Golfo\"}},\"Guyana\":{\"long\":{\"standard\":\"Ora della Guyana\"}},\"Hawaii_Aleutian\":{\"long\":{\"generic\":\"Ora delle isole Hawaii-Aleutine\",\"standard\":\"Ora standard delle Isole Hawaii-Aleutine\",\"daylight\":\"Ora legale delle Isole Hawaii-Aleutine\"}},\"Hong_Kong\":{\"long\":{\"generic\":\"Ora di Hong Kong\",\"standard\":\"Ora standard di Hong Kong\",\"daylight\":\"Ora legale di Hong Kong\"}},\"Hovd\":{\"long\":{\"generic\":\"Ora di Hovd\",\"standard\":\"Ora standard di Hovd\",\"daylight\":\"Ora legale di Hovd\"}},\"India\":{\"long\":{\"standard\":\"Ora standard dell’India\"}},\"Indian_Ocean\":{\"long\":{\"standard\":\"Ora dell’Oceano Indiano\"}},\"Indochina\":{\"long\":{\"standard\":\"Ora dell’Indocina\"}},\"Indonesia_Central\":{\"long\":{\"standard\":\"Ora dell’Indonesia centrale\"}},\"Indonesia_Eastern\":{\"long\":{\"standard\":\"Ora dell’Indonesia orientale\"}},\"Indonesia_Western\":{\"long\":{\"standard\":\"Ora dell’Indonesia occidentale\"}},\"Iran\":{\"long\":{\"generic\":\"Ora dell’Iran\",\"standard\":\"Ora standard dell’Iran\",\"daylight\":\"Ora legale dell’Iran\"}},\"Irkutsk\":{\"long\":{\"generic\":\"Ora di Irkutsk\",\"standard\":\"Ora standard di Irkutsk\",\"daylight\":\"Ora legale di Irkutsk\"}},\"Israel\":{\"long\":{\"generic\":\"Ora di Israele\",\"standard\":\"Ora standard di Israele\",\"daylight\":\"Ora legale di Israele\"}},\"Japan\":{\"long\":{\"generic\":\"Ora del Giappone\",\"standard\":\"Ora standard del Giappone\",\"daylight\":\"Ora legale del Giappone\"}},\"Kamchatka\":{\"long\":{\"generic\":\"Ora di Petropavlovsk-Kamchatski\",\"standard\":\"Ora standard di Petropavlovsk-Kamchatski\",\"daylight\":\"Ora legale di Petropavlovsk-Kamchatski\"}},\"Kazakhstan_Eastern\":{\"long\":{\"standard\":\"Ora del Kazakistan orientale\"}},\"Kazakhstan_Western\":{\"long\":{\"standard\":\"Ora del Kazakistan occidentale\"}},\"Korea\":{\"long\":{\"generic\":\"Ora coreana\",\"standard\":\"Ora standard coreana\",\"daylight\":\"Ora legale coreana\"}},\"Kosrae\":{\"long\":{\"standard\":\"Ora del Kosrae\"}},\"Krasnoyarsk\":{\"long\":{\"generic\":\"Ora di Krasnoyarsk\",\"standard\":\"Ora standard di Krasnoyarsk\",\"daylight\":\"Ora legale di Krasnoyarsk\"}},\"Kyrgystan\":{\"long\":{\"standard\":\"Ora del Kirghizistan\"}},\"Line_Islands\":{\"long\":{\"standard\":\"Ora delle Sporadi equatoriali\"}},\"Lord_Howe\":{\"long\":{\"generic\":\"Ora di Lord Howe\",\"standard\":\"Ora standard di Lord Howe\",\"daylight\":\"Ora legale di Lord Howe\"}},\"Macquarie\":{\"long\":{\"standard\":\"Ora dell’Isola Macquarie\"}},\"Magadan\":{\"long\":{\"generic\":\"Ora di Magadan\",\"standard\":\"Ora standard di Magadan\",\"daylight\":\"Ora legale di Magadan\"}},\"Malaysia\":{\"long\":{\"standard\":\"Ora della Malesia\"}},\"Maldives\":{\"long\":{\"standard\":\"Ora delle Maldive\"}},\"Marquesas\":{\"long\":{\"standard\":\"Ora delle Marchesi\"}},\"Marshall_Islands\":{\"long\":{\"standard\":\"Ora delle Isole Marshall\"}},\"Mauritius\":{\"long\":{\"generic\":\"Ora delle Mauritius\",\"standard\":\"Ora standard delle Mauritius\",\"daylight\":\"Ora legale delle Mauritius\"}},\"Mawson\":{\"long\":{\"standard\":\"Ora di Mawson\"}},\"Mexico_Northwest\":{\"long\":{\"generic\":\"Ora del Messico nord-occidentale\",\"standard\":\"Ora standard del Messico nord-occidentale\",\"daylight\":\"Ora legale del Messico nord-occidentale\"}},\"Mexico_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico (Messico)\",\"standard\":\"Ora standard del Pacifico (Messico)\",\"daylight\":\"Ora legale del Pacifico (Messico)\"}},\"Mongolia\":{\"long\":{\"generic\":\"Ora di Ulan Bator\",\"standard\":\"Ora standard di Ulan Bator\",\"daylight\":\"Ora legale di Ulan Bator\"}},\"Moscow\":{\"long\":{\"generic\":\"Ora di Mosca\",\"standard\":\"Ora standard di Mosca\",\"daylight\":\"Ora legale di Mosca\"}},\"Myanmar\":{\"long\":{\"standard\":\"Ora della Birmania\"}},\"Nauru\":{\"long\":{\"standard\":\"Ora di Nauru\"}},\"Nepal\":{\"long\":{\"standard\":\"Ora del Nepal\"}},\"New_Caledonia\":{\"long\":{\"generic\":\"Ora della Nuova Caledonia\",\"standard\":\"Ora standard della Nuova Caledonia\",\"daylight\":\"Ora legale della Nuova Caledonia\"}},\"New_Zealand\":{\"long\":{\"generic\":\"Ora della Nuova Zelanda\",\"standard\":\"Ora standard della Nuova Zelanda\",\"daylight\":\"Ora legale della Nuova Zelanda\"}},\"Newfoundland\":{\"long\":{\"generic\":\"Ora di Terranova\",\"standard\":\"Ora standard di Terranova\",\"daylight\":\"Ora legale di Terranova\"}},\"Niue\":{\"long\":{\"standard\":\"Ora di Niue\"}},\"Norfolk\":{\"long\":{\"standard\":\"Ora delle Isole Norfolk\"}},\"Noronha\":{\"long\":{\"generic\":\"Ora di Fernando de Noronha\",\"standard\":\"Ora standard di Fernando de Noronha\",\"daylight\":\"Ora legale di Fernando de Noronha\"}},\"Novosibirsk\":{\"long\":{\"generic\":\"Ora di Novosibirsk\",\"standard\":\"Ora standard di Novosibirsk\",\"daylight\":\"Ora legale di Novosibirsk\"}},\"Omsk\":{\"long\":{\"generic\":\"Ora di Omsk\",\"standard\":\"Ora standard di Omsk\",\"daylight\":\"Ora legale di Omsk\"}},\"Pakistan\":{\"long\":{\"generic\":\"Ora del Pakistan\",\"standard\":\"Ora standard del Pakistan\",\"daylight\":\"Ora legale del Pakistan\"}},\"Palau\":{\"long\":{\"standard\":\"Ora di Palau\"}},\"Papua_New_Guinea\":{\"long\":{\"standard\":\"Ora della Papua Nuova Guinea\"}},\"Paraguay\":{\"long\":{\"generic\":\"Ora del Paraguay\",\"standard\":\"Ora standard del Paraguay\",\"daylight\":\"Ora legale del Paraguay\"}},\"Peru\":{\"long\":{\"generic\":\"Ora del Perù\",\"standard\":\"Ora standard del Perù\",\"daylight\":\"Ora legale del Perù\"}},\"Philippines\":{\"long\":{\"generic\":\"Ora delle Filippine\",\"standard\":\"Ora standard delle Filippine\",\"daylight\":\"Ora legale delle Filippine\"}},\"Phoenix_Islands\":{\"long\":{\"standard\":\"Ora delle Isole della Fenice\"}},\"Pierre_Miquelon\":{\"long\":{\"generic\":\"Ora di Saint-Pierre e Miquelon\",\"standard\":\"Ora standard di Saint-Pierre e Miquelon\",\"daylight\":\"Ora legale di Saint-Pierre e Miquelon\"}},\"Pitcairn\":{\"long\":{\"standard\":\"Ora delle Pitcairn\"}},\"Ponape\":{\"long\":{\"standard\":\"Ora di Pohnpei\"}},\"Pyongyang\":{\"long\":{\"standard\":\"Ora di Pyongyang\"}},\"Reunion\":{\"long\":{\"standard\":\"Ora di Riunione\"}},\"Rothera\":{\"long\":{\"standard\":\"Ora di Rothera\"}},\"Sakhalin\":{\"long\":{\"generic\":\"Ora di Sakhalin\",\"standard\":\"Ora standard di Sakhalin\",\"daylight\":\"Ora legale di Sakhalin\"}},\"Samara\":{\"long\":{\"generic\":\"Ora di Samara\",\"standard\":\"Ora standard di Samara\",\"daylight\":\"Ora legale di Samara\"}},\"Samoa\":{\"long\":{\"generic\":\"Ora di Samoa\",\"standard\":\"Ora standard di Samoa\",\"daylight\":\"Ora legale di Samoa\"}},\"Seychelles\":{\"long\":{\"standard\":\"Ora delle Seychelles\"}},\"Singapore\":{\"long\":{\"standard\":\"Ora di Singapore\"}},\"Solomon\":{\"long\":{\"standard\":\"Ora delle Isole Salomone\"}},\"South_Georgia\":{\"long\":{\"standard\":\"Ora della Georgia del Sud\"}},\"Suriname\":{\"long\":{\"standard\":\"Ora del Suriname\"}},\"Syowa\":{\"long\":{\"standard\":\"Ora di Syowa\"}},\"Tahiti\":{\"long\":{\"standard\":\"Ora di Tahiti\"}},\"Taipei\":{\"long\":{\"generic\":\"Ora di Taipei\",\"standard\":\"Ora standard di Taipei\",\"daylight\":\"Ora legale di Taipei\"}},\"Tajikistan\":{\"long\":{\"standard\":\"Ora del Tagikistan\"}},\"Tokelau\":{\"long\":{\"standard\":\"Ora di Tokelau\"}},\"Tonga\":{\"long\":{\"generic\":\"Ora di Tonga\",\"standard\":\"Ora standard di Tonga\",\"daylight\":\"Ora legale di Tonga\"}},\"Truk\":{\"long\":{\"standard\":\"Ora del Chuuk\"}},\"Turkmenistan\":{\"long\":{\"generic\":\"Ora del Turkmenistan\",\"standard\":\"Ora standard del Turkmenistan\",\"daylight\":\"Ora legale del Turkmenistan\"}},\"Tuvalu\":{\"long\":{\"standard\":\"Ora di Tuvalu\"}},\"Uruguay\":{\"long\":{\"generic\":\"Ora dell’Uruguay\",\"standard\":\"Ora standard dell’Uruguay\",\"daylight\":\"Ora legale dell’Uruguay\"}},\"Uzbekistan\":{\"long\":{\"generic\":\"Ora dell’Uzbekistan\",\"standard\":\"Ora standard dell’Uzbekistan\",\"daylight\":\"Ora legale dell’Uzbekistan\"}},\"Vanuatu\":{\"long\":{\"generic\":\"Ora del Vanuatu\",\"standard\":\"Ora standard del Vanuatu\",\"daylight\":\"Ora legale del Vanuatu\"}},\"Venezuela\":{\"long\":{\"standard\":\"Ora del Venezuela\"}},\"Vladivostok\":{\"long\":{\"generic\":\"Ora di Vladivostok\",\"standard\":\"Ora standard di Vladivostok\",\"daylight\":\"Ora legale di Vladivostok\"}},\"Volgograd\":{\"long\":{\"generic\":\"Ora di Volgograd\",\"standard\":\"Ora standard di Volgograd\",\"daylight\":\"Ora legale di Volgograd\"}},\"Vostok\":{\"long\":{\"standard\":\"Ora di Vostok\"}},\"Wake\":{\"long\":{\"standard\":\"Ora dell’Isola di Wake\"}},\"Wallis\":{\"long\":{\"standard\":\"Ora di Wallis e Futuna\"}},\"Yakutsk\":{\"long\":{\"generic\":\"Ora di Yakutsk\",\"standard\":\"Ora standard di Yakutsk\",\"daylight\":\"Ora legale di Yakutsk\"}},\"Yekaterinburg\":{\"long\":{\"generic\":\"Ora di Ekaterinburg\",\"standard\":\"Ora standard di Ekaterinburg\",\"daylight\":\"Ora legale di Ekaterinburg\"}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-SM/ca-gregorian.json":
/*!*************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-SM/ca-gregorian.json ***!
  \*************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-SM\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"SM\"},\"dates\":{\"calendars\":{\"gregorian\":{\"months\":{\"format\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}}},\"days\":{\"format\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}},\"stand-alone\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}}},\"quarters\":{\"format\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}}},\"dayPeriods\":{\"format\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"del pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"}},\"stand-alone\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"}}},\"eras\":{\"eraNames\":{\"0\":\"avanti Cristo\",\"1\":\"dopo Cristo\",\"0-alt-variant\":\"avanti Era Volgare\",\"1-alt-variant\":\"Era Volgare\"},\"eraAbbr\":{\"0\":\"a.C.\",\"1\":\"d.C.\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"},\"eraNarrow\":{\"0\":\"aC\",\"1\":\"dC\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"}},\"dateFormats\":{\"full\":\"EEEE d MMMM y\",\"long\":\"d MMMM y\",\"medium\":\"d MMM y\",\"short\":\"dd/MM/yy\"},\"timeFormats\":{\"full\":\"HH:mm:ss zzzz\",\"long\":\"HH:mm:ss z\",\"medium\":\"HH:mm:ss\",\"short\":\"HH:mm\"},\"dateTimeFormats\":{\"full\":\"{1} {0}\",\"long\":\"{1} {0}\",\"medium\":\"{1}, {0}\",\"short\":\"{1}, {0}\",\"availableFormats\":{\"Bh\":\"h B\",\"Bhm\":\"h:mm B\",\"Bhms\":\"h:mm:ss B\",\"d\":\"d\",\"E\":\"ccc\",\"EBhm\":\"E h:mm B\",\"EBhms\":\"E h:mm:ss B\",\"Ed\":\"E d\",\"Ehm\":\"E h:mm a\",\"EHm\":\"E HH:mm\",\"Ehms\":\"E h:mm:ss a\",\"EHms\":\"E HH:mm:ss\",\"Gy\":\"y G\",\"GyMMM\":\"MMM y G\",\"GyMMMd\":\"d MMM y G\",\"GyMMMEd\":\"E d MMM y G\",\"h\":\"h a\",\"H\":\"HH\",\"hm\":\"h:mm a\",\"Hm\":\"HH:mm\",\"hms\":\"h:mm:ss a\",\"Hms\":\"HH:mm:ss\",\"hmsv\":\"h:mm:ss a v\",\"Hmsv\":\"HH:mm:ss v\",\"hmv\":\"h:mm a v\",\"Hmv\":\"HH:mm v\",\"M\":\"L\",\"Md\":\"d/M\",\"MEd\":\"E d/M\",\"MMM\":\"LLL\",\"MMMd\":\"d MMM\",\"MMMEd\":\"E d MMM\",\"MMMMd\":\"d MMMM\",\"MMMMW-count-one\":\"'settimana' W 'di' MMMM\",\"MMMMW-count-other\":\"'settimana' W 'di' MMMM\",\"ms\":\"mm:ss\",\"y\":\"y\",\"yM\":\"M/y\",\"yMd\":\"d/M/y\",\"yMEd\":\"E d/M/y\",\"yMMM\":\"MMM y\",\"yMMMd\":\"d MMM y\",\"yMMMEd\":\"E d MMM y\",\"yMMMM\":\"MMMM y\",\"yQQQ\":\"QQQ y\",\"yQQQQ\":\"QQQQ y\",\"yw-count-one\":\"'settimana' w 'del' Y\",\"yw-count-other\":\"'settimana' w 'del' Y\"},\"appendItems\":{\"Day\":\"{0} ({2}: {1})\",\"Day-Of-Week\":\"{0} {1}\",\"Era\":\"{1} {0}\",\"Hour\":\"{0} ({2}: {1})\",\"Minute\":\"{0} ({2}: {1})\",\"Month\":\"{0} ({2}: {1})\",\"Quarter\":\"{0} ({2}: {1})\",\"Second\":\"{0} ({2}: {1})\",\"Timezone\":\"{0} {1}\",\"Week\":\"{0} ({2}: {1})\",\"Year\":\"{1} {0}\"},\"intervalFormats\":{\"intervalFormatFallback\":\"{0} - {1}\",\"Bh\":{\"B\":\"h B – h B\",\"h\":\"h–h B\"},\"Bhm\":{\"B\":\"h:mm B – h:mm B\",\"h\":\"h:mm–h:mm B\",\"m\":\"h:mm–h:mm B\"},\"d\":{\"d\":\"d–d\"},\"Gy\":{\"G\":\"y G – y G\",\"y\":\"y – y G\"},\"GyM\":{\"G\":\"M/y GGGGG – M/y GGGGG\",\"M\":\"M/y – M/y GGGGG\",\"y\":\"M/y – M/y GGGGG\"},\"GyMd\":{\"d\":\"d/M/y – d/M/y GGGGG\",\"G\":\"d/M/y GGGGG – d/M/y GGGGG\",\"M\":\"d/M/y – d/M/y GGGGG\",\"y\":\"d/M/y – d/M/y GGGGG\"},\"GyMEd\":{\"d\":\"E d/M/y – E d/M/y GGGGG\",\"G\":\"E d/M/y – E d/M/y GGGGG\",\"M\":\"E d/M/y – E d/M/y GGGGG\",\"y\":\"E d/M/y – E d/M/y GGGGG\"},\"GyMMM\":{\"G\":\"MMM y G – MMM y G\",\"M\":\"MMM – MMM y G\",\"y\":\"MMM y – MMM y G\"},\"GyMMMd\":{\"d\":\"d – d MMM y G\",\"G\":\"d MMM y G – d MMM y G\",\"M\":\"d MMM – d MMM y G\",\"y\":\"d MMM y – d MMM y G\"},\"GyMMMEd\":{\"d\":\"E d MMM – d E MMM y G\",\"G\":\"E d MMM y G – E d MMM y G\",\"M\":\"E d MMM – E d MMM y G\",\"y\":\"E d MMM y – E d MMM y G\"},\"h\":{\"a\":\"h a – h a\",\"h\":\"h–h a\"},\"H\":{\"H\":\"HH–HH\"},\"hm\":{\"a\":\"h:mm a – h:mm a\",\"h\":\"h:mm–h:mm a\",\"m\":\"h:mm–h:mm a\"},\"Hm\":{\"H\":\"HH:mm–HH:mm\",\"m\":\"HH:mm–HH:mm\"},\"hmv\":{\"a\":\"h:mm a – h:mm a v\",\"h\":\"h:mm–h:mm a v\",\"m\":\"h:mm–h:mm a v\"},\"Hmv\":{\"H\":\"HH:mm–HH:mm v\",\"m\":\"HH:mm–HH:mm v\"},\"hv\":{\"a\":\"h a – h a v\",\"h\":\"h–h a v\"},\"Hv\":{\"H\":\"HH–HH v\"},\"M\":{\"M\":\"M–M\"},\"Md\":{\"d\":\"dd/MM – dd/MM\",\"M\":\"dd/MM – dd/MM\"},\"MEd\":{\"d\":\"E dd/MM – E dd/MM\",\"M\":\"E dd/MM – E dd/MM\"},\"MMM\":{\"M\":\"MMM–MMM\"},\"MMMd\":{\"d\":\"dd–dd MMM\",\"M\":\"dd MMM – dd MMM\"},\"MMMEd\":{\"d\":\"E dd – E dd MMM\",\"M\":\"E dd MMM – E dd MMM\"},\"y\":{\"y\":\"y–y\"},\"yM\":{\"M\":\"MM/y – MM/y\",\"y\":\"MM/y – MM/y\"},\"yMd\":{\"d\":\"dd/MM/y – dd/MM/y\",\"M\":\"dd/MM/y – dd/MM/y\",\"y\":\"dd/MM/y – dd/MM/y\"},\"yMEd\":{\"d\":\"E dd/MM/y – E dd/MM/y\",\"M\":\"E dd/MM/y – E dd/MM/y\",\"y\":\"E dd/MM/y – E dd/MM/y\"},\"yMMM\":{\"M\":\"MMM–MMM y\",\"y\":\"MMM y – MMM y\"},\"yMMMd\":{\"d\":\"dd–dd MMM y\",\"M\":\"dd MMM – dd MMM y\",\"y\":\"dd MMM y – dd MMM y\"},\"yMMMEd\":{\"d\":\"E d – E d MMM y\",\"M\":\"E d MMM – E d MMM y\",\"y\":\"E d MMM y – E d MMM y\"},\"yMMMM\":{\"M\":\"MMMM–MMMM y\",\"y\":\"MMMM y – MMMM y\"}}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-SM/timeZoneNames.json":
/*!**************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-SM/timeZoneNames.json ***!
  \**************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-SM\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"SM\"},\"dates\":{\"timeZoneNames\":{\"hourFormat\":\"+HH:mm;-HH:mm\",\"gmtFormat\":\"GMT{0}\",\"gmtZeroFormat\":\"GMT\",\"regionFormat\":\"Ora {0}\",\"regionFormat-type-daylight\":\"Ora legale: {0}\",\"regionFormat-type-standard\":\"Ora standard: {0}\",\"fallbackFormat\":\"{1} ({0})\",\"zone\":{\"America\":{\"Adak\":{\"exemplarCity\":\"Adak\"},\"Anchorage\":{\"exemplarCity\":\"Anchorage\"},\"Anguilla\":{\"exemplarCity\":\"Anguilla\"},\"Antigua\":{\"exemplarCity\":\"Antigua\"},\"Araguaina\":{\"exemplarCity\":\"Araguaina\"},\"Argentina\":{\"Rio_Gallegos\":{\"exemplarCity\":\"Rio Gallegos\"},\"San_Juan\":{\"exemplarCity\":\"San Juan\"},\"Ushuaia\":{\"exemplarCity\":\"Ushuaia\"},\"La_Rioja\":{\"exemplarCity\":\"La Rioja\"},\"San_Luis\":{\"exemplarCity\":\"San Luis\"},\"Salta\":{\"exemplarCity\":\"Salta\"},\"Tucuman\":{\"exemplarCity\":\"Tucumán\"}},\"Aruba\":{\"exemplarCity\":\"Aruba\"},\"Asuncion\":{\"exemplarCity\":\"Asunción\"},\"Bahia\":{\"exemplarCity\":\"Bahia\"},\"Bahia_Banderas\":{\"exemplarCity\":\"Bahía de Banderas\"},\"Barbados\":{\"exemplarCity\":\"Barbados\"},\"Belem\":{\"exemplarCity\":\"Belem\"},\"Belize\":{\"exemplarCity\":\"Belize\"},\"Blanc-Sablon\":{\"exemplarCity\":\"Blanc-Sablon\"},\"Boa_Vista\":{\"exemplarCity\":\"Boa Vista\"},\"Bogota\":{\"exemplarCity\":\"Bogotá\"},\"Boise\":{\"exemplarCity\":\"Boise\"},\"Buenos_Aires\":{\"exemplarCity\":\"Buenos Aires\"},\"Cambridge_Bay\":{\"exemplarCity\":\"Cambridge Bay\"},\"Campo_Grande\":{\"exemplarCity\":\"Campo Grande\"},\"Cancun\":{\"exemplarCity\":\"Cancún\"},\"Caracas\":{\"exemplarCity\":\"Caracas\"},\"Catamarca\":{\"exemplarCity\":\"Catamarca\"},\"Cayenne\":{\"exemplarCity\":\"Caienna\"},\"Cayman\":{\"exemplarCity\":\"Cayman\"},\"Chicago\":{\"exemplarCity\":\"Chicago\"},\"Chihuahua\":{\"exemplarCity\":\"Chihuahua\"},\"Coral_Harbour\":{\"exemplarCity\":\"Atikokan\"},\"Cordoba\":{\"exemplarCity\":\"Cordoba\"},\"Costa_Rica\":{\"exemplarCity\":\"Costa Rica\"},\"Creston\":{\"exemplarCity\":\"Creston\"},\"Cuiaba\":{\"exemplarCity\":\"Cuiaba\"},\"Curacao\":{\"exemplarCity\":\"Curaçao\"},\"Danmarkshavn\":{\"exemplarCity\":\"Danmarkshavn\"},\"Dawson\":{\"exemplarCity\":\"Dawson\"},\"Dawson_Creek\":{\"exemplarCity\":\"Dawson Creek\"},\"Denver\":{\"exemplarCity\":\"Denver\"},\"Detroit\":{\"exemplarCity\":\"Detroit\"},\"Dominica\":{\"exemplarCity\":\"Dominica\"},\"Edmonton\":{\"exemplarCity\":\"Edmonton\"},\"Eirunepe\":{\"exemplarCity\":\"Eirunepe\"},\"El_Salvador\":{\"exemplarCity\":\"El Salvador\"},\"Fort_Nelson\":{\"exemplarCity\":\"Fort Nelson\"},\"Fortaleza\":{\"exemplarCity\":\"Fortaleza\"},\"Glace_Bay\":{\"exemplarCity\":\"Glace Bay\"},\"Godthab\":{\"exemplarCity\":\"Nuuk\"},\"Goose_Bay\":{\"exemplarCity\":\"Goose Bay\"},\"Grand_Turk\":{\"exemplarCity\":\"Grand Turk\"},\"Grenada\":{\"exemplarCity\":\"Grenada\"},\"Guadeloupe\":{\"exemplarCity\":\"Guadalupa\"},\"Guatemala\":{\"exemplarCity\":\"Guatemala\"},\"Guayaquil\":{\"exemplarCity\":\"Guayaquil\"},\"Guyana\":{\"exemplarCity\":\"Guyana\"},\"Halifax\":{\"exemplarCity\":\"Halifax\"},\"Havana\":{\"exemplarCity\":\"L’Avana\"},\"Hermosillo\":{\"exemplarCity\":\"Hermosillo\"},\"Indiana\":{\"Vincennes\":{\"exemplarCity\":\"Vincennes, Indiana\"},\"Petersburg\":{\"exemplarCity\":\"Petersburg, Indiana\"},\"Tell_City\":{\"exemplarCity\":\"Tell City, Indiana\"},\"Knox\":{\"exemplarCity\":\"Knox, Indiana\"},\"Winamac\":{\"exemplarCity\":\"Winamac, Indiana\"},\"Marengo\":{\"exemplarCity\":\"Marengo, Indiana\"},\"Vevay\":{\"exemplarCity\":\"Vevay, Indiana\"}},\"Indianapolis\":{\"exemplarCity\":\"Indianapolis\"},\"Inuvik\":{\"exemplarCity\":\"Inuvik\"},\"Iqaluit\":{\"exemplarCity\":\"Iqaluit\"},\"Jamaica\":{\"exemplarCity\":\"Giamaica\"},\"Jujuy\":{\"exemplarCity\":\"Jujuy\"},\"Juneau\":{\"exemplarCity\":\"Juneau\"},\"Kentucky\":{\"Monticello\":{\"exemplarCity\":\"Monticello, Kentucky\"}},\"Kralendijk\":{\"exemplarCity\":\"Kralendijk\"},\"La_Paz\":{\"exemplarCity\":\"La Paz\"},\"Lima\":{\"exemplarCity\":\"Lima\"},\"Los_Angeles\":{\"exemplarCity\":\"Los Angeles\"},\"Louisville\":{\"exemplarCity\":\"Louisville\"},\"Lower_Princes\":{\"exemplarCity\":\"Lower Prince’s Quarter\"},\"Maceio\":{\"exemplarCity\":\"Maceio\"},\"Managua\":{\"exemplarCity\":\"Managua\"},\"Manaus\":{\"exemplarCity\":\"Manaus\"},\"Marigot\":{\"exemplarCity\":\"Marigot\"},\"Martinique\":{\"exemplarCity\":\"Martinica\"},\"Matamoros\":{\"exemplarCity\":\"Matamoros\"},\"Mazatlan\":{\"exemplarCity\":\"Mazatlan\"},\"Mendoza\":{\"exemplarCity\":\"Mendoza\"},\"Menominee\":{\"exemplarCity\":\"Menominee\"},\"Merida\":{\"exemplarCity\":\"Mérida\"},\"Metlakatla\":{\"exemplarCity\":\"Metlakatla\"},\"Mexico_City\":{\"exemplarCity\":\"Città del Messico\"},\"Miquelon\":{\"exemplarCity\":\"Miquelon\"},\"Moncton\":{\"exemplarCity\":\"Moncton\"},\"Monterrey\":{\"exemplarCity\":\"Monterrey\"},\"Montevideo\":{\"exemplarCity\":\"Montevideo\"},\"Montserrat\":{\"exemplarCity\":\"Montserrat\"},\"Nassau\":{\"exemplarCity\":\"Nassau\"},\"New_York\":{\"exemplarCity\":\"New York\"},\"Nipigon\":{\"exemplarCity\":\"Nipigon\"},\"Nome\":{\"exemplarCity\":\"Nome\"},\"Noronha\":{\"exemplarCity\":\"Noronha\"},\"North_Dakota\":{\"Beulah\":{\"exemplarCity\":\"Beulah, Dakota del nord\"},\"New_Salem\":{\"exemplarCity\":\"New Salem, Dakota del nord\"},\"Center\":{\"exemplarCity\":\"Center, Dakota del nord\"}},\"Ojinaga\":{\"exemplarCity\":\"Ojinaga\"},\"Panama\":{\"exemplarCity\":\"Panamá\"},\"Pangnirtung\":{\"exemplarCity\":\"Pangnirtung\"},\"Paramaribo\":{\"exemplarCity\":\"Paramaribo\"},\"Phoenix\":{\"exemplarCity\":\"Phoenix\"},\"Port-au-Prince\":{\"exemplarCity\":\"Port-au-Prince\"},\"Port_of_Spain\":{\"exemplarCity\":\"Port of Spain\"},\"Porto_Velho\":{\"exemplarCity\":\"Porto Velho\"},\"Puerto_Rico\":{\"exemplarCity\":\"Portorico\"},\"Punta_Arenas\":{\"exemplarCity\":\"Punta Arenas\"},\"Rainy_River\":{\"exemplarCity\":\"Rainy River\"},\"Rankin_Inlet\":{\"exemplarCity\":\"Rankin Inlet\"},\"Recife\":{\"exemplarCity\":\"Recife\"},\"Regina\":{\"exemplarCity\":\"Regina\"},\"Resolute\":{\"exemplarCity\":\"Resolute\"},\"Rio_Branco\":{\"exemplarCity\":\"Rio Branco\"},\"Santa_Isabel\":{\"exemplarCity\":\"Santa Isabel\"},\"Santarem\":{\"exemplarCity\":\"Santarém\"},\"Santiago\":{\"exemplarCity\":\"Santiago\"},\"Santo_Domingo\":{\"exemplarCity\":\"Santo Domingo\"},\"Sao_Paulo\":{\"exemplarCity\":\"San Paolo\"},\"Scoresbysund\":{\"exemplarCity\":\"Ittoqqortoormiit\"},\"Sitka\":{\"exemplarCity\":\"Sitka\"},\"St_Barthelemy\":{\"exemplarCity\":\"Saint-Barthélemy\"},\"St_Johns\":{\"exemplarCity\":\"St. John’s\"},\"St_Kitts\":{\"exemplarCity\":\"St. Kitts\"},\"St_Lucia\":{\"exemplarCity\":\"Santa Lucia\"},\"St_Thomas\":{\"exemplarCity\":\"Saint Thomas\"},\"St_Vincent\":{\"exemplarCity\":\"Saint Vincent\"},\"Swift_Current\":{\"exemplarCity\":\"Swift Current\"},\"Tegucigalpa\":{\"exemplarCity\":\"Tegucigalpa\"},\"Thule\":{\"exemplarCity\":\"Thule\"},\"Thunder_Bay\":{\"exemplarCity\":\"Thunder Bay\"},\"Tijuana\":{\"exemplarCity\":\"Tijuana\"},\"Toronto\":{\"exemplarCity\":\"Toronto\"},\"Tortola\":{\"exemplarCity\":\"Tortola\"},\"Vancouver\":{\"exemplarCity\":\"Vancouver\"},\"Whitehorse\":{\"exemplarCity\":\"Whitehorse\"},\"Winnipeg\":{\"exemplarCity\":\"Winnipeg\"},\"Yakutat\":{\"exemplarCity\":\"Yakutat\"},\"Yellowknife\":{\"exemplarCity\":\"Yellowknife\"}},\"Atlantic\":{\"Azores\":{\"exemplarCity\":\"Azzorre\"},\"Bermuda\":{\"exemplarCity\":\"Bermuda\"},\"Canary\":{\"exemplarCity\":\"Canarie\"},\"Cape_Verde\":{\"exemplarCity\":\"Capo Verde\"},\"Faeroe\":{\"exemplarCity\":\"Isole Fær Øer\"},\"Madeira\":{\"exemplarCity\":\"Madeira\"},\"Reykjavik\":{\"exemplarCity\":\"Reykjavík\"},\"South_Georgia\":{\"exemplarCity\":\"Georgia del Sud\"},\"St_Helena\":{\"exemplarCity\":\"Sant’Elena\"},\"Stanley\":{\"exemplarCity\":\"Stanley\"}},\"Europe\":{\"Amsterdam\":{\"exemplarCity\":\"Amsterdam\"},\"Andorra\":{\"exemplarCity\":\"Andorra\"},\"Astrakhan\":{\"exemplarCity\":\"Astrakhan\"},\"Athens\":{\"exemplarCity\":\"Atene\"},\"Belgrade\":{\"exemplarCity\":\"Belgrado\"},\"Berlin\":{\"exemplarCity\":\"Berlino\"},\"Bratislava\":{\"exemplarCity\":\"Bratislava\"},\"Brussels\":{\"exemplarCity\":\"Bruxelles\"},\"Bucharest\":{\"exemplarCity\":\"Bucarest\"},\"Budapest\":{\"exemplarCity\":\"Budapest\"},\"Busingen\":{\"exemplarCity\":\"Büsingen\"},\"Chisinau\":{\"exemplarCity\":\"Chisinau\"},\"Copenhagen\":{\"exemplarCity\":\"Copenaghen\"},\"Dublin\":{\"long\":{\"daylight\":\"Ora legale dell’Irlanda\"},\"exemplarCity\":\"Dublino\"},\"Gibraltar\":{\"exemplarCity\":\"Gibilterra\"},\"Guernsey\":{\"exemplarCity\":\"Guernsey\"},\"Helsinki\":{\"exemplarCity\":\"Helsinki\"},\"Isle_of_Man\":{\"exemplarCity\":\"Isola di Man\"},\"Istanbul\":{\"exemplarCity\":\"Istanbul\"},\"Jersey\":{\"exemplarCity\":\"Jersey\"},\"Kaliningrad\":{\"exemplarCity\":\"Kaliningrad\"},\"Kiev\":{\"exemplarCity\":\"Kiev\"},\"Kirov\":{\"exemplarCity\":\"Kirov\"},\"Lisbon\":{\"exemplarCity\":\"Lisbona\"},\"Ljubljana\":{\"exemplarCity\":\"Lubiana\"},\"London\":{\"long\":{\"daylight\":\"Ora legale del Regno Unito\"},\"exemplarCity\":\"Londra\"},\"Luxembourg\":{\"exemplarCity\":\"Lussemburgo\"},\"Madrid\":{\"exemplarCity\":\"Madrid\"},\"Malta\":{\"exemplarCity\":\"Malta\"},\"Mariehamn\":{\"exemplarCity\":\"Mariehamn\"},\"Minsk\":{\"exemplarCity\":\"Minsk\"},\"Monaco\":{\"exemplarCity\":\"Monaco\"},\"Moscow\":{\"exemplarCity\":\"Mosca\"},\"Oslo\":{\"exemplarCity\":\"Oslo\"},\"Paris\":{\"exemplarCity\":\"Parigi\"},\"Podgorica\":{\"exemplarCity\":\"Podgorica\"},\"Prague\":{\"exemplarCity\":\"Praga\"},\"Riga\":{\"exemplarCity\":\"Riga\"},\"Rome\":{\"exemplarCity\":\"Roma\"},\"Samara\":{\"exemplarCity\":\"Samara\"},\"San_Marino\":{\"exemplarCity\":\"San Marino\"},\"Sarajevo\":{\"exemplarCity\":\"Sarajevo\"},\"Saratov\":{\"exemplarCity\":\"Saratov\"},\"Simferopol\":{\"exemplarCity\":\"Sinferopoli\"},\"Skopje\":{\"exemplarCity\":\"Skopje\"},\"Sofia\":{\"exemplarCity\":\"Sofia\"},\"Stockholm\":{\"exemplarCity\":\"Stoccolma\"},\"Tallinn\":{\"exemplarCity\":\"Tallinn\"},\"Tirane\":{\"exemplarCity\":\"Tirana\"},\"Ulyanovsk\":{\"exemplarCity\":\"Ulyanovsk\"},\"Uzhgorod\":{\"exemplarCity\":\"Užhorod\"},\"Vaduz\":{\"exemplarCity\":\"Vaduz\"},\"Vatican\":{\"exemplarCity\":\"Città del Vaticano\"},\"Vienna\":{\"exemplarCity\":\"Vienna\"},\"Vilnius\":{\"exemplarCity\":\"Vilnius\"},\"Volgograd\":{\"exemplarCity\":\"Volgograd\"},\"Warsaw\":{\"exemplarCity\":\"Varsavia\"},\"Zagreb\":{\"exemplarCity\":\"Zagabria\"},\"Zaporozhye\":{\"exemplarCity\":\"Zaporozhye\"},\"Zurich\":{\"exemplarCity\":\"Zurigo\"}},\"Africa\":{\"Abidjan\":{\"exemplarCity\":\"Abidjan\"},\"Accra\":{\"exemplarCity\":\"Accra\"},\"Addis_Ababa\":{\"exemplarCity\":\"Addis Abeba\"},\"Algiers\":{\"exemplarCity\":\"Algeri\"},\"Asmera\":{\"exemplarCity\":\"Asmara\"},\"Bamako\":{\"exemplarCity\":\"Bamako\"},\"Bangui\":{\"exemplarCity\":\"Bangui\"},\"Banjul\":{\"exemplarCity\":\"Banjul\"},\"Bissau\":{\"exemplarCity\":\"Bissau\"},\"Blantyre\":{\"exemplarCity\":\"Blantyre\"},\"Brazzaville\":{\"exemplarCity\":\"Brazzaville\"},\"Bujumbura\":{\"exemplarCity\":\"Bujumbura\"},\"Cairo\":{\"exemplarCity\":\"Il Cairo\"},\"Casablanca\":{\"exemplarCity\":\"Casablanca\"},\"Ceuta\":{\"exemplarCity\":\"Ceuta\"},\"Conakry\":{\"exemplarCity\":\"Conakry\"},\"Dakar\":{\"exemplarCity\":\"Dakar\"},\"Dar_es_Salaam\":{\"exemplarCity\":\"Dar es Salaam\"},\"Djibouti\":{\"exemplarCity\":\"Gibuti\"},\"Douala\":{\"exemplarCity\":\"Douala\"},\"El_Aaiun\":{\"exemplarCity\":\"El Ayun\"},\"Freetown\":{\"exemplarCity\":\"Freetown\"},\"Gaborone\":{\"exemplarCity\":\"Gaborone\"},\"Harare\":{\"exemplarCity\":\"Harare\"},\"Johannesburg\":{\"exemplarCity\":\"Johannesburg\"},\"Juba\":{\"exemplarCity\":\"Giuba\"},\"Kampala\":{\"exemplarCity\":\"Kampala\"},\"Khartoum\":{\"exemplarCity\":\"Khartum\"},\"Kigali\":{\"exemplarCity\":\"Kigali\"},\"Kinshasa\":{\"exemplarCity\":\"Kinshasa\"},\"Lagos\":{\"exemplarCity\":\"Lagos\"},\"Libreville\":{\"exemplarCity\":\"Libreville\"},\"Lome\":{\"exemplarCity\":\"Lomé\"},\"Luanda\":{\"exemplarCity\":\"Luanda\"},\"Lubumbashi\":{\"exemplarCity\":\"Lubumbashi\"},\"Lusaka\":{\"exemplarCity\":\"Lusaka\"},\"Malabo\":{\"exemplarCity\":\"Malabo\"},\"Maputo\":{\"exemplarCity\":\"Maputo\"},\"Maseru\":{\"exemplarCity\":\"Maseru\"},\"Mbabane\":{\"exemplarCity\":\"Mbabane\"},\"Mogadishu\":{\"exemplarCity\":\"Mogadiscio\"},\"Monrovia\":{\"exemplarCity\":\"Monrovia\"},\"Nairobi\":{\"exemplarCity\":\"Nairobi\"},\"Ndjamena\":{\"exemplarCity\":\"N’Djamena\"},\"Niamey\":{\"exemplarCity\":\"Niamey\"},\"Nouakchott\":{\"exemplarCity\":\"Nouakchott\"},\"Ouagadougou\":{\"exemplarCity\":\"Ouagadougou\"},\"Porto-Novo\":{\"exemplarCity\":\"Porto-Novo\"},\"Sao_Tome\":{\"exemplarCity\":\"São Tomé\"},\"Tripoli\":{\"exemplarCity\":\"Tripoli\"},\"Tunis\":{\"exemplarCity\":\"Tunisi\"},\"Windhoek\":{\"exemplarCity\":\"Windhoek\"}},\"Asia\":{\"Aden\":{\"exemplarCity\":\"Aden\"},\"Almaty\":{\"exemplarCity\":\"Almaty\"},\"Amman\":{\"exemplarCity\":\"Amman\"},\"Anadyr\":{\"exemplarCity\":\"Anadyr’\"},\"Aqtau\":{\"exemplarCity\":\"Aqtau\"},\"Aqtobe\":{\"exemplarCity\":\"Aqtöbe\"},\"Ashgabat\":{\"exemplarCity\":\"Ashgabat\"},\"Atyrau\":{\"exemplarCity\":\"Atyrau\"},\"Baghdad\":{\"exemplarCity\":\"Baghdad\"},\"Bahrain\":{\"exemplarCity\":\"Bahrein\"},\"Baku\":{\"exemplarCity\":\"Baku\"},\"Bangkok\":{\"exemplarCity\":\"Bangkok\"},\"Barnaul\":{\"exemplarCity\":\"Barnaul\"},\"Beirut\":{\"exemplarCity\":\"Beirut\"},\"Bishkek\":{\"exemplarCity\":\"Bishkek\"},\"Brunei\":{\"exemplarCity\":\"Brunei\"},\"Calcutta\":{\"exemplarCity\":\"Calcutta\"},\"Chita\":{\"exemplarCity\":\"Čita\"},\"Choibalsan\":{\"exemplarCity\":\"Choibalsan\"},\"Colombo\":{\"exemplarCity\":\"Colombo\"},\"Damascus\":{\"exemplarCity\":\"Damasco\"},\"Dhaka\":{\"exemplarCity\":\"Dacca\"},\"Dili\":{\"exemplarCity\":\"Dili\"},\"Dubai\":{\"exemplarCity\":\"Dubai\"},\"Dushanbe\":{\"exemplarCity\":\"Dushanbe\"},\"Famagusta\":{\"exemplarCity\":\"Famagosta\"},\"Gaza\":{\"exemplarCity\":\"Gaza\"},\"Hebron\":{\"exemplarCity\":\"Hebron\"},\"Hong_Kong\":{\"exemplarCity\":\"Hong Kong\"},\"Hovd\":{\"exemplarCity\":\"Hovd\"},\"Irkutsk\":{\"exemplarCity\":\"Irkutsk\"},\"Jakarta\":{\"exemplarCity\":\"Giacarta\"},\"Jayapura\":{\"exemplarCity\":\"Jayapura\"},\"Jerusalem\":{\"exemplarCity\":\"Gerusalemme\"},\"Kabul\":{\"exemplarCity\":\"Kabul\"},\"Kamchatka\":{\"exemplarCity\":\"Kamchatka\"},\"Karachi\":{\"exemplarCity\":\"Karachi\"},\"Katmandu\":{\"exemplarCity\":\"Kathmandu\"},\"Khandyga\":{\"exemplarCity\":\"Chandyga\"},\"Krasnoyarsk\":{\"exemplarCity\":\"Krasnojarsk\"},\"Kuala_Lumpur\":{\"exemplarCity\":\"Kuala Lumpur\"},\"Kuching\":{\"exemplarCity\":\"Kuching\"},\"Kuwait\":{\"exemplarCity\":\"Kuwait\"},\"Macau\":{\"exemplarCity\":\"Macao\"},\"Magadan\":{\"exemplarCity\":\"Magadan\"},\"Makassar\":{\"exemplarCity\":\"Makassar\"},\"Manila\":{\"exemplarCity\":\"Manila\"},\"Muscat\":{\"exemplarCity\":\"Mascate\"},\"Nicosia\":{\"exemplarCity\":\"Nicosia\"},\"Novokuznetsk\":{\"exemplarCity\":\"Novokuzneck\"},\"Novosibirsk\":{\"exemplarCity\":\"Novosibirsk\"},\"Omsk\":{\"exemplarCity\":\"Omsk\"},\"Oral\":{\"exemplarCity\":\"Oral\"},\"Phnom_Penh\":{\"exemplarCity\":\"Phnom Penh\"},\"Pontianak\":{\"exemplarCity\":\"Pontianak\"},\"Pyongyang\":{\"exemplarCity\":\"Pyongyang\"},\"Qatar\":{\"exemplarCity\":\"Qatar\"},\"Qostanay\":{\"exemplarCity\":\"Qostanay\"},\"Qyzylorda\":{\"exemplarCity\":\"Qyzylorda\"},\"Rangoon\":{\"exemplarCity\":\"Rangoon\"},\"Riyadh\":{\"exemplarCity\":\"Riyad\"},\"Saigon\":{\"exemplarCity\":\"Ho Chi Minh\"},\"Sakhalin\":{\"exemplarCity\":\"Sachalin\"},\"Samarkand\":{\"exemplarCity\":\"Samarcanda\"},\"Seoul\":{\"exemplarCity\":\"Seul\"},\"Shanghai\":{\"exemplarCity\":\"Shanghai\"},\"Singapore\":{\"exemplarCity\":\"Singapore\"},\"Srednekolymsk\":{\"exemplarCity\":\"Srednekolymsk\"},\"Taipei\":{\"exemplarCity\":\"Taipei\"},\"Tashkent\":{\"exemplarCity\":\"Tashkent\"},\"Tbilisi\":{\"exemplarCity\":\"Tbilisi\"},\"Tehran\":{\"exemplarCity\":\"Teheran\"},\"Thimphu\":{\"exemplarCity\":\"Thimphu\"},\"Tokyo\":{\"exemplarCity\":\"Tokyo\"},\"Tomsk\":{\"exemplarCity\":\"Tomsk\"},\"Ulaanbaatar\":{\"exemplarCity\":\"Ulaanbaatar\"},\"Urumqi\":{\"exemplarCity\":\"Urumqi\"},\"Ust-Nera\":{\"exemplarCity\":\"Ust’-Nera\"},\"Vientiane\":{\"exemplarCity\":\"Vientiane\"},\"Vladivostok\":{\"exemplarCity\":\"Vladivostok\"},\"Yakutsk\":{\"exemplarCity\":\"Jakutsk\"},\"Yekaterinburg\":{\"exemplarCity\":\"Ekaterinburg\"},\"Yerevan\":{\"exemplarCity\":\"Yerevan\"}},\"Indian\":{\"Antananarivo\":{\"exemplarCity\":\"Antananarivo\"},\"Chagos\":{\"exemplarCity\":\"Chagos\"},\"Christmas\":{\"exemplarCity\":\"Natale\"},\"Cocos\":{\"exemplarCity\":\"Cocos\"},\"Comoro\":{\"exemplarCity\":\"Comore\"},\"Kerguelen\":{\"exemplarCity\":\"Kerguelen\"},\"Mahe\":{\"exemplarCity\":\"Mahe\"},\"Maldives\":{\"exemplarCity\":\"Maldive\"},\"Mauritius\":{\"exemplarCity\":\"Mauritius\"},\"Mayotte\":{\"exemplarCity\":\"Mayotte\"},\"Reunion\":{\"exemplarCity\":\"La Riunione\"}},\"Australia\":{\"Adelaide\":{\"exemplarCity\":\"Adelaide\"},\"Brisbane\":{\"exemplarCity\":\"Brisbane\"},\"Broken_Hill\":{\"exemplarCity\":\"Broken Hill\"},\"Currie\":{\"exemplarCity\":\"Currie\"},\"Darwin\":{\"exemplarCity\":\"Darwin\"},\"Eucla\":{\"exemplarCity\":\"Eucla\"},\"Hobart\":{\"exemplarCity\":\"Hobart\"},\"Lindeman\":{\"exemplarCity\":\"Lindeman\"},\"Lord_Howe\":{\"exemplarCity\":\"Lord Howe\"},\"Melbourne\":{\"exemplarCity\":\"Melbourne\"},\"Perth\":{\"exemplarCity\":\"Perth\"},\"Sydney\":{\"exemplarCity\":\"Sydney\"}},\"Pacific\":{\"Apia\":{\"exemplarCity\":\"Apia\"},\"Auckland\":{\"exemplarCity\":\"Auckland\"},\"Bougainville\":{\"exemplarCity\":\"Bougainville\"},\"Chatham\":{\"exemplarCity\":\"Chatham\"},\"Easter\":{\"exemplarCity\":\"Pasqua\"},\"Efate\":{\"exemplarCity\":\"Efate\"},\"Enderbury\":{\"exemplarCity\":\"Enderbury\"},\"Fakaofo\":{\"exemplarCity\":\"Fakaofo\"},\"Fiji\":{\"exemplarCity\":\"Figi\"},\"Funafuti\":{\"exemplarCity\":\"Funafuti\"},\"Galapagos\":{\"exemplarCity\":\"Galapagos\"},\"Gambier\":{\"exemplarCity\":\"Gambier\"},\"Guadalcanal\":{\"exemplarCity\":\"Guadalcanal\"},\"Guam\":{\"exemplarCity\":\"Guam\"},\"Honolulu\":{\"exemplarCity\":\"Honolulu\"},\"Johnston\":{\"exemplarCity\":\"Johnston\"},\"Kiritimati\":{\"exemplarCity\":\"Kiritimati\"},\"Kosrae\":{\"exemplarCity\":\"Kosrae\"},\"Kwajalein\":{\"exemplarCity\":\"Kwajalein\"},\"Majuro\":{\"exemplarCity\":\"Majuro\"},\"Marquesas\":{\"exemplarCity\":\"Marchesi\"},\"Midway\":{\"exemplarCity\":\"Midway\"},\"Nauru\":{\"exemplarCity\":\"Nauru\"},\"Niue\":{\"exemplarCity\":\"Niue\"},\"Norfolk\":{\"exemplarCity\":\"Norfolk\"},\"Noumea\":{\"exemplarCity\":\"Noumea\"},\"Pago_Pago\":{\"exemplarCity\":\"Pago Pago\"},\"Palau\":{\"exemplarCity\":\"Palau\"},\"Pitcairn\":{\"exemplarCity\":\"Pitcairn\"},\"Ponape\":{\"exemplarCity\":\"Pohnpei\"},\"Port_Moresby\":{\"exemplarCity\":\"Port Moresby\"},\"Rarotonga\":{\"exemplarCity\":\"Rarotonga\"},\"Saipan\":{\"exemplarCity\":\"Saipan\"},\"Tahiti\":{\"exemplarCity\":\"Tahiti\"},\"Tarawa\":{\"exemplarCity\":\"Tarawa\"},\"Tongatapu\":{\"exemplarCity\":\"Tongatapu\"},\"Truk\":{\"exemplarCity\":\"Chuuk\"},\"Wake\":{\"exemplarCity\":\"Wake\"},\"Wallis\":{\"exemplarCity\":\"Wallis\"}},\"Arctic\":{\"Longyearbyen\":{\"exemplarCity\":\"Longyearbyen\"}},\"Antarctica\":{\"Casey\":{\"exemplarCity\":\"Casey\"},\"Davis\":{\"exemplarCity\":\"Davis\"},\"DumontDUrville\":{\"exemplarCity\":\"Dumont d’Urville\"},\"Macquarie\":{\"exemplarCity\":\"Macquarie\"},\"Mawson\":{\"exemplarCity\":\"Mawson\"},\"McMurdo\":{\"exemplarCity\":\"McMurdo\"},\"Palmer\":{\"exemplarCity\":\"Palmer\"},\"Rothera\":{\"exemplarCity\":\"Rothera\"},\"Syowa\":{\"exemplarCity\":\"Syowa\"},\"Troll\":{\"exemplarCity\":\"Troll\"},\"Vostok\":{\"exemplarCity\":\"Vostok\"}},\"Etc\":{\"UTC\":{\"long\":{\"standard\":\"Tempo coordinato universale\"},\"short\":{\"standard\":\"UTC\"}},\"Unknown\":{\"exemplarCity\":\"Città sconosciuta\"}}},\"metazone\":{\"Afghanistan\":{\"long\":{\"standard\":\"Ora dell’Afghanistan\"}},\"Africa_Central\":{\"long\":{\"standard\":\"Ora dell’Africa centrale\"}},\"Africa_Eastern\":{\"long\":{\"standard\":\"Ora dell’Africa orientale\"}},\"Africa_Southern\":{\"long\":{\"standard\":\"Ora dell’Africa meridionale\"}},\"Africa_Western\":{\"long\":{\"generic\":\"Ora dell’Africa occidentale\",\"standard\":\"Ora standard dell’Africa occidentale\",\"daylight\":\"Ora legale dell’Africa occidentale\"}},\"Alaska\":{\"long\":{\"generic\":\"Ora dell’Alaska\",\"standard\":\"Ora standard dell’Alaska\",\"daylight\":\"Ora legale dell’Alaska\"}},\"Amazon\":{\"long\":{\"generic\":\"Ora dell’Amazzonia\",\"standard\":\"Ora standard dell’Amazzonia\",\"daylight\":\"Ora legale dell’Amazzonia\"}},\"America_Central\":{\"long\":{\"generic\":\"Ora centrale USA\",\"standard\":\"Ora standard centrale USA\",\"daylight\":\"Ora legale centrale USA\"}},\"America_Eastern\":{\"long\":{\"generic\":\"Ora orientale USA\",\"standard\":\"Ora standard orientale USA\",\"daylight\":\"Ora legale orientale USA\"}},\"America_Mountain\":{\"long\":{\"generic\":\"Ora Montagne Rocciose USA\",\"standard\":\"Ora standard Montagne Rocciose USA\",\"daylight\":\"Ora legale Montagne Rocciose USA\"}},\"America_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico USA\",\"standard\":\"Ora standard del Pacifico USA\",\"daylight\":\"Ora legale del Pacifico USA\"}},\"Anadyr\":{\"long\":{\"generic\":\"Ora di Anadyr\",\"standard\":\"Ora standard di Anadyr\",\"daylight\":\"Ora legale di Anadyr\"}},\"Apia\":{\"long\":{\"generic\":\"Ora di Apia\",\"standard\":\"Ora standard di Apia\",\"daylight\":\"Ora legale di Apia\"}},\"Arabian\":{\"long\":{\"generic\":\"Ora araba\",\"standard\":\"Ora standard araba\",\"daylight\":\"Ora legale araba\"}},\"Argentina\":{\"long\":{\"generic\":\"Ora dell’Argentina\",\"standard\":\"Ora standard dell’Argentina\",\"daylight\":\"Ora legale dell’Argentina\"}},\"Argentina_Western\":{\"long\":{\"generic\":\"Ora dell’Argentina occidentale\",\"standard\":\"Ora standard dell’Argentina occidentale\",\"daylight\":\"Ora legale dell’Argentina occidentale\"}},\"Armenia\":{\"long\":{\"generic\":\"Ora dell’Armenia\",\"standard\":\"Ora standard dell’Armenia\",\"daylight\":\"Ora legale dell’Armenia\"}},\"Atlantic\":{\"long\":{\"generic\":\"Ora dell’Atlantico\",\"standard\":\"Ora standard dell’Atlantico\",\"daylight\":\"Ora legale dell’Atlantico\"}},\"Australia_Central\":{\"long\":{\"generic\":\"Ora dell’Australia centrale\",\"standard\":\"Ora standard dell’Australia centrale\",\"daylight\":\"Ora legale dell’Australia centrale\"}},\"Australia_CentralWestern\":{\"long\":{\"generic\":\"Ora dell’Australia centroccidentale\",\"standard\":\"Ora standard dell’Australia centroccidentale\",\"daylight\":\"Ora legale dell’Australia centroccidentale\"}},\"Australia_Eastern\":{\"long\":{\"generic\":\"Ora dell’Australia orientale\",\"standard\":\"Ora standard dell’Australia orientale\",\"daylight\":\"Ora legale dell’Australia orientale\"}},\"Australia_Western\":{\"long\":{\"generic\":\"Ora dell’Australia occidentale\",\"standard\":\"Ora standard dell’Australia occidentale\",\"daylight\":\"Ora legale dell’Australia occidentale\"}},\"Azerbaijan\":{\"long\":{\"generic\":\"Ora dell’Azerbaigian\",\"standard\":\"Ora standard dell’Azerbaigian\",\"daylight\":\"Ora legale dell’Azerbaigian\"}},\"Azores\":{\"long\":{\"generic\":\"Ora delle Azzorre\",\"standard\":\"Ora standard delle Azzorre\",\"daylight\":\"Ora legale delle Azzorre\"}},\"Bangladesh\":{\"long\":{\"generic\":\"Ora del Bangladesh\",\"standard\":\"Ora standard del Bangladesh\",\"daylight\":\"Ora legale del Bangladesh\"}},\"Bhutan\":{\"long\":{\"standard\":\"Ora del Bhutan\"}},\"Bolivia\":{\"long\":{\"standard\":\"Ora della Bolivia\"}},\"Brasilia\":{\"long\":{\"generic\":\"Ora di Brasilia\",\"standard\":\"Ora standard di Brasilia\",\"daylight\":\"Ora legale di Brasilia\"}},\"Brunei\":{\"long\":{\"standard\":\"Ora del Brunei Darussalam\"}},\"Cape_Verde\":{\"long\":{\"generic\":\"Ora di Capo Verde\",\"standard\":\"Ora standard di Capo Verde\",\"daylight\":\"Ora legale di Capo Verde\"}},\"Chamorro\":{\"long\":{\"standard\":\"Ora di Chamorro\"}},\"Chatham\":{\"long\":{\"generic\":\"Ora delle Chatham\",\"standard\":\"Ora standard delle Chatham\",\"daylight\":\"Ora legale delle Chatham\"}},\"Chile\":{\"long\":{\"generic\":\"Ora del Cile\",\"standard\":\"Ora standard del Cile\",\"daylight\":\"Ora legale del Cile\"}},\"China\":{\"long\":{\"generic\":\"Ora della Cina\",\"standard\":\"Ora standard della Cina\",\"daylight\":\"Ora legale della Cina\"}},\"Choibalsan\":{\"long\":{\"generic\":\"Ora di Choibalsan\",\"standard\":\"Ora standard di Choibalsan\",\"daylight\":\"Ora legale di Choibalsan\"}},\"Christmas\":{\"long\":{\"standard\":\"Ora dell’Isola Christmas\"}},\"Cocos\":{\"long\":{\"standard\":\"Ora delle Isole Cocos\"}},\"Colombia\":{\"long\":{\"generic\":\"Ora della Colombia\",\"standard\":\"Ora standard della Colombia\",\"daylight\":\"Ora legale della Colombia\"}},\"Cook\":{\"long\":{\"generic\":\"Ora delle isole Cook\",\"standard\":\"Ora standard delle isole Cook\",\"daylight\":\"Ora legale media delle isole Cook\"}},\"Cuba\":{\"long\":{\"generic\":\"Ora di Cuba\",\"standard\":\"Ora standard di Cuba\",\"daylight\":\"Ora legale di Cuba\"}},\"Davis\":{\"long\":{\"standard\":\"Ora di Davis\"}},\"DumontDUrville\":{\"long\":{\"standard\":\"Ora di Dumont-d’Urville\"}},\"East_Timor\":{\"long\":{\"standard\":\"Ora di Timor Est\"}},\"Easter\":{\"long\":{\"generic\":\"Ora dell’Isola di Pasqua\",\"standard\":\"Ora standard dell’Isola di Pasqua\",\"daylight\":\"Ora legale dell’Isola di Pasqua\"}},\"Ecuador\":{\"long\":{\"standard\":\"Ora dell’Ecuador\"}},\"Europe_Central\":{\"long\":{\"generic\":\"Ora dell’Europa centrale\",\"standard\":\"Ora standard dell’Europa centrale\",\"daylight\":\"Ora legale dell’Europa centrale\"},\"short\":{\"generic\":\"CET\",\"standard\":\"CET\",\"daylight\":\"CEST\"}},\"Europe_Eastern\":{\"long\":{\"generic\":\"Ora dell’Europa orientale\",\"standard\":\"Ora standard dell’Europa orientale\",\"daylight\":\"Ora legale dell’Europa orientale\"},\"short\":{\"generic\":\"EET\",\"standard\":\"EET\",\"daylight\":\"EEST\"}},\"Europe_Further_Eastern\":{\"long\":{\"standard\":\"Ora dell’Europa orientale (Kaliningrad)\"}},\"Europe_Western\":{\"long\":{\"generic\":\"Ora dell’Europa occidentale\",\"standard\":\"Ora standard dell’Europa occidentale\",\"daylight\":\"Ora legale dell’Europa occidentale\"},\"short\":{\"generic\":\"WET\",\"standard\":\"WET\",\"daylight\":\"WEST\"}},\"Falkland\":{\"long\":{\"generic\":\"Ora delle Isole Falkland\",\"standard\":\"Ora standard delle Isole Falkland\",\"daylight\":\"Ora legale delle Isole Falkland\"}},\"Fiji\":{\"long\":{\"generic\":\"Ora delle Figi\",\"standard\":\"Ora standard delle Figi\",\"daylight\":\"Ora legale delle Figi\"}},\"French_Guiana\":{\"long\":{\"standard\":\"Ora della Guiana francese\"}},\"French_Southern\":{\"long\":{\"standard\":\"Ora delle Terre australi e antartiche francesi\"}},\"Galapagos\":{\"long\":{\"standard\":\"Ora delle Galapagos\"}},\"Gambier\":{\"long\":{\"standard\":\"Ora di Gambier\"}},\"Georgia\":{\"long\":{\"generic\":\"Ora della Georgia\",\"standard\":\"Ora standard della Georgia\",\"daylight\":\"Ora legale della Georgia\"}},\"Gilbert_Islands\":{\"long\":{\"standard\":\"Ora delle isole Gilbert\"}},\"GMT\":{\"long\":{\"standard\":\"Ora del meridiano di Greenwich\"}},\"Greenland_Eastern\":{\"long\":{\"generic\":\"Ora della Groenlandia orientale\",\"standard\":\"Ora standard della Groenlandia orientale\",\"daylight\":\"Ora legale della Groenlandia orientale\"}},\"Greenland_Western\":{\"long\":{\"generic\":\"Ora della Groenlandia occidentale\",\"standard\":\"Ora standard della Groenlandia occidentale\",\"daylight\":\"Ora legale della Groenlandia occidentale\"}},\"Gulf\":{\"long\":{\"standard\":\"Ora del Golfo\"}},\"Guyana\":{\"long\":{\"standard\":\"Ora della Guyana\"}},\"Hawaii_Aleutian\":{\"long\":{\"generic\":\"Ora delle isole Hawaii-Aleutine\",\"standard\":\"Ora standard delle Isole Hawaii-Aleutine\",\"daylight\":\"Ora legale delle Isole Hawaii-Aleutine\"}},\"Hong_Kong\":{\"long\":{\"generic\":\"Ora di Hong Kong\",\"standard\":\"Ora standard di Hong Kong\",\"daylight\":\"Ora legale di Hong Kong\"}},\"Hovd\":{\"long\":{\"generic\":\"Ora di Hovd\",\"standard\":\"Ora standard di Hovd\",\"daylight\":\"Ora legale di Hovd\"}},\"India\":{\"long\":{\"standard\":\"Ora standard dell’India\"}},\"Indian_Ocean\":{\"long\":{\"standard\":\"Ora dell’Oceano Indiano\"}},\"Indochina\":{\"long\":{\"standard\":\"Ora dell’Indocina\"}},\"Indonesia_Central\":{\"long\":{\"standard\":\"Ora dell’Indonesia centrale\"}},\"Indonesia_Eastern\":{\"long\":{\"standard\":\"Ora dell’Indonesia orientale\"}},\"Indonesia_Western\":{\"long\":{\"standard\":\"Ora dell’Indonesia occidentale\"}},\"Iran\":{\"long\":{\"generic\":\"Ora dell’Iran\",\"standard\":\"Ora standard dell’Iran\",\"daylight\":\"Ora legale dell’Iran\"}},\"Irkutsk\":{\"long\":{\"generic\":\"Ora di Irkutsk\",\"standard\":\"Ora standard di Irkutsk\",\"daylight\":\"Ora legale di Irkutsk\"}},\"Israel\":{\"long\":{\"generic\":\"Ora di Israele\",\"standard\":\"Ora standard di Israele\",\"daylight\":\"Ora legale di Israele\"}},\"Japan\":{\"long\":{\"generic\":\"Ora del Giappone\",\"standard\":\"Ora standard del Giappone\",\"daylight\":\"Ora legale del Giappone\"}},\"Kamchatka\":{\"long\":{\"generic\":\"Ora di Petropavlovsk-Kamchatski\",\"standard\":\"Ora standard di Petropavlovsk-Kamchatski\",\"daylight\":\"Ora legale di Petropavlovsk-Kamchatski\"}},\"Kazakhstan_Eastern\":{\"long\":{\"standard\":\"Ora del Kazakistan orientale\"}},\"Kazakhstan_Western\":{\"long\":{\"standard\":\"Ora del Kazakistan occidentale\"}},\"Korea\":{\"long\":{\"generic\":\"Ora coreana\",\"standard\":\"Ora standard coreana\",\"daylight\":\"Ora legale coreana\"}},\"Kosrae\":{\"long\":{\"standard\":\"Ora del Kosrae\"}},\"Krasnoyarsk\":{\"long\":{\"generic\":\"Ora di Krasnoyarsk\",\"standard\":\"Ora standard di Krasnoyarsk\",\"daylight\":\"Ora legale di Krasnoyarsk\"}},\"Kyrgystan\":{\"long\":{\"standard\":\"Ora del Kirghizistan\"}},\"Line_Islands\":{\"long\":{\"standard\":\"Ora delle Sporadi equatoriali\"}},\"Lord_Howe\":{\"long\":{\"generic\":\"Ora di Lord Howe\",\"standard\":\"Ora standard di Lord Howe\",\"daylight\":\"Ora legale di Lord Howe\"}},\"Macquarie\":{\"long\":{\"standard\":\"Ora dell’Isola Macquarie\"}},\"Magadan\":{\"long\":{\"generic\":\"Ora di Magadan\",\"standard\":\"Ora standard di Magadan\",\"daylight\":\"Ora legale di Magadan\"}},\"Malaysia\":{\"long\":{\"standard\":\"Ora della Malesia\"}},\"Maldives\":{\"long\":{\"standard\":\"Ora delle Maldive\"}},\"Marquesas\":{\"long\":{\"standard\":\"Ora delle Marchesi\"}},\"Marshall_Islands\":{\"long\":{\"standard\":\"Ora delle Isole Marshall\"}},\"Mauritius\":{\"long\":{\"generic\":\"Ora delle Mauritius\",\"standard\":\"Ora standard delle Mauritius\",\"daylight\":\"Ora legale delle Mauritius\"}},\"Mawson\":{\"long\":{\"standard\":\"Ora di Mawson\"}},\"Mexico_Northwest\":{\"long\":{\"generic\":\"Ora del Messico nord-occidentale\",\"standard\":\"Ora standard del Messico nord-occidentale\",\"daylight\":\"Ora legale del Messico nord-occidentale\"}},\"Mexico_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico (Messico)\",\"standard\":\"Ora standard del Pacifico (Messico)\",\"daylight\":\"Ora legale del Pacifico (Messico)\"}},\"Mongolia\":{\"long\":{\"generic\":\"Ora di Ulan Bator\",\"standard\":\"Ora standard di Ulan Bator\",\"daylight\":\"Ora legale di Ulan Bator\"}},\"Moscow\":{\"long\":{\"generic\":\"Ora di Mosca\",\"standard\":\"Ora standard di Mosca\",\"daylight\":\"Ora legale di Mosca\"}},\"Myanmar\":{\"long\":{\"standard\":\"Ora della Birmania\"}},\"Nauru\":{\"long\":{\"standard\":\"Ora di Nauru\"}},\"Nepal\":{\"long\":{\"standard\":\"Ora del Nepal\"}},\"New_Caledonia\":{\"long\":{\"generic\":\"Ora della Nuova Caledonia\",\"standard\":\"Ora standard della Nuova Caledonia\",\"daylight\":\"Ora legale della Nuova Caledonia\"}},\"New_Zealand\":{\"long\":{\"generic\":\"Ora della Nuova Zelanda\",\"standard\":\"Ora standard della Nuova Zelanda\",\"daylight\":\"Ora legale della Nuova Zelanda\"}},\"Newfoundland\":{\"long\":{\"generic\":\"Ora di Terranova\",\"standard\":\"Ora standard di Terranova\",\"daylight\":\"Ora legale di Terranova\"}},\"Niue\":{\"long\":{\"standard\":\"Ora di Niue\"}},\"Norfolk\":{\"long\":{\"standard\":\"Ora delle Isole Norfolk\"}},\"Noronha\":{\"long\":{\"generic\":\"Ora di Fernando de Noronha\",\"standard\":\"Ora standard di Fernando de Noronha\",\"daylight\":\"Ora legale di Fernando de Noronha\"}},\"Novosibirsk\":{\"long\":{\"generic\":\"Ora di Novosibirsk\",\"standard\":\"Ora standard di Novosibirsk\",\"daylight\":\"Ora legale di Novosibirsk\"}},\"Omsk\":{\"long\":{\"generic\":\"Ora di Omsk\",\"standard\":\"Ora standard di Omsk\",\"daylight\":\"Ora legale di Omsk\"}},\"Pakistan\":{\"long\":{\"generic\":\"Ora del Pakistan\",\"standard\":\"Ora standard del Pakistan\",\"daylight\":\"Ora legale del Pakistan\"}},\"Palau\":{\"long\":{\"standard\":\"Ora di Palau\"}},\"Papua_New_Guinea\":{\"long\":{\"standard\":\"Ora della Papua Nuova Guinea\"}},\"Paraguay\":{\"long\":{\"generic\":\"Ora del Paraguay\",\"standard\":\"Ora standard del Paraguay\",\"daylight\":\"Ora legale del Paraguay\"}},\"Peru\":{\"long\":{\"generic\":\"Ora del Perù\",\"standard\":\"Ora standard del Perù\",\"daylight\":\"Ora legale del Perù\"}},\"Philippines\":{\"long\":{\"generic\":\"Ora delle Filippine\",\"standard\":\"Ora standard delle Filippine\",\"daylight\":\"Ora legale delle Filippine\"}},\"Phoenix_Islands\":{\"long\":{\"standard\":\"Ora delle Isole della Fenice\"}},\"Pierre_Miquelon\":{\"long\":{\"generic\":\"Ora di Saint-Pierre e Miquelon\",\"standard\":\"Ora standard di Saint-Pierre e Miquelon\",\"daylight\":\"Ora legale di Saint-Pierre e Miquelon\"}},\"Pitcairn\":{\"long\":{\"standard\":\"Ora delle Pitcairn\"}},\"Ponape\":{\"long\":{\"standard\":\"Ora di Pohnpei\"}},\"Pyongyang\":{\"long\":{\"standard\":\"Ora di Pyongyang\"}},\"Reunion\":{\"long\":{\"standard\":\"Ora di Riunione\"}},\"Rothera\":{\"long\":{\"standard\":\"Ora di Rothera\"}},\"Sakhalin\":{\"long\":{\"generic\":\"Ora di Sakhalin\",\"standard\":\"Ora standard di Sakhalin\",\"daylight\":\"Ora legale di Sakhalin\"}},\"Samara\":{\"long\":{\"generic\":\"Ora di Samara\",\"standard\":\"Ora standard di Samara\",\"daylight\":\"Ora legale di Samara\"}},\"Samoa\":{\"long\":{\"generic\":\"Ora di Samoa\",\"standard\":\"Ora standard di Samoa\",\"daylight\":\"Ora legale di Samoa\"}},\"Seychelles\":{\"long\":{\"standard\":\"Ora delle Seychelles\"}},\"Singapore\":{\"long\":{\"standard\":\"Ora di Singapore\"}},\"Solomon\":{\"long\":{\"standard\":\"Ora delle Isole Salomone\"}},\"South_Georgia\":{\"long\":{\"standard\":\"Ora della Georgia del Sud\"}},\"Suriname\":{\"long\":{\"standard\":\"Ora del Suriname\"}},\"Syowa\":{\"long\":{\"standard\":\"Ora di Syowa\"}},\"Tahiti\":{\"long\":{\"standard\":\"Ora di Tahiti\"}},\"Taipei\":{\"long\":{\"generic\":\"Ora di Taipei\",\"standard\":\"Ora standard di Taipei\",\"daylight\":\"Ora legale di Taipei\"}},\"Tajikistan\":{\"long\":{\"standard\":\"Ora del Tagikistan\"}},\"Tokelau\":{\"long\":{\"standard\":\"Ora di Tokelau\"}},\"Tonga\":{\"long\":{\"generic\":\"Ora di Tonga\",\"standard\":\"Ora standard di Tonga\",\"daylight\":\"Ora legale di Tonga\"}},\"Truk\":{\"long\":{\"standard\":\"Ora del Chuuk\"}},\"Turkmenistan\":{\"long\":{\"generic\":\"Ora del Turkmenistan\",\"standard\":\"Ora standard del Turkmenistan\",\"daylight\":\"Ora legale del Turkmenistan\"}},\"Tuvalu\":{\"long\":{\"standard\":\"Ora di Tuvalu\"}},\"Uruguay\":{\"long\":{\"generic\":\"Ora dell’Uruguay\",\"standard\":\"Ora standard dell’Uruguay\",\"daylight\":\"Ora legale dell’Uruguay\"}},\"Uzbekistan\":{\"long\":{\"generic\":\"Ora dell’Uzbekistan\",\"standard\":\"Ora standard dell’Uzbekistan\",\"daylight\":\"Ora legale dell’Uzbekistan\"}},\"Vanuatu\":{\"long\":{\"generic\":\"Ora del Vanuatu\",\"standard\":\"Ora standard del Vanuatu\",\"daylight\":\"Ora legale del Vanuatu\"}},\"Venezuela\":{\"long\":{\"standard\":\"Ora del Venezuela\"}},\"Vladivostok\":{\"long\":{\"generic\":\"Ora di Vladivostok\",\"standard\":\"Ora standard di Vladivostok\",\"daylight\":\"Ora legale di Vladivostok\"}},\"Volgograd\":{\"long\":{\"generic\":\"Ora di Volgograd\",\"standard\":\"Ora standard di Volgograd\",\"daylight\":\"Ora legale di Volgograd\"}},\"Vostok\":{\"long\":{\"standard\":\"Ora di Vostok\"}},\"Wake\":{\"long\":{\"standard\":\"Ora dell’Isola di Wake\"}},\"Wallis\":{\"long\":{\"standard\":\"Ora di Wallis e Futuna\"}},\"Yakutsk\":{\"long\":{\"generic\":\"Ora di Yakutsk\",\"standard\":\"Ora standard di Yakutsk\",\"daylight\":\"Ora legale di Yakutsk\"}},\"Yekaterinburg\":{\"long\":{\"generic\":\"Ora di Ekaterinburg\",\"standard\":\"Ora standard di Ekaterinburg\",\"daylight\":\"Ora legale di Ekaterinburg\"}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-VA/ca-gregorian.json":
/*!*************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-VA/ca-gregorian.json ***!
  \*************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-VA\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"VA\"},\"dates\":{\"calendars\":{\"gregorian\":{\"months\":{\"format\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}}},\"days\":{\"format\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}},\"stand-alone\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}}},\"quarters\":{\"format\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}}},\"dayPeriods\":{\"format\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"del pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"}},\"stand-alone\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"}}},\"eras\":{\"eraNames\":{\"0\":\"avanti Cristo\",\"1\":\"dopo Cristo\",\"0-alt-variant\":\"avanti Era Volgare\",\"1-alt-variant\":\"Era Volgare\"},\"eraAbbr\":{\"0\":\"a.C.\",\"1\":\"d.C.\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"},\"eraNarrow\":{\"0\":\"aC\",\"1\":\"dC\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"}},\"dateFormats\":{\"full\":\"EEEE d MMMM y\",\"long\":\"d MMMM y\",\"medium\":\"d MMM y\",\"short\":\"dd/MM/yy\"},\"timeFormats\":{\"full\":\"HH:mm:ss zzzz\",\"long\":\"HH:mm:ss z\",\"medium\":\"HH:mm:ss\",\"short\":\"HH:mm\"},\"dateTimeFormats\":{\"full\":\"{1} {0}\",\"long\":\"{1} {0}\",\"medium\":\"{1}, {0}\",\"short\":\"{1}, {0}\",\"availableFormats\":{\"Bh\":\"h B\",\"Bhm\":\"h:mm B\",\"Bhms\":\"h:mm:ss B\",\"d\":\"d\",\"E\":\"ccc\",\"EBhm\":\"E h:mm B\",\"EBhms\":\"E h:mm:ss B\",\"Ed\":\"E d\",\"Ehm\":\"E h:mm a\",\"EHm\":\"E HH:mm\",\"Ehms\":\"E h:mm:ss a\",\"EHms\":\"E HH:mm:ss\",\"Gy\":\"y G\",\"GyMMM\":\"MMM y G\",\"GyMMMd\":\"d MMM y G\",\"GyMMMEd\":\"E d MMM y G\",\"h\":\"h a\",\"H\":\"HH\",\"hm\":\"h:mm a\",\"Hm\":\"HH:mm\",\"hms\":\"h:mm:ss a\",\"Hms\":\"HH:mm:ss\",\"hmsv\":\"h:mm:ss a v\",\"Hmsv\":\"HH:mm:ss v\",\"hmv\":\"h:mm a v\",\"Hmv\":\"HH:mm v\",\"M\":\"L\",\"Md\":\"d/M\",\"MEd\":\"E d/M\",\"MMM\":\"LLL\",\"MMMd\":\"d MMM\",\"MMMEd\":\"E d MMM\",\"MMMMd\":\"d MMMM\",\"MMMMW-count-one\":\"'settimana' W 'di' MMMM\",\"MMMMW-count-other\":\"'settimana' W 'di' MMMM\",\"ms\":\"mm:ss\",\"y\":\"y\",\"yM\":\"M/y\",\"yMd\":\"d/M/y\",\"yMEd\":\"E d/M/y\",\"yMMM\":\"MMM y\",\"yMMMd\":\"d MMM y\",\"yMMMEd\":\"E d MMM y\",\"yMMMM\":\"MMMM y\",\"yQQQ\":\"QQQ y\",\"yQQQQ\":\"QQQQ y\",\"yw-count-one\":\"'settimana' w 'del' Y\",\"yw-count-other\":\"'settimana' w 'del' Y\"},\"appendItems\":{\"Day\":\"{0} ({2}: {1})\",\"Day-Of-Week\":\"{0} {1}\",\"Era\":\"{1} {0}\",\"Hour\":\"{0} ({2}: {1})\",\"Minute\":\"{0} ({2}: {1})\",\"Month\":\"{0} ({2}: {1})\",\"Quarter\":\"{0} ({2}: {1})\",\"Second\":\"{0} ({2}: {1})\",\"Timezone\":\"{0} {1}\",\"Week\":\"{0} ({2}: {1})\",\"Year\":\"{1} {0}\"},\"intervalFormats\":{\"intervalFormatFallback\":\"{0} - {1}\",\"Bh\":{\"B\":\"h B – h B\",\"h\":\"h–h B\"},\"Bhm\":{\"B\":\"h:mm B – h:mm B\",\"h\":\"h:mm–h:mm B\",\"m\":\"h:mm–h:mm B\"},\"d\":{\"d\":\"d–d\"},\"Gy\":{\"G\":\"y G – y G\",\"y\":\"y – y G\"},\"GyM\":{\"G\":\"M/y GGGGG – M/y GGGGG\",\"M\":\"M/y – M/y GGGGG\",\"y\":\"M/y – M/y GGGGG\"},\"GyMd\":{\"d\":\"d/M/y – d/M/y GGGGG\",\"G\":\"d/M/y GGGGG – d/M/y GGGGG\",\"M\":\"d/M/y – d/M/y GGGGG\",\"y\":\"d/M/y – d/M/y GGGGG\"},\"GyMEd\":{\"d\":\"E d/M/y – E d/M/y GGGGG\",\"G\":\"E d/M/y – E d/M/y GGGGG\",\"M\":\"E d/M/y – E d/M/y GGGGG\",\"y\":\"E d/M/y – E d/M/y GGGGG\"},\"GyMMM\":{\"G\":\"MMM y G – MMM y G\",\"M\":\"MMM – MMM y G\",\"y\":\"MMM y – MMM y G\"},\"GyMMMd\":{\"d\":\"d – d MMM y G\",\"G\":\"d MMM y G – d MMM y G\",\"M\":\"d MMM – d MMM y G\",\"y\":\"d MMM y – d MMM y G\"},\"GyMMMEd\":{\"d\":\"E d MMM – d E MMM y G\",\"G\":\"E d MMM y G – E d MMM y G\",\"M\":\"E d MMM – E d MMM y G\",\"y\":\"E d MMM y – E d MMM y G\"},\"h\":{\"a\":\"h a – h a\",\"h\":\"h–h a\"},\"H\":{\"H\":\"HH–HH\"},\"hm\":{\"a\":\"h:mm a – h:mm a\",\"h\":\"h:mm–h:mm a\",\"m\":\"h:mm–h:mm a\"},\"Hm\":{\"H\":\"HH:mm–HH:mm\",\"m\":\"HH:mm–HH:mm\"},\"hmv\":{\"a\":\"h:mm a – h:mm a v\",\"h\":\"h:mm–h:mm a v\",\"m\":\"h:mm–h:mm a v\"},\"Hmv\":{\"H\":\"HH:mm–HH:mm v\",\"m\":\"HH:mm–HH:mm v\"},\"hv\":{\"a\":\"h a – h a v\",\"h\":\"h–h a v\"},\"Hv\":{\"H\":\"HH–HH v\"},\"M\":{\"M\":\"M–M\"},\"Md\":{\"d\":\"dd/MM – dd/MM\",\"M\":\"dd/MM – dd/MM\"},\"MEd\":{\"d\":\"E dd/MM – E dd/MM\",\"M\":\"E dd/MM – E dd/MM\"},\"MMM\":{\"M\":\"MMM–MMM\"},\"MMMd\":{\"d\":\"dd–dd MMM\",\"M\":\"dd MMM – dd MMM\"},\"MMMEd\":{\"d\":\"E dd – E dd MMM\",\"M\":\"E dd MMM – E dd MMM\"},\"y\":{\"y\":\"y–y\"},\"yM\":{\"M\":\"MM/y – MM/y\",\"y\":\"MM/y – MM/y\"},\"yMd\":{\"d\":\"dd/MM/y – dd/MM/y\",\"M\":\"dd/MM/y – dd/MM/y\",\"y\":\"dd/MM/y – dd/MM/y\"},\"yMEd\":{\"d\":\"E dd/MM/y – E dd/MM/y\",\"M\":\"E dd/MM/y – E dd/MM/y\",\"y\":\"E dd/MM/y – E dd/MM/y\"},\"yMMM\":{\"M\":\"MMM–MMM y\",\"y\":\"MMM y – MMM y\"},\"yMMMd\":{\"d\":\"dd–dd MMM y\",\"M\":\"dd MMM – dd MMM y\",\"y\":\"dd MMM y – dd MMM y\"},\"yMMMEd\":{\"d\":\"E d – E d MMM y\",\"M\":\"E d MMM – E d MMM y\",\"y\":\"E d MMM y – E d MMM y\"},\"yMMMM\":{\"M\":\"MMMM–MMMM y\",\"y\":\"MMMM y – MMMM y\"}}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it-VA/timeZoneNames.json":
/*!**************************************************************!*\
  !*** ./node_modules/cldr-data/main/it-VA/timeZoneNames.json ***!
  \**************************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it-VA\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\",\"territory\":\"VA\"},\"dates\":{\"timeZoneNames\":{\"hourFormat\":\"+HH:mm;-HH:mm\",\"gmtFormat\":\"GMT{0}\",\"gmtZeroFormat\":\"GMT\",\"regionFormat\":\"Ora {0}\",\"regionFormat-type-daylight\":\"Ora legale: {0}\",\"regionFormat-type-standard\":\"Ora standard: {0}\",\"fallbackFormat\":\"{1} ({0})\",\"zone\":{\"America\":{\"Adak\":{\"exemplarCity\":\"Adak\"},\"Anchorage\":{\"exemplarCity\":\"Anchorage\"},\"Anguilla\":{\"exemplarCity\":\"Anguilla\"},\"Antigua\":{\"exemplarCity\":\"Antigua\"},\"Araguaina\":{\"exemplarCity\":\"Araguaina\"},\"Argentina\":{\"Rio_Gallegos\":{\"exemplarCity\":\"Rio Gallegos\"},\"San_Juan\":{\"exemplarCity\":\"San Juan\"},\"Ushuaia\":{\"exemplarCity\":\"Ushuaia\"},\"La_Rioja\":{\"exemplarCity\":\"La Rioja\"},\"San_Luis\":{\"exemplarCity\":\"San Luis\"},\"Salta\":{\"exemplarCity\":\"Salta\"},\"Tucuman\":{\"exemplarCity\":\"Tucumán\"}},\"Aruba\":{\"exemplarCity\":\"Aruba\"},\"Asuncion\":{\"exemplarCity\":\"Asunción\"},\"Bahia\":{\"exemplarCity\":\"Bahia\"},\"Bahia_Banderas\":{\"exemplarCity\":\"Bahía de Banderas\"},\"Barbados\":{\"exemplarCity\":\"Barbados\"},\"Belem\":{\"exemplarCity\":\"Belem\"},\"Belize\":{\"exemplarCity\":\"Belize\"},\"Blanc-Sablon\":{\"exemplarCity\":\"Blanc-Sablon\"},\"Boa_Vista\":{\"exemplarCity\":\"Boa Vista\"},\"Bogota\":{\"exemplarCity\":\"Bogotá\"},\"Boise\":{\"exemplarCity\":\"Boise\"},\"Buenos_Aires\":{\"exemplarCity\":\"Buenos Aires\"},\"Cambridge_Bay\":{\"exemplarCity\":\"Cambridge Bay\"},\"Campo_Grande\":{\"exemplarCity\":\"Campo Grande\"},\"Cancun\":{\"exemplarCity\":\"Cancún\"},\"Caracas\":{\"exemplarCity\":\"Caracas\"},\"Catamarca\":{\"exemplarCity\":\"Catamarca\"},\"Cayenne\":{\"exemplarCity\":\"Caienna\"},\"Cayman\":{\"exemplarCity\":\"Cayman\"},\"Chicago\":{\"exemplarCity\":\"Chicago\"},\"Chihuahua\":{\"exemplarCity\":\"Chihuahua\"},\"Coral_Harbour\":{\"exemplarCity\":\"Atikokan\"},\"Cordoba\":{\"exemplarCity\":\"Cordoba\"},\"Costa_Rica\":{\"exemplarCity\":\"Costa Rica\"},\"Creston\":{\"exemplarCity\":\"Creston\"},\"Cuiaba\":{\"exemplarCity\":\"Cuiaba\"},\"Curacao\":{\"exemplarCity\":\"Curaçao\"},\"Danmarkshavn\":{\"exemplarCity\":\"Danmarkshavn\"},\"Dawson\":{\"exemplarCity\":\"Dawson\"},\"Dawson_Creek\":{\"exemplarCity\":\"Dawson Creek\"},\"Denver\":{\"exemplarCity\":\"Denver\"},\"Detroit\":{\"exemplarCity\":\"Detroit\"},\"Dominica\":{\"exemplarCity\":\"Dominica\"},\"Edmonton\":{\"exemplarCity\":\"Edmonton\"},\"Eirunepe\":{\"exemplarCity\":\"Eirunepe\"},\"El_Salvador\":{\"exemplarCity\":\"El Salvador\"},\"Fort_Nelson\":{\"exemplarCity\":\"Fort Nelson\"},\"Fortaleza\":{\"exemplarCity\":\"Fortaleza\"},\"Glace_Bay\":{\"exemplarCity\":\"Glace Bay\"},\"Godthab\":{\"exemplarCity\":\"Nuuk\"},\"Goose_Bay\":{\"exemplarCity\":\"Goose Bay\"},\"Grand_Turk\":{\"exemplarCity\":\"Grand Turk\"},\"Grenada\":{\"exemplarCity\":\"Grenada\"},\"Guadeloupe\":{\"exemplarCity\":\"Guadalupa\"},\"Guatemala\":{\"exemplarCity\":\"Guatemala\"},\"Guayaquil\":{\"exemplarCity\":\"Guayaquil\"},\"Guyana\":{\"exemplarCity\":\"Guyana\"},\"Halifax\":{\"exemplarCity\":\"Halifax\"},\"Havana\":{\"exemplarCity\":\"L’Avana\"},\"Hermosillo\":{\"exemplarCity\":\"Hermosillo\"},\"Indiana\":{\"Vincennes\":{\"exemplarCity\":\"Vincennes, Indiana\"},\"Petersburg\":{\"exemplarCity\":\"Petersburg, Indiana\"},\"Tell_City\":{\"exemplarCity\":\"Tell City, Indiana\"},\"Knox\":{\"exemplarCity\":\"Knox, Indiana\"},\"Winamac\":{\"exemplarCity\":\"Winamac, Indiana\"},\"Marengo\":{\"exemplarCity\":\"Marengo, Indiana\"},\"Vevay\":{\"exemplarCity\":\"Vevay, Indiana\"}},\"Indianapolis\":{\"exemplarCity\":\"Indianapolis\"},\"Inuvik\":{\"exemplarCity\":\"Inuvik\"},\"Iqaluit\":{\"exemplarCity\":\"Iqaluit\"},\"Jamaica\":{\"exemplarCity\":\"Giamaica\"},\"Jujuy\":{\"exemplarCity\":\"Jujuy\"},\"Juneau\":{\"exemplarCity\":\"Juneau\"},\"Kentucky\":{\"Monticello\":{\"exemplarCity\":\"Monticello, Kentucky\"}},\"Kralendijk\":{\"exemplarCity\":\"Kralendijk\"},\"La_Paz\":{\"exemplarCity\":\"La Paz\"},\"Lima\":{\"exemplarCity\":\"Lima\"},\"Los_Angeles\":{\"exemplarCity\":\"Los Angeles\"},\"Louisville\":{\"exemplarCity\":\"Louisville\"},\"Lower_Princes\":{\"exemplarCity\":\"Lower Prince’s Quarter\"},\"Maceio\":{\"exemplarCity\":\"Maceio\"},\"Managua\":{\"exemplarCity\":\"Managua\"},\"Manaus\":{\"exemplarCity\":\"Manaus\"},\"Marigot\":{\"exemplarCity\":\"Marigot\"},\"Martinique\":{\"exemplarCity\":\"Martinica\"},\"Matamoros\":{\"exemplarCity\":\"Matamoros\"},\"Mazatlan\":{\"exemplarCity\":\"Mazatlan\"},\"Mendoza\":{\"exemplarCity\":\"Mendoza\"},\"Menominee\":{\"exemplarCity\":\"Menominee\"},\"Merida\":{\"exemplarCity\":\"Mérida\"},\"Metlakatla\":{\"exemplarCity\":\"Metlakatla\"},\"Mexico_City\":{\"exemplarCity\":\"Città del Messico\"},\"Miquelon\":{\"exemplarCity\":\"Miquelon\"},\"Moncton\":{\"exemplarCity\":\"Moncton\"},\"Monterrey\":{\"exemplarCity\":\"Monterrey\"},\"Montevideo\":{\"exemplarCity\":\"Montevideo\"},\"Montserrat\":{\"exemplarCity\":\"Montserrat\"},\"Nassau\":{\"exemplarCity\":\"Nassau\"},\"New_York\":{\"exemplarCity\":\"New York\"},\"Nipigon\":{\"exemplarCity\":\"Nipigon\"},\"Nome\":{\"exemplarCity\":\"Nome\"},\"Noronha\":{\"exemplarCity\":\"Noronha\"},\"North_Dakota\":{\"Beulah\":{\"exemplarCity\":\"Beulah, Dakota del nord\"},\"New_Salem\":{\"exemplarCity\":\"New Salem, Dakota del nord\"},\"Center\":{\"exemplarCity\":\"Center, Dakota del nord\"}},\"Ojinaga\":{\"exemplarCity\":\"Ojinaga\"},\"Panama\":{\"exemplarCity\":\"Panamá\"},\"Pangnirtung\":{\"exemplarCity\":\"Pangnirtung\"},\"Paramaribo\":{\"exemplarCity\":\"Paramaribo\"},\"Phoenix\":{\"exemplarCity\":\"Phoenix\"},\"Port-au-Prince\":{\"exemplarCity\":\"Port-au-Prince\"},\"Port_of_Spain\":{\"exemplarCity\":\"Port of Spain\"},\"Porto_Velho\":{\"exemplarCity\":\"Porto Velho\"},\"Puerto_Rico\":{\"exemplarCity\":\"Portorico\"},\"Punta_Arenas\":{\"exemplarCity\":\"Punta Arenas\"},\"Rainy_River\":{\"exemplarCity\":\"Rainy River\"},\"Rankin_Inlet\":{\"exemplarCity\":\"Rankin Inlet\"},\"Recife\":{\"exemplarCity\":\"Recife\"},\"Regina\":{\"exemplarCity\":\"Regina\"},\"Resolute\":{\"exemplarCity\":\"Resolute\"},\"Rio_Branco\":{\"exemplarCity\":\"Rio Branco\"},\"Santa_Isabel\":{\"exemplarCity\":\"Santa Isabel\"},\"Santarem\":{\"exemplarCity\":\"Santarém\"},\"Santiago\":{\"exemplarCity\":\"Santiago\"},\"Santo_Domingo\":{\"exemplarCity\":\"Santo Domingo\"},\"Sao_Paulo\":{\"exemplarCity\":\"San Paolo\"},\"Scoresbysund\":{\"exemplarCity\":\"Ittoqqortoormiit\"},\"Sitka\":{\"exemplarCity\":\"Sitka\"},\"St_Barthelemy\":{\"exemplarCity\":\"Saint-Barthélemy\"},\"St_Johns\":{\"exemplarCity\":\"St. John’s\"},\"St_Kitts\":{\"exemplarCity\":\"St. Kitts\"},\"St_Lucia\":{\"exemplarCity\":\"Santa Lucia\"},\"St_Thomas\":{\"exemplarCity\":\"Saint Thomas\"},\"St_Vincent\":{\"exemplarCity\":\"Saint Vincent\"},\"Swift_Current\":{\"exemplarCity\":\"Swift Current\"},\"Tegucigalpa\":{\"exemplarCity\":\"Tegucigalpa\"},\"Thule\":{\"exemplarCity\":\"Thule\"},\"Thunder_Bay\":{\"exemplarCity\":\"Thunder Bay\"},\"Tijuana\":{\"exemplarCity\":\"Tijuana\"},\"Toronto\":{\"exemplarCity\":\"Toronto\"},\"Tortola\":{\"exemplarCity\":\"Tortola\"},\"Vancouver\":{\"exemplarCity\":\"Vancouver\"},\"Whitehorse\":{\"exemplarCity\":\"Whitehorse\"},\"Winnipeg\":{\"exemplarCity\":\"Winnipeg\"},\"Yakutat\":{\"exemplarCity\":\"Yakutat\"},\"Yellowknife\":{\"exemplarCity\":\"Yellowknife\"}},\"Atlantic\":{\"Azores\":{\"exemplarCity\":\"Azzorre\"},\"Bermuda\":{\"exemplarCity\":\"Bermuda\"},\"Canary\":{\"exemplarCity\":\"Canarie\"},\"Cape_Verde\":{\"exemplarCity\":\"Capo Verde\"},\"Faeroe\":{\"exemplarCity\":\"Isole Fær Øer\"},\"Madeira\":{\"exemplarCity\":\"Madeira\"},\"Reykjavik\":{\"exemplarCity\":\"Reykjavík\"},\"South_Georgia\":{\"exemplarCity\":\"Georgia del Sud\"},\"St_Helena\":{\"exemplarCity\":\"Sant’Elena\"},\"Stanley\":{\"exemplarCity\":\"Stanley\"}},\"Europe\":{\"Amsterdam\":{\"exemplarCity\":\"Amsterdam\"},\"Andorra\":{\"exemplarCity\":\"Andorra\"},\"Astrakhan\":{\"exemplarCity\":\"Astrakhan\"},\"Athens\":{\"exemplarCity\":\"Atene\"},\"Belgrade\":{\"exemplarCity\":\"Belgrado\"},\"Berlin\":{\"exemplarCity\":\"Berlino\"},\"Bratislava\":{\"exemplarCity\":\"Bratislava\"},\"Brussels\":{\"exemplarCity\":\"Bruxelles\"},\"Bucharest\":{\"exemplarCity\":\"Bucarest\"},\"Budapest\":{\"exemplarCity\":\"Budapest\"},\"Busingen\":{\"exemplarCity\":\"Büsingen\"},\"Chisinau\":{\"exemplarCity\":\"Chisinau\"},\"Copenhagen\":{\"exemplarCity\":\"Copenaghen\"},\"Dublin\":{\"long\":{\"daylight\":\"Ora legale dell’Irlanda\"},\"exemplarCity\":\"Dublino\"},\"Gibraltar\":{\"exemplarCity\":\"Gibilterra\"},\"Guernsey\":{\"exemplarCity\":\"Guernsey\"},\"Helsinki\":{\"exemplarCity\":\"Helsinki\"},\"Isle_of_Man\":{\"exemplarCity\":\"Isola di Man\"},\"Istanbul\":{\"exemplarCity\":\"Istanbul\"},\"Jersey\":{\"exemplarCity\":\"Jersey\"},\"Kaliningrad\":{\"exemplarCity\":\"Kaliningrad\"},\"Kiev\":{\"exemplarCity\":\"Kiev\"},\"Kirov\":{\"exemplarCity\":\"Kirov\"},\"Lisbon\":{\"exemplarCity\":\"Lisbona\"},\"Ljubljana\":{\"exemplarCity\":\"Lubiana\"},\"London\":{\"long\":{\"daylight\":\"Ora legale del Regno Unito\"},\"exemplarCity\":\"Londra\"},\"Luxembourg\":{\"exemplarCity\":\"Lussemburgo\"},\"Madrid\":{\"exemplarCity\":\"Madrid\"},\"Malta\":{\"exemplarCity\":\"Malta\"},\"Mariehamn\":{\"exemplarCity\":\"Mariehamn\"},\"Minsk\":{\"exemplarCity\":\"Minsk\"},\"Monaco\":{\"exemplarCity\":\"Monaco\"},\"Moscow\":{\"exemplarCity\":\"Mosca\"},\"Oslo\":{\"exemplarCity\":\"Oslo\"},\"Paris\":{\"exemplarCity\":\"Parigi\"},\"Podgorica\":{\"exemplarCity\":\"Podgorica\"},\"Prague\":{\"exemplarCity\":\"Praga\"},\"Riga\":{\"exemplarCity\":\"Riga\"},\"Rome\":{\"exemplarCity\":\"Roma\"},\"Samara\":{\"exemplarCity\":\"Samara\"},\"San_Marino\":{\"exemplarCity\":\"San Marino\"},\"Sarajevo\":{\"exemplarCity\":\"Sarajevo\"},\"Saratov\":{\"exemplarCity\":\"Saratov\"},\"Simferopol\":{\"exemplarCity\":\"Sinferopoli\"},\"Skopje\":{\"exemplarCity\":\"Skopje\"},\"Sofia\":{\"exemplarCity\":\"Sofia\"},\"Stockholm\":{\"exemplarCity\":\"Stoccolma\"},\"Tallinn\":{\"exemplarCity\":\"Tallinn\"},\"Tirane\":{\"exemplarCity\":\"Tirana\"},\"Ulyanovsk\":{\"exemplarCity\":\"Ulyanovsk\"},\"Uzhgorod\":{\"exemplarCity\":\"Užhorod\"},\"Vaduz\":{\"exemplarCity\":\"Vaduz\"},\"Vatican\":{\"exemplarCity\":\"Città del Vaticano\"},\"Vienna\":{\"exemplarCity\":\"Vienna\"},\"Vilnius\":{\"exemplarCity\":\"Vilnius\"},\"Volgograd\":{\"exemplarCity\":\"Volgograd\"},\"Warsaw\":{\"exemplarCity\":\"Varsavia\"},\"Zagreb\":{\"exemplarCity\":\"Zagabria\"},\"Zaporozhye\":{\"exemplarCity\":\"Zaporozhye\"},\"Zurich\":{\"exemplarCity\":\"Zurigo\"}},\"Africa\":{\"Abidjan\":{\"exemplarCity\":\"Abidjan\"},\"Accra\":{\"exemplarCity\":\"Accra\"},\"Addis_Ababa\":{\"exemplarCity\":\"Addis Abeba\"},\"Algiers\":{\"exemplarCity\":\"Algeri\"},\"Asmera\":{\"exemplarCity\":\"Asmara\"},\"Bamako\":{\"exemplarCity\":\"Bamako\"},\"Bangui\":{\"exemplarCity\":\"Bangui\"},\"Banjul\":{\"exemplarCity\":\"Banjul\"},\"Bissau\":{\"exemplarCity\":\"Bissau\"},\"Blantyre\":{\"exemplarCity\":\"Blantyre\"},\"Brazzaville\":{\"exemplarCity\":\"Brazzaville\"},\"Bujumbura\":{\"exemplarCity\":\"Bujumbura\"},\"Cairo\":{\"exemplarCity\":\"Il Cairo\"},\"Casablanca\":{\"exemplarCity\":\"Casablanca\"},\"Ceuta\":{\"exemplarCity\":\"Ceuta\"},\"Conakry\":{\"exemplarCity\":\"Conakry\"},\"Dakar\":{\"exemplarCity\":\"Dakar\"},\"Dar_es_Salaam\":{\"exemplarCity\":\"Dar es Salaam\"},\"Djibouti\":{\"exemplarCity\":\"Gibuti\"},\"Douala\":{\"exemplarCity\":\"Douala\"},\"El_Aaiun\":{\"exemplarCity\":\"El Ayun\"},\"Freetown\":{\"exemplarCity\":\"Freetown\"},\"Gaborone\":{\"exemplarCity\":\"Gaborone\"},\"Harare\":{\"exemplarCity\":\"Harare\"},\"Johannesburg\":{\"exemplarCity\":\"Johannesburg\"},\"Juba\":{\"exemplarCity\":\"Giuba\"},\"Kampala\":{\"exemplarCity\":\"Kampala\"},\"Khartoum\":{\"exemplarCity\":\"Khartum\"},\"Kigali\":{\"exemplarCity\":\"Kigali\"},\"Kinshasa\":{\"exemplarCity\":\"Kinshasa\"},\"Lagos\":{\"exemplarCity\":\"Lagos\"},\"Libreville\":{\"exemplarCity\":\"Libreville\"},\"Lome\":{\"exemplarCity\":\"Lomé\"},\"Luanda\":{\"exemplarCity\":\"Luanda\"},\"Lubumbashi\":{\"exemplarCity\":\"Lubumbashi\"},\"Lusaka\":{\"exemplarCity\":\"Lusaka\"},\"Malabo\":{\"exemplarCity\":\"Malabo\"},\"Maputo\":{\"exemplarCity\":\"Maputo\"},\"Maseru\":{\"exemplarCity\":\"Maseru\"},\"Mbabane\":{\"exemplarCity\":\"Mbabane\"},\"Mogadishu\":{\"exemplarCity\":\"Mogadiscio\"},\"Monrovia\":{\"exemplarCity\":\"Monrovia\"},\"Nairobi\":{\"exemplarCity\":\"Nairobi\"},\"Ndjamena\":{\"exemplarCity\":\"N’Djamena\"},\"Niamey\":{\"exemplarCity\":\"Niamey\"},\"Nouakchott\":{\"exemplarCity\":\"Nouakchott\"},\"Ouagadougou\":{\"exemplarCity\":\"Ouagadougou\"},\"Porto-Novo\":{\"exemplarCity\":\"Porto-Novo\"},\"Sao_Tome\":{\"exemplarCity\":\"São Tomé\"},\"Tripoli\":{\"exemplarCity\":\"Tripoli\"},\"Tunis\":{\"exemplarCity\":\"Tunisi\"},\"Windhoek\":{\"exemplarCity\":\"Windhoek\"}},\"Asia\":{\"Aden\":{\"exemplarCity\":\"Aden\"},\"Almaty\":{\"exemplarCity\":\"Almaty\"},\"Amman\":{\"exemplarCity\":\"Amman\"},\"Anadyr\":{\"exemplarCity\":\"Anadyr’\"},\"Aqtau\":{\"exemplarCity\":\"Aqtau\"},\"Aqtobe\":{\"exemplarCity\":\"Aqtöbe\"},\"Ashgabat\":{\"exemplarCity\":\"Ashgabat\"},\"Atyrau\":{\"exemplarCity\":\"Atyrau\"},\"Baghdad\":{\"exemplarCity\":\"Baghdad\"},\"Bahrain\":{\"exemplarCity\":\"Bahrein\"},\"Baku\":{\"exemplarCity\":\"Baku\"},\"Bangkok\":{\"exemplarCity\":\"Bangkok\"},\"Barnaul\":{\"exemplarCity\":\"Barnaul\"},\"Beirut\":{\"exemplarCity\":\"Beirut\"},\"Bishkek\":{\"exemplarCity\":\"Bishkek\"},\"Brunei\":{\"exemplarCity\":\"Brunei\"},\"Calcutta\":{\"exemplarCity\":\"Calcutta\"},\"Chita\":{\"exemplarCity\":\"Čita\"},\"Choibalsan\":{\"exemplarCity\":\"Choibalsan\"},\"Colombo\":{\"exemplarCity\":\"Colombo\"},\"Damascus\":{\"exemplarCity\":\"Damasco\"},\"Dhaka\":{\"exemplarCity\":\"Dacca\"},\"Dili\":{\"exemplarCity\":\"Dili\"},\"Dubai\":{\"exemplarCity\":\"Dubai\"},\"Dushanbe\":{\"exemplarCity\":\"Dushanbe\"},\"Famagusta\":{\"exemplarCity\":\"Famagosta\"},\"Gaza\":{\"exemplarCity\":\"Gaza\"},\"Hebron\":{\"exemplarCity\":\"Hebron\"},\"Hong_Kong\":{\"exemplarCity\":\"Hong Kong\"},\"Hovd\":{\"exemplarCity\":\"Hovd\"},\"Irkutsk\":{\"exemplarCity\":\"Irkutsk\"},\"Jakarta\":{\"exemplarCity\":\"Giacarta\"},\"Jayapura\":{\"exemplarCity\":\"Jayapura\"},\"Jerusalem\":{\"exemplarCity\":\"Gerusalemme\"},\"Kabul\":{\"exemplarCity\":\"Kabul\"},\"Kamchatka\":{\"exemplarCity\":\"Kamchatka\"},\"Karachi\":{\"exemplarCity\":\"Karachi\"},\"Katmandu\":{\"exemplarCity\":\"Kathmandu\"},\"Khandyga\":{\"exemplarCity\":\"Chandyga\"},\"Krasnoyarsk\":{\"exemplarCity\":\"Krasnojarsk\"},\"Kuala_Lumpur\":{\"exemplarCity\":\"Kuala Lumpur\"},\"Kuching\":{\"exemplarCity\":\"Kuching\"},\"Kuwait\":{\"exemplarCity\":\"Kuwait\"},\"Macau\":{\"exemplarCity\":\"Macao\"},\"Magadan\":{\"exemplarCity\":\"Magadan\"},\"Makassar\":{\"exemplarCity\":\"Makassar\"},\"Manila\":{\"exemplarCity\":\"Manila\"},\"Muscat\":{\"exemplarCity\":\"Mascate\"},\"Nicosia\":{\"exemplarCity\":\"Nicosia\"},\"Novokuznetsk\":{\"exemplarCity\":\"Novokuzneck\"},\"Novosibirsk\":{\"exemplarCity\":\"Novosibirsk\"},\"Omsk\":{\"exemplarCity\":\"Omsk\"},\"Oral\":{\"exemplarCity\":\"Oral\"},\"Phnom_Penh\":{\"exemplarCity\":\"Phnom Penh\"},\"Pontianak\":{\"exemplarCity\":\"Pontianak\"},\"Pyongyang\":{\"exemplarCity\":\"Pyongyang\"},\"Qatar\":{\"exemplarCity\":\"Qatar\"},\"Qostanay\":{\"exemplarCity\":\"Qostanay\"},\"Qyzylorda\":{\"exemplarCity\":\"Qyzylorda\"},\"Rangoon\":{\"exemplarCity\":\"Rangoon\"},\"Riyadh\":{\"exemplarCity\":\"Riyad\"},\"Saigon\":{\"exemplarCity\":\"Ho Chi Minh\"},\"Sakhalin\":{\"exemplarCity\":\"Sachalin\"},\"Samarkand\":{\"exemplarCity\":\"Samarcanda\"},\"Seoul\":{\"exemplarCity\":\"Seul\"},\"Shanghai\":{\"exemplarCity\":\"Shanghai\"},\"Singapore\":{\"exemplarCity\":\"Singapore\"},\"Srednekolymsk\":{\"exemplarCity\":\"Srednekolymsk\"},\"Taipei\":{\"exemplarCity\":\"Taipei\"},\"Tashkent\":{\"exemplarCity\":\"Tashkent\"},\"Tbilisi\":{\"exemplarCity\":\"Tbilisi\"},\"Tehran\":{\"exemplarCity\":\"Teheran\"},\"Thimphu\":{\"exemplarCity\":\"Thimphu\"},\"Tokyo\":{\"exemplarCity\":\"Tokyo\"},\"Tomsk\":{\"exemplarCity\":\"Tomsk\"},\"Ulaanbaatar\":{\"exemplarCity\":\"Ulaanbaatar\"},\"Urumqi\":{\"exemplarCity\":\"Urumqi\"},\"Ust-Nera\":{\"exemplarCity\":\"Ust’-Nera\"},\"Vientiane\":{\"exemplarCity\":\"Vientiane\"},\"Vladivostok\":{\"exemplarCity\":\"Vladivostok\"},\"Yakutsk\":{\"exemplarCity\":\"Jakutsk\"},\"Yekaterinburg\":{\"exemplarCity\":\"Ekaterinburg\"},\"Yerevan\":{\"exemplarCity\":\"Yerevan\"}},\"Indian\":{\"Antananarivo\":{\"exemplarCity\":\"Antananarivo\"},\"Chagos\":{\"exemplarCity\":\"Chagos\"},\"Christmas\":{\"exemplarCity\":\"Natale\"},\"Cocos\":{\"exemplarCity\":\"Cocos\"},\"Comoro\":{\"exemplarCity\":\"Comore\"},\"Kerguelen\":{\"exemplarCity\":\"Kerguelen\"},\"Mahe\":{\"exemplarCity\":\"Mahe\"},\"Maldives\":{\"exemplarCity\":\"Maldive\"},\"Mauritius\":{\"exemplarCity\":\"Mauritius\"},\"Mayotte\":{\"exemplarCity\":\"Mayotte\"},\"Reunion\":{\"exemplarCity\":\"La Riunione\"}},\"Australia\":{\"Adelaide\":{\"exemplarCity\":\"Adelaide\"},\"Brisbane\":{\"exemplarCity\":\"Brisbane\"},\"Broken_Hill\":{\"exemplarCity\":\"Broken Hill\"},\"Currie\":{\"exemplarCity\":\"Currie\"},\"Darwin\":{\"exemplarCity\":\"Darwin\"},\"Eucla\":{\"exemplarCity\":\"Eucla\"},\"Hobart\":{\"exemplarCity\":\"Hobart\"},\"Lindeman\":{\"exemplarCity\":\"Lindeman\"},\"Lord_Howe\":{\"exemplarCity\":\"Lord Howe\"},\"Melbourne\":{\"exemplarCity\":\"Melbourne\"},\"Perth\":{\"exemplarCity\":\"Perth\"},\"Sydney\":{\"exemplarCity\":\"Sydney\"}},\"Pacific\":{\"Apia\":{\"exemplarCity\":\"Apia\"},\"Auckland\":{\"exemplarCity\":\"Auckland\"},\"Bougainville\":{\"exemplarCity\":\"Bougainville\"},\"Chatham\":{\"exemplarCity\":\"Chatham\"},\"Easter\":{\"exemplarCity\":\"Pasqua\"},\"Efate\":{\"exemplarCity\":\"Efate\"},\"Enderbury\":{\"exemplarCity\":\"Enderbury\"},\"Fakaofo\":{\"exemplarCity\":\"Fakaofo\"},\"Fiji\":{\"exemplarCity\":\"Figi\"},\"Funafuti\":{\"exemplarCity\":\"Funafuti\"},\"Galapagos\":{\"exemplarCity\":\"Galapagos\"},\"Gambier\":{\"exemplarCity\":\"Gambier\"},\"Guadalcanal\":{\"exemplarCity\":\"Guadalcanal\"},\"Guam\":{\"exemplarCity\":\"Guam\"},\"Honolulu\":{\"exemplarCity\":\"Honolulu\"},\"Johnston\":{\"exemplarCity\":\"Johnston\"},\"Kiritimati\":{\"exemplarCity\":\"Kiritimati\"},\"Kosrae\":{\"exemplarCity\":\"Kosrae\"},\"Kwajalein\":{\"exemplarCity\":\"Kwajalein\"},\"Majuro\":{\"exemplarCity\":\"Majuro\"},\"Marquesas\":{\"exemplarCity\":\"Marchesi\"},\"Midway\":{\"exemplarCity\":\"Midway\"},\"Nauru\":{\"exemplarCity\":\"Nauru\"},\"Niue\":{\"exemplarCity\":\"Niue\"},\"Norfolk\":{\"exemplarCity\":\"Norfolk\"},\"Noumea\":{\"exemplarCity\":\"Noumea\"},\"Pago_Pago\":{\"exemplarCity\":\"Pago Pago\"},\"Palau\":{\"exemplarCity\":\"Palau\"},\"Pitcairn\":{\"exemplarCity\":\"Pitcairn\"},\"Ponape\":{\"exemplarCity\":\"Pohnpei\"},\"Port_Moresby\":{\"exemplarCity\":\"Port Moresby\"},\"Rarotonga\":{\"exemplarCity\":\"Rarotonga\"},\"Saipan\":{\"exemplarCity\":\"Saipan\"},\"Tahiti\":{\"exemplarCity\":\"Tahiti\"},\"Tarawa\":{\"exemplarCity\":\"Tarawa\"},\"Tongatapu\":{\"exemplarCity\":\"Tongatapu\"},\"Truk\":{\"exemplarCity\":\"Chuuk\"},\"Wake\":{\"exemplarCity\":\"Wake\"},\"Wallis\":{\"exemplarCity\":\"Wallis\"}},\"Arctic\":{\"Longyearbyen\":{\"exemplarCity\":\"Longyearbyen\"}},\"Antarctica\":{\"Casey\":{\"exemplarCity\":\"Casey\"},\"Davis\":{\"exemplarCity\":\"Davis\"},\"DumontDUrville\":{\"exemplarCity\":\"Dumont d’Urville\"},\"Macquarie\":{\"exemplarCity\":\"Macquarie\"},\"Mawson\":{\"exemplarCity\":\"Mawson\"},\"McMurdo\":{\"exemplarCity\":\"McMurdo\"},\"Palmer\":{\"exemplarCity\":\"Palmer\"},\"Rothera\":{\"exemplarCity\":\"Rothera\"},\"Syowa\":{\"exemplarCity\":\"Syowa\"},\"Troll\":{\"exemplarCity\":\"Troll\"},\"Vostok\":{\"exemplarCity\":\"Vostok\"}},\"Etc\":{\"UTC\":{\"long\":{\"standard\":\"Tempo coordinato universale\"},\"short\":{\"standard\":\"UTC\"}},\"Unknown\":{\"exemplarCity\":\"Città sconosciuta\"}}},\"metazone\":{\"Afghanistan\":{\"long\":{\"standard\":\"Ora dell’Afghanistan\"}},\"Africa_Central\":{\"long\":{\"standard\":\"Ora dell’Africa centrale\"}},\"Africa_Eastern\":{\"long\":{\"standard\":\"Ora dell’Africa orientale\"}},\"Africa_Southern\":{\"long\":{\"standard\":\"Ora dell’Africa meridionale\"}},\"Africa_Western\":{\"long\":{\"generic\":\"Ora dell’Africa occidentale\",\"standard\":\"Ora standard dell’Africa occidentale\",\"daylight\":\"Ora legale dell’Africa occidentale\"}},\"Alaska\":{\"long\":{\"generic\":\"Ora dell’Alaska\",\"standard\":\"Ora standard dell’Alaska\",\"daylight\":\"Ora legale dell’Alaska\"}},\"Amazon\":{\"long\":{\"generic\":\"Ora dell’Amazzonia\",\"standard\":\"Ora standard dell’Amazzonia\",\"daylight\":\"Ora legale dell’Amazzonia\"}},\"America_Central\":{\"long\":{\"generic\":\"Ora centrale USA\",\"standard\":\"Ora standard centrale USA\",\"daylight\":\"Ora legale centrale USA\"}},\"America_Eastern\":{\"long\":{\"generic\":\"Ora orientale USA\",\"standard\":\"Ora standard orientale USA\",\"daylight\":\"Ora legale orientale USA\"}},\"America_Mountain\":{\"long\":{\"generic\":\"Ora Montagne Rocciose USA\",\"standard\":\"Ora standard Montagne Rocciose USA\",\"daylight\":\"Ora legale Montagne Rocciose USA\"}},\"America_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico USA\",\"standard\":\"Ora standard del Pacifico USA\",\"daylight\":\"Ora legale del Pacifico USA\"}},\"Anadyr\":{\"long\":{\"generic\":\"Ora di Anadyr\",\"standard\":\"Ora standard di Anadyr\",\"daylight\":\"Ora legale di Anadyr\"}},\"Apia\":{\"long\":{\"generic\":\"Ora di Apia\",\"standard\":\"Ora standard di Apia\",\"daylight\":\"Ora legale di Apia\"}},\"Arabian\":{\"long\":{\"generic\":\"Ora araba\",\"standard\":\"Ora standard araba\",\"daylight\":\"Ora legale araba\"}},\"Argentina\":{\"long\":{\"generic\":\"Ora dell’Argentina\",\"standard\":\"Ora standard dell’Argentina\",\"daylight\":\"Ora legale dell’Argentina\"}},\"Argentina_Western\":{\"long\":{\"generic\":\"Ora dell’Argentina occidentale\",\"standard\":\"Ora standard dell’Argentina occidentale\",\"daylight\":\"Ora legale dell’Argentina occidentale\"}},\"Armenia\":{\"long\":{\"generic\":\"Ora dell’Armenia\",\"standard\":\"Ora standard dell’Armenia\",\"daylight\":\"Ora legale dell’Armenia\"}},\"Atlantic\":{\"long\":{\"generic\":\"Ora dell’Atlantico\",\"standard\":\"Ora standard dell’Atlantico\",\"daylight\":\"Ora legale dell’Atlantico\"}},\"Australia_Central\":{\"long\":{\"generic\":\"Ora dell’Australia centrale\",\"standard\":\"Ora standard dell’Australia centrale\",\"daylight\":\"Ora legale dell’Australia centrale\"}},\"Australia_CentralWestern\":{\"long\":{\"generic\":\"Ora dell’Australia centroccidentale\",\"standard\":\"Ora standard dell’Australia centroccidentale\",\"daylight\":\"Ora legale dell’Australia centroccidentale\"}},\"Australia_Eastern\":{\"long\":{\"generic\":\"Ora dell’Australia orientale\",\"standard\":\"Ora standard dell’Australia orientale\",\"daylight\":\"Ora legale dell’Australia orientale\"}},\"Australia_Western\":{\"long\":{\"generic\":\"Ora dell’Australia occidentale\",\"standard\":\"Ora standard dell’Australia occidentale\",\"daylight\":\"Ora legale dell’Australia occidentale\"}},\"Azerbaijan\":{\"long\":{\"generic\":\"Ora dell’Azerbaigian\",\"standard\":\"Ora standard dell’Azerbaigian\",\"daylight\":\"Ora legale dell’Azerbaigian\"}},\"Azores\":{\"long\":{\"generic\":\"Ora delle Azzorre\",\"standard\":\"Ora standard delle Azzorre\",\"daylight\":\"Ora legale delle Azzorre\"}},\"Bangladesh\":{\"long\":{\"generic\":\"Ora del Bangladesh\",\"standard\":\"Ora standard del Bangladesh\",\"daylight\":\"Ora legale del Bangladesh\"}},\"Bhutan\":{\"long\":{\"standard\":\"Ora del Bhutan\"}},\"Bolivia\":{\"long\":{\"standard\":\"Ora della Bolivia\"}},\"Brasilia\":{\"long\":{\"generic\":\"Ora di Brasilia\",\"standard\":\"Ora standard di Brasilia\",\"daylight\":\"Ora legale di Brasilia\"}},\"Brunei\":{\"long\":{\"standard\":\"Ora del Brunei Darussalam\"}},\"Cape_Verde\":{\"long\":{\"generic\":\"Ora di Capo Verde\",\"standard\":\"Ora standard di Capo Verde\",\"daylight\":\"Ora legale di Capo Verde\"}},\"Chamorro\":{\"long\":{\"standard\":\"Ora di Chamorro\"}},\"Chatham\":{\"long\":{\"generic\":\"Ora delle Chatham\",\"standard\":\"Ora standard delle Chatham\",\"daylight\":\"Ora legale delle Chatham\"}},\"Chile\":{\"long\":{\"generic\":\"Ora del Cile\",\"standard\":\"Ora standard del Cile\",\"daylight\":\"Ora legale del Cile\"}},\"China\":{\"long\":{\"generic\":\"Ora della Cina\",\"standard\":\"Ora standard della Cina\",\"daylight\":\"Ora legale della Cina\"}},\"Choibalsan\":{\"long\":{\"generic\":\"Ora di Choibalsan\",\"standard\":\"Ora standard di Choibalsan\",\"daylight\":\"Ora legale di Choibalsan\"}},\"Christmas\":{\"long\":{\"standard\":\"Ora dell’Isola Christmas\"}},\"Cocos\":{\"long\":{\"standard\":\"Ora delle Isole Cocos\"}},\"Colombia\":{\"long\":{\"generic\":\"Ora della Colombia\",\"standard\":\"Ora standard della Colombia\",\"daylight\":\"Ora legale della Colombia\"}},\"Cook\":{\"long\":{\"generic\":\"Ora delle isole Cook\",\"standard\":\"Ora standard delle isole Cook\",\"daylight\":\"Ora legale media delle isole Cook\"}},\"Cuba\":{\"long\":{\"generic\":\"Ora di Cuba\",\"standard\":\"Ora standard di Cuba\",\"daylight\":\"Ora legale di Cuba\"}},\"Davis\":{\"long\":{\"standard\":\"Ora di Davis\"}},\"DumontDUrville\":{\"long\":{\"standard\":\"Ora di Dumont-d’Urville\"}},\"East_Timor\":{\"long\":{\"standard\":\"Ora di Timor Est\"}},\"Easter\":{\"long\":{\"generic\":\"Ora dell’Isola di Pasqua\",\"standard\":\"Ora standard dell’Isola di Pasqua\",\"daylight\":\"Ora legale dell’Isola di Pasqua\"}},\"Ecuador\":{\"long\":{\"standard\":\"Ora dell’Ecuador\"}},\"Europe_Central\":{\"long\":{\"generic\":\"Ora dell’Europa centrale\",\"standard\":\"Ora standard dell’Europa centrale\",\"daylight\":\"Ora legale dell’Europa centrale\"},\"short\":{\"generic\":\"CET\",\"standard\":\"CET\",\"daylight\":\"CEST\"}},\"Europe_Eastern\":{\"long\":{\"generic\":\"Ora dell’Europa orientale\",\"standard\":\"Ora standard dell’Europa orientale\",\"daylight\":\"Ora legale dell’Europa orientale\"},\"short\":{\"generic\":\"EET\",\"standard\":\"EET\",\"daylight\":\"EEST\"}},\"Europe_Further_Eastern\":{\"long\":{\"standard\":\"Ora dell’Europa orientale (Kaliningrad)\"}},\"Europe_Western\":{\"long\":{\"generic\":\"Ora dell’Europa occidentale\",\"standard\":\"Ora standard dell’Europa occidentale\",\"daylight\":\"Ora legale dell’Europa occidentale\"},\"short\":{\"generic\":\"WET\",\"standard\":\"WET\",\"daylight\":\"WEST\"}},\"Falkland\":{\"long\":{\"generic\":\"Ora delle Isole Falkland\",\"standard\":\"Ora standard delle Isole Falkland\",\"daylight\":\"Ora legale delle Isole Falkland\"}},\"Fiji\":{\"long\":{\"generic\":\"Ora delle Figi\",\"standard\":\"Ora standard delle Figi\",\"daylight\":\"Ora legale delle Figi\"}},\"French_Guiana\":{\"long\":{\"standard\":\"Ora della Guiana francese\"}},\"French_Southern\":{\"long\":{\"standard\":\"Ora delle Terre australi e antartiche francesi\"}},\"Galapagos\":{\"long\":{\"standard\":\"Ora delle Galapagos\"}},\"Gambier\":{\"long\":{\"standard\":\"Ora di Gambier\"}},\"Georgia\":{\"long\":{\"generic\":\"Ora della Georgia\",\"standard\":\"Ora standard della Georgia\",\"daylight\":\"Ora legale della Georgia\"}},\"Gilbert_Islands\":{\"long\":{\"standard\":\"Ora delle isole Gilbert\"}},\"GMT\":{\"long\":{\"standard\":\"Ora del meridiano di Greenwich\"}},\"Greenland_Eastern\":{\"long\":{\"generic\":\"Ora della Groenlandia orientale\",\"standard\":\"Ora standard della Groenlandia orientale\",\"daylight\":\"Ora legale della Groenlandia orientale\"}},\"Greenland_Western\":{\"long\":{\"generic\":\"Ora della Groenlandia occidentale\",\"standard\":\"Ora standard della Groenlandia occidentale\",\"daylight\":\"Ora legale della Groenlandia occidentale\"}},\"Gulf\":{\"long\":{\"standard\":\"Ora del Golfo\"}},\"Guyana\":{\"long\":{\"standard\":\"Ora della Guyana\"}},\"Hawaii_Aleutian\":{\"long\":{\"generic\":\"Ora delle isole Hawaii-Aleutine\",\"standard\":\"Ora standard delle Isole Hawaii-Aleutine\",\"daylight\":\"Ora legale delle Isole Hawaii-Aleutine\"}},\"Hong_Kong\":{\"long\":{\"generic\":\"Ora di Hong Kong\",\"standard\":\"Ora standard di Hong Kong\",\"daylight\":\"Ora legale di Hong Kong\"}},\"Hovd\":{\"long\":{\"generic\":\"Ora di Hovd\",\"standard\":\"Ora standard di Hovd\",\"daylight\":\"Ora legale di Hovd\"}},\"India\":{\"long\":{\"standard\":\"Ora standard dell’India\"}},\"Indian_Ocean\":{\"long\":{\"standard\":\"Ora dell’Oceano Indiano\"}},\"Indochina\":{\"long\":{\"standard\":\"Ora dell’Indocina\"}},\"Indonesia_Central\":{\"long\":{\"standard\":\"Ora dell’Indonesia centrale\"}},\"Indonesia_Eastern\":{\"long\":{\"standard\":\"Ora dell’Indonesia orientale\"}},\"Indonesia_Western\":{\"long\":{\"standard\":\"Ora dell’Indonesia occidentale\"}},\"Iran\":{\"long\":{\"generic\":\"Ora dell’Iran\",\"standard\":\"Ora standard dell’Iran\",\"daylight\":\"Ora legale dell’Iran\"}},\"Irkutsk\":{\"long\":{\"generic\":\"Ora di Irkutsk\",\"standard\":\"Ora standard di Irkutsk\",\"daylight\":\"Ora legale di Irkutsk\"}},\"Israel\":{\"long\":{\"generic\":\"Ora di Israele\",\"standard\":\"Ora standard di Israele\",\"daylight\":\"Ora legale di Israele\"}},\"Japan\":{\"long\":{\"generic\":\"Ora del Giappone\",\"standard\":\"Ora standard del Giappone\",\"daylight\":\"Ora legale del Giappone\"}},\"Kamchatka\":{\"long\":{\"generic\":\"Ora di Petropavlovsk-Kamchatski\",\"standard\":\"Ora standard di Petropavlovsk-Kamchatski\",\"daylight\":\"Ora legale di Petropavlovsk-Kamchatski\"}},\"Kazakhstan_Eastern\":{\"long\":{\"standard\":\"Ora del Kazakistan orientale\"}},\"Kazakhstan_Western\":{\"long\":{\"standard\":\"Ora del Kazakistan occidentale\"}},\"Korea\":{\"long\":{\"generic\":\"Ora coreana\",\"standard\":\"Ora standard coreana\",\"daylight\":\"Ora legale coreana\"}},\"Kosrae\":{\"long\":{\"standard\":\"Ora del Kosrae\"}},\"Krasnoyarsk\":{\"long\":{\"generic\":\"Ora di Krasnoyarsk\",\"standard\":\"Ora standard di Krasnoyarsk\",\"daylight\":\"Ora legale di Krasnoyarsk\"}},\"Kyrgystan\":{\"long\":{\"standard\":\"Ora del Kirghizistan\"}},\"Line_Islands\":{\"long\":{\"standard\":\"Ora delle Sporadi equatoriali\"}},\"Lord_Howe\":{\"long\":{\"generic\":\"Ora di Lord Howe\",\"standard\":\"Ora standard di Lord Howe\",\"daylight\":\"Ora legale di Lord Howe\"}},\"Macquarie\":{\"long\":{\"standard\":\"Ora dell’Isola Macquarie\"}},\"Magadan\":{\"long\":{\"generic\":\"Ora di Magadan\",\"standard\":\"Ora standard di Magadan\",\"daylight\":\"Ora legale di Magadan\"}},\"Malaysia\":{\"long\":{\"standard\":\"Ora della Malesia\"}},\"Maldives\":{\"long\":{\"standard\":\"Ora delle Maldive\"}},\"Marquesas\":{\"long\":{\"standard\":\"Ora delle Marchesi\"}},\"Marshall_Islands\":{\"long\":{\"standard\":\"Ora delle Isole Marshall\"}},\"Mauritius\":{\"long\":{\"generic\":\"Ora delle Mauritius\",\"standard\":\"Ora standard delle Mauritius\",\"daylight\":\"Ora legale delle Mauritius\"}},\"Mawson\":{\"long\":{\"standard\":\"Ora di Mawson\"}},\"Mexico_Northwest\":{\"long\":{\"generic\":\"Ora del Messico nord-occidentale\",\"standard\":\"Ora standard del Messico nord-occidentale\",\"daylight\":\"Ora legale del Messico nord-occidentale\"}},\"Mexico_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico (Messico)\",\"standard\":\"Ora standard del Pacifico (Messico)\",\"daylight\":\"Ora legale del Pacifico (Messico)\"}},\"Mongolia\":{\"long\":{\"generic\":\"Ora di Ulan Bator\",\"standard\":\"Ora standard di Ulan Bator\",\"daylight\":\"Ora legale di Ulan Bator\"}},\"Moscow\":{\"long\":{\"generic\":\"Ora di Mosca\",\"standard\":\"Ora standard di Mosca\",\"daylight\":\"Ora legale di Mosca\"}},\"Myanmar\":{\"long\":{\"standard\":\"Ora della Birmania\"}},\"Nauru\":{\"long\":{\"standard\":\"Ora di Nauru\"}},\"Nepal\":{\"long\":{\"standard\":\"Ora del Nepal\"}},\"New_Caledonia\":{\"long\":{\"generic\":\"Ora della Nuova Caledonia\",\"standard\":\"Ora standard della Nuova Caledonia\",\"daylight\":\"Ora legale della Nuova Caledonia\"}},\"New_Zealand\":{\"long\":{\"generic\":\"Ora della Nuova Zelanda\",\"standard\":\"Ora standard della Nuova Zelanda\",\"daylight\":\"Ora legale della Nuova Zelanda\"}},\"Newfoundland\":{\"long\":{\"generic\":\"Ora di Terranova\",\"standard\":\"Ora standard di Terranova\",\"daylight\":\"Ora legale di Terranova\"}},\"Niue\":{\"long\":{\"standard\":\"Ora di Niue\"}},\"Norfolk\":{\"long\":{\"standard\":\"Ora delle Isole Norfolk\"}},\"Noronha\":{\"long\":{\"generic\":\"Ora di Fernando de Noronha\",\"standard\":\"Ora standard di Fernando de Noronha\",\"daylight\":\"Ora legale di Fernando de Noronha\"}},\"Novosibirsk\":{\"long\":{\"generic\":\"Ora di Novosibirsk\",\"standard\":\"Ora standard di Novosibirsk\",\"daylight\":\"Ora legale di Novosibirsk\"}},\"Omsk\":{\"long\":{\"generic\":\"Ora di Omsk\",\"standard\":\"Ora standard di Omsk\",\"daylight\":\"Ora legale di Omsk\"}},\"Pakistan\":{\"long\":{\"generic\":\"Ora del Pakistan\",\"standard\":\"Ora standard del Pakistan\",\"daylight\":\"Ora legale del Pakistan\"}},\"Palau\":{\"long\":{\"standard\":\"Ora di Palau\"}},\"Papua_New_Guinea\":{\"long\":{\"standard\":\"Ora della Papua Nuova Guinea\"}},\"Paraguay\":{\"long\":{\"generic\":\"Ora del Paraguay\",\"standard\":\"Ora standard del Paraguay\",\"daylight\":\"Ora legale del Paraguay\"}},\"Peru\":{\"long\":{\"generic\":\"Ora del Perù\",\"standard\":\"Ora standard del Perù\",\"daylight\":\"Ora legale del Perù\"}},\"Philippines\":{\"long\":{\"generic\":\"Ora delle Filippine\",\"standard\":\"Ora standard delle Filippine\",\"daylight\":\"Ora legale delle Filippine\"}},\"Phoenix_Islands\":{\"long\":{\"standard\":\"Ora delle Isole della Fenice\"}},\"Pierre_Miquelon\":{\"long\":{\"generic\":\"Ora di Saint-Pierre e Miquelon\",\"standard\":\"Ora standard di Saint-Pierre e Miquelon\",\"daylight\":\"Ora legale di Saint-Pierre e Miquelon\"}},\"Pitcairn\":{\"long\":{\"standard\":\"Ora delle Pitcairn\"}},\"Ponape\":{\"long\":{\"standard\":\"Ora di Pohnpei\"}},\"Pyongyang\":{\"long\":{\"standard\":\"Ora di Pyongyang\"}},\"Reunion\":{\"long\":{\"standard\":\"Ora di Riunione\"}},\"Rothera\":{\"long\":{\"standard\":\"Ora di Rothera\"}},\"Sakhalin\":{\"long\":{\"generic\":\"Ora di Sakhalin\",\"standard\":\"Ora standard di Sakhalin\",\"daylight\":\"Ora legale di Sakhalin\"}},\"Samara\":{\"long\":{\"generic\":\"Ora di Samara\",\"standard\":\"Ora standard di Samara\",\"daylight\":\"Ora legale di Samara\"}},\"Samoa\":{\"long\":{\"generic\":\"Ora di Samoa\",\"standard\":\"Ora standard di Samoa\",\"daylight\":\"Ora legale di Samoa\"}},\"Seychelles\":{\"long\":{\"standard\":\"Ora delle Seychelles\"}},\"Singapore\":{\"long\":{\"standard\":\"Ora di Singapore\"}},\"Solomon\":{\"long\":{\"standard\":\"Ora delle Isole Salomone\"}},\"South_Georgia\":{\"long\":{\"standard\":\"Ora della Georgia del Sud\"}},\"Suriname\":{\"long\":{\"standard\":\"Ora del Suriname\"}},\"Syowa\":{\"long\":{\"standard\":\"Ora di Syowa\"}},\"Tahiti\":{\"long\":{\"standard\":\"Ora di Tahiti\"}},\"Taipei\":{\"long\":{\"generic\":\"Ora di Taipei\",\"standard\":\"Ora standard di Taipei\",\"daylight\":\"Ora legale di Taipei\"}},\"Tajikistan\":{\"long\":{\"standard\":\"Ora del Tagikistan\"}},\"Tokelau\":{\"long\":{\"standard\":\"Ora di Tokelau\"}},\"Tonga\":{\"long\":{\"generic\":\"Ora di Tonga\",\"standard\":\"Ora standard di Tonga\",\"daylight\":\"Ora legale di Tonga\"}},\"Truk\":{\"long\":{\"standard\":\"Ora del Chuuk\"}},\"Turkmenistan\":{\"long\":{\"generic\":\"Ora del Turkmenistan\",\"standard\":\"Ora standard del Turkmenistan\",\"daylight\":\"Ora legale del Turkmenistan\"}},\"Tuvalu\":{\"long\":{\"standard\":\"Ora di Tuvalu\"}},\"Uruguay\":{\"long\":{\"generic\":\"Ora dell’Uruguay\",\"standard\":\"Ora standard dell’Uruguay\",\"daylight\":\"Ora legale dell’Uruguay\"}},\"Uzbekistan\":{\"long\":{\"generic\":\"Ora dell’Uzbekistan\",\"standard\":\"Ora standard dell’Uzbekistan\",\"daylight\":\"Ora legale dell’Uzbekistan\"}},\"Vanuatu\":{\"long\":{\"generic\":\"Ora del Vanuatu\",\"standard\":\"Ora standard del Vanuatu\",\"daylight\":\"Ora legale del Vanuatu\"}},\"Venezuela\":{\"long\":{\"standard\":\"Ora del Venezuela\"}},\"Vladivostok\":{\"long\":{\"generic\":\"Ora di Vladivostok\",\"standard\":\"Ora standard di Vladivostok\",\"daylight\":\"Ora legale di Vladivostok\"}},\"Volgograd\":{\"long\":{\"generic\":\"Ora di Volgograd\",\"standard\":\"Ora standard di Volgograd\",\"daylight\":\"Ora legale di Volgograd\"}},\"Vostok\":{\"long\":{\"standard\":\"Ora di Vostok\"}},\"Wake\":{\"long\":{\"standard\":\"Ora dell’Isola di Wake\"}},\"Wallis\":{\"long\":{\"standard\":\"Ora di Wallis e Futuna\"}},\"Yakutsk\":{\"long\":{\"generic\":\"Ora di Yakutsk\",\"standard\":\"Ora standard di Yakutsk\",\"daylight\":\"Ora legale di Yakutsk\"}},\"Yekaterinburg\":{\"long\":{\"generic\":\"Ora di Ekaterinburg\",\"standard\":\"Ora standard di Ekaterinburg\",\"daylight\":\"Ora legale di Ekaterinburg\"}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it/ca-gregorian.json":
/*!**********************************************************!*\
  !*** ./node_modules/cldr-data/main/it/ca-gregorian.json ***!
  \**********************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\"},\"dates\":{\"calendars\":{\"gregorian\":{\"months\":{\"format\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"gen\",\"2\":\"feb\",\"3\":\"mar\",\"4\":\"apr\",\"5\":\"mag\",\"6\":\"giu\",\"7\":\"lug\",\"8\":\"ago\",\"9\":\"set\",\"10\":\"ott\",\"11\":\"nov\",\"12\":\"dic\"},\"narrow\":{\"1\":\"G\",\"2\":\"F\",\"3\":\"M\",\"4\":\"A\",\"5\":\"M\",\"6\":\"G\",\"7\":\"L\",\"8\":\"A\",\"9\":\"S\",\"10\":\"O\",\"11\":\"N\",\"12\":\"D\"},\"wide\":{\"1\":\"gennaio\",\"2\":\"febbraio\",\"3\":\"marzo\",\"4\":\"aprile\",\"5\":\"maggio\",\"6\":\"giugno\",\"7\":\"luglio\",\"8\":\"agosto\",\"9\":\"settembre\",\"10\":\"ottobre\",\"11\":\"novembre\",\"12\":\"dicembre\"}}},\"days\":{\"format\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}},\"stand-alone\":{\"abbreviated\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"narrow\":{\"sun\":\"D\",\"mon\":\"L\",\"tue\":\"M\",\"wed\":\"M\",\"thu\":\"G\",\"fri\":\"V\",\"sat\":\"S\"},\"short\":{\"sun\":\"dom\",\"mon\":\"lun\",\"tue\":\"mar\",\"wed\":\"mer\",\"thu\":\"gio\",\"fri\":\"ven\",\"sat\":\"sab\"},\"wide\":{\"sun\":\"domenica\",\"mon\":\"lunedì\",\"tue\":\"martedì\",\"wed\":\"mercoledì\",\"thu\":\"giovedì\",\"fri\":\"venerdì\",\"sat\":\"sabato\"}}},\"quarters\":{\"format\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}},\"stand-alone\":{\"abbreviated\":{\"1\":\"T1\",\"2\":\"T2\",\"3\":\"T3\",\"4\":\"T4\"},\"narrow\":{\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\"},\"wide\":{\"1\":\"1º trimestre\",\"2\":\"2º trimestre\",\"3\":\"3º trimestre\",\"4\":\"4º trimestre\"}}},\"dayPeriods\":{\"format\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"di mattina\",\"afternoon1\":\"di pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"di mattina\",\"afternoon1\":\"del pomeriggio\",\"evening1\":\"di sera\",\"night1\":\"di notte\"}},\"stand-alone\":{\"abbreviated\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"narrow\":{\"midnight\":\"mezzanotte\",\"am\":\"m.\",\"noon\":\"mezzogiorno\",\"pm\":\"p.\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"},\"wide\":{\"midnight\":\"mezzanotte\",\"am\":\"AM\",\"noon\":\"mezzogiorno\",\"pm\":\"PM\",\"morning1\":\"mattina\",\"afternoon1\":\"pomeriggio\",\"evening1\":\"sera\",\"night1\":\"notte\"}}},\"eras\":{\"eraNames\":{\"0\":\"avanti Cristo\",\"1\":\"dopo Cristo\",\"0-alt-variant\":\"avanti Era Volgare\",\"1-alt-variant\":\"Era Volgare\"},\"eraAbbr\":{\"0\":\"a.C.\",\"1\":\"d.C.\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"},\"eraNarrow\":{\"0\":\"aC\",\"1\":\"dC\",\"0-alt-variant\":\"a.E.V.\",\"1-alt-variant\":\"E.V.\"}},\"dateFormats\":{\"full\":\"EEEE d MMMM y\",\"long\":\"d MMMM y\",\"medium\":\"d MMM y\",\"short\":\"dd/MM/yy\"},\"timeFormats\":{\"full\":\"HH:mm:ss zzzz\",\"long\":\"HH:mm:ss z\",\"medium\":\"HH:mm:ss\",\"short\":\"HH:mm\"},\"dateTimeFormats\":{\"full\":\"{1} {0}\",\"long\":\"{1} {0}\",\"medium\":\"{1}, {0}\",\"short\":\"{1}, {0}\",\"availableFormats\":{\"Bh\":\"h B\",\"Bhm\":\"h:mm B\",\"Bhms\":\"h:mm:ss B\",\"d\":\"d\",\"E\":\"ccc\",\"EBhm\":\"E h:mm B\",\"EBhms\":\"E h:mm:ss B\",\"Ed\":\"E d\",\"Ehm\":\"E h:mm a\",\"EHm\":\"E HH:mm\",\"Ehms\":\"E h:mm:ss a\",\"EHms\":\"E HH:mm:ss\",\"Gy\":\"y G\",\"GyMMM\":\"MMM y G\",\"GyMMMd\":\"d MMM y G\",\"GyMMMEd\":\"E d MMM y G\",\"h\":\"h a\",\"H\":\"HH\",\"hm\":\"h:mm a\",\"Hm\":\"HH:mm\",\"hms\":\"h:mm:ss a\",\"Hms\":\"HH:mm:ss\",\"hmsv\":\"h:mm:ss a v\",\"Hmsv\":\"HH:mm:ss v\",\"hmv\":\"h:mm a v\",\"Hmv\":\"HH:mm v\",\"M\":\"L\",\"Md\":\"d/M\",\"MEd\":\"E d/M\",\"MMM\":\"LLL\",\"MMMd\":\"d MMM\",\"MMMEd\":\"E d MMM\",\"MMMMd\":\"d MMMM\",\"MMMMW-count-one\":\"'settimana' W 'di' MMMM\",\"MMMMW-count-other\":\"'settimana' W 'di' MMMM\",\"ms\":\"mm:ss\",\"y\":\"y\",\"yM\":\"M/y\",\"yMd\":\"d/M/y\",\"yMEd\":\"E d/M/y\",\"yMMM\":\"MMM y\",\"yMMMd\":\"d MMM y\",\"yMMMEd\":\"E d MMM y\",\"yMMMM\":\"MMMM y\",\"yQQQ\":\"QQQ y\",\"yQQQQ\":\"QQQQ y\",\"yw-count-one\":\"'settimana' w 'del' Y\",\"yw-count-other\":\"'settimana' w 'del' Y\"},\"appendItems\":{\"Day\":\"{0} ({2}: {1})\",\"Day-Of-Week\":\"{0} {1}\",\"Era\":\"{1} {0}\",\"Hour\":\"{0} ({2}: {1})\",\"Minute\":\"{0} ({2}: {1})\",\"Month\":\"{0} ({2}: {1})\",\"Quarter\":\"{0} ({2}: {1})\",\"Second\":\"{0} ({2}: {1})\",\"Timezone\":\"{0} {1}\",\"Week\":\"{0} ({2}: {1})\",\"Year\":\"{1} {0}\"},\"intervalFormats\":{\"intervalFormatFallback\":\"{0} - {1}\",\"Bh\":{\"B\":\"h B – h B\",\"h\":\"h–h B\"},\"Bhm\":{\"B\":\"h:mm B – h:mm B\",\"h\":\"h:mm–h:mm B\",\"m\":\"h:mm–h:mm B\"},\"d\":{\"d\":\"d–d\"},\"Gy\":{\"G\":\"y G – y G\",\"y\":\"y – y G\"},\"GyM\":{\"G\":\"M/y GGGGG – M/y GGGGG\",\"M\":\"M/y – M/y GGGGG\",\"y\":\"M/y – M/y GGGGG\"},\"GyMd\":{\"d\":\"d/M/y – d/M/y GGGGG\",\"G\":\"d/M/y GGGGG – d/M/y GGGGG\",\"M\":\"d/M/y – d/M/y GGGGG\",\"y\":\"d/M/y – d/M/y GGGGG\"},\"GyMEd\":{\"d\":\"E d/M/y – E d/M/y GGGGG\",\"G\":\"E d/M/y – E d/M/y GGGGG\",\"M\":\"E d/M/y – E d/M/y GGGGG\",\"y\":\"E d/M/y – E d/M/y GGGGG\"},\"GyMMM\":{\"G\":\"MMM y G – MMM y G\",\"M\":\"MMM – MMM y G\",\"y\":\"MMM y – MMM y G\"},\"GyMMMd\":{\"d\":\"d – d MMM y G\",\"G\":\"d MMM y G – d MMM y G\",\"M\":\"d MMM – d MMM y G\",\"y\":\"d MMM y – d MMM y G\"},\"GyMMMEd\":{\"d\":\"E d MMM – d E MMM y G\",\"G\":\"E d MMM y G – E d MMM y G\",\"M\":\"E d MMM – E d MMM y G\",\"y\":\"E d MMM y – E d MMM y G\"},\"h\":{\"a\":\"h a – h a\",\"h\":\"h–h a\"},\"H\":{\"H\":\"HH–HH\"},\"hm\":{\"a\":\"h:mm a – h:mm a\",\"h\":\"h:mm–h:mm a\",\"m\":\"h:mm–h:mm a\"},\"Hm\":{\"H\":\"HH:mm–HH:mm\",\"m\":\"HH:mm–HH:mm\"},\"hmv\":{\"a\":\"h:mm a – h:mm a v\",\"h\":\"h:mm–h:mm a v\",\"m\":\"h:mm–h:mm a v\"},\"Hmv\":{\"H\":\"HH:mm–HH:mm v\",\"m\":\"HH:mm–HH:mm v\"},\"hv\":{\"a\":\"h a – h a v\",\"h\":\"h–h a v\"},\"Hv\":{\"H\":\"HH–HH v\"},\"M\":{\"M\":\"M–M\"},\"Md\":{\"d\":\"dd/MM – dd/MM\",\"M\":\"dd/MM – dd/MM\"},\"MEd\":{\"d\":\"E dd/MM – E dd/MM\",\"M\":\"E dd/MM – E dd/MM\"},\"MMM\":{\"M\":\"MMM–MMM\"},\"MMMd\":{\"d\":\"dd–dd MMM\",\"M\":\"dd MMM – dd MMM\"},\"MMMEd\":{\"d\":\"E dd – E dd MMM\",\"M\":\"E dd MMM – E dd MMM\"},\"y\":{\"y\":\"y–y\"},\"yM\":{\"M\":\"MM/y – MM/y\",\"y\":\"MM/y – MM/y\"},\"yMd\":{\"d\":\"dd/MM/y – dd/MM/y\",\"M\":\"dd/MM/y – dd/MM/y\",\"y\":\"dd/MM/y – dd/MM/y\"},\"yMEd\":{\"d\":\"E dd/MM/y – E dd/MM/y\",\"M\":\"E dd/MM/y – E dd/MM/y\",\"y\":\"E dd/MM/y – E dd/MM/y\"},\"yMMM\":{\"M\":\"MMM–MMM y\",\"y\":\"MMM y – MMM y\"},\"yMMMd\":{\"d\":\"dd–dd MMM y\",\"M\":\"dd MMM – dd MMM y\",\"y\":\"dd MMM y – dd MMM y\"},\"yMMMEd\":{\"d\":\"E d – E d MMM y\",\"M\":\"E d MMM – E d MMM y\",\"y\":\"E d MMM y – E d MMM y\"},\"yMMMM\":{\"M\":\"MMMM–MMMM y\",\"y\":\"MMMM y – MMMM y\"}}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/main/it/timeZoneNames.json":
/*!***********************************************************!*\
  !*** ./node_modules/cldr-data/main/it/timeZoneNames.json ***!
  \***********************************************************/
/*! exports provided: main, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":{\"it\":{\"identity\":{\"version\":{\"_cldrVersion\":\"36\"},\"language\":\"it\"},\"dates\":{\"timeZoneNames\":{\"hourFormat\":\"+HH:mm;-HH:mm\",\"gmtFormat\":\"GMT{0}\",\"gmtZeroFormat\":\"GMT\",\"regionFormat\":\"Ora {0}\",\"regionFormat-type-daylight\":\"Ora legale: {0}\",\"regionFormat-type-standard\":\"Ora standard: {0}\",\"fallbackFormat\":\"{1} ({0})\",\"zone\":{\"America\":{\"Adak\":{\"exemplarCity\":\"Adak\"},\"Anchorage\":{\"exemplarCity\":\"Anchorage\"},\"Anguilla\":{\"exemplarCity\":\"Anguilla\"},\"Antigua\":{\"exemplarCity\":\"Antigua\"},\"Araguaina\":{\"exemplarCity\":\"Araguaina\"},\"Argentina\":{\"Rio_Gallegos\":{\"exemplarCity\":\"Rio Gallegos\"},\"San_Juan\":{\"exemplarCity\":\"San Juan\"},\"Ushuaia\":{\"exemplarCity\":\"Ushuaia\"},\"La_Rioja\":{\"exemplarCity\":\"La Rioja\"},\"San_Luis\":{\"exemplarCity\":\"San Luis\"},\"Salta\":{\"exemplarCity\":\"Salta\"},\"Tucuman\":{\"exemplarCity\":\"Tucumán\"}},\"Aruba\":{\"exemplarCity\":\"Aruba\"},\"Asuncion\":{\"exemplarCity\":\"Asunción\"},\"Bahia\":{\"exemplarCity\":\"Bahia\"},\"Bahia_Banderas\":{\"exemplarCity\":\"Bahía de Banderas\"},\"Barbados\":{\"exemplarCity\":\"Barbados\"},\"Belem\":{\"exemplarCity\":\"Belem\"},\"Belize\":{\"exemplarCity\":\"Belize\"},\"Blanc-Sablon\":{\"exemplarCity\":\"Blanc-Sablon\"},\"Boa_Vista\":{\"exemplarCity\":\"Boa Vista\"},\"Bogota\":{\"exemplarCity\":\"Bogotá\"},\"Boise\":{\"exemplarCity\":\"Boise\"},\"Buenos_Aires\":{\"exemplarCity\":\"Buenos Aires\"},\"Cambridge_Bay\":{\"exemplarCity\":\"Cambridge Bay\"},\"Campo_Grande\":{\"exemplarCity\":\"Campo Grande\"},\"Cancun\":{\"exemplarCity\":\"Cancún\"},\"Caracas\":{\"exemplarCity\":\"Caracas\"},\"Catamarca\":{\"exemplarCity\":\"Catamarca\"},\"Cayenne\":{\"exemplarCity\":\"Caienna\"},\"Cayman\":{\"exemplarCity\":\"Cayman\"},\"Chicago\":{\"exemplarCity\":\"Chicago\"},\"Chihuahua\":{\"exemplarCity\":\"Chihuahua\"},\"Coral_Harbour\":{\"exemplarCity\":\"Atikokan\"},\"Cordoba\":{\"exemplarCity\":\"Cordoba\"},\"Costa_Rica\":{\"exemplarCity\":\"Costa Rica\"},\"Creston\":{\"exemplarCity\":\"Creston\"},\"Cuiaba\":{\"exemplarCity\":\"Cuiaba\"},\"Curacao\":{\"exemplarCity\":\"Curaçao\"},\"Danmarkshavn\":{\"exemplarCity\":\"Danmarkshavn\"},\"Dawson\":{\"exemplarCity\":\"Dawson\"},\"Dawson_Creek\":{\"exemplarCity\":\"Dawson Creek\"},\"Denver\":{\"exemplarCity\":\"Denver\"},\"Detroit\":{\"exemplarCity\":\"Detroit\"},\"Dominica\":{\"exemplarCity\":\"Dominica\"},\"Edmonton\":{\"exemplarCity\":\"Edmonton\"},\"Eirunepe\":{\"exemplarCity\":\"Eirunepe\"},\"El_Salvador\":{\"exemplarCity\":\"El Salvador\"},\"Fort_Nelson\":{\"exemplarCity\":\"Fort Nelson\"},\"Fortaleza\":{\"exemplarCity\":\"Fortaleza\"},\"Glace_Bay\":{\"exemplarCity\":\"Glace Bay\"},\"Godthab\":{\"exemplarCity\":\"Nuuk\"},\"Goose_Bay\":{\"exemplarCity\":\"Goose Bay\"},\"Grand_Turk\":{\"exemplarCity\":\"Grand Turk\"},\"Grenada\":{\"exemplarCity\":\"Grenada\"},\"Guadeloupe\":{\"exemplarCity\":\"Guadalupa\"},\"Guatemala\":{\"exemplarCity\":\"Guatemala\"},\"Guayaquil\":{\"exemplarCity\":\"Guayaquil\"},\"Guyana\":{\"exemplarCity\":\"Guyana\"},\"Halifax\":{\"exemplarCity\":\"Halifax\"},\"Havana\":{\"exemplarCity\":\"L’Avana\"},\"Hermosillo\":{\"exemplarCity\":\"Hermosillo\"},\"Indiana\":{\"Vincennes\":{\"exemplarCity\":\"Vincennes, Indiana\"},\"Petersburg\":{\"exemplarCity\":\"Petersburg, Indiana\"},\"Tell_City\":{\"exemplarCity\":\"Tell City, Indiana\"},\"Knox\":{\"exemplarCity\":\"Knox, Indiana\"},\"Winamac\":{\"exemplarCity\":\"Winamac, Indiana\"},\"Marengo\":{\"exemplarCity\":\"Marengo, Indiana\"},\"Vevay\":{\"exemplarCity\":\"Vevay, Indiana\"}},\"Indianapolis\":{\"exemplarCity\":\"Indianapolis\"},\"Inuvik\":{\"exemplarCity\":\"Inuvik\"},\"Iqaluit\":{\"exemplarCity\":\"Iqaluit\"},\"Jamaica\":{\"exemplarCity\":\"Giamaica\"},\"Jujuy\":{\"exemplarCity\":\"Jujuy\"},\"Juneau\":{\"exemplarCity\":\"Juneau\"},\"Kentucky\":{\"Monticello\":{\"exemplarCity\":\"Monticello, Kentucky\"}},\"Kralendijk\":{\"exemplarCity\":\"Kralendijk\"},\"La_Paz\":{\"exemplarCity\":\"La Paz\"},\"Lima\":{\"exemplarCity\":\"Lima\"},\"Los_Angeles\":{\"exemplarCity\":\"Los Angeles\"},\"Louisville\":{\"exemplarCity\":\"Louisville\"},\"Lower_Princes\":{\"exemplarCity\":\"Lower Prince’s Quarter\"},\"Maceio\":{\"exemplarCity\":\"Maceio\"},\"Managua\":{\"exemplarCity\":\"Managua\"},\"Manaus\":{\"exemplarCity\":\"Manaus\"},\"Marigot\":{\"exemplarCity\":\"Marigot\"},\"Martinique\":{\"exemplarCity\":\"Martinica\"},\"Matamoros\":{\"exemplarCity\":\"Matamoros\"},\"Mazatlan\":{\"exemplarCity\":\"Mazatlan\"},\"Mendoza\":{\"exemplarCity\":\"Mendoza\"},\"Menominee\":{\"exemplarCity\":\"Menominee\"},\"Merida\":{\"exemplarCity\":\"Mérida\"},\"Metlakatla\":{\"exemplarCity\":\"Metlakatla\"},\"Mexico_City\":{\"exemplarCity\":\"Città del Messico\"},\"Miquelon\":{\"exemplarCity\":\"Miquelon\"},\"Moncton\":{\"exemplarCity\":\"Moncton\"},\"Monterrey\":{\"exemplarCity\":\"Monterrey\"},\"Montevideo\":{\"exemplarCity\":\"Montevideo\"},\"Montserrat\":{\"exemplarCity\":\"Montserrat\"},\"Nassau\":{\"exemplarCity\":\"Nassau\"},\"New_York\":{\"exemplarCity\":\"New York\"},\"Nipigon\":{\"exemplarCity\":\"Nipigon\"},\"Nome\":{\"exemplarCity\":\"Nome\"},\"Noronha\":{\"exemplarCity\":\"Noronha\"},\"North_Dakota\":{\"Beulah\":{\"exemplarCity\":\"Beulah, Dakota del nord\"},\"New_Salem\":{\"exemplarCity\":\"New Salem, Dakota del nord\"},\"Center\":{\"exemplarCity\":\"Center, Dakota del nord\"}},\"Ojinaga\":{\"exemplarCity\":\"Ojinaga\"},\"Panama\":{\"exemplarCity\":\"Panamá\"},\"Pangnirtung\":{\"exemplarCity\":\"Pangnirtung\"},\"Paramaribo\":{\"exemplarCity\":\"Paramaribo\"},\"Phoenix\":{\"exemplarCity\":\"Phoenix\"},\"Port-au-Prince\":{\"exemplarCity\":\"Port-au-Prince\"},\"Port_of_Spain\":{\"exemplarCity\":\"Port of Spain\"},\"Porto_Velho\":{\"exemplarCity\":\"Porto Velho\"},\"Puerto_Rico\":{\"exemplarCity\":\"Portorico\"},\"Punta_Arenas\":{\"exemplarCity\":\"Punta Arenas\"},\"Rainy_River\":{\"exemplarCity\":\"Rainy River\"},\"Rankin_Inlet\":{\"exemplarCity\":\"Rankin Inlet\"},\"Recife\":{\"exemplarCity\":\"Recife\"},\"Regina\":{\"exemplarCity\":\"Regina\"},\"Resolute\":{\"exemplarCity\":\"Resolute\"},\"Rio_Branco\":{\"exemplarCity\":\"Rio Branco\"},\"Santa_Isabel\":{\"exemplarCity\":\"Santa Isabel\"},\"Santarem\":{\"exemplarCity\":\"Santarém\"},\"Santiago\":{\"exemplarCity\":\"Santiago\"},\"Santo_Domingo\":{\"exemplarCity\":\"Santo Domingo\"},\"Sao_Paulo\":{\"exemplarCity\":\"San Paolo\"},\"Scoresbysund\":{\"exemplarCity\":\"Ittoqqortoormiit\"},\"Sitka\":{\"exemplarCity\":\"Sitka\"},\"St_Barthelemy\":{\"exemplarCity\":\"Saint-Barthélemy\"},\"St_Johns\":{\"exemplarCity\":\"St. John’s\"},\"St_Kitts\":{\"exemplarCity\":\"St. Kitts\"},\"St_Lucia\":{\"exemplarCity\":\"Santa Lucia\"},\"St_Thomas\":{\"exemplarCity\":\"Saint Thomas\"},\"St_Vincent\":{\"exemplarCity\":\"Saint Vincent\"},\"Swift_Current\":{\"exemplarCity\":\"Swift Current\"},\"Tegucigalpa\":{\"exemplarCity\":\"Tegucigalpa\"},\"Thule\":{\"exemplarCity\":\"Thule\"},\"Thunder_Bay\":{\"exemplarCity\":\"Thunder Bay\"},\"Tijuana\":{\"exemplarCity\":\"Tijuana\"},\"Toronto\":{\"exemplarCity\":\"Toronto\"},\"Tortola\":{\"exemplarCity\":\"Tortola\"},\"Vancouver\":{\"exemplarCity\":\"Vancouver\"},\"Whitehorse\":{\"exemplarCity\":\"Whitehorse\"},\"Winnipeg\":{\"exemplarCity\":\"Winnipeg\"},\"Yakutat\":{\"exemplarCity\":\"Yakutat\"},\"Yellowknife\":{\"exemplarCity\":\"Yellowknife\"}},\"Atlantic\":{\"Azores\":{\"exemplarCity\":\"Azzorre\"},\"Bermuda\":{\"exemplarCity\":\"Bermuda\"},\"Canary\":{\"exemplarCity\":\"Canarie\"},\"Cape_Verde\":{\"exemplarCity\":\"Capo Verde\"},\"Faeroe\":{\"exemplarCity\":\"Isole Fær Øer\"},\"Madeira\":{\"exemplarCity\":\"Madeira\"},\"Reykjavik\":{\"exemplarCity\":\"Reykjavík\"},\"South_Georgia\":{\"exemplarCity\":\"Georgia del Sud\"},\"St_Helena\":{\"exemplarCity\":\"Sant’Elena\"},\"Stanley\":{\"exemplarCity\":\"Stanley\"}},\"Europe\":{\"Amsterdam\":{\"exemplarCity\":\"Amsterdam\"},\"Andorra\":{\"exemplarCity\":\"Andorra\"},\"Astrakhan\":{\"exemplarCity\":\"Astrakhan\"},\"Athens\":{\"exemplarCity\":\"Atene\"},\"Belgrade\":{\"exemplarCity\":\"Belgrado\"},\"Berlin\":{\"exemplarCity\":\"Berlino\"},\"Bratislava\":{\"exemplarCity\":\"Bratislava\"},\"Brussels\":{\"exemplarCity\":\"Bruxelles\"},\"Bucharest\":{\"exemplarCity\":\"Bucarest\"},\"Budapest\":{\"exemplarCity\":\"Budapest\"},\"Busingen\":{\"exemplarCity\":\"Büsingen\"},\"Chisinau\":{\"exemplarCity\":\"Chisinau\"},\"Copenhagen\":{\"exemplarCity\":\"Copenaghen\"},\"Dublin\":{\"long\":{\"daylight\":\"Ora legale dell’Irlanda\"},\"exemplarCity\":\"Dublino\"},\"Gibraltar\":{\"exemplarCity\":\"Gibilterra\"},\"Guernsey\":{\"exemplarCity\":\"Guernsey\"},\"Helsinki\":{\"exemplarCity\":\"Helsinki\"},\"Isle_of_Man\":{\"exemplarCity\":\"Isola di Man\"},\"Istanbul\":{\"exemplarCity\":\"Istanbul\"},\"Jersey\":{\"exemplarCity\":\"Jersey\"},\"Kaliningrad\":{\"exemplarCity\":\"Kaliningrad\"},\"Kiev\":{\"exemplarCity\":\"Kiev\"},\"Kirov\":{\"exemplarCity\":\"Kirov\"},\"Lisbon\":{\"exemplarCity\":\"Lisbona\"},\"Ljubljana\":{\"exemplarCity\":\"Lubiana\"},\"London\":{\"long\":{\"daylight\":\"Ora legale del Regno Unito\"},\"exemplarCity\":\"Londra\"},\"Luxembourg\":{\"exemplarCity\":\"Lussemburgo\"},\"Madrid\":{\"exemplarCity\":\"Madrid\"},\"Malta\":{\"exemplarCity\":\"Malta\"},\"Mariehamn\":{\"exemplarCity\":\"Mariehamn\"},\"Minsk\":{\"exemplarCity\":\"Minsk\"},\"Monaco\":{\"exemplarCity\":\"Monaco\"},\"Moscow\":{\"exemplarCity\":\"Mosca\"},\"Oslo\":{\"exemplarCity\":\"Oslo\"},\"Paris\":{\"exemplarCity\":\"Parigi\"},\"Podgorica\":{\"exemplarCity\":\"Podgorica\"},\"Prague\":{\"exemplarCity\":\"Praga\"},\"Riga\":{\"exemplarCity\":\"Riga\"},\"Rome\":{\"exemplarCity\":\"Roma\"},\"Samara\":{\"exemplarCity\":\"Samara\"},\"San_Marino\":{\"exemplarCity\":\"San Marino\"},\"Sarajevo\":{\"exemplarCity\":\"Sarajevo\"},\"Saratov\":{\"exemplarCity\":\"Saratov\"},\"Simferopol\":{\"exemplarCity\":\"Sinferopoli\"},\"Skopje\":{\"exemplarCity\":\"Skopje\"},\"Sofia\":{\"exemplarCity\":\"Sofia\"},\"Stockholm\":{\"exemplarCity\":\"Stoccolma\"},\"Tallinn\":{\"exemplarCity\":\"Tallinn\"},\"Tirane\":{\"exemplarCity\":\"Tirana\"},\"Ulyanovsk\":{\"exemplarCity\":\"Ulyanovsk\"},\"Uzhgorod\":{\"exemplarCity\":\"Užhorod\"},\"Vaduz\":{\"exemplarCity\":\"Vaduz\"},\"Vatican\":{\"exemplarCity\":\"Città del Vaticano\"},\"Vienna\":{\"exemplarCity\":\"Vienna\"},\"Vilnius\":{\"exemplarCity\":\"Vilnius\"},\"Volgograd\":{\"exemplarCity\":\"Volgograd\"},\"Warsaw\":{\"exemplarCity\":\"Varsavia\"},\"Zagreb\":{\"exemplarCity\":\"Zagabria\"},\"Zaporozhye\":{\"exemplarCity\":\"Zaporozhye\"},\"Zurich\":{\"exemplarCity\":\"Zurigo\"}},\"Africa\":{\"Abidjan\":{\"exemplarCity\":\"Abidjan\"},\"Accra\":{\"exemplarCity\":\"Accra\"},\"Addis_Ababa\":{\"exemplarCity\":\"Addis Abeba\"},\"Algiers\":{\"exemplarCity\":\"Algeri\"},\"Asmera\":{\"exemplarCity\":\"Asmara\"},\"Bamako\":{\"exemplarCity\":\"Bamako\"},\"Bangui\":{\"exemplarCity\":\"Bangui\"},\"Banjul\":{\"exemplarCity\":\"Banjul\"},\"Bissau\":{\"exemplarCity\":\"Bissau\"},\"Blantyre\":{\"exemplarCity\":\"Blantyre\"},\"Brazzaville\":{\"exemplarCity\":\"Brazzaville\"},\"Bujumbura\":{\"exemplarCity\":\"Bujumbura\"},\"Cairo\":{\"exemplarCity\":\"Il Cairo\"},\"Casablanca\":{\"exemplarCity\":\"Casablanca\"},\"Ceuta\":{\"exemplarCity\":\"Ceuta\"},\"Conakry\":{\"exemplarCity\":\"Conakry\"},\"Dakar\":{\"exemplarCity\":\"Dakar\"},\"Dar_es_Salaam\":{\"exemplarCity\":\"Dar es Salaam\"},\"Djibouti\":{\"exemplarCity\":\"Gibuti\"},\"Douala\":{\"exemplarCity\":\"Douala\"},\"El_Aaiun\":{\"exemplarCity\":\"El Ayun\"},\"Freetown\":{\"exemplarCity\":\"Freetown\"},\"Gaborone\":{\"exemplarCity\":\"Gaborone\"},\"Harare\":{\"exemplarCity\":\"Harare\"},\"Johannesburg\":{\"exemplarCity\":\"Johannesburg\"},\"Juba\":{\"exemplarCity\":\"Giuba\"},\"Kampala\":{\"exemplarCity\":\"Kampala\"},\"Khartoum\":{\"exemplarCity\":\"Khartum\"},\"Kigali\":{\"exemplarCity\":\"Kigali\"},\"Kinshasa\":{\"exemplarCity\":\"Kinshasa\"},\"Lagos\":{\"exemplarCity\":\"Lagos\"},\"Libreville\":{\"exemplarCity\":\"Libreville\"},\"Lome\":{\"exemplarCity\":\"Lomé\"},\"Luanda\":{\"exemplarCity\":\"Luanda\"},\"Lubumbashi\":{\"exemplarCity\":\"Lubumbashi\"},\"Lusaka\":{\"exemplarCity\":\"Lusaka\"},\"Malabo\":{\"exemplarCity\":\"Malabo\"},\"Maputo\":{\"exemplarCity\":\"Maputo\"},\"Maseru\":{\"exemplarCity\":\"Maseru\"},\"Mbabane\":{\"exemplarCity\":\"Mbabane\"},\"Mogadishu\":{\"exemplarCity\":\"Mogadiscio\"},\"Monrovia\":{\"exemplarCity\":\"Monrovia\"},\"Nairobi\":{\"exemplarCity\":\"Nairobi\"},\"Ndjamena\":{\"exemplarCity\":\"N’Djamena\"},\"Niamey\":{\"exemplarCity\":\"Niamey\"},\"Nouakchott\":{\"exemplarCity\":\"Nouakchott\"},\"Ouagadougou\":{\"exemplarCity\":\"Ouagadougou\"},\"Porto-Novo\":{\"exemplarCity\":\"Porto-Novo\"},\"Sao_Tome\":{\"exemplarCity\":\"São Tomé\"},\"Tripoli\":{\"exemplarCity\":\"Tripoli\"},\"Tunis\":{\"exemplarCity\":\"Tunisi\"},\"Windhoek\":{\"exemplarCity\":\"Windhoek\"}},\"Asia\":{\"Aden\":{\"exemplarCity\":\"Aden\"},\"Almaty\":{\"exemplarCity\":\"Almaty\"},\"Amman\":{\"exemplarCity\":\"Amman\"},\"Anadyr\":{\"exemplarCity\":\"Anadyr’\"},\"Aqtau\":{\"exemplarCity\":\"Aqtau\"},\"Aqtobe\":{\"exemplarCity\":\"Aqtöbe\"},\"Ashgabat\":{\"exemplarCity\":\"Ashgabat\"},\"Atyrau\":{\"exemplarCity\":\"Atyrau\"},\"Baghdad\":{\"exemplarCity\":\"Baghdad\"},\"Bahrain\":{\"exemplarCity\":\"Bahrein\"},\"Baku\":{\"exemplarCity\":\"Baku\"},\"Bangkok\":{\"exemplarCity\":\"Bangkok\"},\"Barnaul\":{\"exemplarCity\":\"Barnaul\"},\"Beirut\":{\"exemplarCity\":\"Beirut\"},\"Bishkek\":{\"exemplarCity\":\"Bishkek\"},\"Brunei\":{\"exemplarCity\":\"Brunei\"},\"Calcutta\":{\"exemplarCity\":\"Calcutta\"},\"Chita\":{\"exemplarCity\":\"Čita\"},\"Choibalsan\":{\"exemplarCity\":\"Choibalsan\"},\"Colombo\":{\"exemplarCity\":\"Colombo\"},\"Damascus\":{\"exemplarCity\":\"Damasco\"},\"Dhaka\":{\"exemplarCity\":\"Dacca\"},\"Dili\":{\"exemplarCity\":\"Dili\"},\"Dubai\":{\"exemplarCity\":\"Dubai\"},\"Dushanbe\":{\"exemplarCity\":\"Dushanbe\"},\"Famagusta\":{\"exemplarCity\":\"Famagosta\"},\"Gaza\":{\"exemplarCity\":\"Gaza\"},\"Hebron\":{\"exemplarCity\":\"Hebron\"},\"Hong_Kong\":{\"exemplarCity\":\"Hong Kong\"},\"Hovd\":{\"exemplarCity\":\"Hovd\"},\"Irkutsk\":{\"exemplarCity\":\"Irkutsk\"},\"Jakarta\":{\"exemplarCity\":\"Giacarta\"},\"Jayapura\":{\"exemplarCity\":\"Jayapura\"},\"Jerusalem\":{\"exemplarCity\":\"Gerusalemme\"},\"Kabul\":{\"exemplarCity\":\"Kabul\"},\"Kamchatka\":{\"exemplarCity\":\"Kamchatka\"},\"Karachi\":{\"exemplarCity\":\"Karachi\"},\"Katmandu\":{\"exemplarCity\":\"Kathmandu\"},\"Khandyga\":{\"exemplarCity\":\"Chandyga\"},\"Krasnoyarsk\":{\"exemplarCity\":\"Krasnojarsk\"},\"Kuala_Lumpur\":{\"exemplarCity\":\"Kuala Lumpur\"},\"Kuching\":{\"exemplarCity\":\"Kuching\"},\"Kuwait\":{\"exemplarCity\":\"Kuwait\"},\"Macau\":{\"exemplarCity\":\"Macao\"},\"Magadan\":{\"exemplarCity\":\"Magadan\"},\"Makassar\":{\"exemplarCity\":\"Makassar\"},\"Manila\":{\"exemplarCity\":\"Manila\"},\"Muscat\":{\"exemplarCity\":\"Mascate\"},\"Nicosia\":{\"exemplarCity\":\"Nicosia\"},\"Novokuznetsk\":{\"exemplarCity\":\"Novokuzneck\"},\"Novosibirsk\":{\"exemplarCity\":\"Novosibirsk\"},\"Omsk\":{\"exemplarCity\":\"Omsk\"},\"Oral\":{\"exemplarCity\":\"Oral\"},\"Phnom_Penh\":{\"exemplarCity\":\"Phnom Penh\"},\"Pontianak\":{\"exemplarCity\":\"Pontianak\"},\"Pyongyang\":{\"exemplarCity\":\"Pyongyang\"},\"Qatar\":{\"exemplarCity\":\"Qatar\"},\"Qostanay\":{\"exemplarCity\":\"Qostanay\"},\"Qyzylorda\":{\"exemplarCity\":\"Qyzylorda\"},\"Rangoon\":{\"exemplarCity\":\"Rangoon\"},\"Riyadh\":{\"exemplarCity\":\"Riyad\"},\"Saigon\":{\"exemplarCity\":\"Ho Chi Minh\"},\"Sakhalin\":{\"exemplarCity\":\"Sachalin\"},\"Samarkand\":{\"exemplarCity\":\"Samarcanda\"},\"Seoul\":{\"exemplarCity\":\"Seul\"},\"Shanghai\":{\"exemplarCity\":\"Shanghai\"},\"Singapore\":{\"exemplarCity\":\"Singapore\"},\"Srednekolymsk\":{\"exemplarCity\":\"Srednekolymsk\"},\"Taipei\":{\"exemplarCity\":\"Taipei\"},\"Tashkent\":{\"exemplarCity\":\"Tashkent\"},\"Tbilisi\":{\"exemplarCity\":\"Tbilisi\"},\"Tehran\":{\"exemplarCity\":\"Teheran\"},\"Thimphu\":{\"exemplarCity\":\"Thimphu\"},\"Tokyo\":{\"exemplarCity\":\"Tokyo\"},\"Tomsk\":{\"exemplarCity\":\"Tomsk\"},\"Ulaanbaatar\":{\"exemplarCity\":\"Ulaanbaatar\"},\"Urumqi\":{\"exemplarCity\":\"Urumqi\"},\"Ust-Nera\":{\"exemplarCity\":\"Ust’-Nera\"},\"Vientiane\":{\"exemplarCity\":\"Vientiane\"},\"Vladivostok\":{\"exemplarCity\":\"Vladivostok\"},\"Yakutsk\":{\"exemplarCity\":\"Jakutsk\"},\"Yekaterinburg\":{\"exemplarCity\":\"Ekaterinburg\"},\"Yerevan\":{\"exemplarCity\":\"Yerevan\"}},\"Indian\":{\"Antananarivo\":{\"exemplarCity\":\"Antananarivo\"},\"Chagos\":{\"exemplarCity\":\"Chagos\"},\"Christmas\":{\"exemplarCity\":\"Natale\"},\"Cocos\":{\"exemplarCity\":\"Cocos\"},\"Comoro\":{\"exemplarCity\":\"Comore\"},\"Kerguelen\":{\"exemplarCity\":\"Kerguelen\"},\"Mahe\":{\"exemplarCity\":\"Mahe\"},\"Maldives\":{\"exemplarCity\":\"Maldive\"},\"Mauritius\":{\"exemplarCity\":\"Mauritius\"},\"Mayotte\":{\"exemplarCity\":\"Mayotte\"},\"Reunion\":{\"exemplarCity\":\"La Riunione\"}},\"Australia\":{\"Adelaide\":{\"exemplarCity\":\"Adelaide\"},\"Brisbane\":{\"exemplarCity\":\"Brisbane\"},\"Broken_Hill\":{\"exemplarCity\":\"Broken Hill\"},\"Currie\":{\"exemplarCity\":\"Currie\"},\"Darwin\":{\"exemplarCity\":\"Darwin\"},\"Eucla\":{\"exemplarCity\":\"Eucla\"},\"Hobart\":{\"exemplarCity\":\"Hobart\"},\"Lindeman\":{\"exemplarCity\":\"Lindeman\"},\"Lord_Howe\":{\"exemplarCity\":\"Lord Howe\"},\"Melbourne\":{\"exemplarCity\":\"Melbourne\"},\"Perth\":{\"exemplarCity\":\"Perth\"},\"Sydney\":{\"exemplarCity\":\"Sydney\"}},\"Pacific\":{\"Apia\":{\"exemplarCity\":\"Apia\"},\"Auckland\":{\"exemplarCity\":\"Auckland\"},\"Bougainville\":{\"exemplarCity\":\"Bougainville\"},\"Chatham\":{\"exemplarCity\":\"Chatham\"},\"Easter\":{\"exemplarCity\":\"Pasqua\"},\"Efate\":{\"exemplarCity\":\"Efate\"},\"Enderbury\":{\"exemplarCity\":\"Enderbury\"},\"Fakaofo\":{\"exemplarCity\":\"Fakaofo\"},\"Fiji\":{\"exemplarCity\":\"Figi\"},\"Funafuti\":{\"exemplarCity\":\"Funafuti\"},\"Galapagos\":{\"exemplarCity\":\"Galapagos\"},\"Gambier\":{\"exemplarCity\":\"Gambier\"},\"Guadalcanal\":{\"exemplarCity\":\"Guadalcanal\"},\"Guam\":{\"exemplarCity\":\"Guam\"},\"Honolulu\":{\"exemplarCity\":\"Honolulu\"},\"Johnston\":{\"exemplarCity\":\"Johnston\"},\"Kiritimati\":{\"exemplarCity\":\"Kiritimati\"},\"Kosrae\":{\"exemplarCity\":\"Kosrae\"},\"Kwajalein\":{\"exemplarCity\":\"Kwajalein\"},\"Majuro\":{\"exemplarCity\":\"Majuro\"},\"Marquesas\":{\"exemplarCity\":\"Marchesi\"},\"Midway\":{\"exemplarCity\":\"Midway\"},\"Nauru\":{\"exemplarCity\":\"Nauru\"},\"Niue\":{\"exemplarCity\":\"Niue\"},\"Norfolk\":{\"exemplarCity\":\"Norfolk\"},\"Noumea\":{\"exemplarCity\":\"Noumea\"},\"Pago_Pago\":{\"exemplarCity\":\"Pago Pago\"},\"Palau\":{\"exemplarCity\":\"Palau\"},\"Pitcairn\":{\"exemplarCity\":\"Pitcairn\"},\"Ponape\":{\"exemplarCity\":\"Pohnpei\"},\"Port_Moresby\":{\"exemplarCity\":\"Port Moresby\"},\"Rarotonga\":{\"exemplarCity\":\"Rarotonga\"},\"Saipan\":{\"exemplarCity\":\"Saipan\"},\"Tahiti\":{\"exemplarCity\":\"Tahiti\"},\"Tarawa\":{\"exemplarCity\":\"Tarawa\"},\"Tongatapu\":{\"exemplarCity\":\"Tongatapu\"},\"Truk\":{\"exemplarCity\":\"Chuuk\"},\"Wake\":{\"exemplarCity\":\"Wake\"},\"Wallis\":{\"exemplarCity\":\"Wallis\"}},\"Arctic\":{\"Longyearbyen\":{\"exemplarCity\":\"Longyearbyen\"}},\"Antarctica\":{\"Casey\":{\"exemplarCity\":\"Casey\"},\"Davis\":{\"exemplarCity\":\"Davis\"},\"DumontDUrville\":{\"exemplarCity\":\"Dumont d’Urville\"},\"Macquarie\":{\"exemplarCity\":\"Macquarie\"},\"Mawson\":{\"exemplarCity\":\"Mawson\"},\"McMurdo\":{\"exemplarCity\":\"McMurdo\"},\"Palmer\":{\"exemplarCity\":\"Palmer\"},\"Rothera\":{\"exemplarCity\":\"Rothera\"},\"Syowa\":{\"exemplarCity\":\"Syowa\"},\"Troll\":{\"exemplarCity\":\"Troll\"},\"Vostok\":{\"exemplarCity\":\"Vostok\"}},\"Etc\":{\"UTC\":{\"long\":{\"standard\":\"Tempo coordinato universale\"},\"short\":{\"standard\":\"UTC\"}},\"Unknown\":{\"exemplarCity\":\"Città sconosciuta\"}}},\"metazone\":{\"Afghanistan\":{\"long\":{\"standard\":\"Ora dell’Afghanistan\"}},\"Africa_Central\":{\"long\":{\"standard\":\"Ora dell’Africa centrale\"}},\"Africa_Eastern\":{\"long\":{\"standard\":\"Ora dell’Africa orientale\"}},\"Africa_Southern\":{\"long\":{\"standard\":\"Ora dell’Africa meridionale\"}},\"Africa_Western\":{\"long\":{\"generic\":\"Ora dell’Africa occidentale\",\"standard\":\"Ora standard dell’Africa occidentale\",\"daylight\":\"Ora legale dell’Africa occidentale\"}},\"Alaska\":{\"long\":{\"generic\":\"Ora dell’Alaska\",\"standard\":\"Ora standard dell’Alaska\",\"daylight\":\"Ora legale dell’Alaska\"}},\"Amazon\":{\"long\":{\"generic\":\"Ora dell’Amazzonia\",\"standard\":\"Ora standard dell’Amazzonia\",\"daylight\":\"Ora legale dell’Amazzonia\"}},\"America_Central\":{\"long\":{\"generic\":\"Ora centrale USA\",\"standard\":\"Ora standard centrale USA\",\"daylight\":\"Ora legale centrale USA\"}},\"America_Eastern\":{\"long\":{\"generic\":\"Ora orientale USA\",\"standard\":\"Ora standard orientale USA\",\"daylight\":\"Ora legale orientale USA\"}},\"America_Mountain\":{\"long\":{\"generic\":\"Ora Montagne Rocciose USA\",\"standard\":\"Ora standard Montagne Rocciose USA\",\"daylight\":\"Ora legale Montagne Rocciose USA\"}},\"America_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico USA\",\"standard\":\"Ora standard del Pacifico USA\",\"daylight\":\"Ora legale del Pacifico USA\"}},\"Anadyr\":{\"long\":{\"generic\":\"Ora di Anadyr\",\"standard\":\"Ora standard di Anadyr\",\"daylight\":\"Ora legale di Anadyr\"}},\"Apia\":{\"long\":{\"generic\":\"Ora di Apia\",\"standard\":\"Ora standard di Apia\",\"daylight\":\"Ora legale di Apia\"}},\"Arabian\":{\"long\":{\"generic\":\"Ora araba\",\"standard\":\"Ora standard araba\",\"daylight\":\"Ora legale araba\"}},\"Argentina\":{\"long\":{\"generic\":\"Ora dell’Argentina\",\"standard\":\"Ora standard dell’Argentina\",\"daylight\":\"Ora legale dell’Argentina\"}},\"Argentina_Western\":{\"long\":{\"generic\":\"Ora dell’Argentina occidentale\",\"standard\":\"Ora standard dell’Argentina occidentale\",\"daylight\":\"Ora legale dell’Argentina occidentale\"}},\"Armenia\":{\"long\":{\"generic\":\"Ora dell’Armenia\",\"standard\":\"Ora standard dell’Armenia\",\"daylight\":\"Ora legale dell’Armenia\"}},\"Atlantic\":{\"long\":{\"generic\":\"Ora dell’Atlantico\",\"standard\":\"Ora standard dell’Atlantico\",\"daylight\":\"Ora legale dell’Atlantico\"}},\"Australia_Central\":{\"long\":{\"generic\":\"Ora dell’Australia centrale\",\"standard\":\"Ora standard dell’Australia centrale\",\"daylight\":\"Ora legale dell’Australia centrale\"}},\"Australia_CentralWestern\":{\"long\":{\"generic\":\"Ora dell’Australia centroccidentale\",\"standard\":\"Ora standard dell’Australia centroccidentale\",\"daylight\":\"Ora legale dell’Australia centroccidentale\"}},\"Australia_Eastern\":{\"long\":{\"generic\":\"Ora dell’Australia orientale\",\"standard\":\"Ora standard dell’Australia orientale\",\"daylight\":\"Ora legale dell’Australia orientale\"}},\"Australia_Western\":{\"long\":{\"generic\":\"Ora dell’Australia occidentale\",\"standard\":\"Ora standard dell’Australia occidentale\",\"daylight\":\"Ora legale dell’Australia occidentale\"}},\"Azerbaijan\":{\"long\":{\"generic\":\"Ora dell’Azerbaigian\",\"standard\":\"Ora standard dell’Azerbaigian\",\"daylight\":\"Ora legale dell’Azerbaigian\"}},\"Azores\":{\"long\":{\"generic\":\"Ora delle Azzorre\",\"standard\":\"Ora standard delle Azzorre\",\"daylight\":\"Ora legale delle Azzorre\"}},\"Bangladesh\":{\"long\":{\"generic\":\"Ora del Bangladesh\",\"standard\":\"Ora standard del Bangladesh\",\"daylight\":\"Ora legale del Bangladesh\"}},\"Bhutan\":{\"long\":{\"standard\":\"Ora del Bhutan\"}},\"Bolivia\":{\"long\":{\"standard\":\"Ora della Bolivia\"}},\"Brasilia\":{\"long\":{\"generic\":\"Ora di Brasilia\",\"standard\":\"Ora standard di Brasilia\",\"daylight\":\"Ora legale di Brasilia\"}},\"Brunei\":{\"long\":{\"standard\":\"Ora del Brunei Darussalam\"}},\"Cape_Verde\":{\"long\":{\"generic\":\"Ora di Capo Verde\",\"standard\":\"Ora standard di Capo Verde\",\"daylight\":\"Ora legale di Capo Verde\"}},\"Chamorro\":{\"long\":{\"standard\":\"Ora di Chamorro\"}},\"Chatham\":{\"long\":{\"generic\":\"Ora delle Chatham\",\"standard\":\"Ora standard delle Chatham\",\"daylight\":\"Ora legale delle Chatham\"}},\"Chile\":{\"long\":{\"generic\":\"Ora del Cile\",\"standard\":\"Ora standard del Cile\",\"daylight\":\"Ora legale del Cile\"}},\"China\":{\"long\":{\"generic\":\"Ora della Cina\",\"standard\":\"Ora standard della Cina\",\"daylight\":\"Ora legale della Cina\"}},\"Choibalsan\":{\"long\":{\"generic\":\"Ora di Choibalsan\",\"standard\":\"Ora standard di Choibalsan\",\"daylight\":\"Ora legale di Choibalsan\"}},\"Christmas\":{\"long\":{\"standard\":\"Ora dell’Isola Christmas\"}},\"Cocos\":{\"long\":{\"standard\":\"Ora delle Isole Cocos\"}},\"Colombia\":{\"long\":{\"generic\":\"Ora della Colombia\",\"standard\":\"Ora standard della Colombia\",\"daylight\":\"Ora legale della Colombia\"}},\"Cook\":{\"long\":{\"generic\":\"Ora delle isole Cook\",\"standard\":\"Ora standard delle isole Cook\",\"daylight\":\"Ora legale media delle isole Cook\"}},\"Cuba\":{\"long\":{\"generic\":\"Ora di Cuba\",\"standard\":\"Ora standard di Cuba\",\"daylight\":\"Ora legale di Cuba\"}},\"Davis\":{\"long\":{\"standard\":\"Ora di Davis\"}},\"DumontDUrville\":{\"long\":{\"standard\":\"Ora di Dumont-d’Urville\"}},\"East_Timor\":{\"long\":{\"standard\":\"Ora di Timor Est\"}},\"Easter\":{\"long\":{\"generic\":\"Ora dell’Isola di Pasqua\",\"standard\":\"Ora standard dell’Isola di Pasqua\",\"daylight\":\"Ora legale dell’Isola di Pasqua\"}},\"Ecuador\":{\"long\":{\"standard\":\"Ora dell’Ecuador\"}},\"Europe_Central\":{\"long\":{\"generic\":\"Ora dell’Europa centrale\",\"standard\":\"Ora standard dell’Europa centrale\",\"daylight\":\"Ora legale dell’Europa centrale\"},\"short\":{\"generic\":\"CET\",\"standard\":\"CET\",\"daylight\":\"CEST\"}},\"Europe_Eastern\":{\"long\":{\"generic\":\"Ora dell’Europa orientale\",\"standard\":\"Ora standard dell’Europa orientale\",\"daylight\":\"Ora legale dell’Europa orientale\"},\"short\":{\"generic\":\"EET\",\"standard\":\"EET\",\"daylight\":\"EEST\"}},\"Europe_Further_Eastern\":{\"long\":{\"standard\":\"Ora dell’Europa orientale (Kaliningrad)\"}},\"Europe_Western\":{\"long\":{\"generic\":\"Ora dell’Europa occidentale\",\"standard\":\"Ora standard dell’Europa occidentale\",\"daylight\":\"Ora legale dell’Europa occidentale\"},\"short\":{\"generic\":\"WET\",\"standard\":\"WET\",\"daylight\":\"WEST\"}},\"Falkland\":{\"long\":{\"generic\":\"Ora delle Isole Falkland\",\"standard\":\"Ora standard delle Isole Falkland\",\"daylight\":\"Ora legale delle Isole Falkland\"}},\"Fiji\":{\"long\":{\"generic\":\"Ora delle Figi\",\"standard\":\"Ora standard delle Figi\",\"daylight\":\"Ora legale delle Figi\"}},\"French_Guiana\":{\"long\":{\"standard\":\"Ora della Guiana francese\"}},\"French_Southern\":{\"long\":{\"standard\":\"Ora delle Terre australi e antartiche francesi\"}},\"Galapagos\":{\"long\":{\"standard\":\"Ora delle Galapagos\"}},\"Gambier\":{\"long\":{\"standard\":\"Ora di Gambier\"}},\"Georgia\":{\"long\":{\"generic\":\"Ora della Georgia\",\"standard\":\"Ora standard della Georgia\",\"daylight\":\"Ora legale della Georgia\"}},\"Gilbert_Islands\":{\"long\":{\"standard\":\"Ora delle isole Gilbert\"}},\"GMT\":{\"long\":{\"standard\":\"Ora del meridiano di Greenwich\"}},\"Greenland_Eastern\":{\"long\":{\"generic\":\"Ora della Groenlandia orientale\",\"standard\":\"Ora standard della Groenlandia orientale\",\"daylight\":\"Ora legale della Groenlandia orientale\"}},\"Greenland_Western\":{\"long\":{\"generic\":\"Ora della Groenlandia occidentale\",\"standard\":\"Ora standard della Groenlandia occidentale\",\"daylight\":\"Ora legale della Groenlandia occidentale\"}},\"Gulf\":{\"long\":{\"standard\":\"Ora del Golfo\"}},\"Guyana\":{\"long\":{\"standard\":\"Ora della Guyana\"}},\"Hawaii_Aleutian\":{\"long\":{\"generic\":\"Ora delle isole Hawaii-Aleutine\",\"standard\":\"Ora standard delle Isole Hawaii-Aleutine\",\"daylight\":\"Ora legale delle Isole Hawaii-Aleutine\"}},\"Hong_Kong\":{\"long\":{\"generic\":\"Ora di Hong Kong\",\"standard\":\"Ora standard di Hong Kong\",\"daylight\":\"Ora legale di Hong Kong\"}},\"Hovd\":{\"long\":{\"generic\":\"Ora di Hovd\",\"standard\":\"Ora standard di Hovd\",\"daylight\":\"Ora legale di Hovd\"}},\"India\":{\"long\":{\"standard\":\"Ora standard dell’India\"}},\"Indian_Ocean\":{\"long\":{\"standard\":\"Ora dell’Oceano Indiano\"}},\"Indochina\":{\"long\":{\"standard\":\"Ora dell’Indocina\"}},\"Indonesia_Central\":{\"long\":{\"standard\":\"Ora dell’Indonesia centrale\"}},\"Indonesia_Eastern\":{\"long\":{\"standard\":\"Ora dell’Indonesia orientale\"}},\"Indonesia_Western\":{\"long\":{\"standard\":\"Ora dell’Indonesia occidentale\"}},\"Iran\":{\"long\":{\"generic\":\"Ora dell’Iran\",\"standard\":\"Ora standard dell’Iran\",\"daylight\":\"Ora legale dell’Iran\"}},\"Irkutsk\":{\"long\":{\"generic\":\"Ora di Irkutsk\",\"standard\":\"Ora standard di Irkutsk\",\"daylight\":\"Ora legale di Irkutsk\"}},\"Israel\":{\"long\":{\"generic\":\"Ora di Israele\",\"standard\":\"Ora standard di Israele\",\"daylight\":\"Ora legale di Israele\"}},\"Japan\":{\"long\":{\"generic\":\"Ora del Giappone\",\"standard\":\"Ora standard del Giappone\",\"daylight\":\"Ora legale del Giappone\"}},\"Kamchatka\":{\"long\":{\"generic\":\"Ora di Petropavlovsk-Kamchatski\",\"standard\":\"Ora standard di Petropavlovsk-Kamchatski\",\"daylight\":\"Ora legale di Petropavlovsk-Kamchatski\"}},\"Kazakhstan_Eastern\":{\"long\":{\"standard\":\"Ora del Kazakistan orientale\"}},\"Kazakhstan_Western\":{\"long\":{\"standard\":\"Ora del Kazakistan occidentale\"}},\"Korea\":{\"long\":{\"generic\":\"Ora coreana\",\"standard\":\"Ora standard coreana\",\"daylight\":\"Ora legale coreana\"}},\"Kosrae\":{\"long\":{\"standard\":\"Ora del Kosrae\"}},\"Krasnoyarsk\":{\"long\":{\"generic\":\"Ora di Krasnoyarsk\",\"standard\":\"Ora standard di Krasnoyarsk\",\"daylight\":\"Ora legale di Krasnoyarsk\"}},\"Kyrgystan\":{\"long\":{\"standard\":\"Ora del Kirghizistan\"}},\"Line_Islands\":{\"long\":{\"standard\":\"Ora delle Sporadi equatoriali\"}},\"Lord_Howe\":{\"long\":{\"generic\":\"Ora di Lord Howe\",\"standard\":\"Ora standard di Lord Howe\",\"daylight\":\"Ora legale di Lord Howe\"}},\"Macquarie\":{\"long\":{\"standard\":\"Ora dell’Isola Macquarie\"}},\"Magadan\":{\"long\":{\"generic\":\"Ora di Magadan\",\"standard\":\"Ora standard di Magadan\",\"daylight\":\"Ora legale di Magadan\"}},\"Malaysia\":{\"long\":{\"standard\":\"Ora della Malesia\"}},\"Maldives\":{\"long\":{\"standard\":\"Ora delle Maldive\"}},\"Marquesas\":{\"long\":{\"standard\":\"Ora delle Marchesi\"}},\"Marshall_Islands\":{\"long\":{\"standard\":\"Ora delle Isole Marshall\"}},\"Mauritius\":{\"long\":{\"generic\":\"Ora delle Mauritius\",\"standard\":\"Ora standard delle Mauritius\",\"daylight\":\"Ora legale delle Mauritius\"}},\"Mawson\":{\"long\":{\"standard\":\"Ora di Mawson\"}},\"Mexico_Northwest\":{\"long\":{\"generic\":\"Ora del Messico nord-occidentale\",\"standard\":\"Ora standard del Messico nord-occidentale\",\"daylight\":\"Ora legale del Messico nord-occidentale\"}},\"Mexico_Pacific\":{\"long\":{\"generic\":\"Ora del Pacifico (Messico)\",\"standard\":\"Ora standard del Pacifico (Messico)\",\"daylight\":\"Ora legale del Pacifico (Messico)\"}},\"Mongolia\":{\"long\":{\"generic\":\"Ora di Ulan Bator\",\"standard\":\"Ora standard di Ulan Bator\",\"daylight\":\"Ora legale di Ulan Bator\"}},\"Moscow\":{\"long\":{\"generic\":\"Ora di Mosca\",\"standard\":\"Ora standard di Mosca\",\"daylight\":\"Ora legale di Mosca\"}},\"Myanmar\":{\"long\":{\"standard\":\"Ora della Birmania\"}},\"Nauru\":{\"long\":{\"standard\":\"Ora di Nauru\"}},\"Nepal\":{\"long\":{\"standard\":\"Ora del Nepal\"}},\"New_Caledonia\":{\"long\":{\"generic\":\"Ora della Nuova Caledonia\",\"standard\":\"Ora standard della Nuova Caledonia\",\"daylight\":\"Ora legale della Nuova Caledonia\"}},\"New_Zealand\":{\"long\":{\"generic\":\"Ora della Nuova Zelanda\",\"standard\":\"Ora standard della Nuova Zelanda\",\"daylight\":\"Ora legale della Nuova Zelanda\"}},\"Newfoundland\":{\"long\":{\"generic\":\"Ora di Terranova\",\"standard\":\"Ora standard di Terranova\",\"daylight\":\"Ora legale di Terranova\"}},\"Niue\":{\"long\":{\"standard\":\"Ora di Niue\"}},\"Norfolk\":{\"long\":{\"standard\":\"Ora delle Isole Norfolk\"}},\"Noronha\":{\"long\":{\"generic\":\"Ora di Fernando de Noronha\",\"standard\":\"Ora standard di Fernando de Noronha\",\"daylight\":\"Ora legale di Fernando de Noronha\"}},\"Novosibirsk\":{\"long\":{\"generic\":\"Ora di Novosibirsk\",\"standard\":\"Ora standard di Novosibirsk\",\"daylight\":\"Ora legale di Novosibirsk\"}},\"Omsk\":{\"long\":{\"generic\":\"Ora di Omsk\",\"standard\":\"Ora standard di Omsk\",\"daylight\":\"Ora legale di Omsk\"}},\"Pakistan\":{\"long\":{\"generic\":\"Ora del Pakistan\",\"standard\":\"Ora standard del Pakistan\",\"daylight\":\"Ora legale del Pakistan\"}},\"Palau\":{\"long\":{\"standard\":\"Ora di Palau\"}},\"Papua_New_Guinea\":{\"long\":{\"standard\":\"Ora della Papua Nuova Guinea\"}},\"Paraguay\":{\"long\":{\"generic\":\"Ora del Paraguay\",\"standard\":\"Ora standard del Paraguay\",\"daylight\":\"Ora legale del Paraguay\"}},\"Peru\":{\"long\":{\"generic\":\"Ora del Perù\",\"standard\":\"Ora standard del Perù\",\"daylight\":\"Ora legale del Perù\"}},\"Philippines\":{\"long\":{\"generic\":\"Ora delle Filippine\",\"standard\":\"Ora standard delle Filippine\",\"daylight\":\"Ora legale delle Filippine\"}},\"Phoenix_Islands\":{\"long\":{\"standard\":\"Ora delle Isole della Fenice\"}},\"Pierre_Miquelon\":{\"long\":{\"generic\":\"Ora di Saint-Pierre e Miquelon\",\"standard\":\"Ora standard di Saint-Pierre e Miquelon\",\"daylight\":\"Ora legale di Saint-Pierre e Miquelon\"}},\"Pitcairn\":{\"long\":{\"standard\":\"Ora delle Pitcairn\"}},\"Ponape\":{\"long\":{\"standard\":\"Ora di Pohnpei\"}},\"Pyongyang\":{\"long\":{\"standard\":\"Ora di Pyongyang\"}},\"Reunion\":{\"long\":{\"standard\":\"Ora di Riunione\"}},\"Rothera\":{\"long\":{\"standard\":\"Ora di Rothera\"}},\"Sakhalin\":{\"long\":{\"generic\":\"Ora di Sakhalin\",\"standard\":\"Ora standard di Sakhalin\",\"daylight\":\"Ora legale di Sakhalin\"}},\"Samara\":{\"long\":{\"generic\":\"Ora di Samara\",\"standard\":\"Ora standard di Samara\",\"daylight\":\"Ora legale di Samara\"}},\"Samoa\":{\"long\":{\"generic\":\"Ora di Samoa\",\"standard\":\"Ora standard di Samoa\",\"daylight\":\"Ora legale di Samoa\"}},\"Seychelles\":{\"long\":{\"standard\":\"Ora delle Seychelles\"}},\"Singapore\":{\"long\":{\"standard\":\"Ora di Singapore\"}},\"Solomon\":{\"long\":{\"standard\":\"Ora delle Isole Salomone\"}},\"South_Georgia\":{\"long\":{\"standard\":\"Ora della Georgia del Sud\"}},\"Suriname\":{\"long\":{\"standard\":\"Ora del Suriname\"}},\"Syowa\":{\"long\":{\"standard\":\"Ora di Syowa\"}},\"Tahiti\":{\"long\":{\"standard\":\"Ora di Tahiti\"}},\"Taipei\":{\"long\":{\"generic\":\"Ora di Taipei\",\"standard\":\"Ora standard di Taipei\",\"daylight\":\"Ora legale di Taipei\"}},\"Tajikistan\":{\"long\":{\"standard\":\"Ora del Tagikistan\"}},\"Tokelau\":{\"long\":{\"standard\":\"Ora di Tokelau\"}},\"Tonga\":{\"long\":{\"generic\":\"Ora di Tonga\",\"standard\":\"Ora standard di Tonga\",\"daylight\":\"Ora legale di Tonga\"}},\"Truk\":{\"long\":{\"standard\":\"Ora del Chuuk\"}},\"Turkmenistan\":{\"long\":{\"generic\":\"Ora del Turkmenistan\",\"standard\":\"Ora standard del Turkmenistan\",\"daylight\":\"Ora legale del Turkmenistan\"}},\"Tuvalu\":{\"long\":{\"standard\":\"Ora di Tuvalu\"}},\"Uruguay\":{\"long\":{\"generic\":\"Ora dell’Uruguay\",\"standard\":\"Ora standard dell’Uruguay\",\"daylight\":\"Ora legale dell’Uruguay\"}},\"Uzbekistan\":{\"long\":{\"generic\":\"Ora dell’Uzbekistan\",\"standard\":\"Ora standard dell’Uzbekistan\",\"daylight\":\"Ora legale dell’Uzbekistan\"}},\"Vanuatu\":{\"long\":{\"generic\":\"Ora del Vanuatu\",\"standard\":\"Ora standard del Vanuatu\",\"daylight\":\"Ora legale del Vanuatu\"}},\"Venezuela\":{\"long\":{\"standard\":\"Ora del Venezuela\"}},\"Vladivostok\":{\"long\":{\"generic\":\"Ora di Vladivostok\",\"standard\":\"Ora standard di Vladivostok\",\"daylight\":\"Ora legale di Vladivostok\"}},\"Volgograd\":{\"long\":{\"generic\":\"Ora di Volgograd\",\"standard\":\"Ora standard di Volgograd\",\"daylight\":\"Ora legale di Volgograd\"}},\"Vostok\":{\"long\":{\"standard\":\"Ora di Vostok\"}},\"Wake\":{\"long\":{\"standard\":\"Ora dell’Isola di Wake\"}},\"Wallis\":{\"long\":{\"standard\":\"Ora di Wallis e Futuna\"}},\"Yakutsk\":{\"long\":{\"generic\":\"Ora di Yakutsk\",\"standard\":\"Ora standard di Yakutsk\",\"daylight\":\"Ora legale di Yakutsk\"}},\"Yekaterinburg\":{\"long\":{\"generic\":\"Ora di Ekaterinburg\",\"standard\":\"Ora standard di Ekaterinburg\",\"daylight\":\"Ora legale di Ekaterinburg\"}}}}}}}}");

/***/ }),

/***/ "./node_modules/cldr-data/supplemental/likelySubtags.json":
/*!****************************************************************!*\
  !*** ./node_modules/cldr-data/supplemental/likelySubtags.json ***!
  \****************************************************************/
/*! exports provided: supplemental, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"supplemental\":{\"version\":{\"_unicodeVersion\":\"12.1.0\",\"_cldrVersion\":\"36\"},\"likelySubtags\":{\"aa\":\"aa-Latn-ET\",\"aai\":\"aai-Latn-ZZ\",\"aak\":\"aak-Latn-ZZ\",\"aau\":\"aau-Latn-ZZ\",\"ab\":\"ab-Cyrl-GE\",\"abi\":\"abi-Latn-ZZ\",\"abq\":\"abq-Cyrl-ZZ\",\"abr\":\"abr-Latn-GH\",\"abt\":\"abt-Latn-ZZ\",\"aby\":\"aby-Latn-ZZ\",\"acd\":\"acd-Latn-ZZ\",\"ace\":\"ace-Latn-ID\",\"ach\":\"ach-Latn-UG\",\"ada\":\"ada-Latn-GH\",\"ade\":\"ade-Latn-ZZ\",\"adj\":\"adj-Latn-ZZ\",\"adp\":\"adp-Tibt-BT\",\"ady\":\"ady-Cyrl-RU\",\"adz\":\"adz-Latn-ZZ\",\"ae\":\"ae-Avst-IR\",\"aeb\":\"aeb-Arab-TN\",\"aey\":\"aey-Latn-ZZ\",\"af\":\"af-Latn-ZA\",\"agc\":\"agc-Latn-ZZ\",\"agd\":\"agd-Latn-ZZ\",\"agg\":\"agg-Latn-ZZ\",\"agm\":\"agm-Latn-ZZ\",\"ago\":\"ago-Latn-ZZ\",\"agq\":\"agq-Latn-CM\",\"aha\":\"aha-Latn-ZZ\",\"ahl\":\"ahl-Latn-ZZ\",\"aho\":\"aho-Ahom-IN\",\"ajg\":\"ajg-Latn-ZZ\",\"ak\":\"ak-Latn-GH\",\"akk\":\"akk-Xsux-IQ\",\"ala\":\"ala-Latn-ZZ\",\"ali\":\"ali-Latn-ZZ\",\"aln\":\"aln-Latn-XK\",\"alt\":\"alt-Cyrl-RU\",\"am\":\"am-Ethi-ET\",\"amm\":\"amm-Latn-ZZ\",\"amn\":\"amn-Latn-ZZ\",\"amo\":\"amo-Latn-NG\",\"amp\":\"amp-Latn-ZZ\",\"an\":\"an-Latn-ES\",\"anc\":\"anc-Latn-ZZ\",\"ank\":\"ank-Latn-ZZ\",\"ann\":\"ann-Latn-ZZ\",\"any\":\"any-Latn-ZZ\",\"aoj\":\"aoj-Latn-ZZ\",\"aom\":\"aom-Latn-ZZ\",\"aoz\":\"aoz-Latn-ID\",\"apc\":\"apc-Arab-ZZ\",\"apd\":\"apd-Arab-TG\",\"ape\":\"ape-Latn-ZZ\",\"apr\":\"apr-Latn-ZZ\",\"aps\":\"aps-Latn-ZZ\",\"apz\":\"apz-Latn-ZZ\",\"ar\":\"ar-Arab-EG\",\"arc\":\"arc-Armi-IR\",\"arc-Nbat\":\"arc-Nbat-JO\",\"arc-Palm\":\"arc-Palm-SY\",\"arh\":\"arh-Latn-ZZ\",\"arn\":\"arn-Latn-CL\",\"aro\":\"aro-Latn-BO\",\"arq\":\"arq-Arab-DZ\",\"ars\":\"ars-Arab-SA\",\"ary\":\"ary-Arab-MA\",\"arz\":\"arz-Arab-EG\",\"as\":\"as-Beng-IN\",\"asa\":\"asa-Latn-TZ\",\"ase\":\"ase-Sgnw-US\",\"asg\":\"asg-Latn-ZZ\",\"aso\":\"aso-Latn-ZZ\",\"ast\":\"ast-Latn-ES\",\"ata\":\"ata-Latn-ZZ\",\"atg\":\"atg-Latn-ZZ\",\"atj\":\"atj-Latn-CA\",\"auy\":\"auy-Latn-ZZ\",\"av\":\"av-Cyrl-RU\",\"avl\":\"avl-Arab-ZZ\",\"avn\":\"avn-Latn-ZZ\",\"avt\":\"avt-Latn-ZZ\",\"avu\":\"avu-Latn-ZZ\",\"awa\":\"awa-Deva-IN\",\"awb\":\"awb-Latn-ZZ\",\"awo\":\"awo-Latn-ZZ\",\"awx\":\"awx-Latn-ZZ\",\"ay\":\"ay-Latn-BO\",\"ayb\":\"ayb-Latn-ZZ\",\"az\":\"az-Latn-AZ\",\"az-Arab\":\"az-Arab-IR\",\"az-IQ\":\"az-Arab-IQ\",\"az-IR\":\"az-Arab-IR\",\"az-RU\":\"az-Cyrl-RU\",\"ba\":\"ba-Cyrl-RU\",\"bal\":\"bal-Arab-PK\",\"ban\":\"ban-Latn-ID\",\"bap\":\"bap-Deva-NP\",\"bar\":\"bar-Latn-AT\",\"bas\":\"bas-Latn-CM\",\"bav\":\"bav-Latn-ZZ\",\"bax\":\"bax-Bamu-CM\",\"bba\":\"bba-Latn-ZZ\",\"bbb\":\"bbb-Latn-ZZ\",\"bbc\":\"bbc-Latn-ID\",\"bbd\":\"bbd-Latn-ZZ\",\"bbj\":\"bbj-Latn-CM\",\"bbp\":\"bbp-Latn-ZZ\",\"bbr\":\"bbr-Latn-ZZ\",\"bcf\":\"bcf-Latn-ZZ\",\"bch\":\"bch-Latn-ZZ\",\"bci\":\"bci-Latn-CI\",\"bcm\":\"bcm-Latn-ZZ\",\"bcn\":\"bcn-Latn-ZZ\",\"bco\":\"bco-Latn-ZZ\",\"bcq\":\"bcq-Ethi-ZZ\",\"bcu\":\"bcu-Latn-ZZ\",\"bdd\":\"bdd-Latn-ZZ\",\"be\":\"be-Cyrl-BY\",\"bef\":\"bef-Latn-ZZ\",\"beh\":\"beh-Latn-ZZ\",\"bej\":\"bej-Arab-SD\",\"bem\":\"bem-Latn-ZM\",\"bet\":\"bet-Latn-ZZ\",\"bew\":\"bew-Latn-ID\",\"bex\":\"bex-Latn-ZZ\",\"bez\":\"bez-Latn-TZ\",\"bfd\":\"bfd-Latn-CM\",\"bfq\":\"bfq-Taml-IN\",\"bft\":\"bft-Arab-PK\",\"bfy\":\"bfy-Deva-IN\",\"bg\":\"bg-Cyrl-BG\",\"bgc\":\"bgc-Deva-IN\",\"bgn\":\"bgn-Arab-PK\",\"bgx\":\"bgx-Grek-TR\",\"bhb\":\"bhb-Deva-IN\",\"bhg\":\"bhg-Latn-ZZ\",\"bhi\":\"bhi-Deva-IN\",\"bhl\":\"bhl-Latn-ZZ\",\"bho\":\"bho-Deva-IN\",\"bhy\":\"bhy-Latn-ZZ\",\"bi\":\"bi-Latn-VU\",\"bib\":\"bib-Latn-ZZ\",\"big\":\"big-Latn-ZZ\",\"bik\":\"bik-Latn-PH\",\"bim\":\"bim-Latn-ZZ\",\"bin\":\"bin-Latn-NG\",\"bio\":\"bio-Latn-ZZ\",\"biq\":\"biq-Latn-ZZ\",\"bjh\":\"bjh-Latn-ZZ\",\"bji\":\"bji-Ethi-ZZ\",\"bjj\":\"bjj-Deva-IN\",\"bjn\":\"bjn-Latn-ID\",\"bjo\":\"bjo-Latn-ZZ\",\"bjr\":\"bjr-Latn-ZZ\",\"bjt\":\"bjt-Latn-SN\",\"bjz\":\"bjz-Latn-ZZ\",\"bkc\":\"bkc-Latn-ZZ\",\"bkm\":\"bkm-Latn-CM\",\"bkq\":\"bkq-Latn-ZZ\",\"bku\":\"bku-Latn-PH\",\"bkv\":\"bkv-Latn-ZZ\",\"blt\":\"blt-Tavt-VN\",\"bm\":\"bm-Latn-ML\",\"bmh\":\"bmh-Latn-ZZ\",\"bmk\":\"bmk-Latn-ZZ\",\"bmq\":\"bmq-Latn-ML\",\"bmu\":\"bmu-Latn-ZZ\",\"bn\":\"bn-Beng-BD\",\"bng\":\"bng-Latn-ZZ\",\"bnm\":\"bnm-Latn-ZZ\",\"bnp\":\"bnp-Latn-ZZ\",\"bo\":\"bo-Tibt-CN\",\"boj\":\"boj-Latn-ZZ\",\"bom\":\"bom-Latn-ZZ\",\"bon\":\"bon-Latn-ZZ\",\"bpy\":\"bpy-Beng-IN\",\"bqc\":\"bqc-Latn-ZZ\",\"bqi\":\"bqi-Arab-IR\",\"bqp\":\"bqp-Latn-ZZ\",\"bqv\":\"bqv-Latn-CI\",\"br\":\"br-Latn-FR\",\"bra\":\"bra-Deva-IN\",\"brh\":\"brh-Arab-PK\",\"brx\":\"brx-Deva-IN\",\"brz\":\"brz-Latn-ZZ\",\"bs\":\"bs-Latn-BA\",\"bsj\":\"bsj-Latn-ZZ\",\"bsq\":\"bsq-Bass-LR\",\"bss\":\"bss-Latn-CM\",\"bst\":\"bst-Ethi-ZZ\",\"bto\":\"bto-Latn-PH\",\"btt\":\"btt-Latn-ZZ\",\"btv\":\"btv-Deva-PK\",\"bua\":\"bua-Cyrl-RU\",\"buc\":\"buc-Latn-YT\",\"bud\":\"bud-Latn-ZZ\",\"bug\":\"bug-Latn-ID\",\"buk\":\"buk-Latn-ZZ\",\"bum\":\"bum-Latn-CM\",\"buo\":\"buo-Latn-ZZ\",\"bus\":\"bus-Latn-ZZ\",\"buu\":\"buu-Latn-ZZ\",\"bvb\":\"bvb-Latn-GQ\",\"bwd\":\"bwd-Latn-ZZ\",\"bwr\":\"bwr-Latn-ZZ\",\"bxh\":\"bxh-Latn-ZZ\",\"bye\":\"bye-Latn-ZZ\",\"byn\":\"byn-Ethi-ER\",\"byr\":\"byr-Latn-ZZ\",\"bys\":\"bys-Latn-ZZ\",\"byv\":\"byv-Latn-CM\",\"byx\":\"byx-Latn-ZZ\",\"bza\":\"bza-Latn-ZZ\",\"bze\":\"bze-Latn-ML\",\"bzf\":\"bzf-Latn-ZZ\",\"bzh\":\"bzh-Latn-ZZ\",\"bzw\":\"bzw-Latn-ZZ\",\"ca\":\"ca-Latn-ES\",\"can\":\"can-Latn-ZZ\",\"cbj\":\"cbj-Latn-ZZ\",\"cch\":\"cch-Latn-NG\",\"ccp\":\"ccp-Cakm-BD\",\"ce\":\"ce-Cyrl-RU\",\"ceb\":\"ceb-Latn-PH\",\"cfa\":\"cfa-Latn-ZZ\",\"cgg\":\"cgg-Latn-UG\",\"ch\":\"ch-Latn-GU\",\"chk\":\"chk-Latn-FM\",\"chm\":\"chm-Cyrl-RU\",\"cho\":\"cho-Latn-US\",\"chp\":\"chp-Latn-CA\",\"chr\":\"chr-Cher-US\",\"cic\":\"cic-Latn-US\",\"cja\":\"cja-Arab-KH\",\"cjm\":\"cjm-Cham-VN\",\"cjv\":\"cjv-Latn-ZZ\",\"ckb\":\"ckb-Arab-IQ\",\"ckl\":\"ckl-Latn-ZZ\",\"cko\":\"cko-Latn-ZZ\",\"cky\":\"cky-Latn-ZZ\",\"cla\":\"cla-Latn-ZZ\",\"cme\":\"cme-Latn-ZZ\",\"cmg\":\"cmg-Soyo-MN\",\"co\":\"co-Latn-FR\",\"cop\":\"cop-Copt-EG\",\"cps\":\"cps-Latn-PH\",\"cr\":\"cr-Cans-CA\",\"crh\":\"crh-Cyrl-UA\",\"crj\":\"crj-Cans-CA\",\"crk\":\"crk-Cans-CA\",\"crl\":\"crl-Cans-CA\",\"crm\":\"crm-Cans-CA\",\"crs\":\"crs-Latn-SC\",\"cs\":\"cs-Latn-CZ\",\"csb\":\"csb-Latn-PL\",\"csw\":\"csw-Cans-CA\",\"ctd\":\"ctd-Pauc-MM\",\"cu\":\"cu-Cyrl-RU\",\"cu-Glag\":\"cu-Glag-BG\",\"cv\":\"cv-Cyrl-RU\",\"cy\":\"cy-Latn-GB\",\"da\":\"da-Latn-DK\",\"dad\":\"dad-Latn-ZZ\",\"daf\":\"daf-Latn-ZZ\",\"dag\":\"dag-Latn-ZZ\",\"dah\":\"dah-Latn-ZZ\",\"dak\":\"dak-Latn-US\",\"dar\":\"dar-Cyrl-RU\",\"dav\":\"dav-Latn-KE\",\"dbd\":\"dbd-Latn-ZZ\",\"dbq\":\"dbq-Latn-ZZ\",\"dcc\":\"dcc-Arab-IN\",\"ddn\":\"ddn-Latn-ZZ\",\"de\":\"de-Latn-DE\",\"ded\":\"ded-Latn-ZZ\",\"den\":\"den-Latn-CA\",\"dga\":\"dga-Latn-ZZ\",\"dgh\":\"dgh-Latn-ZZ\",\"dgi\":\"dgi-Latn-ZZ\",\"dgl\":\"dgl-Arab-ZZ\",\"dgr\":\"dgr-Latn-CA\",\"dgz\":\"dgz-Latn-ZZ\",\"dia\":\"dia-Latn-ZZ\",\"dje\":\"dje-Latn-NE\",\"dnj\":\"dnj-Latn-CI\",\"dob\":\"dob-Latn-ZZ\",\"doi\":\"doi-Arab-IN\",\"dop\":\"dop-Latn-ZZ\",\"dow\":\"dow-Latn-ZZ\",\"drh\":\"drh-Mong-CN\",\"dri\":\"dri-Latn-ZZ\",\"drs\":\"drs-Ethi-ZZ\",\"dsb\":\"dsb-Latn-DE\",\"dtm\":\"dtm-Latn-ML\",\"dtp\":\"dtp-Latn-MY\",\"dts\":\"dts-Latn-ZZ\",\"dty\":\"dty-Deva-NP\",\"dua\":\"dua-Latn-CM\",\"duc\":\"duc-Latn-ZZ\",\"dud\":\"dud-Latn-ZZ\",\"dug\":\"dug-Latn-ZZ\",\"dv\":\"dv-Thaa-MV\",\"dva\":\"dva-Latn-ZZ\",\"dww\":\"dww-Latn-ZZ\",\"dyo\":\"dyo-Latn-SN\",\"dyu\":\"dyu-Latn-BF\",\"dz\":\"dz-Tibt-BT\",\"dzg\":\"dzg-Latn-ZZ\",\"ebu\":\"ebu-Latn-KE\",\"ee\":\"ee-Latn-GH\",\"efi\":\"efi-Latn-NG\",\"egl\":\"egl-Latn-IT\",\"egy\":\"egy-Egyp-EG\",\"eka\":\"eka-Latn-ZZ\",\"eky\":\"eky-Kali-MM\",\"el\":\"el-Grek-GR\",\"ema\":\"ema-Latn-ZZ\",\"emi\":\"emi-Latn-ZZ\",\"en\":\"en-Latn-US\",\"en-Shaw\":\"en-Shaw-GB\",\"enn\":\"enn-Latn-ZZ\",\"enq\":\"enq-Latn-ZZ\",\"eo\":\"eo-Latn-001\",\"eri\":\"eri-Latn-ZZ\",\"es\":\"es-Latn-ES\",\"esg\":\"esg-Gonm-IN\",\"esu\":\"esu-Latn-US\",\"et\":\"et-Latn-EE\",\"etr\":\"etr-Latn-ZZ\",\"ett\":\"ett-Ital-IT\",\"etu\":\"etu-Latn-ZZ\",\"etx\":\"etx-Latn-ZZ\",\"eu\":\"eu-Latn-ES\",\"ewo\":\"ewo-Latn-CM\",\"ext\":\"ext-Latn-ES\",\"fa\":\"fa-Arab-IR\",\"faa\":\"faa-Latn-ZZ\",\"fab\":\"fab-Latn-ZZ\",\"fag\":\"fag-Latn-ZZ\",\"fai\":\"fai-Latn-ZZ\",\"fan\":\"fan-Latn-GQ\",\"ff\":\"ff-Latn-SN\",\"ff-Adlm\":\"ff-Adlm-GN\",\"ffi\":\"ffi-Latn-ZZ\",\"ffm\":\"ffm-Latn-ML\",\"fi\":\"fi-Latn-FI\",\"fia\":\"fia-Arab-SD\",\"fil\":\"fil-Latn-PH\",\"fit\":\"fit-Latn-SE\",\"fj\":\"fj-Latn-FJ\",\"flr\":\"flr-Latn-ZZ\",\"fmp\":\"fmp-Latn-ZZ\",\"fo\":\"fo-Latn-FO\",\"fod\":\"fod-Latn-ZZ\",\"fon\":\"fon-Latn-BJ\",\"for\":\"for-Latn-ZZ\",\"fpe\":\"fpe-Latn-ZZ\",\"fqs\":\"fqs-Latn-ZZ\",\"fr\":\"fr-Latn-FR\",\"frc\":\"frc-Latn-US\",\"frp\":\"frp-Latn-FR\",\"frr\":\"frr-Latn-DE\",\"frs\":\"frs-Latn-DE\",\"fub\":\"fub-Arab-CM\",\"fud\":\"fud-Latn-WF\",\"fue\":\"fue-Latn-ZZ\",\"fuf\":\"fuf-Latn-GN\",\"fuh\":\"fuh-Latn-ZZ\",\"fuq\":\"fuq-Latn-NE\",\"fur\":\"fur-Latn-IT\",\"fuv\":\"fuv-Latn-NG\",\"fuy\":\"fuy-Latn-ZZ\",\"fvr\":\"fvr-Latn-SD\",\"fy\":\"fy-Latn-NL\",\"ga\":\"ga-Latn-IE\",\"gaa\":\"gaa-Latn-GH\",\"gaf\":\"gaf-Latn-ZZ\",\"gag\":\"gag-Latn-MD\",\"gah\":\"gah-Latn-ZZ\",\"gaj\":\"gaj-Latn-ZZ\",\"gam\":\"gam-Latn-ZZ\",\"gan\":\"gan-Hans-CN\",\"gaw\":\"gaw-Latn-ZZ\",\"gay\":\"gay-Latn-ID\",\"gba\":\"gba-Latn-ZZ\",\"gbf\":\"gbf-Latn-ZZ\",\"gbm\":\"gbm-Deva-IN\",\"gby\":\"gby-Latn-ZZ\",\"gbz\":\"gbz-Arab-IR\",\"gcr\":\"gcr-Latn-GF\",\"gd\":\"gd-Latn-GB\",\"gde\":\"gde-Latn-ZZ\",\"gdn\":\"gdn-Latn-ZZ\",\"gdr\":\"gdr-Latn-ZZ\",\"geb\":\"geb-Latn-ZZ\",\"gej\":\"gej-Latn-ZZ\",\"gel\":\"gel-Latn-ZZ\",\"gez\":\"gez-Ethi-ET\",\"gfk\":\"gfk-Latn-ZZ\",\"ggn\":\"ggn-Deva-NP\",\"ghs\":\"ghs-Latn-ZZ\",\"gil\":\"gil-Latn-KI\",\"gim\":\"gim-Latn-ZZ\",\"gjk\":\"gjk-Arab-PK\",\"gjn\":\"gjn-Latn-ZZ\",\"gju\":\"gju-Arab-PK\",\"gkn\":\"gkn-Latn-ZZ\",\"gkp\":\"gkp-Latn-ZZ\",\"gl\":\"gl-Latn-ES\",\"glk\":\"glk-Arab-IR\",\"gmm\":\"gmm-Latn-ZZ\",\"gmv\":\"gmv-Ethi-ZZ\",\"gn\":\"gn-Latn-PY\",\"gnd\":\"gnd-Latn-ZZ\",\"gng\":\"gng-Latn-ZZ\",\"god\":\"god-Latn-ZZ\",\"gof\":\"gof-Ethi-ZZ\",\"goi\":\"goi-Latn-ZZ\",\"gom\":\"gom-Deva-IN\",\"gon\":\"gon-Telu-IN\",\"gor\":\"gor-Latn-ID\",\"gos\":\"gos-Latn-NL\",\"got\":\"got-Goth-UA\",\"grb\":\"grb-Latn-ZZ\",\"grc\":\"grc-Cprt-CY\",\"grc-Linb\":\"grc-Linb-GR\",\"grt\":\"grt-Beng-IN\",\"grw\":\"grw-Latn-ZZ\",\"gsw\":\"gsw-Latn-CH\",\"gu\":\"gu-Gujr-IN\",\"gub\":\"gub-Latn-BR\",\"guc\":\"guc-Latn-CO\",\"gud\":\"gud-Latn-ZZ\",\"gur\":\"gur-Latn-GH\",\"guw\":\"guw-Latn-ZZ\",\"gux\":\"gux-Latn-ZZ\",\"guz\":\"guz-Latn-KE\",\"gv\":\"gv-Latn-IM\",\"gvf\":\"gvf-Latn-ZZ\",\"gvr\":\"gvr-Deva-NP\",\"gvs\":\"gvs-Latn-ZZ\",\"gwc\":\"gwc-Arab-ZZ\",\"gwi\":\"gwi-Latn-CA\",\"gwt\":\"gwt-Arab-ZZ\",\"gyi\":\"gyi-Latn-ZZ\",\"ha\":\"ha-Latn-NG\",\"ha-CM\":\"ha-Arab-CM\",\"ha-SD\":\"ha-Arab-SD\",\"hag\":\"hag-Latn-ZZ\",\"hak\":\"hak-Hans-CN\",\"ham\":\"ham-Latn-ZZ\",\"haw\":\"haw-Latn-US\",\"haz\":\"haz-Arab-AF\",\"hbb\":\"hbb-Latn-ZZ\",\"hdy\":\"hdy-Ethi-ZZ\",\"he\":\"he-Hebr-IL\",\"hhy\":\"hhy-Latn-ZZ\",\"hi\":\"hi-Deva-IN\",\"hia\":\"hia-Latn-ZZ\",\"hif\":\"hif-Latn-FJ\",\"hig\":\"hig-Latn-ZZ\",\"hih\":\"hih-Latn-ZZ\",\"hil\":\"hil-Latn-PH\",\"hla\":\"hla-Latn-ZZ\",\"hlu\":\"hlu-Hluw-TR\",\"hmd\":\"hmd-Plrd-CN\",\"hmt\":\"hmt-Latn-ZZ\",\"hnd\":\"hnd-Arab-PK\",\"hne\":\"hne-Deva-IN\",\"hnj\":\"hnj-Hmng-LA\",\"hnn\":\"hnn-Latn-PH\",\"hno\":\"hno-Arab-PK\",\"ho\":\"ho-Latn-PG\",\"hoc\":\"hoc-Deva-IN\",\"hoj\":\"hoj-Deva-IN\",\"hot\":\"hot-Latn-ZZ\",\"hr\":\"hr-Latn-HR\",\"hsb\":\"hsb-Latn-DE\",\"hsn\":\"hsn-Hans-CN\",\"ht\":\"ht-Latn-HT\",\"hu\":\"hu-Latn-HU\",\"hui\":\"hui-Latn-ZZ\",\"hy\":\"hy-Armn-AM\",\"hz\":\"hz-Latn-NA\",\"ia\":\"ia-Latn-001\",\"ian\":\"ian-Latn-ZZ\",\"iar\":\"iar-Latn-ZZ\",\"iba\":\"iba-Latn-MY\",\"ibb\":\"ibb-Latn-NG\",\"iby\":\"iby-Latn-ZZ\",\"ica\":\"ica-Latn-ZZ\",\"ich\":\"ich-Latn-ZZ\",\"id\":\"id-Latn-ID\",\"idd\":\"idd-Latn-ZZ\",\"idi\":\"idi-Latn-ZZ\",\"idu\":\"idu-Latn-ZZ\",\"ife\":\"ife-Latn-TG\",\"ig\":\"ig-Latn-NG\",\"igb\":\"igb-Latn-ZZ\",\"ige\":\"ige-Latn-ZZ\",\"ii\":\"ii-Yiii-CN\",\"ijj\":\"ijj-Latn-ZZ\",\"ik\":\"ik-Latn-US\",\"ikk\":\"ikk-Latn-ZZ\",\"ikt\":\"ikt-Latn-CA\",\"ikw\":\"ikw-Latn-ZZ\",\"ikx\":\"ikx-Latn-ZZ\",\"ilo\":\"ilo-Latn-PH\",\"imo\":\"imo-Latn-ZZ\",\"in\":\"in-Latn-ID\",\"inh\":\"inh-Cyrl-RU\",\"io\":\"io-Latn-001\",\"iou\":\"iou-Latn-ZZ\",\"iri\":\"iri-Latn-ZZ\",\"is\":\"is-Latn-IS\",\"it\":\"it-Latn-IT\",\"iu\":\"iu-Cans-CA\",\"iw\":\"iw-Hebr-IL\",\"iwm\":\"iwm-Latn-ZZ\",\"iws\":\"iws-Latn-ZZ\",\"izh\":\"izh-Latn-RU\",\"izi\":\"izi-Latn-ZZ\",\"ja\":\"ja-Jpan-JP\",\"jab\":\"jab-Latn-ZZ\",\"jam\":\"jam-Latn-JM\",\"jbo\":\"jbo-Latn-001\",\"jbu\":\"jbu-Latn-ZZ\",\"jen\":\"jen-Latn-ZZ\",\"jgk\":\"jgk-Latn-ZZ\",\"jgo\":\"jgo-Latn-CM\",\"ji\":\"ji-Hebr-UA\",\"jib\":\"jib-Latn-ZZ\",\"jmc\":\"jmc-Latn-TZ\",\"jml\":\"jml-Deva-NP\",\"jra\":\"jra-Latn-ZZ\",\"jut\":\"jut-Latn-DK\",\"jv\":\"jv-Latn-ID\",\"jw\":\"jw-Latn-ID\",\"ka\":\"ka-Geor-GE\",\"kaa\":\"kaa-Cyrl-UZ\",\"kab\":\"kab-Latn-DZ\",\"kac\":\"kac-Latn-MM\",\"kad\":\"kad-Latn-ZZ\",\"kai\":\"kai-Latn-ZZ\",\"kaj\":\"kaj-Latn-NG\",\"kam\":\"kam-Latn-KE\",\"kao\":\"kao-Latn-ML\",\"kbd\":\"kbd-Cyrl-RU\",\"kbm\":\"kbm-Latn-ZZ\",\"kbp\":\"kbp-Latn-ZZ\",\"kbq\":\"kbq-Latn-ZZ\",\"kbx\":\"kbx-Latn-ZZ\",\"kby\":\"kby-Arab-NE\",\"kcg\":\"kcg-Latn-NG\",\"kck\":\"kck-Latn-ZW\",\"kcl\":\"kcl-Latn-ZZ\",\"kct\":\"kct-Latn-ZZ\",\"kde\":\"kde-Latn-TZ\",\"kdh\":\"kdh-Arab-TG\",\"kdl\":\"kdl-Latn-ZZ\",\"kdt\":\"kdt-Thai-TH\",\"kea\":\"kea-Latn-CV\",\"ken\":\"ken-Latn-CM\",\"kez\":\"kez-Latn-ZZ\",\"kfo\":\"kfo-Latn-CI\",\"kfr\":\"kfr-Deva-IN\",\"kfy\":\"kfy-Deva-IN\",\"kg\":\"kg-Latn-CD\",\"kge\":\"kge-Latn-ID\",\"kgf\":\"kgf-Latn-ZZ\",\"kgp\":\"kgp-Latn-BR\",\"kha\":\"kha-Latn-IN\",\"khb\":\"khb-Talu-CN\",\"khn\":\"khn-Deva-IN\",\"khq\":\"khq-Latn-ML\",\"khs\":\"khs-Latn-ZZ\",\"kht\":\"kht-Mymr-IN\",\"khw\":\"khw-Arab-PK\",\"khz\":\"khz-Latn-ZZ\",\"ki\":\"ki-Latn-KE\",\"kij\":\"kij-Latn-ZZ\",\"kiu\":\"kiu-Latn-TR\",\"kiw\":\"kiw-Latn-ZZ\",\"kj\":\"kj-Latn-NA\",\"kjd\":\"kjd-Latn-ZZ\",\"kjg\":\"kjg-Laoo-LA\",\"kjs\":\"kjs-Latn-ZZ\",\"kjy\":\"kjy-Latn-ZZ\",\"kk\":\"kk-Cyrl-KZ\",\"kk-AF\":\"kk-Arab-AF\",\"kk-Arab\":\"kk-Arab-CN\",\"kk-CN\":\"kk-Arab-CN\",\"kk-IR\":\"kk-Arab-IR\",\"kk-MN\":\"kk-Arab-MN\",\"kkc\":\"kkc-Latn-ZZ\",\"kkj\":\"kkj-Latn-CM\",\"kl\":\"kl-Latn-GL\",\"kln\":\"kln-Latn-KE\",\"klq\":\"klq-Latn-ZZ\",\"klt\":\"klt-Latn-ZZ\",\"klx\":\"klx-Latn-ZZ\",\"km\":\"km-Khmr-KH\",\"kmb\":\"kmb-Latn-AO\",\"kmh\":\"kmh-Latn-ZZ\",\"kmo\":\"kmo-Latn-ZZ\",\"kms\":\"kms-Latn-ZZ\",\"kmu\":\"kmu-Latn-ZZ\",\"kmw\":\"kmw-Latn-ZZ\",\"kn\":\"kn-Knda-IN\",\"knf\":\"knf-Latn-GW\",\"knp\":\"knp-Latn-ZZ\",\"ko\":\"ko-Kore-KR\",\"koi\":\"koi-Cyrl-RU\",\"kok\":\"kok-Deva-IN\",\"kol\":\"kol-Latn-ZZ\",\"kos\":\"kos-Latn-FM\",\"koz\":\"koz-Latn-ZZ\",\"kpe\":\"kpe-Latn-LR\",\"kpf\":\"kpf-Latn-ZZ\",\"kpo\":\"kpo-Latn-ZZ\",\"kpr\":\"kpr-Latn-ZZ\",\"kpx\":\"kpx-Latn-ZZ\",\"kqb\":\"kqb-Latn-ZZ\",\"kqf\":\"kqf-Latn-ZZ\",\"kqs\":\"kqs-Latn-ZZ\",\"kqy\":\"kqy-Ethi-ZZ\",\"kr\":\"kr-Latn-ZZ\",\"krc\":\"krc-Cyrl-RU\",\"kri\":\"kri-Latn-SL\",\"krj\":\"krj-Latn-PH\",\"krl\":\"krl-Latn-RU\",\"krs\":\"krs-Latn-ZZ\",\"kru\":\"kru-Deva-IN\",\"ks\":\"ks-Arab-IN\",\"ksb\":\"ksb-Latn-TZ\",\"ksd\":\"ksd-Latn-ZZ\",\"ksf\":\"ksf-Latn-CM\",\"ksh\":\"ksh-Latn-DE\",\"ksj\":\"ksj-Latn-ZZ\",\"ksr\":\"ksr-Latn-ZZ\",\"ktb\":\"ktb-Ethi-ZZ\",\"ktm\":\"ktm-Latn-ZZ\",\"kto\":\"kto-Latn-ZZ\",\"ktr\":\"ktr-Latn-MY\",\"ku\":\"ku-Latn-TR\",\"ku-Arab\":\"ku-Arab-IQ\",\"ku-LB\":\"ku-Arab-LB\",\"kub\":\"kub-Latn-ZZ\",\"kud\":\"kud-Latn-ZZ\",\"kue\":\"kue-Latn-ZZ\",\"kuj\":\"kuj-Latn-ZZ\",\"kum\":\"kum-Cyrl-RU\",\"kun\":\"kun-Latn-ZZ\",\"kup\":\"kup-Latn-ZZ\",\"kus\":\"kus-Latn-ZZ\",\"kv\":\"kv-Cyrl-RU\",\"kvg\":\"kvg-Latn-ZZ\",\"kvr\":\"kvr-Latn-ID\",\"kvx\":\"kvx-Arab-PK\",\"kw\":\"kw-Latn-GB\",\"kwj\":\"kwj-Latn-ZZ\",\"kwo\":\"kwo-Latn-ZZ\",\"kwq\":\"kwq-Latn-ZZ\",\"kxa\":\"kxa-Latn-ZZ\",\"kxc\":\"kxc-Ethi-ZZ\",\"kxe\":\"kxe-Latn-ZZ\",\"kxm\":\"kxm-Thai-TH\",\"kxp\":\"kxp-Arab-PK\",\"kxw\":\"kxw-Latn-ZZ\",\"kxz\":\"kxz-Latn-ZZ\",\"ky\":\"ky-Cyrl-KG\",\"ky-Arab\":\"ky-Arab-CN\",\"ky-CN\":\"ky-Arab-CN\",\"ky-Latn\":\"ky-Latn-TR\",\"ky-TR\":\"ky-Latn-TR\",\"kye\":\"kye-Latn-ZZ\",\"kyx\":\"kyx-Latn-ZZ\",\"kzj\":\"kzj-Latn-MY\",\"kzr\":\"kzr-Latn-ZZ\",\"kzt\":\"kzt-Latn-MY\",\"la\":\"la-Latn-VA\",\"lab\":\"lab-Lina-GR\",\"lad\":\"lad-Hebr-IL\",\"lag\":\"lag-Latn-TZ\",\"lah\":\"lah-Arab-PK\",\"laj\":\"laj-Latn-UG\",\"las\":\"las-Latn-ZZ\",\"lb\":\"lb-Latn-LU\",\"lbe\":\"lbe-Cyrl-RU\",\"lbu\":\"lbu-Latn-ZZ\",\"lbw\":\"lbw-Latn-ID\",\"lcm\":\"lcm-Latn-ZZ\",\"lcp\":\"lcp-Thai-CN\",\"ldb\":\"ldb-Latn-ZZ\",\"led\":\"led-Latn-ZZ\",\"lee\":\"lee-Latn-ZZ\",\"lem\":\"lem-Latn-ZZ\",\"lep\":\"lep-Lepc-IN\",\"leq\":\"leq-Latn-ZZ\",\"leu\":\"leu-Latn-ZZ\",\"lez\":\"lez-Cyrl-RU\",\"lg\":\"lg-Latn-UG\",\"lgg\":\"lgg-Latn-ZZ\",\"li\":\"li-Latn-NL\",\"lia\":\"lia-Latn-ZZ\",\"lid\":\"lid-Latn-ZZ\",\"lif\":\"lif-Deva-NP\",\"lif-Limb\":\"lif-Limb-IN\",\"lig\":\"lig-Latn-ZZ\",\"lih\":\"lih-Latn-ZZ\",\"lij\":\"lij-Latn-IT\",\"lis\":\"lis-Lisu-CN\",\"ljp\":\"ljp-Latn-ID\",\"lki\":\"lki-Arab-IR\",\"lkt\":\"lkt-Latn-US\",\"lle\":\"lle-Latn-ZZ\",\"lln\":\"lln-Latn-ZZ\",\"lmn\":\"lmn-Telu-IN\",\"lmo\":\"lmo-Latn-IT\",\"lmp\":\"lmp-Latn-ZZ\",\"ln\":\"ln-Latn-CD\",\"lns\":\"lns-Latn-ZZ\",\"lnu\":\"lnu-Latn-ZZ\",\"lo\":\"lo-Laoo-LA\",\"loj\":\"loj-Latn-ZZ\",\"lok\":\"lok-Latn-ZZ\",\"lol\":\"lol-Latn-CD\",\"lor\":\"lor-Latn-ZZ\",\"los\":\"los-Latn-ZZ\",\"loz\":\"loz-Latn-ZM\",\"lrc\":\"lrc-Arab-IR\",\"lt\":\"lt-Latn-LT\",\"ltg\":\"ltg-Latn-LV\",\"lu\":\"lu-Latn-CD\",\"lua\":\"lua-Latn-CD\",\"luo\":\"luo-Latn-KE\",\"luy\":\"luy-Latn-KE\",\"luz\":\"luz-Arab-IR\",\"lv\":\"lv-Latn-LV\",\"lwl\":\"lwl-Thai-TH\",\"lzh\":\"lzh-Hans-CN\",\"lzz\":\"lzz-Latn-TR\",\"mad\":\"mad-Latn-ID\",\"maf\":\"maf-Latn-CM\",\"mag\":\"mag-Deva-IN\",\"mai\":\"mai-Deva-IN\",\"mak\":\"mak-Latn-ID\",\"man\":\"man-Latn-GM\",\"man-GN\":\"man-Nkoo-GN\",\"man-Nkoo\":\"man-Nkoo-GN\",\"mas\":\"mas-Latn-KE\",\"maw\":\"maw-Latn-ZZ\",\"maz\":\"maz-Latn-MX\",\"mbh\":\"mbh-Latn-ZZ\",\"mbo\":\"mbo-Latn-ZZ\",\"mbq\":\"mbq-Latn-ZZ\",\"mbu\":\"mbu-Latn-ZZ\",\"mbw\":\"mbw-Latn-ZZ\",\"mci\":\"mci-Latn-ZZ\",\"mcp\":\"mcp-Latn-ZZ\",\"mcq\":\"mcq-Latn-ZZ\",\"mcr\":\"mcr-Latn-ZZ\",\"mcu\":\"mcu-Latn-ZZ\",\"mda\":\"mda-Latn-ZZ\",\"mde\":\"mde-Arab-ZZ\",\"mdf\":\"mdf-Cyrl-RU\",\"mdh\":\"mdh-Latn-PH\",\"mdj\":\"mdj-Latn-ZZ\",\"mdr\":\"mdr-Latn-ID\",\"mdx\":\"mdx-Ethi-ZZ\",\"med\":\"med-Latn-ZZ\",\"mee\":\"mee-Latn-ZZ\",\"mek\":\"mek-Latn-ZZ\",\"men\":\"men-Latn-SL\",\"mer\":\"mer-Latn-KE\",\"met\":\"met-Latn-ZZ\",\"meu\":\"meu-Latn-ZZ\",\"mfa\":\"mfa-Arab-TH\",\"mfe\":\"mfe-Latn-MU\",\"mfn\":\"mfn-Latn-ZZ\",\"mfo\":\"mfo-Latn-ZZ\",\"mfq\":\"mfq-Latn-ZZ\",\"mg\":\"mg-Latn-MG\",\"mgh\":\"mgh-Latn-MZ\",\"mgl\":\"mgl-Latn-ZZ\",\"mgo\":\"mgo-Latn-CM\",\"mgp\":\"mgp-Deva-NP\",\"mgy\":\"mgy-Latn-TZ\",\"mh\":\"mh-Latn-MH\",\"mhi\":\"mhi-Latn-ZZ\",\"mhl\":\"mhl-Latn-ZZ\",\"mi\":\"mi-Latn-NZ\",\"mif\":\"mif-Latn-ZZ\",\"min\":\"min-Latn-ID\",\"mis\":\"mis-Hatr-IQ\",\"mis-Medf\":\"mis-Medf-NG\",\"miw\":\"miw-Latn-ZZ\",\"mk\":\"mk-Cyrl-MK\",\"mki\":\"mki-Arab-ZZ\",\"mkl\":\"mkl-Latn-ZZ\",\"mkp\":\"mkp-Latn-ZZ\",\"mkw\":\"mkw-Latn-ZZ\",\"ml\":\"ml-Mlym-IN\",\"mle\":\"mle-Latn-ZZ\",\"mlp\":\"mlp-Latn-ZZ\",\"mls\":\"mls-Latn-SD\",\"mmo\":\"mmo-Latn-ZZ\",\"mmu\":\"mmu-Latn-ZZ\",\"mmx\":\"mmx-Latn-ZZ\",\"mn\":\"mn-Cyrl-MN\",\"mn-CN\":\"mn-Mong-CN\",\"mn-Mong\":\"mn-Mong-CN\",\"mna\":\"mna-Latn-ZZ\",\"mnf\":\"mnf-Latn-ZZ\",\"mni\":\"mni-Beng-IN\",\"mnw\":\"mnw-Mymr-MM\",\"mo\":\"mo-Latn-RO\",\"moa\":\"moa-Latn-ZZ\",\"moe\":\"moe-Latn-CA\",\"moh\":\"moh-Latn-CA\",\"mos\":\"mos-Latn-BF\",\"mox\":\"mox-Latn-ZZ\",\"mpp\":\"mpp-Latn-ZZ\",\"mps\":\"mps-Latn-ZZ\",\"mpt\":\"mpt-Latn-ZZ\",\"mpx\":\"mpx-Latn-ZZ\",\"mql\":\"mql-Latn-ZZ\",\"mr\":\"mr-Deva-IN\",\"mrd\":\"mrd-Deva-NP\",\"mrj\":\"mrj-Cyrl-RU\",\"mro\":\"mro-Mroo-BD\",\"ms\":\"ms-Latn-MY\",\"ms-CC\":\"ms-Arab-CC\",\"ms-ID\":\"ms-Arab-ID\",\"mt\":\"mt-Latn-MT\",\"mtc\":\"mtc-Latn-ZZ\",\"mtf\":\"mtf-Latn-ZZ\",\"mti\":\"mti-Latn-ZZ\",\"mtr\":\"mtr-Deva-IN\",\"mua\":\"mua-Latn-CM\",\"mur\":\"mur-Latn-ZZ\",\"mus\":\"mus-Latn-US\",\"mva\":\"mva-Latn-ZZ\",\"mvn\":\"mvn-Latn-ZZ\",\"mvy\":\"mvy-Arab-PK\",\"mwk\":\"mwk-Latn-ML\",\"mwr\":\"mwr-Deva-IN\",\"mwv\":\"mwv-Latn-ID\",\"mww\":\"mww-Hmnp-US\",\"mxc\":\"mxc-Latn-ZW\",\"mxm\":\"mxm-Latn-ZZ\",\"my\":\"my-Mymr-MM\",\"myk\":\"myk-Latn-ZZ\",\"mym\":\"mym-Ethi-ZZ\",\"myv\":\"myv-Cyrl-RU\",\"myw\":\"myw-Latn-ZZ\",\"myx\":\"myx-Latn-UG\",\"myz\":\"myz-Mand-IR\",\"mzk\":\"mzk-Latn-ZZ\",\"mzm\":\"mzm-Latn-ZZ\",\"mzn\":\"mzn-Arab-IR\",\"mzp\":\"mzp-Latn-ZZ\",\"mzw\":\"mzw-Latn-ZZ\",\"mzz\":\"mzz-Latn-ZZ\",\"na\":\"na-Latn-NR\",\"nac\":\"nac-Latn-ZZ\",\"naf\":\"naf-Latn-ZZ\",\"nak\":\"nak-Latn-ZZ\",\"nan\":\"nan-Hans-CN\",\"nap\":\"nap-Latn-IT\",\"naq\":\"naq-Latn-NA\",\"nas\":\"nas-Latn-ZZ\",\"nb\":\"nb-Latn-NO\",\"nca\":\"nca-Latn-ZZ\",\"nce\":\"nce-Latn-ZZ\",\"ncf\":\"ncf-Latn-ZZ\",\"nch\":\"nch-Latn-MX\",\"nco\":\"nco-Latn-ZZ\",\"ncu\":\"ncu-Latn-ZZ\",\"nd\":\"nd-Latn-ZW\",\"ndc\":\"ndc-Latn-MZ\",\"nds\":\"nds-Latn-DE\",\"ne\":\"ne-Deva-NP\",\"neb\":\"neb-Latn-ZZ\",\"new\":\"new-Deva-NP\",\"nex\":\"nex-Latn-ZZ\",\"nfr\":\"nfr-Latn-ZZ\",\"ng\":\"ng-Latn-NA\",\"nga\":\"nga-Latn-ZZ\",\"ngb\":\"ngb-Latn-ZZ\",\"ngl\":\"ngl-Latn-MZ\",\"nhb\":\"nhb-Latn-ZZ\",\"nhe\":\"nhe-Latn-MX\",\"nhw\":\"nhw-Latn-MX\",\"nif\":\"nif-Latn-ZZ\",\"nii\":\"nii-Latn-ZZ\",\"nij\":\"nij-Latn-ID\",\"nin\":\"nin-Latn-ZZ\",\"niu\":\"niu-Latn-NU\",\"niy\":\"niy-Latn-ZZ\",\"niz\":\"niz-Latn-ZZ\",\"njo\":\"njo-Latn-IN\",\"nkg\":\"nkg-Latn-ZZ\",\"nko\":\"nko-Latn-ZZ\",\"nl\":\"nl-Latn-NL\",\"nmg\":\"nmg-Latn-CM\",\"nmz\":\"nmz-Latn-ZZ\",\"nn\":\"nn-Latn-NO\",\"nnf\":\"nnf-Latn-ZZ\",\"nnh\":\"nnh-Latn-CM\",\"nnk\":\"nnk-Latn-ZZ\",\"nnm\":\"nnm-Latn-ZZ\",\"nnp\":\"nnp-Wcho-IN\",\"no\":\"no-Latn-NO\",\"nod\":\"nod-Lana-TH\",\"noe\":\"noe-Deva-IN\",\"non\":\"non-Runr-SE\",\"nop\":\"nop-Latn-ZZ\",\"nou\":\"nou-Latn-ZZ\",\"nqo\":\"nqo-Nkoo-GN\",\"nr\":\"nr-Latn-ZA\",\"nrb\":\"nrb-Latn-ZZ\",\"nsk\":\"nsk-Cans-CA\",\"nsn\":\"nsn-Latn-ZZ\",\"nso\":\"nso-Latn-ZA\",\"nss\":\"nss-Latn-ZZ\",\"ntm\":\"ntm-Latn-ZZ\",\"ntr\":\"ntr-Latn-ZZ\",\"nui\":\"nui-Latn-ZZ\",\"nup\":\"nup-Latn-ZZ\",\"nus\":\"nus-Latn-SS\",\"nuv\":\"nuv-Latn-ZZ\",\"nux\":\"nux-Latn-ZZ\",\"nv\":\"nv-Latn-US\",\"nwb\":\"nwb-Latn-ZZ\",\"nxq\":\"nxq-Latn-CN\",\"nxr\":\"nxr-Latn-ZZ\",\"ny\":\"ny-Latn-MW\",\"nym\":\"nym-Latn-TZ\",\"nyn\":\"nyn-Latn-UG\",\"nzi\":\"nzi-Latn-GH\",\"oc\":\"oc-Latn-FR\",\"ogc\":\"ogc-Latn-ZZ\",\"okr\":\"okr-Latn-ZZ\",\"okv\":\"okv-Latn-ZZ\",\"om\":\"om-Latn-ET\",\"ong\":\"ong-Latn-ZZ\",\"onn\":\"onn-Latn-ZZ\",\"ons\":\"ons-Latn-ZZ\",\"opm\":\"opm-Latn-ZZ\",\"or\":\"or-Orya-IN\",\"oro\":\"oro-Latn-ZZ\",\"oru\":\"oru-Arab-ZZ\",\"os\":\"os-Cyrl-GE\",\"osa\":\"osa-Osge-US\",\"ota\":\"ota-Arab-ZZ\",\"otk\":\"otk-Orkh-MN\",\"ozm\":\"ozm-Latn-ZZ\",\"pa\":\"pa-Guru-IN\",\"pa-Arab\":\"pa-Arab-PK\",\"pa-PK\":\"pa-Arab-PK\",\"pag\":\"pag-Latn-PH\",\"pal\":\"pal-Phli-IR\",\"pal-Phlp\":\"pal-Phlp-CN\",\"pam\":\"pam-Latn-PH\",\"pap\":\"pap-Latn-AW\",\"pau\":\"pau-Latn-PW\",\"pbi\":\"pbi-Latn-ZZ\",\"pcd\":\"pcd-Latn-FR\",\"pcm\":\"pcm-Latn-NG\",\"pdc\":\"pdc-Latn-US\",\"pdt\":\"pdt-Latn-CA\",\"ped\":\"ped-Latn-ZZ\",\"peo\":\"peo-Xpeo-IR\",\"pex\":\"pex-Latn-ZZ\",\"pfl\":\"pfl-Latn-DE\",\"phl\":\"phl-Arab-ZZ\",\"phn\":\"phn-Phnx-LB\",\"pil\":\"pil-Latn-ZZ\",\"pip\":\"pip-Latn-ZZ\",\"pka\":\"pka-Brah-IN\",\"pko\":\"pko-Latn-KE\",\"pl\":\"pl-Latn-PL\",\"pla\":\"pla-Latn-ZZ\",\"pms\":\"pms-Latn-IT\",\"png\":\"png-Latn-ZZ\",\"pnn\":\"pnn-Latn-ZZ\",\"pnt\":\"pnt-Grek-GR\",\"pon\":\"pon-Latn-FM\",\"ppa\":\"ppa-Deva-IN\",\"ppo\":\"ppo-Latn-ZZ\",\"pra\":\"pra-Khar-PK\",\"prd\":\"prd-Arab-IR\",\"prg\":\"prg-Latn-001\",\"ps\":\"ps-Arab-AF\",\"pss\":\"pss-Latn-ZZ\",\"pt\":\"pt-Latn-BR\",\"ptp\":\"ptp-Latn-ZZ\",\"puu\":\"puu-Latn-GA\",\"pwa\":\"pwa-Latn-ZZ\",\"qu\":\"qu-Latn-PE\",\"quc\":\"quc-Latn-GT\",\"qug\":\"qug-Latn-EC\",\"rai\":\"rai-Latn-ZZ\",\"raj\":\"raj-Deva-IN\",\"rao\":\"rao-Latn-ZZ\",\"rcf\":\"rcf-Latn-RE\",\"rej\":\"rej-Latn-ID\",\"rel\":\"rel-Latn-ZZ\",\"res\":\"res-Latn-ZZ\",\"rgn\":\"rgn-Latn-IT\",\"rhg\":\"rhg-Arab-MM\",\"ria\":\"ria-Latn-IN\",\"rif\":\"rif-Tfng-MA\",\"rif-NL\":\"rif-Latn-NL\",\"rjs\":\"rjs-Deva-NP\",\"rkt\":\"rkt-Beng-BD\",\"rm\":\"rm-Latn-CH\",\"rmf\":\"rmf-Latn-FI\",\"rmo\":\"rmo-Latn-CH\",\"rmt\":\"rmt-Arab-IR\",\"rmu\":\"rmu-Latn-SE\",\"rn\":\"rn-Latn-BI\",\"rna\":\"rna-Latn-ZZ\",\"rng\":\"rng-Latn-MZ\",\"ro\":\"ro-Latn-RO\",\"rob\":\"rob-Latn-ID\",\"rof\":\"rof-Latn-TZ\",\"roo\":\"roo-Latn-ZZ\",\"rro\":\"rro-Latn-ZZ\",\"rtm\":\"rtm-Latn-FJ\",\"ru\":\"ru-Cyrl-RU\",\"rue\":\"rue-Cyrl-UA\",\"rug\":\"rug-Latn-SB\",\"rw\":\"rw-Latn-RW\",\"rwk\":\"rwk-Latn-TZ\",\"rwo\":\"rwo-Latn-ZZ\",\"ryu\":\"ryu-Kana-JP\",\"sa\":\"sa-Deva-IN\",\"saf\":\"saf-Latn-GH\",\"sah\":\"sah-Cyrl-RU\",\"saq\":\"saq-Latn-KE\",\"sas\":\"sas-Latn-ID\",\"sat\":\"sat-Latn-IN\",\"sav\":\"sav-Latn-SN\",\"saz\":\"saz-Saur-IN\",\"sba\":\"sba-Latn-ZZ\",\"sbe\":\"sbe-Latn-ZZ\",\"sbp\":\"sbp-Latn-TZ\",\"sc\":\"sc-Latn-IT\",\"sck\":\"sck-Deva-IN\",\"scl\":\"scl-Arab-ZZ\",\"scn\":\"scn-Latn-IT\",\"sco\":\"sco-Latn-GB\",\"scs\":\"scs-Latn-CA\",\"sd\":\"sd-Arab-PK\",\"sd-Deva\":\"sd-Deva-IN\",\"sd-Khoj\":\"sd-Khoj-IN\",\"sd-Sind\":\"sd-Sind-IN\",\"sdc\":\"sdc-Latn-IT\",\"sdh\":\"sdh-Arab-IR\",\"se\":\"se-Latn-NO\",\"sef\":\"sef-Latn-CI\",\"seh\":\"seh-Latn-MZ\",\"sei\":\"sei-Latn-MX\",\"ses\":\"ses-Latn-ML\",\"sg\":\"sg-Latn-CF\",\"sga\":\"sga-Ogam-IE\",\"sgs\":\"sgs-Latn-LT\",\"sgw\":\"sgw-Ethi-ZZ\",\"sgz\":\"sgz-Latn-ZZ\",\"shi\":\"shi-Tfng-MA\",\"shk\":\"shk-Latn-ZZ\",\"shn\":\"shn-Mymr-MM\",\"shu\":\"shu-Arab-ZZ\",\"si\":\"si-Sinh-LK\",\"sid\":\"sid-Latn-ET\",\"sig\":\"sig-Latn-ZZ\",\"sil\":\"sil-Latn-ZZ\",\"sim\":\"sim-Latn-ZZ\",\"sjr\":\"sjr-Latn-ZZ\",\"sk\":\"sk-Latn-SK\",\"skc\":\"skc-Latn-ZZ\",\"skr\":\"skr-Arab-PK\",\"sks\":\"sks-Latn-ZZ\",\"sl\":\"sl-Latn-SI\",\"sld\":\"sld-Latn-ZZ\",\"sli\":\"sli-Latn-PL\",\"sll\":\"sll-Latn-ZZ\",\"sly\":\"sly-Latn-ID\",\"sm\":\"sm-Latn-WS\",\"sma\":\"sma-Latn-SE\",\"smj\":\"smj-Latn-SE\",\"smn\":\"smn-Latn-FI\",\"smp\":\"smp-Samr-IL\",\"smq\":\"smq-Latn-ZZ\",\"sms\":\"sms-Latn-FI\",\"sn\":\"sn-Latn-ZW\",\"snc\":\"snc-Latn-ZZ\",\"snk\":\"snk-Latn-ML\",\"snp\":\"snp-Latn-ZZ\",\"snx\":\"snx-Latn-ZZ\",\"sny\":\"sny-Latn-ZZ\",\"so\":\"so-Latn-SO\",\"sog\":\"sog-Sogd-UZ\",\"sok\":\"sok-Latn-ZZ\",\"soq\":\"soq-Latn-ZZ\",\"sou\":\"sou-Thai-TH\",\"soy\":\"soy-Latn-ZZ\",\"spd\":\"spd-Latn-ZZ\",\"spl\":\"spl-Latn-ZZ\",\"sps\":\"sps-Latn-ZZ\",\"sq\":\"sq-Latn-AL\",\"sr\":\"sr-Cyrl-RS\",\"sr-ME\":\"sr-Latn-ME\",\"sr-RO\":\"sr-Latn-RO\",\"sr-RU\":\"sr-Latn-RU\",\"sr-TR\":\"sr-Latn-TR\",\"srb\":\"srb-Sora-IN\",\"srn\":\"srn-Latn-SR\",\"srr\":\"srr-Latn-SN\",\"srx\":\"srx-Deva-IN\",\"ss\":\"ss-Latn-ZA\",\"ssd\":\"ssd-Latn-ZZ\",\"ssg\":\"ssg-Latn-ZZ\",\"ssy\":\"ssy-Latn-ER\",\"st\":\"st-Latn-ZA\",\"stk\":\"stk-Latn-ZZ\",\"stq\":\"stq-Latn-DE\",\"su\":\"su-Latn-ID\",\"sua\":\"sua-Latn-ZZ\",\"sue\":\"sue-Latn-ZZ\",\"suk\":\"suk-Latn-TZ\",\"sur\":\"sur-Latn-ZZ\",\"sus\":\"sus-Latn-GN\",\"sv\":\"sv-Latn-SE\",\"sw\":\"sw-Latn-TZ\",\"swb\":\"swb-Arab-YT\",\"swc\":\"swc-Latn-CD\",\"swg\":\"swg-Latn-DE\",\"swp\":\"swp-Latn-ZZ\",\"swv\":\"swv-Deva-IN\",\"sxn\":\"sxn-Latn-ID\",\"sxw\":\"sxw-Latn-ZZ\",\"syl\":\"syl-Beng-BD\",\"syr\":\"syr-Syrc-IQ\",\"szl\":\"szl-Latn-PL\",\"ta\":\"ta-Taml-IN\",\"taj\":\"taj-Deva-NP\",\"tal\":\"tal-Latn-ZZ\",\"tan\":\"tan-Latn-ZZ\",\"taq\":\"taq-Latn-ZZ\",\"tbc\":\"tbc-Latn-ZZ\",\"tbd\":\"tbd-Latn-ZZ\",\"tbf\":\"tbf-Latn-ZZ\",\"tbg\":\"tbg-Latn-ZZ\",\"tbo\":\"tbo-Latn-ZZ\",\"tbw\":\"tbw-Latn-PH\",\"tbz\":\"tbz-Latn-ZZ\",\"tci\":\"tci-Latn-ZZ\",\"tcy\":\"tcy-Knda-IN\",\"tdd\":\"tdd-Tale-CN\",\"tdg\":\"tdg-Deva-NP\",\"tdh\":\"tdh-Deva-NP\",\"tdu\":\"tdu-Latn-MY\",\"te\":\"te-Telu-IN\",\"ted\":\"ted-Latn-ZZ\",\"tem\":\"tem-Latn-SL\",\"teo\":\"teo-Latn-UG\",\"tet\":\"tet-Latn-TL\",\"tfi\":\"tfi-Latn-ZZ\",\"tg\":\"tg-Cyrl-TJ\",\"tg-Arab\":\"tg-Arab-PK\",\"tg-PK\":\"tg-Arab-PK\",\"tgc\":\"tgc-Latn-ZZ\",\"tgo\":\"tgo-Latn-ZZ\",\"tgu\":\"tgu-Latn-ZZ\",\"th\":\"th-Thai-TH\",\"thl\":\"thl-Deva-NP\",\"thq\":\"thq-Deva-NP\",\"thr\":\"thr-Deva-NP\",\"ti\":\"ti-Ethi-ET\",\"tif\":\"tif-Latn-ZZ\",\"tig\":\"tig-Ethi-ER\",\"tik\":\"tik-Latn-ZZ\",\"tim\":\"tim-Latn-ZZ\",\"tio\":\"tio-Latn-ZZ\",\"tiv\":\"tiv-Latn-NG\",\"tk\":\"tk-Latn-TM\",\"tkl\":\"tkl-Latn-TK\",\"tkr\":\"tkr-Latn-AZ\",\"tkt\":\"tkt-Deva-NP\",\"tl\":\"tl-Latn-PH\",\"tlf\":\"tlf-Latn-ZZ\",\"tlx\":\"tlx-Latn-ZZ\",\"tly\":\"tly-Latn-AZ\",\"tmh\":\"tmh-Latn-NE\",\"tmy\":\"tmy-Latn-ZZ\",\"tn\":\"tn-Latn-ZA\",\"tnh\":\"tnh-Latn-ZZ\",\"to\":\"to-Latn-TO\",\"tof\":\"tof-Latn-ZZ\",\"tog\":\"tog-Latn-MW\",\"toq\":\"toq-Latn-ZZ\",\"tpi\":\"tpi-Latn-PG\",\"tpm\":\"tpm-Latn-ZZ\",\"tpz\":\"tpz-Latn-ZZ\",\"tqo\":\"tqo-Latn-ZZ\",\"tr\":\"tr-Latn-TR\",\"tru\":\"tru-Latn-TR\",\"trv\":\"trv-Latn-TW\",\"trw\":\"trw-Arab-ZZ\",\"ts\":\"ts-Latn-ZA\",\"tsd\":\"tsd-Grek-GR\",\"tsf\":\"tsf-Deva-NP\",\"tsg\":\"tsg-Latn-PH\",\"tsj\":\"tsj-Tibt-BT\",\"tsw\":\"tsw-Latn-ZZ\",\"tt\":\"tt-Cyrl-RU\",\"ttd\":\"ttd-Latn-ZZ\",\"tte\":\"tte-Latn-ZZ\",\"ttj\":\"ttj-Latn-UG\",\"ttr\":\"ttr-Latn-ZZ\",\"tts\":\"tts-Thai-TH\",\"ttt\":\"ttt-Latn-AZ\",\"tuh\":\"tuh-Latn-ZZ\",\"tul\":\"tul-Latn-ZZ\",\"tum\":\"tum-Latn-MW\",\"tuq\":\"tuq-Latn-ZZ\",\"tvd\":\"tvd-Latn-ZZ\",\"tvl\":\"tvl-Latn-TV\",\"tvu\":\"tvu-Latn-ZZ\",\"twh\":\"twh-Latn-ZZ\",\"twq\":\"twq-Latn-NE\",\"txg\":\"txg-Tang-CN\",\"ty\":\"ty-Latn-PF\",\"tya\":\"tya-Latn-ZZ\",\"tyv\":\"tyv-Cyrl-RU\",\"tzm\":\"tzm-Latn-MA\",\"ubu\":\"ubu-Latn-ZZ\",\"udm\":\"udm-Cyrl-RU\",\"ug\":\"ug-Arab-CN\",\"ug-Cyrl\":\"ug-Cyrl-KZ\",\"ug-KZ\":\"ug-Cyrl-KZ\",\"ug-MN\":\"ug-Cyrl-MN\",\"uga\":\"uga-Ugar-SY\",\"uk\":\"uk-Cyrl-UA\",\"uli\":\"uli-Latn-FM\",\"umb\":\"umb-Latn-AO\",\"und\":\"en-Latn-US\",\"und-002\":\"en-Latn-NG\",\"und-003\":\"en-Latn-US\",\"und-005\":\"pt-Latn-BR\",\"und-009\":\"en-Latn-AU\",\"und-011\":\"en-Latn-NG\",\"und-013\":\"es-Latn-MX\",\"und-014\":\"sw-Latn-TZ\",\"und-015\":\"ar-Arab-EG\",\"und-017\":\"sw-Latn-CD\",\"und-018\":\"en-Latn-ZA\",\"und-019\":\"en-Latn-US\",\"und-021\":\"en-Latn-US\",\"und-029\":\"es-Latn-CU\",\"und-030\":\"zh-Hans-CN\",\"und-034\":\"hi-Deva-IN\",\"und-035\":\"id-Latn-ID\",\"und-039\":\"it-Latn-IT\",\"und-053\":\"en-Latn-AU\",\"und-054\":\"en-Latn-PG\",\"und-057\":\"en-Latn-GU\",\"und-061\":\"sm-Latn-WS\",\"und-142\":\"zh-Hans-CN\",\"und-143\":\"uz-Latn-UZ\",\"und-145\":\"ar-Arab-SA\",\"und-150\":\"ru-Cyrl-RU\",\"und-151\":\"ru-Cyrl-RU\",\"und-154\":\"en-Latn-GB\",\"und-155\":\"de-Latn-DE\",\"und-202\":\"en-Latn-NG\",\"und-419\":\"es-Latn-419\",\"und-AD\":\"ca-Latn-AD\",\"und-Adlm\":\"ff-Adlm-GN\",\"und-AE\":\"ar-Arab-AE\",\"und-AF\":\"fa-Arab-AF\",\"und-Aghb\":\"lez-Aghb-RU\",\"und-Ahom\":\"aho-Ahom-IN\",\"und-AL\":\"sq-Latn-AL\",\"und-AM\":\"hy-Armn-AM\",\"und-AO\":\"pt-Latn-AO\",\"und-AQ\":\"und-Latn-AQ\",\"und-AR\":\"es-Latn-AR\",\"und-Arab\":\"ar-Arab-EG\",\"und-Arab-CC\":\"ms-Arab-CC\",\"und-Arab-CN\":\"ug-Arab-CN\",\"und-Arab-GB\":\"ks-Arab-GB\",\"und-Arab-ID\":\"ms-Arab-ID\",\"und-Arab-IN\":\"ur-Arab-IN\",\"und-Arab-KH\":\"cja-Arab-KH\",\"und-Arab-MM\":\"rhg-Arab-MM\",\"und-Arab-MN\":\"kk-Arab-MN\",\"und-Arab-MU\":\"ur-Arab-MU\",\"und-Arab-NG\":\"ha-Arab-NG\",\"und-Arab-PK\":\"ur-Arab-PK\",\"und-Arab-TG\":\"apd-Arab-TG\",\"und-Arab-TH\":\"mfa-Arab-TH\",\"und-Arab-TJ\":\"fa-Arab-TJ\",\"und-Arab-TR\":\"az-Arab-TR\",\"und-Arab-YT\":\"swb-Arab-YT\",\"und-Armi\":\"arc-Armi-IR\",\"und-Armn\":\"hy-Armn-AM\",\"und-AS\":\"sm-Latn-AS\",\"und-AT\":\"de-Latn-AT\",\"und-Avst\":\"ae-Avst-IR\",\"und-AW\":\"nl-Latn-AW\",\"und-AX\":\"sv-Latn-AX\",\"und-AZ\":\"az-Latn-AZ\",\"und-BA\":\"bs-Latn-BA\",\"und-Bali\":\"ban-Bali-ID\",\"und-Bamu\":\"bax-Bamu-CM\",\"und-Bass\":\"bsq-Bass-LR\",\"und-Batk\":\"bbc-Batk-ID\",\"und-BD\":\"bn-Beng-BD\",\"und-BE\":\"nl-Latn-BE\",\"und-Beng\":\"bn-Beng-BD\",\"und-BF\":\"fr-Latn-BF\",\"und-BG\":\"bg-Cyrl-BG\",\"und-BH\":\"ar-Arab-BH\",\"und-Bhks\":\"sa-Bhks-IN\",\"und-BI\":\"rn-Latn-BI\",\"und-BJ\":\"fr-Latn-BJ\",\"und-BL\":\"fr-Latn-BL\",\"und-BN\":\"ms-Latn-BN\",\"und-BO\":\"es-Latn-BO\",\"und-Bopo\":\"zh-Bopo-TW\",\"und-BQ\":\"pap-Latn-BQ\",\"und-BR\":\"pt-Latn-BR\",\"und-Brah\":\"pka-Brah-IN\",\"und-Brai\":\"fr-Brai-FR\",\"und-BT\":\"dz-Tibt-BT\",\"und-Bugi\":\"bug-Bugi-ID\",\"und-Buhd\":\"bku-Buhd-PH\",\"und-BV\":\"und-Latn-BV\",\"und-BY\":\"be-Cyrl-BY\",\"und-Cakm\":\"ccp-Cakm-BD\",\"und-Cans\":\"cr-Cans-CA\",\"und-Cari\":\"xcr-Cari-TR\",\"und-CD\":\"sw-Latn-CD\",\"und-CF\":\"fr-Latn-CF\",\"und-CG\":\"fr-Latn-CG\",\"und-CH\":\"de-Latn-CH\",\"und-Cham\":\"cjm-Cham-VN\",\"und-Cher\":\"chr-Cher-US\",\"und-CI\":\"fr-Latn-CI\",\"und-CL\":\"es-Latn-CL\",\"und-CM\":\"fr-Latn-CM\",\"und-CN\":\"zh-Hans-CN\",\"und-CO\":\"es-Latn-CO\",\"und-Copt\":\"cop-Copt-EG\",\"und-CP\":\"und-Latn-CP\",\"und-Cprt\":\"grc-Cprt-CY\",\"und-CR\":\"es-Latn-CR\",\"und-CU\":\"es-Latn-CU\",\"und-CV\":\"pt-Latn-CV\",\"und-CW\":\"pap-Latn-CW\",\"und-CY\":\"el-Grek-CY\",\"und-Cyrl\":\"ru-Cyrl-RU\",\"und-Cyrl-AL\":\"mk-Cyrl-AL\",\"und-Cyrl-BA\":\"sr-Cyrl-BA\",\"und-Cyrl-GE\":\"ab-Cyrl-GE\",\"und-Cyrl-GR\":\"mk-Cyrl-GR\",\"und-Cyrl-MD\":\"uk-Cyrl-MD\",\"und-Cyrl-RO\":\"bg-Cyrl-RO\",\"und-Cyrl-SK\":\"uk-Cyrl-SK\",\"und-Cyrl-TR\":\"kbd-Cyrl-TR\",\"und-Cyrl-XK\":\"sr-Cyrl-XK\",\"und-CZ\":\"cs-Latn-CZ\",\"und-DE\":\"de-Latn-DE\",\"und-Deva\":\"hi-Deva-IN\",\"und-Deva-BT\":\"ne-Deva-BT\",\"und-Deva-FJ\":\"hif-Deva-FJ\",\"und-Deva-MU\":\"bho-Deva-MU\",\"und-Deva-PK\":\"btv-Deva-PK\",\"und-DJ\":\"aa-Latn-DJ\",\"und-DK\":\"da-Latn-DK\",\"und-DO\":\"es-Latn-DO\",\"und-Dogr\":\"doi-Dogr-IN\",\"und-Dupl\":\"fr-Dupl-FR\",\"und-DZ\":\"ar-Arab-DZ\",\"und-EA\":\"es-Latn-EA\",\"und-EC\":\"es-Latn-EC\",\"und-EE\":\"et-Latn-EE\",\"und-EG\":\"ar-Arab-EG\",\"und-Egyp\":\"egy-Egyp-EG\",\"und-EH\":\"ar-Arab-EH\",\"und-Elba\":\"sq-Elba-AL\",\"und-Elym\":\"arc-Elym-IR\",\"und-ER\":\"ti-Ethi-ER\",\"und-ES\":\"es-Latn-ES\",\"und-ET\":\"am-Ethi-ET\",\"und-Ethi\":\"am-Ethi-ET\",\"und-EU\":\"en-Latn-GB\",\"und-EZ\":\"de-Latn-EZ\",\"und-FI\":\"fi-Latn-FI\",\"und-FO\":\"fo-Latn-FO\",\"und-FR\":\"fr-Latn-FR\",\"und-GA\":\"fr-Latn-GA\",\"und-GE\":\"ka-Geor-GE\",\"und-Geor\":\"ka-Geor-GE\",\"und-GF\":\"fr-Latn-GF\",\"und-GH\":\"ak-Latn-GH\",\"und-GL\":\"kl-Latn-GL\",\"und-Glag\":\"cu-Glag-BG\",\"und-GN\":\"fr-Latn-GN\",\"und-Gong\":\"wsg-Gong-IN\",\"und-Gonm\":\"esg-Gonm-IN\",\"und-Goth\":\"got-Goth-UA\",\"und-GP\":\"fr-Latn-GP\",\"und-GQ\":\"es-Latn-GQ\",\"und-GR\":\"el-Grek-GR\",\"und-Gran\":\"sa-Gran-IN\",\"und-Grek\":\"el-Grek-GR\",\"und-Grek-TR\":\"bgx-Grek-TR\",\"und-GS\":\"und-Latn-GS\",\"und-GT\":\"es-Latn-GT\",\"und-Gujr\":\"gu-Gujr-IN\",\"und-Guru\":\"pa-Guru-IN\",\"und-GW\":\"pt-Latn-GW\",\"und-Hanb\":\"zh-Hanb-TW\",\"und-Hang\":\"ko-Hang-KR\",\"und-Hani\":\"zh-Hani-CN\",\"und-Hano\":\"hnn-Hano-PH\",\"und-Hans\":\"zh-Hans-CN\",\"und-Hant\":\"zh-Hant-TW\",\"und-Hatr\":\"mis-Hatr-IQ\",\"und-Hebr\":\"he-Hebr-IL\",\"und-Hebr-CA\":\"yi-Hebr-CA\",\"und-Hebr-GB\":\"yi-Hebr-GB\",\"und-Hebr-SE\":\"yi-Hebr-SE\",\"und-Hebr-UA\":\"yi-Hebr-UA\",\"und-Hebr-US\":\"yi-Hebr-US\",\"und-Hira\":\"ja-Hira-JP\",\"und-HK\":\"zh-Hant-HK\",\"und-Hluw\":\"hlu-Hluw-TR\",\"und-HM\":\"und-Latn-HM\",\"und-Hmng\":\"hnj-Hmng-LA\",\"und-Hmnp\":\"mww-Hmnp-US\",\"und-HN\":\"es-Latn-HN\",\"und-HR\":\"hr-Latn-HR\",\"und-HT\":\"ht-Latn-HT\",\"und-HU\":\"hu-Latn-HU\",\"und-Hung\":\"hu-Hung-HU\",\"und-IC\":\"es-Latn-IC\",\"und-ID\":\"id-Latn-ID\",\"und-IL\":\"he-Hebr-IL\",\"und-IN\":\"hi-Deva-IN\",\"und-IQ\":\"ar-Arab-IQ\",\"und-IR\":\"fa-Arab-IR\",\"und-IS\":\"is-Latn-IS\",\"und-IT\":\"it-Latn-IT\",\"und-Ital\":\"ett-Ital-IT\",\"und-Jamo\":\"ko-Jamo-KR\",\"und-Java\":\"jv-Java-ID\",\"und-JO\":\"ar-Arab-JO\",\"und-JP\":\"ja-Jpan-JP\",\"und-Jpan\":\"ja-Jpan-JP\",\"und-Kali\":\"eky-Kali-MM\",\"und-Kana\":\"ja-Kana-JP\",\"und-KE\":\"sw-Latn-KE\",\"und-KG\":\"ky-Cyrl-KG\",\"und-KH\":\"km-Khmr-KH\",\"und-Khar\":\"pra-Khar-PK\",\"und-Khmr\":\"km-Khmr-KH\",\"und-Khoj\":\"sd-Khoj-IN\",\"und-KM\":\"ar-Arab-KM\",\"und-Knda\":\"kn-Knda-IN\",\"und-Kore\":\"ko-Kore-KR\",\"und-KP\":\"ko-Kore-KP\",\"und-KR\":\"ko-Kore-KR\",\"und-Kthi\":\"bho-Kthi-IN\",\"und-KW\":\"ar-Arab-KW\",\"und-KZ\":\"ru-Cyrl-KZ\",\"und-LA\":\"lo-Laoo-LA\",\"und-Lana\":\"nod-Lana-TH\",\"und-Laoo\":\"lo-Laoo-LA\",\"und-Latn-AF\":\"tk-Latn-AF\",\"und-Latn-AM\":\"ku-Latn-AM\",\"und-Latn-CN\":\"za-Latn-CN\",\"und-Latn-CY\":\"tr-Latn-CY\",\"und-Latn-DZ\":\"fr-Latn-DZ\",\"und-Latn-ET\":\"en-Latn-ET\",\"und-Latn-GE\":\"ku-Latn-GE\",\"und-Latn-IR\":\"tk-Latn-IR\",\"und-Latn-KM\":\"fr-Latn-KM\",\"und-Latn-MA\":\"fr-Latn-MA\",\"und-Latn-MK\":\"sq-Latn-MK\",\"und-Latn-MM\":\"kac-Latn-MM\",\"und-Latn-MO\":\"pt-Latn-MO\",\"und-Latn-MR\":\"fr-Latn-MR\",\"und-Latn-RU\":\"krl-Latn-RU\",\"und-Latn-SY\":\"fr-Latn-SY\",\"und-Latn-TN\":\"fr-Latn-TN\",\"und-Latn-TW\":\"trv-Latn-TW\",\"und-Latn-UA\":\"pl-Latn-UA\",\"und-LB\":\"ar-Arab-LB\",\"und-Lepc\":\"lep-Lepc-IN\",\"und-LI\":\"de-Latn-LI\",\"und-Limb\":\"lif-Limb-IN\",\"und-Lina\":\"lab-Lina-GR\",\"und-Linb\":\"grc-Linb-GR\",\"und-Lisu\":\"lis-Lisu-CN\",\"und-LK\":\"si-Sinh-LK\",\"und-LS\":\"st-Latn-LS\",\"und-LT\":\"lt-Latn-LT\",\"und-LU\":\"fr-Latn-LU\",\"und-LV\":\"lv-Latn-LV\",\"und-LY\":\"ar-Arab-LY\",\"und-Lyci\":\"xlc-Lyci-TR\",\"und-Lydi\":\"xld-Lydi-TR\",\"und-MA\":\"ar-Arab-MA\",\"und-Mahj\":\"hi-Mahj-IN\",\"und-Maka\":\"mak-Maka-ID\",\"und-Mand\":\"myz-Mand-IR\",\"und-Mani\":\"xmn-Mani-CN\",\"und-Marc\":\"bo-Marc-CN\",\"und-MC\":\"fr-Latn-MC\",\"und-MD\":\"ro-Latn-MD\",\"und-ME\":\"sr-Latn-ME\",\"und-Medf\":\"mis-Medf-NG\",\"und-Mend\":\"men-Mend-SL\",\"und-Merc\":\"xmr-Merc-SD\",\"und-Mero\":\"xmr-Mero-SD\",\"und-MF\":\"fr-Latn-MF\",\"und-MG\":\"mg-Latn-MG\",\"und-MK\":\"mk-Cyrl-MK\",\"und-ML\":\"bm-Latn-ML\",\"und-Mlym\":\"ml-Mlym-IN\",\"und-MM\":\"my-Mymr-MM\",\"und-MN\":\"mn-Cyrl-MN\",\"und-MO\":\"zh-Hant-MO\",\"und-Modi\":\"mr-Modi-IN\",\"und-Mong\":\"mn-Mong-CN\",\"und-MQ\":\"fr-Latn-MQ\",\"und-MR\":\"ar-Arab-MR\",\"und-Mroo\":\"mro-Mroo-BD\",\"und-MT\":\"mt-Latn-MT\",\"und-Mtei\":\"mni-Mtei-IN\",\"und-MU\":\"mfe-Latn-MU\",\"und-Mult\":\"skr-Mult-PK\",\"und-MV\":\"dv-Thaa-MV\",\"und-MX\":\"es-Latn-MX\",\"und-MY\":\"ms-Latn-MY\",\"und-Mymr\":\"my-Mymr-MM\",\"und-Mymr-IN\":\"kht-Mymr-IN\",\"und-Mymr-TH\":\"mnw-Mymr-TH\",\"und-MZ\":\"pt-Latn-MZ\",\"und-NA\":\"af-Latn-NA\",\"und-Nand\":\"sa-Nand-IN\",\"und-Narb\":\"xna-Narb-SA\",\"und-Nbat\":\"arc-Nbat-JO\",\"und-NC\":\"fr-Latn-NC\",\"und-NE\":\"ha-Latn-NE\",\"und-Newa\":\"new-Newa-NP\",\"und-NI\":\"es-Latn-NI\",\"und-Nkoo\":\"man-Nkoo-GN\",\"und-NL\":\"nl-Latn-NL\",\"und-NO\":\"nb-Latn-NO\",\"und-NP\":\"ne-Deva-NP\",\"und-Nshu\":\"zhx-Nshu-CN\",\"und-Ogam\":\"sga-Ogam-IE\",\"und-Olck\":\"sat-Olck-IN\",\"und-OM\":\"ar-Arab-OM\",\"und-Orkh\":\"otk-Orkh-MN\",\"und-Orya\":\"or-Orya-IN\",\"und-Osge\":\"osa-Osge-US\",\"und-Osma\":\"so-Osma-SO\",\"und-PA\":\"es-Latn-PA\",\"und-Palm\":\"arc-Palm-SY\",\"und-Pauc\":\"ctd-Pauc-MM\",\"und-PE\":\"es-Latn-PE\",\"und-Perm\":\"kv-Perm-RU\",\"und-PF\":\"fr-Latn-PF\",\"und-PG\":\"tpi-Latn-PG\",\"und-PH\":\"fil-Latn-PH\",\"und-Phag\":\"lzh-Phag-CN\",\"und-Phli\":\"pal-Phli-IR\",\"und-Phlp\":\"pal-Phlp-CN\",\"und-Phnx\":\"phn-Phnx-LB\",\"und-PK\":\"ur-Arab-PK\",\"und-PL\":\"pl-Latn-PL\",\"und-Plrd\":\"hmd-Plrd-CN\",\"und-PM\":\"fr-Latn-PM\",\"und-PR\":\"es-Latn-PR\",\"und-Prti\":\"xpr-Prti-IR\",\"und-PS\":\"ar-Arab-PS\",\"und-PT\":\"pt-Latn-PT\",\"und-PW\":\"pau-Latn-PW\",\"und-PY\":\"gn-Latn-PY\",\"und-QA\":\"ar-Arab-QA\",\"und-QO\":\"en-Latn-DG\",\"und-RE\":\"fr-Latn-RE\",\"und-Rjng\":\"rej-Rjng-ID\",\"und-RO\":\"ro-Latn-RO\",\"und-Rohg\":\"rhg-Rohg-MM\",\"und-RS\":\"sr-Cyrl-RS\",\"und-RU\":\"ru-Cyrl-RU\",\"und-Runr\":\"non-Runr-SE\",\"und-RW\":\"rw-Latn-RW\",\"und-SA\":\"ar-Arab-SA\",\"und-Samr\":\"smp-Samr-IL\",\"und-Sarb\":\"xsa-Sarb-YE\",\"und-Saur\":\"saz-Saur-IN\",\"und-SC\":\"fr-Latn-SC\",\"und-SD\":\"ar-Arab-SD\",\"und-SE\":\"sv-Latn-SE\",\"und-Sgnw\":\"ase-Sgnw-US\",\"und-Shaw\":\"en-Shaw-GB\",\"und-Shrd\":\"sa-Shrd-IN\",\"und-SI\":\"sl-Latn-SI\",\"und-Sidd\":\"sa-Sidd-IN\",\"und-Sind\":\"sd-Sind-IN\",\"und-Sinh\":\"si-Sinh-LK\",\"und-SJ\":\"nb-Latn-SJ\",\"und-SK\":\"sk-Latn-SK\",\"und-SM\":\"it-Latn-SM\",\"und-SN\":\"fr-Latn-SN\",\"und-SO\":\"so-Latn-SO\",\"und-Sogd\":\"sog-Sogd-UZ\",\"und-Sogo\":\"sog-Sogo-UZ\",\"und-Sora\":\"srb-Sora-IN\",\"und-Soyo\":\"cmg-Soyo-MN\",\"und-SR\":\"nl-Latn-SR\",\"und-ST\":\"pt-Latn-ST\",\"und-Sund\":\"su-Sund-ID\",\"und-SV\":\"es-Latn-SV\",\"und-SY\":\"ar-Arab-SY\",\"und-Sylo\":\"syl-Sylo-BD\",\"und-Syrc\":\"syr-Syrc-IQ\",\"und-Tagb\":\"tbw-Tagb-PH\",\"und-Takr\":\"doi-Takr-IN\",\"und-Tale\":\"tdd-Tale-CN\",\"und-Talu\":\"khb-Talu-CN\",\"und-Taml\":\"ta-Taml-IN\",\"und-Tang\":\"txg-Tang-CN\",\"und-Tavt\":\"blt-Tavt-VN\",\"und-TD\":\"fr-Latn-TD\",\"und-Telu\":\"te-Telu-IN\",\"und-TF\":\"fr-Latn-TF\",\"und-Tfng\":\"zgh-Tfng-MA\",\"und-TG\":\"fr-Latn-TG\",\"und-Tglg\":\"fil-Tglg-PH\",\"und-TH\":\"th-Thai-TH\",\"und-Thaa\":\"dv-Thaa-MV\",\"und-Thai\":\"th-Thai-TH\",\"und-Thai-CN\":\"lcp-Thai-CN\",\"und-Thai-KH\":\"kdt-Thai-KH\",\"und-Thai-LA\":\"kdt-Thai-LA\",\"und-Tibt\":\"bo-Tibt-CN\",\"und-Tirh\":\"mai-Tirh-IN\",\"und-TJ\":\"tg-Cyrl-TJ\",\"und-TK\":\"tkl-Latn-TK\",\"und-TL\":\"pt-Latn-TL\",\"und-TM\":\"tk-Latn-TM\",\"und-TN\":\"ar-Arab-TN\",\"und-TO\":\"to-Latn-TO\",\"und-TR\":\"tr-Latn-TR\",\"und-TV\":\"tvl-Latn-TV\",\"und-TW\":\"zh-Hant-TW\",\"und-TZ\":\"sw-Latn-TZ\",\"und-UA\":\"uk-Cyrl-UA\",\"und-UG\":\"sw-Latn-UG\",\"und-Ugar\":\"uga-Ugar-SY\",\"und-UY\":\"es-Latn-UY\",\"und-UZ\":\"uz-Latn-UZ\",\"und-VA\":\"it-Latn-VA\",\"und-Vaii\":\"vai-Vaii-LR\",\"und-VE\":\"es-Latn-VE\",\"und-VN\":\"vi-Latn-VN\",\"und-VU\":\"bi-Latn-VU\",\"und-Wara\":\"hoc-Wara-IN\",\"und-Wcho\":\"nnp-Wcho-IN\",\"und-WF\":\"fr-Latn-WF\",\"und-WS\":\"sm-Latn-WS\",\"und-XK\":\"sq-Latn-XK\",\"und-Xpeo\":\"peo-Xpeo-IR\",\"und-Xsux\":\"akk-Xsux-IQ\",\"und-YE\":\"ar-Arab-YE\",\"und-Yiii\":\"ii-Yiii-CN\",\"und-YT\":\"fr-Latn-YT\",\"und-Zanb\":\"cmg-Zanb-MN\",\"und-ZW\":\"sn-Latn-ZW\",\"unr\":\"unr-Beng-IN\",\"unr-Deva\":\"unr-Deva-NP\",\"unr-NP\":\"unr-Deva-NP\",\"unx\":\"unx-Beng-IN\",\"uok\":\"uok-Latn-ZZ\",\"ur\":\"ur-Arab-PK\",\"uri\":\"uri-Latn-ZZ\",\"urt\":\"urt-Latn-ZZ\",\"urw\":\"urw-Latn-ZZ\",\"usa\":\"usa-Latn-ZZ\",\"utr\":\"utr-Latn-ZZ\",\"uvh\":\"uvh-Latn-ZZ\",\"uvl\":\"uvl-Latn-ZZ\",\"uz\":\"uz-Latn-UZ\",\"uz-AF\":\"uz-Arab-AF\",\"uz-Arab\":\"uz-Arab-AF\",\"uz-CN\":\"uz-Cyrl-CN\",\"vag\":\"vag-Latn-ZZ\",\"vai\":\"vai-Vaii-LR\",\"van\":\"van-Latn-ZZ\",\"ve\":\"ve-Latn-ZA\",\"vec\":\"vec-Latn-IT\",\"vep\":\"vep-Latn-RU\",\"vi\":\"vi-Latn-VN\",\"vic\":\"vic-Latn-SX\",\"viv\":\"viv-Latn-ZZ\",\"vls\":\"vls-Latn-BE\",\"vmf\":\"vmf-Latn-DE\",\"vmw\":\"vmw-Latn-MZ\",\"vo\":\"vo-Latn-001\",\"vot\":\"vot-Latn-RU\",\"vro\":\"vro-Latn-EE\",\"vun\":\"vun-Latn-TZ\",\"vut\":\"vut-Latn-ZZ\",\"wa\":\"wa-Latn-BE\",\"wae\":\"wae-Latn-CH\",\"waj\":\"waj-Latn-ZZ\",\"wal\":\"wal-Ethi-ET\",\"wan\":\"wan-Latn-ZZ\",\"war\":\"war-Latn-PH\",\"wbp\":\"wbp-Latn-AU\",\"wbq\":\"wbq-Telu-IN\",\"wbr\":\"wbr-Deva-IN\",\"wci\":\"wci-Latn-ZZ\",\"wer\":\"wer-Latn-ZZ\",\"wgi\":\"wgi-Latn-ZZ\",\"whg\":\"whg-Latn-ZZ\",\"wib\":\"wib-Latn-ZZ\",\"wiu\":\"wiu-Latn-ZZ\",\"wiv\":\"wiv-Latn-ZZ\",\"wja\":\"wja-Latn-ZZ\",\"wji\":\"wji-Latn-ZZ\",\"wls\":\"wls-Latn-WF\",\"wmo\":\"wmo-Latn-ZZ\",\"wnc\":\"wnc-Latn-ZZ\",\"wni\":\"wni-Arab-KM\",\"wnu\":\"wnu-Latn-ZZ\",\"wo\":\"wo-Latn-SN\",\"wob\":\"wob-Latn-ZZ\",\"wos\":\"wos-Latn-ZZ\",\"wrs\":\"wrs-Latn-ZZ\",\"wsg\":\"wsg-Gong-IN\",\"wsk\":\"wsk-Latn-ZZ\",\"wtm\":\"wtm-Deva-IN\",\"wuu\":\"wuu-Hans-CN\",\"wuv\":\"wuv-Latn-ZZ\",\"wwa\":\"wwa-Latn-ZZ\",\"xav\":\"xav-Latn-BR\",\"xbi\":\"xbi-Latn-ZZ\",\"xcr\":\"xcr-Cari-TR\",\"xes\":\"xes-Latn-ZZ\",\"xh\":\"xh-Latn-ZA\",\"xla\":\"xla-Latn-ZZ\",\"xlc\":\"xlc-Lyci-TR\",\"xld\":\"xld-Lydi-TR\",\"xmf\":\"xmf-Geor-GE\",\"xmn\":\"xmn-Mani-CN\",\"xmr\":\"xmr-Merc-SD\",\"xna\":\"xna-Narb-SA\",\"xnr\":\"xnr-Deva-IN\",\"xog\":\"xog-Latn-UG\",\"xon\":\"xon-Latn-ZZ\",\"xpr\":\"xpr-Prti-IR\",\"xrb\":\"xrb-Latn-ZZ\",\"xsa\":\"xsa-Sarb-YE\",\"xsi\":\"xsi-Latn-ZZ\",\"xsm\":\"xsm-Latn-ZZ\",\"xsr\":\"xsr-Deva-NP\",\"xwe\":\"xwe-Latn-ZZ\",\"yam\":\"yam-Latn-ZZ\",\"yao\":\"yao-Latn-MZ\",\"yap\":\"yap-Latn-FM\",\"yas\":\"yas-Latn-ZZ\",\"yat\":\"yat-Latn-ZZ\",\"yav\":\"yav-Latn-CM\",\"yay\":\"yay-Latn-ZZ\",\"yaz\":\"yaz-Latn-ZZ\",\"yba\":\"yba-Latn-ZZ\",\"ybb\":\"ybb-Latn-CM\",\"yby\":\"yby-Latn-ZZ\",\"yer\":\"yer-Latn-ZZ\",\"ygr\":\"ygr-Latn-ZZ\",\"ygw\":\"ygw-Latn-ZZ\",\"yi\":\"yi-Hebr-001\",\"yko\":\"yko-Latn-ZZ\",\"yle\":\"yle-Latn-ZZ\",\"ylg\":\"ylg-Latn-ZZ\",\"yll\":\"yll-Latn-ZZ\",\"yml\":\"yml-Latn-ZZ\",\"yo\":\"yo-Latn-NG\",\"yon\":\"yon-Latn-ZZ\",\"yrb\":\"yrb-Latn-ZZ\",\"yre\":\"yre-Latn-ZZ\",\"yrl\":\"yrl-Latn-BR\",\"yss\":\"yss-Latn-ZZ\",\"yua\":\"yua-Latn-MX\",\"yue\":\"yue-Hant-HK\",\"yue-CN\":\"yue-Hans-CN\",\"yue-Hans\":\"yue-Hans-CN\",\"yuj\":\"yuj-Latn-ZZ\",\"yut\":\"yut-Latn-ZZ\",\"yuw\":\"yuw-Latn-ZZ\",\"za\":\"za-Latn-CN\",\"zag\":\"zag-Latn-SD\",\"zdj\":\"zdj-Arab-KM\",\"zea\":\"zea-Latn-NL\",\"zgh\":\"zgh-Tfng-MA\",\"zh\":\"zh-Hans-CN\",\"zh-AU\":\"zh-Hant-AU\",\"zh-BN\":\"zh-Hant-BN\",\"zh-Bopo\":\"zh-Bopo-TW\",\"zh-GB\":\"zh-Hant-GB\",\"zh-GF\":\"zh-Hant-GF\",\"zh-Hanb\":\"zh-Hanb-TW\",\"zh-Hant\":\"zh-Hant-TW\",\"zh-HK\":\"zh-Hant-HK\",\"zh-ID\":\"zh-Hant-ID\",\"zh-MO\":\"zh-Hant-MO\",\"zh-MY\":\"zh-Hant-MY\",\"zh-PA\":\"zh-Hant-PA\",\"zh-PF\":\"zh-Hant-PF\",\"zh-PH\":\"zh-Hant-PH\",\"zh-SR\":\"zh-Hant-SR\",\"zh-TH\":\"zh-Hant-TH\",\"zh-TW\":\"zh-Hant-TW\",\"zh-US\":\"zh-Hant-US\",\"zh-VN\":\"zh-Hant-VN\",\"zhx\":\"zhx-Nshu-CN\",\"zia\":\"zia-Latn-ZZ\",\"zlm\":\"zlm-Latn-TG\",\"zmi\":\"zmi-Latn-MY\",\"zne\":\"zne-Latn-ZZ\",\"zu\":\"zu-Latn-ZA\",\"zza\":\"zza-Latn-TR\"}}}");

/***/ }),

/***/ "./node_modules/cldr-data/supplemental/metaZones.json":
/*!************************************************************!*\
  !*** ./node_modules/cldr-data/supplemental/metaZones.json ***!
  \************************************************************/
/*! exports provided: supplemental, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"supplemental\":{\"version\":{\"_unicodeVersion\":\"12.1.0\",\"_cldrVersion\":\"36\"},\"metaZones\":{\"metazoneInfo\":{\"timezone\":{\"Africa\":{\"Abidjan\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Accra\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Addis_Ababa\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Algiers\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_to\":\"1977-10-20 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1977-10-20 23:00\",\"_to\":\"1979-10-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1979-10-25 23:00\",\"_to\":\"1981-05-01 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1981-05-01 00:00\"}}],\"Asmera\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Bamako\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Bangui\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Banjul\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Bissau\":[{\"usesMetazone\":{\"_mzone\":\"Africa_FarWestern\",\"_to\":\"1975-01-01 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1975-01-01 01:00\"}}],\"Blantyre\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Brazzaville\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Bujumbura\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Cairo\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Casablanca\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_to\":\"1984-03-16 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1984-03-16 00:00\",\"_to\":\"1985-12-31 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1985-12-31 23:00\",\"_to\":\"2018-10-28 02:00\"}}],\"Ceuta\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_to\":\"1984-03-16 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1984-03-16 00:00\"}}],\"Conakry\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Dakar\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Dar_es_Salaam\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Djibouti\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Douala\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"El_Aaiun\":[{\"usesMetazone\":{\"_mzone\":\"Africa_FarWestern\",\"_to\":\"1976-04-14 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1976-04-14 01:00\",\"_to\":\"2018-10-28 02:00\"}}],\"Freetown\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Gaborone\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Harare\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Johannesburg\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Southern\"}}],\"Juba\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\",\"_to\":\"2000-01-15 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\",\"_from\":\"2000-01-15 10:00\"}}],\"Kampala\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Khartoum\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\",\"_to\":\"2000-01-15 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\",\"_from\":\"2000-01-15 10:00\",\"_to\":\"2017-10-31 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Central\",\"_from\":\"2017-10-31 21:00\"}}],\"Kigali\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Kinshasa\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Lagos\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Libreville\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Lome\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Luanda\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Lubumbashi\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Lusaka\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Malabo\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Maputo\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Central\"}}],\"Maseru\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Southern\"}}],\"Mbabane\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Southern\"}}],\"Mogadishu\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Monrovia\":[{\"usesMetazone\":{\"_mzone\":\"Liberia\",\"_to\":\"1972-05-01 00:45\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1972-05-01 00:45\"}}],\"Nairobi\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Ndjamena\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Niamey\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Nouakchott\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Ouagadougou\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Porto-Novo\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Western\"}}],\"Sao_Tome\":[{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_to\":\"2018-01-01 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Western\",\"_from\":\"2018-01-01 01:00\",\"_to\":\"2019-01-01 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"2019-01-01 01:00\"}}],\"Tripoli\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_to\":\"1981-12-31 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1981-12-31 22:00\",\"_to\":\"1990-05-03 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1990-05-03 23:00\",\"_to\":\"1996-09-29 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1996-09-29 22:00\",\"_to\":\"1997-10-03 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1997-10-03 22:00\",\"_to\":\"2012-11-10 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"2012-11-10 00:00\",\"_to\":\"2013-10-25 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"2013-10-25 00:00\"}}],\"Tunis\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Windhoek\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Southern\",\"_to\":\"1990-03-20 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Central\",\"_from\":\"1990-03-20 22:00\",\"_to\":\"1994-03-20 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Western\",\"_from\":\"1994-03-20 22:00\",\"_to\":\"2017-10-23 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Africa_Central\",\"_from\":\"2017-10-23 22:00\"}}]},\"America\":{\"Adak\":[{\"usesMetazone\":{\"_mzone\":\"Bering\",\"_to\":\"1983-10-30 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Hawaii_Aleutian\",\"_from\":\"1983-11-30 10:00\"}}],\"Anchorage\":[{\"usesMetazone\":{\"_mzone\":\"Alaska_Hawaii\",\"_to\":\"1983-10-30 11:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_from\":\"1983-10-30 11:00\",\"_to\":\"1983-11-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"1983-11-30 09:00\"}}],\"Anguilla\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Antigua\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Araguaina\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Argentina\":{\"La_Rioja\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-01 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"1991-03-01 02:00\",\"_to\":\"1991-05-07 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-05-07 04:00\",\"_to\":\"2004-06-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-06-01 03:00\",\"_to\":\"2004-06-20 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-06-20 04:00\"}}],\"Rio_Gallegos\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"2004-06-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-06-01 03:00\",\"_to\":\"2004-06-20 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-06-20 04:00\"}}],\"Salta\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-03 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-10-20 04:00\"}}],\"San_Juan\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-01 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"1991-03-01 02:00\",\"_to\":\"1991-05-07 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-05-07 04:00\",\"_to\":\"2004-05-31 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-05-31 03:00\",\"_to\":\"2004-07-25 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-07-25 04:00\"}}],\"San_Luis\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1990-03-14 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"1990-03-14 02:00\",\"_to\":\"1991-06-01 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-06-01 04:00\",\"_to\":\"1999-10-03 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"1999-10-03 03:00\",\"_to\":\"2000-03-03 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2000-03-03 03:00\",\"_to\":\"2004-05-31 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-05-31 03:00\",\"_to\":\"2004-07-25 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-07-25 04:00\",\"_to\":\"2008-01-21 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2008-01-21 02:00\"}}],\"Tucuman\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-03 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-10-20 04:00\",\"_to\":\"2004-06-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-06-01 03:00\",\"_to\":\"2004-06-13 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-06-13 04:00\"}}],\"Ushuaia\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"2004-05-30 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-06-20 04:00\"}}]},\"Aruba\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Asuncion\":[{\"usesMetazone\":{\"_mzone\":\"Paraguay\"}}],\"Bahia\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Bahia_Banderas\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1970-01-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"1970-01-01 08:00\",\"_to\":\"2010-04-04 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2010-04-04 09:00\"}}],\"Barbados\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Belem\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Belize\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Blanc-Sablon\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Boa_Vista\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\"}}],\"Bogota\":[{\"usesMetazone\":{\"_mzone\":\"Colombia\"}}],\"Boise\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Buenos_Aires\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\"}}],\"Cambridge_Bay\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_to\":\"1999-10-31 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1999-10-31 08:00\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\",\"_to\":\"2000-11-05 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2000-11-05 05:00\",\"_to\":\"2001-04-01 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"2001-04-01 09:00\"}}],\"Campo_Grande\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\"}}],\"Cancun\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1981-12-23 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1981-12-23 06:00\",\"_to\":\"1998-08-02 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1998-08-02 06:00\",\"_to\":\"2015-02-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2015-02-01 08:00\"}}],\"Caracas\":[{\"usesMetazone\":{\"_mzone\":\"Venezuela\"}}],\"Catamarca\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-03 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-10-20 04:00\",\"_to\":\"2004-06-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina_Western\",\"_from\":\"2004-06-01 03:00\",\"_to\":\"2004-06-20 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-06-20 04:00\"}}],\"Cayenne\":[{\"usesMetazone\":{\"_mzone\":\"French_Guiana\"}}],\"Cayman\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Chicago\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Chihuahua\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1998-04-05 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Mexico_Pacific\",\"_from\":\"1998-04-05 09:00\"}}],\"Coral_Harbour\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Cordoba\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1991-03-03 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-10-20 04:00\"}}],\"Costa_Rica\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Creston\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Cuiaba\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\"}}],\"Curacao\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Danmarkshavn\":[{\"usesMetazone\":{\"_mzone\":\"Greenland_Western\",\"_to\":\"1996-01-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1996-01-01 03:00\"}}],\"Dawson\":[{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_to\":\"1973-10-28 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_from\":\"1973-10-28 09:00\"}}],\"Dawson_Creek\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1972-08-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"1972-08-30 09:00\"}}],\"Denver\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Detroit\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Dominica\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Edmonton\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Eirunepe\":[{\"usesMetazone\":{\"_mzone\":\"Acre\",\"_to\":\"2008-06-24 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"Amazon\",\"_from\":\"2008-06-24 05:00\",\"_to\":\"2013-11-10 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Acre\",\"_from\":\"2013-11-10 04:00\"}}],\"El_Salvador\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Fort_Nelson\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"2015-03-08 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"2015-03-08 10:00\"}}],\"Fortaleza\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Glace_Bay\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Godthab\":[{\"usesMetazone\":{\"_mzone\":\"Greenland_Western\"}}],\"Goose_Bay\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_to\":\"1988-04-03 04:01\"}},{\"usesMetazone\":{\"_mzone\":\"Goose_Bay\",\"_from\":\"1988-04-03 04:01\",\"_to\":\"1988-10-30 02:01\"}},{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_from\":\"1988-10-30 02:01\"}}],\"Grand_Turk\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"2015-11-01 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_from\":\"2015-11-01 06:00\",\"_to\":\"2018-03-11 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2018-03-11 07:00\"}}],\"Grenada\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Guadeloupe\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Guatemala\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Guayaquil\":[{\"usesMetazone\":{\"_mzone\":\"Ecuador\"}}],\"Guyana\":[{\"usesMetazone\":{\"_mzone\":\"Guyana\"}}],\"Halifax\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Havana\":[{\"usesMetazone\":{\"_mzone\":\"Cuba\"}}],\"Hermosillo\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1970-01-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"Mexico_Pacific\",\"_from\":\"1970-01-01 08:00\"}}],\"Indiana\":{\"Knox\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1991-10-27 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1991-10-27 07:00\",\"_to\":\"2006-04-02 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2006-04-02 07:00\"}}],\"Marengo\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"1974-01-06 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1974-01-06 07:00\",\"_to\":\"1974-10-27 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1974-10-27 07:00\"}}],\"Petersburg\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1977-10-30 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1977-10-30 07:00\",\"_to\":\"2006-04-02 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2006-04-02 07:00\",\"_to\":\"2007-11-04 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2007-11-04 07:00\"}}],\"Tell_City\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"2006-04-02 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2006-04-02 07:00\"}}],\"Vevay\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Vincennes\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"2006-04-02 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2006-04-02 07:00\",\"_to\":\"2007-11-04 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2007-11-04 07:00\"}}],\"Winamac\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"2006-04-02 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2006-04-02 07:00\",\"_to\":\"2007-03-11 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2007-03-11 08:00\"}}]},\"Indianapolis\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Inuvik\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1979-04-29 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"1979-04-29 10:00\"}}],\"Iqaluit\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"1999-10-31 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1999-10-31 06:00\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\"}}],\"Jamaica\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Jujuy\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1990-03-04 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1991-10-06 04:00\"}}],\"Juneau\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1980-04-27 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_from\":\"1980-04-27 10:00\",\"_to\":\"1980-10-26 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_from\":\"1980-10-26 10:00\",\"_to\":\"1983-10-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_from\":\"1983-10-30 09:00\",\"_to\":\"1983-11-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"1983-11-30 09:00\"}}],\"Kentucky\":{\"Monticello\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\"}}]},\"Kralendijk\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"La_Paz\":[{\"usesMetazone\":{\"_mzone\":\"Bolivia\"}}],\"Lima\":[{\"usesMetazone\":{\"_mzone\":\"Peru\"}}],\"Los_Angeles\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\"}}],\"Louisville\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"1974-01-06 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1974-01-06 07:00\",\"_to\":\"1974-10-27 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1974-10-27 07:00\"}}],\"Lower_Princes\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Maceio\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Managua\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1973-05-01 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1973-05-01 06:00\",\"_to\":\"1975-02-16 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1975-02-16 05:00\",\"_to\":\"1992-01-01 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1992-01-01 10:00\",\"_to\":\"1992-09-24 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1992-09-24 05:00\",\"_to\":\"1993-01-01 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1993-01-01 06:00\",\"_to\":\"1997-01-01 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1997-01-01 05:00\"}}],\"Manaus\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\"}}],\"Marigot\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Martinique\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Matamoros\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Mazatlan\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1970-01-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"Mexico_Pacific\",\"_from\":\"1970-01-01 08:00\"}}],\"Mendoza\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1990-03-04 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"1992-10-18 04:00\",\"_to\":\"2004-05-23 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_from\":\"2004-09-26 04:00\"}}],\"Menominee\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_to\":\"1973-04-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1973-04-29 07:00\"}}],\"Merida\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1981-12-23 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1981-12-23 06:00\",\"_to\":\"1982-12-02 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1982-12-02 05:00\"}}],\"Metlakatla\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"2015-11-01 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"2015-11-01 10:00\",\"_to\":\"2018-11-04 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_from\":\"2018-11-04 10:00\",\"_to\":\"2019-01-20 10:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"2019-01-20 10:00\"}}],\"Mexico_City\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Miquelon\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_to\":\"1980-05-01 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Pierre_Miquelon\",\"_from\":\"1980-05-01 04:00\"}}],\"Moncton\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Monterrey\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Montevideo\":[{\"usesMetazone\":{\"_mzone\":\"Uruguay\"}}],\"Montserrat\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Nassau\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"New_York\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Nipigon\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Nome\":[{\"usesMetazone\":{\"_mzone\":\"Bering\",\"_to\":\"1983-10-30 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_from\":\"1983-10-30 12:00\",\"_to\":\"1983-11-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"1983-11-30 09:00\"}}],\"Noronha\":[{\"usesMetazone\":{\"_mzone\":\"Noronha\"}}],\"North_Dakota\":{\"Beulah\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_to\":\"2010-11-07 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2010-11-07 08:00\"}}],\"Center\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_to\":\"1992-10-25 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1992-10-25 08:00\"}}],\"New_Salem\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_to\":\"2003-10-26 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2003-10-26 08:00\"}}]},\"Ojinaga\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"1998-04-05 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_from\":\"1998-04-05 09:00\"}}],\"Panama\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Pangnirtung\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_to\":\"1995-04-02 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"1995-04-02 06:00\",\"_to\":\"1999-10-31 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1999-10-31 06:00\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\"}}],\"Paramaribo\":[{\"usesMetazone\":{\"_mzone\":\"Dutch_Guiana\",\"_to\":\"1975-11-20 03:30\"}},{\"usesMetazone\":{\"_mzone\":\"Suriname\",\"_from\":\"1975-11-20 03:30\"}}],\"Phoenix\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Port_of_Spain\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Port-au-Prince\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Porto_Velho\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\"}}],\"Puerto_Rico\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Punta_Arenas\":[{\"usesMetazone\":{\"_mzone\":\"Chile\",\"_to\":\"2016-12-03 23:00\"}}],\"Rainy_River\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Rankin_Inlet\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\",\"_to\":\"2001-04-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2001-04-01 08:00\"}}],\"Recife\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Regina\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Resolute\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_to\":\"2000-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 07:00\",\"_to\":\"2001-04-01 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2001-04-01 08:00\",\"_to\":\"2006-10-29 07:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2006-10-29 07:00\",\"_to\":\"2007-03-11 08:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"2007-03-11 08:00\"}}],\"Rio_Branco\":[{\"usesMetazone\":{\"_mzone\":\"Acre\",\"_to\":\"2008-06-24 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"Amazon\",\"_from\":\"2008-06-24 05:00\",\"_to\":\"2013-11-10 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Acre\",\"_from\":\"2013-11-10 04:00\"}}],\"Santa_Isabel\":[{\"usesMetazone\":{\"_mzone\":\"Mexico_Northwest\"}}],\"Santarem\":[{\"usesMetazone\":{\"_mzone\":\"Amazon\",\"_to\":\"2008-06-24 04:00\"}},{\"usesMetazone\":{\"_mzone\":\"Brasilia\",\"_from\":\"2008-06-24 04:00\"}}],\"Santiago\":[{\"usesMetazone\":{\"_mzone\":\"Chile\"}}],\"Santo_Domingo\":[{\"usesMetazone\":{\"_mzone\":\"Dominican\",\"_to\":\"1974-10-27 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_from\":\"1974-10-27 05:00\",\"_to\":\"2000-10-29 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Eastern\",\"_from\":\"2000-10-29 06:00\",\"_to\":\"2000-12-03 06:00\"}},{\"usesMetazone\":{\"_mzone\":\"Atlantic\",\"_from\":\"2000-12-03 06:00\"}}],\"Sao_Paulo\":[{\"usesMetazone\":{\"_mzone\":\"Brasilia\"}}],\"Scoresbysund\":[{\"usesMetazone\":{\"_mzone\":\"Greenland_Central\",\"_to\":\"1981-03-29 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Greenland_Eastern\",\"_from\":\"1981-03-29 02:00\"}}],\"Sitka\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\",\"_to\":\"1983-10-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_from\":\"1983-10-30 09:00\",\"_to\":\"1983-11-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"1983-11-30 09:00\"}}],\"St_Barthelemy\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"St_Johns\":[{\"usesMetazone\":{\"_mzone\":\"Newfoundland\"}}],\"St_Kitts\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"St_Lucia\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"St_Thomas\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"St_Vincent\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Swift_Current\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\",\"_to\":\"1972-04-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"America_Central\",\"_from\":\"1972-04-30 09:00\"}}],\"Tegucigalpa\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Thule\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Thunder_Bay\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Tijuana\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\"}}],\"Toronto\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Tortola\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Vancouver\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\"}}],\"Whitehorse\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\"}}],\"Winnipeg\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"Yakutat\":[{\"usesMetazone\":{\"_mzone\":\"Yukon\",\"_to\":\"1983-11-30 09:00\"}},{\"usesMetazone\":{\"_mzone\":\"Alaska\",\"_from\":\"1983-11-30 09:00\"}}],\"Yellowknife\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}]},\"Antarctica\":{\"Casey\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Western\",\"_to\":\"2009-10-17 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Casey\",\"_from\":\"2009-10-17 18:00\",\"_to\":\"2010-03-04 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Australia_Western\",\"_from\":\"2010-03-04 15:00\",\"_to\":\"2011-10-27 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Casey\",\"_from\":\"2011-10-27 18:00\",\"_to\":\"2012-02-21 17:00\"}},{\"usesMetazone\":{\"_mzone\":\"Australia_Western\",\"_from\":\"2012-02-21 17:00\",\"_to\":\"2016-10-21 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Casey\",\"_from\":\"2016-10-21 16:00\",\"_to\":\"2018-03-10 17:00\"}},{\"usesMetazone\":{\"_mzone\":\"Australia_Western\",\"_from\":\"2018-03-10 17:00\"}}],\"Davis\":[{\"usesMetazone\":{\"_mzone\":\"Davis\"}}],\"DumontDUrville\":[{\"usesMetazone\":{\"_mzone\":\"DumontDUrville\"}}],\"Macquarie\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\",\"_to\":\"2010-04-03 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Macquarie\",\"_from\":\"2010-04-03 16:00\"}}],\"Mawson\":[{\"usesMetazone\":{\"_mzone\":\"Mawson\"}}],\"McMurdo\":[{\"usesMetazone\":{\"_mzone\":\"New_Zealand\"}}],\"Palmer\":[{\"usesMetazone\":{\"_mzone\":\"Argentina\",\"_to\":\"1982-05-01 03:00\"}},{\"usesMetazone\":{\"_mzone\":\"Chile\",\"_from\":\"1982-05-01 03:00\",\"_to\":\"2016-12-03 23:00\"}}],\"Rothera\":[{\"usesMetazone\":{\"_mzone\":\"Rothera\"}}],\"Syowa\":[{\"usesMetazone\":{\"_mzone\":\"Syowa\"}}],\"Troll\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Vostok\":[{\"usesMetazone\":{\"_mzone\":\"Vostok\"}}]},\"Arctic\":{\"Longyearbyen\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}]},\"Asia\":{\"Aden\":[{\"usesMetazone\":{\"_mzone\":\"Arabian\"}}],\"Almaty\":[{\"usesMetazone\":{\"_mzone\":\"Almaty\",\"_to\":\"2004-10-30 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Eastern\",\"_from\":\"2004-10-30 20:00\"}}],\"Amman\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Anadyr\":[{\"usesMetazone\":{\"_mzone\":\"Anadyr\",\"_to\":\"2010-03-27 14:00\"}},{\"usesMetazone\":{\"_mzone\":\"Magadan\",\"_from\":\"2010-03-27 14:00\",\"_to\":\"2014-10-25 14:00\"}},{\"usesMetazone\":{\"_mzone\":\"Anadyr\",\"_from\":\"2014-10-25 14:00\"}}],\"Aqtau\":[{\"usesMetazone\":{\"_mzone\":\"Shevchenko\",\"_to\":\"1991-12-15 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Aqtau\",\"_from\":\"1991-12-15 19:00\",\"_to\":\"2004-10-30 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Western\",\"_from\":\"2004-10-30 22:00\"}}],\"Aqtobe\":[{\"usesMetazone\":{\"_mzone\":\"Aktyubinsk\",\"_to\":\"1991-12-15 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Aqtobe\",\"_from\":\"1991-12-15 19:00\",\"_to\":\"2004-10-30 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Western\",\"_from\":\"2005-10-30 21:00\"}}],\"Ashgabat\":[{\"usesMetazone\":{\"_mzone\":\"Ashkhabad\",\"_to\":\"1991-10-26 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Turkmenistan\",\"_from\":\"1991-10-26 20:00\"}}],\"Atyrau\":[{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Western\",\"_from\":\"2004-10-30 22:00\"}}],\"Baghdad\":[{\"usesMetazone\":{\"_mzone\":\"Arabian\"}}],\"Bahrain\":[{\"usesMetazone\":{\"_mzone\":\"Gulf\",\"_to\":\"1972-05-31 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Arabian\",\"_from\":\"1972-05-31 20:00\"}}],\"Baku\":[{\"usesMetazone\":{\"_mzone\":\"Baku\",\"_to\":\"1991-08-29 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Azerbaijan\",\"_from\":\"1991-08-29 20:00\"}}],\"Bangkok\":[{\"usesMetazone\":{\"_mzone\":\"Indochina\"}}],\"Beirut\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Bishkek\":[{\"usesMetazone\":{\"_mzone\":\"Frunze\",\"_to\":\"1991-08-30 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kyrgystan\",\"_from\":\"1991-08-30 20:00\"}}],\"Brunei\":[{\"usesMetazone\":{\"_mzone\":\"Brunei\"}}],\"Calcutta\":[{\"usesMetazone\":{\"_mzone\":\"India\"}}],\"Chita\":[{\"usesMetazone\":{\"_mzone\":\"Yakutsk\",\"_to\":\"2014-10-25 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Irkutsk\",\"_from\":\"2014-10-25 16:00\",\"_to\":\"2016-03-26 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yakutsk\",\"_from\":\"2016-03-26 18:00\"}}],\"Choibalsan\":[{\"usesMetazone\":{\"_mzone\":\"Mongolia\",\"_to\":\"1983-03-31 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Choibalsan\",\"_from\":\"1983-03-31 16:00\"}}],\"Colombo\":[{\"usesMetazone\":{\"_mzone\":\"India\",\"_to\":\"1996-05-24 18:30\"}},{\"usesMetazone\":{\"_mzone\":\"Lanka\",\"_from\":\"1996-05-24 18:30\",\"_to\":\"2006-04-14 18:30\"}},{\"usesMetazone\":{\"_mzone\":\"India\",\"_from\":\"2006-04-14 18:30\"}}],\"Damascus\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Dhaka\":[{\"usesMetazone\":{\"_mzone\":\"Dacca\",\"_to\":\"1971-03-25 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Bangladesh\",\"_from\":\"1971-03-25 18:00\"}}],\"Dili\":[{\"usesMetazone\":{\"_mzone\":\"East_Timor\",\"_to\":\"1976-05-02 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Indonesia_Central\",\"_from\":\"1976-05-02 15:00\",\"_to\":\"2000-09-16 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"East_Timor\",\"_from\":\"2000-09-16 16:00\"}}],\"Dubai\":[{\"usesMetazone\":{\"_mzone\":\"Gulf\"}}],\"Dushanbe\":[{\"usesMetazone\":{\"_mzone\":\"Dushanbe\",\"_to\":\"1991-09-08 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Tajikistan\",\"_from\":\"1991-09-08 21:00\"}}],\"Famagusta\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_to\":\"2016-09-07 21:00\"}}],\"Gaza\":[{\"usesMetazone\":{\"_mzone\":\"Israel\",\"_to\":\"1995-12-31 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1995-12-31 22:00\"}}],\"Hebron\":[{\"usesMetazone\":{\"_mzone\":\"Israel\",\"_to\":\"1995-12-31 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1995-12-31 22:00\"}}],\"Hong_Kong\":[{\"usesMetazone\":{\"_mzone\":\"Hong_Kong\"}}],\"Hovd\":[{\"usesMetazone\":{\"_mzone\":\"Hovd\"}}],\"Irkutsk\":[{\"usesMetazone\":{\"_mzone\":\"Irkutsk\"}}],\"Jakarta\":[{\"usesMetazone\":{\"_mzone\":\"Indonesia_Western\"}}],\"Jayapura\":[{\"usesMetazone\":{\"_mzone\":\"Indonesia_Eastern\"}}],\"Jerusalem\":[{\"usesMetazone\":{\"_mzone\":\"Israel\"}}],\"Kabul\":[{\"usesMetazone\":{\"_mzone\":\"Afghanistan\"}}],\"Kamchatka\":[{\"usesMetazone\":{\"_mzone\":\"Kamchatka\"}}],\"Karachi\":[{\"usesMetazone\":{\"_mzone\":\"Karachi\",\"_to\":\"1971-03-25 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Pakistan\",\"_from\":\"1971-03-25 19:00\"}}],\"Katmandu\":[{\"usesMetazone\":{\"_mzone\":\"Nepal\"}}],\"Khandyga\":[{\"usesMetazone\":{\"_mzone\":\"Yakutsk\",\"_to\":\"2003-12-31 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Vladivostok\",\"_from\":\"2003-12-31 15:00\",\"_to\":\"2011-09-12 13:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yakutsk\",\"_from\":\"2011-09-12 13:00\"}}],\"Krasnoyarsk\":[{\"usesMetazone\":{\"_mzone\":\"Krasnoyarsk\"}}],\"Kuala_Lumpur\":[{\"usesMetazone\":{\"_mzone\":\"Malaya\",\"_to\":\"1981-12-31 16:30\"}},{\"usesMetazone\":{\"_mzone\":\"Malaysia\",\"_from\":\"1981-12-31 16:30\"}}],\"Kuching\":[{\"usesMetazone\":{\"_mzone\":\"Borneo\",\"_to\":\"1981-12-31 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Malaysia\",\"_from\":\"1981-12-31 16:00\"}}],\"Kuwait\":[{\"usesMetazone\":{\"_mzone\":\"Arabian\"}}],\"Macau\":[{\"usesMetazone\":{\"_mzone\":\"Macau\",\"_to\":\"1999-12-19 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"China\",\"_from\":\"1999-12-19 16:00\"}}],\"Magadan\":[{\"usesMetazone\":{\"_mzone\":\"Magadan\"}}],\"Makassar\":[{\"usesMetazone\":{\"_mzone\":\"Indonesia_Central\"}}],\"Manila\":[{\"usesMetazone\":{\"_mzone\":\"Philippines\"}}],\"Muscat\":[{\"usesMetazone\":{\"_mzone\":\"Gulf\"}}],\"Nicosia\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Novokuznetsk\":[{\"usesMetazone\":{\"_mzone\":\"Krasnoyarsk\",\"_to\":\"2010-03-27 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Novosibirsk\",\"_from\":\"2010-03-27 19:00\",\"_to\":\"2014-10-25 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Krasnoyarsk\",\"_from\":\"2014-10-25 19:00\"}}],\"Novosibirsk\":[{\"usesMetazone\":{\"_mzone\":\"Novosibirsk\"}}],\"Omsk\":[{\"usesMetazone\":{\"_mzone\":\"Omsk\"}}],\"Oral\":[{\"usesMetazone\":{\"_mzone\":\"Uralsk\",\"_to\":\"1991-12-15 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Oral\",\"_from\":\"1991-12-15 20:00\",\"_to\":\"2004-10-30 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Western\",\"_from\":\"2004-10-30 22:00\"}}],\"Phnom_Penh\":[{\"usesMetazone\":{\"_mzone\":\"Indochina\"}}],\"Pontianak\":[{\"usesMetazone\":{\"_mzone\":\"Indonesia_Central\",\"_to\":\"1987-12-31 16:00\"}},{\"usesMetazone\":{\"_mzone\":\"Indonesia_Western\",\"_from\":\"1987-12-31 16:00\"}}],\"Pyongyang\":[{\"usesMetazone\":{\"_mzone\":\"Korea\",\"_to\":\"2015-08-14 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Pyongyang\",\"_from\":\"2015-08-14 15:00\",\"_to\":\"2018-05-04 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Korea\",\"_from\":\"2018-05-04 15:00\"}}],\"Qatar\":[{\"usesMetazone\":{\"_mzone\":\"Gulf\",\"_to\":\"1972-05-31 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Arabian\",\"_from\":\"1972-05-31 20:00\"}}],\"Qostanay\":[{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Eastern\",\"_from\":\"2004-10-30 21:00\"}}],\"Qyzylorda\":[{\"usesMetazone\":{\"_mzone\":\"Kizilorda\",\"_to\":\"1991-12-15 19:00\"}},{\"usesMetazone\":{\"_mzone\":\"Qyzylorda\",\"_from\":\"1991-12-15 19:00\",\"_to\":\"2004-10-30 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Eastern\",\"_from\":\"2004-10-30 21:00\",\"_to\":\"2018-12-20 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Kazakhstan_Western\",\"_from\":\"2018-12-20 18:00\"}}],\"Rangoon\":[{\"usesMetazone\":{\"_mzone\":\"Myanmar\"}}],\"Riyadh\":[{\"usesMetazone\":{\"_mzone\":\"Arabian\"}}],\"Saigon\":[{\"usesMetazone\":{\"_mzone\":\"Indochina\",\"_from\":\"1975-06-12 16:00\"}}],\"Sakhalin\":[{\"usesMetazone\":{\"_mzone\":\"Sakhalin\"}}],\"Samarkand\":[{\"usesMetazone\":{\"_mzone\":\"Samarkand\",\"_to\":\"1981-09-30 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Tashkent\",\"_from\":\"1981-09-30 18:00\",\"_to\":\"1982-03-31 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Samarkand\",\"_from\":\"1982-03-31 18:00\",\"_to\":\"1991-08-31 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Uzbekistan\",\"_from\":\"1991-08-31 18:00\"}}],\"Seoul\":[{\"usesMetazone\":{\"_mzone\":\"Korea\"}}],\"Shanghai\":[{\"usesMetazone\":{\"_mzone\":\"China\"}}],\"Singapore\":[{\"usesMetazone\":{\"_mzone\":\"Singapore\"}}],\"Srednekolymsk\":[{\"usesMetazone\":{\"_mzone\":\"Magadan\",\"_to\":\"2014-10-25 14:00\"}}],\"Taipei\":[{\"usesMetazone\":{\"_mzone\":\"Taipei\"}}],\"Tashkent\":[{\"usesMetazone\":{\"_mzone\":\"Tashkent\",\"_to\":\"1991-08-31 18:00\"}},{\"usesMetazone\":{\"_mzone\":\"Uzbekistan\",\"_from\":\"1991-08-31 18:00\"}}],\"Tbilisi\":[{\"usesMetazone\":{\"_mzone\":\"Tbilisi\",\"_to\":\"1991-04-08 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Georgia\",\"_from\":\"1991-04-08 20:00\"}}],\"Tehran\":[{\"usesMetazone\":{\"_mzone\":\"Iran\"}}],\"Thimphu\":[{\"usesMetazone\":{\"_mzone\":\"India\",\"_to\":\"1987-09-30 18:30\"}},{\"usesMetazone\":{\"_mzone\":\"Bhutan\",\"_from\":\"1987-09-30 18:30\"}}],\"Tokyo\":[{\"usesMetazone\":{\"_mzone\":\"Japan\"}}],\"Ulaanbaatar\":[{\"usesMetazone\":{\"_mzone\":\"Mongolia\"}}],\"Urumqi\":[{\"usesMetazone\":{\"_mzone\":\"Urumqi\"}}],\"Ust-Nera\":[{\"usesMetazone\":{\"_mzone\":\"Yakutsk\",\"_to\":\"1981-03-31 15:00\"}},{\"usesMetazone\":{\"_mzone\":\"Magadan\",\"_from\":\"1981-03-31 15:00\",\"_to\":\"2011-09-12 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Vladivostok\",\"_from\":\"2011-09-12 12:00\"}}],\"Vientiane\":[{\"usesMetazone\":{\"_mzone\":\"Indochina\"}}],\"Vladivostok\":[{\"usesMetazone\":{\"_mzone\":\"Vladivostok\"}}],\"Yakutsk\":[{\"usesMetazone\":{\"_mzone\":\"Yakutsk\"}}],\"Yekaterinburg\":[{\"usesMetazone\":{\"_mzone\":\"Sverdlovsk\",\"_to\":\"1992-01-18 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Yekaterinburg\",\"_from\":\"1992-01-18 22:00\"}}],\"Yerevan\":[{\"usesMetazone\":{\"_mzone\":\"Yerevan\",\"_to\":\"1991-09-22 20:00\"}},{\"usesMetazone\":{\"_mzone\":\"Armenia\",\"_from\":\"1991-09-22 20:00\"}}]},\"Atlantic\":{\"Azores\":[{\"usesMetazone\":{\"_mzone\":\"Azores\",\"_to\":\"1992-09-27 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1992-09-27 02:00\",\"_to\":\"1993-03-28 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Azores\",\"_from\":\"1993-03-28 01:00\"}}],\"Bermuda\":[{\"usesMetazone\":{\"_mzone\":\"Atlantic\"}}],\"Canary\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\"}}],\"Cape_Verde\":[{\"usesMetazone\":{\"_mzone\":\"Cape_Verde\"}}],\"Faeroe\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\"}}],\"Madeira\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Western\"}}],\"Reykjavik\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"South_Georgia\":[{\"usesMetazone\":{\"_mzone\":\"South_Georgia\"}}],\"St_Helena\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}],\"Stanley\":[{\"usesMetazone\":{\"_mzone\":\"Falkland\"}}]},\"Australia\":{\"Adelaide\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Central\"}}],\"Brisbane\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}],\"Broken_Hill\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Central\"}}],\"Currie\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}],\"Darwin\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Central\"}}],\"Eucla\":[{\"usesMetazone\":{\"_mzone\":\"Australia_CentralWestern\"}}],\"Hobart\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}],\"Lindeman\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}],\"Lord_Howe\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\",\"_to\":\"1981-02-28 14:00\"}},{\"usesMetazone\":{\"_mzone\":\"Lord_Howe\",\"_from\":\"1981-02-28 14:00\"}}],\"Melbourne\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}],\"Perth\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Western\"}}],\"Sydney\":[{\"usesMetazone\":{\"_mzone\":\"Australia_Eastern\"}}]},\"CST6CDT\":[{\"usesMetazone\":{\"_mzone\":\"America_Central\"}}],\"EST5EDT\":[{\"usesMetazone\":{\"_mzone\":\"America_Eastern\"}}],\"Etc\":{\"GMT\":[{\"usesMetazone\":{\"_mzone\":\"GMT\"}}]},\"Europe\":{\"Amsterdam\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Andorra\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Astrakhan\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1992-03-28 22:00\",\"_to\":\"2016-03-26 23:00\"}}],\"Athens\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Belgrade\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Berlin\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Bratislava\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Brussels\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Bucharest\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Budapest\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Busingen\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Chisinau\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1990-05-05 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1990-05-05 21:00\"}}],\"Copenhagen\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Dublin\":[{\"usesMetazone\":{\"_mzone\":\"Irish\",\"_to\":\"1971-10-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1971-10-31 02:00\"}}],\"Gibraltar\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Guernsey\":[{\"usesMetazone\":{\"_mzone\":\"British\",\"_to\":\"1971-10-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1971-10-31 02:00\"}}],\"Helsinki\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Isle_of_Man\":[{\"usesMetazone\":{\"_mzone\":\"British\",\"_to\":\"1971-10-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1971-10-31 02:00\"}}],\"Istanbul\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_to\":\"1978-06-28 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Turkey\",\"_from\":\"1978-06-28 21:00\",\"_to\":\"1985-04-19 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1985-04-19 21:00\",\"_to\":\"2016-09-06 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Turkey\",\"_from\":\"2016-09-06 21:00\"}}],\"Jersey\":[{\"usesMetazone\":{\"_mzone\":\"British\",\"_to\":\"1971-10-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1971-10-31 02:00\"}}],\"Kaliningrad\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1989-03-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1989-03-25 23:00\",\"_to\":\"2011-03-27 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Further_Eastern\",\"_from\":\"2011-03-27 00:00\",\"_to\":\"2014-10-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"2014-10-25 23:00\"}}],\"Kiev\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1990-06-30 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1990-06-30 22:00\"}}],\"Lisbon\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_to\":\"1976-09-26 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1976-09-26 00:00\",\"_to\":\"1992-09-27 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1992-09-27 01:00\",\"_to\":\"1996-03-31 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Western\",\"_from\":\"1996-03-31 01:00\"}}],\"Ljubljana\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"London\":[{\"usesMetazone\":{\"_mzone\":\"British\",\"_to\":\"1971-10-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"GMT\",\"_from\":\"1971-10-31 02:00\"}}],\"Luxembourg\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Madrid\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Malta\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Mariehamn\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Minsk\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1991-03-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1991-03-30 23:00\",\"_to\":\"2011-03-27 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Further_Eastern\",\"_from\":\"2011-03-27 00:00\",\"_to\":\"2014-10-26 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"2014-10-26 22:00\"}}],\"Monaco\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Moscow\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1991-03-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1991-03-30 23:00\",\"_to\":\"1992-01-19 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1992-01-19 00:00\"}}],\"Oslo\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Paris\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Podgorica\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Prague\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Riga\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1989-03-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1989-03-25 23:00\"}}],\"Rome\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Samara\":[{\"usesMetazone\":{\"_mzone\":\"Kuybyshev\",\"_to\":\"1989-03-25 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1989-03-25 22:00\",\"_to\":\"1991-03-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1991-03-30 23:00\",\"_to\":\"1991-09-29 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Samara\",\"_from\":\"1991-09-29 00:00\"}}],\"San_Marino\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Sarajevo\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Saratov\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1992-03-28 22:00\",\"_to\":\"2016-12-03 23:00\"}}],\"Simferopol\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1990-06-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1990-06-30 23:00\",\"_to\":\"1994-04-30 21:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1994-04-30 21:00\",\"_to\":\"1997-03-30 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1997-03-30 01:00\",\"_to\":\"2014-03-30 00:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"2014-03-30 00:00\"}}],\"Skopje\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Sofia\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\"}}],\"Stockholm\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Tallinn\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1989-03-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1989-03-25 23:00\"}}],\"Tirane\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Ulyanovsk\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1992-01-19 00:00\",\"_to\":\"2016-03-26 23:00\"}}],\"Uzhgorod\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1990-06-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1990-06-30 23:00\",\"_to\":\"1991-03-31 02:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1991-03-31 02:00\"}}],\"Vaduz\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Vatican\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Vienna\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Vilnius\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1989-03-25 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1989-03-25 23:00\",\"_to\":\"1998-03-29 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Central\",\"_from\":\"1998-03-29 01:00\",\"_to\":\"1999-10-31 01:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1999-10-31 01:00\"}}],\"Volgograd\":[{\"usesMetazone\":{\"_mzone\":\"Volgograd\",\"_to\":\"1992-03-28 22:00\"}},{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_from\":\"1992-03-28 22:00\",\"_to\":\"2018-10-27 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Volgograd\",\"_from\":\"2018-10-27 23:00\"}}],\"Warsaw\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Zagreb\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}],\"Zaporozhye\":[{\"usesMetazone\":{\"_mzone\":\"Moscow\",\"_to\":\"1991-03-30 23:00\"}},{\"usesMetazone\":{\"_mzone\":\"Europe_Eastern\",\"_from\":\"1991-03-30 23:00\"}}],\"Zurich\":[{\"usesMetazone\":{\"_mzone\":\"Europe_Central\"}}]},\"Indian\":{\"Antananarivo\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Chagos\":[{\"usesMetazone\":{\"_mzone\":\"Indian_Ocean\"}}],\"Christmas\":[{\"usesMetazone\":{\"_mzone\":\"Christmas\"}}],\"Cocos\":[{\"usesMetazone\":{\"_mzone\":\"Cocos\"}}],\"Comoro\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Kerguelen\":[{\"usesMetazone\":{\"_mzone\":\"French_Southern\"}}],\"Mahe\":[{\"usesMetazone\":{\"_mzone\":\"Seychelles\"}}],\"Maldives\":[{\"usesMetazone\":{\"_mzone\":\"Maldives\"}}],\"Mauritius\":[{\"usesMetazone\":{\"_mzone\":\"Mauritius\"}}],\"Mayotte\":[{\"usesMetazone\":{\"_mzone\":\"Africa_Eastern\"}}],\"Reunion\":[{\"usesMetazone\":{\"_mzone\":\"Reunion\"}}]},\"MST7MDT\":[{\"usesMetazone\":{\"_mzone\":\"America_Mountain\"}}],\"Pacific\":{\"Apia\":[{\"usesMetazone\":{\"_mzone\":\"Apia\"}}],\"Auckland\":[{\"usesMetazone\":{\"_mzone\":\"New_Zealand\"}}],\"Bougainville\":[{\"usesMetazone\":{\"_mzone\":\"Papua_New_Guinea\",\"_to\":\"2014-12-27 16:00\"}}],\"Chatham\":[{\"usesMetazone\":{\"_mzone\":\"Chatham\"}}],\"Easter\":[{\"usesMetazone\":{\"_mzone\":\"Easter\"}}],\"Efate\":[{\"usesMetazone\":{\"_mzone\":\"Vanuatu\"}}],\"Enderbury\":[{\"usesMetazone\":{\"_mzone\":\"Phoenix_Islands\"}}],\"Fakaofo\":[{\"usesMetazone\":{\"_mzone\":\"Tokelau\"}}],\"Fiji\":[{\"usesMetazone\":{\"_mzone\":\"Fiji\"}}],\"Funafuti\":[{\"usesMetazone\":{\"_mzone\":\"Tuvalu\"}}],\"Galapagos\":[{\"usesMetazone\":{\"_mzone\":\"Ecuador\",\"_to\":\"1986-01-01 05:00\"}},{\"usesMetazone\":{\"_mzone\":\"Galapagos\",\"_from\":\"1986-01-01 05:00\"}}],\"Gambier\":[{\"usesMetazone\":{\"_mzone\":\"Gambier\"}}],\"Guadalcanal\":[{\"usesMetazone\":{\"_mzone\":\"Solomon\"}}],\"Guam\":[{\"usesMetazone\":{\"_mzone\":\"Guam\",\"_to\":\"2000-12-22 14:00\"}},{\"usesMetazone\":{\"_mzone\":\"Chamorro\",\"_from\":\"2000-12-22 14:00\"}}],\"Honolulu\":[{\"usesMetazone\":{\"_mzone\":\"Alaska_Hawaii\",\"_to\":\"1983-10-30 11:00\"}},{\"usesMetazone\":{\"_mzone\":\"Hawaii_Aleutian\",\"_from\":\"1983-10-30 11:00\"}}],\"Johnston\":[{\"usesMetazone\":{\"_mzone\":\"Alaska_Hawaii\",\"_to\":\"1983-10-30 11:00\"}},{\"usesMetazone\":{\"_mzone\":\"Hawaii_Aleutian\",\"_from\":\"1983-10-30 11:00\"}}],\"Kiritimati\":[{\"usesMetazone\":{\"_mzone\":\"Line_Islands\"}}],\"Kosrae\":[{\"usesMetazone\":{\"_mzone\":\"Kosrae\"}}],\"Kwajalein\":[{\"usesMetazone\":{\"_mzone\":\"Kwajalein\",\"_to\":\"1993-08-21 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Marshall_Islands\",\"_from\":\"1993-08-21 12:00\"}}],\"Majuro\":[{\"usesMetazone\":{\"_mzone\":\"Marshall_Islands\"}}],\"Marquesas\":[{\"usesMetazone\":{\"_mzone\":\"Marquesas\"}}],\"Midway\":[{\"usesMetazone\":{\"_mzone\":\"Bering\",\"_to\":\"1983-10-30 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Samoa\",\"_from\":\"1983-10-30 12:00\"}}],\"Nauru\":[{\"usesMetazone\":{\"_mzone\":\"Nauru\"}}],\"Niue\":[{\"usesMetazone\":{\"_mzone\":\"Niue\"}}],\"Norfolk\":[{\"usesMetazone\":{\"_mzone\":\"Norfolk\"}}],\"Noumea\":[{\"usesMetazone\":{\"_mzone\":\"New_Caledonia\"}}],\"Pago_Pago\":[{\"usesMetazone\":{\"_mzone\":\"Bering\",\"_to\":\"1983-10-30 12:00\"}},{\"usesMetazone\":{\"_mzone\":\"Samoa\",\"_from\":\"1983-10-30 12:00\"}}],\"Palau\":[{\"usesMetazone\":{\"_mzone\":\"Palau\"}}],\"Pitcairn\":[{\"usesMetazone\":{\"_mzone\":\"Pitcairn\"}}],\"Ponape\":[{\"usesMetazone\":{\"_mzone\":\"Ponape\"}}],\"Port_Moresby\":[{\"usesMetazone\":{\"_mzone\":\"Papua_New_Guinea\"}}],\"Rarotonga\":[{\"usesMetazone\":{\"_mzone\":\"Cook\"}}],\"Saipan\":[{\"usesMetazone\":{\"_mzone\":\"North_Mariana\",\"_to\":\"2000-12-22 14:00\"}},{\"usesMetazone\":{\"_mzone\":\"Chamorro\",\"_from\":\"2000-12-22 14:00\"}}],\"Tahiti\":[{\"usesMetazone\":{\"_mzone\":\"Tahiti\"}}],\"Tarawa\":[{\"usesMetazone\":{\"_mzone\":\"Gilbert_Islands\"}}],\"Tongatapu\":[{\"usesMetazone\":{\"_mzone\":\"Tonga\"}}],\"Truk\":[{\"usesMetazone\":{\"_mzone\":\"Truk\"}}],\"Wake\":[{\"usesMetazone\":{\"_mzone\":\"Wake\"}}],\"Wallis\":[{\"usesMetazone\":{\"_mzone\":\"Wallis\"}}]},\"PST8PDT\":[{\"usesMetazone\":{\"_mzone\":\"America_Pacific\"}}]}},\"metazones\":[{\"mapZone\":{\"_other\":\"Acre\",\"_type\":\"America/Rio_Branco\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Afghanistan\",\"_type\":\"Asia/Kabul\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Maputo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Bujumbura\",\"_territory\":\"BI\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Gaborone\",\"_territory\":\"BW\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Lubumbashi\",\"_territory\":\"CD\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Blantyre\",\"_territory\":\"MW\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Kigali\",\"_territory\":\"RW\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Lusaka\",\"_territory\":\"ZM\"}},{\"mapZone\":{\"_other\":\"Africa_Central\",\"_type\":\"Africa/Harare\",\"_territory\":\"ZW\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Nairobi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Djibouti\",\"_territory\":\"DJ\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Asmera\",\"_territory\":\"ER\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Addis_Ababa\",\"_territory\":\"ET\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Indian/Comoro\",\"_territory\":\"KM\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Indian/Antananarivo\",\"_territory\":\"MG\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Mogadishu\",\"_territory\":\"SO\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Dar_es_Salaam\",\"_territory\":\"TZ\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Africa/Kampala\",\"_territory\":\"UG\"}},{\"mapZone\":{\"_other\":\"Africa_Eastern\",\"_type\":\"Indian/Mayotte\",\"_territory\":\"YT\"}},{\"mapZone\":{\"_other\":\"Africa_FarWestern\",\"_type\":\"Africa/El_Aaiun\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Southern\",\"_type\":\"Africa/Johannesburg\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Southern\",\"_type\":\"Africa/Maseru\",\"_territory\":\"LS\"}},{\"mapZone\":{\"_other\":\"Africa_Southern\",\"_type\":\"Africa/Mbabane\",\"_territory\":\"SZ\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Lagos\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Luanda\",\"_territory\":\"AO\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Porto-Novo\",\"_territory\":\"BJ\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Kinshasa\",\"_territory\":\"CD\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Bangui\",\"_territory\":\"CF\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Brazzaville\",\"_territory\":\"CG\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Douala\",\"_territory\":\"CM\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Libreville\",\"_territory\":\"GA\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Malabo\",\"_territory\":\"GQ\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Niamey\",\"_territory\":\"NE\"}},{\"mapZone\":{\"_other\":\"Africa_Western\",\"_type\":\"Africa/Ndjamena\",\"_territory\":\"TD\"}},{\"mapZone\":{\"_other\":\"Aktyubinsk\",\"_type\":\"Asia/Aqtobe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Alaska\",\"_type\":\"America/Juneau\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Alaska_Hawaii\",\"_type\":\"America/Anchorage\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Almaty\",\"_type\":\"Asia/Almaty\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Amazon\",\"_type\":\"America/Manaus\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Chicago\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Belize\",\"_territory\":\"BZ\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Winnipeg\",\"_territory\":\"CA\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Costa_Rica\",\"_territory\":\"CR\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Guatemala\",\"_territory\":\"GT\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Tegucigalpa\",\"_territory\":\"HN\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/Mexico_City\",\"_territory\":\"MX\"}},{\"mapZone\":{\"_other\":\"America_Central\",\"_type\":\"America/El_Salvador\",\"_territory\":\"SV\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/New_York\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Nassau\",\"_territory\":\"BS\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Toronto\",\"_territory\":\"CA\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Port-au-Prince\",\"_territory\":\"HT\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Jamaica\",\"_territory\":\"JM\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Cayman\",\"_territory\":\"KY\"}},{\"mapZone\":{\"_other\":\"America_Eastern\",\"_type\":\"America/Panama\",\"_territory\":\"PA\"}},{\"mapZone\":{\"_other\":\"America_Mountain\",\"_type\":\"America/Denver\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"America_Mountain\",\"_type\":\"America/Edmonton\",\"_territory\":\"CA\"}},{\"mapZone\":{\"_other\":\"America_Mountain\",\"_type\":\"America/Hermosillo\",\"_territory\":\"MX\"}},{\"mapZone\":{\"_other\":\"America_Pacific\",\"_type\":\"America/Los_Angeles\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"America_Pacific\",\"_type\":\"America/Vancouver\",\"_territory\":\"CA\"}},{\"mapZone\":{\"_other\":\"America_Pacific\",\"_type\":\"America/Tijuana\",\"_territory\":\"MX\"}},{\"mapZone\":{\"_other\":\"Anadyr\",\"_type\":\"Asia/Anadyr\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Apia\",\"_type\":\"Pacific/Apia\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Aqtau\",\"_type\":\"Asia/Aqtau\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Aqtobe\",\"_type\":\"Asia/Aqtobe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Riyadh\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Bahrain\",\"_territory\":\"BH\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Baghdad\",\"_territory\":\"IQ\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Kuwait\",\"_territory\":\"KW\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Qatar\",\"_territory\":\"QA\"}},{\"mapZone\":{\"_other\":\"Arabian\",\"_type\":\"Asia/Aden\",\"_territory\":\"YE\"}},{\"mapZone\":{\"_other\":\"Argentina\",\"_type\":\"America/Buenos_Aires\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Argentina_Western\",\"_type\":\"America/Argentina/San_Luis\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Armenia\",\"_type\":\"Asia/Yerevan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Ashkhabad\",\"_type\":\"Asia/Ashgabat\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Halifax\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Antigua\",\"_territory\":\"AG\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Anguilla\",\"_territory\":\"AI\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Aruba\",\"_territory\":\"AW\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Barbados\",\"_territory\":\"BB\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"Atlantic/Bermuda\",\"_territory\":\"BM\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Kralendijk\",\"_territory\":\"BQ\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Curacao\",\"_territory\":\"CW\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Dominica\",\"_territory\":\"DM\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Grenada\",\"_territory\":\"GD\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Thule\",\"_territory\":\"GL\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Guadeloupe\",\"_territory\":\"GP\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/St_Kitts\",\"_territory\":\"KN\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/St_Lucia\",\"_territory\":\"LC\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Marigot\",\"_territory\":\"MF\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Martinique\",\"_territory\":\"MQ\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Montserrat\",\"_territory\":\"MS\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Puerto_Rico\",\"_territory\":\"PR\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Lower_Princes\",\"_territory\":\"SX\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Port_of_Spain\",\"_territory\":\"TT\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/St_Vincent\",\"_territory\":\"VC\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/Tortola\",\"_territory\":\"VG\"}},{\"mapZone\":{\"_other\":\"Atlantic\",\"_type\":\"America/St_Thomas\",\"_territory\":\"VI\"}},{\"mapZone\":{\"_other\":\"Australia_Central\",\"_type\":\"Australia/Adelaide\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Australia_CentralWestern\",\"_type\":\"Australia/Eucla\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Australia_Eastern\",\"_type\":\"Australia/Sydney\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Australia_Western\",\"_type\":\"Australia/Perth\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Azerbaijan\",\"_type\":\"Asia/Baku\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Azores\",\"_type\":\"Atlantic/Azores\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Baku\",\"_type\":\"Asia/Baku\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Bangladesh\",\"_type\":\"Asia/Dhaka\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Bering\",\"_type\":\"America/Adak\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Bhutan\",\"_type\":\"Asia/Thimphu\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Bolivia\",\"_type\":\"America/La_Paz\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Borneo\",\"_type\":\"Asia/Kuching\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Brasilia\",\"_type\":\"America/Sao_Paulo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"British\",\"_type\":\"Europe/London\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Brunei\",\"_type\":\"Asia/Brunei\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Cape_Verde\",\"_type\":\"Atlantic/Cape_Verde\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Casey\",\"_type\":\"Antarctica/Casey\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Chamorro\",\"_type\":\"Pacific/Saipan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Chamorro\",\"_type\":\"Pacific/Guam\",\"_territory\":\"GU\"}},{\"mapZone\":{\"_other\":\"Chatham\",\"_type\":\"Pacific/Chatham\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Chile\",\"_type\":\"America/Santiago\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"China\",\"_type\":\"Asia/Shanghai\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Choibalsan\",\"_type\":\"Asia/Choibalsan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Christmas\",\"_type\":\"Indian/Christmas\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Cocos\",\"_type\":\"Indian/Cocos\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Colombia\",\"_type\":\"America/Bogota\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Cook\",\"_type\":\"Pacific/Rarotonga\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Cuba\",\"_type\":\"America/Havana\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Dacca\",\"_type\":\"Asia/Dhaka\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Davis\",\"_type\":\"Antarctica/Davis\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Dominican\",\"_type\":\"America/Santo_Domingo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"DumontDUrville\",\"_type\":\"Antarctica/DumontDUrville\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Dushanbe\",\"_type\":\"Asia/Dushanbe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Dutch_Guiana\",\"_type\":\"America/Paramaribo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"East_Timor\",\"_type\":\"Asia/Dili\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Easter\",\"_type\":\"Pacific/Easter\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Ecuador\",\"_type\":\"America/Guayaquil\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Paris\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Andorra\",\"_territory\":\"AD\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Tirane\",\"_territory\":\"AL\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Vienna\",\"_territory\":\"AT\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Sarajevo\",\"_territory\":\"BA\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Brussels\",\"_territory\":\"BE\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Zurich\",\"_territory\":\"CH\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Prague\",\"_territory\":\"CZ\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Berlin\",\"_territory\":\"DE\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Copenhagen\",\"_territory\":\"DK\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Madrid\",\"_territory\":\"ES\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Gibraltar\",\"_territory\":\"GI\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Zagreb\",\"_territory\":\"HR\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Budapest\",\"_territory\":\"HU\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Rome\",\"_territory\":\"IT\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Vaduz\",\"_territory\":\"LI\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Luxembourg\",\"_territory\":\"LU\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Monaco\",\"_territory\":\"MC\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Podgorica\",\"_territory\":\"ME\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Skopje\",\"_territory\":\"MK\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Malta\",\"_territory\":\"MT\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Amsterdam\",\"_territory\":\"NL\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Oslo\",\"_territory\":\"NO\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Warsaw\",\"_territory\":\"PL\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Belgrade\",\"_territory\":\"RS\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Stockholm\",\"_territory\":\"SE\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Ljubljana\",\"_territory\":\"SI\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Bratislava\",\"_territory\":\"SK\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/San_Marino\",\"_territory\":\"SM\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Africa/Tunis\",\"_territory\":\"TN\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Vatican\",\"_territory\":\"VA\"}},{\"mapZone\":{\"_other\":\"Europe_Central\",\"_type\":\"Europe/Belgrade\",\"_territory\":\"XK\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Europe/Bucharest\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Europe/Mariehamn\",\"_territory\":\"AX\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Europe/Sofia\",\"_territory\":\"BG\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Asia/Nicosia\",\"_territory\":\"CY\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Africa/Cairo\",\"_territory\":\"EG\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Europe/Helsinki\",\"_territory\":\"FI\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Europe/Athens\",\"_territory\":\"GR\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Asia/Amman\",\"_territory\":\"JO\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Asia/Beirut\",\"_territory\":\"LB\"}},{\"mapZone\":{\"_other\":\"Europe_Eastern\",\"_type\":\"Asia/Damascus\",\"_territory\":\"SY\"}},{\"mapZone\":{\"_other\":\"Europe_Further_Eastern\",\"_type\":\"Europe/Minsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Europe_Further_Eastern\",\"_type\":\"Europe/Kaliningrad\",\"_territory\":\"RU\"}},{\"mapZone\":{\"_other\":\"Europe_Western\",\"_type\":\"Atlantic/Canary\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Europe_Western\",\"_type\":\"Atlantic/Faeroe\",\"_territory\":\"FO\"}},{\"mapZone\":{\"_other\":\"Falkland\",\"_type\":\"Atlantic/Stanley\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Fiji\",\"_type\":\"Pacific/Fiji\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"French_Guiana\",\"_type\":\"America/Cayenne\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"French_Southern\",\"_type\":\"Indian/Kerguelen\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Frunze\",\"_type\":\"Asia/Bishkek\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Galapagos\",\"_type\":\"Pacific/Galapagos\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Gambier\",\"_type\":\"Pacific/Gambier\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Georgia\",\"_type\":\"Asia/Tbilisi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Gilbert_Islands\",\"_type\":\"Pacific/Tarawa\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Atlantic/Reykjavik\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Ouagadougou\",\"_territory\":\"BF\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Abidjan\",\"_territory\":\"CI\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Europe/London\",\"_territory\":\"GB\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Accra\",\"_territory\":\"GH\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Banjul\",\"_territory\":\"GM\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Conakry\",\"_territory\":\"GN\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Europe/Dublin\",\"_territory\":\"IE\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Bamako\",\"_territory\":\"ML\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Nouakchott\",\"_territory\":\"MR\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Atlantic/St_Helena\",\"_territory\":\"SH\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Freetown\",\"_territory\":\"SL\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Dakar\",\"_territory\":\"SN\"}},{\"mapZone\":{\"_other\":\"GMT\",\"_type\":\"Africa/Lome\",\"_territory\":\"TG\"}},{\"mapZone\":{\"_other\":\"Goose_Bay\",\"_type\":\"America/Goose_Bay\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Greenland_Central\",\"_type\":\"America/Scoresbysund\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Greenland_Eastern\",\"_type\":\"America/Scoresbysund\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Greenland_Western\",\"_type\":\"America/Godthab\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Guam\",\"_type\":\"Pacific/Guam\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Gulf\",\"_type\":\"Asia/Dubai\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Gulf\",\"_type\":\"Asia/Muscat\",\"_territory\":\"OM\"}},{\"mapZone\":{\"_other\":\"Guyana\",\"_type\":\"America/Guyana\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Hawaii_Aleutian\",\"_type\":\"Pacific/Honolulu\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Hong_Kong\",\"_type\":\"Asia/Hong_Kong\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Hovd\",\"_type\":\"Asia/Hovd\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"India\",\"_type\":\"Asia/Calcutta\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"India\",\"_type\":\"Asia/Colombo\",\"_territory\":\"LK\"}},{\"mapZone\":{\"_other\":\"Indian_Ocean\",\"_type\":\"Indian/Chagos\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Indochina\",\"_type\":\"Asia/Bangkok\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Indochina\",\"_type\":\"Asia/Phnom_Penh\",\"_territory\":\"KH\"}},{\"mapZone\":{\"_other\":\"Indochina\",\"_type\":\"Asia/Vientiane\",\"_territory\":\"LA\"}},{\"mapZone\":{\"_other\":\"Indonesia_Central\",\"_type\":\"Asia/Makassar\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Indonesia_Eastern\",\"_type\":\"Asia/Jayapura\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Indonesia_Western\",\"_type\":\"Asia/Jakarta\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Iran\",\"_type\":\"Asia/Tehran\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Irish\",\"_type\":\"Europe/Dublin\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Irkutsk\",\"_type\":\"Asia/Irkutsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Israel\",\"_type\":\"Asia/Jerusalem\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Japan\",\"_type\":\"Asia/Tokyo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kamchatka\",\"_type\":\"Asia/Kamchatka\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Karachi\",\"_type\":\"Asia/Karachi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kazakhstan_Eastern\",\"_type\":\"Asia/Almaty\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kazakhstan_Western\",\"_type\":\"Asia/Aqtobe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kizilorda\",\"_type\":\"Asia/Qyzylorda\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Korea\",\"_type\":\"Asia/Seoul\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kosrae\",\"_type\":\"Pacific/Kosrae\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Krasnoyarsk\",\"_type\":\"Asia/Krasnoyarsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kuybyshev\",\"_type\":\"Europe/Samara\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kwajalein\",\"_type\":\"Pacific/Kwajalein\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Kyrgystan\",\"_type\":\"Asia/Bishkek\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Lanka\",\"_type\":\"Asia/Colombo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Liberia\",\"_type\":\"Africa/Monrovia\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Line_Islands\",\"_type\":\"Pacific/Kiritimati\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Lord_Howe\",\"_type\":\"Australia/Lord_Howe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Macau\",\"_type\":\"Asia/Macau\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Macquarie\",\"_type\":\"Antarctica/Macquarie\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Magadan\",\"_type\":\"Asia/Magadan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Malaya\",\"_type\":\"Asia/Kuala_Lumpur\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Malaysia\",\"_type\":\"Asia/Kuching\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Maldives\",\"_type\":\"Indian/Maldives\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Marquesas\",\"_type\":\"Pacific/Marquesas\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Marshall_Islands\",\"_type\":\"Pacific/Majuro\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Mauritius\",\"_type\":\"Indian/Mauritius\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Mawson\",\"_type\":\"Antarctica/Mawson\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Mexico_Northwest\",\"_type\":\"America/Santa_Isabel\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Mexico_Pacific\",\"_type\":\"America/Mazatlan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Mongolia\",\"_type\":\"Asia/Ulaanbaatar\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Moscow\",\"_type\":\"Europe/Moscow\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Myanmar\",\"_type\":\"Asia/Rangoon\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Nauru\",\"_type\":\"Pacific/Nauru\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Nepal\",\"_type\":\"Asia/Katmandu\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"New_Caledonia\",\"_type\":\"Pacific/Noumea\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"New_Zealand\",\"_type\":\"Pacific/Auckland\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"New_Zealand\",\"_type\":\"Antarctica/McMurdo\",\"_territory\":\"AQ\"}},{\"mapZone\":{\"_other\":\"Newfoundland\",\"_type\":\"America/St_Johns\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Niue\",\"_type\":\"Pacific/Niue\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Norfolk\",\"_type\":\"Pacific/Norfolk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Noronha\",\"_type\":\"America/Noronha\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"North_Mariana\",\"_type\":\"Pacific/Saipan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Novosibirsk\",\"_type\":\"Asia/Novosibirsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Omsk\",\"_type\":\"Asia/Omsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Oral\",\"_type\":\"Asia/Oral\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Pakistan\",\"_type\":\"Asia/Karachi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Palau\",\"_type\":\"Pacific/Palau\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Papua_New_Guinea\",\"_type\":\"Pacific/Port_Moresby\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Paraguay\",\"_type\":\"America/Asuncion\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Peru\",\"_type\":\"America/Lima\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Philippines\",\"_type\":\"Asia/Manila\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Phoenix_Islands\",\"_type\":\"Pacific/Enderbury\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Pierre_Miquelon\",\"_type\":\"America/Miquelon\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Pitcairn\",\"_type\":\"Pacific/Pitcairn\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Ponape\",\"_type\":\"Pacific/Ponape\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Pyongyang\",\"_type\":\"Asia/Pyongyang\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Qyzylorda\",\"_type\":\"Asia/Qyzylorda\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Reunion\",\"_type\":\"Indian/Reunion\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Rothera\",\"_type\":\"Antarctica/Rothera\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Sakhalin\",\"_type\":\"Asia/Sakhalin\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Samara\",\"_type\":\"Europe/Samara\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Samarkand\",\"_type\":\"Asia/Samarkand\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Samoa\",\"_type\":\"Pacific/Pago_Pago\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Seychelles\",\"_type\":\"Indian/Mahe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Shevchenko\",\"_type\":\"Asia/Aqtau\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Singapore\",\"_type\":\"Asia/Singapore\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Solomon\",\"_type\":\"Pacific/Guadalcanal\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"South_Georgia\",\"_type\":\"Atlantic/South_Georgia\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Suriname\",\"_type\":\"America/Paramaribo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Sverdlovsk\",\"_type\":\"Asia/Yekaterinburg\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Syowa\",\"_type\":\"Antarctica/Syowa\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tahiti\",\"_type\":\"Pacific/Tahiti\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Taipei\",\"_type\":\"Asia/Taipei\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tajikistan\",\"_type\":\"Asia/Dushanbe\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tashkent\",\"_type\":\"Asia/Tashkent\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tbilisi\",\"_type\":\"Asia/Tbilisi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tokelau\",\"_type\":\"Pacific/Fakaofo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tonga\",\"_type\":\"Pacific/Tongatapu\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Truk\",\"_type\":\"Pacific/Truk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Turkey\",\"_type\":\"Europe/Istanbul\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Turkmenistan\",\"_type\":\"Asia/Ashgabat\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Tuvalu\",\"_type\":\"Pacific/Funafuti\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Uralsk\",\"_type\":\"Asia/Oral\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Uruguay\",\"_type\":\"America/Montevideo\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Urumqi\",\"_type\":\"Asia/Urumqi\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Uzbekistan\",\"_type\":\"Asia/Tashkent\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Vanuatu\",\"_type\":\"Pacific/Efate\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Venezuela\",\"_type\":\"America/Caracas\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Vladivostok\",\"_type\":\"Asia/Vladivostok\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Volgograd\",\"_type\":\"Europe/Volgograd\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Vostok\",\"_type\":\"Antarctica/Vostok\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Wake\",\"_type\":\"Pacific/Wake\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Wallis\",\"_type\":\"Pacific/Wallis\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Yakutsk\",\"_type\":\"Asia/Yakutsk\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Yekaterinburg\",\"_type\":\"Asia/Yekaterinburg\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Yerevan\",\"_type\":\"Asia/Yerevan\",\"_territory\":\"001\"}},{\"mapZone\":{\"_other\":\"Yukon\",\"_type\":\"America/Yakutat\",\"_territory\":\"001\"}}]}}}");

/***/ }),

/***/ "./node_modules/cldr-data/supplemental/weekData.json":
/*!***********************************************************!*\
  !*** ./node_modules/cldr-data/supplemental/weekData.json ***!
  \***********************************************************/
/*! exports provided: supplemental, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"supplemental\":{\"version\":{\"_unicodeVersion\":\"12.1.0\",\"_cldrVersion\":\"36\"},\"weekData\":{\"minDays\":{\"001\":\"1\",\"AD\":\"4\",\"AN\":\"4\",\"AT\":\"4\",\"AX\":\"4\",\"BE\":\"4\",\"BG\":\"4\",\"CH\":\"4\",\"CZ\":\"4\",\"DE\":\"4\",\"DK\":\"4\",\"EE\":\"4\",\"ES\":\"4\",\"FI\":\"4\",\"FJ\":\"4\",\"FO\":\"4\",\"FR\":\"4\",\"GB\":\"4\",\"GF\":\"4\",\"GG\":\"4\",\"GI\":\"4\",\"GP\":\"4\",\"GR\":\"4\",\"GU\":\"1\",\"HU\":\"4\",\"IE\":\"4\",\"IM\":\"4\",\"IS\":\"4\",\"IT\":\"4\",\"JE\":\"4\",\"LI\":\"4\",\"LT\":\"4\",\"LU\":\"4\",\"MC\":\"4\",\"MQ\":\"4\",\"NL\":\"4\",\"NO\":\"4\",\"PL\":\"4\",\"PT\":\"4\",\"RE\":\"4\",\"RU\":\"4\",\"SE\":\"4\",\"SJ\":\"4\",\"SK\":\"4\",\"SM\":\"4\",\"UM\":\"1\",\"US\":\"1\",\"VA\":\"4\",\"VI\":\"1\"},\"firstDay\":{\"001\":\"mon\",\"AD\":\"mon\",\"AE\":\"sat\",\"AF\":\"sat\",\"AG\":\"sun\",\"AI\":\"mon\",\"AL\":\"mon\",\"AM\":\"mon\",\"AN\":\"mon\",\"AR\":\"mon\",\"AS\":\"sun\",\"AT\":\"mon\",\"AU\":\"sun\",\"AX\":\"mon\",\"AZ\":\"mon\",\"BA\":\"mon\",\"BD\":\"sun\",\"BE\":\"mon\",\"BG\":\"mon\",\"BH\":\"sat\",\"BM\":\"mon\",\"BN\":\"mon\",\"BR\":\"sun\",\"BS\":\"sun\",\"BT\":\"sun\",\"BW\":\"sun\",\"BY\":\"mon\",\"BZ\":\"sun\",\"CA\":\"sun\",\"CH\":\"mon\",\"CL\":\"mon\",\"CM\":\"mon\",\"CN\":\"sun\",\"CO\":\"sun\",\"CR\":\"mon\",\"CY\":\"mon\",\"CZ\":\"mon\",\"DE\":\"mon\",\"DJ\":\"sat\",\"DK\":\"mon\",\"DM\":\"sun\",\"DO\":\"sun\",\"DZ\":\"sat\",\"EC\":\"mon\",\"EE\":\"mon\",\"EG\":\"sat\",\"ES\":\"mon\",\"ET\":\"sun\",\"FI\":\"mon\",\"FJ\":\"mon\",\"FO\":\"mon\",\"FR\":\"mon\",\"GB\":\"mon\",\"GB-alt-variant\":\"sun\",\"GE\":\"mon\",\"GF\":\"mon\",\"GP\":\"mon\",\"GR\":\"mon\",\"GT\":\"sun\",\"GU\":\"sun\",\"HK\":\"sun\",\"HN\":\"sun\",\"HR\":\"mon\",\"HU\":\"mon\",\"ID\":\"sun\",\"IE\":\"mon\",\"IL\":\"sun\",\"IN\":\"sun\",\"IQ\":\"sat\",\"IR\":\"sat\",\"IS\":\"mon\",\"IT\":\"mon\",\"JM\":\"sun\",\"JO\":\"sat\",\"JP\":\"sun\",\"KE\":\"sun\",\"KG\":\"mon\",\"KH\":\"sun\",\"KR\":\"sun\",\"KW\":\"sat\",\"KZ\":\"mon\",\"LA\":\"sun\",\"LB\":\"mon\",\"LI\":\"mon\",\"LK\":\"mon\",\"LT\":\"mon\",\"LU\":\"mon\",\"LV\":\"mon\",\"LY\":\"sat\",\"MC\":\"mon\",\"MD\":\"mon\",\"ME\":\"mon\",\"MH\":\"sun\",\"MK\":\"mon\",\"MM\":\"sun\",\"MN\":\"mon\",\"MO\":\"sun\",\"MQ\":\"mon\",\"MT\":\"sun\",\"MV\":\"fri\",\"MX\":\"sun\",\"MY\":\"mon\",\"MZ\":\"sun\",\"NI\":\"sun\",\"NL\":\"mon\",\"NO\":\"mon\",\"NP\":\"sun\",\"NZ\":\"mon\",\"OM\":\"sat\",\"PA\":\"sun\",\"PE\":\"sun\",\"PH\":\"sun\",\"PK\":\"sun\",\"PL\":\"mon\",\"PR\":\"sun\",\"PT\":\"sun\",\"PY\":\"sun\",\"QA\":\"sat\",\"RE\":\"mon\",\"RO\":\"mon\",\"RS\":\"mon\",\"RU\":\"mon\",\"SA\":\"sun\",\"SD\":\"sat\",\"SE\":\"mon\",\"SG\":\"sun\",\"SI\":\"mon\",\"SK\":\"mon\",\"SM\":\"mon\",\"SV\":\"sun\",\"SY\":\"sat\",\"TH\":\"sun\",\"TJ\":\"mon\",\"TM\":\"mon\",\"TR\":\"mon\",\"TT\":\"sun\",\"TW\":\"sun\",\"UA\":\"mon\",\"UM\":\"sun\",\"US\":\"sun\",\"UY\":\"mon\",\"UZ\":\"mon\",\"VA\":\"mon\",\"VE\":\"sun\",\"VI\":\"sun\",\"VN\":\"mon\",\"WS\":\"sun\",\"XK\":\"mon\",\"YE\":\"sun\",\"ZA\":\"sun\",\"ZW\":\"sun\"},\"weekendStart\":{\"001\":\"sat\",\"AE\":\"fri\",\"AF\":\"thu\",\"BH\":\"fri\",\"DZ\":\"fri\",\"EG\":\"fri\",\"IL\":\"fri\",\"IN\":\"sun\",\"IQ\":\"fri\",\"IR\":\"fri\",\"JO\":\"fri\",\"KW\":\"fri\",\"LY\":\"fri\",\"OM\":\"fri\",\"QA\":\"fri\",\"SA\":\"fri\",\"SD\":\"fri\",\"SY\":\"fri\",\"UG\":\"sun\",\"YE\":\"fri\"},\"weekendEnd\":{\"001\":\"sun\",\"AE\":\"sat\",\"AF\":\"fri\",\"BH\":\"sat\",\"DZ\":\"sat\",\"EG\":\"sat\",\"IL\":\"sat\",\"IQ\":\"sat\",\"IR\":\"fri\",\"JO\":\"sat\",\"KW\":\"sat\",\"LY\":\"sat\",\"OM\":\"sat\",\"QA\":\"sat\",\"SA\":\"sat\",\"SD\":\"sat\",\"SY\":\"sat\",\"YE\":\"sat\"},\"af\":{\"_ordering\":\"weekOfDate weekOfInterval weekOfMonth\"},\"am az bs cs cy da el et hi ky lt mk sk ta th\":{\"_ordering\":\"weekOfYear weekOfMonth\"},\"ar fil gu hu hy id kk ko\":{\"_ordering\":\"weekOfMonth\"},\"be ro ru\":{\"_ordering\":\"weekOfInterval weekOfMonth\"},\"bg de iw pt ur zh\":{\"_ordering\":\"weekOfDate weekOfMonth weekOfInterval\"},\"ca es fr gl\":{\"_ordering\":\"weekOfDate\"},\"en bn ja ka\":{\"_ordering\":\"weekOfDate weekOfMonth\"},\"eu\":{\"_ordering\":\"weekOfMonth weekOfDate\"},\"fa hr it lv pl si sr uk uz\":{\"_ordering\":\"weekOfMonth weekOfInterval\"},\"fi zh-TW\":{\"_ordering\":\"weekOfYear weekOfDate weekOfMonth\"},\"is mn no sv vi\":{\"_ordering\":\"weekOfYear weekOfMonth weekOfInterval\"},\"km mr\":{\"_ordering\":\"weekOfMonth weekOfYear\"},\"kn ml pa\":{\"_ordering\":\"weekOfMonth weekOfDate weekOfYear\"},\"lo sq\":{\"_ordering\":\"weekOfMonth weekOfInterval weekOfDate weekOfYear\"},\"ms tr\":{\"_ordering\":\"weekOfMonth weekOfYear weekOfInterval weekOfDate\"},\"nl\":{\"_ordering\":\"weekOfDate weekOfYear weekOfMonth\"},\"sl\":{\"_ordering\":\"weekOfInterval\"},\"sw te\":{\"_ordering\":\"weekOfMonth weekOfInterval weekOfYear\"},\"und\":{\"_ordering\":\"weekOfYear\"},\"zu\":{\"_ordering\":\"weekOfYear weekOfInterval\"}}}}");

/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr.js":
/*!******************************************!*\
  !*** ./node_modules/cldrjs/dist/cldr.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.5.1
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-01-21T13:43Z
 */
/*!
 * CLDR JavaScript Library v0.5.1 2019-01-21T13:43Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( root, factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}( this, function() {


	var arrayIsArray = Array.isArray || function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Array]";
	};




	var pathNormalize = function( path, attributes ) {
		if ( arrayIsArray( path ) ) {
			path = path.join( "/" );
		}
		if ( typeof path !== "string" ) {
			throw new Error( "invalid path \"" + path + "\"" );
		}
		// 1: Ignore leading slash `/`
		// 2: Ignore leading `cldr/`
		path = path
			.replace( /^\// , "" ) /* 1 */
			.replace( /^cldr\// , "" ); /* 2 */

		// Replace {attribute}'s
		path = path.replace( /{[a-zA-Z]+}/g, function( name ) {
			name = name.replace( /^{([^}]*)}$/, "$1" );
			return attributes[ name ];
		});

		return path.split( "/" );
	};




	var arraySome = function( array, callback ) {
		var i, length;
		if ( array.some ) {
			return array.some( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			if ( callback( array[ i ], i, array ) ) {
				return true;
			}
		}
		return false;
	};




	/**
	 * Return the maximized language id as defined in
	 * http://www.unicode.org/reports/tr35/#Likely_Subtags
	 * 1. Canonicalize.
	 * 1.1 Make sure the input locale is in canonical form: uses the right
	 * separator, and has the right casing.
	 * TODO Right casing? What df? It seems languages are lowercase, scripts are
	 * Capitalized, territory is uppercase. I am leaving this as an exercise to
	 * the user.
	 *
	 * 1.2 Replace any deprecated subtags with their canonical values using the
	 * <alias> data in supplemental metadata. Use the first value in the
	 * replacement list, if it exists. Language tag replacements may have multiple
	 * parts, such as "sh" ➞ "sr_Latn" or mo" ➞ "ro_MD". In such a case, the
	 * original script and/or region are retained if there is one. Thus
	 * "sh_Arab_AQ" ➞ "sr_Arab_AQ", not "sr_Latn_AQ".
	 * TODO What <alias> data?
	 *
	 * 1.3 If the tag is grandfathered (see <variable id="$grandfathered"
	 * type="choice"> in the supplemental data), then return it.
	 * TODO grandfathered?
	 *
	 * 1.4 Remove the script code 'Zzzz' and the region code 'ZZ' if they occur.
	 * 1.5 Get the components of the cleaned-up source tag (languages, scripts,
	 * and regions), plus any variants and extensions.
	 * 2. Lookup. Lookup each of the following in order, and stop on the first
	 * match:
	 * 2.1 languages_scripts_regions
	 * 2.2 languages_regions
	 * 2.3 languages_scripts
	 * 2.4 languages
	 * 2.5 und_scripts
	 * 3. Return
	 * 3.1 If there is no match, either return an error value, or the match for
	 * "und" (in APIs where a valid language tag is required).
	 * 3.2 Otherwise there is a match = languagem_scriptm_regionm
	 * 3.3 Let xr = xs if xs is not empty, and xm otherwise.
	 * 3.4 Return the language tag composed of languager _ scriptr _ regionr +
	 * variants + extensions.
	 *
	 * @subtags [Array] normalized language id subtags tuple (see init.js).
	 */
	var coreLikelySubtags = function( Cldr, cldr, subtags, options ) {
		var match, matchFound,
			language = subtags[ 0 ],
			script = subtags[ 1 ],
			sep = Cldr.localeSep,
			territory = subtags[ 2 ],
			variants = subtags.slice( 3, 4 );
		options = options || {};

		// Skip if (language, script, territory) is not empty [3.3]
		if ( language !== "und" && script !== "Zzzz" && territory !== "ZZ" ) {
			return [ language, script, territory ].concat( variants );
		}

		// Skip if no supplemental likelySubtags data is present
		if ( typeof cldr.get( "supplemental/likelySubtags" ) === "undefined" ) {
			return;
		}

		// [2]
		matchFound = arraySome([
			[ language, script, territory ],
			[ language, territory ],
			[ language, script ],
			[ language ],
			[ "und", script ]
		], function( test ) {
			return match = !(/\b(Zzzz|ZZ)\b/).test( test.join( sep ) ) /* [1.4] */ && cldr.get( [ "supplemental/likelySubtags", test.join( sep ) ] );
		});

		// [3]
		if ( matchFound ) {
			// [3.2 .. 3.4]
			match = match.split( sep );
			return [
				language !== "und" ? language : match[ 0 ],
				script !== "Zzzz" ? script : match[ 1 ],
				territory !== "ZZ" ? territory : match[ 2 ]
			].concat( variants );
		} else if ( options.force ) {
			// [3.1.2]
			return cldr.get( "supplemental/likelySubtags/und" ).split( sep );
		} else {
			// [3.1.1]
			return;
		}
	};



	/**
	 * Given a locale, remove any fields that Add Likely Subtags would add.
	 * http://www.unicode.org/reports/tr35/#Likely_Subtags
	 * 1. First get max = AddLikelySubtags(inputLocale). If an error is signaled,
	 * return it.
	 * 2. Remove the variants from max.
	 * 3. Then for trial in {language, language _ region, language _ script}. If
	 * AddLikelySubtags(trial) = max, then return trial + variants.
	 * 4. If you do not get a match, return max + variants.
	 * 
	 * @maxLanguageId [Array] maxLanguageId tuple (see init.js).
	 */
	var coreRemoveLikelySubtags = function( Cldr, cldr, maxLanguageId ) {
		var match, matchFound,
			language = maxLanguageId[ 0 ],
			script = maxLanguageId[ 1 ],
			territory = maxLanguageId[ 2 ],
			variants = maxLanguageId[ 3 ];

		// [3]
		matchFound = arraySome([
			[ [ language, "Zzzz", "ZZ" ], [ language ] ],
			[ [ language, "Zzzz", territory ], [ language, territory ] ],
			[ [ language, script, "ZZ" ], [ language, script ] ]
		], function( test ) {
			var result = coreLikelySubtags( Cldr, cldr, test[ 0 ] );
			match = test[ 1 ];
			return result && result[ 0 ] === maxLanguageId[ 0 ] &&
				result[ 1 ] === maxLanguageId[ 1 ] &&
				result[ 2 ] === maxLanguageId[ 2 ];
		});

		if ( matchFound ) {
			if ( variants ) {
				match.push( variants );
			}
			return match;
		}

		// [4]
		return maxLanguageId;
	};




	/**
	 * subtags( locale )
	 *
	 * @locale [String]
	 */
	var coreSubtags = function( locale ) {
		var aux, unicodeLanguageId,
			subtags = [];

		locale = locale.replace( /_/, "-" );

		// Unicode locale extensions.
		aux = locale.split( "-u-" );
		if ( aux[ 1 ] ) {
			aux[ 1 ] = aux[ 1 ].split( "-t-" );
			locale = aux[ 0 ] + ( aux[ 1 ][ 1 ] ? "-t-" + aux[ 1 ][ 1 ] : "");
			subtags[ 4 /* unicodeLocaleExtensions */ ] = aux[ 1 ][ 0 ];
		}

		// TODO normalize transformed extensions. Currently, skipped.
		// subtags[ x ] = locale.split( "-t-" )[ 1 ];
		unicodeLanguageId = locale.split( "-t-" )[ 0 ];

		// unicode_language_id = "root"
		//   | unicode_language_subtag         
		//     (sep unicode_script_subtag)? 
		//     (sep unicode_region_subtag)?
		//     (sep unicode_variant_subtag)* ;
		//
		// Although unicode_language_subtag = alpha{2,8}, I'm using alpha{2,3}. Because, there's no language on CLDR lengthier than 3.
		aux = unicodeLanguageId.match( /^(([a-z]{2,3})(-([A-Z][a-z]{3}))?(-([A-Z]{2}|[0-9]{3}))?)((-([a-zA-Z0-9]{5,8}|[0-9][a-zA-Z0-9]{3}))*)$|^(root)$/ );
		if ( aux === null ) {
			return [ "und", "Zzzz", "ZZ" ];
		}
		subtags[ 0 /* language */ ] = aux[ 10 ] /* root */ || aux[ 2 ] || "und";
		subtags[ 1 /* script */ ] = aux[ 4 ] || "Zzzz";
		subtags[ 2 /* territory */ ] = aux[ 6 ] || "ZZ";
		if ( aux[ 7 ] && aux[ 7 ].length ) {
			subtags[ 3 /* variant */ ] = aux[ 7 ].slice( 1 ) /* remove leading "-" */;
		}

		// 0: language
		// 1: script
		// 2: territory (aka region)
		// 3: variant
		// 4: unicodeLocaleExtensions
		return subtags;
	};




	var arrayForEach = function( array, callback ) {
		var i, length;
		if ( array.forEach ) {
			return array.forEach( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			callback( array[ i ], i, array );
		}
	};




	/**
	 * bundleLookup( minLanguageId )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @cldr [Cldr instance]
	 *
	 * @minLanguageId [String] requested languageId after applied remove likely subtags.
	 */
	var bundleLookup = function( Cldr, cldr, minLanguageId ) {
		var availableBundleMap = Cldr._availableBundleMap,
			availableBundleMapQueue = Cldr._availableBundleMapQueue;

		if ( availableBundleMapQueue.length ) {
			arrayForEach( availableBundleMapQueue, function( bundle ) {
				var existing, maxBundle, minBundle, subtags;
				subtags = coreSubtags( bundle );
				maxBundle = coreLikelySubtags( Cldr, cldr, subtags );
				minBundle = coreRemoveLikelySubtags( Cldr, cldr, maxBundle );
				minBundle = minBundle.join( Cldr.localeSep );
				existing = availableBundleMap[ minBundle ];
				if ( existing && existing.length < bundle.length ) {
					return;
				}
				availableBundleMap[ minBundle ] = bundle;
			});
			Cldr._availableBundleMapQueue = [];
		}

		return availableBundleMap[ minLanguageId ] || null;
	};




	var objectKeys = function( object ) {
		var i,
			result = [];

		if ( Object.keys ) {
			return Object.keys( object );
		}

		for ( i in object ) {
			result.push( i );
		}

		return result;
	};




	var createError = function( code, attributes ) {
		var error, message;

		message = code + ( attributes && JSON ? ": " + JSON.stringify( attributes ) : "" );
		error = new Error( message );
		error.code = code;

		// extend( error, attributes );
		arrayForEach( objectKeys( attributes ), function( attribute ) {
			error[ attribute ] = attributes[ attribute ];
		});

		return error;
	};




	var validate = function( code, check, attributes ) {
		if ( !check ) {
			throw createError( code, attributes );
		}
	};




	var validatePresence = function( value, name ) {
		validate( "E_MISSING_PARAMETER", typeof value !== "undefined", {
			name: name
		});
	};




	var validateType = function( value, name, check, expected ) {
		validate( "E_INVALID_PAR_TYPE", check, {
			expected: expected,
			name: name,
			value: value
		});
	};




	var validateTypePath = function( value, name ) {
		validateType( value, name, typeof value === "string" || arrayIsArray( value ), "String or Array" );
	};




	/**
	 * Function inspired by jQuery Core, but reduced to our use case.
	 */
	var isPlainObject = function( obj ) {
		return obj !== null && "" + obj === "[object Object]";
	};




	var validateTypePlainObject = function( value, name ) {
		validateType( value, name, typeof value === "undefined" || isPlainObject( value ), "Plain Object" );
	};




	var validateTypeString = function( value, name ) {
		validateType( value, name, typeof value === "string", "a string" );
	};




	// @path: normalized path
	var resourceGet = function( data, path ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			node = node[ path[ i ] ];
			if ( !node ) {
				return undefined;
			}
		}
		return node[ path[ i ] ];
	};




	/**
	 * setAvailableBundles( Cldr, json )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @json resolved/unresolved cldr data.
	 *
	 * Set available bundles queue based on passed json CLDR data. Considers a bundle as any String at /main/{bundle}.
	 */
	var coreSetAvailableBundles = function( Cldr, json ) {
		var bundle,
			availableBundleMapQueue = Cldr._availableBundleMapQueue,
			main = resourceGet( json, [ "main" ] );

		if ( main ) {
			for ( bundle in main ) {
				if ( main.hasOwnProperty( bundle ) && bundle !== "root" &&
							availableBundleMapQueue.indexOf( bundle ) === -1 ) {
					availableBundleMapQueue.push( bundle );
				}
			}
		}
	};



	var alwaysArray = function( somethingOrArray ) {
		return arrayIsArray( somethingOrArray ) ?  somethingOrArray : [ somethingOrArray ];
	};


	var jsonMerge = (function() {

	// Returns new deeply merged JSON.
	//
	// Eg.
	// merge( { a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } } )
	// -> { a: { b: 3, c: 2, d: 4 } }
	//
	// @arguments JSON's
	// 
	var merge = function() {
		var destination = {},
			sources = [].slice.call( arguments, 0 );
		arrayForEach( sources, function( source ) {
			var prop;
			for ( prop in source ) {
				if ( prop in destination && typeof destination[ prop ] === "object" && !arrayIsArray( destination[ prop ] ) ) {

					// Merge Objects
					destination[ prop ] = merge( destination[ prop ], source[ prop ] );

				} else {

					// Set new values
					destination[ prop ] = source[ prop ];

				}
			}
		});
		return destination;
	};

	return merge;

}());


	/**
	 * load( Cldr, source, jsons )
	 *
	 * @Cldr [Cldr class]
	 *
	 * @source [Object]
	 *
	 * @jsons [arguments]
	 */
	var coreLoad = function( Cldr, source, jsons ) {
		var i, j, json;

		validatePresence( jsons[ 0 ], "json" );

		// Support arbitrary parameters, e.g., `Cldr.load({...}, {...})`.
		for ( i = 0; i < jsons.length; i++ ) {

			// Support array parameters, e.g., `Cldr.load([{...}, {...}])`.
			json = alwaysArray( jsons[ i ] );

			for ( j = 0; j < json.length; j++ ) {
				validateTypePlainObject( json[ j ], "json" );
				source = jsonMerge( source, json[ j ] );
				coreSetAvailableBundles( Cldr, json[ j ] );
			}
		}

		return source;
	};



	var itemGetResolved = function( Cldr, path, attributes ) {
		// Resolve path
		var normalizedPath = pathNormalize( path, attributes );

		return resourceGet( Cldr._resolved, normalizedPath );
	};




	/**
	 * new Cldr()
	 */
	var Cldr = function( locale ) {
		this.init( locale );
	};

	// Build optimization hack to avoid duplicating functions across modules.
	Cldr._alwaysArray = alwaysArray;
	Cldr._coreLoad = coreLoad;
	Cldr._createError = createError;
	Cldr._itemGetResolved = itemGetResolved;
	Cldr._jsonMerge = jsonMerge;
	Cldr._pathNormalize = pathNormalize;
	Cldr._resourceGet = resourceGet;
	Cldr._validatePresence = validatePresence;
	Cldr._validateType = validateType;
	Cldr._validateTypePath = validateTypePath;
	Cldr._validateTypePlainObject = validateTypePlainObject;

	Cldr._availableBundleMap = {};
	Cldr._availableBundleMapQueue = [];
	Cldr._resolved = {};

	// Allow user to override locale separator "-" (default) | "_". According to http://www.unicode.org/reports/tr35/#Unicode_language_identifier, both "-" and "_" are valid locale separators (eg. "en_GB", "en-GB"). According to http://unicode.org/cldr/trac/ticket/6786 its usage must be consistent throughout the data set.
	Cldr.localeSep = "-";

	/**
	 * Cldr.load( json [, json, ...] )
	 *
	 * @json [JSON] CLDR data or [Array] Array of @json's.
	 *
	 * Load resolved cldr data.
	 */
	Cldr.load = function() {
		Cldr._resolved = coreLoad( Cldr, Cldr._resolved, arguments );
	};

	/**
	 * .init() automatically run on instantiation/construction.
	 */
	Cldr.prototype.init = function( locale ) {
		var attributes, language, maxLanguageId, minLanguageId, script, subtags, territory, unicodeLocaleExtensions, variant,
			sep = Cldr.localeSep,
			unicodeLocaleExtensionsRaw = "";

		validatePresence( locale, "locale" );
		validateTypeString( locale, "locale" );

		subtags = coreSubtags( locale );

		if ( subtags.length === 5 ) {
			unicodeLocaleExtensions = subtags.pop();
			unicodeLocaleExtensionsRaw = sep + "u" + sep + unicodeLocaleExtensions;
			// Remove trailing null when there is unicodeLocaleExtensions but no variants.
			if ( !subtags[ 3 ] ) {
				subtags.pop();
			}
		}
		variant = subtags[ 3 ];

		// Normalize locale code.
		// Get (or deduce) the "triple subtags": language, territory (also aliased as region), and script subtags.
		// Get the variant subtags (calendar, collation, currency, etc).
		// refs:
		// - http://www.unicode.org/reports/tr35/#Field_Definitions
		// - http://www.unicode.org/reports/tr35/#Language_and_Locale_IDs
		// - http://www.unicode.org/reports/tr35/#Unicode_locale_identifier

		// When a locale id does not specify a language, or territory (region), or script, they are obtained by Likely Subtags.
		maxLanguageId = coreLikelySubtags( Cldr, this, subtags, { force: true } ) || subtags;
		language = maxLanguageId[ 0 ];
		script = maxLanguageId[ 1 ];
		territory = maxLanguageId[ 2 ];

		minLanguageId = coreRemoveLikelySubtags( Cldr, this, maxLanguageId ).join( sep );

		// Set attributes
		this.attributes = attributes = {
			bundle: bundleLookup( Cldr, this, minLanguageId ),

			// Unicode Language Id
			minLanguageId: minLanguageId + unicodeLocaleExtensionsRaw,
			maxLanguageId: maxLanguageId.join( sep ) + unicodeLocaleExtensionsRaw,

			// Unicode Language Id Subtabs
			language: language,
			script: script,
			territory: territory,
			region: territory, /* alias */
			variant: variant
		};

		// Unicode locale extensions.
		unicodeLocaleExtensions && ( "-" + unicodeLocaleExtensions ).replace( /-[a-z]{3,8}|(-[a-z]{2})-([a-z]{3,8})/g, function( attribute, key, type ) {

			if ( key ) {

				// Extension is in the `keyword` form.
				attributes[ "u" + key ] = type;
			} else {

				// Extension is in the `attribute` form.
				attributes[ "u" + attribute ] = true;
			}
		});

		this.locale = locale;
	};

	/**
	 * .get()
	 */
	Cldr.prototype.get = function( path ) {

		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		return itemGetResolved( Cldr, path, this.attributes );
	};

	/**
	 * .main()
	 */
	Cldr.prototype.main = function( path ) {
		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		validate( "E_MISSING_BUNDLE", this.attributes.bundle !== null, {
			locale: this.locale
		});

		path = alwaysArray( path );
		return this.get( [ "main/{bundle}" ].concat( path ) );
	};

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/event.js":
/*!************************************************!*\
  !*** ./node_modules/cldrjs/dist/cldr/event.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.5.1
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-01-21T13:43Z
 */
/*!
 * CLDR JavaScript Library v0.5.1 2019-01-21T13:43Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! ../cldr */ "./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var pathNormalize = Cldr._pathNormalize,
		validatePresence = Cldr._validatePresence,
		validateType = Cldr._validateType;

/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

var EventEmitter;
/* jshint ignore:start */
EventEmitter = (function () {


	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = {};
	

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (evt instanceof RegExp) {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (evt instanceof RegExp) {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	return EventEmitter;
}());
/* jshint ignore:end */



	var validateTypeFunction = function( value, name ) {
		validateType( value, name, typeof value === "undefined" || typeof value === "function", "Function" );
	};




	var superGet, superInit,
		globalEe = new EventEmitter();

	function validateTypeEvent( value, name ) {
		validateType( value, name, typeof value === "string" || value instanceof RegExp, "String or RegExp" );
	}

	function validateThenCall( method, self ) {
		return function( event, listener ) {
			validatePresence( event, "event" );
			validateTypeEvent( event, "event" );

			validatePresence( listener, "listener" );
			validateTypeFunction( listener, "listener" );

			return self[ method ].apply( self, arguments );
		};
	}

	function off( self ) {
		return validateThenCall( "off", self );
	}

	function on( self ) {
		return validateThenCall( "on", self );
	}

	function once( self ) {
		return validateThenCall( "once", self );
	}

	Cldr.off = off( globalEe );
	Cldr.on = on( globalEe );
	Cldr.once = once( globalEe );

	/**
	 * Overload Cldr.prototype.init().
	 */
	superInit = Cldr.prototype.init;
	Cldr.prototype.init = function() {
		var ee;
		this.ee = ee = new EventEmitter();
		this.off = off( ee );
		this.on = on( ee );
		this.once = once( ee );
		superInit.apply( this, arguments );
	};

	/**
	 * getOverload is encapsulated, because of cldr/unresolved. If it's loaded
	 * after cldr/event (and note it overwrites .get), it can trigger this
	 * overload again.
	 */
	function getOverload() {

		/**
		 * Overload Cldr.prototype.get().
		 */
		superGet = Cldr.prototype.get;
		Cldr.prototype.get = function( path ) {
			var value = superGet.apply( this, arguments );
			path = pathNormalize( path, this.attributes ).join( "/" );
			globalEe.trigger( "get", [ path, value ] );
			this.ee.trigger( "get", [ path, value ] );
			return value;
		};
	}

	Cldr._eventInit = getOverload;
	getOverload();

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/supplemental.js":
/*!*******************************************************!*\
  !*** ./node_modules/cldrjs/dist/cldr/supplemental.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.5.1
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-01-21T13:43Z
 */
/*!
 * CLDR JavaScript Library v0.5.1 2019-01-21T13:43Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! ../cldr */ "./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var alwaysArray = Cldr._alwaysArray;



	var supplementalMain = function( cldr ) {

		var prepend, supplemental;
		
		prepend = function( prepend ) {
			return function( path ) {
				path = alwaysArray( path );
				return cldr.get( [ prepend ].concat( path ) );
			};
		};

		supplemental = prepend( "supplemental" );

		// Week Data
		// http://www.unicode.org/reports/tr35/tr35-dates.html#Week_Data
		supplemental.weekData = prepend( "supplemental/weekData" );

		supplemental.weekData.firstDay = function() {
			return cldr.get( "supplemental/weekData/firstDay/{territory}" ) ||
				cldr.get( "supplemental/weekData/firstDay/001" );
		};

		supplemental.weekData.minDays = function() {
			var minDays = cldr.get( "supplemental/weekData/minDays/{territory}" ) ||
				cldr.get( "supplemental/weekData/minDays/001" );
			return parseInt( minDays, 10 );
		};

		// Time Data
		// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
		supplemental.timeData = prepend( "supplemental/timeData" );

		supplemental.timeData.allowed = function() {
			return cldr.get( "supplemental/timeData/{territory}/_allowed" ) ||
				cldr.get( "supplemental/timeData/001/_allowed" );
		};

		supplemental.timeData.preferred = function() {
			return cldr.get( "supplemental/timeData/{territory}/_preferred" ) ||
				cldr.get( "supplemental/timeData/001/_preferred" );
		};

		return supplemental;

	};




	var initSuper = Cldr.prototype.init;

	/**
	 * .init() automatically ran on construction.
	 *
	 * Overload .init().
	 */
	Cldr.prototype.init = function() {
		initSuper.apply( this, arguments );
		this.supplemental = supplementalMain( this );
	};

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/cldr/unresolved.js":
/*!*****************************************************!*\
  !*** ./node_modules/cldrjs/dist/cldr/unresolved.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * CLDR JavaScript Library v0.5.1
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-01-21T13:43Z
 */
/*!
 * CLDR JavaScript Library v0.5.1 2019-01-21T13:43Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( true ) {
		// AMD.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! ../cldr */ "./node_modules/cldrjs/dist/cldr.js") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var coreLoad = Cldr._coreLoad;
	var jsonMerge = Cldr._jsonMerge;
	var pathNormalize = Cldr._pathNormalize;
	var resourceGet = Cldr._resourceGet;
	var validatePresence = Cldr._validatePresence;
	var validateTypePath = Cldr._validateTypePath;



	var bundleParentLookup = function( Cldr, locale ) {
		var normalizedPath, parent;

		if ( locale === "root" ) {
			return;
		}

		// First, try to find parent on supplemental data.
		normalizedPath = pathNormalize( [ "supplemental/parentLocales/parentLocale", locale ] );
		parent = resourceGet( Cldr._resolved, normalizedPath ) || resourceGet( Cldr._raw, normalizedPath );
		if ( parent ) {
			return parent;
		}

		// Or truncate locale.
		parent = locale.substr( 0, locale.lastIndexOf( Cldr.localeSep ) );
		if ( !parent ) {
			return "root";
		}

		return parent;
	};




	// @path: normalized path
	var resourceSet = function( data, path, value ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			if ( !node[ path[ i ] ] ) {
				node[ path[ i ] ] = {};
			}
			node = node[ path[ i ] ];
		}
		node[ path[ i ] ] = value;
	};


	var itemLookup = (function() {

	var lookup;

	lookup = function( Cldr, locale, path, attributes, childLocale ) {
		var normalizedPath, parent, value;

		// 1: Finish recursion
		// 2: Avoid infinite loop
		if ( typeof locale === "undefined" /* 1 */ || locale === childLocale /* 2 */ ) {
			return;
		}

		// Resolve path
		normalizedPath = pathNormalize( path, attributes );

		// Check resolved (cached) data first
		// 1: Due to #16, never use the cached resolved non-leaf nodes. It may not
		//    represent its leafs in its entirety.
		value = resourceGet( Cldr._resolved, normalizedPath );
		if ( value !== undefined && typeof value !== "object" /* 1 */ ) {
			return value;
		}

		// Check raw data
		value = resourceGet( Cldr._raw, normalizedPath );

		if ( value === undefined ) {
			// Or, lookup at parent locale
			parent = bundleParentLookup( Cldr, locale );
			value = lookup( Cldr, parent, path, jsonMerge( attributes, { bundle: parent }), locale );
		}

		if ( value !== undefined ) {
			// Set resolved (cached)
			resourceSet( Cldr._resolved, normalizedPath, value );
		}

		return value;
	};

	return lookup;

}());


	Cldr._raw = {};

	/**
	 * Cldr.load( json [, json, ...] )
	 *
	 * @json [JSON] CLDR data or [Array] Array of @json's.
	 *
	 * Load resolved or unresolved cldr data.
	 * Overwrite Cldr.load().
	 */
	Cldr.load = function() {
		Cldr._raw = coreLoad( Cldr, Cldr._raw, arguments );
	};

	/**
	 * Overwrite Cldr.prototype.get().
	 */
	Cldr.prototype.get = function( path ) {
		validatePresence( path, "path" );
		validateTypePath( path, "path" );

		// 1: use bundle as locale on item lookup for simplification purposes, because no other extended subtag is used anyway on bundle parent lookup.
		// 2: during init(), this method is called, but bundle is yet not defined. Use "" as a workaround in this very specific scenario.
		return itemLookup( Cldr, this.attributes && this.attributes.bundle /* 1 */ || "" /* 2 */, path, this.attributes );
	};

	// In case cldr/unresolved is loaded after cldr/event, we trigger its overloads again. Because, .get is overwritten in here.
	if ( Cldr._eventInit ) {
		Cldr._eventInit();
	}

	return Cldr;




}));


/***/ }),

/***/ "./node_modules/cldrjs/dist/node_main.js":
/*!***********************************************!*\
  !*** ./node_modules/cldrjs/dist/node_main.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * CLDR JavaScript Library v0.5.1
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-01-21T13:43Z
 */
/*!
 * CLDR JavaScript Library v0.5.1 2019-01-21T13:43Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */

// Cldr
module.exports = __webpack_require__( /*! ./cldr */ "./node_modules/cldrjs/dist/cldr.js" );

// Extent Cldr with the following modules
__webpack_require__( /*! ./cldr/event */ "./node_modules/cldrjs/dist/cldr/event.js" );
__webpack_require__( /*! ./cldr/supplemental */ "./node_modules/cldrjs/dist/cldr/supplemental.js" );
__webpack_require__( /*! ./cldr/unresolved */ "./node_modules/cldrjs/dist/cldr/unresolved.js" );


/***/ }),

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
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cldr-data */ "./utils/load_cldrData.prebuilt.js");
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cldr_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldrjs */ "./node_modules/cldrjs/dist/node_main.js");
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
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldr-data */ "./utils/load_cldrData.prebuilt.js");
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
      if (true) {
        return ["it.*"];
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
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cldr-data */ "./utils/load_cldrData.prebuilt.js");
/* harmony import */ var cldr_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cldr_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cldrjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cldrjs */ "./node_modules/cldrjs/dist/node_main.js");
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

/***/ "./utils/load_cldrData.prebuilt.js":
/*!*****************************************!*\
  !*** ./utils/load_cldrData.prebuilt.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @copyright (c) 2018, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

/* since the npm cldrData load is using `fs` and other modules not available in browser,
 * we define our own cldrData "load" function that just `requires` a cldr-data file
 */

/* NOTE: the path is relative to the installed js-joda-locale package and assuming,
 * that cldr-data is installed in parallel!
 */
module.exports = function (cldrPath) {
    return __webpack_require__("./node_modules/cldr-data sync recursive ^\\.\\/.*$")("./" + cldrPath);
};


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