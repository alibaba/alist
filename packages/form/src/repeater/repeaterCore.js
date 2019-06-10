import FormCore from '../core/form';
import { isPromise } from '../util/is';

const noop = () => {};

class RepeaterCore {
    constructor(props) {
        const {
            value, status, formConfig, asyncHandler, multiple,
            multipleSyncHandler, setLoadingSideEffect,
        } = props;
        this.formList = [];
        this.loading = false;
        this.status = status || 'preview';
        this.formConfig = formConfig || {};
        this.asyncHandler = asyncHandler || {};
        this.multiple = multiple;
        this.multipleSyncHandler = multipleSyncHandler || (x => x);
        this.setLoadingSideEffect = setLoadingSideEffect || (x => x);

        if (Array.isArray(value)) {
            this.formList = value.map(itemValues => this.generateCore(itemValues));
        }
    }

    setLoading = (loading) => {
        this.loading = loading;
    }

    updateStatus = (status) => {
        this.status = status;
    }

    notify = () => {

    }

    handleFormError = (error) => {
        if (!error) return null;

        let err = null;
        if (Array.isArray(error)) {
            const errList = error.map(item => this.handleFormError(item)).filter(v => !!v);
            return errList[0];
        }

        Object.keys(error).forEach((key) => {
            if (error[key] && !err) {
                err = error[key];
            }
        });

        return err;
    }

    validate = (cb = e => e, opts) => {        
        const { changeKeys = null, index = -1, withRender = true } = opts || {};
        let hasPromise = false;
        const promiseValidator = [];

        this.formList.forEach((item, coreIdx) => {
            let result = null;
            if (index !== -1) { // 只为特定的core的特定字段做校验
                if (coreIdx === index && Array.isArray(changeKeys)) {
                    result = item.validateItem(changeKeys, undefined, opts);
                    if (isPromise(result)) {
                        hasPromise = true;
                    }
                    promiseValidator.push(result);
                }
            } else {
                if (withRender) {
                    result = item.validate();
                } else {
                    result = item.validateWithoutRender();
                }
                
                if (isPromise(result)) {
                    hasPromise = true;
                }

                promiseValidator.push(result);
            }
        });

        if (hasPromise) {
            return Promise.all(promiseValidator).then(this.handleFormError).then(cb);
        }

        const errList = promiseValidator.map(this.handleFormError).filter(v => !!v);

        return cb(errList[0]);
    }

    // 更新构建属性
    updateFormConfig = (formConfig) => {
        this.formConfig = formConfig || {};
    }

    setEditWhenFocus = () => {
        this.formList.forEach((core) => {
            if (core.$focus) {
                core.setGlobalStatus('edit');
            } else {
                core.setGlobalStatus('preview');
            }
        });
    }


    generateCore = (raw) => {
        const { values: userValues, onChange = noop, initialized = noop } = this.formConfig;
        let values = {};
        if (raw) {
            values = { ...raw };
        } else if (userValues) {
            values = { ...userValues };
        }

        let instance = new FormCore({
            ...this.formConfig,
            onChange: (fks, v, ctx) => {
                ctx.repeater = this;
                ctx.repeaterIndex = this.formList.findIndex(item => item.id === ctx.id);
                onChange(fks, v, ctx);
            },
            initialized: (ctx) => {
                ctx.repeater = this;
                ctx.repeaterIndex = this.formList.findIndex(item => item.id === ctx.id);
                initialized(ctx);
            },
            values,
            globalStatus: this.status,
            disabledSyncChildForm: true,
            repeaterRowCore: true,
        });

        instance.repeater = this;
        if (this.multiple) {
            instance.$focus = true;
            instance.$multiple = true;

            instance = this.multipleSyncHandler(instance);
        }

        return instance;
    }

    hasValidateError = async () => {
        let validateArr = await Promise.all(this.formList.map(core => core.validate()));
        validateArr = validateArr.filter((errors) => {
            let hasError = false;
            if (errors) {
                Object.keys(errors).forEach((errkey) => {
                    if (errors[errkey]) {
                        hasError = true;
                    }
                });
            }

            return hasError;
        });

        return validateArr.length > 0;
    }

    // 查
    getValues = () => {
        const values = [];
        this.formList.forEach((core) => {
            const currentVal = core.getValues();
            if (core.$multiple) {
                values.push(currentVal);
            } else if (core.$focus) {
                if (core.$backup) {
                    values.push(core.$backup);
                }
            } else {
                values.push(currentVal);
            }
        });
        return values;
    }

