# API列表

## 用法

```tsx
import { createListActions } from '@alist/antd'

const actions = createListActions()
```

## 总览

所有 `actions` 的API如下：

| 方法名       | 描述                             | 入参                 | 结果                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| refresh    |刷新列表，会触发请求                  | [IListFunctionOptions](#IListFunctionOptions) | |
| clear    |清空操作                  | [IListFunctionOptions](#IListFunctionOptions) |  |
| reset    |重置，与`<List defaultFilterValues={value} />`配合，若有则恢复，若无则与`clear`一致。                  | [IListFunctionOptions](#IListFunctionOptions) |  |
| setCurrentPage    |分页跳转                  | number |  |
| setPageSize    |设置分页大小                  | number |  |
| setLoading    |设置loading状态                  | boolean | |
| getLoading    |获取loading状态                  |  | boolean |
| setUrl    |动态切换请求url                  | string |  |
| setQuery    |动态切换请求query                  | IQuery |  |
| getParams    |获取url与搜索区域关联参数                  |  | {[key: string]: string} |
| setParams    |设置url与搜索区域关联参数                  | {[key: string]: string}, [IListFunctionOptions](#IListFunctionOptions)  |  |
| getPageData    |获取分页数据                  |  | [IListPageData](#IListPageData) |
| setPageData    |设置分页数据                  | [IListPageData](#IListPageData) |  |
| getExpandStatus    |获取展开收起状态                  | "expand" `or` "collapse" |  |
| toggleExpandStatus    |设置展开收起状态                  |  |  |
| getFilterData    |获取搜索区域数据                  |  | {[key: string]: any} |
| setFilterData    |设置搜索区域数据                  | {[key: string]: any} |  |
| getDataSource    |获取dataSource                  |  | any[] |
| setDataSource    |动态更新dataSource                  | any[] |  |
| getSelectionConfig    |获取筛选配置                  |  | [IListSelectionConfig](#IListSelectionConfig) |
| setSelectionConfig    |设置筛选配置                  | [IListSelectionConfig](#IListSelectionConfig) |  |
| disableSelectionConfig    |禁用是筛选                  |  |  |
| setRowSelection    |启用筛选模式                  |  |  |
| getSelections    |获取当前筛选项                  |  | { ids: string[], recors: any[] } |
| getSortConfig    |获取排序配置                  |  | [IListSortConfig](#IListSortConfig) |
| setSortConfig    |设置排序配置                  | [IListSortConfig](#IListSortConfig) |  |
| getMultipleData    |获取多实例数据                  |  | [key: string]: [IListBaseResponse](#IListBaseResponse) |
| setMultipleData    |设置多实例数据                  | [key: string]: [IListBaseResponse](#IListBaseResponse) |  |
| setMultiplePageSize    |设置多实例分页数据                  | [key: string]: number, [IListFunctionOptions](#IListFunctionOptions) |  |
| getFilterProps    |获取搜索区域props                  |  |  |
| getFilterInstance    |获取搜索区域实例(**Formily**的`createFormActions`实例)                  |  |  |
| getTableProps    |获取表格区域属性                  |  |  |
| setTableProps    |设置表格区域属性，会触发重绘                  |  |  |
| setPaginationDataSource    |设置分页后数据                  | any[] |  |
| getPaginationDataSource    |获取分页后数据                  |  | any[] |


## 具体API

### refresh

默认为重置页码刷新，可以通过设置 `reset=false` 保持当页刷新

```tsx
actions.refresh({ reset: false })
```

### setRowSelection

启用筛选模式，相当于设置 `<Table>` 的 `rowSelection`, 如有更多定制需求，可以通过 [setTableProps](#setTableProps) 实现

```tsx
const App = () => {
    useEffect(() => {
        actions.setRowSelection() // 在挂载完成后设置
    }, [])
}
```

### getSelections

获取当前 `<Table>` 选中的项

```tsx
actions.getSelections() // { ids: [], records: [] }
```

### setTableProps

动态设置 `<Table>` 的属性

```tsx
actions.setTableProps({ bordered: false })
```


## 属性明细

#### IListFunctionOptions

调用API时的常见

| 字段名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| withFetch    | 是否触发请求，非必填                  | boolean |
| withRender    | 是否触发重绘，非必填                  | boolean |
| reset    | 是否触发重置，非必填                  | boolean |

#### IListPageData

分页数据类型

| 字段名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| pageSize    | 分页大小                  | number |
| currentPage    | 当前页数                  | number |
| total    | 总条目数                  | number |
| totalPages    | 总页面数                  | number |

#### IListBaseResponse

列表请求响应结果

| 字段名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| dataList    | 数据列表                  | any[] |
| paginationDataList    | 分好页的数据列表                  | any[] |
| total    | 总条目数                  | number |
| pageSize    | 分页大小                  | number |
| currentPage    | 当前页数                  | number |
| totalPages    | 总页面数                  | number |


#### IListSelectionConfig

筛选项配置

| 字段名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| ids    | 选中id列表                  | Array<string|number> |
| records    | 选中条目数                  | Array<any> |
| primaryKey    | 主键, 默认值为`id`                  | string |
| mode    | 总页面数                  | 'single' `or` 'multiple' |
| getProps    | 设置筛选项属性                  | (record: any) => Object |


#### IListSortConfig

排序配置

| 字段名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| mode    | 排序配置的模式                  | 'single' `or` 'multiple' |
| sortLocal    | 设置自定义排序方法                  | (dataSource: any, config: [IListSortConfig](#IListSortConfig)) => any |
| sorter    | 默认排序设置                  | [key:string]: 'desc' `or` 'asc' |