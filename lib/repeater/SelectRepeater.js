(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectSpread", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/typeof", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "../", "../context/selectRepeater"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("../"), require("../context/selectRepeater"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.objectSpread, global.regenerator, global.asyncToGenerator, global._typeof, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global._, global.selectRepeater);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _objectSpread2, _regenerator, _asyncToGenerator2, _typeof2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _2, _selectRepeater) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = SelectRepeaterHOC;
  _extends2 = _interopRequireDefault(_extends2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _typeof2 = _interopRequireDefault(_typeof2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _2 = _interopRequireWildcard(_2);
  _selectRepeater = _interopRequireDefault(_selectRepeater);

  function SelectRepeaterHOC(Source, Com) {
    var _class, _temp;

    var Checkbox = Source.Checkbox,
        Radio = Source.Radio;
    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(SelectRepeater, _Component);

      function SelectRepeater(props) {
        var _this;

        (0, _classCallCheck2.default)(this, SelectRepeater);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SelectRepeater).call(this, props));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentDidMount", function () {
          var onMount = _this.props.onMount;

          if (onMount) {
            onMount(_this.repeater.current);
          }
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentWillReceiveProps", function (nextProps) {
          var selectKey = _this.props.selectKey;
          var status = nextProps.status;

          var _ref = nextProps.value || {},
              dataSource = _ref.dataSource,
              value = _ref.value; // 下述代码在interceptor中完成


          var formatValue = [].concat(value);
          var formatDataSource = [];

          if (Array.isArray(dataSource)) {
            formatDataSource = dataSource;
            var idMap = {};
            dataSource.forEach(function (item) {
              if (item && item[selectKey]) {
                idMap[item[selectKey]] = item;
              }
            });
            formatValue = formatValue.filter(function (f) {
              return !!f;
            });
            formatValue.forEach(function (valItem, index) {
              if (valItem[selectKey] in idMap) {
                formatValue.splice(index, 1, idMap[valItem[selectKey]]);
              }
            });
          }

          var globalStatus = _this.core.getGlobalStatus();

          var localStatus = status;

          if ((0, _typeof2.default)(status) === 'object') {
            var _ref2 = status || {},
                _ref2$dataSource = _ref2.dataSource,
                innerStatus = _ref2$dataSource === void 0 ? 'edit' : _ref2$dataSource;

            localStatus = innerStatus;
          }

          if (localStatus !== globalStatus) {
            _this.core.setGlobalStatus(localStatus);
          }

          _this.core.setValues({
            dataSource: formatDataSource,
            value: formatValue
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSuperFormProps", function (core) {
          var formProps = {};

          if (core.form && core.form.jsx.props) {
            var _core$form$jsx$props = core.form.jsx.props,
                defaultMinWidth = _core$form$jsx$props.defaultMinWidth,
                full = _core$form$jsx$props.full,
                inline = _core$form$jsx$props.inline,
                inset = _core$form$jsx$props.inset,
                layout = _core$form$jsx$props.layout,
                colon = _core$form$jsx$props.colon;
            formProps = {
              defaultMinWidth: defaultMinWidth,
              full: full,
              inline: inline,
              inset: inset,
              layout: layout,
              colon: colon
            };
          }

          return formProps;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "syncDeletedValues", function (values, event) {
          var selectKey = _this.props.selectKey;

          var _ref3 = values || {},
              _ref3$dataSource = _ref3.dataSource,
              dataSource = _ref3$dataSource === void 0 ? [] : _ref3$dataSource,
              _ref3$value = _ref3.value,
              value = _ref3$value === void 0 ? [] : _ref3$value;

          var _ref4 = event || {},
              _ref4$index = _ref4.index,
              index = _ref4$index === void 0 ? -1 : _ref4$index,
              item = _ref4.item;

          if (index !== -1 && value.length > 0) {
            var itemValues = item.getValues() || {};
            return {
              dataSource: dataSource,
              value: value.filter(function (valItem) {
                return valItem[selectKey] !== itemValues[selectKey];
              })
            };
          }

          return values;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (values, fireKeys, ctx) {
          var onChange = _this.props.onChange;
          var currentEventOpts = ctx.currentEventOpts;

          var _ref5 = currentEventOpts || {},
              type = _ref5.type;

          if (type === 'delete') {
            var syncedValues = _this.syncDeletedValues(values, currentEventOpts);

            onChange(syncedValues, fireKeys, ctx);
          } else {
            onChange(values, fireKeys, ctx);
          }
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRepeater", function (value) {
          // 强制刷新repeater，否则datasource内的内容不会刷新
          _this.core.setValue('value', value);

          _this.repeater.current.forceUpdate();
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderTrigger", function (_, _ref6) {
          var values = _ref6.values;
          var _this$props = _this.props,
              selectMode = _this$props.selectMode,
              isSelectDisabled = _this$props.isSelectDisabled,
              asyncHandler = _this$props.asyncHandler,
              selectKey = _this$props.selectKey;

          var _ref7 = asyncHandler || {},
              asyncSelect = _ref7.select;

          var val = _this.core.getValue('value') || [];

          var globalStatus = _this.core.getGlobalStatus();

          var disabled = false;

          if (isSelectDisabled) {
            disabled = isSelectDisabled(values);
          }

          if (globalStatus === 'preview') {
            disabled = true;
          }

          var valuesKey = values[selectKey];
          var icChecked = !!val.find(function (lastItem) {
            return valuesKey === lastItem[selectKey];
          });

          var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
              TriggerCom = _assertThisInitialize.TriggerCom;

          return _react.default.createElement(TriggerCom, {
            disabled: disabled,
            value: icChecked,
            onChange:
            /*#__PURE__*/
            function () {
              var _ref8 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(checked) {
                var lastVal, canSyncSelect;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        lastVal = _this.core.getValue('value') || [];

                        if (selectMode === 'single') {
                          if (checked) {
                            lastVal = [values];
                          }
                        } else if (checked) {
                          lastVal.push(values);
                        } else {
                          lastVal = lastVal.filter(function (lastItem) {
                            return valuesKey !== lastItem[selectKey];
                          });
                        }

                        if (!asyncSelect) {
                          _context.next = 16;
                          break;
                        }

                        canSyncSelect = true;
                        _context.prev = 4;
                        _context.next = 7;
                        return asyncSelect(checked, values, lastVal);

                      case 7:
                        canSyncSelect = _context.sent;
                        _context.next = 13;
                        break;

                      case 10:
                        _context.prev = 10;
                        _context.t0 = _context["catch"](4);
                        canSyncSelect = false;

                      case 13:
                        if (canSyncSelect) {
                          _this.updateRepeater(lastVal);
                        }

                        _context.next = 17;
                        break;

                      case 16:
                        _this.updateRepeater(lastVal);

                      case 17:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[4, 10]]);
              }));

              return function (_x) {
                return _ref8.apply(this, arguments);
              };
            }()
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderSelectTrigger", function () {
          var selectMode = _this.props.selectMode;

          var _assertThisInitialize2 = (0, _assertThisInitialized2.default)(_this),
              TriggerCom = _assertThisInitialize2.TriggerCom;

          if (selectMode === 'single' || selectMode === 'multiple') {
            return _react.default.createElement(_2.FormItem, {
              className: "select-repeater-feature-head",
              renderCell: _this.renderTrigger,
              status: "hidden",
              name: "selected"
            }, _react.default.createElement(TriggerCom, null));
          }

          return null;
        });
        var _selectMode = props.selectMode,
            _value = props.value,
            selectFormConfig = props.selectFormConfig,
            _item = props.item;

        var _ref9 = _value || {},
            _dataSource = _ref9.dataSource,
            innerVal = _ref9.value;

        _this.core = new _2.FormCore((0, _objectSpread2.default)({
          values: {
            dataSource: _dataSource || [],
            value: innerVal || []
          }
        }, selectFormConfig));
        _this.core.jsx = (0, _assertThisInitialized2.default)(_this);
        _this.TriggerCom = null;

        if (_selectMode === 'single') {
          _this.TriggerCom = Radio;
        } else if (_selectMode === 'multiple') {
          _this.TriggerCom = Checkbox;
        }

        _this.repeater = _react.default.createRef();

        if (_item) {
          _this.item = _item;
        }

        return _this;
      }

      (0, _createClass2.default)(SelectRepeater, [{
        key: "render",
        value: function render() {
          var children = this.props.children;
          var otherprops = (0, _objectSpread2.default)({}, this.props);
          delete otherprops.children;
          delete otherprops.onChange;
          delete otherprops.selectMode;
          delete otherprops.selectFormConfig;
          var inheritProps = {};

          if (this.item) {
            inheritProps = this.getSuperFormProps(this.item);
          }

          var contextValue = {
            selectRepeater: this.core
          };
          return _react.default.createElement(_2.default, (0, _extends2.default)({}, inheritProps, {
            core: this.core,
            onChange: this.handleChange
          }), _react.default.createElement(_selectRepeater.default.Provider, {
            value: contextValue
          }, _react.default.createElement(_2.Item, {
            name: "dataSource"
          }, _react.default.createElement(Com, (0, _extends2.default)({}, otherprops, {
            ref: this.repeater
          }), this.renderSelectTrigger(), children))));
        }
      }]);
      return SelectRepeater;
    }(_react.Component), (0, _defineProperty2.default)(_class, "defaultProps", {
      selectMode: 'single',
      dataSource: [],
      selectKey: 'id'
    }), (0, _defineProperty2.default)(_class, "propTypes", {
      children: _propTypes.default.any,
      selectFormConfig: _propTypes.default.object,
      selectMode: _propTypes.default.string,
      dataSource: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
      value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
      onChange: _propTypes.default.func,
      selectKey: _propTypes.default.string
    }), _temp;
  }
});