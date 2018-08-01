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
                const { val, idx, className } = context.props;
                const { itemsConfig, jsxProps } = context;
                const { core } = props;

                const {
                    status,
                    hasDelete = true, hasUpdate = true, itemAlign = 'left',
                    updateText = 'update', deleteText = 'delete',
                } = jsxProps;

                const editable = status === 'edit';

                const updateBtn = hasUpdate ? <ActionButton type="update" updateText={updateText} /> : null;
                const deleteBtn = hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;

                return (<tr key={idx} className={className}>
                    {itemsConfig.map((conf) => {
                        let cell = val[conf.name];
                        if (conf.renderCell) {
                            cell = conf.renderCell(val[conf.name], { values: val, id: idx, core });
                        }

                        return (<td key={`${conf.label}${conf.name}`}>
                            <div className={`repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`}>
                                {cell}
                            </div>
                        </td>);
                    })}
                    <td>
                        {editable ? <div className="repeater-table-cell-wrapper table-repeater-oper-cell">
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
                const {
                    searchEle, className, jsxProps, children, itemAlign = 'left',
                } = context.props;
                const {
                    status, hasHeader = true, view,
                    addText = 'add', hasAdd = true, addPosition = 'top',
                } = jsxProps;

                const editable = status === 'edit';

                const cellCls = `repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`;

                const header = itemsConfig.map(conf => (<th className="repeater-table-header-node" key={`${conf.label}${conf.name}`}>
                    <div className={cellCls}> {conf.label} </div>
                </th>));

                if (editable) {
                    header.push(<th className="repeater-table-header-node" key="last">
                        <div className={cellCls}> 操作 </div>
                    </th>);
                }

                let addBtnEle = null;
                if (hasAdd && editable) {
                    addBtnEle = <ActionButton type="add" addText={addText} />;
                }

                return (<div className={className}>
                    {searchEle}
                    {addPosition === 'top' ? addBtnEle : null}
                    {view ? null : <TableCom hasHeader={hasHeader} header={header}>{children}</TableCom>}
                    {view ? children : null}
                    {addPosition === 'bottom' ? addBtnEle : null}
                </div>);
            }}
        />);
    }

    return { Container, RowRender };
}
