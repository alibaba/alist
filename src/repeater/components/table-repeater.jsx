import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../src';

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

    function handleAdd({ props, children, doAdd }) {
        let formCore = null;
        Dialog.show({
            title: '添加',
            content: <Form onMount={core => {
                formCore = core;
            }} layout={props.layout || { label: 8, control: 16 }} validateConfig={props.validateConfig || {}}>
                {children}
            </Form>,
            onOk: async (_, hide) => {
                const error = await formCore.validate();
                if (error) {
                    return;
                }
                const nextValue = formCore.getValue();
                await doAdd(nextValue);
                hide()
            }
        });
    }

    function handleDelete({ idx, doDelete }) {
        doDelete(idx);
    }

    function handleUpdate({ props, children, value, idx, doUpdate }) {
        let formCore = null;
        const pureValue = {};

        function handleMount(index, core) {
            formCore = core;
            formCore.children.forEach(child => {
                pureValue[child.name] = value[index][child.name];
            });

            formCore.setValue(pureValue);
        }

        Dialog.show({
            title: '更新',
            content: <Form onMount={handleMount.bind(0, idx)} layout={props.layout || { label: 8, control: 16 }} validateConfig={props.validateConfig || {}}>
                {children}
            </Form>,
            onOk: () => {
                doUpdate(formCore.getValue(), idx);
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

    return {handleAdd, handleUpdate, handleDelete, Container, rowRender}
};
