# @alist/antd

English | [简体中文](./README.zh-cn.md)

> @alist/antd base on `@alist/react` and `Ant-Design`. It provide API to manuplate list state and components for rendering support.

> it mainly includes:
>
> - `<List/>`
> - `<Filter/>`
> - `<Pagination/>`
> - `<Table/>`
> - `<Layout/>`
> - `<Consumer/>`
> - `<MultipleProvider/>`

### Install

```bash
npm install --save @alist/antd
```

### Table Of Contents

<!-- toc -->

- [`Usage`](#Usage)
  - [`Quick Start(URL Mode)`](#quick-starturl-mode)
  - [`Filter`](#Filter)
  - [`Filter Layout`](#Filter-Layout)
  - [`Collapse ExpandContainer/ExpandTrigger`](#Collapse-ExpandContainer/ExpandTrigger)
  - [`DataSource Mode`](#DataSource-Mode)
  - [`Multiple Mode`](#Multiple-Mode)
  - [`Request Format`](#Request-Format)
  - [`Customize Request`](#Customize-Request)
  - [`LifeCycles`](#LifeCycles)
  - [`Customize LifeCycle`](#Customize-LifeCycle)
  - [`Consumer`](#Consumer)
  - [`Rerender Table`](#Rerender-Table)
  - [`RowSelection`](#RowSelection)
  - [`Consumer`](#Consumer)
- [Components](#components)
  - [`<List/>`](#List)
  - [`<Filter/>`](#Filter)
  - [`<Consumer/>`](#Consumer)
  - [`<MultipleProvider/>`](#MultipleProvider)
  - [`<Pagination/>`](#Pagination)
  - [`<Table/>`](#Table)
- [Hook](#Hook)
  - [`useList`](#useList)
- [API](#API)
  - [`createListActions`](#createListActions)
  - [`createAsyncListActions`](#createAsyncListActions)
  - [`ListEffectHooks`](#ListEffectHooks)
  - [`createListEffectHook`](#createListEffectHook)
- [Interfaces](#Interfaces)
  - [`IListMode`](#IListMode)
  - [`IList`](#IList)
  - [`IListActions`](#IListActions)
  - [`IListAsyncActions`](#IListAsyncActions)
  - [`IListUIProps`](#IListUIProps)
  - [`ITableProps`](#ITableProps)

### Usage

---

#### Quick Start(URL Mode)

Pass `url` and it set to `URL Mode` and automatically request. Check [Request Format](#Request-Format) for more information.

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>Basic Usage</h1>
    <h5>Check 'Network' in DevTools for more information</h5>

    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <Pagination />
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Filter

`Filter` base on `UForm`, it is completely the same except for naming:

* `SchemaForm` -> `Filter`
* `SchemaMarkupField` / `Field` -> `Filter.Item`

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  createListActions,
  ListLifeCycleTypes
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
      effects={($) => {
        // triggered when filterItem
        $(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE).subscribe((state) => {
          console.log(state)
        });
      }}
    >
      <Filter>
        <Filter.Item type="string" name="username" title="username"/>
        <Filter.Item type="string" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Filter Layout

* Vertical Layout（default）
* Inline Layout by passing `inline=true`
* Proportional Wrap Layout by using `<Layout />`
* `ButtonGroup` for action button

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <h4>Inline Layout(inline=true)</h4>
      <Filter inline>
        <Filter.Item type="string" name="username" title="username"/>
        <Filter.Item type="string" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>Search</Search>
          <Clear>Reset</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <h4>Proportional Wrap Layout</h4>
      <Filter >
        <Layout gap={[12,16]} columns={4}>
          <Filter.Item type="string" name="a" title="a"/>
          <Filter.Item span={2} type="string" name="b" title="b"/>
          <Filter.Item type="string" name="c" title="c"/>
          <Filter.Item type="string" name="d" title="d"/>
          <Filter.Item type="string" name="e" title="e" span={3} />
          <Filter.Item type="string" name="f" title="f" span={2}/>
        </Layout>
      </Filter>
      <h4>VerticalLayout(inline=false)</h4>
      <Filter>
        <Filter.Item type="string" name="username" title="username"/>
        <Filter.Item type="string" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>Search</Search>
          <Clear>Reset</Clear>
        </Layout.ButtonGroup>
      </Filter>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Collapse ExpandContainer/ExpandTrigger

```jsx
import React from 'react'
import {
  List,
  Table,
  Pagination,
  createListActions,
  Filter,
  Search,
  Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
  ExpandContainer,
  ExpandTrigger,
} from '@alist/next'
import '@alifd/next/dist/next.css'

const actions = createListActions()
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Filter>
          <Layout inset gap={[12, 16]} columns={4}>
            <Filter.Item type="number" title="number" name="number" />
            <Filter.Item type="boolean" title="boolean" name="boolean" />
            <Filter.Item type="date" title="date" name="date" />            
            <Filter.Item type="year" title="year" name="year" />
            <ExpandContainer>
              <Filter.Item type="time" title="time" name="time" />
              <Filter.Item type="rating" title="rating" name="rating" />            
            </ExpandContainer>
          </Layout>
          <Layout.ButtonGroup>
              <Search>Search</Search>
              <Clear>Reset</Clear>
              <ExpandTrigger expandText="Expand" unExpandText="Collapse" />
          </Layout.ButtonGroup>
        </Filter>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### DataSource Mode

Pass `dataSource` will set to `DataSource Mode` which will automatically paginate.

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {  
  const dataSource = getDataSource(20)
        
  return <div>
    <h1>DataSource Mode</h1>
    <h5>automatically paginate the dataSource</h5>
    <List
      actions={actions}
      dataSource={dataSource}
      pageSize={5}
    >
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Multiple Mode


Use `MultipleProvider` and `setMultipleData` to split one response data into multiple pieces for consumption

```jsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions() 
const App = () => {  
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15),
      a2: getDataSource(15),
    })
  }, [])

  return <div>
    <h1>Multiple Mode</h1>
    <h5>One Response data for multiple lists and each list has paging </h5>
    <List actions={actions}>
      <h3>List 1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Request Format

![standard-query-flow](https://img.alicdn.com/tfs/TB15V_PtLb2gK0jSZK9XXaEgFXa-986-473.png)

As shown in the figure, the request process can be regarded as a black box, and the request parameters are [IListQueryData](#IListQueryData), user can influence the process in the following three ways：

* formatBefore: Modify the data before the request
* formatAfter: Modify the data returned by the request
* query: Directly proxy the entire request process

Just make sure that the final result is [IListResponse](#IListResponse). AList will do the rest for you。

#### Customize Request

By Passing the `query` props and you can completely customize the way of request

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'


const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {
  const query = async ({ url, method, data }) => {
    const { currentPage, pageSize } = data
    return fetch(`${url}?_t=${new Date().getTime()}&sort=%7B%7D&pageSize=${pageSize}&currentPage=${currentPage}&filterData=%7B%7D`,
      {
        "credentials":"include",
        "headers": {
          "accept":"application/json, text/plain, */*",
          "accept-language":"en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6",
          "content-type":"application/x-www-form-urlencoded charset=UTF-8",
          "sec-fetch-mode":"cors",
          "sec-fetch-site":"cross-site"
        },
        "referrer": location.href,
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":null,
        "method":"GET",
        "mode":"cors"
      }).then((resp) => {
        return resp.json()              
      }).then(resp => {
        const { code, data: respData, message } = resp
        if ([ 0, 200, '0', '200' ].indexOf(code) === -1) {
            throw new Error(message || 'System Error')
        } else {
            const total = 6
            const totalPages = Math.ceil(total / pageSize)  
            let dataList
            if (currentPage > totalPages) {
              dataList = []
            } else if (currentPage === totalPages) {
              dataList = getDataSource(total % pageSize)
            } else {
              dataList = getDataSource(pageSize)
            }

            return {
              dataList,
              currentPage,
              pageSize,
              total,
              totalPages,
            }
            return respData
        }
      });
  }

  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'
  return <div>
    <h1>Customize Request</h1>
    <List actions={actions} url={url} query={query} pageSize={5}>
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 重绘Table

`getTableProps`, `setTableProps` Used to replace the property change of Table that requires setState

```jsx
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { List, Table, Pagination, Selection, createListActions } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.setTableProps({
            rowSelection: {
              primaryKey: 'value',
              selectedRowKeys: [],
              onChange: (ids) => {
                const { rowSelection } = actions.getTableProps()
                actions.setTableProps({                  
                  rowSelection: {
                    ...rowSelection,
                    selectedRowKeys: ids,
                  }
                })
              }
            }
          })
        }}>enable RowSelection</Button>

        <Selection>
          {(opts) => {
            const { ids, selectedAll, selectedNone } = opts || {}
            return <div>current selected items{(ids || []).length}, selectedAll: {`${selectedAll}`} selecedNone: {`${selectedNone}`}</div>
          }}
        </Selection>
        <Table primaryKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### RowSelection

We provide `setRowSelection` (enable selection mode), `disableRowSelection` (disable selection mode) to manage selection.
Check out [selectionConfig](#selectionConfig) which is param of `setRowSelection` for more infomation.
For unsatisfactory scenarios, you can use `setTableProps`

```jsx
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { List, Table, Pagination, Selection, createListActions } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
window.acc = actions
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.setRowSelection()
        }}>enable RowSelection</Button>

        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.disableRowSelection()
        }}>disabled RowSelection</Button>

        <Button style={{ marginRight: '8px' }} onClick={() => {
          const { mode } = actions.getSelectionConfig()
          actions.setRowSelection({ mode: mode === 'multiple' ? 'single' : 'multiple' })
        }}>toggle mode</Button>

        <Selection>
          {(opts) => {
            const { ids, selectedAll, selectedNone } = opts || {}
            return <div>current selected items{(ids || []).length}, selectedAll: {`${selectedAll}`} selecedNone: {`${selectedNone}`}</div>
          }}
        </Selection>
        <Table rowKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### LifeCycles


Consumption life cycle hook of list vie effects. Check [ListLifeCycleTypes](#ListLifeCycleTypes) for more infomation.

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  List, Table, Pagination,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/antd'

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>Basic Usage</h1>
    <h5>Check DevTools to see the output</h5>

    <List
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_WILL_INIT).subscribe(() => {
          console.log('list will init')
        })
        $(ListLifeCycleTypes.ON_LIST_INIT).subscribe(() => {
          console.log('list init')
        })
        $(ListLifeCycleTypes.ON_LIST_BEFORE_QUERY).subscribe((queryData) => {
          console.log('list before query', queryData)
        })

        $(ListLifeCycleTypes.ON_LIST_AFTER_QUERY).subscribe((resp) => {
          console.log('list after query', resp)
        })
      }}
      actions={actions}
      url={url}
      pageSize={5}
    >
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Consumer

```jsx
import { createListActions, Consumer, List, Table, Pagination, Filter, Layout, Search, Clear } from '@alist/antd'

const actions = createListActions()
window.cc = actions
const App = props => {
  const { children, ...others } = props
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <List actions={actions} url={url}>
      <Consumer>
        {list => {
          const { currentPage, pageSize } = list.getPageData()
          const filterData = list.getFilterData()
          const paginationedData = list.getPaginationDataSource()
          const originData = list.getDataSource()
          return (
            <div>
              dataSource: {paginationedData.length} <br />
              age: {filterData.age} <br />
              username: {filterData.username} <br />
              currentPage:{currentPage} <br />
              pageSize:{pageSize} <br />
            </div>
          )
        }}
      </Consumer>
      <Filter>
          <Filter.Item type="string" name="username" title="username" />
          <Filter.Item type="string" name="age" title="age" />
          <Layout.ButtonGroup>
            <Search>Search</Search>
            <Clear>Clear</Clear>
          </Layout.ButtonGroup>
        </Filter>
      <Table primaryKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

#### List

**Usage**

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    <Pagination />
  </List>
}
```

| property | description | type | default value |
| ---- | ---- | ---- | --- |
| url | pass url and it will set to `URL Mode` | `string` |  |
| dataSource | pass dataSource will auto pagination for local data | `Array<any>` |  |
| effects | effects | `Effects`|  |
| actions | api instance of  [createListActions](#createListActions)/[createAsyncListActions](#createAsyncListActions) | `ListActions|AsyncListActions` |  |
| style | css style | `React.CSSProperties` | {} |


#### Filter

**Usage**

```tsx
import { List, Table, Pagination, Filter } from '@alist/antd'

const App = (props) => {
  const { children, ...others } = props
  return <List dataSource={[]}>
    <Filter>
      <Filter.Item name="useranme" title="useranme" type="string">
    </Filter>
    <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    <Pagination />
  </List>
}
```

**props**

| property | description | type | default value |  |
| ---- | ---- | ---- | --- | --- |
| autoAddColon | auto add colon for form item | `boolean` |  |  |
| className | className | `string` |  |  |
| inline | is inline layout | `boolean` | false |  |
| layout | layout of form (horizontal/vertical/inline) | `'horizontal'|'vertical'|'inline'`  | horizontal|
| maxTipsNum | maximum tips number limit | `number` | 30 |
| labelAlign | label alignment <br /><br />options:<br />'top<br />'left<br />' | `'top'|'left'` | 'left' |  |
| labelCol | columns of label | `number|{span: number, offset: number}` |  | |
| labelTextAlign | aliganment of label test<br /><br />options:<br />'left'<br />'right' | `'left'|'right'` |  |  |
| prefix | className prefix | string | 'next-' | 'antd-' |
| size | size of form <br /><br />options:<br />'large'<br />'medium'<br />'small' | `'large'|'medium'|'small'` | 'medium' |  |
| style | css style | `React.CSSProperties` |  |  |
| wrapperCol | columns of wrapper |  `number|{span: number, offset: number}`  |  | |


#### Consumer

consumer for dynamic rendering

**Usage**

```tsx
import { Consumer, List, Table, Pagination, Filter } from '@alist/antd'

const App = (props) => {
  const { children, ...others } = props
  return <List dataSource={[]}>
    <Consumer>
      {(list) => {
        const { currentPage, pageSize, } = list.getPageData()
        const paginationedData = list.getPaginationDataSource()
        const originData = list.getDataSource() 
        return <div>
          currentPage:{currentPage} <br/>
          pageSize:{pageSize} <br/>
        </div>
      }}
    </Consumer>
  </List>
}
```

**props**

| property | description | type | default value |  |
| ---- | ---- | ---- | --- | --- |
| children | children | `(list : IList) => JSX.Element|null` |  |


#### MultipleProvider


```tsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'

const actions = createListActions() 
const App = () => {  
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15), // mock data
      a2: getDataSource(15), // mock data
    })
  }, [])

  return <div>
    <h1>Multiple Mode</h1>
    <h5>One Response data for multiple lists and each list has paging logic</h5>
    <List actions={actions}>
      <h3>List 1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}
```

**props**

| property | description | type | default value |  |
| ---- | ---- | ---- | --- | --- |
| id | id for multiple list instance | `string` |  |
| pageSize | page size for multiple list instance | `number` |  |

#### Pagination

No parameter setting is required because `<List/>` has already handled the data binding relationship. All you need to do is use `<Pagination/>` as placeholder

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Pagination />
    <Table>
      <Table.Column title="label" dataIndex="label" />
      <Table.Column title="value" dataIndex="value" />
    </Table>
    <Pagination />
  </List>
}
```

#### Table

`<List/>` will handled the data binding relationship, other props will pass to  `<Table>` of `@alifd/next` 

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Table>
      <Table.Column title="label" dataIndex="label" />
      <Table.Column title="value" dataIndex="value" />
    </Table>
  </List>
}
```



### Hook

#### useList

get `List` instance, which is built-in in `<List/>`

**Signature**

```typescript
type useList = (options: IListUIProps): IList
```

**Usage**

```typescript
import { useList } from '@alist/antd'

const List: React.FC<any> = (props = {}) => {
  const { children, ...others } = props || {};
  const list = useList(others)
  let element
  if (typeof children === 'function') {
      element = children(list)
  } else {
      element = children || React.Fragment
  }
  
  return (
    <ListContext.Provider value={list}>
      {element}
    </ListContext.Provider>
  )
}
```


### API

> The API is fully inherited from @alist/react. The specific API of @alist/antd is listed below.

---


#### `createListActions`

> return [IListActions](#IListActions)

**Signature**

```typescript
createListActions(): IListActions
```

**Usage**

```typescript
import { createListActions } from '@alist/antd'

const actions = createListActions()
console.log(actions.getPageData())
console.log(actions.getDataSource())
```

#### `createAsyncListActions`

> return [IListAsyncActions](#IListAsyncActions)

**Signature**

```typescript
createAsyncListActions(): IListAsyncActions
```

**Usage**

```typescript
import { createAsyncListActions } from '@alist/antd'

const actions = createAsyncListActions()
console.log(actions.getPageData().then(val => console.log(val))
console.log(actions.getDataSource().then(val => console.log(val))
```

#### `ListEffectHooks`

> return lifeCycles hook of @alist/core 

**Usage**

```tsx
import { ListEffectHooks, List } from '@alist/antd'
const {
  /**
   * List LifeCycle
   **/
  // List pre-initialization trigger
  onListWillInit$,
  // List initialization trigger
  onListInit$,
} = ListEffectHooks

const App = () => {
  return (
    <List
      effects={() => {
        onListInit$().subscribe(() => {
          console.log('initialized')
        })
      }}
    >
      ...
    </List>
  )
}
```

#### createListEffectHook

> Custom your own hook by this api

**Signature**

```typescript
(type: string): Observable<TResult>
```

**Usage**

```jsx
import { List, createListEffectHook, createListActions } from '@alist/antd'

const actions = createListActions()
const diyHook1$ = createListEffectHook('diy1')
const diyHook2$ = createListEffectHook('diy2')

const App = () => {
  return (
    <List
      actions={actions}
      effects={() => {
        diyHook1$().subscribe((payload) => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe((payload) => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button onClick={() => {
        actions.notify('diy1', { index: 1 })
      }}>notify diy1</button>
      <button onClick={() => {
        actions.notify('diy2', { index: 2 })
      }}>notify diy2</button>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### Interfaces

> The Interfaces is fully inherited from @alist/react. The specific Interfaces of @alist/antd is listed below.

---

#### IListMode

```typescript
declare enum ModeType {
    DATASOURCE = "dataSource",
    URL = "url",
    QUERY = "query"
}
declare type IListMode = ModeType.DATASOURCE | ModeType.URL | ModeType.QUERY;
```

#### IList

```typescript
interface IList {
    // set dataSource raw data
    getDataSource: () => IListDataSource;
    // set dataSource raw data
    setDataSource: (data: IListDataSource) => void;
    // set dataSource pagninated data
    setPaginationDataSource: (data: IListDataSource) => void;
    // set dataSource pagninated data
    getPaginationDataSource: () => IListDataSource;
    // get mode: dataSource | url | mutliple
    getMode: () => IListMode;
    // get search area data
    getFilterData: () => IListFilterData;
    // set search area data
    setFilterData: (data: IListFilterData) => void;
    // get uform instance
    getFilterInstance: () => any;
    // get uform instance construct params
    getFilterProps: () => IFilterInitProps;
    // set uform instance
    setFilterInstance: (form?: any) => void;
    // get pagination data
    getPageData: () => IListPageData;
    // set pagination data
    setPageData: (data: IListPageData) => void;
    // get multiple data which enable in multiple mode
    getMultipleData: () => IListMultipleData;
    // set multiple data which enable in multiple mode
    setMultipleData: (data: IListMultipleDataParams) => void;
    // set pageSize of multiple data which enable in multiple mode
    setMultiplePageSize: (data: IListMultiplePageSize) => void;
    // get validate config of search area
    getValidateConfig: () => IListKVMap<any>;
    // set validate config of search area
    setValidateConfig: (validateConfig?: IListKVMap<any>) => void;
    // clear search area data
    clear: () => void;
    // request
    search: () => void;
    // reset search area data
    reset: () => void;
    // 
    refresh: () => void;
    // set loading status of list
    setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void;
    // get loading status of list
    getLoading: () => boolean;
    // set url
    setUrl: (url: string, fnOpts?: IListFunctionOptions) => void;
    // customize query
    setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void;
    // set params which will automatically change url params
    setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void;
    // get from url params
    getParams: () => IListParams;
    // set current page
    setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void;
    // set page size
    setPageSize: (pageSize: number) => void;
    // trigger list effects or customize effects
    notify: (type: ListLifeCycleTypes, paylaod?: any) => void;
    // triggered when lifeCycle function been notified
    on: (key: EventType, cb?: IListEvent) => void;
    // remove listening function
    removeListener: (key: EventType, cb?: IListEvent) => void;
}
```

#### IListActions

```typescript
export interface IListActions {
  getDataSource: () => IListDataSource,
  setDataSource: (data: IListDataSource) => void,
  setPaginationDataSource: (data: IListDataSource) => void,
  getPaginationDataSource: () => IListDataSource,
  getMode: () => IListMode,
  getFilterData: () => IListFilterData,
  setFilterData: (data: IListFilterData) => void,
  getFilterInstance: () => any,
  getFilterProps: () => IFilterInitProps,
  setFilterInstance: (form?: any) => void,
  getPageData: () => IListPageData,
  setPageData: (data: IListPageData) => void,
  getMultipleData: () => IListMultipleData,
  setMultipleData: (data: IListMultipleDataParams) => void,
  setMultiplePageSize: (data: IListMultiplePageSize) => void,
  getValidateConfig: () => IListKVMap<any>,
  setValidateConfig: (validateConfig?: IListKVMap<any>) => void,
  clear: () => void,
  search: () => void,
  reset: () => void,
  refresh: () => void,
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void,
  getLoading: () => boolean,
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => void,
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void,
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void,
  getParams: () => IListParams,
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void,
  setPageSize: (pageSize: number) => void,
  on: (key: EventType, cb?: IListEvent) => void
  notify: (type: ListLifeCycleTypes, paylaod?: any) => void,
  removeListener: (key: EventType, cb?: IListEvent) => void,
}
```

#### IListAsyncActions

```typescript
export interface IListAsyncActions {
  getDataSource: () => Promise<IListDataSource>,
  setDataSource: (data: IListDataSource) => Promise<void>,
  setPaginationDataSource: (data: IListDataSource) => Promise<void>,
  getPaginationDataSource: () => Promise<IListDataSource>,
  getMode: () => Promise<IListMode>,
  getFilterData: () => Promise<IListFilterData>,
  setFilterData: (data: IListFilterData) => Promise<void>,
  getFilterInstance: () => Promise<any>,
  getFilterProps: () => Promise<IFilterInitProps>,
  setFilterInstance: (form?: any) => Promise<void>,
  getPageData: () => Promise<IListPageData>,
  setPageData: (data: IListPageData) => Promise<void>,
  getMultipleData: () => Promise<IListMultipleData>,
  setMultipleData: (data: IListMultipleDataParams) => Promise<void>,
  setMultiplePageSize: (data: IListMultiplePageSize) => Promise<void>,
  getValidateConfig: () => Promise<IListKVMap<any>>,
  setValidateConfig: (validateConfig?: IListKVMap<any>) => Promise<void>,
  clear: () => Promise<void>,
  search: () => Promise<void>,
  reset: () => Promise<void>,
  refresh: () => Promise<void>,
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => Promise<void>,
  getLoading: () => Promise<boolean>,
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => Promise<void>,
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => Promise<void>,
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => Promise<void>,
  getParams: () => Promise<IListParams>,
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => Promise<void>,
  setPageSize: (pageSize: number) => Promise<void>,
  on: (key: EventType, cb?: IListEvent) => Promise<void>
  notify: (type: ListLifeCycleTypes, paylaod?: any) => Promise<void>,
  removeListener: (key: EventType, cb?: IListEvent) => Promise<void>,
}
```

#### IListUIProps

```typescript
interface IListUIProps {
    dataSource?: any;
    validateConfig?: IListKVMap<any>;
    url?: string;
    method?: IListQueryMethod;
    params?: any;
    paramsFields?: string | string[];
    pageSize?: number;
    currentPage?: number;
    total?: number;
    totalPages?: number;
    autoLoad?: boolean;
    defaultFilterValues?: any;
    multiple?: boolean;
    filterConfig?: any;
    query?: IListQuery;
    formatBefore?: (queryData: IListQueryData) => any | void;
    formatAfter?: (response: any) => any | void;
    formatFilter?: (filterData: IListFilterData) => any | void;
    lifeCycles?: ListLifeCycle[];
    effects?: IListEffect,
    actions?: any,
    afterInitialized?: (list: IList) => void
}
```

#### ITableProps

```typescript
interface ITableProps {
    children?: React.ReactElement | ((...args: any) => React.ReactElement),
    multipleId?: string
}
```
