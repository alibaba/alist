import sinon from 'sinon';
import { FormCore } from '../../src';
import { BASIC_EVENT, CHANGE, ANY_CHANGE } from '../../src/static';

// status: edit, preview, hidden

describe('core/form basic function', () => {
    let core;

    beforeEach(() => {
        core = new FormCore();
    });

    it('constructor values', () => {
        const values = { x: 1 };
        const valuesCore = new FormCore({ values });
        expect(valuesCore.getValues()).toEqual(values);
        expect(valuesCore.getValues()).toEqual(values);
        expect(valuesCore.getItemValue('x')).toEqual(values.x);
        expect(valuesCore.getValue('x')).toEqual(values.x);
        valuesCore.setValue('x', 2);
        expect(valuesCore.getValues()).toEqual({ x: 2 });
        expect(valuesCore.getValue('x')).toEqual(2);
    });

    it('constructor initValues', () => {
        const values = { x: 1 };
        const valuesCore = new FormCore({ initValues: values });
        expect(valuesCore.getValues()).toEqual(values);
        expect(valuesCore.getValues()).toEqual(values);
        expect(valuesCore.getItemValue('x')).toEqual(values.x);
        expect(valuesCore.getValue('x')).toEqual(values.x);
        valuesCore.setValue('x', 2);
        expect(valuesCore.getValues()).toEqual({ x: 2 });
        expect(valuesCore.getValue('x')).toEqual(2);
    });

    it('initValues and reset', () => {
        const values = { x: 1 };
        const valuesCore = new FormCore({ initValues: values });
        valuesCore.setValues({
            x: 123,
            y: 456
        });
        expect(valuesCore.getItemValue('x')).toEqual(123);
        expect(valuesCore.getItemValue('y')).toEqual(456);
        valuesCore.reset();
        expect(valuesCore.getItemValue('x')).toEqual(1);
        expect(valuesCore.getItemValue('y')).toEqual(null);
    });

    it('constructor status', () => {
        const status = { x: 'preview' };
        const statusCore = new FormCore({ status });
        expect(statusCore.getStatus()).toEqual(status);
        expect(statusCore.getStatus('x')).toEqual(status.x);
        statusCore.setStatus('x', 'edit');
        expect(statusCore.getStatus()).toEqual({ x: 'edit' });
        expect(statusCore.getStatus('x')).toEqual('edit');
    });

    it('constructor globalStatus', () => {
        const status = { x: 'preview' };
        const globalStatus = 'preview';
        const statusCore = new FormCore({ globalStatus });
        statusCore.addField({ name: 'x' });
        expect(statusCore.getStatus()).toEqual(status);
        expect(statusCore.getStatus('x')).toEqual(status.x);
        statusCore.setStatus('x', 'edit');
        expect(statusCore.getStatus()).toEqual({ x: 'edit' });
        expect(statusCore.getStatus('x')).toEqual('edit');
    });

    it('constructor onChange', () => {
        const handler = sinon.spy();
        const changeCore = new FormCore({ onChange: handler });
        changeCore.addField({ name: 'x' });
        const value = { x: 1 };
        changeCore.setValue(value);

        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith(['x'], value)).toEqual(true);
    });

    it('constructor interceptor', () => {
        const handler = sinon.spy();
        const interceptor = {
            x: val => val + 1,
        };
        const changeCore = new FormCore({ onChange: handler, interceptor });
        changeCore.addField({ name: 'x' });
        const value = { x: 1 };
        changeCore.setValue(value);

        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith(['x'], {
            x: 2,
        })).toEqual(true);
    });

    it('setValue & getValue', () => {
        core.addField({ name: 'x' });

        const value = { x: 1 };
        core.setValue(value);
        expect(core.getValue()).toEqual(value);
        expect(core.getItemValue('x')).toEqual(value.x);
        core.setItemValue('x', 2);
        expect(core.getValue()).toEqual({ x: 2 });
        expect(core.getItemValue('x')).toEqual(2);
    });
    it('setValueSilent & getValue', () => {
        core.addField({ name: 'x' });

        const value = { x: 1 };
        core.setValueSilent(value);
        expect(core.getValue()).toEqual(value);
        expect(core.getItemValue('x')).toEqual(value.x);
        core.setValueSilent('x', 2);
        expect(core.getValue()).toEqual({ x: 2 });
        expect(core.getItemValue('x')).toEqual(2);
    });

    it('onChange', (done) => {
        core.addField({ name: 'x' });
        core.on(CHANGE, (value) => {
            expect(core.getValue()).toEqual({ x: 1 });
            expect(value).toEqual({ x: 1 });
            done();
        });
        core.setItemValue('x', 1);
    });

    it('setValueSilent without onChange', (done) => {
        const value = { x: 1 };
        core.on(CHANGE, () => {
            expect(true).toEqual(false);
            done();
        });
        core.setValueSilent(value);

        setTimeout(() => {
            done();
        }, 10);
    });

    it('setError & getError', async () => {
        const error = { x: 1 };
        core.addField({ name: 'x' });
        core.setError(error);
        expect(core.getError()).toEqual(error);
        expect(core.getItemError('x')).toEqual(1);
        core.setItemError('x', 2);
        expect(core.getError()).toEqual({ x: 2 });
        expect(core.getItemError('x')).toEqual(2);
    });

    it('setProps & getProps', async () => {
        const prevProps = { prefix: '$' };
        const props = { x: prevProps };
        core.addField({ name: 'x' });
        core.setProps(props); // x:1
        expect(core.getProps()).toEqual(props);
        expect(core.getItemProps('x')).toEqual(prevProps);

        const suffixProps = { suffix: 'UNIT.' };
        const mergeProps = { ...prevProps, ...suffixProps };
        core.setItemProps('x', suffixProps);
        expect(core.getProps()).toEqual({
            x: mergeProps,
        });
        expect(core.getItemProps('x')).toEqual(mergeProps);
    });

    it('on & emit', (done) => {
        const eventData = { x: 1 };
        const eventType = 'custom';
        core.on(eventType, (ed) => {
            expect(ed).toEqual(eventData);
            done();
        });
        core.emit(eventType, eventData);
    });

    it('on & removeListener', (done) => {
        const eventData = { x: 1 };
        const eventType = 'custom';
        const handler = () => {
            expect(true).toEqual(false);
            done();
        };
        core.on(eventType, handler);
        core.removeListener(eventType, handler);
        core.emit(eventType, eventData);
        setTimeout(() => {
            done();
        }, 10);
    });

    it('add field', async () => {
        const count = Math.floor(Math.random() * 100);
        const mid = Math.floor(count / 2);
        for (let i = 0; i < mid; i += 1) {
            const name = `name${i}`;
            const value = `value${i}`;
            if (i % 2 === 0) {
                core.addField([{
                    name,
                    value,
                }]);
            } else {
                core.addField({
                    name,
                    value,
                });
            }
        }
        const fields = [];
        for (let i = mid; i < count; i += 1) {
            const name = `name${i}`;
            const value = `value${i}`;
            fields.push({
                name,
                value,
            });
        }
        core.addField(fields);
        const values = await core.getValue();
        for (let i = 0; i < count; i += 1) {
            const name = `name${i}`;
            const value = `value${i}`;
            expect(values[name]).toEqual(value);
        }
    });

    it('add anonymous field with when', async () => {
        core.addField({ when: false });
        core.addField({ value: false });
        core.addField({ name: 'name' });

        expect(core.getError()).toEqual(null);
        expect(core.getProps()).toEqual({ name: {} });
        expect(core.getValue()).toEqual({ name: null });
    });
    it('set relative value', () => {
        core.addField([{ name: 'age' }]);
        core.addField({ name: 'gender', when: value => value.age > 18 });
        expect(core.getValue()).toEqual({ age: null });

        core.setValue({
            age: 19,
            gender: 'male',
        });

        expect(core.getValue()).toEqual({ age: 19, gender: 'male' });
    });

    it('add relative field', () => {
        core.addField([
            { name: 'condition', value: true },
            { name: 'whenFalse', value: 'whenFalse', when: false },
            { name: 'whenTrue', value: 'whenTrue', when: true },
            { name: 'whenFuncTrue', value: 'whenFuncTrue', when: () => true },
            { name: 'whenFuncFalse', value: 'whenFuncFalse', when: () => false },
            { name: 'whenDepCondition', value: 'whenDepCondition', when: value => !!value.condition },
        ]);

        let values;
        values = core.getValue();
        expect(values.condition).toEqual(true);
        expect('whenFalse' in values).toEqual(false);
        expect(values.whenTrue).toEqual('whenTrue');
        expect('whenFuncFalse' in values).toEqual(false);
        expect(values.whenFuncTrue).toEqual('whenFuncTrue');
        expect(values.whenDepCondition).toEqual('whenDepCondition');

        core.setValue({
            ...values,
            condition: false,
        });

        values = core.getValue();
        expect(values.condition).toEqual(false);
        expect('whenFalse' in values).toEqual(false);
        expect(values.whenTrue).toEqual('whenTrue');
        expect('whenFuncFalse' in values).toEqual(false);
        expect(values.whenFuncTrue).toEqual('whenFuncTrue');
        expect('whenDepCondition' in values).toEqual(false);
    });


    it('update relative field', () => {
        core.addField([
            { name: 'condition', value: true },
            { name: 'whenFalse', value: 'whenFalse', when: false },
            { name: 'whenTrue', value: 'whenTrue', when: true },
            { name: 'whenFuncTrue', value: 'whenFuncTrue', when: () => true },
            { name: 'whenFuncFalse', value: 'whenFuncFalse', when: () => false },
            { name: 'whenDepCondition', value: 'whenDepCondition', when: value => !!value.condition },
        ]);

        let values;
        values = core.getValue();

        expect(values.condition).toEqual(true);
        expect('whenFalse' in values).toEqual(false);
        expect(values.whenTrue).toEqual('whenTrue');
        expect('whenFuncFalse' in values).toEqual(false);
        expect(values.whenFuncTrue).toEqual('whenFuncTrue');
        expect(values.whenDepCondition).toEqual('whenDepCondition');

        core.updateField({ name: 'whenTrue', value: 'whenTrue', when: false });
        core.updateField({ name: 'whenFalse', value: 'whenFalse', when: true });
        core.updateField([
            { name: 'whenFuncTrue', value: 'whenFuncTrue', when: () => false },
            { name: 'whenFuncFalse', value: 'whenFuncFalse', when: () => true },
            { name: 'whenDepCondition', value: 'whenDepCondition', when: value => !value.condition },
        ]);

        values = core.getValue();
        expect(values.condition).toEqual(true);
        expect('whenTrue' in values).toEqual(false);
        expect('whenFalse' in values).toEqual(true);
        expect('whenFuncTrue' in values).toEqual(false);
        expect('whenFuncFalse' in values).toEqual(true);
        expect('whenDepCondition' in values).toEqual(false);


        core.setValue({
            condition: false,
        });

        values = core.getValue();

        expect(values.condition).toEqual(false);
        expect('whenTrue' in values).toEqual(false);
        expect('whenFalse' in values).toEqual(true);
        expect('whenFuncTrue' in values).toEqual(false);
        expect('whenFuncFalse' in values).toEqual(true);
        expect('whenDepCondition' in values).toEqual(true);
    });

    it('add validate field (pass)', async () => {
        core.addField([{
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    callback([]);
                },
            },
        }, {
            name: 'success',
            value: 'success',
        }]);
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
        // 调用validate之后才生成error信息
        const errors = await core.validate();

        expect(errors).toEqual(null);
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
    });

    it('validate (exclude status is hidden)', async () => {
        core.addField([{
            name: 'firstErr',
            value: 'firstErr',
            validateConfig: {
                validator: (rule, value, callback) => {
                    callback(['firstErr']);
                },
            },
        }, {
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    callback(['hasError']);
                },
            },
        }, {
            name: 'thirdError',
            value: 'thirdError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    callback(['thirdError']);
                },
            },
        }, {
            name: 'success',
            value: 'success',
        }]);
        expect(core.getItemError('firstErr')).toEqual(null);
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('thirdError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
        // 调用validate之后才生成error信息
        let errors = await core.validate();
        expect(core.getItemError('firstErr')).toEqual('firstErr');
        expect(core.getItemError('hasError')).toEqual('hasError');
        expect(core.getItemError('thirdError')).toEqual('thirdError');
        expect(core.getItemError('success')).toEqual(null);
        core.setItemStatus('hasError', 'hidden');
        errors = await core.validate();
        expect(core.getItemError('firstErr')).toEqual('firstErr');
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('thirdError')).toEqual('thirdError');
        expect(errors).toEqual({
            firstErr: 'firstErr',
            thirdError: 'thirdError',
        });
    });

    it('dynamic validate normal', async () => {
        core.addField([{
            name: 'hasError',
            value: 'abcd',
        }, {
            name: 'success',
            value: 'efgh',
        }]);

        core.setValidateConfig({
            hasError: values => [
                {
                    validator: (rule, value, callback) => {
                        const { hasError } = values;
                        const errors = [`hasError${hasError}`];
                        callback(errors);
                    },
                },
            ],
            success: () => [
                {
                    validator: (rule, value, callback) => {
                        const errors = [];
                        callback(errors);
                    },
                },
            ],
        });

        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
        // 调用validate之后才生成error信息
        const errors = await core.validate();
        expect(errors).toEqual({ hasError: 'hasErrorabcd' });
        expect(core.getItemError('hasError')).toEqual('hasErrorabcd');
        expect(core.getItemError('success')).toEqual(null);
    });

    it('add validate field (prosmise)', async () => {
        core.addField([{
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = ['hasError'];
                    callback(errors);
                },
            },
        }, {
            name: 'success',
            value: 'success',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = [];
                    callback(errors);
                },
            },
        }]);
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
        // 调用validate之后才生成error信息
        const errors = await core.validate();
        expect(errors).toEqual({ hasError: 'hasError' });
        expect(core.getItemError('hasError')).toEqual('hasError');
        expect(core.getItemError('success')).toEqual(null);
    });

    it('add validate field (callback)', (done) => {
        core.addField([{
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = ['hasError'];
                    callback(errors);
                },
            },
        }, {
            name: 'success',
            value: 'success',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = [];
                    callback(errors);
                },
            },
        }]);
        expect(core.getItemError('hasError')).toEqual(null);
        expect(core.getItemError('success')).toEqual(null);
        // 调用validate之后才生成error信息
        core.validate((errors) => {
            expect(errors).toEqual({ hasError: 'hasError' });
            expect(core.getItemError('hasError')).toEqual('hasError');
            expect(core.getItemError('success')).toEqual(null);
            done();
        });
    });

    it('add async validate field', (done) => {
        core.addField([{
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = ['hasError'];
                    setTimeout(() => {
                        callback(errors);
                    }, 20);
                },
            },
        }, {
            name: 'success',
            value: 'success',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = [];
                    callback(errors);
                },
            },
        }]);
        core.validate((errors) => {
            expect(errors).toEqual({ hasError: 'hasError' });
            done();
        });
    });

    it('update validate field', (done) => {
        core.addField([{
            name: 'hasError',
            value: 'hasError',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = ['hasError'];
                    callback(errors);
                },
            },
        }, {
            name: 'success',
            value: 'success',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = [];
                    callback(errors);
                },
            },
        }]);
        core.setValidateConfig({
            hasError: {
                validator: (rule, value, callback) => {
                    const errors = [];
                    callback(errors);
                },
            },
            success: {
                validator: (rule, value, callback) => {
                    const errors = ['successHasError'];
                    callback(errors);
                },
            },
        });
        core.validate((errors) => {
            expect(errors).toEqual({ success: 'successHasError' });
            done();
        });
    });

    it('have initial status', () => {
        const name = 'name';
        const value = 'values';
        core.addField([{ name, value }]);

        expect(core.getItemStatus(name)).toEqual('edit');
    });

    it('change status', () => {
        const name = 'name';
        const value = 'values';
        core.addField([{ name, value }]);

        expect(core.getItemStatus(name)).toEqual('edit');
        core.setGlobalStatus('preview');
        expect(core.getItemStatus(name)).toEqual('preview');
    });

    it('change specific field status', () => {
        core.addField([
            { name: 'name', value: 'bojoy' },
            { name: 'gender', value: 'male' },
        ]);

        expect(core.getGlobalStatus()).toEqual('edit');
        expect(core.getItemStatus('name')).toEqual('edit');
        expect(core.getItemStatus('gender')).toEqual('edit');
        core.setItemStatus('name', 'preview');
        expect(core.getGlobalStatus()).toEqual('edit');
        expect(core.getItemStatus('name')).toEqual('preview');
        expect(core.getItemStatus('gender')).toEqual('edit');
    });

    it('initial status with default status', () => {
        const condition = false;
        core.addField([
            { name: 'condition', value: condition },
            { name: 'whenFalse', value: 'whenFalse', when: value => !!value.condition },
        ]);

        expect(core.getGlobalStatus()).toEqual('edit');
        expect(core.getItemStatus('condition')).toEqual('edit');
        // whenFalse hide
        expect(core.getItemStatus('whenFalse')).toEqual('hidden');
        core.setValue({
            condition: true,
        });
        // whenFalse show
        expect(core.getItemStatus('whenFalse')).toEqual('edit');
    });

    it('initial status with changed status', () => {
        const condition = false;
        core.addField([
            { name: 'condition', value: condition },
            { name: 'whenFalse', value: 'whenFalse', when: value => !!value.condition },
        ]);

        expect(core.getGlobalStatus()).toEqual('edit');
        expect(core.getItemStatus('condition')).toEqual('edit');
        // whenFalse hide
        expect(core.getItemStatus('whenFalse')).toEqual('hidden');

        core.setGlobalStatus('preview');
        core.setValue({ condition: true });
        expect(core.getGlobalStatus()).toEqual('preview');
        expect(core.getItemStatus('condition')).toEqual('preview');
        // whenFalse show
        expect(core.getItemStatus('whenFalse')).toEqual('preview');
    });

    it('props function', () => {
        core.addField([{
            name: 'username',
        }, {
            name: 'password',
            func_props: (props, form) => {
                const username = form.getItemValue('username');
                if (username === 'bojoy') {
                    return {
                        label: 'pass',
                        prefix: 'word',
                    };
                }
                return {};
            },
        }]);
        expect(core.getItemProps('password')).toEqual({});
        core.setValue({
            username: 'bojoy',
        });
        expect(core.getItemProps('password')).toEqual({
            label: 'pass',
            prefix: 'word',
        });
        core.setItemValue('username', 'username');
        expect(core.getItemProps('password')).toEqual({});
    });
});

