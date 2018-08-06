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
// const core = window.core = new AccordionCore();
const layout = {label: 4}
Accordion.Button = Button;
const editButton = <a href="javascript:;">编辑</a>
const nextButton = <Button type="primary">下一步</Button>
ReactDOM.render(<Accordion status="edit" onChange={console.log} editButton={editButton} nextButton={nextButton}>
    <Form name="repeat" layout={layout} label="物流订单" validateConfig={{
        drawerName: {type: "string", required: true},
    }}>
        <FormItem label="开票人" required name="drawerName"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        <FormItem label="子公司" name="branchName"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="重要报关信息">
        <FormItem label="开票人" name="drawerName1"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber1"><Input /></FormItem>
        <FormItem label="子公司" name="branchName1"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName1"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason1"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName1"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="随附单证">
        <FormItem label="开票人" name="drawerName2"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber2"><Input /></FormItem>
        <FormItem label="子公司" name="branchName2"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName2"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason2"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName2"><Input /></FormItem>
    </Form>
    <Form name="repeat" layout={layout} label="预估费用">
        <FormItem label="开票人" name="drawerName3"><Input /></FormItem>
        <FormItem label="税号" name="taxpayerNumber3"><Input /></FormItem>
        <FormItem label="子公司" name="branchName3"><Input /></FormItem>
        <FormItem label="核查结果" name="checkResultName3"><Input /></FormItem>
        <FormItem label="拒绝原因" name="denyReason3"><Input /></FormItem>
        <FormItem label="创建人" name="creatorName3"><Input /></FormItem>
    </Form>
</Accordion>, mountNode);
````

````css
body {
    background-color: #f5f7fa!important;
}
````
