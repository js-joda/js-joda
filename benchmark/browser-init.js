// log it
function log(msg){
    console.log(msg);
    document.getElementById('result').textContent += msg + '\n';
}

var suites = [];
var running = false;
function next(suite){
    if(suite!=null){
        suites.push(suite);
    } else {
        running = false;
    }
    if(!running){
        var s = suites.shift();
        s.run({ 'async': true });
        running = true;
    }
}


function addSuite(suite){
    // add listeners
    suite.on('cycle', function(event) {
        log(String(event.target));
    })
    .on('start', function() {
        log('test "' + suite.name + '" is running');
    })
    .on('complete', function() {
        log('Fastest is ' + this.filter('fastest').map('name'));
        log('test "' + suite.name + '" done');
        log('');
        next();
    });

    next(suite);
}