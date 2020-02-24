# @alist/react

English | [简体中文](./README.zh-cn.md)

> @alist/react is based on `react` and `@alist/core` is already built in. It provide API to manuplate list state and components for rendering support.
> it mainly includes:
>
> - `<ListProvider/>`
> - `<FieldProvider/>`
> - `<FilterProvider/>`
> - `<Consumer/>`
> - `<Layout/>`
> - `<MultipleProvider/>`
> - `<PaginationProvider/>`
> - `<TableProvider/>`

### Install

```bash
npm install --save @alist/react
```

### Table Of Contents

<!-- toc -->

- [`Usage`](#Usage)
  - [`Quick Start(URL Mode)`](#quick-starturl-mode)
  - [`DataSource Mode`](#DataSource-Mode)
  - [`Multiple Mode`](#Multiple-Mode)
  - [`Request Format`](#Request-Format)
  - [`Customize Request`](#Customize-Request)
  - [`Effects`](#Effects)
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

#### Quick Start(URL Mode)

Pass `url` and it set to `URL Mode` and automatically request. Check [Request Format](#Query-Format) for more information.

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
      currentPage：{props.currentPage} , 
      pageSize：{props.pageSize} , 
      total：{props.total} , 
      totalPages：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>jump</button>
      </div>
    </div>}
  </PaginationProvider>
}

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>Basic Usage</h1>
    <h5>Check 'Network' in DevTools for more information</h5>

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

#### DataSource Mode

Pass `dataSource` will set to `DataSource Mode` which will automatically paginate.

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
      currentPage：{props.currentPage} , 
      pageSize：{props.pageSize} , 
      total：{props.total} , 
      totalPages：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>jump</button>
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
    <h1>DataSource Mode</h1>
    <h5>automatically paginate the dataSource</h5>
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

#### Multiple Mode


Use `MultipleProvider` and `setMultipleData` to split one response data into multiple pieces for consumption

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
      currentPage：{props.currentPage} , 
      pageSize：{props.pageSize} , 
      total：{props.total} , 
      totalPages：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>jump</button>
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
    <h1>Multiple Mode</h1>
    <h5>One Response data for multiple lists and each list has paging logic</h5>
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
      currentPage：{props.currentPage} , 
      pageSize：{props.pageSize} , 
      total：{props.total} , 
      totalPages：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>jump</button>
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
    <h1>Customize Request</h1>
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

#### Effects

Consumption life cycle hook of list vie effects. Check [ListLifeCycleTypes](#ListLifeCycleTypes) for more infomation.

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
    <h1>Basic Usage</h1>
    <h5>Check DevTools to see the output</h5>

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

**Usage**

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

**Usage**

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

**Usage**

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

**Usage**

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

get a `List` instance, it already built in `<ListProvider/>`

**Signature**

```typescript
type useList = (options: IListUIProps): IList
```

**Usage**

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

get table data, it already built in `<TableProvider/>`

**Signature**

```typescript
type useTable = (props: ITableProps = {}): ITableHook
```

**Usage**

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

get list data, it already built in `<ConsumerProvider/>`

**Signature**

```typescript
type useConsumer = (props: IConsumerProps): IList
```

**Usage**

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

get form instance, it already built in `<FilterProvider/>`

**Signature**

```typescript
type useFilter = (props: IFilterProps): IFilterHook
```

**Usage**

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

get field data, it already built in `<FieldProvider/>`

**Signature**

```typescript
type type useFilterItem = (props: IFilterItemProps): IFilterItemHook
```

**Usage**

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

get pagination data, it already built in `<PaginationProvider/>`

**Signature**

```typescript
type usePagination = (props: IPaginationProps = {}): IPaginationHook
```

**Usage**

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

get multiple list data, it already built in `<ConsumerProvider/>`

**Signature**

```typescript
type useMultipleProvider = (props: IMultipleProps): IMultipleHook
```

**Usage**

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

> The API is fully inherited from @alist/core. The specific API of @alist/react is listed below.

---


#### `createListActions`

> Return [IListActions](#IListActions)

**Signature**

```typescript
createListActions(): IListActions
```

**Usage**

```typescript
import { createListActions } from '@alist/react'

const actions = createListActions()
console.log(actions.getPageData())
console.log(actions.getDataSource())
```

#### `createAsyncListActions`

> Return [IListAsyncActions](#IListAsyncActions)

**Signature**

```typescript
createAsyncListActions(): IListAsyncActions
```

**Usage**

```typescript
import { createAsyncListActions } from '@alist/react'

const actions = createAsyncListActions()
console.log(actions.getPageData().then(val => console.log(val))
console.log(actions.getDataSource().then(val => console.log(val))
```

#### `ListEffectHooks`

> Return all @alist/core lifeCycles hook which can be subscribe

**Usage**

```tsx
import { ListEffectHooks, ListProvider } from '@alist/react'
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

> Custom your own hook by this api

**Signature**

```typescript
(type: string): Observable<TResult>
```

**Usage**

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

> The Interfaces is fully inherited from @alist/core. The specific Interfaces of @alist/react is listed below.

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