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
        before(function () {
          $img = $('<img src="./imgs/github.png" />').appendTo('body');
          img = $img.get(0);
        });
        after(function () {
          $img.remove();
        });
        describe('toDataURL method', function () {
          describe('toDataURL(elem, width, height)', function () {
            it('origin work', function () {
              expect(toDataURL(img, 27, 48)).to.be.equal(result.origin);
            });
            it('bigger work', function () {
              expect(toDataURL(img, 54, 96)).to.be.equal(result.bigger);
            });
            it('smaller work', function () {
              expect(toDataURL(img, 9, 16)).to.be.equal(result.smaller);
            });
          });
          describe('toDataURL(elem)', function () {
            it('work', function () {
              expect(toDataURL(img)).to.be.equal(result.origin);
            });
          });
        });
        describe('toDataURL plugin for jQuery', function () {
          describe('$.fn.toDataURL(width, height)', function () {
            it('origin work', function () {
              expect($img.toDataURL(27, 48)).to.be.equal(result.origin);
            });
            it('bigger work', function () {
              expect(toDataURL(img, 54, 96)).to.be.equal(result.bigger);
            });
            it('smaller work', function () {
              expect($img.toDataURL(9, 16)).to.be.equal(result.smaller);
            });
          });
          describe('$.fn.toDataURL()', function () {
            it('work', function () {
              expect($img.toDataURL()).to.be.equal(result.origin);
            });
          });
        });
      });
    });
  };
});
