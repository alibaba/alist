import AsyncValidator from 'async-validator';
import deepEqual from 'deep-equal';
import { ANY_CHANGE, BASIC_EVENT, STATUS_ENUMS } from '../static';

function isFunction(func) {
    return typeof func === 'function';
}

class Item {
    constructor(option) {
        this.option = option;
        this.initWith(option);
        this.on(ANY_CHANGE, () => {
            if (!this.consistenting) {
                this.selfConsistent();
            }
        });
    }
    validate(cb = e => e) {
        let { validateConfig, subField } = this;
        let errors = null;
        if (typeof this.func_validateConfig === 'function') {
            validateConfig = this.func_validateConfig(this.form.value, this.form);
        }

        if (!validateConfig && !subField) {
            errors = null;
            cb(errors);
            return errors;
        }

        // 需要判断是否有更下层的校验(组件层面)
        let subValidator = null;
        let hasSubPromise = false;

        if (subField) {
            const result = subField.validate();
            if (result instanceof Promise) {
                hasSubPromise = true;
            } else {
                errors = result;
            }

            subValidator = result;
        }

        let walked = false;
        let prom = null;
        if (validateConfig) {
            this.validator = new AsyncValidator({
                [this.name]: validateConfig,
            });
            prom = new Promise((resolve) => {
                this.validator.validate({
                    [this.name]: this.get('value'),
                }, (err) => {
                    errors = err ? err[0].message : errors;
                    walked = true;
                    resolve(errors);
                });
            });
        } else {
            walked = true;
        }

        // 处理子项是promise的情况
        const subPromiseHandler = errMsg => Promise.resolve(subValidator).then(subErr => errMsg || subErr).then(cb);

        if (walked) {
            if (hasSubPromise) {
                return subPromiseHandler(errors);
            }
            return cb(errors);
        }

        if (prom) {
            return prom.then((errs) => {
                if (hasSubPromise) {
                    return subPromiseHandler(errs);
                }

                return cb(errs);
            });
        }
        return cb(errors);
    }
    updateField(option) {
        this.initWith({ ...this, ...option });
    }

    // 通用组件层，目前主要用于层级校验
    // 需要commonField实现validate
    addSubField(subField) {
        subField.parent = this;
        this.subField = subField;
    }

    initWith(option) {
        const {
            form, on, emit, removeListener,
        } = option;
        this.form = form;
        this.on = on;
        this.emit = emit;
        this.removeListener = removeListener;

        const {
            interceptor, name, value, props, error, status, when = null, validateConfig, parentIf,
        } = option;

        this.name = name;
        this.value = value;
        this.props = props;
        this.when = when;
        this.parentIf = parentIf;
        this.error = error;
        this.status = status;
        this.validateConfig = validateConfig;
        this.interceptor = interceptor;
        this.subField = null;

        const {
            jsx_status, func_props = null, func_status = null, func_validateConfig = null,
        } = option;
        this.func_props = func_props;
        this.func_status = func_status;

        this.jsx_status = jsx_status;
        this.func_validateConfig = func_validateConfig;

        if (func_validateConfig || validateConfig) {
            this.jsxValidate = true;
        }

        this.selfConsistent();
    }

    consistValidate() {
        if (this.name && this.form && this.form.validateConfig &&
            (this.name in this.form.validateConfig) &&
            !this.jsxValidate) {
            const currentValidateConfig = this.form.validateConfig[this.name];
            if (typeof currentValidateConfig === 'function') {
                this.func_validateConfig = currentValidateConfig;
            } else {
                this.validateConfig = currentValidateConfig;
            }
        }
    }

    consistWhen(value, status) {
        const { when, parentIf } = this;
        let whenResultFlag = this.calulateWhen(value, when);
        // 计算上层if链路结果，如果上层链路的结果不成功，则不需要计算了
        let upperWhenResult = true;
        if (parentIf) {
            upperWhenResult = this.calculateIfList(value);
        }

        if (!upperWhenResult) {
            whenResultFlag = false;
        }

        if (whenResultFlag === true) {
            this.set('status', status);
        } else if (whenResultFlag === false) {
            this.set('status', 'hidden');
        }
    }

    calculateIfList(value) {
        const { parentIf } = this;
        const upperIfList = [];
        let item = { parentIf };
        while (item.parentIf) {
            upperIfList.push(item.parentIf);
            item = item.parentIf;
        }
        // result表示上层整体的when的结果，如果有任意false，则整体结果为false，反之为true
        const boolList = upperIfList.map(ifCore => this.calulateWhen(value, ifCore.when));
        return boolList.reduce((before, after) => (before && after));
    }

    calulateWhen(value, when) {
        const { form } = this;
        let whenResult = when;
        if (isFunction(when)) whenResult = when(value, form); // 可能为promise

        return whenResult;
    }

    consistStatus(value) {
        const {
            form, jsx_status, func_status, when,
        } = this;
        let statusResult = form.globalStatus;
        if (jsx_status) {
            if (isFunction(func_status)) { // 可能为promise
                statusResult = func_status(value, form);
            } else if (STATUS_ENUMS.has(jsx_status)) { // 写死静态状态
                statusResult = jsx_status;
            }

            if (statusResult && STATUS_ENUMS.has(statusResult)) {
                if (when === null) this.set('status', statusResult);
            }
        }

        return statusResult;
    }

    consistProps() {
        const { form, func_props } = this;
        if (isFunction(func_props)) {
            const props = form.getAll('props', this.name);
            const propsResult = func_props(props, form);

            this.set('props', propsResult);
        }
    }

    // 自我调整
    selfConsistent() {
        this.consistenting = true; // debounce
        const value = this.form.getAll('value');

        const status = this.consistStatus(value); // 调整状态
        this.consistValidate(); // 调整校验规则
        this.consistWhen(value, status); // 调整联动判断
        this.consistProps(); // 调整属性

        this.consistenting = false;
    }

    setValidateConfig(config) {
        this.validateConfig = config;
    }

    get(type) {
        return this.form[type][this.name];
    }

    async set(type, value) {
        let ftValue = value;

        // interceptor一般为function, 在类型为value时处理
        if (type === 'value' && typeof this.interceptor === 'function') {
            const ftResult = this.interceptor(value);
            if (ftResult instanceof Promise) {
                const ftValTmp = await ftResult;
                if (ftValTmp !== undefined) ftValue = ftValTmp;
            } else if (ftResult !== undefined) {
                ftValue = ftResult;
            }
        }

        if (deepEqual(this[type], ftValue)) {
            return false;
        }
        this.form[type][this.name] = ftValue;
        this[type] = ftValue;

        this.emit(BASIC_EVENT[type], this.name, ftValue);
        this.emit(ANY_CHANGE, type, this.name, ftValue);
        return true;
    }
}

export default Item;
