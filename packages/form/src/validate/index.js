function isEmpty(value) {
    return value === undefined || value === null || String(value).trim() === '';
}
export function configRules(local = 'zh_CN') {
    return {
        zh_CN: {
            required: (label, message) => {
                const msg = !message ? label : message;
                
                return {                
                    validator(rule, value, callback) {
                        if (isEmpty(value)) {
                            callback([new Error(msg || '必填')]);
                        } else {
                            callback([]);
                        }
                    },
                }
            },
            number: (message) => ({
                validator(rule, value, callback) {
                    const errors = [];
                    const err = new Error(message || '只能输入数字');
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (isNaN(Number(value))) { // eslint-disable-line
                        errors.push(err);
                    } else if (typeof value !== 'string' && typeof value !== 'number') {
                        errors.push(err);
                    }
                    callback(errors);
                },
            }),
            int: (message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (!/^[1-9]\d*$/.test(value)) {
                        callback([new Error(message || '只能输入正整数')]);
                    } else {
                        callback([]);
                    }
                },
            }),
            uint: (message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (!/^\d+$/.test(value)) {
                        callback([new Error(message || '只能输入非负整数')]);
                    } else {
                        callback([]);
                    }
                },
            }),
            length: (length, message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (String(value).length !== length) {
                        callback([new Error(message || `长度只能是${length}个字符`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            minLength: (min, message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (String(value).length < min) {
                        callback([new Error(message || `长度不能少于${min}个字符`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            maxLength: (max, message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (String(value).length > max) {
                        callback([new Error(message || `长度不能超过${max}个字符`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            eq: (val, message) => {
                if (!message) {
                    throw Error('应当为 eq 规则指定 message');
                }
                return {
                    validator(rule, value, callback, source) {
                        if (!(rule.field in source)) {
                            callback([]);
                        } else if (value !== val) {
                            callback([new Error(message)]);
                        } else {
                            callback([]);
                        }
                    },
                };
            },
            min: (min, message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (Number(value) < min) {
                        callback([new Error(message || `不能小于${min}`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            max: (max, message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (Number(value) > max) {
                        callback([new Error(message || `不能大于${max}`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            email: (message) => ({
                type: 'email',
                message: message || '邮箱格式不正确',
            }),
            url: (message) => ({
                type: 'url',
                message: message || '链接格式不正确,请以 http:// 或者 https:// 开头',
            }),
            phone: message => ({
                pattern: /^\d{6,}$/,
                message: message || '错误的电话格式',
            }),
            equal: (field, message) => {
                if (!message) {
                    throw Error('应当为 equal 规则指定 message');
                }
                return {
                    validator(rule, value, callback, source) {
                        if (isEmpty(value)) {
                            callback([]);
                        } else if (value !== source[field]) {
                            callback([new Error(message)]);
                        } else {
                            callback([]);
                        }
                    },
                };
            },
            precision: (precision, message) => ({
                validator(rule, value, callback) {
                    const regex = new RegExp(`^(\\d+(\\.[\\d]{1,${precision}})?)?$`, 'g');
                    if (!regex.test(value)) {
                        callback([new Error(message || `必须精确到${precision}位小数`)]);
                    } else {
                        callback([]);
                    }
                },
            }),
            alphabet: (message) => ({
                pattern: /^[a-z]*$/i,
                message: message || '只允许输入英文字母',
            }),
            words: (message) => ({
                pattern: /^[a-z0-9]*$/i,
                message: message || '只允许输入英文字母和数字',
            }),
            ascii: (message) => ({
                pattern: /^[\x00-\x7F]*$/, // eslint-disable-line
                message: message || '只允许输入英文字母标点和数字',
            }),
            idCard: (message) => ({
                pattern: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
                message: message || '请输入正确的身份证号',
            }),
            mobile: (message) => ({
                pattern: /^1\d{10}$/,
                message: message || '请输入正确的手机号码',
            }),
            hsCode: (message) => ({
                validator(rule, value, callback) {
                    if (isEmpty(value)) {
                        callback([]);
                    } else if (!/^\d{8}|\d{10}|\d{8}\.\d{2}$/.test(value)) {
                        callback([new Error(message || '请输入正确的HSCODE')]);
                    } else {
                        callback([]);
                    }
                },
            }),
        },
    }[local];
}
export default configRules();
