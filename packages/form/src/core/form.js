import AsyncValidator from 'async-validator';
import EventEmitter from 'events';
import { FOCUS, BLUR, ON_EVENT, VALUE_CHANGE, CHANGE, ANY_CHANGE, BASIC_EVENT, INITIALIZED, REPEATER_IF_CHANGE } from '../static';
import ItemCore from './item';
import genId from '../util/random';
import scroll from '../util/scroll';
import { isPromise, isObject, isInvalidVal, isSingleItemSet } from '../util/is';

const genName = () => `__anonymouse__${genId()}`;
const noop = () => {};

class Form {
    constructor(option = {}) {
        const {
            validateConfig, onChange, props, value, values, status, globalStatus, interceptor, uniqueId,
            onEvent, onFocus, onBlur,
            initialized,
            autoValidate,
            disabledSyncChildForm,
            enableReceiveProps,
            initValues,
            exts,
            repeaterRowCore = false,
        } = option || {};

        this.onChange = onChange || noop;
        this.children = [];
        this.childrenMap = {};
        this.currentEventType = 'api';
        this.autoValidate = autoValidate || false;
        this.exts = exts || {};
        this.enableReceiveProps = enableReceiveProps || false; // breakChange 下个y位升级
        this.repeaterRowCore = repeaterRowCore; // 避免JSX和core定位不清

        this.initValues = initValues;
        this.globalStatus = globalStatus || 'edit';

        // 基础属性
        this.value = Object.assign({}, (values || value || initValues || {}));
        this.status = isObject(status) ? status : {}; // 避免jsx传入单值status
        this.props = Object.assign({}, props || {});
        this.error = {};
        this.public = {}; // 公共属性，由最顶层form维护

        this.escape = {}; // 用于避免嵌套form的filter逻辑的map
        this.interceptor = interceptor || {}; // 拦截器
        this.validateConfig = validateConfig;
        this.defaultSettingMap = {};

        this.onEvent = onEvent || noop;
        this.onFocus = onFocus || noop;
        this.onBlur = onBlur || noop;

        this.disabledSyncChildForm = disabledSyncChildForm || false; // 禁止子Form自动向Item同步数据
        this.id = uniqueId || `__noform__${genId()}`;

        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(1000); // TODO: 最大值

        Array.from(['Value', 'Status', 'Error', 'Props', 'Public']).forEach((name) => {
            // 多字段
            this[`set${name}`] = this.set.bind(this, name.toLowerCase());
            this[`get${name}`] = this.get.bind(this, name.toLowerCase());

            // 单字段
            this[`setItem${name}`] = this.setItem.bind(this, name.toLowerCase());
            this[`getItem${name}`] = this.get.bind(this, name.toLowerCase());
        });

        this.initialized = initialized || noop;

        // 别名
        this.setValues = this.setValue;
        this.getValues = this.getValue;

        // 处理item的setValue事件
        this.on(VALUE_CHANGE, this.handleChange);
        this.on(INITIALIZED, this.initialized);
        this.on(ON_EVENT, this.onEvent);
        this.on(FOCUS, this.onFocus);
        this.on(BLUR, this.onBlur);
        this.on(REPEATER_IF_CHANGE, this.handleRepeaterIfChange)
    }

    // repeater if change
    handleRepeaterIfChange = (name) => {
        this.onChange([name], this.value, this);
        this.emit(CHANGE, this.value, [name], this);
    }

    // 上报change事件到JSX
    handleChange = (name) => {
        if (!this.silent && !this.hasEmitted) { // 变化的keys必须为数组
            const relatedKeys = this.settingBatchKeys || [name];
            if (this.autoValidate) { // 按需校验
                const opts = this.currentEventOpts || {};
                this.validateItem(relatedKeys, undefined, opts);
            }

            this.onChange(relatedKeys, this.value, this);
            this.emit(CHANGE, this.value, relatedKeys, this);
        }

        if (this.silent) this.hasEmitted = false;
        if (this.isSetting) this.hasEmitted = true;
    }

