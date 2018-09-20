import React, { Component } from 'react';
import Form, { FormItem, FormCore, If } from 'noform';
import { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
    Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber, AutoComplete } from 'noform/lib/wrapper/antd';
import { Alert } from 'antd';

const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
const { RangePicker } = DatePicker;

const dataSource = [
    { label: 'optA', value: 'optA'},
    { label: 'optB', value: 'optB'}
];

const fileList = [
    { uid: 1, name: 'xxx.png', url: 'http://www.baidu.com/xxx.png', },
    { uid: 3, name: 'zzz.png', status: 'error', reponse: 'Server Error 500' }
];
  

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.core = new FormCore();
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    getValues = () => {
        console.log('[antd example] getValues', this.core.getValues());
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Antd Examples</div>
                <Alert style={{ marginBottom: 12 }} message={<div>
                    <div>open console.log for more details of values</div>
                </div>} type="info" showIcon />

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
                    </div>
                </FormItem>

                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="AutoComplete" name="AutoComplete"><AutoComplete options={dataSource} /></FormItem>                
                <FormItem label="TextArea" name="TextArea"><TextArea /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox >Selected</Checkbox></FormItem>
                <FormItem label="Radio" name="Radio"><Radio >Selected</Radio></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
                <FormItem label="CheckboxGroup" name="CheckboxGroup"><CheckboxGroup options={dataSource} /></FormItem>
                <FormItem label="RadioGroup" name="RadioGroup"><RadioGroup options={dataSource} /></FormItem>
                <FormItem label="Slider" name="Slider"><Slider /></FormItem>
                <FormItem label="Rate" name="Rate"><Rate /></FormItem>
                <FormItem label="RangePicker" name="RangePicker"><RangePicker showTime format="YYYY-MM-DD HH:mm:ss" /></FormItem>
                <FormItem label="DatePicker" name="DatePicker"><DatePicker /></FormItem>
                <FormItem label="时间" name="time"><DatePicker /></FormItem>
                <FormItem label="TimePicker" name="TimePicker"><TimePicker /></FormItem>
                <FormItem label="InputNumber" name="InputNumber"><InputNumber /></FormItem>
                <FormItem label="Cascader" name="Cascader"><Cascader options={dataSource} /></FormItem>
                <FormItem label="TreeSelect" name="TreeSelect"><TreeSelect treeData={dataSource} /></FormItem>
                <FormItem label="Upload" name="Upload" value={fileList}>
                    <Upload >
                        <Button><Icon type="upload" /> Click to Upload</Button>
                      </Upload>
                </FormItem>                
            </Form>
        );
    }
}

export default Example;
