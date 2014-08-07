'use strict';

var utils = {};

utils.compare = function (a, b) {
  return a - b;
}

utils.equals = function (a, b) {
  return a === b;
}

module.exports = utils;