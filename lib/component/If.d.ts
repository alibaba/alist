/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/status.d.ts" />

import React from 'react';
import EventEmitter from 'events';

export interface IfProps {
    /** 样式、布局相关 */
    style?: Object,
    className?: String,
    
    /** 核心相关 */
    name: String,
    when: () => boolean, // 决定是否要渲染
    /** 渲染相关 */
    Com?: Any, // if的渲染元素，默认为span
}

export default class If extends React.Component<IfProps, any> {
    didMount: Boolean; // 初始化渲染完成
    core: FormCore; // 表单核心
    ifCore: ItemCore; // if核心，继承于item
    update: () => void; // 更新，当值改变时会触发when的计算
}
