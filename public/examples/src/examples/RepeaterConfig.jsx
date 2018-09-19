import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { InputNumber, Input, Radio, Button, Checkbox } from 'noform/lib/wrapper/antd';
import { TableRepeater, InlineRepeater, Selectify } from 'noform/lib/repeater/antd';
import LoadingButton from './LoadingButton';

const SelectInlineRepeater = Selectify(InlineRepeater);
const { Group: RadioGroup } = Radio;

const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

function filter(value, key) {
    return value.filter(item => (item.username && item.username.startsWith(key)));
}

const validateConfig = {
    username: { type: 'string', required: true },
};

const repeatValues = [
    { username: 'lily', gender: 'female', id: 'lily' },
    { username: 'bobby', gender: 'male', id: 'bobby' }
];

const handleNull = (val) => val ? val : undefined;

const dialogConfigMap = {
    add: (core, type, props) => {
        const customProps = { title: 'Add Custom' };
        return customProps;
    },
    update: (core, type, props) => {
        const customProps = {};
        customProps.title = 'Update Custom';
        customProps.content = (<Form core={core} full layout={{label: 8, control: 16}}>
            <div>custom update</div>
        </Form>);
        return customProps;
    },
    delete: (core, type, props) => {
        const { onOk } = props;
        const customProps = { title: 'Delete Custom' };
        customProps.footer = (hide) => {
            const bindOk = onOk.bind(null, null, hide);
            return <Button
                style={{ marginLeft: '12px', minWidth: '100px', width: '100px'}} type="primary"
                onClick={bindOk}>I am sure</Button>;
        };
        return customProps;
    }
};

