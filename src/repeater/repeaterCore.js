import FormCore from '../core/form';

class RepeaterCore {
    constructor(props) {
        const { value, status, formConfig } = props;
        this.formList = [];
        this.status = status || 'preview';
        this.formProps = formConfig || {};

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

    autoSaveInline = () => {
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

    // 激活已有项为临时编辑项
    updateInline = async (id) => {
        const hasError = await this.hasValidateError();
        if (hasError) return;

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

    // 保存临时编辑项
    saveInline = async (id) => {
        const hasError = await this.hasValidateError();
        if (hasError) return hasError;

        this.formList = this.formList.map((core) => {
            if (core.id === id) {
                delete core.$focus;
                delete core.$backup;
            }

            return core;
        });

        this.setEditWhenFocus();
        return hasError;
    }

    // 撤销临时编辑项
    cancelInline = (id) => {
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

    generateCore = (values) => {
        const formValues = values || {};
        return new FormCore({
            ...this.formProps,
            values: formValues,
            globalStatus: this.status,
        });
    }

    // 增
    add = (core) => {
        this.formList.push(core);
    }

    // 删
    remove = (id) => {
        this.formList = this.formList.filter(core => core.id !== id);
    }

    // 改
    update = (values, id) => {
        this.formList = this.formList.map((core) => {
            if (id === core.id) {
                core.setValueSilent(values);
                return core;
            }
            return core;
        });
    }

    // 更新value
    updateValue = (valueArr) => {
        if (Array.isArray(valueArr)) {
            this.formList = valueArr.map((values) => {
                const formValues = values || {};
                return this.generateCore(formValues);
            });
        }
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
}

export default RepeaterCore;
