# Schema模式实例

以下实例通过 `本地dataSource` 模式演示，使用 `Ant-Design`, `Fusion-Next` 同理。

```jsx
import React, { createContext, useContext,
  useState, useEffect, useRef, useMemo } from 'react'
import { SchemaList, List, Table } from '@alist/antd';
import'antd/dist/antd.css'

const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {
        onClick: '$func.onClick',
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
                        props: { type: 'input', name: 'username', title: 'username' }
                      },
                      {
                        componentName: 'Filter.Item',
                        props: { type: 'input', name: 'age', title: 'age' }
                      }    
                    ]
                  }
                ]
            },
            {
              componentName: 'Table',
              props: {
                onSort: '$func.onSort',
                rowSelection: {
                  onChange: '$func.onSelectChange',
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' },
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sort: true },
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', render: '$func.renderOper' },
                }
              ]
            },
            {
              componentName: 'Pagination',
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
    console.log('onSelectChange', ids, records);
  },
  onClick: function () {
    console.log('current dataSource', this.actions.getDataSource())
    console.log('print context', this);
  }
}

const App = () => {
  return <SchemaList
    schema={schema}
    funcRegistry={funcRegistry}
    schema={schema}
  />
}

ReactDOM.render(<App />, document.getElementById('root'))
```


# Schema模式实例

直接使用 `formily` schema 来渲染

```jsx
import React, { createContext, useContext,
  useState, useEffect, useRef, useMemo } from 'react'
import { SchemaList, List, Table } from '@alist/antd';
import'antd/dist/antd.css'

const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {
        onClick: '$func.onClick',
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
                    "type": "object",                    
                    "properties": {
                      "NO_NAME_FIELD_$0": {
                        "x-component": "filter-flex-layout",
                        "type": "object",
                        "properties": {
                          "username": {
                            "title": "username",
                            "type": "string"
                          },
                          "age": {
                            "title": "age",
                            "type": "string"
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
                  onChange: '$func.onSelectChange',
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' },
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sort: true },
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', render: '$func.renderOper' },
                }
              ]
            },
            {
              componentName: 'Pagination',
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
    console.log('onSelectChange', ids, records);
  },
  onClick: function () {
    console.log('current dataSource', this.actions.getDataSource())
    console.log('print context', this);
  }
}

const App = () => {
  return <SchemaList
    schema={schema}
    funcRegistry={funcRegistry}
    schema={schema}
  />
}

ReactDOM.render(<App />, document.getElementById('root'))
```
