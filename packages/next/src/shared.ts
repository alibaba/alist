import {
  mergeActions,
  createActions,
  createAsyncActions,
  createListActions,
  createAsyncListActions
} from '@alist/react'

export const createNextListActions = () =>
  mergeActions(
    createListActions(),
    createActions('setSelections', 'setRowSelection', 'disableRowSelection')
  )

export const createNextAsyncListActions = () =>
  mergeActions(
    createAsyncListActions(),
    createAsyncActions(
      'setSelections',
      'setRowSelection',
      'disableRowSelection'
    )
  )

export const setSelectionsByInstance = (instance, ids, records) => {
  const { rowSelection } = instance.getTableProps()
  instance.setTableProps({
    rowSelection: {
      ...rowSelection,
      selectedRowKeys: ids
    }
  })
  instance.setSelectionConfig({
    ids,
    records
  })
}
