# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js

import Form, { Item, FormItem, FormCore } from 'noform';
import { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
    Rate, Cascader, TreeSelect, Upload, Button, InputNumber, AutoComplete, Dialog } from '../src/antd/index';
import { TableRepeater } from '../src/antd/repeater';
import { Alert, Icon, message, Row, Col } from 'antd';
import moment from 'moment';
import './antd.scss';

const sleep = (mills) => new Promise(resolve => setTimeout(resolve, mills));

const Ff = () => {
    const core = new FormCore({
        validateConfig: {
            test: { required: true, message: 'test is required' }
        }
    });
    window.ff = core;
    return <Form core={core} layout={{ label: 4, control: 20 }} defaultMinWidth={false} full>
        <FormItem full label="test" name="test"><Input /></FormItem>
    </Form>
}


const checkRowChange = (value) => {
    console.log('row change...', value);
}


// Dialog.show({
//     title: 'title',
//     content: Ff,
//     enableValidate: true,
//     footerAlign: 'label', // left | center | right
//     onOk: (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
//         console.log('values', values);
//         return new Promise(async (resolve, reject) => {
//             try {
//                 resolve();
//                 message.success('This is a message of success', 1, hide);
//             } catch (e) {
//                 reject();
//                 message.error('error', 1);
//             }
//         });
//     }
// });

const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
const { RangePicker } = DatePicker;

const dataSource = [
    { label: 'optA', value: 'optA'},
    { label: 'optB', value: 'optB'}
];

const treeData = dataSource.map(item => ({...item, title: item.label }));

