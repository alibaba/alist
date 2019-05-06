# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import * as Antd from 'antd';
import Form, { FormItem, Item, If, FormCore } from '../src';
import AntdWrapper from '../src/wrapper/antd';
import AntdDialogFormWrapper from '../src/dialog/antd';
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


let children = [
(() => {
    let formcore = new FormCore({
        values: {
            // code: '2019-05-20 10:00:00'
        },
        autoValidate: true,
        validateConfig: {
            code: { required: true, type: "string", message: 'reuqired' },
            userId: { required: true, type: "string", message: 'reuqired' }
        }
    });

    window.formcore = formcore;

    return <Form
        direction="ver"
        core={formcore}
        colon={false}
        style={{ marginBottom: 12 }}
        layout={{label: 5, control: 19}}
        full
    >
        <FormItem label="code" required name="code"><Input trim/></FormItem>
        <FormItem label="userId" render={(values, core) => {
            return (
                <Select
                    allowClear
                    options={[{ label: 'a1', value: 'a' }, { label: 'b1', value: 'b' }]}
                    onChange={(val, option) => {
                        core.setItemValue('userId', val);
                        core.setItemValue('userName', option.props.children);
                    }}
                    value={values.userId}
                />
            )
            }}
        />
        <FormItem label="student" name="student" onChange={(a, b, c) => {
            console.log(a,b,c)
        }}>
            <Select options={[{ label: 'a1', value: 'a' }, { label: 'b1', value: 'b' }]} />
        </FormItem>
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
