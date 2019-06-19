/// <reference path="./status.d.ts" />
/// <reference path="./form.d.ts" />
/// <reference path="./event.d.ts" />

export interface FieldProps {
    /** 当前item的表单核心 */
    form: FormCore,
    /** 事件监听原子方法 */
    on: (key: String, callback: (payload: Any) => void) => void,
    /** 事件触发原始方法 */
    emit: (key: String, payload: Any) => void,
    /** 移除事件监听 */
    removeListener: () => void,
}

export interface ItemCore {
    /** 当前item的表单核心 */
    form: FormCore,
    /** 事件监听原子方法 */
    on: (key: String, callback: (payload: Any) => void) => void,
    /** 事件触发原始方法 */
    emit: (key: String, payload: Any) => void,
    /** 移除事件监听 */
    removeListener: () => void,
    /** 当前字段名 */
    name: String,
    /** 当前字段值 */
    value: Any,
    /** 当前字段属性 */
    props: Object,
    /** 当前字段状态 */
    status: Status,
    /** 决定是否需展示，值变更时触发 */
    when: (values: Any, ctx: FormCore) => Boolean,
    /** 嵌套If的父If */
    parentIf: ItemCore,
    /** 错误 */
    error: Any,
    /** 校验规则 */
    validateConfig: Any,
    /** 切面，值变更时触发，决定最终值的设定 */
    interceptor: (value: Any, ctx: FormCore) => Any,
    /** FormItem/Item的子项，主要是子表单或者非常复杂的组件进行子项校验时用到 */
    subField,
    /** 唯一Id */
    id: String,

    /** 获取单类型维度数据 */
    get: (type: EventType) => Any,
    /** 设置单类型维度数据, escape用于对象型数据， silent是否触发渲染 */
    set: (type: EventType, value: Any, escape: Boolean, silent: Boolean) => Any,
    /** 设置校验规则 */
    setValidateConfig: (Any) => void,
    /** 每次事件通知需要重新渲染前执行，更新所有ItemCore相关字段 */
    selfConsistent: () => void,
    /** 重新计算ItemCore的props字段 */
    consistProps: () => void,
    /** 重新计算ItemCore的status字段 */
    consistStatus: (value: Any, silent: Boolean) => void,
    /** 计算when的结果 */
    calulateWhen: (value: Any, when: (value: Any, form: FormCore) => Boolean) => Boolean,
    /** 计算嵌套If的整体结果（整条链路的 且 结果） */
    calculateIfList: (value: Any) => Boolean,
    /** 重新计算ItemCore的when字段, 副作用是决定元素是否显示  */
    consistWhen: (value: Any, status: Status) => void,
    /** 重新计算校验规则，用于实现动态校验规则 */
    consistValidate: () => void
}

export interface ItemCore_Static {
    new (fieldProps: FieldProps): ItemCore
}

export default ItemCore;
