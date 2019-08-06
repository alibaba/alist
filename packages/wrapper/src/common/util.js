const noop = v => v;
import React from 'react';

const isEmpty = (value) => ([undefined, null].indexOf(value) !== -1);

const renderValue = (value, opts = {}) => {
    const { format = noop } = opts;
    const hasDefaultValue = 'defaultValue' in opts;
    const defaultEmptyValue = hasDefaultValue ? opts.defaultValue : null;
    if (isEmpty(value)) return defaultEmptyValue; // 空值直接返回
    if (Array.isArray(value)) { // 数组需要判断版本号返回
        const arrValue = value.map((valItem, idx) => <span key={`${valItem}${idx}`} className="multi-value-item">{valItem}</span>);
        return <span className="multi-value-item-wrapper">{arrValue}</span>;
    }

    const singleFormatValue = format(value);
    return <span className="multi-value-item">{singleFormatValue}</span>;
};

const renderOption = (props = {}) => { // 处理
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
};

const insetify = (props) => {
    const insetProps = {};
    const { className, inset } = props || {};
    if (inset) insetProps.className = `${(className || '')} inset-component`;
    return insetProps;
};

function getCleanProps(props) {
    const otherProps = { ...props };
    delete otherProps.status;
    delete otherProps.value;
    delete otherProps.inset;
    delete otherProps.error;
    return otherProps;
}

function getValueProps(props, opts = {}) {
    const valueProps = {};
    const { keyname = 'value', format = noop } = opts;
    const defaultValue = 'defaultValue' in opts ? defaultValue : '';
    if ('value' in props) {
        const propVal = props.value;
        if ([null, undefined].indexOf(propVal) !== -1) {
            valueProps[keyname] = format(defaultValue);
        } else {
            valueProps[keyname] = format(propVal);
        }
    }

    return valueProps;
}

function formatValue(value, opts = {}) {
    const hasDefaultValue = 'defaultValue' in opts;
    const defaultEmptyValue = hasDefaultValue ? opts.defaultValue : null;
    if (isEmpty(value)) return defaultEmptyValue;
    return value; // 0 或 []直接返回
}

function formatArray(value) {
    if (isEmpty(value)) return [];
    return value;
}

function formatArrayNumber(value) {
    if (isEmpty(value)) return [];
    return value.map(item => formatNumber(item));
}

function formatBoolValue(value) {
    if (isEmpty(value)) return undefined;
    if (`${value}` === 'true') {
        return true;
    } else if (`${value}` === 'false') {
        return false;
    }
    return false;
}

function formatDate(value) {
    if (isEmpty(value)) return undefined;
    if (Next && Next.moment) {
        return Next.moment(value).format('YYYY-MM-DD');
    }
    return value;
}

function log () {
    
}

function formatNumber(value) {
    if (isEmpty(value)) return undefined;
    if (['0', 0, ''].indexOf(value) !== -1) return 0;
    return Number(value);
}

export {
    noop,
    formatValue,
    formatArray,
    formatBoolValue,
    formatArrayNumber,
    getValueProps,
    formatDate,
    log,
    getCleanProps,
    renderValue,
    renderOption,
    insetify,
    formatNumber,
};
