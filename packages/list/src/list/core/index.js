import EventEmitter from 'events';
import { FormCore } from 'noform';
import innerDefaultQuery from './defaultQuery';

const noop = () => {};

export default class GridCore {
    constructor(props = {}) {
        this.initProps(props);
        let formConfig = {};
        if (this.filterConfig) {
            formConfig = { ...(this.filterConfig || {}) };
        }

        if (this.defaultFilterValues) {
            formConfig.initValues = this.defaultFilterValues;
        }
        this.filterCore = new FormCore(formConfig); // 搜索的核心，基于noform实现
        this.emitter = new EventEmitter(); // 全局的事件总线

        const { onChange = noop } = formConfig;
        this.filterCore.onChange = (fireKeys, values, ctx) => {
            onChange(fireKeys, values, ctx);
            this.refreshFilterChange(fireKeys, values, ctx);
        };
    }

    launch() {
        if (this.autoLoad && ['url', 'query'].indexOf(this.mode) !== -1) {
            this.fetch();
        }
    }

    updateProps(props) {
        if (!props) {
            throw new Error('props is null!!!');
        }
        this.resetPage();
        this.resetFilterData();
        this.initProps(props);
        this.fetch();
    }

    initProps(props = {}) {
        const {
            dataSource, query, url, method, params,
            pageSize, currentPage, total,
            defaultQuery = innerDefaultQuery,
            onError, autoLoad = true, formatBefore, formatAfter, formatFilter,
            defaultFilterValues, multiple, filterConfig,
            willUpdate,
        } = props;

        if ('dataSource' in props && dataSource) this.mode = 'dataSource'; // priority: low(1)
        if ('url' in props && url) this.mode = 'url'; // priority: middle(10)
        if ('query' in props && query) this.mode = 'query'; // priority: high(100)

        this.extraData = null;
        this.autoLoad = autoLoad; // 初始直接发起请求
        this.dataSource = dataSource || []; // 列表数据
        this.url = url; // 请求url
        this.params = params || {};// 请求url的param
        this.method = method || 'get';// 请求url的param
        this.query = query || defaultQuery; // 自定义请求方法,默认适用url模式
        this.pageSize = pageSize || 10; // 分页数据
        this.currentPage = currentPage || 1; // 当前页数
        this.total = total || 0; // 总数据条目数
        this.isLoading = false; // 当前加载数据状态: true | false
        this.onError = onError || noop;
        this.formatBefore = formatBefore;
        this.formatAfter = formatAfter;
        this.formatFilter = formatFilter;
        this.defaultFilterValues = defaultFilterValues;
        this.filterConfig = filterConfig;
        this.multipleData = dataSource; // 多实体数据
        this.multiple = multiple || false; // 多实体模式
        this.willUpdate = willUpdate || noop;
    }

    setDataSource = (dataSource) => { // 设置dataSource，dataSource模式下需要改变分页数据
        this.dataSource = dataSource || [];
        if (this.mode === 'dataSource') {
            this.setPageData({
                total: this.dataSource.length,
                currentPage: 1,
            });
            this.refreshPagination();
        }
        this.resetPage();
        this.refreshTable();
    }

    refresh = async(extraFilterData) => {
        const result = await this.search(extraFilterData);
        return result;
    }

    search = async (extraFilterData) => {
        this.resetPage();
        const result = await this.fetch(extraFilterData);
        return result;
    }

    refreshTable = () => { // 刷新表格数据
        this.emitter.emit('refresh');
    }

    refreshFilterChange = (fireKeys, values, ctx) => { // 刷新表格数据
        this.emitter.emit('refresh_on_filter_change', {
            fireKeys, values, ctx
        });
    }

    refreshPagination = () => { // 刷新分页数据
        this.emitter.emit('pagination_refresh');
    }

    resetPage = () => { // 重置分页数据，常用于重新搜索或API重置时
        this.currentPage = 1;
    }

