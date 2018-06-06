import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../src';
import TableCom from './TableCom';

export default function bind(source) {
    const { Button, Input, Dialog } = source;
    rowRender.propTypes = {
        itemsConfig: PropTypes.object,
        val: PropTypes.object,
        props: PropTypes.object,
        idx: PropTypes.number,
        handleUpdate: PropTypes.func,
        handleDelete: PropTypes.func,
    };
    function rowRender(props) {
        const { itemsConfig, val, idx, handleUpdate, handleDelete } = props;
        const { status, hasDelete = true, hasUpdate = true, updateText = 'update', deleteText = 'delete' } = props.props;

        const editable = status === 'edit';
        const updateBtn = hasUpdate ? <a href="javascript:;" role="repeater-update" onClick={handleUpdate} type="primary">{updateText}</a> : null;
        const deleteBtn = hasDelete ? <a href="javascript:;" role="repeater-delete" onClick={handleDelete} type="primary">{deleteText}</a> : null;

        return <tr key={idx}>
            {itemsConfig.map((conf, key) => {
                return <td key={key}>
                    <div className="next-table-cell-wrapper">{val[conf.name]}</div>
                </td>;
            })}
            <td>
                {editable ? <div className="next-table-cell-wrapper">
                    {updateBtn}
                    {deleteBtn}
                </div> : null}
            </td>
        </tr>;
    }

    function handleAdd({ props, children, doAdd, repeaterCore }) {
        let core = repeaterCore.generateCore();
        Dialog.show({
            title: '添加',
            content: <Form core={core} layout={props.layout || { label: 8, control: 16 }}>
                {children}
            </Form>,
            onOk: async (_, hide) => {
                const error = await core.validate();
                if (error) {
                    return;
                }

                await doAdd(core);
                hide()
            }
        });
    }

    function handleDelete({ idx, doDelete }) {
        doDelete(idx);
    }

    function handleUpdate({ props, children, core, idx, doUpdate }) {
        Dialog.show({
            title: '更新',
            content: <Form core={core} layout={props.layout || { label: 8, control: 16 }}>
                {children}
            </Form>,
            onOk: async (_, hide) => {
                await doUpdate(core.getValue(), idx);
                hide();
            }
        });
    }

    Container.propTypes = {
        itemsConfig: PropTypes.array,
        props: PropTypes.object,
        children: PropTypes.any,
        handleAdd: PropTypes.func,
        handleSearch: PropTypes.func,
    };
    function Container(props) {
        const { itemsConfig, handleAdd, handleSearch, children } = props;
        const { status, addText = 'add', filter } = props.props;
        const editable = status === 'edit';

        const header = itemsConfig.map((conf, key) => {
            return <th className="next-table-header-node" key={key}>
                <div className="next-table-cell-wrapper"> {conf.label} </div>
            </th>;
        });

        if (editable) {
            header.push(<th className="next-table-header-node" key="last">
                <div className="next-table-cell-wrapper"> 操作 </div>
            </th>);
        }

        return <div>
            {editable ? <Button role="repeater-add" onClick={handleAdd}>{addText}</Button> : null}
            {filter && <Input role="repeater-search" onChange={handleSearch} />}
            <TableCom header={header}>{children}</TableCom>
        </div>;
    }

    return {handleAdd, handleUpdate, handleDelete, Container, rowRender}
};
