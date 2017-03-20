# dedupe-string-plugin

[![Build Status](https://travis-ci.org/markis/dedupe-string-plugin.svg?branch=master)](https://travis-ci.org/markis/dedupe-string-plugin) [![Known Vulnerabilities](https://snyk.io/test/github/markis/dedupe-string-plugin/badge.svg)](https://snyk.io/test/github/markis/dedupe-string-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/markis/dedupe-string-plugin.svg)](https://greenkeeper.io/)

Dedupe-String-Plugin is a plugin for webpack that is optimized to work with gzip and remove duplicate strings that the gzip compression algorithm is not going to be able to dedupe.

##### Before strip-whitespace:
``` javascript
function thing() {
  React.createElement('div');
  // ... somewhere outside of the gzip sliding window (32KB)
  React.createElement('div');
}
```

##### After strip-whitespace:
``` javascript
function thing() {
  const e = 'div';
  React.createElement(e);
  // ... somewhere outside of the gzip sliding window (32KB
  React.createElement(e);
}
```

##### Webpack usage

Put this plugin before your minification plugins (ex. uglify-js)

``` javascript
var DedupeString = require('dedupe-string-plugin');

module.exports = {
  plugins: [
    new DedupeString()
  ]
};
```
