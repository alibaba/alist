import ListCore from './model/core'
import LifeCylcesCore, { ListLifeCycle } from './model/lifeCycles'
import {
  IList,
  IListFunctionOptions,
  ModeType,
  IListQuery,
  IListProps,
  IListQueryData,
  IListResponse,
  ListLifeCycleTypes,
  IListFilterData,
  IListMultipleDataParams,
  IListMultiplePageSize,
  IListSelectionConfig,
  ExpandStatus,
  EmptyStatusType
} from './types'
export * from './types'
import { isFn } from './util'
import defaultQuery from './defaultQuery'

function createList(props: IListProps = {}): IList {
  // 渲染相关的设置都在API层完成，core层只管数据，和操作数据的方法
  const list = new ListCore(props)
  const lifeCycles = new LifeCylcesCore({ lifeCycles: props.lifeCycles })

  const universalNotify = opts => {
    lifeCycles.notify(opts)
    const filterInstance = list.getFilterInstance()
    if (filterInstance) {
      filterInstance.notify(
        ListLifeCycleTypes.LIST_LIFECYCLES_FORM_GOD_MODE,
        opts
      )
    }
  }

  const mode = list.getMode()

  // 通知UI重新渲染的方法
  const refreshTable = (notifyId?: string[]) =>
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_TABLE_REFRESH,
      payload: { notifyId }
    })
  const refreshLoading = (notifyId?: string[]) =>
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_LOADING_REFRESH,
      payload: { notifyId }
    })
  const refreshPagination = (notifyId?: string[]) =>
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_PAGINATION_REFRESH,
      payload: { notifyId }
    })
  const refreshValidateConfig = (notifyId?: string[]) =>
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_VALIDATE_CONFIG_REFRESH,
      payload: { notifyId }
    })
  // const refreshConsumer = () => lifeCycles.notify({ type: ListLifeCycleTypes.ON_LIST_CONSUMER_REFRESH })
  // const refreshFilter = () => lifeCycles.notify({ type: ListLifeCycleTypes.ON_LIST_FILTER_REFRESH })
  const refreshSelection = (notifyId?: string[]) =>
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH,
      payload: { notifyId }
    })

  // 请求相关
  let columnsChange = false
  let url = props.url // 请求url
  let params = props.params || {} // url的param
  let paramsFields = props.paramsFields
  let method = props.method || 'GET' // GET | POST | ...
  let query = props.query || defaultQuery // 自定义请求方法,默认适用url模式
  let autoLoad = props.autoLoad === undefined ? true : props.autoLoad
  let expandStatus: ExpandStatus =
    props.expandStatus === undefined ? 'collapse' : 'expand' // 展开或收起搜索条件

  // 初始化搜索框的默认值, 用于重置

  // 请求列表
  const fetch = async (extraFilterData?: IListFilterData) => {
    if (mode === ModeType.DATASOURCE) {
      return
    }

    if (mode === ModeType.URL && !url) {
      return
    }

    // 请求时需要执行校验
    const filterInstance = list.getFilterInstance()
    if (filterInstance) {
      if (Array.isArray(filterInstance.ignoreValidationKeys)) {
        const validatePath = filterInstance.ignoreValidationKeys.join(',')
        await filterInstance.validate(`*(!${validatePath})`)
      } else {
        await filterInstance.validate()
      }
      const { errors } = filterInstance.getFormState(state => {
        return { errors: state.errors }
      })
      if (errors.length) {
        return
      }
    }

    const pageData = list.getPageData() // 分页数据
    const filterData = list.getFilterData() // 搜索数据
    const { sorter, sortLocal } = list.getSortConfig() // 排序数据
    let sortData = {}
    if (!isFn(sortLocal)) {
      sortData = sorter
    }

    let queryFilterData = {
      ...filterData,
      ...(extraFilterData || {})
    }

    // 自定义修改搜索框数据
    if (isFn(props.formatFilter)) {
      queryFilterData = props.formatFilter(queryFilterData)
    }

    let queryData: IListQueryData = {
      filterData: queryFilterData,
      currentPage: pageData.currentPage,
      pageSize: pageData.pageSize,
      sort: sortData,
      _t: new Date().getTime()
    }

    // 自定义修改请求数据
    if (isFn(props.formatBefore)) {
      queryData = props.formatBefore(queryData)
    }

    // 刷新table状态
    listAPI.setLoading(true)

    // 请求前
    universalNotify({
      type: ListLifeCycleTypes.ON_LIST_BEFORE_QUERY,
      payload: {
        url,
        method,
        data: queryData
      },
      ctx: listAPI
    })

    // 请求开始
    let result: IListResponse | void
    let reqErr = null
    let reqEmpty = false
    try {
      result = await query({
        url,
        method,
        data: queryData
      })
    } catch (e) {
      console.error(e && e.message ? e.message : e)
      if (e && e.message) {
        reqErr = e.message
      } else if (e) {
        reqErr = e
      } else {
        reqErr = 'unknow error'
      }

      // 异常流，触发生命周期 onError 钩子
      universalNotify({
        type: ListLifeCycleTypes.ON_LIST_ERROR,
        payload: reqErr,
        ctx: listAPI
      })
    }

    // 自定义修改结果数据
    if (isFn(props.formatAfter)) {
      result = props.formatAfter(result)
    }

    // 执行数据更新
    const { dataList, total, pageSize, currentPage, multipleData, totalPages } =
      result || {}

    // 多实例模式
    if (typeof multipleData === 'object') {
      // 生命周期：返回空数据
      if (
        !multipleData ||
        Object.keys(multipleData).length === 0 ||
        (Object.keys(multipleData)
          .map(k => {
            if (!multipleData[k]) return []
            if (Array.isArray(multipleData[k] as any[])) return multipleData[k]
            if (Array.isArray((multipleData[k] as IListResponse).dataList))
              return (multipleData[k] as IListResponse).dataList
          })
          .reduce((buf: any[], cur: any[]) => [...buf, ...cur], []) as any[])
          .length === 0
      ) {
        reqEmpty = true
      }
      list.setMultipleData(multipleData)
    } else {
      // 生命周期：返回空数据
      if (!dataList || (Array.isArray(dataList) && dataList.length === 0)) {
        reqEmpty = true
      }

      list.setPaginationDataSource(dataList)
      list.setDataSource(dataList)
      list.setPageData({ total, pageSize, currentPage, totalPages })
    }

    list.setResponseData(result)

    // 生命周期：返回空数据
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_EMPTY,
      ctx: listAPI
    })

    // 生命周期：请求后
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_AFTER_QUERY,
      payload: {
        result,
        empty: reqEmpty,
        hasError: reqErr !== null,
        error: reqErr
      },
      ctx: listAPI
    })

    list.setEmptyStatus(
      reqErr !== null
        ? EmptyStatusType.ERROR
        : reqEmpty
        ? EmptyStatusType.EMPTY
        : EmptyStatusType.VALID
    )

    // 多实例模式
    if (typeof multipleData === 'object') {
      lifeCycles.notify({
        type: ListLifeCycleTypes.ON_LIST_MULTIPLE_REFRESH,
        ctx: listAPI
      })
    }

    // 生命周期：即将更新
    lifeCycles.notify({
      type: ListLifeCycleTypes.WILL_LIST_UPDATE,
      ctx: listAPI
    })

    // 请求结束
    listAPI.setLoading(false)

    refreshPagination()
    refreshTable()

    // 生命周期：已经触发更新
    universalNotify({
      type: ListLifeCycleTypes.DID_LIST_UPDATE,
      ctx: listAPI
    })

    return result
  }

  // 清理查询条件
  const clear = (fnOpts?: IListFunctionOptions) => {
    // 生命周期：清理查询条件
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_CLEAR,
      ctx: listAPI
    })

    if (!fnOpts || fnOpts.reset === true) {
      list.resetPage()
    }
    list.setSortConfig({ sorter: undefined })
    list.clearFilterData()
    // 默认会执行请求
    if (!fnOpts || fnOpts.withFetch === true) {
      fetch()
    }
  }

  // 重置，如果存在默认值，会恢复到默认值
  const reset = (fnOpts?: IListFunctionOptions) => {
    // 生命周期：清理查询条件
    lifeCycles.notify({
      type: ListLifeCycleTypes.ON_LIST_RESET,
      ctx: listAPI
    })

    if (!fnOpts || fnOpts.reset === true) {
      list.resetPage()
    }

    list.setSortConfig({ sorter: undefined })
    list.resetFilterData()

    // 默认会执行请求
    if (!fnOpts || fnOpts.withFetch === true) {
      fetch()
    }
  }

  // 分页器跳转页面时使用
  const setCurrentPage = (currentPage: number) => {
    list.setCurrentPage(Number(currentPage))
    if (mode === ModeType.DATASOURCE) {
      // dataSource模式下，直接更新表格
      refreshPagination()
      refreshTable()
    } else {
      fetch() // 直接请求数据
    }
  }

  const setPageSize = (pageSize: number) => {
    list.setPageSize(Number(pageSize))
    if (mode === ModeType.DATASOURCE) {
      // dataSource模式下，直接更新表格
      refreshPagination()
      refreshTable()
    } else {
      fetch() // 直接请求数据
      refreshPagination()
    }
  }

  // 刷新列表
  const refresh = async (opts?: IListFunctionOptions) => {
    const refreshOpts = opts || { reset: true }
    // 默认刷新都是清空，支持reset设置为false
    if (refreshOpts.reset === true) {
      list.resetPage()
    }
    const result = await fetch(refreshOpts.filterData)
    return result
  }

  // 刷新table
  const setTableProps = async (tableProps, fnOpts?: IListFunctionOptions) => {
    list.setTableProps(tableProps)
    if (!fnOpts || fnOpts.withRender) {
      refreshTable()
    }
  }

  const hasSetColumns = () => columnsChange

  const setColumns = (cols: any[], opts) => {
    const { notifyId, init = false } = opts || {}
    if (!init) {
      columnsChange = true
    }
    list.setColumns(cols)
    refreshTable(notifyId)
  }

  // 设置dataSource
  const setDataSource = (dataSource, fnOpts?: IListFunctionOptions) => {
    list.setDataSource(dataSource)
    if (mode === ModeType.DATASOURCE) {
      list.setPageData({
        total: list.getState('dataSource').length,
        currentPage: 1
      })

      if (!fnOpts || fnOpts.withRender) {
        refreshPagination()
      }
    }

    list.resetPage()
    if (!fnOpts || fnOpts.withRender) {
      refreshTable()
    }
  }

  // 设置多实例数据
  const setMultipleData = (
    multipleData: IListMultipleDataParams,
    fnOpts?: IListFunctionOptions
  ) => {
    const multipleKeys = Object.keys(multipleData)
    list.setMultipleData(multipleData)

    if (!fnOpts || fnOpts.withRender) {
      refreshTable(multipleKeys)
      refreshPagination(multipleKeys)
    }
  }

  // 设置多实例分页数据
  const setMultiplePageSize = (
    multiplePageSize: IListMultiplePageSize,
    fnOpts?: IListFunctionOptions
  ) => {
    const multipleKeys = Object.keys(multiplePageSize)
    list.setMultiplePageSize(multiplePageSize)

    if (!fnOpts || fnOpts.withRender) {
      refreshTable(multipleKeys)
      refreshPagination(multipleKeys)
    }
  }

  // 设置页面参数, 动态维护url参数
  const setParams = (nextParams, fnOpts?: IListFunctionOptions) => {
    params = { ...params, ...nextParams }
    const { enableInvalid = false } = fnOpts || {}
    const searchParams = new URLSearchParams(location.search)
    Object.keys(nextParams).forEach(key => {
      let targetParams
      if (enableInvalid || [null, undefined].indexOf(nextParams[key]) === -1) {
        if (typeof nextParams[key] === 'object') {
          targetParams = JSON.stringify(nextParams[key])
        } else {
          targetParams = nextParams[key]
        }
        searchParams.set(key, targetParams)
      }
    })

    const search = searchParams.toString()
    const hashStr = (location.hash || '').split('?')[0]
    const newUrl = `${location.origin}${location.pathname}${hashStr}${
      search ? '?' + search : ''
    }`
    window.history.replaceState(params, undefined, newUrl)
  }

  // 设置loading
  const setLoading = (loading: boolean, fnOpts?: IListFunctionOptions) => {
    list.setLoading(loading)
    if (!fnOpts || fnOpts.withRender) {
      refreshLoading()
    }
  }

  const setSelectionConfig = (
    selectionConfig: IListSelectionConfig,
    fnOpts?: IListFunctionOptions
  ) => {
    list.setSelectionConfig(selectionConfig)
    if (!fnOpts || fnOpts.withRender) {
      refreshTable()
      refreshSelection()
    }
  }

  const disableSelectionConfig = () => {
    setSelectionConfig(null)
  }

  // 设置校验规则
  const setValidateConfig = validateConfig => {
    list.setValidateConfig(validateConfig)
    refreshValidateConfig()
  }

  // 获取URL参数
  const getParams = () => params

  // 设置url
  const setUrl = (nextUrl: string, fnOpts?: IListFunctionOptions) => {
    url = nextUrl
    if (!fnOpts || fnOpts.withFetch) {
      fetch()
    }
  }

  const getUrl = () => {
    return url
  }

  // 设置query
  const setQuery = (nextQuery: IListQuery, fnOpts?: IListFunctionOptions) => {
    query = nextQuery
    if (!fnOpts || fnOpts.withFetch) {
      fetch()
    }
  }

  // 适配搜索区域副作用
  const getFilterEffects = props => {
    const noop = () => {}
    const { effects = noop } = props || {}
    return ($, actions) => {
      // 搜索区域初始化完成
      $('onFormMount').subscribe(state => {
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_FILTER_MOUNT,
          ctx: listAPI,
          payload: state
        })
      })

      // 搜索区域values修改
      $('onFormValuesChange').subscribe(state => {
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_FILTER_VALUES_CHANGE,
          ctx: listAPI,
          payload: state
        })
      })

      // 搜索区域字段修改
      $('onFieldValueChange').subscribe(state => {
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE,
          ctx: listAPI,
          payload: state
        })
      })

      // 搜索区域校验开始
      $('onFormSubmitValidateStart').subscribe(() => {
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_VALIDATE_START,
          ctx: listAPI
        })
      })

      // 搜索区域校验失败
      $('onFormSubmitValidateFailed').subscribe(state => {
        const { errors, warnings } = state
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_VALIDATE_END,
          ctx: listAPI,
          payload: { success: false, errors, warnings }
        })
      })

      // 搜索区域校验成功
      $('onFormSubmitValidateSuccess').subscribe(state => {
        const { errors, warnings } = state
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_VALIDATE_END,
          ctx: listAPI,
          payload: { success: true, errors, warnings }
        })
      })
      effects($, actions)
    }
  }

  const toggleExpandStatus = () => {
    const filterInstance = list.getFilterInstance()
    if (expandStatus === 'expand') {
      expandStatus = 'collapse'
      filterInstance.notify(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE)
      lifeCycles.notify({
        type: ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE,
        ctx: listAPI
      })
    } else {
      expandStatus = 'expand'
      filterInstance.notify(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND)
      lifeCycles.notify({
        type: ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND,
        ctx: listAPI
      })
    }
  }

  const getExpandStatus = (): ExpandStatus => {
    return expandStatus
  }

  const initSyncFilterData = (executeNow = false) => {
    // 同步params到搜索区域上
    const syncFilterData = {}
    Object.keys(params || {}).forEach(paramField => {
      if (
        [].concat(paramsFields || []).some(f => f === '*' || f === paramField)
      ) {
        syncFilterData[paramField] = params[paramField]
      }
    })

    // 静默设置到filter上，避免重复通知死循环
    if (Object.keys(syncFilterData).length > 0) {
      lifeCycles.notify({
        type: ListLifeCycleTypes.ON_LIST_INIT_PARAMS_SET,
        ctx: listAPI,
        payload: syncFilterData
      })
      listAPI.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_MOUNT, () => {
        list.setFilterData(syncFilterData)
      })
      if (executeNow) {
        list.setFilterData(syncFilterData)
      }
    }

    const filterInstance = list.getFilterInstance()
    if (filterInstance) {
      filterInstance.subscribe(({ type }) => {
        if (type === 'onFormSubmit') {
          listAPI.refresh()
        } else if (type === ListLifeCycleTypes.ON_FORM_LIST_RESET) {
          listAPI.reset()
        } else if (type === ListLifeCycleTypes.ON_FORM_LIST_CLEAR) {
          listAPI.clear()
        }
      })
    }
  }

  const listAPI: IList = {
    // 监听相关
    notify: (type: string | ListLifeCycleTypes, payload?: any) => {
      lifeCycles.notify({ type, payload, ctx: listAPI })
    },
    subscribe: lifeCycles.subscribe,
    unSubscribe: lifeCycles.unSubscribe,
    on: (type: string, cb?: any) => {
      list.on(type, cb)
    },
    removeListener: (type: string, cb?: any) => {
      list.removeListener(type, cb)
    },
    // emit: (type: string, payload?: any) => {
    //     list.emit(type, payload)
    // },
    refresh, // 更新API
    setLoading, // 动态刷新loading
    getLoading: list.getLoading, // 获取当前loading状态
    setValidateConfig,
    getValidateConfig: list.getValidateConfig,
    setUrl, // 动态切换url
    getUrl, // 获取url
    setQuery, // 动态切换query
    getParams, // 获取url参数
    setParams, // 动态设置url参数

    // 搜索区域生命周期管理相关
    getFilterEffects,

    // UI相关
    search: refresh, // search 按钮
    clear, // clear 按钮
    reset, // reset 按钮
    setCurrentPage, // 分页跳转
    setPageSize, // 设置分页大小

    // 筛选相关
    getSelectionConfig: list.getSelectionConfig,
    setSelectionConfig,
    disableSelectionConfig,
    getSelections: list.getSelections,
    getEmptyStatus: list.getEmptyStatus,

    // 渲染取数相关
    getTableProps: list.getTableProps,
    setTableProps,
    setPaginationDataSource: list.setPaginationDataSource,
    getPaginationDataSource: list.getPaginationDataSource,
    getSortConfig: list.getSortConfig,
    setSortConfig: list.setSortConfig,
    getMode: list.getMode,
    getPageData: list.getPageData, // 获取分页数据
    setPageData: list.setPageData, // 设置分页数据
    getFilterData: list.getFilterData, // 获取搜索框数据
    setFilterData: list.setFilterData, // 设置搜索框数据
    getFilterProps: list.getFilterProps, // 设置搜索框数据
    getFilterInstance: list.getFilterInstance,
    setFilterInstance: list.setFilterInstance,
    setFormState: list.setFormState,
    getFormState: list.getFormState,
    setFieldState: list.setFieldState,
    getFieldState: list.getFieldState,
    getDataSource: list.getDataSource, // 获取页面数据
    setDataSource, // 动态更新dataSource
    getMultipleData: list.getMultipleData, // 获取多实例数据
    setMultipleData, // 设置多实例数据
    setMultiplePageSize, // 设置多实例分页数据
    getExpandStatus,
    toggleExpandStatus,
    appendMirrorFilterInstance: list.appendMirrorFilterInstance,
    getMirrorFilterInstanceList: list.getMirrorFilterInstanceList,
    initSyncFilterData,
    setResponseData: list.setResponseData,
    getResponseData: list.getResponseData,
    getAllColumns: list.getAllColumns,
    setAllColumns: list.setAllColumns,
    setColumns,
    getColumns: list.getColumns,
    setEmptyStatus: list.setEmptyStatus,
    hasSetColumns
  }

  initSyncFilterData()

  if (params && Object.keys(params).length) {
    setParams(params)
  }

  // 初始化即将完成
  lifeCycles.notify({
    type: ListLifeCycleTypes.ON_LIST_WILL_INIT,
    ctx: listAPI
  })

  // 挂载consumer相关渲染订阅事件

  // 初始化完成
  lifeCycles.notify({ type: ListLifeCycleTypes.ON_LIST_INIT, ctx: listAPI })

  // 挂载完成，执行请求
  listAPI.subscribe(ListLifeCycleTypes.ON_LIST_MOUNTED, () => {
    if (autoLoad && ModeType.URL === mode) {
      fetch()
    }
  })

  // 监听字段值改变, 如果命中paramsFields，就同步到url参数上
  listAPI.subscribe(
    ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE,
    fieldChangeData => {
      const { payload: fieldState } = fieldChangeData
      const { name, value } = fieldState
      if ([].concat(paramsFields || []).some(f => f === '*' || f === name)) {
        // 设置filter当前命中的字段值
        const nextTargetParams = { [name]: value }
        lifeCycles.notify({
          type: ListLifeCycleTypes.ON_LIST_PARAMS_CHANGE,
          ctx: listAPI,
          payload: nextTargetParams
        })
        setParams(nextTargetParams)
      }
    }
  )

  // 排序触发时，发起请求
  listAPI.subscribe(ListLifeCycleTypes.ON_LIST_SORT, ({ payload }) => {
    const { sorter } = payload
    list.setSortConfig({ sorter })
    const { sortLocal, ...othersSortConfig } = list.getSortConfig()
    if (!isFn(sortLocal)) {
      fetch()
    } else {
      const ds = list.getDataSource()
      const sortDs = sortLocal(ds, othersSortConfig)
      if (Array.isArray(sortDs)) {
        list.setPaginationDataSource(sortDs)
        refreshTable()
      }
    }
  })

  return listAPI
}

export { createList as default, ListLifeCycle, ListLifeCycleTypes }
