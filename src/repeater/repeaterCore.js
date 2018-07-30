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
            this.formList = value.map(itemValues => new FormCore({
                ...this.formProps,
                values: itemValues || {},
                globalStatus: this.status,
            }));
        }
    }

    updateStatus = (status) => {
        this.status = status;
    }

    notify = () => {

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
        const formValues = values || {};
        return new FormCore({
            ...this.formProps,
            values: formValues,
            globalStatus: this.status,
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
        if (hasError) return canSync;

        canSync = this.autoSaveInline();
        const tmp = this.generateCore();
        tmp.$focus = true;
        this.formList.push(tmp);
        this.setEditWhenFocus();
        return canSync;
    }

    // 增加多项临时编辑项
    addMultipleInline = async (cb) => {
        const hasError = await this.hasValidateError();
        if (hasError) return false;

        const tmp = this.generateCore();
        tmp.on('change', cb);
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

        const lastCore = this.formList.find(rp => rp.id === id);
        if (lastCore) {
            if (this.asyncHandler.save) {
                const index = this.formList.findIndex(rp => rp.id === id);
                const result = await this.asyncHandler.save(lastCore.getValues(), index);
                const { success: res = true, values } = this.handleAsyncResult(result);
                success = res;
                if (values) {
                    lastCore.setValueSilent(values);
                }
            }
        }

        this.formList = this.formList.map((core) => {
            if (core.id === id) {
                if (success) {
                    delete lastCore.$focus;
                    delete lastCore.$backup;
                }

                return lastCore;
            }
            return core;
        });

        if (success) {
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
        if (typeof res === 'boolean') {
            success = res;
        } else if (Object.prototype.toString.call(res) === '[object Object]') {
            const { success: rs, values: rv } = res || {};
            success = rs;
            values = rv;
        }

        return {
            success,
            values,
        };
    }

    // 增
    add = async (core) => {
        let success = true;
        if (this.asyncHandler.add) {
            const index = this.formList.length - 1;
            const result = await this.asyncHandler.add(core.getValues(), index);
            const { success: res = true, values } = this.handleAsyncResult(result);

            success = res;
            if (values) {
                core.setValueSilent(values);
            }
        }

        if (success) {
            this.formList.push(core);
        }

        return success;
    }

    // 删
    remove = async (lastCore, id) => {
        let success = true;
        if (this.asyncHandler.remove) {
            const index = this.formList.findIndex(rp => rp.id === id);
            const values = lastCore.getValues();
            const result = await this.asyncHandler.remove(values, index);
            const { success: res = true } = this.handleAsyncResult(result);
            success = res;
        }

        if (success) {
            this.formList = this.formList.filter(core => core.id !== id);
        }

        return success;
    }

    // 改
    update = async (currentCore, id) => {
        let success = true;
        let values = currentCore.getValues();
        if (this.asyncHandler.update) {
            const index = this.formList.findIndex(rp => rp.id === id);
            const result = await this.asyncHandler.update(values, index);
            const { success: res = true, values: rv } = this.handleAsyncResult(result);
            success = res;
            if (rv) {
                values = rv;
            }
        }

        this.formList = this.formList.map((core) => {
            if (id === core.id) {
                if (success) {
                    core.setValueSilent(values);
                }
                return core;
            }
            return core;
        });


        return success;
    }

    // 更新value
    updateValue = async (valueArr) => {
        if (Array.isArray(valueArr)) {
            this.formList = valueArr.map((values) => {
                const formValues = values || {};
                return this.generateCore(formValues);
            });
        }
    }
}

export default RepeaterCore;
