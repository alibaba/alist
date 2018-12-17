import React from 'react';
import moment from 'moment';
import { value2moment, moment2value } from '../common/moment';
import { getValueProps } from '../common/util';
import { Text, CheckboxGroup, RadioGroup, Radio, Checkbox,
    Switch, Range, AutoComplete, CascaderSelect,
    Upload, Rate, NumberPicker, Select,
    TimePicker, DatePicker, SubDatePicker } from '../common/wrapper';

const fetchFileUrl = '';
const defaultFileUploadProps = {
    prefix: 'next-',
    listType: 'text',
    type: 'file',
    value: [],
    language: 'zh-cn',
    uploadBtnText: '',
    fetchFileUrl,
    className: '',
    limit: 10,
    formatter(res) {
        // 函数里面根据当前服务器返回的响应数据
        // 重新拼装符合组件要求的数据格式
        return {
            code: res.code,
            imgURL: fetchFileUrl + res.fs_url,
            imgUrl: fetchFileUrl + res.fs_url,
            // downloadURL 是提交给后端，后端可能获取这个值，用于兼容
            downloadURL: fetchFileUrl + res.fs_url,
            // downloadUrl 是针对于上传成功以后的下载链接
            downloadUrl: fetchFileUrl + res.fs_url,
            fileURL: fetchFileUrl + res.fs_url,
            size: res.size,
            fileMd5: res.hash,
            fs_url: res.fs_url,
        };
    },
    beforeUpload() { },
    onChange() { },
    onSuccess() { },
};

class WrapperClass {
    constructor(NextSource) {
        this.Next = NextSource;
    }

    Input = (props) => {
        return Text(this.Next.Input, props);
    }

    TextArea = (props) => {
        return Text(this.Next.Input.TextArea, props);
    }

    Select = (props) => {
        return Select(this.Next.Select, props, { previewClass: 'next-preview-select' })
    }

    CheckboxGroup = (props) => {
        return CheckboxGroup(this.Next.Checkbox.Group, props);
    }

    RadioGroup = (props) => {
        return RadioGroup(this.Next.Radio.Group, props);
    }

    Checkbox = (props) => {
        return Checkbox(this.Next.Checkbox, props);
    }

    Radio = (props) => {
        return Radio(this.Next.Radio, props);
    }

    Switch = (props) => {
        return Switch(this.Next.Switch, props);
    }

    Range = (props) => {
        return Range(this.Next.Range, props, { previewClass: 'next-preview-range' })
    }    

    NumberPicker = (props) => {
        return NumberPicker(this.Next.NumberPicker, props);
    }

    Rating = (props) => {
        return Rate(this.Next.Rating, props);
    }

    CascaderSelect = (props) => {
        return CascaderSelect(this.Next.CascaderSelect, props, { previewClass: 'next-preview-select' })
    }

    AutoComplete = (props) => {
        return AutoComplete(this.Next.Select.AutoComplete, props, { previewClass: 'next-preview-select-auto-complete', previewProps: {
            locale: { autoCompletePlaceHolder: '' }
        } })
    }

