import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { FormItem, Item, FormCore } from '../../../';

export default function SelectRepeaterHOC(Source, Com) {
    const { Checkbox, Radio } = Source;

    return class SelectRepeater extends Component {
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
                selectMode, dataSource, value,
                selectFormConfig,
            } = props;
            this.core = new FormCore({
                values: {
                    dataSource: dataSource || [],
                    value: value || [],
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

        componentWillReceiveProps = (nextProps) => {
            const { dataSource, value } = nextProps.value || {};
            // 下述代码在interceptor中完成
            const formatValue = [];
            let formatDataSource = [];
            if (Array.isArray(dataSource)) {
                formatDataSource = dataSource;
                const idMap = {};
                dataSource.forEach((item) => {
                    if (item.id) {
                        idMap[item.id] = item;
                    }
                });

                value.forEach((valItem) => {
                    if (valItem.id in idMap) {
                        formatValue.push(idMap[valItem.id]);
                    }
                });
            }
            this.core.setValues({
                dataSource: formatDataSource,
                value: formatValue,
            });
        }

        renderTrigger = (_, { values }) => {
            const { selectMode } = this.props;
            const val = this.core.getValue('value') || [];
            const icChecked = !!val.find(lastItem => values.id === lastItem.id);
            const { TriggerCom } = this;

            return (<TriggerCom
                value={icChecked}
                onChange={(checked) => {
                    let lastVal = this.core.getValue('value') || [];
                    if (checked) {
                        lastVal.push(values);
                    } else if (selectMode === 'single') {
                        lastVal = [values];
                    } else {
                        lastVal = lastVal.filter(fv => fv.id !== values.id);
                    }

                    this.core.setValue('value', lastVal);
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
                    <Com {...otherprops}>
                        {this.renderSelectTrigger()}
                        {children}
                    </Com>
                </Item>
            </Form>);
        }
    };
}