    // 事件处理相关
    on(...args) { this.emitter.on(...args); }
    emit(...args) { this.emitter.emit(...args); }
    removeListener(...args) { this.emitter.removeListener(...args); }

    // 检验单项
    async validateItem(name, cb = x => x, opts = {}) {
        const { withRender = true } = opts || {};
        const arrName = [].concat(name);
        const validators = [];
        const validatorIdxMap = {};
        const childList = [];
        this.children.forEach((child) => {
            if (arrName.indexOf(child.name) !== -1) {
                validatorIdxMap[child.name] = validators.length;
                validators.push(child.validate(undefined, opts || {}));
                childList.push(child);
            }
        });

        this.validatng = true;
        const errs = await Promise.all(validators);
        this.validatng = false;

        const { success, errors4Setting, errors4User } = this.handleErrors(errs, childList);

        if (withRender) {
            this.setError(errors4Setting);
        }
        
        if (success) {
            return cb(null);
        } else {
            return cb(errors4User);
        }
    }

    // 纯净的校验方法, ui无关，不会涉及页面error 展示
    // 有别于validate方法是，不进行挂载，直接校验值
    validateAll = (cb = x => x) => {
        return this.validatePure(this.value, cb);
    }

    // 纯净的校验方法, ui无关，不会涉及页面error 展示
    // 有别于validate方法是，不进行挂载，直接校验值
    validatePure = (values, cb = x => x) => {
        const fillValidateConfig = {};
        Object.keys(this.validateConfig).forEach((key) => {
            if (typeof this.validateConfig[key] === 'function') {
                fillValidateConfig[key] = this.validateConfig[key](values, this);
            } else {
                fillValidateConfig[key] = this.validateConfig[key];
            }
        });
        const validator = new AsyncValidator(fillValidateConfig);
        let walked = false;
        let errors = null;
        const prom = new Promise((resolve) => {
            validator.validate(values, (err) => {
                errors = err ? err[0].message : errors;
                walked = true;
                resolve(errors);
            });
        });

        if (walked) {
            return cb(errors);
        }
        return prom.then(errs => cb(errs));
    }

    // 表单校验,返回错误对象
    validateBase(cb, withRender) {
        const allkey = this.children.map(item => item.name);
        return this.validateItem(allkey, cb, { withRender });
    }

    validateWithoutRender(cb) {
        return this.validateBase(cb, false);
    }
    // 表单校验,返回错误对象
    validate(cb = x => x) {        
        return this.validateBase(cb, true);
    }

    scrollToError() { // 滚动到第一个报错的地方
        const errKeys = Object.keys(this.error).filter((key) => {
            if (isObject(this.error[key])) {
                const { main, sub } = this.error[key];
                return main || sub;
            } else if (this.error[key]) {
                return true;
            }
            return false;
        });

        if (errKeys[0]) {
            const errorItem = this.children.find(item => item.name === errKeys[0]);
            if (errorItem && errorItem.id) {
                scroll(`#${errorItem.id}`);
            }
        }
    }

    handleErrors = (errs, childList) => {
        const errors = {};
        const retErr = {};
        let hasError = false;
        this.validatng = false;

        const children = childList || this.children;
        children.forEach((child, idx) => {
            let currentHasError = false;
            const currentError = errs[idx];
            if (isObject(errs[idx])) {
                const { main, sub } = errs[idx];
                if ((main || sub) && child.status !== 'hidden') {
                    hasError = true;
                    currentHasError = true;
                }
            } else if (currentError && child.status !== 'hidden') {
                hasError = true;
                currentHasError = true;
            }

            if (currentHasError && child.status !== 'hidden') {
                retErr[child.name] = currentError;
            }

            if (child.status === 'hidden') {
                errors[child.name] = null;
            } else {
                errors[child.name] = currentError || null;
            }
        });

        return {
            success: !hasError,
            errors4Setting: errors,
            errors4User: retErr,
        };
    }
    // 静默设值
    setValueSilent(...args) {
        this.silent = true;
        this.set('value', ...args);
        this.silent = false;
    }