const fileList = [
    { uid: 1, name: 'xxx.png', url: 'http://www.baidu.com/xxx.png', },
    { uid: 3, name: 'zzz.png', status: 'error', reponse: 'Server Error 500' }
];
  

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        window.antdCore = this.core = new FormCore({
            values: {
                DatePicker: moment('2017-05-20 12:00:00'),
            },
            onChange: (firekeys, values) => {
                if (firekeys.indexOf('province' !== -1) ) {
                    window.antdCore.setItemProps('city', { options: [{ label: 'abc', value: 'abc' }] })
                }
            }
        });
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    getValues = () => {
        console.log('[antd example] getValues', this.core.getValues());
    }

    resetValues = () => {
        this.core.reset();
        console.log('[next example] resetValues', this.core.getValues());
    }

    dialogForm = () => {
        const core = new FormCore({
            onChange: (firekeys, values, ctx) => {
                const { province } = values;
                if (firekeys.indexOf('province' !== -1) && province === '广东省') {
                    ctx.setItemProps('city', { options: [{ label: '深圳', value: '深圳' }] })
                }
            }
        });
        Dialog.show({
            footerAlign: 'label',
            title: 'dialog',
            locale: 'zh',
            content: <Form core={core} layout={{ label: 4, control: 20 }}>
                <div className="list-dialog-hint" >地址维护</div>
                <FormItem label="province" name="province">
                    <Select options={[{ label: '广东省', value: '广东省' }]} />
                </FormItem>
                <FormItem label="city" name="city">
                    <Select options={[]} />
                </FormItem>
            </Form>,
            footer: (hide, { ok, cancel, ctx }) => {
                const getValues = () => {
                    console.log('gv:', ctx.getValues());
                };

                return <div>
                    <Button onClick={getValues}>getValues</Button>
                    <Button onClick={ok}>ok</Button>
                    <Button onClick={cancel}>cancel</Button>
                </div>
            },
            onOk: async (values, hide) => {
                console.log('values', values);
                await sleep(1000);
                message.success('This is a message of success', 1, hide);
            },
            onCancel: () => {
                console.log('===>>>>>');
            }
        });
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Antd Examples</div>
                <Alert style={{ marginBottom: 12 }} message={<div>
                    <div>open console.log for more details of values</div>
                </div>} type="info" showIcon />

                <FormItem label="province" name="province">
                    <Select options={[{ label: 'aaa', value: 'aaa' }]} />
                </FormItem>
                <FormItem label="city" name="city">
                    <Select options={[]} />
                </FormItem>

                <FormItem label="Global Status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>

                <FormItem label="Values">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.getValues}>getValues</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.resetValues}>reset</Button>
                    </div>
                </FormItem>

                <FormItem label="Dialog">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.dialogForm}>dialog</Button>
                    </div>
                </FormItem>

                <FormItem label="input" name="input"><Input placeholder="abcdefg"/></FormItem>
                <FormItem label="AutoComplete" name="AutoComplete"><AutoComplete options={dataSource} placeholder="abcdefg"/></FormItem>         <CheckboxGroup style={{ width: '100%' }} onChange={checkRowChange}>
                    <Row>
                        <Col span={8}><CheckboxGroup.Item value="A">A</CheckboxGroup.Item></Col>
                        <Col span={8}><CheckboxGroup.Item value="B">B</CheckboxGroup.Item></Col>
                        <Col span={8}><CheckboxGroup.Item value="C">C</CheckboxGroup.Item></Col>
                        <Col span={8}><CheckboxGroup.Item value="D">D</CheckboxGroup.Item></Col>
                        <Col span={8}><CheckboxGroup.Item value="E">E</CheckboxGroup.Item></Col>
                        <Col span={8}><CheckboxGroup.Item value="X">X</CheckboxGroup.Item></Col>
                    </Row>
                </CheckboxGroup>
                <FormItem label="TextArea" name="TextArea"><TextArea placeholder="abcdefg"/></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} placeholder="abcdefg"/></FormItem>
                <FormItem label="Multi Select" name="select"><Select mode="multiple" options={dataSource} placeholder="abcdefg"/></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox >Selected</Checkbox></FormItem>
                <FormItem label="Radio" name="Radio"><Radio >Selected</Radio></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
                <FormItem label="CheckboxGroup" name="CheckboxGroup"><CheckboxGroup options={dataSource} /></FormItem>
                <FormItem label="RadioGroup" name="RadioGroup"><RadioGroup options={dataSource} /></FormItem>
                <FormItem label="Slider" name="Slider"><Slider /></FormItem>
                <FormItem label="Rate" name="Rate"><Rate /></FormItem>
                <FormItem label="RangePicker" name="RangePicker"><RangePicker placeholder={["start","end"]} showTime format="YYYY-MM-DD HH:mm:ss" /></FormItem>

                <FormItem label="MMRangePicker" name="MMRangePicker"><RangePicker
                    format="YYYY-MM"
                    placeholder={["start","end"]}
                    mode={['month', 'month']}
                /></FormItem>
                <FormItem label="DatePicker" name="DatePicker"><DatePicker placeholder="abcdefg" /></FormItem>
                <FormItem label="TimePicker" name="TimePicker"><TimePicker placeholder="abcdefg"/></FormItem>
                <FormItem defaultValue={1000} label="InputNumber" name="InputNumber">
                    <InputNumber
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder="abcdefg"
                    />
                </FormItem>
                <FormItem label="Cascader" name="Cascader"><Cascader options={dataSource} placeholder="abcdefg"/></FormItem>
                <FormItem label="TreeSelect" name="TreeSelect"><TreeSelect treeData={treeData} placeholder="abcdefg"/></FormItem>
                <FormItem label="Upload" name="Upload" value={fileList}>
                    <Upload >
                        <Button><Icon type="upload" /> Click to Upload</Button>
                      </Upload>
                </FormItem>
                <FormItem label="Hide Price" name="noPrice"><Checkbox /></FormItem>
                <Item render={(values) => {
                    const { noPrice = false } = values;

                    return <FormItem name="products" >
                        <TableRepeater>
                            <FormItem label="name" name="name"><Input /></FormItem>
                            { noPrice ? null : <FormItem label="price" name="price"><Input /></FormItem> }
                        </TableRepeater>
                    </FormItem>
                }} />

            </Form>
        );
    }
}


ReactDOM.render(<App />, mountNode);
````
