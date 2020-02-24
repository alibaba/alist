import { Observable } from 'rxjs/internal/Observable'
import { createAsyncActions, createActions } from 'react-eva'
import { isFn } from './utils'
import { IListEffect } from './types'
import { ListLifeCycleTypes } from '@alist/core'

export const env = {
  effectStart: false,
  effectSelector: null,
  effectEnd: false,
  currentActions: null
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
  'setQuery',
  'setParams',
  'getParams',
  'setCurrentPage',
  'setPageSize',
  'on',
  'removeListener'
]

export const createListActions = (mergedFns?: string[]) => {
  if (env.currentActions) {
    return env.currentActions
  }

  const mergedApiList = [...apiList, ...(mergedFns || [])]
  return createActions(...mergedApiList)
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
  onListInit$: createListEffectHook<any>(ListLifeCycleTypes.ON_LIST_INIT)
}
