import React from 'react';

const IS_REACT_GREATER_FITHTEEN = parseInt(React.version) > 15;
let Next;

function formatValue(value) {
    if (value === null || value === undefined) return '';
    return value; // 0 或 []直接返回
}

function formatArray(value) {
    if (value === null || value === undefined) return [];
    return value;
}

function formatDate(value) {
    if (value === null || value === undefined) return '';
    if (Next && Next.moment) {
        return Next.moment(value).format('YYYY-MM-DD');
    }
    return value;
}

function formatBoolValue(value) {
    if (value === null || value === undefined) return false;
    if (value === true || value === 'true') {
        return true;
    } else if (value === false || value === 'false') {
        return false;
    }
    return false;
}

function renderValue(value) {
    if (value === null || value === undefined) return null; // 空值直接返回
    if (Array.isArray(value)) { // 数组需要判断版本号返回
        const arrValue = value.map(valItem => <span className="multi-value-item">{valItem}</span>);

        return IS_REACT_GREATER_FITHTEEN ? arrValue : <span className="multi-value-item-wrapper">{arrValue}</span>;
    }

    return IS_REACT_GREATER_FITHTEEN ? value : <span className="multi-value-item">{value}</span>;
}

function renderOption(props = {}) { // 处理
    const value = formatValue(props.value); // 格式化值
    const arrValue = [].concat(value); // 处理多选, 如checkbox
    if (Array.isArray(props.dataSource)) { // dataSource模式
        const hitLabel = [];
        props.dataSource.forEach((item) => {
            if (arrValue.indexOf(item.value) !== -1) {
                hitLabel.push(item.label);
            }
        });

        return renderValue(hitLabel);
    } else if (Array.isArray(props.children)) { // children模式
        const hitLabel = [];
        props.children.forEach((item) => {
            if (item.props && item.props.children && arrValue.indexOf(item.props.value) !== -1) {
                hitLabel.push(item.props.children);
            }
        });

        return renderValue(hitLabel);
    }
    return null;
}

