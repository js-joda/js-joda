var _ = require('lodash');
var Benchmark = require('benchmark');
var moment = require('moment');
var LocalDateTime = require('js-joda').LocalDateTime;

var accessLoops = 50;

function testMomentParsePlus() {
	var m = moment('2016-02-26T09:29:08.678');
	var s = '';

	for(var i=0; i<accessLoops; i++){
		m.add(1, 'months');
		s += m.toISOString();
	}
}

function testJSJodaParsePlus() {
	var d = LocalDateTime.parse('2016-02-26T09:29:08.678');
	var s = '';

	for(var i=0; i<accessLoops; i++){
	        d = d.plusMonths(1);
	        s += d.toString();
	}
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
	.add('moment', testMomentParsePlus)
	.add('js-joda', testJSJodaParsePlus)
	.on('complete', logResult)
	.run();

