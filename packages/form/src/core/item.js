import AsyncValidator from 'async-validator';
import deepEqual from 'deep-equal';
import { ANY_CHANGE, BASIC_EVENT, STATUS_ENUMS } from '../static';
import genId from '../util/random';
import { isPromise } from '../util/is';

function isFunction(func) {
    return typeof func === 'function';
}

class Item {
    constructor(option) {
        if (!option) return; // context的机制，这里不做真实的操作
        this.option = option;
        this.initWith(option);
        this.on(ANY_CHANGE, () => {
            if (!this.consistenting) {
                this.selfConsistent();
            }
        });
    }

    validate(cb = e => e, opts) {
        let { validateConfig } = this;
        const { subField } = this;
        let errors = null;

        if (typeof validateConfig === 'function') {
            validateConfig = validateConfig(this.form.value, this.form);
        }

        if (!validateConfig && !subField) {
            return cb(errors); // 直接返回空
        }

        // 需要判断是否有更下层的校验(组件层面)
        let subValidator = null;
        let hasSubPromise = false;

        if (subField) {
            errors = { // 错误需要增加一个维度，才能满足子项校验
                main: null,
                sub: null,
            };
            const result = subField.validate(undefined, opts);
            if (isPromise(result)) {
                hasSubPromise = true;
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
                    if (err) {
                        const mainError = err[0].message;
                        if (subField) {
                            errors.main = mainError;
                        } else {
                            errors = mainError;
                        }
                    }
                    walked = true;
                    resolve(errors);
                });
            }).catch(() => {
                // do nothing...
            });
        } else {
            walked = true;
        }

        // 处理子项是promise的情况
        const subPromiseHandler = () => Promise.resolve(subValidator).then((subErr) => {
            errors.sub = subErr;
            return errors;
        }).then(cb);

        if (walked) {
            if (hasSubPromise) {
                return subPromiseHandler(errors);
            }

            if (subField) {
                errors.sub = subValidator;
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

    bindForm = (childForm) => {
        // console.log('item inner exec bindForm ...');
        this.childForm = childForm;
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
            id, interceptor, name, value, props, error,
            status, when = null, validateConfig, parentIf,
            func_status, func_props, jsx_status,
        } = option;

        this.name = name;
        this.value = value;
        this.props = props;
        this.status = status;
        this.when = when;
        this.parentIf = parentIf;
        this.error = error;
        this.validateConfig = validateConfig;
        this.interceptor = interceptor;
        this.subField = null;
        this.id = id || `__noform__item__${genId()}`;

        this.func_props = func_props;
        this.func_status = func_status;
        this.jsx_status = jsx_status;

        if (validateConfig) {
            this.jsxValidate = true;
        }

        this.selfConsistent();
    }

    consistValidate() {
        if (this.name && this.form && this.form.validateConfig &&
            (this.name in this.form.validateConfig) &&
            !this.jsxValidate) {
            const currentValidateConfig = this.form.validateConfig[this.name];
            this.validateConfig = currentValidateConfig;
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

    consistStatus(value, silent = false) {
        const {
            form, func_status, when, jsx_status,
            calulateWhen,
        } = this;

        let syncSetting = true;
        let statusResult = form.globalStatus;
        const escape = false;
        const whenResult = when ? this.calulateWhen(value, when) : false;
        const canConsistWhen = when === null || whenResult;

        if (jsx_status) { // 可能为promise
            if (isFunction(func_status)) {
                statusResult = func_status(value, form);
                if (isPromise(statusResult)) {
                    syncSetting = false;
                    statusResult.then((dynamicResult) => {
                        if (dynamicResult && STATUS_ENUMS.has(dynamicResult) && canConsistWhen) {
                        // if (dynamicResult && STATUS_ENUMS.has(dynamicResult) && when === null) {
                            this.set('status', dynamicResult, escape, silent);
                        }
                    });
                }
            } else if (jsx_status && STATUS_ENUMS.has(jsx_status)) { // 写死JSX状态
                statusResult = jsx_status;
            }

            // if (syncSetting && statusResult && STATUS_ENUMS.has(statusResult) && when === null) {
            if (syncSetting && statusResult && STATUS_ENUMS.has(statusResult) && canConsistWhen) {
                this.set('status', statusResult, escape, silent);
            }            
        }

        return statusResult;
    }

    consistProps() {
        const { form, func_props } = this;
        if (isFunction(func_props)) {
            const props = form.getAll('props', this.name);
            const propsResult = func_props(props, form);

            if (isPromise(propsResult)) {
                propsResult.then((dynamicPropResult) => {
                    this.set('props', dynamicPropResult);
                });
            } else {
                this.set('props', propsResult);
            }
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

    async set(type, value, escape = false, silent = false) {
        let ftValue = value;

        // interceptor一般为function, 在类型为value时处理
        if (type === 'value' && typeof this.interceptor === 'function') {
            const ftResult = this.interceptor(value);
            if (isPromise(ftResult)) {
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
        this.form.escape[this.name] = escape;

        if (!silent) {
            this.emit(BASIC_EVENT[type], this.name, ftValue);
            this.emit(ANY_CHANGE, type, this.name, ftValue);
        }     
        return true;
    }
}

export default Item;
