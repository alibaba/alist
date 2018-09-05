import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { FormItem, Item, FormCore } from '../../../';

export default function SelectRepeaterHOC(Source, Com) {
    const { Checkbox, Radio } = Source;

    return class SelectRepeater extends Component {
        static defaultProps = {
            selectMode: 'single',
        };

        static propTypes = {
            children: PropTypes.any,
            selectFormConfig: PropTypes.object,
            selectMode: PropTypes.string,
            dataSource: PropTypes.array,
            value: PropTypes.array,
            onChange: PropTypes.func,
        };

        constructor(props, context) {
            super(props, context);
            const {
                selectMode,
                value,
                selectFormConfig,
            } = props;

            const { dataSource, value: innerVal } = value || {};
            this.core = new FormCore({
                values: {
                    dataSource: dataSource || [],
                    value: innerVal || [],
                },
                ...selectFormConfig,
            });

            this.TriggerCom = null;
            if (selectMode === 'single') {
                this.TriggerCom = Radio;
            } else if (selectMode === 'multiple') {
                this.TriggerCom = Checkbox;
            }
        }

        componentDidMount = () => {
            const { onMount } = this.props;
            if (onMount) {
                onMount(this.repeater);
            }
        }

        componentWillReceiveProps = (nextProps) => {
            const { dataSource, value } = nextProps.value || {};
            // 下述代码在interceptor中完成
            let formatValue = [].concat(value);
            let formatDataSource = [];

            if (Array.isArray(dataSource)) {
                formatDataSource = dataSource;
                const idMap = {};
                dataSource.forEach((item) => {
                    if (item && item.id) {
                        idMap[item.id] = item;
                    }
                });

                formatValue = formatValue.filter(f => !!f);
                formatValue.forEach((valItem, index) => {
                    if (valItem.id in idMap) {
                        formatValue.splice(index, 1, idMap[valItem.id]);
                    }
                });
            }

            this.core.setValues({
                dataSource: formatDataSource,
                value: formatValue,
            });
        }

        renderTrigger = (_, { values }) => {
            const { selectMode, isSelectDisabled } = this.props;
            const val = this.core.getValue('value') || [];

            let disabled = false;
            if (isSelectDisabled) {
                disabled = isSelectDisabled(values);
            }

            const icChecked = !!val.find(lastItem => values.id === lastItem.id);
            const { TriggerCom } = this;


            return (<TriggerCom
                disabled={disabled}
                value={icChecked}
                onChange={(checked) => {
                    let lastVal = this.core.getValue('value') || [];
                    if (selectMode === 'single') {
                        if (checked) {
                            lastVal = [values];
                        }
                    } else if (checked) {
                        lastVal.push(values);
                    } else {
                        lastVal = lastVal.filter(fv => fv.id !== values.id);
                    }

                    this.core.setValue('value', lastVal);
                    this.repeater.forceUpdate(); // 强制刷新repeater，否则datasource内的内容不会刷新
                }}
            />);
        }

        renderSelectTrigger = () => {
            const { selectMode } = this.props;
            const { TriggerCom } = this;
            if (selectMode === 'single' || selectMode === 'multiple') {
                return (<FormItem renderCell={this.renderTrigger} status="hidden" name="selected">
                    <TriggerCom />
                </FormItem>);
            }

            return null;
        }


        render() {
            const { children, onChange } = this.props;
            const otherprops = { ...this.props };
            delete otherprops.children;
            delete otherprops.onChange;
            delete otherprops.selectMode;
            delete otherprops.selectFormConfig;

            return (<Form core={this.core} onChange={onChange}>
                <Item name="dataSource">
                    <Com {...otherprops} ref={(rp) => { this.repeater = rp; }}>
                        {this.renderSelectTrigger()}
                        {children}
                    </Com>
                </Item>
            </Form>);
        }
    };
}
