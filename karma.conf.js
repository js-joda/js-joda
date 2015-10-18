module.exports = function(config) {
  config.set({
    files: [
        {pattern: 'test/*.js'},
        {pattern: 'test/**/*.js'}
    ],
    frameworks: [
        'mocha',
        'chai'
    ],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: require("./webpack.config.js"),
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    browsers: ['Chrome', 'Firefox'],
    plugins: [ "karma-*" ]
  })
};
