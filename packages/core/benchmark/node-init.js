/* eslint-disable no-console, no-undef */
//global.JSJoda = require('../dist/js-joda');
global.JSJoda = require('js-joda');
global.moment = require('moment');
global.Benchmark = require('benchmark');

// log it
global.log = function(msg){
    console.log(msg);
};

// run test
global.addSuite = function(suite){
    // add listeners
    suite.on('cycle', function(event) {
        log(String(event.target));
    })
    .on('start', function() {
        log('benchmark "' + suite.name + '" is running');
    })
    .on('complete', function() {
        log('Fastest is ' + this.filter('fastest').map('name'));
        log('benchmark "' + suite.name + '" done');
        log('');
    })
    .run();
};

