import React from 'react';

const IS_REACT_GREATER_FITHTEEN = parseInt(React.version, 10) > 15;
let Antd;

const prefix = 'ant';
const noop = v => v;
function formatValue(value) {
    if (value === null || value === undefined) return '';
    return value; // 0 或 []直接返回
}

function formatArray(value) {
    if (value === null || value === undefined) return [];
    return value;
}

function formatBoolValue(value) {
    if (value === null || value === undefined) return false;
    if (value === true || value === 'true') {
        return true;
    } else if (value === false || value === 'false') {
        return false;
    }
    return false;
}

function getValueProps(props, opts = {}) {
    const valueProps = {};
    const { keyname = 'value', defaultValue = '', format = noop } = opts;
    if ('value' in props) {
        valueProps[keyname] = format(props.value || defaultValue);
    }

    return valueProps;
}


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
function Input(props) {
    const { error, status, value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderValue(formatValue(value)); // 处理预览态
    return <Antd.Input {...props} {...valueProps} />;
}

function Textarea(props) {
    const { error, status, value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderValue(formatValue(value)); // 处理预览态
    return <Antd.Input.TextArea {...props} {...valueProps} />;
}

function Select(props) {
    const { className = '', value } = props;
    const { options, ...others } = props;
    const opts = {};
    if (options && Array.isArray(options) && !props.children) {
        opts.children = options.map((item) => {
            const { label, value } = item;
            return <Antd.Select.Option value={value}>{label}</Antd.Select.Option>;
        });
    }

    const valueProps = getValueProps(props);

    if (props.status === 'preview') return <Antd.Select placeholder="" {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} />;
    return <Antd.Select {...others} {...opts} {...valueProps} />;
}

function CheckboxGroup(props) {
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderOption(props);
    return <Antd.Checkbox.Group {...props} {...valueProps} />;
}

function RadioGroup(props) {
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderOption(props);
    return <Antd.Radio.Group {...props} {...valueProps} />;
}

function Checkbox(props) {
    const valueProps = getValueProps(props, {
        format: formatBoolValue,
        keyname: 'checked',
    });

    if (props.status === 'preview') {
        const checked = formatBoolValue(props.value);
        if (props.children) { // 存在label
            return checked ? renderValue(props.children) : null;
        } // 不存在
        console.warn('label必须写在Checkbox内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告
        return null;
    }

    const beforeChange = (e) => {
        const checkedVal = e.target.checked;
        const { onChange } = props;
        onChange && onChange(checkedVal);
    };

    return <Antd.Checkbox {...props} {...valueProps} onChange={beforeChange} />;
}

function Radio(props) {
    const valueProps = getValueProps(props, {
        format: formatBoolValue,
        keyname: 'checked',
    });

    if (props.status === 'preview') {
        const checked = formatBoolValue(props.value);
        if (props.children) { // 存在label
            return checked ? renderValue(props.children) : null;
        } // 不存在
        console.warn('label必须写在Radio内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告
        return null;
    }

    const beforeChange = (e) => {
        const checkedVal = e.target.checked;
        const { onChange } = props;
        onChange && onChange(checkedVal);
    };

    return <Antd.Radio {...props} {...valueProps} onChange={beforeChange} />;
}

function Switch(props) {
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

    return <Antd.Switch {...props} {...valueProps} />;
}

function Slider(props) {
    const { className = '', value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') {
        return <Antd.Slider className={`${className || ''} ${prefix}-preview-slider`} {...props} disabled value={formatValue(value)} />;
    }

    return <Antd.Slider {...props} {...valueProps} />;
}

function DatePicker(props) {
    const { className = '', value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') {
        const placeholderClearer = {
            datePlaceholder: '',
            monthPlaceholder: '',
            yearPlaceholder: '',
            rangeStartPlaceholder: '',
            rangeEndPlaceholder: '',
        };

        return <Antd.DatePicker placeholder="" {...props} value={value} locale={placeholderClearer} disabled className={`${className || ''} ${prefix}-preview-datepicker`} />;
    }

    const onChange = (momentVal, formatDate) => {
        const { onChange } = props;
        onChange && onChange(momentVal, { escape: true });
    };

    return <Antd.DatePicker {...props} {...valueProps} onChange={onChange} />;
}

function TimePicker(props) {
    const { className = '', value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') {
        const placeholderClearer = {
            placeholder: '',
        };
        return <Antd.TimePicker placeholder="" {...props} value={value} locale={placeholderClearer} disabled className={`${className || ''} ${prefix}-preview-datepicker`} />;
    }

    const onChange = (momentVal, formatDate) => {
        const { onChange } = props;
        onChange && onChange(momentVal, { escape: true });
    };

    return <Antd.TimePicker {...props} {...valueProps} onChange={onChange} />;
}

function InputNumber(props) {
    const { value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return <Antd.InputNumber {...props} {...valueProps} />;
}

function Rate(props) {
    const { value } = props;
    const valueProps = getValueProps(props);

    if (props.status === 'preview') {
        return <Antd.Rate {...props} disabled value={formatValue(value)} />;
    }

    return <Antd.Rate {...props} {...valueProps} />;
}

function Cascader(props) {
    const { className = '', value } = props;
    const valueProps = getValueProps(props);
    if (props.status === 'preview') {
        return <Antd.Cascader placeholder="" {...props} className={`${className || ''} ${prefix}-preview-select`} disabled value={formatValue(value)} />;
    }
    return <Antd.Cascader {...props} {...valueProps} />;
}

function TreeSelect(props) {
    const { className = '', value } = props;
    const valueProps = getValueProps(props);
    if (props.status === 'preview') {
        return <Antd.TreeSelect placeholder="" {...props} className={`${className || ''} ${prefix}-preview-select`} disabled value={formatValue(value)} />;
    }
    return <Antd.TreeSelect {...props} {...valueProps} />;
}

function Upload(props) {
    const value = formatArray(props.value);
    const { name, ...others } = props;
    const { className = '' } = props;

    if (props.status === 'preview') {
        return <Antd.Upload {...defaultFileUploadProps} {...others} onChange={onChange} className={`${className || ''} ${prefix}-preview-upload`} disabled fileList={value} />;
    }

    const onChange = (origin) => {
        const { fileList = [] } = origin || {};
        props.onChange && props.onChange(fileList);
    };

    return <Antd.Upload {...defaultFileUploadProps} {...others} onChange={onChange} fileList={value} />;
}

function AutoComplete(props) {
    const { className = '', value } = props;
    const { options, ...others } = props;
    const valueProps = getValueProps(props);

    const opts = {};
    if (options && Array.isArray(options) && !props.children) {
        opts.children = options.map((item) => {
            const { label, value } = item;
            return <Antd.AutoComplete.Option key={value}>{label}</Antd.AutoComplete.Option>;
        });
    }

    if (props.status === 'preview') return <Antd.AutoComplete placeholder="" {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} />;
    return <Antd.AutoComplete {...others} {...opts} {...valueProps} />;
}

function Mention(props) {
    const { className = '' } = props;
    const { value, options, ...others } = props;
    const { toContentState, toString } = Antd.Mention;
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

    if (props.status === 'preview') return <Antd.Mention placeholder="" {...opts} {...props} disabled className={`${className || ''} ${prefix}-preview-select`} value={formatValue(value)} />;
    return <Antd.Mention {...others} {...opts} {...valueProps} onChange={onChange} />;
}

function wrapper(AntdSource) {
    Antd = AntdSource;

    if (Antd.Select && Antd.Select.Option) Select.Option = Antd.Select.Option;
    Checkbox.Group = CheckboxGroup;
    Radio.Group = RadioGroup;
    if (Antd.TreeSelect) TreeSelect.Node = Antd.TreeSelect.Node;
    Input.Textarea = Textarea;

    return {
        ...AntdSource,
        Input,
        Select,
        Checkbox,
        Radio,
        AutoComplete,
        Switch,
        Slider,
        DatePicker,
        TimePicker,
        InputNumber,
        Rate,
        Mention,
        Cascader,
        TreeSelect,
        Upload,
    };
}

export default wrapper;
