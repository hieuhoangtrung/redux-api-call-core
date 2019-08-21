import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import dedupe from 'redux-api-call-adapter-dedupe';
import fetch from 'redux-api-call-adapter-fetch';
import json from 'redux-api-call-adapter-json';

var REDUCER_PATH = 'api_calls';
var ACTION_FETCH_START = '@@api/FETCH_START';
var ACTION_FETCH_COMPLETE = '@@api/FETCH_COMPLETE';
var ACTION_FETCH_FAILURE = '@@api/FETCH_FAILURE';
var ACTION_UPDATE_LOCAL = '@@api/UPDATE_LOCAL';
var ACTION_RESET_LOCAL = '@@api/RESET_LOCAL';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var makeStartErrorAction = function makeStartErrorAction(payload) {
  return {
    type: ACTION_FETCH_START,
    error: true,
    payload: payload
  };
};
var makeSuccessAction = function makeSuccessAction(api, _ref) {
  var payload = _ref.payload,
      meta = _ref.meta;
  return {
    type: ACTION_FETCH_COMPLETE,
    payload: _objectSpread({}, api, {
      json: payload,
      respondedAt: Date.now()
    }),
    meta: meta
  };
};
var makeFailureAction = function makeFailureAction(api, _ref2) {
  var payload = _ref2.payload,
      meta = _ref2.meta,
      statusCode = _ref2.statusCode;
  return {
    type: ACTION_FETCH_FAILURE,
    payload: _objectSpread({}, api, {
      json: payload,
      statusCode: statusCode,
      respondedAt: Date.now()
    }),
    meta: meta
  };
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reduceKeys = function reduceKeys(obj) {
  return function (reducer, seed) {
    return Object.keys(obj).reduce(function (acc, key) {
      return _objectSpread$1({}, acc, {}, reducer(obj, key));
    }, seed);
  };
};

var bindFunction = function bindFunction(getState) {
  return function (obj, key) {
    return _defineProperty({}, key, typeof obj[key] === 'function' ? obj[key](getState()) : obj[key]);
  };
};

var applyFunctions = (function (getState) {
  return function (api) {
    return reduceKeys(api)(bindFunction(getState), {});
  };
});

var compose = function compose() {
  for (var _len = arguments.length, adapters = new Array(_len), _key = 0; _key < _len; _key++) {
    adapters[_key] = arguments[_key];
  }

  if (adapters.length === 0) {
    throw new Error('redux-api-call: composeAdatpers must take at least one adapter');
  }

  var reversed = adapters.reverse();
  var head = reversed[0];
  var tail = reversed.slice(1);
  return function (getState) {
    return tail.reduce(function (acc, current) {
      return current(acc, getState);
    }, head(function (x) {
      return x;
    }, getState));
  };
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultAdapter = compose(json, dedupe, fetch);

function validate(request) {
  if (typeof request.name !== 'string') {
    return makeStartErrorAction(_objectSpread$2({}, request, {
      error: 'no api name is specified'
    }));
  }

  if (typeof request.endpoint !== 'string') {
    return makeStartErrorAction(_objectSpread$2({}, request, {
      error: 'no api endpoint is specified'
    }));
  }

  return false;
}

function tryRequest(_x, _x2) {
  return _tryRequest.apply(this, arguments);
}

function _tryRequest() {
  _tryRequest = _asyncToGenerator(

  _regeneratorRuntime.mark(function _callee2(request, adapter) {
    var response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return adapter(request);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", makeSuccessAction(request, response));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", makeFailureAction(request, _context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _tryRequest.apply(this, arguments);
}

function createAPIMiddleware(adapter) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    var finalAdapter = adapter(getState);
    var resolveState = applyFunctions(getState);
    return function (next) {
      return (

        function () {
          var _ref2 = _asyncToGenerator(

          _regeneratorRuntime.mark(function _callee(action) {
            var request, errorAction;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(action.type === ACTION_FETCH_START)) {
                      _context.next = 6;
                      break;
                    }

                    request = resolveState(action.payload);
                    errorAction = validate(request);

                    if (!errorAction) {
                      _context.next = 6;
                      break;
                    }

                    next(errorAction);
                    return _context.abrupt("return");

                  case 6:
                    if (request) {
                      next(_objectSpread$2({}, action, {
                        payload: request
                      }));
                    } else {
                      next(action);
                    }

                    if (!(action.type !== ACTION_FETCH_START)) {
                      _context.next = 9;
                      break;
                    }

                    return _context.abrupt("return");

                  case 9:
                    _context.t0 = dispatch;
                    _context.next = 12;
                    return tryRequest(request, finalAdapter);

                  case 12:
                    _context.t1 = _context.sent;
                    (0, _context.t0)(_context.t1);

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x3) {
            return _ref2.apply(this, arguments);
          };
        }()
      );
    };
  };
}

var middleware = createAPIMiddleware(defaultAdapter);

var get = (function (array, defaulValue) {
  return function (state) {
    var finalValue = array.reduce(function (value, nextProp) {
      if (typeof value === 'undefined' || value === null) {
        return;
      }

      return value[nextProp];
    }, state);

    if (typeof finalValue === 'undefined') {
      return defaulValue;
    }

    return finalValue;
  };
});

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var normalizeResetData = function normalizeResetData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['lastRequest', 'isFetching', 'isInvalidated', 'lastResponse', 'data', 'error'];

  if (typeof data === 'string') {
    return [data];
  }

  if (!Array.isArray(data)) {
    throw new Error('You are using resetter wrong, the params should be string, array or undefined');
  }

  return data;
};

var makeFetchAction = (function (apiName, apiConfigFn) {

  var actionCreator = function actionCreator() {
    return {
      type: ACTION_FETCH_START,
      payload: _objectSpread$3({}, apiConfigFn.apply(void 0, arguments), {
        name: apiName,
        requestedAt: Date.now()
      })
    };
  };

  var updater = function updater(data) {
    return {
      type: ACTION_UPDATE_LOCAL,
      payload: {
        name: apiName,
        data: data
      }
    };
  };

  var resetter = function resetter(data) {
    return {
      type: ACTION_RESET_LOCAL,
      payload: {
        name: apiName,
        data: normalizeResetData(data)
      }
    };
  };

  var isFetchingSelector = get([REDUCER_PATH, apiName, 'isFetching'], false);
  var isInvalidatedSelector = get([REDUCER_PATH, apiName, 'isInvalidated'], false);
  var dataSelector = get([REDUCER_PATH, apiName, 'data'], null);
  var headersSelector = get([REDUCER_PATH, apiName, 'headers'], null);
  var errorSelector = get([REDUCER_PATH, apiName, 'error'], null);
  var lastResponseSelector = get([REDUCER_PATH, apiName, 'lastResponse'], null);
  return {
    actionCreator: actionCreator,
    updater: updater,
    isFetchingSelector: isFetchingSelector,
    isInvalidatedSelector: isInvalidatedSelector,
    dataSelector: dataSelector,
    headersSelector: headersSelector,
    errorSelector: errorSelector,
    lastResponseSelector: lastResponseSelector,
    resetter: resetter
  };
});

var handleActions = (function (handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var handler = handlers[action.type];

    if (typeof handler !== 'function') {
      return state;
    }

    return handler(state, action);
  };
});

var _handleActions;

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getName = function getName(action) {
  return action.payload.name;
};

var getRequestedAt = function getRequestedAt(action) {
  return action.payload.requestedAt;
};

var getRespondedAt = function getRespondedAt(action) {
  return action.payload.respondedAt;
};

var getJSONResponse = function getJSONResponse(action) {
  return action.payload.json;
};

var getError = function getError(action) {
  return action.payload.error;
};

var getPreviousError = function getPreviousError(state, action) {
  return state[getName(action)] ? state[getName(action)].error : null;
};

var includeString = function includeString(element, array) {
  return array.indexOf(element) !== -1;
};

var resetOrKeepValue = function resetOrKeepValue(field, action, currentData) {
  return includeString(field, action.payload.data) ? undefined : currentData[field];
};

var updateWith = function updateWith(state, name, obj) {
  return _objectSpread$4({}, state, _defineProperty({}, name, _objectSpread$4({}, state[name], {}, obj)));
};

var reducer = handleActions((_handleActions = {}, _defineProperty(_handleActions, ACTION_FETCH_START, function (state, action) {
  return updateWith(state, getName(action), {
    lastRequest: getRequestedAt(action),
    isFetching: !action.error,
    isInvalidated: true,
    error: action.error ? getError(action) : getPreviousError(state, action)
  });
}), _defineProperty(_handleActions, ACTION_FETCH_COMPLETE, function (state, action) {
  return updateWith(state, getName(action), {
    isFetching: false,
    isInvalidated: false,
    lastResponse: getRespondedAt(action),
    data: getJSONResponse(action),
    error: null,
    headers: action.meta
  });
}), _defineProperty(_handleActions, ACTION_FETCH_FAILURE, function (state, action) {
  return updateWith(state, getName(action), {
    isFetching: false,
    isInvalidated: true,
    error: getJSONResponse(action),
    headers: action.meta
  });
}), _defineProperty(_handleActions, ACTION_UPDATE_LOCAL, function (state, action) {
  return updateWith(state, getName(action), {
    data: action.payload.data
  });
}), _defineProperty(_handleActions, ACTION_RESET_LOCAL, function (state, action) {
  var name = getName(action);
  var currentData = state[name] || {};
  return updateWith(state, name, {
    lastRequest: resetOrKeepValue('lastRequest', action, currentData),
    isFetching: resetOrKeepValue('isFetching', action, currentData),
    isInvalidated: resetOrKeepValue('isInvalidated', action, currentData),
    lastResponse: resetOrKeepValue('lastResponse', action, currentData),
    data: resetOrKeepValue('data', action, currentData),
    error: resetOrKeepValue('error', action, currentData)
  });
}), _handleActions));

var reducers = _defineProperty({}, REDUCER_PATH, reducer);

var ACTIONS = {
  START: ACTION_FETCH_START,
  COMPLETE: ACTION_FETCH_COMPLETE,
  FAILURE: ACTION_FETCH_FAILURE,
  UPDATE_LOCAL: ACTION_UPDATE_LOCAL
};
var defaultTransformers = [dedupe, json, fetch];

export { defaultTransformers, middleware, makeFetchAction, reducers, ACTIONS, compose as composeAdapters, createAPIMiddleware };
