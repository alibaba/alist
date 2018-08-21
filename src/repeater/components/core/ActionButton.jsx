import React, { Component } from 'react';
import PropTypes from 'prop-types';

function createActionButton() {
    return class ActionButton extends Component {
        static contextTypes = {
            getId: PropTypes.func,
            getCore: PropTypes.func,
            jsxProps: PropTypes.object,
            doAdd: PropTypes.func,
            doUpdate: PropTypes.func,
            doAddDialog: PropTypes.func,
            doUpdateDialog: PropTypes.func,
            doDelete: PropTypes.func,
            doSave: PropTypes.func,
            doCancel: PropTypes.func,
            doAddInline: PropTypes.func,
            doMultipleInline: PropTypes.func,
            doUpdateInline: PropTypes.func,
            repeaterCore: PropTypes.object,
        };

        constructor(props, context) {
            super(props, context);

            this.jsxProps = context.jsxProps;
            this.repeaterCore = context.repeaterCore;
            this.doAdd = context.doAdd;
            this.doUpdate = context.doUpdate;
            this.doDelete = context.doDelete;
            this.doSave = context.doSave;
            this.doAddDialog = context.doAddDialog;
            this.doUpdateDialog = context.doUpdateDialog;
            this.doCancel = context.doCancel;
            this.doAddInline = context.doAddInline;
            this.doMultipleInline = context.doMultipleInline;
            this.doUpdateInline = context.doUpdateInline;
            // this.getCore = context.getCore;
            // this.getId = context.getId;

            this.state = {
                loading: false,
            };
        }

        getId = () => {
            const core = this.getCore();
            const { id } = core;
            return id;
        }

        getCore = () => {
            const { getCore } = this.context;

            if (!getCore) {
                const { findBy } = this.props;
                return this.repeaterCore.formList.find(findBy);
            }
            const core = getCore();
            return core;
        }

        handleAddMultipleInline = async () => {
            await this.doMultipleInline();
        }

        handleAddInline = async () => {
            await this.doAddInline();
        }

        handleUpdateInline = async () => {
            const core = this.getCore();
            await this.doUpdateInline(core, core.id);
        }

        handleUpdate = async () => {
            const core = this.getCore();
            const copyCore = this.repeaterCore.generateCore(core.getValues());
            await this.doUpdateDialog(copyCore, core.id);
        }

        handleDelete = async () => {
            const core = this.getCore();
            await this.doDelete(core, core.id);
        }

        handleSave = async () => {
            await this.doSave(this.getId());
        }

        handleCancel = async () => {
            await this.doCancel(this.getId());
        }

        handleAdd = async () => {
            const core = this.repeaterCore.generateCore();
            await this.doAddDialog(core);
        }

        renderBtn = () => {
            const {
                type, addText, updateText, saveText, cancelText, deleteText, children,
            } = this.props;
            let ele = null;

            switch (type) {
            case 'add': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAdd}>{children || addText}</button>; break;
            case 'addInline': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAddInline}>{children || addText}</button>; break;
            case 'addMultipleInline': ele = <button className="repeater-action-btn repeater-add" onClick={this.handleAddMultipleInline}>{children || addText}</button>; break;
            case 'update': ele = <button className="repeater-action-btn repeater-update" onClick={this.handleUpdate}>{children || updateText}</button>; break;
            case 'updateInline': ele = <button className="repeater-action-btn repeater-update" onClick={this.handleUpdateInline}>{children || updateText}</button>; break;
            case 'save': ele = <button className="repeater-action-btn repeater-save" onClick={this.handleSave}>{children || saveText}</button>; break;
            case 'cancel': ele = <button className="repeater-action-btn repeater-cancel" onClick={this.handleCancel}>{children || cancelText}</button>; break;
            case 'remove':
            case 'delete': ele = <button className="repeater-action-btn repeater-delete" onClick={this.handleDelete}>{children || deleteText}</button>; break;
            default: break;
            }

            return ele;
        }

        render() {
            return this.renderBtn();
        }
    };
}


export default createActionButton;
