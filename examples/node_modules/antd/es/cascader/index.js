import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import * as React from 'react';
import RcCascader from 'rc-cascader';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import omit from 'omit.js';
import KeyCode from 'rc-util/es/KeyCode';
import Input from '../input';
import Icon from '../icon';
function highlightKeyword(str, keyword, prefixCls) {
    return str.split(keyword).map(function (node, index) {
        return index === 0 ? node : [React.createElement(
            'span',
            { className: prefixCls + '-menu-item-keyword', key: 'seperator' },
            keyword
        ), node];
    });
}
function defaultFilterOption(inputValue, path, names) {
    return path.some(function (option) {
        return option[names.label].indexOf(inputValue) > -1;
    });
}
function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
    return path.map(function (option, index) {
        var label = option[names.label];
        var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
        return index === 0 ? node : [' / ', node];
    });
}
function defaultSortFilteredOption(a, b, inputValue, names) {
    function callback(elem) {
        return elem[names.label].indexOf(inputValue) > -1;
    }
    return a.findIndex(callback) - b.findIndex(callback);
}
function getFilledFieldNames() {
    var filedNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var names = {
        children: filedNames.children || 'children',
        label: filedNames.label || 'label',
        value: filedNames.value || 'value'
    };
    return names;
}
var defaultDisplayRender = function defaultDisplayRender(label) {
    return label.join(' / ');
};

