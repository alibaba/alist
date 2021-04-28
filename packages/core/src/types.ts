import { ListLifeCycle } from './model/lifeCycles'

// 常量
export type IListQueryMethod = 'GET' | 'POST'
export type IListQuerySort = 'desc' | 'asc'

// 请求格式
export type IListQuery = (queryOptions: IListQueryOptions) => Promise<any>

// 搜索框输入数据 + 分页数据 + 筛选数据 + 排序数据
export interface IListQueryData {
  sort?: IListKVMap<IListQuerySort>
  currentPage: number
  pageSize: number
  filterData?: IListFilterData
  _t: number
}

// 搜索框数据
export type IListFilterData = IListKVMap<any>

// 查询数据
export type IListKVMap<T> = {
  [key in string]: T
}

// 分页数据
export interface IListPageData {
  pageSize?: number
  currentPage?: number
  total?: number
  totalPages?: number
}

// table数据
export type IListDataSource = any[]
// 多实例数据
export type IListMultipleDataParams = IListKVMap<IListBaseResponse | any[]>
export type IListMultipleData = IListKVMap<IListBaseResponse>
export type IListMultiplePageSize = IListKVMap<number>
export interface IListBaseResponse {
  dataList?: any[]
  paginationDataList?: any[]
  total?: number
  pageSize?: number
  currentPage?: number
  totalPages?: number
}

export type IListParams = any

// 请求数据格式
export interface IListQueryOptions {
  url: string
  data: IListQueryData
  method?: IListQueryMethod
}

// 功能性参数
export interface IListFunctionOptions {
  withFetch?: boolean
  withRender?: boolean
  reset?: boolean
  filterData?: IListFilterData
  enableInvalid?: boolean
}

// 请求的结果数据格式
export interface IListResponse {
  dataList?: any[]
  multipleData?: IListMultipleDataParams
  total?: number
  pageSize?: number
  currentPage?: number
  totalPages?: number
}

export interface IListFetchResponse {
  code: number | string
  data?: IListResponse
  message?: string
}

export type IListSelectionMode = 'single' | 'multiple'
export type IListSortOrder = 'desc' | 'asc'

export interface IListSortConfig {
  mode?: IListSelectionMode
  sortLocal?: (dataSource: any, config: IListSortConfig) => any
  sorter?: IListKVMap<IListSortOrder>
}

export interface IListSelectionConfig {
  getProps: (record: any, idx?: number) => Record<string, any>
  mode: IListSelectionMode
  primaryKey: string
  ids: Array<string | number>
  records: Array<any>
  ignoreIds?: Array<string | number>
  allIds?: Array<string | number>
  validRecords?: Array<any>
}

// 列表核心构建参数
export interface IListProps {
  sortConfig?: IListSortConfig
  expandStatus?: ExpandStatus
  selectionConfig?: IListSelectionConfig
  dataSource?: any
  validateConfig?: IListKVMap<any>
  url?: string
  method?: IListQueryMethod
  params?: any
  paramsFields?: string | string[]
  columns?: any[]
  pageSize?: number
  currentPage?: number
  total?: number
  totalPages?: number
  autoLoad?: boolean // 自动加载
  defaultFilterValues?: any
  multiple?: boolean // 多实例列表
  filterConfig?: any // 搜索区域设置
  query?: IListQuery // 自定义请求
  formatBefore?: (queryData: IListQueryData) => any | void // 格式化请求前函数
  formatAfter?: (response: any) => any | void // 格式化请求后函数
  formatFilter?: (filterData: IListFilterData) => any | void // 格式化搜索数据 会影响 formatBefore输入
  lifeCycles?: ListLifeCycle[] // 生命周期函数
}

// 生命周期处理函数
export type LifeCycleHandler<T> = (payload: T, context: any) => void

export type IListMode = ModeType.DATASOURCE | ModeType.URL | ModeType.QUERY

