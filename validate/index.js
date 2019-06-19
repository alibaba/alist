(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configRules = configRules;
  _exports.default = void 0;

  function isEmpty(value) {
    return value === undefined || value === null || String(value).trim() === '';
  }

  function configRules() {
    var local = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zh_CN';
    return {
      zh_CN: {
        required: function required(label, message) {
          var msg = !message ? label : message;
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([new Error(msg || '必填')]);
              } else {
                callback([]);
              }
            }
          };
        },
        number: function number(message) {
          return {
            validator: function validator(rule, value, callback) {
              var errors = [];
              var err = new Error(message || '只能输入数字');

              if (isEmpty(value)) {
                callback([]);
              } else if (isNaN(Number(value))) {
                // eslint-disable-line
                errors.push(err);
              } else if (typeof value !== 'string' && typeof value !== 'number') {
                errors.push(err);
              }

              callback(errors);
            }
          };
        },
        int: function int(message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (!/^[1-9]\d*$/.test(value)) {
                callback([new Error(message || '只能输入正整数')]);
              } else {
                callback([]);
              }
            }
          };
        },
        uint: function uint(message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (!/^\d+$/.test(value)) {
                callback([new Error(message || '只能输入非负整数')]);
              } else {
                callback([]);
              }
            }
          };
        },
        length: function length(_length, message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (String(value).length !== _length) {
                callback([new Error(message || "\u957F\u5EA6\u53EA\u80FD\u662F".concat(_length, "\u4E2A\u5B57\u7B26"))]);
              } else {
                callback([]);
              }
            }
          };
        },
        minLength: function minLength(min, message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (String(value).length < min) {
                callback([new Error(message || "\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E".concat(min, "\u4E2A\u5B57\u7B26"))]);
              } else {
                callback([]);
              }
            }
          };
        },
        maxLength: function maxLength(max, message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (String(value).length > max) {
                callback([new Error(message || "\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7".concat(max, "\u4E2A\u5B57\u7B26"))]);
              } else {
                callback([]);
              }
            }
          };
        },
        eq: function eq(val, message) {
          if (!message) {
            throw Error('应当为 eq 规则指定 message');
          }

          return {
            validator: function validator(rule, value, callback, source) {
              if (!(rule.field in source)) {
                callback([]);
              } else if (value !== val) {
                callback([new Error(message)]);
              } else {
                callback([]);
              }
            }
          };
        },
        min: function min(_min, message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (Number(value) < _min) {
                callback([new Error(message || "\u4E0D\u80FD\u5C0F\u4E8E".concat(_min))]);
              } else {
                callback([]);
              }
            }
          };
        },
        max: function max(_max, message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (Number(value) > _max) {
                callback([new Error(message || "\u4E0D\u80FD\u5927\u4E8E".concat(_max))]);
              } else {
                callback([]);
              }
            }
          };
        },
        email: function email(message) {
          return {
            type: 'email',
            message: message || '邮箱格式不正确'
          };
        },
        url: function url(message) {
          return {
            type: 'url',
            message: message || '链接格式不正确,请以 http:// 或者 https:// 开头'
          };
        },
        phone: function phone(message) {
          return {
            pattern: /^\d{6,}$/,
            message: message || '错误的电话格式'
          };
        },
        equal: function equal(field, message) {
          if (!message) {
            throw Error('应当为 equal 规则指定 message');
          }

          return {
            validator: function validator(rule, value, callback, source) {
              if (isEmpty(value)) {
                callback([]);
              } else if (value !== source[field]) {
                callback([new Error(message)]);
              } else {
                callback([]);
              }
            }
          };
        },
        precision: function precision(_precision, message) {
          return {
            validator: function validator(rule, value, callback) {
              var regex = new RegExp("^(\\d+(\\.[\\d]{1,".concat(_precision, "})?)?$"), 'g');

              if (!regex.test(value)) {
                callback([new Error(message || "\u5FC5\u987B\u7CBE\u786E\u5230".concat(_precision, "\u4F4D\u5C0F\u6570"))]);
              } else {
                callback([]);
              }
            }
          };
        },
        alphabet: function alphabet(message) {
          return {
            pattern: /^[a-z]*$/i,
            message: message || '只允许输入英文字母'
          };
        },
        words: function words(message) {
          return {
            pattern: /^[a-z0-9]*$/i,
            message: message || '只允许输入英文字母和数字'
          };
        },
        ascii: function ascii(message) {
          return {
            pattern: /^[\x00-\x7F]*$/,
            // eslint-disable-line
            message: message || '只允许输入英文字母标点和数字'
          };
        },
        idCard: function idCard(message) {
          return {
            pattern: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
            message: message || '请输入正确的身份证号'
          };
        },
        mobile: function mobile(message) {
          return {
            pattern: /^1\d{10}$/,
            message: message || '请输入正确的手机号码'
          };
        },
        hsCode: function hsCode(message) {
          return {
            validator: function validator(rule, value, callback) {
              if (isEmpty(value)) {
                callback([]);
              } else if (!/^\d{8}|\d{10}|\d{8}\.\d{2}$/.test(value)) {
                callback([new Error(message || '请输入正确的HSCODE')]);
              } else {
                callback([]);
              }
            }
          };
        }
      }
    }[local];
  }

  var _default = configRules();

  _exports.default = _default;
});