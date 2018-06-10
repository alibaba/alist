import React from 'react';
import Form from '../../../../src';
import TableCom from '../core/TableCom';
import ContainerJSX from '../core/Container';
import RowRenderJSX from '../core/RowRender';
import createActionButton from '../core/ActionButton';

export default function bind(source) {
    const ActionButton = createActionButton(source);

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

                return (<div>
                    {editable ? <ActionButton type="addInline" addText={addText} /> : null}
                    <TableCom header={header}>{children}</TableCom>
                </div>);
            }}
        />);
    }

    function RowRender(props) {
        return (<RowRenderJSX
            {...props}
            render={(context) => {
                const { val, idx, core } = context.props;
                const { itemsConfig, jsxProps } = context;

                const {
                    status,
                    hasDelete = true, hasUpdate = true,
                    updateText = 'update', deleteText = 'delete',
                    saveText = 'save', cancelText = 'cancel',
                    children,
                } = jsxProps;

                const focusMode = core.$focus;
                const editable = status === 'edit';

                const updateBtn = !focusMode && hasUpdate ? <ActionButton type="updateInline" updateText={updateText} /> : null;
                const deleteBtn = !focusMode && hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;

                const saveBtn = focusMode ? <ActionButton type="save" saveText={saveText} /> : null;
                const cancelBtn = focusMode ? <ActionButton type="cancel" cancelText={cancelText} /> : null;

                let listItems = null;
                const childMap = {};
                children.forEach((childitem) => {
                    const { label, name } = childitem.props;
                    childMap[`${label}${name}`] = React.cloneElement(childitem, { label: undefined });
                });

                listItems = itemsConfig.map((conf, key) => {
                    let innerItem = null;
                    if (focusMode) {
                        innerItem = (<div className="next-table-cell-wrapper inline-repeater-focus">
                            {childMap[`${conf.label}${conf.name}`]}
                        </div>);
                    } else {
                        innerItem = (<div className="next-table-cell-wrapper">
                            {val[conf.name]}
                        </div>);
                    }
                    return (<td key={key}>
                        {innerItem}
                    </td>);
                });

                return (<Form core={core} className="repeater-row" key={idx}>
                    {listItems}
                    <td>
                        {editable ? <div className="next-table-cell-wrapper">
                            {saveBtn}
                            {cancelBtn}
                            {updateBtn}
                            {deleteBtn}
                        </div> : null}
                    </td>
                </Form>);
            }}
        />);
    }

    return {
        Container,
        RowRender,
        inline: true,
    };
}