    // 设置单子段
    setItem(type, name, value) {
        this.isSetting = true;
        let formatValue = value;

        // 处理props的情况，merge合并
        if (type === 'props') {
            const lastProps = this[type][name] || {};
            formatValue = value || {};
            formatValue = {
                ...lastProps,
                ...formatValue,
            };
        }

        this[type][name] = formatValue;
        const targetItem = this.children.find(child => child.name === name);
        if (targetItem) targetItem.set(type, formatValue);

        if (type === 'value') { // 处理不在childNames里的值
            const childNames = this.children.map(child => child.name);
            if (childNames.indexOf(name) === -1) {
                this.emit(BASIC_EVENT[type], name, formatValue);
                this.emit(ANY_CHANGE, type, name, formatValue);
            }
        }

        this.isSetting = false;
        this.hasEmitted = false;
    }

    // 重置value
    reset(keys) {
        let emptyValue = {};
        let resetKeys = [];
        if (Array.isArray(keys) && !this.initValues) {
            resetKeys = keys;
        } else {
            resetKeys = Object.keys(this.value);
        }

        resetKeys.forEach((key) => {
            emptyValue[key] = null;
        });

        if (this.initValues) {
            emptyValue = {
                ...emptyValue,
                ...this.initValues,
            }
        }

        this.setValue(emptyValue);
    }

    // 重置错误信息
    resetError(keys) {
        let emptyValue = {};
        let resetKeys = [];
        if (Array.isArray(keys)) {
            resetKeys = keys;
        } else {
            resetKeys = Object.keys(this.value);
        }

        resetKeys.forEach((key) => {
            emptyValue[key] = null;
        });

        this.setError(emptyValue);
    }

    // 设置多字段
    set(type, value) {
        // 设置单字段
        if (isSingleItemSet(arguments)) {
            this.setItem(type, value, arguments[2]);
            return;
        }

        if (type === 'status' && typeof value === 'string') {
            this.setGlobalStatus(value);
            return;
        }

        this.isSetting = true;

        // 异常情况
        if (typeof value !== 'object') {
            this.isSetting = false;
            this.hasEmitted = false;
            return;
        }

        // 处理props的情况，merge合并
        let formatValue = value;
        if (type === 'props') {
            formatValue = value || {};
            Object.keys(formatValue).forEach((propsKey) => {
                const targetProps = formatValue[propsKey] || {};
                const lastProps = this[type][propsKey] || {};

                formatValue[propsKey] = {
                    ...lastProps,
                    ...targetProps,
                };
            });
        }

        this[type] = {
            ...this[type],
            ...formatValue,
        };

        if (type === 'value') {
            this.settingBatchKeys = Object.keys(value); // 批量变化的值
        }

        const childNames = [];
        this.children.forEach((child) => {
            child.set(type, this[type][child.name]);
            childNames.push(child.name);
        });

        if (type === 'value') { // 处理不在childNames里的值
            if (Array.isArray(this.settingBatchKeys)) {
                this.settingBatchKeys.forEach((setKey) => {
                    if (childNames.indexOf(setKey) === -1) {
                        this.emit(BASIC_EVENT[type], setKey, this[type][setKey]);
                        this.emit(ANY_CHANGE, type, setKey, this[type][setKey]);
                    }
                });
            }
        }

        this.isSetting = false;
        this.hasEmitted = false;
        this.settingBatchKeys = null;
    }

    // 全局状态
    setGlobalStatus(targetStatus) {
        if (this.globalStatus === targetStatus) {
            return this;
        }
        this.globalStatus = targetStatus;
        const status = {};
        this.children.forEach((child) => {
            status[child.name] = targetStatus;
        });
        return this.setStatus(status);
    }

