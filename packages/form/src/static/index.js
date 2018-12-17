// 组件变更
const ANY_CHANGE = 'ANY_CHANGE';

// 组件属性
const CHANGE = 'change';
const FOCUS = 'FOCUS';
const BLUR = 'BLUR';

// 基础属性变更
const VALUE_CHANGE = 'VALUE_CHANGE';
const ERROR_CHANGE = 'ERROR_CHANGE';
const PROPS_CHANGE = 'PROPS_CHANGE';
const STATUS_CHANGE = 'STATUS_CHANGE';
const INITIALIZED = 'INITIALIZED';
const GLOBAL_STATUS_CHANGE = 'GLOBAL_STATUS_CHANGE';
const BASIC_EVENT = {
    value: VALUE_CHANGE,
    error: ERROR_CHANGE,
    props: PROPS_CHANGE,
    status: STATUS_CHANGE,
    globalStatus: GLOBAL_STATUS_CHANGE,
};

// 状态枚举
const EDIT = 'edit';
const PREVIEW = 'preview';
const DISABLED = 'disabled';
const HIDDEN = 'hidden';
const STATUS_ENUMS = new Set([EDIT, PREVIEW, DISABLED, HIDDEN]);

export {
    ANY_CHANGE,
    BASIC_EVENT,
    CHANGE,
    BLUR,
    FOCUS,
    VALUE_CHANGE,
    ERROR_CHANGE,
    PROPS_CHANGE,
    STATUS_CHANGE,
    STATUS_ENUMS,
    EDIT,
    PREVIEW,
    DISABLED,
    HIDDEN,
    INITIALIZED,
};
