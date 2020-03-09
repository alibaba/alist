# 设置及消费筛选状态

## 启用筛选状态

通过 [setRowSelection](#setRowSelection) 快速启用

```tsx

const actions = createListActions();

const App = () => {
    
    useEffect(() => {
        actions.setRowSelection(); // 启用筛选项
    }, []);
}
```

## 消费筛选状态

通过 [Selection](#Selection) 消费筛选状态

```tsx

import { Selection } from '@alist/antd'

```

```jsx
import { createListActions, Consumer, List, Table, Pagination, Filter, Layout, Search, Clear } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()

const App = props => {
  const { children, ...others } = props
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <List actions={actions} url={url}>
      <Consumer selector="*">
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
        <Layout>
          <Filter.Item type="input" name="username" title="username" />
          <Filter.Item type="input" name="age" title="age" />
        </Layout>
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