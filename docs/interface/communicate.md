## 组件间通信机制

在 `List` 组件下，会根据请求结果分别控制 `Table`, `Pagination`, `Filter` 以及整体的 `loading` 整体控制等。

## 请求与组件默认处理机制

举例说明，当请求返回值为以下数据时：

```json
{
    "dataList": [],
    "pageSize": 10,
    "currentPage": 2,
    "total": 22
}
```

`AList` 会自动将请求的值传入到对应的组件，如下所示：

```tsx
<List>
    <Table dataSource={dataList} />
    <Pagination currentPage={currentPage} total={total} pageSize={pageSize} />
</List>
```

## 消费列表数据

通过 `<Conusmer>` 可以消费列表的状态

```tsx
<List>
    <Table />
    <Pagination />
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
</List>
``