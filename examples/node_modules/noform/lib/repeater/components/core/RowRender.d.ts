/// <reference types="react" />

import React from "react";

export interface FormItem {
    name: string,
    label: string
}

export interface RowRenderProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
    /** 有效的FormItem数组, 格式{name,label} */
    itemsConfig: Array<FormItem>,
    /** repeaterCore */
    repeaterCore: any,
    /** repeaterCore add  */
    doAdd?: (core: any) => void,
    /** repeaterCore update  */
    doUpdate?: (val: any, idx: number) => void,
    /** repeaterCore delete  */
    doDelete?: (idx: number) => void,
    /** repeaterCore save draft  */
    doSave?: (idx: number) => void,
    /** repeaterCore cancel draft  */
    doCancel?: (idx: number) => void,
    /** repeaterCore add draft  */
    doAddInline?: () => Promise,
    /** repeaterCore update draft  */
    doUpdateInline?: (idx: number) => Promise,
    /** repeater组件的props  */
    jsxProps: any,
}

export default class RowRender extends React.Component<RowRenderProps, any> {
    getChildContext(): RowRenderProps {}
    /** 获取当前行的core  */
    getCore(): any{}
    /** 获取当前行的index  */
    getIdx(): number{}
}
