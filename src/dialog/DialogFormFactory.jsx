import React from 'react';

const noop = () => {};
const isPromise = content => Promise.resolve(content) === content;

export default class DialogFormFactory {
    constructor(props) {
        const { Dialog, Button, compatiMap } = props;
        this.Dialog = Dialog;
        this.Button = Button;
        this.compatiMap = compatiMap;
    }

    show = async (options) => {
        if (this.Dialog && this.Button) {
            const { title, className, width = 600, ...others } = options;
            let dialogInstance = null;

            // 按钮loading属性
            const btnLoadingPropsName = this.compatiMap['btnLoadingProps'] || 'loading';

            const dialogForm = new DialogForm({
                ...options,
                btnLoadingPropsName
            }, () => dialogInstance);
            const content = await dialogForm.renderContent(this.Button);

            // 入口属性
            const entryProps = this.compatiMap['show']({
                ...options,
                title,
                content
            });

            dialogInstance = this.Dialog.show({
                ...others,
                ...entryProps
            });

            dialogInstance = this.compatiMap['dialogInstance'](dialogInstance);
            return dialogInstance;
        } else {
            console.warn('DialogForm initialize failed, make sure you have passed antd components');
        }

    }
}

class ActionButton extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { btnOrigin } = props;
        this.state = {
            isLoading: false
        };

        this.Button = btnOrigin;
    }

    enableLoading = () => {
        const { onLoading } = this.props;
        onLoading && onLoading();
        this.setState({ isLoading: true });
    }
    disableLoading = () => {
        const { offLoading } = this.props;
        offLoading && offLoading();
        this.setState({ isLoading: false });
    }

    handleAction = () => {
        const { onClick } = this.props;
        if (typeof onClick === 'function') {
            this.enableLoading();
            const actionResult = onClick();
            if (isPromise(actionResult)) {
                actionResult.then(this.disableLoading, this.disableLoading).catch(this.disableLoading);
            } else {
                this.disableLoading();
            }
        }
    }

    render() {
        const Button = this.Button;
        const { onClick, btnLoadingPropsName = 'loading', btnOrigin, ...others } = this.props;
        const { isLoading } = this.state;
        const btnLoadingProps = { [btnLoadingPropsName]: isLoading };
        return <Button onClick={this.handleAction} {...others} {...btnLoadingProps} />
    }
}

class DialogForm {
    constructor(options, getDialogInstance) {
        this.options = options;
        this.dialogCore = null;
        this.getDialogInstance = getDialogInstance;
    }

    hide = () => {
        const dialogInstance = this.getDialogInstance();
        dialogInstance.hide();
    }

    handleOk = () => {
        const { onOk = noop, enableValidate } = this.options;
        let values = {};
        if (this.dialogCore) values = this.dialogCore.getValues();

        const params = [values, this.hide, this.dialogCore];
        if (enableValidate && this.dialogCore) {
            this.dialogCore.validate((err) => {
                if (!err) return onOk(...params);
                return null;
            });
        } else {
            return onOk(...params);
        }

    }

    renderFooter = (Button) => {
        const { footer, okText = 'OK', btnLoadingPropsName } = this.options;

        let footerElement = null;
        if (footer) {
            footerElement = footer(this.hide);
        } else {
            footerElement = <div key="footer" className="ant-custom-btns">
                <ActionButton btnLoadingPropsName={btnLoadingPropsName} btnOrigin={Button} type="primary" onClick={this.handleOk}>{okText}</ActionButton>
            </div>
        }

        return footerElement;
    }

    renderContent = async (Button) => {
        const { content } = this.options;

        let formInstance = null;
        if (typeof content === 'function' ) {
            formInstance = content();
        } else if (isPromise(content)) { // promise
            formInstance = await content;
        } else {
            formInstance = content;
        }

        const formInstanceProps = formInstance.props;
        const { onMount, children } = formInstanceProps;

        const hijackCore = (core) => {
            this.dialogCore = core;
            onMount && onMount(core);
        }

        const footer = this.renderFooter(Button);
        const mixFooterContent = [].concat(children, footer);
        let modalContent = React.cloneElement(formInstance, {
            ...formInstanceProps,
            onMount: hijackCore,
            children: mixFooterContent
        });

        return modalContent;
    }
}
