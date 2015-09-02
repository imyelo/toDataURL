toDataURL
=========
[![npm version](https://badge.fury.io/js/to-data-url.svg)](http://badge.fury.io/js/to-data-url)
[![Build Status](https://travis-ci.org/imyelo/toDataURL.png?branch=master)](https://travis-ci.org/imyelo/toDataURL)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Codeship](https://www.codeship.io/projects/6fdea9f0-5b0b-0131-17de-32bbd7e9b736/status)](https://www.codeship.io/projects/11860)

url or &lt;img> element to DataURL

## Install
```
npm install --save to-data-url
```


# Usage
```javascript
define(['toDataURL'], function (toDataURL) {
    var element = document.getElementByTagName('img')[0];
    var src = 'https://avatars0.githubusercontent.com/u/7076521?v=2&s=84';

    /* you can get the dataUrl from an element (not a url) synchronously, */
    console.log(toDataURL(element));
    // > data:image/png;base64,iVBORw0KGgo...

    /* but that sync method may cause some issues, so you can also make it by an async way. */
    toDataURL(element, {
        callback: function (err, data) {
            if (!err) console.log(data);
            // > data:image/png;base64,iVBORw0KGgo...
        }
    });

    /* or get the dataUrl from a url asynchronously */
    toDataURL(src, {
        callback: function (err, data) {
            if (!err) console.log(data);
            // > data:image/png;base64,iVBORw0KGgo...
        }
    });

    /* and define the width and height */
    toDataURL(src, {
        width: 120,
        height: 120,
        callback: function (err, data) {
            if (!err) console.log(data);
            // > data:image/png;base64,iVBORw0KGgo...
        }
    });

    /* maybe you just want the base64 data */
    toDataURL(src, {
        purify: true,
        callback: function (err, data) {
            if (!err) console.log(data);
            // > iVBORw0KGgo...
        }
    });
});
```

## API
### toDataURL(image, options)
#### params
- `image` {Image|String}
- `options` {Object}

#### return
- `data` {null|String}

#### options
- `width` {Number=0}
- `height` {Number=0}
- `purify` {Boolean=false}
- `callback` {Function}

#### callback
- `err` {Error}
- `data` {String}

## Release History
- 0.1.0
    - support ``toDataURL(elem, [width], [height])``
- 1.0.0
    - support ``toDataURL(elem, {[callback], [width], [height], [purify]})``
    - support ``toDataURL(src, {callback, [width], [height], [purify]})``
    - deprecate ``toDataURL(elem, width, height)``
- 1.0.1
    - friendly expection message
    - add duojs compiler

## License
the MIT License


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/imyelo/todataurl/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
