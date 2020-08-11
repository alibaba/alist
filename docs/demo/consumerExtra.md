# Consumer 消费额外接口数据

`<Consumer>` 为自定义消费组件，能够动态获取当前列表实例（ListActions）,并使用 API 来渲染消费列表数据。

> 默认 `selector` 为 \*，即所有的变更都会引起重绘，可以选择指定的生命周期控制渲染次数。

```jsx
import {
  createListActions,
  Consumer,
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear
} from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()
window.ll = actions

const App = props => {
  const { children, ...others } = props
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/extra.json'

  return (
    <List actions={actions} url={url}>
      <Consumer selector="*">
        {list => {
          const { extra } = list.getResponseData()
          return (
            <div>
              extraData: {JSON.stringify(extra)} <br />
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
