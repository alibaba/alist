/// <reference path="./status.d.ts" />
/// <reference path="./item.d.ts" />
/// <reference path="./event.d.ts" />
/// <reference path="./error.d.ts" />

export interface FormConfig {
    validateConfig?: any,
    values?: Map<String, any>,
    status?: Map<String, Status>,
    globalStatus?: Status,
    interceptor?: Map<string, () => void>,
    initialized: () => void,
    autoValidate: Boolean, // 值改变自动触发校验
    disabledSyncChilcForm, // 低级API, 仅框架内部使用
}


export interface FormCore {
    /** onChange函数，当字段变更时触发 */
    onChange: (firekeys: Array<string>, values: Object, ctx: FormCore) => void,
    /** 子项Map, 包含FormItem/Item/If */
    children: Array<ItemCore>,
    /** 子项列表, 包含FormItem/Item/If */
    childrenMap: Map<string, ItemCore>,
    /**  手动触发值变更还是API触发 */
    currentEventType: ('api' | 'manual'),
    /** 是否启用自动校验，当字段切换时触发 */
    autoValidate: Boolean,
    /** 全局状态 */
    globalStatus: Status,
    /** 是否初始化完成 */
    initialized: Boolean,

    /** 校验规则 */
    validateConfig: any, // 与asyncHandler完全一致
    /** 切面，值变更时触发，能够改变最后结果 */
    interceptor: Map<string, (value: any, ctx: FormCore) => any>,

    /** 基础数据维度 */
    value: Map<String, any>,
    status: Map<String, Status>,
    error: Map<String, any>,
    props: Map<String, Object>,

    /** 事件总线 */ 
    emitter: EventEmitter,
    /** 唯一 */
    id: String,

    /** 事件监听原子方法 */
    on: (key: String, callback: (payload: any) => void) => void,
    /** 事件触发原始方法 */
    emit: (key: String, payload: any) => void,
    /** 移除事件监听 */
    removeListener: () => void,

    /** 值变更时触发，通知JSX更新 */
    handleChange: (name: String) => {},
    /** 检验单字段 */
    validateItem: (name: String, cb: () => void, opts: Object) => Promise<Error>,
    /** 校验全部字段，返回prmise<错误信息> */
    validateAll: (cb: () => Object) => Promise<Error>,
    /** 通用的校验方法，可以决定是否触发渲染 */
    validateBase: (cb: () => Object, withRender: Boolean) => Promise<Error>,
    /** 校验, 返回prmise<错误信息> */
    validate: (cb: () => Object) => Promise<Error>,
    /** 滚动到第一个错误信息的位置 */
    scrollToError: () => void,
    /** 处理错误信息，内部使用 */   
    handleErrors: (withRender: Boolean, errs: Map<String, any>) => Map<String, any>,
    /** 设置值，触发渲染 */
    setValues: (values: Map<string, any>) => void
    /** 设置状态 */
    setStatus: (status: Map<string, Status>) => void
    /** 设置值，触发渲染 */
    setErrors: (errors: Map<string, any>) => void
    /** 设置值，触发渲染 */
    setProps: (props: Map<string, Object>) => void
    /** 设置单字段值，触发渲染 */
    setItemValues: (name: String, value: any) => void
    /** 设置单字段状态 */
    setItemStatus: (name: String, status: Status) => void
    /** 设置单字段值，触发渲染 */
    setItemErrors: (name: String, error: any) => void
    /** 设置单字段值，触发渲染 */
    setItemProps: (name: String, props: Object) => void
    /** 静默设置值, 不触发渲染， 不触发校验 */   
    setValueSilent: (values: Map<string, any>) => void,
    /** 重置值，可根据keys来设置，默认为全部keys */
    reset: (keys: Array<string>) => void, 
    /** 设置全局状态 */
    setGlobalStatus: (Status) => void,
    /** 获取全局状态 */
    getGlobalStatus: () => Status,
    /** 获取所有值, type为类型 */
    getAll: (type: EventType, name: String) => Map<string, any>,
    /** 获取单类型，经过filter(内部用于过滤大对象或非法对象） */
    get: (type: EventType, name: String) => Map<string, any>,
    /** 绑定子表单项(FormItem/Item/If) */
    addField: (props: FieldProps) => void,
    /** 更新子表单项(FormItem/Item/If) */
    updateField: (props: FieldProps) => void,
    /** 过滤大对象，主要用于无线嵌套Form的内部实现，业务层不会用到 */
    filter: (value: Object) => Map<string, any>,
    /** 更新校验规则 */
    setValidateConfig: (config: any) => void
}

export interface FormCore_Static {
    new (formConfig: FormConfig): FormCore
}
