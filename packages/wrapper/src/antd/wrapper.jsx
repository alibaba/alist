import React from 'react';
import { insetify, getValueProps, getCleanProps } from '../common/util';
import { Text, CheckboxGroup, RadioGroup, Radio, Checkbox,
    Switch, Range, AutoComplete, CascaderSelect,
    Upload, Rate, NumberPicker, Select,
    TimePicker, DatePicker, SubDatePicker
} from '../common/wrapper';

const prefix = 'ant';

const defaultFileUploadProps = {
    fileList: [],
    beforeUpload() { },
    onChange() { },
    onSuccess() { },
};

class WrapperClass {
    constructor(AntdSource) {
        this.Antd = AntdSource;
    }

    Input = (props) => {
        return Text(this.Antd.Input, props);
    }

    TextArea = (props = {}) => {
        return Text(this.Antd.Input.TextArea, props);
    }

    Select = (props) => {
        const { options } = props;
        const formatProps = { ...props, dataSource: options };
        delete formatProps.options;
        return Select(this.Antd.Select, formatProps, { previewClass: `${prefix}-preview-select` });
    }

    CheckboxGroup = (props) => {
        return CheckboxGroup(this.Antd.Checkbox.Group, props);
        
    }

    RadioGroup = (props) => {
        return RadioGroup(this.Antd.Radio.Group, props);
    }

    Checkbox = (props) => {
        const onChange = (e) => {
            const checkedVal = e.target.checked;
            props.onChange && props.onChange(checkedVal);
        };

        const CheckboxComponent = this.Antd.Checkbox.default || this.Antd.Checkbox;
        return Checkbox(CheckboxComponent, props, { onChange });
    }

    Radio = (props) => {
        const onChange = (e) => {
            const checkedVal = e.target.checked;
            props.onChange && props.onChange(checkedVal);
        };

        const RadioComponent = this.Antd.Radio.default || this.Antd.Radio;
        return Radio(RadioComponent, props, { onChange });
    }

    Switch = (props) => {
        return Switch(this.Antd.Switch, props);
    }

    Slider = (props) => {
        return Range(this.Antd.Slider, props, { previewClass: `${prefix}-preview-slider` })
    }

    InputNumber = (props) => {
        return NumberPicker(this.Antd.InputNumber, props);
    }

    Rate = (props) => {
        return Rate(this.Antd.Rate, props);
    }

    Cascader = (props) => {
        const { style } = props;
        const previewStyle = { ...style, pointerEvents: 'none' };
        return CascaderSelect(this.Antd.Cascader, props, { previewClass: `${prefix}-preview-select`, previewStyle });
    }

    AutoComplete = (props) => {
        const { options } = props;
        const opts = { ...props };
        if (options && Array.isArray(options) && !props.children) {
            opts.children = options.map((item) => {
                const { label, value } = item;
                return <this.Antd.AutoComplete.Option key={value}>{label}</this.Antd.AutoComplete.Option>;
            });
        }

        return AutoComplete(this.Antd.AutoComplete, opts, { previewClass: `${prefix}-preview-select` })

    }

    DatePicker = (props) => {
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : val),
        });

        const onChange = (momentVal) => {
            props.onChange && props.onChange(momentVal, { escape: true });
        };

        const previewProps = {
            locale: {
                datePlaceholder: '',
                monthPlaceholder: '',
                yearPlaceholder: '',
                rangeStartPlaceholder: '',
                rangeEndPlaceholder: '',
            },
        }
        return DatePicker(this.Antd.DatePicker, props, {
            valueProps,
            previewClass: `${prefix}-preview-datepicker`,
            onChange,
            previewProps
        });
    }

    SubDatePicker = (subType, props) => {
        const { showTime, format } = props;
        const defaultFormat = 'YYYY-MM-DD';
        const ftFormat = format || (showTime ? `${defaultFormat} HH:mm:ss` : defaultFormat);
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : val),
        });

        const onChange = (momentVal) => {
            props.onChange && props.onChange(momentVal, { escape: true });
        };

        return SubDatePicker(this.Antd.DatePicker, subType, props, {
            onChange,
            valueProps,
            prefix,
            format: ftFormat,
            previewClass: `${prefix}-preview-datepicker`,
            previewProps: {
                locale: {
                    datePlaceholder: '',
                    monthPlaceholder: '',
                    yearPlaceholder: '',
                    rangeStartPlaceholder: '',
                    rangeEndPlaceholder: '',
                }
            }
        });
    }

    TimePicker = (props) => {
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : val),
        });
        
        const onChange = (momentVal) => {
            props.onChange && props.onChange(momentVal, { escape: true });
        };

        const TimeComponent = this.Antd.TimePicker.default || this.Antd.TimePicker;
        return TimePicker(TimeComponent, props, {
            previewClass: `${prefix}-preview-datepicker`,
            valueProps,
            onChange
        });
    }

    TreeSelect = (props) => {
        const { status, className = '' } = props;
        const otherProps = getCleanProps(props);
        const valueProps = getValueProps(props);
        if (status === 'preview') {
            return <this.Antd.TreeSelect placeholder="" {...otherProps} className={`${className || ''} ${prefix}-preview-select`} disabled {...valueProps} />;
        }
        return <this.Antd.TreeSelect {...otherProps} {...valueProps} {...insetify(props)} />;
    }

    Upload = (props) => {        
        const onChange = (origin) => {
            const { fileList = [] } = origin || {};
            props.onChange && props.onChange(fileList, { escape: true });
        };

        return Upload(this.Antd.Upload, props, {
            fieldName: 'fileList',
            defaultProps: defaultFileUploadProps,
            onChange,
            previewClass: `${prefix}-preview-upload`
        });
    }

    format = () => {
        const result = [
            'Input',
            'Select',
            'Checkbox',
            'Radio',
            'AutoComplete',
            'Switch',
            'Slider',
            'DatePicker',
            'TimePicker',
            'InputNumber',
            'Rate',
            'Cascader',
            'TreeSelect',
            'Upload',
        ].reduce((ret, key) => {
            this[key].displayName = `wrapper(${key})`;
            let extraProps = {};
            if (this.Antd[key]) {
                extraProps = { ...this.Antd[key] };
            }

            const that = this;
            Object.keys(extraProps).forEach((extraKey) => {
                that[key][extraKey] = extraProps[extraKey];
            });
            ret[key] = this[key];

            return ret;
        }, {});

        this.CheckboxGroup.Item = this.Antd.Checkbox;
        this.RadioGroup.Item = this.Antd.Radio;
        result.Checkbox.Group = this.CheckboxGroup;
        result.Radio.Group = this.RadioGroup;
        result.Input.TextArea = this.TextArea;
        result.DatePicker.RangePicker = this.SubDatePicker.bind(this, 'RangePicker');
        result.DatePicker.MonthPicker = this.SubDatePicker.bind(this, 'MonthPicker');
        result.DatePicker.WeekPicker = this.SubDatePicker.bind(this, 'WeekPicker');

        if (this.Antd.Select) {
            result.Select.Option.displayName = 'wrapper(Option)';
        }

        return {
            ...this.Antd,
            ...result,
        };
    }
}

function wrapper(AntdSource) {
    const instance = new WrapperClass(AntdSource);
    return instance.format();
}

export default wrapper;