    autoSaveInline = async () => {
        let canSync = false;
        this.formList = this.formList.map((core) => {
            if (core.$focus) {
                canSync = true;
                delete core.$focus;
                delete core.$backup;
            }
            return core;
        });

        return canSync;
    }

    beforeAsyncHandler = ({ type, inline = false }) => {
        // this.setLoadingSideEffect(true);
    }

    afterAsyncHandler = () => {
        // this.setLoadingSideEffect(false);
    }

    // 增加临时编辑项
    addInline = async () => {
        let values = null;
        let success = true;

        const hasError = await this.hasValidateError();
        if (hasError) return false;

        this.autoSaveInline();
        const tmp = this.generateCore();

        if (this.asyncHandler.add) {
            this.beforeAsyncHandler({ type: 'add', inline: true });
            const index = this.formList.length - 1 < 0 ? 0 : this.formList.length - 1;
            let result = true;
            try {
                result = await this.asyncHandler.add(tmp.getValues(), tmp, index);
            } catch (e) {
                result = false;
            }

            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
            success = res;
            if (item) {
                tmp.setValueSilent(item);
            }

            if (rv) {
                values = rv;
            }
            this.afterAsyncHandler({ type: 'add', inline: true });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                tmp.$focus = true;
                this.formList.push(tmp);
                this.setEditWhenFocus();
            }
        }

