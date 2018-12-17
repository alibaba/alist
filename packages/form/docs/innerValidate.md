# 基本

- layout: default
- order: 0

---

````js
import Form, { FormItem, Item, FormCore, If } from '../src';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import PropTypes from 'prop-types';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
import ItemContext from '../src/context/item';
import "./repeater.scss";

const { Modal, Button, Input, Checkbox, Radio, Select }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });
const SelectRepeater = Selectify(TableRepeater);

const innerValidateConfig = {
    first: {
        validator: (rule, value, callback) => {
            if (value && value.length > 3) {
                callback([]);
            } else {
                callback(['input不能为空且长度需要大于3']);
            }
        }
    }
};

// class SubItem extends React.Component {
//     static contextTypes = {
//         item: PropTypes.object,
//     };

//     constructor(props, context) {
//         super(props, context);
//         const aSource = [{ label: 'a', value: 'a' }];
//         const bSource = [{ label: 'b', value: 'b' }];

//         // 绑定子项
//         // <Form>
//         // <FormItem>
//         //  <Form>
//         if (context.item) {
//             context.item.core.addSubField(this);
//         }

//         // this.core = new FormCore({
//         //     validateConfig: innerValidateConfig,
//         //     autoValidate: true,
//         //     onChange: (firekey, values, ctx) => {
//         //         const { first } = values;
//         //         if (first && first.length > 3) {
//         //             ctx.setValue('second', 'b');
//         //             ctx.setItemProps('second', { options: bSource });
//         //         } else {
//         //             ctx.setValue('second', 'a');
//         //             ctx.setItemProps('second', { options: aSource });
//         //         }
//         //     }
//         // });
//     }

//     // promise
//     validate = async () => {
//         const err = await this.core.validate();
//         const msg = Object.keys(err || {}).map((key) => err[key]).filter(item => !!item)[0];
//         return msg;
//     }

//     // plain
//     // validate = () => {
//     //     const { first } = this.core.getValues();
//     //     if (first && first.length > 3) {
//     //         return null;
//     //     } else {
//     //         return 'inner error';
//     //     }
//     // }

//     // componentWillReceiveProps(nextProps) {
//     //     if ('value' in nextProps) { // 受控
//     //         const { value } = nextProps;
//     //         this.core.setValues(value);
//     //     }
//     // }

//     render() {
//         const { onChange } = this.props;
//         // return <Form core={this.core} onChange={onChange}>
//         return <Form onMount={core => this.core = core} onChange={onChange}>
//             <FormItem name="first"><Input /></FormItem>
//             <FormItem name="second"><Select /></FormItem>
//         </Form>
//     }
// }

