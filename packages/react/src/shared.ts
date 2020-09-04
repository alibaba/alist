import { Observable } from 'rxjs/internal/Observable'
import {
  mergeActions,
  createAsyncActions,
  createActions,
  useEva
} from 'react-eva'
import { isFn } from './utils'
import { IListEffect } from './types'
import { ListLifeCycleTypes } from '@alist/core'

export const env = {
  effectStart: false,
  effectSelector: null,
  effectEnd: false,
  currentActions: null
}

export class ListDomain {
  constructor() {}
  setContext(ctx) {
    Object.keys(ctx).forEach(k => {
      this[k] = ctx[k]
    })
  }
}

export const apiList = [
  'addAPI',
  'getSelectionConfig',
  'setSelectionConfig',
  'disableSelectionConfig',
  'getSelections',
  'getDataSource',
  'setDataSource',
  'setPaginationDataSource',
  'getPaginationDataSource',
  'getMode',
  'setTableProps',
  'getTableProps',
  'getFilterData',
  'setFilterData',
  'getFilterInstance',
  'getFilterProps',
  'setFilterInstance',
  'getPageData',
  'setPageData',
  'getMultipleData',
  'setMultipleData',
  'setMultiplePageSize',
  'getValidateConfig',
  'setValidateConfig',
  'clear',
  'search',
  'notify',
  'reset',
  'refresh',
  'refreshSelection',
  'refreshTable',
  'setLoading',
  'getLoading',
  'setUrl',
  'getUrl',
  'setQuery',
  'setParams',
  'getParams',
  'setCurrentPage',
  'setPageSize',
  'on',
  'removeListener',
  'getColumns',
  'setColumns',
  'getAllColumns',
  'setAllColumns',
  'getEmptyStatus',
  'setEmptyStatus',
  'getResponseData'
]

export { createAsyncActions, createActions, useEva, mergeActions }

export const createListActions = (mergedFns?: string[]) => {
  if (env.currentActions) {
    return env.currentActions
  }

  const mergedApiList = [...apiList, ...(mergedFns || [])]
  const listActions = createActions(...mergedApiList)
  listActions._isJSONSchemaObject = true
  return listActions
}

export const createAsyncListActions = (mergedFns?: string[]) => {
  const mergedApiList = [...apiList, ...(mergedFns || [])]
  return createAsyncActions(...mergedApiList)
}

export const createListEffects = <Payload = any, Actions = any>(
  effects: IListEffect<Payload, Actions> | null,
  actions: Actions
) => {
  if (isFn(effects)) {
    return (selector: (type: string) => Observable<any>) => {
      env.effectEnd = false
      env.effectStart = true
      env.currentActions = actions
      env.effectSelector = <T = any>(type: string) => {
        const observable$: Observable<T> = selector(type)
        return observable$
      }
      Object.assign(env.effectSelector, actions)
      effects(env.effectSelector, actions)
      env.effectStart = false
      env.effectEnd = true
      env.currentActions = null
    }
  } else {
    return () => {}
  }
}

export const createListEffectHook = <TResult, Props extends Array<any> = any[]>(
  type: string
) => {
  return (...args: Props): Observable<TResult> => {
    if (!env.effectStart || env.effectEnd) {
      throw new Error(
        'EffectHook must be called synchronously within the effects callback function.'
      )
    }

    if (!env.effectSelector) {
      throw new Error('Can not found effect hook selector.')
    }

    return env.effectSelector(type, ...args)
  }
}

export const ListEffectHooks = {
  onListWillInit$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_WILL_INIT
  ),
  onListInit$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_INIT),
  onListClear$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_CLEAR),
  onListReset$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_RESET),
  onListAfterQuery$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_AFTER_QUERY
  ),
  onListBeforeQuery$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_BEFORE_QUERY
  ),
  onListEmpty$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_EMPTY),
  onListFilterMount$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_FILTER_MOUNT
  ),
  onListParamsChange$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_PARAMS_CHANGE
  ),
  onListMounted$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_MOUNTED),
  onListSelect$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_SELECT),
  onListSelectionRefresh$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH
  ),
  onListSelectAll$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_SELECT_ALL
  ),
  onListSelectChange$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_SELECT_CHANGE
  ),
  onListSelectSort$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_SORT),
  onListTableRefresh$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_TABLE_REFRESH
  ),
  onListDataSourceFilter$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_DATASOURCE_FILTER
  ),
  onListDataSourceSort$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_DATASOURCE_SORT
  ),
  onListFilterItemChange$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE
  ),
  onListFilterItemCollapse$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE
  ),
  onListFilterItemExpand$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND
  ),
  onListFilterItemRefresh$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_FILTER_REFRESH
  ),
  onListInitParamsSet$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_INIT_PARAMS_SET
  ),
  onListError$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_ERROR),
  onListMultipleRefresh$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_MULTIPLE_REFRESH
  ),
  onListPaginationRefresh$: createListEffectHook<any>(
    ListLifeCycleTypes.ON_LIST_PAGINATION_REFRESH
  )
}
