import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../src';

export default function bind(source) {
    const { Button, Input } = source;
    rowRender.propTypes = {
        itemsConfig: PropTypes.object,
        val: PropTypes.object,
        props: PropTypes.object,
        idx: PropTypes.number,
        handleUpdate: PropTypes.func,
        handleDelete: PropTypes.func,
    };
    function rowRender(props) {
        const { itemsConfig, core, val, idx, handleUpdateTemp, handleDelete, handleSave, handleCancel } = props;
        const { status,
            hasDelete = true, hasUpdate = true,
            updateText = 'update', deleteText = 'delete',
            saveText = 'save', cancelText = 'cancel',
            children
        } = props.props;

        const focusMode = core.$focus;
        const editable = status === 'edit';
        
        const updateBtn = !focusMode && hasUpdate ? <a href="javascript:;" role="repeater-update" onClick={handleUpdateTemp} type="primary">{updateText}</a> : null;
        const deleteBtn = !focusMode && hasDelete ? <a href="javascript:;" role="repeater-delete" onClick={handleDelete} type="primary">{deleteText}</a> : null;
        
        const saveBtn = focusMode ? <a href="javascript:;" role="repeater-save" onClick={handleSave} type="primary">{saveText}</a> : null;
        const cancelBtn = focusMode ? <a href="javascript:;" role="repeater-cancel" onClick={handleCancel} type="primary">{cancelText}</a> : null;

        let listItems = null;
        listItems = itemsConfig.map((conf, key) => {
            let innerItem = null;
            if (focusMode) {
                innerItem = <div className="next-table-cell-wrapper">
                    {children.find((childitem) => {
                        const { label, name } = childitem.props;
                        return label === conf.label && name === conf.name
                    })}
                </div>
            
            } else {
                innerItem = <div className="next-table-cell-wrapper">
                    {val[conf.name]}
                </div>
            }
            return <td key={key}>
                {innerItem}
            </td>            
        })

        return <Form core={core}><tr key={idx}>
            {listItems}
            <td>
                {editable ? <div className="next-table-cell-wrapper">
                    {saveBtn}
                    {cancelBtn}
                    {updateBtn}
                    {deleteBtn}
                </div> : null}
            </td>
        </tr>
        </Form>;
    }

    function handleAddTemp({ props, children, doAddTemp, repeaterCore }) {
        doAddTemp();
    }

    function handleUpdateTemp ({ idx, doUpdateTemp }) {
        doUpdateTemp(idx);
    }

    function handleDelete({ idx, doDelete }) {
        doDelete(idx);
    }

    function handleSave({ idx, doSave }) {
        doSave(idx);
    }

    function handleCancel({ idx, doCancel }) {
        doCancel(idx);
    }

    Container.propTypes = {
        itemsConfig: PropTypes.array,
        props: PropTypes.object,
        children: PropTypes.any,
        handleAddTemp: PropTypes.func,
        handleSearch: PropTypes.func,
    };
    function Container(props) {
        const { itemsConfig, handleAddTemp, handleSearch, children } = props;
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
            {editable ? <Button role="repeater-add" onClick={handleAddTemp}>{addText}</Button> : null}
            {filter && <Input role="repeater-search" onChange={handleSearch} />}
            <TableCom header={header}>{children}</TableCom>
        </div>;
    }

    TableCom.propTypes = {
        header: PropTypes.any,
        children: PropTypes.any,
    };
    function TableCom({ header, children }) {
        return <table>
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>;
    }

    return { Container, rowRender,
        handleAddTemp, handleUpdateTemp,
        handleSave, handleDelete, handleCancel
    }
};
