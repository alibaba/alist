import {
  mergeActions,
  createActions,
  createAsyncActions,
  createListActions,
  createAsyncListActions
} from '@alist/react'

export const createNextListActions = () => {
  return mergeActions(
    createListActions(),
    createActions(
      'setSelections',
      'setRowSelection',
      'getRowSelection',
      'disableRowSelection'
    )
  )
}

export const createNextAsyncListActions = () =>
  mergeActions(
    createAsyncListActions(),
    createAsyncActions(
      'setSelections',
      'setRowSelection',
      'getRowSelection',
      'disableRowSelection'
    )
  )

export const setSelectionsByInstance = (instance, ids, records) => {
  const targetInstance = instance.actions ? instance.actions : instance
  targetInstance.setRowSelection({
    ids,
    records
  })
}

export function actionsRetHandler(ret, callback, asyncErrCallback = console.warn) {
  if (ret instanceof Promise) {
    ret.then((...t) => {
      typeof callback === 'function' && callback(...t);
    }).catch((err) => {
      typeof asyncErrCallback === 'function' && asyncErrCallback(err)
    });
  } else {
    callback(ret);
  }
}
