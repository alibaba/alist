import { format } from './util';

const rules = {
    string(value, field, source, schema) {
        const {
            required,
            maxLength = null,
            minLength = null,
            alphabet = null,
            singleChar = null,
            length = null,
        } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value;
        }
        if (value === undefined) {
            return ret;
        }
        ret.string = typeof value === 'string';

        if (maxLength !== null) {
            ret.maxLength = value.length <= maxLength;
        }
        if (minLength !== null) {
            ret.minLength = value.length >= minLength;
        }
        if (alphabet !== null) {
            ret.alphabet = /^[a-z]+$/i.test(value);
        }
        if (singleChar !== null) {
            ret.singleChar = value.length === 1;
        }
        if (length !== null) {
            ret.length = value.length === length;
        }
        return ret;
    },
    array(value, field, source, schema) {
        const { required, maxLength = null, minLength = null } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value;
        }
        if (value === undefined) {
            return ret;
        }
        ret.array = Array.isArray(value);

        if (maxLength !== null) {
            ret.maxLength = value.length <= maxLength;
        }
        if (minLength !== null) {
            ret.minLength = value.length >= minLength;
        }
        return ret;
    },
    number(value, field, source, schema) {
        const {
            required, max = null, min = null, decimal = null,
        } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.number = !!Number(value) || value === '0';

        if (max !== null) {
            ret.max = value <= max;
        }
        if (min !== null) {
            ret.min = value >= min;
        }
        if (decimal !== null) {
            ret.decimal = value.toString().length - value.toString().indexOf('.') <= decimal + 1;
        }
        return ret;
    },
    integer(value, field, source, schema) {
        const { required, max = null, min = null } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.integer = (Number(value) || value === '0') && value.toString().indexOf('.') === -1;

        if (max !== null) {
            ret.max = value <= max;
        }
        if (min !== null) {
            ret.min = value >= min;
        }
        return ret;
    },
    pattern(value, field, source, schema) {
        const { required, pattern = null } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.pattern = pattern.test(value);
        return ret;
    },
    email(value, field, source, schema) {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // eslint-disable-line
        const { required } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.email = emailPattern.test(value);
        return ret;
    },
    url(value, field, source, schema) {
        const urlPattern = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
        const { required } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.url = urlPattern.test(value);
        return ret;
    },
    tel(value, field, source, schema) {
        const telPattern = /^\d{6,}$/;
        const { required } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.tel = telPattern.test(value);
        return ret;
    },
    phone(value, field, source, schema) {
        const phonePattern = /^\d{11}$/;
        const { required } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.phone = phonePattern.test(value);
        return ret;
    },

    date(value, field, source, schema) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        const {
            required, max = null, min = null,
        } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.date = datePattern.test(value);

        if (max !== null) {
            ret.max = Math.floor(new Date(value).getTime() / 1000) <=
                Math.floor(new Date(max).getTime() / 1000);
        }
        if (min !== null) {
            ret.min = Math.floor(new Date(value).getTime() / 1000) >=
                Math.floor(new Date(min).getTime() / 1000);
        }
        return ret;
    },

    datetime(value, field, source, schema) {
        const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        const {
            required, max = null, min = null,
        } = schema;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.date = datePattern.test(value);

        if (max !== null) {
            ret.max = Math.floor(new Date(value).getTime() / 1000) <=
                Math.floor(new Date(max).getTime() / 1000);
        }
        if (min !== null) {
            ret.min = Math.floor(new Date(value).getTime() / 1000) >=
                Math.floor(new Date(min).getTime() / 1000);
        }
        return ret;
    },

    enum(value, field, source, schema) {
        const { required } = schema;
        const enums = schema.enum;
        const ret = {};
        if (required) {
            ret.required = !!value || value === 0;
        }
        if (value === undefined) {
            return ret;
        }
        ret.enum = enums.indexOf(value) > -1;
        return ret;
    },
};

export default class Rule {
    constructor(schema) {
        this.schema = schema;
        if (schema.validator) {
            this.validator = schema.validator;
        }
        if (schema.message) {
            this.message = schema.message;
        }
    }
    valid(value, field, source) {
        if (this.validator) {
            const result = this.validator(value, field, source, this.schema);
            return this.formatValid(result);
        } else if (this.pattern && this.schema.type !== 'pattern') {
            return this.pattern.test(value);
        }
        const { type } = this.schema;
        if (!type || !rules[type]) {
            console.warn('rule 不存在', this.schema.type, this.schema);
            return true;
        }
        return this.formatValid(rules[type](value, field, source, this.schema));
    }
    test(value, field, source) {
        const ret = this.valid(value, field, source);
        return typeof ret === 'boolean' ? ret : ret.length === 0;
    }
    validate(value, field, source) {
        const result = this.valid(value, field, source);
        if (result instanceof Promise) {
            return result.then(this.formatValidate);
        }
        return this.formatValidate(result, value, field, source);
    }
    formatValid = (ret) => {
        if (ret instanceof Promise) {
            return ret.then(this.formatValid);
        } else if (typeof ret === 'boolean') {
            return ret;
        }
        return Object.keys(ret)
            .map(key => ({ type: key, hasError: !ret[key] }))
            .filter(item => item.hasError);
    }
    formatValidate = (result, value, field) => {
        const msg = [];
        const label = this.schema.label || field;
        if (result === false) {
            return [{
                message: format(this.message, {
                    ...this.schema,
                    label,
                    value,
                }),
            }];
        } else if (result === true) {
            return null;
        }
        result.forEach((item) => {
            if (typeof this.message !== 'object' || !(item.type in this.message)) {
                throw Error(`schema.message must contain [${item.type}]`);
            }
            msg.push({
                type: item.type,
                message: format(this.message[item.type], {
                    ...this.schema,
                    label,
                    value,
                }),
            });
        });
        if (msg.length === 0) {
            return null;
        }
        return msg;
    }
}
