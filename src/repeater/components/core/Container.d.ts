/// <reference types="react" />

import React from "react";

export interface FormItem {
    name: string,
    label: string
}

export interface ContainerInstance {
    props: ContainerProps,
    /** 有效的FormItem数组, 格式{name,label} */
    itemsConfig: Array<FormItem>,
    /** repeaterCore */
    core: any,
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
}

export interface ContainerProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
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
    /** 渲染container内容  */
    render: (context: ContainerInstance) => JSX.Element,
    /** repeater组件的props  */
    jsxProps: any,
}

export default class Container extends React.Component<ContainerProps, any> {
    getChildContext(): ContainerProps {
    }
}