var Cascader = function (_React$Component) {
    _inherits(Cascader, _React$Component);

    function Cascader(props) {
        _classCallCheck(this, Cascader);

        var _this = _possibleConstructorReturn(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).call(this, props));

        _this.handleChange = function (value, selectedOptions) {
            _this.setState({ inputValue: '' });
            if (selectedOptions[0].__IS_FILTERED_OPTION) {
                var unwrappedValue = value[0];
                var unwrappedSelectedOptions = selectedOptions[0].path;
                _this.setValue(unwrappedValue, unwrappedSelectedOptions);
                return;
            }
            _this.setValue(value, selectedOptions);
        };
        _this.handlePopupVisibleChange = function (popupVisible) {
            if (!('popupVisible' in _this.props)) {
                _this.setState({
                    popupVisible: popupVisible,
                    inputFocused: popupVisible,
                    inputValue: popupVisible ? _this.state.inputValue : ''
                });
            }
            var onPopupVisibleChange = _this.props.onPopupVisibleChange;
            if (onPopupVisibleChange) {
                onPopupVisibleChange(popupVisible);
            }
        };
        _this.handleInputBlur = function () {
            _this.setState({
                inputFocused: false
            });
        };
        _this.handleInputClick = function (e) {
            var _this$state = _this.state,
                inputFocused = _this$state.inputFocused,
                popupVisible = _this$state.popupVisible;
            // Prevent `Trigger` behaviour.

            if (inputFocused || popupVisible) {
                e.stopPropagation();
                if (e.nativeEvent.stopImmediatePropagation) {
                    e.nativeEvent.stopImmediatePropagation();
                }
            }
        };
        _this.handleKeyDown = function (e) {
            if (e.keyCode === KeyCode.BACKSPACE) {
                e.stopPropagation();
            }
        };
        _this.handleInputChange = function (e) {
            var inputValue = e.target.value;
            _this.setState({ inputValue: inputValue });
        };
        _this.setValue = function (value) {
            var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value, selectedOptions);
            }
        };
        _this.clearSelection = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!_this.state.inputValue) {
                _this.setValue([]);
                _this.handlePopupVisibleChange(false);
            } else {
                _this.setState({ inputValue: '' });
            }
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        _this.state = {
            value: props.value || props.defaultValue || [],
            inputValue: '',
            inputFocused: false,
            popupVisible: props.popupVisible,
            flattenOptions: props.showSearch ? _this.flattenTree(props.options, props.changeOnSelect, props.filedNames) : undefined
        };
        return _this;
    }

    _createClass(Cascader, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({ value: nextProps.value || [] });
            }
            if ('popupVisible' in nextProps) {
                this.setState({ popupVisible: nextProps.popupVisible });
            }
            if (nextProps.showSearch && this.props.options !== nextProps.options) {
                this.setState({
                    flattenOptions: this.flattenTree(nextProps.options, nextProps.changeOnSelect, nextProps.filedNames)
                });
            }
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            var _props = this.props,
                options = _props.options,
                _props$displayRender = _props.displayRender,
                displayRender = _props$displayRender === undefined ? defaultDisplayRender : _props$displayRender,
                filedNames = _props.filedNames;

            var names = getFilledFieldNames(filedNames);
            var value = this.state.value;
            var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
            var selectedOptions = arrayTreeFilter(options, function (o, level) {
                return o[names.value] === unwrappedValue[level];
            });
            var label = selectedOptions.map(function (o) {
                return o[names.label];
            });
            return displayRender(label, selectedOptions);
        }
    }, {
        key: 'flattenTree',
        value: function flattenTree(options, changeOnSelect, filedNames) {
            var _this2 = this;

            var ancestor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            var names = getFilledFieldNames(filedNames);
            var flattenOptions = [];
            var childrenName = names.children;
            options.forEach(function (option) {
                var path = ancestor.concat(option);
                if (changeOnSelect || !option[childrenName] || !option[childrenName].length) {
                    flattenOptions.push(path);
                }
                if (option[childrenName]) {
                    flattenOptions = flattenOptions.concat(_this2.flattenTree(option[childrenName], changeOnSelect, filedNames, path));
                }
            });
            return flattenOptions;
        }
    }, {
        key: 'generateFilteredOptions',
        value: function generateFilteredOptions(prefixCls) {
            var _this3 = this,
                _ref2;

            var _props2 = this.props,
                showSearch = _props2.showSearch,
                notFoundContent = _props2.notFoundContent,
                filedNames = _props2.filedNames;

            var names = getFilledFieldNames(filedNames);
            var _showSearch$filter = showSearch.filter,
                filter = _showSearch$filter === undefined ? defaultFilterOption : _showSearch$filter,
                _showSearch$render = showSearch.render,
                render = _showSearch$render === undefined ? defaultRenderFilteredOption : _showSearch$render,
                _showSearch$sort = showSearch.sort,
                sort = _showSearch$sort === undefined ? defaultSortFilteredOption : _showSearch$sort;
            var _state = this.state,
                _state$flattenOptions = _state.flattenOptions,
                flattenOptions = _state$flattenOptions === undefined ? [] : _state$flattenOptions,
                inputValue = _state.inputValue;

            var filtered = flattenOptions.filter(function (path) {
                return filter(_this3.state.inputValue, path, names);
            }).sort(function (a, b) {
                return sort(a, b, inputValue, names);
            });
            if (filtered.length > 0) {
                return filtered.map(function (path) {
                    var _ref;

                    return _ref = {
                        __IS_FILTERED_OPTION: true,
                        path: path
                    }, _defineProperty(_ref, names.label, render(inputValue, path, prefixCls, names)), _defineProperty(_ref, names.value, path.map(function (o) {
                        return o[names.value];
                    })), _defineProperty(_ref, 'disabled', path.some(function (o) {
                        return !!o.disabled;
                    })), _ref;
                });
            }
            return [(_ref2 = {}, _defineProperty(_ref2, names.label, notFoundContent), _defineProperty(_ref2, names.value, 'ANT_CASCADER_NOT_FOUND'), _defineProperty(_ref2, 'disabled', true), _ref2)];
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames, _classNames2, _classNames3;

            var props = this.props,
                state = this.state;

            var prefixCls = props.prefixCls,
                inputPrefixCls = props.inputPrefixCls,
                children = props.children,
                placeholder = props.placeholder,
                size = props.size,
                disabled = props.disabled,
                className = props.className,
                style = props.style,
                allowClear = props.allowClear,
                _props$showSearch = props.showSearch,
                showSearch = _props$showSearch === undefined ? false : _props$showSearch,
                otherProps = __rest(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "size", "disabled", "className", "style", "allowClear", "showSearch"]);

            var value = state.value;
            var sizeCls = classNames((_classNames = {}, _defineProperty(_classNames, inputPrefixCls + '-lg', size === 'large'), _defineProperty(_classNames, inputPrefixCls + '-sm', size === 'small'), _classNames));
            var clearIcon = allowClear && !disabled && value.length > 0 || state.inputValue ? React.createElement(Icon, { type: 'cross-circle', className: prefixCls + '-picker-clear', onClick: this.clearSelection }) : null;
            var arrowCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-picker-arrow', true), _defineProperty(_classNames2, prefixCls + '-picker-arrow-expand', state.popupVisible), _classNames2));
            var pickerCls = classNames(className, prefixCls + '-picker', (_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-picker-with-value', state.inputValue), _defineProperty(_classNames3, prefixCls + '-picker-disabled', disabled), _defineProperty(_classNames3, prefixCls + '-picker-' + size, !!size), _defineProperty(_classNames3, prefixCls + '-picker-show-search', !!showSearch), _classNames3));
            // Fix bug of https://github.com/facebook/react/pull/5004
            // and https://fb.me/react-unknown-prop
            var inputProps = omit(otherProps, ['onChange', 'options', 'popupPlacement', 'transitionName', 'displayRender', 'onPopupVisibleChange', 'changeOnSelect', 'expandTrigger', 'popupVisible', 'getPopupContainer', 'loadData', 'popupClassName', 'filterOption', 'renderFilteredOption', 'sortFilteredOption', 'notFoundContent', 'filedNames']);
            var options = props.options;
            if (state.inputValue) {
                options = this.generateFilteredOptions(prefixCls);
            }
            // Dropdown menu should keep previous status until it is fully closed.
            if (!state.popupVisible) {
                options = this.cachedOptions;
            } else {
                this.cachedOptions = options;
            }
            var dropdownMenuColumnStyle = {};
            var isNotFound = (options || []).length === 1 && options[0].value === 'ANT_CASCADER_NOT_FOUND';
            if (isNotFound) {
                dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
            }
            // The default value of `matchInputWidth` is `true`
            var resultListMatchInputWidth = showSearch.matchInputWidth === false ? false : true;
            if (resultListMatchInputWidth && state.inputValue && this.input) {
                dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
            }
            var input = children || React.createElement(
                'span',
                { style: style, className: pickerCls },
                React.createElement(
                    'span',
                    { className: prefixCls + '-picker-label' },
                    this.getLabel()
                ),
                React.createElement(Input, _extends({}, inputProps, { ref: this.saveInput, prefixCls: inputPrefixCls, placeholder: value && value.length > 0 ? undefined : placeholder, className: prefixCls + '-input ' + sizeCls, value: state.inputValue, disabled: disabled, readOnly: !showSearch, autoComplete: 'off', onClick: showSearch ? this.handleInputClick : undefined, onBlur: showSearch ? this.handleInputBlur : undefined, onKeyDown: this.handleKeyDown, onChange: showSearch ? this.handleInputChange : undefined })),
                clearIcon,
                React.createElement(Icon, { type: 'down', className: arrowCls })
            );
            return React.createElement(
                RcCascader,
                _extends({}, props, { options: options, value: value, popupVisible: state.popupVisible, onPopupVisibleChange: this.handlePopupVisibleChange, onChange: this.handleChange, dropdownMenuColumnStyle: dropdownMenuColumnStyle }),
                input
            );
        }
    }]);

    return Cascader;
}(React.Component);

export default Cascader;

Cascader.defaultProps = {
    prefixCls: 'ant-cascader',
    inputPrefixCls: 'ant-input',
    placeholder: 'Please select',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
    notFoundContent: 'Not Found'
};