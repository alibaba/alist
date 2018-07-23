const noop = v => v;

function formatValue(value) {
    if ([null, undefined].indexOf(value) !== -1) return null;
    return value; // 0 或 []直接返回
}

function formatArray(value) {
    if ([null, undefined].indexOf(value) !== -1) return [];
    return value;
}

function formatBoolValue(value) {
    if ([null, undefined].indexOf(value) !== -1) return false;
    if (`${value}` === 'true') {
        return true;
    } else if (`${value}` === 'false') {
        return false;
    }
    return false;
}

function getValueProps(props, opts = {}) {
    const valueProps = {};
    const { keyname = 'value', defaultValue = '', format = noop } = opts;
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
    if (Next && Next.moment) {
        return Next.moment(value).format('YYYY-MM-DD');
    }
    return value;
}

function log () {
    
}

export default {
    formatValue,
    formatArray,
    formatBoolValue,
    getValueProps,
    formatDate,
    log,
};
