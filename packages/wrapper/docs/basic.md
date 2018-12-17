# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
// import 'babel-polyfill';
// import { Input } from '../src/antd';
import { Input } from '../src/next/index';
import Form, { FormItem } from 'noform';
import { TableRepeater } from '../src/antd/repeater';
import './antd.scss';



const App = () => {
    return <Form >
        <FormItem label="username" name="username">
            <Input />
        </FormItem>
        <FormItem label="lll" name="lll">
            <TableRepeater>
                <FormItem label="username" name="username"><Input /></FormItem>
            </TableRepeater>
        </FormItem>
    </Form>
};

ReactDOM.render(<App />, mountNode);
````
