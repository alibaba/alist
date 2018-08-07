import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Form, { FormItem, Item, If } from '../../src';
import Acoordion from '../../src/accordion';

function Input(props) {
    let {
        value, status, error, ...othersProps
    } = props;
    if (value === null || value === undefined) {
        value = '';
    }
    if (status === 'preview') {
        return <span>{value}</span>;
    }
    return <input type="text" {...othersProps} value={value} />;
}

describe('accordion', () => {
    it('onMount', done => (<Acoordion onMount={(core) => {
        expect(typeof core.getValue).toEqual('function');
        expect(typeof core.setValue).toEqual('function');
        expect(typeof core.validate).toEqual('function');
        expect(typeof core.setCurrent).toEqual('function');
        done();
    }}
    />));

    it('defaultValue', (done) => {
        let formCore = null;
        const defaultValue = {
            step1: 'step1',
            step2: 'step2',
            step3: 'step3',
            step4: 'step4',
        };
        const acoor = (<Acoordion
            defaultValue={defaultValue}
            onMount={(core) => {
                formCore = core;
                expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify(defaultValue));
                done();
            }}
        >
            <Form>
                <Item name="stap1"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap2"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap3"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap4"><Input /></Item>
            </Form>
        </Acoordion>);
    });


    it('preview status', (done) => {
        const formCore = null;
        const defaultValue = {
            step1: 'step1',
            step2: 'step2',
            step3: 'step3',
            step4: 'step4',
        };
        const acoor = (<Acoordion
            defaultValue={defaultValue}
            status="preview"
        >
            <Form>
                <Item name="stap1"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap2"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap3"><Input /></Item>
            </Form>
            <Form>
                <Item name="stap4"><Input /></Item>
            </Form>
        </Acoordion>);
    });
});
