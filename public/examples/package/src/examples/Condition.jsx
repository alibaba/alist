import React, { Component } from 'react';
import Form, { FormItem, FormCore, If } from 'noform';
import { Input, Button, Select } from 'noform/lib/wrapper/antd';
import { Alert } from 'antd';

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.core = new FormCore();
    }

    renderEmoji = (word) => {
        return <span>{word}</span>
    }

    triggerIf = () => {
        this.core.setValue('username', 'bobby');
    }

    depIf = () => {
        this.core.setValues({
            username: 'bobby',
            age: 23
        });
    }

    finalIf = () => {
        this.core.setValues({
            username: 'bobby',
            age: 23,
            password: 'noform'
        });
    }

    clear = () => {
        this.core.reset();
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Condition Examples</div>
                <Alert style={{ marginBottom: 12 }} message={<div>
                    <div>1. username = bobby, you get <span>🤖</span></div>
                    <div>2. username = bobby and age = 23, yout get <span>👇🏼</span></div>
                    <div>2. username = bobby and age = 23, password = noform yout get <span>🌈</span></div>
                </div>} type="info" showIcon />

                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>                                

                <If when={(values, { globalStatus }) => {
                    return values.username === 'bobby';
                }}>
                    <FormItem label="" style={{ margin: '12px 0' }}>
                        <div>
                        <span>🤖</span>
                            <If when={(values, { globalStatus }) => {
                                return values.age == 23;
                            }}>
                                <div>
                                    <span>👇🏼</span>
                                    <FormItem label="password" name="password"><Input /></FormItem>
                                    <If when={(values, { globalStatus }) => {
                                        return values.password === 'noform';
                                    }}>
                                        <span>🌈</span>
                                    </If>
                                </div>
                            </If>
                        </div>
                    </FormItem>                  
                </If>

                <FormItem label="trigger">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.triggerIf}>1st</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.depIf}>2nd</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.finalIf}>3rd</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>clear</Button>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default Example;
