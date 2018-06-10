import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepeaterCore from './repeaterCore';
import { FormCore } from '..';

const noop = () => {};

export default function createRepeater(bindSource, source) {
    const { Container, RowRender } = bindSource(source);
    const { Input, Dialog = noop } = source;

    return class OtRepeater extends Component {
        static propTypes = {
            value: PropTypes.array,
            onChange: PropTypes.func.isRequired,
            children: PropTypes.any,
        }
        constructor(props, context) {
            super(props, context);
            const { value, status, validateConfig } = props;
            this.value = value || [];
            this.status = status;
            this.validateConfig = validateConfig || {};
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
                this.value = await this.handleFilter(nextProps.value, this.key);

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

        sync = () => {
            this.onChange(this.repeaterCore.getValues());
        }

        doSave = async (idx) => {
            const hasError = await this.repeaterCore.saveInline(idx);
            if (hasError) return;

            this.sync();
            this.forceUpdate();
        }

        doCancel = (idx) => {
            this.repeaterCore.cancelInline(idx);
            this.sync();
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

        doAddInline = async () => {
            const canSync = await this.repeaterCore.addInline();
            if (canSync) {
                this.sync();
            }
            this.forceUpdate();
        }

        doUpdateInline = async (idx) => {
            await this.repeaterCore.updateInline(idx);
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
            const { repeaterCore, handleSearch } = this;
            const { children, filter } = this.props;

            const { formList } = repeaterCore;

            const itemsConfig = React.Children.map(children, child => ({
                name: child.props.name,
                label: child.props.label,
            })).filter(item => item.name);

            return (
                <div>
                    { filter && <Input className="repeater-search" onChange={handleSearch} /> }
                    <Container
                        jsxProps={this.props}
                        itemsConfig={itemsConfig}
                        repeaterCore={repeaterCore}
                        doAdd={this.doAdd}
                        doUpdate={this.doUpdate}
                        doDelete={this.doDelete}
                        doSave={this.doSave}
                        doCancel={this.doCancel}
                        doAddInline={this.doAddInline}
                        doUpdateInline={this.doUpdateInline}
                    >
                        {
                            formList.map((core, idx) => {
                                const val = core.getValues();
                                const itemProps = { idx, val, core };
                                return <RowRender {...itemProps} />;
                            })
                        }
                    </Container>
                </div>
            );
        }
    };
}
