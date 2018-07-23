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

const Dialog = AntdDialogFormWrapper(Antd)

const { Textarea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
import './antd.scss';

const popup = () => {
    const core = new FormCore();
    Dialog.show({
        title: '弹窗表单',
        content: <Form core={core}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
        </Form>
    });
};

let children = [
(() => {
    let formcore
    return <div>
        <h3>DialogForm</h3>
        <button onClick={popup}>popup</button>
    </div>
})(),
(() => {
    const options = [
        { label: 'zero', value: 0 },
        { label: 'one', value: 1 },
        // { label: 'zero(str)', value: '0' }
    ];

    const Plain = ({ value }) => {
        const str = `${value}`;
        return <div>{str}</div>
    }

    let formcore
    return <Form style={{ marginBottom: 12 }} onMount={core => formcore = core} layout={{label: 5, control: 19}} full>
        <h3>FormItem值为0</h3>
        <div className="demo-form">
            <FormItem label="zeroSelect" name="zero" defaultValue={0}><Select options={options} /></FormItem>
        </div>
        <br/><br/>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    let formcore
    return <Form style={{ marginBottom: 12 }} onMount={core => window.core = formcore = core} layout={{label: 5, control: 19}} full>
        <h3>外部触发IF</h3>
        <div className="demo-form">
            <FormItem label="username" name="username"><Input /></FormItem>
            <If when={({ outside }) => {
                return outside === '123';
            }}>
                <div>bingo</div>
            </If>
            <If when={({ outsideObj }) => {
                return outsideObj === '123';
            }}>
                <div>bingo(obj)</div>
            </If>
        </div>
        <br/><br/>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
        <button onClick={() => formcore.setValue('outside', '123')}> outside trigger </button>
        <button onClick={() => formcore.setValues({ 'outsideObj': '123' })}> outside trigger(obj) </button>
    </Form>
})(),
(() => {
    let formcore
    return <Form onMount={core => window.core = formcore = core} style={{ marginBottom: 12 }} layout={{label: 5, control: 19}} full>
        <h3>If布局</h3>
        <div className="demo-form">
            <FormItem label="username" name="username" defaultValue="bobby"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
            <If when={({ username }) => {
                return username === 'bobby';
            }}>
                <FormItem label="hulalal" name="hulalal"><Input /></FormItem>
                <FormItem label="ooolll" name="ooolll"><Input /></FormItem>
            </If>
            <button onClick={() => formcore.setGlobalStatus('preview')}>preview</button>
        </div>
    </Form>
})(),
(() => {
    let formcore
    return <Form onMount={core => window.core = formcore = core} direction="hoz" style={{ marginBottom: 12 }} full>
        <h3>If布局(水平)</h3>
        <div className="demo-form">
            <FormItem label="username" name="username" defaultValue="bobby"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
            <If when={({ username }) => {
                return username === 'bobby';
            }}>
                <FormItem label="hulalal" name="hulalal"><Input /></FormItem>
                <FormItem label="ooolll" name="ooolll"><Input /></FormItem>
            </If>
            <button onClick={() => formcore.setGlobalStatus('preview')}>preview</button>
        </div>
    </Form>
})()
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
