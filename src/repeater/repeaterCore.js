import FromCore from '../core/form';
import FormCore from '../core/form';

class RepeaterCore {
    constructor(valueArr, status, props) {
        this.formList = [];

        this.status = status || 'preview';
        this.formProps = props || {};
        if (Array.isArray(valueArr)) {
            this.formList = valueArr.map((values) => {
                const formValues = values || {};
                const formProps = props || {};
                return new FromCore({
                    ...formProps,
                    values: formValues,
                    globalStatus: this.status
                });
            });
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

    autoSaveTemp = () => {
        this.formList = this.formList.map((core) => {
            if (core.$focus) {
                delete core.$focus;
                delete core.$backup;
            }
            return core;
        });
    }

    // 增加临时编辑项
    addTemp = async () => {
        const hasError = await this.hasValidateError();
        console.log('addTemp', hasError);
        if (hasError) return;

        this.autoSaveTemp();
        const tmp = this.generateCore();
        tmp.$focus = true;
        this.formList.push(tmp);
        this.setEditWhenFocus();
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
    updateTemp = async (index) => {
        const hasError = await this.hasValidateError();
        if (hasError) return;

        this.formList = this.formList.map((core, idx) => {
            if (idx === index) {
                core.$focus = true;
                core.$backup = core.getValues();
                return core;
            } else {
                if (core.$focus) delete core.$focus;
                return core;
            }
        });

        this.setEditWhenFocus();
    }

    // 保存临时编辑项
    saveTemp = (index) => {
        this.formList = this.formList.map((core, idx) => {
            if (idx === index) {
                delete core.$focus;
                delete core.$backup;
            }

            return core;
        });

        this.setEditWhenFocus();
    }

    // 撤销临时编辑项
    cancelTemp = (index) => {
        let list = [];
        this.formList.forEach((core, idx) => {
            if (index === idx) {
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
            globalStatus: this.status
        })
    }

    // 增
    add = (core) => {
        this.formList.push(core);
    }

    // 删
    remove = (index) => {
        this.formList = this.formList.filter((_, idx) => {
            return idx !== index;
        });
    }

    // 改
    update = (values, index) => {
        this.formList = this.formList.map((core, idx) => {
            if (idx === index) {
                core.setValueSilent(values);
                return core;
            } else {
                return core;
            }
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
        return this.formList.map(core => core.getValues())
    }

}

export default RepeaterCore;