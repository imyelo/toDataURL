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
        var resultPurify = resultFile[(isPhantomJS ? 'phantomjs' : 'chrome') + '_purify'];
        var test = function (title, input, output) {
          it(title, function () {
            if (typeof output === 'string') {
              expect(input()).to.be.equal(output);
            } else {
              expect(input()).to.be.match(output);
            }
          });
        };
        var testAsync = function (title, func, output) {
          it(title, function (done) {
            func(function (err, result) {
              if (err) {
                return done(err);
              }
              if (typeof output === 'string') {
                expect(result).to.be.equal(output);
              } else {
                expect(result).to.be.match(output);
              }
              done();
            });
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
          describe('sync', function () {
            describe('toDataURL(elem, {width: width, height: height, purify: true})', function () {
              test('origin work', function () {return toDataURL(img, {width: 27, height: 48, purify: true});}, resultPurify.origin);
              test('bigger work', function () {return toDataURL(img, {width: 54, height: 96, purify: true});}, resultPurify.bigger);
              test('smaller work', function () {return toDataURL(img, {width: 9, height: 16, purify: true});}, resultPurify.smaller);
            });
            describe('toDataURL(elem, {width: width, height: height})', function () {
              test('origin work', function () {return toDataURL(img, {width: 27, height: 48});}, result.origin);
              test('bigger work', function () {return toDataURL(img, {width: 54, height: 96});}, result.bigger);
              test('smaller work', function () {return toDataURL(img, {width: 9, height: 16});}, result.smaller);
            });
            describe('toDataURL(elem, {purify: true})', function () {
              test('work', function () {return toDataURL(img, {purify: true});}, resultPurify.origin);
            });
            describe('toDataURL(elem)', function () {
              test('work', function () {return toDataURL(img);}, result.origin);
            });
          });
          describe('async', function () {
            describe('toDataURL(elem, {width: width, height: height, purify: true, callback: callback})', function () {
              testAsync('origin work', function (cb) {toDataURL(img, {width: 27, height: 48, purify: true, callback: cb});}, resultPurify.origin);
              testAsync('bigger work', function (cb) {toDataURL(img, {width: 54, height: 96, purify: true, callback: cb});}, resultPurify.bigger);
              testAsync('smaller work', function (cb) {toDataURL(img, {width: 9, height: 16, purify: true, callback: cb});}, resultPurify.smaller);
            });
            describe('toDataURL(elem, {width: width, height: height, callback: callback})', function () {
              testAsync('origin work', function (cb) {toDataURL(img, {width: 27, height: 48, callback: cb});}, result.origin);
              testAsync('bigger work', function (cb) {toDataURL(img, {width: 54, height: 96, callback: cb});}, result.bigger);
              testAsync('smaller work', function (cb) {toDataURL(img, {width: 9, height: 16, callback: cb});}, result.smaller);
            });
            describe('toDataURL(elem, {purify: true, callback: callback})', function () {
              testAsync('work', function (cb) {toDataURL(img, {purify: true, callback: cb});}, resultPurify.origin);
            });
            describe('toDataURL(elem, {callback: callback})', function () {
              testAsync('work', function (cb) {toDataURL(img, {callback: cb});}, result.origin);
            });
          });
        });
        describe('toDataURL plugin for jQuery', function () {
          describe('$.fn.toDataURL({width: width, height: height})', function () {
            test('origin work', function () {return $img.toDataURL({width: 27, height: 48});}, result.origin);
            test('bigger work', function () {return $img.toDataURL({width: 54, height: 96});}, result.bigger);
            test('smaller work', function () {return $img.toDataURL({width: 9, height: 16});}, result.smaller);
          });
          describe('$.fn.toDataURL({purify: true})', function () {
            test('origin work', function () {return $img.toDataURL({purify: true});}, resultPurify.origin);
          });
          describe('$.fn.toDataURL({callback: callback})', function () {
            testAsync('origin work', function (cb) {$img.toDataURL({callback: cb});}, result.origin);
          });
          describe('$.fn.toDataURL()', function () {
            test('work', function () {return $img.toDataURL();}, result.origin);
          });
        });
      });
    });
  };
});
