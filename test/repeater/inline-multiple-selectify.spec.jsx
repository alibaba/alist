import * as Antd from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Form, { FormItem, Item } from '../../src';
import repeaterWrapper from '../../src/repeater';
import wrapper from '../../src/wrapper/antd';
import dialogWrapper from '../../src/dialog/antd';

const { Radio, Checkbox } = Antd;
const { InlineRepeater, Selectify } = repeaterWrapper({ ...Antd, Dialog: dialogWrapper(Antd) });
const SelectRepeater = Selectify(InlineRepeater);

const { Input } = wrapper(Antd);
function filter(value, key) {
    return value.filter(item => item.drawerName.startsWith(key));
}

function sleep(timer) {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    });
}

const testValues = {
    drawerName: '开票人',
    taxpayerNumber: '税号',
    branchName: '子公司',
    checkResultName: '核查结果',
    denyReason: '拒绝原因',
    creatorName: '创建人',
};

describe('Inline Multiple Selectify Repeater', () => {
    let form = null;
    let formCore = null;
    function formmount(core) {
        formCore = core;
    }
    beforeEach(() => {
        form = mount(<Form onMount={formmount}>
            <Item name="repeat">
                <SelectRepeater multiple filter={filter}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);
    });
    it('should render', () => {
        formCore.setValue('repeat', [{}]);
    });
    it('should add', async () => {
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(testValues);
        const objValues = {
            dataSource: [testValues],
            value: [],
        };

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify(objValues));
    });

    it('should add with validation', async () => {
        const validateConfig = {
            drawerName: { type: 'string', required: true },
        };

        const formConfig = {
            validateConfig,
            autoValidate: true,
        };

        let validateCore = null;
        function validateMount(core) {
            validateCore = core;
        }
        const validateForm = mount(<Form onMount={validateMount}>
            <Item name="repeat">
                <SelectRepeater multiple filter={filter} formConfig={formConfig}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);

        expect(validateCore.getValue('repeat').dataSource).toEqual([]);
        expect(validateForm.find('button.repeater-delete').length).toEqual(0);
        validateForm.find('button.repeater-add').simulate('click');
        await sleep(500);
        validateForm.mount();
        expect(validateForm.find('button.repeater-delete').length).toEqual(1);
        validateForm.find('button.repeater-add').simulate('click');
        await sleep(500);
        validateForm.mount();
        expect(validateCore.getValue('repeat').dataSource).toEqual([{}]);
        expect(validateForm.find('.no-form-item-error').length).toEqual(1);
        ReactTestUtils.Simulate.change(validateForm.find('.inline-repeater-focus input[name="drawerName"]').getDOMNode(), {
            target: {
                value: 'hello world',
            },
        });

        await sleep(500);
        validateForm.mount();
        ReactTestUtils.Simulate.click(validateForm.find('button.repeater-add').getDOMNode());
        await sleep(500);
        validateForm.mount();
        expect(validateForm.find('.no-form-item-error').length).toEqual(0);
        expect(validateCore.getValue('repeat').dataSource.length).toEqual(2);
    });

    it('should update', async () => {
        const objValues = {
            dataSource: [testValues],
            value: [],
        };
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(testValues);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify(objValues));

        const core = form.find(InlineRepeater).find('InnerRepeater').instance().repeaterCore.formList[0];
        core.setValueSilent({
            ...testValues,
            drawerName: 'xxxxx',
        });
        await form.find(InlineRepeater).find('InnerRepeater').instance().doUpdate(core, core.id);

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [{
                ...testValues,
                drawerName: 'xxxxx',
            }],
            value: [],
        }));
    });
    it('should delete', async () => {
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(testValues);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [testValues],
            value: [],
        }));

        const core = form.find(InlineRepeater).find('InnerRepeater').instance().repeaterCore.formList[0];
        const { id } = core;
        await form.find(InlineRepeater).find('InnerRepeater').instance().doDelete(core, id);
        expect(document.querySelectorAll('.ant-modal-body .ant-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-confirm-content .ant-btn')[0]);

        await sleep(500);

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [],
            value: [],
        }));
    });
    it('should add by click add button', async () => {
        expect(formCore.getValue('repeat')).toEqual({ dataSource: [], value: [] });
        expect(form.find('button.repeater-delete').length).toEqual(0);
        form.find('button.repeater-add').simulate('click');
        await sleep(500);
        form.mount();
        expect(form.find('button.repeater-delete').length).toEqual(1);
        expect(formCore.getValue('repeat').dataSource.length).toEqual(1);
    });

    it('should delete by click delete', async () => {
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd({ drawerName: '开票人' });
        form.mount();
        await sleep(500);
        form.find('.repeater-delete').simulate('click');
        await sleep(500);
        form.mount();

        expect(document.querySelectorAll('.ant-modal-body .ant-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-confirm-content .ant-btn')[0]);

        await sleep(500);

        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: [],
                value: [],
            },
        }));
    });

    it('select works(multiple)', async () => {
        form = mount(<Form onMount={formmount}>
            <Item name="repeat">
                <SelectRepeater multiple selectMode="multiple" filter={filter}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);

        const valuesArr = [
            { drawerName: '开票人', id: 0 },
            { drawerName: '客户', id: 1 },
            { drawerName: '拍档', id: 2 },
            { drawerName: '销售', id: 3 },
        ];

        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
        form.mount();

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: valuesArr,
            value: [],
        }));

        form.find(Checkbox).at(0).prop('onChange')(true);
        form.mount();
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: valuesArr,
                value: [valuesArr[0]],
            },
        }));

        form.find(Checkbox).at(2).prop('onChange')(true);
        form.mount();
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: valuesArr,
                value: [
                    valuesArr[0],
                    valuesArr[2],
                ],
            },
        }));

        form.find(Checkbox).at(2).prop('onChange')(false);
        form.mount();
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: valuesArr,
                value: [
                    valuesArr[0],
                ],
            },
        }));
    });

    it('select works(single)', async () => {
        const valuesArr = [
            { drawerName: '开票人' },
            { drawerName: '客户' },
            { drawerName: '拍档' },
            { drawerName: '销售' },
        ];

        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
        form.mount();

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: valuesArr,
            value: [],
        }));

        form.find(Radio).at(0).prop('onChange')(true);
        form.mount();
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: valuesArr,
                value: [valuesArr[0]],
            },
        }));

        form.find(Radio).at(2).prop('onChange')(true);
        form.mount();
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: {
                dataSource: valuesArr,
                value: [valuesArr[2]],
            },
        }));
    });

    it('filter works', async () => {
        const valuesArr = [
            { drawerName: '开票人' },
            { drawerName: '客户' },
            { drawerName: '拍档' },
            { drawerName: '销售' },
        ];

        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(InlineRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
        form.mount();

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: valuesArr,
            value: [],
        }));
        expect(form.find('Input.repeater-search').length).toEqual(1);
        expect(form.find(Form).children('.table-repeater-row').length).toEqual(4);
        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: 'hello world' },
        });
        await sleep(500);
        form.mount();
        expect(form.find(Form).children('.table-repeater-row').length).toEqual(0);

        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: '客户' },
        });
        await sleep(500);
        form.mount();

        expect(form.find(Form).children('.table-repeater-row').length).toEqual(1);
        expect(form.find(Form).children('.table-repeater-row').at(0).find(Radio).length).toEqual(1);
        expect(form.find(Form).children('.table-repeater-row').find('.repeater-table-cell-wrapper').at(1).find('.repeater-table-cell-wrapper-inner-content').prop('children')).toEqual('客户');

        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: '' },
        });
        await sleep(500);
        form.mount();
        expect(form.find(Form).children('.table-repeater-row').length).toEqual(4);
    });
});
