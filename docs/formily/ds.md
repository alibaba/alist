## 手动控制数据源 (Fusion-Next)

以下实例演示假如需

```jsx
import React, { useState, useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  ListSpy,
  Search,
  Clear,
  Reset,
  Consumer,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes
} from '@alist/next-components'
import {
  FormSpy,
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions,
  createVirtualBox
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import { Icon, Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const SchemaButton = createVirtualBox('schema-btn', Button)
const listActions = createListActions()
const actions = createFormActions()

const getDataSource = len => {
  const dataSource = []
  for (let i = 0; i < len; i++) {
    dataSource.push({
      label: `id: #${Math.random()
        .toString(36)
        .slice(-8)}`,
      value: i
    })
  }

  return dataSource
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const asyncTask1 = async () => {
  await sleep(500)
  return getDataSource(5)
}

const asyncTask2 = async () => {
  await sleep(1000)
  return getDataSource(2)
}

const App = () => {
  return (
    <div>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          expressionScope={{
            renderLabel: (val, idx, record) => <div>---{val}</div>,
            renderLabelTitle: title => (
              <div>
                <Icon type="favorites-filling" size="xs" />
                {title}
              </div>
            ),
            appendData: async () => {
              // 发起异步请求

              actions.notify('task1_query_loading')
              actions.notify('task2_query_loading')
              listActions.notify('task1_query_loading')
              listActions.notify('task2_query_loading')
              asyncTask1().then(data => {
                actions.notify('task1_query_resolved', data)
                const latestData = listActions.getDataSource()
                listActions.setDataSource([...latestData, ...data])
                listActions.notify('task1_query_resolved', data)
              })

              asyncTask2().then(data => {
                actions.notify('task2_query_resolved', data)
                const latestData = listActions.getDataSource()
                listActions.setDataSource([...latestData, ...data])
                listActions.notify('task2_query_resolved', data)
              })
            },
            listenSpy: (state, action) => {
              switch (action.type) {
                case 'task1_query_loading':
                  return {
                    ...state,
                    loading1: true
                  }
                case 'task2_query_loading':
                  return {
                    ...state,
                    loading2: true
                  }
                case 'task1_query_resolved':
                  return {
                    ...state,
                    loading1: false,
                    count1: action.payload.length
                  }
                case 'task2_query_resolved':
                  return {
                    ...state,
                    loading2: false,
                    count2: action.payload.length
                  }
                default:
                  return state
              }
            },
            renderSpy: (list, { state, type }) => {
              const { loading1, loading2, count1, count2 } = state
              return (
                <div>
                  <div>
                    {loading1
                      ? '数据任务1请求中...'
                      : loading1 === false
                      ? '数据任务1请求完成'
                      : null}
                    {count1 ? '数据条数：' + count1 : null}
                  </div>

                  <div>
                    {loading2
                      ? '数据任务2请求中...'
                      : loading2 === false
                      ? '数据任务2请求完成'
                      : null}
                    {count2 ? '数据条数：' + count2 : null}
                  </div>
                </div>
              )
            }
          }}
          initialValues={{
            f1: 'default value1',
            f2: 'default value2'
          }}
        >
          <FormMegaLayout grid autoRow full labelAlign="top">
            <Field name="f1" title="f1" x-component="Input" />
            <Field name="f2" title="f2" x-component="Input" />
            <Field name="f3" title="f3" x-component="Input" />
            <Field name="f4" title="f4" x-component="Input" />
            <Field name="f5" title="f5" x-component="Input" />
            <Field name="f6" title="f6" x-component="Input" />
          </FormMegaLayout>

          <ButtonGroup align="center" style={{ marginBottom: '24px' }}>
            <SchemaButton onClick="{{appendData}}">追加数据</SchemaButton>
          </ButtonGroup>

          <List actions={listActions}>
            <Table>
              <Table.Column
                title="{{renderLabelTitle('标题')}}"
                dataIndex="label"
                cell="{{renderLabel}}"
              />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />

            <ListSpy
              selector={[
                'task1_query_loading',
                'task2_query_loading',
                'task1_query_resolved',
                'task2_query_resolved'
              ]}
              reducer="{{listenSpy}}"
              children="{{renderSpy}}"
            />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
