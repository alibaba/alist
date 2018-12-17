# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import Form, { FormItem, FormCore } from 'noform';
import { Input, Select, Checkbox, Radio, Switch, Range, DatePicker, TimePicker,
    Rating, CascaderSelect, Upload, Button, NumberPicker, Dialog } from '../src/next/index';
// import { Message, Icon } from '@alifd/next';
// import './next.scss';


// const { TextArea } = Input;
// const { Group: RadioGroup } = Radio;
// const { Group: CheckboxGroup } = Checkbox;
// const { RangePicker, MonthPicker, YearPicker } = DatePicker;
// const { AutoComplete } = Select;

// const dataSource = [
//     { label: 'optA', value: 'optA'},
//     { label: 'optB', value: 'optB'}
// ];

// const treeData = dataSource.map(item => ({...item, title: item.label }));

// const fileList = [
//     { uid: 1, name: 'xxx.png', url: 'http://www.baidu.com/xxx.png', },
//     { uid: 3, name: 'zzz.png', status: 'error', reponse: 'Server Error 500' }
// ];
  

// class App extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         window.core = this.core = new FormCore();
//     }

//     setStatus = (status) => {
//         this.core.setGlobalStatus(status);
//     }

//     getValues = () => {
//         console.log('[next example] getValues', this.core.getValues());
//     }

//     resetValues = () => {
//         this.core.reset();
//         console.log('[next example] resetValues', this.core.getValues());
//     }

//     dialogForm = () => {
//         Dialog.show({
//             footerAlign: 'label',
//             title: 'dialog',
//             locale: 'zh',
//             enableValidate: true,
//             content: <Form layout={{ label: 4, control: 20 }}>
//                 <div className="list-dialog-hint" >您确定要取消订单吗？订单取消后，不能恢复。</div>
//                 <FormItem label="原因选择" full>
//                     <CheckboxGroup className="cancel-reason-checkbox-group" dataSource={[]} />
//                 </FormItem>
//                 <FormItem label="备注">
//                     <Input />
//                 </FormItem>
//             </Form>
//         });
//     }

//     full = () => {
//         const { full } = this.core.getProps();
//         this.core.setProps({ full: !full });
//     }

//     render() {
//         return (
//             <Form inset core={this.core} layout={{ label: 8, control: 16 }} style={{ width: '480px' }}>
//                 <div className="example-title">Antd Examples</div>
//                 <Message style={{ marginBottom: 12 }} >
//                     <div>open console.log for more details of values</div>
//                 </Message>

//                 <FormItem label="Global Status">
//                     <div >
//                         <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
//                         <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
//                         <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
//                     </div>
//                 </FormItem>

//                 <FormItem label="Values">
//                     <div >
//                         <Button style={{ marginRight: 12 }} onClick={this.getValues}>getValues</Button>
//                         <Button style={{ marginRight: 12 }} onClick={this.resetValues}>reset</Button>
//                         <Button style={{ marginRight: 12 }} onClick={this.full}>full</Button>
//                     </div>
//                 </FormItem>

//                 <FormItem label="Dialog">
//                     <div >
//                         <Button style={{ marginRight: 12 }} onClick={this.dialogForm}>dialog</Button>
//                     </div>
//                 </FormItem>

//                 <FormItem inline label="input" name="input"><Input placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="AutoComplete" name="AutoComplete"><AutoComplete placeholder="abcdefg" dataSource={dataSource} /></FormItem>                
//                 <FormItem inline label="TextArea" name="TextArea"><TextArea placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="select" name="select"><Select dataSource={dataSource} placeholder="abcdefg"/></FormItem>
//                 <FormItem inline label="Checkbox" name="Checkbox"><Checkbox >Selected</Checkbox></FormItem>
//                 <FormItem inline label="Radio" name="Radio"><Radio >Selected</Radio></FormItem>
//                 <FormItem inline label="Switch" name="Switch"><Switch /></FormItem>
//                 <FormItem inline label="CheckboxGroup" name="CheckboxGroup"><CheckboxGroup dataSource={dataSource} /></FormItem>
//                 <FormItem inline label="RadioGroup" name="RadioGroup"><RadioGroup dataSource={dataSource} /></FormItem>
//                 <FormItem inline label="Range" name="Range"><Range /></FormItem>
//                 <FormItem inline label="Rating" name="Rating"><Rating /></FormItem>
//                 <FormItem inline label="RangePicker" name="RangePicker"><RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD" /></FormItem>
//                 <FormItem inline label="DatePicker" name="DatePicker"><DatePicker placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="MonthPicker" name="MonthPicker"><MonthPicker placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="YearPicker" name="YearPicker"><YearPicker placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="TimePicker" name="TimePicker"><TimePicker placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="NumberPicker" name="NumberPicker"><NumberPicker placeholder="abcdefg" /></FormItem>
//                 <FormItem inline label="CascaderSelect" name="CascaderSelect"><CascaderSelect dataSource={dataSource} placeholder="abcdefg"/></FormItem>
//                 <FormItem inline label="Upload" name="Upload" value={fileList}>
//                     <Upload >
//                         <Button><Icon type="upload" /> Click to Upload</Button>
//                       </Upload>
//                 </FormItem>
//             </Form>
//         );
//     }
// }

// ReactDOM.render(<App />, mountNode);
````