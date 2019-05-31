import React from 'react';
import {
    renderValue, renderOption, insetify, 
    formatValue, formatArray, formatBoolValue, formatNumber,
    getValueProps, getCleanProps,
} from '../common/util';
import { moment2value } from '../common/moment';

const Text = (Com, props) => {
    const { status, value } = props;
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, { defaultValue: undefined });
    if (status === 'preview') return renderValue(formatValue(value, { defaultValue: '' })); // 处理预览态
    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
};

const Select = (Com, props, opts) => {
    const {
        status, dataSource, className = '', children, style = {},
    } = props;
    const { previewClass = '' } = opts || {};

    const otherProps = getCleanProps(props);
    const rewriteProps = {};
    if (dataSource && Array.isArray(dataSource) && !children) {
        rewriteProps.children = dataSource.map((item) => {
            const { label, value: itemVal } = item;
            return <Com.Option key={`${itemVal}_${label}`} value={itemVal}>{label}</Com.Option>;
        });
    }

    const valueProps = getValueProps(props, { defaultValue: undefined });
    const previewStyle = { ...style, pointerEvents: 'none' };

    if (status === 'preview') {
        return <Com placeholder="" {...otherProps}
            className={`${className || ''} ${previewClass}`} {...valueProps}
            style={previewStyle}
        />;
    }
    return <Com {...otherProps} {...rewriteProps} {...valueProps} {...insetify(props)} />;
}

const CheckboxGroup = (Com, props) => {
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatArray,
        defaultValue: []
    });

    if (props.status === 'preview') return renderOption(props);
    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
};

const RadioGroup = (Com, props) => {
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props);

    if (props.status === 'preview') return renderOption(props);
    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
};

const Checkbox = (Com, props, opts = {}) => {
    const { status, children, value } = props;
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatBoolValue,
        keyname: 'checked',
    });

    if (status === 'preview') {
        const { checked } = valueProps;
        if (children) { // 存在label
            return checked ? renderValue(children) : null;
        } // 不存在
        window && window.console && window.console.warn('label必须写在Checkbox/Radio内，如需编写外部label, 请使用suffix、prefix等属性'); // 给出警告
        return null;
    }

    return <Com value={value} {...otherProps} {...valueProps} {...opts} />;
}

const Radio = (Com, props, opts = {}) => {
    return Checkbox(Com, props, opts);
};

const Switch = (Com, props) => {
    const { status, checkedChildren, unCheckedChildren } = props;
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatBoolValue,
        keyname: 'checked',
    });

    if (status === 'preview') {
        const { checked } = valueProps;
        if (checkedChildren || unCheckedChildren) { // 存在label
            const checkedStr = checked ? checkedChildren : unCheckedChildren;
            return renderValue(checkedStr);
        }
        return renderValue(`${checked}`); // 不存在
    }

    return <Com {...otherProps} {...valueProps} />;
};

const Range = (Com, props, opts) => {
    const { status, className = '' } = props;
    const { previewClass = '' } = opts || {};
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatNumber,
    });

    if (status === 'preview') {
        return <Com className={`${className || ''} ${previewClass}`} {...otherProps} disabled {...valueProps} />;
    }

    return <Com {...otherProps} {...valueProps} />;
};

const Rate = (Com, props) => {
    const { status } = props;
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatNumber,
    });

    if (status === 'preview') {
        return <Com {...otherProps} disabled {...valueProps} />;
    }

    return <Com {...otherProps} {...valueProps} />;
};

const NumberPicker = (Com, props) => {
    const { status, value, format } = props;
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, {
        format: formatNumber,
        defaultValue: undefined
    });

    if (status === 'preview') return renderValue(value, { defaultValue: '', format }); // 处理预览态

    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
};

