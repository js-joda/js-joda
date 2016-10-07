module.exports = function(config) {
    config.set({
        files: [
            {pattern: 'test/*Test.js'},
            {pattern: 'test/**/*Test.js'},
        ],
        exclude: [
            'test/plugTest.js'
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        preprocessors: {
            'test/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        plugins: ['karma-*']
    });
};
