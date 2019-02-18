# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import './antd.scss';
import List, { Any, Filter, Table, Pagination } from 'nolist/lib/wrapper/antd';
import Form, { FormItem, FormCore } from 'noform';
import { message } from 'antd';
import { InputNumber, Input, Select, DatePicker, Dialog } from 'nowrapper/lib/antd';

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
        message.success('编辑成功');
        hide();
    },
    content: <Form layout={{ label: 8, control: 16 }} core={core} >
        <FormItem name="id" label="id"><Input /></FormItem>
        <FormItem name="username" label="username"><Input /></FormItem>
        <FormItem name="age" label="age"><Input /></FormItem>
        <FormItem name="gender" label="gender"><Input /></FormItem>
        <FormItem name="country" label="country"><Input /></FormItem>
        <FormItem name="registeredDate" label="registeredDate"><Input /></FormItem>
    </Form>
  });
};

const renderOperation = (text, record, idx) => {
  return <a href="javascript:void(0)" onClick={editForm}>编辑</a>
};

const customRender = ({ search, clear, builtin, DynamicBuiltin }) => {
  return <div>
    <DynamicBuiltin />
    <a href="javascript:void(0)" onClick={search}>search</a>
  </div>
}

class NoList extends React.Component {
  render() {
    return (
      <div style={{ margin: '24px' }}>
        <List url="/docs/mock.json" onError={handleError} onMount={onMount}>
            <Filter noLayout direction="ver">
              <Filter.Item label="username" name="username"><Input placeholder="placeholder" /></Filter.Item>
              <Filter.Item label="age" name="age"><Input /></Filter.Item>
              <Filter.Item label="date" name="date"><DatePicker placeholder="placeholder"/></Filter.Item>
              <Filter.Search>搜搜</Filter.Search>
              <Filter.Clear>清理</Filter.Clear>
            </Filter>
            <Table>
              <Table.Column title="id" dataIndex="id" />
              <Table.Column title="username" dataIndex="username" />
              <Table.Column title="age" dataIndex="age" />
              <Table.Column title="gender" dataIndex="gender" />
              <Table.Column title="country" dataIndex="country" />
              <Table.Column title="registeredDate" dataIndex="registeredDate" />
              <Table.Column title="operation" render={renderOperation} />
            </Table>
            <Pagination />
        </List>
      </div>
    );
  }
}

ReactDOM.render(<NoList />, mountNode);
````