// 列表核心实例运行时
export interface IListState {
  responseData: any
  sortConfig: IListSortConfig | null
  selectionConfig: IListSelectionConfig | null
  mode: IListMode
  tableProps: IListKVMap<any>
  validateConfig: IListKVMap<any>
  autoLoad: boolean
  dataSource: any[]
  paginationDataSource: any[]
  columns: any[]
  allColumns: any[]
  // url?: string,
  // params?: any,
  // method: IListQueryMethod,
  // query: IListQuery,
  emptyStatus:
    | EmptyStatusType.INIT
    | EmptyStatusType.EMPTY
    | EmptyStatusType.ERROR
    | EmptyStatusType.VALID
  pageSize: number
  currentPage: number
  total: number
  totalPages: number
  loading: boolean
  multipleData: IListMultipleData
  defaultFilterValues: IListFilterData
  filterValues: IListFilterData
  multiplePageSize: IListMultiplePageSize
}

export type IListEvent = (payload?: any) => void
export type IListEventMap = IListKVMap<IListEvent[]>

export enum EmptyStatusType {
  INIT = 'init',
  EMPTY = 'empty',
  ERROR = 'error',
  VALID = 'valid'
}
export enum ModeType {
  DATASOURCE = 'dataSource',
  URL = 'url',
  QUERY = 'query'
}

export enum ListLifeCycleTypes {
  ON_LIST_FILTER_MOUNT = 'onListFilterMount',
  ON_LIST_FILTER_ITEM_EXPAND = 'onListFilterItemExpand',
  ON_LIST_FILTER_ITEM_COLLAPSE = 'onListFilterItemCollapse',
  ON_LIST_DATASOURCE_FILTER = 'onListDatasourceFilter',
  ON_LIST_DATASOURCE_SORT = 'onListDatasourceSort',
  ON_LIST_SELECTION_REFRESH = 'onListSelectionRefresh',
  ON_LIST_TABLE_REFRESH = 'onListTableRefresh',
  ON_LIST_PAGINATION_REFRESH = 'onListPaginationRefresh',
  ON_LIST_CONSUMER_REFRESH = 'onListConsumerRefresh',
  ON_LIST_FILTER_REFRESH = 'onListFilterRefresh',
  ON_LIST_LOADING_REFRESH = 'onListLoadingRefresh',
  ON_LIST_SORT = 'onListSort',
  ON_LIST_FILTER = 'onListFilter',
  ON_LIST_FILTER_CHANGE = 'onListFilterChange',
  ON_LIST_MULTIPLE_REFRESH = 'onListMultipleRefresh',
  ON_LIST_VALIDATE_CONFIG_REFRESH = 'onListValidateConfigRefresh',
  ON_LIST_SELECT = 'onListSelect',
  ON_LIST_SELECT_ALL = 'onListSelectAll',
  ON_LIST_SELECT_CHANGE = 'onListSelectChange',
  LIST_LIFECYCLES_GOD_MODE = '*',
  LIST_LIFECYCLES_FORM_GOD_MODE = '*FORM*',
  ON_LIST_MOUNTED = 'onListMounted',
  ON_LIST_PARAMS_CHANGE = 'onListParamsChange',
  ON_LIST_INIT_PARAMS_SET = 'onListInitParamsSet',
  ON_LIST_FILTER_ITEM_CHANGE = 'onListFilterItemChange',
  ON_LIST_VALIDATE_START = 'onListValidateStart',
  ON_LIST_VALIDATE_END = 'onListValidateEnd',
  ON_LIST_CLEAR = 'onListClear',
  ON_LIST_RESET = 'onListReset',
  ON_LIST_ERROR = 'onListError',
  ON_LIST_EMPTY = 'onListEmpty',
  ON_LIST_WILL_INIT = 'onListWillInit',
  ON_LIST_INIT = 'onListInit',
  WILL_LIST_UPDATE = 'willListUpdate',
  DID_LIST_UPDATE = 'didListUpdate',
  ON_LIST_BEFORE_QUERY = 'onListBeforeQuery',
  ON_LIST_AFTER_QUERY = 'onListAfterQuery',
  ON_LIST_FILTER_VALUES_CHANGE = 'onListFilterValuesChange',
  ON_FORM_LIST_CLEAR = 'onFormListClear',
  ON_FORM_LIST_RESET = 'onFormListReset',
  ON_FORM_LIST_SEARCH = 'onFormListSearch',
  ON_LIST_TOGGLE = 'onListToggle',
  ON_LIST_TOGGLE_ALL = 'onListToggleAll',
  ON_LIST_EXPAND_STATUS_SYNC = 'onListExpandStatusSync'
}

