import React, { Component } from 'react';
import Form, { FormItem, FormCore, If } from 'noform';
import { Input, Button, Select, Switch } from 'noform/lib/wrapper/antd';
import { Alert } from 'antd';

const validateConfig = {
    username: {type: "string", required: true},
    age: [
        {type: "number", required: true, transform(value) {
            return parseInt(value, 10)
        }},
        {validator(rule, value, callback, source, options) {
            if(value < 18){
                callback(['too young']);
            }
            callback([])
        }}
    ],
    gender: { type: "string", required: true },
    hidden: { type: "string", required: true }
}

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.core = new FormCore({ validateConfig });
        this.core.onChange = (fireKeys, values, context) => {
            if (values.demand) {
                context.validateItem(fireKeys);
            }
        }
    }

    clear = () => {
        this.core.reset();
    }

    validate = () => {
        this.core.validate((err) => {
            console.log('errors', err);
            if (!err) {

            }
        });
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Condition Examples</div>
                <Alert style={{ marginBottom: 12 }} message={<div>
                    <div>1. demand on, fields change will trigger validate execution</div>
                    <div>2. username equals bobby, hidden field will show</div>
                    <div>3. open console.log for more details</div>
                </div>} type="info" showIcon />

                <FormItem label="demand" name="demand"><Switch /></FormItem>

                <If when={(values, { globalStatus }) => {
                    return values.username == 'bobby';
                }}>
                    <FormItem label="hidden" name="hidden"><Input /></FormItem>
                </If>

                <FormItem label="username" name="username"><Input /></FormItem>                
                <FormItem label="age" name="age"><Input /></FormItem>                
                <FormItem label="opertaion">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.validate}>validate</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>clear</Button>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default Example;