const fetchFileUrl = '';
const defaultFileUploadProps = {
    prefix: 'next-',
    type: 'file',
    fileList: [],
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

function Input(props) {
    const value = props.value || '';
    // TODO: 需要确认Textarea
    if (props.status === 'preview') return renderValue(value); // 处理预览态
    return <Next.Input {...props} value={value} />;
}

function Select(props) {
    const { className = '' } = props;
    const value = formatValue(props.value); // 格式化值

    // if(props.status === 'preview') return renderOption(props);
    if (props.status === 'preview') return <Next.Select {...props} disabled className={`${className || ''} next-preview-select`} value={value} />;
    return <Next.Select {...props} value={value} />;
}

function CheckboxGroup(props) {
    const value = formatArray(props.value); // 格式化值

    if (props.status === 'preview') return renderOption(props);
    return <Next.Checkbox.Group {...props} value={value} />;
}

function RadioGroup(props) {
    const value = formatValue(props.value); // 格式化值

    if (props.status === 'preview') return renderOption(props);
    return <Next.Radio.Group {...props} value={value} />;
}

function Checkbox(props) {
    const checked = formatBoolValue(props.value);

    if (props.status === 'preview') {
        if (props.children) { // 存在label
            return checked ? renderValue(props.children) : null;
        } // 不存在
        console.warn('label必须写在Checkbox内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告
        return null;
    }

    return <Next.Checkbox {...props} checked={checked} />;
}

function Radio(props) {
    const checked = formatBoolValue(props.value);

    if (props.status === 'preview') {
        if (props.children) { // 存在label
            return checked ? renderValue(props.children) : null;
        } // 不存在
        console.warn('label必须写在Radio内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告
        return null;
    }

    return <Next.Radio {...props} checked={checked} />;
}

function Switch(props) {
    const checked = formatBoolValue(props.value);

    if (props.status === 'preview') {
        if (props.checkedChildren || props.unCheckedChildren) { // 存在label
            const checkedStr = checked ? props.checkedChildren : props.unCheckedChildren;
            return renderValue(checkedStr);
        } // 不存在
        return renderValue(`${checked}`);
    }

    return <Next.Switch {...props} checked={checked} />;
}

function Range(props) {
    const value = formatValue(props.value);

    if (props.status === 'preview') {
        return <Next.Range {...props} disabled value={value} />;
    }

    return <Next.Range {...props} value={value} />;
}

function DatePicker(props) {
    const { className = '' } = props;
    const value = formatValue(props.value);

    if (props.status === 'preview') {
        const placeholderClearer = {
            datePlaceholder: '',
            monthPlaceholder: '',
            yearPlaceholder: '',
            rangeStartPlaceholder: '',
            rangeEndPlaceholder: '',
        };
        return <Next.DatePicker {...props} value={value} locale={placeholderClearer} disabled className={`${className || ''} next-preview-datepicker`} />;
    }

    const onChange = (_, formatDate) => {
        props.onChange && props.onChange(formatDate);
    };

    return <Next.DatePicker {...props} value={value} onChange={onChange} />;
}

function TimePicker(props) {
    const { className = '' } = props;
    const value = formatValue(props.value);

    if (props.status === 'preview') {
        const placeholderClearer = {
            placeholder: '',
        };
        return <Next.TimePicker {...props} value={value} locale={placeholderClearer} disabled className={`${className || ''} next-preview-datepicker`} />;
    }

    const onChange = (_, formatDate) => {
        props.onChange && props.onChange(formatDate);
    };

    return <Next.TimePicker {...props} value={value} onChange={onChange} />;
}

function NumberPicker(props) {
    const value = formatValue(props.value);

    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return <Next.NumberPicker {...props} value={value} />;
}

function Rating(props) {
    const value = formatValue(props.value);

    if (props.status === 'preview') {
        return <Next.Rating {...props} disabled value={value} />;
    }

    return <Next.Rating {...props} value={value} />;
}

function Search(props) {
    const value = formatValue(props.value);

    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return <Next.Search {...props} value={value} />;
}

function CascaderSelect(props) {
    const { className = '' } = props;
    const value = formatValue(props.value);
    if (props.status === 'preview') {
        return <Next.CascaderSelect {...props} className={`${className || ''} next-preview-select`} disabled value={value} />;
    }
    return <Next.CascaderSelect {...props} value={value} />;
}

function TreeSelect(props) {
    const { className = '' } = props;
    const value = formatValue(props.value);
    if (props.status === 'preview') {
        return <Next.TreeSelect {...props} className={`${className || ''} next-preview-select`} disabled value={value} />;
    }
    return <Next.TreeSelect {...props} value={value} />;
}

function Upload(props) {
    const value = formatArray(props.value);
    const { name, ...others } = props;
    const { className = '' } = props;

    if (props.status === 'preview') {
        return <Next.Upload {...defaultFileUploadProps} {...others} onChange={onChange} className={`${className || ''} next-preview-upload`} disabled fileList={value} />;
    }

    const onChange = (origin) => {
        const { fileList = [] } = origin || {};
        props.onChange && props.onChange(fileList);
    };

    return <Next.Upload {...defaultFileUploadProps} {...others} onChange={onChange} fileList={value} />;
}

function ImageUpload(props) {
    const value = formatArray(props.value);
    const { name, ...others } = props;
    const { className = '' } = props;

    if (props.status === 'preview') {
        return <Next.Upload.ImageUpload {...others} onChange={onChange} className={`${className || ''} next-preview-upload`} disabled fileList={value} />;
    }

    const onChange = (origin) => {
        const { fileList = [] } = origin || {};
        props.onChange && props.onChange(fileList);
    };

    return <Next.Upload.ImageUpload {...others} onChange={onChange} fileList={value} />;
}

function AutoComplete(props) {
    return <Next.Select.AutoComplete {...props} />;
}

function wrapper(NextSource) {
    Next = NextSource;

    if (Next.Select && Next.Select.Option) Select.Option = Next.Select.Option;
    Checkbox.Group = CheckboxGroup;
    Radio.Group = RadioGroup;
    if (Next.TreeSelect) TreeSelect.Node = Next.TreeSelect.Node;
    Upload.ImageUpload = ImageUpload;
    Select.AutoComplete = AutoComplete;

    return {
        ...NextSource,
        Input,
        Select,
        Checkbox,
        Radio,
        Switch,
        Range,
        DatePicker,
        TimePicker,
        NumberPicker,
        Rating,
        Search,
        CascaderSelect,
        TreeSelect,
        Upload,
    };
}

export default wrapper;
