import {
  mergeActions,
  createActions,
  createAsyncActions,
  createListActions,
  createAsyncListActions
} from '@alist/react'

export const createAntdListActions = () => {
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

export const createAntdAsyncListActions = () =>
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
