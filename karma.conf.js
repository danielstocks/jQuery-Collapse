// Karma configuration
// Generated on Mon Oct 07 2013 10:25:42 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    preprocessors: {
      '**/*.coffee': ['coffee'],
      '**/src/*.js': ['coverage'],
    },

    // frameworks to use
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: ['vendor/*.js', 'src/*.js', 'test/*.coffee'],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'coverage', 'coveralls'],

    coverageReporter: {
      reporters: [
        // reporters not supporting the `file` property
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'},
      ],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
  });
};
