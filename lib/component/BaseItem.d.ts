/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/status.d.ts" />

import React from 'react';
import EventEmitter from 'events';

// 无布局的FormItem
export interface BaseItemProps {
    onFocus?: () => void,
    onBlur?: () => void,
    
    /** 核心相关 */
    name: String,
    form: FormCore,
}

export default class BaseItem extends React.Component<BaseItemProps, any> {
    form: FormCore; // 表单core
    item: ItemCore; // 当前itemCore
    didMount: Boolean; // 初始化渲染完成
    update: () => void; // 事件触发更新
}
