## 生命周期

## 引入

以 `Ant-Design` 举例，`Fusion-Next` 可类比。

列表中发生任何事情时都会触发对应的生命周期，开发者可以通过消费这些生命周期执行副作用。

```tsx
import { List, createListActions, ListLifeCycleTypes } from '@alist/antd'
const App = () => {
  const actions = createListActions()
  return <List
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
    >
        ...
    </List>
}
```

## 类型列举

所有生命周期汇总如下，所有变量名推荐使用 `ListLifeCycleTypes` 使用：

| 变量名       | 变量值                             | 描述                 |
|:----------|:---------------------------------|:--------------------|
| ON_LIST_WILL_INIT    |onListWillInit                  | 列表即将初始化 |
| ON_LIST_INIT    |onListInit                  | 列表初始化完成 |
| ON_LIST_MOUNTED    |onListMounted                  | 列表挂载完成 |
| ON_LIST_INIT_PARAMS_SET    |onListInitParamsSet                  | 列表初始化URL参数关联设置 |
| ON_LIST_PARAMS_CHANGE    |onListParamsChange                  | 列表关联URL参数发生变化 |
| WILL_LIST_UPDATE    |willListUpdate                  | 列表即将更新 |
| DID_LIST_UPDATE    |didListUpdate                  | 列表更新完成 |
| ON_LIST_FILTER_ITEM_CHANGE    |onListFilterItemChange                  | 搜索区域字段发生变化 |
| ON_LIST_FILTER_ITEM_EXPAND    |onListFilterItemExpand                  | 搜索区域展开触发 |
| ON_LIST_FILTER_ITEM_COLLAPSE    |onListFilterItemCollapse                  | 搜索区域展开收起 |
| ON_LIST_VALIDATE_START    |onListValidateStart                  | 搜索区域校验开始 |
| ON_LIST_VALIDATE_END    |onListValidateEnd                  | 搜索区域校验结束 |
| ON_LIST_CLEAR    |onListClear                  | 搜索区域点击清空 |
| ON_LIST_RESET    |onListReset                  | 搜索区域点击重置 |
| ON_LIST_BEFORE_QUERY    |onListBeforeQuery                  | 列表请求前 |
| ON_LIST_AFTER_QUERY    |onListAfterQuery                  | 列表请求后 |
| ON_LIST_ERROR    |onListError                  | 列表请求失败 |
| ON_LIST_EMPTY    |onListEmpty                  | 列表请求返回空数据 |
| ON_LIST_SELECT    |onListSelect                  | 表格触发选择某一项 |
| ON_LIST_SELECT_ALL    |onListSelectAll                  | 表格触发选择全部 |
| ON_LIST_SELECT_CHANGE    |onListSelectChange                  | 表格触发选择改变 |
| ON_LIST_DATASOURCE_FILTER    |onListDatasourceFilter                  | 表格触发过滤 |
| ON_LIST_DATASOURCE_SORT    |onListDatasourceSort                  | 表格触发选择排序 |
| ON_LIST_SORT    |onListSort                  | 等价于`ON_LIST_DATASOURCE_SORT` |
| ON_LIST_FILTER    |onListFilter                  | 等价于`ON_LIST_DATASOURCE_FILTER` |
| ON_LIST_MULTIPLE_REFRESH    |onListMultipleRefresh                  | 多实例列表触发重绘 |
| ON_LIST_VALIDATE_CONFIG_REFRESH    |onListValidateConfigRefresh                  | 搜索区域校验规则发生变化 |
| ON_LIST_FILTER_REFRESH    |onListFilterRefresh                  | 搜索区域触发重绘 |
| ON_LIST_PAGINATION_REFRESH    |onListPaginationRefresh                  | 分页区域触发重绘 |
| ON_LIST_TABLE_REFRESH    |onListTableRefresh                  | 表格区域触发重绘 |
| ON_LIST_SELECTION_REFRESH    |onListSelectionRefresh                  | 表格筛选项发生重绘 |
| ON_LIST_CONSUMER_REFRESH    |onListConsumerRefresh                  | 自定义消费组件触发重绘 |






