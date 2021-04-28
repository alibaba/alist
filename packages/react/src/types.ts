import { Observable } from 'rxjs/internal/Observable'
export interface IListEffect<Payload = any, Actions = any> {
  (
    selector: IListEffectExtendsEffectSelector<Payload, Actions>,
    actions: Actions
  ): void
}

export interface IListTableContext {
  primaryKey: string
  dataSource: any[]
  loading: boolean
  list: IList
  tableProps: any
}

export interface IListEffectSelector<Payload = any> {
  (type: string): Observable<any>
}

export interface IListToggleContext {
  toggleState: string
  toggleAll: () => void
  toggle: (id: string | number) => void
  openRowKeys: Array<string | number>
}

export type IListEffectExtendsEffectSelector<
  Payload = any,
  Actions = any
> = IListEffectSelector<Payload> & Actions

import {
  // IFilterInitProps,
  IList,
  IListPageData,
  IListProps,
  IListKVMap,
  IListDataSource,
  IListFilterData,
  IFilterInitProps,
  IListMode,
  IListMultipleDataParams,
  IListMultiplePageSize,
  IListMultipleData,
  IListFunctionOptions,
  IListQuery,
  EventType,
  ListLifeCycleTypes,
  IListEvent,
  IListParams,
  IFilterEffectsProps
} from '@alist/core/lib/types'

export interface IFilterMode {
  mode?: 'schema' | 'compat'
}

export interface ITableProps {
  hideWhenInvalid?: boolean
  primaryKey?: string
  pickInitialTableProps?: (props: ITableProps) => any
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
  multipleId?: string
  loading?: boolean
  dataSource?: Array<any>
}

export interface IPaginationProps {
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
  multipleId?: string
}

export interface IMultipleProps {
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
  id: string
  pageSize?: number
}

export interface IFilterItemProps {
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
  name: string
}

export interface IFilterProps {
  form?: any
  mirror?: boolean
  effects?: (props: IFilterEffectsProps) => IFilterEffectsProps
  useForm?: (props: any) => any
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
}

export interface IConsumerProps {
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    list: IList
  ) => any
  initialState?: any
  form?: any
  selector?: Array<string> | string
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
}

export interface IExpandProps {
  form?: any
  schema?: any
  useFieldState?: any
  targetPath?: string
  children?: React.ReactElement | ((...args: any) => React.ReactElement)
}

export interface IListActions {
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
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void
  getParams: () => IListParams
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void
  setPageSize: (pageSize: number) => void
  on: (key: EventType, cb?: IListEvent) => void
  notify: (type: ListLifeCycleTypes, paylaod?: any) => void
  removeListener: (key: EventType, cb?: IListEvent) => void
}

export interface IListAsyncActions {
  getDataSource: () => Promise<IListDataSource>
  setDataSource: (data: IListDataSource) => Promise<void>
  setPaginationDataSource: (data: IListDataSource) => Promise<void>
  getPaginationDataSource: () => Promise<IListDataSource>
  getMode: () => Promise<IListMode>
  getFilterData: () => Promise<IListFilterData>
  setFilterData: (data: IListFilterData) => Promise<void>
  getFilterInstance: () => Promise<any>
  getFilterProps: () => Promise<IFilterInitProps>
  setFilterInstance: (form?: any) => Promise<void>
  getPageData: () => Promise<IListPageData>
  setPageData: (data: IListPageData) => Promise<void>
  getMultipleData: () => Promise<IListMultipleData>
  setMultipleData: (data: IListMultipleDataParams) => Promise<void>
  setMultiplePageSize: (data: IListMultiplePageSize) => Promise<void>
  getValidateConfig: () => Promise<IListKVMap<any>>
  setValidateConfig: (validateConfig?: IListKVMap<any>) => Promise<void>
  clear: () => Promise<void>
  search: () => Promise<void>
  reset: () => Promise<void>
  refresh: () => Promise<void>
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => Promise<void>
  getLoading: () => Promise<boolean>
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => Promise<void>
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => Promise<void>
  setParams: (
    params: IListParams,
    fnOpts?: IListFunctionOptions
  ) => Promise<void>
  getParams: () => Promise<IListParams>
  setCurrentPage: (
    currentPage: number,
    fnOpts?: IListFunctionOptions
  ) => Promise<void>
  setPageSize: (pageSize: number) => Promise<void>
  on: (key: EventType, cb?: IListEvent) => Promise<void>
  notify: (type: ListLifeCycleTypes, paylaod?: any) => Promise<void>
  removeListener: (key: EventType, cb?: IListEvent) => Promise<void>
}

export interface IFilterItemHook {
  list: IList
  validateConfig: IListKVMap<any>
}

export type IListUIProps = IListProps & {
  list?: IList
  effects?: IListEffect
  actions?: any
  afterInitialized?: (list: IList) => void
}

export interface IMultipleHook {
  list: IList
  id: string
  pageSize: number
}

export interface ITableHook {
  primaryKey: string
  tableProps: any
  list: IList
  dataSource: any[]
  loading: boolean
  hideWhenInvalid: boolean
}

export interface ILoadingHook {
  loading: boolean
}

export interface IPaginationHook {
  list: IList
  setCurrentPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  pageData: IListPageData
  hideWhenInvalid: boolean
}

export interface IFilterHook {
  list: IList
  // filterProps: IFilterInitProps,
  filterInstance: any
}