        return success;
    }

    updateMultiple = (cb = x => x) => (v, keys, ctx) => {
        const list = this.formList;
        const index = list.findIndex(item => item.id === ctx.id);
        cb(index);

        if (this.asyncHandler.update) {
            // this.beforeAsyncHandler({ type: 'update', multiple: true });
            this.asyncHandler.update(v, ctx, index, keys);
            // this.afterAsyncHandler({ type: 'update', multiple: true });
        }
    }

    // 增加多项临时编辑项
    addMultipleInline = async () => {
        let values = null;
        let success = true;
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        const tmp = this.generateCore();

        if (this.asyncHandler.add) {
            this.beforeAsyncHandler({ type: 'add' });
            const index = this.formList.length - 1 < 0 ? 0 : this.formList.length - 1;
            let result = true;
            try {
                result = await this.asyncHandler.add(tmp.getValues(), tmp, index);
            } catch (e) {
                result = false;
            }

            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);

            success = res;
            if (item) {
                tmp.setValueSilent(item);
            }

            if (rv) {
                values = rv;
            }

            this.afterAsyncHandler({ type: 'add' });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList.push(tmp);
            }
        }

        return success;
    }

    // 激活已有项为临时编辑项
    updateInline = async (lastCore, id) => {
        let success = true;
        let values = null;
        let currentValues = lastCore.getValues();
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        if (this.asyncHandler.update) {
            this.beforeAsyncHandler({ type: 'update', inline: true });
            const index = this.formList.findIndex(rp => rp.id === id);
            let result = true;
            try {
                result = await this.asyncHandler.update(currentValues, lastCore, index);
            } catch (e) {
                result = false;
            }

            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
            success = res;
            if (rv) {
                values = rv;
            }

            if (item) {
                currentValues = item;
            }

            this.afterAsyncHandler({ type: 'update', inline: true });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList = this.formList.map((core) => {
                    if (core.id === id) {
                        core.$focus = true;
                        core.$backup = core.getValues();
                        return core;
                    }
                    if (core.$focus) delete core.$focus;
                    return core;
                });
                this.setEditWhenFocus();
            }
        }

        return success;
    }

    // 保存临时编辑项
    saveInline = async (id) => {
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        let success = true;
        let values = null;
        const lastCore = this.formList.find(rp => rp.id === id);
        if (lastCore) {
            if (this.asyncHandler.save) {
                this.beforeAsyncHandler({ type: 'save', inline: true });
                const index = this.formList.findIndex(rp => rp.id === id);
                let result = true;
                try {
                    result = await this.asyncHandler.save(lastCore.getValues(), lastCore, index);
                } catch (e) {
                    result = false;
                }

                const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
                success = res;
                if (item) {
                    lastCore.setValueSilent(item);
                }

                if (rv) {
                    values = rv;
                }

                this.afterAsyncHandler({ type: 'save', inline: true });
            }
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList = this.formList.map((core) => {
                    if (core.id === id) {
                        delete lastCore.$focus;
                        delete lastCore.$backup;

                        return lastCore;
                    }
                    return core;
                });
            }

            this.setEditWhenFocus();
        }
        return success;
    }

    // 撤销临时编辑项
    cancelInline = async (id) => {
        const list = [];
        this.formList.forEach((core) => {
            if (core.id === id) {
                delete core.$focus;
                if (core.$backup) { // 已有项
                    core.setValueSilent(core.$backup);
                    delete core.$backup;
                    list.push(core);
                } else {
                    // do nothing...
                }
            } else {
                list.push(core);
            }
        });

        this.setEditWhenFocus();
        this.formList = list;
    }

    handleAsyncResult = (res) => {
        let success = true;
        let values = null;
        let item = null;
        if (typeof res === 'boolean') {
            success = res;
        } else if (res === undefined) {
            success = true;
        } else if (Object.prototype.toString.call(res) === '[object Object]') {
            const { success: rs, item: ri, values: rv } = res || {};
            success = rs;
            values = rv;
            item = ri;
        }

        return {
            success,
            values,
            item,
        };
    }

    // 增
    add = async (core) => {
        let success = true;
        let values = null;
        if (this.asyncHandler.add) {
            this.beforeAsyncHandler({ type: 'add' });
            const index = this.formList.length - 1 < 0 ? 0 : this.formList.length - 1;
            let result = true;
            try {
                result = await this.asyncHandler.add(core.getValues(), core, index);
            } catch (e) {
                result = false;
            }

            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);

            success = res;
            if (item) {
                core.setValueSilent(item);
            }

            if (rv) {
                values = rv;
            }
            this.afterAsyncHandler({ type: 'add' });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList.push(core);
            }
        }

        return success;
    }

    // 删
    remove = async (lastCore, id) => {
        let success = true;
        let values = null;
        if (this.asyncHandler.remove) {
            this.beforeAsyncHandler({ type: 'remove' });
            const index = this.formList.findIndex(rp => rp.id === id);
            const lastValues = lastCore.getValues();
            let result = true;
            try {
                result = await this.asyncHandler.remove(lastValues, lastCore, index);
            } catch (e) {
                console.error('e', e);
                result = false;
            }

            const { success: res = true, values: rv } = this.handleAsyncResult(result);
            success = res;

            if (rv) {
                values = rv;
            }
            this.afterAsyncHandler({ type: 'remove' });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList = this.formList.filter(core => core.id !== id);
            }
        }

        return success;
    }

    // 改
    update = async (currentCore, id) => {
        let success = true;
        let currentValues = currentCore.getValues();
        let values = null;
        if (this.asyncHandler.update) {
            this.beforeAsyncHandler({ type: 'update' });
            const index = this.formList.findIndex(rp => rp.id === id);
            let result = true;
            try {
                result = await this.asyncHandler.update(currentValues, currentCore, index);
            } catch (e) {
                result = false;
            }

            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
            success = res;
            if (rv) {
                values = rv;
            }

            if (item) {
                currentValues = item;
            }
            this.afterAsyncHandler({ type: 'update' });
        }

        if (success) {
            if (values) {
                this.updateValue(values);
            } else {
                this.formList = this.formList.map((core) => {
                    if (id === core.id) {
                        if (success) {
                            core.setValueSilent(currentValues);
                        }
                        return core;
                    }
                    return core;
                });
            }
        }

        return success;
    }

    // 更新value
    updateValue = async (valueArr, event) => {
        const {
            type, index, multiple, inline, changeKeys, forceRegenerate,
        } = event || {};

        if (Array.isArray(valueArr)) {
            if (!type || forceRegenerate) {
                this.formList = valueArr.map((values) => {
                    const formValues = values || {};
                    const core = this.generateCore(formValues);

                    return core;
                });
            } else if (multiple) {
                this.formList = this.formList.map((old, idx) => {
                    if (type === 'update' && index === idx) {
                        // 处理同步修改，只修改动的值
                        if (Array.isArray(changeKeys)) {
                            const changedValues = {};
                            changeKeys.forEach((ck) => {
                                changedValues[ck] = valueArr[index][ck];
                            });
                            old.setValues(changedValues);
                        } else {
                            old.setValues(valueArr[index]);
                        }
                    }

                    // old = cb(old);

                    return old;
                });
            }

            if (this.asyncHandler.afterSetting) {
                this.asyncHandler.afterSetting(event, this);
            }
        }
    }
}

export default RepeaterCore;
