# @uform/core

> 列表状态核心管理包(不依赖任何第三方 UI 框架)，在该包中，它主要做了：
>
> - 管理 搜索框 Filter 状态
> - 管理 列表 Table 状态
> - 管理 分页 Pagination 状态
> - 管理 Filter/Table/Pagination 之间的依赖关系
> - 管理 列表生命周期 ListLifeCycle

### 安装

```bash
npm install --save @alist/core
```

### 目录

<!-- toc -->

- [背景](#背景)
- [设计理念](#设计理念)
- [架构图](#架构图)
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

### 背景

中后台领域，列表是必不可少的场景，其特殊之处是集合了搜索区域（表单），以及数据展示区域（Table或图表）等
复杂组件，其定位主要是整合及调度。由于中后台场景中，列表充当入口的角色，页面数量占中后台场景的绝大多数，
而AList就是这个场景统一，高效的解决方案。

### 设计理念

AList是集各方成熟方案于一体的框架，搜索区域使用UForm，Pagination，Table区域则使用Fusion-Next或Ant-Design或其他第三方组件库。
底层通过核心层抽象列表各个维度数据，UI层则负责适配不同端的特性，顶层通过Schema协议描述快速渲染。

### 架构图

![list-construct](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/1716/1569207215636-259ff53a-4dd9-4ca9-ac74-60a0a8fe51b3.png)

### API

#### createList

> 创建一个 List 实例

**签名**

```typescript
createList(options?: IListProps): IList
```

**用法**

```typescript
import createList from '@alist/core'

const list = createList({
  url: '/data.json'
})
```

### Classes

#### new ListLifeCycle

**签名**

```typescript

type LifeCycleHandler<T> = (payload: T, context: any) => void

new ListLifeCycle(handler: LifeCycleHandler<Payload>)
new ListLifeCycle(...type: ListLifeCycleTypes, handler: LifeCycleHandler<Payload>...)
new ListLifeCycle(handlerMap: { [key: ListLifeCycleTypes]: LifeCycleHandler<Payload> })

```

**用法**


```typescript
 import { createList, ListLifeCycle, ListLifeCycleTypes } from '@alist/core'

 const list = createList({
   lifecycles:[
     new ListLifeCycle(({ type, payload })=>{
        // 监听一切变更
     }),
     new ListLifeCycle(
       ListLifeCycleTypes.ON_LIST_INIT,
      (payload)=>{
        // 精确监听
    }),
    new ListLifeCycle({
      [ListLifeCycleTypes.ON_LIST_INIT]: (payload)=>{
        // 对象模式监听多个生命周期
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
    autoLoad?: boolean, // 自动加载
    defaultFilterValues?: any,
    multiple?: boolean, // 多实例列表
    filterConfig?: any, // 搜索区域设置
    query?: IListQuery, // 自定义请求
    formatBefore?: (queryData: IListQueryData) => any | void, // 格式化请求前函数
    formatAfter?: (response: any) => any | void, // 格式化请求后函数
    formatFilter?: (filterData: IListFilterData) => any | void, // 格式化搜索数据 会影响 formatBefore输入
    lifecycles?: ListLifeCycle, // 生命周期函数
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