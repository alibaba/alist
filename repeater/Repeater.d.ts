/// <reference types="react" />
/// <reference path="../core/form.d.ts" />
/// <reference path="../core/item.d.ts" />
/// <reference path="../core/status.d.ts" />
/// <reference path="./repeaterCore.d.ts" />

export interface FormStyleConfig {
    name: String,
    label: String,
    prefix: String,
    suffix: String,
    multiple: Boolean,
    renderCell: () => any,
    style: Object,
    status: Status,
    className: String,
}

export interface RepeaterTextMap {
    /** 添加按钮文案 */
    addText: String
    /** 更新按钮文案 */
    updateText: String
    /** 删除按钮文案 */
    deleteText: String
    /** 弹窗添加按钮文案 */
    dialogAddText: String
    /** 弹窗更新按钮文案 */
    dialogUpdateText: String
    /** 弹窗删除按钮文案 */
    dialogDeleteText: String
    /** 保存按钮文案 */
    saveText: String
    /** 取消按钮文案 */
    cancelText: String
    /** 操作按钮文案（表头） */
    operateText: String
    /** 确定按钮文案 */
    okText: String
    /** 删除确认按钮文案 */
    deleteConfirmText: String
}

export interface RepeaterProps {
    /** 是否inline模式 */
    inline: Boolean,  
    /** 是否multiple模式 */
    multiple: Boolean,  
    /** 是否有删除操作按钮 */  
    hasDelete: Boolean,  
    /** 是否有编辑操作按钮 */  
    hasUpdate: Boolean,  
    /** 是否有添加操作按钮 */  
    hasAdd: Boolean,  
    /** 是否有表头 */  
    hasHeader: Boolean,
    /** 最长可增加到多少行 */
    maxLength: Number,
    /** 自定义过滤器元素 */
    filterElement: any,
    /** 过滤器输入时触发 */
    handleSearch: (searchText: String) => void,
    /** 是否有过滤器 */
    filter: Boolean,
    /** 添加按钮的位置 */
    addPosition: ('top' | 'bottom'),
    /** 对齐方式 */
    itemAlign: ('left' | 'center' | 'right'),
    /** 当前状态 */
    status: Status,
    /** repeaterCore */
    repeaterCore: RepeaterCore,
    /** formCore 配置 */
    formProps: FormConfig,
    /** 返回repeater所有配置文案 */
    getText: () => RepeaterTextMap,
    /** 样式 */
    style: Object,
    /** className */
    className: String,

    /** view自定义视图函数 */
    view: (formList: Array<FormCore>) => any,
}

export default class Repeater extends React.Component<RepeaterProps, any> {
    /** 获取Form的样式相关配置 */
    getItemsConfig: () => FormStyleConfig;
    /** 判断是否需要显示操作按钮 */
    hasOperBtn: () => Boolean;
    /** 渲染过滤input */
    renderFilter: () => any;
    /** 渲染列表 */
    renderRowList: () => Array<any>;
    /** 渲染容器 */
    renderContainer: () => any;
    /** 渲染自定义视图 */
    renderView: () => any;
}
