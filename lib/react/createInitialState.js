'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInitialState;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createInitialState(_ref) {
  var React = _ref.React;

  var deps = _objectWithoutProperties(_ref, ['React']);

  var PropTypes = React.PropTypes;

  var InitialState = function InitialState(_ref2) {
    var serialize = _ref2.serialize;
    var _ref2$stateKey = _ref2.stateKey;
    var stateKey = _ref2$stateKey === undefined ? '__initialState__' : _ref2$stateKey;
    var globalKey = _ref2.globalKey;
    var state = _ref2.state;

    var serialized = serialize(state, deps);
    var baseKey = globalKey ? 'window.' + globalKey + '=window.' + globalKey + ' || {};window.' + globalKey : 'window';
    var __html = baseKey + '.' + stateKey + '=' + serialized;
    return React.createElement('script', { dangerouslySetInnerHTML: { __html: __html } });
  };
  InitialState.propTypes = { serialize: PropTypes.func.isRequired };
  return InitialState;
}