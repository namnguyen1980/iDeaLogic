// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
  },
  // run multi-threaded
  /*
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--start-maximized']
    },
    shardTestFiles: true,
    maxInstances: 3,
  },
  */
  /*
  // run multi-threaded, multi-browser
  multiCapabilities: [
    {
        "browserName": "chrome",        
        shardTestFiles: true,
        maxInstances: 2,
        specs: ['student.crud.spec.js', 'student.list.spec.js', 'login.spec.js']
    },
    {
        "browserName": "firefox",
        "count": 1,
        specs: ['login.spec.js']
    },
],
*/
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 50000,
    print: function () { }
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};