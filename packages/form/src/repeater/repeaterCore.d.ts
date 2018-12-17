/// <reference path="../core/status.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/event.d.ts" />
/// <reference path="../core/error.d.ts" />


export interface AsyncHandlerResult {
    /** 决定是否渲染 */
    success: Boolean,
    /** 决定当前元素数据 */
    item: Any,
    /** 决定当前所有元素的数据 */
    values: Array<Any>
}

export interface Option {
    /** 值 */
    value?: Array<Any>,
    /** 状态 */
    status?: Status,
    /** 表单配置, 参考formCore */
    formConfig?: FormConfig,
    /** 异步钩子函数 */
    asyncHandler?: Map<string, () => AsyncHandlerResult>,
}

export interface RepeaterCore {
    /** formCore list */
    formList: Array<FormCore>,
    /** 状态 */
    status: Status,
    /** 表单配置, 参考formCore */
    formConfig: FormConfig,
    /** 异步钩子函数 */
    asyncHandler: Map<string, () => AsyncHandlerResult>,

    /** 更新状态 */
    updateStatus: (status: Status) => void,
    /** 执行校验，相当于itemCore的子项校验 */
    validate: (cb: () => Promise<Error>, opts: Object) => void,
    /** 更新formCore配置属性 */
    updateProps: (props: FormCore) => void,
    /** 切换状态，内部用于切换当前焦点行 */
    setEditWhenFocus: () => void,
    /** 生成一个formCore，用于插入数据或者生成空FormCore用于空校验 */
    generateCore: (values: Any) => FormCore,
    /** 获取值 */
    getValue: () => Array<Any>,
    
    /** 添加一行数据（TableRepeater模式下） */
    add: (core: FormCore) => Boolean,
    /** 更新一行数据（TableRepeater模式下） */
    update: (core: FormCore, id: String) => Boolean,
    /** 自动触发save（InlineRepeater模式下） */
    autoSaveInline: () => Boolean,
    /** 添加一行数据（InlineRepeater模式下） */
    addInline: () => Boolean,
    /** 保存临时编辑项（InlineRepeater模式下） */
    saveInline: (id: String) => Boolean,
    /** 撤销临时编辑项（InlineRepeater模式下） */
    cancelInline: (id: String) => Boolean,
    /** 更新一行数据（InlineRepeater模式下） */
    updateInline: (core: FormCore, id: String) => Boolean,
    /** 更新一行数据（InlineRepeater multiple模式下） */
    updateMultiple: () => (value: Any, keys: Array<string>, ctx: FormCore) => Boolean,
    /** 增加一行数据（InlineRepeater multiple模式下） */
    addMultipleInline: () => (value: Any, keys: Array<string>, ctx: FormCore) => Boolean,
    /** 删除一行数据 */
    remove: (core: FormCore, id: String) => Boolean,
 
    /** 标准化asynchandler的返回结果 */
    handleAsyncResult: (res: Any) => handleAsyncResult
    /** 实际更新value的原子函数 */
    updateValue: (value: Array<any>, event: String, cb: (core: FormCore) => FormCore) => void
}

export interface RepeaterCore_Static {
    new (options: Option): RepeaterCore
}