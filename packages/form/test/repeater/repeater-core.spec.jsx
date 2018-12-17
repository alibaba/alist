import RepeaterCore from '../../src/repeater/repeaterCore';
import FormCore from '../../src/core/form';

const noop = () => {};
const getIdx = rp => (rp.formList.length - 1 < 0 ? 0 : rp.formList.length - 1);

describe('RepeaterCore feat', () => {
    let repeaterCore;
    const initialValues = [
        { username: 'billy', age: 12 },
        { username: 'john', age: 20 },
    ];

    const validateConfig = {
        username: { type: 'string', required: true },
    };

    const formConfig = {
        validateConfig,
        autoValidate: true,
    };

    const status = 'preview';

    beforeEach(() => {
        repeaterCore = new RepeaterCore({
            value: initialValues,
            formConfig,
            status,
        });
    });

    it('initial values', async () => {
        expect(repeaterCore.formList.length).toEqual(initialValues.length);
    });

    it('initial formConfig', async () => {
        repeaterCore.formList.forEach((form) => {
            expect(form.validateConfig).toEqual(validateConfig);
            expect(form.autoValidate).toEqual(true);
            expect(form.globalStatus).toEqual(status);
        });
    });

    it('add', async () => {
        const newForm = new FormCore();
        await repeaterCore.add(newForm);
        expect(repeaterCore.formList.length).toEqual(initialValues.length + 1);
    });

    it('addInline', async () => {
        await repeaterCore.addInline();
        expect(repeaterCore.formList.length).toEqual(initialValues.length + 1);
        repeaterCore.formList.forEach((form, idx) => {
            if (idx === repeaterCore.formList.length - 1) {
                expect(form.$focus).toEqual(true);
            } else {
                expect(form.$focus).toEqual(undefined);
            }
            expect(form.$multiple).toEqual(undefined);
        });
    });

    it('addMultipleInline', async () => {
        await repeaterCore.addMultipleInline();
        expect(repeaterCore.formList.length).toEqual(initialValues.length + 1);
        repeaterCore.formList.forEach((form, idx) => {
            // TODO: before items also need to tag [focus and multiple]
            if (idx === repeaterCore.formList.length - 1) {
                expect(form.$focus).toEqual(true);
                expect(form.$multiple).toEqual(true);
            }
        });
    });

    it('remove', async () => {
        const firstOne = repeaterCore.formList.find((_, idx) => (idx === 0));
        await repeaterCore.remove(firstOne, firstOne.id);
        expect(repeaterCore.formList.length).toEqual(initialValues.length - 1);
        expect(repeaterCore.formList[0].getValues()).toEqual(initialValues[1]);
    });

    it('update', async () => {
        const firstOne = repeaterCore.formList.find((_, idx) => (idx === 0));
        firstOne.setValues({
            username: 'happy',
        });
        await repeaterCore.update(firstOne, firstOne.id);
        expect(repeaterCore.formList.length).toEqual(initialValues.length);
        expect(repeaterCore.formList[0].getValues()).toEqual({
            ...initialValues[0],
            username: 'happy',
        });
    });

    it('updateInline', async () => {
        const firstOne = repeaterCore.formList.find((_, idx) => (idx === 0));
        firstOne.setValues({
            username: 'happy',
        });
        await repeaterCore.updateInline(firstOne, firstOne.id);
        expect(repeaterCore.formList.length).toEqual(initialValues.length);
        expect(repeaterCore.formList[0].getValues()).toEqual({
            ...initialValues[0],
            username: 'happy',
        });
    });

    it('updateMultiple', async () => {
        const secondOne = repeaterCore.formList.find((_, idx) => (idx === 1));
        secondOne.setValues({
            username: 'happy',
        });

        const mockCb = {
            cb: () => {},
        };
        const fnHook = jest.spyOn(mockCb, 'cb');
        await repeaterCore.updateMultiple(fnHook)(secondOne.getValues(), ['username'], secondOne);

        expect(repeaterCore.formList.length).toEqual(initialValues.length);
        expect(repeaterCore.formList[1].getValues()).toEqual({
            ...initialValues[1],
            username: 'happy',
        });
        expect(fnHook.mock.calls.length).toBe(1);
        // args match
        expect(fnHook.mock.calls[0][0]).toEqual(1);
    });

    it('updateValue(complete)', async () => {
        const newValues = [
            { username: 'bill', age: 12 },
            { username: 'duncan', age: 21 },
        ];
        await repeaterCore.updateValue(newValues);
        const rpValues = repeaterCore.formList.map(core => core.getValues());
        expect(rpValues).toEqual(newValues);
    });

    it('updateValue(multiple update some keys)', async () => {
        const changeIndex = 1;
        const changeKeys = ['age'];
        const newValues = initialValues.map((v, idx) => {
            if (idx === changeIndex) {
                return {
                    ...v,
                    [changeKeys]: '1000',
                };
            }
            return v;
        });
        const refMap = {};
        repeaterCore.formList.forEach((form, idx) => {
            refMap[idx] = form.id;
        });
        await repeaterCore.updateValue(newValues, {
            index: changeIndex,
            changeKeys,
            type: 'update',
            multiple: true
        });
        const rpValues = repeaterCore.formList.map(core => core.getValues());
        expect(rpValues).toEqual(newValues);
        repeaterCore.formList.forEach((form, idx) => {
            expect(refMap[idx]).toEqual(form.id);
        });
    });
});
