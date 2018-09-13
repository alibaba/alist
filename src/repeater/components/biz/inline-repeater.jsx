import React from 'react';
import Form from '../../../component/Form';
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
                const {
                    searchEle, className, jsxProps, children, itemAlign = 'left',
                } = context.props;
                const {
                    status,
                    addText = 'add', hasAdd = true, addPosition = 'top',
                    multiple = false,
                    hasHeader = true,
                    view,
                    maxLength,
                    operateText = 'operate',
                } = jsxProps;

                const editable = status === 'edit';

                const cellCls = `repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`;

                const header = itemsConfig.map((conf) => {
                    const cls = conf.className || '';
                    const style = conf.style || {};
                    return (<th style={style} className={`${cls} repeater-table-header-node`} key={`${conf.label}${conf.name}`}>
                        <div className={cellCls}> {conf.label} </div>
                    </th>);
                });

                if (editable) {
                    header.push(<th className="repeater-table-header-node" key="last">
                        <div className={cellCls}>{operateText}</div>
                    </th>);
                }

                const addType = multiple ? 'addMultipleInline' : 'addInline';
                let addBtnEle = null;
                if (hasAdd && editable) {
                    if (maxLength !== undefined && Array.isArray(children) &&
                        (children.length > maxLength || children.length === maxLength)) {
                        // do nothing...
                    } else {
                        addBtnEle = <ActionButton type={addType} addText={addText} />;
                    }
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

    function RowRender(props) {
        return (<RowRenderJSX
            {...props}
            render={(context) => {
                const {
                    val, idx, core, className, formProps,
                } = context.props;
                const { itemsConfig, jsxProps } = context;

                const {
                    status,
                    multiple = false,
                    hasDelete = true, hasUpdate = true, itemAlign = 'left',
                    updateText = 'update', deleteText = 'delete',
                    saveText = 'save', cancelText = 'cancel',
                    children,
                } = jsxProps;

                const cellCls = `repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`;

                const focusMode = core.$focus;
                const editable = status === 'edit';

                const updateBtn = !multiple && !focusMode && hasUpdate ? <ActionButton type="updateInline" updateText={updateText} /> : null;
                const deleteBtn = (!focusMode || multiple) && hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;

                const saveBtn = !multiple && focusMode ? <ActionButton type="save" saveText={saveText} /> : null;
                const cancelBtn = !multiple && focusMode ? <ActionButton type="cancel" cancelText={cancelText} /> : null;

                let listItems = null;
                const childMap = {};
                const childrenRefArr = ([].concat(children)).reduce((a, b) => [].concat(a, b), []);
                childrenRefArr.forEach((childitem) => {
                    const { label, name } = childitem.props;
                    childMap[`${label}${name}`] = React.cloneElement(childitem, { label: undefined, layout: { label: null, control: null } });
                });

                // 遍历渲染数据
                listItems = itemsConfig.map((conf) => {
                    const cls = conf.className || '';
                    const style = conf.style || {};
                    let customRender = null;
                    if (conf.renderCell) {
                        customRender = conf.renderCell(val[conf.name], { values: val, id: idx, core });
                    }
                    let innerItem = null;
                    if (focusMode) {
                        innerItem = (<div className={`repeater-table-cell-wrapper inline-repeater-focus ${cls}`}>
                            { customRender || childMap[`${conf.label}${conf.name}`]}
                        </div>);
                    } else {
                        const valElement = (<div className="repeater-table-cell-wrapper-inner">
                            {conf.prefix ? <span className="repeater-table-cell-wrapper-inner-prefix">{conf.prefix}</span> : null}
                            <span className="repeater-table-cell-wrapper-inner-content">{val[conf.name]}</span>
                            {conf.suffix ? <span className="repeater-table-cell-wrapper-inner-suffix">{conf.suffix}</span> : null}
                        </div>);

                        innerItem = (<div className={`${cellCls} ${cls}`}>
                            { customRender || valElement}
                        </div>);
                    }

                    return (<td style={style} key={`${conf.label}${conf.name}`}>
                        {innerItem}
                    </td>);
                });

                const operEle = (<td>
                    {editable ? <div className={cellCls}>
                        {saveBtn}
                        {cancelBtn}
                        {updateBtn}
                        {deleteBtn}
                    </div> : null}
                </td>);

                return (<Form {...formProps} core={core} className={className} key={idx}>
                    {listItems}
                    {operEle}
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
