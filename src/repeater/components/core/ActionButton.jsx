import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../src';

function createActionButton(source) {
    const { Dialog } = source;

    return class ActionButton extends Component {
        static contextTypes = {
            getIdx: PropTypes.func,
            getCore: PropTypes.func,
            jsxProps: PropTypes.object,
            doAdd: PropTypes.func,
            doUpdate: PropTypes.func,
            doDelete: PropTypes.func,
            doSave: PropTypes.func,
            doCancel: PropTypes.func,
            doAddInline: PropTypes.func,
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
            this.doCancel = context.doCancel;
            this.doAddInline = context.doAddInline;
            this.doUpdateInline = context.doUpdateInline;
            this.getCore = context.getCore;
            this.getIdx = context.getIdx;
        }

        handleAddInline = async () => {
            await this.doAddInline();
        }

        handleUpdateInline = () => {
            this.doUpdateInline(this.getIdx());
        }

        handleDelete = () => {
            this.doDelete(this.getIdx());
        }

        handleSave = () => {
            this.doSave(this.getIdx());
        }

        handleCancel = () => {
            this.doCancel(this.getIdx());
        }

        handleAdd = () => {
            const { children, layout } = this.jsxProps;
            const core = this.repeaterCore.generateCore();
            Dialog.show({
                title: '添加',
                content: <Form core={core} layout={layout || { label: 8, control: 16 }}>
                    {children}
                </Form>,
                onOk: async (_, hide) => {
                    const error = await core.validate();
                    if (error) {
                        return;
                    }

                    await this.doAdd(core);
                    hide();
                },
            });
        }

        handleUpdate = () => {
            const { children, layout } = this.jsxProps;
            Dialog.show({
                title: '更新',
                content: <Form core={this.getCore()} layout={layout || { label: 8, control: 16 }}>
                    {children}
                </Form>,
                onOk: async (_, hide) => {
                    await this.doUpdate(this.getCore().getValue(), this.getIdx());
                    hide();
                },
            });
        }

        renderBtn = () => {
            const {
                type, addText, updateText, saveText, cancelText, deleteText,
            } = this.props;
            let ele = null;

            switch (type) {
            case 'add': ele = <button className="repeater-add" onClick={this.handleAdd}>{addText}</button>; break;
            case 'addInline': ele = <button className="repeater-add" onClick={this.handleAddInline}>{addText}</button>; break;
            case 'update': ele = <button className="repeater-update" onClick={this.handleUpdate}>{updateText}</button>; break;
            case 'updateInline': ele = <button className="repeater-update" onClick={this.handleUpdateInline}>{updateText}</button>; break;
            case 'save': ele = <button className="repeater-save" onClick={this.handleSave}>{saveText}</button>; break;
            case 'cancel': ele = <button className="repeater-cancel" onClick={this.handleCancel}>{cancelText}</button>; break;
            case 'remove':
            case 'delete': ele = <button className="repeater-delete" onClick={this.handleDelete}>{deleteText}</button>; break;
            default: ele = null; break;
            }

            return ele;
        }

        render() {
            return this.renderBtn();
        }
    };
}


export default createActionButton;
