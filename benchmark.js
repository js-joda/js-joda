var _ = require('lodash');
var Benchmark = require('benchmark');
var moment = require('moment');
var JSJoda = require('js-joda');

// require('./freezeit');

var LocalDateTime = JSJoda.LocalDateTime;
var LocalDate = JSJoda.LocalDate;


function testMomentParseDateTime() {
	return moment('2016-02-26T09:29:08.678');
}

function testJSJodaParseDateTime() {
	return LocalDateTime.parse('2016-02-26T09:29:08.678');
}

function testMomentParseDate() {
	return moment('2016-02-26');
}

function testJSJodaParseDate() {
	return LocalDate.parse('2016-02-26');
}

var m = moment('2016-02-26T09:29:08');
function testMomentPlus() {
    m = m.add(30, 'days').add(30, 'hours');
    return m;
}

var d = LocalDateTime.parse('2016-02-26T09:29:08');
function testJSJodaPlus() {
    d = d.plusDays(30).plusHours(30);
    return d;
}

function logResult(){
    var resultStr = 'Fastest is ' + this.filter('fastest').map('name') + '\n';
    this.filter('successful').forEach(function (value) {
        resultStr += 'Result for ' + value.name + '\n';
        resultStr += JSON.stringify(_.pick(value, ['name', 'hz', 'count']), null, 4) + '\n';
    });
    console.log(resultStr)
}

function logFullResult(){
    console.log(JSON.stringify(this, null, 4));
}

var suite = new Benchmark.Suite();
suite
	.add('testMomentParseDateTime', testMomentParseDateTime)
	.add('testJSJodaParseDateTime', testJSJodaParseDateTime)
	.add('testMomentParseDate', testMomentParseDate)
	.add('testJSJodaParseDate', testJSJodaParseDate)
	.add('testMomentPlus', testMomentPlus)
	.add('testJSJodaPlus', testJSJodaPlus)
	.on('complete', logResult)
	.run();

//console.log(testMomentParseDateTime().toString());
//console.log(testJSJodaParseDateTime().toString());
//console.log(testMomentParseDate().toString());
//console.log(testJSJodaParseDate().toString());
//console.log(testMomentPlus().toString());
//console.log(testJSJodaPlus().toString());
