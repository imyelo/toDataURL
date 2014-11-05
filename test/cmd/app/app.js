define(function (require, exports, module) {
  var toDataURL = require('../../../dest/index.js') || window.toDataURL;
  var isPhantomJS = !!window.navigator.userAgent.match(/PhantomJS/);
  require('./case/base/index')(toDataURL, isPhantomJS);


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});