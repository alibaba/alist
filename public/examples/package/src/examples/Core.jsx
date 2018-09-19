import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { Select, Button } from 'noform/lib/wrapper/antd';

const dataSource = [
    { label: 'optA', value: 'optA' },
    { label: 'optB', value: 'optB' },
];

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.core = new FormCore();
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    setValues = () => {
        const value = this.core.getValue('select');
        this.core.setValue('select', value === 'optA' ? 'optB' : 'optA');
    }

    setProps = (type) => {
        const lastVal = this.core.getProps('select')[type];
        let nextVal = {};
        switch (type) {
        case 'prefix':
        case 'suffix':
        case 'top':
        case 'help':
            nextVal = lastVal ? { [type]: null } : { [type]: `[${type}]` };
            break;
        case 'options':
            nextVal = (!!lastVal && lastVal.length > 1 || !lastVal) ? { [type]: [...dataSource.slice(1)] } : { [type]: dataSource };
            break;
        default: break;
        }

        this.core.setProps('select', nextVal);
    }

    render() {
        return (            
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Core Examples</div>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="change status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>

                <FormItem label="change values" full={false}>
                    <Button style={{ marginRight: 12 }} onClick={this.setValues}>setValues</Button>
                </FormItem>

                <FormItem label="change props">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'prefix')}>prefix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'suffix')}>suffix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'top')}>top</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'help')}>help</Button>
                    </div>
                </FormItem>

                <FormItem label="change dataSource" full={false}>
                    <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'options')}>change options</Button>
                </FormItem>

            </Form>
        );
    }
}

export default Example;
