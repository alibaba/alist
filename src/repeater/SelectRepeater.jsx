import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { FormItem, Item, FormCore } from '../';

export default function SelectRepeaterHOC(Source, Com) {
    const { Checkbox, Radio } = Source;

    return class SelectRepeater extends Component {
        static defaultProps = {
            selectMode: 'single',
            dataSource: [],
            selectKey: 'id',
        };

        static propTypes = {
            children: PropTypes.any,
            selectFormConfig: PropTypes.object,
            selectMode: PropTypes.string,
            dataSource: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.object,
            ]),
            value: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.object,
            ]),
            onChange: PropTypes.func,
            selectKey: PropTypes.string,
        };

        constructor(props) {
            super(props);
            const {
                selectMode,
                value,
                selectFormConfig,
                item,
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

            this.repeater = React.createRef();
            if (item) {
                this.item = item;
            }
        }

        componentDidMount = () => {
            const { onMount } = this.props;

            if (onMount) {
                onMount(this.repeater.current);
            }
        }

        componentWillReceiveProps = (nextProps) => {
            const { selectKey } = this.props;
            const { status } = nextProps;
            const { dataSource, value } = nextProps.value || {};
            // 下述代码在interceptor中完成
            let formatValue = [].concat(value);
            let formatDataSource = [];

            if (Array.isArray(dataSource)) {
                formatDataSource = dataSource;
                const idMap = {};
                dataSource.forEach((item) => {
                    if (item && item[selectKey]) {
                        idMap[item[selectKey]] = item;
                    }
                });

                formatValue = formatValue.filter(f => !!f);
                formatValue.forEach((valItem, index) => {
                    if (valItem[selectKey] in idMap) {
                        formatValue.splice(index, 1, idMap[valItem[selectKey]]);
                    }
                });
            }

            const globalStatus = this.core.getGlobalStatus();
            let localStatus = status;
            if (typeof status === 'object') {
                const { dataSource: innerStatus = 'edit' } = status || {};
                localStatus = innerStatus;
            }

            if (localStatus !== globalStatus) {
                this.core.setGlobalStatus(localStatus);
            }

            this.core.setValues({
                dataSource: formatDataSource,
                value: formatValue,
            });
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

        syncDeletedValues = (values, event) => {
            const { selectKey } = this.props;
            const { dataSource = [], value = [] } = values || {};
            const { index = -1, item } = event || {};
            if (index !== -1 && value.length > 0) {
                const itemValues = item.getValues() || {};
                return {
                    dataSource,
                    value: value.filter(valItem => valItem[selectKey] !== itemValues[selectKey]),
                };
            }
            return values;
        }

        handleChange = (values, fireKeys, ctx) => {
            const { onChange } = this.props;
            const { currentEventOpts } = ctx;
            const { type } = currentEventOpts || {};
            if (type === 'delete') {
                const syncedValues = this.syncDeletedValues(values, currentEventOpts);
                onChange(syncedValues, fireKeys, ctx);
            } else {
                onChange(values, fireKeys, ctx);
            }
        }

        updateRepeater = (value) => {
            // 强制刷新repeater，否则datasource内的内容不会刷新
            this.core.setValue('value', value);
            this.repeater.current.forceUpdate();
        }

        renderTrigger = (_, { values }) => {
            const {
                selectMode, isSelectDisabled, asyncHandler, selectKey,
            } = this.props;
            const { select: asyncSelect } = asyncHandler || {};
            const val = this.core.getValue('value') || [];
            const globalStatus = this.core.getGlobalStatus();

            let disabled = false;
            if (isSelectDisabled) {
                disabled = isSelectDisabled(values);
            }

            if (globalStatus === 'preview') {
                disabled = true;
            }

            const valuesKey = values[selectKey];
            const icChecked = !!val.find(lastItem => valuesKey === lastItem[selectKey]);
            const { TriggerCom } = this;

            return (<TriggerCom
                disabled={disabled}
                value={icChecked}
                onChange={async (checked) => {
                    let lastVal = this.core.getValue('value') || [];
                    if (selectMode === 'single') {
                        if (checked) {
                            lastVal = [values];
                        }
                    } else if (checked) {
                        lastVal.push(values);
                    } else {
                        lastVal = lastVal.filter(lastItem => valuesKey !== lastItem[selectKey]);
                    }

                    if (asyncSelect) {
                        let canSyncSelect = true;
                        try {
                            canSyncSelect = await asyncSelect(checked, values, lastVal);
                        } catch (e) {
                            canSyncSelect = false;
                        }

                        if (canSyncSelect) {
                            this.updateRepeater(lastVal);
                        }
                    } else {
                        this.updateRepeater(lastVal);
                    }
                }}
            />);
        }

        renderSelectTrigger = () => {
            const { selectMode } = this.props;
            const { TriggerCom } = this;

            if (selectMode === 'single' || selectMode === 'multiple') {
                return (<FormItem className="select-repeater-feature-head" renderCell={this.renderTrigger} status="hidden" name="selected">
                    <TriggerCom />
                </FormItem>);
            }

            return null;
        }

        render() {
            const { children } = this.props;
            const otherprops = { ...this.props };
            delete otherprops.children;
            delete otherprops.onChange;
            delete otherprops.selectMode;
            delete otherprops.selectFormConfig;

            let inheritProps = {};
            if (this.item) {
                inheritProps = this.getSuperFormProps(this.item);
            }

            return (<Form {...inheritProps} core={this.core} onChange={this.handleChange}>
                <Item name="dataSource">
                    <Com {...otherprops} ref={this.repeater}>
                        {this.renderSelectTrigger()}
                        {children}
                    </Com>
                </Item>
            </Form>);
        }
    };
}
