import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import RepeaterCore from './repeaterCore';
import localeMap from './locale';
import Form, { FormCore } from '..';
import ItemContext from '../context/item';
import RepeaterContext from '../context/repeater';
import SelectRepeaterContext from '../context/selectRepeater';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const assignItem = (obj) => {
    if (!obj) return obj;
    return (isObject(obj)) ? Object.assign({}, obj) : obj;
};

const assignListItem = (arr) => {
    if (!arr) return arr;
    return (Array.isArray(arr)) ? arr.map(item => assignItem(item)) : arr;
};

export default function CreateRepeater(bindSource, type, source) {
    const Repeater = bindSource(type, source);
    const { Dialog } = source;

    class InnerRepeater extends Component {
        static propTypes = {
            view: PropTypes.any,
            core: PropTypes.any,
            status: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
            ]),
            locale: PropTypes.string,
            asyncHandler: PropTypes.object,
            dialogConfig: PropTypes.object,
            formConfig: PropTypes.object,
            className: PropTypes.string,
            style: PropTypes.object,
            multiple: PropTypes.bool,
            filter: PropTypes.func,
            onMount: PropTypes.func,
            value: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.object,
            ]),
            onChange: PropTypes.func,
            children: PropTypes.any,
        }

        static defaultProps = {
            onChange: () => {},
            status: 'edit',
            locale: 'en', // en | zh
        };

        constructor(props) {
            super(props);
            const {
                value, status, formConfig, asyncHandler, core, item,
            } = props;
            this.value = value || [];
            this.status = status;
            this.formConfig = formConfig || {};
            this.asyncHandler = asyncHandler || {};
            this.manualEvent = this.genManualEvent();
            this.repeaterCore = core || new RepeaterCore({
                value: this.value,
                status: this.status,
                formConfig: this.formConfig,
                asyncHandler: this.asyncHandler,
            });

            this.superFormProps = {};
            if (item) {
                this.contextItem = item;
                this.contextItem.addSubField(this.repeaterCore);
                this.superFormProps = this.getSuperFormProps(item);
            }
        }

        componentDidMount() {
            const { onMount } = this.props;
            if (onMount) {
                onMount(this.repeaterCore);
            }
        }

        async componentWillReceiveProps(nextProps) {
            const { filter, asyncHandler, formConfig } = this.props;
            const manualEvent = this.genManualEvent();

            if (deepEqual(this.props, nextProps) && !manualEvent.type) {
                return;
            }

            if (!deepEqual(asyncHandler, nextProps.asyncHandler)) {
                this.repeaterCore.asyncHandler = nextProps.asyncHandler;
            }

            // 没有过滤函数或者没有关键字
            if (!filter || !this.key) {
                this.value = assignListItem(nextProps.value || []);
            } else if (nextProps.value !== this.props.value) {
                const filteredValue = await this.handleFilter(nextProps.value, this.key);
                this.value = assignListItem(filteredValue);
            }

            let forceRegenerate = false;
            if (!deepEqual(formConfig, nextProps.formConfig)) {
                this.repeaterCore.updateFormConfig(nextProps.formConfig);
                forceRegenerate = true;
            }
            
            // 是否强制刷新所有core
            manualEvent.forceRegenerate = forceRegenerate;
            this.repeaterCore.updateValue(this.value, manualEvent, this.handleCoreUpdate);
            this.forceUpdate();
            this.manualEvent = {};
        }

        onChange = (val, opts) => {
            // val是onChange后的值
            // thisVal是onChange前的值，跟实际值合并之后存入value
            // 主要是考虑存在filter的情况, thisVal是过滤之后的值
            // this.props.value或者this.getValue()是过滤之前的值
            // 这种情况主要的值还是this.props.value，所以这里需要进行处理
            const value = [];
            const thisVal = this.value;
            let i = 0; // i是thisVal的游标
            let j = 0; // j是val的游标
            this.getValue().forEach((item) => {
                // $idx是值在this.props.value中的下标
                if ((i < thisVal.length && item.$idx < thisVal[i].$idx) ||
                    i >= this.value.length) { // 没有修改的项
                    value.push(item);
                } else if (i < thisVal.length && item.$idx === thisVal[i].$idx) { // 有修改或删除的项
                    if (j < val.length && item.$idx === val[j].$idx) { // 项被更新
                        value.push(val[j]);
                        j += 1;
                    }
                    i += 1; // 项被删除
                }
            });
            // 新增的项
            while (val.length > i) {
                value.push(val[i]);
                i += 1;
            }

            this.props.onChange(value, opts);
        }

        getSuperFormProps = (core) => {
            let formProps = {};
            if (core.form && core.form.jsx.props) {
                const {
                    defaultMinWidth, full, inline, inset, layout, colon,
                } = core.form.jsx.props;
                formProps = {
                    defaultMinWidth, full, inline, inset, layout, colon,
                };
            }

            return formProps;
        }

        getValue = () => this.props.value || []

        getDialogConfig = (core, props) => {
            const { dialogConfig, selectRepeater } = this.props;
            const { okText, cancelText } = this.getText();
            const { custom, ...otherDialogProps } = dialogConfig || {};
            const { type: dialogType, content } = props;
            core.selectRepeater = selectRepeater;
            const rewriteProps = custom ? custom(core, dialogType, props) : {};

            return {
                ...otherDialogProps,
                ...props,
                okText,
                cancelText,
                content: content || this.getForm(core),
                ...rewriteProps,
            };
        }


        getForm = (core) => {
            const formProps = {};
            const { dialogConfig, children } = this.props;
            const { layout, full } = dialogConfig || {};
            formProps.layout = layout || { label: 8, control: 16 };
            formProps.full = !!full;

            return (<Form core={core} {...formProps}>
                {children}
            </Form>);
        }

        // 获取多语言文案的方法
        getText = () => {
            const { locale } = this.props;
            const map = localeMap[locale];
            const textMap = {};

            Object.keys(map).forEach((key) => {
                if ((key in this.props) && this.props[key]) {
                    textMap[key] = this.props[key];
                } else {
                    textMap[key] = map[key];
                }
            });

            return textMap;
        }

        genManualEvent = () => {
            const currentEvent = this.manualEvent || {};
            const { multiple } = this.props;
            return { ...currentEvent, multiple };
        }

        handleCoreUpdate = (core) => {
            const { multiple } = this.props;
            if (multiple) {
                core.$focus = true;
                if (!core.settingChangeHandler) {
                    core.on('change', (v, fireKeys, ctx) => {
                        this.repeaterCore.updateMultiple((index) => {
                            this.sync({
                                type: 'update', index, multiple: true, changeKeys: fireKeys,
                            });
                        })(v, fireKeys, ctx);
                    });
                    core.settingChangeHandler = true;
                }
                core.$multiple = true;
            }

            return core;
        }

        handleFilter = async (value, key) => {
            const { filter } = this.props;
            if (filter) {
                const result = await filter(value, key);
                return result;
            }
            return value;
        }

        handleSearch = async (e) => {
            let key = e.target ? e.target.value : e;
            const { filter } = this.props;
            if (key === undefined) {
                key = this.key || '';
            } else {
                this.key = key;
            }

            // 使用过滤函数进行过滤, 正在创建或更新临时项时，不进行搜索
            if (filter && key) {
                this.value = await this.handleFilter(this.getValue(), key);
            } else {
                this.value = this.getValue();
            }

            this.repeaterCore.updateValue(this.value);
            this.forceUpdate();
        }

        sync = (opts) => {
            this.manualEvent = opts || {};            
            const values = this.repeaterCore.getValues();
            this.onChange(values, opts);
        }

        doSave = async (id) => {
            const success = await this.repeaterCore.saveInline(id);
            if (success) {
                const index = this.repeaterCore.formList.findIndex(core => core.id === id);
                this.sync({ type: 'save', index });
                this.forceUpdate();
            }
        }

        doCancel = async (id) => {
            const index = this.repeaterCore.formList.findIndex(core => core.id === id);
            await this.repeaterCore.cancelInline(id);
            this.sync({ type: 'cancel', index });
            this.forceUpdate();
        }

        doAdd = async (core) => {
            const { repeaterCore } = this;
            let success = true;
            const addCore = (core instanceof FormCore) ? core : repeaterCore.generateCore(core);
            success = await repeaterCore.add(addCore);
            if (success) {
                this.sync({ type: 'add', index: repeaterCore.formList.length - 1 });
            }

            return success;
        }

        doMultipleInline = async () => {
            const canSync = await this.repeaterCore.addMultipleInline();
            if (canSync) {
                this.sync({ type: 'add', multiple: true, index: this.repeaterCore.formList.length - 1 });
            }
            this.forceUpdate();
        }

        doAddInline = async () => {
            const canSync = await this.repeaterCore.addInline();
            if (canSync) {
                this.sync({ type: 'add', inline: true, index: this.repeaterCore.formList.length - 1 });
            }

            this.forceUpdate();
        }

        doUpdateInline = async (core, id) => {
            await this.repeaterCore.updateInline(core, id);
            this.forceUpdate();
        }

        doUpdate = async (core, id) => {
            const success = await this.repeaterCore.update(core, id);
            if (success) {
                const index = this.repeaterCore.formList.findIndex(rp => rp.id === id);
                this.sync({ type: 'update', index });
            }

            return success;
        }

        doDelete = async (core, id) => {
            const { hasDeleteConfirm = true } = this.props;
            const textMap = this.getText();
            const index = this.repeaterCore.formList.findIndex(rp => rp.id === id);
            const currentDelete = this.repeaterCore.formList.find(rp => rp.id === id);
            const event = { type: 'delete', index, item: currentDelete };
            if (hasDeleteConfirm) {
                const dialogConfig = this.getDialogConfig(core, {
                    title: textMap.dialogDeleteText,
                    content: <div style={{ minWidth: '280px' }}>{textMap.deleteConfirmText}</div>,
                    onOk: async (_, hide) => {
                        const success = await this.repeaterCore.remove(core, id);
                        if (success) {
                            hide();
                            this.sync(event);
                        }
                    },
                    type: 'remove',
                });
                Dialog.show(dialogConfig);
            } else {
                const success = await this.repeaterCore.remove(core, id);
                if (success) {
                    this.sync(event);
                }
            }
        }


        doAddDialog = async (core) => {
            const textMap = this.getText();
            const dialogConfig = this.getDialogConfig(core, {
                title: textMap.dialogAddText,
                onOk: async (_, hide) => {
                    const error = await core.validate();
                    if (error) {
                        return;
                    }

                    const success = await this.doAdd(core.getValues());
                    // const success = await this.doAdd(core);
                    if (success) {
                        hide();
                    }
                },
                type: 'add',
            });

            Dialog.show(dialogConfig);
        }

        doUpdateDialog = async (core, id) => {
            const textMap = this.getText();
            const dialogConfig = this.getDialogConfig(core, {
                title: textMap.dialogUpdateText,
                type: 'update',
                onOk: async (_, hide) => {
                    const error = await core.validate();
                    if (error) {
                        return;
                    }

                    const success = await this.doUpdate(core, id);
                    if (success) {
                        hide();
                    }
                },
            });
            Dialog.show(dialogConfig);
        }

        render() {
            // createRepeater 有几个作用:
            // 1. 传递外部的source，如antd，ice，next等
            // 2. 作为repeaterCore数据源的处理中间层(ui-data)
            // 3. 提供中间层的方法（实际渲染请参考Repeater.jsx)
            const contextValue = {
                repeater: {
                    doAddDialog: this.doAddDialog,
                    doAddInline: this.doAddInline,
                    doMultipleInline: this.doMultipleInline,
                    doUpdateDialog: this.doUpdateDialog,
                    doUpdateInline: this.doUpdateInline,
                    doSave: this.doSave,
                    doCancel: this.doCancel,
                    doDelete: this.doDelete,
                    repeaterCore: this.repeaterCore,
                    getText: this.getText,
                    type,
                    handleSearch: this.handleSearch,
                },
            };

            return (
                <RepeaterContext.Provider value={contextValue}>
                    <Repeater
                        {...this.props}
                        {...contextValue.repeater}
                    />
                </RepeaterContext.Provider>
            );
        }
    }

    const OtRepeater = React.forwardRef((props, ref) => (<ItemContext.Consumer>
        {(itemContext) => {
            const { item } = itemContext;
            return <SelectRepeaterContext.Consumer>
                {( { selectRepeater }) => {
                    return <InnerRepeater ref={ref} {...props} item={item} selectRepeater={selectRepeater} />;
                }}
            </SelectRepeaterContext.Consumer>
        }}
    </ItemContext.Consumer>));

    OtRepeater.displayName = 'OtRepeater';
    return OtRepeater;
}
