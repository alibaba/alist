# 基本

- layout: default
- order: 0

最简单的用法。

---

## 可执行 DEMO

````js
import Form, { FormItem, Item } from '../src';
import Accordion, {AccordionCore}  from '../src/accordion';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import "../src/accordion/index.scss";
import "./antd.scss";
import "../src/index.scss";

const { Button, Input }  = wrapper(Antd);
const core = window.core = new AccordionCore();
const layout = {label: 4}
ReactDOM.render(<Accordion core={core} onChange={console.log}>
    <Form name="repeat" layout={layout} label="Sttep1">
        <FormItem label="开票人" name="drawerName"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        <FormItem label="子公司" name="branchName"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="Sttep1">
        <FormItem label="开票人" name="drawerName"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        <FormItem label="子公司" name="branchName"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="Sttep1">
        <FormItem label="开票人" name="drawerName"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        <FormItem label="子公司" name="branchName"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="Sttep1">
        <FormItem label="开票人" name="drawerName"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        <FormItem label="子公司" name="branchName"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName"><Input /></FormItem>
    </Form>
</Accordion>, mountNode);
````

````css
body {
    background-color: #f5f7fa!important;
}
````
