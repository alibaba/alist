import DialogFormFactory from './DialogFormFactory';

class CompatiMap {
    constructor(Dialog) {
        this.btnLoadingProps = 'loading';
        this.Dialog = Dialog;
    }

    getUniqueId = () => Math.random().toString(36).slice(2)

    show = (options) => {
        const {
            className, content, footer, ...others
        } = options;
        const dialogId = this.getUniqueId();
        let footerElements = null;
        if (footer) {
            footerElements = footer(this.hide);
        }
        return {
            ...others,
            dialogId,
            children: content,
            footer: footerElements,
            className: `${className || ''} zent-dialog-form-wrapper`,
        };
    }

    dialogInstance = (hide) => {
        const dialogInstance = {};
        dialogInstance.hide = hide;

        return dialogInstance;
    }
}

const DialogFormWrapper = (ZentSource) => {
    const { Dialog, Button } = ZentSource;
    Dialog.show = Dialog.openDialog;

    const compatiMap = new CompatiMap(Dialog);

    return new DialogFormFactory({
        Dialog,
        Button,
        compatiMap,
    });
};

export default DialogFormWrapper;
