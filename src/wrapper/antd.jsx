import React from 'react';
import {
    formatValue, formatArray, formatBoolValue, formatNumber,
    getValueProps, getCleanProps,
} from './util';

const IS_REACT_GREATER_FITHTEEN = parseInt(React.version, 10) > 15;
const prefix = 'ant';

function renderValue(value) {
    if (value === null || value === undefined) return null; // 空值直接返回
    if (Array.isArray(value)) { // 数组需要判断版本号返回
        const arrValue = value.map(valItem => <span className="multi-value-item">{valItem}</span>);

        return <div className="multi-value-item-wrapper">{arrValue}</div>;
    }

    return IS_REACT_GREATER_FITHTEEN ? value : <span className="multi-value-item">{value}</span>;
}

function renderOption(props = {}) { // 处理
    const value = formatValue(props.value); // 格式化值
    const arrValue = [].concat(value); // 处理多选, 如checkbox
    if (Array.isArray(props.dataSource) || Array.isArray(props.options)) { // dataSource模式
        const dataSource = props.dataSource || props.options;
        const hitLabel = [];
        dataSource.forEach((item) => {
            if (arrValue.indexOf(item.value) !== -1) {
                hitLabel.push(item.label);
            }
        });

        return renderValue(hitLabel);
    } else if (Array.isArray(props.children)) { // children模式
        const hitLabel = [];
        props.children.forEach((item) => {
            if (item.props && item.props.children && arrValue.indexOf(item.props.value) !== -1) {
                hitLabel.push(item.props.children);
            }
        });

        return renderValue(hitLabel);
    }
    return null;
}

const defaultFileUploadProps = {
    fileList: [],
    beforeUpload() { },
    onChange() { },
    onSuccess() { },
};

const insetify = (props) => {
    const insetProps = {};
    const { className, inset } = props || {};
    if (inset) insetProps.className = `${(className || '')} inset-component`;
    return insetProps;
};

class WrapperClass {
    constructor(AntdSource) {
        this.Antd = AntdSource;
    }

    Input = (props) => {
        const {
            status, value, error, inset, ...others
        } = props;
        const valueProps = getValueProps(props);

        if (status === 'preview') return renderValue(formatValue(value)); // 处理预览态
        return <this.Antd.Input {...others} {...valueProps} {...insetify(props)} />;
    }

    TextArea = (props = {}) => {
        const { status, value } = props;
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props);

