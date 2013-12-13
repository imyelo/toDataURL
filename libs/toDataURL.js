;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function';

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('toDataURL', function (require, exports, module) {
  var toDataURL = function (elem, width, height) {
    var canvas, context, result;
    width = width || elem.width;
    height = height || elem.height;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(elem, 0, 0, width, height);
    result = canvas.toDataURL();
    canvas = null;
    context = null;
    return result;
  };

  if (typeof jQuery !== 'undefined') {
    (function ($) {
      $.fn.extend({
        toDataURL: function (width, height) {
          var elem = this[0];
          if (elem) {
            return toDataURL(elem, width, height);
          }
        }
      });
    })(jQuery);
  }

  return toDataURL;
});