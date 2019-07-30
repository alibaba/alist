# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import * as Antd from 'antd';
import Form, { FormItem, Item, If, FormCore, Logger } from '../src';
import AntdWrapper from '../src/wrapper/antd';
import AntdDialogFormWrapper from '../src/dialog/antd';
import rules from '../src/validate';
const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber, AutoComplete, Mention
} = AntdWrapper(Antd);

import repeater  from '../src/repeater';
import dialogWrapper from '../src/dialog/antd';

const Dialog = AntdDialogFormWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });


const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
import './antd.scss';
import "./repeater.scss";

export const customizeFormType = {
  options: [
    { label: '单选', value: 'Radio' },
    { label: '多选', value: 'Checkbox' },
    { label: '文本', value: 'Input' },
    { label: '数字', value: 'InputNumber' },
    { label: '日期', value: 'DatePicker' },
    { label: '日期区间', value: 'RangePicker' },
  ],
  text: {
    Radio: '单选',
    Checkbox: '多选',
    Input: '文本',
    InputNumber: '数字',
    DatePicker: '日期',
    RangePicker: '日期区间'
  }
};


let children = [
(() => {
    // const logger = new Logger({ url: '' });
    const logger = new Logger();
    const core = new FormCore({
        // enableReceiveProps: true,
        logger,
        autoValidate: true,
        validateConfig: {            
            source: { required: true, message: 'source is required' }
        },
        values: {
            source: '123',
        }
    });
    
    window.logger = logger;
    window.core = core;

    // const taskLog = logger.logTask({ url: 'https://scm.alibaba.com/express/calculateFreight.json?id=123' });
    // setTimeout(() => {
    //     taskLog.success({
    //         code: 0,
    //         data: 123
    //     });
    // }, 1000);


    return <Form logger={logger} core={core}>
        {/* <FormItem label="source" name="source">
            <Input />
        </FormItem> */}
        <FormItem label="abcd" name="abcd">
            <Form>
                <FormItem label="inner" name="inner">
                    <Input />
                </FormItem>
            </Form>
        </FormItem>
        {/* <Item render={(values) => {
            const { source } = values;
            console.log('source', source);
            return <FormItem name="b-source" label="b-source">
                <Input />
            </FormItem>
        }} /> */}
    </Form>
})(),
]


ReactDOM.render(<div>
    <style>
        {`
        body{
            width: 800px;
            margin: 0 auto;
        }
        button{
            margin-right: 20px;
            margin-bottom: 15px;
        }
        input{
            height: 28px;
            padding-left: 5px;
            font-size: 14px;
        }
        button{
            font-size:14px;
            padding: 5px 10px;
        }
        .demo-form{
            padding: 10px;
            background-color: #eee;
        }
        .demo-form p{
            margin: -10px -10px 10px;
            padding: 5px 10px;
            background-color: #d9d9d9;
        }
        `}
    </style>
    {children.map((child, key) => React.cloneElement(child, { key }))}
</div>, mountNode)
````
