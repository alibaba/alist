import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepeaterCore from './repeaterCore';
import { FormCore } from '..';

const noop = () => {};

export default function createRepeater(bindSource, source) {
    const {
        handleAddTemp = noop, handleSave = noop, handleCancel = noop,
        handleAdd = noop, handleUpdate = noop, handleDelete = noop, handleUpdateTemp = noop,
        Container, rowRender,
    } = bindSource(source);

    return class OtRepeater extends Component {
        static propTypes = {
            value: PropTypes.array,
            onChange: PropTypes.func.isRequired,
            children: PropTypes.any,
        }
        constructor(props, context) {
            super(props, context);
            this.value = props.value || [];
            this.status = props.status;
            this.validateConfig = props.validateConfig || {};
            this.repeaterCore = new RepeaterCore(this.value, this.status, {
                validateConfig: this.validateConfig,
            });
        }

        async componentWillReceiveProps(nextProps) {
            const { filter } = this.props;

            // 没有过滤函数或者没有关键字
            if (!filter || !this.key) {
                this.value = nextProps.value || [];
                return;
            }

            if (nextProps.value !== this.props.value) {
                this.value = await filter(nextProps.value, this.key);
                this.repeaterCore.updateValue(this.value);
                this.forceUpdate();
            }
        }

        onChange = async (val) => {
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
                if (i < thisVal.length && item.$idx < thisVal[i].$idx || i >= this.value.length) { // 没有修改的项
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

            const { asyncHandler } = this.props;
            if (asyncHandler) { // 异步或方法处理格式化
                const handledValue = await asyncHandler(value);
                this.props.onChange(handledValue);
            } else {
                this.props.onChange(value);
            }
        }

        getValue = () => this.props.value || []

        handleSearch = async (e) => {
            let key = e.target ? e.target.value : e;
            const { filter } = this.props;
            if (key === undefined) {
                key = this.key || '';
            } else {
                this.key = key;
            }

            // 使用过滤函数进行过滤
            if (filter && key) {
                this.value = await filter(this.getValue(), key);
            } else {
                this.value = this.getValue();
            }

            this.repeaterCore.updateValue(this.value);
            this.forceUpdate();
        }

        handleSearch = async (e) => {
            let key = e.target ? e.target.value : e;
            const { filter } = this.props;
            if (key === undefined) {
                key = this.key || '';
            } else {
                this.key = key;
            }

            // 使用过滤函数进行过滤
            if (filter && key) {
                this.value = await filter(this.getValue(), key);
            } else {
                this.value = this.getValue();
            }
            console.log(this.value);
            this.forceUpdate();
        }

        sync = () => {
            this.onChange(this.repeaterCore.getValues());
        }

        doSave = (idx) => {
            this.repeaterCore.saveTemp(idx);
            this.forceUpdate();
        }

        doCancel = (idx) => {
            this.repeaterCore.cancelTemp(idx);
            this.forceUpdate();
        }

        doAdd = (core) => {
            if (core instanceof FormCore) {
                this.repeaterCore.add(core);
            } else {
                this.repeaterCore.add(new FormCore({
                    values: core,
                }));
            }

            this.sync();
        }

        doAddTemp = async () => {
            await this.repeaterCore.addTemp();
            this.sync();
        }

        doUpdateTemp = async (idx) => {
            await this.repeaterCore.updateTemp(idx);
            this.forceUpdate();
        }

        doUpdate = (val, idx) => {
            this.repeaterCore.update(val, idx);
            this.sync();
        }
        doDelete = (idx) => {
            this.repeaterCore.remove(idx);
            this.sync();
        }

        render() {
            const {
                repeaterCore, doAdd, doUpdate, doDelete, doSave, doCancel, doAddTemp, doUpdateTemp, handleSearch,
            } = this;
            const { children } = this.props;
            const { props } = this;

            const { formList } = repeaterCore;

            const itemsConfig = React.Children.map(children, child => ({
                name: child.props.name,
                label: child.props.label,
            })).filter(item => item.name);

            const _handleAdd = handleAdd.bind(0, {
                props, children, repeaterCore, doAdd,
            });
            const _handleAddTemp = handleAddTemp.bind(0, {
                props, children, repeaterCore, doAddTemp,
            });

            return (<Container
                props={props}
                itemsConfig={itemsConfig}
                handleAdd={_handleAdd}
                handleAddTemp={_handleAddTemp}
                handleSearch={handleSearch}
            >
                {
                    formList.map((core, idx) => {
                        const _handleUpdateTemp = handleUpdateTemp.bind(this, {
                            props, children, core, idx, doUpdateTemp,
                        });
                        const _handleUpdate = handleUpdate.bind(this, {
                            props, children, core, idx, doUpdate,
                        });
                        const _handleDelete = handleDelete.bind(this, {
                            props, core, idx, doDelete,
                        });
                        const _handleSave = handleSave.bind(this, {
                            props, core, idx, doSave,
                        });
                        const _handleCancel = handleCancel.bind(this, {
                            props, core, idx, doCancel,
                        });

                        return rowRender({
                            props,
                            itemsConfig,
                            idx,
                            val: core.getValues(),
                            core,
                            handleUpdate: _handleUpdate,
                            handleDelete: _handleDelete,
                            handleCancel: _handleCancel,
                            handleUpdateTemp: _handleUpdateTemp,
                            handleSave: _handleSave,
                        });
                    })
                }
            </Container>);
        }
    };
}
