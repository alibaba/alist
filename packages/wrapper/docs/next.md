# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import Form, { FormItem, FormCore } from 'noform';
import { Input, Select, Checkbox, Radio, Switch, Range, DatePicker, TimePicker,
    Rating, CascaderSelect, Upload, Button, NumberPicker, Dialog } from '../src/next/index';

import sp from '../src/next/index';
import { Message, Icon, Radio as NRadio } from '@alifd/next';
import './next.scss';


const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
const { RangePicker, MonthPicker, YearPicker } = DatePicker;
const { AutoComplete } = Select;

const dataSource = [
    { label: 'optA', value: 'optA'},
    { label: 'optB', value: 'optB'}
];

const boolOpts = [
    { label: '是', value: true },
    { label: '否', value: false }
];
const treeData = dataSource.map(item => ({...item, title: item.label }));

const fileList = [
    { uid: 1, name: 'xxx.png', url: 'http://www.baidu.com/xxx.png', },
    { uid: 3, name: 'zzz.png', status: 'error', reponse: 'Server Error 500' }
];
  

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        window.core = this.core = new FormCore();
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    getValues = () => {
        console.log('[next example] getValues', this.core.getValues());
    }

    resetValues = () => {
        this.core.reset();
        console.log('[next example] resetValues', this.core.getValues());
    }

    dialogForm = () => {
        const core = new FormCore({
            onChange: (firekeys, values, ctx) => {
                if (firekeys.indexOf('province' !== -1) ) {
                    ctx.setItemProps('city', { dataSource: [{ label: 'abc', value: 'abc' }] })
                }
            }
        });
        Dialog.show({
            footerAlign: 'label',
            title: <div>
                标题
                <Button>复制</Button>
            </div>,
            locale: 'zh',
            content: <Form core={core} layout={{ label: 4, control: 20 }}>
                <div className="list-dialog-hint" >您确定要取消订单吗？订单取消后，不能恢复。</div>
                {/* <FormItem label="原因选择" full>
                    <CheckboxGroup className="cancel-reason-checkbox-group" dataSource={[]} />
                </FormItem> */}
                <FormItem label="province" name="province">
                    <Select dataSource={[{ label: 'aaa', value: 'aaa' }]} />
                </FormItem>
                <FormItem label="city" name="city">
                    <Select dataSource={[]} />
                </FormItem>
            </Form>,
            onOk: async (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
                console.log('values', values);
                await sleep(1000);
                message.success('This is a message of success', 1, hide);
            }
        });
        // Dialog.show({
        //     footerAlign: 'label',
        //     title: 'dialog',
        //     locale: 'zh',
        //     content: "hello",
        //     onOk: async (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
        //         console.log('values', values);
        //         await sleep(1000);
        //         message.success('This is a message of success', 1, hide);
        //     }
        // });
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }} style={{ marginBottom: '16px' }}>
                <div className="example-title">Antd Examples</div>
                <Message style={{ marginBottom: 12 }} >
                    <div>open console.log for more details of values</div>
                </Message>

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

                <FormItem label="input" name="input"><Input placeholder="abcdefg" /></FormItem>
                <FormItem label="AutoComplete" name="AutoComplete"><AutoComplete placeholder="abcdefg" dataSource={dataSource} /></FormItem>                
                <FormItem label="TextArea" name="TextArea"><TextArea placeholder="abcdefg" /></FormItem>
                <FormItem label="select" name="select"><Select dataSource={dataSource} placeholder="abcdefg"/></FormItem>
                <FormItem label="select" name="select">
                    <Select placeholder="abcdefg">
                        <Select.Option value="M">男</Select.Option>
                    </Select>
                </FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox >Selected</Checkbox></FormItem>
                <FormItem label="Radio" name="Radio"><Radio >Selected</Radio></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
                <FormItem label="CheckboxGroup" name="CheckboxGroup"><CheckboxGroup dataSource={dataSource} /></FormItem>
                <FormItem label="RadioGroup" name="RadioGroup"><RadioGroup dataSource={boolOpts} /></FormItem>


                <FormItem name="ngo">
                    <RadioGroup dataSource={[
                        { label: 'n1', value: 1 },
                        { label: 'n0', value: 0 },
                    ]} />
                </FormItem>
                <FormItem name="ngo2">
                    <RadioGroup dataSource={[
                        { label: 's1', value: '1' },
                        { label: 's0', value: '0' },
                    ]} />
                </FormItem>
                <FormItem name="ngo3">
                    <RadioGroup dataSource={[
                        { label: 'b1', value: true },
                        { label: 'b0', value: false },
                    ]} />
                </FormItem>

                <FormItem label="RadioGroupRaw" name="RadioGroupRaw">
                    <RadioGroup>
                        {dataSource.map(item => <Radio value={item.value} >
                            {item.label}
                        </Radio>)}
                    </RadioGroup>
                </FormItem>

                <FormItem label="Range" name="Range"><Range /></FormItem>
                <FormItem label="Rating" name="Rating"><Rating /></FormItem>
                <FormItem label="RangePicker" name="RangePicker"><RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD" /></FormItem>
                <FormItem label="DatePicker" name="DatePicker"><DatePicker placeholder="abcdefg" /></FormItem>
                <FormItem label="MonthPicker" name="MonthPicker"><MonthPicker placeholder="abcdefg" /></FormItem>
                <FormItem label="YearPicker" name="YearPicker"><YearPicker placeholder="abcdefg" /></FormItem>
                <FormItem label="TimePicker" name="TimePicker"><TimePicker placeholder="abcdefg" /></FormItem>
                <FormItem label="NumberPicker" name="NumberPicker"><NumberPicker placeholder="abcdefg" /></FormItem>
                <FormItem label="CascaderSelect" name="CascaderSelect"><CascaderSelect dataSource={dataSource} placeholder="abcdefg"/></FormItem>
                <FormItem label="Upload" name="Upload" value={fileList}>
                    <Upload >
                        <Button><Icon type="upload" /> Click to Upload</Button>
                      </Upload>
                </FormItem>
            </Form>
        );
    }
}

ReactDOM.render(<App />, mountNode);
````