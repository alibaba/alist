const noop = v => v;

function formatValue(value) {
    if ([null, undefined].indexOf(value) !== -1) return null;
    return value; // 0 或 []直接返回
}

function formatArray(value) {
    if (['', null, undefined].indexOf(value) !== -1) return [];
    return value;
}


function moment2value(value, format) {
    if (value && value._isAMomentObject) {
        return value.format(format);
    }
    return null;
}

function formatNumber(value) {
    if (['0', 0, '', null, undefined].indexOf(value) !== -1) return 0;
    return Number(value);
}

function formatBoolValue(value) {
    if (['', null, undefined].indexOf(value) !== -1) return false;
    if (`${value}` === 'true') {
        return true;
    } else if (`${value}` === 'false') {
        return false;
    }
    return false;
}

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
    const defaultValue = 'defaultValue' in opts ? opts.defaultValue : '';
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

function formatDate(value) {
    if (value === null || value === undefined) return '';
    // if (Next && Next.moment) {
    //     return Next.moment(value).format('YYYY-MM-DD');
    // }
    return value;
}

function log() {

}

export {
    formatValue,
    formatArray,
    formatNumber,
    formatBoolValue,
    getValueProps,
    formatDate,
    getCleanProps,
    moment2value,
    log,
};
