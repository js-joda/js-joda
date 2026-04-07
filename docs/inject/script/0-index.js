//! @version @js-joda/locale - 5.0.1
//! @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@js-joda/locale')) :
  typeof define === 'function' && define.amd ? define(['@js-joda/locale'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JSJodaLocale));
})(this, (function (locale) { 'use strict';

  var main$1 = {
  	de: {
  		identity: {
  			version: {
  				_cldrVersion: "36"
  			},
  			language: "de"
  		},
  		dates: {
  			calendars: {
  				gregorian: {
  					months: {
  						format: {
  							abbreviated: {
  								"1": "Jan.",
  								"2": "Feb.",
  								"3": "März",
  								"4": "Apr.",
  								"5": "Mai",
  								"6": "Juni",
  								"7": "Juli",
  								"8": "Aug.",
  								"9": "Sept.",
  								"10": "Okt.",
  								"11": "Nov.",
  								"12": "Dez."
  							},
  							narrow: {
  								"1": "J",
  								"2": "F",
  								"3": "M",
  								"4": "A",
  								"5": "M",
  								"6": "J",
  								"7": "J",
  								"8": "A",
  								"9": "S",
  								"10": "O",
  								"11": "N",
  								"12": "D"
  							},
  							wide: {
  								"1": "Januar",
  								"2": "Februar",
  								"3": "März",
  								"4": "April",
  								"5": "Mai",
  								"6": "Juni",
  								"7": "Juli",
  								"8": "August",
  								"9": "September",
  								"10": "Oktober",
  								"11": "November",
  								"12": "Dezember"
  							}
  						},
  						"stand-alone": {
  							abbreviated: {
  								"1": "Jan",
  								"2": "Feb",
  								"3": "Mär",
  								"4": "Apr",
  								"5": "Mai",
  								"6": "Jun",
  								"7": "Jul",
  								"8": "Aug",
  								"9": "Sep",
  								"10": "Okt",
  								"11": "Nov",
  								"12": "Dez"
  							},
  							narrow: {
  								"1": "J",
  								"2": "F",
  								"3": "M",
  								"4": "A",
  								"5": "M",
  								"6": "J",
  								"7": "J",
  								"8": "A",
  								"9": "S",
  								"10": "O",
  								"11": "N",
  								"12": "D"
  							},
  							wide: {
  								"1": "Januar",
  								"2": "Februar",
  								"3": "März",
  								"4": "April",
  								"5": "Mai",
  								"6": "Juni",
  								"7": "Juli",
  								"8": "August",
  								"9": "September",
  								"10": "Oktober",
  								"11": "November",
  								"12": "Dezember"
  							}
  						}
  					},
  					days: {
  						format: {
  							abbreviated: {
  								sun: "So.",
  								mon: "Mo.",
  								tue: "Di.",
  								wed: "Mi.",
  								thu: "Do.",
  								fri: "Fr.",
  								sat: "Sa."
  							},
  							narrow: {
  								sun: "S",
  								mon: "M",
  								tue: "D",
  								wed: "M",
  								thu: "D",
  								fri: "F",
  								sat: "S"
  							},
  							short: {
  								sun: "So.",
  								mon: "Mo.",
  								tue: "Di.",
  								wed: "Mi.",
  								thu: "Do.",
  								fri: "Fr.",
  								sat: "Sa."
  							},
  							wide: {
  								sun: "Sonntag",
  								mon: "Montag",
  								tue: "Dienstag",
  								wed: "Mittwoch",
  								thu: "Donnerstag",
  								fri: "Freitag",
  								sat: "Samstag"
  							}
  						},
  						"stand-alone": {
  							abbreviated: {
  								sun: "So",
  								mon: "Mo",
  								tue: "Di",
  								wed: "Mi",
  								thu: "Do",
  								fri: "Fr",
  								sat: "Sa"
  							},
  							narrow: {
  								sun: "S",
  								mon: "M",
  								tue: "D",
  								wed: "M",
  								thu: "D",
  								fri: "F",
  								sat: "S"
  							},
  							short: {
  								sun: "So.",
  								mon: "Mo.",
  								tue: "Di.",
  								wed: "Mi.",
  								thu: "Do.",
  								fri: "Fr.",
  								sat: "Sa."
  							},
  							wide: {
  								sun: "Sonntag",
  								mon: "Montag",
  								tue: "Dienstag",
  								wed: "Mittwoch",
  								thu: "Donnerstag",
  								fri: "Freitag",
  								sat: "Samstag"
  							}
  						}
  					},
  					quarters: {
  						format: {
  							abbreviated: {
  								"1": "Q1",
  								"2": "Q2",
  								"3": "Q3",
  								"4": "Q4"
  							},
  							narrow: {
  								"1": "1",
  								"2": "2",
  								"3": "3",
  								"4": "4"
  							},
  							wide: {
  								"1": "1. Quartal",
  								"2": "2. Quartal",
  								"3": "3. Quartal",
  								"4": "4. Quartal"
  							}
  						},
  						"stand-alone": {
  							abbreviated: {
  								"1": "Q1",
  								"2": "Q2",
  								"3": "Q3",
  								"4": "Q4"
  							},
  							narrow: {
  								"1": "1",
  								"2": "2",
  								"3": "3",
  								"4": "4"
  							},
  							wide: {
  								"1": "1. Quartal",
  								"2": "2. Quartal",
  								"3": "3. Quartal",
  								"4": "4. Quartal"
  							}
  						}
  					},
  					dayPeriods: {
  						format: {
  							abbreviated: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "morgens",
  								morning2: "vorm.",
  								afternoon1: "mittags",
  								afternoon2: "nachm.",
  								evening1: "abends",
  								night1: "nachts"
  							},
  							narrow: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "morgens",
  								morning2: "vorm.",
  								afternoon1: "mittags",
  								afternoon2: "nachm.",
  								evening1: "abends",
  								night1: "nachts"
  							},
  							wide: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "morgens",
  								morning2: "vormittags",
  								afternoon1: "mittags",
  								afternoon2: "nachmittags",
  								evening1: "abends",
  								night1: "nachts"
  							}
  						},
  						"stand-alone": {
  							abbreviated: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "Morgen",
  								morning2: "Vorm.",
  								afternoon1: "Mittag",
  								afternoon2: "Nachm.",
  								evening1: "Abend",
  								night1: "Nacht"
  							},
  							narrow: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "Morgen",
  								morning2: "Vorm.",
  								afternoon1: "Mittag",
  								afternoon2: "Nachm.",
  								evening1: "Abend",
  								night1: "Nacht"
  							},
  							wide: {
  								midnight: "Mitternacht",
  								am: "AM",
  								pm: "PM",
  								morning1: "Morgen",
  								morning2: "Vormittag",
  								afternoon1: "Mittag",
  								afternoon2: "Nachmittag",
  								evening1: "Abend",
  								night1: "Nacht"
  							}
  						}
  					},
  					eras: {
  						eraNames: {
  							"0": "v. Chr.",
  							"1": "n. Chr.",
  							"0-alt-variant": "vor unserer Zeitrechnung",
  							"1-alt-variant": "unserer Zeitrechnung"
  						},
  						eraAbbr: {
  							"0": "v. Chr.",
  							"1": "n. Chr.",
  							"0-alt-variant": "v. u. Z.",
  							"1-alt-variant": "u. Z."
  						},
  						eraNarrow: {
  							"0": "v. Chr.",
  							"1": "n. Chr.",
  							"0-alt-variant": "v. u. Z.",
  							"1-alt-variant": "u. Z."
  						}
  					},
  					dateFormats: {
  						full: "EEEE, d. MMMM y",
  						long: "d. MMMM y",
  						medium: "dd.MM.y",
  						short: "dd.MM.yy"
  					},
  					timeFormats: {
  						full: "HH:mm:ss zzzz",
  						long: "HH:mm:ss z",
  						medium: "HH:mm:ss",
  						short: "HH:mm"
  					},
  					dateTimeFormats: {
  						full: "{1} 'um' {0}",
  						long: "{1} 'um' {0}",
  						medium: "{1}, {0}",
  						short: "{1}, {0}",
  						availableFormats: {
  							Bh: "h B",
  							Bhm: "h:mm B",
  							Bhms: "h:mm:ss B",
  							d: "d",
  							E: "ccc",
  							EBhm: "E h:mm B",
  							EBhms: "E h:mm:ss B",
  							Ed: "E, d.",
  							Ehm: "E h:mm a",
  							EHm: "E, HH:mm",
  							Ehms: "E, h:mm:ss a",
  							EHms: "E, HH:mm:ss",
  							Gy: "y G",
  							GyMMM: "MMM y G",
  							GyMMMd: "d. MMM y G",
  							GyMMMEd: "E, d. MMM y G",
  							h: "h 'Uhr' a",
  							H: "HH 'Uhr'",
  							hm: "h:mm a",
  							Hm: "HH:mm",
  							hms: "h:mm:ss a",
  							Hms: "HH:mm:ss",
  							hmsv: "h:mm:ss a v",
  							Hmsv: "HH:mm:ss v",
  							hmv: "h:mm a v",
  							Hmv: "HH:mm v",
  							M: "L",
  							Md: "d.M.",
  							MEd: "E, d.M.",
  							MMd: "d.MM.",
  							MMdd: "dd.MM.",
  							MMM: "LLL",
  							MMMd: "d. MMM",
  							MMMEd: "E, d. MMM",
  							MMMMd: "d. MMMM",
  							MMMMEd: "E, d. MMMM",
  							"MMMMW-count-one": "'Woche' W 'im' MMMM",
  							"MMMMW-count-other": "'Woche' W 'im' MMMM",
  							ms: "mm:ss",
  							y: "y",
  							yM: "M.y",
  							yMd: "d.M.y",
  							yMEd: "E, d.M.y",
  							yMM: "MM.y",
  							yMMdd: "dd.MM.y",
  							yMMM: "MMM y",
  							yMMMd: "d. MMM y",
  							yMMMEd: "E, d. MMM y",
  							yMMMM: "MMMM y",
  							yQQQ: "QQQ y",
  							yQQQQ: "QQQQ y",
  							"yw-count-one": "'Woche' w 'des' 'Jahres' Y",
  							"yw-count-other": "'Woche' w 'des' 'Jahres' Y"
  						},
  						appendItems: {
  							Day: "{0} ({2}: {1})",
  							"Day-Of-Week": "{0} {1}",
  							Era: "{1} {0}",
  							Hour: "{0} ({2}: {1})",
  							Minute: "{0} ({2}: {1})",
  							Month: "{0} ({2}: {1})",
  							Quarter: "{0} ({2}: {1})",
  							Second: "{0} ({2}: {1})",
  							Timezone: "{0} {1}",
  							Week: "{0} ({2}: {1})",
  							Year: "{1} {0}"
  						},
  						intervalFormats: {
  							intervalFormatFallback: "{0} – {1}",
  							Bh: {
  								B: "h 'Uhr' B – h 'Uhr' B",
  								h: "h–h 'Uhr' B"
  							},
  							Bhm: {
  								B: "h:mm 'Uhr' B – h:mm 'Uhr' B",
  								h: "h:mm – h:mm 'Uhr' B",
  								m: "h:mm – h:mm 'Uhr' B"
  							},
  							d: {
  								d: "d.–d."
  							},
  							Gy: {
  								G: "y G – y G",
  								y: "y–y G"
  							},
  							GyM: {
  								G: "MM.y GGGGG – MM.y GGGGG",
  								M: "MM.y – MM.y GGGGG",
  								y: "MM.y – MM.y GGGGG"
  							},
  							GyMd: {
  								d: "dd.–dd.MM.y GGGGG",
  								G: "dd.MM.y GGGGG – dd.MM.y GGGGG",
  								M: "dd.MM. – dd.MM.y GGGGG",
  								y: "dd.MM.y – dd.MM.y GGGGG"
  							},
  							GyMEd: {
  								d: "E, dd.MM.y – E, dd.MM.y GGGGG",
  								G: "E, dd.MM.y GGGGG – E, dd.MM.y GGGGG",
  								M: "E, dd.MM. – E, dd.MM.y GGGGG",
  								y: "E, dd.MM.y – E, dd.MM.y GGGGG"
  							},
  							GyMMM: {
  								G: "MMM y G – MMM y G",
  								M: "MMM–MMM y G",
  								y: "MMM y – MMM y G"
  							},
  							GyMMMd: {
  								d: "d.–d. MMM y G",
  								G: "d. MMM y G – d. MMM y G",
  								M: "d. MMM – d. MMM y G",
  								y: "d. MMM y – d. MMM y G"
  							},
  							GyMMMEd: {
  								d: "E, d. – E, d. MMM y G",
  								G: "E, d. MMM y G – E E, d. MMM y G",
  								M: "E, d. MMM – E, d. MMM y G",
  								y: "E, d. MMM y – E, d. MMM y G"
  							},
  							h: {
  								a: "h 'Uhr' a – h 'Uhr' a",
  								h: "h – h 'Uhr' a"
  							},
  							H: {
  								H: "HH–HH 'Uhr'"
  							},
  							hm: {
  								a: "h:mm a – h:mm a",
  								h: "h:mm–h:mm a",
  								m: "h:mm–h:mm a"
  							},
  							Hm: {
  								H: "HH:mm–HH:mm 'Uhr'",
  								m: "HH:mm–HH:mm 'Uhr'"
  							},
  							hmv: {
  								a: "h:mm a – h:mm a v",
  								h: "h:mm–h:mm a v",
  								m: "h:mm–h:mm a v"
  							},
  							Hmv: {
  								H: "HH:mm–HH:mm 'Uhr' v",
  								m: "HH:mm–HH:mm 'Uhr' v"
  							},
  							hv: {
  								a: "h a – h a v",
  								h: "h–h a v"
  							},
  							Hv: {
  								H: "HH–HH 'Uhr' v"
  							},
  							M: {
  								M: "M.–M."
  							},
  							Md: {
  								d: "dd.–dd.MM.",
  								M: "dd.MM. – dd.MM."
  							},
  							MEd: {
  								d: "E, dd. – E, dd.MM.",
  								M: "E, dd.MM. – E, dd.MM."
  							},
  							MMM: {
  								M: "MMM–MMM"
  							},
  							MMMd: {
  								d: "d.–d. MMM",
  								M: "d. MMM – d. MMM"
  							},
  							MMMEd: {
  								d: "E, d. – E, d. MMM",
  								M: "E, d. MMM – E, d. MMM"
  							},
  							MMMM: {
  								M: "LLLL–LLLL"
  							},
  							y: {
  								y: "y–y"
  							},
  							yM: {
  								M: "MM.y – MM.y",
  								y: "MM.y – MM.y"
  							},
  							yMd: {
  								d: "dd.–dd.MM.y",
  								M: "dd.MM. – dd.MM.y",
  								y: "dd.MM.y – dd.MM.y"
  							},
  							yMEd: {
  								d: "E, dd. – E, dd.MM.y",
  								M: "E, dd.MM. – E, dd.MM.y",
  								y: "E, dd.MM.y – E, dd.MM.y"
  							},
  							yMMM: {
  								M: "MMM–MMM y",
  								y: "MMM y – MMM y"
  							},
  							yMMMd: {
  								d: "d.–d. MMM y",
  								M: "d. MMM – d. MMM y",
  								y: "d. MMM y – d. MMM y"
  							},
  							yMMMEd: {
  								d: "E, d. – E, d. MMM y",
  								M: "E, d. MMM – E, d. MMM y",
  								y: "E, d. MMM y – E, d. MMM y"
  							},
  							yMMMM: {
  								M: "MMMM–MMMM y",
  								y: "MMMM y – MMMM y"
  							}
  						}
  					}
  				}
  			}
  		}
  	}
  };
  var de_cg = {
  	main: main$1
  };

  var main = {
  	de: {
  		identity: {
  			version: {
  				_cldrVersion: "36"
  			},
  			language: "de"
  		},
  		dates: {
  			timeZoneNames: {
  				hourFormat: "+HH:mm;-HH:mm",
  				gmtFormat: "GMT{0}",
  				gmtZeroFormat: "GMT",
  				regionFormat: "{0} Zeit",
  				"regionFormat-type-daylight": "{0} Sommerzeit",
  				"regionFormat-type-standard": "{0} Normalzeit",
  				fallbackFormat: "{1} ({0})",
  				zone: {
  					America: {
  						Adak: {
  							exemplarCity: "Adak"
  						},
  						Anchorage: {
  							exemplarCity: "Anchorage"
  						},
  						Anguilla: {
  							exemplarCity: "Anguilla"
  						},
  						Antigua: {
  							exemplarCity: "Antigua"
  						},
  						Araguaina: {
  							exemplarCity: "Araguaina"
  						},
  						Argentina: {
  							Rio_Gallegos: {
  								exemplarCity: "Rio Gallegos"
  							},
  							San_Juan: {
  								exemplarCity: "San Juan"
  							},
  							Ushuaia: {
  								exemplarCity: "Ushuaia"
  							},
  							La_Rioja: {
  								exemplarCity: "La Rioja"
  							},
  							San_Luis: {
  								exemplarCity: "San Luis"
  							},
  							Salta: {
  								exemplarCity: "Salta"
  							},
  							Tucuman: {
  								exemplarCity: "Tucuman"
  							}
  						},
  						Aruba: {
  							exemplarCity: "Aruba"
  						},
  						Asuncion: {
  							exemplarCity: "Asunción"
  						},
  						Bahia: {
  							exemplarCity: "Bahia"
  						},
  						Bahia_Banderas: {
  							exemplarCity: "Bahia Banderas"
  						},
  						Barbados: {
  							exemplarCity: "Barbados"
  						},
  						Belem: {
  							exemplarCity: "Belem"
  						},
  						Belize: {
  							exemplarCity: "Belize"
  						},
  						"Blanc-Sablon": {
  							exemplarCity: "Blanc-Sablon"
  						},
  						Boa_Vista: {
  							exemplarCity: "Boa Vista"
  						},
  						Bogota: {
  							exemplarCity: "Bogotá"
  						},
  						Boise: {
  							exemplarCity: "Boise"
  						},
  						Buenos_Aires: {
  							exemplarCity: "Buenos Aires"
  						},
  						Cambridge_Bay: {
  							exemplarCity: "Cambridge Bay"
  						},
  						Campo_Grande: {
  							exemplarCity: "Campo Grande"
  						},
  						Cancun: {
  							exemplarCity: "Cancún"
  						},
  						Caracas: {
  							exemplarCity: "Caracas"
  						},
  						Catamarca: {
  							exemplarCity: "Catamarca"
  						},
  						Cayenne: {
  							exemplarCity: "Cayenne"
  						},
  						Cayman: {
  							exemplarCity: "Kaimaninseln"
  						},
  						Chicago: {
  							exemplarCity: "Chicago"
  						},
  						Chihuahua: {
  							exemplarCity: "Chihuahua"
  						},
  						Coral_Harbour: {
  							exemplarCity: "Atikokan"
  						},
  						Cordoba: {
  							exemplarCity: "Córdoba"
  						},
  						Costa_Rica: {
  							exemplarCity: "Costa Rica"
  						},
  						Creston: {
  							exemplarCity: "Creston"
  						},
  						Cuiaba: {
  							exemplarCity: "Cuiaba"
  						},
  						Curacao: {
  							exemplarCity: "Curaçao"
  						},
  						Danmarkshavn: {
  							exemplarCity: "Danmarkshavn"
  						},
  						Dawson: {
  							exemplarCity: "Dawson"
  						},
  						Dawson_Creek: {
  							exemplarCity: "Dawson Creek"
  						},
  						Denver: {
  							exemplarCity: "Denver"
  						},
  						Detroit: {
  							exemplarCity: "Detroit"
  						},
  						Dominica: {
  							exemplarCity: "Dominica"
  						},
  						Edmonton: {
  							exemplarCity: "Edmonton"
  						},
  						Eirunepe: {
  							exemplarCity: "Eirunepe"
  						},
  						El_Salvador: {
  							exemplarCity: "El Salvador"
  						},
  						Fort_Nelson: {
  							exemplarCity: "Fort Nelson"
  						},
  						Fortaleza: {
  							exemplarCity: "Fortaleza"
  						},
  						Glace_Bay: {
  							exemplarCity: "Glace Bay"
  						},
  						Godthab: {
  							exemplarCity: "Nuuk"
  						},
  						Goose_Bay: {
  							exemplarCity: "Goose Bay"
  						},
  						Grand_Turk: {
  							exemplarCity: "Grand Turk"
  						},
  						Grenada: {
  							exemplarCity: "Grenada"
  						},
  						Guadeloupe: {
  							exemplarCity: "Guadeloupe"
  						},
  						Guatemala: {
  							exemplarCity: "Guatemala"
  						},
  						Guayaquil: {
  							exemplarCity: "Guayaquil"
  						},
  						Guyana: {
  							exemplarCity: "Guyana"
  						},
  						Halifax: {
  							exemplarCity: "Halifax"
  						},
  						Havana: {
  							exemplarCity: "Havanna"
  						},
  						Hermosillo: {
  							exemplarCity: "Hermosillo"
  						},
  						Indiana: {
  							Vincennes: {
  								exemplarCity: "Vincennes, Indiana"
  							},
  							Petersburg: {
  								exemplarCity: "Petersburg, Indiana"
  							},
  							Tell_City: {
  								exemplarCity: "Tell City, Indiana"
  							},
  							Knox: {
  								exemplarCity: "Knox, Indiana"
  							},
  							Winamac: {
  								exemplarCity: "Winamac, Indiana"
  							},
  							Marengo: {
  								exemplarCity: "Marengo, Indiana"
  							},
  							Vevay: {
  								exemplarCity: "Vevay, Indiana"
  							}
  						},
  						Indianapolis: {
  							exemplarCity: "Indianapolis"
  						},
  						Inuvik: {
  							exemplarCity: "Inuvik"
  						},
  						Iqaluit: {
  							exemplarCity: "Iqaluit"
  						},
  						Jamaica: {
  							exemplarCity: "Jamaika"
  						},
  						Jujuy: {
  							exemplarCity: "Jujuy"
  						},
  						Juneau: {
  							exemplarCity: "Juneau"
  						},
  						Kentucky: {
  							Monticello: {
  								exemplarCity: "Monticello, Kentucky"
  							}
  						},
  						Kralendijk: {
  							exemplarCity: "Kralendijk"
  						},
  						La_Paz: {
  							exemplarCity: "La Paz"
  						},
  						Lima: {
  							exemplarCity: "Lima"
  						},
  						Los_Angeles: {
  							exemplarCity: "Los Angeles"
  						},
  						Louisville: {
  							exemplarCity: "Louisville"
  						},
  						Lower_Princes: {
  							exemplarCity: "Lower Prince’s Quarter"
  						},
  						Maceio: {
  							exemplarCity: "Maceio"
  						},
  						Managua: {
  							exemplarCity: "Managua"
  						},
  						Manaus: {
  							exemplarCity: "Manaus"
  						},
  						Marigot: {
  							exemplarCity: "Marigot"
  						},
  						Martinique: {
  							exemplarCity: "Martinique"
  						},
  						Matamoros: {
  							exemplarCity: "Matamoros"
  						},
  						Mazatlan: {
  							exemplarCity: "Mazatlan"
  						},
  						Mendoza: {
  							exemplarCity: "Mendoza"
  						},
  						Menominee: {
  							exemplarCity: "Menominee"
  						},
  						Merida: {
  							exemplarCity: "Merida"
  						},
  						Metlakatla: {
  							exemplarCity: "Metlakatla"
  						},
  						Mexico_City: {
  							exemplarCity: "Mexiko-Stadt"
  						},
  						Miquelon: {
  							exemplarCity: "Miquelon"
  						},
  						Moncton: {
  							exemplarCity: "Moncton"
  						},
  						Monterrey: {
  							exemplarCity: "Monterrey"
  						},
  						Montevideo: {
  							exemplarCity: "Montevideo"
  						},
  						Montserrat: {
  							exemplarCity: "Montserrat"
  						},
  						Nassau: {
  							exemplarCity: "Nassau"
  						},
  						New_York: {
  							exemplarCity: "New York"
  						},
  						Nipigon: {
  							exemplarCity: "Nipigon"
  						},
  						Nome: {
  							exemplarCity: "Nome"
  						},
  						Noronha: {
  							exemplarCity: "Noronha"
  						},
  						North_Dakota: {
  							Beulah: {
  								exemplarCity: "Beulah, North Dakota"
  							},
  							New_Salem: {
  								exemplarCity: "New Salem, North Dakota"
  							},
  							Center: {
  								exemplarCity: "Center, North Dakota"
  							}
  						},
  						Ojinaga: {
  							exemplarCity: "Ojinaga"
  						},
  						Panama: {
  							exemplarCity: "Panama"
  						},
  						Pangnirtung: {
  							exemplarCity: "Pangnirtung"
  						},
  						Paramaribo: {
  							exemplarCity: "Paramaribo"
  						},
  						Phoenix: {
  							exemplarCity: "Phoenix"
  						},
  						"Port-au-Prince": {
  							exemplarCity: "Port-au-Prince"
  						},
  						Port_of_Spain: {
  							exemplarCity: "Port of Spain"
  						},
  						Porto_Velho: {
  							exemplarCity: "Porto Velho"
  						},
  						Puerto_Rico: {
  							exemplarCity: "Puerto Rico"
  						},
  						Punta_Arenas: {
  							exemplarCity: "Punta Arenas"
  						},
  						Rainy_River: {
  							exemplarCity: "Rainy River"
  						},
  						Rankin_Inlet: {
  							exemplarCity: "Rankin Inlet"
  						},
  						Recife: {
  							exemplarCity: "Recife"
  						},
  						Regina: {
  							exemplarCity: "Regina"
  						},
  						Resolute: {
  							exemplarCity: "Resolute"
  						},
  						Rio_Branco: {
  							exemplarCity: "Rio Branco"
  						},
  						Santa_Isabel: {
  							exemplarCity: "Santa Isabel"
  						},
  						Santarem: {
  							exemplarCity: "Santarem"
  						},
  						Santiago: {
  							exemplarCity: "Santiago"
  						},
  						Santo_Domingo: {
  							exemplarCity: "Santo Domingo"
  						},
  						Sao_Paulo: {
  							exemplarCity: "São Paulo"
  						},
  						Scoresbysund: {
  							exemplarCity: "Ittoqqortoormiit"
  						},
  						Sitka: {
  							exemplarCity: "Sitka"
  						},
  						St_Barthelemy: {
  							exemplarCity: "Saint-Barthélemy"
  						},
  						St_Johns: {
  							exemplarCity: "St. John’s"
  						},
  						St_Kitts: {
  							exemplarCity: "St. Kitts"
  						},
  						St_Lucia: {
  							exemplarCity: "St. Lucia"
  						},
  						St_Thomas: {
  							exemplarCity: "St. Thomas"
  						},
  						St_Vincent: {
  							exemplarCity: "St. Vincent"
  						},
  						Swift_Current: {
  							exemplarCity: "Swift Current"
  						},
  						Tegucigalpa: {
  							exemplarCity: "Tegucigalpa"
  						},
  						Thule: {
  							exemplarCity: "Thule"
  						},
  						Thunder_Bay: {
  							exemplarCity: "Thunder Bay"
  						},
  						Tijuana: {
  							exemplarCity: "Tijuana"
  						},
  						Toronto: {
  							exemplarCity: "Toronto"
  						},
  						Tortola: {
  							exemplarCity: "Tortola"
  						},
  						Vancouver: {
  							exemplarCity: "Vancouver"
  						},
  						Whitehorse: {
  							exemplarCity: "Whitehorse"
  						},
  						Winnipeg: {
  							exemplarCity: "Winnipeg"
  						},
  						Yakutat: {
  							exemplarCity: "Yakutat"
  						},
  						Yellowknife: {
  							exemplarCity: "Yellowknife"
  						}
  					},
  					Atlantic: {
  						Azores: {
  							exemplarCity: "Azoren"
  						},
  						Bermuda: {
  							exemplarCity: "Bermuda"
  						},
  						Canary: {
  							exemplarCity: "Kanaren"
  						},
  						Cape_Verde: {
  							exemplarCity: "Cabo Verde"
  						},
  						Faeroe: {
  							exemplarCity: "Färöer"
  						},
  						Madeira: {
  							exemplarCity: "Madeira"
  						},
  						Reykjavik: {
  							exemplarCity: "Reyk­ja­vík"
  						},
  						South_Georgia: {
  							exemplarCity: "Südgeorgien"
  						},
  						St_Helena: {
  							exemplarCity: "St. Helena"
  						},
  						Stanley: {
  							exemplarCity: "Stanley"
  						}
  					},
  					Europe: {
  						Amsterdam: {
  							exemplarCity: "Amsterdam"
  						},
  						Andorra: {
  							exemplarCity: "Andorra"
  						},
  						Astrakhan: {
  							exemplarCity: "Astrachan"
  						},
  						Athens: {
  							exemplarCity: "Athen"
  						},
  						Belgrade: {
  							exemplarCity: "Belgrad"
  						},
  						Berlin: {
  							exemplarCity: "Berlin"
  						},
  						Bratislava: {
  							exemplarCity: "Bratislava"
  						},
  						Brussels: {
  							exemplarCity: "Brüssel"
  						},
  						Bucharest: {
  							exemplarCity: "Bukarest"
  						},
  						Budapest: {
  							exemplarCity: "Budapest"
  						},
  						Busingen: {
  							exemplarCity: "Büsingen"
  						},
  						Chisinau: {
  							exemplarCity: "Kischinau"
  						},
  						Copenhagen: {
  							exemplarCity: "Kopenhagen"
  						},
  						Dublin: {
  							long: {
  								daylight: "Irische Sommerzeit"
  							},
  							exemplarCity: "Dublin"
  						},
  						Gibraltar: {
  							exemplarCity: "Gibraltar"
  						},
  						Guernsey: {
  							exemplarCity: "Guernsey"
  						},
  						Helsinki: {
  							exemplarCity: "Helsinki"
  						},
  						Isle_of_Man: {
  							exemplarCity: "Isle of Man"
  						},
  						Istanbul: {
  							exemplarCity: "Istanbul"
  						},
  						Jersey: {
  							exemplarCity: "Jersey"
  						},
  						Kaliningrad: {
  							exemplarCity: "Kaliningrad"
  						},
  						Kiev: {
  							exemplarCity: "Kiew"
  						},
  						Kirov: {
  							exemplarCity: "Kirow"
  						},
  						Lisbon: {
  							exemplarCity: "Lissabon"
  						},
  						Ljubljana: {
  							exemplarCity: "Ljubljana"
  						},
  						London: {
  							long: {
  								daylight: "Britische Sommerzeit"
  							},
  							exemplarCity: "London"
  						},
  						Luxembourg: {
  							exemplarCity: "Luxemburg"
  						},
  						Madrid: {
  							exemplarCity: "Madrid"
  						},
  						Malta: {
  							exemplarCity: "Malta"
  						},
  						Mariehamn: {
  							exemplarCity: "Mariehamn"
  						},
  						Minsk: {
  							exemplarCity: "Minsk"
  						},
  						Monaco: {
  							exemplarCity: "Monaco"
  						},
  						Moscow: {
  							exemplarCity: "Moskau"
  						},
  						Oslo: {
  							exemplarCity: "Oslo"
  						},
  						Paris: {
  							exemplarCity: "Paris"
  						},
  						Podgorica: {
  							exemplarCity: "Podgorica"
  						},
  						Prague: {
  							exemplarCity: "Prag"
  						},
  						Riga: {
  							exemplarCity: "Riga"
  						},
  						Rome: {
  							exemplarCity: "Rom"
  						},
  						Samara: {
  							exemplarCity: "Samara"
  						},
  						San_Marino: {
  							exemplarCity: "San Marino"
  						},
  						Sarajevo: {
  							exemplarCity: "Sarajevo"
  						},
  						Saratov: {
  							exemplarCity: "Saratow"
  						},
  						Simferopol: {
  							exemplarCity: "Simferopol"
  						},
  						Skopje: {
  							exemplarCity: "Skopje"
  						},
  						Sofia: {
  							exemplarCity: "Sofia"
  						},
  						Stockholm: {
  							exemplarCity: "Stockholm"
  						},
  						Tallinn: {
  							exemplarCity: "Tallinn"
  						},
  						Tirane: {
  							exemplarCity: "Tirana"
  						},
  						Ulyanovsk: {
  							exemplarCity: "Uljanowsk"
  						},
  						Uzhgorod: {
  							exemplarCity: "Uschgorod"
  						},
  						Vaduz: {
  							exemplarCity: "Vaduz"
  						},
  						Vatican: {
  							exemplarCity: "Vatikan"
  						},
  						Vienna: {
  							exemplarCity: "Wien"
  						},
  						Vilnius: {
  							exemplarCity: "Vilnius"
  						},
  						Volgograd: {
  							exemplarCity: "Wolgograd"
  						},
  						Warsaw: {
  							exemplarCity: "Warschau"
  						},
  						Zagreb: {
  							exemplarCity: "Zagreb"
  						},
  						Zaporozhye: {
  							exemplarCity: "Saporischja"
  						},
  						Zurich: {
  							exemplarCity: "Zürich"
  						}
  					},
  					Africa: {
  						Abidjan: {
  							exemplarCity: "Abidjan"
  						},
  						Accra: {
  							exemplarCity: "Accra"
  						},
  						Addis_Ababa: {
  							exemplarCity: "Addis Abeba"
  						},
  						Algiers: {
  							exemplarCity: "Algier"
  						},
  						Asmera: {
  							exemplarCity: "Asmara"
  						},
  						Bamako: {
  							exemplarCity: "Bamako"
  						},
  						Bangui: {
  							exemplarCity: "Bangui"
  						},
  						Banjul: {
  							exemplarCity: "Banjul"
  						},
  						Bissau: {
  							exemplarCity: "Bissau"
  						},
  						Blantyre: {
  							exemplarCity: "Blantyre"
  						},
  						Brazzaville: {
  							exemplarCity: "Brazzaville"
  						},
  						Bujumbura: {
  							exemplarCity: "Bujumbura"
  						},
  						Cairo: {
  							exemplarCity: "Kairo"
  						},
  						Casablanca: {
  							exemplarCity: "Casablanca"
  						},
  						Ceuta: {
  							exemplarCity: "Ceuta"
  						},
  						Conakry: {
  							exemplarCity: "Conakry"
  						},
  						Dakar: {
  							exemplarCity: "Dakar"
  						},
  						Dar_es_Salaam: {
  							exemplarCity: "Daressalam"
  						},
  						Djibouti: {
  							exemplarCity: "Dschibuti"
  						},
  						Douala: {
  							exemplarCity: "Douala"
  						},
  						El_Aaiun: {
  							exemplarCity: "El Aaiún"
  						},
  						Freetown: {
  							exemplarCity: "Freetown"
  						},
  						Gaborone: {
  							exemplarCity: "Gaborone"
  						},
  						Harare: {
  							exemplarCity: "Harare"
  						},
  						Johannesburg: {
  							exemplarCity: "Johannesburg"
  						},
  						Juba: {
  							exemplarCity: "Juba"
  						},
  						Kampala: {
  							exemplarCity: "Kampala"
  						},
  						Khartoum: {
  							exemplarCity: "Khartum"
  						},
  						Kigali: {
  							exemplarCity: "Kigali"
  						},
  						Kinshasa: {
  							exemplarCity: "Kinshasa"
  						},
  						Lagos: {
  							exemplarCity: "Lagos"
  						},
  						Libreville: {
  							exemplarCity: "Libreville"
  						},
  						Lome: {
  							exemplarCity: "Lomé"
  						},
  						Luanda: {
  							exemplarCity: "Luanda"
  						},
  						Lubumbashi: {
  							exemplarCity: "Lubumbashi"
  						},
  						Lusaka: {
  							exemplarCity: "Lusaka"
  						},
  						Malabo: {
  							exemplarCity: "Malabo"
  						},
  						Maputo: {
  							exemplarCity: "Maputo"
  						},
  						Maseru: {
  							exemplarCity: "Maseru"
  						},
  						Mbabane: {
  							exemplarCity: "Mbabane"
  						},
  						Mogadishu: {
  							exemplarCity: "Mogadischu"
  						},
  						Monrovia: {
  							exemplarCity: "Monrovia"
  						},
  						Nairobi: {
  							exemplarCity: "Nairobi"
  						},
  						Ndjamena: {
  							exemplarCity: "N’Djamena"
  						},
  						Niamey: {
  							exemplarCity: "Niamey"
  						},
  						Nouakchott: {
  							exemplarCity: "Nouakchott"
  						},
  						Ouagadougou: {
  							exemplarCity: "Ouagadougou"
  						},
  						"Porto-Novo": {
  							exemplarCity: "Porto Novo"
  						},
  						Sao_Tome: {
  							exemplarCity: "São Tomé"
  						},
  						Tripoli: {
  							exemplarCity: "Tripolis"
  						},
  						Tunis: {
  							exemplarCity: "Tunis"
  						},
  						Windhoek: {
  							exemplarCity: "Windhoek"
  						}
  					},
  					Asia: {
  						Aden: {
  							exemplarCity: "Aden"
  						},
  						Almaty: {
  							exemplarCity: "Almaty"
  						},
  						Amman: {
  							exemplarCity: "Amman"
  						},
  						Anadyr: {
  							exemplarCity: "Anadyr"
  						},
  						Aqtau: {
  							exemplarCity: "Aqtau"
  						},
  						Aqtobe: {
  							exemplarCity: "Aktobe"
  						},
  						Ashgabat: {
  							exemplarCity: "Aşgabat"
  						},
  						Atyrau: {
  							exemplarCity: "Atyrau"
  						},
  						Baghdad: {
  							exemplarCity: "Bagdad"
  						},
  						Bahrain: {
  							exemplarCity: "Bahrain"
  						},
  						Baku: {
  							exemplarCity: "Baku"
  						},
  						Bangkok: {
  							exemplarCity: "Bangkok"
  						},
  						Barnaul: {
  							exemplarCity: "Barnaul"
  						},
  						Beirut: {
  							exemplarCity: "Beirut"
  						},
  						Bishkek: {
  							exemplarCity: "Bischkek"
  						},
  						Brunei: {
  							exemplarCity: "Brunei Darussalam"
  						},
  						Calcutta: {
  							exemplarCity: "Kalkutta"
  						},
  						Chita: {
  							exemplarCity: "Tschita"
  						},
  						Choibalsan: {
  							exemplarCity: "Tschoibalsan"
  						},
  						Colombo: {
  							exemplarCity: "Colombo"
  						},
  						Damascus: {
  							exemplarCity: "Damaskus"
  						},
  						Dhaka: {
  							exemplarCity: "Dhaka"
  						},
  						Dili: {
  							exemplarCity: "Dili"
  						},
  						Dubai: {
  							exemplarCity: "Dubai"
  						},
  						Dushanbe: {
  							exemplarCity: "Duschanbe"
  						},
  						Famagusta: {
  							exemplarCity: "Famagusta"
  						},
  						Gaza: {
  							exemplarCity: "Gaza"
  						},
  						Hebron: {
  							exemplarCity: "Hebron"
  						},
  						Hong_Kong: {
  							exemplarCity: "Hongkong"
  						},
  						Hovd: {
  							exemplarCity: "Chowd"
  						},
  						Irkutsk: {
  							exemplarCity: "Irkutsk"
  						},
  						Jakarta: {
  							exemplarCity: "Jakarta"
  						},
  						Jayapura: {
  							exemplarCity: "Jayapura"
  						},
  						Jerusalem: {
  							exemplarCity: "Jerusalem"
  						},
  						Kabul: {
  							exemplarCity: "Kabul"
  						},
  						Kamchatka: {
  							exemplarCity: "Kamtschatka"
  						},
  						Karachi: {
  							exemplarCity: "Karatschi"
  						},
  						Katmandu: {
  							exemplarCity: "Kathmandu"
  						},
  						Khandyga: {
  							exemplarCity: "Chandyga"
  						},
  						Krasnoyarsk: {
  							exemplarCity: "Krasnojarsk"
  						},
  						Kuala_Lumpur: {
  							exemplarCity: "Kuala Lumpur"
  						},
  						Kuching: {
  							exemplarCity: "Kuching"
  						},
  						Kuwait: {
  							exemplarCity: "Kuwait"
  						},
  						Macau: {
  							exemplarCity: "Macau"
  						},
  						Magadan: {
  							exemplarCity: "Magadan"
  						},
  						Makassar: {
  							exemplarCity: "Makassar"
  						},
  						Manila: {
  							exemplarCity: "Manila"
  						},
  						Muscat: {
  							exemplarCity: "Maskat"
  						},
  						Nicosia: {
  							exemplarCity: "Nikosia"
  						},
  						Novokuznetsk: {
  							exemplarCity: "Nowokuznetsk"
  						},
  						Novosibirsk: {
  							exemplarCity: "Nowosibirsk"
  						},
  						Omsk: {
  							exemplarCity: "Omsk"
  						},
  						Oral: {
  							exemplarCity: "Oral"
  						},
  						Phnom_Penh: {
  							exemplarCity: "Phnom Penh"
  						},
  						Pontianak: {
  							exemplarCity: "Pontianak"
  						},
  						Pyongyang: {
  							exemplarCity: "Pjöngjang"
  						},
  						Qatar: {
  							exemplarCity: "Katar"
  						},
  						Qostanay: {
  							exemplarCity: "Qostanai"
  						},
  						Qyzylorda: {
  							exemplarCity: "Qysylorda"
  						},
  						Rangoon: {
  							exemplarCity: "Rangun"
  						},
  						Riyadh: {
  							exemplarCity: "Riad"
  						},
  						Saigon: {
  							exemplarCity: "Ho-Chi-Minh-Stadt"
  						},
  						Sakhalin: {
  							exemplarCity: "Sachalin"
  						},
  						Samarkand: {
  							exemplarCity: "Samarkand"
  						},
  						Seoul: {
  							exemplarCity: "Seoul"
  						},
  						Shanghai: {
  							exemplarCity: "Shanghai"
  						},
  						Singapore: {
  							exemplarCity: "Singapur"
  						},
  						Srednekolymsk: {
  							exemplarCity: "Srednekolymsk"
  						},
  						Taipei: {
  							exemplarCity: "Taipeh"
  						},
  						Tashkent: {
  							exemplarCity: "Taschkent"
  						},
  						Tbilisi: {
  							exemplarCity: "Tiflis"
  						},
  						Tehran: {
  							exemplarCity: "Teheran"
  						},
  						Thimphu: {
  							exemplarCity: "Thimphu"
  						},
  						Tokyo: {
  							exemplarCity: "Tokio"
  						},
  						Tomsk: {
  							exemplarCity: "Tomsk"
  						},
  						Ulaanbaatar: {
  							exemplarCity: "Ulaanbaatar"
  						},
  						Urumqi: {
  							exemplarCity: "Ürümqi"
  						},
  						"Ust-Nera": {
  							exemplarCity: "Ust-Nera"
  						},
  						Vientiane: {
  							exemplarCity: "Vientiane"
  						},
  						Vladivostok: {
  							exemplarCity: "Wladiwostok"
  						},
  						Yakutsk: {
  							exemplarCity: "Jakutsk"
  						},
  						Yekaterinburg: {
  							exemplarCity: "Jekaterinburg"
  						},
  						Yerevan: {
  							exemplarCity: "Eriwan"
  						}
  					},
  					Indian: {
  						Antananarivo: {
  							exemplarCity: "Antananarivo"
  						},
  						Chagos: {
  							exemplarCity: "Chagos"
  						},
  						Christmas: {
  							exemplarCity: "Weihnachtsinsel"
  						},
  						Cocos: {
  							exemplarCity: "Cocos"
  						},
  						Comoro: {
  							exemplarCity: "Komoren"
  						},
  						Kerguelen: {
  							exemplarCity: "Kerguelen"
  						},
  						Mahe: {
  							exemplarCity: "Mahe"
  						},
  						Maldives: {
  							exemplarCity: "Malediven"
  						},
  						Mauritius: {
  							exemplarCity: "Mauritius"
  						},
  						Mayotte: {
  							exemplarCity: "Mayotte"
  						},
  						Reunion: {
  							exemplarCity: "Réunion"
  						}
  					},
  					Australia: {
  						Adelaide: {
  							exemplarCity: "Adelaide"
  						},
  						Brisbane: {
  							exemplarCity: "Brisbane"
  						},
  						Broken_Hill: {
  							exemplarCity: "Broken Hill"
  						},
  						Currie: {
  							exemplarCity: "Currie"
  						},
  						Darwin: {
  							exemplarCity: "Darwin"
  						},
  						Eucla: {
  							exemplarCity: "Eucla"
  						},
  						Hobart: {
  							exemplarCity: "Hobart"
  						},
  						Lindeman: {
  							exemplarCity: "Lindeman"
  						},
  						Lord_Howe: {
  							exemplarCity: "Lord Howe"
  						},
  						Melbourne: {
  							exemplarCity: "Melbourne"
  						},
  						Perth: {
  							exemplarCity: "Perth"
  						},
  						Sydney: {
  							exemplarCity: "Sydney"
  						}
  					},
  					Pacific: {
  						Apia: {
  							exemplarCity: "Apia"
  						},
  						Auckland: {
  							exemplarCity: "Auckland"
  						},
  						Bougainville: {
  							exemplarCity: "Bougainville"
  						},
  						Chatham: {
  							exemplarCity: "Chatham"
  						},
  						Easter: {
  							exemplarCity: "Osterinsel"
  						},
  						Efate: {
  							exemplarCity: "Efate"
  						},
  						Enderbury: {
  							exemplarCity: "Enderbury"
  						},
  						Fakaofo: {
  							exemplarCity: "Fakaofo"
  						},
  						Fiji: {
  							exemplarCity: "Fidschi"
  						},
  						Funafuti: {
  							exemplarCity: "Funafuti"
  						},
  						Galapagos: {
  							exemplarCity: "Galapagos"
  						},
  						Gambier: {
  							exemplarCity: "Gambier"
  						},
  						Guadalcanal: {
  							exemplarCity: "Guadalcanal"
  						},
  						Guam: {
  							exemplarCity: "Guam"
  						},
  						Honolulu: {
  							exemplarCity: "Honolulu"
  						},
  						Johnston: {
  							exemplarCity: "Johnston"
  						},
  						Kiritimati: {
  							exemplarCity: "Kiritimati"
  						},
  						Kosrae: {
  							exemplarCity: "Kosrae"
  						},
  						Kwajalein: {
  							exemplarCity: "Kwajalein"
  						},
  						Majuro: {
  							exemplarCity: "Majuro"
  						},
  						Marquesas: {
  							exemplarCity: "Marquesas"
  						},
  						Midway: {
  							exemplarCity: "Midway"
  						},
  						Nauru: {
  							exemplarCity: "Nauru"
  						},
  						Niue: {
  							exemplarCity: "Niue"
  						},
  						Norfolk: {
  							exemplarCity: "Norfolk"
  						},
  						Noumea: {
  							exemplarCity: "Noumea"
  						},
  						Pago_Pago: {
  							exemplarCity: "Pago Pago"
  						},
  						Palau: {
  							exemplarCity: "Palau"
  						},
  						Pitcairn: {
  							exemplarCity: "Pitcairn"
  						},
  						Ponape: {
  							exemplarCity: "Pohnpei"
  						},
  						Port_Moresby: {
  							exemplarCity: "Port Moresby"
  						},
  						Rarotonga: {
  							exemplarCity: "Rarotonga"
  						},
  						Saipan: {
  							exemplarCity: "Saipan"
  						},
  						Tahiti: {
  							exemplarCity: "Tahiti"
  						},
  						Tarawa: {
  							exemplarCity: "Tarawa"
  						},
  						Tongatapu: {
  							exemplarCity: "Tongatapu"
  						},
  						Truk: {
  							exemplarCity: "Chuuk"
  						},
  						Wake: {
  							exemplarCity: "Wake"
  						},
  						Wallis: {
  							exemplarCity: "Wallis"
  						}
  					},
  					Arctic: {
  						Longyearbyen: {
  							exemplarCity: "Longyearbyen"
  						}
  					},
  					Antarctica: {
  						Casey: {
  							exemplarCity: "Casey"
  						},
  						Davis: {
  							exemplarCity: "Davis"
  						},
  						DumontDUrville: {
  							exemplarCity: "Dumont d’Urville"
  						},
  						Macquarie: {
  							exemplarCity: "Macquarie"
  						},
  						Mawson: {
  							exemplarCity: "Mawson"
  						},
  						McMurdo: {
  							exemplarCity: "McMurdo"
  						},
  						Palmer: {
  							exemplarCity: "Palmer"
  						},
  						Rothera: {
  							exemplarCity: "Rothera"
  						},
  						Syowa: {
  							exemplarCity: "Syowa"
  						},
  						Troll: {
  							exemplarCity: "Troll"
  						},
  						Vostok: {
  							exemplarCity: "Wostok"
  						}
  					},
  					Etc: {
  						UTC: {
  							long: {
  								standard: "Koordinierte Weltzeit"
  							},
  							short: {
  								standard: "UTC"
  							}
  						},
  						Unknown: {
  							exemplarCity: "Unbekannt"
  						}
  					}
  				},
  				metazone: {
  					Acre: {
  						long: {
  							generic: "Acre-Zeit",
  							standard: "Acre-Normalzeit",
  							daylight: "Acre-Sommerzeit"
  						}
  					},
  					Afghanistan: {
  						long: {
  							standard: "Afghanistan-Zeit"
  						}
  					},
  					Africa_Central: {
  						long: {
  							standard: "Zentralafrikanische Zeit"
  						}
  					},
  					Africa_Eastern: {
  						long: {
  							standard: "Ostafrikanische Zeit"
  						}
  					},
  					Africa_Southern: {
  						long: {
  							standard: "Südafrikanische Zeit"
  						}
  					},
  					Africa_Western: {
  						long: {
  							generic: "Westafrikanische Zeit",
  							standard: "Westafrikanische Normalzeit",
  							daylight: "Westafrikanische Sommerzeit"
  						}
  					},
  					Alaska: {
  						long: {
  							generic: "Alaska-Zeit",
  							standard: "Alaska-Normalzeit",
  							daylight: "Alaska-Sommerzeit"
  						}
  					},
  					Almaty: {
  						long: {
  							generic: "Almaty-Zeit",
  							standard: "Almaty-Normalzeit",
  							daylight: "Almaty-Sommerzeit"
  						}
  					},
  					Amazon: {
  						long: {
  							generic: "Amazonas-Zeit",
  							standard: "Amazonas-Normalzeit",
  							daylight: "Amazonas-Sommerzeit"
  						}
  					},
  					America_Central: {
  						long: {
  							generic: "Nordamerikanische Inlandzeit",
  							standard: "Nordamerikanische Inland-Normalzeit",
  							daylight: "Nordamerikanische Inland-Sommerzeit"
  						}
  					},
  					America_Eastern: {
  						long: {
  							generic: "Nordamerikanische Ostküstenzeit",
  							standard: "Nordamerikanische Ostküsten-Normalzeit",
  							daylight: "Nordamerikanische Ostküsten-Sommerzeit"
  						}
  					},
  					America_Mountain: {
  						long: {
  							generic: "Rocky-Mountain-Zeit",
  							standard: "Rocky Mountain-Normalzeit",
  							daylight: "Rocky-Mountain-Sommerzeit"
  						}
  					},
  					America_Pacific: {
  						long: {
  							generic: "Nordamerikanische Westküstenzeit",
  							standard: "Nordamerikanische Westküsten-Normalzeit",
  							daylight: "Nordamerikanische Westküsten-Sommerzeit"
  						}
  					},
  					Anadyr: {
  						long: {
  							generic: "Anadyr Zeit",
  							standard: "Anadyr Normalzeit",
  							daylight: "Anadyr Sommerzeit"
  						}
  					},
  					Apia: {
  						long: {
  							generic: "Apia-Zeit",
  							standard: "Apia-Normalzeit",
  							daylight: "Apia-Sommerzeit"
  						}
  					},
  					Aqtau: {
  						long: {
  							generic: "Aqtau-Zeit",
  							standard: "Aqtau-Normalzeit",
  							daylight: "Aqtau-Sommerzeit"
  						}
  					},
  					Aqtobe: {
  						long: {
  							generic: "Aqtöbe-Zeit",
  							standard: "Aqtöbe-Normalzeit",
  							daylight: "Aqtöbe-Sommerzeit"
  						}
  					},
  					Arabian: {
  						long: {
  							generic: "Arabische Zeit",
  							standard: "Arabische Normalzeit",
  							daylight: "Arabische Sommerzeit"
  						}
  					},
  					Argentina: {
  						long: {
  							generic: "Argentinische Zeit",
  							standard: "Argentinische Normalzeit",
  							daylight: "Argentinische Sommerzeit"
  						}
  					},
  					Argentina_Western: {
  						long: {
  							generic: "Westargentinische Zeit",
  							standard: "Westargentinische Normalzeit",
  							daylight: "Westargentinische Sommerzeit"
  						}
  					},
  					Armenia: {
  						long: {
  							generic: "Armenische Zeit",
  							standard: "Armenische Normalzeit",
  							daylight: "Armenische Sommerzeit"
  						}
  					},
  					Atlantic: {
  						long: {
  							generic: "Atlantik-Zeit",
  							standard: "Atlantik-Normalzeit",
  							daylight: "Atlantik-Sommerzeit"
  						}
  					},
  					Australia_Central: {
  						long: {
  							generic: "Zentralaustralische Zeit",
  							standard: "Zentralaustralische Normalzeit",
  							daylight: "Zentralaustralische Sommerzeit"
  						}
  					},
  					Australia_CentralWestern: {
  						long: {
  							generic: "Zentral-/Westaustralische Zeit",
  							standard: "Zentral-/Westaustralische Normalzeit",
  							daylight: "Zentral-/Westaustralische Sommerzeit"
  						}
  					},
  					Australia_Eastern: {
  						long: {
  							generic: "Ostaustralische Zeit",
  							standard: "Ostaustralische Normalzeit",
  							daylight: "Ostaustralische Sommerzeit"
  						}
  					},
  					Australia_Western: {
  						long: {
  							generic: "Westaustralische Zeit",
  							standard: "Westaustralische Normalzeit",
  							daylight: "Westaustralische Sommerzeit"
  						}
  					},
  					Azerbaijan: {
  						long: {
  							generic: "Aserbaidschanische Zeit",
  							standard: "Aserbeidschanische Normalzeit",
  							daylight: "Aserbaidschanische Sommerzeit"
  						}
  					},
  					Azores: {
  						long: {
  							generic: "Azoren-Zeit",
  							standard: "Azoren-Normalzeit",
  							daylight: "Azoren-Sommerzeit"
  						}
  					},
  					Bangladesh: {
  						long: {
  							generic: "Bangladesch-Zeit",
  							standard: "Bangladesch-Normalzeit",
  							daylight: "Bangladesch-Sommerzeit"
  						}
  					},
  					Bhutan: {
  						long: {
  							standard: "Bhutan-Zeit"
  						}
  					},
  					Bolivia: {
  						long: {
  							standard: "Bolivianische Zeit"
  						}
  					},
  					Brasilia: {
  						long: {
  							generic: "Brasília-Zeit",
  							standard: "Brasília-Normalzeit",
  							daylight: "Brasília-Sommerzeit"
  						}
  					},
  					Brunei: {
  						long: {
  							standard: "Brunei-Darussalam-Zeit"
  						}
  					},
  					Cape_Verde: {
  						long: {
  							generic: "Cabo-Verde-Zeit",
  							standard: "Cabo-Verde-Normalzeit",
  							daylight: "Cabo-Verde-Sommerzeit"
  						}
  					},
  					Casey: {
  						long: {
  							standard: "Casey-Zeit"
  						}
  					},
  					Chamorro: {
  						long: {
  							standard: "Chamorro-Zeit"
  						}
  					},
  					Chatham: {
  						long: {
  							generic: "Chatham-Zeit",
  							standard: "Chatham-Normalzeit",
  							daylight: "Chatham-Sommerzeit"
  						}
  					},
  					Chile: {
  						long: {
  							generic: "Chilenische Zeit",
  							standard: "Chilenische Normalzeit",
  							daylight: "Chilenische Sommerzeit"
  						}
  					},
  					China: {
  						long: {
  							generic: "Chinesische Zeit",
  							standard: "Chinesische Normalzeit",
  							daylight: "Chinesische Sommerzeit"
  						}
  					},
  					Choibalsan: {
  						long: {
  							generic: "Tschoibalsan-Zeit",
  							standard: "Tschoibalsan-Normalzeit",
  							daylight: "Tschoibalsan-Sommerzeit"
  						}
  					},
  					Christmas: {
  						long: {
  							standard: "Weihnachtsinsel-Zeit"
  						}
  					},
  					Cocos: {
  						long: {
  							standard: "Kokosinseln-Zeit"
  						}
  					},
  					Colombia: {
  						long: {
  							generic: "Kolumbianische Zeit",
  							standard: "Kolumbianische Normalzeit",
  							daylight: "Kolumbianische Sommerzeit"
  						}
  					},
  					Cook: {
  						long: {
  							generic: "Cookinseln-Zeit",
  							standard: "Cookinseln-Normalzeit",
  							daylight: "Cookinseln-Sommerzeit"
  						}
  					},
  					Cuba: {
  						long: {
  							generic: "Kubanische Zeit",
  							standard: "Kubanische Normalzeit",
  							daylight: "Kubanische Sommerzeit"
  						}
  					},
  					Davis: {
  						long: {
  							standard: "Davis-Zeit"
  						}
  					},
  					DumontDUrville: {
  						long: {
  							standard: "Dumont-d’Urville-Zeit"
  						}
  					},
  					East_Timor: {
  						long: {
  							standard: "Osttimor-Zeit"
  						}
  					},
  					Easter: {
  						long: {
  							generic: "Osterinsel-Zeit",
  							standard: "Osterinsel-Normalzeit",
  							daylight: "Osterinsel-Sommerzeit"
  						}
  					},
  					Ecuador: {
  						long: {
  							standard: "Ecuadorianische Zeit"
  						}
  					},
  					Europe_Central: {
  						long: {
  							generic: "Mitteleuropäische Zeit",
  							standard: "Mitteleuropäische Normalzeit",
  							daylight: "Mitteleuropäische Sommerzeit"
  						},
  						short: {
  							generic: "MEZ",
  							standard: "MEZ",
  							daylight: "MESZ"
  						}
  					},
  					Europe_Eastern: {
  						long: {
  							generic: "Osteuropäische Zeit",
  							standard: "Osteuropäische Normalzeit",
  							daylight: "Osteuropäische Sommerzeit"
  						},
  						short: {
  							generic: "OEZ",
  							standard: "OEZ",
  							daylight: "OESZ"
  						}
  					},
  					Europe_Further_Eastern: {
  						long: {
  							standard: "Kaliningrader Zeit"
  						}
  					},
  					Europe_Western: {
  						long: {
  							generic: "Westeuropäische Zeit",
  							standard: "Westeuropäische Normalzeit",
  							daylight: "Westeuropäische Sommerzeit"
  						},
  						short: {
  							generic: "WEZ",
  							standard: "WEZ",
  							daylight: "WESZ"
  						}
  					},
  					Falkland: {
  						long: {
  							generic: "Falklandinseln-Zeit",
  							standard: "Falklandinseln-Normalzeit",
  							daylight: "Falklandinseln-Sommerzeit"
  						}
  					},
  					Fiji: {
  						long: {
  							generic: "Fidschi-Zeit",
  							standard: "Fidschi-Normalzeit",
  							daylight: "Fidschi-Sommerzeit"
  						}
  					},
  					French_Guiana: {
  						long: {
  							standard: "Französisch-Guayana-Zeit"
  						}
  					},
  					French_Southern: {
  						long: {
  							standard: "Französische Süd- und Antarktisgebiete-Zeit"
  						}
  					},
  					Galapagos: {
  						long: {
  							standard: "Galapagos-Zeit"
  						}
  					},
  					Gambier: {
  						long: {
  							standard: "Gambier-Zeit"
  						}
  					},
  					Georgia: {
  						long: {
  							generic: "Georgische Zeit",
  							standard: "Georgische Normalzeit",
  							daylight: "Georgische Sommerzeit"
  						}
  					},
  					Gilbert_Islands: {
  						long: {
  							standard: "Gilbert-Inseln-Zeit"
  						}
  					},
  					GMT: {
  						long: {
  							standard: "Mittlere Greenwich-Zeit"
  						}
  					},
  					Greenland_Eastern: {
  						long: {
  							generic: "Ostgrönland-Zeit",
  							standard: "Ostgrönland-Normalzeit",
  							daylight: "Ostgrönland-Sommerzeit"
  						}
  					},
  					Greenland_Western: {
  						long: {
  							generic: "Westgrönland-Zeit",
  							standard: "Westgrönland-Normalzeit",
  							daylight: "Westgrönland-Sommerzeit"
  						}
  					},
  					Guam: {
  						long: {
  							standard: "Guam-Zeit"
  						}
  					},
  					Gulf: {
  						long: {
  							standard: "Golf-Zeit"
  						}
  					},
  					Guyana: {
  						long: {
  							standard: "Guyana-Zeit"
  						}
  					},
  					Hawaii_Aleutian: {
  						long: {
  							generic: "Hawaii-Aleuten-Zeit",
  							standard: "Hawaii-Aleuten-Normalzeit",
  							daylight: "Hawaii-Aleuten-Sommerzeit"
  						}
  					},
  					Hong_Kong: {
  						long: {
  							generic: "Hongkong-Zeit",
  							standard: "Hongkong-Normalzeit",
  							daylight: "Hongkong-Sommerzeit"
  						}
  					},
  					Hovd: {
  						long: {
  							generic: "Chowd-Zeit",
  							standard: "Chowd-Normalzeit",
  							daylight: "Chowd-Sommerzeit"
  						}
  					},
  					India: {
  						long: {
  							standard: "Indische Zeit"
  						}
  					},
  					Indian_Ocean: {
  						long: {
  							standard: "Indischer Ozean-Zeit"
  						}
  					},
  					Indochina: {
  						long: {
  							standard: "Indochina-Zeit"
  						}
  					},
  					Indonesia_Central: {
  						long: {
  							standard: "Zentralindonesische Zeit"
  						}
  					},
  					Indonesia_Eastern: {
  						long: {
  							standard: "Ostindonesische Zeit"
  						}
  					},
  					Indonesia_Western: {
  						long: {
  							standard: "Westindonesische Zeit"
  						}
  					},
  					Iran: {
  						long: {
  							generic: "Iranische Zeit",
  							standard: "Iranische Normalzeit",
  							daylight: "Iranische Sommerzeit"
  						}
  					},
  					Irkutsk: {
  						long: {
  							generic: "Irkutsk-Zeit",
  							standard: "Irkutsk-Normalzeit",
  							daylight: "Irkutsk-Sommerzeit"
  						}
  					},
  					Israel: {
  						long: {
  							generic: "Israelische Zeit",
  							standard: "Israelische Normalzeit",
  							daylight: "Israelische Sommerzeit"
  						}
  					},
  					Japan: {
  						long: {
  							generic: "Japanische Zeit",
  							standard: "Japanische Normalzeit",
  							daylight: "Japanische Sommerzeit"
  						}
  					},
  					Kamchatka: {
  						long: {
  							generic: "Kamtschatka-Zeit",
  							standard: "Kamtschatka-Normalzeit",
  							daylight: "Kamtschatka-Sommerzeit"
  						}
  					},
  					Kazakhstan_Eastern: {
  						long: {
  							standard: "Ostkasachische Zeit"
  						}
  					},
  					Kazakhstan_Western: {
  						long: {
  							standard: "Westkasachische Zeit"
  						}
  					},
  					Korea: {
  						long: {
  							generic: "Koreanische Zeit",
  							standard: "Koreanische Normalzeit",
  							daylight: "Koreanische Sommerzeit"
  						}
  					},
  					Kosrae: {
  						long: {
  							standard: "Kosrae-Zeit"
  						}
  					},
  					Krasnoyarsk: {
  						long: {
  							generic: "Krasnojarsk-Zeit",
  							standard: "Krasnojarsk-Normalzeit",
  							daylight: "Krasnojarsk-Sommerzeit"
  						}
  					},
  					Kyrgystan: {
  						long: {
  							standard: "Kirgisistan-Zeit"
  						}
  					},
  					Lanka: {
  						long: {
  							standard: "Sri-Lanka-Zeit"
  						}
  					},
  					Line_Islands: {
  						long: {
  							standard: "Linieninseln-Zeit"
  						}
  					},
  					Lord_Howe: {
  						long: {
  							generic: "Lord-Howe-Zeit",
  							standard: "Lord-Howe-Normalzeit",
  							daylight: "Lord-Howe-Sommerzeit"
  						}
  					},
  					Macau: {
  						long: {
  							generic: "Macau-Zeit",
  							standard: "Macau-Normalzeit",
  							daylight: "Macau-Sommerzeit"
  						}
  					},
  					Macquarie: {
  						long: {
  							standard: "Macquarieinsel-Zeit"
  						}
  					},
  					Magadan: {
  						long: {
  							generic: "Magadan-Zeit",
  							standard: "Magadan-Normalzeit",
  							daylight: "Magadan-Sommerzeit"
  						}
  					},
  					Malaysia: {
  						long: {
  							standard: "Malaysische Zeit"
  						}
  					},
  					Maldives: {
  						long: {
  							standard: "Malediven-Zeit"
  						}
  					},
  					Marquesas: {
  						long: {
  							standard: "Marquesas-Zeit"
  						}
  					},
  					Marshall_Islands: {
  						long: {
  							standard: "Marshallinseln-Zeit"
  						}
  					},
  					Mauritius: {
  						long: {
  							generic: "Mauritius-Zeit",
  							standard: "Mauritius-Normalzeit",
  							daylight: "Mauritius-Sommerzeit"
  						}
  					},
  					Mawson: {
  						long: {
  							standard: "Mawson-Zeit"
  						}
  					},
  					Mexico_Northwest: {
  						long: {
  							generic: "Mexiko Nordwestliche Zone-Zeit",
  							standard: "Mexiko Nordwestliche Zone-Normalzeit",
  							daylight: "Mexiko Nordwestliche Zone-Sommerzeit"
  						}
  					},
  					Mexico_Pacific: {
  						long: {
  							generic: "Mexiko Pazifikzone-Zeit",
  							standard: "Mexiko Pazifikzone-Normalzeit",
  							daylight: "Mexiko Pazifikzone-Sommerzeit"
  						}
  					},
  					Mongolia: {
  						long: {
  							generic: "Ulaanbaatar-Zeit",
  							standard: "Ulaanbaatar-Normalzeit",
  							daylight: "Ulaanbaatar-Sommerzeit"
  						}
  					},
  					Moscow: {
  						long: {
  							generic: "Moskauer Zeit",
  							standard: "Moskauer Normalzeit",
  							daylight: "Moskauer Sommerzeit"
  						}
  					},
  					Myanmar: {
  						long: {
  							standard: "Myanmar-Zeit"
  						}
  					},
  					Nauru: {
  						long: {
  							standard: "Nauru-Zeit"
  						}
  					},
  					Nepal: {
  						long: {
  							standard: "Nepalesische Zeit"
  						}
  					},
  					New_Caledonia: {
  						long: {
  							generic: "Neukaledonische Zeit",
  							standard: "Neukaledonische Normalzeit",
  							daylight: "Neukaledonische Sommerzeit"
  						}
  					},
  					New_Zealand: {
  						long: {
  							generic: "Neuseeland-Zeit",
  							standard: "Neuseeland-Normalzeit",
  							daylight: "Neuseeland-Sommerzeit"
  						}
  					},
  					Newfoundland: {
  						long: {
  							generic: "Neufundland-Zeit",
  							standard: "Neufundland-Normalzeit",
  							daylight: "Neufundland-Sommerzeit"
  						}
  					},
  					Niue: {
  						long: {
  							standard: "Niue-Zeit"
  						}
  					},
  					Norfolk: {
  						long: {
  							standard: "Norfolkinsel-Zeit"
  						}
  					},
  					Noronha: {
  						long: {
  							generic: "Fernando de Noronha-Zeit",
  							standard: "Fernando de Noronha-Normalzeit",
  							daylight: "Fernando de Noronha-Sommerzeit"
  						}
  					},
  					North_Mariana: {
  						long: {
  							standard: "Nördliche-Marianen-Zeit"
  						}
  					},
  					Novosibirsk: {
  						long: {
  							generic: "Nowosibirsk-Zeit",
  							standard: "Nowosibirsk-Normalzeit",
  							daylight: "Nowosibirsk-Sommerzeit"
  						}
  					},
  					Omsk: {
  						long: {
  							generic: "Omsk-Zeit",
  							standard: "Omsk-Normalzeit",
  							daylight: "Omsk-Sommerzeit"
  						}
  					},
  					Pakistan: {
  						long: {
  							generic: "Pakistanische Zeit",
  							standard: "Pakistanische Normalzeit",
  							daylight: "Pakistanische Sommerzeit"
  						}
  					},
  					Palau: {
  						long: {
  							standard: "Palau-Zeit"
  						}
  					},
  					Papua_New_Guinea: {
  						long: {
  							standard: "Papua-Neuguinea-Zeit"
  						}
  					},
  					Paraguay: {
  						long: {
  							generic: "Paraguayanische Zeit",
  							standard: "Paraguayanische Normalzeit",
  							daylight: "Paraguayanische Sommerzeit"
  						}
  					},
  					Peru: {
  						long: {
  							generic: "Peruanische Zeit",
  							standard: "Peruanische Normalzeit",
  							daylight: "Peruanische Sommerzeit"
  						}
  					},
  					Philippines: {
  						long: {
  							generic: "Philippinische Zeit",
  							standard: "Philippinische Normalzeit",
  							daylight: "Philippinische Sommerzeit"
  						}
  					},
  					Phoenix_Islands: {
  						long: {
  							standard: "Phoenixinseln-Zeit"
  						}
  					},
  					Pierre_Miquelon: {
  						long: {
  							generic: "St.-Pierre-und-Miquelon-Zeit",
  							standard: "St.-Pierre-und-Miquelon-Normalzeit",
  							daylight: "St.-Pierre-und-Miquelon-Sommerzeit"
  						}
  					},
  					Pitcairn: {
  						long: {
  							standard: "Pitcairninseln-Zeit"
  						}
  					},
  					Ponape: {
  						long: {
  							standard: "Ponape-Zeit"
  						}
  					},
  					Pyongyang: {
  						long: {
  							standard: "Pjöngjang-Zeit"
  						}
  					},
  					Qyzylorda: {
  						long: {
  							generic: "Quysylorda-Zeit",
  							standard: "Quysylorda-Normalzeit",
  							daylight: "Qysylorda-Sommerzeit"
  						}
  					},
  					Reunion: {
  						long: {
  							standard: "Réunion-Zeit"
  						}
  					},
  					Rothera: {
  						long: {
  							standard: "Rothera-Zeit"
  						}
  					},
  					Sakhalin: {
  						long: {
  							generic: "Sachalin-Zeit",
  							standard: "Sachalin-Normalzeit",
  							daylight: "Sachalin-Sommerzeit"
  						}
  					},
  					Samara: {
  						long: {
  							generic: "Samara-Zeit",
  							standard: "Samara-Normalzeit",
  							daylight: "Samara-Sommerzeit"
  						}
  					},
  					Samoa: {
  						long: {
  							generic: "Samoa-Zeit",
  							standard: "Samoa-Normalzeit",
  							daylight: "Samoa-Sommerzeit"
  						}
  					},
  					Seychelles: {
  						long: {
  							standard: "Seychellen-Zeit"
  						}
  					},
  					Singapore: {
  						long: {
  							standard: "Singapur-Zeit"
  						}
  					},
  					Solomon: {
  						long: {
  							standard: "Salomonen-Zeit"
  						}
  					},
  					South_Georgia: {
  						long: {
  							standard: "Südgeorgische Zeit"
  						}
  					},
  					Suriname: {
  						long: {
  							standard: "Suriname-Zeit"
  						}
  					},
  					Syowa: {
  						long: {
  							standard: "Syowa-Zeit"
  						}
  					},
  					Tahiti: {
  						long: {
  							standard: "Tahiti-Zeit"
  						}
  					},
  					Taipei: {
  						long: {
  							generic: "Taipeh-Zeit",
  							standard: "Taipeh-Normalzeit",
  							daylight: "Taipeh-Sommerzeit"
  						}
  					},
  					Tajikistan: {
  						long: {
  							standard: "Tadschikistan-Zeit"
  						}
  					},
  					Tokelau: {
  						long: {
  							standard: "Tokelau-Zeit"
  						}
  					},
  					Tonga: {
  						long: {
  							generic: "Tonganische Zeit",
  							standard: "Tonganische Normalzeit",
  							daylight: "Tonganische Sommerzeit"
  						}
  					},
  					Truk: {
  						long: {
  							standard: "Chuuk-Zeit"
  						}
  					},
  					Turkmenistan: {
  						long: {
  							generic: "Turkmenistan-Zeit",
  							standard: "Turkmenistan-Normalzeit",
  							daylight: "Turkmenistan-Sommerzeit"
  						}
  					},
  					Tuvalu: {
  						long: {
  							standard: "Tuvalu-Zeit"
  						}
  					},
  					Uruguay: {
  						long: {
  							generic: "Uruguayanische Zeit",
  							standard: "Uruguyanische Normalzeit",
  							daylight: "Uruguayanische Sommerzeit"
  						}
  					},
  					Uzbekistan: {
  						long: {
  							generic: "Usbekistan-Zeit",
  							standard: "Usbekistan-Normalzeit",
  							daylight: "Usbekistan-Sommerzeit"
  						}
  					},
  					Vanuatu: {
  						long: {
  							generic: "Vanuatu-Zeit",
  							standard: "Vanuatu-Normalzeit",
  							daylight: "Vanuatu-Sommerzeit"
  						}
  					},
  					Venezuela: {
  						long: {
  							standard: "Venezuela-Zeit"
  						}
  					},
  					Vladivostok: {
  						long: {
  							generic: "Wladiwostok-Zeit",
  							standard: "Wladiwostok-Normalzeit",
  							daylight: "Wladiwostok-Sommerzeit"
  						}
  					},
  					Volgograd: {
  						long: {
  							generic: "Wolgograd-Zeit",
  							standard: "Wolgograd-Normalzeit",
  							daylight: "Wolgograd-Sommerzeit"
  						}
  					},
  					Vostok: {
  						long: {
  							standard: "Wostok-Zeit"
  						}
  					},
  					Wake: {
  						long: {
  							standard: "Wake-Insel-Zeit"
  						}
  					},
  					Wallis: {
  						long: {
  							standard: "Wallis-und-Futuna-Zeit"
  						}
  					},
  					Yakutsk: {
  						long: {
  							generic: "Jakutsk-Zeit",
  							standard: "Jakutsk-Normalzeit",
  							daylight: "Jakutsk-Sommerzeit"
  						}
  					},
  					Yekaterinburg: {
  						long: {
  							generic: "Jekaterinburg-Zeit",
  							standard: "Jekaterinburg-Normalzeit",
  							daylight: "Jekaterinburg-Sommerzeit"
  						}
  					}
  				}
  			}
  		}
  	}
  };
  var de_tzn = {
  	main: main
  };

  locale.registerLocaleData('main/de/ca-gregorian.json', de_cg);
  locale.registerLocaleData('main/de/timeZoneNames.json', de_tzn);

}));
//# sourceMappingURL=index.js.map
