"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

var _Plugin = _interopRequireDefault(require("./Plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _default(_ref) {
  var types = _ref.types;
  var plugins = null; // Only for test

  global.__clearBabelAntdPlugin = function () {
    plugins = null;
  };

  function applyInstance(method, args, context) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _plugin = _step.value;

        if (_plugin[method]) {
          _plugin[method].apply(_plugin, _toConsumableArray(args).concat([context]));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var Program = {
    enter: function enter(path, _ref2) {
      var _ref2$opts = _ref2.opts,
          opts = _ref2$opts === void 0 ? {} : _ref2$opts;

      // Init plugin instances once.
      if (!plugins) {
        if (Array.isArray(opts)) {
          plugins = opts.map(function (_ref3) {
            var libraryName = _ref3.libraryName,
                libraryDirectory = _ref3.libraryDirectory,
                style = _ref3.style,
                camel2DashComponentName = _ref3.camel2DashComponentName,
                camel2UnderlineComponentName = _ref3.camel2UnderlineComponentName,
                fileName = _ref3.fileName,
                customName = _ref3.customName;
            (0, _assert.default)(libraryName, 'libraryName should be provided');
            return new _Plugin.default(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, types);
          });
        } else {
          (0, _assert.default)(opts.libraryName, 'libraryName should be provided');
          plugins = [new _Plugin.default(opts.libraryName, opts.libraryDirectory, opts.style, opts.camel2DashComponentName, opts.camel2UnderlineComponentName, opts.fileName, opts.customName, types)];
        }
      }

      applyInstance('ProgramEnter', arguments, this); // eslint-disable-line
    },
    exit: function exit() {
      applyInstance('ProgramExit', arguments, this); // eslint-disable-line
    }
  };
  var methods = ['ImportDeclaration', 'CallExpression', 'MemberExpression', 'Property', 'VariableDeclarator', 'ArrayExpression', 'LogicalExpression', 'ConditionalExpression', 'IfStatement', 'ExpressionStatement', 'ReturnStatement', 'ExportDefaultDeclaration', 'BinaryExpression', 'NewExpression'];
  var ret = {
    visitor: {
      Program: Program
    }
  };

  var _loop = function _loop(method) {
    ret.visitor[method] = function () {
      // eslint-disable-line
      applyInstance(method, arguments, ret.visitor); // eslint-disable-line
    };
  };

  for (var _i = 0; _i < methods.length; _i++) {
    var method = methods[_i];

    _loop(method);
  }

  return ret;
}