import FormCore from '../core/form';

class RepeaterCore {
    constructor(props) {
        const {
            value, status, formConfig, asyncHandler,
        } = props;
        this.formList = [];
        this.status = status || 'preview';
        this.formProps = formConfig || {};
        this.asyncHandler = asyncHandler || {};

        if (Array.isArray(value)) {
            this.formList = value.map(itemValues => this.generateCore(itemValues));
        }
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
            const errList = error.map(item => this.handleFormError(item));
            return errList[0];
        }

        Object.keys(error).forEach((key) => {
            if (error[key] && !err) {
                err = error[key];
            }
        });

        return err;
    }

    validate = (cb = e => e) => {
        let hasPromise = false;
        const promiseValidator = [];
        this.formList.forEach((item) => {
            const result = item.validate();
            if (result instanceof Promise) {
                hasPromise = true;
            }

            promiseValidator.push(result);
        });

        if (hasPromise) {
            return Promise.all(promiseValidator).then(this.handleFormError).then(cb);
        }

        const errList = promiseValidator.map(this.handleFormError).filter(v => !!v);

        return cb(errList[0]);
    }

    // 更新构建属性
    updateProps = (props) => {
        const formProps = props || {};
        this.formProps = formProps;
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


    generateCore = (values) => {
        const formValues = Object.assign(values || {});
        return new FormCore({
            ...this.formProps,
            values: formValues,
            globalStatus: this.status,
            disabledSyncChildForm: true,
        });
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

    // 增加临时编辑项
    addInline = async () => {
        let canSync = false;
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        canSync = this.autoSaveInline();
        const tmp = this.generateCore();
        tmp.$focus = true;
        this.formList.push(tmp);
        this.setEditWhenFocus();
        return canSync;
    }

    // 增加多项临时编辑项
    addMultipleInline = async () => {
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        const tmp = this.generateCore();
        tmp.$focus = true;
        tmp.$multiple = true;
        this.formList.push(tmp);
        return true;
    }

    // 激活已有项为临时编辑项
    updateInline = async (lastCore, id) => {
        const hasError = await this.hasValidateError();
        if (hasError) return false;

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
        return true;
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
                const index = this.formList.findIndex(rp => rp.id === id);
                const result = await this.asyncHandler.save(lastCore.getValues(), index);
                const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
                success = res;
                if (item) {
                    lastCore.setValueSilent(item);
                }

                if (rv) {
                    values = rv;
                }
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
            const index = this.formList.length - 1;
            const result = await this.asyncHandler.add(core.getValues(), index);
            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);

            success = res;
            if (item) {
                core.setValueSilent(item);
            }

            if (rv) {
                values = rv;
            }
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
            const index = this.formList.findIndex(rp => rp.id === id);
            const lastValues = lastCore.getValues();
            const result = await this.asyncHandler.remove(lastValues, index);
            const { success: res = true, values: rv } = this.handleAsyncResult(result);
            success = res;

            if (rv) {
                values = rv;
            }
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
            const index = this.formList.findIndex(rp => rp.id === id);
            const result = await this.asyncHandler.update(currentValues, index);
            const { success: res = true, item, values: rv } = this.handleAsyncResult(result);
            success = res;
            if (rv) {
                values = rv;
            }

            if (item) {
                currentValues = item;
            }
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
    updateValue = async (valueArr, event, cb = x => x) => {
        const {
            type, index, multiple, inline,
        } = event || {};

        if (Array.isArray(valueArr)) {
            if (!type) {
                this.formList = valueArr.map((values) => {
                    const formValues = values || {};
                    let core = this.generateCore(formValues);
                    core = cb(core);
                    if (multiple && !core.$focus) {
                        core.$focus = true;
                    }

                    return core;
                });
            } else if (multiple) {
                this.formList = this.formList.map((old, idx) => {
                    if (type === 'update' && index === idx) {
                        old.setValues(valueArr[index]);
                    }

                    old = cb(old);

                    return old;
                });
            }
        }
    }
}

export default RepeaterCore;
