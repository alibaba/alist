import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { Input, Radio, Button } from 'noform/lib/wrapper/antd';
import { TableRepeater, InlineRepeater } from 'noform/lib/repeater/antd';

const { Group: RadioGroup } = Radio;

const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

function filter(value, key) {
    return value.filter(item => item.drawerName.startsWith(key));
}

const validateConfig = {
    username: { type: 'string', required: true },
};

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.core = new FormCore();
    }

    getValues = () => {

    }

    render() {
        const inlineStyle = { style: { width: '100px', minWidth: '100px' } };
        return (
            // <div />
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Repeater Examples(BETA version)</div>
                <FormItem label="repeater" name="repeater">
                    <TableRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </TableRepeater>
                </FormItem>

                <FormItem label="inlineRepeater" name="inlineRepeater">
                    <InlineRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </InlineRepeater>
                </FormItem>

                <FormItem label="">
                    <Button onClick={this.getValues}>getValues</Button>
                </FormItem>

            </Form>
        );
    }
}

export default Example;