// const validate = async () => {
//     const error = await core.validate();
//     console.log('error', error);
// };

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         window.core = this.core = new FormCore({
//             // autoValidate: true,
//             validateConfig: {
//                 sub: {
//                     validator: (rule, value, callback) => {
//                         if (value.first) {
//                             callback([]);
//                         } else {
//                             callback(['(sub inner)input不能为空']);
//                         }
//                     }
//                 },
//                 rrr: [
//                     { required: true, type: 'array', message: 'rrr error' },
//                     { validator: async () => {
//                         throw new Error('ooo');
//                     }}
//                 ]
//             }
//         });

//         this.core.setPublic({
//             bizcode: '4999'
//         });
//     }

//     onMountR = (rp) => {
//         window.rp = rp;
//     }

//     onMultipleChange = () => {
        
//     }

//     errorRender = (err) => {
//         console.log('===', err);
//         return <div style={{ color: 'blue '}}>{err}</div>
//     }

//     render() {
//         const { onChange } = this.props;

//         const formConfig = {
//             autoValidate: true,
//             validateConfig: {
//                 // username: [{ required: true, message: 'username is required' }]
//             //     username: (values, ctx) => {
//             //         const publicVal = ctx.top.getPublic();
//             //         return [{
//             //             validator: (rule, value, callback) => {
//             //                 if (value && value.length > 3) {
//             //                     callback([]);
//             //                 } else {
//             //                     callback(['username === input不能为空且长度需要大于3']);
//             //                 }
//             //             }
//             //         }]
//             //     }
//                 // username: [
//                 //     { validator: async (values) => {
//                 //         if (values.username) {
//                 //             return null;
//                 //         } else {
//                 //             throw new Error('abc');
//                 //         }                        
//                 //     }}
//                 // ]
//                 // username: () => {
//                 //     return [
//                 //         { validator: async (rule, value, callback) => {
//                 //             if (value) {
//                 //                 callback([]);
//                 //             } else {
//                 //                 throw new Error('abc');
//                 //             }                        
//                 //         }}
//                 //     ]
//                 // }
//                 drawerName: { type: 'string', required: true },
//                 t1: { type: 'string', required: true },
//                 t2: { type: 'string', required: true },
//             }
//         };



//         return <Form core={this.core} onChange={onChange}>
//             <FormItem name="sub"><SubItem /></FormItem>
//             {/* <FormItem name="rrr" errorRender={this.errorRender}>
//                 <InlineRepeater multiple onMount={this.onMultipleChangeonMultipleChange} onMultipleChange={this.onMultipleChange} formConfig={formConfig} addPosition="bottom">
//                     <FormItem label="username" name="username"><Input /></FormItem>
//                 </InlineRepeater>
//             </FormItem> */}
//             {/* <Item name="repeat">
//                 <InlineRepeater formConfig={formConfig}>
//                     <FormItem label="开票人" name="drawerName"><Input /></FormItem>
//                     <FormItem label="税号" multiple>
//                         <div>
//                             <FormItem name="t1"><Input /></FormItem>
//                             <FormItem name="t2"><Input /></FormItem>
//                         </div>
//                     </FormItem>
//                 </InlineRepeater>
//             </Item> */}
//             {/* <FormItem label="company" name="company">
//                 <Input />
//             </FormItem> */}
//             {/* <FormItem label="username" name="username" top="username top" help="user help">
//                 <Input />
//             </FormItem> */}
//             {/* <Item name="username"><Input /></Item>
//             <Item render={(...args) => {
//                 const value = args[0];
//                 return <div id={value.username} />;
//             }}
//             /> */}
//             {/* <FormItem label="InlineRepeater" name="inlineRepeaterx">
//                 <InlineRepeater formConfig={formConfig}>
//                     <FormItem label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
//                     <FormItem label="age" name="age"><Input style={{ width: '100px' }} /></FormItem>
//                 </InlineRepeater>
//             </FormItem> */}
//             {/* <Item render={(values) => {
//                 const str = JSON.stringify((values || {}), 4);
//                 return <div>{str}</div>
//             }} /> */}
//             <Button onClick={validate}>validate</Button>
//         </Form>
//     }
// }


const validateConfig = {
    first: [{ required: true, message: 'first is required' }]
}

// 子表单
class InnerSubItem extends React.Component {
    constructor(props) {
        super(props);
        if (props.item) {
            props.item.addSubField(this);
        }
    }

    // 返回第一个错误给外部
    validate = async () => {
        const err = await this.core.validate();
        const msg = Object.keys(err || {}).map((key) => err[key]).filter(item => !!item)[0];
        return msg;
    }

    onMount = (core) => {
        this.core = core;
    }

    render() {
        const { onChange, value } = this.props;
        return <Form onMount={this.onMount} onChange={onChange} value={value} validateConfig={validateConfig}>
            <FormItem name="first"><Input /></FormItem>
            <FormItem name="second"><Select /></FormItem>
        </Form>
    }
}

const SubItem = (props) => {
    return <ItemContext.Consumer>
        { ({ item }) => (<InnerSubItem {...props} item={item} />)}
    </ItemContext.Consumer>
}

// 主表单
const core = new FormCore();
const validate = async () => {
    const error = await core.validate();
    console.log('error', error);
};

const App = () => {
    return <Form core={core}>
        <FormItem name="sub"><SubItem /></FormItem>            
        <Button onClick={validate}>validate</Button>
    </Form>
}

ReactDOM.render(<App />, mountNode);

````
