import { FormCore } from 'noform';

declare interface ChooseState {
    isChooseAll: boolean;
    chooseKeys: Array<String | number>;
    chooseItems: Array<any>;
}

declare interface pageData {
    pageSize: Number;
    currentPage: Number;
    total: Number;
    onChange:Function;
}

declare interface Params{
    [String]:String|Boolean|Number
}

export default class DataGridCore {
    constructor(DataGridProps)

    // 保持参数重新请求的刷新函数
    refersh(): void;
    // 获取筛选框数据 formCore.getValues()
    getFilterData(): Object;
    // 设置筛选框数据 formCore.setValues
    setFilterData(filterData: Object): void;
    // 清空筛选
    clearFilterData(): void;
    // 跳转当前位置
    setCurrentPage(num: Number): void;
    // 渲染表格数据
    setDataSource(arr: Array<Any>): void;
    // 获取当前表格数据
    getDataSource(): Array<Any>;
    // 获取分页相关数据
    getPageData(): pageData;
    // 设置url的params，但是不会触发渲染，要主动fetch下
    setParams(params: Params): void;
    // 获取url的params
    getParams(): Params;
    // 设置url，但是不会触发渲染，要主动fetch下
    setUrl(url: String): void;
    //获取url的参数
    getUrl(url: String): void;
    // core核心属性的更新，会触发渲染
    updateProps(): void;
}
