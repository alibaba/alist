## 理解Actions/Effects

`AList` 将所有列表相关的操作都抽象到 `ListActions`，我们可以通过 `createListActions` 获取它。

通过使用它的API实现各种列表操作，如刷新，重置，清空等操作, 具体可以查看 [API列表](#API列表)。

## 使用

```tsx

import { List, createListActions, ListLifeCycleTypes } from '@alist/antd'
const actions = createListActions()

const APP = () => {
    return <List
        actions={actions}
        effects={($, actions) => {
            $(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE).subscribe((state) => {
                if (state.name === 'username') {
                    actions.refresh() // 搜索区域用户名字段变化时，刷新列表
                }
            })
        }}
    >
        ...
    </List>
}
```

## API列表

所有 `actions` 的API如下：

| 方法名       | 描述                             | 入参                 | 结果                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| refresh    |刷新列表，会触发请求                  |  | |
| clear    |清空操作                  |  |  |
| reset    |重置                  |  |  |
| setCurrentPage    |分页跳转                  |  |  |
| setPageSize    |设置分页大小                  |  |  |
| setLoading    |设置loading状态                  | boolean | |
| getLoading    |获取loading状态                  |  | boolean |
| setUrl    |动态切换请求url                  | string |  |
| setQuery    |动态切换请求query                  | IQuery |  |
| getParams    |获取url与搜索区域关联参数                  |  |  |
| setParams    |设置url与搜索区域关联参数                  |  |  |
| getPageData    |获取分页数据                  |  |  |
| setPageData    |设置分页数据                  |  |  |
| getExpandStatus    |获取展开收起状态                  |  |  |
| toggleExpandStatus    |设置展开收起状态                  |  |  |
| getFilterData    |获取搜索区域数据                  |  |  |
| setFilterData    |设置搜索区域数据                  |  |  |
| getDataSource    |获取dataSource                  |  |  |
| setDataSource    |动态更新dataSource                  |  |  |
| getSelectionConfig    |获取筛选配置                  |  |  |
| setSelectionConfig    |设置筛选配置                  |  |  |
| disableSelectionConfig    |禁用是筛选                  |  |  |
| getSelections    |获取当前筛选项                  |  |  |
| getSortConfig    |获取排序配置                  |  |  |
| setSortConfig    |设置排序配置                  |  |  |
| getMultipleData    |获取多实例数据                  |  |  |
| setMultipleData    |设置多实例数据                  |  |  |
| setMultiplePageSize    |设置多实例分页数据                  |  |  |
| getFilterProps    |获取搜索区域props                  |  |  |
| getFilterInstance    |获取搜索区域实例                  |  |  |
| getTableProps    |获取表格区域属性                  |  |  |
| setTableProps    |设置表格区域属性，会触发重绘                  |  |  |
| setPaginationDataSource    |设置分页后数据                  |  |  |
| getPaginationDataSource    |获取分页后数据                  |  |  |