const getDialogConfig = (values) => {
    const addDialogConfig = values.addDialog ? dialogConfigMap.add : undefined;
    const updateDialogConfig = values.updateDialog ? dialogConfigMap.update : undefined;
    const deleteDialogConfig = values.deleteDialog ? dialogConfigMap.delete : undefined;

    const dialogConfig = {
        custom: (core, type, props) => {                        
            const commonProps = { className: 'custom-dialog-wrapper' };
            let mixProps = props || {};
            if (type === 'update') {
                if (updateDialogConfig) mixProps = updateDialogConfig(core, type, props);
            } else if (type === 'add') { // remove
                if (addDialogConfig) mixProps = addDialogConfig(core, type, props);
            } else if (type === 'remove') {
                if (deleteDialogConfig) mixProps = deleteDialogConfig(core, type, props);
            }
            return {
                ...commonProps,
                ...mixProps
            };
        }
    };

    return dialogConfig;
}

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.core = new FormCore({
            values: {
                tableRepeater: repeatValues,
                inlineRepeater: repeatValues,
                inlineRepeaterMultiple: repeatValues,
                selectInlineRepeaterMultiple2: {
                    value: [repeatValues[0], repeatValues[1]],
                    dataSource: repeatValues,
                }
            },
            onChange: (fireKeys, values, ctx) => {
                const vprops = {
                    addText: handleNull(values.addText),
                    updateText: handleNull(values.updateText),
                    saveText: handleNull(values.saveText),
                    cancelText: handleNull(values.cancelText),
                    deleteText: handleNull(values.deleteText),
                    operateText: handleNull(values.operateText),
                    hasDeleteConfirm: values.hasDeleteConfirm,
                    hasAdd: values.hasAdd,
                    maxLength: [0, null, undefined].indexOf(values.maxLength) !== -1 ? undefined : values.maxLength, 
                    hasUpdate: values.hasUpdate,
                    hasDelete: values.hasDelete,
                    hasHeader: values.hasHeader,
                    itemAlign: values.itemAlign,
                    addPosition: handleNull(values.addPosition),
                    filter: values.enableFilter ? filter : undefined,
                };

                vprops.dialogConfig = getDialogConfig(values);

                ctx.setProps({
                    tableRepeater: vprops,
                    inlineRepeater: vprops,
                    inlineRepeaterMultiple: vprops,
                    selectInlineRepeaterMultiple2: vprops,
                });
            }
        });

        window.core = this.core;

        this.formConfig = {
            validateConfig,
            autoValidate: true
        };
        this.asyncHandler = {
            add: (values) => {
                return ({
                    success: true,
                    item: {
                        ...values,
                        id: 'add' + Math.random().toString(36).slice(2)
                    }
                });
            }
        };
    }

    renderConfig = () => {
        const inlineLayout = { layout: { label: 8, control: 16 }, style: { width: 260, marginBottom: 12 } };
        const shortInlineLayout = { layout: { label: 20, control: 4 }, style: { width: 150, marginBottom: 12 } };
        return <div>
            <FormItem label="enableFilter" name="enableFilter" defaultValue={false} ><Checkbox /></FormItem>            
            
            <FormItem label="addPosition" name="addPosition" defaultValue="top"><RadioGroup options={[
                { label: 'top', value: 'top' },
                { label: 'bottom', value: 'bottom' }
            ]} /></FormItem>
            <FormItem label="itemAlign" name="itemAlign" defaultValue="left"><RadioGroup options={[
                { label: 'left', value: 'left' },
                { label: 'center', value: 'center' },
                { label: 'right', value: 'right' }
            ]} /></FormItem>
            <FormItem label="maxLength" name="maxLength"><InputNumber /></FormItem>

            <FormItem label="text">
                <div>
                    <FormItem {...inlineLayout} inline label="addText" defaultValue="add" name="addText"><Input /></FormItem>
                    <FormItem {...inlineLayout} inline label="updateText" defaultValue="update" name="updateText"><Input /></FormItem>
                    <FormItem {...inlineLayout} inline label="saveText" defaultValue="save" name="saveText"><Input /></FormItem>
                    <FormItem {...inlineLayout} inline label="cancelText" defaultValue="cancel" name="cancelText"><Input /></FormItem>
                    <FormItem {...inlineLayout} inline label="deleteText" defaultValue="delete" name="deleteText"><Input /></FormItem>
                    <FormItem {...inlineLayout} inline label="operateText" defaultValue="operate" name="operateText"><Input /></FormItem>
                </div>
            </FormItem>

            <FormItem label="has">
                <div>
                    <FormItem {...shortInlineLayout} inline label="hasAdd" defaultValue={true} name="hasAdd"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="hasUpdate" defaultValue={true} name="hasUpdate"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="hasDelete" defaultValue={true} name="hasDelete"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="hasHeader" defaultValue={true} name="hasHeader"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="hasDeleteConfirm" name="hasDeleteConfirm" defaultValue={true} ><Checkbox /></FormItem>
                </div>
            </FormItem>

            <FormItem label="dialog">
                <div>
                    <FormItem {...shortInlineLayout} inline label="add" name="addDialog"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="update" name="updateDialog"><Checkbox /></FormItem>
                    <FormItem {...shortInlineLayout} inline label="delete" name="deleteDialog"><Checkbox /></FormItem>
                </div>
            </FormItem>
        </div>
    }

    render() {
        return (<Form core={this.core} layout={{ label: 6, control: 18 }} defaultMinWidth={false}>
            {this.renderConfig()}
            <div className="app-wrapper-2">
                <div className="example-item-wrapper">
                    <div className="example-title">Common Repeater Examples</div>

                    <FormItem label="InlineRepeater(multiple)" name="inlineRepeaterMultiple">
                        <InlineRepeater multiple formConfig={this.formConfig}>
                            <FormItem label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
                            <FormItem label="gender" name="gender"><RadioGroup style={{ width: 200 }} options={dataSource} /></FormItem>
                        </InlineRepeater>
                    </FormItem>

                    <FormItem label="InlineRepeater" name="inlineRepeater">
                        <InlineRepeater formConfig={this.formConfig}>
                            <FormItem label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
                            <FormItem label="gender" name="gender"><RadioGroup style={{ width: 200 }} options={dataSource} /></FormItem>
                        </InlineRepeater>
                    </FormItem>
                </div>

                <div className="example-item-wrapper">
                    <div className="example-title">Selectify Repeater Examples</div>

                    <FormItem label="InlineRepeater(multiple2x)" name="selectInlineRepeaterMultiple2">
                        <SelectInlineRepeater selectMode="multiple" asyncHandler={this.asyncHandler} multiple formConfig={this.formConfig}>
                            <FormItem label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
                            <FormItem label="gender" name="gender"><RadioGroup style={{ width: 200 }} options={dataSource} /></FormItem>
                        </SelectInlineRepeater>
                    </FormItem>

                    <div className="example-title">Dialog Repeater Examples</div>

                    <FormItem label="TableRepeaer" name="tableRepeater">
                        <TableRepeater formConfig={this.formConfig}>
                            <FormItem label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
                            <FormItem label="gender" name="gender"><RadioGroup style={{ width: 200 }} options={dataSource} /></FormItem>
                        </TableRepeater>
                    </FormItem>
                </div>
            </div>
        </Form>);
    }
}

export default Example;
