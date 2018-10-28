/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/status.d.ts" />

import React from 'react';
import EventEmitter from 'events';

export interface SectionProps {
    /** 核心相关 */
    core?: ItemCore,
    form?: FormCore,
    type: ('props' | 'error')
    field: ('label' | 'prefix' | 'suffix' | 'help' | 'top' | 'error'),    
}

export default class Section extends React.Component<SectionProps, any> {
    form: FormCore; // 表单core
    item: ItemCore; // 当前itemCore
    update: () => void; // 值改变时会触发渲染
    renderPropsItem: () => any; // 渲染诸如suffix, prefix之类的
    renderErrorItem: () => any; // 渲染错误信息
}