export const LAZY_MOUNTED_SIGNAL = 'lazyMounted'

export type EventType = ListLifeCycleTypes | string

export enum FilterType {
  ITEM_CHANGE = 'itemChange'
}

export interface IFilterInitProps {
  initialValues?: IListKVMap<any>
  values?: IListKVMap<any>
}

export type filterEffects = ($: any, actions: any) => void

export interface IFilterEffectsProps {
  effects?: filterEffects
}

export interface IListSelections {
  ids: Array<number | string>
  records: Array<any>
}

export type ExpandStatus = 'expand' | 'collapse'

export interface IList {
  actions?: any
  setFormState(cb?: (state: any) => any, silent?: boolean): void
  getFormState(cb?: (state: any) => any): any
  setFieldState(path: any, cb?: (state: any) => void, silent?: boolean): void
  getFieldState(path: any, cb?: (state: any) => any): any
  setSortConfig: (sortConfig?: IListSortConfig) => void
  getSortConfig: () => IListSortConfig
  getSelectionConfig: () => IListSelectionConfig
  setSelectionConfig: (selectionConfig: IListSelectionConfig) => void
  disableSelectionConfig: () => void
  getSelections: () => IListSelections
  getEmptyStatus: () => EmptyStatusType
  getFilterEffects: (filterProps?: IFilterEffectsProps) => filterEffects
  getTableProps: () => IListKVMap<any>
  setTableProps: (data: IListKVMap<any>) => void
  getDataSource: () => IListDataSource
  setDataSource: (data: IListDataSource) => void
  setPaginationDataSource: (data: IListDataSource) => void
  getPaginationDataSource: () => IListDataSource
  getMode: () => IListMode
  getFilterData: () => IListFilterData
  setFilterData: (data: IListFilterData) => void
  getFilterInstance: () => any
  getFilterProps: () => IFilterInitProps
  setFilterInstance: (form?: any) => void
  getPageData: () => IListPageData
  setPageData: (data: IListPageData) => void
  getMultipleData: () => IListMultipleData
  setMultipleData: (data: IListMultipleDataParams) => void
  setMultiplePageSize: (data: IListMultiplePageSize) => void
  getValidateConfig: () => IListKVMap<any>
  setValidateConfig: (validateConfig?: IListKVMap<any>) => void
  clear: () => void
  search: () => void
  reset: () => void
  refresh: () => void
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void
  getLoading: () => boolean
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => void
  getUrl: () => string
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void
  getParams: () => IListParams
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void
  setPageSize: (pageSize: number) => void
  subscribe: (
    type: ListLifeCycleTypes,
    handler: LifeCycleHandler<any>
  ) => string
  unSubscribe: (id: string) => void
  on: (key: EventType, cb?: IListEvent) => void
  notify: (type: ListLifeCycleTypes | string, paylaod?: any) => void
  removeListener: (key: EventType, cb?: IListEvent) => void
  getExpandStatus: () => ExpandStatus
  toggleExpandStatus: () => void
  appendMirrorFilterInstance: (form?: any) => void
  getMirrorFilterInstanceList: () => any[]
  initSyncFilterData: (executeNow?: boolean) => void
  setResponseData: (data: any) => void
  getResponseData: () => any
  getAllColumns: () => any[]
  setAllColumns: (columns: any[]) => void
  setColumns: (columns: any[], notifyId?: string[]) => void
  getColumns: () => any[]
  hasSetColumns: () => boolean
  setEmptyStatus: (status: EmptyStatusType) => void
}

export interface IMultiple {
  pageSize?: number
  id?: number | string
}

export type IContext = IList | null
export type IMultipleContext = IMultiple | null

export interface LifeCyclesOptions {
  type: ListLifeCycleTypes | string
  payload?: any
  ctx?: any
}
