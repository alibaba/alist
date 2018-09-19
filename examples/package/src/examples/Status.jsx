import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { Input, Button, Select } from 'noform/lib/wrapper/antd';

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.core = new FormCore();
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    setItemStatus = (name, status) => {
        this.core.setStatus(name, status);
    }

    render() {
        return (            
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Status Examples</div>
                <FormItem label="username" name="username" value="username"><Input /></FormItem>
                <FormItem label="age" name="age" value="age"><Input /></FormItem>
                <FormItem label="gender" name="gender" value="gender"><Input /></FormItem>

                <FormItem label="Global status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="username - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="age - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="gender - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default Example;
