import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepeaterContext from '../context/repeater';
import RowContext from '../context/repeaterRow';

class InnerActionButton extends Component {
    static propTypes = {
        doAddDialog: PropTypes.func,
        doUpdateDialog: PropTypes.func,
        doDelete: PropTypes.func,
        doSave: PropTypes.func,
        doCancel: PropTypes.func,
        doAddInline: PropTypes.func,
        doMultipleInline: PropTypes.func,
        doUpdateInline: PropTypes.func,
        repeaterCore: PropTypes.object,
        id: PropTypes.string,
        core: PropTypes.object,
        findBy: PropTypes.func,
        getText: PropTypes.func,
        children: PropTypes.any,
        type: PropTypes.string,
    };

    getId = () => this.props.id

    getCore = () => {
        const { repeaterCore, findBy, core } = this.props;
        return core || repeaterCore.formList.find(findBy);
    }

    handleAddMultipleInline = async () => {
        await this.props.doMultipleInline();
    }

    handleAddInline = async () => {
        await this.props.doAddInline();
    }

    handleUpdateInline = async () => {
        const core = this.getCore();
        await this.props.doUpdateInline(core, core.id);
    }

    handleUpdate = async () => {
        const core = this.getCore();
        const copyCore = this.props.repeaterCore.generateCore(core.getValues());
        await this.props.doUpdateDialog(copyCore, core.id);
    }

    handleDelete = async () => {
        const core = this.getCore();
        await this.props.doDelete(core, core.id);
    }

    handleSave = async () => {
        await this.props.doSave(this.getId());
    }

    handleCancel = async () => {
        await this.props.doCancel(this.getId());
    }

    handleAdd = async () => {
        const core = this.props.repeaterCore.generateCore();
        await this.props.doAddDialog(core);
    }

    renderBtn = () => {
        const { core, repeaterCore, type, children, getText, render } = this.props;
        const {
            addText, updateText, saveText, cancelText, deleteText,
        } = getText();

        let ele = null;
        let btnContent = children;
        if (render && typeof render === 'function') {
            btnContent = render(core, repeaterCore);
        }

        switch (type) {
        case 'add': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAdd}>{btnContent || addText}</button>; break;
        case 'addInline': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAddInline}>{btnContent || addText}</button>; break;
        case 'addMultipleInline': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAddMultipleInline}>{btnContent || addText}</button>; break;
        case 'update': ele = <button className="repeater-action-btn repeater-update" onClick={this.handleUpdate}>{btnContent || updateText}</button>; break;
        case 'updateInline': ele = <button className="repeater-action-btn repeater-update" onClick={this.handleUpdateInline}>{btnContent || updateText}</button>; break;
        case 'save': ele = <button className="repeater-action-btn repeater-save" onClick={this.handleSave}>{btnContent || saveText}</button>; break;
        case 'cancel': ele = <button className="repeater-action-btn repeater-cancel" onClick={this.handleCancel}>{btnContent || cancelText}</button>; break;
        case 'remove':
        case 'delete': ele = <button className="repeater-action-btn repeater-delete" onClick={this.handleDelete}>{btnContent || deleteText}</button>; break;
        default: break;
        }

        return ele;
    }

    render() {
        return this.renderBtn();
    }
}

const ActionButton = props => (<RepeaterContext.Consumer>
    {(repeaterAction) => {
        const actionProps = repeaterAction || {};
        const { repeater } = actionProps;
        const { type, ...others } = repeater || {};
        const { core: propCore, ...otherProps } = props || {};

        return (<RowContext.Consumer>
            {(rowCtx) => {
                const { core, ...otherCtx } = rowCtx || {};
                return <InnerActionButton {...otherProps} {...others} {...otherCtx} core={core || propCore} />;
            }}
        </RowContext.Consumer>);
    }}
</RepeaterContext.Consumer>);

ActionButton.displayName = 'ActionButton';
export default ActionButton;
