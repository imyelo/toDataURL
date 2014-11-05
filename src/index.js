
function clean () {
  var i, len;
  var args = [].slice.call(arguments, 0);
  for (i = 0, len = args.length; i < len; i++) {
    args[i] = null;
  }
}

function once (func) {
  var ran, result;
  return function() {
    if (ran) {
      return result;
    }
    ran = true;
    result = func.apply(this, arguments);
    func = null;
    return result;
  };
}

function cors (img) {
  img.crossOrigin = 'anonymous';
}

function isImage (value) {
  return value && (value.nodeName || '').toLowerCase() === 'img' || false;
}

function createImage (src, callback) {
  var img = new Image();
  var cb = once(callback);
  img.onload = function () {
    return cb(null, img);
  };
  img.onerror = function () {
    return cb(new Error('fail to load image file'));
  };
  cors(img);
  img.src = src;
  if (img.complete) {
    return cb(null, img);
  }
}

function convert (elem, width, height) {
  var canvas, context, result;
  width = width || elem.width;
  height = height || elem.height;
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  context.drawImage(elem, 0, 0, width, height);
  result = canvas.toDataURL();
  clean(canvas, context);
  return result;
}

function purify (str) {
  return str.replace(/^data:image\/(png|jpg);base64,/, '');
}

/**
 * toDataURL
 * @param  {Image|String} image
 * @param  {Object} options
 * @return {null|String}
 *
 * Options:
 *   
 *   - `width` {Number=0}
 *   - `height` {Number=0}
 *   - `purify` {Boolean=false}
 *   - `callback` {Function}
 *
 * Callback:
 *
 *   - `err`
 *   - `data`
 * 
 */
function toDataURL (image, options) {
  var src = '';
  var async, callback;

  options = options || {};

  async = typeof options.callback === 'function';

  callback = async ? options.callback : function (err, data) {
    if (err) {
      throw err;
    }
    return data;
  };

  function _convert (err, img) {
    if (err) {
      return callback(err);
    }
    var result;
    cors(img);
    result = convert(img, options.width, options.height);
    return callback(null, (options.purify ? purify(result) : result));
  }

  if (isImage(image)) {
    src = image.src || '';
  } else if (typeof image === 'string') {
    if (!async) {
      return callback(new Error('the url mode should be called with a callback'));
    }
    src = image;
  } else {
    return callback(new Error('image should be an Image Object or a string'));
  }

  return async ? createImage(src, _convert) : _convert(null, image);
}

if (typeof jQuery !== 'undefined') {
  (function ($) {
    $.fn.extend({
      toDataURL: function (options) {
        var elem = this[0];
        if (elem) {
          return toDataURL(elem, options);
        }
      }
    });
  })(jQuery);
}

module.exports = toDataURL;
