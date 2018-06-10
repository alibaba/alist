import React from 'react';
import TableCom from '../core/TableCom';
import ContainerJSX from '../core/Container';
import RowRenderJSX from '../core/RowRender';
import createActionButton from '../core/ActionButton';

export default function bind(source) {
    const ActionButton = createActionButton(source);

    function RowRender(props) {
        return (<RowRenderJSX
            {...props}
            render={(context) => {
                const { val, idx } = context.props;
                const { itemsConfig, jsxProps } = context;

                const {
                    status,
                    hasDelete = true, hasUpdate = true,
                    updateText = 'update', deleteText = 'delete',
                } = jsxProps;

                const editable = status === 'edit';

                const updateBtn = hasUpdate ? <ActionButton type="update" updateText={updateText} /> : null;
                const deleteBtn = hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;

                return (<tr key={idx} className="repeater-row">
                    {itemsConfig.map((conf, key) => (<td key={key}>
                        <div className="next-table-cell-wrapper">{val[conf.name]}</div>
                    </td>))}
                    <td>
                        {editable ? <div className="next-table-cell-wrapper table-repeater-oper-cell">
                            {updateBtn}
                            {deleteBtn}
                        </div> : null}
                    </td>
                </tr>);
            }}
        />);
    }

    function Container(props) {
        return (<ContainerJSX
            {...props}
            render={(context) => {
                const { itemsConfig } = context;
                const { jsxProps, children } = context.props;
                const { status, addText = 'add' } = jsxProps;

                const editable = status === 'edit';

                const header = itemsConfig.map((conf, key) => (<th className="next-table-header-node" key={key}>
                    <div className="next-table-cell-wrapper"> {conf.label} </div>
                </th>));

                if (editable) {
                    header.push(<th className="next-table-header-node" key="last">
                        <div className="next-table-cell-wrapper"> 操作 </div>
                    </th>);
                }

                return (<div className="table-repeater-wrapper">
                    {editable ? <ActionButton type="add" addText={addText} /> : null}
                    <TableCom header={header}>{children}</TableCom>
                </div>);
            }}
        />);
    }

    return { Container, RowRender };
}
