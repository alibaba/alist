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
  instance.setRowSelection({
    ids,
    records
  })
}