    getDataSource = () => { // 通用的获取列表数据的方法
        if (this.mode === 'url' || this.mode === 'query') {
            return this.dataSource;
        } // 获取dataSource模式下的当前列表数据
        const { pageSize, total, currentPage } = this;
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        return this.dataSource.slice(startIdx, endIdx);
    }

    setCurrentPage = (currentPage) => { // 分页器跳转页面时使用
        this.currentPage = currentPage;
        if (this.mode === 'dataSource') { // dataSource模式下，直接更新表格
            this.refreshPagination();
            this.refreshTable();
        } else {
            this.fetch(); // 直接请求数据
        }
    }

    setLoading = (isLoading) => {
        this.isLoading = isLoading;
        this.refreshTable();
    }

    fetch = async (extraFilterData = {}) => {
        if (this.mode === 'dataSource') {
            return;
        }

        const pageData = this.getPageData(); // 分页数据
        let filterData = this.getFilterData(); // 搜索数据
        filterData = { ...filterData, ...extraFilterData };
        const params = this.getParams();
        const { currentPage: cp, pageSize: ps } = pageData;

        if (this.formatFilter) filterData = this.formatFilter(filterData); // 前置格式化
        // 请求格式
        let queryParams = {
            json: {
                ...filterData,
                ...params,
                currentPage: cp,
                pageSize: ps,
                sort: {},
            },
            _t: new Date().getTime(),
        };

        this.isLoading = true;
        this.refreshTable();
        // 默认流程，包含前置格式化和结果格式化
        let result = null;
        if (this.formatBefore) queryParams = this.formatBefore(queryParams); // 前置格式化

        // 异常流，需要保证请求方法失败时会抛出异常
        try {
            result = await this.query(queryParams, this.url, this.method);
        } catch (e) {
            this.onError(e);
        }

        if (this.formatAfter && this.formatAfter(result)) result = this.formatAfter(result); // 后置格式化
        this.isLoading = false;

        // 数据更新
        const {
            dataList, total, pageSize, currentPage,
        } = result || {};

        this.setDataSource(dataList);
        this.setMultipleData(result);
        this.setPageData({
            total,
            pageSize,
            currentPage,
        });

        // 触发渲染
        this.refreshTable();
        this.refreshPagination();

        this.willUpdate();

        return result;
    }

    setMultipleData = (multipleData) => { // 为多实体table设计
        this.multipleData = multipleData;
    }

    getMultipleData = () => {
        return this.multipleData;
    }

    clearFilterData = () => { // 清空查询
        this.resetPage();
        this.resetFilterData();
        this.fetch();
    }

    getFilterData = () => { // 获取搜索数据
        const filterData = this.filterCore.getValues();
        const result = {};
        Object.keys(filterData).forEach((key) => {
            if ([null, undefined].indexOf(filterData[key]) === -1) {
                result[key] = filterData[key];
            }
        });

        return result;
    }

    setFilterData = (filterData) => { // 设置搜索数据
        this.filterCore.setValues(filterData);
    }

    resetFilterData = () => { // 重置搜索数据
        this.filterCore.reset();
    }

    setExtraData = (extraData) => {
        this.extraData = extraData;
    }

    getExtraData = () => {
        return this.extraData;
    }

    setPageData = (props) => { // merge型设置分页数据
        const { pageSize, total, currentPage } = props;
        if ('pageSize' in props && !isNaN(pageSize)) this.pageSize = pageSize;
        if ('total' in props && !isNaN(total)) this.total = total;
        if ('currentPage' in props && !isNaN(currentPage)) this.currentPage = currentPage < 1 ? 1 : currentPage;
    }

    getPageData = () => { // 获取分页数据
        const { pageSize, total, currentPage } = this;
        return {
            pageSize,
            total,
            currentPage,
        };
    }

    setParams = (params) => {
        if (['url', 'query'].indexOf(this.mode) >= 0) {
            this.params = params || {};
        }
    }

    setUrl = (url) => {
        if (['url', 'query'].indexOf(this.mode) >= 0) {
            this.url = url;
        }
    }

    getParams = () => { // 获取url参数
        const { params } = this;
        return params;
    }
}
