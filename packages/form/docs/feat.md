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
    const keys = {
      simple: {
        username: '姓名',
        age: '年龄'
      },
      complicated: {
        type: '种类',
        color: '颜色'
      }
    };


    const sValidateConfig = {};
    const cValidateConfig = {};
    Object.keys(keys.simple).forEach(key => sValidateConfig[key] = { required: true, message: keys.simple[key] + '必填' } );
    Object.keys(keys.complicated).forEach(key => cValidateConfig[key] = { required: true, message: keys.complicated[key] + '必填' } );

    let subCore = new FormCore();
    let formcore = new FormCore({
      onChange: (firekeys, values) => {
        const { select } = values;
        if (select === 'simple') {
          subCore.setValidateConfig(sValidateConfig, true);
        } else if (select === 'complicated') {
          subCore.setValidateConfig(cValidateConfig, true);
        }
      }
    });

    window.formcore = formcore;
    window.subCore = subCore;

    return <Form core={formcore} layout={{label: 5, control: 19}}>
        <FormItem name="select" label="select">
          <Select options={[{ label: '简单', value: 'simple' }, { label: '复杂', value: 'complicated' }]} />
        </FormItem>
        <FormItem render={(values) => {
          const { select } = values;
          if (!select) return null;

          return <Form core={subCore}>
            {
              Object.keys(keys[select]).map(key => (<FormItem key={key} name={key} label={keys[select][key]}>
                <Input />
              </FormItem>)
              )
            }

            <Button onClick={async () => {
              const errors = await subCore.validate();
              console.log('errors', errors);
            }}>validate</Button>
          </Form>
        }} />
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