describe('core/form nested', () => {
    let form;
    let fullname;
    beforeEach(() => {
        fullname = new FormCore('fullname');
        form = new FormCore('form');
        fullname.addField([
            { name: 'firstname' },
            { name: 'lastname' },
        ]);

        form.addField({ name: 'fullname', error: '', status: 'edit' });
        form.addField({
            name: 'age', value: 16, error: '', status: 'edit',
        });
        form.addField({
            name: 'gender',
            when: value => value.age > 18,
            value: 'male',
            error: 'has error',
            status: 'preview',
            props: {
                className: 'noneClass',
            },
        });

        fullname.on(CHANGE, (value) => {
            form.setItemValue('fullname', value);
        });

        form.on(ANY_CHANGE, (type, name, value) => {
            if (name === 'fullname') {
                if (type === 'value') {
                    return fullname.setValueSilent(value);
                }
                fullname.set(type, value);
            }
        });
    });

    it('basic', () => {
        expect(form.getValue()).toEqual({
            age: 16,
            fullname: null,
        });
    });

    it('form set value', () => {
        form.setValue({
            age: 19,
            fullname: {
                firstname: 'bojoy',
                lastname: 'zhou',
            },
        });

        expect(form.getValue()).toEqual({
            age: 19,
            fullname: {
                firstname: 'bojoy',
                lastname: 'zhou',
            },
            gender: 'male', // merge模式
        });

        expect(fullname.getValue()).toEqual({
            firstname: 'bojoy',
            lastname: 'zhou',
        });
    });
    it('fullname set value（default)', () => {
        fullname.setValue({
            firstname: 'bojoyccc',
        });

        expect(form.getValue()).toEqual({
            age: 16,
            fullname: {
                firstname: 'bojoyccc',
                lastname: null,
            },
        });
    });
    it('fullname set firstname', () => {
        fullname.setItemValue('firstname', 'bojoycnnn');
        expect(form.getValue()).toEqual({
            age: 16,
            fullname: {
                firstname: 'bojoycnnn',
                lastname: null,
            },
        });
    });
    it('fullname set value(full)', () => {
        fullname.setValue({
            firstname: 'bojoyccc',
            lastname: 'zhouzzz',
        });

        expect(form.getValue()).toEqual({
            age: 16,
            fullname: {
                firstname: 'bojoyccc',
                lastname: 'zhouzzz',
            },
        });
    });
});