const CascaderSelect = (Com, props, opts) => {
    const { status, className = '', style = {} } = props;
    const { previewClass = '', previewStyle = style } = opts || {};
    const valueProps = getValueProps(props);
    const otherProps = getCleanProps(props);
    
    if (status === 'preview') {
        return <Com {...otherProps} className={`${className || ''} ${previewClass}`} {...valueProps} style={previewStyle} />;
    }
    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
};

const AutoComplete = (Com, props, opts) => {
    const { status, className = '' } = props;
    const { previewClass = '', previewProps = {} } = opts || {};
    const otherProps = getCleanProps(props);
    const valueProps = getValueProps(props, { defaultValue: undefined });

    if (status === 'preview') return <Com {...otherProps} disabled className={`${className || ''} ${previewClass}`} {...valueProps} {...insetify(props)} placeholder="" {...previewProps} />;
    return <Com {...otherProps} {...valueProps} {...insetify(props)} />;
}

const Upload = (Com, props, opts) => {
    const {
        status, value, className = '',
    } = props;
    const uploadValue = formatArray(value);
    const otherProps = getCleanProps(props);
    const { onChange, fieldName = 'value', defaultProps = {}, previewClass = '' } = opts || {};
    const valueProps = { [fieldName]: uploadValue };

    if (status === 'preview') {
        return <Com {...defaultProps} {...otherProps} className={`${className || ''} ${previewClass}`} disabled {...valueProps} />;
    }

    return <Com {...defaultProps} {...otherProps} onChange={onChange} {...valueProps} {...insetify(props)}/>;
};

const TimePicker = (Com, props, opts) => {
    const otherProps = getCleanProps(props);
    const { onChange, previewClass = '', valueProps } = opts || {};
    const { status, className = '' } = props;

    if (status === 'preview') {
        const placeholderClearer = { placeholder: '' };
        return <Com placeholder="" {...otherProps} {...valueProps} locale={placeholderClearer} disabled className={`${className || ''} ${previewClass}`} placeholder=""/>;
    }

    return <Com {...otherProps} {...valueProps} onChange={onChange} {...insetify(props)} />;
}

const DatePicker = (Com, props, opts) => {
    const { status, className = '' } = props;
    const otherProps = getCleanProps(props);
    const { valueProps, onChange, previewClass = '', previewProps = {} } = opts || {};
    if (status === 'preview') {
        return <Com {...otherProps} {...valueProps} {...previewProps} disabled className={`${className || ''} ${previewClass}`} placeholder="" />;
    }

    return <Com {...otherProps} {...valueProps} onChange={onChange} {...insetify(props)} />;
};

const SubDatePicker = (Com, subType, props, opts) => {
    const {
        status, className = '',
    } = props;
    const { onChange, valueProps = {},
        onPanelChange,
        previewClass = '', previewProps = {},
        format, prefix } = opts;

    const otherProps = getCleanProps(props);
    const SubDatePicker = Com[subType];
    const extProps = {};
    if (onPanelChange) extProps.onPanelChange = onPanelChange;

    if (status === 'preview') {
        const { value } = valueProps;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
            return null;
        }

        if (Array.isArray(value) && value.length === 2) {
            return (<div className={`${className || ''} ${previewClass}`}>
                {[value[0], { sep: true }, value[1]].map((item) => {
                    if (item.sep) {
                        return <span className={`${prefix}-calendar-range-picker-separator`}> ~ </span>;
                    }
                    return renderValue(moment2value(item, format));
                })}
            </div>);
        }
        return <SubDatePicker {...otherProps} {...valueProps} {...previewProps} disabled className={`${className || ''} ${previewClass}`} placeholder="" {...extProps}/>;
    }

    return <SubDatePicker {...otherProps} {...valueProps} onChange={onChange} {...insetify(props)} {...extProps}/>;
}

export {    
    Text,
    SubDatePicker,
    DatePicker,
    NumberPicker,
    AutoComplete,
    Switch,
    Radio,
    Range,
    Rate,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    CascaderSelect,
    Select,
    Upload,
    TimePicker
};