    getGlobalStatus() {
        return this.globalStatus;
    }

    // 获取多值
    getAll(type, name) {
        if (name) {
            return this[type][name];
        }
        return this[type];
    }

    // 获取值
    get(type, name) {
        if (name) {
            return this[type][name];
        }
        let ret = this.filter(this.getAll(type));
        if (type === 'error') {
            let hasError = false;
            Object.keys(ret).forEach((key) => {
                if (ret[key]) {
                    hasError = true;
                }
            });

            if (!hasError) ret = null;
        }
        return ret;
    }

    filter(obj) {
        if (!isObject(obj)) {
            return obj;
        }

        // filter的原意是去除隐藏 和 匿名字段的值，但是和之前处理嵌套Form的逻辑有冲突（实际上遍历key处理实际上意义不大）
        // TODO: 单测衡量一下去除filter处理对象的逻辑，解决后升y位
        const ret = {};
        Object.keys(obj).forEach((key) => {
            if (this.escape[key]) {
                ret[key] = obj[key];
            } else if (key.indexOf('__anonymouse__') !== 0 && this.get('status', key) !== 'hidden') {
                ret[key] = this.filter(obj[key]);
            }
        });

        return ret;
    }

    addField(fieldProps) {
        // 处理非数组情况，考虑null,undefined
        if (!Array.isArray(fieldProps)) {
            // eslint-disable-next-line
            fieldProps = [fieldProps];
        }

        const ret = fieldProps.map((option) => {
            const mrOption = Object.assign({}, option);
            const {
                value, name, status, error, props, func_status, defaultValue = null,
                interceptor: localInterceptor,
            } = option;

            if (this.childrenMap[name]) {
                return this.childrenMap[name];
            }

            // name特殊处理
            if (typeof name === 'number') mrOption.name = `${name}`;
            if (!name) mrOption.name = genName();

            // JSX 属性 > core默认值 > 默认属性(globalStatus) > 空值
            mrOption.jsx_status = status || func_status;

            const itemGlobalValue = isInvalidVal(this.value[name]) ? null : this.value[name];
            let itemValue = itemGlobalValue;

            // undefined 作为未定义的标志，null作为未赋值的标志
            if (!this.defaultSettingMap[name] && !(name in this.value)) {
                itemValue = (isInvalidVal(itemGlobalValue) ? defaultValue : itemGlobalValue);
                this.defaultSettingMap[name] = true;
            }
            mrOption.value = isInvalidVal(value) ? itemValue : value;

            this.value[mrOption.name] = mrOption.value;
            // eslint-disable-next-line
            this.status[mrOption.name] = mrOption.status = status || this.status[name] || this.globalStatus;

            const presetProps = {
                ...(this.props[mrOption.name] || {}),
                ...(props || {}),
            };
            this.props[mrOption.name] = mrOption.props = presetProps;
            this.error[mrOption.name] = mrOption.error = error || null;

            const item = new ItemCore({
                ...mrOption,
                on: this.on.bind(this),
                emit: this.emit.bind(this),
                removeListener: this.removeListener.bind(this),
                interceptor: localInterceptor || this.interceptor[mrOption.name],
                form: this,
            });

            this.childrenMap[item.name] = item;
            this.children.push(item);
            return item;
        });
        if (ret.length === 1) {
            return ret[0];
        }
        return ret;
    }

    updateField(props) {
        if (!Array.isArray(props)) {
            // eslint-disable-next-line
            props = [props];
        }
        props.forEach((option) => {
            if (!option.name) {
                throw Error('updateField must specify name');
            }
            this.childrenMap[option.name].updateField(option);
        });
    }

    setValidateConfig(config, replace = false) {
        if (isObject(config)) {
            this.validateConfig = config;
            this.children.forEach((child) => {
                if (child.name in config) {
                    child.setValidateConfig(config[child.name]);
                } else if (replace) {
                    child.setValidateConfig({});
                }
            });
        }
    }
}


export default Form;
