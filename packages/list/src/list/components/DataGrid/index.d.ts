/// <reference types="react" />

import React from 'react';
import EventEmitter from 'events';

export interface DataGridProps {
    /** 挂载后获取核心的方法 **/
    onMount?: (cb: () => any) => void,

    /**  数据源 **/
    dataSource: Array<any>, // 2
    url: string, // priority 1

    /** 当前页数 */
    defaultPage?: Number,

    /** 分页大小 */
    pageSize?: Number,

    defaultFilterValues?: Object,

    query?: (DataGridQuery) => Promise<DataGridData>, // priority 3
    /** 格式化请求前的数据 **/
    formatBefore?: ((rawReq: Object) => any),
    /** 格式化请求后的数据 **/
    formatAfter?: ((rawResp: Object) => any),

    autoLoad: true,
}

export interface DataGridQuery {
    filter: Map<string, any>,

    sort?: Map<string, ('asc' | 'desc')>,

    currentPage: Number,

    pageSize: Number,
}
// json: { ...filter, sort: {} }

export interface DataGridData {
    dataList: Array<Map<string, any>>,

    currentPage: Number,

    total: Number,

    pageSize?: Number,
}

export default class DataGrid extends React.Component<DataGridProps, any> { }
