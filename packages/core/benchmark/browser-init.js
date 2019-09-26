// log it
function log(msg){
    // eslint-disable-next-line no-console
    console.log(msg);
    document.getElementById('result').textContent += msg + '\n';
}

const suites = [];
let running = false;
function next(suite){
    if(suite!=null){
        suites.push(suite);
    } else {
        running = false;
    }
    if(!running){
        const s = suites.shift();
        if(s!=null) {
            s.run({'async': true});
            running = true;
        } else {
            log('all benchmarks done');
        }
    }
}

//eslint-disable-next-line no-unused-vars
function addSuite(suite){
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
        next();
    });

    next(suite);
}