describe('core/form emit event', () => {
    let core;

    beforeEach(() => {
        core = new FormCore();
    });

    it('should emit set-value', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(BASIC_EVENT.value, handler);
        core.setValue({
            name: 'bojoy',
        });
        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith('name', 'bojoy')).toEqual(true);
    });
    it('should emit change', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);

        core.on(CHANGE, handler);
        core.setValue({
            name: 'bojoy',
            gender: 'male',
        });

        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith({
            name: 'bojoy',
            gender: 'male',
        })).toEqual(true);
    });

    it('should not emit change', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(CHANGE, handler);
        core.setValueSilent({
            name: 'bojoy',
            gender: 'male',
        });
        expect(handler.notCalled).toEqual(true);
        expect(core.getValue()).toEqual({
            name: 'bojoy',
            gender: 'male',
        });
    });

    it('should emit set-error', async () => {
        const handler = sinon.spy();
        core.addField([{
            name: 'name',
            validateConfig: {
                validator: (rule, value, callback) => {
                    const errors = ['hasError'];
                    callback(errors);
                },
            },
        }, {
            name: 'gender',
        }]);
        core.setValue({
            name: 'bojoy',
            gender: 'male',
        });
        core.on(BASIC_EVENT.error, handler);
        await core.validate();
        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith('name', 'hasError')).toEqual(true);
    });

    it('should emit set-props', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(BASIC_EVENT.props, handler);
        core.setProps({
            name: { helper: 'real name' },
        });
        expect(handler.called).toEqual(true);
        expect(handler.calledWith('name', {
            helper: 'real name',
        })).toEqual(true);
    });

    it('should emit set-status when status is string', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(BASIC_EVENT.status, handler);
        expect(core.getGlobalStatus()).toEqual('edit');
        core.setGlobalStatus('preview');
        expect(handler.called).toEqual(true);
        expect(handler.calledWith('name', 'preview')).toEqual(true);
        expect(handler.calledWith('gender', 'preview')).toEqual(true);
    });

    it('should emit set-status when status is object', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(BASIC_EVENT.status, handler);
        core.setStatus({ name: 'preview' });
        expect(handler.called).toEqual(true);
        expect(handler.calledWith('name', 'preview')).toEqual(true);
    });
    it('should emit set-status when set single status', () => {
        const handler = sinon.spy();
        core.addField([
            { name: 'name' },
            { name: 'gender' },
        ]);
        core.on(BASIC_EVENT.status, handler);
        core.setItemStatus('name', 'preview');
        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith('name', 'preview')).toEqual(true);
    });
});
