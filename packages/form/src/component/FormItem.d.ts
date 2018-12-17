/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/status.d.ts" />

import React from 'react';
import EventEmitter from 'events';

export interface FormItemProps {
    onFocus?: () => void,
    onBlur?: () => void,

    /** 样式、布局相关 */
    full?: Boolean, // 是否 100%撑开
    colon?: Boolean, // 是否带 :
    style?: Object,
    className?: String,
    prefix?: String,
    suffix?: String,
    top?: String, // 顶部展示
    help?: String, // 底部展示
    label?: String,
    inline?: Boolean, // 是否行内元素
    layout?: Layout, // 布局
    inset?: Boolean,
    
    /** 核心相关 */
    name: String,
    value: any,
    status?: Status,
    error?: any,
    props?: Object,
    interceptor?: () => void, // 切面，每次值发生改变时触发, 决定最终返回的值
    globalStatus?: Status,
    validateConfig?: any // 数组或对象，取决于asyncHandler
    map?: () => {} // 即将废弃！：内部用于实现无限嵌套Form，下个版本会放弃这种实现
}

export default class FormItem extends React.Component<FormItemProps, any> {
    form: FormCore; // 表单core
    item: ItemCore; // 当前itemCore
    didMount: Boolean; // 初始化渲染完成
    handlePredictForm: () => Boolean; // children是否为noform实例
    initialCore: () => void; // 初始化核心,
    getFullClassName: () => String; // 结合配置获取完整类名
    getLabelClassName: () => String; // 结合配置获取完整label类名（是否required）
    getWrapperClassName: () => String; // 结合配置获取wrapper的类名
    getBaseProps: () => Object; // 获取基本配置
    getSuperFormProps: () => Object; // 获取上级Form配置
}
