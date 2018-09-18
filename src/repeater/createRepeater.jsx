import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepeaterCore from './repeaterCore';
import Form, { FormCore } from '..';

const noop = () => {};
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const assignItem = (obj) => {
    if (!obj) return obj;
    if (isObject(obj)) {
        return Object.assign({}, obj);
    }
    return obj;
};

const assignListItem = (arr) => {
    if (!arr) return arr;
    // const arrft = [].concat(arr);
    if (Array.isArray(arr)) {
        return arr.map(item => assignItem(item));
    }

    return arr;
};

export default function CreateRepeater(bindSource, type, source) {
    const { Container, RowRender } = bindSource(type, source);
    const { Input = noop, Dialog } = source;

    return class OtRepeater extends Component {
        static propTypes = {
            view: PropTypes.any,
            core: PropTypes.any,
            status: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
            ]),
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

        static contextTypes = {
            item: PropTypes.object,
        };

        static defaultProps = {
            onChange: () => {},
            status: 'edit',
        };

        constructor(props, context) {
            super(props, context);
            const {
                value, status, formConfig, asyncHandler, core,
            } = props;
            const { item } = context;
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
            if (item && item.core) {
                this.contextItem = item.core;
                this.contextItem.addSubField(this.repeaterCore);
                this.superFormProps = this.getSuperFormProps(item.core);
            }
        }

        componentDidMount() {
            const { onMount } = this.props;
            if (onMount) {
                onMount(this.repeaterCore);
            }
        }

        async componentWillReceiveProps(nextProps) {
            const { filter } = this.props;
            const manualEvent = this.genManualEvent();

            // 没有过滤函数或者没有关键字
            if (!filter || !this.key) {
                this.value = assignListItem(nextProps.value || []);
                this.repeaterCore.updateValue(this.value, manualEvent, this.handleCoreUpdate);
                this.forceUpdate();
                this.manualEvent = {};
                return;
            }

            if (nextProps.value !== this.props.value) {
                const filteredValue = await this.handleFilter(nextProps.value, this.key);
                this.value = assignListItem(filteredValue);

                this.repeaterCore.updateValue(this.value, manualEvent, this.handleCoreUpdate);
                this.manualEvent = {};
                this.forceUpdate();
            }
        }

        onChange = (val, opts) => {
            // val是onChange后的值
            // thisVal是onChange前的值，跟实际值合并之后存入value
            // 主要是考虑存在filter的情况, thisVal是过滤之后的值
            // this.props.value或者this.getValue()是过滤之前的值
            // 这种情况主要的值还是this.props.value，所以这里需要进行处理
            const value = [];
            const thisVal = this.value;
            // i是thisVal的游标
            // j是val的游标
            let i = 0;
            let j = 0;
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
                    // 项被删除
                    i += 1;
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
            const { dialogConfig } = this.props;
            const { custom } = dialogConfig || {};
            const { type: dialogType, content } = props;

            let rewriteProps = {};
            if (custom) {
                rewriteProps = custom(core, dialogType, props);
            }

            return {
                ...props,
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
            this.onChange(this.repeaterCore.getValues(), opts);
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
            let success = true;
            if (core instanceof FormCore) {
                success = await this.repeaterCore.add(core);
            } else {
                success = await this.repeaterCore.add(this.repeaterCore.generateCore(core));
            }

            if (success) {
                this.sync({ type: 'add', index: this.repeaterCore.formList.length - 1 });
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
            const index = this.repeaterCore.formList.findIndex(rp => rp.id === id);
            const currentDelete = this.repeaterCore.formList.find(rp => rp.id === id);
            const event = { type: 'delete', index, item: currentDelete };
            if (hasDeleteConfirm) {
                const dialogConfig = this.getDialogConfig(core, {
                    title: '删除',
                    content: <div style={{ width: '280px' }}>是否删除该项</div>,
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
            const dialogConfig = this.getDialogConfig(core, {
                title: '添加',
                onOk: async (_, hide) => {
                    const error = await core.validate();
                    if (error) {
                        return;
                    }

                    const success = await this.doAdd(core);
                    if (success) {
                        hide();
                    }
                },
                type: 'add',
            });

            Dialog.show(dialogConfig);
        }

        doUpdateDialog = async (core, id) => {
            const dialogConfig = this.getDialogConfig(core, {
                title: '更新',
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
            const { repeaterCore, handleSearch, superFormProps } = this;
            const {
                style = {}, className, children, filter, view,
                filterElement, status,
            } = this.props;

            const { formList } = repeaterCore;

            const itemsConfig = React.Children.map(children, child => ({
                name: child.props.name,
                label: child.props.label,
                prefix: child.props.prefix,
                suffix: child.props.suffix,
                multiple: child.props.multiple,
                renderCell: child.props.renderCell,
                style: child.props.style,
                className: child.props.className,
            })).filter(item => (item.name || item.multiple || item.renderCell));

            let searchEle = null;
            if (filter) {
                if (typeof filterElement === 'function') {
                    searchEle = filterElement(handleSearch);
                } else if (React.isValidElement(filterElement)) {
                    searchEle = filterElement;
                } else {
                    searchEle = <Input className="repeater-search" onChange={handleSearch} />;
                }
            }

            const rowList = formList.map((core, rowIndex) => {
                const val = core.getValues();
                const { id } = core;
                const itemProps = {
                    id,
                    val,
                    core,
                    formProps: superFormProps,
                    rowIndex,
                    status,
                };
                return <RowRender key={id} className="table-repeater-row" {...itemProps} />;
            });

            let customView = view; // 自定义视图
            if (typeof view === 'function') {
                customView = view(formList, this);
            }

            return (
                <div>
                    <Container
                        searchEle={searchEle}
                        className={`table-repeater-wrapper ${className || ''}`}
                        style={style}
                        jsxProps={this.props}
                        itemsConfig={itemsConfig}
                        repeaterCore={repeaterCore}
                        formProps={this.superFormProps}
                        doAdd={this.doAdd}
                        doAddDialog={this.doAddDialog}
                        doUpdateDialog={this.doUpdateDialog}
                        doUpdate={this.doUpdate}
                        doDelete={this.doDelete}
                        doSave={this.doSave}
                        doCancel={this.doCancel}
                        doAddInline={this.doAddInline}
                        doMultipleInline={this.doMultipleInline}
                        doUpdateInline={this.doUpdateInline}
                        status={status}
                    >
                        {view ? customView : rowList}
                    </Container>
                </div>
            );
        }
    };
}
