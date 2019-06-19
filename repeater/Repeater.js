(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "../component/Form", "./TableCom", "./ActionButton", "../context/repeaterRow", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("../component/Form"), require("./TableCom"), require("./ActionButton"), require("../context/repeaterRow"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.objectWithoutProperties, global.objectSpread, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.Form, global.TableCom, global.ActionButton, global.repeaterRow, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _objectWithoutProperties2, _objectSpread2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf3, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _Form, _TableCom, _ActionButton, _repeaterRow, _is) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = bind;
  _extends2 = _interopRequireDefault(_extends2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf3 = _interopRequireDefault(_getPrototypeOf3);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);
  _Form = _interopRequireDefault(_Form);
  _TableCom = _interopRequireDefault(_TableCom);
  _ActionButton = _interopRequireDefault(_ActionButton);
  _repeaterRow = _interopRequireDefault(_repeaterRow);

  var isIf = function isIf(item) {
    return item && item.type && item.type.displayName === 'If';
  };

  var getIfChild = function getIfChild(item) {
    return item && item.props && item.props.children ? _react.default.Children.only(item.props.children) : null;
  };

  function bind(type, source) {
    var Input = source.Input;
    var isInline = type === 'inline';
    var isTable = type === 'table';
    var addSuffix = isInline ? 'Inline' : '';

    var Repeater =
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(Repeater, _React$Component);

      function Repeater() {
        var _getPrototypeOf2;

        var _this;

        (0, _classCallCheck2.default)(this, Repeater);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Repeater)).call.apply(_getPrototypeOf2, [this].concat(args)));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDataSource", function () {
          var repeaterCore = _this.props.repeaterCore;
          return repeaterCore.getValues();
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getCoreList", function () {
          var repeaterCore = _this.props.repeaterCore;
          var formList = repeaterCore.formList;
          return formList;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setLoading", function (loading) {
          var setLoading = _this.props.setLoading;
          setLoading(loading);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLoading", function () {
          var repeaterCore = _this.props.repeaterCore;
          return repeaterCore.loading;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getViewElements", function () {
          var _this$props = _this.props,
              _this$props$itemAlign = _this$props.itemAlign,
              itemAlign = _this$props$itemAlign === void 0 ? 'left' : _this$props$itemAlign,
              children = _this$props.children,
              status = _this$props.status,
              repeaterCore = _this$props.repeaterCore;
          var formList = repeaterCore.formList;
          var rowList = formList.map(function (core, index) {
            var values = core.getValues();
            var id = core.id;
            var focusMode = core.$focus;
            var focusCls = focusMode ? 'inline-repeater-focus' : '';
            var cellCls = "repeater-table-cell-wrapper ".concat(focusCls, " repeater-table-cell-wrapper-").concat(itemAlign);
            var cleanLayout = {
              layout: {
                label: null,
                control: null
              }
            };
            var componentMap = {};
            var childMap = {};
            var childrenRefArr = [].concat(children).reduce(function (a, b) {
              return [].concat(a, b);
            }, []);
            childrenRefArr.forEach(function (childitem) {
              var mrChild = childitem;

              if (isIf(childitem)) {
                mrChild = getIfChild(childitem);
              }

              var _mrChild$props = mrChild.props,
                  label = _mrChild$props.label,
                  name = _mrChild$props.name;
              childMap["".concat(label).concat(name)] = _react.default.cloneElement(mrChild, (0, _objectSpread2.default)({
                label: undefined
              }, cleanLayout));
            }); // 遍历渲染数据

            var itemsConfig = _this.getItemsConfig(index);

            itemsConfig.forEach(function (conf) {
              var cls = conf.className || '';
              var style = conf.style || {};
              var customRender = null;

              if (conf.renderCell) {
                customRender = conf.renderCell(values[conf.name], {
                  values: values,
                  id: id,
                  core: core,
                  index: index
                });
              }

              var childElement = childMap["".concat(conf.label).concat(conf.name)];
              var innerValElement = null;

              if (customRender) {
                innerValElement = customRender;
              } else if (_react.default.isValidElement(childElement)) {
                var validItemStatus = (0, _is.isValidStatus)(conf.status);
                var globalStatus = status;

                if (focusMode) {
                  // 焦点模式下，默认为edit，外界状态不为edit时需要同步
                  globalStatus = status !== 'edit' ? status : 'edit';
                } else {
                  globalStatus = 'preview';
                }

                var itemStatus = validItemStatus ? conf.status : globalStatus;
                innerValElement = _react.default.cloneElement(childElement, {
                  status: itemStatus
                });
              } else {
                innerValElement = childElement;
              }

              if (conf.name && !conf.renderCell) {
                innerValElement = _react.default.cloneElement(innerValElement, {
                  name: '',
                  value: values[conf.name]
                });
              }

              componentMap[conf.name] = _react.default.createElement("div", {
                style: style,
                className: "".concat(cellCls, " ").concat(cls)
              }, innerValElement);
            });
            return componentMap;
          });
          return rowList;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getItemsConfig", function (rowIndex) {
          var _this$props2 = _this.props,
              children = _this$props2.children,
              repeaterCore = _this$props2.repeaterCore;

          var _ref = repeaterCore || {},
              _ref$formList = _ref.formList,
              formList = _ref$formList === void 0 ? [] : _ref$formList;

          var itemsConfig = _react.default.Children.map(children, function (childItem) {
            // 非常脏的一段逻辑，而且inlineReater这种非受控组件不适用，需要花时间去重新梳理Repeater的通信方式和渲染方式
            if (isIf(childItem)) {
              var ifResult = null;

              var _ref2 = childItem.props || {},
                  when = _ref2.when,
                  ifChild = _ref2.children;

              var missonList = rowIndex !== undefined ? [formList[rowIndex] || {}] : formList || [];

              if (typeof when === 'function') {
                var canShow = false;
                missonList.forEach(function (mItem, mIndex) {
                  if (mItem.getValues) {
                    var mResult = when(mItem.getValues(), mIndex);
                    if (mResult && !canShow) canShow = true;
                  }
                });

                if (canShow) {
                  ifResult = _react.default.Children.only(ifChild);
                } else {
                  var _ref3 = ifChild || {},
                      ifChildProps = _ref3.props;

                  var _ref4 = ifChildProps || {},
                      otherChild = _ref4.children,
                      otherIfProps = (0, _objectWithoutProperties2.default)(_ref4, ["children"]);

                  ifResult = _react.default.createElement("div", otherIfProps);
                }
              }

              return ifResult;
            }

            return childItem;
          }).filter(function (item) {
            return item !== null;
          }).map(function (child) {
            return {
              name: child.props.name,
              label: child.props.label,
              prefix: child.props.prefix,
              suffix: child.props.suffix,
              multiple: child.props.multiple,
              renderCell: child.props.renderCell,
              style: child.props.style,
              status: child.props.status,
              className: child.props.className
            };
          }).filter(function (item) {
            return item.name || item.multiple || item.renderCell;
          });

          return itemsConfig;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasOperBtn", function () {
          var failedDeleteCount = 0;
          var failedUpdateCount = 0;
          var _this$props3 = _this.props,
              _this$props3$multiple = _this$props3.multiple,
              multiple = _this$props3$multiple === void 0 ? false : _this$props3$multiple,
              repeaterCore = _this$props3.repeaterCore,
              propUpdate = _this$props3.hasUpdate,
              propDelete = _this$props3.hasDelete,
              renderOper = _this$props3.renderOper;

          if (renderOper && typeof renderOper === 'function') {
            return true;
          }

          var formList = repeaterCore.formList;
          var rowLength = Array.isArray(formList) ? formList.length : 0;
          formList.forEach(function (core, index) {
            var values = core.getValues();

            var localHasDelete = _this.decideHasBtn('hasDelete', values, index);

            var localHasUpdate = _this.decideHasBtn('hasUpdate', values, index);

            if (!localHasDelete) failedDeleteCount += 1;
            if (!localHasUpdate) failedUpdateCount += 1;
          });
          var defaultDelete = typeof propDelete === 'boolean' ? propDelete : true;
          var defaultUpdate = typeof propUpdate === 'boolean' ? propUpdate : true;
          var hasDelete = rowLength ? failedDeleteCount < rowLength : defaultDelete;
          var hasUpdate = rowLength ? failedUpdateCount < rowLength : defaultUpdate;
          var isInlineMode = !multiple && !isTable;
          var isSyncmode = !isTable && multiple;
          var updateBtn = isSyncmode ? false : hasUpdate;
          return updateBtn || hasDelete || isInlineMode;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "decideHasBtn", function (propsName, values, index) {
          var btnProps = _this.props[propsName];
          var result = true;

          if (typeof btnProps === 'boolean') {
            result = btnProps;
          } else if (typeof btnProps === 'function') {
            result = btnProps(values, index);
          }

          return result;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilter", function () {
          var _this$props4 = _this.props,
              handleSearch = _this$props4.handleSearch,
              filterElement = _this$props4.filterElement,
              filter = _this$props4.filter;
          var searchEle = null;

          if (filter) {
            if (typeof filterElement === 'function') {
              searchEle = filterElement(handleSearch);
            } else if (_react.default.isValidElement(filterElement)) {
              searchEle = filterElement;
            } else {
              searchEle = _react.default.createElement(Input, {
                className: "repeater-search",
                onChange: handleSearch
              });
            }
          }

          return searchEle;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderRowList", function () {
          var _this$props5 = _this.props,
              _this$props5$multiple = _this$props5.multiple,
              multiple = _this$props5$multiple === void 0 ? false : _this$props5$multiple,
              _this$props5$itemAlig = _this$props5.itemAlign,
              itemAlign = _this$props5$itemAlig === void 0 ? 'left' : _this$props5$itemAlig,
              children = _this$props5.children,
              status = _this$props5.status,
              repeaterCore = _this$props5.repeaterCore,
              formProps = _this$props5.formProps,
              getText = _this$props5.getText,
              renderOper = _this$props5.renderOper;

          var _getText = getText(),
              updateText = _getText.updateText,
              deleteText = _getText.deleteText,
              saveText = _getText.saveText,
              cancelText = _getText.cancelText;

          var formList = repeaterCore.formList;
          var rowList = formList.map(function (core, index) {
            var values = core.getValues();
            var id = core.id;

            var hasDelete = _this.decideHasBtn('hasDelete', values, index);

            var hasUpdate = _this.decideHasBtn('hasUpdate', values, index);

            var focusMode = core.$focus;
            var editable = status === 'edit';
            var focusCls = focusMode ? 'inline-repeater-focus' : '';
            var cellCls = "repeater-table-cell-wrapper ".concat(focusCls, " repeater-table-cell-wrapper-").concat(itemAlign);
            var updateBtn = !multiple && !focusMode && hasUpdate ? _react.default.createElement(_ActionButton.default, {
              key: "update-".concat(id),
              type: "update".concat(addSuffix),
              updateText: updateText
            }) : null;
            var deleteBtn = (!focusMode || multiple) && hasDelete ? _react.default.createElement(_ActionButton.default, {
              key: "delete-".concat(id),
              type: "delete",
              deleteText: deleteText
            }) : null;
            var saveBtn = !isTable && !multiple && focusMode ? _react.default.createElement(_ActionButton.default, {
              key: "save-".concat(id),
              type: "save",
              saveText: saveText
            }) : null;
            var cancelBtn = !isTable && !multiple && focusMode ? _react.default.createElement(_ActionButton.default, {
              key: "cancel-".concat(id),
              type: "cancel",
              cancelText: cancelText
            }) : null;
            var cleanLayout = {
              layout: {
                label: null,
                control: null
              }
            };
            var listItems = null;
            var childMap = {};
            var childrenRefArr = [].concat(children).reduce(function (a, b) {
              return [].concat(a, b);
            }, []);
            childrenRefArr.forEach(function (childitem) {
              var mrChild = childitem;

              if (isIf(childitem)) {
                mrChild = getIfChild(childitem);
              }

              if (mrChild) {
                var _mrChild$props2 = mrChild.props,
                    label = _mrChild$props2.label,
                    name = _mrChild$props2.name;
                childMap["".concat(label).concat(name)] = _react.default.cloneElement(mrChild, (0, _objectSpread2.default)({
                  label: undefined
                }, cleanLayout));
              }
            }); // 遍历渲染数据

            var itemsConfig = _this.getItemsConfig(index);

            listItems = itemsConfig.map(function (conf) {
              var cls = conf.className || '';
              var style = conf.style || {};
              var customRender = null;

              if (conf.renderCell) {
                customRender = conf.renderCell(values[conf.name], {
                  values: values,
                  id: id,
                  core: core,
                  index: index
                });
              }

              var childElement = childMap["".concat(conf.label).concat(conf.name)];
              var innerValElement = null;

              if (customRender) {
                innerValElement = customRender;
              } else if (_react.default.isValidElement(childElement)) {
                var validItemStatus = (0, _is.isValidStatus)(conf.status);
                var globalStatus = status;

                if (focusMode) {
                  // 焦点模式下，默认为edit，外界状态不为edit时需要同步
                  globalStatus = status !== 'edit' ? status : 'edit';
                } else {
                  globalStatus = 'preview';
                }

                var statusResult = conf.status;

                if (typeof conf.status === 'function') {
                  statusResult = conf.status(values, core);
                }

                var itemStatus = validItemStatus ? statusResult : globalStatus;
                innerValElement = _react.default.cloneElement(childElement, {
                  status: itemStatus
                });
              } else {
                innerValElement = childElement;
              }

              return _react.default.createElement("td", {
                style: style,
                key: "".concat(conf.label).concat(conf.name)
              }, _react.default.createElement("div", {
                className: "".concat(cellCls, " ").concat(cls)
              }, innerValElement));
            });

            var hasOperBtn = _this.hasOperBtn();

            var operEle = null;

            if (hasOperBtn) {
              var operBtnList = [saveBtn, cancelBtn, updateBtn, deleteBtn].filter(function (btn) {
                return !!btn;
              });
              var operContent = null;

              if (renderOper && typeof renderOper === 'function') {
                operContent = renderOper(operBtnList, core);
              } else {
                operContent = operBtnList;
              }

              operEle = _react.default.createElement("td", null, editable ? _react.default.createElement("div", {
                className: cellCls
              }, operContent) : null);
            }

            var rowContextValue = {
              core: core,
              id: id
            };
            return _react.default.createElement(_repeaterRow.default.Provider, {
              value: rowContextValue,
              key: id
            }, _react.default.createElement(_Form.default, (0, _extends2.default)({
              Com: "tr"
            }, formProps, cleanLayout, {
              core: core,
              className: "table-repeater-row",
              repeaterRow: true
            }), listItems, operEle));
          });
          return rowList;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderContainer", function () {
          var _this$props6 = _this.props,
              _this$props6$style = _this$props6.style,
              style = _this$props6$style === void 0 ? {} : _this$props6$style,
              className = _this$props6.className,
              view = _this$props6.view,
              status = _this$props6.status,
              itemAlign = _this$props6.itemAlign,
              _this$props6$hasAdd = _this$props6.hasAdd,
              hasAdd = _this$props6$hasAdd === void 0 ? true : _this$props6$hasAdd,
              _this$props6$hasHeade = _this$props6.hasHeader,
              hasHeader = _this$props6$hasHeade === void 0 ? true : _this$props6$hasHeade,
              _this$props6$addPosit = _this$props6.addPosition,
              addPosition = _this$props6$addPosit === void 0 ? 'top' : _this$props6$addPosit,
              _this$props6$multiple = _this$props6.multiple,
              multiple = _this$props6$multiple === void 0 ? false : _this$props6$multiple,
              maxLength = _this$props6.maxLength,
              _this$props6$operateC = _this$props6.operateClassName,
              operateClassName = _this$props6$operateC === void 0 ? '' : _this$props6$operateC,
              getText = _this$props6.getText,
              repeaterCore = _this$props6.repeaterCore,
              top = _this$props6.top,
              bottom = _this$props6.bottom,
              _this$props6$full = _this$props6.full,
              full = _this$props6$full === void 0 ? false : _this$props6$full;

          var _getText2 = getText(),
              addText = _getText2.addText,
              operateText = _getText2.operateText;

          var editable = status === 'edit';
          var cellCls = "repeater-table-cell-wrapper repeater-table-cell-wrapper-".concat(itemAlign); // 展示添加按钮

          var formList = repeaterCore.formList;
          var listLength = Array.isArray(formList) ? formList.length : 0;
          var addType = multiple ? "addMultiple".concat(addSuffix) : "add".concat(addSuffix);
          var addBtnEle = null;

          if (hasAdd && editable) {
            if (maxLength !== undefined && (listLength > maxLength || listLength === maxLength)) {// do nothing...
            } else {
              addBtnEle = _react.default.createElement(_ActionButton.default, {
                type: addType,
                addText: addText
              });
            }
          } // 渲染内容


          var containerContent = null;
          var viewCls = '';

          if (view) {
            viewCls = 'table-repeater-wrapper-custom-view';
            containerContent = _this.renderView();
          } else {
            // 渲染头部
            var itemsConfig = _this.getItemsConfig();

            var header = itemsConfig.map(function (conf) {
              var cls = conf.className || '';
              var headStyle = conf.style || {};
              return _react.default.createElement("th", {
                style: headStyle,
                className: "".concat(cls, " repeater-table-header-node"),
                key: "".concat(conf.label).concat(conf.name)
              }, _react.default.createElement("div", {
                className: cellCls
              }, " ", conf.label, " "));
            }); // 如果当前状态为编辑状态，展示操作栏位

            var hasOperBtn = _this.hasOperBtn();

            if (editable && hasOperBtn) {
              header.push(_react.default.createElement("th", {
                className: "repeater-table-header-node ".concat(operateClassName),
                key: "last"
              }, _react.default.createElement("div", {
                className: cellCls
              }, operateText)));
            }

            containerContent = _react.default.createElement(_TableCom.default, {
              hasHeader: hasHeader,
              header: header
            }, _this.renderRowList());
          }

          var topElement = null;
          var bottomElement = null;
          if (top && typeof top === 'function') topElement = top();
          if (top && (_react.default.isValidElement(top) || typeof top === 'string')) topElement = typeof top === 'string' ? _react.default.createElement("div", null, top) : top;
          if (bottom && typeof bottom === 'function') bottomElement = bottom();
          if (bottom && (_react.default.isValidElement(bottom) || typeof bottom === 'string')) bottomElement = typeof bottom === 'string' ? _react.default.createElement("div", null, bottom) : bottom;
          var fullcls = full ? 'table-repeater-wrapper-full' : '';
          return _react.default.createElement("div", {
            className: "table-repeater-wrapper ".concat(viewCls, " ").concat(fullcls, " ").concat(className || ''),
            style: style
          }, topElement, _this.renderFilter(), addPosition === 'top' ? addBtnEle : null, containerContent, addPosition === 'bottom' ? addBtnEle : null, bottomElement);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderView", function () {
          var _this$props7 = _this.props,
              view = _this$props7.view,
              children = _this$props7.children;
          var viewElement = null;

          if (view) {
            if (typeof view === 'function') {
              if (children) {
                var rowList = _this.renderRowList();

                viewElement = view(rowList, (0, _assertThisInitialized2.default)(_this));
              } else {
                viewElement = view(null, (0, _assertThisInitialized2.default)(_this));
              }
            } else {
              viewElement = view;
            }
          }

          return viewElement;
        });
        return _this;
      }

      (0, _createClass2.default)(Repeater, [{
        key: "render",
        value: function render() {
          return this.renderContainer();
        }
      }]);
      return Repeater;
    }(_react.default.Component);

    return Repeater;
  }
});