'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserialize = exports.serialize = exports.fromHydrant = exports.toHydrant = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

require('babel-polyfill');

var _chai = require('chai');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NO_RECURSE = ['undefined', 'boolean', 'number', 'string', 'symbol', 'function'];
var shouldRecurse = function shouldRecurse(obj) {
  return obj !== null && !NO_RECURSE.includes(typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) && !Array.isArray(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

var toHydrant = exports.toHydrant = function toHydrant(obj) {
  if (_immutable.Iterable.isIterable(obj)) {
    var __fire = ['(function (o, d) { return d.Immutable.fromJS(o); })', obj.toJS()];
    return { __fire: __fire };
  }
  if (Array.isArray(obj)) {
    return obj.map(function (x) {
      return shouldRecurse(x) ? toHydrant(x) : x;
    });
  }
  var objKeys = Object.keys(obj);
  if (objKeys.length > 0) {
    return objKeys.reduce(function (newObj, key) {
      var node = shouldRecurse(obj[key]) ? toHydrant(obj[key]) : obj[key];
      return _extends({}, newObj, _defineProperty({}, key, node));
    }, {});
  }
  return obj;
};

var fromHydrant = exports.fromHydrant = function fromHydrant(obj) {
  if (obj.__fire) {
    var fn = eval(obj.__fire[0]);
    return fn(obj.__fire[1], { Immutable: _immutable2.default });
  }
  if (Array.isArray(obj)) return obj.map(function (x) {
    return shouldRecurse(x) ? fromHydrant(x) : x;
  });
  var objKeys = Object.keys(obj);
  if (objKeys.length > 0) {
    return objKeys.reduce(function (newObj, key) {
      var node = shouldRecurse(obj[key]) ? fromHydrant(obj[key]) : obj[key];
      return _extends({}, newObj, _defineProperty({}, key, node));
    }, {});
  }
  return obj;
};

var serialize = exports.serialize = function serialize(obj) {
  return (0, _serializeJavascript2.default)(toHydrant(obj));
};

var deserialize = exports.deserialize = function deserialize(str) {
  var obj = JSON.parse(str);
  return fromHydrant(obj);
};