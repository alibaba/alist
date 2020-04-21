# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import './next.scss';
import List, { Any, Filter, Table, Pagination } from 'nolist/lib/wrapper/next';
import Form, { FormItem, FormCore } from 'noform';
import { Message } from '@alifd/next';
import { Input, Select, DatePicker, Dialog } from 'nowrapper/lib/next';

const handleError = (e) => {
  console.log('e', e);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const onMount = (list) => {
  window.list = list;
}

const editForm = (val, index, record) => {
  const core = new FormCore({
    values: record
  });

  Dialog.show({
    title: '编辑',
    footerAlign: 'label',
    locale: 'zh',
    style: { width: '480px' },
    enableValidate: true,
    onOk: async (values, hide) => {
        await sleep(1000);
        Message.success('编辑成功');
        hide();
    },
    content: <Form handleError={handleError} layout={{ label: 8, control: 16 }} core={core} >
        <FormItem name="id" label="id"><Input /></FormItem>
        <FormItem name="username" label="username"><Input /></FormItem>
        <FormItem name="age" label="age"><Input /></FormItem>
        <FormItem name="gender" label="gender"><Input /></FormItem>
        <FormItem name="country" label="country"><Input /></FormItem>
        <FormItem name="registeredDate" label="registeredDate"><Input /></FormItem>
    </Form>
  });
};

const renderOperation = (a, b, c) => {
  return <a href="javascript:void(0)" onClick={editForm}>编辑</a>
};

class NoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      selectedRecords: []
    };
  }
  render() {
    const selectionProps = {
      rowSelection: {
        onChange: (selectedKeys, selectedRecords) => {
            console.log('onRowChange', selectedKeys, selectedRecords);
            this.setState({
                selectedKeys,
                selectedRecords
            });
        },
        selectedRowKeys: this.state.selectedKeys,
      }
    }

    return (
      <div style={{ margin: '24px' }}>
        <List url="/docs/mock.json" onError={handleError} onMount={onMount}>
            <Filter cols={3}>
              <Filter.Item label="username" name="username"><Input /></Filter.Item>
              <Filter.Item label="age" name="age"><Input /></Filter.Item>
              <Filter.Item label="country" name="country"><Select dataSource={[]} /></Filter.Item>
              <Filter.Item label="date" name="date"><DatePicker /></Filter.Item>
              <Filter.Item label="创建时间" colSpan="2">
                  <React.Fragment>
                      <Filter.Item noLayout name="createStartTime"><DatePicker /></Filter.Item>
                      <Filter.Item noLayout name="createEndTime"><DatePicker /></Filter.Item>
                  </React.Fragment>
              </Filter.Item>
            </Filter>
            <Table {...selectionProps}>
              <Table.Column title="id" dataIndex="id" />
              <Table.Column title="username" dataIndex="username" />
              <Table.Column title="age" dataIndex="age" />
              <Table.Column title="gender" dataIndex="gender" />
              <Table.Column title="country" dataIndex="country" />
              <Table.Column title="registeredDate" dataIndex="registeredDate" />
              <Table.Column title="operation" cell={renderOperation} />
            </Table>
            <Pagination />
        </List>
      </div>
    );
  }
}

ReactDOM.render(<NoList />, mountNode);
````
