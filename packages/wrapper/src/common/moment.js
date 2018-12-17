const moment2value = (value, format) => {
    if (value && value._isAMomentObject) {
        return value.format(format);
    } else {
        return null;
    }
};

const value2moment = (moment, value, format) => {
    if ([null, undefined].indexOf(value) !== -1) {
        return undefined;
    } else if (value && !value._isAMomentObject) {
        return moment(value, format, true);
    } else {
        return value;
    }
};

export {
    moment2value,
    value2moment
};