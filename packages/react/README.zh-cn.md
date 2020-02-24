# @alist/react

English | [简体中文](./README.zh-cn.md)

> @alist/react 是基于 `react` 开发的，并且内置了 `@alist/core`。 提供了 组件用于渲染 以及 API 用于操作列表数据。
> 主要包括以下：
>
> - `<ListProvider/>`
> - `<FieldProvider/>`
> - `<FilterProvider/>`
> - `<Consumer/>`
> - `<Layout/>`
> - `<MultipleProvider/>`
> - `<PaginationProvider/>`
> - `<TableProvider/>`

### 安装

```bash
npm install --save @alist/react
```

### 目录

<!-- toc -->

- [`Usage`](#Usage)
  - [`快速开始(URL模式)`](#快速开始(URL模式))
  - [`DataSource模式`](#本地DataSource模式)
  - [`Multiple模式`](#多列表实例模式)
  - [`标准化请求格式`](#标准化请求格式)
  - [`自定义请求`](#自定义请求)
  - [`Layout`](#Layout)
  - [`生命周期监听`](#生命周期监听)
- [Components](#components)
  - [`<ListProvider/>`](#ListProvider)
  - [`<FieldProvider/>`](#FieldProvider)
  - [`<FilterProvider/>`](#FilterProvider)
  - [`<Consumer/>`](#Consumer)
  - [`<MultipleProvider/>`](#MultipleProvider)
  - [`<PaginationProvider/>`](#PaginationProvider)
  - [`<TableProvider/>`](#TableProvider)
- [Hook](#Hook)
  - [`useList`](#useList)
  - [`useTable`](#useTable)
  - [`useConsumer`](#useConsumer)
  - [`useFilter`](#useFilter)
  - [`useFilterItem`](#useFilterItem)
  - [`usePagination`](#usePagination)
  - [`useMultipleProvider`](#useMultipleProvider)
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
  - [`ITableHook`](#ITableHook)
  - [`IFilterHook`](#IFilterHook)
  - [`IFilterItemHook`](#IFilterItemHook)
  - [`IPaginationHook`](#IPaginationHook)
  - [`IMultipleHook`](#IMultipleHook)

### Usage

---

#### 快速开始(URL模式)

传入 `url` 会自动设置为 `URL 模式` 并自动发起请求。 点击 [标准化请求格式](#标准化请求格式) 查看默认请求格式.

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const Input = (props) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  return <input type="number" value={value} onChange={(e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }} />
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <PaginationProvider>
    {(props) => <div>
      当前页面：{props.currentPage} , 
      分页尺寸：{props.pageSize} , 
      总条目数：{props.total} , 
      总页面数：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>跳转到</button>
      </div>
    </div>}
  </PaginationProvider>
}

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>最基本的用法</h1>
    <h5>打开控制台查看Network发起的请求</h5>

    <ListProvider actions={actions} url={url} pageSize={5}>
      <Pagination />
      <TableProvider>
        {(props) => {
          if (props.loading) return <div>loading...</div>
          return props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)
        }}
      </TableProvider>
      <Pagination />
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 本地DataSource模式

传入 `dataSource` 就会设置为 `本地DataSource模式`，并且会根据传入的分页大小自动完成数据分页。

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const Input = (props) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  return <input type="number" value={value} onChange={(e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }} />
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <PaginationProvider>
    {(props) => <div>
      当前页面：{props.currentPage} , 
      分页尺寸：{props.pageSize} , 
      总条目数：{props.total} , 
      总页面数：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>跳转到</button>
      </div>
    </div>}
  </PaginationProvider>
}

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const App = () => {
  const actions = createListActions()
  const dataSource = getDataSource(20)

  const cutsomHook$ = createListEffectHook('diy')
        
  return <div>
    <h1>本地DataSource模式</h1>
    <h5>自动处理数据分页</h5>
    <ListProvider 
      actions={actions}
      dataSource={dataSource}
      pageSize={5}
    >
      <TableProvider>
        {(props) => props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)}
      </TableProvider>
      <Pagination />
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 多列表实例模式


使用 `MultipleProvider` 配合 `setMultipleData` 将同一个接口数据让多个列表消费。

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const Input = (props) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  return <input type="number" value={value} onChange={(e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }} />
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <PaginationProvider>
    {(props) => <div>
      当前页面：{props.currentPage} , 
      分页尺寸：{props.pageSize} , 
      总条目数：{props.total} , 
      总页面数：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>跳转到</button>
      </div>
    </div>}
  </PaginationProvider>
}

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const App = () => {
  const actions = createListActions() 
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15),
      a2: getDataSource(15),
    })
  }, [])

  return <div>
    <h1>多列表实例模式</h1>
    <h5>同一份接口数据，多个列表实例消费</h5>
    <ListProvider actions={actions}>
      <h3>#1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <TableProvider>
          {(props) => props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)}
        </TableProvider>
        <Pagination />
      </MultipleProvider>      

      <h3>#2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <TableProvider>
          {(props) => props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)}
        </TableProvider>
        <Pagination />
      </MultipleProvider>
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 标准化请求格式

![standard-query-flow](https://img.alicdn.com/tfs/TB15V_PtLb2gK0jSZK9XXaEgFXa-986-473.png)

如图所示，可以将请求的过程看成是黑盒，请求参数为 [IListQueryData](#IListQueryData), 其中用户能够通过以下三种方式影响流程：

* formatBefore 修改请求前的数据
* formatAfter 修改请求返回后的数据
* query 直接代理整个请求过程

只需要保证最终的返回结果是 [IListResponse](#IListResponse)即可，其他渲相关的动作 AList都会帮您完成。

#### 自定义请求

传入 `query` 完全自定义请求格式

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const Input = (props) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  return <input type="number" value={value} onChange={(e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }} />
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <PaginationProvider>
    {(props) => <div>
      当前页面：{props.currentPage} , 
      分页尺寸：{props.pageSize} , 
      总条目数：{props.total} , 
      总页面数：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>跳转到</button>
      </div>
    </div>}
  </PaginationProvider>
}

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const App = () => {
  const actions = createListActions()
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
              dataListProvider,
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
    <h1>自定义请求</h1>
    <ListProvider actions={actions} url={url} query={query} pageSize={5}>
      <TableProvider>
        {(props) => {
          if (props.loading) return <div>loading...</div>
          return props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)
        }}
      </TableProvider>
      <Pagination />
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Layout

等分自动换行布局通用组件，不支持ie8及以下

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook,
  Layout,
} from '@alist/react'

const App = () => {
  return <div>
    <ListProvider>
      <Layout gap={[16, 16]}>
        <Layout.Item>123</Layout.Item>
        <Layout.Item span={2}>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
        <Layout.Item>456</Layout.Item>
      </Layout>
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 生命周期监听


通过 `effects` 来监听列表生命周期的变化. 点击 [ListLifeCycleTypes](#ListLifeCycleTypes) 查看完整的生命周期。

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>基本用法</h1>
    <h5>打开控制台查看相应输出</h5>

    <ListProvider
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
      <TableProvider>
        {(props) => {
          if (props.loading) return <div>loading...</div>
          return props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)
        }}
      </TableProvider>
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

#### ListProvider

**用法**

```typescript
import { ListProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <ListProvider {...others}>
    {(list: IList) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </ListProvider>
}
```

#### FieldProvider

**用法**

```typescript
import { FieldProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <FieldProvider {...others}>
    {({ mode, validateConfig }) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </FieldProvider>
}
```

#### FilterProvider

**用法**

```typescript
import { FilterProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <FilterProvider {...others}>
    {({ filterInstance }, list) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </FilterProvider>
}
```

#### Consumer

**用法**

```typescript
import { FilterProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <FilterProvider {...others}>
    {(list) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </FilterProvider>
}
```

#### MultipleProvider



```typescript
import { MultipleProvider } from '@alist/react'

const List = (props) => {
  const { id, pageSize, children, ...others } = props
  return <MultipleProvider id={id} pageSize={pageSize} {...others}>
    {(list) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </MultipleProvider>
}
```

#### PaginationProvider

```typescript
import { PaginationProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <PaginationProvider {...others}>
    {({ pageSize, currentPage, total, totlaPage, setCurrentPage, setPageSize }, list) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </PaginationProvider>
}
```

#### TableProvider

```typescript
import { TableProvider } from '@alist/react'

const List = (props) => {
  const { children, ...others } = props
  return <TableProvider {...others}>
    {({ loading, dataSource }, list) => {
      return <React.Fragment>
        {props.children}
      </React.Fragment>
    }}
  </TableProvider>
}
```

### Hook

#### useList

获取 `List` 实例, `<ListProvider/>` 中已内置此方法

**签名**

```typescript
type useList = (options: IListUIProps): IList
```

**用法**

```typescript
import { useList } from '@alist/react'

const ListProvider: React.FC<any> = (props = {}) => {
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

#### useTable

获取table数据，`<TableProvider/>`  中已内置此方法

**签名**

```typescript
type useTable = (props: ITableProps = {}): ITableHook
```

**用法**

```typescript
import { useTable } from '@alist/react'

const TableProvider: React.FC<any> = (props: ITableProps = {}) => {
    const { children } = props
    const { loading, dataSource, list } = useTable(props)
    
    let element
    if (typeof children === 'function') {
        element = children({ dataSource, loading }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}
```

#### useConsumer

获取列表数据，`<ConsumerProvider/>`  中已内置此方法

**签名**

```typescript
type useConsumer = (props: IConsumerProps): IList
```

**用法**

```typescript
import { useConsumer } from '@alist/react'

const ConsumerProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const list = useConsumer(props)

    let element
    if (typeof children === 'function') {
        element = children(list)
    } else {
        element = children || React.Fragment
    }

    return element
}
```

#### useFilter

获取搜索区域的表单实例 `<FilterProvider/>` 中已内置此方法

**签名**

```typescript
type useFilter = (props: IFilterProps): IFilterHook
```

**用法**

```typescript
import { useFilter } from '@alist/react'

const FilterProvider: React.FC<any> = (props = {}) => {
    const { mode, children } = props
    const { filterInstance, list } = useFilter(props)

    let element
    if (typeof children === 'function') {
        element = children({
            filterInstance,
        }, list)
    } else {
        element = children || React.Fragment
    }

    return <FilterModeContext.Provider value={{ mode }}>
        {element}
    </FilterModeContext.Provider>
}
```

#### useFilterItem

获取搜索区域表单字段数据 `<FieldProvider/>` 中已内置此方法

**签名**

```typescript
type type useFilterItem = (props: IFilterItemProps): IFilterItemHook
```

**用法**

```typescript
import { useFilterItem } from '@alist/react'

const FilterProvider: React.FC<any> = (props = {}) => {
    const { mode, children } = props
    const { validateConfig, mode } = useFilterItem(props)

    let element
    if (typeof children === 'function') {
        element = children({
            validateConfig, mode,
        }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}
```

#### usePagination

获取分页数据 `<PaginationProvider/>` 中已内置此方法

**签名**

```typescript
type usePagination = (props: IPaginationProps = {}): IPaginationHook
```

**用法**

```typescript
import { usePagination } from '@alist/react'

const PaginationProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { list, pageData, setCurrentPage, setPageSize } = usePagination(props)

    let element
    if (typeof children === 'function') {
        element = children({
            ...pageData,
            setCurrentPage,
            setPageSize,
        }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}
```

#### useMultipleProvider

获取多实例数据 `<ConsumerProvider/>` 中已内置此方法

**签名**

```typescript
type useMultipleProvider = (props: IMultipleProps): IMultipleHook
```

**用法**

```typescript
import { useMultipleProvider } from '@alist/react'

const MultipleProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { list, id, pageSize } = useMultipleProvider(props)

    let element
    if (typeof children === 'function') {
        element = children(list)
    } else {
        element = children || React.Fragment
    }

    return element
}
```

### API

> API 完全继承自 @alist/core. 下方为 @alist/react 特有的API

---


#### `createListActions`

> 返回 [IListActions](#IListActions)

**签名**

```typescript
createListActions(): IListActions
```

**用法**

```typescript
import { createListActions } from '@alist/react'

const actions = createListActions()
console.log(actions.getPageData())
console.log(actions.getDataSource())
```

#### `createAsyncListActions`

> 返回 [IListAsyncActions](#IListAsyncActions)

**签名**

```typescript
createAsyncListActions(): IListAsyncActions
```

**用法**

```typescript
import { createAsyncListActions } from '@alist/react'

const actions = createAsyncListActions()
console.log(actions.getPageData().then(val => console.log(val))
console.log(actions.getDataSource().then(val => console.log(val))
```

#### `ListEffectHooks`

> 返回所有 @alist/core 的lifeCycles hook

**用法**

```tsx
import { ListEffectHooks, ListProvider } from '@alist/react'
const {
  /**
   * List 生命周期管理
   **/
  // 开始初始化
  onListWillInit$,
  // 完成初始化
  onListInit$,
} = ListEffectHooks

const App = () => {
  return (
    <ListProvider
      effects={() => {
        onListInit$().subscribe(() => {
          console.log('initialized')
        })
      }}
    >
      ...
    </ListProvider>
  )
}
```

#### createListEffectHook

> 自定义effect hook

**签名**

```typescript
(type: string): Observable<TResult>
```

**用法**

```jsx
import { ListProvider, createListEffectHook, createListActions } from '@alist/react'

const actions = createListActions()
const diyHook1$ = createListEffectHook('diy1')
const diyHook2$ = createListEffectHook('diy2')

const App = () => {
  return (
    <ListProvider
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
    </ListProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### Interfaces

> Interfaces 完成继承自 @alist/core. 下列为 @alist/react 特有的Interfaces。

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

#### ITableHook

```typescript
interface ITableHook {
    list: IList,
    dataSource: any[],
    loading: boolean,
}
```

#### IFilterHook

```typescript
interface IFilterHook {
    list: IList,
    filterInstance: IForm,
}
```

#### IFilterItemHook

```typescript
interface IFilterItemHook {
    list: IList,
    validateConfig: IListKVMap<any>,
}
```

#### IPaginationHook

```typescript
interface IPaginationHook {
    list: IList,
    setCurrentPage: (page: number) => void,
    setPageSize: (pageSize: number) => void,
    pageData: IListPageData,
}
```

#### IMultipleHook

```typescript
interface IMultipleHook {
    list: IList,
    id: string,
    pageSize: number,
}
```