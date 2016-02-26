var _ = require('lodash');
var Benchmark = require('benchmark');
var moment = require('moment');
var LocalDateTime = require('js-joda').LocalDateTime;

var accessLoops = 50;


var testMomentParsePlus = () => {
	var m = moment('2016-02-26T09:29:08.678');
	var s = '';

	for(var i=0; i<accessLoops; i++){
		m.add(1, 'months');
		s += m.toISOString();
	};

	// console.log(s);
}


var testJSJodaParsePlus = () => {
	var d = LocalDateTime.parse('2016-02-26T09:29:08.678');
	var s = '';

	for(var i=0; i<accessLoops; i++){
	        d = d.plusMonths(1);
	        s += d.toString();
	};
	
	// console.log(s);
}

var suite = new Benchmark.Suite();
suite
	.add('moment', testMomentParsePlus)
	.add('js-joda', testJSJodaParsePlus)
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
		this.filter('successful').forEach((value) => {
			console.log('Result for ' + value.name);
			console.log(JSON.stringify(_.pick(value, ['name', 'hz', 'count']), null, 4));
		});
	})
	.run();

