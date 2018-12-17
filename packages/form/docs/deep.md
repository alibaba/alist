# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import Form, { FormItem, Item, If, FormCore } from '../src';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
// import '../src/repeater/index.scss';
// import "antd/dist/antd.css";
import "./repeater.scss";

const { Modal, Button, Input, Checkbox, Radio, Switch }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });

import AsyncValidator from 'async-validator';
import '../src/index.scss'

const defaultValue = {
    // age: 15,
    // user: {
    //     username: 'lily',
    // },
    hw1: [{ hscode: '' }],
    hw222222: [{ hscode: '' }]
};

const values = { x: 1 };
const valuesCore = new FormCore({ initValues: values });
valuesCore.setValues({
    x: 123,
    y: 456
});
console.log(valuesCore.getValues());
valuesCore.reset();
console.log(valuesCore.getValues());

let children = [
    (() => {
    const core = new FormCore({
        initValues: {
            username: '123'
        },
        validateConfig: {
            username: {type: "string", required: true},
            age: {type: "string", required: true},
        },
        autoValidate: true,
        onChange: (keys, values) => {
            if (keys.indexOf('username') !== -1) {
                core.validateItem('age');
            }

            if (keys.indexOf('age') !== -1) {
                core.validateItem('username');
            }
        }
    });
    window.core = core;
    return <Form core={core} layout={{label: 5, control: 19}} full value={defaultValue}>
        <h3>嵌套if</h3>
        <div className="demo-form">
            {/* <Item name="age"><Input /></Item>
            <Item name="user">
                <Form>
                    <Item name="username"><Input /></Item>
                </Form>
            </Item>
            <If when={(value) => {
                // console.log('value', value, value.age, 'bool', (value.age < 18));
                // return value.age < 18
                return value.user && value.user.username === 'bobby';
            }}>
                <Item name="student">
                    <Form>
                        <Item name="studentname"><Input /></Item>
                        <Item name="bus">
                            <Form>
                                <Item name="buscode"><Input /></Item>
                            </Form>
                        </Item>
                    </Form>
                </Item>
            </If> */}
            
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>                

            {/* <FormItem label="student" name="student">
                <InlineRepeater locale="zh" addPosition="bottom" multiple itemAlign="left">            
                    <FormItem label="hs1" name="quantity">
                        <Input />
                    </FormItem>
                </InlineRepeater>
            </FormItem>

            <FormItem label="teacher" name="teacher">
                <InlineRepeater locale="zh" addPosition="bottom" multiple itemAlign="left">            
                    <FormItem label="hs1222" name="quantity">
                        <Input />
                    </FormItem>
                </InlineRepeater>
            </FormItem> */}

            {/* <FormItem name="user" label="user">
                <Form>
                    <FormItem name="quantity" label="quantity">
                        <Input />
                    </FormItem>
                    <FormItem name="action1" label="action1">
                        <Input />
                    </FormItem>
                </Form>
            </FormItem>

            <FormItem name="student" label="student">
                <Form>
                    <FormItem name="quantity" label="quantity">
                        <Input />
                    </FormItem>
                    <FormItem name="action2" label="action2">
                        <Input />
                    </FormItem>
                </Form>
            </FormItem> */}

            {/* <FormItem label="">
                <div>
                    <div>1. username为bobby时，触发第一层if</div>
                    <div>2. username为bobby, age为23时，触发嵌套if</div>
                </div>
            </FormItem>

            <FormItem label="" style={{ margin: '12px 0' }} name="wrapperForm">
                <Form layout={{label: 5, control: 19}} full>
                    <FormItem label="username" name="username"><Input /></FormItem>
                </Form>
            </FormItem>
            <FormItem label="" name="deep">
                <Input />
            </FormItem>

            <FormItem label="" style={{ margin: '12px 0' }} name="wrapperIf">
                <If when={(values, { globalStatus }) => {
                    console.log('8****', values, '******8');
                    return values.deep === 'abcd';
                }}>
                    <FormItem label="" name="xxx">
                        <div>deep works!</div>
                    </FormItem>
                </If>
            </FormItem>

            <If when={(values, { globalStatus }) => {
                return values.username === 'bobby';
            }}>
                <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep">
                            <Input />
                        </FormItem>
                    </div>
                </FormItem>
                <If when={(values, { globalStatus }) => {
                    return values.age == 23;
                }}>
                    <FormItem label="" >
                        <div>Congratulation! You've solved the last maze!</div>
                        <If when={(values, { globalStatus }) => {
                            return values.age == 23 && values.deep === 'abcd';
                        }}>
                            <div>xxxx!!!</div>
                        </If>
                    </FormItem>
                </If>

                <If when={(values, { globalStatus }) => {
                    return values.deep == 'abcd';
                }}>
                    <FormItem label="" >
                        <div>deep works!</div>
                    </FormItem>
                </If>
                <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep"><Input /></FormItem>
                        <If when={(values, { globalStatus }) => {
                                return values.deep == 'abcd';
                            }}>
                            <FormItem label="" name="deepForm">                        
                                <Form layout={{label: 5, control: 19}} full>
                                    <FormItem label="nif" name="nif"><Input /></FormItem>
                                    <FormItem label="dif" name="dif">
                                        <If when={(values, { globalStatus }) => {
                                            return values.nif == 100;
                                        }}>
                                            <FormItem label="" name="nifDeep">
                                                <div>nif 100!!!</div>
                                            </FormItem>
                                        </If>
                                    </FormItem>
                                </Form>
                            </FormItem>

                            <FormItem label="whois" name="whois"><Input /></FormItem>
                        </If>
                    </div>
                </FormItem>

                <If when={(values, { globalStatus }) => {
                    return values.age == 23;
                }}>
                    <FormItem label="" >
                        <div>Congratulation! You've solved the last maze!</div>
                    </FormItem>
                </If>

                <If when={(values, { globalStatus }) => {
                    return values.deep == 'abcd';
                }}>
                    <FormItem label="" >
                        <div>deep works!</div>
                    </FormItem>
                </If>
            </If> */}
            <button onClick={() => console.log(formcore.getValue())}> console value </button>
            </div>
        <br/><br/>
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
