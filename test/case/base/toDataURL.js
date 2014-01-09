;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  var chai, expect, sinon;
  if (this.chai) {
    chai = this.chai;
    expect = this.expect;
  } else {
    chai = require('chai');
    expect = chai.expect;
  }
  sinon = this.sinon || require('sinon');
  module.exports = function (toDataURL, isPhantomJS) {
    var resultFile = require('./result');
    describe('toDataURL', function () {
      describe('base', function () {
        it('should be a function', function () {
          expect(toDataURL).to.be.a('function');
        });
      });
      describe('use case', function () {
        var $img, img;
        var result = resultFile[isPhantomJS ? 'phantomjs' : 'chrome'];
        var test = function (title, input, output) {
          it(title, function () {
            if (typeof output === 'string') {
              expect(input()).to.be.equal(output);
            } else {
              expect(input()).to.be.match(output);
            }
          });
        };
        before(function () {
          $img = $('<img src="./imgs/github.png" />').appendTo('body');
          img = $img.get(0);
        });
        after(function () {
          $img.remove();
        });
        describe('toDataURL method', function () {
          describe('toDataURL(elem, width, height)', function () {
            test('origin work', function () {return toDataURL(img, 27, 48);}, result.origin);
            test('bigger work', function () {return toDataURL(img, 54, 96);}, result.bigger);
            test('smaller work', function () {return toDataURL(img, 9, 16);}, result.smaller);
          });
          describe('toDataURL(elem)', function () {
            test('work', function () {return toDataURL(img);}, result.origin);
          });
        });
        describe('toDataURL plugin for jQuery', function () {
          describe('$.fn.toDataURL(width, height)', function () {
            test('origin work', function () {return $img.toDataURL(27, 48);}, result.origin);
            test('bigger work', function () {return $img.toDataURL(54, 96);}, result.bigger);
            test('smaller work', function () {return $img.toDataURL(9, 16);}, result.smaller);
          });
          describe('$.fn.toDataURL()', function () {
            test('work', function () {return $img.toDataURL();}, result.origin);
          });
        });
      });
    });
  };
});
