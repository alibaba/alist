(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./component/Form", "./component/FormItem", "./component/Item", "./component/If", "./core/form", "./repeater/repeaterCore"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./component/Form"), require("./component/FormItem"), require("./component/Item"), require("./component/If"), require("./core/form"), require("./repeater/repeaterCore"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Form, global.FormItem, global.Item, global.If, global.form, global.repeaterCore);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _Form, _FormItem, _Item, _If, _form, _repeaterCore) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _Form.default;
    }
  });
  Object.defineProperty(_exports, "FormItem", {
    enumerable: true,
    get: function get() {
      return _FormItem.default;
    }
  });
  Object.defineProperty(_exports, "Item", {
    enumerable: true,
    get: function get() {
      return _Item.default;
    }
  });
  Object.defineProperty(_exports, "If", {
    enumerable: true,
    get: function get() {
      return _If.default;
    }
  });
  Object.defineProperty(_exports, "FormCore", {
    enumerable: true,
    get: function get() {
      return _form.default;
    }
  });
  Object.defineProperty(_exports, "RepeaterCore", {
    enumerable: true,
    get: function get() {
      return _repeaterCore.default;
    }
  });
  _Form = _interopRequireDefault(_Form);
  _FormItem = _interopRequireDefault(_FormItem);
  _Item = _interopRequireDefault(_Item);
  _If = _interopRequireDefault(_If);
  _form = _interopRequireDefault(_form);
  _repeaterCore = _interopRequireDefault(_repeaterCore);
});