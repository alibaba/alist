import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};
const isPromise = content => Promise.resolve(content) === content;


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
            return this.dialogCore.validate((err) => {
                if (!err) return onOk(...params);
                return null;
            });
        }
        return onOk(...params);
    }

    renderFooter = (Button) => {
        const { footer, okText = 'OK', cancelText = 'Cancel', btnLoadingPropsName } = this.options;

        let footerElement = null;
        if (footer) {
            footerElement = footer(this.hide);
        } else {
            footerElement = (
                <div key="footer" className="ant-custom-btns noform-dialog-custom-btns">
                    <ActionButton btnLoadingPropsName={btnLoadingPropsName} btnOrigin={Button} type="primary" onClick={this.handleOk}>{okText}</ActionButton>
                    <span style={{ marginRight: '12px' }} />
                    <ActionButton btnLoadingPropsName={btnLoadingPropsName} btnOrigin={Button} onClick={this.hide}>{cancelText}</ActionButton>
                </div>);
        }

        return footerElement;
    }

    renderContent = (Button) => {
        const { content } = this.options;

        let formInstance = null;
        const footer = this.renderFooter(Button);
        if (typeof content === 'function') {
            formInstance = content(footer);
        } else {
            formInstance = content;
        }

        const formInstanceProps = formInstance.props;
        const { onMount, children, core: propCore } = formInstanceProps;

        const hijackCore = (core) => {
            if (!propCore) {
                this.dialogCore = core;
            }

            if (onMount) {
                onMount(core);
            }
        };

        this.dialogCore = propCore;

        const mixFooterContent = [].concat(children, footer);
        const onMountProps = {};

        // 只允许本身是NoForm以及方法返回的是NoForm
        if (formInstance.displayName === 'NoForm' ||
            (formInstance.type && formInstance.type.displayName === 'NoForm')) {
            onMountProps.onMount = hijackCore;
        }
        const modalContent = React.cloneElement(formInstance, {
            ...formInstanceProps,
            ...onMountProps,
            children: mixFooterContent,
        });

        return modalContent;
    }
}

export default class DialogFormFactory {
    constructor({ Dialog, Button, compatiMap }) {
        this.Dialog = Dialog;
        this.Button = Button;
        this.compatiMap = compatiMap;
        const { show, ...others } = Dialog;
        Object.keys(others).forEach((key) => {
            this[key] = others[key];
        });
    }
    show = (options) => {
        const { Dialog, Button, compatiMap } = this;
        if (!Dialog || !Button) {
            throw Error('DialogForm initialize failed, make sure you have passed antd components');
        }
        const {
            title, className, width, ...others
        } = options;
        let dialogInstance = null;

        // 按钮loading属性
        const btnLoadingPropsName = compatiMap.btnLoadingProps || 'loading';

        const dialogForm = new DialogForm({
            ...options,
            btnLoadingPropsName,
        }, () => dialogInstance);
        const content = dialogForm.renderContent(Button);

        // 入口属性
        const entryProps = compatiMap.show({
            ...options,
            title,
            content,
        });

        dialogInstance = Dialog.show({
            ...others,
            ...entryProps,
        });

        dialogInstance = compatiMap.dialogInstance(dialogInstance);
        return dialogInstance;
    }
}

class ActionButton extends React.Component {
    static propTypes = {
        onLoading: PropTypes.func,
        offLoading: PropTypes.func,
        onClick: PropTypes.func,
        btnLoadingPropsName: PropTypes.string,
        btnOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
        };
    }

    enableLoading = () => {
        const { onLoading } = this.props;
        if (onLoading) {
            onLoading();
        }
        this.setState({ isLoading: true });
    }
    disableLoading = () => {
        const { offLoading } = this.props;
        if (offLoading) {
            offLoading();
        }
        this.setState({ isLoading: false });
    }

    handleAction = () => {
        const { onClick } = this.props;
        if (typeof onClick === 'function') {
            this.enableLoading();
            const actionResult = onClick();
            if (isPromise(actionResult)) {
                actionResult
                    .then(this.disableLoading, this.disableLoading)
                    .catch(this.disableLoading);
            } else {
                this.disableLoading();
            }
        }
    }

    render() {
        const {
            onClick, btnLoadingPropsName = 'loading', btnOrigin, ...others
        } = this.props;
        const Button = btnOrigin;
        const { isLoading } = this.state;
        const btnLoadingProps = { [btnLoadingPropsName]: isLoading };
        return <Button onClick={this.handleAction} {...others} {...btnLoadingProps} />;
    }
}
