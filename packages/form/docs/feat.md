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

const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
import './antd.scss';

const formFragment = (core) => (<Form core={core} >
    <FormItem label="time" name="time"><DatePicker /></FormItem>
    <FormItem label="timeRange" name="timeRange"><DatePicker.RangePicker /></FormItem>
</Form>);

const popup = () => {
    const core = new FormCore();
    Dialog.show({
        title: '弹窗表单',
        content: formFragment(core),
        footerAlign: 'label',
        onOk: (values, hide) => {
            console.log('ok', values);
            hide();
        }
    });
};

window.popup = popup;

let children = [
// (() => {
//     const ic = new FormCore();
//     window.ic = ic;
//     return <Form core={ic} layout={{label: 5, control: 19}} full>
//         <FormItem label="username" name="username"><Input /></FormItem>
//         <If when={(values) => {
//             const { username } = values || {};
//             return username === 'a';
//         }}>
//             <FormItem label="nested" name="nested">
//                 <Form>
//                     <FormItem label="n1" name="n1">
//                         <Input />
//                     </FormItem>
//                     <FormItem label="n2" name="n2">
//                         <Input />
//                     </FormItem>
//                 </Form>
//             </FormItem>
//         </If>
//     </Form>
// })(), 
// (() => {
//     let formcore
//     return <div>
//         <h3>DialogForm</h3>
//         <button onClick={popup}>popup</button>
//     </div>
// })(),
(() => {
    let formcore = new FormCore({
    });

    window.formcore = formcore;

    return <Form direction="ver" core={formcore} colon={false} style={{ marginBottom: 12 }} layout={{label: 5, control: 19}} full>
        <div className="demo-form">
            <FormItem required label="point" name="point"><Input /></FormItem>
            <If when={({ point }) => {
                return point === 'ab';
            }}>
                <FormItem required label="ax" name="ax"><Input /></FormItem>
            </If>
        </div>
        <FormItem required label="hello" defaultValue="abcd" name="hello"><Input /></FormItem>
        <br/><br/>
</Form>
})(),
// (() => {
//     const options = [
//         { label: 'zero', value: 0 },
//         { label: 'one', value: 1 },
//         // { label: 'zero(str)', value: '0' }
//     ];

//     const Plain = ({ value }) => {
//         const str = `${value}`;
//         return <div>{str}</div>
//     }


//     const sleep = (time) => {
//         return new Promise((resolve) => {
//             setTimeout(resolve, time);
//         });
//     };


//     const validateConfig = {
//         username: {type: "string", required: true},
//         hidden: {type: "string", required: true},
//         // username: {
//         //     validator: async (rule, v, callback) => {
//         //         // console.log('vusername:', v);
//         //         // return new Promise((resolve, reject) => {
//         //         //     setTimeout(() => {
//         //         //         reject((['eeee', 'ddd']))
//         //         //     }, 1000);
//         //         // });

//         //         await sleep(1000);
//         //         console.log('throwing....cc');
//         //         throw new Error('eee');
//         //     }
//         // },
//         // age: (values, ctx) => {
//         //     // const { username } = ctx.getValues();
//         //     const { username } = values;
//         //     if (username === 'r') {
//         //         return {type: "string", required: true};
//         //     } else {
//         //         return null;
//         //     }
            
//         // }
//     }

//     let formcore = new FormCore({
//         initValues: {},
//         validateConfig,
//         autoValidate: true,
//         values: {
//             user: {
//                 email: '456'
//             }
//         }
//     });

//     window.formcore = formcore;

//     const judge = async () => {
//         // const result = await formcore.validate();
//         const result = await formcore.validateWithoutRender();
//         // const result = await formcore.validateItem(['username']);
//         formcore.scrollToError();
//         console.log(result, 'jdjdjdjd');
//     };

//     const boolOpts = [
//         { label: '是', value: true },
//         { label: '否', value: false }
//     ];

//     return <Form core={formcore} colon={false} style={{ marginBottom: 12 }} layout={{label: 5, control: 19}} full>
//         <h3>Validate errors</h3>
//         <div className="demo-form">
//             <FormItem label="battery" name="battery">
//                 <RadioGroup options={boolOpts} />
//             </FormItem>
//             <FormItem required label="username" name="username"><Input /></FormItem>
//             <If when={({ username }) => {
//                 return username === 'bobby';
//             }}>
//                 <FormItem required label="hidden" name="hidden"><Input /></FormItem>
//             </If>
//             {/* <FormItem label="username" name="username"><Input /></FormItem> */}
//             {/* <FormItem label="user" name="user">
                
//                     <Form layout={false}>
//                         <FormItem label="age" name="age"><Input /></FormItem>
//                         <FormItem label="email" name="email"><Input /></FormItem>
//                     </Form>
                
//             </FormItem> */}
//             <If when={({ username }, ctx) => {
//                 return ctx.globalStatus === 'preview';
//             }}>
//                 <div>123</div>
//             </If>
            
//             {/* <If when={values => values.username === 'bobby'}>
//                 <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
//                     <div>
//                         hello bobby!
//                         <FormItem label="" name="deep">
//                             <Input />
//                         </FormItem>

//                         <If when={values => values.deep === 'abcd'}>
//                             <FormItem label="" name="deepForm">
//                                 <Form layout={{ label: 5, control: 19 }} full>
//                                     <FormItem label="nif" name="nif"><Input /></FormItem>
//                                     <FormItem label="dif" name="dif">
//                                         <If when={values => values.nif === 100}>
//                                             <FormItem label="nifDeep" name="nifDeep">
//                                                 <div>nif 100!!!</div>
//                                             </FormItem>
//                                         </If>
//                                     </FormItem>
//                                 </Form>
//                             </FormItem>
//                         </If>
//                     </div>
//                 </FormItem>
//             </If> */}
//             {/* <FormItem required label="errorJudge" render={(values, ctx) => {
//                 const { error } = ctx;
//                 console.log('error', error, ctx);
//                 return null;
//             }}/> */}
//             {/* <Item render={(values) => {
//                 const { username = '', isShow } = values || {};
//                 return <div>
//                     <FormItem label={`${username}_age`} name="age"><Input /></FormItem>
//                 </div>
//             }} /> */}
//             {/* <Form >
//                 <FormItem label="time" name="time"><DatePicker /></FormItem>
//                 <FormItem label="timeRange" name="timeRange"><DatePicker.RangePicker /></FormItem>
//             </Form> */}
//         </div>
//         <br/><br/>
//         <button onClick={() => console.log(formcore.getValue())}> console value </button>
//         <button onClick={judge}> Judge </button>
// </Form>
// })(),
// (() => {
//     const options = [
//         { label: 'zero', value: 0 },
//         { label: 'one', value: 1 },
//         // { label: 'zero(str)', value: '0' }
//     ];

//     const Plain = ({ value }) => {
//         const str = `${value}`;
//         return <div>{str}</div>
//     }

//     let formcore
//     return <Form colon={false} style={{ marginBottom: 12 }} onMount={core => formcore = core} layout={{label: 5, control: 19}} full>
//         <h3>FormItem值为0</h3>
//         <div className="demo-form">
//             <FormItem required label="zeroSelect" name="zero" defaultValue={0}><Select options={options} /></FormItem>
//             <FormItem required label="noname" ><Select options={options} /></FormItem>
//         </div>
//         <br/><br/>
//         <button onClick={() => console.log(formcore.getValue())}> console value </button>
//     </Form>
// })(),
// (() => {
//     let formcore
//     return <Form style={{ marginBottom: 12 }} onMount={core => formcore = core} layout={{label: 5, control: 19}} full>
//         <h3>外部触发IF</h3>
//         <div className="demo-form">
//             <FormItem label="username" name="username"><Input /></FormItem>
//             <If when={({ outside }) => {
//                 return outside === '123';
//             }}>
//                 <div>bingo</div>
//             </If>
//             <If when={({ outsideObj }) => {
//                 return outsideObj === '123';
//             }}>
//                 <div>bingo(obj)</div>
//             </If>
//         </div>
//         <br/><br/>
//         <button onClick={() => console.log(formcore.getValue())}> console value </button>
//         <button onClick={() => {
//             formcore.setValue('outside', '123');
//             formcore.setValue('otheraaa', '44441231');
//         }}> outside trigger </button>
//         <button onClick={() => formcore.setValues({ 'outsideObj': '123' })}> outside trigger(obj) </button>
//     </Form>
// })(),
// (() => {
//     let formcore
//     return <Form onMount={core => formcore = core} style={{ marginBottom: 12 }} layout={{label: 5, control: 19}} full>
//         <h3>If布局</h3>
//         <div className="demo-form">
//             <FormItem label="username" name="username" defaultValue="bobby"><Input /></FormItem>
//             <FormItem label="age" name="age"><Input /></FormItem>
//             <If when={({ username }) => {
//                 return username === 'bobby';
//             }}>
//                 <FormItem label="hulalal" name="hulalal"><Input /></FormItem>
//                 <FormItem label="ooolll" name="ooolll"><Input /></FormItem>
//             </If>
//             <button onClick={() => formcore.setGlobalStatus('preview')}>preview</button>
//         </div>
//     </Form>
// })(),
// (() => {
//     let formcore
//     return <Form onMount={core => formcore = core} direction="hoz" style={{ marginBottom: 12 }} full>
//         <h3>If布局(水平)</h3>
//         <div className="demo-form">
//             <FormItem label="username" name="username" defaultValue="bobby"><Input /></FormItem>
//             <FormItem label="age" name="age"><Input /></FormItem>
//             <If when={({ username }) => {
//                 return username === 'bobby';
//             }}>
//                 <FormItem label="hulalal" name="hulalal"><Input /></FormItem>
//                 <FormItem label="ooolll" name="ooolll"><Input /></FormItem>
//             </If>
//             <button onClick={() => formcore.setGlobalStatus('preview')}>preview</button>
//         </div>
//     </Form>
// })(),
// (() => {
//     const extCore = new FormCore({
//         onChange: (fields, values, context) => {
//             console.log(context, fields, values);
//             console.log(context.ext);
//         }
//     });

//     const extTarget = {
//         username: 'bobby'
//     };
//     return <Form core={extCore} style={{ marginBottom: 12 }} full>
//         <h3>setValue with Extra</h3>
//         <div className="demo-form">
//             <FormItem label="username" name="username" ><Input /></FormItem>
//             <FormItem label="age" name="age"><Input /></FormItem>
//             <If when={({ username }) => {
//                 return username === 'bobby';
//             }}>
//                 <FormItem label="hulalal" name="hulalal"><Input /></FormItem>
//                 <FormItem label="ooolll" name="ooolll"><Input /></FormItem>
//             </If>
//             <button onClick={() => extCore.setValues(extTarget)}>setValues</button>
//             <button onClick={() => extCore.setValues(extTarget, { detail: true })}>setValuesWith</button>
//         </div>
//     </Form>
// })()
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