    DatePicker = (props) => {
        let defaultFormat = `YYYY-MM-DD${props.format ? ' HH:mm:ss' : ''}`;
        const { format = defaultFormat } = props;
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : value2moment(moment, val, format)),
        });

        const onChange = (dateVal) => {
            const formatDate = moment2value(dateVal, format);
            props.onChange && props.onChange(formatDate);
        };

        const previewProps = {
            locale: {
                datetimePlaceholder: '',
                placeholder: '',
            },
        }
        return DatePicker(this.Next.DatePicker, props, {
            valueProps,
            previewClass: 'next-preview-datepicker',
            onChange,
            previewProps
        });
    }

    TimePicker = (props) => {
        const { format = 'HH:mm:ss' } = props;
        const valueProps = getValueProps(props, {
            format: val => (!val ? null : value2moment(moment, val, format)),
        });
        
        const onChange = (dateVal) => {
            const formatDate = moment2value(dateVal, format);
            props.onChange && props.onChange(formatDate);
        };

        const TimeComponent = this.Next.TimePicker;
        return TimePicker(TimeComponent, props, {
            previewClass: 'next-preview-datepicker',
            valueProps,
            onChange
        });
    }

    Upload = (props) => {
        const onChange = (fileList) => {
            props.onChange && props.onChange(fileList, { escape: true });
        };

        return Upload(this.Next.Upload, props, {
            defaultProps: defaultFileUploadProps,
            onChange,
            previewClass: 'next-preview-upload'
        });
    }

    SubDatePicker = (subType, props) => {
        const { showTime, format } = props;
        let defaultFormat = 'YYYY-MM-DD';
        switch (subType) {
            case 'RangePicker': defaultFormat = 'YYYY-MM-DD'; break;
            case 'MonthPicker': defaultFormat = 'YYYY-MM'; break;
            case 'YearPicker': defaultFormat = 'YYYY'; break;
        }

        const defaultTimeFormat = (showTime && showTime.format) || 'HH:mm';
        const baseFormat = format || defaultFormat;
        const ftFormat = baseFormat + (showTime ? ` ${defaultTimeFormat}` : '');
        const valueProps = getValueProps(props, {
            format: val => {
                if (!val) return null;
                if (Array.isArray(val)) {
                    return val.map((itemValue) => {
                        return value2moment(moment, itemValue, ftFormat);
                    });
                } else {
                    return value2moment(moment, val, ftFormat);
                }
            },
        });

        const onChange = (dateVal) => {
            let formatDate = undefined;
            if (Array.isArray(dateVal)) {                
                formatDate = dateVal.map((itemVal) => {
                    return moment2value(itemVal, ftFormat);
                });
            } else {
                formatDate = moment2value(dateVal, ftFormat);
            }
            
            props.onChange && props.onChange(formatDate, { escape: true });
        };

        return SubDatePicker(this.Next.DatePicker, subType, props, {
            onChange,
            valueProps,
            prefix: 'next',
            format: ftFormat,
            previewClass: 'next-preview-datepicker',
            previewProps: {
                locale: {
                    datetimePlaceholder: '',
                    placeholder: '',
                    monthPlaceholder: '',
                    yearPlaceholder: '',
                    startPlaceholder: '',
                    endPlaceholder: '',
                }
            }
        });
    }    

    format = () => {
        const result = [
            'Input',
            'Select',
            'Checkbox',
            'Radio',
            'Switch',
            'Range',
            'DatePicker',
            'TimePicker',
            'NumberPicker',
            'Rating',
            'CascaderSelect',
            'Upload',
        ].reduce((ret, key) => {
            this[key].displayName = `wrapper(${key})`;
            let extraProps = {};
            if (this.Next[key]) {
                extraProps = { ...this.Next[key] };
            }

            const that = this;
            Object.keys(extraProps).forEach((extraKey) => {
                that[key][extraKey] = extraProps[extraKey];
            });
            ret[key] = this[key];

            return ret;
        }, {});

        result.Checkbox.Group = this.CheckboxGroup;
        result.Radio.Group = this.RadioGroup;
        result.Input.TextArea = this.TextArea;
        result.Select.AutoComplete = this.AutoComplete;
        result.DatePicker.RangePicker = this.SubDatePicker.bind(this, 'RangePicker');
        result.DatePicker.MonthPicker = this.SubDatePicker.bind(this, 'MonthPicker');
        result.DatePicker.YearPicker = this.SubDatePicker.bind(this, 'YearPicker');

        if (this.Next.Select) {
            result.Select.Option.displayName = 'wrapper(Option)';
        }

        return {
            ...this.Next,
            ...result,
        };
    }
}



function wrapper(NextSource) {
    const instance = new WrapperClass(NextSource);
    return instance.format();
}

export default wrapper;
