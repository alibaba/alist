# @uform/core

English | [简体中文](./README.zh-cn.md)

> The list state core management package does not rely on any third-party UI frameworks. This package will provide the following features:
>
>
> - Manage Filter status
> - Manage Table status
> - Manage Pagination status
> - Manage List LifeCycle
> - Manage dependencies between Filter, Table, Pagination

### Install

```bash
npm install --save @alist/core
```

### Table Of Contents

<!-- toc -->

- [Backdrop](#Backdrop)
- [Design Concept](#Design-Concept)
- [Architecture diagram](#Architecture-diagram)
- [API](#api)
  - [`createList`](#createList)
- [Classes](#classes)
  - [`new ListLifeCycle()`](#new-ListLifeCycle)
- [Enums](#Enums)
  - [ListLifeCycleTypes](#ListLifeCycleTypes)
- [Interfaces](#interfaces)
  - [IListQueryMethod](#IListQueryMethod)
  - [IListQueryOptions](#IListQueryOptions)  
  - [IListQuery](#IListQuery)
  - [IListQuerySort](#IListQuerySort)
  - [IListFilterData](#IListFilterData)
  - [IListQueryData](#IListQueryData)
  - [IListProps](#IListProps)
  - [IListDataSource](#IListDataSource)
  - [IListmode](#IListmode)
  - [IListPageData](#IListPageData)
  - [IListFunctionOptions](#IListFunctionOptions)
  - [IList](#IList)
  

<!-- tocstop -->

### Backdrop

In the middle and back-end field, lists are indispensable scenarios which integrate the search area (form) and data display area (Table or chart). Lists act as background system portals, with the vast majority of pages.

AList is a unified and efficient solution for this scenario.

### Design Concept

AList is a framework that integrates mature solutions from all parties. The search area uses UForm, Pagination, and the Table area uses Fusion-Next or Ant-Design or other third-party component libraries.

### Architecture diagram

![list-construct](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/1716/1569207215636-259ff53a-4dd9-4ca9-ac74-60a0a8fe51b3.png)

### API

#### createList

> create a List instance

**Signature**

```typescript
createList(options?: IListProps): IList
```

**Usage**

```typescript
import createList from '@alist/core'

const list = createList({
  url: '/data.json'
})
```

### Classes

#### new ListLifeCycle

**Signature**

```typescript

type LifeCycleHandler<T> = (payload: T, context: any) => void

new ListLifeCycle(handler: LifeCycleHandler<Payload>)
new ListLifeCycle(...type: ListLifeCycleTypes, handler: LifeCycleHandler<Payload>...)
new ListLifeCycle(handlerMap: { [key: ListLifeCycleTypes]: LifeCycleHandler<Payload> })

```

**Usage**


```typescript
 import { createList, ListLifeCycle, ListLifeCycleTypes } from '@alist/core'

 const list = createList({
   lifecycles:[
     new ListLifeCycle(({ type, payload })=>{
        // God mode, full monitoring
     }),
     new ListLifeCycle(
       ListLifeCycleTypes.ON_LIST_INIT,
      (payload)=>{
        // Accurate monitoring
    }),
    new ListLifeCycle({
      [ListLifeCycleTypes.ON_LIST_INIT]: (payload)=>{
        // Object form accurate listener
      }
    }),
  ]
})
```

### Enums

#### ListLifeCycleTypes

```typescript
enum ListLifeCycleTypes {
    ON_LIST_ERROR = 'onListError',
    ON_LIST_EMPTY = 'onListEmpty',
    ON_LIST_WILL_INIT = 'onListWillInit',
    ON_LIST_INIT = 'onListInit',
    WILL_LIST_UPDATE = 'willListUpdate',
    DID_LIST_UPDATE = 'didListUpdate',
}
```

### Interfaces

#### IListQueryMethod

```typescript
type IListQueryMethod = 'GET' | 'POST'
```

### IListQueryOptions

```typescript
interface IListQueryOptions {
    url: string,
    data: IListQueryData,
    method?: IListQueryMethod, 
}
```

#### IListQuery

```typescript
type IListQuery = (queryOptions: IListQueryOptions) => Promise<any>
```

#### IListQuerySort

```typescript
type IListQuerySort = 'desc' | 'asc'
```

#### IListFilterData

```typescript
type IListFilterData = IListKVMap<any>
```

#### IListQueryData

```typescript
type IListQueryData = {
    sort?: IListKVMap<IListQuerySort>,
    currentPage: number,
    pageSize: number,
    filterData?: IListFilterData,
    _t: number,
}
```

#### IListProps

```typescript
interface IListProps {
    dataSource?: any,
    validateConfig?: IListKVMap<any>,
    url?: string,
    method?: IListQueryMethod,
    params?: any,
    paramsFields?: string | string[],
    pageSize?: number,
    currentPage?: number,
    total?: number,
    totalPages?: number,
    autoLoad?: boolean, // automatically load if there is a url
    defaultFilterValues?: any,
    multiple?: boolean, // multiple instance of table
    filterConfig?: any, // config of search area
    query?: IListQuery, // customize query
    formatBefore?: (queryData: IListQueryData) => any | void, // format query data before request
    formatAfter?: (response: any) => any | void, // format response data after request
    formatFilter?: (filterData: IListFilterData) => any | void, // format search area data which will affect query data
    lifecycles?: ListLifeCycle, // lifecycles management
}
```

#### IListDataSource

```typescript
type IListDataSource = any[]
```

#### IListmode

```typescript
enum ModeType {
    DATASOURCE = 'dataSource',
    URL = 'url',
    QUERY = 'query',
}

type IListMode = ModeType.DATASOURCE | ModeType.URL | ModeType.QUERY
```

#### IListPageData

```typescript
interface IListPageData {
    pageSize: number,
    currentPage: number,
    total: number,
    totalPages: number,
}
```

#### IListFunctionOptions

```typescript
interface IListFunctionOptions {
    withFetch?: boolean,
    withRender?: boolean,
    reset?: boolean,
    filterData?: IListFilterData,
    enableInvalid?: boolean
}
```

#### IList

```typescript
interface IList {
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
    notify: (type: ListLifeCycleTypes, paylaod?: any) => void
    setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void,
    getLoading: () => boolean,
    setUrl: (url: string, fnOpts?: IListFunctionOptions) => void,
    setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void,
    setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void,
    getParams: () => IListParams,
    setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void,
    setPageSize: (pageSize: number) => void,
    on: (key: EventType, cb?: IListEvent) => void
    removeListener: (key: EventType, cb?: IListEvent) => void,
}
```