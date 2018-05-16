import DialogFormFactory from './DialogFormFactory';

const DialogFormWrapper = (NextSource) => {
    const { Dialog, Button } = NextSource;
    Dialog.show = Dialog.confirm;

    const compatiMap = {
        show: (options) => {
            const { width, className } = options;
            return {
                width,
                footer: () => null,
                className: `${className || ''} dialog-form-wrapper`,
                needWrapper: false
            }
        },
        dialogInstance: (dialogInstance) => {
            return dialogInstance;
        },
        btnLoadingProps: 'loading'
    };

    return new DialogFormFactory({
        Dialog,
        Button,
        compatiMap
    });
};

export default DialogFormWrapper;