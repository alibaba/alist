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
// (() => {
//     const propKeys = ['inline', 'defaultMinWidth', 'colon', 'full', 'inset'];
//     const core = new FormCore({
//         onChange: (fireKeys, values, ctx) => {
//             const { direction, props } = values;
//             if (fireKeys.includes('direction')) {
//                 core.setItemProps('form', { direction });
//             } else if (fireKeys.includes('props')) { // 选中为true，没选为false
//                 const prop = {};                        
//                 propKeys.forEach(k => prop[k] = props.includes(k));
//                 core.setItemProps('form', prop);
//             } else if (fireKeys.includes('layout-label')) {
//                 core.setItemValue('layout-control', 24 - values['layout-label']);
//                 core.setItemProps('form', { layout: { label: values['layout-label'], control: 24 - values['layout-label'] } });
//             } else if (fireKeys.includes('layout-control')) {
//                 core.setItemValue('layout-label', 24 - values['layout-control']);
//                 core.setItemProps('form', { layout: { label: 24- values['layout-control'], control: values['layout-control'] } });
//             }
//         }
//     });

//     return <Form core={core}>
//         <div style={{ color: '#999' }}>点击一次改变属性，再点一次清空改变</div>
//         <FormItem label="direction" name="direction" defaultValue="vertical">
//             <Radio.Group>
//                 <Radio.Button value="vertical">vertical</Radio.Button>
//                 <Radio.Button value="horizontal">horizontal</Radio.Button>
//                 <Radio.Button value="vertical-top">vertical-top</Radio.Button>
//             </Radio.Group>
//         </FormItem>

//         <FormItem label="props" name="props" defaultValue={['full', 'colon']}>
//             <Checkbox.Group
//                 options={propKeys.map(k => ({ label: k, value: k }))}
//             />
//         </FormItem>

//         <If when={(values => values.direction === 'vertical')}>
//             <FormItem label="layout">
//                 <div>
//                     <FormItem defaultValue="6" label="label" name="layout-label" inline>
//                         <InputNumber />
//                     </FormItem>
//                     <FormItem style={{ marginLeft: '8px' }} defaultValue="18" label="control" name="layout-control" inline>
//                         <InputNumber />
//                     </FormItem>
//                 </div>
//             </FormItem>
//         </If>

//         <FormItem name="form" layout={{ control: 24 }} full>
//             <Form layout={{ label: 6, control: 18 }}>
//                 <FormItem label="name" name="name"><Input /></FormItem>
//                 <FormItem label="age" name="age"><Input /></FormItem>
//             </Form>
//         </FormItem>
//     </Form>
// })(),
// (() => {
//     const core = new FormCore();
//     return <Form core={core}>
//         <FormItem label="fullfelx200" name="fullfelx200" flex full labelWidth={200}>
//             <Input />
//         </FormItem>
//         <FormItem label="full200" name="full200" full labelWidth={200}>
//             <Input />
//         </FormItem>
//         <FormItem label="fullflex" name="fullflex" full flex>
//             <Input />
//         </FormItem>
//         <FormItem label="full" name="full" full>
//             <Input />
//         </FormItem>
//         <FormItem label="flex" name="flex" flex>
//             <Input />
//         </FormItem>
//         <FormItem label="none" name="none">
//             <Input />
//         </FormItem>
//     </Form>
// })(),
(() => {
    const propKeys = ['inline', 'defaultMinWidth', 'colon', 'full', 'inset'];
    const core = new FormCore({
        onChange: (fireKeys, values, ctx) => {
            const { direction, props } = values;
            if (fireKeys.includes('direction')) {
                core.setItemProps('form', { direction });
            } else if (fireKeys.includes('props')) { // 选中为true，没选为false
                const prop = {};                        
                propKeys.forEach(k => prop[k] = props.includes(k));
                core.setItemProps('form', prop);
            } else if (fireKeys.includes('layout-label')) {
                core.setItemValue('layout-control', 24 - values['layout-label']);
                core.setItemProps('form', { layout: { label: values['layout-label'], control: 24 - values['layout-label'] } });
            } else if (fireKeys.includes('layout-control')) {
                core.setItemValue('layout-label', 24 - values['layout-control']);
                core.setItemProps('form', { layout: { label: 24- values['layout-control'], control: values['layout-control'] } });
            }
        }
    });

    return <Form core={core}>
        <div style={{ color: '#999' }}>点击一次改变属性，再点一次清空改变</div>
        <FormItem label="direction" name="direction" defaultValue="vertical">
            <Radio.Group>
                <Radio.Button value="vertical">vertical</Radio.Button>
                <Radio.Button value="horizontal">horizontal</Radio.Button>
                <Radio.Button value="vertical-top">vertical-top</Radio.Button>
            </Radio.Group>
        </FormItem>

        <FormItem label="props" name="props" defaultValue={['full', 'colon']}>
            <Checkbox.Group
                options={propKeys.map(k => ({ label: k, value: k }))}
            />
        </FormItem>

        <If when={(values => values.direction === 'vertical')}>
            <FormItem label="layout">
                <div>
                    <FormItem defaultValue="6" label="label" name="layout-label" inline>
                        <InputNumber />
                    </FormItem>
                    <FormItem style={{ marginLeft: '8px' }} defaultValue="18" label="control" name="layout-control" inline>
                        <InputNumber />
                    </FormItem>
                </div>
            </FormItem>
        </If>

        <Item listenProps render={(values, ctx) => {
            const props = ctx.getItemProps('form') || {};
            return <div style={{ marginTop: '16px' }}>
                <Form layout={{ label: 6, control: 18 }} {...props} >
                    <FormItem label="name" name="name"><Input /></FormItem>
                    <FormItem label="age" name="age"><Input /></FormItem>
                </Form>
            </div>
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
