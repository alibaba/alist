import RepeaterCore from '../../src/repeater/repeaterCore';
import FormCore from '../../src/core/form';

const noop = () => {};
const getIdx = rp => (rp.formList.length - 1 < 0 ? 0 : rp.formList.length - 1);

describe('RepeaterCore asyncHandler', () => {
    let repeaterCore;
    const asyncHandler = {
        add: () => {},
        updateMultiple: () => {},
        updateInline: () => {},
        save: () => {},
        remove: () => {},
        update: () => {},
    };

    beforeEach(() => {
        repeaterCore = new RepeaterCore({
            asyncHandler,
        });
    });

    it('asyncHandler add(inline)', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'add');
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.addInline();
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        const idx = getIdx(repeaterCore);
        expect(fnHook.mock.calls[lastCount][0]).toEqual(repeaterCore.formList[idx].getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(idx);
    });

    it('asyncHandler add', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'add');
        const newForm = new FormCore();
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.add(newForm);
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        expect(fnHook.mock.calls[lastCount][0]).toEqual(newForm.getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(getIdx(repeaterCore));
    });

    it('asyncHandler addMultipleInline', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'add');
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.addMultipleInline();
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        const idx = getIdx(repeaterCore);
        expect(fnHook.mock.calls[lastCount][0]).toEqual(repeaterCore.formList[idx].getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(idx);
    });

    it('asyncHandler updateMultiple', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'updateMultiple');
        const lastCount = fnHook.mock.calls.length;
        const newForm = new FormCore();
        await repeaterCore.add(newForm);
        repeaterCore.updateMultiple(noop)('a', 'b', { id: newForm.id });
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        expect(fnHook.mock.calls[lastCount][0]).toEqual('b');
        expect(fnHook.mock.calls[lastCount][1]).toEqual('a');
        expect(fnHook.mock.calls[lastCount][2]).toEqual(0);
    });

    it('asyncHandler update', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'update');
        const newForm = new FormCore();
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.add(newForm);
        await repeaterCore.update(newForm, newForm.id);
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        expect(fnHook.mock.calls[lastCount][0]).toEqual(newForm.getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(0);
    });

    it('asyncHandler updateInline', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'updateInline');
        const newForm = new FormCore();
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.add(newForm);
        await repeaterCore.updateInline(newForm, newForm.id);
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        expect(fnHook.mock.calls[lastCount][0]).toEqual(newForm.getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(0);
    });

    it('asyncHandler remove', async () => {
        const fnHook = jest.spyOn(asyncHandler, 'remove');
        const newForm = new FormCore();
        const lastCount = fnHook.mock.calls.length;
        await repeaterCore.add(newForm);
        await repeaterCore.remove(newForm, newForm.id);
        expect(fnHook.mock.calls.length).toBe(lastCount + 1);
        // args match
        expect(fnHook.mock.calls[lastCount][0]).toEqual(newForm.getValues());
        expect(fnHook.mock.calls[lastCount][1]).toEqual(0);
    });
});
