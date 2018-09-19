import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { InputNumber, Input, Radio, Button, Checkbox } from 'noform/lib/wrapper/antd';

const { Group: RadioGroup } = Radio;

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { props: {} };
        this.core = new FormCore({
            onChange: (fireKeys, values, ctx) => {
                const vprops = {
                    defaultMinWidth: !!values.defaultMinWidth,
                    full: !!values.full,
                    inline: !!values.inline,
                    inset: !!values.inset,
                    colon: !!values.colon,
                };

                const { layoutControl, layoutLabel } = values;
                let layout = { label: layoutLabel, control: layoutControl };
                if (fireKeys.indexOf('layoutControl') !== -1) {
                    layout.label = 24 - (values.layoutControl || 0);
                    layout.control = values.layoutControl || 0;
                } else if (fireKeys.indexOf('layoutLabel') !== -1) {                    
                    layout.label = values.layoutLabel || 0;
                    layout.control = 24 - (values.layoutLabel || 0);
                }

                vprops.layout = layout;
                this.core.setValues({
                    layoutControl: layout.control,
                    layoutLabel: layout.label
                });

                this.setState({ props: vprops });
            }
        });
        window.core = this.core;
    }

    componentDidMount () {
        this.core.setValues({
            layoutLabel: 8
        });
    }

    // TODO: 
    // 1. layout不能动态变更
    // 2. name = label 会崩
    renderConfig = () => {
        const inlineLayout = { layout: { label: 18, control: 6 }, style: { width: 160, marginBottom: 12 } };
        const inlineLayout2 = { layout: { label: 12, control: 12 }, style: { width: 120, marginBottom: 12 } };
        return <div>
            <FormItem label="config">
                <div>
                    <FormItem {...inlineLayout} defaultValue={true} inline label="defaultMinWidth" name="defaultMinWidth"><Checkbox /></FormItem>
                    <FormItem {...inlineLayout} defaultValue={true} inline label="colon" name="colon"><Checkbox /></FormItem>
                    <FormItem {...inlineLayout} inline label="full" name="full"><Checkbox /></FormItem>
                    <FormItem {...inlineLayout} inline label="inline" name="inline"><Checkbox /></FormItem>
                    <FormItem {...inlineLayout} inline label="inset" name="inset"><Checkbox /></FormItem>                    
                </div>
            </FormItem>


            <FormItem label="layout">
                <div>
                    <FormItem {...inlineLayout2} inline label="label" name="layoutLabel" ><InputNumber style={{ width: '60px' }}/></FormItem>
                    <FormItem {...inlineLayout2} inline label="control" name="layoutControl" ><InputNumber style={{ width: '60px' }}/></FormItem>
                </div>
            </FormItem>
        </div>
    }

    render() {
        const { props } = this.state;
        return (<div>
            <Form core={this.core} layout={{ label: 8, control: 16 }} defaultMinWidth={false}>
                {this.renderConfig()}
            </Form>
            <Form {...props} >
                <div className="app-wrapper-2">
                    <div className="example-item-wrapper">
                        <div className="example-title">Form Config Examples</div>
                        <FormItem label="username" name="username"><Input /></FormItem>
                        <FormItem label="age" name="age"><Input /></FormItem>
                    </div>
                </div>
            </Form>
        </div>);
    }
}

export default Example;
