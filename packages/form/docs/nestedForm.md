# 基本

- layout: default
- order: 0

最简单的用法。

---

## 可执行 DEMO

````js
import Form, { FormItem, Item, FormCore, If } from '../src';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import "./antd.scss";

const { Button, Input }  = wrapper(Antd);

const core = new FormCore();
const consoleValue = () => {
    console.log(core.getValues());
}

const toggleStatus = () => {
    const globalStatus = core.getGlobalStatus();
    const targetStatus = (globalStatus === 'edit' ? 'preview' : 'edit');
    console.log('targetStatus', targetStatus, globalStatus);
    core.setGlobalStatus(targetStatus);
};

ReactDOM.render(
    <Form core={core} layout={{ label: 2, control: 22 }}>
        <FormItem label="产品名" name="productName"><Input /></FormItem>
        <FormItem label="公司信息" name="company">
            <Form layout={false}>
                <FormItem label="公司名" name="name"><Input /></FormItem>
                <FormItem label="公司地址" name="address">
                    <Form>
                        <FormItem label="省" name="province"><Input /></FormItem>
                        <FormItem label="市" name="city"><Input /></FormItem>
                        <FormItem label="区" name="district"><Input /></FormItem>
                        <FormItem label="详细地址" name="detail"><Input /></FormItem>
                    </Form>
                </FormItem>
            </Form>
        </FormItem>
        <FormItem label="产品参数" name="param"><Input /></FormItem>
        <FormItem label="">
            <div>
                <Button style={{marginRight: '8px' }} onClick={toggleStatus}>Toggle Status</Button>
                <Button onClick={consoleValue}>Console Value</Button>
            </div>
        </FormItem>
    </Form>
, mountNode);
````
