# 基本

- layout: default
- order: 0

---

````js
import Form, { FormItem, Item, FormCore, If } from '../src';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
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

class SubItem extends React.Component {
    static contextTypes = {
        item: React.PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);
        const aSource = [{ label: 'a', value: 'a' }];
        const bSource = [{ label: 'b', value: 'b' }];

        if (context.item) {
            context.item.core.addSubField(this);
        }

        this.core = new FormCore({
            validateConfig: innerValidateConfig,
            autoValidate: true,
            onChange: (firekey, values, ctx) => {
                const { first } = values;
                if (first && first.length > 3) {
                    ctx.setValue('second', 'b');
                    ctx.setItemProps('second', { options: bSource });
                } else {
                    ctx.setValue('second', 'a');
                    ctx.setItemProps('second', { options: aSource });
                }
            }
        });
    }

    // promise
    validate = async () => {
        const err = await this.core.validate();
        const msg = Object.keys(err || {}).map((key) => err[key]).filter(item => !!item)[0];
        return msg;
    }

    // plain
    // validate = () => {
    //     const { first } = this.core.getValues();
    //     if (first && first.length > 3) {
    //         return null;
    //     } else {
    //         return 'inner error';
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) { // 受控
            const { value } = nextProps;
            this.core.setValues(value);
        }
    }

    render() {
        const { onChange } = this.props;
        return <Form core={this.core} onChange={onChange}>
            <FormItem name="first"><Input /></FormItem>
            <FormItem name="second"><Select /></FormItem>
        </Form>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        window.core = this.core = new FormCore({
            autoValidate: true,
            validateConfig: {
                sub: {
                    validator: (rule, value, callback) => {
                        if (value.first) {
                            callback([]);
                        } else {
                            callback(['(sub inner)input不能为空']);
                        }
                    }
                },
                rrr: [
                    { required: true, type: 'array', message: 'rrr error' },
                    { validator: async () => {
                        throw new Error('ooo');
                    }}
                ]
            }
        });

        this.core.setPublic({
            bizcode: '4999'
        });
    }

    onMountR = (rp) => {
        window.rp = rp;
    }

    onMultipleChange = () => {
        
    }

    errorRender = (err) => {
        console.log('===', err);
        return <div style={{ color: 'blue '}}>{err}</div>
    }

    render() {
        const { onChange } = this.props;

        const formConfig = {
            autoValidate: true,
            validateConfig: {
                // username: [{ required: true, message: 'username is required' }]
            //     username: (values, ctx) => {
            //         const publicVal = ctx.top.getPublic();
            //         return [{
            //             validator: (rule, value, callback) => {
            //                 if (value && value.length > 3) {
            //                     callback([]);
            //                 } else {
            //                     callback(['username === input不能为空且长度需要大于3']);
            //                 }
            //             }
            //         }]
            //     }
                // username: [
                //     { validator: async (values) => {
                //         if (values.username) {
                //             return null;
                //         } else {
                //             throw new Error('abc');
                //         }                        
                //     }}
                // ]
                username: () => {
                    return [
                        { validator: async (values) => {
                            if (values.username) {
                                return null;
                            } else {
                                throw new Error('abc');
                            }                        
                        }}
                    ]
                }
            }
        };

        return <Form core={this.core} onChange={onChange}>
            {/* <FormItem name="sub"><SubItem /></FormItem> */}
            <FormItem name="rrr" errorRender={this.errorRender}>
                <InlineRepeater multiple onMount={this.onMultipleChangeonMultipleChange} onMultipleChange={this.onMultipleChange} formConfig={formConfig} addPosition="bottom">
                    <FormItem label="username" name="username"><Input /></FormItem>
                </InlineRepeater>
            </FormItem>
            {/* <Item render={(values) => {
                const str = JSON.stringify((values || {}), 4);
                return <div>{str}</div>
            }} /> */}
        </Form>
    }
}

ReactDOM.render(<App />, mountNode);

````
