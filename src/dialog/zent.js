import DialogFormFactory from './DialogFormFactory';

class CompatiMap {
    constructor(Dialog) {
        this.btnLoadingProps = 'loading';
        this.Dialog = Dialog;
    }

    getUniqueId = () => {
        const words = 'abcdefghijklmnopqrstuvwxyz';
        
        let name = '';
        for (var i = 0; i< 10; i ++) {
            const randomIdx = parseInt(Math.random()*26);
            name += words[randomIdx];
        }

        return name;
    }

    show = (options) => {
        const { className, content, footer, ...others } = options;
        const dialogId = this.getUniqueId();
        const footerElements = footer && footer(this.hide) || null;
        return {
            ...others,
            dialogId,
            children: content,
            footer: footerElements,
            className: `${className || ''} zent-dialog-form-wrapper`
        }
    }

    dialogInstance = (hide) => {
        let dialogInstance = {};
        dialogInstance.hide = hide;
        window.xhide = hide;

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
        compatiMap
    });
};

export default DialogFormWrapper;