/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/status.d.ts" />
/// <reference path="./layout.d.ts" />

export interface FormProps {
    /** 挂载后获取核心的方法 **/
    onMount?: (cb: () => FormCore) => void,
    /** 表单字段变化触发 */
    onChange?: (val: Object, fireKey: Array<string>, core: any) => void,
    /** 事件触发 */
    onFocus?: () => void,
    onBlur?: () => void,

    /** 样式、布局相关 */
    full?: Boolean, // 是否 100%撑开
    colon?: Boolean, // 是否带 :
    style?: Object,
    className?: String,
    direction?: ('vertical' | 'horizontal'), // 布局方向
    inset?: Boolean,
    
    /** 核心相关 */
    core?: FormCore,
    props?: Map<string, Object>,
    status?: Map<string, Status>,
    value?: Map<string, any>,
    layout?: Layout,
    interceptor?: () => void, // 切面，每次值发生改变时触发, 决定最终返回的值
    error?: Object,
    globalStatus?: Status,
    validateConfig?: any, // 数组或对象，取决于asyncHandler
    map?: () => {}, // 即将废弃！：内部用于实现无限嵌套Form，下个版本会放弃这种实现

    /** 渲染相关 */
    Com?: any, // form的渲染元素，默认为div，repeater中会设置为table    
}

export default class Form extends React.Component<FormProps, any> {
    getTopForm: () => FormCore; // 获取嵌套的最顶级form核心
}
