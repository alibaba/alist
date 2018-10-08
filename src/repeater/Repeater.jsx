import React from 'react';
import Form from '../component/Form';
import TableCom from './TableCom';
import ActionButton from './ActionButton';
import RowContext from '../context/repeaterRow';

export default function bind(type, source) {
    const { Input } = source;

    const isInline = type === 'inline';
    const isTable = type === 'table';
    const addSuffix = isInline ? 'Inline' : '';

    class Repeater extends React.Component {
        getItemsConfig = () => {
            const { children } = this.props;
            const itemsConfig = React.Children.map(children, child => ({
                name: child.props.name,
                label: child.props.label,
                prefix: child.props.prefix,
                suffix: child.props.suffix,
                multiple: child.props.multiple,
                renderCell: child.props.renderCell,
                style: child.props.style,
                className: child.props.className,
            })).filter(item => (item.name || item.multiple || item.renderCell));
            return itemsConfig;
        }

        renderFilter = () => {
            const { handleSearch, filterElement, filter } = this.props;
            let searchEle = null;
            if (filter) {
                if (typeof filterElement === 'function') {
                    searchEle = filterElement(handleSearch);
                } else if (React.isValidElement(filterElement)) {
                    searchEle = filterElement;
                } else {
                    searchEle = <Input className="repeater-search" onChange={handleSearch} />;
                }
            }

            return searchEle;
        }

        renderRowList = () => {
            const itemsConfig = this.getItemsConfig();
            const {
                multiple = false,
                hasDelete = true, hasUpdate = true,
                itemAlign = 'left',
                children,
                status,
                repeaterCore,
                formProps,
                getText,
            } = this.props;

            const {
                updateText, deleteText, saveText, cancelText,
            } = getText();


            const { formList } = repeaterCore;
            const rowList = formList.map((core, index) => {
                const values = core.getValues();
                const { id } = core;

                const focusMode = core.$focus;
                const editable = status === 'edit';
                const focusCls = focusMode ? 'inline-repeater-focus' : '';
                const cellCls = `repeater-table-cell-wrapper ${focusCls} repeater-table-cell-wrapper-${itemAlign}`;

                const updateBtn = !multiple && !focusMode && hasUpdate ? <ActionButton type={`update${addSuffix}`} updateText={updateText} /> : null;
                const deleteBtn = (!focusMode || multiple) && hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;
                const saveBtn = !isTable && !multiple && focusMode ? <ActionButton type="save" saveText={saveText} /> : null;
                const cancelBtn = !isTable && !multiple && focusMode ? <ActionButton type="cancel" cancelText={cancelText} /> : null;

                const cleanLayout = { layout: { label: null, control: null } };
                let listItems = null;
                const childMap = {};
                const childrenRefArr = ([].concat(children)).reduce((a, b) => [].concat(a, b), []);
                childrenRefArr.forEach((childitem) => {
                    const { label, name } = childitem.props;
                    childMap[`${label}${name}`] = React.cloneElement(childitem, { label: undefined, ...cleanLayout });
                });

                // 遍历渲染数据
                listItems = itemsConfig.map((conf) => {
                    const cls = conf.className || '';
                    const style = conf.style || {};
                    let customRender = null;
                    if (conf.renderCell) {
                        customRender = conf.renderCell(values[conf.name], {
                            values, id, core, index,
                        });
                    }

                    let innerItem = null;
                    const innerValElement = customRender || values[conf.name];
                    let valElement = (<div className="repeater-table-cell-wrapper-inner">
                        {conf.prefix ? <span className="repeater-table-cell-wrapper-inner-prefix">{conf.prefix}</span> : null}
                        <span className="repeater-table-cell-wrapper-inner-content">{innerValElement}</span>
                        {conf.suffix ? <span className="repeater-table-cell-wrapper-inner-suffix">{conf.suffix}</span> : null}
                    </div>);

                    if (!customRender && focusMode && status !== 'preview') {
                        const childElement = childMap[`${conf.label}${conf.name}`];
                        if (React.isValidElement(childElement)) {
                            valElement = React.cloneElement(childElement, { status });
                        } else {
                            valElement = childElement;
                        }
                    }

                    innerItem = (<div className={`${cellCls} ${cls}`}>
                        {valElement}
                    </div>);


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

                const rowContextValue = { core, id };
                return (<RowContext.Provider value={rowContextValue} key={id}>
                    <Form Com="tr" {...formProps} {...cleanLayout} core={core} className="table-repeater-row">
                        {listItems}
                        {operEle}
                    </Form>
                </RowContext.Provider>
                );
            });

            return rowList;
        }

        renderContainer = () => {
            const {
                style = {}, className, view,
                status,
                itemAlign, hasAdd = true, hasHeader = true, addPosition = 'top',
                multiple = false,
                maxLength,
                operateClassName = '',
                getText,
                repeaterCore,
            } = this.props;

            const { addText, operateText } = getText();
            const itemsConfig = this.getItemsConfig();

            const editable = status === 'edit';
            const cellCls = `repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`;

            // 展示添加按钮
            const { formList } = repeaterCore;
            const listLength = Array.isArray(formList) ? formList.length : 0;
            const addType = multiple ? `addMultiple${addSuffix}` : `add${addSuffix}`;
            let addBtnEle = null;
            if (hasAdd && editable) {
                if (maxLength !== undefined &&
                    (listLength > maxLength || listLength === maxLength)) {
                    // do nothing...
                } else {
                    addBtnEle = <ActionButton type={addType} addText={addText} />;
                }
            }

            // 渲染头部
            const header = itemsConfig.map((conf) => {
                const cls = conf.className || '';
                const headStyle = conf.style || {};
                return (<th style={headStyle} className={`${cls} repeater-table-header-node`} key={`${conf.label}${conf.name}`}>
                    <div className={cellCls}> {conf.label} </div>
                </th>);
            });

            // 如果当前状态为编辑状态，展示操作栏位
            if (editable) {
                header.push(<th className={`repeater-table-header-node ${operateClassName}`} key="last">
                    <div className={cellCls}>{operateText}</div>
                </th>);
            }

            // 渲染内容
            let containerContent = null;
            if (view) {
                containerContent = this.renderView();
            } else {
                containerContent = (<TableCom hasHeader={hasHeader} header={header}>
                    {this.renderRowList()}
                </TableCom>);
            }

            return (<div className={`table-repeater-wrapper ${className || ''}`} style={style}>
                {this.renderFilter()}
                {addPosition === 'top' ? addBtnEle : null}
                {containerContent}
                {addPosition === 'bottom' ? addBtnEle : null}
            </div>);
        }

        // 自定义渲染视图
        renderView = () => {
            const { view } = this.props;
            let viewElement = null;
            if (view) {
                if (typeof view === 'function') {
                    const rowList = this.renderRowList();
                    viewElement = view(rowList, this);
                }
                viewElement = view;
            }
            return viewElement;
        }

        render() {
            return this.renderContainer();
        }
    }

    return Repeater;
}
