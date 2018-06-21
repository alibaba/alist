import DialogFormFactory from './DialogFormFactory';

const DialogFormWrapper = (AntdSource) => {
    const { Modal, Button } = AntdSource;
    Modal.show = Modal.confirm;

    const compatiMap = {
        show: (options) => {
            const { className, ...others } = options;
            return {
                ...others,
                className: `${className || ''} dialog-form-wrapper`,
                iconType: true,
            };
        },
        dialogInstance: (dialogInstance) => {
            dialogInstance.hide = dialogInstance.destroy;
            return dialogInstance;
        },
        btnLoadingProps: 'loading',
    };

    return new DialogFormFactory({
        Dialog: Modal,
        Button,
        compatiMap,
    });
};

export default DialogFormWrapper;
