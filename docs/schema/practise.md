# Schema 模式实例

以下实例通过 `本地dataSource` 模式演示，使用 `Ant-Design`, `Fusion-Next` 同理。

```jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo
} from 'react'
import { createListActions, SchemaList, List, Table } from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()
const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {
        onClick: '$func.onClick'
      },
      children: [
        {
          componentName: 'List',
          props: {
            dataSource: [
              { id: 1, name: 'tom1', age: 25 },
              { id: 2, name: 'jerry', age: 27 }
            ]
          },
          children: [
            {
              componentName: 'Filter',
              children: [
                {
                  componentName: 'Layout',
                  children: [
                    {
                      componentName: 'Filter.Item',
                      props: {
                        type: 'input',
                        name: 'username',
                        title: 'username'
                      }
                    },
                    {
                      componentName: 'Filter.Item',
                      props: { type: 'input', name: 'age', title: 'age' }
                    }
                  ]
                },
                {
                  componentName: 'Layout.ButtonGroup',
                  children: [
                    { componentName: 'Search', children: '搜索' },
                    { componentName: 'Clear', children: '清空' },
                    { componentName: 'Reset', children: '重置' }
                  ]
                }
              ]
            },
            {
              componentName: 'Table',
              props: {
                onSort: '$func.onSort',
                rowSelection: {
                  onChange: '$func.onSelectChange'
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' }
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sort: true }
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', render: '$func.renderOper' }
                }
              ]
            },
            {
              componentName: 'Pagination'
            }
          ]
        }
      ]
    }
  ]
}

const funcRegistry = {
  renderOper: (val, index, record) => {
    return <div>操作</div>
  },
  onSelectChange: (ids, records) => {
    console.log('onSelectChange', ids, records)
  },
  onClick: function() {
    console.log('current dataSource', this.actions.getDataSource())
    console.log('print context', this)
  }
}

const App = () => {
  return (
    <SchemaList actions={actions} funcRegistry={funcRegistry} schema={schema} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# Schema 模式实例

直接使用 `formily` schema 来渲染

```jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo
} from 'react'
import {
  createListActions,
  SchemaList,
  List,
  Table,
  ListLifeCycleTypes
} from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()
const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {
        onClick: '$func.onClick'
      },
      children: [
        {
          componentName: 'List',
          props: {
            dataSource: [
              { id: 1, name: 'tom1', age: 25 },
              { id: 2, name: 'jerry', age: 27 }
            ]
          },
          children: [
            {
              componentName: 'Filter',
              props: {
                schema: {
                  type: 'object',
                  properties: {
                    NO_NAME_FIELD_$0: {
                      'x-component': 'filter-flex-layout',
                      type: 'object',
                      properties: {
                        username: {
                          title: 'username',
                          type: 'string'
                        },
                        age: {
                          title: 'age',
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              componentName: 'Table',
              props: {
                onSort: '$func.onSort',
                rowSelection: {
                  onChange: '$func.onSelectChange'
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' }
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sorter: true }
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', render: '$func.renderOper' }
                }
              ]
            },
            {
              componentName: 'Pagination'
            }
          ]
        }
      ]
    }
  ]
}

const funcRegistry = {
  renderOper: (val, index, record) => {
    return <div>操作</div>
  },
  onSelectChange: (ids, records) => {
    console.log('onSelectChange', ids, records)
  },
  onClick: function() {
    console.log('current dataSource', this.actions.getDataSource())
    console.log('print context', this)
  }
}

const effects = ($, actions) => {
  $(ListLifeCycleTypes.ON_LIST_SORT).subscribe(payload => {
    console.log('ON_LIST_SORT', payload)
  })
}

const App = () => {
  return (
    <SchemaList
      effects={effects}
      actions={actions}
      funcRegistry={funcRegistry}
      schema={schema}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 消费自定义注册内容

通过`Consumer`获取全局注册的`funcRegistry`以及`schema`等属性。

```jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo
} from 'react'
import {
  createListActions,
  SchemaList,
  List,
  Table,
  Consumer
} from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()
const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {
        onClick: '$func.onClick'
      },
      children: [
        {
          componentName: 'List',
          props: {
            dataSource: [
              { id: 1, name: 'tom1', age: 25 },
              { id: 2, name: 'jerry', age: 27 }
            ]
          },
          children: [
            {
              componentName: 'Filter',
              children: [
                {
                  componentName: 'Layout',
                  children: [
                    {
                      componentName: 'Filter.Item',
                      props: {
                        type: 'input',
                        name: 'username',
                        title: 'username'
                      }
                    },
                    {
                      componentName: 'Filter.Item',
                      props: { type: 'input', name: 'age', title: 'age' }
                    }
                  ]
                },
                {
                  componentName: 'Layout.ButtonGroup',
                  children: [
                    { componentName: 'Search', children: '搜索' },
                    { componentName: 'Clear', children: '清空' },
                    { componentName: 'Reset', children: '重置' }
                  ]
                }
              ]
            },
            {
              componentName: 'CustomConsumer'
            },
            {
              componentName: 'Table',
              props: {
                onSort: '$func.onSort',
                rowSelection: {
                  onChange: '$func.onSelectChange'
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' }
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sort: true }
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', render: '$func.renderOper' }
                }
              ]
            },
            {
              componentName: 'Pagination'
            }
          ]
        }
      ]
    }
  ]
}

const funcRegistry = {
  renderOper: (val, index, record) => {
    return <div>操作</div>
  },
  onSelectChange: (ids, records) => {
    console.log('onSelectChange', ids, records)
  },
  onClick: function() {
    console.log('current dataSource', this.actions.getDataSource())
    console.log('print context', this)
  }
}

const App = () => {
  return (
    <SchemaList
      actions={actions}
      funcRegistry={funcRegistry}
      effects={$ => {
        $('onListInit').subscribe(() => {})
      }}
      componentsRegistry={{
        CustomConsumer: props => {
          return (
            <Consumer>
              {(list, state) => {
                console.log('list instance', list)
                console.log('list state', state)
                return <div>请查看控制台 console.log 日志</div>
              }}
            </Consumer>
          )
        }
      }}
      schema={schema}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
