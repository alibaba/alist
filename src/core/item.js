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
    validate() {
        let { validateConfig } = this;
        if (typeof this.option.func_validateConfig === 'function') {
            validateConfig = this.option.func_validateConfig(validateConfig, this.form);
        }

        if (!validateConfig) {
            return Promise.resolve(null);
        }
        this.validator = new AsyncValidator({
            [this.name]: validateConfig,
        });
        return new Promise((resolve) => {
            this.validator.validate({
                [this.name]: this.get('value'),
            }, (errors) => {
                if (errors) {
                    resolve(errors[0].message);
                } else {
                    resolve(null);
                }
            });
        });
    }
    updateField(option) {
        this.initWith({ ...this, ...option });
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
            interceptor, name, value, props, error, status, when = null, validateConfig,
        } = option;

        this.name = name;
        this.value = value;
        this.props = props;
        this.when = when;
        this.error = error;
        this.status = status;
        this.validateConfig = validateConfig;
        this.interceptor = interceptor;

        const {
            jsx_status, func_props = null, func_status = null, func_validateConfig = null,
        } = option;
        this.func_props = func_props;
        this.func_status = func_status;

        this.jsx_status = jsx_status;
        this.func_validateConfig = func_validateConfig;

        this.selfConsistent();
    }

    // 自我调整
    async selfConsistent() {
        this.consistenting = true; // debounce
        const {
            when, form, func_props, func_status, jsx_status,
        } = this;
        const value = form.getAll('value');

        // [status]静态变量可以直接await, 相当于new Promise().resolve(静态变量)
        let statusResult = this.form.globalStatus;
        if (jsx_status) {
            if (isFunction(func_status)) { // 可能为promise
                statusResult = func_status(value, form);
            } else if (STATUS_ENUMS.has(this.jsx_status)) { // 写死静态状态
                statusResult = this.jsx_status;
            }

            let statusResultVal = statusResult;
            if (statusResult instanceof Promise) {
                statusResultVal = await statusResult;
            }

            if (statusResultVal && STATUS_ENUMS.has(statusResultVal)) {
                statusResult = statusResultVal;
                if (when === null) this.set('status', statusResult);
            }
        }

        // [when]同上，直接await处理
        let whenResult = when;
        if (isFunction(when)) whenResult = when(value, form); // 可能为promise

        let whenResultFlag = whenResult;
        if (whenResult instanceof Promise) {
            whenResultFlag = await whenResult;
        }

        if (whenResultFlag === true) {
            this.set('status', statusResult);
        } else if (whenResultFlag === false) {
            this.set('status', 'hidden');
        }

        // [props]同上，直接await处理
        if (isFunction(func_props)) {
            const props = form.getAll('props', this.name);
            const propsResult = func_props(props, form);
            let tmpPropResult = propsResult;
            if (propsResult instanceof Promise) {
                tmpPropResult = await propsResult;
            }

            this.set('props', tmpPropResult);
        }

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
