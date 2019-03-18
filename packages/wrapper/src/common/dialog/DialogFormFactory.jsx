import React from 'react';
import PropTypes from 'prop-types';
import LocaleMap from '../locale/dialog';
import Context from 'noform/lib/context/dialogForm';
import DialogContent from './DialogContent';
import { If } from 'noform';

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

    handleCancel = () => {
        const { onCancel } = this.options;
        if (onCancel && typeof onCancel === 'function') {
            onCancel();
        }

        this.hide();
    }

    handleOk = () => {
        const { onOk = this.hide, enableValidate } = this.options;
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

    renderFooter = (Button, opts) => {
        const { layout } = opts || {};
        const { label } = layout || {};
        const { locale = 'en', footer, btnLoadingPropsName, footerAlign } = this.options;
        const textMap = LocaleMap[locale];
        const { hasCancel = true } = this.options;
        const okText = this.options.okText || textMap.ok;
        const cancelText = this.options.cancelText || textMap.cancel;

        let footerElement = null;
        if (footer) {
            const footerOpts = Object.assign(opts || {});
            footerOpts.ok = this.handleOk;
            footerOpts.cancel = this.handleCancel;
            if (this.dialogCore) footerOpts.ctx = this.dialogCore;
            footerElement = footer(this.hide, footerOpts);
        } else {
            let styleProps = {};
            const alignCls = ['left', 'center', 'right'].indexOf(footerAlign) !== -1 ? `align-${footerAlign}` : '';
            if (footerAlign === 'label' && label) {
                styleProps.style = { marginLeft: `${Number(label / 24).toFixed(2) * 100}%`, float: 'none' };
            }

            footerElement = <If when={(values, ctx) => {
                return ctx.globalStatus !== 'preview';
            }}>
                <div key="footer" className={`noform-dialog-custom-btns ${alignCls}`} {...styleProps}>
                    <ActionButton key="align-footer-ok" btnLoadingPropsName={btnLoadingPropsName} btnOrigin={Button} type="primary" onClick={this.handleOk}>{okText}</ActionButton>
                    { hasCancel ? <span key="align-footer-sep" style={{ marginRight: '12px' }} /> : null }
                    { hasCancel ? <ActionButton key="align-footer-cancel" btnLoadingPropsName={btnLoadingPropsName} btnOrigin={Button} onClick={this.handleCancel}>{cancelText}</ActionButton> : null }
                </div>
            </If>
        }

        return footerElement;
    }

    renderContent = (Button) => {
        const { content } = this.options;

        let formInstance = null;
        if (typeof content === 'function') {
            formInstance = content();
        } else {
            formInstance = content;
        }

        const onDialogMount = (core) => {
            this.dialogCore = core;
        };
        const footer = this.renderFooter.bind(this, Button);
        return <DialogContent footer={footer} onMount={onDialogMount}>
            {formInstance}
        </DialogContent>
    }
}

class DialogFormFactory {
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
            closablePolifill, title, className, width, ...others
        } = options;
        let dialogInstance = null;

        // 按钮loading属性
        const btnLoadingPropsName = compatiMap.btnLoadingProps || 'loading';

        const dialogForm = new DialogForm({
            ...options,
            compatiMap,
            btnLoadingPropsName,
        }, () => dialogInstance);
        const content = dialogForm.renderContent(Button);

        // 入口属性
        const entryProps = compatiMap.show({
            ...options,
            title,
            content,
        });

        if (entryProps.closablePolifill) {
            entryProps.title = <div>
                {title}
                {entryProps.closablePolifill(() => dialogInstance)}
            </div>
        }
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

export default DialogFormFactory;