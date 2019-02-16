import * as Antd from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Form, { FormItem, Item } from '../../src';
import repeaterWrapper from '../../src/repeater';
import wrapper from '../../src/wrapper/antd';
import dialogWrapper from '../../src/dialog/antd';

const { Radio, Checkbox } = Antd;
const { TableRepeater, Selectify } = repeaterWrapper({ ...Antd, Dialog: dialogWrapper(Antd) });
const SelectRepeater = Selectify(TableRepeater);

const { Input } = wrapper(Antd);
function filter(value, key) {
    return value.filter(item => item.drawerName.startsWith(key));
}

function sleep(timer) {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    });
}

const commonEmpty = {
    taxpayerNumber: null, branchName: null, checkResultName: null, denyReason: null, creatorName: null,
};

const testValues = {
    drawerName: '开票人',
    taxpayerNumber: '税号',
    branchName: '子公司',
    checkResultName: '核查结果',
    denyReason: '拒绝原因',
    creatorName: '创建人',
};

describe('Selectify Repeater', () => {
    let form = null;
    let formCore = null;
    function formmount(core) {
        formCore = core;
    }
    beforeEach(() => {
        form = mount(<Form onMount={formmount}>
            <Item name="repeat">
                <SelectRepeater filter={filter}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                    <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
                    <FormItem label="子公司" name="branchName"><Input /></FormItem>
                    <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
                    <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
                    <FormItem label="创建人" name="creatorName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);
    });
    it('should render', () => {
        formCore.setValue('repeat', [{}]);
    });
    it('should add', async () => {
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(testValues);
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
                <SelectRepeater filter={filter} formConfig={formConfig}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                    <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
                    <FormItem label="子公司" name="branchName"><Input /></FormItem>
                    <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
                    <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
                    <FormItem label="创建人" name="creatorName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);

        const emptyObjValues = {
            dataSource: [],
            value: [],
        };

        expect(validateCore.getValue('repeat')).toEqual(emptyObjValues);
        expect(validateForm.find('button.repeater-save').length).toEqual(0);
        expect(validateForm.find('button.repeater-cancel').length).toEqual(0);
        expect(document.querySelectorAll('.ant-modal-body .ant-btn').length).toEqual(0);
        validateForm.find('button.repeater-add').simulate('click');
        await sleep(500);
        validateForm.mount();
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);
        await sleep(500);
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content span.no-form-item-error').length).toEqual(1);
        expect(validateCore.getValue('repeat')).toEqual(emptyObjValues);
        ReactTestUtils.Simulate.change(document.querySelectorAll('.ant-modal-body input[name="drawerName"]')[0], {
            target: {
                value: 'hello world',
            },
        });
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);

        await sleep(500);
        expect(validateCore.getValue('repeat').dataSource.length).toEqual(1);
    });

    it('should update', async () => {
        const objValues = {
            dataSource: [testValues],
            value: [],
        };
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(testValues);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify(objValues));

        const core = form.find(TableRepeater).find('InnerRepeater').instance().repeaterCore.formList[0];
        core.setValueSilent({
            ...testValues,
            drawerName: 'xxxxx',
        });
        await form.find(TableRepeater).find('InnerRepeater').instance().doUpdate(core, core.id);

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [{
                ...testValues,
                drawerName: 'xxxxx',
            }],
            value: [],
        }));
    });
    it('should delete', async () => {
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(testValues);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [testValues],
            value: [],
        }));

        const core = form.find(TableRepeater).find('InnerRepeater').instance().repeaterCore.formList[0];
        const { id } = core;
        await form.find(TableRepeater).find('InnerRepeater').instance().doDelete(core, id);
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);
        form.mount();
        await sleep(500);

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [],
            value: [],
        }));
    });
    it('should add by click add button', async () => {
        form.mount();
        expect(formCore.getValue('repeat')).toEqual({ dataSource: [], value: [] });
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(0);
        form.find('button.repeater-add').simulate('click');
        form.mount();
        await sleep(500);
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);
        form.mount();
        await sleep(500);
        expect(formCore.getValue('repeat').dataSource.length).toEqual(1);
    });

    it('should update by click update', async () => {
        form.mount();
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(testValues);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [testValues],
            value: [],
        }));
        expect(formCore.getValue('repeat').dataSource.length).toEqual(1);
        expect(document.querySelectorAll('.ant-modal-body .ant-btn').length).toEqual(0);
        form.mount();
        await sleep(500);
        form.find('button.repeater-update').simulate('click');
        form.mount();
        await sleep(500);
        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.change(document.querySelectorAll('.ant-modal-body input[name="drawerName"]')[0], {
            target: {
                value: 'hello world',
            },
        });
        form.mount();
        await sleep(500);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);
        form.mount();
        await sleep(500);
        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: [{
                ...testValues,
                drawerName: 'hello world',
            }],
            value: [],
        }));
    });

    it('should delete by click delete', async () => {
        form.mount();
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });
        form.mount();
        await sleep(500);
        form.find('.repeater-delete').simulate('click');
        await sleep(500);
        form.mount();

        expect(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn').length).toEqual(2);
        ReactTestUtils.Simulate.click(document.querySelectorAll('.ant-modal-body .ant-modal-confirm-content .ant-btn')[0]);
        form.mount();
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
                <SelectRepeater selectMode="multiple" filter={filter}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                    <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
                    <FormItem label="子公司" name="branchName"><Input /></FormItem>
                    <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
                    <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
                    <FormItem label="创建人" name="creatorName"><Input /></FormItem>
                </SelectRepeater>
            </Item>
        </Form>);

        const valuesArr = [
            { drawerName: '开票人', id: 0, ...commonEmpty },
            { drawerName: '客户', id: 1, ...commonEmpty },
            { drawerName: '拍档', id: 2, ...commonEmpty },
            { drawerName: '销售', id: 3, ...commonEmpty },
        ];

        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
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
            { drawerName: '开票人', ...commonEmpty },
            { drawerName: '客户', ...commonEmpty },
            { drawerName: '拍档', ...commonEmpty },
            { drawerName: '销售', ...commonEmpty },
        ];

        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
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
            { drawerName: '开票人', ...commonEmpty },
            { drawerName: '客户', ...commonEmpty },
            { drawerName: '拍档', ...commonEmpty },
            { drawerName: '销售', ...commonEmpty },
        ];

        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[0]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[1]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[2]);
        await form.find(TableRepeater).find('InnerRepeater').instance().doAdd(valuesArr[3]);
        form.mount();

        expect(JSON.stringify(formCore.getValue('repeat'))).toEqual(JSON.stringify({
            dataSource: valuesArr,
            value: [],
        }));
        expect(form.find('Input.repeater-search').length).toEqual(1);
        expect(form.find('tr.table-repeater-row').length).toEqual(4);
        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: 'hello world' },
        });
        await sleep(500);
        form.mount();
        expect(form.find('tr.table-repeater-row').length).toEqual(0);

        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: '客户' },
        });
        await sleep(500);
        form.mount();

        expect(form.find('tr.table-repeater-row').length).toEqual(1);
        expect(form.find('tr.table-repeater-row .repeater-table-cell-wrapper').at(0).find(Radio).length).toEqual(1);
        expect(form.find(Form).children('.table-repeater-row').find('.repeater-table-cell-wrapper').at(1).find('.no-form-item-content-elem').render().text()).toEqual('客户');

        ReactTestUtils.Simulate.change(form.find('Input.repeater-search').getDOMNode(), {
            target: { value: '' },
        });
        await sleep(500);
        form.mount();
        expect(form.find('tr.table-repeater-row').length).toEqual(4);
    });
});