        if (status === 'preview') return renderValue(formatValue(value)); // 处理预览态
        return <this.Antd.Input.TextArea {...otherProps} {...valueProps} {...insetify(props)} />;
    }

    Select = (props) => {
        const { className = '', value, children } = props;
        const { options, ...others } = props;
        const opts = {};
        if (options && Array.isArray(options) && !children) {
            opts.children = options.map((item) => {
                const { label, value: itemVal } = item;
                return <this.Antd.Select.Option key={`${itemVal}_${label}`} value={itemVal}>{label}</this.Antd.Select.Option>;
            });
        }

        const valueProps = getValueProps(props);

        if (props.status === 'preview') return <this.Antd.Select placeholder="" {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} />;
        return <this.Antd.Select {...others} {...opts} {...valueProps} {...insetify(props)} />;
    }

    CheckboxGroup = (props) => {
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatArray,
        });

        if (props.status === 'preview') return renderOption(props);

        return <this.Antd.Checkbox.Group {...otherProps} {...valueProps} {...insetify(props)} />;
    }

    RadioGroup = (props) => {
        const valueProps = getValueProps(props);

        if (props.status === 'preview') return renderOption(props);
        return <this.Antd.Radio.Group {...props} {...valueProps} {...insetify(props)} />;
    }

    Checkbox = (props) => {
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatBoolValue,
            keyname: 'checked',
        });

        if (props.status === 'preview') {
            const checked = formatBoolValue(props.value);
            if (props.children) { // 存在label
                return checked ? renderValue(props.children) : null;
            } // 不存在
            window && window.console && window.console.warn('label必须写在Checkbox内，如需编写外部label, 请使用suffix、prefix等属性'); // 给出警告
            return null;
        }

        const beforeChange = (e) => {
            const checkedVal = e.target.checked;
            const { onChange } = props;
            onChange && onChange(checkedVal);
        };

        return <this.Antd.Checkbox {...otherProps} {...valueProps} onChange={beforeChange} />;
    }

    Radio = (props) => {
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatBoolValue,
            keyname: 'checked',
        });

        if (props.status === 'preview') {
            const checked = formatBoolValue(props.value);
            if (props.children) { // 存在label
                return checked ? renderValue(props.children) : null;
            } // 不存在
            window && window.console && window.console.warn('label必须写在Radio内，如需编写外部label, 请使用suffix、prefix等属性'); // 给出警告
            return null;
        }

        const beforeChange = (e) => {
            const checkedVal = e.target.checked;
            const { onChange } = props;
            onChange && onChange(checkedVal);
        };

        return <this.Antd.Radio {...otherProps} {...valueProps} onChange={beforeChange} />;
    }

    Switch = (props) => {
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatBoolValue,
            keyname: 'checked',
        });

        if (props.status === 'preview') {
            const checked = formatBoolValue(props.value);
            if (props.checkedChildren || props.unCheckedChildren) { // 存在label
                const checkedStr = checked ? props.checkedChildren : props.unCheckedChildren;
                return renderValue(checkedStr);
            } // 不存在
            return renderValue(`${checked}`);
        }

        return <this.Antd.Switch {...otherProps} {...valueProps} />;
    }

    Slider = (props) => {
        const { className = '', value } = props;
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatNumber,
        });

        if (props.status === 'preview') {
            return <this.Antd.Slider className={`${className || ''} ${prefix}-preview-slider`} {...props} disabled value={formatValue(value)} />;
        }

        return <this.Antd.Slider {...otherProps} {...valueProps} />;
    }

    DatePicker = (props) => {
        const { className = '', value } = props;
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : val),
        });

        if (props.status === 'preview') {
            const placeholderClearer = {
                datePlaceholder: '',
                monthPlaceholder: '',
                yearPlaceholder: '',
                rangeStartPlaceholder: '',
                rangeEndPlaceholder: '',
            };

            return <this.Antd.DatePicker placeholder="" {...otherProps} value={value} locale={placeholderClearer} disabled className={`${className || ''} ${prefix}-preview-datepicker`} />;
        }

        const onChange = (momentVal) => {
            const { onChange } = props;
            onChange && onChange(momentVal, { escape: true });
        };

        return <this.Antd.DatePicker {...otherProps} {...valueProps} onChange={onChange} {...insetify(props)} />;
    }

    SubDatePicker = (subType, props) => {
        const { className = '', value } = props;
        const valueProps = getValueProps(props);
        const SubDatePicker = this.Antd.DatePicker[subType];

        if (props.status === 'preview') {
            const placeholderClearer = {
                datePlaceholder: '',
                monthPlaceholder: '',
                yearPlaceholder: '',
                rangeStartPlaceholder: '',
                rangeEndPlaceholder: '',
            };

            if (value === null || (Array.isArray(value) && value.length === 0)) {
                return null;
            }

            return <SubDatePicker placeholder="" {...props} value={value} locale={placeholderClearer} disabled className={`${className || ''} ${prefix}-preview-datepicker`} />;
        }

        const onChange = (momentVal) => {
            const { onChange } = props;
            onChange && onChange(momentVal, { escape: true });
        };

        return <SubDatePicker {...props} {...valueProps} onChange={onChange} {...insetify(props)} />;
    }

    TimePicker = (props) => {
        const otherProps = getCleanProps(props);
        const { className = '', value } = props;
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : val),
        });

        if (props.status === 'preview') {
            const placeholderClearer = {
                placeholder: '',
            };
            return <this.Antd.TimePicker placeholder="" {...otherProps} value={value} locale={placeholderClearer} disabled className={`${className || ''} ${prefix}-preview-datepicker`} />;
        }

        const onChange = (momentVal, formatDate) => {
            const { onChange } = props;
            onChange && onChange(momentVal, { escape: true });
        };

        return <this.Antd.TimePicker {...otherProps} {...valueProps} onChange={onChange} {...insetify(props)} />;
    }

    InputNumber = (props) => {
        const { value } = props;
        const valueProps = getValueProps(props);

        if (props.status === 'preview') return renderValue(value); // 处理预览态

        return <this.Antd.InputNumber {...props} {...valueProps} {...insetify(props)} />;
    }

    Rate = (props) => {
        const { value } = props;
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props, {
            format: formatNumber,
        });

        if (props.status === 'preview') {
            return <this.Antd.Rate {...otherProps} disabled value={formatValue(value)} />;
        }

        return <this.Antd.Rate {...otherProps} {...valueProps} />;
    }

    Cascader = (props) => {
        const { className = '', value } = props;
        const valueProps = getValueProps(props);
        const otherProps = getCleanProps(props);

        if (props.status === 'preview') {
            return <this.Antd.Cascader {...props} className={`${className || ''} ${prefix}-preview-select`} disabled value={formatValue(value)} placeholder="" />;
        }
        return <this.Antd.Cascader {...otherProps} {...valueProps} {...insetify(props)} />;
    }

    TreeSelect = (props) => {
        const { className = '', value } = props;
        const valueProps = getValueProps(props);
        if (props.status === 'preview') {
            return <this.Antd.TreeSelect placeholder="" {...props} className={`${className || ''} ${prefix}-preview-select`} disabled value={formatValue(value)} />;
        }
        return <this.Antd.TreeSelect {...props} {...valueProps} {...insetify(props)} />;
    }

    Upload = (props) => {
        const value = formatArray(props.value);
        const { name, ...others } = props;
        const { className = '' } = props;

        if (props.status === 'preview') {
            return <this.Antd.Upload {...defaultFileUploadProps} {...others} onChange={onChange} className={`${className || ''} ${prefix}-preview-upload`} disabled fileList={value} />;
        }

        const onChange = (origin) => {
            const { fileList = [] } = origin || {};
            props.onChange && props.onChange(fileList);
        };

        return <this.Antd.Upload {...defaultFileUploadProps} {...others} onChange={onChange} fileList={value} />;
    }

    AutoComplete = (props) => {
        const { className = '', value } = props;
        const { options, ...others } = props;
        const valueProps = getValueProps(props);

        const opts = {};
        if (options && Array.isArray(options) && !props.children) {
            opts.children = options.map((item) => {
                const { label, value } = item;
                return <this.Antd.AutoComplete.Option key={value}>{label}</this.Antd.AutoComplete.Option>;
            });
        }

        if (props.status === 'preview') return <this.Antd.AutoComplete placeholder="" {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} {...insetify(props)} />;
        return <this.Antd.AutoComplete {...others} {...opts} {...valueProps} {...insetify(props)} />;
    }

    Mention = (props) => {
        const { className = '' } = props;
        const { value, options, ...others } = props;
        const { toContentState, toString } = this.Antd.Mention;
        const valueProps = getValueProps(props, {
            format: v => (typeof v === 'string' ? toContentState(v || '') : v),
        });

        const opts = {};
        if (Array.isArray(options) && !('suggestions' in props)) {
            opts.suggestions = options;
        }

        const onChange = (val) => {
            const { onChange } = props;
            onChange && onChange(val, { escape: true });
        };

        if (props.status === 'preview') return <this.Antd.Mention placeholder="" {...opts} {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} />;
        return <this.Antd.Mention {...others} {...opts} {...valueProps} onChange={onChange} {...insetify(props)} />;
    }

    format = () => {
        const result = ['Input',
            'Select',
            'Checkbox',
            'Radio',
            'AutoComplete',
            'Switch',
            'Slider',
            'DatePicker',
            'TimePicker',
            'InputNumber',
            'Rate',
            'Cascader',
            'TreeSelect',
            'Upload'].reduce((ret, key) => {
            this[key].displayName = `wrapper(${key})`;
            let extraProps = {};
            if (this.Antd[key]) {
                extraProps = { ...this.Antd[key] };
            }

            const that = this;
            Object.keys(extraProps).forEach((extraKey) => {
                that[key][extraKey] = extraProps[extraKey];
            });
            ret[key] = this[key];

            return ret;
        }, {});

        result.Checkbox.Group = this.CheckboxGroup;
        result.Radio.Group = this.RadioGroup;
        result.Input.TextArea = this.TextArea;
        result.DatePicker.RangePicker = this.SubDatePicker.bind(this, 'RangePicker');
        result.DatePicker.MonthPicker = this.SubDatePicker.bind(this, 'MonthPicker');
        result.DatePicker.WeekPicker = this.SubDatePicker.bind(this, 'WeekPicker');

        if (this.Antd.Select) {
            result.Select.Option.displayName = 'wrapper(Option)';
        }

        return {
            ...this.Antd,
            ...result,
        };
    }
}

function wrapper(AntdSource) {
    const instance = new WrapperClass(AntdSource);
    return instance.format();
}

export default wrapper;
