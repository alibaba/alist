(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "./messages", "./rules", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("./messages"), require("./rules"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass, global.messages, global.rules, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _classCallCheck2, _createClass2, _messages, _rules, _is) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _messages = _interopRequireDefault(_messages);
  _rules = _interopRequireDefault(_rules);

  var Validate =
  /*#__PURE__*/
  function () {
    function Validate(schema) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh_CN';
      (0, _classCallCheck2.default)(this, Validate);
      this.schema = schema;
      this.setLocal(locale);
      this.keys = Object.keys(this.schema);
    }

    (0, _createClass2.default)(Validate, [{
      key: "setLocal",
      value: function setLocal(locale) {
        this.messages = (0, _messages.default)(locale);
      }
    }, {
      key: "test",
      value: function test(value) {
        var _this = this;

        return this.keys.reduce(function (s, key) {
          return s && new _rules.default(_this.schema[key]).test(value[key]);
        }, true);
      }
    }, {
      key: "validate",
      value: function validate(value) {
        var _this2 = this;

        var ret = {};
        var hasPromise = false;
        var validatePromise = this.keys.map(function (key) {
          var result = new _rules.default(_this2.schema[key]).validate(value[key], key, value);

          if ((0, _is.isPromise)(result)) {
            hasPromise = true;
            return result.then(function (res) {
              if (res) {
                ret[key] = res;
              }
            });
          }

          if (result) {
            ret[key] = result;
          }

          return null;
        });

        if (hasPromise) {
          return Promise.all(validatePromise).then(function () {
            if (Object.keys(ret).length === 0) {
              return null;
            }

            return ret;
          });
        }

        if (Object.keys(ret).length === 0) {
          return null;
        }

        return ret;
      }
    }]);
    return Validate;
  }();

  var _default = Validate;
  _exports.default = _default;
});